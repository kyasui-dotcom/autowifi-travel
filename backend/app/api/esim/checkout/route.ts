import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { esimPackages, esimOrders } from "@/lib/db/schema";
import { createStripeClient } from "@/lib/stripe/client";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      packageId?: string;
      email?: string;
      source?: "web" | "app";
      locale?: string;
    };

    if (!body.packageId || !body.email) {
      return NextResponse.json(
        { error: "packageId and email are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const env = await getEnv();

    if (!env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 503 }
      );
    }

    // Find the package in D1 cache first
    let pkg: {
      title: string;
      priceUsd: number;
      countryCode: string;
      airaloPackageId: string;
    } | null = null;

    const [cachedPkg] = await db
      .select()
      .from(esimPackages)
      .where(eq(esimPackages.airaloPackageId, body.packageId))
      .limit(1);

    if (cachedPkg) {
      pkg = cachedPkg;
    } else {
      // Fallback: fetch from Airalo API directly
      const client = getAiraloClient(env);
      const allPackages = await client.getPackages();
      const found = allPackages.find((p) => p.id === body.packageId);
      if (found) {
        pkg = {
          title: found.title,
          priceUsd: Math.round(found.price * 100),
          countryCode: found.operator.countries[0]?.country_code ?? "",
          airaloPackageId: found.id,
        };
      }
    }

    if (!pkg) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    // Generate order ID
    const orderId = crypto.randomUUID();

    // Create Stripe Checkout Session
    let successUrl: string;
    let cancelUrl: string;

    if (body.source === "web" && env.WEB_BASE_URL) {
      const locale = body.locale ?? "en";
      const base = env.WEB_BASE_URL.replace(/\/$/, "");
      successUrl = `${base}/${locale}/order/success?orderId=${orderId}`;
      cancelUrl = `${base}/${locale}/order/cancel?orderId=${orderId}`;
    } else {
      const scheme = env.APP_DEEP_LINK_SCHEME ?? "autowifi";
      successUrl =
        env.APP_SUCCESS_URL ??
        `${scheme}://esim/order-detail?orderId=${orderId}&status=success`;
      cancelUrl = `${scheme}://esim/order-detail?orderId=${orderId}&status=cancel`;
    }

    const stripe = createStripeClient(env.STRIPE_SECRET_KEY);
    const session = await stripe.createCheckoutSession({
      orderId,
      packageTitle: pkg.title,
      priceUsd: pkg.priceUsd,
      email: body.email,
      successUrl,
      cancelUrl,
      // Spring30 sale: allow promo code only for Japan eSIMs
      allowPromotionCodes: pkg.countryCode === "JP",
    });

    // Create order record
    await db.insert(esimOrders).values({
      orderId,
      email: body.email,
      airaloPackageId: body.packageId,
      packageTitle: pkg.title,
      countryCode: pkg.countryCode,
      priceUsd: pkg.priceUsd,
      stripeCheckoutSessionId: session.id,
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      orderId,
    });
  } catch (error) {
    console.error("Failed to create checkout:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
