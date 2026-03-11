import * as SecureStore from "expo-secure-store";
import { AsyncMutex } from "@/services/async-mutex";
import type { SavedCredentials } from "@/lib/types";

const CREDENTIALS_KEY = "autowifi_credentials";
const MAX_CREDENTIAL_AGE_DAYS = 180; // 6 months
const MAX_CREDENTIALS = 500;

const credentialMutex = new AsyncMutex();

function isValidCredential(cred: unknown): cred is SavedCredentials {
  if (typeof cred !== "object" || cred === null) return false;
  const c = cred as Record<string, unknown>;
  return (
    typeof c.spotId === "string" &&
    c.spotId.length > 0 &&
    typeof c.registeredAt === "string"
  );
}

function isExpired(
  cred: SavedCredentials,
  maxAgeDays: number = MAX_CREDENTIAL_AGE_DAYS
): boolean {
  const age = Date.now() - new Date(cred.registeredAt).getTime();
  return age > maxAgeDays * 24 * 60 * 60 * 1000;
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
  spotId: string,
  maxAgeDays: number = MAX_CREDENTIAL_AGE_DAYS
): Promise<SavedCredentials | null> {
  const all = await getAllCredentials();
  const cred = all[spotId] ?? null;

  if (cred && isExpired(cred, maxAgeDays)) {
    console.warn(
      `[credential-manager] Credentials for ${spotId} expired (registered: ${cred.registeredAt})`
    );
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
  const release = await credentialMutex.acquire();
  try {
    const all = await getAllCredentials();
    all[credentials.spotId] = credentials;

    // Prune oldest credentials if over limit
    const entries = Object.entries(all);
    if (entries.length > MAX_CREDENTIALS) {
      entries.sort((a, b) => {
        const aTime = a[1].lastUsedAt ?? a[1].registeredAt;
        const bTime = b[1].lastUsedAt ?? b[1].registeredAt;
        return new Date(aTime).getTime() - new Date(bTime).getTime();
      });
      const toRemove = entries.slice(0, entries.length - MAX_CREDENTIALS);
      for (const [key] of toRemove) {
        delete all[key];
      }
    }

    await saveAllCredentials(all);
  } finally {
    release();
  }
}

export async function updateLastUsed(spotId: string): Promise<void> {
  const release = await credentialMutex.acquire();
  try {
    const all = await getAllCredentials();
    if (all[spotId]) {
      all[spotId].lastUsedAt = new Date().toISOString();
      await saveAllCredentials(all);
    }
  } finally {
    release();
  }
}

export async function deleteCredentials(spotId: string): Promise<void> {
  const release = await credentialMutex.acquire();
  try {
    const all = await getAllCredentials();
    delete all[spotId];
    await saveAllCredentials(all);
  } finally {
    release();
  }
}

/**
 * Remove all expired credentials from storage.
 */
export async function purgeExpiredCredentials(
  maxAgeDays: number = MAX_CREDENTIAL_AGE_DAYS
): Promise<number> {
  const all = await getAllCredentials();
  let purged = 0;
  for (const [key, cred] of Object.entries(all)) {
    if (isExpired(cred, maxAgeDays)) {
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
