import {
  validatePortalUrl,
  validateInjectionScript,
  sanitizePostMessage,
} from "@/services/webview-security";

describe("webview-security", () => {
  describe("validatePortalUrl", () => {
    it("accepts http URLs", () => {
      expect(validatePortalUrl("http://portal.example.com").valid).toBe(true);
    });

    it("accepts https URLs", () => {
      expect(validatePortalUrl("https://portal.example.com").valid).toBe(true);
    });

    it("rejects javascript: URLs", () => {
      const result = validatePortalUrl("javascript:alert(1)");
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("Blocked protocol");
    });

    it("rejects data: URLs", () => {
      expect(validatePortalUrl("data:text/html,<h1>test</h1>").valid).toBe(false);
    });

    it("rejects file: URLs", () => {
      expect(validatePortalUrl("file:///etc/passwd").valid).toBe(false);
    });

    it("rejects invalid URL format", () => {
      const result = validatePortalUrl("not a url");
      expect(result.valid).toBe(false);
      expect(result.reason).toBe("Invalid URL format");
    });
  });

  describe("validateInjectionScript", () => {
    it("accepts normal-length scripts", () => {
      expect(validateInjectionScript("console.log('hello');").valid).toBe(true);
    });

    it("rejects oversized scripts", () => {
      const huge = "x".repeat(100_001);
      const result = validateInjectionScript(huge);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("exceeds");
    });
  });

  describe("sanitizePostMessage", () => {
    it("accepts automation_status messages", () => {
      const msg = JSON.stringify({ type: "automation_status", status: "completed" });
      expect(sanitizePostMessage(msg)).not.toBeNull();
    });

    it("accepts portal_scan_result messages", () => {
      const msg = JSON.stringify({ type: "portal_scan_result", url: "http://test.com" });
      expect(sanitizePostMessage(msg)).not.toBeNull();
    });

    it("rejects unknown message types", () => {
      const msg = JSON.stringify({ type: "evil_command", action: "steal_data" });
      expect(sanitizePostMessage(msg)).toBeNull();
    });

    it("rejects invalid JSON", () => {
      expect(sanitizePostMessage("not json")).toBeNull();
    });
  });
});
