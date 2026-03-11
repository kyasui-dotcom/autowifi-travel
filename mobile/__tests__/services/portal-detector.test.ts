describe("portal-detector", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  async function importModule() {
    return require("@/services/portal-detector");
  }

  describe("detectCaptivePortal", () => {
    it("returns isCaptive: false on 204 response", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ status: 204, headers: new Headers() });
      const { detectCaptivePortal } = await importModule();
      const result = await detectCaptivePortal();
      expect(result.isCaptive).toBe(false);
    });

    it("returns isCaptive: true with portalUrl on redirect", async () => {
      const headers = new Headers();
      headers.set("Location", "http://portal.example.com");
      (global.fetch as jest.Mock).mockResolvedValue({ status: 302, headers });
      const { detectCaptivePortal } = await importModule();
      const result = await detectCaptivePortal();
      expect(result.isCaptive).toBe(true);
      expect(result.portalUrl).toBe("http://portal.example.com");
    });

    it("returns isCaptive: true on 200 (intercepted)", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ status: 200, headers: new Headers() });
      const { detectCaptivePortal } = await importModule();
      const result = await detectCaptivePortal();
      expect(result.isCaptive).toBe(true);
    });

    it("returns isCaptive: true when all probes fail", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
      const { detectCaptivePortal } = await importModule();
      const result = await detectCaptivePortal();
      expect(result.isCaptive).toBe(true);
    });
  });

  describe("verifyInternetAccess", () => {
    it("returns true on 204", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ status: 204 });
      const { verifyInternetAccess } = await importModule();
      expect(await verifyInternetAccess()).toBe(true);
    });

    it("returns false on error", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("timeout"));
      const { verifyInternetAccess } = await importModule();
      expect(await verifyInternetAccess()).toBe(false);
    });

    it("returns false on non-204 status", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ status: 200 });
      const { verifyInternetAccess } = await importModule();
      expect(await verifyInternetAccess()).toBe(false);
    });
  });
});
