import { NextRequest } from "next/server";
import { __setMockRows, __setMockError, __getMockChain } from "../helpers/mock-db";

jest.mock("@/lib/db", () => require("../helpers/mock-db"));

import { POST } from "@/app/api/spot-requests/route";

function createPostRequest(body: unknown): NextRequest {
  return new NextRequest(new URL("/api/spot-requests", "http://localhost"), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/spot-requests", () => {
  beforeEach(() => {
    __setMockRows([]);
    const chain = __getMockChain();
    chain.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockResolvedValue(undefined),
    });
  });

  it("returns ok with valid spotName", async () => {
    const response = await POST(
      createPostRequest({ spotName: "Tokyo Station WiFi" })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
  });

  it("accepts optional fields", async () => {
    const response = await POST(
      createPostRequest({
        spotName: "Tokyo Station WiFi",
        location: "Tokyo Station",
        country: "JP",
        ssid: "TokyoStation_FreeWiFi",
        notes: "Near ticket gate",
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
  });

  it("returns 400 when spotName is missing", async () => {
    const response = await POST(
      createPostRequest({ location: "Tokyo" })
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("spotName");
  });

  it("returns 400 when body is empty", async () => {
    const response = await POST(createPostRequest({}));

    expect(response.status).toBe(400);
  });

  it("returns 500 on database error", async () => {
    __setMockError(new Error("DB error"));
    const response = await POST(
      createPostRequest({ spotName: "Test Spot" })
    );

    expect(response.status).toBe(500);
  });
});
