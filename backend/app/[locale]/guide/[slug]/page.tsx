import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata, getBaseUrl, getDefaultOgImageUrl } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/lib/components/JsonLd";
import ContentTrustPanel from "@/lib/components/ContentTrustPanel";
import XEmbeddedPosts from "@/lib/components/XEmbeddedPosts";
import { getAuthorProfileUrl } from "@/lib/content/eeat";
import { getGuideImageUrl, shouldProxyGuideImage } from "@/lib/guides/guideImageUrl";
import {
  EXTRA_GUIDE_COUNTRY_MAP,
  EXTRA_GUIDE_SLUGS,
  getExtraGuideContent,
  getExtraGuideDefinition,
  type GuideLocale,
} from "@/lib/guides/extraGuides";
import {
  getPriorityGuideContent,
  PRIORITY_GUIDE_RELATED,
  type GuideArticleContent,
  type GuideMediaImage,
} from "@/lib/guides/priorityGuideContent";
import {
  buildSeoProgramContent,
  getSeoProgramRelatedSlugs,
  SEO_PROGRAM_DEFAULT_PUBLISHED_DATE,
  SEO_PROGRAM_OVERRIDE_DATE,
  SEO_PROGRAM_SLUGS,
} from "@/lib/guides/seoProgram";

const SUPPORTED_LOCALES = ["en", "ja", "ko", "zh"] as const;

// Manual guide date overrides only. Programmatic guide dates come from seoProgram.ts.
const GUIDE_DATES: Record<string, { published: string; modified: string }> = {
  "best-esim-for-southeast-asia": { published: "2026-04-04", modified: "2026-04-04" },
  "quiet-tokyo-neighborhoods": { published: "2026-04-05", modified: "2026-04-07" },
  "yanaka-nezu-sendagi-walk": { published: "2026-04-05", modified: "2026-04-07" },
  "kiyosumi-shirakawa-walk": { published: "2026-04-05", modified: "2026-04-07" },
  "kuramae-walk": { published: "2026-04-05", modified: "2026-04-07" },
  "tokyo-tram-line-stops": { published: "2026-04-05", modified: "2026-04-07" },
  "rainy-day-tokyo-neighborhoods": { published: "2026-04-05", modified: "2026-04-07" },
  "ueno-to-yanaka-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "nezu-sendagi-morning-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "monzen-nakacho-fukagawa-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "asakusa-kuramae-sumida-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "oji-asukayama-tram-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "nishi-nippori-yanaka-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "sendagi-yomise-dori-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "morishita-kiyosumi-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "ryogoku-kuramae-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "machiya-arakawa-tram-walk": { published: "2026-04-06", modified: "2026-04-07" },
  "hebi-michi-nezu-shrine-walk": { published: "2026-04-07", modified: "2026-04-07" },
  "yanaka-cemetery-and-cafe-walk": { published: "2026-04-07", modified: "2026-04-07" },
  "kiyosumi-garden-coffee-roasters-walk": { published: "2026-04-07", modified: "2026-04-07" },
  "kuramae-bridge-and-craft-walk": { published: "2026-04-07", modified: "2026-04-07" },
  "waseda-omokagebashi-tram-walk": { published: "2026-04-07", modified: "2026-04-07" },
  "tokyo-morning-walks": { published: "2026-04-07", modified: "2026-04-07" },
  "tokyo-local-transit-half-day": { published: "2026-04-07", modified: "2026-04-07" },
  "tokyo-waterfront-slow-route": { published: "2026-04-07", modified: "2026-04-07" },
  "tokyo-old-town-hillside-walk": { published: "2026-04-07", modified: "2026-04-07" },
  "tokyo-station-based-short-stays": { published: "2026-04-07", modified: "2026-04-07" },
  "tokyo-markets-cafes-local-streets": { published: "2026-04-07", modified: "2026-04-07" },
  "kichijoji-inokashira-park-morning": { published: "2026-04-07", modified: "2026-04-07" },
  "kagurazaka-backstreets-walk": { published: "2026-04-07", modified: "2026-04-07" },
  "jimbocho-kanda-booktown-walk": { published: "2026-04-07", modified: "2026-04-07" },
  "nakameguro-daikanyama-side-streets": { published: "2026-04-07", modified: "2026-04-07" },
  "shibamata-retro-day-trip": { published: "2026-04-07", modified: "2026-04-07" },
  "seoul-morning-walks": { published: "2026-04-07", modified: "2026-04-07" },
  "seoul-seongsu-side-streets-day": { published: "2026-04-07", modified: "2026-04-07" },
  "kyoto-okazaki-canal-and-museums": { published: "2026-04-07", modified: "2026-04-07" },
  "osaka-nakanoshima-riverside-day": { published: "2026-04-07", modified: "2026-04-07" },
  "kyoto-demachiyanagi-kamo-walk": { published: "2026-04-07", modified: "2026-04-08" },
  "kyoto-fushimi-sake-district-walk": { published: "2026-04-07", modified: "2026-04-08" },
  "osaka-sumiyoshi-retro-tram-route": { published: "2026-04-07", modified: "2026-04-08" },
  "kyoto-saga-arashiyama-morning-backstreets": { published: "2026-04-07", modified: "2026-04-08" },
  "kyoto-nishijin-machiya-lanes": { published: "2026-04-07", modified: "2026-04-08" },
  "travel-esim-with-phone-number": { published: "2026-04-04", modified: "2026-04-04" },
  "esim-fair-use-policy": { published: "2026-04-04", modified: "2026-04-04" },
  "regional-esim-vs-country-esim": { published: "2026-04-04", modified: "2026-04-04" },
  "esim-vs-hotel-wifi": { published: "2026-04-04", modified: "2026-04-04" },
};
const DEFAULT_DATES = { published: "2026-03-10", modified: "2026-03-16" };

function resolveGuideDates(
  source: "priority" | "specific" | "program" | "generic",
  slug: string,
  content?: Partial<Pick<GuideArticleContent, "datePublished" | "dateModified">>,
) {
  const mappedDates = GUIDE_DATES[slug];
  const programDates =
    source === "program"
      ? {
          published: SEO_PROGRAM_DEFAULT_PUBLISHED_DATE,
          modified: SEO_PROGRAM_OVERRIDE_DATE,
        }
      : null;
  const published =
    content?.datePublished ??
    programDates?.published ??
    mappedDates?.published ??
    DEFAULT_DATES.published;
  const modified =
    content?.dateModified ??
    programDates?.modified ??
    mappedDates?.modified ??
    content?.datePublished ??
    DEFAULT_DATES.modified;

  return { published, modified };
}

// Guide slug → country eSIM page slug (for cross-linking)
const GUIDE_TO_COUNTRY: Record<string, string> = {
  "japan-esim": "japan", "korea-esim": "south-korea", "thailand-esim": "thailand",
  "usa-esim": "united-states", "uk-esim": "united-kingdom", "france-esim": "france",
  "italy-esim": "italy", "spain-esim": "spain", "germany-esim": "germany",
  "australia-esim": "australia", "singapore-esim": "singapore", "taiwan-esim": "taiwan",
  "vietnam-esim": "vietnam", "indonesia-esim": "indonesia", "malaysia-esim": "malaysia",
  "philippines-esim": "philippines", "china-esim": "china", "canada-esim": "canada",
  "turkey-esim": "turkey", "india-esim": "india", "hawaii-esim": "united-states",
  "hong-kong-esim": "hong-kong", "dubai-esim": "united-arab-emirates",
  "cambodia-esim": "cambodia", "greece-esim": "greece", "mexico-esim": "mexico",
  "new-zealand-esim": "new-zealand", "norway-esim": "norway", "portugal-esim": "portugal",
  "switzerland-esim": "switzerland", "morocco-esim": "morocco",
  "iceland-esim": "iceland", "sri-lanka-esim": "sri-lanka", "guam-esim": "guam",
  "tokyo-morning-walks": "japan",
  "tokyo-local-transit-half-day": "japan",
  "tokyo-waterfront-slow-route": "japan",
  "tokyo-old-town-hillside-walk": "japan",
  "tokyo-station-based-short-stays": "japan",
  "tokyo-markets-cafes-local-streets": "japan",
  "kichijoji-inokashira-park-morning": "japan",
  "jimbocho-kanda-booktown-walk": "japan",
  "seoul-morning-walks": "south-korea",
  "seoul-seongsu-side-streets-day": "south-korea",
  "kyoto-okazaki-canal-and-museums": "japan",
  "osaka-nakanoshima-riverside-day": "japan",
  "kyoto-demachiyanagi-kamo-walk": "japan",
  "kyoto-fushimi-sake-district-walk": "japan",
  "osaka-sumiyoshi-retro-tram-route": "japan",
  "kyoto-saga-arashiyama-morning-backstreets": "japan",
  "kyoto-nishijin-machiya-lanes": "japan",
  ...EXTRA_GUIDE_COUNTRY_MAP,
};

// Related guides for cross-linking
const RELATED_GUIDES: Record<string, string[]> = {
  "japan-esim": ["korea-esim", "taiwan-esim", "quiet-tokyo-neighborhoods", "pocket-wifi-vs-esim-japan"],
  "korea-esim": ["japan-esim", "taiwan-esim", "esim-compatible-phones"],
  "thailand-esim": ["indonesia-esim", "philippines-esim", "esim-for-solo-travel", "greece-esim"],
  "usa-esim": ["canada-esim", "hawaii-esim", "esim-data-plans-explained"],
  "uk-esim": ["france-esim", "europe-esim", "esim-for-business-travel"],
  "france-esim": ["italy-esim", "spain-esim", "europe-esim"],
  "italy-esim": ["france-esim", "greece-esim", "europe-esim"],
  "spain-esim": ["portugal-esim", "france-esim", "europe-esim"],
  "germany-esim": ["switzerland-esim", "france-esim", "europe-esim"],
  "australia-esim": ["esim-for-backpackers", "esim-for-solo-travel", "hawaii-esim", "indonesia-esim"],
  "singapore-esim": ["malaysia-esim", "indonesia-esim", "asia-travel-connectivity"],
  "taiwan-esim": ["japan-esim", "hong-kong-esim", "china-esim"],
  "vietnam-esim": ["thailand-esim", "cambodia-esim", "asia-travel-connectivity"],
  "indonesia-esim": ["thailand-esim", "philippines-esim", "esim-for-solo-travel", "greece-esim"],
  "how-to-setup-esim": ["esim-iphone-setup", "esim-android-setup", "first-time-esim"],
  "esim-compatible-phones": ["esim-iphone-setup", "esim-android-setup", "esim-troubleshooting"],
  "esim-troubleshooting": ["how-to-setup-esim", "esim-compatible-phones", "first-time-esim"],
  "esim-vs-sim-card": ["wifi-vs-esim", "first-time-esim", "esim-data-plans-explained"],
  "first-time-esim": ["how-to-setup-esim", "esim-compatible-phones", "esim-data-plans-explained"],
  "wifi-vs-esim": ["esim-vs-sim-card", "travel-internet-options", "pocket-wifi-vs-esim-japan"],
  "europe-esim": ["france-esim", "italy-esim", "spain-esim", "germany-esim"],
  "esim-for-road-trips": ["best-esim-for-north-america", "australia-esim", "new-zealand-esim", "iceland-esim", "esim-hotspot-tethering"],
  "hawaii-esim": ["esim-for-solo-travel", "greece-esim", "philippines-esim", "guam-esim"],
  "guam-esim": ["hawaii-esim", "esim-for-honeymoon", "esim-for-solo-travel", "travel-internet-options"],
  "croatia-esim": ["greece-esim", "cruise-travel-esim", "best-esim-for-europe", "travel-internet-options"],
  "czech-republic-esim": ["best-esim-for-europe", "europe-esim", "sweden-esim", "travel-internet-options"],
  "sweden-esim": ["best-esim-for-europe", "europe-esim", "czech-republic-esim", "travel-internet-options"],
  "south-africa-esim": ["kenya-esim", "esim-for-road-trips", "travel-internet-options", "how-much-data-do-i-need-for-travel"],
  "kenya-esim": ["south-africa-esim", "esim-for-road-trips", "travel-internet-options", "how-much-data-do-i-need-for-travel"],
  "nepal-esim": ["how-much-data-do-i-need-for-travel", "travel-internet-options", "iceland-esim", "esim-for-road-trips"],
  "greece-esim": ["best-esim-for-europe", "esim-for-solo-travel", "hawaii-esim", "cruise-travel-esim"],
  "philippines-esim": ["best-esim-for-asia", "indonesia-esim", "greece-esim", "hawaii-esim"],
  "sri-lanka-esim": ["best-esim-for-asia", "esim-for-honeymoon", "how-much-data-do-i-need-for-travel", "travel-internet-options"],
  "morocco-esim": ["south-africa-esim", "travel-internet-options", "how-much-data-do-i-need-for-travel", "esim-for-road-trips"],
  "esim-for-honeymoon": ["hawaii-esim", "greece-esim", "philippines-esim", "guam-esim"],
  "esim-for-backpackers": ["thailand-esim", "indonesia-esim", "philippines-esim", "australia-esim"],
  "esim-for-solo-travel": ["thailand-esim", "indonesia-esim", "hawaii-esim", "greece-esim"],
  "ueno-to-yanaka-walk": ["quiet-tokyo-neighborhoods", "yanaka-nezu-sendagi-walk", "nezu-sendagi-morning-walk", "japan-esim"],
  "nezu-sendagi-morning-walk": ["yanaka-nezu-sendagi-walk", "ueno-to-yanaka-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "monzen-nakacho-fukagawa-walk": ["kiyosumi-shirakawa-walk", "quiet-tokyo-neighborhoods", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "asakusa-kuramae-sumida-walk": ["kuramae-walk", "tokyo-tram-line-stops", "quiet-tokyo-neighborhoods", "japan-esim"],
  "oji-asukayama-tram-walk": ["tokyo-tram-line-stops", "quiet-tokyo-neighborhoods", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "nishi-nippori-yanaka-walk": ["ueno-to-yanaka-walk", "yanaka-nezu-sendagi-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "sendagi-yomise-dori-walk": ["nezu-sendagi-morning-walk", "rainy-day-tokyo-neighborhoods", "yanaka-nezu-sendagi-walk", "japan-esim"],
  "morishita-kiyosumi-walk": ["kiyosumi-shirakawa-walk", "monzen-nakacho-fukagawa-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "ryogoku-kuramae-walk": ["asakusa-kuramae-sumida-walk", "kuramae-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "machiya-arakawa-tram-walk": ["oji-asukayama-tram-walk", "tokyo-tram-line-stops", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "hebi-michi-nezu-shrine-walk": ["yanaka-nezu-sendagi-walk", "nezu-sendagi-morning-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "yanaka-cemetery-and-cafe-walk": ["nishi-nippori-yanaka-walk", "ueno-to-yanaka-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "kiyosumi-garden-coffee-roasters-walk": ["kiyosumi-shirakawa-walk", "morishita-kiyosumi-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "kuramae-bridge-and-craft-walk": ["kuramae-walk", "ryogoku-kuramae-walk", "asakusa-kuramae-sumida-walk", "japan-esim"],
  "waseda-omokagebashi-tram-walk": ["tokyo-tram-line-stops", "oji-asukayama-tram-walk", "machiya-arakawa-tram-walk", "japan-esim"],
  "tokyo-morning-walks": ["quiet-tokyo-neighborhoods", "nezu-sendagi-morning-walk", "kichijoji-inokashira-park-morning", "japan-esim"],
  "tokyo-local-transit-half-day": ["tokyo-tram-line-stops", "oji-asukayama-tram-walk", "machiya-arakawa-tram-walk", "japan-esim"],
  "tokyo-waterfront-slow-route": ["kiyosumi-shirakawa-walk", "monzen-nakacho-fukagawa-walk", "asakusa-kuramae-sumida-walk", "japan-esim"],
  "tokyo-old-town-hillside-walk": ["yanaka-nezu-sendagi-walk", "kagurazaka-backstreets-walk", "ueno-to-yanaka-walk", "japan-esim"],
  "tokyo-station-based-short-stays": ["tokyo-morning-walks", "kuramae-walk", "kiyosumi-shirakawa-walk", "japan-esim"],
  "tokyo-markets-cafes-local-streets": ["jimbocho-kanda-booktown-walk", "tokyo-station-based-short-stays", "travel-apps-esim", "japan-esim"],
  "kichijoji-inokashira-park-morning": ["quiet-tokyo-neighborhoods", "kiyosumi-shirakawa-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "kagurazaka-backstreets-walk": ["quiet-tokyo-neighborhoods", "yanaka-nezu-sendagi-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "jimbocho-kanda-booktown-walk": ["quiet-tokyo-neighborhoods", "kuramae-walk", "travel-apps-esim", "japan-esim"],
  "nakameguro-daikanyama-side-streets": ["quiet-tokyo-neighborhoods", "kuramae-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "shibamata-retro-day-trip": ["quiet-tokyo-neighborhoods", "tokyo-tram-line-stops", "ueno-to-yanaka-walk", "japan-esim"],
  "seoul-morning-walks": ["seoul-seongsu-side-streets-day", "korea-esim", "digital-nomad-esim", "travel-apps-esim"],
  "seoul-seongsu-side-streets-day": ["korea-esim", "digital-nomad-esim", "esim-for-solo-travel", "travel-apps-esim"],
  "kyoto-okazaki-canal-and-museums": ["japan-esim", "quiet-tokyo-neighborhoods", "rainy-day-tokyo-neighborhoods", "travel-apps-esim"],
  "osaka-nakanoshima-riverside-day": ["japan-esim", "airport-connectivity-guide", "travel-apps-esim", "esim-for-business-travel"],
  "kyoto-demachiyanagi-kamo-walk": ["japan-esim", "kyoto-okazaki-canal-and-museums", "travel-apps-esim", "quiet-tokyo-neighborhoods"],
  "kyoto-fushimi-sake-district-walk": ["japan-esim", "kyoto-okazaki-canal-and-museums", "travel-apps-esim", "esim-for-business-travel"],
  "osaka-sumiyoshi-retro-tram-route": ["japan-esim", "osaka-nakanoshima-riverside-day", "travel-apps-esim", "airport-connectivity-guide"],
  "kyoto-saga-arashiyama-morning-backstreets": ["japan-esim", "kyoto-okazaki-canal-and-museums", "travel-apps-esim", "quiet-tokyo-neighborhoods"],
  "kyoto-nishijin-machiya-lanes": ["japan-esim", "kyoto-okazaki-canal-and-museums", "travel-apps-esim", "rainy-day-tokyo-neighborhoods"],
};

const DATE_LABELS: Record<string, string> = {
  en: "Last updated",
  ja: "最終更新",
  ko: "최종 업데이트",
  zh: "最后更新",
};

const RELATED_LABELS: Record<string, string> = {
  en: "Related Guides",
  ja: "関連ガイド",
  ko: "관련 가이드",
  zh: "相关指南",
};

const VIEW_PLANS_LABELS: Record<string, (country: string) => string> = {
  en: (c) => `View ${c} eSIM Plans`,
  ja: (c) => `${c}のeSIMプランを見る`,
  ko: (c) => `${c} eSIM 플랜 보기`,
  zh: (c) => `查看${c} eSIM套餐`,
};

const X_SECTION_LABELS: Record<string, string> = {
  en: "Seen on X",
  ja: "Xで見る",
  ko: "X에서 보기",
  zh: "在X上查看",
};

const MINOR_TRAVEL_GUIDE_SLUGS = [
  "quiet-tokyo-neighborhoods",
  "yanaka-nezu-sendagi-walk",
  "kiyosumi-shirakawa-walk",
  "kuramae-walk",
  "tokyo-tram-line-stops",
  "rainy-day-tokyo-neighborhoods",
  "ueno-to-yanaka-walk",
  "nezu-sendagi-morning-walk",
  "monzen-nakacho-fukagawa-walk",
  "asakusa-kuramae-sumida-walk",
  "oji-asukayama-tram-walk",
  "nishi-nippori-yanaka-walk",
  "sendagi-yomise-dori-walk",
  "morishita-kiyosumi-walk",
  "ryogoku-kuramae-walk",
  "machiya-arakawa-tram-walk",
  "hebi-michi-nezu-shrine-walk",
  "yanaka-cemetery-and-cafe-walk",
  "kiyosumi-garden-coffee-roasters-walk",
  "kuramae-bridge-and-craft-walk",
  "waseda-omokagebashi-tram-walk",
  "tokyo-morning-walks",
  "tokyo-local-transit-half-day",
  "tokyo-waterfront-slow-route",
  "tokyo-old-town-hillside-walk",
  "tokyo-station-based-short-stays",
  "tokyo-markets-cafes-local-streets",
  "kichijoji-inokashira-park-morning",
  "kagurazaka-backstreets-walk",
  "jimbocho-kanda-booktown-walk",
  "nakameguro-daikanyama-side-streets",
  "shibamata-retro-day-trip",
  "seoul-morning-walks",
  "seoul-seongsu-side-streets-day",
  "kyoto-okazaki-canal-and-museums",
  "osaka-nakanoshima-riverside-day",
  "kyoto-demachiyanagi-kamo-walk",
  "kyoto-fushimi-sake-district-walk",
  "osaka-sumiyoshi-retro-tram-route",
  "kyoto-saga-arashiyama-morning-backstreets",
  "kyoto-nishijin-machiya-lanes",
] as const;

const MINOR_TRAVEL_HUB_LABELS: Record<string, { title: string; desc: string }> = {
  en: {
    title: "Explore more minor travel guides",
    desc: "Browse quieter neighborhood walks, riverside half days, and low-key city routes for foreign travelers.",
  },
  ja: {
    title: "マイナー観光ガイドをもっと見る",
    desc: "静かな街歩き、川沿い半日、少しローカル寄りの都市ルートなどをまとめて見られます。",
  },
  ko: {
    title: "소규모 여행 가이드를 더 보기",
    desc: "조용한 동네 산책, 강변 반나절 코스, 덜 알려진 도시 루트를 한곳에서 볼 수 있습니다.",
  },
  zh: {
    title: "查看更多小众旅行指南",
    desc: "集中查看安静街区散步、河岸半日路线和更低调的城市行走内容。",
  },
};

const MINOR_TRAVEL_JSONLD_SECTION: Record<string, string> = {
  en: "Travel guide",
  ja: "観光ガイド",
  ko: "여행 가이드",
  zh: "旅行指南",
};

const MINOR_TRAVEL_JSONLD_ABOUT: Record<string, string> = {
  en: "Minor neighborhood guides and quieter city walks",
  ja: "マイナー観光地と静かな街歩き",
  ko: "소규모 동네 가이드와 조용한 산책 루트",
  zh: "小众街区与安静散步路线",
};

// All guide slugs and their per-locale content
const GUIDE_CONTENT: Record<string, Record<string, GuideArticleContent>> = {
  "japan-esim": {
    en: {
      title: "Japan eSIM Guide 2026 — Best Plans for Travelers",
      description: "Everything you need to know about using eSIM in Japan. Compare top plans, coverage, setup instructions, and tips for staying connected in Tokyo, Osaka, Kyoto and beyond.",
      sections: [
        { heading: "Why Use eSIM in Japan?", body: "Japan has excellent 4G/5G coverage from carriers like NTT Docomo, SoftBank, and KDDI au. An eSIM is the easiest way to get data access — no airport queues, no SIM swapping, just scan a QR code and connect." },
        { heading: "Best eSIM Plans for Japan", body: "Most Japan eSIM plans offer data-only packages ranging from 1GB for short trips to unlimited daily plans for extended stays. Look for plans with NTT Docomo or SoftBank network backing for the best coverage, including rural areas and bullet train routes." },
        { heading: "How to Set Up Your Japan eSIM", body: "1. Purchase your plan on AutoWiFi eSIM before departure.\n2. You'll receive a QR code by email.\n3. Go to Settings > Cellular > Add eSIM on iPhone, or Settings > Connections > SIM manager on Android.\n4. Scan the QR code.\n5. Enable data roaming when you land in Japan." },
        { heading: "Coverage in Major Cities", body: "Tokyo, Osaka, Kyoto, Hiroshima, Sapporo, and Fukuoka all have near-perfect 5G coverage. Even rural areas like countryside Hokkaido and mountain resorts in Nagano typically have solid 4G service." },
        { heading: "Tips for Traveling in Japan", body: "Japan uses IC card systems (Suica, Pasmo) at train stations — make sure your phone also has Google Pay or Apple Pay loaded for seamless transit payments. Japan's trains have spotty in-carriage wifi; an eSIM ensures you stay connected throughout your commute." },
      ],
      faq: [
        { q: "Does eSIM work on the Shinkansen (bullet train)?", a: "Yes, major carriers maintain coverage along Shinkansen routes. NTT Docomo and SoftBank networks are the most reliable for bullet train travel." },
        { q: "Can I make phone calls with a Japan eSIM?", a: "Most travel eSIMs for Japan are data-only. For calls, use apps like WhatsApp, LINE, or FaceTime over the data connection." },
        { q: "How much data do I need for a week in Japan?", a: "For typical sightseeing (maps, social media, occasional video), 5-10GB is sufficient for a week. If you stream video frequently, consider an unlimited plan." },
      ],
      ctaTitle: "Get Your Japan eSIM Today",
      ctaButton: "View Japan eSIM Plans",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
    ja: {
      title: "日本のeSIMガイド 2026 — 旅行者向けおすすめプラン",
      description: "日本でeSIMを使う方法を徹底解説。おすすめプラン、カバレッジ、設定手順、東京・大阪・京都など主要都市での通信環境を比較。",
      sections: [
        { heading: "日本でeSIMを使うメリット", body: "日本はNTTドコモ・ソフトバンク・KDDI auの優れた4G/5Gカバレッジがあります。eSIMなら空港でSIMを買う手間も、差し替えも不要。QRコードを読み取るだけで即つながります。" },
        { heading: "日本eSIMのおすすめプラン", body: "日本のeSIMプランは1GBの短期プランから、毎日無制限プランまで幅広く揃っています。都市部はもちろん、地方や新幹線ルートでも安定した接続のため、ドコモ・ソフトバンク回線のプランをおすすめします。" },
        { heading: "日本eSIMの設定方法", body: "1. 出発前にAutoWiFi eSIMでプランを購入\n2. QRコードがメールで届く\n3. iPhoneなら設定 > モバイル通信 > eSIM追加、Androidなら設定 > 接続 > SIMマネージャーへ\n4. QRコードを読み取る\n5. 日本到着後にデータ通信をONにする" },
        { heading: "主要都市のカバレッジ", body: "東京・大阪・京都・広島・札幌・福岡はほぼ全域で5G接続が可能です。北海道の田舎や長野の山岳リゾートエリアでも4Gが安定して使えます。" },
        { heading: "日本旅行のコツ", body: "駅ではSuica・PASMOなどのICカードが必要。Google Pay・Apple Payをスマホに登録しておくとスムーズです。新幹線の車内WiFiは不安定なことが多いので、eSIMがあると安心です。" },
      ],
      faq: [
        { q: "新幹線でeSIMは使えますか？", a: "はい、主要キャリアは新幹線ルート沿いのカバレッジを維持しています。NTTドコモ・ソフトバンク回線が新幹線乗車中は最も安定しています。" },
        { q: "日本のeSIMで電話はできますか？", a: "ほとんどのトラベルeSIMはデータ通信のみです。通話はWhatsApp・LINE・FaceTimeなどのアプリをご利用ください。" },
        { q: "1週間の日本旅行に何GBのデータが必要ですか？", a: "地図・SNS・写真投稿が中心なら5〜10GBで十分です。動画をよく見るなら無制限プランをおすすめします。" },
      ],
      ctaTitle: "今すぐ日本のeSIMを入手",
      ctaButton: "日本のeSIMプランを見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
    ko: {
      title: "일본 eSIM 가이드 2026 — 여행자를 위한 추천 플랜",
      description: "일본에서 eSIM 사용법 완벽 가이드. 추천 플랜, 커버리지, 설정 방법, 도쿄·오사카·교토 등 주요 도시 통신 환경 비교.",
      sections: [
        { heading: "일본에서 eSIM을 사용하는 이유", body: "일본은 NTT 도코모, 소프트뱅크, KDDI au의 우수한 4G/5G 커버리지를 보유합니다. eSIM은 공항에서 줄 설 필요 없이 QR 코드 스캔만으로 즉시 연결됩니다." },
        { heading: "일본 eSIM 추천 플랜", body: "일본 eSIM 플랜은 단기 1GB부터 매일 무제한 플랜까지 다양합니다. 도심은 물론 지방과 신칸센 노선에서도 안정적인 연결을 위해 도코모 또는 소프트뱅크 회선 플랜을 추천합니다." },
        { heading: "일본 eSIM 설정 방법", body: "1. 출발 전 AutoWiFi eSIM에서 플랜 구매\n2. 이메일로 QR 코드 수령\n3. iPhone: 설정 > 셀룰러 > eSIM 추가, Android: 설정 > 연결 > SIM 관리자\n4. QR 코드 스캔\n5. 일본 도착 후 데이터 로밍 활성화" },
        { heading: "주요 도시 커버리지", body: "도쿄, 오사카, 교토, 히로시마, 삿포로, 후쿠오카는 전역에서 5G 연결 가능. 홋카이도 시골이나 나가노 산악 리조트에서도 4G가 안정적으로 작동합니다." },
        { heading: "일본 여행 팁", body: "역에서는 스이카·파스모 IC 카드가 필요합니다. Google Pay 또는 Apple Pay를 스마트폰에 등록해 두세요. 신칸센 내 WiFi는 불안정한 경우가 많으니 eSIM이 있으면 안심입니다." },
      ],
      faq: [
        { q: "신칸센에서 eSIM이 작동하나요?", a: "네, 주요 통신사는 신칸센 노선 커버리지를 유지합니다. NTT 도코모와 소프트뱅크 회선이 신칸센 탑승 중 가장 안정적입니다." },
        { q: "일본 eSIM으로 전화할 수 있나요?", a: "대부분의 여행용 eSIM은 데이터 전용입니다. 통화는 WhatsApp, LINE, FaceTime 등의 앱을 이용하세요." },
        { q: "일본 여행 1주일에 데이터가 얼마나 필요한가요?", a: "지도, SNS, 사진 업로드 중심이라면 5~10GB면 충분합니다. 영상을 자주 본다면 무제한 플랜을 추천합니다." },
      ],
      ctaTitle: "지금 일본 eSIM 구매",
      ctaButton: "일본 eSIM 플랜 보기",
      breadcrumbGuide: "가이드",
      breadcrumbHome: "홈",
    },
    zh: {
      title: "日本eSIM指南 2026 — 旅行者推荐套餐",
      description: "日本eSIM使用完全攻略。推荐套餐、覆盖范围、设置教程，以及东京、大阪、京都等主要城市通信环境对比。",
      sections: [
        { heading: "为什么在日本使用eSIM？", body: "日本拥有NTT Docomo、SoftBank、KDDI au的优质4G/5G网络覆盖。eSIM无需在机场排队买SIM卡，扫描二维码即可立即连接。" },
        { heading: "日本eSIM推荐套餐", body: "日本eSIM套餐从短途1GB到每日无限流量套餐一应俱全。为确保城市和乡村以及新干线沿线的稳定连接，推荐选择Docomo或SoftBank回线的套餐。" },
        { heading: "日本eSIM设置方法", body: "1. 出发前在AutoWiFi eSIM购买套餐\n2. 邮件收到二维码\n3. iPhone: 设置 > 蜂窝网络 > 添加eSIM；Android: 设置 > 连接 > SIM卡管理\n4. 扫描二维码\n5. 抵达日本后开启数据漫游" },
        { heading: "主要城市覆盖", body: "东京、大阪、京都、广岛、札幌、福冈全域均可5G连接。北海道农村和长野山区度假村也能稳定使用4G。" },
        { heading: "日本旅行小贴士", body: "车站需要Suica或PASMO IC卡，建议将Google Pay或Apple Pay绑定到手机。新干线车内WiFi有时不稳定，有了eSIM就更安心。" },
      ],
      faq: [
        { q: "新干线上能用eSIM吗？", a: "可以，主要运营商在新干线沿线均有网络覆盖。NTT Docomo和SoftBank回线在乘坐新干线时最为稳定。" },
        { q: "日本eSIM可以打电话吗？", a: "大多数旅行eSIM仅提供数据服务。通话可使用WhatsApp、LINE或FaceTime等应用。" },
        { q: "日本旅行一周需要多少流量？", a: "以导航、社交媒体、拍照为主的话，5-10GB足够一周使用。如果经常看视频，建议选择无限流量套餐。" },
      ],
      ctaTitle: "立即获取日本eSIM",
      ctaButton: "查看日本eSIM套餐",
      breadcrumbGuide: "指南",
      breadcrumbHome: "首页",
    },
  },
};

// Generic fallback content generator for guides without specific content
function getGenericContent(slug: string, locale: string): GuideArticleContent | null {
  const extraGuideData = getExtraGuideContent(slug, locale as GuideLocale);
  const extraGuideDefinition = getExtraGuideDefinition(slug);

  // Guide index CONTENT by locale for lookup
  const GUIDE_TITLES: Record<string, Record<string, { title: string; desc: string }>> = {
    ja: {
      "korea-esim": { title: "韓国のeSIMガイド 2026", desc: "韓国旅行のeSIM完全ガイド。ソウル・釜山・済州島での高速5G接続。おすすめプランと設定方法を解説。" },
      "thailand-esim": { title: "タイのeSIMガイド 2026", desc: "タイ旅行のeSIM完全ガイド。バンコク・プーケット・チェンマイでの通信環境とおすすめプランを比較。" },
      "usa-esim": { title: "アメリカのeSIMガイド 2026", desc: "アメリカ旅行のeSIM完全ガイド。全50州対応の高速データプランと設定方法。" },
      "uk-esim": { title: "イギリスのeSIMガイド 2026", desc: "イギリス旅行のeSIM完全ガイド。ロンドン・エディンバラでの通信とおすすめプラン。" },
      "france-esim": { title: "フランスのeSIMガイド 2026", desc: "フランス旅行のeSIM完全ガイド。パリをはじめフランス全土とEUローミング対応プラン。" },
      "italy-esim": { title: "イタリアのeSIMガイド 2026", desc: "イタリア旅行のeSIM完全ガイド。ローマ・ミラノ・フィレンツェの通信環境とおすすめプラン。" },
      "spain-esim": { title: "スペインのeSIMガイド 2026", desc: "スペイン旅行のeSIM完全ガイド。マドリード・バルセロナとスペイン全土対応プランを比較。" },
      "germany-esim": { title: "ドイツのeSIMガイド 2026", desc: "ドイツ旅行のeSIM完全ガイド。ベルリン・ミュンヘンでの高速通信とおすすめプラン。" },
      "australia-esim": { title: "オーストラリアのeSIMガイド 2026", desc: "オーストラリア旅行のeSIM完全ガイド。シドニー・メルボルン・ゴールドコーストのカバレッジとプラン比較。" },
      "singapore-esim": { title: "シンガポールのeSIMガイド 2026", desc: "シンガポール旅行のeSIM完全ガイド。市内全域5G対応プランと設定方法。" },
      "taiwan-esim": { title: "台湾のeSIMガイド 2026", desc: "台湾旅行のeSIM完全ガイド。台北・高雄での高速通信とおすすめプランを解説。" },
      "vietnam-esim": { title: "ベトナムのeSIMガイド 2026", desc: "ベトナム旅行のeSIM完全ガイド。ホーチミン・ハノイ・ダナンの格安データプランを比較。" },
      "indonesia-esim": { title: "インドネシアのeSIMガイド 2026", desc: "バリ島・ジャカルタのeSIM完全ガイド。インドネシア全土対応プランと設定方法。" },
      "malaysia-esim": { title: "マレーシアのeSIMガイド 2026", desc: "マレーシア旅行のeSIM完全ガイド。クアラルンプール・ペナンの通信環境とプラン比較。" },
      "philippines-esim": { title: "フィリピンのeSIMガイド 2026", desc: "フィリピン旅行のeSIM完全ガイド。マニラ・セブ・ボラカイ島のデータプランを解説。" },
      "china-esim": { title: "中国のeSIMガイド 2026", desc: "中国旅行のeSIM完全ガイド。VPN・通信規制情報と対応eSIMプランを解説。" },
      "canada-esim": { title: "カナダのeSIMガイド 2026", desc: "カナダ旅行のeSIM完全ガイド。トロント・バンクーバーの高速5Gプランと設定方法。" },
      "turkey-esim": { title: "トルコのeSIMガイド 2026", desc: "トルコ旅行のeSIM完全ガイド。イスタンブール・カッパドキアでの通信環境とプラン比較。" },
      "india-esim": { title: "インドのeSIMガイド 2026", desc: "インド旅行のeSIM完全ガイド。デリー・ムンバイ・バンガロールの通信環境とおすすめプラン。" },
      "hawaii-esim": { title: "ハワイのeSIMガイド 2026", desc: "ハワイ旅行のeSIM完全ガイド。オアフ・マウイ・ハワイ島のカバレッジとおすすめプラン。" },
      "guam-esim": { title: "グアムのeSIMガイド 2026", desc: "グアム旅行のeSIM完全ガイド。リゾートエリア対応の格安eSIMプランを比較。" },
      "hong-kong-esim": { title: "香港のeSIMガイド 2026", desc: "香港旅行のeSIM完全ガイド。市内全域5G対応プランと設定方法を解説。" },
      "dubai-esim": { title: "ドバイのeSIMガイド 2026", desc: "ドバイ・UAE旅行のeSIM完全ガイド。ドバイの高速通信環境とおすすめプラン。" },
      "europe-esim": { title: "ヨーロッパ周遊eSIMガイド 2026", desc: "1枚のeSIMでヨーロッパ複数国を周遊。マルチカントリープランの比較と設定方法。" },
      "cambodia-esim": { title: "カンボジアのeSIMガイド 2026", desc: "アンコールワット・プノンペンのeSIMガイド。カンボジア旅行の通信環境とおすすめプラン。" },
      "greece-esim": { title: "ギリシャのeSIMガイド 2026", desc: "ギリシャ旅行のeSIM完全ガイド。アテネ・サントリーニ島の通信環境とプラン比較。" },
      "mexico-esim": { title: "メキシコのeSIMガイド 2026", desc: "カンクン・メキシコシティのeSION完全ガイド。メキシコ旅行の通信環境とおすすめプラン。" },
      "new-zealand-esim": { title: "ニュージーランドのeSIMガイド 2026", desc: "NZ旅行のeSIM完全ガイド。オークランド・クライストチャーチとドライブ旅行の通信環境。" },
      "iceland-esim": { title: "アイスランドのeSIMガイド 2026", desc: "リングロード、レイキャビク、郊外ドライブ向けに通信環境を比較するアイスランド旅行ガイド。" },
      "norway-esim": { title: "ノルウェーのeSIMガイド 2026", desc: "フィヨルド観光・オーロラ鑑賞のeSIMガイド。ノルウェー旅行の通信環境とプラン比較。" },
      "portugal-esim": { title: "ポルトガルのeSIMガイド 2026", desc: "リスボン・ポルトのeSIM完全ガイド。ポルトガル旅行とEUローミング対応プランを解説。" },
      "switzerland-esim": { title: "スイスのeSIMガイド 2026", desc: "スイス旅行のeSIM完全ガイド。アルプスと主要都市での通信環境とおすすめプラン。" },
      "morocco-esim": { title: "モロッコのeSIMガイド 2026", desc: "マラケシュ・サハラ砂漠のeSIMガイド。モロッコ旅行の通信環境とおすすめプラン。" },
      "how-to-setup-esim": { title: "eSIMの設定方法 — iPhone・Android完全ガイド", desc: "eSIMのステップバイステップ設定手順。iPhone・Android対応。QRコードの読み取りから接続確認まで。" },
      "esim-compatible-phones": { title: "eSIM対応スマートフォン一覧 2026", desc: "eSIMが使えるiPhone・Android・その他スマートフォンの完全リスト。お使いの端末が対応しているか確認できます。" },
      "esim-troubleshooting": { title: "eSIMトラブルシューティング — よくある問題と解決方法", desc: "eSIMが接続できない・QRコードが読み取れない・データ通信が遅いなど、よくある問題の解決方法を解説。" },
      "esim-vs-sim-card": { title: "eSIM vs 物理SIMカード — 徹底比較", desc: "eSIMと従来の物理SIMカードの違いを価格・使いやすさ・対応端末・通信品質で比較。どちらが旅行に向いているか解説。" },
      "esim-for-business-travel": { title: "ビジネス旅行のeSIM — 出張者向けガイド", desc: "出張者向けeSIM完全ガイド。複数国対応プラン・経費精算・セキュリティ・おすすめサービスを解説。" },
      "first-time-esim": { title: "初めてのeSIM完全ガイド — 購入から設定まで", desc: "eSIMを初めて使う方向けの入門ガイド。購入方法・設定手順・よくある疑問をわかりやすく解説。" },
      "esim-data-plans-explained": { title: "eSIMデータプランの選び方 — 容量・有効期限・カバレッジ解説", desc: "eSIMのデータ容量・有効期限・カバレッジの違いを解説。旅行スタイル別の最適プランの選び方。" },
      "travel-internet-options": { title: "海外旅行のネット接続方法を比較 — eSIM・WiFi・ローミング・SIM", desc: "海外旅行のインターネット接続手段4種類を徹底比較。eSIM・ポケットWiFi・ローミング・現地SIMのメリット・デメリット。" },
      "dual-sim-esim": { title: "デュアルSIM × eSIM活用術 — 日本番号を維持したまま海外データを使う", desc: "日本のSIMを残しながらeSIMで海外データ通信。デュアルSIM設定方法とおすすめの使い方を解説。" },
      "esim-for-students": { title: "留学生のためのeSIM完全ガイド", desc: "海外留学・ワーキングホリデーでのeSIM活用術。長期滞在向けプランと設定のコツ。" },
      "esim-long-term-travel": { title: "長期旅行・バックパッカーのためのeSIM", desc: "長期旅行・世界一周・デジタルノマド向けeSIMガイド。複数国対応プランと費用節約のコツ。" },
      "save-money-roaming": { title: "高額な海外ローミングを避ける方法 — eSIMで賢く節約", desc: "キャリアの海外ローミングは高額。eSIMに切り替えるだけで通信費を大幅節約できる方法を解説。" },
      "asia-travel-connectivity": { title: "アジア旅行の通信ガイド 2026 — 各国の通信環境まとめ", desc: "アジア各国の通信インフラ・キャリア・eSIM対応状況を比較。旅行前に知っておきたい通信事情。" },
      "europe-travel-connectivity": { title: "ヨーロッパ旅行の通信ガイド 2026 — EUローミングとeSIM", desc: "ヨーロッパ旅行の通信事情を解説。EUローミング規制・各国キャリア・eSIMの活用法。" },
      "best-esim-providers": { title: "おすすめeSIMプロバイダー比較 2026 — 主要サービスを徹底レビュー", desc: "Airalo・Holafly・World eSIM・trifaなど主要eSIMサービスを料金・カバレッジ・日本語サポートで比較。" },
      "travel-data-usage-tips": { title: "旅行中のデータ節約術 — モバイルデータを賢く使うコツ", desc: "海外旅行中にモバイルデータを節約する実践的なテクニック。設定・アプリ・オフラインマップの活用法。" },
      "international-calling-esim": { title: "eSIMで国際通話 — 海外から日本へ電話する方法", desc: "eSIMを使った国際通話の方法と料金比較。WhatsApp・LINE・Skypeなどアプリ通話の活用法。" },
      "cruise-travel-esim": { title: "クルーズ旅行のeSIM — 船上通信ガイド", desc: "クルーズ旅行での通信手段ガイド。船内WiFiとeSIMの比較、寄港地での接続方法を解説。" },
      "digital-nomad-esim": { title: "デジタルノマドのeSIM完全ガイド 2026", desc: "世界を移動しながら働くデジタルノマド向けeSIMガイド。複数国対応・長期プランの選び方。" },
      "family-travel-esim": { title: "家族旅行のeSIM — 全員分の通信を賢く管理", desc: "家族全員のeSIMをスムーズに設定・管理する方法。子供用スマホのeSIM設定とデータ管理のコツ。" },
      "esim-prepaid-vs-postpaid": { title: "eSIMプリペイド vs ポストペイド — どちらが旅行に向いている？", desc: "旅行用eSIMの料金体系（プリペイド・ポストペイド）の違いと、それぞれのメリット・デメリット。" },
      "esim-security-tips": { title: "eSIMのセキュリティ — 安全に使うための5つのポイント", desc: "eSIMのセキュリティリスクと対策を解説。公衆WiFiの危険性・VPNの使い方・SIMスワップ詐欺の防ぎ方。" },
      "airport-connectivity-guide": { title: "世界の空港WiFi・通信ガイド — 乗り継ぎも安心", desc: "成田・羽田・仁川・シンガポール・ドバイなど主要空港のWiFi環境とeSIM使用時の注意点。" },
      "esim-activation-timing": { title: "eSIMはいつ有効化すべき？ — 出発前 vs 到着後", desc: "eSIMの最適な有効化タイミングを解説。プランの有効期限を最大限活用するためのコツ。" },
      "travel-apps-esim": { title: "eSIMと使いたいおすすめ旅行アプリ 2026", desc: "Google Maps・Airbnb・Uberなど海外旅行で役立つアプリと、eSIMを活用した快適な旅の作り方。" },
    },
    en: {
      "korea-esim": { title: "South Korea eSIM Guide 2026", desc: "Complete guide to using eSIM in South Korea. Best plans for Seoul, Busan, Jeju and beyond with high-speed 5G connectivity." },
      "thailand-esim": { title: "Thailand eSIM Guide 2026", desc: "Best eSIM plans for Thailand. Coverage in Bangkok, Phuket, Chiang Mai. Instant activation, affordable rates." },
      "usa-esim": { title: "USA eSIM Guide 2026", desc: "Best eSIM plans for the United States. Nationwide 4G/5G coverage. Compare top providers for your American trip." },
      "uk-esim": { title: "UK eSIM Guide 2026", desc: "Best eSIM plans for the United Kingdom. Coverage in London, Edinburgh, Manchester and all of the UK." },
      "france-esim": { title: "France eSIM Guide 2026", desc: "Best eSIM plans for France. Coverage in Paris, Nice, Lyon plus EU roaming options." },
      "italy-esim": { title: "Italy eSIM Guide 2026", desc: "Best eSIM plans for Italy. Coverage in Rome, Milan, Florence, Venice and across Italy." },
      "spain-esim": { title: "Spain eSIM Guide 2026", desc: "Best eSIM plans for Spain. Coverage in Madrid, Barcelona, Seville and all of Spain." },
      "germany-esim": { title: "Germany eSIM Guide 2026", desc: "Best eSIM plans for Germany. Coverage in Berlin, Munich, Hamburg and across Germany." },
      "australia-esim": { title: "Australia eSIM Guide 2026", desc: "Best eSIM plans for Australia. Coverage in Sydney, Melbourne, Brisbane and major cities." },
      "singapore-esim": { title: "Singapore eSIM Guide 2026", desc: "Best eSIM plans for Singapore. Ultra-fast 5G coverage across the city-state." },
      "taiwan-esim": { title: "Taiwan eSIM Guide 2026", desc: "Best eSIM plans for Taiwan. Coverage in Taipei, Kaohsiung and across Taiwan." },
      "vietnam-esim": { title: "Vietnam eSIM Guide 2026", desc: "Best affordable eSIM plans for Vietnam. Coverage in Ho Chi Minh City, Hanoi, Da Nang." },
      "indonesia-esim": { title: "Indonesia eSIM Guide 2026", desc: "Best eSIM plans for Indonesia. Coverage in Bali, Jakarta, Lombok and beyond." },
      "malaysia-esim": { title: "Malaysia eSIM Guide 2026", desc: "Best eSIM plans for Malaysia. Coverage in Kuala Lumpur, Penang, Langkawi." },
      "philippines-esim": { title: "Philippines eSIM Guide 2026", desc: "Best eSIM plans for the Philippines. Coverage in Manila, Cebu, Boracay and the islands." },
      "china-esim": { title: "China eSIM Guide 2026", desc: "eSIM options for China travel. Important information about VPN requirements and connectivity." },
      "canada-esim": { title: "Canada eSIM Guide 2026", desc: "Best eSIM plans for Canada. Coverage in Toronto, Vancouver, Montreal and across Canada." },
      "turkey-esim": { title: "Turkey eSIM Guide 2026", desc: "Best eSIM plans for Turkey. Coverage in Istanbul, Cappadocia and major tourist areas." },
      "india-esim": { title: "India eSIM Guide 2026", desc: "Best eSIM plans for India. Coverage in Delhi, Mumbai, Bangalore and major cities." },
      "hawaii-esim": { title: "Hawaii eSIM Guide 2026", desc: "Best eSIM plans for Hawaii. Coverage on Oahu, Maui, Big Island and all Hawaiian islands." },
      "guam-esim": { title: "Guam eSIM Guide 2026", desc: "Best eSIM plans for Guam. Coverage across resort areas and the entire island." },
      "hong-kong-esim": { title: "Hong Kong eSIM Guide 2026", desc: "Best eSIM plans for Hong Kong. Ultra-fast 5G coverage across the city." },
      "dubai-esim": { title: "Dubai & UAE eSIM Guide 2026", desc: "Best eSIM plans for Dubai and the UAE. High-speed coverage across the Emirates." },
      "europe-esim": { title: "Europe Multi-Country eSIM Guide 2026", desc: "Best eSIM plans for traveling across Europe. One plan for 30+ countries." },
      "cambodia-esim": { title: "Cambodia eSIM Guide 2026", desc: "Best eSIM plans for Cambodia. Coverage in Phnom Penh, Siem Reap and Angkor Wat." },
      "greece-esim": { title: "Greece eSIM Guide 2026", desc: "Best eSIM plans for Greece. Coverage in Athens, Santorini, Mykonos and the islands." },
      "mexico-esim": { title: "Mexico eSIM Guide 2026", desc: "Best eSIM plans for Mexico. Coverage in Cancun, Mexico City, Playa del Carmen and beyond." },
      "new-zealand-esim": { title: "New Zealand eSIM Guide 2026", desc: "Best eSIM plans for New Zealand. Coverage for road trips, Auckland, Wellington and Queenstown." },
      "iceland-esim": { title: "Iceland eSIM Guide 2026", desc: "Best eSIM plans for Iceland. Coverage for Ring Road drives, Reykjavik, and remote scenic routes." },
      "norway-esim": { title: "Norway eSIM Guide 2026", desc: "Best eSIM plans for Norway. Coverage in Oslo, Bergen and fjord regions." },
      "portugal-esim": { title: "Portugal eSIM Guide 2026", desc: "Best eSIM plans for Portugal. Coverage in Lisbon, Porto and EU roaming options." },
      "switzerland-esim": { title: "Switzerland eSIM Guide 2026", desc: "Best eSIM plans for Switzerland. Coverage in Zurich, Geneva, Bern and the Alps." },
      "morocco-esim": { title: "Morocco eSIM Guide 2026", desc: "Best eSIM plans for Morocco. Coverage in Marrakech, Casablanca, the Sahara and beyond." },
      "how-to-setup-esim": { title: "How to Set Up eSIM — iPhone & Android Step-by-Step Guide", desc: "Complete guide to setting up eSIM on any device. Step-by-step instructions for iPhone and Android with screenshots." },
      "esim-compatible-phones": { title: "eSIM Compatible Phones List 2026 — Complete Device Guide", desc: "Complete list of smartphones that support eSIM. Check if your iPhone, Samsung, Google Pixel, or other phone is compatible." },
      "esim-troubleshooting": { title: "eSIM Not Working? Troubleshooting Guide", desc: "Fix common eSIM problems: can't connect, QR code not scanning, no service, slow speeds. Step-by-step solutions." },
      "esim-vs-sim-card": { title: "eSIM vs Physical SIM Card — Complete Comparison", desc: "eSIM vs SIM card: which is better for travel? Compare cost, convenience, coverage and compatibility." },
      "esim-for-business-travel": { title: "eSIM for Business Travel — Corporate Guide", desc: "Everything business travelers need to know about eSIM. Multi-country plans, expense tracking, and top provider recommendations." },
      "first-time-esim": { title: "First-Time eSIM Guide — Everything You Need to Know", desc: "Never used eSIM before? This complete beginner's guide covers everything from purchase to activation and troubleshooting." },
      "esim-data-plans-explained": { title: "How to Choose the Right eSIM Data Plan", desc: "Understand eSIM data plans: how much data you need, plan validity, coverage and how to choose the best option." },
      "travel-internet-options": { title: "Travel Internet Options Compared — eSIM vs WiFi vs Roaming vs SIM", desc: "Comprehensive comparison of all ways to get internet abroad. Find out which option saves the most money for your trip." },
      "dual-sim-esim": { title: "Dual SIM with eSIM — Keep Your Number While Using Data Abroad", desc: "How to use eSIM data while keeping your home number active. Setup guide for iPhone and Android dual SIM." },
      "esim-for-students": { title: "eSIM for Study Abroad — Complete Student Guide", desc: "The best eSIM options for international students. Long-term plans, setup tips and cost-saving strategies." },
      "esim-long-term-travel": { title: "eSIM for Long-Term Travel & Digital Nomads", desc: "Best eSIM plans for extended travel. Multi-country coverage, monthly plans and tips for digital nomads." },
      "save-money-roaming": { title: "How to Avoid Roaming Charges with eSIM", desc: "Stop paying expensive carrier roaming fees. Switch to eSIM and save up to 90% on international data." },
      "asia-travel-connectivity": { title: "Asia Travel Connectivity Guide 2026 — Internet Across Asia", desc: "Complete guide to internet access in Asia. Country-by-country comparison of networks, eSIM availability and costs." },
      "europe-travel-connectivity": { title: "Europe Travel Connectivity Guide 2026 — EU Roaming & eSIM", desc: "How to stay connected in Europe. EU roaming rules, country-specific tips, and best eSIM plans for European travel." },
      "best-esim-providers": { title: "Best eSIM Providers 2026 — Top Services Compared", desc: "Compare the top travel eSIM providers including Airalo, Holafly, AutoWiFi and more. Find the best plan for your trip." },
      "travel-data-usage-tips": { title: "How to Save Mobile Data While Traveling", desc: "Practical tips to reduce data usage abroad. Phone settings, apps to avoid, and how to use offline maps." },
      "international-calling-esim": { title: "Making International Calls with eSIM", desc: "How to make and receive calls abroad using eSIM. Compare calling apps vs carrier plans for the cheapest option." },
      "cruise-travel-esim": { title: "eSIM for Cruise Travel — Staying Connected at Sea", desc: "How to use eSIM on a cruise. Compare ship WiFi vs eSIM for port days. Best plans for cruise travelers." },
      "digital-nomad-esim": { title: "Digital Nomad eSIM Guide 2026 — Work Remotely Worldwide", desc: "Best eSIM solutions for remote workers and digital nomads. Multi-country plans, reliability tips and top picks." },
      "family-travel-esim": { title: "eSIM for Family Travel — Managing Multiple Devices", desc: "How to set up and manage eSIM for the whole family. Plans for kids, group savings and easy setup guide." },
      "esim-prepaid-vs-postpaid": { title: "Prepaid vs Postpaid eSIM — Which is Better for Travelers?", desc: "Compare prepaid and postpaid eSIM options. Understand the pros, cons and which is best for your travel style." },
      "esim-security-tips": { title: "eSIM Security Guide — Stay Safe While Traveling", desc: "How to keep your eSIM and data secure while traveling. Tips on avoiding public WiFi risks and SIM swap fraud." },
      "airport-connectivity-guide": { title: "Airport Connectivity Guide — WiFi & eSIM at Major Airports", desc: "What to expect for connectivity at the world's busiest airports. eSIM activation tips and airport WiFi alternatives." },
      "esim-activation-timing": { title: "When Should You Activate Your eSIM?", desc: "Should you activate eSIM before or after arrival? Understand plan validity windows to get the most from your data." },
      "travel-apps-esim": { title: "Best Travel Apps to Use with eSIM in 2026", desc: "Must-have travel apps that work great with eSIM. From navigation to translation, make the most of your connection." },
    },
    ko: {
      "korea-esim": { title: "한국 eSIM 가이드 2026", desc: "한국에서 eSIM 사용 완벽 가이드. 서울, 부산, 제주 등에서의 고속 5G 연결 추천 플랜." },
      "thailand-esim": { title: "태국 eSIM 가이드 2026", desc: "태국 여행 최고의 eSIM 플랜. 방콕, 푸켓, 치앙마이 커버리지. 즉시 활성화, 합리적인 요금." },
      "usa-esim": { title: "미국 eSIM 가이드 2026", desc: "미국 여행 최고의 eSIM 플랜. 전국 4G/5G 커버리지. 최고 제공업체 비교." },
      "hawaii-esim": { title: "하와이 eSIM 가이드 2026", desc: "하와이 여행 최고의 eSIM 플랜. 오아후, 마우이, 빅아일랜드 커버리지." },
      "iceland-esim": { title: "아이슬란드 eSIM 가이드 2026", desc: "링로드와 레이캬비크, 외곽 드라이브 기준으로 통신 환경을 비교하는 아이슬란드 여행 가이드." },
      "how-to-setup-esim": { title: "eSIM 설정 방법 — iPhone·Android 단계별 가이드", desc: "모든 기기에서 eSIM 설정 완벽 가이드. iPhone 및 Android 단계별 설명." },
      "esim-compatible-phones": { title: "eSIM 호환 스마트폰 목록 2026", desc: "eSIM을 지원하는 스마트폰 전체 목록. 내 기기 호환 여부를 확인하세요." },
      "esim-troubleshooting": { title: "eSIM 연결 안 됨? 문제 해결 가이드", desc: "일반적인 eSIM 문제 해결: 연결 불가, QR 코드 스캔 오류, 서비스 없음, 느린 속도. 단계별 해결책." },
      "first-time-esim": { title: "처음 사용하는 eSIM 완벽 가이드", desc: "eSIM을 처음 사용하시나요? 구매부터 활성화까지 완벽한 초보자 가이드." },
      "save-money-roaming": { title: "eSIM으로 로밍 요금 절약하는 방법", desc: "비싼 통신사 로밍 요금 그만! eSIM으로 전환해 해외 데이터 비용을 절감하세요." },
    },
    zh: {
      "korea-esim": { title: "韩国eSIM指南 2026", desc: "韩国eSIM完全攻略。首尔、釜山、济州岛高速5G连接推荐套餐。" },
      "thailand-esim": { title: "泰国eSIM指南 2026", desc: "泰国旅行最佳eSIM套餐。覆盖曼谷、普吉岛、清迈。即时激活，实惠价格。" },
      "usa-esim": { title: "美国eSIM指南 2026", desc: "美国旅行最佳eSIM套餐。全国4G/5G覆盖。对比顶级服务商。" },
      "hawaii-esim": { title: "夏威夷eSIM指南 2026", desc: "夏威夷旅行最佳eSIM套餐。覆盖欧胡岛、茂宜岛、大岛等夏威夷群岛。" },
      "iceland-esim": { title: "冰岛eSIM指南 2026", desc: "适合环岛公路、雷克雅未克与偏远风景路线的冰岛旅行eSIM对比指南。" },
      "how-to-setup-esim": { title: "eSIM设置方法 — iPhone·Android逐步指南", desc: "任何设备上的eSIM设置完全指南。iPhone和Android分步说明。" },
      "esim-compatible-phones": { title: "eSIM兼容手机列表 2026", desc: "支持eSIM的智能手机完整列表。查看您的手机是否兼容。" },
      "esim-troubleshooting": { title: "eSIM无法连接？故障排除指南", desc: "解决常见eSIM问题：无法连接、二维码无法扫描、无服务、速度慢。逐步解决方案。" },
      "first-time-esim": { title: "初次使用eSIM完整指南", desc: "从未使用过eSIM？这份完整的初学者指南涵盖从购买到激活的一切。" },
      "save-money-roaming": { title: "如何用eSIM避免漫游费", desc: "停止支付昂贵的运营商漫游费。切换到eSIM，节省高达90%的国际数据费用。" },
    },
  };

  const localeData = GUIDE_TITLES[locale] ?? GUIDE_TITLES.en;
  const guideData = extraGuideData ?? localeData[slug] ?? GUIDE_TITLES.en[slug];

  if (!guideData) return null;

  const isJa = locale === "ja";
  const isKo = locale === "ko";
  const isZh = locale === "zh";

  if (locale === "en" && extraGuideDefinition) {
    const isCountry = extraGuideDefinition.category === "country";
    const isReview = slug.endsWith("-review");
    const isComparison =
      slug.startsWith("best-") ||
      slug.includes("-vs-") ||
      slug.includes("fair-use") ||
      slug.includes("phone-number") ||
      slug.includes("regional-");
    const isUseCase = slug.startsWith("esim-for-") || slug.startsWith("travel-");

    const sections = isCountry
      ? [
          {
            heading: `Why ${guideData.title.replace(" 2026", "")} deserves a dedicated comparison`,
            body: `${guideData.desc}\n\nFor country-specific travel eSIM searches, the real question is rarely just "which plan is cheapest?" Travelers usually want to know whether the plan will work on arrival, whether the network is strong enough for maps and ride apps, and whether the package fits the actual trip length instead of looking good only on a pricing table.`,
          },
          {
            heading: "How to choose the right data size and validity",
            body: "The best plan size depends on how you travel inside the destination. A short city break with messaging, maps, restaurant searches, and translation often stays in the lower data ranges. Multi-stop trips, hotspot use, heavier photo uploads, and long travel days usually justify a larger plan.\n\nValidity matters just as much as raw data. A cheaper package can stop looking cheap if it expires halfway through the trip or forces a top-up during the most inconvenient part of the itinerary.",
          },
          {
            heading: "When a local country plan beats a regional option",
            body: "If most of the trip stays inside one country, a dedicated local-style travel eSIM is often easier to price correctly. Regional plans make more sense when you are crossing borders or want one fallback plan across several stops. The simplest way to choose is to look at how fixed your route is: stable single-country trips usually reward local plans, while flexible itineraries reward regional coverage.",
          },
          {
            heading: "Arrival-day mistakes that cause the most friction",
            body: "The most common mistakes are activating too early, underestimating data usage, forgetting to check device compatibility, and assuming every airport or hotel Wi-Fi network will be good enough to fall back on. If arrival logistics matter, travelers should think about the first hour first: immigration, transport, hotel check-in, messaging, and navigation all put more pressure on connectivity than a pricing table suggests.",
          },
          {
            heading: "What changes if you need hotspot, backup internet, or remote work",
            body: "Trips that involve tethering to a laptop, uploading work files, or relying on backup connectivity need more than a basic sightseeing plan. In those cases, hotspot support, realistic throttling behavior, and how easy it is to recover setup instructions after purchase become more important than the lowest headline price.\n\nThat is why country guides should not only list plans, but also help the traveler understand whether the destination is being used for a city break, a work trip, a road trip, or a more remote itinerary.",
          },
          {
            heading: "How to avoid overbuying or underbuying on destination pages",
            body: "Many travelers lose money by solving the wrong problem. They either buy too much data for a short, light-usage trip, or they buy too little for an itinerary that clearly includes hotspot use, heavy transfers, and long mobile-only days. A better rule is to match the plan to the highest-stress part of the trip instead of the average day.\n\nIf one airport arrival, one long rail day, or one rural transfer could disrupt the whole itinerary, it is usually worth buying enough validity and data to cover that moment comfortably rather than gambling on the cheapest package.",
          },
          {
            heading: "How to narrow down faster before buying",
            body: "A practical shortlist starts with four checks: route, trip length, expected data appetite, and whether the trip depends on hotspot or backup connectivity. Once those are clear, it becomes much easier to decide whether this destination needs a small short-stay plan, a larger country package, or a regional option instead.\n\nAutoWiFi Travel is structured to make that narrowing-down process easier by linking this destination guide with setup articles, regional comparison pages, and country plan pages rather than leaving the traveler with one isolated overview.",
          },
          {
            heading: "What to prepare before departure if this is your first eSIM for this destination",
            body: "If this is your first time using a travel eSIM for this route, the safest preparation is simple: confirm device support, install before departure if the plan allows it, keep a copy of the QR or order details, and know whether the plan starts on installation or first connection. Those small checks remove most of the panic travelers feel when they land and need data immediately.\n\nThe more time-sensitive the arrival is, the more valuable that preparation becomes. Airport transfers, hotel check-ins, rail connections, and support messages are all much easier when the traveler has already solved the setup side before the trip begins.",
          },
        ]
      : isReview
      ? [
          {
            heading: `What travelers actually want from a ${guideData.title.replace(" 2026", "")} review`,
            body: `${guideData.desc}\n\nReview searches are rarely just about curiosity. Most travelers are trying to decide whether this service is reliable enough to trust on an active trip, whether the app and setup flow feel simple, and whether there are obvious trade-offs around speed, hotspot rules, pricing clarity, or support after purchase.`,
          },
          {
            heading: "Where a provider like this can work well",
            body: "A review is most useful when it explains the trip types the provider fits best. Some services are better for short city trips, some for broader regional travel, and others for travelers who value app polish over the absolute lowest price. Looking at the fit by trip style usually tells you more than looking at brand familiarity alone.",
          },
          {
            heading: "Where the service can fall short",
            body: "Travelers should also expect review pages to be honest about the limits. Common weak points include unclear fair-use behavior, weaker value on high-data trips, confusing activation timing, or less attractive pricing once you compare the validity period and data size side by side.\n\nA useful review should make those trade-offs visible before purchase instead of letting the traveler discover them during the trip.",
          },
          {
            heading: "What to compare before making a decision",
            body: "The best comparison points are not just price and destination coverage. Travelers should also compare hotspot support, setup recovery, whether the plan is data-only, how quickly the service is likely to help when something goes wrong, and whether a country-specific alternative fits the route better.",
          },
          {
            heading: "Who this type of service fits best",
            body: "Some providers are better for convenience-first travelers who want a smooth purchase and setup experience. Others fit budget-led buyers who are willing to optimize more aggressively. A review page becomes more valuable when it helps the reader self-identify instead of pretending one service is universally best.",
          },
          {
            heading: "How to use the review without over-trusting it",
            body: "The safest way to use a review is as a shortlist tool. Use it to understand the strengths, spot the weak points, and then compare that provider against a country guide, a regional comparison, and a setup-related article before buying. That approach is much stronger than treating any single review as the whole answer.",
          },
        ]
      : [
          {
            heading: `What ${guideData.title.replace(" 2026", "")} means in real trip planning`,
            body: `${guideData.desc}\n\nSearches like this usually happen close to the buying decision. The traveler is trying to reduce uncertainty: what matters most, what can be ignored, and which mistakes would be annoying enough to damage the trip. That means the article needs to answer the decision, not just define the term.`,
          },
          {
            heading: "The variables that actually change the answer",
            body: "The right choice usually depends on trip length, number of destinations, expected data use, hotspot needs, and how much arrival-day friction the traveler can tolerate. Two plans that look similar on price can behave very differently once validity, throttling, tethering, or recovery after setup are factored in.",
          },
          {
            heading: "Common mistakes travelers make with this topic",
            body: "The biggest mistake is optimizing too early around one variable, usually price. Travelers also get stuck when they assume hotel Wi-Fi, airport SIM counters, or roaming passes will be good enough backups without checking how those options behave under real arrival conditions.\n\nA better decision usually comes from looking at the trip sequence first and the plan labels second.",
          },
          {
            heading: "When this matters most by trip type",
            body: isUseCase
              ? "This topic becomes more important when the trip style changes the stakes. Solo travel, family travel, business arrivals, study abroad, backpacking, and longer stays each shift what counts as a good eSIM choice. A plan that works well for a weekend city break may be a poor fit for a work trip or a multi-stop route."
              : isComparison
              ? "This topic matters most when the traveler is comparing two valid options that solve different kinds of pain. One side may win on convenience, another on cost control, and another on flexibility across multiple stops. The article should help the traveler understand which trade-off is worth paying for."
              : "This topic matters most when the traveler needs fewer surprises during the trip. The closer the trip gets to departure, the more useful it becomes to replace vague assumptions with a concrete decision framework around data, validity, and setup risk.",
          },
          {
            heading: "A better way to make the decision before buying",
            body: "A practical approach is to make the decision in order: route, trip length, likely data appetite, whether a phone number or hotspot is required, and what the fallback plan is if setup goes wrong. That sequence prevents many of the mistakes that come from comparing products too early and context too late.",
          },
          {
            heading: "What the best version of this decision looks like on the ground",
            body: "The strongest travel eSIM decision is the one that still feels right during the messy parts of the trip: a late arrival, a missed transfer, a hotel with weak Wi-Fi, a need to contact support, or a sudden change in route. Articles like this should therefore help travelers think beyond the purchase moment and toward the part of the trip where the wrong assumption becomes expensive.\n\nThat is also why deeper articles tend to perform better: they answer the practical question behind the keyword instead of just repeating the keyword itself.",
          },
          {
            heading: "How this article should connect to the next step",
            body: "Good travel eSIM content should not stop at explanation. It should bridge into country pages, setup help, and adjacent comparison guides so the traveler can keep narrowing down without restarting the research. That is the role these articles play inside AutoWiFi Travel: they turn a broad query into a shortlist that is easier to act on.",
          },
          {
            heading: "A last pre-purchase checklist for travelers using this guide",
            body: "Before leaving the page, a traveler should be able to answer five questions clearly: what the trip route is, how many days need coverage, how much data is realistically required, whether hotspot or a phone number matters, and what backup plan exists if setup fails. If the article does not help answer those questions, it is not yet doing enough useful work.\n\nThat is the standard worth aiming for on travel eSIM content. Strong articles reduce uncertainty, shorten the decision, and leave the traveler with fewer avoidable surprises after payment.",
          },
          ...(slug === "esim-hotspot-tethering"
            ? [
                {
                  heading: "When hotspot rules matter more than the plan label",
                  body: "Hotspot support becomes a real decision factor when the phone is expected to carry more than phone-only travel tasks. A traveler may need to tether a laptop at the station, upload photos from a hotel with weak Wi-Fi, share backup data with a second device, or keep a route running across multiple screens during transfers. In those scenarios, a plan that technically works on the handset can still be the wrong choice if tethering is blocked or restricted enough to make the fallback useless.\n\nThat is why hotspot guidance should not be treated like a small technical footnote. It changes the kind of plan a traveler needs, especially on business trips, family trips, long rail days, and any itinerary where the phone may need to act as the backup connection for something more important than casual browsing.",
                },
              ]
            : []),
          ...(slug === "how-much-data-do-i-need-for-travel"
            ? [
                {
                  heading: "A more realistic way to estimate travel data",
                  body: "A better travel estimate starts by splitting the trip into light, medium, and heavy days. Light days are mostly maps, messaging, translation, and ride-hailing. Medium days add more social uploads, hotel research, and constant background syncing. Heavy days are the ones with hotspot use, video calls, cloud backups, long airport waits, or train transfers where the phone becomes the main connection for everything.\n\nThat framing is more useful than chasing one universal number because many trips contain a few heavy days that completely change the right package size. A traveler might use very little data most of the week and still regret buying too small a plan because one work session, one transfer day, or one content-heavy day pushed the total far above the average.",
                },
              ]
            : []),
          ...(slug === "esim-vs-airport-sim"
            ? [
                {
                  heading: "Why this comparison changes once you actually land",
                  body: "The airport-SIM-versus-eSIM decision often feels different when the traveler is making it in real time after a flight. Queueing at a kiosk, dealing with unfamiliar pricing, relying on uncertain airport Wi-Fi, or solving connectivity while tired and carrying luggage can easily outweigh a small difference in headline cost. That is especially true for late-night arrivals, tight transfers, and trips where the first hour depends on maps, rail apps, ride-hailing, or messaging the accommodation.\n\nThat is why this keyword is not just a price comparison. It is really a friction comparison. The better choice is usually the one that removes more uncertainty from the exact part of the trip where connectivity matters first, not the one that merely looks cheaper in theory.",
                },
              ]
            : []),
        ];

    const faq = isCountry
      ? [
          {
            q: "How much data is usually enough for this destination?",
            a: "Maps, messaging, translation, and everyday planning often fit within moderate data sizes, while hotspot use, heavy uploads, and remote work usually need a larger package. Matching the plan to the real trip style matters more than chasing the cheapest headline price.",
          },
          {
            q: "Should I buy a country plan or a regional eSIM instead?",
            a: "If you are mostly staying in one destination, a country-specific plan is often simpler and easier to price. If the route crosses borders or may still change, a regional plan can reduce friction.",
          },
          {
            q: "What should I check before departure?",
            a: "Check device compatibility, activation timing, validity, likely data usage, and whether you need hotspot support. Those details usually matter more than small price differences.",
          },
          {
            q: "Why are arrival-day use cases so important?",
            a: "Because the first hour after landing often includes maps, transport, hotel check-in, and time-sensitive communication. That is when weak fallback assumptions hurt the most.",
          },
        ]
      : [
          {
            q: "Is there a minimum word count Google expects for articles like this?",
            a: "No fixed minimum is published. What matters is whether the page satisfies the search intent with enough depth, clarity, and original value to help a real traveler make a decision.",
          },
          {
            q: "What should a stronger travel eSIM article include?",
            a: "It should explain the decision clearly, show the main trade-offs, call out common mistakes, and connect the reader to the next practical step such as country pages, setup guidance, or a closer comparison.",
          },
          {
            q: "Why are these topics often harder than they look?",
            a: "Because travelers are not just choosing a product. They are choosing how much uncertainty they want during arrival, transit, and daily movement. That makes context more important than headline pricing.",
          },
          {
            q: "What makes content here more trustworthy over time?",
            a: "Clear authorship, transparent editorial pages, honest trade-off explanations, and practical decision frameworks all help. Adding real traveler notes and tested examples makes it even stronger.",
          },
          {
            q: "What would make these articles even stronger than they are now?",
            a: "First-hand traveler notes, route-specific examples, screenshots from real setup flows, and support edge cases all add originality. Structural depth helps, but real-world detail is what turns a useful article into a distinctive one.",
          },
        ];

    return {
      title: guideData.title,
      description: guideData.desc,
      sections,
      faq,
      ctaTitle: "Compare travel eSIM options with more context",
      ctaButton: "View eSIM Plans",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    };
  }

  return {
    title: guideData.title,
    description: guideData.desc,
    sections: [
      {
        heading: isJa ? "概要" : isKo ? "개요" : isZh ? "概述" : "Overview",
        body: guideData.desc,
      },
      {
        heading: isJa ? "おすすめeSIMプランの選び方" : isKo ? "추천 eSIM 플랜 선택 방법" : isZh ? "如何选择推荐eSIM套餐" : "How to Choose the Right eSIM Plan",
        body: isJa
          ? "渡航先に合ったeSIMプランを選ぶ際は、データ容量・有効期間・カバレッジネットワークの3つを確認しましょう。短期旅行なら3〜7日プラン、長期滞在なら30日以上のプランが経済的です。"
          : isKo
          ? "목적지에 맞는 eSIM 플랜을 선택할 때는 데이터 용량, 유효기간, 커버리지 네트워크 3가지를 확인하세요. 단기 여행은 3~7일 플랜, 장기 체류는 30일 이상 플랜이 경제적입니다."
          : isZh
          ? "选择适合目的地的eSIM套餐时，请确认数据量、有效期和覆盖网络三项。短途旅行选3-7天套餐，长期逗留选30天以上套餐更划算。"
          : "When selecting an eSIM plan for your destination, check three things: data allowance, validity period, and carrier network. Short trips do well with 3-7 day plans; extended stays benefit from 30-day or monthly plans.",
      },
      {
        heading: isJa ? "eSIMの設定手順" : isKo ? "eSIM 설정 단계" : isZh ? "eSIM设置步骤" : "eSIM Setup Steps",
        body: isJa
          ? "1. AutoWiFi eSIMでプランを購入\n2. メールでQRコードを受け取る\n3. iPhoneは「設定 > モバイル通信 > eSIM追加」、Androidは「設定 > 接続 > SIMカード管理」へ\n4. QRコードをスキャン\n5. 現地到着後にデータ通信をONにする"
          : isKo
          ? "1. AutoWiFi eSIM에서 플랜 구매\n2. 이메일로 QR 코드 수령\n3. iPhone: 설정 > 셀룰러 > eSIM 추가, Android: 설정 > 연결 > SIM 관리자\n4. QR 코드 스캔\n5. 현지 도착 후 데이터 로밍 활성화"
          : isZh
          ? "1. 在AutoWiFi eSIM购买套餐\n2. 通过邮件收到二维码\n3. iPhone: 设置 > 蜂窝网络 > 添加eSIM；Android: 设置 > 连接 > SIM卡管理\n4. 扫描二维码\n5. 抵达目的地后开启数据漫游"
          : "1. Purchase your plan on AutoWiFi eSIM\n2. Receive QR code by email\n3. iPhone: Settings > Cellular > Add eSIM; Android: Settings > Connections > SIM Manager\n4. Scan the QR code\n5. Enable data when you arrive",
      },
    ],
    faq: [
      {
        q: isJa ? "eSIMはどのスマートフォンで使えますか？" : isKo ? "eSIM은 어떤 스마트폰에서 사용 가능한가요?" : isZh ? "哪些智能手机支持eSIM？" : "Which smartphones support eSIM?",
        a: isJa ? "iPhone XS以降、Samsung Galaxy S20以降、Google Pixel 3以降など、2018年以降に発売された多くのスマートフォンがeSIMに対応しています。" : isKo ? "iPhone XS 이후, Samsung Galaxy S20 이후, Google Pixel 3 이후 등 2018년 이후 출시된 대부분의 스마트폰이 eSIM을 지원합니다." : isZh ? "iPhone XS及以后、Samsung Galaxy S20及以后、Google Pixel 3及以后等2018年后发布的大多数智能手机均支持eSIM。" : "iPhone XS and later, Samsung Galaxy S20 and later, Google Pixel 3 and later, and most smartphones released since 2018 support eSIM.",
      },
      {
        q: isJa ? "eSIMは購入後すぐに使えますか？" : isKo ? "eSIM은 구매 후 바로 사용할 수 있나요?" : isZh ? "购买eSIM后可以立即使用吗？" : "Can I use eSIM immediately after purchase?",
        a: isJa ? "はい、QRコードを受け取り次第すぐに設定できます。ただし、データの有効期間を最大限活用するため、目的地到着後に通信を有効化することをおすすめします。" : isKo ? "네, QR 코드를 받는 즉시 설정할 수 있습니다. 단, 플랜 유효 기간을 최대한 활용하려면 목적지 도착 후 데이터를 활성화하는 것을 권장합니다." : isZh ? "是的，收到二维码后即可立即设置。但为了充分利用套餐有效期，建议在抵达目的地后再开启数据。" : "Yes, you can set it up as soon as you receive the QR code. However, we recommend enabling data after you arrive at your destination to maximize your plan validity.",
      },
    ],
    ctaTitle: isJa ? "AutoWiFi eSIMでつながろう" : isKo ? "AutoWiFi eSIM으로 연결하세요" : isZh ? "使用AutoWiFi eSIM保持连接" : "Stay Connected with AutoWiFi eSIM",
    ctaButton: isJa ? "eSIMプランを見る" : isKo ? "eSIM 플랜 보기" : isZh ? "查看eSIM套餐" : "View eSIM Plans",
    breadcrumbGuide: isJa ? "ガイド" : isKo ? "가이드" : isZh ? "指南" : "Guides",
    breadcrumbHome: isJa ? "ホーム" : isKo ? "홈" : isZh ? "首页" : "Home",
  };
}

export async function generateStaticParams() {
  const slugs = Array.from(new Set([
    "korea-esim", "thailand-esim", "usa-esim", "uk-esim", "france-esim",
    "italy-esim", "spain-esim", "germany-esim", "australia-esim", "singapore-esim",
    "taiwan-esim", "vietnam-esim", "indonesia-esim", "malaysia-esim", "philippines-esim",
    "china-esim", "canada-esim", "turkey-esim", "india-esim", "hawaii-esim",
    "guam-esim", "hong-kong-esim", "dubai-esim", "europe-esim", "cambodia-esim",
    "greece-esim", "mexico-esim", "new-zealand-esim", "norway-esim", "portugal-esim",
    "switzerland-esim", "morocco-esim", "how-to-setup-esim", "esim-compatible-phones",
    "esim-troubleshooting", "esim-vs-sim-card", "esim-for-business-travel", "first-time-esim",
    "esim-data-plans-explained", "travel-internet-options", "dual-sim-esim", "esim-for-students",
    "esim-long-term-travel", "save-money-roaming", "asia-travel-connectivity",
    "europe-travel-connectivity", "best-esim-providers", "travel-data-usage-tips",
    "international-calling-esim", "cruise-travel-esim", "digital-nomad-esim",
    "family-travel-esim", "esim-prepaid-vs-postpaid", "esim-security-tips",
    "airport-connectivity-guide", "esim-activation-timing", "travel-apps-esim",
    ...MINOR_TRAVEL_GUIDE_SLUGS,
    ...SEO_PROGRAM_SLUGS,
    ...EXTRA_GUIDE_SLUGS,
  ]));
  return SUPPORTED_LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  // Try specific content first, then generic
  const priority = getPriorityGuideContent(slug, locale as GuideLocale);
  const specific = GUIDE_CONTENT[slug]?.[locale] ?? GUIDE_CONTENT[slug]?.en;
  const generic = getGenericContent(slug, locale);
  const programContent =
    !priority && !specific && generic
      ? buildSeoProgramContent({
          slug,
          locale: locale as GuideLocale,
          title: generic.title,
          description: generic.description,
        })
      : null;
  const program =
    !priority && !specific && generic && programContent
      ? {
          ...generic,
          ...programContent,
        }
      : null;
  const content = priority ?? specific ?? program ?? generic;
  const contentSource = priority
    ? "priority"
    : specific
      ? "specific"
      : program
        ? "program"
        : "generic";

  if (!content) return {};

  const baseUrl = getBaseUrl();
  const ogImage = content.heroImage
    ? getGuideImageUrl(content.heroImage.src, { absolute: true, baseUrl })
    : undefined;

  return generatePageMetadata({
    locale: locale as Locale,
    path: `/guide/${slug}`,
    title: content.title,
    description: content.description,
    ogImage,
  });
}

function renderGuideImage(image: GuideMediaImage, priority = false) {
  const imageSrc = getGuideImageUrl(image.src);
  const shouldBypassOptimization = shouldProxyGuideImage(image.src) || /^https?:\/\//.test(image.src);

  return (
    <figure
      key={`${image.src}-${image.alt}`}
      style={{ margin: 0, background: "#fff", border: "1px solid #e5e7eb", borderRadius: "1rem", overflow: "hidden" }}
    >
      <Image
        src={imageSrc}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        unoptimized={shouldBypassOptimization}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
      {(image.caption || image.creditLabel) && (
        <figcaption style={{ padding: "0.85rem 1rem 1rem", fontSize: "0.9rem", lineHeight: 1.6, color: "#4b5563" }}>
          {image.caption && <span>{image.caption}</span>}
          {image.creditLabel && (
            <>
              {image.caption ? <span> </span> : null}
              {image.creditUrl ? (
                <a href={image.creditUrl} target="_blank" rel="noreferrer" style={{ color: "#0369a1" }}>
                  {image.creditLabel}
                </a>
              ) : (
                <span>{image.creditLabel}</span>
              )}
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Try specific content first, then generic
  const priority = getPriorityGuideContent(slug, locale as GuideLocale);
  const specific = GUIDE_CONTENT[slug]?.[locale] ?? GUIDE_CONTENT[slug]?.en;
  const generic = getGenericContent(slug, locale);
  const programContent =
    !priority && !specific && generic
      ? buildSeoProgramContent({
          slug,
          locale: locale as GuideLocale,
          title: generic.title,
          description: generic.description,
        })
      : null;
  const program =
    !priority && !specific && generic && programContent
      ? {
          ...generic,
          ...programContent,
        }
      : null;
  const content = priority ?? specific ?? program ?? generic;
  const contentSource = priority
    ? "priority"
    : specific
      ? "specific"
      : program
        ? "program"
        : "generic";

  if (!content) notFound();

  const BASE_URL = getBaseUrl();
  const articleUrl = `${BASE_URL}/${locale}/guide/${slug}`;
  const articleImageUrl = content.heroImage
    ? getGuideImageUrl(content.heroImage.src, { absolute: true, baseUrl: BASE_URL })
    : getDefaultOgImageUrl(BASE_URL);
  const isMinorTravelGuide = MINOR_TRAVEL_GUIDE_SLUGS.includes(
    slug as (typeof MINOR_TRAVEL_GUIDE_SLUGS)[number]
  );
  const hubLabels = MINOR_TRAVEL_HUB_LABELS[locale] ?? MINOR_TRAVEL_HUB_LABELS.en;
  const ctaHref = GUIDE_TO_COUNTRY[slug] ? `/${locale}/esim/${GUIDE_TO_COUNTRY[slug]}` : `/${locale}/esim`;

  const dates = resolveGuideDates(contentSource, slug, content);
  const relatedSlugs =
    PRIORITY_GUIDE_RELATED[slug] ??
    RELATED_GUIDES[slug] ??
    getSeoProgramRelatedSlugs(slug);

  return (
    <article style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1rem" }}>
      <ArticleJsonLd
        title={content.title}
        description={content.description}
        url={articleUrl}
        image={articleImageUrl}
        locale={locale}
        datePublished={dates.published}
        dateModified={dates.modified}
        authorName="AutoWiFi Travel Editorial Team"
        authorUrl={getAuthorProfileUrl(locale as Locale)}
        articleSection={
          isMinorTravelGuide
            ? (MINOR_TRAVEL_JSONLD_SECTION[locale] ?? MINOR_TRAVEL_JSONLD_SECTION.en)
            : "Travel eSIM Guide"
        }
        aboutName={
          isMinorTravelGuide
            ? (MINOR_TRAVEL_JSONLD_ABOUT[locale] ?? MINOR_TRAVEL_JSONLD_ABOUT.en)
            : "Travel eSIM"
        }
      />
      <FaqJsonLd items={content.faq.map((item) => ({ question: item.q, answer: item.a }))} />
      <BreadcrumbJsonLd
        items={[
          { name: content.breadcrumbHome, url: `${BASE_URL}/${locale}` },
          { name: content.breadcrumbGuide, url: `${BASE_URL}/${locale}/guide` },
          { name: content.title, url: articleUrl },
        ]}
      />

      {/* Breadcrumb */}
      <nav style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>
        <Link href={`/${locale}`}>{content.breadcrumbHome}</Link>
        <span style={{ margin: "0 0.5rem" }}>/</span>
        <Link href={`/${locale}/guide`}>{content.breadcrumbGuide}</Link>
        <span style={{ margin: "0 0.5rem" }}>/</span>
        <span>{content.title}</span>
      </nav>

      {/* Hero */}
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }}>
          {content.title}
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#4b5563", lineHeight: 1.7 }}>{content.description}</p>
        <time dateTime={dates.modified} style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.5rem", display: "block" }}>
          {DATE_LABELS[locale] || DATE_LABELS.en}: {dates.modified}
        </time>
      </header>

      <ContentTrustPanel locale={locale as Locale} updatedAt={dates.modified} />

      {content.heroImage ? (
        <section style={{ marginBottom: "2rem" }}>
          {renderGuideImage(content.heroImage, true)}
        </section>
      ) : null}

      {content.gallery?.length ? (
        <section style={{ marginBottom: "2.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {content.gallery.map((image) => renderGuideImage(image))}
          </div>
        </section>
      ) : null}

      {/* Sections */}
      {content.sections.map((section, i) => (
        <section key={i} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.375rem", fontWeight: 600, marginBottom: "0.75rem", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.5rem" }}>
            {section.heading}
          </h2>
          <p style={{ lineHeight: 1.8, color: "#374151", whiteSpace: "pre-line" }}>{section.body}</p>
        </section>
      ))}

      {content.xEmbeds?.length ? (
        <section style={{ marginBottom: "2.5rem", padding: "1.25rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: "1.375rem", fontWeight: 600, marginBottom: "0.75rem" }}>
            {content.xSectionTitle ?? X_SECTION_LABELS[locale] ?? X_SECTION_LABELS.en}
          </h2>
          {content.xSectionDescription ? (
            <p style={{ marginBottom: "1rem", lineHeight: 1.8, color: "#4b5563" }}>
              {content.xSectionDescription}
            </p>
          ) : null}
          <XEmbeddedPosts embeds={content.xEmbeds} />
        </section>
      ) : null}

      {/* FAQ */}
      {content.faq.length > 0 && (
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.375rem", fontWeight: 600, marginBottom: "1rem" }}>
            {locale === "ja" ? "よくある質問" : locale === "ko" ? "자주 묻는 질문" : locale === "zh" ? "常见问题" : "Frequently Asked Questions"}
          </h2>
          {content.faq.map((item, i) => (
            <details key={i} style={{ marginBottom: "1rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", padding: "1rem" }}>
              <summary style={{ fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>{item.q}</summary>
              <p style={{ marginTop: "0.75rem", lineHeight: 1.7, color: "#374151" }}>{item.a}</p>
            </details>
          ))}
        </section>
      )}

      {/* Country eSIM link */}
      {GUIDE_TO_COUNTRY[slug] && (
        <section style={{ marginBottom: "2rem", padding: "1.25rem", background: "#f0f9ff", borderRadius: "0.75rem", border: "1px solid #bae6fd" }}>
          <Link
            href={`/${locale}/esim/${GUIDE_TO_COUNTRY[slug]}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", color: "#0369a1", fontWeight: 600, fontSize: "1rem" }}
          >
            <span>{(VIEW_PLANS_LABELS[locale] || VIEW_PLANS_LABELS.en)(content.title.split(" eSIM")[0].split("eSIM")[0].trim())}</span>
            <span style={{ fontSize: "1.25rem" }}>→</span>
          </Link>
        </section>
      )}

      {/* Related guides */}
      {relatedSlugs.length > 0 && (
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.375rem", fontWeight: 600, marginBottom: "1rem" }}>
            {RELATED_LABELS[locale] || RELATED_LABELS.en}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "0.75rem" }}>
            {relatedSlugs.map((relSlug) => {
              const relContent =
                getPriorityGuideContent(relSlug, locale as GuideLocale) ??
                GUIDE_CONTENT[relSlug]?.[locale] ??
                GUIDE_CONTENT[relSlug]?.en ??
                getGenericContent(relSlug, locale) ??
                getGenericContent(relSlug, "en");
              if (!relContent) return null;
              return (
                <Link
                  key={relSlug}
                  href={`/${locale}/guide/${relSlug}`}
                  style={{ display: "block", padding: "1rem", background: "#f9fafb", borderRadius: "0.5rem", border: "1px solid #e5e7eb", textDecoration: "none", color: "#1f2937", fontWeight: 500, fontSize: "0.95rem" }}
                >
                  {relContent.title} →
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {isMinorTravelGuide ? (
        <section style={{ marginBottom: "2rem", padding: "1.25rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem" }}>
            {hubLabels.title}
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.8, color: "#4b5563" }}>
            {hubLabels.desc}
          </p>
          <Link
            href={`/${locale}/guide/minor-travel-guides`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", textDecoration: "none", color: "#0369a1", fontWeight: 700 }}
          >
            <span>{hubLabels.title}</span>
            <span>→</span>
          </Link>
        </section>
      ) : null}

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #0ea5e9, #0369a1)", borderRadius: "1rem", padding: "2rem", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>{content.ctaTitle}</h2>
        <p style={{ marginBottom: "1.25rem", opacity: 0.9 }}>{content.description.slice(0, 100)}...</p>
        <Link
          href={ctaHref}
          style={{ display: "inline-block", background: "#fff", color: "#0369a1", fontWeight: 700, padding: "0.75rem 2rem", borderRadius: "2rem", textDecoration: "none", fontSize: "1rem" }}
        >
          {content.ctaButton} →
        </Link>
      </section>
    </article>
  );
}
