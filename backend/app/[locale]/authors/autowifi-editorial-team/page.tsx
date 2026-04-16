import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, ProfilePageJsonLd } from "@/lib/components/JsonLd";
import { generatePageMetadata, getBaseUrl } from "@/lib/seo";
import { EDITORIAL_TEAM_NAME } from "@/lib/content/eeat";
import type { Locale } from "@/lib/i18n/config";
import styles from "../../legal.module.css";

type LegalLocale = "en" | "ja" | "ko" | "zh";

interface Section {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface AuthorContent {
  title: string;
  description: string;
  updatedAtLabel: string;
  updatedAt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  knowsAbout: string[];
  sections: Section[];
}

const CONTENT: Record<LegalLocale, AuthorContent> = {
  en: {
    title: "AutoWiFi Travel Editorial Team",
    description:
      "Articles on AutoWiFi Travel are produced by a small editorial team that re-edits publicly available carrier, device, and traveler information into practical, country-specific connectivity guidance.",
    updatedAtLabel: "Last updated",
    updatedAt: "2026-04-16",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "AutoWiFi Travel Editorial Team",
    knowsAbout: [
      "eSIM",
      "International roaming",
      "Mobile network operators",
      "iPhone and Android eSIM setup",
      "Travel connectivity",
      "Pocket Wi-Fi",
    ],
    sections: [
      {
        heading: "Who Writes the Guides",
        paragraphs: [
          "AutoWiFi Travel is published by Business Lab Co., Ltd. and maintained by a small in-house editorial team operating under the collective byline AutoWiFi Travel Editorial Team. We use a single team byline because most articles pass through several hands during research, drafting, translation, and final review.",
          "We use the team byline rather than fictional author personas. When a guide is meaningfully shaped by an individual editor's first-hand experience, that is noted within the page itself.",
        ],
      },
      {
        heading: "What We Cover",
        paragraphs: [
          "The team focuses on travel connectivity: eSIM availability and pricing by country, comparisons of major eSIM providers, device compatibility and installation, regional and global plans, and practical questions such as how much data a typical trip uses.",
        ],
      },
      {
        heading: "Process",
        paragraphs: [
          "Each guide starts from publicly available information — carrier and provider sources, device manufacturer documentation, regulator publications, and traveler community signals. Drafts are reviewed by an editor before publication and revisited when prices, availability, or device support change.",
          "AI tools are used to accelerate drafting, translation, and copy editing. Final responsibility for accuracy and recommendations rests with the human editor who signs off on the page.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Editorial questions, corrections, and tips: support@autowifi-travel.com",
        ],
      },
    ],
  },
  ja: {
    title: "AutoWiFi Travel 編集チーム",
    description:
      "AutoWiFi Travel の記事は、キャリア・デバイス・旅行者の公開情報を再編集して、国別の実用的な通信ガイドに仕上げる小規模な編集チームが担当しています。",
    updatedAtLabel: "最終更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "ホーム",
    breadcrumbCurrent: "AutoWiFi Travel 編集チーム",
    knowsAbout: [
      "eSIM",
      "国際ローミング",
      "モバイルキャリア",
      "iPhone / Android の eSIM 設定",
      "旅行先での通信手段",
      "ポケット Wi-Fi",
    ],
    sections: [
      {
        heading: "誰が記事を書いているか",
        paragraphs: [
          "AutoWiFi Travel は株式会社ビジネスラボが発行し、社内の少人数編集チームが「AutoWiFi Travel 編集チーム」という共同名義で運営しています。多くの記事は調査・執筆・翻訳・最終チェックの過程で複数の編集者の手を通るため、共同名義としています。",
          "存在しない著者を装うのではなく、チーム名義で署名します。個人の一次体験が記事の核を成す場合は、その旨をページ内に明記します。",
        ],
      },
      {
        heading: "扱っているテーマ",
        paragraphs: [
          "旅行先での通信に関する内容が中心です：国別の eSIM 入手性と料金、主要プロバイダの比較、対応端末と設定方法、地域・グローバル対応プラン、典型的な旅行で使うデータ量の目安など。",
        ],
      },
      {
        heading: "制作プロセス",
        paragraphs: [
          "各記事は公開情報を出発点とします（キャリア／プロバイダ公式資料、デバイスメーカーのドキュメント、規制当局の公表資料、旅行者コミュニティの傾向）。下書きは公開前に編集者がレビューし、料金・取り扱い・端末対応に変化があれば再確認します。",
          "下書き作成・翻訳・校正の効率化に AI を利用しますが、内容の正確性および推薦の最終責任は、ページを承認した人間の編集者にあります。",
        ],
      },
      {
        heading: "お問い合わせ",
        paragraphs: [
          "編集に関するご質問・訂正依頼・情報提供: support@autowifi-travel.com",
        ],
      },
    ],
  },
  ko: {
    title: "AutoWiFi Travel 편집팀",
    description:
      "AutoWiFi Travel의 글은 통신사·단말기·여행자의 공개 정보를 재편집해 국가별 실용적인 통신 가이드를 만드는 소규모 편집팀이 작성합니다.",
    updatedAtLabel: "최종 업데이트",
    updatedAt: "2026-04-16",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "AutoWiFi Travel 편집팀",
    knowsAbout: [
      "eSIM",
      "국제 로밍",
      "이동통신 사업자",
      "iPhone / Android eSIM 설정",
      "여행지 통신 수단",
      "포켓 Wi-Fi",
    ],
    sections: [
      {
        heading: "누가 글을 쓰는가",
        paragraphs: [
          "AutoWiFi Travel은 주식회사 비즈니스 랩(Business Lab Co., Ltd.)이 발행하고, 사내의 소규모 편집팀이 “AutoWiFi Travel 편집팀”이라는 공동 명의로 운영합니다. 대부분의 글이 조사·집필·번역·최종 확인 과정에서 여러 편집자의 손을 거치기 때문에 공동 명의를 사용합니다.",
          "가공의 작가 페르소나 대신 팀 명의로 서명합니다. 개별 편집자의 일차 경험이 글의 중심이 되는 경우, 그 사실을 페이지 안에 명시합니다.",
        ],
      },
      {
        heading: "다루는 주제",
        paragraphs: [
          "여행지 통신을 중심으로 다룹니다: 국가별 eSIM 제공 여부와 요금, 주요 사업자 비교, 호환 단말과 설치 방법, 지역·글로벌 요금제, 보통의 여행에서 쓰는 데이터량 가이드 등.",
        ],
      },
      {
        heading: "작업 절차",
        paragraphs: [
          "각 글은 공개 자료에서 출발합니다(통신사·사업자 공식 자료, 단말기 제조사 문서, 규제 기관 공시, 여행자 커뮤니티의 흐름). 초안은 게시 전 편집자가 검토하고, 요금·취급·단말 지원에 변화가 생기면 다시 확인합니다.",
          "초안 작성·번역·교정에는 AI 도구를 사용하지만, 정확성과 추천에 대한 최종 책임은 해당 페이지를 승인한 사람 편집자에게 있습니다.",
        ],
      },
      {
        heading: "문의",
        paragraphs: [
          "편집 관련 문의·정정 요청·제보: support@autowifi-travel.com",
        ],
      },
    ],
  },
  zh: {
    title: "AutoWiFi Travel 编辑团队",
    description:
      "AutoWiFi Travel 的文章由一支小型编辑团队撰写，负责将运营商、设备和旅行者公开的信息再编辑成各国可实际使用的通信指南。",
    updatedAtLabel: "最后更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "AutoWiFi Travel 编辑团队",
    knowsAbout: [
      "eSIM",
      "国际漫游",
      "移动网络运营商",
      "iPhone / Android eSIM 安装",
      "旅行通信方案",
      "便携 Wi-Fi",
    ],
    sections: [
      {
        heading: "由谁撰写",
        paragraphs: [
          "AutoWiFi Travel 由 Business Lab Co., Ltd.（株式会社 ビジネスラボ）发行，内部的一支小型编辑团队以“AutoWiFi Travel 编辑团队”的共同署名运营。由于大部分文章会在调研、撰写、翻译和终审环节经多位编辑之手，因此使用共同署名。",
          "我们不使用虚构作者人物，而是采用团队署名。当个别编辑的一手经历主导某篇文章时，会在页面内明确说明。",
        ],
      },
      {
        heading: "涵盖主题",
        paragraphs: [
          "聚焦于旅行通信：各国 eSIM 可用性与价格、主流服务商比较、设备兼容性与安装、区域与全球套餐，以及一次普通行程通常会用多少数据等实用问题。",
        ],
      },
      {
        heading: "制作流程",
        paragraphs: [
          "每篇文章从公开资料出发（运营商/服务商官方资料、设备厂商文档、监管机构公示、旅行者社区动向）。草稿在发布前由编辑审阅，价格、可用性或设备支持发生变化时会重新确认。",
          "草拟、翻译和校对借助 AI 工具加速，但内容的准确性与推荐的最终责任由签发该页面的人工编辑承担。",
        ],
      },
      {
        heading: "联系方式",
        paragraphs: [
          "编辑咨询、内容更正与线索提供：support@autowifi-travel.com",
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
    path: "/authors/autowifi-editorial-team",
    title: content.title,
    description: content.description,
  });
}

export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/authors/autowifi-editorial-team`;

  return (
    <div className={styles.container}>
      <ProfilePageJsonLd
        url={url}
        name={EDITORIAL_TEAM_NAME}
        description={content.description}
        entityType="Organization"
        locale={locale}
        dateModified={content.updatedAt}
        knowsAbout={content.knowsAbout}
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
