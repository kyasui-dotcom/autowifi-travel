import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { WebSiteJsonLd, FaqJsonLd } from "@/lib/components/JsonLd";
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

const FAQ_CONTENT: Record<string, Array<{ question: string; answer: string }>> = {
  en: [
    { question: "What is an eSIM?", answer: "An eSIM is a digital SIM that allows you to activate a mobile data plan without a physical SIM card. It's built into most modern smartphones and can be activated instantly by scanning a QR code." },
    { question: "Which devices support eSIM?", answer: "Most iPhones from iPhone XS and later, Samsung Galaxy S20 and later, Google Pixel 3 and later, and many other modern smartphones support eSIM. Check your device settings for eSIM compatibility." },
    { question: "How do I activate my eSIM?", answer: "After purchase, you'll receive a QR code via email. Go to your phone's Settings > Mobile Data > Add eSIM, then scan the QR code. Your eSIM will be ready to use within minutes." },
    { question: "Can I use eSIM alongside my physical SIM?", answer: "Yes! Most eSIM-compatible devices support dual SIM, allowing you to keep your regular phone number on your physical SIM while using the eSIM for data abroad." },
    { question: "When should I activate my eSIM?", answer: "You can install your eSIM before traveling, but we recommend activating data only when you arrive at your destination to maximize your plan's validity period." },
  ],
  ja: [
    { question: "eSIMとは何ですか？", answer: "eSIMはデジタルSIMで、物理的なSIMカードなしでモバイルデータプランを有効化できます。最新のスマートフォンに内蔵されており、QRコードをスキャンするだけで即座にアクティベートできます。" },
    { question: "どのデバイスがeSIMに対応していますか？", answer: "iPhone XS以降、Samsung Galaxy S20以降、Google Pixel 3以降、その他多くの最新スマートフォンがeSIMに対応しています。デバイスの設定でeSIM対応をご確認ください。" },
    { question: "eSIMのアクティベート方法は？", answer: "購入後、QRコードがメールで届きます。スマートフォンの設定 > モバイルデータ > eSIM追加からQRコードをスキャンしてください。数分で利用可能になります。" },
    { question: "物理SIMと併用できますか？", answer: "はい！eSIM対応デバイスのほとんどはデュアルSIMに対応しており、物理SIMで通常の電話番号を維持しながら、eSIMで海外データ通信が利用できます。" },
    { question: "いつeSIMをアクティベートすべきですか？", answer: "渡航前にeSIMをインストールできますが、プランの有効期間を最大限活用するため、目的地に到着してからデータをアクティベートすることをお勧めします。" },
  ],
  ko: [
    { question: "eSIM이란 무엇인가요?", answer: "eSIM은 물리적 SIM 카드 없이 모바일 데이터 플랜을 활성화할 수 있는 디지털 SIM입니다. 대부분의 최신 스마트폰에 내장되어 있으며 QR 코드를 스캔하여 즉시 활성화할 수 있습니다." },
    { question: "어떤 기기가 eSIM을 지원하나요?", answer: "iPhone XS 이후, Samsung Galaxy S20 이후, Google Pixel 3 이후 및 기타 최신 스마트폰이 eSIM을 지원합니다. 기기 설정에서 eSIM 호환성을 확인하세요." },
    { question: "eSIM은 어떻게 활성화하나요?", answer: "구매 후 이메일로 QR 코드를 받게 됩니다. 휴대폰 설정 > 모바일 데이터 > eSIM 추가에서 QR 코드를 스캔하세요. 몇 분 내에 사용할 수 있습니다." },
    { question: "기존 SIM과 함께 사용할 수 있나요?", answer: "네! 대부분의 eSIM 호환 기기는 듀얼 SIM을 지원하여 기존 전화번호는 물리적 SIM에 유지하면서 해외에서 eSIM으로 데이터를 사용할 수 있습니다." },
    { question: "언제 eSIM을 활성화해야 하나요?", answer: "여행 전에 eSIM을 설치할 수 있지만, 플랜의 유효 기간을 최대한 활용하기 위해 목적지에 도착한 후 데이터를 활성화하는 것을 권장합니다." },
  ],
  zh: [
    { question: "什么是eSIM？", answer: "eSIM是一种数字SIM，无需实体SIM卡即可激活移动数据套餐。它内置于大多数现代智能手机中，扫描二维码即可即时激活。" },
    { question: "哪些设备支持eSIM？", answer: "iPhone XS及之后的机型、Samsung Galaxy S20及之后的机型、Google Pixel 3及之后的机型以及许多其他现代智能手机均支持eSIM。请在设备设置中检查eSIM兼容性。" },
    { question: "如何激活eSIM？", answer: "购买后，您将通过电子邮件收到二维码。前往手机设置 > 移动数据 > 添加eSIM，然后扫描二维码。几分钟内即可使用。" },
    { question: "eSIM可以和实体SIM同时使用吗？", answer: "可以！大多数支持eSIM的设备都支持双卡双待，您可以在实体SIM上保留常规电话号码，同时使用eSIM在海外上网。" },
    { question: "什么时候应该激活eSIM？", answer: "您可以在出发前安装eSIM，但我们建议到达目的地后再激活数据，以最大限度地利用套餐的有效期。" },
  ],
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
  faqTitle: string;
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
    faqTitle: "Frequently Asked Questions",
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
    faqTitle: "よくある質問",
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
    faqTitle: "자주 묻는 질문",
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
    faqTitle: "常见问题",
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
  const faq = FAQ_CONTENT[locale] ?? FAQ_CONTENT.en;

  return (
    <>
      <WebSiteJsonLd
        name="AutoWiFi eSIM"
        url="https://autowifi-travel.com"
        description={content.heroSubtitle}
        searchUrl="https://autowifi-travel.com/en/esim?q={search_term_string}"
      />
      <FaqJsonLd items={faq} />

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

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <h2 className={styles.faqTitle}>{content.faqTitle}</h2>
          <div className={styles.faqList}>
            {faq.map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
