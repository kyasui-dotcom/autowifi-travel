import * as SecureStore from "expo-secure-store";
import type { SavedCredentials } from "@/lib/types";

const CREDENTIALS_KEY = "autowifi_credentials";
const MAX_CREDENTIAL_AGE_DAYS = 180; // 6 months

function isValidCredential(cred: unknown): cred is SavedCredentials {
  if (typeof cred !== "object" || cred === null) return false;
  const c = cred as Record<string, unknown>;
  return (
    typeof c.spotId === "string" &&
    c.spotId.length > 0 &&
    typeof c.registeredAt === "string"
  );
}

function isExpired(cred: SavedCredentials): boolean {
  const age = Date.now() - new Date(cred.registeredAt).getTime();
  return age > MAX_CREDENTIAL_AGE_DAYS * 24 * 60 * 60 * 1000;
}

async function getAllCredentials(): Promise<Record<string, SavedCredentials>> {
  try {
    const raw = await SecureStore.getItemAsync(CREDENTIALS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      console.warn("[credential-manager] Invalid credential store format, resetting");
      return {};
    }
    // Validate each entry
    const valid: Record<string, SavedCredentials> = {};
    for (const [key, val] of Object.entries(parsed)) {
      if (isValidCredential(val)) {
        valid[key] = val;
      }
    }
    return valid;
  } catch (e) {
    console.warn("[credential-manager] Failed to read credentials:", e);
    return {};
  }
}

async function saveAllCredentials(
  creds: Record<string, SavedCredentials>
): Promise<void> {
  await SecureStore.setItemAsync(CREDENTIALS_KEY, JSON.stringify(creds));
}

export async function getCredentials(
  spotId: string
): Promise<SavedCredentials | null> {
  const all = await getAllCredentials();
  const cred = all[spotId] ?? null;

  if (cred && isExpired(cred)) {
    console.warn(
      `[credential-manager] Credentials for ${spotId} expired (registered: ${cred.registeredAt})`
    );
    // Return credential but mark as potentially stale
    // The caller can decide whether to re-register
    return { ...cred, _expired: true } as SavedCredentials & { _expired: boolean };
  }

  return cred;
}

export async function saveCredentials(
  credentials: SavedCredentials
): Promise<void> {
  if (!isValidCredential(credentials)) {
    console.warn("[credential-manager] Attempted to save invalid credentials");
    return;
  }
  const all = await getAllCredentials();
  all[credentials.spotId] = credentials;
  await saveAllCredentials(all);
}

export async function updateLastUsed(spotId: string): Promise<void> {
  const all = await getAllCredentials();
  if (all[spotId]) {
    all[spotId].lastUsedAt = new Date().toISOString();
    await saveAllCredentials(all);
  }
}

export async function deleteCredentials(spotId: string): Promise<void> {
  const all = await getAllCredentials();
  delete all[spotId];
  await saveAllCredentials(all);
}

/**
 * Remove all expired credentials from storage.
 */
export async function purgeExpiredCredentials(): Promise<number> {
  const all = await getAllCredentials();
  let purged = 0;
  for (const [key, cred] of Object.entries(all)) {
    if (isExpired(cred)) {
      delete all[key];
      purged++;
    }
  }
  if (purged > 0) {
    await saveAllCredentials(all);
  }
  return purged;
}

/**
 * Get count of saved credentials.
 */
export async function getCredentialCount(): Promise<number> {
  const all = await getAllCredentials();
  return Object.keys(all).length;
}
