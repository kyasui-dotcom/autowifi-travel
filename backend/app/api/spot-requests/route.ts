import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { spotRequests } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      spotName?: string;
      location?: string;
      country?: string;
      ssid?: string;
      notes?: string;
    };
    const { spotName, location, country, ssid, notes } = body;

    if (!spotName) {
      return NextResponse.json(
        { error: "spotName is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    await db.insert(spotRequests).values({
      spotName,
      location: location ?? null,
      country: country ?? null,
      ssid: ssid ?? null,
      notes: notes ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save spot request:", error);
    return NextResponse.json(
      { error: "Failed to save request" },
      { status: 500 }
    );
  }
}
