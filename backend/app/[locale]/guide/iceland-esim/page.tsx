import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "アイスランド旅行eSIMガイド - オーロラとリングロードで安心通信",
    subtitle: "レイキャビクから大自然の絶景スポットまでeSIMで接続",
    intro: "アイスランドはオーロラ観賞、間欠泉、氷河、壮大な溶岩台地など他では体験できない絶景が集まる国です。スカンジナビアの中でも通信インフラが整備されており、主要観光ルート沿いではeSIMで安定した接続が利用できます。",
    sections: [
      { title: "アイスランドのモバイル通信事情", body: "アイスランドの主要通信キャリアはSiminn、Vodafone Iceland（Nova）、TAL（Ice）の3社です。レイキャビクなどの都市部では5G/4G通信が利用でき、リングロード（国道1号線）沿いもほぼカバーされています。\n\n内陸のハイランド地帯（ランドマンナラウガル、クヴェルフィヨル等）や山岳地帯では電波が届かない場合があります。また、アイスランド北部や東部の辺境エリアでもカバレッジが限定的です。冬季はオーロラ観賞のため農村部に出かけることが多いですが、リングロード近辺は概ね接続可能です。\n\nアイスランドはEEA加盟国で、EU規制の影響を受けますが、日本からの旅行者には旅行用eSIMが最も経済的です。" },
      { title: "おすすめのeSIMプラン", body: "アイスランドはヨーロッパ最高峰クラスの物価を誇る国です。ローミングは非常に割高になるため、事前にeSIMを準備することを強くおすすめします。1週間のリングロード旅行なら5〜10GBが適切です。ナビゲーション、オーロラ予報、天気予報、SNS投稿で思ったよりデータ消費が増えます。\n\nAutoWiFi eSIMではアイスランド向けプランを提供しており、到着後すぐに使い始められます。レンタカーでのリングロード周遊では、カバレッジが途切れる可能性があるため、重要な情報は事前にオフラインでダウンロードしておくことが重要です。\n\nアイスランドを含むヨーロッパ全域プランも選択肢として検討できます。ノルウェーやデンマーク経由の旅程にも対応できます。" },
      { title: "eSIMの設定方法", body: "AutoWiFi eSIMでアイスランドプランを購入後、QRコードがメールで届きます。iPhoneは設定からモバイル通信、eSIMを追加の順にQRコードをスキャンします。Androidは設定からネットワークとインターネット、SIM、eSIMを追加の順に設定できます。\n\n日本出発前にeSIMをインストールしておくことを強くおすすめします。ケフラビーク国際空港（レイキャビク近郊）到着後、機内モードを解除するだけで通信が開始されます。\n\nアイスランドの時差は日本より9時間遅れです（夏時間なし）。空港からレイキャビクへの移動や、レンタカー予約の確認にもeSIMがあれば便利です。" },
      { title: "主要エリアでのカバレッジ", body: "レイキャビクは首都として5G/4G通信が安定しています。ハルグリムスキルキャ教会周辺、ハルパコンサートホール、旧港エリアでも問題なく通信できます。\n\nゴールデンサークル（ゲイシール間欠泉、グトルフォスの滝、シンクヴェトリル国立公園）は首都近郊の人気観光地で4G通信が利用可能です。南海岸（スコゥガフォス、セリャラントスフォス、ヴィーク黒砂海岸）もカバーされています。\n\nリングロード東部のヴァトナヨークトル氷河近辺や東フィヨルド地域では、主要道路沿いは繋がりますが、一部辺境エリアは圏外です。スナイフェルスネス半島も主要観光ポイントでは接続可能です。" },
      { title: "アイスランド旅行でのeSIM活用のコツ", body: "アイスランドの天気は非常に変わりやすく、地域によって大きく異なります。Vedur（アイスランド気象局）のアプリはリアルタイムの天候情報と危険気象警報を提供しており、安全なドライブ旅行に必須です。\n\nオーロラ観賞にはAurora Forecast、Space Weather Liveなどのアプリが有用です。eSIMがあれば晴天度やKpインデックスをリアルタイムで確認でき、最適なタイミングと場所を見極められます。\n\nアイスランドの道路状況はVegagerdin（アイスランド道路庁）のアプリとウェブサイトで確認できます。冬季は積雪や強風で道路が閉鎖されることがあり、F道路（山岳道路）への進入には特に注意が必要です。eSIMがあれば最新の道路情報を常に確認できます。" }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "アイスランドのリングロード全周でeSIMは使えますか？", a: "リングロード（国道1号線）のほぼ全区間でカバレッジがありますが、一部の辺境エリアや峡谷では電波が途切れる場合があります。特に内陸ハイランドは圏外です。主要観光スポットはほぼカバーされています。" },
      { q: "内陸ハイランド（ランドマンナラウガル等）でもeSIMは使えますか？", a: "内陸ハイランドのF道路エリアは大部分が圏外です。ランドマンナラウガル、クヴェルフィヨルなどへ行く場合は事前にオフラインマップを必ずダウンロードしてください。緊急時はGPS衛星電話の利用を検討してください。" },
      { q: "アイスランドでのデータ使用量の目安は？", a: "ナビゲーション、天気予報、オーロラ予報、SNS等で1日500MB〜1.5GB程度です。リングロード旅行で1週間なら5〜10GBが適切です。動画のバックアップや共有が多い場合はさらに多く消費します。" },
      { q: "冬のオーロラシーズンでもeSIMは使えますか？", a: "はい、レイキャビク周辺および主要観光ルート沿いでは冬季も4G通信が利用可能です。オーロラ観賞のために郊外に出かける際も、リングロード近辺であれば通信可能なエリアが多いです。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでアイスランド旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "アイスランドeSIMガイド",
  },
  en: {
    title: "Iceland eSIM Guide - Ring Road, Auroras & Coverage",
    subtitle: "Stay connected from Reykjavik to the remote highlands with an Iceland eSIM",
    intro: "Iceland offers an extraordinary concentration of natural wonders: the northern lights, geysers, glaciers, volcanoes, and dramatic lava fields. Mobile coverage is solid along the famous Ring Road, and an eSIM keeps you connected for navigation, weather alerts, and aurora forecasts throughout your Icelandic adventure.",
    sections: [
      { title: "Iceland's Mobile Network Overview", body: "Iceland's main carriers are Siminn, Vodafone Iceland (Nova), and TAL (Ice). Reykjavik and the Southwest Peninsula have reliable 5G and 4G coverage. The Ring Road (Route 1) is mostly covered along its entire length around the island.\n\nInland highland areas including Landmannalaugar and Kerlingarfjoll are largely out of range. Remote fjords in the East and Westfjords regions may also have limited coverage. Winter driving requires extra preparedness as snowstorms can make navigation challenging in remote stretches.\n\nIceland is an EEA member, but travelers from Japan still need a travel eSIM for affordable data access." },
      { title: "Recommended eSIM Plans", body: "Iceland is one of the world's most expensive travel destinations. International roaming costs can be prohibitive, making a pre-purchased eSIM an important part of budget planning. For a Ring Road road trip of 7-10 days, a 5-10GB plan is recommended since navigation, weather apps, aurora forecasts, and photo sharing consume more data than expected.\n\nAutoWiFi eSIM offers Iceland-specific plans that activate immediately on landing. For highland F-road adventures, download all offline content before leaving the main Ring Road, as signal disappears in the interior.\n\nEurope-wide plans that include Iceland are also available, useful if routing through Norway or Denmark." },
      { title: "How to Set Up Your eSIM", body: "After purchasing an Iceland plan from AutoWiFi eSIM, a QR code will be sent to your email. On iPhone, go to Settings > Cellular > Add eSIM. On Android, go to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before leaving Japan. When you arrive at Keflavik International Airport, disabling airplane mode starts your connection immediately.\n\nIceland uses UTC year-round (no daylight saving time), making it 9 hours behind Japan in winter. Having data ready at landing helps you confirm your rental car reservation or arrange transport to Reykjavik." },
      { title: "Coverage in Key Areas", body: "Reykjavik has excellent 5G and 4G coverage across the city, including at Hallgrimskirkja church, Harpa Concert Hall, and the old harbour. The Blue Lagoon geothermal spa, located between the airport and Reykjavik, also has good coverage.\n\nThe Golden Circle (Geysir, Gullfoss, Thingvellir National Park) is well covered as it is close to the capital. The South Coast (Skogafoss, Seljalandsfoss, Vik black sand beach) is also reliably connected.\n\nAkureyri in North Iceland has solid urban coverage. The Snaefellsnes Peninsula's main viewpoints are connected. The East Fjords and Westfjords have coverage in main towns but gaps between settlements." },
      { title: "Tips for Using eSIM in Iceland", body: "The Vedur (Icelandic Met Office) app is essential for safe driving in Iceland. It provides real-time weather forecasts, storm warnings, and road condition alerts. Icelandic weather can change dramatically within minutes, especially in mountain passes.\n\nThe Vegagerdin Road Administration website and app is critical for checking F-road openings in summer and road closures due to winter storms. Never enter an F-road (highland road) without checking conditions first, and having eSIM data keeps you updated at all times.\n\nFor aurora hunting, Aurora Forecast and Space Weather Live apps show Kp-index values and cloud cover forecasts. eSIM connectivity lets you monitor conditions in real time and optimize your viewing location." }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work along the entire Ring Road?", a: "The Ring Road has coverage for most of its length, but some remote stretches in the East Fjords and Westfjords connection points may have gaps. Highland F-roads are largely out of range. Major tourist attractions are generally covered." },
      { q: "Is there coverage in the highlands like Landmannalaugar?", a: "Highland F-road areas including Landmannalaugar are mostly outside mobile coverage. Always download offline maps before entering highland terrain. For true remote expeditions, consider a satellite GPS communicator for emergencies." },
      { q: "How much data do I need for Iceland?", a: "Navigation, weather apps, aurora forecasts, and social media use 500MB to 1.5GB per day. A 5-10GB plan suits most 7-10 day Ring Road trips, especially if you are uploading photos." },
      { q: "Does eSIM work during winter aurora season?", a: "Yes, the Reykjavik area and Ring Road are well covered in winter. Even when venturing out for aurora viewing, most locations near the Ring Road have 4G connectivity." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Explore Iceland with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Iceland eSIM Guide",
  },
  ko: {
    title: "아이슬란드 eSIM 가이드 - 링로드와 오로라를 위한 완벽 연결",
    subtitle: "레이캬비크부터 대자연 절경까지 eSIM으로 안전하게 탐험하세요",
    intro: "아이슬란드는 오로라, 간헐천, 빙하, 화산, 용암 대지 등 세계 어디에서도 볼 수 없는 자연 경관이 집중된 나라입니다. 링로드 주요 구간에서 안정적인 모바일 커버리지가 제공되어 eSIM 하나로 내비게이션, 날씨 경보, 오로라 예보를 이용할 수 있습니다.",
    sections: [
      { title: "아이슬란드 모바일 통신 환경", body: "아이슬란드 주요 통신사는 Siminn, Vodafone Iceland(Nova), TAL(Ice) 세 곳입니다. 레이캬비크와 남서부 반도는 안정적인 5G/4G 커버리지를 제공합니다. 링로드(1번 국도)는 섬 전체를 일주하는 노선에서 대부분의 구간이 커버됩니다.\n\n란드만날라우가르, 케를링가르피외들 등 내륙 고지대는 대부분 통신이 안 됩니다. 동부 피오르드와 서부 피오르드 지역의 오지에서도 커버리지가 제한적입니다. 겨울 운전은 폭설이 원격 지역 내비게이션을 어렵게 만들 수 있어 특별한 준비가 필요합니다.\n\n아이슬란드는 EEA 회원국이지만 일본 등 비EU권 여행자에게는 여행자용 eSIM이 가장 경제적입니다." },
      { title: "추천 eSIM 플랜", body: "아이슬란드는 세계에서 가장 물가가 비싼 여행지 중 하나입니다. 국제 로밍 비용이 매우 높을 수 있어 사전에 eSIM을 준비하는 것이 중요합니다. 7~10일 링로드 여행이라면 5~10GB 플랜을 추천합니다. 내비게이션, 날씨 앱, 오로라 예보, 사진 공유로 예상보다 데이터를 더 많이 소모합니다.\n\nAutoWiFi eSIM은 도착 즉시 활성화되는 아이슬란드 전용 플랜을 제공합니다. 고지대 F도로 탐험 시에는 주요 링로드를 벗어나기 전에 모든 오프라인 콘텐츠를 다운로드해 두세요.\n\n아이슬란드를 포함한 유럽 전역 플랜도 있어 노르웨이나 덴마크를 경유하는 일정에도 편리합니다." },
      { title: "eSIM 설정 방법", body: "AutoWiFi eSIM에서 아이슬란드 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 설정에서 셀룰러, eSIM 추가를 선택해 스캔합니다. Android는 설정에서 네트워크 및 인터넷, SIM, eSIM 추가를 선택합니다.\n\n출발 전 일본에서 미리 eSIM을 설치해 두세요. 케플라비크 국제공항에 도착해 비행기 모드를 해제하면 즉시 연결됩니다.\n\n아이슬란드는 연중 UTC 시간대(서머타임 없음)를 사용하여 겨울에는 일본보다 9시간 느립니다. 도착 즉시 렌터카 예약을 확인하거나 레이캬비크로 이동하는 교통편을 검색할 수 있습니다." },
      { title: "주요 지역 커버리지", body: "레이캬비크는 도시 전역에서 탁월한 5G/4G 커버리지를 제공합니다. 할그림스키르캬 교회, 하르파 콘서트홀, 구항구 모두 잘 연결됩니다. 공항과 레이캬비크 사이에 위치한 블루 라군도 커버리지가 좋습니다.\n\n수도 인근에 위치한 골든 서클(게이시르, 굴포스, 싱크벨리르 국립공원)은 커버리지가 잘 되어 있습니다. 남해안(스코가포스, 셀리야란스포스, 비크 검은 모래 해변)도 안정적으로 연결됩니다.\n\n북아이슬란드 아퀴레이리는 안정적인 시내 커버리지를 제공합니다. 스나이펠스네스 반도 주요 전망대는 연결됩니다. 동부 피오르드와 서부 피오르드는 주요 마을에서는 연결되지만 정착지 사이에 공백이 있습니다." },
      { title: "아이슬란드 여행에서의 eSIM 활용 팁", body: "아이슬란드 기상청 Vedur 앱은 안전한 드라이브에 필수입니다. 실시간 날씨 예보, 폭풍 경보, 도로 상황 알림을 제공합니다. 아이슬란드 날씨는 특히 산간 지역에서 몇 분 안에 급격하게 변할 수 있습니다.\n\n도로청 Vegagerdin 웹사이트와 앱은 여름철 F도로 개방 여부와 겨울 폭설로 인한 도로 폐쇄를 확인하는 데 필수입니다. F도로(고지대 도로)에 진입하기 전에 반드시 상태를 확인하고, eSIM이 있으면 언제든지 최신 정보를 확인할 수 있습니다.\n\n오로라 사냥에는 Aurora Forecast, Space Weather Live 앱이 Kp 지수와 구름 덮임 예보를 알려줍니다. eSIM 연결이 있으면 실시간으로 상황을 모니터링하고 최적의 관측 위치를 찾을 수 있습니다." }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "링로드 전체에서 eSIM이 작동하나요?", a: "링로드는 대부분의 구간에서 커버리지가 있지만 동부 피오르드와 서부 피오르드 연결 지점의 일부 오지 구간에는 공백이 있을 수 있습니다. 내륙 고지대 F도로는 대부분 통신이 안 됩니다. 주요 관광 명소는 대체로 커버됩니다." },
      { q: "란드만날라우가르 등 고지대에서 커버리지가 있나요?", a: "란드만날라우가르를 포함한 F도로 고지대는 대부분 모바일 커버리지 범위 밖입니다. 고지대 지형에 들어가기 전에 반드시 오프라인 지도를 다운로드하세요. 진정한 오지 탐험에는 위성 GPS 통신기를 고려해 보세요." },
      { q: "아이슬란드에서 필요한 데이터 용량은?", a: "내비게이션, 날씨 앱, 오로라 예보, SNS로 하루 500MB~1.5GB를 사용합니다. 7~10일 링로드 여행에는 5~10GB 플랜이 적합하며, 사진 업로드가 많다면 더 필요합니다." },
      { q: "겨울 오로라 시즌에도 eSIM이 잘 작동하나요?", a: "네, 레이캬비크 지역과 링로드는 겨울에도 커버리지가 잘 되어 있습니다. 오로라 관측을 위해 교외로 나가더라도 링로드 근처 대부분의 장소에서 4G 연결이 가능합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 아이슬란드를 탐험하세요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "아이슬란드 eSIM 가이드",
  },
  zh: {
    title: "冰岛eSIM指南 - 环形公路、极光与网络覆盖全攻略",
    subtitle: "从雷克雅未克到荒野高地，eSIM让您全程安全畅连",
    intro: "冰岛汇集了极光、间歇泉、冰川、火山与壮观熔岩地貌等令人叹为观止的自然奇观。环形公路主要路段提供稳定的移动覆盖，eSIM让您在整个冰岛旅程中畅享导航、天气警报和极光预报服务。",
    sections: [
      { title: "冰岛移动通信概况", body: "冰岛三大主要运营商为Siminn、Vodafone Iceland（Nova）和TAL（Ice）。雷克雅未克和西南半岛拥有可靠的5G/4G覆盖。环形公路（1号公路）沿整个岛屿延伸，大部分路段有信号覆盖。\n\n包括兰德曼纳劳加、凯尔灵加尔菲约德尔在内的内陆高地区域大多在覆盖范围之外。东部峡湾和西峡湾地区偏远地带覆盖同样有限。冬季驾驶时暴风雪可能使偏远地段的导航变得困难，需做好充分准备。\n\n冰岛是EEA成员国，但来自日本的旅行者仍需旅行eSIM才能享受实惠的数据费率。" },
      { title: "推荐eSIM套餐", body: "冰岛是全球消费水平最高的旅游目的地之一，国际漫游费用可能极高，提前购买eSIM是预算规划的重要一环。7-10天的环形公路自驾游建议选择5-10GB套餐，因为导航、天气应用、极光预报和照片分享会消耗比预期更多的流量。\n\nAutoWiFi eSIM提供抵达即激活的冰岛专属套餐。前往高地F公路探险时，离开主要环形公路前请提前下载所有离线内容，因为内陆信号会消失。\n\n包含冰岛的欧洲全区套餐也可供选择，适合经挪威或丹麦转机的行程。" },
      { title: "eSIM设置方法", body: "在AutoWiFi eSIM购买冰岛套餐后，QR码将发送至邮箱。iPhone用户前往设置、蜂窝网络、添加eSIM扫描QR码；Android用户前往设置、网络和互联网、SIM卡、添加eSIM完成设置。\n\n建议出发前在日本提前安装eSIM。抵达凯夫拉维克国际机场后关闭飞行模式即可立即连网。\n\n冰岛全年使用UTC时区（无夏令时），冬季比日本慢9小时。抵达后即刻可确认租车预订或安排前往雷克雅未克的交通。" },
      { title: "主要地区覆盖情况", body: "雷克雅未克全市拥有出色的5G/4G覆盖。哈尔格里姆教堂、哈帕音乐厅和旧港区均连接良好。位于机场和雷克雅未克之间的蓝湖地热温泉也有良好覆盖。\n\n距首都较近的黄金圈（间歇泉、黄金瀑布、辛格维利尔国家公园）覆盖良好。南海岸（斯科加瀑布、塞里雅兰瀑布、维克黑沙滩）同样可靠连接。\n\n北冰岛阿克雷里市区覆盖稳定。斯奈山半岛主要观景点可连接。东部峡湾和西峡湾在主要城镇有信号，但定居点之间存在空白。" },
      { title: "冰岛旅行eSIM使用技巧", body: "冰岛气象局Vedur应用对安全驾驶至关重要，提供实时天气预报、风暴警报和路况提醒。冰岛天气变化迅速，尤其在山口地段，几分钟内可能发生剧烈变化。\n\n道路局Vegagerdin网站和应用对于确认夏季F公路开放状态和冬季暴风雪道路封闭情况必不可少。进入F公路（高地道路）前务必查看路况，有了eSIM可随时获取最新信息。\n\n极光追踪推荐Aurora Forecast、Space Weather Live等应用，可显示Kp指数和云量预报。eSIM连接让您实时监测条件，找到最佳观测位置。" }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在整条环形公路上都能用吗？", a: "环形公路大部分路段有信号覆盖，但东部峡湾和西峡湾连接点的部分偏远地段可能有空白。内陆高地F公路大多没有信号。主要旅游景点一般都有覆盖。" },
      { q: "兰德曼纳劳加等高地有信号吗？", a: "包括兰德曼纳劳加在内的F公路高地大多超出移动覆盖范围。进入高地地形前务必下载离线地图。真正的偏远探险建议考虑携带卫星GPS通信设备以应对紧急情况。" },
      { q: "在冰岛需要多少流量？", a: "导航、天气应用、极光预报和社交媒体每天约消耗500MB至1.5GB。7-10天的环形公路行程建议5-10GB套餐，照片上传较多时需要更多流量。" },
      { q: "冬季极光季节eSIM能正常使用吗？", a: "是的，雷克雅未克地区和环形公路冬季覆盖良好。即使外出观赏极光，环形公路附近大多数地点都有4G连接。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM探索冰岛。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "冰岛eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/iceland-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="iceland-esim" content={CONTENT[loc]} />;
}
