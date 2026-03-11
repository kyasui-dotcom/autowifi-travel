import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadPatterns, getLastSyncTime, getCachedVersion } from "@/services/pattern-sync";

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;
const mockRemoveItem = AsyncStorage.removeItem as jest.Mock;

const validPattern = {
  spotId: "test-spot",
  name: "Test",
  nameJa: "テスト",
  ssids: ["TestWiFi"],
  portalType: "agree_only",
  tier: "free",
  patternVersion: 1,
};

describe("pattern-sync", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("loadPatterns", () => {
    it("returns patterns from API when available", async () => {
      mockGetItem.mockResolvedValue(null);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            version: 5,
            updatedAt: new Date().toISOString(),
            patterns: [validPattern],
          }),
      });
      const patterns = await loadPatterns();
      expect(patterns).toHaveLength(1);
      expect(patterns[0].spotId).toBe("test-spot");
      expect(mockSetItem).toHaveBeenCalled();
    });

    it("falls back to cache when API fails", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
      mockGetItem.mockImplementation((key: string) => {
        if (key === "autowifi_patterns_cache")
          return Promise.resolve(JSON.stringify([validPattern]));
        return Promise.resolve(null);
      });
      const patterns = await loadPatterns();
      expect(patterns).toHaveLength(1);
    });

    it("falls back to bundled patterns when both API and cache fail", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("fail"));
      mockGetItem.mockResolvedValue(null);
      const patterns = await loadPatterns();
      // Should get bundled patterns from mocked patterns-v1.json
      expect(patterns.length).toBeGreaterThanOrEqual(1);
    });

    it("clears corrupted cache", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("fail"));
      mockGetItem.mockImplementation((key: string) => {
        if (key === "autowifi_patterns_cache")
          return Promise.resolve("not-valid-json{{{");
        return Promise.resolve(null);
      });
      await loadPatterns();
      expect(mockRemoveItem).toHaveBeenCalled();
    });

    it("appends since_version when cached version exists", async () => {
      mockGetItem.mockImplementation((key: string) => {
        if (key === "autowifi_patterns_version") return Promise.resolve("5");
        return Promise.resolve(null);
      });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            version: 6,
            patterns: [validPattern],
          }),
      });
      await loadPatterns();
      expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain(
        "since_version=5"
      );
    });
  });

  describe("getLastSyncTime", () => {
    it("returns null when never synced", async () => {
      mockGetItem.mockResolvedValue(null);
      expect(await getLastSyncTime()).toBeNull();
    });
  });

  describe("getCachedVersion", () => {
    it("returns number when version cached", async () => {
      mockGetItem.mockResolvedValue("10");
      expect(await getCachedVersion()).toBe(10);
    });

    it("returns null when no version", async () => {
      mockGetItem.mockResolvedValue(null);
      expect(await getCachedVersion()).toBeNull();
    });
  });
});
