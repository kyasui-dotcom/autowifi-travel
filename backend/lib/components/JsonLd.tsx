import React from 'react';
import { getBaseUrl } from '@/lib/seo';

const DEFAULT_PRICE_VALID_UNTIL = '2027-12-31';

// ── Generic renderer ────────────────────────────────────────

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

/**
 * Render a JSON-LD `<script>` tag. This is a React Server Component;
 * it outputs no client JS.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Product JSON-LD (for eSIM packages) ─────────────────────

interface ProductJsonLdProps {
  name: string;
  description: string;
  image?: string | string[];
  sku: string;
  priceCurrency: string;
  price: number;
  availability?: 'InStock' | 'OutOfStock';
  seller?: string;
  url: string;
  brand?: string;
  mpn?: string;
  priceValidUntil?: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  sku,
  priceCurrency,
  price,
  availability = 'InStock',
  seller,
  url,
  brand,
  mpn,
  priceValidUntil,
}: ProductJsonLdProps) {
  const baseUrl = getBaseUrl();
  const normalizedImage = image ?? `${baseUrl}/opengraph-image`;
  const resolvedBrand = brand ?? seller ?? 'AutoWiFi Travel';
  const resolvedPriceValidUntil = priceValidUntil ?? DEFAULT_PRICE_VALID_UNTIL;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku,
    mpn: mpn ?? sku,
    brand: {
      '@type': 'Brand',
      name: resolvedBrand,
    },
    category: 'Travel eSIM',
    image: normalizedImage,
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency,
      price: price.toFixed(2),
      priceValidUntil: resolvedPriceValidUntil,
      availability: `https://schema.org/${availability}`,
      itemCondition: 'https://schema.org/NewCondition',
      url,
      ...(seller ? { seller: { '@type': 'Organization', name: seller } } : {}),
    },
  };

  return <JsonLd data={data} />;
}

// ── WebSite JSON-LD (for the landing page) ──────────────────

interface WebSiteJsonLdProps {
  name: string;
  url: string;
  description?: string;
  searchUrl?: string;
}

export function WebSiteJsonLd({
  name,
  url,
  description,
  searchUrl,
}: WebSiteJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
  };

  if (description) {
    data.description = description;
  }

  if (searchUrl) {
    data.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    };
  }

  return <JsonLd data={data} />;
}

// ── BreadcrumbList JSON-LD ──────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

// ── Article JSON-LD ────────────────────────────────────────

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  image?: string | string[];
  locale?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  locale,
  datePublished,
  dateModified,
  authorName = 'AutoWiFi Travel',
  publisherName = 'AutoWiFi Travel',
}: ArticleJsonLdProps) {
  const baseUrl = getBaseUrl();
  const normalizedImage = image ?? `${baseUrl}/opengraph-image`;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: normalizedImage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.png`,
      },
    },
    url,
    isAccessibleForFree: true,
    articleSection: 'Travel eSIM Guide',
    about: {
      '@type': 'Thing',
      name: 'Travel eSIM',
    },
    ...(locale ? { inLanguage: locale } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };

  return <JsonLd data={data} />;
}

// ── Organization JSON-LD ────────────────────────────────────

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AutoWiFi Travel',
    url: 'https://autowifi-travel.com',
    logo: 'https://autowifi-travel.com/favicon.ico',
    description: 'Affordable travel eSIM for 200+ countries. Stay connected wherever you go.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@autowifi.travel',
      contactType: 'customer service',
      availableLanguage: ['English', 'Japanese', 'Korean', 'Chinese'],
    },
  };

  return <JsonLd data={data} />;
}

// ── ItemList JSON-LD (for listing pages) ────────────────────

interface ItemListItem {
  name: string;
  url: string;
  position?: number;
}

export interface ItemListJsonLdProps {
  items: ItemListItem[];
}

export function ItemListJsonLd({ items }: ItemListJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position ?? index + 1,
      name: item.name,
      url: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

// ── Service JSON-LD ─────────────────────────────────────────

export function ServiceJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Travel eSIM',
    name: 'AutoWiFi Travel eSIM',
    description: 'Affordable travel eSIM plans for 200+ countries with instant activation.',
    provider: {
      '@type': 'Organization',
      name: 'AutoWiFi Travel',
      url: 'https://autowifi-travel.com',
    },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'eSIM Data Plans',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Local eSIM Plans' },
        { '@type': 'OfferCatalog', name: 'Regional eSIM Plans' },
      ],
    },
  };

  return <JsonLd data={data} />;
}

// ── FAQ JSON-LD ─────────────────────────────────────────────

interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqJsonLdProps {
  items: FaqItem[];
}

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
