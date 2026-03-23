import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata, getBaseUrl } from "@/lib/seo";
import { getCountryBySlug, getCountryName, getAllCountries } from "@/lib/countries";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";
import { ProductJsonLd, BreadcrumbJsonLd, FaqJsonLd, ItemListJsonLd } from "@/lib/components/JsonLd";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import styles from "./page.module.css";

// Force SSR so Cloudflare context (Airalo API secrets) is available at request time
export const dynamic = "force-dynamic";

// Country slug → guide slug (for cross-linking)
const COUNTRY_TO_GUIDE: Record<string, string> = {
  japan: "japan-esim", "south-korea": "korea-esim", thailand: "thailand-esim",
  "united-states": "usa-esim", "united-kingdom": "uk-esim", france: "france-esim",
  italy: "italy-esim", spain: "spain-esim", germany: "germany-esim",
  australia: "australia-esim", singapore: "singapore-esim", taiwan: "taiwan-esim",
  vietnam: "vietnam-esim", indonesia: "indonesia-esim", malaysia: "malaysia-esim",
  philippines: "philippines-esim", china: "china-esim", canada: "canada-esim",
  turkey: "turkey-esim", india: "india-esim", "hong-kong": "hong-kong-esim",
  "united-arab-emirates": "dubai-esim", cambodia: "cambodia-esim", greece: "greece-esim",
  mexico: "mexico-esim", "new-zealand": "new-zealand-esim", norway: "norway-esim",
  portugal: "portugal-esim", switzerland: "switzerland-esim", morocco: "morocco-esim",
  iceland: "iceland-esim", "sri-lanka": "sri-lanka-esim", guam: "guam-esim",
};

const LABELS: Record<string, {
  esimPlans: string;
  data: string;
  validity: string;
  days: string;
  operator: string;
  buyNow: string;
  noPackagesTitle: string;
  noPackagesText: string;
  backToList: string;
  breadcrumbHome: string;
  breadcrumbEsim: string;
}> = {
  en: {
    esimPlans: "eSIM Plans",
    data: "Data",
    validity: "Validity",
    days: "days",
    operator: "Operator",
    buyNow: "Buy Now",
    noPackagesTitle: "No Packages Available",
    noPackagesText: "We don't have any eSIM packages for this country yet. Please check back later or browse other destinations.",
    backToList: "Browse all countries",
    breadcrumbHome: "Home",
    breadcrumbEsim: "eSIM Plans",
  },
  ja: {
    esimPlans: "eSIMプラン",
    data: "データ量",
    validity: "有効期間",
    days: "日間",
    operator: "通信事業者",
    buyNow: "購入する",
    noPackagesTitle: "パッケージなし",
    noPackagesText: "この国のeSIMパッケージはまだありません。後ほどお確かめいただくか、他の渡航先をご覧ください。",
    backToList: "すべての国を見る",
    breadcrumbHome: "ホーム",
    breadcrumbEsim: "eSIMプラン",
  },
  ko: {
    esimPlans: "eSIM 플랜",
    data: "데이터",
    validity: "유효기간",
    days: "일",
    operator: "통신사",
    buyNow: "구매하기",
    noPackagesTitle: "이용 가능한 패키지 없음",
    noPackagesText: "이 국가의 eSIM 패키지는 아직 준비되지 않았습니다. 나중에 다시 확인하시거나 다른 여행지를 둘러보세요.",
    backToList: "모든 국가 보기",
    breadcrumbHome: "홈",
    breadcrumbEsim: "eSIM 플랜",
  },
  zh: {
    esimPlans: "eSIM套餐",
    data: "数据量",
    validity: "有效期",
    days: "天",
    operator: "运营商",
    buyNow: "立即购买",
    noPackagesTitle: "暂无套餐",
    noPackagesText: "该国家的eSIM套餐尚未上线。请稍后再查看或浏览其他目的地。",
    backToList: "浏览所有国家",
    breadcrumbHome: "首页",
    breadcrumbEsim: "eSIM套餐",
  },
};

const COUNTRY_PAGE_UI: Record<string, {
  eyebrow: string;
  heroSubtitle: (countryName: string) => string;
  primaryCta: string;
  secondaryCta: string;
  plansAvailable: string;
  startingAt: string;
  longestCoverage: string;
  refreshSoon: string;
  installTitle: string;
  installBody: (countryName: string) => string;
  plansEyebrow: string;
  plansTitle: (countryName: string) => string;
  plansLead: string;
  compareEyebrow: string;
  resourcesEyebrow: string;
  faqEyebrow: string;
  pricePerDay: string;
  idealFor: string;
  badgeCheapest: string;
  badgeBestValue: string;
  badgeLongest: string;
}> = {
  en: {
    eyebrow: "Travel eSIM",
    heroSubtitle: (countryName) =>
      `Choose a ${countryName} plan you can install before departure so you land with data ready for maps, messages, and work.`,
    primaryCta: "View plans",
    secondaryCta: "Compare plans",
    plansAvailable: "Plans available",
    startingAt: "Starting at",
    longestCoverage: "Longest coverage",
    refreshSoon: "Inventory updates automatically",
    installTitle: "Install before departure",
    installBody: (countryName) =>
      `Set up your ${countryName} eSIM in advance, then switch on mobile data after arrival to get online faster.`,
    plansEyebrow: "Pick your plan",
    plansTitle: (countryName) => `Choose the best ${countryName} eSIM for your trip`,
    plansLead: "Compare data size, trip length, and daily cost at a glance.",
    compareEyebrow: "Side-by-side view",
    resourcesEyebrow: "Before you buy",
    faqEyebrow: "Common questions",
    pricePerDay: "Price / day",
    idealFor: "Best for",
    badgeCheapest: "Lowest price",
    badgeBestValue: "Best value",
    badgeLongest: "Longest stay",
  },
  ja: {
    eyebrow: "旅行用eSIM",
    heroSubtitle: (countryName) =>
      `${countryName}到着後すぐに地図や連絡手段を使えるよう、出発前に入れておけるプランを選べます。`,
    primaryCta: "プランを見る",
    secondaryCta: "比較表を見る",
    plansAvailable: "掲載プラン数",
    startingAt: "最安料金",
    longestCoverage: "最長利用期間",
    refreshSoon: "在庫と料金は自動更新",
    installTitle: "出発前に設定可能",
    installBody: (countryName) =>
      `${countryName}到着前にeSIMを入れておけば、現地ではモバイルデータをONにするだけで使い始めやすくなります。`,
    plansEyebrow: "おすすめプラン",
    plansTitle: (countryName) => `${countryName}旅行に合うeSIMを選ぶ`,
    plansLead: "容量、旅行日数、1日あたりの価格を見比べながら選べます。",
    compareEyebrow: "比較しやすく整理",
    resourcesEyebrow: "購入前に確認",
    faqEyebrow: "よくある質問",
    pricePerDay: "1日あたり",
    idealFor: "向いている使い方",
    badgeCheapest: "最安",
    badgeBestValue: "バランス重視",
    badgeLongest: "長期向け",
  },
  ko: {
    eyebrow: "여행용 eSIM",
    heroSubtitle: (countryName) =>
      `${countryName} 도착 직후 지도, 메신저, 업무용 앱을 바로 쓸 수 있도록 출발 전에 설치할 수 있는 플랜을 골라보세요.`,
    primaryCta: "플랜 보기",
    secondaryCta: "비교표 보기",
    plansAvailable: "판매 중인 플랜",
    startingAt: "최저가",
    longestCoverage: "최장 사용 기간",
    refreshSoon: "재고와 가격은 자동 업데이트",
    installTitle: "출발 전에 설치 가능",
    installBody: (countryName) =>
      `${countryName} eSIM을 미리 설치해 두면 현지 도착 후 데이터만 켜도 빠르게 연결할 수 있습니다.`,
    plansEyebrow: "추천 플랜",
    plansTitle: (countryName) => `${countryName} 여행에 맞는 eSIM 고르기`,
    plansLead: "데이터 용량, 여행 기간, 하루 기준 비용을 한눈에 비교하세요.",
    compareEyebrow: "한눈에 비교",
    resourcesEyebrow: "구매 전에 확인",
    faqEyebrow: "자주 묻는 질문",
    pricePerDay: "1일 기준",
    idealFor: "추천 용도",
    badgeCheapest: "최저가",
    badgeBestValue: "가성비",
    badgeLongest: "장기 체류",
  },
  zh: {
    eyebrow: "旅行 eSIM",
    heroSubtitle: (countryName) =>
      `出发前就能为${countryName}安装 eSIM，落地后可更快打开地图、消息和常用应用。`,
    primaryCta: "查看套餐",
    secondaryCta: "查看对比",
    plansAvailable: "可选套餐",
    startingAt: "最低价格",
    longestCoverage: "最长有效期",
    refreshSoon: "库存与价格自动更新",
    installTitle: "出发前即可安装",
    installBody: (countryName) =>
      `提前安装${countryName} eSIM，到达后开启蜂窝数据即可更快联网。`,
    plansEyebrow: "推荐套餐",
    plansTitle: (countryName) => `挑选适合${countryName}行程的 eSIM`,
    plansLead: "可快速比较流量、天数和日均价格。",
    compareEyebrow: "并排对比",
    resourcesEyebrow: "购买前先看",
    faqEyebrow: "常见问题",
    pricePerDay: "日均价格",
    idealFor: "适合场景",
    badgeCheapest: "最低价",
    badgeBestValue: "性价比",
    badgeLongest: "长期出行",
  },
};

interface CountryPackage {
  id: string;
  title: string;
  data: string;
  validity: number;
  price: number;
  operator: string;
}

interface PackageComparisonRow {
  id: string;
  title: string;
  data: string;
  validity: number;
  price: number;
  pricePerDay: number;
  bestFor: string;
}

interface SeoHighlight {
  title: string;
  description: string;
}

interface SeoFaqItem {
  question: string;
  answer: string;
}

interface RelatedLink {
  href: string;
  title: string;
  description: string;
}

const CONTINENT_LABELS: Record<string, Record<string, string>> = {
  en: {
    asia: "Asia",
    europe: "Europe",
    "north-america": "North America",
    "south-america": "South America",
    oceania: "Oceania",
    "middle-east": "the Middle East",
    africa: "Africa",
  },
  ja: {
    asia: "アジア",
    europe: "ヨーロッパ",
    "north-america": "北米",
    "south-america": "南米",
    oceania: "オセアニア",
    "middle-east": "中東",
    africa: "アフリカ",
  },
  ko: {
    asia: "아시아",
    europe: "유럽",
    "north-america": "북미",
    "south-america": "남미",
    oceania: "오세아니아",
    "middle-east": "중동",
    africa: "아프리카",
  },
  zh: {
    asia: "亚洲",
    europe: "欧洲",
    "north-america": "北美洲",
    "south-america": "南美洲",
    oceania: "大洋洲",
    "middle-east": "中东",
    africa: "非洲",
  },
};

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function toLocaleTag(locale: string): string {
  switch (locale) {
    case "ja":
      return "ja-JP";
    case "ko":
      return "ko-KR";
    case "zh":
      return "zh-CN";
    default:
      return "en-US";
  }
}

function formatList(values: string[], locale: string): string {
  if (values.length === 0) {
    return "";
  }

  if (values.length === 1) {
    return values[0];
  }

  return new Intl.ListFormat(toLocaleTag(locale), {
    style: "long",
    type: "conjunction",
  }).format(values);
}

function formatAvailablePlans(locale: string, count: number): string {
  switch (locale) {
    case "ja":
      return `${count}件のプランを掲載中`;
    case "ko":
      return `${count}개 플랜 제공 중`;
    case "zh":
      return `当前有${count}个套餐`;
    default:
      return `${count} ${count === 1 ? "plan" : "plans"} available`;
  }
}

function getProductDescription(locale: string, countryName: string, pkg: CountryPackage): string {
  switch (locale) {
    case "ja":
      return `${countryName}向け${pkg.data}のeSIMプラン。有効期間は${pkg.validity}日。${pkg.operator}回線に対応。`;
    case "ko":
      return `${countryName}용 ${pkg.data} eSIM 플랜입니다. 유효기간은 ${pkg.validity}일이며 ${pkg.operator} 네트워크를 사용합니다.`;
    case "zh":
      return `${countryName}${pkg.data} eSIM套餐，有效期${pkg.validity}天，支持${pkg.operator}网络。`;
    default:
      return `${pkg.data} data plan for ${countryName}, valid for ${pkg.validity} days on ${pkg.operator}.`;
  }
}

function parseDataInGb(data: string): number {
  const numeric = Number.parseFloat(data.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric)) {
    return 0;
  }

  const lower = data.toLowerCase();
  if (lower.includes("mb")) {
    return numeric / 1024;
  }
  if (lower.includes("tb")) {
    return numeric * 1024;
  }
  return numeric;
}

function getPackageUseCase(locale: string, pkg: CountryPackage): string {
  const dataInGb = parseDataInGb(pkg.data);

  if (pkg.validity <= 5 && dataInGb <= 2) {
    switch (locale) {
      case "ja":
        return "週末旅行・乗継";
      case "ko":
        return "주말 여행·경유";
      case "zh":
        return "周末短途或转机";
      default:
        return "Weekend trips";
    }
  }

  if (pkg.validity <= 10 && dataInGb <= 5) {
    switch (locale) {
      case "ja":
        return "短期の観光旅行";
      case "ko":
        return "단기 여행";
      case "zh":
        return "短期观光";
      default:
        return "Short city trips";
    }
  }

  if (pkg.validity >= 30 || dataInGb >= 20) {
    switch (locale) {
      case "ja":
        return "長期滞在・テザリング";
      case "ko":
        return "장기 체류·테더링";
      case "zh":
        return "长期停留或热点";
      default:
        return "Long stays / hotspot";
    }
  }

  switch (locale) {
    case "ja":
      return "1週間前後の旅行";
    case "ko":
      return "일주일 안팎 여행";
    case "zh":
      return "一周左右行程";
    default:
      return "Week-long travel";
  }
}

function buildPackageComparisonRows(locale: string, packages: CountryPackage[]): PackageComparisonRow[] {
  return [...packages]
    .sort((a, b) => a.price - b.price || a.validity - b.validity)
    .map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      data: pkg.data,
      validity: pkg.validity,
      price: pkg.price,
      pricePerDay: pkg.price / Math.max(pkg.validity, 1),
      bestFor: getPackageUseCase(locale, pkg),
    }));
}

function formatUsd(locale: string, value: number): string {
  return new Intl.NumberFormat(toLocaleTag(locale), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function getPackageBadge({
  locale,
  packageId,
  cheapestId,
  bestValueId,
  longestId,
}: {
  locale: string;
  packageId: string;
  cheapestId?: string;
  bestValueId?: string;
  longestId?: string;
}): string | null {
  const ui = COUNTRY_PAGE_UI[locale] ?? COUNTRY_PAGE_UI.en;

  if (packageId === cheapestId) {
    return ui.badgeCheapest;
  }

  if (packageId === bestValueId) {
    return ui.badgeBestValue;
  }

  if (packageId === longestId) {
    return ui.badgeLongest;
  }

  return null;
}

const COUNTRY_COMPARISON_TEXT: Record<string, {
  title: string;
  intro: (countryName: string) => string;
  headers: {
    plan: string;
    data: string;
    validity: string;
    price: string;
    pricePerDay: string;
    bestFor: string;
    action: string;
  };
}> = {
  en: {
    title: "Plan comparison table",
    intro: (countryName) => `Compare ${countryName} eSIM plans by total price, daily cost, and the type of trip each package fits best.`,
    headers: {
      plan: "Plan",
      data: "Data",
      validity: "Validity",
      price: "Price",
      pricePerDay: "Price / day",
      bestFor: "Best for",
      action: "Action",
    },
  },
  ja: {
    title: "プラン比較表",
    intro: (countryName) => `${countryName}向けeSIMを、総額・1日あたりの価格・向いている旅行タイプで比較できます。`,
    headers: {
      plan: "プラン",
      data: "データ量",
      validity: "有効期間",
      price: "総額",
      pricePerDay: "1日あたり",
      bestFor: "向いている使い方",
      action: "購入",
    },
  },
  ko: {
    title: "플랜 비교표",
    intro: (countryName) => `${countryName} eSIM 플랜을 총액, 일할 비용, 추천 사용 목적 기준으로 비교할 수 있습니다.`,
    headers: {
      plan: "플랜",
      data: "데이터",
      validity: "유효기간",
      price: "총액",
      pricePerDay: "1일 기준",
      bestFor: "추천 용도",
      action: "구매",
    },
  },
  zh: {
    title: "套餐对比表",
    intro: (countryName) => `可按总价、日均价格和适合的出行场景，对比${countryName} eSIM套餐。`,
    headers: {
      plan: "套餐",
      data: "流量",
      validity: "有效期",
      price: "总价",
      pricePerDay: "日均价格",
      bestFor: "适合场景",
      action: "购买",
    },
  },
};

function getRelatedLinks(locale: string, countryName: string, countrySlug: string): {
  title: string;
  links: RelatedLink[];
} {
  const guideSlug = COUNTRY_TO_GUIDE[countrySlug];

  switch (locale) {
    case "ja":
      return {
        title: `${countryName}旅行の関連ガイド`,
        links: [
          {
            href: guideSlug ? `/${locale}/guide/${guideSlug}` : `/${locale}/guide`,
            title: guideSlug ? `${countryName}旅行ガイド` : "eSIMガイド一覧",
            description: guideSlug
              ? `${countryName}での通信事情や旅行前の準備を確認できます。`
              : "渡航前に役立つeSIMガイドをまとめて確認できます。",
          },
          {
            href: `/${locale}/guide/how-to-setup-esim`,
            title: "eSIMの設定方法",
            description: "購入後のQRコード設定手順をiPhone・Android向けに確認できます。",
          },
          {
            href: `/${locale}/guide/esim-compatible-phones`,
            title: "対応端末を確認する",
            description: "購入前にお使いのスマホがeSIMに対応しているか確認できます。",
          },
        ],
      };
    case "ko":
      return {
        title: `${countryName} 여행 관련 가이드`,
        links: [
          {
            href: guideSlug ? `/${locale}/guide/${guideSlug}` : `/${locale}/guide`,
            title: guideSlug ? `${countryName} 여행 가이드` : "eSIM 가이드 모음",
            description: guideSlug
              ? `${countryName} 현지 연결 팁과 여행 준비 사항을 확인할 수 있습니다.`
              : "출국 전에 도움이 되는 eSIM 가이드를 모아볼 수 있습니다.",
          },
          {
            href: `/${locale}/guide/how-to-setup-esim`,
            title: "eSIM 설정 방법",
            description: "구매 후 QR 코드를 설치하는 방법을 단계별로 확인하세요.",
          },
          {
            href: `/${locale}/guide/esim-compatible-phones`,
            title: "호환 기기 확인",
            description: "구매 전에 현재 스마트폰이 eSIM을 지원하는지 확인하세요.",
          },
        ],
      };
    case "zh":
      return {
        title: `${countryName}出行相关指南`,
        links: [
          {
            href: guideSlug ? `/${locale}/guide/${guideSlug}` : `/${locale}/guide`,
            title: guideSlug ? `${countryName}旅行指南` : "eSIM指南合集",
            description: guideSlug
              ? `了解${countryName}当地网络使用建议和出发前准备事项。`
              : "集中查看出发前常见的eSIM使用指南。",
          },
          {
            href: `/${locale}/guide/how-to-setup-esim`,
            title: "eSIM安装方法",
            description: "购买后可按步骤完成二维码安装与开通。",
          },
          {
            href: `/${locale}/guide/esim-compatible-phones`,
            title: "查看兼容设备",
            description: "下单前先确认您的手机是否支持eSIM。",
          },
        ],
      };
    default:
      return {
        title: `Helpful guides for ${countryName}`,
        links: [
          {
            href: guideSlug ? `/${locale}/guide/${guideSlug}` : `/${locale}/guide`,
            title: guideSlug ? `${countryName} travel guide` : "Browse all eSIM guides",
            description: guideSlug
              ? `Read local connectivity advice and travel tips before you fly to ${countryName}.`
              : "Explore setup, compatibility, and buying guides before your trip.",
          },
          {
            href: `/${locale}/guide/how-to-setup-esim`,
            title: "How to set up an eSIM",
            description: "Follow the QR code installation steps before departure.",
          },
          {
            href: `/${locale}/guide/esim-compatible-phones`,
            title: "Check eSIM compatible phones",
            description: "Confirm that your current phone supports eSIM before you buy.",
          },
        ],
      };
  }
}

function getCountrySeoContent({
  locale,
  countryName,
  continent,
  packages,
}: {
  locale: string;
  countryName: string;
  continent: string;
  packages: CountryPackage[];
}): {
  overviewTitle: string;
  overviewParagraphs: string[];
  highlights: SeoHighlight[];
  faqTitle: string;
  faqItems: SeoFaqItem[];
} {
  const cheapestPrice = packages.length > 0 ? Math.min(...packages.map((pkg) => pkg.price)) : null;
  const longestValidity = packages.length > 0 ? Math.max(...packages.map((pkg) => pkg.validity)) : null;
  const dataOptions = uniqueStrings(packages.map((pkg) => pkg.data)).slice(0, 4);
  const operators = uniqueStrings(packages.map((pkg) => pkg.operator)).slice(0, 3);
  const formattedDataOptions = formatList(dataOptions, locale);
  const formattedOperators = formatList(operators, locale);
  const localizedContinent = CONTINENT_LABELS[locale]?.[continent] ?? CONTINENT_LABELS.en[continent] ?? continent;

  switch (locale) {
    case "ja":
      return {
        overviewTitle: `${countryName}で使うeSIMの選び方`,
        overviewParagraphs: packages.length > 0
          ? [
              `${countryName}旅行では、出発前にeSIMを入れておくと到着後すぐに通信を始めやすくなります。空港Wi-Fiを探したり、現地で物理SIMを買いに行ったりする手間を減らせます。`,
              `このページでは${packages.length}件の${countryName}向けプランを比較できます。料金は$${cheapestPrice?.toFixed(2)}から、有効期間は最長${longestValidity}日で、${formattedDataOptions}などの容量を選べます。対応ネットワークは${formattedOperators}などです。`,
              `${localizedContinent}方面の旅行では、地図、配車アプリ、翻訳、メッセージ、仕事用の連絡を安定して使いたい人にeSIMが向いています。普段のSIMを残したまま、データ通信だけeSIMに分けられるのも大きな利点です。`,
            ]
          : [
              `${countryName}旅行では、出発前にeSIMを準備しておくと到着直後の通信がスムーズになります。現地で物理SIMを探す必要がなく、空港からホテルまでの移動中もすぐにネットを使えます。`,
              `現在このページでは${countryName}向けの販売中プランを表示できていませんが、eSIMの準備方法や対応端末の確認など、購入前に押さえたいポイントは先に確認できます。`,
            ],
        highlights: [
          {
            title: "出発前にセットアップできる",
            description: `${countryName}到着前にQRコードを読み込んでおけば、現地ではデータ通信をONにするだけで使い始めやすくなります。`,
          },
          {
            title: "普段の番号を残しやすい",
            description: "eSIM対応スマホなら、通話やSMSは元のSIM、データ通信は旅行用eSIMという使い分けがしやすいです。",
          },
          {
            title: "旅行日数に合わせて選びやすい",
            description: packages.length > 0
              ? `$${cheapestPrice?.toFixed(2)}から最長${longestValidity}日までの選択肢があるので、短期旅行から長めの滞在まで計画に合わせやすいです。`
              : "短期旅行でも長めの滞在でも、容量と有効期間のバランスを見ながら選ぶのがポイントです。",
          },
        ],
        faqTitle: `${countryName} eSIMのよくある質問`,
        faqItems: [
          {
            question: `${countryName}向けeSIMはいつインストールすればいいですか？`,
            answer: `${countryName}へ出発する前にインストールしておくのがおすすめです。一般的には渡航前にQRコードを読み込み、現地到着後にデータ通信を有効化するとスムーズです。`,
          },
          {
            question: `旅行中も普段の電話番号は使えますか？`,
            answer: "多くのeSIM対応端末はデュアルSIM運用が可能です。端末仕様に問題がなければ、普段のSIMを残しつつ、旅行中のデータ通信だけeSIMで使えます。",
          },
          {
            question: `${countryName}旅行ではどれくらいのデータ容量が必要ですか？`,
            answer: packages.length > 0
              ? `地図やメッセージ中心なら少なめでも足りることがありますが、動画視聴やテザリングを使うなら余裕を持った容量がおすすめです。このページでは${formattedDataOptions}などのプランを比較できます。`
              : "地図やメッセージ中心なら少なめでも足りることがありますが、動画視聴やテザリングを使うなら余裕を持った容量を選ぶと安心です。",
          },
          {
            question: "有効期間はいつから始まりますか？",
            answer: "旅行用eSIMは、対応ネットワークに最初に接続したタイミングで有効期間が始まるケースが一般的です。購入前に各プランの詳細を確認してください。",
          },
        ],
      };
    case "ko":
      return {
        overviewTitle: `${countryName} eSIM 선택 가이드`,
        overviewParagraphs: packages.length > 0
          ? [
              `${countryName} 여행에서는 출발 전에 eSIM을 설치해 두면 도착 직후 바로 데이터를 사용하기 쉽습니다. 공항 Wi-Fi를 찾거나 현지 매장에서 물리 SIM을 구매할 필요가 줄어듭니다.`,
              `이 페이지에서는 ${countryName}용 플랜 ${packages.length}개를 비교할 수 있습니다. 가격은 $${cheapestPrice?.toFixed(2)}부터 시작하고 유효기간은 최대 ${longestValidity}일이며, ${formattedDataOptions} 같은 데이터 옵션을 선택할 수 있습니다. 사용 가능한 네트워크는 ${formattedOperators} 등입니다.`,
              `${localizedContinent} 지역 여행에서는 지도, 메신저, 차량 호출 앱, 업무 연락을 안정적으로 사용하려는 경우 eSIM이 특히 편리합니다. 기존 번호를 유지한 채 데이터만 분리해 사용할 수 있다는 점도 장점입니다.`,
            ]
          : [
              `${countryName} 여행에서는 출발 전에 eSIM을 준비해 두면 현지 도착 직후 연결이 훨씬 수월합니다. 물리 SIM을 찾으러 다니지 않아도 되고 공항에서 호텔까지 이동하는 동안에도 바로 인터넷을 사용할 수 있습니다.`,
              `현재 이 페이지에서 ${countryName} 플랜을 표시하지 못하고 있지만, eSIM 설정 방법과 호환 기기 확인 같은 구매 전 핵심 정보는 먼저 확인할 수 있습니다.`,
            ],
        highlights: [
          {
            title: "출발 전에 미리 설치",
            description: `${countryName}에 도착하기 전에 QR 코드를 설치해 두면 현지에서는 데이터만 켜고 바로 사용할 수 있습니다.`,
          },
          {
            title: "기존 번호 유지 가능",
            description: "eSIM 지원 스마트폰이라면 기존 SIM은 통화용으로 두고 여행용 eSIM을 데이터 전용으로 사용하는 방식이 편리합니다.",
          },
          {
            title: "여행 일정에 맞는 선택",
            description: packages.length > 0
              ? `$${cheapestPrice?.toFixed(2)}부터 최대 ${longestValidity}일까지 선택할 수 있어 짧은 일정부터 장기 체류까지 맞추기 쉽습니다.`
              : "짧은 일정인지 장기 체류인지에 따라 데이터 용량과 유효기간의 균형을 보는 것이 중요합니다.",
          },
        ],
        faqTitle: `${countryName} eSIM 자주 묻는 질문`,
        faqItems: [
          {
            question: `${countryName} eSIM은 언제 설치하는 것이 좋나요?`,
            answer: `${countryName}로 출발하기 전에 설치해 두는 것이 좋습니다. 일반적으로 출국 전에 QR 코드를 추가하고 현지 도착 후 데이터 회선을 켜면 바로 사용하기 쉽습니다.`,
          },
          {
            question: "여행 중에도 기존 전화번호를 유지할 수 있나요?",
            answer: "대부분의 eSIM 지원 기기는 듀얼 SIM 사용이 가능합니다. 기기 사양만 맞다면 기존 번호는 유지하고 여행용 eSIM을 데이터 전용으로 사용할 수 있습니다.",
          },
          {
            question: `${countryName} 여행에는 어느 정도 데이터가 필요하나요?`,
            answer: packages.length > 0
              ? `지도와 메신저 위주라면 적은 용량으로도 충분할 수 있지만 영상 시청이나 테더링이 많다면 더 큰 플랜이 좋습니다. 이 페이지에서는 ${formattedDataOptions} 같은 옵션을 비교할 수 있습니다.`
              : "지도와 메신저 위주라면 적은 용량으로도 충분할 수 있지만 영상 시청이나 테더링이 많다면 더 큰 플랜을 선택하는 편이 안전합니다.",
          },
          {
            question: "유효기간은 언제부터 시작되나요?",
            answer: "여행용 eSIM은 보통 지원 네트워크에 처음 연결되는 시점부터 유효기간이 시작됩니다. 정확한 조건은 구매 전 각 플랜 상세를 확인하세요.",
          },
        ],
      };
    case "zh":
      return {
        overviewTitle: `${countryName} eSIM选购建议`,
        overviewParagraphs: packages.length > 0
          ? [
              `前往${countryName}旅行时，出发前先安装好eSIM，落地后通常就能更快联网，不必在机场临时找Wi-Fi或购买实体SIM卡。`,
              `本页可比较${packages.length}个${countryName} eSIM套餐，价格从$${cheapestPrice?.toFixed(2)}起，有效期最长${longestValidity}天，可选流量包括${formattedDataOptions}等，支持的网络包含${formattedOperators}等。`,
              `前往${localizedContinent}旅行时，如果您需要稳定使用地图、叫车、翻译、聊天工具或远程办公，eSIM通常会比临时购买实体卡更省心，也更容易保留原本手机号。`,
            ]
          : [
              `前往${countryName}旅行时，提前准备eSIM可以让您在落地后更快联网，不必再花时间寻找实体SIM卡或临时公共Wi-Fi。`,
              `当前本页暂时没有展示${countryName}在售套餐，但您仍然可以先查看安装方法、兼容设备等购买前需要确认的信息。`,
            ],
        highlights: [
          {
            title: "出发前即可安装",
            description: `提前扫描二维码安装后，到达${countryName}通常只需开启数据网络即可开始使用。`,
          },
          {
            title: "更容易保留原号码",
            description: "支持eSIM的手机通常可以同时保留原有SIM，用旅行eSIM专门负责上网。",
          },
          {
            title: "按行程选择更灵活",
            description: packages.length > 0
              ? `套餐从$${cheapestPrice?.toFixed(2)}起、最长${longestValidity}天，短途出行和较长停留都更容易匹配。`
              : "选择时建议同时考虑停留天数、使用场景以及是否需要视频、热点等高流量用途。",
          },
        ],
        faqTitle: `${countryName} eSIM常见问题`,
        faqItems: [
          {
            question: `${countryName} eSIM什么时候安装比较合适？`,
            answer: `建议在出发前先完成安装。通常可以先扫描二维码添加eSIM，到达${countryName}后再开启数据网络使用。`,
          },
          {
            question: "旅行时还能保留原来的手机号吗？",
            answer: "多数支持eSIM的手机都支持双卡使用。只要设备支持，您可以保留原本号码，把旅行eSIM作为数据卡使用。",
          },
          {
            question: `${countryName}旅行需要多大流量？`,
            answer: packages.length > 0
              ? `如果主要使用地图和聊天工具，小流量也许足够；如果要看视频、分享热点或频繁上传内容，建议选择更大流量。本页可比较${formattedDataOptions}等套餐。`
              : "如果主要使用地图和聊天工具，小流量往往已经够用；如果要看视频、分享热点或频繁上传内容，建议选择更高流量。",
          },
          {
            question: "有效期从什么时候开始计算？",
            answer: "多数旅行eSIM会在首次连接到支持网络时开始计算有效期。具体规则请以下单前的套餐详情为准。",
          },
        ],
      };
    default:
      return {
        overviewTitle: `Why buy a ${countryName} eSIM before you travel?`,
        overviewParagraphs: packages.length > 0
          ? [
              `Installing an eSIM before you leave for ${countryName} makes it easier to get online the moment you land. It removes the usual scramble for airport Wi-Fi or a local store selling physical SIM cards.`,
              `This page currently compares ${packages.length} travel eSIM plans for ${countryName}. Prices start at $${cheapestPrice?.toFixed(2)}, validity goes up to ${longestValidity} days, and data options include ${formattedDataOptions}. Available networks include ${formattedOperators}.`,
              `For trips across ${localizedContinent}, eSIM is a practical option if you rely on maps, ride-hailing, messaging, translation apps, or remote work tools and want to keep your main number active on another SIM.`,
            ]
          : [
              `Installing an eSIM before you leave for ${countryName} makes it easier to get online as soon as you arrive, without searching for airport Wi-Fi or a local SIM shop.`,
              `Live package data for ${countryName} is not showing on this page right now, but you can still review the setup process and device compatibility before your trip.`,
            ],
        highlights: [
          {
            title: "Set up before takeoff",
            description: `You can install the QR code before you fly, then turn on mobile data when you reach ${countryName}.`,
          },
          {
            title: "Keep your main number active",
            description: "Most eSIM-compatible phones support dual SIM, so you can keep your regular number and use the travel eSIM for data.",
          },
          {
            title: "Pick a plan that fits your trip",
            description: packages.length > 0
              ? `With prices from $${cheapestPrice?.toFixed(2)} and validity up to ${longestValidity} days, it is easier to match your plan to a short getaway or a longer stay.`
              : "Think about trip length, hotspot needs, and how much navigation or streaming you expect to do before choosing a plan.",
          },
        ],
        faqTitle: `${countryName} eSIM FAQs`,
        faqItems: [
          {
            question: `When should I install my ${countryName} eSIM?`,
            answer: `It is usually best to install it before departure. In most cases you can add the QR code ahead of time and enable the plan once you arrive in ${countryName}.`,
          },
          {
            question: "Can I keep using my regular phone number while traveling?",
            answer: "Yes, on most eSIM-compatible devices you can keep your normal SIM active for calls or SMS and use the travel eSIM for mobile data.",
          },
          {
            question: `How much data do I need for a trip to ${countryName}?`,
            answer: packages.length > 0
              ? `Light use such as maps and messaging may only need a small plan, while video, hotspot use, and heavy uploads usually need more. On this page you can compare options like ${formattedDataOptions}.`
              : "Light use such as maps and messaging may only need a small plan, while video, hotspot use, and heavy uploads usually need more.",
          },
          {
            question: "When does the validity period start?",
            answer: "For most travel eSIM products, validity starts when the plan first connects to a supported network. Check each package before purchase because rules can differ by provider.",
          },
        ],
      };
  }
}

export async function generateStaticParams() {
  const countries = getAllCountries();
  const locales = ["en", "ja", "ko", "zh"];

  return locales.flatMap((locale) =>
    countries.map((country) => ({
      locale,
      countrySlug: country.slug,
    }))
  );
}

// Locale-specific fallback descriptions for countries without custom COUNTRY_META
const META_FALLBACK: Record<string, { title: (name: string) => string; desc: (name: string) => string }> = {
  en: {
    title: (name) => `${name} eSIM Plans`,
    desc: (name) => `Buy affordable eSIM data plans for ${name}. Instant activation, no physical SIM card needed. Stay connected during your trip.`,
  },
  ja: {
    title: (name) => `${name}旅行用eSIMプラン`,
    desc: (name) => `${name}で使えるeSIMプランを比較。即時アクティベーション、物理SIMカード不要。旅行中もすぐにネットにつながる。`,
  },
  ko: {
    title: (name) => `${name} eSIM 플랜`,
    desc: (name) => `${name} 여행용 eSIM 데이터 플랜. 즉시 활성화, 물리적 SIM 카드 불필요. 여행 중 편리하게 연결하세요.`,
  },
  zh: {
    title: (name) => `${name} eSIM套餐`,
    desc: (name) => `购买${name}实惠eSIM数据套餐。即时激活，无需实体SIM卡。旅行中随时保持连接。`,
  },
};

// Country-specific SEO descriptions for higher CTR
const COUNTRY_META: Record<string, Record<string, { title: string; desc: string }>> = {
  japan: {
    en: { title: "Japan eSIM Plans", desc: "Get Japan eSIM for your trip. High-speed 4G/5G coverage across Tokyo, Osaka, Kyoto and all of Japan. Instant QR code activation." },
    ja: { title: "日本旅行用eSIMプラン", desc: "日本全国で使えるeSIMプラン。東京・大阪・京都など全国カバー。QRコードで即時開通、SIMカード不要。" },
    ko: { title: "일본 eSIM 플랜", desc: "일본 여행용 eSIM. 도쿄, 오사카, 교토 등 일본 전역 고속 커버리지. QR코드로 즉시 활성화." },
    zh: { title: "日本eSIM套餐", desc: "日本旅行eSIM。覆盖东京、大阪、京都等全日本高速网络。扫码即开通，无需实体SIM卡。" },
  },
  "south-korea": {
    en: { title: "South Korea eSIM Plans", desc: "Get Korea eSIM for your trip. Fast LTE/5G data across Seoul, Busan, Jeju and all of Korea. Instant activation via QR code." },
    ja: { title: "韓国旅行用eSIMプラン", desc: "韓国旅行に最適なeSIM。ソウル・釜山・済州島など韓国全土で高速データ通信。即時開通。" },
    ko: { title: "한국 eSIM 플랜", desc: "한국 여행용 eSIM. 서울, 부산, 제주 등 전국 고속 LTE/5G. QR코드 즉시 활성화." },
    zh: { title: "韩国eSIM套餐", desc: "韩国旅行eSIM。覆盖首尔、釜山、济州岛等全韩国高速网络。即时开通。" },
  },
  "united-states": {
    en: { title: "USA eSIM Plans", desc: "Get USA eSIM for your trip. Nationwide 4G/5G coverage across all 50 states. Instant QR code activation, no store visit needed." },
    ja: { title: "アメリカ旅行用eSIMプラン", desc: "アメリカ全土で使えるeSIM。全50州で高速データ通信。QRコードで即時開通。" },
    ko: { title: "미국 eSIM 플랜", desc: "미국 여행용 eSIM. 50개 주 전역 4G/5G 커버리지. QR코드로 즉시 활성화." },
    zh: { title: "美国eSIM套餐", desc: "美国旅行eSIM。覆盖全美50州高速4G/5G网络。扫码即开通。" },
  },
  thailand: {
    en: { title: "Thailand eSIM Plans", desc: "Get Thailand eSIM for your trip. Fast data coverage in Bangkok, Chiang Mai, Phuket and across Thailand. Instant activation." },
    ja: { title: "タイ旅行用eSIMプラン", desc: "タイ旅行に最適なeSIM。バンコク・チェンマイ・プーケットなどタイ全土で高速通信。" },
    ko: { title: "태국 eSIM 플랜", desc: "태국 여행용 eSIM. 방콕, 치앙마이, 푸켓 등 태국 전역 고속 데이터." },
    zh: { title: "泰国eSIM套餐", desc: "泰国旅行eSIM。覆盖曼谷、清迈、普吉岛等泰国全境。即时开通。" },
  },
  taiwan: {
    en: { title: "Taiwan eSIM Plans", desc: "Get Taiwan eSIM for your trip. Reliable data coverage in Taipei, Kaohsiung and across Taiwan. Instant QR code activation." },
    ja: { title: "台湾旅行用eSIMプラン", desc: "台湾旅行に最適なeSIM。台北・高雄など台湾全土で快適なデータ通信。" },
    ko: { title: "대만 eSIM 플랜", desc: "대만 여행용 eSIM. 타이베이, 가오슝 등 대만 전역 커버리지." },
    zh: { title: "台湾eSIM套餐", desc: "台湾旅行eSIM。覆盖台北、高雄等全台湾地区。扫码即开通。" },
  },
  singapore: {
    en: { title: "Singapore eSIM Plans", desc: "Get Singapore eSIM for your trip. Ultra-fast 5G data coverage across the city-state. Instant QR code activation." },
    ja: { title: "シンガポール旅行用eSIMプラン", desc: "シンガポール旅行に最適なeSIM。市内全域で超高速5Gデータ通信。" },
    ko: { title: "싱가포르 eSIM 플랜", desc: "싱가포르 여행용 eSIM. 도시 전역 초고속 5G 데이터 커버리지." },
    zh: { title: "新加坡eSIM套餐", desc: "新加坡旅行eSIM。全城超高速5G网络覆盖。即时开通。" },
  },
  "united-kingdom": {
    en: { title: "UK eSIM Plans", desc: "Get UK eSIM for your trip. Fast data across London, Edinburgh, Manchester and all of the UK. Instant activation." },
    ja: { title: "イギリス旅行用eSIMプラン", desc: "イギリス旅行に最適なeSIM。ロンドン・エディンバラなど英国全土で高速通信。" },
    ko: { title: "영국 eSIM 플랜", desc: "영국 여행용 eSIM. 런던, 에든버러 등 영국 전역 고속 데이터." },
    zh: { title: "英国eSIM套餐", desc: "英国旅行eSIM。覆盖伦敦、爱丁堡等全英高速网络。即时开通。" },
  },
  france: {
    en: { title: "France eSIM Plans", desc: "Get France eSIM for your trip. Fast data across Paris, Nice, Lyon and all of France. Instant QR code activation." },
    ja: { title: "フランス旅行用eSIMプラン", desc: "フランス旅行に最適なeSIM。パリ・ニース・リヨンなどフランス全土で高速通信。" },
    ko: { title: "프랑스 eSIM 플랜", desc: "프랑스 여행용 eSIM. 파리, 니스, 리옹 등 프랑스 전역 고속 데이터." },
    zh: { title: "法国eSIM套餐", desc: "法国旅行eSIM。覆盖巴黎、尼斯、里昂等全法高速网络。即时开通。" },
  },
  hawaii: {
    en: { title: "Hawaii eSIM Plans", desc: "Get Hawaii eSIM for your trip. Fast data coverage across Oahu, Maui, Big Island and all Hawaiian islands. Instant activation." },
    ja: { title: "ハワイ旅行用eSIMプラン", desc: "ハワイ旅行に最適なeSIM。オアフ・マウイ・ハワイ島など全島対応。QRコードで即時開通。" },
    ko: { title: "하와이 eSIM 플랜", desc: "하와이 여행용 eSIM. 오아후, 마우이, 빅아일랜드 등 전 섬 커버리지. 즉시 활성화." },
    zh: { title: "夏威夷eSIM套餐", desc: "夏威夷旅行eSIM。覆盖欧胡岛、茂宜岛、大岛等全夏威夷群岛。即时开通。" },
  },
  australia: {
    en: { title: "Australia eSIM Plans", desc: "Get Australia eSIM for your trip. 4G/5G coverage across Sydney, Melbourne, Brisbane and major cities. Instant QR code activation." },
    ja: { title: "オーストラリア旅行用eSIMプラン", desc: "オーストラリア旅行に最適なeSIM。シドニー・メルボルン・ブリスベンなど主要都市をカバー。" },
    ko: { title: "호주 eSIM 플랜", desc: "호주 여행용 eSIM. 시드니, 멜버른, 브리즈번 등 주요 도시 4G/5G 커버리지." },
    zh: { title: "澳大利亚eSIM套餐", desc: "澳大利亚旅行eSIM。覆盖悉尼、墨尔本、布里斯班等主要城市。即时开通。" },
  },
  vietnam: {
    en: { title: "Vietnam eSIM Plans", desc: "Get Vietnam eSIM for your trip. Affordable data coverage in Ho Chi Minh City, Hanoi, Da Nang and across Vietnam. Instant activation." },
    ja: { title: "ベトナム旅行用eSIMプラン", desc: "ベトナム旅行に最適なeSIM。ホーチミン・ハノイ・ダナンなどベトナム全土で格安データ通信。" },
    ko: { title: "베트남 eSIM 플랜", desc: "베트남 여행용 eSIM. 호치민, 하노이, 다낭 등 베트남 전역 저렴한 데이터." },
    zh: { title: "越南eSIM套餐", desc: "越南旅行eSIM。覆盖胡志明市、河内、岘港等越南全境。超值套餐即时开通。" },
  },
  indonesia: {
    en: { title: "Indonesia eSIM Plans", desc: "Get Indonesia eSIM for Bali, Jakarta, Lombok and across Indonesia. Fast data coverage, instant QR code activation." },
    ja: { title: "インドネシア旅行用eSIMプラン", desc: "バリ島・ジャカルタ・ロンボクなどインドネシア全域で使えるeSIM。即時開通。" },
    ko: { title: "인도네시아 eSIM 플랜", desc: "발리, 자카르타, 롬복 등 인도네시아 전역 eSIM. 즉시 활성화." },
    zh: { title: "印度尼西亚eSIM套餐", desc: "印度尼西亚旅行eSIM。覆盖巴厘岛、雅加达、龙目岛等全境。即时开通。" },
  },
  "hong-kong": {
    en: { title: "Hong Kong eSIM Plans", desc: "Get Hong Kong eSIM for your trip. Ultra-fast 5G data coverage across the city. Instant QR code activation." },
    ja: { title: "香港旅行用eSIMプラン", desc: "香港旅行に最適なeSIM。市内全域で超高速5G通信。QRコードで即時開通。" },
    ko: { title: "홍콩 eSIM 플랜", desc: "홍콩 여행용 eSIM. 도시 전역 초고속 5G 데이터. QR코드로 즉시 활성화." },
    zh: { title: "香港eSIM套餐", desc: "香港旅行eSIM。全城超高速5G网络覆盖。扫码即开通。" },
  },
  germany: {
    en: { title: "Germany eSIM Plans", desc: "Get Germany eSIM for your trip. Fast data across Berlin, Munich, Hamburg and all of Germany. Instant activation." },
    ja: { title: "ドイツ旅行用eSIMプラン", desc: "ドイツ旅行に最適なeSIM。ベルリン・ミュンヘン・ハンブルクなどドイツ全土で高速通信。" },
    ko: { title: "독일 eSIM 플랜", desc: "독일 여행용 eSIM. 베를린, 뮌헨, 함부르크 등 독일 전역 고속 데이터." },
    zh: { title: "德国eSIM套餐", desc: "德国旅行eSIM。覆盖柏林、慕尼黑、汉堡等全德国高速网络。即时开通。" },
  },
  italy: {
    en: { title: "Italy eSIM Plans", desc: "Get Italy eSIM for your trip. Fast data across Rome, Milan, Florence, Venice and all of Italy. Instant activation." },
    ja: { title: "イタリア旅行用eSIMプラン", desc: "イタリア旅行に最適なeSIM。ローマ・ミラノ・フィレンツェ・ヴェネツィアなどイタリア全土で高速通信。" },
    ko: { title: "이탈리아 eSIM 플랜", desc: "이탈리아 여행용 eSIM. 로마, 밀라노, 피렌체, 베네치아 등 전역 고속 데이터." },
    zh: { title: "意大利eSIM套餐", desc: "意大利旅行eSIM。覆盖罗马、米兰、佛罗伦萨、威尼斯等全意大利。即时开通。" },
  },
  spain: {
    en: { title: "Spain eSIM Plans", desc: "Get Spain eSIM for your trip. Fast data across Madrid, Barcelona, Seville and all of Spain. Instant QR code activation." },
    ja: { title: "スペイン旅行用eSIMプラン", desc: "スペイン旅行に最適なeSIM。マドリード・バルセロナ・セビリアなどスペイン全土で高速通信。" },
    ko: { title: "스페인 eSIM 플랜", desc: "스페인 여행용 eSIM. 마드리드, 바르셀로나, 세비야 등 스페인 전역 고속 데이터." },
    zh: { title: "西班牙eSIM套餐", desc: "西班牙旅行eSIM。覆盖马德里、巴塞罗那、塞维利亚等全西班牙。即时开通。" },
  },
  india: {
    en: { title: "India eSIM Plans", desc: "Get India eSIM for your trip. Data coverage across Delhi, Mumbai, Bangalore and all of India. Instant QR code activation." },
    ja: { title: "インド旅行用eSIMプラン", desc: "インド旅行に最適なeSIM。デリー・ムンバイ・バンガロールなどインド全土で使えるデータ通信。" },
    ko: { title: "인도 eSIM 플랜", desc: "인도 여행용 eSIM. 델리, 뭄바이, 뱅갈로르 등 인도 전역 데이터 커버리지." },
    zh: { title: "印度eSIM套餐", desc: "印度旅行eSIM。覆盖德里、孟买、班加罗尔等印度全境。即时开通。" },
  },
  philippines: {
    en: { title: "Philippines eSIM Plans", desc: "Get Philippines eSIM for Manila, Cebu, Boracay and the islands. Fast data coverage, instant QR code activation." },
    ja: { title: "フィリピン旅行用eSIMプラン", desc: "マニラ・セブ・ボラカイなどフィリピン全土で使えるeSIM。即時開通。" },
    ko: { title: "필리핀 eSIM 플랜", desc: "마닐라, 세부, 보라카이 등 필리핀 전역 eSIM. 즉시 활성화." },
    zh: { title: "菲律宾eSIM套餐", desc: "菲律宾旅行eSIM。覆盖马尼拉、宿雾、长滩岛等全境。即时开通。" },
  },
  malaysia: {
    en: { title: "Malaysia eSIM Plans", desc: "Get Malaysia eSIM for Kuala Lumpur, Penang, Langkawi and across Malaysia. Fast data, instant activation." },
    ja: { title: "マレーシア旅行用eSIMプラン", desc: "クアラルンプール・ペナン・ランカウイなどマレーシア全土で使えるeSIM。即時開通。" },
    ko: { title: "말레이시아 eSIM 플랜", desc: "쿠알라룸푸르, 페낭, 랑카위 등 말레이시아 전역 eSIM. 즉시 활성화." },
    zh: { title: "马来西亚eSIM套餐", desc: "马来西亚旅行eSIM。覆盖吉隆坡、槟城、兰卡威等全境。即时开通。" },
  },
  canada: {
    en: { title: "Canada eSIM Plans", desc: "Get Canada eSIM for your trip. 4G/5G coverage across Toronto, Vancouver, Montreal and all of Canada. Instant activation." },
    ja: { title: "カナダ旅行用eSIMプラン", desc: "カナダ旅行に最適なeSIM。トロント・バンクーバー・モントリオールなどカナダ全土で高速通信。" },
    ko: { title: "캐나다 eSIM 플랜", desc: "캐나다 여행용 eSIM. 토론토, 밴쿠버, 몬트리올 등 전역 4G/5G 커버리지." },
    zh: { title: "加拿大eSIM套餐", desc: "加拿大旅行eSIM。覆盖多伦多、温哥华、蒙特利尔等全加拿大。即时开通。" },
  },
  cambodia: {
    en: { title: "Cambodia eSIM Plans", desc: "Get Cambodia eSIM for Phnom Penh, Siem Reap and Angkor Wat. Reliable 4G data coverage, instant QR code activation." },
    ja: { title: "カンボジア旅行用eSIMプラン", desc: "カンボジア旅行に最適なeSIM。プノンペン・シェムリアップ・アンコールワットで高速通信。" },
    ko: { title: "캄보디아 eSIM 플랜", desc: "캄보디아 여행용 eSIM. 프놈펜, 시엠립, 앙코르와트 등 전역 데이터 커버리지." },
    zh: { title: "柬埔寨eSIM套餐", desc: "柬埔寨旅行eSIM。覆盖金边、暹粒、吴哥窟等全境。即时开通。" },
  },
  greece: {
    en: { title: "Greece eSIM Plans", desc: "Get Greece eSIM for Athens, Santorini, Mykonos, Crete and the Greek islands. EU roaming supported. Instant activation." },
    ja: { title: "ギリシャ旅行用eSIMプラン", desc: "ギリシャ旅行に最適なeSIM。アテネ・サントリーニ・ミコノス・クレタ島など全土で高速通信。" },
    ko: { title: "그리스 eSIM 플랜", desc: "그리스 여행용 eSIM. 아테네, 산토리니, 미코노스, 크레타 등 전역 커버리지. EU 로밍 지원." },
    zh: { title: "希腊eSIM套餐", desc: "希腊旅行eSIM。覆盖雅典、圣托里尼、米科诺斯、克里特岛等全境。支持EU漫游。" },
  },
  mexico: {
    en: { title: "Mexico eSIM Plans", desc: "Get Mexico eSIM for Mexico City, Cancun, Playa del Carmen, Oaxaca and across Mexico. Fast 4G data, instant activation." },
    ja: { title: "メキシコ旅行用eSIMプラン", desc: "メキシコ旅行に最適なeSIM。メキシコシティ・カンクン・プラヤデルカルメンなど全土で高速通信。" },
    ko: { title: "멕시코 eSIM 플랜", desc: "멕시코 여행용 eSIM. 멕시코시티, 칸쿤, 플라야델카르멘 등 전역 고속 데이터." },
    zh: { title: "墨西哥eSIM套餐", desc: "墨西哥旅行eSIM。覆盖墨西哥城、坎昆、普拉亚德尔卡门等全境。即时开通。" },
  },
  "new-zealand": {
    en: { title: "New Zealand eSIM Plans", desc: "Get New Zealand eSIM for Auckland, Wellington, Queenstown and across NZ. Stay connected on your road trip. Instant activation." },
    ja: { title: "ニュージーランド旅行用eSIMプラン", desc: "ニュージーランド旅行に最適なeSIM。オークランド・ウェリントン・クイーンズタウンなど全土カバー。" },
    ko: { title: "뉴질랜드 eSIM 플랜", desc: "뉴질랜드 여행용 eSIM. 오클랜드, 웰링턴, 퀸스타운 등 전역 커버리지." },
    zh: { title: "新西兰eSIM套餐", desc: "新西兰旅行eSIM。覆盖奥克兰、惠灵顿、皇后镇等全境。即时开通。" },
  },
  norway: {
    en: { title: "Norway eSIM Plans", desc: "Get Norway eSIM for Oslo, Bergen, Tromso and the fjords. Fast 4G/5G data. Note: not covered by EU roaming plans." },
    ja: { title: "ノルウェー旅行用eSIMプラン", desc: "ノルウェー旅行に最適なeSIM。オスロ・ベルゲン・トロムソ・フィヨルド地域で高速通信。" },
    ko: { title: "노르웨이 eSIM 플랜", desc: "노르웨이 여행용 eSIM. 오슬로, 베르겐, 트롬쇠, 피오르드 전역 고속 데이터." },
    zh: { title: "挪威eSIM套餐", desc: "挪威旅行eSIM。覆盖奥斯陆、卑尔根、特罗姆瑟和峡湾地区。即时开通。" },
  },
  portugal: {
    en: { title: "Portugal eSIM Plans", desc: "Get Portugal eSIM for Lisbon, Porto, Algarve and across Portugal. EU roaming included. Instant QR code activation." },
    ja: { title: "ポルトガル旅行用eSIMプラン", desc: "ポルトガル旅行に最適なeSIM。リスボン・ポルト・アルガルヴェなど全土で高速通信。EUローミング対応。" },
    ko: { title: "포르투갈 eSIM 플랜", desc: "포르투갈 여행용 eSIM. 리스본, 포르투, 알가르브 등 전역 커버리지. EU 로밍 지원." },
    zh: { title: "葡萄牙eSIM套餐", desc: "葡萄牙旅行eSIM。覆盖里斯本、波尔图、阿尔加维等全境。支持EU漫游。即时开通。" },
  },
  switzerland: {
    en: { title: "Switzerland eSIM Plans", desc: "Get Switzerland eSIM for Zurich, Geneva, Bern, Interlaken and the Alps. Note: not covered by EU roaming plans." },
    ja: { title: "スイス旅行用eSIMプラン", desc: "スイス旅行に最適なeSIM。チューリッヒ・ジュネーブ・インターラーケン・アルプス地域で高速通信。" },
    ko: { title: "스위스 eSIM 플랜", desc: "스위스 여행용 eSIM. 취리히, 제네바, 인터라켄, 알프스 전역 고속 데이터." },
    zh: { title: "瑞士eSIM套餐", desc: "瑞士旅行eSIM。覆盖苏黎世、日内瓦、因特拉肯和阿尔卑斯山区。即时开通。" },
  },
  morocco: {
    en: { title: "Morocco eSIM Plans", desc: "Get Morocco eSIM for Marrakech, Fes, Casablanca and across Morocco. Stay connected in the medinas. Instant activation." },
    ja: { title: "モロッコ旅行用eSIMプラン", desc: "モロッコ旅行に最適なeSIM。マラケシュ・フェズ・カサブランカなどモロッコ全土で通信。" },
    ko: { title: "모로코 eSIM 플랜", desc: "모로코 여행용 eSIM. 마라케시, 페스, 카사블랑카 등 전역 데이터 커버리지." },
    zh: { title: "摩洛哥eSIM套餐", desc: "摩洛哥旅行eSIM。覆盖马拉喀什、非斯、卡萨布兰卡等全境。即时开通。" },
  },
  turkey: {
    en: { title: "Turkey eSIM Plans", desc: "Get Turkey eSIM for Istanbul, Antalya, Cappadocia and across Turkey. Fast 4G/5G data, instant QR code activation." },
    ja: { title: "トルコ旅行用eSIMプラン", desc: "トルコ旅行に最適なeSIM。イスタンブール・アンタルヤ・カッパドキアなどトルコ全土で高速通信。" },
    ko: { title: "터키 eSIM 플랜", desc: "터키 여행용 eSIM. 이스탄불, 안탈리아, 카파도키아 등 전역 고속 데이터." },
    zh: { title: "土耳其eSIM套餐", desc: "土耳其旅行eSIM。覆盖伊斯坦布尔、安塔利亚、卡帕多西亚等全境。即时开通。" },
  },
  "sri-lanka": {
    en: { title: "Sri Lanka eSIM Plans", desc: "Get Sri Lanka eSIM for Colombo, Kandy, Galle and across Sri Lanka. Affordable data plans, instant activation." },
    ja: { title: "スリランカ旅行用eSIMプラン", desc: "スリランカ旅行に最適なeSIM。コロンボ・キャンディ・ゴールなどスリランカ全土で通信。" },
    ko: { title: "스리랑카 eSIM 플랜", desc: "스리랑카 여행용 eSIM. 콜롬보, 캔디, 갈레 등 전역 데이터 커버리지." },
    zh: { title: "斯里兰卡eSIM套餐", desc: "斯里兰卡旅行eSIM。覆盖科伦坡、康提、加勒等全境。即时开通。" },
  },
  iceland: {
    en: { title: "Iceland eSIM Plans", desc: "Get Iceland eSIM for Reykjavik, the Golden Circle, Ring Road and across Iceland. Stay connected on your adventure." },
    ja: { title: "アイスランド旅行用eSIMプラン", desc: "アイスランド旅行に最適なeSIM。レイキャビク・ゴールデンサークル・リングロードで通信。" },
    ko: { title: "아이슬란드 eSIM 플랜", desc: "아이슬란드 여행용 eSIM. 레이캬비크, 골든서클, 링로드 전역 커버리지." },
    zh: { title: "冰岛eSIM套餐", desc: "冰岛旅行eSIM。覆盖雷克雅未克、黄金圈、环岛公路等。即时开通。" },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; countrySlug: string }>;
}): Promise<Metadata> {
  const { locale, countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    return {};
  }

  const countryName = getCountryName(country, locale);
  const customMeta = COUNTRY_META[countrySlug]?.[locale];
  const fallback = META_FALLBACK[locale] ?? META_FALLBACK.en;

  return generatePageMetadata({
    locale: locale as Locale,
    path: `/esim/${countrySlug}`,
    title: customMeta?.title
      ? `${customMeta.title} | AutoWiFi eSIM`
      : `${fallback.title(countryName)} | AutoWiFi eSIM`,
    description: customMeta?.desc ?? fallback.desc(countryName),
  });
}

export default async function CountryPackagesPage({
  params,
}: {
  params: Promise<{ locale: string; countrySlug: string }>;
}) {
  const { locale, countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    notFound();
  }

  const labels = LABELS[locale] ?? LABELS.en;
  const countryName = getCountryName(country, locale);

  // AiraloPackage has: id (string), title, data (string e.g. "1 GB"), validity (number), price (number), operator ({title})
  let packages: CountryPackage[] = [];

  try {
    const env = await getEnv();
    const client = getAiraloClient(env);
    const result = await client.getPackages(country.code);
    packages = (result ?? []).map((p) => ({
      id: p.id,
      title: p.title,
      data: p.data,
      validity: p.validity,
      price: p.price,
      operator: p.operator.title,
    }));
  } catch {
    // Packages unavailable - will show empty state
  }

  const BASE_URL = getBaseUrl();
  const countryPageUrl = `${BASE_URL}/${locale}/esim/${countrySlug}`;
  const productImageUrl = `${BASE_URL}/opengraph-image`;
  const seoContent = getCountrySeoContent({
    locale,
    countryName,
    continent: country.continent,
    packages,
  });
  const comparisonRows = buildPackageComparisonRows(locale, packages);
  const comparisonText =
    COUNTRY_COMPARISON_TEXT[locale] ?? COUNTRY_COMPARISON_TEXT.en;
  const relatedLinks = getRelatedLinks(locale, countryName, countrySlug);
  const ui = COUNTRY_PAGE_UI[locale] ?? COUNTRY_PAGE_UI.en;
  const cheapestPackage = packages.reduce<CountryPackage | null>(
    (current, pkg) => (!current || pkg.price < current.price ? pkg : current),
    null,
  );
  const longestPackage = packages.reduce<CountryPackage | null>(
    (current, pkg) =>
      !current || pkg.validity > current.validity ? pkg : current,
    null,
  );
  const bestValuePackage = comparisonRows.reduce<PackageComparisonRow | null>(
    (current, row) =>
      !current || row.pricePerDay < current.pricePerDay ? row : current,
    null,
  );
  const heroStats = [
    {
      label: ui.plansAvailable,
      value: String(packages.length),
      detail:
        packages.length > 0
          ? formatAvailablePlans(locale, packages.length)
          : ui.refreshSoon,
    },
    {
      label: ui.startingAt,
      value: cheapestPackage ? formatUsd(locale, cheapestPackage.price) : "—",
      detail: cheapestPackage
        ? `${cheapestPackage.data} / ${cheapestPackage.validity} ${labels.days}`
        : ui.refreshSoon,
    },
    {
      label: ui.longestCoverage,
      value: longestPackage
        ? `${longestPackage.validity} ${labels.days}`
        : "—",
      detail: longestPackage ? longestPackage.title : ui.refreshSoon,
    },
  ];

  return (
    <>
      {packages.length > 0 && (
        <ItemListJsonLd
          items={packages.map((pkg, index) => ({
            name: `${countryName} eSIM - ${pkg.title}`,
            url: `${countryPageUrl}#plan-${pkg.id}`,
            position: index + 1,
          }))}
        />
      )}
      <BreadcrumbJsonLd
        items={[
          { name: labels.breadcrumbHome, url: `${BASE_URL}/${locale}` },
          { name: labels.breadcrumbEsim, url: `${BASE_URL}/${locale}/esim` },
          { name: countryName, url: countryPageUrl },
        ]}
      />
      <FaqJsonLd items={seoContent.faqItems} />

      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <nav className={styles.breadcrumb}>
            <a href={`/${locale}`}>{labels.breadcrumbHome}</a>
            <span className={styles.breadcrumbSep}>/</span>
            <a href={`/${locale}/esim`}>{labels.breadcrumbEsim}</a>
            <span className={styles.breadcrumbSep}>/</span>
            <span>{countryName}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.pageEyebrow}>{ui.eyebrow}</span>
              <div className={styles.heroTitleRow}>
                <span className={styles.countryFlag}>{country.flag}</span>
                <div className={styles.headerText}>
                  <h1>{countryName} {labels.esimPlans}</h1>
                  <p className={styles.heroSubtitle}>
                    {ui.heroSubtitle(countryName)}
                  </p>
                </div>
              </div>

              <div className={styles.heroActions}>
                {packages.length > 0 && (
                  <a href="#plans" className={styles.primaryAction}>
                    {ui.primaryCta}
                  </a>
                )}
                {comparisonRows.length > 0 && (
                  <a href="#comparison" className={styles.secondaryAction}>
                    {ui.secondaryCta}
                  </a>
                )}
              </div>
            </div>

            <aside className={styles.heroPanel}>
              <div className={styles.statGrid}>
                {heroStats.map((stat) => (
                  <div key={stat.label} className={styles.statCard}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <strong className={styles.statValue}>{stat.value}</strong>
                    <span className={styles.statDetail}>{stat.detail}</span>
                  </div>
                ))}
              </div>
              <div className={styles.heroNote}>
                <strong>{ui.installTitle}</strong>
                <p>{ui.installBody(countryName)}</p>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {packages.length > 0 ? (
          <section id="plans" className={styles.sectionBlock}>
            <div className={styles.sectionTop}>
              <div>
                <span className={styles.sectionEyebrow}>{ui.plansEyebrow}</span>
                <h2 className={styles.sectionTitle}>{ui.plansTitle(countryName)}</h2>
              </div>
              <p className={styles.sectionLead}>{ui.plansLead}</p>
            </div>

            <div className={styles.packagesGrid}>
              {packages.map((pkg) => {
                const badge = getPackageBadge({
                  locale,
                  packageId: pkg.id,
                  cheapestId: cheapestPackage?.id,
                  bestValueId: bestValuePackage?.id,
                  longestId: longestPackage?.id,
                });
                const dailyRate = pkg.price / Math.max(pkg.validity, 1);

                return (
                  <div key={pkg.id} id={`plan-${pkg.id}`} className={styles.packageCard}>
                    <ProductJsonLd
                      name={`${countryName} eSIM - ${pkg.title}`}
                      description={getProductDescription(locale, countryName, pkg)}
                      image={productImageUrl}
                      sku={pkg.id}
                      mpn={pkg.id}
                      price={pkg.price}
                      priceCurrency="USD"
                      seller="AutoWiFi Travel"
                      brand="AutoWiFi Travel"
                      url={`${countryPageUrl}#plan-${pkg.id}`}
                    />

                    <div className={styles.packageHeader}>
                      <div className={styles.packageMeta}>
                        {badge && (
                          <span className={styles.packageBadge}>{badge}</span>
                        )}
                        <div className={styles.packageOperator}>{pkg.operator}</div>
                      </div>
                      <div className={styles.packageTitle}>{pkg.title}</div>
                    </div>

                    <div className={styles.packageBody}>
                      <div className={styles.packageDetails}>
                        <div className={styles.packageDetail}>
                          <span className={styles.packageDetailLabel}>{labels.data}</span>
                          <span className={styles.packageDetailValue}>{pkg.data}</span>
                        </div>
                        <div className={styles.packageDetail}>
                          <span className={styles.packageDetailLabel}>{labels.validity}</span>
                          <span className={styles.packageDetailValue}>
                            {pkg.validity} {labels.days}
                          </span>
                        </div>
                      </div>

                      <div className={styles.packageUseCase}>
                        <span className={styles.packageUseCaseLabel}>{ui.idealFor}</span>
                        <strong>{getPackageUseCase(locale, pkg)}</strong>
                      </div>

                      <div className={styles.packagePriceRow}>
                        <div className={styles.packagePrice}>
                          <span className={styles.priceAmount}>
                            ${pkg.price.toFixed(2)}
                          </span>
                          <span className={styles.priceCurrency}>USD</span>
                        </div>
                        <span className={styles.packageDailyRate}>
                          {ui.pricePerDay}: ${dailyRate.toFixed(2)}
                        </span>
                      </div>

                      <a
                        href={`/${locale}/esim/${countrySlug}/${pkg.id}/checkout`}
                        className={styles.buyButton}
                      >
                        {labels.buyNow}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <div className={styles.noPackages}>
            <span className={styles.noPackagesIcon}>&#x1F4E6;</span>
            <h2 className={styles.noPackagesTitle}>{labels.noPackagesTitle}</h2>
            <p className={styles.noPackagesText}>{labels.noPackagesText}</p>
            <a href={`/${locale}/esim`} className={styles.backLink}>
              &larr; {labels.backToList}
            </a>
          </div>
        )}

        {comparisonRows.length > 0 && (
          <section id="comparison" className={styles.comparisonSection}>
            <span className={styles.sectionEyebrow}>{ui.compareEyebrow}</span>
            <h2 className={styles.sectionTitle}>{comparisonText.title}</h2>
            <p className={styles.comparisonIntro}>
              {comparisonText.intro(countryName)}
            </p>
            <div className={styles.comparisonTableWrapper}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>{comparisonText.headers.plan}</th>
                    <th>{comparisonText.headers.data}</th>
                    <th>{comparisonText.headers.validity}</th>
                    <th>{comparisonText.headers.price}</th>
                    <th>{comparisonText.headers.pricePerDay}</th>
                    <th>{comparisonText.headers.bestFor}</th>
                    <th>{comparisonText.headers.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.id}>
                      <td data-label={comparisonText.headers.plan}>{row.title}</td>
                      <td data-label={comparisonText.headers.data}>{row.data}</td>
                      <td data-label={comparisonText.headers.validity}>
                        {row.validity} {labels.days}
                      </td>
                      <td data-label={comparisonText.headers.price}>${row.price.toFixed(2)}</td>
                      <td data-label={comparisonText.headers.pricePerDay}>${row.pricePerDay.toFixed(2)}</td>
                      <td data-label={comparisonText.headers.bestFor}>{row.bestFor}</td>
                      <td data-label={comparisonText.headers.action}>
                        <a
                          href={`/${locale}/esim/${countrySlug}/${row.id}/checkout`}
                          className={styles.comparisonAction}
                        >
                          {labels.buyNow}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className={styles.seoSection}>
          <div className={styles.seoCopy}>
            <h2 className={styles.sectionTitle}>{seoContent.overviewTitle}</h2>
            {seoContent.overviewParagraphs.map((paragraph) => (
              <p key={paragraph} className={styles.seoParagraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.highlightGrid}>
            {seoContent.highlights.map((highlight) => (
              <article key={highlight.title} className={styles.highlightCard}>
                <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                <p className={styles.highlightDescription}>{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.resourcesSection}>
          <span className={styles.sectionEyebrow}>{ui.resourcesEyebrow}</span>
          <h2 className={styles.sectionTitle}>{relatedLinks.title}</h2>
          <div className={styles.resourceGrid}>
            {relatedLinks.links.map((link) => (
              <Link key={link.href} href={link.href} className={styles.resourceCard}>
                <span className={styles.resourceTitle}>{link.title}</span>
                <p className={styles.resourceDescription}>{link.description}</p>
                <span className={styles.resourceArrow}>&rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.faqSection}>
          <span className={styles.sectionEyebrow}>{ui.faqEyebrow}</span>
          <h2 className={styles.sectionTitle}>{seoContent.faqTitle}</h2>
          <div className={styles.faqList}>
            {seoContent.faqItems.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
