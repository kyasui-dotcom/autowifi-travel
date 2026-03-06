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

  // Initialize geofence state from persisted setting
  useEffect(() => {
    isGeofenceEnabled().then((enabled) => {
      if (enabled) {
        setEnabled(true);
      }
    });
  }, [setEnabled]);

  // Start/stop monitoring based on enabled state
  useEffect(() => {
    if (!geofence.enabled) {
      stopGeofenceMonitoring().catch(() => {});
      return;
    }

    const init = async () => {
      setStatus("initializing");

      const hasPermission = await requestGeofencePermissions();
      if (!hasPermission) {
        setStatus("permission_denied");
        setEnabled(false);
        await setGeofenceEnabled(false);
        return;
      }

      try {
        const count = await startGeofenceMonitoring();
        setActiveRegionCount(count);
        setStatus("monitoring");
      } catch (err) {
        console.error("Failed to start geofence monitoring:", err);
        setStatus("error");
      }
    };

    init();

    return () => {
      stopGeofenceMonitoring().catch(() => {});
    };
  }, [geofence.enabled, setStatus, setEnabled, setActiveRegionCount]);

  // Listen for notification taps
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

  // Toggle function for settings UI
  const toggleGeofence = useCallback(
    async (enable: boolean) => {
      await setGeofenceEnabled(enable);
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
