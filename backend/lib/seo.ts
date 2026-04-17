import type { Metadata } from 'next';
import { LOCALES, type Locale } from '@/lib/i18n/config';

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? 'https://autowifi-travel.com';
}

/**
 * Truncate a long intro/description to a meta-description-friendly length
 * without cutting in the middle of a word. Prefers a sentence boundary
 * (. ? ! 。 ？ ！) near `maxLen`; falls back to the last space (or CJK
 * character boundary) before `maxLen`; appends a single-char ellipsis
 * when content was actually truncated.
 */
export function truncateAtSentence(text: string, maxLen = 155): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLen) return normalized;

  // Try to cut at the last sentence boundary within maxLen
  const window = normalized.slice(0, maxLen);
  const sentenceMatch = window.match(/^[\s\S]*[.!?。？！](?=\s|$)/);
  if (sentenceMatch && sentenceMatch[0].length >= Math.floor(maxLen * 0.6)) {
    return sentenceMatch[0].trim();
  }

  // Fall back to last space boundary (ASCII languages)
  const lastSpace = window.lastIndexOf(' ');
  if (lastSpace >= Math.floor(maxLen * 0.6)) {
    return window.slice(0, lastSpace).trim() + '…';
  }

  // CJK / no-space languages: cut at maxLen and add ellipsis
  return window.trim() + '…';
}

export const DEFAULT_OG_IMAGE_PATH = '/og-default.png';

export function getDefaultOgImageUrl(baseUrl: string = getBaseUrl()): string {
  return `${baseUrl}${DEFAULT_OG_IMAGE_PATH}`;
}

export function getGuideOgImageUrl({
  baseUrl = getBaseUrl(),
  locale,
  path,
  title,
  description,
  kindLabel = "Travel Article",
  footerLabel,
  theme,
}: {
  baseUrl?: string;
  locale: Locale;
  path: string;
  title: string;
  description: string;
  kindLabel?: string;
  footerLabel?: string;
  theme?: string;
}): string {
  const slug = path.split("/").filter(Boolean).pop() ?? "guide";
  const params = new URLSearchParams({
    locale,
    slug,
    title,
    description,
    kindLabel,
    footerLabel: footerLabel ?? slug,
  });
  if (theme) {
    params.set("theme", theme);
  }
  return `${baseUrl}/api/og/guide?${params.toString()}`;
}

function formatGuideFooterLabel(slug: string): string {
  const tokenMap: Record<string, string> = {
    esim: "eSIM",
    wifi: "Wi-Fi",
    uk: "UK",
    usa: "USA",
    eu: "EU",
    qr: "QR",
    ios: "iOS",
    android: "Android",
    "5g": "5G",
    x: "X",
    ai: "AI",
  };

  return slug
    .split("-")
    .map((token) => tokenMap[token.toLowerCase()] ?? `${token.charAt(0).toUpperCase()}${token.slice(1)}`)
    .join(" ");
}

function inferGuideOgPresentation(path: string, title: string) {
  const slug = path.split("/").filter(Boolean).pop() ?? "guide";
  const lowerSlug = slug.toLowerCase();
  const lowerTitle = title.toLowerCase();

  const isReview =
    lowerSlug.endsWith("-review") || lowerSlug.includes("-review-");
  const isComparison =
    lowerSlug.includes("-vs-") ||
    lowerSlug.startsWith("best-") ||
    lowerSlug.startsWith("cheapest-") ||
    lowerSlug.includes("compare") ||
    lowerSlug.includes("comparison");
  const isHowTo =
    lowerSlug.includes("setup") ||
    lowerSlug.includes("compatible") ||
    lowerSlug.includes("troubleshooting") ||
    lowerSlug.includes("activation") ||
    lowerSlug.includes("security");
  const isMinorTravel =
    lowerSlug.includes("walk") ||
    lowerSlug.includes("neighborhood") ||
    lowerSlug.includes("tram") ||
    lowerSlug.includes("day-trip") ||
    lowerSlug.includes("side-streets");
  const isCountryGuide =
    lowerSlug.endsWith("-esim") &&
    !lowerSlug.startsWith("esim-") &&
    !lowerSlug.includes("international-esim") &&
    !lowerSlug.includes("global-esim") &&
    !lowerSlug.includes("digital-nomad-esim") &&
    !lowerSlug.includes("family-travel-esim") &&
    !lowerSlug.includes("cruise-travel-esim") &&
    !lowerSlug.includes("travel-esim-with-phone-number") &&
    !lowerSlug.includes("esim-for-") &&
    !lowerSlug.includes("best-esim-") &&
    !lowerSlug.includes("cheapest-esim-");

  if (isReview) {
    return {
      kindLabel: "Provider Review",
      footerLabel: formatGuideFooterLabel(slug),
      theme: "review",
    };
  }

  if (isComparison) {
    return {
      kindLabel: "Comparison Guide",
      footerLabel: formatGuideFooterLabel(slug),
      theme: "comparison",
    };
  }

  if (isHowTo) {
    return {
      kindLabel: "How-To Guide",
      footerLabel: formatGuideFooterLabel(slug),
      theme: "howto",
    };
  }

  if (isMinorTravel) {
    return {
      kindLabel: "Minor Travel Guide",
      footerLabel: formatGuideFooterLabel(slug),
      theme: "travel",
    };
  }

  if (isCountryGuide || lowerTitle.includes(" eSIM guide")) {
    return {
      kindLabel: "Country eSIM Guide",
      footerLabel: formatGuideFooterLabel(slug),
      theme: "country",
    };
  }

  return {
    kindLabel: "Travel Guide",
    footerLabel: formatGuideFooterLabel(slug),
    theme: "travel",
  };
}

interface PageMetadataOptions {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  ogImage?: string;
  openGraphType?: "website" | "article";
  noIndex?: boolean;
}

/**
 * Build a fully-populated Next.js Metadata object with Open Graph tags
 * and hreflang alternate links for every supported locale.
 */
export function generatePageMetadata({
  title,
  description,
  locale,
  path,
  ogImage,
  openGraphType,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/${locale}${path}`;
  const inferredOpenGraphType =
    openGraphType ??
    (path.startsWith("/guide/") && path !== "/guide/minor-travel-guides"
      ? "article"
      : "website");
  const image =
    ogImage ??
    (inferredOpenGraphType === "article"
      ? getGuideOgImageUrl({
          baseUrl,
          locale,
          path,
          title,
          description,
          ...inferGuideOgPresentation(path, title),
        })
      : getDefaultOgImageUrl(baseUrl));

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${baseUrl}/${loc}${path}`;
  }
  // x-default points to the English version
  languages['x-default'] = `${baseUrl}/en${path}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'AutoWifi Travel eSIM',
      locale: localeToOg(locale),
      type: inferredOpenGraphType,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Autowifi_travel',
      creator: '@Autowifi_travel',
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Map our short locale codes to the BCP-47 values Open Graph expects.
 */
function localeToOg(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: 'en_US',
    ja: 'ja_JP',
    ko: 'ko_KR',
    zh: 'zh_CN',
  };
  return map[locale];
}

/**
 * Replace `{{key}}` placeholders in a template string.
 */
export function interpolate(
  template: string,
  values: Record<string, string>,
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value),
    template,
  );
}
