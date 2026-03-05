import { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

import { Text, View } from "@/components/Themed";
import { useWifiStore, useProfileStore } from "@/lib/store";
import { loadPatterns } from "@/services/pattern-sync";
import type { PortalPattern } from "@/lib/types";

// Dynamically try to import native WiFi modules (unavailable in Expo Go)
let getCurrentSSID: () => Promise<string | null>;
let matchSSIDToPattern: (
  ssid: string,
  patterns: PortalPattern[]
) => PortalPattern | null;
let subscribeToWifiChanges: (cb: (isWifi: boolean) => void) => () => void;
let requestLocationPermission: () => Promise<boolean>;
let detectCaptivePortal: () => Promise<{
  isCaptive: boolean;
  portalUrl?: string;
}>;

let nativeWifiAvailable = false;
try {
  const wm = require("@/services/wifi-manager");
  const pd = require("@/services/portal-detector");
  getCurrentSSID = wm.getCurrentSSID;
  matchSSIDToPattern = wm.matchSSIDToPattern;
  subscribeToWifiChanges = wm.subscribeToWifiChanges;
  requestLocationPermission = wm.requestLocationPermission;
  detectCaptivePortal = pd.detectCaptivePortal;
  nativeWifiAvailable = true;
} catch {
  // Expo Go - native modules not available
}

export default function HomeScreen() {
  const router = useRouter();
  const { wifi, setSSID, setMatchedPattern, setPortalUrl, setStatus } =
    useWifiStore();
  const { profile } = useProfileStore();
  const [patterns, setPatterns] = useState<PortalPattern[]>([]);
  const [demoMode, setDemoMode] = useState(!nativeWifiAvailable);

  // Load patterns from API + local
  useEffect(() => {
    loadPatterns().then(setPatterns);
  }, []);

  const checkWifi = useCallback(async () => {
    if (!nativeWifiAvailable || demoMode) return;

    const ssid = await getCurrentSSID();
    setSSID(ssid);

    if (!ssid) {
      setStatus("disconnected");
      setMatchedPattern(null);
      setPortalUrl(null);
      return;
    }

    const matched = matchSSIDToPattern(ssid, patterns);
    setMatchedPattern(matched);

    if (!matched) {
      setStatus("connected_no_portal");
      return;
    }

    const result = await detectCaptivePortal();
    if (result.isCaptive) {
      setStatus("portal_detected");
      setPortalUrl(result.portalUrl ?? null);
    } else {
      setStatus("connected");
    }
  }, [setSSID, setMatchedPattern, setPortalUrl, setStatus, patterns, demoMode]);

  useEffect(() => {
    if (!nativeWifiAvailable || demoMode) return;
    requestLocationPermission().then(() => checkWifi());
    const unsub = subscribeToWifiChanges((isWifi) => {
      if (isWifi) checkWifi();
      else {
        setSSID(null);
        setStatus("disconnected");
      }
    });
    return unsub;
  }, [checkWifi, setSSID, setStatus, demoMode]);

  const handleDemoSelect = (pattern: PortalPattern) => {
    setSSID(pattern.ssids[0]);
    setMatchedPattern(pattern);
    setStatus("portal_detected");
    setPortalUrl(pattern.portalUrl ?? null);
  };

  const handleAutoConnect = () => {
    if (wifi.matchedPattern) {
      router.push(`/portal/${wifi.matchedPattern.spotId}`);
    }
  };

  const statusConfig = {
    disconnected: { label: "WiFi未接続", color: "#999" },
    connected_no_portal: { label: "WiFi接続済み（ポータルなし）", color: "#4CAF50" },
    portal_detected: { label: "ポータル検出！", color: "#FF9800" },
    auto_connecting: { label: "自動接続中...", color: "#2196F3" },
    connected: { label: "接続完了", color: "#4CAF50" },
  };

  const current = statusConfig[wifi.status];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.appTitle}>AutoWiFi Travel</Text>

      {/* Demo Mode Banner */}
      {demoMode && (
        <View style={styles.demoBanner}>
          <Text style={styles.demoBannerText}>
            Demo Mode - WiFiスポットを選んでテスト
          </Text>
        </View>
      )}

      {/* WiFi Status Card */}
      {!demoMode && (
        <View style={[styles.statusCard, { borderColor: current.color }]}>
          <View
            style={[styles.statusDot, { backgroundColor: current.color }]}
          />
          <Text style={styles.statusText}>{current.label}</Text>
          {wifi.ssid && (
            <Text style={styles.ssidText}>SSID: {wifi.ssid}</Text>
          )}
        </View>
      )}

      {/* Matched Pattern Info */}
      {wifi.matchedPattern && (
        <View style={styles.matchCard}>
          <Text style={styles.matchTitle}>
            {wifi.matchedPattern.nameJa}
          </Text>
          <Text style={styles.matchSub}>
            {wifi.matchedPattern.airportCode
              ? `${wifi.matchedPattern.airportCode} - `
              : ""}
            {wifi.matchedPattern.country}
          </Text>
          <Text style={styles.matchType}>
            タイプ:{" "}
            {wifi.matchedPattern.portalType === "agree_only"
              ? "同意のみ"
              : wifi.matchedPattern.portalType === "registration"
              ? "登録が必要"
              : "ログイン"}
          </Text>
        </View>
      )}

      {/* Auto Connect Button */}
      {(wifi.status === "portal_detected" || demoMode) &&
        wifi.matchedPattern && (
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleAutoConnect}
          >
            <Text style={styles.connectButtonText}>
              {demoMode ? "ポータル画面を開く" : "自動接続する"}
            </Text>
          </TouchableOpacity>
        )}

      {/* Demo Mode: Pattern List */}
      {demoMode && (
        <View style={styles.demoSection}>
          <Text style={styles.demoSectionTitle}>
            テスト対象 ({patterns.length}件)
          </Text>
          {patterns.map((p) => (
            <TouchableOpacity
              key={p.spotId}
              style={[
                styles.demoItem,
                wifi.matchedPattern?.spotId === p.spotId &&
                  styles.demoItemActive,
              ]}
              onPress={() => handleDemoSelect(p)}
            >
              <Text style={styles.demoItemName}>{p.nameJa}</Text>
              <Text style={styles.demoItemSsid}>
                {p.ssids[0]} ({p.portalType})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Profile Warning */}
      {!profile && (
        <View style={styles.warningCard}>
          <Text style={styles.warningText}>
            プロフィールが未設定です。設定タブから登録してください。
          </Text>
        </View>
      )}

      {/* WiFi Settings & Refresh */}
      <View style={styles.bottomButtons}>
        {!demoMode && (
          <TouchableOpacity
            style={styles.wifiSettingsButton}
            onPress={() => {
              if (Platform.OS === "android") {
                Linking.sendIntent("android.settings.WIFI_SETTINGS");
              } else if (Platform.OS === "ios") {
                Linking.openURL("App-Prefs:WIFI");
              }
            }}
          >
            <Text style={styles.wifiSettingsText}>WiFi設定を開く</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={demoMode ? () => loadPatterns().then(setPatterns) : checkWifi}
        >
          <Text style={styles.refreshText}>
            {demoMode ? "パターン更新" : "状態を更新"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  statusCard: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
  },
  ssidText: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  matchCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "rgba(33, 150, 243, 0.1)",
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  matchSub: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  matchType: {
    fontSize: 14,
    marginTop: 8,
  },
  connectButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  warningCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "rgba(255, 152, 0, 0.1)",
  },
  warningText: {
    fontSize: 14,
    color: "#FF9800",
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: "auto",
  },
  wifiSettingsButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#2196F3",
    padding: 12,
    alignItems: "center",
  },
  wifiSettingsText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  refreshButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    alignItems: "center",
  },
  refreshText: {
    fontSize: 14,
  },
  demoBanner: {
    backgroundColor: "#FF9800",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  demoBannerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  demoSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  demoSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  demoItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.2)",
    padding: 12,
    marginBottom: 8,
  },
  demoItemActive: {
    borderColor: "#2196F3",
    backgroundColor: "rgba(33, 150, 243, 0.08)",
  },
  demoItemName: {
    fontSize: 15,
    fontWeight: "600",
  },
  demoItemSsid: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 2,
  },
});
