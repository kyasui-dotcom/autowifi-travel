import { useEffect, useCallback, useRef } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useGeofenceStore } from "@/lib/store";
import {
  isGeofenceEnabled,
  requestGeofencePermissions,
  startGeofenceMonitoring,
  stopGeofenceMonitoring,
  setGeofenceEnabled,
} from "@/services/geofence-service";
import {
  isSsidCheckEnabled,
  setSsidCheckEnabled,
  startSsidCheckMonitoring,
  stopSsidCheckMonitoring,
} from "@/services/background-ssid-check";

// Configure foreground notification display
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function useGeofenceMonitor() {
  const router = useRouter();
  const {
    geofence,
    setEnabled,
    setStatus,
    setActiveRegionCount,
    setLastTriggered,
  } = useGeofenceStore();
  const notificationResponseListener =
    useRef<Notifications.Subscription | null>(null);

  // Initialize geofence + SSID check state from persisted settings
  useEffect(() => {
    Promise.all([isGeofenceEnabled(), isSsidCheckEnabled()]).then(
      ([geoEnabled, ssidEnabled]) => {
        // If either is enabled, set the unified toggle on
        if (geoEnabled || ssidEnabled) {
          setEnabled(true);
        }
      }
    );
  }, [setEnabled]);

  // Start/stop monitoring based on enabled state
  useEffect(() => {
    if (!geofence.enabled) {
      stopGeofenceMonitoring().catch(() => {});
      stopSsidCheckMonitoring().catch(() => {});
      return;
    }

    const init = async () => {
      setStatus("initializing");

      const hasPermission = await requestGeofencePermissions();
      if (!hasPermission) {
        setStatus("permission_denied");
        setEnabled(false);
        await setGeofenceEnabled(false);
        await setSsidCheckEnabled(false);
        return;
      }

      try {
        // Start both geofence and background SSID check
        const count = await startGeofenceMonitoring();
        await startSsidCheckMonitoring();
        setActiveRegionCount(count);
        setStatus("monitoring");
      } catch (err) {
        console.error("Failed to start monitoring:", err);
        setStatus("error");
      }
    };

    init();

    return () => {
      stopGeofenceMonitoring().catch(() => {});
      stopSsidCheckMonitoring().catch(() => {});
    };
  }, [geofence.enabled, setStatus, setEnabled, setActiveRegionCount]);

  // Listen for notification taps (both geofence and SSID check notifications)
  useEffect(() => {
    notificationResponseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;

        if (data?.action === "open_and_connect" && data?.spotId) {
          const spotId = data.spotId as string;
          setLastTriggered(spotId);

          // Navigate to portal auto-connect screen
          router.push(`/portal/${spotId}` as any);
        }
      });

    return () => {
      if (notificationResponseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationResponseListener.current
        );
      }
    };
  }, [router, setLastTriggered]);

  // Toggle function for settings UI (controls both geofence + SSID check)
  const toggleGeofence = useCallback(
    async (enable: boolean) => {
      await setGeofenceEnabled(enable);
      await setSsidCheckEnabled(enable);
      setEnabled(enable);
    },
    [setEnabled]
  );

  return {
    geofenceEnabled: geofence.enabled,
    geofenceStatus: geofence.status,
    activeRegionCount: geofence.activeRegionCount,
    toggleGeofence,
  };
}
