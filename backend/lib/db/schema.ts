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
    nameZh: text("name_zh").notNull().default(""),
    nameKo: text("name_ko").notNull().default(""),
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

export const esimPackages = sqliteTable(
  "esim_packages",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    airaloPackageId: text("airalo_package_id").notNull().unique(),
    countryCode: text("country_code").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    dataAmount: text("data_amount").notNull(),
    validityDays: integer("validity_days").notNull(),
    priceUsd: integer("price_usd").notNull(),
    operatorTitle: text("operator_title"),
    type: text("type").notNull(),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    cachedAt: text("cached_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
    createdAt: text("created_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updated_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (table) => [uniqueIndex("airalo_package_id_idx").on(table.airaloPackageId)]
);

export const esimOrders = sqliteTable(
  "esim_orders",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    orderId: text("order_id").notNull().unique(),
    email: text("email").notNull(),
    airaloPackageId: text("airalo_package_id").notNull(),
    packageTitle: text("package_title").notNull(),
    countryCode: text("country_code").notNull(),
    priceUsd: integer("price_usd").notNull(),
    quantity: integer("quantity").notNull().default(1),
    status: text("status").notNull().default("pending"),
    stripeCheckoutSessionId: text("stripe_checkout_session_id").unique(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    airaloOrderId: text("airalo_order_id"),
    airaloSimIccid: text("airalo_sim_iccid"),
    qrCodeUrl: text("qr_code_url"),
    installationInstructions: text("installation_instructions", {
      mode: "json",
    }),
    errorDetail: text("error_detail"),
    createdAt: text("created_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updated_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (table) => [uniqueIndex("order_id_idx").on(table.orderId)]
);

export const spotRequests = sqliteTable("spot_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  spotName: text("spot_name").notNull(),
  location: text("location"),
  country: text("country"),
  ssid: text("ssid"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
