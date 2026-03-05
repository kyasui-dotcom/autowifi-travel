import * as SecureStore from "expo-secure-store";
import type { SavedCredentials } from "@/lib/types";

const CREDENTIALS_KEY = "autowifi_credentials";

async function getAllCredentials(): Promise<Record<string, SavedCredentials>> {
  try {
    const raw = await SecureStore.getItemAsync(CREDENTIALS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
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
  return all[spotId] ?? null;
}

export async function saveCredentials(
  credentials: SavedCredentials
): Promise<void> {
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
