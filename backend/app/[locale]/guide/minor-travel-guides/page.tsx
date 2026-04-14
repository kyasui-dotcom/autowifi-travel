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
    title: "Quiet City Walks & Local Neighborhood Guides",
    subtitle:
      "Find quieter walking routes and local neighborhood guides for 60+ cities worldwide — from Paris and London to Tokyo, Bangkok, and Seoul. Each city page collects area-by-area routes and half-day walking plans.",
    collectionAbout: "Quiet city walks and local neighborhood routes for travelers",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "City walking guides",
    primaryCta: "See eSIM plans",
    secondaryCta: "All guides",
    summaryTitle: "Slower, more local routes for travelers who want to walk",
    summaryParagraphs: [
      "Browse quieter neighborhood walks across 60+ cities — Tokyo, Kyoto, Paris, London, Bangkok, Seoul, New York, and many more. Pick a city to find area-by-area routes, or scan individual guides below.",
      "Each guide is built to be actually useful on the ground: station access, time-of-day advice, and a clear sense of why the area is worth your time. City pages connect related routes so you can plan a full day across multiple neighborhoods.",
    ],
    publishedTitle: "Latest guides",
    publishedLead:
      "Start with quieter neighborhood walks, museum districts, riverside routes, and slow half-day plans that are easier to follow than scrolling through a feed.",
    principlesTitle: "How these guides are built",
    principlesLead:
      "These aren't rewrites of standard sightseeing lists. Each guide focuses on places and routes that feel a little more local, quieter, or more specific.",
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
    clustersTitle: "Browse by region",
    clustersLead:
      "Walking guides are organized by region. Each city page collects neighborhood routes so you can plan a half day or a full walking day.",
    clusters: [
      {
        title: "Japan",
        desc: "Tokyo, Kyoto, Osaka, Kanazawa, Nara, Hiroshima, Fukuoka, Sapporo, Nagasaki, Yokohama, Nagoya, and more — quiet neighborhood walks and tram-line detours across the country.",
      },
      {
        title: "Korea & Taiwan",
        desc: "Seoul, Busan, Jeju, and Taipei walking routes — backstreet cafe districts, morning palace walks, and creative neighborhoods beyond the tourist core.",
      },
      {
        title: "Southeast Asia",
        desc: "Bangkok, Hanoi, Bali, Singapore, Kuala Lumpur, and Chiang Mai — riverside walks, old-quarter routes, and slow neighborhood guides for tropical cities.",
      },
      {
        title: "Europe",
        desc: "Paris, London, Rome, Berlin, Barcelona, Amsterdam, Vienna, Prague, Lisbon, Madrid, Athens, Copenhagen, and Edinburgh — area-by-area walking routes for major capitals.",
      },
      {
        title: "Americas",
        desc: "New York, Toronto, and other North American cities — neighborhood walks for travelers who want to skip the bus tour and explore on foot.",
      },
      {
        title: "Oceania, Middle East & beyond",
        desc: "Sydney, Melbourne, Dubai, Istanbul, and additional destinations — quieter walking routes for trips that go beyond the usual circuits.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "What kind of walks do these guides cover?",
        a: "They focus on places and routes that feel more specific, quieter, or less overexposed than a standard first-trip list — while still being practical enough for real travelers to follow on the ground.",
      },
      {
        q: "Are these hidden gems or realistic half-day routes?",
        a: "Both. Each guide is a realistic half-day or neighborhood plan with station access notes, time-of-day advice, and a clear sense of why the area is worth your time.",
      },
      {
        q: "How are guides organized?",
        a: "By city. Each city page collects related neighborhood routes so you can plan a full walking day across multiple areas. Browse by region above, or open a city directly to see every guide for that destination.",
      },
      {
        q: "How are these routes researched?",
        a: "We start from local recommendations and atmosphere on social platforms, then verify the route, station access, and what's actually open before publishing. Guides are kept updated so they stay useful as neighborhoods change.",
      },
    ],
    prepTitle: "Plan your trip",
    prepLead:
      "Once you've picked a destination, these supporting pages help you get connected and prepared before you leave.",
    prepLinks: [
      {
        href: "/esim",
        title: "Browse travel eSIM plans",
        desc: "Compare data plans for your destination and stay connected from the moment you land.",
      },
      {
        href: "/guide",
        title: "See all travel guides",
        desc: "Setup tutorials, country-by-country eSIM coverage, and travel connectivity tips.",
      },
      {
        href: "/guide/japan-esim",
        title: "Travel eSIM for Japan",
        desc: "Coverage, prices, and arrival tips — useful for planning your first hour after landing.",
      },
    ],
  },
  ja: {
    metaTitle: "海外の街歩き・ローカル散歩ガイド 2026 | 60都市以上",
    metaDescription:
      "パリ、ロンドン、東京、バンコク、ソウルなど世界60都市以上の静かな街歩きルートとローカル散歩ガイド。エリア別の半日プランを掲載。",
    title: "世界の街歩き・ローカル散歩ガイド",
    subtitle:
      "パリ、ロンドン、東京、バンコク、ソウルなど60都市以上の、静かな街歩きルートとローカルなエリアガイドを集めています。各都市ページからエリア別の半日プランを探せます。",
    collectionAbout: "世界各都市の静かな街歩きとローカル散歩ルート",
    breadcrumbGuides: "ガイド",
    breadcrumbCurrent: "街歩きガイド",
    primaryCta: "eSIMプランを見る",
    secondaryCta: "ガイド一覧へ",
    summaryTitle: "ゆっくり歩きたい旅行者のための、少し奥のルート",
    summaryParagraphs: [
      "東京、京都、パリ、ロンドン、バンコク、ソウル、ニューヨークほか、60都市以上の静かな街歩きルートを掲載しています。都市を選ぶとエリア別ルートが見られます。下の一覧から個別ガイドを開いても構いません。",
      "各ガイドは現地ですぐ使える内容です。駅からのアクセス、時間帯のおすすめ、エリアの魅力をはっきり書いています。都市ページでは関連ルートがつながっているので、複数エリアを組み合わせた1日プランも作れます。",
    ],
    publishedTitle: "最新ガイド",
    publishedLead:
      "静かな街歩き、博物館エリア、リバーサイドルート、ゆったり半日プランなど、SNSをスクロールするより使いやすい形にまとめています。",
    principlesTitle: "ガイドの作り方",
    principlesLead:
      "定番ガイドの焼き直しではありません。少しローカル寄りで、静かで、もう一歩具体的な場所とルートに焦点を当てています。",
    principles: [
      {
        title: "定番ガイドブックの焼き直しではない",
        desc: "初回旅行の定番リストから一歩奥にある、街、散歩道、立ち寄りの組み合わせを優先します。",
      },
      {
        title: "実際に動ける内容にする",
        desc: "徒歩で行ける、半日で理解できる、旅行者がそのまま真似できる現実的な内容を必ず保ちます。",
      },
      {
        title: "雰囲気で見つけて、裏取りする",
        desc: "Xはローカルの空気感や注目の発見に役立てますが、場所、アクセス、訪問時の使いやすさは公開前に確認します。",
      },
      {
        title: "旅行準備への導線は控えめに",
        desc: "本文は観光情報を中心にして、eSIMや旅行準備への導線は記事の最後に軽く添えます。",
      },
    ],
    clustersTitle: "地域別に見る",
    clustersLead:
      "街歩きガイドは地域別に整理しています。各都市ページにはエリア別ルートが集まっているので、半日や1日の街歩きプランを組めます。",
    clusters: [
      {
        title: "日本",
        desc: "東京、京都、大阪、金沢、奈良、広島、福岡、札幌、長崎、横浜、名古屋など。全国の静かな街歩きや路面電車沿線ルートを掲載。",
      },
      {
        title: "韓国・台湾",
        desc: "ソウル、釜山、済州、台北の街歩きルート。観光中心地から外れた裏路地カフェ街、朝の宮殿散歩、クリエイティブなエリアを紹介。",
      },
      {
        title: "東南アジア",
        desc: "バンコク、ハノイ、バリ、シンガポール、クアラルンプール、チェンマイ。リバーサイド散歩、旧市街ルート、熱帯都市のローカル散歩ガイド。",
      },
      {
        title: "ヨーロッパ",
        desc: "パリ、ロンドン、ローマ、ベルリン、バルセロナ、アムステルダム、ウィーン、プラハ、リスボン、マドリード、アテネ、コペンハーゲン、エディンバラなど主要都市のエリア別街歩きルート。",
      },
      {
        title: "アメリカ大陸",
        desc: "ニューヨーク、トロントなど北米の都市。バスツアーをスキップして徒歩で巡りたい旅行者向けの街歩きルート。",
      },
      {
        title: "オセアニア・中東ほか",
        desc: "シドニー、メルボルン、ドバイ、イスタンブールほか。定番コースから外れた旅向けの、静かな街歩きルート。",
      },
    ],
    faqTitle: "よくある質問",
    faq: [
      {
        q: "どんな街歩きを扱っていますか？",
        a: "定番リストよりも具体的で、静かで、過剰に紹介されていない場所とルートに焦点を当てています。同時に、旅行者が現地で実際に追える実用性も保っています。",
      },
      {
        q: "穴場紹介ですか、それとも実用的な半日ルートですか？",
        a: "両方です。各ガイドは現実的な半日プランやエリアプランで、駅からのアクセス、時間帯のおすすめ、エリアの魅力をはっきり書いています。",
      },
      {
        q: "ガイドはどう整理されていますか？",
        a: "都市ごとに整理しています。各都市ページに関連する街歩きルートがまとまっているので、複数エリアを組み合わせた1日プランも組めます。上の地域別から探すか、都市を直接開いてその都市の全ガイドを見られます。",
      },
      {
        q: "ルートはどうやって調べていますか？",
        a: "ローカルのおすすめやSNSの空気感から始め、ルート、駅からのアクセス、現在営業しているかを公開前に確認しています。エリアの変化に合わせて随時更新します。",
      },
    ],
    prepTitle: "旅行の準備",
    prepLead:
      "行き先が決まったら、出発前に通信や準備を整えるための関連ページです。",
    prepLinks: [
      {
        href: "/esim",
        title: "海外旅行eSIMプランを見る",
        desc: "行き先のデータプランを比較して、到着した瞬間からつながる準備ができます。",
      },
      {
        href: "/guide",
        title: "全ての旅行ガイドを見る",
        desc: "設定方法、国別eSIMカバレッジ、旅先での通信のコツまで一覧で見られます。",
      },
      {
        href: "/guide/japan-esim",
        title: "日本の旅行eSIM",
        desc: "カバレッジ、料金、到着直後のヒント。日本到着後の最初の1時間を計画する人向けです。",
      },
    ],
  },
  ko: {
    metaTitle: "세계 도시 산책·로컬 동네 가이드 2026 | 60개 도시 이상",
    metaDescription:
      "파리, 런던, 도쿄, 방콕, 서울 등 세계 60개 도시 이상의 조용한 산책 루트와 로컬 동네 가이드. 지역별 반나절 코스를 정리했습니다.",
    title: "세계 도시 산책·로컬 동네 가이드",
    subtitle:
      "파리, 런던, 도쿄, 방콕, 서울 등 세계 60개 도시 이상의 조용한 산책 루트와 로컬 동네 가이드를 모았습니다. 도시별로 지역 단위 루트와 반나절 코스를 확인할 수 있습니다.",
    collectionAbout: "여행자를 위한 조용한 도시 산책과 로컬 동네 루트",
    breadcrumbGuides: "가이드",
    breadcrumbCurrent: "도시 산책 가이드",
    primaryCta: "eSIM 플랜 보기",
    secondaryCta: "가이드 전체 보기",
    summaryTitle: "걷고 싶은 여행자를 위한, 한 걸음 더 로컬한 루트",
    summaryParagraphs: [
      "도쿄, 교토, 파리, 런던, 방콕, 서울, 뉴욕 등 60개 이상의 도시에 걸친 조용한 동네 산책을 둘러보세요. 도시를 골라 지역별 루트를 찾거나 아래 개별 가이드를 살펴볼 수 있습니다.",
      "각 가이드는 현지에서 바로 쓸 수 있도록 설계되었습니다. 역 접근성, 시간대 추천, 그 동네를 걸을 가치가 있는 이유를 분명히 안내합니다. 도시 페이지에서는 관련 루트가 연결되어 있어 여러 동네를 묶어 하루 일정을 짤 수 있습니다.",
    ],
    publishedTitle: "최근 가이드",
    publishedLead:
      "조용한 동네 산책, 미술관 거리, 강변 루트, 느긋한 반나절 코스 등 피드를 스크롤하는 것보다 따라가기 쉬운 형태로 정리합니다.",
    principlesTitle: "가이드를 만드는 방식",
    principlesLead:
      "표준 관광 리스트를 다시 쓰지 않습니다. 각 가이드는 조금 더 로컬하고, 더 조용하며, 더 구체적인 장소와 루트에 초점을 맞춥니다.",
    principles: [
      {
        title: "기본 가이드북 코스를 그대로 옮기지 않는다",
        desc: "첫 여행 표준 리스트보다 한 단계 더 깊은 동네, 산책로, 멈춰갈 만한 조합을 우선합니다.",
      },
      {
        title: "바로 따라할 수 있어야 한다",
        desc: "도보로 닿을 수 있고, 반나절 안에 이해할 수 있고, 여행자가 실제로 복제 가능한 현실적인 내용이어야 합니다.",
      },
      {
        title: "분위기에서 출발해 검증한다",
        desc: "X는 동네의 공기와 새로 떠오르는 관심을 포착하는 데 도움을 주지만, 위치, 접근성, 방문 가치는 발행 전에 확인합니다.",
      },
      {
        title: "여행 준비 링크는 가볍게",
        desc: "관광 정보를 중심으로 유지하고, eSIM과 여행 준비 링크는 본문 뒤에 가볍게 둡니다.",
      },
    ],
    clustersTitle: "지역별로 보기",
    clustersLead:
      "산책 가이드는 지역별로 정리되어 있습니다. 각 도시 페이지에 동네 단위 루트가 모여 있어 반나절 또는 하루 일정을 짤 수 있습니다.",
    clusters: [
      {
        title: "일본",
        desc: "도쿄, 교토, 오사카, 가나자와, 나라, 히로시마, 후쿠오카, 삿포로, 나가사키, 요코하마, 나고야 등 전국의 조용한 동네 산책과 노면전차 노선 우회 루트.",
      },
      {
        title: "한국·대만",
        desc: "서울, 부산, 제주, 타이베이의 산책 루트. 관광 중심에서 벗어난 골목 카페 거리, 아침 궁궐 산책, 크리에이티브한 동네까지.",
      },
      {
        title: "동남아시아",
        desc: "방콕, 하노이, 발리, 싱가포르, 쿠알라룸푸르, 치앙마이. 강변 산책, 구시가 루트, 열대 도시의 느린 동네 가이드.",
      },
      {
        title: "유럽",
        desc: "파리, 런던, 로마, 베를린, 바르셀로나, 암스테르담, 빈, 프라하, 리스본, 마드리드, 아테네, 코펜하겐, 에든버러 등 주요 수도의 지역별 산책 루트.",
      },
      {
        title: "아메리카",
        desc: "뉴욕, 토론토 등 북미 도시의 동네 산책. 버스 투어를 건너뛰고 도보로 둘러보고 싶은 여행자에게 적합합니다.",
      },
      {
        title: "오세아니아·중동·기타",
        desc: "시드니, 멜버른, 두바이, 이스탄불 등 일반 코스를 벗어난 여행을 위한 조용한 산책 루트.",
      },
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "어떤 산책을 다루나요?",
        a: "표준 첫 여행 리스트보다 더 구체적이고, 더 조용하며, 덜 노출된 장소와 루트에 초점을 맞추되 실제 여행자가 현지에서 따라가기 충분히 실용적입니다.",
      },
      {
        q: "숨은 명소인가요, 현실적인 반나절 코스인가요?",
        a: "둘 다입니다. 각 가이드는 현실적인 반나절 또는 동네 단위 코스로, 역 접근성, 시간대 추천, 그 동네를 걸을 가치가 있는 이유까지 함께 설명합니다.",
      },
      {
        q: "가이드는 어떻게 정리되어 있나요?",
        a: "도시별로 정리됩니다. 각 도시 페이지에 관련 동네 루트가 모여 있어 여러 지역을 묶어 하루 일정을 짤 수 있습니다. 위에서 지역별로 둘러보거나 도시를 직접 열어 해당 도시의 모든 가이드를 볼 수 있습니다.",
      },
      {
        q: "루트는 어떻게 조사하나요?",
        a: "현지 추천과 SNS의 분위기에서 출발해 루트, 역 접근성, 실제 영업 여부를 발행 전에 확인합니다. 동네가 변하더라도 유용하게 쓰일 수 있도록 가이드를 계속 업데이트합니다.",
      },
    ],
    prepTitle: "여행 준비",
    prepLead:
      "목적지를 정한 뒤, 출발 전 통신 연결과 준비를 도와주는 관련 페이지입니다.",
    prepLinks: [
      {
        href: "/esim",
        title: "여행 eSIM 플랜 보기",
        desc: "목적지의 데이터 플랜을 비교하고, 도착하는 순간부터 연결된 상태로 시작하세요.",
      },
      {
        href: "/guide",
        title: "여행 가이드 전체 보기",
        desc: "설치 튜토리얼, 국가별 eSIM 커버리지, 여행 중 통신 팁을 모두 확인할 수 있습니다.",
      },
      {
        href: "/guide/japan-esim",
        title: "일본 여행 eSIM",
        desc: "커버리지, 가격, 도착 직후 팁. 일본 착륙 후 첫 한 시간을 계획하는 데 유용합니다.",
      },
    ],
  },
  zh: {
    metaTitle: "全球城市散步与本地街区指南 2026 | 60+城市",
    metaDescription:
      "巴黎、伦敦、东京、曼谷、首尔等全球60多个城市的安静散步路线和本地街区指南，按区域整理半日步行计划。",
    title: "全球城市散步与本地街区指南",
    subtitle:
      "巴黎、伦敦、东京、曼谷、首尔等60多个城市的安静散步路线和本地街区指南。每个城市页面汇总了按区域划分的步行路线和半日计划。",
    collectionAbout: "面向旅行者的安静城市散步与本地街区路线",
    breadcrumbGuides: "指南",
    breadcrumbCurrent: "城市步行指南",
    primaryCta: "查看eSIM套餐",
    secondaryCta: "查看全部指南",
    summaryTitle: "为想慢慢走的旅行者准备的，更本地的路线",
    summaryParagraphs: [
      "在60多个城市里浏览更安静的街区散步——东京、京都、巴黎、伦敦、曼谷、首尔、纽约等。选一个城市按区域查找路线，或浏览下方的单篇指南。",
      "每篇指南都为实地行动而设计：车站可达性、时段建议，以及该街区值得花时间的理由都说得清楚。城市页面把相关路线连接起来，方便你串联多个街区做一日步行计划。",
    ],
    publishedTitle: "最新指南",
    publishedLead:
      "更安静的街区散步、博物馆区、河畔路线和悠闲的半日计划——比刷信息流更容易跟着走。",
    principlesTitle: "指南的写作方式",
    principlesLead:
      "我们不会重写标准观光清单。每篇指南聚焦更本地、更安静、更具体的地点和路线。",
    principles: [
      {
        title: "不照抄默认观光路线",
        desc: "比起首次旅行的标准短名单，我们更优先写再深一层的街区、散步路线和组合行程。",
      },
      {
        title: "可以直接执行",
        desc: "每个主题都需要实用：步行可达、半天能理解、旅行者能现实地复制。",
      },
      {
        title: "从氛围发现，再做核实",
        desc: "X 帮我们捕捉氛围和正在浮现的本地兴趣，但发布前我们仍会核实位置、可达性以及对游客的基本实用性。",
      },
      {
        title: "旅行准备入口保持轻量",
        desc: "正文以旅游信息为主，eSIM 与旅行准备链接只在核心内容之后轻量呈现。",
      },
    ],
    clustersTitle: "按地区浏览",
    clustersLead:
      "步行指南按地区整理。每个城市页面汇集街区路线，方便你规划半天或一整天的步行行程。",
    clusters: [
      {
        title: "日本",
        desc: "东京、京都、大阪、金泽、奈良、广岛、福冈、札幌、长崎、横滨、名古屋等——遍布全国的安静街区散步与电车沿线绕行路线。",
      },
      {
        title: "韩国与台湾",
        desc: "首尔、釜山、济州、台北的步行路线——避开旅游核心的小巷咖啡街、清晨宫殿散步、富有创造力的街区。",
      },
      {
        title: "东南亚",
        desc: "曼谷、河内、巴厘岛、新加坡、吉隆坡、清迈——河畔散步、老城路线，以及热带城市的慢节奏街区指南。",
      },
      {
        title: "欧洲",
        desc: "巴黎、伦敦、罗马、柏林、巴塞罗那、阿姆斯特丹、维也纳、布拉格、里斯本、马德里、雅典、哥本哈根、爱丁堡——主要首都的分区步行路线。",
      },
      {
        title: "美洲",
        desc: "纽约、多伦多等北美城市——为想跳过巴士团、用脚步探索的旅行者准备的街区散步路线。",
      },
      {
        title: "大洋洲、中东及其他",
        desc: "悉尼、墨尔本、迪拜、伊斯坦布尔等——超越常规线路的旅程所需的更安静步行路线。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      {
        q: "这些指南覆盖什么样的散步？",
        a: "聚焦比标准首游清单更具体、更安静、曝光度更低的地点和路线，同时仍然实用到旅行者能在现场跟着走。",
      },
      {
        q: "这是隐藏景点还是现实的半日路线？",
        a: "两者都是。每篇指南都是现实的半日或街区计划，附带车站可达性、时段建议，并说明该街区值得花时间的理由。",
      },
      {
        q: "指南是怎么组织的？",
        a: "按城市组织。每个城市页面汇集相关街区路线，便于你串联多个区域做一日步行行程。可以在上方按地区浏览，也可以直接打开城市查看该目的地的所有指南。",
      },
      {
        q: "这些路线是怎么调研的？",
        a: "从本地推荐和社交平台上的氛围出发，发布前再核实路线、车站可达性以及实际营业情况。指南会随街区变化持续更新。",
      },
    ],
    prepTitle: "旅行准备",
    prepLead:
      "确定目的地之后，下面的页面帮你在出发前完成上网连接和准备。",
    prepLinks: [
      {
        href: "/esim",
        title: "浏览旅行eSIM套餐",
        desc: "比较目的地的数据套餐，落地那一刻就能保持在线。",
      },
      {
        href: "/guide",
        title: "查看全部旅行指南",
        desc: "设置教程、按国家划分的eSIM覆盖以及旅途中的连网技巧。",
      },
      {
        href: "/guide/japan-esim",
        title: "日本旅行eSIM",
        desc: "覆盖、价格和落地后的提示——适合规划抵达日本后第一个小时的人。",
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
