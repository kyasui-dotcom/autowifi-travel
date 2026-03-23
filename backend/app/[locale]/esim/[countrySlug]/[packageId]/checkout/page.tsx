import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import { getCountryBySlug, getCountryName } from "@/lib/countries";
import { getAiraloClient } from "@/lib/airalo";
import { getEnv } from "@/lib/env";
import type { Locale } from "@/lib/i18n/config";
import CheckoutForm from "./CheckoutForm";
import styles from "./page.module.css";

// Force SSR so Cloudflare context (D1 database) is available at request time
export const dynamic = "force-dynamic";

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
  invalidEmail: string;
  checkoutFailed: string;
  missingCheckoutUrl: string;
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
    invalidEmail: "Please enter a valid email address.",
    checkoutFailed: "Checkout failed. Please try again.",
    missingCheckoutUrl: "No checkout URL returned.",
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
    invalidEmail: "有効なメールアドレスを入力してください。",
    checkoutFailed: "決済の開始に失敗しました。もう一度お試しください。",
    missingCheckoutUrl: "決済ページのURLを取得できませんでした。",
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
    invalidEmail: "유효한 이메일 주소를 입력해 주세요.",
    checkoutFailed: "결제를 시작하지 못했습니다. 다시 시도해 주세요.",
    missingCheckoutUrl: "결제 URL을 받지 못했습니다.",
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
    invalidEmail: "请输入有效的电子邮箱地址。",
    checkoutFailed: "无法开始支付，请稍后重试。",
    missingCheckoutUrl: "未返回支付链接。",
  },
};

const CHECKOUT_UI: Record<string, {
  eyebrow: string;
  subtitle: (countryName: string) => string;
  chips: string[];
  formTitle: string;
  formLead: string;
  stepsTitle: string;
  steps: Array<{ title: string; body: (countryName: string) => string }>;
  trustTitle: string;
  trustItems: Array<(countryName: string) => string>;
  summaryEyebrow: string;
}> = {
  en: {
    eyebrow: "Secure travel checkout",
    subtitle: (countryName) =>
      `Finish your ${countryName} eSIM order in a few steps. Your activation details will arrive by email right after payment.`,
    chips: [
      "Instant digital delivery",
      "No physical SIM required",
      "Stripe-secured payment",
    ],
    formTitle: "Where should we send your eSIM?",
    formLead: "Use an email address you can access while traveling. We will send the QR code and installation details there.",
    stepsTitle: "What happens next",
    steps: [
      {
        title: "Pay securely",
        body: () => "Complete checkout with Stripe. We only ask for the email needed to deliver your eSIM details.",
      },
      {
        title: "Get your activation email",
        body: () => "A confirmation email arrives with your QR code and setup instructions for supported devices.",
      },
      {
        title: "Install before departure",
        body: (countryName) => `Install your ${countryName} eSIM before you fly, then switch on mobile data after arrival.`,
      },
    ],
    trustTitle: "Why travelers choose this flow",
    trustItems: [
      () => "You keep your regular phone number on supported dual-SIM devices.",
      () => "Your plan details stay accessible from the order page after purchase.",
      () => "No store visit or airport SIM counter needed.",
    ],
    summaryEyebrow: "Ready to activate",
  },
  ja: {
    eyebrow: "安全な購入手続き",
    subtitle: (countryName) =>
      `${countryName}向けeSIMの購入を数ステップで完了できます。決済後すぐに、設定情報をメールで受け取れます。`,
    chips: [
      "即時デジタル納品",
      "物理SIM不要",
      "Stripeの安全決済",
    ],
    formTitle: "eSIMの送付先メール",
    formLead: "旅行中にも確認しやすいメールアドレスを入力してください。QRコードと設定情報をこの宛先へ送ります。",
    stepsTitle: "購入後の流れ",
    steps: [
      {
        title: "安全に決済",
        body: () => "Stripeで決済を完了します。入力はeSIMをお届けするためのメールアドレスだけです。",
      },
      {
        title: "設定メールを受信",
        body: () => "決済後、QRコードと対応端末向けの設定手順がメールで届きます。",
      },
      {
        title: "出発前にインストール",
        body: (countryName) => `${countryName}向けeSIMは渡航前に入れておき、現地到着後にモバイルデータを有効化するのがおすすめです。`,
      },
    ],
    trustTitle: "この購入導線の安心ポイント",
    trustItems: [
      () => "対応端末なら普段の電話番号を残したまま使えます。",
      () => "購入後も注文詳細ページからQRコードを再確認できます。",
      () => "空港カウンターや店舗に寄る必要がありません。",
    ],
    summaryEyebrow: "すぐに設定可能",
  },
  ko: {
    eyebrow: "안전한 결제",
    subtitle: (countryName) =>
      `${countryName} eSIM 주문을 몇 단계만에 마칠 수 있습니다. 결제 후 바로 설치 정보가 이메일로 발송됩니다.`,
    chips: [
      "즉시 디지털 발송",
      "물리 SIM 불필요",
      "Stripe 보안 결제",
    ],
    formTitle: "eSIM을 받을 이메일",
    formLead: "여행 중에도 확인할 수 있는 이메일을 입력해 주세요. QR 코드와 설치 정보가 이 주소로 전달됩니다.",
    stepsTitle: "결제 후 진행 과정",
    steps: [
      {
        title: "안전하게 결제",
        body: () => "Stripe로 결제를 완료합니다. 입력 정보는 eSIM 발송에 필요한 이메일뿐입니다.",
      },
      {
        title: "설치 메일 받기",
        body: () => "결제 후 QR 코드와 지원 기기용 설치 안내가 이메일로 도착합니다.",
      },
      {
        title: "출발 전에 설치",
        body: (countryName) => `${countryName} eSIM은 출발 전에 설치하고 현지 도착 후 데이터만 켜는 방식이 가장 수월합니다.`,
      },
    ],
    trustTitle: "이 결제 흐름이 편한 이유",
    trustItems: [
      () => "지원 기기에서는 기존 번호를 유지한 채 사용할 수 있습니다.",
      () => "구매 후 주문 상세 페이지에서 QR 코드를 다시 확인할 수 있습니다.",
      () => "공항 SIM 카운터를 찾을 필요가 없습니다.",
    ],
    summaryEyebrow: "바로 설치 가능",
  },
  zh: {
    eyebrow: "安全支付",
    subtitle: (countryName) =>
      `几步内即可完成${countryName} eSIM下单。支付成功后，安装信息会立刻发送到邮箱。`,
    chips: [
      "即时数字交付",
      "无需实体SIM卡",
      "Stripe安全支付",
    ],
    formTitle: "接收 eSIM 的邮箱",
    formLead: "请输入旅途中也能查看的邮箱地址。二维码和安装说明会发送到这里。",
    stepsTitle: "下单后会发生什么",
    steps: [
      {
        title: "安全支付",
        body: () => "通过 Stripe 完成支付。我们只需要用于发送 eSIM 的邮箱地址。",
      },
      {
        title: "收到安装邮件",
        body: () => "付款成功后，二维码和支持设备的安装步骤会发送到邮箱。",
      },
      {
        title: "出发前安装",
        body: (countryName) => `建议在出发前安装${countryName} eSIM，抵达后开启蜂窝数据即可更快联网。`,
      },
    ],
    trustTitle: "这套购买流程的优势",
    trustItems: [
      () => "在支持的双卡设备上可保留原有号码。",
      () => "购买后仍可在订单详情页重新查看二维码。",
      () => "无需去机场柜台购买实体SIM。",
    ],
    summaryEyebrow: "可立即安装",
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
  const ui = CHECKOUT_UI[locale] ?? CHECKOUT_UI.en;
  const countryName = getCountryName(country, locale);

  // Fetch package from Airalo API
  let pkg: { title: string; data: string; validity: number; price: number; airaloPackageId: string } | null = null;
  try {
    const env = await getEnv();
    const client = getAiraloClient(env);
    const packages = await client.getPackages(country.code);
    const found = packages.find((p) => p.id === packageId);
    if (found) {
      pkg = {
        title: found.title,
        data: found.data,
        validity: found.validity,
        price: found.price,
        airaloPackageId: found.id,
      };
    }
  } catch {
    // API error
  }

  if (!pkg) {
    notFound();
  }

  const priceDisplay = pkg.price.toFixed(2);

  return (
    <div className={styles.container}>
      <a href={`/${locale}/esim/${countrySlug}`} className={styles.backLink}>
        &larr; {labels.back}
      </a>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{ui.eyebrow}</span>
          <h1 className={styles.pageTitle}>{labels.checkout}</h1>
          <p className={styles.pageSubtitle}>{ui.subtitle(countryName)}</p>
          <div className={styles.heroChips}>
            {ui.chips.map((chip) => (
              <span key={chip} className={styles.heroChip}>
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.heroPriceCard}>
          <span className={styles.heroPriceLabel}>{labels.total}</span>
          <strong className={styles.heroPrice}>${priceDisplay}</strong>
          <span className={styles.heroPriceNote}>USD</span>
          <div className={styles.heroDestination}>{country.flag} {countryName}</div>
          <p className={styles.heroPlan}>{pkg.title}</p>
        </div>
      </section>

      <div className={styles.checkoutGrid}>
        <div className={styles.mainColumn}>
          <CheckoutForm
            packageId={packageId}
            locale={locale}
            labels={{
              formTitle: ui.formTitle,
              formLead: ui.formLead,
              emailLabel: labels.emailLabel,
              emailPlaceholder: labels.emailPlaceholder,
              emailHint: labels.emailHint,
              submitButton: labels.submitButton,
              submitting: labels.submitting,
              invalidEmail: labels.invalidEmail,
              checkoutFailed: labels.checkoutFailed,
              missingCheckoutUrl: labels.missingCheckoutUrl,
            }}
          />

          <section className={styles.stepsCard}>
            <h2 className={styles.stepsTitle}>{ui.stepsTitle}</h2>
            <div className={styles.stepsList}>
              {ui.steps.map((step, index) => (
                <div key={step.title} className={styles.stepItem}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepHeading}>{step.title}</h3>
                    <p className={styles.stepBody}>{step.body(countryName)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryEyebrow}>{ui.summaryEyebrow}</span>
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
              <span className={styles.summaryValue}>{pkg.data}</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{labels.validity}</span>
              <span className={styles.summaryValue}>{pkg.validity} {labels.days}</span>
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

          <section className={styles.trustCard}>
            <h2 className={styles.trustTitle}>{ui.trustTitle}</h2>
            <ul className={styles.trustList}>
              {ui.trustItems.map((item) => (
                <li key={item(countryName)} className={styles.trustItem}>
                  {item(countryName)}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
