import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド" },
      { slug: "singapore-esim", title: "シンガポールeSIMガイド" },
      { slug: "esim-vs-airport-sim", title: "eSIMと空港SIMの比較" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "esim-for-layovers", title: "Best eSIM for Layovers 2026" },
      { slug: "airport-connectivity-guide", title: "Airport WiFi and Connectivity Guide Worldwide" },
      { slug: "singapore-esim", title: "Singapore eSIM Guide 2026" },
      { slug: "japan-esim", title: "Japan eSIM Guide 2026" },
      { slug: "esim-vs-airport-sim", title: "eSIM vs Airport SIM Card 2026" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "airport-connectivity-guide", title: "공항 WiFi·통신 가이드" },
      { slug: "singapore-esim", title: "싱가포르 eSIM 가이드" },
      { slug: "esim-vs-airport-sim", title: "eSIM과 공항 SIM 비교" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "airport-connectivity-guide", title: "机场WiFi与通信指南" },
      { slug: "singapore-esim", title: "新加坡eSIM指南" },
      { slug: "esim-vs-airport-sim", title: "eSIM与机场SIM卡对比" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "香港eSIMガイド - 高速5Gとコンパクト都市で快適モバイル通信",
    subtitle: "マカオへの日帰りもカバー。香港・マカオeSIM完全ガイド",
    intro: "香港は世界でも最も通信インフラが発達した都市の一つで、5Gネットワークの普及率も非常に高いです。コンパクトな都市構造のため、MTR（地下鉄）の駅構内からビクトリアピークの山頂まで、ほぼどこでも高速通信が可能です。さらにeSIMプランによっては、フェリーで約1時間のマカオもカバーされるため、両都市を周遊する旅行にも最適。香港・マカオでのeSIM活用法を詳しくご紹介します。",
    sections: [
      {
        title: "香港の5G/4G通信環境",
        body: "香港は2020年から5Gサービスが本格的に開始され、現在では市内の主要エリアのほとんどで5G通信が利用可能です。主要キャリアはCSL、3 Hong Kong、SmarTone、China Mobile Hong Kongの4社で、いずれも広範な5G/4G LTEネットワークを展開しています。eSIMプランはこれらのキャリアに接続するため、高速で安定した通信が期待できます。\n\n香港島の中環（セントラル）、銅鑼湾（コーズウェイベイ）、九龍側の尖沙咀（チムサーチョイ）、旺角（モンコック）といった主要エリアでは、5G通信で下り100Mbps以上の速度が出ることも珍しくありません。ビクトリアハーバー沿いのプロムナードや、スターフェリーの船上でも通信が途切れることはほぼありません。\n\nMTR（地下鉄）の構内・車内でも4G LTE/5G通信が利用でき、移動中のナビゲーションやメッセージのやり取りもスムーズです。香港は地下鉄の通信環境が非常に優れており、他の都市と比べても圧倒的に快適です。"
      },
      {
        title: "香港の主要エリア別通信事情",
        body: "香港島エリアでは、セントラル、ワンチャイ、コーズウェイベイの商業地区で5G通信が非常に安定しています。ビクトリアピークの頂上展望台でも4G LTE通信が可能で、夜景撮影の写真をすぐにSNSにアップロードできます。南部のスタンレーやレパルスベイのビーチエリアでも良好な通信環境です。\n\n九龍半島側では、チムサーチョイのネイザンロード沿い、モンコックの女人街・男人街周辺、深水埗（シャムスイポ）の電気街など、観光客に人気のエリアすべてで高速通信が利用できます。九龍城エリアの有名な飲茶レストランで注文写真をSNSにアップする際も、通信に困ることはありません。\n\n新界エリアや離島部（ランタオ島の大澳、長洲島など）では、市内中心部に比べて通信速度が落ちることがありますが、4G LTEは基本的にカバーされています。香港ディズニーランドやNgong Ping 360のケーブルカー沿線でも安定した通信が利用可能です。"
      },
      {
        title: "マカオでのeSIM利用",
        body: "多くの香港向けeSIMプランでは、マカオもカバーエリアに含まれているプランが用意されています。香港からマカオへはフェリーで約1時間、港珠澳大橋（Hong Kong-Zhuhai-Macau Bridge）バスでも約45分とアクセスが良く、日帰り旅行も人気です。eSIM1枚で両都市をカバーできれば、SIMの切り替えなしにシームレスな通信が可能です。\n\nマカオではCTM（Companhia de Telecomunicacoes de Macau）やSmarToneなどのキャリアが4G LTEネットワークを提供しています。マカオ半島のセナド広場周辺、聖ポール天主堂跡、タイパ地区のコタイストリップ（カジノリゾートエリア）など、主要観光スポットでは安定した4G通信が利用できます。\n\nただし、すべての香港eSIMプランがマカオに対応しているわけではないため、購入時に香港・マカオ対応の表記があるプランを選ぶことが重要です。AutoWiFiでは香港・マカオ両方で使えるプランを用意しており、データ容量を共有して両都市で利用できます。"
      },
      {
        title: "香港eSIMの料金と設定",
        body: "香港向けeSIMプランの料金は、1GB/3日間で約500〜1,000円、3GB/7日間で約1,000〜2,000円、5GB/10日間で約1,500〜3,000円、無制限/7日間で約2,500〜4,000円程度です。香港はコンパクトな都市のため、WiFiが使える場所も多く、データ使用量は比較的抑えやすい傾向があります。\n\n香港旅行は3泊4日〜4泊5日が一般的で、7日間プランがちょうど良いでしょう。食べ歩きの名店探しやMTRの乗り換え検索、オクトパスカードの残高確認アプリなど、香港旅行ではスマートフォンの利用頻度が高いため、3GB以上のプランがおすすめです。\n\n設定はQRコードをスキャンするだけの簡単操作です。出発前にWiFi環境でeSIMプロファイルをダウンロードしておけば、香港国際空港に到着してeSIM回線をオンにするだけで通信を開始できます。デュアルSIM機能を使えば、日本のSIMと香港のeSIMを同時に有効にして、日本からの着信を受けながら香港のデータ通信を使うことも可能です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "香港のeSIMでマカオも使えますか？", a: "プランによります。香港・マカオ対応と記載されたプランを選べば、追加料金なしで両方の地域で利用できます。AutoWiFiでは香港・マカオ兼用プランを提供しています。マカオ日帰り旅行の予定がある場合は、必ず対応プランを選びましょう。" },
      { q: "香港のMTR（地下鉄）内でも通信できますか？", a: "はい、香港のMTRは構内・車内ともに4G LTE/5G通信が非常に良好です。駅構内でもほぼ途切れることなく通信でき、乗り換え案内アプリの利用やメッセージの送受信がスムーズに行えます。世界的に見ても香港の地下鉄通信環境は最高レベルです。" },
      { q: "香港で5G通信は使えますか？", a: "はい、香港は5Gインフラの整備が進んでおり、市内中心部のほとんどのエリアで5G通信が利用可能です。eSIMプランが5G対応であれば、下り100Mbps以上の高速通信が期待できます。ただし、5G対応はプランとお使いのスマートフォンの両方が対応している必要があります。" },
      { q: "香港旅行に必要なデータ量は？", a: "香港はフリーWiFiが比較的充実しているため、1日あたり300〜500MB程度で十分な場合が多いです。3泊4日なら3GBプラン、マカオ日帰りを含む場合は5GBプランがおすすめです。動画配信を頻繁に見る場合は無制限プランを検討してください。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMなら、香港の高速5Gネットワークにワンタップで接続。マカオ対応プランなら1枚のeSIMで両都市を周遊できます。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "香港eSIM",
  },
  en: {
    title: "Best eSIM for Hong Kong 2026 - Airport & Macau Day Trips",
    subtitle: "Plan airport train transfers, late-night arrivals, and Macau ferry days with one Hong Kong eSIM",
    intro: "Hong Kong is one of the easiest places in Asia to navigate with mobile data, especially if you want to move quickly from the airport into the city. With strong 5G coverage across MTR lines, dense urban neighborhoods, and many cross-border travel options, an eSIM helps you handle Airport Express transfers, late-night arrivals, hotel check-in, and Macau ferry planning without relying on patchy public WiFi. This guide covers how to use eSIM across Hong Kong and Macau.",
    sections: [
      {
        title: "Hong Kong's 5G/4G Coverage",
        body: "Hong Kong launched commercial 5G services in 2020, and today most major areas across the city have 5G coverage. The four main carriers are CSL, 3 Hong Kong, SmarTone, and China Mobile Hong Kong, all operating extensive 5G and 4G LTE networks. eSIM plans connect to these carriers, ensuring fast and stable connectivity.\n\nIn key areas like Central, Causeway Bay, Tsim Sha Tsui, and Mong Kok, 5G speeds regularly exceed 100 Mbps download. Connectivity remains solid along the Victoria Harbour waterfront promenade and even aboard the Star Ferry.\n\nThe MTR subway system offers excellent 4G LTE and 5G coverage both in stations and onboard trains, making navigation and messaging seamless during transit. Hong Kong's subway connectivity is widely regarded as among the best in the world."
      },
      {
        title: "Coverage by District",
        body: "On Hong Kong Island, the commercial districts of Central, Wan Chai, and Causeway Bay have very stable 5G coverage. Even at the Victoria Peak summit observation deck, 4G LTE works reliably, so you can instantly upload your night-view photos to social media. The southern beaches of Stanley and Repulse Bay also have good coverage.\n\nOn the Kowloon side, all popular tourist areas have high-speed connectivity, including Nathan Road in Tsim Sha Tsui, the Ladies' Market and Temple Street Night Market in Mong Kok, and the electronics district in Sham Shui Po. You will have no trouble sharing photos from a famous dim sum restaurant in Kowloon City.\n\nThe New Territories and outlying islands (such as Tai O on Lantau Island and Cheung Chau) may have somewhat slower speeds compared to the urban core, but 4G LTE coverage is generally available. Hong Kong Disneyland and the Ngong Ping 360 cable car route also have stable connectivity."
      },
      {
        title: "Using eSIM in Macau",
        body: "Many Hong Kong eSIM plans offer options that include Macau coverage. Macau is easily accessible from Hong Kong by ferry (about one hour) or via the Hong Kong-Zhuhai-Macau Bridge bus (about 45 minutes), making day trips popular. With a single eSIM covering both cities, you enjoy seamless connectivity without switching SIMs.\n\nIn Macau, carriers like CTM (Companhia de Telecomunicacoes de Macau) and SmarTone provide 4G LTE networks. Major tourist spots including Senado Square, the Ruins of St. Paul's, and the Cotai Strip casino resort area on Taipa all have reliable 4G coverage.\n\nNote that not all Hong Kong eSIM plans include Macau, so look for plans specifically labeled as covering both Hong Kong and Macau. AutoWiFi offers combined Hong Kong-Macau plans that let you share your data allowance across both cities."
      },
      {
        title: "Hong Kong eSIM Pricing and Setup",
        body: "Hong Kong eSIM plans typically cost $3-7 for 1GB/3 days, $7-15 for 3GB/7 days, $10-22 for 5GB/10 days, and $18-30 for unlimited/7 days. Since Hong Kong is a compact city with widely available free WiFi, data consumption tends to be moderate.\n\nMost Hong Kong trips last 3-5 days, making a 7-day plan ideal. Given the high smartphone usage during Hong Kong trips for finding restaurants, checking MTR routes, and using Octopus card apps, a 3GB or higher plan is recommended.\n\nSetup is as simple as scanning a QR code. Download the eSIM profile over WiFi before departure, and once you arrive at Hong Kong International Airport, just enable the eSIM line to start using data. With dual SIM capability, you can keep your home SIM active for calls while using the Hong Kong eSIM for data."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use a Hong Kong eSIM in Macau?", a: "It depends on the plan. Choose a plan labeled as covering both Hong Kong and Macau to use it in both regions at no extra cost. AutoWiFi offers combined Hong Kong-Macau plans. If you are planning a Macau day trip, make sure to select a compatible plan." },
      { q: "Does eSIM work inside the MTR subway?", a: "Yes, Hong Kong's MTR has excellent 4G LTE and 5G coverage in both stations and trains. You can use navigation apps and messaging without interruption during your commute. Hong Kong's subway connectivity is considered among the best globally." },
      { q: "Is 5G available in Hong Kong?", a: "Yes, Hong Kong has extensive 5G infrastructure covering most central urban areas. If your eSIM plan and smartphone both support 5G, you can expect download speeds exceeding 100 Mbps. Check that both your plan and device are 5G compatible." },
      { q: "How much data do I need for Hong Kong?", a: "Hong Kong has relatively good free WiFi availability, so 300-500MB per day is often sufficient. A 3GB plan works well for a 3-4 night trip. If including a Macau day trip, consider 5GB. Choose an unlimited plan if you frequently stream videos." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM connects you to Hong Kong's blazing-fast 5G network with one tap. Choose a Hong Kong-Macau plan to cover both cities with a single eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Hong Kong eSIM",
  },
  ko: {
    title: "홍콩 eSIM 가이드 - 초고속 5G와 컴팩트 도시에서 쾌적한 모바일 통신",
    subtitle: "마카오 당일치기도 커버. 홍콩·마카오 eSIM 완전 가이드",
    intro: "홍콩은 세계에서 가장 통신 인프라가 발달한 도시 중 하나로, 5G 네트워크 보급률도 매우 높습니다. 컴팩트한 도시 구조 덕분에 MTR(지하철) 역 구내부터 빅토리아 피크 정상까지 거의 모든 곳에서 고속 통신이 가능합니다. 또한 eSIM 플랜에 따라서는 페리로 약 1시간 거리의 마카오도 커버되어 양 도시를 여행하는 데 최적입니다. 홍콩·마카오에서의 eSIM 활용법을 자세히 안내합니다.",
    sections: [
      {
        title: "홍콩의 5G/4G 통신 환경",
        body: "홍콩은 2020년부터 5G 서비스가 본격적으로 시작되어 현재 시내 주요 지역 대부분에서 5G 통신이 가능합니다. 주요 캐리어는 CSL, 3 Hong Kong, SmarTone, China Mobile Hong Kong 4사로, 모두 광범위한 5G/4G LTE 네트워크를 운영합니다. eSIM 플랜은 이러한 캐리어에 연결되므로 빠르고 안정적인 통신을 기대할 수 있습니다.\n\n홍콩섬의 센트럴, 코즈웨이베이, 구룡 측의 침사추이, 몽콕 등 주요 지역에서는 5G 통신으로 하행 100Mbps 이상의 속도가 나오는 것도 드물지 않습니다. 빅토리아 하버 연안의 프롬나드와 스타페리 선상에서도 통신이 끊기는 일은 거의 없습니다.\n\nMTR(지하철) 역 구내와 차내에서도 4G LTE/5G 통신을 이용할 수 있어 이동 중 내비게이션이나 메시지 주고받기도 원활합니다. 홍콩은 지하철 통신 환경이 세계 최고 수준입니다."
      },
      {
        title: "홍콩 주요 지역별 통신 사정",
        body: "홍콩섬 지역에서는 센트럴, 완차이, 코즈웨이베이의 상업 지구에서 5G 통신이 매우 안정적입니다. 빅토리아 피크 정상 전망대에서도 4G LTE 통신이 가능하여 야경 사진을 바로 SNS에 업로드할 수 있습니다. 남부의 스탠리와 리펄스 베이 해변 지역에서도 양호한 통신 환경입니다.\n\n구룡반도 측에서는 침사추이의 네이선 로드, 몽콕의 여인가·남인가 주변, 삼수이포의 전자상가 등 관광객에게 인기 있는 모든 지역에서 고속 통신이 가능합니다. 구룡성 지역의 유명한 딤섬 레스토랑에서 주문 사진을 SNS에 올리는 것도 전혀 문제없습니다.\n\n신계 지역이나 이도부(란타우 섬의 타이오, 청차우 섬 등)에서는 시내 중심부에 비해 통신 속도가 떨어질 수 있지만, 4G LTE는 기본적으로 커버됩니다. 홍콩 디즈니랜드와 응핑 360 케이블카 연선에서도 안정적인 통신이 가능합니다."
      },
      {
        title: "마카오에서의 eSIM 이용",
        body: "많은 홍콩용 eSIM 플랜에서 마카오도 커버 지역에 포함된 플랜이 준비되어 있습니다. 홍콩에서 마카오까지는 페리로 약 1시간, 강주아오 대교(Hong Kong-Zhuhai-Macau Bridge) 버스로 약 45분으로 접근성이 좋아 당일치기 여행도 인기입니다. eSIM 1장으로 양 도시를 커버할 수 있다면 SIM 전환 없이 원활한 통신이 가능합니다.\n\n마카오에서는 CTM과 SmarTone 등의 캐리어가 4G LTE 네트워크를 제공합니다. 마카오 반도의 세나도 광장, 성 바울 성당 유적, 타이파 지구의 코타이 스트립(카지노 리조트 지역) 등 주요 관광 명소에서 안정적인 4G 통신이 가능합니다.\n\n다만 모든 홍콩 eSIM 플랜이 마카오에 대응하는 것은 아니므로 구매 시 '홍콩·마카오' 대응 표기가 있는 플랜을 선택하는 것이 중요합니다. AutoWiFi에서는 홍콩·마카오 양쪽에서 사용 가능한 플랜을 제공하고 있어 데이터 용량을 공유하여 양 도시에서 이용할 수 있습니다."
      },
      {
        title: "홍콩 eSIM 요금과 설정",
        body: "홍콩용 eSIM 플랜의 요금은 1GB/3일 약 4,000~8,000원, 3GB/7일 약 8,000~16,000원, 5GB/10일 약 12,000~24,000원, 무제한/7일 약 20,000~32,000원 정도입니다. 홍콩은 컴팩트한 도시이고 무료 WiFi를 사용할 수 있는 곳도 많아 데이터 사용량은 비교적 적게 유지할 수 있습니다.\n\n홍콩 여행은 3박 4일~4박 5일이 일반적이며 7일 플랜이 딱 맞습니다. 맛집 탐방, MTR 환승 검색, 옥토퍼스 카드 잔액 확인 앱 등 홍콩 여행에서는 스마트폰 사용 빈도가 높으므로 3GB 이상의 플랜을 추천합니다.\n\n설정은 QR 코드를 스캔하기만 하면 되는 간단한 조작입니다. 출발 전 WiFi 환경에서 eSIM 프로필을 다운로드해 두면 홍콩 국제공항에 도착해서 eSIM 회선을 켜기만 하면 통신을 시작할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "홍콩 eSIM으로 마카오도 사용할 수 있나요?", a: "플랜에 따라 다릅니다. '홍콩·마카오 대응'으로 표기된 플랜을 선택하면 추가 요금 없이 양쪽 지역에서 이용할 수 있습니다. AutoWiFi에서는 홍콩·마카오 겸용 플랜을 제공합니다. 마카오 당일치기 여행 계획이 있다면 반드시 대응 플랜을 선택하세요." },
      { q: "홍콩 MTR(지하철) 안에서도 통신이 되나요?", a: "네, 홍콩 MTR은 역 구내와 차내 모두 4G LTE/5G 통신이 매우 양호합니다. 환승 안내 앱 사용이나 메시지 송수신이 원활하게 가능합니다. 세계적으로도 홍콩의 지하철 통신 환경은 최고 수준입니다." },
      { q: "홍콩에서 5G 통신을 사용할 수 있나요?", a: "네, 홍콩은 5G 인프라 정비가 잘 되어 있어 시내 중심부 대부분의 지역에서 5G 통신이 가능합니다. eSIM 플랜과 스마트폰 모두 5G를 지원하면 하행 100Mbps 이상의 고속 통신을 기대할 수 있습니다." },
      { q: "홍콩 여행에 필요한 데이터양은?", a: "홍콩은 무료 WiFi가 비교적 잘 되어 있어 하루 300~500MB 정도면 충분한 경우가 많습니다. 3박 4일이면 3GB 플랜, 마카오 당일치기 포함 시 5GB 플랜을 추천합니다. 동영상 스트리밍을 자주 보는 경우 무제한 플랜을 검토하세요." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM이면 홍콩의 초고속 5G 네트워크에 원탭으로 연결. 홍콩·마카오 대응 플랜이면 1장의 eSIM으로 양 도시를 여행할 수 있습니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "홍콩 eSIM",
  },
  zh: {
    title: "香港eSIM指南 - 超高速5G与紧凑城市的畅快移动通信",
    subtitle: "一张eSIM覆盖香港和澳门",
    intro: "香港是全球通信基础设施最发达的城市之一，5G网络覆盖率非常高。得益于紧凑的城市结构，从MTR（地铁）站内到太平山顶，几乎任何地方都能使用高速通信。而且许多eSIM套餐还覆盖了乘渡轮仅约1小时即达的澳门，非常适合两城同游的旅行者。本指南将详细介绍在香港和澳门如何使用eSIM。",
    sections: [
      {
        title: "香港的5G/4G通信环境",
        body: "香港从2020年开始正式推出5G服务，目前市内主要区域几乎都能使用5G通信。主要运营商为CSL、3 Hong Kong、SmarTone和中国移动香港四家，都运营着广泛的5G/4G LTE网络。eSIM套餐连接这些运营商，可以期待高速稳定的通信。\n\n在香港岛的中环、铜锣湾、九龙侧的尖沙咀、旺角等主要地区，5G通信下行速度超过100Mbps并不少见。维多利亚港沿岸的海滨长廊和天星小轮上也几乎不会出现通信中断。\n\nMTR（地铁）站内和车内也能使用4G LTE/5G通信，移动中的导航和消息收发都很顺畅。香港的地铁通信环境非常优秀，在全球范围内也是顶级水平。"
      },
      {
        title: "香港主要区域通信详情",
        body: "香港岛区域中，中环、湾仔、铜锣湾的商业区5G通信非常稳定。即使在太平山顶观景台也能使用4G LTE通信，可以即时将夜景照片上传到社交媒体。南部的赤柱和浅水湾海滩区域通信环境同样良好。\n\n九龙半岛侧，尖沙咀弥敦道沿线、旺角女人街和男人街周边、深水埗电子街等所有热门旅游区域都能使用高速通信。在九龙城区域的著名点心餐厅拍照发社交媒体也完全没有问题。\n\n新界区域和离岛（大屿山大澳、长洲等）的通信速度可能比市区中心略慢，但4G LTE基本上都有覆盖。香港迪士尼乐园和昂坪360缆车沿线也有稳定的通信。"
      },
      {
        title: "在澳门使用eSIM",
        body: "许多香港eSIM套餐提供了包含澳门覆盖的选项。从香港到澳门乘渡轮约1小时，经港珠澳大桥巴士约45分钟，交通便利，一日游也很受欢迎。如果一张eSIM能覆盖两个城市，就无需切换SIM即可无缝通信。\n\n澳门由CTM（澳门电讯）和SmarTone等运营商提供4G LTE网络。澳门半岛的议事亭前地周边、大三巴牌坊、氹仔的金光大道（赌场度假区）等主要景点都有稳定的4G通信。\n\n但并非所有香港eSIM套餐都覆盖澳门，因此购买时选择标注香港·澳门覆盖的套餐非常重要。AutoWiFi提供可在香港和澳门两地使用的套餐，数据流量在两城之间共享。"
      },
      {
        title: "香港eSIM资费与设置",
        body: "香港eSIM套餐的价格大约为1GB/3天15-30元人民币，3GB/7天30-60元，5GB/10天50-100元，无限流量/7天约80-150元。香港城市紧凑，免费WiFi也较多，数据消耗相对容易控制。\n\n香港旅行通常为3晚4天到4晚5天，7天套餐刚好合适。在香港旅行中搜索美食、查询MTR换乘、使用八达通余额查询App等，手机使用频率很高，建议选择3GB以上的套餐。\n\n设置只需扫描QR码即可完成。出发前在WiFi环境下载eSIM配置文件，到达香港国际机场后打开eSIM线路就能开始通信。利用双SIM功能，可以同时保持国内SIM接收来电，并使用香港eSIM的数据通信。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "香港的eSIM在澳门也能用吗？", a: "取决于套餐。选择标注香港·澳门覆盖的套餐即可在两地无额外费用使用。AutoWiFi提供香港·澳门兼用套餐。如果有澳门一日游计划，请务必选择对应套餐。" },
      { q: "在香港MTR（地铁）里也能通信吗？", a: "是的，香港MTR在站内和车内都有非常好的4G LTE/5G覆盖。使用换乘导航App和收发消息都很顺畅。从全球来看，香港的地铁通信环境也是最高水平。" },
      { q: "在香港可以使用5G通信吗？", a: "是的，香港的5G基础设施完善，市中心大部分区域都可使用5G通信。如果eSIM套餐和手机都支持5G，下行速度可超过100Mbps。请确认套餐和设备都支持5G。" },
      { q: "香港旅行需要多少数据流量？", a: "香港免费WiFi比较普及，每天300-500MB通常就够了。3晚4天选3GB套餐，包含澳门一日游选5GB套餐。如果经常看视频流媒体，考虑无限流量套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi eSIM一键连接香港超高速5G网络。选择香港·澳门套餐，一张eSIM畅游两座城市。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "香港eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/hong-kong-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const rel = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="hong-kong-esim" content={CONTENT[loc]} relatedArticles={rel.articles} relatedTitle={rel.title} />;
}
