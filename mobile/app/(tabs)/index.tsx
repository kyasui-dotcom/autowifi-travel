import { useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Linking, Platform } from "react-native";
import { useRouter } from "expo-router";

import { Text, View } from "@/components/Themed";
import { useWifiStore, useProfileStore } from "@/lib/store";
import {
  getCurrentSSID,
  matchSSIDToPattern,
  subscribeToWifiChanges,
  requestLocationPermission,
} from "@/services/wifi-manager";
import { detectCaptivePortal } from "@/services/portal-detector";
import patternsData from "@/assets/portal-patterns/patterns-v1.json";
import type { PortalPattern } from "@/lib/types";

const patterns = patternsData.patterns as PortalPattern[];

export default function HomeScreen() {
  const router = useRouter();
  const { wifi, setSSID, setMatchedPattern, setPortalUrl, setStatus } =
    useWifiStore();
  const { profile } = useProfileStore();

  const checkWifi = useCallback(async () => {
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
  }, [setSSID, setMatchedPattern, setPortalUrl, setStatus]);

  useEffect(() => {
    requestLocationPermission().then(() => checkWifi());
    const unsub = subscribeToWifiChanges((isWifi) => {
      if (isWifi) checkWifi();
      else {
        setSSID(null);
        setStatus("disconnected");
      }
    });
    return unsub;
  }, [checkWifi, setSSID, setStatus]);

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
    <View style={styles.container}>
      <Text style={styles.appTitle}>AutoWiFi Travel</Text>

      {/* WiFi Status Card */}
      <View style={[styles.statusCard, { borderColor: current.color }]}>
        <View
          style={[styles.statusDot, { backgroundColor: current.color }]}
        />
        <Text style={styles.statusText}>{current.label}</Text>
        {wifi.ssid && (
          <Text style={styles.ssidText}>SSID: {wifi.ssid}</Text>
        )}
      </View>

      {/* Matched Pattern Info */}
      {wifi.matchedPattern && (
        <View style={styles.matchCard}>
          <Text style={styles.matchTitle}>
            {wifi.matchedPattern.nameJa}
          </Text>
          <Text style={styles.matchSub}>
            {wifi.matchedPattern.airportCode} -{" "}
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
      {wifi.status === "portal_detected" && wifi.matchedPattern && (
        <TouchableOpacity
          style={styles.connectButton}
          onPress={handleAutoConnect}
        >
          <Text style={styles.connectButtonText}>自動接続する</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.refreshButton} onPress={checkWifi}>
          <Text style={styles.refreshText}>状態を更新</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});
