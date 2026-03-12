import type { Metadata } from 'next';
import { LOCALES, type Locale } from '@/lib/i18n/config';

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.autowifi.travel';
}

interface PageMetadataOptions {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  ogImage?: string;
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
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/${locale}${path}`;
  const image = ogImage ?? `${baseUrl}/og-default.png`;

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
      type: 'website',
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
