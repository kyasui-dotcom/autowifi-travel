import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "インドネシアeSIMガイド - バリ・ジャカルタ・島間カバレッジ完全解説",
    subtitle: "1万7千以上の島々からなる群島国家での通信事情を徹底ガイド",
    intro: "インドネシアは1万7千以上の島々からなる世界最大の群島国家です。バリ島のビーチリゾート、ジャカルタのビジネス都市、ジョグジャカルタの遺跡巡りなど、島ごとに異なる魅力があります。広大な国土のため通信カバレッジには地域差がありますが、主要な観光エリアではeSIMで快適にインターネット接続が可能です。事前にeSIMを設定しておけば、空港到着後すぐにGrab配車や地図アプリを利用できます。",
    sections: [
      {
        title: "インドネシアの通信環境と主要キャリア",
        body: "インドネシアの通信市場はTelkomsel、XL Axiata、Indosat Ooredooの3大キャリアが中心です。特にTelkomselは最大のカバレッジを誇り、バリ島やジャワ島の主要エリアはもちろん、スマトラ島やカリマンタン島の都市部でも4G接続が可能です。\n\nただし、インドネシアは国土が広大なため、すべての島で均一な通信品質は期待できません。バリ島のウブド、スミニャック、クタなどの観光エリアでは安定した4G通信が利用可能ですが、ヌサペニダ島やギリ諸島などの小さな離島では3G接続になったり、通信が不安定になることがあります。"
      },
      {
        title: "バリ島での通信ガイド",
        body: "バリ島はインドネシアで最も観光インフラが整った島で、通信環境も比較的良好です。クタ、スミニャック、ジンバランなどの南部ビーチエリアでは安定した4G通信が利用可能です。ウブドの中心部や棚田エリアでもカバレッジは良好ですが、郊外の山間部では電波が弱くなることがあります。\n\nバリ島ではGrabやGoJek（インドネシアのライドシェアアプリ）が便利ですが、一部の観光地ではローカルタクシー組合の影響でGrabが使いにくい場合があります。モバイルデータがあれば、事前に料金を確認して交渉することも可能です。また、寺院巡りやライステラス見学の際に、Google Mapsは道に迷わないための必須ツールです。"
      },
      {
        title: "ジャカルタとジャワ島の通信事情",
        body: "首都ジャカルタは通信インフラが最も充実しており、5Gの展開も始まっています。ビジネス街のスディルマン通り、ショッピングエリアのグランドインドネシア、歴史的なコタ地区など、市内全域で高速通信が利用できます。\n\nジャワ島の他の主要都市であるジョグジャカルタ（ボロブドゥール遺跡、プランバナン寺院へのアクセス拠点）やスラバヤでも4G通信は安定しています。ボロブドゥール遺跡の周辺でもカバレッジは良好で、壮大な仏教遺跡の写真をリアルタイムでシェアできます。"
      },
      {
        title: "島間移動とeSIMプラン選び",
        body: "インドネシア旅行では複数の島を周遊する方も多いですが、eSIMなら島ごとにSIMカードを買い直す必要がありません。一つのeSIMプランで、バリ島からジャワ島、ロンボク島への移動中も継続して利用できます。\n\nAutoWiFi eSIMのインドネシアプランは、Telkomselの広範なネットワークに接続するため、主要な島々で安定した通信が期待できます。バリ島だけの短期滞在なら3〜5日プラン、複数島の周遊なら7〜14日プランがおすすめです。データ容量は1日1GB以上のプランを選ぶと、写真・動画のアップロードにも余裕があります。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "バリ島でeSIMは快適に使えますか？", a: "はい、バリ島の主要観光エリア（クタ、スミニャック、ウブドなど）では安定した4G通信が利用可能です。ただし、ヌサペニダ島など離島や山奥では電波が弱くなることがあります。" },
      { q: "インドネシアでGrabやGoJekは使えますか？", a: "はい、eSIMでデータ通信があればGrabとGoJekの両方を利用できます。ジャカルタやバリ島の都市部では非常に便利な移動手段です。" },
      { q: "複数の島を周遊する場合、eSIMは一つで足りますか？", a: "はい、AutoWiFi eSIMのインドネシアプランはTelkomselのネットワークを利用するため、主要な島々（バリ、ジャワ、スマトラ、カリマンタンなど）で一つのプランで利用できます。" },
      { q: "ボロブドゥール遺跡でeSIMは使えますか？", a: "はい、ボロブドゥール遺跡とその周辺では4G通信が利用可能です。遺跡内での写真撮影やSNS投稿もスムーズに行えます。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでインドネシア旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "インドネシアeSIM",
  },
  en: {
    title: "Indonesia eSIM Guide - Bali, Jakarta & Inter-Island Coverage",
    subtitle: "Navigate the world's largest archipelago with reliable mobile connectivity",
    intro: "Indonesia is the world's largest archipelago nation, comprising over 17,000 islands. From Bali's beach resorts to Jakarta's urban bustle and Yogyakarta's ancient temples, each island offers distinct attractions. While coverage varies across this vast territory, major tourist areas support comfortable eSIM connectivity. Setting up your eSIM before departure means you can use Grab and maps apps immediately upon arrival.",
    sections: [
      {
        title: "Indonesia's Telecom Environment and Major Carriers",
        body: "Indonesia's telecom market is led by Telkomsel, XL Axiata, and Indosat Ooredoo. Telkomsel has the most extensive coverage, providing 4G connectivity across Bali, Java, major areas of Sumatra, and Kalimantan's urban centers.\n\nHowever, given Indonesia's enormous size, uniform coverage across all islands isn't possible. Popular Bali tourist areas like Ubud, Seminyak, and Kuta enjoy stable 4G, but smaller islands like Nusa Penida and the Gili Islands may have inconsistent 3G coverage."
      },
      {
        title: "Connectivity Guide for Bali",
        body: "Bali has the best-developed tourism infrastructure in Indonesia, and its telecom environment reflects this. Southern beach areas including Kuta, Seminyak, and Jimbaran have stable 4G coverage. Central Ubud and the rice terrace areas also have good connectivity, though more remote highland locations may have weaker signals.\n\nGrab and GoJek (Indonesia's ride-hailing app) work well in Bali, though some tourist areas have restrictions due to local taxi cooperatives. Mobile data lets you check and compare fares before negotiating. Google Maps is essential for navigating to temples and rice terraces without getting lost."
      },
      {
        title: "Jakarta and Java Island Connectivity",
        body: "Jakarta, the capital, has the most robust telecom infrastructure, with 5G deployment underway. High-speed connectivity is available throughout the city, from the business district on Sudirman Street to Grand Indonesia shopping area and the historic Kota district.\n\nOther major Java cities like Yogyakarta (gateway to Borobudur and Prambanan temples) and Surabaya also have stable 4G coverage. Borobudur temple and its surroundings have good connectivity, allowing you to share photos of the magnificent Buddhist monument in real time."
      },
      {
        title: "Inter-Island Travel and eSIM Plan Selection",
        body: "Many Indonesia travelers visit multiple islands, and an eSIM eliminates the need to buy new SIM cards at each destination. A single eSIM plan works seamlessly as you travel from Bali to Java to Lombok.\n\nAutoWiFi eSIM Indonesia plans connect through Telkomsel's extensive network, ensuring stable coverage across major islands. For a Bali-only short stay, a 3-5 day plan works well. For multi-island itineraries, 7-14 day plans are recommended. Choose plans with 1GB+ per day to comfortably upload photos and videos."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does eSIM work well in Bali?", a: "Yes, major Bali tourist areas like Kuta, Seminyak, and Ubud have stable 4G coverage. However, smaller islands like Nusa Penida and remote mountain areas may have weaker signals." },
      { q: "Can I use Grab and GoJek with eSIM in Indonesia?", a: "Yes, both Grab and GoJek work with eSIM data connectivity. They're extremely convenient transportation options in Jakarta and Bali's urban areas." },
      { q: "Is one eSIM enough for visiting multiple islands?", a: "Yes, AutoWiFi eSIM Indonesia plans use Telkomsel's network, which covers major islands including Bali, Java, Sumatra, and Kalimantan with a single plan." },
      { q: "Does eSIM work at Borobudur temple?", a: "Yes, 4G coverage is available at Borobudur temple and its surroundings. You can comfortably take and share photos at the site." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Indonesia with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Indonesia eSIM",
  },
  ko: {
    title: "인도네시아 eSIM 가이드 - 발리·자카르타·섬간 커버리지 완전 해설",
    subtitle: "1만 7천 개 이상의 섬으로 이루어진 군도 국가의 통신 가이드",
    intro: "인도네시아는 1만 7천 개 이상의 섬으로 이루어진 세계 최대의 군도 국가입니다. 발리의 해변 리조트, 자카르타의 비즈니스 도시, 족자카르타의 유적 탐방 등 섬마다 다른 매력이 있습니다. 광대한 국토로 인해 통신 커버리지에 지역 차이가 있지만, 주요 관광 지역에서는 eSIM으로 쾌적하게 인터넷을 이용할 수 있습니다.",
    sections: [
      {
        title: "인도네시아 통신 환경과 주요 통신사",
        body: "인도네시아 통신 시장은 Telkomsel, XL Axiata, Indosat Ooredoo의 3대 통신사가 주도합니다. 특히 Telkomsel은 최대 커버리지를 자랑하며, 발리와 자바의 주요 지역은 물론 수마트라와 칼리만탄의 도시 지역에서도 4G 연결이 가능합니다.\n\n다만 인도네시아는 국토가 광활하여 모든 섬에서 균일한 통신 품질을 기대하기는 어렵습니다. 발리의 우붓, 스미냑, 쿠타 등 관광 지역에서는 안정적인 4G를 이용할 수 있지만, 누사페니다 섬이나 길리 제도 같은 작은 이도에서는 3G가 되거나 통신이 불안정할 수 있습니다."
      },
      {
        title: "발리에서의 통신 가이드",
        body: "발리는 인도네시아에서 관광 인프라가 가장 잘 갖춰진 섬으로 통신 환경도 비교적 양호합니다. 쿠타, 스미냑, 짐바란 등 남부 해변 지역에서는 안정적인 4G를 이용할 수 있습니다. 우붓 중심부와 라이스 테라스 지역도 커버리지가 좋지만, 외곽 산간 지역에서는 신호가 약해질 수 있습니다.\n\n발리에서는 Grab과 GoJek(인도네시아 라이드셰어 앱)이 편리하지만, 일부 관광지에서는 로컬 택시 조합의 영향으로 Grab이 사용하기 어려운 경우가 있습니다. 모바일 데이터가 있으면 사전에 요금을 확인하고 협상할 수 있습니다."
      },
      {
        title: "자카르타와 자바 섬 통신 사정",
        body: "수도 자카르타는 통신 인프라가 가장 충실하며 5G 도입도 시작되었습니다. 수디르만 거리의 비즈니스 지구, 그랜드 인도네시아 쇼핑 지역, 역사적인 코타 지구 등 시내 전역에서 고속 통신을 이용할 수 있습니다.\n\n자바의 다른 주요 도시인 족자카르타(보로부두르 유적, 프람바난 사원의 거점)나 수라바야에서도 4G 통신이 안정적입니다. 보로부두르 유적 주변에서도 커버리지가 양호하여 웅장한 불교 유적의 사진을 실시간으로 공유할 수 있습니다."
      },
      {
        title: "섬간 이동과 eSIM 플랜 선택",
        body: "인도네시아 여행에서는 여러 섬을 돌아보는 분도 많지만, eSIM이라면 섬마다 SIM 카드를 다시 살 필요가 없습니다. 하나의 eSIM 플랜으로 발리에서 자바, 롬복으로의 이동 중에도 계속 사용할 수 있습니다.\n\nAutoWiFi eSIM 인도네시아 플랜은 Telkomsel의 광범위한 네트워크에 연결되어 주요 섬에서 안정적인 통신을 기대할 수 있습니다. 발리만 단기 체류라면 3~5일 플랜, 복수 섬 주유라면 7~14일 플랜을 추천합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "발리에서 eSIM이 잘 작동하나요?", a: "네, 발리의 주요 관광 지역(쿠타, 스미냑, 우붓 등)에서는 안정적인 4G를 이용할 수 있습니다. 다만 누사페니다 등 이도나 산간 지역에서는 신호가 약해질 수 있습니다." },
      { q: "인도네시아에서 Grab과 GoJek을 사용할 수 있나요?", a: "네, eSIM 데이터가 있으면 Grab과 GoJek 모두 이용 가능합니다. 자카르타와 발리 도시 지역에서 매우 편리한 이동 수단입니다." },
      { q: "여러 섬을 방문할 때 eSIM 하나로 충분한가요?", a: "네, AutoWiFi eSIM 인도네시아 플랜은 Telkomsel 네트워크를 이용하므로 발리, 자바, 수마트라, 칼리만탄 등 주요 섬에서 하나의 플랜으로 사용할 수 있습니다." },
      { q: "보로부두르 유적에서 eSIM을 사용할 수 있나요?", a: "네, 보로부두르 유적과 주변 지역에서 4G 통신이 가능합니다. 유적 내에서 사진 촬영과 SNS 포스팅도 원활하게 할 수 있습니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 인도네시아 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "인도네시아 eSIM",
  },
  zh: {
    title: "印度尼西亚eSIM指南 - 巴厘岛·雅加达·跨岛覆盖详解",
    subtitle: "在世界最大群岛国家畅享移动通信",
    intro: "印度尼西亚由超过1.7万个岛屿组成，是世界上最大的群岛国家。从巴厘岛的海滨度假到雅加达的都市繁华，再到日惹的古迹探访，每个岛屿都有独特的魅力。由于国土广阔，通信覆盖存在地域差异，但主要旅游区域使用eSIM可以舒适地连接互联网。提前设置好eSIM，到达机场后就能立即使用Grab叫车和地图导航。",
    sections: [
      {
        title: "印尼通信环境与主要运营商",
        body: "印尼通信市场由Telkomsel、XL Axiata和Indosat Ooredoo三大运营商主导。其中Telkomsel拥有最广的覆盖范围，巴厘岛和爪哇岛主要地区自不用说，苏门答腊和加里曼丹的城市地区也可使用4G网络。\n\n不过，由于印尼国土面积庞大，不可能所有岛屿都有统一的通信质量。巴厘岛的乌布、水明漾、库塔等旅游区域4G信号稳定，但努沙佩尼达岛和吉利群岛等小型离岛可能只有3G或信号不稳定。"
      },
      {
        title: "巴厘岛通信指南",
        body: "巴厘岛是印尼旅游基础设施最完善的岛屿，通信环境也相对良好。库塔、水明漾、金巴兰等南部海滩区域4G信号稳定。乌布市中心和梯田区域覆盖也不错，但偏远山区信号可能较弱。\n\n在巴厘岛，Grab和GoJek（印尼网约车应用）非常方便，但部分景区受当地出租车工会影响，Grab可能不太好用。有了移动数据，你可以提前查看和比较价格再进行协商。参观寺庙和梯田时，Google Maps是防止迷路的必备工具。"
      },
      {
        title: "雅加达和爪哇岛通信情况",
        body: "首都雅加达通信基础设施最为完善，5G已开始部署。苏迪曼大街商务区、Grand Indonesia购物中心、历史悠久的科塔老城等全市各处均可享受高速通信。\n\n爪哇岛的其他主要城市如日惹（前往婆罗浮屠和普兰巴南寺庙的门户）和泗水也有稳定的4G覆盖。婆罗浮屠寺庙周边覆盖良好，可以实时分享这座宏伟佛教遗迹的照片。"
      },
      {
        title: "跨岛出行与eSIM套餐选择",
        body: "很多印尼旅行者会游览多个岛屿，eSIM免去了每到一个岛就要重新购买SIM卡的麻烦。一个eSIM套餐就能在巴厘岛、爪哇岛、龙目岛之间无缝使用。\n\nAutoWiFi eSIM印尼套餐接入Telkomsel的广泛网络，确保在主要岛屿上获得稳定的通信。如果只在巴厘岛短期停留，3-5天套餐即可；如果要游览多个岛屿，建议选择7-14天套餐。数据流量建议选择每日1GB以上的套餐，方便上传照片和视频。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在巴厘岛好用吗？", a: "在巴厘岛主要旅游区域（库塔、水明漾、乌布等），4G信号稳定可用。但努沙佩尼达等离岛和偏远山区信号可能较弱。" },
      { q: "在印尼可以用Grab和GoJek吗？", a: "可以，有了eSIM数据连接，Grab和GoJek都能使用。在雅加达和巴厘岛城区是非常方便的出行工具。" },
      { q: "游览多个岛屿需要多个eSIM吗？", a: "不需要。AutoWiFi eSIM印尼套餐使用Telkomsel网络，一个套餐就能覆盖巴厘岛、爪哇岛、苏门答腊岛、加里曼丹岛等主要岛屿。" },
      { q: "在婆罗浮屠能用eSIM吗？", a: "可以，婆罗浮屠寺庙及周边地区有4G覆盖，可以流畅地拍照和分享社交媒体。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游印度尼西亚。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "印度尼西亚eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/indonesia-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="indonesia-esim" content={CONTENT[loc]} />;
}
