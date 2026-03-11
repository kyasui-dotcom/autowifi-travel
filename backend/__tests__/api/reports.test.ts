import { NextRequest } from "next/server";
import { __setMockRows, __setMockError, __getMockChain } from "../helpers/mock-db";

jest.mock("@/lib/db", () => require("../helpers/mock-db"));

import { POST } from "@/app/api/reports/route";

function createPostRequest(body: unknown): NextRequest {
  return new NextRequest(new URL("/api/reports", "http://localhost"), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/reports", () => {
  beforeEach(() => {
    __setMockRows([]);
    const chain = __getMockChain();
    chain.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockResolvedValue(undefined),
    });
  });

  it("returns ok with valid spotId and success", async () => {
    const response = await POST(
      createPostRequest({ spotId: "nrt-wifi", success: true })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
  });

  it("accepts optional fields", async () => {
    const response = await POST(
      createPostRequest({
        spotId: "nrt-wifi",
        success: false,
        errorDetail: "Timeout",
        automationLog: { steps: ["click"] },
        deviceInfo: "Android 14",
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
  });

  it("returns 400 when spotId is missing", async () => {
    const response = await POST(
      createPostRequest({ success: true })
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("spotId");
  });

  it("returns 400 when success is missing", async () => {
    const response = await POST(
      createPostRequest({ spotId: "nrt-wifi" })
    );

    expect(response.status).toBe(400);
  });

  it("returns 400 when success is not boolean", async () => {
    const response = await POST(
      createPostRequest({ spotId: "nrt-wifi", success: "yes" })
    );

    expect(response.status).toBe(400);
  });

  it("returns 500 on database error", async () => {
    __setMockError(new Error("DB error"));
    const response = await POST(
      createPostRequest({ spotId: "nrt-wifi", success: true })
    );

    expect(response.status).toBe(500);
  });
});
