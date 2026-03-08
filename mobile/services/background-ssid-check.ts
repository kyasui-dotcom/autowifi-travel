import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadPatterns } from "@/services/pattern-sync";
import { getPatternName } from "@/lib/i18n";

// Constants
const SSID_CHECK_TASK_NAME = "autowifi-ssid-check-task";
const SSID_CHECK_ENABLED_KEY = "autowifi_ssid_check_enabled";
const LAST_NOTIFIED_KEY = "autowifi_last_ssid_notified";
const NOTIFICATION_COOLDOWN_MS = 10 * 60 * 1000; // 10 min cooldown per SSID

// Dynamically import wifi-manager (unavailable in Expo Go)
let getCurrentSSID: () => Promise<string | null>;
let nativeWifiAvailable = false;
try {
  const wm = require("@/services/wifi-manager");
  getCurrentSSID = wm.getCurrentSSID;
  nativeWifiAvailable = true;
} catch {
  // Expo Go - native modules not available
}

// ---- Background task definition (must be at module top level) ----
TaskManager.defineTask(SSID_CHECK_TASK_NAME, async () => {
  if (!nativeWifiAvailable) {
    return BackgroundFetch.BackgroundFetchResult.NoData;
  }

  try {
    const ssid = await getCurrentSSID();
    if (!ssid) {
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Check against pattern database
    const patterns = await loadPatterns();
    const matched = patterns.find((p) => p.ssids.includes(ssid));
    if (!matched) {
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Cooldown check - don't spam notifications for same SSID
    const lastNotified = await AsyncStorage.getItem(LAST_NOTIFIED_KEY);
    if (lastNotified) {
      try {
        const data = JSON.parse(lastNotified);
        if (
          data.spotId === matched.spotId &&
          Date.now() - data.timestamp < NOTIFICATION_COOLDOWN_MS
        ) {
          return BackgroundFetch.BackgroundFetchResult.NoData;
        }
      } catch {
        // Invalid data, proceed
      }
    }

    // Send notification
    const spotName = getPatternName(matched);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📶 WiFi Auto-Connect Available",
        body: `${spotName} (${ssid}) - Tap to auto-connect`,
        data: { spotId: matched.spotId, action: "open_and_connect" },
        sound: "default",
      },
      trigger: null, // Fire immediately
    });

    // Record last notification
    await AsyncStorage.setItem(
      LAST_NOTIFIED_KEY,
      JSON.stringify({ spotId: matched.spotId, ssid, timestamp: Date.now() })
    );

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (err) {
    console.error("[ssid-check] Background task error:", err);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// ---- Public API ----

export async function isSsidCheckEnabled(): Promise<boolean> {
  const val = await AsyncStorage.getItem(SSID_CHECK_ENABLED_KEY);
  return val === "true";
}

export async function setSsidCheckEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(SSID_CHECK_ENABLED_KEY, String(enabled));
}

export async function startSsidCheckMonitoring(): Promise<void> {
  if (!nativeWifiAvailable) return;

  // Register background fetch with minimum interval
  // Android: OS decides actual interval (typically 15-30 min)
  // iOS: OS decides (can be longer depending on app usage patterns)
  await BackgroundFetch.registerTaskAsync(SSID_CHECK_TASK_NAME, {
    minimumInterval: 15 * 60, // 15 minutes (minimum hint to OS)
    stopOnTerminate: false, // Continue after app kill (Android)
    startOnBoot: true, // Start after reboot (Android)
  });
}

export async function stopSsidCheckMonitoring(): Promise<void> {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    SSID_CHECK_TASK_NAME
  );
  if (isRegistered) {
    await BackgroundFetch.unregisterTaskAsync(SSID_CHECK_TASK_NAME);
  }
}

export function isNativeWifiAvailable(): boolean {
  return nativeWifiAvailable;
}
