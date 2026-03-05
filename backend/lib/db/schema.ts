import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  serial,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  subscriptionTier: varchar("subscription_tier", { length: 20 })
    .notNull()
    .default("free"),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const portalPatterns = pgTable(
  "portal_patterns",
  {
    id: serial("id").primaryKey(),
    spotId: varchar("spot_id", { length: 100 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    nameJa: varchar("name_ja", { length: 255 }).notNull(),
    airportCode: varchar("airport_code", { length: 10 }).default(""),
    country: varchar("country", { length: 5 }).notNull(),
    ssids: jsonb("ssids").notNull().$type<string[]>(),
    portalType: varchar("portal_type", { length: 30 }).notNull(),
    tier: varchar("tier", { length: 20 }).notNull().default("free"),
    patternData: jsonb("pattern_data").notNull(),
    patternVersion: integer("pattern_version").notNull().default(1),
    lastVerified: timestamp("last_verified"),
    isActive: boolean("is_active").notNull().default(true),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [uniqueIndex("spot_id_idx").on(table.spotId)]
);

export const patternBundleVersions = pgTable("pattern_bundle_versions", {
  id: serial("id").primaryKey(),
  version: integer("version").notNull(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const connectionReports = pgTable("connection_reports", {
  id: serial("id").primaryKey(),
  spotId: varchar("spot_id", { length: 100 }).notNull(),
  success: boolean("success").notNull(),
  errorDetail: text("error_detail"),
  automationLog: jsonb("automation_log"),
  deviceInfo: varchar("device_info", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
