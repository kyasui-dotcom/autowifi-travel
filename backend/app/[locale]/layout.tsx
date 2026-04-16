import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import { OrganizationJsonLd } from "@/lib/components/JsonLd";
import WebVitals from "@/lib/components/WebVitals";
import "../globals.css";
import styles from "./layout.module.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-9QDD3E917Y";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

const SUPPORTED_LOCALES = ["en", "ja", "ko", "zh"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ja: "JA",
  ko: "KO",
  zh: "ZH",
};

const NAV_LABELS: Record<Locale, { home: string; esim: string; app: string; guide: string; brandDescription: string; footerProduct: string; footerSupport: string; footerLegal: string }> = {
  en: { home: "Home", esim: "eSIM Plans", app: "WiFi App", guide: "Guides", brandDescription: "Affordable travel eSIM for 200+ countries. Stay connected wherever you go.", footerProduct: "Product", footerSupport: "Support", footerLegal: "Legal" },
  ja: { home: "ホーム", esim: "eSIMプラン", app: "WiFiアプリ", guide: "ガイド", brandDescription: "200以上の国と地域で使えるお手頃なトラベルeSIM。どこでもつながる。", footerProduct: "プロダクト", footerSupport: "サポート", footerLegal: "法的情報" },
  ko: { home: "홈", esim: "eSIM 플랜", app: "WiFi 앱", guide: "가이드", brandDescription: "200개 이상의 국가에서 사용 가능한 여행용 eSIM. 어디서나 연결.", footerProduct: "제품", footerSupport: "지원", footerLegal: "법적 정보" },
  zh: { home: "首页", esim: "eSIM套餐", app: "WiFi应用", guide: "指南", brandDescription: "覆盖200多个国家的旅行eSIM。随时随地保持连接。", footerProduct: "产品", footerSupport: "支持", footerLegal: "法律信息" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    path: "",
    title: "AutoWiFi eSIM - Travel eSIM for 200+ Countries",
    description: "Get affordable travel eSIM plans for over 200 countries. Instant activation, no physical SIM needed.",
  });
}

function Header({ locale }: { locale: Locale }) {
  const labels = NAV_LABELS[locale];

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href={`/${locale}`} className={styles.logo}>
          <span className={styles.logoIcon}>&#x1F310;</span>
          AutoWiFi eSIM
        </Link>

        <nav className={styles.nav}>
          <Link href={`/${locale}`} className={styles.navLink}>
            {labels.home}
          </Link>
          <Link href={`/${locale}/esim`} className={styles.navLink}>
            {labels.esim}
          </Link>
          <span className={styles.navLinkDisabled}>
            {labels.app}
            <span className={styles.comingSoonBadge}>Coming Soon</span>
          </span>
          <Link href={`/${locale}/guide`} className={styles.navLink}>
            {labels.guide}
          </Link>

          <div className={styles.localeSwitcher}>
            {SUPPORTED_LOCALES.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                className={loc === locale ? styles.localeButtonActive : styles.localeButton}
              >
                {LOCALE_LABELS[loc]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const labels = NAV_LABELS[locale];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>AutoWiFi eSIM</div>
          <p className={styles.footerDescription}>{labels.brandDescription}</p>
        </div>

        <div className={styles.footerColumn}>
          <h4>{labels.footerProduct}</h4>
          <ul className={styles.footerLinks}>
            <li><Link href={`/${locale}/esim`}>{labels.esim}</Link></li>
            <li><span style={{ color: 'var(--color-gray-500)' }}>{labels.app} (Coming Soon)</span></li>
            <li><Link href={`/${locale}/guide`}>{labels.guide}</Link></li>
            <li><Link href={`/${locale}/esim/japan`}>{locale === "ja" ? "日本eSIMプラン" : locale === "ko" ? "일본 eSIM" : locale === "zh" ? "日本eSIM" : "Japan eSIM"}</Link></li>
            <li><Link href={`/${locale}/esim/south-korea`}>{locale === "ja" ? "韓国eSIMプラン" : locale === "ko" ? "한국 eSIM" : locale === "zh" ? "韩国eSIM" : "Korea eSIM"}</Link></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>{labels.footerSupport}</h4>
          <ul className={styles.footerLinks}>
            <li><a href="mailto:support@autowifi-travel.com">Contact Us</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>{labels.footerLegal}</h4>
          <ul className={styles.footerLinks}>
            <li><Link href={`/${locale}/privacy`}>Privacy Policy</Link></li>
            <li><Link href={`/${locale}/terms`}>Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        &copy; {new Date().getFullYear()} AutoWiFi Travel. All rights reserved.
      </div>
    </footer>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  return (
    <html lang={validLocale}>
      <head>
        {GSC_VERIFICATION && (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        )}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <OrganizationJsonLd />
        <WebVitals />
        <div className={styles.pageWrapper}>
          <Header locale={validLocale} />
          <main className={styles.main}>{children}</main>
          <Footer locale={validLocale} />
        </div>

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
