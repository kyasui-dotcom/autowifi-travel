import type {
  AiraloClient,
  AiraloPackage,
  AiraloOrderResponse,
  AiraloInstruction,
  AiraloUsageResponse,
} from "./types";

const mockPackages: Record<string, AiraloPackage[]> = {
  KR: [
    {
      id: "mock-kr-1gb-7d",
      slug: "south-korea-1gb-7days",
      title: "South Korea 1GB - 7 Days",
      data: "1 GB",
      validity: 7,
      price: 4.5,
      operator: {
        title: "SK Telecom",
        countries: [{ country_code: "KR", title: "South Korea" }],
      },
      type: "local",
    },
    {
      id: "mock-kr-3gb-30d",
      slug: "south-korea-3gb-30days",
      title: "South Korea 3GB - 30 Days",
      data: "3 GB",
      validity: 30,
      price: 11.0,
      operator: {
        title: "SK Telecom",
        countries: [{ country_code: "KR", title: "South Korea" }],
      },
      type: "local",
    },
    {
      id: "mock-kr-5gb-30d",
      slug: "south-korea-5gb-30days",
      title: "South Korea 5GB - 30 Days",
      data: "5 GB",
      validity: 30,
      price: 16.0,
      operator: {
        title: "SK Telecom",
        countries: [{ country_code: "KR", title: "South Korea" }],
      },
      type: "local",
    },
  ],
  US: [
    {
      id: "mock-us-1gb-7d",
      slug: "united-states-1gb-7days",
      title: "United States 1GB - 7 Days",
      data: "1 GB",
      validity: 7,
      price: 5.0,
      operator: {
        title: "T-Mobile",
        countries: [{ country_code: "US", title: "United States" }],
      },
      type: "local",
    },
    {
      id: "mock-us-3gb-30d",
      slug: "united-states-3gb-30days",
      title: "United States 3GB - 30 Days",
      data: "3 GB",
      validity: 30,
      price: 13.0,
      operator: {
        title: "T-Mobile",
        countries: [{ country_code: "US", title: "United States" }],
      },
      type: "local",
    },
  ],
  JP: [
    {
      id: "mock-jp-1gb-7d",
      slug: "japan-1gb-7days",
      title: "Japan 1GB - 7 Days",
      data: "1 GB",
      validity: 7,
      price: 4.5,
      operator: {
        title: "NTT Docomo",
        countries: [{ country_code: "JP", title: "Japan" }],
      },
      type: "local",
    },
    {
      id: "mock-jp-3gb-30d",
      slug: "japan-3gb-30days",
      title: "Japan 3GB - 30 Days",
      data: "3 GB",
      validity: 30,
      price: 11.5,
      operator: {
        title: "NTT Docomo",
        countries: [{ country_code: "JP", title: "Japan" }],
      },
      type: "local",
    },
  ],
};

// Generate mock packages for countries without specific data
function getDefaultPackages(countryCode: string): AiraloPackage[] {
  return [
    {
      id: `mock-${countryCode.toLowerCase()}-1gb-7d`,
      slug: `${countryCode.toLowerCase()}-1gb-7days`,
      title: `${countryCode} 1GB - 7 Days`,
      data: "1 GB",
      validity: 7,
      price: 4.5,
      operator: {
        title: "Local Operator",
        countries: [{ country_code: countryCode, title: countryCode }],
      },
      type: "local",
    },
    {
      id: `mock-${countryCode.toLowerCase()}-3gb-30d`,
      slug: `${countryCode.toLowerCase()}-3gb-30days`,
      title: `${countryCode} 3GB - 30 Days`,
      data: "3 GB",
      validity: 30,
      price: 11.0,
      operator: {
        title: "Local Operator",
        countries: [{ country_code: countryCode, title: countryCode }],
      },
      type: "local",
    },
  ];
}

let orderCounter = 1000;

export function createMockAiraloClient(): AiraloClient {
  return {
    async getPackages(countryCode?: string): Promise<AiraloPackage[]> {
      if (countryCode) {
        return mockPackages[countryCode] ?? getDefaultPackages(countryCode);
      }
      return Object.values(mockPackages).flat();
    },

    async createOrder(
      packageId: string,
      quantity: number
    ): Promise<AiraloOrderResponse["data"]> {
      orderCounter++;
      return {
        id: orderCounter,
        code: `MOCK-${orderCounter}`,
        package_id: packageId,
        quantity,
        type: "sim",
        price: 4.5 * quantity,
        currency: "USD",
        sims: Array.from({ length: quantity }, (_, i) => ({
          iccid: `8901000000000${orderCounter}${i}`,
          lpa: "mock-lpa-string",
          matching_id: `MOCK-MATCH-${orderCounter}-${i}`,
          qrcode: "data:image/png;base64,mockQrCodeBase64Data",
          qrcode_url: `https://mock.airalo.com/qr/${orderCounter}-${i}.png`,
          apn_type: "automatic",
          apn_value: "internet",
        })),
      };
    },

    async getSimInstructions(
      _iccid: string,
      language = "en"
    ): Promise<AiraloInstruction> {
      const steps =
        language === "ja"
          ? [
              {
                step: 1,
                title: "設定を開く",
                description: "設定 > モバイル通信 > eSIMを追加",
              },
              {
                step: 2,
                title: "QRコードをスキャン",
                description: "カメラでQRコードをスキャンしてください",
              },
              {
                step: 3,
                title: "プランを有効化",
                description:
                  "渡航先に到着したらデータローミングをオンにしてください",
              },
            ]
          : [
              {
                step: 1,
                title: "Open Settings",
                description: "Go to Settings > Cellular > Add eSIM",
              },
              {
                step: 2,
                title: "Scan QR Code",
                description: "Use your camera to scan the QR code",
              },
              {
                step: 3,
                title: "Activate Plan",
                description:
                  "Turn on data roaming when you arrive at your destination",
              },
            ];

      return { language, steps };
    },

    async getSimUsage(
      _iccid: string
    ): Promise<AiraloUsageResponse["data"]> {
      return {
        total: 1073741824, // 1GB in bytes
        remaining: 751619277, // ~700MB
        percentage: 70,
        status: "active",
      };
    },
  };
}
