import { useEffect, useCallback, useState, useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Text, View } from "@/components/Themed";
import { useWifiStore, useProfileStore, useReconnectStore } from "@/lib/store";
import { loadPatterns } from "@/services/pattern-sync";
import { getPatternName } from "@/lib/i18n";
import { useAutoReconnect } from "@/hooks/useAutoReconnect";
import { ReconnectBanner } from "@/components/wifi/ReconnectBanner";
import { SilentReconnectWebView } from "@/components/wifi/SilentReconnectWebView";
import type { PortalPattern, WifiConnectionStatus } from "@/lib/types";

// Status color map (constant, never re-created)
const STATUS_COLORS: Record<WifiConnectionStatus, string> = {
  disconnected: "#999",
  connected_no_portal: "#4CAF50",
  portal_detected: "#FF9800",
  auto_connecting: "#2196F3",
  connected: "#4CAF50",
} as const;

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
  const { t } = useTranslation();
  const { wifi, setSSID, setMatchedPattern, setPortalUrl, setStatus } =
    useWifiStore();
  const { profile, _hydrated } = useProfileStore();
  const { resetReconnect } = useReconnectStore();
  const [patterns, setPatterns] = useState<PortalPattern[]>([]);
  const [patternsLoading, setPatternsLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(!nativeWifiAvailable);
  const [refreshing, setRefreshing] = useState(false);

  // Auto reconnect hook (only active when nativeWifiAvailable)
  const { reconnectStatus, reconnectPattern } = useAutoReconnect();

  // Load patterns from API + local
  useEffect(() => {
    setPatternsLoading(true);
    loadPatterns()
      .then(setPatterns)
      .finally(() => setPatternsLoading(false));
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

  const handleDemoSelect = useCallback(
    (pattern: PortalPattern) => {
      setSSID(pattern.ssids[0]);
      setMatchedPattern(pattern);
      setStatus("portal_detected");
      setPortalUrl(pattern.portalUrl ?? null);
    },
    [setSSID, setMatchedPattern, setStatus, setPortalUrl]
  );

  const handleAutoConnect = useCallback(() => {
    if (wifi.matchedPattern) {
      router.push(`/portal/${wifi.matchedPattern.spotId}`);
    }
  }, [wifi.matchedPattern, router]);

  const handleSilentReconnectComplete = useCallback(
    (success: boolean) => {
      if (success) {
        setStatus("connected");
      }
    },
    [setStatus]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    if (demoMode) {
      await loadPatterns().then(setPatterns);
    } else {
      await checkWifi();
    }
    setRefreshing(false);
  }, [demoMode, checkWifi]);

  const handleOpenWifiSettings = useCallback(() => {
    if (Platform.OS === "android") {
      Linking.sendIntent("android.settings.WIFI_SETTINGS");
    } else if (Platform.OS === "ios") {
      Linking.openURL("App-Prefs:WIFI");
    }
  }, []);

  const currentColor = STATUS_COLORS[wifi.status];

  // Memoize pattern count for demo section
  const patternCount = useMemo(() => patterns.length, [patterns]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.appTitle}>{t("home.appTitle")}</Text>

      {/* Auto Reconnect Banner */}
      {!demoMode && (
        <ReconnectBanner
          status={reconnectStatus}
          onDismiss={() => resetReconnect()}
        />
      )}

      {/* Silent Reconnect WebView (hidden) */}
      {reconnectStatus === "reconnecting" && reconnectPattern && (
        <SilentReconnectWebView
          pattern={reconnectPattern}
          onComplete={handleSilentReconnectComplete}
        />
      )}

      {/* Demo Mode Banner */}
      {demoMode && (
        <View style={styles.demoBanner}>
          <Text style={styles.demoBannerText}>{t("home.demoBanner")}</Text>
        </View>
      )}

      {/* WiFi Status Card */}
      {!demoMode && (
        <View
          style={[styles.statusCard, { borderColor: currentColor }]}
          accessibilityRole="summary"
          accessibilityLabel={t(`home.status.${wifi.status}`)}
        >
          <View
            style={[styles.statusDot, { backgroundColor: currentColor }]}
          />
          <Text style={styles.statusText}>
            {t(`home.status.${wifi.status}`)}
          </Text>
          {wifi.ssid && (
            <Text style={styles.ssidText}>SSID: {wifi.ssid}</Text>
          )}
        </View>
      )}

      {/* Matched Pattern Info */}
      {wifi.matchedPattern && (
        <View style={styles.matchCard}>
          <Text style={styles.matchTitle}>
            {getPatternName(wifi.matchedPattern)}
          </Text>
          <Text style={styles.matchSub}>
            {wifi.matchedPattern.airportCode
              ? `${wifi.matchedPattern.airportCode} - `
              : ""}
            {wifi.matchedPattern.country}
          </Text>
          <Text style={styles.matchType}>
            {t("home.typeLabel", {
              type: t(`home.type.${wifi.matchedPattern.portalType}`),
            })}
          </Text>
        </View>
      )}

      {/* Auto Connect Button */}
      {(wifi.status === "portal_detected" || demoMode) &&
        wifi.matchedPattern && (
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleAutoConnect}
            accessibilityRole="button"
            accessibilityLabel={
              demoMode ? t("home.openPortal") : t("home.autoConnect")
            }
          >
            <Text style={styles.connectButtonText}>
              {demoMode ? t("home.openPortal") : t("home.autoConnect")}
            </Text>
          </TouchableOpacity>
        )}

      {/* Demo Mode: Pattern List */}
      {demoMode && (
        <View style={styles.demoSection}>
          <Text style={styles.demoSectionTitle}>
            {t("home.testTargets", { count: patternCount })}
          </Text>
          {patternsLoading ? (
            <ActivityIndicator
              size="small"
              color="#2196F3"
              style={{ marginVertical: 20 }}
            />
          ) : (
            patterns.map((p) => (
              <TouchableOpacity
                key={p.spotId}
                style={[
                  styles.demoItem,
                  wifi.matchedPattern?.spotId === p.spotId &&
                    styles.demoItemActive,
                ]}
                onPress={() => handleDemoSelect(p)}
                accessibilityRole="button"
                accessibilityLabel={`${getPatternName(p)} - ${p.ssids[0]}`}
              >
                <Text style={styles.demoItemName}>{getPatternName(p)}</Text>
                <Text style={styles.demoItemSsid}>
                  {p.ssids[0]} ({p.portalType})
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}

      {/* Profile Warning (only show after store hydration) */}
      {_hydrated && !profile && (
        <View
          style={styles.warningCard}
          accessibilityRole="alert"
        >
          <Text style={styles.warningText}>
            {t("home.profileWarning")}
          </Text>
        </View>
      )}

      {/* WiFi Settings & Refresh */}
      <View style={styles.bottomButtons}>
        {!demoMode && (
          <TouchableOpacity
            style={styles.wifiSettingsButton}
            onPress={handleOpenWifiSettings}
            accessibilityRole="button"
          >
            <Text style={styles.wifiSettingsText}>
              {t("home.openWifiSettings")}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleRefresh}
          disabled={refreshing}
          accessibilityRole="button"
        >
          {refreshing ? (
            <ActivityIndicator size="small" color="#2196F3" />
          ) : (
            <Text style={styles.refreshText}>
              {demoMode ? t("home.updatePatterns") : t("home.updateStatus")}
            </Text>
          )}
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
    justifyContent: "center",
    minHeight: 44,
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
