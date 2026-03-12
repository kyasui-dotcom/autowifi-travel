import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { esimPackages } from "@/lib/db/schema";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";
import { eq, sql } from "drizzle-orm";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
  try {
    const countryCode = request.nextUrl.searchParams.get("country_code");

    const db = await getDb();
    const env = await getEnv();

    // Check if we have fresh cached packages
    if (countryCode) {
      const cached = await db
        .select()
        .from(esimPackages)
        .where(eq(esimPackages.countryCode, countryCode))
        .limit(1);

      if (
        cached.length > 0 &&
        Date.now() - new Date(cached[0].cachedAt).getTime() < CACHE_TTL_MS
      ) {
        const allCached = await db
          .select()
          .from(esimPackages)
          .where(eq(esimPackages.countryCode, countryCode));
        return NextResponse.json({ packages: allCached });
      }
    }

    // Fetch from Airalo API
    const airalo = getAiraloClient(env);
    const packages = await airalo.getPackages(countryCode ?? undefined);
    const now = new Date().toISOString();

    // Upsert into cache
    for (const pkg of packages) {
      const country =
        pkg.operator.countries[0]?.country_code ?? countryCode ?? "";
      await db
        .insert(esimPackages)
        .values({
          airaloPackageId: pkg.id,
          countryCode: country,
          title: pkg.title,
          description: `${pkg.data} / ${pkg.validity} days`,
          dataAmount: pkg.data,
          validityDays: pkg.validity,
          priceUsd: Math.round(pkg.price * 100),
          operatorTitle: pkg.operator.title,
          type: pkg.type,
          cachedAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: esimPackages.airaloPackageId,
          set: {
            title: sql`excluded.title`,
            description: sql`excluded.description`,
            dataAmount: sql`excluded.data_amount`,
            validityDays: sql`excluded.validity_days`,
            priceUsd: sql`excluded.price_usd`,
            operatorTitle: sql`excluded.operator_title`,
            type: sql`excluded.type`,
            cachedAt: sql`excluded.cached_at`,
            updatedAt: sql`excluded.updated_at`,
          },
        });
    }

    // Return fresh data
    const result = countryCode
      ? await db
          .select()
          .from(esimPackages)
          .where(eq(esimPackages.countryCode, countryCode))
      : await db.select().from(esimPackages);

    return NextResponse.json({ packages: result });
  } catch (error) {
    console.error("Failed to fetch eSIM packages:", error);
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}
