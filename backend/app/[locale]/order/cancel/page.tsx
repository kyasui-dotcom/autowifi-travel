import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import styles from "./page.module.css";

const LABELS: Record<string, {
  title: string;
  subtitle: string;
  retryButton: string;
  homeLink: string;
}> = {
  en: {
    title: "Payment Cancelled",
    subtitle: "Your payment was not completed. No charges have been made. You can try again or browse other plans.",
    retryButton: "Try Again",
    homeLink: "Back to Home",
  },
  ja: {
    title: "お支払いがキャンセルされました",
    subtitle: "お支払いは完了していません。請求は発生していません。再度お試しいただくか、他のプランをご覧ください。",
    retryButton: "もう一度試す",
    homeLink: "ホームに戻る",
  },
  ko: {
    title: "결제가 취소되었습니다",
    subtitle: "결제가 완료되지 않았습니다. 청구된 금액은 없습니다. 다시 시도하거나 다른 플랜을 둘러보세요.",
    retryButton: "다시 시도",
    homeLink: "홈으로 돌아가기",
  },
  zh: {
    title: "支付已取消",
    subtitle: "您的支付未完成。未产生任何费用。您可以重试或浏览其他套餐。",
    retryButton: "重试",
    homeLink: "返回首页",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    ...await generatePageMetadata({
      locale: locale as Locale,
      path: "/order/cancel",
      title: "Payment Cancelled | AutoWiFi eSIM",
      description: "Your payment was cancelled. No charges were made.",
      noIndex: true,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function OrderCancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = LABELS[locale] ?? LABELS.en;

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>&#x26A0;</span>
      </div>

      <h1 className={styles.title}>{labels.title}</h1>
      <p className={styles.subtitle}>{labels.subtitle}</p>

      <div className={styles.actions}>
        <Link href={`/${locale}/esim`} className={styles.retryButton}>
          {labels.retryButton} &rarr;
        </Link>
        <Link href={`/${locale}`} className={styles.homeLink}>
          {labels.homeLink}
        </Link>
      </div>
    </div>
  );
}
