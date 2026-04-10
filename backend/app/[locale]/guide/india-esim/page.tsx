import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "インドeSIMガイド - デリー・ムンバイ・ゴアの通信事情を徹底解説",
    subtitle: "多様性の国インドを、eSIMで快適に旅しよう",
    intro: "インドは13億人以上の人口を持つ巨大な国で、デリーのタージ・マハルへの玄関口、ムンバイの映画産業とストリートフード、ゴアのビーチリゾートなど多彩な魅力があります。インドの通信インフラは急速に発展しており、主要都市では4G通信が広く利用可能です。eSIMを使えば、インディラ・ガンディー国際空港（デリー）やチャトラパティ・シヴァージー国際空港（ムンバイ）到着後すぐにUberやOlaでの配車が可能になります。",
    sections: [
      {
        title: "インドの通信環境と主要キャリア",
        body: "インドの通信市場はJio（Reliance）、Airtel、Vi（Vodafone Idea）の3大キャリアが中心です。特にJioは2016年のサービス開始以来、インドのモバイルインターネット革命を牽引し、全国に広範な4Gカバレッジを構築しました。5Gの展開もデリー、ムンバイ、バンガロールなどの主要都市で進んでいます。\n\nインドの通信料金は世界で最も安い水準にあり、データ通信のコストは非常にリーズナブルです。ただし、外国人旅行者がインドでSIMカードを購入する場合、本人確認（KYC）の手続きが厳しく、パスポートのコピーや顔写真の撮影が必要で、開通まで数時間〜1日かかることがあります。eSIMならこの煩雑な手続きを完全に回避できます。"
      },
      {
        title: "主要都市の通信ガイド",
        body: "デリーはインドの首都圏（NCR）で、レッドフォート、フマユーン廟、クトゥブ・ミナール、コンノートプレイスなどの観光スポットでは安定した4G通信が利用可能です。デリーメトロの構内でもカバレッジが確保されています。タージ・マハルのあるアグラまでは電車で約2時間で、アグラ市内でも4G通信が利用可能です。\n\nムンバイはインド最大の経済都市で、ゲートウェイ・オブ・インディア、エレファンタ石窟群、コラバ地区などが人気です。ムンバイ市内では安定した4G/5G通信が利用可能で、特に南ムンバイのビジネス・観光エリアでは通信品質が優れています。\n\nゴアはインド西海岸のビーチリゾートで、北ゴア（バガ、カランギュート）と南ゴア（パロレム）の主要ビーチエリアでは4G通信が利用可能です。"
      },
      {
        title: "インド旅行でのeSIM活用シーン",
        body: "インドではUberとOla（インドのライドシェアアプリ）が移動の基本手段です。特にデリーやムンバイでは交通渋滞が激しく、リキシャやタクシーの料金交渉も必要なため、配車アプリの利用が安心です。eSIMがあれば空港到着後すぐに配車アプリを利用できます。\n\nインドの観光地では英語が通じる場面も多いですが、ローカルな市場や地方都市ではヒンディー語やその他の地域言語が中心となるため、Google翻訳は欠かせません。UPI（Unified Payments Interface）によるデジタル決済がインド全土で急速に普及しており、Google PayやPhonePeなどの決済アプリを利用するにも安定したデータ通信が必要です。\n\nまた、インドの鉄道旅行は人気ですが、IRCTCの予約確認やPNRステータスチェックにはモバイルデータが便利です。長距離列車では主要駅付近で4G接続が可能ですが、駅間で通信が途切れることがあります。"
      },
      {
        title: "インド向けeSIMプラン選び",
        body: "インドのeSIMプランはアジアの中でも非常にリーズナブルです。一般的な観光であれば1日1GBで十分ですが、動画のストリーミングやビデオ通話を頻繁に行う場合は無制限プランがおすすめです。インドでは外国人のSIMカード購入にKYC手続きが必要ですが、eSIMならこの手続きが不要で、事前にオンラインで購入・設定が完了します。\n\nAutoWiFi eSIMのインドプランは、AirtelまたはJioの回線に接続するため、全国の主要都市と観光地で安定した通信を提供します。デリーとアグラだけの短期旅行なら5〜7日プラン、ゴールデントライアングル（デリー・アグラ・ジャイプール）や南インドも周る場合は14日以上のプランがおすすめです。ネパールやスリランカとの組み合わせプランも検討する価値があります。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "インドでeSIMは安定して使えますか？", a: "はい、デリー、ムンバイ、バンガロール、ゴアなどの主要都市と観光地では安定した4G通信が利用可能です。地方の農村部では3Gになることがありますが、主要な観光ルートでは概ね問題ありません。" },
      { q: "インドでSIMカードを買うのは大変ですか？", a: "はい、外国人がインドでSIMカードを購入するにはKYC（本人確認）手続きが必要で、パスポートのコピーや顔写真の撮影、開通まで数時間〜1日かかることがあります。eSIMならこの手続きが不要で、事前に設定を済ませておけば到着後すぐに利用できます。" },
      { q: "タージ・マハル（アグラ）でeSIMは使えますか？", a: "はい、アグラ市内とタージ・マハル周辺では4G通信が利用可能です。世界遺産の美しい写真をリアルタイムでSNSに投稿できます。" },
      { q: "インドでUberやOlaは使えますか？", a: "はい、デリー、ムンバイ、バンガロールなどの主要都市でUberとOlaが広く利用されています。eSIMでデータ通信があれば到着後すぐに利用可能です。インドの交通事情を考えると配車アプリの利用を強くおすすめします。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでインド旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "インドeSIM",
  },
  en: {
    title: "India eSIM Guide - Delhi, Mumbai, Goa & Connectivity Across India",
    subtitle: "Navigate the incredible diversity of India with reliable mobile connectivity",
    intro: "India, with over 1.3 billion people, offers an extraordinary range of experiences — from Delhi as the gateway to the Taj Mahal, to Mumbai's film industry and street food scene, to Goa's beach resorts. India's telecom infrastructure has developed rapidly, with 4G widely available in major cities. An eSIM lets you use Uber or Ola ride-hailing immediately upon landing at Indira Gandhi International Airport (Delhi) or Chhatrapati Shivaji International Airport (Mumbai).",
    sections: [
      {
        title: "India's Telecom Environment and Major Carriers",
        body: "India's telecom market is led by three carriers: Jio (Reliance), Airtel, and Vi (Vodafone Idea). Jio, launched in 2016, has spearheaded India's mobile internet revolution, building extensive 4G coverage nationwide. 5G is being deployed in major cities including Delhi, Mumbai, and Bangalore.\n\nIndia has some of the world's cheapest mobile data. However, foreign travelers face strict KYC (Know Your Customer) requirements when buying local SIM cards — passport copies, photos, and activation can take hours to a full day. An eSIM completely eliminates this cumbersome process."
      },
      {
        title: "City-by-City Connectivity Guide",
        body: "Delhi, India's capital region (NCR), has stable 4G coverage at tourist sites including Red Fort, Humayun's Tomb, Qutub Minar, and Connaught Place. Delhi Metro stations have good connectivity. Agra, home to the Taj Mahal, is about 2 hours by train and also has reliable 4G coverage.\n\nMumbai, India's financial capital, features the Gateway of India, Elephanta Caves, and the Colaba district. The city has strong 4G/5G coverage, particularly in South Mumbai's business and tourist areas.\n\nGoa, on India's west coast, offers beach resorts with 4G coverage at major beaches in North Goa (Baga, Calangute) and South Goa (Palolem)."
      },
      {
        title: "How eSIM Enhances India Travel",
        body: "Uber and Ola (India's ride-hailing app) are essential transportation tools in India. Delhi and Mumbai have intense traffic, and negotiating with auto-rickshaw drivers or taxi operators can be challenging. Ride-hailing apps provide transparent pricing and safety. An eSIM lets you use these apps immediately upon arrival.\n\nWhile English is widely understood at tourist sites, local markets and smaller cities predominantly use Hindi or regional languages, making Google Translate invaluable. UPI (Unified Payments Interface) digital payments have spread rapidly across India, and apps like Google Pay and PhonePe require stable data connectivity.\n\nIndia's railway network is a popular way to travel, and checking IRCTC reservation status and PNR numbers requires mobile data. Long-distance trains have 4G near major stations, though connectivity may drop between stops."
      },
      {
        title: "Choosing an India eSIM Plan",
        body: "India eSIM plans are among the most affordable in Asia. For general tourism, 1GB per day is sufficient. For frequent video streaming or video calls, unlimited plans are recommended. Unlike buying a local SIM card with its required KYC process, an eSIM can be purchased and set up online before departure.\n\nAutoWiFi eSIM India plans connect through Airtel or Jio networks, providing stable coverage across major cities and tourist destinations. For a short Delhi-Agra trip, 5-7 day plans work well. For the Golden Triangle (Delhi-Agra-Jaipur) or South India, 14+ day plans are recommended. Combination plans with Nepal or Sri Lanka are also worth considering."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Is eSIM reliable in India?", a: "Yes, major cities and tourist destinations like Delhi, Mumbai, Bangalore, and Goa have stable 4G coverage. Rural areas may fall back to 3G, but main tourist routes are generally well-covered." },
      { q: "Is buying a SIM card in India difficult for tourists?", a: "Yes, foreign tourists must complete KYC (Know Your Customer) verification requiring passport copies, photos, and waiting hours to a full day for activation. An eSIM skips this entirely — set up before departure and use immediately upon arrival." },
      { q: "Does eSIM work at the Taj Mahal in Agra?", a: "Yes, 4G coverage is available in Agra city and around the Taj Mahal. You can share stunning photos of this World Heritage site on social media in real time." },
      { q: "Can I use Uber and Ola in India with eSIM?", a: "Yes, both Uber and Ola are widely used in Delhi, Mumbai, Bangalore, and other major cities. eSIM data lets you use them immediately upon arrival, which is strongly recommended given India's traffic conditions." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to India with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "India eSIM",
  },
  ko: {
    title: "인도 eSIM 가이드 - 델리·뭄바이·고아 통신 사정 완전 해설",
    subtitle: "다양성의 나라 인도를 eSIM으로 편리하게 여행하세요",
    intro: "인도는 13억 이상의 인구를 가진 거대한 나라로, 타지마할의 관문인 델리, 영화 산업과 스트리트 푸드의 뭄바이, 해변 리조트의 고아 등 다채로운 매력이 있습니다. 인도의 통신 인프라는 빠르게 발전하고 있으며, 주요 도시에서는 4G 통신이 널리 이용 가능합니다. eSIM을 이용하면 인디라 간디 국제공항(델리)이나 차트라파티 시바지 국제공항(뭄바이) 도착 후 바로 Uber나 Ola 호출이 가능합니다.",
    sections: [
      {
        title: "인도 통신 환경과 주요 통신사",
        body: "인도 통신 시장은 Jio(Reliance), Airtel, Vi(Vodafone Idea)의 3대 통신사가 주도합니다. 특히 Jio는 2016년 서비스 시작 이래 인도의 모바일 인터넷 혁명을 이끌며 전국에 광범위한 4G 커버리지를 구축했습니다. 5G도 델리, 뭄바이, 방갈로르 등 주요 도시에서 확대 중입니다.\n\n인도의 통신 요금은 세계에서 가장 저렴한 수준이지만, 외국인 여행자가 인도에서 SIM 카드를 구매하려면 KYC(본인 확인) 절차가 까다롭습니다. 여권 사본과 얼굴 사진 촬영이 필요하며, 개통까지 수 시간에서 하루가 걸릴 수 있습니다. eSIM이라면 이 번거로운 절차를 완전히 피할 수 있습니다."
      },
      {
        title: "주요 도시 통신 가이드",
        body: "델리는 인도의 수도권(NCR)으로, 레드 포트, 후마윤의 묘, 쿠트브 미나르, 코넛 플레이스 등 관광 명소에서 안정적인 4G를 이용할 수 있습니다. 델리 메트로 역사 내에서도 커버리지가 확보됩니다. 타지마할이 있는 아그라까지는 기차로 약 2시간이며, 아그라 시내에서도 4G를 이용할 수 있습니다.\n\n뭄바이는 인도 최대의 경제 도시로, 인도의 관문, 엘레판타 석굴, 콜라바 지구 등이 인기입니다. 뭄바이 시내에서는 안정적인 4G/5G를 이용할 수 있으며, 특히 남부 뭄바이의 비즈니스·관광 지역은 통신 품질이 우수합니다.\n\n고아는 인도 서해안의 비치 리조트로, 노스 고아(바가, 칼랑구트)와 사우스 고아(팔로렘)의 주요 해변에서 4G를 이용할 수 있습니다."
      },
      {
        title: "인도 여행에서의 eSIM 활용",
        body: "인도에서는 Uber와 Ola(인도 라이드셰어 앱)가 이동의 기본 수단입니다. 특히 델리와 뭄바이는 교통 체증이 심하고, 릭샤나 택시와의 요금 협상도 필요하므로 배차 앱 이용이 안심입니다. eSIM이 있으면 공항 도착 후 바로 배차 앱을 사용할 수 있습니다.\n\n인도 관광지에서는 영어가 통하는 경우도 많지만, 로컬 시장이나 지방 도시에서는 힌디어나 지역 언어가 중심이므로 Google 번역이 필수입니다. UPI(통합결제인터페이스)에 의한 디지털 결제가 인도 전역에서 빠르게 보급되고 있어 Google Pay나 PhonePe 등의 결제 앱을 사용하려면 안정적인 데이터 통신이 필요합니다.\n\n인도 철도 여행도 인기이며, IRCTC 예약 확인이나 PNR 상태 확인에는 모바일 데이터가 편리합니다."
      },
      {
        title: "인도 eSIM 플랜 선택",
        body: "인도 eSIM 플랜은 아시아에서도 매우 저렴합니다. 일반 관광이라면 하루 1GB면 충분하지만, 동영상 스트리밍이나 영상 통화를 자주 한다면 무제한 플랜을 추천합니다. 인도에서 외국인이 SIM 카드를 구매하려면 KYC 절차가 필요하지만, eSIM이라면 이 절차 없이 사전에 온라인으로 구매·설정이 완료됩니다.\n\nAutoWiFi eSIM 인도 플랜은 Airtel 또는 Jio 회선에 연결되어 전국 주요 도시와 관광지에서 안정적인 통신을 제공합니다. 델리와 아그라만 단기 여행이라면 5~7일 플랜, 골든 트라이앵글(델리·아그라·자이푸르)이나 남인도도 방문한다면 14일 이상의 플랜을 추천합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "인도에서 eSIM이 안정적으로 작동하나요?", a: "네, 델리, 뭄바이, 방갈로르, 고아 등 주요 도시와 관광지에서 안정적인 4G를 이용할 수 있습니다. 지방 농촌 지역에서는 3G가 될 수 있지만, 주요 관광 루트에서는 대체로 문제없습니다." },
      { q: "인도에서 SIM 카드 구매가 어렵나요?", a: "네, 외국인이 인도에서 SIM 카드를 구매하려면 KYC(본인 확인) 절차가 필요하며 여권 사본, 얼굴 사진, 개통까지 수 시간~하루가 소요될 수 있습니다. eSIM이라면 이 절차가 전혀 필요 없으며 출발 전 설정을 마치면 도착 즉시 사용할 수 있습니다." },
      { q: "타지마할(아그라)에서 eSIM을 사용할 수 있나요?", a: "네, 아그라 시내와 타지마할 주변에서 4G를 이용할 수 있습니다. 세계유산의 아름다운 사진을 실시간으로 SNS에 올릴 수 있습니다." },
      { q: "인도에서 Uber나 Ola를 사용할 수 있나요?", a: "네, 델리, 뭄바이, 방갈로르 등 주요 도시에서 Uber와 Ola가 널리 이용됩니다. eSIM 데이터가 있으면 도착 후 바로 사용할 수 있으며, 인도의 교통 사정을 고려하면 배차 앱 이용을 강력히 추천합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 인도 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "인도 eSIM",
  },
  zh: {
    title: "印度eSIM指南 - 德里·孟买·果阿通信全攻略",
    subtitle: "用eSIM畅游多元文化的印度",
    intro: "印度拥有超过13亿人口，从通往泰姬陵的德里、电影之都和街头美食天堂孟买，到果阿的海滨度假——精彩纷呈。印度通信基础设施发展迅速，主要城市4G广泛可用。使用eSIM可以在英迪拉·甘地国际机场（德里）或贾特拉帕蒂·希瓦吉国际机场（孟买）落地后立即使用Uber或Ola叫车。",
    sections: [
      {
        title: "印度通信环境与主要运营商",
        body: "印度通信市场由Jio（信实）、Airtel和Vi（沃达丰-Idea）三大运营商主导。其中Jio自2016年推出以来引领了印度的移动互联网革命，在全国建立了广泛的4G覆盖。5G也在德里、孟买、班加罗尔等主要城市推进部署。\n\n印度的移动数据资费全球最低，非常实惠。但外国游客在印度购买SIM卡需要严格的KYC（身份验证）流程——需要护照复印件、面部照片拍摄，激活可能需要数小时甚至一整天。eSIM完全绕过这个繁琐的流程。"
      },
      {
        title: "主要城市通信指南",
        body: "德里是印度首都圈（NCR），红堡、胡马雍墓、库特布塔、康诺特广场等景点4G信号稳定。德里地铁站内也有良好覆盖。泰姬陵所在的阿格拉距德里约2小时火车车程，阿格拉市内也有4G覆盖。\n\n孟买是印度最大的经济城市，印度门、象岛石窟、科拉巴区等广受欢迎。孟买市内4G/5G覆盖稳定，尤其南孟买的商务和旅游区通信质量优越。\n\n果阿是印度西海岸的海滨度假胜地，北果阿（巴嘎、卡兰古特）和南果阿（帕洛伦）的主要海滩区域4G可用。"
      },
      {
        title: "eSIM助力印度旅行",
        body: "在印度，Uber和Ola（印度网约车应用）是基本出行工具。德里和孟买交通拥堵严重，与人力车夫或出租车司机讨价还价也有挑战，网约车应用提供透明的定价和安全保障。有eSIM就能到达后立即使用这些应用。\n\n虽然旅游景点普遍能用英语沟通，但当地市场和小城市主要使用印地语或地方语言，Google翻译不可或缺。UPI（统一支付接口）数字支付在印度全国快速普及，使用Google Pay和PhonePe等支付应用需要稳定的数据连接。\n\n印度铁路旅行也很受欢迎，查看IRCTC预订确认和PNR状态需要移动数据。长途列车在主要车站附近有4G信号，但站间可能会断网。"
      },
      {
        title: "印度eSIM套餐选择",
        body: "印度eSIM套餐在亚洲中价格最实惠。一般观光每天1GB足够，频繁视频通话或看视频则推荐无限流量套餐。在印度购买本地SIM卡需要KYC流程，而eSIM无需这些手续，出发前在线购买设置即可。\n\nAutoWiFi eSIM印度套餐接入Airtel或Jio网络，在全国主要城市和景点提供稳定通信。德里和阿格拉短期旅行选5-7天套餐，金三角（德里-阿格拉-斋浦尔）或南印度则推荐14天以上套餐。与尼泊尔或斯里兰卡的组合套餐也值得考虑。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在印度稳定吗？", a: "在德里、孟买、班加罗尔、果阿等主要城市和景点，4G覆盖稳定。农村地区可能降为3G，但主要旅游路线总体没问题。" },
      { q: "在印度买SIM卡很麻烦吗？", a: "是的，外国游客在印度买SIM卡需要完成KYC身份验证，需要护照复印件、拍照，激活可能需要数小时到一整天。eSIM完全免去这些步骤——出发前设置好，到达后立即使用。" },
      { q: "在泰姬陵（阿格拉）能用eSIM吗？", a: "可以，阿格拉市内和泰姬陵周边有4G覆盖。可以实时将这座世界遗产的美照分享到社交媒体。" },
      { q: "在印度能用Uber和Ola吗？", a: "可以，Uber和Ola在德里、孟买、班加罗尔等主要城市广泛使用。有eSIM数据连接就能到达后立即使用，考虑到印度的交通状况，强烈推荐使用网约车应用。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游印度。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "印度eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/india-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="india-esim" content={CONTENT[loc]} />;
}
