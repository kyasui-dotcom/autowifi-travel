import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getAllCountries, getCountryName } from "@/lib/countries";
import { ItemListJsonLd } from "@/lib/components/JsonLd";
import type { Locale } from "@/lib/i18n/config";
import CountrySearch from "./CountrySearch";
import styles from "./page.module.css";

const PAGE_CONTENT: Record<string, {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  noResults: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  en: {
    title: "eSIM Plans by Country",
    subtitle: "Choose your destination and find the perfect data plan",
    searchPlaceholder: "Search countries...",
    noResults: "No countries found matching your search.",
    metaTitle: "eSIM Plans for 200+ Countries | AutoWiFi eSIM",
    metaDescription: "Browse affordable eSIM data plans for over 200 countries. Instant activation, no physical SIM needed.",
  },
  ja: {
    title: "国別eSIMプラン",
    subtitle: "渡航先を選んで最適なデータプランを見つけましょう",
    searchPlaceholder: "国名で検索...",
    noResults: "検索に一致する国が見つかりませんでした。",
    metaTitle: "200以上の国のeSIMプラン | AutoWiFi eSIM",
    metaDescription: "200以上の国のお手頃なeSIMデータプランをご覧ください。即時アクティベーション、物理SIM不要。",
  },
  ko: {
    title: "국가별 eSIM 플랜",
    subtitle: "목적지를 선택하고 완벽한 데이터 플랜을 찾으세요",
    searchPlaceholder: "국가 검색...",
    noResults: "검색과 일치하는 국가가 없습니다.",
    metaTitle: "200개 이상 국가의 eSIM 플랜 | AutoWiFi eSIM",
    metaDescription: "200개 이상 국가의 합리적인 eSIM 데이터 플랜을 찾아보세요. 즉시 활성화, 물리적 SIM 불필요.",
  },
  zh: {
    title: "各国eSIM套餐",
    subtitle: "选择您的目的地，找到完美的数据套餐",
    searchPlaceholder: "搜索国家...",
    noResults: "未找到匹配的国家。",
    metaTitle: "200多个国家的eSIM套餐 | AutoWiFi eSIM",
    metaDescription: "浏览200多个国家的实惠eSIM数据套餐。即时激活，无需实体SIM卡。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = PAGE_CONTENT[locale] ?? PAGE_CONTENT.en;

  return generatePageMetadata({
    locale: locale as Locale,
    path: "/esim",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function EsimListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = PAGE_CONTENT[locale] ?? PAGE_CONTENT.en;

  const allCountries = getAllCountries();

  // Map countries to the shape the client component expects
  const countries = allCountries.map((c) => ({
    slug: c.slug,
    name: getCountryName(c, locale),
    flag: c.flag,
    continent: c.continent,
  }));

  const BASE_URL = "https://autowifi-travel.com";

  return (
    <>
      <ItemListJsonLd
        items={countries.map((c, i) => ({
          name: c.name,
          url: `${BASE_URL}/${locale}/esim/${c.slug}`,
          position: i + 1,
        }))}
      />

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{content.title}</h1>
        <p className={styles.pageSubtitle}>{content.subtitle}</p>
      </div>

      <CountrySearch
        countries={countries}
        locale={locale}
        labels={{
          searchPlaceholder: content.searchPlaceholder,
          noResults: content.noResults,
        }}
      />
    </>
  );
}
