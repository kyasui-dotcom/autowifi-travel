import * as SecureStore from "expo-secure-store";
import {
  getCredentials,
  saveCredentials,
  deleteCredentials,
  updateLastUsed,
  purgeExpiredCredentials,
  getCredentialCount,
} from "@/services/credential-manager";

const mockGetItem = SecureStore.getItemAsync as jest.Mock;
const mockSetItem = SecureStore.setItemAsync as jest.Mock;

function makeCredential(spotId: string, daysAgo: number = 0) {
  const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  return {
    spotId,
    password: "test123",
    registeredAt: date.toISOString(),
  };
}

describe("credential-manager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCredentials", () => {
    it("returns null when no credentials stored", async () => {
      mockGetItem.mockResolvedValue(null);
      const result = await getCredentials("nrt-wifi");
      expect(result).toBeNull();
    });

    it("returns saved credential by spotId", async () => {
      const cred = makeCredential("nrt-wifi", 10);
      mockGetItem.mockResolvedValue(JSON.stringify({ "nrt-wifi": cred }));
      const result = await getCredentials("nrt-wifi");
      expect(result).not.toBeNull();
      expect(result!.spotId).toBe("nrt-wifi");
    });

    it("marks expired credentials (>180 days)", async () => {
      const cred = makeCredential("old-wifi", 200);
      mockGetItem.mockResolvedValue(JSON.stringify({ "old-wifi": cred }));
      const result = await getCredentials("old-wifi") as any;
      expect(result).not.toBeNull();
      expect(result._expired).toBe(true);
    });

    it("does not mark fresh credentials as expired", async () => {
      const cred = makeCredential("new-wifi", 30);
      mockGetItem.mockResolvedValue(JSON.stringify({ "new-wifi": cred }));
      const result = await getCredentials("new-wifi") as any;
      expect(result._expired).toBeUndefined();
    });

    it("handles corrupted storage gracefully", async () => {
      mockGetItem.mockResolvedValue("not-json{{{");
      const result = await getCredentials("any");
      expect(result).toBeNull();
    });
  });

  describe("saveCredentials", () => {
    it("stores valid credentials", async () => {
      mockGetItem.mockResolvedValue(null);
      const cred = makeCredential("nrt-wifi");
      await saveCredentials(cred);
      expect(mockSetItem).toHaveBeenCalledTimes(1);
      const saved = JSON.parse(mockSetItem.mock.calls[0][1]);
      expect(saved["nrt-wifi"]).toBeDefined();
    });

    it("rejects invalid credentials (missing spotId)", async () => {
      await saveCredentials({ spotId: "", password: "x", registeredAt: new Date().toISOString() });
      expect(mockSetItem).not.toHaveBeenCalled();
    });
  });

  describe("deleteCredentials", () => {
    it("removes credential by spotId", async () => {
      const cred = makeCredential("nrt-wifi");
      mockGetItem.mockResolvedValue(JSON.stringify({ "nrt-wifi": cred, "hnd-wifi": makeCredential("hnd-wifi") }));
      await deleteCredentials("nrt-wifi");
      const saved = JSON.parse(mockSetItem.mock.calls[0][1]);
      expect(saved["nrt-wifi"]).toBeUndefined();
      expect(saved["hnd-wifi"]).toBeDefined();
    });
  });

  describe("updateLastUsed", () => {
    it("updates lastUsedAt timestamp", async () => {
      const cred = makeCredential("nrt-wifi");
      mockGetItem.mockResolvedValue(JSON.stringify({ "nrt-wifi": cred }));
      await updateLastUsed("nrt-wifi");
      const saved = JSON.parse(mockSetItem.mock.calls[0][1]);
      expect(saved["nrt-wifi"].lastUsedAt).toBeDefined();
    });
  });

  describe("purgeExpiredCredentials", () => {
    it("removes only expired credentials", async () => {
      const fresh = makeCredential("fresh", 10);
      const expired = makeCredential("expired", 200);
      mockGetItem.mockResolvedValue(JSON.stringify({ fresh, expired }));
      const count = await purgeExpiredCredentials();
      expect(count).toBe(1);
      const saved = JSON.parse(mockSetItem.mock.calls[0][1]);
      expect(saved["fresh"]).toBeDefined();
      expect(saved["expired"]).toBeUndefined();
    });

    it("returns 0 when nothing expired", async () => {
      const fresh = makeCredential("fresh", 10);
      mockGetItem.mockResolvedValue(JSON.stringify({ fresh }));
      const count = await purgeExpiredCredentials();
      expect(count).toBe(0);
      expect(mockSetItem).not.toHaveBeenCalled();
    });
  });

  describe("getCredentialCount", () => {
    it("returns correct count", async () => {
      const store = {
        a: makeCredential("a"),
        b: makeCredential("b"),
        c: makeCredential("c"),
      };
      mockGetItem.mockResolvedValue(JSON.stringify(store));
      const count = await getCredentialCount();
      expect(count).toBe(3);
    });
  });
});
