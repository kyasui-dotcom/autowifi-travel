import { MINOR_GUIDE_CANON } from "./minorGuideCanon";

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
    slug: "best-esim-for-southeast-asia",
    category: "topic",
    content: {
      en: { title: "Best eSIM for Southeast Asia Travel 2026", desc: "Compare the best eSIM options for Thailand, Vietnam, Singapore, Malaysia, Indonesia, and Philippines trips across Southeast Asia." },
      ja: { title: "東南アジア旅行におすすめのeSIM 2026", desc: "タイ、ベトナム、シンガポール、マレーシア、インドネシア、フィリピン周遊で比較したい東南アジア向けeSIMガイド。" },
      ko: { title: "동남아 여행 추천 eSIM 2026", desc: "태국, 베트남, 싱가포르, 말레이시아, 인도네시아, 필리핀 여행에 맞는 동남아 eSIM 비교 가이드." },
      zh: { title: "东南亚旅行最佳eSIM 2026", desc: "面向泰国、越南、新加坡、马来西亚、印尼、菲律宾行程的东南亚eSIM对比指南。" },
    },
  },
  {
    slug: "travel-esim-with-phone-number",
    category: "howto",
    content: {
      en: { title: "Travel eSIM with a Phone Number 2026", desc: "Do travel eSIM plans include a phone number? Learn when you need one, when data-only works, and how travelers handle calls abroad." },
      ja: { title: "電話番号付き旅行eSIMは必要？ 2026", desc: "旅行用eSIMに電話番号は必要か、データ専用で足りる場面と通話が必要になる場面を整理するガイド。" },
      ko: { title: "전화번호가 있는 여행 eSIM이 필요할까? 2026", desc: "여행용 eSIM에 전화번호가 꼭 필요한지, 데이터 전용으로 충분한 경우와 통화가 필요한 경우를 정리한 가이드." },
      zh: { title: "旅行eSIM需要电话号码吗？2026", desc: "梳理旅行eSIM是否需要本地号码、纯数据何时够用、以及旅途中如何处理通话需求。" },
    },
  },
  {
    slug: "esim-fair-use-policy",
    category: "howto",
    content: {
      en: { title: "eSIM Fair Use Policy Explained 2026", desc: "Understand what fair use means on unlimited eSIM plans, when speeds may slow down, and how to avoid buying the wrong travel package." },
      ja: { title: "eSIMのフェアユースとは？ 2026", desc: "無制限eSIMのフェアユース、速度制限がかかる場面、買う前に確認したい注意点を整理したガイド。" },
      ko: { title: "eSIM 페어유즈 정책이란? 2026", desc: "무제한 eSIM의 페어유즈와 속도 제한이 걸리는 상황, 구매 전에 확인해야 할 포인트를 정리한 가이드." },
      zh: { title: "eSIM公平使用政策是什么？2026", desc: "解释无限流量eSIM中的公平使用、何时会被限速，以及购买前最该确认的细节。" },
    },
  },
  {
    slug: "regional-esim-vs-country-esim",
    category: "topic",
    content: {
      en: { title: "Regional eSIM vs Country eSIM 2026", desc: "Should you buy a regional travel eSIM or a single-country plan? Compare cost, flexibility, coverage, and trip scenarios before you book." },
      ja: { title: "地域eSIM vs 国別eSIM 2026", desc: "周遊向けの地域eSIMと単国向けeSIMの違いを、価格、柔軟性、カバレッジ、旅程別に比較するガイド。" },
      ko: { title: "지역 eSIM vs 국가별 eSIM 2026", desc: "다국가용 지역 eSIM과 단일 국가 eSIM의 차이를 가격, 유연성, 커버리지, 여행 시나리오별로 비교합니다." },
      zh: { title: "区域eSIM vs 单国eSIM 2026", desc: "从价格、灵活性、覆盖范围和旅行场景比较区域eSIM与单国eSIM，帮助你在出发前做选择。" },
    },
  },
  {
    slug: "esim-vs-hotel-wifi",
    category: "topic",
    content: {
      en: { title: "eSIM vs Hotel Wi-Fi for Travel 2026", desc: "Compare mobile eSIM data with hotel Wi-Fi for video calls, maps, ride-hailing, backup internet, and late-night arrivals." },
      ja: { title: "eSIM vs ホテルWi‑Fi 2026", desc: "地図、配車、ビデオ通話、バックアップ回線、深夜到着まで見据えて、eSIMとホテルWi‑Fiを比較する旅行ガイド。" },
      ko: { title: "eSIM vs 호텔 Wi‑Fi 2026", desc: "지도, 차량 호출, 화상회의, 백업 회선, 심야 도착 상황까지 고려해 eSIM과 호텔 Wi‑Fi를 비교하는 가이드." },
      zh: { title: "eSIM vs 酒店Wi‑Fi 2026", desc: "围绕地图、打车、视频通话、备用网络和深夜抵达场景，对比eSIM与酒店Wi‑Fi的旅行指南。" },
    },
  },
  {
    slug: "yanaka-nezu-sendagi-walk",
    category: "topic",
    content: {
      en: { title: "Yanaka, Nezu, and Sendagi Half-Day Walk 2026", desc: "A slower half-day Tokyo route through Yanaka, Nezu, and Sendagi for travelers who want old-town streets, shrine stops, cafes, and a calmer pace." },
      ja: { title: "谷中・根津・千駄木の半日街歩きガイド 2026", desc: "谷中・根津・千駄木を半日でゆるく回る、静かな東京街歩きのための実用ガイド。" },
      ko: { title: "야나카·네즈·센다기 반나절 산책 가이드 2026", desc: "야나카·네즈·센다기를 반나절에 천천히 걷는 조용한 도쿄 산책 가이드." },
      zh: { title: "谷中·根津·千驮木半日散步指南 2026", desc: "适合慢慢走的东京半日路线，串起谷中、根津与千驮木的安静街区。" },
    },
  },
  {
    slug: "kiyosumi-shirakawa-walk",
    category: "topic",
    content: {
      en: { title: "Kiyosumi-Shirakawa Coffee and Gallery Walk 2026", desc: "A practical guide to Kiyosumi-Shirakawa for travelers who want coffee stops, small galleries, slower streets, and a calm half-day in Tokyo." },
      ja: { title: "清澄白河のコーヒーとギャラリー街歩き 2026", desc: "清澄白河でコーヒー、ギャラリー、庭園まわりの静かな時間を組み立てる街歩きガイド。" },
      ko: { title: "기요스미시라카와 커피와 갤러리 산책 2026", desc: "커피, 작은 갤러리, 느린 거리 풍경을 즐기기 위한 기요스미시라카와 산책 가이드." },
      zh: { title: "清澄白河咖啡与画廊散步指南 2026", desc: "适合在东京安排慢节奏半日行的清澄白河街区散步指南。" },
    },
  },
  {
    slug: "kuramae-walk",
    category: "topic",
    content: {
      en: { title: "Kuramae Walk for Stationery, Ceramics, and Bakeries 2026", desc: "A low-key Kuramae guide for travelers who want stationery shops, ceramics, bakeries, and a calmer shopping walk near Asakusa." },
      ja: { title: "蔵前の文具と器とベーカリー街歩き 2026", desc: "蔵前で文具、器、ベーカリー、小さな店を静かに回るための街歩きガイド。" },
      ko: { title: "구라마에 문구·도자기·베이커리 산책 2026", desc: "아사쿠사 근처에서 조용하게 문구점, 도자기 가게, 베이커리를 둘러보는 구라마에 가이드." },
      zh: { title: "藏前文具、器物与面包店散步指南 2026", desc: "适合慢慢逛小店、文具、器皿和烘焙店的藏前街区指南。" },
    },
  },
  {
    slug: "tokyo-tram-line-stops",
    category: "topic",
    content: {
      en: { title: "Quiet Tokyo Tram-Line Stops Guide 2026", desc: "A guide to calmer Tokyo neighborhoods along the tram line, useful for travelers who want a more local-feeling city walk." },
      ja: { title: "都電沿線の静かな東京街歩き 2026", desc: "都電沿線の静かな街をつないで歩きたい人向けの、少しローカル寄りの東京散歩ガイド。" },
      ko: { title: "도덴 노선 따라 걷는 조용한 도쿄 2026", desc: "도덴 전차 노선을 따라 조금 더 로컬한 도쿄 산책을 즐기고 싶은 여행자를 위한 가이드." },
      zh: { title: "都电沿线的安静东京散步指南 2026", desc: "面向想走一条更本地、更安静东京路线的旅行者。" },
    },
  },
  {
    slug: "rainy-day-tokyo-neighborhoods",
    category: "topic",
    content: {
      en: { title: "Rainy-Day Tokyo Neighborhoods Guide 2026", desc: "Where to walk in Tokyo when the weather turns wet: calmer neighborhoods, covered streets, cafe-heavy routes, and low-stress half-day ideas." },
      ja: { title: "雨の日の東京街歩きガイド 2026", desc: "雨の日でも歩きやすい静かな街、喫茶や商店街を組み合わせた東京街歩きガイド。" },
      ko: { title: "비 오는 날 도쿄 산책 가이드 2026", desc: "비 오는 날에도 걷기 좋은 조용한 동네와 카페, 상점가를 묶은 도쿄 가이드." },
      zh: { title: "雨天东京街区散步指南 2026", desc: "适合下雨天的东京安静街区、咖啡馆路线和低压力半日行建议。" },
    },
  },
  {
    slug: "quiet-tokyo-neighborhoods",
    category: "topic",
    content: {
      en: { title: "Quiet Tokyo Neighborhoods Guide 2026", desc: "A slower Tokyo guide for travelers who want calm streets, small shops, coffee stops, and walkable neighborhoods beyond the busiest districts." },
      ja: { title: "静かな東京の街歩きガイド 2026", desc: "大通りの定番観光ではなく、落ち着いた路地、小さな個人店、喫茶や散歩を楽しみたい人向けの東京街歩きガイド。" },
      ko: { title: "조용한 도쿄 골목 산책 가이드 2026", desc: "복잡한 핵심 관광지보다 차분한 골목, 작은 가게, 카페와 산책을 즐기고 싶은 여행자를 위한 도쿄 가이드." },
      zh: { title: "安静东京街区散步指南 2026", desc: "适合想避开最拥挤景点，去慢慢逛小店、咖啡馆和安静街区的东京旅行者。" },
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
  {
    slug: "nishi-nippori-yanaka-walk",
    category: "topic",
    content: {
      en: { title: "Nishi-Nippori to Yanaka Walk Guide 2026", desc: "A practical half-day route from low-key Nishi-Nippori into Yanaka for travelers who want calmer station access, side streets, and an easy old-Tokyo finish." },
      ja: { title: "西日暮里から谷中へ歩く半日ガイド 2026", desc: "西日暮里の落ち着いた入口から谷中へ抜ける、外国人旅行者向けの実用的な半日街歩きガイド。" },
      ko: { title: "니시닛포리에서 야나카까지 걷는 반나절 가이드 2026", desc: "차분한 니시닛포리에서 시작해 야나카로 이어지는 실용적인 도쿄 반나절 산책 가이드." },
      zh: { title: "西日暮里到谷中的半日步行指南 2026", desc: "从更安静的西日暮里进入谷中的实用东京半日路线，适合外国游客。" },
    },
  },
  {
    slug: "sendagi-yomise-dori-walk",
    category: "topic",
    content: {
      en: { title: "Sendagi and Yomise-dori Walk Guide 2026", desc: "A rain-friendly or low-pressure Tokyo route through Sendagi backstreets and Yomise-dori for travelers who want older shopping streets without major crowds." },
      ja: { title: "千駄木とよみせ通りの街歩きガイド 2026", desc: "千駄木の路地とよみせ通り商店街をつなぐ、雨の日にも使いやすい東京散歩ガイド。" },
      ko: { title: "센다기와 요미세도리 산책 가이드 2026", desc: "센다기 골목과 요미세도리 상점가를 잇는, 비 오는 날에도 쓰기 좋은 도쿄 산책 가이드." },
      zh: { title: "千驮木与Yomise-dori散步指南 2026", desc: "串联千驮木小巷与Yomise-dori商店街的低压力东京路线，也适合雨天。" },
    },
  },
  {
    slug: "morishita-kiyosumi-walk",
    category: "topic",
    content: {
      en: { title: "Morishita to Kiyosumi-Shirakawa Walk Guide 2026", desc: "A slower east-Tokyo half day linking Morishita and Kiyosumi-Shirakawa for coffee stops, river air, and a calmer neighborhood pace." },
      ja: { title: "森下から清澄白河へ歩く半日ガイド 2026", desc: "森下から清澄白河へつなぐ、喫茶や水辺を楽しみたい人向けの東東京半日散歩ガイド。" },
      ko: { title: "모리시타에서 기요스미시라카와까지 반나절 가이드 2026", desc: "커피, 수변, 느린 동네 분위기를 즐기기 위한 도쿄 동쪽 반나절 산책 가이드." },
      zh: { title: "森下到清澄白河半日步行指南 2026", desc: "串联咖啡停留、水边空气与慢节奏街区的东京东侧半日路线。" },
    },
  },
  {
    slug: "ryogoku-kuramae-walk",
    category: "topic",
    content: {
      en: { title: "Ryogoku to Kuramae Walk Guide 2026", desc: "A practical east-Tokyo route from Ryogoku toward Kuramae for bridge views, craft stops, and a lower-key alternative to denser sightseeing districts." },
      ja: { title: "両国から蔵前へ歩く半日ガイド 2026", desc: "橋の景色と蔵前の小さな店をつなぐ、東東京の少し落ち着いた半日街歩きガイド。" },
      ko: { title: "료고쿠에서 구라마에까지 걷는 반나절 가이드 2026", desc: "다리 풍경과 작은 가게를 잇는, 조금 더 차분한 도쿄 동쪽 반나절 산책 가이드." },
      zh: { title: "两国到藏前半日步行指南 2026", desc: "连接桥边风景与藏前小店的东京东侧低压力半日路线。" },
    },
  },
  {
    slug: "machiya-arakawa-tram-walk",
    category: "topic",
    content: {
      en: { title: "Machiya and Arakawa Tram Walk Guide 2026", desc: "A local-feeling north-east Tokyo half day around Machiya and the tram line for travelers who want a quieter route with streetcar atmosphere." },
      ja: { title: "町屋と荒川の都電街歩きガイド 2026", desc: "町屋と都電沿線をつなぐ、少しローカルな北東東京の半日街歩きガイド。" },
      ko: { title: "마치야와 아라카와 도덴 산책 가이드 2026", desc: "노면전차 분위기와 조용한 동네를 함께 느끼는 북동도쿄 반나절 가이드." },
      zh: { title: "町屋与荒川都电散步指南 2026", desc: "适合想体验路面电车氛围与安静街区的东京东北侧半日路线。" },
    },
  },
  {
    slug: "ueno-to-yanaka-walk",
    category: "topic",
    content: {
      en: { title: "Ueno to Yanaka Walk Guide 2026", desc: "A practical half-day route from busy Ueno into calmer Yanaka for travelers who want museums, side streets, and an easier old-Tokyo finish." },
      ja: { title: "上野から谷中へ歩く半日ガイド 2026", desc: "にぎやかな上野から静かな谷中へ抜ける、外国人旅行者向けの実用的な半日街歩きガイド。" },
      ko: { title: "우에노에서 야나카까지 걷는 반나절 가이드 2026", desc: "붐비는 우에노에서 더 조용한 야나카로 이어지는 실용적인 도쿄 반나절 산책 가이드." },
      zh: { title: "上野到谷中的半日步行指南 2026", desc: "从热闹的上野走到更安静谷中的实用东京半日路线，适合外国游客。" },
    },
  },
  {
    slug: "nezu-sendagi-morning-walk",
    category: "topic",
    content: {
      en: { title: "Nezu and Sendagi Morning Walk Guide 2026", desc: "A lower-key morning route through Nezu Shrine, Sendagi side streets, and older shopping streets before central Tokyo gets busy." },
      ja: { title: "根津と千駄木の朝散歩ガイド 2026", desc: "根津神社、千駄木の路地、昔ながらの商店街をつなぐ、朝向きの静かな東京街歩きガイド。" },
      ko: { title: "네즈와 센다기 아침 산책 가이드 2026", desc: "네즈 신사와 센다기 골목, 오래된 상점가를 잇는 조용한 도쿄 아침 산책 가이드." },
      zh: { title: "根津与千驮木晨间散步指南 2026", desc: "串联根津神社、千驮木小巷与老商店街的安静东京晨间路线。" },
    },
  },
  {
    slug: "monzen-nakacho-fukagawa-walk",
    category: "topic",
    content: {
      en: { title: "Monzen-Nakacho and Fukagawa Walk 2026", desc: "A practical slow-Tokyo route for temple approaches, river edges, and quieter east-side streets around Monzen-Nakacho and Fukagawa." },
      ja: { title: "門前仲町と深川の半日街歩き 2026", desc: "寺町の参道、水辺、下町の落ち着いた通りをつなぐ、門前仲町と深川の実用的な半日散歩ガイド。" },
      ko: { title: "몬젠나카초와 후카가와 반나절 산책 2026", desc: "절 주변 거리와 수변, 차분한 도쿄 동쪽 골목을 잇는 몬젠나카초·후카가와 가이드." },
      zh: { title: "门前仲町与深川半日散步指南 2026", desc: "适合想走寺院参道、水边与东京东侧安静街道的实用半日路线。" },
    },
  },
  {
    slug: "asakusa-kuramae-sumida-walk",
    category: "topic",
    content: {
      en: { title: "Asakusa, Kuramae, and Sumida River Walk 2026", desc: "A calmer route that uses Asakusa as a starting point, then shifts into Kuramae backstreets and Sumida riverside walking." },
      ja: { title: "浅草・蔵前・隅田川の街歩きガイド 2026", desc: "浅草を起点にしながら、蔵前の裏通りと隅田川沿いへ抜ける少し静かな半日ルート。" },
      ko: { title: "아사쿠사·구라마에·스미다강 산책 2026", desc: "아사쿠사에서 시작해 구라마에 골목과 스미다강 변으로 이어지는 조금 더 차분한 반나절 루트." },
      zh: { title: "浅草、藏前与隅田川散步指南 2026", desc: "以浅草为起点，再转入藏前背街和隅田川步行段的更安静半日路线。" },
    },
  },
  {
    slug: "oji-asukayama-tram-walk",
    category: "topic",
    content: {
      en: { title: "Oji and Asukayama Tram Walk Guide 2026", desc: "A slower half-day around Oji and Asukayama for tram views, park pauses, and a more local north-Tokyo feel." },
      ja: { title: "王子と飛鳥山の都電街歩きガイド 2026", desc: "都電の景色、飛鳥山の休憩、北東京らしい落ち着いた空気を楽しむ半日街歩きガイド。" },
      ko: { title: "오지와 아스카야마 도덴 산책 가이드 2026", desc: "도덴 풍경과 아스카야마 공원, 조금 더 로컬한 북도쿄 분위기를 즐기는 반나절 가이드." },
      zh: { title: "王子与飞鸟山都电散步指南 2026", desc: "围绕都电风景、飞鸟山公园和更本地化北东京氛围的半日路线。" },
    },
  },
  {
    slug: "hebi-michi-nezu-shrine-walk",
    category: "topic",
    content: {
      en: { title: "Hebi-michi and Nezu Shrine Walk Guide 2026", desc: "A quieter Tokyo half-day route that links Nezu Shrine with Hebi-michi for shrine atmosphere, calmer lanes, and a softer Yanesen pace." },
      ja: { title: "へび道と根津神社の朝寄り街歩きガイド 2026", desc: "根津神社からへび道へ抜ける、静かな東京の朝寄り半日ルートをまとめた実用ガイドです。" },
      ko: { title: "헤비미치와 네즈 신사 산책 가이드 2026", desc: "네즈 신사와 헤비미치를 잇는, 더 조용하고 동네다운 야네센 반나절 루트입니다." },
      zh: { title: "蛇道与根津神社散步指南 2026", desc: "串联根津神社与蛇道的安静东京半日路线，适合想看神社氛围与小巷节奏的游客。" },
    },
  },
  {
    slug: "yanaka-cemetery-and-cafe-walk",
    category: "topic",
    content: {
      en: { title: "Yanaka Cemetery and Cafe Walk Guide 2026", desc: "A quieter Yanaka half-day route for longer low-rise streets, cemetery-edge calm, and one deliberate cafe pause." },
      ja: { title: "谷中霊園まわりと喫茶の静かな街歩き 2026", desc: "谷中霊園まわりの静けさと小さな喫茶休憩を組み合わせる、落ち着いた東京半日ルートのガイドです。" },
      ko: { title: "야나카 묘지와 카페 산책 가이드 2026", desc: "야나카 묘지 주변의 여백과 작은 카페 휴식을 묶은 차분한 도쿄 반나절 산책 가이드입니다." },
      zh: { title: "谷中墓园与咖啡馆散步指南 2026", desc: "以谷中墓园周边安静街道和一段刻意放慢的咖啡休息为主的东京半日路线。" },
    },
  },
  {
    slug: "kiyosumi-garden-coffee-roasters-walk",
    category: "topic",
    content: {
      en: { title: "Kiyosumi Garden and Coffee Roasters Walk 2026", desc: "A calmer Kiyosumi-Shirakawa half day built around Kiyosumi Garden first, then one or two roaster or bakery stops." },
      ja: { title: "清澄庭園とロースター街歩きガイド 2026", desc: "清澄庭園の余白と清澄白河のロースター文化を一つの半日にまとめる、静かな東東京ガイドです。" },
      ko: { title: "기요스미 정원과 로스터 산책 가이드 2026", desc: "기요스미 정원의 여백과 기요스미시라카와 로스터 문화를 한 반나절에 묶는 조용한 도쿄 동쪽 가이드입니다." },
      zh: { title: "清澄庭园与咖啡烘焙散步指南 2026", desc: "先看清澄庭园，再用一两家烘焙或面包店收尾的清澄白河慢节奏半日路线。" },
    },
  },
  {
    slug: "kuramae-bridge-and-craft-walk",
    category: "topic",
    content: {
      en: { title: "Kuramae Bridge and Craft Walk Guide 2026", desc: "A lower-pressure Kuramae route for small craft shops, stationery stops, and one or two bridge views in the same half day." },
      ja: { title: "蔵前の橋景色とクラフト店街歩き 2026", desc: "橋の景色と蔵前の小さなクラフト店をつなぐ、少し静かな東東京半日ルートのガイドです。" },
      ko: { title: "구라마에 다리 풍경과 크래프트 산책 2026", desc: "작은 공예 가게와 다리 풍경을 함께 묶는, 조금 더 차분한 구라마에 반나절 루트입니다." },
      zh: { title: "藏前桥景与手作店散步指南 2026", desc: "把藏前的小型手作店、文具停留与一两段桥边风景放进同一半天的低压力路线。" },
    },
  },
  {
    slug: "waseda-omokagebashi-tram-walk",
    category: "topic",
    content: {
      en: { title: "Waseda and Omokagebashi Tram Walk Guide 2026", desc: "A quieter Tokyo tram-line half day linking the Waseda side with Omokagebashi for everyday streetcar atmosphere." },
      ja: { title: "早稲田と面影橋の都電街歩きガイド 2026", desc: "早稲田側から面影橋へかけて都電と街の速度を感じる、静かな東京半日ルートのガイドです。" },
      ko: { title: "와세다와 오모카게바시 도덴 산책 가이드 2026", desc: "와세다 쪽과 오모카게바시를 잇는, 일상적인 노면전차 분위기의 조용한 도쿄 반나절 루트입니다." },
      zh: { title: "早稻田与面影桥都电散步指南 2026", desc: "连接早稻田一侧与面影桥的安静东京半日路线，重点是日常感很强的路面电车氛围。" },
    },
  },
  {
    slug: "tokyo-morning-walks",
    category: "topic",
    content: {
      en: { title: "Best Tokyo Morning Walks Guide 2026", desc: "A practical Tokyo guide for travelers who want calmer morning streets, low-pressure neighborhood starts, and half-day routes before the city fully crowds up." },
      ja: { title: "東京の朝散歩ベストルートガイド 2026", desc: "混雑前の東京を静かに歩きたい外国人旅行者向けに、朝向きの半日ルートをまとめた実用ガイドです。" },
      ko: { title: "도쿄 아침 산책 베스트 가이드 2026", desc: "도시가 완전히 붐비기 전, 더 차분한 거리와 동네 리듬을 즐기고 싶은 여행자를 위한 도쿄 아침 반나절 가이드입니다." },
      zh: { title: "东京晨间散步最佳路线指南 2026", desc: "适合想在城市完全拥挤前，先走一段更安静东京街区的外国游客晨间半日路线。" },
    },
  },
  {
    slug: "tokyo-local-transit-half-day",
    category: "topic",
    content: {
      en: { title: "Local Transit-Led Tokyo Half-Day Routes 2026", desc: "A Tokyo half-day guide for travelers who want local transit, short walks, and calmer neighborhoods instead of purely attraction-to-attraction movement." },
      ja: { title: "東京のローカル交通で回る半日ルート 2026", desc: "都電や駅近の静かな街区を使って、外国人旅行者が無理なく回せる東京半日ルートをまとめたガイドです." },
      ko: { title: "도쿄 로컬 교통 반나절 루트 2026", desc: "노면전차와 역 근처의 조용한 동네를 활용해, 관광지만 찍는 동선보다 더 읽기 쉬운 도쿄 반나절 루트를 정리했습니다." },
      zh: { title: "东京本地交通半日路线指南 2026", desc: "用都电和站边安静街区来组织更好走的东京半日路线，适合不想只在景点之间赶路的外国游客。" },
    },
  },
  {
    slug: "tokyo-waterfront-slow-route",
    category: "topic",
    content: {
      en: { title: "Tokyo Waterfront and Slow Route Guide 2026", desc: "A calmer Tokyo half day for travelers who want river edges, canals, bridge views, and slower east-side walking with room to breathe." },
      ja: { title: "東京の水辺をゆっくり歩く半日ルート 2026", desc: "川沿い、運河、橋の景色を無理なくつなぎながら、東京の水辺を静かに歩くための実用ガイドです。" },
      ko: { title: "도쿄 수변 슬로 루트 가이드 2026", desc: "강변, 운하, 다리 풍경을 무리 없이 잇는 도쿄의 한결 여유로운 반나절 수변 산책 가이드입니다." },
      zh: { title: "东京水边慢走半日路线指南 2026", desc: "把河边、运河与桥景自然串联起来的东京半日慢节奏路线，适合想留出呼吸感的旅行者。" },
    },
  },
  {
    slug: "tokyo-old-town-hillside-walk",
    category: "topic",
    content: {
      en: { title: "Tokyo Old-Town and Hillside Walk Guide 2026", desc: "A practical Tokyo guide for travelers who want shrine edges, older streets, slight elevation change, and neighborhoods that still feel layered and calm." },
      ja: { title: "東京の下町と坂まわり街歩きガイド 2026", desc: "谷中や根津のように、下町らしさと少しの高低差が残る東京を半日で歩くためのガイドです。" },
      ko: { title: "도쿄 올드타운과 언덕길 산책 가이드 2026", desc: "신사 주변과 오래된 거리, 완만한 오르내림이 함께 남아 있는 더 입체적인 도쿄 동네 산책 가이드입니다." },
      zh: { title: "东京旧街与坡道散步指南 2026", desc: "适合想看神社边缘、老街与些微地势变化的东京半日路线，比单一景点更有层次。" },
    },
  },
  {
    slug: "tokyo-station-based-short-stays",
    category: "topic",
    content: {
      en: { title: "Station-Based Tokyo Walks for Short Stays 2026", desc: "A practical Tokyo guide for travelers who want easy station-based neighborhood walks that fit arrival days, departure days, and shorter stopovers." },
      ja: { title: "東京の駅起点で回る短時間街歩き 2026", desc: "到着日や出発日でも使いやすい、駅起点の短時間東京街歩きをまとめた外国人旅行者向けガイドです。" },
      ko: { title: "도쿄 역 출발 짧은 산책 가이드 2026", desc: "도착일, 출발일, 짧은 체류에도 넣기 쉬운 역 기반 도쿄 동네 산책 루트를 정리한 가이드입니다." },
      zh: { title: "东京车站起点短时散步指南 2026", desc: "适合到达日、离开日或停留时间不长时使用的东京站边街区半日路线。" },
    },
  },
  {
    slug: "tokyo-markets-cafes-local-streets",
    category: "topic",
    content: {
      en: { title: "Tokyo Markets, Cafes, and Local Streets Guide 2026", desc: "A practical Tokyo guide for travelers who want antenna shops, coffee pauses, specialist retail, and city texture beyond landmark-only sightseeing." },
      ja: { title: "東京の市場・カフェ・ローカルストリートガイド 2026", desc: "アンテナショップ、喫茶、専門店の並び方を軸に、東京を街として歩きたい外国人旅行者向けの半日ガイドです。" },
      ko: { title: "도쿄 시장, 카페, 로컬 스트리트 가이드 2026", desc: "안테나 숍, 카페, 전문점 거리를 중심으로 도쿄를 더 촉감 있게 걷고 싶은 여행자를 위한 반나절 가이드입니다." },
      zh: { title: "东京市场、咖啡馆与在地街区指南 2026", desc: "适合想通过区域特产店、咖啡停留与专业小店来感受东京街道质感的半日路线。" },
    },
  },
  {
    slug: "seoul-morning-walks",
    category: "topic",
    content: {
      en: { title: "Seoul Morning Walks Guide 2026", desc: "A practical Seoul guide for travelers who want a softer start with walkable streets, one cafe pause, and room to avoid queue-heavy districts early." },
      ja: { title: "ソウルの朝散歩ガイド 2026", desc: "混雑が本格化する前に、散歩、カフェ、軽い寄り道を組み合わせて半日を始める外国人旅行者向けガイドです。" },
      ko: { title: "서울 아침 산책 가이드 2026", desc: "혼잡해지기 전, 산책과 카페 한 번으로 서울의 아침을 부드럽게 여는 반나절 가이드입니다." },
      zh: { title: "首尔晨间散步指南 2026", desc: "适合想在人潮真正涌入前，用步行与一次咖啡停留开始首尔半日行程的旅行者。" },
    },
  },
  {
    slug: "kichijoji-inokashira-park-morning",
    category: "topic",
    content: {
      en: { title: "Kichijoji and Inokashira Park Morning Walk 2026", desc: "A practical west-Tokyo morning route for foreign travelers who want Kichijoji side streets, Inokashira Park, and a slower local start." },
      ja: { title: "吉祥寺と井の頭公園の朝散歩ガイド 2026", desc: "吉祥寺の路地と井の頭公園を朝の時間帯でつなぐ、外国人旅行者向けの実用的な半日街歩きガイド。" },
      ko: { title: "기치조지와 이노카시라공원 아침 산책 가이드 2026", desc: "기치조지 골목과 이노카시라공원을 아침 시간대에 묶은 실용적인 도쿄 서쪽 반나절 가이드." },
      zh: { title: "吉祥寺与井之头公园晨间散步指南 2026", desc: "把吉祥寺街区与井之头公园串联起来的东京西侧晨间半日路线，适合外国游客。" },
    },
  },
  {
    slug: "kagurazaka-backstreets-walk",
    category: "topic",
    content: {
      en: { title: "Kagurazaka Backstreets and Side-Lane Walk 2026", desc: "A practical Kagurazaka route for travelers who want stone lanes, shrine pauses, and older Tokyo side streets beyond the main slope." },
      ja: { title: "神楽坂の裏通りと路地歩きガイド 2026", desc: "神楽坂通りの表通りだけで終わらせず、石畳の路地や神社まわりまで歩きたい人向けの半日ガイド。" },
      ko: { title: "가구라자카 뒷골목 산책 가이드 2026", desc: "메인 스트리트보다 골목, 돌길, 신사 주변까지 보고 싶은 여행자를 위한 가구라자카 반나절 가이드." },
      zh: { title: "神乐坂背街与小巷步行指南 2026", desc: "不只走神乐坂主坡道，而是深入石板路与神社周边小巷的半日路线。" },
    },
  },
  {
    slug: "jimbocho-kanda-booktown-walk",
    category: "topic",
    content: {
      en: { title: "Jimbocho and Kanda Booktown Walk 2026", desc: "A practical booktown half day for travelers who want secondhand bookstores, cafe pauses, and calmer central Tokyo blocks." },
      ja: { title: "神保町と神田ブックタウン散歩ガイド 2026", desc: "古書店、喫茶、静かな中央東京の街区を半日でつなぐ、神保町と神田の街歩きガイド。" },
      ko: { title: "진보초와 간다 북타운 산책 가이드 2026", desc: "고서점, 카페, 차분한 도쿄 중심 블록을 묶은 진보초·간다 반나절 가이드." },
      zh: { title: "神保町与神田书店街散步指南 2026", desc: "把旧书店、咖啡停留与更安静的东京中心街区串联起来的半日路线。" },
    },
  },
  {
    slug: "nakameguro-daikanyama-side-streets",
    category: "topic",
    content: {
      en: { title: "Nakameguro and Daikanyama Side Streets 2026", desc: "A calmer Tokyo half day for travelers who want Nakameguro and Daikanyama beyond the most photographed river and shopping strips." },
      ja: { title: "中目黒と代官山の裏通りガイド 2026", desc: "目黒川の定番写真だけで終わらせず、中目黒と代官山の裏通りを静かに歩きたい人向けの半日ガイド。" },
      ko: { title: "나카메구로와 다이칸야마 뒷골목 가이드 2026", desc: "가장 유명한 강변 사진 포인트를 넘어, 나카메구로와 다이칸야마의 차분한 골목을 걷는 반나절 가이드." },
      zh: { title: "中目黑与代官山背街指南 2026", desc: "不只停留在最著名的河边拍照点，而是走进中目黑与代官山更安静街区的半日路线。" },
    },
  },
  {
    slug: "shibamata-retro-day-trip",
    category: "topic",
    content: {
      en: { title: "Shibamata Retro Day Trip from Central Tokyo 2026", desc: "A practical retro Tokyo day trip for travelers who want temple approaches, river air, and a lower-rise old-Tokyo feel in Shibamata." },
      ja: { title: "柴又レトロ日帰りガイド 2026", desc: "帝釈天の参道、江戸川、水辺の空気をまとめて味わえる、柴又の実用的な半日から日帰りガイド。" },
      ko: { title: "시바마타 레트로 당일치기 가이드 2026", desc: "제석천 참도와 강변 공기, 낮은 옛 도쿄 분위기를 함께 느끼는 시바마타 실용 가이드." },
      zh: { title: "柴又复古半日到一日指南 2026", desc: "适合想看帝释天参道、江户川河边与低层老东京氛围的实用柴又路线。" },
    },
  },
  {
    slug: "kyoto-demachiyanagi-kamo-walk",
    category: "topic",
    content: MINOR_GUIDE_CANON["kyoto-demachiyanagi-kamo-walk"],
  },
  {
    slug: "kyoto-fushimi-sake-district-walk",
    category: "topic",
    content: MINOR_GUIDE_CANON["kyoto-fushimi-sake-district-walk"],
  },
  {
    slug: "osaka-sumiyoshi-retro-tram-route",
    category: "topic",
    content: MINOR_GUIDE_CANON["osaka-sumiyoshi-retro-tram-route"],
  },
  {
    slug: "kyoto-saga-arashiyama-morning-backstreets",
    category: "topic",
    content: MINOR_GUIDE_CANON["kyoto-saga-arashiyama-morning-backstreets"],
  },
  {
    slug: "kyoto-nishijin-machiya-lanes",
    category: "topic",
    content: MINOR_GUIDE_CANON["kyoto-nishijin-machiya-lanes"],
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

export function getExtraGuideDefinition(slug: string) {
  return EXTRA_GUIDES.find((item) => item.slug === slug) ?? null;
}
