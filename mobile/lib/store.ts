import { create } from "zustand";
import type { UserProfile, WifiState, PortalPattern } from "@/lib/types";

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
