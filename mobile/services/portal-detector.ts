const PROBE_URL = "http://connectivitycheck.gstatic.com/generate_204";
const FALLBACK_URLS = [
  "http://clients3.google.com/generate_204",
  "http://www.google.com/gen_204",
];
const TIMEOUT_MS = 5000;

interface PortalDetectionResult {
  isCaptive: boolean;
  portalUrl?: string;
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      headers: { "Cache-Control": "no-cache" },
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

export async function detectCaptivePortal(): Promise<PortalDetectionResult> {
  const urls = [PROBE_URL, ...FALLBACK_URLS];

  for (const url of urls) {
    try {
      const response = await fetchWithTimeout(url, TIMEOUT_MS);

      if (response.status === 204) {
        return { isCaptive: false };
      }

      if (response.status === 301 || response.status === 302) {
        const portalUrl = response.headers.get("Location") ?? undefined;
        return { isCaptive: true, portalUrl };
      }

      // Status 200 = portal intercepted our request
      return { isCaptive: true };
    } catch {
      // Network error or timeout - try next URL
      continue;
    }
  }

  // All probes failed - likely captive portal blocking
  return { isCaptive: true };
}

export async function verifyInternetAccess(): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(PROBE_URL, TIMEOUT_MS);
    return response.status === 204;
  } catch {
    return false;
  }
}
