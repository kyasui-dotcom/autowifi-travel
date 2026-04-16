import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/lib/components/JsonLd";
import { generatePageMetadata, getBaseUrl } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import styles from "../legal.module.css";

type LegalLocale = "en" | "ja" | "ko" | "zh";

interface Row {
  label: string;
  value: string;
}

interface DisclosureContent {
  title: string;
  description: string;
  updatedAtLabel: string;
  updatedAt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  intro: string;
  rows: Row[];
  refundNote: string;
}

const CONTENT: Record<LegalLocale, DisclosureContent> = {
  en: {
    title: "Commercial Disclosure",
    description:
      "Business information disclosed under Japan's Act on Specified Commercial Transactions (Tokutei Shōtorihiki-hō), covering the operator, contact, pricing, payment, delivery, and return terms for eSIM purchases on this site.",
    updatedAtLabel: "Last updated",
    updatedAt: "2026-04-16",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Commercial Disclosure",
    intro:
      "The following information is disclosed under Japan's Act on Specified Commercial Transactions for purchases made through this site.",
    rows: [
      { label: "Operator", value: "Business Lab Co., Ltd. (株式会社ビジネスラボ)" },
      { label: "Representative", value: "Tomoko Yasui (安井 智子)" },
      {
        label: "Address",
        value:
          "N&E BLD. 6F, 1-12-4 Ginza, Chuo-ku, Tokyo 104-0061, Japan",
      },
      {
        label: "Phone",
        value:
          "Provided without delay upon request. Please contact us by email first.",
      },
      { label: "Email", value: "support@autowifi-travel.com" },
      {
        label: "Sales Price",
        value:
          "Displayed on each eSIM product page. Prices include Japan consumption tax (10%) where applicable.",
      },
      {
        label: "Additional Charges",
        value:
          "Customer-side mobile data fees, international card processing fees (if any), and currency conversion fees charged by the customer's card issuer.",
      },
      {
        label: "Accepted Payment Methods",
        value: "Major credit cards (Visa, Mastercard, American Express, JCB).",
      },
      { label: "Payment Timing", value: "At the time of order." },
      {
        label: "Delivery Timing",
        value:
          "eSIM activation credentials (QR code and installation instructions) are issued and delivered by email immediately after order confirmation, typically within a few minutes.",
      },
      {
        label: "Device Requirements",
        value:
          "An eSIM-compatible, carrier-unlocked device. Compatibility varies by device model; please check the manufacturer's eSIM compatibility list before purchase.",
      },
      {
        label: "Returns and Refunds",
        value:
          "Refunds are available only before activation. Once the eSIM has been installed and a data session has started on the carrier network, refunds are not available.",
      },
    ],
    refundNote:
      "Full refund conditions are described on the Refund Policy page.",
  },
  ja: {
    title: "特定商取引法に基づく表記",
    description:
      "特定商取引法に基づき、本サイトでの eSIM 販売に関する事業者情報、価格、支払い、引渡し、返品条件などを表記しています。",
    updatedAtLabel: "最終更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "ホーム",
    breadcrumbCurrent: "特定商取引法に基づく表記",
    intro:
      "特定商取引法に基づき、本サイトを通じてお買い求めいただく eSIM に関する以下の情報を表記いたします。",
    rows: [
      { label: "販売事業者", value: "株式会社ビジネスラボ" },
      { label: "代表者", value: "安井 智子" },
      {
        label: "所在地",
        value: "〒104-0061 東京都中央区銀座1丁目12番4号 N&E BLD. 6F",
      },
      {
        label: "電話番号",
        value:
          "請求があれば遅滞なく提供いたします。まずはメールにてお問い合わせください。",
      },
      { label: "メールアドレス", value: "support@autowifi-travel.com" },
      {
        label: "販売価格",
        value:
          "各 eSIM 商品ページに記載しています。日本国内で課税対象となる場合は消費税（10%）を含む価格です。",
      },
      {
        label: "商品代金以外の必要料金",
        value:
          "お客様側のモバイル通信料金、海外決済手数料（発生する場合）、カード会社による為替手数料。",
      },
      {
        label: "お支払い方法",
        value: "主要クレジットカード（Visa / Mastercard / American Express / JCB）",
      },
      { label: "お支払い時期", value: "ご注文時。" },
      {
        label: "引渡し時期",
        value:
          "ご注文確認後、ただちに eSIM の開通情報（QR コードと設定手順）をメールで送付します。通常は数分以内にお届けします。",
      },
      {
        label: "動作環境",
        value:
          "eSIM 対応かつ SIM ロック解除済みの端末。対応状況は機種により異なります。ご購入前にメーカー公式の eSIM 対応機種一覧をご確認ください。",
      },
      {
        label: "返品・交換について",
        value:
          "返金は開通前に限りお受けしています。eSIM を端末にインストールし、キャリア網上でデータセッションが開始された後は、返金をお受けできません。",
      },
    ],
    refundNote: "詳細は「返金ポリシー」ページをご確認ください。",
  },
  ko: {
    title: "특정상거래법에 기반한 표기",
    description:
      "일본 특정상거래법에 따라, 본 사이트에서의 eSIM 판매와 관련된 사업자 정보, 가격, 결제, 인도, 반품 조건 등을 표기합니다.",
    updatedAtLabel: "최종 업데이트",
    updatedAt: "2026-04-16",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "특정상거래법에 기반한 표기",
    intro:
      "일본 특정상거래법에 따라, 본 사이트를 통해 구매하는 eSIM에 관한 다음 정보를 표기합니다.",
    rows: [
      { label: "판매 사업자", value: "주식회사 비즈니스 랩 (株式会社ビジネスラボ)" },
      { label: "대표자", value: "야스이 토모코 (安井 智子)" },
      {
        label: "소재지",
        value:
          "〒104-0061 일본 도쿄도 주오구 긴자 1초메 12-4 N&E BLD. 6F",
      },
      {
        label: "전화번호",
        value: "요청 시 지체 없이 제공해 드립니다. 먼저 이메일로 문의해 주세요.",
      },
      { label: "이메일", value: "support@autowifi-travel.com" },
      {
        label: "판매 가격",
        value:
          "각 eSIM 상품 페이지에 명시되어 있습니다. 일본 내 과세 대상인 경우 소비세(10%)가 포함됩니다.",
      },
      {
        label: "상품 대금 외의 필요 요금",
        value:
          "고객 측의 모바일 데이터 요금, 해외 결제 수수료(발생 시), 카드사의 환율 수수료.",
      },
      {
        label: "결제 수단",
        value: "주요 신용카드 (Visa / Mastercard / American Express / JCB)",
      },
      { label: "결제 시기", value: "주문 시." },
      {
        label: "인도 시기",
        value:
          "주문 확인 직후 eSIM 개통 정보(QR 코드 및 설치 안내)를 이메일로 발송합니다. 일반적으로 수 분 이내에 도착합니다.",
      },
      {
        label: "사용 조건",
        value:
          "eSIM을 지원하는 SIM 잠금 해제 단말기. 지원 여부는 기종에 따라 다릅니다. 구매 전 제조사 공식 eSIM 호환 기종 목록을 확인해 주세요.",
      },
      {
        label: "반품·환불",
        value:
          "환불은 개통 전에만 가능합니다. eSIM을 단말에 설치하여 통신사 망에서 데이터 세션이 시작된 후에는 환불할 수 없습니다.",
      },
    ],
    refundNote: "자세한 조건은 “환불 정책” 페이지를 참고하세요.",
  },
  zh: {
    title: "基于特定商业交易法的标示",
    description:
      "根据日本《特定商业交易法》，披露与本网站 eSIM 销售相关的经营者信息、价格、支付、交付及退款条件等事项。",
    updatedAtLabel: "最后更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "基于特定商业交易法的标示",
    intro:
      "依据日本《特定商业交易法》，对通过本网站购买的 eSIM 标示如下信息。",
    rows: [
      { label: "销售经营者", value: "Business Lab Co., Ltd.（株式会社 ビジネスラボ）" },
      { label: "代表人", value: "安井 智子（Tomoko Yasui）" },
      {
        label: "所在地",
        value:
          "〒104-0061 日本东京都中央区银座 1 丁目 12 番 4 号 N&E BLD. 6F",
      },
      {
        label: "电话号码",
        value: "应请求将无延迟地提供。请先通过邮件联系我们。",
      },
      { label: "电子邮件", value: "support@autowifi-travel.com" },
      {
        label: "销售价格",
        value:
          "标示于各 eSIM 商品页面。属于日本国内应税的，包含消费税（10%）。",
      },
      {
        label: "商品价款以外的必要费用",
        value:
          "用户一侧的移动数据费用、海外支付手续费（如发生），及银行/发卡机构收取的汇率费用。",
      },
      {
        label: "支付方式",
        value: "主流信用卡 (Visa / Mastercard / American Express / JCB)",
      },
      { label: "支付时间", value: "下单时。" },
      {
        label: "交付时间",
        value:
          "订单确认后立即以电子邮件发送 eSIM 开通信息（二维码与安装说明），通常在数分钟内送达。",
      },
      {
        label: "使用条件",
        value:
          "兼容 eSIM 且已解除 SIM 锁的设备。具体兼容性因机型而异，购买前请在厂商官方的 eSIM 兼容机型列表中确认。",
      },
      {
        label: "退货与退款",
        value:
          "仅在开通前可退款。eSIM 安装并在运营商网络上开始数据会话后不可退款。",
      },
    ],
    refundNote: "详细条件请参阅“退款政策”页面。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;

  return generatePageMetadata({
    locale: locale as Locale,
    path: "/commercial-disclosure",
    title: content.title,
    description: content.description,
    noIndex: true,
  });
}

export default async function CommercialDisclosurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/commercial-disclosure`;

  return (
    <div className={styles.container}>
      <BreadcrumbJsonLd
        items={[
          { name: content.breadcrumbHome, url: `${baseUrl}/${locale}` },
          { name: content.breadcrumbCurrent, url },
        ]}
      />

      <nav className={styles.breadcrumb}>
        <Link href={`/${locale}`}>{content.breadcrumbHome}</Link>
        <span>/</span>
        <span>{content.breadcrumbCurrent}</span>
      </nav>

      <header className={styles.hero}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.description}>{content.description}</p>
        <time className={styles.updatedAt} dateTime={content.updatedAt}>
          {content.updatedAtLabel}: {content.updatedAt}
        </time>
      </header>

      <section className={styles.section}>
        <p className={styles.paragraph}>{content.intro}</p>
        <ul className={styles.list}>
          {content.rows.map((row) => (
            <li key={row.label}>
              <strong>{row.label}</strong>: {row.value}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <p className={styles.paragraph}>
          <Link href={`/${locale}/refund-policy`}>{content.refundNote}</Link>
        </p>
      </section>
    </div>
  );
}
