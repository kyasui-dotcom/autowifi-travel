import { drizzle } from "drizzle-orm/d1";
import { notInArray, sql } from "drizzle-orm";
import { getAiraloClient } from "./index";
import { esimPackages } from "../db/schema";
import type { AppEnv } from "../env";

export interface PackageSyncResult {
  success: true;
  totalSynced: number;
  activeCountries: number;
  countries: Record<string, number>;
  timestamp: string;
}

export async function syncAiraloPackages(env: AppEnv): Promise<PackageSyncResult> {
  const airalo = getAiraloClient(env);
  const db = drizzle(env.DB);
  const now = new Date().toISOString();

  const packages = await airalo.getPackages();
  const fetchedIds: string[] = [];
  const countryCounts: Record<string, number> = {};

  for (const pkg of packages) {
    const countryCode = pkg.operator.countries[0]?.country_code ?? "";
    fetchedIds.push(pkg.id);
    countryCounts[countryCode] = (countryCounts[countryCode] ?? 0) + 1;

    await db
      .insert(esimPackages)
      .values({
        airaloPackageId: pkg.id,
        countryCode,
        title: pkg.title,
        description: `${pkg.data} / ${pkg.validity} days`,
        dataAmount: pkg.data,
        validityDays: pkg.validity,
        priceUsd: Math.round(pkg.price * 100),
        operatorTitle: pkg.operator.title,
        type: pkg.type,
        isActive: true,
        cachedAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: esimPackages.airaloPackageId,
        set: {
          countryCode: sql`excluded.country_code`,
          title: sql`excluded.title`,
          description: sql`excluded.description`,
          dataAmount: sql`excluded.data_amount`,
          validityDays: sql`excluded.validity_days`,
          priceUsd: sql`excluded.price_usd`,
          operatorTitle: sql`excluded.operator_title`,
          type: sql`excluded.type`,
          isActive: sql`excluded.is_active`,
          cachedAt: sql`excluded.cached_at`,
          updatedAt: sql`excluded.updated_at`,
        },
      });
  }

  if (fetchedIds.length > 0) {
    await db
      .update(esimPackages)
      .set({ isActive: false, updatedAt: now })
      .where(notInArray(esimPackages.airaloPackageId, fetchedIds));
  }

  console.log(
    `[Package Sync] Complete: ${packages.length} active packages synced across ${Object.keys(countryCounts).length} countries`
  );

  return {
    success: true,
    totalSynced: packages.length,
    activeCountries: Object.keys(countryCounts).length,
    countries: countryCounts,
    timestamp: now,
  };
}
