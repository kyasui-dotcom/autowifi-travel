export type GuideLocale = "en" | "ja" | "ko" | "zh";
export type GuideCategory = "country" | "howto" | "topic";

interface GuideText {
  title: string;
  desc: string;
}

export interface ExtraGuideDefinition {
  slug: string;
  category: GuideCategory;
  countrySlug?: string;
  content: Record<GuideLocale, GuideText>;
}

export const EXTRA_GUIDES: ExtraGuideDefinition[] = [
  {
    slug: "brazil-esim",
    category: "country",
    countrySlug: "brazil",
    content: {
      en: { title: "Brazil eSIM Guide 2026", desc: "Best eSIM plans for Brazil with coverage tips for Rio de Janeiro, Sao Paulo, Iguazu and beyond." },
      ja: { title: "ブラジルのeSIMガイド 2026", desc: "ブラジル旅行のeSIM完全ガイド。リオデジャネイロ、サンパウロ、イグアス周辺の通信事情とおすすめプラン。" },
      ko: { title: "브라질 eSIM 가이드 2026", desc: "브라질 여행용 eSIM 완전 가이드. 리우데자네이루, 상파울루, 이과수 지역의 통신 환경과 추천 플랜." },
      zh: { title: "巴西eSIM指南 2026", desc: "巴西旅行eSIM完全指南。里约热内卢、圣保罗、伊瓜苏等地的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "argentina-esim",
    category: "country",
    countrySlug: "argentina",
    content: {
      en: { title: "Argentina eSIM Guide 2026", desc: "Best eSIM plans for Argentina with practical coverage notes for Buenos Aires, Patagonia and Mendoza." },
      ja: { title: "アルゼンチンのeSIMガイド 2026", desc: "アルゼンチン旅行のeSIM完全ガイド。ブエノスアイレス、パタゴニア、メンドーサでの通信環境とおすすめプラン。" },
      ko: { title: "아르헨티나 eSIM 가이드 2026", desc: "아르헨티나 여행용 eSIM 완전 가이드. 부에노스아이레스, 파타고니아, 멘도사의 통신 환경과 추천 플랜." },
      zh: { title: "阿根廷eSIM指南 2026", desc: "阿根廷旅行eSIM完全指南。布宜诺斯艾利斯、巴塔哥尼亚、门多萨的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "peru-esim",
    category: "country",
    countrySlug: "peru",
    content: {
      en: { title: "Peru eSIM Guide 2026", desc: "Best eSIM plans for Peru covering Lima, Cusco, Machu Picchu and high-altitude travel tips." },
      ja: { title: "ペルーのeSIMガイド 2026", desc: "ペルー旅行のeSIM完全ガイド。リマ、クスコ、マチュピチュ周辺の通信環境と高地旅行の注意点。" },
      ko: { title: "페루 eSIM 가이드 2026", desc: "페루 여행용 eSIM 완전 가이드. 리마, 쿠스코, 마추픽추 지역의 통신 환경과 고산지대 팁." },
      zh: { title: "秘鲁eSIM指南 2026", desc: "秘鲁旅行eSIM完全指南。利马、库斯科、马丘比丘周边的网络环境与高海拔出行建议。" },
    },
  },
  {
    slug: "colombia-esim",
    category: "country",
    countrySlug: "colombia",
    content: {
      en: { title: "Colombia eSIM Guide 2026", desc: "Best eSIM plans for Colombia with coverage in Bogota, Medellin, Cartagena and digital nomad hubs." },
      ja: { title: "コロンビアのeSIMガイド 2026", desc: "コロンビア旅行のeSIM完全ガイド。ボゴタ、メデジン、カルタヘナの通信環境とおすすめプラン。" },
      ko: { title: "콜롬비아 eSIM 가이드 2026", desc: "콜롬비아 여행용 eSIM 완전 가이드. 보고타, 메데인, 카르타헤나의 통신 환경과 추천 플랜." },
      zh: { title: "哥伦比亚eSIM指南 2026", desc: "哥伦比亚旅行eSIM完全指南。波哥大、麦德林、卡塔赫纳的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "chile-esim",
    category: "country",
    countrySlug: "chile",
    content: {
      en: { title: "Chile eSIM Guide 2026", desc: "Best eSIM plans for Chile with advice for Santiago, Atacama, Patagonia and long-distance travel." },
      ja: { title: "チリのeSIMガイド 2026", desc: "チリ旅行のeSIM完全ガイド。サンティアゴ、アタカマ、パタゴニアでの通信環境とおすすめプラン。" },
      ko: { title: "칠레 eSIM 가이드 2026", desc: "칠레 여행용 eSIM 완전 가이드. 산티아고, 아타카마, 파타고니아 지역의 통신 환경과 추천 플랜." },
      zh: { title: "智利eSIM指南 2026", desc: "智利旅行eSIM完全指南。圣地亚哥、阿塔卡马、巴塔哥尼亚的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "netherlands-esim",
    category: "country",
    countrySlug: "netherlands",
    content: {
      en: { title: "Netherlands eSIM Guide 2026", desc: "Best eSIM plans for the Netherlands with coverage tips for Amsterdam, Rotterdam and day trips across the EU." },
      ja: { title: "オランダのeSIMガイド 2026", desc: "オランダ旅行のeSIM完全ガイド。アムステルダム、ロッテルダム、EU周遊での通信環境とおすすめプラン。" },
      ko: { title: "네덜란드 eSIM 가이드 2026", desc: "네덜란드 여행용 eSIM 완전 가이드. 암스테르담, 로테르담, EU 이동 시 통신 환경과 추천 플랜." },
      zh: { title: "荷兰eSIM指南 2026", desc: "荷兰旅行eSIM完全指南。阿姆斯特丹、鹿特丹及EU周边出行的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "belgium-esim",
    category: "country",
    countrySlug: "belgium",
    content: {
      en: { title: "Belgium eSIM Guide 2026", desc: "Best eSIM plans for Belgium covering Brussels, Bruges, Antwerp and easy EU roaming." },
      ja: { title: "ベルギーのeSIMガイド 2026", desc: "ベルギー旅行のeSIM完全ガイド。ブリュッセル、ブルージュ、アントワープの通信環境とEUローミング。" },
      ko: { title: "벨기에 eSIM 가이드 2026", desc: "벨기에 여행용 eSIM 완전 가이드. 브뤼셀, 브뤼헤, 안트베르펜의 통신 환경과 EU 로밍 팁." },
      zh: { title: "比利时eSIM指南 2026", desc: "比利时旅行eSIM完全指南。布鲁塞尔、布鲁日、安特卫普的网络环境与EU漫游建议。" },
    },
  },
  {
    slug: "austria-esim",
    category: "country",
    countrySlug: "austria",
    content: {
      en: { title: "Austria eSIM Guide 2026", desc: "Best eSIM plans for Austria with practical tips for Vienna, Salzburg, Innsbruck and alpine travel." },
      ja: { title: "オーストリアのeSIMガイド 2026", desc: "オーストリア旅行のeSIM完全ガイド。ウィーン、ザルツブルク、インスブルック周辺の通信環境とおすすめプラン。" },
      ko: { title: "오스트리아 eSIM 가이드 2026", desc: "오스트리아 여행용 eSIM 완전 가이드. 빈, 잘츠부르크, 인스브루크 지역의 통신 환경과 추천 플랜." },
      zh: { title: "奥地利eSIM指南 2026", desc: "奥地利旅行eSIM完全指南。维也纳、萨尔茨堡、因斯布鲁克周边的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "ireland-esim",
    category: "country",
    countrySlug: "ireland",
    content: {
      en: { title: "Ireland eSIM Guide 2026", desc: "Best eSIM plans for Ireland with coverage notes for Dublin, Galway, Cork and scenic road trips." },
      ja: { title: "アイルランドのeSIMガイド 2026", desc: "アイルランド旅行のeSIM完全ガイド。ダブリン、ゴールウェイ、コークの通信環境とドライブ旅行のポイント。" },
      ko: { title: "아일랜드 eSIM 가이드 2026", desc: "아일랜드 여행용 eSIM 완전 가이드. 더블린, 골웨이, 코크의 통신 환경과 로드트립 팁." },
      zh: { title: "爱尔兰eSIM指南 2026", desc: "爱尔兰旅行eSIM完全指南。都柏林、戈尔韦、科克的网络环境与自驾出行建议。" },
    },
  },
  {
    slug: "croatia-esim",
    category: "country",
    countrySlug: "croatia",
    content: {
      en: { title: "Croatia eSIM Guide 2026", desc: "Best eSIM plans for Croatia covering Dubrovnik, Split, Zagreb and Adriatic island hopping." },
      ja: { title: "クロアチアのeSIMガイド 2026", desc: "クロアチア旅行のeSIM完全ガイド。ドゥブロヴニク、スプリト、ザグレブの通信環境と島巡り旅行のコツ。" },
      ko: { title: "크로아티아 eSIM 가이드 2026", desc: "크로아티아 여행용 eSIM 완전 가이드. 두브로브니크, 스플리트, 자그레브의 통신 환경과 섬 여행 팁." },
      zh: { title: "克罗地亚eSIM指南 2026", desc: "克罗地亚旅行eSIM完全指南。杜布罗夫尼克、斯普利特、萨格勒布的网络环境与海岛旅行建议。" },
    },
  },
  {
    slug: "czech-republic-esim",
    category: "country",
    countrySlug: "czech-republic",
    content: {
      en: { title: "Czech Republic eSIM Guide 2026", desc: "Best eSIM plans for the Czech Republic with practical coverage info for Prague, Brno and rail travel." },
      ja: { title: "チェコのeSIMガイド 2026", desc: "チェコ旅行のeSIM完全ガイド。プラハ、ブルノ、鉄道移動時の通信環境とおすすめプラン。" },
      ko: { title: "체코 eSIM 가이드 2026", desc: "체코 여행용 eSIM 완전 가이드. 프라하, 브르노, 철도 이동 시 통신 환경과 추천 플랜." },
      zh: { title: "捷克eSIM指南 2026", desc: "捷克旅行eSIM完全指南。布拉格、布尔诺及铁路出行的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "poland-esim",
    category: "country",
    countrySlug: "poland",
    content: {
      en: { title: "Poland eSIM Guide 2026", desc: "Best eSIM plans for Poland with coverage tips for Warsaw, Krakow, Gdansk and regional travel." },
      ja: { title: "ポーランドのeSIMガイド 2026", desc: "ポーランド旅行のeSIM完全ガイド。ワルシャワ、クラクフ、グダニスクの通信環境とおすすめプラン。" },
      ko: { title: "폴란드 eSIM 가이드 2026", desc: "폴란드 여행용 eSIM 완전 가이드. 바르샤바, 크라쿠프, 그단스크의 통신 환경과 추천 플랜." },
      zh: { title: "波兰eSIM指南 2026", desc: "波兰旅行eSIM完全指南。华沙、克拉科夫、格但斯克的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "denmark-esim",
    category: "country",
    countrySlug: "denmark",
    content: {
      en: { title: "Denmark eSIM Guide 2026", desc: "Best eSIM plans for Denmark covering Copenhagen, Aarhus, Odense and Nordic travel." },
      ja: { title: "デンマークのeSIMガイド 2026", desc: "デンマーク旅行のeSIM完全ガイド。コペンハーゲン、オーフス、オーデンセの通信環境と北欧周遊のポイント。" },
      ko: { title: "덴마크 eSIM 가이드 2026", desc: "덴마크 여행용 eSIM 완전 가이드. 코펜하겐, 오르후스, 오덴세의 통신 환경과 북유럽 이동 팁." },
      zh: { title: "丹麦eSIM指南 2026", desc: "丹麦旅行eSIM完全指南。哥本哈根、奥胡斯、欧登塞的网络环境与北欧出行建议。" },
    },
  },
  {
    slug: "sweden-esim",
    category: "country",
    countrySlug: "sweden",
    content: {
      en: { title: "Sweden eSIM Guide 2026", desc: "Best eSIM plans for Sweden with coverage notes for Stockholm, Gothenburg, Lapland and train travel." },
      ja: { title: "スウェーデンのeSIMガイド 2026", desc: "スウェーデン旅行のeSIM完全ガイド。ストックホルム、ヨーテボリ、ラップランド周辺の通信環境とおすすめプラン。" },
      ko: { title: "스웨덴 eSIM 가이드 2026", desc: "스웨덴 여행용 eSIM 완전 가이드. 스톡홀름, 예테보리, 라플란드 지역의 통신 환경과 추천 플랜." },
      zh: { title: "瑞典eSIM指南 2026", desc: "瑞典旅行eSIM完全指南。斯德哥尔摩、哥德堡、拉普兰地区的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "finland-esim",
    category: "country",
    countrySlug: "finland",
    content: {
      en: { title: "Finland eSIM Guide 2026", desc: "Best eSIM plans for Finland covering Helsinki, Rovaniemi, Lapland and winter travel connectivity." },
      ja: { title: "フィンランドのeSIMガイド 2026", desc: "フィンランド旅行のeSIM完全ガイド。ヘルシンキ、ロヴァニエミ、ラップランド周辺の通信環境と冬旅の注意点。" },
      ko: { title: "핀란드 eSIM 가이드 2026", desc: "핀란드 여행용 eSIM 완전 가이드. 헬싱키, 로바니에미, 라플란드 지역의 통신 환경과 겨울 여행 팁." },
      zh: { title: "芬兰eSIM指南 2026", desc: "芬兰旅行eSIM完全指南。赫尔辛基、罗瓦涅米、拉普兰地区的网络环境与冬季出行建议。" },
    },
  },
  {
    slug: "egypt-esim",
    category: "country",
    countrySlug: "egypt",
    content: {
      en: { title: "Egypt eSIM Guide 2026", desc: "Best eSIM plans for Egypt with practical advice for Cairo, Luxor, Aswan, Sharm El Sheikh and the desert." },
      ja: { title: "エジプトのeSIMガイド 2026", desc: "エジプト旅行のeSIM完全ガイド。カイロ、ルクソール、アスワン、シャルムエルシェイクでの通信環境とおすすめプラン。" },
      ko: { title: "이집트 eSIM 가이드 2026", desc: "이집트 여행용 eSIM 완전 가이드. 카이로, 룩소르, 아스완, 샤름엘셰이크의 통신 환경과 추천 플랜." },
      zh: { title: "埃及eSIM指南 2026", desc: "埃及旅行eSIM完全指南。开罗、卢克索、阿斯旺、沙姆沙伊赫的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "south-africa-esim",
    category: "country",
    countrySlug: "south-africa",
    content: {
      en: { title: "South Africa eSIM Guide 2026", desc: "Best eSIM plans for South Africa covering Cape Town, Johannesburg, safari routes and scenic drives." },
      ja: { title: "南アフリカのeSIMガイド 2026", desc: "南アフリカ旅行のeSIM完全ガイド。ケープタウン、ヨハネスブルグ、サファリ移動時の通信環境とおすすめプラン。" },
      ko: { title: "남아프리카공화국 eSIM 가이드 2026", desc: "남아프리카 여행용 eSIM 완전 가이드. 케이프타운, 요하네스버그, 사파리 이동 시 통신 환경과 추천 플랜." },
      zh: { title: "南非eSIM指南 2026", desc: "南非旅行eSIM完全指南。开普敦、约翰内斯堡、野生动物园路线的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "kenya-esim",
    category: "country",
    countrySlug: "kenya",
    content: {
      en: { title: "Kenya eSIM Guide 2026", desc: "Best eSIM plans for Kenya with connectivity tips for Nairobi, Maasai Mara, Mombasa and safari travel." },
      ja: { title: "ケニアのeSIMガイド 2026", desc: "ケニア旅行のeSIM完全ガイド。ナイロビ、マサイマラ、モンバサでの通信環境とサファリ旅行のポイント。" },
      ko: { title: "케냐 eSIM 가이드 2026", desc: "케냐 여행용 eSIM 완전 가이드. 나이로비, 마사이마라, 몸바사의 통신 환경과 사파리 팁." },
      zh: { title: "肯尼亚eSIM指南 2026", desc: "肯尼亚旅行eSIM完全指南。内罗毕、马赛马拉、蒙巴萨的网络环境与Safari出行建议。" },
    },
  },
  {
    slug: "qatar-esim",
    category: "country",
    countrySlug: "qatar",
    content: {
      en: { title: "Qatar eSIM Guide 2026", desc: "Best eSIM plans for Qatar with coverage notes for Doha, airport transit stays and desert excursions." },
      ja: { title: "カタールのeSIMガイド 2026", desc: "カタール旅行のeSIM完全ガイド。ドーハ、空港トランジット、砂漠ツアー時の通信環境とおすすめプラン。" },
      ko: { title: "카타르 eSIM 가이드 2026", desc: "카타르 여행용 eSIM 완전 가이드. 도하, 공항 환승, 사막 투어 시 통신 환경과 추천 플랜." },
      zh: { title: "卡塔尔eSIM指南 2026", desc: "卡塔尔旅行eSIM完全指南。多哈、机场转机、沙漠行程的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "saudi-arabia-esim",
    category: "country",
    countrySlug: "saudi-arabia",
    content: {
      en: { title: "Saudi Arabia eSIM Guide 2026", desc: "Best eSIM plans for Saudi Arabia covering Riyadh, Jeddah, Madinah and long-distance travel." },
      ja: { title: "サウジアラビアのeSIMガイド 2026", desc: "サウジアラビア旅行のeSIM完全ガイド。リヤド、ジェッダ、メディナ周辺の通信環境とおすすめプラン。" },
      ko: { title: "사우디아라비아 eSIM 가이드 2026", desc: "사우디아라비아 여행용 eSIM 완전 가이드. 리야드, 제다, 메디나의 통신 환경과 추천 플랜." },
      zh: { title: "沙特阿拉伯eSIM指南 2026", desc: "沙特旅行eSIM完全指南。利雅得、吉达、麦地那周边的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "nepal-esim",
    category: "country",
    countrySlug: "nepal",
    content: {
      en: { title: "Nepal eSIM Guide 2026", desc: "Best eSIM plans for Nepal with practical tips for Kathmandu, Pokhara, trekking routes and mountain regions." },
      ja: { title: "ネパールのeSIMガイド 2026", desc: "ネパール旅行のeSIM完全ガイド。カトマンズ、ポカラ、トレッキングルート周辺の通信環境とおすすめプラン。" },
      ko: { title: "네팔 eSIM 가이드 2026", desc: "네팔 여행용 eSIM 완전 가이드. 카트만두, 포카라, 트레킹 루트 주변의 통신 환경과 추천 플랜." },
      zh: { title: "尼泊尔eSIM指南 2026", desc: "尼泊尔旅行eSIM完全指南。加德满都、博卡拉、徒步路线周边的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "macau-esim",
    category: "country",
    countrySlug: "macau",
    content: {
      en: { title: "Macau eSIM Guide 2026", desc: "Best eSIM plans for Macau with coverage notes for Cotai, historic center and Hong Kong side trips." },
      ja: { title: "マカオのeSIMガイド 2026", desc: "マカオ旅行のeSIM完全ガイド。コタイ地区、世界遺産エリア、香港日帰り旅行での通信環境とおすすめプラン。" },
      ko: { title: "마카오 eSIM 가이드 2026", desc: "마카오 여행용 eSIM 완전 가이드. 코타이, 역사 지구, 홍콩 당일치기 시 통신 환경과 추천 플랜." },
      zh: { title: "澳门eSIM指南 2026", desc: "澳门旅行eSIM完全指南。路氹、历史城区、香港往返行程的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "cheapest-esim-plans",
    category: "topic",
    content: {
      en: { title: "Cheapest eSIM Plans for Travelers 2026", desc: "How to find genuinely cheap eSIM plans without sacrificing coverage, speed or activation reliability." },
      ja: { title: "格安eSIMプラン比較 2026", desc: "安いだけで失敗しないeSIM選び。料金、通信品質、設定のしやすさまで比較する節約ガイド。" },
      ko: { title: "가장 저렴한 eSIM 플랜 비교 2026", desc: "단순히 싼 것만 고르지 않는 eSIM 절약 가이드. 가격, 품질, 설정 편의성까지 비교합니다." },
      zh: { title: "便宜eSIM套餐对比 2026", desc: "如何找到真正划算的eSIM，而不是只看价格。覆盖、速度、开通稳定性一起比较。" },
    },
  },
  {
    slug: "best-esim-for-europe",
    category: "topic",
    content: {
      en: { title: "Best eSIM for Europe Travel 2026", desc: "Compare the best Europe eSIM options for multi-country trips, rail travel, city breaks and longer stays." },
      ja: { title: "ヨーロッパ旅行におすすめのeSIM 2026", desc: "周遊旅行、鉄道移動、都市滞在に強いヨーロッパ向けeSIMを比較する完全ガイド。" },
      ko: { title: "유럽 여행 추천 eSIM 2026", desc: "다국가 이동, 기차 여행, 도시 여행에 강한 유럽용 eSIM을 비교하는 가이드." },
      zh: { title: "欧洲旅行最佳eSIM 2026", desc: "适合多国周游、铁路旅行和城市短途的欧洲eSIM对比指南。" },
    },
  },
  {
    slug: "best-esim-for-asia",
    category: "topic",
    content: {
      en: { title: "Best eSIM for Asia Travel 2026", desc: "Compare the best Asia eSIM plans for single-country trips, regional hopping and long backpacking routes." },
      ja: { title: "アジア旅行におすすめのeSIM 2026", desc: "単国旅行から周遊まで対応できるアジア向けeSIMを比較する完全ガイド。" },
      ko: { title: "아시아 여행 추천 eSIM 2026", desc: "단일 국가 여행부터 아시아 여러 나라 이동까지 대응하는 eSIM 비교 가이드." },
      zh: { title: "亚洲旅行最佳eSIM 2026", desc: "适合单国旅行、多国周游和背包客路线的亚洲eSIM对比指南。" },
    },
  },
  {
    slug: "esim-vs-airport-sim",
    category: "topic",
    content: {
      en: { title: "eSIM vs Airport SIM Card 2026", desc: "Which is better for travelers: buying an eSIM before departure or waiting for an airport SIM card on arrival?" },
      ja: { title: "eSIM vs 空港SIMカード 2026", desc: "出発前にeSIMを買うべきか、到着後に空港SIMを買うべきかを比較する旅行者向けガイド。" },
      ko: { title: "eSIM vs 공항 유심 2026", desc: "출발 전에 eSIM을 살지, 도착 후 공항 유심을 살지 비교하는 여행자 가이드." },
      zh: { title: "eSIM vs 机场SIM卡 2026", desc: "出发前买eSIM，还是落地后买机场SIM卡？旅行者视点的完整对比。" },
    },
  },
  {
    slug: "esim-hotspot-tethering",
    category: "howto",
    content: {
      en: { title: "eSIM Hotspot & Tethering Guide 2026", desc: "How to use tethering with travel eSIM plans, avoid restrictions and share data with your laptop or tablet." },
      ja: { title: "eSIMテザリング完全ガイド 2026", desc: "旅行用eSIMでテザリングを使う方法、制限の見方、PCやタブレットへ共有するコツを解説。" },
      ko: { title: "eSIM 테더링 가이드 2026", desc: "여행용 eSIM에서 핫스팟을 사용하는 방법과 제한 확인, 노트북 공유 팁을 정리했습니다." },
      zh: { title: "eSIM热点共享指南 2026", desc: "如何在旅行eSIM上使用热点、识别限制，并把流量共享给电脑或平板。" },
    },
  },
  {
    slug: "how-much-data-do-i-need-for-travel",
    category: "howto",
    content: {
      en: { title: "How Much Data Do I Need for Travel? 2026", desc: "Estimate your travel data needs for maps, social media, video calls, remote work and long trips abroad." },
      ja: { title: "海外旅行に必要なデータ容量の目安 2026", desc: "地図、SNS、動画通話、リモートワーク別に、旅行中に必要なデータ量を見積もるガイド。" },
      ko: { title: "해외여행 데이터 얼마나 필요할까? 2026", desc: "지도, SNS, 영상통화, 원격근무 기준으로 필요한 데이터 용량을 계산하는 가이드." },
      zh: { title: "旅行到底需要多少流量？2026", desc: "按地图、社交媒体、视频通话、远程工作等场景估算出国旅行所需流量。" },
    },
  },
  {
    slug: "esim-for-backpackers",
    category: "topic",
    content: {
      en: { title: "Best eSIM for Backpackers 2026", desc: "The best travel eSIM strategies for backpackers moving across borders, hostels and budget itineraries." },
      ja: { title: "バックパッカー向けeSIMガイド 2026", desc: "周遊旅行や長期移動が多いバックパッカー向けに、eSIM選びと節約術をまとめたガイド。" },
      ko: { title: "백패커를 위한 eSIM 가이드 2026", desc: "국경 이동이 많은 백패커를 위한 eSIM 선택법과 비용 절약 팁을 정리했습니다." },
      zh: { title: "背包客eSIM指南 2026", desc: "适合跨境移动、住青旅和预算旅行的背包客eSIM选择与省钱策略。" },
    },
  },
  {
    slug: "esim-for-road-trips",
    category: "topic",
    content: {
      en: { title: "Best eSIM for Road Trips 2026", desc: "How to choose a travel eSIM for road trips, car navigation, scenic routes and remote stretches with weaker coverage." },
      ja: { title: "ロードトリップ向けeSIMガイド 2026", desc: "ドライブ旅行やレンタカー旅で失敗しないeSIM選び。ナビ利用や郊外走行を想定したガイド。" },
      ko: { title: "로드트립용 eSIM 가이드 2026", desc: "자동차 여행과 렌터카 이동에서 실패하지 않는 eSIM 선택법. 내비와 외곽 지역 커버리지 중심 가이드." },
      zh: { title: "自驾旅行eSIM指南 2026", desc: "适合租车、自驾和郊外路线的eSIM选择指南，重点看导航和弱覆盖地区表现。" },
    },
  },
  {
    slug: "esim-for-solo-travel",
    category: "topic",
    content: {
      en: { title: "Best eSIM for Solo Travel 2026", desc: "Reliable eSIM tips for solo travelers who need maps, translation, ride-hailing and constant safety connectivity." },
      ja: { title: "一人旅向けeSIMガイド 2026", desc: "地図、翻訳、配車アプリ、安全確保まで一人旅で重視したい通信環境を整えるeSIMガイド。" },
      ko: { title: "혼자 여행할 때 좋은 eSIM 가이드 2026", desc: "지도, 번역, 차량 호출, 안전 연락까지 혼행에서 중요한 통신 환경을 위한 eSIM 가이드." },
      zh: { title: "独自旅行eSIM指南 2026", desc: "面向独自出行旅客的eSIM建议，重点是地图、翻译、打车和安全联络。" },
    },
  },
  {
    slug: "esim-for-honeymoon",
    category: "topic",
    content: {
      en: { title: "Best eSIM for Honeymoon Travel 2026", desc: "How to pick the right eSIM for honeymoons, resort stays, island trips and effortless photo sharing." },
      ja: { title: "ハネムーン向けeSIMガイド 2026", desc: "リゾート滞在や島旅でも快適につながる、ハネムーン旅行向けeSIMの選び方ガイド。" },
      ko: { title: "허니문 여행용 eSIM 가이드 2026", desc: "리조트 숙박과 섬 여행에서도 편하게 연결되는 허니문용 eSIM 선택 가이드." },
      zh: { title: "蜜月旅行eSIM指南 2026", desc: "适合度假村、海岛和轻松分享照片的蜜月旅行eSIM选择指南。" },
    },
  },
  {
    slug: "esim-qr-code-not-working",
    category: "howto",
    content: {
      en: { title: "eSIM QR Code Not Working? Fix Guide 2026", desc: "What to do when your eSIM QR code will not scan, installs fail, or you need a manual activation workaround." },
      ja: { title: "eSIMのQRコードが読み取れない時の対処法 2026", desc: "eSIMのQRコードが読み取れない、インストールできない時の原因と対処法をまとめたサポートガイド。" },
      ko: { title: "eSIM QR 코드가 안 읽힐 때 해결 가이드 2026", desc: "eSIM QR 코드가 스캔되지 않거나 설치가 실패할 때 확인할 원인과 해결 방법을 정리한 가이드." },
      zh: { title: "eSIM二维码无法扫描时的解决指南 2026", desc: "当eSIM二维码无法识别、安装失败时，该如何排查与处理的实用指南。" },
    },
  },
  {
    slug: "esim-install-before-travel",
    category: "howto",
    content: {
      en: { title: "Should You Install eSIM Before Travel? 2026", desc: "Learn the safest timing to install your travel eSIM before departure without wasting plan validity." },
      ja: { title: "eSIMは旅行前にインストールすべき？ 2026", desc: "出発前にeSIMを入れてよいのか、有効期間を無駄にしない準備の進め方を解説するガイド。" },
      ko: { title: "eSIM은 여행 전에 설치해야 할까? 2026", desc: "출발 전에 eSIM을 설치해도 되는지, 유효기간을 낭비하지 않는 준비 방법을 정리한 가이드." },
      zh: { title: "eSIM需要在出发前安装吗？2026", desc: "出发前是否应该先安装eSIM，以及如何在不浪费有效期的前提下安全准备的指南。" },
    },
  },
  {
    slug: "nomad-review",
    category: "topic",
    content: {
      en: { title: "Nomad eSIM Review 2026", desc: "A practical review of Nomad eSIM pricing, strengths, limits, and when it makes sense for travel." },
      ja: { title: "Nomad eSIMレビュー・評判 2026", desc: "Nomad eSIMの料金、強み、注意点、どんな旅行者に向いているかを整理したレビュー記事。" },
      ko: { title: "Nomad eSIM 리뷰·평판 2026", desc: "Nomad eSIM의 가격, 장점, 주의점과 어떤 여행자에게 맞는지 정리한 리뷰." },
      zh: { title: "Nomad eSIM评测 2026", desc: "围绕Nomad eSIM的价格、优势、限制以及适合哪些旅行者的实用评测。" },
    },
  },
  {
    slug: "ubigi-review",
    category: "topic",
    content: {
      en: { title: "Ubigi Review 2026", desc: "Ubigi pricing, app experience, strengths, weaknesses, and how it compares for travel eSIM use." },
      ja: { title: "Ubigiレビュー・評判 2026", desc: "Ubigiの料金、使い勝手、メリット・デメリット、旅行用eSIMとしての比較ポイントをまとめた記事。" },
      ko: { title: "Ubigi 리뷰·평판 2026", desc: "Ubigi의 요금, 사용성, 장단점과 여행용 eSIM으로서의 비교 포인트를 정리한 리뷰." },
      zh: { title: "Ubigi评测 2026", desc: "介绍Ubigi的价格、应用体验、优缺点，以及作为旅行eSIM时该如何比较的评测文章。" },
    },
  },
];

export const EXTRA_GUIDE_SLUGS = EXTRA_GUIDES.map((guide) => guide.slug);

export const EXTRA_GUIDE_COUNTRY_MAP = Object.fromEntries(
  EXTRA_GUIDES.filter((guide) => guide.countrySlug).map((guide) => [
    guide.slug,
    guide.countrySlug as string,
  ])
);

export function getExtraGuideItems(locale: GuideLocale) {
  return EXTRA_GUIDES.map((guide) => ({
    slug: guide.slug,
    category: guide.category,
    ...(guide.content[locale] ?? guide.content.en),
  }));
}

export function getExtraGuideContent(slug: string, locale: GuideLocale) {
  const guide = EXTRA_GUIDES.find((item) => item.slug === slug);
  if (!guide) return null;
  return guide.content[locale] ?? guide.content.en;
}
