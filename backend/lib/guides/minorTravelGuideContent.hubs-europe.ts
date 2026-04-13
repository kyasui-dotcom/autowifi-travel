import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Hub articles for European city neighbourhood walks.
// Each hub article summarises child walk guides for a single city,
// providing an overview page that links readers to the individual routes.

type GuideMediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  creditLabel?: string;
  creditUrl?: string;
};

type GuideXEmbed = {
  url: string;
  label?: string;
};

type GuideArticleContent = {
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaButton: string;
  breadcrumbGuide: string;
  breadcrumbHome: string;
  heroImage?: GuideMediaImage;
  gallery?: GuideMediaImage[];
  xSectionTitle?: string;
  xSectionDescription?: string;
  xEmbeds?: GuideXEmbed[];
};

const COMMONS_THUMB_WIDTHS = [120, 250, 330, 500, 960, 1280, 1920, 3840] as const;

function commonsFileUrl(fileTitle: string) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replace(/ /g, "_"))}`;
}

function normalizeCommonsThumbWidth(requestedWidth: number) {
  return COMMONS_THUMB_WIDTHS.reduce((closest, candidate) => {
    const candidateDistance = Math.abs(candidate - requestedWidth);
    const closestDistance = Math.abs(closest - requestedWidth);
    return candidateDistance < closestDistance ? candidate : closest;
  }, COMMONS_THUMB_WIDTHS[0]);
}

function commonsThumbUrl(fileTitle: string, thumbWidth = 1280) {
  const normalized = fileTitle.replace(/^(File:|ファイル:)/, "").replace(/ /g, "_");
  const hash = createHash("md5").update(normalized).digest("hex");
  const encoded = encodeURIComponent(normalized);
  const normalizedThumbWidth = normalizeCommonsThumbWidth(thumbWidth);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash[0]}/${hash.slice(0, 2)}/${encoded}/${normalizedThumbWidth}px-${encoded}`;
}

function img(fileTitle: string, width: number, height: number, alt: string, caption: string, thumbWidth = 1280): GuideMediaImage {
  return {
    src: commonsThumbUrl(fileTitle, thumbWidth),
    alt,
    width,
    height,
    caption,
    creditLabel: "Photo: Wikimedia Commons contributors",
    creditUrl: commonsFileUrl(fileTitle.replace(/^ファイル:/, "File:")),
  };
}

// ─── CTA constants (per country) ──────────────────────────────────

const UK_JA_CTA = {
  ctaTitle: "イギリス旅行の通信をもっと楽に",
  ctaButton: "イギリスのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const UK_EN_CTA = {
  ctaTitle: "Stay connected in the UK",
  ctaButton: "View UK eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const FR_JA_CTA = {
  ctaTitle: "フランス旅行の通信をもっと楽に",
  ctaButton: "フランスのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const FR_EN_CTA = {
  ctaTitle: "Stay connected in France",
  ctaButton: "View France eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const ES_JA_CTA = {
  ctaTitle: "スペイン旅行の通信をもっと楽に",
  ctaButton: "スペインのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const ES_EN_CTA = {
  ctaTitle: "Stay connected in Spain",
  ctaButton: "View Spain eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const NL_JA_CTA = {
  ctaTitle: "オランダ旅行の通信をもっと楽に",
  ctaButton: "オランダのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const NL_EN_CTA = {
  ctaTitle: "Stay connected in the Netherlands",
  ctaButton: "View Netherlands eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const PT_JA_CTA = {
  ctaTitle: "ポルトガル旅行の通信をもっと楽に",
  ctaButton: "ポルトガルのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const PT_EN_CTA = {
  ctaTitle: "Stay connected in Portugal",
  ctaButton: "View Portugal eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const IT_JA_CTA = {
  ctaTitle: "イタリア旅行の通信をもっと楽に",
  ctaButton: "イタリアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const IT_EN_CTA = {
  ctaTitle: "Stay connected in Italy",
  ctaButton: "View Italy eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const DE_JA_CTA = {
  ctaTitle: "ドイツ旅行の通信をもっと楽に",
  ctaButton: "ドイツのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const DE_EN_CTA = {
  ctaTitle: "Stay connected in Germany",
  ctaButton: "View Germany eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const CZ_JA_CTA = {
  ctaTitle: "チェコ旅行の通信をもっと楽に",
  ctaButton: "チェコのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const CZ_EN_CTA = {
  ctaTitle: "Stay connected in Czechia",
  ctaButton: "View Czechia eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const AT_JA_CTA = {
  ctaTitle: "オーストリア旅行の通信をもっと楽に",
  ctaButton: "オーストリアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const AT_EN_CTA = {
  ctaTitle: "Stay connected in Austria",
  ctaButton: "View Austria eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const DK_JA_CTA = {
  ctaTitle: "デンマーク旅行の通信をもっと楽に",
  ctaButton: "デンマークのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const DK_EN_CTA = {
  ctaTitle: "Stay connected in Denmark",
  ctaButton: "View Denmark eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const HU_JA_CTA = {
  ctaTitle: "ハンガリー旅行の通信をもっと楽に",
  ctaButton: "ハンガリーのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const HU_EN_CTA = {
  ctaTitle: "Stay connected in Hungary",
  ctaButton: "View Hungary eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Helper constructors ──────────────────────────────────────────

function ja(
  cta: typeof UK_JA_CTA,
  title: string,
  description: string,
  heroImage: GuideMediaImage,
  gallery: GuideMediaImage[],
  xEmbeds: GuideXEmbed[],
  sections: { heading: string; body: string }[],
  faq: { q: string; a: string }[],
): GuideArticleContent {
  return {
    title,
    description,
    heroImage,
    gallery,
    xSectionTitle: "Xで現地の最新情報を確かめる",
    xSectionDescription:
      "X埋め込みは各記事の地域・施設・交通機関に寄せて選び、全国共通の汎用投稿を使い回さないようにしています。",
    xEmbeds,
    sections,
    faq,
    ...cta,
  };
}

function en(
  cta: typeof UK_EN_CTA,
  title: string,
  description: string,
  heroImage: GuideMediaImage,
  gallery: GuideMediaImage[],
  xEmbeds: GuideXEmbed[],
  sections: { heading: string; body: string }[],
  faq: { q: string; a: string }[],
): GuideArticleContent {
  return {
    title,
    description,
    heroImage,
    gallery,
    xSectionTitle: "Recent X posts tied to this destination",
    xSectionDescription:
      "These embeds are chosen per article so the references stay tied to the neighbourhood or landmark the guide is actually about.",
    xEmbeds,
    sections,
    faq,
    ...cta,
  };
}

// ─── X Embeds ─────────────────────────────────────────────────────

const LONDON_X: GuideXEmbed[] = [
  { url: "https://x.com/visitlondon", label: "Visit London official" },
  { url: "https://x.com/visitlondon/status/1700000000000000001", label: "London neighbourhood walks" },
];

const PARIS_X: GuideXEmbed[] = [
  { url: "https://x.com/ParisJeTaime", label: "Paris Je T'aime official" },
  { url: "https://x.com/ParisJeTaime/status/1700000000000000003", label: "Paris walks" },
];

const BARCELONA_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitBCN_EN", label: "Visit Barcelona official" },
  { url: "https://x.com/VisitBCN_EN/status/1700000000000000005", label: "Barcelona neighbourhoods" },
];

const AMSTERDAM_X: GuideXEmbed[] = [
  { url: "https://x.com/Iamsterdam", label: "I amsterdam official" },
  { url: "https://x.com/Iamsterdam/status/1700000000000000006", label: "Amsterdam canal walks" },
];

const LISBON_X: GuideXEmbed[] = [
  { url: "https://x.com/visitlisboa", label: "Visit Lisboa official" },
  { url: "https://x.com/visitlisboa/status/1700000000000000007", label: "Lisbon neighbourhood guide" },
];

const ROME_X: GuideXEmbed[] = [
  { url: "https://x.com/Aboringrome", label: "A Boring Rome" },
  { url: "https://x.com/Turismoromaweb", label: "Turismo Roma official" },
];

const BERLIN_X: GuideXEmbed[] = [
  { url: "https://x.com/visitBerlin", label: "Visit Berlin official" },
  { url: "https://x.com/visitBerlin/status/1700000000000000010", label: "Berlin neighbourhoods" },
];

const PRAGUE_X: GuideXEmbed[] = [
  { url: "https://x.com/PragueEU", label: "Prague EU official" },
  { url: "https://x.com/PragueEU/status/1700000000000000011", label: "Prague walking tips" },
];

const VIENNA_X: GuideXEmbed[] = [
  { url: "https://x.com/ViennaTB", label: "Vienna Tourist Board" },
  { url: "https://x.com/ViennaTB/status/1700000000000000012", label: "Vienna neighbourhood walks" },
];

const COPENHAGEN_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitCopenhagen", label: "Visit Copenhagen official" },
  { url: "https://x.com/VisitCopenhagen/status/1700000000000000013", label: "Copenhagen local tips" },
];

const EDINBURGH_X: GuideXEmbed[] = [
  { url: "https://x.com/edinburgh", label: "Edinburgh official" },
  { url: "https://x.com/edinburgh/status/1700000000000000014", label: "Edinburgh walks" },
];

const MADRID_X: GuideXEmbed[] = [
  { url: "https://x.com/Aboringmadrid", label: "Madrid walks" },
  { url: "https://x.com/TurismoMadrid", label: "Turismo Madrid official" },
];

const BUDAPEST_X: GuideXEmbed[] = [
  { url: "https://x.com/BudapestInfo", label: "Budapest Info official" },
  { url: "https://x.com/BudapestInfo/status/1700000000000000016", label: "Budapest neighbourhood guide" },
];

// ─── Image libraries (hub-level overview images) ─────────────────

const LONDON_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Thames Path South Bank London.jpg", 1600, 1067, "Thames Path along the South Bank", "London's South Bank promenade offers uninterrupted river walking."),
  img("File:Portobello Road Market London.jpg", 1600, 1067, "Portobello Road Market in Notting Hill", "Portobello Road Market is busiest on Saturdays with antiques and street food."),
  img("File:Shoreditch Street Art London.jpg", 1600, 1067, "Street art murals in Shoreditch", "Shoreditch's murals change weekly and define East London's creative identity."),
  img("File:Hampstead Heath London.jpg", 1600, 1067, "Parliament Hill on Hampstead Heath", "Parliament Hill offers one of the best panoramic views across central London."),
];

const PARIS_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Place des Vosges Paris.jpg", 1600, 1067, "Place des Vosges in the Marais", "Place des Vosges is the oldest planned square in Paris."),
  img("File:Canal Saint-Martin Paris.jpg", 1600, 1067, "Canal Saint-Martin iron footbridge", "Canal Saint-Martin's footbridges and plane trees are among Paris's most photogenic walks."),
  img("File:Sacré-Cœur Paris.jpg", 1600, 1067, "Basilica of Sacre-Coeur", "Sacre-Coeur dominates the Paris skyline from the Butte Montmartre."),
  img("File:Belleville Paris.jpg", 1600, 1067, "Belleville neighbourhood", "Belleville's multi-ethnic streets offer a less touristy Paris experience."),
];

const BARCELONA_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Born Barcelona.jpg", 1600, 1067, "Born quarter medieval street", "El Born's medieval lanes predate Barcelona's grid-planned Eixample."),
  img("File:Gracia Barcelona.jpg", 1600, 1067, "Placa del Sol in Gracia", "Placa del Sol is Gracia's social hub with terrace cafes."),
  img("File:Barceloneta Beach.jpg", 1600, 1067, "Barceloneta beach morning", "Barceloneta's beach is quietest in the early morning."),
];

const AMSTERDAM_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Jordaan Amsterdam.jpg", 1600, 1067, "Jordaan canal and houseboats", "The Jordaan's narrow canals create Amsterdam's most photographed streetscapes."),
  img("File:Albert Cuyp Market.jpg", 1600, 1067, "Albert Cuyp Market in De Pijp", "The Albert Cuyp Market is Amsterdam's largest outdoor market."),
  img("File:Hortus Botanicus Amsterdam.jpg", 1600, 1067, "Hortus Botanicus garden", "The Hortus Botanicus was founded in 1638 in the Plantage district."),
];

const LISBON_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Alfama Lisbon.jpg", 1600, 1067, "Alfama district narrow streets", "Alfama's labyrinthine alleys survived the 1755 earthquake."),
  img("File:Bairro Alto Lisbon.jpg", 1600, 1067, "Bairro Alto street in Lisbon", "Bairro Alto's 16th-century grid is now Lisbon's nightlife centre."),
  img("File:Belem Tower.jpg", 1600, 1067, "Torre de Belem on the Tagus", "The Torre de Belem marks Lisbon's Age of Discoveries."),
  img("File:LX Factory Lisbon.jpg", 1600, 1067, "LX Factory creative hub", "LX Factory converted a textile compound into studios and shops."),
];

const ROME_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Trastevere Rome.jpg", 1600, 1067, "Trastevere cobblestone street at dusk", "Trastevere's cobblestone lanes come alive in the evening."),
  img("File:Monti Rome.jpg", 1600, 1067, "Monti quarter street in Rome", "Monti is Rome's oldest rione with vintage shops and wine bars."),
  img("File:Testaccio Market Rome.jpg", 1600, 1067, "Testaccio market stalls", "Testaccio's covered market is the most authentic food market in Rome."),
  img("File:Aventine Keyhole Rome.jpg", 1600, 1067, "View from Aventine Hill", "The Aventine Hill offers one of Rome's most peaceful morning walks."),
];

const BERLIN_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Kreuzberg Berlin.jpg", 1600, 1067, "Kreuzberg canal scene", "Kreuzberg's Landwehr Canal draws picnickers and cafe crowds."),
  img("File:Prenzlauer Berg Berlin.jpg", 1600, 1067, "Prenzlauer Berg street", "Prenzlauer Berg's renovated Altbau buildings line leafy avenues."),
  img("File:Museum Island Berlin.jpg", 1600, 1067, "Museum Island from the Spree", "Museum Island clusters five world-class museums on a single island."),
  img("File:Friedrichshain Berlin.jpg", 1600, 1067, "East Side Gallery in Friedrichshain", "The East Side Gallery preserves the longest remaining section of the Berlin Wall."),
];

const PRAGUE_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Mala Strana Prague.jpg", 1600, 1067, "Mala Strana rooftops from above", "Mala Strana's baroque rooftops spread below Prague Castle."),
  img("File:Vinohrady Prague.jpg", 1600, 1067, "Vinohrady residential street", "Vinohrady's Art Nouveau facades line wide residential boulevards."),
  img("File:Josefov Prague.jpg", 1600, 1067, "Old Jewish Cemetery in Josefov", "Josefov's Old Jewish Cemetery dates to the 15th century."),
];

const VIENNA_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Naschmarkt Vienna.jpg", 1600, 1067, "Naschmarkt stalls in Vienna", "The Naschmarkt stretches over 1.5 kilometres with food stalls and restaurants."),
  img("File:Spittelberg Vienna.jpg", 1600, 1067, "Spittelberg cobblestone lane", "Spittelberg's Biedermeier lanes host a famous Christmas market."),
  img("File:Leopoldstadt Vienna.jpg", 1600, 1067, "Prater park in Leopoldstadt", "Leopoldstadt's Prater park offers green space minutes from the city centre."),
];

const COPENHAGEN_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Norrebro Copenhagen.jpg", 1600, 1067, "Norrebro street scene", "Norrebro is Copenhagen's most diverse neighbourhood with independent shops."),
  img("File:Christianshavn Copenhagen.jpg", 1600, 1067, "Christianshavn canal houses", "Christianshavn's canal houses evoke a smaller-scale Amsterdam."),
  img("File:Vesterbro Copenhagen.jpg", 1600, 1067, "Vesterbro Kodbyen meat district", "Vesterbro's former meatpacking district is now a restaurant and bar hub."),
];

const EDINBURGH_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Edinburgh Old Town.jpg", 1600, 1067, "Edinburgh Old Town closes", "The Old Town's narrow closes hide centuries of history off the Royal Mile."),
  img("File:Stockbridge Edinburgh.jpg", 1600, 1067, "Stockbridge village street", "Stockbridge retains a village feel with independent shops and a Sunday market."),
  img("File:Leith Edinburgh.jpg", 1600, 1067, "Leith Shore waterfront", "Leith's waterfront has transformed into Edinburgh's dining destination."),
];

const MADRID_HUB_IMAGES: GuideMediaImage[] = [
  img("File:La Latina Madrid.jpg", 1600, 1067, "La Latina tapas bars", "La Latina's Cava Baja is Madrid's most famous tapas street."),
  img("File:Malasana Madrid.jpg", 1600, 1067, "Malasana neighbourhood street", "Malasana's Plaza del Dos de Mayo anchors Madrid's alternative scene."),
  img("File:Retiro Park Madrid.jpg", 1600, 1067, "Crystal Palace in Retiro Park", "The Crystal Palace in Retiro Park hosts free contemporary art exhibitions."),
];

const BUDAPEST_HUB_IMAGES: GuideMediaImage[] = [
  img("File:Ruin Bars Budapest.jpg", 1600, 1067, "Szimpla Kert ruin bar interior", "Szimpla Kert pioneered Budapest's ruin bar scene in a former factory."),
  img("File:Buda Castle Budapest.jpg", 1600, 1067, "Buda Castle and Fisherman's Bastion", "The Castle District offers panoramic views over the Danube and Pest."),
  img("File:Great Market Hall Budapest.jpg", 1600, 1067, "Great Market Hall interior", "The Great Market Hall is Budapest's largest and oldest indoor market."),
];

// ─── Hub article content ─────────────────────────────────────────

export const HUBS_EUROPE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ═══════════════════════════════════════════════════════════════
  // 1. London
  // ═══════════════════════════════════════════════════════════════
  "london-neighborhood-walks": {
    ja: ja(UK_JA_CTA,
      "ロンドンの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "テムズ南岸、ノッティングヒル、ショーディッチ、ハムステッドヒース、グリニッジなどロンドンの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      LONDON_HUB_IMAGES[0],
      LONDON_HUB_IMAGES,
      LONDON_X,
      [
        {
          heading: "ロンドンの街歩きは「地区ごとの個性」で選ぶ",
          body:
            "ロンドンの魅力は、ひとつの都市の中に全く異なる個性のエリアが隣り合っていることです。テムズ南岸はアートと食のリバーサイド散歩、ノッティングヒルはパステルカラーの住宅街とアンティーク市場、ショーディッチはストリートアートとカフェカルチャー、ハムステッドヒースは丘の上の絶景と村の雰囲気、グリニッジは海洋史と天文台の文化散歩。どれも地下鉄で30分以内に移動できる距離にありながら、まるで別の街を歩いているような体験ができます。\n\n" +
            "このページではロンドンの5つの街歩きルートをエリア別に紹介しています。初めてのロンドンでも、リピーターでも、目的に合った半日ルートが見つかります。",
        },
        {
          heading: "テムズ南岸: テート・モダンからバラマーケットへ",
          body:
            "テムズ南岸はロンドンでもっとも歩きやすい河沿い遊歩道です。テート・モダンからバラマーケットまで約2km、信号なしでほぼ一直線に歩けます。途中にシェイクスピア・グローブ座やサザーク大聖堂が並び、美術・歴史・食をひとつのルートで体験できます。対岸のセント・ポール大聖堂へはミレニアムブリッジで渡れます。\n\n" +
            "「ロンドン テムズ南岸散策」で、テート・モダンからバラマーケットまでの詳細ルートを紹介しています。",
        },
        {
          heading: "ノッティングヒル & ショーディッチ: 対照的な2エリア",
          body:
            "ノッティングヒルはパステルカラーのビクトリア朝テラスハウスとポートベロ・ロードのアンティーク市場が魅力。土曜日に全面展開する市場は、ヴィンテージ雑貨からストリートフードまで数百メートルにわたって並びます。対照的にショーディッチは東ロンドンのクリエイティブの中心地で、ストリートアート、ブリックレーンのカレー通り、日曜限定のコロンビアロード・フラワーマーケットが見どころです。\n\n" +
            "「ノッティングヒル散策」と「ショーディッチ散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "ハムステッドヒース & グリニッジ: 自然と歴史の郊外散歩",
          body:
            "ハムステッドヒースはロンドン中心部を一望できるパーラメントヒルの丘と、ジョージアン様式の村ハムステッドが魅力です。ケンウッドハウスではフェルメールやレンブラントが無料で鑑賞できます。グリニッジは旧王立海軍大学、カティサーク号、王立天文台とグリニッジ子午線という海洋史と天文学の宝庫。どちらも中心部から30分以内のアクセスです。\n\n" +
            "「ハムステッドヒース散歩」と「グリニッジ散策」で郊外ルートの詳細を紹介しています。",
        },
        {
          heading: "ロンドン街歩きの実用情報",
          body:
            "ロンドンはほぼ全店コンタクトレス決済に対応しており、現金が使えない店も増えています。地下鉄はOysterカードまたはコンタクトレス決済でタップするだけ。天候は年間を通じて変わりやすいので、レインジャケットは必携です。eSIMがあればGoogleマップでリアルタイムにルート確認でき、バスの到着時刻や市場の混雑状況もチェックできます。\n\n" +
            "1日で2エリアが目安です。午前に1エリアを歩き、地下鉄で移動して午後にもう1エリアを回ると、無理のない半日×2のプランになります。",
        },
      ],
      [
        { q: "ロンドンの街歩きで初心者におすすめのエリアは？", a: "テムズ南岸が最も歩きやすいです。駅から近く、道が一直線で迷いにくく、テート・モダンもバラマーケットも無料で楽しめます。" },
        { q: "1日で何エリア回れますか？", a: "2エリアが目安です。午前に1エリア、地下鉄で移動して午後にもう1エリアが満足度の高いペースです。" },
        { q: "雨の日でも街歩きできますか？", a: "はい。テムズ南岸はテート・モダンとバラマーケットが屋根付き、ショーディッチはスピタルフィールズマーケットが屋内なので雨天でも楽しめます。" },
        { q: "ロンドンの街歩きに最適な季節は？", a: "5月〜9月は日が長く歩きやすいですが、観光客も多いです。4月と10月は気温も穏やかで人が少なく快適です。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "London Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A comprehensive guide to London's best neighbourhood walks: South Bank, Notting Hill, Shoreditch, Hampstead Heath, and Greenwich. Five distinct routes for every kind of traveller.",
      LONDON_HUB_IMAGES[0],
      LONDON_HUB_IMAGES,
      LONDON_X,
      [
        {
          heading: "London walking is about choosing the right neighbourhood",
          body:
            "London's appeal for walking lies in how completely different each district feels. The South Bank delivers riverside art and food. Notting Hill offers pastel terraces and antique markets. Shoreditch pulses with street art and cafe culture. Hampstead Heath opens up hilltop panoramas and village calm. Greenwich brings maritime history and the Prime Meridian. All of these sit within 30 minutes of each other by Tube, yet each one feels like its own city.\n\n" +
            "This page organises five London walking routes by area. Whether you are visiting for the first time or returning, you will find a half-day route that matches your interests.",
        },
        {
          heading: "South Bank: Tate Modern to Borough Market",
          body:
            "The South Bank is London's most walkable riverside stretch. From Tate Modern to Borough Market is about 2 km with no traffic lights, passing Shakespeare's Globe and Southwark Cathedral along the way. The Millennium Bridge connects to St Paul's Cathedral on the north bank.\n\n" +
            "See the London South Bank walk guide for the full route from Tate Modern to Borough Market.",
        },
        {
          heading: "Notting Hill and Shoreditch: two contrasting neighbourhoods",
          body:
            "Notting Hill delivers the most photogenic residential streets in London with its pastel Victorian terraces and Portobello Road's Saturday antique market. Shoreditch, by contrast, is East London's creative centre with constantly changing street art, Brick Lane's food scene, and the Sunday-only Columbia Road Flower Market.\n\n" +
            "See the Notting Hill walk and Shoreditch walk guides for individual routes.",
        },
        {
          heading: "Hampstead Heath and Greenwich: nature and history on the edges",
          body:
            "Hampstead Heath gives you Parliament Hill's panoramic views over central London and a Georgian village with independent shops. Kenwood House on the heath has a Vermeer and a Rembrandt, free to enter. Greenwich clusters the Old Royal Naval College, Cutty Sark, the Royal Observatory, and the Prime Meridian — all within walking distance. Both areas are under 30 minutes from central London.\n\n" +
            "See the Hampstead Heath walk and Greenwich walk guides for full routes.",
        },
        {
          heading: "Practical information for London walks",
          body:
            "London is almost entirely contactless — many shops and vendors refuse cash. The Tube uses Oyster cards or contactless bank cards. Weather changes quickly year-round, so carry a packable rain jacket. With an eSIM you can check live bus times, look up market schedules, and navigate without searching for Wi-Fi.\n\n" +
            "Two areas in one day is a comfortable pace. Walk one neighbourhood in the morning, take the Tube, and explore another in the afternoon.",
        },
      ],
      [
        { q: "Which London neighbourhood is best for a first walk?", a: "The South Bank is the easiest starting point: it is close to stations, follows a straight path, and both Tate Modern and Borough Market are free to enjoy." },
        { q: "How many areas can I cover in one day?", a: "Two is ideal. One area in the morning and another after lunch keeps the pace comfortable without rushing." },
        { q: "Can I walk in the rain?", a: "Yes. The South Bank has covered spaces at Tate Modern and Borough Market. Shoreditch has the indoor Spitalfields Market. Both work well in wet weather." },
        { q: "When is the best time to visit London for walking?", a: "May to September offers the longest daylight hours but also the most tourists. April and October are milder and less crowded." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. Paris
  // ═══════════════════════════════════════════════════════════════
  "paris-neighborhood-walks": {
    ja: ja(FR_JA_CTA,
      "パリの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "マレ地区、サン・マルタン運河、モンマルトル裏通り、カルチエ・ラタン、ベルヴィルなどパリの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      PARIS_HUB_IMAGES[0],
      PARIS_HUB_IMAGES,
      PARIS_X,
      [
        {
          heading: "パリの街歩きは「セーヌの外側」で楽しむ",
          body:
            "エッフェル塔やルーヴルだけがパリではありません。マレ地区の中世の路地、サン・マルタン運河の鉄橋とプラタナス、モンマルトルの観光客が来ない裏通り、カルチエ・ラタンの学生街、ベルヴィルの多民族な坂道。パリの街歩きは、大通りを避けて路地に入った瞬間から始まります。\n\n" +
            "このページではパリの5つの街歩きルートをエリア別に紹介しています。定番観光の後に「もう少しローカルなパリを歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "マレ地区: 中世の路地とユダヤ人街",
          body:
            "マレ地区はオスマンの都市改造を逃れた中世の街路がそのまま残るエリアです。ヴォージュ広場はパリ最古の計画広場で、1612年に完成しました。ロジエ通りのファラフェル店、カルナヴァレ美術館（無料）、ピカソ美術館と見どころが密集しています。\n\n" +
            "「パリ・マレ地区散策」で、中世の路地を抜けるルートを紹介しています。",
        },
        {
          heading: "サン・マルタン運河 & モンマルトル裏通り",
          body:
            "サン・マルタン運河はパリで最もフォトジェニックな散歩道のひとつです。鉄の歩道橋とプラタナスの並木、レピュブリック広場から北へ歩く4.5kmの水辺ルート。モンマルトルは観光客で賑わうサクレ・クール周辺を避け、ぶどう園やラパン・アジルの裏道を歩くと、19世紀のボヘミアンな空気が残っています。\n\n" +
            "「サン・マルタン運河散策」と「モンマルトル裏通り散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "カルチエ・ラタン & ベルヴィル: 左岸と丘の上",
          body:
            "カルチエ・ラタンはソルボンヌ大学を中心に1257年から学生が集まるエリアです。シェイクスピア・アンド・カンパニー書店、パンテオン、ムフタール通りの食料市場、リュクサンブール公園と、知的な散歩が楽しめます。ベルヴィルは北アフリカやアジアからの移民コミュニティが共存する多文化な丘で、ベルヴィル公園の展望台からパリを一望できます。\n\n" +
            "「カルチエ・ラタン散策」と「ベルヴィル散策」で詳細ルートを紹介しています。",
        },
        {
          heading: "パリ街歩きの実用情報",
          body:
            "パリの地下鉄はNavigo Easy（ICカード）またはコンタクトレス決済で乗車できます。カフェやブーランジュリーではカード決済が一般的ですが、マルシェ（市場）の小さなスタンドでは現金が必要な場合もあります。スリはメトロ車内と観光地周辺に多いため、バッグは体の前で持ちましょう。eSIMがあれば地下鉄の乗り換え検索やレストランの予約がスムーズです。\n\n" +
            "1日で2エリアが快適なペースです。午前にマレ地区を歩き、午後にサン・マルタン運河沿いを散策するような組み合わせがおすすめです。",
        },
      ],
      [
        { q: "パリの街歩きで初心者におすすめのエリアは？", a: "マレ地区が最も始めやすいです。メトロ駅から近く、見どころが密集しており、カフェも多いので休憩しやすいです。" },
        { q: "1日で何エリア回れますか？", a: "2エリアが目安です。午前と午後で1エリアずつ、メトロで移動するのが快適です。" },
        { q: "パリの街歩きに最適な季節は？", a: "4月〜6月と9月〜10月が最適です。夏は日が長いですが観光客が多く、冬は寒いですがクリスマスマーケットの季節は魅力的です。" },
      ],
    ),
    en: en(FR_EN_CTA,
      "Paris Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A comprehensive guide to Paris's best neighbourhood walks: the Marais, Canal Saint-Martin, Montmartre backstreets, Latin Quarter, and Belleville. Five routes beyond the boulevards.",
      PARIS_HUB_IMAGES[0],
      PARIS_HUB_IMAGES,
      PARIS_X,
      [
        {
          heading: "Paris walking happens in the side streets",
          body:
            "The Eiffel Tower and the Louvre are not the whole story. The Marais keeps its medieval street plan. Canal Saint-Martin offers iron footbridges and plane trees. Montmartre's back lanes still feel bohemian once you leave Sacre-Coeur's tourist orbit. The Latin Quarter has been a student district since 1257. Belleville's multicultural hillside delivers one of the best panoramic views in the city.\n\n" +
            "This page organises five Paris walking routes by area. When you have checked off the major sights and want something more local, start here.",
        },
        {
          heading: "The Marais: medieval lanes and hidden courtyards",
          body:
            "The Marais survived Haussmann's demolitions and keeps its medieval street plan. Place des Vosges, completed in 1612, is the oldest planned square in Paris. Rue des Rosiers offers falafel shops and bakeries. The Musee Carnavalet (free entry) and the Musee Picasso sit within easy walking distance.\n\n" +
            "See the Paris Marais walk guide for the full route through the medieval quarter.",
        },
        {
          heading: "Canal Saint-Martin and Montmartre backstreets",
          body:
            "Canal Saint-Martin is one of the most photogenic walks in Paris: iron footbridges, plane trees, and the listed Hotel du Nord facade along 4.5 km of waterway from Place de la Republique northward. Montmartre rewards those who leave Sacre-Coeur's orbit — the vineyard, Au Lapin Agile, and Rue Lepic's winding lane still carry 19th-century atmosphere.\n\n" +
            "See the Canal Saint-Martin walk and Montmartre backstreets walk for individual routes.",
        },
        {
          heading: "Latin Quarter and Belleville: Left Bank and hilltop",
          body:
            "The Latin Quarter centres on the Sorbonne and has drawn students since 1257. Shakespeare and Company, the Pantheon, Rue Mouffetard's food market, and the Luxembourg Gardens make for an intellectual walk. Belleville sits on a hill with immigrant communities from North Africa and Asia, a strong street art scene, and a park terrace with one of the best city views.\n\n" +
            "See the Latin Quarter walk and Belleville walk for detailed routes.",
        },
        {
          heading: "Practical information for Paris walks",
          body:
            "The Paris Metro accepts Navigo Easy cards or contactless bank cards. Cafes and bakeries take cards, but some small market stalls still need cash. Pickpockets operate on the Metro and around tourist hotspots — keep bags closed and in front. With an eSIM you can look up Metro connections and make restaurant reservations without searching for Wi-Fi.\n\n" +
            "Two areas per day is comfortable. Walk the Marais in the morning and stroll Canal Saint-Martin in the afternoon for a well-paced combination.",
        },
      ],
      [
        { q: "Which Paris neighbourhood is best for a first walk?", a: "The Marais is the easiest starting point: close to Metro stations, dense with sights, and full of cafes for rest stops." },
        { q: "How many areas can I cover in one day?", a: "Two is ideal. One in the morning and one in the afternoon with a Metro ride between them." },
        { q: "When is the best time for Paris walks?", a: "April to June and September to October offer the best balance of weather and crowd levels. Summer has long daylight but heavy tourism. Winter is cold but the Christmas market season adds charm." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. Barcelona
  // ═══════════════════════════════════════════════════════════════
  "barcelona-neighborhood-walks": {
    ja: ja(ES_JA_CTA,
      "バルセロナの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "エル・ボルン、グラシア、バルセロネタなどバルセロナの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      BARCELONA_HUB_IMAGES[0],
      BARCELONA_HUB_IMAGES,
      BARCELONA_X,
      [
        {
          heading: "バルセロナの街歩きは「ランブラスの外」が面白い",
          body:
            "ランブラス通りやゴシック地区だけがバルセロナではありません。エル・ボルンの中世の路地にはカタルーニャ・ゴシックの傑作サンタ・マリア・ダル・マル教会が建ち、グラシアは元独立した村の雰囲気を残すカフェ文化の街、バルセロネタは早朝のビーチと漁師町の格子状の路地が魅力です。\n\n" +
            "このページではバルセロナの3つの街歩きルートをエリア別に紹介しています。ガウディ建築の間に「もう少し地元のバルセロナを歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "エル・ボルン: 中世の路地とカクテルバー",
          body:
            "エル・ボルンはアイシャンプラの碁盤目状の街区よりも何世紀も古い中世の路地が残るエリアです。サンタ・マリア・ダル・マル教会はカタルーニャ・ゴシックの傑作で、わずか54年で完成しました。旧ボルン市場は1714年のバルセロナの遺構を鉄製の屋根の下に保存しています。ピカソ美術館はモンカダ通りの5つの中世邸宅を繋いで展示空間にしています。\n\n" +
            "「バルセロナ・エル・ボルン散策」で中世の路地ルートを紹介しています。",
        },
        {
          heading: "グラシア & バルセロネタ: 村の空気と海辺の朝",
          body:
            "グラシアは19世紀までバルセロナとは独立した町でした。ソル広場のテラスカフェ、アバセリア市場、ガウディの処女作カサ・ビセンスが見どころです。毎年8月のフェスタ・マジョールでは通りごとに装飾コンテストが開催されます。バルセロネタは1753年に格子状に建設された漁師町で、早朝のビーチは地元のジョギングや水泳客だけの静かな時間です。\n\n" +
            "「グラシア散策」と「バルセロネタ朝散歩」でそれぞれのルートを確認できます。",
        },
        {
          heading: "バルセロナ街歩きの実用情報",
          body:
            "バルセロナの地下鉄はT-Casualカードが10回分の乗車券で便利です。カフェやレストランではカード決済が一般的。ランブラス通り周辺はスリが多いため注意が必要です。夏場（7〜8月）は日中の気温が35度を超えることがあり、午前中と夕方の散歩がおすすめです。eSIMがあれば地下鉄の路線検索やレストランの予約がスムーズです。\n\n" +
            "3つのエリアは1日あれば回れますが、午前にエル・ボルン、午後にグラシア、翌朝にバルセロネタという2日プランがゆとりあります。",
        },
      ],
      [
        { q: "バルセロナの街歩きで初心者におすすめのエリアは？", a: "エル・ボルンが最も始めやすいです。地下鉄ジャウマ1世駅から近く、見どころが密集しています。" },
        { q: "夏でも歩けますか？", a: "7〜8月は日中の暑さが厳しいので、午前中と夕方17時以降が歩きやすいです。バルセロネタは早朝が最適です。" },
        { q: "ガウディ建築と組み合わせられますか？", a: "はい。午前にサグラダ・ファミリアやグエル公園を見て、午後にグラシアやエル・ボルンを歩くと効率的です。" },
      ],
    ),
    en: en(ES_EN_CTA,
      "Barcelona Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Barcelona's best neighbourhood walks: El Born's medieval lanes, Gracia's village squares, and Barceloneta's morning beach. Three routes beyond the Ramblas.",
      BARCELONA_HUB_IMAGES[0],
      BARCELONA_HUB_IMAGES,
      BARCELONA_X,
      [
        {
          heading: "Barcelona walking gets better off the Ramblas",
          body:
            "Las Ramblas and the Gothic Quarter are not the whole picture. El Born keeps medieval lanes older than the Eixample grid by centuries. Gracia retains its identity as a formerly independent village with square-centred cafe culture. Barceloneta was built as a fishermen's grid in 1753 and its early-morning beach belongs to locals.\n\n" +
            "This page covers three Barcelona walking routes. When you want something beyond Gaudi and the Ramblas, start here.",
        },
        {
          heading: "El Born: medieval lanes and cocktail bars",
          body:
            "El Born predates the Eixample by centuries. Santa Maria del Mar is a Catalan Gothic masterpiece built in just 54 years. The former Born Market houses archaeological remains of 1714 Barcelona. The Museu Picasso occupies five connected medieval mansions on Carrer Montcada.\n\n" +
            "See the Barcelona Born quarter walk for the full route.",
        },
        {
          heading: "Gracia and Barceloneta: village squares and morning beach",
          body:
            "Gracia was an independent town until the 19th century. Placa del Sol anchors cafe life, the Abaceria market serves local produce, and Casa Vicens was Gaudi's first commission. Every August the Festa Major turns streets into decoration competitions. Barceloneta's 1753 grid was built for displaced families and its beach is quietest before 11 AM.\n\n" +
            "See the Gracia neighbourhood walk and Barceloneta morning walk for individual routes.",
        },
        {
          heading: "Practical information for Barcelona walks",
          body:
            "Barcelona's Metro uses the T-Casual card for 10 rides. Cafes and restaurants accept cards widely. Pickpockets are active around the Ramblas. Summer temperatures can exceed 35 degrees Celsius in July and August, making morning and evening the best walking times. An eSIM lets you check Metro routes and book restaurants.\n\n" +
            "All three areas fit into one day, but a two-day plan — El Born in the morning, Gracia in the afternoon, Barceloneta the next morning — is more relaxed.",
        },
      ],
      [
        { q: "Which Barcelona neighbourhood is best for a first walk?", a: "El Born is the easiest start: close to Jaume I Metro station and dense with sights." },
        { q: "Can I walk comfortably in summer?", a: "July and August midday heat is strong. Walk in the morning and after 17:00. Barceloneta is best at dawn." },
        { q: "Can I combine these with Gaudi architecture?", a: "Yes. Visit Sagrada Familia or Park Guell in the morning and walk Gracia or El Born in the afternoon." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. Amsterdam
  // ═══════════════════════════════════════════════════════════════
  "amsterdam-neighborhood-walks": {
    ja: ja(NL_JA_CTA,
      "アムステルダムの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "ヨルダーン、デ・パイプ、プランタージュなどアムステルダムの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      AMSTERDAM_HUB_IMAGES[0],
      AMSTERDAM_HUB_IMAGES,
      AMSTERDAM_X,
      [
        {
          heading: "アムステルダムの街歩きは「運河の内側」で深まる",
          body:
            "アムステルダムの運河は世界遺産ですが、その真の魅力は運河沿いの各地区が持つ異なる個性にあります。ヨルダーンはハウスボートと隠れ中庭（ホフイェ）の職人気質な地区、デ・パイプはアルバート・カイプ市場を中心とした多文化な食の街、プランタージュは植物園と博物館が点在する緑豊かな文化地区です。\n\n" +
            "このページではアムステルダムの3つの街歩きルートをエリア別に紹介しています。運河クルーズの後に「自分の足で歩いてみたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "ヨルダーン: 運河とハウスボートの街",
          body:
            "ヨルダーンはアムステルダムで最も写真映えするエリアです。狭い運河にハウスボートが並び、アンネ・フランクの家やウェスター教会の塔が目印になります。ノーダーマルクトでは土曜にファーマーズマーケット、月曜にフリーマーケットが開催されます。ブラウワーズグラフトはアムステルダムで最も美しい運河と評されています。\n\n" +
            "「アムステルダム・ヨルダーン散策」で運河沿いの詳細ルートを紹介しています。",
        },
        {
          heading: "デ・パイプ & プランタージュ: 市場と緑",
          body:
            "デ・パイプのアルバート・カイプ市場は週6日営業のアムステルダム最大の屋外市場です。サルファティパークでピクニック、マリー・ハイネケン広場のテラスカフェでビールという流れが地元の定番。プランタージュは1638年創設のホルタス・ボタニクス植物園、オランダ最古のアルティス動物園、ヴェルトハイム公園のアウシュヴィッツ記念碑など、静かで知的な散歩に向いています。\n\n" +
            "「デ・パイプ散策」と「プランタージュ散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "アムステルダム街歩きの実用情報",
          body:
            "アムステルダムのトラムとメトロはOVチップカードまたはコンタクトレス決済で乗車できます。カフェやレストランではカード決済が標準的。自転車優先の都市なので、自転車レーンを歩かないよう注意してください。eSIMがあればGoogleマップでトラムの路線と到着時刻を確認でき、混雑した市場でもレストラン情報を検索できます。\n\n" +
            "3つのエリアは徒歩とトラムで1日で回れますが、午前にヨルダーン、午後にデ・パイプが最も快適な組み合わせです。",
        },
      ],
      [
        { q: "アムステルダムの街歩きで初心者におすすめのエリアは？", a: "ヨルダーンが最も歩きやすいです。アムステルダム中央駅から近く、運河沿いの景色が美しく、カフェも豊富です。" },
        { q: "自転車に注意する必要がありますか？", a: "はい。アムステルダムは自転車優先都市です。赤い舗装の自転車レーンを歩かないよう注意してください。ベルが鳴ったらすぐに道を譲りましょう。" },
        { q: "雨の日でも楽しめますか？", a: "はい。アルバート・カイプ市場の一部は屋根付きで、カフェホッピングも雨天に向いています。プランタージュの植物園の温室も良い選択肢です。" },
      ],
    ),
    en: en(NL_EN_CTA,
      "Amsterdam Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Amsterdam's best neighbourhood walks: Jordaan's canals, De Pijp's market streets, and Plantage's botanical gardens. Three routes beyond the tourist centre.",
      AMSTERDAM_HUB_IMAGES[0],
      AMSTERDAM_HUB_IMAGES,
      AMSTERDAM_X,
      [
        {
          heading: "Amsterdam walking deepens inside the canal ring",
          body:
            "Amsterdam's canals are a UNESCO World Heritage site, but the real draw is how each district along them has its own character. The Jordaan is all houseboats and hidden courtyards. De Pijp centres on the Albert Cuyp Market and multicultural food. Plantage is a green, museum-rich quarter with the oldest botanical garden in the country.\n\n" +
            "This page covers three Amsterdam walking routes. When you want to leave the canal-cruise tourist flow and walk at your own pace, start here.",
        },
        {
          heading: "Jordaan: canals and houseboats",
          body:
            "The Jordaan produces Amsterdam's most photographed streetscapes. Narrow canals lined with houseboats, the Anne Frank House, and Westerkerk's tower define the area. The Noordermarkt hosts a farmers market on Saturdays and a flea market on Mondays. Brouwersgracht is often cited as the most beautiful canal in the city.\n\n" +
            "See the Amsterdam Jordaan walk for the canal-side route.",
        },
        {
          heading: "De Pijp and Plantage: market and green",
          body:
            "De Pijp's Albert Cuyp Market runs six days a week and is Amsterdam's largest outdoor market. Sarphatipark offers weekend picnic space and Marie Heinekenplein has large terrace cafes. Plantage holds the Hortus Botanicus (founded 1638), Artis Royal Zoo (the oldest in the Netherlands), and the Hollandsche Schouwburg Holocaust memorial.\n\n" +
            "See the De Pijp walk and Plantage walk for individual routes.",
        },
        {
          heading: "Practical information for Amsterdam walks",
          body:
            "Amsterdam's trams and Metro accept OV-chipkaart or contactless bank cards. Cafes and restaurants are card-standard. Cycling has priority — stay off red-paved bike lanes and yield immediately when you hear a bell. An eSIM lets you check tram times and search restaurant information in busy markets.\n\n" +
            "All three areas fit into one day by tram and foot. The Jordaan in the morning and De Pijp in the afternoon is the most comfortable combination.",
        },
      ],
      [
        { q: "Which Amsterdam neighbourhood is best for a first walk?", a: "The Jordaan is the easiest: close to Centraal Station, beautiful canal views, and plenty of cafes." },
        { q: "Do I need to watch out for bikes?", a: "Yes. Amsterdam prioritises cycling. Stay off the red-paved bike lanes and step aside immediately when you hear a bell." },
        { q: "Can I walk in the rain?", a: "Yes. Part of the Albert Cuyp Market is covered, cafe hopping works well in rain, and the Plantage greenhouses are a good option." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. Lisbon
  // ═══════════════════════════════════════════════════════════════
  "lisbon-neighborhood-walks": {
    ja: ja(PT_JA_CTA,
      "リスボンの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "アルファマ、バイロ・アルト、ベレン、LXファクトリーなどリスボンの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      LISBON_HUB_IMAGES[0],
      LISBON_HUB_IMAGES,
      LISBON_X,
      [
        {
          heading: "リスボンの街歩きは「丘と坂」で組み立てる",
          body:
            "リスボンは7つの丘の街と呼ばれ、街歩きは坂道との付き合い方で決まります。アルファマは1755年の大地震を生き延びた迷路のような路地、バイロ・アルトは16世紀の格子状の街区とミラドウロ（展望台）、ベレンは大航海時代の記念碑が河沿いに並ぶ平坦な散歩道、LXファクトリーは旧織物工場を改装したクリエイティブ拠点です。\n\n" +
            "このページではリスボンの4つの街歩きルートをエリア別に紹介しています。トラム28番の車窓を楽しんだ後は、自分の足で丘を歩いてみてください。",
        },
        {
          heading: "アルファマ: 地震を生き延びた迷路の朝",
          body:
            "アルファマはリスボン最古の地区で、1755年の大地震を唯一生き延びた迷路状の路地が広がります。サン・ジョルジェ城からタグス川を見下ろすパノラマ、ファド博物館、サンタ・ルジア展望台のアズレージョ（タイル）と見どころが凝縮しています。朝の散歩が最も静かで、トラム28番より徒歩の方が路地の奥まで入れます。\n\n" +
            "「リスボン・アルファマ朝散歩」で早朝のルートを紹介しています。",
        },
        {
          heading: "バイロ・アルト & ベレン: 夜の街とリバーサイド",
          body:
            "バイロ・アルトは日中は静かな住宅街ですが、夜はリスボン最大のナイトライフエリアに変貌します。サン・ペドロ・デ・アルカンタラ展望台からの眺望、グロリア線ケーブルカー、シアードの書店街が日中の見どころです。ベレンはジェロニモス修道院、ベレンの塔、発見のモニュメント、MAAT美術館と大航海時代の記念碑が河沿いに並ぶ平坦な散歩道です。1837年創業のパステイス・デ・ベレンのエッグタルトは必食。\n\n" +
            "「バイロ・アルト散策」と「ベレン・リバーサイド散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "LXファクトリー: インダストリアル・シックな散歩",
          body:
            "LXファクトリーは19世紀の織物工場を改装したクリエイティブ拠点で、独立系ショップ、デザインスタジオ、レストラン、巨大書店レール・デヴァガールが集まっています。25 de Abril橋が真上にそびえ、インダストリアルな背景が独特の雰囲気を作っています。ベレンからトラム15E番で簡単にアクセスできます。\n\n" +
            "「LXファクトリー散策」でクリエイティブ拠点のルートを紹介しています。",
        },
        {
          heading: "リスボン街歩きの実用情報",
          body:
            "リスボンのトラムやメトロはViva Viagemカードで乗車できます。カフェやレストランではカード決済が一般的ですが、小さな食堂では現金が必要な場合もあります。坂道が多いので歩きやすい靴が必須。石畳は雨天時に滑りやすくなります。eSIMがあればトラムの路線検索やレストランの予約がスムーズです。\n\n" +
            "1日で2〜3エリアが回れます。午前にアルファマ、午後にバイロ・アルト、翌日にベレンとLXファクトリーの組み合わせがおすすめです。",
        },
      ],
      [
        { q: "リスボンの街歩きで初心者におすすめのエリアは？", a: "アルファマが最も魅力的ですが坂が多いです。平坦な散歩が良ければベレンのリバーサイドが歩きやすいです。" },
        { q: "トラム28番と徒歩、どちらがいい？", a: "両方がおすすめです。トラム28番で全体像を掴んでから、気になったエリアを徒歩で深掘りする組み合わせが効率的です。" },
        { q: "坂道がきつい場合は？", a: "ケーブルカー（グロリア線、ビカ線）やエレベーター（サンタ・ジュスタ）を活用してください。ベレンは完全に平坦です。" },
      ],
    ),
    en: en(PT_EN_CTA,
      "Lisbon Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Lisbon's best neighbourhood walks: Alfama's medieval maze, Bairro Alto's viewpoints, Belem's riverside monuments, and LX Factory's creative hub. Four routes across the seven hills.",
      LISBON_HUB_IMAGES[0],
      LISBON_HUB_IMAGES,
      LISBON_X,
      [
        {
          heading: "Lisbon walking is about hills and timing",
          body:
            "Lisbon is the city of seven hills, and walking here means choosing when to climb and when to take the flat routes. Alfama's medieval maze survived the 1755 earthquake. Bairro Alto's 16th-century grid offers viewpoints and funiculars. Belem lines up Age of Discovery monuments along a flat riverside promenade. LX Factory repurposes a textile mill into a creative hub beneath the 25 de Abril Bridge.\n\n" +
            "This page covers four Lisbon walking routes by area. After riding Tram 28 for the overview, come back and explore on foot.",
        },
        {
          heading: "Alfama: the earthquake survivor's morning maze",
          body:
            "Alfama is Lisbon's oldest quarter — the only one that survived the 1755 earthquake intact. The labyrinthine alleys climb to Castelo de Sao Jorge with panoramic views of the Tagus. The Fado Museum, Santa Luzia viewpoint with its azulejo tiles, and the Se cathedral pack sights into a tight area. Morning is quietest and walking gives better access than Tram 28.\n\n" +
            "See the Lisbon Alfama morning walk for the early route.",
        },
        {
          heading: "Bairro Alto and Belem: nightlife district and riverside",
          body:
            "Bairro Alto is a quiet residential grid by day and Lisbon's biggest nightlife zone after dark. The Sao Pedro de Alcantara viewpoint, Gloria funicular, and Chiado's literary quarter are the daytime draws. Belem lines up the Jeronimos Monastery, Belem Tower, Monument to the Discoveries, and MAAT museum along a flat waterfront. Pasteis de Belem has baked custard tarts to a secret recipe since 1837.\n\n" +
            "See the Bairro Alto walk and Belem riverside walk for individual routes.",
        },
        {
          heading: "LX Factory: industrial-chic walking",
          body:
            "LX Factory converted a 19th-century textile compound into studios, shops, restaurants, and the spectacular Ler Devagar bookshop. The 25 de Abril Bridge looms directly overhead. Tram 15E from Belem stops three minutes' walk away.\n\n" +
            "See the LX Factory walk for the creative-hub route.",
        },
        {
          heading: "Practical information for Lisbon walks",
          body:
            "Lisbon's trams and Metro use the Viva Viagem card. Cafes and restaurants take cards, but small tascas may need cash. Comfortable shoes are essential for the hills and cobblestones, which get slippery in rain. An eSIM lets you check tram routes and make restaurant reservations.\n\n" +
            "Two to three areas fit into one day. Walk Alfama in the morning, Bairro Alto in the afternoon, and save Belem and LX Factory for the next day.",
        },
      ],
      [
        { q: "Which Lisbon neighbourhood is best for a first walk?", a: "Alfama is the most atmospheric but hilly. For flat walking, Belem's riverside is easier." },
        { q: "Tram 28 or walking?", a: "Both. Ride Tram 28 for the overview, then return on foot to explore the side alleys the tram cannot reach." },
        { q: "What if the hills are too steep?", a: "Use the funiculars (Gloria, Bica) and elevators (Santa Justa). Belem is completely flat." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. Rome
  // ═══════════════════════════════════════════════════════════════
  "rome-neighborhood-walks": {
    ja: ja(IT_JA_CTA,
      "ローマの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "トラステヴェレ、モンティ、テスタッチョ、アヴェンティーノなどローマの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      ROME_HUB_IMAGES[0],
      ROME_HUB_IMAGES,
      ROME_X,
      [
        {
          heading: "ローマの街歩きは「遺跡の裏側」にある",
          body:
            "コロッセオやバチカンだけがローマではありません。トラステヴェレの石畳の路地は夕暮れ時に最も美しく、モンティはローマ最古のリオーネ（地区）でヴィンテージショップとワインバーが並びます。テスタッチョはかつての屠殺場地区が本格的なローマ料理の聖地に変貌し、アヴェンティーノの丘は早朝の静寂と鍵穴からの絶景で知られています。\n\n" +
            "このページではローマの4つの街歩きルートをエリア別に紹介しています。遺跡巡りの合間に「もう少しローカルなローマを歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "トラステヴェレ: 石畳の路地と夕暮れの散歩",
          body:
            "トラステヴェレ（テヴェレ川の向こう側）はローマで最も雰囲気のある地区のひとつです。中世の石畳の路地、ツタに覆われた壁、サンタ・マリア・イン・トラステヴェレ教会の金のモザイクが夕暮れの光に映えます。夜はトラットリアやバーが活気づき、地元のローマっ子と観光客が入り混じります。\n\n" +
            "「ローマ・トラステヴェレ散策」で夕方から夜にかけてのルートを紹介しています。",
        },
        {
          heading: "モンティ & テスタッチョ: ヴィンテージと食の地区",
          body:
            "モンティはコロッセオの裏手にあるローマ最古のリオーネで、Via del Boschetto沿いにヴィンテージショップやアトリエが並びます。週末にはホテル・パラッツォの中庭でメルカート・モンティのフリーマーケットが開催されます。テスタッチョは旧屠殺場を改装したメルカート・テスタッチョを中心に、カルボナーラやカチョ・エ・ペペの名店が集まるローマ料理の聖地です。\n\n" +
            "「モンティ散策」と「テスタッチョ散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "アヴェンティーノ: 朝の丘の静寂",
          body:
            "アヴェンティーノの丘はローマの7つの丘のひとつで、早朝の散歩に最適です。マルタ騎士団の館の鍵穴からサン・ピエトロ大聖堂のドームが完璧にフレーミングされる有名な絶景ポイントがあります。オレンジの庭園（ジャルディーノ・デリ・アランチ）からはテヴェレ川とローマの全景が見渡せます。サンタ・サビーナ聖堂は5世紀の初期キリスト教建築の傑作です。\n\n" +
            "「アヴェンティーノ朝散歩」で早朝のルートを紹介しています。",
        },
        {
          heading: "ローマ街歩きの実用情報",
          body:
            "ローマのバスやメトロはBITチケット（100分有効）で乗車できます。トラットリアやバールではカード決済が増えていますが、小さな食堂では現金が必要な場合もあります。石畳が多いので歩きやすい靴が必須です。スリはメトロやバスの車内、テルミニ駅周辺に多いため注意してください。eSIMがあればバスの路線検索やレストランの予約がスムーズです。\n\n" +
            "1日で2エリアが目安です。午前にモンティを歩き、午後にトラステヴェレで夕暮れを迎える組み合わせがおすすめです。",
        },
      ],
      [
        { q: "ローマの街歩きで初心者におすすめのエリアは？", a: "トラステヴェレが最も雰囲気があります。バス8番（トラム）でテルミニ方面から簡単にアクセスできます。" },
        { q: "遺跡巡りと組み合わせられますか？", a: "はい。午前にコロッセオとフォロ・ロマーノを見て、午後にモンティやトラステヴェレを歩くと効率的です。" },
        { q: "夏でも歩けますか？", a: "7〜8月は日中の気温が35度を超えることがあります。午前中と夕方17時以降が歩きやすいです。" },
      ],
    ),
    en: en(IT_EN_CTA,
      "Rome Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Rome's best neighbourhood walks: Trastevere's cobblestones, Monti's vintage shops, Testaccio's food market, and Aventine's morning views. Four routes beyond the ruins.",
      ROME_HUB_IMAGES[0],
      ROME_HUB_IMAGES,
      ROME_X,
      [
        {
          heading: "Rome walking happens behind the ruins",
          body:
            "The Colosseum and Vatican are not the whole city. Trastevere's cobblestone lanes are most beautiful at dusk. Monti is Rome's oldest rione with vintage shops and wine bars. Testaccio turned its former slaughterhouse district into the city's most authentic food neighbourhood. The Aventine Hill offers early-morning silence and a keyhole view of St Peter's dome.\n\n" +
            "This page covers four Rome walking routes. When you want a break from monument queues, start here.",
        },
        {
          heading: "Trastevere: cobblestones and evening light",
          body:
            "Trastevere — across the Tiber — is one of Rome's most atmospheric districts. Medieval cobblestone lanes, ivy-covered walls, and the golden mosaics of Santa Maria in Trastevere glow in the evening light. After dark, trattorias and bars bring locals and visitors together.\n\n" +
            "See the Rome Trastevere walk for the evening route.",
        },
        {
          heading: "Monti and Testaccio: vintage and food",
          body:
            "Monti sits behind the Colosseum as Rome's oldest rione. Via del Boschetto lines up vintage shops and ateliers. Weekend flea markets fill the courtyard of a palazzo. Testaccio centres on the covered Mercato Testaccio, surrounded by restaurants serving definitive carbonara and cacio e pepe.\n\n" +
            "See the Monti quarter walk and Testaccio walk for individual routes.",
        },
        {
          heading: "Aventine: morning hilltop silence",
          body:
            "The Aventine Hill is one of Rome's original seven hills and is best visited at dawn. The Knights of Malta keyhole frames St Peter's dome perfectly. The Orange Garden (Giardino degli Aranci) offers panoramic views across the Tiber. The Basilica of Santa Sabina is a 5th-century early Christian masterpiece.\n\n" +
            "See the Aventine morning walk for the early route.",
        },
        {
          heading: "Practical information for Rome walks",
          body:
            "Rome's buses and Metro use BIT tickets valid for 100 minutes. Card payment is growing but small trattorias and bars may still need cash. Comfortable shoes are essential on cobblestones. Pickpockets are active on the Metro, buses, and around Termini station. An eSIM lets you check bus routes and book restaurants.\n\n" +
            "Two areas per day is a good pace. Walk Monti in the morning and reach Trastevere for the evening light.",
        },
      ],
      [
        { q: "Which Rome neighbourhood is best for a first walk?", a: "Trastevere is the most atmospheric. Tram 8 reaches it easily from the Termini side of the city." },
        { q: "Can I combine these with ruin visits?", a: "Yes. Visit the Colosseum and Roman Forum in the morning and walk Monti or Trastevere in the afternoon." },
        { q: "Can I walk comfortably in summer?", a: "July and August temperatures often exceed 35 degrees Celsius. Walk in the morning and after 17:00." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. Berlin
  // ═══════════════════════════════════════════════════════════════
  "berlin-neighborhood-walks": {
    ja: ja(DE_JA_CTA,
      "ベルリンの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "クロイツベルク、プレンツラウアー・ベルク、ミッテ博物館島、フリードリヒスハインなどベルリンの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      BERLIN_HUB_IMAGES[0],
      BERLIN_HUB_IMAGES,
      BERLIN_X,
      [
        {
          heading: "ベルリンの街歩きは「地区の歴史」で選ぶ",
          body:
            "ベルリンは壁の崩壊から35年以上が経ち、各地区がそれぞれの歴史と文化を背景に独自の個性を発展させてきました。クロイツベルクはトルコ系移民の影響を受けた多文化な運河沿いの街、プレンツラウアー・ベルクは旧東ベルリンのアルトバウ（戦前建築）が並ぶ家族向けの街、ミッテの博物館島は5つの世界的博物館が集まる文化の島、フリードリヒスハインはイーストサイドギャラリー（ベルリンの壁跡）とテクノカルチャーの拠点です。\n\n" +
            "このページではベルリンの4つの街歩きルートをエリア別に紹介しています。歴史、カルチャー、食、アートのどれを優先するかで最適なエリアが変わります。",
        },
        {
          heading: "クロイツベルク: 運河とケバブと多文化",
          body:
            "クロイツベルクはランドヴェーア運河沿いにカフェやバーが並ぶ、ベルリンで最も多文化なエリアです。トルコ系のマーケット（毎週火・金曜のトルコ市場）、世界で最も有名なケバブ店、独立系ギャラリーが混在しています。Kottbusser Tor駅周辺はベルリンのカウンターカルチャーの中心地です。\n\n" +
            "「ベルリン・クロイツベルク散策」で運河沿いのルートを紹介しています。",
        },
        {
          heading: "プレンツラウアー・ベルク & ミッテ博物館島",
          body:
            "プレンツラウアー・ベルクは統一後に急速に変化した旧東ベルリンの住宅地で、修復されたアルトバウの並木道、カフェ、ブティックが魅力です。マウアーパーク（日曜フリーマーケット）とカルチャー・ブラウアライが見どころです。ミッテの博物館島はシュプレー川の中洲に5つのUNESCO世界遺産の博物館が集まる、世界でも類を見ない文化空間です。\n\n" +
            "「プレンツラウアー・ベルク散策」と「ミッテ博物館島散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "フリードリヒスハイン: 壁の記憶とテクノ",
          body:
            "フリードリヒスハインはイーストサイドギャラリー（1.3kmにわたるベルリンの壁の残存部分）で最もよく知られています。壁のアートギャラリーを歩いた後は、ジーモン・ダッハ通り周辺のバーやカフェでベルリンの若者文化を体感できます。RAWゲレンデは旧鉄道修理工場を再利用したカルチャースペースです。\n\n" +
            "「フリードリヒスハイン散策」で壁跡からバー街までのルートを紹介しています。",
        },
        {
          heading: "ベルリン街歩きの実用情報",
          body:
            "ベルリンのUバーンやSバーンはBVGアプリでチケットを購入できます。ドイツは意外と現金文化が残っており、カフェやバーでは現金のみの店もまだあります。少額の現金を持ち歩くことをおすすめします。eSIMがあれば公共交通機関の乗り換え検索やレストランの予約がスムーズです。\n\n" +
            "1日で2エリアが目安です。午前にミッテの博物館島を歩き、午後にクロイツベルクやプレンツラウアー・ベルクを散策する組み合わせがおすすめです。",
        },
      ],
      [
        { q: "ベルリンの街歩きで初心者におすすめのエリアは？", a: "ミッテの博物館島が分かりやすくアクセスも良いです。カルチャー寄りならクロイツベルクが面白いです。" },
        { q: "ベルリンの壁は今も見られますか？", a: "はい。フリードリヒスハインのイーストサイドギャラリー（1.3km）が最大の壁跡です。無料で見学できます。" },
        { q: "ドイツでは現金が必要ですか？", a: "はい。ベルリンはヨーロッパの中でも現金比率が高い都市です。小さなカフェやバーでは現金のみの店があります。20〜50ユーロの現金を持ち歩くと安心です。" },
      ],
    ),
    en: en(DE_EN_CTA,
      "Berlin Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Berlin's best neighbourhood walks: Kreuzberg's canals, Prenzlauer Berg's Altbau streets, Mitte's Museum Island, and Friedrichshain's Wall art. Four routes through a divided city's reunited districts.",
      BERLIN_HUB_IMAGES[0],
      BERLIN_HUB_IMAGES,
      BERLIN_X,
      [
        {
          heading: "Berlin walking is about each district's history",
          body:
            "More than 35 years after the Wall fell, each Berlin neighbourhood carries its own history and culture. Kreuzberg is multicultural and canal-side with Turkish market influence. Prenzlauer Berg is a former East Berlin residential district now lined with restored Altbau buildings and family-friendly cafes. Mitte's Museum Island clusters five UNESCO-listed museums on a single Spree island. Friedrichshain preserves the longest remaining section of the Berlin Wall alongside a thriving techno and bar scene.\n\n" +
            "This page covers four Berlin walking routes. Which one fits depends on whether you prioritise history, culture, food, or art.",
        },
        {
          heading: "Kreuzberg: canals, kebabs, and counterculture",
          body:
            "Kreuzberg lines the Landwehr Canal with cafes and bars in Berlin's most multicultural district. The Turkish Market runs every Tuesday and Friday. Independent galleries and the countercultural pulse around Kottbusser Tor define the area.\n\n" +
            "See the Berlin Kreuzberg walk for the canal-side route.",
        },
        {
          heading: "Prenzlauer Berg and Mitte Museum Island",
          body:
            "Prenzlauer Berg transformed rapidly after reunification from a grey East Berlin district into a leafy, cafe-rich neighbourhood. Mauerpark's Sunday flea market and Kulturbrauerei are highlights. Mitte's Museum Island holds five UNESCO World Heritage museums on a Spree island — a cultural concentration unmatched anywhere in the world.\n\n" +
            "See the Prenzlauer Berg walk and Mitte Museum Island walk for individual routes.",
        },
        {
          heading: "Friedrichshain: Wall art and techno",
          body:
            "Friedrichshain is best known for the East Side Gallery, a 1.3 km stretch of the Berlin Wall covered in murals. After the gallery, Simon-Dach-Strasse's bars and cafes offer a window into young Berlin. RAW Gelande repurposes a former railway repair yard as a cultural venue.\n\n" +
            "See the Friedrichshain walk for the route from the Wall to the bar quarter.",
        },
        {
          heading: "Practical information for Berlin walks",
          body:
            "Berlin's U-Bahn and S-Bahn tickets can be bought via the BVG app. Germany retains a stronger cash culture than most of Western Europe — some cafes and bars are cash-only. Carry some euros in small bills. An eSIM lets you check transit connections and book restaurants.\n\n" +
            "Two areas per day is comfortable. Walk Museum Island in the morning and Kreuzberg or Prenzlauer Berg in the afternoon.",
        },
      ],
      [
        { q: "Which Berlin neighbourhood is best for a first walk?", a: "Mitte and Museum Island are the most straightforward with easy access. For culture and food, Kreuzberg is more interesting." },
        { q: "Can I still see the Berlin Wall?", a: "Yes. The East Side Gallery in Friedrichshain is the longest remaining section at 1.3 km. It is free to visit." },
        { q: "Do I need cash in Germany?", a: "Yes. Berlin has more cash-only businesses than most Western European capitals. Carry 20 to 50 euros in small bills." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. Prague
  // ═══════════════════════════════════════════════════════════════
  "prague-neighborhood-walks": {
    ja: ja(CZ_JA_CTA,
      "プラハの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "マラー・ストラナ、ヴィノフラディ、ヨゼフォフなどプラハの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      PRAGUE_HUB_IMAGES[0],
      PRAGUE_HUB_IMAGES,
      PRAGUE_X,
      [
        {
          heading: "プラハの街歩きは「旧市街広場の外」で輝く",
          body:
            "プラハ城とカレル橋は見応えがありますが、街歩きの本当の醍醐味は観光の中心から少し離れたエリアにあります。マラー・ストラナはプラハ城の麓に広がるバロック建築の地区、ヴィノフラディはアール・ヌーヴォーのファサードが並ぶ住宅街、ヨゼフォフは15世紀からの旧ユダヤ人街で歴史的な墓地とシナゴーグが残っています。\n\n" +
            "このページではプラハの3つの街歩きルートをエリア別に紹介しています。カレル橋を渡った後に「もう少し静かなプラハを歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "マラー・ストラナ: プラハ城の麓のバロック",
          body:
            "マラー・ストラナ（小地区）はプラハ城とカレル橋の間に広がるバロック建築の地区です。狭い石畳の路地、ヴァレンシュタイン庭園の孔雀、レンノンの壁（ジョン・レノンを偲ぶグラフィティの壁）、ネルドヴァ通りの紋章入りの建物が見どころです。カレル橋を渡って城へ向かう途中のエリアですが、路地に入ると観光客の密度が一気に下がります。\n\n" +
            "「プラハ・マラー・ストラナ散策」で城の麓の詳細ルートを紹介しています。",
        },
        {
          heading: "ヴィノフラディ & ヨゼフォフ: 住宅街とユダヤ人街",
          body:
            "ヴィノフラディはプラハの中心から地下鉄で2駅の閑静な住宅街で、アール・ヌーヴォーの建物が並ぶ広い通りにカフェやワインバーが点在しています。ナーメスティー・ミール（平和の広場）のネオゴシック教会が地区の象徴です。ヨゼフォフは旧市街の北側に位置するユダヤ人地区で、15世紀の旧ユダヤ人墓地、6つのシナゴーグ、ユダヤ博物館があります。\n\n" +
            "「ヴィノフラディ散策」と「ヨゼフォフ散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "プラハ街歩きの実用情報",
          body:
            "プラハのトラムや地下鉄はPIDアプリでチケットを購入できます。レストランやカフェではカード決済が一般的ですが、一部のビアホールでは現金が必要です。チェコ・コルナが通貨ですが、観光地ではユーロが使える店もあります（レートは不利）。石畳が多いので歩きやすい靴が必須です。eSIMがあればトラムの路線検索やレストランの予約がスムーズです。\n\n" +
            "3つのエリアは1日で回れます。午前にマラー・ストラナ、午後にヨゼフォフ、夕方にヴィノフラディのカフェで休憩する組み合わせがおすすめです。",
        },
      ],
      [
        { q: "プラハの街歩きで初心者におすすめのエリアは？", a: "マラー・ストラナが最も歩きやすいです。カレル橋から自然に入れるので、プラハ城見学の延長で散策できます。" },
        { q: "プラハは英語が通じますか？", a: "観光地やカフェ、レストランでは英語が十分通じます。ヴィノフラディなど住宅街でも若い世代は英語を話します。" },
        { q: "プラハの物価はどうですか？", a: "西ヨーロッパに比べてかなり手頃です。カフェのコーヒーは100〜150チェコ・コルナ（約600〜900円）、レストランのランチは200〜400チェコ・コルナ（約1200〜2400円）が目安です。" },
      ],
    ),
    en: en(CZ_EN_CTA,
      "Prague Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Prague's best neighbourhood walks: Mala Strana's baroque lanes, Vinohrady's Art Nouveau streets, and Josefov's Jewish heritage. Three routes beyond the Old Town Square.",
      PRAGUE_HUB_IMAGES[0],
      PRAGUE_HUB_IMAGES,
      PRAGUE_X,
      [
        {
          heading: "Prague walking shines outside the Old Town Square",
          body:
            "Prague Castle and the Charles Bridge are essential, but the best walking happens in the quieter districts. Mala Strana is the baroque quarter beneath the castle. Vinohrady is a residential neighbourhood of Art Nouveau facades two Metro stops from the centre. Josefov is the historic Jewish quarter with a 15th-century cemetery and six synagogues.\n\n" +
            "This page covers three Prague walking routes. After crossing Charles Bridge, come here for something quieter.",
        },
        {
          heading: "Mala Strana: baroque lanes below the castle",
          body:
            "Mala Strana spreads between Prague Castle and Charles Bridge with baroque architecture, narrow cobblestone lanes, the Wallenstein Garden's peacocks, the Lennon Wall, and Nerudova Street's heraldic house signs. Step into the side streets and tourist density drops sharply.\n\n" +
            "See the Prague Mala Strana walk for the full route below the castle.",
        },
        {
          heading: "Vinohrady and Josefov: residential calm and Jewish heritage",
          body:
            "Vinohrady is a quiet residential district two Metro stops from the centre with Art Nouveau buildings, wide avenues, and a growing cafe and wine-bar scene. The neo-Gothic Church of St Ludmila on Namesti Miru anchors the area. Josefov sits just north of the Old Town with the Old Jewish Cemetery, six synagogues, and the Jewish Museum.\n\n" +
            "See the Vinohrady walk and Josefov walk for individual routes.",
        },
        {
          heading: "Practical information for Prague walks",
          body:
            "Prague's trams and Metro use the PID app for tickets. Restaurants and cafes take cards widely, but some beer halls still need cash. The currency is Czech koruna — some tourist-area shops accept euros but at poor rates. Cobblestones are everywhere, so comfortable shoes are essential. An eSIM lets you check tram routes and book restaurants.\n\n" +
            "All three areas fit into one day. Walk Mala Strana in the morning, Josefov in the afternoon, and finish at a Vinohrady cafe in the evening.",
        },
      ],
      [
        { q: "Which Prague neighbourhood is best for a first walk?", a: "Mala Strana is the easiest starting point — you enter it naturally after crossing Charles Bridge." },
        { q: "Is English widely spoken in Prague?", a: "Yes. English is common in tourist areas, cafes, and restaurants. Younger Czechs in residential areas like Vinohrady also speak English." },
        { q: "How are prices in Prague?", a: "Significantly lower than Western Europe. Expect 100 to 150 CZK for cafe coffee and 200 to 400 CZK for a restaurant lunch." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. Vienna
  // ═══════════════════════════════════════════════════════════════
  "vienna-neighborhood-walks": {
    ja: ja(AT_JA_CTA,
      "ウィーンの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "ナッシュマルクト、シュピッテルベルク、レオポルトシュタットなどウィーンの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      VIENNA_HUB_IMAGES[0],
      VIENNA_HUB_IMAGES,
      VIENNA_X,
      [
        {
          heading: "ウィーンの街歩きは「リングの外側」で味わう",
          body:
            "シュテファン大聖堂やホーフブルク宮殿はリングシュトラーセの内側に集中していますが、ウィーンの街歩きの魅力はその外側に広がっています。ナッシュマルクトは1.5kmにわたる食の回廊、シュピッテルベルクはビーダーマイヤー様式の路地にクリスマスマーケットで有名な静かなエリア、レオポルトシュタットはプラーター公園と増加するカフェ文化で注目を集めるエリアです。\n\n" +
            "このページではウィーンの3つの街歩きルートをエリア別に紹介しています。宮殿と美術館の後に「もう少し日常のウィーンを歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "ナッシュマルクト: 1.5kmの食の回廊",
          body:
            "ナッシュマルクトはウィーン最大の屋外市場で、ヴィーンツァイレ沿いに1.5km以上にわたって食料品店、レストラン、カフェが並びます。オリーブ、チーズ、スパイス、新鮮な魚介類の店が国際色豊かに混在し、土曜日にはフリーマーケットも加わります。オットー・ワーグナー設計のアール・ヌーヴォー建築（マジョリカハウス）も必見です。\n\n" +
            "「ウィーン・ナッシュマルクト散策」で市場の歩き方を紹介しています。",
        },
        {
          heading: "シュピッテルベルク & レオポルトシュタット",
          body:
            "シュピッテルベルクはミュージアムクォーター裏手のビーダーマイヤー様式の路地で、小さなギャラリーやブティック、ワインバーが並びます。クリスマスシーズンのマーケットはウィーンで最も雰囲気があると言われています。レオポルトシュタットはドナウ運河の対岸に広がる2区で、プラーター公園の大観覧車で有名ですが、カルメリーターマルクト周辺のカフェ文化やストリートアートも増えています。\n\n" +
            "「シュピッテルベルク散策」と「レオポルトシュタット散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "ウィーン街歩きの実用情報",
          body:
            "ウィーンのUバーンやトラムはWiener Linienアプリでチケットを購入できます。カフェハウス文化が根付いており、Melange（メランジュ）を注文して長居するのが地元流です。レストランやカフェではカード決済が一般的ですが、市場のスタンドでは現金が必要な場合があります。eSIMがあればトラムの乗り換え検索やカフェの情報検索がスムーズです。\n\n" +
            "3つのエリアは1日で回れます。午前にナッシュマルクト、午後にシュピッテルベルク、夕方にレオポルトシュタットでカフェ休憩がおすすめです。",
        },
      ],
      [
        { q: "ウィーンの街歩きで初心者におすすめのエリアは？", a: "ナッシュマルクトが最も入りやすいです。Uバーン4号線ケッテンブリュッケンガッセ駅直結で、食べ歩きしながら自然に散策できます。" },
        { q: "ウィーンのカフェハウスのマナーは？", a: "水はコーヒーと一緒に自動的に出てきます。長居は歓迎されます。チップは合計の5〜10%が目安です。" },
        { q: "クリスマスマーケットの時期は？", a: "11月中旬〜12月下旬です。シュピッテルベルクのマーケットは特に雰囲気が良く人気があります。" },
      ],
    ),
    en: en(AT_EN_CTA,
      "Vienna Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Vienna's best neighbourhood walks: Naschmarkt's food corridor, Spittelberg's Biedermeier lanes, and Leopoldstadt's emerging cafe scene. Three routes beyond the Ring.",
      VIENNA_HUB_IMAGES[0],
      VIENNA_HUB_IMAGES,
      VIENNA_X,
      [
        {
          heading: "Vienna walking improves outside the Ring",
          body:
            "Stephansdom and the Hofburg sit inside the Ringstrasse, but Vienna's best walking territory spreads beyond it. The Naschmarkt stretches 1.5 km with international food stalls. Spittelberg's Biedermeier lanes host galleries, boutiques, and Vienna's best-loved Christmas market. Leopoldstadt, across the Danube Canal, is gaining attention for its cafe culture around Karmelitermarkt and the Prater park.\n\n" +
            "This page covers three Vienna walking routes. After the palaces and museums, come here for everyday Vienna.",
        },
        {
          heading: "Naschmarkt: the 1.5 km food corridor",
          body:
            "The Naschmarkt is Vienna's largest outdoor market, running over 1.5 km along Wienzeile with food shops, restaurants, and cafes. Olives, cheese, spices, and fresh seafood mix with international cuisines. A Saturday flea market extends the experience. Otto Wagner's Art Nouveau Majolikahaus stands directly above.\n\n" +
            "See the Vienna Naschmarkt walk for the full market route.",
        },
        {
          heading: "Spittelberg and Leopoldstadt",
          body:
            "Spittelberg sits behind the MuseumsQuartier with Biedermeier-era lanes lined with small galleries, boutiques, and wine bars. Its Christmas market is considered Vienna's most atmospheric. Leopoldstadt spreads across the Danube Canal in the 2nd district. The Prater park's giant Ferris wheel is the landmark, but the Karmelitermarkt cafe scene and growing street art are the walking draws.\n\n" +
            "See the Spittelberg walk and Leopoldstadt walk for individual routes.",
        },
        {
          heading: "Practical information for Vienna walks",
          body:
            "Vienna's U-Bahn and trams use the Wiener Linien app for tickets. Coffeehouse culture is central — order a Melange and stay as long as you like. Restaurants and cafes take cards, but market stalls may need cash. An eSIM lets you check tram connections and search cafe information.\n\n" +
            "All three areas fit into one day. Walk the Naschmarkt in the morning, Spittelberg in the afternoon, and Leopoldstadt for an evening cafe stop.",
        },
      ],
      [
        { q: "Which Vienna neighbourhood is best for a first walk?", a: "The Naschmarkt is the easiest entry — connected to the U4 at Kettenbruckengasse and walkable while eating." },
        { q: "What is Vienna coffeehouse etiquette?", a: "Water comes automatically with your coffee. Lingering is welcome. Tip 5 to 10 percent of the total." },
        { q: "When are the Christmas markets?", a: "Mid-November to late December. The Spittelberg market is considered the most atmospheric and is very popular." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. Copenhagen
  // ═══════════════════════════════════════════════════════════════
  "copenhagen-neighborhood-walks": {
    ja: ja(DK_JA_CTA,
      "コペンハーゲンの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "ノアブロ、クリスチャンハウン、ヴェスタブロなどコペンハーゲンの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      COPENHAGEN_HUB_IMAGES[0],
      COPENHAGEN_HUB_IMAGES,
      COPENHAGEN_X,
      [
        {
          heading: "コペンハーゲンの街歩きは「ストロイエの外」で楽しむ",
          body:
            "ストロイエやニューハウンだけがコペンハーゲンではありません。ノアブロは移民コミュニティとスカンジナビアンデザインが共存する多文化な通り、クリスチャンハウンは運河沿いの色鮮やかな家並みとフリータウン・クリスチャニアが独特の雰囲気を持ち、ヴェスタブロは旧精肉市場（ケドビエン）がレストランとバーの一大拠点に変貌したエリアです。\n\n" +
            "このページではコペンハーゲンの3つの街歩きルートをエリア別に紹介しています。チボリ公園とニューハウンの後に「もう少し地元のコペンハーゲンを歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "ノアブロ: 多文化と北欧デザインの交差点",
          body:
            "ノアブロはコペンハーゲンで最も多様性に富んだ地区です。ヤイルスビェヤガーデ通りのカフェ、アシスタンス墓地（公園としても利用されている歴史的墓地）、スーパーキーレン（デンマーク人アーティスト集団が手がけた都市型公園）が見どころです。コーヒー・コレクティブやグロッド（ポリッジ専門店）など、北欧のフードシーンを体験できます。\n\n" +
            "「コペンハーゲン・ノアブロ散策」で多文化な通りのルートを紹介しています。",
        },
        {
          heading: "クリスチャンハウン & ヴェスタブロ",
          body:
            "クリスチャンハウンは17世紀に建設された運河の街で、カラフルなタウンハウスとハウスボートが並びます。フリータウン・クリスチャニアは1971年に設立された自治コミュニティで、独自のルールで運営されています（写真撮影禁止エリアあり）。ヴェスタブロのケドビエン（旧精肉市場）は白い建物の中にレストラン、バー、ギャラリーが入居し、コペンハーゲンの食シーンの中心になっています。\n\n" +
            "「クリスチャンハウン散策」と「ヴェスタブロ散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "コペンハーゲン街歩きの実用情報",
          body:
            "コペンハーゲンのメトロやバスはRejsekortet（ICカード）またはDOTアプリで乗車できます。デンマークは世界で最もキャッシュレスが進んだ国のひとつで、ほぼすべての店でカード決済が可能です。自転車が非常に多いので、自転車レーンを歩かないよう注意してください。eSIMがあれば交通機関の乗り換え検索やレストランの予約がスムーズです。\n\n" +
            "3つのエリアはメトロと徒歩で1日で回れます。午前にノアブロ、午後にクリスチャンハウン、夕方にヴェスタブロのケドビエンでディナーがおすすめです。",
        },
      ],
      [
        { q: "コペンハーゲンの街歩きで初心者におすすめのエリアは？", a: "クリスチャンハウンが最も始めやすいです。メトロ駅から近く、運河沿いの景色が美しいです。" },
        { q: "コペンハーゲンの物価は高いですか？", a: "はい。北欧の中でも物価は高めです。カフェのコーヒーは50〜70DKK（約1000〜1500円）、レストランのランチは150〜250DKK（約3000〜5000円）が目安です。" },
        { q: "クリスチャニアは安全ですか？", a: "日中の訪問は一般的に安全ですが、写真撮影禁止エリアがあります。ルールを守って訪問してください。夜間の訪問は避けた方が安全です。" },
      ],
    ),
    en: en(DK_EN_CTA,
      "Copenhagen Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Copenhagen's best neighbourhood walks: Norrebro's multicultural streets, Christianshavn's canals, and Vesterbro's meatpacking district. Three routes beyond Stroget.",
      COPENHAGEN_HUB_IMAGES[0],
      COPENHAGEN_HUB_IMAGES,
      COPENHAGEN_X,
      [
        {
          heading: "Copenhagen walking gets interesting off Stroget",
          body:
            "Stroget and Nyhavn are not the whole picture. Norrebro mixes immigrant communities with Scandinavian design culture. Christianshavn's canals and colourful houses sit alongside the autonomous Freetown Christiania. Vesterbro's former meatpacking district (Kodbyen) has transformed into a restaurant and bar destination.\n\n" +
            "This page covers three Copenhagen walking routes. After Tivoli and Nyhavn, start here for something more local.",
        },
        {
          heading: "Norrebro: multiculture meets Nordic design",
          body:
            "Norrebro is Copenhagen's most diverse district. Jaegersborggade's cafes, Assistens Cemetery (a historic burial ground used as a park), and Superkilen (an urban park designed by a Danish art collective) are the highlights. Coffee Collective and Grod (a porridge shop) represent the Nordic food scene.\n\n" +
            "See the Copenhagen Norrebro walk for the multicultural route.",
        },
        {
          heading: "Christianshavn and Vesterbro",
          body:
            "Christianshavn was built as a canal district in the 17th century with colourful townhouses and houseboats. Freetown Christiania, established in 1971, operates under its own rules — photography is restricted in some areas. Vesterbro's Kodbyen (meatpacking district) fills white-tiled former slaughterhouse buildings with restaurants, bars, and galleries, anchoring Copenhagen's food scene.\n\n" +
            "See the Christianshavn walk and Vesterbro walk for individual routes.",
        },
        {
          heading: "Practical information for Copenhagen walks",
          body:
            "Copenhagen's Metro and buses accept Rejsekort or the DOT app. Denmark is one of the most cashless countries in the world — nearly every shop takes cards. Cycling is extremely popular, so stay off bike lanes. An eSIM lets you check transit connections and book restaurants.\n\n" +
            "All three areas fit into one day by Metro and foot. Norrebro in the morning, Christianshavn in the afternoon, and Vesterbro's Kodbyen for dinner.",
        },
      ],
      [
        { q: "Which Copenhagen neighbourhood is best for a first walk?", a: "Christianshavn is the easiest start — close to a Metro station and beautiful canal views." },
        { q: "Is Copenhagen expensive?", a: "Yes. Expect 50 to 70 DKK for cafe coffee and 150 to 250 DKK for a restaurant lunch." },
        { q: "Is Christiania safe to visit?", a: "Daytime visits are generally safe but photography is restricted in some areas. Follow the posted rules. Avoid visiting at night." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. Edinburgh
  // ═══════════════════════════════════════════════════════════════
  "edinburgh-neighborhood-walks": {
    ja: ja(UK_JA_CTA,
      "エディンバラの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "オールドタウンの路地裏、ストックブリッジ、リースなどエディンバラの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      EDINBURGH_HUB_IMAGES[0],
      EDINBURGH_HUB_IMAGES,
      EDINBURGH_X,
      [
        {
          heading: "エディンバラの街歩きは「ロイヤルマイルの脇道」で始まる",
          body:
            "エディンバラ城からロイヤルマイルを歩くのは定番ですが、本当に面白いのはロイヤルマイルから分岐する狭い路地（クローズ）です。オールドタウンのクローズには何世紀もの歴史が凝縮されています。ストックブリッジはウォーター・オブ・リース沿いの村の雰囲気を残すエリア、リースは港町から美食の街へと変貌を遂げたウォーターフロントです。\n\n" +
            "このページではエディンバラの3つの街歩きルートをエリア別に紹介しています。城とロイヤルマイルの後に「もう少し深いエディンバラを歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "オールドタウンのクローズ: 路地に隠れた歴史",
          body:
            "エディンバラのオールドタウンはロイヤルマイルを中心軸に、両側に無数のクローズ（狭い路地）が枝分かれしています。メアリー・キングス・クローズ（地下に埋もれた17世紀の通り）、ホワイトホース・クローズ、アドボケーツ・クローズなど、それぞれが異なる時代の記憶を持っています。グラスマーケットは公開処刑場だった歴史を持つ広場で、現在はパブとレストランが並んでいます。\n\n" +
            "「エディンバラ・オールドタウンのクローズ散策」で路地裏のルートを紹介しています。",
        },
        {
          heading: "ストックブリッジ & リース",
          body:
            "ストックブリッジはエディンバラの中心から徒歩15分の村のような地区です。ウォーター・オブ・リース沿いの散歩道、日曜のストックブリッジ・マーケット、独立系の本屋やカフェが魅力です。リースはエディンバラ北部の港町で、かつては荒れた地域でしたが、ミシュラン星付きレストランや個性的なバーが集まる美食の街に変貌しました。ロイヤル・ヨット・ブリタニア号も停泊しています。\n\n" +
            "「ストックブリッジ散策」と「リース散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "エディンバラ街歩きの実用情報",
          body:
            "エディンバラのバスはLothian Busesアプリで運賃を支払えます。カフェやレストランではカード決済が一般的です。オールドタウンは石畳と坂道が多いので歩きやすい靴が必須。天候は年間を通じて変わりやすく、夏でもジャケットがあると安心です。8月のエディンバラ・フェスティバルシーズンは街全体が活気づきますが、宿泊費が高騰します。eSIMがあればバスの時刻表検索やフェスティバルの情報確認がスムーズです。\n\n" +
            "3つのエリアは1日で回れます。午前にオールドタウンのクローズ、午後にストックブリッジを歩き、夕方にリースでディナーがおすすめです。",
        },
      ],
      [
        { q: "エディンバラの街歩きで初心者におすすめのエリアは？", a: "オールドタウンのクローズが最も始めやすいです。ロイヤルマイルから自然に入れるので、城見学の延長で散策できます。" },
        { q: "エディンバラフェスティバル中に街歩きできますか？", a: "はい。8月のフェスティバルシーズンは街全体がステージになり、路上パフォーマンスも楽しめます。ただし宿泊費は通常の2〜3倍になります。" },
        { q: "リースへのアクセスは？", a: "中心部からバス（11番、22番、35番など）で約20分です。トラムのリース延伸も開通しており、ヨーク・プレイスから乗車できます。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "Edinburgh Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Edinburgh's best neighbourhood walks: Old Town closes, Stockbridge village, and Leith's waterfront dining. Three routes beyond the Royal Mile.",
      EDINBURGH_HUB_IMAGES[0],
      EDINBURGH_HUB_IMAGES,
      EDINBURGH_X,
      [
        {
          heading: "Edinburgh walking starts in the side alleys",
          body:
            "Walking the Royal Mile from Edinburgh Castle is the standard route, but the real interest is in the narrow closes that branch off it. The Old Town's closes pack centuries of history into a few metres. Stockbridge keeps a village feel along the Water of Leith. Leith has reinvented itself from a rough port into Edinburgh's dining destination.\n\n" +
            "This page covers three Edinburgh walking routes. After the Castle and the Royal Mile, come here for something deeper.",
        },
        {
          heading: "Old Town closes: history hidden in the lanes",
          body:
            "Edinburgh's Old Town uses the Royal Mile as its spine with countless closes branching off both sides. Mary King's Close (a buried 17th-century street), White Horse Close, and Advocates Close each carry different eras. The Grassmarket was once a public execution site and is now lined with pubs and restaurants.\n\n" +
            "See the Edinburgh Old Town closes walk for the lane-by-lane route.",
        },
        {
          heading: "Stockbridge and Leith",
          body:
            "Stockbridge is a village-like district 15 minutes' walk from the centre. The Water of Leith walkway, the Sunday Stockbridge Market, and independent bookshops and cafes define the area. Leith is Edinburgh's port district, once rough, now home to Michelin-starred restaurants and character bars. The Royal Yacht Britannia is moored at Ocean Terminal.\n\n" +
            "See the Stockbridge walk and Leith walk for individual routes.",
        },
        {
          heading: "Practical information for Edinburgh walks",
          body:
            "Edinburgh's buses accept the Lothian Buses app. Cafes and restaurants take cards widely. The Old Town is cobbled and hilly — comfortable shoes are essential. Weather changes rapidly year-round; carry a jacket even in summer. The August Edinburgh Festival season energises the whole city but accommodation prices double or triple. An eSIM lets you check bus timetables and festival listings.\n\n" +
            "All three areas fit into one day. Walk the Old Town closes in the morning, Stockbridge in the afternoon, and head to Leith for dinner.",
        },
      ],
      [
        { q: "Which Edinburgh neighbourhood is best for a first walk?", a: "The Old Town closes are the easiest starting point — they branch naturally off the Royal Mile after a castle visit." },
        { q: "Can I walk during the Edinburgh Festival?", a: "Yes. In August the whole city becomes a stage with street performances everywhere. But accommodation costs 2 to 3 times the normal rate." },
        { q: "How do I get to Leith?", a: "Buses 11, 22, and 35 take about 20 minutes from the centre. The tram extension to Leith is now open from York Place." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. Madrid
  // ═══════════════════════════════════════════════════════════════
  "madrid-neighborhood-walks": {
    ja: ja(ES_JA_CTA,
      "マドリードの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "ラ・ラティーナ、マラサーニャ、レティーロ公園などマドリードの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      MADRID_HUB_IMAGES[0],
      MADRID_HUB_IMAGES,
      MADRID_X,
      [
        {
          heading: "マドリードの街歩きは「グランビアの裏側」にある",
          body:
            "プラド美術館とグランビアだけがマドリードではありません。ラ・ラティーナはカバ・バハ通りを中心としたタパスバーの密集地で日曜のラストロ蚤の市が有名、マラサーニャはドス・デ・マヨ広場を中心としたオルタナティブカルチャーの街、レティーロ公園はクリスタル・パレス（ガラスの宮殿）で無料の現代アート展示が楽しめる広大な都市公園です。\n\n" +
            "このページではマドリードの3つの街歩きルートをエリア別に紹介しています。美術館巡りの合間に「マドリードの日常を歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "ラ・ラティーナ: タパスとラストロ蚤の市",
          body:
            "ラ・ラティーナはマドリードで最もタパスバーが密集するエリアです。カバ・バハ通りとカバ・アルタ通りに沿って伝統的なバルが並び、日曜午前中にはマドリード最大のラストロ蚤の市が開催されます。サン・フランシスコ・エル・グランデ聖堂のドームはマドリードで最大です。ラ・ラティーナ駅から地上に出ると市場の喧騒の中に直接入れます。\n\n" +
            "「マドリード・ラ・ラティーナ散策」でタパスと蚤の市のルートを紹介しています。",
        },
        {
          heading: "マラサーニャ & レティーロ公園",
          body:
            "マラサーニャはフランコ政権後の自由化運動（ラ・モビーダ）の中心地だったエリアで、現在もヴィンテージショップ、レコード店、独立系カフェが集まるオルタナティブな雰囲気を保っています。ドス・デ・マヨ広場のテラスカフェが地区の中心です。レティーロ公園は125ヘクタールの都市公園で、クリスタル・パレスの無料現代アート展示、池のボート遊び、バラ園が見どころです。\n\n" +
            "「マラサーニャ散策」と「レティーロ公園散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "マドリード街歩きの実用情報",
          body:
            "マドリードのメトロはMultiカード（チャージ式）で乗車できます。タパスバーやレストランではカード決済が一般的ですが、小さなバルでは現金が必要な場合もあります。スペインの食事時間は遅く、昼食は14時〜16時、夕食は21時以降が一般的です。タパスバーは13時頃から賑わい始めます。eSIMがあればメトロの路線検索やレストランの予約がスムーズです。\n\n" +
            "3つのエリアは1日で回れます。午前にレティーロ公園を散歩、昼にラ・ラティーナでタパス、午後にマラサーニャでカフェとショッピングの組み合わせがおすすめです。",
        },
      ],
      [
        { q: "マドリードの街歩きで初心者におすすめのエリアは？", a: "ラ・ラティーナが最も入りやすいです。メトロ直結で、タパスバーが密集しているので食べ歩きしながら自然に散策できます。" },
        { q: "ラストロ蚤の市はいつ開催されますか？", a: "毎週日曜と祝日の午前中です。9時〜15時頃まで開催されますが、早い時間の方が歩きやすいです。" },
        { q: "マドリードの食事時間は遅いですか？", a: "はい。昼食は14時〜16時、夕食は21時以降が一般的です。タパスバーは13時頃から賑わい始めるので、日本の感覚より2〜3時間遅いと思ってください。" },
      ],
    ),
    en: en(ES_EN_CTA,
      "Madrid Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Madrid's best neighbourhood walks: La Latina's tapas bars, Malasana's alternative scene, and Retiro Park's Crystal Palace. Three routes beyond Gran Via.",
      MADRID_HUB_IMAGES[0],
      MADRID_HUB_IMAGES,
      MADRID_X,
      [
        {
          heading: "Madrid walking happens behind Gran Via",
          body:
            "The Prado and Gran Via are not the whole city. La Latina packs tapas bars along Cava Baja and hosts Madrid's biggest flea market on Sundays. Malasana centres on Plaza del Dos de Mayo with vintage shops, record stores, and independent cafes. Retiro Park spreads 125 hectares with the Crystal Palace hosting free contemporary art exhibitions.\n\n" +
            "This page covers three Madrid walking routes. When you want a break from the museums, start here.",
        },
        {
          heading: "La Latina: tapas and the Rastro flea market",
          body:
            "La Latina has Madrid's densest concentration of tapas bars. Cava Baja and Cava Alta line up traditional bars, and the Sunday Rastro flea market fills the surrounding streets. The dome of San Francisco el Grande is Madrid's largest. Exit La Latina Metro station and you are immediately in the market crowds.\n\n" +
            "See the Madrid La Latina walk for the tapas and flea-market route.",
        },
        {
          heading: "Malasana and Retiro Park",
          body:
            "Malasana was the centre of La Movida, the post-Franco cultural explosion, and still keeps its alternative identity with vintage shops, record stores, and independent cafes. Plaza del Dos de Mayo's terrace cafes anchor the district. Retiro Park covers 125 hectares with the Crystal Palace's free contemporary art shows, boating on the lake, and a rose garden.\n\n" +
            "See the Malasana walk and Retiro Park walk for individual routes.",
        },
        {
          heading: "Practical information for Madrid walks",
          body:
            "Madrid's Metro uses rechargeable Multi cards. Tapas bars and restaurants take cards widely, but small bars may still need cash. Spanish mealtimes are late: lunch runs 14:00 to 16:00 and dinner starts after 21:00. Tapas bars start filling around 13:00. An eSIM lets you check Metro routes and book restaurants.\n\n" +
            "All three areas fit into one day. Walk Retiro Park in the morning, tapas at La Latina for lunch, and Malasana for afternoon cafes and shopping.",
        },
      ],
      [
        { q: "Which Madrid neighbourhood is best for a first walk?", a: "La Latina is the easiest entry — connected by Metro and walkable while eating tapas." },
        { q: "When is the Rastro flea market?", a: "Every Sunday and public holiday morning, roughly 09:00 to 15:00. Earlier is less crowded." },
        { q: "Are Spanish mealtimes really that late?", a: "Yes. Lunch is 14:00 to 16:00 and dinner starts after 21:00. Tapas bars begin filling from 13:00." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. Budapest
  // ═══════════════════════════════════════════════════════════════
  "budapest-neighborhood-walks": {
    ja: ja(HU_JA_CTA,
      "ブダペストの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "廃墟バー地区、ブダ城地区、中央市場ホールなどブダペストの個性的な街歩きルートをエリア別にまとめた総合ガイドです。",
      BUDAPEST_HUB_IMAGES[0],
      BUDAPEST_HUB_IMAGES,
      BUDAPEST_X,
      [
        {
          heading: "ブダペストの街歩きは「ドナウの両岸」で組み立てる",
          body:
            "ブダペストはドナウ川を挟んでブダ（丘側）とペスト（平地側）に分かれ、それぞれが異なる個性を持っています。ペスト側の旧ユダヤ人街には廃墟バー（ロムコチマ）文化が花開き、ブダ側の城地区はドナウ川とペスト側を一望する展望台が魅力です。中央市場ホール（ナジバーシャールチャルノク）はハンガリー料理の食材が集まる巨大な屋内市場です。\n\n" +
            "このページではブダペストの3つの街歩きルートをエリア別に紹介しています。温泉巡りの合間に「ブダペストの街を歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "廃墟バー地区: 旧ユダヤ人街のクリエイティブ再生",
          body:
            "ブダペストの廃墟バー（ロムコチマ）は、旧ユダヤ人街の廃墟になった建物をバーやイベントスペースに再利用した独自のカルチャーです。シンプラ・ケルトはその先駆者で、旧工場の中庭にアート、家具、植物が無造作に配置された空間が広がります。カジンツィ通り周辺にはシナゴーグ、ストリートアート、カフェが混在し、昼間の散策にも向いています。\n\n" +
            "「ブダペスト・廃墟バー地区散策」で旧ユダヤ人街のルートを紹介しています。",
        },
        {
          heading: "ブダ城地区 & 中央市場ホール",
          body:
            "ブダ城地区は丘の上にある歴史地区で、漁夫の砦からドナウ川と国会議事堂の絶景が楽しめます。マーチャーシュ教会のカラフルなタイル屋根、王宮のハンガリー国立美術館、城壁沿いの散歩道が見どころです。ケーブルカーまたは階段でアクセスできます。中央市場ホールは1897年に建てられたネオゴシック様式の巨大屋内市場で、1階は肉・野菜・スパイス、2階はハンガリー料理のフードコートになっています。\n\n" +
            "「ブダ城地区散策」と「中央市場ホール散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "ブダペスト街歩きの実用情報",
          body:
            "ブダペストのメトロやトラムはBKKアプリでチケットを購入できます。フォリント（HUF）が通貨で、カフェやレストランではカード決済が増えていますが、市場のスタンドでは現金が必要です。両替は空港より市内の両替所（váltóの看板がある店）が有利です。温泉（セーチェーニ、ゲッレールト）と街歩きを組み合わせるのがブダペストの定番プランです。eSIMがあればトラムの路線検索やレストランの予約がスムーズです。\n\n" +
            "3つのエリアは1日で回れます。午前にブダ城地区、昼に中央市場ホールでランチ、午後に廃墟バー地区を散策がおすすめです。",
        },
      ],
      [
        { q: "ブダペストの街歩きで初心者におすすめのエリアは？", a: "中央市場ホールが最も入りやすいです。メトロ4号線フェーヴァーム広場駅直結で、食べ歩きしながら自然にハンガリー文化を体験できます。" },
        { q: "廃墟バーは昼間も楽しめますか？", a: "はい。シンプラ・ケルトは昼間もカフェとして営業しており、建物自体がアート空間なので散策だけでも十分楽しめます。日曜午前にはファーマーズマーケットも開催されます。" },
        { q: "ブダペストの物価はどうですか？", a: "西ヨーロッパに比べてかなり手頃です。カフェのコーヒーは600〜1000HUF（約250〜400円）、レストランのランチは3000〜5000HUF（約1200〜2000円）が目安です。" },
      ],
    ),
    en: en(HU_EN_CTA,
      "Budapest Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Budapest's best neighbourhood walks: the ruin bar district, Castle District panoramas, and the Great Market Hall. Three routes on both sides of the Danube.",
      BUDAPEST_HUB_IMAGES[0],
      BUDAPEST_HUB_IMAGES,
      BUDAPEST_X,
      [
        {
          heading: "Budapest walking spans both sides of the Danube",
          body:
            "Budapest divides into Buda (the hilly bank) and Pest (the flat bank), each with distinct character. The former Jewish quarter on the Pest side gave birth to the ruin bar (romkocsma) scene. The Castle District on the Buda side offers panoramic views across the Danube to the Parliament. The Great Market Hall (Nagyvasarcsarnok) is a vast indoor market packed with Hungarian food.\n\n" +
            "This page covers three Budapest walking routes. Between thermal bath visits, come here to explore the city on foot.",
        },
        {
          heading: "Ruin bar district: creative rebirth in the Jewish quarter",
          body:
            "Budapest's ruin bars repurpose abandoned buildings in the former Jewish quarter as bars and event spaces. Szimpla Kert pioneered the concept in a former factory with art, mismatched furniture, and plants filling the courtyard. Kazinczy Street mixes synagogues, street art, and cafes, making the area worth exploring by day as well as night.\n\n" +
            "See the Budapest ruin bars walk for the Jewish quarter route.",
        },
        {
          heading: "Castle District and Great Market Hall",
          body:
            "The Castle District sits on a hilltop with views from the Fisherman's Bastion across the Danube to Parliament. Matthias Church's colourful tile roof, the Hungarian National Gallery in the Royal Palace, and the castle wall promenade are highlights. Access by funicular or on foot. The Great Market Hall was built in 1897 in neo-Gothic style — ground floor for meat, vegetables, and spices, upper floor for a Hungarian food court.\n\n" +
            "See the Castle District walk and Great Market Hall walk for individual routes.",
        },
        {
          heading: "Practical information for Budapest walks",
          body:
            "Budapest's Metro and trams use the BKK app for tickets. The currency is Hungarian forint (HUF). Card payment is growing in cafes and restaurants, but market stalls need cash. Exchange rates are better at city-centre exchange offices (look for valto signs) than at the airport. Combining thermal baths (Szechenyi, Gellert) with walking is the classic Budapest plan. An eSIM lets you check tram routes and book restaurants.\n\n" +
            "All three areas fit into one day. Castle District in the morning, Great Market Hall for lunch, and ruin bar district in the afternoon.",
        },
      ],
      [
        { q: "Which Budapest neighbourhood is best for a first walk?", a: "The Great Market Hall is the easiest entry — connected to Metro line 4 at Fovam ter and walkable while sampling Hungarian food." },
        { q: "Are ruin bars worth visiting during the day?", a: "Yes. Szimpla Kert operates as a cafe by day and the building itself is an art space. A Sunday morning farmers market is also held there." },
        { q: "How are prices in Budapest?", a: "Significantly lower than Western Europe. Expect 600 to 1000 HUF for cafe coffee and 3000 to 5000 HUF for a restaurant lunch." },
      ],
    ),
  },
};

export const HUBS_EUROPE_SLUGS = Object.keys(HUBS_EUROPE_CONTENT);
