import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/lib/config";
import localPatternsData from "@/assets/portal-patterns/patterns-v1.json";
import type { PortalPattern, PatternBundle } from "@/lib/types";

const PATTERNS_CACHE_KEY = "autowifi_patterns_cache";
const VERSION_KEY = "autowifi_patterns_version";
const LAST_SYNC_KEY = "autowifi_patterns_last_sync";
const FETCH_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

function isValidPatternArray(data: unknown): data is PortalPattern[] {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return false;
  // Validate first element has required fields
  const first = data[0];
  return (
    typeof first === "object" &&
    first !== null &&
    typeof first.spotId === "string" &&
    typeof first.name === "string" &&
    Array.isArray(first.ssids)
  );
}

async function fetchWithRetry(
  url: string,
  retries: number = MAX_RETRIES
): Promise<Response> {
  let lastError: Error | null = null;
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (res.ok) return res;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      // Exponential backoff before retry
      if (i < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
      }
    }
  }
  throw lastError ?? new Error("Fetch failed");
}

export async function loadPatterns(): Promise<PortalPattern[]> {
  // Try fetching from API first
  try {
    const cachedVersion = await AsyncStorage.getItem(VERSION_KEY);
    const url = cachedVersion
      ? `${API_BASE_URL}/api/patterns?since_version=${cachedVersion}`
      : `${API_BASE_URL}/api/patterns`;

    const res = await fetchWithRetry(url);
    const data: PatternBundle = await res.json();
    if (data.patterns.length > 0 && isValidPatternArray(data.patterns)) {
      await AsyncStorage.setItem(
        PATTERNS_CACHE_KEY,
        JSON.stringify(data.patterns)
      );
      await AsyncStorage.setItem(VERSION_KEY, String(data.version));
      await AsyncStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
      return data.patterns;
    }
  } catch {
    // API not reachable after retries, fall through to cache
    console.warn("[pattern-sync] API fetch failed, using cache/local");
  }

  // Try cached patterns with validation
  try {
    const cached = await AsyncStorage.getItem(PATTERNS_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (isValidPatternArray(parsed)) {
        return parsed;
      }
      // Cache corrupted — clear it
      console.warn("[pattern-sync] Cache corrupted, clearing");
      await AsyncStorage.removeItem(PATTERNS_CACHE_KEY);
      await AsyncStorage.removeItem(VERSION_KEY);
    }
  } catch {
    // Cache read/parse failed — clear corrupted cache
    console.warn("[pattern-sync] Cache read failed, clearing");
    await AsyncStorage.removeItem(PATTERNS_CACHE_KEY);
    await AsyncStorage.removeItem(VERSION_KEY);
  }

  // Fall back to bundled local patterns
  return localPatternsData.patterns as PortalPattern[];
}

/**
 * Get the last sync timestamp, or null if never synced.
 */
export async function getLastSyncTime(): Promise<string | null> {
  return AsyncStorage.getItem(LAST_SYNC_KEY);
}

/**
 * Get the current cached pattern version, or null.
 */
export async function getCachedVersion(): Promise<number | null> {
  const v = await AsyncStorage.getItem(VERSION_KEY);
  return v ? Number(v) : null;
}
