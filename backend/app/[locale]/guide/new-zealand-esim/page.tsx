import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "ロードトリップと国立公園前に見たいガイド",
    articles: [
      { slug: "australia-esim", title: "オーストラリアeSIMガイド" },
      { slug: "iceland-esim", title: "アイスランドeSIMガイド" },
      { slug: "esim-for-road-trips", title: "ロードトリップ向けeSIMガイド" },
      { slug: "travel-internet-options", title: "海外旅行のネット接続方法" },
      { slug: "esim-troubleshooting", title: "eSIMトラブルシューティング" },
    ],
  },
  en: {
    title: "Compare More Before You Drive Through Remote New Zealand",
    articles: [
      { slug: "australia-esim", title: "Australia eSIM Guide" },
      { slug: "iceland-esim", title: "Iceland eSIM Guide" },
      { slug: "esim-for-road-trips", title: "Best eSIM for Road Trips" },
      { slug: "travel-internet-options", title: "Travel Internet Options" },
      { slug: "esim-troubleshooting", title: "eSIM Troubleshooting" },
    ],
  },
  ko: {
    title: "로드트립과 국립공원 이동 전에 함께 볼 가이드",
    articles: [
      { slug: "australia-esim", title: "호주 eSIM 가이드" },
      { slug: "iceland-esim", title: "아이슬란드 eSIM 가이드" },
      { slug: "esim-for-road-trips", title: "로드트립용 eSIM 가이드" },
      { slug: "travel-internet-options", title: "여행 인터넷 옵션 비교" },
      { slug: "esim-troubleshooting", title: "eSIM 문제 해결" },
    ],
  },
  zh: {
    title: "自驾和国家公园出发前值得继续比较",
    articles: [
      { slug: "australia-esim", title: "澳大利亚eSIM指南" },
      { slug: "iceland-esim", title: "冰岛eSIM指南" },
      { slug: "esim-for-road-trips", title: "自驾旅行eSIM指南" },
      { slug: "travel-internet-options", title: "旅行上网方式对比" },
      { slug: "esim-troubleshooting", title: "eSIM故障排除" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "ニュージーランドeSIMガイド - オークランド・クイーンズタウンのカバレッジと旅行者向けヒント",
    subtitle: "大自然の国ニュージーランドをeSIMで快適に旅しよう",
    intro: "ニュージーランドは壮大な自然景観で知られる人気旅行先です。オークランドやウェリントンなどの都市部では高品質な4G LTE通信が利用でき、eSIMを使えばオークランド空港到着後すぐにGoogle Mapsでのナビやレンタカーの手配が可能です。ただし、ミルフォードサウンドや国立公園など一部のリモートエリアでは通信が限られるため、事前の準備が重要です。",
    sections: [
      {
        title: "ニュージーランドのモバイル通信事情",
        body: "ニュージーランドの主要通信キャリアはSpark、Vodafone NZ、2degreesの3社です。Sparkが最大のカバレッジを持ち、特に地方部での通信に強みがあります。Vodafone NZは都市部で安定した高速通信を提供し、2degreesはコストパフォーマンスに優れたキャリアです。\n\n旅行者向けeSIMプランは主にSparkまたはVodafone NZの回線を利用しており、オークランド、ウェリントン、クライストチャーチなどの主要都市で安定した4G LTE通信が可能です。5Gはオークランドとウェリントンの一部エリアで展開が始まっています。\n\nニュージーランドは国土に対して人口が少ないため、都市部と地方の通信環境の差が大きいのが特徴です。南島の山岳地帯やフィヨルドランドでは通信圏外になるエリアも多くあります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "ニュージーランド向けeSIMプランは、都市滞在向けの短期プランからロードトリップ向けの長期プランまで用意されています。1週間のオークランド・ロトルア旅行なら5GBプランがおすすめです。カフェやホテルのフリーWiFiと組み合わせればデータ節約が可能です。\n\n南島をレンタカーで周遊する場合は、10GB以上のプランを推奨します。Google Mapsのナビゲーションはデータを多く消費するため、十分な容量が必要です。オフラインマップの事前ダウンロードも併用すると安心です。\n\nAutoWiFi eSIMでは、ニュージーランド専用プランを提供しています。テザリングにも対応しているので、同行者とのシェアやカーナビ代わりの利用にも便利です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでニュージーランドプランを購入後、QRコードがメールで届きます。iPhoneは「設定→モバイル通信→eSIMを追加」、Androidは「設定→ネットワークとインターネット→SIM→eSIMを追加」からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、オークランド空港に到着後すぐに通信を開始できます。空港からシティへのSkyBus車内からインターネットが使えるのは大きなメリットです。\n\nニュージーランドの空港ではフリーWiFiが提供されていますが、速度が遅い場合があります。eSIMがあれば、到着直後から安定した通信が可能です。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "オークランド市内は通信環境が非常に良好で、スカイタワー周辺、クイーンストリート、ミッションベイ、デボンポートなどすべての主要エリアで高速通信が利用可能です。\n\nウェリントンではテ・パパ博物館周辺やキューバストリートなど市内中心部で安定した4G接続が可能です。クイーンズタウンでは町の中心部とスキーリゾートエリアでは良好な通信環境が整っています。\n\nロトルアの温泉地帯やワイトモ洞窟の観光エリアでは概ね通信可能ですが、クライストチャーチ郊外のバンクス半島やマウントクックではカバレッジが限定的です。ミルフォードサウンドでは通信圏外になるエリアが多く、事前にオフラインマップをダウンロードしておくことを強く推奨します。"
      },
      {
        title: "ニュージーランド旅行でのeSIM活用のコツ",
        body: "ニュージーランドはレンタカーでのロードトリップが人気ですが、南島の山岳エリアでは通信が途切れることがあります。Google Mapsのオフラインマップを事前にダウンロードしておけば、圏外でもナビゲーションが利用可能です。eSIMとオフラインマップの併用が最も安心な方法です。\n\n国立公園でのハイキングやトレッキングを計画している場合、トレイルの入口付近では通信可能でも、奥に進むと圏外になることが多いです。トンガリロ・アルパイン・クロッシングやルートバーン・トラックなどの人気トレイルでも同様です。出発前にルート情報をダウンロードしておきましょう。\n\nニュージーランドのレストランやアクティビティの予約には、BookmeやTripadvisorが便利です。eSIMがあれば、旅先で空き状況を確認してすぐに予約できます。また、ニュージーランドの天候は変わりやすいので、MetService（NZの天気予報サービス）をこまめにチェックすることをおすすめします。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ニュージーランドの地方部でeSIMは使えますか？", a: "主要な国道沿いや観光地では概ね通信可能ですが、南島の山岳地帯やフィヨルドランドでは圏外になるエリアがあります。Google Mapsのオフラインマップを事前にダウンロードしておくことを推奨します。" },
      { q: "ミルフォードサウンドでeSIMは使えますか？", a: "ミルフォードサウンドの大部分は通信圏外です。テアナウからミルフォードサウンドへの道中も山間部を通るため通信が途切れます。必要な情報は事前にダウンロードしてください。" },
      { q: "ニュージーランドでのデータ使用量の目安は？", a: "都市滞在中心なら1日500MB〜1GB、レンタカーでのロードトリップならナビ利用で1日1〜2GB程度です。7日間の旅行なら10GBプランが安心です。" },
      { q: "ニュージーランドとオーストラリアで同じeSIMを使えますか？", a: "オセアニア周遊プランをお選びいただければ、両国で同じeSIMを利用できます。各国専用プランの場合は別々に購入する必要があります。プラン詳細をご確認ください。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでニュージーランド旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ニュージーランドeSIMガイド",
  },
  en: {
    title: "New Zealand eSIM Guide - Coverage in Auckland, Queenstown & Travel Tips",
    subtitle: "Stay connected across New Zealand's cities and stunning landscapes",
    intro: "New Zealand is a world-renowned travel destination famous for its breathtaking natural scenery. Major cities like Auckland and Wellington offer high-quality 4G LTE coverage, and an eSIM lets you use Google Maps and book rental cars the moment you land at Auckland Airport. However, remote areas like Milford Sound and national parks have limited coverage, making advance preparation essential.",
    sections: [
      {
        title: "New Zealand's Mobile Network Overview",
        body: "New Zealand has three major carriers: Spark, Vodafone NZ, and 2degrees. Spark has the largest coverage footprint, particularly strong in rural areas. Vodafone NZ provides stable high-speed connectivity in urban areas, while 2degrees offers competitive value.\n\nTravel eSIM plans typically use Spark or Vodafone NZ networks, delivering reliable 4G LTE in Auckland, Wellington, Christchurch, and other major cities. 5G is beginning to roll out in parts of Auckland and Wellington.\n\nNew Zealand's low population density relative to its land area means there is a significant gap between urban and rural connectivity. Mountain regions in the South Island and Fiordland have many areas with no coverage at all."
      },
      {
        title: "Recommended eSIM Plans",
        body: "New Zealand eSIM plans range from short urban-stay options to longer plans suited for road trips. A 5GB plan works well for a one-week Auckland and Rotorua trip. Combining your eSIM with free WiFi at cafes and hotels helps conserve data.\n\nFor a South Island road trip by rental car, a 10GB or larger plan is recommended. Google Maps navigation consumes significant data, so having ample capacity is important. Downloading offline maps in advance provides a helpful backup.\n\nAutoWiFi eSIM offers dedicated New Zealand plans. Tethering is supported, making it convenient to share your connection with travel companions or use your phone as a car GPS."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a New Zealand plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure so you can start using data immediately at Auckland Airport. Being connected on the SkyBus into the city center is a significant convenience.\n\nNew Zealand airports offer free WiFi, but speeds can be slow. An eSIM ensures stable connectivity from the moment you arrive."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Auckland has excellent coverage throughout the city. The Sky Tower area, Queen Street, Mission Bay, and Devonport all offer fast data speeds.\n\nWellington provides stable 4G around Te Papa Museum and Cuba Street in the city center. Queenstown has good coverage in the town center and ski resort areas.\n\nRotorua's geothermal areas and the Waitomo Caves tourist zone generally have coverage, but Banks Peninsula outside Christchurch and Mount Cook have limited connectivity. Milford Sound is largely without coverage, and downloading offline maps before your visit is strongly recommended."
      },
      {
        title: "Tips for Using eSIM in New Zealand",
        body: "Road trips by rental car are hugely popular in New Zealand, but connectivity can drop in the South Island's mountain areas. Download Google Maps offline maps before you set out so navigation works even without signal. Combining an eSIM with offline maps is the most reliable approach.\n\nIf you are planning hikes in national parks, trailheads may have coverage but signal often disappears deeper into the bush. Popular trails like the Tongariro Alpine Crossing and Routeburn Track are no exception. Download route information before you start.\n\nFor booking restaurants and activities in New Zealand, Bookme and Tripadvisor are useful apps. With an eSIM, you can check availability and book on the spot. New Zealand weather changes rapidly, so checking MetService (the national weather service) frequently is a smart habit."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work in rural New Zealand?", a: "Coverage is generally available along main highways and at tourist destinations, but mountain regions in the South Island and Fiordland have dead zones. Downloading Google Maps offline maps in advance is strongly recommended." },
      { q: "Can I use the eSIM at Milford Sound?", a: "Most of the Milford Sound area has no mobile coverage. The road from Te Anau to Milford Sound passes through mountains where signal is intermittent. Download any information you need beforehand." },
      { q: "How much data will I need in New Zealand?", a: "For city-based travel, 500MB to 1GB per day is typical. Road trips with navigation use 1-2GB per day. A 10GB plan for a 7-day trip provides a comfortable buffer." },
      { q: "Can I use the same eSIM in New Zealand and Australia?", a: "If you choose an Oceania multi-country plan, you can use the same eSIM in both countries. Single-country plans require separate purchases. Check the plan details for specifics." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel New Zealand with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "New Zealand eSIM Guide",
  },
  ko: {
    title: "뉴질랜드 eSIM 가이드 - 오클랜드, 퀸스타운 커버리지 및 여행 팁",
    subtitle: "대자연의 나라 뉴질랜드를 eSIM으로 편리하게 여행하세요",
    intro: "뉴질랜드는 장엄한 자연경관으로 유명한 인기 여행지입니다. 오클랜드와 웰링턴 등 주요 도시에서는 고품질 4G LTE 통신을 이용할 수 있으며, eSIM을 사용하면 오클랜드 공항 도착 후 바로 Google Maps 내비게이션이나 렌터카 예약이 가능합니다. 다만 밀포드 사운드나 국립공원 등 일부 원격 지역에서는 통신이 제한되므로 사전 준비가 중요합니다.",
    sections: [
      {
        title: "뉴질랜드의 모바일 통신 환경",
        body: "뉴질랜드의 주요 통신사는 Spark, Vodafone NZ, 2degrees 3사입니다. Spark가 가장 넓은 커버리지를 보유하고 있으며, 특히 지방 지역에서 강점이 있습니다. Vodafone NZ는 도시 지역에서 안정적인 고속 통신을 제공하고, 2degrees는 가성비가 뛰어난 통신사입니다.\n\n여행자용 eSIM은 주로 Spark 또는 Vodafone NZ 회선을 사용하며, 오클랜드, 웰링턴, 크라이스트처치 등 주요 도시에서 안정적인 4G LTE 통신이 가능합니다. 5G는 오클랜드와 웰링턴 일부 지역에서 서비스가 시작되었습니다.\n\n뉴질랜드는 국토 면적 대비 인구가 적어 도시와 지방의 통신 환경 차이가 큰 편입니다. 남섬 산악 지대나 피오르드랜드에서는 통신 불가 지역이 많습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "뉴질랜드 eSIM 플랜은 도시 체류용 단기 플랜부터 로드트립용 장기 플랜까지 다양합니다. 1주일 오클랜드·로토루아 여행이라면 5GB 플랜이 적당합니다. 카페나 호텔의 무료 WiFi와 병용하면 데이터를 절약할 수 있습니다.\n\n남섬 렌터카 여행을 계획한다면 10GB 이상의 플랜을 추천합니다. Google Maps 내비게이션은 데이터 소비가 크므로 충분한 용량이 필요합니다. 오프라인 지도를 미리 다운로드해 두면 더욱 안심입니다.\n\nAutoWiFi eSIM에서는 뉴질랜드 전용 플랜을 제공합니다. 테더링도 지원되어 동행자와의 공유나 카 내비 대용으로도 편리합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 뉴질랜드 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 오클랜드 공항 도착 후 바로 통신을 시작할 수 있습니다. 공항에서 시내로 가는 SkyBus 안에서부터 인터넷을 사용할 수 있습니다.\n\n뉴질랜드 공항에서는 무료 WiFi가 제공되지만 속도가 느릴 수 있습니다. eSIM이 있으면 안정적인 통신이 가능합니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "오클랜드 시내는 통신 환경이 매우 양호합니다. 스카이타워 주변, 퀸스트리트, 미션베이, 데번포트 등 모든 주요 지역에서 고속 통신이 가능합니다.\n\n웰링턴은 테파파 박물관 주변과 쿠바 스트리트 등 시내 중심부에서 안정적인 4G 접속이 가능합니다. 퀸스타운은 시내 중심부와 스키 리조트 지역에서 양호한 통신 환경이 갖춰져 있습니다.\n\n로토루아 온천 지대와 와이토모 동굴 관광 지역에서는 대체로 통신이 가능하지만, 크라이스트처치 외곽의 뱅크스 반도나 마운트쿡에서는 커버리지가 제한적입니다. 밀포드 사운드는 대부분 통신 불가 지역이므로 오프라인 지도를 미리 다운로드해 두는 것을 강력히 권장합니다."
      },
      {
        title: "뉴질랜드 여행에서의 eSIM 활용 팁",
        body: "뉴질랜드에서는 렌터카 로드트립이 인기지만, 남섬 산악 지역에서는 통신이 끊길 수 있습니다. Google Maps 오프라인 지도를 미리 다운로드해 두면 전파가 없어도 내비게이션을 이용할 수 있습니다. eSIM과 오프라인 지도의 병용이 가장 안심되는 방법입니다.\n\n국립공원에서의 하이킹이나 트레킹을 계획하고 있다면, 트레일 입구 부근에서는 통신이 가능하지만 안쪽으로 들어가면 전파가 끊기는 경우가 많습니다. 통가리로 알파인 크로싱이나 루트번 트랙 등 인기 트레일도 마찬가지입니다. 출발 전 루트 정보를 다운로드해 두세요.\n\n뉴질랜드 레스토랑이나 액티비티 예약에는 Bookme와 Tripadvisor가 편리합니다. eSIM이 있으면 여행 중 빈자리를 확인하고 바로 예약할 수 있습니다. 뉴질랜드 날씨는 변하기 쉬우므로 MetService(NZ 기상 서비스)를 자주 확인하는 것을 추천합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "뉴질랜드 지방에서도 eSIM을 사용할 수 있나요?", a: "주요 국도변이나 관광지에서는 대체로 통신이 가능하지만, 남섬 산악 지대나 피오르드랜드에서는 전파가 닿지 않는 지역이 있습니다. Google Maps 오프라인 지도를 미리 다운로드해 두는 것을 권장합니다." },
      { q: "밀포드 사운드에서 eSIM을 사용할 수 있나요?", a: "밀포드 사운드 대부분은 통신 불가 지역입니다. 테아나우에서 밀포드 사운드로 가는 길도 산간 지역을 지나기 때문에 통신이 끊깁니다. 필요한 정보는 미리 다운로드해 주세요." },
      { q: "뉴질랜드에서 데이터 사용량은 어느 정도인가요?", a: "도시 중심 여행이면 하루 500MB~1GB, 렌터카 로드트립 시 내비 사용으로 하루 1~2GB 정도입니다. 7일간 여행이라면 10GB 플랜이 안심입니다." },
      { q: "뉴질랜드와 호주에서 같은 eSIM을 사용할 수 있나요?", a: "오세아니아 통합 플랜을 선택하면 양국에서 같은 eSIM을 이용할 수 있습니다. 각국 전용 플랜은 별도로 구매해야 합니다. 플랜 상세를 확인하세요." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 뉴질랜드 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "뉴질랜드 eSIM 가이드",
  },
  zh: {
    title: "新西兰eSIM指南 - 奥克兰、皇后镇覆盖与旅行提示",
    subtitle: "用eSIM畅游新西兰的城市与壮丽自然风光",
    intro: "新西兰是以壮丽自然景观闻名的热门旅行目的地。奥克兰和惠灵顿等主要城市提供高质量的4G LTE覆盖，使用eSIM可以在奥克兰机场落地后立即使用Google Maps导航和预订租车。不过，米尔福德峡湾和国家公园等偏远地区信号有限，提前做好准备非常重要。",
    sections: [
      {
        title: "新西兰移动通信概况",
        body: "新西兰三大运营商为Spark、Vodafone NZ和2degrees。Spark拥有最广的覆盖范围，在农村地区尤其出色。Vodafone NZ在城市地区提供稳定的高速连接，2degrees则以高性价比著称。\n\n旅行者eSIM套餐通常使用Spark或Vodafone NZ网络，在奥克兰、惠灵顿、基督城等主要城市提供可靠的4G LTE连接。5G已在奥克兰和惠灵顿部分区域开始部署。\n\n新西兰国土面积大但人口密度低，城乡通信环境差距较大。南岛山区和峡湾地区有很多完全没有信号的区域。"
      },
      {
        title: "推荐eSIM套餐",
        body: "新西兰eSIM套餐从城市短期方案到公路旅行长期套餐应有尽有。一周奥克兰和罗托鲁瓦行程选择5GB套餐即可。配合咖啡馆和酒店的免费WiFi使用可以节省流量。\n\n如果计划在南岛租车自驾，建议选择10GB以上的套餐。Google Maps导航消耗大量数据，需要充足的流量。提前下载离线地图作为备用更加稳妥。\n\nAutoWiFi eSIM提供新西兰专属套餐。支持热点共享，方便与同行者分享网络或用手机当车载导航。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买新西兰套餐后，QR码会发送到您的邮箱。iPhone用户前往「设置→蜂窝网络→添加eSIM」，Android用户前往「设置→网络和互联网→SIM卡→添加eSIM」扫描QR码。\n\n出发前安装eSIM，到达奥克兰机场后即可立即连网。在乘坐SkyBus前往市中心的途中就能使用网络，非常方便。\n\n新西兰机场提供免费WiFi，但速度可能较慢。eSIM确保您从到达那一刻起就有稳定的网络。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "奥克兰全市通信环境优秀。天空塔周边、皇后街、教会湾、德文波特等所有主要区域都有高速网络。\n\n惠灵顿在蒂帕帕博物馆周边和古巴街等市中心区域有稳定的4G连接。皇后镇在市中心和滑雪度假村区域通信环境良好。\n\n罗托鲁瓦地热区和怀托莫萤火虫洞旅游区基本有信号覆盖，但基督城郊外的班克斯半岛和库克山覆盖有限。米尔福德峡湾大部分区域没有信号，强烈建议提前下载离线地图。"
      },
      {
        title: "新西兰旅行eSIM使用技巧",
        body: "在新西兰租车自驾游非常受欢迎，但南岛山区可能会断网。提前下载Google Maps离线地图，即使在没有信号的地方也能使用导航。eSIM配合离线地图是最可靠的方案。\n\n如果计划在国家公园徒步，步道入口附近通常有信号，但深入后往往会失去连接。汤加里罗高山穿越和路特本步道等热门步道也是如此。出发前请下载好路线信息。\n\n预订新西兰的餐厅和活动，Bookme和Tripadvisor非常实用。有了eSIM，您可以随时查看空位并即时预订。新西兰天气变化无常，建议经常查看MetService（新西兰气象服务）了解最新天气状况。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "新西兰偏远地区能用eSIM吗？", a: "主要公路沿线和旅游景点基本有信号，但南岛山区和峡湾地区存在信号盲区。强烈建议提前下载Google Maps离线地图。" },
      { q: "米尔福德峡湾能用eSIM吗？", a: "米尔福德峡湾大部分区域没有移动信号。从蒂阿瑙到米尔福德峡湾的公路穿越山区，信号时断时续。请提前下载所需信息。" },
      { q: "在新西兰大概需要多少流量？", a: "城市游览每天约500MB-1GB，租车自驾使用导航每天约1-2GB。7天行程选择10GB套餐比较稳妥。" },
      { q: "新西兰和澳大利亚能用同一张eSIM吗？", a: "选择大洋洲通用套餐即可在两国使用同一张eSIM。各国专属套餐需要分别购买，请查看套餐详情。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游新西兰。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "新西兰eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/new-zealand-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const rel = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="new-zealand-esim" content={CONTENT[loc]} relatedArticles={rel.articles} relatedTitle={rel.title} />;
}
