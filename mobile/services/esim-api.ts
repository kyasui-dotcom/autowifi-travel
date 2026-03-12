import { API_BASE_URL } from "@/lib/config";
import type { EsimPackage, EsimOrder, EsimUsage } from "@/lib/types";

const FETCH_TIMEOUT_MS = 10000;
const MAX_RETRIES = 2;

async function fetchWithRetry(
  url: string,
  init?: RequestInit,
  retries: number = MAX_RETRIES
): Promise<Response> {
  let lastError: Error | null = null;
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (res.ok) return res;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
    }
  }
  throw lastError ?? new Error("Fetch failed");
}

export async function fetchEsimPackages(
  countryCode?: string
): Promise<EsimPackage[]> {
  const params = new URLSearchParams();
  if (countryCode) params.set("country_code", countryCode);
  const res = await fetchWithRetry(
    `${API_BASE_URL}/api/esim/packages?${params}`
  );
  const json = (await res.json()) as { packages: EsimPackage[] };
  return json.packages;
}

export async function createCheckout(
  packageId: string,
  email: string
): Promise<{ checkoutUrl: string; orderId: string }> {
  const res = await fetchWithRetry(`${API_BASE_URL}/api/esim/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ packageId, email }),
  });
  return res.json() as Promise<{ checkoutUrl: string; orderId: string }>;
}

export async function fetchOrder(
  orderId: string,
  email: string
): Promise<EsimOrder> {
  const params = new URLSearchParams({ email });
  const res = await fetchWithRetry(
    `${API_BASE_URL}/api/esim/orders/${orderId}?${params}`
  );
  const json = (await res.json()) as { order: EsimOrder };
  return json.order;
}

export async function fetchOrders(email: string): Promise<EsimOrder[]> {
  const params = new URLSearchParams({ email });
  const res = await fetchWithRetry(
    `${API_BASE_URL}/api/esim/orders?${params}`
  );
  const json = (await res.json()) as { orders: EsimOrder[] };
  return json.orders;
}

export async function fetchSimUsage(iccid: string): Promise<EsimUsage> {
  const res = await fetchWithRetry(
    `${API_BASE_URL}/api/esim/sims/${iccid}/usage`
  );
  const json = (await res.json()) as { usage: EsimUsage };
  return json.usage;
}
