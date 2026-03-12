import { getCloudflareContext } from "@opennextjs/cloudflare";

interface AppEnv {
  DB: D1Database;
  AIRALO_CLIENT_ID?: string;
  AIRALO_CLIENT_SECRET?: string;
  AIRALO_BASE_URL?: string;
  AIRALO_MOCK_MODE?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  APP_DEEP_LINK_SCHEME?: string;
  APP_SUCCESS_URL?: string;
}

export async function getEnv(): Promise<AppEnv> {
  const { env } = await getCloudflareContext();
  return env as AppEnv;
}
