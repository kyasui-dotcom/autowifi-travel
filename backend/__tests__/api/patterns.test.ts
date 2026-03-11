import { NextRequest } from "next/server";
import { __setMockRows, __setMockError } from "../helpers/mock-db";

jest.mock("@/lib/db", () => require("../helpers/mock-db"));

import { GET } from "@/app/api/patterns/route";

const mockRow = {
  spotId: "nrt-free-wifi",
  name: "Narita Airport Free WiFi",
  nameJa: "成田空港無料WiFi",
  nameZh: "成田机场免费WiFi",
  nameKo: "나리타공항 무료WiFi",
  airportCode: "NRT",
  country: "JP",
  ssids: ["FreeWiFi-NARITA"],
  portalType: "agree_only",
  tier: "free",
  patternVersion: 5,
  lastVerified: null,
  notes: null,
  isActive: true,
  patternData: { agreeButtonSelector: "#agree-btn" },
};

function createRequest(url: string): NextRequest {
  return new NextRequest(new URL(url, "http://localhost"));
}

describe("GET /api/patterns", () => {
  beforeEach(() => {
    __setMockRows([mockRow]);
  });

  it("returns all active patterns when no since_version", async () => {
    const response = await GET(createRequest("/api/patterns"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.patterns).toHaveLength(1);
    expect(body.patterns[0].spotId).toBe("nrt-free-wifi");
    expect(body.version).toBe(5);
    expect(typeof body.updatedAt).toBe("string");
  });

  it("returns patterns with version > since_version", async () => {
    const response = await GET(
      createRequest("/api/patterns?since_version=3")
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.patterns).toHaveLength(1);
  });

  it("spreads patternData into pattern object", async () => {
    const response = await GET(createRequest("/api/patterns"));
    const body = await response.json();

    expect(body.patterns[0].agreeButtonSelector).toBe("#agree-btn");
  });

  it("returns version 0 when no patterns", async () => {
    __setMockRows([]);
    const response = await GET(createRequest("/api/patterns"));
    const body = await response.json();

    expect(body.version).toBe(0);
    expect(body.patterns).toHaveLength(0);
  });

  it("returns 500 on database error", async () => {
    __setMockError(new Error("DB connection failed"));
    const response = await GET(createRequest("/api/patterns"));

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error).toBeDefined();
  });
});
