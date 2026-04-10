import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "アメリカ旅行前に比較したいページ",
    articles: [
      { slug: "best-esim-for-north-america", title: "北米向けeSIM比較" },
      { slug: "esim-for-road-trips", title: "ロードトリップ向けeSIMガイド" },
      { slug: "esim-vs-airport-sim", title: "eSIM vs 空港SIMカード" },
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド" },
      { slug: "esim-unlimited-data", title: "無制限データeSIM比較" },
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行に必要なデータ容量の目安" },
    ],
  },
  en: {
    title: "Compare More Before Buying for the USA",
    articles: [
      { slug: "best-esim-for-north-america", title: "Best eSIM for North America" },
      { slug: "esim-for-road-trips", title: "Best eSIM for Road Trips" },
      { slug: "esim-vs-airport-sim", title: "eSIM vs Airport SIM Card" },
      { slug: "airport-connectivity-guide", title: "Airport Connectivity Guide" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM Guide" },
      { slug: "how-much-data-do-i-need-for-travel", title: "How Much Data Do I Need for Travel?" },
    ],
  },
  ko: {
    title: "미국 여행 전 함께 비교할 가이드",
    articles: [
      { slug: "best-esim-for-north-america", title: "북미 eSIM 비교" },
      { slug: "esim-for-road-trips", title: "로드트립용 eSIM 가이드" },
      { slug: "esim-vs-airport-sim", title: "eSIM vs 공항 유심" },
      { slug: "airport-connectivity-guide", title: "공항 WiFi 가이드" },
      { slug: "esim-unlimited-data", title: "무제한 데이터 eSIM 가이드" },
      { slug: "how-much-data-do-i-need-for-travel", title: "여행에 필요한 데이터 용량" },
    ],
  },
  zh: {
    title: "购买美国eSIM前可继续比较",
    articles: [
      { slug: "best-esim-for-north-america", title: "北美eSIM推荐对比" },
      { slug: "esim-for-road-trips", title: "自驾旅行eSIM指南" },
      { slug: "esim-vs-airport-sim", title: "eSIM vs 机场SIM卡" },
      { slug: "airport-connectivity-guide", title: "机场通信指南" },
      { slug: "esim-unlimited-data", title: "无限流量eSIM指南" },
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行需要多少流量？" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "アメリカeSIMガイド - 広大な国土でのカバレッジと旅行者向けプラン",
    subtitle: "T-Mobile・AT&T回線で全米をカバーするeSIM",
    intro: "アメリカは広大な国土を持つ国ですが、主要都市や観光地では高速なモバイル通信が利用可能です。eSIMを利用すれば、入国審査後すぐにUberを呼んだり、ホテルの予約確認ができます。T-MobileやAT&Tの回線を利用したeSIMプランで、アメリカ旅行を快適に楽しみましょう。本記事ではT-Mobile・AT&T回線で全米をカバーするeSIM・アメリカのモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "アメリカのモバイル通信事情",
        body: "アメリカの主要通信キャリアはT-Mobile、AT&T、Verizonの3社です。T-Mobileは5Gカバレッジで業界をリードしており、全米の広い地域で5G通信を提供しています。AT&Tも都市部を中心に高速な5Gネットワークを展開しています。\n\n都市部では下り100〜300Mbpsの高速通信が一般的ですが、アメリカの広大な国土のため、州間のハイウェイや国立公園などの郊外では通信が不安定になることがあります。グランドキャニオンやイエローストーンなどの国立公園では、主要ポイントでは通信可能ですが、トレイル上では圏外になることがあります。\n\n旅行者向けeSIMプランは主にT-MobileまたはAT&Tの回線を利用しており、主要都市や観光地では安定した通信が可能です。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "アメリカ向けeSIMプランは、短期旅行者向けの3日間1GBプランから、長期滞在者向けの30日間無制限プランまで用意されています。ニューヨークやロサンゼルスなどの大都市を巡る旅行なら、7日間5〜10GBプランがおすすめです。アメリカは動画やSNSの利用が多い環境なので、余裕のあるプランを選びましょう。\n\nAutoWiFi eSIMでは、アメリカ全土をカバーするプランを提供しています。カナダやメキシコとの併用プランもあり、北米周遊旅行にも対応できます。テザリングも利用可能で、レンタカーでのナビゲーションにも便利です。\n\nアメリカのeSIMプランはヨーロッパやアジアと比較するとやや割高ですが、WiFiが少ない移動中の通信を考えると十分な価値があります。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでアメリカプランを購入後、QRコードがメールで届きます。iPhoneは\"設定→モバイル通信\"→\"eSIMを追加、Androidは設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"からQRコードをスキャンします。\n\n出発前にeSIMをインストールしておけば、JFK空港、LAX空港、SFO空港など、どの空港に到着してもすぐに通信を開始できます。入国審査の待ち時間中にメールチェックやUberの手配が可能です。\n\nアメリカの空港では無料WiFiが提供されていますが、セキュリティ面や速度面ではeSIMの方が優れています。特にニューヨークのJFK空港では空港WiFiが混雑しやすいため、eSIMがあると便利です。"
      },
      {
        title: "主要都市でのカバレッジ",
        body: "ニューヨークではマンハッタン全域で5Gを含む高速通信が利用可能です。地下鉄の駅構内でもモバイル通信が利用でき、セントラルパークやタイムズスクエアでも安定した接続を維持できます。ロサンゼルスでもハリウッド、サンタモニカ、ビバリーヒルズなどの主要エリアで良好な通信環境が整っています。\n\nサンフランシスコ、ラスベガス、マイアミ、シカゴなどの主要観光都市でも高速通信が安定して利用可能です。ハワイのホノルルやマウイ島の主要リゾートエリアでも4G LTEが問題なく利用できます。\n\nただし、アリゾナ州のモニュメントバレーやユタ州のザイオン国立公園など、郊外の国立公園ではカバレッジが限定的な場合があります。レンタカーで長距離移動する場合は、事前にオフラインマップをダウンロードしておくことをおすすめします。"
      },
      {
        title: "アメリカ旅行でのeSIM活用のコツ",
        body: "アメリカではUberとLyftが主要な配車サービスです。eSIMがあれば空港到着後すぐに配車できます。また、レンタカーを利用する場合、Googleマップやwazeのリアルタイムナビゲーションが非常に便利です。アメリカの都市部は渋滞が多いため、リアルタイムの交通情報は欠かせません。\n\nアメリカのレストランではYelpやGoogle Mapsのレビューを参考にする文化が根付いています。eSIMがあれば、どこにいてもレストランの評価や待ち時間を確認できます。OpenTableでの予約もスムーズに行えます。\n\nアメリカは広大な国土のため、都市間の移動中にデータ通信が不安定になることがあります。Spotifyやネットフリックスのコンテンツは、WiFi環境下で事前にダウンロードしておくと、移動中も楽しめます。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "アメリカの国立公園でもeSIMは使えますか？", a: "グランドキャニオンやヨセミテなどの主要国立公園ではビジターセンター周辺で通信可能ですが、トレイル上やバックカントリーエリアでは圏外になることが多いです。事前にオフラインマップをダウンロードしておくことをおすすめします。" },
      { q: "ハワイでもeSIMは使えますか？", a: "はい、ハワイのオアフ島（ホノルル・ワイキキ）やマウイ島の主要リゾートエリアでは4G LTEが問題なく利用できます。ただし、ハレアカラ山頂やナパリコーストなどの僻地では通信が制限されます。" },
      { q: "アメリカでのデータ使用量の目安は？", a: "アメリカは高速通信環境のためデータ消費が多くなりがちです。1日あたり1〜2GBが目安で、7日間の旅行なら5〜10GBまたは無制限プランをおすすめします。" },
      { q: "カナダやメキシコでも同じeSIMは使えますか？", a: "プランによっては北米3カ国（アメリカ・カナダ・メキシコ）をカバーするものもあります。ナイアガラの滝やカンクンを含む旅行計画の場合は、北米周遊プランの利用をおすすめします。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでアメリカ旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "アメリカeSIMガイド",
  },
  en: {
    title: "Best eSIM for USA Travel 2026 - USA eSIM Guide",
    subtitle: "Compare the best USA eSIM plans for city breaks, road trips, and cross-country travel",
    intro: "Looking for the best eSIM for USA travel? The United States is a vast country with strong coverage in major cities and tourist zones, and a travel eSIM makes it much easier to stay connected for ride apps, navigation, and hotel check-ins from the moment you land.",
    sections: [
      {
        title: "US Mobile Network Overview",
        body: "The three major US carriers are T-Mobile, AT&T, and Verizon. T-Mobile leads in 5G coverage, offering the widest 5G footprint across the country. AT&T provides strong 5G networks focused on urban areas. Both deliver fast and reliable service for travelers.\n\nUrban areas typically offer download speeds of 100-300 Mbps. However, due to the country's enormous size, connectivity can be spotty on interstate highways and in national parks. Major national parks like the Grand Canyon and Yellowstone have coverage at visitor centers and key viewpoints, but trails and backcountry areas often lack signal.\n\nTravel eSIM plans for the US typically use T-Mobile or AT&T networks, providing solid connectivity in all major cities and tourist destinations."
      },
      {
        title: "Recommended eSIM Plans",
        body: "US eSIM plans range from 3-day 1GB options to 30-day unlimited packages. For city-hopping trips to New York, Los Angeles, or San Francisco, a 7-day 5-10GB plan is recommended. Americans consume a lot of data, and you will likely find yourself doing the same with fast speeds available everywhere.\n\nAutoWiFi eSIM offers plans covering the entire continental US. Some plans also include Canada and Mexico, making them perfect for North American road trips. Tethering is supported, which is particularly useful for car navigation when renting a vehicle.\n\nUS eSIM plans are slightly more expensive than European or Asian options, but the convenience of always-on connectivity during travel makes them well worth it."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a US plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure so you are connected immediately upon arriving at JFK, LAX, SFO, or any US airport. You can check emails and arrange Uber rides while waiting in the immigration line.\n\nUS airports offer free WiFi, but eSIM provides better security and more consistent speeds. At busy airports like JFK, public WiFi can be congested, making an eSIM the more reliable option."
      },
      {
        title: "Coverage in Major Cities",
        body: "New York City offers fast 5G coverage throughout Manhattan. Mobile data works in subway stations, and connectivity remains stable in Central Park and Times Square. Los Angeles provides excellent coverage across Hollywood, Santa Monica, and Beverly Hills.\n\nSan Francisco, Las Vegas, Miami, and Chicago all deliver reliable high-speed data. Hawaii's Honolulu and major Maui resort areas also have solid 4G LTE connectivity.\n\nHowever, remote national parks in Arizona, Utah, and other western states may have limited coverage. If you plan long road trips through rural areas, download offline maps in advance to ensure navigation works without data."
      },
      {
        title: "Tips for Using eSIM in the USA",
        body: "Uber and Lyft are the primary ride-hailing services in the US. With an eSIM, you can book rides immediately after landing. For rental car trips, Google Maps and Waze provide invaluable real-time navigation and traffic data. US cities are notorious for traffic congestion, so live updates are essential.\n\nAmericans rely heavily on Yelp and Google Maps reviews for restaurant choices. An eSIM lets you check ratings and wait times from anywhere. You can also make reservations through OpenTable on the go.\n\nGiven the vast distances between US cities, data connectivity can be inconsistent during road trips. Download Spotify playlists and Netflix content over WiFi before hitting the road to stay entertained during stretches without signal."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work in US national parks?", a: "Major parks like the Grand Canyon and Yosemite have coverage near visitor centers, but trails and backcountry areas often have no signal. Download offline maps before your visit." },
      { q: "Does the eSIM work in Hawaii?", a: "Yes, Oahu (Honolulu/Waikiki) and major Maui resort areas have reliable 4G LTE. However, remote areas like Haleakala summit or Na Pali Coast may have limited coverage." },
      { q: "How much data will I need in the US?", a: "US high-speed networks tend to increase data usage. Plan for 1-2GB per day. For a week-long trip, choose a 5-10GB or unlimited plan." },
      { q: "Can I use the same eSIM in Canada or Mexico?", a: "Some plans cover all three North American countries. If your trip includes Niagara Falls or Cancun, look for a North America combo plan." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to the USA with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "USA eSIM Guide",
  },
  ko: {
    title: "미국 eSIM 가이드 - 전국 커버리지와 여행자 플랜",
    subtitle: "T-Mobile·AT&T 네트워크로 미국 전역에서 연결 유지",
    intro: "미국은 광활한 국토를 가진 나라이지만 주요 도시와 관광지에서는 고속 모바일 통신이 가능합니다. eSIM을 이용하면 입국 심사 후 바로 Uber를 호출하거나 호텔 예약을 확인할 수 있습니다. T-Mobile이나 AT&T 회선을 이용한 eSIM 플랜으로 편리한 미국 여행을 즐기세요.",
    sections: [
      {
        title: "미국의 모바일 통신 환경",
        body: "미국의 주요 통신사는 T-Mobile, AT&T, Verizon 3사입니다. T-Mobile은 5G 커버리지에서 업계를 선도하고 있으며, AT&T도 도시 지역을 중심으로 고속 5G 네트워크를 제공합니다.\n\n도시 지역에서는 100~300Mbps의 고속 통신이 일반적이지만, 광대한 국토로 인해 주간 고속도로나 국립공원 등에서는 통신이 불안정할 수 있습니다. 그랜드 캐니언이나 옐로스톤 같은 국립공원에서는 방문자 센터 주변에서는 통신 가능하지만 트레일에서는 전파가 닿지 않는 경우가 많습니다.\n\n여행자용 eSIM 플랜은 주로 T-Mobile 또는 AT&T 회선을 사용하며, 주요 도시와 관광지에서 안정적인 통신이 가능합니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "미국 eSIM 플랜은 3일 1GB부터 30일 무제한까지 다양합니다. 뉴욕, LA, 샌프란시스코 등 대도시를 방문하는 여행이라면 7일 5~10GB 플랜을 추천합니다. 미국은 고속 통신으로 데이터 소비가 많아지는 경향이 있으므로 여유 있게 선택하세요.\n\nAutoWiFi eSIM에서는 미국 전역을 커버하는 플랜을 제공합니다. 캐나다나 멕시코를 포함하는 북미 통합 플랜도 있어 북미 여행에 편리합니다. 테더링도 지원되어 렌터카 내비게이션에도 유용합니다.\n\n미국 eSIM 플랜은 유럽이나 아시아에 비해 다소 비싸지만, 이동 중 통신의 편의성을 고려하면 충분한 가치가 있습니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 미국 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 JFK, LAX, SFO 등 어느 공항에 도착해도 바로 통신을 시작할 수 있습니다. 입국 심사 대기 중에 이메일 확인이나 Uber 수배가 가능합니다.\n\n미국 공항에서는 무료 WiFi가 제공되지만 보안이나 속도 면에서 eSIM이 더 우수합니다. 특히 JFK 공항에서는 공항 WiFi가 혼잡하기 쉬워 eSIM이 편리합니다."
      },
      {
        title: "주요 도시 커버리지",
        body: "뉴욕에서는 맨해튼 전역에서 5G를 포함한 고속 통신이 가능합니다. 지하철 역에서도 모바일 데이터가 작동하며, 센트럴파크와 타임스퀘어에서도 안정적인 접속을 유지합니다. LA에서도 할리우드, 산타모니카, 비벌리힐스 등 주요 지역에서 양호한 통신 환경을 제공합니다.\n\n샌프란시스코, 라스베이거스, 마이애미, 시카고 등 주요 관광 도시에서도 고속 통신이 안정적입니다. 하와이 호놀룰루와 마우이 주요 리조트 지역에서도 4G LTE가 문제없이 이용 가능합니다.\n\n다만 애리조나의 모뉴먼트 밸리나 유타의 자이언 국립공원 등 교외 국립공원에서는 커버리지가 제한적일 수 있습니다. 렌터카로 장거리 이동할 경우 오프라인 지도를 미리 다운로드해 두세요."
      },
      {
        title: "미국 여행에서의 eSIM 활용 팁",
        body: "미국에서는 Uber와 Lyft가 주요 배차 서비스입니다. eSIM이 있으면 공항 도착 후 바로 차를 부를 수 있습니다. 렌터카 이용 시 Google Maps나 Waze의 실시간 내비게이션이 매우 유용합니다. 미국 도시의 교통 체증이 심하므로 실시간 교통 정보는 필수입니다.\n\n미국에서는 Yelp과 Google Maps 리뷰로 식당을 선택하는 문화가 자리 잡고 있습니다. eSIM이 있으면 어디서든 평점과 대기 시간을 확인할 수 있습니다. OpenTable로 예약도 간편하게 할 수 있습니다.\n\n미국은 도시 간 거리가 멀어 이동 중 데이터 통신이 불안정할 수 있습니다. Spotify나 Netflix 콘텐츠는 WiFi 환경에서 미리 다운로드해 두면 이동 중에도 즐길 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "미국 국립공원에서도 eSIM을 사용할 수 있나요?", a: "그랜드 캐니언, 요세미티 등 주요 국립공원에서는 방문자 센터 근처에서 통신 가능하지만, 트레일이나 오지에서는 전파가 닿지 않는 경우가 많습니다. 오프라인 지도를 미리 다운로드해 두세요." },
      { q: "하와이에서도 eSIM을 사용할 수 있나요?", a: "네, 오아후(호놀룰루/와이키키)와 마우이 주요 리조트 지역에서 4G LTE를 안정적으로 이용할 수 있습니다. 할레아칼라 정상이나 나팔리 해안 같은 오지에서는 커버리지가 제한됩니다." },
      { q: "미국에서 데이터 사용량은 어느 정도인가요?", a: "미국의 고속 네트워크 환경에서는 데이터 소비가 늘어나는 경향이 있습니다. 하루 1~2GB 정도로 예상하고, 7일 여행이라면 5~10GB 또는 무제한 플랜을 추천합니다." },
      { q: "같은 eSIM으로 캐나다나 멕시코에서도 사용할 수 있나요?", a: "플랜에 따라 북미 3개국(미국·캐나다·멕시코)을 커버하는 것도 있습니다. 나이아가라 폭포나 칸쿤을 포함한 여행이라면 북미 통합 플랜을 추천합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 미국 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "미국 eSIM 가이드",
  },
  zh: {
    title: "美国eSIM指南 - 全国覆盖与旅行者套餐",
    subtitle: "通过T-Mobile和AT&T网络畅游美国",
    intro: "美国国土辽阔，但主要城市和旅游景点均有高速移动通信覆盖。使用eSIM，您可以在通关后立即叫Uber或确认酒店预订。通过T-Mobile或AT&T网络的eSIM套餐，尽享便捷的美国之旅。",
    sections: [
      {
        title: "美国移动通信概况",
        body: "美国三大运营商为T-Mobile、AT&T和Verizon。T-Mobile在5G覆盖方面领先行业，在全美广泛区域提供5G服务。AT&T也以城市为中心提供高速5G网络。\n\n城市地区下载速度通常在100-300Mbps之间。但由于国土面积辽阔，州际公路和国家公园等偏远地区信号可能不稳定。大峡谷、黄石等国家公园的游客中心附近有信号，但步道上经常没有覆盖。\n\n旅行者eSIM套餐主要使用T-Mobile或AT&T网络，在所有主要城市和旅游景点提供稳定连接。"
      },
      {
        title: "推荐eSIM套餐",
        body: "美国eSIM套餐从3天1GB到30天无限流量应有尽有。城市游览（纽约、洛杉矶、旧金山）建议选择7天5-10GB套餐。美国高速网络容易增加流量消耗，建议预留充足流量。\n\nAutoWiFi eSIM提供覆盖全美的套餐。部分套餐还包含加拿大和墨西哥，适合北美自驾游。支持热点共享，租车导航时特别方便。\n\n美国eSIM套餐价格比欧洲和亚洲稍贵，但考虑到旅途中随时在线的便利性，物有所值。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买美国套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM，Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"扫描QR码。\n\n出发前安装eSIM，到达JFK、LAX、SFO等任何美国机场后即可立即连网。在排队等待入境检查时就能查邮件或叫Uber。\n\n美国机场提供免费WiFi，但eSIM在安全性和速度方面更优。尤其在JFK机场，公共WiFi经常拥堵，eSIM更为可靠。"
      },
      {
        title: "主要城市覆盖情况",
        body: "纽约曼哈顿全域提供包括5G在内的高速网络。地铁站内也可使用移动数据，中央公园和时代广场信号稳定。洛杉矶的好莱坞、圣莫尼卡、比弗利山庄等主要区域通信环境良好。\n\n旧金山、拉斯维加斯、迈阿密、芝加哥等主要旅游城市也有稳定的高速网络。夏威夷檀香山和毛伊岛主要度假区也能正常使用4G LTE。\n\n但亚利桑那州纪念碑谷、犹他州锡安国家公园等偏远国家公园覆盖可能有限。租车长途驾驶时，建议提前下载离线地图。"
      },
      {
        title: "美国旅行eSIM使用技巧",
        body: "在美国，Uber和Lyft是主要的网约车服务。有了eSIM，落地后就能叫车。租车出行时，Google Maps和Waze的实时导航非常实用。美国城市交通拥堵严重，实时路况信息不可或缺。\n\n美国人习惯通过Yelp和Google Maps评价选择餐厅。eSIM让您随时随地查看评分和等位时间，还能通过OpenTable便捷预订。\n\n美国城市间距离遥远，行驶途中数据连接可能不稳定。建议在WiFi环境下提前下载Spotify播放列表和Netflix内容，确保路途中也有娱乐。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "美国国家公园能用eSIM吗？", a: "大峡谷、优胜美地等主要国家公园的游客中心附近有信号，但步道和偏远区域通常没有覆盖。建议提前下载离线地图。" },
      { q: "夏威夷能用eSIM吗？", a: "可以，瓦胡岛（檀香山/威基基）和毛伊岛主要度假区有可靠的4G LTE覆盖。哈雷阿卡拉山顶或纳帕利海岸等偏远地区覆盖有限。" },
      { q: "在美国大概需要多少流量？", a: "美国高速网络环境下流量消耗较大，每天约1-2GB。7天行程建议选择5-10GB或无限流量套餐。" },
      { q: "同一eSIM能在加拿大或墨西哥使用吗？", a: "部分套餐覆盖北美三国（美国、加拿大、墨西哥）。如果行程包括尼亚加拉瀑布或坎昆，建议选择北美通用套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游美国。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "美国eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/usa-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="usa-esim" content={CONTENT[loc]} relatedArticles={RELATED[loc].articles} relatedTitle={RELATED[loc].title} />;
}
