import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "spain-esim", title: "スペインeSIMガイド" },
      { slug: "turkey-esim", title: "トルコeSIMガイド" },
      { slug: "travel-data-usage-tips", title: "旅行中のデータ使用量の目安" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "spain-esim", title: "Spain eSIM Guide" },
      { slug: "turkey-esim", title: "Turkey eSIM Guide" },
      { slug: "travel-data-usage-tips", title: "Travel Data Usage Tips" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "spain-esim", title: "스페인 eSIM 가이드" },
      { slug: "turkey-esim", title: "터키 eSIM 가이드" },
      { slug: "travel-data-usage-tips", title: "여행 중 데이터 사용량 가이드" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "spain-esim", title: "西班牙eSIM指南" },
      { slug: "turkey-esim", title: "土耳其eSIM指南" },
      { slug: "travel-data-usage-tips", title: "旅行流量使用技巧" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "モロッコeSIMガイド - マラケシュ・フェズ・サハラ砂漠のカバレッジ",
    subtitle: "eSIMでモロッコの迷宮メディナからサハラ砂漠まで快適に接続",
    intro: "モロッコはマラケシュのメディナ、サハラ砂漠、青い街シャウエンなど、多彩な魅力を持つ旅行先です。主要都市では4G LTEが安定して利用可能で、eSIMを使えばマラケシュ・メナラ空港到着後すぐにタクシー配車アプリやGoogleマップでの移動が可能です。フランス語とアラビア語が公用語のモロッコでは、Google翻訳が強い味方になります。本記事ではeSIMでモロッコの迷宮メディナからサハラ砂漠まで快適に接続・モロッコのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "モロッコのモバイル通信事情",
        body: "モロッコの主要通信キャリアはMaroc Telecom、Orange Morocco、inwiの3社です。Maroc Telecomが最大のカバレッジを持ち、都市部から地方まで広くネットワークを展開しています。旅行者向けeSIMプランはMaroc TelecomまたはOrange Moroccoの回線を利用するものが多く、主要都市で安定した通信が可能です。\n\n4G LTEはカサブランカ、マラケシュ、ラバト、フェズなどの主要都市で広く利用可能です。カサブランカやラバトでは下り50〜100Mbpsの通信速度を体験できます。\n\nモロッコは都市部と地方の通信環境に差があります。アトラス山脈の山間部やサハラ砂漠の奥地では通信が不安定になる場合があります。ただし、主要な観光ルート沿いでは概ねカバーされています。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "モロッコ向けeSIMプランは、マラケシュ滞在向けの短期プランから、モロッコ全土をカバーする長期プランまで用意されています。1週間のモロッコ旅行なら5GBプランが目安です。リヤドやカフェでフリーWiFiが提供される場合もありますが、接続品質にばらつきがあるため、eSIMがあると安心です。\n\nモロッコ周辺国（スペイン、トルコなど）も訪問予定の場合は、複数国対応プランも検討してください。ジブラルタル海峡を渡ってスペインへ移動する旅行者も多く、対応プランなら切り替え不要です。\n\nAutoWiFi eSIMでは、モロッコ専用プランを提供しています。テザリングにも対応しているので、複数デバイスでの利用も問題ありません。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでモロッコプランを購入後、QRコードがメールで届きます。iPhoneは「設定→モバイル通信→eSIMを追加」、Androidは「設定→ネットワークとインターネット→SIM→eSIMを追加」からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、マラケシュ・メナラ空港やカサブランカのムハンマド5世国際空港に到着後すぐに通信を開始できます。空港からメディナへの移動中もすぐにインターネットが使えるのは大きなメリットです。\n\nモロッコの空港ではフリーWiFiが限定的な場合があります。eSIMがあれば、到着直後から安定した通信が可能です。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "マラケシュは通信環境が良好で、ジャマ・エル・フナ広場、メディナ、マジョレル庭園、バヒア宮殿などの観光エリアで安定した4G接続が可能です。メディナの狭い路地でも概ね通信できますが、建物が密集するエリアでは電波が弱くなることがあります。\n\nフェズのメディナ（世界最大の旧市街）でも主要な通りでは通信可能です。カサブランカはモロッコ最大の都市として通信環境が最も充実しており、ハッサン2世モスク周辺でも問題ありません。\n\nシャウエン（青い街）では中心部で4G接続が可能です。エッサウィラの海岸沿いでも安定した通信が利用できます。サハラ砂漠ツアーでは、メルズーガやザゴラなどの拠点町では通信可能ですが、砂漠のキャンプ地では電波が届かない場合があります。"
      },
      {
        title: "モロッコ旅行でのeSIM活用のコツ",
        body: "マラケシュやフェズのメディナは迷路のような構造で、方向感覚を失いやすい場所です。eSIMがあればGoogleマップやMaps.meをオフラインマップと併用して、リアルタイムで現在地を確認しながら歩くことができます。事前にオフラインマップもダウンロードしておくと、電波が弱いエリアでも安心です。\n\nサハラ砂漠ツアーでは、出発地点のメルズーガやワルザザートでは通信できますが、砂漠の奥地ではオフラインになります。ツアー予約や連絡は事前に済ませておきましょう。砂漠の星空撮影後のSNS投稿は町に戻ってからがおすすめです。\n\nモロッコではフランス語とアラビア語が広く使われています。Google翻訳のカメラ機能を使えば、メニューや看板をリアルタイムで翻訳可能です。特にメディナのスーク（市場）での値段交渉や、レストランでの注文時に役立ちます。また、Uberはカサブランカなど一部都市で利用でき、Careem（配車アプリ）も人気です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "サハラ砂漠でeSIMは使えますか？", a: "メルズーガやザゴラなどの拠点町では通信可能です。砂漠のキャンプ地では電波が届かない場合がありますので、必要な連絡は事前に済ませておくことをおすすめします。" },
      { q: "モロッコのメディナでeSIMは使えますか？", a: "はい、マラケシュやフェズのメディナ主要エリアでは4G通信が利用可能です。建物が密集した路地では電波が弱くなることがありますが、Googleマップでの現在地確認には十分です。" },
      { q: "モロッコでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。メディナ散策でGoogleマップやGoogle翻訳を頻繁に使う場合は多めに見積もると安心です。7日間5GBプランが目安です。" },
      { q: "モロッコでGoogle翻訳は使えますか？", a: "はい、eSIMでデータ接続があればGoogle翻訳のカメラ機能でアラビア語やフランス語の看板・メニューをリアルタイム翻訳できます。事前にオフライン言語パックをダウンロードしておくとさらに安心です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでモロッコ旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "モロッコeSIMガイド",
  },
  en: {
    title: "Morocco eSIM Guide - Marrakech, Fes, Sahara & Coastal Coverage",
    subtitle: "Stay connected from the medinas to the Sahara Desert with an eSIM",
    intro: "Morocco offers travelers an incredible mix of ancient medinas, Sahara Desert adventures, and stunning coastal towns. Major cities have reliable 4G LTE coverage, and an eSIM lets you navigate Marrakech's labyrinthine medina, book desert tours, and use Google Translate for Arabic and French signs the moment you land. With dual official languages and diverse geography, staying connected is essential for getting the most out of Morocco.",
    sections: [
      {
        title: "Morocco's Mobile Network Overview",
        body: "Morocco has three major carriers: Maroc Telecom, Orange Morocco, and inwi. Maroc Telecom has the largest coverage footprint, extending from cities into more rural areas. Travel eSIM plans typically use Maroc Telecom or Orange Morocco networks, providing stable connectivity in major cities.\n\n4G LTE is widely available in Casablanca, Marrakech, Rabat, and Fes, with download speeds of 50-100 Mbps in urban areas. Casablanca and Rabat offer the best connectivity as Morocco's most modern cities.\n\nThere is a notable gap between urban and rural coverage. The Atlas Mountains and deep Sahara Desert may have intermittent or no signal. However, major tourist routes and towns along those routes are generally covered."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Morocco eSIM plans range from short-stay options for a Marrakech city break to longer plans covering the entire country. A 5GB plan works well for a one-week trip. Some riads and cafes offer free WiFi, but quality varies significantly, making an eSIM a more reliable option.\n\nIf you plan to visit neighboring countries like Spain or Turkey, consider a multi-country plan. Many travelers cross the Strait of Gibraltar between Morocco and Spain, and a compatible plan eliminates the need to switch.\n\nAutoWiFi eSIM offers Morocco-specific plans with tethering support, so you can share your connection across multiple devices."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Morocco plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to start using data immediately at Marrakech Menara Airport or Casablanca's Mohammed V International Airport. Being connected for your transfer from the airport to the medina is a significant convenience.\n\nFree WiFi at Moroccan airports can be limited. An eSIM ensures reliable connectivity from the moment you arrive."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Marrakech has strong coverage across tourist areas including Jemaa el-Fnaa square, the medina, Jardin Majorelle, and Bahia Palace. Signal is generally available in the medina's narrow alleys, though densely built areas may have weaker reception.\n\nFes's medina, the world's largest car-free urban zone, has coverage along main pathways. Casablanca is Morocco's best-connected city with excellent coverage near Hassan II Mosque and throughout the modern Maarif district.\n\nChefchaouen (the Blue City) has 4G coverage in the town center. Essaouira's coastal area has reliable connectivity along the ramparts and beach. For Sahara Desert tours, gateway towns like Merzouga and Zagora have coverage, but desert camp sites may have no signal."
      },
      {
        title: "Tips for Using eSIM in Morocco",
        body: "The medinas of Marrakech and Fes are famously maze-like and easy to get lost in. With an eSIM, you can use Google Maps or Maps.me with real-time GPS to track your location as you explore. Download offline maps beforehand as a backup for areas with weaker signal.\n\nFor Sahara Desert tours, you will have connectivity in gateway towns like Merzouga and Ouarzazate, but expect to go offline in the deep desert. Complete all bookings and communications before heading into the dunes. Save your desert stargazing photos for uploading when you return to town.\n\nMorocco's official languages are Arabic and French. Google Translate's camera feature is invaluable for reading menus, signs, and price tags in real time. This is especially useful when bargaining in the souks. Uber operates in some cities like Casablanca, and Careem is another popular ride-hailing app across Morocco."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work in the Sahara Desert?", a: "Gateway towns like Merzouga and Zagora have coverage. Desert camp sites may have no signal, so complete any essential communications before heading into the dunes." },
      { q: "Can I use the eSIM in Morocco's medinas?", a: "Yes, major medina areas in Marrakech and Fes have 4G coverage. Signal may weaken in densely built narrow alleys, but it is generally sufficient for GPS navigation and Google Maps." },
      { q: "How much data will I need in Morocco?", a: "Typical tourist usage is 500MB to 1GB per day. If you frequently use Google Maps and Google Translate in the medinas, budget a bit more. A 5GB plan for 7 days is a good starting point." },
      { q: "Does Google Translate work well in Morocco?", a: "Yes, with a data connection Google Translate's camera feature can translate Arabic and French signs and menus in real time. Download offline language packs before your trip for added reliability." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Morocco with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Morocco eSIM Guide",
  },
  ko: {
    title: "모로코 eSIM 가이드 - 마라케시, 페스, 사하라 사막 커버리지",
    subtitle: "eSIM으로 메디나부터 사하라 사막까지 편리하게 연결",
    intro: "모로코는 마라케시의 메디나, 사하라 사막, 파란 도시 셰프샤우엔 등 다채로운 매력을 가진 여행지입니다. 주요 도시에서 4G LTE가 안정적으로 이용 가능하며, eSIM을 사용하면 마라케시 메나라 공항 도착 후 바로 택시 앱이나 Google Maps를 이용할 수 있습니다. 아랍어와 프랑스어가 공용어인 모로코에서 Google 번역은 필수입니다.",
    sections: [
      {
        title: "모로코의 모바일 통신 환경",
        body: "모로코의 주요 통신사는 Maroc Telecom, Orange Morocco, inwi 3사입니다. Maroc Telecom이 가장 넓은 커버리지를 보유하고 있으며 도시부터 지방까지 광범위한 네트워크를 운영합니다. 여행자용 eSIM은 주로 Maroc Telecom 또는 Orange Morocco 회선을 사용합니다.\n\n4G LTE는 카사블랑카, 마라케시, 라바트, 페스 등 주요 도시에서 널리 이용 가능하며, 도시 지역에서 50~100Mbps의 속도를 체험할 수 있습니다.\n\n도시와 지방의 통신 환경 차이가 있습니다. 아틀라스 산맥이나 사하라 사막 깊은 곳에서는 통신이 불안정할 수 있습니다. 다만 주요 관광 루트를 따라서는 대체로 커버됩니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "모로코 eSIM 플랜은 마라케시 단기 체류용부터 모로코 전역을 커버하는 장기 플랜까지 다양합니다. 1주일 모로코 여행이라면 5GB 플랜이 적당합니다. 리야드나 카페에서 무료 WiFi를 제공하기도 하지만 품질이 들쭉날쭉하므로 eSIM이 있으면 안심입니다.\n\n스페인이나 터키 등 인접 국가도 방문할 계획이라면 복수 국가 대응 플랜도 고려해 보세요. 지브롤터 해협을 건너 스페인으로 이동하는 여행자도 많아 대응 플랜이면 전환 없이 이용 가능합니다.\n\nAutoWiFi eSIM에서는 모로코 전용 플랜을 제공합니다. 테더링도 지원됩니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 모로코 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 마라케시 메나라 공항이나 카사블랑카 무함마드 5세 국제공항 도착 후 바로 통신을 시작할 수 있습니다. 공항에서 메디나까지 이동하는 동안 바로 인터넷을 사용할 수 있는 것은 큰 장점입니다.\n\n모로코 공항의 무료 WiFi는 제한적일 수 있습니다. eSIM이 있으면 도착 직후부터 안정적인 통신이 가능합니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "마라케시는 통신 환경이 양호합니다. 제마엘프나 광장, 메디나, 마조렐 정원, 바히아 궁전 등 관광 지역에서 안정적인 4G 접속이 가능합니다. 메디나의 좁은 골목에서도 대체로 통신되지만, 건물이 밀집한 지역에서는 신호가 약해질 수 있습니다.\n\n페스의 메디나(세계 최대의 구시가지)에서도 주요 통로에서 통신이 가능합니다. 카사블랑카는 모로코에서 가장 통신 환경이 좋은 도시로, 하산 2세 모스크 주변에서도 문제없습니다.\n\n셰프샤우엔(파란 도시)은 중심부에서 4G 접속이 가능합니다. 에사우이라 해안에서도 안정적인 통신을 이용할 수 있습니다. 사하라 사막 투어에서는 메르주가나 자고라 등 거점 도시에서는 통신 가능하지만, 사막 캠프에서는 신호가 닿지 않을 수 있습니다."
      },
      {
        title: "모로코 여행에서의 eSIM 활용 팁",
        body: "마라케시와 페스의 메디나는 미로 같은 구조로 방향 감각을 잃기 쉽습니다. eSIM이 있으면 Google Maps나 Maps.me를 이용해 실시간으로 현재 위치를 확인하며 걸을 수 있습니다. 신호가 약한 지역을 대비해 오프라인 지도도 미리 다운로드해 두세요.\n\n사하라 사막 투어에서는 출발 거점인 메르주가나 와르자자트에서 통신이 가능하지만 사막 깊은 곳에서는 오프라인이 됩니다. 투어 예약이나 연락은 사전에 마쳐 두세요. 사막의 별하늘 사진은 마을로 돌아와서 SNS에 올리는 것을 추천합니다.\n\n모로코에서는 아랍어와 프랑스어가 널리 사용됩니다. Google 번역 카메라 기능으로 메뉴나 간판을 실시간 번역할 수 있습니다. 특히 메디나의 수크(시장)에서의 가격 흥정이나 레스토랑 주문 시 유용합니다. Uber는 카사블랑카 등 일부 도시에서 이용 가능하며, Careem(배차 앱)도 인기입니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "사하라 사막에서 eSIM을 사용할 수 있나요?", a: "메르주가나 자고라 등 거점 도시에서는 통신 가능합니다. 사막 캠프에서는 신호가 닿지 않을 수 있으므로 필요한 연락은 사전에 마쳐 두세요." },
      { q: "모로코 메디나에서 eSIM을 사용할 수 있나요?", a: "네, 마라케시와 페스의 주요 메디나 지역에서 4G 통신이 가능합니다. 밀집된 좁은 골목에서는 신호가 약해질 수 있지만 GPS 내비게이션과 Google Maps 사용에는 충분합니다." },
      { q: "모로코에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 메디나에서 Google Maps와 Google 번역을 자주 사용한다면 여유 있게 잡으세요. 7일간 5GB 플랜이 기본입니다." },
      { q: "모로코에서 Google 번역을 사용할 수 있나요?", a: "네, 데이터 연결이 있으면 Google 번역 카메라 기능으로 아랍어와 프랑스어 간판·메뉴를 실시간 번역할 수 있습니다. 오프라인 언어 팩도 미리 다운로드해 두면 더 안심입니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 모로코 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "모로코 eSIM 가이드",
  },
  zh: {
    title: "摩洛哥eSIM指南 - 马拉喀什、菲斯、撒哈拉沙漠覆盖详解",
    subtitle: "一张eSIM畅游摩洛哥，从古城到沙漠保持连接",
    intro: "摩洛哥拥有马拉喀什的迷宫老城、撒哈拉沙漠探险、蓝色小镇舍夫沙万等多元旅行体验。主要城市4G LTE覆盖稳定，使用eSIM可以在马拉喀什梅纳拉机场落地后立即使用打车软件和Google Maps导航。摩洛哥以阿拉伯语和法语为官方语言，Google翻译将成为您的得力助手。",
    sections: [
      {
        title: "摩洛哥移动通信概况",
        body: "摩洛哥三大运营商为Maroc Telecom、Orange Morocco和inwi。Maroc Telecom拥有最广的覆盖范围，从城市到乡村都有广泛的网络部署。旅行者eSIM套餐通常使用Maroc Telecom或Orange Morocco网络，在主要城市提供稳定连接。\n\n4G LTE在卡萨布兰卡、马拉喀什、拉巴特、菲斯等主要城市广泛可用，城市地区下载速度可达50-100Mbps。\n\n城乡通信环境存在差异。阿特拉斯山脉深处和撒哈拉沙漠腹地可能信号不稳定。不过主要旅游路线沿途基本有覆盖。"
      },
      {
        title: "推荐eSIM套餐",
        body: "摩洛哥eSIM套餐从马拉喀什短期方案到全国长期套餐应有尽有。一周摩洛哥行程选择5GB套餐即可。部分庭院旅馆和咖啡馆提供免费WiFi，但质量参差不齐，eSIM更为可靠。\n\n如果还计划前往西班牙、土耳其等邻国，可以考虑多国套餐。许多游客会跨越直布罗陀海峡往返摩洛哥和西班牙，兼容套餐无需切换。\n\nAutoWiFi eSIM提供摩洛哥专属套餐，支持热点共享，方便多设备使用。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买摩洛哥套餐后，QR码会发送到您的邮箱。iPhone用户前往「设置→蜂窝网络→添加eSIM」，Android用户前往「设置→网络和互联网→SIM卡→添加eSIM」扫描QR码。\n\n出发前安装eSIM，到达马拉喀什梅纳拉机场或卡萨布兰卡穆罕默德五世国际机场后即可立即连网。从机场前往老城途中就能使用网络，非常方便。\n\n摩洛哥机场的免费WiFi可能比较有限。eSIM确保您从到达那一刻起就有稳定的网络。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "马拉喀什通信环境良好。杰马夫纳广场、老城、马约尔花园、巴希亚宫等景区都有稳定的4G信号。老城狭窄巷道中大部分区域也能通信，但建筑密集处信号可能减弱。\n\n菲斯老城（世界最大的无车城区）主要通道有信号覆盖。卡萨布兰卡是摩洛哥通信环境最好的城市，哈桑二世清真寺周边及现代化的马阿里夫区覆盖优秀。\n\n舍夫沙万（蓝色小镇）市中心有4G覆盖。索维拉海岸沿线通信稳定。撒哈拉沙漠旅游方面，梅尔祖卡和扎戈拉等门户城镇有信号，但沙漠营地可能没有信号。"
      },
      {
        title: "摩洛哥旅行eSIM使用技巧",
        body: "马拉喀什和菲斯的老城如迷宫般复杂，极易迷路。有了eSIM，您可以用Google Maps或Maps.me实时追踪位置。建议提前下载离线地图，以备信号弱的区域使用。\n\n撒哈拉沙漠旅行中，门户城镇梅尔祖卡和瓦尔扎扎特有信号，但深入沙漠后会断网。请提前完成所有预订和联络。沙漠星空照片建议回到城镇后再上传社交媒体。\n\n摩洛哥广泛使用阿拉伯语和法语。Google翻译的相机功能可以实时翻译菜单、标志和价签，在老城集市讨价还价和餐厅点餐时特别实用。Uber在卡萨布兰卡等部分城市可用，Careem（打车软件）在摩洛哥也很受欢迎。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "撒哈拉沙漠能用eSIM吗？", a: "梅尔祖卡和扎戈拉等门户城镇有信号覆盖。沙漠营地可能没有信号，建议提前完成必要的联络。" },
      { q: "摩洛哥老城里能用eSIM吗？", a: "可以，马拉喀什和菲斯的主要老城区域有4G覆盖。建筑密集的窄巷信号可能减弱，但足以使用GPS导航和Google Maps。" },
      { q: "在摩洛哥大概需要多少流量？", a: "一般观光使用每天500MB-1GB。如果在老城频繁使用Google Maps和Google翻译，建议预留更多流量。7天5GB套餐是基本选择。" },
      { q: "在摩洛哥能用Google翻译吗？", a: "可以，有数据连接就能用Google翻译的相机功能实时翻译阿拉伯语和法语的标志、菜单。建议提前下载离线语言包以备不时之需。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游摩洛哥。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "摩洛哥eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/morocco-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="morocco-esim" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
