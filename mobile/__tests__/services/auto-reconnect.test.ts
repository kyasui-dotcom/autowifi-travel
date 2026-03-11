jest.mock("@/services/portal-detector");
jest.mock("@/services/credential-manager");
jest.mock("@/services/pattern-sync");

import { checkAndReconnect, verifyReconnection } from "@/services/auto-reconnect";
import { verifyInternetAccess } from "@/services/portal-detector";
import { getCredentials, updateLastUsed } from "@/services/credential-manager";
import { loadPatterns } from "@/services/pattern-sync";

const mockVerify = verifyInternetAccess as jest.Mock;
const mockGetCreds = getCredentials as jest.Mock;
const mockLoadPatterns = loadPatterns as jest.Mock;
const mockUpdateLastUsed = updateLastUsed as jest.Mock;

const testPattern = {
  spotId: "nrt-wifi",
  name: "NRT WiFi",
  nameJa: "成田WiFi",
  airportCode: "NRT",
  country: "JP",
  ssids: ["NRT-FreeWiFi"],
  portalType: "registration",
  tier: "free",
  patternVersion: 1,
  lastVerified: "2025-01-01",
};

const agreePattern = {
  ...testPattern,
  spotId: "agree-wifi",
  ssids: ["AgreeWiFi"],
  portalType: "agree_only",
};

describe("auto-reconnect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadPatterns.mockResolvedValue([testPattern, agreePattern]);
  });

  describe("checkAndReconnect", () => {
    it("returns idle when internet works", async () => {
      mockVerify.mockResolvedValue(true);
      const result = await checkAndReconnect("NRT-FreeWiFi");
      expect(result.status).toBe("idle");
      expect(result.pattern).toBeNull();
    });

    it("returns failed when no SSID", async () => {
      mockVerify.mockResolvedValue(false);
      const result = await checkAndReconnect(null);
      expect(result.status).toBe("failed");
    });

    it("returns failed when no matching pattern", async () => {
      mockVerify.mockResolvedValue(false);
      const result = await checkAndReconnect("UnknownWiFi");
      expect(result.status).toBe("failed");
    });

    it("returns reconnecting when pattern found with credentials", async () => {
      mockVerify.mockResolvedValue(false);
      mockGetCreds.mockResolvedValue({ spotId: "nrt-wifi", password: "pw", registeredAt: new Date().toISOString() });
      const result = await checkAndReconnect("NRT-FreeWiFi");
      expect(result.status).toBe("reconnecting");
      expect(result.pattern!.spotId).toBe("nrt-wifi");
    });

    it("returns no_credentials when pattern found but no credentials", async () => {
      mockVerify.mockResolvedValue(false);
      mockGetCreds.mockResolvedValue(null);
      const result = await checkAndReconnect("NRT-FreeWiFi");
      expect(result.status).toBe("no_credentials");
    });

    it("returns reconnecting for agree_only even without credentials", async () => {
      mockVerify.mockResolvedValue(false);
      mockGetCreds.mockResolvedValue(null);
      const result = await checkAndReconnect("AgreeWiFi");
      expect(result.status).toBe("reconnecting");
    });
  });

  describe("verifyReconnection", () => {
    it("updates lastUsed on success", async () => {
      mockVerify.mockResolvedValue(true);
      const result = await verifyReconnection("nrt-wifi");
      expect(result).toBe(true);
      expect(mockUpdateLastUsed).toHaveBeenCalledWith("nrt-wifi");
    });

    it("returns false when internet not restored", async () => {
      mockVerify.mockResolvedValue(false);
      const result = await verifyReconnection("nrt-wifi");
      expect(result).toBe(false);
      expect(mockUpdateLastUsed).not.toHaveBeenCalled();
    });
  });
});
