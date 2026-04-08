import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "郊外やロードトリップ前に比較したいガイド",
    articles: [
      { slug: "esim-for-road-trips", title: "ロードトリップ向けeSIMガイド" },
      { slug: "new-zealand-esim", title: "ニュージーランドeSIMガイド" },
      { slug: "iceland-esim", title: "アイスランドeSIMガイド" },
      { slug: "travel-internet-options", title: "海外旅行のネット接続方法" },
      { slug: "esim-hotspot-tethering", title: "eSIMテザリング完全ガイド" },
    ],
  },
  en: {
    title: "Compare More Before You Head Into Regional Australia",
    articles: [
      { slug: "esim-for-road-trips", title: "Best eSIM for Road Trips" },
      { slug: "new-zealand-esim", title: "New Zealand eSIM Guide" },
      { slug: "iceland-esim", title: "Iceland eSIM Guide" },
      { slug: "travel-internet-options", title: "Travel Internet Options" },
      { slug: "esim-hotspot-tethering", title: "eSIM Hotspot Guide" },
    ],
  },
  ko: {
    title: "외곽 지역과 로드트립 전에 함께 볼 가이드",
    articles: [
      { slug: "esim-for-road-trips", title: "로드트립용 eSIM 가이드" },
      { slug: "new-zealand-esim", title: "뉴질랜드 eSIM 가이드" },
      { slug: "iceland-esim", title: "아이슬란드 eSIM 가이드" },
      { slug: "travel-internet-options", title: "여행 인터넷 옵션 비교" },
      { slug: "esim-hotspot-tethering", title: "eSIM 테더링 가이드" },
    ],
  },
  zh: {
    title: "前往偏远地区和自驾前值得继续比较",
    articles: [
      { slug: "esim-for-road-trips", title: "自驾旅行eSIM指南" },
      { slug: "new-zealand-esim", title: "新西兰eSIM指南" },
      { slug: "iceland-esim", title: "冰岛eSIM指南" },
      { slug: "travel-internet-options", title: "旅行上网方式对比" },
      { slug: "esim-hotspot-tethering", title: "eSIM热点共享指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "オーストラリアeSIMガイド - シドニー・メルボルンと広大な国土のカバレッジ",
    subtitle: "広大なオーストラリアをeSIMで安心して旅しよう",
    intro: "オーストラリアは日本の約20倍の国土を持つ広大な国で、シドニーのオペラハウス、メルボルンのカフェ文化、グレートバリアリーフの自然など魅力が満載です。主要都市では高速な5G/4G通信が利用可能ですが、都市間の移動時にはカバレッジの変化に注意が必要です。eSIMを利用すれば、到着後すぐに通信を開始でき、オーストラリア旅行を最大限に楽しめます。",
    sections: [
      {
        title: "オーストラリアのモバイル通信事情",
        body: "オーストラリアの主要通信キャリアはTelstra、Optus、Vodafone Australiaの3社です。Telstraが最大のカバレッジを持ち、特に地方部での接続性に優れています。都市部のみの利用であればOptusやVodafoneも十分ですが、ロードトリップを計画している場合はTelstra回線のプランを選ぶのが安心です。\n\nシドニーやメルボルンなどの主要都市では5G通信が利用可能で、下り100〜300Mbpsの高速通信を体験できます。オーストラリアの都市部での通信品質は世界的に見ても高い水準です。\n\nただし、オーストラリアは国土が非常に広大なため、都市間のハイウェイやアウトバックではカバレッジが大きく低下します。ウルル（エアーズロック）やカカドゥ国立公園などの内陸部では、通信可能なエリアが限られます。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "オーストラリア向けeSIMプランは、短期旅行者向けの3日間1GBプランから30日間無制限プランまで用意されています。シドニーとメルボルンを中心とした1週間の都市観光なら、5〜10GBプランがおすすめです。オーストラリアの都市部ではカフェのフリーWiFiが充実しているため、併用でデータ節約が可能です。\n\nAutoWiFi eSIMのオーストラリアプランは、TelstraまたはOptusの回線を利用しており、主要都市での安定した通信が保証されています。テザリングにも対応しているため、レンタカーでのナビゲーションや複数デバイスでの利用も可能です。\n\nオーストラリアのeSIMプランはヨーロッパやアジアと比較するとやや割高ですが、国土の広さと通信インフラの整備コストを考えると妥当な価格帯です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでオーストラリアプランを購入後、QRコードがメールで届きます。iPhoneは\"設定→モバイル通信\"→\"eSIMを追加、Androidは設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、シドニー国際空港やメルボルン空港に到着後すぐに通信を開始できます。入国審査の待ち時間が長いオーストラリアでは、待ち時間中にホテルの情報確認やUberの手配ができるのは大きなメリットです。\n\nオーストラリアの空港ではフリーWiFiが提供されていますが、30分〜1時間の時間制限がある場合があります。eSIMがあれば時間を気にせず通信できます。"
      },
      {
        title: "主要都市でのカバレッジ",
        body: "シドニーではオペラハウス、ハーバーブリッジ、ダーリングハーバー、ボンダイビーチなど全ての主要観光スポットで高速通信が利用可能です。シドニーの電車やバスの車内でもモバイル通信が利用でき、Opal Card（交通ICカード）の残高確認もスマートフォンで行えます。\n\nメルボルンではフリンダースストリート駅、フェデレーションスクエア、グレートオーシャンロードの主要展望台で安定した通信が確認されています。メルボルンのトラム（路面電車）車内でもモバイル通信は良好です。\n\nブリスベン、ゴールドコースト、パース、アデレード、ケアンズなどの主要都市でも高品質な通信が利用可能です。グレートバリアリーフの拠点となるケアンズやエアリービーチでは市内では安定した通信が可能ですが、リーフ上のクルーズ中は圏外になります。"
      },
      {
        title: "オーストラリア旅行でのeSIM活用のコツ",
        body: "オーストラリアは広大な国のため、都市間の移動計画にデータ通信が欠かせません。Googleマップでのルート検索やTripviewなどの公共交通機関アプリが非常に便利です。シドニーやメルボルンの公共交通は複雑なため、リアルタイムの運行情報が役立ちます。\n\nオーストラリアではUberが主要都市で広く利用されています。また、レンタカーでの旅行が一般的で、GoogleマップやWazeのリアルタイムナビゲーションが重要です。グレートオーシャンロードやブルーマウンテンズなどのドライブルートでは、事前にオフラインマップをダウンロードしておくと安心です。\n\nオーストラリアの紫外線は非常に強いため、天気アプリでUVインデックスを確認する習慣をつけましょう。また、ビーチの安全情報やサーフコンディションもアプリで確認できます。海での遊泳はライフセーバーがいるビーチで行うことが推奨されており、eSIMがあればそうした安全情報にいつでもアクセスできます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ウルル（エアーズロック）でeSIMは使えますか？", a: "ウルルのリゾートエリアや展望台周辺では通信可能ですが、カバレッジは限定的です。アウトバックの大部分は圏外になるため、ロードトリップで訪れる場合はオフラインマップのダウンロードを強くおすすめします。" },
      { q: "グレートバリアリーフでeSIMは使えますか？", a: "ケアンズやエアリービーチの市内では安定した通信が可能ですが、リーフ上のクルーズやスノーケリング中は圏外になります。出港前に必要な情報をダウンロードしておきましょう。" },
      { q: "オーストラリアでのデータ使用量の目安は？", a: "都市部での一般的な観光利用で1日500MB〜1GB程度です。カフェのWiFiも利用できるため、7日間5〜10GBプランで十分です。ロードトリップで常時ナビを使う場合は無制限プランの検討をおすすめします。" },
      { q: "ニュージーランドでも同じeSIMは使えますか？", a: "プランによってはオーストラリアとニュージーランドの両方をカバーするものもあります。両国を周遊する場合は、オセアニア対応プランを選択してください。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでオーストラリア旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "オーストラリアeSIMガイド",
  },
  en: {
    title: "Australia eSIM Guide - Sydney, Melbourne & Outback Coverage",
    subtitle: "Stay connected across Australia's vast landscape with eSIM",
    intro: "Australia is a vast continent-country, about 20 times the size of Japan, featuring Sydney's Opera House, Melbourne's cafe culture, and the Great Barrier Reef. Major cities offer fast 5G and 4G connectivity, but be aware of coverage changes when traveling between cities. An eSIM lets you get online instantly upon arrival to make the most of your Australian adventure.",
    sections: [
      {
        title: "Australia's Mobile Network Overview",
        body: "Australia's three major carriers are Telstra, Optus, and Vodafone Australia. Telstra has the largest coverage footprint, particularly strong in regional and rural areas. Optus and Vodafone are adequate for city-only trips, but if you plan road trips through regional areas, a Telstra-based plan is the safest choice.\n\nSydney and Melbourne offer 5G with speeds of 100-300 Mbps, placing Australian cities among the world's best-connected. Urban mobile quality is excellent across all major cities.\n\nHowever, Australia's enormous land mass means coverage drops significantly on intercity highways and in the Outback. Uluru (Ayers Rock) and Kakadu National Park have limited coverage outside resort areas."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Australia eSIM plans range from 3-day 1GB options to 30-day unlimited packages. For a week-long city trip focusing on Sydney and Melbourne, a 5-10GB plan is ideal. Australian cities have abundant cafe WiFi, which helps conserve your eSIM data.\n\nAutoWiFi eSIM Australia plans use Telstra or Optus networks, ensuring stable city coverage. Tethering is supported for car navigation and multi-device use.\n\nAustralian eSIM plans are pricier than European or Asian options, reflecting the country's size and infrastructure costs. However, the convenience of always-on connectivity makes them worthwhile."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing an Australia plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to connect immediately at Sydney International Airport or Melbourne Airport. Australia's immigration queues can be lengthy, so having data during the wait lets you check hotel details and arrange Uber rides.\n\nAustralian airports offer free WiFi, though sessions may be limited to 30-60 minutes. An eSIM removes any time restrictions."
      },
      {
        title: "Coverage in Major Cities",
        body: "Sydney has fast coverage at the Opera House, Harbour Bridge, Darling Harbour, and Bondi Beach. Mobile data works on Sydney trains and buses, and you can check your Opal Card balance via smartphone.\n\nMelbourne offers stable coverage at Flinders Street Station, Federation Square, and major viewpoints along the Great Ocean Road. Melbourne's tram system also supports good mobile connectivity.\n\nBrisbane, Gold Coast, Perth, Adelaide, and Cairns all provide high-quality coverage. Cairns and Airlie Beach, gateways to the Great Barrier Reef, have stable city coverage, but reef cruises will be out of range."
      },
      {
        title: "Tips for Using eSIM in Australia",
        body: "Australia's vast size makes data connectivity essential for travel planning. Google Maps and public transit apps like Tripview are invaluable for navigating Sydney and Melbourne's complex transport networks.\n\nUber is widely available in Australian cities. For road trips, Google Maps and Waze provide critical real-time navigation. Download offline maps before driving the Great Ocean Road or Blue Mountains, as some stretches have limited coverage.\n\nAustralia's UV radiation is extremely intense. Make a habit of checking UV index on weather apps. Beach safety information and surf conditions are also available through apps. Swimming at patrolled beaches is strongly recommended, and an eSIM gives you constant access to safety information."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work at Uluru (Ayers Rock)?", a: "The resort area and viewing platforms near Uluru have some coverage, but it is limited. Most of the Outback has no signal. Download offline maps before any Outback road trip." },
      { q: "Does the eSIM work at the Great Barrier Reef?", a: "Cairns and Airlie Beach have stable city coverage, but you will be out of range during reef cruises and snorkeling trips. Download any needed information before departure." },
      { q: "How much data will I need in Australia?", a: "City-based tourist use averages 500MB to 1GB per day. With cafe WiFi available, a 5-10GB plan for 7 days is sufficient. Consider unlimited plans if using constant GPS navigation on road trips." },
      { q: "Can I use the same eSIM in New Zealand?", a: "Some plans cover both Australia and New Zealand. If visiting both countries, look for an Oceania combo plan." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Australia with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Australia eSIM Guide",
  },
  ko: {
    title: "호주 eSIM 가이드 - 시드니, 멜버른과 광활한 국토 커버리지",
    subtitle: "광대한 호주를 eSIM으로 안심하고 여행하세요",
    intro: "호주는 일본의 약 20배 면적을 가진 광대한 나라로, 시드니 오페라 하우스, 멜버른 카페 문화, 그레이트 배리어 리프의 자연 등 매력이 넘칩니다. 주요 도시에서는 고속 5G/4G 통신이 가능하지만 도시 간 이동 시 커버리지 변화에 주의가 필요합니다. eSIM을 이용하면 도착 즉시 통신을 시작할 수 있습니다.",
    sections: [
      {
        title: "호주의 모바일 통신 환경",
        body: "호주의 주요 통신사는 Telstra, Optus, Vodafone Australia 3사입니다. Telstra가 가장 넓은 커버리지를 보유하며, 특히 지방 및 농촌 지역에서의 접속성이 뛰어납니다. 도시만 방문하는 경우 Optus나 Vodafone도 충분하지만, 로드트립을 계획한다면 Telstra 회선 플랜이 안심입니다.\n\n시드니와 멜버른 등 주요 도시에서는 5G 통신이 가능하며, 100~300Mbps의 고속 통신을 체험할 수 있습니다. 호주 도시부의 통신 품질은 세계적으로도 높은 수준입니다.\n\n다만 호주는 국토가 매우 광대하여 도시 간 고속도로나 아웃백에서는 커버리지가 크게 떨어집니다. 울루루(에어즈 록)나 카카두 국립공원 등 내륙부에서는 통신 가능 지역이 제한됩니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "호주 eSIM 플랜은 3일 1GB 단기 플랜부터 30일 무제한 플랜까지 다양합니다. 시드니와 멜버른 중심의 1주일 도시 관광이라면 5~10GB 플랜을 추천합니다. 호주 도시에서는 카페 무료 WiFi가 충실하여 데이터 절약이 가능합니다.\n\nAutoWiFi eSIM의 호주 플랜은 Telstra 또는 Optus 회선을 사용하여 주요 도시에서 안정적인 통신을 보장합니다. 테더링도 지원하여 렌터카 내비게이션이나 여러 기기 사용이 가능합니다.\n\n호주 eSIM 플랜은 유럽이나 아시아에 비해 다소 비싸지만, 국토의 넓이와 통신 인프라 비용을 고려하면 합리적인 가격대입니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 호주 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 시드니 국제공항이나 멜버른 공항 도착 후 바로 통신을 시작할 수 있습니다. 호주 입국 심사는 대기 시간이 긴 편이라 대기 중 호텔 정보 확인이나 Uber 수배가 가능한 것은 큰 장점입니다.\n\n호주 공항에서는 무료 WiFi가 제공되지만 30분~1시간 시간 제한이 있을 수 있습니다. eSIM이 있으면 시간 제한 없이 통신할 수 있습니다."
      },
      {
        title: "주요 도시 커버리지",
        body: "시드니에서는 오페라 하우스, 하버 브리지, 달링 하버, 본다이 비치 등 모든 주요 관광지에서 고속 통신이 가능합니다. 시드니 전철과 버스 차내에서도 모바일 통신이 가능하며, Opal Card 잔액도 스마트폰으로 확인할 수 있습니다.\n\n멜버른에서는 플린더스 스트리트 역, 페더레이션 스퀘어, 그레이트 오션 로드 주요 전망대에서 안정적인 통신이 확인됩니다. 멜버른 트램 차내에서도 모바일 통신은 양호합니다.\n\n브리즈번, 골드코스트, 퍼스, 애들레이드, 케언즈 등 주요 도시에서도 고품질 통신이 가능합니다. 그레이트 배리어 리프의 거점인 케언즈와 에얼리 비치에서는 시내 통신이 안정적이지만, 리프 크루즈 중에는 전파가 닿지 않습니다."
      },
      {
        title: "호주 여행에서의 eSIM 활용 팁",
        body: "호주는 광대한 나라이므로 여행 계획에 데이터 통신이 필수입니다. Google Maps와 Tripview 등 대중교통 앱이 시드니와 멜버른의 복잡한 교통망 탐색에 매우 유용합니다.\n\n호주 주요 도시에서는 Uber가 널리 이용됩니다. 렌터카 여행에서는 Google Maps와 Waze의 실시간 내비게이션이 중요합니다. 그레이트 오션 로드나 블루 마운틴즈 드라이브 전에 오프라인 지도를 다운로드해 두면 안심입니다.\n\n호주의 자외선은 매우 강합니다. 날씨 앱으로 UV 지수를 확인하는 습관을 들이세요. 해변 안전 정보와 서핑 컨디션도 앱으로 확인 가능합니다. 라이프세이버가 있는 해변에서 수영하는 것이 권장되며, eSIM이 있으면 이런 안전 정보에 언제든 접근할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "울루루(에어즈 록)에서 eSIM을 사용할 수 있나요?", a: "울루루 리조트 지역과 전망대 주변에서는 일부 통신이 가능하지만 커버리지는 제한적입니다. 아웃백 대부분은 전파가 닿지 않으므로 로드트립 전 오프라인 지도를 반드시 다운로드하세요." },
      { q: "그레이트 배리어 리프에서 eSIM을 사용할 수 있나요?", a: "케언즈와 에얼리 비치 시내에서는 안정적인 통신이 가능하지만, 리프 크루즈나 스노클링 중에는 전파가 닿지 않습니다. 출항 전 필요한 정보를 다운로드해 두세요." },
      { q: "호주에서 데이터 사용량은 어느 정도인가요?", a: "도시 관광 기준 하루 500MB~1GB 정도입니다. 카페 WiFi도 활용 가능하여 7일간 5~10GB 플랜이면 충분합니다. 로드트립에서 상시 GPS 내비를 사용한다면 무제한 플랜을 고려하세요." },
      { q: "같은 eSIM으로 뉴질랜드에서도 사용할 수 있나요?", a: "플랜에 따라 호주와 뉴질랜드 양국을 커버하는 것도 있습니다. 양국을 방문하는 경우 오세아니아 통합 플랜을 선택하세요." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 호주 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "호주 eSIM 가이드",
  },
  zh: {
    title: "澳大利亚eSIM指南 - 悉尼、墨尔本与广袤国土覆盖",
    subtitle: "使用eSIM安心畅游广阔的澳大利亚",
    intro: "澳大利亚国土面积约为日本的20倍，拥有悉尼歌剧院、墨尔本咖啡文化和大堡礁自然奇观等丰富景点。主要城市提供高速5G/4G网络，但城市间移动时需注意覆盖变化。使用eSIM可以在抵达后立即上网，充分享受澳洲之旅。",
    sections: [
      {
        title: "澳大利亚移动通信概况",
        body: "澳大利亚三大运营商为Telstra、Optus和Vodafone Australia。Telstra拥有最广的覆盖范围，在偏远和农村地区尤其出色。仅在城市活动的话Optus和Vodafone也足够，但如果计划自驾游穿越偏远地区，建议选择Telstra网络的套餐。\n\n悉尼和墨尔本等主要城市提供5G覆盖，速度可达100-300Mbps，澳大利亚城市的通信质量在全球属于顶级水平。\n\n但由于国土面积极其辽阔，城际公路和内陆地区覆盖会大幅下降。乌鲁鲁（艾尔斯岩）和卡卡杜国家公园等内陆地区信号覆盖有限。"
      },
      {
        title: "推荐eSIM套餐",
        body: "澳大利亚eSIM套餐从3天1GB到30天无限流量应有尽有。以悉尼和墨尔本为主的一周城市游，5-10GB套餐最为理想。澳大利亚城市的咖啡馆WiFi丰富，可以搭配使用节省流量。\n\nAutoWiFi eSIM澳大利亚套餐使用Telstra或Optus网络，确保城市覆盖稳定。支持热点共享，适合租车导航和多设备使用。\n\n澳大利亚eSIM套餐比欧洲和亚洲稍贵，但考虑到国土面积和基础设施成本，价格合理。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买澳大利亚套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM，Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"扫描QR码。\n\n出发前安装eSIM，到达悉尼国际机场或墨尔本机场后即可立即连网。澳大利亚入境排队时间较长，等待期间能查看酒店信息和叫Uber是一大优势。\n\n澳大利亚机场提供免费WiFi，但可能限时30-60分钟。eSIM让您不受时间限制。"
      },
      {
        title: "主要城市覆盖情况",
        body: "悉尼的歌剧院、海港大桥、达令港、邦迪海滩等所有主要景点都有高速网络。悉尼火车和公交车上也可使用移动数据，还能用手机查看Opal Card余额。\n\n墨尔本的弗林德斯街车站、联邦广场、大洋路主要观景台覆盖稳定。墨尔本有轨电车内移动通信也很良好。\n\n布里斯班、黄金海岸、珀斯、阿德莱德、凯恩斯等主要城市也有高质量覆盖。作为大堡礁门户的凯恩斯和艾尔利海滩市内信号稳定，但礁石巡游期间没有信号。"
      },
      {
        title: "澳大利亚旅行eSIM使用技巧",
        body: "澳大利亚幅员辽阔，旅行规划离不开数据连接。Google Maps和Tripview等公共交通应用对于导航悉尼和墨尔本复杂的交通网络非常有用。\n\n澳大利亚主要城市广泛使用Uber。自驾游时Google Maps和Waze的实时导航至关重要。驾驶大洋路或蓝山之前，建议下载离线地图以防信号不佳。\n\n澳大利亚紫外线非常强烈，养成用天气应用查看UV指数的习惯。海滩安全信息和冲浪条件也可通过应用查看。建议在有救生员的海滩游泳，eSIM让您随时获取这些安全信息。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "乌鲁鲁（艾尔斯岩）能用eSIM吗？", a: "乌鲁鲁度假区和观景台附近有部分覆盖，但信号有限。内陆大部分地区没有信号，自驾游前务必下载离线地图。" },
      { q: "大堡礁能用eSIM吗？", a: "凯恩斯和艾尔利海滩市内信号稳定，但礁石巡游和浮潜期间没有信号。出发前请下载所需信息。" },
      { q: "在澳大利亚大概需要多少流量？", a: "城市观光每天约500MB-1GB。咖啡馆WiFi可以搭配使用，7天5-10GB套餐足够。如果自驾游常用GPS导航，建议考虑无限流量套餐。" },
      { q: "同一eSIM能在新西兰使用吗？", a: "部分套餐同时覆盖澳大利亚和新西兰。如果两国都去，请选择大洋洲通用套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游澳大利亚。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "澳大利亚eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/australia-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="australia-esim" content={CONTENT[loc]} relatedArticles={RELATED[loc].articles} relatedTitle={RELATED[loc].title} />;
}
