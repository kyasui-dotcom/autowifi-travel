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
  {
    slug: "kanazawa-higashi-chaya-morning-walk",
    category: "topic",
    content: {
      en: { title: "Kanazawa Higashi Chaya Morning Walking Guide", desc: "A self-guided Kanazawa Higashi Chaya walking route with Shima Teahouse, Kaikaro, the Asano River approach, and Utatsuyama temple extensions for foreign travelers." },
      ja: { title: "金沢・ひがし茶屋街 朝の散歩ガイド", desc: "金沢のひがし茶屋街を朝の時間帯にゆっくり歩くための実用ガイド。志摩、懐華樓、浅野川アプローチ、卯辰山の寺町までの動線とアクセス情報。" },
      ko: { title: "가나자와 히가시차야 아침 산책 가이드", desc: "시마 찻집, 카이카로, 아사노 강 접근과 우타쓰야마 사원까지 잇는 가나자와 히가시차야 아침 산책 가이드." },
      zh: { title: "金泽东茶屋街晨间散步指南", desc: "介绍志摩茶屋、怀华楼、浅野川入口和卯辰山寺院路线的金泽东茶屋街晨间散步实用指南。" },
    },
  },
  {
    slug: "esim-instant-activation",
    category: "howto",
    content: {
      en: { title: "Instant eSIM Activation Guide 2026", desc: "How instant eSIM activation works, when it really is same-day, and what travelers should check before arrival." },
      ja: { title: "eSIMの即日開通ガイド 2026", desc: "eSIMが本当に即日で使えるのか、到着前に確認すべき設定と注意点を解説する実用ガイド。" },
      ko: { title: "eSIM 즉시 개통 가이드 2026", desc: "eSIM이 정말 당일 사용 가능한지, 도착 전 꼭 확인해야 할 설정과 주의 사항을 정리했습니다." },
      zh: { title: "eSIM即时开通完全指南 2026", desc: "eSIM是否真正当日可用、抵达前需要确认的设置与常见注意事项。" },
    },
  },
  {
    slug: "esim-one-week-plan",
    category: "topic",
    content: {
      en: { title: "Best 1-Week Travel eSIM Plans 2026", desc: "Compare 7-day travel eSIM plans by data allowance, coverage, and value for short trips abroad." },
      ja: { title: "1週間の海外旅行におすすめのeSIM 2026", desc: "7日間の短期海外旅行向けeSIMをデータ容量・カバレッジ・価格で比較するガイド。" },
      ko: { title: "1주일 해외여행에 추천하는 eSIM 2026", desc: "7일 단기 해외여행용 eSIM을 데이터 용량, 커버리지, 가격으로 비교하는 가이드." },
      zh: { title: "一周海外旅行推荐eSIM 2026", desc: "从流量、覆盖和性价比角度对比7天短期出行的eSIM套餐。" },
    },
  },
  {
    slug: "esim-one-month-plan",
    category: "topic",
    content: {
      en: { title: "Best 1-Month Travel eSIM Plans 2026", desc: "Compare 30-day travel eSIM plans for longer trips, workations, and multi-city itineraries abroad." },
      ja: { title: "1ヶ月の海外滞在におすすめのeSIM 2026", desc: "30日間の長期滞在・ワーケーション・周遊向けeSIMを比較する完全ガイド。" },
      ko: { title: "1개월 해외체류에 추천하는 eSIM 2026", desc: "30일 장기 체류, 워케이션, 다도시 여행에 맞는 eSIM을 비교하는 가이드." },
      zh: { title: "一个月海外长住推荐eSIM 2026", desc: "针对30天长期停留、工作度假和多城市行程的eSIM对比指南。" },
    },
  },
  {
    slug: "esim-refund-guide",
    category: "howto",
    content: {
      en: { title: "eSIM Refund and Cancellation Guide 2026", desc: "When travel eSIMs are refundable, how to request a refund, and how to avoid buying the wrong plan in the first place." },
      ja: { title: "eSIMの返金・キャンセル完全ガイド 2026", desc: "旅行用eSIMは返金できるのか、申請の手順、そもそも購入ミスを防ぐチェックポイントを解説。" },
      ko: { title: "eSIM 환불・취소 완전 가이드 2026", desc: "여행용 eSIM 환불 가능 여부, 신청 절차, 잘못 구매하지 않기 위한 체크포인트를 정리했습니다." },
      zh: { title: "eSIM退款与取消完全指南 2026", desc: "旅行eSIM是否可退款、申请流程以及购买前需要确认的事项说明。" },
    },
  },
  {
    slug: "esim-top-up-guide",
    category: "howto",
    content: {
      en: { title: "How to Top Up a Travel eSIM 2026", desc: "When to top up vs buy a new plan, which providers support top-ups, and how to avoid running out of data mid-trip." },
      ja: { title: "eSIMの容量追加（チャージ）完全ガイド 2026", desc: "eSIMの容量追加と新規購入の使い分け、対応プロバイダー、旅行中にデータ切れを防ぐコツを解説。" },
      ko: { title: "eSIM 데이터 충전 완전 가이드 2026", desc: "eSIM 데이터 충전과 신규 구매의 차이, 지원 프로바이더, 여행 중 데이터 소진을 막는 방법을 설명합니다." },
      zh: { title: "eSIM流量充值完全指南 2026", desc: "eSIM续费与重新购买的差异、支持充值的服务商、避免旅途中断网的实用建议。" },
    },
  },
  {
    slug: "esim-5g-coverage",
    category: "topic",
    content: {
      en: { title: "Best 5G Travel eSIM Plans 2026", desc: "Which travel eSIM providers actually deliver 5G speeds, and when 5G matters versus reliable 4G LTE abroad." },
      ja: { title: "5G対応の海外eSIM完全ガイド 2026", desc: "本当に5Gで使える海外eSIMはどれか、4G LTEで十分な場面との違いを解説するガイド。" },
      ko: { title: "5G 지원 여행 eSIM 완전 가이드 2026", desc: "실제로 5G 속도가 나오는 여행 eSIM은 어느 것인지, 4G LTE로 충분한 상황과 비교해 설명합니다." },
      zh: { title: "支持5G的旅行eSIM完全指南 2026", desc: "实际能达到5G速度的旅行eSIM有哪些，以及何时4G LTE已经足够的对比说明。" },
    },
  },
  {
    slug: "rakuten-mobile-vs-travel-esim",
    category: "topic",
    content: {
      en: { title: "Rakuten Mobile Overseas vs Travel eSIM 2026", desc: "Compare Rakuten Mobile's free 2GB overseas roaming with travel eSIM plans for longer trips and heavier data use." },
      ja: { title: "楽天モバイル海外ローミング vs 海外eSIM比較 2026", desc: "楽天モバイルの海外2GB無料と、長期・大容量向けの海外eSIMを実使用ベースで比較するガイド。" },
      ko: { title: "라쿠텐 모바일 해외 로밍 vs 여행 eSIM 2026", desc: "라쿠텐 모바일 해외 2GB 무료와 장기 대용량 여행 eSIM을 실제 사용 기준으로 비교합니다." },
      zh: { title: "乐天Mobile海外漫游 vs 旅行eSIM 2026", desc: "对比乐天Mobile海外免费2GB漫游与长期大流量旅行eSIM的实际使用差异。" },
    },
  },
  {
    slug: "ahamo-vs-travel-esim",
    category: "topic",
    content: {
      en: { title: "ahamo Overseas vs Travel eSIM 2026", desc: "Compare ahamo's included overseas data with travel eSIM plans for trips beyond the 15-day window and heavier usage." },
      ja: { title: "ahamo海外 vs 海外eSIM比較 2026", desc: "ahamoの海外15日無料プランと、それを超える長期・大容量利用に強い海外eSIMを比較するガイド。" },
      ko: { title: "ahamo 해외 vs 여행 eSIM 비교 2026", desc: "ahamo의 해외 15일 무료와 그 이상 장기・대용량 사용에 적합한 여행 eSIM을 비교합니다." },
      zh: { title: "ahamo海外 vs 旅行eSIM对比 2026", desc: "对比ahamo海外15天免费与更长时间、更大流量的旅行eSIM方案。" },
    },
  },
  {
    slug: "povo-vs-travel-esim",
    category: "topic",
    content: {
      en: { title: "povo Overseas vs Travel eSIM 2026", desc: "Compare povo's overseas roaming topping options with dedicated travel eSIM plans for cost, speed, and flexibility." },
      ja: { title: "povo海外トッピング vs 海外eSIM比較 2026", desc: "povoの海外トッピングと、旅行専用eSIMを料金・速度・柔軟性で比較する実用ガイド。" },
      ko: { title: "povo 해외 vs 여행 eSIM 비교 2026", desc: "povo 해외 토핑과 여행 전용 eSIM을 요금, 속도, 유연성 기준으로 비교합니다." },
      zh: { title: "povo海外 vs 旅行eSIM对比 2026", desc: "从费用、速度和灵活性的角度对比povo海外加购与专用旅行eSIM。" },
    },
  },
  {
    slug: "esim-for-kids",
    category: "topic",
    content: {
      en: { title: "eSIM for Kids' Phones While Traveling 2026", desc: "How to set up a travel eSIM on a child's phone, manage data safely, and keep family communication simple abroad." },
      ja: { title: "子供のスマホ向け海外eSIM完全ガイド 2026", desc: "子供用スマホに海外eSIMを設定する方法、安全なデータ管理、家族との連絡手段を解説。" },
      ko: { title: "자녀 스마트폰용 여행 eSIM 가이드 2026", desc: "자녀 스마트폰에 여행 eSIM을 설정하는 방법과 안전한 데이터 관리, 가족 연락 팁을 정리했습니다." },
      zh: { title: "儿童手机海外eSIM使用指南 2026", desc: "如何在孩子的手机上设置海外eSIM、安全管理流量，以及保持家庭联络畅通的实用建议。" },
    },
  },
  {
    slug: "japan-tourist-esim-guide",
    category: "topic",
    content: {
      en: { title: "Japan Tourist eSIM Guide 2026 — Best Plans for Visitors", desc: "The complete eSIM guide for tourists visiting Japan: best plans, 5G coverage in Tokyo, Kyoto, and Osaka, and setup tips before arrival." },
      ja: { title: "訪日観光客向けeSIMガイド 2026", desc: "訪日外国人観光客向けの日本旅行eSIM完全ガイド。東京・京都・大阪の5Gカバレッジと到着前設定のコツ。" },
      ko: { title: "일본 방문 관광객용 eSIM 가이드 2026", desc: "일본을 방문하는 관광객을 위한 eSIM 완전 가이드. 도쿄, 교토, 오사카의 5G 커버리지와 도착 전 설정 팁." },
      zh: { title: "日本旅游eSIM完全指南 2026", desc: "面向赴日游客的日本旅行eSIM完整指南。东京、京都、大阪的5G覆盖与抵达前设置要点。" },
    },
  },
  {
    slug: "korea-tourist-esim-guide",
    category: "topic",
    content: {
      en: { title: "Korea Tourist eSIM Guide 2026 — Best Plans for Visitors", desc: "The complete eSIM guide for tourists visiting South Korea: best plans, 5G in Seoul and Busan, and setup tips before arrival at ICN." },
      ja: { title: "訪韓観光客向けeSIMガイド 2026", desc: "韓国旅行者向けのeSIM完全ガイド。ソウル・釜山の5Gカバレッジと仁川空港到着前の設定手順。" },
      ko: { title: "한국 방문 관광객용 eSIM 가이드 2026", desc: "한국을 방문하는 외국인 관광객을 위한 eSIM 완전 가이드. 서울, 부산의 5G 커버리지와 인천공항 도착 전 설정 팁." },
      zh: { title: "韩国旅游eSIM完全指南 2026", desc: "面向访韩游客的eSIM完整指南。首尔、釜山的5G覆盖与仁川机场抵达前设置要点。" },
    },
  },
  {
    slug: "bali-esim",
    category: "country",
    countrySlug: "indonesia",
    content: {
      en: { title: "Bali eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Bali with coverage tips for Seminyak, Ubud, Canggu and Nusa Penida day trips." },
      ja: { title: "バリ島のeSIMガイド 2026", desc: "バリ島旅行のeSIM完全ガイド。スミニャック・ウブド・チャングー・ヌサペニダ周辺の通信環境とおすすめプラン。" },
      ko: { title: "발리 eSIM 가이드 2026", desc: "발리 여행용 eSIM 완전 가이드. 스미냑, 우붓, 짱구, 누사페니다 지역의 통신 환경과 추천 플랜." },
      zh: { title: "巴厘岛eSIM完全指南 2026", desc: "巴厘岛旅行eSIM完全指南。水明漾、乌布、长谷和佩尼达岛周边的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "phuket-esim",
    category: "country",
    countrySlug: "thailand",
    content: {
      en: { title: "Phuket eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Phuket with coverage tips for Patong, Kata, Karon and Phi Phi island day trips." },
      ja: { title: "プーケットのeSIMガイド 2026", desc: "プーケット旅行のeSIM完全ガイド。パトン・カタ・カロン・ピピ島日帰りでの通信環境とおすすめプラン。" },
      ko: { title: "푸켓 eSIM 가이드 2026", desc: "푸켓 여행용 eSIM 완전 가이드. 빠통, 까따, 까론, 피피섬 일일 투어 통신 환경과 추천 플랜." },
      zh: { title: "普吉岛eSIM完全指南 2026", desc: "普吉岛旅行eSIM完全指南。巴东、卡塔、卡隆海滩及皮皮岛行程的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "bangkok-esim",
    category: "country",
    countrySlug: "thailand",
    content: {
      en: { title: "Bangkok eSIM Guide 2026 — Best Plans for City Trips", desc: "Best eSIM plans for Bangkok with 5G coverage for BTS/MRT navigation, ride-hailing, and weekend markets." },
      ja: { title: "バンコクのeSIMガイド 2026", desc: "バンコク旅行のeSIM完全ガイド。BTS・MRT移動、配車アプリ、週末マーケットに対応する5Gプランを比較。" },
      ko: { title: "방콕 eSIM 가이드 2026", desc: "방콕 여행용 eSIM 완전 가이드. BTS・MRT 이동, 차량 호출, 주말 시장 이용에 적합한 5G 플랜 비교." },
      zh: { title: "曼谷eSIM完全指南 2026", desc: "曼谷旅行eSIM完全指南。适用于BTS/MRT出行、打车和周末市场的5G套餐对比。" },
    },
  },
  {
    slug: "tokyo-esim-guide",
    category: "country",
    countrySlug: "japan",
    content: {
      en: { title: "Tokyo eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Tokyo with coverage tips for Shibuya, Shinjuku, Asakusa, and day trips to Nikko or Hakone." },
      ja: { title: "東京旅行のeSIMガイド 2026", desc: "東京旅行のeSIM完全ガイド。渋谷・新宿・浅草での5G通信環境と日光・箱根への日帰り旅行にも対応したプラン比較。" },
      ko: { title: "도쿄 여행 eSIM 가이드 2026", desc: "도쿄 여행용 eSIM 완전 가이드. 시부야, 신주쿠, 아사쿠사 5G 통신 환경과 닛코・하코네 당일치기 여행 플랜 비교." },
      zh: { title: "东京旅行eSIM完全指南 2026", desc: "东京旅行eSIM完全指南。涩谷、新宿、浅草的5G网络环境以及日光、箱根一日游的套餐对比。" },
    },
  },
  {
    slug: "seoul-esim-guide",
    category: "country",
    countrySlug: "south-korea",
    content: {
      en: { title: "Seoul eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Seoul with 5G coverage tips for Myeongdong, Hongdae, Gangnam, and day trips from ICN." },
      ja: { title: "ソウル旅行のeSIMガイド 2026", desc: "ソウル旅行のeSIM完全ガイド。明洞・弘大・江南での5G通信と仁川空港からの移動にも対応したプラン比較。" },
      ko: { title: "서울 여행 eSIM 가이드 2026", desc: "서울 여행용 eSIM 완전 가이드. 명동, 홍대, 강남 5G 통신과 인천공항 이동에 적합한 플랜 비교." },
      zh: { title: "首尔旅行eSIM完全指南 2026", desc: "首尔旅行eSIM完全指南。明洞、弘大、江南的5G网络以及仁川机场出行的套餐对比。" },
    },
  },
  {
    slug: "london-esim",
    category: "country",
    countrySlug: "united-kingdom",
    content: {
      en: { title: "London eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for London with 5G coverage for Tube navigation, Heathrow arrivals, and day trips across the UK." },
      ja: { title: "ロンドン旅行のeSIMガイド 2026", desc: "ロンドン旅行のeSIM完全ガイド。地下鉄移動・ヒースロー到着・イギリス各地への日帰り旅行に対応したプラン比較。" },
      ko: { title: "런던 여행 eSIM 가이드 2026", desc: "런던 여행용 eSIM 완전 가이드. 지하철 이동, 히스로 도착, 영국 각지 당일치기 여행에 적합한 플랜 비교." },
      zh: { title: "伦敦旅行eSIM完全指南 2026", desc: "伦敦旅行eSIM完全指南。地铁出行、希思罗机场抵达以及英国各地一日游的套餐对比。" },
    },
  },
  {
    slug: "paris-esim",
    category: "country",
    countrySlug: "france",
    content: {
      en: { title: "Paris eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Paris with 5G coverage tips for the Métro, CDG arrivals, and day trips to Versailles or Mont-Saint-Michel." },
      ja: { title: "パリ旅行のeSIMガイド 2026", desc: "パリ旅行のeSIM完全ガイド。メトロ移動・シャルルドゴール到着・ヴェルサイユやモンサンミッシェル日帰りに対応したプラン比較。" },
      ko: { title: "파리 여행 eSIM 가이드 2026", desc: "파리 여행용 eSIM 완전 가이드. 메트로 이동, 샤를드골 도착, 베르사유・몽생미셸 당일치기에 적합한 플랜 비교." },
      zh: { title: "巴黎旅行eSIM完全指南 2026", desc: "巴黎旅行eSIM完全指南。地铁出行、戴高乐机场抵达以及凡尔赛、圣米歇尔山一日游的套餐对比。" },
    },
  },
  {
    slug: "israel-esim",
    category: "country",
    countrySlug: "israel",
    content: {
      en: { title: "Israel eSIM Guide 2026", desc: "Best eSIM plans for Israel with coverage tips for Tel Aviv, Jerusalem, and the Dead Sea region." },
      ja: { title: "イスラエルのeSIMガイド 2026", desc: "イスラエル旅行のeSIM完全ガイド。テルアビブ・エルサレム・死海周辺の通信環境とおすすめプラン。" },
      ko: { title: "이스라엘 eSIM 가이드 2026", desc: "이스라엘 여행용 eSIM 완전 가이드. 텔아비브, 예루살렘, 사해 지역의 통신 환경과 추천 플랜." },
      zh: { title: "以色列eSIM完全指南 2026", desc: "以色列旅行eSIM完全指南。特拉维夫、耶路撒冷和死海周边的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "jordan-esim",
    category: "country",
    countrySlug: "jordan",
    content: {
      en: { title: "Jordan eSIM Guide 2026", desc: "Best eSIM plans for Jordan with coverage tips for Amman, Petra, Wadi Rum, and desert day trips." },
      ja: { title: "ヨルダンのeSIMガイド 2026", desc: "ヨルダン旅行のeSIM完全ガイド。アンマン・ペトラ・ワディラム砂漠での通信環境とおすすめプラン。" },
      ko: { title: "요르단 eSIM 가이드 2026", desc: "요르단 여행용 eSIM 완전 가이드. 암만, 페트라, 와디럼 사막 지역의 통신 환경과 추천 플랜." },
      zh: { title: "约旦eSIM完全指南 2026", desc: "约旦旅行eSIM完全指南。安曼、佩特拉、瓦迪拉姆沙漠的网络环境与推荐套餐。" },
    },
  },
  {
    slug: "airalo-vs-holafly",
    category: "topic",
    content: {
      en: { title: "Airalo vs Holafly 2026 — Which Travel eSIM Wins?", desc: "Head-to-head comparison of Airalo and Holafly on price, data limits, coverage, activation, and refund policies." },
      ja: { title: "Airalo vs Holafly 徹底比較 2026", desc: "Airaloと Holaflyを料金・データ容量・カバレッジ・開通・返金ポリシーで徹底比較する購入ガイド。" },
      ko: { title: "Airalo vs Holafly 비교 2026", desc: "Airalo와 Holafly를 가격, 데이터 한도, 커버리지, 개통, 환불 정책으로 철저히 비교하는 구매 가이드." },
      zh: { title: "Airalo vs Holafly 对比 2026", desc: "从价格、流量上限、覆盖、开通和退款政策角度对比Airalo与Holafly的购买指南。" },
    },
  },
  {
    slug: "airalo-vs-nomad",
    category: "topic",
    content: {
      en: { title: "Airalo vs Nomad 2026 — Travel eSIM Compared", desc: "Detailed comparison of Airalo and Nomad for travelers: pricing, regional packages, speed, and customer support." },
      ja: { title: "Airalo vs Nomad 比較 2026", desc: "AiraloとNomadを料金・地域プラン・通信速度・サポートで比較する旅行者向け購入ガイド。" },
      ko: { title: "Airalo vs Nomad 비교 2026", desc: "Airalo와 Nomad를 가격, 지역 플랜, 속도, 고객 지원으로 비교하는 여행자 구매 가이드." },
      zh: { title: "Airalo vs Nomad 对比 2026", desc: "从价格、区域套餐、网速和客户支持角度对比Airalo与Nomad的旅行者购买指南。" },
    },
  },
  {
    slug: "saily-review",
    category: "topic",
    content: {
      en: { title: "Saily eSIM Review 2026 — Is NordVPN's Travel eSIM Worth It?", desc: "In-depth review of Saily, the travel eSIM from NordVPN. Coverage, pricing, app experience, and security features." },
      ja: { title: "Saily eSIMレビュー 2026 — NordVPNの海外eSIMは使える？", desc: "NordVPN系列のSaily eSIMを実使用ベースでレビュー。カバレッジ・料金・アプリUX・セキュリティ機能を解説。" },
      ko: { title: "Saily eSIM 리뷰 2026 — NordVPN의 여행 eSIM 평가", desc: "NordVPN 계열 Saily eSIM 실사용 리뷰. 커버리지, 가격, 앱 경험과 보안 기능을 정리했습니다." },
      zh: { title: "Saily eSIM评测 2026 — NordVPN旗下的旅行eSIM值得买吗？", desc: "深度评测NordVPN旗下的Saily旅行eSIM。覆盖范围、定价、应用体验和安全功能说明。" },
    },
  },
  {
    slug: "jetpac-review",
    category: "topic",
    content: {
      en: { title: "Jetpac eSIM Review 2026", desc: "Hands-on review of Jetpac's travel eSIM: plan structure, coverage, airport pickup perks, and real-world speeds." },
      ja: { title: "Jetpac eSIMレビュー 2026", desc: "Jetpacの海外eSIMを実使用レビュー。プラン構成・カバレッジ・空港特典・実測速度を解説。" },
      ko: { title: "Jetpac eSIM 리뷰 2026", desc: "Jetpac 여행 eSIM 실사용 리뷰. 플랜 구성, 커버리지, 공항 혜택, 실제 속도를 정리했습니다." },
      zh: { title: "Jetpac eSIM评测 2026", desc: "Jetpac旅行eSIM实测评测。套餐结构、覆盖范围、机场福利和实际网速说明。" },
    },
  },
  {
    slug: "esim-without-credit-card",
    category: "howto",
    content: {
      en: { title: "How to Buy an eSIM Without a Credit Card 2026", desc: "Options for purchasing a travel eSIM without a credit card: PayPal, Apple Pay, Google Pay, convenience store payment, and gift cards." },
      ja: { title: "クレジットカードなしでeSIMを購入する方法 2026", desc: "クレジットカードを使わずに海外eSIMを購入する方法。PayPal・Apple Pay・Google Pay・コンビニ決済・ギフトカードを解説。" },
      ko: { title: "신용카드 없이 eSIM 구매하는 방법 2026", desc: "신용카드 없이 여행 eSIM을 구매하는 방법. PayPal, Apple Pay, Google Pay, 편의점 결제, 기프트카드 정리." },
      zh: { title: "无信用卡购买eSIM的方法 2026", desc: "不用信用卡购买旅行eSIM的方案。PayPal、Apple Pay、Google Pay、便利店支付和礼品卡说明。" },
    },
  },
  {
    slug: "apple-watch-esim-travel",
    category: "howto",
    content: {
      en: { title: "Apple Watch eSIM for International Travel 2026", desc: "Can you use an Apple Watch with a travel eSIM abroad? Carrier limitations, workarounds, and what actually works." },
      ja: { title: "Apple Watchで海外eSIMは使える？ 2026", desc: "Apple Watchの海外利用とeSIMの実態。キャリア制限・回避策・実際に使える方法を解説。" },
      ko: { title: "Apple Watch 해외 eSIM 사용 가능할까? 2026", desc: "Apple Watch의 해외 eSIM 사용 가능 여부. 통신사 제한, 대체 방법, 실제 작동하는 설정을 정리했습니다." },
      zh: { title: "Apple Watch海外eSIM能用吗？2026", desc: "Apple Watch在海外配合旅行eSIM的实际情况。运营商限制、替代方案和真正可用的设置说明。" },
    },
  },
  {
    slug: "new-york-esim",
    category: "country",
    countrySlug: "united-states",
    content: {
      en: { title: "New York City eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for New York City with 5G coverage tips for Manhattan, JFK arrivals, subway navigation, and day trips." },
      ja: { title: "ニューヨーク旅行のeSIMガイド 2026", desc: "ニューヨーク旅行のeSIM完全ガイド。マンハッタンの5G通信・JFK到着・地下鉄移動・日帰り旅行に対応したプラン比較。" },
      ko: { title: "뉴욕 여행 eSIM 가이드 2026", desc: "뉴욕 여행용 eSIM 완전 가이드. 맨해튼 5G 통신, JFK 도착, 지하철 이동, 근교 당일치기에 적합한 플랜 비교." },
      zh: { title: "纽约旅行eSIM完全指南 2026", desc: "纽约旅行eSIM完全指南。曼哈顿5G网络、肯尼迪机场抵达、地铁出行和近郊一日游的套餐对比。" },
    },
  },
  {
    slug: "los-angeles-esim",
    category: "country",
    countrySlug: "united-states",
    content: {
      en: { title: "Los Angeles eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Los Angeles with coverage for Hollywood, LAX arrivals, freeway navigation, and Disneyland day trips." },
      ja: { title: "ロサンゼルス旅行のeSIMガイド 2026", desc: "ロサンゼルス旅行のeSIM完全ガイド。ハリウッド・LAX到着・フリーウェイ走行・ディズニーランド日帰りに対応したプラン比較。" },
      ko: { title: "로스앤젤레스 여행 eSIM 가이드 2026", desc: "LA 여행용 eSIM 완전 가이드. 할리우드, LAX 도착, 프리웨이 운전, 디즈니랜드 당일치기에 적합한 플랜 비교." },
      zh: { title: "洛杉矶旅行eSIM完全指南 2026", desc: "洛杉矶旅行eSIM完全指南。好莱坞、洛杉矶机场抵达、高速公路出行和迪士尼乐园一日游的套餐对比。" },
    },
  },
  {
    slug: "las-vegas-esim",
    category: "country",
    countrySlug: "united-states",
    content: {
      en: { title: "Las Vegas eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Las Vegas with coverage for the Strip, McCarran arrivals, Grand Canyon day trips, and ride-hailing." },
      ja: { title: "ラスベガス旅行のeSIMガイド 2026", desc: "ラスベガス旅行のeSIM完全ガイド。ストリップ・マッカラン空港到着・グランドキャニオン日帰り・配車アプリに対応したプラン比較。" },
      ko: { title: "라스베가스 여행 eSIM 가이드 2026", desc: "라스베가스 여행용 eSIM 완전 가이드. 스트립, 매캐런 공항 도착, 그랜드캐니언 당일치기, 차량 호출 플랜 비교." },
      zh: { title: "拉斯维加斯旅行eSIM完全指南 2026", desc: "拉斯维加斯旅行eSIM完全指南。大道、麦卡伦机场抵达、大峡谷一日游和打车的套餐对比。" },
    },
  },
  {
    slug: "rome-esim",
    category: "country",
    countrySlug: "italy",
    content: {
      en: { title: "Rome eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Rome with coverage for the Vatican, Fiumicino arrivals, metro navigation, and day trips to Tivoli." },
      ja: { title: "ローマ旅行のeSIMガイド 2026", desc: "ローマ旅行のeSIM完全ガイド。バチカン・フィウミチーノ空港到着・地下鉄移動・ティボリ日帰りに対応したプラン比較。" },
      ko: { title: "로마 여행 eSIM 가이드 2026", desc: "로마 여행용 eSIM 완전 가이드. 바티칸, 피우미치노 공항 도착, 지하철 이동, 티볼리 당일치기 플랜 비교." },
      zh: { title: "罗马旅行eSIM完全指南 2026", desc: "罗马旅行eSIM完全指南。梵蒂冈、菲乌米奇诺机场抵达、地铁出行和蒂沃利一日游的套餐对比。" },
    },
  },
  {
    slug: "barcelona-esim",
    category: "country",
    countrySlug: "spain",
    content: {
      en: { title: "Barcelona eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Barcelona with coverage for Las Ramblas, El Prat arrivals, Metro navigation, and Costa Brava day trips." },
      ja: { title: "バルセロナ旅行のeSIMガイド 2026", desc: "バルセロナ旅行のeSIM完全ガイド。ランブラス通り・エルプラット空港到着・地下鉄移動・コスタブラバ日帰りに対応したプラン比較。" },
      ko: { title: "바르셀로나 여행 eSIM 가이드 2026", desc: "바르셀로나 여행용 eSIM 완전 가이드. 람블라스, 엘프라트 공항, 지하철 이동, 코스타브라바 당일치기 플랜 비교." },
      zh: { title: "巴塞罗那旅行eSIM完全指南 2026", desc: "巴塞罗那旅行eSIM完全指南。兰布拉大道、巴塞罗那机场抵达、地铁出行和布拉瓦海岸一日游的套餐对比。" },
    },
  },
  {
    slug: "amsterdam-esim",
    category: "country",
    countrySlug: "netherlands",
    content: {
      en: { title: "Amsterdam eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Amsterdam with coverage for the canal belt, Schiphol arrivals, cycling routes, and day trips to Keukenhof." },
      ja: { title: "アムステルダム旅行のeSIMガイド 2026", desc: "アムステルダム旅行のeSIM完全ガイド。運河沿いエリア・スキポール空港到着・サイクリング・キューケンホフ日帰りに対応したプラン比較。" },
      ko: { title: "암스테르담 여행 eSIM 가이드 2026", desc: "암스테르담 여행용 eSIM 완전 가이드. 운하 지역, 스키폴 공항, 자전거 경로, 큐켄호프 당일치기 플랜 비교." },
      zh: { title: "阿姆斯特丹旅行eSIM完全指南 2026", desc: "阿姆斯特丹旅行eSIM完全指南。运河区、史基浦机场抵达、骑行路线和库肯霍夫一日游的套餐对比。" },
    },
  },
  {
    slug: "dubai-city-esim",
    category: "country",
    countrySlug: "united-arab-emirates",
    content: {
      en: { title: "Dubai City eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Dubai with coverage for Downtown, DXB arrivals, desert safaris, and day trips to Abu Dhabi." },
      ja: { title: "ドバイ市内eSIMガイド 2026", desc: "ドバイ旅行のeSIM完全ガイド。ダウンタウン・DXB到着・砂漠サファリ・アブダビ日帰りに対応したプラン比較。" },
      ko: { title: "두바이 시내 eSIM 가이드 2026", desc: "두바이 여행용 eSIM 완전 가이드. 다운타운, DXB 공항 도착, 사막 사파리, 아부다비 당일치기 플랜 비교." },
      zh: { title: "迪拜市区eSIM完全指南 2026", desc: "迪拜旅行eSIM完全指南。市中心、迪拜机场抵达、沙漠越野和阿布扎比一日游的套餐对比。" },
    },
  },
  {
    slug: "osaka-esim-guide",
    category: "country",
    countrySlug: "japan",
    content: {
      en: { title: "Osaka eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Osaka with coverage for Namba, KIX arrivals, subway navigation, and day trips to Kyoto or Nara." },
      ja: { title: "大阪旅行のeSIMガイド 2026", desc: "大阪旅行のeSIM完全ガイド。難波・関空到着・地下鉄移動・京都/奈良日帰りに対応したプラン比較。" },
      ko: { title: "오사카 여행 eSIM 가이드 2026", desc: "오사카 여행용 eSIM 완전 가이드. 난바, 간사이공항, 지하철 이동, 교토・나라 당일치기 플랜 비교." },
      zh: { title: "大阪旅行eSIM完全指南 2026", desc: "大阪旅行eSIM完全指南。难波、关西机场抵达、地铁出行和京都奈良一日游的套餐对比。" },
    },
  },
  {
    slug: "kyoto-esim-guide",
    category: "country",
    countrySlug: "japan",
    content: {
      en: { title: "Kyoto eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Kyoto with coverage for Gion, Arashiyama, temple visits, and bus navigation across the city." },
      ja: { title: "京都旅行のeSIMガイド 2026", desc: "京都旅行のeSIM完全ガイド。祇園・嵐山・寺社巡り・市バス移動に対応したプラン比較。" },
      ko: { title: "교토 여행 eSIM 가이드 2026", desc: "교토 여행용 eSIM 완전 가이드. 기온, 아라시야마, 사찰 방문, 시내버스 이동 플랜 비교." },
      zh: { title: "京都旅行eSIM完全指南 2026", desc: "京都旅行eSIM完全指南。祇园、岚山、寺社参拜和市内巴士出行的套餐对比。" },
    },
  },
  {
    slug: "okinawa-esim",
    category: "country",
    countrySlug: "japan",
    content: {
      en: { title: "Okinawa eSIM Guide 2026 — Best Plans for Island Travel", desc: "Best eSIM plans for Okinawa with coverage for Naha, resort areas, diving spots, and remote island day trips." },
      ja: { title: "沖縄旅行のeSIMガイド 2026", desc: "沖縄旅行のeSIM完全ガイド。那覇・リゾートエリア・ダイビングスポット・離島への移動に対応したプラン比較。" },
      ko: { title: "오키나와 여행 eSIM 가이드 2026", desc: "오키나와 여행용 eSIM 완전 가이드. 나하, 리조트 지역, 다이빙 스팟, 외딴섬 이동 플랜 비교." },
      zh: { title: "冲绳旅行eSIM完全指南 2026", desc: "冲绳旅行eSIM完全指南。那霸、度假区、潜水地点和离岛出行的套餐对比。" },
    },
  },
  {
    slug: "scandinavia-esim",
    category: "topic",
    content: {
      en: { title: "Scandinavia Travel eSIM Guide 2026", desc: "One eSIM for Norway, Sweden, Denmark, Finland and Iceland — compare regional plans for Scandinavia multi-country trips." },
      ja: { title: "北欧周遊eSIMガイド 2026", desc: "ノルウェー・スウェーデン・デンマーク・フィンランド・アイスランドを1枚でカバーする北欧周遊向けeSIM比較ガイド。" },
      ko: { title: "북유럽 여행 eSIM 가이드 2026", desc: "노르웨이, 스웨덴, 덴마크, 핀란드, 아이슬란드를 1장으로 커버하는 북유럽 다국가 여행 eSIM 비교 가이드." },
      zh: { title: "北欧周游eSIM完全指南 2026", desc: "一张eSIM覆盖挪威、瑞典、丹麦、芬兰和冰岛的北欧多国周游套餐对比指南。" },
    },
  },
  {
    slug: "balkans-esim",
    category: "topic",
    content: {
      en: { title: "Balkans Travel eSIM Guide 2026", desc: "One eSIM for Croatia, Serbia, Montenegro, Bosnia, Albania and North Macedonia — compare regional plans for Balkan trips." },
      ja: { title: "バルカン半島周遊eSIMガイド 2026", desc: "クロアチア・セルビア・モンテネグロ・ボスニア・アルバニア・北マケドニアを1枚でカバーするバルカン周遊eSIM比較ガイド。" },
      ko: { title: "발칸 반도 여행 eSIM 가이드 2026", desc: "크로아티아, 세르비아, 몬테네그로, 보스니아, 알바니아, 북마케도니아를 커버하는 발칸 여행 eSIM 비교 가이드." },
      zh: { title: "巴尔干半岛周游eSIM完全指南 2026", desc: "覆盖克罗地亚、塞尔维亚、黑山、波黑、阿尔巴尼亚和北马其顿的巴尔干周游eSIM对比指南。" },
    },
  },
  {
    slug: "caribbean-esim",
    category: "topic",
    content: {
      en: { title: "Caribbean Travel eSIM Guide 2026", desc: "One eSIM for Caribbean island hopping — compare regional plans covering Bahamas, Jamaica, Dominican Republic, and more." },
      ja: { title: "カリブ海旅行eSIMガイド 2026", desc: "バハマ・ジャマイカ・ドミニカ共和国などカリブ諸島を周遊する旅行者向けの地域eSIM比較ガイド。" },
      ko: { title: "카리브해 여행 eSIM 가이드 2026", desc: "바하마, 자메이카, 도미니카공화국 등 카리브해 아일랜드 호핑 여행자를 위한 지역 eSIM 비교 가이드." },
      zh: { title: "加勒比海旅行eSIM完全指南 2026", desc: "面向巴哈马、牙买加、多米尼加等加勒比海跳岛旅行者的区域eSIM对比指南。" },
    },
  },
  {
    slug: "oceania-esim",
    category: "topic",
    content: {
      en: { title: "Oceania Travel eSIM Guide 2026", desc: "One eSIM for Australia, New Zealand, Fiji and Pacific islands — regional plans for Oceania multi-country trips." },
      ja: { title: "オセアニア周遊eSIMガイド 2026", desc: "オーストラリア・ニュージーランド・フィジー・太平洋諸島を1枚でカバーするオセアニア周遊向けeSIM比較ガイド。" },
      ko: { title: "오세아니아 여행 eSIM 가이드 2026", desc: "호주, 뉴질랜드, 피지, 태평양 섬들을 커버하는 오세아니아 다국가 여행 eSIM 비교 가이드." },
      zh: { title: "大洋洲周游eSIM完全指南 2026", desc: "覆盖澳大利亚、新西兰、斐济和太平洋岛屿的大洋洲多国旅行eSIM对比指南。" },
    },
  },
  {
    slug: "middle-east-esim",
    category: "topic",
    content: {
      en: { title: "Middle East Travel eSIM Guide 2026", desc: "One eSIM for UAE, Saudi Arabia, Qatar, Oman, Jordan and Israel — regional plans for Middle East multi-country trips." },
      ja: { title: "中東周遊eSIMガイド 2026", desc: "UAE・サウジアラビア・カタール・オマーン・ヨルダン・イスラエルを1枚でカバーする中東周遊eSIM比較ガイド。" },
      ko: { title: "중동 여행 eSIM 가이드 2026", desc: "UAE, 사우디아라비아, 카타르, 오만, 요르단, 이스라엘을 커버하는 중동 다국가 여행 eSIM 비교 가이드." },
      zh: { title: "中东周游eSIM完全指南 2026", desc: "覆盖阿联酋、沙特、卡塔尔、阿曼、约旦和以色列的中东多国旅行eSIM对比指南。" },
    },
  },
  {
    slug: "esim-for-concerts-kpop",
    category: "topic",
    content: {
      en: { title: "eSIM for K-Pop Concerts and Fan Trips to Korea 2026", desc: "Travel eSIM guide for K-Pop fans visiting Korea — ticketing apps, fan meets, venue access, and real-time translation." },
      ja: { title: "K-POPライブ遠征のeSIMガイド 2026", desc: "韓国K-POPライブ遠征者向けのeSIM完全ガイド。チケットアプリ・ファンミ・会場アクセス・リアルタイム翻訳に対応。" },
      ko: { title: "K-POP 콘서트 원정용 eSIM 가이드 2026", desc: "한국 K-POP 콘서트 원정을 준비하는 팬을 위한 eSIM 가이드. 티켓 앱, 팬미팅, 공연장 접근, 실시간 번역 정리." },
      zh: { title: "K-POP演唱会远征eSIM完全指南 2026", desc: "面向赴韩观看K-POP演唱会粉丝的eSIM指南。票务App、粉丝见面会、场馆出行和实时翻译说明。" },
    },
  },
  {
    slug: "esim-for-sports-events",
    category: "topic",
    content: {
      en: { title: "eSIM for International Sports Events 2026", desc: "Travel eSIM guide for fans attending the Olympics, World Cup, F1 and other international sporting events abroad." },
      ja: { title: "海外スポーツ観戦のeSIMガイド 2026", desc: "オリンピック・ワールドカップ・F1など海外スポーツ観戦者向けのeSIM完全ガイド。" },
      ko: { title: "해외 스포츠 관람 eSIM 가이드 2026", desc: "올림픽, 월드컵, F1 등 해외 스포츠 관람을 위한 eSIM 완전 가이드." },
      zh: { title: "海外体育赛事观赛eSIM完全指南 2026", desc: "面向赴海外观看奥运、世界杯、F1等体育赛事观众的eSIM完整指南。" },
    },
  },
  {
    slug: "esim-for-youtubers-creators",
    category: "topic",
    content: {
      en: { title: "eSIM for Travel YouTubers and Content Creators 2026", desc: "Best travel eSIM plans for YouTubers, vloggers and content creators — high data allowances, upload speeds, and reliable coverage." },
      ja: { title: "旅行YouTuber・クリエイター向けeSIMガイド 2026", desc: "旅行YouTuber・Vlogger向けの海外eSIM完全ガイド。大容量データ・アップロード速度・安定カバレッジを重視したプラン比較。" },
      ko: { title: "여행 유튜버・크리에이터용 eSIM 가이드 2026", desc: "여행 유튜버와 브이로거를 위한 해외 eSIM 가이드. 대용량 데이터, 업로드 속도, 안정적인 커버리지 중심 비교." },
      zh: { title: "旅行YouTuber与创作者eSIM完全指南 2026", desc: "面向旅行YouTuber和Vlogger的海外eSIM指南。大流量、上传速度与稳定覆盖的套餐对比。" },
    },
  },
  {
    slug: "istanbul-esim",
    category: "country",
    countrySlug: "turkey",
    content: {
      en: { title: "Istanbul eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Istanbul with coverage for Sultanahmet, IST arrivals, Bosphorus ferries, and day trips to Cappadocia." },
      ja: { title: "イスタンブール旅行のeSIMガイド 2026", desc: "イスタンブール旅行のeSIM完全ガイド。スルタンアフメット・IST到着・ボスポラス海峡・カッパドキア遠征に対応したプラン比較。" },
      ko: { title: "이스탄불 여행 eSIM 가이드 2026", desc: "이스탄불 여행용 eSIM 완전 가이드. 술탄아흐메트, IST 공항, 보스포루스, 카파도키아 당일치기 플랜 비교." },
      zh: { title: "伊斯坦布尔旅行eSIM完全指南 2026", desc: "伊斯坦布尔旅行eSIM完全指南。苏丹艾哈迈德、伊斯坦布尔机场、博斯普鲁斯海峡和卡帕多奇亚一日游的套餐对比。" },
    },
  },
  {
    slug: "lisbon-esim",
    category: "country",
    countrySlug: "portugal",
    content: {
      en: { title: "Lisbon eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Lisbon with coverage for Alfama, LIS arrivals, Tram 28, and day trips to Sintra and Cascais." },
      ja: { title: "リスボン旅行のeSIMガイド 2026", desc: "リスボン旅行のeSIM完全ガイド。アルファマ・リスボン空港・28番トラム・シントラ/カスカイス日帰りに対応したプラン比較。" },
      ko: { title: "리스본 여행 eSIM 가이드 2026", desc: "리스본 여행용 eSIM 완전 가이드. 알파마, 리스본 공항, 28번 트램, 신트라/카스카이스 당일치기 플랜 비교." },
      zh: { title: "里斯本旅行eSIM完全指南 2026", desc: "里斯本旅行eSIM完全指南。阿尔法玛、里斯本机场、28路电车和辛特拉/卡斯凯什一日游的套餐对比。" },
    },
  },
  {
    slug: "berlin-esim",
    category: "country",
    countrySlug: "germany",
    content: {
      en: { title: "Berlin eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Berlin with coverage for Mitte, BER arrivals, U-Bahn navigation, and day trips to Potsdam." },
      ja: { title: "ベルリン旅行のeSIMガイド 2026", desc: "ベルリン旅行のeSIM完全ガイド。ミッテ・BER到着・Uバーン移動・ポツダム日帰りに対応したプラン比較。" },
      ko: { title: "베를린 여행 eSIM 가이드 2026", desc: "베를린 여행용 eSIM 완전 가이드. 미테, BER 공항, U반 이동, 포츠담 당일치기 플랜 비교." },
      zh: { title: "柏林旅行eSIM完全指南 2026", desc: "柏林旅行eSIM完全指南。米特区、勃兰登堡机场、U-Bahn出行和波茨坦一日游的套餐对比。" },
    },
  },
  {
    slug: "munich-esim",
    category: "country",
    countrySlug: "germany",
    content: {
      en: { title: "Munich eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Munich with coverage for Marienplatz, MUC arrivals, U-Bahn, and Oktoberfest or Neuschwanstein day trips." },
      ja: { title: "ミュンヘン旅行のeSIMガイド 2026", desc: "ミュンヘン旅行のeSIM完全ガイド。マリエン広場・MUC到着・Uバーン・オクトーバーフェストやノイシュヴァンシュタイン日帰りに対応。" },
      ko: { title: "뮌헨 여행 eSIM 가이드 2026", desc: "뮌헨 여행용 eSIM 완전 가이드. 마리엔 광장, MUC 공항, U반, 옥토버페스트/노이슈반슈타인 당일치기 플랜 비교." },
      zh: { title: "慕尼黑旅行eSIM完全指南 2026", desc: "慕尼黑旅行eSIM完全指南。玛利亚广场、慕尼黑机场、U-Bahn和啤酒节/新天鹅堡一日游的套餐对比。" },
    },
  },
  {
    slug: "sydney-esim",
    category: "country",
    countrySlug: "australia",
    content: {
      en: { title: "Sydney eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Sydney with coverage for the Opera House, SYD arrivals, Bondi Beach, and Blue Mountains day trips." },
      ja: { title: "シドニー旅行のeSIMガイド 2026", desc: "シドニー旅行のeSIM完全ガイド。オペラハウス・SYD到着・ボンダイビーチ・ブルーマウンテンズ日帰りに対応したプラン比較。" },
      ko: { title: "시드니 여행 eSIM 가이드 2026", desc: "시드니 여행용 eSIM 완전 가이드. 오페라 하우스, SYD 공항, 본다이 비치, 블루 마운틴 당일치기 플랜 비교." },
      zh: { title: "悉尼旅行eSIM完全指南 2026", desc: "悉尼旅行eSIM完全指南。歌剧院、悉尼机场、邦迪海滩和蓝山一日游的套餐对比。" },
    },
  },
  {
    slug: "melbourne-esim",
    category: "country",
    countrySlug: "australia",
    content: {
      en: { title: "Melbourne eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Melbourne with coverage for the CBD, MEL arrivals, tram lines, and Great Ocean Road day trips." },
      ja: { title: "メルボルン旅行のeSIMガイド 2026", desc: "メルボルン旅行のeSIM完全ガイド。CBD・MEL到着・トラム・グレートオーシャンロード日帰りに対応したプラン比較。" },
      ko: { title: "멜버른 여행 eSIM 가이드 2026", desc: "멜버른 여행용 eSIM 완전 가이드. CBD, MEL 공항, 트램, 그레이트 오션 로드 당일치기 플랜 비교." },
      zh: { title: "墨尔本旅行eSIM完全指南 2026", desc: "墨尔本旅行eSIM完全指南。CBD、墨尔本机场、有轨电车和大洋路一日游的套餐对比。" },
    },
  },
  {
    slug: "vienna-esim",
    category: "country",
    countrySlug: "austria",
    content: {
      en: { title: "Vienna eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Vienna with coverage for Schönbrunn, VIE arrivals, U-Bahn, and day trips to Salzburg or Bratislava." },
      ja: { title: "ウィーン旅行のeSIMガイド 2026", desc: "ウィーン旅行のeSIM完全ガイド。シェーンブルン・VIE到着・Uバーン・ザルツブルク/ブラチスラバ日帰りに対応。" },
      ko: { title: "빈 여행 eSIM 가이드 2026", desc: "빈 여행용 eSIM 완전 가이드. 쇤브룬, VIE 공항, U반, 잘츠부르크/브라티슬라바 당일치기 플랜 비교." },
      zh: { title: "维也纳旅行eSIM完全指南 2026", desc: "维也纳旅行eSIM完全指南。美泉宫、维也纳机场、U-Bahn和萨尔茨堡/布拉迪斯拉发一日游的套餐对比。" },
    },
  },
  {
    slug: "prague-esim",
    category: "country",
    countrySlug: "czech-republic",
    content: {
      en: { title: "Prague eSIM Guide 2026 — Best Plans for Travelers", desc: "Best eSIM plans for Prague with coverage for Old Town, PRG arrivals, tram network, and day trips to Český Krumlov." },
      ja: { title: "プラハ旅行のeSIMガイド 2026", desc: "プラハ旅行のeSIM完全ガイド。旧市街・PRG到着・トラム移動・チェスキークルムロフ日帰りに対応したプラン比較。" },
      ko: { title: "프라하 여행 eSIM 가이드 2026", desc: "프라하 여행용 eSIM 완전 가이드. 구시가지, PRG 공항, 트램, 체스키크룸로프 당일치기 플랜 비교." },
      zh: { title: "布拉格旅行eSIM完全指南 2026", desc: "布拉格旅行eSIM完全指南。老城区、布拉格机场、有轨电车和克鲁姆洛夫一日游的套餐对比。" },
    },
  },
  {
    slug: "esim-pixel-setup",
    category: "howto",
    content: {
      en: { title: "Google Pixel eSIM Setup Guide 2026", desc: "Step-by-step eSIM setup for Google Pixel phones: QR code activation, dual SIM, carrier switching, and troubleshooting tips." },
      ja: { title: "Google PixelのeSIM設定完全ガイド 2026", desc: "Google PixelでのeSIM設定手順。QRコード開通・デュアルSIM・回線切替・トラブルシューティングを解説。" },
      ko: { title: "구글 픽셀 eSIM 설정 가이드 2026", desc: "구글 픽셀에서 eSIM 설정하는 방법. QR 코드 개통, 듀얼심, 회선 전환, 문제 해결 팁 정리." },
      zh: { title: "Google Pixel eSIM设置完全指南 2026", desc: "Google Pixel手机eSIM设置教程。二维码开通、双卡、运营商切换和故障排除说明。" },
    },
  },
  {
    slug: "esim-galaxy-setup",
    category: "howto",
    content: {
      en: { title: "Samsung Galaxy eSIM Setup Guide 2026", desc: "Step-by-step eSIM setup for Samsung Galaxy S, Z Fold and Z Flip series: activation, dual SIM, and troubleshooting." },
      ja: { title: "Samsung GalaxyのeSIM設定完全ガイド 2026", desc: "Galaxy S・Z Fold・Z FlipシリーズでのeSIM設定手順。開通・デュアルSIM・トラブル対応を解説。" },
      ko: { title: "삼성 갤럭시 eSIM 설정 가이드 2026", desc: "갤럭시 S, Z Fold, Z Flip 시리즈에서 eSIM 설정하는 방법. 개통, 듀얼심, 문제 해결 팁 정리." },
      zh: { title: "三星Galaxy eSIM设置完全指南 2026", desc: "三星Galaxy S、Z Fold、Z Flip系列eSIM设置教程。开通、双卡和故障排除说明。" },
    },
  },
  {
    slug: "esim-ipad-cellular-travel",
    category: "howto",
    content: {
      en: { title: "iPad Cellular eSIM for International Travel 2026", desc: "How to use an iPad with Cellular for travel eSIM abroad: activation, supported providers, and dual-device data sharing." },
      ja: { title: "iPad CellularでeSIMを海外で使う方法 2026", desc: "iPad CellularモデルでのeSIM海外利用ガイド。開通・対応プロバイダー・iPhoneとのデータ共有を解説。" },
      ko: { title: "iPad Cellular 해외 eSIM 사용 가이드 2026", desc: "iPad Cellular 모델에서 해외 eSIM 사용하는 방법. 개통, 지원 프로바이더, 아이폰과의 데이터 공유 정리." },
      zh: { title: "iPad Cellular海外eSIM使用指南 2026", desc: "iPad Cellular机型海外使用eSIM的完整指南。开通、支持的服务商和与iPhone共享数据说明。" },
    },
  },
  {
    slug: "esim-vpn-overseas",
    category: "howto",
    content: {
      en: { title: "Using a VPN with a Travel eSIM Abroad 2026", desc: "How to combine a VPN with a travel eSIM for safer public Wi-Fi, geo-restrictions, and stable video calls abroad." },
      ja: { title: "海外eSIMとVPNを併用する方法 2026", desc: "海外eSIMとVPNを組み合わせて、公衆Wi‑Fiの安全確保・地域制限回避・安定したビデオ通話を実現する方法を解説。" },
      ko: { title: "여행 eSIM과 VPN 병용 가이드 2026", desc: "여행 eSIM과 VPN을 함께 사용해 공용 Wi‑Fi 보안, 지역 제한 우회, 안정적인 화상회의를 구현하는 방법." },
      zh: { title: "旅行eSIM与VPN搭配使用指南 2026", desc: "介绍如何将旅行eSIM与VPN搭配使用，提升公共Wi‑Fi安全、绕过地区限制并保持视频通话稳定。" },
    },
  },
  {
    slug: "chatgpt-overseas-esim",
    category: "howto",
    content: {
      en: { title: "Using ChatGPT Abroad with a Travel eSIM 2026", desc: "How to access ChatGPT, Claude, and Gemini abroad — regional restrictions, data usage, and eSIM setup tips." },
      ja: { title: "海外でChatGPTをeSIMで使う方法 2026", desc: "海外旅行中のChatGPT・Claude・Gemini利用ガイド。地域制限・データ消費量・eSIM設定のコツを解説。" },
      ko: { title: "해외에서 ChatGPT를 eSIM으로 사용하는 법 2026", desc: "해외에서 ChatGPT, Claude, Gemini 사용 방법. 지역 제한, 데이터 소비량, eSIM 설정 팁 정리." },
      zh: { title: "海外使用ChatGPT与eSIM完全指南 2026", desc: "海外旅行期间使用ChatGPT、Claude、Gemini的完整指南。地区限制、流量消耗和eSIM设置说明。" },
    },
  },
  {
    slug: "google-maps-offline-travel",
    category: "howto",
    content: {
      en: { title: "Google Maps Offline for Travel + eSIM Strategy 2026", desc: "How to use Google Maps offline abroad to save data while pairing with a travel eSIM for live traffic and search." },
      ja: { title: "海外旅行のGoogle Mapsオフライン活用 + eSIM戦略 2026", desc: "Google Mapsのオフラインマップで通信量を節約しつつ、eSIMでリアルタイム検索・交通情報を利用する方法を解説。" },
      ko: { title: "해외여행 Google Maps 오프라인 + eSIM 전략 2026", desc: "Google Maps 오프라인 지도로 데이터를 절약하면서 eSIM으로 실시간 검색과 교통 정보를 활용하는 방법." },
      zh: { title: "海外旅行Google Maps离线 + eSIM策略 2026", desc: "使用Google Maps离线地图节省流量，搭配旅行eSIM实现实时搜索与路况查询的实用指南。" },
    },
  },
  {
    slug: "esim-2fa-sms-abroad",
    category: "howto",
    content: {
      en: { title: "Receiving 2FA SMS Codes Abroad with eSIM 2026", desc: "How to receive bank, Google, and service 2FA SMS codes while traveling abroad — keep your home number with dual SIM." },
      ja: { title: "海外でeSIMと2段階認証SMSを両立する方法 2026", desc: "海外旅行中に銀行・Google・各種サービスの2段階認証SMSを受信する方法。日本番号をデュアルSIMで維持するテクニックを解説。" },
      ko: { title: "해외에서 eSIM과 2단계 인증 SMS 병용 가이드 2026", desc: "해외여행 중 은행・구글・서비스 2FA SMS를 받는 방법. 듀얼심으로 국내 번호를 유지하는 노하우 정리." },
      zh: { title: "海外接收2FA短信验证码与eSIM并用指南 2026", desc: "海外旅行期间接收银行、Google和各类服务2FA短信验证码的方法。通过双卡保留本国号码的实用技巧。" },
    },
  },
  {
    slug: "esim-roaming-carrier-comparison",
    category: "topic",
    content: {
      en: { title: "Carrier Roaming vs Travel eSIM 2026 — Full Comparison", desc: "Head-to-head comparison of carrier international roaming and dedicated travel eSIMs on price, speed, and convenience." },
      ja: { title: "キャリア海外ローミング vs 旅行eSIM 徹底比較 2026", desc: "大手キャリアの国際ローミングと旅行専用eSIMを料金・速度・利便性で徹底比較する購入ガイド。" },
      ko: { title: "통신사 국제 로밍 vs 여행 eSIM 완전 비교 2026", desc: "대형 통신사 국제 로밍과 여행 전용 eSIM을 요금, 속도, 편의성으로 철저히 비교하는 구매 가이드." },
      zh: { title: "运营商国际漫游 vs 旅行eSIM完全对比 2026", desc: "从价格、速度和便利性角度对比主流运营商国际漫游与专用旅行eSIM的购买指南。" },
    },
  },
  {
    slug: "esim-battery-usage",
    category: "howto",
    content: {
      en: { title: "Does eSIM Drain Your Battery? Travel Tips 2026", desc: "How eSIM affects battery life during travel, dual-SIM power consumption, and settings to maximize all-day use abroad." },
      ja: { title: "eSIMはバッテリーを消費する？旅行中の対策 2026", desc: "eSIMが旅行中のバッテリーに与える影響、デュアルSIM時の消費、1日使い切るための設定最適化を解説。" },
      ko: { title: "eSIM은 배터리를 많이 쓰나? 여행 중 팁 2026", desc: "여행 중 eSIM이 배터리에 미치는 영향, 듀얼심 전력 소비, 하루 사용을 위한 설정 최적화 정리." },
      zh: { title: "eSIM会更耗电吗？旅行省电指南 2026", desc: "旅行中eSIM对电池的影响、双卡耗电情况以及延长一整天续航的设置优化建议。" },
    },
  },
  {
    slug: "esim-corporate-bulk",
    category: "topic",
    content: {
      en: { title: "Corporate Bulk eSIM for Business Travel 2026", desc: "How companies can buy and manage travel eSIM plans at scale for employees — invoicing, MDM, expense tracking, and support." },
      ja: { title: "法人向け一括eSIM購入ガイド 2026", desc: "企業の出張者向けに海外eSIMを一括購入・管理する方法。請求書払い・MDM連携・経費精算・サポート体制を解説。" },
      ko: { title: "기업용 단체 eSIM 구매 가이드 2026", desc: "기업이 출장 직원용 여행 eSIM을 일괄 구매・관리하는 방법. 청구서 결제, MDM 연동, 경비 처리, 지원 체계 정리." },
      zh: { title: "企业批量采购旅行eSIM指南 2026", desc: "企业为出差员工批量购买和管理旅行eSIM的方案。发票结算、MDM集成、费用报销与支持体系说明。" },
    },
  },
  {
    slug: "esim-for-flight-attendants",
    category: "topic",
    content: {
      en: { title: "eSIM for Flight Attendants and Cabin Crew 2026", desc: "Best travel eSIM strategies for cabin crew — fast activation on layovers, multi-country plans, and crew-friendly pricing." },
      ja: { title: "CA・客室乗務員向けeSIMガイド 2026", desc: "キャビンクルー向けのeSIM活用術。ステイ先での即時開通・複数国プラン・クルーに優しい料金体系を解説。" },
      ko: { title: "항공 승무원을 위한 eSIM 가이드 2026", desc: "객실 승무원을 위한 eSIM 활용 가이드. 레이오버 즉시 개통, 다국가 플랜, 승무원 친화적인 요금제 정리." },
      zh: { title: "空乘人员旅行eSIM使用指南 2026", desc: "面向客舱乘务员的eSIM使用指南。中转站即时开通、多国套餐与空乘友好定价方案说明。" },
    },
  },
  {
    slug: "esim-for-tour-guides",
    category: "topic",
    content: {
      en: { title: "eSIM for Tour Guides and Tour Leaders 2026", desc: "Travel eSIM solutions for tour guides managing groups abroad — hotspot for clients, backup coverage, and reliable maps." },
      ja: { title: "添乗員・ツアーガイド向けeSIMガイド 2026", desc: "海外ツアー添乗員のためのeSIM活用ガイド。参加者向けホットスポット・バックアップ回線・地図の安定性を解説。" },
      ko: { title: "여행 가이드를 위한 eSIM 가이드 2026", desc: "해외 투어 가이드를 위한 eSIM 활용 가이드. 참가자용 핫스팟, 백업 회선, 안정적인 지도 정리." },
      zh: { title: "导游与领队eSIM使用指南 2026", desc: "面向海外领队与导游的eSIM使用指南。为团员提供热点、备用网络和稳定地图的方案说明。" },
    },
  },
  {
    slug: "singapore-city-esim",
    category: "country",
    countrySlug: "singapore",
    content: {
      en: { title: "Singapore City eSIM Guide 2026", desc: "Best eSIM plans for Singapore with 5G for Marina Bay, Changi arrivals, MRT, and Sentosa day trips." },
      ja: { title: "シンガポール市内eSIMガイド 2026", desc: "シンガポール旅行のeSIM完全ガイド。マリーナベイ・チャンギ到着・MRT・セントーサ島に対応したプラン比較。" },
      ko: { title: "싱가포르 시내 eSIM 가이드 2026", desc: "싱가포르 여행용 eSIM 완전 가이드. 마리나베이, 창이공항, MRT, 센토사 당일치기 플랜 비교." },
      zh: { title: "新加坡市区eSIM完全指南 2026", desc: "新加坡旅行eSIM完全指南。滨海湾、樟宜机场、MRT与圣淘沙一日游的套餐对比。" },
    },
  },
  {
    slug: "kuala-lumpur-esim",
    category: "country",
    countrySlug: "malaysia",
    content: {
      en: { title: "Kuala Lumpur eSIM Guide 2026", desc: "Best eSIM plans for Kuala Lumpur with coverage for KLCC, KLIA arrivals, Grab, and Genting day trips." },
      ja: { title: "クアラルンプール旅行のeSIMガイド 2026", desc: "クアラルンプール旅行のeSIM完全ガイド。KLCC・KLIA到着・Grab・ゲンティン日帰りに対応したプラン比較。" },
      ko: { title: "쿠알라룸푸르 여행 eSIM 가이드 2026", desc: "쿠알라룸푸르 여행용 eSIM 완전 가이드. KLCC, KLIA 공항, Grab, 겐팅 당일치기 플랜 비교." },
      zh: { title: "吉隆坡旅行eSIM完全指南 2026", desc: "吉隆坡旅行eSIM完全指南。KLCC、吉隆坡机场、Grab打车与云顶一日游的套餐对比。" },
    },
  },
  {
    slug: "ho-chi-minh-esim",
    category: "country",
    countrySlug: "vietnam",
    content: {
      en: { title: "Ho Chi Minh City eSIM Guide 2026", desc: "Best eSIM plans for Ho Chi Minh City with coverage for District 1, SGN arrivals, Grab rides, and Mekong Delta day trips." },
      ja: { title: "ホーチミン旅行のeSIMガイド 2026", desc: "ホーチミン旅行のeSIM完全ガイド。1区・タンソンニャット到着・Grab・メコンデルタ日帰りに対応したプラン比較。" },
      ko: { title: "호치민 여행 eSIM 가이드 2026", desc: "호치민 여행용 eSIM 완전 가이드. 1군, 탄손녓 공항, Grab, 메콩 델타 당일치기 플랜 비교." },
      zh: { title: "胡志明市旅行eSIM完全指南 2026", desc: "胡志明市旅行eSIM完全指南。第一郡、新山一机场、Grab和湄公河三角洲一日游的套餐对比。" },
    },
  },
  {
    slug: "hanoi-esim",
    category: "country",
    countrySlug: "vietnam",
    content: {
      en: { title: "Hanoi eSIM Guide 2026", desc: "Best eSIM plans for Hanoi with coverage for the Old Quarter, Noi Bai arrivals, and day trips to Ha Long Bay or Ninh Binh." },
      ja: { title: "ハノイ旅行のeSIMガイド 2026", desc: "ハノイ旅行のeSIM完全ガイド。旧市街・ノイバイ到着・ハロン湾/ニンビン日帰りに対応したプラン比較。" },
      ko: { title: "하노이 여행 eSIM 가이드 2026", desc: "하노이 여행용 eSIM 완전 가이드. 구시가지, 노이바이 공항, 하롱베이/닌빈 당일치기 플랜 비교." },
      zh: { title: "河内旅行eSIM完全指南 2026", desc: "河内旅行eSIM完全指南。老城区、内排机场、下龙湾与宁平一日游的套餐对比。" },
    },
  },
  {
    slug: "taipei-esim",
    category: "country",
    countrySlug: "taiwan",
    content: {
      en: { title: "Taipei eSIM Guide 2026", desc: "Best eSIM plans for Taipei with 5G for Taipei 101, TPE arrivals, MRT, and day trips to Jiufen or Yangmingshan." },
      ja: { title: "台北旅行のeSIMガイド 2026", desc: "台北旅行のeSIM完全ガイド。台北101・桃園到着・MRT・九份/陽明山日帰りに対応したプラン比較。" },
      ko: { title: "타이페이 여행 eSIM 가이드 2026", desc: "타이페이 여행용 eSIM 완전 가이드. 타이페이 101, 타오위안 공항, MRT, 지우펀/양밍산 당일치기 플랜 비교." },
      zh: { title: "台北旅行eSIM完全指南 2026", desc: "台北旅行eSIM完全指南。101大楼、桃园机场、捷运与九份/阳明山一日游的套餐对比。" },
    },
  },
  {
    slug: "hong-kong-city-esim",
    category: "country",
    countrySlug: "hong-kong",
    content: {
      en: { title: "Hong Kong City eSIM Guide 2026", desc: "Best eSIM plans for Hong Kong with 5G for Central, HKG arrivals, MTR, and day trips to Macau or Lantau." },
      ja: { title: "香港市内eSIMガイド 2026", desc: "香港旅行のeSIM完全ガイド。セントラル・HKG到着・MTR・マカオ/ランタオ日帰りに対応したプラン比較。" },
      ko: { title: "홍콩 시내 eSIM 가이드 2026", desc: "홍콩 여행용 eSIM 완전 가이드. 센트럴, HKG 공항, MTR, 마카오/란타우 당일치기 플랜 비교." },
      zh: { title: "香港市区eSIM完全指南 2026", desc: "香港旅行eSIM完全指南。中环、香港机场、港铁与澳门/大屿山一日游的套餐对比。" },
    },
  },
  {
    slug: "toronto-esim",
    category: "country",
    countrySlug: "canada",
    content: {
      en: { title: "Toronto eSIM Guide 2026", desc: "Best eSIM plans for Toronto with coverage for downtown, YYZ arrivals, TTC, and day trips to Niagara Falls." },
      ja: { title: "トロント旅行のeSIMガイド 2026", desc: "トロント旅行のeSIM完全ガイド。ダウンタウン・YYZ到着・TTC・ナイアガラの滝日帰りに対応したプラン比較。" },
      ko: { title: "토론토 여행 eSIM 가이드 2026", desc: "토론토 여행용 eSIM 완전 가이드. 다운타운, YYZ 공항, TTC, 나이아가라 폭포 당일치기 플랜 비교." },
      zh: { title: "多伦多旅行eSIM完全指南 2026", desc: "多伦多旅行eSIM完全指南。市中心、皮尔逊机场、TTC与尼亚加拉瀑布一日游的套餐对比。" },
    },
  },
  {
    slug: "vancouver-esim",
    category: "country",
    countrySlug: "canada",
    content: {
      en: { title: "Vancouver eSIM Guide 2026", desc: "Best eSIM plans for Vancouver with coverage for downtown, YVR arrivals, SkyTrain, and Whistler day trips." },
      ja: { title: "バンクーバー旅行のeSIMガイド 2026", desc: "バンクーバー旅行のeSIM完全ガイド。ダウンタウン・YVR到着・スカイトレイン・ウィスラー日帰りに対応したプラン比較。" },
      ko: { title: "밴쿠버 여행 eSIM 가이드 2026", desc: "밴쿠버 여행용 eSIM 완전 가이드. 다운타운, YVR 공항, 스카이트레인, 휘슬러 당일치기 플랜 비교." },
      zh: { title: "温哥华旅行eSIM完全指南 2026", desc: "温哥华旅行eSIM完全指南。市中心、温哥华机场、SkyTrain与惠斯勒一日游的套餐对比。" },
    },
  },
  {
    slug: "san-francisco-esim",
    category: "country",
    countrySlug: "united-states",
    content: {
      en: { title: "San Francisco eSIM Guide 2026", desc: "Best eSIM plans for San Francisco with coverage for Union Square, SFO arrivals, BART, and Silicon Valley trips." },
      ja: { title: "サンフランシスコ旅行のeSIMガイド 2026", desc: "サンフランシスコ旅行のeSIM完全ガイド。ユニオンスクエア・SFO到着・BART・シリコンバレーに対応したプラン比較。" },
      ko: { title: "샌프란시스코 여행 eSIM 가이드 2026", desc: "샌프란시스코 여행용 eSIM 완전 가이드. 유니언 스퀘어, SFO 공항, BART, 실리콘밸리 방문 플랜 비교." },
      zh: { title: "旧金山旅行eSIM完全指南 2026", desc: "旧金山旅行eSIM完全指南。联合广场、SFO机场、BART与硅谷出行的套餐对比。" },
    },
  },
  {
    slug: "miami-esim",
    category: "country",
    countrySlug: "united-states",
    content: {
      en: { title: "Miami eSIM Guide 2026", desc: "Best eSIM plans for Miami with coverage for South Beach, MIA arrivals, cruise terminals, and Everglades day trips." },
      ja: { title: "マイアミ旅行のeSIMガイド 2026", desc: "マイアミ旅行のeSIM完全ガイド。サウスビーチ・MIA到着・クルーズターミナル・エバーグレーズ日帰りに対応。" },
      ko: { title: "마이애미 여행 eSIM 가이드 2026", desc: "마이애미 여행용 eSIM 완전 가이드. 사우스비치, MIA 공항, 크루즈 터미널, 에버글레이즈 당일치기 플랜 비교." },
      zh: { title: "迈阿密旅行eSIM完全指南 2026", desc: "迈阿密旅行eSIM完全指南。南海滩、MIA机场、邮轮码头与大沼泽地一日游的套餐对比。" },
    },
  },
  {
    slug: "tanzania-esim",
    category: "country",
    countrySlug: "tanzania",
    content: {
      en: { title: "Tanzania eSIM Guide 2026", desc: "Best eSIM plans for Tanzania with coverage for Dar es Salaam, Kilimanjaro, Serengeti safaris, and Zanzibar trips." },
      ja: { title: "タンザニアのeSIMガイド 2026", desc: "タンザニア旅行のeSIM完全ガイド。ダルエスサラーム・キリマンジャロ・セレンゲティサファリ・ザンジバルの通信環境。" },
      ko: { title: "탄자니아 eSIM 가이드 2026", desc: "탄자니아 여행용 eSIM 완전 가이드. 다르에스살람, 킬리만자로, 세렝게티 사파리, 잔지바르 통신 환경과 플랜." },
      zh: { title: "坦桑尼亚eSIM完全指南 2026", desc: "坦桑尼亚旅行eSIM完全指南。达累斯萨拉姆、乞力马扎罗、塞伦盖蒂野生动物园与桑给巴尔的网络环境。" },
    },
  },
  {
    slug: "ethiopia-esim",
    category: "country",
    countrySlug: "ethiopia",
    content: {
      en: { title: "Ethiopia eSIM Guide 2026", desc: "Best eSIM plans for Ethiopia with coverage for Addis Ababa, Lalibela, Gondar, and Omo Valley travel." },
      ja: { title: "エチオピアのeSIMガイド 2026", desc: "エチオピア旅行のeSIM完全ガイド。アディスアベバ・ラリベラ・ゴンダール・オモ渓谷の通信環境とプラン。" },
      ko: { title: "에티오피아 eSIM 가이드 2026", desc: "에티오피아 여행용 eSIM 완전 가이드. 아디스아바바, 랄리벨라, 곤다르, 오모 계곡의 통신 환경과 플랜." },
      zh: { title: "埃塞俄比亚eSIM完全指南 2026", desc: "埃塞俄比亚旅行eSIM完全指南。亚的斯亚贝巴、拉利贝拉、贡德尔与奥莫河谷的网络环境。" },
    },
  },
  {
    slug: "uzbekistan-esim",
    category: "country",
    countrySlug: "uzbekistan",
    content: {
      en: { title: "Uzbekistan eSIM Guide 2026", desc: "Best eSIM plans for Uzbekistan with coverage for Tashkent, Samarkand, Bukhara, and the Silk Road route." },
      ja: { title: "ウズベキスタンのeSIMガイド 2026", desc: "ウズベキスタン旅行のeSIM完全ガイド。タシケント・サマルカンド・ブハラ・シルクロードルートの通信環境。" },
      ko: { title: "우즈베키스탄 eSIM 가이드 2026", desc: "우즈베키스탄 여행용 eSIM 완전 가이드. 타슈켄트, 사마르칸트, 부하라, 실크로드 루트의 통신 환경." },
      zh: { title: "乌兹别克斯坦eSIM完全指南 2026", desc: "乌兹别克斯坦旅行eSIM完全指南。塔什干、撒马尔罕、布哈拉与丝绸之路沿线的网络环境。" },
    },
  },
  {
    slug: "georgia-esim",
    category: "country",
    countrySlug: "georgia",
    content: {
      en: { title: "Georgia (Country) eSIM Guide 2026", desc: "Best eSIM plans for Georgia with coverage for Tbilisi, Batumi, Kazbegi mountains, and the Caucasus wine regions." },
      ja: { title: "ジョージアのeSIMガイド 2026", desc: "ジョージア(グルジア)旅行のeSIM完全ガイド。トビリシ・バトゥミ・カズベギ・ワイナリー地帯の通信環境。" },
      ko: { title: "조지아 eSIM 가이드 2026", desc: "조지아(그루지아) 여행용 eSIM 완전 가이드. 트빌리시, 바투미, 카즈베기, 와인 산지의 통신 환경." },
      zh: { title: "格鲁吉亚eSIM完全指南 2026", desc: "格鲁吉亚旅行eSIM完全指南。第比利斯、巴统、卡兹别吉与高加索葡萄酒产区的网络环境。" },
    },
  },
  {
    slug: "central-asia-esim",
    category: "topic",
    content: {
      en: { title: "Central Asia Travel eSIM Guide 2026", desc: "One eSIM for Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan — Silk Road route comparison." },
      ja: { title: "中央アジア周遊eSIMガイド 2026", desc: "ウズベキスタン・カザフスタン・キルギス・タジキスタン・トルクメニスタンを1枚でカバーするシルクロード周遊eSIMガイド。" },
      ko: { title: "중앙아시아 여행 eSIM 가이드 2026", desc: "우즈베키스탄, 카자흐스탄, 키르기스스탄, 타지키스탄, 투르크메니스탄 실크로드 여행 eSIM 가이드." },
      zh: { title: "中亚周游eSIM完全指南 2026", desc: "覆盖乌兹别克斯坦、哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦和土库曼斯坦的丝绸之路周游eSIM对比。" },
    },
  },
  {
    slug: "africa-safari-esim",
    category: "topic",
    content: {
      en: { title: "Africa Safari Travel eSIM Guide 2026", desc: "Travel eSIM guide for safari trips in Kenya, Tanzania, South Africa, Botswana and Namibia — coverage in remote parks." },
      ja: { title: "アフリカサファリ旅行eSIMガイド 2026", desc: "ケニア・タンザニア・南アフリカ・ボツワナ・ナミビアのサファリ旅行向けeSIMガイド。遠隔地の通信環境も解説。" },
      ko: { title: "아프리카 사파리 여행 eSIM 가이드 2026", desc: "케냐, 탄자니아, 남아공, 보츠와나, 나미비아 사파리 여행을 위한 eSIM 가이드. 오지 통신 환경까지 정리." },
      zh: { title: "非洲野生动物园旅行eSIM完全指南 2026", desc: "肯尼亚、坦桑尼亚、南非、博茨瓦纳与纳米比亚野生动物园旅行eSIM指南，含偏远地区网络情况。" },
    },
  },
  {
    slug: "esim-for-marathon-running",
    category: "topic",
    content: {
      en: { title: "eSIM for International Marathons and Running Trips 2026", desc: "Travel eSIM guide for runners attending Tokyo, Berlin, NYC, London and Boston marathons — expo check-in, GPS tracking, and race day." },
      ja: { title: "海外マラソン遠征のeSIMガイド 2026", desc: "東京・ベルリン・NYC・ロンドン・ボストンなど海外マラソン遠征者向けのeSIMガイド。エキスポ・GPSトラッキング・レース当日対応。" },
      ko: { title: "해외 마라톤 원정 eSIM 가이드 2026", desc: "도쿄, 베를린, 뉴욕, 런던, 보스턴 등 해외 마라톤 원정 러너를 위한 eSIM 가이드. 엑스포, GPS, 레이스 당일 대응." },
      zh: { title: "海外马拉松远征eSIM完全指南 2026", desc: "面向参加东京、柏林、纽约、伦敦、波士顿等海外马拉松跑者的eSIM指南。博览会、GPS追踪与比赛当日支持。" },
    },
  },
  {
    slug: "esim-for-study-abroad",
    category: "topic",
    content: {
      en: { title: "eSIM for Study Abroad and Exchange Programs 2026", desc: "Travel eSIM guide for students on exchange, short courses, or language programs — long-stay plans and local number options." },
      ja: { title: "留学・交換プログラム向けeSIMガイド 2026", desc: "交換留学・短期語学留学向けのeSIM活用ガイド。長期滞在プランと現地番号オプションを解説。" },
      ko: { title: "유학・교환 프로그램 eSIM 가이드 2026", desc: "교환학생, 단기 어학연수 학생을 위한 eSIM 가이드. 장기 체류 플랜과 현지 번호 옵션 정리." },
      zh: { title: "留学与交换项目eSIM完全指南 2026", desc: "面向交换生与短期语言学习者的eSIM指南。长期套餐与本地号码选项说明。" },
    },
  },
  {
    slug: "esim-for-medical-tourism",
    category: "topic",
    content: {
      en: { title: "eSIM for Medical Tourism Trips 2026", desc: "Travel eSIM guide for patients traveling abroad for medical treatment — hospital coordination, family contact, and extended stays." },
      ja: { title: "医療ツーリズム向けeSIMガイド 2026", desc: "海外医療渡航者向けのeSIM活用ガイド。病院との連絡・家族との通信・長期滞在対応プラン。" },
      ko: { title: "의료 관광 eSIM 가이드 2026", desc: "해외 의료 관광객을 위한 eSIM 활용 가이드. 병원 연락, 가족과의 통신, 장기 체류 플랜." },
      zh: { title: "医疗旅游eSIM完全指南 2026", desc: "面向海外就医患者的eSIM活用指南。与医院沟通、家属联络和长期停留套餐说明。" },
    },
  },
  {
    slug: "esim-for-pilgrimage",
    category: "topic",
    content: {
      en: { title: "eSIM for Pilgrimage Trips (Mecca, Vatican, Santiago) 2026", desc: "Travel eSIM guide for pilgrims traveling to Mecca, Rome, Santiago de Compostela, and other holy sites — navigation and family contact." },
      ja: { title: "巡礼・聖地旅行のeSIMガイド 2026", desc: "メッカ・バチカン・サンティアゴ巡礼路など聖地巡礼者向けのeSIMガイド。ナビゲーションと家族連絡を解説。" },
      ko: { title: "순례 여행 eSIM 가이드 2026", desc: "메카, 바티칸, 산티아고 순례길 등 성지 순례자를 위한 eSIM 가이드. 내비게이션과 가족 연락 정리." },
      zh: { title: "朝圣旅行eSIM完全指南 2026", desc: "面向麦加、梵蒂冈、圣地亚哥朝圣者的eSIM指南，涵盖导航与家人联系说明。" },
    },
  },
  {
    slug: "esim-travel-insurance-combo",
    category: "topic",
    content: {
      en: { title: "Travel eSIM vs Travel Insurance Data Add-ons 2026", desc: "Should you buy a travel eSIM or use data add-ons from travel insurance bundles? Compare cost, coverage, and reliability." },
      ja: { title: "海外eSIM vs 旅行保険のデータ特約 2026", desc: "海外eSIMと旅行保険に付随するデータ特約を料金・カバレッジ・信頼性で比較するガイド。" },
      ko: { title: "여행 eSIM vs 여행 보험 데이터 특약 2026", desc: "여행 eSIM과 여행 보험 데이터 특약을 가격, 커버리지, 신뢰성으로 비교하는 가이드." },
      zh: { title: "旅行eSIM vs 旅行保险流量附加服务 2026", desc: "从价格、覆盖与可靠性角度对比旅行eSIM与旅行保险附加流量服务的选择指南。" },
    },
  },
  {
    slug: "esim-for-cruise-mediterranean",
    category: "topic",
    content: {
      en: { title: "Mediterranean Cruise eSIM Guide 2026", desc: "Travel eSIM strategy for Mediterranean cruises — port stops in Italy, Greece, Spain, and France, plus at-sea alternatives." },
      ja: { title: "地中海クルーズのeSIMガイド 2026", desc: "地中海クルーズ向けのeSIM活用ガイド。イタリア・ギリシャ・スペイン・フランスの寄港地対応と船上代替手段。" },
      ko: { title: "지중해 크루즈 eSIM 가이드 2026", desc: "지중해 크루즈를 위한 eSIM 활용 가이드. 이탈리아, 그리스, 스페인, 프랑스 기항지와 선상 대안 정리." },
      zh: { title: "地中海邮轮eSIM完全指南 2026", desc: "面向地中海邮轮旅客的eSIM策略指南。意大利、希腊、西班牙、法国停靠港与船上备选方案说明。" },
    },
  },
  {
    slug: "fukuoka-esim",
    category: "country",
    countrySlug: "japan",
    content: {
      en: { title: "Fukuoka eSIM Guide 2026", desc: "Best eSIM plans for Fukuoka with coverage for Hakata, FUK arrivals, subway, and day trips to Yufuin or Nagasaki." },
      ja: { title: "福岡旅行のeSIMガイド 2026", desc: "福岡旅行のeSIM完全ガイド。博多・福岡空港・地下鉄・由布院/長崎日帰りに対応したプラン比較。" },
      ko: { title: "후쿠오카 여행 eSIM 가이드 2026", desc: "후쿠오카 여행용 eSIM 완전 가이드. 하카타, 후쿠오카공항, 지하철, 유후인/나가사키 당일치기 플랜 비교." },
      zh: { title: "福冈旅行eSIM完全指南 2026", desc: "福冈旅行eSIM完全指南。博多、福冈机场、地铁与汤布院/长崎一日游的套餐对比。" },
    },
  },
  {
    slug: "sapporo-esim",
    category: "country",
    countrySlug: "japan",
    content: {
      en: { title: "Sapporo and Hokkaido eSIM Guide 2026", desc: "Best eSIM plans for Sapporo with coverage for Susukino, CTS arrivals, ski resorts, and Otaru day trips." },
      ja: { title: "札幌・北海道旅行のeSIMガイド 2026", desc: "札幌・北海道旅行のeSIM完全ガイド。すすきの・新千歳到着・スキーリゾート・小樽日帰りに対応したプラン比較。" },
      ko: { title: "삿포로・홋카이도 eSIM 가이드 2026", desc: "삿포로 여행용 eSIM 완전 가이드. 스스키노, 신치토세, 스키 리조트, 오타루 당일치기 플랜 비교." },
      zh: { title: "札幌与北海道旅行eSIM完全指南 2026", desc: "札幌旅行eSIM完全指南。薄野、新千岁机场、滑雪度假村与小樽一日游的套餐对比。" },
    },
  },
  {
    slug: "busan-esim",
    category: "country",
    countrySlug: "south-korea",
    content: {
      en: { title: "Busan eSIM Guide 2026", desc: "Best eSIM plans for Busan with coverage for Haeundae, PUS arrivals, subway, and day trips to Gyeongju or Tongyeong." },
      ja: { title: "釜山旅行のeSIMガイド 2026", desc: "釜山旅行のeSIM完全ガイド。海雲台・金海国際空港・地下鉄・慶州/統営日帰りに対応したプラン比較。" },
      ko: { title: "부산 여행 eSIM 가이드 2026", desc: "부산 여행용 eSIM 완전 가이드. 해운대, 김해공항, 지하철, 경주/통영 당일치기 플랜 비교." },
      zh: { title: "釜山旅行eSIM完全指南 2026", desc: "釜山旅行eSIM完全指南。海云台、金海机场、地铁与庆州/统营一日游的套餐对比。" },
    },
  },
  {
    slug: "jeju-esim",
    category: "country",
    countrySlug: "south-korea",
    content: {
      en: { title: "Jeju Island eSIM Guide 2026", desc: "Best eSIM plans for Jeju Island with coverage for Jeju City, CJU arrivals, rental car routes, and Hallasan trekking." },
      ja: { title: "済州島旅行のeSIMガイド 2026", desc: "済州島旅行のeSIM完全ガイド。済州市・済州空港・レンタカールート・漢拏山トレッキングに対応したプラン比較。" },
      ko: { title: "제주도 여행 eSIM 가이드 2026", desc: "제주도 여행용 eSIM 완전 가이드. 제주시, 제주공항, 렌터카 루트, 한라산 트레킹 플랜 비교." },
      zh: { title: "济州岛旅行eSIM完全指南 2026", desc: "济州岛旅行eSIM完全指南。济州市、济州机场、自驾路线与汉拿山徒步的套餐对比。" },
    },
  },
  {
    slug: "da-nang-esim",
    category: "country",
    countrySlug: "vietnam",
    content: {
      en: { title: "Da Nang and Hoi An eSIM Guide 2026", desc: "Best eSIM plans for Da Nang with coverage for My Khe Beach, DAD arrivals, Ba Na Hills, and Hoi An old town." },
      ja: { title: "ダナン・ホイアン旅行のeSIMガイド 2026", desc: "ダナン旅行のeSIM完全ガイド。ミーケビーチ・ダナン空港・バナヒルズ・ホイアン旧市街に対応したプラン比較。" },
      ko: { title: "다낭・호이안 eSIM 가이드 2026", desc: "다낭 여행용 eSIM 완전 가이드. 미케 비치, 다낭공항, 바나힐, 호이안 고도시 플랜 비교." },
      zh: { title: "岘港与会安旅行eSIM完全指南 2026", desc: "岘港旅行eSIM完全指南。美溪海滩、岘港机场、巴拿山与会安古城的套餐对比。" },
    },
  },
  {
    slug: "chiang-mai-esim",
    category: "country",
    countrySlug: "thailand",
    content: {
      en: { title: "Chiang Mai eSIM Guide 2026", desc: "Best eSIM plans for Chiang Mai with coverage for the Old City, CNX arrivals, temples, and digital nomad cafes." },
      ja: { title: "チェンマイ旅行のeSIMガイド 2026", desc: "チェンマイ旅行のeSIM完全ガイド。旧市街・チェンマイ空港・寺院巡り・ノマドカフェに対応したプラン比較。" },
      ko: { title: "치앙마이 eSIM 가이드 2026", desc: "치앙마이 여행용 eSIM 완전 가이드. 구시가, 치앙마이 공항, 사원, 노마드 카페 플랜 비교." },
      zh: { title: "清迈旅行eSIM完全指南 2026", desc: "清迈旅行eSIM完全指南。古城、清迈机场、寺庙与数字游民咖啡馆的套餐对比。" },
    },
  },
  {
    slug: "boracay-esim",
    category: "country",
    countrySlug: "philippines",
    content: {
      en: { title: "Boracay eSIM Guide 2026", desc: "Best eSIM plans for Boracay with coverage for White Beach, Caticlan arrivals, island hopping, and water sports." },
      ja: { title: "ボラカイ島旅行のeSIMガイド 2026", desc: "ボラカイ島旅行のeSIM完全ガイド。ホワイトビーチ・カティクラン空港・アイランドホッピング・マリンスポーツに対応。" },
      ko: { title: "보라카이 eSIM 가이드 2026", desc: "보라카이 여행용 eSIM 완전 가이드. 화이트비치, 카티클란 공항, 아일랜드 호핑, 수상 스포츠 플랜 비교." },
      zh: { title: "长滩岛旅行eSIM完全指南 2026", desc: "长滩岛旅行eSIM完全指南。白沙滩、卡蒂克兰机场、跳岛游与水上运动的套餐对比。" },
    },
  },
  {
    slug: "cebu-esim",
    category: "country",
    countrySlug: "philippines",
    content: {
      en: { title: "Cebu eSIM Guide 2026", desc: "Best eSIM plans for Cebu with coverage for Cebu City, CEB arrivals, Mactan resorts, and whale shark watching." },
      ja: { title: "セブ島旅行のeSIMガイド 2026", desc: "セブ島旅行のeSIM完全ガイド。セブシティ・マクタン空港・リゾート・ジンベエザメウォッチングに対応したプラン比較。" },
      ko: { title: "세부 eSIM 가이드 2026", desc: "세부 여행용 eSIM 완전 가이드. 세부시티, 막탄공항, 리조트, 고래상어 투어 플랜 비교." },
      zh: { title: "宿务旅行eSIM完全指南 2026", desc: "宿务旅行eSIM完全指南。宿务市、麦克坦机场、度假村与鲸鲨观赏的套餐对比。" },
    },
  },
  {
    slug: "athens-esim",
    category: "country",
    countrySlug: "greece",
    content: {
      en: { title: "Athens and Santorini eSIM Guide 2026", desc: "Best eSIM plans for Athens with coverage for the Acropolis, ATH arrivals, ferries, and Santorini island trips." },
      ja: { title: "アテネ・サントリーニ旅行のeSIMガイド 2026", desc: "アテネ旅行のeSIM完全ガイド。アクロポリス・アテネ空港・フェリー・サントリーニ島に対応したプラン比較。" },
      ko: { title: "아테네・산토리니 eSIM 가이드 2026", desc: "아테네 여행용 eSIM 완전 가이드. 아크로폴리스, 아테네 공항, 페리, 산토리니 플랜 비교." },
      zh: { title: "雅典与圣托里尼旅行eSIM完全指南 2026", desc: "雅典旅行eSIM完全指南。卫城、雅典机场、渡轮与圣托里尼岛行程的套餐对比。" },
    },
  },
  {
    slug: "cairo-esim",
    category: "country",
    countrySlug: "egypt",
    content: {
      en: { title: "Cairo and Giza eSIM Guide 2026", desc: "Best eSIM plans for Cairo with coverage for downtown, CAI arrivals, Giza pyramids, and Nile cruise trips." },
      ja: { title: "カイロ・ギザ旅行のeSIMガイド 2026", desc: "カイロ旅行のeSIM完全ガイド。ダウンタウン・カイロ空港・ギザのピラミッド・ナイル川クルーズに対応したプラン比較。" },
      ko: { title: "카이로・기자 eSIM 가이드 2026", desc: "카이로 여행용 eSIM 완전 가이드. 다운타운, 카이로공항, 기자 피라미드, 나일강 크루즈 플랜 비교." },
      zh: { title: "开罗与吉萨旅行eSIM完全指南 2026", desc: "开罗旅行eSIM完全指南。市中心、开罗机场、吉萨金字塔与尼罗河邮轮的套餐对比。" },
    },
  },
  {
    slug: "marrakech-esim",
    category: "country",
    countrySlug: "morocco",
    content: {
      en: { title: "Marrakech eSIM Guide 2026", desc: "Best eSIM plans for Marrakech with coverage for the Medina, RAK arrivals, Atlas Mountains, and Sahara desert tours." },
      ja: { title: "マラケシュ旅行のeSIMガイド 2026", desc: "マラケシュ旅行のeSIM完全ガイド。メディナ・マラケシュ空港・アトラス山脈・サハラ砂漠ツアーに対応したプラン比較。" },
      ko: { title: "마라케시 eSIM 가이드 2026", desc: "마라케시 여행용 eSIM 완전 가이드. 메디나, 마라케시 공항, 아틀라스 산맥, 사하라 사막 투어 플랜 비교." },
      zh: { title: "马拉喀什旅行eSIM完全指南 2026", desc: "马拉喀什旅行eSIM完全指南。麦地那、马拉喀什机场、阿特拉斯山脉与撒哈拉沙漠行程的套餐对比。" },
    },
  },
  {
    slug: "reykjavik-esim",
    category: "country",
    countrySlug: "iceland",
    content: {
      en: { title: "Reykjavik and Ring Road eSIM Guide 2026", desc: "Best eSIM plans for Reykjavik with coverage for KEF arrivals, Golden Circle, Ring Road driving, and Northern Lights tours." },
      ja: { title: "レイキャビク・リングロードeSIMガイド 2026", desc: "アイスランド旅行のeSIM完全ガイド。レイキャビク・KEF到着・ゴールデンサークル・リングロード・オーロラツアーに対応。" },
      ko: { title: "레이캬비크・링로드 eSIM 가이드 2026", desc: "아이슬란드 여행용 eSIM 완전 가이드. 레이캬비크, KEF 공항, 골든서클, 링로드, 오로라 투어 플랜 비교." },
      zh: { title: "雷克雅未克与环岛公路eSIM完全指南 2026", desc: "冰岛旅行eSIM完全指南。雷克雅未克、KEF机场、黄金圈、环岛公路与极光行程的套餐对比。" },
    },
  },
  {
    slug: "esim-vs-skyroam",
    category: "topic",
    content: {
      en: { title: "Travel eSIM vs Skyroam/Solis 2026", desc: "Head-to-head comparison of travel eSIMs and Skyroam Solis portable hotspots on cost, speed, and convenience." },
      ja: { title: "海外eSIM vs Skyroam/Solis 2026", desc: "海外eSIMとSkyroam Solisのポータブルホットスポットを料金・速度・利便性で徹底比較する購入ガイド。" },
      ko: { title: "여행 eSIM vs Skyroam/Solis 2026", desc: "여행 eSIM과 Skyroam Solis 휴대용 핫스팟을 요금, 속도, 편의성 기준으로 비교하는 가이드." },
      zh: { title: "旅行eSIM vs Skyroam/Solis 完全对比 2026", desc: "从价格、速度和便利性角度对比旅行eSIM与Skyroam Solis便携热点的购买指南。" },
    },
  },
  {
    slug: "esim-vs-global-yo",
    category: "topic",
    content: {
      en: { title: "Travel eSIM vs GlobalYo 2026", desc: "Compare travel eSIMs with GlobalYo's global data plans on pricing, coverage, and app experience." },
      ja: { title: "海外eSIM vs GlobalYo 比較 2026", desc: "海外eSIMとGlobalYoのグローバルデータプランを料金・カバレッジ・アプリ体験で比較する購入ガイド。" },
      ko: { title: "여행 eSIM vs GlobalYo 2026", desc: "여행 eSIM과 GlobalYo 글로벌 데이터 플랜을 가격, 커버리지, 앱 경험으로 비교합니다." },
      zh: { title: "旅行eSIM vs GlobalYo 完全对比 2026", desc: "从价格、覆盖与应用体验角度对比旅行eSIM与GlobalYo全球数据套餐。" },
    },
  },
  {
    slug: "maya-mobile-review",
    category: "topic",
    content: {
      en: { title: "Maya Mobile eSIM Review 2026", desc: "Hands-on review of Maya Mobile travel eSIM: plan structure, coverage across regions, and real-world speeds." },
      ja: { title: "Maya Mobile eSIMレビュー 2026", desc: "Maya Mobile旅行eSIMの実使用レビュー。プラン構成・地域カバレッジ・実測速度を解説。" },
      ko: { title: "Maya Mobile eSIM 리뷰 2026", desc: "Maya Mobile 여행 eSIM 실사용 리뷰. 플랜 구성, 지역 커버리지, 실제 속도 정리." },
      zh: { title: "Maya Mobile eSIM评测 2026", desc: "Maya Mobile旅行eSIM实测评测。套餐结构、地区覆盖与实际网速说明。" },
    },
  },
  {
    slug: "instabridge-review",
    category: "topic",
    content: {
      en: { title: "Instabridge eSIM Review 2026", desc: "In-depth review of Instabridge travel eSIM: pricing, app experience, free Wi-Fi integration, and coverage." },
      ja: { title: "Instabridge eSIMレビュー 2026", desc: "Instabridge旅行eSIMの実使用レビュー。料金・アプリ体験・無料Wi-Fi連携・カバレッジを解説。" },
      ko: { title: "Instabridge eSIM 리뷰 2026", desc: "Instabridge 여행 eSIM 실사용 리뷰. 가격, 앱 경험, 무료 Wi-Fi 연동, 커버리지 정리." },
      zh: { title: "Instabridge eSIM评测 2026", desc: "Instabridge旅行eSIM实测评测。价格、应用体验、免费Wi-Fi整合和覆盖范围说明。" },
    },
  },
  {
    slug: "esim-switch-between-plans",
    category: "howto",
    content: {
      en: { title: "How to Switch Between Travel eSIM Plans 2026", desc: "Managing multiple travel eSIMs on one phone — switching data lines, saving plans, and avoiding accidental usage." },
      ja: { title: "複数eSIMプランを切り替える方法 2026", desc: "1台のスマホで複数の海外eSIMを管理する方法。データ回線切替・プラン保存・誤課金回避のコツを解説。" },
      ko: { title: "여러 eSIM 플랜을 전환하는 방법 2026", desc: "한 대의 스마트폰에서 여러 여행 eSIM을 관리하는 방법. 데이터 회선 전환, 플랜 저장, 오사용 방지 팁." },
      zh: { title: "如何在多个旅行eSIM之间切换 2026", desc: "在一台手机上管理多个旅行eSIM的方法。切换数据线路、保存套餐与避免误用的实用技巧。" },
    },
  },
  {
    slug: "esim-delete-remove-guide",
    category: "howto",
    content: {
      en: { title: "How to Delete or Remove an eSIM Safely 2026", desc: "Step-by-step guide to removing an eSIM from your phone without losing data plans — iPhone, Pixel, and Galaxy." },
      ja: { title: "eSIMを安全に削除する方法 2026", desc: "iPhone・Pixel・Galaxyで不要になったeSIMを安全に削除する手順。プラン消失を防ぐ注意点も解説。" },
      ko: { title: "eSIM을 안전하게 삭제하는 방법 2026", desc: "아이폰, 픽셀, 갤럭시에서 eSIM을 안전하게 삭제하는 단계별 가이드. 플랜 손실 방지 팁 포함." },
      zh: { title: "如何安全删除eSIM 2026", desc: "在iPhone、Pixel、Galaxy上安全删除eSIM的分步指南，包含避免套餐丢失的注意事项。" },
    },
  },
  {
    slug: "esim-transfer-to-new-phone",
    category: "howto",
    content: {
      en: { title: "How to Transfer an eSIM to a New Phone 2026", desc: "Guide to moving your travel eSIM to a new iPhone, Pixel, or Galaxy without re-purchasing or losing data." },
      ja: { title: "eSIMを新しいスマホに移行する方法 2026", desc: "海外eSIMを新しいiPhone・Pixel・Galaxyに移行する方法。再購入やデータ消失を避ける手順を解説。" },
      ko: { title: "eSIM을 새 스마트폰으로 이전하는 방법 2026", desc: "여행 eSIM을 새 아이폰, 픽셀, 갤럭시로 이전하는 방법. 재구매와 데이터 손실을 피하는 단계별 가이드." },
      zh: { title: "如何将eSIM转移到新手机 2026", desc: "将旅行eSIM转移到新iPhone、Pixel、Galaxy的指南，无需重新购买或丢失数据。" },
    },
  },
  {
    slug: "esim-signal-dropping-fix",
    category: "howto",
    content: {
      en: { title: "Fixing eSIM Signal Drops While Traveling 2026", desc: "Common reasons for eSIM signal drops abroad and step-by-step fixes — APN settings, network selection, and restart tricks." },
      ja: { title: "海外でeSIMの電波が切れる時の対処法 2026", desc: "海外旅行中にeSIMの電波が切れる原因と対処法。APN設定・ネットワーク選択・再起動のコツを解説。" },
      ko: { title: "해외에서 eSIM 신호가 끊길 때 해결법 2026", desc: "해외에서 eSIM 신호가 끊기는 원인과 해결 방법. APN 설정, 네트워크 선택, 재시작 팁 정리." },
      zh: { title: "海外eSIM信号中断的解决方法 2026", desc: "海外旅行中eSIM信号中断的常见原因与解决方法。APN设置、网络选择与重启技巧说明。" },
    },
  },
  {
    slug: "esim-no-service-fix",
    category: "howto",
    content: {
      en: { title: "Fixing 'No Service' on Travel eSIM 2026", desc: "What to do when your travel eSIM shows 'No Service' abroad — quick diagnostic steps and provider support escalation." },
      ja: { title: "海外eSIMが圏外になる時の対処法 2026", desc: "海外eSIMが「圏外」「No Service」と表示される時の原因と対処法。診断手順とサポート依頼のポイントを解説。" },
      ko: { title: "여행 eSIM '서비스 없음' 해결법 2026", desc: "여행 eSIM에 '서비스 없음'이 표시될 때의 원인과 해결 방법. 진단 절차와 고객 지원 요청 요령 정리." },
      zh: { title: "旅行eSIM显示'无服务'的解决方法 2026", desc: "旅行eSIM在海外显示'无服务'时的原因与解决步骤。诊断流程与客服申诉要点说明。" },
    },
  },
  {
    slug: "esim-customs-airport-advice",
    category: "howto",
    content: {
      en: { title: "Using eSIM Right After Airport Arrival 2026", desc: "How to activate your travel eSIM the moment you land — airplane mode, APN priming, and airport Wi-Fi fallbacks." },
      ja: { title: "空港到着直後にeSIMを使う方法 2026", desc: "海外旅行で到着した瞬間からeSIMを使う手順。機内モード解除・APN事前設定・空港Wi-Fi活用のコツを解説。" },
      ko: { title: "공항 도착 직후 eSIM 사용하는 방법 2026", desc: "해외 공항 도착 즉시 eSIM을 사용하는 절차. 비행기 모드 해제, APN 사전 설정, 공항 Wi-Fi 활용 팁." },
      zh: { title: "抵达机场立即使用eSIM的方法 2026", desc: "海外抵达瞬间使用旅行eSIM的步骤。飞行模式关闭、APN预设与机场Wi-Fi备用方案说明。" },
    },
  },
  {
    slug: "kanazawa-kenrokuen-garden-walk",
    category: "topic",
    content: {
      en: { title: "Kenroku-en Garden Walking Guide for Kanazawa", desc: "A practical Kenroku-en walking route in Kanazawa covering the Kotoji lantern, Kasumigaike pond, Seisonkaku villa, and the Kanazawa Castle connection for foreign travelers." },
      ja: { title: "兼六園の歩き方ガイド (金沢)", desc: "日本三名園のひとつ兼六園を自分の足で歩くための実用ガイド。ことじ灯籠・霞ヶ池・成巽閣・金沢城公園接続までの動線を解説します。" },
      ko: { title: "가나자와 겐로쿠엔 정원 산책 가이드", desc: "일본 3대 정원 중 하나인 겐로쿠엔을 직접 걷기 위한 실용 가이드. 고토지 석등, 가스미가이케 연못, 세이손카쿠 별장, 가나자와성 연결까지 정리." },
      zh: { title: "金泽兼六园游览步行指南", desc: "徒步游览日本三大名园之一兼六园的实用指南。包括琴柱灯笼、霞池、成巽阁与金泽城公园的连接路线。" },
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

export function getExtraGuideDefinition(slug: string) {
  return EXTRA_GUIDES.find((item) => item.slug === slug) ?? null;
}
