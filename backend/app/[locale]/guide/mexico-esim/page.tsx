import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, RelatedArticle[]> = {
  ja: [
    { slug: "usa-esim", title: "アメリカeSIMガイド" },
    { slug: "travel-data-usage-tips", title: "旅行中のデータ使用量の目安" },
    { slug: "save-money-roaming", title: "海外ローミング費用を節約する方法" },
  ],
  en: [
    { slug: "usa-esim", title: "USA eSIM Guide" },
    { slug: "travel-data-usage-tips", title: "Travel Data Usage Tips" },
    { slug: "save-money-roaming", title: "How to Save Money on Roaming" },
  ],
  ko: [
    { slug: "usa-esim", title: "미국 eSIM 가이드" },
    { slug: "travel-data-usage-tips", title: "여행 중 데이터 사용량 팁" },
    { slug: "save-money-roaming", title: "로밍 비용 절약 방법" },
  ],
  zh: [
    { slug: "usa-esim", title: "美国eSIM指南" },
    { slug: "travel-data-usage-tips", title: "旅行数据用量技巧" },
    { slug: "save-money-roaming", title: "如何节省漫游费用" },
  ],
};

const RELATED_TITLE: Record<Locale, string> = {
  ja: "関連記事",
  en: "Related Articles",
  ko: "관련 기사",
  zh: "相关文章",
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "メキシコeSIMガイド - メキシコシティ・カンクン・主要観光地のカバレッジ",
    subtitle: "eSIMでメキシコ旅行を快適に。主要都市からビーチリゾートまで",
    intro: "メキシコは遺跡からビーチリゾートまで多彩な魅力を持つ人気の旅行先です。Telcel、AT&T Mexico、Movistarの3大キャリアが全国をカバーしており、eSIMを利用すればメキシコシティやカンクンの空港に到着後すぐにUberの手配やGoogle Mapsでの移動が可能です。事前にeSIMを設定しておけば、到着直後から安心してスマホを活用できます。",
    sections: [
      {
        title: "メキシコのモバイル通信事情",
        body: "メキシコの主要通信キャリアはTelcel、AT&T Mexico、Movistarの3社です。Telcelが最大のカバレッジを誇り、全国の人口カバー率は90%以上です。AT&T Mexicoは都市部で強力な4G LTEネットワークを展開しており、Movistarも主要都市をしっかりカバーしています。\n\nメキシコシティでは4G LTEが広く利用可能で、一部エリアでは5Gサービスも始まっています。カンクンやプラヤ・デル・カルメンなどのリゾート地でも安定した4G接続が可能です。\n\nただし、オアハカ州の山間部やユカタン半島の遺跡周辺など、地方部では3Gに切り替わったり電波が弱くなる場合があります。主要な観光ルート沿いは概ねカバーされています。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "メキシコ向けeSIMプランは、カンクン滞在中心の短期プランから全国をカバーする長期プランまで揃っています。1週間のカンクン・リビエラマヤ旅行なら5GBプランで十分です。リゾートホテルではフリーWiFiが一般的に提供されているため、eSIMと併用すればデータ節約が可能です。\n\nメキシコシティとオアハカ、グアダラハラなど複数都市を巡る旅行なら、10GB以上のプランがおすすめです。移動中の車内でもGoogle Mapsやライドシェアアプリを頻繁に使うため、余裕のあるデータ容量が安心です。\n\nAutoWiFi eSIMでは、メキシコ専用プランを提供しています。テザリングにも対応しているので、同行者とのデータ共有も可能です。"
      },
      {
        title: "eSIMの設定方法",
        body: "AutoWiFi eSIMでメキシコプランを購入後、QRコードがメールで届きます。iPhoneは「設定→モバイル通信→eSIMを追加」、Androidは「設定→ネットワークとインターネット→SIM→eSIMを追加」からQRコードをスキャンして設定します。\n\n出発前にeSIMをインストールしておけば、メキシコシティのベニート・フアレス国際空港やカンクン国際空港に到着後すぐに通信を開始できます。空港でUberを呼ぶ際にもすぐにデータ通信が使えるので安心です。\n\nメキシコの空港ではフリーWiFiが提供されていますが、速度が遅かったり接続が不安定なことがあります。eSIMがあれば、到着直後から安定した通信が可能です。"
      },
      {
        title: "主要都市・観光地でのカバレッジ",
        body: "メキシコシティは通信環境が良好で、ソカロ広場、チャプルテペック城、コヨアカン地区など主要観光エリアで安定した4G通信が利用可能です。メトロ駅構内でも通信が可能な駅が増えています。\n\nカンクンとリビエラマヤ（プラヤ・デル・カルメン、トゥルム）はリゾートエリアを中心に良好なカバレッジです。ホテルゾーンやダウンタウンでは安定した4G接続が期待できます。\n\nオアハカ市内は4G通信が安定しています。グアダラハラもメキシコ第二の都市として通信環境は良好です。ロス・カボスのリゾートエリアでも安定した接続が可能です。\n\nチチェン・イッツァやテオティワカンなどの遺跡周辺では、観光客が多いエリアは概ねカバーされていますが、遺跡の奥まった場所では電波が弱くなることがあります。"
      },
      {
        title: "メキシコ旅行でのeSIM活用のコツ",
        body: "メキシコではUberが主要な移動手段として広く利用されています。特にメキシコシティやカンクンでは、タクシーよりもUberの方が安全で料金も明確です。eSIMがあれば、どこにいてもすぐにUberを呼べるので非常に便利です。\n\nGoogle Mapsのオフラインマップをダウンロードしておくことをおすすめします。遺跡周辺や地方部で電波が弱い場合でもナビゲーションが可能です。eSIMのデータ節約にもなります。\n\nチチェン・イッツァやテオティワカンなどの考古学遺跡を訪れる際は、事前にチケットをオンラインで購入しておくとスムーズです。eSIMがあれば、現地で急遽予定を変更してチケットを購入することも可能です。\n\nまた、Google翻訳アプリがあればスペイン語のメニューや看板の翻訳に役立ちます。観光地以外ではスペイン語のみの表記が多いため、常時データ接続があると安心です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "メキシコのeSIMはカンクンでも使えますか？", a: "はい、カンクンのホテルゾーン、ダウンタウン、プラヤ・デル・カルメンなどリビエラマヤ全域で安定した4G通信が利用可能です。" },
      { q: "メキシコでUberを使うのにeSIMは必要ですか？", a: "はい、Uberの利用にはデータ通信が必要です。eSIMがあれば、WiFiのない場所でもいつでもUberを呼ぶことができます。メキシコシティやカンクンではUberが最も便利な移動手段です。" },
      { q: "遺跡周辺でもeSIMは使えますか？", a: "チチェン・イッツァやテオティワカンなど主要遺跡の観光エリアでは概ね通信可能です。ただし、遺跡の奥まった場所では電波が弱いことがあるため、オフラインマップの準備をおすすめします。" },
      { q: "メキシコでのデータ使用量の目安は？", a: "一般的な観光利用で1日500MB〜1GB程度です。リゾートホテルのWiFiも活用すれば、7日間5GBプランで十分です。Uber利用が多い場合はやや多めのプランが安心です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでメキシコ旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "メキシコeSIMガイド",
  },
  en: {
    title: "Mexico eSIM Guide - Coverage in Mexico City, Cancun & Beyond",
    subtitle: "Stay connected across Mexico with an eSIM for your trip",
    intro: "Mexico offers everything from ancient ruins to stunning beach resorts, and staying connected makes the experience even better. With three major carriers — Telcel, AT&T Mexico, and Movistar — providing nationwide coverage, an eSIM lets you book an Uber or navigate with Google Maps the moment you land at Mexico City or Cancun airport. Set up your eSIM before departure for seamless connectivity from arrival.",
    sections: [
      {
        title: "Mexico's Mobile Network Overview",
        body: "Mexico has three major carriers: Telcel, AT&T Mexico, and Movistar. Telcel dominates with the largest coverage footprint, reaching over 90% of the population. AT&T Mexico offers strong 4G LTE in urban areas, while Movistar provides solid coverage in major cities.\n\nMexico City has widespread 4G LTE availability, with 5G service beginning to roll out in select areas. Resort destinations like Cancun and Playa del Carmen also enjoy stable 4G connectivity.\n\nHowever, mountainous areas of Oaxaca state and remote parts of the Yucatan Peninsula may experience weaker signal or drop to 3G. Major tourist routes are generally well covered."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Mexico eSIM plans range from short stays focused on Cancun to longer plans covering the entire country. A 5GB plan works well for a one-week Cancun and Riviera Maya trip. Resort hotels typically provide free WiFi, so combining it with an eSIM helps conserve data.\n\nFor multi-city trips covering Mexico City, Oaxaca, and Guadalajara, a 10GB or larger plan is recommended. You will frequently use Google Maps and ride-sharing apps while moving between cities, so extra data provides peace of mind.\n\nAutoWiFi eSIM offers dedicated Mexico plans with tethering support, allowing you to share your connection with travel companions."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "After purchasing a Mexico plan from AutoWiFi eSIM, you receive a QR code via email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nInstall your eSIM before departure to start using data immediately at Mexico City's Benito Juarez International Airport or Cancun International Airport. Having data ready to call an Uber right at the airport is a major convenience.\n\nMexican airports offer free WiFi, but speeds can be slow and connections unreliable. An eSIM ensures stable connectivity from the moment you arrive."
      },
      {
        title: "Coverage in Major Cities & Tourist Areas",
        body: "Mexico City has strong coverage throughout, with reliable 4G at the Zocalo, Chapultepec Castle, Coyoacan, and all major tourist areas. More Metro stations are gaining mobile connectivity.\n\nCancun and the Riviera Maya (Playa del Carmen, Tulum) have excellent coverage in resort areas. The Hotel Zone and downtown Cancun both offer stable 4G connections.\n\nOaxaca city has reliable 4G coverage. Guadalajara, as Mexico's second-largest city, also has strong connectivity. Los Cabos resort areas provide stable connections as well.\n\nArchaeological sites like Chichen Itza and Teotihuacan have coverage in the main visitor areas, though signal may weaken in more remote sections of the sites."
      },
      {
        title: "Tips for Using eSIM in Mexico",
        body: "Uber is widely used in Mexico and is often the safest and most transparent way to get around. In Mexico City and Cancun especially, Uber is preferred over taxis for its clear pricing and safety features. An eSIM lets you call an Uber from anywhere.\n\nDownload offline maps in Google Maps before visiting archaeological sites or rural areas. This ensures navigation works even when signal is weak, and it helps conserve your eSIM data.\n\nWhen visiting archaeological sites like Chichen Itza or Teotihuacan, buying tickets online in advance can save time. With an eSIM, you can also purchase tickets on the spot if your plans change.\n\nGoogle Translate is invaluable for reading Spanish menus and signs. Outside major tourist areas, Spanish-only signage is common, so having a constant data connection provides confidence."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does the eSIM work in Cancun?", a: "Yes, Cancun's Hotel Zone, downtown, and the entire Riviera Maya including Playa del Carmen offer stable 4G coverage." },
      { q: "Do I need an eSIM to use Uber in Mexico?", a: "Yes, Uber requires a data connection. With an eSIM, you can call an Uber anytime, even without WiFi. Uber is the most convenient and safe transport option in Mexico City and Cancun." },
      { q: "Does the eSIM work at archaeological sites?", a: "Major sites like Chichen Itza and Teotihuacan have coverage in visitor areas. Signal may weaken in remote sections, so downloading offline maps is recommended." },
      { q: "How much data will I need in Mexico?", a: "Typical tourist usage is 500MB to 1GB per day. With resort WiFi available, a 5GB plan for 7 days is sufficient. Heavy Uber users may want a larger plan." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Mexico with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Mexico eSIM Guide",
  },
  ko: {
    title: "멕시코 eSIM 가이드 - 멕시코시티, 칸쿤 및 주요 관광지 커버리지",
    subtitle: "eSIM으로 멕시코 여행을 편리하게. 주요 도시부터 비치 리조트까지",
    intro: "멕시코는 고대 유적부터 아름다운 비치 리조트까지 다양한 매력을 가진 인기 여행지입니다. Telcel, AT&T Mexico, Movistar 3대 통신사가 전국을 커버하고 있으며, eSIM을 이용하면 멕시코시티나 칸쿤 공항 도착 후 바로 Uber 호출이나 Google Maps 내비게이션이 가능합니다. 출발 전 eSIM을 설정해 두면 도착 즉시 스마트폰을 활용할 수 있습니다.",
    sections: [
      {
        title: "멕시코의 모바일 통신 환경",
        body: "멕시코의 주요 통신사는 Telcel, AT&T Mexico, Movistar 3사입니다. Telcel이 가장 넓은 커버리지를 보유하고 있으며, 전국 인구의 90% 이상을 커버합니다. AT&T Mexico는 도시 지역에서 강력한 4G LTE 네트워크를 제공하고, Movistar도 주요 도시를 잘 커버하고 있습니다.\n\n멕시코시티에서는 4G LTE가 널리 이용 가능하며, 일부 지역에서는 5G 서비스도 시작되었습니다. 칸쿤과 플라야 델 카르멘 같은 리조트 지역에서도 안정적인 4G 접속이 가능합니다.\n\n다만 오아하카주 산간 지역이나 유카탄 반도 오지에서는 신호가 약해지거나 3G로 전환될 수 있습니다. 주요 관광 루트는 대체로 잘 커버되어 있습니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "멕시코 eSIM 플랜은 칸쿤 중심의 단기 플랜부터 전국을 커버하는 장기 플랜까지 다양합니다. 1주일 칸쿤·리비에라 마야 여행이라면 5GB 플랜이 적당합니다. 리조트 호텔에서는 무료 WiFi가 일반적이므로 eSIM과 병용하면 데이터를 절약할 수 있습니다.\n\n멕시코시티, 오아하카, 과달라하라 등 여러 도시를 방문하는 여행이라면 10GB 이상의 플랜을 추천합니다. 이동 중에도 Google Maps와 라이드셰어 앱을 자주 사용하므로 넉넉한 데이터 용량이 안심입니다.\n\nAutoWiFi eSIM에서는 멕시코 전용 플랜을 제공합니다. 테더링도 지원되어 동행자와 데이터 공유가 가능합니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "AutoWiFi eSIM에서 멕시코 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가', Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 QR 코드를 스캔합니다.\n\n출발 전 eSIM을 설치해 두면 멕시코시티 베니토 후아레스 국제공항이나 칸쿤 국제공항 도착 후 바로 통신을 시작할 수 있습니다. 공항에서 Uber를 바로 호출할 수 있어 매우 편리합니다.\n\n멕시코 공항에서는 무료 WiFi가 제공되지만 속도가 느리거나 접속이 불안정한 경우가 있습니다. eSIM이 있으면 도착 즉시 안정적인 통신이 가능합니다."
      },
      {
        title: "주요 도시·관광지 커버리지",
        body: "멕시코시티는 통신 환경이 양호합니다. 소칼로 광장, 차풀테펙 성, 코요아칸 지구 등 주요 관광 지역에서 안정적인 4G 통신이 가능합니다. 메트로 역 구내에서도 모바일 통신이 가능한 역이 늘어나고 있습니다.\n\n칸쿤과 리비에라 마야(플라야 델 카르멘, 툴룸)는 리조트 지역을 중심으로 우수한 커버리지를 제공합니다. 호텔 존과 다운타운 칸쿤에서 안정적인 4G 접속이 가능합니다.\n\n오아하카 시내는 4G 통신이 안정적입니다. 과달라하라도 멕시코 제2의 도시로서 통신 환경이 좋습니다. 로스 카보스 리조트 지역에서도 안정적인 접속이 가능합니다.\n\n치첸이트사나 테오티우아칸 같은 유적지에서는 주요 관광객 구역은 대체로 커버되지만, 유적지 깊숙한 곳에서는 신호가 약해질 수 있습니다."
      },
      {
        title: "멕시코 여행에서의 eSIM 활용 팁",
        body: "멕시코에서는 Uber가 주요 교통수단으로 널리 이용되고 있습니다. 특히 멕시코시티와 칸쿤에서는 택시보다 Uber가 더 안전하고 요금도 투명합니다. eSIM이 있으면 어디서든 바로 Uber를 호출할 수 있어 매우 편리합니다.\n\nGoogle Maps의 오프라인 지도를 미리 다운로드해 두는 것을 추천합니다. 유적지 주변이나 지방에서 신호가 약할 때도 내비게이션이 가능하고, eSIM 데이터 절약에도 도움이 됩니다.\n\n치첸이트사나 테오티우아칸 같은 고고학 유적지를 방문할 때는 사전에 온라인으로 티켓을 구매해 두면 편리합니다. eSIM이 있으면 현장에서 급히 일정을 변경해 티켓을 구매할 수도 있습니다.\n\n또한 Google 번역 앱을 활용하면 스페인어 메뉴와 표지판을 쉽게 번역할 수 있습니다. 주요 관광지 외에서는 스페인어 전용 표기가 많아 상시 데이터 연결이 있으면 안심입니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "멕시코 eSIM은 칸쿤에서도 사용할 수 있나요?", a: "네, 칸쿤 호텔 존, 다운타운, 플라야 델 카르멘 등 리비에라 마야 전역에서 안정적인 4G 통신이 가능합니다." },
      { q: "멕시코에서 Uber를 사용하려면 eSIM이 필요한가요?", a: "네, Uber 이용에는 데이터 통신이 필요합니다. eSIM이 있으면 WiFi 없이도 언제든 Uber를 호출할 수 있습니다. 멕시코시티와 칸쿤에서는 Uber가 가장 편리하고 안전한 교통수단입니다." },
      { q: "유적지에서도 eSIM을 사용할 수 있나요?", a: "치첸이트사, 테오티우아칸 등 주요 유적지의 관광객 구역에서는 대체로 통신이 가능합니다. 오지에서는 신호가 약할 수 있으므로 오프라인 지도 준비를 추천합니다." },
      { q: "멕시코에서 데이터 사용량은 어느 정도인가요?", a: "일반적인 관광 이용으로 하루 500MB~1GB 정도입니다. 리조트 WiFi를 활용하면 7일간 5GB 플랜이면 충분합니다. Uber를 자주 사용하는 경우 넉넉한 플랜이 안심입니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 멕시코 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "멕시코 eSIM 가이드",
  },
  zh: {
    title: "墨西哥eSIM指南 - 墨西哥城、坎昆及主要旅游区覆盖",
    subtitle: "使用eSIM畅游墨西哥，从城市到海滩度假村",
    intro: "墨西哥拥有从古代遗迹到美丽海滩度假村的丰富旅游资源。Telcel、AT&T Mexico和Movistar三大运营商覆盖全国，使用eSIM可以在抵达墨西哥城或坎昆机场后立即叫Uber或使用Google Maps导航。出发前设置好eSIM，到达后即可安心使用手机。",
    sections: [
      {
        title: "墨西哥移动通信概况",
        body: "墨西哥三大运营商为Telcel、AT&T Mexico和Movistar。Telcel拥有最广的覆盖范围，覆盖全国90%以上的人口。AT&T Mexico在城市地区提供强大的4G LTE网络，Movistar也在主要城市有良好覆盖。\n\n墨西哥城4G LTE覆盖广泛，部分区域已开始提供5G服务。坎昆和普拉亚德尔卡门等度假地也有稳定的4G连接。\n\n不过，瓦哈卡州山区和尤卡坦半岛偏远地区信号可能较弱，偶尔会降至3G。主要旅游路线沿途基本都有覆盖。"
      },
      {
        title: "推荐eSIM套餐",
        body: "墨西哥eSIM套餐从坎昆短期方案到全国长期套餐应有尽有。一周坎昆及里维埃拉玛雅行程选择5GB套餐即可。度假酒店通常提供免费WiFi，配合eSIM使用可以节省流量。\n\n如果要游览墨西哥城、瓦哈卡、瓜达拉哈拉等多个城市，建议选择10GB以上的套餐。城市间移动时经常需要使用Google Maps和网约车应用，充足的流量让人更安心。\n\nAutoWiFi eSIM提供墨西哥专属套餐，支持热点共享，方便与同伴分享网络。"
      },
      {
        title: "eSIM设置方法",
        body: "在AutoWiFi eSIM购买墨西哥套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM，Android用户前往设置→网络和互联网→SIM卡→添加eSIM，扫描QR码即可。\n\n出发前安装eSIM，到达墨西哥城贝尼托·华雷斯国际机场或坎昆国际机场后即可立即连网。在机场就能直接叫Uber，非常方便。\n\n墨西哥机场提供免费WiFi，但速度可能较慢且连接不稳定。eSIM确保您从到达那一刻起就有稳定的网络。"
      },
      {
        title: "主要城市和旅游区覆盖情况",
        body: "墨西哥城通信环境良好。宪法广场、查普尔特佩克城堡、科约阿坎区等主要景区都有稳定的4G信号。越来越多的地铁站支持移动通信。\n\n坎昆和里维埃拉玛雅（普拉亚德尔卡门、图卢姆）度假区覆盖优秀。酒店区和坎昆市区都有稳定的4G连接。\n\n瓦哈卡市内4G通信稳定。瓜达拉哈拉作为墨西哥第二大城市，通信环境同样良好。洛斯卡沃斯度假区也有稳定连接。\n\n奇琴伊察和特奥蒂瓦坎等考古遗址的主要游客区域基本有信号覆盖，但遗址深处信号可能较弱。"
      },
      {
        title: "墨西哥旅行eSIM使用技巧",
        body: "在墨西哥，Uber是广泛使用的主要交通方式。尤其在墨西哥城和坎昆，Uber比出租车更安全、价格更透明。有了eSIM，随时随地都能叫Uber，非常方便。\n\n建议提前在Google Maps中下载离线地图。在遗迹周边或乡村地区信号较弱时仍可导航，也有助于节省eSIM流量。\n\n参观奇琴伊察或特奥蒂瓦坎等考古遗址时，提前在线购票更省时。有了eSIM，即使临时改变计划也能现场购票。\n\n此外，Google翻译应用可以帮助翻译西班牙语菜单和标识。在主要旅游区以外，西班牙语标识较为普遍，保持数据连接让人更加安心。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "墨西哥eSIM在坎昆能用吗？", a: "可以，坎昆酒店区、市区以及普拉亚德尔卡门等整个里维埃拉玛雅地区都有稳定的4G覆盖。" },
      { q: "在墨西哥用Uber需要eSIM吗？", a: "是的，Uber需要数据连接。有了eSIM，即使没有WiFi也能随时叫Uber。在墨西哥城和坎昆，Uber是最方便、最安全的出行方式。" },
      { q: "考古遗址能用eSIM吗？", a: "奇琴伊察、特奥蒂瓦坎等主要遗址的游客区域基本有信号覆盖。偏远区域信号可能较弱，建议准备离线地图。" },
      { q: "在墨西哥大概需要多少流量？", a: "一般观光使用每天500MB-1GB。利用度假酒店WiFi的话，7天5GB套餐对大多数旅行者足够。经常使用Uber的话建议选择更大的套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游墨西哥。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "墨西哥eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/mexico-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="mexico-esim"
      content={CONTENT[loc]}
      relatedArticles={RELATED_ARTICLES[loc]}
      relatedTitle={RELATED_TITLE[loc]}
    />
  );
}
