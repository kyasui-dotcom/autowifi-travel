import React from 'react';

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
  image?: string;
  sku: string;
  priceCurrency: string;
  price: number;
  availability?: 'InStock' | 'OutOfStock';
  seller?: string;
  url: string;
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
}: ProductJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku,
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency,
      price: price.toFixed(2),
      availability: `https://schema.org/${availability}`,
      url,
      ...(seller ? { seller: { '@type': 'Organization', name: seller } } : {}),
    },
  };

  if (image) {
    data.image = image;
  }

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

// ── Organization JSON-LD ────────────────────────────────────

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AutoWiFi Travel',
    url: 'https://autowifi-travel.com',
    logo: 'https://autowifi-travel.com/icon.png',
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
