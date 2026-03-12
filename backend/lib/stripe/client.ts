const STRIPE_API_BASE = "https://api.stripe.com/v1";

interface CheckoutSessionParams {
  orderId: string;
  packageTitle: string;
  priceUsd: number; // cents
  email: string;
  successUrl: string;
  cancelUrl: string;
}

interface CheckoutSession {
  id: string;
  url: string;
}

export function createStripeClient(secretKey: string) {
  async function stripeRequest(
    path: string,
    body?: URLSearchParams
  ): Promise<Response> {
    const res = await fetch(`${STRIPE_API_BASE}${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body?.toString(),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Stripe API error ${res.status}: ${text}`);
    }
    return res;
  }

  return {
    async createCheckoutSession(
      params: CheckoutSessionParams
    ): Promise<CheckoutSession> {
      const body = new URLSearchParams();
      body.set("mode", "payment");
      body.set("customer_email", params.email);
      body.set("line_items[0][price_data][currency]", "usd");
      body.set(
        "line_items[0][price_data][unit_amount]",
        String(params.priceUsd)
      );
      body.set(
        "line_items[0][price_data][product_data][name]",
        params.packageTitle
      );
      body.set("line_items[0][quantity]", "1");
      body.set("success_url", params.successUrl);
      body.set("cancel_url", params.cancelUrl);
      body.set("metadata[order_id]", params.orderId);

      const res = await stripeRequest("/checkout/sessions", body);
      const data = (await res.json()) as { id: string; url: string };
      return { id: data.id, url: data.url };
    },

    async constructWebhookEvent(
      body: string,
      signature: string,
      webhookSecret: string
    ): Promise<{
      type: string;
      data: {
        object: {
          id: string;
          metadata?: Record<string, string>;
          payment_intent?: string;
        };
      };
    }> {
      // Verify Stripe webhook signature using Web Crypto API (Workers compatible)
      const parts = signature.split(",").reduce(
        (acc, part) => {
          const [key, value] = part.split("=");
          if (key === "t") acc.timestamp = value;
          if (key === "v1") acc.signatures.push(value);
          return acc;
        },
        { timestamp: "", signatures: [] as string[] }
      );

      const signedPayload = `${parts.timestamp}.${body}`;
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(webhookSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const sig = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(signedPayload)
      );
      const expectedSig = Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (!parts.signatures.includes(expectedSig)) {
        throw new Error("Invalid Stripe webhook signature");
      }

      // Check timestamp tolerance (5 minutes)
      const tolerance = 300;
      const timestampAge =
        Math.floor(Date.now() / 1000) - parseInt(parts.timestamp);
      if (timestampAge > tolerance) {
        throw new Error("Stripe webhook timestamp too old");
      }

      return JSON.parse(body);
    },
  };
}
