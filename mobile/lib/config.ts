const DEFAULT_API_URL = "https://autowifi-travel-api.yasuikunihiro.workers.dev";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_API_URL;
