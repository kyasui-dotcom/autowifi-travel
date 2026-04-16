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

interface TermsContent {
  title: string;
  description: string;
  updatedAtLabel: string;
  updatedAt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  sections: Section[];
}

const CONTENT: Record<LegalLocale, TermsContent> = {
  en: {
    title: "Terms of Service",
    description:
      "These terms explain the rules for using AutoWiFi Travel, purchasing eSIM plans, and receiving customer support through the site.",
    updatedAtLabel: "Last updated",
    updatedAt: "2026-03-22",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Terms of Service",
    sections: [
      {
        heading: "Use of the Service",
        paragraphs: [
          "AutoWiFi Travel provides informational content and digital eSIM products for international travel. By using the site or placing an order, you agree to use the service lawfully and in accordance with these terms.",
          "You are responsible for confirming that your device supports eSIM and that the selected plan matches your destination, trip length, and expected data usage.",
        ],
      },
      {
        heading: "Orders and Delivery",
        paragraphs: [
          "eSIM products are delivered digitally after successful payment processing. Delivery timing may depend on payment confirmation, upstream provider availability, and the accuracy of the email address supplied at checkout.",
          "Because eSIM packages are digital products, activation status, package validity, and upstream carrier limitations may affect refund eligibility.",
        ],
      },
      {
        heading: "Acceptable Use",
        paragraphs: [
          "You may not use the site or purchased plans for unlawful activity, fraud, automated abuse, or interference with service operations. We may suspend orders or restrict access when abuse, misuse, or payment risk is detected.",
        ],
        bullets: [
          "Do not attempt to bypass payment or provisioning controls",
          "Do not interfere with the site, APIs, or partner systems",
          "Do not resell or redistribute plans in violation of provider rules",
        ],
      },
      {
        heading: "Support and Liability",
        paragraphs: [
          "We work to provide accurate package information and dependable delivery, but network quality, local carrier behavior, and device compatibility can vary by country and handset. To the extent permitted by law, indirect or consequential damages are excluded.",
          "If you experience a problem, contact support@autowifi-travel.com and include your order number so we can review the issue promptly.",
        ],
      },
    ],
  },
  ja: {
    title: "利用規約",
    description:
      "AutoWiFi Travel の利用方法、eSIMプランの購入条件、サポート提供に関する基本ルールを定めています。",
    updatedAtLabel: "最終更新",
    updatedAt: "2026-03-22",
    breadcrumbHome: "ホーム",
    breadcrumbCurrent: "利用規約",
    sections: [
      {
        heading: "サービスの利用",
        paragraphs: [
          "AutoWiFi Travel は、海外旅行向けの情報提供とデジタルeSIM商品の販売を行います。サイトの利用または注文の完了により、本規約に同意したものとみなします。",
          "ご利用者は、ご自身の端末が eSIM に対応していること、選択したプランが渡航先・日数・利用予定の通信量に合っていることを確認する責任を負います。",
        ],
      },
      {
        heading: "注文と提供",
        paragraphs: [
          "eSIM商品は、決済完了後にデジタル形式で提供されます。提供タイミングは決済確認、上流事業者の在庫状況、入力されたメールアドレスの正確性などの影響を受けることがあります。",
          "eSIMはデジタル商品であるため、開通状況、有効期限、上流キャリアの制約により返金可否が左右される場合があります。",
        ],
      },
      {
        heading: "禁止事項",
        paragraphs: [
          "不正利用、違法行為、自動化された乱用、サービス運営への妨害を目的とした利用は禁止します。不正決済や不審な利用が確認された場合、当社は注文の保留、提供停止、アクセス制限を行うことがあります。",
        ],
        bullets: [
          "決済や発行制御の回避を試みる行為",
          "サイト、API、提携先システムへの妨害行為",
          "提供条件に反する再販売や再配布",
        ],
      },
      {
        heading: "サポートと責任範囲",
        paragraphs: [
          "当社は正確な商品情報と安定した提供に努めますが、通信品質、現地キャリアの挙動、端末互換性は国や端末により異なります。法令上許される範囲で、間接損害や特別損害については責任を負いません。",
          "問題が発生した場合は、注文番号を添えて support@autowifi-travel.com までご連絡ください。内容を確認のうえ対応します。",
        ],
      },
    ],
  },
  ko: {
    title: "이용약관",
    description:
      "AutoWiFi Travel 이용, eSIM 플랜 구매, 고객 지원 제공에 관한 기본 규칙을 설명합니다.",
    updatedAtLabel: "최종 업데이트",
    updatedAt: "2026-03-22",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "이용약관",
    sections: [
      {
        heading: "서비스 이용",
        paragraphs: [
          "AutoWiFi Travel은 해외 여행자를 위한 정보와 디지털 eSIM 상품을 제공합니다. 사이트를 이용하거나 주문을 완료하면 본 약관에 동의한 것으로 간주됩니다.",
          "이용자는 자신의 기기가 eSIM을 지원하는지, 선택한 플랜이 목적지와 여행 기간, 예상 데이터 사용량에 적합한지 확인할 책임이 있습니다.",
        ],
      },
      {
        heading: "주문 및 제공",
        paragraphs: [
          "eSIM 상품은 결제 완료 후 디지털 방식으로 제공됩니다. 제공 시점은 결제 확인, 상위 공급자 상태, 체크아웃 시 입력한 이메일의 정확성 등에 따라 달라질 수 있습니다.",
          "eSIM은 디지털 상품이므로 개통 여부, 유효기간, 상위 통신사 제한에 따라 환불 가능 여부가 달라질 수 있습니다.",
        ],
      },
      {
        heading: "금지 행위",
        paragraphs: [
          "불법 행위, 사기, 자동화된 남용, 서비스 운영 방해 목적의 이용은 금지됩니다. 악용이나 결제 위험이 감지되면 주문 보류, 서비스 제한, 접근 차단이 이루어질 수 있습니다.",
        ],
        bullets: [
          "결제 또는 발급 제어를 우회하려는 시도",
          "사이트, API, 제휴 시스템을 방해하는 행위",
          "공급자 규정을 위반한 재판매 또는 재배포",
        ],
      },
      {
        heading: "지원 및 책임 범위",
        paragraphs: [
          "당사는 정확한 상품 정보와 안정적인 제공을 위해 노력하지만, 네트워크 품질, 현지 통신사 환경, 단말 호환성은 국가와 기기에 따라 달라질 수 있습니다. 관련 법령이 허용하는 범위에서 간접적 또는 결과적 손해에 대한 책임은 제외됩니다.",
          "문제가 발생하면 주문 번호와 함께 support@autowifi-travel.com 로 문의해 주세요. 신속히 확인하겠습니다.",
        ],
      },
    ],
  },
  zh: {
    title: "服务条款",
    description:
      "本条款说明使用 AutoWiFi Travel、购买 eSIM 套餐以及获取客户支持时适用的基本规则。",
    updatedAtLabel: "最后更新",
    updatedAt: "2026-03-22",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "服务条款",
    sections: [
      {
        heading: "服务使用",
        paragraphs: [
          "AutoWiFi Travel 提供国际旅行相关信息与数字 eSIM 商品。访问本站或完成订单即表示您同意按照本条款使用服务。",
          "您有责任确认自己的设备支持 eSIM，并确保所选套餐符合目的地、旅行时长和预期流量需求。",
        ],
      },
      {
        heading: "订单与交付",
        paragraphs: [
          "eSIM 商品在支付成功后以数字形式交付。交付时间可能受到支付确认、上游供应商可用性以及结账时填写邮箱准确性的影响。",
          "由于 eSIM 属于数字商品，是否激活、套餐有效期以及上游运营商限制等因素都可能影响退款资格。",
        ],
      },
      {
        heading: "禁止行为",
        paragraphs: [
          "不得将本站或购买的套餐用于违法活动、欺诈、自动化滥用或干扰服务运行。如检测到滥用、异常支付风险或违规行为，我们可能暂停订单或限制访问。",
        ],
        bullets: [
          "尝试绕过支付或开通控制",
          "干扰网站、API 或合作伙伴系统",
          "违反供应商规则进行转售或再分发",
        ],
      },
      {
        heading: "支持与责任限制",
        paragraphs: [
          "我们会尽力提供准确的套餐信息和稳定的交付体验，但网络质量、当地运营商行为以及设备兼容性会因国家和机型而不同。在法律允许范围内，我们不承担间接或附带损失责任。",
          "如遇到问题，请将订单号发送至 support@autowifi-travel.com，我们会尽快协助处理。",
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
    path: "/terms",
    title: content.title,
    description: content.description,
    noIndex: true,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/terms`;

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
