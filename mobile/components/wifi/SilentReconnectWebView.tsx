import { useEffect, useRef, useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { WebView, type WebViewMessageEvent } from "react-native-webview";
import { View } from "@/components/Themed";
import { useProfileStore, useReconnectStore } from "@/lib/store";
import { generateAutomationScript } from "@/services/portal-automator";
import { getCredentials } from "@/services/credential-manager";
import { verifyReconnection } from "@/services/auto-reconnect";
import type { PortalPattern, AutomationMessage } from "@/lib/types";

interface SilentReconnectWebViewProps {
  pattern: PortalPattern;
  onComplete: (success: boolean) => void;
}

/**
 * Hidden WebView that performs silent portal re-authentication.
 * Rendered with 0x0 dimensions so the user doesn't see it.
 */
export function SilentReconnectWebView({
  pattern,
  onComplete,
}: SilentReconnectWebViewProps) {
  const webViewRef = useRef<WebView>(null);
  const { profile, _hydrated } = useProfileStore();
  const { setReconnectStatus } = useReconnectStore();
  const [portalUrl, setPortalUrl] = useState<string | null>(null);
  const [injectionScript, setInjectionScript] = useState<string | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!_hydrated) return; // Wait for store rehydration
    if (!profile) {
      onComplete(false);
      return;
    }

    const init = async () => {
      const saved = await getCredentials(pattern.spotId);

      const { script } = generateAutomationScript(pattern, profile, saved);
      setInjectionScript(script);

      const url =
        pattern.portalUrl ??
        "http://connectivitycheck.gstatic.com/generate_204";
      setPortalUrl(url);
    };

    init();
  }, [pattern, profile, _hydrated, onComplete]);

  const handleMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      if (completedRef.current) return;

      try {
        const msg: AutomationMessage = JSON.parse(event.nativeEvent.data);

        if (msg.status === "completed") {
          completedRef.current = true;
          const success = await verifyReconnection(pattern.spotId);

          if (success) {
            setReconnectStatus("reconnected");
            onComplete(true);

            // Auto-dismiss after 3 seconds
            setTimeout(() => {
              setReconnectStatus("idle");
            }, 3000);
          } else {
            setReconnectStatus("failed");
            onComplete(false);

            // Auto-dismiss after 5 seconds
            setTimeout(() => {
              setReconnectStatus("idle");
            }, 5000);
          }
        }

        if (msg.status === "error") {
          completedRef.current = true;
          setReconnectStatus("failed");
          onComplete(false);

          setTimeout(() => {
            setReconnectStatus("idle");
          }, 5000);
        }
      } catch {
        // Non-JSON message, ignore
      }
    },
    [pattern.spotId, onComplete, setReconnectStatus]
  );

  if (!portalUrl || !injectionScript) return null;

  return (
    <View style={styles.hidden}>
      <WebView
        ref={webViewRef}
        source={{ uri: portalUrl }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
        injectedJavaScript={injectionScript}
        onMessage={handleMessage}
        userAgent="Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    width: 0,
    height: 0,
    overflow: "hidden",
    position: "absolute",
    opacity: 0,
  },
  webview: {
    width: 1,
    height: 1,
  },
});
