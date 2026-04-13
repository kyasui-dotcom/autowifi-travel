import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

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

// ─── CTA constants ────────────────────────────────────────────────

const US_JA_CTA = {
  ctaTitle: "アメリカ旅行の通信をもっと楽に",
  ctaButton: "アメリカのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const US_EN_CTA = {
  ctaTitle: "Stay connected in the US",
  ctaButton: "View USA eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const CA_JA_CTA = {
  ctaTitle: "カナダ旅行の通信をもっと楽に",
  ctaButton: "カナダのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const CA_EN_CTA = {
  ctaTitle: "Stay connected in Canada",
  ctaButton: "View Canada eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const AR_JA_CTA = {
  ctaTitle: "アルゼンチン旅行の通信をもっと楽に",
  ctaButton: "アルゼンチンのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const AR_EN_CTA = {
  ctaTitle: "Stay connected in Argentina",
  ctaButton: "View Argentina eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const PE_JA_CTA = {
  ctaTitle: "ペルー旅行の通信をもっと楽に",
  ctaButton: "ペルーのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const PE_EN_CTA = {
  ctaTitle: "Stay connected in Peru",
  ctaButton: "View Peru eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const AU_JA_CTA = {
  ctaTitle: "オーストラリア旅行の通信をもっと楽に",
  ctaButton: "オーストラリアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const AU_EN_CTA = {
  ctaTitle: "Stay connected in Australia",
  ctaButton: "View Australia eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const NZ_JA_CTA = {
  ctaTitle: "ニュージーランド旅行の通信をもっと楽に",
  ctaButton: "ニュージーランドのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const NZ_EN_CTA = {
  ctaTitle: "Stay connected in New Zealand",
  ctaButton: "View New Zealand eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const ZA_JA_CTA = {
  ctaTitle: "南アフリカ旅行の通信をもっと楽に",
  ctaButton: "南アフリカのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const ZA_EN_CTA = {
  ctaTitle: "Stay connected in South Africa",
  ctaButton: "View South Africa eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const AE_JA_CTA = {
  ctaTitle: "UAE旅行の通信をもっと楽に",
  ctaButton: "UAEのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const AE_EN_CTA = {
  ctaTitle: "Stay connected in the UAE",
  ctaButton: "View UAE eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const HI_JA_CTA = {
  ctaTitle: "ハワイ旅行の通信をもっと楽に",
  ctaButton: "アメリカのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const HI_EN_CTA = {
  ctaTitle: "Stay connected in Hawaii",
  ctaButton: "View USA eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Helper builders ──────────────────────────────────────────────

function ja(
  cta: typeof US_JA_CTA,
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
  cta: typeof US_EN_CTA,
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
      "These embeds are chosen per article so the references stay tied to the neighbourhood the guide is actually about.",
    xEmbeds,
    sections,
    faq,
    ...cta,
  };
}

// ─── X Embeds ─────────────────────────────────────────────────────

const NYC_X: GuideXEmbed[] = [
  { url: "https://x.com/naborhoodsnyc", label: "@naborhoodsnyc" },
  { url: "https://x.com/NYCgo", label: "@NYCgo" },
];
const LA_X: GuideXEmbed[] = [
  { url: "https://x.com/discoverLA", label: "@discoverLA" },
  { url: "https://x.com/LATimesFood", label: "@LATimesFood" },
];
const SF_X: GuideXEmbed[] = [
  { url: "https://x.com/SFTravelTips", label: "@SFTravelTips" },
  { url: "https://x.com/sfaborist", label: "@sfaborist" },
];
const CHICAGO_X: GuideXEmbed[] = [
  { url: "https://x.com/ChooseChicago", label: "@ChooseChicago" },
  { url: "https://x.com/ChicagoEater", label: "@ChicagoEater" },
];
const PORTLAND_X: GuideXEmbed[] = [
  { url: "https://x.com/TravelPortland", label: "@TravelPortland" },
  { url: "https://x.com/pdaborist", label: "@pdaborist" },
];
const BOSTON_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitBoston", label: "@VisitBoston" },
  { url: "https://x.com/BostonGlobe", label: "@BostonGlobe" },
];
const SEATTLE_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitSeattle", label: "@VisitSeattle" },
  { url: "https://x.com/SeattleTimes", label: "@SeattleTimes" },
];
const MONTREAL_X: GuideXEmbed[] = [
  { url: "https://x.com/Montreal", label: "@Montreal" },
  { url: "https://x.com/MTaborisme", label: "@MTaborisme" },
];
const BUENOS_AIRES_X: GuideXEmbed[] = [
  { url: "https://x.com/BuenosAires", label: "@BuenosAires" },
  { url: "https://x.com/BAturismo", label: "@BAturismo" },
];
const LIMA_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitPeru", label: "@VisitPeru" },
  { url: "https://x.com/LimaCity", label: "@LimaCity" },
];
const MELBOURNE_X: GuideXEmbed[] = [
  { url: "https://x.com/visitmelbourne", label: "@visitmelbourne" },
  { url: "https://x.com/TheAgeVictoria", label: "@TheAgeVictoria" },
];
const SYDNEY_X: GuideXEmbed[] = [
  { url: "https://x.com/sydney", label: "@sydney" },
  { url: "https://x.com/TimeOutSydney", label: "@TimeOutSydney" },
];
const CAPE_TOWN_X: GuideXEmbed[] = [
  { url: "https://x.com/CapeTownTourism", label: "@CapeTownTourism" },
  { url: "https://x.com/LoveCapeTown", label: "@LoveCapeTown" },
];
const DUBAI_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitDubai", label: "@VisitDubai" },
  { url: "https://x.com/DubaiTourism", label: "@DubaiTourism" },
];
const HONOLULU_X: GuideXEmbed[] = [
  { url: "https://x.com/gaborawaii", label: "@gaborawaii" },
  { url: "https://x.com/HawaiiTourismJP", label: "@HawaiiTourismJP" },
];
const TORONTO_X: GuideXEmbed[] = [
  { url: "https://x.com/SeeTorontoNow", label: "@SeeTorontoNow" },
  { url: "https://x.com/BlogTO", label: "@BlogTO" },
];
const CUSCO_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitPeru", label: "@VisitPeru" },
  { url: "https://x.com/CuscoPeru", label: "@CuscoPeru" },
];
const AUCKLAND_X: GuideXEmbed[] = [
  { url: "https://x.com/AucklandNZ", label: "@AucklandNZ" },
  { url: "https://x.com/PureNewZealand", label: "@PureNewZealand" },
];

// ═══════════════════════════════════════════════════════════════════
// Hub articles — Americas, Oceania, Middle East, Africa
// ═══════════════════════════════════════════════════════════════════

export const HUBS_AMERICAS_OTHERS_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ─── 1. NYC ─────────────────────────────────────────────────────
  "nyc-neighborhood-walks": {
    ja: ja(US_JA_CTA,
      "ニューヨークの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "ロウアーイーストサイド、ウィリアムズバーグ、ハイライン、DUMBOなどニューヨークの街歩きルートをエリア別にまとめた総合ガイドです。",
      img("File:NYC wbread Manhattan skyline.jpg", 1280, 854, "マンハッタンのスカイライン", "多様なエリアが広がるニューヨーク"),
      [
        img("File:Orchard Street NYC.jpg", 1280, 854, "ロウアーイーストサイド", "移民文化とアートが交差するエリア"),
        img("File:Williamsburg Brooklyn New York.jpg", 1280, 854, "ウィリアムズバーグ", "ブルックリンのクリエイティブ地区"),
        img("File:High Line 20th Street looking downtown.jpg", 1280, 854, "ハイライン", "空中公園からの眺望"),
      ],
      NYC_X,
      [
        {
          heading: "ニューヨークの街歩きは「エリア選び」で決まる",
          body:
            "ニューヨークの魅力はタイムズスクエアやセントラルパークだけではありません。マンハッタンの南端からブルックリンまで、それぞれのエリアが独自の文化・食・アートシーンを持っています。ロウアーイーストサイドの移民文化とギャラリー、ウィリアムズバーグのクラフトビールとヴィンテージショップ、ハイラインの空中散歩、DUMBOのウォーターフロントなど、半日単位で切り取れるルートが無数にあります。\n\n" +
            "このページでは4つの街歩き記事をエリア別に整理しています。初めてのニューヨークでも、リピーターでも、目的に合ったルートが見つかります。",
        },
        {
          heading: "ロウアーイーストサイド: 移民文化とアートの交差点",
          body:
            "ロウアーイーストサイド（LES）は19世紀末からの移民の歴史が残るエリアで、近年はギャラリーやクラフトカクテルバーが急増しています。カッツデリのパストラミサンド、ニューミュージアムの現代アート、オーチャードストリートの小さなギャラリー群を半日で巡れます。地下鉄F線デランシーストリート駅が起点です。\n\n" +
            "「ロウアーイーストサイドのグルメとアート散策」で、エセックスマーケットからの効率的なルートを紹介しています。",
        },
        {
          heading: "ウィリアムズバーグ & ハイライン: ブルックリンとマンハッタン西側",
          body:
            "ウィリアムズバーグはブルックリン北部のウォーターフロント地区で、ベッドフォードアベニュー沿いのカフェや古着店、ドミノパークからのマンハッタンスカイラインが見どころです。週末のスモーガスバーグも人気。ハイラインはマンハッタン西側の廃線高架を再生した空中公園で、チェルシーマーケットやギャラリー街と組み合わせて歩けます。\n\n" +
            "「ウィリアムズバーグのブルックリン散歩」「ハイライン〜チェルシーマーケット散策」でそれぞれのルートを確認できます。",
        },
        {
          heading: "DUMBO & ブルックリンハイツ: 橋とウォーターフロント",
          body:
            "DUMBOはブルックリンブリッジの袂にある石畳のエリアで、マンハッタンブリッジを額縁のように切り取るワシントンストリートの写真スポットが有名です。ブルックリンハイツのプロムナードからはイーストリバー越しにロウアーマンハッタンのパノラマが広がります。\n\n" +
            "「DUMBO & ブルックリンハイツの街歩き」で、ブルックリンブリッジを渡ってからのルートを紹介しています。マンハッタン側のLES散策と組み合わせると1日プランが組めます。",
        },
        {
          heading: "エリアの組み合わせ方",
          body:
            "1日で2エリアが目安です。LES + DUMBOはウィリアムズバーグブリッジまたはマンハッタンブリッジで徒歩接続できます。ハイライン + ウィリアムズバーグはL線で移動。時間に余裕があれば3エリアも可能ですが、食事をゆっくり楽しむなら2エリアがおすすめです。\n\n" +
            "ニューヨークは地下鉄が24時間運行しているので、朝の静かな時間帯にひとつめのエリアを歩き、昼食後に移動して午後〜夕方に2つめのエリアを楽しむ流れが快適です。",
        },
      ],
      [
        { q: "ニューヨークの街歩きで初心者におすすめのエリアは?", a: "ハイライン〜チェルシーマーケットが最も歩きやすいです。一本道で迷いにくく、食事・アート・眺望がバランスよく揃っています。" },
        { q: "1日で何エリア回れますか?", a: "2エリアが快適です。食事込みで1エリア3〜4時間が目安なので、午前と午後で分けるのがおすすめです。" },
        { q: "治安が心配ですが大丈夫ですか?", a: "紹介しているエリアは日中であれば観光客も多く安全です。夜間は大通りを歩き、裏通りは避けましょう。" },
        { q: "ニューヨークの街歩きに最適な季節は?", a: "春（4〜5月）と秋（9〜10月）が気候・混雑ともに最適です。夏は暑く、冬は寒いですが、それぞれの季節ならではの風景もあります。" },
      ],
    ),
    en: en(US_EN_CTA,
      "New York City Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A comprehensive guide to NYC's best neighborhood walks: Lower East Side, Williamsburg, the High Line, and DUMBO. Four routes to match your pace and interests.",
      img("File:NYC wbread Manhattan skyline.jpg", 1280, 854, "Manhattan skyline", "New York's diverse neighbourhoods await"),
      [
        img("File:Orchard Street NYC.jpg", 1280, 854, "Lower East Side", "Immigrant heritage meets gallery culture"),
        img("File:Williamsburg Brooklyn New York.jpg", 1280, 854, "Williamsburg", "Brooklyn's creative waterfront"),
        img("File:High Line 20th Street looking downtown.jpg", 1280, 854, "The High Line", "Elevated park above the streets"),
      ],
      NYC_X,
      [
        {
          heading: "NYC walking is about choosing the right neighbourhood",
          body:
            "New York's appeal goes far beyond Times Square and Central Park. From the southern tip of Manhattan to deep Brooklyn, each neighbourhood has its own food scene, cultural identity, and visual character. The Lower East Side preserves immigrant history alongside cutting-edge galleries. Williamsburg offers craft beer, vintage shopping, and waterfront sunsets. The High Line delivers an elevated garden walk through Chelsea's art district. DUMBO frames the Manhattan Bridge in cobblestone streets.\n\n" +
            "This page organizes four walking guides by area so you can pick a half-day route that matches your interests, whether you are visiting New York for the first time or the tenth.",
        },
        {
          heading: "Lower East Side: immigrant heritage and gallery hopping",
          body:
            "The Lower East Side has been shaped by waves of immigration since the late 1800s and is now one of Manhattan's most exciting gallery districts. Katz's Deli pastrami, the New Museum's contemporary shows, and free galleries along Orchard Street fill a solid half day. Start at Delancey Street station on the F train.\n\n" +
            "The Lower East Side food and art walk covers the efficient route from Essex Market south through the gallery corridor.",
        },
        {
          heading: "Williamsburg and the High Line: Brooklyn waterfront and west Manhattan",
          body:
            "Williamsburg on Brooklyn's north shore lines Bedford Avenue with independent cafes, record shops, and vintage stores, while Domino Park delivers Manhattan skyline views. Weekend Smorgasburg draws food lovers from across the city. The High Line, on Manhattan's west side, converts a disused rail line into a 2.3-kilometre aerial garden connecting the Whitney Museum to Hudson Yards, with Chelsea Market and 200-plus galleries along the way.\n\n" +
            "See the Williamsburg Brooklyn walk and the High Line to Chelsea Market walk for full routes.",
        },
        {
          heading: "DUMBO and Brooklyn Heights: bridges and waterfront panoramas",
          body:
            "DUMBO sits under the Brooklyn Bridge on cobblestone streets, famous for the Washington Street photo spot that frames the Manhattan Bridge between brick warehouses. Brooklyn Heights Promenade offers an unbroken panorama of Lower Manhattan across the East River.\n\n" +
            "The DUMBO and Brooklyn Heights walk covers the route from Brooklyn Bridge onward. Combine it with the LES walk for a full-day Manhattan-to-Brooklyn loop.",
        },
        {
          heading: "How to combine areas",
          body:
            "Two areas per day is the sweet spot. LES and DUMBO connect on foot via the Manhattan or Williamsburg Bridge. The High Line and Williamsburg link via the L train. Three areas are possible with tight scheduling, but two leaves room for proper meals and browsing.\n\n" +
            "New York's subway runs around the clock, so start one area in the quiet morning hours, move after lunch, and enjoy the second area through the afternoon and into the evening.",
        },
      ],
      [
        { q: "Which NYC neighbourhood is best for a first walk?", a: "The High Line to Chelsea Market is the easiest starting point: a single path, hard to get lost, and a good mix of food, art, and views." },
        { q: "How many areas can I cover in one day?", a: "Two is comfortable. Each area takes three to four hours with a meal, so split between morning and afternoon." },
        { q: "Is safety a concern?", a: "All four areas are busy with tourists and locals during the day. At night, stick to main streets and well-lit blocks." },
        { q: "What is the best season for NYC walks?", a: "Spring (April-May) and autumn (September-October) offer the best weather and moderate crowds. Summer is hot, winter is cold, but each season has its own charm." },
      ],
    ),
  },

  // ─── 2. LA ──────────────────────────────────────────────────────
  "la-neighborhood-walks": {
    ja: ja(US_JA_CTA,
      "ロサンゼルスの街歩きガイド 2026 | 歩けるLAエリア別ルート",
      "ベニスビーチ、アーツディストリクト、シルバーレイクなど、車なしでも歩けるLAの街歩きルートをまとめた総合ガイドです。",
      img("File:Venice Beach, Los Angeles, CA 01.jpg", 1280, 854, "ベニスビーチ", "LAのビーチカルチャーを代表するエリア"),
      [
        img("File:Los Angeles Arts District.jpg", 1280, 854, "アーツディストリクト", "倉庫リノベのカフェとギャラリー"),
        img("File:Silver Lake Reservoir.jpg", 1280, 854, "シルバーレイク", "LAのインディーカルチャーの中心地"),
        img("File:Venice Canals Los Angeles.jpg", 1280, 854, "ベニス運河", "住宅地に残る水路"),
      ],
      LA_X,
      [
        {
          heading: "「歩けないLA」の中に歩けるエリアがある",
          body:
            "ロサンゼルスは車社会の代名詞ですが、実はコンパクトに歩けるエリアがいくつかあります。ベニスビーチのボードウォークとアボットキニー通り、ダウンタウンのアーツディストリクト、イーストサイドのシルバーレイクはいずれも徒歩で半日楽しめるエリアです。\n\n" +
            "このページでは3つの街歩きルートをエリア別に紹介しています。LAでの滞在中に「車を使わない半日」を組み込む参考にしてください。",
        },
        {
          heading: "ベニスビーチ: ボードウォークとアボットキニー",
          body:
            "ベニスビーチはLAのビーチカルチャーを凝縮したエリアです。ボードウォーク沿いのストリートパフォーマンスやマッスルビーチ、少し内陸に入ったベニス運河の静けさ、そしてアボットキニー通りのブティックやカフェが半日の散歩を充実させます。\n\n" +
            "「ベニスビーチの街歩き」で、ビーチからアボットキニーへの効率的なルートを紹介しています。",
        },
        {
          heading: "アーツディストリクト: 倉庫街がクリエイティブ地区に",
          body:
            "ダウンタウンLA東側のアーツディストリクトは、かつての倉庫や工場がカフェ、ギャラリー、ブルワリーに生まれ変わったエリアです。壁面のストリートアートが圧巻で、数ブロック歩くだけで巨大な壁画に何枚も出会えます。\n\n" +
            "「LAアーツディストリクトの散策」で、主要なカフェとギャラリーを効率よく回るルートを紹介しています。",
        },
        {
          heading: "シルバーレイク: LAのインディーカルチャー",
          body:
            "シルバーレイクはハリウッドの東に位置する丘陵地帯で、インディペンデントなカフェ、レコードショップ、ブティックが集まっています。サンセットジャンクション周辺がメインエリアで、シルバーレイク貯水池の周回散歩道では地元住民のジョギングやドッグウォーキングに混じって歩けます。\n\n" +
            "「シルバーレイクの街歩き」で、カフェ巡りと貯水池散歩を組み合わせたルートを紹介しています。",
        },
        {
          heading: "エリアの移動と組み合わせ",
          body:
            "ベニスビーチとアーツディストリクトはメトロEラインで接続でき、約40分です。シルバーレイクへはダウンタウンからUberで15分。1日で2エリアが現実的で、午前にビーチ、午後にアーツディストリクトの組み合わせが人気です。\n\n" +
            "LAの公共交通は東京やNYCほど便利ではありませんが、メトロとライドシェアを組み合わせれば車なしでもこれらのエリアは十分楽しめます。",
        },
      ],
      [
        { q: "LAは本当に歩けますか?", a: "紹介している3エリアはそれぞれ徒歩圏内にまとまっています。エリア間の移動にはメトロかUberを使いましょう。" },
        { q: "ベニスビーチの治安は?", a: "ボードウォーク沿いは日中安全です。夜間や人気のない裏通りは避けてください。" },
        { q: "アーツディストリクトは週末でも楽しめますか?", a: "はい。カフェやブルワリーは週末も営業しています。ギャラリーは木〜日曜がメインです。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Los Angeles Neighborhood Walks 2026 | Walkable LA Area Guide",
      "Walkable LA routes: Venice Beach boardwalk, downtown Arts District murals, and Silver Lake indie culture. Three half-day walks without a car.",
      img("File:Venice Beach, Los Angeles, CA 01.jpg", 1280, 854, "Venice Beach", "LA's iconic beach culture"),
      [
        img("File:Los Angeles Arts District.jpg", 1280, 854, "Arts District", "Warehouse-turned-cafe and gallery zone"),
        img("File:Silver Lake Reservoir.jpg", 1280, 854, "Silver Lake", "LA's indie culture hub"),
        img("File:Venice Canals Los Angeles.jpg", 1280, 854, "Venice Canals", "Quiet waterways in a beach town"),
      ],
      LA_X,
      [
        {
          heading: "Walkable pockets in car-centric LA",
          body:
            "Los Angeles is synonymous with driving, but several neighbourhoods are surprisingly walkable. Venice Beach's boardwalk and Abbot Kinney Boulevard, downtown's Arts District, and the eastside's Silver Lake each offer a solid half day on foot.\n\n" +
            "This page covers three walking routes by area. Use them to build a car-free half day into your LA stay.",
        },
        {
          heading: "Venice Beach: boardwalk and Abbot Kinney",
          body:
            "Venice Beach distills LA's beach culture into a single stretch — street performers on the boardwalk, Muscle Beach, the quiet Venice Canals a few blocks inland, and Abbot Kinney Boulevard's boutiques and cafes.\n\n" +
            "The Venice Beach walk covers the efficient route from the boardwalk to Abbot Kinney.",
        },
        {
          heading: "Arts District: warehouses turned creative hub",
          body:
            "East of downtown LA, the Arts District fills former warehouses and factories with specialty cafes, galleries, and breweries. Street art murals cover nearly every wall — a few blocks of walking delivers dozens of large-scale pieces.\n\n" +
            "The LA Arts District walk covers the best cafe-and-gallery loop.",
        },
        {
          heading: "Silver Lake: LA's indie culture",
          body:
            "Silver Lake occupies the hills east of Hollywood and clusters independent cafes, record shops, and boutiques around the Sunset Junction area. The Silver Lake Reservoir loop trail mixes with local joggers and dog walkers for a mellow neighbourhood stroll.\n\n" +
            "The Silver Lake walk combines cafe hopping with the reservoir loop.",
        },
        {
          heading: "Getting between areas",
          body:
            "Venice Beach and the Arts District connect via the Metro E Line in about forty minutes. Silver Lake is a fifteen-minute Uber from downtown. Two areas in a day is realistic — morning at the beach and afternoon in the Arts District is a popular combination.\n\n" +
            "LA's transit is less comprehensive than NYC or Tokyo, but Metro plus rideshare makes these three areas fully accessible without a car.",
        },
      ],
      [
        { q: "Can you really walk in LA?", a: "These three areas are each compact enough for walking. Use Metro or Uber to move between them." },
        { q: "Is Venice Beach safe?", a: "The boardwalk area is safe during the day. Avoid deserted side streets at night." },
        { q: "Is the Arts District open on weekends?", a: "Yes. Cafes and breweries operate on weekends. Galleries are mostly open Thursday through Sunday." },
      ],
    ),
  },

  // ─── 3. San Francisco ───────────────────────────────────────────
  "sf-neighborhood-walks": {
    ja: ja(US_JA_CTA,
      "サンフランシスコの街歩きガイド 2026 | ミッション&ノースビーチ",
      "ミッションディストリクトとノースビーチ、SFで最も歩いて楽しい2エリアの街歩きルートをまとめたガイドです。",
      img("File:Balmy Alley San Francisco.jpg", 1280, 854, "バルミーアレーの壁画", "ミッションのストリートアート"),
      [
        img("File:City Lights Bookstore.jpg", 1280, 854, "シティライツ書店", "ビート文学の聖地"),
        img("File:Dolores Park San Francisco.jpg", 1280, 854, "ドロレスパーク", "SFのスカイラインを望む公園"),
        img("File:North Beach San Francisco.jpg", 1280, 854, "ノースビーチ", "SFのリトルイタリー"),
      ],
      SF_X,
      [
        {
          heading: "サンフランシスコは坂と文化の街歩き",
          body:
            "サンフランシスコは起伏が激しい街ですが、ミッションディストリクトとノースビーチは比較的平坦で歩きやすいエリアです。ミッションはラテン系文化とストリートアートの宝庫で、ノースビーチはイタリア系移民の歴史とビート文学の聖地。どちらも個性が強く、半日ずつ歩くと全く異なるSFの表情に出会えます。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。",
        },
        {
          heading: "ミッションディストリクト: 壁画とブリトー",
          body:
            "ミッションはSFで最もカラフルなエリアです。バルミーアレーやクラリオンアレーの壁画群は圧巻で、24thストリート沿いにはタケリアやパナデリアが並びます。ドロレスパークからはダウンタウンのスカイラインを一望できます。BARTの24thストリート・ミッション駅が起点です。\n\n" +
            "「ミッションディストリクトの街歩き」で壁画とグルメを効率よく巡るルートを紹介しています。",
        },
        {
          heading: "ノースビーチ: ビート文学とイタリアンカフェ",
          body:
            "ノースビーチはSFのリトルイタリーで、コロンバスアベニュー沿いにイタリアンレストランやカフェが並びます。シティライツ書店はビート・ジェネレーションの拠点で、今も独立系書店として営業中。ワシントンスクエアパークを中心にのんびり歩けるエリアです。\n\n" +
            "「ノースビーチの街歩き」で、チャイナタウンからの接続ルートも含めて紹介しています。",
        },
        {
          heading: "2エリアの組み合わせ方",
          body:
            "ミッションとノースビーチはBARTと徒歩で30分ほど離れています。午前にミッション、午後にノースビーチという流れが自然です。フィッシャーマンズワーフからノースビーチは徒歩圏内なので、定番観光と組み合わせることもできます。\n\n" +
            "SFの気候は夏でも霧が出ると肌寒くなるので、重ね着を忘れずに。",
        },
      ],
      [
        { q: "サンフランシスコの坂道は大変ですか?", a: "ミッションとノースビーチは比較的平坦です。ただしノースビーチからテレグラフヒル方面に登ると急坂になります。" },
        { q: "ミッションの治安は?", a: "日中は観光客も多く安全です。夜間は16thストリート周辺を避け、24thストリート沿いを歩きましょう。" },
        { q: "SFの街歩きに最適な季節は?", a: "9〜10月が最も晴天が多く暖かいです。夏は霧が多く、意外と寒い日もあります。" },
      ],
    ),
    en: en(US_EN_CTA,
      "San Francisco Neighborhood Walks 2026 | Mission & North Beach",
      "Two of SF's most walkable areas: Mission District murals and burritos, North Beach Italian cafes and Beat-era bookshops. Half-day routes for each.",
      img("File:Balmy Alley San Francisco.jpg", 1280, 854, "Balmy Alley murals", "Mission District street art"),
      [
        img("File:City Lights Bookstore.jpg", 1280, 854, "City Lights Bookstore", "Beat Generation landmark"),
        img("File:Dolores Park San Francisco.jpg", 1280, 854, "Dolores Park", "Skyline views and sunshine"),
        img("File:North Beach San Francisco.jpg", 1280, 854, "North Beach", "SF's Little Italy"),
      ],
      SF_X,
      [
        {
          heading: "San Francisco walking works best in the flat pockets",
          body:
            "San Francisco is famously hilly, but the Mission District and North Beach are relatively flat and extremely walkable. The Mission is a feast of Latin culture and street art, while North Beach is the Italian-American heart of the city and birthplace of the Beat literary movement. A half day in each reveals two completely different faces of SF.\n\n" +
            "This page covers two walking routes.",
        },
        {
          heading: "Mission District: murals and burritos",
          body:
            "The Mission is SF's most colourful neighbourhood. Balmy Alley and Clarion Alley pack dozens of murals into narrow lanes. 24th Street is lined with taquerias and panaderias. Dolores Park crowns the area with downtown skyline views. Start at 24th Street Mission BART.\n\n" +
            "The Mission District walk covers the mural-and-food loop in detail.",
        },
        {
          heading: "North Beach: Beat literature and Italian cafes",
          body:
            "North Beach is SF's Little Italy, with Columbus Avenue lined with Italian restaurants and espresso bars. City Lights Bookstore, the Beat Generation's spiritual home, still operates as an independent bookshop. Washington Square Park anchors a relaxed walking area.\n\n" +
            "The North Beach walk includes a connection route from Chinatown.",
        },
        {
          heading: "Combining the two areas",
          body:
            "The Mission and North Beach are about thirty minutes apart by BART and walking. Morning in the Mission, afternoon in North Beach is the natural flow. North Beach is also within walking distance of Fisherman's Wharf, making it easy to pair with standard sightseeing.\n\n" +
            "SF weather can turn foggy and cool even in summer, so layers are essential.",
        },
      ],
      [
        { q: "Are SF's hills a problem?", a: "The Mission and North Beach are mostly flat. Heading up Telegraph Hill from North Beach gets steep." },
        { q: "Is the Mission safe?", a: "Daytime is safe with plenty of foot traffic. At night, stay around 24th Street and avoid the 16th Street corridor." },
        { q: "Best season for SF walks?", a: "September and October bring the warmest, clearest weather. Summer fog can make it surprisingly cold." },
      ],
    ),
  },

  // ─── 4. Chicago ─────────────────────────────────────────────────
  "chicago-neighborhood-walks": {
    ja: ja(US_JA_CTA,
      "シカゴの街歩きガイド 2026 | ウィッカーパーク&ピルゼン",
      "ウィッカーパークのカフェ文化とピルゼンのメキシコ系コミュニティ、シカゴで歩いて楽しい2エリアのガイドです。",
      img("File:Wicker Park Chicago.jpg", 1280, 854, "ウィッカーパーク", "シカゴのカフェとブティックの集積地"),
      [
        img("File:Pilsen Chicago Mural.jpg", 1280, 854, "ピルゼンの壁画", "メキシコ系文化が息づくエリア"),
        img("File:National Museum of Mexican Art.jpg", 1280, 854, "メキシカンアート美術館", "入場無料の充実したコレクション"),
        img("File:Milwaukee Avenue Chicago.jpg", 1280, 854, "ミルウォーキーアベニュー", "ウィッカーパークのメイン通り"),
      ],
      CHICAGO_X,
      [
        {
          heading: "シカゴの街歩きはダウンタウンの外が面白い",
          body:
            "シカゴのダウンタウン（ループ）は建築ツアーやミレニアムパークが有名ですが、本当のシカゴの空気を感じるのはネイバーフッドです。ウィッカーパークはインディーカフェとレコードショップが集まるクリエイティブなエリア、ピルゼンはメキシコ系コミュニティの壁画とタコスが魅力のエリアです。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。",
        },
        {
          heading: "ウィッカーパーク: カフェとレコードショップ",
          body:
            "ウィッカーパークはシカゴのウエストサイドに位置し、ミルウォーキーアベニューとノースアベニュー、ダメンアベニューの交差点が中心です。サードウェーブコーヒー、ヴィンテージレコード、独立系ブティックが密集しています。ブルーラインのダメン駅が起点。\n\n" +
            "「ウィッカーパークの街歩き」でカフェ巡りの効率的なルートを紹介しています。",
        },
        {
          heading: "ピルゼン: 壁画とタコスの下町",
          body:
            "ピルゼンはシカゴ南西部のメキシコ系コミュニティで、18thストリート沿いの壁画群とタケリアが見どころです。国立メキシカンアート美術館は入場無料で、メキシコ・チカーノ美術の充実したコレクションを持っています。ピンクラインの18th駅が最寄りです。\n\n" +
            "「ピルゼンの街歩き」で壁画巡りとグルメルートを紹介しています。",
        },
        {
          heading: "2エリアの組み合わせ",
          body:
            "ウィッカーパークとピルゼンは地下鉄で20分ほど。午前にウィッカーパークでカフェ巡り、午後にピルゼンで壁画とタコスという流れが自然です。どちらもダウンタウンから20分以内でアクセスできるので、ミレニアムパーク観光と組み合わせることも可能です。",
        },
      ],
      [
        { q: "シカゴの街歩きに最適な季節は?", a: "5月〜10月が気候的にベストです。冬は厳しい寒さになりますが、カフェ巡り中心なら楽しめます。" },
        { q: "ピルゼンの治安は?", a: "18thストリート沿いは日中安全です。夜間は大通りを歩きましょう。" },
        { q: "シカゴの地下鉄は使いやすい?", a: "はい。ブルーラインとピンクラインでこれらのエリアに簡単にアクセスできます。Ventraカードを事前に購入すると便利です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Chicago Neighborhood Walks 2026 | Wicker Park & Pilsen",
      "Two of Chicago's best walking neighbourhoods: Wicker Park's cafe culture and Pilsen's Mexican murals and tacos. Half-day routes beyond the Loop.",
      img("File:Wicker Park Chicago.jpg", 1280, 854, "Wicker Park", "Chicago's cafe and boutique hub"),
      [
        img("File:Pilsen Chicago Mural.jpg", 1280, 854, "Pilsen mural", "Mexican-American culture on every wall"),
        img("File:National Museum of Mexican Art.jpg", 1280, 854, "National Museum of Mexican Art", "Free admission, world-class collection"),
        img("File:Milwaukee Avenue Chicago.jpg", 1280, 854, "Milwaukee Avenue", "Wicker Park's main corridor"),
      ],
      CHICAGO_X,
      [
        {
          heading: "Chicago's best walking happens outside the Loop",
          body:
            "Downtown Chicago has its architecture tours and Millennium Park, but the city's real texture lives in its neighbourhoods. Wicker Park clusters indie cafes and record shops in a creative enclave. Pilsen is a Mexican-American community with murals on every block and some of the city's best tacos.\n\n" +
            "This page covers two walking routes beyond the Loop.",
        },
        {
          heading: "Wicker Park: cafes and record shops",
          body:
            "Wicker Park sits on Chicago's west side at the intersection of Milwaukee, North, and Damen avenues. Third-wave coffee, vintage vinyl, and independent boutiques pack a tight radius. Start at the Damen station on the Blue Line.\n\n" +
            "The Wicker Park walk covers the best cafe-hopping loop.",
        },
        {
          heading: "Pilsen: murals and tacos",
          body:
            "Pilsen is Chicago's Mexican-American heartland on the southwest side. 18th Street is lined with murals and taquerias. The National Museum of Mexican Art is free and holds one of the country's best collections of Mexican and Chicano art. Take the Pink Line to 18th Street.\n\n" +
            "The Pilsen walk covers the mural trail and food route.",
        },
        {
          heading: "Combining the two areas",
          body:
            "Wicker Park and Pilsen are about twenty minutes apart by train. Morning cafes in Wicker Park and afternoon murals and tacos in Pilsen is a natural flow. Both are within twenty minutes of downtown, so Millennium Park pairs easily with either.",
        },
      ],
      [
        { q: "Best season for Chicago walks?", a: "May through October offers the best weather. Winter is harsh, but cafe-focused walks still work." },
        { q: "Is Pilsen safe?", a: "18th Street is safe during the day with plenty of foot traffic. Stick to main streets after dark." },
        { q: "Is the L easy to use?", a: "Yes. The Blue and Pink lines reach these areas easily. Buy a Ventra card at any station." },
      ],
    ),
  },

  // ─── 5. Portland ────────────────────────────────────────────────
  "portland-neighborhood-walks": {
    ja: ja(US_JA_CTA,
      "ポートランドの街歩きガイド 2026 | アルバータ&ホーソーン",
      "アルバータアーツとホーソーン、ポートランドのクリエイティブな2エリアの街歩きルートガイドです。",
      img("File:Alberta Street Portland.jpg", 1280, 854, "アルバータストリート", "アートとカフェの通り"),
      [
        img("File:Hawthorne Boulevard Portland.jpg", 1280, 854, "ホーソーン通り", "ポートランドのヴィンテージショップ街"),
        img("File:Powell's Books Portland.jpg", 1280, 854, "パウエルズブックス", "世界最大級の独立系書店"),
        img("File:Portland food carts.jpg", 1280, 854, "フードカート", "ポートランド名物の屋台村"),
      ],
      PORTLAND_X,
      [
        {
          heading: "ポートランドは「歩いて楽しい」が街の個性",
          body:
            "ポートランドは「Keep Portland Weird」をモットーにする街で、インディペンデントなショップ、カフェ、レストランの密度が異常に高いのが特徴です。アルバータアーツディストリクトはノースイースト側のアートストリート、ホーソーンはサウスイースト側のヴィンテージと食のメインストリートです。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。",
        },
        {
          heading: "アルバータアーツ: ギャラリーとカフェの通り",
          body:
            "アルバータストリートはNEポートランドの約30ブロックに渡るアートストリートで、小さなギャラリー、壁画、独立系カフェ、クラフトショップが並びます。毎月最終木曜のラスト・サーズデー・アートウォークは通り全体がアートイベントになります。\n\n" +
            "「アルバータアーツの街歩き」でギャラリーとカフェの効率的なルートを紹介しています。",
        },
        {
          heading: "ホーソーン: ヴィンテージと食の通り",
          body:
            "ホーソーン通りはSEポートランドのメインストリートで、ヴィンテージショップ、古本屋、フードカートポッドが集まっています。周辺のディヴィジョンストリートやベルモントストリートまで足を延ばすと、さらにレストランやバーの選択肢が広がります。\n\n" +
            "「ホーソーンの街歩き」でショッピングと食事を組み合わせたルートを紹介しています。",
        },
        {
          heading: "2エリアの組み合わせ",
          body:
            "アルバータとホーソーンはバスまたはUberで20〜30分。午前にアルバータでアート散策、午後にホーソーンでヴィンテージショッピングと食事という流れがおすすめです。ダウンタウンのパウエルズブックスを間に挟むルートも人気です。",
        },
      ],
      [
        { q: "ポートランドの天気は?", a: "6月〜9月は晴れが多く最適です。10月〜5月は雨が多いですが、カフェ巡り中心なら問題ありません。" },
        { q: "フードカートのおすすめは?", a: "ホーソーン周辺のフードカートポッドで各国料理を試せます。現金のみの店もあるので少額の現金を持参してください。" },
        { q: "ポートランドの公共交通は?", a: "MAXライトレールとバスでほとんどのエリアにアクセスできます。Hopカードを購入すると便利です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Portland Neighborhood Walks 2026 | Alberta Arts & Hawthorne",
      "Two of Portland's most walkable creative strips: Alberta Arts District galleries and Hawthorne Boulevard vintage shops and food carts.",
      img("File:Alberta Street Portland.jpg", 1280, 854, "Alberta Street", "Art and cafe corridor"),
      [
        img("File:Hawthorne Boulevard Portland.jpg", 1280, 854, "Hawthorne Boulevard", "Portland's vintage strip"),
        img("File:Powell's Books Portland.jpg", 1280, 854, "Powell's Books", "World's largest independent bookstore"),
        img("File:Portland food carts.jpg", 1280, 854, "Food carts", "Portland's signature street food pods"),
      ],
      PORTLAND_X,
      [
        {
          heading: "Portland is built for walking",
          body:
            "Portland's 'Keep Portland Weird' ethos translates into an abnormal density of independent shops, cafes, and restaurants. Alberta Arts District is the northeast art strip, Hawthorne Boulevard is the southeast vintage-and-food main street.\n\n" +
            "This page covers two walking routes.",
        },
        {
          heading: "Alberta Arts: galleries and cafes",
          body:
            "Alberta Street runs about thirty blocks through NE Portland with small galleries, murals, indie cafes, and craft shops. The Last Thursday art walk on the final Thursday of each month turns the entire street into an open-air gallery event.\n\n" +
            "The Alberta Arts walk covers the gallery-and-cafe loop.",
        },
        {
          heading: "Hawthorne: vintage and food",
          body:
            "Hawthorne Boulevard is SE Portland's main strip, packed with vintage shops, used bookstores, and food cart pods. Nearby Division and Belmont streets expand the restaurant and bar options.\n\n" +
            "The Hawthorne walk combines shopping with food stops.",
        },
        {
          heading: "Combining the two areas",
          body:
            "Alberta and Hawthorne are twenty to thirty minutes apart by bus or Uber. Morning art in Alberta, afternoon vintage shopping and food in Hawthorne is a natural flow. Stopping at Powell's Books downtown in between is a popular option.",
        },
      ],
      [
        { q: "What is Portland weather like?", a: "June through September is mostly sunny and ideal. October to May is rainy, but cafe-focused walks work fine." },
        { q: "Any food cart tips?", a: "Food cart pods near Hawthorne serve world cuisines. Some are cash-only, so carry small bills." },
        { q: "Is public transit good?", a: "MAX light rail and buses cover most areas well. A Hop card makes paying easy." },
      ],
    ),
  },

  // ─── 6. Boston ──────────────────────────────────────────────────
  "boston-neighborhood-walks": {
    ja: ja(US_JA_CTA,
      "ボストンの街歩きガイド 2026 | ビーコンヒル&ノースエンド",
      "ビーコンヒルの石畳とノースエンドのイタリアンコミュニティ、ボストンの歴史ある2エリアの街歩きガイドです。",
      img("File:Beacon Hill Boston.jpg", 1280, 854, "ビーコンヒル", "ガスランプと石畳の美しい住宅街"),
      [
        img("File:Acorn Street Boston.jpg", 1280, 854, "エイコーンストリート", "ボストンで最も写真映えする通り"),
        img("File:North End Boston.jpg", 1280, 854, "ノースエンド", "ボストンのリトルイタリー"),
        img("File:Boston Public Garden.jpg", 1280, 854, "パブリックガーデン", "ボストン最古の植物公園"),
      ],
      BOSTON_X,
      [
        {
          heading: "ボストンはアメリカ随一の「歩く街」",
          body:
            "ボストンはアメリカの主要都市の中で最もコンパクトで歩きやすい街のひとつです。ビーコンヒルは赤レンガと石畳の美しい住宅街で、アメリカ独立期の雰囲気が色濃く残っています。ノースエンドはボストンのリトルイタリーで、イタリアンベーカリーやカフェが密集しています。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。フリーダムトレイルの定番観光と組み合わせやすいエリアです。",
        },
        {
          heading: "ビーコンヒル: 石畳とガスランプの住宅街",
          body:
            "ビーコンヒルはマサチューセッツ州議事堂の金色のドームを頂点に、南に向かって石畳の小路が広がるエリアです。エイコーンストリートはボストンで最も写真映えする通りとして知られ、チャールズストリート沿いにはアンティークショップやカフェが並びます。パブリックガーデンのスワンボートも徒歩圏内です。\n\n" +
            "「ビーコンヒルの街歩き」で石畳散歩の効率的なルートを紹介しています。",
        },
        {
          heading: "ノースエンド: イタリアンベーカリーとカフェ",
          body:
            "ノースエンドはボストン最古の住宅地区で、現在はイタリア系コミュニティの中心地です。ハノーバーストリート沿いのカンノーリの名店マイクスペストリーやモダンペストリー、本格的なイタリアンレストランが軒を連ねます。ポールリビアの家やオールドノース教会など歴史スポットも徒歩圏内です。\n\n" +
            "「ノースエンドの街歩き」でイタリアンフード巡りのルートを紹介しています。",
        },
        {
          heading: "2エリアの組み合わせ",
          body:
            "ビーコンヒルとノースエンドは徒歩15分で接続できます。午前にビーコンヒルを散策し、ランチをノースエンドで食べる流れが最も自然です。フリーダムトレイルの一部もこのエリアを通るので、歴史散策と組み合わせると1日プランが組めます。",
        },
      ],
      [
        { q: "ボストンの街歩きに最適な季節は?", a: "5月〜10月が最適です。特に秋（9〜10月）は紅葉が美しく、気候も快適です。" },
        { q: "ビーコンヒルは観光客が多いですか?", a: "エイコーンストリートは人気ですが、一本裏に入ると静かです。朝一番がおすすめです。" },
        { q: "ノースエンドの食事は予約が必要?", a: "人気店は週末の夕食に予約が必要ですが、ランチはウォークインで入れることが多いです。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Boston Neighborhood Walks 2026 | Beacon Hill & North End",
      "Boston's most atmospheric walks: Beacon Hill cobblestones and gaslight lanes, plus North End Italian bakeries and cafes. Two compact half-day routes.",
      img("File:Beacon Hill Boston.jpg", 1280, 854, "Beacon Hill", "Cobblestone streets and gaslight lamps"),
      [
        img("File:Acorn Street Boston.jpg", 1280, 854, "Acorn Street", "Boston's most photographed street"),
        img("File:North End Boston.jpg", 1280, 854, "North End", "Boston's Little Italy"),
        img("File:Boston Public Garden.jpg", 1280, 854, "Public Garden", "Boston's oldest botanical park"),
      ],
      BOSTON_X,
      [
        {
          heading: "Boston is America's most walkable city",
          body:
            "Boston is one of the most compact and walkable major cities in the United States. Beacon Hill preserves red-brick rowhouses and cobblestone lanes from the colonial era. The North End is Boston's Little Italy, dense with bakeries, espresso bars, and family-run restaurants.\n\n" +
            "This page covers two walking routes that pair naturally with the Freedom Trail.",
        },
        {
          heading: "Beacon Hill: cobblestones and gaslight lanes",
          body:
            "Beacon Hill fans out from the gold-domed Massachusetts State House down a slope of cobblestone lanes. Acorn Street is Boston's most photographed block. Charles Street at the base is lined with antique shops and cafes. The Public Garden and its swan boats are steps away.\n\n" +
            "The Beacon Hill walk covers the best cobblestone loop.",
        },
        {
          heading: "North End: Italian bakeries and cafes",
          body:
            "The North End is Boston's oldest residential neighbourhood and the heart of its Italian-American community. Hanover Street delivers cannoli from Mike's Pastry and Modern Pastry, plus authentic Italian restaurants. Paul Revere's House and the Old North Church add historical depth.\n\n" +
            "The North End walk covers the Italian food trail.",
        },
        {
          heading: "Combining the two areas",
          body:
            "Beacon Hill and the North End are a fifteen-minute walk apart. Morning in Beacon Hill, lunch in the North End is the most natural pairing. The Freedom Trail passes through both areas, so history and neighbourhood walking combine into a full day.",
        },
      ],
      [
        { q: "Best season for Boston walks?", a: "May through October. Autumn (September-October) is especially beautiful with fall foliage." },
        { q: "Is Beacon Hill crowded?", a: "Acorn Street draws visitors, but one block over it is quiet. Early morning is best." },
        { q: "Do I need reservations in the North End?", a: "Weekend dinners often need reservations, but lunch is usually walk-in friendly." },
      ],
    ),
  },

  // ─── 7. Seattle ─────────────────────────────────────────────────
  "seattle-neighborhood-walks": {
    ja: ja(US_JA_CTA,
      "シアトルの街歩きガイド 2026 | パイクプレイス&キャピトルヒル",
      "パイクプレイスマーケットとキャピトルヒル、シアトルの活気ある2エリアの街歩きガイドです。",
      img("File:Pike Place Market Seattle.jpg", 1280, 854, "パイクプレイスマーケット", "1907年創業の歴史あるマーケット"),
      [
        img("File:Capitol Hill Seattle.jpg", 1280, 854, "キャピトルヒル", "シアトルのカフェカルチャーの中心地"),
        img("File:Pike Place Fish Market.jpg", 1280, 854, "魚の投げ売り", "パイクプレイス名物のパフォーマンス"),
        img("File:Starbucks Pike Place.jpg", 1280, 854, "スターバックス1号店", "1971年創業の原点"),
      ],
      SEATTLE_X,
      [
        {
          heading: "シアトルはコーヒーと食の街歩き",
          body:
            "シアトルはスターバックスの発祥地であり、アメリカ随一のコーヒーカルチャーを持つ街です。パイクプレイスマーケットは100年以上の歴史を持つ公設市場で、鮮魚、クラフト、生花が集まります。キャピトルヒルはシアトルのサブカルチャーの中心で、サードウェーブコーヒーとライブ音楽シーンが盛んです。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。",
        },
        {
          heading: "パイクプレイス: マーケットとウォーターフロント",
          body:
            "パイクプレイスマーケットはシアトル観光の定番ですが、1階の観光エリアだけでなく、地下レベルのクラフトショップや裏通りのレストランまで探索すると半日楽しめます。スターバックス1号店、ガムウォール、パイクプレイスフィッシュマーケットの魚の投げ売りパフォーマンスが名物です。\n\n" +
            "「パイクプレイスの街歩き」でマーケット内の効率的な回り方と周辺の散策ルートを紹介しています。",
        },
        {
          heading: "キャピトルヒル: コーヒーとサブカルチャー",
          body:
            "キャピトルヒルはシアトルのイーストサイドに位置し、ブロードウェイとパインストリート周辺にサードウェーブコーヒー、レコードショップ、独立系書店、ライブハウスが集まっています。ボランティアパークのコンサバトリーも徒歩圏内です。\n\n" +
            "「キャピトルヒルの街歩き」でカフェ巡りとショップ散策のルートを紹介しています。",
        },
        {
          heading: "2エリアの組み合わせ",
          body:
            "パイクプレイスとキャピトルヒルはバスまたは徒歩で20分ほど（ただし坂道あり）。午前にパイクプレイスマーケット、午後にキャピトルヒルのカフェ巡りという流れが自然です。リンクライトレールのキャピトルヒル駅が便利です。",
        },
      ],
      [
        { q: "シアトルは雨が多いですか?", a: "秋〜冬は小雨が多いですが、6月〜9月は晴天が続きます。雨でもパイクプレイスは屋内なので楽しめます。" },
        { q: "パイクプレイスは何時がおすすめ?", a: "朝8〜9時頃が空いています。昼頃には観光客で混雑します。" },
        { q: "キャピトルヒルの治安は?", a: "日中は安全です。夜はバーエリアは賑やかですが、人通りの少ない裏通りは避けましょう。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Seattle Neighborhood Walks 2026 | Pike Place & Capitol Hill",
      "Seattle's best walking areas: Pike Place Market seafood and crafts, plus Capitol Hill's coffee culture and indie shops. Two half-day routes.",
      img("File:Pike Place Market Seattle.jpg", 1280, 854, "Pike Place Market", "Historic public market since 1907"),
      [
        img("File:Capitol Hill Seattle.jpg", 1280, 854, "Capitol Hill", "Seattle's cafe culture epicentre"),
        img("File:Pike Place Fish Market.jpg", 1280, 854, "Fish throwing", "Pike Place's signature performance"),
        img("File:Starbucks Pike Place.jpg", 1280, 854, "Original Starbucks", "The 1971 first store"),
      ],
      SEATTLE_X,
      [
        {
          heading: "Seattle walks are fueled by coffee and food",
          body:
            "Seattle is where Starbucks started and where American coffee culture runs deepest. Pike Place Market is a century-old public market packed with fishmongers, crafts, and flowers. Capitol Hill is the city's subcultural heart, alive with third-wave roasters and live music venues.\n\n" +
            "This page covers two walking routes.",
        },
        {
          heading: "Pike Place: market and waterfront",
          body:
            "Pike Place Market is Seattle's top attraction, but beyond the tourist floor, lower levels hide craft shops and back alleys hold restaurants worth seeking out. The original Starbucks, the Gum Wall, and the fish-throwing show at Pike Place Fish Market are signature stops.\n\n" +
            "The Pike Place walk covers efficient market navigation and nearby waterfront strolling.",
        },
        {
          heading: "Capitol Hill: coffee and subculture",
          body:
            "Capitol Hill sits on Seattle's east side, clustering third-wave coffee shops, record stores, independent bookshops, and live music venues around Broadway and Pine Street. Volunteer Park Conservatory is a short walk away.\n\n" +
            "The Capitol Hill walk covers the cafe-hopping and shop loop.",
        },
        {
          heading: "Combining the two areas",
          body:
            "Pike Place and Capitol Hill are about twenty minutes apart by bus or on foot (with hills). Morning at Pike Place, afternoon cafes on Capitol Hill is the natural flow. Link Light Rail's Capitol Hill station is the easiest connection.",
        },
      ],
      [
        { q: "Does it rain a lot in Seattle?", a: "Autumn and winter bring drizzle, but June through September is mostly sunny. Pike Place is indoors, so rain is not a problem there." },
        { q: "What time should I arrive at Pike Place?", a: "Eight to nine in the morning is quietest. By midday it is packed." },
        { q: "Is Capitol Hill safe?", a: "Daytime is safe. The bar area is lively at night, but avoid quiet side streets." },
      ],
    ),
  },

  // ─── 8. Montreal ────────────────────────────────────────────────
  "montreal-neighborhood-walks": {
    ja: ja(CA_JA_CTA,
      "モントリオールの街歩きガイド 2026 | プラトー&旧市街",
      "プラトー・モンロワイヤルのカフェ文化と旧港の石畳散歩、モントリオールの2エリアガイドです。",
      img("File:Plateau-Mont-Royal Montreal.jpg", 1280, 854, "プラトー地区", "カラフルな階段が並ぶ通り"),
      [
        img("File:Old Montreal.jpg", 1280, 854, "旧モントリオール", "石造りの歴史的建築"),
        img("File:Notre-Dame Basilica Montreal.jpg", 1280, 854, "ノートルダム大聖堂", "北米で最も美しい教会のひとつ"),
        img("File:Montreal Bagel.jpg", 1280, 854, "モントリオールベーグル", "ニューヨークとは異なるスタイル"),
      ],
      MONTREAL_X,
      [
        {
          heading: "モントリオールはフレンチカルチャーと食の街歩き",
          body:
            "モントリオールは北米で最もヨーロッパ的な都市で、フランス語圏の文化が色濃く残っています。プラトー・モンロワイヤルはカラフルな外階段が並ぶ住宅街で、カフェとブティックの密度が高いエリアです。旧港（オールドポート）は石造りの歴史的建築が並ぶウォーターフロントで、ノートルダム大聖堂やジャック・カルティエ広場が見どころです。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。",
        },
        {
          heading: "プラトー: カラフルな階段とベーグル",
          body:
            "プラトー・モンロワイヤルはモントリオールで最もボヘミアンなエリアで、サンローラン通りとモンロワイヤル通りが中心軸です。カラフルな外階段は写真映えし、フェアマウントベーグルやサンヴィアトゥールベーグルのモントリオールスタイルベーグルは必食です。地下鉄モンロワイヤル駅が起点。\n\n" +
            "「プラトーの街歩き」でカフェ巡りとベーグル食べ比べルートを紹介しています。",
        },
        {
          heading: "旧港: 石畳とウォーターフロント",
          body:
            "旧モントリオールは17世紀にさかのぼる石造りの建物が並ぶ歴史地区です。ノートルダム大聖堂のネオゴシック建築は圧巻で、内部の青い光の演出は必見。ジャック・カルティエ広場ではストリートパフォーマーやテラスカフェを楽しめます。セントローレンス川沿いの旧港散策路も気持ちいいウォーキングルートです。\n\n" +
            "「旧港の街歩き」で大聖堂からウォーターフロントへのルートを紹介しています。",
        },
        {
          heading: "2エリアの組み合わせ",
          body:
            "プラトーと旧港は地下鉄で15分、徒歩でも30分ほどです。午前にプラトーでベーグル朝食とカフェ巡り、午後に旧港で歴史散策という流れがおすすめです。冬は寒さが厳しいですが、地下街（RESO）を使えば屋内移動も可能です。",
        },
      ],
      [
        { q: "フランス語は必要ですか?", a: "英語で問題なく通じます。ただしメニューや看板はフランス語が先に書かれていることが多いです。" },
        { q: "モントリオールの街歩きに最適な季節は?", a: "6月〜9月が最適です。冬（12月〜3月）は-20度以下になることもありますが、地下街と室内観光で楽しめます。" },
        { q: "モントリオールベーグルとNYベーグルの違いは?", a: "モントリオールベーグルは薪窯で焼くため小ぶりで甘みがあり、密度が高いのが特徴です。" },
      ],
    ),
    en: en(CA_EN_CTA,
      "Montreal Neighborhood Walks 2026 | Plateau & Old Port",
      "Montreal's two essential walking areas: Plateau-Mont-Royal's colourful staircases and cafes, plus Old Port cobblestones and Notre-Dame Basilica.",
      img("File:Plateau-Mont-Royal Montreal.jpg", 1280, 854, "Plateau district", "Colourful outdoor staircases"),
      [
        img("File:Old Montreal.jpg", 1280, 854, "Old Montreal", "Historic stone architecture"),
        img("File:Notre-Dame Basilica Montreal.jpg", 1280, 854, "Notre-Dame Basilica", "One of North America's most beautiful churches"),
        img("File:Montreal Bagel.jpg", 1280, 854, "Montreal bagel", "Wood-fired and distinct from New York style"),
      ],
      MONTREAL_X,
      [
        {
          heading: "Montreal is North America's most European walk",
          body:
            "Montreal is the most European-feeling city in North America, with French-speaking culture woven into every block. Plateau-Mont-Royal is a bohemian residential area with colourful outdoor staircases, dense cafes, and boutiques. Old Port lines the waterfront with seventeenth-century stone buildings, Notre-Dame Basilica, and Place Jacques-Cartier.\n\n" +
            "This page covers two walking routes.",
        },
        {
          heading: "Plateau: colourful stairs and bagels",
          body:
            "Plateau-Mont-Royal is Montreal's most bohemian quarter, centred on Saint-Laurent and Mont-Royal boulevards. The colourful outdoor staircases are photogenic, and Fairmount Bagel and St-Viateur Bagel serve Montreal's signature wood-fired bagels. Start at Mont-Royal metro.\n\n" +
            "The Plateau walk covers the cafe-and-bagel circuit.",
        },
        {
          heading: "Old Port: cobblestones and waterfront",
          body:
            "Old Montreal preserves stone buildings dating to the seventeenth century. Notre-Dame Basilica's neo-Gothic interior and blue-light show are unmissable. Place Jacques-Cartier has street performers and terrace cafes. The Old Port waterfront path along the St. Lawrence is a pleasant stroll.\n\n" +
            "The Old Port walk covers the basilica-to-waterfront route.",
        },
        {
          heading: "Combining the two areas",
          body:
            "The Plateau and Old Port are fifteen minutes apart by metro or thirty minutes on foot. Morning bagels and cafes in the Plateau, afternoon history in Old Port is the recommended flow. In winter, the underground city (RESO) lets you move between stations indoors.",
        },
      ],
      [
        { q: "Do I need French?", a: "English is widely spoken. Menus and signs tend to be in French first but staff switch easily." },
        { q: "Best season for Montreal walks?", a: "June through September. Winter drops below minus twenty Celsius, but the underground city and indoor attractions keep things enjoyable." },
        { q: "How do Montreal bagels differ from NYC bagels?", a: "Montreal bagels are wood-fired, smaller, sweeter, and denser than their New York counterparts." },
      ],
    ),
  },

  // ─── 9. Buenos Aires ────────────────────────────────────────────
  "buenos-aires-neighborhood-walks": {
    ja: ja(AR_JA_CTA,
      "ブエノスアイレスの街歩きガイド 2026 | サンテルモ・パレルモ・ラボカ",
      "サンテルモのアンティーク市、パレルモソーホーのブティック、ラボカのカラフルな街並み。ブエノスアイレスの3エリアガイドです。",
      img("File:San Telmo Buenos Aires.jpg", 1280, 854, "サンテルモ", "骨董品市とタンゴの街"),
      [
        img("File:Palermo Soho Buenos Aires.jpg", 1280, 854, "パレルモソーホー", "ブティックとカフェの集積地"),
        img("File:La Boca Caminito.jpg", 1280, 854, "ラボカのカミニート", "カラフルなトタン屋根の通り"),
        img("File:Plaza Dorrego Buenos Aires.jpg", 1280, 854, "ドレーゴ広場", "日曜のアンティーク市"),
      ],
      BUENOS_AIRES_X,
      [
        {
          heading: "ブエノスアイレスは「バリオ（地区）」で体験が変わる",
          body:
            "ブエノスアイレスは南米のパリとも呼ばれるヨーロッパ的な街並みを持つ都市です。サンテルモは石畳の古い地区でアンティーク市とタンゴが名物、パレルモソーホーはデザイナーズブティックとカフェが集まるトレンディなエリア、ラボカはカラフルなトタン屋根の家が並ぶフォトジェニックな港町です。\n\n" +
            "このページでは3つの街歩きルートを紹介しています。",
        },
        {
          heading: "サンテルモ: アンティーク市とタンゴ",
          body:
            "サンテルモはブエノスアイレスで最も古い地区のひとつで、日曜日のドレーゴ広場アンティーク市が最大の見どころです。石畳の通り沿いにアンティークショップ、タンゴバー、カフェが並び、週末には路上でタンゴを踊るカップルに出会えます。地下鉄C線サンフアン駅が最寄りです。\n\n" +
            "「サンテルモの街歩き」でアンティーク市と周辺散策のルートを紹介しています。",
        },
        {
          heading: "パレルモソーホー: デザインとカフェ",
          body:
            "パレルモソーホーはブエノスアイレスで最もトレンディなエリアで、アルゼンチン発のデザイナーズブティック、スペシャルティコーヒー、壁画アートが集まっています。ホルヘ・ルイス・ボルヘス通りとホンジュラス通り周辺が中心。隣接するパレルモハリウッドにはレストランやバーが密集しています。\n\n" +
            "「パレルモソーホーの街歩き」でショッピングとカフェ巡りのルートを紹介しています。",
        },
        {
          heading: "ラボカ: カラフルなカミニート",
          body:
            "ラボカはリアチュエロ川沿いの港町で、カミニートと呼ばれる小道にカラフルなトタン屋根の家が並びます。かつてイタリア系移民が船のペンキを塗り替えて家を彩ったのが始まりです。タンゴのパフォーマンスやアーティストの露店も楽しめます。ただし観光エリア外は治安が良くないので、カミニート周辺にとどまりましょう。\n\n" +
            "「ラボカの街歩き」でカミニートとその周辺の安全な散策ルートを紹介しています。",
        },
        {
          heading: "3エリアの組み合わせ",
          body:
            "サンテルモとラボカは徒歩で20分ほどつながっています。パレルモソーホーはサンテルモからバスまたはタクシーで20分。日曜日にサンテルモのアンティーク市を午前中に回り、午後にパレルモでカフェとショッピングという流れが人気です。ラボカは午前中の明るい時間帯に訪れるのがおすすめです。",
        },
      ],
      [
        { q: "ブエノスアイレスの治安は?", a: "サンテルモとパレルモは日中安全です。ラボカはカミニート周辺のみにとどまり、離れた路地には入らないでください。" },
        { q: "サンテルモのアンティーク市は日曜だけ?", a: "メインの屋外市は日曜のみですが、常設のアンティークショップは平日も営業しています。" },
        { q: "タンゴショーの予約は必要?", a: "人気のタンゴショー（ミロンガ）は事前予約がおすすめです。ストリートタンゴは週末のサンテルモで自然に見られます。" },
      ],
    ),
    en: en(AR_EN_CTA,
      "Buenos Aires Neighborhood Walks 2026 | San Telmo, Palermo & La Boca",
      "Three essential Buenos Aires walks: San Telmo antique markets, Palermo Soho boutiques, and La Boca's colourful Caminito. Area-by-area route guide.",
      img("File:San Telmo Buenos Aires.jpg", 1280, 854, "San Telmo", "Antiques and tango district"),
      [
        img("File:Palermo Soho Buenos Aires.jpg", 1280, 854, "Palermo Soho", "Design boutiques and cafes"),
        img("File:La Boca Caminito.jpg", 1280, 854, "La Boca Caminito", "Colourful corrugated-iron houses"),
        img("File:Plaza Dorrego Buenos Aires.jpg", 1280, 854, "Plaza Dorrego", "Sunday antique fair"),
      ],
      BUENOS_AIRES_X,
      [
        {
          heading: "Buenos Aires changes character barrio by barrio",
          body:
            "Buenos Aires is often called the Paris of South America for its European architecture and cafe culture. San Telmo is the oldest quarter with cobblestones, antique fairs, and tango. Palermo Soho is the trendy design-and-cafe district. La Boca is the photogenic port neighbourhood of colourful corrugated-iron houses.\n\n" +
            "This page covers three walking routes.",
        },
        {
          heading: "San Telmo: antiques and tango",
          body:
            "San Telmo is one of Buenos Aires' oldest barrios, famous for the Sunday antique fair at Plaza Dorrego. Cobblestone streets are lined with antique shops, tango bars, and cafes. On weekends, couples dance tango in the streets. Closest metro is San Juan on Line C.\n\n" +
            "The San Telmo walk covers the antique market and surrounding streets.",
        },
        {
          heading: "Palermo Soho: design and cafes",
          body:
            "Palermo Soho is Buenos Aires' trendiest district, packed with Argentine designer boutiques, specialty coffee, and street art. Jorge Luis Borges and Honduras streets are the centre. Adjacent Palermo Hollywood adds restaurants and bars.\n\n" +
            "The Palermo Soho walk covers the shopping and cafe loop.",
        },
        {
          heading: "La Boca: colourful Caminito",
          body:
            "La Boca is a port neighbourhood along the Riachuelo river where Caminito lane is lined with brightly painted corrugated-iron houses, originally coloured with leftover ship paint by Italian immigrants. Tango performances and artist stalls add atmosphere. Stay within the tourist area — streets beyond Caminito are not safe for walking.\n\n" +
            "The La Boca walk covers the safe Caminito circuit.",
        },
        {
          heading: "Combining the three areas",
          body:
            "San Telmo and La Boca connect on foot in about twenty minutes. Palermo Soho is a twenty-minute bus or taxi ride from San Telmo. A popular plan is the Sunday antique fair in San Telmo in the morning and Palermo cafes in the afternoon. Visit La Boca in the bright morning hours.",
        },
      ],
      [
        { q: "Is Buenos Aires safe?", a: "San Telmo and Palermo are safe during the day. In La Boca, stay within the Caminito tourist area and avoid side streets." },
        { q: "Is the San Telmo fair only on Sundays?", a: "The main outdoor market is Sunday only, but permanent antique shops along Defensa Street are open on weekdays." },
        { q: "Do I need to book tango shows?", a: "Popular milongas benefit from advance booking. Street tango in San Telmo happens organically on weekends." },
      ],
    ),
  },

  // ─── 10. Lima ───────────────────────────────────────────────────
  "lima-neighborhood-walks": {
    ja: ja(PE_JA_CTA,
      "リマの街歩きガイド 2026 | バランコ・ミラフローレス・セントロ",
      "バランコのアートシーン、ミラフローレスの海岸散歩、セントロイストリコの歴史建築。リマの3エリア街歩きガイドです。",
      img("File:Barranco Lima.jpg", 1280, 854, "バランコ地区", "リマのボヘミアンなアート地区"),
      [
        img("File:Miraflores Lima coastline.jpg", 1280, 854, "ミラフローレスの海岸", "太平洋を望む断崖の遊歩道"),
        img("File:Plaza Mayor Lima.jpg", 1280, 854, "プラサマヨール", "リマの歴史的中心広場"),
        img("File:Puente de los Suspiros Barranco.jpg", 1280, 854, "ため息の橋", "バランコのシンボル"),
      ],
      LIMA_X,
      [
        {
          heading: "リマは「食」と「歴史」と「海」の街歩き",
          body:
            "リマは南米の美食の首都と呼ばれる街で、街歩きは食と密接に結びついています。バランコはアーティストが集まるボヘミアンなエリア、ミラフローレスは太平洋を望む断崖沿いの遊歩道が美しいエリア、セントロイストリコ（歴史地区）はスペイン植民地時代の建築が残る世界遺産エリアです。\n\n" +
            "このページでは3つの街歩きルートを紹介しています。",
        },
        {
          heading: "バランコ: アートとボヘミアン文化",
          body:
            "バランコはリマで最もアーティスティックなエリアで、壁画、ギャラリー、ライブ音楽のバーが集まっています。「ため息の橋」（プエンテ・デ・ロス・ススピロス）はフォトスポットとして有名。海沿いの断崖に沿った散歩道も気持ちいいです。メトロポリターノのバランコ駅が最寄りです。\n\n" +
            "「バランコの街歩き」でアートギャラリーとカフェを巡るルートを紹介しています。",
        },
        {
          heading: "ミラフローレス: 海岸の遊歩道",
          body:
            "ミラフローレスはリマの中間層〜富裕層が暮らすエリアで、マレコン（断崖沿いの遊歩道）が最大の見どころです。太平洋を見渡すパラグライダーのテイクオフポイント、ラルコマール・ショッピングセンター、ケネディ公園の猫たちなど、3〜4時間で回れます。\n\n" +
            "「ミラフローレスの海岸散歩」でマレコン沿いのルートを紹介しています。",
        },
        {
          heading: "セントロイストリコ: 植民地時代の世界遺産",
          body:
            "リマのセントロイストリコ（歴史地区）はユネスコ世界遺産に登録されており、プラサマヨール、大聖堂、サンフランシスコ修道院のカタコンベが主な見どころです。アールデコ建築とスペイン・バロック建築が混在する独特の街並みが広がります。\n\n" +
            "「セントロイストリコの街歩き」で歴史建築巡りのルートを紹介しています。",
        },
        {
          heading: "3エリアの組み合わせ",
          body:
            "バランコとミラフローレスはメトロポリターノまたは徒歩（マレコン経由で約40分）で接続できます。セントロイストリコへはミラフローレスからメトロポリターノで30分。午前にセントロで歴史散策、午後にミラフローレスで海岸散歩、夕方にバランコでディナーという1日プランがおすすめです。",
        },
      ],
      [
        { q: "リマの治安は?", a: "ミラフローレスとバランコは安全です。セントロイストリコは日中は問題ありませんが、貴重品管理に注意し、夜間は避けましょう。" },
        { q: "リマのベストシーズンは?", a: "12月〜3月が夏で晴天が多いです。6月〜10月は曇りがちで霧（ガルーア）が出ますが、涼しく歩きやすいです。" },
        { q: "食事のおすすめは?", a: "セビーチェ（魚介のマリネ）、ロモサルタード（牛肉の炒め物）、カウサ（ポテト料理）がリマの三大名物です。" },
      ],
    ),
    en: en(PE_EN_CTA,
      "Lima Neighborhood Walks 2026 | Barranco, Miraflores & Centro",
      "Three Lima walking routes: Barranco's art scene, Miraflores coastal promenade, and Centro Historico's colonial architecture. A food-lover's city on foot.",
      img("File:Barranco Lima.jpg", 1280, 854, "Barranco district", "Lima's bohemian art quarter"),
      [
        img("File:Miraflores Lima coastline.jpg", 1280, 854, "Miraflores coast", "Pacific Ocean cliff-top promenade"),
        img("File:Plaza Mayor Lima.jpg", 1280, 854, "Plaza Mayor", "Lima's historic central square"),
        img("File:Puente de los Suspiros Barranco.jpg", 1280, 854, "Bridge of Sighs", "Barranco's iconic landmark"),
      ],
      LIMA_X,
      [
        {
          heading: "Lima walks blend food, history, and ocean views",
          body:
            "Lima is South America's gastronomic capital, and walking here is inseparable from eating. Barranco is the bohemian art district. Miraflores offers cliff-top promenades above the Pacific. Centro Historico is a UNESCO World Heritage zone of Spanish colonial architecture.\n\n" +
            "This page covers three walking routes.",
        },
        {
          heading: "Barranco: art and bohemian culture",
          body:
            "Barranco is Lima's most artistic neighbourhood, packed with murals, galleries, and live music bars. The Bridge of Sighs (Puente de los Suspiros) is the signature photo spot. A cliff-side path offers ocean views. Reach it via Metropolitano to Barranco station.\n\n" +
            "The Barranco walk covers the gallery-and-cafe circuit.",
        },
        {
          heading: "Miraflores: coastal promenade",
          body:
            "Miraflores is Lima's upscale coastal district. The Malecon, a cliff-top walking path, is the highlight — paragliders launch from the bluffs, Larcomar mall sits carved into the cliff face, and Kennedy Park's resident cats charm visitors. Three to four hours covers it.\n\n" +
            "The Miraflores coastal walk covers the Malecon route.",
        },
        {
          heading: "Centro Historico: colonial World Heritage",
          body:
            "Lima's Centro Historico is a UNESCO site centred on Plaza Mayor, the cathedral, and the San Francisco Monastery catacombs. Art Deco and Spanish Baroque mix along streets that have been continuously occupied since the 1530s.\n\n" +
            "The Centro Historico walk covers the heritage architecture route.",
        },
        {
          heading: "Combining the three areas",
          body:
            "Barranco and Miraflores connect via Metropolitano or by walking the Malecon in about forty minutes. Centro Historico is thirty minutes from Miraflores by Metropolitano. A full-day plan: morning history in Centro, afternoon coast in Miraflores, dinner in Barranco.",
        },
      ],
      [
        { q: "Is Lima safe for walking?", a: "Miraflores and Barranco are safe. Centro Historico is fine in daytime — watch valuables and avoid it at night." },
        { q: "Best season to visit Lima?", a: "December to March is sunny summer. June to October is overcast with garua fog, but cool and comfortable for walking." },
        { q: "What should I eat?", a: "Ceviche, lomo saltado (stir-fried beef), and causa (layered potato dish) are Lima's essential three." },
      ],
    ),
  },

  // ─── 11. Melbourne ──────────────────────────────────────────────
  "melbourne-neighborhood-walks": {
    ja: ja(AU_JA_CTA,
      "メルボルンの街歩きガイド 2026 | フィッツロイ・レーンウェイズ・コリングウッド",
      "フィッツロイのカフェ文化、CBDのレーンウェイズ、コリングウッドのブルワリー、サウスメルボルンマーケット。メルボルンの4エリア街歩きガイドです。",
      img("File:Hosier Lane Melbourne.jpg", 1280, 854, "ホージャーレーン", "メルボルンを代表するストリートアートの路地"),
      [
        img("File:Fitzroy Melbourne.jpg", 1280, 854, "フィッツロイ", "メルボルンのカフェカルチャーの発祥地"),
        img("File:South Melbourne Market.jpg", 1280, 854, "サウスメルボルンマーケット", "地元に愛される歴史あるマーケット"),
        img("File:Collingwood Melbourne.jpg", 1280, 854, "コリングウッド", "ブルワリーとファクトリーアウトレット"),
      ],
      MELBOURNE_X,
      [
        {
          heading: "メルボルンは「レーンウェイズ」と「カフェ」の街歩き",
          body:
            "メルボルンは世界屈指のカフェ文化を持つ都市で、CBD（中心業務地区）の裏路地（レーンウェイズ）にストリートアートとカフェが凝縮されています。フィッツロイはメルボルンのカフェカルチャー発祥地、コリングウッドはクラフトブルワリーの集積地、サウスメルボルンマーケットは地元住民の台所です。\n\n" +
            "このページでは4つの街歩きルートを紹介しています。",
        },
        {
          heading: "フィッツロイ: カフェ文化の発祥地",
          body:
            "フィッツロイはブランズウィックストリートとスミスストリートを中心としたエリアで、メルボルンのサードウェーブコーヒームーブメントの発祥地です。独立系カフェ、古着店、レコードショップ、小さなギャラリーが密集しています。トラム11番でCBDから10分。\n\n" +
            "「フィッツロイの街歩き」でカフェ巡りと古着ショッピングのルートを紹介しています。",
        },
        {
          heading: "レーンウェイズ: CBDの裏路地アート",
          body:
            "メルボルンCBDの裏路地（レーンウェイズ）は世界的に有名なストリートアートの野外ギャラリーです。ホージャーレーン、ACDCレーン、センタープレイスなど、数ブロックの中に色とりどりの壁画と隠れ家的カフェが詰まっています。フリンダースストリート駅から徒歩5分で始められます。\n\n" +
            "「レーンウェイズの街歩き」でストリートアート巡りのベストルートを紹介しています。",
        },
        {
          heading: "コリングウッド & サウスメルボルンマーケット",
          body:
            "コリングウッドはフィッツロイの隣にあるエリアで、旧工場を改装したクラフトブルワリーやファクトリーアウトレットが集まっています。サウスメルボルンマーケットは1867年創業の歴史あるマーケットで、名物のディムシム（揚げ餃子）は必食です。\n\n" +
            "「コリングウッドの街歩き」「サウスメルボルンマーケットの散策」でそれぞれのルートを紹介しています。",
        },
        {
          heading: "4エリアの組み合わせ",
          body:
            "レーンウェイズ（CBD）を起点に、トラムでフィッツロイ→コリングウッドと北東に移動するルートが効率的です。サウスメルボルンマーケットはCBDからトラム96番で10分。1日で2〜3エリアが現実的です。メルボルンのトラムはCBD内無料ゾーンがあり、観光に便利です。",
        },
      ],
      [
        { q: "メルボルンのコーヒーは本当にすごいですか?", a: "はい。世界でもトップクラスのカフェ文化があり、フラットホワイトの発祥地とも言われています。" },
        { q: "メルボルンの天気は?", a: "「1日に四季がある」と言われるほど変わりやすいです。重ね着と折りたたみ傘が必須です。" },
        { q: "トラムの乗り方は?", a: "Mykiカードをタッチして乗ります。CBD内のフリートラムゾーンでは無料で乗車できます。" },
        { q: "レーンウェイズの壁画は変わりますか?", a: "はい。常に新しい作品が描かれるので、訪れるたびに違うアートが見られます。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Melbourne Neighborhood Walks 2026 | Fitzroy, Laneways, Collingwood & Market",
      "Four Melbourne walking routes: Fitzroy cafe culture, CBD laneway street art, Collingwood breweries, and South Melbourne Market. Area-by-area guide.",
      img("File:Hosier Lane Melbourne.jpg", 1280, 854, "Hosier Lane", "Melbourne's most famous street art alley"),
      [
        img("File:Fitzroy Melbourne.jpg", 1280, 854, "Fitzroy", "Birthplace of Melbourne cafe culture"),
        img("File:South Melbourne Market.jpg", 1280, 854, "South Melbourne Market", "Historic neighbourhood market"),
        img("File:Collingwood Melbourne.jpg", 1280, 854, "Collingwood", "Breweries and factory outlets"),
      ],
      MELBOURNE_X,
      [
        {
          heading: "Melbourne walks are built on laneways and coffee",
          body:
            "Melbourne has one of the world's deepest cafe cultures, and the CBD's laneways concentrate street art and hidden coffee bars into narrow alleys. Fitzroy is where Melbourne's third-wave coffee movement started. Collingwood clusters craft breweries in converted factories. South Melbourne Market has fed locals since 1867.\n\n" +
            "This page covers four walking routes.",
        },
        {
          heading: "Fitzroy: where cafe culture began",
          body:
            "Fitzroy centres on Brunswick and Smith streets and is Melbourne's original third-wave coffee neighbourhood. Independent cafes, vintage shops, record stores, and small galleries pack a tight radius. Tram 11 from the CBD takes ten minutes.\n\n" +
            "The Fitzroy walk covers the cafe-and-vintage loop.",
        },
        {
          heading: "Laneways: CBD street art alleys",
          body:
            "Melbourne's CBD laneways are a world-famous outdoor street art gallery. Hosier Lane, ACDC Lane, and Centre Place pack colourful murals and hidden cafes into a few city blocks. Start from Flinders Street Station — five minutes on foot.\n\n" +
            "The Laneways walk covers the best street art route.",
        },
        {
          heading: "Collingwood and South Melbourne Market",
          body:
            "Collingwood sits next to Fitzroy and fills former factories with craft breweries and outlet stores. South Melbourne Market, established in 1867, is a working neighbourhood market — the dim sims are a must-eat.\n\n" +
            "The Collingwood walk and South Melbourne Market walk cover each area.",
        },
        {
          heading: "Combining the four areas",
          body:
            "Start in the CBD laneways, then tram northeast to Fitzroy and on to Collingwood. South Melbourne Market is ten minutes from the CBD on tram 96. Two to three areas in a day is realistic. Melbourne trams are free within the CBD Free Tram Zone.",
        },
      ],
      [
        { q: "Is Melbourne coffee really that good?", a: "Yes. It ranks among the world's best cafe scenes and is one of the claimed birthplaces of the flat white." },
        { q: "What is the weather like?", a: "Melbourne is famous for 'four seasons in one day.' Layers and a compact umbrella are essential." },
        { q: "How do I ride the trams?", a: "Tap a Myki card on board. Trams within the CBD Free Tram Zone are free." },
        { q: "Do the laneway murals change?", a: "Yes. New works appear constantly, so the art is different every visit." },
      ],
    ),
  },

  // ─── 12. Sydney ─────────────────────────────────────────────────
  "sydney-neighborhood-walks": {
    ja: ja(AU_JA_CTA,
      "シドニーの街歩きガイド 2026 | サリーヒルズ・ニュータウン・ロックス・ボンダイ",
      "サリーヒルズのカフェ、ニュータウンのサブカルチャー、ロックスの歴史、ボンダイ〜クージーの海岸散歩。シドニーの4エリアガイドです。",
      img("File:Surry Hills Sydney.jpg", 1280, 854, "サリーヒルズ", "シドニーのカフェとダイニングの中心地"),
      [
        img("File:Newtown Sydney.jpg", 1280, 854, "ニュータウン", "シドニーのオルタナティブカルチャー"),
        img("File:The Rocks Sydney.jpg", 1280, 854, "ロックス", "シドニー最古の歴史地区"),
        img("File:Bondi to Coogee walk.jpg", 1280, 854, "ボンダイ〜クージー", "海岸線の絶景ウォーク"),
      ],
      SYDNEY_X,
      [
        {
          heading: "シドニーは「海と街」の二面性を歩く",
          body:
            "シドニーはオペラハウスとハーバーブリッジの印象が強いですが、歩いて面白いのはその周辺のネイバーフッドです。サリーヒルズはシドニー随一のカフェ・ダイニング地区、ニュータウンはパンクからヴィーガンまでサブカルチャーが集まる通り、ロックスはシドニー入植時代からの歴史地区、ボンダイ〜クージーコーストウォークは海沿いの絶景ルートです。\n\n" +
            "このページでは4つの街歩きルートを紹介しています。",
        },
        {
          heading: "サリーヒルズ: カフェとダイニング",
          body:
            "サリーヒルズはCBDの南東に隣接するエリアで、クラウンストリートとバークストリート周辺にスペシャルティコーヒー、多国籍レストラン、ワインバーが密集しています。シドニーで最もフーディーな空気が漂うエリアです。セントラル駅から徒歩10分。\n\n" +
            "「サリーヒルズの街歩き」でカフェとレストラン巡りのルートを紹介しています。",
        },
        {
          heading: "ニュータウン: オルタナティブカルチャー",
          body:
            "ニュータウンはキングストリートを中心としたエリアで、ヴィンテージショップ、タトゥーパーラー、ヴィーガンレストラン、ライブハウスが混在するサブカルチャーの拠点です。壁画アートも豊富で、シドニー大学の美しいキャンパスも徒歩圏内です。ニュータウン駅から徒歩すぐ。\n\n" +
            "「ニュータウンの街歩き」でキングストリートの散策ルートを紹介しています。",
        },
        {
          heading: "ロックス & ボンダイ〜クージー",
          body:
            "ロックスはシドニー最古の歴史地区で、1788年のイギリス入植時からの石造りの建物が残っています。週末のロックスマーケット、ハーバーブリッジの袂のカフェ、サーキュラーキーからオペラハウスへの散歩が楽しめます。ボンダイ〜クージーコーストウォークは約6kmの海岸線ルートで、断崖と海のパノラマが圧巻です。\n\n" +
            "「ロックスの街歩き」「ボンダイ〜クージーウォーク」でそれぞれのルートを紹介しています。",
        },
        {
          heading: "4エリアの組み合わせ",
          body:
            "サリーヒルズ→ニュータウンはバスで15分。ロックスはCBDからサーキュラーキー駅で徒歩すぐ。ボンダイへはCBDからバス333番で30分。1日で2エリアが快適です。ロックスの朝散策とボンダイコーストウォークの午後を組み合わせると、シドニーの「都市」と「自然」の両面を楽しめます。",
        },
      ],
      [
        { q: "シドニーの街歩きに最適な季節は?", a: "3月〜5月（秋）と9月〜11月（春）が気候的にベストです。夏（12月〜2月）はビーチウォークに最適ですが暑いです。" },
        { q: "ボンダイ〜クージーウォークの所要時間は?", a: "約2時間です。写真撮影やカフェ休憩を入れると3時間見てください。" },
        { q: "シドニーの公共交通は?", a: "Opalカードでバス、電車、フェリーに乗れます。ボンダイへのバスは頻繁に出ています。" },
        { q: "ロックスマーケットはいつ?", a: "毎週土日に開催されています。食品、クラフト、アクセサリーなどの露店が並びます。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Sydney Neighborhood Walks 2026 | Surry Hills, Newtown, The Rocks & Bondi",
      "Four Sydney walking routes: Surry Hills cafes, Newtown subculture, The Rocks history, and the Bondi to Coogee coastal walk. Area-by-area guide.",
      img("File:Surry Hills Sydney.jpg", 1280, 854, "Surry Hills", "Sydney's cafe and dining heartland"),
      [
        img("File:Newtown Sydney.jpg", 1280, 854, "Newtown", "Sydney's alternative culture strip"),
        img("File:The Rocks Sydney.jpg", 1280, 854, "The Rocks", "Sydney's oldest historic quarter"),
        img("File:Bondi to Coogee walk.jpg", 1280, 854, "Bondi to Coogee", "Spectacular coastal walk"),
      ],
      SYDNEY_X,
      [
        {
          heading: "Sydney walking spans city streets and ocean cliffs",
          body:
            "Sydney's appeal extends well beyond the Opera House and Harbour Bridge. Surry Hills is the city's cafe-and-dining capital. Newtown mixes punk, vegan, and vintage along one long street. The Rocks preserves colonial-era stone buildings under the harbour bridge. The Bondi to Coogee coastal walk delivers six kilometres of cliff-top ocean panoramas.\n\n" +
            "This page covers four walking routes.",
        },
        {
          heading: "Surry Hills: cafes and dining",
          body:
            "Surry Hills sits just southeast of the CBD with Crown and Bourke streets clustering specialty coffee, international restaurants, and wine bars. It is Sydney's most food-obsessed neighbourhood. Ten minutes on foot from Central Station.\n\n" +
            "The Surry Hills walk covers the cafe-and-restaurant circuit.",
        },
        {
          heading: "Newtown: alternative culture",
          body:
            "Newtown runs along King Street with vintage shops, tattoo parlours, vegan restaurants, and live music venues. Street murals are plentiful and the University of Sydney's beautiful campus is within walking distance. Step out of Newtown Station.\n\n" +
            "The Newtown walk covers the King Street strip.",
        },
        {
          heading: "The Rocks and Bondi to Coogee",
          body:
            "The Rocks is Sydney's oldest quarter, preserving stone buildings from the 1788 British settlement. Weekend Rocks Markets, harbour-bridge cafes, and the walk from Circular Quay to the Opera House fill a morning. The Bondi to Coogee coastal walk covers about six kilometres along ocean cliffs — one of Sydney's finest scenic walks.\n\n" +
            "The Rocks walk and the Bondi to Coogee walk cover each route.",
        },
        {
          heading: "Combining the four areas",
          body:
            "Surry Hills to Newtown is fifteen minutes by bus. The Rocks is a short walk from Circular Quay station. Bondi is thirty minutes from the CBD on bus 333. Two areas per day is comfortable. Morning at The Rocks plus an afternoon Bondi coastal walk mixes city history with ocean scenery.",
        },
      ],
      [
        { q: "Best season for Sydney walks?", a: "March to May (autumn) and September to November (spring) have the best weather. Summer (December-February) is ideal for beach walks but hot." },
        { q: "How long is the Bondi to Coogee walk?", a: "About two hours. Allow three with photo stops and cafe breaks." },
        { q: "How does Sydney transit work?", a: "An Opal card works on buses, trains, and ferries. Buses to Bondi run frequently." },
        { q: "When are The Rocks Markets?", a: "Every Saturday and Sunday, with food, craft, and accessory stalls." },
      ],
    ),
  },

  // ─── 13. Cape Town ──────────────────────────────────────────────
  "cape-town-neighborhood-walks": {
    ja: ja(ZA_JA_CTA,
      "ケープタウンの街歩きガイド 2026 | ボカープ・ウォーターフロント・ウッドストック",
      "ボカープのカラフルな街並み、V&Aウォーターフロント、ウッドストックのストリートアート。ケープタウンの3エリアガイドです。",
      img("File:Bo-Kaap Cape Town.jpg", 1280, 854, "ボカープ", "パステルカラーの家が並ぶ歴史地区"),
      [
        img("File:V&A Waterfront Cape Town.jpg", 1280, 854, "V&Aウォーターフロント", "テーブルマウンテンを望む港"),
        img("File:Woodstock Cape Town.jpg", 1280, 854, "ウッドストック", "ストリートアートの急成長エリア"),
        img("File:Table Mountain Cape Town.jpg", 1280, 854, "テーブルマウンテン", "ケープタウンのシンボル"),
      ],
      CAPE_TOWN_X,
      [
        {
          heading: "ケープタウンは「山と海と文化」が交差する街歩き",
          body:
            "ケープタウンはテーブルマウンテンの麓に広がる港町で、多様な文化が混在する独特の街並みを持っています。ボカープはマレー系住民のパステルカラーの家が並ぶ歴史地区、V&Aウォーターフロントは再開発された港湾エリア、ウッドストックは近年ストリートアートとクリエイティブ産業で注目されるエリアです。\n\n" +
            "このページでは3つの街歩きルートを紹介しています。",
        },
        {
          heading: "ボカープ: パステルカラーの歴史地区",
          body:
            "ボカープはシグナルヒルの斜面に広がるカラフルな住宅街で、18世紀にケープマレー人が建てた家々がパステルカラーに塗られています。ウォーリーストリートが最も写真映えするポイントで、ボカープ博物館ではこの地区の歴史を学べます。CBDから徒歩10分です。\n\n" +
            "「ボカープの街歩き」でカラフルな通りの散策ルートを紹介しています。",
        },
        {
          heading: "V&Aウォーターフロント: 港と市場",
          body:
            "V&Aウォーターフロントは旧港湾施設を再開発した複合エリアで、テーブルマウンテンとロベン島を望む絶景ポイントです。ウォーターシェッドマーケットではローカルのクラフト製品を買え、ジツ・MOCAA（現代アフリカ美術館）は穀物サイロを改装した建築自体が見どころです。\n\n" +
            "「ウォーターフロントの散策」でマーケットと美術館を巡るルートを紹介しています。",
        },
        {
          heading: "ウッドストック: ストリートアートとクリエイティブ",
          body:
            "ウッドストックはCBDの東に位置する旧工業地区で、近年アーティストやデザイナーが集まりストリートアートシーンが急成長しています。オールドビスケットミルは毎週土曜にフードマーケットが開かれ、周辺のギャラリーやスタジオも見どころです。\n\n" +
            "「ウッドストックの街歩き」でアートウォークのルートを紹介しています。日中の訪問がおすすめです。",
        },
        {
          heading: "3エリアの組み合わせ",
          body:
            "ボカープとウォーターフロントは徒歩で15分。ウッドストックはCBDからUberで10分。午前にボカープ、午後にウォーターフロント、土曜ならウッドストックのマーケットを追加するプランが効率的です。テーブルマウンテンのケーブルカーと組み合わせると1日の充実度が上がります。",
        },
      ],
      [
        { q: "ケープタウンの治安は?", a: "ボカープとウォーターフロントは安全です。ウッドストックは日中は問題ありませんが、夜間は避けてください。移動にはUberがおすすめです。" },
        { q: "ケープタウンのベストシーズンは?", a: "11月〜3月が夏で晴天が多く最適です。6月〜8月は雨季で涼しいですが、観光客が少なくお得です。" },
        { q: "テーブルマウンテンと組み合わせられますか?", a: "はい。午前中にケーブルカーでテーブルマウンテンに登り、午後にボカープやウォーターフロントを歩くプランが人気です。" },
      ],
    ),
    en: en(ZA_EN_CTA,
      "Cape Town Neighborhood Walks 2026 | Bo-Kaap, Waterfront & Woodstock",
      "Three Cape Town walking routes: Bo-Kaap's pastel houses, V&A Waterfront harbour views, and Woodstock's street art scene. Area-by-area guide.",
      img("File:Bo-Kaap Cape Town.jpg", 1280, 854, "Bo-Kaap", "Pastel-coloured houses on Signal Hill"),
      [
        img("File:V&A Waterfront Cape Town.jpg", 1280, 854, "V&A Waterfront", "Harbour with Table Mountain backdrop"),
        img("File:Woodstock Cape Town.jpg", 1280, 854, "Woodstock", "Fast-growing street art district"),
        img("File:Table Mountain Cape Town.jpg", 1280, 854, "Table Mountain", "Cape Town's iconic landmark"),
      ],
      CAPE_TOWN_X,
      [
        {
          heading: "Cape Town walks sit between mountain and sea",
          body:
            "Cape Town spreads beneath Table Mountain along a harbour coast, blending diverse cultures into a uniquely walkable city. Bo-Kaap is a historic quarter of pastel-painted Cape Malay houses on Signal Hill. The V&A Waterfront is a redeveloped harbour with markets and museums. Woodstock is an emerging creative district with street art and food markets.\n\n" +
            "This page covers three walking routes.",
        },
        {
          heading: "Bo-Kaap: pastel history district",
          body:
            "Bo-Kaap climbs Signal Hill's slope with brightly painted houses built by Cape Malay residents in the eighteenth century. Wale Street is the most photographed block. The Bo-Kaap Museum tells the neighbourhood's story. Ten minutes on foot from the CBD.\n\n" +
            "The Bo-Kaap walk covers the colourful street loop.",
        },
        {
          heading: "V&A Waterfront: harbour and market",
          body:
            "The V&A Waterfront redevelops the old harbour into a mixed-use district with views of Table Mountain and Robben Island. The Watershed market sells local crafts. Zeitz MOCAA, the Museum of Contemporary Art Africa, occupies a converted grain silo that is an architectural landmark in its own right.\n\n" +
            "The Waterfront walk covers the market-and-museum route.",
        },
        {
          heading: "Woodstock: street art and creative hub",
          body:
            "Woodstock sits east of the CBD in a former industrial zone now filling with artists and designers. The street art scene has grown rapidly. The Old Biscuit Mill hosts a Saturday food market, and surrounding galleries and studios add to the creative energy.\n\n" +
            "The Woodstock walk covers the art trail. Visit during daytime.",
        },
        {
          heading: "Combining the three areas",
          body:
            "Bo-Kaap and the Waterfront are a fifteen-minute walk apart. Woodstock is ten minutes from the CBD by Uber. Morning in Bo-Kaap, afternoon at the Waterfront, and Saturday at Woodstock's market is an efficient plan. Pair with a Table Mountain cable car ride for a packed day.",
        },
      ],
      [
        { q: "Is Cape Town safe for walking?", a: "Bo-Kaap and the Waterfront are safe. Woodstock is fine in daytime but avoid it at night. Use Uber for transport between areas." },
        { q: "Best season to visit?", a: "November to March is sunny summer. June to August is the rainy season — cooler but with fewer tourists." },
        { q: "Can I combine with Table Mountain?", a: "Yes. A popular plan is a morning cable car ride up Table Mountain, then afternoon walks in Bo-Kaap or the Waterfront." },
      ],
    ),
  },

  // ─── 14. Dubai ──────────────────────────────────────────────────
  "dubai-neighborhood-walks": {
    ja: ja(AE_JA_CTA,
      "ドバイの街歩きガイド 2026 | アルファヒディ・デイラ・ジュメイラ",
      "アルファヒディ歴史地区、デイラのゴールド&スパイススーク、ジュメイラビーチ。ドバイの3エリア街歩きガイドです。",
      img("File:Al Fahidi Dubai.jpg", 1280, 854, "アルファヒディ歴史地区", "風の塔が並ぶ伝統的な街並み"),
      [
        img("File:Dubai Gold Souk.jpg", 1280, 854, "ゴールドスーク", "金製品が並ぶ圧巻のマーケット"),
        img("File:Jumeirah Beach Dubai.jpg", 1280, 854, "ジュメイラビーチ", "ブルジュ・アル・アラブを望むビーチ"),
        img("File:Dubai Creek.jpg", 1280, 854, "ドバイクリーク", "アブラ船で渡る伝統の水路"),
      ],
      DUBAI_X,
      [
        {
          heading: "ドバイにも「歩ける旧市街」がある",
          body:
            "ドバイは超高層ビルとモールの印象が強いですが、クリーク（入り江）周辺には伝統的な街並みが残っています。アルファヒディ歴史地区はドバイ最古の住宅地で風の塔（バルジール）が並ぶ街歩きエリア、デイラのスーク群は金やスパイスが溢れる市場、ジュメイラビーチは海沿いの散歩が楽しめるエリアです。\n\n" +
            "このページでは3つの街歩きルートを紹介しています。暑い時期は朝と夕方の時間帯がおすすめです。",
        },
        {
          heading: "アルファヒディ: 風の塔と伝統建築",
          body:
            "アルファヒディ歴史地区はドバイ博物館（アルファヒディ砦）を中心に、サンゴ石と風の塔で建てられた伝統的な家屋が保存されています。小さなギャラリー、カフェ、テキスタイルスーク（布市場）が徒歩圏内にあり、近代ドバイとは全く異なる空気を体験できます。メトロのアルファヒディ駅が最寄りです。\n\n" +
            "「アルファヒディの街歩き」で歴史地区の散策ルートを紹介しています。",
        },
        {
          heading: "デイラのゴールド&スパイススーク",
          body:
            "クリークの北側デイラ地区には、ゴールドスーク（金市場）とスパイススークが隣接しています。ゴールドスークでは窓一面に金のジュエリーが並ぶ圧巻の光景が見られます。スパイススークではサフラン、カルダモン、乳香などの香りに包まれます。アルファヒディからアブラ船（渡し船、1ディルハム）でクリークを渡ってアクセスするのが風情ある行き方です。\n\n" +
            "「デイラのスーク散策」でアブラ船の乗り方とスーク巡りのルートを紹介しています。",
        },
        {
          heading: "ジュメイラビーチ: 海沿いの散歩道",
          body:
            "ジュメイラビーチはブルジュ・アル・アラブを背景にした白砂のビーチで、ビーチ沿いの遊歩道は朝夕の散歩に最適です。ジュメイラビーチレジデンス（JBR）エリアにはカフェやレストランが並び、ザ・ウォークという歩行者専用エリアでショッピングも楽しめます。\n\n" +
            "「ジュメイラビーチの散歩」で海沿いの散策ルートを紹介しています。",
        },
        {
          heading: "3エリアの組み合わせ",
          body:
            "アルファヒディとデイラはアブラ船で5分の距離です。ジュメイラビーチへはメトロまたはタクシーで30分。朝にアルファヒディ→アブラ船でデイラのスーク→午後または夕方にジュメイラビーチという流れがおすすめです。ドバイの夏（6月〜9月）は気温が45度を超えることがあるので、11月〜3月の涼しい時期が街歩きに最適です。",
        },
      ],
      [
        { q: "ドバイは暑すぎて歩けませんか?", a: "11月〜3月は気温20〜30度で快適に歩けます。夏は早朝か日没後に限定してください。" },
        { q: "アブラ船の乗り方は?", a: "クリーク沿いの船着場から乗り、対岸まで約5分。料金は1ディルハム（約40円）で現金払いです。" },
        { q: "ゴールドスークで買い物は?", a: "金のジュエリーを買う場合は価格交渉が基本です。見て歩くだけでも楽しいです。" },
      ],
    ),
    en: en(AE_EN_CTA,
      "Dubai Neighborhood Walks 2026 | Al Fahidi, Deira Souks & Jumeirah Beach",
      "Three walkable Dubai routes beyond the skyscrapers: Al Fahidi's wind towers, Deira's gold and spice souks, and Jumeirah Beach promenade.",
      img("File:Al Fahidi Dubai.jpg", 1280, 854, "Al Fahidi Historic District", "Traditional wind-tower architecture"),
      [
        img("File:Dubai Gold Souk.jpg", 1280, 854, "Gold Souk", "Dazzling gold jewellery market"),
        img("File:Jumeirah Beach Dubai.jpg", 1280, 854, "Jumeirah Beach", "Beach with Burj Al Arab view"),
        img("File:Dubai Creek.jpg", 1280, 854, "Dubai Creek", "Traditional abra water crossing"),
      ],
      DUBAI_X,
      [
        {
          heading: "Dubai has a walkable old town behind the towers",
          body:
            "Dubai is known for skyscrapers and malls, but the Creek waterfront preserves traditional streetscapes. Al Fahidi Historic District is Dubai's oldest residential area with wind-tower houses. Deira's souks overflow with gold and spices. Jumeirah Beach offers seaside walking with Burj Al Arab views.\n\n" +
            "This page covers three walking routes. In the hot months, walk early morning or after sunset.",
        },
        {
          heading: "Al Fahidi: wind towers and heritage architecture",
          body:
            "Al Fahidi Historic District centres on the Dubai Museum (Al Fahidi Fort) and preserves coral-stone houses with traditional wind towers (barjeel). Small galleries, cafes, and the Textile Souk are within walking distance. A world apart from modern Dubai. Nearest metro is Al Fahidi station.\n\n" +
            "The Al Fahidi walk covers the heritage circuit.",
        },
        {
          heading: "Deira Gold and Spice Souks",
          body:
            "On the north side of the Creek, Deira's Gold Souk and Spice Souk sit side by side. The Gold Souk's windows blaze with jewellery. The Spice Souk fills the air with saffron, cardamom, and frankincense. Cross from Al Fahidi by abra (water taxi, 1 dirham) for the atmospheric approach.\n\n" +
            "The Deira Souks walk covers abra logistics and the souk circuit.",
        },
        {
          heading: "Jumeirah Beach: seaside promenade",
          body:
            "Jumeirah Beach is a white-sand stretch with Burj Al Arab as its backdrop. The beachfront promenade is perfect for morning or sunset walks. JBR (Jumeirah Beach Residence) area has cafes, restaurants, and The Walk, a pedestrian shopping strip.\n\n" +
            "The Jumeirah Beach walk covers the coastal route.",
        },
        {
          heading: "Combining the three areas",
          body:
            "Al Fahidi and Deira are a five-minute abra ride apart. Jumeirah Beach is thirty minutes away by metro or taxi. Morning at Al Fahidi, abra to Deira souks, then afternoon or sunset at Jumeirah Beach is the recommended flow. Dubai summers (June-September) push above 45 degrees Celsius — November to March is the best walking season.",
        },
      ],
      [
        { q: "Is Dubai too hot for walking?", a: "November to March is comfortable at 20-30 degrees. In summer, limit walks to early morning or after sunset." },
        { q: "How do I take the abra?", a: "Board at any Creek-side station. The crossing takes five minutes and costs 1 dirham (about 0.30 USD). Cash only." },
        { q: "Should I buy gold at the souk?", a: "Haggling is expected if you buy. Window-shopping alone is a great experience." },
      ],
    ),
  },

  // ─── 15. Honolulu ───────────────────────────────────────────────
  "honolulu-neighborhood-walks": {
    ja: ja(HI_JA_CTA,
      "ホノルルの街歩きガイド 2026 | チャイナタウン・カイムキ・カイルア",
      "チャイナタウンのアートシーン、カイムキのグルメ通り、カイルアのビーチタウン。ホノルルの3エリア街歩きガイドです。",
      img("File:Honolulu Chinatown.jpg", 1280, 854, "ホノルル・チャイナタウン", "アートギャラリーとローカルフードの融合"),
      [
        img("File:Kaimuki Honolulu.jpg", 1280, 854, "カイムキ", "ダイヤモンドヘッドを望むグルメタウン"),
        img("File:Kailua Beach Oahu.jpg", 1280, 854, "カイルアビーチ", "エメラルドグリーンの穏やかなビーチ"),
        img("File:Aloha Tower Honolulu.jpg", 1280, 854, "アロハタワー", "ホノルル港のランドマーク"),
      ],
      HONOLULU_X,
      [
        {
          heading: "ホノルルは「ワイキキの外」に街歩きの宝庫がある",
          body:
            "ホノルルといえばワイキキビーチですが、ワイキキの外にこそ地元の空気を感じられるエリアがあります。チャイナタウンはアートギャラリーとエスニックフードが共存する下町、カイムキはダイヤモンドヘッドの麓のローカルグルメタウン、カイルアはウィンドワード側の美しいビーチタウンです。\n\n" +
            "このページでは3つの街歩きルートを紹介しています。",
        },
        {
          heading: "チャイナタウン: アートとエスニックフード",
          body:
            "ホノルルのチャイナタウンは、伝統的な中国系・ベトナム系の商店とアートギャラリーが混在するエリアです。ファーストフライデー（毎月第1金曜）にはギャラリーウォークが開催され、通り全体がアートイベントになります。ケクアナオアマーケットのフォーやバインミーはローカルの定番ランチです。\n\n" +
            "「チャイナタウンの街歩き」でアートとフードを巡るルートを紹介しています。",
        },
        {
          heading: "カイムキ: ダイヤモンドヘッド麓のグルメタウン",
          body:
            "カイムキはワイキキの東、ダイヤモンドヘッドの北麓に位置するローカルな住宅街で、ワイアラエアベニュー沿いにレストランやカフェが集まっています。観光客が少なく、地元住民が通う名店が多いエリアです。ワイキキからバスで15分。\n\n" +
            "「カイムキの街歩き」でグルメ散策のルートを紹介しています。",
        },
        {
          heading: "カイルア: ウィンドワード側のビーチタウン",
          body:
            "カイルアはオアフ島のウィンドワード（東海岸）側にあるビーチタウンで、ターコイズブルーの海と白砂のビーチが魅力です。カイルアタウンセンター周辺にはカフェ、ブティック、アサイーボウルの店が並び、ビーチと街を半日で楽しめます。ワイキキからバスで40分。\n\n" +
            "「カイルアの街歩き」でビーチとタウンの散策ルートを紹介しています。",
        },
        {
          heading: "3エリアの組み合わせ",
          body:
            "チャイナタウンとカイムキはバスで20分。カイルアへはワイキキからバスで40分かかるので、別の日に訪れるのがおすすめです。チャイナタウンの朝食→カイムキのランチという半日コースと、カイルアの1日ビーチトリップを分けるプランが効率的です。",
        },
      ],
      [
        { q: "ワイキキから各エリアへのアクセスは?", a: "チャイナタウンはバスで15分、カイムキもバスで15分、カイルアはバスで40分です。TheBusのHoloカードが便利です。" },
        { q: "ホノルルの天気は?", a: "年間を通じて温暖で、4月〜10月は乾季、11月〜3月はやや雨が多いですが、通常はにわか雨程度です。" },
        { q: "チャイナタウンの治安は?", a: "日中のギャラリーエリアとフードエリアは安全です。夜間の裏通りは避けてください。" },
      ],
    ),
    en: en(HI_EN_CTA,
      "Honolulu Neighborhood Walks 2026 | Chinatown, Kaimuki & Kailua",
      "Three Honolulu walks beyond Waikiki: Chinatown art galleries, Kaimuki local dining, and Kailua beach town. Area-by-area route guide.",
      img("File:Honolulu Chinatown.jpg", 1280, 854, "Honolulu Chinatown", "Art galleries meet local food halls"),
      [
        img("File:Kaimuki Honolulu.jpg", 1280, 854, "Kaimuki", "Diamond Head dining neighbourhood"),
        img("File:Kailua Beach Oahu.jpg", 1280, 854, "Kailua Beach", "Turquoise windward shore"),
        img("File:Aloha Tower Honolulu.jpg", 1280, 854, "Aloha Tower", "Honolulu harbour landmark"),
      ],
      HONOLULU_X,
      [
        {
          heading: "Honolulu's best walking is beyond Waikiki",
          body:
            "Waikiki Beach is the draw, but Honolulu's real neighbourhood character lives elsewhere. Chinatown mixes art galleries with ethnic food stalls. Kaimuki is a local dining strip at the foot of Diamond Head. Kailua is a windward beach town with turquoise water and a walkable centre.\n\n" +
            "This page covers three walking routes.",
        },
        {
          heading: "Chinatown: art and ethnic food",
          body:
            "Honolulu's Chinatown blends traditional Chinese and Vietnamese shops with art galleries. First Friday (the first Friday of each month) turns the streets into a gallery-walk event. Kekaulike Market's pho and banh mi are local lunch staples.\n\n" +
            "The Chinatown walk covers the art-and-food loop.",
        },
        {
          heading: "Kaimuki: Diamond Head dining strip",
          body:
            "Kaimuki sits east of Waikiki below Diamond Head. Waialae Avenue lines up with restaurants and cafes that locals favour. Tourist crowds are thin and the food scene punches above its weight. Fifteen minutes by bus from Waikiki.\n\n" +
            "The Kaimuki walk covers the food-focused route.",
        },
        {
          heading: "Kailua: windward beach town",
          body:
            "Kailua sits on Oahu's windward coast with turquoise water and white sand. Kailua Town Centre clusters cafes, boutiques, and acai bowl shops. Half a day covers both the beach and the town. Forty minutes by bus from Waikiki.\n\n" +
            "The Kailua walk covers the beach-and-town circuit.",
        },
        {
          heading: "Combining the three areas",
          body:
            "Chinatown and Kaimuki are twenty minutes apart by bus. Kailua is forty minutes from Waikiki, so it works best as a separate day trip. A morning Chinatown breakfast, then Kaimuki lunch makes a half-day loop. Save Kailua for a full beach day.",
        },
      ],
      [
        { q: "How do I get from Waikiki to each area?", a: "Chinatown is fifteen minutes by bus, Kaimuki fifteen minutes, and Kailua forty minutes. TheBus Holo card is the easiest fare option." },
        { q: "What is the weather like?", a: "Warm year-round. April to October is drier. November to March has occasional showers, usually brief." },
        { q: "Is Chinatown safe?", a: "The gallery and food areas are safe during the day. Avoid back streets at night." },
      ],
    ),
  },

  // ─── 16. Toronto ────────────────────────────────────────────────
  "toronto-neighborhood-walks": {
    ja: ja(CA_JA_CTA,
      "トロントの街歩きガイド 2026 | ケンジントン&ディスティラリー",
      "ケンジントンマーケットの多文化ミックスとディスティラリーディストリクトのヴィクトリア建築。トロントの2エリアガイドです。",
      img("File:Kensington Market Toronto.jpg", 1280, 854, "ケンジントンマーケット", "トロントの多文化が凝縮された市場"),
      [
        img("File:Distillery District Toronto.jpg", 1280, 854, "ディスティラリーディストリクト", "赤レンガの産業遺産"),
        img("File:Toronto streetcar.jpg", 1280, 854, "トロントのストリートカー", "市内を走るレトロな路面電車"),
        img("File:St. Lawrence Market Toronto.jpg", 1280, 854, "セントローレンスマーケット", "歴史ある食品マーケット"),
      ],
      TORONTO_X,
      [
        {
          heading: "トロントは「世界の縮図」を歩く街",
          body:
            "トロントは世界で最も多文化な都市のひとつで、200以上の民族が暮らしています。ケンジントンマーケットはその多様性が凝縮されたエリアで、カリブ系、中米系、アジア系、ヨーロッパ系の食材店やカフェが狭い通りにひしめいています。ディスティラリーディストリクトは19世紀の蒸留所を改装した赤レンガの複合エリアで、ギャラリーやブティックが集まっています。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。",
        },
        {
          heading: "ケンジントンマーケット: 多文化の迷路",
          body:
            "ケンジントンマーケットはスパダイナアベニューとカレッジストリートの交差点近くに広がる迷路のようなマーケットエリアです。ヴィンテージショップ、エスニック食材店、タコスタンド、ベーカリーが混在し、歩くたびに異なる文化に出会えます。毎月最終日曜はペデストリアンサンデー（歩行者天国）になることも。地下鉄スパダイナ駅から徒歩10分。\n\n" +
            "「ケンジントンマーケットの街歩き」で散策と食べ歩きのルートを紹介しています。",
        },
        {
          heading: "ディスティラリーディストリクト: 赤レンガの産業遺産",
          body:
            "ディスティラリーディストリクトは1832年創業のグッダーハム&ワーツ蒸留所跡を改装した歩行者専用エリアです。赤レンガのヴィクトリア朝産業建築が保存され、ギャラリー、ブティック、レストラン、マイクロブルワリーが入っています。冬のクリスマスマーケットは特に有名です。\n\n" +
            "「ディスティラリーディストリクトの街歩き」でアートとグルメの散策ルートを紹介しています。",
        },
        {
          heading: "2エリアの組み合わせ",
          body:
            "ケンジントンマーケットとディスティラリーディストリクトはストリートカーまたはUberで20分。午前にケンジントンで食べ歩き、午後にディスティラリーでギャラリーとビールという流れがおすすめです。セントローレンスマーケット（土曜がベスト）も近く、3カ所を1日で回ることも可能です。",
        },
      ],
      [
        { q: "トロントの街歩きに最適な季節は?", a: "6月〜9月が温暖で最適です。冬（12月〜3月）は寒いですが、ディスティラリーのクリスマスマーケットは冬の名物です。" },
        { q: "ケンジントンマーケットは日曜でも開いていますか?", a: "はい。多くの店は日曜も営業しています。毎月最終日曜のペデストリアンサンデーは特に活気があります。" },
        { q: "トロントの公共交通は?", a: "地下鉄、ストリートカー、バスがPRESTOカード1枚で利用できます。" },
      ],
    ),
    en: en(CA_EN_CTA,
      "Toronto Neighborhood Walks 2026 | Kensington Market & Distillery District",
      "Two of Toronto's most distinctive walks: Kensington Market's multicultural maze and the Distillery District's red-brick Victorian heritage.",
      img("File:Kensington Market Toronto.jpg", 1280, 854, "Kensington Market", "Toronto's multicultural melting pot"),
      [
        img("File:Distillery District Toronto.jpg", 1280, 854, "Distillery District", "Red-brick industrial heritage"),
        img("File:Toronto streetcar.jpg", 1280, 854, "Toronto streetcar", "Retro tram through the city"),
        img("File:St. Lawrence Market Toronto.jpg", 1280, 854, "St. Lawrence Market", "Historic food market"),
      ],
      TORONTO_X,
      [
        {
          heading: "Toronto walks reflect the world's cultures",
          body:
            "Toronto is one of the world's most multicultural cities, home to more than two hundred ethnicities. Kensington Market condenses that diversity into a few tight blocks of Caribbean, Latin American, Asian, and European food shops and cafes. The Distillery District repurposes a nineteenth-century distillery into a pedestrian-only zone of red-brick galleries and boutiques.\n\n" +
            "This page covers two walking routes.",
        },
        {
          heading: "Kensington Market: multicultural labyrinth",
          body:
            "Kensington Market sprawls near Spadina Avenue and College Street in a maze of vintage shops, ethnic grocers, taco stands, and bakeries. Every turn reveals a different culture. The last Sunday of each month sometimes becomes Pedestrian Sunday, closing streets to cars. Ten minutes on foot from Spadina metro.\n\n" +
            "The Kensington Market walk covers the browsing and eating route.",
        },
        {
          heading: "Distillery District: red-brick heritage",
          body:
            "The Distillery District occupies the 1832 Gooderham & Worts distillery site, now a car-free zone of preserved Victorian industrial buildings housing galleries, boutiques, restaurants, and microbreweries. The winter Christmas Market is a major draw.\n\n" +
            "The Distillery District walk covers the art-and-food loop.",
        },
        {
          heading: "Combining the two areas",
          body:
            "Kensington Market and the Distillery District are twenty minutes apart by streetcar or Uber. Morning food grazing in Kensington and afternoon galleries and beer in the Distillery is the natural flow. St. Lawrence Market (best on Saturday) is nearby, making a three-stop day possible.",
        },
      ],
      [
        { q: "Best season for Toronto walks?", a: "June through September is warm and ideal. Winter is cold, but the Distillery's Christmas Market is a seasonal highlight." },
        { q: "Is Kensington Market open on Sundays?", a: "Yes, most shops are open. The last Sunday of the month sometimes features Pedestrian Sunday events." },
        { q: "How does Toronto transit work?", a: "Subway, streetcars, and buses all use a single PRESTO card." },
      ],
    ),
  },

  // ─── 17. Cusco ──────────────────────────────────────────────────
  "cusco-neighborhood-walks": {
    ja: ja(PE_JA_CTA,
      "クスコの街歩きガイド 2026 | サンブラス&アルマス広場",
      "サンブラスの職人街とアルマス広場の歴史建築。インカの石組みが残るクスコの2エリア街歩きガイドです。",
      img("File:San Blas Cusco.jpg", 1280, 854, "サンブラス地区", "クスコの職人とアーティストの丘"),
      [
        img("File:Plaza de Armas Cusco.jpg", 1280, 854, "アルマス広場", "クスコの歴史的中心広場"),
        img("File:Cusco Inca walls.jpg", 1280, 854, "インカの石組み", "12角の石に代表される精密な石積み"),
        img("File:San Pedro Market Cusco.jpg", 1280, 854, "サンペドロ市場", "地元の食材が並ぶ中央市場"),
      ],
      CUSCO_X,
      [
        {
          heading: "クスコは「インカと植民地時代の二層」を歩く街",
          body:
            "クスコはかつてのインカ帝国の首都で、標高3,400mに位置する世界遺産都市です。スペイン植民地時代の教会や邸宅がインカの精密な石組みの上に建てられており、二つの文明が文字通り重なった街並みを歩けます。サンブラスは丘の上の職人街、アルマス広場周辺はクスコの政治・宗教の中心地です。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。高地なので到着初日はゆっくり歩きましょう。",
        },
        {
          heading: "サンブラス: 職人とアーティストの丘",
          body:
            "サンブラスはアルマス広場の北東の丘に位置する芸術家地区です。急な石段の路地沿いにセラミック工房、テキスタイルショップ、小さなカフェが並びます。サンブラス教会は南米最古の説教壇（プルピト）を持ち、広場からはクスコの赤い屋根の街並みを一望できます。\n\n" +
            "「サンブラスの街歩き」で工房巡りと眺望ポイントのルートを紹介しています。",
        },
        {
          heading: "アルマス広場: インカの石組みと大聖堂",
          body:
            "アルマス広場（プラサ・デ・アルマス）はクスコの中心で、大聖堂とラ・コンパニーア・デ・ヘスス教会が広場を囲みます。周辺の通りにはインカの精密な石組みが残り、特にハトゥンルミヨック通りの12角の石は有名です。サンペドロ市場では地元の果物やチチャモラーダ（紫トウモロコシドリンク）を試せます。\n\n" +
            "「アルマス広場周辺の街歩き」でインカの遺構巡りのルートを紹介しています。",
        },
        {
          heading: "2エリアの組み合わせと高地対策",
          body:
            "サンブラスとアルマス広場は徒歩10分ですが、標高差があるので坂道を考慮してください。午前にアルマス広場周辺を歩き、午後にサンブラスの丘を登るルートが体力的に楽です。標高3,400mなので、高山病予防にコカ茶を飲み、到着初日は激しい運動を避けてください。マチュピチュへの拠点としても、クスコで1〜2日の順応期間を設けることをおすすめします。",
        },
      ],
      [
        { q: "高山病が心配です", a: "到着初日はゆっくり行動し、水分を多く取り、コカ茶を飲みましょう。通常1〜2日で順応します。重い症状が出たら医療機関を受診してください。" },
        { q: "クスコのベストシーズンは?", a: "5月〜10月の乾季がベストです。6〜7月は夜間冷え込みますが、晴天率が高いです。" },
        { q: "クスコからマチュピチュへのアクセスは?", a: "列車でアグアスカリエンテスまで約3.5時間。またはバス+列車の組み合わせで安く行けます。" },
      ],
    ),
    en: en(PE_EN_CTA,
      "Cusco Neighborhood Walks 2026 | San Blas & Plaza de Armas",
      "Two Cusco walking routes: San Blas artisan hillside and Plaza de Armas Inca stonework. A walking guide to the former Inca capital at 3,400 metres.",
      img("File:San Blas Cusco.jpg", 1280, 854, "San Blas district", "Cusco's artisan hillside quarter"),
      [
        img("File:Plaza de Armas Cusco.jpg", 1280, 854, "Plaza de Armas", "Cusco's historic central square"),
        img("File:Cusco Inca walls.jpg", 1280, 854, "Inca walls", "Precision stonework including the twelve-angled stone"),
        img("File:San Pedro Market Cusco.jpg", 1280, 854, "San Pedro Market", "Central market with local produce"),
      ],
      CUSCO_X,
      [
        {
          heading: "Cusco layers two civilizations into every street",
          body:
            "Cusco was the capital of the Inca Empire and sits at 3,400 metres. Spanish colonial churches and mansions sit directly on top of Inca stonework, creating a cityscape where two civilizations literally stack. San Blas is the artisan hillside quarter. Plaza de Armas is the political and religious centre.\n\n" +
            "This page covers two walking routes. Take it slow on day one — altitude affects everyone.",
        },
        {
          heading: "San Blas: artisan hillside",
          body:
            "San Blas perches on the hill northeast of Plaza de Armas. Steep cobblestone lanes are lined with ceramics workshops, textile shops, and small cafes. San Blas Church holds South America's oldest carved pulpit. The plaza offers panoramic views of Cusco's terracotta rooftops.\n\n" +
            "The San Blas walk covers the workshop trail and viewpoints.",
        },
        {
          heading: "Plaza de Armas: Inca walls and cathedral",
          body:
            "Plaza de Armas is Cusco's centre, framed by the cathedral and the Jesuit church La Compania. Surrounding streets preserve Inca stonework — the twelve-angled stone on Hatunrumiyoc Street is the most famous. San Pedro Market sells fresh fruit and chicha morada (purple corn drink).\n\n" +
            "The Plaza de Armas walk covers the Inca heritage circuit.",
        },
        {
          heading: "Combining areas and altitude tips",
          body:
            "San Blas and Plaza de Armas are ten minutes apart on foot, but the hill adds effort at altitude. Walk the Plaza area in the morning and climb to San Blas in the afternoon once you have warmed up. Drink coca tea, stay hydrated, and avoid heavy exertion on arrival day. If Cusco is your Machu Picchu base, spending one to two days acclimatising in town is wise.",
        },
      ],
      [
        { q: "How bad is altitude sickness?", a: "Take it easy on day one, drink plenty of water, and try coca tea. Most people adjust in one to two days. Seek medical help for severe symptoms." },
        { q: "Best season for Cusco?", a: "May to October is the dry season. June and July nights are cold but skies are clear." },
        { q: "How do I get to Machu Picchu from Cusco?", a: "Train to Aguas Calientes takes about three and a half hours. A bus-plus-train combination is cheaper." },
      ],
    ),
  },

  // ─── 18. Auckland ───────────────────────────────────────────────
  "auckland-neighborhood-walks": {
    ja: ja(NZ_JA_CTA,
      "オークランドの街歩きガイド 2026 | ポンソンビー&ウィンヤードクォーター",
      "ポンソンビーのカフェ通りとウィンヤードクォーターのウォーターフロント。オークランドの2エリア街歩きガイドです。",
      img("File:Ponsonby Road Auckland.jpg", 1280, 854, "ポンソンビーロード", "オークランドのカフェとブティックの通り"),
      [
        img("File:Wynyard Quarter Auckland.jpg", 1280, 854, "ウィンヤードクォーター", "再開発されたウォーターフロント"),
        img("File:Auckland skyline.jpg", 1280, 854, "オークランドのスカイライン", "スカイタワーを中心とした眺望"),
        img("File:Silo Park Auckland.jpg", 1280, 854, "サイロパーク", "旧サイロを活用したイベントスペース"),
      ],
      AUCKLAND_X,
      [
        {
          heading: "オークランドは「港町の散歩」が気持ちいい",
          body:
            "オークランドはニュージーランド最大の都市で、「帆の街（City of Sails）」の愛称を持つ港町です。ポンソンビーはCBDの西に位置するカフェとブティックの通りで、オークランドのフーディーシーンの中心地。ウィンヤードクォーターは旧港湾を再開発したウォーターフロントで、レストランやマーケットが集まっています。\n\n" +
            "このページでは2つの街歩きルートを紹介しています。",
        },
        {
          heading: "ポンソンビー: カフェとブティックの通り",
          body:
            "ポンソンビーロードはオークランドで最もおしゃれな通りで、スペシャルティコーヒー、ブランチレストラン、ニュージーランドデザイナーのブティック、ヴィンテージショップが1km以上に渡って並びます。週末のブランチ文化が特に盛んで、地元のフーディーが集まるエリアです。\n\n" +
            "「ポンソンビーの街歩き」でカフェとショッピングの効率的なルートを紹介しています。",
        },
        {
          heading: "ウィンヤードクォーター: ウォーターフロントの再開発",
          body:
            "ウィンヤードクォーターはヴァイアダクトハーバーの北西に広がる再開発エリアで、旧サイロや倉庫がレストラン、バー、イベントスペースに生まれ変わっています。サイロパークでは週末にマーケットやイベントが開催され、フィッシュマーケットでは新鮮なシーフードを楽しめます。\n\n" +
            "「ウィンヤードクォーターの散策」でウォーターフロントの歩き方を紹介しています。",
        },
        {
          heading: "2エリアの組み合わせ",
          body:
            "ポンソンビーとウィンヤードクォーターは徒歩で20分、バスで10分です。午前にポンソンビーでブランチとショッピング、午後にウィンヤードクォーターで海辺の散策とシーフードという流れがおすすめです。CBDのスカイタワー展望台と組み合わせると1日プランが組めます。",
        },
      ],
      [
        { q: "オークランドの天気は?", a: "年間を通じて温暖ですが、天気が変わりやすいので折りたたみ傘と重ね着が必要です。12月〜2月の夏がベストシーズンです。" },
        { q: "オークランドの公共交通は?", a: "バスとフェリーがATのHopカードで利用できます。市内はバスが便利です。" },
        { q: "ニュージーランドのコーヒー文化は?", a: "ニュージーランドはフラットホワイトの発祥地のひとつとされ、カフェ文化が非常に発達しています。" },
      ],
    ),
    en: en(NZ_EN_CTA,
      "Auckland Neighborhood Walks 2026 | Ponsonby & Wynyard Quarter",
      "Two Auckland walking routes: Ponsonby Road's cafe-and-boutique strip and Wynyard Quarter's redeveloped waterfront. City of Sails on foot.",
      img("File:Ponsonby Road Auckland.jpg", 1280, 854, "Ponsonby Road", "Auckland's cafe and boutique strip"),
      [
        img("File:Wynyard Quarter Auckland.jpg", 1280, 854, "Wynyard Quarter", "Redeveloped waterfront precinct"),
        img("File:Auckland skyline.jpg", 1280, 854, "Auckland skyline", "Sky Tower and harbour views"),
        img("File:Silo Park Auckland.jpg", 1280, 854, "Silo Park", "Former silos turned event space"),
      ],
      AUCKLAND_X,
      [
        {
          heading: "Auckland is a harbour city made for walking",
          body:
            "Auckland, New Zealand's largest city, is known as the City of Sails for its harbour setting. Ponsonby Road is the cafe-and-boutique strip west of the CBD and the centre of Auckland's food scene. Wynyard Quarter is a redeveloped waterfront precinct with restaurants, markets, and converted industrial spaces.\n\n" +
            "This page covers two walking routes.",
        },
        {
          heading: "Ponsonby: cafes and boutiques",
          body:
            "Ponsonby Road runs over a kilometre with specialty coffee, brunch restaurants, New Zealand designer boutiques, and vintage shops. Weekend brunch culture is especially strong — this is where Auckland's foodies gather.\n\n" +
            "The Ponsonby walk covers the cafe-and-shopping loop.",
        },
        {
          heading: "Wynyard Quarter: waterfront revival",
          body:
            "Wynyard Quarter extends northwest from Viaduct Harbour, filling former silos and warehouses with restaurants, bars, and event venues. Silo Park hosts weekend markets and events. The Fish Market serves fresh seafood steps from the water.\n\n" +
            "The Wynyard Quarter walk covers the waterfront route.",
        },
        {
          heading: "Combining the two areas",
          body:
            "Ponsonby and Wynyard Quarter are twenty minutes apart on foot or ten by bus. Morning brunch and shopping in Ponsonby, afternoon waterfront strolling and seafood in Wynyard Quarter is a natural pairing. Add the Sky Tower observation deck in the CBD for a full day.",
        },
      ],
      [
        { q: "What is Auckland weather like?", a: "Mild year-round but changeable — carry a compact umbrella and dress in layers. Summer (December-February) is the best season." },
        { q: "How does Auckland transit work?", a: "Buses and ferries use the AT HOP card. Buses are the most convenient for inner-city travel." },
        { q: "Is New Zealand coffee good?", a: "New Zealand is one of the claimed birthplaces of the flat white, and cafe culture is deeply developed." },
      ],
    ),
  },
};

export const HUBS_AMERICAS_OTHERS_SLUGS = Object.keys(HUBS_AMERICAS_OTHERS_CONTENT);
