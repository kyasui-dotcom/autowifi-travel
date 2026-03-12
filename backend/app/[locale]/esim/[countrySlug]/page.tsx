import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import { getCountryBySlug, getCountryName, getAllCountries } from "@/lib/countries";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";
import { ProductJsonLd } from "@/lib/components/JsonLd";
import type { Locale } from "@/lib/i18n/config";
import styles from "./page.module.css";

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

  return generatePageMetadata({
    locale: locale as Locale,
    path: `/esim/${countrySlug}`,
    title: `${countryName} eSIM Plans | AutoWiFi eSIM`,
    description: `Buy affordable eSIM data plans for ${countryName}. Instant activation, no physical SIM card needed. Stay connected during your trip.`,
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
  let packages: Array<{
    id: string;
    title: string;
    data: string;
    validity: number;
    price: number;
    operator: string;
  }> = [];

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

  return (
    <>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <span className={styles.countryFlag}>{country.flag}</span>
          <div className={styles.headerText}>
            <h1>{countryName} {labels.esimPlans}</h1>
            <p>
              {packages.length > 0
                ? `${packages.length} ${packages.length === 1 ? "plan" : "plans"} available`
                : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href={`/${locale}`}>{labels.breadcrumbHome}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href={`/${locale}/esim`}>{labels.breadcrumbEsim}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{countryName}</span>
      </nav>

      <div className={styles.container}>
        {packages.length > 0 ? (
          <div className={styles.packagesGrid}>
            {packages.map((pkg) => (
              <div key={pkg.id} className={styles.packageCard}>
                <ProductJsonLd
                  name={`${countryName} eSIM - ${pkg.title}`}
                  description={`${pkg.data} data plan for ${countryName}, valid for ${pkg.validity} days`}
                  sku={pkg.id}
                  price={pkg.price}
                  priceCurrency="USD"
                  url={`/${locale}/esim/${countrySlug}/${pkg.id}/checkout`}
                />

                <div className={styles.packageHeader}>
                  <div className={styles.packageOperator}>{pkg.operator}</div>
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

                  <div className={styles.packagePrice}>
                    <span className={styles.priceAmount}>
                      ${pkg.price.toFixed(2)}
                    </span>
                    <span className={styles.priceCurrency}>USD</span>
                  </div>

                  <Link
                    href={`/${locale}/esim/${countrySlug}/${pkg.id}/checkout`}
                    className={styles.buyButton}
                  >
                    {labels.buyNow}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noPackages}>
            <span className={styles.noPackagesIcon}>&#x1F4E6;</span>
            <h2 className={styles.noPackagesTitle}>{labels.noPackagesTitle}</h2>
            <p className={styles.noPackagesText}>{labels.noPackagesText}</p>
            <Link href={`/${locale}/esim`} className={styles.backLink}>
              &larr; {labels.backToList}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
