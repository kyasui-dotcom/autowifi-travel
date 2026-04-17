import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "best-esim-for-europe", title: "ヨーロッパeSIMおすすめ比較" },
      { slug: "croatia-esim", title: "クロアチアeSIMガイド" },
      { slug: "hawaii-esim", title: "ハワイeSIMガイド" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "best-esim-for-europe", title: "Best eSIM for Europe 2026" },
      { slug: "croatia-esim", title: "Croatia eSIM Guide 2026" },
      { slug: "hawaii-esim", title: "Hawaii eSIM Guide 2026" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "best-esim-for-europe", title: "유럽 eSIM 추천 비교" },
      { slug: "croatia-esim", title: "크로아티아 eSIM 가이드" },
      { slug: "hawaii-esim", title: "하와이 eSIM 가이드" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "best-esim-for-europe", title: "欧洲eSIM推荐比较" },
      { slug: "croatia-esim", title: "克罗地亚eSIM指南" },
      { slug: "hawaii-esim", title: "夏威夷eSIM指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "ギリシャeSIMガイド - アテネ・サントリーニ島のカバレッジとEUローミング",
    subtitle: "EU圏内ローミング対応eSIMでギリシャの島々を快適に巡ろう",
    intro: "ギリシャはエーゲ海の美しい島々と古代遺跡で世界中の旅行者を魅了する人気の観光地です。アテネを中心にモバイル通信が整備されており、eSIMを利用すればアテネ国際空港到着後すぐにGoogle Mapsでアクロポリスへのルート検索やフェリーの時刻表確認が可能です。EU圏内ローミング対応プランなら、ギリシャからイタリアやトルコへの周遊旅行にも便利です。本記事ではEU圏内ローミング対応eSIMでギリシャの島々を快適に巡ろう・ギリシャのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "ギリシャのモバイル通信事情",
        body: "ギリシャの主要通信キャリアはCosmote、Vodafone Greece、Wind Hellasの3社です。Cosmoteがギリシャ最大のキャリアで、本土と島嶼部の両方で最も広いカバレッジを持っています。旅行者向けeSIMプランはCosmoteまたはVodafone Greeceの回線を利用するものが多く、主要都市では安定した通信が可能です。\n\nアテネ市内では4G LTE通信が広く利用可能で、5Gも一部エリアで展開が始まっています。テッサロニキなどの主要都市でも4G LTEが安定して利用できます。\n\nギリシャは島嶼部が多いため、通信環境は島によって異なります。サントリーニ島やミコノス島などの人気観光島では良好なカバレッジがありますが、小さな離島では3Gに切り替わることがあります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "ギリシャ向けeSIMプランは、アテネ滞在向けの短期プランから、島巡りを含む長期プランまで用意されています。1週間のギリシャ旅行なら5〜7GBプランがおすすめです。フェリーの予約確認や島間の移動情報をチェックするのにデータ通信は欠かせません。\n\nEUローミング対応プランを選べば、ギリシャからイタリアへのフェリー移動や、トルコへの日帰りツアー（EU外のため要確認）でも便利です。ヨーロッパ周遊旅行を計画している場合はEU対応プランが断然お得です。\n\nAutoWiFi eSIMでは、ギリシャ専用プランとヨーロッパ周遊プランの両方を提供しています。テザリングにも対応しているので、ビーチでタブレットを使いたい場合にも便利です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでギリシャプランを購入後、QRコードがメールで届きます。iPhoneは「設定→モバイル通信→eSIMを追加」、Androidは「設定→ネットワークとインターネット→SIM→eSIMを追加」からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、アテネ国際空港（エレフテリオス・ヴェニゼロス空港）に到着後すぐに通信を開始できます。空港からアテネ市内へのメトロやバスの中からインターネットが使えるのは大きなメリットです。\n\nギリシャの空港ではフリーWiFiが提供されていますが、速度が遅い場合があります。eSIMがあれば、到着直後から安定した通信が可能です。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "アテネ市内は通信環境が良好で、アクロポリス周辺、プラカ地区、シンタグマ広場、モナスティラキなど主要観光エリアで安定した通信が利用可能です。アテネのメトロ駅構内でもモバイルデータが利用できます。\n\nサントリーニ島ではフィラ、イア、カマリビーチなどの主要エリアで4G通信が利用可能です。ミコノス島も観光エリアでの通信は良好です。クレタ島はギリシャ最大の島で、イラクリオンやハニアなどの主要都市で安定したカバレッジがあります。\n\nロードス島の旧市街やリンドスでも通信は問題ありません。テッサロニキは本土第二の都市として良好なカバレッジを持っています。ただし、小さな離島や山岳部の遺跡では電波が弱くなることがあります。"
      },
      {
        title: "ギリシャ旅行でのeSIM活用のコツ",
        body: "ギリシャの島巡り（アイランドホッピング）では、フェリーの予約・時刻確認にデータ通信が欠かせません。FerryHopperやGreek Ferriesアプリを使えば、リアルタイムで運航状況を確認できます。フェリー航行中は沖合では電波が届きにくいですが、島に近づくと再接続されます。\n\n古代遺跡の観光では、現地の解説板だけでなくGoogle翻訳やオーディオガイドアプリを活用するとより深く楽しめます。アクロポリスやデルフィなど人気遺跡ではオンラインチケット予約が推奨されています。\n\nギリシャのタベルナ（食堂）やレストランの検索にはGoogle MapsやTripAdvisorが便利です。eSIMがあれば、ビーチや路地を散策しながら近くのおすすめレストランを探せます。また、サントリーニ島の夕日スポットやミコノス島のビーチクラブの情報もリアルタイムで検索できます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ギリシャの島でもeSIMは使えますか？", a: "サントリーニ島、ミコノス島、クレタ島、ロードス島など人気の観光島では4G通信が利用可能です。ただし小さな離島では3Gに切り替わることがあります。" },
      { q: "フェリー移動中もeSIMは使えますか？", a: "港や島に近いエリアでは通信可能ですが、外洋航行中は電波が届きにくくなります。島に近づくと自動的に再接続されます。" },
      { q: "ギリシャのeSIMでEU他国でも使えますか？", a: "EUローミング対応プランであれば、イタリア、スペイン、フランスなどEU加盟国で追加料金なしで利用できます。トルコはEU外のため別途確認が必要です。" },
      { q: "ギリシャでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。島巡りでフェリー予約やマップ利用が多い場合は、7日間7GBプランがおすすめです。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでギリシャの島巡りをもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ギリシャeSIMガイド",
  },
  en: {
    title: "Greece eSIM Guide - Athens, Islands & EU Roaming Coverage",
    subtitle: "Stay connected while island hopping across Greece with one eSIM",
    intro: "Greece draws millions of visitors each year with its stunning Aegean islands, ancient ruins, and vibrant cities. Athens and major islands have solid mobile coverage, and an eSIM lets you look up ferry schedules and navigate to the Acropolis the moment you land at Athens International Airport. Plans with EU roaming make combining Greece with other European destinations seamless.",
    sections: [
      {
        title: "Greece's Mobile Network Overview",
        body: "Greece has three major carriers: Cosmote, Vodafone Greece, and Wind Hellas. Cosmote is the largest operator with the widest coverage across both the mainland and islands. Travel eSIM plans typically use Cosmote or Vodafone Greece networks, delivering reliable connectivity in major cities and popular tourist destinations.\n\nAthens has widespread 4G LTE coverage, and 5G is beginning to roll out in select areas. Thessaloniki, Greece's second-largest city, also offers stable 4G LTE coverage throughout the urban area.\n\nBecause Greece has thousands of islands, coverage varies by location. Popular tourist islands like Santorini, Mykonos, and Crete have strong 4G coverage, while smaller remote islands may occasionally fall back to 3G."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Greece eSIM plans range from short city-break options to longer plans suited for island-hopping itineraries. A 5-7GB plan works well for a one-week trip. Data connectivity is essential for checking ferry bookings and navigating between islands.\n\nPlans with EU roaming let you use the same eSIM when taking a ferry to Italy or visiting nearby EU countries. If you are planning a multi-country Mediterranean trip, an EU-wide plan is the most economical choice.\n\nAutoWiFi eSIM offers both Greece-only and Europe-wide plans. Tethering is supported, which is handy when you want to use a tablet on the beach or share your connection with travel companions."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Greece plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure so you can start using data immediately at Athens International Airport (Eleftherios Venizelos). Being connected on the metro or bus ride into central Athens is a big advantage for navigating an unfamiliar city.\n\nGreek airports offer free WiFi, but speeds can be slow. An eSIM provides reliable connectivity from the moment you arrive."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Athens has strong coverage throughout the city. The Acropolis area, Plaka district, Syntagma Square, and Monastiraki all offer stable data connectivity. The Athens Metro also supports mobile data inside stations.\n\nSantorini has 4G coverage in Fira, Oia, and Kamari Beach. Mykonos also has reliable coverage in its main tourist areas. Crete, the largest Greek island, offers stable connectivity in Heraklion, Chania, and along the northern coast.\n\nRhodes has good coverage in the Old Town and Lindos. Thessaloniki provides excellent connectivity across the city. However, smaller remote islands and mountainous archaeological sites may have weaker signal in some spots."
      },
      {
        title: "Tips for Using eSIM in Greece",
        body: "Island hopping is one of the highlights of a Greek trip, and data connectivity is crucial for managing ferry bookings. Apps like FerryHopper and Greek Ferries let you check real-time sailing schedules and delays. During open-sea crossings, signal may drop, but it reconnects as you approach each island.\n\nAt archaeological sites, having data access lets you use Google Translate and audio guide apps to enhance your visit. Online ticket booking is recommended for popular sites like the Acropolis and Delphi to skip long queues.\n\nGoogle Maps and TripAdvisor are the best tools for finding tavernas and restaurants in Greece. With an eSIM, you can search for nearby dining options while strolling along the waterfront or exploring back streets. Real-time searches also help you find the best sunset spots on Santorini or beach clubs on Mykonos."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work on Greek islands?", a: "Yes, popular islands like Santorini, Mykonos, Crete, and Rhodes have 4G coverage. Smaller remote islands may fall back to 3G in some areas." },
      { q: "Will the eSIM work during ferry crossings?", a: "You will have signal near ports and islands, but coverage drops during open-sea crossings. The connection restores automatically as you approach the next island." },
      { q: "Can I use a Greece eSIM in other EU countries?", a: "Plans with EU roaming work in Italy, Spain, France, and other EU member states at no extra charge. Turkey is outside the EU, so check your plan details separately." },
      { q: "How much data will I need in Greece?", a: "Typical tourist usage is 500MB to 1GB per day. If you are island hopping and using ferry apps and maps frequently, a 7GB plan for 7 days is a good choice." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Explore the Greek islands with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Greece eSIM Guide",
  },
  ko: {
    title: "그리스 eSIM 가이드 - 아테네, 산토리니, 섬 여행 커버리지",
    subtitle: "EU 로밍 대응 eSIM으로 그리스 섬 여행을 편리하게",
    intro: "그리스는 아름다운 에게해의 섬들과 고대 유적으로 전 세계 여행자들을 매료시키는 인기 관광지입니다. 아테네를 중심으로 모바일 통신이 잘 갖춰져 있으며, eSIM을 이용하면 아테네 국제공항 도착 후 바로 Google Maps로 아크로폴리스 경로 검색이나 페리 시간표 확인이 가능합니다. EU 로밍 대응 플랜이라면 그리스에서 이탈리아나 다른 유럽 국가로의 여행에도 편리합니다.",
    sections: [
      {
        title: "그리스의 모바일 통신 환경",
        body: "그리스의 주요 통신사는 Cosmote, Vodafone Greece, Wind Hellas 3사입니다. Cosmote가 그리스 최대 통신사로, 본토와 섬 지역 모두에서 가장 넓은 커버리지를 보유하고 있습니다. 여행자용 eSIM은 주로 Cosmote 또는 Vodafone Greece 회선을 사용합니다.\n\n아테네 시내에서는 4G LTE 통신이 널리 이용 가능하며, 일부 지역에서 5G 전개가 시작되었습니다. 테살로니키 등 주요 도시에서도 안정적인 4G LTE를 이용할 수 있습니다.\n\n그리스는 수천 개의 섬이 있어 통신 환경은 섬에 따라 다릅니다. 산토리니, 미코노스, 크레타 등 인기 관광 섬에서는 양호한 4G 커버리지가 있지만, 작은 외딴 섬에서는 3G로 전환될 수 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "그리스 eSIM 플랜은 도시 체류용 단기 플랜부터 섬 여행을 포함한 장기 플랜까지 다양합니다. 1주일 그리스 여행이라면 5~7GB 플랜이 적당합니다. 페리 예약 확인과 섬 간 이동 정보 확인에 데이터 통신이 필수입니다.\n\nEU 로밍 대응 플랜을 선택하면 그리스에서 이탈리아로 페리를 타거나 다른 EU 국가를 방문할 때도 같은 eSIM으로 통신할 수 있습니다. 지중해 여러 나라를 방문할 계획이라면 EU 대응 플랜이 가장 경제적입니다.\n\nAutoWiFi eSIM에서는 그리스 전용 플랜과 유럽 통합 플랜을 모두 제공합니다. 테더링도 지원되어 해변에서 태블릿을 사용하거나 동행자와 연결을 공유하기에 편리합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 그리스 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 아테네 국제공항(엘레프테리오스 베니젤로스 공항) 도착 후 바로 통신을 시작할 수 있습니다. 공항에서 아테네 시내로 이동하는 메트로나 버스에서부터 인터넷을 사용할 수 있습니다.\n\n그리스 공항에서는 무료 WiFi가 제공되지만 속도가 느린 경우가 있습니다. eSIM이 있으면 안정적인 통신이 가능합니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "아테네 시내는 통신 환경이 양호합니다. 아크로폴리스 주변, 플라카 지구, 신타그마 광장, 모나스티라키 등 주요 관광 지역에서 안정적인 통신이 가능합니다. 아테네 메트로 역 구내에서도 모바일 데이터를 사용할 수 있습니다.\n\n산토리니에서는 피라, 이아, 카마리 비치 등 주요 지역에서 4G 통신이 가능합니다. 미코노스도 관광 지역에서의 통신이 양호합니다. 크레타 섬은 그리스 최대의 섬으로 이라클리온과 하니아 등 주요 도시에서 안정적인 커버리지를 제공합니다.\n\n로도스 구시가지와 린도스에서도 통신은 문제없습니다. 테살로니키는 본토 제2의 도시로 양호한 커버리지를 갖추고 있습니다. 다만 작은 외딴 섬이나 산악 지역의 유적지에서는 신호가 약해질 수 있습니다."
      },
      {
        title: "그리스 여행에서의 eSIM 활용 팁",
        body: "그리스 여행의 하이라이트인 아일랜드 호핑에서는 페리 예약과 시간표 확인에 데이터 통신이 필수입니다. FerryHopper나 Greek Ferries 앱을 사용하면 실시간 운항 상황과 지연 정보를 확인할 수 있습니다. 외해 항해 중에는 신호가 약해지지만 섬에 가까워지면 다시 연결됩니다.\n\n고대 유적 관광에서는 Google 번역이나 오디오 가이드 앱을 활용하면 더 깊이 있게 즐길 수 있습니다. 아크로폴리스나 델피 같은 인기 유적지에서는 긴 줄을 피하기 위해 온라인 티켓 예매가 권장됩니다.\n\nGoogle Maps와 TripAdvisor는 그리스 타베르나(식당)와 레스토랑 검색에 가장 편리합니다. eSIM이 있으면 해변가나 골목길을 산책하면서 근처 맛집을 찾을 수 있습니다. 산토리니의 석양 명소나 미코노스의 비치 클럽 정보도 실시간으로 검색할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "그리스 섬에서도 eSIM을 사용할 수 있나요?", a: "산토리니, 미코노스, 크레타, 로도스 등 인기 관광 섬에서는 4G 통신이 가능합니다. 작은 외딴 섬에서는 3G로 전환될 수 있습니다." },
      { q: "페리 이동 중에도 eSIM을 사용할 수 있나요?", a: "항구나 섬 근처에서는 통신이 가능하지만, 외해 항해 중에는 신호가 약해집니다. 다음 섬에 가까워지면 자동으로 다시 연결됩니다." },
      { q: "그리스 eSIM으로 EU 다른 나라에서도 사용할 수 있나요?", a: "EU 로밍 대응 플랜이면 이탈리아, 스페인, 프랑스 등 EU 회원국에서 추가 요금 없이 이용할 수 있습니다. 터키는 EU 외 국가이므로 별도 확인이 필요합니다." },
      { q: "그리스에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 아일랜드 호핑으로 페리 앱과 지도를 자주 사용한다면 7일간 7GB 플랜이 추천됩니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 그리스 섬 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "그리스 eSIM 가이드",
  },
  zh: {
    title: "希腊eSIM指南 - 雅典、圣托里尼岛及EU漫游覆盖",
    subtitle: "一张eSIM畅游希腊群岛和欧盟",
    intro: "希腊以美丽的爱琴海岛屿和古代遗迹吸引着全球旅行者。雅典及主要岛屿拥有良好的移动通信覆盖，使用eSIM可以在雅典国际机场落地后立即搜索前往卫城的路线和查看渡轮时刻表。支持EU漫游的套餐让希腊与其他欧洲目的地的组合行程更加顺畅。",
    sections: [
      {
        title: "希腊移动通信概况",
        body: "希腊三大运营商为Cosmote、Vodafone Greece和Wind Hellas。Cosmote是希腊最大的运营商，在大陆和岛屿地区都拥有最广的覆盖范围。旅行者eSIM套餐通常使用Cosmote或Vodafone Greece网络，在主要城市和热门旅游目的地提供可靠连接。\n\n雅典市内4G LTE覆盖广泛，5G正在部分区域开始部署。塞萨洛尼基作为希腊第二大城市，也提供稳定的4G LTE覆盖。\n\n由于希腊拥有数千座岛屿，通信覆盖因地而异。圣托里尼、米科诺斯、克里特等热门旅游岛屿有良好的4G覆盖，但较小的偏远岛屿可能会降至3G。"
      },
      {
        title: "推荐eSIM套餐",
        body: "希腊eSIM套餐从城市短期方案到适合跳岛游的长期套餐应有尽有。一周希腊行程选择5-7GB套餐较为合适。查看渡轮预订和岛屿间导航需要数据连接。\n\n选择支持EU漫游的套餐，从希腊乘渡轮去意大利或访问其他EU国家时都能用同一eSIM上网。如果计划地中海多国游，EU通用套餐最为经济。\n\nAutoWiFi eSIM提供希腊专属套餐和欧洲通用套餐。支持热点共享，方便在海滩使用平板电脑或与同行伙伴共享网络。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买希腊套餐后，QR码会发送到您的邮箱。iPhone用户前往「设置→蜂窝网络→添加eSIM」，Android用户前往「设置→网络和互联网→SIM卡→添加eSIM」扫描QR码。\n\n出发前安装eSIM，到达雅典国际机场（埃莱夫塞里奥斯·韦尼泽洛斯机场）后即可立即连网。在乘坐地铁或巴士前往雅典市中心的途中就能使用网络，非常方便。\n\n希腊机场提供免费WiFi，但速度可能较慢。eSIM确保您从到达那一刻起就有可靠的网络连接。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "雅典全市通信环境良好。卫城周边、普拉卡区、宪法广场、莫纳斯提拉基等主要景区都有稳定的数据连接。雅典地铁站台内也可使用移动数据。\n\n圣托里尼的菲拉、伊亚、卡马利海滩等主要区域有4G覆盖。米科诺斯的主要旅游区通信也很可靠。克里特岛是希腊最大的岛屿，伊拉克利翁和哈尼亚等主要城市有稳定的覆盖。\n\n罗得岛旧城和林多斯的通信没有问题。塞萨洛尼基作为大陆第二大城市，覆盖情况优秀。不过，较小的偏远岛屿和山区考古遗址的信号可能较弱。"
      },
      {
        title: "希腊旅行eSIM使用技巧",
        body: "跳岛游是希腊旅行的亮点之一，管理渡轮预订需要数据连接。FerryHopper和Greek Ferries等应用可以实时查看航班时刻和延误信息。在外海航行中信号可能中断，但接近岛屿时会自动重连。\n\n在考古遗址参观时，有数据连接可以使用Google翻译和语音导览应用，让参观体验更加丰富。卫城和德尔菲等热门景点建议在线购票以避免排长队。\n\nGoogle Maps和TripAdvisor是在希腊寻找小酒馆和餐厅的最佳工具。有了eSIM，您可以在海滨散步或探索小巷时搜索附近的餐饮选择。还能实时搜索圣托里尼的最佳日落观赏点和米科诺斯的海滩俱乐部信息。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "希腊的岛屿上能用eSIM吗？", a: "圣托里尼、米科诺斯、克里特、罗得岛等热门旅游岛屿有4G覆盖。较小的偏远岛屿可能会降至3G。" },
      { q: "渡轮航行中能用eSIM吗？", a: "在港口和岛屿附近有信号，但外海航行中覆盖会中断。接近下一个岛屿时会自动重新连接。" },
      { q: "希腊eSIM能在其他欧盟国家使用吗？", a: "支持EU漫游的套餐可在意大利、西班牙、法国等欧盟成员国免费使用。土耳其不属于欧盟，请另行确认套餐详情。" },
      { q: "在希腊大概需要多少流量？", a: "一般观光使用每天500MB-1GB。如果进行跳岛游并频繁使用渡轮应用和地图，7天7GB套餐是不错的选择。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游希腊群岛。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "希腊eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/greece-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const rel = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="greece-esim" content={CONTENT[loc]} relatedArticles={rel.articles} relatedTitle={rel.title} />;
}
