import { create, type StateCreator } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UserProfile, WifiState, PortalPattern, AutoReconnectState, AutoReconnectStatus, GeofenceState, GeofenceStatus, EsimOrder } from "@/lib/types";

// SSR-safe storage wrapper: falls back to no-op when window is not available
const safeStorage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    const noop: StateStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
    return noop;
  }
  return AsyncStorage;
});

// ===== User Profile Store (persisted to AsyncStorage) =====

interface ProfileStore {
  profile: UserProfile | null;
  _hydrated: boolean;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      _hydrated: false,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "autowifi_user_profile",
      storage: safeStorage,
      partialize: (state) => ({ profile: state.profile }),
      onRehydrateStorage: () => () => {
        useProfileStore.setState({ _hydrated: true });
      },
    }
  )
);

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

// ===== eSIM Orders Store (persisted to AsyncStorage) =====

interface EsimStore {
  orders: EsimOrder[];
  currentOrderId: string | null;
  setOrders: (orders: EsimOrder[]) => void;
  addOrder: (order: EsimOrder) => void;
  updateOrder: (orderId: string, updates: Partial<EsimOrder>) => void;
  setCurrentOrderId: (id: string | null) => void;
}

export const useEsimStore = create<EsimStore>()(
  persist(
    (set) => ({
      orders: [],
      currentOrderId: null,
      setOrders: (orders) => set({ orders }),
      addOrder: (order) =>
        set((s) => ({ orders: [order, ...s.orders] })),
      updateOrder: (orderId, updates) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.orderId === orderId ? { ...o, ...updates } : o
          ),
        })),
      setCurrentOrderId: (id) => set({ currentOrderId: id }),
    }),
    {
      name: "autowifi_esim_orders",
      storage: safeStorage,
      partialize: (state) => ({
        orders: state.orders,
        currentOrderId: state.currentOrderId,
      }),
    }
  )
);
