import type { MetadataRoute } from "next";

const BASE_URL = "https://autowifi-travel.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/order/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
