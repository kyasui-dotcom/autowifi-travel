import { NextRequest, NextResponse } from "next/server";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";
import type { AiraloNotificationType } from "@/lib/airalo/types";

const NOTIFICATION_TYPES: AiraloNotificationType[] = [
  "async_orders",
  "webhook_low_data",
  "webhook_credit_limit",
];

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

    const airalo = getAiraloClient(env);
    const results: Record<string, unknown> = {};

    for (const type of NOTIFICATION_TYPES) {
      try {
        const result = await airalo.webhookOptIn(
          type,
          webhookUrl,
          type === "webhook_credit_limit" ? creditLimitLevels : undefined
        );
        results[type] = { status: "opted_in", ...result };
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

    const airalo = getAiraloClient(env);
    const results: Record<string, unknown> = {};

    for (const type of NOTIFICATION_TYPES) {
      try {
        const status = await airalo.webhookStatus(type);
        results[type] = status;
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
