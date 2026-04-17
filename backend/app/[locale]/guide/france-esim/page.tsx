import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "フランスeSIMガイド - パリ・南仏のカバレッジとEUローミング",
    subtitle: "EU圏内ローミング対応eSIMでフランス旅行を快適に",
    intro: "フランスは世界有数の観光大国であり、パリを中心に高品質なモバイル通信が利用可能です。5Gも主要都市で展開が進んでおり、eSIMを利用すればシャルル・ド・ゴール空港到着後すぐにメトロの乗り換え検索やGoogleマップでの観光案内が可能です。EU圏内ローミング対応プランなら、近隣国への周遊旅行にも便利です。本記事ではEU圏内ローミング対応eSIMでフランス旅行を快適に・フランスのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "フランスのモバイル通信事情",
        body: "フランスの主要通信キャリアはOrange、SFR、Bouygues Telecom、Free Mobileの4社です。Orangeが最大のカバレッジを持ち、5Gネットワークでもリードしています。旅行者向けeSIMプランはOrangeまたはSFRの回線を利用するものが多く、フランス全土で安定した通信が可能です。\n\nパリ市内では5G通信が広く利用可能で、下り100〜200Mbpsの高速通信を体験できます。パリメトロの多くの駅構内でもモバイル通信が利用可能です。リヨン、マルセイユ、ニースなどの主要都市でも4G LTEが安定して利用できます。\n\nフランスは都市部と地方の通信格差がやや大きい国です。プロヴァンスの小さな村やブルターニュの海岸沿いでは、3Gに切り替わることがあります。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "フランス向けeSIMプランは、パリ滞在向けの短期プランから、フランス全土をカバーする長期プランまで用意されています。1週間のパリ旅行なら5GBプランがおすすめです。パリのカフェではフリーWiFiが一般的に提供されているため、eSIMと組み合わせればデータ節約が可能です。\n\nEUローミング対応プランを選べば、ユーロスターでロンドンへ日帰り旅行したり、TGVでスイスやベルギーに移動する際にも同じeSIMで通信できます。ヨーロッパ周遊旅行を計画している場合はEU対応プランが断然お得です。\n\nAutoWiFi eSIMでは、フランス専用プランとヨーロッパ周遊プランの両方を提供しています。テザリングにも対応しているので、複数デバイスでの利用も問題ありません。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでフランスプランを購入後、QRコードがメールで届きます。iPhoneは\"設定→モバイル通信\"→\"eSIMを追加、Androidは設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、シャルル・ド・ゴール空港やオルリー空港に到着後すぐに通信を開始できます。RER B線でパリ市内に向かう車内からすぐにインターネットが使えるのは大きなメリットです。\n\nフランスの空港ではフリーWiFiが提供されていますが、接続が不安定なことがあります。eSIMがあれば、到着直後から安定した通信が可能です。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "パリ市内は通信環境が非常に良好で、エッフェル塔周辺、シャンゼリゼ通り、モンマルトル、マレ地区などすべての主要観光エリアで高速通信が利用可能です。パリメトロの駅構内でもモバイルデータが利用でき、乗り換え案内アプリもスムーズに動作します。\n\nコートダジュール（ニース、カンヌ、モナコ周辺）でも通信環境は良好です。ニースのプロムナード・デ・ザングレやカンヌのクロワゼット通りでは安定した4G接続が可能です。\n\nプロヴァンスのラベンダー畑やロワール渓谷の古城巡りでは、主要な観光ルート沿いは通信可能ですが、小さな村や田舎道では電波が弱くなることがあります。モン・サン・ミシェルでは観光エリアでの通信は問題ありません。"
      },
      {
        title: "フランス旅行でのeSIM活用のコツ",
        body: "パリではCitymapperまたはRATP公式アプリがメトロ・バスの乗り換えに最も便利です。eSIMがあれば、リアルタイムの運行情報を確認しながら効率的に移動できます。パリのメトロは路線が複雑なので、常にオンラインでいることが重要です。\n\nフランスのレストランでは予約が推奨される場合が多く、TheFork（LaFourchette）アプリが広く利用されています。eSIMがあれば、歩きながら近くのレストランを検索し、その場で予約することが可能です。\n\nフランス語が分からなくても、Google翻訳のカメラ機能があればメニューや看板を瞬時に翻訳できます。特に地方ではフランス語のみの表記が多いため、常時データ接続があると安心です。また、美術館のオンラインチケット予約にもeSIMが役立ちます。ルーブル美術館やオルセー美術館は事前予約が推奨されています。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "フランスのeSIMでEU他国でも使えますか？", a: "EUローミング対応プランであれば、ドイツ、スペイン、イタリアなどEU加盟国で追加料金なしで利用できます。スイスやイギリスは別扱いの場合があるため、プラン詳細を確認してください。" },
      { q: "パリのメトロでeSIMは使えますか？", a: "はい、パリメトロの多くの駅構内でモバイル通信が利用可能です。走行中のトンネル内では接続が途切れることがありますが、駅到着時に再接続されます。" },
      { q: "南フランスでもeSIMは使えますか？", a: "ニース、カンヌ、マルセイユなどの主要都市では問題なく利用できます。プロヴァンスの小さな村では電波が弱い場合がありますが、主要観光ルート沿いは概ねカバーされています。" },
      { q: "フランスでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。パリではカフェのフリーWiFiも利用できるため、7日間5GBプランで十分です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでフランス旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "フランスeSIMガイド",
  },
  en: {
    title: "France eSIM Guide - Paris, Riviera & EU Roaming",
    subtitle: "Stay connected across France and the EU with one eSIM",
    intro: "France is one of the world's top tourist destinations with high-quality mobile coverage in Paris and beyond. 5G is expanding in major cities, and an eSIM lets you navigate the Metro and find restaurants the moment you land at Charles de Gaulle Airport. Plans with EU roaming make multi-country European trips effortless.",
    sections: [
      {
        title: "France's Mobile Network Overview",
        body: "France has four major carriers: Orange, SFR, Bouygues Telecom, and Free Mobile. Orange has the largest coverage footprint and leads in 5G deployment. Travel eSIM plans typically use Orange or SFR networks, delivering stable connectivity across France.\n\nParis offers widespread 5G with speeds of 100-200 Mbps. Many Paris Metro stations support mobile data. Lyon, Marseille, and Nice also have reliable 4G LTE coverage.\n\nFrance has a noticeable gap between urban and rural connectivity. Small villages in Provence or along the Brittany coast may occasionally drop to 3G."
      },
      {
        title: "Recommended eSIM Plans",
        body: "France eSIM plans range from short Paris-focused options to longer plans covering the entire country. A 5GB plan is ideal for a one-week Paris trip. Parisian cafes commonly offer free WiFi, which helps conserve your eSIM data.\n\nPlans with EU roaming let you use the same eSIM on a Eurostar trip to London, a TGV ride to Switzerland, or a trip to Belgium. If you are planning a multi-country European tour, an EU-wide plan is far more economical.\n\nAutoWiFi eSIM offers both France-only and Europe-wide plans. Tethering is supported, so you can share your connection across multiple devices."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a France plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to start using data immediately at Charles de Gaulle or Orly Airport. Being connected on the RER B train into central Paris is a significant convenience.\n\nFrench airports offer free WiFi, but connections can be unreliable. An eSIM ensures stable connectivity from the moment you arrive."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Paris has excellent coverage everywhere. The Eiffel Tower area, Champs-Elysees, Montmartre, and Le Marais all offer fast data. Paris Metro stations support mobile data, keeping your navigation apps running smoothly.\n\nThe Cote d'Azur (Nice, Cannes, Monaco area) also has strong coverage. Nice's Promenade des Anglais and Cannes' Croisette Boulevard both provide reliable 4G connectivity.\n\nProvence's lavender fields and Loire Valley chateaux tours have coverage along major routes, though small villages and back roads may have weaker signal. Mont-Saint-Michel has reliable coverage in the tourist area."
      },
      {
        title: "Tips for Using eSIM in France",
        body: "Citymapper or the official RATP app is essential for navigating the Paris Metro and bus system. With an eSIM, you can check real-time service updates and plan efficient routes. Paris Metro's complex network makes staying online crucial.\n\nFrench restaurants often require or recommend reservations. TheFork (formerly LaFourchette) is the most popular restaurant booking app. With an eSIM, you can search for nearby restaurants and book a table while walking around.\n\nEven without French language skills, Google Translate's camera feature lets you instantly translate menus and signs. This is especially valuable outside Paris where French-only signage is common. An eSIM also helps with booking museum tickets online, which is recommended for the Louvre and Musee d'Orsay."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use a France eSIM in other EU countries?", a: "Plans with EU roaming work in Germany, Spain, Italy, and other EU member states at no extra charge. Switzerland and the UK may be treated separately, so check plan details." },
      { q: "Does the eSIM work in the Paris Metro?", a: "Yes, many Paris Metro stations support mobile data. Connectivity may drop in tunnels between stations but reconnects at each stop." },
      { q: "Does the eSIM work in southern France?", a: "Nice, Cannes, and Marseille have excellent coverage. Small Provencal villages may have weaker signal, but major tourist routes are generally covered." },
      { q: "How much data will I need in France?", a: "Typical tourist usage is 500MB to 1GB per day. With cafe WiFi available in Paris, a 5GB plan for 7 days works well for most travelers." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to France with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "France eSIM Guide",
  },
  ko: {
    title: "프랑스 eSIM 가이드 - 파리, 남프랑스, EU 로밍",
    subtitle: "EU 로밍 대응 eSIM으로 프랑스 여행을 편리하게",
    intro: "프랑스는 세계 최고의 관광 대국으로, 파리를 중심으로 고품질 모바일 통신을 이용할 수 있습니다. 주요 도시에서 5G가 확대되고 있으며, eSIM을 이용하면 샤를 드 골 공항 도착 후 바로 메트로 환승 검색이나 Google Maps 관광 안내를 이용할 수 있습니다.",
    sections: [
      {
        title: "프랑스의 모바일 통신 환경",
        body: "프랑스의 주요 통신사는 Orange, SFR, Bouygues Telecom, Free Mobile 4사입니다. Orange가 가장 넓은 커버리지와 5G 네트워크를 보유하고 있습니다. 여행자용 eSIM은 주로 Orange 또는 SFR 회선을 사용합니다.\n\n파리 시내에서는 5G 통신이 널리 이용 가능하며, 100~200Mbps의 고속 통신을 체험할 수 있습니다. 파리 메트로 많은 역 구내에서도 모바일 통신이 가능합니다. 리옹, 마르세유, 니스 등 주요 도시에서도 안정적인 4G LTE를 이용할 수 있습니다.\n\n프랑스는 도시와 지방의 통신 격차가 다소 큰 편입니다. 프로방스의 작은 마을이나 브르타뉴 해안에서는 3G로 전환되는 경우가 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "프랑스 eSIM 플랜은 파리 체류용 단기 플랜부터 프랑스 전역을 커버하는 장기 플랜까지 다양합니다. 1주일 파리 여행이라면 5GB 플랜이 적당합니다. 파리 카페에서는 무료 WiFi가 일반적이므로 eSIM과 병용하면 데이터를 절약할 수 있습니다.\n\nEU 로밍 대응 플랜을 선택하면 유로스타로 런던 당일 여행을 하거나 TGV로 스위스, 벨기에로 이동할 때도 같은 eSIM으로 통신할 수 있습니다. 유럽 여러 나라를 방문할 계획이라면 EU 대응 플랜이 훨씬 경제적입니다.\n\nAutoWiFi eSIM에서는 프랑스 전용 플랜과 유럽 통합 플랜을 모두 제공합니다. 테더링도 지원됩니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 프랑스 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 샤를 드 골 공항이나 오를리 공항 도착 후 바로 통신을 시작할 수 있습니다. RER B선으로 파리 시내로 이동하는 차내에서부터 인터넷을 사용할 수 있습니다.\n\n프랑스 공항에서는 무료 WiFi가 제공되지만 접속이 불안정한 경우가 있습니다. eSIM이 있으면 안정적인 통신이 가능합니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "파리 시내는 통신 환경이 매우 양호합니다. 에펠탑 주변, 샹젤리제 거리, 몽마르트르, 마레 지구 등 모든 주요 관광 지역에서 고속 통신이 가능합니다. 파리 메트로 역 구내에서도 모바일 데이터를 사용할 수 있습니다.\n\n코트다쥐르(니스, 칸, 모나코 주변)도 통신 환경이 양호합니다. 니스의 프로므나드 데 장글레와 칸의 크루아제트 거리에서 안정적인 4G 접속이 가능합니다.\n\n프로방스 라벤더 밭이나 루아르 계곡 고성 투어에서는 주요 관광 루트를 따라 통신이 가능하지만, 작은 마을이나 시골길에서는 신호가 약해질 수 있습니다."
      },
      {
        title: "프랑스 여행에서의 eSIM 활용 팁",
        body: "파리에서는 Citymapper 또는 RATP 공식 앱이 메트로·버스 환승에 가장 편리합니다. eSIM이 있으면 실시간 운행 정보를 확인하면서 효율적으로 이동할 수 있습니다.\n\n프랑스 레스토랑에서는 예약이 권장되는 경우가 많습니다. TheFork(구 LaFourchette) 앱이 널리 사용됩니다. eSIM이 있으면 걸으면서 근처 레스토랑을 검색하고 바로 예약할 수 있습니다.\n\n프랑스어를 몰라도 Google 번역 카메라 기능으로 메뉴와 간판을 즉시 번역할 수 있습니다. 파리 외 지역에서는 프랑스어 전용 표기가 많아 상시 데이터 연결이 있으면 안심입니다. 루브르 미술관이나 오르세 미술관의 온라인 티켓 예매에도 eSIM이 유용합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "프랑스 eSIM으로 EU 다른 나라에서도 사용할 수 있나요?", a: "EU 로밍 대응 플랜이면 독일, 스페인, 이탈리아 등 EU 회원국에서 추가 요금 없이 이용할 수 있습니다. 스위스와 영국은 별도일 수 있으니 플랜 상세를 확인하세요." },
      { q: "파리 메트로에서 eSIM을 사용할 수 있나요?", a: "네, 파리 메트로 많은 역 구내에서 모바일 통신이 가능합니다. 역 사이 터널에서는 접속이 끊길 수 있지만 역 도착 시 재접속됩니다." },
      { q: "남프랑스에서도 eSIM을 사용할 수 있나요?", a: "니스, 칸, 마르세유 등 주요 도시에서는 문제없이 이용 가능합니다. 프로방스 작은 마을에서는 신호가 약할 수 있지만 주요 관광 루트는 대체로 커버됩니다." },
      { q: "프랑스에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 파리에서는 카페 무료 WiFi도 활용할 수 있어 7일간 5GB 플랜이면 충분합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 프랑스 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "프랑스 eSIM 가이드",
  },
  zh: {
    title: "法国eSIM指南 - 巴黎、蔚蓝海岸与EU漫游",
    subtitle: "一张eSIM畅游法国和欧盟",
    intro: "法国是全球顶级旅游目的地，巴黎及其他主要城市提供高质量的移动通信服务。5G正在主要城市扩展，使用eSIM可以在戴高乐机场落地后立即搜索地铁换乘和使用Google Maps导航。支持EU漫游的套餐让多国欧洲之旅更加轻松。",
    sections: [
      {
        title: "法国移动通信概况",
        body: "法国四大运营商为Orange、SFR、Bouygues Telecom和Free Mobile。Orange拥有最广的覆盖范围，在5G部署方面领先。旅行者eSIM套餐通常使用Orange或SFR网络，在全法范围内提供稳定连接。\n\n巴黎市内5G覆盖广泛，速度可达100-200Mbps。巴黎地铁许多站台内支持移动数据。里昂、马赛、尼斯等主要城市也有可靠的4G LTE覆盖。\n\n法国城乡通信差距较为明显。普罗旺斯小村庄或布列塔尼海岸偶尔可能降至3G。"
      },
      {
        title: "推荐eSIM套餐",
        body: "法国eSIM套餐从巴黎短期方案到全法长期套餐应有尽有。一周巴黎行程选择5GB套餐即可。巴黎咖啡馆普遍提供免费WiFi，配合eSIM使用可以节省流量。\n\n选择支持EU漫游的套餐，乘坐欧洲之星去伦敦、TGV去瑞士或比利时时都能用同一eSIM上网。计划多国游的话，EU通用套餐更为经济。\n\nAutoWiFi eSIM提供法国专属套餐和欧洲通用套餐。支持热点共享，方便多设备使用。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买法国套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM，Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"扫描QR码。\n\n出发前安装eSIM，到达戴高乐或奥利机场后即可立即连网。在乘坐RER B线前往巴黎市中心的途中就能使用网络，非常方便。\n\n法国机场提供免费WiFi，但连接可能不稳定。eSIM确保您从到达那一刻起就有稳定的网络。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "巴黎全市通信环境优秀。埃菲尔铁塔周边、香榭丽舍大道、蒙马特、玛黑区等所有主要景区都有高速网络。巴黎地铁站台内也可使用移动数据。\n\n蔚蓝海岸（尼斯、戛纳、摩纳哥周边）通信环境同样良好。尼斯的英国人漫步大道和戛纳的十字大道都有稳定的4G连接。\n\n普罗旺斯薰衣草田和卢瓦尔河谷城堡游的主要旅游路线沿途有信号覆盖，但小村庄和乡间小路信号可能较弱。圣米歇尔山旅游区信号可靠。"
      },
      {
        title: "法国旅行eSIM使用技巧",
        body: "在巴黎，Citymapper或RATP官方应用是地铁和公交换乘的最佳工具。有了eSIM，您可以实时查看运营信息，高效出行。巴黎地铁线路复杂，保持在线非常重要。\n\n法国餐厅通常建议或要求预订。TheFork（原LaFourchette）是最受欢迎的订餐应用。有了eSIM，您可以边走边搜索附近餐厅并即时预订。\n\n即使不懂法语，Google翻译的相机功能也能即时翻译菜单和标志。巴黎以外的地区法语标识较多，持续的数据连接让人更安心。eSIM还方便在线预订博物馆门票，卢浮宫和奥赛博物馆都建议提前预约。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "法国eSIM能在其他欧盟国家使用吗？", a: "支持EU漫游的套餐可在德国、西班牙、意大利等欧盟成员国免费使用。瑞士和英国可能需要另行确认，请查看套餐详情。" },
      { q: "巴黎地铁里能用eSIM吗？", a: "可以，巴黎地铁许多站台内支持移动数据。站与站之间的隧道中连接可能中断，但到站后会自动重连。" },
      { q: "南法能用eSIM吗？", a: "尼斯、戛纳、马赛等主要城市覆盖良好。普罗旺斯小村庄信号可能较弱，但主要旅游路线基本有覆盖。" },
      { q: "在法国大概需要多少流量？", a: "一般观光使用每天500MB-1GB。巴黎咖啡馆WiFi丰富，7天5GB套餐对大多数旅行者足够。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游法国。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "法国eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/france-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="france-esim" content={CONTENT[loc]} />;
}
