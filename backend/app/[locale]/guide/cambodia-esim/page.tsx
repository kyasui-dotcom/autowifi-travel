import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "thailand-esim", title: "タイeSIMガイド" },
      { slug: "vietnam-esim", title: "ベトナムeSIMガイド" },
      { slug: "asia-travel-connectivity", title: "アジア旅行の通信ガイド" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "thailand-esim", title: "Thailand eSIM Guide" },
      { slug: "vietnam-esim", title: "Vietnam eSIM Guide" },
      { slug: "asia-travel-connectivity", title: "Asia Travel Connectivity Guide" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "thailand-esim", title: "태국 eSIM 가이드" },
      { slug: "vietnam-esim", title: "베트남 eSIM 가이드" },
      { slug: "asia-travel-connectivity", title: "아시아 여행 통신 가이드" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "thailand-esim", title: "泰国eSIM指南" },
      { slug: "vietnam-esim", title: "越南eSIM指南" },
      { slug: "asia-travel-connectivity", title: "亚洲旅行通信指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "カンボジアeSIMガイド - プノンペン・シェムリアップのカバレッジと旅行者向け情報",
    subtitle: "eSIMでカンボジア旅行をもっと便利に - アンコールワットからビーチリゾートまで",
    intro: "カンボジアは世界遺産アンコールワットをはじめ、魅力的な観光スポットが豊富な東南アジアの人気旅行先です。近年モバイル通信インフラが急速に整備され、主要都市では4G LTEが安定して利用可能です。eSIMを利用すれば、プノンペン国際空港到着後すぐにGrabやPassAppで移動手段を確保し、アンコール遺跡群の情報検索も快適に行えます。",
    sections: [
      {
        title: "カンボジアのモバイル通信事情",
        body: "カンボジアの主要通信キャリアはCellcard、Smart Axiata、Metfoneの3社です。Cellcardは最も歴史のあるキャリアで、都市部を中心に安定したカバレッジを提供しています。Smart Axiataはマレーシアのaxiataグループ傘下で、4G LTEネットワークの拡大に力を入れています。Metfoneはベトナムのviettelが出資しており、地方部での通信カバレッジに強みがあります。\n\n旅行者向けeSIMプランはこれらのキャリアの回線を利用するものが多く、プノンペンやシェムリアップなどの主要都市では安定した4G LTE通信が可能です。5Gはまだ限定的ですが、都市部では下り20〜50Mbpsの速度を体験できます。\n\nカンボジアでは都市部と地方の通信格差があります。幹線道路沿いでは概ね通信可能ですが、農村部や山間部では電波が届きにくい場所もあります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "カンボジア向けeSIMプランは、短期旅行者向けの3〜7日プランから、長期滞在者向けの30日プランまで用意されています。アンコールワット観光を含む1週間の旅行なら5GBプランがおすすめです。カンボジアのカフェやホテルではフリーWiFiが広く提供されているため、eSIMと組み合わせればデータを効率的に使えます。\n\nASEAN周遊プランを選べば、隣国のタイやベトナムへの国境越え旅行にも同じeSIMで対応できます。カンボジアからタイへの陸路移動やベトナムへのバス旅行を計画している方にはASEAN対応プランがお得です。\n\nAutoWiFi eSIMでは、カンボジア専用プランとアジア周遊プランの両方を提供しています。テザリングにも対応しているので、複数デバイスでの利用も問題ありません。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでカンボジアプランを購入後、QRコードがメールで届きます。iPhoneは「設定→モバイル通信→eSIMを追加」、Androidは「設定→ネットワークとインターネット→SIM→eSIMを追加」からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、プノンペン国際空港やシェムリアップ・アンコール国際空港に到着後すぐに通信を開始できます。空港からホテルまでの移動にGrabやPassAppを使う場合、着陸直後からアプリが使えるのは大きなメリットです。\n\nカンボジアの空港ではフリーWiFiが提供されていますが、速度や安定性にばらつきがあります。eSIMがあれば、到着直後から安定した通信環境を確保できます。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "プノンペンは通信環境が最も良好で、王宮、セントラルマーケット、リバーサイドエリア、トゥールスレン虐殺博物館周辺など主要観光スポットで安定した4G接続が可能です。ナイトマーケットやBKK1エリアのカフェ・レストランでもスムーズに通信できます。\n\nシェムリアップ市内も通信環境が整っています。パブストリートやオールドマーケット周辺は問題ありません。アンコールワット、アンコールトム、タ・プロームなど主要な遺跡では4G通信が可能ですが、ベンメリアやプリア・ヴィヘアなど郊外の遺跡では電波が弱くなることがあります。\n\nシアヌークビルのビーチエリアやロン島では観光エリアで通信可能ですが、離島の一部では電波が不安定になることがあります。バッタンバンやカンポットなどの地方都市でも市内は概ねカバーされています。"
      },
      {
        title: "カンボジア旅行でのeSIM活用のコツ",
        body: "カンボジアでの移動にはGrabまたはPassAppが欠かせません。特にプノンペンではトゥクトゥクやバイクタクシーの交渉が不要になり、料金も事前に確認できます。eSIMがあれば、どこからでもすぐに配車を依頼できます。シェムリアップでもGrabが利用可能で、遺跡巡りの移動に便利です。\n\nアンコール遺跡群は広大なため、Google Mapsでの位置確認が非常に役立ちます。アンコールワットの日の出鑑賞スポットへの移動や、遺跡間の効率的なルート計画にもeSIMが活躍します。\n\nカンボジアではUSドルが広く流通していますが、キャッシュレス決済も増えています。ABA PayやWing Moneyなどのモバイル決済アプリを利用する店舗も増えており、eSIMがあればこれらの決済をスムーズに利用できます。Google翻訳でクメール語のメニューや看板を翻訳するのにもデータ接続が便利です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "カンボジアのeSIMでタイやベトナムでも使えますか？", a: "ASEAN対応プランであれば、タイ、ベトナム、ラオスなど周辺国でも利用可能です。カンボジア専用プランの場合は対応していないため、プラン詳細を確認してください。" },
      { q: "アンコールワット遺跡でeSIMは使えますか？", a: "はい、アンコールワット、アンコールトム、タ・プロームなど主要な遺跡エリアでは4G通信が可能です。ただし、郊外の遺跡や森の奥では電波が弱くなることがあります。" },
      { q: "カンボジアでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。ホテルやカフェのフリーWiFiも活用すれば、7日間5GBプランで十分です。" },
      { q: "カンボジアの空港でeSIMはすぐ使えますか？", a: "出発前にeSIMをインストールしておけば、プノンペン国際空港やシェムリアップ空港に到着後すぐに通信を開始できます。空港のフリーWiFiを待つ必要がありません。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでカンボジア旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "カンボジアeSIMガイド",
  },
  en: {
    title: "Cambodia eSIM Guide - Coverage in Phnom Penh, Siem Reap & Beyond",
    subtitle: "Stay connected across Cambodia with eSIM - from Angkor Wat to beach resorts",
    intro: "Cambodia is a captivating Southeast Asian destination, home to the iconic Angkor Wat and a rapidly growing travel scene. Mobile infrastructure has improved significantly in recent years, with reliable 4G LTE available in major cities. An eSIM lets you book a Grab or PassApp ride the moment you land at the airport and navigate the sprawling Angkor temple complex with ease.",
    sections: [
      {
        title: "Cambodia's Mobile Network Overview",
        body: "Cambodia has three major carriers: Cellcard, Smart Axiata, and Metfone. Cellcard is the oldest operator and provides strong coverage in urban areas. Smart Axiata, backed by Malaysia's Axiata Group, has been aggressively expanding its 4G LTE network. Metfone, invested in by Vietnam's Viettel, has a strength in rural coverage.\n\nTravel eSIM plans typically use these carriers' networks, offering stable 4G LTE in cities like Phnom Penh and Siem Reap. 5G is still limited, but urban areas deliver download speeds of 20-50 Mbps on 4G.\n\nThere is a noticeable gap between urban and rural connectivity in Cambodia. Major highways generally have coverage, but remote villages and mountainous areas may have limited or no signal."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Cambodia eSIM plans range from 3-7 day options for short trips to 30-day plans for longer stays. A 5GB plan works well for a one-week trip that includes Angkor Wat sightseeing. Cambodian hotels and cafes widely offer free WiFi, which helps conserve your eSIM data.\n\nASEAN-wide plans let you use the same eSIM when crossing into Thailand or Vietnam. If you are planning overland travel from Cambodia to Thailand or a bus trip to Vietnam, an ASEAN plan offers great value.\n\nAutoWiFi eSIM offers both Cambodia-only and Asia-wide plans. Tethering is supported, so you can share your connection across multiple devices."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Cambodia plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure so you can start using data immediately at Phnom Penh International Airport or Siem Reap Angkor International Airport. Being able to open Grab or PassApp right after landing to arrange your airport transfer is a major convenience.\n\nCambodian airports offer free WiFi, but speeds and reliability can vary. An eSIM ensures stable connectivity from the moment you arrive."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Phnom Penh has the best coverage in Cambodia. The Royal Palace, Central Market, Riverside area, and Tuol Sleng Genocide Museum all have stable 4G connectivity. Night markets and the cafes and restaurants in the BKK1 district also work smoothly.\n\nSiem Reap town has solid coverage as well. Pub Street and the Old Market area are well covered. Major temples including Angkor Wat, Angkor Thom, and Ta Prohm have 4G connectivity, though more remote sites like Beng Mealea or Preah Vihear may have weaker signal.\n\nSihanoukville's beach areas and Koh Rong have coverage in tourist zones, though some parts of the outer islands may be spotty. Provincial cities like Battambang and Kampot also have general coverage within town centers."
      },
      {
        title: "Tips for Using eSIM in Cambodia",
        body: "Grab and PassApp are essential ride-hailing apps in Cambodia. In Phnom Penh, they eliminate the need to negotiate with tuk-tuk and motorbike taxi drivers, with fares shown upfront. An eSIM lets you request a ride from anywhere instantly. Grab is also available in Siem Reap and handy for getting around the temples.\n\nThe Angkor temple complex is vast, and Google Maps is invaluable for finding your way between sites. An eSIM helps you locate sunrise viewing spots at Angkor Wat and plan efficient routes between temples.\n\nUS dollars are widely accepted in Cambodia, but mobile payments are growing. ABA Pay and Wing Money are increasingly accepted at shops and restaurants, and an eSIM makes these cashless payments seamless. Google Translate is also useful for reading Khmer menus and signs when you have a data connection."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use a Cambodia eSIM in Thailand or Vietnam?", a: "ASEAN-wide plans work in Thailand, Vietnam, Laos, and other neighboring countries. Cambodia-only plans do not include roaming, so check your plan details." },
      { q: "Does the eSIM work at Angkor Wat?", a: "Yes, major temples including Angkor Wat, Angkor Thom, and Ta Prohm have 4G coverage. However, more remote ruins or deep forest areas may have weaker signal." },
      { q: "How much data will I need in Cambodia?", a: "Typical tourist usage is 500MB to 1GB per day. With hotel and cafe WiFi available, a 5GB plan for 7 days is sufficient for most travelers." },
      { q: "Can I use the eSIM right away at the airport?", a: "Yes, if you install the eSIM before departure, you can start using data immediately upon landing at Phnom Penh or Siem Reap airport without waiting for airport WiFi." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Cambodia with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Cambodia eSIM Guide",
  },
  ko: {
    title: "캄보디아 eSIM 가이드 - 프놈펜, 시엠립 커버리지와 여행 정보",
    subtitle: "eSIM으로 캄보디아 여행을 더 편리하게 - 앙코르와트부터 비치 리조트까지",
    intro: "캄보디아는 세계유산 앙코르와트를 비롯해 매력적인 관광 명소가 풍부한 동남아시아 인기 여행지입니다. 최근 모바일 통신 인프라가 빠르게 정비되어 주요 도시에서 4G LTE를 안정적으로 이용할 수 있습니다. eSIM을 이용하면 프놈펜 국제공항 도착 후 바로 Grab이나 PassApp으로 이동 수단을 확보하고, 앙코르 유적 탐방도 편리하게 할 수 있습니다.",
    sections: [
      {
        title: "캄보디아의 모바일 통신 환경",
        body: "캄보디아의 주요 통신사는 Cellcard, Smart Axiata, Metfone 3사입니다. Cellcard는 가장 오래된 통신사로 도시 지역에서 안정적인 커버리지를 제공합니다. Smart Axiata는 말레이시아 Axiata 그룹 산하로 4G LTE 네트워크 확장에 주력하고 있습니다. Metfone은 베트남 Viettel이 투자한 통신사로 지방 지역 커버리지에 강점이 있습니다.\n\n여행자용 eSIM 플랜은 이들 통신사 회선을 사용하며, 프놈펜과 시엠립 등 주요 도시에서 안정적인 4G LTE 통신이 가능합니다. 5G는 아직 제한적이지만, 도시 지역에서는 하향 20~50Mbps의 속도를 경험할 수 있습니다.\n\n캄보디아는 도시와 지방의 통신 격차가 있습니다. 주요 도로변은 대체로 통신이 가능하지만, 농촌이나 산간 지역에서는 신호가 닿지 않는 곳도 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "캄보디아 eSIM 플랜은 단기 여행자용 3~7일 플랜부터 장기 체류자용 30일 플랜까지 다양합니다. 앙코르와트 관광을 포함한 1주일 여행이라면 5GB 플랜이 적당합니다. 캄보디아의 호텔과 카페에서는 무료 WiFi가 널리 제공되므로 eSIM과 병용하면 데이터를 효율적으로 사용할 수 있습니다.\n\nASEAN 통합 플랜을 선택하면 태국이나 베트남으로의 국경 이동 시에도 같은 eSIM을 사용할 수 있습니다. 캄보디아에서 태국으로의 육로 이동이나 베트남행 버스 여행을 계획하고 있다면 ASEAN 대응 플랜이 경제적입니다.\n\nAutoWiFi eSIM에서는 캄보디아 전용 플랜과 아시아 통합 플랜을 모두 제공합니다. 테더링도 지원됩니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 캄보디아 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 프놈펜 국제공항이나 시엠립 앙코르 국제공항 도착 후 바로 통신을 시작할 수 있습니다. 공항에서 호텔까지 Grab이나 PassApp으로 이동할 때 착륙 직후부터 앱을 사용할 수 있어 매우 편리합니다.\n\n캄보디아 공항에서는 무료 WiFi가 제공되지만 속도와 안정성이 고르지 않을 수 있습니다. eSIM이 있으면 도착 직후부터 안정적인 통신이 가능합니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "프놈펜은 통신 환경이 가장 양호합니다. 왕궁, 센트럴 마켓, 리버사이드 지역, 투올슬렝 학살 박물관 주변 등 주요 관광 명소에서 안정적인 4G 접속이 가능합니다. 나이트 마켓이나 BKK1 지역의 카페·레스토랑에서도 원활하게 통신할 수 있습니다.\n\n시엠립 시내도 통신 환경이 잘 갖춰져 있습니다. 펍 스트리트와 올드 마켓 주변은 문제없습니다. 앙코르와트, 앙코르톰, 타프롬 등 주요 유적에서는 4G 통신이 가능하지만, 벵메알레아나 프레아 비히어 등 교외 유적에서는 신호가 약해질 수 있습니다.\n\n시아누크빌 해변 지역과 꼬롱섬은 관광 지역에서 통신이 가능하지만, 외곽 섬 일부에서는 신호가 불안정할 수 있습니다. 바탐방, 캄폿 등 지방 도시에서도 시내는 대체로 커버됩니다."
      },
      {
        title: "캄보디아 여행에서의 eSIM 활용 팁",
        body: "캄보디아에서의 이동에는 Grab 또는 PassApp이 필수입니다. 특히 프놈펜에서는 툭툭이나 오토바이 택시와의 가격 흥정이 필요 없고, 요금도 사전에 확인할 수 있습니다. eSIM이 있으면 어디서든 바로 차량을 호출할 수 있습니다. 시엠립에서도 Grab을 이용할 수 있어 유적 관광 이동에 편리합니다.\n\n앙코르 유적군은 매우 넓어서 Google Maps로 위치를 확인하는 것이 큰 도움이 됩니다. 앙코르와트 일출 감상 포인트로의 이동이나 유적 간 효율적인 루트 계획에도 eSIM이 활약합니다.\n\n캄보디아에서는 미국 달러가 널리 통용되지만, 모바일 결제도 늘고 있습니다. ABA Pay나 Wing Money 등의 모바일 결제 앱을 사용하는 매장이 증가하고 있어 eSIM이 있으면 이러한 결제를 원활하게 이용할 수 있습니다. Google 번역으로 크메르어 메뉴나 간판을 번역하는 데에도 데이터 연결이 유용합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "캄보디아 eSIM으로 태국이나 베트남에서도 사용할 수 있나요?", a: "ASEAN 통합 플랜이면 태국, 베트남, 라오스 등 주변국에서도 이용 가능합니다. 캄보디아 전용 플랜은 로밍을 지원하지 않으므로 플랜 상세를 확인하세요." },
      { q: "앙코르와트 유적에서 eSIM을 사용할 수 있나요?", a: "네, 앙코르와트, 앙코르톰, 타프롬 등 주요 유적 지역에서 4G 통신이 가능합니다. 다만 교외 유적이나 숲 깊은 곳에서는 신호가 약해질 수 있습니다." },
      { q: "캄보디아에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 호텔과 카페의 무료 WiFi도 활용하면 7일간 5GB 플랜이면 충분합니다." },
      { q: "캄보디아 공항에서 eSIM을 바로 사용할 수 있나요?", a: "출발 전 eSIM을 설치해 두면 프놈펜이나 시엠립 공항 도착 즉시 데이터를 사용할 수 있습니다. 공항 무료 WiFi를 기다릴 필요가 없습니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 캄보디아 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "캄보디아 eSIM 가이드",
  },
  zh: {
    title: "柬埔寨eSIM指南 - 金边、暹粒覆盖与旅行信息",
    subtitle: "使用eSIM畅游柬埔寨 - 从吴哥窟到海滩度假村",
    intro: "柬埔寨是东南亚热门旅行目的地，拥有世界遗产吴哥窟等众多魅力景点。近年来移动通信基础设施快速发展，主要城市已可稳定使用4G LTE。使用eSIM，您可以在抵达金边国际机场后立即通过Grab或PassApp安排交通，轻松导航广阔的吴哥遗迹群。",
    sections: [
      {
        title: "柬埔寨移动通信概况",
        body: "柬埔寨三大运营商为Cellcard、Smart Axiata和Metfone。Cellcard是历史最悠久的运营商，在城市地区提供稳定覆盖。Smart Axiata由马来西亚Axiata集团支持，积极扩展4G LTE网络。Metfone由越南Viettel投资，在农村地区覆盖方面有优势。\n\n旅行者eSIM套餐通常使用这些运营商的网络，在金边和暹粒等主要城市提供稳定的4G LTE连接。5G仍然有限，但城市地区4G下载速度可达20-50Mbps。\n\n柬埔寨城乡通信存在差距。主要公路沿线一般有信号覆盖，但偏远村庄和山区可能信号较弱或无信号。"
      },
      {
        title: "推荐eSIM套餐",
        body: "柬埔寨eSIM套餐从短期旅行者的3-7天方案到长期停留的30天套餐应有尽有。包含吴哥窟观光的一周行程选择5GB套餐即可。柬埔寨的酒店和咖啡馆普遍提供免费WiFi，配合eSIM使用可以高效利用流量。\n\n选择东盟通用套餐，前往泰国或越南时也能使用同一eSIM。如果计划从柬埔寨陆路前往泰国或乘巴士去越南，东盟套餐更加经济。\n\nAutoWiFi eSIM提供柬埔寨专属套餐和亚洲通用套餐。支持热点共享，方便多设备使用。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买柬埔寨套餐后，QR码会发送到您的邮箱。iPhone用户前往「设置→蜂窝网络→添加eSIM」，Android用户前往「设置→网络和互联网→SIM卡→添加eSIM」扫描QR码。\n\n出发前安装eSIM，到达金边国际机场或暹粒吴哥国际机场后即可立即开始通信。从机场到酒店使用Grab或PassApp时，落地后马上就能使用应用，非常方便。\n\n柬埔寨机场提供免费WiFi，但速度和稳定性可能参差不齐。eSIM确保您从到达那一刻起就有稳定的网络连接。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "金边的通信环境最为优秀。王宫、中央市场、河滨区域、吐斯廉屠杀博物馆周边等主要景点都有稳定的4G连接。夜市和BKK1区的咖啡馆、餐厅也能顺畅通信。\n\n暹粒市区通信环境同样良好。酒吧街和老市场周边覆盖完善。吴哥窟、吴哥城、塔布隆寺等主要遗迹有4G覆盖，但崩密列、柏威夏等郊外遗迹信号可能较弱。\n\n西哈努克城海滩区域和高龙岛在旅游区有信号覆盖，但外岛部分区域信号可能不稳定。马德望、贡布等地方城市市区内基本有覆盖。"
      },
      {
        title: "柬埔寨旅行eSIM使用技巧",
        body: "在柬埔寨出行，Grab和PassApp是必备的打车应用。在金边，它们省去了与嘟嘟车和摩的司机讨价还价的麻烦，费用提前显示。有了eSIM，您可以随时随地叫车。暹粒也可以使用Grab，方便在各遗迹之间移动。\n\n吴哥遗迹群非常广阔，Google Maps对于确认位置非常有帮助。从寻找吴哥窟日出观赏点到规划遗迹之间的高效路线，eSIM都能派上用场。\n\n柬埔寨广泛流通美元，但移动支付也在增长。越来越多的商店和餐厅接受ABA Pay和Wing Money等移动支付，有了eSIM可以顺畅使用这些无现金支付方式。使用Google翻译阅读高棉语菜单和标牌时，数据连接也很方便。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "柬埔寨eSIM能在泰国或越南使用吗？", a: "东盟通用套餐可在泰国、越南、老挝等周边国家使用。柬埔寨专属套餐不支持漫游，请查看套餐详情。" },
      { q: "吴哥窟遗迹能用eSIM吗？", a: "可以，吴哥窟、吴哥城、塔布隆寺等主要遗迹区域有4G覆盖。但郊外遗迹或森林深处信号可能较弱。" },
      { q: "在柬埔寨大概需要多少流量？", a: "一般观光使用每天500MB-1GB。利用酒店和咖啡馆的免费WiFi，7天5GB套餐对大多数旅行者足够。" },
      { q: "在柬埔寨机场能马上使用eSIM吗？", a: "出发前安装好eSIM，到达金边或暹粒机场后即可立即使用数据，无需等待机场免费WiFi。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游柬埔寨。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "柬埔寨eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/cambodia-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="cambodia-esim" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
