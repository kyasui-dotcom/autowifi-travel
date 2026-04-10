import Link from "next/link";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "./JsonLd";
import ContentTrustPanel from "./ContentTrustPanel";
import { getAuthorProfileUrl } from "@/lib/content/eeat";
import { EXTRA_GUIDE_COUNTRY_MAP } from "@/lib/guides/extraGuides";
import { getSeoProgramEntry } from "@/lib/guides/seoProgram";
import { getBaseUrl, getDefaultOgImageUrl } from "@/lib/seo";
import styles from "./article.module.css";

export type Locale = "en" | "ja" | "ko" | "zh";

export interface FaqItem {
  q: string;
  a: string;
}

export interface Section {
  title: string;
  body: string;
}

export interface ArticleContent {
  title: string;
  subtitle: string;
  intro: string;
  sections: Section[];
  faqTitle: string;
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  breadcrumbHome: string;
  breadcrumbGuide: string;
  breadcrumbCurrent: string;
  datePublished?: string;
  dateModified?: string;
  ogImage?: string;
}

export interface RelatedArticle {
  slug: string;
  title: string;
}

interface Props {
  locale: Locale;
  slug: string;
  content: ArticleContent;
  relatedArticles?: RelatedArticle[];
  relatedTitle?: string;
}

interface NextStepCard {
  href: string;
  title: string;
  desc: string;
  badge: string;
  featured?: boolean;
}

const ARTICLE_UI: Record<Locale, {
  nextStepsTitle: string;
  nextStepsIntro: string;
  browsePlansTitle: string;
  browsePlansDesc: string;
  browsePlansBadge: string;
  browseDestinationTitle: string;
  browseDestinationDesc: string;
  browseDestinationBadge: string;
  bestProvidersTitle: string;
  bestProvidersDesc: string;
  bestProvidersBadge: string;
  cheapestTitle: string;
  cheapestDesc: string;
  cheapestBadge: string;
  internationalTitle: string;
  internationalDesc: string;
  internationalBadge: string;
  asiaTitle: string;
  asiaDesc: string;
  asiaBadge: string;
  europeTitle: string;
  europeDesc: string;
  europeBadge: string;
}> = {
  en: {
    nextStepsTitle: "Best next step for this topic",
    nextStepsIntro: "If you're close to buying, jump straight from this guide into the best comparison or plan page.",
    browsePlansTitle: "Browse all eSIM plans",
    browsePlansDesc: "See every destination, compare durations, and pick a plan that matches your trip length.",
    browsePlansBadge: "Shop",
    browseDestinationTitle: "See plans for this destination",
    browseDestinationDesc: "Go straight to the country page to compare active packages and pricing for this trip.",
    browseDestinationBadge: "Destination",
    bestProvidersTitle: "Compare the best travel eSIM providers",
    bestProvidersDesc: "Use the provider comparison page when you want the fastest shortlist before checkout.",
    bestProvidersBadge: "Compare",
    cheapestTitle: "Find the cheapest eSIM plans",
    cheapestDesc: "Start here if price is the main decision factor and you want the lowest-cost options first.",
    cheapestBadge: "Budget",
    internationalTitle: "Read the international eSIM guide",
    internationalDesc: "Start here if you want the broad comparison page that connects provider, regional, and country-specific travel eSIM choices.",
    internationalBadge: "Hub",
    asiaTitle: "Compare the best eSIMs for Asia",
    asiaDesc: "Useful for multi-country Asia trips where coverage and validity matter more than a single destination.",
    asiaBadge: "Regional",
    europeTitle: "Compare the best eSIMs for Europe",
    europeDesc: "Useful for Europe itineraries that cross borders and need one plan for multiple countries.",
    europeBadge: "Regional",
  },
  ja: {
    nextStepsTitle: "このあとに見たいページ",
    nextStepsIntro: "購入に近い読者が、そのまま比較ページや商品ページへ進める導線をまとめています。",
    browsePlansTitle: "eSIMプラン一覧を見る",
    browsePlansDesc: "渡航先・日数・容量をまとめて比較して、自分の旅程に合うプランを探せます。",
    browsePlansBadge: "購入",
    browseDestinationTitle: "この渡航先のプランを見る",
    browseDestinationDesc: "この旅行先向けの販売ページに進み、販売中のパッケージと料金をすぐ比較できます。",
    browseDestinationBadge: "渡航先",
    bestProvidersTitle: "海外eSIMおすすめ比較を見る",
    bestProvidersDesc: "どのブランドから選ぶべきか迷う場合は、まず比較ページから絞り込むのが早いです。",
    bestProvidersBadge: "比較",
    cheapestTitle: "格安eSIMの比較を見る",
    cheapestDesc: "とにかく安く選びたい人向けに、価格重視で検討しやすいページです。",
    cheapestBadge: "節約",
    internationalTitle: "international eSIM比較を見る",
    internationalDesc: "広い比較ページから、ブランド比較・周遊比較・国別ページへ進みたい人向けです。",
    internationalBadge: "入口",
    asiaTitle: "アジア向けeSIM比較を見る",
    asiaDesc: "アジア周遊や複数国旅行なら、単国ページよりもこちらの比較が役立ちます。",
    asiaBadge: "周遊",
    europeTitle: "ヨーロッパ向けeSIM比較を見る",
    europeDesc: "ヨーロッパ周遊で国またぎがあるなら、対応国をまとめて比較できます。",
    europeBadge: "周遊",
  },
  ko: {
    nextStepsTitle: "다음으로 보기 좋은 페이지",
    nextStepsIntro: "구매 직전 단계의 사용자가 바로 비교 페이지나 상품 페이지로 이동할 수 있게 묶었습니다.",
    browsePlansTitle: "전체 eSIM 플랜 보기",
    browsePlansDesc: "여행지, 사용일수, 데이터 용량을 한 번에 비교해서 내 일정에 맞는 플랜을 고를 수 있습니다.",
    browsePlansBadge: "구매",
    browseDestinationTitle: "이 여행지 플랜 보기",
    browseDestinationDesc: "해당 국가 판매 페이지로 이동해 현재 판매 중인 패키지와 가격을 바로 비교할 수 있습니다.",
    browseDestinationBadge: "국가",
    bestProvidersTitle: "여행 eSIM 추천 비교 보기",
    bestProvidersDesc: "어느 브랜드를 고를지 고민된다면, 먼저 비교 페이지에서 후보를 줄이는 편이 빠릅니다.",
    bestProvidersBadge: "비교",
    cheapestTitle: "가장 저렴한 eSIM 보기",
    cheapestDesc: "가격이 가장 중요하다면, 먼저 이 페이지에서 저렴한 선택지를 추려볼 수 있습니다.",
    cheapestBadge: "가성비",
    internationalTitle: "international eSIM 가이드 보기",
    internationalDesc: "브랜드 비교, 지역 비교, 국가별 페이지를 넓게 훑고 싶을 때 시작점이 되는 페이지입니다.",
    internationalBadge: "허브",
    asiaTitle: "아시아 eSIM 비교 보기",
    asiaDesc: "아시아 여러 국가를 이동하는 일정이라면 단일 국가 페이지보다 이 비교 페이지가 더 잘 맞습니다.",
    asiaBadge: "지역",
    europeTitle: "유럽 eSIM 비교 보기",
    europeDesc: "유럽 국가를 여러 곳 이동한다면, 지원 국가를 함께 비교하기 좋습니다.",
    europeBadge: "지역",
  },
  zh: {
    nextStepsTitle: "接下来建议看的页面",
    nextStepsIntro: "把更接近购买的比较页和套餐页放在这里，读完指南就能直接继续。",
    browsePlansTitle: "查看全部eSIM套餐",
    browsePlansDesc: "一次比较目的地、天数和流量，找到更适合自己行程的套餐。",
    browsePlansBadge: "购买",
    browseDestinationTitle: "查看这个目的地的套餐",
    browseDestinationDesc: "直接进入该目的地的销售页，快速比较当前可买的套餐和价格。",
    browseDestinationBadge: "目的地",
    bestProvidersTitle: "查看旅行eSIM推荐对比",
    bestProvidersDesc: "如果还没决定选哪家品牌，先看对比页会更容易缩小范围。",
    bestProvidersBadge: "对比",
    cheapestTitle: "查看便宜eSIM方案",
    cheapestDesc: "如果价格是首要因素，可以先从这里筛选低成本方案。",
    cheapestBadge: "低价",
    internationalTitle: "查看 international eSIM 指南",
    internationalDesc: "这是连接品牌对比、区域对比和国家页面的总入口，适合先做大范围比较。",
    internationalBadge: "入口",
    asiaTitle: "查看亚洲eSIM对比",
    asiaDesc: "如果是亚洲多国行程，这个区域对比页通常比单国页面更适合。",
    asiaBadge: "区域",
    europeTitle: "查看欧洲eSIM对比",
    europeDesc: "如果欧洲行程会跨国移动，这个页面更适合先确认覆盖国家。",
    europeBadge: "区域",
  },
};

function getNextStepCards(locale: Locale, slug: string): NextStepCard[] {
  const labels = ARTICLE_UI[locale];
  const entry = getSeoProgramEntry(slug);
  const countrySlug = entry?.countrySlug ?? EXTRA_GUIDE_COUNTRY_MAP[slug];
  const regionalCompareSlug =
    entry?.region === "asia"
      ? "best-esim-for-asia"
      : entry?.region === "europe"
        ? "best-esim-for-europe"
        : "best-esim-providers";

  const cards: NextStepCard[] = [];

  if (countrySlug) {
    cards.push({
      href: `/${locale}/esim/${countrySlug}`,
      title: labels.browseDestinationTitle,
      desc: labels.browseDestinationDesc,
      badge: labels.browseDestinationBadge,
      featured: true,
    });
  }

  if (slug !== "international-esim") {
    cards.push({
      href: `/${locale}/guide/international-esim`,
      title: labels.internationalTitle,
      desc: labels.internationalDesc,
      badge: labels.internationalBadge,
    });
  }

  if (slug !== regionalCompareSlug) {
    const regionalCard =
      regionalCompareSlug === "best-esim-for-asia"
        ? {
            title: labels.asiaTitle,
            desc: labels.asiaDesc,
            badge: labels.asiaBadge,
          }
        : regionalCompareSlug === "best-esim-for-europe"
          ? {
              title: labels.europeTitle,
              desc: labels.europeDesc,
              badge: labels.europeBadge,
            }
          : {
              title: labels.bestProvidersTitle,
              desc: labels.bestProvidersDesc,
              badge: labels.bestProvidersBadge,
            };

    cards.push({
      href: `/${locale}/guide/${regionalCompareSlug}`,
      ...regionalCard,
    });
  }

  if (slug !== "cheapest-esim-plans") {
    cards.push({
      href: `/${locale}/guide/cheapest-esim-plans`,
      title: labels.cheapestTitle,
      desc: labels.cheapestDesc,
      badge: labels.cheapestBadge,
    });
  }

  cards.push({
    href: `/${locale}/esim`,
    title: labels.browsePlansTitle,
    desc: labels.browsePlansDesc,
    badge: labels.browsePlansBadge,
  });

  const uniqueCards = cards.filter(
    (card, index, list) => list.findIndex((item) => item.href === card.href) === index
  );

  return uniqueCards.slice(0, 4);
}

const SOURCES_LABELS: Record<Locale, { title: string; intro: string }> = {
  en: {
    title: "Sources & References",
    intro: "Pricing, speed, and coverage claims in this guide are based on the following publicly available sources. Please verify with the original source before making decisions.",
  },
  ja: {
    title: "出典・参考資料",
    intro: "本記事の料金・速度・カバレッジに関する記述は、以下の公開情報に基づいています。最終的な判断前に一次ソースをご確認ください。",
  },
  ko: {
    title: "출처 및 참고 자료",
    intro: "본 가이드의 요금·속도·커버리지 관련 기술은 아래 공개 정보에 기반합니다. 최종 판단 전 원문을 확인하세요.",
  },
  zh: {
    title: "来源与参考资料",
    intro: "本指南中的价格、速度和覆盖范围信息均基于以下公开来源。做出决定前请核对原始资料。",
  },
};

type SourceLink = { label: string; url: string };

const GLOBAL_SOURCES: SourceLink[] = [
  { label: "Ookla Speedtest Global Index", url: "https://www.speedtest.net/global-index" },
  { label: "GSMA — eSIM", url: "https://www.gsma.com/esim/" },
  { label: "Apple Support — eSIM", url: "https://support.apple.com/HT212780" },
  { label: "Google Support — Android eSIM", url: "https://support.google.com/android/answer/9337176" },
];

const COUNTRY_SOURCES: Record<string, SourceLink[]> = {
  japan: [
    { label: "総務省 電気通信統計", url: "https://www.soumu.go.jp/menu_seisaku/ictseisaku/joho_tsusin/eidsystem/" },
    { label: "NTT Docomo 5Gエリア", url: "https://www.nttdocomo.co.jp/area/" },
  ],
  "south-korea": [
    { label: "KCC (Korea Communications Commission)", url: "https://eng.kcc.go.kr/" },
    { label: "SK Telecom 5G", url: "https://www.sktelecom.com/" },
  ],
  china: [
    { label: "MIIT (中华人民共和国工业和信息化部)", url: "https://www.miit.gov.cn/" },
  ],
  taiwan: [
    { label: "NCC (National Communications Commission)", url: "https://www.ncc.gov.tw/english/" },
  ],
  "hong-kong": [
    { label: "OFCA (Office of the Communications Authority)", url: "https://www.ofca.gov.hk/" },
  ],
  thailand: [
    { label: "NBTC (National Broadcasting and Telecommunications Commission)", url: "https://www.nbtc.go.th/" },
  ],
  singapore: [
    { label: "IMDA (Infocomm Media Development Authority)", url: "https://www.imda.gov.sg/" },
  ],
  malaysia: [
    { label: "MCMC (Malaysian Communications and Multimedia Commission)", url: "https://www.mcmc.gov.my/" },
  ],
  indonesia: [
    { label: "Kominfo (Kementerian Komunikasi dan Informatika)", url: "https://www.kominfo.go.id/" },
  ],
  philippines: [
    { label: "NTC (National Telecommunications Commission)", url: "https://ntc.gov.ph/" },
  ],
  vietnam: [
    { label: "Ministry of Information and Communications", url: "https://english.mic.gov.vn/" },
  ],
  cambodia: [
    { label: "Telecommunication Regulator of Cambodia", url: "https://trc.gov.kh/en/" },
  ],
  india: [
    { label: "TRAI (Telecom Regulatory Authority of India)", url: "https://www.trai.gov.in/" },
  ],
  "sri-lanka": [
    { label: "TRCSL (Telecommunications Regulatory Commission of Sri Lanka)", url: "https://www.trc.gov.lk/" },
  ],
  "united-states": [
    { label: "FCC (Federal Communications Commission)", url: "https://www.fcc.gov/" },
  ],
  usa: [
    { label: "FCC (Federal Communications Commission)", url: "https://www.fcc.gov/" },
  ],
  canada: [
    { label: "CRTC (Canadian Radio-television and Telecommunications Commission)", url: "https://crtc.gc.ca/" },
  ],
  mexico: [
    { label: "IFT (Instituto Federal de Telecomunicaciones)", url: "https://www.ift.org.mx/" },
  ],
  "united-kingdom": [
    { label: "Ofcom", url: "https://www.ofcom.org.uk/" },
  ],
  uk: [
    { label: "Ofcom", url: "https://www.ofcom.org.uk/" },
  ],
  france: [
    { label: "ARCEP", url: "https://www.arcep.fr/" },
  ],
  germany: [
    { label: "Bundesnetzagentur", url: "https://www.bundesnetzagentur.de/EN/" },
  ],
  italy: [
    { label: "AGCOM", url: "https://www.agcom.it/" },
  ],
  spain: [
    { label: "CNMC", url: "https://www.cnmc.es/" },
  ],
  portugal: [
    { label: "ANACOM", url: "https://www.anacom.pt/" },
  ],
  switzerland: [
    { label: "OFCOM (BAKOM)", url: "https://www.bakom.admin.ch/" },
  ],
  norway: [
    { label: "Nkom (Norwegian Communications Authority)", url: "https://www.nkom.no/" },
  ],
  iceland: [
    { label: "PFS (Post and Telecom Administration)", url: "https://www.pfs.is/" },
  ],
  greece: [
    { label: "EETT", url: "https://www.eett.gr/" },
  ],
  turkey: [
    { label: "BTK (Information and Communication Technologies Authority)", url: "https://www.btk.gov.tr/en" },
  ],
  australia: [
    { label: "ACMA (Australian Communications and Media Authority)", url: "https://www.acma.gov.au/" },
  ],
  "new-zealand": [
    { label: "Commerce Commission NZ", url: "https://comcom.govt.nz/" },
  ],
  "united-arab-emirates": [
    { label: "TDRA", url: "https://tdra.gov.ae/en" },
  ],
  uae: [
    { label: "TDRA", url: "https://tdra.gov.ae/en" },
  ],
  morocco: [
    { label: "ANRT (Agence Nationale de Réglementation des Télécommunications)", url: "https://www.anrt.ma/" },
  ],
};

function SourcesSection({ locale, countrySlug }: { locale: Locale; countrySlug?: string }) {
  const labels = SOURCES_LABELS[locale] ?? SOURCES_LABELS.en;
  const countryLinks = countrySlug ? COUNTRY_SOURCES[countrySlug] ?? [] : [];
  const links = [...countryLinks, ...GLOBAL_SOURCES];
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{labels.title}</h2>
      <p style={{ fontSize: "0.9375rem", color: "#4b5563", marginBottom: "0.75rem" }}>
        {labels.intro}
      </p>
      <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener nofollow"
              style={{ color: "#2563eb", textDecoration: "underline" }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ArticleLayout({ locale, slug, content: c, relatedArticles, relatedTitle }: Props) {
  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}/${locale}/guide/${slug}`;
  const articleImageUrl = c.ogImage ?? getDefaultOgImageUrl(baseUrl);
  const publishedAt = c.datePublished || "2026-03-13";
  const updatedAt = c.dateModified || new Date().toISOString().slice(0, 10);
  const nextStepCards = getNextStepCards(locale, slug);
  const labels = ARTICLE_UI[locale];
  const countrySlug = getSeoProgramEntry(slug)?.countrySlug ?? EXTRA_GUIDE_COUNTRY_MAP[slug];
  const primaryCtaHref = countrySlug ? `/${locale}/esim/${countrySlug}` : `/${locale}/esim`;

  return (
    <div className={styles.container}>
      <FaqJsonLd items={c.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <ArticleJsonLd
        title={c.title}
        description={c.intro}
        url={articleUrl}
        image={articleImageUrl}
        locale={locale}
        datePublished={publishedAt}
        dateModified={updatedAt}
        authorName="AutoWiFi Travel Editorial Team"
        authorUrl={getAuthorProfileUrl(locale)}
      />
      <BreadcrumbJsonLd
        items={[
          { name: c.breadcrumbHome, url: `${baseUrl}/${locale}` },
          { name: c.breadcrumbGuide, url: `${baseUrl}/${locale}/guide` },
          { name: c.breadcrumbCurrent, url: `${baseUrl}/${locale}/guide/${slug}` },
        ]}
      />

      <nav className={styles.breadcrumb}>
        <Link href={`/${locale}`}>{c.breadcrumbHome}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href={`/${locale}/guide`}>{c.breadcrumbGuide}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{c.breadcrumbCurrent}</span>
      </nav>

      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{c.title}</h1>
        <p className={styles.heroSubtitle}>{c.subtitle}</p>
      </header>

      <ContentTrustPanel locale={locale} updatedAt={updatedAt} />

      <section className={styles.section}>
        <p className={styles.introText}>{c.intro}</p>
      </section>

      {c.sections.map((sec, i) => (
        <section key={i} className={styles.section}>
          <h2 className={styles.sectionTitle}>{sec.title}</h2>
          <div className={styles.sectionBody}>
            {sec.body.split("\n\n").map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.faqTitle}</h2>
        <div className={styles.faqList}>
          {c.faqs.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {relatedArticles && relatedArticles.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{relatedTitle || "Related Guides"}</h2>
          <div className={styles.relatedGrid}>
            {relatedArticles.map((ra) => (
              <Link
                key={ra.slug}
                href={`/${locale}/guide/${ra.slug}`}
                className={styles.relatedCard}
              >
                {ra.title} →
              </Link>
            ))}
          </div>
        </section>
      )}

      <SourcesSection locale={locale} countrySlug={countrySlug} />

      <section className={styles.nextStepsSection}>
        <div className={styles.nextStepsHeader}>
          <h2 className={styles.nextStepsTitle}>{labels.nextStepsTitle}</h2>
          <p className={styles.nextStepsIntro}>{labels.nextStepsIntro}</p>
        </div>
        <div className={styles.nextStepsGrid}>
          {nextStepCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={card.featured ? styles.nextStepCardFeatured : styles.nextStepCard}
            >
              <span className={styles.nextStepBadge}>{card.badge}</span>
              <strong className={styles.nextStepTitle}>{card.title}</strong>
              <span className={styles.nextStepDesc}>{card.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
        <p className={styles.ctaDesc}>{c.ctaDesc}</p>
        <Link href={primaryCtaHref} className={styles.ctaButton}>
          {c.ctaButton} →
        </Link>
      </section>
    </div>
  );
}
