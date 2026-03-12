import type { Locale } from './config';

// Each locale JSON shares the same shape.
export interface Dictionary {
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
    valueProps: {
      instantActivation: string;
      instantActivationDesc: string;
      globalCoverage: string;
      globalCoverageDesc: string;
      affordable: string;
      affordableDesc: string;
    };
    popularDestinations: string;
  };
  esim: {
    countryListTitle: string;
    searchPlaceholder: string;
    packagesFor: string;
    noPackages: string;
  };
  package: {
    data: string;
    validity: string;
    days: string;
    operator: string;
    buyNow: string;
    price: string;
    perDay: string;
  };
  checkout: {
    title: string;
    emailLabel: string;
    emailPlaceholder: string;
    invalidEmail: string;
    processing: string;
    stripeNote: string;
  };
  order: {
    successTitle: string;
    successMessage: string;
    cancelTitle: string;
    cancelMessage: string;
    viewOrder: string;
  };
  common: {
    home: string;
    esim: string;
    languages: {
      en: string;
      ja: string;
      ko: string;
      zh: string;
    };
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    countryTitle: string;
    countryDescription: string;
  };
}

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./locales/en.json').then((m) => m.default as Dictionary),
  ja: () => import('./locales/ja.json').then((m) => m.default as Dictionary),
  ko: () => import('./locales/ko.json').then((m) => m.default as Dictionary),
  zh: () => import('./locales/zh.json').then((m) => m.default as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = loaders[locale];
  if (!load) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return load();
}
