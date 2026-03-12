import type { MetadataRoute } from "next";
import { getAllCountries } from "@/lib/countries";

const BASE_URL = "https://autowifi-travel.com";
const LOCALES = ["en", "ja", "ko", "zh"] as const;

function alternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const loc of LOCALES) {
    langs[loc] = `${BASE_URL}/${loc}${path}`;
  }
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = getAllCountries();
  const entries: MetadataRoute.Sitemap = [];

  // Landing pages — one entry per locale with hreflang alternates
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: alternates("") },
    });
  }

  // eSIM listing pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/esim`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: alternates("/esim") },
    });
  }

  // Country detail pages
  for (const locale of LOCALES) {
    for (const country of countries) {
      entries.push({
        url: `${BASE_URL}/${locale}/esim/${country.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
        alternates: { languages: alternates(`/esim/${country.slug}`) },
      });
    }
  }

  return entries;
}
