import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "台湾eSIMガイド - 台北・九份・高雄を快適にネット接続",
    subtitle: "夜市グルメから絶景スポットまで、eSIMで台湾旅行を満喫",
    intro: "台湾は日本から近く、手軽に行ける海外旅行先として大人気です。台北の故宮博物院や夜市、九份の幻想的な街並み、高雄の港町の魅力を存分に楽しむには、安定したモバイル通信が欠かせません。台湾の通信インフラは非常に整備されており、eSIMを使えば桃園空港や松山空港に到着した瞬間から快適にインターネットを利用できます。",
    sections: [
      {
        title: "台湾の通信環境と主要キャリア",
        body: "台湾の通信市場は中華電信（Chunghwa Telecom）、台湾大哥大（Taiwan Mobile）、遠傳電信（Far EasTone）の3大キャリアが中心で、いずれも全国的に安定した4Gネットワークを提供しています。5Gの展開も台北を中心に進んでおり、都市部では非常に高速な通信が可能です。\n\n台北市内はもちろん、台中、台南、高雄などの主要都市でもカバレッジは良好です。九份や阿里山など山間部の観光地でも基本的に4G接続が可能ですが、一部の山奥では電波が弱くなることがあります。台湾高速鉄道（HSR）の車内でも安定した通信が期待できます。"
      },
      {
        title: "台湾旅行でeSIMが便利な理由",
        body: "台湾では悠遊カード（EasyCard）やLINE Payなどのモバイル決済が普及しており、安定したデータ通信があるとスムーズに利用できます。また、台湾の公共交通機関（MRT、バス、台湾鉄道）の乗り換え検索にはGoogle MapsやTaipei Metro等のアプリが便利で、これらもデータ通信が必要です。\n\n夜市での食べ歩きでは、Google翻訳やメニュー検索が活躍します。士林夜市や饒河街夜市の屋台で注文する際に、写真付きのレビューを確認できると安心です。九份では狭い路地が多く、地図アプリなしでは迷いやすいため、常時接続が重要です。"
      },
      {
        title: "主要観光エリアの通信事情",
        body: "台北エリアでは故宮博物院、台北101、中正紀念堂、西門町、永康街など主要スポットのすべてで安定した4G/5G通信が利用可能です。台北MRT（地下鉄）の構内でもデータ通信に問題はありません。\n\n九份は山の中に位置していますが、観光エリアでは概ね良好な通信状態を維持しています。高雄の駁二芸術特区や旗津島、蓮池潭なども問題なく接続できます。花蓮の太魯閣渓谷は一部の深い渓谷内で通信が途切れることがありますが、主要な展望ポイントではカバーされています。\n\n台湾は無料WiFiスポットiTaiwanが各所に設置されていますが、登録が必要で速度も限定的なため、観光にはeSIMの方が圧倒的に便利です。"
      },
      {
        title: "おすすめプランと利用のコツ",
        body: "台湾旅行は3〜5日間が一般的で、データ容量は1日あたり500MB〜1GBで十分な方が多いです。夜市の食レポやSNS投稿を積極的にする方は、無制限プランを選ぶとストレスなく楽しめます。\n\nAutoWiFi eSIMの台湾プランは、中華電信や台湾大哥大の回線に接続するため、全国で安定した通信品質を提供します。到着前にQRコードをスキャンしてプロファイルをインストールし、台湾に着いたらデータローミングをオンにするだけで即座に利用開始できます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "台湾のeSIMは九份でも使えますか？", a: "はい、九份の観光エリアでは4G通信が利用可能です。山の中ですが、主要な通りや展望台付近では安定した接続が期待できます。" },
      { q: "台湾旅行に何日分のeSIMが必要ですか？", a: "一般的な台北中心の旅行なら3〜5日プランがおすすめです。台中・台南・高雄まで足を延ばす場合は7日プランが安心です。" },
      { q: "台湾でLINEは使えますか？", a: "はい、台湾ではLINEが最も人気のメッセージアプリです。eSIMでデータ通信があれば、日本と同じようにLINEで連絡を取ることができます。" },
      { q: "台湾高速鉄道（新幹線）の中でもeSIMは使えますか？", a: "はい、台湾高速鉄道の車内でも概ね安定した4G通信が利用可能です。一部のトンネル区間で一時的に接続が途切れることがありますが、すぐに復旧します。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMで台湾旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "台湾eSIM",
  },
  en: {
    title: "Taiwan eSIM Guide - Stay Connected in Taipei, Jiufen & Kaohsiung",
    subtitle: "From night market street food to breathtaking mountain scenery, explore Taiwan with reliable data",
    intro: "Taiwan is a captivating destination combining modern cities with stunning natural landscapes. Whether you're exploring Taipei's National Palace Museum and night markets, wandering the atmospheric streets of Jiufen, or enjoying Kaohsiung's harbor charm, reliable mobile connectivity enhances every experience. Taiwan's telecom infrastructure is well-developed, and an eSIM gets you connected instantly upon arrival at Taoyuan or Songshan Airport.",
    sections: [
      {
        title: "Taiwan's Telecom Environment and Major Carriers",
        body: "Taiwan's telecom market is led by three major carriers: Chunghwa Telecom, Taiwan Mobile, and Far EasTone, all providing stable 4G networks nationwide. 5G deployment is progressing rapidly, particularly in Taipei, offering ultra-fast connectivity in urban areas.\n\nCoverage is excellent across major cities including Taipei, Taichung, Tainan, and Kaohsiung. Mountain tourist destinations like Jiufen and Alishan generally have 4G coverage, though signals may weaken in remote mountain areas. The Taiwan High Speed Rail (HSR) also offers stable connectivity during your journey."
      },
      {
        title: "Why eSIM is Perfect for Taiwan Travel",
        body: "Mobile payments like EasyCard and LINE Pay are widely used in Taiwan, making reliable data connectivity essential for smooth transactions. Transit apps like Google Maps and Taipei Metro are invaluable for navigating Taiwan's excellent public transportation system of MRT, buses, and railway lines.\n\nNight market food tours become much easier with Google Translate and restaurant review apps. At Shilin Night Market or Raohe Street Night Market, checking photo reviews before ordering from stalls gives you confidence in your choices. In Jiufen's narrow alleyways, a map app is practically essential to avoid getting lost."
      },
      {
        title: "Connectivity at Major Tourist Areas",
        body: "In the Taipei area, you'll enjoy stable 4G/5G connectivity at all major attractions including the National Palace Museum, Taipei 101, Chiang Kai-shek Memorial Hall, Ximending, and Yongkang Street. The Taipei MRT system also provides reliable data access underground.\n\nJiufen, despite its mountain location, maintains good coverage throughout the main tourist area. Kaohsiung's Pier-2 Art Center, Cijin Island, and Lotus Pond are all well-connected. At Taroko Gorge near Hualien, some deep canyon sections may experience signal drops, but major viewpoints are covered.\n\nTaiwan offers free WiFi hotspots through the iTaiwan network, but registration is required and speeds are limited. For tourists, an eSIM provides a far superior experience."
      },
      {
        title: "Recommended Plans and Tips",
        body: "Most Taiwan trips last 3-5 days, and 500MB to 1GB per day is sufficient for typical usage. If you plan to actively post night market food photos and videos on social media, an unlimited plan eliminates data worries.\n\nAutoWiFi eSIM Taiwan plans connect through Chunghwa Telecom or Taiwan Mobile networks, ensuring stable quality nationwide. Simply scan the QR code and install the profile before departure, then enable data roaming when you land in Taiwan to start using it immediately."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does eSIM work in Jiufen?", a: "Yes, 4G coverage is available throughout Jiufen's main tourist area. While it's located in the mountains, you'll have stable connectivity along the main streets and viewpoints." },
      { q: "How many days of eSIM coverage do I need for Taiwan?", a: "For a typical Taipei-focused trip, a 3-5 day plan is recommended. If you're also visiting Taichung, Tainan, or Kaohsiung, opt for a 7-day plan." },
      { q: "Can I use LINE in Taiwan with eSIM?", a: "Yes, LINE is the most popular messaging app in Taiwan. With eSIM data, you can use LINE exactly as you would at home for messaging, calls, and sharing." },
      { q: "Does eSIM work on the Taiwan High Speed Rail?", a: "Yes, generally stable 4G connectivity is available on HSR trains. Brief interruptions may occur in some tunnel sections, but service recovers quickly." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Taiwan with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Taiwan eSIM",
  },
  ko: {
    title: "대만 eSIM 가이드 - 타이베이·지우펀·가오슝 완벽 연결",
    subtitle: "야시장 먹방부터 절경까지, eSIM으로 대만 여행을 만끽하세요",
    intro: "대만은 가까운 해외 여행지로 큰 인기를 누리고 있습니다. 타이베이의 고궁박물원과 야시장, 지우펀의 환상적인 거리, 가오슝의 항구 도시 매력을 충분히 즐기려면 안정적인 모바일 통신이 필수입니다. 대만의 통신 인프라는 매우 잘 정비되어 있어 eSIM을 이용하면 타오위안 공항이나 쑹산 공항 도착 즉시 인터넷을 쾌적하게 사용할 수 있습니다.",
    sections: [
      {
        title: "대만 통신 환경과 주요 통신사",
        body: "대만 통신 시장은 중화전신(Chunghwa Telecom), 대만모바일(Taiwan Mobile), 원전전신(Far EasTone)의 3대 통신사가 주도하며, 모두 전국적으로 안정적인 4G 네트워크를 제공합니다. 5G도 타이베이를 중심으로 빠르게 확대되고 있어 도시 지역에서는 초고속 통신이 가능합니다.\n\n타이베이는 물론 타이중, 타이난, 가오슝 등 주요 도시에서도 커버리지가 양호합니다. 지우펀이나 아리산 같은 산간 관광지에서도 기본적으로 4G 연결이 가능하지만, 깊은 산속에서는 신호가 약해질 수 있습니다. 대만 고속철도(HSR) 차내에서도 안정적인 통신을 기대할 수 있습니다."
      },
      {
        title: "대만 여행에서 eSIM이 편리한 이유",
        body: "대만에서는 이지카드(EasyCard)와 LINE Pay 등 모바일 결제가 보편화되어 있어 안정적인 데이터 통신이 있으면 원활하게 이용할 수 있습니다. 또한 대만의 대중교통(MRT, 버스, 대만철도) 환승 검색에는 Google Maps나 Taipei Metro 앱이 편리하며, 이들 앱도 데이터 통신이 필요합니다.\n\n야시장 먹거리 탐방 시에는 Google 번역이나 메뉴 검색이 큰 도움이 됩니다. 스린 야시장이나 라오허 야시장의 노점에서 주문할 때 사진이 있는 리뷰를 확인할 수 있으면 안심입니다. 지우펀은 좁은 골목이 많아 지도 앱 없이는 길을 잃기 쉬우므로 상시 연결이 중요합니다."
      },
      {
        title: "주요 관광 지역 통신 사정",
        body: "타이베이 지역에서는 고궁박물원, 타이베이 101, 중정기념당, 시먼딩, 용캉제 등 모든 주요 명소에서 안정적인 4G/5G 통신을 이용할 수 있습니다. 타이베이 MRT 지하역에서도 데이터 통신에 문제가 없습니다.\n\n지우펀은 산중에 위치하지만, 관광 지역에서는 대체로 양호한 통신 상태를 유지합니다. 가오슝의 보얼예술특구, 치진섬, 연지담 등도 원활하게 연결됩니다. 화롄의 타로코 협곡은 깊은 협곡 일부에서 통신이 끊길 수 있지만, 주요 전망대에서는 커버됩니다.\n\n대만에는 무료 WiFi 'iTaiwan'이 곳곳에 설치되어 있지만, 등록이 필요하고 속도도 제한적이므로 관광에는 eSIM이 훨씬 편리합니다."
      },
      {
        title: "추천 플랜 및 이용 팁",
        body: "대만 여행은 보통 3~5일이며, 데이터 용량은 하루 500MB~1GB면 충분한 분이 많습니다. 야시장 먹방이나 SNS 포스팅을 적극적으로 하시는 분은 무제한 플랜을 선택하면 부담 없이 즐길 수 있습니다.\n\nAutoWiFi eSIM 대만 플랜은 중화전신이나 대만모바일 회선에 연결되어 전국에서 안정적인 통신 품질을 제공합니다. 출발 전에 QR 코드를 스캔하여 프로파일을 설치하고, 대만 도착 후 데이터 로밍을 켜기만 하면 즉시 사용할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "대만 eSIM은 지우펀에서도 사용 가능한가요?", a: "네, 지우펀 관광 지역에서는 4G 통신이 이용 가능합니다. 산중에 위치하지만 주요 거리와 전망대 부근에서는 안정적인 연결이 가능합니다." },
      { q: "대만 여행에 며칠분 eSIM이 필요한가요?", a: "일반적인 타이베이 중심 여행이라면 3~5일 플랜이 적당합니다. 타이중·타이난·가오슝까지 방문한다면 7일 플랜이 안심입니다." },
      { q: "대만에서 LINE 사용이 가능한가요?", a: "네, 대만에서 LINE은 가장 인기 있는 메신저 앱입니다. eSIM 데이터가 있으면 한국에서와 동일하게 LINE으로 연락할 수 있습니다." },
      { q: "대만 고속철도에서도 eSIM을 사용할 수 있나요?", a: "네, 고속철도 차내에서도 대체로 안정적인 4G 통신이 가능합니다. 일부 터널 구간에서 일시적으로 끊길 수 있지만 곧 복구됩니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 대만 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "대만 eSIM",
  },
  zh: {
    title: "台湾eSIM指南 - 台北·九份·高雄畅享网络",
    subtitle: "从夜市美食到壮丽景色，用eSIM畅游台湾",
    intro: "台湾是深受欢迎的旅游目的地，融合了现代都市与壮丽自然景观。无论是探访台北故宫博物院和夜市、漫步九份梦幻街道，还是体验高雄港都魅力，稳定的移动通信都不可或缺。台湾通信基础设施完善，使用eSIM可以在桃园机场或松山机场落地后立即上网。",
    sections: [
      {
        title: "台湾通信环境与主要运营商",
        body: "台湾通信市场由中华电信（Chunghwa Telecom）、台湾大哥大（Taiwan Mobile）、远传电信（Far EasTone）三大运营商主导，均在全国范围内提供稳定的4G网络。5G在台北等地快速部署，城市地区已可享受超高速通信。\n\n台北市区自不用说，台中、台南、高雄等主要城市的覆盖也十分良好。九份和阿里山等山区景点基本可以使用4G，但部分偏远山区信号可能较弱。台湾高铁（HSR）车厢内也能保持稳定的通信连接。"
      },
      {
        title: "eSIM让台湾旅行更便利",
        body: "台湾的悠游卡（EasyCard）和LINE Pay等移动支付已经普及，稳定的数据连接让支付更加顺畅。台湾公共交通（捷运、公交、台铁）的换乘查询用Google Maps或Taipei Metro等应用非常方便，这些都需要数据连接。\n\n逛夜市时，Google翻译和菜单搜索非常实用。在士林夜市或饶河街夜市的摊位点餐时，能查看带图片的评价会让你更有信心。九份小巷众多，没有地图应用很容易迷路，因此保持网络连接非常重要。"
      },
      {
        title: "主要景区通信情况",
        body: "台北地区的故宫博物院、台北101、中正纪念堂、西门町、永康街等所有主要景点均可享受稳定的4G/5G信号。台北捷运地下站内数据通信也没有问题。\n\n九份虽然位于山中，但旅游区域内通信状况总体良好。高雄的驳二艺术特区、旗津岛、莲池潭等也能顺畅连接。花莲太鲁阁峡谷部分深谷区域信号可能中断，但主要观景点均有覆盖。\n\n台湾各处设有免费WiFi热点iTaiwan，但需要注册且速度有限，对游客来说eSIM体验远优于此。"
      },
      {
        title: "推荐套餐与使用技巧",
        body: "台湾旅行通常为3-5天，每天500MB至1GB的数据量对大多数人来说已经足够。如果打算频繁在社交媒体分享夜市美食照片和视频，建议选择无限流量套餐。\n\nAutoWiFi eSIM台湾套餐接入中华电信或台湾大哥大的网络，确保全国范围内稳定的通信质量。出发前扫描QR码安装配置文件，到达台湾后开启数据漫游即可立即使用。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在九份能用吗？", a: "可以，九份旅游区域内4G信号可用。虽然位于山中，但在主要街道和观景台附近可以获得稳定连接。" },
      { q: "台湾旅行需要几天的eSIM？", a: "以台北为中心的一般旅行，3-5天套餐即可。如果还要去台中、台南、高雄，建议选择7天套餐。" },
      { q: "在台湾可以用LINE吗？", a: "可以，LINE是台湾最流行的即时通讯应用。有了eSIM数据连接，就可以像在国内一样使用LINE进行联络。" },
      { q: "台湾高铁上能用eSIM吗？", a: "可以，高铁车厢内通常可以使用稳定的4G通信。部分隧道区间可能短暂中断，但很快会恢复。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游台湾。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "台湾eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/taiwan-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="taiwan-esim" content={CONTENT[loc]} />;
}
