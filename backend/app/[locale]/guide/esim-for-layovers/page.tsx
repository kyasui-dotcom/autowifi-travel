import type { Metadata } from "next";
import ArticleLayout, {
  type ArticleContent,
  type Locale,
  type RelatedArticle,
} from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<
  Locale,
  { title: string; articles: RelatedArticle[] }
> = {
  ja: {
    title: "乗継前に比較したいページ",
    articles: [
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド" },
      { slug: "japan-esim", title: "日本のeSIMガイド" },
      { slug: "korea-esim", title: "韓国のeSIMガイド" },
      { slug: "dubai-esim", title: "ドバイ・UAE eSIMガイド" },
    ],
  },
  en: {
    title: "Compare More Before Your Layover",
    articles: [
      {
        slug: "airport-connectivity-guide",
        title: "Airport WiFi and Connectivity Guide Worldwide",
      },
      { slug: "esim-for-business-travel", title: "eSIM for Business Travel" },
      { slug: "japan-esim", title: "Best eSIM for Japan Travel 2026" },
      { slug: "korea-esim", title: "Best eSIM for South Korea Travel 2026" },
      { slug: "hong-kong-esim", title: "Best eSIM for Hong Kong Travel 2026" },
      { slug: "singapore-esim", title: "Best eSIM for Singapore Travel 2026" },
      { slug: "dubai-esim", title: "Best eSIM for Dubai Travel 2026" },
    ],
  },
  ko: {
    title: "경유 전에 함께 볼 가이드",
    articles: [
      { slug: "airport-connectivity-guide", title: "공항 WiFi·통신 가이드" },
      { slug: "japan-esim", title: "일본 eSIM 가이드" },
      { slug: "korea-esim", title: "한국 eSIM 가이드" },
      { slug: "dubai-esim", title: "두바이·UAE eSIM 가이드" },
    ],
  },
  zh: {
    title: "转机前可继续比较",
    articles: [
      { slug: "airport-connectivity-guide", title: "机场 WiFi 与连接指南" },
      { slug: "japan-esim", title: "日本eSIM指南" },
      { slug: "korea-esim", title: "韩国eSIM指南" },
      { slug: "dubai-esim", title: "迪拜·UAE eSIM指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "乗継・レイオーバー向けeSIMガイド 2026",
    subtitle: "深夜到着、空港乗継、ホテル移動前提で選ぶ travel eSIM",
    intro: "乗継やレイオーバーでは、空港WiFiに頼るよりも、到着直後から地図、配車、ホテル連絡、搭乗情報を確実に使えることが重要です。このガイドでは、深夜到着や短時間のトランジットでも失敗しにくいeSIMの選び方を整理します。本記事では深夜到着、空港乗継、ホテル移動前提で選ぶ travel eSIM・レイオーバーでeSIMが効く理由・深夜到着・短時間乗継で見るべき比較軸などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "レイオーバーでeSIMが効く理由",
        body:
          "レイオーバー中は、次の搭乗口確認、遅延チェック、ラウンジ検索、ホテルや送迎への連絡など、数十分単位で通信が必要になる場面が続きます。空港WiFiが混雑していると、この最初の数分でかなり時間を失いやすいです。\n\n事前にeSIMを入れておけば、着陸直後からモバイル通信が使えるため、接続待ちや認証ページの手間を減らせます。",
      },
      {
        title: "深夜到着・短時間乗継で見るべき比較軸",
        body:
          "比較で最初に見るべきなのは、1. 到着国と乗継国の両方をカバーしているか、2. QR設定を出発前に終えられるか、3. 1日単位で十分な容量があるか、4. 地図・配車・メッセージ中心でも安定しそうか、の4点です。\n\n短い乗継なら大容量よりも、確実につながることと再設定の少なさが重要です。逆に一泊トランジットや出張の到着日は、ホテルWiFiのバックアップも考えて少し余裕のある容量が安心です。",
      },
      {
        title: "どの都市でこの考え方が特に効くか",
        body:
          "英語圏の検索意図では、東京、ソウル、香港、シンガポール、ドバイのような大型ハブ空港を持つ都市で、airport arrival や layover 前提の比較が特に強くなります。これらの都市は空港鉄道や配車アプリの利用率が高く、到着後すぐに通信が必要になりやすいからです。\n\nそのため、国別ページだけでなく、到着導線に強い比較ページとあわせて見ると選びやすくなります。",
      },
      {
        title: "失敗しにくい準備の流れ",
        body:
          "おすすめの流れは、出発前にeSIMをインストール、到着国または周遊対象国を確認、実際に使うタイミングだけ現地でオンにする、の順です。さらに注文後にQRコードや設定情報を見返せる状態にしておくと、空港で焦りにくくなります。\n\nAutoWiFi Travelでは、空港通信系の比較記事から各都市ガイド、国別eSIMページまでつながっているので、乗継前提でも絞り込みやすくなっています。",
      },
    ],
    faqTitle: "よくある質問",
    faqs: [
      {
        q: "レイオーバーだけでもeSIMは必要ですか？",
        a: "短時間でも、搭乗情報、地図、配車、ホテル連絡が必要ならeSIMがあるとかなり安心です。特に深夜到着や混雑空港では差が出ます。",
      },
      {
        q: "空港WiFiだけでは足りませんか？",
        a: "空港によっては十分ですが、混雑時の速度低下や認証の手間があります。移動を急ぐ旅程ではeSIMの方が安定しやすいです。",
      },
      {
        q: "乗継国もカバーする必要がありますか？",
        a: "空港の外に出る予定がある、あるいは乗継中にも安定した通信を使いたい場合は、乗継国を含むプランの方が安全です。",
      },
    ],
    ctaTitle: "乗継前にeSIMを比較する",
    ctaDesc: "空港到着からホテル移動まで、つながる前提で準備できます。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "乗継向けeSIMガイド",
  },
  en: {
    title: "Best eSIM for Layovers, Airport Rail, and Hotel Transfers 2026",
    subtitle:
      "Compare travel eSIM options for Tokyo, Seoul, Hong Kong, Singapore, and Dubai arrivals before your next stopover",
    intro:
      "Layovers and overnight arrivals create a different travel eSIM use case from normal sightseeing. You need maps, gate changes, airport rail directions, ride-hailing, hotel details, and messaging to work immediately, often before airport WiFi or hotel WiFi is convenient. This guide explains how to compare eSIM options for layovers, stopovers, airport-to-hotel transfers, and business-arrival travel.",
    sections: [
      {
        title: "Why travel eSIM matters more during layovers",
        body:
          "During a layover, every minute counts. Travelers need to check gates, track delays, message hotels or drivers, find lounges, and sometimes navigate a new airport rail system before they even think about sightseeing. Airport WiFi can be good, but it is also crowded, inconsistent, and one more login flow when time is already tight.\n\nThat is why a pre-installed eSIM often becomes much more valuable on layover-heavy trips than on slower itineraries. You remove setup friction from the exact part of the journey where friction is most expensive.",
      },
      {
        title: "What to compare for stopovers and overnight arrivals",
        body:
          "The best layover eSIM is usually not just the cheapest one. First confirm that the plan covers both your arrival country and any stopover country you may actually use outside the terminal. Then compare setup recovery, realistic one-day data needs, hotspot support, and whether the plan feels stable enough for maps, ride apps, and hotel coordination.\n\nFor short stopovers, reliability matters more than huge data allowances. For overnight transits and business arrivals, it also helps to have enough data to cover hotel WiFi backup and next-morning transit.",
      },
      {
        title: "The strongest city examples for this search intent",
        body:
          "This search intent tends to be strongest around major hub cities such as Tokyo, Seoul, Hong Kong, Singapore, and Dubai. These are airports where travelers often depend on airport rail, taxi apps, translation, business messaging, and immediate hotel coordination after landing.\n\nThat makes them useful examples when comparing travel eSIM options for layovers. If a provider or guide is clearly useful for Tokyo arrival logistics, Seoul airport rail, Changi arrivals, Hong Kong airport train transfers, or Dubai red-eye arrivals, it usually aligns well with layover-focused and transit-heavy search intent too.",
      },
      {
        title: "A safer prep flow before departure",
        body:
          "A practical approach is to install your eSIM before departure, confirm supported countries, and only enable the travel line at the appropriate moment once you land. It also helps to choose a provider where you can easily reopen the QR code and installation details if something goes wrong during transit.\n\nAutoWiFi Travel connects airport-connectivity comparisons, arrival-focused city guides, and country eSIM pages so travelers can move from broad layover research into a trip-specific plan more easily.",
      },
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        q: "Do I need an eSIM even if I am only transiting?",
        a: "If you expect to rely on maps, gate updates, airport rail, ride-hailing, or hotel messaging, an eSIM can be very useful even for a short transit.",
      },
      {
        q: "Is airport WiFi enough for layovers?",
        a: "Sometimes yes, but it can be crowded or slow. For tight connections and late-night arrivals, a pre-installed eSIM is usually the lower-friction option.",
      },
      {
        q: "Should my plan include the stopover country too?",
        a: "If you may leave the terminal, spend the night, or want reliable connectivity during transit, choosing a plan that includes the stopover country is the safer choice.",
      },
    ],
    ctaTitle: "Compare eSIM plans before your next layover",
    ctaDesc:
      "Prepare for airport arrivals, stopovers, and hotel transfers with less connection risk.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Best eSIM for Layovers",
  },
  ko: {
    title: "경유·야간 도착용 eSIM 가이드 2026",
    subtitle: "공항 환승, 심야 도착, 호텔 이동 전에 맞는 travel eSIM 고르기",
    intro:
      "경유나 심야 도착은 일반 관광과 다른 eSIM 사용 장면입니다. 공항 WiFi보다 먼저 지도, 게이트 정보, 차량 호출, 호텔 연락이 바로 되어야 하는 경우가 많기 때문입니다. 이 가이드는 layover, stopover, business arrival 상황에서 eSIM을 어떻게 비교할지 정리합니다.",
    sections: [
      {
        title: "경유에서 eSIM 가치가 커지는 이유",
        body:
          "경유 중에는 게이트 변경 확인, 지연 체크, 라운지 검색, 호텔·기사 연락처럼 짧은 시간 안에 처리해야 할 일이 많습니다. 공항 WiFi가 좋아도 로그인 절차와 혼잡 때문에 첫 몇 분을 잃기 쉽습니다.\n\n출발 전에 eSIM을 설치해 두면 착륙 직후 바로 데이터를 쓸 수 있어, 가장 바쁜 구간의 마찰을 줄일 수 있습니다.",
      },
      {
        title: "stopover와 overnight arrival에서 먼저 볼 기준",
        body:
          "좋은 layover eSIM은 단순히 가장 싼 플랜이 아닙니다. 먼저 도착 국가와 경유 국가를 모두 지원하는지 확인하고, 그다음 설치 정보 재확인 가능 여부, 하루 기준 데이터 용량, 핫스팟 지원, 지도와 차량 호출 앱의 안정성을 비교하세요.\n\n짧은 경유는 대용량보다 확실히 연결되는지가 더 중요하고, 하룻밤 체류나 출장 도착일은 호텔 WiFi 백업까지 생각해 조금 더 여유 있는 플랜이 좋습니다.",
      },
      {
        title: "이 검색 의도와 잘 맞는 대표 도시",
        body:
          "영어권에서는 도쿄, 서울, 홍콩, 싱가포르, 두바이처럼 허브 공항이 있는 도시에서 arrival·layover 전제 비교가 특히 강합니다. 이 도시들은 공항철도, 택시 앱, 번역, 즉시 메시징이 중요하기 때문입니다.\n\n그래서 이런 도시의 도착 가이드와 함께 보면 layover용 eSIM 비교가 훨씬 쉬워집니다.",
      },
      {
        title: "출발 전 준비 흐름",
        body:
          "실전에서는 출발 전에 eSIM을 설치하고, 지원 국가를 확인한 뒤, 현지에서 실제 사용할 때만 회선을 켜는 방식이 가장 안정적입니다. 또한 환승 중 문제가 생겨도 QR 코드와 설치 정보를 다시 열어볼 수 있어야 합니다.\n\nAutoWiFi Travel은 공항 연결 가이드, 도착형 도시 가이드, 국가별 eSIM 페이지가 이어져 있어 layover 전제 비교가 쉬운 편입니다.",
      },
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      {
        q: "단순 환승만 해도 eSIM이 필요할까요?",
        a: "지도, 게이트 정보, 공항철도, 차량 호출, 호텔 연락이 필요하다면 짧은 환승에서도 eSIM이 꽤 유용합니다.",
      },
      {
        q: "공항 WiFi만으로 충분하지 않나요?",
        a: "상황에 따라 충분할 수 있지만, 혼잡하거나 로그인 절차가 번거로울 수 있습니다. 빠르게 움직여야 하는 일정에서는 eSIM이 더 안정적입니다.",
      },
      {
        q: "경유 국가도 플랜에 포함해야 하나요?",
        a: "터미널 밖으로 나가거나 하룻밤 머물 가능성이 있다면 경유 국가까지 포함된 플랜이 더 안전합니다.",
      },
    ],
    ctaTitle: "다음 경유 전에 eSIM 비교하기",
    ctaDesc: "공항 도착부터 호텔 이동까지 연결 리스크를 줄일 수 있습니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "경유용 eSIM 가이드",
  },
  zh: {
    title: "转机与夜间到达 eSIM 指南 2026",
    subtitle: "为 stopover、深夜落地与机场到酒店连接选择更合适的 travel eSIM",
    intro:
      "转机和夜间到达是与普通观光不同的 eSIM 使用场景。很多时候你需要地图、登机口更新、叫车、酒店沟通在落地后立刻可用，而不是先折腾机场 WiFi。这篇指南专门整理 layover、stopover 与商务到达场景下的 eSIM 比较方法。",
    sections: [
      {
        title: "为什么在转机时 eSIM 更重要",
        body:
          "转机时最宝贵的是时间。你需要查登机口、看延误、找休息室、联系酒店或司机，有时还要快速搞定机场铁路路线。机场 WiFi 可能不错，但也可能拥挤、变慢，或者多出一层登录步骤。\n\n如果提前安装好了 eSIM，就能把这些摩擦从最紧张的时间段里移除。",
      },
      {
        title: "stopover 和深夜到达时先比较什么",
        body:
          "适合 layover 的 eSIM 往往不只是最便宜的那一个。先看是否覆盖到达国和可能会用到的转机国，再看能否方便找回安装信息、一天流量是否足够、是否支持热点，以及地图和叫车应用是否能稳定使用。\n\n对于短转机，可靠性通常比超大流量更重要。对于过夜转机或商务到达，还要考虑酒店 WiFi 失效时的备用流量。",
      },
      {
        title: "这个搜索意图最常见的城市",
        body:
          "这个搜索意图在东京、首尔、香港、新加坡、迪拜等大型枢纽机场城市最常见，因为这些地方的旅客往往高度依赖机场铁路、叫车、翻译和即时消息。\n\n所以，把这些城市的到达型指南串起来看，会比只看一篇泛泛的 eSIM 对比更容易做决定。",
      },
      {
        title: "出发前更稳妥的准备流程",
        body:
          "更稳妥的做法是：出发前先安装 eSIM，确认支持国家，抵达后在合适时机再真正启用线路。同时，最好选择购买后还能方便重新打开二维码和安装步骤的服务。\n\nAutoWiFi Travel 把机场连接指南、到达型城市指南和国家 eSIM 页面连在一起，便于你从广泛调研进入具体套餐选择。",
      },
    ],
    faqTitle: "常见问题",
    faqs: [
      {
        q: "只是转机也需要 eSIM 吗？",
        a: "如果你要用地图、登机口更新、机场铁路、叫车或酒店沟通，即使只是短转机，eSIM 也很有帮助。",
      },
      {
        q: "机场 WiFi 不够用吗？",
        a: "有时够用，但在高峰期可能拥堵或麻烦。对时间紧张的转机和夜间到达来说，预装 eSIM 往往更省事。",
      },
      {
        q: "套餐应该覆盖转机国吗？",
        a: "如果你可能出航站楼、过夜，或希望在转机阶段也保持稳定连接，覆盖转机国会更安全。",
      },
    ],
    ctaTitle: "在下一次转机前先比较 eSIM",
    ctaDesc: "从机场落地到酒店转移，尽量减少连接风险。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "转机 eSIM 指南",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({
    locale: locale as Locale,
    path: "/guide/esim-for-layovers",
    title: c.title,
    description: truncateAtSentence(c.intro),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const rel = RELATED_ARTICLES[loc];
  return (
    <ArticleLayout
      locale={loc}
      slug="esim-for-layovers"
      content={CONTENT[loc]}
      relatedArticles={rel.articles}
      relatedTitle={rel.title}
    />
  );
}
