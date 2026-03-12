import { NextRequest, NextResponse } from "next/server";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ iccid: string }> }
) {
  try {
    const { iccid } = await params;
    const env = await getEnv();
    const airalo = getAiraloClient(env);
    const usage = await airalo.getSimUsage(iccid);

    return NextResponse.json({ usage });
  } catch (error) {
    console.error("Failed to fetch SIM usage:", error);
    return NextResponse.json(
      { error: "Failed to fetch usage" },
      { status: 500 }
    );
  }
}
