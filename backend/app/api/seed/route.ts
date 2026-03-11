import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { portalPatterns, patternBundleVersions } from "@/lib/db/schema";
import seedPatterns from "@/data/seed-patterns.json";

interface SeedPattern {
  spotId: string;
  name: string;
  nameJa: string;
  nameZh: string | null;
  nameKo: string | null;
  airportCode: string | null;
  country: string;
  ssids: string[];
  portalType: string;
  tier: string;
  patternData: Record<string, unknown>;
  notes: string | null;
}

export async function POST() {
  try {
    const db = await getDb();
    const now = new Date().toISOString();
    const patterns = seedPatterns as SeedPattern[];

    for (const p of patterns) {
      await db
        .insert(portalPatterns)
        .values({
          spotId: p.spotId,
          name: p.name,
          nameJa: p.nameJa,
          nameZh: p.nameZh ?? "",
          nameKo: p.nameKo ?? "",
          airportCode: p.airportCode ?? "",
          country: p.country,
          ssids: p.ssids,
          portalType: p.portalType,
          tier: p.tier,
          patternData: p.patternData,
          patternVersion: 1,
          lastVerified: now,
          isActive: true,
          notes: p.notes,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: portalPatterns.spotId,
          set: {
            name: p.name,
            nameJa: p.nameJa,
            nameZh: p.nameZh ?? "",
            nameKo: p.nameKo ?? "",
            patternData: p.patternData,
            ssids: p.ssids,
            tier: p.tier,
            notes: p.notes,
            updatedAt: now,
          },
        });
    }

    await db.insert(patternBundleVersions).values({
      version: 18,
      publishedAt: now,
    });

    return NextResponse.json({
      ok: true,
      inserted: patterns.length,
    });
  } catch (error) {
    console.error("Seed failed:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
