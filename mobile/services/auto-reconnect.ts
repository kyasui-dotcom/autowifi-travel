import { verifyInternetAccess } from "@/services/portal-detector";
import { getCredentials, updateLastUsed } from "@/services/credential-manager";
import { loadPatterns } from "@/services/pattern-sync";
import type { PortalPattern, AutoReconnectStatus } from "@/lib/types";

export interface ReconnectResult {
  status: AutoReconnectStatus;
  pattern: PortalPattern | null;
}

/**
 * Check if internet is still accessible.
 * If not, try to match SSID to a pattern and find saved credentials.
 *
 * Returns:
 * - "idle" if internet is still accessible
 * - "reconnecting" if we found a pattern + credentials and should auto-reconnect
 * - "no_credentials" if pattern matched but no saved credentials
 * - "failed" if no matching pattern found
 */
export async function checkAndReconnect(
  currentSSID: string | null
): Promise<ReconnectResult> {
  // Step 1: Check if internet is actually down
  const hasInternet = await verifyInternetAccess();
  if (hasInternet) {
    return { status: "idle", pattern: null };
  }

  // Step 2: No internet - check if we're on a known WiFi
  if (!currentSSID) {
    return { status: "failed", pattern: null };
  }

  // Step 3: Match SSID to pattern
  const patterns = await loadPatterns();
  const matchedPattern = patterns.find((p) => p.ssids.includes(currentSSID));

  if (!matchedPattern) {
    return { status: "failed", pattern: null };
  }

  // Step 4: Check for saved credentials
  const credentials = await getCredentials(matchedPattern.spotId);

  if (!credentials && matchedPattern.portalType !== "agree_only") {
    return { status: "no_credentials", pattern: matchedPattern };
  }

  // Step 5: We have credentials (or agree_only) - signal reconnect needed
  return { status: "reconnecting", pattern: matchedPattern };
}

/**
 * After silent WebView reconnection completes, verify and update last used.
 */
export async function verifyReconnection(
  spotId: string
): Promise<boolean> {
  // Wait for portal to process
  await new Promise((r) => setTimeout(r, 2000));

  const hasInternet = await verifyInternetAccess();
  if (hasInternet) {
    await updateLastUsed(spotId);
    return true;
  }
  return false;
}
