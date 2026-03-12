import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { esimOrders } from "@/lib/db/schema";
import { createStripeClient } from "@/lib/stripe/client";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const env = await getEnv();

    if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 503 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get("stripe-signature") ?? "";

    const stripe = createStripeClient(env.STRIPE_SECRET_KEY);
    const event = await stripe.constructWebhookEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    const db = await getDb();

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.order_id;

      if (!orderId) {
        console.error("No order_id in checkout session metadata");
        return NextResponse.json({ received: true });
      }

      // Update order to paid
      await db
        .update(esimOrders)
        .set({
          status: "paid",
          stripePaymentIntentId: session.payment_intent ?? null,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(esimOrders.orderId, orderId));

      // Fetch the order to get package info
      const [order] = await db
        .select()
        .from(esimOrders)
        .where(eq(esimOrders.orderId, orderId))
        .limit(1);

      if (!order) {
        console.error("Order not found after payment:", orderId);
        return NextResponse.json({ received: true });
      }

      // Place Airalo order
      try {
        const airalo = getAiraloClient(env);
        const airaloOrder = await airalo.createOrder(
          order.airaloPackageId,
          order.quantity
        );

        const sim = airaloOrder.sims[0];
        const instructions = sim
          ? await airalo.getSimInstructions(sim.iccid).catch(() => null)
          : null;

        await db
          .update(esimOrders)
          .set({
            status: "completed",
            airaloOrderId: String(airaloOrder.id),
            airaloSimIccid: sim?.iccid ?? null,
            qrCodeUrl: sim?.qrcode_url ?? null,
            installationInstructions: instructions,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(esimOrders.orderId, orderId));
      } catch (airaloError) {
        console.error("Airalo order failed:", airaloError);
        await db
          .update(esimOrders)
          .set({
            status: "failed",
            errorDetail: `Airalo order failed: ${airaloError instanceof Error ? airaloError.message : String(airaloError)}`,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(esimOrders.orderId, orderId));
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const orderId = session.metadata?.order_id;
      if (orderId) {
        await db
          .update(esimOrders)
          .set({ status: "failed", updatedAt: new Date().toISOString() })
          .where(eq(esimOrders.orderId, orderId));
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
