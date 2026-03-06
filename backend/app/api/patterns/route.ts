import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { portalPatterns } from "@/lib/db/schema";
import { eq, gt } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const sinceVersion = request.nextUrl.searchParams.get("since_version");
    const db = await getDb();

    let rows;
    if (sinceVersion) {
      const version = parseInt(sinceVersion, 10);
      rows = await db
        .select()
        .from(portalPatterns)
        .where(gt(portalPatterns.patternVersion, version));
    } else {
      rows = await db
        .select()
        .from(portalPatterns)
        .where(eq(portalPatterns.isActive, true));
    }

    const patterns = rows.map((row) => ({
      spotId: row.spotId,
      name: row.name,
      nameJa: row.nameJa,
      nameZh: row.nameZh,
      nameKo: row.nameKo,
      airportCode: row.airportCode,
      country: row.country,
      ssids: row.ssids,
      portalType: row.portalType,
      tier: row.tier,
      patternVersion: row.patternVersion,
      lastVerified: row.lastVerified,
      notes: row.notes,
      ...((row.patternData as Record<string, unknown>) ?? {}),
    }));

    return NextResponse.json({
      version: Math.max(0, ...patterns.map((p) => p.patternVersion)),
      updatedAt: new Date().toISOString(),
      patterns,
    });
  } catch (error) {
    console.error("Failed to fetch patterns:", error);
    return NextResponse.json(
      { error: "Failed to fetch patterns" },
      { status: 500 }
    );
  }
}
