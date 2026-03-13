import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { WebSiteJsonLd } from "@/lib/components/JsonLd";
import type { Locale } from "@/lib/i18n/config";
import styles from "./page.module.css";

const SUPPORTED_LOCALES = ["en", "ja", "ko", "zh"] as const;

interface Content {
  title: string;
  tagline: string;
  badges: string[];
  statLabels: string[];
  featuresTitle: string;
  features: { icon: string; title: string; desc: string }[];
  countriesTitle: string;
  countriesSubtitle: string;
  esimTitle: string;
  esimDesc: string;
  esimCta: string;
  langTitle: string;
  footerText: string;
  downloadCta: string;
}

const CONTENT: Record<Locale, Content> = {
  en: {
    title: "AutoWiFi Travel",
    tagline: "Automatically connect to free WiFi at airports worldwide. Skip captive portals and get online instantly.",
    badges: ["📱 Android", "🌐 12 Countries", "⚡ Auto-Login"],
    statLabels: ["WiFi Spots", "Countries", "Languages", "Seconds to Connect"],
    featuresTitle: "Key Features",
    features: [
      { icon: "🔓", title: "Auto Portal Login", desc: "Automatically detects and bypasses captive portal pages at airports, train stations, and public spaces." },
      { icon: "📡", title: "Smart SSID Detection", desc: "Recognizes known WiFi networks and automatically initiates the connection process." },
      { icon: "🔄", title: "Auto Reconnect", desc: "Monitors your connection and automatically reconnects if the WiFi session expires." },
      { icon: "🌏", title: "Global Coverage", desc: "Supports major airports and transit hubs across Asia, with more spots added regularly." },
      { icon: "📱", title: "eSIM Integration", desc: "Compare and purchase eSIM plans for your destination directly within the app." },
      { icon: "💬", title: "Community Feedback", desc: "Report WiFi spot status and request new locations to help fellow travelers." },
    ],
    countriesTitle: "Supported Countries",
    countriesSubtitle: "Major airports and transit hubs in these countries",
    esimTitle: "Need Mobile Data Too?",
    esimDesc: "Compare eSIM plans from top providers for your destination. Stay connected even when WiFi isn't available.",
    esimCta: "Browse eSIM Plans →",
    langTitle: "Multilingual Support",
    footerText: "AutoWiFi Travel. Built for travelers, by travelers.",
    downloadCta: "Download on Google Play",
  },
  ja: {
    title: "AutoWiFi Travel",
    tagline: "世界中の空港で無料WiFiに自動接続。キャプティブポータルをスキップして即座にオンラインに。",
    badges: ["📱 Android", "🌐 12カ国", "⚡ 自動ログイン"],
    statLabels: ["WiFiスポット", "対応国", "言語", "接続まで（秒）"],
    featuresTitle: "主な機能",
    features: [
      { icon: "🔓", title: "自動ポータルログイン", desc: "空港、駅、公共施設のキャプティブポータルページを自動検出してバイパスします。" },
      { icon: "📡", title: "スマートSSID検出", desc: "既知のWiFiネットワークを認識し、接続プロセスを自動開始します。" },
      { icon: "🔄", title: "自動再接続", desc: "接続を監視し、WiFiセッションが期限切れになった場合に自動的に再接続します。" },
      { icon: "🌏", title: "グローバルカバレッジ", desc: "アジア各地の主要空港と交通ハブに対応。対応スポットは定期的に追加中。" },
      { icon: "📱", title: "eSIM連携", desc: "アプリ内で渡航先のeSIMプランを比較・購入できます。" },
      { icon: "💬", title: "コミュニティフィードバック", desc: "WiFiスポットの状況を報告したり、新しい場所をリクエストできます。" },
    ],
    countriesTitle: "対応国",
    countriesSubtitle: "以下の国の主要空港・交通ハブに対応",
    esimTitle: "モバイルデータも必要？",
    esimDesc: "渡航先のeSIMプランをトップクラスのプロバイダーから比較。WiFiが使えない場所でもつながります。",
    esimCta: "eSIMプランを見る →",
    langTitle: "多言語対応",
    footerText: "AutoWiFi Travel - 旅行者のための、旅行者によるアプリ。",
    downloadCta: "Google Playでダウンロード",
  },
  ko: {
    title: "AutoWiFi Travel",
    tagline: "전 세계 공항에서 무료 WiFi에 자동 연결. 캡티브 포털을 건너뛰고 즉시 온라인에 접속하세요.",
    badges: ["📱 Android", "🌐 12개국", "⚡ 자동 로그인"],
    statLabels: ["WiFi 스팟", "지원 국가", "언어", "연결 시간(초)"],
    featuresTitle: "주요 기능",
    features: [
      { icon: "🔓", title: "자동 포털 로그인", desc: "공항, 역, 공공장소의 캡티브 포털 페이지를 자동으로 감지하고 우회합니다." },
      { icon: "📡", title: "스마트 SSID 감지", desc: "알려진 WiFi 네트워크를 인식하고 자동으로 연결 프로세스를 시작합니다." },
      { icon: "🔄", title: "자동 재연결", desc: "연결을 모니터링하고 WiFi 세션이 만료되면 자동으로 재연결합니다." },
      { icon: "🌏", title: "글로벌 커버리지", desc: "아시아 주요 공항과 교통 허브를 지원하며, 새로운 스팟이 지속적으로 추가됩니다." },
      { icon: "📱", title: "eSIM 통합", desc: "앱 내에서 목적지의 eSIM 플랜을 비교하고 구매할 수 있습니다." },
      { icon: "💬", title: "커뮤니티 피드백", desc: "WiFi 스팟 상태를 보고하거나 새 장소를 요청하여 여행자들을 도울 수 있습니다." },
    ],
    countriesTitle: "지원 국가",
    countriesSubtitle: "다음 국가의 주요 공항 및 교통 허브",
    esimTitle: "모바일 데이터도 필요하세요?",
    esimDesc: "목적지의 eSIM 플랜을 최고의 프로바이더에서 비교하세요. WiFi가 없는 곳에서도 연결을 유지하세요.",
    esimCta: "eSIM 플랜 보기 →",
    langTitle: "다국어 지원",
    footerText: "AutoWiFi Travel - 여행자를 위한, 여행자에 의한 앱.",
    downloadCta: "Google Play에서 다운로드",
  },
  zh: {
    title: "AutoWiFi Travel",
    tagline: "在全球机场自动连接免费WiFi。跳过认证页面，即刻上网。",
    badges: ["📱 Android", "🌐 12个国家", "⚡ 自动登录"],
    statLabels: ["WiFi热点", "支持国家", "语言", "连接时间（秒）"],
    featuresTitle: "主要功能",
    features: [
      { icon: "🔓", title: "自动登录门户", desc: "自动检测并绕过机场、车站和公共场所的认证页面。" },
      { icon: "📡", title: "智能SSID检测", desc: "识别已知WiFi网络，自动启动连接过程。" },
      { icon: "🔄", title: "自动重连", desc: "监控连接状态，WiFi会话过期时自动重新连接。" },
      { icon: "🌏", title: "全球覆盖", desc: "支持亚洲主要机场和交通枢纽，新热点持续添加中。" },
      { icon: "📱", title: "eSIM集成", desc: "在应用内比较和购买目的地的eSIM套餐。" },
      { icon: "💬", title: "社区反馈", desc: "报告WiFi热点状态或请求新地点，帮助其他旅行者。" },
    ],
    countriesTitle: "支持国家",
    countriesSubtitle: "以下国家的主要机场和交通枢纽",
    esimTitle: "还需要移动数据？",
    esimDesc: "从顶级供应商比较目的地的eSIM套餐。即使没有WiFi也能保持连接。",
    esimCta: "查看eSIM套餐 →",
    langTitle: "多语言支持",
    footerText: "AutoWiFi Travel - 为旅行者打造，由旅行者创建。",
    downloadCta: "在Google Play下载",
  },
};

const COUNTRIES = [
  "🇯🇵 Japan", "🇰🇷 South Korea", "🇹🇼 Taiwan", "🇨🇳 China",
  "🇹🇭 Thailand", "🇸🇬 Singapore", "🇲🇾 Malaysia", "🇻🇳 Vietnam",
  "🇵🇭 Philippines", "🇮🇩 Indonesia", "🇭🇰 Hong Kong", "🇺🇸 United States",
];

const STAT_NUMS = ["36+", "12", "4", "0"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : "en") as Locale;
  const c = CONTENT[loc];
  return generatePageMetadata({
    locale: loc,
    path: "/lp",
    title: `${c.title} - Smart Airport WiFi Connection`,
    description: c.tagline,
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : "en") as Locale;
  const c = CONTENT[loc];

  return (
    <div style={{ background: "#f8fafc" }}>
      <WebSiteJsonLd
        name="AutoWiFi Travel"
        url={`https://autowifi-travel.com/${loc}/lp`}
        description={c.tagline}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroIcon}>📶</div>
        <h1>{c.title}</h1>
        <p className={styles.tagline}>{c.tagline}</p>
        <div className={styles.badges}>
          {c.badges.map((b) => (
            <span key={b} className={styles.badge}>{b}</span>
          ))}
        </div>
        <div className={styles.ctaButtons}>
          <a
            href="https://play.google.com/store/apps/details?id=com.autowifi.travel"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.playButton}
          >
            ▶ {c.downloadCta}
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        {STAT_NUMS.map((num, i) => (
          <div key={i} className={styles.stat}>
            <div className={styles.statNum}>{num}</div>
            <div className={styles.statLabel}>{c.statLabels[i]}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className={styles.features}>
        <h2>{c.featuresTitle}</h2>
        <div className={styles.featureGrid}>
          {c.features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className={styles.countries}>
        <h2>{c.countriesTitle}</h2>
        <p className={styles.subtitle}>{c.countriesSubtitle}</p>
        <div className={styles.countryGrid}>
          {COUNTRIES.map((country) => (
            <span key={country} className={styles.countryTag}>{country}</span>
          ))}
        </div>
      </section>

      {/* eSIM CTA */}
      <section className={styles.esim}>
        <h2>{c.esimTitle}</h2>
        <p>{c.esimDesc}</p>
        <Link href={`/${loc}/esim`} className={styles.esimCta}>
          {c.esimCta}
        </Link>
      </section>

      {/* Languages */}
      <section className={styles.languages}>
        <h2>{c.langTitle}</h2>
        <div className={styles.langGrid}>
          <div className={styles.langCard}>🇯🇵 日本語</div>
          <div className={styles.langCard}>🇺🇸 English</div>
          <div className={styles.langCard}>🇨🇳 中文</div>
          <div className={styles.langCard}>🇰🇷 한국어</div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 {c.footerText}</p>
      </footer>
    </div>
  );
}
