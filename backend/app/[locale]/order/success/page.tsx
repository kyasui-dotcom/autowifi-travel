import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import styles from "./page.module.css";

const LABELS: Record<string, {
  title: string;
  subtitle: string;
  orderNumber: string;
  nextSteps: string;
  step1: string;
  step2: string;
  step3: string;
  homeLink: string;
}> = {
  en: {
    title: "Order Confirmed!",
    subtitle: "Your eSIM purchase was successful. Check your email for activation instructions.",
    orderNumber: "Order Number",
    nextSteps: "Next Steps",
    step1: "Check your email for the eSIM QR code and activation instructions",
    step2: "Scan the QR code in your device settings to install the eSIM",
    step3: "Activate the eSIM when you arrive at your destination",
    homeLink: "Back to Home",
  },
  ja: {
    title: "ご注文確定!",
    subtitle: "eSIMの購入が完了しました。アクティベーション手順をメールでお送りしましたのでご確認ください。",
    orderNumber: "注文番号",
    nextSteps: "次のステップ",
    step1: "メールでeSIM QRコードとアクティベーション手順をご確認ください",
    step2: "デバイスの設定でQRコードをスキャンしてeSIMをインストールしてください",
    step3: "渡航先に到着したらeSIMをアクティベートしてください",
    homeLink: "ホームに戻る",
  },
  ko: {
    title: "주문 확인!",
    subtitle: "eSIM 구매가 완료되었습니다. 활성화 안내를 이메일로 확인해 주세요.",
    orderNumber: "주문 번호",
    nextSteps: "다음 단계",
    step1: "이메일에서 eSIM QR 코드와 활성화 안내를 확인하세요",
    step2: "기기 설정에서 QR 코드를 스캔하여 eSIM을 설치하세요",
    step3: "목적지에 도착하면 eSIM을 활성화하세요",
    homeLink: "홈으로 돌아가기",
  },
  zh: {
    title: "订单已确认!",
    subtitle: "您的eSIM购买已成功。请查看邮箱获取激活说明。",
    orderNumber: "订单号",
    nextSteps: "下一步",
    step1: "查看邮箱中的eSIM二维码和激活说明",
    step2: "在设备设置中扫描二维码安装eSIM",
    step3: "到达目的地后激活eSIM",
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
      path: "/order/success",
      title: "Order Confirmed | AutoWiFi eSIM",
      description: "Your eSIM order has been confirmed. Check your email for activation instructions.",
      noIndex: true,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function OrderSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { locale } = await params;
  const { orderId } = await searchParams;
  const labels = LABELS[locale] ?? LABELS.en;

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>&#x2714;</span>
      </div>

      <h1 className={styles.title}>{labels.title}</h1>
      <p className={styles.subtitle}>{labels.subtitle}</p>

      {orderId && (
        <div className={styles.orderNumber}>
          <span className={styles.orderNumberLabel}>{labels.orderNumber}</span>
          <span className={styles.orderNumberValue}>{orderId}</span>
        </div>
      )}

      <div className={styles.infoCard}>
        <h3>{labels.nextSteps}</h3>
        <ul>
          <li>{labels.step1}</li>
          <li>{labels.step2}</li>
          <li>{labels.step3}</li>
        </ul>
      </div>

      <Link href={`/${locale}`} className={styles.homeLink}>
        &larr; {labels.homeLink}
      </Link>
    </div>
  );
}
