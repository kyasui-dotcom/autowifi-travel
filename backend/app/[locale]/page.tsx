import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import styles from "./page.module.css";

const POPULAR_DESTINATIONS = [
  { slug: "japan", flag: "\u{1F1EF}\u{1F1F5}", nameKey: "japan" },
  { slug: "south-korea", flag: "\u{1F1F0}\u{1F1F7}", nameKey: "southKorea" },
  { slug: "united-states", flag: "\u{1F1FA}\u{1F1F8}", nameKey: "unitedStates" },
  { slug: "thailand", flag: "\u{1F1F9}\u{1F1ED}", nameKey: "thailand" },
  { slug: "taiwan", flag: "\u{1F1F9}\u{1F1FC}", nameKey: "taiwan" },
  { slug: "singapore", flag: "\u{1F1F8}\u{1F1EC}", nameKey: "singapore" },
] as const;

type DestinationNames = Record<string, string>;

const DESTINATION_NAMES: Record<string, DestinationNames> = {
  en: { japan: "Japan", southKorea: "South Korea", unitedStates: "United States", thailand: "Thailand", taiwan: "Taiwan", singapore: "Singapore" },
  ja: { japan: "日本", southKorea: "韓国", unitedStates: "アメリカ", thailand: "タイ", taiwan: "台湾", singapore: "シンガポール" },
  ko: { japan: "일본", southKorea: "한국", unitedStates: "미국", thailand: "태국", taiwan: "대만", singapore: "싱가포르" },
  zh: { japan: "日本", southKorea: "韩国", unitedStates: "美国", thailand: "泰国", taiwan: "台湾", singapore: "新加坡" },
};

const PAGE_CONTENT: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  whyTitle: string;
  instant: string;
  instantDesc: string;
  global: string;
  globalDesc: string;
  affordable: string;
  affordableDesc: string;
  popularTitle: string;
  viewPlans: string;
}> = {
  en: {
    heroTitle: "Stay Connected Anywhere in the World",
    heroSubtitle: "Get instant access to mobile data in 200+ countries with our travel eSIM. No physical SIM card needed - activate in seconds.",
    heroCta: "Browse eSIM Plans",
    whyTitle: "Why Choose AutoWiFi eSIM?",
    instant: "Instant Activation",
    instantDesc: "Download and activate your eSIM in seconds. No waiting for shipping, no store visits needed.",
    global: "200+ Countries",
    globalDesc: "Coverage across every continent. One solution for all your international travel data needs.",
    affordable: "Affordable Plans",
    affordableDesc: "Competitive pricing with flexible data packages. Pay only for what you need, when you need it.",
    popularTitle: "Popular Destinations",
    viewPlans: "View plans",
  },
  ja: {
    heroTitle: "世界中どこでもつながる",
    heroSubtitle: "200以上の国と地域で使えるトラベルeSIMで、すぐにモバイルデータにアクセス。物理SIMカード不要、数秒でアクティベート。",
    heroCta: "eSIMプランを見る",
    whyTitle: "AutoWiFi eSIMが選ばれる理由",
    instant: "即時アクティベーション",
    instantDesc: "eSIMを数秒でダウンロード＆アクティベート。配送待ちも店舗訪問も不要です。",
    global: "200以上の国と地域",
    globalDesc: "全大陸をカバー。海外旅行のデータ通信はこれ一つで解決。",
    affordable: "お手頃な料金",
    affordableDesc: "柔軟なデータパッケージで競争力のある価格設定。必要な分だけお支払い。",
    popularTitle: "人気の渡航先",
    viewPlans: "プランを見る",
  },
  ko: {
    heroTitle: "전 세계 어디서나 연결",
    heroSubtitle: "200개 이상의 국가에서 사용 가능한 여행용 eSIM으로 즉시 모바일 데이터에 접속하세요. 물리적 SIM 카드 필요 없이 몇 초 만에 활성화.",
    heroCta: "eSIM 플랜 보기",
    whyTitle: "AutoWiFi eSIM을 선택하는 이유",
    instant: "즉시 활성화",
    instantDesc: "몇 초 만에 eSIM을 다운로드하고 활성화하세요. 배송 대기나 매장 방문이 필요 없습니다.",
    global: "200개 이상의 국가",
    globalDesc: "모든 대륙을 커버합니다. 해외 여행 데이터 솔루션 하나로 해결.",
    affordable: "합리적인 요금",
    affordableDesc: "유연한 데이터 패키지로 경쟁력 있는 가격. 필요한 만큼만 결제하세요.",
    popularTitle: "인기 여행지",
    viewPlans: "플랜 보기",
  },
  zh: {
    heroTitle: "全球随时随地保持连接",
    heroSubtitle: "使用旅行eSIM在200多个国家即时访问移动数据。无需实体SIM卡，几秒即可激活。",
    heroCta: "浏览eSIM套餐",
    whyTitle: "为什么选择AutoWiFi eSIM？",
    instant: "即时激活",
    instantDesc: "几秒内下载并激活eSIM。无需等待快递，无需前往门店。",
    global: "200+国家覆盖",
    globalDesc: "覆盖全球各大洲。一个方案满足您所有的国际旅行数据需求。",
    affordable: "实惠的价格",
    affordableDesc: "灵活的数据套餐，具有竞争力的定价。按需付费。",
    popularTitle: "热门目的地",
    viewPlans: "查看套餐",
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
    path: "",
    title: `AutoWiFi eSIM - ${content.heroTitle}`,
    description: content.heroSubtitle,
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = PAGE_CONTENT[locale] ?? PAGE_CONTENT.en;
  const names = DESTINATION_NAMES[locale] ?? DESTINATION_NAMES.en;

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{content.heroSubtitle}</p>
          <Link href={`/${locale}/esim`} className={styles.heroCta}>
            {content.heroCta} &rarr;
          </Link>
        </div>
      </section>

      {/* Value Propositions */}
      <section className={styles.valueProps}>
        <h2 className={styles.valuePropsSectionTitle}>{content.whyTitle}</h2>
        <div className={styles.valuePropsGrid}>
          <div className={styles.valuePropCard}>
            <span className={styles.valuePropIcon}>&#x26A1;</span>
            <h3 className={styles.valuePropTitle}>{content.instant}</h3>
            <p className={styles.valuePropDescription}>{content.instantDesc}</p>
          </div>
          <div className={styles.valuePropCard}>
            <span className={styles.valuePropIcon}>&#x1F30D;</span>
            <h3 className={styles.valuePropTitle}>{content.global}</h3>
            <p className={styles.valuePropDescription}>{content.globalDesc}</p>
          </div>
          <div className={styles.valuePropCard}>
            <span className={styles.valuePropIcon}>&#x1F4B0;</span>
            <h3 className={styles.valuePropTitle}>{content.affordable}</h3>
            <p className={styles.valuePropDescription}>{content.affordableDesc}</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className={styles.destinations}>
        <div className={styles.destinationsInner}>
          <h2 className={styles.destinationsSectionTitle}>{content.popularTitle}</h2>
          <div className={styles.destinationsGrid}>
            {POPULAR_DESTINATIONS.map((dest) => (
              <Link
                key={dest.slug}
                href={`/${locale}/esim/${dest.slug}`}
                className={styles.destinationCard}
              >
                <span className={styles.destinationFlag}>{dest.flag}</span>
                <div className={styles.destinationInfo}>
                  <span className={styles.destinationName}>{names[dest.nameKey]}</span>
                  <span className={styles.destinationCta}>{content.viewPlans} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
