const ALLOWED_SCHEMES = ["http:", "https:"];
const MAX_SCRIPT_LENGTH = 100_000;

export function validatePortalUrl(url: string): {
  valid: boolean;
  reason?: string;
} {
  try {
    const parsed = new URL(url);
    if (!ALLOWED_SCHEMES.includes(parsed.protocol)) {
      return { valid: false, reason: `Blocked protocol: ${parsed.protocol}` };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: "Invalid URL format" };
  }
}

export function validateInjectionScript(script: string): {
  valid: boolean;
  reason?: string;
} {
  if (script.length > MAX_SCRIPT_LENGTH) {
    return {
      valid: false,
      reason: `Script exceeds ${MAX_SCRIPT_LENGTH} bytes`,
    };
  }
  return { valid: true };
}

export function sanitizePostMessage(data: string): unknown | null {
  try {
    const parsed = JSON.parse(data);
    if (
      parsed.type === "automation_status" ||
      parsed.type === "portal_scan_result"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}
