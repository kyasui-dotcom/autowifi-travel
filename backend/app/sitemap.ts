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
const SITE_UPDATED = "2026-04-04";
const ESIM_INDEX_UPDATED = "2026-04-05";
const MINOR_GUIDE_HUB_UPDATED = "2026-04-07";
const COUNTRY_PAGES_UPDATED = "2026-04-02";
const GUIDE_DEFAULT_UPDATED = "2026-04-01";
const GUIDE_DATES: Record<string, string> = {
  "japan-esim": SITE_UPDATED, "korea-esim": SITE_UPDATED, "thailand-esim": SITE_UPDATED,
  "usa-esim": SITE_UPDATED, "uk-esim": GUIDE_DEFAULT_UPDATED, "france-esim": GUIDE_DEFAULT_UPDATED,
  "italy-esim": GUIDE_DEFAULT_UPDATED, "spain-esim": GUIDE_DEFAULT_UPDATED, "germany-esim": GUIDE_DEFAULT_UPDATED,
  "australia-esim": SITE_UPDATED, "singapore-esim": SITE_UPDATED, "taiwan-esim": GUIDE_DEFAULT_UPDATED,
  "vietnam-esim": GUIDE_DEFAULT_UPDATED, "indonesia-esim": SITE_UPDATED, "malaysia-esim": GUIDE_DEFAULT_UPDATED,
  "china-esim": GUIDE_DEFAULT_UPDATED, "canada-esim": GUIDE_DEFAULT_UPDATED,
  "turkey-esim": GUIDE_DEFAULT_UPDATED, "india-esim": GUIDE_DEFAULT_UPDATED,
  "hong-kong-esim": SITE_UPDATED, "dubai-esim": SITE_UPDATED,
  "cambodia-esim": GUIDE_DEFAULT_UPDATED,
  "mexico-esim": GUIDE_DEFAULT_UPDATED, "new-zealand-esim": "2026-04-02", "norway-esim": GUIDE_DEFAULT_UPDATED,
  "portugal-esim": GUIDE_DEFAULT_UPDATED, "switzerland-esim": GUIDE_DEFAULT_UPDATED,
  "iceland-esim": "2026-04-02",
  "wifi-vs-esim": GUIDE_DEFAULT_UPDATED, "how-to-setup-esim": GUIDE_DEFAULT_UPDATED,
  "esim-compatible-phones": GUIDE_DEFAULT_UPDATED,
  "esim-vs-sim-card": SITE_UPDATED,
  "travel-internet-options": SITE_UPDATED, "dual-sim-esim": SITE_UPDATED, "save-money-roaming": SITE_UPDATED, "esim-iphone-setup": GUIDE_DEFAULT_UPDATED,
  "esim-android-setup": GUIDE_DEFAULT_UPDATED, "airalo-review": GUIDE_DEFAULT_UPDATED,
  "holafly-review": GUIDE_DEFAULT_UPDATED,
  "international-calling-esim": SITE_UPDATED,
  "esim-prepaid-vs-postpaid": SITE_UPDATED,
  "esim-speed-test": SITE_UPDATED,
  "international-esim": SITE_UPDATED,
  "global-esim": SITE_UPDATED,
  "esim-vs-roaming": SITE_UPDATED,
  "best-esim-for-north-america": SITE_UPDATED,
  "esim-unlimited-data": SITE_UPDATED,
  ...Object.fromEntries(EXTRA_GUIDE_SLUGS.map((slug) => [slug, GUIDE_DEFAULT_UPDATED])),
  ...{
    "europe-esim": SITE_UPDATED,
    "croatia-esim": SITE_UPDATED,
    "czech-republic-esim": SITE_UPDATED,
    "sweden-esim": SITE_UPDATED,
    "south-africa-esim": SITE_UPDATED,
    "kenya-esim": SITE_UPDATED,
    "nepal-esim": SITE_UPDATED,
    "greece-esim": SITE_UPDATED,
    "philippines-esim": SITE_UPDATED,
    "sri-lanka-esim": SITE_UPDATED,
    "morocco-esim": SITE_UPDATED,
    "hawaii-esim": SITE_UPDATED,
    "guam-esim": SITE_UPDATED,
    "esim-for-honeymoon": SITE_UPDATED,
    "esim-for-backpackers": SITE_UPDATED,
    "esim-for-solo-travel": SITE_UPDATED,
    "esim-vs-airport-sim": SITE_UPDATED,
    "esim-for-road-trips": SITE_UPDATED,
    "first-time-esim": SITE_UPDATED,
    "esim-for-students": SITE_UPDATED,
    "esim-security-tips": SITE_UPDATED,
    "esim-troubleshooting": SITE_UPDATED,
    "esim-activation-timing": SITE_UPDATED,
    "esim-for-layovers": SITE_UPDATED,
    "esim-for-business-travel": SITE_UPDATED,
    "esim-data-plans-explained": SITE_UPDATED,
    "travel-data-usage-tips": SITE_UPDATED,
    "airport-connectivity-guide": SITE_UPDATED,
    "cruise-travel-esim": SITE_UPDATED,
    "best-esim-for-europe": SITE_UPDATED,
    "best-esim-for-asia": SITE_UPDATED,
    "best-esim-for-southeast-asia": SITE_UPDATED,
    "quiet-tokyo-neighborhoods": "2026-04-05",
    "yanaka-nezu-sendagi-walk": "2026-04-05",
    "kiyosumi-shirakawa-walk": "2026-04-05",
    "kuramae-walk": "2026-04-05",
    "tokyo-tram-line-stops": "2026-04-05",
    "rainy-day-tokyo-neighborhoods": "2026-04-05",
    "ueno-to-yanaka-walk": "2026-04-06",
    "nezu-sendagi-morning-walk": "2026-04-06",
    "monzen-nakacho-fukagawa-walk": "2026-04-06",
    "asakusa-kuramae-sumida-walk": "2026-04-06",
    "oji-asukayama-tram-walk": "2026-04-06",
    "nishi-nippori-yanaka-walk": "2026-04-06",
    "sendagi-yomise-dori-walk": "2026-04-06",
    "morishita-kiyosumi-walk": "2026-04-06",
    "ryogoku-kuramae-walk": "2026-04-06",
    "machiya-arakawa-tram-walk": "2026-04-06",
    "hebi-michi-nezu-shrine-walk": "2026-04-07",
    "yanaka-cemetery-and-cafe-walk": "2026-04-07",
    "kiyosumi-garden-coffee-roasters-walk": "2026-04-07",
    "kuramae-bridge-and-craft-walk": "2026-04-07",
    "waseda-omokagebashi-tram-walk": "2026-04-07",
    "tokyo-morning-walks": "2026-04-07",
    "tokyo-local-transit-half-day": "2026-04-07",
    "tokyo-waterfront-slow-route": "2026-04-07",
    "tokyo-old-town-hillside-walk": "2026-04-07",
    "tokyo-station-based-short-stays": "2026-04-07",
    "tokyo-markets-cafes-local-streets": "2026-04-07",
    "kichijoji-inokashira-park-morning": "2026-04-07",
    "kagurazaka-backstreets-walk": "2026-04-07",
    "jimbocho-kanda-booktown-walk": "2026-04-07",
    "nakameguro-daikanyama-side-streets": "2026-04-07",
    "shibamata-retro-day-trip": "2026-04-07",
    "seoul-morning-walks": "2026-04-07",
    "seoul-seongsu-side-streets-day": "2026-04-07",
    "kyoto-okazaki-canal-and-museums": "2026-04-07",
    "osaka-nakanoshima-riverside-day": "2026-04-07",
    "kyoto-demachiyanagi-kamo-walk": "2026-04-07",
    "kyoto-fushimi-sake-district-walk": "2026-04-07",
    "osaka-sumiyoshi-retro-tram-route": "2026-04-07",
    "kyoto-saga-arashiyama-morning-backstreets": "2026-04-07",
    "kyoto-nishijin-machiya-lanes": "2026-04-07",
    "kanazawa-higashi-chaya-morning-walk": "2026-04-08",
    "kanazawa-kenrokuen-garden-walk": "2026-04-08",
    "travel-esim-with-phone-number": SITE_UPDATED,
    "esim-fair-use-policy": SITE_UPDATED,
    "regional-esim-vs-country-esim": SITE_UPDATED,
    "esim-vs-hotel-wifi": SITE_UPDATED,
    "esim-hotspot-tethering": SITE_UPDATED,
    "how-much-data-do-i-need-for-travel": SITE_UPDATED,
    "digital-nomad-esim": SITE_UPDATED,
    "family-travel-esim": SITE_UPDATED,
    "esim-for-remote-workers": SITE_UPDATED,
    "esim-long-term-travel": SITE_UPDATED,
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = getAllCountries();
  const entries: MetadataRoute.Sitemap = [];

  // Note: root `/` is a 301 redirect to `/en/`, so it is intentionally
  // excluded from the sitemap. hreflang alternates below cover discovery.

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
      lastModified: new Date(ESIM_INDEX_UPDATED),
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
        lastModified: new Date(COUNTRY_PAGES_UPDATED),
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
    entries.push({
      url: `${BASE_URL}/${locale}/guide/minor-travel-guides`,
      lastModified: new Date(MINOR_GUIDE_HUB_UPDATED),
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: { languages: alternates("/guide/minor-travel-guides") },
    });
  }

  // Legal pages
  for (const locale of LOCALES) {
    for (const path of [
      "/privacy",
      "/terms",
      "/refund-policy",
      "/commercial-disclosure",
      "/about",
      "/how-we-review-esims",
      "/editorial-policy",
      "/authors/autowifi-editorial-team",
    ]) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(SITE_UPDATED),
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: { languages: alternates(path) },
      });
    }
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
    "esim-security-tips", "airport-connectivity-guide", "esim-for-layovers", "esim-activation-timing",
    "travel-apps-esim",
    "esim-iphone-setup", "esim-android-setup", "airalo-review", "holafly-review",
    "esim-speed-test", "esim-for-remote-workers", "pocket-wifi-vs-esim-japan",
    "esim-unlimited-data",
    "kichijoji-inokashira-park-morning",
    "jimbocho-kanda-booktown-walk",
    "tokyo-markets-cafes-local-streets",
    "seoul-morning-walks",
    "seoul-seongsu-side-streets-day",
    "kyoto-okazaki-canal-and-museums",
    "osaka-nakanoshima-riverside-day",
    "kyoto-demachiyanagi-kamo-walk",
    "kyoto-fushimi-sake-district-walk",
    "osaka-sumiyoshi-retro-tram-route",
    "kyoto-saga-arashiyama-morning-backstreets",
    "kyoto-nishijin-machiya-lanes",
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
