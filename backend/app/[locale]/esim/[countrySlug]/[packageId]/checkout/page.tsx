import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import { getCountryBySlug, getCountryName } from "@/lib/countries";
import { getDb } from "@/lib/db";
import { esimPackages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Locale } from "@/lib/i18n/config";
import CheckoutForm from "./CheckoutForm";
import styles from "./page.module.css";

const LABELS: Record<string, {
  checkout: string;
  back: string;
  orderSummary: string;
  destination: string;
  plan: string;
  data: string;
  validity: string;
  days: string;
  total: string;
  secureCheckout: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailHint: string;
  submitButton: string;
  submitting: string;
}> = {
  en: {
    checkout: "Checkout",
    back: "Back to plans",
    orderSummary: "Order Summary",
    destination: "Destination",
    plan: "Plan",
    data: "Data",
    validity: "Validity",
    days: "days",
    total: "Total",
    secureCheckout: "Secure checkout powered by Stripe",
    emailLabel: "Email Address",
    emailPlaceholder: "your@email.com",
    emailHint: "Your eSIM activation details will be sent to this email.",
    submitButton: "Proceed to Payment",
    submitting: "Processing...",
  },
  ja: {
    checkout: "購入手続き",
    back: "プラン一覧に戻る",
    orderSummary: "注文内容",
    destination: "渡航先",
    plan: "プラン",
    data: "データ量",
    validity: "有効期間",
    days: "日間",
    total: "合計",
    secureCheckout: "Stripeによる安全な決済",
    emailLabel: "メールアドレス",
    emailPlaceholder: "your@email.com",
    emailHint: "eSIMのアクティベーション情報をこのメールアドレスにお送りします。",
    submitButton: "お支払いに進む",
    submitting: "処理中...",
  },
  ko: {
    checkout: "결제",
    back: "플랜 목록으로 돌아가기",
    orderSummary: "주문 요약",
    destination: "목적지",
    plan: "플랜",
    data: "데이터",
    validity: "유효기간",
    days: "일",
    total: "합계",
    secureCheckout: "Stripe 보안 결제",
    emailLabel: "이메일 주소",
    emailPlaceholder: "your@email.com",
    emailHint: "eSIM 활성화 정보가 이 이메일로 발송됩니다.",
    submitButton: "결제 진행",
    submitting: "처리 중...",
  },
  zh: {
    checkout: "结账",
    back: "返回套餐列表",
    orderSummary: "订单摘要",
    destination: "目的地",
    plan: "套餐",
    data: "数据量",
    validity: "有效期",
    days: "天",
    total: "合计",
    secureCheckout: "Stripe安全支付",
    emailLabel: "电子邮件",
    emailPlaceholder: "your@email.com",
    emailHint: "eSIM激活信息将发送到此邮箱。",
    submitButton: "前往支付",
    submitting: "处理中...",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; countrySlug: string }>;
}): Promise<Metadata> {
  const { locale, countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);
  const countryName = country ? getCountryName(country, locale) : countrySlug;

  return {
    ...await generatePageMetadata({
      locale: locale as Locale,
      path: `/esim/${countrySlug}/checkout`,
      title: `Checkout - ${countryName} eSIM | AutoWiFi eSIM`,
      description: `Complete your purchase of a ${countryName} eSIM plan.`,
      noIndex: true,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string; countrySlug: string; packageId: string }>;
}) {
  const { locale, countrySlug, packageId } = await params;

  const country = getCountryBySlug(countrySlug);
  if (!country) {
    notFound();
  }

  const labels = LABELS[locale] ?? LABELS.en;
  const countryName = getCountryName(country, locale);

  // Fetch package from DB
  const db = await getDb();
  const [pkg] = await db
    .select()
    .from(esimPackages)
    .where(eq(esimPackages.id, Number(packageId)))
    .limit(1);

  if (!pkg) {
    notFound();
  }

  // priceUsd is stored in cents
  const priceDisplay = (pkg.priceUsd / 100).toFixed(2);

  return (
    <div className={styles.container}>
      <Link href={`/${locale}/esim/${countrySlug}`} className={styles.backLink}>
        &larr; {labels.back}
      </Link>

      <h1 className={styles.pageTitle}>{labels.checkout}</h1>

      <div className={styles.checkoutGrid}>
        {/* Checkout Form */}
        <CheckoutForm
          packageId={packageId}
          locale={locale}
          labels={{
            emailLabel: labels.emailLabel,
            emailPlaceholder: labels.emailPlaceholder,
            emailHint: labels.emailHint,
            submitButton: labels.submitButton,
            submitting: labels.submitting,
          }}
        />

        {/* Order Summary Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>{labels.orderSummary}</h2>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{labels.destination}</span>
              <span className={styles.summaryValue}>{country.flag} {countryName}</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{labels.plan}</span>
              <span className={styles.summaryValue}>{pkg.title}</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{labels.data}</span>
              <span className={styles.summaryValue}>{pkg.dataAmount}</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{labels.validity}</span>
              <span className={styles.summaryValue}>{pkg.validityDays} {labels.days}</span>
            </div>

            <div className={styles.summaryTotal}>
              <span className={styles.summaryTotalLabel}>{labels.total}</span>
              <span className={styles.summaryTotalPrice}>
                ${priceDisplay} USD
              </span>
            </div>

            <div className={styles.securityNote}>
              <span className={styles.securityIcon}>&#x1F512;</span>
              <span>{labels.secureCheckout}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
