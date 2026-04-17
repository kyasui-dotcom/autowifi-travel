import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "spain-esim", title: "スペインeSIMガイド" },
      { slug: "europe-esim", title: "ヨーロッパeSIMガイド" },
      { slug: "europe-travel-connectivity", title: "ヨーロッパ旅行の通信ガイド" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "spain-esim", title: "Spain eSIM Guide" },
      { slug: "europe-esim", title: "Europe eSIM Guide" },
      { slug: "europe-travel-connectivity", title: "Europe Travel Connectivity Guide" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "spain-esim", title: "스페인 eSIM 가이드" },
      { slug: "europe-esim", title: "유럽 eSIM 가이드" },
      { slug: "europe-travel-connectivity", title: "유럽 여행 통신 가이드" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "spain-esim", title: "西班牙eSIM指南" },
      { slug: "europe-esim", title: "欧洲eSIM指南" },
      { slug: "europe-travel-connectivity", title: "欧洲旅行通信指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "ポルトガルeSIMガイド - リスボン・ポルト・アルガルヴェのカバレッジとEUローミング",
    subtitle: "EU圏内ローミング対応eSIMでポルトガル旅行を快適に",
    intro: "ポルトガルはヨーロッパで人気急上昇中の観光地であり、リスボンやポルトを中心に高品質なモバイル通信が利用可能です。美しいアズレージョの街並みを散策しながら、eSIMがあればトラムの路線検索やレストラン予約もスムーズに行えます。EU圏内ローミング対応プランなら、隣国スペインへの周遊旅行にも便利です。本記事ではEU圏内ローミング対応eSIMでポルトガル旅行を快適に・ポルトガルのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "ポルトガルのモバイル通信事情",
        body: "ポルトガルの主要通信キャリアはMEO、NOS、Vodafone Portugalの3社です。MEOが最大のカバレッジを持ち、国内の固定・モバイル通信で最大のシェアを誇ります。NOSも広いネットワークを持ち、Vodafone Portugalは都市部で高品質な5Gサービスを展開しています。\n\nリスボン市内では5G通信が利用可能で、下り100〜300Mbpsの高速通信を体験できます。ポルトでも5Gエリアが拡大しており、両都市とも4G LTEで安定した接続が可能です。\n\nポルトガルは国土が比較的コンパクトなため、都市部と地方の通信格差は他のヨーロッパ諸国に比べて小さい傾向があります。ただし、アルガルヴェの断崖沿いやアソーレス諸島の山間部では電波が弱くなることがあります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "ポルトガル向けeSIMプランは、リスボン滞在向けの短期プランから、ポルトガル全土をカバーする長期プランまで用意されています。1週間のリスボン・ポルト旅行なら5GBプランがおすすめです。リスボンのカフェやレストランではフリーWiFiが広く提供されているため、eSIMと併用すればデータ節約が可能です。\n\nEUローミング対応プランを選べば、スペインへの日帰り旅行やヨーロッパ周遊にも同じeSIMで対応できます。リスボンからマドリードへの夜行列車やセビリアへのバス旅行の際にも通信が途切れません。\n\nAutoWiFi eSIMでは、ポルトガル専用プランとヨーロッパ周遊プランの両方を提供しています。テザリングにも対応しているので、複数デバイスでの利用も問題ありません。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでポルトガルプランを購入後、QRコードがメールで届きます。iPhoneは「設定→モバイル通信→eSIMを追加」、Androidは「設定→ネットワークとインターネット→SIM→eSIMを追加」からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、リスボンのウンベルト・デルガード空港（旧ポルテラ空港）に到着後すぐに通信を開始できます。空港からメトロでバイシャ地区やロシオ広場へ向かう車内からインターネットが使えます。\n\nポルトガルの空港ではフリーWiFiが提供されていますが、接続が混雑することがあります。eSIMがあれば、到着直後から安定した通信が可能です。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "リスボン市内は通信環境が非常に良好です。ベレン地区、アルファマ地区、バイロ・アルト、シアード地区などすべての主要観光エリアで高速通信が利用可能です。リスボンの地下鉄駅構内でもモバイルデータが使えます。\n\nポルトでも通信環境は優秀です。リベイラ地区、クレリゴスの塔周辺、レロ書店エリアなどで安定した4G接続が可能です。ドウロ川沿いのワイナリー地帯でも概ね通信可能です。\n\nアルガルヴェ地方のラゴス、ファロ、アルブフェイラなどのリゾート地では良好なカバレッジがあります。マデイラ島のフンシャルでも安定した通信が可能です。アソーレス諸島では主要な町では通信できますが、ハイキングコースの一部では電波が届かない場所もあります。シントラの王宮やペーナ宮殿周辺でも問題なく通信できます。"
      },
      {
        title: "ポルトガル旅行でのeSIM活用のコツ",
        body: "リスボンではトラム（路面電車）が主要な観光交通手段です。特に有名な28番トラムは非常に混雑するため、Google Mapsでリアルタイムの運行状況を確認し、空いている時間帯を狙うのがおすすめです。eSIMがあれば、代替ルートの検索も簡単です。\n\nポルトガルではUberが広く利用されており、タクシーよりも安く移動できることが多いです。リスボンの急な坂道を避けたいときや、ポルトの観光スポット間の移動にUberアプリが便利です。eSIMがあれば、いつでもすぐに配車を手配できます。\n\nポルトガル名物のパステル・デ・ナタ（エッグタルト）の名店を探すにもeSIMが活躍します。リスボンのパステイス・デ・ベレンは行列ができますが、Google Mapsで混雑状況を確認できます。アルガルヴェでサーフィンを楽しむ際には、波情報アプリで最適なビーチを見つけられます。サグレスやペニシェなどのサーフスポットでも通信は概ね良好です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ポルトガルのeSIMでEU他国でも使えますか？", a: "EUローミング対応プランであれば、スペイン、フランス、イタリアなどEU加盟国で追加料金なしで利用できます。イギリスは別扱いの場合があるため、プラン詳細を確認してください。" },
      { q: "マデイラ島やアソーレス諸島でもeSIMは使えますか？", a: "はい、マデイラ島のフンシャルやアソーレス諸島の主要な町では問題なく利用できます。ただし山間部やハイキングコースの一部では電波が届かない場合があります。" },
      { q: "リスボンのトラムや地下鉄でeSIMは使えますか？", a: "はい、リスボンの地下鉄駅構内ではモバイル通信が利用可能です。トラムは地上を走るため、通常は安定した通信が可能です。" },
      { q: "ポルトガルでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。カフェやレストランのフリーWiFiも活用すれば、7日間5GBプランで十分です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでポルトガル旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ポルトガルeSIMガイド",
  },
  en: {
    title: "Portugal eSIM Guide - Lisbon, Porto, Algarve & EU Roaming",
    subtitle: "Stay connected across Portugal and the EU with one eSIM",
    intro: "Portugal has become one of Europe's hottest travel destinations, offering excellent mobile coverage in Lisbon, Porto, and beyond. With an eSIM, you can navigate Lisbon's iconic trams, find the best pasteis de nata, and book Uber rides the moment you land. EU roaming plans make it easy to hop across the border to Spain or tour multiple European countries.",
    sections: [
      {
        title: "Portugal's Mobile Network Overview",
        body: "Portugal has three major carriers: MEO, NOS, and Vodafone Portugal. MEO has the largest coverage footprint and the biggest share of the fixed and mobile market. NOS also provides extensive network coverage, while Vodafone Portugal offers high-quality 5G services in urban areas.\n\nLisbon has 5G coverage with speeds reaching 100-300 Mbps. Porto's 5G network is also expanding, and both cities offer reliable 4G LTE connectivity throughout.\n\nPortugal's relatively compact size means the urban-rural connectivity gap is smaller than in many other European countries. However, signal can weaken along the Algarve cliffs and in mountainous areas of the Azores."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Portugal eSIM plans range from short Lisbon-focused options to longer plans covering the entire country. A 5GB plan is ideal for a one-week Lisbon and Porto trip. Cafes and restaurants in Lisbon widely offer free WiFi, which helps conserve your eSIM data.\n\nPlans with EU roaming let you use the same eSIM on a day trip to Spain or a multi-country European tour. Whether you take the night train from Lisbon to Madrid or a bus to Seville, your connection stays active.\n\nAutoWiFi eSIM offers both Portugal-only and Europe-wide plans. Tethering is supported, so you can share your connection across multiple devices."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Portugal plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to start using data immediately at Lisbon's Humberto Delgado Airport. You can get online right away on the Metro ride into the Baixa district or Rossio Square.\n\nPortuguese airports offer free WiFi, but connections can get congested. An eSIM ensures stable connectivity from the moment you arrive."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Lisbon has excellent coverage throughout the city. Belem, Alfama, Bairro Alto, and Chiado all offer fast data connections. Lisbon's Metro stations support mobile data as well.\n\nPorto also has outstanding coverage. The Ribeira district, Clerigos Tower area, and Livraria Lello neighborhood all have stable 4G connections. The Douro Valley wine region generally has reliable coverage along the main routes.\n\nAlgarve resort towns like Lagos, Faro, and Albufeira have strong coverage. Funchal in Madeira offers stable connectivity. The Azores have coverage in major towns, though some hiking trails may have dead zones. Sintra's palaces, including Pena Palace and the National Palace, have reliable signal."
      },
      {
        title: "Tips for Using eSIM in Portugal",
        body: "Lisbon's trams are a key part of the tourist experience. The famous Tram 28 gets extremely crowded, so use Google Maps to check real-time schedules and find less busy times. With an eSIM, searching for alternative routes is quick and easy.\n\nUber is widely available in Portugal and often cheaper than taxis. It is especially handy for avoiding Lisbon's steep hills or moving between sights in Porto. An eSIM lets you request a ride anytime.\n\nAn eSIM also helps you track down the best pasteis de nata (egg tarts) in town. Pasteis de Belem in Lisbon always has a queue, but you can check wait times on Google Maps. If you are heading to the Algarve for surfing, wave-forecast apps help you find the best beach. Surf spots like Sagres and Peniche generally have good coverage."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use a Portugal eSIM in other EU countries?", a: "Plans with EU roaming work in Spain, France, Italy, and other EU member states at no extra charge. The UK may be treated separately, so check plan details." },
      { q: "Does the eSIM work in Madeira and the Azores?", a: "Yes, Funchal in Madeira and major towns in the Azores have reliable coverage. Remote mountain trails and hiking paths may have limited signal in some areas." },
      { q: "Does the eSIM work on Lisbon's trams and Metro?", a: "Yes, Lisbon Metro stations support mobile data. Trams run above ground so coverage is typically stable throughout the route." },
      { q: "How much data will I need in Portugal?", a: "Typical tourist usage is 500MB to 1GB per day. With cafe WiFi available in major cities, a 5GB plan for 7 days works well for most travelers." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Portugal with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Portugal eSIM Guide",
  },
  ko: {
    title: "포르투갈 eSIM 가이드 - 리스본, 포르투, 알가르베, EU 로밍",
    subtitle: "EU 로밍 대응 eSIM으로 포르투갈 여행을 편리하게",
    intro: "포르투갈은 유럽에서 가장 인기 있는 여행지 중 하나로, 리스본과 포르투를 중심으로 고품질 모바일 통신을 이용할 수 있습니다. eSIM이 있으면 리스본의 트램 노선 검색, 맛집 예약, Uber 호출을 공항 도착 즉시 할 수 있습니다. EU 로밍 대응 플랜이라면 이웃 나라 스페인으로의 당일 여행도 간편합니다.",
    sections: [
      {
        title: "포르투갈의 모바일 통신 환경",
        body: "포르투갈의 주요 통신사는 MEO, NOS, Vodafone Portugal 3사입니다. MEO가 가장 넓은 커버리지를 보유하고 있으며, NOS도 광범위한 네트워크를 제공합니다. Vodafone Portugal은 도시 지역에서 고품질 5G 서비스를 제공합니다.\n\n리스본 시내에서는 5G 통신이 가능하며, 100~300Mbps의 고속 통신을 체험할 수 있습니다. 포르투에서도 5G 지역이 확대되고 있으며, 양 도시 모두 4G LTE로 안정적인 접속이 가능합니다.\n\n포르투갈은 국토가 비교적 작아 도시와 지방의 통신 격차가 다른 유럽 국가에 비해 적은 편입니다. 다만 알가르베 절벽 지대나 아소르스 제도 산간 지역에서는 전파가 약해질 수 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "포르투갈 eSIM 플랜은 리스본 체류용 단기 플랜부터 포르투갈 전역을 커버하는 장기 플랜까지 다양합니다. 1주일 리스본·포르투 여행이라면 5GB 플랜이 적당합니다. 리스본의 카페와 레스토랑에서는 무료 WiFi가 널리 제공되어 데이터를 절약할 수 있습니다.\n\nEU 로밍 대응 플랜을 선택하면 스페인 당일 여행이나 유럽 여러 나라 여행에도 같은 eSIM으로 통신할 수 있습니다. 리스본에서 마드리드 야간열차나 세비야행 버스를 타도 통신이 끊기지 않습니다.\n\nAutoWiFi eSIM에서는 포르투갈 전용 플랜과 유럽 통합 플랜을 모두 제공합니다. 테더링도 지원됩니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 포르투갈 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 리스본 움베르투 델가두 공항 도착 후 바로 통신을 시작할 수 있습니다. 메트로로 바이샤 지구나 로시우 광장으로 이동하는 차내에서부터 인터넷을 사용할 수 있습니다.\n\n포르투갈 공항에서는 무료 WiFi가 제공되지만 혼잡할 수 있습니다. eSIM이 있으면 도착 즉시 안정적인 통신이 가능합니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "리스본 시내는 통신 환경이 매우 양호합니다. 벨렝 지구, 알파마 지구, 바이루 알투, 시아두 등 모든 주요 관광 지역에서 고속 통신이 가능합니다. 리스본 메트로 역 구내에서도 모바일 데이터를 사용할 수 있습니다.\n\n포르투도 통신 환경이 우수합니다. 히베이라 지구, 클레리구스 탑 주변, 레루 서점 지역에서 안정적인 4G 접속이 가능합니다. 도루 강 유역의 와이너리 지대에서도 대체로 통신이 가능합니다.\n\n알가르베 지방의 라고스, 파루, 알부페이라 등 리조트 지역에서 양호한 커버리지가 있습니다. 마데이라 섬 푼샬에서도 안정적인 통신이 가능합니다. 아소르스 제도에서는 주요 마을에서 통신할 수 있지만 일부 하이킹 코스에서는 신호가 닿지 않는 곳도 있습니다. 신트라의 궁전 주변에서도 문제없이 통신 가능합니다."
      },
      {
        title: "포르투갈 여행에서의 eSIM 활용 팁",
        body: "리스본에서는 트램(노면전차)이 주요 관광 교통수단입니다. 유명한 28번 트램은 매우 혼잡하므로 Google Maps로 실시간 운행 상황을 확인하고 한가한 시간대를 노리는 것이 좋습니다. eSIM이 있으면 대체 루트 검색도 간편합니다.\n\n포르투갈에서는 Uber가 널리 이용되며, 택시보다 저렴한 경우가 많습니다. 리스본의 가파른 언덕을 피하거나 포르투 관광 스팟 간 이동에 Uber 앱이 편리합니다. eSIM이 있으면 언제든 바로 차량을 호출할 수 있습니다.\n\n포르투갈 명물 파스테이스 드 나타(에그타르트) 맛집을 찾는 데도 eSIM이 유용합니다. 리스본의 파스테이스 드 벨렝은 항상 줄이 길지만 Google Maps로 대기 시간을 확인할 수 있습니다. 알가르베에서 서핑을 즐길 때는 파도 정보 앱으로 최적의 해변을 찾을 수 있습니다. 사그레스나 페니셰 등 서핑 스팟에서도 통신은 대체로 양호합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "포르투갈 eSIM으로 EU 다른 나라에서도 사용할 수 있나요?", a: "EU 로밍 대응 플랜이면 스페인, 프랑스, 이탈리아 등 EU 회원국에서 추가 요금 없이 이용할 수 있습니다. 영국은 별도일 수 있으니 플랜 상세를 확인하세요." },
      { q: "마데이라 섬이나 아소르스 제도에서도 eSIM을 사용할 수 있나요?", a: "네, 마데이라 섬 푼샬과 아소르스 제도 주요 마을에서는 안정적으로 이용 가능합니다. 산간 지역이나 일부 하이킹 코스에서는 신호가 제한될 수 있습니다." },
      { q: "리스본의 트램이나 메트로에서 eSIM을 사용할 수 있나요?", a: "네, 리스본 메트로 역 구내에서 모바일 통신이 가능합니다. 트램은 지상을 달리므로 보통 안정적인 통신이 가능합니다." },
      { q: "포르투갈에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 카페 무료 WiFi도 활용하면 7일간 5GB 플랜이면 충분합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 포르투갈 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "포르투갈 eSIM 가이드",
  },
  zh: {
    title: "葡萄牙eSIM指南 - 里斯本、波尔图、阿尔加维与EU漫游",
    subtitle: "一张eSIM畅游葡萄牙和欧盟",
    intro: "葡萄牙已成为欧洲最热门的旅行目的地之一，里斯本和波尔图等主要城市提供优质的移动通信服务。使用eSIM可以在落地后立即搜索电车路线、预订餐厅和叫Uber。支持EU漫游的套餐让你轻松跨境前往西班牙或游览多个欧洲国家。",
    sections: [
      {
        title: "葡萄牙移动通信概况",
        body: "葡萄牙三大运营商为MEO、NOS和Vodafone Portugal。MEO拥有最广的覆盖范围和最大的市场份额，NOS也提供广泛的网络覆盖，Vodafone Portugal则在城市地区提供高质量的5G服务。\n\n里斯本市内可使用5G网络，速度可达100-300Mbps。波尔图的5G覆盖也在扩大，两座城市的4G LTE连接都很稳定。\n\n由于葡萄牙国土面积相对较小，城乡通信差距比许多其他欧洲国家要小。不过，在阿尔加维的悬崖地带和亚速尔群岛的山区，信号可能会减弱。"
      },
      {
        title: "推荐eSIM套餐",
        body: "葡萄牙eSIM套餐从里斯本短期方案到全国长期套餐应有尽有。一周里斯本和波尔图行程选择5GB套餐即可。里斯本的咖啡馆和餐厅普遍提供免费WiFi，配合eSIM使用可以节省流量。\n\n选择支持EU漫游的套餐，去西班牙一日游或多国欧洲行程都能用同一eSIM上网。从里斯本乘夜车去马德里或巴士去塞维利亚，通信都不会中断。\n\nAutoWiFi eSIM提供葡萄牙专属套餐和欧洲通用套餐。支持热点共享，方便多设备使用。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买葡萄牙套餐后，QR码会发送到您的邮箱。iPhone用户前往「设置→蜂窝网络→添加eSIM」，Android用户前往「设置→网络和互联网→SIM卡→添加eSIM」扫描QR码。\n\n出发前安装eSIM，到达里斯本温贝托·德尔加多机场后即可立即连网。乘地铁前往拜萨区或罗西奥广场的途中就能使用网络。\n\n葡萄牙机场提供免费WiFi，但可能较为拥挤。eSIM确保您从到达那一刻起就有稳定的网络。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "里斯本全市通信环境优秀。贝伦区、阿尔法玛区、上城区、希亚多区等所有主要景区都有高速网络。里斯本地铁站台内也可使用移动数据。\n\n波尔图的通信环境同样出色。里贝拉区、克莱里戈斯塔周边、莱罗书店区域都有稳定的4G连接。杜罗河沿岸的酒庄地区通信也基本可靠。\n\n阿尔加维地区的拉各斯、法鲁、阿尔布费拉等度假胜地覆盖良好。马德拉岛丰沙尔的通信稳定。亚速尔群岛主要城镇有信号覆盖，但部分徒步路线可能存在信号盲区。辛特拉的宫殿（包括佩纳宫和国家宫殿）周边信号可靠。"
      },
      {
        title: "葡萄牙旅行eSIM使用技巧",
        body: "在里斯本，电车是主要的观光交通工具。著名的28路电车非常拥挤，建议用Google Maps查看实时运行状况，选择人少的时段乘坐。有了eSIM，搜索替代路线也很方便。\n\n在葡萄牙，Uber使用广泛，通常比出租车便宜。想避开里斯本陡峭的坡道或在波尔图景点间移动时，Uber应用非常实用。有了eSIM，随时可以叫车。\n\neSIM还能帮您找到最好吃的葡式蛋挞店。里斯本的贝伦蛋挞店总是排长队，但您可以用Google Maps查看等待时间。去阿尔加维冲浪时，浪况预报应用可以帮您找到最佳海滩。萨格里什和佩尼谢等冲浪热点的信号通常良好。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "葡萄牙eSIM能在其他欧盟国家使用吗？", a: "支持EU漫游的套餐可在西班牙、法国、意大利等欧盟成员国免费使用。英国可能需要另行确认，请查看套餐详情。" },
      { q: "马德拉岛和亚速尔群岛能用eSIM吗？", a: "可以，马德拉岛丰沙尔和亚速尔群岛主要城镇覆盖可靠。偏远山区和部分徒步路线信号可能受限。" },
      { q: "里斯本电车和地铁里能用eSIM吗？", a: "可以，里斯本地铁站台内支持移动数据。电车在地面行驶，通常信号稳定。" },
      { q: "在葡萄牙大概需要多少流量？", a: "一般观光使用每天500MB-1GB。善用咖啡馆WiFi的话，7天5GB套餐对大多数旅行者足够。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游葡萄牙。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "葡萄牙eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/portugal-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="portugal-esim" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
