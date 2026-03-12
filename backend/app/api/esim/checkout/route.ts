import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { esimPackages, esimOrders } from "@/lib/db/schema";
import { createStripeClient } from "@/lib/stripe/client";
import { getEnv } from "@/lib/env";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      packageId?: string;
      email?: string;
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

    // Find the package
    const [pkg] = await db
      .select()
      .from(esimPackages)
      .where(eq(esimPackages.airaloPackageId, body.packageId))
      .limit(1);

    if (!pkg) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    // Generate order ID
    const orderId = crypto.randomUUID();

    // Create Stripe Checkout Session
    const scheme = env.APP_DEEP_LINK_SCHEME ?? "autowifi";
    const successUrl =
      env.APP_SUCCESS_URL ??
      `${scheme}://esim/order-detail?orderId=${orderId}&status=success`;
    const cancelUrl = `${scheme}://esim/order-detail?orderId=${orderId}&status=cancel`;

    const stripe = createStripeClient(env.STRIPE_SECRET_KEY);
    const session = await stripe.createCheckoutSession({
      orderId,
      packageTitle: pkg.title,
      priceUsd: pkg.priceUsd,
      email: body.email,
      successUrl,
      cancelUrl,
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
