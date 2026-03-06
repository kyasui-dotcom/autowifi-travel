import { useEffect, useRef, useCallback } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { useReconnectStore, useWifiStore } from "@/lib/store";
import { checkAndReconnect } from "@/services/auto-reconnect";

const CHECK_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes
const RESUME_DELAY_MS = 3000; // 3 seconds after app resume

/**
 * Hook that periodically checks internet connectivity
 * and triggers auto-reconnection when WiFi session expires.
 *
 * Only active when wifi.status === "connected" (i.e., after initial portal auth).
 */
export function useAutoReconnect() {
  const { wifi } = useWifiStore();
  const {
    reconnect,
    setReconnectStatus,
    setReconnectPattern,
    setLastCheckAt,
    resetReconnect,
  } = useReconnectStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const performCheck = useCallback(async () => {
    // Only check when status is "connected" (portal was already passed)
    if (wifi.status !== "connected") return;

    setReconnectStatus("checking");

    try {
      const result = await checkAndReconnect(wifi.ssid);
      setLastCheckAt(new Date().toISOString());

      if (result.status === "idle") {
        // Internet is fine
        setReconnectStatus("idle");
        setReconnectPattern(null);
      } else if (result.status === "reconnecting") {
        // Need to reconnect via silent WebView
        setReconnectStatus("reconnecting");
        setReconnectPattern(result.pattern);
      } else if (result.status === "no_credentials") {
        setReconnectStatus("no_credentials");
        setReconnectPattern(result.pattern);
      } else {
        setReconnectStatus("failed");
        setReconnectPattern(null);
      }
    } catch {
      setReconnectStatus("failed");
    }
  }, [
    wifi.status,
    wifi.ssid,
    setReconnectStatus,
    setReconnectPattern,
    setLastCheckAt,
  ]);

  // Periodic interval check
  useEffect(() => {
    if (wifi.status !== "connected") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      resetReconnect();
      return;
    }

    // Start periodic checking
    intervalRef.current = setInterval(performCheck, CHECK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [wifi.status, performCheck, resetReconnect]);

  // AppState listener: check on app resume
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          appStateRef.current.match(/inactive|background/) &&
          nextAppState === "active" &&
          wifi.status === "connected"
        ) {
          // App came back to foreground - check after delay
          setTimeout(performCheck, RESUME_DELAY_MS);
        }
        appStateRef.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [wifi.status, performCheck]);

  return {
    reconnectStatus: reconnect.status,
    reconnectPattern: reconnect.reconnectPattern,
    lastCheckAt: reconnect.lastCheckAt,
    triggerCheck: performCheck,
  };
}
