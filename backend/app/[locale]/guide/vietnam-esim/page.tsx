import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "ベトナムeSIMガイド - ハノイ・ホーチミン・ダナンをコスパ最強で接続",
    subtitle: "物価の安さだけじゃない、通信費もお得にベトナムを旅しよう",
    intro: "ベトナムは物価が安く、美しい自然と豊かな食文化で人気の旅行先です。ハノイの旧市街散策、ホーチミンのフレンチコロニアル建築巡り、ダナンのビーチリゾートなど見どころ満載。eSIMを使えば、現地SIMカードの購入に並ぶ手間なく、到着直後からGrab配車やGoogle Mapsナビゲーションが利用可能になります。ベトナムのeSIMプランは非常にリーズナブルで、コスパ重視の旅行者にぴったりです。",
    sections: [
      {
        title: "ベトナムの通信環境",
        body: "ベトナムの通信市場はViettel、Mobifone、Vinaphoneの3大キャリアが支配しており、特にViettelは国内最大のカバレッジを誇ります。4Gネットワークはハノイ、ホーチミン、ダナンなどの主要都市で広く利用可能で、都市部での通信速度は十分実用的です。\n\nベトナムは南北に長い国土を持ち、都市部と農村部で通信品質に差があります。ハロン湾やサパなどの観光地でも基本的にカバーされていますが、山岳地帯の一部では3G接続になることがあります。ホイアンやフエなどの中部観光地は良好な4Gカバレッジが確保されています。"
      },
      {
        title: "eSIMで解決するベトナム旅行の通信問題",
        body: "ベトナムの空港でSIMカードを購入する場合、カウンターの混雑やパスポート登録の手間が発生します。特にタンソンニャット国際空港（ホーチミン）やノイバイ国際空港（ハノイ）は到着客が多く、SIM購入に30分以上かかることもあります。eSIMなら事前設定で到着直後から利用開始できます。\n\nベトナムではGrab（配車アプリ）が移動の基本手段で、特にホーチミンやハノイでは交通渋滞が激しく、タクシーよりGrabが効率的です。eSIMがあれば空港出口でそのままGrabを呼べるので、ぼったくりタクシーの心配もありません。また、ベトナム語は声調言語で発音が難しいため、Google翻訳アプリは必須ツールです。"
      },
      {
        title: "主要都市別の通信ガイド",
        body: "ハノイでは旧市街（ホアンキエム湖周辺）、ホーチミン廟、文廟などの観光地で安定した4G通信が利用可能です。旧市街のカフェではWiFiも充実していますが、パスワードの確認が面倒なことも多いです。\n\nホーチミンでは1区（中心部）、ベンタン市場、戦争証跡博物館エリアで高速通信が利用できます。ホーチミンは急速に発展中の都市で、通信インフラの整備も進んでいます。\n\nダナンはビーチリゾートとして人気で、ミーケービーチやバーナーヒルズでもカバレッジは良好です。ダナンからホイアン（約30km）やフエ（約100km）への日帰り旅行でも、道中の通信はほぼ問題ありません。"
      },
      {
        title: "コスパ最強のeSIMプラン選び",
        body: "ベトナム向けeSIMプランは他のアジア諸国と比べて非常にリーズナブルです。7日間3GBのプランが数百円から利用でき、無制限プランでも非常にお手頃な価格設定となっています。ベトナムの物価の安さがeSIM料金にも反映されています。\n\nAutoWiFi eSIMでは、ベトナム単国プランに加えて、カンボジアやタイとのセットプラン（インドシナ周遊プラン）も提供しています。ベトナムからカンボジアのアンコールワットやタイのバンコクへ陸路で移動する場合にも便利です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ベトナムでeSIMは安定して使えますか？", a: "はい、ハノイ・ホーチミン・ダナンなどの主要都市では安定した4G通信が利用可能です。農村部や山岳地帯では3Gになることがありますが、主要な観光地ではほぼ問題ありません。" },
      { q: "ベトナムのeSIMプランはどれくらいの料金ですか？", a: "ベトナム向けeSIMプランは非常にリーズナブルで、7日間で数百円から利用可能です。コスパを重視する方にとって最も魅力的な旅行先の一つです。" },
      { q: "ハロン湾クルーズ中もeSIMは使えますか？", a: "ハロン湾の主要なクルーズルートでは概ね4G接続が可能です。ただし、湾の奥深くに入ると電波が弱くなることがあります。主要な展望ポイントではカバーされています。" },
      { q: "ベトナムでGrabを使うにはeSIMが必要ですか？", a: "はい、Grabの利用にはデータ通信が必要です。eSIMがあれば到着後すぐにGrabを使えるので、空港からの移動がスムーズになります。ベトナムではぼったくりタクシーの問題もあるため、Grab利用をおすすめします。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでベトナム旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ベトナムeSIM",
  },
  en: {
    title: "Vietnam eSIM Guide - Hanoi, Ho Chi Minh & Da Nang Coverage",
    subtitle: "Incredible value meets incredible destinations — stay connected for less",
    intro: "Vietnam offers travelers an unbeatable combination of affordable prices, stunning natural beauty, and rich culinary culture. From exploring Hanoi's Old Quarter to admiring Ho Chi Minh City's French colonial architecture and relaxing on Da Nang's beaches, there's no shortage of experiences. An eSIM eliminates the hassle of buying a local SIM card at the airport, letting you use Grab and Google Maps from the moment you arrive. Vietnam eSIM plans are exceptionally affordable, making them perfect for budget-conscious travelers.",
    sections: [
      {
        title: "Vietnam's Telecommunications Landscape",
        body: "Vietnam's telecom market is dominated by three major carriers: Viettel, Mobifone, and Vinaphone. Viettel boasts the largest coverage area in the country. 4G networks are widely available in major cities like Hanoi, Ho Chi Minh City, and Da Nang, delivering practical speeds for everyday use.\n\nVietnam stretches over 1,600km from north to south, and connectivity quality varies between urban and rural areas. Tourist destinations like Ha Long Bay and Sapa generally have coverage, though some mountainous areas may drop to 3G. Central Vietnam's popular tourist cities including Hoi An and Hue enjoy reliable 4G coverage."
      },
      {
        title: "How eSIM Solves Vietnam Travel Connectivity",
        body: "Buying a SIM card at Vietnamese airports can mean dealing with crowded counters and passport registration requirements. At Tan Son Nhat International Airport (Ho Chi Minh City) and Noi Bai International Airport (Hanoi), the process can take 30 minutes or more during peak arrivals. An eSIM lets you skip all this with pre-departure setup.\n\nGrab is the primary transportation app in Vietnam, especially crucial in Ho Chi Minh City and Hanoi where traffic congestion makes it more efficient than traditional taxis. With an eSIM, you can call a Grab ride right outside the airport terminal, avoiding overcharging by unofficial taxi drivers. Vietnamese is a tonal language that's challenging for most visitors, making Google Translate an essential tool that requires constant data access."
      },
      {
        title: "City-by-City Connectivity Guide",
        body: "In Hanoi, stable 4G is available at major tourist sites including the Old Quarter (around Hoan Kiem Lake), Ho Chi Minh Mausoleum, and the Temple of Literature. Many cafes in the Old Quarter offer WiFi, though getting passwords can be inconvenient.\n\nIn Ho Chi Minh City, District 1 (city center), Ben Thanh Market, and the War Remnants Museum area all enjoy high-speed connectivity. The city is developing rapidly, with telecom infrastructure keeping pace.\n\nDa Nang's popular beach areas including My Khe Beach and Ba Na Hills have good coverage. Day trips from Da Nang to Hoi An (about 30km) or Hue (about 100km) also maintain reliable connectivity along the route."
      },
      {
        title: "Best Value eSIM Plans",
        body: "Vietnam eSIM plans are among the most affordable in Asia. Plans starting from just a few dollars for 7 days with 3GB of data are available, and even unlimited plans remain highly budget-friendly. Vietnam's overall low cost of living is reflected in its eSIM pricing.\n\nAutoWiFi eSIM offers Vietnam-specific plans as well as multi-country bundles covering Cambodia and Thailand (Indochina roaming plans). These are convenient if you're crossing borders overland to visit Cambodia's Angkor Wat or Thailand's Bangkok."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Is eSIM reliable in Vietnam?", a: "Yes, major cities like Hanoi, Ho Chi Minh City, and Da Nang have stable 4G coverage. Rural and mountainous areas may fall back to 3G, but most tourist destinations have good connectivity." },
      { q: "How affordable are Vietnam eSIM plans?", a: "Vietnam eSIM plans are among the cheapest in Asia, starting from just a few dollars for a week of data. This makes Vietnam one of the most budget-friendly destinations for mobile connectivity." },
      { q: "Can I use eSIM during a Ha Long Bay cruise?", a: "Major Ha Long Bay cruise routes generally have 4G coverage. Signal may weaken in deeper parts of the bay, but the main viewing areas are covered." },
      { q: "Do I need eSIM to use Grab in Vietnam?", a: "Yes, Grab requires a data connection. Having eSIM means you can use Grab immediately upon arrival, ensuring smooth airport transfers. Given Vietnam's issue with unofficial taxi overcharging, Grab is strongly recommended." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Vietnam with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Vietnam eSIM",
  },
  ko: {
    title: "베트남 eSIM 가이드 - 하노이·호치민·다낭 가성비 최고 연결",
    subtitle: "저렴한 물가에 통신비까지 절약, eSIM으로 베트남 여행을 즐기세요",
    intro: "베트남은 저렴한 물가, 아름다운 자연, 풍부한 음식 문화로 인기 있는 여행지입니다. 하노이 구시가지 산책, 호치민의 프렌치 콜로니얼 건축 탐방, 다낭의 비치 리조트 등 볼거리가 가득합니다. eSIM을 이용하면 현지 SIM 카드를 구매하는 번거로움 없이 도착 직후부터 Grab 호출과 Google Maps 내비게이션을 사용할 수 있습니다. 베트남 eSIM 플랜은 매우 합리적인 가격으로, 가성비를 중시하는 여행자에게 딱입니다.",
    sections: [
      {
        title: "베트남 통신 환경",
        body: "베트남 통신 시장은 Viettel, Mobifone, Vinaphone의 3대 통신사가 주도하고 있으며, 특히 Viettel은 국내 최대 커버리지를 자랑합니다. 4G 네트워크는 하노이, 호치민, 다낭 등 주요 도시에서 널리 이용 가능하며, 도시 지역의 통신 속도는 충분히 실용적입니다.\n\n베트남은 남북으로 긴 국토를 가지고 있어 도시와 농촌 간 통신 품질 차이가 있습니다. 하롱베이나 사파 같은 관광지도 기본적으로 커버되지만, 일부 산악 지역에서는 3G 연결이 될 수 있습니다. 호이안이나 후에 등 중부 관광지는 양호한 4G 커버리지를 확보하고 있습니다."
      },
      {
        title: "eSIM으로 해결하는 베트남 여행 통신 문제",
        body: "베트남 공항에서 SIM 카드를 구매하면 카운터 혼잡과 여권 등록 절차가 있습니다. 특히 떤선녓 국제공항(호치민)이나 노이바이 국제공항(하노이)은 도착객이 많아 SIM 구매에 30분 이상 걸리기도 합니다. eSIM이라면 사전 설정으로 도착 즉시 사용할 수 있습니다.\n\n베트남에서 Grab은 이동의 기본 수단으로, 특히 호치민과 하노이는 교통 체증이 심해 택시보다 Grab이 효율적입니다. eSIM이 있으면 공항 출구에서 바로 Grab을 호출할 수 있어 바가지 택시 걱정이 없습니다. 또한 베트남어는 성조 언어로 발음이 어려워 Google 번역 앱은 필수 도구입니다."
      },
      {
        title: "주요 도시별 통신 가이드",
        body: "하노이에서는 구시가지(호안끼엠 호수 주변), 호치민 묘, 문묘 등 관광지에서 안정적인 4G 통신을 이용할 수 있습니다. 구시가지 카페에서는 WiFi도 잘 되어 있지만, 비밀번호 확인이 번거로운 경우가 많습니다.\n\n호치민에서는 1군(중심부), 벤탄 시장, 전쟁박물관 지역에서 고속 통신을 이용할 수 있습니다. 호치민은 빠르게 발전 중인 도시로, 통신 인프라 정비도 진행되고 있습니다.\n\n다낭은 비치 리조트로 인기가 높으며, 미케 비치나 바나힐에서도 커버리지가 양호합니다. 다낭에서 호이안(약 30km)이나 후에(약 100km)로의 당일치기 여행에서도 이동 중 통신은 거의 문제없습니다."
      },
      {
        title: "가성비 최고의 eSIM 플랜 선택",
        body: "베트남 eSIM 플랜은 다른 아시아 국가와 비교해 매우 저렴합니다. 7일간 3GB 플랜이 몇천 원부터 이용 가능하며, 무제한 플랜도 매우 합리적인 가격입니다. 베트남의 낮은 물가가 eSIM 요금에도 반영되어 있습니다.\n\nAutoWiFi eSIM에서는 베트남 단독 플랜 외에도 캄보디아나 태국과의 세트 플랜(인도차이나 로밍 플랜)도 제공합니다. 베트남에서 캄보디아 앙코르와트나 태국 방콕으로 육로 이동할 경우에도 편리합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "베트남에서 eSIM이 안정적으로 작동하나요?", a: "네, 하노이·호치민·다낭 등 주요 도시에서는 안정적인 4G 통신을 이용할 수 있습니다. 농촌이나 산악 지역에서는 3G가 될 수 있지만, 주요 관광지에서는 거의 문제없습니다." },
      { q: "베트남 eSIM 플랜 요금은 얼마인가요?", a: "베트남 eSIM 플랜은 아시아에서 가장 저렴한 편으로, 7일간 몇천 원부터 이용 가능합니다. 가성비를 중시하는 여행자에게 가장 매력적인 여행지 중 하나입니다." },
      { q: "하롱베이 크루즈 중에도 eSIM을 사용할 수 있나요?", a: "하롱베이의 주요 크루즈 루트에서는 대체로 4G 접속이 가능합니다. 다만 만 깊숙이 들어가면 신호가 약해질 수 있으며, 주요 전망 포인트에서는 커버됩니다." },
      { q: "베트남에서 Grab 사용 시 eSIM이 필요한가요?", a: "네, Grab 이용에는 데이터 통신이 필요합니다. eSIM이 있으면 도착 즉시 Grab을 사용할 수 있어 공항 이동이 원활합니다. 베트남에서는 비공식 택시의 바가지 문제가 있으므로 Grab 이용을 추천합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 베트남 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "베트남 eSIM",
  },
  zh: {
    title: "越南eSIM指南 - 河内·胡志明市·岘港超高性价比上网",
    subtitle: "不仅物价便宜，通信费也超划算，用eSIM畅游越南",
    intro: "越南以低廉的物价、美丽的自然风光和丰富的饮食文化吸引着众多游客。从河内老城区漫步到胡志明市法式殖民建筑巡礼，再到岘港海滨度假——精彩不断。使用eSIM无需在机场排队购买当地SIM卡，落地后即可使用Grab叫车和Google Maps导航。越南eSIM套餐价格极为实惠，是注重性价比的旅行者的理想选择。",
    sections: [
      {
        title: "越南通信环境",
        body: "越南通信市场由Viettel、Mobifone和Vinaphone三大运营商主导，其中Viettel拥有全国最大的覆盖范围。4G网络在河内、胡志明市、岘港等主要城市广泛可用，城市地区的通信速度完全满足日常使用需求。\n\n越南国土南北跨度超过1600公里，城市与农村地区的通信质量存在差异。下龙湾和沙巴等旅游胜地基本都有覆盖，但部分山区可能降为3G连接。中部旅游城市如会安和顺化享有良好的4G覆盖。"
      },
      {
        title: "eSIM解决越南旅行通信难题",
        body: "在越南机场购买SIM卡可能会遇到柜台排队和护照登记的麻烦。尤其是新山一国际机场（胡志明市）和内排国际机场（河内），高峰时段购买SIM卡可能需要30分钟以上。eSIM让你在出发前完成设置，到达后立即使用。\n\nGrab是越南出行的基本工具，尤其在胡志明市和河内，严重的交通拥堵使得Grab比传统出租车更高效。有了eSIM，你可以在机场出口直接叫Grab，避免被黑车宰客。此外，越南语是声调语言，发音对外国人来说很有挑战，因此Google翻译是必备工具，需要持续的数据连接。"
      },
      {
        title: "各主要城市通信指南",
        body: "河内的老城区（还剑湖周边）、胡志明纪念堂、文庙等景点均可使用稳定的4G通信。老城区的咖啡馆WiFi也很充足，但获取密码往往比较麻烦。\n\n胡志明市的第一郡（市中心）、滨城市场、战争遗迹博物馆等区域享有高速通信。胡志明市正在快速发展，通信基础设施也在同步完善。\n\n岘港作为热门海滨度假地，美溪海滩和巴拿山的覆盖都很好。从岘港到会安（约30公里）或顺化（约100公里）的一日游途中，通信基本没有问题。"
      },
      {
        title: "超高性价比eSIM套餐选择",
        body: "越南eSIM套餐在亚洲各国中价格最为实惠。7天3GB的套餐只需几十元人民币，即使是无限流量套餐也非常亲民。越南的低物价水平也体现在eSIM定价上。\n\nAutoWiFi eSIM除提供越南单国套餐外，还有覆盖柬埔寨和泰国的多国套餐（印度支那漫游套餐）。如果计划从越南陆路前往柬埔寨吴哥窟或泰国曼谷，这类套餐非常方便。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在越南稳定吗？", a: "在河内、胡志明市、岘港等主要城市，4G通信非常稳定。农村和山区可能降为3G，但主要旅游景点基本没有问题。" },
      { q: "越南eSIM套餐价格如何？", a: "越南eSIM套餐是亚洲最便宜的之一，7天套餐只需几十元起。这使越南成为移动通信性价比最高的目的地之一。" },
      { q: "下龙湾游船时能用eSIM吗？", a: "下龙湾主要游船路线上一般有4G信号。深入海湾内部时信号可能减弱，但主要观景区域都有覆盖。" },
      { q: "在越南用Grab需要eSIM吗？", a: "需要，Grab需要数据连接。有了eSIM就能到达后立即使用Grab，确保机场到市区的顺畅出行。鉴于越南存在黑车宰客问题，强烈推荐使用Grab。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游越南。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "越南eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/vietnam-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="vietnam-esim" content={CONTENT[loc]} />;
}
