import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView, type WebViewMessageEvent } from "react-native-webview";
import { useTranslation } from "react-i18next";
import { Text, View } from "@/components/Themed";
import { useProfileStore, useWifiStore } from "@/lib/store";
import { generateAutomationScript } from "@/services/portal-automator";
import {
  generateScannerScript,
  generateAutoScript,
} from "@/services/portal-auto-detector";
import {
  getCredentials,
  saveCredentials,
} from "@/services/credential-manager";
import { verifyInternetAccess } from "@/services/portal-detector";
import { loadPatterns } from "@/services/pattern-sync";
import { getPatternName } from "@/lib/i18n";
import type {
  PortalPattern,
  AutomationMessage,
  AutoDetectedPortal,
  SavedCredentials,
} from "@/lib/types";

// Try to import native wifi module (unavailable in Expo Go)
let forceWifiUsage: (enable: boolean) => Promise<void> = async () => {};
try {
  const wm = require("@/services/wifi-manager");
  forceWifiUsage = wm.forceWifiUsage;
} catch {
  // Expo Go
}

type Phase = "loading" | "scanning" | "automating" | "verifying" | "success" | "failed" | "manual";

// Special spotId used when no known pattern matches
const AUTO_DETECT_SPOT = "__auto_detect__";

export default function PortalScreen() {
  const { spotId } = useLocalSearchParams<{ spotId: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { profile, _hydrated } = useProfileStore();
  const { wifi, setStatus } = useWifiStore();
  const webViewRef = useRef<WebView>(null);

  const [phase, setPhase] = useState<Phase>("loading");
  const [logs, setLogs] = useState<string[]>([]);
  const [portalUrl, setPortalUrl] = useState<string | null>(null);
  const [injectionScript, setInjectionScript] = useState<string | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState<string | undefined>();
  const [pattern, setPattern] = useState<PortalPattern | undefined>();
  const [isAutoDetectMode, setIsAutoDetectMode] = useState(false);
  const [scanResult, setScanResult] = useState<AutoDetectedPortal | null>(null);

  useEffect(() => {
    if (spotId === AUTO_DETECT_SPOT) {
      // Auto-detect mode: no known pattern, scan the portal page
      setIsAutoDetectMode(true);
      return;
    }
    loadPatterns().then((patterns) => {
      setPattern(patterns.find((p) => p.spotId === spotId));
    });
  }, [spotId]);

  const logIdRef = useRef(0);
  const addLog = useCallback((msg: string) => {
    const id = ++logIdRef.current;
    const time = new Date().toLocaleTimeString("en", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLogs((prev) => [...prev.slice(-20), `[${time}] ${msg}`]);
  }, []);

  // Auto-detect mode: inject scanner script
  useEffect(() => {
    if (!isAutoDetectMode) return;

    const init = async () => {
      await forceWifiUsage(true);
      setInjectionScript(generateScannerScript());
      setPhase("scanning");
      addLog("Scanning portal page structure...");

      const url =
        wifi.portalUrl ?? "http://connectivitycheck.gstatic.com/generate_204";
      setPortalUrl(url);
    };

    init();
    return () => { forceWifiUsage(false); };
  }, [isAutoDetectMode, wifi.portalUrl]);

  // Known pattern mode
  useEffect(() => {
    if (!pattern || !profile || isAutoDetectMode) return;

    const init = async () => {
      // Force WiFi usage to prevent Android from switching to mobile data
      await forceWifiUsage(true);

      // Check for saved credentials
      const saved = await getCredentials(pattern.spotId);

      // Generate automation script
      const { script, generatedPassword: gp } = generateAutomationScript(
        pattern,
        profile,
        saved
      );
      setInjectionScript(script);
      setGeneratedPassword(gp);

      // Determine portal URL
      const url =
        wifi.portalUrl ??
        pattern.portalUrl ??
        "http://connectivitycheck.gstatic.com/generate_204";
      setPortalUrl(url);
    };

    init();

    return () => {
      forceWifiUsage(false);
    };
  }, [pattern, profile, isAutoDetectMode, wifi.portalUrl]);

  const handleMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      try {
        const parsed = JSON.parse(event.nativeEvent.data);

        // Handle scan results from auto-detect mode
        if (parsed.type === "portal_scan_result") {
          const scan = parsed as AutoDetectedPortal;
          setScanResult(scan);
          addLog(`Scan: detected ${scan.detectedType} portal (${Math.round(scan.confidence * 100)}% confidence)`);
          addLog(`  Fields: ${scan.fields.length}, Buttons: ${scan.actions.length}, Checkboxes: ${scan.checkboxes.length}`);

          if (scan.confidence >= 0.5) {
            // Generate and inject automation script
            const autoScript = generateAutoScript(scan, profile?.email);
            addLog("Injecting auto-detected automation script...");
            webViewRef.current?.injectJavaScript(autoScript);
          } else {
            addLog("Low confidence — switching to manual mode");
            setPhase("manual");
          }
          return;
        }

        // Handle automation status messages
        const msg: AutomationMessage = parsed;
        addLog(`[${msg.status}] ${msg.detail}`);

        if (msg.status === "started") {
          setPhase("automating");
        }

        if (msg.status === "completed") {
          setPhase("verifying");
          addLog("Verifying internet access...");

          // Wait a moment for the portal to process
          await new Promise((r) => setTimeout(r, 2000));
          const hasInternet = await verifyInternetAccess();

          if (hasInternet) {
            setPhase("success");
            setStatus("connected");
            addLog("Internet access confirmed!");

            // Save credentials for next time
            if (pattern && generatedPassword) {
              const creds: SavedCredentials = {
                spotId: pattern.spotId,
                password: generatedPassword,
                registeredAt: new Date().toISOString(),
              };
              await saveCredentials(creds);
              addLog("Credentials saved for next visit");
            }
          } else {
            setPhase("failed");
            addLog("Internet access not available. Portal may need manual interaction.");
          }
        }

        if (msg.status === "error") {
          setPhase("failed");
          addLog(`Automation error: ${msg.detail}`);
        }
      } catch {
        // Non-JSON message from WebView, ignore
      }
    },
    [addLog, pattern, profile, generatedPassword, setStatus]
  );

  const handleManualMode = () => {
    setPhase("manual");
    addLog("Switched to manual mode");
  };

  const handleRetry = () => {
    setPhase("loading");
    if (webViewRef.current && injectionScript) {
      webViewRef.current.reload();
    }
  };

  if (!pattern && !isAutoDetectMode) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {t('portal.spotNotFound', { spotId })}
        </Text>
      </View>
    );
  }

  if (_hydrated && !profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {t('portal.setProfileFirst')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isAutoDetectMode
            ? (scanResult ? `Auto: ${scanResult.detectedType}` : t('portal.autoDetect'))
            : getPatternName(pattern!)}
        </Text>
        <View style={[styles.phaseBadge, styles[`phase_${phase}`]]}>
          <Text style={styles.phaseText}>
            {phase === "scanning" ? t('portal.phase.scanning', { defaultValue: 'Scanning' }) : t(`portal.phase.${phase}`)}
          </Text>
        </View>
      </View>

      {/* WebView */}
      {portalUrl && (
        <View style={styles.webviewContainer}>
          {phase === "scanning" && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#FF9800" />
              <Text style={styles.overlayText}>
                {t('portal.phase.scanning', { defaultValue: 'Scanning portal...' })}
              </Text>
            </View>
          )}
          {phase === "automating" && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={styles.overlayText}>
                {t('portal.phase.automating')}
              </Text>
            </View>
          )}
          <WebView
            ref={webViewRef}
            source={{ uri: portalUrl }}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            thirdPartyCookiesEnabled
            injectedJavaScript={
              phase !== "manual" ? injectionScript ?? undefined : undefined
            }
            onMessage={handleMessage}
            onLoadStart={() => {
              if (phase === "loading") addLog("Portal page loading...");
            }}
            onLoadEnd={() => {
              addLog("Portal page loaded");
            }}
            userAgent="Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
          />
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        {phase === "failed" && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRetry}
            >
              <Text style={styles.buttonText}>{t('common.retry')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.manualButton}
              onPress={handleManualMode}
            >
              <Text style={styles.buttonText}>{t('portal.manualConnect')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {phase === "success" && (
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>{t('common.done')}</Text>
          </TouchableOpacity>
        )}

        {(phase === "loading" || phase === "scanning" || phase === "automating") && (
          <TouchableOpacity
            style={styles.manualButton}
            onPress={handleManualMode}
          >
            <Text style={styles.buttonText}>{t('portal.switchManual')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Logs */}
      <View style={styles.logContainer}>
        {logs.slice(-5).map((log, i) => (
          <Text key={i} style={styles.logText}>
            {log}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150,150,150,0.2)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phaseBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  phaseText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  phase_loading: { backgroundColor: "#999" },
  phase_scanning: { backgroundColor: "#FF9800" },
  phase_automating: { backgroundColor: "#2196F3" },
  phase_verifying: { backgroundColor: "#FF9800" },
  phase_success: { backgroundColor: "#4CAF50" },
  phase_failed: { backgroundColor: "#f44336" },
  phase_manual: { backgroundColor: "#9C27B0" },
  webviewContainer: {
    flex: 1,
    position: "relative",
  },
  webview: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 12,
  },
  actions: {
    padding: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  retryButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  manualButton: {
    flex: 1,
    backgroundColor: "#9C27B0",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  doneButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  errorText: {
    padding: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#f44336",
  },
  logContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(150,150,150,0.2)",
    maxHeight: 120,
  },
  logText: {
    fontSize: 11,
    opacity: 0.5,
    fontFamily: "monospace",
    lineHeight: 16,
  },
});
