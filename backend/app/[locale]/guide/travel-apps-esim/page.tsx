import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIMと相性抜群の旅行アプリ - 地図・翻訳・配車アプリ完全ガイド",
    subtitle: "eSIMのデータ通信を最大限活用できる旅行必須アプリを厳選紹介",
    intro: "eSIMがあれば海外でもスマートフォンの機能をフル活用できます。地図ナビゲーション、リアルタイム翻訳、配車サービスなど、旅行を快適にするアプリはデータ通信が前提です。本ガイドでは、eSIMと組み合わせて使いたい厳選アプリをカテゴリ別に紹介します。本記事ではeSIMのデータ通信を最大限活用できる旅行必須アプリを厳選紹介・地図・ナビゲーションアプリ・翻訳・コミュニケーションアプリなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "地図・ナビゲーションアプリ",
        body: "Google Mapsは海外旅行に不可欠なアプリです。リアルタイムのナビゲーション、公共交通機関の乗り換え案内、周辺のレストランやATMの検索など、あらゆる場面で活躍します。データ消費量は1時間あたり約5〜10MBと少なく、eSIMのデータ容量をほとんど圧迫しません。オフラインマップの事前ダウンロード機能も備えているため、データ節約との相性も抜群です。\n\nMaps.meは完全オフラインで使える地図アプリです。世界中の地図をあらかじめダウンロードしておけば、データ通信なしでもナビゲーションが可能です。Google Mapsほどの情報量はありませんが、eSIMのデータを節約したい場合のバックアップとして最適です。\n\nCitymapperは都市部の公共交通機関に特化したアプリで、ロンドン、パリ、ニューヨーク、東京など主要都市でリアルタイムの運行情報や最適ルートを表示します。地下鉄やバスの乗り換えが複雑な都市では特に重宝します。"
      },
      {
        title: "翻訳・コミュニケーションアプリ",
        body: "Google翻訳は100以上の言語に対応し、テキスト翻訳だけでなくカメラ翻訳（看板やメニューをかざすだけで翻訳）、音声翻訳にも対応しています。eSIMのデータ通信があれば、レストランでメニューを読んだり、現地の人と会話したりする際にリアルタイムで翻訳できます。オフライン翻訳用の言語パックもダウンロード可能です。\n\nDeepLはより自然な翻訳品質で知られ、特にヨーロッパ言語の翻訳精度が高いです。旅行中のメール作成やSNS投稿の翻訳チェックに便利です。Papago（パパゴ）は韓国のNaver社製の翻訳アプリで、日本語・韓国語・中国語間の翻訳精度に優れています。\n\nWhatsAppやLINEなどのメッセージングアプリは、テキストメッセージだけでなく音声通話やビデオ通話にも使えます。eSIMのデータ通信で、国際通話料を気にせず家族や友人と連絡を取り合えます。"
      },
      {
        title: "配車・交通アプリ",
        body: "Uberは世界70カ国以上で利用できる配車アプリの代表格です。空港からの移動、観光地間の移動など、現地のタクシー料金を事前に確認してから乗車できるため、ぼったくりの心配がありません。eSIMのデータ通信があれば、到着後すぐにUberで空港からホテルまで移動できます。\n\nGrabは東南アジアで最も利用されている配車アプリで、タイ、ベトナム、マレーシア、シンガポール、フィリピン、インドネシアなどで利用可能です。バイクタクシーやフードデリバリーにも対応しており、東南アジア旅行では必須のアプリです。\n\nBolt（旧Taxify）はヨーロッパやアフリカで人気の配車アプリで、Uberが利用できない地域のカバーに役立ちます。Google Mapsとの連携で乗車場所をスムーズに指定でき、キャッシュレス決済にも対応しています。これらの配車アプリはすべてリアルタイムのデータ通信が必要なため、eSIMとの相性は抜群です。"
      },
      {
        title: "旅行計画・情報収集アプリ",
        body: "TripAdvisorは世界最大の旅行レビューサイトのアプリ版です。レストラン、観光地、ホテルの口コミをリアルタイムで確認でき、現地での食事場所選びに特に役立ちます。オフラインでも一部コンテンツにアクセスできますが、最新のレビューや写真にはeSIMのデータ通信が必要です。\n\nXE Currencyは為替レートをリアルタイムで確認できるアプリです。買い物やレストランでの支払い時に、現地通貨がいくらに相当するかすぐに計算できます。eSIMがあれば常に最新のレートで換算でき、両替所での目安にも使えます。\n\nFlightradarは、フライトのリアルタイム追跡、遅延情報の確認、出発・到着ゲートの変更通知など、フライト関連の情報を一元管理できるアプリです。乗り継ぎの際や、迎えの人にフライト状況を共有する際に便利です。AutoWiFiのeSIMがあれば、これらすべてのアプリをデータ制限を気にせず活用でき、旅行がより快適になります。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "これらのアプリはeSIMのデータをどれくらい消費しますか？", a: "地図ナビは1時間5〜10MB、翻訳は1回数KB〜数MB、配車アプリは1回5〜15MB程度です。メッセージアプリのテキスト送受信はほぼデータを消費しません。動画通話は1時間300MB〜1GB消費します。" },
      { q: "アプリは出発前にダウンロードしておくべきですか？", a: "はい、必ず出発前にすべてのアプリをダウンロードし、アカウント設定も完了しておきましょう。現地でのアプリダウンロードはデータ消費が大きく、設定にも時間がかかります。" },
      { q: "オフラインでも使えるアプリはありますか？", a: "Google Maps（オフラインマップ）、Google翻訳（言語パック）、Maps.me、Spotifyなどがオフライン機能を提供しています。出発前にオフラインコンテンツをダウンロードしておくとデータ節約になります。" },
      { q: "配車アプリは事前に現地の電話番号が必要ですか？", a: "多くの配車アプリは、日本の電話番号で登録したアカウントをそのまま海外でも利用できます。eSIMのデータ通信があれば、現地の電話番号なしでも配車アプリを使えます。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiのeSIMがあれば、すべての旅行アプリをフル活用。地図、翻訳、配車をデータ制限なしで使い倒そう。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "旅行アプリとeSIM"
  },
  en: {
    title: "Best Travel Apps That Work with eSIM - Maps, Translation & Ride-Sharing",
    subtitle: "Essential apps that pair perfectly with eSIM data for seamless travel",
    intro: "With an eSIM, your smartphone becomes the ultimate travel companion. Navigation, real-time translation, ride-hailing, and trip planning apps all depend on data connectivity. This guide covers the must-have travel apps organized by category, showing how each benefits from eSIM data.",
    sections: [
      {
        title: "Maps and Navigation Apps",
        body: "Google Maps is indispensable for international travel. It provides real-time navigation, public transit directions, and nearby restaurant and ATM searches. Data consumption is modest at about 5-10MB per hour of navigation, barely impacting your eSIM data allowance. Its offline map download feature also pairs well with eSIM data-saving strategies.\n\nMaps.me is a fully offline map app. Download maps for any country in advance and navigate without any data connection. While it lacks Google Maps' depth of information, it serves as an excellent backup for conserving eSIM data in areas with weak coverage.\n\nCitymapper specializes in urban public transit, offering real-time schedules and optimal routes in cities like London, Paris, New York, and Tokyo. It is especially valuable in cities with complex subway and bus networks where transfers can be confusing."
      },
      {
        title: "Translation and Communication Apps",
        body: "Google Translate supports 100+ languages with text, camera (point at signs or menus), and voice translation. With eSIM data, you can translate restaurant menus in real time or have conversations with locals through the voice feature. Offline language packs are available for data-free use.\n\nDeepL is known for more natural translation quality, particularly excelling with European languages. It is useful for composing emails or checking social media posts during travel. Papago by Naver offers superior accuracy for Japanese, Korean, and Chinese translations.\n\nMessaging apps like WhatsApp and LINE provide text, voice, and video calling over data. With eSIM connectivity, you can stay in touch with family and friends worldwide without international calling charges."
      },
      {
        title: "Ride-Hailing and Transportation Apps",
        body: "Uber operates in 70+ countries and is the go-to ride-hailing app globally. You can see fare estimates before booking, eliminating overcharging concerns. With eSIM data active upon landing, you can immediately book a ride from the airport to your hotel.\n\nGrab dominates Southeast Asia, operating in Thailand, Vietnam, Malaysia, Singapore, the Philippines, and Indonesia. It includes motorbike taxis and food delivery, making it essential for Southeast Asian travel.\n\nBolt (formerly Taxify) is popular across Europe and Africa, filling gaps where Uber is unavailable. It integrates with Google Maps for easy pickup location selection and supports cashless payments. All ride-hailing apps require real-time data connectivity, making eSIM their perfect companion."
      },
      {
        title: "Trip Planning and Information Apps",
        body: "TripAdvisor provides real-time access to reviews for restaurants, attractions, and hotels worldwide. It is particularly useful for choosing where to eat when exploring a new city. While some content works offline, the latest reviews and photos require eSIM data.\n\nXE Currency shows real-time exchange rates, letting you instantly calculate how much local currency amounts to in your home currency. With eSIM connectivity, you always have up-to-date rates for shopping and restaurant payments.\n\nFlightradar provides real-time flight tracking, delay notifications, and gate change alerts. It is invaluable during layovers or when sharing flight status with people meeting you at your destination. With AutoWiFi's eSIM, all these apps work seamlessly, making your trip smoother and more enjoyable."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "How much data do these travel apps consume?", a: "Map navigation uses 5-10MB per hour, translation a few KB-MB per query, and ride-hailing about 5-15MB per ride. Text messaging uses negligible data. Video calls consume 300MB-1GB per hour." },
      { q: "Should I download apps before departure?", a: "Absolutely. Download all apps and complete account setup before leaving. Downloading apps abroad consumes significant data and setup takes time when you should be exploring." },
      { q: "Which apps work offline?", a: "Google Maps (offline maps), Google Translate (language packs), Maps.me, and Spotify all offer offline functionality. Download offline content before departure to save data." },
      { q: "Do ride-hailing apps require a local phone number?", a: "Most ride-hailing apps let you use your home country account abroad. With eSIM data connectivity, you can use these apps without a local phone number." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi's eSIM powers all your travel apps. Use maps, translation, and ride-hailing without data limitations.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Travel Apps & eSIM"
  },
  ko: {
    title: "eSIM과 궁합 좋은 여행 앱 - 지도·번역·차량 호출 앱 완전 가이드",
    subtitle: "eSIM 데이터를 최대한 활용할 수 있는 필수 여행 앱 엄선 소개",
    intro: "eSIM이 있으면 해외에서도 스마트폰 기능을 최대한 활용할 수 있습니다. 지도 내비게이션, 실시간 번역, 차량 호출 서비스 등 여행을 편안하게 만드는 앱은 데이터 통신이 전제입니다. 이 가이드에서는 eSIM과 함께 사용하고 싶은 엄선 앱을 카테고리별로 소개합니다.",
    sections: [
      {
        title: "지도·내비게이션 앱",
        body: "Google Maps는 해외 여행에 필수적인 앱입니다. 실시간 내비게이션, 대중교통 환승 안내, 주변 레스토랑이나 ATM 검색 등 모든 상황에서 활약합니다. 데이터 소비량은 시간당 약 5~10MB로 적어 eSIM 데이터를 거의 압박하지 않습니다. 오프라인 지도 사전 다운로드 기능도 갖추고 있어 데이터 절약과의 궁합도 좋습니다.\n\nMaps.me는 완전 오프라인으로 사용 가능한 지도 앱입니다. 전 세계 지도를 미리 다운로드해 두면 데이터 통신 없이도 내비게이션이 가능합니다. Google Maps만큼의 정보량은 없지만, eSIM 데이터를 절약하고 싶을 때의 백업으로 최적입니다.\n\nCitymapper는 도시의 대중교통에 특화된 앱으로, 런던, 파리, 뉴욕, 도쿄 등 주요 도시에서 실시간 운행 정보와 최적 경로를 표시합니다."
      },
      {
        title: "번역·커뮤니케이션 앱",
        body: "Google 번역은 100개 이상의 언어를 지원하며, 텍스트 번역뿐 아니라 카메라 번역(간판이나 메뉴를 비추면 번역), 음성 번역도 지원합니다. eSIM 데이터 통신이 있으면 레스토랑에서 메뉴를 읽거나 현지인과 대화할 때 실시간으로 번역할 수 있습니다.\n\nDeepL은 더 자연스러운 번역 품질로 알려져 있으며, 특히 유럽 언어 번역 정확도가 높습니다. 파파고(Papago)는 네이버의 번역 앱으로, 한국어·일본어·중국어 간 번역 정확도가 뛰어납니다.\n\n카카오톡, WhatsApp, LINE 등의 메시징 앱은 텍스트 메시지뿐 아니라 음성 통화와 영상 통화에도 사용할 수 있습니다. eSIM 데이터로 국제 통화료 걱정 없이 가족이나 친구와 연락할 수 있습니다."
      },
      {
        title: "차량 호출·교통 앱",
        body: "Uber는 전 세계 70개국 이상에서 이용 가능한 대표적인 차량 호출 앱입니다. 공항에서의 이동, 관광지 간 이동 등에서 현지 택시 요금을 사전에 확인하고 탑승할 수 있어 바가지 걱정이 없습니다. eSIM 데이터가 있으면 도착 후 바로 Uber로 이동할 수 있습니다.\n\nGrab은 동남아시아에서 가장 많이 이용되는 차량 호출 앱으로, 태국, 베트남, 말레이시아, 싱가포르, 필리핀, 인도네시아 등에서 이용 가능합니다. 오토바이 택시와 음식 배달에도 대응하여 동남아시아 여행에서는 필수 앱입니다.\n\nBolt(구 Taxify)는 유럽과 아프리카에서 인기 있는 차량 호출 앱으로, Uber가 이용 불가한 지역을 커버합니다. 이 모든 차량 호출 앱은 실시간 데이터 통신이 필요하므로 eSIM과의 궁합이 최고입니다."
      },
      {
        title: "여행 계획·정보 수집 앱",
        body: "TripAdvisor는 세계 최대 여행 리뷰 사이트의 앱 버전입니다. 레스토랑, 관광지, 호텔의 리뷰를 실시간으로 확인할 수 있어 현지 식사 장소 선택에 특히 유용합니다. 최신 리뷰와 사진에는 eSIM 데이터 통신이 필요합니다.\n\nXE Currency는 환율을 실시간으로 확인할 수 있는 앱입니다. 쇼핑이나 레스토랑 결제 시 현지 통화가 얼마에 해당하는지 바로 계산할 수 있습니다. eSIM이 있으면 항상 최신 환율로 환산 가능합니다.\n\nFlightradar는 실시간 항공편 추적, 지연 정보 확인, 출발·도착 게이트 변경 알림 등 항공편 관련 정보를 한곳에서 관리할 수 있는 앱입니다. AutoWiFi의 eSIM이 있으면 이 모든 앱을 데이터 제한 걱정 없이 활용할 수 있어 여행이 더욱 편안해집니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "이 여행 앱들은 eSIM 데이터를 얼마나 소비하나요?", a: "지도 내비는 시간당 5~10MB, 번역은 1회 수KB~수MB, 차량 호출 앱은 1회 5~15MB 정도입니다. 텍스트 메시지는 거의 데이터를 소비하지 않습니다. 영상 통화는 시간당 300MB~1GB 소비합니다." },
      { q: "앱은 출발 전에 다운로드해 두어야 하나요?", a: "네, 반드시 출발 전에 모든 앱을 다운로드하고 계정 설정도 완료해 두세요. 현지에서의 앱 다운로드는 데이터 소비가 크고 설정에도 시간이 걸립니다." },
      { q: "오프라인에서도 사용 가능한 앱이 있나요?", a: "Google Maps(오프라인 지도), Google 번역(언어팩), Maps.me, Spotify 등이 오프라인 기능을 제공합니다. 출발 전에 오프라인 콘텐츠를 다운로드해 두면 데이터 절약이 됩니다." },
      { q: "차량 호출 앱은 현지 전화번호가 필요한가요?", a: "대부분의 차량 호출 앱은 한국 전화번호로 등록한 계정을 해외에서도 그대로 사용할 수 있습니다. eSIM 데이터 통신이 있으면 현지 전화번호 없이도 차량 호출 앱을 사용할 수 있습니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi의 eSIM이 있으면 모든 여행 앱을 최대한 활용. 지도, 번역, 차량 호출을 데이터 제한 없이 사용하세요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "여행 앱과 eSIM"
  },
  zh: {
    title: "与eSIM完美搭配的旅行应用 - 地图·翻译·打车应用完全指南",
    subtitle: "充分利用eSIM数据的旅行必备应用精选推荐",
    intro: "有了eSIM，智能手机在海外也能发挥全部功能。地图导航、实时翻译、打车服务等让旅行更舒适的应用都需要数据支持。本指南按类别介绍与eSIM搭配使用的精选旅行应用。",
    sections: [
      {
        title: "地图与导航应用",
        body: "Google Maps是海外旅行不可或缺的应用。提供实时导航、公共交通换乘指引、周边餐厅和ATM搜索等功能。每小时数据消耗约5-10MB，几乎不会影响eSIM流量。还支持离线地图预下载功能，与省流量策略完美配合。\n\nMaps.me是完全离线的地图应用。提前下载目的地地图即可在无网络环境下导航。虽然信息量不如Google Maps，但作为节省eSIM流量或信号弱时的备选方案非常理想。\n\nCitymapper专注于城市公共交通，在伦敦、巴黎、纽约、东京等主要城市提供实时运行信息和最优路线。在地铁和公交换乘复杂的城市特别实用。"
      },
      {
        title: "翻译与通讯应用",
        body: "Google翻译支持100多种语言，除了文字翻译还支持相机翻译（对准招牌或菜单即可翻译）和语音翻译。有eSIM数据就能在餐厅实时翻译菜单或与当地人对话。也支持下载离线语言包。\n\nDeepL以更自然的翻译质量著称，尤其在欧洲语言翻译上准确度高。旅途中撰写邮件或检查社交媒体帖子翻译时很方便。百度翻译和有道翻译在中文翻译方面表现出色。\n\n微信、WhatsApp、LINE等即时通讯应用不仅可以发文字消息，还支持语音和视频通话。有eSIM数据连接，不用担心国际通话费就能与家人朋友保持联络。"
      },
      {
        title: "打车与交通应用",
        body: "Uber在全球70多个国家运营，是最具代表性的打车应用。可以在叫车前查看预估车费，避免被宰。eSIM数据让你落地后立即可以用Uber从机场前往酒店。\n\nGrab是东南亚使用最广泛的打车应用，覆盖泰国、越南、马来西亚、新加坡、菲律宾、印度尼西亚等地。还支持摩托车出租和外卖，是东南亚旅行的必备应用。\n\nBolt（原Taxify）在欧洲和非洲很受欢迎，填补了Uber未覆盖地区的空白。与Google Maps联动方便指定上车地点，支持无现金支付。所有打车应用都需要实时数据连接，与eSIM堪称完美搭档。"
      },
      {
        title: "旅行规划与信息收集应用",
        body: "TripAdvisor是全球最大旅行评论网站的应用版。可以实时查看餐厅、景点、酒店的评价，在当地选择就餐地点时特别有用。最新评论和照片需要eSIM数据连接。\n\nXE Currency可以实时查看汇率，购物或餐厅付款时能立即计算当地货币相当于多少本国货币。有eSIM就能随时获取最新汇率。\n\nFlightradar提供实时航班追踪、延误通知和登机口变更提醒等功能，在转机或向接机人共享航班状态时非常方便。有AutoWiFi的eSIM，所有这些应用都能无缝使用，让旅行更加顺畅愉快。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "这些旅行应用消耗多少eSIM流量？", a: "地图导航每小时5-10MB，翻译每次几KB到几MB，打车应用每次5-15MB。文字消息几乎不消耗流量。视频通话每小时300MB-1GB。" },
      { q: "应用需要出发前下载吗？", a: "是的，务必在出发前下载所有应用并完成账号设置。在当地下载应用消耗大量流量，设置也需要时间。" },
      { q: "有哪些应用可以离线使用？", a: "Google Maps（离线地图）、Google翻译（语言包）、Maps.me、Spotify等都提供离线功能。出发前下载离线内容可以节省流量。" },
      { q: "打车应用需要当地电话号码吗？", a: "大多数打车应用可以用本国号码注册的账号在海外直接使用。有eSIM数据连接就能在没有当地号码的情况下使用打车应用。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi的eSIM让你充分利用所有旅行应用。地图、翻译、打车不受流量限制。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "旅行应用与eSIM"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/travel-apps-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="travel-apps-esim" content={CONTENT[loc]} />;
}
