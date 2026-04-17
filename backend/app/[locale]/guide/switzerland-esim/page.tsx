import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "france-esim", title: "フランスeSIMガイド" },
      { slug: "germany-esim", title: "ドイツeSIMガイド" },
      { slug: "europe-travel-connectivity", title: "ヨーロッパ旅行の通信ガイド" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "france-esim", title: "France eSIM Guide" },
      { slug: "germany-esim", title: "Germany eSIM Guide" },
      { slug: "europe-travel-connectivity", title: "Europe Travel Connectivity Guide" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "france-esim", title: "프랑스 eSIM 가이드" },
      { slug: "germany-esim", title: "독일 eSIM 가이드" },
      { slug: "europe-travel-connectivity", title: "유럽 여행 통신 가이드" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "france-esim", title: "法国eSIM指南" },
      { slug: "germany-esim", title: "德国eSIM指南" },
      { slug: "europe-travel-connectivity", title: "欧洲旅行通信指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "スイスeSIMガイド - チューリッヒ・ジュネーブ・アルプス地域のカバレッジ",
    subtitle: "スイス専用eSIMでアルプスの絶景旅行を快適に",
    intro: "スイスはアルプスの雄大な自然と精密な鉄道網で知られる観光大国です。チューリッヒやジュネーブなどの主要都市では高速モバイル通信が利用可能で、eSIMを使えばチューリッヒ空港到着後すぐにSBB（スイス連邦鉄道）アプリで列車の予約やGoogle Mapsでの移動案内が可能です。ただし、スイスはEU加盟国ではないため、EU圏内ローミングプランでは通常カバーされない点に注意が必要です。スイス旅行には専用プランの準備が不可欠です。",
    sections: [
      {
        title: "スイスのモバイル通信事情",
        body: "スイスの主要通信キャリアはSwisscom、Sunrise、Saltの3社です。Swisscomが最大のカバレッジを誇り、山岳地帯を含む全国で最も安定した通信を提供しています。Sunriseも5Gネットワークを積極的に展開しており、都市部では高速通信が可能です。旅行者向けeSIMプランはSwisscomまたはSunriseの回線を利用するものが多く、スイス全土で安定した通信が期待できます。\n\nチューリッヒ、ジュネーブ、ベルンなどの主要都市では5G通信が広く利用可能で、下り200Mbps以上の高速通信を体験できます。スイスの通信インフラは世界でもトップクラスの品質を誇ります。\n\nスイスはEU加盟国ではないため、一般的なEUローミングプランではスイスがカバーされません。周辺のフランス、ドイツ、イタリアからスイスに入国すると、EUローミングが使えなくなる場合がほとんどです。スイス専用のeSIMプランを事前に準備することを強くおすすめします。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "スイスは物価が高い国として知られており、現地SIMカードの購入も高額になりがちです。eSIMであれば事前に手頃なプランを購入できるため、コスト面でも大きなメリットがあります。1週間のスイス旅行なら5〜10GBプランがおすすめです。山岳リゾートではフリーWiFiが限られるため、都市部よりもデータ消費が多くなる傾向があります。\n\nスイスとEU諸国を周遊する場合は、スイスを含むヨーロッパ広域プランを選ぶのが便利です。一般的なEU専用プランではスイスが対象外のため、必ずスイスが含まれているか確認してください。\n\nAutoWiFi eSIMでは、スイス専用プランとスイスを含むヨーロッパ広域プランの両方を提供しています。テザリングにも対応しているので、グループ旅行でのデータ共有にも便利です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでスイスプランを購入後、QRコードがメールで届きます。iPhoneは「設定→モバイル通信→eSIMを追加」、Androidは「設定→ネットワークとインターネット→SIM→eSIMを追加」からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、チューリッヒ空港やジュネーブ空港に到着後すぐに通信を開始できます。チューリッヒ空港から市内への列車は約10分で、車内からすぐにインターネットが使えます。\n\nスイスの空港ではフリーWiFiが提供されていますが、時間制限がある場合があります。eSIMがあれば到着直後から安定した通信が可能で、SBBアプリでの列車検索やSwiss Travel Passのアクティベーションもスムーズに行えます。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "チューリッヒ市内は通信環境が非常に良好で、バーンホフ通り、チューリッヒ湖畔、旧市街などすべての主要エリアで高速通信が利用可能です。ジュネーブもレマン湖畔の大噴水周辺や国連欧州本部エリアを含め、全域でカバレッジが充実しています。\n\nベルン旧市街（世界遺産）やルツェルンのカペル橋周辺でも安定した通信が可能です。インターラーケンはユングフラウ地方への玄関口として通信環境が整備されており、周辺のグリンデルワルトやラウターブルンネンでも谷間の集落では概ね良好な接続が可能です。\n\nツェルマット（マッターホルン）やサンモリッツなどの山岳リゾートでは、町中心部や主要なスキー場エリアでは通信可能ですが、標高が高い登山ルートやリフト上では電波が弱くなったり圏外になる場合があります。ゴルナーグラート展望台やユングフラウヨッホなど人気の展望台では概ねモバイル通信が整備されています。"
      },
      {
        title: "スイス旅行でのeSIM活用のコツ",
        body: "スイス旅行で最も便利なアプリはSBB Mobile（スイス連邦鉄道公式アプリ）です。列車の時刻表検索、チケット購入、リアルタイムの遅延情報がすべてこのアプリで確認でき、eSIMがあればどこでも最新情報にアクセスできます。Swiss Travel Passを利用する場合も、アプリでの提示が可能です。\n\nスイスは4つの公用語（ドイツ語、フランス語、イタリア語、ロマンシュ語）を持つ多言語国家です。地域によって言語が異なるため、Google翻訳のカメラ機能があれば看板やメニューの言語が変わっても対応できます。チューリッヒはドイツ語、ジュネーブはフランス語、ルガーノはイタリア語圏です。\n\n氷河急行やベルニナ急行など人気の観光列車では、車窓からの絶景をSNSにリアルタイムでシェアしたい場面も多いでしょう。主要路線沿いでは概ねモバイル通信が可能ですが、長いトンネル区間では一時的に接続が途切れることがあります。スキーリゾートでは、ゲレンデマップやリフト情報のアプリを活用するためにもデータ接続が重要です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "EU用eSIMはスイスでも使えますか？", a: "一般的なEUローミング対応プランではスイスはカバーされません。スイスはEU加盟国ではないため、スイスを含むプランまたはスイス専用プランを別途用意する必要があります。購入前にスイスが対象国に含まれているか必ず確認してください。" },
      { q: "アルプス山岳地帯でもeSIMは使えますか？", a: "ツェルマットやサンモリッツなどのリゾート町中心部では問題なく利用できます。ゴルナーグラートやユングフラウヨッホなどの主要展望台でも概ね通信可能です。ただし、高山の登山ルートや人里離れた場所では圏外になることがあります。" },
      { q: "スイスでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。山岳リゾートではフリーWiFiが限られるため、都市部より多めのデータが必要になることがあります。1週間の旅行なら7〜10GBプランがおすすめです。" },
      { q: "スイスの観光列車内でeSIMは使えますか？", a: "氷河急行やベルニナ急行などの主要路線沿いでは概ねモバイル通信が可能です。ただし、長いトンネル区間では一時的に接続が途切れることがあります。SBBアプリは事前にオフラインデータをダウンロードしておくと安心です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでスイス旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "スイスeSIMガイド",
  },
  en: {
    title: "Switzerland eSIM Guide - Zurich, Geneva & Alpine Coverage",
    subtitle: "Stay connected across Switzerland with a dedicated eSIM",
    intro: "Switzerland is renowned for its stunning Alpine scenery and precision rail network. Major cities like Zurich and Geneva offer high-speed mobile connectivity, and an eSIM lets you book trains on the SBB app and navigate with Google Maps the moment you land. Importantly, Switzerland is NOT an EU member state, so standard EU roaming plans typically do not cover it. A dedicated Switzerland eSIM plan is essential for your trip.",
    sections: [
      {
        title: "Switzerland's Mobile Network Overview",
        body: "Switzerland has three major carriers: Swisscom, Sunrise, and Salt. Swisscom has the largest coverage footprint, providing the most reliable connectivity across the country, including mountainous areas. Sunrise is also aggressively expanding its 5G network with strong urban coverage. Travel eSIM plans typically use Swisscom or Sunrise networks, ensuring stable connectivity throughout Switzerland.\n\nZurich, Geneva, and Bern offer widespread 5G with speeds exceeding 200 Mbps. Switzerland's telecommunications infrastructure ranks among the best in the world.\n\nBecause Switzerland is not an EU member, standard EU roaming plans do not include Switzerland. If you travel from France, Germany, or Italy into Switzerland, your EU roaming will likely stop working. Preparing a dedicated Switzerland eSIM plan before your trip is strongly recommended."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Switzerland is known for its high cost of living, and local SIM cards can be expensive. An eSIM lets you purchase an affordable plan in advance, saving you money. A 5-10GB plan works well for a one-week Swiss trip. Mountain resorts often have limited free WiFi, so data consumption tends to be higher than in cities.\n\nIf you are combining Switzerland with neighboring EU countries, choose a Europe-wide plan that explicitly includes Switzerland. Generic EU-only plans will not cover Switzerland, so always verify that Switzerland is listed as a covered country.\n\nAutoWiFi eSIM offers both Switzerland-specific plans and Europe-wide plans that include Switzerland. Tethering is supported, making it convenient for group travel."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Switzerland plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to start using data immediately at Zurich Airport or Geneva Airport. The train from Zurich Airport to the city center takes about 10 minutes, and you can be online for the entire ride.\n\nSwiss airports offer free WiFi, but it may have time limits. An eSIM ensures stable connectivity from arrival, letting you search trains on the SBB app or activate your Swiss Travel Pass without interruption."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Zurich has excellent coverage throughout the city. Bahnhofstrasse, the Lake Zurich waterfront, and the Old Town all offer fast data. Geneva also has comprehensive coverage, including the Jet d'Eau lakefront area and the United Nations district.\n\nBern's UNESCO Old Town and Lucerne's Chapel Bridge area both have reliable connectivity. Interlaken, the gateway to the Jungfrau region, has well-established coverage, and nearby villages like Grindelwald and Lauterbrunnen generally have good connectivity in the valley settlements.\n\nMountain resorts like Zermatt (Matterhorn) and St. Moritz have coverage in town centers and major ski areas. However, high-altitude hiking trails and remote lifts may have weak or no signal. Popular viewpoints such as Gornergrat and Jungfraujoch generally have mobile connectivity."
      },
      {
        title: "Tips for Using eSIM in Switzerland",
        body: "The most essential app for Swiss travel is SBB Mobile (the official Swiss Federal Railways app). It handles timetable searches, ticket purchases, and real-time delay information. With an eSIM, you can access the latest schedule anywhere. If you have a Swiss Travel Pass, you can display it digitally in the app.\n\nSwitzerland has four official languages: German, French, Italian, and Romansh. The language changes by region, so Google Translate's camera feature is invaluable for reading signs and menus. Zurich speaks German, Geneva speaks French, and Lugano speaks Italian.\n\nPopular scenic trains like the Glacier Express and Bernina Express run through breathtaking landscapes. Mobile coverage along major routes is generally available, though long tunnel sections may cause temporary disconnections. At ski resorts, data connectivity is important for accessing piste maps and lift status apps."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does my EU eSIM plan work in Switzerland?", a: "Most standard EU roaming plans do not cover Switzerland, as it is not an EU member state. You need a plan that specifically includes Switzerland or a dedicated Switzerland plan. Always verify Switzerland is listed as a covered country before purchasing." },
      { q: "Does the eSIM work in the Swiss Alps?", a: "Resort towns like Zermatt and St. Moritz have reliable coverage in their centers. Popular viewpoints like Gornergrat and Jungfraujoch generally have connectivity. However, remote high-altitude hiking trails may have no signal." },
      { q: "How much data will I need in Switzerland?", a: "Typical tourist usage is 500MB to 1GB per day. Mountain resorts often have limited WiFi, so you may use more data than in cities. A 7-10GB plan for one week is recommended." },
      { q: "Does the eSIM work on Swiss scenic trains?", a: "Major scenic routes like the Glacier Express and Bernina Express generally have mobile coverage. Long tunnel sections may cause temporary disconnections. Download offline data in the SBB app as a backup." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Switzerland with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Switzerland eSIM Guide",
  },
  ko: {
    title: "스위스 eSIM 가이드 - 취리히, 제네바, 알프스 커버리지",
    subtitle: "스위스 전용 eSIM으로 알프스 여행을 편리하게",
    intro: "스위스는 웅장한 알프스 자연경관과 정밀한 철도망으로 유명한 관광 대국입니다. 취리히와 제네바 등 주요 도시에서 고속 모바일 통신을 이용할 수 있으며, eSIM을 사용하면 취리히 공항 도착 후 바로 SBB(스위스 연방 철도) 앱으로 기차를 예약하고 Google Maps로 이동할 수 있습니다. 중요한 점은 스위스는 EU 회원국이 아니므로 일반적인 EU 로밍 플랜에는 포함되지 않는다는 것입니다. 스위스 여행에는 전용 eSIM 플랜이 필수입니다.",
    sections: [
      {
        title: "스위스의 모바일 통신 환경",
        body: "스위스의 주요 통신사는 Swisscom, Sunrise, Salt 3사입니다. Swisscom이 가장 넓은 커버리지를 보유하고 있으며 산악 지역을 포함한 전국에서 가장 안정적인 통신을 제공합니다. Sunrise도 5G 네트워크를 적극 확장 중이며 도시 지역에서 빠른 통신을 제공합니다. 여행자용 eSIM은 주로 Swisscom 또는 Sunrise 회선을 사용합니다.\n\n취리히, 제네바, 베른 등 주요 도시에서는 5G 통신이 널리 이용 가능하며, 200Mbps 이상의 고속 통신을 체험할 수 있습니다. 스위스의 통신 인프라는 세계 최고 수준입니다.\n\n스위스는 EU 회원국이 아니므로 일반적인 EU 로밍 플랜에는 스위스가 포함되지 않습니다. 프랑스, 독일, 이탈리아에서 스위스로 입국하면 EU 로밍이 작동하지 않을 가능성이 높습니다. 스위스 전용 eSIM 플랜을 사전에 준비하는 것을 강력히 권장합니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "스위스는 물가가 높은 나라로 알려져 있으며 현지 SIM 카드 구매도 비용이 많이 듭니다. eSIM으로 사전에 합리적인 플랜을 구매하면 비용을 절약할 수 있습니다. 1주일 스위스 여행이라면 5~10GB 플랜이 적당합니다. 산악 리조트에서는 무료 WiFi가 제한적이므로 도시보다 데이터 소비가 많은 경향이 있습니다.\n\n스위스와 주변 EU 국가를 함께 여행하는 경우, 스위스를 포함하는 유럽 광역 플랜을 선택하세요. 일반 EU 전용 플랜에는 스위스가 포함되지 않으므로 반드시 스위스가 대상 국가에 포함되어 있는지 확인하세요.\n\nAutoWiFi eSIM에서는 스위스 전용 플랜과 스위스를 포함하는 유럽 광역 플랜을 모두 제공합니다. 테더링도 지원되어 그룹 여행에도 편리합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 스위스 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 취리히 공항이나 제네바 공항 도착 후 바로 통신을 시작할 수 있습니다. 취리히 공항에서 시내까지 기차로 약 10분이며, 이동 중에도 인터넷을 사용할 수 있습니다.\n\n스위스 공항에서는 무료 WiFi가 제공되지만 시간 제한이 있을 수 있습니다. eSIM이 있으면 도착 직후부터 안정적인 통신이 가능하며, SBB 앱으로 기차를 검색하거나 Swiss Travel Pass를 활성화할 수 있습니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "취리히 시내는 통신 환경이 매우 양호합니다. 반호프 거리, 취리히 호수 주변, 구시가지 등 모든 주요 지역에서 고속 통신이 가능합니다. 제네바도 레만 호수의 대분수 주변과 UN 유럽 본부 지역을 포함하여 전역에서 커버리지가 충실합니다.\n\n베른 구시가지(유네스코 세계유산)와 루체른의 카펠 다리 주변에서도 안정적인 통신이 가능합니다. 인터라켄은 융프라우 지역의 관문으로 통신 환경이 잘 갖추어져 있으며, 주변의 그린델발트와 라우터브루넨에서도 계곡 마을에서는 대체로 양호한 접속이 가능합니다.\n\n체르마트(마터호른)와 생모리츠 같은 산악 리조트에서는 마을 중심부와 주요 스키장 지역에서 통신이 가능합니다. 다만, 높은 고도의 등산로나 외진 리프트에서는 신호가 약하거나 권외가 될 수 있습니다. 고르너그라트 전망대와 융프라우요흐 등 인기 전망대에서는 대체로 모바일 통신이 가능합니다."
      },
      {
        title: "스위스 여행에서의 eSIM 활용 팁",
        body: "스위스 여행에서 가장 유용한 앱은 SBB Mobile(스위스 연방 철도 공식 앱)입니다. 기차 시간표 검색, 티켓 구매, 실시간 지연 정보를 모두 이 앱에서 확인할 수 있으며, eSIM이 있으면 어디서든 최신 정보에 접근할 수 있습니다. Swiss Travel Pass를 이용하는 경우 앱에서 디지털로 제시할 수 있습니다.\n\n스위스는 4개의 공용어(독일어, 프랑스어, 이탈리아어, 로만슈어)를 가진 다국어 국가입니다. 지역에 따라 언어가 달라지므로 Google 번역 카메라 기능이 간판이나 메뉴를 읽는 데 매우 유용합니다. 취리히는 독일어, 제네바는 프랑스어, 루가노는 이탈리아어권입니다.\n\n빙하 특급이나 베르니나 특급 같은 인기 관광 열차에서는 멋진 경치를 SNS에 실시간으로 공유하고 싶을 때가 많습니다. 주요 노선을 따라 대체로 모바일 통신이 가능하지만, 긴 터널 구간에서는 일시적으로 연결이 끊길 수 있습니다. 스키 리조트에서는 슬로프 지도와 리프트 정보 앱을 활용하기 위해 데이터 연결이 중요합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "EU용 eSIM은 스위스에서도 사용할 수 있나요?", a: "일반적인 EU 로밍 플랜에는 스위스가 포함되지 않습니다. 스위스는 EU 회원국이 아니므로 스위스를 포함하는 플랜이나 스위스 전용 플랜이 별도로 필요합니다. 구매 전 반드시 스위스가 대상 국가에 포함되어 있는지 확인하세요." },
      { q: "알프스 산악 지역에서도 eSIM을 사용할 수 있나요?", a: "체르마트와 생모리츠 같은 리조트 마을 중심부에서는 문제없이 이용 가능합니다. 고르너그라트와 융프라우요흐 등 인기 전망대에서도 대체로 통신이 가능합니다. 다만, 높은 고도의 등산로에서는 신호가 없을 수 있습니다." },
      { q: "스위스에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 산악 리조트에서는 무료 WiFi가 제한적이므로 도시보다 데이터를 많이 사용할 수 있습니다. 1주일 여행이라면 7~10GB 플랜을 추천합니다." },
      { q: "스위스 관광 열차에서 eSIM을 사용할 수 있나요?", a: "빙하 특급이나 베르니나 특급 등 주요 노선에서는 대체로 모바일 통신이 가능합니다. 긴 터널 구간에서는 일시적으로 연결이 끊길 수 있습니다. SBB 앱에서 오프라인 데이터를 미리 다운로드해 두면 안심입니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 스위스 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "스위스 eSIM 가이드",
  },
  zh: {
    title: "瑞士eSIM指南 - 苏黎世、日内瓦与阿尔卑斯覆盖",
    subtitle: "使用专属eSIM畅游瑞士",
    intro: "瑞士以壮丽的阿尔卑斯山景和精准的铁路网络闻名于世。苏黎世和日内瓦等主要城市提供高速移动通信，使用eSIM可以在苏黎世机场落地后立即通过SBB（瑞士联邦铁路）应用预订火车或使用Google Maps导航。需要特别注意的是，瑞士不是EU成员国，一般的EU漫游套餐通常不覆盖瑞士。前往瑞士旅行，准备专属eSIM套餐必不可少。",
    sections: [
      {
        title: "瑞士移动通信概况",
        body: "瑞士三大运营商为Swisscom、Sunrise和Salt。Swisscom拥有最广的覆盖范围，在包括山区在内的全国提供最稳定的连接。Sunrise也在积极扩展5G网络，城市地区速度很快。旅行者eSIM套餐通常使用Swisscom或Sunrise网络，确保瑞士全境稳定连接。\n\n苏黎世、日内瓦、伯尔尼等主要城市5G覆盖广泛，速度超过200Mbps。瑞士的电信基础设施在全球名列前茅。\n\n由于瑞士不是EU成员国，标准EU漫游套餐不包含瑞士。从法国、德国或意大利进入瑞士后，EU漫游很可能会停止工作。强烈建议在出行前准备好瑞士专属eSIM套餐。"
      },
      {
        title: "推荐eSIM套餐",
        body: "瑞士以高物价闻名，当地SIM卡价格也不菲。通过eSIM提前购买实惠的套餐，可以大幅节省费用。一周瑞士行程建议选择5-10GB套餐。山区度假村的免费WiFi有限，数据消耗往往比城市更多。\n\n如果计划同时游览瑞士和周边EU国家，请选择明确包含瑞士的欧洲广域套餐。普通EU专用套餐不覆盖瑞士，购买前务必确认瑞士在覆盖国家列表中。\n\nAutoWiFi eSIM提供瑞士专属套餐和包含瑞士的欧洲广域套餐。支持热点共享，团体出行也很方便。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买瑞士套餐后，QR码会发送到您的邮箱。iPhone用户前往「设置→蜂窝网络→添加eSIM」，Android用户前往「设置→网络和互联网→SIM卡→添加eSIM」扫描QR码。\n\n出发前安装eSIM，到达苏黎世机场或日内瓦机场后即可立即连网。从苏黎世机场到市中心的火车只需约10分钟，途中就能使用网络。\n\n瑞士机场提供免费WiFi，但可能有时间限制。eSIM确保您从到达那一刻起就有稳定的网络，方便在SBB应用中搜索火车或激活Swiss Travel Pass。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "苏黎世全市通信环境优秀。班霍夫大街、苏黎世湖畔、老城区等所有主要区域都有高速网络。日内瓦的覆盖同样完善，包括莱芒湖大喷泉周边和联合国欧洲总部区域。\n\n伯尔尼老城（联合国教科文组织世界遗产）和卢塞恩的卡佩尔桥周边通信稳定。因特拉肯作为少女峰地区的门户，通信设施完善，附近的格林德瓦尔德和劳特布龙嫩山谷村落也基本能保持良好连接。\n\n采尔马特（马特宏峰）和圣莫里茨等山区度假村在镇中心和主要滑雪区域有信号覆盖。但高海拔登山路线和偏远缆车处信号可能较弱甚至没有。戈尔内格拉特观景台和少女峰站等热门观景点通常有移动通信覆盖。"
      },
      {
        title: "瑞士旅行eSIM使用技巧",
        body: "瑞士旅行最实用的应用是SBB Mobile（瑞士联邦铁路官方应用）。火车时刻表查询、购票、实时延误信息都可以在这个应用中完成，有了eSIM随时随地都能获取最新信息。如果持有Swiss Travel Pass，也可以在应用中数字化展示。\n\n瑞士拥有四种官方语言：德语、法语、意大利语和罗曼什语。不同地区使用不同语言，Google翻译的相机功能对于阅读标识和菜单非常有用。苏黎世使用德语，日内瓦使用法语，卢加诺使用意大利语。\n\n乘坐冰川快车和伯尔尼纳快车等热门观光列车时，许多旅客希望将沿途美景实时分享到社交媒体。主要线路沿途通常有移动信号，但较长的隧道段可能会暂时断开连接。在滑雪度假村，数据连接对于使用雪道地图和缆车信息应用非常重要。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "EU的eSIM套餐在瑞士能用吗？", a: "一般的EU漫游套餐不包含瑞士，因为瑞士不是EU成员国。您需要购买明确包含瑞士的套餐或瑞士专属套餐。购买前请务必确认覆盖国家列表中包含瑞士。" },
      { q: "阿尔卑斯山区能用eSIM吗？", a: "采尔马特和圣莫里茨等度假村镇中心可以正常使用。戈尔内格拉特和少女峰站等热门观景点通常也有信号。但偏远的高海拔登山路线可能没有信号。" },
      { q: "在瑞士大概需要多少流量？", a: "一般观光使用每天500MB-1GB。山区度假村的免费WiFi有限，可能比城市消耗更多流量。一周旅行建议选择7-10GB套餐。" },
      { q: "瑞士观光列车上能用eSIM吗？", a: "冰川快车和伯尔尼纳快车等主要线路沿途通常有移动信号。较长的隧道段可能会暂时断开连接。建议提前在SBB应用中下载离线数据以备不时之需。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游瑞士。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "瑞士eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/switzerland-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="switzerland-esim" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
