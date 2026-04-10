import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "日本旅行前に比較したいページ",
    articles: [
      { slug: "pocket-wifi-vs-esim-japan", title: "ポケットWiFi vs eSIM 日本" },
      { slug: "best-esim-providers", title: "海外eSIMおすすめ比較" },
      { slug: "global-esim", title: "Global eSIM ガイド" },
      { slug: "esim-unlimited-data", title: "無制限データeSIM比較" },
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行に必要なデータ容量の目安" },
    ],
  },
  en: {
    title: "Compare More Before You Land in Tokyo",
    articles: [
      { slug: "esim-for-layovers", title: "Best eSIM for Layovers 2026" },
      { slug: "airport-connectivity-guide", title: "Airport WiFi and Connectivity Guide Worldwide" },
      { slug: "esim-for-business-travel", title: "eSIM for Business Travel: Airport Arrivals, Transit Days, and Hotel WiFi Backup" },
      { slug: "korea-esim", title: "Best eSIM for South Korea Travel 2026" },
      { slug: "pocket-wifi-vs-esim-japan", title: "Pocket WiFi vs eSIM in Japan" },
    ],
  },
  ko: {
    title: "일본 여행 전 함께 비교할 가이드",
    articles: [
      { slug: "pocket-wifi-vs-esim-japan", title: "포켓 WiFi vs eSIM 일본" },
      { slug: "best-esim-providers", title: "추천 여행 eSIM 비교" },
      { slug: "global-esim", title: "Global eSIM 가이드" },
      { slug: "esim-unlimited-data", title: "무제한 데이터 eSIM 가이드" },
      { slug: "how-much-data-do-i-need-for-travel", title: "여행에 필요한 데이터 용량" },
    ],
  },
  zh: {
    title: "购买日本eSIM前可继续比较",
    articles: [
      { slug: "pocket-wifi-vs-esim-japan", title: "日本随身WiFi vs eSIM" },
      { slug: "best-esim-providers", title: "旅行eSIM推荐对比" },
      { slug: "global-esim", title: "Global eSIM 指南" },
      { slug: "esim-unlimited-data", title: "无限流量eSIM指南" },
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行需要多少流量？" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "日本旅行のeSIMガイド - 通信事情とおすすめプラン",
    subtitle: "日本の高速モバイル通信をeSIMで快適に利用する方法",
    intro: "日本は世界でもトップクラスの通信インフラを持つ国です。都市部では5Gエリアが急速に拡大し、地方でも4G LTEがほぼ全域をカバーしています。eSIMを利用すれば、到着後すぐに高速通信を利用でき、日本滞在をより快適に過ごすことができます。本記事では日本の高速モバイル通信をeSIMで快適に利用する方法・日本のモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "日本のモバイル通信事情",
        body: "日本の携帯電話ネットワークは、NTTドコモ、au（KDDI）、ソフトバンクの3大キャリアが中心です。いずれも全国的に広い4G LTEカバレッジを持ち、東京・大阪・名古屋などの主要都市では5Gサービスも展開しています。通信速度は世界的に見ても非常に高速で、都市部では下り100Mbps以上の速度が一般的です。\n\n地方や山間部でも基本的な4G通信は利用可能ですが、一部の離島や登山道などではカバレッジが限られる場合があります。新幹線内でもモバイル通信が利用でき、移動中もストレスなくインターネットを使えるのが日本の特徴です。\n\n旅行者向けのeSIMプランは主にドコモまたはソフトバンクの回線を利用しており、どちらも安定した通信品質を提供しています。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "日本向けeSIMプランは、短期旅行者向けの3日間1GBプランから、長期滞在者向けの30日間無制限プランまで幅広く用意されています。一般的な観光旅行であれば、7日間3〜5GBのプランがコストパフォーマンスに優れておすすめです。SNSや地図アプリの利用がメインであれば十分な容量です。\n\nAutoWiFi eSIMでは、日本向けに複数のプランを提供しています。データ容量、利用期間、価格のバランスを考慮して、旅行スタイルに合ったプランを選びましょう。動画視聴やビデオ通話を頻繁に行う場合は、無制限プランの検討をおすすめします。\n\n多くのプランでテザリング（インターネット共有）も利用可能なので、タブレットやノートパソコンでも同じ回線を共有できます。"
      },
      {
        title: "eSIMの設定方法",
        body: "eSIMの設定は非常に簡単です。まず、AutoWiFi eSIMのサイトで日本向けプランを購入すると、QRコードがメールで届きます。iPhoneの場合は\"設定→モバイル通信\"→\"eSIMを追加からQRコードをスキャンします。Androidの場合は設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"から同様に設定できます。\n\neSIMは出発前に自宅でインストールしておくことをおすすめします。日本到着後にデータローミングをオンにするか、eSIM回線をアクティブにするだけですぐに使い始められます。設定自体は5分もかかりません。\n\n注意点として、eSIMのインストールにはWiFi接続が必要です。空港のフリーWiFiでも設定できますが、出発前に済ませておくとスムーズです。"
      },
      {
        title: "主要都市でのカバレッジ",
        body: "東京では23区内はもちろん、多摩地区や周辺のベッドタウンでも安定した高速通信が利用できます。渋谷、新宿、秋葉原などの繁華街では5G通信も利用可能なエリアが増えています。東京メトロや都営地下鉄の駅構内でもモバイル通信が利用可能です。\n\n大阪・京都・奈良の関西エリアも通信環境は非常に良好です。観光名所である金閣寺、伏見稲荷大社、道頓堀周辺でも問題なく通信できます。北海道の札幌、九州の福岡、沖縄の那覇などの地方主要都市でも同様に高速通信が利用可能です。\n\n富士山の登山道では5合目まではカバレッジがありますが、それ以上の標高では接続が不安定になることがあります。また、一部の離島ではカバレッジが限定的な場合があるため、事前に確認することをおすすめします。"
      },
      {
        title: "日本旅行でのeSIM活用のコツ",
        body: "日本ではGoogleマップやAppleマップが非常に正確で、電車の乗り換え案内にも対応しています。eSIMがあれば、これらのナビゲーションアプリをリアルタイムで活用でき、複雑な東京の鉄道網も迷わず移動できます。\n\nまた、日本のレストランや観光施設の多くは予約が必要です。eSIMがあれば、食べログやホットペッパーなどの予約サイトにいつでもアクセスでき、人気店の予約も外出先から行えます。翻訳アプリも通信があれば精度が大幅に向上します。\n\nコンビニや駅のフリーWiFiは利用可能ですが、接続が不安定だったり、登録が必要だったりすることが多いです。eSIMがあれば、そうしたストレスなく常時接続を維持できます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "日本のeSIMで電話番号は使えますか？", a: "多くの旅行者向けeSIMプランはデータ通信専用です。電話が必要な場合は、LINEやWhatsAppなどのVoIPアプリを利用するか、電話番号付きのプランを選択してください。日本ではLINEが最も普及しているコミュニケーションアプリです。" },
      { q: "新幹線の中でもeSIMは使えますか？", a: "はい、新幹線の車内でもモバイル通信が利用可能です。トンネル内では一時的に接続が途切れることがありますが、大部分の区間で安定した通信が利用できます。東海道新幹線ではWiFiサービスも提供されていますが、eSIMの方が速度が安定しています。" },
      { q: "日本でのデータ使用量の目安は？", a: "一般的な観光利用（地図、SNS、メッセージ、軽いウェブ閲覧）であれば、1日あたり500MB〜1GB程度です。7日間の旅行なら3〜5GBプランで十分です。動画視聴を頻繁に行う場合は、無制限プランをおすすめします。" },
      { q: "空港到着後すぐにeSIMを使えますか？", a: "出発前にeSIMをインストールしておけば、成田空港や羽田空港に到着後、機内モードを解除するだけですぐに通信が開始されます。設定が済んでいない場合でも、空港のフリーWiFiを使ってその場で設定可能です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMで日本旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "日本eSIMガイド",
  },
  en: {
    title: "Best eSIM for Japan Travel 2026 - Tokyo Arrivals, Airport Rail, and Hotel Backup",
    subtitle: "Plan Narita and Haneda arrivals, airport rail transfers, hotel WiFi backup, and pocket WiFi alternatives with one Japan eSIM",
    intro: "Looking for the best eSIM for Japan travel? A travel eSIM is usually the easiest way to get online before you leave Narita or Haneda, especially if you need airport rail directions, hotel check-in messages, taxi apps, and backup data before hotel WiFi is trustworthy. Japan has one of the world's most advanced mobile networks, making eSIM a low-friction option for Tokyo arrivals, rail-heavy itineraries, and business trips.",
    sections: [
      {
        title: "Japan's Mobile Network Overview",
        body: "Japan's mobile network is operated by three major carriers: NTT Docomo, au (KDDI), and SoftBank. All three provide extensive 4G LTE coverage nationwide, with 5G services available in major cities like Tokyo, Osaka, and Nagoya. Download speeds commonly exceed 100 Mbps in urban areas, making Japan one of the fastest mobile markets globally.\n\nRural and mountainous regions generally have solid 4G coverage, though some remote islands and hiking trails may have limited connectivity. Shinkansen (bullet train) routes also support mobile data, so you can stay connected while traveling between cities at over 300 km/h.\n\nTravel eSIM plans for Japan typically operate on Docomo or SoftBank networks, both offering reliable and fast connections throughout the country."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Japan eSIM plans range from short 3-day 1GB options to 30-day unlimited data packages. For a typical tourist trip of 7 to 10 days, a 3-5GB plan offers excellent value and is sufficient for navigation, social media, messaging, and light web browsing.\n\nAutoWiFi eSIM offers multiple Japan-specific plans tailored to different travel styles. If you plan to stream video or make frequent video calls, consider an unlimited data plan for worry-free connectivity. Most plans also support tethering, allowing you to share your connection with a tablet or laptop.\n\nPrices for Japan eSIM plans are competitive compared to pocket WiFi rentals, and you avoid the hassle of picking up and returning a device."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "Setting up your eSIM is straightforward. After purchasing a Japan plan from AutoWiFi eSIM, you will receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nWe recommend installing your eSIM before departure while you still have a stable WiFi connection. Once you arrive in Japan, simply turn off airplane mode or enable your eSIM line, and you will be connected within seconds. The entire setup process takes less than five minutes.\n\nNote that you need a WiFi or data connection to download the eSIM profile. If you haven't set it up beforehand, you can use free WiFi at Narita, Haneda, or Kansai airports to complete the installation."
      },
      {
        title: "Coverage in Major Cities",
        body: "Tokyo offers excellent coverage across all 23 special wards and surrounding suburbs. 5G is increasingly available in popular districts like Shibuya, Shinjuku, and Akihabara. Mobile data also works inside Tokyo Metro and Toei Subway stations, keeping you connected underground.\n\nThe Kansai region including Osaka, Kyoto, and Nara enjoys equally strong network performance. Tourist hotspots such as Kinkaku-ji, Fushimi Inari Shrine, and Dotonbori all have reliable connectivity. Regional hubs like Sapporo, Fukuoka, and Naha also provide fast mobile data.\n\nOn Mt. Fuji, coverage is generally available up to the 5th station but can become unreliable at higher elevations. Some remote islands may have limited coverage, so it is worth checking in advance if your itinerary includes off-the-beaten-path destinations."
      },
      {
        title: "Tips for Using eSIM in Japan",
        body: "Google Maps and Apple Maps work exceptionally well in Japan, with accurate train transfer guidance that is essential for navigating Tokyo's complex rail network. With an eSIM, you can access real-time navigation without worrying about finding WiFi hotspots.\n\nMany restaurants and attractions in Japan require reservations. Having constant data access lets you book popular restaurants through platforms like Tabelog and HotPepper while on the go. Translation apps also perform much better with a live data connection, which is invaluable in a country where English signage can be limited.\n\nWhile free WiFi is available at convenience stores and train stations, it often requires registration and can be unreliable. An eSIM provides a consistent, always-on connection that eliminates the frustration of hunting for WiFi."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I make phone calls with a Japan eSIM?", a: "Most travel eSIM plans are data-only. For voice calls, use VoIP apps like LINE, WhatsApp, or Skype. LINE is the most widely used communication app in Japan, so having it installed is highly recommended." },
      { q: "Does the eSIM work on the Shinkansen?", a: "Yes, mobile data works on Shinkansen bullet trains. You may experience brief interruptions in tunnels, but connectivity is stable for most of the journey. The Tokaido Shinkansen also offers onboard WiFi, though eSIM speeds tend to be more reliable." },
      { q: "How much data do I need for Japan?", a: "For typical tourist use including maps, social media, messaging, and light browsing, expect to use 500MB to 1GB per day. A 3-5GB plan is sufficient for a week-long trip. Choose an unlimited plan if you plan to stream videos frequently." },
      { q: "Can I use the eSIM immediately after landing?", a: "If you install the eSIM before departure, it activates automatically when you turn off airplane mode upon arrival at Narita, Haneda, or any other Japanese airport. If you haven't set it up yet, airport free WiFi can be used to complete the installation." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Japan with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Japan eSIM Guide",
  },
  ko: {
    title: "일본 eSIM 가이드 - 통신 환경, 추천 플랜, 설정 방법",
    subtitle: "eSIM으로 일본의 고속 모바일 통신을 편리하게 이용하세요",
    intro: "일본은 세계 최고 수준의 통신 인프라를 갖춘 나라입니다. 도시 지역에서는 5G가 빠르게 확장되고 있으며, 지방에서도 4G LTE가 거의 전 지역을 커버합니다. eSIM을 이용하면 도착 즉시 고속 통신을 사용할 수 있어 일본 여행이 한층 편리해집니다.",
    sections: [
      {
        title: "일본의 모바일 통신 환경",
        body: "일본의 이동통신 네트워크는 NTT 도코모, au(KDDI), 소프트뱅크 3대 통신사가 운영합니다. 모두 전국적으로 넓은 4G LTE 커버리지를 제공하며, 도쿄, 오사카, 나고야 등 주요 도시에서는 5G 서비스도 이용할 수 있습니다. 도시 지역에서의 다운로드 속도는 100Mbps 이상이 일반적입니다.\n\n지방이나 산간 지역에서도 기본적인 4G 통신이 가능하지만, 일부 외딴 섬이나 등산로에서는 커버리지가 제한될 수 있습니다. 신칸센 차내에서도 모바일 데이터를 사용할 수 있어 이동 중에도 인터넷을 이용할 수 있습니다.\n\n여행자용 eSIM 플랜은 주로 도코모 또는 소프트뱅크 회선을 사용하며, 안정적인 통신 품질을 제공합니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "일본 eSIM 플랜은 3일 1GB부터 30일 무제한까지 다양하게 제공됩니다. 일반적인 관광 여행이라면 7일 3~5GB 플랜이 가성비가 좋습니다. SNS, 지도 앱, 메신저 사용이 주라면 충분한 용량입니다.\n\nAutoWiFi eSIM에서는 일본 전용 플랜을 다양하게 제공하고 있습니다. 영상 시청이나 영상 통화를 자주 하는 경우 무제한 플랜을 추천합니다. 대부분의 플랜에서 테더링도 지원하므로 태블릿이나 노트북에서도 같은 회선을 공유할 수 있습니다.\n\n포켓 WiFi 대여와 비교해 가격도 경쟁력 있고, 수령·반납의 번거로움이 없어 매우 편리합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "eSIM 설정은 매우 간단합니다. AutoWiFi eSIM 사이트에서 일본 플랜을 구매하면 QR 코드가 이메일로 전송됩니다. iPhone의 경우 '설정' → '셀룰러' → 'eSIM 추가'에서 QR 코드를 스캔합니다. Android의 경우 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 설정합니다.\n\n출발 전 자택에서 미리 eSIM을 설치해 두는 것을 추천합니다. 일본 도착 후 비행기 모드를 해제하거나 eSIM 회선을 활성화하면 바로 사용 가능합니다. 설정 자체는 5분도 걸리지 않습니다.\n\neSIM 프로필 다운로드에는 WiFi 연결이 필요합니다. 사전 설정을 하지 못한 경우 나리타 공항이나 하네다 공항의 무료 WiFi를 이용해 설정할 수 있습니다."
      },
      {
        title: "주요 도시 커버리지",
        body: "도쿄에서는 23구 내는 물론 다마 지역과 주변 위성도시에서도 안정적인 고속 통신을 이용할 수 있습니다. 시부야, 신주쿠, 아키하바라 등 번화가에서는 5G도 이용 가능합니다. 도쿄 메트로와 도에이 지하철 역 구내에서도 모바일 통신이 가능합니다.\n\n오사카, 교토, 나라의 간사이 지역도 통신 환경이 매우 양호합니다. 긴카쿠지, 후시미이나리 신사, 도톤보리 등 관광 명소에서도 안정적으로 통신할 수 있습니다. 삿포로, 후쿠오카, 나하 등 지방 주요 도시에서도 고속 통신이 가능합니다.\n\n후지산 등산로는 5합목까지는 커버리지가 있지만, 그 이상의 고도에서는 접속이 불안정할 수 있습니다."
      },
      {
        title: "일본 여행에서의 eSIM 활용 팁",
        body: "일본에서는 Google Maps와 Apple Maps가 매우 정확하며 전철 환승 안내도 지원합니다. eSIM이 있으면 복잡한 도쿄의 철도망도 실시간 내비게이션으로 쉽게 이동할 수 있습니다.\n\n일본의 많은 식당과 관광 시설은 예약이 필요합니다. eSIM이 있으면 다베로그나 핫페퍼 등의 예약 사이트에 언제든 접속할 수 있어 인기 맛집 예약도 이동 중에 할 수 있습니다. 번역 앱도 데이터 연결이 있으면 정확도가 크게 향상됩니다.\n\n편의점이나 역의 무료 WiFi는 이용 가능하지만, 접속이 불안정하거나 등록이 필요한 경우가 많습니다. eSIM이 있으면 항상 안정적인 연결을 유지할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "일본 eSIM으로 전화를 걸 수 있나요?", a: "대부분의 여행자용 eSIM 플랜은 데이터 전용입니다. 통화가 필요한 경우 LINE, WhatsApp, Skype 등의 VoIP 앱을 이용하세요. 일본에서는 LINE이 가장 널리 사용되는 메신저 앱입니다." },
      { q: "신칸센에서도 eSIM을 사용할 수 있나요?", a: "네, 신칸센 차내에서도 모바일 데이터를 사용할 수 있습니다. 터널 내에서는 일시적으로 접속이 끊길 수 있지만, 대부분의 구간에서 안정적인 통신이 가능합니다." },
      { q: "일본에서 데이터 사용량은 얼마나 되나요?", a: "일반적인 관광 이용(지도, SNS, 메시지, 가벼운 웹 검색)이라면 하루 500MB~1GB 정도입니다. 7일 여행이라면 3~5GB 플랜이면 충분합니다. 영상 시청을 자주 하는 경우 무제한 플랜을 추천합니다." },
      { q: "공항 도착 후 바로 eSIM을 사용할 수 있나요?", a: "출발 전에 eSIM을 설치해 두면 나리타 공항이나 하네다 공항 도착 후 비행기 모드를 해제하는 것만으로 바로 통신이 시작됩니다. 설정이 안 된 경우에도 공항 무료 WiFi로 설정 가능합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 일본 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "일본 eSIM 가이드",
  },
  zh: {
    title: "日本eSIM指南 - 通信环境、推荐套餐与设置方法",
    subtitle: "使用eSIM畅享日本高速移动网络",
    intro: "日本拥有世界顶级的通信基础设施。城市地区5G网络正在快速扩展，全国范围内4G LTE覆盖率极高。使用eSIM，您可以在抵达后立即连接日本的高速网络，让旅途更加便捷。",
    sections: [
      {
        title: "日本移动通信概况",
        body: "日本的移动通信网络由三大运营商主导：NTT Docomo、au（KDDI）和SoftBank。三家运营商均在全国提供广泛的4G LTE覆盖，在东京、大阪、名古屋等主要城市还提供5G服务。城市地区的下载速度通常超过100Mbps，日本是全球移动网络速度最快的市场之一。\n\n农村和山区通常也有基本的4G覆盖，但部分偏远岛屿和登山步道可能信号有限。新干线列车上也支持移动数据，即使以300公里/小时的速度行驶，也能保持网络连接。\n\n旅行者eSIM套餐通常使用Docomo或SoftBank的网络，两者都能提供稳定可靠的连接。"
      },
      {
        title: "推荐eSIM套餐",
        body: "日本eSIM套餐从3天1GB的短期方案到30天无限流量套餐应有尽有。对于7至10天的典型观光行程，3-5GB套餐性价比最高，足够满足导航、社交媒体、即时通讯和轻度网页浏览的需求。\n\nAutoWiFi eSIM为不同旅行风格提供多种日本专属套餐。如果您计划频繁观看视频或进行视频通话，建议选择无限流量套餐。大多数套餐还支持热点共享，可以将网络分享给平板电脑或笔记本电脑。\n\n与租借随身WiFi相比，eSIM价格更具竞争力，而且省去了设备取还的麻烦。"
      },
      {
        title: "eSIM设置方法",
        body: "eSIM的设置非常简单。在AutoWiFi eSIM网站购买日本套餐后，您会通过邮件收到QR码。iPhone用户前往设置→蜂窝网络→添加eSIM扫描QR码即可。Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"进行设置。\n\n建议在出发前在家中提前安装eSIM。抵达日本后，只需关闭飞行模式或激活eSIM线路，即可立即开始使用。整个设置过程不到5分钟。\n\n请注意，下载eSIM配置文件需要WiFi连接。如果出发前未能完成设置，可以使用成田机场、羽田机场等处的免费WiFi进行安装。"
      },
      {
        title: "主要城市覆盖情况",
        body: "东京23区及周边卫星城均可享受稳定的高速网络。涩谷、新宿、秋叶原等热门商圈的5G覆盖正在不断扩大。东京地铁和都营地铁车站内也可使用移动数据。\n\n包括大阪、京都、奈良在内的关西地区通信环境同样出色。金阁寺、伏见稻荷大社、道顿堀等热门景点均有可靠的网络覆盖。札幌、福冈、那霸等地方主要城市也提供高速移动数据服务。\n\n富士山登山道在五合目以下通常有信号覆盖，但更高海拔处连接可能不稳定。部分偏远岛屿的覆盖可能有限，建议提前确认。"
      },
      {
        title: "日本旅行eSIM使用技巧",
        body: "在日本，Google Maps和Apple Maps非常精准，支持电车换乘导航。有了eSIM，即使面对复杂的东京铁路网，也能通过实时导航轻松出行。\n\n日本很多餐厅和景点需要预约。有了eSIM，您可以随时通过Tabelog、HotPepper等平台预订人气餐厅。翻译应用在有网络连接时准确度也会大幅提升，这在英文标识有限的日本非常实用。\n\n虽然便利店和车站提供免费WiFi，但通常需要注册且连接不稳定。eSIM能提供持续稳定的网络连接，免去寻找WiFi热点的烦恼。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "日本eSIM可以打电话吗？", a: "大多数旅行者eSIM套餐仅支持数据流量。如需通话，可使用LINE、WhatsApp、Skype等VoIP应用。LINE是日本最普及的通讯应用，建议提前安装。" },
      { q: "新干线上能用eSIM吗？", a: "可以，新干线列车内可以使用移动数据。通过隧道时可能会短暂断开，但大部分行程中网络连接都很稳定。" },
      { q: "在日本大概需要多少流量？", a: "一般观光使用（地图、社交媒体、即时通讯、轻度浏览），每天约500MB-1GB。7天行程选择3-5GB套餐即可。如果经常看视频，建议选择无限流量套餐。" },
      { q: "落地后能马上用eSIM吗？", a: "如果出发前已安装eSIM，抵达成田或羽田机场后关闭飞行模式即可立即连网。未提前设置的话，也可使用机场免费WiFi完成安装。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游日本。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "日本eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/japan-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="japan-esim" content={CONTENT[loc]} relatedArticles={RELATED[loc].articles} relatedTitle={RELATED[loc].title} />;
}
