import type { Metadata } from "next";
import Link from "next/link";
import { AboutPageJsonLd, BreadcrumbJsonLd } from "@/lib/components/JsonLd";
import { generatePageMetadata, getBaseUrl } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import styles from "../legal.module.css";

type LegalLocale = "en" | "ja" | "ko" | "zh";

interface Section {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface AboutContent {
  title: string;
  description: string;
  updatedAtLabel: string;
  updatedAt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  sections: Section[];
}

const CONTENT: Record<LegalLocale, AboutContent> = {
  en: {
    title: "About AutoWiFi Travel",
    description:
      "AutoWiFi Travel is a travel connectivity guide that helps people pick the right eSIM, pocket Wi-Fi, or roaming plan for international trips. We compare options, summarize the trade-offs, and surface what most travelers actually need to know.",
    updatedAtLabel: "Last updated",
    updatedAt: "2026-04-16",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About",
    sections: [
      {
        heading: "What We Do",
        paragraphs: [
          "We publish guides for travelers who want mobile data abroad without the friction of physical SIM swaps or surprise roaming charges. Each country guide explains realistic data needs, common provider strengths and weaknesses, and how installation actually works on iPhone and Android.",
          "We also run a small storefront that lets you purchase eSIMs we have referenced in our guides. Affiliate and reseller revenue funds the editorial work — see our Editorial Policy for how that revenue does and does not influence what we recommend.",
        ],
      },
      {
        heading: "Who We Are",
        paragraphs: [
          "AutoWiFi Travel is operated by Business Lab Co., Ltd., a Tokyo-based publisher. The site is maintained by the AutoWiFi Travel Editorial Team, a small group of writers and editors who curate publicly available carrier, device, and traveler-experience information into practical guidance.",
        ],
      },
      {
        heading: "How We Work",
        paragraphs: [
          "Our country and product guides are built by re-editing publicly available information from carrier sites, device manufacturers, regulator publications, and traveler community reports. We do not claim to lab-test every plan; we focus on accurately representing what each option offers and where it fits.",
          "When we are uncertain or information has changed, we update the page or remove the claim. If you spot something out of date, email us at support@autowifi-travel.com.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Editorial questions, corrections, or partnership inquiries: support@autowifi-travel.com",
        ],
      },
    ],
  },
  ja: {
    title: "AutoWiFi Travel について",
    description:
      "AutoWiFi Travel は、海外渡航時の通信手段（eSIM・ポケットWi-Fi・ローミング）を選ぶための情報サイトです。実際の旅行者が必要とする観点から、各サービスの長所・短所と使い方を整理してお伝えします。",
    updatedAtLabel: "最終更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "ホーム",
    breadcrumbCurrent: "運営者情報",
    sections: [
      {
        heading: "サイトの目的",
        paragraphs: [
          "物理SIMの差し替えやローミングの予期せぬ請求に悩まずに海外でデータ通信を使いたい方向けに、国別ガイドや比較記事を提供しています。各記事では現実的なデータ消費量の目安、主要プロバイダの特徴、iPhone / Android での設定手順を扱います。",
          "また、記事内で取り上げた eSIM を購入できる小規模なストアも運営しています。アフィリエイトおよび販売収益は編集活動の資金に充てられます。それが推薦内容にどう影響する／しないかは「編集方針」をご覧ください。",
        ],
      },
      {
        heading: "運営者",
        paragraphs: [
          "本サイトは東京の出版会社である株式会社ビジネスラボが運営しています。記事の執筆・編集は、AutoWiFi Travel 編集チーム（少人数のライター・編集者で構成）が担当しています。",
        ],
      },
      {
        heading: "編集の進め方",
        paragraphs: [
          "国別ガイド・製品ガイドは、通信キャリアの公式情報、デバイスメーカーの仕様、規制当局の公表資料、旅行者コミュニティの体験談など、Web 上で公開されている情報を再編集して作成しています。すべてのプランをラボでテストしているとは主張しません。各選択肢が「何を提供し、どこに向くか」を正確に伝えることに焦点を当てています。",
          "情報に確信が持てない場合や状況が変わった場合は、ページを更新するか該当箇所を削除します。古い情報を見つけた場合は support@autowifi-travel.com までご連絡ください。",
        ],
      },
      {
        heading: "お問い合わせ",
        paragraphs: [
          "編集に関するご質問・訂正依頼・提携のご相談: support@autowifi-travel.com",
        ],
      },
    ],
  },
  ko: {
    title: "AutoWiFi Travel 소개",
    description:
      "AutoWiFi Travel은 해외 여행 시 모바일 데이터(eSIM·포켓 Wi-Fi·로밍) 선택을 돕는 가이드 사이트입니다. 여행자 관점에서 각 옵션의 장단점과 실사용 방법을 정리합니다.",
    updatedAtLabel: "최종 업데이트",
    updatedAt: "2026-04-16",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "사이트 소개",
    sections: [
      {
        heading: "사이트의 목적",
        paragraphs: [
          "물리 SIM 교체나 예상치 못한 로밍 요금 없이 해외에서 데이터를 쓰고 싶은 여행자를 위한 가이드입니다. 국가별 글에서는 현실적인 데이터 사용량, 주요 사업자의 특징, iPhone과 Android에서의 설치 절차를 다룹니다.",
          "또한 가이드에서 언급한 eSIM을 구입할 수 있는 소규모 스토어도 운영합니다. 제휴 및 판매 수익은 편집 활동에 사용되며, 추천 내용에 어떻게 영향을 주는지(또는 주지 않는지)는 편집 방침 페이지를 참고하세요.",
        ],
      },
      {
        heading: "운영자",
        paragraphs: [
          "본 사이트는 도쿄의 출판사인 주식회사 비즈니스 랩(Business Lab Co., Ltd.)이 운영합니다. 기사 집필과 편집은 소규모 작가·편집자로 구성된 AutoWiFi Travel 편집팀이 담당합니다.",
        ],
      },
      {
        heading: "편집 방식",
        paragraphs: [
          "국가·제품 가이드는 통신사 공식 자료, 단말기 제조사 사양, 규제 기관 발표, 여행자 커뮤니티 후기 등 공개된 정보를 재편집해 작성합니다. 모든 요금제를 자체 테스트한다고 주장하지 않으며, 각 옵션이 무엇을 제공하고 어디에 적합한지 정확하게 전달하는 데 집중합니다.",
          "정보가 불확실하거나 상황이 변하면 페이지를 갱신하거나 해당 내용을 제거합니다. 오래된 정보를 발견하면 support@autowifi-travel.com으로 알려 주세요.",
        ],
      },
      {
        heading: "문의",
        paragraphs: [
          "편집 관련 문의·정정 요청·제휴 문의: support@autowifi-travel.com",
        ],
      },
    ],
  },
  zh: {
    title: "关于 AutoWiFi Travel",
    description:
      "AutoWiFi Travel 是一个面向海外出行的通信服务指南网站，帮助旅行者比较 eSIM、便携 Wi-Fi 和漫游方案，并以实际使用者视角总结各方案的优缺点。",
    updatedAtLabel: "最后更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "关于我们",
    sections: [
      {
        heading: "网站定位",
        paragraphs: [
          "我们为想在海外使用数据流量、又不希望频繁更换实体 SIM 或被漫游账单意外吓到的用户提供指南。每篇国家指南会介绍现实的数据用量、主要运营商的特点，以及 iPhone 与 Android 的安装步骤。",
          "我们也运营一个规模较小的店铺，销售指南中提到的 eSIM。联盟和分销收入用于支撑编辑工作。关于这些收入如何（以及如何不）影响推荐内容，请参阅“编辑方针”。",
        ],
      },
      {
        heading: "运营方",
        paragraphs: [
          "本站由位于东京的出版公司 Business Lab Co., Ltd.（株式会社 ビジネスラボ）运营。内容由 AutoWiFi Travel 编辑团队（一支小型的撰稿与编辑团队）负责。",
        ],
      },
      {
        heading: "编辑方式",
        paragraphs: [
          "国家与产品指南基于运营商官方资料、设备厂商规格、监管机构公示、旅行者社区反馈等公开信息进行再编辑整理。我们不声称对每一个方案进行实验室测试，重点在于准确描述每个选项的能力与适用场景。",
          "若信息存在不确定性或发生变化，我们会更新页面或移除相应内容。如发现过期信息，请通过 support@autowifi-travel.com 告诉我们。",
        ],
      },
      {
        heading: "联系方式",
        paragraphs: [
          "编辑咨询、内容更正或合作意向请联系：support@autowifi-travel.com",
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
    path: "/about",
    title: content.title,
    description: content.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/about`;

  return (
    <div className={styles.container}>
      <AboutPageJsonLd
        url={url}
        title={content.title}
        description={content.description}
        locale={locale}
        dateModified={content.updatedAt}
      />
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
