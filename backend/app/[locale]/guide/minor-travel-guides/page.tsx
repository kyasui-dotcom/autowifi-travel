import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata, getBaseUrl, getGuideOgImageUrl } from "@/lib/seo";
import {
  BreadcrumbJsonLd,
  CollectionPageJsonLd,
  FaqJsonLd,
  ItemListJsonLd,
} from "@/lib/components/JsonLd";
import ContentTrustPanel from "@/lib/components/ContentTrustPanel";
import { getExtraGuideItems } from "@/lib/guides/extraGuides";
import { getPriorityGuideContent } from "@/lib/guides/priorityGuideContent";
import { MINOR_TRAVEL_GUIDE_CONTENT } from "@/lib/guides/minorTravelGuideContent";
import type { GuideLocale } from "@/lib/guides/extraGuides";
import styles from "../page.module.css";

type Locale = "en" | "ja" | "ko" | "zh";

const PUBLISHED_GUIDE_SLUGS = Object.keys(MINOR_TRAVEL_GUIDE_CONTENT);

type GuideCard = {
  slug: string;
  title: string;
  desc: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const LAST_MODIFIED = new Date().toISOString().slice(0, 10);

const CONTENT: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    collectionAbout: string;
    breadcrumbGuides: string;
    breadcrumbCurrent: string;
    primaryCta: string;
    secondaryCta: string;
    summaryTitle: string;
    summaryParagraphs: string[];
    publishedTitle: string;
    publishedLead: string;
    principlesTitle: string;
    principlesLead: string;
    principles: Array<{ title: string; desc: string }>;
    clustersTitle: string;
    clustersLead: string;
    clusters: Array<{ title: string; desc: string }>;
    faqTitle: string;
    faq: Array<{ q: string; a: string }>;
    prepTitle: string;
    prepLead: string;
    prepLinks: Array<{ href: string; title: string; desc: string }>;
  }
> = {
  en: {
    metaTitle: "Minor Travel Guides for Foreign Travelers 2026",
    metaDescription:
      "Find quieter city walks, low-key neighborhood routes, and offbeat half-day ideas for foreign travelers with photos, official X references, and practical route notes.",
    title: "Minor Travel Guides",
    subtitle:
      "A curated hub for quieter city walks organized by city: Tokyo, Kyoto, Osaka, Seoul, and Kanazawa. Each city hub links to detailed neighborhood routes and half-day walking plans.",
    collectionAbout: "Minor travel guides, quieter city walks, and offbeat neighborhood routes",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "Minor Travel Guides",
    primaryCta: "See eSIM plans",
    secondaryCta: "All guides",
    summaryTitle: "A better hub for foreign travelers who want lower-pressure routes",
    summaryParagraphs: [
      "This page organizes quieter neighborhood walks by city. Start from a city hub — Tokyo, Kyoto, Osaka, Seoul, or Kanazawa — to find area-by-area route guides, or browse individual articles directly below.",
      "Each guide stays actionable with station access, time-of-day advice, and a clear sense of why the area is worth a detour. City hubs connect related routes so you can plan a full day across multiple neighborhoods.",
    ],
    publishedTitle: "Published now",
    publishedLead:
      "Start here for quieter neighborhood walks, museum districts, riverside routes, and lower-pressure half days that are easier to follow than a random social feed thread.",
    principlesTitle: "What belongs in this series",
    principlesLead:
      "We are not trying to rewrite famous sightseeing lists. We are building articles around places and routes that feel a little more local, quieter, or more specific.",
    principles: [
      {
        title: "Not the default guidebook route",
        desc: "We prioritize neighborhoods, walks, and stop combinations that are usually one layer deeper than the standard first-trip shortlist.",
      },
      {
        title: "Easy to act on",
        desc: "Each topic still needs to be practical: reachable on foot, understandable in half a day, and realistic for travelers to copy.",
      },
      {
        title: "Picked from mood, then verified",
        desc: "X helps us spot atmosphere and emerging local interest, but we still verify location details, access, and basic visitor usefulness before publishing.",
      },
      {
        title: "Connected softly to trip prep",
        desc: "These guides stay tourism-first, with eSIM and travel prep links kept light and placed after the core travel value.",
      },
    ],
    clustersTitle: "City hubs",
    clustersLead:
      "Each city hub organizes related walking guides by area so you can find routes that fit your schedule and interests.",
    clusters: [
      {
        title: "Tokyo (31 routes)",
        desc: "Yanaka, Kiyosumi-Shirakawa, Kuramae, tram lines, morning walks, rainy-day routes, and more. The largest collection.",
      },
      {
        title: "Kyoto (5 routes)",
        desc: "Okazaki canal, Demachiyanagi riverside, Fushimi sake district, Arashiyama backstreets, and Nishijin machiya lanes.",
      },
      {
        title: "Osaka (2 routes)",
        desc: "Nakanoshima riverside museums and Sumiyoshi retro tram route. Quieter sides of Osaka beyond Dotonbori.",
      },
      {
        title: "Seoul (2 routes)",
        desc: "Morning walks through Bukchon and Samcheong-dong, plus Seongsu-dong renovated cafe district.",
      },
      {
        title: "Kanazawa (2 routes)",
        desc: "Higashi Chaya teahouse morning walk and Kenroku-en garden walk. A compact castle town 2.5 hours from Tokyo.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "What counts as a minor travel guide here?",
        a: "We use the term for places and routes that feel more specific, quieter, or less overexposed than a standard first-trip list, while still being practical enough for real travelers to follow.",
      },
      {
        q: "Are these hidden gems or realistic half-day routes?",
        a: "They need to be both. We are not publishing mystery spots with no context. Each guide should still work as a realistic half-day or neighborhood plan with access notes and a clear travel mood.",
      },
      {
        q: "Why does this hub start with Tokyo?",
        a: "Tokyo is where we already have a strong cluster of quieter neighborhood walks, rainy-day routes, and station-based detours that foreign travelers can actually use. Other cities will expand from the same model.",
      },
      {
        q: "How are X posts used in these guides?",
        a: "X is used as a discovery and atmosphere source, then we verify whether the place or route is still useful and practical before publishing. The article should remain useful even if a post disappears later.",
      },
    ],
    prepTitle: "Travel prep links",
    prepLead:
      "The tourism guides stay separate from the shopping flow, but if you are already planning the trip, these are the most useful supporting pages.",
    prepLinks: [
      {
        href: "/esim",
        title: "Browse eSIM plans by country",
        desc: "Move from destination research into country-level plan comparison when you are ready.",
      },
      {
        href: "/guide",
        title: "See all travel and eSIM guides",
        desc: "Open the wider guide index if you want setup, comparison, or country-specific planning pages too.",
      },
      {
        href: "/guide/japan-esim",
        title: "Read the Japan arrival guide",
        desc: "Useful if your next step is airport arrival, train transfer, or first-hour trip planning in Tokyo.",
      },
    ],
  },
  ja: {
    metaTitle: "東京のマイナー観光ガイド 2026 | 静かな街歩きと少しマイナーな半日ルート",
    metaDescription:
      "谷根千、蔵前、路面電車沿線、雨の日の東京など、少しマイナーで歩きやすい東京観光ガイドをまとめた入口です。写真とX引用付き。",
    title: "マイナー観光ガイド",
    subtitle:
      "東京・京都・大阪・ソウル・金沢の都市別ハブから、静かな街歩きルートと半日プランを探せるガイドの入口です。",
    collectionAbout: "東京のマイナー観光地と静かな街歩き",
    breadcrumbGuides: "ガイド",
    breadcrumbCurrent: "マイナー観光ガイド",
    primaryCta: "eSIMプランを見る",
    secondaryCta: "ガイド一覧へ",
    summaryTitle: "静かな東京を探す人向けの観光ハブ",
    summaryParagraphs: [
      "このページでは街歩きガイドを都市別に整理しています。東京・京都・大阪・ソウル・金沢の各ハブ記事から、エリア別のルートガイドへ進めます。個別記事を直接選ぶこともできます。",
      "各記事は駅からのアクセス、時間帯の相性、周辺とのつなぎやすさを含めた実用的な内容になっています。都市別ハブを使えば、関連するルートをまとめて把握できます。",
    ],
    publishedTitle: "公開中の記事",
    publishedLead:
      "まずは東京の静かな街歩きから始めています。谷根千、蔵前、路面電車沿線、雨の日に歩きやすい街など、気分で選びやすい形でまとめています。",
    principlesTitle: "このシリーズで扱うもの",
    principlesLead:
      "有名観光地の定番まとめを作るのではなく、少しローカル寄りで、でも旅行者が実際に行ける場所や回り方を記事化します。",
    principles: [
      {
        title: "王道ガイドの焼き直しはしない",
        desc: "初回旅行の定番だけでなく、もう一歩奥にある静かな街や細い路地、歩くのが楽しい周辺エリアを優先します。",
      },
      {
        title: "旅行者がそのまま動ける内容にする",
        desc: "マイナーでも、駅から歩ける、半日で回れる、時間帯がイメージできるといった実用性は必ず持たせます。",
      },
      {
        title: "Xで見つけて、裏取りして出す",
        desc: "Xは雰囲気や発見の入口として使い、場所や導線は別ソースでも確認したうえで記事にします。",
      },
      {
        title: "eSIM導線は薄く置く",
        desc: "本文の主役は観光情報にして、eSIMや旅行準備への導線は記事末と関連記事で自然につなぎます。",
      },
    ],
    clustersTitle: "都市別ハブ",
    clustersLead:
      "各都市のハブ記事から、エリア別の街歩きルートを一覧できます。",
    clusters: [
      {
        title: "東京（31ルート）",
        desc: "谷根千、清澄白河、蔵前、都電沿線、朝散歩、雨の日ルートなど。最大のコレクションです。",
      },
      {
        title: "京都（5ルート）",
        desc: "岡崎の疏水、出町柳の鴨川、伏見の酒蔵、嵐山の裏道、西陣の町家路地。",
      },
      {
        title: "大阪（2ルート）",
        desc: "中之島のリバーサイド散歩と住吉のレトロ路面電車ルート。道頓堀の外の大阪です。",
      },
      {
        title: "ソウル（2ルート）",
        desc: "北村・三清洞の朝散歩と聖水洞のリノベカフェ街。明洞の外のソウルを歩きます。",
      },
      {
        title: "金沢（2ルート）",
        desc: "ひがし茶屋街の朝散歩と兼六園の庭園歩き。東京から新幹線で約2.5時間の城下町です。",
      },
    ],
    faqTitle: "よくある質問",
    faq: [
      {
        q: "ここでいうマイナー観光ガイドとは何ですか？",
        a: "ただ有名ではない場所を並べるのではなく、定番より一段深く、でも旅行者が実際に歩ける現実的な街歩きや半日ルートを指しています。",
      },
      {
        q: "穴場紹介と何が違いますか？",
        a: "雰囲気だけでなく、駅からの行きやすさ、時間帯との相性、周辺のつなぎやすさまで含めて記事化している点が違います。",
      },
      {
        q: "なぜ東京から始めているのですか？",
        a: "静かな街歩き、雨の日ルート、路面電車沿線など、マイナー観光の切り口でまとまりを作りやすい記事群が東京から揃えやすかったためです。",
      },
      {
        q: "Xの投稿はどう使っていますか？",
        a: "Xは発見や雰囲気確認の入口として使い、場所や導線は別途確認したうえで記事にしています。投稿が消えても記事単体で役立つ構成を優先しています。",
      },
    ],
    prepTitle: "旅行準備リンク",
    prepLead:
      "観光ガイドは観光主体のままにしておきつつ、旅行計画に入った人向けの入口だけをここに置いています。",
    prepLinks: [
      {
        href: "/esim",
        title: "国別eSIMプランを見る",
        desc: "行き先が見えてきたら、そのまま国別プラン比較へ移れます。",
      },
      {
        href: "/guide",
        title: "ガイド一覧を見る",
        desc: "設定方法、比較記事、国別eSIMガイドまでまとめて見たいときはこちらです。",
      },
      {
        href: "/guide/japan-esim",
        title: "日本到着まわりのガイドを見る",
        desc: "空港到着後の移動や最初の通信準備まで含めて見たい人向けです。",
      },
    ],
  },
  ko: {
    metaTitle: "도쿄 마이너 여행 가이드 2026 | 조용한 동네 산책과 반나절 루트",
    metaDescription:
      "야나카, 네즈, 쿠라마에, 노면전차 라인, 비 오는 날 도쿄처럼 조금 덜 알려진 도쿄 여행 루트를 모은 허브입니다.",
    title: "마이너 여행 가이드",
    subtitle:
      "뻔한 첫 여행 코스보다 조용한 동네 산책, 살짝 덜 알려진 반나절 루트, 한 단계 더 깊은 도시 걷기를 모아두는 가이드 허브입니다.",
    collectionAbout: "도쿄의 숨은 동네와 조용한 산책 루트",
    breadcrumbGuides: "가이드",
    breadcrumbCurrent: "마이너 여행 가이드",
    primaryCta: "eSIM 플랜 보기",
    secondaryCta: "가이드 전체 보기",
    summaryTitle: "조용한 도쿄를 찾는 여행자를 위한 허브",
    summaryParagraphs: [
      "이 페이지는 도쿄의 조용한 동네 산책, 살짝 마이너한 여행지, 느긋하게 걸을 수 있는 반나절 루트를 찾는 여행자를 위한 출발점입니다. 유명 관광지 재정리가 아니라 실제로 걷고 움직이기 쉬운 장소를 모읍니다.",
      "핵심은 단순한 숨은 명소 소개가 아니라는 점입니다. 역 접근성, 시간대, 비 오는 날에도 성립하는지, 주변 동선 연결성까지 고려해 실제 여행 중에 쓰기 좋은 기사로 만드는 것을 목표로 합니다.",
    ],
    publishedTitle: "현재 공개된 글",
    publishedLead:
      "먼저 도쿄의 조용한 동네 산책부터 시작합니다. 야나카, 네즈, 쿠라마에, 노면전차 정류장, 비 오는 날 루트 등을 분위기별로 고를 수 있습니다.",
    principlesTitle: "이 시리즈에 담는 것",
    principlesLead:
      "유명 관광지 요약보다, 실제 여행자가 가볼 만한 조금 더 로컬하고 차분한 장소와 루트를 우선합니다.",
    principles: [
      {
        title: "전형적인 관광 리스트는 피한다",
        desc: "누구나 아는 핵심 명소보다 한 걸음 더 들어간 동네, 골목, 주변 산책 루트를 우선합니다.",
      },
      {
        title: "실제로 따라갈 수 있어야 한다",
        desc: "마이너한 장소라도 역에서 걷기 쉽고 반나절 안에 움직일 수 있어야 합니다.",
      },
      {
        title: "X에서 발견하고 검증한다",
        desc: "X는 분위기와 실마리를 찾는 용도이고, 위치와 동선은 별도 확인 뒤에만 기사화합니다.",
      },
      {
        title: "eSIM 연결은 가볍게 둔다",
        desc: "본문은 관광 정보 중심으로 두고, eSIM 링크는 글 말미와 관련 글 수준으로만 연결합니다.",
      },
    ],
    clustersTitle: "도시별 허브",
    clustersLead:
      "각 도시 허브에서 지역별 산책 루트를 한눈에 볼 수 있습니다.",
    clusters: [
      {
        title: "도쿄 (31개 루트)",
        desc: "야나카, 기요스미시라카와, 쿠라마에, 노면전차, 아침 산책, 비 오는 날 루트 등 최대 컬렉션.",
      },
      {
        title: "교토 (5개 루트)",
        desc: "오카자키 수로, 데마치야나기 강변, 후시미 사케 거리, 아라시야마 뒷골목, 니시진 마치야.",
      },
      {
        title: "오사카 (2개 루트)",
        desc: "나카노시마 리버사이드와 스미요시 레트로 전차. 도톤보리 바깥의 오사카.",
      },
      {
        title: "서울 (2개 루트)",
        desc: "북촌·삼청동 아침 산책과 성수동 리노베이션 카페 거리.",
      },
      {
        title: "가나자와 (2개 루트)",
        desc: "히가시 차야 아침 산책과 겐로쿠엔 정원. 도쿄에서 신칸센 2.5시간.",
      },
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "여기서 말하는 마이너 여행 가이드는 무엇인가요?",
        a: "단순히 덜 유명한 장소를 모은 것이 아니라, 대표 코스보다 한 단계 더 깊으면서도 실제 여행자가 따라가기 쉬운 동네 산책과 반나절 루트를 뜻합니다.",
      },
      {
        q: "숨은 명소 소개와 무엇이 다른가요?",
        a: "분위기뿐 아니라 역 접근성, 시간대, 주변 동선까지 함께 설명해 실제 여행 동선으로 쓸 수 있게 만든다는 점이 다릅니다.",
      },
      {
        q: "왜 도쿄부터 시작하나요?",
        a: "조용한 동네 산책, 비 오는 날 루트, 노면전차 라인처럼 마이너 여행 클러스터를 만들기 좋은 주제가 도쿄에 먼저 모였기 때문입니다.",
      },
      {
        q: "X 게시물은 어떻게 활용하나요?",
        a: "X는 발견과 분위기 파악의 출발점으로만 쓰고, 위치와 이동 가치는 별도로 확인한 뒤 기사화합니다.",
      },
    ],
    prepTitle: "여행 준비 링크",
    prepLead:
      "관광 글은 관광 중심으로 두되, 실제 여행 준비 단계에 들어간 사람을 위한 연결만 가볍게 둡니다.",
    prepLinks: [
      {
        href: "/esim",
        title: "국가별 eSIM 플랜 보기",
        desc: "목적지가 정해지면 바로 국가별 플랜 비교로 넘어갈 수 있습니다.",
      },
      {
        href: "/guide",
        title: "가이드 전체 보기",
        desc: "설정법, 비교 글, 국가별 eSIM 가이드까지 함께 보고 싶을 때 유용합니다.",
      },
      {
        href: "/guide/japan-esim",
        title: "일본 도착 가이드 보기",
        desc: "공항 도착 후 이동과 첫 연결 준비까지 함께 보고 싶을 때 유용합니다.",
      },
    ],
  },
  zh: {
    metaTitle: "东京小众旅行指南 2026 | 安静街区与半日慢走路线",
    metaDescription:
      "收录谷根千、藏前、电车沿线、雨天东京等更安静也更好走的东京小众旅行路线，适合外国游客规划行程。",
    title: "小众旅行指南",
    subtitle:
      "这里不做最常见的新手观光清单，而是收集更安静的街区、更小众的半日路线，以及更适合慢慢走的城市角落。",
    collectionAbout: "东京的小众街区与安静散步路线",
    breadcrumbGuides: "指南",
    breadcrumbCurrent: "小众旅行指南",
    primaryCta: "查看eSIM套餐",
    secondaryCta: "查看全部指南",
    summaryTitle: "适合想看更安静东京的旅行者",
    summaryParagraphs: [
      "这个页面是为想找东京安静街区、小众观光地、半日慢走路线的旅行者准备的入口。它不是把热门景点重新写一遍，而是整理那些外国游客也真正走得动、看得懂、用得上的路线。",
      "重点不只是“冷门”，而是实用。我们会考虑从车站怎么走、什么时间更适合、下雨天还能不能成立、周边能不能顺路连起来。X 主要用于发现氛围和话题，但文章本身会尽量做到不依赖单一帖子也能成立。",
    ],
    publishedTitle: "当前已发布",
    publishedLead:
      "先从东京较安静的街区开始，集中整理谷根千、藏前、电车沿线、雨天可走的区域等更容易按氛围选择的内容。",
    principlesTitle: "这个系列收什么",
    principlesLead:
      "我们不重复最常见的景点清单，而是优先写那些稍微更本地、也更适合实际去走的地方和路线。",
    principles: [
      {
        title: "不做标准景点重写",
        desc: "比起最常见的初次旅行路线，我们更优先写再往里一层的街区、巷子和可散步区域。",
      },
      {
        title: "旅行者能直接照着走",
        desc: "即使是小众点，也必须满足可步行、半天可完成、时间段明确这些实际条件。",
      },
      {
        title: "从 X 发现，再做核实",
        desc: "X 只是发现灵感和氛围的入口，地点和动线会在发布前再做基础确认。",
      },
      {
        title: "eSIM 入口保持轻量",
        desc: "文章主体仍是旅游信息，eSIM 相关链接只会在文末和相关阅读里轻轻带出。",
      },
    ],
    clustersTitle: "城市导航",
    clustersLead:
      "每个城市页面汇总了该城市的区域散步路线。",
    clusters: [
      {
        title: "东京（31条路线）",
        desc: "谷根千、清澄白河、藏前、电车沿线、晨走、雨天路线等，最大合集。",
      },
      {
        title: "京都（5条路线）",
        desc: "冈崎疏水、出町柳河边、伏见酒藏、岚山背街、西阵町家巷。",
      },
      {
        title: "大阪（2条路线）",
        desc: "中之岛河畔和住吉复古电车线路。道顿堀之外的大阪。",
      },
      {
        title: "首尔（2条路线）",
        desc: "北村·三清洞晨走和圣水洞翻新咖啡区。",
      },
      {
        title: "金泽（2条路线）",
        desc: "东茶屋街晨走和兼六园庭园散步。从东京坐新干线约2.5小时。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      {
        q: "这里说的小众旅行指南指什么？",
        a: "不是单纯把不热门的地点堆在一起，而是指比常规首游清单更深入一步、但外国游客仍然可以实际照着走的街区散步和半日路线。",
      },
      {
        q: "这和普通“隐藏景点”推荐有什么不同？",
        a: "除了气氛，我们还会考虑车站可达性、时间段和周边串联方式，让它能真正变成可执行的旅行路线。",
      },
      {
        q: "为什么先从东京开始？",
        a: "因为东京最先具备了安静街区、雨天路线、电车沿线这些可以形成主题簇的小众旅行内容。",
      },
      {
        q: "X 帖子在这些文章里怎么用？",
        a: "X 主要用于发现灵感和观察氛围，地点与路线会另外确认后再发布，尽量让文章本身不依赖单条帖子存在。",
      },
    ],
    prepTitle: "旅行准备入口",
    prepLead:
      "观光文章会继续保持观光优先，只在这里保留少量和出行准备有关的入口。",
    prepLinks: [
      {
        href: "/esim",
        title: "按国家查看eSIM套餐",
        desc: "当目的地确定之后，可以直接进入国家级套餐比较。",
      },
      {
        href: "/guide",
        title: "查看全部指南",
        desc: "如果你还想一起看设置方法、对比文章和国家eSIM指南，可以从这里进入。",
      },
      {
        href: "/guide/japan-esim",
        title: "查看日本到达指南",
        desc: "适合还想一起看机场到达、转乘和入境后第一小时准备的人。",
      },
    ],
  },
};

function getGuideCards(locale: Locale): GuideCard[] {
  const extraGuideItems = getExtraGuideItems(locale);
  const baseUrl = getBaseUrl();

  // Generate per-slug unique OG thumbnails so every card has a distinct image
  // and never points at a missing physical file. This eliminates both the
  // broken-thumbnail and duplicate-photo issues on the index page in one shot.
  return PUBLISHED_GUIDE_SLUGS.flatMap((slug) => {
    const guide = extraGuideItems.find((item) => item.slug === slug);
    if (!guide) return [];

    const ogAbs = getGuideOgImageUrl({
      baseUrl,
      locale,
      path: `/guide/${slug}`,
      title: guide.title,
      description: guide.desc,
      kindLabel: "Travel Article",
      footerLabel: guide.title,
    });
    // Use a same-origin relative path so next/image doesn't require remotePatterns
    const ogSrc = ogAbs.startsWith(baseUrl) ? ogAbs.slice(baseUrl.length) : ogAbs;

    return [{
      slug,
      title: guide.title,
      desc: guide.desc,
      image: {
        src: ogSrc,
        alt: guide.title,
        width: 1200,
        height: 630,
      },
    }];
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const content = CONTENT[loc];

  return generatePageMetadata({
    locale: loc,
    path: "/guide/minor-travel-guides",
    title: content.metaTitle,
    description: content.metaDescription,
    ogImage: getGuideOgImageUrl({
      locale: loc,
      path: "/guide/minor-travel-guides",
      title: content.metaTitle,
      description: content.metaDescription,
      kindLabel:
        loc === "ja"
          ? "Travel Hub"
          : loc === "ko"
            ? "Travel Hub"
            : loc === "zh"
              ? "Travel Hub"
              : "Travel Hub",
      footerLabel: content.title,
    }),
  });
}

export default async function MinorTravelGuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const content = CONTENT[loc];
  const baseUrl = "https://autowifi-travel.com";
  const publishedGuides = getGuideCards(loc);

  return (
    <div className={styles.container}>
      <BreadcrumbJsonLd
        items={[
          { name: content.breadcrumbGuides, url: `${baseUrl}/${loc}/guide` },
          { name: content.breadcrumbCurrent, url: `${baseUrl}/${loc}/guide/minor-travel-guides` },
        ]}
      />
      <CollectionPageJsonLd
        url={`${baseUrl}/${loc}/guide/minor-travel-guides`}
        title={content.title}
        description={content.metaDescription}
        locale={loc}
        dateModified={LAST_MODIFIED}
        aboutName={content.collectionAbout}
        itemList={publishedGuides.map((guide) => ({
          name: guide.title,
          url: `${baseUrl}/${loc}/guide/${guide.slug}`,
        }))}
      />
      <ItemListJsonLd
        items={publishedGuides.map((guide, index) => ({
          name: guide.title,
          url: `${baseUrl}/${loc}/guide/${guide.slug}`,
          position: index + 1,
        }))}
      />
      <FaqJsonLd
        items={content.faq.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />

      <ContentTrustPanel locale={loc} updatedAt={LAST_MODIFIED} />

      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{content.title}</h1>
        <p className={styles.heroSubtitle}>{content.subtitle}</p>
        <div className={styles.heroActions}>
          <Link href={`/${loc}/esim`} className={styles.guideCard}>
            <h3 className={styles.guideTitle}>{content.primaryCta}</h3>
            <p className={styles.guideDesc}>
              {loc === "ja"
                ? "観光記事を読んだあと、そのまま国別プラン比較に移れます。"
                : loc === "ko"
                ? "관광 글을 읽은 뒤 바로 국가별 플랜 비교로 넘어갈 수 있습니다."
                : loc === "zh"
                ? "读完观光文章后，可以直接进入国家套餐比较。"
                : "Move into country-level plan comparison whenever destination research turns into trip prep."}
            </p>
          </Link>
          <Link href={`/${loc}/guide`} className={styles.guideCard}>
            <h3 className={styles.guideTitle}>{content.secondaryCta}</h3>
            <p className={styles.guideDesc}>
              {loc === "ja"
                ? "eSIM比較や設定ガイドを含む、通常のガイド一覧はこちらです。"
                : loc === "ko"
                ? "eSIM 비교와 설정 가이드를 포함한 전체 가이드는 여기에서 볼 수 있습니다."
                : loc === "zh"
                ? "如果想看包含eSIM对比和设置说明的完整指南列表，可从这里进入。"
                : "Open the broader guide index for country guides, setup guides, and eSIM comparison pages."}
            </p>
          </Link>
        </div>
      </header>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{content.summaryTitle}</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          {content.summaryParagraphs.map((paragraph) => (
            <p key={paragraph} className={styles.featuredSubtitle} style={{ margin: 0 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{content.publishedTitle}</h2>
        <p className={styles.featuredSubtitle}>{content.publishedLead}</p>
        <div className={styles.guideGrid}>
          {publishedGuides.map((guide) => (
            <Link key={guide.slug} href={`/${loc}/guide/${guide.slug}`} className={styles.guideCard}>
              {guide.image ? (
                <div
                  style={{
                    margin: "calc(-1 * var(--space-xl)) calc(-1 * var(--space-xl)) var(--space-lg)",
                    overflow: "hidden",
                    borderRadius: "0.75rem 0.75rem 0 0",
                    background: "#e5e7eb",
                  }}
                >
                  <Image
                    src={guide.image.src}
                    alt={guide.image.alt}
                    width={guide.image.width}
                    height={guide.image.height}
                    unoptimized={guide.image.src.startsWith("/api/") || /^https?:\/\//.test(guide.image.src)}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : null}
              <h3 className={styles.guideTitle}>{guide.title}</h3>
              <p className={styles.guideDesc}>{guide.desc}</p>
              <span className={styles.readMore}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{content.principlesTitle}</h2>
        <p className={styles.featuredSubtitle}>{content.principlesLead}</p>
        <div className={styles.guideGrid}>
          {content.principles.map((item) => (
            <div key={item.title} className={styles.guideCard}>
              <h3 className={styles.guideTitle}>{item.title}</h3>
              <p className={styles.guideDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{content.clustersTitle}</h2>
        <p className={styles.featuredSubtitle}>{content.clustersLead}</p>
        <div className={styles.guideGrid}>
          {content.clusters.map((cluster) => (
            <div key={cluster.title} className={styles.guideCard}>
              <h3 className={styles.guideTitle}>{cluster.title}</h3>
              <p className={styles.guideDesc}>{cluster.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{content.faqTitle}</h2>
        <div className={styles.faqList}>
          {content.faq.map((item) => (
            <details key={item.q} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{item.q}</summary>
              <p className={styles.faqAnswer}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{content.prepTitle}</h2>
        <p className={styles.featuredSubtitle}>{content.prepLead}</p>
        <div className={styles.guideGrid}>
          {content.prepLinks.map((link) => (
            <Link key={link.href} href={`/${loc}${link.href}`} className={styles.guideCard}>
              <h3 className={styles.guideTitle}>{link.title}</h3>
              <p className={styles.guideDesc}>{link.desc}</p>
              <span className={styles.readMore}>→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
