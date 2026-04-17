import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "航路を決める前に見たい関連ガイド",
    articles: [
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド" },
      { slug: "international-esim", title: "International eSIM ガイド" },
      { slug: "global-esim", title: "Global eSIM ガイド" },
      { slug: "travel-data-usage-tips", title: "旅行中のデータ節約術" },
      { slug: "family-travel-esim", title: "家族旅行のeSIM" },
    ],
  },
  en: {
    title: "Compare More Before Your Cruise",
    articles: [
      { slug: "airport-connectivity-guide", title: "Airport Connectivity Guide" },
      { slug: "europe-esim", title: "Europe Multi-Country eSIM" },
      { slug: "croatia-esim", title: "Croatia eSIM for Island Hopping" },
      { slug: "greece-esim", title: "Greece eSIM for Island Hopping" },
      { slug: "philippines-esim", title: "Philippines eSIM for Island Travel" },
      { slug: "global-esim", title: "Global eSIM Guide" },
    ],
  },
  ko: {
    title: "크루즈 전에 더 비교할 가이드",
    articles: [
      { slug: "airport-connectivity-guide", title: "공항 WiFi 가이드" },
      { slug: "international-esim", title: "International eSIM 가이드" },
      { slug: "global-esim", title: "Global eSIM 가이드" },
      { slug: "travel-data-usage-tips", title: "여행 중 데이터 절약법" },
      { slug: "family-travel-esim", title: "가족 여행 eSIM" },
    ],
  },
  zh: {
    title: "邮轮出发前值得继续比较的指南",
    articles: [
      { slug: "airport-connectivity-guide", title: "机场通信指南" },
      { slug: "international-esim", title: "International eSIM 指南" },
      { slug: "global-esim", title: "Global eSIM 指南" },
      { slug: "travel-data-usage-tips", title: "旅行省流量技巧" },
      { slug: "family-travel-esim", title: "家庭旅行eSIM" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "クルーズ旅行でのeSIM活用ガイド - 寄港地と船上での通信",
    subtitle: "クルーズ船の高額WiFiを避けて、寄港地で賢くeSIMを使う方法",
    intro: "クルーズ旅行では通信環境が特殊です。船上WiFiは高額で低速なことが多く、寄港地では限られた時間で効率的にデータ通信を行う必要があります。本ガイドではクルーズ旅行者向けに、eSIMの最適な活用法と通信費の節約術を解説します。本記事ではクルーズ船の高額WiFiを避けて、寄港地で賢くeSIMを使う方法・クルーズ船の通信事情・寄港地でのeSIM活用術などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "クルーズ船の通信事情",
        body: "クルーズ船上のWiFiは衛星回線を利用しているため、料金が非常に高額です。主要クルーズ会社のWiFiパッケージは1日あたり15〜30ドルが一般的で、1週間のクルーズで100〜200ドル以上かかることも珍しくありません。さらに、衛星回線の特性上、速度は1〜5Mbps程度と陸上の通信に比べて大幅に遅いのが現実です。\n\nまた、船上WiFiには接続台数の制限があり、乗客が多い時間帯はさらに速度が低下します。ストリーミングやビデオ通話は困難な場合が多く、メール送受信やテキストメッセージ程度の利用に限られることもあります。\n\nこのような状況に対して、寄港地でeSIMを活用すれば、陸上の高速モバイルネットワークを利用して快適にインターネットに接続できます。SNSへの投稿、写真のアップロード、家族への連絡など、データ消費の多い作業は寄港地で済ませましょう。"
      },
      {
        title: "寄港地でのeSIM活用術",
        body: "クルーズの寄港時間は通常6〜10時間程度です。この限られた時間でeSIMを最大限活用するために、出発前にeSIMをインストールしておくことが重要です。寄港地に到着したら、スマートフォンのeSIMをオンにするだけですぐにデータ通信を開始できます。\n\n地中海クルーズの場合、イタリア、ギリシャ、クロアチア、スペインなど複数のEU加盟国に寄港するため、EU対応のeSIMプランが最適です。カリブ海クルーズでは、各島国のカバレッジを確認しておく必要がありますが、主要な寄港地（ジャマイカ、バハマ、メキシコなど）は多くのeSIMプロバイダーがカバーしています。\n\n寄港地での観光にはGoogle Mapsのナビゲーション、Grab/UberなどのタクシーアプリWiFi周辺のデータ通信が必須です。AutoWiFiのリージョナルプランなら、複数の寄港地を1つのeSIMでカバーできるため、寄港地ごとにSIMを切り替える手間がありません。"
      },
      {
        title: "船上でのオフライン対策",
        body: "船上でWiFiを使わない時間を快適に過ごすために、オフライン対策をしっかり行いましょう。出発前に以下のコンテンツをダウンロードしておくことをおすすめします。電子書籍やオーディオブック、NetflixやAmazon Primeのオフライン動画、Spotifyの音楽プレイリスト、各寄港地のオフライン地図です。\n\nまた、旅行の記録用にカメラアプリのフィルターやエフェクトを事前にダウンロードしておくと、船上でも写真編集が楽しめます。旅行日記アプリをオフラインで使えるように設定しておくのも良いでしょう。\n\n寄港地に到着したら、次の寄港地までに必要なコンテンツをまとめてダウンロードしておくと、船上での退屈な時間を有意義に過ごせます。クルーズ旅行はオフライン時間が長いため、事前準備が快適さを大きく左右します。"
      },
      {
        title: "クルーズ旅行のeSIMプラン選び",
        body: "クルーズ旅行向けのeSIMプランを選ぶ際は、航路と寄港地を確認してカバレッジを把握することが最優先です。地中海クルーズならヨーロッパ周遊プラン、カリブ海クルーズなら北米・カリブ海プラン、アジアクルーズならアジア周遊プランがそれぞれ適しています。\n\nデータ容量は、寄港地でのみ使用することを考慮すると、通常の旅行より少なめで十分です。7日間のクルーズで寄港が3〜4回なら、3〜5GBプランが妥当です。ただし、写真や動画のアップロードを多く行う場合は、余裕を持って大容量プランを選びましょう。\n\nAutoWiFiでは、クルーズの主要航路をカバーするリージョナルプランを提供しています。出発前にオンラインで購入・設定し、必要な寄港地でのみデータ通信を有効にすることで、効率的にデータを利用できます。有効期限内であれば、データを使わない船上の日数は消費されません。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "クルーズ船上でeSIMは使えますか？", a: "航海中（海上）ではeSIMの電波は届きません。eSIMは寄港地（陸上）でのみ利用可能です。船上でのインターネットには船のWiFiサービスを利用する必要があります。" },
      { q: "寄港地に着いたらeSIMは自動的に接続されますか？", a: "事前にeSIMをインストールし、データローミングを有効にしておけば、寄港地に到着して電波を受信した時点で自動的に接続されます。念のため、eSIMの設定がオンになっているか確認してください。" },
      { q: "複数の寄港地で同じeSIMが使えますか？", a: "はい、リージョナルプラン（ヨーロッパ周遊、アジア周遊など）を選べば、複数の寄港地で1つのeSIMを使い続けることができます。寄港地ごとにSIMを購入する必要はありません。" },
      { q: "クルーズ旅行にどれくらいのデータ容量が必要ですか？", a: "寄港地でのみ使用する場合、7日間クルーズで3〜5GBが目安です。寄港回数やSNS利用の頻度によって調整してください。写真のアップロードが多い場合は大容量プランがおすすめです。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiのeSIMで、クルーズの寄港地ごとに快適な高速通信を。船上WiFiの高額料金から解放されましょう。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "クルーズ旅行とeSIM"
  },
  en: {
    title: "eSIM for Cruise Travel - Port Stops & At-Sea Connectivity Guide",
    subtitle: "Skip expensive ship WiFi and use eSIM smartly at port destinations",
    intro: "Cruise travel presents unique connectivity challenges. Onboard WiFi is typically expensive and slow, while port stops offer limited time to get online efficiently. This guide helps cruise travelers make the most of eSIM technology to stay connected affordably at port destinations.",
    sections: [
      {
        title: "Understanding Cruise Ship Connectivity",
        body: "Cruise ship WiFi relies on satellite connections, making it expensive. Major cruise lines charge $15-30 per day for WiFi packages, meaning a week-long cruise can cost $100-200 or more for internet access alone. Speeds are typically 1-5 Mbps, dramatically slower than land-based mobile networks.\n\nShip WiFi also has capacity limitations. During peak usage times when many passengers are online, speeds drop further. Streaming video and making video calls is often impractical, and usage may be limited to basic email and text messaging.\n\nBy using an eSIM at port stops, you can tap into fast land-based mobile networks for comfortable internet access. Save data-heavy tasks like social media posting, photo uploading, and video calls with family for port days when you can enjoy full-speed connectivity."
      },
      {
        title: "Using eSIM at Port Destinations",
        body: "Typical port stops last 6-10 hours. To maximize this limited time, install your eSIM before departure. When your ship docks, simply enable your eSIM data and you are instantly connected to the local mobile network.\n\nFor Mediterranean cruises visiting Italy, Greece, Croatia, and Spain, an EU-compatible eSIM plan is ideal since all these countries fall under EU roaming rules. Caribbean cruises require checking coverage for specific islands, though major ports like Jamaica, Bahamas, and Mexico are covered by most eSIM providers.\n\nPort excursions depend heavily on mobile data for Google Maps navigation, ride-hailing apps, and real-time translation. AutoWiFi's regional plans cover multiple port countries under one eSIM, eliminating the need to swap SIMs at each stop."
      },
      {
        title: "Preparing for Offline Time at Sea",
        body: "Since you will spend significant time without internet access at sea, thorough offline preparation is key. Before departure, download ebooks and audiobooks, Netflix or Amazon Prime videos for offline viewing, Spotify playlists, and offline maps for each port destination.\n\nPhoto editing apps and filters should be downloaded in advance so you can edit vacation photos while at sea. Offline journaling or travel diary apps help you document your trip without needing a connection.\n\nAt each port stop, download content needed for the next leg of your voyage. Since cruise travel involves long offline periods, advance preparation significantly impacts your onboard experience."
      },
      {
        title: "Choosing the Right eSIM Plan for Cruises",
        body: "When selecting an eSIM for cruise travel, your first priority is matching the plan's coverage to your ship's itinerary. Mediterranean cruises pair well with Europe regional plans, Caribbean cruises with North America and Caribbean plans, and Asian cruises with Asia regional plans.\n\nSince you will only use data at port stops, you typically need less data than a standard trip. For a 7-day cruise with 3-4 port days, a 3-5GB plan is usually sufficient. If you plan to upload many photos and videos, choose a larger data package for peace of mind.\n\nAutoWiFi offers regional plans that cover major cruise routes. Purchase and configure online before boarding, then enable data only at port stops. On data plans with day-based validity, unused sea days do not count against your allowance as long as you keep the eSIM disabled while at sea."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does eSIM work on a cruise ship at sea?", a: "No, eSIM requires land-based cell towers and cannot connect while at sea. It works only at port destinations when your ship is docked. For at-sea connectivity, you would need the ship's satellite WiFi service." },
      { q: "Will my eSIM connect automatically at port stops?", a: "If you installed the eSIM beforehand and enabled data roaming, it will connect automatically when your phone picks up a signal at port. Check that your eSIM profile is enabled before docking." },
      { q: "Can one eSIM work at multiple port destinations?", a: "Yes, regional plans like Europe or Asia regional eSIMs work across multiple countries. You do not need to purchase separate SIMs for each port stop." },
      { q: "How much data do I need for a cruise trip?", a: "For port-only usage, 3-5GB is a good estimate for a 7-day cruise. Adjust based on number of port stops and how much you post on social media. Heavy photo uploaders should consider a larger plan." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Stay connected at every cruise port with AutoWiFi's eSIM. Fast land-based networks at a fraction of ship WiFi costs.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Cruise Travel eSIM"
  },
  ko: {
    title: "크루즈 여행 eSIM 활용 가이드 - 기항지와 선상 통신",
    subtitle: "비싼 선상 WiFi 대신, 기항지에서 eSIM을 현명하게 활용하는 방법",
    intro: "크루즈 여행에서는 통신 환경이 특수합니다. 선상 WiFi는 비싸고 느린 경우가 많으며, 기항지에서는 제한된 시간 내에 효율적으로 데이터 통신을 해야 합니다. 이 가이드에서는 크루즈 여행자를 위한 eSIM 최적 활용법을 알아봅니다.",
    sections: [
      {
        title: "크루즈선의 통신 환경",
        body: "크루즈선의 WiFi는 위성 회선을 사용하기 때문에 요금이 매우 비쌉니다. 주요 크루즈 회사의 WiFi 패키지는 하루 15~30달러가 일반적이며, 1주일 크루즈에서 100~200달러 이상이 들 수 있습니다. 속도도 1~5Mbps 정도로 육상 통신에 비해 크게 느립니다.\n\n또한 선상 WiFi는 접속 수에 제한이 있어, 승객이 많은 시간대에는 속도가 더 떨어집니다. 스트리밍이나 영상통화가 어려운 경우가 많고, 이메일이나 텍스트 메시지 정도의 이용에 한정되기도 합니다.\n\n기항지에서 eSIM을 활용하면 육상의 고속 모바일 네트워크로 쾌적하게 인터넷에 접속할 수 있습니다. SNS 게시, 사진 업로드, 가족 연락 등 데이터 소비가 많은 작업은 기항지에서 처리하세요."
      },
      {
        title: "기항지에서의 eSIM 활용법",
        body: "크루즈 기항 시간은 보통 6~10시간 정도입니다. 이 제한된 시간을 최대한 활용하기 위해 출발 전에 eSIM을 설치해 두는 것이 중요합니다. 기항지에 도착하면 eSIM을 켜기만 하면 바로 데이터 통신을 시작할 수 있습니다.\n\n지중해 크루즈의 경우 이탈리아, 그리스, 크로아티아, 스페인 등 여러 EU 가맹국에 기항하므로 EU 대응 eSIM 플랜이 최적입니다. 카리브해 크루즈에서는 각 섬나라의 커버리지를 확인해야 하지만, 주요 기항지(자메이카, 바하마, 멕시코 등)는 대부분의 eSIM 프로바이더가 커버합니다.\n\nAutoWiFi의 리전 플랜이면 여러 기항지를 하나의 eSIM으로 커버할 수 있어, 기항지마다 SIM을 교체하는 번거로움이 없습니다."
      },
      {
        title: "선상에서의 오프라인 대책",
        body: "선상에서 WiFi를 사용하지 않는 시간을 편안하게 보내기 위해 오프라인 준비를 철저히 하세요. 출발 전에 전자책이나 오디오북, Netflix나 Amazon Prime의 오프라인 동영상, Spotify 음악 플레이리스트, 각 기항지의 오프라인 지도를 다운로드해 두세요.\n\n사진 편집 앱의 필터와 효과도 사전에 다운로드해 두면 선상에서도 사진 편집을 즐길 수 있습니다. 오프라인 여행 일기 앱을 설정해 두는 것도 좋습니다.\n\n기항지에 도착하면 다음 기항지까지 필요한 콘텐츠를 한꺼번에 다운로드해 두면 선상에서의 시간을 유의미하게 보낼 수 있습니다."
      },
      {
        title: "크루즈 여행용 eSIM 플랜 선택",
        body: "크루즈 여행용 eSIM 플랜을 선택할 때는 항로와 기항지를 확인하여 커버리지를 파악하는 것이 최우선입니다. 지중해 크루즈는 유럽 로밍 플랜, 카리브해 크루즈는 북미·카리브 플랜, 아시아 크루즈는 아시아 로밍 플랜이 각각 적합합니다.\n\n기항지에서만 사용하므로 일반 여행보다 적은 데이터로 충분합니다. 7일 크루즈에서 기항이 3~4회라면 3~5GB 플랜이 적당합니다. 사진이나 동영상 업로드를 많이 할 경우 여유 있는 대용량 플랜을 선택하세요.\n\nAutoWiFi에서는 주요 크루즈 항로를 커버하는 리전 플랜을 제공합니다. 출발 전 온라인으로 구매·설정하고, 기항지에서만 데이터 통신을 활성화하면 효율적으로 데이터를 사용할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "크루즈선 위에서 eSIM을 사용할 수 있나요?", a: "항해 중(해상)에서는 eSIM 전파가 닿지 않습니다. eSIM은 기항지(육상)에서만 사용 가능합니다. 선상에서의 인터넷은 선박의 WiFi 서비스를 이용해야 합니다." },
      { q: "기항지에 도착하면 eSIM이 자동으로 연결되나요?", a: "사전에 eSIM을 설치하고 데이터 로밍을 활성화해 두면, 기항지에 도착하여 전파를 수신한 시점에 자동으로 연결됩니다. eSIM 설정이 켜져 있는지 확인해 두세요." },
      { q: "여러 기항지에서 같은 eSIM을 사용할 수 있나요?", a: "네, 리전 플랜(유럽 로밍, 아시아 로밍 등)을 선택하면 여러 기항지에서 하나의 eSIM을 계속 사용할 수 있습니다." },
      { q: "크루즈 여행에 얼마나 데이터가 필요한가요?", a: "기항지에서만 사용하는 경우 7일 크루즈에서 3~5GB가 기준입니다. 기항 횟수와 SNS 사용 빈도에 따라 조절하세요." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi의 eSIM으로 모든 크루즈 기항지에서 빠른 통신을. 비싼 선상 WiFi 비용에서 해방되세요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "크루즈 여행 eSIM"
  },
  zh: {
    title: "邮轮旅行eSIM指南 - 停靠港与海上通信攻略",
    subtitle: "避免昂贵的船上WiFi，在停靠港巧用eSIM上网",
    intro: "邮轮旅行有着独特的通信环境。船上WiFi通常昂贵且速度慢，而在停靠港需要在有限时间内高效使用数据。本指南为邮轮旅行者介绍eSIM的最佳使用方法和通信费节省技巧。",
    sections: [
      {
        title: "邮轮通信现状",
        body: "邮轮上的WiFi使用卫星连接，费用非常高。主要邮轮公司的WiFi套餐一般每天15-30美元，一周邮轮旅行仅上网费用就可能超过100-200美元。速度通常只有1-5Mbps，远低于陆地移动网络。\n\n船上WiFi还有连接数限制，乘客多的时段速度会进一步下降。视频流媒体和视频通话往往不太现实，使用可能仅限于基本的邮件和文字消息。\n\n在停靠港使用eSIM，就可以利用陆地高速移动网络舒适上网。社交媒体发帖、照片上传、家人联络等高流量操作留到停靠港再进行。"
      },
      {
        title: "在停靠港活用eSIM",
        body: "邮轮停靠时间通常为6-10小时。为了最大化利用这有限的时间，出发前就安装好eSIM非常重要。到达停靠港后，只需开启eSIM数据即可立即连接当地网络。\n\n地中海邮轮会停靠意大利、希腊、克罗地亚、西班牙等多个EU成员国，EU兼容eSIM套餐最为理想。加勒比海邮轮需要确认各岛国的覆盖情况，不过主要停靠港（牙买加、巴哈马、墨西哥等）大多数eSIM服务商都有覆盖。\n\nAutoWiFi的区域套餐可以用一张eSIM覆盖多个停靠国家，无需每到一个港口就更换SIM。"
      },
      {
        title: "海上离线准备",
        body: "由于在海上会有较长时间无法上网，做好离线准备至关重要。出发前建议下载电子书和有声书、Netflix或Amazon Prime的离线视频、Spotify音乐播放列表，以及各停靠港的离线地图。\n\n提前下载照片编辑应用的滤镜和效果，在船上也能享受修图乐趣。设置好离线旅行日记应用也是不错的选择。\n\n每到停靠港，把下一段航程需要的内容集中下载好，可以让海上时光更加充实。邮轮旅行离线时间较长，充分的事前准备会大大提升船上体验。"
      },
      {
        title: "邮轮旅行eSIM套餐选择",
        body: "选择邮轮旅行eSIM套餐时，首先要根据航线和停靠港确认覆盖范围。地中海邮轮适合欧洲漫游套餐，加勒比海邮轮适合北美加勒比套餐，亚洲邮轮适合亚洲漫游套餐。\n\n由于只在停靠港使用，数据需求通常比普通旅行少。7天邮轮停靠3-4次的话，3-5GB套餐通常就够了。如果要大量上传照片和视频，选择大流量套餐更放心。\n\nAutoWiFi提供覆盖主要邮轮航线的区域套餐。出发前在线购买设置，仅在停靠港启用数据，即可高效使用流量。在有效期内，海上不使用数据的天数不会消耗流量。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "在邮轮航行中eSIM能用吗？", a: "不能，eSIM需要陆地基站信号，在海上无法连接。只能在停靠港（陆地）使用。海上上网需要使用船上的卫星WiFi服务。" },
      { q: "到达停靠港后eSIM会自动连接吗？", a: "如果事先安装了eSIM并启用了数据漫游，到达停靠港收到信号后会自动连接。请确认eSIM配置已开启。" },
      { q: "一张eSIM能在多个停靠港使用吗？", a: "可以，选择区域套餐（如欧洲漫游、亚洲漫游）就能在多个停靠国家使用同一张eSIM，无需每个港口单独购买。" },
      { q: "邮轮旅行需要多少数据流量？", a: "仅在停靠港使用的话，7天邮轮约需3-5GB。根据停靠次数和社交媒体使用频率调整。大量上传照片建议选择更大的套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "用AutoWiFi的eSIM在每个邮轮停靠港享受高速网络。费用仅为船上WiFi的零头。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "邮轮旅行eSIM"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/cruise-travel-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="cruise-travel-esim"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
