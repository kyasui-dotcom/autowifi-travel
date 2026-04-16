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

interface ReviewContent {
  title: string;
  description: string;
  updatedAtLabel: string;
  updatedAt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  sections: Section[];
}

const CONTENT: Record<LegalLocale, ReviewContent> = {
  en: {
    title: "How We Review eSIMs",
    description:
      "Our review process is built on re-editing publicly available information. This page explains exactly what that means, what we do and do not do, and how we keep recommendations honest.",
    updatedAtLabel: "Last updated",
    updatedAt: "2026-04-16",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "How We Review eSIMs",
    sections: [
      {
        heading: "Our Honest Position",
        paragraphs: [
          "We do not run a hardware lab. We do not buy and test every plan in every country. Most of the world's eSIM providers — and most of the carriers behind them — already publish detailed coverage maps, technology lists, FAQs, and traveler-facing terms. Our work is to read those sources, cross-check them against device manufacturer specs and traveler community reports, and re-edit the result into something practical for one trip.",
          "We say this clearly because dishonest \"we tested 50 plans\" claims are common in this category, and we would rather earn trust than performance numbers we did not actually measure.",
        ],
      },
      {
        heading: "What We Read",
        paragraphs: [
          "For each country guide and provider review, the editorial team consults the following kinds of sources:",
        ],
        bullets: [
          "Carrier and MVNO official coverage, technology, and pricing pages",
          "eSIM provider product pages, FAQs, and terms of service",
          "Apple and Google compatibility lists and eSIM setup documentation",
          "National regulator publications when relevant (spectrum, roaming policy)",
          "Public traveler reports and community discussion threads (read for signal, not quoted as fact)",
        ],
      },
      {
        heading: "How We Decide What to Recommend",
        paragraphs: [
          "We compare options against the realistic needs of a traveler taking one trip: how many days, how much data, which devices, and which carriers actually have signal in the destination. When two options are close, we prefer the one with clearer terms, simpler installation, and fewer reported activation problems.",
          "Where evidence is thin or contradictory, we say so on the page rather than picking a winner.",
        ],
      },
      {
        heading: "Updates and Corrections",
        paragraphs: [
          "Carrier offers, eSIM availability, and device support change frequently. We revise pages when we notice a meaningful change and try to remove claims we can no longer support. If you see something stale or wrong, email support@autowifi-travel.com — we treat reader corrections as a primary input.",
        ],
      },
      {
        heading: "How Affiliate Revenue Fits In",
        paragraphs: [
          "Some of the eSIMs and carriers we cover pay us a referral fee or sell through our storefront. That revenue funds the editorial work. It does not unlock placements, change rankings, or buy positive coverage. See our Editorial Policy for the operational rules we follow.",
        ],
      },
    ],
  },
  ja: {
    title: "eSIM レビューの方針",
    description:
      "当サイトのレビューは Web 上の公開情報を再編集する形で作成しています。このページでは、何をしていて何をしていないのか、どのように推薦の中立性を保っているのかを正直にご説明します。",
    updatedAtLabel: "最終更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "ホーム",
    breadcrumbCurrent: "eSIM レビュー方針",
    sections: [
      {
        heading: "正直な立ち位置",
        paragraphs: [
          "当社は計測ラボを持っておらず、全ての国で全プランを購入してテストしているわけではありません。一方で、世界の eSIM プロバイダや背後のキャリアは、カバレッジマップ・対応技術・FAQ・旅行者向け規約をすでに詳しく公開しています。当社の仕事は、それらを読み込み、デバイスメーカーの仕様や旅行者の体験談と照合し、1回の旅行で使える形に再編集することです。",
          "「50プランをテストしました」のような誇張表現がこの分野には多くありますが、当社は計測していない数値を主張するより、信頼を選びます。",
        ],
      },
      {
        heading: "参照する情報源",
        paragraphs: [
          "各国ガイドおよびプロバイダレビューでは、編集チームが以下のような情報源を確認しています：",
        ],
        bullets: [
          "キャリア・MVNO 公式のカバレッジ／対応技術／料金ページ",
          "eSIM プロバイダの商品ページ・FAQ・利用規約",
          "Apple および Google の対応端末リストおよび eSIM 設定ドキュメント",
          "必要に応じて規制当局の公表資料（周波数・ローミング方針など）",
          "旅行者の公開レポートやコミュニティの議論（傾向把握のために読み、事実として引用はしない）",
        ],
      },
      {
        heading: "推薦の決め方",
        paragraphs: [
          "「何日間／どの程度のデータ量／どの端末／渡航先で実際に電波が入るキャリアはどれか」という、1回の旅行に即した観点で各選択肢を比較します。条件が拮抗する場合は、規約が明快で、設定がシンプルで、開通トラブルの報告が少ないものを優先します。",
          "情報が乏しい、あるいは矛盾している場合は、無理に勝者を決めず、その旨をページ内に明記します。",
        ],
      },
      {
        heading: "更新と訂正",
        paragraphs: [
          "キャリアの提供条件、eSIM の入手可否、対応端末は頻繁に変わります。重要な変更に気づいた時点でページを更新し、根拠が崩れた記述は削除します。古い情報や誤りを見つけた場合は support@autowifi-travel.com までご連絡ください。読者からの指摘は最重要の入力源として扱います。",
        ],
      },
      {
        heading: "アフィリエイト収益の扱い",
        paragraphs: [
          "扱っている eSIM やキャリアの一部は、紹介料を支払っているか、当社ストアを通じて販売しています。これらの収益は編集活動の資金になりますが、掲載枠の購入・順位の操作・好意的な記事の買い取りには使えません。運用上のルールは編集方針ページで詳述しています。",
        ],
      },
    ],
  },
  ko: {
    title: "eSIM 리뷰 방침",
    description:
      "본 사이트의 리뷰는 웹에 공개된 정보를 재편집해 만들어집니다. 이 페이지에서는 우리가 하는 일과 하지 않는 일, 추천의 중립성을 유지하는 방법을 솔직하게 설명합니다.",
    updatedAtLabel: "최종 업데이트",
    updatedAt: "2026-04-16",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "eSIM 리뷰 방침",
    sections: [
      {
        heading: "솔직한 입장",
        paragraphs: [
          "당사는 측정 랩을 운영하지 않으며 모든 국가의 모든 요금제를 구입해 테스트하지도 않습니다. 다만 세계 대부분의 eSIM 사업자와 그 뒤의 통신사는 이미 커버리지 맵, 지원 기술, FAQ, 여행자용 약관을 상세히 공개하고 있습니다. 우리의 일은 그 자료를 읽고, 단말기 제조사의 사양과 여행자의 경험담과 대조한 뒤, 한 번의 여행에 쓸 수 있는 형태로 재편집하는 것입니다.",
          "“50개 요금제를 테스트했다”식의 과장은 이 분야에 흔하지만, 당사는 실측하지 않은 숫자를 주장하기보다 신뢰를 택합니다.",
        ],
      },
      {
        heading: "참고하는 자료",
        paragraphs: [
          "각 국가 가이드와 사업자 리뷰에서 편집팀은 다음과 같은 자료를 확인합니다:",
        ],
        bullets: [
          "통신사 및 MVNO 공식 커버리지·기술·요금 페이지",
          "eSIM 사업자의 상품 페이지·FAQ·약관",
          "Apple 및 Google 호환 단말 목록과 eSIM 설치 문서",
          "필요 시 규제 기관의 공시 자료(주파수·로밍 정책 등)",
          "여행자의 공개 보고와 커뮤니티 토론(경향 파악용이며 사실로 인용하지 않음)",
        ],
      },
      {
        heading: "추천을 정하는 기준",
        paragraphs: [
          "“며칠 / 데이터 사용량 / 어떤 단말 / 현지에서 실제로 신호가 잡히는 통신사”라는 한 번의 여행 기준으로 각 옵션을 비교합니다. 조건이 비슷하면 약관이 명확하고, 설치가 단순하며, 개통 트러블 보고가 적은 쪽을 우선합니다.",
          "근거가 부족하거나 상충될 때는 무리하게 우열을 가리지 않고 그 사실을 페이지에 표시합니다.",
        ],
      },
      {
        heading: "업데이트와 정정",
        paragraphs: [
          "통신사 조건, eSIM 제공 여부, 단말 지원은 자주 바뀝니다. 의미 있는 변화를 인지하면 페이지를 갱신하고 근거가 사라진 기술은 삭제합니다. 오래된 정보나 오류를 발견하면 support@autowifi-travel.com 으로 알려 주세요. 독자의 지적은 가장 중요한 입력으로 취급합니다.",
        ],
      },
      {
        heading: "제휴 수익의 위치",
        paragraphs: [
          "다루는 eSIM과 통신사 중 일부는 추천 수수료를 지불하거나 당사 스토어를 통해 판매됩니다. 이 수익은 편집 활동의 재원이 되지만, 노출 위치 구매·순위 조작·우호적 기사 구매에는 사용할 수 없습니다. 운영 규칙은 편집 방침 페이지에서 자세히 다룹니다.",
        ],
      },
    ],
  },
  zh: {
    title: "我们如何评测 eSIM",
    description:
      "本站的评测以再编辑公开网络信息为基础。本页面坦率说明我们做什么、不做什么，以及如何保证推荐的中立性。",
    updatedAtLabel: "最后更新",
    updatedAt: "2026-04-16",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "评测方针",
    sections: [
      {
        heading: "我们的真实立场",
        paragraphs: [
          "我们没有自己的硬件测试实验室，也不会在每个国家购买并测试每个套餐。但是，全球大多数 eSIM 服务商及其背后的运营商已经公开了详细的覆盖图、支持技术、FAQ 和面向旅行者的条款。我们要做的是阅读这些资料，与设备厂商规格和旅行者反馈交叉比对，并将结果再编辑成可用于一次具体旅行的内容。",
          "本行业常见“测试了 50 个套餐”这种夸张表述，但相比声称我们没有实际测过的数字，我们更愿意守住信任。",
        ],
      },
      {
        heading: "我们参考的资料",
        paragraphs: [
          "每个国家指南和服务商评测中，编辑团队会查阅以下类型的资料：",
        ],
        bullets: [
          "运营商和 MVNO 官方覆盖、技术和资费页面",
          "eSIM 服务商的产品页面、FAQ 与服务条款",
          "Apple 与 Google 的设备兼容列表和 eSIM 安装文档",
          "必要时参考监管机构发布的资料（频谱、漫游政策等）",
          "旅行者公开反馈和社区讨论（用于把握趋势，不作为事实直接引用）",
        ],
      },
      {
        heading: "如何决定推荐对象",
        paragraphs: [
          "我们以“出行天数 / 数据用量 / 使用的设备 / 在目的地实际有信号的运营商”这种贴近一次具体旅行的视角进行比较。当两个方案接近时，我们倾向条款更清晰、安装更简单、激活报错更少的一方。",
          "如果证据不足或彼此矛盾，我们会在页面上写明这一点，而不是强行选出赢家。",
        ],
      },
      {
        heading: "更新与更正",
        paragraphs: [
          "运营商套餐、eSIM 可用性和设备支持经常变化。一旦发现有意义的变化我们就会更新页面，并删除已无法支持的描述。如发现内容过时或错误，请发邮件至 support@autowifi-travel.com。读者反馈是我们最重要的输入。",
        ],
      },
      {
        heading: "联盟收入的位置",
        paragraphs: [
          "我们涉及的部分 eSIM 与运营商会向我们支付推介费，或通过我们的店铺销售。这些收入用于支撑编辑工作，但不能购买展示位、操纵排名或换取正面报道。具体的运营规则参见“编辑方针”。",
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
    path: "/how-we-review-esims",
    title: content.title,
    description: content.description,
  });
}

export default async function HowWeReviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[(locale as LegalLocale) || "en"] ?? CONTENT.en;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/how-we-review-esims`;

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
