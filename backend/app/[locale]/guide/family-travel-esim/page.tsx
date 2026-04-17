import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "家族旅行前に見たい関連ガイド",
    articles: [
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド" },
      { slug: "travel-data-usage-tips", title: "旅行中のデータ節約術" },
      { slug: "esim-compatible-phones", title: "eSIM対応スマホ一覧" },
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行に必要なデータ量の目安" },
      { slug: "cruise-travel-esim", title: "クルーズ旅行のeSIM" },
    ],
  },
  en: {
    title: "Compare More Before Family Trips",
    articles: [
      { slug: "airport-connectivity-guide", title: "Airport Connectivity Guide" },
      { slug: "travel-data-usage-tips", title: "How to Save Mobile Data While Traveling" },
      { slug: "esim-compatible-phones", title: "eSIM Compatible Phones" },
      { slug: "how-much-data-do-i-need-for-travel", title: "How Much Data Do I Need for Travel?" },
      { slug: "cruise-travel-esim", title: "eSIM for Cruise Travel" },
    ],
  },
  ko: {
    title: "가족 여행 전에 더 비교할 가이드",
    articles: [
      { slug: "airport-connectivity-guide", title: "공항 WiFi 가이드" },
      { slug: "travel-data-usage-tips", title: "여행 중 데이터 절약법" },
      { slug: "esim-compatible-phones", title: "eSIM 지원 기기" },
      { slug: "how-much-data-do-i-need-for-travel", title: "여행에 필요한 데이터 용량" },
      { slug: "cruise-travel-esim", title: "크루즈 여행 eSIM" },
    ],
  },
  zh: {
    title: "家庭出行前值得继续比较的指南",
    articles: [
      { slug: "airport-connectivity-guide", title: "机场通信指南" },
      { slug: "travel-data-usage-tips", title: "旅行省流量技巧" },
      { slug: "esim-compatible-phones", title: "eSIM兼容手机" },
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行需要多少流量" },
      { slug: "cruise-travel-esim", title: "邮轮旅行eSIM" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "家族旅行向けeSIMガイド - 複数デバイス・子供・共有プランの選び方",
    subtitle: "家族全員が快適にインターネットを使える海外旅行の通信戦略",
    intro: "家族での海外旅行では、大人のスマートフォンだけでなく、子供のタブレットやゲーム機など複数のデバイスでインターネット接続が必要になります。本ガイドでは、家族旅行に最適なeSIMプランの選び方とデバイス管理のコツを解説します。本記事では家族全員が快適にインターネットを使える海外旅行の通信戦略・家族旅行で必要なデバイスと通信・テザリングで家族全員をカバーする方法などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "家族旅行で必要なデバイスと通信",
        body: "家族旅行では、親のスマートフォン2台に加えて、子供のタブレットやスマートフォン、場合によってはノートPCやゲーム機もインターネット接続が必要です。移動中の子供のエンターテインメント、現地での情報検索、緊急時の連絡手段として、安定した通信環境の確保は欠かせません。\n\neSIMを活用する方法は大きく2つあります。1つ目は、各デバイスにそれぞれeSIMをインストールする方法。eSIM対応のスマートフォンやタブレットなら、それぞれのデバイスで独立したデータ通信が可能です。2つ目は、親のスマートフォン1台にeSIMをインストールし、テザリング（ホットスポット機能）で他のデバイスに共有する方法です。\n\nどちらの方法が最適かは、家族の人数、デバイスの数、旅行のスタイルによって異なります。常に家族が一緒に行動するならテザリングが経済的ですが、別行動が多い場合は各デバイスにeSIMをインストールする方が便利です。"
      },
      {
        title: "テザリングで家族全員をカバーする方法",
        body: "テザリングは、1つのeSIMプランで家族全員のデバイスにインターネット接続を提供する最も経済的な方法です。親のスマートフォンにeSIMをインストールし、ホットスポットをオンにすれば、周囲の家族のデバイス（最大5〜10台）が接続できます。\n\nテザリング時の注意点として、まずバッテリー消費が通常の2〜3倍になります。モバイルバッテリーを持参するか、子供がタブレットを使う時間をホテルのWiFi環境に集中させましょう。また、テザリング元のスマートフォンとデバイスの距離が離れすぎると接続が不安定になるため、同じ場所にいることが前提です。\n\nデータ容量の目安として、大人2人＋子供2人の4人家族の場合、テザリングで7日間使用するなら10〜15GBのプランがおすすめです。子供が動画視聴をする場合は、ホテルのWiFiに任せるようにすれば、データ消費を大幅に抑えられます。"
      },
      {
        title: "子供のデバイス管理と安全な接続",
        body: "子供のデバイスにeSIMをインストールする場合、いくつかのセキュリティ設定を行っておくことが重要です。まず、スクリーンタイムやペアレンタルコントロールの設定を確認し、不適切なコンテンツへのアクセスを制限しましょう。iOSのスクリーンタイムやAndroidのファミリーリンク機能が便利です。\n\n子供のデバイスの位置情報を共有する設定をオンにしておくと、観光地での迷子対策にもなります。Find My iPhoneやGoogleのファミリーリンクで家族の位置を確認できるようにしておきましょう。\n\n子供がデータを大量に消費してしまわないよう、モバイルデータでの動画ストリーミングやアプリダウンロードを制限する設定を行いましょう。YouTube Kidsなどの子供向けアプリのオフラインダウンロード機能を活用すれば、出発前に動画をダウンロードしておくことでデータを節約できます。"
      },
      {
        title: "家族旅行に最適なeSIMプランの選び方",
        body: "家族旅行でのeSIMプラン選びでは、まず家族全員のデバイスの台数を把握しましょう。eSIM対応デバイスの数によって、必要なeSIMプランの数が変わります。最近のiPadやiPhoneはほとんどがeSIM対応ですが、子供用の古いデバイスは対応していない場合もあります。\n\nコストを抑えるなら、親の1台にAutoWiFiの大容量eSIMプランを購入し、テザリングで共有するのが最もシンプルです。2台のスマートフォンに別々のeSIMを入れておけば、家族が2グループに分かれて行動する場合にも対応できます。\n\nAutoWiFiでは、同じアカウントで複数のeSIMプランを管理できるため、家族全員分のプランを一括で購入・管理できます。子供用には小容量プラン、大人用には中〜大容量プランと、デバイスごとに最適なプランを選ぶことも可能です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "子供のiPadにもeSIMを入れられますか？", a: "はい、WiFi + Cellularモデルの iPad（2018年以降のモデル）はeSIMに対応しています。WiFiモデルのiPadは非対応ですので、その場合はテザリングで接続してください。" },
      { q: "テザリングで何台まで接続できますか？", a: "機種によりますが、一般的に5〜10台のデバイスを同時に接続できます。ただし、接続台数が増えるとバッテリー消費が早くなり、通信速度も分散されるため、4〜5台程度の利用がおすすめです。" },
      { q: "家族で別行動する場合のおすすめは？", a: "eSIM対応スマートフォンが2台以上あれば、それぞれにeSIMプランをインストールするのがおすすめです。AutoWiFiでは同一アカウントで複数プランを管理できるため、家族全員分を一括管理できます。" },
      { q: "4人家族で7日間の旅行に必要なデータ容量は？", a: "テザリングで共有する場合、10〜15GBが目安です。子供の動画視聴をWiFi環境に限定すれば、10GB程度で十分です。各デバイスに個別eSIMを入れる場合は、1人あたり3〜5GBを目安にしてください。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiなら、家族全員分のeSIMプランを1つのアカウントで簡単管理。テザリングにも対応した大容量プランも充実。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "家族旅行向けeSIM"
  },
  en: {
    title: "eSIM for Family Travel - Multiple Devices, Kids & Sharing Plans",
    subtitle: "Keep the whole family connected abroad with smart eSIM strategies",
    intro: "Family travel abroad means connecting not just parental smartphones but also children's tablets, gaming devices, and sometimes laptops. This guide covers how to choose the best eSIM plans for families and manage connectivity across multiple devices efficiently.",
    sections: [
      {
        title: "Family Travel Device and Connectivity Needs",
        body: "A typical family trip requires internet for two parental smartphones plus children's tablets, phones, or gaming devices. Keeping kids entertained during transit, searching for local information, and maintaining emergency communication all depend on reliable connectivity.\n\nTwo main approaches work with eSIM. First, install a separate eSIM on each compatible device for independent data access. Second, install one eSIM on a parent's phone and share the connection via tethering (hotspot) to other devices.\n\nThe best approach depends on your family size, device count, and travel style. Tethering is more economical when the family stays together, while individual eSIMs on multiple devices work better when family members split into groups for different activities."
      },
      {
        title: "Using Tethering to Cover the Whole Family",
        body: "Tethering is the most cost-effective way to provide internet to all family devices using a single eSIM plan. Install an eSIM on a parent's smartphone, enable the hotspot, and nearby family devices (up to 5-10) can connect.\n\nKeep in mind that tethering drains battery 2-3 times faster than normal use. Carry a portable battery bank or concentrate children's tablet time during hotel WiFi time. Also, devices need to stay within range of the tethering phone, so this approach works best when the family is together.\n\nFor data planning, a family of four using tethering for 7 days should consider a 10-15GB plan. Restricting children's video streaming to hotel WiFi dramatically reduces mobile data consumption."
      },
      {
        title: "Managing Kids' Devices and Safe Connectivity",
        body: "When installing eSIM on children's devices, configure security settings first. Set up Screen Time (iOS) or Family Link (Android) to restrict access to inappropriate content and limit app usage during the trip.\n\nEnable location sharing on children's devices as a safety measure at crowded tourist attractions. Set up Find My iPhone or Google Family Link so parents can check family members' locations in real time.\n\nPrevent children from consuming excessive data by restricting mobile data for video streaming and app downloads. Use offline download features in apps like YouTube Kids to pre-load videos before departure, saving precious mobile data for essential uses."
      },
      {
        title: "Choosing the Best eSIM Plan for Family Travel",
        body: "Start by counting how many eSIM-compatible devices your family has. Recent iPads and iPhones support eSIM, but older children's devices may not. This determines how many eSIM plans you need versus how many devices will rely on tethering.\n\nThe most budget-friendly option is purchasing one large-capacity AutoWiFi eSIM plan on a parent's phone and sharing via tethering. Installing eSIMs on two parental phones provides flexibility when the family splits into two groups.\n\nAutoWiFi lets you manage multiple eSIM plans under one account, making it easy to purchase and track plans for the entire family. You can assign smaller data plans to children's devices and larger plans to adult phones, optimizing cost based on each family member's needs."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I install eSIM on my child's iPad?", a: "Yes, iPads with WiFi + Cellular (2018 and later models) support eSIM. WiFi-only iPads do not support eSIM and will need to connect via tethering from a parent's phone." },
      { q: "How many devices can connect via tethering?", a: "Typically 5-10 devices can connect simultaneously, depending on your phone model. However, more connected devices means faster battery drain and slower speeds per device. 4-5 devices is the practical sweet spot." },
      { q: "What if family members split up during the day?", a: "If you have two or more eSIM-compatible phones, install separate eSIM plans on each. AutoWiFi lets you manage multiple plans under one account for easy family-wide management." },
      { q: "How much data does a family of four need for a week?", a: "With tethering from one device, 10-15GB is a good estimate. Limiting kids' video streaming to WiFi brings this down to about 10GB. With individual eSIMs, plan for 3-5GB per person." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi makes family travel simple. Manage multiple eSIM plans under one account with generous data for tethering.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Family Travel eSIM"
  },
  ko: {
    title: "가족 여행 eSIM 가이드 - 다중 기기·아이들·공유 플랜 선택법",
    subtitle: "가족 모두가 편안하게 인터넷을 사용하는 해외 여행 통신 전략",
    intro: "가족 해외 여행에서는 부모의 스마트폰뿐 아니라 아이들의 태블릿, 게임기 등 여러 기기에서 인터넷 연결이 필요합니다. 이 가이드에서는 가족 여행에 최적인 eSIM 플랜 선택법과 기기 관리 팁을 알아봅니다.",
    sections: [
      {
        title: "가족 여행에 필요한 기기와 통신",
        body: "가족 여행에서는 부모 스마트폰 2대에 더해 아이들의 태블릿이나 스마트폰, 경우에 따라 노트북이나 게임기도 인터넷 연결이 필요합니다. 이동 중 아이들의 엔터테인먼트, 현지 정보 검색, 긴급 연락 수단으로 안정적인 통신 환경 확보가 필수입니다.\n\neSIM 활용 방법은 크게 2가지입니다. 첫째, 각 기기에 개별 eSIM을 설치하는 방법. eSIM 지원 스마트폰이나 태블릿이면 각각 독립적인 데이터 통신이 가능합니다. 둘째, 부모 스마트폰 1대에 eSIM을 설치하고 테더링(핫스팟)으로 다른 기기에 공유하는 방법입니다.\n\n항상 가족이 함께 행동한다면 테더링이 경제적이지만, 별도 행동이 많다면 각 기기에 eSIM을 설치하는 것이 편리합니다."
      },
      {
        title: "테더링으로 가족 전원 커버하는 방법",
        body: "테더링은 하나의 eSIM 플랜으로 가족 모든 기기에 인터넷을 제공하는 가장 경제적인 방법입니다. 부모 스마트폰에 eSIM을 설치하고 핫스팟을 켜면, 주변 가족 기기(최대 5~10대)가 접속할 수 있습니다.\n\n테더링 시 주의점으로, 배터리 소모가 평소의 2~3배가 됩니다. 보조 배터리를 준비하거나 아이들의 태블릿 사용 시간을 호텔 WiFi 환경에 집중시키세요. 테더링 원본 스마트폰과 기기의 거리가 멀어지면 연결이 불안정해지므로, 같은 장소에 있는 것이 전제입니다.\n\n어른 2명+아이 2명의 4인 가족이 테더링으로 7일간 사용할 경우, 10~15GB 플랜을 추천합니다. 아이들의 동영상 시청을 호텔 WiFi에 맡기면 데이터 소비를 크게 줄일 수 있습니다."
      },
      {
        title: "아이 기기 관리와 안전한 연결",
        body: "아이 기기에 eSIM을 설치하는 경우, 보안 설정을 먼저 해두는 것이 중요합니다. 스크린 타임이나 보호자 관리 설정을 확인하여 부적절한 콘텐츠 접근을 제한하세요. iOS의 '스크린 타임'이나 Android의 '패밀리 링크' 기능이 유용합니다.\n\n아이 기기의 위치 정보 공유를 켜두면 관광지에서의 미아 방지에도 도움이 됩니다. 'iPhone 찾기'나 Google '패밀리 링크'로 가족 위치를 실시간으로 확인할 수 있도록 설정하세요.\n\n아이들이 데이터를 과다하게 소비하지 않도록, 모바일 데이터로의 동영상 스트리밍이나 앱 다운로드를 제한하는 설정을 하세요. YouTube Kids 등의 오프라인 다운로드 기능을 활용하면 출발 전에 동영상을 다운로드해 데이터를 절약할 수 있습니다."
      },
      {
        title: "가족 여행에 최적인 eSIM 플랜 선택",
        body: "가족 여행의 eSIM 플랜 선택에서는 먼저 가족 전원의 기기 수를 파악하세요. eSIM 지원 기기의 수에 따라 필요한 eSIM 플랜 수가 달라집니다. 최근 iPad과 iPhone은 대부분 eSIM을 지원하지만, 아이용 구형 기기는 미지원일 수 있습니다.\n\n비용을 줄이려면 부모 1명의 스마트폰에 AutoWiFi 대용량 eSIM 플랜을 구입하고 테더링으로 공유하는 것이 가장 간단합니다. 2대의 스마트폰에 각각 eSIM을 넣으면 가족이 2그룹으로 나뉘어 행동할 때도 대응할 수 있습니다.\n\nAutoWiFi에서는 같은 계정으로 여러 eSIM 플랜을 관리할 수 있어 가족 전원분의 플랜을 일괄 구매·관리할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "아이의 iPad에도 eSIM을 넣을 수 있나요?", a: "네, WiFi + Cellular 모델의 iPad(2018년 이후 모델)은 eSIM을 지원합니다. WiFi 전용 모델은 미지원이므로 테더링으로 연결하세요." },
      { q: "테더링으로 몇 대까지 연결할 수 있나요?", a: "기종에 따라 다르지만 일반적으로 5~10대를 동시 연결할 수 있습니다. 다만 접속 대수가 늘면 배터리 소모가 빨라지고 속도도 분산되므로 4~5대 정도가 적당합니다." },
      { q: "가족이 따로 행동할 때의 추천은?", a: "eSIM 지원 스마트폰이 2대 이상이면 각각에 eSIM 플랜을 설치하는 것을 추천합니다. AutoWiFi에서는 동일 계정으로 여러 플랜을 관리할 수 있습니다." },
      { q: "4인 가족이 7일 여행에 필요한 데이터 용량은?", a: "테더링 공유 시 10~15GB가 기준입니다. 아이들의 동영상 시청을 WiFi 환경에 한정하면 10GB 정도면 충분합니다. 개별 eSIM을 넣는 경우 1인당 3~5GB를 기준으로 하세요." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi면 가족 전원의 eSIM 플랜을 하나의 계정으로 간편 관리. 테더링에도 대응한 대용량 플랜 충실.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "가족 여행 eSIM"
  },
  zh: {
    title: "家庭旅行eSIM指南 - 多设备·孩子·共享方案选择",
    subtitle: "让全家人在海外旅行中舒心上网的通信策略",
    intro: "家庭海外旅行中，不仅是父母的手机，孩子的平板、游戏机等多台设备都需要联网。本指南介绍家庭旅行最佳eSIM方案的选择方法和设备管理技巧。",
    sections: [
      {
        title: "家庭旅行的设备和通信需求",
        body: "家庭旅行通常需要为父母的2台手机加上孩子的平板、手机，有时还有笔记本电脑和游戏机提供网络连接。途中给孩子看节目、查找当地信息、紧急联络等都离不开稳定的通信环境。\n\neSIM有两种使用方式。一是在每台设备上分别安装eSIM，支持eSIM的手机和平板可以各自独立上网。二是在父母的一台手机上安装eSIM，通过热点（网络共享）功能分享给其他设备。\n\n如果全家始终在一起行动，热点共享更经济；如果经常分组活动，每台设备装eSIM更方便。"
      },
      {
        title: "用热点功能覆盖全家",
        body: "热点共享是用一个eSIM套餐为全家设备提供网络的最经济方式。在父母手机上安装eSIM，打开热点，周围的家人设备（最多5-10台）就能连接。\n\n使用热点时需注意，电池消耗会达到平时的2-3倍。请携带移动电源，或者把孩子使用平板的时间集中在酒店WiFi环境下。热点手机和设备距离太远会导致连接不稳定，需要在同一地点。\n\n4口之家（2大人+2小孩）热点共享使用7天的话，推荐10-15GB套餐。把孩子看视频的需求留给酒店WiFi，可以大幅减少流量消耗。"
      },
      {
        title: "孩子设备管理与安全上网",
        body: "在孩子设备上安装eSIM时，先做好安全设置很重要。检查屏幕使用时间和家长控制设置，限制不当内容的访问。iOS的'屏幕使用时间'和Android的'Family Link'功能很实用。\n\n开启孩子设备的位置共享功能，在人多的景点可以防止走失。设置好'查找我的iPhone'或Google Family Link，让父母可以实时查看家人位置。\n\n防止孩子过度消耗流量，限制移动数据下的视频流媒体和应用下载。利用YouTube Kids等应用的离线下载功能，出发前下载好视频，节省宝贵的移动数据。"
      },
      {
        title: "选择最适合家庭旅行的eSIM方案",
        body: "选择家庭旅行eSIM方案时，先统计全家有多少台支持eSIM的设备。最近的iPad和iPhone基本都支持eSIM，但孩子用的旧设备可能不支持。这决定了需要几个eSIM套餐，哪些设备需要靠热点连接。\n\n最省钱的方案是在父母的一台手机上购买AutoWiFi大流量eSIM套餐，通过热点共享。在两台手机上分别装eSIM，家人分成两组活动时也能应对。\n\nAutoWiFi支持同一账号管理多个eSIM套餐，全家的套餐可以统一购买和管理。可以为孩子的设备选择小流量套餐，大人选择中大流量套餐，按需优化成本。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "孩子的iPad能装eSIM吗？", a: "可以，WiFi + 蜂窝网络版iPad（2018年及以后型号）支持eSIM。纯WiFi版iPad不支持eSIM，需要通过父母手机热点连接。" },
      { q: "热点最多能连接几台设备？", a: "一般可以同时连接5-10台，取决于手机型号。但连接设备越多，电池消耗越快，每台设备的速度也会下降。实际使用4-5台比较合适。" },
      { q: "家人分开活动时怎么办？", a: "如果有2台以上支持eSIM的手机，建议各装一个eSIM套餐。AutoWiFi支持同一账号管理多个套餐，方便全家统一管理。" },
      { q: "4口之家7天旅行需要多少流量？", a: "热点共享约需10-15GB。限制孩子只在WiFi下看视频可降至约10GB。各设备独立装eSIM的话，每人3-5GB为宜。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi让家庭旅行通信更简单。一个账号管理全家eSIM套餐，大流量套餐支持热点共享。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "家庭旅行eSIM"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/family-travel-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="family-travel-esim"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
