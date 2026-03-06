import { create } from "zustand";
import type { UserProfile, WifiState, PortalPattern, AutoReconnectState, AutoReconnectStatus, GeofenceState, GeofenceStatus } from "@/lib/types";

// ===== User Profile Store =====

interface ProfileStore {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));

// ===== WiFi State Store =====

interface WifiStore {
  wifi: WifiState;
  setSSID: (ssid: string | null) => void;
  setMatchedPattern: (pattern: PortalPattern | null) => void;
  setPortalUrl: (url: string | null) => void;
  setStatus: (status: WifiState["status"]) => void;
  reset: () => void;
}

const initialWifiState: WifiState = {
  ssid: null,
  status: "disconnected",
  matchedPattern: null,
  portalUrl: null,
};

export const useWifiStore = create<WifiStore>((set) => ({
  wifi: initialWifiState,
  setSSID: (ssid) => set((s) => ({ wifi: { ...s.wifi, ssid } })),
  setMatchedPattern: (pattern) =>
    set((s) => ({ wifi: { ...s.wifi, matchedPattern: pattern } })),
  setPortalUrl: (url) =>
    set((s) => ({ wifi: { ...s.wifi, portalUrl: url } })),
  setStatus: (status) =>
    set((s) => ({ wifi: { ...s.wifi, status } })),
  reset: () => set({ wifi: initialWifiState }),
}));

// ===== Auto Reconnect Store =====

interface ReconnectStore {
  reconnect: AutoReconnectState;
  setReconnectStatus: (status: AutoReconnectStatus) => void;
  setReconnectPattern: (pattern: PortalPattern | null) => void;
  setLastCheckAt: (time: string) => void;
  resetReconnect: () => void;
}

const initialReconnectState: AutoReconnectState = {
  status: "idle",
  lastCheckAt: null,
  reconnectPattern: null,
};

export const useReconnectStore = create<ReconnectStore>((set) => ({
  reconnect: initialReconnectState,
  setReconnectStatus: (status) =>
    set((s) => ({ reconnect: { ...s.reconnect, status } })),
  setReconnectPattern: (pattern) =>
    set((s) => ({ reconnect: { ...s.reconnect, reconnectPattern: pattern } })),
  setLastCheckAt: (time) =>
    set((s) => ({ reconnect: { ...s.reconnect, lastCheckAt: time } })),
  resetReconnect: () => set({ reconnect: initialReconnectState }),
}));

// ===== Geofence Store =====

interface GeofenceStore {
  geofence: GeofenceState;
  setEnabled: (enabled: boolean) => void;
  setStatus: (status: GeofenceStatus) => void;
  setActiveRegionCount: (count: number) => void;
  setLastTriggered: (spotId: string) => void;
  resetGeofence: () => void;
}

const initialGeofenceState: GeofenceState = {
  enabled: false,
  status: "disabled",
  activeRegionCount: 0,
  lastTriggeredSpotId: null,
  lastTriggeredAt: null,
};

export const useGeofenceStore = create<GeofenceStore>((set) => ({
  geofence: initialGeofenceState,
  setEnabled: (enabled) =>
    set((s) => ({
      geofence: {
        ...s.geofence,
        enabled,
        status: enabled ? "initializing" : "disabled",
      },
    })),
  setStatus: (status) =>
    set((s) => ({ geofence: { ...s.geofence, status } })),
  setActiveRegionCount: (count) =>
    set((s) => ({ geofence: { ...s.geofence, activeRegionCount: count } })),
  setLastTriggered: (spotId) =>
    set((s) => ({
      geofence: {
        ...s.geofence,
        lastTriggeredSpotId: spotId,
        lastTriggeredAt: new Date().toISOString(),
      },
    })),
  resetGeofence: () => set({ geofence: initialGeofenceState }),
}));
