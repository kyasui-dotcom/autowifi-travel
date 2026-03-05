import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/lib/config";
import localPatternsData from "@/assets/portal-patterns/patterns-v1.json";
import type { PortalPattern, PatternBundle } from "@/lib/types";

const PATTERNS_CACHE_KEY = "autowifi_patterns_cache";
const VERSION_KEY = "autowifi_patterns_version";

export async function loadPatterns(): Promise<PortalPattern[]> {
  // Try fetching from API first
  try {
    const cachedVersion = await AsyncStorage.getItem(VERSION_KEY);
    const url = cachedVersion
      ? `${API_BASE_URL}/api/patterns?since_version=${cachedVersion}`
      : `${API_BASE_URL}/api/patterns`;

    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data: PatternBundle = await res.json();
      if (data.patterns.length > 0) {
        await AsyncStorage.setItem(
          PATTERNS_CACHE_KEY,
          JSON.stringify(data.patterns)
        );
        await AsyncStorage.setItem(VERSION_KEY, String(data.version));
        return data.patterns;
      }
    }
  } catch {
    // API not reachable, fall through
  }

  // Try cached patterns
  try {
    const cached = await AsyncStorage.getItem(PATTERNS_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached) as PortalPattern[];
    }
  } catch {
    // Cache read failed
  }

  // Fall back to bundled local patterns
  return localPatternsData.patterns as PortalPattern[];
}
