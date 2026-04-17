import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "スリランカ旅行eSIMガイド - コロンボ・キャンディで快適通信",
    subtitle: "インド洋の島国で快適にモバイルインターネットを使う方法",
    intro: "スリランカはコロンボのモダンな都市景観から、キャンディの仏教寺院、ハイキングで有名なエラ、そして美しいビーチまで多彩な魅力を持つ島国です。近年通信インフラが急速に発展しており、eSIMを利用すれば到着後すぐに快適なネット環境を手に入れられます。本記事ではインド洋の島国で快適にモバイルインターネットを使う方法・スリランカのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      { title: "スリランカのモバイル通信事情", body: "スリランカの主要通信キャリアはDialog Axiata、Mobitel（Sri Lanka Telecom）、Airtel Lanka、Hutchison（Hutch）の4社です。コロンボ、キャンディ、ガレなどの主要都市と観光地では4G LTEが安定しています。\n\n農村部や山岳地帯（ヌワラエリヤ周辺等）では電波が弱い場合がありますが、主要観光ルート上はおおむねカバーされています。鉄道旅行（コロンボ〜キャンディ、キャンディ〜エラ）はスリランカの観光ハイライトですが、山岳区間では一部圏外になる場合があります。\n\nスリランカはeSIM対応が比較的新しい市場ですが、旅行者向けのeSIMプランが充実してきています。" },
      { title: "おすすめのeSIMプラン", body: "スリランカへの日本からのフライトはコロンボのバンダラナイケ国際空港に到着します。空港でSIMを購入することも可能ですが、手続きや待ち時間を省くためにeSIMが便利です。1週間の旅行なら3〜5GBのプランが適切です。\n\nAutoWiFi eSIMではスリランカ向けプランを提供しており、到着後すぐに使い始められます。コロンボ〜キャンディ〜エラ〜ハンバントータのルートを巡る場合、各エリアでの通信確認に地図アプリが役立ちます。\n\nスリランカは近年、インドや東南アジアとの周遊旅行でも人気が高まっています。他国への移動がある場合は各国対応プランをご検討ください。" },
      { title: "eSIMの設定方法", body: "AutoWiFi eSIMでスリランカプランを購入後、QRコードがメールで届きます。iPhoneは設定からモバイル通信、eSIMを追加の順にQRコードをスキャンします。Androidは設定からネットワークとインターネット、SIM、eSIMを追加の順に設定できます。\n\n日本出発前にeSIMをインストールしておくことを強くおすすめします。コロンボのバンダラナイケ国際空港到着後、機内モードを解除するだけで通信が開始されます。\n\nスリランカの時差は日本より3時間30分遅れです。到着後すぐにGrabやPickMe（現地ライドシェア）を利用するためにも、eSIMがあると便利です。" },
      { title: "主要エリアでのカバレッジ", body: "コロンボはスリランカ最大の都市で、ビジネス地区、フォート地区、パタ地区など主要エリアで安定した4G通信が利用できます。コロンボのバー、レストラン、ショッピングモールでもほとんど問題ありません。\n\nキャンディは仏歯寺で有名な歴史都市で、市内では4G通信が利用可能です。キャンディ周辺の農村部や紅茶農園地帯（ヌワラエリヤ）では電波が弱くなる場合があります。\n\nガレ・フォート（オランダ植民地時代の要塞）周辺や南海岸のビーチリゾート（ウナワトゥナ、ヒッカドゥワ）でも4G通信が利用可能です。エラの山岳地帯は一部圏外ですが、主要エリアでは繋がります。" },
      { title: "スリランカ旅行でのeSIM活用のコツ", body: "スリランカではPickMeというローカルのライドシェアアプリが広く普及しています。コロンボやキャンディではPickMeを使えば安全で料金明確な移動ができます。eSIMがあれば随時利用可能です。\n\nスリランカの鉄道はキャンディからエラへのルートが「世界で最も美しい鉄道旅行の一つ」として有名です。切符はSri Lanka Railways公式サイトでオンライン購入できますが、人気が高く早売り切れのため、eSIMがあれば事前に確保できます。\n\nスリランカの仏教遺跡（シーギリヤ、ポロンナルワ等）への観光では、事前に入場料や開館時間を確認しておくことが重要です。eSIMがあれば現地に向かいながらでも最新情報を確認できます。" }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "シーギリヤ（ライオンロック）でeSIMは使えますか？", a: "シーギリヤ周辺の村や入口付近では4G通信が利用可能です。ロック上部の高所では電波が弱くなる場合があります。事前にオフラインマップと入場情報をダウンロードしておくことをおすすめします。" },
      { q: "キャンディ〜エラ間の鉄道旅行中は通信できますか？", a: "キャンディ〜エラ間の鉄道は山岳地帯を通るため、一部区間で圏外になることがあります。主要駅周辺では接続できます。車窓の絶景を楽しみながら、電波がある場所でSNSに共有しましょう。" },
      { q: "スリランカでのデータ使用量の目安は？", a: "PickMeの利用、地図、観光地情報、SNS等で1日300〜700MB程度です。1週間なら3〜5GBで十分です。" },
      { q: "コロンボ空港でeSIMを設定できますか？", a: "バンダラナイケ国際空港にはフリーWiFiがありますので、空港内でもeSIMのインストールが可能です。ただし出発前に設定しておく方がスムーズです。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでスリランカ旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "スリランカeSIMガイド",
  },
  en: {
    title: "Sri Lanka eSIM Guide - Colombo, Kandy & Coverage",
    subtitle: "Stay connected on the island of tea, temples, and beaches with an eSIM",
    intro: "Sri Lanka enchants visitors with the colonial grandeur of Colombo, the sacred temples of Kandy, the scenic hill country around Ella, and some of the world's finest beaches. Mobile connectivity has improved rapidly in recent years, and a travel eSIM is the easiest way to stay connected from arrival.",
    sections: [
      { title: "Sri Lanka's Mobile Network Overview", body: "Sri Lanka's mobile market features four main carriers: Dialog Axiata, Mobitel (Sri Lanka Telecom), Airtel Lanka, and Hutchison (Hutch). Major cities including Colombo, Kandy, and Galle have reliable 4G LTE coverage. Dialog has the most extensive national coverage.\n\nRural areas and mountain terrain around Nuwara Eliya and the central highlands may have weaker signal, but main tourist routes are generally covered. The iconic Kandy to Ella train journey passes through highland areas with intermittent signal during tunnels and steep mountain sections.\n\nSri Lanka is becoming more popular for regional multi-country trips alongside India and the Maldives." },
      { title: "Recommended eSIM Plans", body: "Flights from Japan arrive at Bandaranaike International Airport in Colombo. While local SIMs are available at the airport, an eSIM saves you the hassle of queuing and swapping cards. For a week in Sri Lanka, a 3-5GB plan comfortably covers navigation, ride-hailing, and social media.\n\nAutoWiFi eSIM offers Sri Lanka-specific plans that activate immediately on arrival. For the classic tourist circuit (Colombo, Kandy, Ella, Galle), having consistent mobile data helps with train bookings, accommodation changes, and navigating local transport.\n\nTethering is supported on most plans, useful when working from guesthouses or beach cafes." },
      { title: "How to Set Up Your eSIM", body: "After purchasing a Sri Lanka plan from AutoWiFi eSIM, a QR code will be sent to your email. On iPhone, go to Settings > Cellular > Add eSIM. On Android, go to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departing Japan. When you arrive at Colombo Bandaranaike International Airport, disabling airplane mode starts your connection.\n\nSri Lanka is UTC+5:30, three and a half hours behind Japan. Having data ready lets you use PickMe (the local ride-hailing app) to arrange transport from the airport immediately." },
      { title: "Coverage in Key Areas", body: "Colombo has good 4G coverage across the Fort, Pettah, Kollupitiya, and Bambalapitiya districts. The World Trade Centre area, Galle Face Green, and major shopping malls are well connected.\n\nKandy has reliable 4G in the city centre, around the Temple of the Tooth Relic (Sri Dalada Maligawa), and along the lakefront. Tea plantation country around Nuwara Eliya has patchy signal in rural areas but the town itself is connected.\n\nGalle Fort and the south coast beach resorts (Unawatuna, Hikkaduwa, Mirissa) have good 4G coverage. Ella is a popular hill country destination with coverage in the village, though the surrounding jungle trails may have gaps." },
      { title: "Tips for Using eSIM in Sri Lanka", body: "PickMe is Sri Lanka's dominant ride-hailing app, widely used in Colombo and Kandy. It offers fixed prices, transparent billing, and is much safer than negotiating with tuk-tuk drivers. eSIM connectivity ensures you can always book a ride.\n\nThe Kandy to Ella train is one of the world's most scenic rail journeys. Book tickets through the official Sri Lanka Railways website or PickMe's train booking feature. Second-class reserved seats sell out weeks in advance, so book early with an internet connection.\n\nMajor archaeological sites like Sigiriya and Polonnaruwa have UNESCO heritage status and require advance ticket purchase. Verify opening times and prices online, especially in the peak season (December to March)." }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does eSIM work at Sigiriya (Lion Rock)?", a: "The village and entrance area around Sigiriya have 4G coverage. At the summit of the rock, signal may be weaker. Download offline maps and site information before your visit." },
      { q: "Is there signal on the Kandy to Ella train?", a: "The mountain railway has intermittent signal through tunnels and steep highland sections. Coverage is available near major stations. Enjoy the scenery and share photos when signal permits." },
      { q: "How much data do I need for Sri Lanka?", a: "PickMe rides, maps, sightseeing information, and social media use roughly 300-700MB per day. A 3-5GB plan suits most one-week trips." },
      { q: "Can I set up eSIM at Colombo Airport?", a: "Bandaranaike International Airport has free WiFi, so eSIM installation is possible there. However, setting it up before departure makes for a smoother arrival experience." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Explore Sri Lanka with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Sri Lanka eSIM Guide",
  },
  ko: {
    title: "스리랑카 eSIM 가이드 - 콜롬보, 캔디 통신 완벽 가이드",
    subtitle: "차, 사원, 해변의 섬나라에서 eSIM으로 편리하게 연결하세요",
    intro: "스리랑카는 콜롬보의 식민지 건축물, 캔디의 신성한 사원, 아름다운 힐 컨트리 엘라, 그리고 세계 최고의 해변으로 여행자들을 매료시킵니다. 최근 몇 년간 모바일 연결성이 빠르게 향상되어 여행자용 eSIM으로 도착 즉시 연결할 수 있습니다.",
    sections: [
      { title: "스리랑카 모바일 통신 환경", body: "스리랑카 이동통신 시장은 Dialog Axiata, Mobitel(Sri Lanka Telecom), Airtel Lanka, Hutchison(Hutch) 네 통신사가 운영합니다. 콜롬보, 캔디, 갈레 등 주요 도시에서는 안정적인 4G LTE를 이용할 수 있으며 Dialog가 가장 광범위한 전국 커버리지를 제공합니다.\n\n농촌 지역과 누와라엘리야 주변 산악 지대는 신호가 약해질 수 있지만 주요 관광 루트는 대체로 커버됩니다. 캔디에서 엘라까지의 기차 여행은 고지대를 통과하며 터널과 급경사 구간에서 신호가 끊길 수 있습니다.\n\n스리랑카는 인도, 몰디브와 함께 다국 여행에서 인기가 높아지고 있습니다." },
      { title: "추천 eSIM 플랜", body: "일본에서 출발하는 항공편은 콜롬보 반다라나이케 국제공항에 도착합니다. 공항에서 현지 SIM을 구매할 수 있지만, eSIM을 사용하면 줄 서고 카드 교체하는 번거로움이 없습니다. 일주일 여행이라면 3~5GB 플랜이 내비게이션, 차량 호출, SNS 이용에 충분합니다.\n\nAutoWiFi eSIM은 도착 즉시 활성화되는 스리랑카 전용 플랜을 제공합니다. 콜롬보-캔디-엘라-갈레로 이어지는 클래식 여행 루트에서 안정적인 모바일 데이터는 기차 예약, 숙소 변경, 현지 교통 이용에 큰 도움이 됩니다.\n\n대부분의 플랜에서 테더링을 지원하여 게스트하우스나 해변 카페에서 작업할 때 유용합니다." },
      { title: "eSIM 설정 방법", body: "AutoWiFi eSIM에서 스리랑카 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 설정에서 셀룰러, eSIM 추가를 선택해 스캔합니다. Android는 설정에서 네트워크 및 인터넷, SIM, eSIM 추가를 선택합니다.\n\n출발 전 일본에서 미리 eSIM을 설치해 두세요. 콜롬보 반다라나이케 국제공항에 도착해 비행기 모드를 해제하면 즉시 연결됩니다.\n\n스리랑카는 UTC+5:30 시간대로 일본보다 3시간 30분 느립니다. eSIM이 있으면 공항에서 현지 차량 호출 앱 PickMe를 바로 사용할 수 있습니다." },
      { title: "주요 지역 커버리지", body: "콜롬보는 포트, 페타, 콜루피티야, 밤발라피티야 구역 전반에서 양호한 4G 커버리지를 제공합니다. 세계무역센터 지역, 갈레 페이스 그린, 주요 쇼핑몰에서 잘 연결됩니다.\n\n캔디는 시내 중심가, 불치사(스리 달라다 말리가와) 주변, 호수 주변에서 안정적인 4G를 제공합니다. 누와라엘리야 주변 차 농장 지대는 농촌 지역에서 신호가 약해질 수 있지만 시내는 연결됩니다.\n\n갈레 포트와 남해안 해변 리조트(우나와투나, 히카두와, 미리사)는 좋은 4G 커버리지를 가지고 있습니다. 엘라는 인기 있는 힐 컨트리 목적지로 마을에서는 연결되지만 주변 정글 트레일에서는 신호가 없을 수 있습니다." },
      { title: "스리랑카 여행에서의 eSIM 활용 팁", body: "PickMe는 스리랑카의 지배적인 차량 호출 앱으로 콜롬보와 캔디에서 널리 사용됩니다. 고정 요금과 투명한 청구로 툭툭 기사와 흥정하는 것보다 훨씬 안전합니다. eSIM이 있으면 언제든지 차량을 호출할 수 있습니다.\n\n캔디-엘라 기차는 세계에서 가장 경치 좋은 철도 여행 중 하나입니다. 공식 Sri Lanka Railways 웹사이트나 PickMe 기차 예약 기능을 통해 티켓을 구매하세요. 2등석 예약 지정석은 몇 주 전에 매진되므로 인터넷을 통해 일찍 예약하세요.\n\n시기리야, 폴론나루와 같은 주요 고고학 유적지는 UNESCO 세계유산으로 사전 티켓 구매가 필요합니다. 특히 성수기(12~3월)에는 개장 시간과 가격을 온라인으로 미리 확인하세요." }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "시기리야(사자 바위)에서 eSIM이 작동하나요?", a: "시기리야 마을과 입구 주변에서 4G 커버리지가 제공됩니다. 바위 정상에서는 신호가 약해질 수 있습니다. 방문 전에 오프라인 지도와 유적지 정보를 다운로드해 두세요." },
      { q: "캔디-엘라 기차에서 신호가 잡히나요?", a: "산악 철도는 터널과 급경사 고지대 구간에서 신호가 끊길 수 있습니다. 주요 역 근처에서는 연결됩니다. 경치를 감상하며 신호가 있을 때 SNS에 공유하세요." },
      { q: "스리랑카에서 필요한 데이터 용량은?", a: "PickMe 이용, 지도, 관광지 정보, SNS로 하루 약 300~700MB를 사용합니다. 일주일 여행에는 3~5GB 플랜이 충분합니다." },
      { q: "콜롬보 공항에서 eSIM을 설정할 수 있나요?", a: "반다라나이케 국제공항에는 무료 WiFi가 있어 현지에서 설치도 가능합니다. 하지만 출발 전에 미리 설정해 두면 더 편리합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 스리랑카를 탐험하세요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "스리랑카 eSIM 가이드",
  },
  zh: {
    title: "斯里兰卡eSIM指南 - 科伦坡、康提网络覆盖与套餐推荐",
    subtitle: "在茶园、神庙与海滩之岛上，eSIM助您全程畅连",
    intro: "斯里兰卡以科伦坡的殖民建筑、康提的神圣寺庙、风景如画的埃拉山区以及部分世界最美丽的海滩吸引着各地旅行者。近年来移动通信迅速发展，旅行eSIM让您抵达后即刻连线，无需繁琐地购买当地SIM卡。",
    sections: [
      { title: "斯里兰卡移动通信概况", body: "斯里兰卡移动市场拥有四大主要运营商：Dialog Axiata、Mobitel（Sri Lanka Telecom）、Airtel Lanka和Hutchison（Hutch）。科伦坡、康提和加勒等主要城市提供可靠的4G LTE覆盖，Dialog全国覆盖最广。\n\n农村地区和努沃勒埃利耶周边山区信号可能较弱，但主要旅游路线大体覆盖良好。康提至埃拉的著名火车之旅穿越高地，隧道和陡峭山区路段信号时有中断。\n\n斯里兰卡正逐渐成为与印度、马尔代夫相结合的多国行程热门目的地。" },
      { title: "推荐eSIM套餐", body: "从日本出发的航班抵达科伦坡班达拉奈克国际机场。机场有当地SIM可购，但使用eSIM可省去排队换卡的麻烦。一周行程选择3-5GB套餐，足够导航、叫车和社交媒体使用。\n\nAutoWiFi eSIM提供抵达即激活的斯里兰卡专属套餐。游览科伦坡-康提-埃拉-加勒经典路线时，稳定的移动数据对火车预订、更改住宿和导航当地交通大有裨益。\n\n大多数套餐支持热点共享，在民宿或海滩咖啡馆办公时非常实用。" },
      { title: "eSIM设置方法", body: "在AutoWiFi eSIM购买斯里兰卡套餐后，QR码将发送至邮箱。iPhone用户前往设置、蜂窝网络、添加eSIM扫描QR码；Android用户前往设置、网络和互联网、SIM卡、添加eSIM完成设置。\n\n建议出发前在日本提前安装eSIM。抵达科伦坡班达拉奈克国际机场后关闭飞行模式即可立即连网。\n\n斯里兰卡时区为UTC+5:30，比日本慢3.5小时。有了eSIM，下机后可立即使用当地叫车应用PickMe安排交通。" },
      { title: "主要地区覆盖情况", body: "科伦坡在堡垒区、贝塔区、科鲁皮提亚、班巴拉皮提亚等区域均有良好4G覆盖。世贸中心地区、加勒费斯绿地和主要购物中心连接良好。\n\n康提市中心、佛牙寺（斯里达拉达马利加瓦）周边和湖边提供可靠4G。努沃勒埃利耶茶园地带农村区域信号可能较弱，但小镇本身有连接。\n\n加勒堡和南海岸海滩度假区（乌纳瓦图纳、希卡杜瓦、米里沙）覆盖良好。埃拉是热门山区目的地，村庄内有连接，但周围丛林步道可能没有信号。" },
      { title: "斯里兰卡旅行eSIM使用技巧", body: "PickMe是斯里兰卡最主要的叫车应用，在科伦坡和康提广泛使用。固定价格、透明计费，比与嘟嘟车司机讨价还价安全得多。有了eSIM随时都能叫车。\n\n康提至埃拉的火车是世界上最美丽的铁路旅程之一。通过斯里兰卡铁路官网或PickMe火车预订功能购票。二等座预留票常常数周前售罄，请尽早通过网络预订。\n\n锡吉里亚、波隆纳鲁瓦等主要考古遗址是UNESCO世界遗产，需提前购票。建议在网上提前确认开放时间和票价，尤其是旺季（12月至3月）。" }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "锡吉里亚（狮子岩）有eSIM信号吗？", a: "锡吉里亚村庄和入口附近提供4G覆盖。岩石顶部信号可能较弱。参观前请下载离线地图和遗址信息。" },
      { q: "康提至埃拉火车途中有信号吗？", a: "山地铁路在隧道和陡峭高地路段信号可能中断。主要车站附近有覆盖。欣赏沿途美景，有信号时再分享照片即可。" },
      { q: "在斯里兰卡需要多少流量？", a: "使用PickMe、地图、景点信息和社交媒体每天约消耗300-700MB。一周行程选择3-5GB套餐即可。" },
      { q: "能在科伦坡机场设置eSIM吗？", a: "班达拉奈克国际机场提供免费WiFi，可在此安装eSIM。但出发前提前设置体验更加顺畅。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM探索斯里兰卡。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "斯里兰卡eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/sri-lanka-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="sri-lanka-esim" content={CONTENT[loc]} />;
}
