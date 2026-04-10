import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "データ不足が不安なときに見る関連ガイド",
    articles: [
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行に必要なデータ量の目安" },
      { slug: "esim-data-plans-explained", title: "eSIMデータプラン解説" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM ガイド" },
      { slug: "esim-for-business-travel", title: "ビジネス旅行のeSIM" },
      { slug: "esim-hotspot-tethering", title: "eSIM hotspot ガイド" },
    ],
  },
  en: {
    title: "Compare More Before You Choose a Data Plan",
    articles: [
      { slug: "how-much-data-do-i-need-for-travel", title: "How Much Data Do I Need for Travel?" },
      { slug: "esim-data-plans-explained", title: "eSIM Data Plans Explained" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM Guide" },
      { slug: "esim-for-business-travel", title: "eSIM for Business Travel" },
      { slug: "esim-hotspot-tethering", title: "eSIM Hotspot Guide" },
    ],
  },
  ko: {
    title: "데이터 플랜 선택 전에 함께 볼 가이드",
    articles: [
      { slug: "how-much-data-do-i-need-for-travel", title: "여행에 필요한 데이터 용량" },
      { slug: "esim-data-plans-explained", title: "eSIM 데이터 플랜 설명" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM 가이드" },
      { slug: "esim-for-business-travel", title: "출장용 eSIM" },
      { slug: "esim-hotspot-tethering", title: "eSIM hotspot 가이드" },
    ],
  },
  zh: {
    title: "选流量套餐前值得继续比较的指南",
    articles: [
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行需要多少流量" },
      { slug: "esim-data-plans-explained", title: "eSIM流量套餐详解" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM 指南" },
      { slug: "esim-for-business-travel", title: "商务出差eSIM" },
      { slug: "esim-hotspot-tethering", title: "eSIM热点共享指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "海外旅行中のモバイルデータ節約術 - 賢くデータを使うコツ",
    subtitle: "限られたデータ容量を最大限活用して、快適な旅行を実現しよう",
    intro: "海外旅行中、モバイルデータの使い方次第で通信費は大きく変わります。地図アプリやSNS、翻訳ツールなど旅行に欠かせないアプリを使いながらも、データ容量を効率よく節約する方法を詳しく解説します。本記事では限られたデータ容量を最大限活用して、快適な旅行を実現しよう・データ消費量の多いアプリを把握する・オフライン機能を最大限活用するなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "データ消費量の多いアプリを把握する",
        body: "データ節約の第一歩は、どのアプリがどれだけデータを消費するかを理解することです。動画ストリーミング（YouTube、Netflix）は1時間あたり1〜3GB、ビデオ通話（Zoom、FaceTime）は1時間あたり500MB〜1.5GBと、最もデータを消費します。SNS（Instagram、TikTok）も画像や動画の自動読み込みにより、1時間あたり200〜500MB程度消費します。\n\n一方、テキストベースのメッセージ（LINE、WhatsApp）は非常に少なく、1日の通常利用で10〜30MB程度です。Google Mapsのナビゲーションは1時間あたり約5〜10MB、Webブラウジングはページにもよりますが1時間あたり約60MBです。\n\nこれらの消費量を把握しておくことで、旅行中にどのアプリを優先的に使い、どのアプリの使用を控えるべきかの判断がしやすくなります。"
      },
      {
        title: "オフライン機能を最大限活用する",
        body: "多くの旅行アプリにはオフラインモードが備わっており、出発前にデータをダウンロードしておけばデータ通信なしで利用できます。Google Mapsでは訪問先エリアの地図を事前にダウンロードしておくと、WiFi圏外でもナビゲーションが可能です。地図データは都市サイズにもよりますが50〜200MB程度で、これだけでかなりのデータを節約できます。\n\nGoogle翻訳やDeepLも言語パックのオフラインダウンロードに対応しています。日本語、韓国語、中国語などの言語パックをあらかじめダウンロードしておけば、ネット接続がなくても翻訳が可能です。Spotifyなどの音楽ストリーミングサービスも、プレミアムプランならオフライン再生用にプレイリストをダウンロードできます。\n\n旅行ガイドアプリ（TripAdvisor、Lonely Planetなど）も、事前にオフラインコンテンツをダウンロードしておくことで、現地でのデータ消費を大幅に抑えられます。"
      },
      {
        title: "スマートフォンの設定でデータを節約",
        body: "スマートフォンの設定を最適化するだけで、大幅なデータ節約が可能です。まず、アプリの自動アップデートをWiFi接続時のみに設定しましょう。iOS では\"設定\"→\"App Store\"→\"自動ダウンロード\"で、Android では\"Google Play\"→\"設定→ネットワーク設定で変更できます。\n\nSNSアプリの設定も見直しましょう。Instagramではデータ使用量を軽減\"をオンにすると、画像と動画の自動読み込みを減らせます。Facebookでも動画の自動再生をWiFi時のみに設定することで、フィード閲覧時のデータ消費を抑えられます。\n\nメールの同期頻度も重要です。プッシュ通知ではなく、手動での同期や30分ごとの同期に設定を変更すると、バックグラウンドでのデータ消費を削減できます。iCloudやGoogleフォトの自動バックアップもWiFi時のみに制限しましょう。"
      },
      {
        title: "WiFiスポットの賢い活用法",
        body: "海外のホテル、カフェ、レストラン、ショッピングモールなどの無料WiFiを活用することで、eSIMのデータ容量を温存できます。ただし、公共WiFiにはセキュリティリスクがあるため、銀行アプリの利用やパスワードの入力は避けましょう。VPNを使用すると安全性が向上します。\n\n多くの都市では、公共交通機関や観光施設でも無料WiFiが提供されています。東京の地下鉄、ソウルの公共WiFi、ヨーロッパの主要駅などでWiFi接続が可能です。これらを移動中の大容量ダウンロードに活用すると効率的です。\n\n大容量のファイル送信、アプリのアップデート、クラウドへの写真バックアップなど、データ消費の多い作業はWiFi環境で行うことを習慣化しましょう。AutoWiFiのeSIMと公共WiFiを組み合わせることで、コストを抑えながら常時接続を維持できます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "1日のデータ使用量の目安はどれくらいですか？", a: "一般的な旅行者の場合、地図、SNS、メッセージで1日300〜500MB程度です。動画視聴を加えると1〜2GB、リモートワーク（ビデオ会議含む）では3GB以上が必要です。" },
      { q: "データ低速モードでも使えるアプリはありますか？", a: "テキストメッセージ、メール、テキストベースのWeb閲覧は低速でも利用可能です。Google Mapsも事前にオフラインマップをダウンロードしておけば、低速環境でもナビゲーションできます。" },
      { q: "バックグラウンドでデータを消費しているアプリを確認するには？", a: "iOSでは設定→モバイル通信、Androidでは設定→ネットワーク→データ使用量で各アプリの消費量を確認できます。不要なアプリのモバイルデータをオフにすることも可能です。" },
      { q: "データが足りなくなった場合はどうすればいいですか？", a: "AutoWiFiではアプリ内からワンタップでデータを追加購入できます。追加プランを購入すれば、すぐにデータ通信が復旧します。WiFi環境で追加購入の手続きを行うとスムーズです。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiのeSIMなら、データ残量をアプリで簡単確認。足りなくなったら即座にデータ追加購入も可能です。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "データ節約術"
  },
  en: {
    title: "How to Save Mobile Data While Traveling Abroad",
    subtitle: "Maximize your data allowance with these practical tips and tricks",
    intro: "How you use mobile data while traveling abroad can significantly affect your costs. This guide covers practical strategies for conserving data while still using essential travel apps like maps, social media, and translation tools.",
    sections: [
      {
        title: "Know Which Apps Use the Most Data",
        body: "The first step to saving data is understanding which apps consume the most. Video streaming services like YouTube and Netflix use 1-3GB per hour, while video calls on Zoom or FaceTime consume 500MB-1.5GB per hour. Social media apps like Instagram and TikTok auto-load images and videos, using 200-500MB per hour of active browsing.\n\nBy contrast, text-based messaging through LINE or WhatsApp uses very little, roughly 10-30MB for a full day of typical messaging. Google Maps navigation consumes about 5-10MB per hour, and general web browsing uses around 60MB per hour depending on the pages you visit.\n\nUnderstanding these consumption patterns helps you make informed decisions about which apps to prioritize and which to restrict during your travels."
      },
      {
        title: "Maximize Offline Features",
        body: "Many travel apps offer offline modes that work without a data connection when you download content in advance. Google Maps lets you download map areas for offline navigation, typically 50-200MB per city. This alone can save significant data since maps are one of the most frequently used travel tools.\n\nGoogle Translate and DeepL support offline language packs. Download the languages you need before departure so translations work without internet. Music streaming services like Spotify allow premium users to download playlists for offline listening, eliminating streaming data usage entirely.\n\nTravel guide apps like TripAdvisor and Lonely Planet also offer offline content downloads. Saving restaurant reviews, attraction information, and walking routes ahead of time means you can explore without burning through your data allowance."
      },
      {
        title: "Optimize Your Phone Settings",
        body: "Adjusting your phone settings can dramatically reduce data consumption. Start by restricting app auto-updates to WiFi only. On iOS, go to Settings > App Store > Automatic Downloads. On Android, open Google Play > Settings > Network Preferences.\n\nReview social media app settings as well. Instagram's 'Use Less Data' option reduces automatic image and video loading. Facebook's video autoplay can be set to WiFi only, cutting data use when scrolling through your feed.\n\nEmail sync frequency matters too. Switch from push notifications to manual sync or 30-minute intervals to reduce background data usage. Disable automatic photo backup to iCloud or Google Photos over cellular data. These small adjustments add up to substantial savings over a multi-day trip."
      },
      {
        title: "Smart Use of WiFi Hotspots",
        body: "Free WiFi at hotels, cafes, restaurants, and malls lets you conserve your eSIM data for when you truly need mobile connectivity. However, exercise caution on public WiFi by avoiding banking apps and password entry. Using a VPN adds an extra layer of security.\n\nMany cities offer WiFi on public transit and at tourist attractions. Tokyo's subway system, Seoul's public WiFi network, and major European train stations all provide connectivity. Use these connections for bandwidth-heavy tasks like downloading maps or syncing photos.\n\nMake it a habit to save data-intensive tasks for WiFi: app updates, cloud photo backups, large file transfers, and software downloads. Combining AutoWiFi's eSIM with strategic WiFi use lets you stay connected at minimal cost throughout your journey."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "How much data does a typical traveler use per day?", a: "Average travelers using maps, social media, and messaging consume 300-500MB daily. Add video watching and usage rises to 1-2GB. Remote work with video calls requires 3GB or more per day." },
      { q: "Which apps work on slow or throttled connections?", a: "Text messaging, email, and text-based web browsing work on slow connections. Google Maps with pre-downloaded offline maps also works well in low-bandwidth situations." },
      { q: "How do I find which apps use data in the background?", a: "On iOS, check Settings > Cellular. On Android, go to Settings > Network > Data Usage. You can see per-app consumption and disable mobile data for apps that do not need it." },
      { q: "What if I run out of data during my trip?", a: "AutoWiFi lets you purchase additional data instantly through the app. Once you buy a top-up, connectivity resumes immediately. It is easiest to make the purchase while connected to WiFi." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi's eSIM lets you monitor data usage easily in the app. Run low? Add more data instantly with one tap.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Data Usage Tips"
  },
  ko: {
    title: "해외 여행 중 모바일 데이터 절약하는 방법",
    subtitle: "제한된 데이터를 최대한 활용하는 실용적인 팁과 요령",
    intro: "해외 여행 중 모바일 데이터 사용 방법에 따라 통신비가 크게 달라집니다. 지도 앱, SNS, 번역 도구 등 여행에 필수적인 앱을 사용하면서도 데이터 용량을 효율적으로 절약하는 방법을 자세히 알아봅니다.",
    sections: [
      {
        title: "데이터 소비가 많은 앱 파악하기",
        body: "데이터 절약의 첫걸음은 어떤 앱이 얼마나 데이터를 소비하는지 이해하는 것입니다. 동영상 스트리밍(YouTube, Netflix)은 시간당 1~3GB, 영상통화(Zoom, FaceTime)는 시간당 500MB~1.5GB로 가장 많은 데이터를 소비합니다. SNS(Instagram, TikTok)도 이미지와 동영상 자동 로딩으로 시간당 200~500MB 정도 소비합니다.\n\n반면 텍스트 기반 메시지(카카오톡, WhatsApp)는 매우 적어 하루 일반 사용 시 10~30MB 정도입니다. Google Maps 내비게이션은 시간당 약 5~10MB, 웹 브라우징은 시간당 약 60MB입니다.\n\n이런 소비량을 파악해 두면 여행 중 어떤 앱을 우선적으로 사용하고 어떤 앱 사용을 줄여야 할지 판단이 쉬워집니다."
      },
      {
        title: "오프라인 기능 최대한 활용하기",
        body: "많은 여행 앱에는 오프라인 모드가 있어, 출발 전에 데이터를 다운로드해 두면 데이터 통신 없이 이용할 수 있습니다. Google Maps에서 방문지 지도를 사전에 다운로드하면 WiFi 범위 밖에서도 내비게이션이 가능합니다. 지도 데이터는 도시 규모에 따라 50~200MB 정도입니다.\n\nGoogle 번역과 DeepL도 언어팩의 오프라인 다운로드를 지원합니다. 필요한 언어팩을 미리 다운로드해 두면 인터넷 연결 없이도 번역이 가능합니다. Spotify 등 음악 스트리밍 서비스도 프리미엄 플랜이면 오프라인 재생용으로 플레이리스트를 다운로드할 수 있습니다.\n\n여행 가이드 앱(TripAdvisor 등)도 오프라인 콘텐츠를 사전에 다운로드해 두면 현지에서의 데이터 소비를 크게 줄일 수 있습니다."
      },
      {
        title: "스마트폰 설정으로 데이터 절약하기",
        body: "스마트폰 설정을 최적화하는 것만으로도 상당한 데이터 절약이 가능합니다. 먼저 앱의 자동 업데이트를 WiFi 연결 시에만 하도록 설정하세요. iOS에서는 '설정' → 'App Store' → '자동 다운로드'에서, Android에서는 'Google Play' → '설정' → '네트워크 설정'에서 변경할 수 있습니다.\n\nSNS 앱 설정도 검토하세요. Instagram에서는 '데이터 사용량 줄이기'를 켜면 이미지와 동영상 자동 로딩을 줄일 수 있습니다. Facebook에서도 동영상 자동재생을 WiFi 시에만으로 설정하면 데이터 소비를 줄일 수 있습니다.\n\n이메일 동기화 빈도도 중요합니다. 푸시 알림 대신 수동 동기화나 30분 간격으로 설정을 변경하면 백그라운드 데이터 소비를 줄일 수 있습니다. iCloud나 Google Photos의 자동 백업도 WiFi 시에만으로 제한하세요."
      },
      {
        title: "WiFi 스팟 현명하게 활용하기",
        body: "호텔, 카페, 레스토랑, 쇼핑몰 등의 무료 WiFi를 활용하면 eSIM 데이터 용량을 아낄 수 있습니다. 다만 공공 WiFi에는 보안 위험이 있으므로 은행 앱 사용이나 비밀번호 입력은 피하세요. VPN을 사용하면 보안성이 향상됩니다.\n\n많은 도시에서 대중교통이나 관광시설에서도 무료 WiFi를 제공합니다. 도쿄 지하철, 서울 공공 WiFi, 유럽 주요 역 등에서 WiFi 연결이 가능합니다. 이동 중 대용량 다운로드에 활용하면 효율적입니다.\n\n앱 업데이트, 클라우드 사진 백업, 대용량 파일 전송 등 데이터 소비가 많은 작업은 WiFi 환경에서 하는 것을 습관화하세요. AutoWiFi의 eSIM과 공공 WiFi를 조합하면 비용을 줄이면서 항상 연결을 유지할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "하루 데이터 사용량의 기준은 어느 정도인가요?", a: "일반적인 여행자의 경우 지도, SNS, 메시지로 하루 300~500MB 정도입니다. 동영상 시청을 더하면 1~2GB, 원격 근무(화상 회의 포함)는 3GB 이상이 필요합니다." },
      { q: "저속에서도 사용 가능한 앱이 있나요?", a: "텍스트 메시지, 이메일, 텍스트 기반 웹 브라우징은 저속에서도 이용 가능합니다. Google Maps도 오프라인 지도를 사전에 다운로드해 두면 저속 환경에서도 내비게이션할 수 있습니다." },
      { q: "백그라운드에서 데이터를 소비하는 앱을 확인하려면?", a: "iOS에서는 '설정' → '셀룰러', Android에서는 '설정' → '네트워크' → '데이터 사용량'에서 각 앱의 소비량을 확인할 수 있습니다." },
      { q: "데이터가 부족해지면 어떻게 하나요?", a: "AutoWiFi에서는 앱 내에서 원탭으로 데이터를 추가 구매할 수 있습니다. 추가 플랜을 구매하면 바로 데이터 통신이 복구됩니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi의 eSIM이면 앱에서 데이터 잔량을 간편하게 확인. 부족하면 즉시 데이터 추가 구매도 가능합니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "데이터 절약 팁"
  },
  zh: {
    title: "旅行中如何节省移动数据 - 实用省流量技巧",
    subtitle: "最大化利用有限流量，实现经济实惠的旅行上网",
    intro: "海外旅行中，移动数据的使用方式直接影响通信费用。本指南将详细介绍如何在使用地图、社交媒体、翻译工具等旅行必备应用的同时，高效节省数据流量。",
    sections: [
      {
        title: "了解哪些应用最耗流量",
        body: "节省数据的第一步是了解各应用的流量消耗情况。视频流媒体（YouTube、Netflix）每小时消耗1-3GB，视频通话（Zoom、FaceTime）每小时500MB-1.5GB，是最耗流量的应用。社交媒体（Instagram、TikTok）由于自动加载图片和视频，每小时活跃浏览约消耗200-500MB。\n\n相比之下，文字消息（微信、WhatsApp）消耗很少，一天正常使用约10-30MB。Google Maps导航每小时约5-10MB，网页浏览每小时约60MB。\n\n了解这些消耗模式有助于在旅行中做出明智决策，确定哪些应用优先使用，哪些应该限制。"
      },
      {
        title: "充分利用离线功能",
        body: "许多旅行应用都有离线模式，提前下载数据即可在无网络环境下使用。Google Maps可以预先下载目的地地图实现离线导航，每个城市约50-200MB。仅这一项就能节省大量数据。\n\nGoogle翻译和DeepL支持离线语言包下载。出发前下载所需语言包，即使没有网络也能进行翻译。Spotify等音乐流媒体的高级用户可以下载播放列表离线收听，完全避免流媒体数据消耗。\n\n旅行指南应用（TripAdvisor等）也支持离线内容下载。提前保存餐厅评价、景点信息和步行路线，可以在探索时不消耗数据流量。"
      },
      {
        title: "优化手机设置省流量",
        body: "优化手机设置就能大幅减少数据消耗。首先将应用自动更新设为仅WiFi下进行。iOS在'设置'→'App Store'→'自动下载'中设置，Android在'Google Play'→'设置'→'网络偏好'中修改。\n\n检查社交媒体应用设置。Instagram的'减少数据用量'选项可以减少自动加载。Facebook的视频自动播放可设为仅WiFi下播放，减少刷帖时的数据消耗。\n\n邮件同步频率也很重要。将推送通知改为手动同步或30分钟间隔，可以减少后台数据消耗。iCloud和Google Photos的自动备份也应限制为仅WiFi下进行。"
      },
      {
        title: "巧用WiFi热点",
        body: "利用酒店、咖啡馆、餐厅和商场的免费WiFi可以节省eSIM数据流量。但在公共WiFi上要注意安全，避免使用银行应用或输入密码。使用VPN可以提高安全性。\n\n许多城市在公共交通和旅游景点也提供免费WiFi。东京地铁、首尔公共WiFi、欧洲主要车站等都可以连接WiFi。可以利用这些连接进行大文件下载等高流量操作。\n\n养成在WiFi环境下进行高流量操作的习惯：应用更新、云端照片备份、大文件传输等。将AutoWiFi的eSIM与公共WiFi结合使用，可以用最低成本保持全程在线。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "旅行者每天大概用多少流量？", a: "一般旅行者使用地图、社交媒体和消息，每天约300-500MB。加上看视频则需1-2GB，远程办公（含视频会议）需要3GB以上。" },
      { q: "低速网络下哪些应用还能用？", a: "文字消息、邮件和文字网页在低速下仍可使用。Google Maps预先下载离线地图后，在低带宽环境下也能正常导航。" },
      { q: "如何查看后台消耗数据的应用？", a: "iOS在'设置'→'蜂窝网络'查看，Android在'设置'→'网络'→'数据用量'查看各应用的消耗量，可以关闭不需要的应用的移动数据。" },
      { q: "旅途中流量用完了怎么办？", a: "AutoWiFi支持在应用内一键购买追加流量。购买后立即恢复数据连接。建议在WiFi环境下进行充值操作。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi的eSIM让您在应用中轻松查看剩余流量。不够用？一键即可追加购买。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "省流量技巧"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/travel-data-usage-tips", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="travel-data-usage-tips"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
