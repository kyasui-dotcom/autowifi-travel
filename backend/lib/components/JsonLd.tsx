import React from 'react';
import { getBaseUrl, getDefaultOgImageUrl } from '@/lib/seo';

function getDefaultPriceValidUntil(): string {
  // Dynamically set to ~1 year from today so Rich Results stays valid
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

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
  const normalizedImage = image ?? getDefaultOgImageUrl(baseUrl);
  const resolvedBrand = brand ?? seller ?? 'AutoWiFi Travel';
  const resolvedPriceValidUntil = priceValidUntil ?? getDefaultPriceValidUntil();

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
  authorUrl?: string;
  authorType?: 'Person' | 'Organization';
  publisherName?: string;
  articleSection?: string;
  aboutName?: string;
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
  authorUrl,
  authorType = 'Organization',
  publisherName = 'AutoWiFi Travel',
  articleSection = 'Travel eSIM Guide',
  aboutName = 'Travel eSIM',
}: ArticleJsonLdProps) {
  const baseUrl = getBaseUrl();
  const normalizedImage = image ?? getDefaultOgImageUrl(baseUrl);

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
      '@type': authorType,
      name: authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
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
    articleSection,
    about: {
      '@type': 'Thing',
      name: aboutName,
    },
    ...(locale ? { inLanguage: locale } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };

  return <JsonLd data={data} />;
}

// ── Organization JSON-LD ────────────────────────────────────

export function OrganizationJsonLd() {
  const baseUrl = getBaseUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'AutoWiFi Travel',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/icon.png`,
    },
    description: 'Affordable travel eSIM for 200+ countries. Stay connected wherever you go.',
    email: 'support@autowifi-travel.com',
    knowsAbout: [
      'Travel eSIM',
      'eSIM setup',
      'Travel connectivity',
      'Travel data plans',
    ],
    publishingPrinciples: `${baseUrl}/en/editorial-policy`,
    subjectOf: [
      {
        '@type': 'AboutPage',
        url: `${baseUrl}/en/about`,
      },
      {
        '@type': 'AboutPage',
        url: `${baseUrl}/en/how-we-review-esims`,
      },
      {
        '@type': 'ProfilePage',
        url: `${baseUrl}/en/authors/autowifi-editorial-team`,
      },
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@autowifi-travel.com',
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

interface CollectionPageJsonLdProps {
  url: string;
  title: string;
  description: string;
  locale?: string;
  dateModified?: string;
  itemList?: Array<{ name: string; url: string }>;
  aboutName?: string;
}

export function CollectionPageJsonLd({
  url,
  title,
  description,
  locale,
  dateModified,
  itemList,
  aboutName = 'Travel eSIM plans',
}: CollectionPageJsonLdProps) {
  const baseUrl = getBaseUrl();
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'AutoWiFi Travel',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: aboutName,
    },
    ...(locale ? { inLanguage: locale } : {}),
    ...(dateModified ? { dateModified } : {}),
  };

  if (itemList?.length) {
    data.mainEntity = {
      '@type': 'ItemList',
      itemListElement: itemList.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    };
  }

  return <JsonLd data={data} />;
}

interface ProfilePageJsonLdProps {
  url: string;
  name: string;
  description: string;
  entityType?: 'Person' | 'Organization';
  image?: string;
  locale?: string;
  dateCreated?: string;
  dateModified?: string;
  knowsAbout?: string[];
}

export function ProfilePageJsonLd({
  url,
  name,
  description,
  entityType = 'Organization',
  image,
  locale,
  dateCreated,
  dateModified,
  knowsAbout,
}: ProfilePageJsonLdProps) {
  const baseUrl = getBaseUrl();
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    mainEntity: {
      '@type': entityType,
      name,
      description,
      url,
      ...(image ? { image } : {}),
      ...(knowsAbout?.length ? { knowsAbout } : {}),
    },
    ...(locale ? { inLanguage: locale } : {}),
    ...(dateCreated ? { dateCreated } : {}),
    ...(dateModified ? { dateModified } : {}),
    isPartOf: {
      '@type': 'WebSite',
      name: 'AutoWiFi Travel',
      url: baseUrl,
    },
  };

  return <JsonLd data={data} />;
}

interface AboutPageJsonLdProps {
  url: string;
  title: string;
  description: string;
  locale?: string;
  dateModified?: string;
}

export function AboutPageJsonLd({
  url,
  title,
  description,
  locale,
  dateModified,
}: AboutPageJsonLdProps) {
  const baseUrl = getBaseUrl();
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description,
    url,
    about: {
      '@type': 'Organization',
      name: 'AutoWiFi Travel',
      url: baseUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'AutoWiFi Travel',
      url: baseUrl,
    },
    ...(locale ? { inLanguage: locale } : {}),
    ...(dateModified ? { dateModified } : {}),
  };

  return <JsonLd data={data} />;
}
