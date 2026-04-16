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

interface PolicyContent {
  title: string;
  description: string;
  updatedAtLabel: string;
  updatedAt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  sections: Section[];
}

const CONTENT: Record<LegalLocale, PolicyContent> = {
  en: {
    title: "Editorial Policy",
    description:
      "The operating rules our editorial team follows: how we source, write, disclose, and correct content, and the firewall between editorial and commercial decisions.",
    updatedAtLabel: "Last updated",
    updatedAt: "2026-04-16",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Editorial Policy",
    sections: [
      {
        heading: "Editorial Independence",
        paragraphs: [
          "Editorial decisions — what we cover, how we describe it, what we recommend — are made by the AutoWiFi Travel Editorial Team and are not subject to approval by advertisers, affiliate partners, or eSIM providers we resell.",
          "Commercial partners may request that we cover their product. They cannot request a particular score, ranking, position, or omission of negative information. If a request crosses that line, we decline.",
        ],
      },
      {
        heading: "Sourcing Standards",
        paragraphs: [
          "We re-edit publicly available information. Every factual claim should be traceable to one of: a carrier or MVNO official source, an eSIM provider's product or terms page, a device maker's compatibility documentation, a regulator publication, or our own first-hand observation when noted.",
          "Where the source is a community report or anecdote, we either label it as such or treat it as background signal that must be confirmed against an official source before publication.",
        ],
      },
      {
        heading: "Writing Standards",
        paragraphs: [
          "We write in plain language for travelers, not industry insiders. We prefer concrete numbers over adjectives. We name trade-offs rather than hide them. When something is uncertain, we say so.",
          "We avoid clickbait headlines, manufactured urgency, and \"best ever\" claims that have no basis in measurement.",
        ],
      },
      {
        heading: "Disclosure",
        paragraphs: [
          "Where applicable, pages and links indicate that we may earn a referral fee or sell a product directly. The presence of an affiliate or reseller relationship does not change the content. The absence of one does not mean a product is better.",
        ],
      },
      {
        heading: "Corrections",
        paragraphs: [
          "If we publish something that is wrong, we fix the page, note the change in the last-updated timestamp, and — where the error materially changed a recommendation — add a correction note in place.",
          "Corrections requests: support@autowifi-travel.com",
        ],
      },
      {
        heading: "AI Use",
        paragraphs: [
          "We use AI tools to help draft, translate, and edit. Every published page is reviewed by a human editor before publication and after material changes. AI does not make sourcing or recommendation decisions.",
        ],
      },
    ],
  },
  ja: {
    title: "編集方針",
    description:
      "編集チームが守る運用ルール：情報源の扱い、執筆基準、開示、訂正対応、そして編集判断と商業判断を分けるための原則を明文化しています。",
    updatedAtLabel: "最終更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "ホーム",
    breadcrumbCurrent: "編集方針",
    sections: [
      {
        heading: "編集の独立性",
        paragraphs: [
          "「何を取り上げるか／どう説明するか／何を推薦するか」という編集上の判断は AutoWiFi Travel 編集チームが行い、広告主・アフィリエイト提携先・販売 eSIM プロバイダの承認を必要としません。",
          "商業上のパートナーから「自社製品を取り上げてほしい」という打診はあり得ますが、評価点・順位・位置・ネガティブ情報の削除を指定することはできません。線を越える依頼はお断りします。",
        ],
      },
      {
        heading: "情報源の扱い",
        paragraphs: [
          "当サイトは Web 上の公開情報を再編集して記事を作成します。事実関係の記述は次のいずれかに辿れる必要があります：キャリア／MVNO 公式情報、eSIM プロバイダの商品ページや規約、デバイスメーカーの対応情報、規制当局の公表資料、当社が明記した一次観察情報。",
          "情報源がコミュニティの体験談である場合は、その旨を明記するか、または公式情報で裏取りしてから掲載します。",
        ],
      },
      {
        heading: "執筆の基準",
        paragraphs: [
          "業界向けではなく旅行者向けの平易な文章で書きます。形容詞より具体的な数値を優先し、トレードオフは隠さず明示します。不確実な点は「不確実である」と書きます。",
          "煽り見出し、人工的な切迫感の演出、計測根拠のない「最強」表現は使いません。",
        ],
      },
      {
        heading: "開示",
        paragraphs: [
          "該当するページやリンクには、紹介料を受け取る可能性または直接販売している旨を明示します。アフィリエイトや販売の関係があるかどうかは記事内容を変更しません。関係が「ない」ことが「優れている」を意味するわけでもありません。",
        ],
      },
      {
        heading: "訂正",
        paragraphs: [
          "誤った内容を公開した場合は、ページを修正し、最終更新日を更新します。誤りが推薦内容に実質的影響を与えていた場合は、該当箇所に訂正の注記を残します。",
          "訂正の依頼: support@autowifi-travel.com",
        ],
      },
      {
        heading: "AI の利用",
        paragraphs: [
          "下書き作成・翻訳・校正には AI ツールを利用しています。公開前および重要な変更後には、必ず人間の編集者がページ全体を確認します。情報源の選定や推薦判断は AI が行いません。",
        ],
      },
    ],
  },
  ko: {
    title: "편집 방침",
    description:
      "편집팀이 따르는 운영 규칙입니다. 자료 출처 처리, 집필 기준, 공시, 정정 대응, 그리고 편집 판단과 상업 판단을 분리하기 위한 원칙을 명문화합니다.",
    updatedAtLabel: "최종 업데이트",
    updatedAt: "2026-04-16",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "편집 방침",
    sections: [
      {
        heading: "편집의 독립성",
        paragraphs: [
          "“무엇을 다룰지·어떻게 설명할지·무엇을 추천할지”라는 편집상의 판단은 AutoWiFi Travel 편집팀이 내리며, 광고주·제휴사·당사가 재판매하는 eSIM 사업자의 승인을 받지 않습니다.",
          "상업 파트너가 자사 제품을 다뤄 달라고 요청할 수는 있습니다. 그러나 점수·순위·위치·부정 정보 삭제를 지정할 수 없습니다. 선을 넘는 요청은 거절합니다.",
        ],
      },
      {
        heading: "자료 출처 기준",
        paragraphs: [
          "당사는 공개된 웹 정보를 재편집해 작성합니다. 사실 진술은 다음 중 하나로 추적 가능해야 합니다: 통신사·MVNO 공식 자료, eSIM 사업자의 상품·약관 페이지, 단말기 제조사의 호환 문서, 규제 기관의 공시, 당사가 명시한 직접 관찰 자료.",
          "출처가 커뮤니티 체험담인 경우, 그 사실을 명시하거나 공식 자료로 확인 후 게재합니다.",
        ],
      },
      {
        heading: "집필 기준",
        paragraphs: [
          "업계 종사자가 아닌 여행자를 위한 평이한 표현으로 씁니다. 형용사보다 구체적 수치를, 트레이드오프는 숨기지 않고 명시합니다. 불확실한 부분은 “불확실하다”고 적습니다.",
          "낚시 제목, 인위적 긴박감, 측정 근거 없는 “최고” 표현은 사용하지 않습니다.",
        ],
      },
      {
        heading: "공시",
        paragraphs: [
          "해당하는 페이지·링크에는 추천 수수료를 받을 수 있거나 직접 판매한다는 사실을 표시합니다. 제휴·판매 관계의 유무는 기사 내용을 바꾸지 않으며, 관계가 없다고 해서 더 우수한 제품임을 의미하지도 않습니다.",
        ],
      },
      {
        heading: "정정",
        paragraphs: [
          "잘못된 내용이 게재되면 페이지를 수정하고 최종 업데이트 일자를 갱신합니다. 오류가 추천 내용에 실질적 영향을 미친 경우 해당 위치에 정정 주기를 남깁니다.",
          "정정 요청: support@autowifi-travel.com",
        ],
      },
      {
        heading: "AI 사용",
        paragraphs: [
          "초안 작성·번역·교정에 AI 도구를 사용합니다. 공개 전과 중요한 변경 후에는 반드시 사람 편집자가 페이지 전체를 확인합니다. 자료 선정과 추천 판단은 AI가 하지 않습니다.",
        ],
      },
    ],
  },
  zh: {
    title: "编辑方针",
    description:
      "编辑团队遵循的运作规则：信息来源处理、写作标准、披露、更正流程，以及隔离编辑决策与商业决策的原则。",
    updatedAtLabel: "最后更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "编辑方针",
    sections: [
      {
        heading: "编辑独立性",
        paragraphs: [
          "“写什么、怎么写、推荐什么”这些编辑判断由 AutoWiFi Travel 编辑团队作出，不需要广告主、联盟伙伴或我们代销的 eSIM 服务商批准。",
          "商业合作方可以提出报道其产品的请求，但不能指定评分、排名、位置或要求删除负面信息。一旦越线，我们将拒绝。",
        ],
      },
      {
        heading: "资料来源标准",
        paragraphs: [
          "本站基于公开的网络信息再编辑而成。每条事实陈述应可追溯到以下之一：运营商/MVNO 官方资料、eSIM 服务商产品或条款页面、设备厂商的兼容文档、监管机构公示，或我们明示的第一手观察。",
          "若资料来自社区反馈或个案，我们会注明其性质，或在与官方资料核对后再行发布。",
        ],
      },
      {
        heading: "写作标准",
        paragraphs: [
          "我们用面向旅行者（而非行业内人士）的平实语言书写，更看重具体数字而非形容词，不掩盖取舍。不确定的内容会明确说明“不确定”。",
          "我们不使用标题党、人造紧迫感，以及没有测量依据的“最强”表述。",
        ],
      },
      {
        heading: "披露",
        paragraphs: [
          "在适用的页面或链接中，我们会标明可能获得推介费或直接销售的关系。是否存在联盟或销售关系不会改变内容；不存在该关系也不代表产品更优。",
        ],
      },
      {
        heading: "更正",
        paragraphs: [
          "若发布了错误内容，我们会修正页面并更新最后更新日期；若错误对推荐结论产生实质影响，会在相应位置标注更正说明。",
          "更正请求：support@autowifi-travel.com",
        ],
      },
      {
        heading: "AI 使用",
        paragraphs: [
          "我们在草稿撰写、翻译和校对中使用 AI 工具。所有公开页面在发布前及发生重要变更后均由人工编辑审阅。资料选择与推荐判断由人作出，不交由 AI。",
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
    path: "/editorial-policy",
    title: content.title,
    description: content.description,
  });
}

export default async function EditorialPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/editorial-policy`;

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
