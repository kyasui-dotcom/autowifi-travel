import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { connectionReports } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { spotId, success, errorDetail, automationLog, deviceInfo } = body;

    if (!spotId || typeof success !== "boolean") {
      return NextResponse.json(
        { error: "spotId and success are required" },
        { status: 400 }
      );
    }

    await getDb().insert(connectionReports).values({
      spotId,
      success,
      errorDetail: errorDetail ?? null,
      automationLog: automationLog ?? null,
      deviceInfo: deviceInfo ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save report:", error);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}
