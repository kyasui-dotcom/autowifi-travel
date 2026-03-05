import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { patternBundleVersions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const db = await getDb();
    const latest = await db
      .select()
      .from(patternBundleVersions)
      .orderBy(desc(patternBundleVersions.version))
      .limit(1);

    if (latest.length === 0) {
      return NextResponse.json({ version: 0, publishedAt: null });
    }

    return NextResponse.json({
      version: latest[0].version,
      publishedAt: latest[0].publishedAt,
    });
  } catch (error) {
    console.error("Failed to fetch pattern version:", error);
    return NextResponse.json(
      { error: "Failed to fetch version" },
      { status: 500 }
    );
  }
}
