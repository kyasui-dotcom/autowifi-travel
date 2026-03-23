import type { GuideCategory, GuideLocale } from "./extraGuides";

export type SeoIntent = "country" | "comparison" | "howto" | "review" | "usecase";
export type CompetitionTier = "high" | "medium" | "low";
type Region = "asia" | "europe" | "americas" | "middle-east-africa" | "oceania" | "global";

export interface SeoProgramEntry {
  slug: string;
  category: GuideCategory;
  intent: SeoIntent;
  primaryKeyword: string;
  secondaryKeywords: string[];
  competition: CompetitionTier;
  region: Region;
  countrySlug?: string;
}

interface CountrySeed {
  slug: string;
  countrySlug: string;
  primaryKeyword: string;
  competition: CompetitionTier;
  region: Region;
}

interface TopicSeed {
  slug: string;
  category: GuideCategory;
  intent: SeoIntent;
  primaryKeyword: string;
  secondaryKeywords: string[];
  competition: CompetitionTier;
  region?: Region;
}

export interface SeoProgramContent {
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
}

const COUNTRY_SEEDS: CountrySeed[] = [
  { slug: "japan-esim", countrySlug: "japan", primaryKeyword: "日本 esim", competition: "high", region: "asia" },
  { slug: "korea-esim", countrySlug: "south-korea", primaryKeyword: "韓国 esim", competition: "high", region: "asia" },
  { slug: "thailand-esim", countrySlug: "thailand", primaryKeyword: "タイ esim", competition: "high", region: "asia" },
  { slug: "usa-esim", countrySlug: "united-states", primaryKeyword: "アメリカ esim", competition: "high", region: "americas" },
  { slug: "uk-esim", countrySlug: "united-kingdom", primaryKeyword: "イギリス esim", competition: "high", region: "europe" },
  { slug: "france-esim", countrySlug: "france", primaryKeyword: "フランス esim", competition: "high", region: "europe" },
  { slug: "italy-esim", countrySlug: "italy", primaryKeyword: "イタリア esim", competition: "high", region: "europe" },
  { slug: "spain-esim", countrySlug: "spain", primaryKeyword: "スペイン esim", competition: "high", region: "europe" },
  { slug: "germany-esim", countrySlug: "germany", primaryKeyword: "ドイツ esim", competition: "high", region: "europe" },
  { slug: "australia-esim", countrySlug: "australia", primaryKeyword: "オーストラリア esim", competition: "high", region: "oceania" },
  { slug: "singapore-esim", countrySlug: "singapore", primaryKeyword: "シンガポール esim", competition: "high", region: "asia" },
  { slug: "taiwan-esim", countrySlug: "taiwan", primaryKeyword: "台湾 esim", competition: "high", region: "asia" },
  { slug: "vietnam-esim", countrySlug: "vietnam", primaryKeyword: "ベトナム esim", competition: "medium", region: "asia" },
  { slug: "indonesia-esim", countrySlug: "indonesia", primaryKeyword: "インドネシア esim", competition: "medium", region: "asia" },
  { slug: "malaysia-esim", countrySlug: "malaysia", primaryKeyword: "マレーシア esim", competition: "medium", region: "asia" },
  { slug: "philippines-esim", countrySlug: "philippines", primaryKeyword: "フィリピン esim", competition: "medium", region: "asia" },
  { slug: "china-esim", countrySlug: "china", primaryKeyword: "中国 esim", competition: "high", region: "asia" },
  { slug: "canada-esim", countrySlug: "canada", primaryKeyword: "カナダ esim", competition: "medium", region: "americas" },
  { slug: "turkey-esim", countrySlug: "turkey", primaryKeyword: "トルコ esim", competition: "medium", region: "europe" },
  { slug: "india-esim", countrySlug: "india", primaryKeyword: "インド esim", competition: "medium", region: "asia" },
  { slug: "hawaii-esim", countrySlug: "united-states", primaryKeyword: "ハワイ esim", competition: "high", region: "americas" },
  { slug: "guam-esim", countrySlug: "guam", primaryKeyword: "グアム esim", competition: "medium", region: "americas" },
  { slug: "hong-kong-esim", countrySlug: "hong-kong", primaryKeyword: "香港 esim", competition: "medium", region: "asia" },
  { slug: "dubai-esim", countrySlug: "united-arab-emirates", primaryKeyword: "ドバイ esim", competition: "medium", region: "middle-east-africa" },
  { slug: "europe-esim", countrySlug: "europe", primaryKeyword: "ヨーロッパ esim", competition: "high", region: "europe" },
  { slug: "cambodia-esim", countrySlug: "cambodia", primaryKeyword: "カンボジア esim", competition: "medium", region: "asia" },
  { slug: "greece-esim", countrySlug: "greece", primaryKeyword: "ギリシャ esim", competition: "medium", region: "europe" },
  { slug: "mexico-esim", countrySlug: "mexico", primaryKeyword: "メキシコ esim", competition: "medium", region: "americas" },
  { slug: "new-zealand-esim", countrySlug: "new-zealand", primaryKeyword: "ニュージーランド esim", competition: "medium", region: "oceania" },
  { slug: "norway-esim", countrySlug: "norway", primaryKeyword: "ノルウェー esim", competition: "medium", region: "europe" },
  { slug: "portugal-esim", countrySlug: "portugal", primaryKeyword: "ポルトガル esim", competition: "medium", region: "europe" },
  { slug: "switzerland-esim", countrySlug: "switzerland", primaryKeyword: "スイス esim", competition: "medium", region: "europe" },
  { slug: "morocco-esim", countrySlug: "morocco", primaryKeyword: "モロッコ esim", competition: "low", region: "middle-east-africa" },
  { slug: "iceland-esim", countrySlug: "iceland", primaryKeyword: "アイスランド esim", competition: "medium", region: "europe" },
  { slug: "sri-lanka-esim", countrySlug: "sri-lanka", primaryKeyword: "スリランカ esim", competition: "medium", region: "asia" },
  { slug: "brazil-esim", countrySlug: "brazil", primaryKeyword: "ブラジル esim", competition: "medium", region: "americas" },
  { slug: "argentina-esim", countrySlug: "argentina", primaryKeyword: "アルゼンチン esim", competition: "low", region: "americas" },
  { slug: "peru-esim", countrySlug: "peru", primaryKeyword: "ペルー esim", competition: "low", region: "americas" },
  { slug: "colombia-esim", countrySlug: "colombia", primaryKeyword: "コロンビア esim", competition: "low", region: "americas" },
  { slug: "chile-esim", countrySlug: "chile", primaryKeyword: "チリ esim", competition: "low", region: "americas" },
  { slug: "netherlands-esim", countrySlug: "netherlands", primaryKeyword: "オランダ esim", competition: "medium", region: "europe" },
  { slug: "belgium-esim", countrySlug: "belgium", primaryKeyword: "ベルギー esim", competition: "low", region: "europe" },
  { slug: "austria-esim", countrySlug: "austria", primaryKeyword: "オーストリア esim", competition: "low", region: "europe" },
  { slug: "ireland-esim", countrySlug: "ireland", primaryKeyword: "アイルランド esim", competition: "low", region: "europe" },
  { slug: "croatia-esim", countrySlug: "croatia", primaryKeyword: "クロアチア esim", competition: "medium", region: "europe" },
  { slug: "czech-republic-esim", countrySlug: "czech-republic", primaryKeyword: "チェコ esim", competition: "low", region: "europe" },
  { slug: "poland-esim", countrySlug: "poland", primaryKeyword: "ポーランド esim", competition: "low", region: "europe" },
  { slug: "denmark-esim", countrySlug: "denmark", primaryKeyword: "デンマーク esim", competition: "low", region: "europe" },
  { slug: "sweden-esim", countrySlug: "sweden", primaryKeyword: "スウェーデン esim", competition: "medium", region: "europe" },
  { slug: "finland-esim", countrySlug: "finland", primaryKeyword: "フィンランド esim", competition: "medium", region: "europe" },
  { slug: "egypt-esim", countrySlug: "egypt", primaryKeyword: "エジプト esim", competition: "medium", region: "middle-east-africa" },
  { slug: "south-africa-esim", countrySlug: "south-africa", primaryKeyword: "南アフリカ esim", competition: "low", region: "middle-east-africa" },
  { slug: "kenya-esim", countrySlug: "kenya", primaryKeyword: "ケニア esim", competition: "low", region: "middle-east-africa" },
  { slug: "qatar-esim", countrySlug: "qatar", primaryKeyword: "カタール esim", competition: "low", region: "middle-east-africa" },
  { slug: "saudi-arabia-esim", countrySlug: "saudi-arabia", primaryKeyword: "サウジアラビア esim", competition: "low", region: "middle-east-africa" },
  { slug: "nepal-esim", countrySlug: "nepal", primaryKeyword: "ネパール esim", competition: "low", region: "asia" },
  { slug: "macau-esim", countrySlug: "macau", primaryKeyword: "マカオ esim", competition: "low", region: "asia" },
];

const TOPIC_SEEDS: TopicSeed[] = [
  { slug: "wifi-vs-esim", category: "howto", intent: "comparison", primaryKeyword: "wifi vs esim", secondaryKeywords: ["ポケットwifi esim 比較", "海外 wifi esim どっち"], competition: "high" },
  { slug: "how-to-setup-esim", category: "howto", intent: "howto", primaryKeyword: "esim 設定方法", secondaryKeywords: ["esim 使い方", "esim 開通 方法"], competition: "high" },
  { slug: "esim-compatible-phones", category: "howto", intent: "howto", primaryKeyword: "esim 対応機種", secondaryKeywords: ["esim 対応スマホ", "iphone esim 対応"], competition: "high" },
  { slug: "esim-troubleshooting", category: "howto", intent: "howto", primaryKeyword: "esim つながらない", secondaryKeywords: ["esim 不具合", "esim 開通しない"], competition: "high" },
  { slug: "esim-vs-sim-card", category: "howto", intent: "comparison", primaryKeyword: "esim simカード 違い", secondaryKeywords: ["esim physical sim 比較", "esim メリット デメリット"], competition: "medium" },
  { slug: "esim-for-business-travel", category: "howto", intent: "usecase", primaryKeyword: "出張 esim", secondaryKeywords: ["ビジネス travel esim", "法人 出張 esim"], competition: "medium" },
  { slug: "first-time-esim", category: "howto", intent: "howto", primaryKeyword: "初めて esim", secondaryKeywords: ["esim 初心者", "esim 入門"], competition: "medium" },
  { slug: "esim-data-plans-explained", category: "howto", intent: "howto", primaryKeyword: "esim データプラン", secondaryKeywords: ["esim 何gb", "esim 有効期限"], competition: "medium" },
  { slug: "travel-internet-options", category: "howto", intent: "comparison", primaryKeyword: "海外旅行 ネット 接続 方法", secondaryKeywords: ["旅行 internet options", "海外 通信 手段"], competition: "high" },
  { slug: "dual-sim-esim", category: "howto", intent: "howto", primaryKeyword: "デュアルsim esim", secondaryKeywords: ["esim 2回線", "海外 esim 日本sim 併用"], competition: "medium" },
  { slug: "esim-for-students", category: "howto", intent: "usecase", primaryKeyword: "留学 esim", secondaryKeywords: ["学生 esim", "ワーホリ esim"], competition: "medium" },
  { slug: "esim-long-term-travel", category: "howto", intent: "usecase", primaryKeyword: "長期旅行 esim", secondaryKeywords: ["世界一周 esim", "長期滞在 esim"], competition: "medium" },
  { slug: "save-money-roaming", category: "howto", intent: "comparison", primaryKeyword: "ローミング 節約", secondaryKeywords: ["海外ローミング 高い", "esim ローミング 代わり"], competition: "high" },
  { slug: "asia-travel-connectivity", category: "topic", intent: "comparison", primaryKeyword: "アジア esim 比較", secondaryKeywords: ["アジア 旅行 通信", "アジア 周遊 esim"], competition: "medium", region: "asia" },
  { slug: "europe-travel-connectivity", category: "topic", intent: "comparison", primaryKeyword: "ヨーロッパ 旅行 通信", secondaryKeywords: ["eu roaming esim", "ヨーロッパ 周遊 esim"], competition: "medium", region: "europe" },
  { slug: "best-esim-providers", category: "topic", intent: "comparison", primaryKeyword: "海外 esim おすすめ", secondaryKeywords: ["esim おすすめ", "海外 esim 比較"], competition: "high", region: "global" },
  { slug: "travel-data-usage-tips", category: "topic", intent: "howto", primaryKeyword: "旅行 データ 節約", secondaryKeywords: ["海外 データ 使いすぎ", "esim 節約"], competition: "medium" },
  { slug: "international-calling-esim", category: "topic", intent: "howto", primaryKeyword: "esim 国際通話", secondaryKeywords: ["海外 電話 esim", "esim 電話番号"], competition: "medium" },
  { slug: "cruise-travel-esim", category: "topic", intent: "usecase", primaryKeyword: "クルーズ esim", secondaryKeywords: ["船旅 esim", "寄港地 esim"], competition: "low" },
  { slug: "digital-nomad-esim", category: "topic", intent: "usecase", primaryKeyword: "デジタルノマド esim", secondaryKeywords: ["nomad esim", "remote work esim"], competition: "medium", region: "global" },
  { slug: "family-travel-esim", category: "topic", intent: "usecase", primaryKeyword: "家族旅行 esim", secondaryKeywords: ["ファミリー esim", "複数台 esim"], competition: "low" },
  { slug: "esim-prepaid-vs-postpaid", category: "topic", intent: "comparison", primaryKeyword: "esim プリペイド ポストペイド", secondaryKeywords: ["prepaid esim postpaid", "旅行 esim 料金体系"], competition: "low" },
  { slug: "esim-security-tips", category: "topic", intent: "howto", primaryKeyword: "esim セキュリティ", secondaryKeywords: ["esim 安全性", "sim swap 対策"], competition: "medium" },
  { slug: "airport-connectivity-guide", category: "topic", intent: "comparison", primaryKeyword: "空港 wifi esim", secondaryKeywords: ["airport connectivity", "空港 通信"], competition: "medium" },
  { slug: "esim-activation-timing", category: "topic", intent: "howto", primaryKeyword: "esim いつ 有効化", secondaryKeywords: ["esim activate when", "出発前 esim"], competition: "medium" },
  { slug: "travel-apps-esim", category: "topic", intent: "usecase", primaryKeyword: "旅行 アプリ esim", secondaryKeywords: ["esim travel apps", "海外旅行 アプリ"], competition: "low" },
  { slug: "esim-iphone-setup", category: "howto", intent: "howto", primaryKeyword: "iphone esim 設定", secondaryKeywords: ["iphone esim 追加", "iphone esim 使い方"], competition: "high" },
  { slug: "esim-android-setup", category: "howto", intent: "howto", primaryKeyword: "android esim 設定", secondaryKeywords: ["galaxy esim 設定", "pixel esim 設定"], competition: "high" },
  { slug: "airalo-review", category: "topic", intent: "review", primaryKeyword: "airalo 評判", secondaryKeywords: ["airalo review", "airalo esim"], competition: "high", region: "global" },
  { slug: "holafly-review", category: "topic", intent: "review", primaryKeyword: "holafly 評判", secondaryKeywords: ["holafly review", "holafly esim"], competition: "high", region: "global" },
  { slug: "esim-speed-test", category: "topic", intent: "comparison", primaryKeyword: "esim 速度", secondaryKeywords: ["esim speed test", "海外 esim 速度"], competition: "medium" },
  { slug: "esim-for-remote-workers", category: "topic", intent: "usecase", primaryKeyword: "リモートワーク esim", secondaryKeywords: ["remote workers esim", "ノマド 通信"], competition: "medium", region: "global" },
  { slug: "pocket-wifi-vs-esim-japan", category: "topic", intent: "comparison", primaryKeyword: "日本 ポケットwifi esim", secondaryKeywords: ["japan pocket wifi esim", "日本 esim 比較"], competition: "high", region: "asia" },
  { slug: "esim-unlimited-data", category: "topic", intent: "comparison", primaryKeyword: "esim 無制限", secondaryKeywords: ["unlimited data esim", "無制限 esim 比較"], competition: "high", region: "global" },
  { slug: "cheapest-esim-plans", category: "topic", intent: "comparison", primaryKeyword: "格安 esim", secondaryKeywords: ["安い esim", "cheap esim"], competition: "high", region: "global" },
  { slug: "best-esim-for-europe", category: "topic", intent: "comparison", primaryKeyword: "ヨーロッパ esim おすすめ", secondaryKeywords: ["best esim for europe", "ヨーロッパ 周遊 esim"], competition: "high", region: "europe" },
  { slug: "best-esim-for-asia", category: "topic", intent: "comparison", primaryKeyword: "アジア esim おすすめ", secondaryKeywords: ["best esim for asia", "アジア 周遊 esim"], competition: "high", region: "asia" },
  { slug: "esim-vs-airport-sim", category: "topic", intent: "comparison", primaryKeyword: "esim 空港sim 比較", secondaryKeywords: ["airport sim vs esim", "空港sim どっち"], competition: "medium" },
  { slug: "esim-hotspot-tethering", category: "howto", intent: "howto", primaryKeyword: "esim テザリング", secondaryKeywords: ["esim hotspot", "esim tethering"], competition: "high" },
  { slug: "how-much-data-do-i-need-for-travel", category: "howto", intent: "howto", primaryKeyword: "旅行 データ 何gb", secondaryKeywords: ["how much data travel", "海外旅行 データ量"], competition: "high" },
  { slug: "esim-for-backpackers", category: "topic", intent: "usecase", primaryKeyword: "バックパッカー esim", secondaryKeywords: ["backpacker esim", "周遊旅行 esim"], competition: "medium", region: "global" },
  { slug: "esim-for-road-trips", category: "topic", intent: "usecase", primaryKeyword: "ロードトリップ esim", secondaryKeywords: ["road trip esim", "ドライブ旅行 esim"], competition: "low" },
  { slug: "esim-for-solo-travel", category: "topic", intent: "usecase", primaryKeyword: "一人旅 esim", secondaryKeywords: ["solo travel esim", "ひとり旅 通信"], competition: "low" },
  { slug: "esim-for-honeymoon", category: "topic", intent: "usecase", primaryKeyword: "ハネムーン esim", secondaryKeywords: ["honeymoon esim", "新婚旅行 通信"], competition: "low" },
  { slug: "esim-qr-code-not-working", category: "howto", intent: "howto", primaryKeyword: "esim qrコード 読み取れない", secondaryKeywords: ["esim qr 失敗", "esim qr code not working"], competition: "high" },
  { slug: "esim-install-before-travel", category: "howto", intent: "howto", primaryKeyword: "esim 旅行前 インストール", secondaryKeywords: ["install esim before travel", "出発前 esim 設定"], competition: "medium" },
  { slug: "nomad-review", category: "topic", intent: "review", primaryKeyword: "nomad esim 評判", secondaryKeywords: ["nomad review", "nomad esim"], competition: "medium", region: "global" },
  { slug: "ubigi-review", category: "topic", intent: "review", primaryKeyword: "ubigi 評判", secondaryKeywords: ["ubigi review", "ubigi esim"], competition: "medium", region: "global" },
];

function withSecondaryKeywords(primaryKeyword: string, slug: string, region: Region): string[] {
  if (slug === "europe-esim") {
    return ["ヨーロッパ 周遊 esim", "eu esim"];
  }
  if (region === "asia") {
    return [`${primaryKeyword} おすすめ`, `${primaryKeyword} 設定`];
  }
  if (region === "europe") {
    return [`${primaryKeyword} おすすめ`, `${primaryKeyword} 比較`];
  }
  if (region === "americas") {
    return [`${primaryKeyword} 料金`, `${primaryKeyword} 使い方`];
  }
  if (region === "middle-east-africa") {
    return [`${primaryKeyword} カバレッジ`, `${primaryKeyword} おすすめ`];
  }
  return [`${primaryKeyword} 料金`, `${primaryKeyword} おすすめ`];
}

const COUNTRY_ENTRIES: SeoProgramEntry[] = COUNTRY_SEEDS.map((seed) => ({
  slug: seed.slug,
  category: "country",
  intent: "country",
  primaryKeyword: seed.primaryKeyword,
  secondaryKeywords: withSecondaryKeywords(seed.primaryKeyword, seed.slug, seed.region),
  competition: seed.competition,
  region: seed.region,
  countrySlug: seed.countrySlug,
}));

const TOPIC_ENTRIES: SeoProgramEntry[] = TOPIC_SEEDS.map((seed) => ({
  slug: seed.slug,
  category: seed.category,
  intent: seed.intent,
  primaryKeyword: seed.primaryKeyword,
  secondaryKeywords: seed.secondaryKeywords,
  competition: seed.competition,
  region: seed.region ?? "global",
}));

export const SEO_PROGRAM_ENTRIES = [...COUNTRY_ENTRIES, ...TOPIC_ENTRIES];
export const SEO_PROGRAM_SLUGS = SEO_PROGRAM_ENTRIES.map((entry) => entry.slug);

const ENTRY_MAP = new Map(SEO_PROGRAM_ENTRIES.map((entry) => [entry.slug, entry]));

export function getSeoProgramEntry(slug: string) {
  return ENTRY_MAP.get(slug) ?? null;
}

function getRegionHint(entry: SeoProgramEntry, locale: GuideLocale) {
  if (locale === "ja") {
    switch (entry.region) {
      case "asia":
        return "アジア圏は単国旅行と周遊旅行で最適なプランが分かれやすく、価格だけでなく対象国と開通タイミングの確認が重要です。";
      case "europe":
        return "ヨーロッパ圏はEU内でもイギリスやスイスの扱いが分かれるため、対象国の確認と周遊前提の比較が欠かせません。";
      case "americas":
        return "アメリカ大陸の旅行は都市部とロードトリップで必要条件が変わりやすく、広域移動ならテザリングや安定性も重要です。";
      case "middle-east-africa":
        return "中東・アフリカ方面は都市部と郊外で通信体験が変わりやすいため、カバレッジと再設定しやすさを優先するのが安全です。";
      case "oceania":
        return "オセアニア方面は都市部と郊外の差が大きいため、主要都市だけかロードトリップもあるかで選び方が変わります。";
      default:
        return "対象国や利用期間が広いテーマなので、料金よりも使い方に合ったプラン設計を優先すると失敗しにくくなります。";
    }
  }

  if (locale === "ko") {
    switch (entry.region) {
      case "asia":
        return "아시아는 단일 국가 여행인지 여러 국가를 이동하는지에 따라 최적 플랜이 달라지므로 대상 국가와 활성화 타이밍을 함께 확인해야 합니다.";
      case "europe":
        return "유럽은 영국과 스위스처럼 범위가 갈리는 국가가 있어, 방문 국가 목록을 먼저 확인하는 것이 중요합니다.";
      case "americas":
        return "미주 여행은 도시 체류와 로드트립에서 요구 조건이 달라지므로, 커버리지와 핫스팟 지원도 함께 봐야 합니다.";
      case "middle-east-africa":
        return "중동·아프리카는 도시와 교외의 차이가 커서, 커버리지와 재설정 편의성을 우선해 선택하는 편이 안전합니다.";
      case "oceania":
        return "오세아니아는 도시와 외곽의 차이가 크기 때문에, 도심 위주인지 장거리 이동이 있는지에 따라 선택 기준이 달라집니다.";
      default:
        return "여러 국가와 사용 시나리오를 아우르는 주제이므로, 최저가보다 실제 사용 방식에 맞는 플랜 구성이 중요합니다.";
    }
  }

  if (locale === "zh") {
    switch (entry.region) {
      case "asia":
        return "亚洲旅行中，单国行程和多国周游适合的套餐并不一样，因此除了价格，还要确认覆盖国家和激活时机。";
      case "europe":
        return "欧洲旅行常常会遇到英国、瑞士是否包含的问题，所以一定要先确认支持国家列表。";
      case "americas":
        return "美洲旅行在城市停留和自驾远行时需求差异很大，除了价格，也要关注覆盖范围和热点共享。";
      case "middle-east-africa":
        return "中东和非洲的城市与郊外网络体验差异较大，因此优先选择覆盖明确、恢复路径清晰的方案更稳妥。";
      case "oceania":
        return "大洋洲常见的情况是城市信号稳定、郊外差异明显，因此要先判断自己是城市旅行还是长距离移动。";
      default:
        return "这类主题覆盖多种国家和使用场景，与其只看低价，不如优先选择符合自己用量和行程的套餐。";
    }
  }

  switch (entry.region) {
    case "asia":
      return "Asia trips often split between single-country and multi-country use cases, so supported destinations and activation timing matter as much as price.";
    case "europe":
      return "Europe travel often breaks down around border-crossing coverage, especially for destinations like the UK and Switzerland.";
    case "americas":
      return "Trips in the Americas can vary sharply between city stays and wider road trips, so hotspot support and stability are worth checking.";
    case "middle-east-africa":
      return "Middle East and Africa itineraries often have larger city-to-rural coverage differences, so clear coverage and recovery steps matter.";
    case "oceania":
      return "Oceania travel frequently shifts between major cities and long-distance routes, so your itinerary matters more than headline price alone.";
    default:
      return "This topic spans multiple usage patterns, so matching the plan to the real trip matters more than simply picking the cheapest option.";
  }
}

function getIntentSummary(entry: SeoProgramEntry, locale: GuideLocale) {
  if (locale === "ja") {
    switch (entry.intent) {
      case "country":
        return "比較で見るべきなのは、データ容量、有効期間、対象ネットワーク、テザリング可否、購入後に手順を見返しやすいかの5点です。";
      case "comparison":
        return "比較系キーワードでは、料金だけでなく準備の手間、現地での開通しやすさ、サポート、荷物の増減まで並べて判断するのが重要です。";
      case "howto":
        return "設定・トラブル系キーワードでは、手順の順番と失敗しやすい分岐を先に整理しておくと、検索意図に合いやすくなります。";
      case "review":
        return "レビュー系キーワードでは、特徴だけでなく向いている人・向かない人・代替候補を同時に示す方が信頼されやすいです。";
      case "usecase":
        return "用途別キーワードでは、旅行スタイルごとに必要な容量や優先条件が変わるため、使い方に沿って判断基準を分けるのが効果的です。";
    }
  }

  if (locale === "ko") {
    switch (entry.intent) {
      case "country":
        return "비교할 때는 데이터 용량, 유효기간, 지원 네트워크, 테더링 가능 여부, 구매 후 절차를 다시 확인하기 쉬운지를 함께 보는 것이 좋습니다.";
      case "comparison":
        return "비교형 키워드는 가격뿐 아니라 준비 과정, 현지 개통 편의성, 지원 품질, 짐의 증가 여부까지 함께 비교해야 설득력이 높아집니다.";
      case "howto":
        return "설정·문제 해결 키워드는 단계 순서와 자주 막히는 분기를 먼저 정리해 주는 것이 검색 의도에 잘 맞습니다.";
      case "review":
        return "리뷰형 키워드는 장점뿐 아니라 맞는 사람과 맞지 않는 사람, 대체 후보까지 함께 제시할 때 신뢰도가 올라갑니다.";
      case "usecase":
        return "용도형 키워드는 여행 스타일마다 필요한 데이터와 우선 조건이 달라지므로, 사용 장면별로 판단 기준을 나누는 것이 효과적입니다.";
    }
  }

  if (locale === "zh") {
    switch (entry.intent) {
      case "country":
        return "做国家型对比时，除了价格，还要同时看流量、有效期、合作网络、是否支持热点，以及购买后能否方便找回安装步骤。";
      case "comparison":
        return "对比型关键词不只要讲价格，还要并列比较准备流程、落地开通便利度、客服和是否增加行李负担。";
      case "howto":
        return "设置和排障类关键词最重要的是把步骤顺序和常见卡点提前讲清楚。";
      case "review":
        return "评测类关键词如果同时说明适合谁、不适合谁以及替代方案，会更容易建立信任。";
      case "usecase":
        return "场景型关键词的关键在于按旅行方式拆分需求，因为不同场景下所需流量和优先条件完全不同。";
    }
  }

  switch (entry.intent) {
    case "country":
      return "For destination keywords, the best comparison points are data size, validity, network partners, hotspot support, and how easy it is to recover the setup steps later.";
    case "comparison":
      return "Comparison keywords need more than price. Setup friction, activation reliability, support quality, and travel convenience all influence the final choice.";
    case "howto":
      return "Setup and troubleshooting keywords perform best when the steps are clear, ordered, and written around the exact points where travelers get stuck.";
    case "review":
      return "Review keywords work better when the article explains who the service fits, where it falls short, and what alternatives are worth considering.";
    case "usecase":
      return "Use-case keywords work best when the guidance changes based on trip style, data appetite, and how much flexibility the traveler needs.";
  }
}

function buildCountryContent(entry: SeoProgramEntry, locale: GuideLocale, title: string, description: string): SeoProgramContent {
  const regionHint = getRegionHint(entry, locale);
  const intentSummary = getIntentSummary(entry, locale);

  if (locale === "ja") {
    return {
      sections: [
        {
          heading: `${entry.primaryKeyword}で確認したい比較ポイント`,
          body: `${description}\n\n${intentSummary} ${regionHint}`,
        },
        {
          heading: "旅行日数とデータ容量の目安",
          body: "2〜4日の短期旅行なら3GB前後、1週間なら5GB〜10GB、長期旅行やテザリング利用があるなら10GB以上を目安にすると選びやすくなります。地図、翻訳、配車、SNS中心か、動画視聴やPC接続まで含むかで必要量は大きく変わります。\n\n短期旅行では価格の安さが効きますが、周遊や地方移動がある場合は再購入の手間も含めて比較した方が失敗しにくいです。",
        },
        {
          heading: "空港SIM・ローミングと比べた時の判断軸",
          body: "空港SIMは到着後に調達できる安心感がありますが、列に並ぶ時間や在庫のばらつきがあります。キャリアローミングは設定が簡単な一方で、料金が高くなりやすいのが難点です。\n\neSIMは出発前に準備でき、到着直後から地図や配車アプリを使えるのが強みです。現地で迷わないことを重視するなら、事前設定できるeSIMの相性が良いです。",
        },
        {
          heading: "現地で失敗しやすいポイント",
          body: "よくある失敗は、対応端末を確認していない、対象国や対象地域を見落とす、データ容量を少なく見積もる、到着前に有効化して有効期間を無駄にする、の4つです。\n\n特に複数国をまたぐ旅程や郊外移動がある場合は、価格より先に対象国・テザリング可否・注文後に手順を見返せるかを確認しておくと安心です。",
        },
        {
          heading: "AutoWiFi Travelで見比べやすい理由",
          body: "AutoWiFi Travelでは国別ページ、比較記事、設定ガイドを行き来しながら判断できるため、単に安いプランではなく、旅程に合うeSIMを選びやすくしています。購入後もメールと注文詳細ページからQRコードや設定情報を見直せるため、旅行中の復旧もしやすい構成です。",
        },
      ],
      faq: [
        { q: "旅行には何GBくらい必要ですか？", a: "地図、検索、メッセージ中心なら5GB前後が目安です。動画視聴やPCテザリングがある場合は10GB以上を検討すると安心です。" },
        { q: "eSIMはいつ有効化すればいいですか？", a: "多くの旅行者は出発前にインストールだけ済ませ、到着後に回線を有効化する形が安全です。有効期間の起算条件はプランごとに確認してください。" },
        { q: "eSIMと空港SIMはどちらが向いていますか？", a: "到着直後からすぐにつなぎたい人や事前準備で不安を減らしたい人にはeSIMが向いています。複数人で1台をシェアしたい場合は別の選択肢も検討できます。" },
      ],
    };
  }

  if (locale === "ko") {
    return {
      sections: [
        {
          heading: `${title} 비교에서 먼저 볼 포인트`,
          body: `${description}\n\n${intentSummary} ${regionHint}`,
        },
        {
          heading: "여행 기간별 데이터 용량 기준",
          body: "2~4일 정도의 짧은 여행은 3GB 전후, 1주일은 5GB~10GB, 장기 여행이나 테더링이 있다면 10GB 이상을 기준으로 잡으면 무난합니다. 지도, 번역, 차량 호출, SNS 위주인지, 영상 시청과 노트북 연결까지 포함하는지에 따라 필요한 용량이 달라집니다.\n\n짧은 일정은 저렴한 플랜이 유리하지만, 여러 도시나 여러 국가를 이동하는 일정은 재구매 번거로움까지 함께 비교하는 편이 안전합니다.",
        },
        {
          heading: "공항 유심과 로밍과 비교할 때의 기준",
          body: "공항 유심은 도착 후 바로 구매할 수 있다는 장점이 있지만, 줄을 서야 하거나 원하는 플랜 재고가 없을 수 있습니다. 통신사 로밍은 편하지만 비용이 높아지기 쉽습니다.\n\neSIM은 출발 전에 준비할 수 있고 도착 직후 지도와 차량 호출 앱을 바로 사용할 수 있다는 점이 가장 큰 장점입니다.",
        },
        {
          heading: "현지에서 자주 생기는 실패 포인트",
          body: "지원 단말 확인 누락, 대상 국가·지역 확인 부족, 데이터 용량 과소 추정, 도착 전에 개통해 유효기간을 소모해 버리는 경우가 많습니다.\n\n특히 여러 국가를 이동하거나 외곽 지역까지 가는 일정은 가격보다 먼저 대상 국가, 테더링 지원, 주문 후 안내를 다시 볼 수 있는지부터 확인하는 것이 좋습니다.",
        },
        {
          heading: "AutoWiFi Travel에서 비교하기 쉬운 이유",
          body: "AutoWiFi Travel은 국가별 페이지와 비교 가이드, 설정 가이드를 함께 볼 수 있어 단순 최저가가 아니라 여행 일정에 맞는 eSIM을 고르기 쉽습니다. 구매 후에도 이메일과 주문 상세 페이지에서 QR 코드와 설치 정보를 다시 확인할 수 있습니다.",
        },
      ],
      faq: [
        { q: "여행에는 데이터가 얼마나 필요할까요?", a: "지도, 검색, 메시지 중심이면 5GB 전후가 많이 선택됩니다. 영상 시청이나 노트북 테더링이 있다면 10GB 이상을 고려하세요." },
        { q: "eSIM은 언제 활성화하는 것이 좋나요?", a: "출발 전에 설치만 해 두고, 도착 후 실제 회선을 켜는 방식이 가장 무난합니다. 유효기간 시작 조건은 플랜마다 다르므로 상세 설명을 확인하세요." },
        { q: "eSIM과 공항 유심 중 어느 쪽이 더 나은가요?", a: "도착 직후 바로 연결되고 싶거나 준비 과정을 미리 끝내고 싶은 사람에게는 eSIM이 더 잘 맞습니다." },
      ],
    };
  }

  if (locale === "zh") {
    return {
      sections: [
        {
          heading: `${title} 选择前先看哪些点`,
          body: `${description}\n\n${intentSummary} ${regionHint}`,
        },
        {
          heading: "按旅行时长估算流量",
          body: "2到4天的短途旅行通常3GB左右就能应付，一周建议看5GB到10GB，长途旅行或需要热点共享时更适合10GB以上。主要用地图、翻译、打车和社交媒体，还是还要看视频、连电脑，会直接影响你需要的流量。\n\n短行程可以更看价格，但如果行程涉及多城市或多国移动，最好把重复购买和切换的麻烦也算进去。",
        },
        {
          heading: "和机场SIM、运营商漫游相比怎么选",
          body: "机场SIM的好处是落地后可以买，但常见问题是排队、库存不稳定，或者套餐解释不够清楚。运营商漫游设置最省事，但费用通常更高。\n\neSIM的优势是出发前就能准备好，落地后直接用地图、打车和酒店联系等关键功能，整体更适合想把不确定性降到最低的旅客。",
        },
        {
          heading: "最容易踩坑的地方",
          body: "常见失误包括没有先确认手机是否支持、忽略支持国家或支持区域、低估所需流量、过早激活导致有效期被提前消耗。\n\n如果你的行程包含跨国、郊外或长距离移动，建议先确认覆盖国家、是否支持热点，以及购买后能否方便找回安装说明。",
        },
        {
          heading: "为什么在 AutoWiFi Travel 上更容易比",
          body: "AutoWiFi Travel 把国家页、对比页和设置指南串在一起，方便你不是只看最低价，而是按照行程去判断更合适的 eSIM。购买后还可以从邮件和订单详情页重新查看二维码和设置说明，出行途中更容易恢复。",
        },
      ],
      faq: [
        { q: "旅行大概要买多少流量？", a: "如果主要是地图、搜索和聊天，5GB左右通常够用；如果要看视频或给电脑共享网络，建议看10GB以上。" },
        { q: "eSIM 什么时候激活最合适？", a: "大多数情况下，出发前先安装，到达后再真正启用移动数据会更稳妥。具体何时开始计时要看套餐说明。" },
        { q: "eSIM 和机场SIM 哪个更适合？", a: "如果你想落地马上联网、尽量减少现场不确定性，eSIM 通常更适合。多人共用设备则可以再比较其他方案。" },
      ],
    };
  }

  return {
    sections: [
      {
        heading: `What to compare before choosing ${title}`,
        body: `${description}\n\n${intentSummary} ${regionHint}`,
      },
      {
        heading: "How much data and validity should you buy?",
        body: "Short trips of a few days often work with around 3GB, week-long trips often land in the 5GB to 10GB range, and longer trips or hotspot-heavy use usually need 10GB or more. Maps, translation, social apps, and ride-hailing stay fairly light, while streaming and laptop tethering quickly increase usage.\n\nIf your trip includes multiple stops or wider travel days, compare total convenience as well as headline price.",
      },
      {
        heading: "How eSIM compares with airport SIMs and roaming",
        body: "Airport SIM cards can feel reassuring because you buy them on arrival, but they add queue time and can come with inconsistent stock or confusing plan details. Carrier roaming is easy but often expensive.\n\nTravel eSIMs are strong when you want to prepare before departure and get online the moment you land for maps, transport, and check-in details.",
      },
      {
        heading: "Common mistakes travelers make",
        body: "The biggest errors are forgetting to confirm device compatibility, misreading supported destinations, underestimating data usage, and activating too early. Cross-border itineraries and rural travel make those mistakes more expensive.\n\nBefore buying, it helps to check coverage, hotspot support, and whether you can easily recover the setup steps later.",
      },
      {
        heading: "Why AutoWiFi Travel fits this use case",
        body: "AutoWiFi Travel connects destination pages, comparison guides, and setup help so travelers can choose based on the actual itinerary rather than price alone. After purchase, travelers can also revisit order details and installation information from email and the order page.",
      },
    ],
    faq: [
      { q: "How much data do I need for this kind of trip?", a: "For maps, search, and messaging, around 5GB is a common starting point. Choose more if you tether a laptop or stream video regularly." },
      { q: "When should I activate my eSIM?", a: "A common approach is to install before departure and enable the plan after arrival. Always check when the plan validity actually starts." },
      { q: "Is eSIM better than buying a SIM on arrival?", a: "If you want to be connected immediately after landing and reduce uncertainty, eSIM is often the smoother option." },
    ],
  };
}

function buildComparisonContent(entry: SeoProgramEntry, locale: GuideLocale, title: string, description: string): SeoProgramContent {
  const intentSummary = getIntentSummary(entry, locale);

  if (locale === "ja") {
    return {
      sections: [
        {
          heading: `${entry.primaryKeyword}で比較すべき軸`,
          body: `${description}\n\n${intentSummary} 検索意図が強い比較キーワードほど、料金だけでなく、準備時間、荷物、テザリング、サポート、トラブル時の復旧しやすさまで並べて整理した方が上位と戦いやすくなります。`,
        },
        {
          heading: "価格だけで決めない方がよい理由",
          body: "一見安く見える選択肢でも、現地での設定が分かりにくい、再購入が必要、複数端末に向かないなど、旅行中の手間まで含めると割高になることがあります。\n\n比較記事では総額と運用のしやすさをセットで見ることが重要です。",
        },
        {
          heading: "どんな旅行者に向いているかで選び方は変わる",
          body: "一人旅、家族旅行、出張、長期滞在では、重視すべき条件が違います。比較ページでは“誰に向くか”を先に切り分けて読むと、自分に合う選択肢が見つかりやすくなります。",
        },
        {
          heading: "失敗しにくい選び方",
          body: "比較する時は、1. 旅行日数、2. 利用国数、3. テザリングの有無、4. 端末対応、5. 購入後の復旧導線、の順で確認すると判断しやすいです。特にeSIM初心者は、設定方法が分かりやすいサービスを優先すると失敗が減ります。",
        },
        {
          heading: "AutoWiFi Travelで比較しやすいポイント",
          body: "AutoWiFi Travelでは比較記事からそのまま国別ページや設定ガイドへ移動できるため、読み物だけで終わらず、実際の購入判断までつなげやすい構成です。",
        },
      ],
      faq: [
        { q: "比較では何を最優先で見ればいいですか？", a: "旅行日数、国数、データ容量、テザリング、購入後の分かりやすさを先に確認するのが基本です。" },
        { q: "安い方を選べば問題ないですか？", a: "価格は重要ですが、設定や再購入の手間まで含めると、最安が最適とは限りません。" },
        { q: "初めてのeSIMなら何を重視すべきですか？", a: "設定手順の分かりやすさと、注文後に情報を見直せるかを重視すると安心です。" },
      ],
    };
  }

  if (locale === "ko") {
    return {
      sections: [
        {
          heading: `${title}에서 비교해야 할 기준`,
          body: `${description}\n\n${intentSummary} 비교형 키워드는 가격뿐 아니라 준비 시간, 짐, 테더링, 지원 품질, 문제 발생 시 복구 편의성까지 함께 정리해야 설득력이 높습니다.`,
        },
        {
          heading: "가격만 보고 고르면 위험한 이유",
          body: "저렴해 보여도 현지에서 설정이 어렵거나, 중간에 데이터를 다시 사야 하거나, 여러 기기에 맞지 않으면 실제 체감 비용이 커질 수 있습니다.\n\n비교 글에서는 총비용과 사용 편의성을 함께 보는 것이 중요합니다.",
        },
        {
          heading: "여행 스타일에 따라 답이 달라집니다",
          body: "혼자 여행하는지, 가족과 함께인지, 출장인지, 장기 체류인지에 따라 우선순위가 달라집니다. 먼저 자신이 어떤 유형인지 나누어 보면 더 쉽게 선택할 수 있습니다.",
        },
        {
          heading: "실패하지 않는 선택 순서",
          body: "1. 여행 기간, 2. 방문 국가 수, 3. 테더링 필요 여부, 4. 단말 호환성, 5. 구매 후 복구 동선을 차례로 체크하면 판단이 쉬워집니다. eSIM 초보자라면 특히 설치 안내가 잘 정리된 서비스를 우선하세요.",
        },
        {
          heading: "AutoWiFi Travel에서 비교하기 쉬운 이유",
          body: "비교 글에서 바로 국가별 페이지와 설정 가이드로 이동할 수 있어, 정보 탐색에서 실제 구매 판단까지 자연스럽게 이어집니다.",
        },
      ],
      faq: [
        { q: "비교할 때 가장 먼저 봐야 할 것은 무엇인가요?", a: "여행 기간, 방문 국가 수, 데이터 용량, 테더링, 구매 후 안내를 먼저 확인하는 것이 기본입니다." },
        { q: "무조건 저렴한 쪽이 좋은가요?", a: "가격은 중요하지만 설정 난이도와 재구매 번거로움까지 보면 최저가가 최선은 아닐 수 있습니다." },
        { q: "처음 eSIM을 쓴다면 무엇을 중시해야 하나요?", a: "설치 방법이 명확하고, 주문 후 정보를 다시 확인하기 쉬운 서비스를 고르는 것이 안전합니다." },
      ],
    };
  }

  if (locale === "zh") {
    return {
      sections: [
        {
          heading: `${title} 应该怎么比`,
          body: `${description}\n\n${intentSummary} 对比类关键词越接近购买阶段，就越要把价格、准备时间、行李负担、热点共享、客服和出问题后的恢复路径一起讲清楚。`,
        },
        {
          heading: "为什么不能只看价格",
          body: "有些方案看起来便宜，但可能设置麻烦、需要中途补购流量，或不适合多设备使用。把这些隐性成本算进去，最终并不一定划算。\n\n所以对比时，最好把总成本和使用顺手程度一起看。",
        },
        {
          heading: "不同旅行方式，答案不同",
          body: "独自旅行、家庭旅行、商务出差、长期停留的优先条件并不一样。先判断自己属于哪种场景，再看方案，会更容易做决定。",
        },
        {
          heading: "更不容易选错的顺序",
          body: "建议按 1. 旅行天数、2. 访问国家数、3. 是否需要热点、4. 手机是否支持、5. 购买后是否容易找回说明 的顺序来比。尤其是第一次用 eSIM 的人，更应该优先看安装说明是否清楚。",
        },
        {
          heading: "为什么在 AutoWiFi Travel 上更好比",
          body: "在 AutoWiFi Travel 上，可以从对比文章直接跳到国家页和设置指南，阅读完后更容易继续完成实际购买判断。",
        },
      ],
      faq: [
        { q: "对比时最先看什么？", a: "先看旅行天数、国家数、流量、是否支持热点，以及购买后能否方便找回安装说明。" },
        { q: "是不是越便宜越好？", a: "价格重要，但如果设置复杂或中途要反复补购，整体体验和总成本都可能更差。" },
        { q: "第一次用 eSIM 应该重点看什么？", a: "重点看安装步骤是否清楚，以及购买后是否容易重新查看二维码和设置说明。" },
      ],
    };
  }

  return {
    sections: [
      {
        heading: `What matters most in ${title}`,
        body: `${description}\n\n${intentSummary} High-intent comparison pages work best when they compare price, setup time, luggage burden, hotspot support, support quality, and recovery options side by side.`,
      },
      {
        heading: "Why price alone is not enough",
        body: "Some options look cheaper at first glance but create more work during the trip through difficult setup, repeated top-ups, or device restrictions. Comparing total effort alongside total cost leads to better decisions.",
      },
      {
        heading: "The right choice depends on the traveler",
        body: "Solo travelers, families, business travelers, and long-stay users all optimize for different things. Splitting the comparison by traveler type usually leads to a clearer decision.",
      },
      {
        heading: "A safer decision checklist",
        body: "A practical order is: trip length, number of countries, hotspot needs, device compatibility, and how easy it is to recover the setup instructions. First-time eSIM users should prioritize clarity over a small headline discount.",
      },
      {
        heading: "How AutoWiFi Travel helps the decision",
        body: "AutoWiFi Travel connects comparison content directly to destination pages and setup guidance, which makes it easier to turn research into an actual purchase decision.",
      },
    ],
    faq: [
      { q: "What should I compare first?", a: "Start with trip length, number of destinations, data size, hotspot needs, and how easy the service is to manage after purchase." },
      { q: "Is the cheapest option usually the best?", a: "Not always. Extra setup friction, repeated purchases, and poor recovery options can make a very cheap option less attractive overall." },
      { q: "What matters most for first-time users?", a: "Clear setup steps and an easy way to revisit the order details matter a lot for first-time eSIM travelers." },
    ],
  };
}

function buildHowtoContent(entry: SeoProgramEntry, locale: GuideLocale, title: string, description: string): SeoProgramContent {
  const intentSummary = getIntentSummary(entry, locale);

  if (locale === "ja") {
    return {
      sections: [
        {
          heading: `${entry.primaryKeyword}で最初に確認したいこと`,
          body: `${description}\n\n${intentSummary} 設定・トラブル系の記事は、ユーザーがどこで止まるかを先回りして説明するほど役に立ちます。`,
        },
        {
          heading: "手順は短く、確認ポイントは明確に",
          body: "eSIMの設定では、QRコードの受け取り、端末の対応状況、回線の有効化タイミング、主回線との切り替え、データローミングの設定が主な確認ポイントです。\n\n記事を読む時は、手順そのものよりも“どの設定を見落とすと失敗するか”を先に押さえるとトラブルを減らせます。",
        },
        {
          heading: "よくある失敗パターン",
          body: "よくあるのは、eSIMを追加しただけでデータ回線が切り替わっていない、ローミングがOFFのまま、主回線が通話・SMSに残っているか確認していない、QRコードの再読込制限を知らない、の4点です。\n\nトラブル系キーワードでは、この分岐を明確に書いてある記事ほど評価されやすくなります。",
        },
        {
          heading: "旅行前に済ませておきたい確認",
          body: "出発前には、端末対応、OS更新、WiFi環境でのインストール、注文詳細ページへの再アクセス方法を確認しておくと安心です。購入後にメールだけでなく注文詳細からも情報を見直せるサービスは復旧しやすいです。",
        },
        {
          heading: "関連ガイドも一緒に見ると判断しやすい",
          body: "設定記事だけでは解決しない場合、対応機種一覧、トラブルシューティング、データ容量の目安、旅行前インストールの考え方まで続けて読むと全体像がつかみやすくなります。",
        },
      ],
      faq: [
        { q: "eSIMは出発前に設定しても大丈夫ですか？", a: "多くの旅行者は出発前にインストールだけ済ませ、到着後に回線を有効化しています。開始条件はプランごとに確認してください。" },
        { q: "QRコードがうまく読み取れない時はどうすればいいですか？", a: "別端末で表示する、明るい画面で拡大する、手動入力コードがあるか確認する、既存eSIMの空き状況を確認する、の順で試すと改善しやすいです。" },
        { q: "eSIM設定で最も見落としやすい項目は何ですか？", a: "データ回線の切り替えとデータローミング設定の2つです。インストールできてもこの設定で止まるケースが多いです。" },
      ],
    };
  }

  if (locale === "ko") {
    return {
      sections: [
        {
          heading: `${title}에서 먼저 확인할 것`,
          body: `${description}\n\n${intentSummary} 설정·문제 해결 글은 사용자가 어디에서 막히는지 먼저 짚어 줄수록 도움이 됩니다.`,
        },
        {
          heading: "단계는 짧게, 확인 포인트는 선명하게",
          body: "eSIM 설정에서는 QR 코드 수령, 단말 호환 여부, 회선 활성화 시점, 주 회선 전환, 데이터 로밍 설정이 핵심 확인 포인트입니다.\n\n단계 그 자체보다 어떤 설정을 놓치면 실패하는지를 먼저 이해하면 문제를 줄일 수 있습니다.",
        },
        {
          heading: "자주 나오는 실패 패턴",
          body: "eSIM을 추가했지만 데이터 회선이 바뀌지 않은 경우, 로밍이 꺼져 있는 경우, 기본 회선이 통화와 문자에 어떻게 남아 있는지 확인하지 않은 경우, QR 코드 재설치 제한을 모르는 경우가 많습니다.\n\n이런 분기를 명확하게 정리한 가이드일수록 검색 의도와 잘 맞습니다.",
        },
        {
          heading: "출발 전에 해두면 좋은 점검",
          body: "단말 호환성, OS 업데이트, WiFi 환경에서의 설치, 주문 상세 재접속 방법까지 미리 확인해 두면 안전합니다. 이메일 외에도 주문 상세 페이지에서 다시 확인할 수 있는 서비스가 복구에 강합니다.",
        },
        {
          heading: "관련 가이드를 함께 보면 더 쉬워집니다",
          body: "설정 글만으로 부족하다면 호환 기기 목록, 트러블슈팅, 필요한 데이터 용량, 출발 전 설치 여부 같은 글을 함께 보면 전체 흐름이 더 잘 보입니다.",
        },
      ],
      faq: [
        { q: "eSIM은 출발 전에 설치해도 되나요?", a: "많은 사용자는 출발 전에 설치만 하고, 도착 후 실제 회선을 켭니다. 시작 조건은 플랜 설명을 확인하세요." },
        { q: "QR 코드가 읽히지 않을 때는 어떻게 하나요?", a: "다른 기기 화면으로 띄우기, 화면 밝기 올리기, 수동 입력 코드 확인, 기존 eSIM 슬롯 상태 확인 순서로 점검해 보세요." },
        { q: "가장 많이 놓치는 설정은 무엇인가요?", a: "데이터 회선 전환과 데이터 로밍 설정입니다. 설치는 됐지만 이 두 항목에서 막히는 경우가 많습니다." },
      ],
    };
  }

  if (locale === "zh") {
    return {
      sections: [
        {
          heading: `${title} 先确认什么`,
          body: `${description}\n\n${intentSummary} 设置和排障文章最重要的是提前回答“用户最容易卡在哪一步”。`,
        },
        {
          heading: "步骤要短，检查点要清楚",
          body: "eSIM 设置里最关键的是：收到二维码、确认手机支持、决定何时启用、切换数据线路、打开数据漫游。\n\n比起只写步骤本身，更重要的是告诉用户哪一步最容易遗漏。",
        },
        {
          heading: "最常见的失败模式",
          body: "很多问题并不是安装失败，而是安装后没有切换数据线路、数据漫游没打开、主卡仍然占用设置、或者不了解二维码重新安装限制。\n\n把这些分支写清楚的文章，更容易真正解决搜索者的问题。",
        },
        {
          heading: "出发前建议先做的检查",
          body: "建议先确认设备支持、系统版本、是否能在 WiFi 下完成安装，以及之后如何重新进入订单详情。除了邮件，还能从订单详情页重新查看信息的服务会更省心。",
        },
        {
          heading: "搭配相关指南一起看更容易理解",
          body: "如果只看设置文章还是不放心，可以继续看兼容机型、排障、需要多少流量、是否应在出发前安装等内容，会更容易形成完整判断。",
        },
      ],
      faq: [
        { q: "可以在出发前先装好 eSIM 吗？", a: "大多数情况下可以先安装，到达后再正式启用。具体何时开始计算有效期，要看套餐说明。" },
        { q: "二维码扫不出来怎么办？", a: "可以尝试换另一台设备显示二维码、调高亮度、查看是否有手动输入码，并确认当前 eSIM 槽位是否可用。" },
        { q: "最容易漏掉的设置是什么？", a: "最常见的是没有切换数据线路，或者忘记打开数据漫游。" },
      ],
    };
  }

  return {
    sections: [
      {
        heading: `What to confirm first in ${title}`,
        body: `${description}\n\n${intentSummary} Setup and troubleshooting pages work best when they answer the exact point where travelers get blocked.`,
      },
      {
        heading: "Keep the steps short, make the checks explicit",
        body: "The main checkpoints are receiving the QR code, confirming device compatibility, choosing the right activation timing, switching the data line, and turning on data roaming.\n\nReaders benefit most when the guide highlights the settings that are commonly missed rather than only listing the clicks.",
      },
      {
        heading: "The most common failure patterns",
        body: "A lot of issues come from installing the eSIM successfully but never switching the active data line, leaving roaming turned off, or not understanding re-installation limits on the QR code. Clear guides should call out those branches directly.",
      },
      {
        heading: "What to prepare before departure",
        body: "It helps to confirm device support, update the OS, install on a stable WiFi connection, and make sure you know how to reopen the order details later. Travelers recover more easily when the service provides both email instructions and a reusable order page.",
      },
      {
        heading: "Related guides that usually help next",
        body: "Compatibility lists, troubleshooting checklists, data-sizing guides, and activation timing guides all complement setup articles and make the final decision easier.",
      },
    ],
    faq: [
      { q: "Can I install the eSIM before the trip?", a: "Usually yes. Many travelers install before departure and enable the line after arrival. Check exactly when the validity starts." },
      { q: "What if the QR code does not scan?", a: "Try displaying it on another screen, increasing brightness, checking for a manual activation code, and confirming that the device has space for another eSIM profile." },
      { q: "What setting is missed most often?", a: "Switching the active data line and turning on data roaming are the two biggest ones." },
    ],
  };
}

function buildReviewOrUsecaseContent(entry: SeoProgramEntry, locale: GuideLocale, title: string, description: string): SeoProgramContent {
  const intentSummary = getIntentSummary(entry, locale);

  if (locale === "ja") {
    return {
      sections: [
        {
          heading: `${entry.primaryKeyword}で見られているポイント`,
          body: `${description}\n\n${intentSummary} 旅行者が知りたいのは“良いか悪いか”だけではなく、自分に向くかどうかです。`,
        },
        {
          heading: "向いている人・向かない人を先に切り分ける",
          body: "レビューや用途別の記事では、価格、データ容量、カバー範囲だけでなく、誰の旅に合うのかを最初に切り分けた方が判断しやすくなります。短期旅行なのか、周遊なのか、仕事利用なのかで必要条件は大きく変わります。",
        },
        {
          heading: "比較で見落としやすい注意点",
          body: "よく見落とされるのは、テザリング制限、無制限表記の実質制限、再購入のしやすさ、サポート言語、注文後に情報を見直せるかです。特に競合サービスのレビューを読む時は、メリットだけでなく制限条件まで確認しておくべきです。",
        },
        {
          heading: "AutoWiFi Travelと比較する時の観点",
          body: "比較する時は、旅行先の網羅性、日本語を含むサポート導線、購入後にQRコードと設定情報を再確認できるか、国別ページから直接プランを選びやすいかを見ると判断しやすくなります。",
        },
        {
          heading: "結局どんな人が候補にしやすいか",
          body: "価格重視、サポート重視、設定の分かりやすさ重視など、自分の優先順位を一つ決めると選択がぶれにくくなります。レビュー記事は結論だけ読むのではなく、条件が合うかで判断するのがポイントです。",
        },
      ],
      faq: [
        { q: "レビュー記事では何を一番重視すべきですか？", a: "料金だけでなく、向いている人・向かない人、制限条件、サポートの分かりやすさまで確認するのがおすすめです。" },
        { q: "用途別記事はどう読むと失敗しにくいですか？", a: "自分の旅程と同じ条件かどうかを確認し、必要な容量やテザリング可否が合うかを先に見てください。" },
        { q: "AutoWiFi Travelと比較する価値はありますか？", a: "はい。価格だけでなく、購入後の復旧導線や多言語メール、国別ページの分かりやすさも比較しやすいポイントです。" },
      ],
    };
  }

  if (locale === "ko") {
    return {
      sections: [
        {
          heading: `${title}에서 많이 보는 포인트`,
          body: `${description}\n\n${intentSummary} 사용자는 단순히 좋고 나쁨보다, 자신에게 맞는지 여부를 가장 궁금해합니다.`,
        },
        {
          heading: "어떤 사람에게 맞는지부터 나누기",
          body: "리뷰나 용도형 글에서는 가격과 데이터량뿐 아니라, 어떤 여행자에게 맞는지를 먼저 나누는 편이 판단하기 쉽습니다. 짧은 여행인지, 여러 나라를 도는지, 업무용인지에 따라 기준이 달라집니다.",
        },
        {
          heading: "비교에서 자주 놓치는 점",
          body: "테더링 제한, 무제한 표시의 실제 제한, 재구매 편의성, 지원 언어, 주문 후 안내 재확인 여부를 놓치기 쉽습니다. 경쟁 서비스 리뷰를 볼 때는 장점뿐 아니라 제한 조건도 함께 확인해야 합니다.",
        },
        {
          heading: "AutoWiFi Travel과 비교할 때의 관점",
          body: "방문 국가 범위, 지원 동선, 구매 후 QR 코드와 설치 정보를 다시 확인할 수 있는지, 국가별 페이지에서 바로 플랜을 선택하기 쉬운지를 보면 판단이 쉬워집니다.",
        },
        {
          heading: "결국 어떤 사람이 후보로 보기 쉬운가",
          body: "가격, 지원, 설정 편의성 중 무엇을 가장 우선할지 하나만 정해도 선택이 훨씬 쉬워집니다. 리뷰 글은 결론만 보기보다 조건이 자신의 여행과 맞는지 확인하는 것이 중요합니다.",
        },
      ],
      faq: [
        { q: "리뷰 글에서는 무엇을 가장 봐야 하나요?", a: "가격뿐 아니라 누구에게 맞는지, 어떤 제한이 있는지, 지원이 얼마나 명확한지를 함께 보는 것이 좋습니다." },
        { q: "용도별 글은 어떻게 읽어야 하나요?", a: "자신의 여행 조건과 비슷한지 먼저 보고, 필요한 데이터량과 테더링 조건이 맞는지 확인하세요." },
        { q: "AutoWiFi Travel과 비교할 가치가 있나요?", a: "네. 가격 외에도 구매 후 복구 동선과 다국어 이메일, 국가별 페이지의 명확성을 함께 비교할 수 있습니다." },
      ],
    };
  }

  if (locale === "zh") {
    return {
      sections: [
        {
          heading: `${title} 搜索者真正关心什么`,
          body: `${description}\n\n${intentSummary} 大多数读者并不只想知道“好不好”，更想知道“适不适合自己”。`,
        },
        {
          heading: "先分清适合谁，不适合谁",
          body: "评测类和场景类文章，除了价格和流量，更重要的是先说明适合哪类旅行者。短途、周游、工作场景、长期停留，判断标准都不一样。",
        },
        {
          heading: "最容易忽略的限制条件",
          body: "容易被忽略的点包括热点共享限制、所谓无限流量的限速条款、补购是否方便、客服语言以及购买后能否重新查看设置说明。看竞品评测时一定不能只看优点。",
        },
        {
          heading: "与 AutoWiFi Travel 对比时看什么",
          body: "对比时建议看覆盖目的地数量、支持流程是否清楚、购买后能否重新查看二维码和设置说明，以及是否能从国家页直接完成选择。",
        },
        {
          heading: "最后怎么判断更适合谁",
          body: "先决定自己最重视的是价格、客服还是设置清晰度，只要优先级明确，选择就不会太摇摆。评测文章不要只看结论，更要看条件是否匹配自己的旅行方式。",
        },
      ],
      faq: [
        { q: "看评测文章时最该重视什么？", a: "除了价格，还要看适合谁、不适合谁、有哪些限制，以及客服和恢复路径是否清楚。" },
        { q: "场景型文章应该怎么读？", a: "先确认文章讨论的旅行条件是否和你的行程接近，再看流量和热点等关键条件是否匹配。" },
        { q: "有必要和 AutoWiFi Travel 一起比吗？", a: "有。除了价格，还可以比较购买后的恢复路径、多语言邮件和国家页的清晰度。" },
      ],
    };
  }

  return {
    sections: [
      {
        heading: `What readers want to know about ${title}`,
        body: `${description}\n\n${intentSummary} Most users are trying to answer whether the option fits their trip, not just whether it is generally good or bad.`,
      },
      {
        heading: "Start with fit, not just features",
        body: "Review and use-case articles work best when they explain who the option suits first. A short city break, a multi-country itinerary, remote work, and a longer stay all change the decision criteria.",
      },
      {
        heading: "Limitations that are easy to miss",
        body: "Hotspot rules, fair-use limits behind “unlimited” messaging, top-up convenience, support language, and the ability to revisit setup details are all easy to miss in a quick comparison.",
      },
      {
        heading: "What to compare against AutoWiFi Travel",
        body: "Coverage breadth, support flow, post-purchase recovery options, and how easily the user can move from an article to a destination plan are practical comparison points.",
      },
      {
        heading: "A clearer way to make the decision",
        body: "Choosing one clear priority such as price, support, or setup simplicity makes the final comparison easier. Review content should guide readers toward that priority rather than only giving a generic verdict.",
      },
    ],
    faq: [
      { q: "What matters most in a review article?", a: "Look beyond price and features. The best reviews explain fit, limitations, and what alternatives are worth considering." },
      { q: "How should I use a use-case article?", a: "Check whether the trip style in the article matches your itinerary, then compare data size, flexibility, and hotspot support against your own needs." },
      { q: "Why compare with AutoWiFi Travel at all?", a: "It helps anchor the decision in a real purchase flow, including post-purchase support and how easy the service is to use during the trip." },
    ],
  };
}

export function buildSeoProgramContent(params: {
  slug: string;
  locale: GuideLocale;
  title: string;
  description: string;
}) {
  const entry = getSeoProgramEntry(params.slug);
  if (!entry) return null;

  if (entry.intent === "country") {
    return buildCountryContent(entry, params.locale, params.title, params.description);
  }

  if (entry.intent === "comparison") {
    return buildComparisonContent(entry, params.locale, params.title, params.description);
  }

  if (entry.intent === "howto") {
    return buildHowtoContent(entry, params.locale, params.title, params.description);
  }

  return buildReviewOrUsecaseContent(entry, params.locale, params.title, params.description);
}

export function getSeoProgramRelatedSlugs(slug: string) {
  const entry = getSeoProgramEntry(slug);
  if (!entry) return [];

  let related: string[];

  if (entry.intent === "country") {
    related = [
      entry.region === "asia" ? "best-esim-for-asia" : entry.region === "europe" ? "best-esim-for-europe" : "best-esim-providers",
      "travel-internet-options",
      "how-to-setup-esim",
    ];
  } else if (entry.intent === "comparison") {
    related = ["best-esim-providers", "cheapest-esim-plans", "how-much-data-do-i-need-for-travel"];
  } else if (entry.intent === "howto") {
    related = ["esim-compatible-phones", "esim-troubleshooting", "travel-internet-options"];
  } else {
    related = ["best-esim-providers", "cheapest-esim-plans", "travel-internet-options"];
  }

  return Array.from(new Set(related)).filter((item) => item !== slug);
}
