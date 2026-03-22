import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getAllCountries, getCountryName } from "@/lib/countries";
import Link from "next/link";
import { ItemListJsonLd, BreadcrumbJsonLd } from "@/lib/components/JsonLd";
import type { Locale } from "@/lib/i18n/config";
import CountrySearch from "./CountrySearch";
import styles from "./page.module.css";

const CONTINENT_LABELS: Record<string, Record<string, string>> = {
  en: {
    "Asia": "Asia",
    "Europe": "Europe",
    "North America": "North America",
    "South America": "South America",
    "Oceania": "Oceania",
    "Middle East": "Middle East",
    "Africa": "Africa",
  },
  ja: {
    "Asia": "アジア",
    "Europe": "ヨーロッパ",
    "North America": "北アメリカ",
    "South America": "南アメリカ",
    "Oceania": "オセアニア",
    "Middle East": "中東",
    "Africa": "アフリカ",
  },
  ko: {
    "Asia": "아시아",
    "Europe": "유럽",
    "North America": "북아메리카",
    "South America": "남아메리카",
    "Oceania": "오세아니아",
    "Middle East": "중동",
    "Africa": "아프리카",
  },
  zh: {
    "Asia": "亚洲",
    "Europe": "欧洲",
    "North America": "北美洲",
    "South America": "南美洲",
    "Oceania": "大洋洲",
    "Middle East": "中东",
    "Africa": "非洲",
  },
};

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

const FEATURED_COMPARISON: Record<string, {
  title: string;
  intro: string;
  linkLabel: string;
  headers: {
    destination: string;
    idealFor: string;
    tripLength: string;
    dataNeed: string;
    note: string;
  };
  rows: Array<{
    slug: string;
    idealFor: string;
    tripLength: string;
    dataNeed: string;
    note: string;
  }>;
}> = {
  en: {
    title: "Compare top travel eSIM destinations",
    intro: "Start with the destinations travelers search most before buying. This table helps you choose the right country page faster.",
    linkLabel: "See plans",
    headers: {
      destination: "Destination",
      idealFor: "Best for",
      tripLength: "Typical stay",
      dataNeed: "Recommended data",
      note: "What to expect",
    },
    rows: [
      { slug: "japan", idealFor: "City trips and rail travel", tripLength: "3-10 days", dataNeed: "3-10 GB", note: "Best if you need maps, transit apps, and stable data from arrival." },
      { slug: "south-korea", idealFor: "Fast urban travel", tripLength: "2-7 days", dataNeed: "3-8 GB", note: "Useful for Seoul, Busan, and frequent 5G use during short stays." },
      { slug: "taiwan", idealFor: "Food trips and short getaways", tripLength: "3-7 days", dataNeed: "3-6 GB", note: "A strong fit if you rely on navigation, messaging, and cashless apps." },
      { slug: "thailand", idealFor: "Island hopping and long weekends", tripLength: "4-10 days", dataNeed: "5-10 GB", note: "Choose more data if you expect hotspot use or heavy social posting." },
      { slug: "singapore", idealFor: "Business and stopovers", tripLength: "1-5 days", dataNeed: "2-5 GB", note: "Short stays usually work well with small plans and fast network coverage." },
      { slug: "united-states", idealFor: "Road trips and multi-city travel", tripLength: "7-21 days", dataNeed: "10-20 GB", note: "Long distances and tethering needs often make bigger plans worthwhile." },
    ],
  },
  ja: {
    title: "主要渡航先のeSIM比較",
    intro: "購入前の検索が特に多い渡航先を先に比較できる表です。どの国のLPを見るべきかをすぐ判断しやすくします。",
    linkLabel: "プランを見る",
    headers: {
      destination: "渡航先",
      idealFor: "向いている旅行",
      tripLength: "目安日数",
      dataNeed: "おすすめ容量",
      note: "選び方のメモ",
    },
    rows: [
      { slug: "japan", idealFor: "都市観光・鉄道移動", tripLength: "3〜10日", dataNeed: "3〜10GB", note: "地図、乗換案内、決済アプリをよく使う旅行に向いています。" },
      { slug: "south-korea", idealFor: "短期の都市旅行", tripLength: "2〜7日", dataNeed: "3〜8GB", note: "ソウルや釜山を中心に、短期間でも高速通信を使いたい人向けです。" },
      { slug: "taiwan", idealFor: "週末旅行・グルメ旅", tripLength: "3〜7日", dataNeed: "3〜6GB", note: "マップ、メッセージ、キャッシュレス決済中心なら選びやすい容量です。" },
      { slug: "thailand", idealFor: "周遊・リゾート旅行", tripLength: "4〜10日", dataNeed: "5〜10GB", note: "SNS投稿やテザリングを使うなら少し余裕のある容量が安心です。" },
      { slug: "singapore", idealFor: "出張・乗継", tripLength: "1〜5日", dataNeed: "2〜5GB", note: "短期滞在なら小さめのプランでも十分なことが多いです。" },
      { slug: "united-states", idealFor: "ロードトリップ・複数都市", tripLength: "7〜21日", dataNeed: "10〜20GB", note: "移動距離が長く、テザリングも使うなら大きめプランが向いています。" },
    ],
  },
  ko: {
    title: "주요 여행지 eSIM 비교",
    intro: "구매 직전에 많이 찾는 주요 목적지를 먼저 비교할 수 있는 표입니다. 어떤 국가 페이지를 먼저 볼지 빠르게 정하기 좋습니다.",
    linkLabel: "플랜 보기",
    headers: {
      destination: "목적지",
      idealFor: "추천 여행 유형",
      tripLength: "추천 일정",
      dataNeed: "권장 데이터",
      note: "선택 팁",
    },
    rows: [
      { slug: "japan", idealFor: "도시 여행·철도 이동", tripLength: "3~10일", dataNeed: "3~10GB", note: "지도, 교통 앱, 결제 앱을 자주 쓰는 여행에 잘 맞습니다." },
      { slug: "south-korea", idealFor: "짧은 도시 여행", tripLength: "2~7일", dataNeed: "3~8GB", note: "서울·부산처럼 짧은 일정에도 빠른 데이터를 원할 때 좋습니다." },
      { slug: "taiwan", idealFor: "주말 여행·미식 여행", tripLength: "3~7일", dataNeed: "3~6GB", note: "지도와 메신저, 간편결제를 중심으로 쓰는 일정에 적합합니다." },
      { slug: "thailand", idealFor: "리조트·다도해 이동", tripLength: "4~10일", dataNeed: "5~10GB", note: "SNS 업로드나 테더링이 많다면 넉넉한 용량이 좋습니다." },
      { slug: "singapore", idealFor: "출장·경유", tripLength: "1~5일", dataNeed: "2~5GB", note: "짧은 일정은 소용량 플랜으로도 충분한 경우가 많습니다." },
      { slug: "united-states", idealFor: "로드트립·다도시 여행", tripLength: "7~21일", dataNeed: "10~20GB", note: "이동이 많고 핫스팟이 필요하면 큰 플랜이 더 안정적입니다." },
    ],
  },
  zh: {
    title: "热门目的地 eSIM 对比",
    intro: "先对比购买前最常搜索的几个目的地，更快判断应该先看哪一个国家页面。",
    linkLabel: "查看套餐",
    headers: {
      destination: "目的地",
      idealFor: "适合的出行类型",
      tripLength: "常见行程",
      dataNeed: "推荐流量",
      note: "选择建议",
    },
    rows: [
      { slug: "japan", idealFor: "城市观光与铁路出行", tripLength: "3-10天", dataNeed: "3-10GB", note: "如果会频繁使用地图、交通和支付应用，日本页值得优先查看。" },
      { slug: "south-korea", idealFor: "短途城市旅行", tripLength: "2-7天", dataNeed: "3-8GB", note: "首尔、釜山等短住行程，通常更看重落地即用和高速网络。" },
      { slug: "taiwan", idealFor: "周末旅行与美食行程", tripLength: "3-7天", dataNeed: "3-6GB", note: "以导航、聊天和移动支付为主时，中小流量通常够用。" },
      { slug: "thailand", idealFor: "海岛与度假旅行", tripLength: "4-10天", dataNeed: "5-10GB", note: "如果要频繁发图、看视频或开热点，建议选更大流量。" },
      { slug: "singapore", idealFor: "出差与转机停留", tripLength: "1-5天", dataNeed: "2-5GB", note: "短停留常见需求不高，小套餐往往就足够。" },
      { slug: "united-states", idealFor: "自驾和多城市行程", tripLength: "7-21天", dataNeed: "10-20GB", note: "美国旅行跨度大，若要热点共享，通常更适合大流量套餐。" },
    ],
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
  const featuredComparison =
    FEATURED_COMPARISON[locale] ?? FEATURED_COMPARISON.en;

  const BASE_URL = "https://autowifi-travel.com";

  const breadcrumbLabels: Record<string, { home: string; esim: string }> = {
    en: { home: "Home", esim: "eSIM Plans" },
    ja: { home: "ホーム", esim: "eSIMプラン" },
    ko: { home: "홈", esim: "eSIM 플랜" },
    zh: { home: "首页", esim: "eSIM套餐" },
  };
  const bl = breadcrumbLabels[locale] || breadcrumbLabels.en;

  return (
    <>
      <ItemListJsonLd
        items={countries.map((c, i) => ({
          name: c.name,
          url: `${BASE_URL}/${locale}/esim/${c.slug}`,
          position: i + 1,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: bl.home, url: `${BASE_URL}/${locale}` },
          { name: bl.esim, url: `${BASE_URL}/${locale}/esim` },
        ]}
      />

      <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem 1rem 0", fontSize: "0.875rem", color: "#6b7280" }}>
        <Link href={`/${locale}`} style={{ color: "#6366f1", textDecoration: "none" }}>{bl.home}</Link>
        <span style={{ margin: "0 0.5rem" }}>/</span>
        <span>{bl.esim}</span>
      </nav>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{content.title}</h1>
        <p className={styles.pageSubtitle}>{content.subtitle}</p>
      </div>

      <section className={styles.comparisonSection}>
        <div className={styles.comparisonInner}>
          <h2 className={styles.comparisonTitle}>{featuredComparison.title}</h2>
          <p className={styles.comparisonIntro}>{featuredComparison.intro}</p>
          <div className={styles.comparisonTableWrapper}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>{featuredComparison.headers.destination}</th>
                  <th>{featuredComparison.headers.idealFor}</th>
                  <th>{featuredComparison.headers.tripLength}</th>
                  <th>{featuredComparison.headers.dataNeed}</th>
                  <th>{featuredComparison.headers.note}</th>
                </tr>
              </thead>
              <tbody>
                {featuredComparison.rows.map((row) => {
                  const country = countries.find((item) => item.slug === row.slug);
                  if (!country) return null;

                  return (
                    <tr key={row.slug}>
                      <td>
                        <Link href={`/${locale}/esim/${row.slug}`} className={styles.comparisonDestination}>
                          <span className={styles.comparisonFlag}>{country.flag}</span>
                          <span>{country.name}</span>
                        </Link>
                      </td>
                      <td>{row.idealFor}</td>
                      <td>{row.tripLength}</td>
                      <td>{row.dataNeed}</td>
                      <td>
                        <span className={styles.comparisonNote}>{row.note}</span>
                        <Link href={`/${locale}/esim/${row.slug}`} className={styles.comparisonLink}>
                          {featuredComparison.linkLabel}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CountrySearch
        countries={countries}
        locale={locale}
        labels={{
          searchPlaceholder: content.searchPlaceholder,
          noResults: content.noResults,
          continents: CONTINENT_LABELS[locale] ?? CONTINENT_LABELS.en,
        }}
      />
    </>
  );
}
