import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export async function getDb(): Promise<DrizzleD1Database<typeof schema>> {
  const { env } = await getCloudflareContext();
  return drizzle((env as { DB: D1Database }).DB, { schema });
}
