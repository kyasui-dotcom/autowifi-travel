import type { AiraloClient } from "./types";
import { createAiraloClient } from "./client";
import { createMockAiraloClient } from "./mock";

export type { AiraloClient } from "./types";
export type {
  AiraloPackage,
  AiraloOrderResponse,
  AiraloInstruction,
  AiraloUsageResponse,
  AiraloSimData,
} from "./types";

export function getAiraloClient(env: {
  AIRALO_MOCK_MODE?: string;
  AIRALO_BASE_URL?: string;
  AIRALO_CLIENT_ID?: string;
  AIRALO_CLIENT_SECRET?: string;
}): AiraloClient {
  if (env.AIRALO_MOCK_MODE === "true" || !env.AIRALO_CLIENT_ID) {
    return createMockAiraloClient();
  }

  return createAiraloClient(
    env.AIRALO_BASE_URL || "https://partners-api.airalo.com",
    env.AIRALO_CLIENT_ID,
    env.AIRALO_CLIENT_SECRET ?? ""
  );
}
