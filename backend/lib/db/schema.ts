import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  subscriptionTier: text("subscription_tier").notNull().default("free"),
  subscriptionExpiresAt: text("subscription_expires_at"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const portalPatterns = sqliteTable(
  "portal_patterns",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    spotId: text("spot_id").notNull().unique(),
    name: text("name").notNull(),
    nameJa: text("name_ja").notNull(),
    airportCode: text("airport_code").default(""),
    country: text("country").notNull(),
    ssids: text("ssids", { mode: "json" }).notNull().$type<string[]>(),
    portalType: text("portal_type").notNull(),
    tier: text("tier").notNull().default("free"),
    patternData: text("pattern_data", { mode: "json" }).notNull(),
    patternVersion: integer("pattern_version").notNull().default(1),
    lastVerified: text("last_verified"),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    notes: text("notes"),
    createdAt: text("created_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updated_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (table) => [uniqueIndex("spot_id_idx").on(table.spotId)]
);

export const patternBundleVersions = sqliteTable("pattern_bundle_versions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  version: integer("version").notNull(),
  publishedAt: text("published_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const connectionReports = sqliteTable("connection_reports", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  spotId: text("spot_id").notNull(),
  success: integer("success", { mode: "boolean" }).notNull(),
  errorDetail: text("error_detail"),
  automationLog: text("automation_log", { mode: "json" }),
  deviceInfo: text("device_info"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
