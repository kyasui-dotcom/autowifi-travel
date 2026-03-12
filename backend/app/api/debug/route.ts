import { NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { getAiraloClient } from "@/lib/airalo";

export async function GET() {
  const steps: string[] = [];
  try {
    steps.push("1. Getting env...");
    const env = await getEnv();
    steps.push(
      `2. Env loaded: MOCK=${env.AIRALO_MOCK_MODE}, BASE_URL=${env.AIRALO_BASE_URL}, CLIENT_ID=${env.AIRALO_CLIENT_ID ? "SET(" + env.AIRALO_CLIENT_ID.slice(0, 4) + "...)" : "NOT_SET"}, SECRET=${env.AIRALO_CLIENT_SECRET ? "SET" : "NOT_SET"}`
    );

    steps.push("3. Creating client...");
    const client = getAiraloClient(env);

    steps.push("4. Fetching packages for KR...");
    const packages = await client.getPackages("KR");

    steps.push(`5. Got ${packages.length} packages`);
    return NextResponse.json({
      ok: true,
      steps,
      samplePackage: packages[0] ?? null,
    });
  } catch (error: unknown) {
    const msg =
      error instanceof Error
        ? `${error.message}\n${error.stack}`
        : String(error);
    steps.push(`ERROR: ${msg}`);
    return NextResponse.json({ ok: false, steps }, { status: 500 });
  }
}
