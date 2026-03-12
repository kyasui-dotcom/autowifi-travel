export interface AiraloTokenResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

// Flattened package used internally in our app
export interface AiraloPackage {
  id: string;
  slug: string;
  title: string;
  data: string; // e.g. "1 GB"
  validity: number; // days
  price: number; // USD float
  operator: {
    title: string;
    countries: { country_code: string; title: string }[];
  };
  type: string; // "local", "regional", "global"
}

// --- Raw Airalo API response types ---
export interface AiraloRawPackage {
  id: string;
  type: string;
  price: number;
  amount: number; // MB
  day: number;
  is_unlimited: boolean;
  title: string;
  short_info: string | null;
}

export interface AiraloRawOperator {
  id: number;
  title: string;
  type: string; // "local", "regional", "global"
  is_prepaid: boolean;
  plan_type: string;
  coverages: { name: string; code: string }[];
  packages: AiraloRawPackage[];
}

export interface AiraloRawCountry {
  slug: string;
  country_code: string;
  title: string;
  operators: AiraloRawOperator[];
}

export interface AiraloPackagesRawResponse {
  data: AiraloRawCountry[];
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export interface AiraloPackagesResponse {
  data: AiraloPackage[];
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export interface AiraloSimData {
  iccid: string;
  lpa: string;
  matching_id: string;
  qrcode: string; // base64 or URL
  qrcode_url: string;
  apn_type: string;
  apn_value: string;
  msisdn?: string;
  confirmation_code?: string;
}

export interface AiraloOrderResponse {
  data: {
    id: number;
    code: string;
    package_id: string;
    quantity: number;
    type: string;
    description?: string;
    price: number;
    currency: string;
    sims: AiraloSimData[];
  };
}

export interface AiraloInstruction {
  language: string;
  steps: { step: number; title: string; description: string }[];
}

export interface AiraloInstructionsResponse {
  data: AiraloInstruction;
}

export interface AiraloUsageResponse {
  data: {
    total: number; // bytes
    remaining: number; // bytes
    percentage: number;
    expired_at?: string;
    status: string;
  };
}

export interface AiraloClient {
  getPackages(countryCode?: string): Promise<AiraloPackage[]>;
  createOrder(
    packageId: string,
    quantity: number
  ): Promise<AiraloOrderResponse["data"]>;
  getSimInstructions(
    iccid: string,
    language?: string
  ): Promise<AiraloInstruction>;
  getSimUsage(iccid: string): Promise<AiraloUsageResponse["data"]>;
}
