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
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref: string;
  secondaryHref: string;
  stats: {
    countries: string;
    compare: string;
    activation: string;
  };
  searchTitle: string;
  searchLead: string;
  searchResultsLabel: string;
  searchCardCta: string;
  searchPlaceholder: string;
  noResults: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  en: {
    eyebrow: "Travel eSIM finder",
    title: "eSIM Plans by Country",
    subtitle: "Choose your destination, compare popular routes, and move from research to purchase in a few clicks.",
    primaryCta: "Find your country",
    secondaryCta: "How eSIM setup works",
    primaryHref: "#country-search",
    secondaryHref: "/guide/how-to-setup-esim",
    stats: {
      countries: "countries ready to browse",
      compare: "popular routes compared",
      activation: "instant QR delivery",
    },
    searchTitle: "Search countries and jump straight to plans",
    searchLead: "Use search when you already know the destination, or browse by continent if you are still comparing options.",
    searchResultsLabel: "matching destinations",
    searchCardCta: "Open plans",
    searchPlaceholder: "Search countries...",
    noResults: "No countries found matching your search.",
    metaTitle: "eSIM Plans for 200+ Countries | AutoWiFi eSIM",
    metaDescription: "Browse affordable eSIM data plans for over 200 countries. Instant activation, no physical SIM needed.",
  },
  ja: {
    eyebrow: "海外旅行eSIM検索",
    title: "国別eSIMプラン",
    subtitle: "渡航先を探し、主要ルートを比較し、そのまま購入ページまで迷わず進める構成にしています。",
    primaryCta: "渡航先を探す",
    secondaryCta: "設定方法を見る",
    primaryHref: "#country-search",
    secondaryHref: "/guide/how-to-setup-esim",
    stats: {
      countries: "以上の国を掲載",
      compare: "主要渡航先を比較",
      activation: "QRコードで即時開通",
    },
    searchTitle: "国名からすぐにプランを探す",
    searchLead: "渡航先が決まっている場合は検索、まだ迷っている場合は地域別一覧から選ぶと比較しやすいです。",
    searchResultsLabel: "件の候補",
    searchCardCta: "プランを見る",
    searchPlaceholder: "国名で検索...",
    noResults: "検索に一致する国が見つかりませんでした。",
    metaTitle: "200以上の国のeSIMプラン | AutoWiFi eSIM",
    metaDescription: "200以上の国のお手頃なeSIMデータプランをご覧ください。即時アクティベーション、物理SIM不要。",
  },
  ko: {
    eyebrow: "여행 eSIM 찾기",
    title: "국가별 eSIM 플랜",
    subtitle: "목적지를 찾고, 인기 노선을 비교하고, 바로 구매 페이지까지 자연스럽게 이동할 수 있도록 구성했습니다.",
    primaryCta: "목적지 찾기",
    secondaryCta: "설정 가이드 보기",
    primaryHref: "#country-search",
    secondaryHref: "/guide/how-to-setup-esim",
    stats: {
      countries: "개 이상 국가 제공",
      compare: "인기 여행지 비교",
      activation: "QR 즉시 개통",
    },
    searchTitle: "국가를 검색해 바로 플랜 보기",
    searchLead: "이미 여행지가 정해졌다면 검색을, 아직 비교 중이라면 대륙별 목록을 먼저 보는 편이 빠릅니다.",
    searchResultsLabel: "개 검색 결과",
    searchCardCta: "플랜 보기",
    searchPlaceholder: "국가 검색...",
    noResults: "검색과 일치하는 국가가 없습니다.",
    metaTitle: "200개 이상 국가의 eSIM 플랜 | AutoWiFi eSIM",
    metaDescription: "200개 이상 국가의 합리적인 eSIM 데이터 플랜을 찾아보세요. 즉시 활성화, 물리적 SIM 불필요.",
  },
  zh: {
    eyebrow: "旅行 eSIM 选择器",
    title: "各国eSIM套餐",
    subtitle: "先找目的地，再对比热门线路，然后顺着页面直接进入购买流程，减少选择成本。",
    primaryCta: "查找目的地",
    secondaryCta: "查看安装方法",
    primaryHref: "#country-search",
    secondaryHref: "/guide/how-to-setup-esim",
    stats: {
      countries: "多个国家可选",
      compare: "热门目的地已对比",
      activation: "扫码即可开通",
    },
    searchTitle: "搜索国家并直接进入套餐页",
    searchLead: "如果目的地已经确定，可以直接搜索；如果还在比较，先按洲浏览会更快。",
    searchResultsLabel: "个匹配目的地",
    searchCardCta: "查看套餐",
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
  const primaryHref = content.primaryHref.startsWith("/")
    ? `/${locale}${content.primaryHref}`
    : content.primaryHref;
  const secondaryHref = content.secondaryHref.startsWith("/")
    ? `/${locale}${content.secondaryHref}`
    : content.secondaryHref;

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

      <nav className={styles.breadcrumb}>
        <Link href={`/${locale}`} className={styles.breadcrumbLink}>{bl.home}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{bl.esim}</span>
      </nav>

      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <span className={styles.pageEyebrow}>{content.eyebrow}</span>
          <h1 className={styles.pageTitle}>{content.title}</h1>
          <p className={styles.pageSubtitle}>{content.subtitle}</p>
          <div className={styles.heroActions}>
            <Link href={primaryHref} className={styles.primaryAction}>
              {content.primaryCta} &rarr;
            </Link>
            <Link href={secondaryHref} className={styles.secondaryAction}>
              {content.secondaryCta} &rarr;
            </Link>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{countries.length}+</span>
              <span className={styles.statLabel}>{content.stats.countries}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{featuredComparison.rows.length}</span>
              <span className={styles.statLabel}>{content.stats.compare}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>24/7</span>
              <span className={styles.statLabel}>{content.stats.activation}</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.comparisonSection}>
        <div className={styles.comparisonInner}>
          <div className={styles.sectionTop}>
            <span className={styles.sectionEyebrow}>{content.title}</span>
          </div>
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

      <section id="country-search" className={styles.searchSection}>
        <div className={styles.searchSectionInner}>
          <div className={styles.sectionTop}>
            <span className={styles.sectionEyebrow}>{content.eyebrow}</span>
          </div>
          <h2 className={styles.searchTitle}>{content.searchTitle}</h2>
          <p className={styles.searchLead}>{content.searchLead}</p>
        </div>
      </section>

      <CountrySearch
        countries={countries}
        locale={locale}
        labels={{
          searchTitle: content.searchTitle,
          searchLead: content.searchLead,
          resultsLabel: content.searchResultsLabel,
          cardCta: content.searchCardCta,
          searchPlaceholder: content.searchPlaceholder,
          noResults: content.noResults,
          continents: CONTINENT_LABELS[locale] ?? CONTINENT_LABELS.en,
        }}
      />
    </>
  );
}
