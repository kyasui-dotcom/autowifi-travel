import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "マレーシアeSIMガイド - KL・ペナン・ランカウイで快適接続",
    subtitle: "多民族国家マレーシアを高速モバイル通信で巡ろう",
    intro: "マレーシアはクアラルンプール（KL）のペトロナスツインタワー、ペナンのストリートアート巡りと世界遺産の街並み、ランカウイのビーチリゾートなど、多彩な魅力を持つ国です。通信インフラが整備されており、eSIMを使えばKLIA到着後すぐにGrab配車やGoogle Mapsでの移動が可能。マレーシアの通信料金はリーズナブルで、コスパの良い旅行が実現できます。本記事では多民族国家マレーシアを高速モバイル通信で巡ろう・マレーシアの通信環境・クアラルンプールでの活用シーンなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "マレーシアの通信環境",
        body: "マレーシアの通信市場はMaxis、Celcom、Digiの3大キャリアが中心で、いずれもマレー半島の主要エリアで安定した4Gカバレッジを提供しています。5Gの展開もKLを中心に進んでおり、都市部では高速通信が楽しめます。\n\nマレー半島の都市部（KL、ペナン、マラッカ、ジョホールバル）では通信品質に問題はありませんが、ボルネオ島（サバ州・サラワク州）では都市部以外のカバレッジが弱くなることがあります。キナバル山周辺やダナムバレーなどの自然エリアでは3G接続になる場合があります。ランカウイ島は観光インフラが整っており、主要エリアでは4G通信が利用可能です。"
      },
      {
        title: "クアラルンプールでの活用シーン",
        body: "KLではGrabが移動の基本手段です。ペトロナスツインタワー、バトゥ洞窟、KLタワー、セントラルマーケットなどの観光スポット間の移動にGrabは不可欠で、eSIMがあれば到着後すぐに利用開始できます。KLの交通渋滞は深刻なため、リアルタイムの交通情報も重要です。\n\nKLはマレー系、中華系、インド系の文化が融合した多民族都市で、チャイナタウン（プタリン通り）やリトルインディアなど異なる文化圏の散策が楽しめます。各エリアの人気店や屋台の情報を検索するのにモバイルデータが役立ちます。ブキッ・ビンタンのショッピングエリアではキャッシュレス決済も広く普及しています。"
      },
      {
        title: "ペナン・ランカウイでの通信事情",
        body: "ペナン島のジョージタウンはユネスコ世界遺産に登録された歴史的な街並みが魅力で、ストリートアート巡りにはGoogle Mapsが欠かせません。ジョージタウンの中心部では安定した4G通信が利用可能です。ペナンの名物料理（チャークイティオ、アッサムラクサなど）の人気店を検索するのにもデータ通信が便利です。\n\nランカウイ島はビーチリゾートとして人気で、パンタイチェナン、パンタイテンガーなどの主要ビーチエリアでは4G通信が利用可能です。ランカウイスカイブリッジやキリム・ジオパークなどの観光スポットでもカバレッジは概ね良好ですが、深い森林エリアでは電波が弱くなることがあります。"
      },
      {
        title: "おすすめeSIMプランと選び方",
        body: "マレーシアのeSIMプランは東南アジアの中でも手頃な価格で提供されています。KLだけの短期旅行なら3〜5日プラン、ペナンやランカウイも周る場合は7日プランがおすすめです。マレーシアはシンガポールとの国境に近いため、シンガポールとのセットプランも人気があります。\n\nAutoWiFi eSIMでは、マレーシア単国プランのほか、シンガポール・インドネシアとのセットプラン（東南アジア周遊プラン）も提供しています。KLからシンガポールへのバスや鉄道での移動を予定している場合は、複数国対応プランが便利です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "マレーシアでeSIMは安定して使えますか？", a: "はい、KL、ペナン、ランカウイなどの主要観光地では安定した4G通信が利用可能です。ボルネオ島の一部自然エリアでは電波が弱くなることがありますが、観光地では概ね問題ありません。" },
      { q: "KLでGrabを使うにはeSIMが必要ですか？", a: "はい、Grabの利用にはデータ通信が必要です。KLではGrabが最も便利な移動手段で、eSIMがあれば到着後すぐに利用できます。" },
      { q: "ペナンのジョージタウンでeSIMは使えますか？", a: "はい、ジョージタウンの中心部では安定した4G通信が利用可能です。ストリートアート巡りやグルメ検索にモバイルデータが活躍します。" },
      { q: "マレーシアからシンガポールに移動する場合、eSIMはどうなりますか？", a: "マレーシア単国プランではシンガポールでは使用できません。両国を訪れる場合はAutoWiFi eSIMの東南アジア周遊プランをご利用ください。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでマレーシア旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "マレーシアeSIM",
  },
  en: {
    title: "Malaysia eSIM Guide - Stay Connected in KL, Penang & Langkawi",
    subtitle: "Explore multicultural Malaysia with high-speed mobile connectivity",
    intro: "Malaysia offers an incredible diversity of experiences — from Kuala Lumpur's iconic Petronas Twin Towers to Penang's UNESCO-listed street art and heritage architecture, and Langkawi's pristine beach resorts. With well-developed telecom infrastructure, an eSIM connects you instantly upon landing at KLIA. Malaysian data plans are affordable, making it easy to stay connected without breaking the bank.",
    sections: [
      {
        title: "Malaysia's Telecommunications Landscape",
        body: "Malaysia's telecom market is led by three major carriers: Maxis, Celcom, and Digi, all providing stable 4G coverage across Peninsular Malaysia's key areas. 5G deployment is advancing in KL and surrounding areas, delivering impressive speeds in urban centers.\n\nPeninsular Malaysia cities like KL, Penang, Malacca, and Johor Bahru have excellent coverage. However, in East Malaysia (Sabah and Sarawak on Borneo), coverage outside urban areas can be limited. Areas around Mount Kinabalu and Danum Valley may drop to 3G. Langkawi island has well-developed tourism infrastructure with reliable 4G in main areas."
      },
      {
        title: "Using eSIM in Kuala Lumpur",
        body: "Grab is the essential transportation app in KL. Moving between attractions like the Petronas Twin Towers, Batu Caves, KL Tower, and Central Market requires Grab, and an eSIM lets you start using it immediately upon arrival. Real-time traffic information is important given KL's notorious congestion.\n\nKL is a vibrant multicultural city blending Malay, Chinese, and Indian cultures. Exploring Chinatown (Petaling Street) and Little India offers fascinating cultural contrasts. Mobile data helps you find popular restaurants and street food stalls in each area. Cashless payments are widely accepted in the Bukit Bintang shopping district."
      },
      {
        title: "Connectivity in Penang and Langkawi",
        body: "Penang's George Town is a UNESCO World Heritage site famous for its historic architecture and street art. Google Maps is essential for navigating the art trail. Central George Town has stable 4G coverage. Data connectivity also helps you locate Penang's famous dishes like Char Kway Teow and Assam Laksa.\n\nLangkawi is a popular beach resort island with 4G coverage at main beach areas including Pantai Cenang and Pantai Tengah. Tourist attractions like the Langkawi Sky Bridge and Kilim Geopark generally have good connectivity, though deep forested areas may have weaker signals."
      },
      {
        title: "Choosing Your eSIM Plan",
        body: "Malaysia eSIM plans are among the most affordable in Southeast Asia. For a short KL-only trip, a 3-5 day plan works well. If you're also visiting Penang or Langkawi, a 7-day plan is recommended. Given Malaysia's proximity to Singapore, combination plans covering both countries are popular.\n\nAutoWiFi eSIM offers Malaysia-specific plans as well as multi-country bundles covering Singapore and Indonesia (Southeast Asia roaming plans). If you plan to travel from KL to Singapore by bus or train, a multi-country plan provides seamless cross-border connectivity."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Is eSIM reliable in Malaysia?", a: "Yes, major tourist destinations like KL, Penang, and Langkawi have stable 4G coverage. Some natural areas in Borneo may have weaker signals, but tourist areas are generally well-covered." },
      { q: "Do I need eSIM for Grab in KL?", a: "Yes, Grab requires a data connection. It's the most convenient transportation option in KL, and eSIM lets you use it right from arrival." },
      { q: "Does eSIM work in George Town, Penang?", a: "Yes, central George Town has stable 4G coverage. Mobile data is perfect for navigating the street art trail and finding famous local food spots." },
      { q: "What happens to my eSIM when traveling from Malaysia to Singapore?", a: "A Malaysia-only plan won't work in Singapore. If visiting both countries, use AutoWiFi's Southeast Asia roaming plan for seamless cross-border connectivity." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Malaysia with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Malaysia eSIM",
  },
  ko: {
    title: "말레이시아 eSIM 가이드 - KL·페낭·랑카위 완벽 연결",
    subtitle: "다민족 국가 말레이시아를 고속 모바일 통신으로 여행하세요",
    intro: "말레이시아는 쿠알라룸푸르(KL)의 페트로나스 트윈타워, 페낭의 스트리트 아트와 세계유산 거리, 랑카위의 비치 리조트 등 다채로운 매력의 나라입니다. 통신 인프라가 잘 정비되어 있어 eSIM을 이용하면 KLIA 도착 후 바로 Grab 호출과 Google Maps 내비게이션을 사용할 수 있습니다.",
    sections: [
      {
        title: "말레이시아 통신 환경",
        body: "말레이시아 통신 시장은 Maxis, Celcom, Digi의 3대 통신사가 주도하며, 모두 말레이 반도 주요 지역에서 안정적인 4G 커버리지를 제공합니다. 5G도 KL을 중심으로 확대 중이며 도시 지역에서는 고속 통신을 즐길 수 있습니다.\n\n말레이 반도의 도시(KL, 페낭, 말라카, 조호르바루)에서는 통신에 문제가 없지만, 보르네오 섬(사바·사라왁)에서는 도시 외 지역의 커버리지가 약해질 수 있습니다. 키나발루 산 주변이나 다눔 밸리 같은 자연 지역에서는 3G가 될 수 있습니다. 랑카위 섬은 관광 인프라가 잘 갖춰져 있어 주요 지역에서 4G를 이용할 수 있습니다."
      },
      {
        title: "쿠알라룸푸르에서의 활용",
        body: "KL에서는 Grab이 이동의 기본 수단입니다. 페트로나스 트윈타워, 바투 동굴, KL 타워, 센트럴 마켓 등 관광 명소 간 이동에 Grab은 필수이며, eSIM이 있으면 도착 후 바로 사용할 수 있습니다. KL의 교통 체증이 심하므로 실시간 교통 정보도 중요합니다.\n\nKL은 말레이계, 중국계, 인도계 문화가 융합된 다민족 도시로, 차이나타운(쁘딸링 거리)이나 리틀 인디아 등 다양한 문화권의 산책이 즐거운 곳입니다. 각 지역의 인기 맛집이나 노점 정보를 검색하는 데 모바일 데이터가 큰 도움이 됩니다."
      },
      {
        title: "페낭·랑카위 통신 사정",
        body: "페낭 섬의 조지타운은 유네스코 세계유산으로 등재된 역사적 거리가 매력이며, 스트리트 아트 투어에는 Google Maps가 필수입니다. 조지타운 중심부에서는 안정적인 4G를 이용할 수 있습니다. 페낭의 명물 요리(차퀴티아오, 아삼 락사 등) 맛집을 검색하는 데도 데이터 통신이 편리합니다.\n\n랑카위는 비치 리조트로 인기가 높으며, 판타이체낭, 판타이텡아 등 주요 해변 지역에서 4G를 이용할 수 있습니다. 랑카위 스카이브릿지나 킬림 지오파크 등 관광 명소에서도 커버리지가 대체로 양호하지만, 깊은 숲 지역에서는 신호가 약해질 수 있습니다."
      },
      {
        title: "추천 eSIM 플랜 선택 방법",
        body: "말레이시아 eSIM 플랜은 동남아시아 중에서도 합리적인 가격입니다. KL만 단기 여행이라면 3~5일 플랜, 페낭이나 랑카위도 방문한다면 7일 플랜을 추천합니다. 말레이시아는 싱가포르와 국경이 가까워 싱가포르와의 세트 플랜도 인기입니다.\n\nAutoWiFi eSIM에서는 말레이시아 단독 플랜 외에도 싱가포르·인도네시아와의 세트 플랜(동남아 로밍 플랜)도 제공합니다. KL에서 싱가포르로 버스나 기차로 이동할 계획이라면 복수국 플랜이 편리합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "말레이시아에서 eSIM이 안정적으로 작동하나요?", a: "네, KL, 페낭, 랑카위 등 주요 관광지에서는 안정적인 4G를 이용할 수 있습니다. 보르네오 일부 자연 지역에서는 신호가 약해질 수 있지만, 관광지에서는 대체로 문제없습니다." },
      { q: "KL에서 Grab 사용 시 eSIM이 필요한가요?", a: "네, Grab 이용에는 데이터 통신이 필요합니다. KL에서 Grab은 가장 편리한 이동 수단으로, eSIM이 있으면 도착 후 바로 사용할 수 있습니다." },
      { q: "페낭 조지타운에서 eSIM을 사용할 수 있나요?", a: "네, 조지타운 중심부에서는 안정적인 4G를 이용할 수 있습니다. 스트리트 아트 투어와 맛집 검색에 모바일 데이터가 큰 도움이 됩니다." },
      { q: "말레이시아에서 싱가포르로 이동 시 eSIM은 어떻게 되나요?", a: "말레이시아 단독 플랜은 싱가포르에서 사용할 수 없습니다. 양국을 방문할 경우 AutoWiFi의 동남아 로밍 플랜을 이용하세요." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 말레이시아 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "말레이시아 eSIM",
  },
  zh: {
    title: "马来西亚eSIM指南 - KL·槟城·兰卡威畅享网络",
    subtitle: "用高速移动通信畅游多元文化的马来西亚",
    intro: "马来西亚拥有吉隆坡(KL)的双子塔、槟城的街头艺术和世界遗产街区、兰卡威的海滨度假等丰富多彩的旅游资源。通信基础设施完善，使用eSIM可以在KLIA落地后立即使用Grab叫车和Google Maps导航。马来西亚的通信资费合理，能够实现高性价比的旅行体验。",
    sections: [
      {
        title: "马来西亚通信环境",
        body: "马来西亚通信市场由Maxis、Celcom和Digi三大运营商主导，在马来半岛主要地区均提供稳定的4G覆盖。5G正在吉隆坡为中心推进部署，城市地区可以享受高速通信。\n\n马来半岛的城市（吉隆坡、槟城、马六甲、新山）通信毫无问题。但在婆罗洲（沙巴·砂拉越）的城市以外地区覆盖可能较弱。京那巴鲁山周围和丹浓谷等自然区域可能只有3G信号。兰卡威岛旅游基础设施完善，主要区域4G可用。"
      },
      {
        title: "吉隆坡使用场景",
        body: "在吉隆坡，Grab是基本出行工具。在双子塔、黑风洞、吉隆坡塔、中央市场等景点之间移动离不开Grab，有eSIM就能到达后立即使用。鉴于吉隆坡严重的交通拥堵，实时交通信息也很重要。\n\n吉隆坡是马来、华人、印度文化融合的多元都市，漫步唐人街（茨厂街）和小印度能体验不同文化圈的风情。移动数据帮你搜索各区域的热门餐厅和小吃摊位。武吉免登购物区无现金支付也已广泛普及。"
      },
      {
        title: "槟城·兰卡威通信情况",
        body: "槟城的乔治市被联合国教科文组织列为世界遗产，以历史建筑和街头艺术闻名。Google Maps是探索街头艺术路线的必备工具。乔治市中心4G信号稳定。数据连接还能帮你找到槟城名菜（炒粿条、亚叁叻沙等）的热门餐馆。\n\n兰卡威是热门海滨度假岛屿，珍南海滩、丹绒鲁海滩等主要海滩区域4G可用。天空之桥和基林地质公园等景点覆盖也大体良好，但深林区域信号可能较弱。"
      },
      {
        title: "推荐eSIM套餐选择",
        body: "马来西亚eSIM套餐在东南亚中价格实惠。如果只在吉隆坡短期旅行，3-5天套餐即可；如果还要去槟城或兰卡威，建议选择7天套餐。由于马来西亚靠近新加坡，覆盖两国的组合套餐也很受欢迎。\n\nAutoWiFi eSIM除提供马来西亚专属套餐外，还有覆盖新加坡和印尼的东南亚多国套餐。如果计划从吉隆坡乘坐巴士或火车前往新加坡，多国套餐能提供无缝的跨境连接。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM在马来西亚稳定吗？", a: "在吉隆坡、槟城、兰卡威等主要旅游地，4G信号稳定可用。婆罗洲部分自然区域信号可能较弱，但旅游景点总体没有问题。" },
      { q: "在KL用Grab需要eSIM吗？", a: "需要，Grab需要数据连接。Grab是吉隆坡最便捷的出行方式，有eSIM就能到达后立即使用。" },
      { q: "eSIM在槟城乔治市能用吗？", a: "可以，乔治市中心4G覆盖稳定。移动数据非常适合探索街头艺术路线和寻找当地美食。" },
      { q: "从马来西亚去新加坡时eSIM怎么办？", a: "马来西亚专属套餐在新加坡不能使用。如果两国都去，请使用AutoWiFi的东南亚漫游套餐实现无缝跨境连接。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游马来西亚。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "马来西亚eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/malaysia-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="malaysia-esim" content={CONTENT[loc]} />;
}
