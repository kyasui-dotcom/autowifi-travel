import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "スペインeSIMガイド - バルセロナ・マドリード・イビサの通信事情",
    subtitle: "情熱の国スペインをeSIMで自由に楽しもう",
    intro: "スペインはヨーロッパでも人気の高い旅行先で、バルセロナのサグラダ・ファミリア、マドリードのプラド美術館、南部のアルハンブラ宮殿など見どころが豊富です。主要都市では4G LTEが安定しており、eSIMを利用すれば観光スポットの予約や地図ナビゲーションがスムーズに行えます。本記事では情熱の国スペインをeSIMで自由に楽しもう・スペインのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "スペインのモバイル通信事情",
        body: "スペインの主要通信キャリアはMovistar（Telefonica）、Vodafone Spain、Orangeの3社です。Movistarが最大のカバレッジを持ち、5Gネットワークの展開でもリードしています。旅行者向けeSIMプランはMovistarまたはOrangeの回線を利用するものが一般的です。\n\nマドリードやバルセロナなどの大都市では5G通信が利用可能で、4G LTEでも下り50〜150Mbpsの速度が出ます。スペインの通信インフラはヨーロッパの中でも良好な水準にあります。\n\nスペインは国土が広く、内陸部の小さな村やアンダルシアの田舎道では通信が弱くなることがありますが、主要な観光ルート沿いのカバレッジは十分です。バレアレス諸島（マヨルカ、イビサ）やカナリア諸島でも主要エリアでは安定した通信が可能です。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "スペイン向けeSIMプランは、短期旅行者向けの3日間プランから30日間の長期プランまで用意されています。バルセロナとマドリードを巡る定番の1週間旅行なら、5GBプランがコストパフォーマンスに優れています。スペインではカフェやバルでフリーWiFiが提供されていることが多いため、併用でデータ節約が可能です。\n\nEU対応プランを選べば、ポルトガルやフランスへの日帰り旅行にも同じeSIMが使えます。バルセロナからフランスのペルピニャンまでは電車で約2時間なので、EU対応プランは非常に便利です。\n\nAutoWiFi eSIMのスペインプランはテザリングにも対応しています。レンタカーでのアンダルシア周遊やバスク地方の美食巡りにも、ナビゲーション用のデータ通信が確保できます。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでスペインプランを購入後、QRコードがメールで届きます。iPhoneは\"設定→モバイル通信\"→\"eSIMを追加、Androidは設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、バラハス空港（マドリード）やエル・プラット空港（バルセロナ）に到着後すぐに通信を開始できます。空港から市内への移動手段の検索もスムーズです。\n\nスペインの空港ではフリーWiFiが提供されていますが、利用時間に制限がある場合があります。eSIMがあれば時間を気にせず通信できます。"
      },
      {
        title: "主要都市でのカバレッジ",
        body: "バルセロナではサグラダ・ファミリア、グエル公園、ランブラス通り、ゴシック地区など全ての主要観光エリアで高速通信が利用可能です。バルセロナの地下鉄でも駅構内でモバイル通信が利用できます。ビーチエリアのバルセロネータでも安定した接続が維持されます。\n\nマドリードではプラド美術館、レティーロ公園、グランビア、ソル広場周辺で良好な通信が確認されています。マドリードのメトロも駅構内での通信に対応しています。\n\nセビリア、グラナダ、バレンシアなどの主要観光都市でも通信環境は良好です。イビサ島やマヨルカ島のリゾートエリアでも4G通信が安定して利用可能です。アルハンブラ宮殿やメスキータなどの歴史的建造物内でも通信は問題ありません。"
      },
      {
        title: "スペイン旅行でのeSIM活用のコツ",
        body: "サグラダ・ファミリアやアルハンブラ宮殿は事前のオンライン予約が必須の観光スポットです。特にアルハンブラ宮殿は数週間前に予約が埋まることもあるため、eSIMがあれば旅行中にキャンセル待ちをチェックしたり、空き枠を見つけ次第予約できます。\n\nスペインでの移動にはRenfeの鉄道アプリが便利です。AVE（高速鉄道）のチケットをモバイルで購入・表示できるため、窓口に並ぶ必要がありません。バルセロナ〜マドリード間のAVEは約2.5時間で、快適な移動手段です。\n\nスペインのバルやレストランを探すには、GoogleマップやElTenedorが便利です。スペインの食事時間は日本と大きく異なり（昼食は14時頃、夕食は21時以降）、営業時間の確認にもデータ通信が役立ちます。スペイン語のメニューもGoogle翻訳で簡単に翻訳できます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "イビサ島でもeSIMは使えますか？", a: "はい、イビサ島の主要エリア（イビサタウン、サンアントニオ、プラヤデンボッサ）では4G通信が安定して利用可能です。ビーチクラブやホテルエリアでも問題なく接続できます。" },
      { q: "スペインのeSIMでポルトガルでも使えますか？", a: "EUローミング対応プランであれば、ポルトガルでも追加料金なしで利用できます。バルセロナからリスボンへの旅行にも同じeSIMが使えます。" },
      { q: "AVE（高速鉄道）車内でeSIMは使えますか？", a: "はい、AVE車内でもモバイル通信が利用可能です。一部区間でトンネルを通過する際に一時的に接続が途切れることがありますが、大部分の区間で安定しています。" },
      { q: "スペインでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。バルやカフェのWiFiも利用できるため、7日間5GBプランで十分です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでスペイン旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "スペインeSIMガイド",
  },
  en: {
    title: "Spain eSIM Guide - Barcelona, Madrid & Ibiza Coverage",
    subtitle: "Explore Spain freely with reliable eSIM connectivity",
    intro: "Spain is one of Europe's most visited countries, featuring Barcelona's Sagrada Familia, Madrid's Prado Museum, and Granada's Alhambra Palace. Major cities offer stable 4G LTE, and an eSIM makes booking attractions and navigating Spanish streets effortless.",
    sections: [
      {
        title: "Spain's Mobile Network Overview",
        body: "Spain's three major carriers are Movistar (Telefonica), Vodafone Spain, and Orange. Movistar has the largest coverage and leads in 5G deployment. Travel eSIM plans typically use Movistar or Orange networks.\n\nMadrid and Barcelona offer 5G connectivity, with 4G LTE delivering 50-150 Mbps in most cities. Spain's telecom infrastructure ranks well within Europe.\n\nSpain's large land area means some rural inland villages and Andalusian back roads may have weaker signal, but major tourist routes are well covered. The Balearic Islands (Mallorca, Ibiza) and Canary Islands have stable coverage in main areas."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Spain eSIM plans range from 3-day short options to 30-day packages. For a classic one-week Barcelona and Madrid trip, a 5GB plan offers great value. Spanish cafes and bars often provide free WiFi, helping you conserve data.\n\nEU-compatible plans let you use the same eSIM for day trips to Portugal or France. Barcelona to Perpignan, France is only about 2 hours by train, making EU plans very practical.\n\nAutoWiFi eSIM Spain plans support tethering, useful for navigation during Andalusia road trips or Basque Country food tours."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Spain plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to connect immediately at Barajas Airport (Madrid) or El Prat Airport (Barcelona). You can search for transport to your hotel right away.\n\nSpanish airports offer free WiFi, though some have time limits. An eSIM gives you unrestricted connectivity from the moment you land."
      },
      {
        title: "Coverage in Major Cities",
        body: "Barcelona has fast coverage at Sagrada Familia, Park Guell, Las Ramblas, and the Gothic Quarter. Barcelona's Metro supports mobile data at stations. Barceloneta beach area also maintains stable connectivity.\n\nMadrid offers reliable coverage at the Prado Museum, Retiro Park, Gran Via, and Puerta del Sol. Madrid's Metro also supports in-station mobile data.\n\nSeville, Granada, and Valencia all have excellent coverage. Ibiza and Mallorca resort areas enjoy stable 4G. Historical sites like the Alhambra and Mezquita have reliable indoor coverage."
      },
      {
        title: "Tips for Using eSIM in Spain",
        body: "Sagrada Familia and the Alhambra Palace require advance online booking. The Alhambra can sell out weeks ahead, so an eSIM lets you check for cancellations and book available slots during your trip.\n\nRenfe's railway app is essential for train travel in Spain. You can purchase and display AVE (high-speed rail) tickets on your phone, avoiding station queues. The Barcelona-Madrid AVE takes about 2.5 hours.\n\nFor finding bars and restaurants, Google Maps and ElTenedor work well. Spanish dining hours differ significantly from many countries (lunch around 2 PM, dinner after 9 PM), so checking opening hours via data is very useful. Google Translate handles Spanish menus with ease."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work in Ibiza?", a: "Yes, main areas like Ibiza Town, San Antonio, and Playa d'en Bossa have stable 4G. Beach clubs and hotel areas also have reliable connectivity." },
      { q: "Can I use a Spain eSIM in Portugal?", a: "Plans with EU roaming work in Portugal at no extra charge. The same eSIM covers travel from Barcelona to Lisbon." },
      { q: "Does the eSIM work on the AVE high-speed train?", a: "Yes, mobile data works on AVE trains. Brief drops may occur in tunnels, but connectivity is stable for most of the journey." },
      { q: "How much data will I need in Spain?", a: "Typical tourist use is 500MB to 1GB per day. With bar and cafe WiFi available, a 5GB plan for 7 days works well." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Spain with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Spain eSIM Guide",
  },
  ko: {
    title: "스페인 eSIM 가이드 - 바르셀로나, 마드리드, 이비자 통신 환경",
    subtitle: "열정의 나라 스페인을 eSIM으로 자유롭게 여행하세요",
    intro: "스페인은 유럽에서 가장 인기 있는 여행지 중 하나로, 바르셀로나의 사그라다 파밀리아, 마드리드의 프라도 미술관, 그라나다의 알함브라 궁전 등 볼거리가 풍부합니다. 주요 도시에서는 4G LTE가 안정적이며, eSIM으로 관광지 예약과 지도 내비게이션을 편리하게 이용할 수 있습니다.",
    sections: [
      {
        title: "스페인의 모바일 통신 환경",
        body: "스페인의 주요 통신사는 Movistar(Telefonica), Vodafone Spain, Orange 3사입니다. Movistar가 가장 넓은 커버리지를 보유하며 5G에서도 선두를 달리고 있습니다. 여행자용 eSIM은 주로 Movistar 또는 Orange 회선을 사용합니다.\n\n마드리드와 바르셀로나 등 대도시에서는 5G 통신이 가능하며, 4G LTE로도 50~150Mbps의 속도가 나옵니다. 스페인의 통신 인프라는 유럽 내에서도 양호한 수준입니다.\n\n스페인은 국토가 넓어 내륙 작은 마을이나 안달루시아 시골길에서는 신호가 약해질 수 있지만, 주요 관광 루트의 커버리지는 충분합니다. 발레아레스 제도(마요르카, 이비자)와 카나리아 제도에서도 주요 지역은 안정적입니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "스페인 eSIM 플랜은 3일 단기 플랜부터 30일 장기 플랜까지 다양합니다. 바르셀로나와 마드리드를 도는 정석 1주일 여행이라면 5GB 플랜이 가성비가 좋습니다. 스페인 카페와 바에서는 무료 WiFi가 제공되는 경우가 많아 데이터 절약이 가능합니다.\n\nEU 대응 플랜을 선택하면 포르투갈이나 프랑스 당일 여행에도 같은 eSIM을 사용할 수 있습니다. 바르셀로나에서 프랑스 페르피냥까지 기차로 약 2시간이므로 EU 대응 플랜이 매우 편리합니다.\n\nAutoWiFi eSIM의 스페인 플랜은 테더링도 지원합니다. 안달루시아 자동차 여행이나 바스크 지방 미식 투어 시 내비게이션에 유용합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 스페인 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 바라하스 공항(마드리드)이나 엘프라트 공항(바르셀로나) 도착 후 바로 통신을 시작할 수 있습니다.\n\n스페인 공항에서는 무료 WiFi가 제공되지만 시간 제한이 있을 수 있습니다. eSIM이 있으면 제한 없이 통신할 수 있습니다."
      },
      {
        title: "주요 도시 커버리지",
        body: "바르셀로나에서는 사그라다 파밀리아, 구엘 공원, 람블라스 거리, 고딕 지구 등 모든 주요 관광 지역에서 고속 통신이 가능합니다. 바르셀로나 지하철 역 구내에서도 모바일 데이터를 사용할 수 있습니다. 바르셀로네타 해변 지역에서도 안정적인 접속이 유지됩니다.\n\n마드리드에서는 프라도 미술관, 레티로 공원, 그란비아, 솔 광장 주변에서 양호한 통신이 확인됩니다. 마드리드 메트로도 역 구내 통신에 대응합니다.\n\n세비야, 그라나다, 발렌시아 등 주요 관광 도시에서도 통신 환경이 양호합니다. 이비자와 마요르카 리조트 지역에서도 4G 통신이 안정적입니다."
      },
      {
        title: "스페인 여행에서의 eSIM 활용 팁",
        body: "사그라다 파밀리아와 알함브라 궁전은 온라인 사전 예약이 필수입니다. 특히 알함브라 궁전은 수 주 전에 매진되기도 하므로 eSIM이 있으면 여행 중 취소 대기를 확인하거나 빈 자리를 발견하면 바로 예약할 수 있습니다.\n\nRenfe 철도 앱은 스페인 기차 여행에 필수입니다. AVE(고속철도) 티켓을 모바일로 구매·표시할 수 있어 역 창구에 줄 서지 않아도 됩니다. 바르셀로나~마드리드 AVE는 약 2.5시간입니다.\n\n바와 레스토랑 찾기에는 Google Maps와 ElTenedor가 유용합니다. 스페인의 식사 시간은 한국과 크게 다르므로(점심 14시경, 저녁 21시 이후) 영업 시간 확인에 데이터 통신이 도움됩니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "이비자에서도 eSIM을 사용할 수 있나요?", a: "네, 이비자 타운, 산안토니오, 플라야 덴 보사 등 주요 지역에서 안정적인 4G 통신이 가능합니다. 비치 클럽과 호텔 지역에서도 문제없이 접속됩니다." },
      { q: "스페인 eSIM으로 포르투갈에서도 사용할 수 있나요?", a: "EU 로밍 대응 플랜이면 포르투갈에서도 추가 요금 없이 이용 가능합니다. 바르셀로나에서 리스본까지 같은 eSIM으로 사용할 수 있습니다." },
      { q: "AVE 고속철도에서 eSIM을 사용할 수 있나요?", a: "네, AVE 차내에서도 모바일 데이터를 사용할 수 있습니다. 터널 통과 시 잠깐 끊길 수 있지만 대부분의 구간에서 안정적입니다." },
      { q: "스페인에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 바와 카페의 WiFi도 활용할 수 있어 7일간 5GB 플랜이면 충분합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 스페인 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "스페인 eSIM 가이드",
  },
  zh: {
    title: "西班牙eSIM指南 - 巴塞罗那、马德里、伊比萨通信攻略",
    subtitle: "使用eSIM自由畅游热情的西班牙",
    intro: "西班牙是欧洲最受欢迎的旅游目的地之一，拥有巴塞罗那的圣家堂、马德里的普拉多博物馆和格拉纳达的阿尔罕布拉宫等众多景点。主要城市4G LTE覆盖稳定，使用eSIM可以轻松预订景点和导航西班牙街道。",
    sections: [
      {
        title: "西班牙移动通信概况",
        body: "西班牙三大运营商为Movistar（Telefonica）、Vodafone Spain和Orange。Movistar拥有最广的覆盖范围，在5G部署方面也处于领先。旅行者eSIM套餐通常使用Movistar或Orange网络。\n\n马德里和巴塞罗那提供5G覆盖，4G LTE在大多数城市速度可达50-150Mbps。西班牙的通信基础设施在欧洲处于较好水平。\n\n西班牙国土面积较大，内陆小村庄和安达卢西亚乡间小路信号可能较弱，但主要旅游路线覆盖充足。巴利阿里群岛（马略卡、伊比萨）和加那利群岛主要区域覆盖稳定。"
      },
      {
        title: "推荐eSIM套餐",
        body: "西班牙eSIM套餐从3天短期到30天长期应有尽有。经典的巴塞罗那+马德里一周行程，5GB套餐性价比出色。西班牙的咖啡馆和酒吧经常提供免费WiFi，可以节省流量。\n\n选择EU套餐可以在去葡萄牙或法国的一日游中使用同一eSIM。巴塞罗那到法国佩皮尼昂仅约2小时火车，EU套餐非常实用。\n\nAutoWiFi eSIM西班牙套餐支持热点共享，适合安达卢西亚自驾游或巴斯克美食之旅的导航使用。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买西班牙套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM，Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"扫描QR码。\n\n出发前安装eSIM，到达巴拉哈斯机场（马德里）或埃尔普拉特机场（巴塞罗那）后即可立即连网。\n\n西班牙机场提供免费WiFi，但可能有时间限制。eSIM让您不受限制地上网。"
      },
      {
        title: "主要城市覆盖情况",
        body: "巴塞罗那的圣家堂、桂尔公园、兰布拉大道、哥特区等所有主要景区都有高速网络。巴塞罗那地铁站内支持移动数据。巴塞罗内塔海滩区域也保持稳定连接。\n\n马德里的普拉多博物馆、丽池公园、格兰大道、太阳门广场周边覆盖良好。马德里地铁也支持站内移动数据。\n\n塞维利亚、格拉纳达、瓦伦西亚等主要旅游城市通信环境良好。伊比萨和马略卡度假区4G信号稳定。阿尔罕布拉宫和大清真寺等历史建筑内也有可靠的信号覆盖。"
      },
      {
        title: "西班牙旅行eSIM使用技巧",
        body: "圣家堂和阿尔罕布拉宫必须提前在线预约。阿尔罕布拉宫经常提前数周售罄，有了eSIM可以在旅途中查看退票或空位，随时预订。\n\nRenfe铁路应用是西班牙火车出行的必备工具。可以在手机上购买和显示AVE（高速铁路）车票，无需在车站排队。巴塞罗那到马德里的AVE约2.5小时。\n\n找酒吧和餐厅推荐使用Google Maps和ElTenedor。西班牙用餐时间与许多国家差异较大（午餐约14点，晚餐21点以后），查看营业时间时数据连接非常有用。Google翻译也能轻松翻译西班牙语菜单。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "伊比萨能用eSIM吗？", a: "可以，伊比萨镇、圣安东尼奥、博萨海滩等主要区域有稳定的4G覆盖。海滩俱乐部和酒店区域也能正常连接。" },
      { q: "西班牙eSIM能在葡萄牙使用吗？", a: "支持EU漫游的套餐可在葡萄牙免费使用。从巴塞罗那到里斯本都能用同一张eSIM。" },
      { q: "AVE高铁上能用eSIM吗？", a: "可以，AVE列车内可使用移动数据。通过隧道时可能短暂中断，但大部分行程中连接稳定。" },
      { q: "在西班牙大概需要多少流量？", a: "一般观光使用每天500MB-1GB。酒吧和咖啡馆WiFi也可利用，7天5GB套餐足够。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游西班牙。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "西班牙eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/spain-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="spain-esim" content={CONTENT[loc]} />;
}
