import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "フィリピンeSIMガイド - マニラ・セブ・ボラカイの島嶼カバレッジ",
    subtitle: "7,000以上の島々を持つフィリピンで賢くつながろう",
    intro: "フィリピンは7,000以上の島々からなる群島国家で、セブ島のリゾート、ボラカイのホワイトビーチ、マニラの活気ある都市文化など多彩な魅力があります。島嶼国家のため通信カバレッジには地域差がありますが、主要な観光地ではeSIMで快適にインターネット接続が可能です。到着前にeSIMを設定しておけば、ニノイ・アキノ国際空港やマクタン・セブ国際空港からすぐにGrabを利用できます。",
    sections: [
      {
        title: "フィリピンの通信環境",
        body: "フィリピンの通信市場はGlobe TelecomとSmart Communications（PLDT傘下）の2大キャリアが中心です。マニラ首都圏やセブ市内では4G LTEが広く利用可能で、都市部では実用的な通信速度が出ています。ただし、フィリピンの平均通信速度は東南アジアの中では遅めの部類に入ります。\n\n島嶼部のカバレッジは島によって大きく異なります。セブ島やボラカイ島などの主要リゾートでは4G接続が可能ですが、パラワン島のエルニドやコロンなど離島リゾートでは3G接続が中心で、速度が遅くなることがあります。ただし、観光インフラが整った場所ではカフェやホテルのWiFiも併用できます。"
      },
      {
        title: "マニラでの通信活用",
        body: "マニラはフィリピンの首都で、イントラムロス（旧市街）、リサール公園、SMモール・オブ・アジアなどの観光スポットがあります。マニラの交通渋滞は世界でも最悪レベルで、Grabの利用は移動に不可欠です。eSIMがあれば到着後すぐにGrabを使えるため、空港からの移動がスムーズになります。\n\nマニラではGCash（フィリピンのモバイル決済アプリ）が急速に普及しており、データ通信があるとキャッシュレス決済が便利です。また、マニラの治安が心配な方も多いですが、リアルタイムの地図アプリがあれば安全なルートを選んで移動できます。"
      },
      {
        title: "セブ・ボラカイでの通信事情",
        body: "セブ島はフィリピンで最も人気のリゾートで、セブ市内やマクタン島のリゾートエリアでは安定した4G通信が利用可能です。オスロブのジンベエザメツアーやモアルボアルのダイビングポイント周辺でもカバレッジは概ね良好です。\n\nボラカイ島は世界有数の美しいビーチとして知られ、島内の主要エリアでは4G通信が利用可能です。ただし、ボラカイは小さな島のため、混雑時に速度が低下することがあります。リゾートホテルのWiFiと併用するのが快適です。\n\nパラワン島のエルニドやコロンは絶景で知られていますが、通信インフラは限定的です。エルニドの町中では3G接続が可能ですが、アイランドホッピング中は通信が途切れることがほとんどです。"
      },
      {
        title: "eSIMプラン選びのポイント",
        body: "フィリピン旅行では通信速度がやや遅めのため、大容量のストリーミングよりもSNS投稿や地図アプリの利用を想定してプランを選ぶのがおすすめです。一般的な観光であれば1日500MB〜1GBで十分です。セブやボラカイでの写真・動画アップロードを考慮すると、余裕のあるプランが安心です。\n\nAutoWiFi eSIMのフィリピンプランは、GlobeまたはSmartの回線に接続するため、主要な島々で利用可能です。マニラだけの短期旅行なら3〜5日プラン、セブやボラカイも周る場合は7〜14日プランがおすすめです。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "フィリピンのeSIMの通信速度は速いですか？", a: "マニラやセブの都市部では実用的な4G速度が出ますが、東南アジアの中では平均的〜やや遅めです。SNSや地図アプリの利用には十分ですが、高画質動画のストリーミングは場所によっては難しい場合があります。" },
      { q: "ボラカイ島でeSIMは使えますか？", a: "はい、ボラカイ島の主要エリアでは4G通信が利用可能です。ただし、混雑時には速度が低下することがあります。" },
      { q: "エルニド（パラワン島）での通信事情はどうですか？", a: "エルニドの町中では3G接続が可能ですが、通信速度は遅めです。アイランドホッピング中は通信が途切れることが多いため、オフラインマップの準備をおすすめします。" },
      { q: "フィリピンでGrabは使えますか？", a: "はい、マニラやセブなどの主要都市でGrabが広く利用されています。eSIMでデータ通信があれば到着後すぐに利用可能です。フィリピンの交通事情を考えるとGrabは非常に便利です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでフィリピン旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "フィリピンeSIM",
  },
  en: {
    title: "Philippines eSIM Guide - Manila, Cebu, Boracay & Island Coverage",
    subtitle: "Stay connected across 7,000+ islands with the right eSIM plan",
    intro: "The Philippines is an archipelago of over 7,000 islands, offering diverse attractions from Cebu's resorts and Boracay's white sand beaches to Manila's vibrant urban culture. As an island nation, coverage varies by location, but major tourist destinations support comfortable eSIM connectivity. Setting up your eSIM before departure lets you use Grab immediately upon landing at Ninoy Aquino International Airport or Mactan-Cebu International Airport.",
    sections: [
      {
        title: "Philippines Telecommunications Overview",
        body: "The Philippine telecom market is dominated by two carriers: Globe Telecom and Smart Communications (under PLDT). 4G LTE is widely available in Metro Manila and Cebu city, providing practical speeds for everyday use. However, the Philippines' average internet speed ranks lower among Southeast Asian nations.\n\nIsland coverage varies significantly. Major resort islands like Cebu and Boracay have 4G access, but remote island resorts like El Nido and Coron in Palawan primarily rely on 3G with slower speeds. That said, tourist-oriented locations typically offer cafe and hotel WiFi as supplementary connectivity."
      },
      {
        title: "Staying Connected in Manila",
        body: "Manila, the capital, features attractions like Intramuros (the old walled city), Rizal Park, and SM Mall of Asia. Manila's traffic congestion ranks among the world's worst, making Grab essential for getting around. An eSIM lets you use Grab immediately upon arrival for smooth airport transfers.\n\nGCash, the Philippines' leading mobile payment app, is rapidly gaining adoption. Data connectivity makes cashless transactions convenient. For travelers concerned about safety in Manila, real-time map apps help you choose secure routes for getting around the city."
      },
      {
        title: "Connectivity in Cebu, Boracay & Beyond",
        body: "Cebu is the Philippines' most popular resort destination. Cebu City and the resort areas on Mactan Island have stable 4G coverage. Whale shark tours in Oslob and diving spots around Moalboal generally have good connectivity too.\n\nBoracay is renowned for its stunning white sand beaches, with 4G available in main areas. However, as a small island, speeds may slow during peak tourist seasons. Combining your eSIM with resort WiFi provides the best experience.\n\nEl Nido and Coron in Palawan are famous for breathtaking scenery, but telecom infrastructure is limited. El Nido town has 3G coverage, but connectivity drops during island-hopping tours."
      },
      {
        title: "Choosing the Right eSIM Plan",
        body: "Given the Philippines' moderate connection speeds, plan for social media and map usage rather than heavy streaming. For typical tourism, 500MB to 1GB per day is sufficient. For photo and video uploads from Cebu or Boracay, choose a plan with extra headroom.\n\nAutoWiFi eSIM Philippines plans connect through Globe or Smart networks, providing coverage across major islands. For a short Manila-only trip, 3-5 day plans work well. For itineraries including Cebu or Boracay, 7-14 day plans are recommended."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Are eSIM speeds fast in the Philippines?", a: "Urban areas like Manila and Cebu provide practical 4G speeds, though the Philippines averages lower than some Southeast Asian countries. Speeds are sufficient for social media and maps, but HD video streaming may be challenging in some areas." },
      { q: "Does eSIM work on Boracay Island?", a: "Yes, 4G is available in Boracay's main areas. Speeds may decrease during peak tourist times due to the island's small size and high visitor volume." },
      { q: "What's the connectivity like in El Nido, Palawan?", a: "El Nido town has 3G coverage with slower speeds. Connectivity typically drops during island-hopping tours. We recommend downloading offline maps before heading out." },
      { q: "Can I use Grab in the Philippines with eSIM?", a: "Yes, Grab is widely used in Manila, Cebu, and other major cities. eSIM data lets you use it right from arrival, which is especially helpful given the Philippines' challenging traffic conditions." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to the Philippines with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Philippines eSIM",
  },
  ko: {
    title: "필리핀 eSIM 가이드 - 마닐라·세부·보라카이 섬 커버리지",
    subtitle: "7,000개 이상의 섬으로 이루어진 필리핀에서 스마트하게 연결하세요",
    intro: "필리핀은 7,000개 이상의 섬으로 이루어진 군도 국가로, 세부의 리조트, 보라카이의 화이트 비치, 마닐라의 활기찬 도시 문화 등 다채로운 매력이 있습니다. 섬나라 특성상 통신 커버리지에 지역 차이가 있지만, 주요 관광지에서는 eSIM으로 쾌적하게 인터넷을 이용할 수 있습니다.",
    sections: [
      {
        title: "필리핀 통신 환경",
        body: "필리핀 통신 시장은 Globe Telecom과 Smart Communications(PLDT 산하)의 2대 통신사가 주도합니다. 메트로 마닐라와 세부 시내에서는 4G LTE가 널리 이용 가능하며, 도시 지역에서는 실용적인 통신 속도를 제공합니다. 다만 필리핀의 평균 통신 속도는 동남아시아 중 다소 느린 편입니다.\n\n섬별 커버리지 차이가 큽니다. 세부나 보라카이 같은 주요 리조트 섬에서는 4G를 이용할 수 있지만, 팔라완의 엘니도나 코론 같은 이도 리조트에서는 3G가 중심이며 속도가 느려질 수 있습니다. 다만 관광 인프라가 잘 된 곳에서는 카페나 호텔 WiFi를 병용할 수 있습니다."
      },
      {
        title: "마닐라에서의 통신 활용",
        body: "마닐라는 필리핀의 수도로 인트라무로스(구시가지), 리잘 공원, SM 몰 오브 아시아 등의 관광 명소가 있습니다. 마닐라의 교통 체증은 세계 최악 수준이며 Grab 이용은 이동에 필수적입니다. eSIM이 있으면 도착 후 바로 Grab을 사용할 수 있어 공항 이동이 원활합니다.\n\n마닐라에서는 GCash(필리핀 모바일 결제 앱)가 빠르게 보급되고 있어 데이터 통신이 있으면 무현금 결제가 편리합니다. 마닐라 치안이 걱정되는 분도 실시간 지도 앱으로 안전한 경로를 선택하여 이동할 수 있습니다."
      },
      {
        title: "세부·보라카이 통신 사정",
        body: "세부는 필리핀에서 가장 인기 있는 리조트 지역으로, 세부 시내와 막탄 섬 리조트 지역에서 안정적인 4G를 이용할 수 있습니다. 오슬롭 고래상어 투어나 모알보알 다이빙 포인트 주변에서도 커버리지가 대체로 양호합니다.\n\n보라카이는 세계적으로 유명한 화이트 비치로 알려져 있으며, 섬 내 주요 지역에서 4G를 이용할 수 있습니다. 다만 작은 섬이라 혼잡 시 속도가 느려질 수 있습니다.\n\n팔라완의 엘니도와 코론은 절경으로 유명하지만 통신 인프라는 제한적입니다. 엘니도 마을에서는 3G 연결이 가능하지만, 아일랜드 호핑 중에는 통신이 대부분 끊깁니다."
      },
      {
        title: "eSIM 플랜 선택 포인트",
        body: "필리핀 여행에서는 통신 속도가 다소 느리므로 대용량 스트리밍보다는 SNS와 지도 앱 이용을 기준으로 플랜을 선택하는 것이 좋습니다. 일반적인 관광이라면 하루 500MB~1GB면 충분합니다.\n\nAutoWiFi eSIM 필리핀 플랜은 Globe 또는 Smart 회선에 연결되어 주요 섬에서 이용 가능합니다. 마닐라만 단기 여행이라면 3~5일 플랜, 세부나 보라카이도 방문한다면 7~14일 플랜을 추천합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "필리핀 eSIM 통신 속도는 빠른가요?", a: "마닐라나 세부 도시 지역에서는 실용적인 4G 속도를 제공하지만, 동남아시아 평균보다 다소 느린 편입니다. SNS와 지도 앱 사용에는 충분하지만, 일부 지역에서 고화질 동영상 스트리밍은 어려울 수 있습니다." },
      { q: "보라카이에서 eSIM을 사용할 수 있나요?", a: "네, 보라카이 주요 지역에서 4G를 이용할 수 있습니다. 다만 관광 성수기에는 속도가 느려질 수 있습니다." },
      { q: "엘니도(팔라완)의 통신 사정은 어떤가요?", a: "엘니도 마을에서는 3G 연결이 가능하지만 속도는 느립니다. 아일랜드 호핑 중에는 통신이 끊기는 경우가 많으므로 오프라인 지도 준비를 권장합니다." },
      { q: "필리핀에서 Grab을 사용할 수 있나요?", a: "네, 마닐라, 세부 등 주요 도시에서 Grab이 널리 이용됩니다. eSIM 데이터가 있으면 도착 후 바로 사용할 수 있어 필리핀의 교통 사정을 고려하면 매우 편리합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 필리핀 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "필리핀 eSIM",
  },
  zh: {
    title: "菲律宾eSIM指南 - 马尼拉·宿雾·长滩岛覆盖详解",
    subtitle: "在7000多个岛屿的菲律宾智慧出行",
    intro: "菲律宾由7000多个岛屿组成，拥有宿雾的度假胜地、长滩岛的白沙滩、马尼拉的都市文化等多元魅力。作为岛国，通信覆盖因地区而异，但主要旅游景点可以通过eSIM舒适地上网。提前设置好eSIM，在尼诺·阿基诺国际机场或麦克坦-宿雾国际机场落地后就能立即使用Grab。",
    sections: [
      {
        title: "菲律宾通信环境",
        body: "菲律宾通信市场由Globe Telecom和Smart Communications（PLDT旗下）两大运营商主导。大马尼拉地区和宿雾市内4G LTE广泛可用，城市地区提供实用的通信速度。但菲律宾的平均网速在东南亚中偏低。\n\n各岛屿的覆盖差异较大。宿雾和长滩岛等主要度假岛屿可以使用4G，但巴拉望的爱妮岛和科隆等偏远度假地主要依靠3G，速度较慢。不过，旅游设施完善的地方通常有咖啡馆和酒店WiFi可以辅助使用。"
      },
      {
        title: "马尼拉通信活用",
        body: "马尼拉是菲律宾首都，有王城区（Intramuros）、黎刹公园、SM亚洲购物中心等景点。马尼拉的交通拥堵在全球排名靠前，Grab是出行必备工具。有eSIM就能到达后立即使用Grab，让机场到市区的出行更加顺畅。\n\n马尼拉的GCash（菲律宾移动支付应用）正在快速普及，有数据连接可以方便地进行无现金支付。对马尼拉治安有所顾虑的游客，实时地图应用可以帮助选择安全的出行路线。"
      },
      {
        title: "宿雾·长滩岛通信情况",
        body: "宿雾是菲律宾最热门的度假地，宿雾市内和麦克坦岛度假区4G信号稳定。奥斯洛布鲸鲨游和莫阿尔博阿尔潜水点周边覆盖也大体良好。\n\n长滩岛以世界级白沙滩闻名，岛上主要区域4G可用。但由于岛屿面积小，旺季时网速可能下降。建议配合度假酒店WiFi一起使用效果更佳。\n\n巴拉望的爱妮岛和科隆以绝美风景著称，但通信基础设施有限。爱妮岛镇上可以使用3G，但跳岛游期间基本没有信号。"
      },
      {
        title: "eSIM套餐选择要点",
        body: "鉴于菲律宾网速相对较慢，建议以社交媒体和地图应用使用为主来选择套餐，而非大流量视频流媒体。一般观光每天500MB至1GB足够。如果要在宿雾或长滩岛上传照片和视频，选择流量更充裕的套餐更安心。\n\nAutoWiFi eSIM菲律宾套餐接入Globe或Smart网络，覆盖主要岛屿。马尼拉短期旅行选3-5天套餐，加上宿雾或长滩岛则推荐7-14天套餐。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "菲律宾eSIM网速快吗？", a: "马尼拉和宿雾城区提供实用的4G速度，但在东南亚中偏低。社交媒体和地图应用使用没问题，部分地区可能难以流畅观看高清视频。" },
      { q: "长滩岛能用eSIM吗？", a: "可以，长滩岛主要区域4G可用。旅游旺季时由于岛小人多，网速可能下降。" },
      { q: "爱妮岛（巴拉望）的通信情况如何？", a: "爱妮岛镇上有3G覆盖但速度较慢。跳岛游期间通信经常中断，建议提前下载离线地图。" },
      { q: "在菲律宾能用Grab吗？", a: "可以，Grab在马尼拉、宿雾等主要城市广泛使用。有eSIM数据连接就能到达后立即使用，考虑到菲律宾的交通状况，Grab非常实用。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游菲律宾。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "菲律宾eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/philippines-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="philippines-esim" content={CONTENT[loc]} />;
}
