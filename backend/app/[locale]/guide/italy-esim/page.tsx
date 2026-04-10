import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "イタリアeSIMガイド - ローマ・ベネチア・フィレンツェの通信事情",
    subtitle: "歴史と芸術の国イタリアをeSIMで快適に旅しよう",
    intro: "イタリアは世界遺産の数が世界最多の国であり、ローマ、フィレンツェ、ベネチアなど見どころが満載です。主要都市では4G LTEが安定しており、eSIMを利用すれば美術館のオンラインチケット購入や地図アプリでの街歩きがスムーズに行えます。EU圏内ローミング対応プランなら、近隣国への移動も安心です。本記事では歴史と芸術の国イタリアをeSIMで快適に旅しよう・イタリアのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "イタリアのモバイル通信事情",
        body: "イタリアの主要通信キャリアはTIM（Telecom Italia）、Vodafone Italia、WindTre、Illiadの4社です。TIMが最大のカバレッジを持ち、5Gネットワークの展開でもリードしています。旅行者向けeSIMプランはTIMまたはVodafoneの回線を利用するものが一般的です。\n\nローマやミラノなどの大都市では5G通信が利用可能で、4G LTEでも下り50〜100Mbpsの速度が出ます。イタリアの通信速度はヨーロッパの中では中程度ですが、観光利用には十分な速度です。\n\nイタリアは南北で通信環境に差があり、北イタリアの方がカバレッジが充実しています。南イタリアやシチリア島の一部地域ではカバレッジが限られることがあります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "イタリア向けeSIMプランは、3日間1GBの短期プランから30日間無制限プランまで多彩です。ローマ・フィレンツェ・ベネチアを巡る定番の1週間ツアーなら、5〜10GBプランがおすすめです。美術館の予約やレストラン検索、地図アプリの利用を考えると、余裕のあるプランが安心です。\n\nEU対応プランを選べば、イタリアからスイスやフランスへの日帰り旅行、クロアチアへの周遊にも同じeSIMが使えます。イタリアはヨーロッパ周遊の拠点としても人気なので、EU対応プランがおすすめです。\n\nAutoWiFi eSIMのイタリアプランはテザリングにも対応しており、レンタカーでのナビゲーションやカフェでのノートパソコン作業にも便利です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでイタリアプランを購入後、QRコードがメールで届きます。iPhoneは\"設定→モバイル通信\"→\"eSIMを追加、Androidは設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"からQRコードをスキャンします。\n\n出発前にeSIMをインストールしておけば、フィウミチーノ空港（ローマ）やマルペンサ空港（ミラノ）に到着後すぐに通信を開始できます。空港からホテルへの移動手段の検索もスムーズに行えます。\n\neSIMのインストールにはWiFi接続が必要です。イタリアの空港ではフリーWiFiが提供されていますが、速度が遅い場合があるため、出発前の設定をおすすめします。"
      },
      {
        title: "主要都市でのカバレッジ",
        body: "ローマではコロッセオ、バチカン市国、トレビの泉、スペイン広場など全ての主要観光スポットで安定した4G通信が利用可能です。ローマの地下鉄（メトロ）の駅構内でもモバイル通信が利用でき、移動中の乗り換え検索も問題ありません。\n\nフィレンツェではウフィツィ美術館周辺、ドゥオーモ、ポンテ・ヴェッキオなどの中心部で良好な通信が確認されています。ベネチアでもサンマルコ広場、リアルト橋、カンナレージョ地区で安定した接続が可能です。ベネチアは水上の街ですが、通信環境は良好です。\n\nミラノ、ナポリ、トリノなどの主要都市でも高品質な通信が利用可能です。アマルフィ海岸やチンクエテッレなどの海岸沿いの観光地でも主要ポイントでは通信が確保されています。"
      },
      {
        title: "イタリア旅行でのeSIM活用のコツ",
        body: "イタリアの人気美術館（ウフィツィ美術館、コロッセオ、バチカン美術館など）は事前のオンライン予約が必須です。eSIMがあれば、旅行中にスケジュールが変わっても、その場でチケットを予約・変更できます。当日券が売り切れの場合も多いため、オンライン予約は必須です。\n\nイタリアの鉄道（Trenitalia、Italo）はモバイルアプリでのチケット購入が便利です。eSIMがあれば、駅の窓口に並ぶことなく、スマートフォンからリアルタイムで列車の検索・予約・QRチケットの表示が可能です。\n\nイタリアのレストランでは、Googleマップの口コミやTripAdvisorのレビューが参考になります。地元の人気店や隠れた名店を見つけるのに、常時データ接続があると非常に便利です。また、イタリア語が分からなくても、Google翻訳のカメラ機能でメニューを瞬時に翻訳できます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ベネチアの水上バス（ヴァポレット）でeSIMは使えますか？", a: "はい、ベネチアの水上バスのルート沿いでは4G通信が利用可能です。大運河沿いやサンマルコ広場周辺では安定した接続が維持されます。" },
      { q: "イタリアのeSIMでEU他国でも使えますか？", a: "EUローミング対応プランであれば、フランス、ドイツ、スペインなどEU加盟国で追加料金なしで利用できます。スイスは別扱いの場合があります。" },
      { q: "アマルフィ海岸でもeSIMは使えますか？", a: "アマルフィ、ポジターノ、ラヴェッロなどの主要な町では4G通信が利用可能です。ただし、海岸沿いの狭い道路や一部のトンネルでは一時的に接続が不安定になることがあります。" },
      { q: "イタリアでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。美術館の予約や鉄道チケットの購入を含めると、7日間5〜10GBプランがおすすめです。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでイタリア旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "イタリアeSIMガイド",
  },
  en: {
    title: "Italy eSIM Guide - Rome, Venice & Florence Coverage",
    subtitle: "Explore Italy's art and history with reliable eSIM connectivity",
    intro: "Italy holds more UNESCO World Heritage Sites than any other country, with iconic destinations like Rome, Florence, and Venice. Major cities offer stable 4G LTE coverage, and an eSIM makes booking museum tickets, navigating cobblestone streets, and finding great restaurants effortless. EU roaming plans let you cross borders with confidence.",
    sections: [
      {
        title: "Italy's Mobile Network Overview",
        body: "Italy's four major carriers are TIM (Telecom Italia), Vodafone Italia, WindTre, and Iliad. TIM has the largest coverage footprint and leads in 5G deployment. Travel eSIM plans typically operate on TIM or Vodafone networks.\n\nRome and Milan offer 5G connectivity, while 4G LTE delivers speeds of 50-100 Mbps in most cities. Italy's mobile speeds are moderate by European standards but more than adequate for tourist use.\n\nThere is a noticeable north-south divide in coverage quality. Northern Italy generally has better infrastructure, while some rural areas in southern Italy and parts of Sicily may have limited coverage."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Italy eSIM plans range from 3-day 1GB options to 30-day unlimited packages. For the classic one-week Rome-Florence-Venice itinerary, a 5-10GB plan is recommended. Museum reservations, restaurant searches, and map navigation all add up in data usage.\n\nEU-capable plans let you use the same eSIM for day trips to Switzerland, France, or Croatia. Italy is a popular base for European tours, making EU plans an excellent choice.\n\nAutoWiFi eSIM Italy plans support tethering, useful for car navigation on road trips through Tuscany or for laptop work at Italian cafes."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing an Italy plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to connect immediately at Fiumicino Airport (Rome) or Malpensa Airport (Milan). You can search for transportation to your hotel right away.\n\neSIM installation requires WiFi. Italian airports offer free WiFi, though speeds can be slow. Pre-departure setup is recommended for the smoothest experience."
      },
      {
        title: "Coverage in Major Cities",
        body: "Rome has stable 4G coverage at all major landmarks including the Colosseum, Vatican City, Trevi Fountain, and Spanish Steps. Rome's Metro stations support mobile data for seamless transit navigation.\n\nFlorence offers good coverage around the Uffizi Gallery, Duomo, and Ponte Vecchio. Venice provides stable connectivity at St. Mark's Square, Rialto Bridge, and Cannaregio. Despite being a city on water, Venice's mobile coverage is reliable.\n\nMilan, Naples, and Turin also have high-quality coverage. Coastal destinations like the Amalfi Coast and Cinque Terre have connectivity at major viewpoints and towns."
      },
      {
        title: "Tips for Using eSIM in Italy",
        body: "Major Italian museums and sites (Uffizi, Colosseum, Vatican Museums) require advance online booking. An eSIM lets you purchase and modify tickets on the go if your schedule changes. Same-day tickets often sell out, making online booking essential.\n\nItaly's railways (Trenitalia and Italo) are best booked through their mobile apps. With an eSIM, you can search, book, and display QR tickets without waiting in line at station counters.\n\nGoogle Maps reviews and TripAdvisor are invaluable for finding authentic Italian restaurants. A constant data connection helps you discover local favorites and hidden gems. Google Translate's camera feature is also essential for reading Italian-only menus, especially outside major tourist areas."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work on Venice water buses?", a: "Yes, 4G coverage is available along Venice's vaporetto routes. Connectivity remains stable around the Grand Canal and St. Mark's Square area." },
      { q: "Can I use an Italy eSIM in other EU countries?", a: "Plans with EU roaming work in France, Germany, Spain, and other EU states at no extra charge. Switzerland may be treated separately, so check plan details." },
      { q: "Does the eSIM work on the Amalfi Coast?", a: "Major towns like Amalfi, Positano, and Ravello have 4G coverage. Some narrow coastal roads and tunnels may experience brief connectivity drops." },
      { q: "How much data will I need in Italy?", a: "Typical tourist use is 500MB to 1GB per day. Including museum bookings and train tickets, a 5-10GB plan for 7 days is recommended." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Italy with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Italy eSIM Guide",
  },
  ko: {
    title: "이탈리아 eSIM 가이드 - 로마, 베네치아, 피렌체 통신 환경",
    subtitle: "역사와 예술의 나라 이탈리아를 eSIM으로 편리하게 여행하세요",
    intro: "이탈리아는 세계에서 유네스코 세계유산이 가장 많은 나라로, 로마, 피렌체, 베네치아 등 볼거리가 가득합니다. 주요 도시에서는 4G LTE가 안정적이며, eSIM을 이용하면 미술관 온라인 예매나 지도 앱 탐색이 수월해집니다.",
    sections: [
      {
        title: "이탈리아의 모바일 통신 환경",
        body: "이탈리아의 주요 통신사는 TIM, Vodafone Italia, WindTre, Iliad 4사입니다. TIM이 가장 넓은 커버리지를 보유하며 5G에서도 선두를 달리고 있습니다. 여행자용 eSIM은 주로 TIM 또는 Vodafone 회선을 사용합니다.\n\n로마와 밀라노 등 대도시에서는 5G 통신이 가능하며, 4G LTE로도 50~100Mbps의 속도가 나옵니다. 이탈리아의 통신 속도는 유럽 중간 수준이지만 관광 이용에는 충분합니다.\n\n이탈리아는 남북 간 통신 환경 격차가 있으며, 북이탈리아의 커버리지가 더 충실합니다. 남이탈리아나 시칠리아 일부 지역에서는 커버리지가 제한될 수 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "이탈리아 eSIM 플랜은 3일 1GB 단기 플랜부터 30일 무제한 플랜까지 다양합니다. 로마-피렌체-베네치아를 도는 정석 1주일 코스라면 5~10GB 플랜을 추천합니다. 미술관 예약, 레스토랑 검색, 지도 앱 사용을 고려하면 여유 있는 플랜이 안심입니다.\n\nEU 대응 플랜을 선택하면 스위스, 프랑스, 크로아티아로의 당일 여행에도 같은 eSIM을 사용할 수 있습니다. 이탈리아는 유럽 여행의 거점으로 인기가 높아 EU 대응 플랜을 추천합니다.\n\nAutoWiFi eSIM의 이탈리아 플랜은 테더링도 지원하여 렌터카 내비게이션이나 카페에서의 노트북 작업에도 편리합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 이탈리아 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 피우미치노 공항(로마)이나 말펜사 공항(밀라노) 도착 후 바로 통신을 시작할 수 있습니다.\n\neSIM 설치에는 WiFi 연결이 필요합니다. 이탈리아 공항에서 무료 WiFi가 제공되지만 속도가 느릴 수 있어 사전 설정을 권장합니다."
      },
      {
        title: "주요 도시 커버리지",
        body: "로마에서는 콜로세움, 바티칸 시국, 트레비 분수, 스페인 광장 등 모든 주요 관광지에서 안정적인 4G 통신이 가능합니다. 로마 지하철 역 구내에서도 모바일 데이터를 사용할 수 있습니다.\n\n피렌체에서는 우피치 미술관 주변, 두오모, 폰테 베키오 등 중심부에서 양호한 통신이 확인됩니다. 베네치아에서도 산마르코 광장, 리알토 다리, 카나레지오 지구에서 안정적인 접속이 가능합니다.\n\n밀라노, 나폴리, 토리노 등 주요 도시에서도 고품질 통신이 가능합니다. 아말피 해안이나 친퀘테레 같은 해안 관광지의 주요 포인트에서도 통신이 확보됩니다."
      },
      {
        title: "이탈리아 여행에서의 eSIM 활용 팁",
        body: "이탈리아의 인기 미술관(우피치, 콜로세움, 바티칸 미술관 등)은 온라인 사전 예약이 필수입니다. eSIM이 있으면 여행 중 일정이 바뀌어도 바로 티켓을 예약·변경할 수 있습니다. 당일권이 매진되는 경우가 많으므로 온라인 예약은 필수입니다.\n\n이탈리아 철도(Trenitalia, Italo)는 모바일 앱 티켓 구매가 편리합니다. eSIM이 있으면 역 창구에 줄 서지 않고 스마트폰으로 열차 검색·예약·QR 티켓 표시가 가능합니다.\n\nGoogle Maps 리뷰와 TripAdvisor는 정통 이탈리아 레스토랑 찾기에 유용합니다. 상시 데이터 연결이 있으면 현지 인기 맛집과 숨은 명소를 쉽게 발견할 수 있습니다. Google 번역 카메라 기능으로 이탈리아어 메뉴도 즉시 번역 가능합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "베네치아 수상 버스에서 eSIM을 사용할 수 있나요?", a: "네, 베네치아 바포레토(수상 버스) 루트를 따라 4G 통신이 가능합니다. 대운하와 산마르코 광장 주변에서 안정적인 접속이 유지됩니다." },
      { q: "이탈리아 eSIM으로 EU 다른 나라에서도 사용할 수 있나요?", a: "EU 로밍 대응 플랜이면 프랑스, 독일, 스페인 등 EU 회원국에서 추가 요금 없이 이용 가능합니다. 스위스는 별도일 수 있으니 확인하세요." },
      { q: "아말피 해안에서도 eSIM을 사용할 수 있나요?", a: "아말피, 포지타노, 라벨로 등 주요 마을에서 4G 통신이 가능합니다. 좁은 해안 도로나 터널에서는 일시적으로 접속이 불안정할 수 있습니다." },
      { q: "이탈리아에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 미술관 예약과 기차표 구매를 포함하면 7일간 5~10GB 플랜을 추천합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 이탈리아 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "이탈리아 eSIM 가이드",
  },
  zh: {
    title: "意大利eSIM指南 - 罗马、威尼斯、佛罗伦萨通信攻略",
    subtitle: "使用eSIM畅游意大利的艺术与历史之都",
    intro: "意大利拥有全球最多的联合国教科文组织世界遗产，罗马、佛罗伦萨、威尼斯等城市精彩纷呈。主要城市4G LTE覆盖稳定，使用eSIM可以轻松预订博物馆门票、导航街道和寻找美食。支持EU漫游的套餐让您跨境旅行无忧。",
    sections: [
      {
        title: "意大利移动通信概况",
        body: "意大利四大运营商为TIM（意大利电信）、Vodafone Italia、WindTre和Iliad。TIM拥有最广的覆盖范围，在5G部署方面也处于领先地位。旅行者eSIM套餐通常使用TIM或Vodafone网络。\n\n罗马和米兰提供5G覆盖，4G LTE在大多数城市速度可达50-100Mbps。意大利的移动网速在欧洲处于中等水平，但完全满足旅游使用需求。\n\n意大利南北通信质量存在差异，北部基础设施更完善。南部和西西里岛部分地区覆盖可能有限。"
      },
      {
        title: "推荐eSIM套餐",
        body: "意大利eSIM套餐从3天1GB到30天无限流量应有尽有。经典的罗马-佛罗伦萨-威尼斯一周行程，建议选择5-10GB套餐。博物馆预订、餐厅搜索和地图导航都会消耗不少流量。\n\n选择EU套餐可以在去瑞士、法国或克罗地亚的一日游中使用同一eSIM。意大利是欧洲游的热门中转站，EU通用套餐是理想选择。\n\nAutoWiFi eSIM意大利套餐支持热点共享，适合托斯卡纳自驾导航或在意大利咖啡馆使用笔记本办公。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买意大利套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM，Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"扫描QR码。\n\n出发前安装eSIM，到达菲乌米奇诺机场（罗马）或马尔彭萨机场（米兰）后即可立即连网。\n\neSIM安装需要WiFi连接。意大利机场提供免费WiFi但速度可能较慢，建议出发前完成设置。"
      },
      {
        title: "主要城市覆盖情况",
        body: "罗马的斗兽场、梵蒂冈、许愿池、西班牙广场等所有主要景点都有稳定的4G覆盖。罗马地铁站内也支持移动数据。\n\n佛罗伦萨的乌菲兹美术馆周边、大教堂、老桥等市中心区域通信良好。威尼斯的圣马可广场、里亚托桥、卡纳雷吉奥区连接稳定。虽然是水上之城，但威尼斯的移动网络覆盖可靠。\n\n米兰、那不勒斯、都灵等主要城市也有高质量覆盖。阿马尔菲海岸和五渔村等海岸旅游地的主要景点也有信号。"
      },
      {
        title: "意大利旅行eSIM使用技巧",
        body: "意大利热门博物馆（乌菲兹、斗兽场、梵蒂冈博物馆等）必须提前在线预约。有了eSIM，即使行程临时变更也能随时预订或修改门票。当天票经常售罄，在线预约必不可少。\n\n意大利铁路（Trenitalia和Italo）通过手机应用购票最方便。有了eSIM，无需在车站窗口排队，直接用手机搜索、预订并显示QR码车票。\n\nGoogle Maps评价和TripAdvisor对寻找地道意大利餐厅非常有帮助。持续的数据连接让您轻松发现当地人气餐厅和隐藏美食。Google翻译的相机功能也能即时翻译意大利语菜单，在主要旅游区外尤其实用。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "威尼斯水上巴士上能用eSIM吗？", a: "可以，威尼斯水上巴士航线沿途有4G覆盖。大运河和圣马可广场周边连接稳定。" },
      { q: "意大利eSIM能在其他欧盟国家使用吗？", a: "支持EU漫游的套餐可在法国、德国、西班牙等欧盟成员国免费使用。瑞士可能需另行确认。" },
      { q: "阿马尔菲海岸能用eSIM吗？", a: "阿马尔菲、波西塔诺、拉韦洛等主要城镇有4G覆盖。狭窄的海岸公路和隧道中可能短暂掉线。" },
      { q: "在意大利大概需要多少流量？", a: "一般观光使用每天500MB-1GB。加上博物馆预订和火车票购买，7天建议选择5-10GB套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游意大利。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "意大利eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/italy-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="italy-esim" content={CONTENT[loc]} />;
}
