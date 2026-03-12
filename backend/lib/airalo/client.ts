import type {
  AiraloClient,
  AiraloPackage,
  AiraloOrderResponse,
  AiraloInstruction,
  AiraloUsageResponse,
  AiraloTokenResponse,
  AiraloPackagesResponse,
  AiraloInstructionsResponse,
} from "./types";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(
  baseUrl: string,
  clientId: string,
  clientSecret: string
): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const form = new FormData();
  form.append("client_id", clientId);
  form.append("client_secret", clientSecret);
  form.append("grant_type", "client_credentials");

  const res = await fetch(`${baseUrl}/v2/token`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error(`Airalo token request failed: ${res.status}`);
  }

  const json = (await res.json()) as AiraloTokenResponse;
  const { access_token, expires_in } = json.data;

  cachedToken = {
    token: access_token,
    expiresAt: Date.now() + (expires_in - 60) * 1000, // refresh 60s early
  };

  return access_token;
}

export function createAiraloClient(
  baseUrl: string,
  clientId: string,
  clientSecret: string
): AiraloClient {
  async function authFetch(path: string, init?: RequestInit): Promise<Response> {
    const token = await getAccessToken(baseUrl, clientId, clientSecret);
    const res = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Airalo API error ${res.status}: ${text}`);
    }
    return res;
  }

  return {
    async getPackages(countryCode?: string): Promise<AiraloPackage[]> {
      const params = new URLSearchParams();
      if (countryCode) params.set("filter[country]", countryCode);
      params.set("limit", "100");
      const res = await authFetch(`/v2/packages?${params}`);
      const json = (await res.json()) as AiraloPackagesResponse;
      return json.data;
    },

    async createOrder(
      packageId: string,
      quantity: number
    ): Promise<AiraloOrderResponse["data"]> {
      const form = new FormData();
      form.append("package_id", packageId);
      form.append("quantity", String(quantity));
      const res = await authFetch("/v2/orders", { method: "POST", body: form });
      const json = (await res.json()) as AiraloOrderResponse;
      return json.data;
    },

    async getSimInstructions(
      iccid: string,
      language = "en"
    ): Promise<AiraloInstruction> {
      const res = await authFetch(`/v2/sims/${iccid}/instructions`, {
        headers: { "Accept-Language": language },
      });
      const json = (await res.json()) as AiraloInstructionsResponse;
      return json.data;
    },

    async getSimUsage(iccid: string): Promise<AiraloUsageResponse["data"]> {
      const res = await authFetch(`/v2/sims/${iccid}/usage`);
      const json = (await res.json()) as AiraloUsageResponse;
      return json.data;
    },
  };
}
