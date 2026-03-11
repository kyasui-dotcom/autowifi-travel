import { __setMockError, __getMockChain } from "../helpers/mock-db";

jest.mock("@/lib/db", () => require("../helpers/mock-db"));

import { GET } from "@/app/api/patterns-version/route";

describe("GET /api/patterns-version", () => {
  it("returns latest version", async () => {
    const chain = __getMockChain();
    chain.limit = jest.fn().mockResolvedValue([
      { version: 18, publishedAt: "2025-01-01T00:00:00.000Z" },
    ]);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.version).toBe(18);
    expect(body.publishedAt).toBe("2025-01-01T00:00:00.000Z");
  });

  it("returns version 0 when no versions exist", async () => {
    const chain = __getMockChain();
    chain.limit = jest.fn().mockResolvedValue([]);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.version).toBe(0);
    expect(body.publishedAt).toBeNull();
  });

  it("returns 500 on database error", async () => {
    __setMockError(new Error("DB error"));
    const response = await GET();

    expect(response.status).toBe(500);
  });
});
