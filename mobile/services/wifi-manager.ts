import WifiManager from "react-native-wifi-reborn";
import NetInfo from "@react-native-community/netinfo";
import { PermissionsAndroid, Platform } from "react-native";
import i18n from "@/lib/i18n";
import type { PortalPattern } from "@/lib/types";

export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS !== "android") return false;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: i18n.t("wifi.locationPermTitle"),
      message: i18n.t("wifi.locationPermMessage"),
      buttonPositive: i18n.t("wifi.locationPermAllow"),
      buttonNegative: i18n.t("wifi.locationPermDeny"),
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export async function getCurrentSSID(): Promise<string | null> {
  try {
    const ssid = await WifiManager.getCurrentWifiSSID();
    return ssid || null;
  } catch {
    return null;
  }
}

export function matchSSIDToPattern(
  ssid: string,
  patterns: PortalPattern[]
): PortalPattern | null {
  return patterns.find((p) => p.ssids.includes(ssid)) ?? null;
}

export function subscribeToWifiChanges(
  callback: (isWifi: boolean) => void
): () => void {
  const unsubscribe = NetInfo.addEventListener((state) => {
    callback(state.type === "wifi" && state.isConnected === true);
  });
  return unsubscribe;
}

export async function forceWifiUsage(enable: boolean): Promise<void> {
  if (Platform.OS !== "android") return;
  try {
    await WifiManager.forceWifiUsageWithOptions(enable, { noInternet: true });
  } catch {
    // Some Android versions may not support this
  }
}
