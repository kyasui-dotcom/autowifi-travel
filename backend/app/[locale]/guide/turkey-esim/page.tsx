import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "トルコeSIMガイド - イスタンブール・カッパドキアで快適接続",
    subtitle: "東西文明の交差点トルコを、安定したモバイル通信で巡ろう",
    intro: "トルコはヨーロッパとアジアにまたがる独特の国で、イスタンブールの歴史的なモスクやバザール、カッパドキアの幻想的な奇岩群と気球ツアーなど、唯一無二の旅行体験が待っています。トルコの通信インフラは主要都市で整備されており、eSIMを使えばイスタンブール空港到着後すぐにGoogle Mapsやタクシー配車アプリを利用できます。本記事では東西文明の交差点トルコを、安定したモバイル通信で巡ろう・トルコの通信環境と主要キャリア・イスタンブールでの通信活用などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "トルコの通信環境と主要キャリア",
        body: "トルコの通信市場はTurkcell、Vodafone Turkey、Turk Telekomの3大キャリアが中心です。特にTurkcellは最大のカバレッジを誇り、イスタンブール、アンカラ、イズミールなどの主要都市では安定した4G通信が利用可能です。5Gの導入も計画されていますが、2026年時点ではまだ限定的です。\n\nトルコは東西に約1,600kmに及ぶ広大な国土を持ちますが、主要都市間の幹線道路沿いや観光地ではカバレッジが概ね良好です。ただし、東部の山岳地帯や黒海沿岸の一部では3G接続になることがあります。カッパドキアは地方に位置しますが、観光の中心地であるギョレメやウチヒサールでは4G通信が利用可能です。"
      },
      {
        title: "イスタンブールでの通信活用",
        body: "イスタンブールはトルコ最大の都市で、ヨーロッパ側とアジア側にまたがっています。アヤソフィア、ブルーモスク、トプカプ宮殿、グランドバザール、スパイスバザールなどの観光名所はすべてヨーロッパ側の旧市街に集中しており、安定した4G通信が利用可能です。イスタンブールの地下鉄（メトロ）やトラムの構内でもカバレッジは良好です。\n\nイスタンブールカード（IC交通カード）の残高確認やチャージにはモバイルアプリが便利で、データ通信があるとスムーズです。また、イスタンブールのレストランでは英語メニューがない場合も多く、Google翻訳が活躍します。ボスポラス海峡クルーズ中もほぼ全区間でデータ通信が可能です。"
      },
      {
        title: "カッパドキアとその他の観光地",
        body: "カッパドキアはトルコ中央部に位置する世界遺産で、奇岩群の間に造られた洞窟住居や教会が魅力です。早朝の熱気球ツアーは特に人気で、上空からの絶景をSNSにシェアするには安定したデータ通信が欠かせません。ギョレメの町中やウチヒサール城周辺では4G通信が利用可能です。\n\nパムッカレの石灰棚、エフェソスの古代遺跡、アンタルヤの地中海リゾートなども人気の観光地で、いずれも4G通信が利用可能です。トルコ国内線での移動中も、空港内では安定した通信が利用できます。\n\nトルコでは一部のSNSやウェブサイトへのアクセスが制限されることがありますが、海外eSIMのローミング接続では通常これらの制限を受けずにアクセスできます。"
      },
      {
        title: "トルコ向けeSIMプラン選び",
        body: "トルコ旅行は通常5〜10日間が多く、イスタンブールとカッパドキアを組み合わせるのが定番ルートです。データ容量は1日500MB〜1GBで十分な方が多いですが、カッパドキアの気球ツアーの動画をアップロードする場合は余裕のあるプランがおすすめです。\n\nAutoWiFi eSIMのトルコプランは、Turkcellの回線に接続するため、主要都市と観光地で安定した通信を提供します。イスタンブールのみの短期旅行なら3〜5日プラン、カッパドキアやアンタルヤも周る場合は7〜10日プランがおすすめです。ギリシャとの島巡りを組み合わせる場合は、トルコ・ギリシャセットプランもご検討ください。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "トルコでeSIMは安定して使えますか？", a: "はい、イスタンブール、アンカラ、カッパドキアなどの主要観光地では安定した4G通信が利用可能です。東部の山岳地帯では一部3Gになることがありますが、主要な観光ルートでは問題ありません。" },
      { q: "カッパドキアの気球ツアー中にeSIMは使えますか？", a: "はい、カッパドキアの上空でもデータ通信が可能です。気球からの絶景写真や動画をリアルタイムでSNSに投稿できます。" },
      { q: "トルコではSNSが規制されていると聞きましたが？", a: "トルコでは一部のSNSへのアクセスが制限されることがありますが、AutoWiFi eSIMのローミング接続では通常これらの制限を受けずにアクセスできます。" },
      { q: "イスタンブールからカッパドキアへの移動中、eSIMは使えますか？", a: "国内線フライトの場合、イスタンブール空港とカイセリ/ネヴシェヒル空港では安定した通信が利用可能です。バスでの移動の場合、幹線道路沿いでは概ねカバレッジがありますが、一部区間で通信が不安定になることがあります。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでトルコ旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "トルコeSIM",
  },
  en: {
    title: "Turkey eSIM Guide - Stay Connected in Istanbul & Cappadocia",
    subtitle: "Explore the crossroads of Europe and Asia with reliable mobile data",
    intro: "Turkey straddles Europe and Asia, offering unique experiences from Istanbul's historic mosques and bazaars to Cappadocia's otherworldly rock formations and hot air balloon tours. Turkey's telecom infrastructure is well-developed in major cities, and an eSIM gets you connected immediately upon landing at Istanbul Airport for Google Maps and taxi apps.",
    sections: [
      {
        title: "Turkey's Telecom Environment",
        body: "Turkey's telecom market is led by three carriers: Turkcell, Vodafone Turkey, and Turk Telekom. Turkcell has the most extensive coverage, with stable 4G connectivity available in major cities including Istanbul, Ankara, and Izmir. While 5G plans are underway, deployment remains limited as of 2026.\n\nTurkey stretches approximately 1,600km from east to west. Major highways and tourist destinations generally have good coverage, though eastern mountainous regions and parts of the Black Sea coast may fall back to 3G. Cappadocia, though rural, has 4G coverage in the main tourist centers of Goreme and Uchisar."
      },
      {
        title: "Using eSIM in Istanbul",
        body: "Istanbul is Turkey's largest city, spanning both European and Asian shores. Major attractions — Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, and Spice Bazaar — are concentrated in the Old City on the European side, all with stable 4G coverage. Istanbul's metro and tram systems also have good connectivity.\n\nThe Istanbulkart (transit card) mobile app for balance checking and top-up works much better with data connectivity. Many Istanbul restaurants lack English menus, making Google Translate invaluable. Bosphorus cruise tours maintain data connectivity throughout virtually the entire route."
      },
      {
        title: "Cappadocia and Other Destinations",
        body: "Cappadocia is a UNESCO World Heritage site in central Turkey, famous for its fairy chimneys and cave dwellings. The early morning hot air balloon tours are especially popular — stable data connectivity lets you share the breathtaking aerial views on social media in real time. Goreme town center and the area around Uchisar Castle have 4G coverage.\n\nPamukkale's travertine terraces, the ancient ruins of Ephesus, and Antalya's Mediterranean resort coast are all popular destinations with reliable 4G coverage. Turkish domestic airports provide stable connectivity during layovers.\n\nTurkey occasionally restricts access to certain social media platforms and websites, but international eSIM roaming connections typically bypass these restrictions."
      },
      {
        title: "Choosing a Turkey eSIM Plan",
        body: "Turkey trips typically last 5-10 days, with Istanbul and Cappadocia being the classic combination. Daily data of 500MB to 1GB suits most travelers, though uploading Cappadocia balloon tour videos calls for a more generous plan.\n\nAutoWiFi eSIM Turkey plans connect through Turkcell's network, ensuring stable coverage at major cities and tourist sites. For a short Istanbul-only trip, 3-5 day plans work well. For itineraries including Cappadocia or Antalya, 7-10 day plans are recommended. If combining with Greek island-hopping, consider a Turkey-Greece combination plan."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Is eSIM reliable in Turkey?", a: "Yes, major tourist destinations like Istanbul, Ankara, and Cappadocia have stable 4G coverage. Some eastern mountain areas may drop to 3G, but main tourist routes are well-covered." },
      { q: "Can I use eSIM during a Cappadocia balloon tour?", a: "Yes, data connectivity works at altitude over Cappadocia. You can post stunning aerial photos and videos to social media in real time during your balloon ride." },
      { q: "I heard Turkey restricts social media — will my eSIM be affected?", a: "Turkey does occasionally restrict certain social media platforms, but AutoWiFi eSIM roaming connections typically bypass these local restrictions, giving you normal access." },
      { q: "Does eSIM work during travel from Istanbul to Cappadocia?", a: "For domestic flights, both Istanbul Airport and Kayseri/Nevsehir airports have stable connectivity. For bus travel, coverage is generally available along main highways but may be intermittent in some stretches." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Turkey with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Turkey eSIM",
  },
  ko: {
    title: "튀르키예 eSIM 가이드 - 이스탄불·카파도키아 완벽 연결",
    subtitle: "동서양 문명의 교차로 튀르키예를 안정적인 모바일 통신으로 여행하세요",
    intro: "튀르키예는 유럽과 아시아에 걸쳐 있는 독특한 나라로, 이스탄불의 역사적인 모스크와 바자르, 카파도키아의 환상적인 기암괴석과 열기구 투어 등 유일무이한 여행 경험이 기다립니다. 튀르키예의 통신 인프라는 주요 도시에서 잘 정비되어 있어 eSIM을 이용하면 이스탄불 공항 도착 후 바로 Google Maps와 택시 호출 앱을 사용할 수 있습니다.",
    sections: [
      {
        title: "튀르키예 통신 환경과 주요 통신사",
        body: "튀르키예 통신 시장은 Turkcell, Vodafone Turkey, Turk Telekom의 3대 통신사가 주도합니다. 특히 Turkcell은 최대 커버리지를 자랑하며, 이스탄불, 앙카라, 이즈미르 등 주요 도시에서 안정적인 4G를 이용할 수 있습니다.\n\n튀르키예는 동서로 약 1,600km에 달하는 광대한 국토를 가지고 있으며, 주요 도시 간 간선도로와 관광지에서는 커버리지가 대체로 양호합니다. 다만 동부 산악 지역이나 흑해 연안 일부에서는 3G가 될 수 있습니다. 카파도키아는 지방에 위치하지만, 관광 중심지인 괴레메와 우치히사르에서는 4G를 이용할 수 있습니다."
      },
      {
        title: "이스탄불에서의 통신 활용",
        body: "이스탄불은 튀르키예 최대 도시로 유럽 측과 아시아 측에 걸쳐 있습니다. 아야소피아, 블루모스크, 톱카프 궁전, 그랜드 바자르, 스파이스 바자르 등 관광 명소는 모두 유럽 측 구시가지에 집중되어 있으며 안정적인 4G를 이용할 수 있습니다. 이스탄불 메트로와 트램 내에서도 커버리지가 양호합니다.\n\n이스탄불카드(교통카드) 잔액 확인과 충전에는 모바일 앱이 편리하며, 데이터 통신이 있으면 원활합니다. 이스탄불 레스토랑에서는 영어 메뉴가 없는 경우도 많아 Google 번역이 큰 도움이 됩니다. 보스포루스 해협 크루즈 중에도 거의 전 구간에서 데이터 통신이 가능합니다."
      },
      {
        title: "카파도키아와 기타 관광지",
        body: "카파도키아는 튀르키예 중부에 위치한 세계유산으로, 기암괴석 사이에 만들어진 동굴 주거와 교회가 매력입니다. 이른 아침 열기구 투어가 특히 인기이며, 상공에서의 절경을 SNS에 공유하려면 안정적인 데이터 통신이 필수입니다. 괴레메 시내와 우치히사르 성 주변에서 4G를 이용할 수 있습니다.\n\n파묵칼레의 석회암 계단식 온천, 에페소스 고대 유적, 안탈리아 지중해 리조트 등도 인기 관광지로 모두 4G 통신이 가능합니다.\n\n튀르키예에서는 일부 SNS나 웹사이트 접속이 제한될 수 있지만, 해외 eSIM의 로밍 접속에서는 보통 이러한 제한 없이 접속할 수 있습니다."
      },
      {
        title: "튀르키예 eSIM 플랜 선택",
        body: "튀르키예 여행은 보통 5~10일이며, 이스탄불과 카파도키아를 조합하는 것이 정석 루트입니다. 데이터 용량은 하루 500MB~1GB면 충분한 분이 많지만, 카파도키아 열기구 투어 동영상을 업로드하려면 여유 있는 플랜을 추천합니다.\n\nAutoWiFi eSIM 튀르키예 플랜은 Turkcell 회선에 연결되어 주요 도시와 관광지에서 안정적인 통신을 제공합니다. 이스탄불만 단기 여행이라면 3~5일 플랜, 카파도키아나 안탈리아도 방문한다면 7~10일 플랜을 추천합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "튀르키예에서 eSIM이 안정적으로 작동하나요?", a: "네, 이스탄불, 앙카라, 카파도키아 등 주요 관광지에서 안정적인 4G를 이용할 수 있습니다. 동부 산악 지역에서는 일부 3G가 될 수 있지만 주요 관광 루트에서는 문제없습니다." },
      { q: "카파도키아 열기구 투어 중에 eSIM을 사용할 수 있나요?", a: "네, 카파도키아 상공에서도 데이터 통신이 가능합니다. 열기구에서의 절경 사진과 동영상을 실시간으로 SNS에 올릴 수 있습니다." },
      { q: "튀르키예에서 SNS가 규제된다고 들었는데요?", a: "튀르키예에서는 일부 SNS 접속이 제한될 수 있지만, AutoWiFi eSIM의 로밍 접속에서는 보통 이러한 제한 없이 정상적으로 이용할 수 있습니다." },
      { q: "이스탄불에서 카파도키아로 이동 중 eSIM을 사용할 수 있나요?", a: "국내선 비행의 경우 이스탄불 공항과 카이세리/네브셰히르 공항에서 안정적인 통신을 이용할 수 있습니다. 버스 이동의 경우 간선도로에서는 대체로 커버리지가 있지만 일부 구간에서 불안정할 수 있습니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 튀르키예 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "튀르키예 eSIM",
  },
  zh: {
    title: "土耳其eSIM指南 - 伊斯坦布尔·卡帕多西亚畅享网络",
    subtitle: "在东西方文明交汇之地，用稳定的移动通信畅游土耳其",
    intro: "土耳其横跨欧亚两大洲，从伊斯坦布尔的历史清真寺和集市到卡帕多西亚的奇幻岩石地貌和热气球之旅，带来独一无二的旅行体验。土耳其主要城市的通信基础设施完善，使用eSIM可以在伊斯坦布尔机场落地后立即使用Google Maps和打车应用。",
    sections: [
      {
        title: "土耳其通信环境与主要运营商",
        body: "土耳其通信市场由Turkcell、Vodafone Turkey和Turk Telekom三大运营商主导。其中Turkcell覆盖范围最广，在伊斯坦布尔、安卡拉、伊兹密尔等主要城市可以使用稳定的4G通信。5G部署虽有规划，但截至2026年仍较有限。\n\n土耳其东西跨度约1600公里，主要城市间的干线公路和旅游景点覆盖总体良好。但东部山区和黑海沿岸部分地区可能降为3G。卡帕多西亚虽位于内陆，但旅游中心格雷梅和乌奇希萨尔有4G覆盖。"
      },
      {
        title: "伊斯坦布尔通信活用",
        body: "伊斯坦布尔是土耳其最大城市，横跨欧洲和亚洲两岸。圣索菲亚大教堂、蓝色清真寺、托普卡帕宫、大巴扎、香料市场等景点集中在欧洲侧老城区，均有稳定的4G覆盖。伊斯坦布尔的地铁和有轨电车内覆盖也良好。\n\n伊斯坦布尔交通卡的余额查询和充值用手机应用很方便，需要数据连接。伊斯坦布尔很多餐厅没有英文菜单，Google翻译非常实用。博斯普鲁斯海峡游船全程几乎都有数据连接。"
      },
      {
        title: "卡帕多西亚及其他景点",
        body: "卡帕多西亚是位于土耳其中部的世界遗产，以奇特的岩石地貌和洞穴教堂闻名。清晨的热气球之旅尤其受欢迎——要实时分享空中绝景到社交媒体，稳定的数据连接必不可少。格雷梅镇中心和乌奇希萨尔城堡周围有4G覆盖。\n\n棉花堡的石灰华梯田、以弗所古城遗址、安塔利亚地中海度假海岸等也是热门景点，均有4G覆盖。土耳其国内机场在候机时也能使用稳定的通信。\n\n土耳其偶尔会限制部分社交媒体和网站的访问，但使用海外eSIM漫游连接通常不受这些限制影响。"
      },
      {
        title: "土耳其eSIM套餐选择",
        body: "土耳其旅行通常为5-10天，伊斯坦布尔加卡帕多西亚是经典路线。每天500MB至1GB的数据量对大多数人足够，如果要上传卡帕多西亚热气球视频则建议选择流量更充裕的套餐。\n\nAutoWiFi eSIM土耳其套餐接入Turkcell网络，在主要城市和景点提供稳定通信。伊斯坦布尔短期旅行选3-5天套餐，加上卡帕多西亚或安塔利亚则推荐7-10天套餐。如果还要去希腊跳岛，可以考虑土耳其-希腊组合套餐。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在土耳其稳定吗？", a: "在伊斯坦布尔、安卡拉、卡帕多西亚等主要景点，4G覆盖稳定。东部山区可能降为3G，但主要旅游路线没有问题。" },
      { q: "卡帕多西亚热气球上能用eSIM吗？", a: "可以，在卡帕多西亚上空也有数据连接。你可以在热气球上实时分享绝美航拍照片和视频到社交媒体。" },
      { q: "听说土耳其限制社交媒体，eSIM会受影响吗？", a: "土耳其确实偶尔限制某些社交媒体平台，但AutoWiFi eSIM的漫游连接通常不受这些本地限制影响，可以正常访问。" },
      { q: "从伊斯坦布尔到卡帕多西亚途中能用eSIM吗？", a: "乘坐国内航班的话，伊斯坦布尔机场和开塞利/内夫谢希尔机场都有稳定通信。长途巴士的话，干线公路上大体有覆盖，但部分路段可能不稳定。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游土耳其。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "土耳其eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/turkey-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="turkey-esim" content={CONTENT[loc]} />;
}
