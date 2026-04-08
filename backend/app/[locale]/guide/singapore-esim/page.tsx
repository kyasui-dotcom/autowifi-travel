import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド" },
      { slug: "hong-kong-esim", title: "香港eSIMガイド" },
      { slug: "dubai-esim", title: "ドバイeSIMガイド" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "esim-for-layovers", title: "Best eSIM for Layovers 2026" },
      { slug: "airport-connectivity-guide", title: "Airport WiFi and Connectivity Guide Worldwide" },
      { slug: "hong-kong-esim", title: "Hong Kong eSIM Guide 2026" },
      { slug: "dubai-esim", title: "Dubai & UAE eSIM Guide 2026" },
      { slug: "esim-for-business-travel", title: "eSIM for Business Travelers: Productivity and Expense Management" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "airport-connectivity-guide", title: "공항 WiFi·통신 가이드" },
      { slug: "hong-kong-esim", title: "홍콩 eSIM 가이드" },
      { slug: "dubai-esim", title: "두바이 eSIM 가이드" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "airport-connectivity-guide", title: "机场WiFi与通信指南" },
      { slug: "hong-kong-esim", title: "香港eSIM指南" },
      { slug: "dubai-esim", title: "迪拜eSIM指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "シンガポールeSIMガイド - 高速4G/5Gで快適な都市観光",
    subtitle: "コンパクトな都市国家を最高速のモバイル通信で楽しもう",
    intro: "シンガポールは世界トップクラスの通信インフラを持つ都市国家です。国土が小さいため、ほぼ全域で高速な4G/5G通信が利用可能。eSIMを使えば、チャンギ空港に到着した瞬間からGrab配車やGoogle Mapsでの移動が快適になります。マリーナベイ・サンズ、ガーデンズ・バイ・ザ・ベイ、セントーサ島など人気スポットでもストレスなくSNS投稿が楽しめます。",
    sections: [
      {
        title: "シンガポールの通信環境",
        body: "シンガポールの通信インフラは東南アジアで最も発達しており、Singtel、StarHub、M1の3大キャリアが全国をカバーしています。5Gネットワークの展開も進んでおり、ダウンロード速度は平均100Mbps以上を記録する地域も多くあります。\n\n都市国家であるシンガポールは国土面積が東京23区とほぼ同じサイズのため、通信エリアのカバレッジに心配はありません。MRT（地下鉄）の駅構内やトンネル内でも安定した通信が可能です。ショッピングモールや観光地にはフリーWiFiもありますが、セキュリティの面からeSIMでの常時接続がおすすめです。"
      },
      {
        title: "eSIMのメリット：チャンギ空港到着後すぐ使える",
        body: "シンガポールのチャンギ空港は世界最高の空港として知られていますが、到着後の移動にはモバイル通信が欠かせません。eSIMなら出発前にセットアップを済ませておけば、着陸と同時にデータ通信が開始されます。入国審査の待ち時間にもメッセージの確認やGrabの手配が可能です。\n\nシンガポールでは現金よりもキャッシュレス決済が主流で、ホーカーセンター（屋台街）でもPayNowやGrabPayが使えます。安定したモバイル通信があれば、決済もスムーズです。また、MRTの乗り換え案内やバスの到着時刻確認など、公共交通機関の利用にもデータ通信は必須です。"
      },
      {
        title: "観光スポットでの活用シーン",
        body: "マリーナベイ・サンズの展望デッキからの夜景撮影、ガーデンズ・バイ・ザ・ベイのスーパーツリー・グローブでのライトショー動画撮影など、シンガポールではSNS映えするスポットが盛りだくさんです。高速通信があれば、その場で高画質の写真や動画をアップロードできます。\n\nセントーサ島のユニバーサル・スタジオ・シンガポールやS.E.A.アクアリウムでは、チケットのモバイル提示が一般的です。チャイナタウン、リトルインディア、カンポン・グラムなど多文化エリアの散策でも、翻訳アプリやレストラン検索が即座に使えると便利です。"
      },
      {
        title: "おすすめのeSIMプランと選び方",
        body: "シンガポールは滞在期間が短い旅行者が多いため、3日〜7日間のプランが人気です。コンパクトな国なので1日あたりのデータ使用量が多くなりがちですが、観光中の写真・動画アップロードを考慮すると、1日1GB以上のプランがおすすめです。\n\nAutoWiFi eSIMでは、シンガポール専用プランのほか、マレーシアやインドネシアとのセットプラン（東南アジア周遊プラン）も提供しています。ジョホールバルやバタム島への日帰り旅行を予定している場合は、複数国対応プランを検討するとよいでしょう。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "シンガポールでeSIMは問題なく使えますか？", a: "はい、シンガポールは世界トップクラスの通信環境を持つ国で、eSIMは全域で快適に使用できます。4G/5Gカバレッジが国土全体に行き渡っており、地下鉄構内でも安定した接続が可能です。" },
      { q: "シンガポールでの滞在に何GBのプランが必要ですか？", a: "一般的な観光であれば、3〜5日間で3〜5GB程度で十分です。SNSへの写真・動画投稿を頻繁にする場合は、無制限プランまたは1日1GB以上のプランがおすすめです。" },
      { q: "マレーシアのジョホールバルにも行く場合、別のeSIMが必要ですか？", a: "シンガポール専用プランではマレーシアでは使えません。AutoWiFi eSIMの東南アジア周遊プランなら、シンガポールとマレーシアの両方で利用可能です。" },
      { q: "シンガポールでGrabを使うにはeSIMが必要ですか？", a: "Grabの利用にはデータ通信が必要です。eSIMがあれば到着後すぐにGrabで配車手配ができ、空港からホテルまでスムーズに移動できます。フリーWiFiでも利用可能ですが、移動中は接続が途切れるため、eSIMでの常時接続が便利です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでシンガポール旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "シンガポールeSIM",
  },
  en: {
    title: "Best eSIM for Singapore Travel 2026 - Changi Arrivals and Stopovers",
    subtitle: "Plan airport MRT transfers, Grab rides, hotel WiFi backup, and overnight stopovers with one Singapore eSIM",
    intro: "Singapore's compact layout and excellent transport system make it one of the easiest places to travel with an eSIM. The biggest advantage shows up right after landing: you can leave Changi Airport with working data for MRT directions, Grab rides, hotel messages, and stopover logistics before you ever reach hotel WiFi. From Marina Bay to Sentosa and cross-border day trips, staying online makes Singapore travel smoother from the first hour onward.",
    sections: [
      {
        title: "Singapore's Telecommunications Landscape",
        body: "Singapore has the most advanced telecom infrastructure in Southeast Asia, with three major carriers — Singtel, StarHub, and M1 — providing comprehensive nationwide coverage. The country's 5G rollout is well underway, with average download speeds exceeding 100Mbps in many areas.\n\nAs a city-state roughly the size of central Tokyo, Singapore has no coverage gaps to worry about. You'll enjoy stable connectivity even inside MRT subway stations and tunnels. While free WiFi is available at shopping malls and tourist spots, an eSIM provides more secure and reliable always-on connectivity."
      },
      {
        title: "eSIM Advantage: Connected from Changi Airport",
        body: "Changi Airport is consistently rated one of the world's best airports, and having mobile data upon arrival makes your transition seamless. With an eSIM set up before departure, your data connection activates automatically upon landing. You can check messages and arrange Grab rides even while waiting at immigration.\n\nSingapore is largely a cashless society — even hawker centers (street food courts) accept PayNow and GrabPay. Reliable mobile connectivity ensures smooth payments everywhere. Data access is also essential for navigating the MRT system, checking bus arrival times, and using real-time transit apps."
      },
      {
        title: "Staying Connected at Tourist Attractions",
        body: "From snapping photos at the Marina Bay Sands observation deck to filming the Supertree Grove light show at Gardens by the Bay, Singapore is full of social media-worthy moments. High-speed data lets you upload high-quality photos and videos instantly.\n\nAt Sentosa Island's Universal Studios Singapore and S.E.A. Aquarium, mobile tickets are the norm. When exploring multicultural neighborhoods like Chinatown, Little India, and Kampong Glam, having instant access to translation apps and restaurant reviews enhances the experience considerably."
      },
      {
        title: "Choosing the Right eSIM Plan",
        body: "Most visitors to Singapore stay for 3-7 days, making short-term plans the most popular choice. Given the compact size of the country, you'll likely use more data than expected for photo and video uploads — plans offering 1GB or more per day are recommended.\n\nAutoWiFi eSIM offers Singapore-specific plans as well as Southeast Asia multi-country bundles covering Malaysia and Indonesia. If you're planning day trips to Johor Bahru or Batam Island, consider a multi-country plan for seamless cross-border connectivity."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does eSIM work well in Singapore?", a: "Yes, Singapore has world-class telecom infrastructure. eSIM works flawlessly across the entire country with excellent 4G/5G coverage, including inside MRT stations and tunnels." },
      { q: "How much data do I need for Singapore?", a: "For typical tourism over 3-5 days, 3-5GB should suffice. If you plan to post photos and videos frequently on social media, consider an unlimited plan or one offering 1GB+ per day." },
      { q: "Do I need a separate eSIM for visiting Johor Bahru, Malaysia?", a: "A Singapore-only plan won't work in Malaysia. AutoWiFi's Southeast Asia roaming plan covers both Singapore and Malaysia, making it ideal for cross-border day trips." },
      { q: "Do I need an eSIM to use Grab in Singapore?", a: "Grab requires a data connection. With an eSIM, you can arrange rides immediately upon arrival at the airport. While Grab works on free WiFi, an always-on eSIM connection is far more reliable during transit." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Singapore with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Singapore eSIM",
  },
  ko: {
    title: "싱가포르 eSIM 가이드 - 초고속 4G/5G로 편리한 도시 여행",
    subtitle: "세계 최고 수준의 통신 인프라를 가진 도시국가에서 완벽한 연결",
    intro: "싱가포르는 세계 최고 수준의 통신 인프라를 갖춘 도시국가입니다. 전 국토에서 고속 4G/5G 통신이 가능하며, eSIM을 이용하면 창이 공항에 도착하는 순간부터 Grab 호출, Google Maps 내비게이션을 바로 사용할 수 있습니다. 마리나 베이 샌즈, 가든스 바이 더 베이, 센토사 섬 등 인기 관광지에서도 끊김 없이 SNS를 즐길 수 있습니다.",
    sections: [
      {
        title: "싱가포르 통신 환경",
        body: "싱가포르의 통신 인프라는 동남아시아에서 가장 발달해 있으며, Singtel, StarHub, M1의 3대 통신사가 전국을 커버하고 있습니다. 5G 네트워크 구축도 빠르게 진행되어 많은 지역에서 평균 다운로드 속도 100Mbps 이상을 기록합니다.\n\n서울 면적의 약 1.2배에 불과한 작은 국토 덕분에 통신 커버리지에 대한 걱정이 없습니다. MRT(지하철) 역사 내부와 터널에서도 안정적인 통신이 가능합니다. 쇼핑몰이나 관광지에 무료 WiFi가 있지만, 보안 측면에서 eSIM을 이용한 상시 연결이 권장됩니다."
      },
      {
        title: "eSIM의 장점: 창이 공항 도착 즉시 사용",
        body: "창이 공항은 세계 최고의 공항으로 유명하지만, 도착 후 이동에는 모바일 통신이 필수입니다. eSIM을 출발 전에 설정해 두면, 착륙과 동시에 데이터 통신이 시작됩니다. 입국 심사 대기 중에도 메시지 확인이나 Grab 예약이 가능합니다.\n\n싱가포르에서는 현금보다 캐시리스 결제가 주류이며, 호커 센터(길거리 음식 시장)에서도 PayNow나 GrabPay를 사용할 수 있습니다. 안정적인 모바일 통신이 있으면 결제도 원활합니다. MRT 환승 안내나 버스 도착 시간 확인 등 대중교통 이용에도 데이터 통신은 필수입니다."
      },
      {
        title: "관광 명소에서의 활용",
        body: "마리나 베이 샌즈 전망대에서의 야경 촬영, 가든스 바이 더 베이의 슈퍼트리 그로브 라이트쇼 동영상 촬영 등 싱가포르는 SNS에 올리고 싶은 장소가 가득합니다. 고속 데이터가 있으면 고화질 사진과 동영상을 즉시 업로드할 수 있습니다.\n\n센토사 섬의 유니버설 스튜디오 싱가포르나 S.E.A. 아쿠아리움에서는 모바일 티켓 제시가 일반적입니다. 차이나타운, 리틀 인디아, 캄퐁 글람 등 다문화 지역 탐방 시에도 번역 앱이나 레스토랑 검색을 즉시 사용할 수 있어 편리합니다."
      },
      {
        title: "추천 eSIM 플랜 및 선택 방법",
        body: "싱가포르는 단기 체류 여행자가 많아 3일~7일 플랜이 인기입니다. 작은 국토이지만 관광 중 사진·동영상 업로드를 고려하면 하루 1GB 이상의 플랜을 추천합니다.\n\nAutoWiFi eSIM에서는 싱가포르 전용 플랜 외에도 말레이시아, 인도네시아와의 세트 플랜(동남아 복수국 플랜)도 제공합니다. 조호르바루나 바탐섬 당일치기 여행을 계획하고 있다면, 복수국 대응 플랜을 검토해 보세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "싱가포르에서 eSIM이 잘 작동하나요?", a: "네, 싱가포르는 세계 최고 수준의 통신 환경을 보유한 국가로, eSIM이 전 지역에서 쾌적하게 작동합니다. 4G/5G 커버리지가 전국에 걸쳐 있으며 지하철 내에서도 안정적으로 연결됩니다." },
      { q: "싱가포르 여행에 몇 GB 플랜이 필요한가요?", a: "일반적인 관광이라면 3~5일간 3~5GB 정도면 충분합니다. SNS에 사진·동영상을 자주 올린다면 무제한 플랜 또는 하루 1GB 이상의 플랜을 추천합니다." },
      { q: "말레이시아 조호르바루도 방문할 경우 별도 eSIM이 필요한가요?", a: "싱가포르 전용 플랜은 말레이시아에서 사용할 수 없습니다. AutoWiFi eSIM의 동남아 로밍 플랜을 이용하면 싱가포르와 말레이시아 모두에서 사용 가능합니다." },
      { q: "싱가포르에서 Grab 사용 시 eSIM이 필요한가요?", a: "Grab 이용에는 데이터 통신이 필요합니다. eSIM이 있으면 도착 즉시 Grab으로 차량을 호출할 수 있어 공항에서 호텔까지 원활하게 이동할 수 있습니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 싱가포르 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "싱가포르 eSIM",
  },
  zh: {
    title: "新加坡eSIM指南 - 高速4G/5G畅游紧凑都市",
    subtitle: "在世界顶级通信基础设施的城市国家享受无缝连接",
    intro: "新加坡拥有世界顶级的通信基础设施。作为紧凑的城市国家，几乎全境覆盖高速4G/5G网络。使用eSIM，从樟宜机场落地的那一刻起就可以使用Grab叫车和Google Maps导航。在滨海湾金沙、滨海湾花园、圣淘沙岛等热门景点也能畅快地分享社交媒体。",
    sections: [
      {
        title: "新加坡通信环境",
        body: "新加坡的通信基础设施是东南亚最发达的，Singtel、StarHub、M1三大运营商覆盖全国。5G网络部署持续推进，许多地区的平均下载速度超过100Mbps。\n\n新加坡国土面积与上海浦东新区相当，因此完全不用担心信号覆盖问题。在MRT（地铁）站内和隧道中也能保持稳定的连接。虽然购物中心和旅游景点提供免费WiFi，但从安全角度考虑，建议使用eSIM保持常时连接。"
      },
      {
        title: "eSIM优势：樟宜机场落地即用",
        body: "樟宜机场被誉为全球最佳机场之一，但到达后的出行离不开移动通信。如果出发前完成eSIM设置，落地后数据连接将自动激活。在排队等候入境检查时也能查收消息、预约Grab。\n\n新加坡是一个高度无现金社会——即使是小贩中心（街头美食广场）也接受PayNow和GrabPay支付。稳定的移动连接确保支付顺畅。此外，MRT换乘查询和巴士到达时间查看等公共交通出行也离不开数据连接。"
      },
      {
        title: "热门景点使用场景",
        body: "在滨海湾金沙观景台拍摄夜景、在滨海湾花园超级树灯光秀录制视频——新加坡到处都是社交媒体打卡胜地。高速数据连接让你即时上传高清照片和视频。\n\n在圣淘沙岛的新加坡环球影城和S.E.A.海洋馆，电子门票已成为主流。漫步牛车水、小印度、甘榜格南等多元文化街区时，能即时使用翻译应用和餐厅搜索功能会非常方便。"
      },
      {
        title: "推荐eSIM套餐及选择建议",
        body: "新加坡短期停留的游客较多，因此3天至7天的套餐最受欢迎。虽然国土面积小，但考虑到观光中的照片和视频上传需求，建议选择每日1GB以上的套餐。\n\nAutoWiFi eSIM除提供新加坡专属套餐外，还有覆盖马来西亚和印度尼西亚的东南亚多国套餐。如果计划前往新山或巴淡岛一日游，建议考虑多国套餐以实现跨境无缝连接。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在新加坡好用吗？", a: "非常好用。新加坡拥有世界顶级的通信环境，eSIM在全国范围内都能流畅使用。4G/5G覆盖全境，即使在地铁内也能保持稳定连接。" },
      { q: "新加坡旅行需要多少流量？", a: "一般观光3-5天大约需要3-5GB。如果经常在社交媒体上传照片和视频，建议选择无限流量套餐或每日1GB以上的套餐。" },
      { q: "如果还要去马来西亚新山，需要另买eSIM吗？", a: "新加坡专属套餐不能在马来西亚使用。AutoWiFi eSIM的东南亚漫游套餐可同时覆盖新加坡和马来西亚，适合跨境一日游。" },
      { q: "在新加坡用Grab需要eSIM吗？", a: "使用Grab需要数据连接。有了eSIM，到达后就能立即用Grab叫车，从机场到酒店畅通无阻。虽然免费WiFi也可以用Grab，但移动中连接不稳定，eSIM的常时连接更加方便。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游新加坡。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "新加坡eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/singapore-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const rel = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="singapore-esim" content={CONTENT[loc]} relatedArticles={rel.articles} relatedTitle={rel.title} />;
}
