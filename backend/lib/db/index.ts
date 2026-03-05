import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

export function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url || !url.startsWith("postgresql://")) {
      throw new Error("DATABASE_URL is not configured");
    }
    const sql = neon(url);
    _db = drizzle(sql, { schema });
  }
  return _db;
}
