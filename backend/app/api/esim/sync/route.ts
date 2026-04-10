import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { syncAiraloPackages } from "@/lib/airalo/sync-packages";

/**
 * Full package sync endpoint.
 * Fetches all currently available Airalo SIM packages, upserts them into cache,
 * and marks packages missing from the latest sync as inactive.
 *
 * Protected by CRON_SECRET header to prevent unauthorized access.
 */
export async function POST(request: NextRequest) {
  try {
    const env = await getEnv();

    const cronSecret = request.headers.get("x-cron-secret");
    if (env.CRON_SECRET && cronSecret !== env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await syncAiraloPackages(env);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Package Sync] Fatal error:", error);
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 }
    );
  }
}
