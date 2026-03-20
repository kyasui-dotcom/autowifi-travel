import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";

type AiraloNotificationType =
  | "async_orders"
  | "webhook_low_data"
  | "webhook_credit_limit";

const NOTIFICATION_TYPES: AiraloNotificationType[] = [
  "async_orders",
  "webhook_low_data",
  "webhook_credit_limit",
];

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(env: {
  AIRALO_BASE_URL?: string;
  AIRALO_CLIENT_ID?: string;
  AIRALO_CLIENT_SECRET?: string;
}) {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  if (!env.AIRALO_CLIENT_ID || !env.AIRALO_CLIENT_SECRET) {
    throw new Error("Missing Airalo credentials");
  }

  const form = new FormData();
  form.append("client_id", env.AIRALO_CLIENT_ID);
  form.append("client_secret", env.AIRALO_CLIENT_SECRET);
  form.append("grant_type", "client_credentials");

  const response = await fetch(
    `${env.AIRALO_BASE_URL || "https://partners-api.airalo.com"}/v2/token`,
    {
      method: "POST",
      body: form,
    }
  );

  if (!response.ok) {
    throw new Error(`Airalo token request failed: ${response.status}`);
  }

  const json = (await response.json()) as {
    data: {
      access_token: string;
      expires_in: number;
    };
  };

  cachedToken = {
    token: json.data.access_token,
    expiresAt: Date.now() + (json.data.expires_in - 60) * 1000,
  };

  return cachedToken.token;
}

async function authFetch(
  env: {
    AIRALO_BASE_URL?: string;
    AIRALO_CLIENT_ID?: string;
    AIRALO_CLIENT_SECRET?: string;
  },
  path: string,
  init?: RequestInit
) {
  const token = await getAccessToken(env);
  const response = await fetch(
    `${env.AIRALO_BASE_URL || "https://partners-api.airalo.com"}${path}`,
    {
      ...init,
      headers: {
        Accept: "application/json",
        ...init?.headers,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Airalo API error ${response.status}: ${text}`);
  }

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const env = await getEnv();
    const secret = request.headers.get("x-cron-secret");

    if (env.CRON_SECRET && secret !== env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as {
      webhook_url?: string;
      credit_limit_levels?: number[];
    };

    const webhookBaseUrl =
      env.AIRALO_WEBHOOK_BASE_URL ||
      env.WEB_BASE_URL ||
      "https://autowifi-travel.com";
    const webhookUrl =
      body.webhook_url ||
      `${webhookBaseUrl.replace(/\/$/, "")}/api/esim/webhooks/airalo`;
    const creditLimitLevels = body.credit_limit_levels?.length
      ? body.credit_limit_levels
      : [50, 20];

    const results: Record<string, unknown> = {};

    for (const type of NOTIFICATION_TYPES) {
      try {
        const form = new FormData();
        form.append("type", type);
        form.append("webhook_url", webhookUrl);
        if (type === "webhook_credit_limit") {
          for (const level of creditLimitLevels) {
            form.append("levels[]", String(level));
          }
        }

        const response = await authFetch(env, "/v2/notifications/opt-in", {
          method: "POST",
          body: form,
        });
        const json = (await response.json()) as {
          data?: {
            notification?: unknown;
          };
          meta?: {
            message?: string;
          };
        };
        results[type] = {
          status: "opted_in",
          notification: json.data?.notification ?? null,
          message: json.meta?.message ?? null,
        };
      } catch (err) {
        results[type] = {
          status: "error",
          message: err instanceof Error ? err.message : String(err),
        };
      }
    }

    return NextResponse.json({
      success: true,
      webhook_url: webhookUrl,
      credit_limit_levels: creditLimitLevels,
      results,
    });
  } catch (error) {
    console.error("[Webhook Setup] Error:", error);
    return NextResponse.json(
      { error: "Webhook setup failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const env = await getEnv();
    const secret = request.nextUrl.searchParams.get("secret");

    if (env.CRON_SECRET && secret !== env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results: Record<string, unknown> = {};

    for (const type of NOTIFICATION_TYPES) {
      try {
        const response = await authFetch(
          env,
          `/v2/notifications/opt-in?type=${encodeURIComponent(type)}`
        );
        const json = (await response.json()) as {
          data?: {
            notification?: unknown;
          };
          meta?: {
            message?: string;
          };
        };
        results[type] = {
          status: "ok",
          notification: json.data?.notification ?? null,
          message: json.meta?.message ?? null,
        };
      } catch (err) {
        results[type] = {
          status: "error",
          message: err instanceof Error ? err.message : String(err),
        };
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[Webhook Status] Error:", error);
    return NextResponse.json(
      { error: "Failed to check webhook status" },
      { status: 500 }
    );
  }
}
