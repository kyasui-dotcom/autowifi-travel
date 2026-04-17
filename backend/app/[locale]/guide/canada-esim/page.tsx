import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "カナダeSIMガイド - 広大な国土での都市vs地方カバレッジ",
    subtitle: "トロント、バンクーバーから大自然まで、カナダの通信事情を徹底解説",
    intro: "カナダは世界で2番目に広い国土を持つ国で、トロントやバンクーバーなどの大都市から、ロッキー山脈、ナイアガラの滝、プリンスエドワード島などの大自然まで見どころが満載です。都市部では高速な4G/5G通信が利用できますが、広大な国土のため郊外や大自然エリアではカバレッジに制限があります。eSIMを事前に設定しておけば、空港到着後すぐにUberやGoogle Mapsで移動を開始できます。",
    sections: [
      {
        title: "カナダの通信環境と主要キャリア",
        body: "カナダの通信市場はBell、Rogers、Telusの3大キャリアが支配しています。これらのキャリアは主要都市と幹線道路沿いに優れた4G LTEカバレッジを提供しており、5Gの展開もトロント、バンクーバー、モントリオールなどの大都市で進んでいます。\n\nカナダの通信料金は世界的に見ても高い水準にあり、現地でSIMカードを購入すると割高になりがちです。eSIMなら事前にリーズナブルなプランを選んで準備できるため、コスト面でも有利です。ただし、カナダは国土の大部分が人口希薄な地域のため、都市部を離れるとカバレッジが急速に低下することに注意が必要です。"
      },
      {
        title: "主要都市の通信ガイド",
        body: "トロントはカナダ最大の都市で、CNタワー、ロイヤルオンタリオ博物館、ディスティラリー地区などの観光スポットでは安定した4G/5G通信が利用できます。地下鉄（TTC）の駅構内でもカバレッジが確保されています。ナイアガラの滝エリアもトロントから日帰りで行ける人気スポットで、滝の周辺では4G通信が利用可能です。\n\nバンクーバーは美しい港町で、スタンレーパーク、グランビルアイランド、キャピラノ吊り橋などが人気です。バンクーバー市内および近郊では安定した通信が利用できます。ウィスラー（スキーリゾート）への道中やリゾート内でもカバレッジは良好です。\n\nモントリオールはフランス語圏の文化都市で、旧市街やモン・ロワイヤル公園など見どころが多く、市内では優れた通信環境が整っています。"
      },
      {
        title: "大自然エリアの通信事情",
        body: "カナディアンロッキー（バンフ国立公園、ジャスパー国立公園）はカナダで最も人気の大自然観光地ですが、通信カバレッジには制限があります。バンフの町中やルイーズ湖の主要エリアでは4G接続が可能ですが、ハイキングトレイルや山中ではほとんど通信が届きません。アイスフィールド・パークウェイ（バンフ〜ジャスパー間の景勝ドライブ）では通信が不安定な区間が多くあります。\n\nプリンスエドワード島やノバスコシア州の大西洋岸地域は、主要な町では4G通信が利用可能ですが、海岸沿いのドライブでは通信が途切れる場所があります。大自然エリアを訪れる際は、オフラインマップのダウンロードと、重要な情報の事前確認を強くおすすめします。"
      },
      {
        title: "カナダ向けeSIMプラン選び",
        body: "カナダの通信料金は高いため、現地SIMカードよりもeSIMの方がコスパに優れています。都市部中心の旅行なら1日1GBプランで十分ですが、ロッキー山脈や地方都市も周る場合は、都市部でのデータ利用を考慮して余裕のあるプランを選びましょう。\n\nAutoWiFi eSIMのカナダプランは、Bell、Rogers、Telusのいずれかの回線に接続し、主要都市と幹線道路沿いで安定した通信を提供します。トロントやバンクーバーだけの短期旅行なら5〜7日プラン、カナダ横断旅行なら14日以上のプランがおすすめです。アメリカとの国境が近いため、カナダ・アメリカセットプランも検討する価値があります。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "カナダでeSIMは快適に使えますか？", a: "トロント、バンクーバー、モントリオールなどの主要都市では非常に安定した4G/5G通信が利用可能です。ただし、ロッキー山脈などの大自然エリアではカバレッジに制限があります。" },
      { q: "バンフ国立公園でeSIMは使えますか？", a: "バンフの町中やルイーズ湖の主要エリアでは4G通信が利用可能です。ただし、ハイキングトレイルや山中では通信が届かないことが多いため、オフラインマップの準備をおすすめします。" },
      { q: "ナイアガラの滝でeSIMは使えますか？", a: "はい、ナイアガラの滝とその周辺エリアでは安定した4G通信が利用可能です。写真やビデオのアップロードも問題なく行えます。" },
      { q: "カナダからアメリカに行く場合、eSIMはどうなりますか？", a: "カナダ単国プランではアメリカでは使用できません。ナイアガラの滝からアメリカ側に渡る場合や、シアトルへの旅行を計画している場合は、カナダ・アメリカセットプランをご検討ください。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでカナダ旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "カナダeSIM",
  },
  en: {
    title: "Canada eSIM Guide - Urban vs Rural Coverage Across a Vast Nation",
    subtitle: "From Toronto and Vancouver to the Rocky Mountains — connectivity across Canada",
    intro: "Canada is the world's second-largest country by area, offering attractions ranging from major cities like Toronto and Vancouver to the Rocky Mountains, Niagara Falls, and Prince Edward Island. Urban areas enjoy high-speed 4G/5G connectivity, but coverage limitations exist across the vast wilderness. Setting up an eSIM before departure lets you use Uber and Google Maps immediately upon arrival.",
    sections: [
      {
        title: "Canada's Telecom Environment and Major Carriers",
        body: "Canada's telecom market is dominated by three major carriers: Bell, Rogers, and Telus. These carriers provide excellent 4G LTE coverage along major cities and highway corridors, with 5G deployment underway in Toronto, Vancouver, Montreal, and other metropolitan areas.\n\nCanada has some of the highest wireless costs globally, making local SIM cards expensive. An eSIM lets you secure a more affordable plan in advance, offering better value. However, since most of Canada's landmass is sparsely populated, coverage drops rapidly once you leave urban areas."
      },
      {
        title: "City-by-City Connectivity Guide",
        body: "Toronto, Canada's largest city, has excellent 4G/5G coverage at tourist spots like the CN Tower, Royal Ontario Museum, and Distillery District. The TTC subway system also has coverage inside stations. Niagara Falls, a popular day trip from Toronto, has reliable 4G in the area surrounding the falls.\n\nVancouver, a stunning port city, features attractions like Stanley Park, Granville Island, and the Capilano Suspension Bridge. The city and its suburbs have stable connectivity. The drive to Whistler ski resort and the resort itself both have good coverage.\n\nMontreal, a cultural gem in French-speaking Quebec, offers great connectivity throughout its Old Town and Mont-Royal Park areas."
      },
      {
        title: "Connectivity in Nature and Wilderness Areas",
        body: "The Canadian Rockies (Banff and Jasper National Parks) are Canada's most iconic natural attractions, but connectivity has limitations. Banff townsite and the main Lake Louise area have 4G coverage, but hiking trails and backcountry areas mostly lack cell service. The Icefields Parkway between Banff and Jasper has many stretches with unreliable connectivity.\n\nPrince Edward Island and Atlantic Canada's Nova Scotia coast have 4G in main towns, but coastal drives may have coverage gaps. When visiting wilderness areas, downloading offline maps and verifying important information in advance is strongly recommended."
      },
      {
        title: "Choosing a Canada eSIM Plan",
        body: "Given Canada's high wireless costs, eSIMs offer better value than local SIM cards. For city-focused trips, 1GB per day is sufficient. For itineraries including the Rockies or smaller towns, choose generous plans to maximize data use in urban areas.\n\nAutoWiFi eSIM Canada plans connect through Bell, Rogers, or Telus networks, providing stable coverage in major cities and along highway corridors. For short Toronto or Vancouver trips, 5-7 day plans work well. For cross-Canada journeys, consider 14+ day plans. Given the proximity to the US border, Canada-US combination plans are worth considering."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does eSIM work well in Canada?", a: "Yes, major cities like Toronto, Vancouver, and Montreal have excellent 4G/5G coverage. However, wilderness areas like the Rocky Mountains have limited coverage." },
      { q: "Can I use eSIM in Banff National Park?", a: "Banff townsite and the main Lake Louise area have 4G coverage. However, hiking trails and backcountry areas mostly lack cell service. We recommend downloading offline maps." },
      { q: "Does eSIM work at Niagara Falls?", a: "Yes, stable 4G coverage is available at Niagara Falls and the surrounding area. Uploading photos and videos is no problem." },
      { q: "What about eSIM when crossing to the US?", a: "A Canada-only plan won't work in the US. If you're crossing to the American side of Niagara Falls or planning to visit Seattle, consider a Canada-US combination plan." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Canada with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Canada eSIM",
  },
  ko: {
    title: "캐나다 eSIM 가이드 - 광활한 국토의 도시 vs 지방 커버리지",
    subtitle: "토론토, 밴쿠버에서 대자연까지, 캐나다 통신 사정 완전 해설",
    intro: "캐나다는 세계에서 두 번째로 넓은 국토를 가진 나라로, 토론토와 밴쿠버 같은 대도시부터 로키산맥, 나이아가라 폭포, 프린스에드워드 아일랜드 같은 대자연까지 볼거리가 가득합니다. 도시 지역에서는 고속 4G/5G 통신을 이용할 수 있지만, 광활한 국토로 인해 교외나 대자연 지역에서는 커버리지에 제한이 있습니다.",
    sections: [
      {
        title: "캐나다 통신 환경과 주요 통신사",
        body: "캐나다 통신 시장은 Bell, Rogers, Telus의 3대 통신사가 주도합니다. 이 통신사들은 주요 도시와 간선도로를 따라 우수한 4G LTE 커버리지를 제공하며, 5G도 토론토, 밴쿠버, 몬트리올 등 대도시에서 확대 중입니다.\n\n캐나다의 통신 요금은 세계적으로도 높은 수준이며, 현지에서 SIM 카드를 구매하면 비싸게 됩니다. eSIM이라면 사전에 합리적인 플랜을 선택하여 준비할 수 있어 비용 면에서도 유리합니다. 다만 캐나다는 국토 대부분이 인구 희소 지역이므로 도시를 벗어나면 커버리지가 급격히 떨어진다는 점에 주의가 필요합니다."
      },
      {
        title: "주요 도시 통신 가이드",
        body: "토론토는 캐나다 최대 도시로, CN 타워, 로열 온타리오 박물관, 디스틸러리 디스트릭트 등 관광 명소에서 안정적인 4G/5G를 이용할 수 있습니다. 지하철(TTC) 역사 내에서도 커버리지가 확보됩니다. 나이아가라 폭포도 토론토에서 당일치기로 갈 수 있는 인기 명소로, 폭포 주변에서 4G 통신이 가능합니다.\n\n밴쿠버는 아름다운 항구 도시로, 스탠리 파크, 그랜빌 아일랜드, 캐필라노 서스펜션 브릿지 등이 인기입니다. 밴쿠버 시내와 근교에서 안정적인 통신을 이용할 수 있습니다.\n\n몬트리올은 프랑스어권 문화 도시로, 구시가지나 몽 루아얄 공원 등 볼거리가 많으며 시내에서 우수한 통신 환경이 갖춰져 있습니다."
      },
      {
        title: "대자연 지역 통신 사정",
        body: "캐나디안 로키(밴프 국립공원, 재스퍼 국립공원)는 캐나다에서 가장 인기 있는 대자연 관광지이지만 통신 커버리지에 제한이 있습니다. 밴프 타운과 루이스 호수 주요 지역에서는 4G 연결이 가능하지만, 하이킹 트레일이나 산중에서는 거의 통신이 되지 않습니다.\n\n프린스에드워드 아일랜드나 노바스코샤 대서양 연안 지역은 주요 마을에서 4G를 이용할 수 있지만, 해안 드라이브 중 통신이 끊기는 곳이 있습니다. 대자연 지역을 방문할 때는 오프라인 지도 다운로드와 중요 정보의 사전 확인을 강력히 권장합니다."
      },
      {
        title: "캐나다 eSIM 플랜 선택",
        body: "캐나다 통신 요금이 비싸므로 현지 SIM 카드보다 eSIM이 가성비가 좋습니다. 도시 중심 여행이라면 하루 1GB 플랜으로 충분하지만, 로키산맥이나 지방 도시도 방문한다면 여유 있는 플랜을 선택하세요.\n\nAutoWiFi eSIM 캐나다 플랜은 Bell, Rogers, Telus 중 하나의 회선에 연결되어 주요 도시와 간선도로에서 안정적인 통신을 제공합니다. 토론토나 밴쿠버만 단기 여행이라면 5~7일 플랜, 캐나다 횡단 여행이라면 14일 이상의 플랜을 추천합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "캐나다에서 eSIM이 잘 작동하나요?", a: "토론토, 밴쿠버, 몬트리올 등 주요 도시에서는 매우 안정적인 4G/5G를 이용할 수 있습니다. 다만 로키산맥 같은 대자연 지역에서는 커버리지에 제한이 있습니다." },
      { q: "밴프 국립공원에서 eSIM을 사용할 수 있나요?", a: "밴프 타운과 루이스 호수 주요 지역에서는 4G를 이용할 수 있습니다. 다만 하이킹 트레일이나 산중에서는 통신이 거의 되지 않으므로 오프라인 지도 준비를 권장합니다." },
      { q: "나이아가라 폭포에서 eSIM을 사용할 수 있나요?", a: "네, 나이아가라 폭포와 주변 지역에서 안정적인 4G 통신을 이용할 수 있습니다. 사진과 동영상 업로드도 문제없습니다." },
      { q: "캐나다에서 미국으로 갈 때 eSIM은 어떻게 되나요?", a: "캐나다 단독 플랜은 미국에서 사용할 수 없습니다. 나이아가라 폭포 미국 측이나 시애틀 방문을 계획 중이라면 캐나다·미국 세트 플랜을 검토해 보세요." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 캐나다 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "캐나다 eSIM",
  },
  zh: {
    title: "加拿大eSIM指南 - 广袤国土的城市与乡村覆盖对比",
    subtitle: "从多伦多、温哥华到壮美大自然，加拿大通信全攻略",
    intro: "加拿大是世界第二大国，从多伦多和温哥华等大城市到落基山脉、尼亚加拉大瀑布、爱德华王子岛等大自然景观，旅游资源极其丰富。城市地区可享受高速4G/5G通信，但由于国土面积广阔，郊区和自然区域的覆盖有所限制。提前设置好eSIM，到达机场后就能立即使用Uber和Google Maps开始出行。",
    sections: [
      {
        title: "加拿大通信环境与主要运营商",
        body: "加拿大通信市场由Bell、Rogers和Telus三大运营商主导。这些运营商在主要城市和高速公路沿线提供优质的4G LTE覆盖，5G也在多伦多、温哥华、蒙特利尔等大都市推进部署。\n\n加拿大的无线通信资费在全球属于较高水平，在当地购买SIM卡往往价格不菲。eSIM可以提前选择合理的套餐，在费用方面更有优势。但需要注意的是，加拿大大部分国土人口稀少，离开城市后覆盖会迅速下降。"
      },
      {
        title: "主要城市通信指南",
        body: "多伦多是加拿大最大城市，在CN塔、皇家安大略博物馆、酿酒厂区等景点可以使用稳定的4G/5G通信。地铁（TTC）站内也有覆盖。尼亚加拉大瀑布是从多伦多出发的热门一日游目的地，瀑布周围4G信号稳定。\n\n温哥华是美丽的港口城市，斯坦利公园、格兰维尔岛、卡皮拉诺吊桥等景点广受欢迎。温哥华市区及近郊通信稳定。前往惠斯勒滑雪度假村的路上和度假村内覆盖也良好。\n\n蒙特利尔是法语区文化名城，老城区和皇家山公园等景点众多，市内通信环境优良。"
      },
      {
        title: "大自然区域通信情况",
        body: "加拿大落基山脉（班夫国家公园、贾斯珀国家公园）是加拿大最具代表性的自然景点，但通信覆盖有限。班夫镇和路易斯湖主要区域有4G信号，但徒步小径和偏远山区基本没有手机信号。班夫至贾斯珀之间的冰原大道有很多通信不稳定的路段。\n\n爱德华王子岛和新斯科舍省大西洋沿岸地区的主要城镇有4G覆盖，但沿海公路自驾时可能有信号盲区。前往大自然区域时，强烈建议下载离线地图并提前查好重要信息。"
      },
      {
        title: "加拿大eSIM套餐选择",
        body: "鉴于加拿大通信费用较高，eSIM比当地SIM卡更具性价比。以城市为主的旅行，每天1GB就够了。如果还要去落基山脉或小城镇，建议选择流量更充裕的套餐。\n\nAutoWiFi eSIM加拿大套餐接入Bell、Rogers或Telus网络，在主要城市和高速公路沿线提供稳定通信。多伦多或温哥华短期旅行选5-7天套餐，横穿加拿大则推荐14天以上的套餐。由于靠近美国边境，加拿大-美国组合套餐也值得考虑。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在加拿大好用吗？", a: "多伦多、温哥华、蒙特利尔等主要城市4G/5G覆盖优良。但落基山脉等大自然区域覆盖有限。" },
      { q: "班夫国家公园能用eSIM吗？", a: "班夫镇和路易斯湖主要区域有4G覆盖。但徒步小径和山区基本没有信号，建议下载离线地图。" },
      { q: "尼亚加拉大瀑布能用eSIM吗？", a: "可以，尼亚加拉大瀑布及周边地区4G信号稳定，上传照片和视频没有问题。" },
      { q: "从加拿大去美国时eSIM怎么办？", a: "加拿大专属套餐在美国不能使用。如果要去尼亚加拉瀑布美国一侧或计划访问西雅图，请考虑加拿大-美国组合套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游加拿大。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "加拿大eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/canada-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="canada-esim" content={CONTENT[loc]} />;
}
