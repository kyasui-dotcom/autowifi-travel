import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "ドイツeSIMガイド - ベルリン・ミュンヘン・フランクフルトの通信事情",
    subtitle: "ヨーロッパの中心ドイツをeSIMで快適に旅しよう",
    intro: "ドイツはヨーロッパ最大の経済大国であり、ベルリンの歴史、ミュンヘンのビール文化、フランクフルトのビジネス街など多様な魅力を持つ国です。主要都市では4G LTEが安定しており、eSIMを利用すればドイツ鉄道の乗り換え検索や観光スポットの予約がスムーズに行えます。本記事ではヨーロッパの中心ドイツをeSIMで快適に旅しよう・ドイツのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "ドイツのモバイル通信事情",
        body: "ドイツの主要通信キャリアはTelekom（T-Mobile）、Vodafone Germany、O2（Telefonica）の3社です。Telekomが最も広いカバレッジを持ち、5Gネットワークの展開でもリードしています。旅行者向けeSIMプランはTelekomまたはVodafoneの回線を利用するものが一般的です。\n\nベルリンやミュンヘンなどの大都市では5G通信が利用可能で、4G LTEでも下り50〜100Mbpsの速度が出ます。ただし、ドイツはヨーロッパの中では通信速度が他の先進国に比べてやや遅いと言われることもあり、特に農村部でのカバレッジは課題が残っています。\n\n主要都市間を結ぶICEやIC列車の車内でもモバイル通信は利用可能ですが、走行中のトンネルや森林地帯では一時的に接続が不安定になることがあります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "ドイツ向けeSIMプランは、短期旅行者向けの3日間プランから30日間の長期プランまで用意されています。ベルリンとミュンヘンを巡る1週間の旅行なら、5〜10GBプランがおすすめです。ドイツのカフェでのフリーWiFiは他のヨーロッパ諸国と比較するとやや少なめなので、余裕のあるプランを選びましょう。\n\nEU対応プランを選べば、オーストリア、チェコ、オランダへの日帰り旅行にも同じeSIMが使えます。ドイツはヨーロッパの中心に位置しているため、周辺国への移動が容易で、EU対応プランは非常に便利です。\n\nAutoWiFi eSIMのドイツプランはテザリングにも対応しており、ビジネス出張でのノートパソコン利用やレンタカーでのナビゲーションにも便利です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでドイツプランを購入後、QRコードがメールで届きます。iPhoneは\"設定→モバイル通信\"→\"eSIMを追加、Androidは設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、フランクフルト空港やミュンヘン空港、ベルリン・ブランデンブルク空港に到着後すぐに通信を開始できます。ドイツの空港はターミナルが広いため、到着直後からナビゲーションが使えると便利です。\n\nドイツの空港ではフリーWiFiが提供されていますが、登録が必要な場合があります。eSIMがあれば登録なしですぐに通信できます。"
      },
      {
        title: "主要都市でのカバレッジ",
        body: "ベルリンではブランデンブルク門、博物館島、チェックポイント・チャーリー、クロイツベルクなど全ての主要エリアで安定した4G/5G通信が利用可能です。ベルリンのU-BahnとS-Bahnの多くの駅でもモバイル通信が利用できます。\n\nミュンヘンではマリエン広場、英国庭園、ニンフェンブルク宮殿、BMW博物館周辺で良好な通信が確認されています。オクトーバーフェスト会場のテレージエンヴィーゼでも通信は安定しています。\n\nフランクフルトのビジネス街やレーマー広場、ケルン大聖堂、ハンブルクの港湾エリアなど、ドイツの主要観光スポットでは通信に問題はありません。バイエルンのノイシュバンシュタイン城でも主要展望ポイントでは通信可能です。"
      },
      {
        title: "ドイツ旅行でのeSIM活用のコツ",
        body: "ドイツの鉄道移動にはDB Navigator（ドイツ鉄道公式アプリ）が必須です。ICEやICの列車検索、チケット購入、リアルタイムの遅延情報確認がすべてモバイルで行えます。ドイツの列車は遅延が多いことで知られているため、リアルタイム情報の確認は非常に重要です。\n\nドイツではキャッシュレス決済が急速に普及していますが、一部のレストランやショップでは現金のみの場合もあります。eSIMがあれば、Google Payなどのモバイル決済アプリが常に利用可能で、現金が必要な場合もATMの位置をすぐに検索できます。\n\nドイツのビアガーデンやレストラン探しにはGoogleマップやYelpドイツが便利です。ベルリンのクラフトビールシーンやミュンヘンの伝統的なビアホール、フランクフルトのアップルワイン居酒屋など、食文化の探索にデータ通信が役立ちます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ドイツのeSIMでEU他国でも使えますか？", a: "EUローミング対応プランであれば、オーストリア、フランス、オランダなどEU加盟国で追加料金なしで利用できます。スイスは別扱いの場合があるため、プラン詳細を確認してください。" },
      { q: "ICE（高速鉄道）車内でeSIMは使えますか？", a: "はい、ICE車内でもモバイル通信が利用可能です。ただし、トンネルや森林地帯を通過する際に一時的に接続が不安定になることがあります。ICE車内にはWiFiも提供されていますが、混雑時は速度が低下します。" },
      { q: "ドイツの農村部でもeSIMは使えますか？", a: "主要道路沿いや町では通信可能ですが、ドイツの農村部は他のヨーロッパ諸国と比較してカバレッジが不十分な地域が残っています。バイエルンの山間部やシュヴァルツヴァルト（黒い森）の一部では電波が弱い場合があります。" },
      { q: "ドイツでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。ドイツはフリーWiFiがやや少ないため、7日間5〜10GBプランがおすすめです。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでドイツ旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ドイツeSIMガイド",
  },
  en: {
    title: "Germany eSIM Guide - Berlin, Munich & Frankfurt Coverage",
    subtitle: "Travel through the heart of Europe with reliable eSIM connectivity",
    intro: "Germany is Europe's largest economy, offering diverse attractions from Berlin's history to Munich's beer culture and Frankfurt's skyline. Major cities provide stable 4G LTE, and an eSIM makes navigating German railways and booking attractions seamless.",
    sections: [
      {
        title: "Germany's Mobile Network Overview",
        body: "Germany's three major carriers are Telekom (T-Mobile), Vodafone Germany, and O2 (Telefonica). Telekom has the widest coverage and leads in 5G rollout. Travel eSIM plans typically use Telekom or Vodafone networks.\n\nBerlin and Munich offer 5G connectivity, with 4G LTE delivering 50-100 Mbps in most cities. Germany's mobile speeds are sometimes noted as slightly slower than other Western European nations, and rural coverage has historically been a challenge.\n\nICE and IC trains between major cities support mobile data, though tunnels and forested areas may cause temporary connectivity drops."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Germany eSIM plans range from 3-day options to 30-day packages. For a week-long Berlin and Munich trip, a 5-10GB plan is recommended. Free WiFi is less widespread in German cafes compared to other European countries, so choose a plan with adequate data.\n\nEU-compatible plans let you use the same eSIM for day trips to Austria, Czech Republic, or the Netherlands. Germany's central European location makes border-hopping easy, and EU plans are extremely practical.\n\nAutoWiFi eSIM Germany plans support tethering, useful for business travelers needing laptop connectivity or for car navigation on Autobahn road trips."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Germany plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to connect immediately at Frankfurt, Munich, or Berlin Brandenburg Airport. German airports have large terminals, so having navigation available from the start is a major advantage.\n\nGerman airports offer free WiFi, though registration may be required. An eSIM gives you immediate connectivity without any sign-up process."
      },
      {
        title: "Coverage in Major Cities",
        body: "Berlin offers stable 4G and 5G at Brandenburg Gate, Museum Island, Checkpoint Charlie, and Kreuzberg. Berlin's U-Bahn and S-Bahn stations largely support mobile data.\n\nMunich has good coverage at Marienplatz, the English Garden, Nymphenburg Palace, and the BMW Museum area. The Oktoberfest grounds at Theresienwiese also maintain stable connectivity.\n\nFrankfurt's business district, Romer Square, Cologne Cathedral, and Hamburg's harbor area all provide reliable coverage. Neuschwanstein Castle in Bavaria has signal at main viewing points."
      },
      {
        title: "Tips for Using eSIM in Germany",
        body: "DB Navigator (Deutsche Bahn's official app) is essential for German rail travel. It handles train searches, ticket purchases, and real-time delay information. German trains are known for frequent delays, making real-time updates invaluable.\n\nCashless payment is growing rapidly in Germany, but some restaurants and shops remain cash-only. An eSIM ensures your mobile payment apps always work, and you can quickly locate ATMs when cash is needed.\n\nFor finding beer gardens and restaurants, Google Maps and Yelp Germany work well. From Berlin's craft beer scene to Munich's traditional beer halls to Frankfurt's apple wine taverns, having data helps you explore Germany's rich food culture."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use a Germany eSIM in other EU countries?", a: "Plans with EU roaming work in Austria, France, Netherlands, and other EU states at no extra charge. Switzerland may be treated separately, so check plan details." },
      { q: "Does the eSIM work on ICE trains?", a: "Yes, mobile data works on ICE trains. Brief drops may occur in tunnels and forested areas. ICE trains also offer WiFi, though it can slow down when crowded." },
      { q: "Does the eSIM work in rural Germany?", a: "Main roads and towns have coverage, but Germany's rural areas can have weaker signal compared to some European neighbors. Parts of the Bavarian Alps and Black Forest may have limited coverage." },
      { q: "How much data will I need in Germany?", a: "Typical tourist use is 500MB to 1GB per day. Free WiFi is less common in Germany than elsewhere in Europe, so a 5-10GB plan for 7 days is recommended." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Germany with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Germany eSIM Guide",
  },
  ko: {
    title: "독일 eSIM 가이드 - 베를린, 뮌헨, 프랑크푸르트 통신 환경",
    subtitle: "유럽의 중심 독일을 eSIM으로 편리하게 여행하세요",
    intro: "독일은 유럽 최대 경제국으로, 베를린의 역사, 뮌헨의 맥주 문화, 프랑크푸르트의 비즈니스 중심지 등 다양한 매력을 가진 나라입니다. 주요 도시에서는 4G LTE가 안정적이며, eSIM으로 독일 철도 환승 검색과 관광지 예약을 편리하게 할 수 있습니다.",
    sections: [
      {
        title: "독일의 모바일 통신 환경",
        body: "독일의 주요 통신사는 Telekom(T-Mobile), Vodafone Germany, O2(Telefonica) 3사입니다. Telekom이 가장 넓은 커버리지를 보유하며 5G에서도 선두를 달리고 있습니다. 여행자용 eSIM은 주로 Telekom 또는 Vodafone 회선을 사용합니다.\n\n베를린과 뮌헨 등 대도시에서는 5G 통신이 가능하며, 4G LTE로도 50~100Mbps의 속도가 나옵니다. 다만 독일은 서유럽 국가 중에서는 통신 속도가 다소 느리다는 평가도 있으며, 농촌 지역 커버리지가 과제로 남아 있습니다.\n\nICE와 IC 열차 내에서도 모바일 통신이 가능하지만, 터널이나 삼림 지대를 통과할 때 일시적으로 접속이 불안정해질 수 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "독일 eSIM 플랜은 3일 단기 플랜부터 30일 장기 플랜까지 다양합니다. 베를린과 뮌헨을 도는 1주일 여행이라면 5~10GB 플랜을 추천합니다. 독일 카페에서의 무료 WiFi는 다른 유럽 국가에 비해 다소 적으므로 여유 있는 플랜을 선택하세요.\n\nEU 대응 플랜을 선택하면 오스트리아, 체코, 네덜란드로의 당일 여행에도 같은 eSIM을 사용할 수 있습니다. 독일은 유럽 중심에 위치해 주변국 이동이 쉬워 EU 대응 플랜이 매우 편리합니다.\n\nAutoWiFi eSIM의 독일 플랜은 테더링도 지원하여 비즈니스 출장 시 노트북 사용이나 렌터카 내비게이션에 유용합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 독일 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 프랑크푸르트 공항, 뮌헨 공항, 베를린 브란덴부르크 공항 도착 후 바로 통신을 시작할 수 있습니다. 독일 공항은 터미널이 넓어 도착 직후부터 내비게이션을 사용할 수 있으면 편리합니다.\n\n독일 공항에서는 무료 WiFi가 제공되지만 등록이 필요한 경우가 있습니다. eSIM이 있으면 등록 없이 바로 통신할 수 있습니다."
      },
      {
        title: "주요 도시 커버리지",
        body: "베를린에서는 브란덴부르크 문, 박물관 섬, 체크포인트 찰리, 크로이츠베르크 등 모든 주요 지역에서 안정적인 4G/5G 통신이 가능합니다. 베를린의 U-Bahn과 S-Bahn 많은 역에서도 모바일 통신이 가능합니다.\n\n뮌헨에서는 마리엔 광장, 영국 정원, 님펜부르크 궁전, BMW 박물관 주변에서 양호한 통신이 확인됩니다. 옥토버페스트 회장인 테레지엔비제에서도 통신이 안정적입니다.\n\n프랑크푸르트 비즈니스 지구, 뢰머 광장, 쾰른 대성당, 함부르크 항구 지역 등 주요 관광지에서 통신에 문제가 없습니다. 바이에른의 노이슈반슈타인 성에서도 주요 전망 포인트에서 통신 가능합니다."
      },
      {
        title: "독일 여행에서의 eSIM 활용 팁",
        body: "독일 철도 이동에는 DB Navigator(독일 철도 공식 앱)가 필수입니다. ICE와 IC 열차 검색, 티켓 구매, 실시간 지연 정보 확인을 모바일로 할 수 있습니다. 독일 열차는 지연이 잦기로 유명하므로 실시간 정보 확인이 매우 중요합니다.\n\n독일에서는 캐시리스 결제가 빠르게 보급되고 있지만, 일부 레스토랑이나 상점에서는 현금만 받는 경우도 있습니다. eSIM이 있으면 모바일 결제 앱을 항상 사용할 수 있고, 현금이 필요한 경우 ATM 위치도 바로 검색할 수 있습니다.\n\n비어가든과 레스토랑 찾기에는 Google Maps와 Yelp Germany가 유용합니다. 베를린의 크래프트 비어, 뮌헨의 전통 비어홀, 프랑크푸르트의 애플와인 선술집 등 독일 식문화 탐험에 데이터 통신이 도움됩니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "독일 eSIM으로 EU 다른 나라에서도 사용할 수 있나요?", a: "EU 로밍 대응 플랜이면 오스트리아, 프랑스, 네덜란드 등 EU 회원국에서 추가 요금 없이 이용 가능합니다. 스위스는 별도일 수 있으니 확인하세요." },
      { q: "ICE 고속철도에서 eSIM을 사용할 수 있나요?", a: "네, ICE 차내에서도 모바일 데이터를 사용할 수 있습니다. 터널이나 삼림 지대에서 잠깐 끊길 수 있습니다. ICE에는 WiFi도 제공되지만 혼잡 시 속도가 저하됩니다." },
      { q: "독일 농촌 지역에서도 eSIM을 사용할 수 있나요?", a: "주요 도로와 마을에서는 통신 가능하지만, 독일 농촌 지역은 유럽 다른 나라에 비해 커버리지가 약한 곳이 있습니다. 바이에른 산간부나 슈바르츠발트(흑림) 일부에서는 신호가 약할 수 있습니다." },
      { q: "독일에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 독일은 무료 WiFi가 다소 적으므로 7일간 5~10GB 플랜을 추천합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 독일 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "독일 eSIM 가이드",
  },
  zh: {
    title: "德国eSIM指南 - 柏林、慕尼黑、法兰克福通信攻略",
    subtitle: "使用eSIM畅游欧洲中心德国",
    intro: "德国是欧洲最大经济体，从柏林的历史到慕尼黑的啤酒文化再到法兰克福的天际线，魅力多样。主要城市4G LTE覆盖稳定，使用eSIM可以轻松查询德国铁路换乘和预订景点。",
    sections: [
      {
        title: "德国移动通信概况",
        body: "德国三大运营商为Telekom（T-Mobile）、Vodafone Germany和O2（Telefonica）。Telekom拥有最广的覆盖范围，在5G部署方面领先。旅行者eSIM套餐通常使用Telekom或Vodafone网络。\n\n柏林和慕尼黑提供5G覆盖，4G LTE在大多数城市速度可达50-100Mbps。德国的移动网速在西欧国家中有时被认为略慢，农村地区覆盖一直是挑战。\n\nICE和IC列车上可使用移动数据，但通过隧道和林区时可能短暂中断。"
      },
      {
        title: "推荐eSIM套餐",
        body: "德国eSIM套餐从3天到30天应有尽有。柏林+慕尼黑一周行程建议选择5-10GB套餐。德国咖啡馆的免费WiFi比其他欧洲国家少，建议选择充足的流量套餐。\n\n选择EU套餐可以在去奥地利、捷克或荷兰的一日游中使用同一eSIM。德国地处欧洲中心，跨境出行方便，EU套餐极其实用。\n\nAutoWiFi eSIM德国套餐支持热点共享，适合商务出行的笔记本连接或高速公路自驾导航。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买德国套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM，Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"扫描QR码。\n\n出发前安装eSIM，到达法兰克福、慕尼黑或柏林勃兰登堡机场后即可立即连网。德国机场航站楼较大，落地即有导航功能非常方便。\n\n德国机场提供免费WiFi，但可能需要注册。eSIM让您无需注册即可立即上网。"
      },
      {
        title: "主要城市覆盖情况",
        body: "柏林的勃兰登堡门、博物馆岛、查理检查站、克罗伊茨贝格等所有主要区域都有稳定的4G/5G覆盖。柏林U-Bahn和S-Bahn大部分站台支持移动数据。\n\n慕尼黑的玛丽恩广场、英国花园、宁芬堡宫、宝马博物馆周边覆盖良好。啤酒节会场特蕾西亚草坪信号也很稳定。\n\n法兰克福商务区、罗马人广场、科隆大教堂、汉堡港口区域等主要景点覆盖可靠。巴伐利亚新天鹅堡的主要观景点也有信号。"
      },
      {
        title: "德国旅行eSIM使用技巧",
        body: "德国铁路出行必备DB Navigator（德铁官方应用）。可以搜索ICE和IC列车、购票并查看实时延误信息。德国火车以频繁延误著称，实时信息更新非常重要。\n\n德国无现金支付快速普及，但部分餐厅和商店仍只收现金。eSIM确保您的移动支付应用随时可用，需要现金时也能快速找到ATM。\n\n寻找啤酒花园和餐厅推荐使用Google Maps和Yelp Germany。从柏林的精酿啤酒到慕尼黑的传统啤酒馆再到法兰克福的苹果酒小酒馆，数据连接帮助您探索德国丰富的饮食文化。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "德国eSIM能在其他欧盟国家使用吗？", a: "支持EU漫游的套餐可在奥地利、法国、荷兰等欧盟成员国免费使用。瑞士可能需另行确认。" },
      { q: "ICE高铁上能用eSIM吗？", a: "可以，ICE列车内可使用移动数据。通过隧道和林区时可能短暂中断。ICE也提供WiFi，但拥挤时速度会下降。" },
      { q: "德国农村能用eSIM吗？", a: "主要道路和城镇有覆盖，但德国农村地区信号可能比其他欧洲国家弱。巴伐利亚山区和黑森林部分地区覆盖可能有限。" },
      { q: "在德国大概需要多少流量？", a: "一般观光使用每天500MB-1GB。德国免费WiFi较少，7天建议选择5-10GB套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游德国。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "德国eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/germany-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="germany-esim" content={CONTENT[loc]} />;
}
