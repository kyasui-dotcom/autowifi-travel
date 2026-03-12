import type { MetadataRoute } from "next";
import { getAllCountries } from "@/lib/countries";

const BASE_URL = "https://esim.autowifi.travel";
const LOCALES = ["en", "ja", "ko", "zh"];

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = getAllCountries();

  const entries: MetadataRoute.Sitemap = [];

  // Landing pages (per locale)
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // eSIM listing pages (per locale)
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/esim`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Country detail pages (per locale x per country)
  for (const locale of LOCALES) {
    for (const country of countries) {
      entries.push({
        url: `${BASE_URL}/${locale}/esim/${country.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  }

  return entries;
}
