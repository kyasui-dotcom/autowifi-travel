import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "イギリスeSIMガイド - ロンドン・スコットランドの通信事情",
    subtitle: "EE・Threeの回線で英国全土をカバーするeSIM",
    intro: "イギリスは高品質なモバイル通信インフラを持つ国で、ロンドンをはじめとする主要都市では5Gサービスも展開されています。eSIMを利用すれば、ヒースロー空港到着後すぐにGoogleマップやUberを活用でき、イギリス旅行がよりスムーズになります。本記事ではEE・Threeの回線で英国全土をカバーするeSIM・イギリスのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "イギリスのモバイル通信事情",
        body: "イギリスの主要通信キャリアはEE、Three、Vodafone、O2の4社です。EEが最大のカバレッジと最速の5Gネットワークを持ち、旅行者向けeSIMにも多く採用されています。Threeも広いカバレッジを持ち、コストパフォーマンスに優れたプランを提供しています。\n\nロンドン中心部では5G通信が広く利用可能で、下り150〜300Mbpsの高速通信を体験できます。ロンドン地下鉄（チューブ）の多くの駅構内でもモバイル通信が利用可能になっており、2024年以降順次拡大されています。\n\nイングランドの主要都市では通信環境が充実していますが、スコットランドのハイランド地方やウェールズの山間部ではカバレッジが限られる場合があります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "イギリス向けeSIMプランは、3日間1GBの短期プランから30日間無制限プランまで幅広く用意されています。ロンドンを中心とした1週間の旅行なら、5GBプランで十分です。ロンドンではカフェやパブでフリーWiFiが充実しているため、eSIMとの併用でデータ節約が可能です。\n\nAutoWiFi eSIMのイギリスプランの多くはEUローミングにも対応しており、ユーロスターでパリに日帰り旅行する場合やアイルランドへの周遊にも同じプランで利用できるものがあります。プラン選択時にEUローミング対応の有無を確認しましょう。\n\nテザリングにも対応しているため、ノートパソコンでの作業やタブレットでの地図確認にも便利です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでイギリスプランを購入後、QRコードがメールで届きます。iPhoneは\"設定→モバイル通信\"→\"eSIMを追加、Androidは設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"から設定します。\n\n出発前にeSIMをインストールしておけば、ヒースロー空港やガトウィック空港に到着後すぐに通信を開始できます。入国審査後にUberやHeycarを利用してロンドン市内への移動手配もスムーズに行えます。\n\nイギリスの主要空港ではフリーWiFiが提供されていますが、利用時間に制限がある場合があります。eSIMがあれば時間制限を気にせず通信できます。"
      },
      {
        title: "主要都市でのカバレッジ",
        body: "ロンドンでは市内全域で高速4G/5G通信が利用可能です。ウェストミンスター、サウスバンク、カムデン、ノッティングヒルなどの人気エリアではすべて安定した接続を維持できます。ロンドン地下鉄でも主要路線の駅構内でモバイル通信が可能です。\n\nエディンバラ、マンチェスター、バーミンガム、リバプール、ブリストルなどの主要都市でも通信環境は良好です。エディンバラのロイヤルマイルやマンチェスターのNorthern Quarterなど、観光エリアでの接続に問題はありません。\n\nスコットランドのハイランド地方やイングランドの湖水地方では、町や村では通信可能ですが、山間部やハイキングルートではカバレッジが限られることがあります。"
      },
      {
        title: "イギリス旅行でのeSIM活用のコツ",
        body: "ロンドンではCitymapperアプリが最も便利な交通案内アプリです。バス、地下鉄、鉄)FPSの乗り換えをリアルタイムで案内してくれます。eSIMがあれば、常にリアルタイムの運行情報を確認できます。\n\nイギリスではコンタクトレス決済が非常に普及しており、Apple PayやGoogle Payでほとんどの支払いが可能です。eSIMがあればモバイル決済もスムーズに利用できます。また、パブやレストランの予約にはOpenTableやRefy（旧DesignMyNight）が便利です。\n\nイギリスの天気は変わりやすいことで有名です。eSIMがあれば、BBCWeatherアプリで常に最新の天気予報を確認でき、急な雨にも対応できます。傘が必要かどうかを出かける前にチェックしましょう。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "イギリスのeSIMでヨーロッパ他国でも使えますか？", a: "プランによってはEUローミングに対応しており、フランス、オランダ、アイルランドなど近隣諸国でも追加料金なしで利用できます。プラン購入時にEUローミング対応かどうかを確認してください。" },
      { q: "ロンドン地下鉄でeSIMは使えますか？", a: "はい、ロンドン地下鉄の多くの駅構内でモバイル通信が利用可能です。ただし、トンネル内（走行中）ではまだ通信できない区間があります。主要駅ではWiFiも提供されています。" },
      { q: "スコットランドのハイランド地方でもeSIMは使えますか？", a: "町や村では通信可能ですが、ハイランドの山間部やリモートエリアではカバレッジが限られます。ハイキングの場合はオフラインマップのダウンロードをおすすめします。" },
      { q: "イギリスでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。ロンドンではフリーWiFiが充実しているため、7日間5GBプランで多くの方が十分です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでイギリス旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "イギリスeSIMガイド",
  },
  en: {
    title: "UK eSIM Guide - London, Scotland & Nationwide Coverage",
    subtitle: "Connect across Britain with EE and Three networks",
    intro: "The United Kingdom offers high-quality mobile infrastructure with 5G services available in major cities. An eSIM lets you use Google Maps and Uber immediately after landing at Heathrow, making your UK trip seamless from the moment you arrive.",
    sections: [
      {
        title: "UK Mobile Network Overview",
        body: "The UK has four major carriers: EE, Three, Vodafone, and O2. EE has the largest coverage footprint and fastest 5G network, making it the most common choice for travel eSIMs. Three also offers wide coverage with competitively priced plans.\n\nCentral London has extensive 5G coverage with speeds of 150-300 Mbps. Many London Underground stations now support mobile data, with coverage steadily expanding since 2024.\n\nEngland's major cities enjoy excellent coverage, though the Scottish Highlands and mountainous parts of Wales may have limited connectivity in remote areas."
      },
      {
        title: "Recommended eSIM Plans",
        body: "UK eSIM plans range from 3-day 1GB options to 30-day unlimited packages. For a week-long London-focused trip, a 5GB plan is typically sufficient. London's cafes and pubs offer abundant free WiFi, which helps conserve your eSIM data.\n\nMany AutoWiFi eSIM UK plans include EU roaming, meaning you can use the same plan for a Eurostar day trip to Paris or a side trip to Ireland. Check whether EU roaming is included when selecting your plan.\n\nTethering is supported on most plans, making it convenient for laptop work or tablet navigation."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a UK plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to be connected immediately at Heathrow or Gatwick Airport. You can arrange an Uber or Heycar to central London right after clearing immigration.\n\nUK airports offer free WiFi, but some have time limits. An eSIM removes any restrictions and gives you unlimited connectivity from the moment you land."
      },
      {
        title: "Coverage in Major Cities",
        body: "London offers fast 4G and 5G coverage citywide. Popular areas like Westminster, South Bank, Camden, and Notting Hill all maintain stable connections. Mobile data is available at many London Underground stations.\n\nEdinburgh, Manchester, Birmingham, Liverpool, and Bristol all have excellent coverage. Tourist areas such as Edinburgh's Royal Mile and Manchester's Northern Quarter have reliable connectivity.\n\nThe Scottish Highlands and England's Lake District have coverage in towns and villages, but mountain areas and hiking trails may have limited signal."
      },
      {
        title: "Tips for Using eSIM in the UK",
        body: "Citymapper is the best transport app for London, providing real-time directions for buses, the Tube, and trains. With an eSIM, you always have access to live service updates and route planning.\n\nContactless payment is ubiquitous in the UK. Apple Pay and Google Pay work at nearly every retailer, restaurant, and transport service. An eSIM ensures your mobile payment apps always have connectivity. For restaurant reservations, try OpenTable or Refy.\n\nBritish weather is famously unpredictable. An eSIM lets you check the BBC Weather app constantly to stay ahead of sudden rain. Always check before heading out whether you need an umbrella."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use my UK eSIM in other European countries?", a: "Many plans include EU roaming at no extra charge, allowing use in France, Netherlands, Ireland, and more. Check the plan details for EU roaming coverage before purchasing." },
      { q: "Does the eSIM work on the London Underground?", a: "Yes, many London Underground stations now support mobile data. However, some tunnel sections between stations may not yet have coverage. Major stations also offer WiFi." },
      { q: "Does the eSIM work in the Scottish Highlands?", a: "Towns and villages have coverage, but remote mountain areas and hiking trails may have limited signal. Download offline maps if you plan to hike in the Highlands." },
      { q: "How much data will I need in the UK?", a: "Typical tourist usage is 500MB to 1GB per day. London has abundant free WiFi, so a 5GB plan for 7 days is sufficient for most travelers." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to the UK with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "UK eSIM Guide",
  },
  ko: {
    title: "영국 eSIM 가이드 - 런던, 스코틀랜드 통신 환경",
    subtitle: "EE·Three 네트워크로 영국 전역에서 연결 유지",
    intro: "영국은 고품질 모바일 통신 인프라를 갖추고 있으며 주요 도시에서 5G 서비스를 제공합니다. eSIM을 이용하면 히드로 공항 도착 후 바로 Google Maps나 Uber를 활용할 수 있어 영국 여행이 한결 수월해집니다.",
    sections: [
      {
        title: "영국의 모바일 통신 환경",
        body: "영국의 주요 통신사는 EE, Three, Vodafone, O2 4사입니다. EE가 가장 넓은 커버리지와 가장 빠른 5G 네트워크를 보유하고 있으며, 여행자용 eSIM에 많이 채택됩니다. Three도 넓은 커버리지와 합리적인 가격의 플랜을 제공합니다.\n\n런던 중심부에서는 5G 통신이 널리 이용 가능하며, 150~300Mbps의 고속 통신을 체험할 수 있습니다. 런던 지하철(튜브) 많은 역 구내에서도 모바일 통신이 가능합니다.\n\n잉글랜드 주요 도시에서는 통신 환경이 충실하지만, 스코틀랜드 하이랜드 지방이나 웨일스 산간 지역에서는 커버리지가 제한될 수 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "영국 eSIM 플랜은 3일 1GB 단기 플랜부터 30일 무제한 플랜까지 다양합니다. 런던 중심 1주일 여행이라면 5GB 플랜이면 충분합니다. 런던에서는 카페와 펍에서 무료 WiFi가 잘 되어 있어 eSIM과 병용하면 데이터를 절약할 수 있습니다.\n\nAutoWiFi eSIM의 영국 플랜 중 다수는 EU 로밍에 대응하여 유로스타로 파리 당일 여행을 하거나 아일랜드로 이동할 때도 같은 플랜을 사용할 수 있습니다. 구매 시 EU 로밍 대응 여부를 확인하세요.\n\n테더링도 지원되어 노트북 작업이나 태블릿 내비게이션에 편리합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 영국 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 설정합니다.\n\n출발 전 eSIM을 설치해 두면 히드로 공항이나 개트윅 공항 도착 후 바로 통신을 시작할 수 있습니다. 입국 심사 후 Uber로 런던 시내 이동도 바로 수배 가능합니다.\n\n영국 주요 공항에서는 무료 WiFi가 제공되지만 이용 시간이 제한되는 경우가 있습니다. eSIM이 있으면 시간 제한 없이 통신할 수 있습니다."
      },
      {
        title: "주요 도시 커버리지",
        body: "런던에서는 시내 전역에서 고속 4G/5G 통신이 가능합니다. 웨스트민스터, 사우스 뱅크, 캠든, 노팅 힐 등 인기 지역에서 안정적인 접속을 유지합니다. 런던 지하철 주요 역 구내에서도 모바일 통신이 가능합니다.\n\n에든버러, 맨체스터, 버밍엄, 리버풀, 브리스톨 등 주요 도시에서도 통신 환경이 양호합니다. 에든버러의 로열 마일이나 맨체스터의 노던 쿼터 등 관광 지역에서 접속에 문제가 없습니다.\n\n스코틀랜드 하이랜드와 잉글랜드 호수 지구에서는 마을에서는 통신 가능하지만 산간 지역이나 하이킹 루트에서는 신호가 제한될 수 있습니다."
      },
      {
        title: "영국 여행에서의 eSIM 활용 팁",
        body: "런던에서는 Citymapper 앱이 가장 편리한 교통 안내 앱입니다. 버스, 지하철, 철도 환승을 실시간으로 안내해 줍니다. eSIM이 있으면 항상 실시간 운행 정보를 확인할 수 있습니다.\n\n영국에서는 비접촉 결제가 매우 보편화되어 있어 Apple Pay나 Google Pay로 거의 모든 결제가 가능합니다. eSIM이 있으면 모바일 결제도 원활하게 이용할 수 있습니다. 레스토랑 예약에는 OpenTable이나 Refy가 편리합니다.\n\n영국 날씨는 변덕스럽기로 유명합니다. eSIM이 있으면 BBC Weather 앱으로 항상 최신 날씨를 확인할 수 있어 갑작스러운 비에도 대비할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "영국 eSIM으로 유럽 다른 나라에서도 사용할 수 있나요?", a: "많은 플랜이 EU 로밍을 추가 요금 없이 지원하여 프랑스, 네덜란드, 아일랜드 등에서도 사용 가능합니다. 구매 전 EU 로밍 지원 여부를 확인하세요." },
      { q: "런던 지하철에서 eSIM을 사용할 수 있나요?", a: "네, 런던 지하철 많은 역 구내에서 모바일 데이터를 사용할 수 있습니다. 다만 역 사이 터널 구간에서는 아직 커버리지가 없는 곳도 있습니다." },
      { q: "스코틀랜드 하이랜드에서도 eSIM을 사용할 수 있나요?", a: "마을에서는 통신 가능하지만 산간 오지나 하이킹 트레일에서는 신호가 제한될 수 있습니다. 하이킹 계획이 있으면 오프라인 지도를 다운로드해 두세요." },
      { q: "영국에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 런던에서는 무료 WiFi가 충실하므로 7일간 5GB 플랜이면 대부분의 여행자에게 충분합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 영국 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "영국 eSIM 가이드",
  },
  zh: {
    title: "英国eSIM指南 - 伦敦、苏格兰通信攻略",
    subtitle: "通过EE和Three网络畅游英国",
    intro: "英国拥有高质量的移动通信基础设施，主要城市提供5G服务。使用eSIM，您可以在希思罗机场落地后立即使用Google Maps和Uber，让英国之旅从一开始就顺畅无忧。",
    sections: [
      {
        title: "英国移动通信概况",
        body: "英国四大运营商为EE、Three、Vodafone和O2。EE拥有最广的覆盖范围和最快的5G网络，是旅行者eSIM最常用的运营商。Three也提供广泛覆盖和高性价比套餐。\n\n伦敦市中心5G覆盖广泛，速度可达150-300Mbps。伦敦地铁（Tube）许多站台内已支持移动数据，覆盖范围自2024年起持续扩大。\n\n英格兰主要城市通信环境良好，但苏格兰高地和威尔士山区的偏远地区覆盖可能有限。"
      },
      {
        title: "推荐eSIM套餐",
        body: "英国eSIM套餐从3天1GB到30天无限流量应有尽有。以伦敦为中心的一周行程，5GB套餐通常足够。伦敦的咖啡馆和酒吧提供丰富的免费WiFi，配合eSIM使用可以节省流量。\n\nAutoWiFi eSIM的许多英国套餐支持EU漫游，意味着您乘坐欧洲之星去巴黎一日游或前往爱尔兰时也能使用同一套餐。选购时请确认是否包含EU漫游。\n\n大多数套餐支持热点共享，方便笔记本办公或平板导航。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买英国套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM，Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"扫描QR码。\n\n出发前安装eSIM，到达希思罗或盖特威克机场后即可立即连网。通关后可以直接用Uber叫车前往伦敦市中心。\n\n英国主要机场提供免费WiFi，但部分有时间限制。eSIM让您无需担心时间限制，享受不间断的网络连接。"
      },
      {
        title: "主要城市覆盖情况",
        body: "伦敦全市提供高速4G/5G覆盖。威斯敏斯特、南岸、卡姆登、诺丁山等热门区域均可稳定连接。伦敦地铁多个站台内也可使用移动数据。\n\n爱丁堡、曼彻斯特、伯明翰、利物浦、布里斯托尔等主要城市通信环境良好。爱丁堡皇家英里、曼彻斯特北区等旅游区域连接可靠。\n\n苏格兰高地和英格兰湖区的城镇有信号覆盖，但山区和徒步路线信号可能有限。"
      },
      {
        title: "英国旅行eSIM使用技巧",
        body: "在伦敦，Citymapper是最佳交通导航应用，提供公交、地铁、火车的实时换乘指引。有了eSIM，随时可以查看实时运营信息和路线规划。\n\n英国非接触式支付非常普及，Apple Pay和Google Pay几乎在所有商店、餐厅和交通工具上都能使用。eSIM确保您的移动支付应用随时有网络连接。餐厅预订可以使用OpenTable或Refy。\n\n英国天气以变化无常著称。eSIM让您随时通过BBC Weather应用查看最新天气预报，应对突如其来的降雨。出门前记得检查是否需要带伞。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "英国eSIM能在其他欧洲国家使用吗？", a: "许多套餐包含免费EU漫游，可在法国、荷兰、爱尔兰等国使用。购买前请确认套餐是否包含EU漫游服务。" },
      { q: "伦敦地铁里能用eSIM吗？", a: "可以，伦敦地铁许多站台内已支持移动数据。不过站与站之间的隧道区段部分尚未覆盖。主要站点也提供WiFi。" },
      { q: "苏格兰高地能用eSIM吗？", a: "城镇有信号覆盖，但偏远山区和徒步路线信号可能有限。如果计划在高地徒步，建议提前下载离线地图。" },
      { q: "在英国大概需要多少流量？", a: "一般观光使用每天500MB-1GB。伦敦免费WiFi丰富，7天5GB套餐对大多数旅行者足够。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游英国。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "英国eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/uk-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="uk-esim" content={CONTENT[loc]} />;
}
