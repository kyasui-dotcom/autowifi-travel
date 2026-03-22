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

interface PrivacyContent {
  title: string;
  description: string;
  updatedAtLabel: string;
  updatedAt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  sections: Section[];
}

const CONTENT: Record<LegalLocale, PrivacyContent> = {
  en: {
    title: "Privacy Policy",
    description:
      "This page explains what information AutoWiFi Travel collects, how we use it to deliver eSIM services, and how to contact us about privacy requests.",
    updatedAtLabel: "Last updated",
    updatedAt: "2026-03-22",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Privacy Policy",
    sections: [
      {
        heading: "Information We Collect",
        paragraphs: [
          "We collect the information required to process eSIM purchases and provide customer support. This may include your email address, order information, payment metadata, selected destination, and device-related installation details returned by our connectivity partners.",
          "We may also collect standard analytics and diagnostic information such as browser type, page views, referrer data, and error logs so we can improve site performance and resolve service issues.",
        ],
      },
      {
        heading: "How We Use Information",
        paragraphs: [
          "We use personal information to deliver purchased eSIM plans, send installation instructions, confirm orders, respond to support requests, and prevent fraud or service abuse.",
          "We also use aggregated and non-personal analytics data to understand demand, improve the checkout experience, and optimize the content and usability of the site.",
        ],
      },
      {
        heading: "Sharing and Service Providers",
        paragraphs: [
          "We share data only when needed to operate the service, including payment processors, email providers, analytics tools, and upstream eSIM infrastructure partners. Those providers receive only the information necessary for their role.",
        ],
        bullets: [
          "Payment and billing processing",
          "Order confirmation and support emails",
          "eSIM provisioning and balance notifications",
          "Security monitoring and operational analytics",
        ],
      },
      {
        heading: "Your Choices",
        paragraphs: [
          "If you would like to access, correct, or delete personal information associated with an order, contact us at support@autowifi.travel. We will review requests in accordance with applicable law and operational obligations such as fraud prevention and transaction record retention.",
        ],
      },
    ],
  },
  ja: {
    title: "プライバシーポリシー",
    description:
      "AutoWiFi Travel がどのような情報を取得し、eSIM提供やサポートのためにどのように利用するかを説明します。",
    updatedAtLabel: "最終更新",
    updatedAt: "2026-03-22",
    breadcrumbHome: "ホーム",
    breadcrumbCurrent: "プライバシーポリシー",
    sections: [
      {
        heading: "取得する情報",
        paragraphs: [
          "当社は、eSIMの購入処理とサポート提供に必要な情報を取得します。これにはメールアドレス、注文情報、決済関連メタデータ、渡航先、接続事業者から返されるインストール関連情報が含まれる場合があります。",
          "また、サイト改善や障害調査のために、ブラウザ種別、閲覧ページ、参照元、エラーログなどの一般的な分析情報を取得することがあります。",
        ],
      },
      {
        heading: "利用目的",
        paragraphs: [
          "取得した情報は、eSIMの提供、注文確認、インストール案内メール送信、問い合わせ対応、不正利用防止のために利用します。",
          "加えて、個人を特定しない集計データは、サイト改善、購入導線の最適化、コンテンツ品質の向上に活用します。",
        ],
      },
      {
        heading: "外部サービスとの連携",
        paragraphs: [
          "サービス運営に必要な範囲で、決済事業者、メール配信基盤、分析ツール、上流のeSIM提供パートナーと情報を共有する場合があります。共有は各業務に必要な最小限に限定します。",
        ],
        bullets: [
          "決済と請求処理",
          "注文確認メールとサポート対応",
          "eSIM発行と残量通知",
          "不正検知と運用分析",
        ],
      },
      {
        heading: "開示・訂正・削除の依頼",
        paragraphs: [
          "注文に紐づく個人情報の確認、修正、削除をご希望の場合は support@autowifi.travel までご連絡ください。法令上必要な保存義務や不正防止上の要件を踏まえて対応します。",
        ],
      },
    ],
  },
  ko: {
    title: "개인정보처리방침",
    description:
      "AutoWiFi Travel이 어떤 정보를 수집하고, eSIM 제공 및 지원을 위해 어떻게 사용하는지 설명합니다.",
    updatedAtLabel: "최종 업데이트",
    updatedAt: "2026-03-22",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "개인정보처리방침",
    sections: [
      {
        heading: "수집하는 정보",
        paragraphs: [
          "당사는 eSIM 주문 처리와 고객 지원에 필요한 정보를 수집합니다. 여기에는 이메일 주소, 주문 정보, 결제 메타데이터, 여행 목적지, 연결 파트너가 반환하는 설치 관련 정보가 포함될 수 있습니다.",
          "또한 사이트 개선과 장애 분석을 위해 브라우저 종류, 조회 페이지, 유입 경로, 오류 로그 등 일반적인 분석 정보를 수집할 수 있습니다.",
        ],
      },
      {
        heading: "이용 목적",
        paragraphs: [
          "수집한 정보는 eSIM 제공, 주문 확인, 설치 안내 메일 발송, 고객 문의 대응, 부정 사용 방지를 위해 사용됩니다.",
          "비식별 집계 데이터는 사이트 개선, 구매 흐름 최적화, 콘텐츠 품질 향상에 활용됩니다.",
        ],
      },
      {
        heading: "외부 서비스 제공자",
        paragraphs: [
          "서비스 운영에 필요한 범위에서 결제 처리사, 이메일 발송 도구, 분석 서비스, 상위 eSIM 파트너와 정보를 공유할 수 있습니다. 공유는 각 역할 수행에 필요한 최소 범위로 제한됩니다.",
        ],
        bullets: [
          "결제 및 청구 처리",
          "주문 확인 및 고객 지원 메일",
          "eSIM 발급 및 잔량 알림",
          "보안 모니터링 및 운영 분석",
        ],
      },
      {
        heading: "이용자 요청",
        paragraphs: [
          "주문과 관련된 개인정보의 열람, 정정, 삭제를 원하시면 support@autowifi.travel 로 연락해 주세요. 관련 법령과 사기 방지 목적에 따라 요청을 검토합니다.",
        ],
      },
    ],
  },
  zh: {
    title: "隐私政策",
    description:
      "本页面说明 AutoWiFi Travel 会收集哪些信息，以及这些信息如何用于提供 eSIM 服务与客户支持。",
    updatedAtLabel: "最后更新",
    updatedAt: "2026-03-22",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "隐私政策",
    sections: [
      {
        heading: "我们收集的信息",
        paragraphs: [
          "我们会收集处理 eSIM 订单和提供客户支持所必需的信息，包括邮箱地址、订单信息、支付相关元数据、目的地，以及连接合作方返回的安装相关信息。",
          "此外，我们还可能收集浏览器类型、访问页面、来源地址和错误日志等常规分析数据，以便改进网站体验和排查问题。",
        ],
      },
      {
        heading: "信息的使用方式",
        paragraphs: [
          "这些信息会用于交付 eSIM、发送订单确认和安装说明、处理支持请求，以及防止欺诈或滥用行为。",
          "去标识化后的汇总数据还会用于网站优化、购买流程改进和内容质量提升。",
        ],
      },
      {
        heading: "共享与服务提供方",
        paragraphs: [
          "在服务运行所需范围内，我们可能会与支付处理商、邮件服务商、分析工具和上游 eSIM 合作伙伴共享必要信息。共享范围仅限于完成相应服务所需的最少信息。",
        ],
        bullets: [
          "支付与账单处理",
          "订单确认和客户支持邮件",
          "eSIM 开通与余额提醒",
          "安全监控与运营分析",
        ],
      },
      {
        heading: "您的权利",
        paragraphs: [
          "如需访问、更正或删除与订单相关的个人信息，请联系 support@autowifi.travel。我们会依据适用法律以及反欺诈、交易记录保存等运营要求进行处理。",
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
    path: "/privacy",
    title: content.title,
    description: content.description,
    noIndex: true,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/privacy`;

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
