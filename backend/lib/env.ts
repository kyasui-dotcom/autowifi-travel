import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface AppEnv {
  DB: D1Database;
  AIRALO_CLIENT_ID?: string;
  AIRALO_CLIENT_SECRET?: string;
  AIRALO_BASE_URL?: string;
  AIRALO_MOCK_MODE?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  APP_DEEP_LINK_SCHEME?: string;
  APP_SUCCESS_URL?: string;
  WEB_BASE_URL?: string;
  CRON_SECRET?: string;
  RESEND_API_KEY?: string;
  AIRALO_WEBHOOK_SECRET?: string;
  ADMIN_EMAIL?: string;
}

export async function getEnv(): Promise<AppEnv> {
  const { env } = await getCloudflareContext();
  return env as AppEnv;
}
