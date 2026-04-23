import { createStripeClient } from "@/lib/stripe/client";

describe("createStripeClient.createCheckoutSession", () => {
  const baseParams = {
    orderId: "order-123",
    packageTitle: "Japan 5GB / 30days",
    priceUsd: 770,
    email: "test@example.com",
    successUrl: "https://example.com/success",
    cancelUrl: "https://example.com/cancel",
  };

  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          id: "cs_test_123",
          url: "https://checkout.stripe.com/c/cs_test_123",
        }),
        { status: 200 }
      )
    );
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it("includes allow_promotion_codes=true when allowPromotionCodes is true", async () => {
    const stripe = createStripeClient("sk_test_dummy");
    await stripe.createCheckoutSession({ ...baseParams, allowPromotionCodes: true });

    const calledBody = fetchMock.mock.calls[0][1].body as string;
    expect(calledBody).toContain("allow_promotion_codes=true");
  });

  it("does NOT include allow_promotion_codes when allowPromotionCodes is false", async () => {
    const stripe = createStripeClient("sk_test_dummy");
    await stripe.createCheckoutSession({ ...baseParams, allowPromotionCodes: false });

    const calledBody = fetchMock.mock.calls[0][1].body as string;
    expect(calledBody).not.toContain("allow_promotion_codes");
  });

  it("does NOT include allow_promotion_codes when allowPromotionCodes is omitted", async () => {
    const stripe = createStripeClient("sk_test_dummy");
    await stripe.createCheckoutSession(baseParams);

    const calledBody = fetchMock.mock.calls[0][1].body as string;
    expect(calledBody).not.toContain("allow_promotion_codes");
  });

  it("returns checkout session id and url from Stripe response", async () => {
    const stripe = createStripeClient("sk_test_dummy");
    const session = await stripe.createCheckoutSession(baseParams);

    expect(session.id).toBe("cs_test_123");
    expect(session.url).toBe("https://checkout.stripe.com/c/cs_test_123");
  });

  it("encodes order_id in metadata", async () => {
    const stripe = createStripeClient("sk_test_dummy");
    await stripe.createCheckoutSession(baseParams);

    const calledBody = fetchMock.mock.calls[0][1].body as string;
    expect(calledBody).toContain("metadata%5Border_id%5D=order-123");
  });
});
