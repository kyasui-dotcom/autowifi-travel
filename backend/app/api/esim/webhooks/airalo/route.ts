import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { esimOrders } from "@/lib/db/schema";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";
import { eq } from "drizzle-orm";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const env = await getEnv();
    const body = (await request.json()) as {
      event?: string;
      data?: {
        order_id?: number;
        sims?: {
          iccid: string;
          qrcode_url: string;
        }[];
      };
    };

    // TODO: Validate Airalo webhook signature (airalo-signature header)
    // when documentation for signature format is available

    if (body.event === "order.completed" && body.data) {
      const airaloOrderId = String(body.data.order_id);
      const sim = body.data.sims?.[0];

      if (!sim) {
        console.error("No SIM data in Airalo webhook");
        return NextResponse.json({ received: true });
      }

      const db = await getDb();

      // Find order by airalo_order_id
      const [order] = await db
        .select()
        .from(esimOrders)
        .where(eq(esimOrders.airaloOrderId, airaloOrderId))
        .limit(1);

      if (!order) {
        console.error("Order not found for Airalo order:", airaloOrderId);
        return NextResponse.json({ received: true });
      }

      // Fetch installation instructions
      const airalo = getAiraloClient(env);
      const instructions = await airalo
        .getSimInstructions(sim.iccid)
        .catch(() => null);

      await db
        .update(esimOrders)
        .set({
          status: "completed",
          airaloSimIccid: sim.iccid,
          qrCodeUrl: sim.qrcode_url,
          installationInstructions: instructions,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(esimOrders.orderId, order.orderId));
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Airalo webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
