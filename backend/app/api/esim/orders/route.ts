import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { esimOrders } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "email is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const orders = await db
      .select()
      .from(esimOrders)
      .where(eq(esimOrders.email, email))
      .orderBy(desc(esimOrders.createdAt));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
