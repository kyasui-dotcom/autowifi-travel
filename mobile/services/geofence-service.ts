import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import geofenceData from "@/assets/portal-patterns/geofence-data.json";
import type { GeofenceRegion, GeofenceBundle } from "@/lib/types";
import { loadPatterns } from "@/services/pattern-sync";

// Constants
const GEOFENCE_TASK_NAME = "autowifi-geofence-task";
const GEOFENCE_ENABLED_KEY = "autowifi_geofence_enabled";
const MAX_REGIONS_IOS = 20;
const MAX_REGIONS_ANDROID = 100;

// ---- Background task definition (must be at module top level) ----
TaskManager.defineTask(GEOFENCE_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Geofence task error:", error);
    return;
  }

  const { eventType, region } = data as {
    eventType: Location.GeofencingEventType;
    region: Location.LocationRegion;
  };

  if (eventType === Location.GeofencingEventType.Enter) {
    const spotId = region.identifier.replace("geofence_", "");

    // Look up pattern name for notification
    try {
      const patterns = await loadPatterns();
      const pattern = patterns.find((p) => p.spotId === spotId);
      const spotName = pattern?.name ?? spotId;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📶 WiFi Available Nearby",
          body: `${spotName} WiFi detected. Tap to auto-connect.`,
          data: { spotId, action: "open_and_connect" },
          sound: "default",
        },
        trigger: null, // Fire immediately
      });
    } catch (err) {
      console.error("Failed to send geofence notification:", err);
    }
  }
});

// ---- Public API ----

export async function isGeofenceEnabled(): Promise<boolean> {
  const val = await AsyncStorage.getItem(GEOFENCE_ENABLED_KEY);
  return val === "true";
}

export async function setGeofenceEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(GEOFENCE_ENABLED_KEY, String(enabled));
}

export async function requestGeofencePermissions(): Promise<boolean> {
  // Step 1: Foreground location
  const { status: fgStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (fgStatus !== "granted") return false;

  // Step 2: Background location (required for geofencing)
  const { status: bgStatus } =
    await Location.requestBackgroundPermissionsAsync();
  if (bgStatus !== "granted") return false;

  // Step 3: Notification permission
  const { status: notifStatus } =
    await Notifications.requestPermissionsAsync();
  if (notifStatus !== "granted") return false;

  return true;
}

export function getGeofenceableRegions(): GeofenceRegion[] {
  return (geofenceData as GeofenceBundle).regions;
}

export function getMaxRegions(): number {
  return Platform.OS === "ios" ? MAX_REGIONS_IOS : MAX_REGIONS_ANDROID;
}

/**
 * Select nearest regions based on user's current location.
 * iOS limited to 20, Android up to 100.
 */
export async function selectNearestRegions(): Promise<GeofenceRegion[]> {
  const maxRegions = getMaxRegions();
  const allRegions = getGeofenceableRegions();

  // If within limit, use all
  if (allRegions.length <= maxRegions) {
    return allRegions;
  }

  // Get current location to sort by distance
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const sorted = allRegions
      .map((r) => ({
        ...r,
        distance: haversineDistance(
          location.coords.latitude,
          location.coords.longitude,
          r.latitude,
          r.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    return sorted.slice(0, maxRegions);
  } catch {
    // Fallback: return first N
    return allRegions.slice(0, maxRegions);
  }
}

/**
 * Start monitoring geofences for nearest regions.
 */
export async function startGeofenceMonitoring(): Promise<number> {
  const regions = await selectNearestRegions();

  const locationRegions: Location.LocationRegion[] = regions.map((r) => ({
    identifier: r.identifier,
    latitude: r.latitude,
    longitude: r.longitude,
    radius: r.radius,
    notifyOnEnter: true,
    notifyOnExit: false,
  }));

  await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, locationRegions);

  return regions.length;
}

export async function stopGeofenceMonitoring(): Promise<void> {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    GEOFENCE_TASK_NAME
  );
  if (isRegistered) {
    await Location.stopGeofencingAsync(GEOFENCE_TASK_NAME);
  }
}

/**
 * Refresh geofence regions (e.g., after significant location change).
 */
export async function refreshGeofenceRegions(): Promise<number> {
  await stopGeofenceMonitoring();
  return startGeofenceMonitoring();
}

// ---- Helpers ----

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
