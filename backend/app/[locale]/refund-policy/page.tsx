import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/lib/components/JsonLd";
import { generatePageMetadata, getBaseUrl } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import styles from "../legal.module.css";

type LegalLocale = "en" | "ja" | "ko" | "zh";

interface Section {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface RefundContent {
  title: string;
  description: string;
  updatedAtLabel: string;
  updatedAt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  sections: Section[];
}

const CONTENT: Record<LegalLocale, RefundContent> = {
  en: {
    title: "Refund Policy",
    description:
      "Refunds are available only before the purchased eSIM has been activated. This page explains what counts as activation, how to request a refund, and which situations are not eligible.",
    updatedAtLabel: "Last updated",
    updatedAt: "2026-04-16",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Refund Policy",
    sections: [
      {
        heading: "Refund Window",
        paragraphs: [
          "Refunds are available only while the eSIM is still in an unactivated state. Once the eSIM has been installed on a device and its data session has started on the carrier network, the plan is considered activated and is no longer refundable.",
        ],
      },
      {
        heading: "Pre-Activation Refund",
        paragraphs: [
          "If you purchased an eSIM and have not yet installed or activated it, contact us at support@autowifi-travel.com with your order number. We will verify the status with the upstream connectivity provider and, if activation has not occurred, issue a refund to the original payment method.",
        ],
      },
      {
        heading: "What Is Not Eligible",
        paragraphs: [
          "The following situations are not eligible for refunds:",
        ],
        bullets: [
          "The eSIM has been installed and a data session has started",
          "The plan's validity period has been consumed or expired",
          "The purchase was made for a device not listed as eSIM compatible",
          "The destination country or carrier experienced a temporary outage outside our control",
        ],
      },
      {
        heading: "Defective or Non-Delivered eSIM",
        paragraphs: [
          "If the eSIM QR code or activation credentials were never delivered, or if a technical defect prevents activation on a supported device, please contact us. We will work with the upstream provider to reissue the eSIM or refund the purchase.",
        ],
      },
      {
        heading: "How to Request",
        paragraphs: [
          "Email support@autowifi-travel.com with your order number, purchase date, and a brief description of the issue. Typical review and response time is 2–5 business days.",
        ],
      },
    ],
  },
  ja: {
    title: "返金ポリシー",
    description:
      "返金はご購入いただいた eSIM が「開通前」の場合に限りお受けしています。本ページでは開通の定義、返金のご依頼方法、対象外となるケースをご説明します。",
    updatedAtLabel: "最終更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "ホーム",
    breadcrumbCurrent: "返金ポリシー",
    sections: [
      {
        heading: "返金可能な期間",
        paragraphs: [
          "返金は、eSIM が未開通（未使用）の状態に限りお受けしています。端末に eSIM をインストールし、キャリア網上でデータセッションが開始された時点で「開通済み」とみなし、返金の対象外となります。",
        ],
      },
      {
        heading: "開通前の返金",
        paragraphs: [
          "eSIM を未インストール・未開通のまま返金をご希望の場合は、注文番号とともに support@autowifi-travel.com までご連絡ください。上流の通信事業者で開通状況を確認し、未開通であれば元のお支払い方法へご返金いたします。",
        ],
      },
      {
        heading: "返金対象外",
        paragraphs: [
          "以下のケースは返金の対象外です：",
        ],
        bullets: [
          "eSIM がインストール済みで、データセッションが開始されている",
          "プランの有効期間を消化・経過している",
          "eSIM 非対応端末向けに購入された",
          "当社の管理外で発生した渡航先キャリアの一時的な障害",
        ],
      },
      {
        heading: "不具合・未着の場合",
        paragraphs: [
          "eSIM の QR コードや開通情報がお手元に届かない場合、または対応端末であるにもかかわらず技術的な問題で開通できない場合は、当社までご連絡ください。上流の通信事業者と連携のうえ、再発行または返金で対応します。",
        ],
      },
      {
        heading: "依頼方法",
        paragraphs: [
          "注文番号・購入日・症状を添えて support@autowifi-travel.com までメールでご連絡ください。ご返信まで通常 2〜5 営業日を要します。",
        ],
      },
    ],
  },
  ko: {
    title: "환불 정책",
    description:
      "환불은 구매한 eSIM이 “개통 전”인 경우에 한해 가능합니다. 본 페이지는 개통의 정의, 환불 요청 방법, 환불 대상이 아닌 경우를 설명합니다.",
    updatedAtLabel: "최종 업데이트",
    updatedAt: "2026-04-16",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "환불 정책",
    sections: [
      {
        heading: "환불 가능 기간",
        paragraphs: [
          "환불은 eSIM이 아직 개통되지 않은(미사용) 상태에서만 가능합니다. 단말기에 eSIM을 설치하고 통신사 망에서 데이터 세션이 시작된 시점부터는 “개통된 것”으로 간주되어 환불 대상에서 제외됩니다.",
        ],
      },
      {
        heading: "개통 전 환불",
        paragraphs: [
          "eSIM을 설치·개통하지 않은 상태에서 환불을 원하시면 주문 번호와 함께 support@autowifi-travel.com 으로 연락해 주세요. 상위 통신사에서 개통 여부를 확인한 뒤, 미개통이 확인되면 원 결제 수단으로 환불해 드립니다.",
        ],
      },
      {
        heading: "환불 대상이 아닌 경우",
        paragraphs: [
          "다음 경우는 환불 대상이 아닙니다:",
        ],
        bullets: [
          "eSIM이 설치되어 데이터 세션이 시작된 경우",
          "요금제의 유효 기간이 소진되었거나 만료된 경우",
          "eSIM 비호환 단말기용으로 구매한 경우",
          "당사의 통제 밖에서 발생한 현지 통신사의 일시 장애",
        ],
      },
      {
        heading: "불량·미배송의 경우",
        paragraphs: [
          "eSIM QR 코드나 개통 정보가 전달되지 않았거나, 지원 단말기인데도 기술적 문제로 개통이 불가능한 경우 당사로 연락해 주세요. 상위 통신사와 협의하여 재발급 또는 환불로 대응합니다.",
        ],
      },
      {
        heading: "요청 방법",
        paragraphs: [
          "주문 번호·구매일·증상을 포함해 support@autowifi-travel.com 으로 이메일을 보내 주세요. 회신까지 보통 2〜5 영업일이 소요됩니다.",
        ],
      },
    ],
  },
  zh: {
    title: "退款政策",
    description:
      "仅在所购 eSIM 尚未开通（激活）的情况下可申请退款。本页面说明何为开通、如何申请退款，以及哪些情况不属于退款范围。",
    updatedAtLabel: "最后更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "退款政策",
    sections: [
      {
        heading: "可退款期间",
        paragraphs: [
          "仅当 eSIM 仍处于未开通（未使用）状态时可退款。一旦在设备上完成安装并在运营商网络上开始数据会话，即视为“已开通”，不再属于退款范围。",
        ],
      },
      {
        heading: "开通前退款",
        paragraphs: [
          "若您购买的 eSIM 尚未安装或激活，请附上订单号发送邮件至 support@autowifi-travel.com。我们会与上游通信合作方确认开通状态，若确认未开通，将按原支付方式退款。",
        ],
      },
      {
        heading: "不予退款的情形",
        paragraphs: [
          "以下情形不属于退款范围：",
        ],
        bullets: [
          "eSIM 已安装并已开始数据会话",
          "套餐有效期已消耗或已过期",
          "购买用于非 eSIM 兼容设备",
          "目的地运营商在我方不可控范围内发生临时故障",
        ],
      },
      {
        heading: "故障或未送达",
        paragraphs: [
          "若未收到 eSIM 的二维码或开通信息，或在受支持的设备上因技术问题无法开通，请联系我们。我们将与上游通信合作方沟通，通过重新发放或退款方式处理。",
        ],
      },
      {
        heading: "申请方式",
        paragraphs: [
          "请附上订单号、购买日期与问题说明，发邮件至 support@autowifi-travel.com。通常 2–5 个工作日内答复。",
        ],
      },
    ],
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
    path: "/refund-policy",
    title: content.title,
    description: content.description,
    noIndex: true,
  });
}

export default async function RefundPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/refund-policy`;

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

      {content.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className={styles.list}>
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
