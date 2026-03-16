import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "iceland-esim", title: "アイスランドeSIMガイド" },
      { slug: "europe-travel-connectivity", title: "ヨーロッパ旅行の通信ガイド" },
      { slug: "esim-data-plans-explained", title: "eSIMデータプラン解説" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "iceland-esim", title: "Iceland eSIM Guide" },
      { slug: "europe-travel-connectivity", title: "Europe Travel Connectivity Guide" },
      { slug: "esim-data-plans-explained", title: "eSIM Data Plans Explained" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "iceland-esim", title: "아이슬란드 eSIM 가이드" },
      { slug: "europe-travel-connectivity", title: "유럽 여행 통신 가이드" },
      { slug: "esim-data-plans-explained", title: "eSIM 데이터 플랜 설명" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "iceland-esim", title: "冰岛eSIM指南" },
      { slug: "europe-travel-connectivity", title: "欧洲旅行通信指南" },
      { slug: "esim-data-plans-explained", title: "eSIM数据套餐详解" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "ノルウェーeSIMガイド - オスロ・フィヨルド・北極圏のカバレッジ",
    subtitle: "オーロラからフィヨルドまで、ノルウェー旅行を快適に",
    intro: "ノルウェーは壮大なフィヨルド、オーロラ、白夜など大自然の魅力にあふれた北欧の国です。主要都市では高速な4G/5G通信が利用可能で、eSIMを使えばオスロ・ガーデモエン空港到着後すぐにルート検索や観光案内を利用できます。ノルウェーはEU加盟国ではないため、EU圏内ローミングが適用されない場合がある点に注意が必要です。ノルウェー対応のeSIMプランを事前に選びましょう。",
    sections: [
      {
        title: "ノルウェーのモバイル通信事情",
        body: "ノルウェーの主要通信キャリアはTelenor、Telia、Iceの3社です。Telenorがノルウェー最大のキャリアで、全国に最も広いカバレッジを持ちます。Teliaは都市部で強力な5Gネットワークを展開しており、Iceは第三のキャリアとして競争力のある価格でサービスを提供しています。\n\nオスロ、ベルゲン、トロンハイム、スタヴァンゲルなどの主要都市では5G通信が利用可能で、高速で安定した接続を体験できます。4G LTEのカバレッジはノルウェー人口の99%以上をカバーしています。\n\nただし、ノルウェーは国土が南北に長く、山岳地帯やフィヨルド奥部では電波が届きにくい場所もあります。北極圏の一部地域やロフォーテン諸島の離島部では通信が不安定になることがあります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "ノルウェー向けeSIMプランは、オスロ滞在向けの短期プランからフィヨルド周遊を含む長期プランまで用意されています。1週間のノルウェー旅行なら5〜10GBプランがおすすめです。ノルウェーはカフェやホテルのフリーWiFiが充実していますが、自然エリアではeSIMが頼りになります。\n\n重要な注意点として、ノルウェーはEU加盟国ではなくEEA（欧州経済領域）加盟国です。そのため、一部のEUローミングプランではノルウェーが対象外となる場合があります。プラン購入前にノルウェーが対象国に含まれているか必ず確認してください。\n\nAutoWiFi eSIMでは、ノルウェー専用プランと北欧周遊プランを提供しています。テザリングにも対応しているため、グループ旅行でも便利です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでノルウェープランを購入後、QRコードがメールで届きます。iPhoneは「設定」→「モバイル通信」→「eSIMを追加」、Androidは「設定」→「ネットワークとインターネット」→「SIM」→「eSIMを追加」からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、オスロ・ガーデモエン空港に到着後すぐに通信を開始できます。空港からオスロ中心部へのフリートーグ（空港急行列車）車内からすぐにインターネットが使えます。\n\nノルウェーの空港ではフリーWiFiが提供されていますが、速度制限がある場合があります。eSIMがあれば到着直後から快適な通信が可能です。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "オスロ市内は通信環境が非常に良好です。王宮、ヴィーゲラン彫刻公園、オペラハウス、アーケシュフース城など主要観光スポットで高速通信が利用できます。オスロのトラムやメトロでもモバイルデータが利用可能です。\n\nベルゲンでは、ブリッゲン地区、フロイエン山、魚市場周辺で安定した4G接続が可能です。ベルゲンからフィヨルドツアーに出発する際も、市街地では問題なく通信できます。\n\nトロムソは北極圏最大の都市で、オーロラ観測の拠点として人気です。市内では通信環境が良好ですが、郊外のオーロラ観測スポットでは電波が弱くなることがあります。フィヨルド内部のクルーズ中は陸地から離れるため、一時的に圏外になる場合があります。\n\nロフォーテン諸島では主要な町（レーヌ、スヴォルヴァー、ヘニングスヴァール）で4G通信が利用可能ですが、離島やハイキングルートの一部では電波が届かない場所もあります。"
      },
      {
        title: "ノルウェー旅行でのeSIM活用のコツ",
        body: "オーロラ観測にはオーロラ予報アプリ（Norway Lights、My Aurora Forecastなど）が欠かせません。eSIMがあれば、リアルタイムでオーロラ活動を確認し、最適な観測タイミングを逃しません。トロムソやアルタなど北部での観測時に特に役立ちます。\n\nフィヨルドクルーズやフッティルーテン（沿岸急行船）を利用する場合、船内にWiFiがある場合もありますが速度が遅いことが多いです。寄港地では陸上のeSIM通信が利用できるので、港での観光情報検索に活用しましょう。\n\n冬のノルウェーでレンタカーを利用する場合、道路状況の確認が重要です。ノルウェー道路局（Statens vegvesen）のアプリで道路の閉鎖・規制情報をリアルタイムで確認できます。山岳部の峠道は冬季閉鎖されることがあるため、常にデータ通信ができる環境が安全です。\n\nノルウェーはキャッシュレス先進国で、ほぼすべての場所でカード決済が可能ですが、Vipps（ノルウェーの決済アプリ）に対応している店舗も多くあります。また、ノルウェー語メニューの翻訳にもGoogle翻訳のカメラ機能が便利です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ノルウェーのeSIMでEU他国でも使えますか？", a: "ノルウェーはEU加盟国ではないため、EUローミングが自動的に適用されるとは限りません。ただしEEA（欧州経済領域）加盟国であるため、一部のプランでは対応しています。プラン購入前にノルウェーが対象国に含まれているか確認してください。" },
      { q: "フィヨルドクルーズ中にeSIMは使えますか？", a: "フィヨルド内では陸地に近いエリアで通信可能ですが、フィヨルド深部や外洋では圏外になることがあります。寄港地では通常通り利用できます。" },
      { q: "オーロラ観測スポットでeSIMは使えますか？", a: "トロムソやアルタの市内では問題なく使えます。郊外の観測スポットでは電波が弱くなることがありますが、主要な観光施設周辺はカバーされています。" },
      { q: "ノルウェーでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。自然エリアではフリーWiFiが少ないため、都市中心の旅行より多めのプラン（7日間10GB）がおすすめです。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでノルウェー旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ノルウェーeSIMガイド",
  },
  en: {
    title: "Norway eSIM Guide - Oslo, Fjords & Northern Lights Coverage",
    subtitle: "Stay connected from the fjords to the Arctic Circle",
    intro: "Norway offers breathtaking fjords, the Northern Lights, and midnight sun adventures. Major cities enjoy fast 4G/5G coverage, and an eSIM lets you navigate Oslo and plan fjord excursions from the moment you arrive at Oslo Gardermoen Airport. Note that Norway is not an EU member state, so standard EU roaming plans may not include Norway. Choose an eSIM plan that explicitly covers Norway.",
    sections: [
      {
        title: "Norway's Mobile Network Overview",
        body: "Norway has three major carriers: Telenor, Telia, and Ice. Telenor is the largest, offering the most extensive nationwide coverage. Telia has a strong 5G network in urban areas, while Ice is the third operator providing competitively priced services.\n\nOslo, Bergen, Trondheim, and Stavanger all have 5G coverage with fast, reliable connectivity. 4G LTE covers over 99% of the Norwegian population.\n\nHowever, Norway's long, narrow geography with mountainous terrain and deep fjords means some remote areas have limited coverage. Parts of the Arctic region and outer islands of the Lofoten archipelago may experience intermittent connectivity."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Norway eSIM plans range from short-term options for an Oslo city break to longer plans for fjord-hopping adventures. A 5-10GB plan works well for a one-week trip. Hotels and cafes in Norwegian cities offer free WiFi, but you will rely heavily on your eSIM in nature areas.\n\nAn important note: Norway is not an EU member but belongs to the EEA (European Economic Area). Some EU roaming plans do not include Norway. Always verify that Norway is listed as a covered country before purchasing your plan.\n\nAutoWiFi eSIM offers Norway-specific plans and Nordic regional plans. Tethering is supported, making it convenient for group travel."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Norway plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to get connected immediately at Oslo Gardermoen Airport. You can start using data on the Flytoget (airport express train) into central Oslo.\n\nNorwegian airports offer free WiFi, but speeds may be limited. An eSIM ensures fast, reliable connectivity from the moment you land."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Oslo has excellent coverage throughout the city. The Royal Palace, Vigeland Sculpture Park, Opera House, and Akershus Fortress all have fast mobile data. Oslo's trams and metro also support mobile connectivity.\n\nBergen offers stable 4G around Bryggen, Mount Floyen, and the Fish Market. Coverage remains strong in the city center before you head out on fjord tours.\n\nTromso is the largest city above the Arctic Circle and a popular base for Northern Lights viewing. In-city coverage is strong, but remote aurora observation points outside town may have weaker signal. During fjord cruises, you may temporarily lose coverage when far from shore.\n\nThe Lofoten Islands have 4G in main towns like Reine, Svolvaer, and Henningsvaer, but remote hiking trails and outer islands may have no signal."
      },
      {
        title: "Tips for Travelers in Norway",
        body: "For Northern Lights viewing, aurora forecast apps like Norway Lights or My Aurora Forecast are essential. An eSIM lets you check real-time aurora activity and find the best viewing windows. This is especially useful in Tromso and Alta during winter.\n\nIf you are taking fjord cruises or riding the Hurtigruten coastal voyage, onboard WiFi may be slow or expensive. At ports of call, your eSIM provides reliable land-based connectivity for researching local attractions.\n\nWinter driving in Norway requires checking road conditions regularly. The Norwegian Public Roads Administration (Statens vegvesen) app shows real-time road closures and restrictions. Mountain passes may close in winter, so having constant data access is a safety essential.\n\nNorway is a near-cashless society where card payments are accepted almost everywhere. Google Translate's camera feature is handy for translating Norwegian menus and signs, especially outside major tourist areas."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use a Norway eSIM in EU countries?", a: "Norway is not an EU member, so EU roaming does not automatically apply. However, Norway is part of the EEA, and some plans do include it. Always check whether Norway is listed as a covered country before purchasing." },
      { q: "Does the eSIM work during fjord cruises?", a: "Coverage is available near shorelines within fjords, but deep fjord interiors and open sea may be out of range. You will have full coverage at ports of call." },
      { q: "Can I use the eSIM at Northern Lights viewing spots?", a: "Tromso and Alta city centers have strong coverage. Remote observation points outside town may have weaker signal, but areas near major tourist facilities are generally covered." },
      { q: "How much data will I need in Norway?", a: "Typical tourist usage is 500MB to 1GB per day. Free WiFi is less common in nature areas, so a 10GB plan for 7 days is recommended over a smaller plan." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Explore Norway with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Norway eSIM Guide",
  },
  ko: {
    title: "노르웨이 eSIM 가이드 - 오슬로, 피오르, 오로라 커버리지",
    subtitle: "피오르부터 북극권까지, eSIM으로 노르웨이 여행을 편리하게",
    intro: "노르웨이는 웅장한 피오르, 오로라, 백야 등 대자연의 매력이 넘치는 북유럽 국가입니다. 주요 도시에서 고속 4G/5G 통신을 이용할 수 있으며, eSIM을 사용하면 오슬로 가르데르모엔 공항 도착 후 바로 경로 검색과 관광 안내를 이용할 수 있습니다. 노르웨이는 EU 회원국이 아니므로 EU 로밍이 적용되지 않을 수 있다는 점에 유의하세요.",
    sections: [
      {
        title: "노르웨이의 모바일 통신 환경",
        body: "노르웨이의 주요 통신사는 Telenor, Telia, Ice 3사입니다. Telenor가 노르웨이 최대 통신사로 전국에서 가장 넓은 커버리지를 보유하고 있습니다. Telia는 도시 지역에서 강력한 5G 네트워크를 운영하고 있으며, Ice는 경쟁력 있는 가격으로 서비스를 제공합니다.\n\n오슬로, 베르겐, 트론헤임, 스타방에르 등 주요 도시에서는 5G 통신이 가능하며 빠르고 안정적인 연결을 체험할 수 있습니다. 4G LTE 커버리지는 노르웨이 인구의 99% 이상을 커버합니다.\n\n다만 노르웨이는 남북으로 긴 국토와 산악 지형, 깊은 피오르 때문에 일부 오지에서는 커버리지가 제한될 수 있습니다. 북극권 일부 지역이나 로포텐 제도의 외딴 섬에서는 통신이 불안정할 수 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "노르웨이 eSIM 플랜은 오슬로 단기 체류용부터 피오르 투어를 포함한 장기 플랜까지 다양합니다. 1주일 여행이라면 5~10GB 플랜이 적당합니다. 노르웨이 도시의 호텔이나 카페에서는 무료 WiFi를 이용할 수 있지만, 자연 지역에서는 eSIM이 필수입니다.\n\n중요한 점은 노르웨이가 EU 회원국이 아니라 EEA(유럽경제지역) 회원국이라는 것입니다. 일부 EU 로밍 플랜에는 노르웨이가 포함되지 않을 수 있으니, 플랜 구매 전 노르웨이가 대상국에 포함되어 있는지 반드시 확인하세요.\n\nAutoWiFi eSIM에서는 노르웨이 전용 플랜과 북유럽 통합 플랜을 제공합니다. 테더링도 지원되어 단체 여행에도 편리합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 노르웨이 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 오슬로 가르데르모엔 공항 도착 후 바로 통신을 시작할 수 있습니다. 플리토게(공항 급행열차)에서 오슬로 시내로 이동하는 동안 바로 인터넷을 사용할 수 있습니다.\n\n노르웨이 공항에서는 무료 WiFi가 제공되지만 속도 제한이 있을 수 있습니다. eSIM이 있으면 도착 직후부터 쾌적한 통신이 가능합니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "오슬로 시내는 통신 환경이 매우 양호합니다. 왕궁, 비겔란 조각 공원, 오페라하우스, 아케르스후스 성 등 주요 관광지에서 고속 통신이 가능합니다. 오슬로의 트램과 메트로에서도 모바일 데이터를 사용할 수 있습니다.\n\n베르겐에서는 브뤼겐 지구, 플뢰옌 산, 어시장 주변에서 안정적인 4G 접속이 가능합니다. 피오르 투어 출발 전 시내에서의 통신에는 문제가 없습니다.\n\n트롬쇠는 북극권 최대 도시로 오로라 관측 거점으로 인기입니다. 시내 통신 환경은 양호하지만, 교외 오로라 관측 스폿에서는 신호가 약해질 수 있습니다. 피오르 크루즈 중에는 해안에서 멀어지면 일시적으로 권외가 될 수 있습니다.\n\n로포텐 제도에서는 레이네, 스볼베르, 헤닝스베르 등 주요 마을에서 4G를 이용할 수 있지만, 외딴 하이킹 코스나 외곽 섬에서는 신호가 닿지 않는 곳도 있습니다."
      },
      {
        title: "노르웨이 여행에서의 eSIM 활용 팁",
        body: "오로라 관측에는 오로라 예보 앱(Norway Lights, My Aurora Forecast 등)이 필수입니다. eSIM이 있으면 실시간으로 오로라 활동을 확인하고 최적의 관측 타이밍을 놓치지 않을 수 있습니다. 트롬쇠나 알타에서 겨울철 관측 시 특히 유용합니다.\n\n피오르 크루즈나 후티루텐(연안 급행선)을 이용하는 경우, 선내 WiFi가 있을 수 있지만 속도가 느린 경우가 많습니다. 기항지에서는 육상 eSIM 통신을 이용할 수 있으니 현지 관광 정보 검색에 활용하세요.\n\n겨울철 노르웨이에서 렌터카를 이용할 때는 도로 상황 확인이 중요합니다. 노르웨이 도로청(Statens vegvesen) 앱으로 실시간 도로 폐쇄 및 규제 정보를 확인할 수 있습니다. 산간 고개는 겨울에 폐쇄되는 경우가 있어 상시 데이터 통신이 가능한 환경이 안전합니다.\n\n노르웨이는 거의 모든 곳에서 카드 결제가 가능한 캐시리스 선진국입니다. Google 번역 카메라 기능으로 노르웨이어 메뉴와 간판을 즉시 번역할 수 있어 편리합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "노르웨이 eSIM으로 EU 다른 나라에서도 사용할 수 있나요?", a: "노르웨이는 EU 회원국이 아니므로 EU 로밍이 자동 적용되지 않습니다. 다만 EEA 회원국이므로 일부 플랜에서는 포함됩니다. 플랜 구매 전 노르웨이가 대상국에 포함되어 있는지 확인하세요." },
      { q: "피오르 크루즈 중에 eSIM을 사용할 수 있나요?", a: "피오르 내 해안 근처에서는 통신이 가능하지만, 피오르 깊은 곳이나 외해에서는 권외가 될 수 있습니다. 기항지에서는 정상적으로 이용할 수 있습니다." },
      { q: "오로라 관측 스폿에서 eSIM을 사용할 수 있나요?", a: "트롬쇠와 알타 시내에서는 문제없이 사용할 수 있습니다. 교외 관측 스폿에서는 신호가 약할 수 있지만 주요 관광 시설 주변은 커버되어 있습니다." },
      { q: "노르웨이에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 자연 지역에서는 무료 WiFi가 적으므로 도시 중심 여행보다 넉넉한 플랜(7일간 10GB)을 추천합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 노르웨이 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "노르웨이 eSIM 가이드",
  },
  zh: {
    title: "挪威eSIM指南 - 奥斯陆、峡湾与北极光覆盖",
    subtitle: "从峡湾到北极圈，一张eSIM畅游挪威",
    intro: "挪威以壮丽的峡湾、北极光和午夜太阳闻名于世。主要城市提供高速4G/5G覆盖，使用eSIM可以在奥斯陆加勒穆恩机场落地后立即搜索路线和查看旅游信息。请注意，挪威不是欧盟成员国，标准的EU漫游套餐可能不包含挪威。请选择明确覆盖挪威的eSIM套餐。",
    sections: [
      {
        title: "挪威移动通信概况",
        body: "挪威三大运营商为Telenor、Telia和Ice。Telenor是挪威最大的运营商，拥有全国最广的覆盖范围。Telia在城市地区拥有强大的5G网络，Ice作为第三大运营商以有竞争力的价格提供服务。\n\n奥斯陆、卑尔根、特隆赫姆、斯塔万格等主要城市均有5G覆盖，连接快速稳定。4G LTE覆盖挪威99%以上的人口。\n\n但挪威国土狭长，山区和峡湾深处可能信号不佳。北极圈部分地区和罗弗敦群岛的偏远岛屿可能出现通信不稳定的情况。"
      },
      {
        title: "推荐eSIM套餐",
        body: "挪威eSIM套餐从奥斯陆短期方案到包含峡湾游览的长期套餐应有尽有。一周挪威之旅推荐5-10GB套餐。挪威城市的酒店和咖啡馆提供免费WiFi，但在自然景区eSIM是您的可靠保障。\n\n重要提示：挪威不是欧盟成员国，而是EEA（欧洲经济区）成员国。部分EU漫游套餐可能不包含挪威。购买套餐前请务必确认挪威是否在覆盖国家列表中。\n\nAutoWiFi eSIM提供挪威专属套餐和北欧区域套餐。支持热点共享，团体出行也很方便。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买挪威套餐后，QR码会发送到您的邮箱。iPhone用户前往「设置」→「蜂窝网络」→「添加eSIM」，Android用户前往「设置」→「网络和互联网」→「SIM卡」→「添加eSIM」扫描QR码。\n\n出发前安装eSIM，到达奥斯陆加勒穆恩机场后即可立即连网。在乘坐Flytoget（机场快线）前往奥斯陆市中心的途中就能使用网络。\n\n挪威机场提供免费WiFi，但可能有速度限制。eSIM确保您从到达那一刻起就有快速可靠的网络连接。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "奥斯陆全市通信环境优秀。王宫、维格兰雕塑公园、歌剧院、阿克斯胡斯城堡等主要景点都有高速网络。奥斯陆的有轨电车和地铁也支持移动数据。\n\n卑尔根的布吕根码头区、弗洛伊恩山、鱼市场周边都有稳定的4G连接。出发前往峡湾旅行前，市区内通信没有问题。\n\n特罗姆瑟是北极圈内最大的城市，是观赏北极光的热门基地。市区内覆盖良好，但市郊的极光观测点信号可能较弱。峡湾游船期间，远离海岸时可能暂时失去信号。\n\n罗弗敦群岛的主要城镇（雷讷、斯沃尔韦尔、亨宁斯韦尔）有4G覆盖，但偏远的徒步路线和外围岛屿可能没有信号。"
      },
      {
        title: "挪威旅行eSIM使用技巧",
        body: "观赏北极光时，极光预报应用（如Norway Lights、My Aurora Forecast）必不可少。有了eSIM，您可以实时查看极光活动，不错过最佳观测时机。在特罗姆瑟和阿尔塔的冬季观测中尤为实用。\n\n乘坐峡湾游船或海达路德（Hurtigruten）沿海航线时，船上WiFi可能速度慢或费用高。在停靠港口时，eSIM可提供可靠的陆地网络连接，方便查询当地景点信息。\n\n冬季在挪威自驾需要经常查看路况。挪威公路管理局（Statens vegvesen）应用可实时显示道路封闭和限行信息。山区关口冬季可能关闭，保持数据连接是安全出行的重要保障。\n\n挪威是几乎完全无现金的社会，几乎所有地方都接受刷卡支付。Google翻译的相机功能可以即时翻译挪威语菜单和标牌，在主要旅游区以外特别有用。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "挪威eSIM能在欧盟国家使用吗？", a: "挪威不是欧盟成员国，EU漫游不会自动适用。但挪威是EEA成员国，部分套餐会包含挪威。购买前请确认挪威是否在覆盖范围内。" },
      { q: "峡湾游船期间能用eSIM吗？", a: "在峡湾内靠近海岸的区域可以通信，但峡湾深处和外海可能无信号。在停靠港口时可正常使用。" },
      { q: "北极光观测点能用eSIM吗？", a: "特罗姆瑟和阿尔塔市区内覆盖良好。市郊观测点信号可能较弱，但主要旅游设施附近一般有覆盖。" },
      { q: "在挪威大概需要多少流量？", a: "一般观光使用每天500MB-1GB。自然景区免费WiFi较少，建议选择7天10GB的套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游挪威。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "挪威eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/norway-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="norway-esim" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
