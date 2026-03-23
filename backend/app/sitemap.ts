import type { MetadataRoute } from "next";
import { getAllCountries } from "@/lib/countries";
import { EXTRA_GUIDE_SLUGS } from "@/lib/guides/extraGuides";
import { SEO_PROGRAM_SLUGS } from "@/lib/guides/seoProgram";

const BASE_URL = "https://autowifi-travel.com";
const LOCALES = ["en", "ja", "ko", "zh"] as const;

function alternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const loc of LOCALES) {
    langs[loc] = `${BASE_URL}/${loc}${path}`;
  }
  langs["x-default"] = `${BASE_URL}/en${path}`;
  return langs;
}

// Content last-modified dates (stable — only update when content actually changes)
const SITE_UPDATED = "2026-03-16";
const GUIDE_DATES: Record<string, string> = {
  "japan-esim": "2026-03-16", "korea-esim": "2026-03-16", "thailand-esim": "2026-03-16",
  "usa-esim": "2026-03-16", "uk-esim": "2026-03-16", "france-esim": "2026-03-16",
  "italy-esim": "2026-03-16", "spain-esim": "2026-03-16", "germany-esim": "2026-03-16",
  "australia-esim": "2026-03-16", "singapore-esim": "2026-03-16", "taiwan-esim": "2026-03-16",
  "vietnam-esim": "2026-03-16", "indonesia-esim": "2026-03-16", "malaysia-esim": "2026-03-16",
  "philippines-esim": "2026-03-16", "china-esim": "2026-03-16", "canada-esim": "2026-03-16",
  "turkey-esim": "2026-03-16", "india-esim": "2026-03-16", "hawaii-esim": "2026-03-16",
  "guam-esim": "2026-03-16", "hong-kong-esim": "2026-03-16", "dubai-esim": "2026-03-16",
  "europe-esim": "2026-03-16", "cambodia-esim": "2026-03-16", "greece-esim": "2026-03-16",
  "mexico-esim": "2026-03-16", "new-zealand-esim": "2026-03-16", "norway-esim": "2026-03-16",
  "portugal-esim": "2026-03-16", "switzerland-esim": "2026-03-16", "morocco-esim": "2026-03-16",
  "iceland-esim": "2026-03-16", "sri-lanka-esim": "2026-03-16",
  "wifi-vs-esim": "2026-03-16", "how-to-setup-esim": "2026-03-16",
  "esim-compatible-phones": "2026-03-16", "esim-troubleshooting": "2026-03-16",
  "esim-vs-sim-card": "2026-03-16", "esim-for-business-travel": "2026-03-16",
  "first-time-esim": "2026-03-16", "esim-data-plans-explained": "2026-03-16",
  "travel-internet-options": "2026-03-16", "esim-iphone-setup": "2026-03-16",
  "esim-android-setup": "2026-03-16", "airalo-review": "2026-03-16",
  "holafly-review": "2026-03-16",
  ...Object.fromEntries(EXTRA_GUIDE_SLUGS.map((slug) => [slug, "2026-03-19"])),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = getAllCountries();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: `${BASE_URL}/`,
    lastModified: new Date(SITE_UPDATED),
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        en: `${BASE_URL}/en`,
        ja: `${BASE_URL}/ja`,
        ko: `${BASE_URL}/ko`,
        zh: `${BASE_URL}/zh`,
        "x-default": `${BASE_URL}/`,
      },
    },
  });

  // Landing pages — one entry per locale with hreflang alternates
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(SITE_UPDATED),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: alternates("") },
    });
  }

  // eSIM listing pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/esim`,
      lastModified: new Date(SITE_UPDATED),
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
        lastModified: new Date(SITE_UPDATED),
        changeFrequency: "daily",
        priority: 0.8,
        alternates: { languages: alternates(`/esim/${country.slug}`) },
      });
    }
  }

  // Guide index page
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/guide`,
      lastModified: new Date(SITE_UPDATED),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: alternates("/guide") },
    });
  }

  // Guide articles
  const guideSlugs = Array.from(new Set([
    "wifi-vs-esim",
    "japan-esim", "korea-esim", "thailand-esim", "usa-esim", "uk-esim",
    "france-esim", "italy-esim", "spain-esim", "germany-esim", "australia-esim",
    "singapore-esim", "taiwan-esim", "vietnam-esim", "indonesia-esim", "malaysia-esim",
    "philippines-esim", "china-esim", "canada-esim", "turkey-esim", "india-esim",
    "hawaii-esim", "guam-esim", "hong-kong-esim", "dubai-esim", "europe-esim",
    "cambodia-esim", "greece-esim", "mexico-esim", "new-zealand-esim",
    "norway-esim", "portugal-esim", "switzerland-esim", "morocco-esim",
    "how-to-setup-esim", "esim-compatible-phones", "esim-troubleshooting",
    "esim-vs-sim-card", "esim-for-business-travel", "first-time-esim",
    "esim-data-plans-explained", "travel-internet-options", "dual-sim-esim",
    "esim-for-students", "esim-long-term-travel", "save-money-roaming",
    "asia-travel-connectivity", "europe-travel-connectivity", "best-esim-providers",
    "travel-data-usage-tips", "international-calling-esim", "cruise-travel-esim",
    "digital-nomad-esim", "family-travel-esim", "esim-prepaid-vs-postpaid",
    "esim-security-tips", "airport-connectivity-guide", "esim-activation-timing",
    "travel-apps-esim",
    "esim-iphone-setup", "esim-android-setup", "airalo-review", "holafly-review",
    "esim-speed-test", "esim-for-remote-workers", "pocket-wifi-vs-esim-japan",
    "esim-unlimited-data",
    ...SEO_PROGRAM_SLUGS,
    ...EXTRA_GUIDE_SLUGS,
  ]));
  for (const locale of LOCALES) {
    for (const slug of guideSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/guide/${slug}`,
        lastModified: new Date(GUIDE_DATES[slug] || SITE_UPDATED),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: alternates(`/guide/${slug}`) },
      });
    }
  }

  // App landing pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/lp`,
      lastModified: new Date(SITE_UPDATED),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: alternates("/lp") },
    });
  }

  return entries;
}
