import type { Metadata } from "next";
import Link from "next/link";
import {
  ItemListJsonLd,
  ServiceJsonLd,
  WebSiteJsonLd,
} from "@/lib/components/JsonLd";
import { getBaseUrl } from "@/lib/seo";
import styles from "./page.module.css";

const BASE_URL = getBaseUrl();

const LOCALE_OPTIONS = [
  {
    code: "en",
    nativeName: "English",
    label: "Browse in English",
    description:
      "Compare travel eSIM plans, country guides, and setup help in English.",
  },
  {
    code: "ja",
    nativeName: "日本語",
    label: "日本語で見る",
    description:
      "海外旅行向けeSIMの比較、設定方法、国別プランを日本語で確認できます。",
  },
  {
    code: "ko",
    nativeName: "한국어",
    label: "한국어로 보기",
    description:
      "여행 eSIM 비교, 설치 가이드, 국가별 플랜을 한국어로 확인할 수 있습니다.",
  },
  {
    code: "zh",
    nativeName: "中文",
    label: "查看中文页面",
    description:
      "查看旅行eSIM套餐、安装指南和热门目的地对比内容。",
  },
] as const;

const QUICK_LINKS = [
  {
    href: "/en/esim",
    title: "Compare eSIM plans",
    description:
      "See destination pages for Japan, South Korea, Taiwan, Thailand, the USA, and more.",
  },
  {
    href: "/en/guide",
    title: "Read setup guides",
    description:
      "Find eSIM setup steps, compatible devices, troubleshooting, and travel planning guides.",
  },
  {
    href: "/en/esim/japan",
    title: "Travel eSIM for Japan",
    description:
      "See current plans, prices, and answers to common questions for one of our most popular destinations.",
  },
] as const;

export const metadata: Metadata = {
  title: "Travel eSIM for 200+ Countries | AutoWiFi Travel",
  description:
    "Choose your language and compare travel eSIM plans for 200+ countries with instant activation, setup guides, and destination pages.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: `${BASE_URL}/`,
    languages: {
      en: `${BASE_URL}/en`,
      ja: `${BASE_URL}/ja`,
      ko: `${BASE_URL}/ko`,
      zh: `${BASE_URL}/zh`,
      "x-default": `${BASE_URL}/`,
    },
  },
  openGraph: {
    title: "Travel eSIM for 200+ Countries | AutoWiFi Travel",
    description:
      "Choose your language and compare travel eSIM plans for 200+ countries with instant activation.",
    url: `${BASE_URL}/`,
    siteName: "AutoWiFi Travel",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "AutoWiFi Travel eSIM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel eSIM for 200+ Countries | AutoWiFi Travel",
    description:
      "Choose your language and compare travel eSIM plans for 200+ countries with instant activation.",
    images: [`${BASE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLandingPage() {
  return (
    <>
      <WebSiteJsonLd
        name="AutoWiFi Travel"
        url={`${BASE_URL}/`}
        description="Travel eSIM plans for 200+ countries, available in English, 日本語, 한국어, and 中文 with step-by-step setup guides."
      />
      <ServiceJsonLd />
      <ItemListJsonLd
        items={LOCALE_OPTIONS.map((option, index) => ({
          name: option.nativeName,
          url: `${BASE_URL}/${option.code}`,
          position: index + 1,
        }))}
      />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Travel connectivity, simplified</p>
            <h1 className={styles.title}>Travel eSIM for 200+ Countries</h1>
            <p className={styles.subtitle}>
              AutoWiFi Travel helps travelers compare eSIM plans, setup guides,
              and destination pages in multiple languages. Choose your language
              below to browse country-specific travel data plans.
            </p>
            <div className={styles.primaryActions}>
              <Link href="/en/esim" className={styles.primaryButton}>
                View eSIM plans
              </Link>
              <Link href="/en/guide" className={styles.secondaryButton}>
                Read setup guides
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Choose your language</h2>
            <p className={styles.sectionLead}>
              Each localized homepage includes destination comparisons, pricing
              pages, setup help, and buying guidance for travel eSIM users.
            </p>
          </div>
          <div className={styles.localeGrid}>
            {LOCALE_OPTIONS.map((option) => (
              <Link
                key={option.code}
                href={`/${option.code}`}
                className={styles.localeCard}
              >
                <div className={styles.localeTop}>
                  <span className={styles.localeCode}>{option.code.toUpperCase()}</span>
                  <span className={styles.localeName}>{option.nativeName}</span>
                </div>
                <p className={styles.localeDescription}>{option.description}</p>
                <span className={styles.localeCta}>{option.label} &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Plan your trip data in minutes</h2>
            <p className={styles.sectionLead}>
              Compare coverage by destination, choose the right plan for your
              trip length, follow step-by-step setup guides, and find quick
              fixes if something doesn&apos;t connect &mdash; all in one place.
            </p>
          </div>
          <div className={styles.quickGrid}>
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.quickCard}>
                <h3 className={styles.quickTitle}>{link.title}</h3>
                <p className={styles.quickDescription}>{link.description}</p>
                <span className={styles.quickCta}>Open page &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.copyBlock}>
            <h2 className={styles.sectionTitle}>Why travelers choose AutoWiFi Travel</h2>
            <p className={styles.copyParagraph}>
              Stay online from the moment you land. Our travel eSIMs activate
              instantly with a QR code, keep your home phone number active, and
              cover 200+ countries with reliable mobile data &mdash; no roaming
              surprises and no SIM swapping at the airport.
            </p>
            <p className={styles.copyParagraph}>
              Pick a destination, choose how much data you need, and you&apos;ll
              be ready to navigate, translate, share photos, and book on the go
              before you even leave the gate.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
