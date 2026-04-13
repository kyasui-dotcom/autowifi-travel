import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Central/South America & additional North America walking-guide articles.
// 20 neighbourhood-level routes for cities in the Americas (batch 2).

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

const CO_JA_CTA = {
  ctaTitle: "コロンビア旅行の通信をもっと楽に",
  ctaButton: "コロンビアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const CO_EN_CTA = {
  ctaTitle: "Stay connected in Colombia",
  ctaButton: "View Colombia eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const CU_JA_CTA = {
  ctaTitle: "キューバ旅行の通信をもっと楽に",
  ctaButton: "キューバのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const CU_EN_CTA = {
  ctaTitle: "Stay connected in Cuba",
  ctaButton: "View Cuba eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

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

const BUENOS_AIRES_X: GuideXEmbed[] = [
  { url: "https://x.com/turaborteño", label: "@turaborteño" },
  { url: "https://x.com/BuenosAires", label: "@BuenosAires" },
];
const LIMA_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitPeru", label: "@VisitPeru" },
  { url: "https://x.com/MuniLima", label: "@MuniLima" },
];
const BOGOTA_X: GuideXEmbed[] = [
  { url: "https://x.com/BogotaDC", label: "@BogotaDC" },
  { url: "https://x.com/Colombia_Travel", label: "@Colombia_Travel" },
];
const HAVANA_X: GuideXEmbed[] = [
  { url: "https://x.com/CubaTravel", label: "@CubaTravel" },
  { url: "https://x.com/HavanaLive", label: "@HavanaLive" },
];
const LA_X: GuideXEmbed[] = [
  { url: "https://x.com/discoverLA", label: "@discoverLA" },
  { url: "https://x.com/LATimes", label: "@LATimes" },
];
const BOSTON_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitBoston", label: "@VisitBoston" },
  { url: "https://x.com/bosaborhood", label: "@bosaborhood" },
];
const MONTREAL_X: GuideXEmbed[] = [
  { url: "https://x.com/Montreal", label: "@Montreal" },
  { url: "https://x.com/TourismeMtl", label: "@TourismeMtl" },
];
const HONOLULU_X: GuideXEmbed[] = [
  { url: "https://x.com/gaborhawaii", label: "@gaborhawaii" },
  { url: "https://x.com/HawaiiHTA", label: "@HawaiiHTA" },
];

// ═══════════════════════════════════════════════════════════════════
// Content
// ═══════════════════════════════════════════════════════════════════

export const AMERICAS_2_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ─── 1. Buenos Aires — San Telmo ──────────────────────────────────
  "buenos-aires-san-telmo-walk": {
    ja: ja(AR_JA_CTA,
      "サンテルモの日曜市とアンティーク通り",
      "ブエノスアイレス最古の街サンテルモを歩き、日曜蚤の市とアンティークショップ、タンゴの息吹を感じるルートガイド。",
      img("File:Feria de San Telmo.jpg", 1280, 854, "サンテルモの日曜市", "毎週日曜に開かれるブエノスアイレス最大の蚤の市"),
      [
        img("File:Plaza Dorrego Buenos Aires.jpg", 1280, 854, "ドレーゴ広場", "アンティーク市のメイン会場"),
        img("File:Mercado de San Telmo.jpg", 1280, 854, "サンテルモ市場", "1897年築の鉄骨アーチ市場"),
        img("File:Tango en San Telmo.jpg", 1280, 854, "路上タンゴ", "広場で踊るタンゴダンサーたち"),
        img("File:Iglesia de San Pedro Telmo.jpg", 1280, 854, "サンペドロテルモ教会", "18世紀のバロック教会"),
        img("File:Calle Defensa Buenos Aires.jpg", 1280, 854, "デフェンサ通り", "アンティークショップが並ぶメインストリート"),
      ],
      BUENOS_AIRES_X,
      [
        { heading: "このルートの特徴", body: "サンテルモはブエノスアイレスで最も古い地区のひとつで、石畳の通りにコロニアル建築が並びます。毎週日曜に開催されるフェリア・デ・サンテルモは南米最大級の蚤の市で、アンティーク家具、銀細工、レコード、手作りアクセサリーが所狭しと並びます。路上ではタンゴのパフォーマンスが繰り広げられ、カフェのテラスから眺めるだけでも十分楽しめます。" },
        { heading: "アクセスと起点", body: "地下鉄C線サンフアン駅から徒歩5分。デフェンサ通りを南下するルートが定番です。起点はサンテルモ市場がおすすめで、1897年に建てられた鉄骨アーチの建物内にはチーズ、ワイン、エンパナーダなどの屋台が集まっています。市場で軽く腹ごしらえしてから散策を始めましょう。" },
        { heading: "主要スポット", body: "ドレーゴ広場はフェリアの中心で、アンティーク食器や古書が見つかります。広場周辺ではタンゴダンサーのパフォーマンスが頻繁に行われ、チップを渡せば一緒に写真も撮れます。デフェンサ通り沿いにはアンティークショップやギャラリーが軒を連ね、交渉次第で掘り出し物も。サンペドロテルモ教会は18世紀のバロック建築で、静かな内部は散策の休憩にぴったりです。" },
        { heading: "時間帯とタイミング", body: "日曜市は10時頃から17時頃まで。午前中は比較的空いており、ゆっくり品定めできます。平日はフェリアがないため観光客が少なく、カフェやアンティークショップをじっくり回れます。夕方にはミロンガ（タンゴダンスホール）が開き始めるので、夜まで滞在するのもおすすめです。" },
        { heading: "実用情報", body: "デフェンサ通りは日曜に歩行者天国になります。スリが多いのでバッグは前に抱え、貴重品は分散して持ちましょう。トイレはサンテルモ市場内が便利です。現金はアルゼンチンペソが必要ですが、最近はカード決済対応の店も増えています。eSIMがあれば地図アプリや翻訳アプリを常時使えて安心です。" },
      ],
      [
        { q: "サンテルモの日曜市は何時から?", a: "10時頃から17時頃まで開催されています。午前中が比較的空いていて歩きやすいです。" },
        { q: "アンティークの値段交渉はできる?", a: "はい、特に高額商品は交渉が一般的です。スペイン語ができなくても電卓を使えば大丈夫です。" },
        { q: "治安は大丈夫?", a: "日中の観光エリアは問題ありません。日曜市はスリに注意し、貴重品は前ポケットに入れましょう。" },
        { q: "所要時間は?", a: "日曜市込みで3〜4時間。カフェやタンゴ鑑賞を入れると半日は楽しめます。" },
      ],
    ),
    en: en(AR_EN_CTA,
      "San Telmo Sunday Market and Antique Quarter Walk",
      "Stroll through Buenos Aires' oldest barrio — Sunday flea market, tango in the streets, and antique treasures along Calle Defensa.",
      img("File:Feria de San Telmo.jpg", 1280, 854, "San Telmo Sunday Market", "Buenos Aires' largest weekly flea market"),
      [
        img("File:Plaza Dorrego Buenos Aires.jpg", 1280, 854, "Plaza Dorrego", "Main antique market square"),
        img("File:Mercado de San Telmo.jpg", 1280, 854, "San Telmo Market", "1897 iron-arch market hall"),
        img("File:Tango en San Telmo.jpg", 1280, 854, "Street tango", "Dancers performing in the plaza"),
        img("File:Iglesia de San Pedro Telmo.jpg", 1280, 854, "San Pedro Telmo Church", "18th-century baroque church"),
        img("File:Calle Defensa Buenos Aires.jpg", 1280, 854, "Calle Defensa", "Antique-shop-lined main street"),
      ],
      BUENOS_AIRES_X,
      [
        { heading: "What makes this route special", body: "San Telmo is one of the oldest neighbourhoods in Buenos Aires, defined by cobblestone streets and crumbling colonial facades. Every Sunday, Calle Defensa transforms into the Feria de San Telmo, one of South America's largest flea markets, where silverware, vinyl records, vintage furniture, and handmade jewellery spill across dozens of blocks. Tango dancers perform on Plaza Dorrego while café terraces fill with mate-sipping locals. On weekdays the feria is gone, but antique shops and quiet cafés keep the charm alive." },
        { heading: "Getting there and starting point", body: "Take Subte Line C to San Juan station, then walk five minutes south to Calle Defensa. A good starting point is Mercado de San Telmo, a gorgeous 1897 iron-arch market hall housing cheese vendors, wine bars, and empanada stalls. Fuel up here before heading south along Defensa toward Plaza Dorrego." },
        { heading: "Key stops", body: "Plaza Dorrego is the heart of the Sunday feria — antique china, old books, and impromptu tango shows. Along Defensa, antique dealers welcome browsing and prices are negotiable on bigger items. The Church of San Pedro Telmo dates to the 1700s and its cool interior offers a break from the crowd. Mercado de San Telmo is worth a second visit for an afternoon glass of Malbec and a choripán." },
        { heading: "Best times to visit", body: "The Sunday market runs roughly 10 am to 5 pm; arrive before noon to beat the crowds. Weekdays are quieter and better for serious antique shopping. Evening is the time for milongas — tango dance halls that open around 8 pm. Late November through February is Buenos Aires' summer and the busiest tourist season." },
        { heading: "Practical tips", body: "Defensa becomes pedestrian-only on Sundays. Pickpockets work the crowds, so keep bags in front and split valuables. Restrooms are easiest in Mercado de San Telmo. Most shops accept cards, but some feria vendors are cash-only. An eSIM keeps your maps and translation apps running smoothly all day." },
      ],
      [
        { q: "What time does the Sunday market open?", a: "Roughly 10 am to 5 pm. Mornings are less crowded and more pleasant for browsing." },
        { q: "Can I haggle at the feria?", a: "Yes, especially on higher-value items. Vendors expect some negotiation." },
        { q: "Is San Telmo safe?", a: "The tourist area is safe by day. Watch for pickpockets on Sundays and stick to well-lit streets at night." },
        { q: "How long does the walk take?", a: "Three to four hours with the market. Add time for café stops and tango watching." },
      ],
    ),
  },

  // ─── 2. Buenos Aires — Palermo Soho ───────────────────────────────
  "buenos-aires-palermo-soho-walk": {
    ja: ja(AR_JA_CTA,
      "パレルモソーホーのカフェとブティック",
      "ブエノスアイレスのパレルモソーホーを歩き、おしゃれカフェ、デザイナーズブティック、ストリートアートを楽しむルートガイド。",
      img("File:Palermo Soho Buenos Aires.jpg", 1280, 854, "パレルモソーホー", "緑豊かな通りにカフェとブティックが並ぶ"),
      [
        img("File:Plaza Serrano Buenos Aires.jpg", 1280, 854, "セラーノ広場", "週末はデザインフェアが開かれる広場"),
        img("File:Street art Palermo Buenos Aires.jpg", 1280, 854, "ストリートアート", "壁面を彩る大型ミューラル"),
        img("File:Jardin Botanico Buenos Aires.jpg", 1280, 960, "植物園", "パレルモの緑のオアシス"),
        img("File:Armenia Street Palermo.jpg", 1280, 854, "アルメニア通り", "デザイナーズショップが集まる通り"),
        img("File:Cafe Palermo Buenos Aires.jpg", 1280, 854, "カフェ文化", "サードウェーブコーヒーの人気店"),
      ],
      BUENOS_AIRES_X,
      [
        { heading: "このルートの特徴", body: "パレルモソーホーはブエノスアイレスで最もトレンディなエリアで、並木道にアルゼンチン発のデザイナーズブティック、サードウェーブコーヒー、クラフトビアバーが集まっています。セラーノ広場（コルタサル広場）を中心に、週末にはデザインフェアが開かれ、アクセサリーや革製品のハンドメイド品が並びます。路地裏には大型のストリートアートが多く、街全体がアウトドアギャラリーのようです。" },
        { heading: "アクセスと起点", body: "地下鉄D線プラサイタリア駅から徒歩10分。バスなら39番や55番がパレルモソーホー中心部を通ります。起点はセラーノ広場がおすすめで、広場のカフェでコーヒーを飲んでから散策を始めると効率的です。ホンジュラス通りとアルメニア通りの交差点周辺が最もショップが密集しています。" },
        { heading: "主要スポット", body: "セラーノ広場の週末フェアではアルゼンチンデザイナーの革製品やシルバーアクセサリーが手に入ります。ホンジュラス通り沿いのブティックではローカルブランドの洋服やインテリア雑貨を扱う店が多く、日本未上陸のブランドも多数。植物園は入場無料で、散策の休憩に最適です。夕方以降はカクテルバーやレストランが賑わい、アルゼンチンワインとパリージャ（BBQ）を楽しめます。" },
        { heading: "時間帯とタイミング", body: "ショップは11時頃から開き始め、カフェは9時頃から。週末のセラーノ広場フェアは10時〜18時頃。ストリートアート撮影は午前中の柔らかい光がベスト。ディナーはアルゼンチン式に21時以降が本番で、予約なしでも入れる店が多いです。" },
        { heading: "実用情報", body: "パレルモソーホーはコンパクトで全て徒歩圏内です。カード決済が広く普及しており、ブティックやカフェではほぼ全てカードが使えます。トイレはカフェ利用時に借りるのが一般的。日差しが強いので帽子とサングラスがあると便利です。eSIMがあればInstagramへのリアルタイム投稿やGoogleマップでのショップ検索がスムーズです。" },
      ],
      [
        { q: "パレルモソーホーの治安は?", a: "日中は安全で観光客も多いです。夜間もレストラン通りは人通りがありますが、裏路地は避けましょう。" },
        { q: "おすすめのお土産は?", a: "アルゼンチンレザーの小物、マテ茶セット、ローカルデザイナーのアクセサリーが人気です。" },
        { q: "英語は通じる?", a: "観光エリアのカフェやブティックでは英語対応のスタッフがいることが多いです。" },
        { q: "所要時間は?", a: "ショッピングとカフェ込みで3〜4時間。ディナーまで含めると半日コースです。" },
      ],
    ),
    en: en(AR_EN_CTA,
      "Palermo Soho Café and Boutique Walk",
      "Wander Buenos Aires' trendiest barrio — designer boutiques, specialty coffee, and street art murals across Palermo Soho.",
      img("File:Palermo Soho Buenos Aires.jpg", 1280, 854, "Palermo Soho", "Tree-lined streets filled with cafés and boutiques"),
      [
        img("File:Plaza Serrano Buenos Aires.jpg", 1280, 854, "Plaza Serrano", "Weekend design fair in the main square"),
        img("File:Street art Palermo Buenos Aires.jpg", 1280, 854, "Street art", "Large-scale murals on building walls"),
        img("File:Jardin Botanico Buenos Aires.jpg", 1280, 960, "Botanical Garden", "Palermo's green oasis"),
        img("File:Armenia Street Palermo.jpg", 1280, 854, "Armenia Street", "Designer shop hub"),
        img("File:Cafe Palermo Buenos Aires.jpg", 1280, 854, "Café culture", "Third-wave coffee favourite"),
      ],
      BUENOS_AIRES_X,
      [
        { heading: "What makes this route special", body: "Palermo Soho is Buenos Aires at its most fashionable. Tree-lined streets host Argentine designer boutiques, third-wave coffee roasters, craft-beer taprooms, and some of the city's best restaurants. Plaza Serrano — officially Plaza Cortázar — becomes a weekend design fair selling handmade leather goods, jewellery, and ceramics. Every other wall carries a large-scale mural, turning the neighbourhood into an open-air gallery. It is walkable, photogenic, and easy to lose half a day in." },
        { heading: "Getting there and starting point", body: "Subte Line D to Plaza Italia, then a ten-minute walk south. Buses 39 and 55 cut through the centre of Palermo Soho. Start at Plaza Serrano for a coffee on the terrace, then branch out along Honduras and Armenia streets where boutiques are densest." },
        { heading: "Key stops", body: "The Plaza Serrano weekend fair has handcrafted leather bags and silver accessories at fair prices. Boutiques along Honduras Street stock Argentine labels not found overseas — great for unique fashion finds. The Botanical Garden is free and provides a leafy break. As evening arrives, cocktail bars and parrilla restaurants come alive; a glass of Malbec and grilled provoleta is the perfect end." },
        { heading: "Best times to visit", body: "Shops open around 11 am, cafés by 9 am. The Plaza Serrano fair runs weekends roughly 10 am to 6 pm. Morning light is best for street-art photography. Dinner in Argentina starts late — 9 pm onward — and most restaurants accept walk-ins." },
        { heading: "Practical tips", body: "Palermo Soho is compact and entirely walkable. Cards are accepted almost everywhere. Use café restrooms. Bring sunscreen and sunglasses — Buenos Aires sun is strong. An eSIM keeps your Instagram uploads and Google Maps searches running smoothly." },
      ],
      [
        { q: "Is Palermo Soho safe?", a: "Very safe during the day with lots of foot traffic. Restaurant streets are lively at night; avoid dark side streets." },
        { q: "Best souvenirs?", a: "Argentine leather goods, mate tea sets, and accessories from local designers." },
        { q: "Is English spoken?", a: "Most cafés and boutiques in the tourist area have English-speaking staff." },
        { q: "How long does the walk take?", a: "Three to four hours for shopping and coffee. Half a day if you stay for dinner." },
      ],
    ),
  },

  // ─── 3. Buenos Aires — La Boca ────────────────────────────────────
  "buenos-aires-la-boca-walk": {
    ja: ja(AR_JA_CTA,
      "ラ・ボカのカミニートとカラフル散策",
      "ブエノスアイレスのラ・ボカ地区を歩き、カラフルなカミニート通りとリバープレートの風景を楽しむルートガイド。",
      img("File:Caminito-overview.jpg", 1280, 854, "カミニート", "カラフルなトタン屋根の建物が並ぶ名所"),
      [
        img("File:La Boca Buenos Aires colorful houses.jpg", 1280, 854, "カラフルな家々", "ペンキ塗りのトタン建築"),
        img("File:La Bombonera stadium.jpg", 1280, 854, "ラ・ボンボネーラ", "ボカ・ジュニアーズの本拠地スタジアム"),
        img("File:Fundacion Proa Buenos Aires.jpg", 1280, 854, "プロア財団", "河畔の現代美術館"),
        img("File:Riachuelo Buenos Aires.jpg", 1280, 854, "リアチュエロ川", "ラ・ボカを流れる運河"),
        img("File:Tango La Boca.jpg", 1280, 854, "タンゴパフォーマンス", "カミニートの路上タンゴ"),
      ],
      BUENOS_AIRES_X,
      [
        { heading: "このルートの特徴", body: "ラ・ボカは19世紀にイタリア移民が築いた港湾労働者の街で、船のペンキの余りで家を塗ったことからカラフルなトタン建築が生まれました。カミニート通りは野外美術館のような観光名所で、タンゴダンサーのパフォーマンスや土産物屋が並びます。サッカーファンにはボカ・ジュニアーズの本拠地ラ・ボンボネーラスタジアムも必見です。" },
        { heading: "アクセスと起点", body: "中心部からバス29番、64番、152番でラ・ボカへ。地下鉄は通っていないためバスかタクシーが一般的です。カミニートの入口が起点で、リアチュエロ川沿いに散策するルートがおすすめです。サンテルモからタクシーで10分ほどの距離なので、セットで回ると効率的です。" },
        { heading: "主要スポット", body: "カミニートは約200メートルの短い通りですが、フォトジェニックなスポットが凝縮されています。プロア財団はリアチュエロ川沿いの現代美術館で、企画展の質が高くカフェテラスからの眺めも抜群。ラ・ボンボネーラではスタジアムツアーが毎日開催されており、ボカ・ジュニアーズの歴史を学べます。カミニート周辺のレストランではアルゼンチンステーキとワインが楽しめます。" },
        { heading: "時間帯とタイミング", body: "午前10時〜15時頃の訪問がベスト。日光の下でカラフルな建物が映えます。試合日はスタジアム周辺が混雑するので、サッカー観戦しないなら避けた方が無難です。平日は観光客が少なく写真撮影に向いています。" },
        { heading: "実用情報", body: "ラ・ボカの観光エリアはカミニート周辺に限られます。観光ゾーンの外は治安が悪いので、カミニートとプロア財団周辺から出ないようにしましょう。帰りはタクシーかUberが安全です。トイレはプロア財団やレストランで借りられます。eSIMがあればUber配車や地図確認がスムーズです。" },
      ],
      [
        { q: "ラ・ボカは安全?", a: "カミニート周辺の観光エリアは日中安全です。ただし観光ゾーン外は治安が悪いので外れないでください。夜間の訪問は避けましょう。" },
        { q: "カミニートの入場料は?", a: "通り自体は無料です。プロア財団は有料ですがリーズナブルです。" },
        { q: "スタジアムツアーの予約は必要?", a: "当日参加も可能ですが、公式サイトでの事前予約が確実です。試合日はツアーが中止になることがあります。" },
        { q: "所要時間は?", a: "カミニートとプロア財団で2〜3時間。スタジアムツアーを含めると半日です。" },
      ],
    ),
    en: en(AR_EN_CTA,
      "La Boca's Caminito and Colourful Quarter Walk",
      "Explore Buenos Aires' most photogenic neighbourhood — Caminito's painted houses, riverside art, and the home of Boca Juniors.",
      img("File:Caminito-overview.jpg", 1280, 854, "Caminito", "Iconic colourful corrugated-iron houses"),
      [
        img("File:La Boca Buenos Aires colorful houses.jpg", 1280, 854, "Colourful houses", "Painted corrugated iron in La Boca"),
        img("File:La Bombonera stadium.jpg", 1280, 854, "La Bombonera", "Boca Juniors' home stadium"),
        img("File:Fundacion Proa Buenos Aires.jpg", 1280, 854, "Fundación Proa", "Riverside contemporary art museum"),
        img("File:Riachuelo Buenos Aires.jpg", 1280, 854, "Riachuelo River", "The canal that defines La Boca"),
        img("File:Tango La Boca.jpg", 1280, 854, "Tango performance", "Street dancers on Caminito"),
      ],
      BUENOS_AIRES_X,
      [
        { heading: "What makes this route special", body: "La Boca was built by Italian dockworkers in the nineteenth century who painted their corrugated-iron houses with leftover ship paint, creating Buenos Aires' most colourful streetscape. Caminito, a short pedestrian street, is an open-air museum of murals, tango shows, and souvenir stalls. Football fans will know it as the home of Boca Juniors, whose La Bombonera stadium pulses with passion on match days." },
        { heading: "Getting there and starting point", body: "No Subte line reaches La Boca, so take bus 29, 64, or 152 from the centre, or grab a taxi from San Telmo — about ten minutes. Start at the Caminito entrance and follow the riverfront path. Combining La Boca with San Telmo in one day is efficient." },
        { heading: "Key stops", body: "Caminito is only about 200 metres long but packed with colour and photo ops. Fundación Proa is a riverside contemporary art museum with excellent rotating exhibitions and a rooftop café with views of the Riachuelo. La Bombonera offers daily stadium tours covering Boca Juniors history. Restaurants around Caminito serve Argentine steak and Malbec at tourist-friendly prices." },
        { heading: "Best times to visit", body: "Visit between 10 am and 3 pm for the best light on the colourful facades. Weekdays are quieter and better for photography. Avoid match days if you are not attending a game, as the area gets very crowded. Summer (December to February) brings the strongest colours under clear skies." },
        { heading: "Practical tips", body: "The safe tourist zone is strictly around Caminito and Fundación Proa — do not wander beyond it, as surrounding streets are rough. Take a taxi or Uber back rather than walking. Restrooms are in Fundación Proa and restaurants. An eSIM makes hailing an Uber and checking maps easy." },
      ],
      [
        { q: "Is La Boca safe?", a: "The Caminito tourist zone is safe during the day. Do not stray outside it, and avoid visiting at night." },
        { q: "Is Caminito free?", a: "The street itself is free. Fundación Proa charges a modest admission fee." },
        { q: "Do I need to book the stadium tour?", a: "Walk-ups are possible, but booking online is recommended. Tours are cancelled on match days." },
        { q: "How long does the walk take?", a: "Two to three hours for Caminito and Proa. Half a day with the stadium tour." },
      ],
    ),
  },

  // ─── 4. Lima — Barranco ───────────────────────────────────────────
  "lima-barranco-walk": {
    ja: ja(PE_JA_CTA,
      "バランコの崖上カフェとストリートアート",
      "リマのボヘミアン地区バランコを歩き、崖上のカフェ、ため息の橋、ストリートアートを巡るルートガイド。",
      img("File:Puente de los Suspiros Lima.jpg", 1280, 854, "ため息の橋", "バランコのシンボル的な木造橋"),
      [
        img("File:Bajada de Baños Lima.jpg", 1280, 854, "バーニョスの坂道", "太平洋へ下る石畳の坂"),
        img("File:Street art Barranco Lima.jpg", 1280, 854, "ストリートアート", "壁面を覆うカラフルな壁画"),
        img("File:Parque Municipal Barranco.jpg", 1280, 854, "市立公園", "コロニアル建築に囲まれた広場"),
        img("File:MATE Museo Mario Testino.jpg", 1280, 854, "MATE美術館", "写真家マリオ・テスティーノの美術館"),
        img("File:Malecon Barranco Lima.jpg", 1280, 854, "マレコン遊歩道", "崖上から太平洋を望む散歩道"),
      ],
      LIMA_X,
      [
        { heading: "このルートの特徴", body: "バランコはリマの南に位置するボヘミアンな海辺の地区で、アーティストや作家に愛されてきた歴史があります。崖の上に広がる通りにはカラフルなコロニアル建築が並び、壁面いっぱいのストリートアートが街を彩ります。ため息の橋（プエンテ・デ・ロス・スシピロス）はロマンチックな伝説で知られる木造橋で、バランコの象徴です。崖上のカフェからは太平洋の絶景が楽しめます。" },
        { heading: "アクセスと起点", body: "ミラフローレスからバスまたはタクシーで約10分。メトロポリターノのバス停からも徒歩圏内です。起点は市立公園（パルケ・ムニシパル）がおすすめで、周囲にはカフェやレストランが集まっています。公園からため息の橋へ向かい、そこからバーニョスの坂を下って海辺へ出るルートが定番です。" },
        { heading: "主要スポット", body: "ため息の橋は息を止めて渡りきると願いが叶うという伝説で有名。MATE美術館は世界的写真家マリオ・テスティーノのコレクションを展示する美しい邸宅美術館です。バーニョスの坂道は石畳の両脇にストリートアートが広がり、坂を下ると太平洋に面したサーフスポットに出ます。崖上のマレコン遊歩道からはサンセットが美しいです。" },
        { heading: "時間帯とタイミング", body: "午前中はストリートアート撮影に最適な光。午後はカフェでのんびり過ごし、夕方はマレコンからのサンセットがハイライト。週末の夜はバーやライブハウスが賑わいます。リマの冬（6〜9月）は曇りが多いですが、それはそれで霧に包まれた幻想的な雰囲気があります。" },
        { heading: "実用情報", body: "バランコはコンパクトで全て徒歩で回れます。坂道があるので歩きやすい靴を。トイレはカフェやMATE美術館が便利。現金を少額持っておくとストリートベンダーからの買い物に便利です。eSIMがあれば地図アプリとUber配車が常時使えて安心です。" },
      ],
      [
        { q: "バランコの治安は?", a: "リマの中でも安全なエリアです。日中の観光は問題ありません。夜間も中心部は人通りがありますが、暗い路地は避けましょう。" },
        { q: "ミラフローレスからの行き方は?", a: "タクシーかUberで約10分、200円程度です。バスでも行けます。" },
        { q: "おすすめのカフェは?", a: "崖上のマレコン沿いに複数のカフェがあり、太平洋を眺めながらペルーコーヒーを楽しめます。" },
        { q: "所要時間は?", a: "主要スポットを回るだけなら2〜3時間。カフェやアート鑑賞を入れると半日です。" },
      ],
    ),
    en: en(PE_EN_CTA,
      "Barranco Clifftop Cafés and Street Art Walk",
      "Explore Lima's bohemian beach district — the Bridge of Sighs, ocean-view cafés, and murals around every corner in Barranco.",
      img("File:Puente de los Suspiros Lima.jpg", 1280, 854, "Bridge of Sighs", "Barranco's iconic wooden footbridge"),
      [
        img("File:Bajada de Baños Lima.jpg", 1280, 854, "Bajada de Baños", "Cobblestone path to the Pacific"),
        img("File:Street art Barranco Lima.jpg", 1280, 854, "Street art", "Murals covering Barranco's walls"),
        img("File:Parque Municipal Barranco.jpg", 1280, 854, "Municipal Park", "Plaza surrounded by colonial buildings"),
        img("File:MATE Museo Mario Testino.jpg", 1280, 854, "MATE Museum", "Mario Testino photography museum"),
        img("File:Malecon Barranco Lima.jpg", 1280, 854, "Malecón promenade", "Clifftop path with Pacific views"),
      ],
      LIMA_X,
      [
        { heading: "What makes this route special", body: "Barranco is Lima's bohemian seaside neighbourhood, long loved by artists and writers. Colourful colonial houses line clifftop streets, every wall seems to carry a mural, and the Puente de los Suspiros — the Bridge of Sighs — adds a dash of romance. Cafés perched on the bluffs offer Pacific sunsets with Peruvian coffee, and the MATE museum showcases world-class photography in a restored mansion. It feels like a village within the city." },
        { heading: "Getting there and starting point", body: "From Miraflores, a taxi or Uber takes about ten minutes. Metropolitano bus stops are within walking distance. Start at Parque Municipal, the main square surrounded by cafés, then walk to the Bridge of Sighs and down the Bajada de Baños cobblestone path toward the ocean." },
        { heading: "Key stops", body: "Legend says if you hold your breath crossing the Bridge of Sighs, your wish comes true. MATE, the Mario Testino museum, displays stunning fashion and portrait photography in a beautiful colonial house. The Bajada de Baños path is flanked by street art and leads to a surf break at the bottom. The Malecón promenade along the clifftop is ideal for sunset watching." },
        { heading: "Best times to visit", body: "Mornings offer the best light for street-art photos. Afternoons are for café hopping. Sunset from the Malecón is the highlight. Weekend evenings bring live music at bars and peñas. Lima's winter (June to September) is grey and misty, lending an atmospheric charm." },
        { heading: "Practical tips", body: "Barranco is compact and walkable but hilly — wear comfortable shoes. Restrooms are in cafés and MATE. Carry a little cash for street vendors. An eSIM keeps maps and Uber working all day." },
      ],
      [
        { q: "Is Barranco safe?", a: "One of Lima's safest districts. Daytime is fine; stick to main streets at night." },
        { q: "How do I get from Miraflores?", a: "Taxi or Uber, about ten minutes and very affordable." },
        { q: "Any café recommendations?", a: "Several clifftop cafés along the Malecón serve excellent Peruvian coffee with ocean views." },
        { q: "How long does the walk take?", a: "Two to three hours for the main sights. Half a day with café and museum time." },
      ],
    ),
  },

  // ─── 5. Lima — Miraflores Coastal ─────────────────────────────────
  "lima-miraflores-coastal-walk": {
    ja: ja(PE_JA_CTA,
      "ミラフローレスの海岸遊歩道散策",
      "リマのミラフローレス地区で太平洋沿いの遊歩道を歩き、崖上の公園とショッピングを楽しむルートガイド。",
      img("File:Larcomar Lima.jpg", 1280, 854, "ラルコマール", "崖に埋め込まれたショッピングモール"),
      [
        img("File:Parque del Amor Lima.jpg", 1280, 854, "恋人たちの公園", "ガウディ風モザイクベンチと彫刻"),
        img("File:Malecon de Miraflores.jpg", 1280, 854, "マレコン遊歩道", "太平洋を望む崖上の散歩道"),
        img("File:Huaca Pucllana Lima.jpg", 1280, 960, "ワカ・プクヤーナ", "市街地に残る古代遺跡"),
        img("File:Parque Kennedy Lima.jpg", 1280, 854, "ケネディ公園", "猫が集まるミラフローレスの中心公園"),
        img("File:Paragliding Miraflores Lima.jpg", 1280, 854, "パラグライダー", "崖からのタンデムフライト"),
      ],
      LIMA_X,
      [
        { heading: "このルートの特徴", body: "ミラフローレスはリマの高級住宅地で、太平洋に面した崖上に約10kmの遊歩道マレコンが延びています。崖に埋め込まれたショッピングモール・ラルコマール、ガウディ風モザイクベンチのある恋人たちの公園、パラグライダーの発着点など見どころが連続。住宅街の真ん中には紀元5世紀のアドベ遺跡ワカ・プクヤーナがそびえ、古代と現代が共存する不思議な景観を楽しめます。" },
        { heading: "アクセスと起点", body: "メトロポリターノのリカルド・パルマ駅から徒歩10分。空港からタクシーで約45分です。起点はケネディ公園が便利で、カフェやレストランが集中しています。公園から海に向かって歩き、ラルコマールを経由してマレコン遊歩道を南に進むルートがおすすめです。" },
        { heading: "主要スポット", body: "ラルコマールは崖の中に建設されたユニークなモールで、レストランやショップから太平洋が見渡せます。恋人たちの公園はカラフルなモザイクベンチが並ぶフォトスポット。パラグライダーのタンデムフライト（約15分、50〜70ドル）は崖上から飛び立ち上空から海岸線を一望できます。ワカ・プクヤーナは夜間ライトアップされ、併設レストランでのディナーも人気です。" },
        { heading: "時間帯とタイミング", body: "マレコン散歩は午前中の涼しい時間帯か夕方のサンセット時がベスト。パラグライダーは風の安定する午後2時〜5時が最適。ワカ・プクヤーナの夜間ツアーは水〜日曜に開催。週末のケネディ公園ではアートフェアが開かれることもあります。" },
        { heading: "実用情報", body: "マレコンは平坦で歩きやすく、ジョギングやサイクリングをする地元住民も多いです。ラルコマール内にトイレ、ATM、両替所があります。紫外線が強いので日焼け止めは必須。eSIMがあればパラグライダー予約や飲食店検索がすぐにできます。" },
      ],
      [
        { q: "ミラフローレスの治安は?", a: "リマで最も安全なエリアのひとつです。マレコン沿いは日中も夜間も人通りがあります。" },
        { q: "パラグライダーは予約が必要?", a: "当日申し込みも可能ですが、オンライン予約が確実です。天候により中止になることもあります。" },
        { q: "ワカ・プクヤーナの入場料は?", a: "約15ソル（約600円）です。夜間ツアーは少し高めですが、ライトアップされた遺跡は幻想的です。" },
        { q: "所要時間は?", a: "マレコン散歩とラルコマールで2〜3時間。パラグライダーや遺跡を含めると半日です。" },
      ],
    ),
    en: en(PE_EN_CTA,
      "Miraflores Coastal Promenade Walk",
      "Walk Lima's Pacific clifftops — Larcomar mall, the Park of Love, paragliding views, and an ancient pyramid in Miraflores.",
      img("File:Larcomar Lima.jpg", 1280, 854, "Larcomar", "Cliffside shopping mall overlooking the Pacific"),
      [
        img("File:Parque del Amor Lima.jpg", 1280, 854, "Park of Love", "Gaudí-style mosaic benches and sculpture"),
        img("File:Malecon de Miraflores.jpg", 1280, 854, "Malecón promenade", "Clifftop path with ocean panorama"),
        img("File:Huaca Pucllana Lima.jpg", 1280, 960, "Huaca Pucllana", "Ancient adobe pyramid in the city"),
        img("File:Parque Kennedy Lima.jpg", 1280, 854, "Parque Kennedy", "Cat-friendly central park"),
        img("File:Paragliding Miraflores Lima.jpg", 1280, 854, "Paragliding", "Tandem flights from the cliffs"),
      ],
      LIMA_X,
      [
        { heading: "What makes this route special", body: "Miraflores is Lima's upscale coastal district, where a ten-kilometre clifftop promenade — the Malecón — hugs the Pacific. Larcomar mall is carved into the cliff face, the Park of Love offers Gaudí-inspired mosaic benches, and tandem paragliders launch from the bluffs. In the middle of the residential grid sits Huaca Pucllana, a fifth-century adobe pyramid lit dramatically at night. It is a walk where ancient history and modern Pacific-rim living overlap in surprising ways." },
        { heading: "Getting there and starting point", body: "Metropolitano bus to Ricardo Palma station, then a ten-minute walk to the coast. From the airport, taxis take about 45 minutes. Start at Parque Kennedy, the leafy centre of Miraflores with surrounding cafés, then walk toward the ocean and Larcomar before heading south along the Malecón." },
        { heading: "Key stops", body: "Larcomar is a unique cliffside mall with ocean-view restaurants and shops. The Park of Love has colourful mosaic benches perfect for photos. Tandem paragliding — about fifteen minutes for 50 to 70 dollars — launches from the cliff edge and offers aerial views of the coastline. Huaca Pucllana is illuminated at night and its on-site restaurant serves fine Peruvian cuisine against an archaeological backdrop." },
        { heading: "Best times to visit", body: "Morning or sunset for the Malecón walk. Paragliding is best between 2 pm and 5 pm when winds are stable. Huaca Pucllana night tours run Wednesday to Sunday. Weekend art fairs sometimes pop up in Parque Kennedy." },
        { heading: "Practical tips", body: "The Malecón is flat, well-paved, and popular with joggers and cyclists. Larcomar has restrooms, ATMs, and currency exchange. Sunscreen is essential — Lima's coastal sun is deceptive. An eSIM keeps your paragliding booking and restaurant searches running." },
      ],
      [
        { q: "Is Miraflores safe?", a: "One of Lima's safest areas. The Malecón has foot traffic day and night." },
        { q: "Do I need to book paragliding?", a: "Walk-ups are possible but online booking is safer. Flights cancel in bad weather." },
        { q: "How much is Huaca Pucllana?", a: "About 15 soles (around $4). Night tours cost slightly more but are worth it." },
        { q: "How long does the walk take?", a: "Two to three hours for the Malecón and Larcomar. Half a day with paragliding and the pyramid." },
      ],
    ),
  },

  // ─── 6. Lima — Centro Histórico ───────────────────────────────────
  "lima-centro-historico-walk": {
    ja: ja(PE_JA_CTA,
      "リマ旧市街のプラザマヨール周辺散策",
      "世界遺産リマ歴史地区を歩き、大聖堂、政府宮殿、コロニアル建築のバルコニーを巡るルートガイド。",
      img("File:Plaza Mayor de Lima.jpg", 1280, 854, "プラザマヨール", "リマの中心広場と大聖堂"),
      [
        img("File:Catedral de Lima.jpg", 1280, 854, "リマ大聖堂", "16世紀創建の壮麗な大聖堂"),
        img("File:Palacio de Gobierno Lima.jpg", 1280, 854, "政府宮殿", "衛兵交代式が行われる大統領府"),
        img("File:Convento de San Francisco Lima.jpg", 1280, 960, "サンフランシスコ修道院", "地下墓地カタコンベで知られる"),
        img("File:Jiron de la Union Lima.jpg", 1280, 854, "ヒロン・デ・ラ・ウニオン", "リマのメインショッピング通り"),
        img("File:Balconies Lima colonial.jpg", 1280, 854, "コロニアルバルコニー", "木彫りのムデハル様式バルコニー"),
      ],
      LIMA_X,
      [
        { heading: "このルートの特徴", body: "リマ歴史地区はユネスコ世界遺産に登録されたコロニアル建築の宝庫です。プラザマヨールを中心に、16世紀創建のリマ大聖堂、スペイン副王時代の政府宮殿、地下にカタコンベを持つサンフランシスコ修道院が集まっています。建物の上階には精緻な木彫りのムデハル様式バルコニーが張り出し、南米随一のコロニアル景観を形成しています。" },
        { heading: "アクセスと起点", body: "メトロポリターノのヒロン・デ・ラ・ウニオン駅から徒歩すぐ。タクシーでミラフローレスから約20分です。起点はプラザマヨールが定番で、大聖堂の正面から散策を始めましょう。午前中の衛兵交代式（12時頃）に合わせて訪れると効率的です。" },
        { heading: "主要スポット", body: "リマ大聖堂は内部見学可能で、征服者ピサロの棺も安置されています。サンフランシスコ修道院のカタコンベ（地下墓地）には推定7万体の遺骨が眠り、ガイドツアーで見学できます。ヒロン・デ・ラ・ウニオンは歩行者天国のショッピング通りで、老舗カフェやチョコレート店が並びます。チャイナタウン（バリオ・チノ）もすぐ近くで、ペルー式中華料理チーファが楽しめます。" },
        { heading: "時間帯とタイミング", body: "午前中が観光に最適で、大聖堂やサンフランシスコ修道院は午前の方が空いています。衛兵交代式は正午頃。午後は日差しが強くなるので、カフェで休憩を挟みましょう。平日の方が混雑が少なく、写真撮影に向いています。" },
        { heading: "実用情報", body: "歴史地区はスリに注意が必要です。貴重品は最小限にし、派手なアクセサリーは避けましょう。トイレは大聖堂やサンフランシスコ修道院内にあります。カタコンベは閉所恐怖症の方は注意。eSIMがあれば翻訳アプリやガイドツアー予約がスムーズです。" },
      ],
      [
        { q: "歴史地区の治安は?", a: "プラザマヨール周辺は警察の巡回が多く日中は安全です。スリに注意し、夜間の一人歩きは避けましょう。" },
        { q: "カタコンベは怖い?", a: "ガイド付きツアーで安全に見学できます。暗く狭い通路があるので閉所恐怖症の方は注意してください。" },
        { q: "大聖堂の入場料は?", a: "約10ソル（約400円）です。博物館エリアを含むチケットもあります。" },
        { q: "所要時間は?", a: "主要スポットを回って3〜4時間。チャイナタウンでの食事を含めると半日です。" },
      ],
    ),
    en: en(PE_EN_CTA,
      "Lima's Historic Centre and Plaza Mayor Walk",
      "Tour Lima's UNESCO-listed old town — the cathedral, government palace, catacombs, and carved wooden balconies around Plaza Mayor.",
      img("File:Plaza Mayor de Lima.jpg", 1280, 854, "Plaza Mayor", "Lima's grand central square and cathedral"),
      [
        img("File:Catedral de Lima.jpg", 1280, 854, "Lima Cathedral", "Sixteenth-century cathedral"),
        img("File:Palacio de Gobierno Lima.jpg", 1280, 854, "Government Palace", "Changing of the guard at the presidential palace"),
        img("File:Convento de San Francisco Lima.jpg", 1280, 960, "San Francisco Monastery", "Famous for its bone-filled catacombs"),
        img("File:Jiron de la Union Lima.jpg", 1280, 854, "Jirón de la Unión", "Pedestrianised shopping street"),
        img("File:Balconies Lima colonial.jpg", 1280, 854, "Colonial balconies", "Carved Mudéjar-style wooden balconies"),
      ],
      LIMA_X,
      [
        { heading: "What makes this route special", body: "Lima's historic centre is a UNESCO World Heritage Site and one of South America's finest collections of colonial architecture. Plaza Mayor is flanked by the sixteenth-century cathedral, the Government Palace, and arcaded buildings with intricately carved wooden balconies in the Mudéjar style. The San Francisco Monastery holds an eerie underground catacomb containing an estimated 70,000 sets of remains. Walking these blocks is a lesson in three centuries of Spanish vice-regal power." },
        { heading: "Getting there and starting point", body: "Metropolitano bus to Jirón de la Unión station, steps from the square. Taxi from Miraflores takes about twenty minutes. Begin at Plaza Mayor facing the cathedral; the changing of the guard at the Government Palace happens around noon and is worth timing your arrival for." },
        { heading: "Key stops", body: "Lima Cathedral is open for visits and holds the tomb of conquistador Francisco Pizarro. The San Francisco Monastery catacombs are a guided tour through bone-lined tunnels — unforgettable and slightly unnerving. Jirón de la Unión is a pedestrian shopping street with historic cafés and chocolate shops. Barrio Chino, Lima's Chinatown, is just a block away and the place to try chifa — Peruvian-Chinese fusion cuisine." },
        { heading: "Best times to visit", body: "Mornings are best — the cathedral and monastery are less crowded and light is softer. The guard change is at noon. Afternoons get hot, so schedule a café break. Weekdays are quieter for photography." },
        { heading: "Practical tips", body: "Watch for pickpockets; keep valuables minimal and avoid flashy jewellery. Restrooms are in the cathedral and monastery. The catacombs involve narrow, low passages — not ideal for claustrophobia. An eSIM helps with translation apps and booking tours on the go." },
      ],
      [
        { q: "Is the historic centre safe?", a: "Plaza Mayor area is well-patrolled and safe by day. Watch for pickpockets and avoid walking alone after dark." },
        { q: "Are the catacombs scary?", a: "A guided tour makes them manageable, but passages are dark and narrow — not recommended for the claustrophobic." },
        { q: "How much is cathedral entry?", a: "About 10 soles (around $3), with a combined museum ticket available." },
        { q: "How long does the walk take?", a: "Three to four hours for the key sights. Half a day if you include Chinatown for lunch." },
      ],
    ),
  },

  // ─── 7. Bogotá — La Candelaria ────────────────────────────────────
  "bogota-la-candelaria-walk": {
    ja: ja(CO_JA_CTA,
      "ラ・カンデラリアの石畳と博物館散策",
      "ボゴタ旧市街ラ・カンデラリアを歩き、黄金博物館、ボテロ美術館、コロニアル建築を巡るルートガイド。",
      img("File:La Candelaria Bogota.jpg", 1280, 854, "ラ・カンデラリア", "コロニアル建築と石畳の旧市街"),
      [
        img("File:Museo del Oro Bogota.jpg", 1280, 854, "黄金博物館", "先コロンブス期の黄金工芸品コレクション"),
        img("File:Museo Botero Bogota.jpg", 1280, 854, "ボテロ美術館", "コロンビアの巨匠ボテロの作品"),
        img("File:Plaza Bolivar Bogota.jpg", 1280, 960, "ボリバル広場", "国会議事堂と大聖堂に囲まれた中心広場"),
        img("File:Street art La Candelaria.jpg", 1280, 854, "ストリートアート", "壁面を彩る政治的メッセージの壁画"),
        img("File:Plazoleta del Chorro de Quevedo.jpg", 1280, 854, "チョロ・デ・ケベド広場", "ボゴタ発祥の地とされる小広場"),
      ],
      BOGOTA_X,
      [
        { heading: "このルートの特徴", body: "ラ・カンデラリアはボゴタの歴史的中心地で、石畳の坂道にスペイン植民地時代のカラフルな家屋が並びます。世界最大級の黄金工芸品コレクションを誇る黄金博物館、コロンビアの巨匠フェルナンド・ボテロの作品が無料で見られるボテロ美術館など、文化施設が集中しています。近年はストリートアートでも注目を集め、政治的メッセージの壁画が街全体を彩っています。" },
        { heading: "アクセスと起点", body: "トランスミレニオのラス・アグアス駅から徒歩5分。起点はボリバル広場が定番で、国会議事堂とカテドラルに挟まれた荘厳な空間です。ここから黄金博物館、ボテロ美術館、チョロ・デ・ケベド広場へと坂を上っていくルートがおすすめです。" },
        { heading: "主要スポット", body: "黄金博物館は入場無料の日もあり、先コロンブス期の金細工5万5千点以上を展示。ボテロ美術館もコレクション全て無料で、ボテロのふくよかな人物画に加えピカソやダリの作品もあります。チョロ・デ・ケベド広場はボゴタ発祥の地とされ、周辺にはクラフトビアバーや地元カフェが点在。ストリートアートツアーに参加すれば、壁画の背景にある社会的メッセージを深く理解できます。" },
        { heading: "時間帯とタイミング", body: "博物館は午前中が空いています。午後は坂道散策とストリートアート巡り。チョロ・デ・ケベド広場は夕方にかけて若者で賑わいます。日曜はボリバル広場周辺で市場が開かれることも。ボゴタは標高2,640mなので日中でも涼しく、羽織るものがあると安心です。" },
        { heading: "実用情報", body: "坂道が多いので歩きやすい靴が必須。標高が高く紫外線も強いので日焼け止めと水を携帯しましょう。メインの通りは安全ですが、裏路地やカレラ1番通りより東は避けた方が無難。トイレは博物館内が便利です。eSIMがあればストリートアートツアーの予約や地図アプリが常時使えます。" },
      ],
      [
        { q: "ラ・カンデラリアの治安は?", a: "メインの通りと観光スポット周辺は日中安全です。裏路地や東側のエリアには入らないようにしましょう。夜間は早めに切り上げてください。" },
        { q: "黄金博物館の入場料は?", a: "通常約4,000ペソ（約150円）ですが、日曜日は無料です。" },
        { q: "高山病の心配は?", a: "標高2,640mなので初日は軽い頭痛や息切れがあるかもしれません。水をたくさん飲み、ゆっくり歩きましょう。" },
        { q: "所要時間は?", a: "博物館2か所とストリートアートで4〜5時間。じっくり回るなら丸一日。" },
      ],
    ),
    en: en(CO_EN_CTA,
      "La Candelaria Cobblestone and Museum Walk in Bogotá",
      "Explore Bogotá's colonial heart — the Gold Museum, Botero Museum, street art, and cobblestone lanes in La Candelaria.",
      img("File:La Candelaria Bogota.jpg", 1280, 854, "La Candelaria", "Colonial streets and colourful facades"),
      [
        img("File:Museo del Oro Bogota.jpg", 1280, 854, "Gold Museum", "Pre-Columbian gold artefact collection"),
        img("File:Museo Botero Bogota.jpg", 1280, 854, "Botero Museum", "Fernando Botero's voluminous art"),
        img("File:Plaza Bolivar Bogota.jpg", 1280, 960, "Plaza Bolívar", "Grand square with Congress and cathedral"),
        img("File:Street art La Candelaria.jpg", 1280, 854, "Street art", "Political murals on every wall"),
        img("File:Plazoleta del Chorro de Quevedo.jpg", 1280, 854, "Chorro de Quevedo", "Alleged founding site of Bogotá"),
      ],
      BOGOTA_X,
      [
        { heading: "What makes this route special", body: "La Candelaria is Bogotá's historic core, a tangle of cobblestone streets lined with brightly painted colonial houses. The Gold Museum holds over 55,000 pre-Columbian gold pieces — one of the most dazzling collections anywhere. The Botero Museum is entirely free and displays not only Fernando Botero's signature voluminous figures but also Picasso, Dalí, and Monet. Add layers of street art carrying political and social messages, and you have one of South America's most culturally dense walks." },
        { heading: "Getting there and starting point", body: "TransMilenio to Las Aguas station, then a five-minute walk uphill. Start at Plaza Bolívar, the grand square flanked by Congress and the cathedral, then zigzag uphill through the Gold Museum, Botero Museum, and on to Chorro de Quevedo." },
        { heading: "Key stops", body: "The Gold Museum has free-admission days and is world-class. The Botero Museum's entire permanent collection is free — do not miss it. Chorro de Quevedo, said to be Bogotá's founding site, is ringed by craft-beer bars and indie cafés. A guided street-art tour reveals the political stories behind the murals and is well worth the two hours." },
        { heading: "Best times to visit", body: "Museums are quieter in the morning. Afternoon for street-art hunting and Chorro de Quevedo's café vibe. Sundays sometimes bring markets around Plaza Bolívar. Bogotá sits at 2,640 metres, so it stays cool — bring a light layer even on sunny days." },
        { heading: "Practical tips", body: "Wear comfortable shoes for steep cobblestones. At altitude, carry water and sunscreen. Main tourist streets are safe, but avoid alleys and areas east of Carrera 1. Restrooms are in the museums. An eSIM keeps tour bookings and maps at hand." },
      ],
      [
        { q: "Is La Candelaria safe?", a: "Main tourist streets are safe by day. Avoid side alleys and the eastern fringe. Head out before dark." },
        { q: "How much is the Gold Museum?", a: "About 4,000 pesos (around $1). Sundays are free." },
        { q: "Will I feel the altitude?", a: "At 2,640 metres, mild headaches or breathlessness are common on day one. Drink water and walk slowly." },
        { q: "How long does the walk take?", a: "Four to five hours with two museums and street art. A full day if you linger." },
      ],
    ),
  },

  // ─── 8. Bogotá — Usaquén ──────────────────────────────────────────
  "bogota-usaquen-walk": {
    ja: ja(CO_JA_CTA,
      "ウサケンの日曜フリーマーケット散歩",
      "ボゴタ北部のウサケン地区を歩き、日曜フリーマーケットとおしゃれなレストラン街を楽しむルートガイド。",
      img("File:Usaquen Bogota market.jpg", 1280, 854, "ウサケン市場", "日曜に開かれるフリーマーケット"),
      [
        img("File:Usaquen Park Bogota.jpg", 1280, 854, "ウサケン公園", "教会前の緑豊かな広場"),
        img("File:Usaquen restaurants Bogota.jpg", 1280, 854, "レストラン街", "コロニアル建築を改装した飲食店"),
        img("File:Usaquen church Bogota.jpg", 1280, 960, "ウサケン教会", "白壁のコロニアル教会"),
        img("File:Handcrafts Usaquen Bogota.jpg", 1280, 854, "ハンドクラフト", "革製品や手編みアクセサリー"),
        img("File:Usaquen streets Bogota.jpg", 1280, 854, "石畳の通り", "穏やかな住宅街の並木道"),
      ],
      BOGOTA_X,
      [
        { heading: "このルートの特徴", body: "ウサケンはボゴタ北部の旧村落で、白壁のコロニアル教会を中心に石畳の通りが広がる落ち着いたエリアです。毎週日曜に開かれるフリーマーケットが最大の魅力で、革製品、手編みアクセサリー、エメラルド、コロンビアコーヒーなどのハンドメイド品が並びます。平日はおしゃれなレストランやカフェが点在する静かな散策エリアとして楽しめます。" },
        { heading: "アクセスと起点", body: "トランスミレニオのウサケン駅から徒歩5分。タクシーでラ・カンデラリアから約30分です。起点はウサケン公園で、教会を背にしてマーケットエリアに入っていくルートが自然です。" },
        { heading: "主要スポット", body: "日曜フリーマーケットはウサケン公園とその周辺の通りに約300の露店が並びます。コロンビア産エメラルドのアクセサリー、手織りのモチーラバッグ、オーガニックコーヒーが人気商品。マーケットの周辺にはコロニアル建築を改装したレストランが多く、コロンビア料理のアヒアコ（チキンスープ）やバンデハパイサ（盛り合わせプレート）が楽しめます。" },
        { heading: "時間帯とタイミング", body: "日曜マーケットは9時頃〜17時頃。午前中は比較的空いていてゆっくり買い物できます。平日はマーケットがないので、レストランやカフェでの食事がメインの楽しみ。ランチタイム（12時〜14時）はレストランが混みます。" },
        { heading: "実用情報", body: "ウサケンは治安の良いエリアで、日中は安心して歩けます。マーケットではカード決済できない店もあるので現金を持参しましょう。トイレはレストランやカフェで借りられます。eSIMがあれば商品の価格比較やレストラン検索がスムーズです。" },
      ],
      [
        { q: "ウサケンのマーケットは何曜日?", a: "毎週日曜日のみです。9時頃から17時頃まで開催されています。" },
        { q: "エメラルドは本物?", a: "多くの店が証明書付きの本物を販売していますが、信頼できる店を選びましょう。高額品は専門店での購入がおすすめです。" },
        { q: "ラ・カンデラリアからの行き方は?", a: "タクシーかUberで約30分。トランスミレニオでも行けますが乗り換えが必要です。" },
        { q: "所要時間は?", a: "マーケットとランチで3〜4時間が目安です。" },
      ],
    ),
    en: en(CO_EN_CTA,
      "Usaquén Sunday Flea Market Walk in Bogotá",
      "Browse Bogotá's best Sunday market — handcrafted goods, emerald jewellery, and colonial-village charm in Usaquén.",
      img("File:Usaquen Bogota market.jpg", 1280, 854, "Usaquén market", "Sunday flea market in the park"),
      [
        img("File:Usaquen Park Bogota.jpg", 1280, 854, "Usaquén Park", "Leafy square by the church"),
        img("File:Usaquen restaurants Bogota.jpg", 1280, 854, "Restaurant row", "Converted colonial buildings"),
        img("File:Usaquen church Bogota.jpg", 1280, 960, "Usaquén Church", "White colonial church"),
        img("File:Handcrafts Usaquen Bogota.jpg", 1280, 854, "Handcrafts", "Leather goods and woven bags"),
        img("File:Usaquen streets Bogota.jpg", 1280, 854, "Cobblestone streets", "Tree-lined residential lanes"),
      ],
      BOGOTA_X,
      [
        { heading: "What makes this route special", body: "Usaquén is a former village now absorbed into northern Bogotá, centred on a white colonial church and cobblestone streets. Every Sunday, roughly 300 vendors set up around Usaquén Park selling handmade leather goods, woven mochila bags, emerald jewellery, and single-origin Colombian coffee. On weekdays the market disappears and the area becomes a quiet enclave of upscale restaurants and cafés in converted colonial houses." },
        { heading: "Getting there and starting point", body: "TransMilenio to Usaquén station, then a five-minute walk. Taxi from La Candelaria takes about thirty minutes. Start at Usaquén Park, with the church behind you, and wander into the market streets." },
        { heading: "Key stops", body: "The Sunday market is the draw — emerald accessories, hand-woven bags, organic coffee beans, and leather wallets. Surrounding the market, restaurants in colonial buildings serve Colombian staples like ajiaco chicken soup and bandeja paisa. Several craft-beer bars have opened in the neighbourhood too." },
        { heading: "Best times to visit", body: "The Sunday market runs roughly 9 am to 5 pm; mornings are less crowded. Weekdays are market-free but good for a quiet restaurant lunch. Lunch rush is noon to 2 pm." },
        { heading: "Practical tips", body: "Usaquén is one of Bogotá's safest neighbourhoods. Some market vendors are cash-only, so bring pesos. Restrooms in restaurants and cafés. An eSIM keeps price comparisons and restaurant searches running." },
      ],
      [
        { q: "What day is the market?", a: "Sundays only, roughly 9 am to 5 pm." },
        { q: "Are the emeralds real?", a: "Most vendors sell certified stones, but buy from reputable stalls. For big purchases, visit a specialist shop." },
        { q: "How do I get from La Candelaria?", a: "Taxi or Uber takes about thirty minutes. TransMilenio works but requires a transfer." },
        { q: "How long does the walk take?", a: "Three to four hours including market browsing and lunch." },
      ],
    ),
  },

  // ─── 9. Havana — Old Town ─────────────────────────────────────────
  "havana-old-town-walk": {
    ja: ja(CU_JA_CTA,
      "ハバナ旧市街のコロニアル建築散策",
      "世界遺産ハバナ旧市街を歩き、カテドラル広場、オビスポ通り、クラシックカーの風景を楽しむルートガイド。",
      img("File:Havana - Plaza de la Catedral.jpg", 1280, 854, "カテドラル広場", "バロック様式の大聖堂と広場"),
      [
        img("File:Calle Obispo Havana.jpg", 1280, 854, "オビスポ通り", "ハバナ旧市街のメインストリート"),
        img("File:Plaza Vieja Havana.jpg", 1280, 854, "ビエハ広場", "修復されたコロニアル広場"),
        img("File:Classic cars Havana.jpg", 1280, 854, "クラシックカー", "1950年代のアメリカ車が現役で走る"),
        img("File:Bodeguita del Medio Havana.jpg", 1280, 854, "ボデギータ・デル・メディオ", "モヒートの聖地として有名なバー"),
        img("File:Capitolio Havana.jpg", 1280, 960, "カピトリオ", "キューバの旧国会議事堂"),
      ],
      HAVANA_X,
      [
        { heading: "このルートの特徴", body: "ハバナ旧市街（ハバナ・ビエハ）はユネスコ世界遺産で、16世紀から18世紀のスペイン植民地時代の建築が残る中南米屈指の歴史地区です。朽ちかけたバロック建築と1950年代のアメリカ製クラシックカーが共存する独特の風景は世界中の旅行者を魅了します。カテドラル広場を起点に、4つの主要広場を巡るルートは歩いて2〜3時間の散策コースです。" },
        { heading: "アクセスと起点", body: "新市街のホテルからタクシーで約10分。ハバナのタクシーは交渉制なので乗車前に料金を確認しましょう。起点はカテドラル広場がおすすめで、バロック様式の大聖堂を背に散策を始めます。ここからオビスポ通りを経由してビエハ広場へ向かうルートが効率的です。" },
        { heading: "主要スポット", body: "カテドラル広場は18世紀のバロック大聖堂に囲まれた美しい広場。オビスポ通りは歩行者天国で、書店、ギャラリー、カフェが並びます。ボデギータ・デル・メディオはヘミングウェイが通ったとされるバーで、モヒートが名物。ビエハ広場は修復が進み、カフェのテラスでくつろげます。カピトリオは修復を経て壮麗な姿を取り戻しています。" },
        { heading: "時間帯とタイミング", body: "午前中は光が柔らかく建築写真に最適。オビスポ通りは午後にかけて賑わいます。夕方はマレコン（海岸通り）へ移動してサンセットを楽しむのが定番。ライブミュージックは夜に本領を発揮し、旧市街のバーやレストランでソンやサルサが聴けます。" },
        { heading: "実用情報", body: "キューバではインターネット接続が限られています。公衆Wi-Fiスポット（ETECSAカード購入が必要）はあるものの不安定。eSIMが使える端末であれば、安定した通信が確保できます。通貨はキューバペソ（CUP）で、クレジットカードはアメリカ系銀行発行のものは使えません。トイレは有料のことが多く、小銭を用意しておきましょう。" },
      ],
      [
        { q: "ハバナ旧市街の治安は?", a: "観光エリアは日中安全です。夜間も主要広場やオビスポ通りは人通りがありますが、暗い路地は避けましょう。" },
        { q: "インターネットは使える?", a: "公衆Wi-Fiスポットでは接続可能ですが速度は遅いです。eSIMがあれば比較的安定した通信が確保できます。" },
        { q: "クレジットカードは使える?", a: "アメリカ系銀行（Visa/Mastercard含む）発行のカードは使えないことが多いです。ヨーロッパやカナダの銀行発行カード、または現金を用意しましょう。" },
        { q: "所要時間は?", a: "4つの主要広場を回るルートで3〜4時間。バーや食事を含めると半日以上です。" },
      ],
    ),
    en: en(CU_EN_CTA,
      "Havana Old Town Colonial Architecture Walk",
      "Wander UNESCO-listed Habana Vieja — baroque plazas, Hemingway bars, classic cars, and crumbling colonial grandeur.",
      img("File:Havana - Plaza de la Catedral.jpg", 1280, 854, "Cathedral Square", "Baroque cathedral and cobblestone plaza"),
      [
        img("File:Calle Obispo Havana.jpg", 1280, 854, "Calle Obispo", "Old Havana's main pedestrian street"),
        img("File:Plaza Vieja Havana.jpg", 1280, 854, "Plaza Vieja", "Restored colonial square"),
        img("File:Classic cars Havana.jpg", 1280, 854, "Classic cars", "1950s American cars still on the road"),
        img("File:Bodeguita del Medio Havana.jpg", 1280, 854, "Bodeguita del Medio", "The legendary mojito bar"),
        img("File:Capitolio Havana.jpg", 1280, 960, "El Capitolio", "Cuba's former capitol building"),
      ],
      HAVANA_X,
      [
        { heading: "What makes this route special", body: "Habana Vieja — Old Havana — is a UNESCO World Heritage Site preserving four centuries of Spanish colonial architecture. Crumbling baroque facades share the streets with candy-coloured 1950s American cars, creating a visual experience unlike anywhere else. Four main plazas anchor the old town, connected by narrow lanes where music drifts out of open doorways. It is equal parts museum and living city." },
        { heading: "Getting there and starting point", body: "Taxi from Vedado or Miramar takes about ten minutes — agree on the fare before you get in. Start at Plaza de la Catedral, the most photogenic of the four squares, with the baroque cathedral as your backdrop. From here walk along Calle Obispo toward Plaza Vieja." },
        { heading: "Key stops", body: "Plaza de la Catedral is ringed by eighteenth-century mansions now housing restaurants and galleries. Calle Obispo is a pedestrian street with bookshops, galleries, and live-music bars. Bodeguita del Medio claims Hemingway as a regular — the mojitos are good regardless of the provenance. Plaza Vieja has been beautifully restored with a craft brewery and café terraces. El Capitolio, recently renovated, is Havana's most imposing building." },
        { heading: "Best times to visit", body: "Morning light is softest for architectural photography. Calle Obispo picks up in the afternoon. Sunset is best watched from the Malecón. Evening brings live son and salsa in old-town bars and restaurants." },
        { heading: "Practical tips", body: "Internet in Cuba is limited — public Wi-Fi hotspots require an ETECSA card and are slow. An eSIM with Cuba coverage provides much more reliable connectivity. Currency is the Cuban peso (CUP); US-bank-issued credit cards usually do not work. Restrooms often charge a small fee, so keep coins handy." },
      ],
      [
        { q: "Is Old Havana safe?", a: "The tourist areas are safe by day. Main plazas and Calle Obispo are lively at night; avoid dark alleys." },
        { q: "Can I get online?", a: "Public Wi-Fi hotspots exist but are slow. An eSIM with Cuba coverage is the most reliable option." },
        { q: "Do credit cards work?", a: "Cards issued by US-affiliated banks often fail. Bring a European or Canadian card, or cash." },
        { q: "How long does the walk take?", a: "Three to four hours for the four plazas. Half a day or more with bar stops and meals." },
      ],
    ),
  },

  // ─── 10. Havana — Malecón ─────────────────────────────────────────
  "havana-malecon-walk": {
    ja: ja(CU_JA_CTA,
      "マレコン海岸通りの夕方散歩",
      "ハバナのマレコンを夕暮れ時に歩き、カリブ海の絶景と地元住民の憩いの場を体感するルートガイド。",
      img("File:Malecon Havana sunset.jpg", 1280, 854, "マレコンの夕日", "カリブ海に沈む夕日と海岸通り"),
      [
        img("File:Malecon Havana buildings.jpg", 1280, 854, "マレコンの建物", "パステルカラーの建築が並ぶ海岸通り"),
        img("File:Hotel Nacional de Cuba.jpg", 1280, 854, "ナシオナルホテル", "1930年代の名門ホテル"),
        img("File:Castillo de San Salvador de la Punta.jpg", 1280, 854, "プンタ要塞", "ハバナ湾入口の要塞跡"),
        img("File:Malecon Havana people.jpg", 1280, 854, "マレコンの人々", "海岸に集まる地元住民たち"),
        img("File:Vedado Havana.jpg", 1280, 854, "ベダード地区", "20世紀の建築が並ぶモダンエリア"),
      ],
      HAVANA_X,
      [
        { heading: "このルートの特徴", body: "マレコンはハバナの海岸沿いに約8km延びる防波堤兼遊歩道で、ハバナっ子の社交場です。パステルカラーの建物を背にカリブ海を眺めながら歩くルートは、夕方のサンセットタイムが最も魅力的。地元の人々が釣りをしたり、ギターを弾いたり、恋人と語り合う風景はハバナならではの光景です。旧市街のプンタ要塞からベダード地区まで歩くと約1時間半の海岸散歩が楽しめます。" },
        { heading: "アクセスと起点", body: "旧市街側のプンタ要塞が起点で、旧市街散策の続きとして歩き始めるのがおすすめ。ここからベダード地区のナシオナルホテル方面へ西に向かいます。逆ルートでベダードからスタートしてもOKです。タクシーでマレコン沿いの好きな場所で降りても構いません。" },
        { heading: "主要スポット", body: "プンタ要塞はハバナ湾の入口を守った16世紀の要塞で、対岸のモロ要塞との対を成します。マレコン沿いのパステルカラーの建物群はフォトジェニック。ナシオナルホテルは1930年代の歴史的ホテルで、テラスバーからの眺望は抜群。ベダード地区に入ると20世紀モダニズム建築が増え、ハバナの別の表情が見えてきます。" },
        { heading: "時間帯とタイミング", body: "ベストタイムは夕方16時〜19時。カリブ海に沈む夕日はマレコン最大のハイライトです。週末の夜はマレコンに若者が集まり、音楽と活気に包まれます。日中は直射日光が強いので帽子と水が必要。冬場（12〜2月）は北風で波が高くなり、潮がマレコンを越えることもあります。" },
        { heading: "実用情報", body: "マレコンは全区間平坦で歩きやすいです。トイレは沿道にはないので、出発前にカフェやホテルで済ませておきましょう。夜間のマレコンは地元住民も多いですが、暗いエリアでは貴重品に注意。eSIMがあれば写真のアップロードや地図確認がリアルタイムで可能です。" },
      ],
      [
        { q: "マレコンは安全?", a: "日中と夕方は安全です。夜間も人通りはありますが、暗いエリアでは貴重品に注意してください。" },
        { q: "全区間歩く必要がある?", a: "全長8kmですが、好きな区間だけ歩いても十分楽しめます。旧市街側の2〜3kmが最もフォトジェニックです。" },
        { q: "飲み物や食べ物は買える?", a: "マレコン沿いにはカフェがほとんどないので、事前に購入しておくか、脇道のカフェに立ち寄りましょう。" },
        { q: "所要時間は?", a: "全区間で約1.5〜2時間。ゆっくり写真を撮りながらなら2〜3時間見てください。" },
      ],
    ),
    en: en(CU_EN_CTA,
      "Malecón Sunset Promenade Walk in Havana",
      "Stroll Havana's iconic eight-kilometre seawall at sunset — pastel buildings, Caribbean waves, and the city's outdoor living room.",
      img("File:Malecon Havana sunset.jpg", 1280, 854, "Malecón sunset", "Caribbean sun setting over the seawall"),
      [
        img("File:Malecon Havana buildings.jpg", 1280, 854, "Malecón buildings", "Pastel facades lining the seafront"),
        img("File:Hotel Nacional de Cuba.jpg", 1280, 854, "Hotel Nacional", "Iconic 1930s grand hotel"),
        img("File:Castillo de San Salvador de la Punta.jpg", 1280, 854, "Punta Fortress", "Sixteenth-century harbour fort"),
        img("File:Malecon Havana people.jpg", 1280, 854, "People on the Malecón", "Locals socialising on the seawall"),
        img("File:Vedado Havana.jpg", 1280, 854, "Vedado district", "Twentieth-century modernist quarter"),
      ],
      HAVANA_X,
      [
        { heading: "What makes this route special", body: "The Malecón is Havana's eight-kilometre seawall and the city's communal living room. Locals fish, play guitar, flirt, and philosophise along its length while pastel-coloured buildings crumble photogenically behind them. Walking from the Punta Fortress at the old-town end to Vedado takes about ninety minutes and delivers one of the world's great urban sunsets over the Caribbean Sea." },
        { heading: "Getting there and starting point", body: "Start at the Castillo de San Salvador de la Punta, at the mouth of Havana harbour, easily reached on foot from Old Havana. Walk west toward Vedado and the Hotel Nacional. You can also start at the Vedado end or hop in a taxi to any point along the seawall." },
        { heading: "Key stops", body: "The Punta Fortress pairs with the Morro across the harbour mouth. The pastel-building stretch between Old Havana and Centro Habana is the most photographed section. Hotel Nacional, a 1930s landmark, has a terrace bar with sweeping views. Entering Vedado, the architecture shifts to twentieth-century modernism, revealing a different side of the city." },
        { heading: "Best times to visit", body: "The golden hour — roughly 4 pm to 7 pm — is the Malecón's prime time. Weekend nights draw crowds of young Habaneros with guitars and rum. Daytime is hot, so bring a hat and water. In winter (December to February) north swells push waves over the seawall." },
        { heading: "Practical tips", body: "The Malecón is flat and easy to walk. There are no restrooms along the seawall itself, so use a café or hotel beforehand. Keep valuables secure after dark. An eSIM lets you upload photos and check maps in real time." },
      ],
      [
        { q: "Is the Malecón safe?", a: "Safe during the day and at sunset. At night there is foot traffic, but stay aware and keep valuables hidden." },
        { q: "Do I have to walk the whole thing?", a: "No — the most photogenic stretch is the first two to three kilometres from Old Havana. Walk as much or as little as you like." },
        { q: "Can I buy drinks along the way?", a: "Few cafés sit directly on the Malecón. Buy water beforehand or duck into a side-street café." },
        { q: "How long does the walk take?", a: "About ninety minutes end to end. Two to three hours at a photo-stopping pace." },
      ],
    ),
  },

  // ─── 11. LA — Venice Beach ────────────────────────────────────────
  "la-venice-beach-walk": {
    ja: ja(US_JA_CTA,
      "ベニスビーチのボードウォーク散策",
      "ロサンゼルスのベニスビーチを歩き、ボードウォークのパフォーマー、マッスルビーチ、アボットキニー通りを巡るルートガイド。",
      img("File:Venice Beach Los Angeles.jpg", 1280, 854, "ベニスビーチ", "LAを代表するビーチカルチャーの聖地"),
      [
        img("File:Venice Beach Boardwalk.jpg", 1280, 854, "ボードウォーク", "パフォーマーと露店が並ぶ遊歩道"),
        img("File:Muscle Beach Venice.jpg", 1280, 854, "マッスルビーチ", "屋外ジムのアイコン的存在"),
        img("File:Venice Canals Los Angeles.jpg", 1280, 854, "ベニス運河", "住宅街に残る運河と小橋"),
        img("File:Abbot Kinney Boulevard Venice.jpg", 1280, 854, "アボットキニー通り", "おしゃれショップが並ぶ通り"),
        img("File:Venice Beach skatepark.jpg", 1280, 854, "スケートパーク", "海辺のスケートパーク"),
      ],
      LA_X,
      [
        { heading: "このルートの特徴", body: "ベニスビーチはロサンゼルスのカウンターカルチャーの象徴で、ボードウォーク沿いにはストリートパフォーマー、占い師、アーティストの露店が並びます。マッスルビーチの屋外ジム、スケートパーク、グラフィティアートなど、LAのビーチカルチャーが凝縮された場所です。少し内陸に入ればベニス運河の静かな住宅街や、LAで最もおしゃれと言われるアボットキニー通りも徒歩圏内です。" },
        { heading: "アクセスと起点", body: "LAXから車で約20分。公共交通機関ではメトロEラインのダウンタウン・サンタモニカ駅からバスまたは徒歩30分。サンタモニカピアから海沿いを南に歩いてベニスビーチに入るルートも人気です。起点はウィンドワードアベニューとボードウォークの交差点が定番です。" },
        { heading: "主要スポット", body: "ボードウォークはベニスビーチの心臓部で、大道芸、ヘナタトゥー、手作りアクセサリーの露店が続きます。マッスルビーチは1930年代から続く伝説の屋外ジム。スケートパークでは地元スケーターの技を観覧できます。ベニス運河は1905年に開発者アボット・キニーが造った運河の一部が残り、小橋と住宅が絵になる散歩道。アボットキニー通りはブティック、カフェ、ギャラリーが集まるおしゃれストリートです。" },
        { heading: "時間帯とタイミング", body: "ボードウォークは午前10時〜夕方が最も活気があります。朝はジョギングやサーフィンの地元住民が中心で穏やか。アボットキニー通りのショップは11時頃から。週末はボードウォークが特に混み合います。サンセット時のビーチは最高のフォトスポットです。" },
        { heading: "実用情報", body: "駐車場は周辺に有料パーキングあり（$5〜15）。トイレはボードウォーク沿いに公衆トイレがあります。ビーチエリアは治安が概ね良好ですが、貴重品は車内に置かないこと。日焼け止めは必須。eSIMがあれば現在地確認やUber配車がスムーズです。" },
      ],
      [
        { q: "ベニスビーチの治安は?", a: "ボードウォーク周辺は日中安全です。夜間は人通りが減るので、暗くなる前に移動しましょう。" },
        { q: "サンタモニカから歩ける?", a: "はい、海沿いを南に約30分歩けばベニスビーチに着きます。" },
        { q: "駐車場はある?", a: "有料パーキングが複数あります。週末は早めに到着しないと満車になることも。" },
        { q: "所要時間は?", a: "ボードウォークだけなら1〜2時間。運河とアボットキニー通りを含めると半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Venice Beach Boardwalk Walk in Los Angeles",
      "Experience LA's iconic beach culture — boardwalk performers, Muscle Beach, canals, and the boutiques of Abbot Kinney Boulevard.",
      img("File:Venice Beach Los Angeles.jpg", 1280, 854, "Venice Beach", "LA's legendary beach-culture destination"),
      [
        img("File:Venice Beach Boardwalk.jpg", 1280, 854, "Boardwalk", "Performers and vendors on the promenade"),
        img("File:Muscle Beach Venice.jpg", 1280, 854, "Muscle Beach", "Iconic outdoor gym"),
        img("File:Venice Canals Los Angeles.jpg", 1280, 854, "Venice Canals", "Quiet canal paths and footbridges"),
        img("File:Abbot Kinney Boulevard Venice.jpg", 1280, 854, "Abbot Kinney Blvd", "LA's coolest shopping street"),
        img("File:Venice Beach skatepark.jpg", 1280, 854, "Skatepark", "Beachside skate bowl"),
      ],
      LA_X,
      [
        { heading: "What makes this route special", body: "Venice Beach is LA's countercultural heart. The boardwalk is a nonstop parade of street performers, fortune-tellers, and artist stalls. Muscle Beach has been an outdoor-gym icon since the 1930s, and the adjacent skatepark attracts serious locals. Step inland a few blocks and the Venice Canals offer a surprisingly quiet residential stroll over footbridges, while Abbot Kinney Boulevard is consistently rated one of LA's best shopping streets." },
        { heading: "Getting there and starting point", body: "About twenty minutes from LAX by car. By transit, take the Metro E Line to Downtown Santa Monica, then walk or bus south. Walking the beach path from Santa Monica Pier to Venice is a popular route. The boardwalk at Windward Avenue is a good starting point." },
        { heading: "Key stops", body: "The boardwalk is Venice's beating heart — buskers, henna artists, handmade jewellery. Muscle Beach's outdoor weight pen is a spectator sport. The skatepark draws talented locals. The Venice Canals, remnants of developer Abbot Kinney's 1905 plan, are peaceful and photogenic. Abbot Kinney Boulevard is lined with boutiques, cafés, and galleries." },
        { heading: "Best times to visit", body: "The boardwalk is liveliest between 10 am and sunset. Mornings are calm — joggers and surfers. Abbot Kinney shops open around 11 am. Weekends are crowded. Sunset on the beach is spectacular." },
        { heading: "Practical tips", body: "Paid parking lots nearby cost $5 to $15. Public restrooms line the boardwalk. The area is generally safe by day; do not leave valuables in your car. Sunscreen is a must. An eSIM keeps your maps and ride apps working." },
      ],
      [
        { q: "Is Venice Beach safe?", a: "The boardwalk area is safe during the day. Leave before dark, and don't leave valuables in your car." },
        { q: "Can I walk from Santa Monica?", a: "Yes — it's about a thirty-minute walk south along the beach path." },
        { q: "Is there parking?", a: "Several paid lots. Arrive early on weekends to secure a spot." },
        { q: "How long does the walk take?", a: "One to two hours for the boardwalk alone. Half a day with the canals and Abbot Kinney." },
      ],
    ),
  },

  // ─── 12. LA — Arts District ───────────────────────────────────────
  "la-arts-district-walk": {
    ja: ja(US_JA_CTA,
      "ロサンゼルス・アーツディストリクトの倉庫リノベ",
      "ダウンタウンLAのアーツディストリクトを歩き、倉庫リノベーションのギャラリー、カフェ、ストリートアートを巡るルートガイド。",
      img("File:Arts District Los Angeles.jpg", 1280, 854, "アーツディストリクト", "倉庫をリノベしたギャラリーとカフェの街"),
      [
        img("File:Hauser and Wirth Los Angeles.jpg", 1280, 854, "ハウザー＆ワース", "世界的ギャラリーのLA拠点"),
        img("File:Street art DTLA Arts District.jpg", 1280, 854, "ストリートアート", "倉庫壁面の大型ミューラル"),
        img("File:Angel City Brewery.jpg", 1280, 854, "エンジェルシティブルワリー", "地元クラフトビール醸造所"),
        img("File:Row DTLA.jpg", 1280, 854, "ROW DTLA", "複合商業施設にリノベされた倉庫群"),
        img("File:Arts District coffee shop LA.jpg", 1280, 854, "コーヒーショップ", "サードウェーブコーヒーの人気店"),
      ],
      LA_X,
      [
        { heading: "このルートの特徴", body: "アーツディストリクトはダウンタウンLA東部の元工業地帯で、倉庫や工場をリノベーションしたギャラリー、カフェ、レストランが集まるクリエイティブな街です。ハウザー＆ワースをはじめとする世界的ギャラリーが拠点を構え、倉庫壁面には大規模なストリートアートが描かれています。ベニスビーチのカジュアルさとは対照的な、洗練されたアーバンカルチャーが魅力です。" },
        { heading: "アクセスと起点", body: "メトロAラインまたはEラインのリトルトーキョー/アーツディストリクト駅から徒歩10分。車の場合はROW DTLAの駐車場が便利です。起点はROW DTLAがおすすめで、ここから東に歩いてギャラリーやカフェを巡ります。" },
        { heading: "主要スポット", body: "ハウザー＆ワースは入場無料の世界的ギャラリーで、広大な倉庫空間に大型インスタレーションが展示されています。ROW DTLAは旧倉庫群を改装した複合施設で、ショップやレストランが入居。エンジェルシティブルワリーでは地元醸造のクラフトビールが味わえます。通り沿いのミューラル（壁画）はSNS映えするフォトスポットの宝庫です。" },
        { heading: "時間帯とタイミング", body: "ギャラリーは水〜日曜の11時〜18時が一般的。カフェは朝から営業しているので、コーヒーを飲んでからギャラリー巡りを始めるのがおすすめ。週末はフードトラックが出ることも。夕方以降はレストランやバーが賑わいます。" },
        { heading: "実用情報", body: "ブロック間の距離がやや長いので歩きやすい靴を。日差しが強い日は帽子と水を持参しましょう。トイレはROW DTLAやギャラリー内が利用可能。治安は日中は問題ありませんが、夜間の暗い通りは避けてください。eSIMがあればギャラリー情報の検索やナビゲーションがスムーズです。" },
      ],
      [
        { q: "アーツディストリクトの治安は?", a: "日中は安全で観光客も多いです。夜間は明るい通りを選んで歩きましょう。" },
        { q: "ギャラリーは無料?", a: "ハウザー＆ワースをはじめ、多くのギャラリーが入場無料です。" },
        { q: "駐車場はある?", a: "ROW DTLAや周辺に有料パーキングがあります。メトロでのアクセスも便利です。" },
        { q: "所要時間は?", a: "ギャラリーとカフェで2〜3時間。食事も含めると半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "LA Arts District Warehouse Walk",
      "Explore downtown LA's creative hub — world-class galleries in converted warehouses, street art, craft beer, and specialty coffee.",
      img("File:Arts District Los Angeles.jpg", 1280, 854, "Arts District", "Gallery and café scene in converted warehouses"),
      [
        img("File:Hauser and Wirth Los Angeles.jpg", 1280, 854, "Hauser & Wirth", "Global gallery's LA outpost"),
        img("File:Street art DTLA Arts District.jpg", 1280, 854, "Street art", "Large-scale murals on warehouse walls"),
        img("File:Angel City Brewery.jpg", 1280, 854, "Angel City Brewery", "Local craft beer taproom"),
        img("File:Row DTLA.jpg", 1280, 854, "ROW DTLA", "Warehouse complex turned retail hub"),
        img("File:Arts District coffee shop LA.jpg", 1280, 854, "Coffee shop", "Specialty coffee favourite"),
      ],
      LA_X,
      [
        { heading: "What makes this route special", body: "The Arts District is downtown LA's creative engine — a former industrial zone where warehouses and factories have become galleries, cafés, and restaurants. Hauser & Wirth anchors the gallery scene with free, museum-scale exhibitions. Walls carry large murals, and the coffee and craft-beer scene rivals any in the city. It is a more polished counterpart to Venice Beach's beach culture." },
        { heading: "Getting there and starting point", body: "Metro A or E Line to Little Tokyo/Arts District station, then a ten-minute walk east. If driving, ROW DTLA has convenient parking. Start at ROW DTLA and walk east through the gallery and café blocks." },
        { heading: "Key stops", body: "Hauser & Wirth is free and fills a vast warehouse with major installations. ROW DTLA is a converted warehouse complex with shops and restaurants. Angel City Brewery serves locally brewed craft beer in a lively taproom. The mural-covered streets are an Instagram treasure hunt." },
        { heading: "Best times to visit", body: "Galleries typically open Wednesday to Sunday, 11 am to 6 pm. Cafés open early, so start with coffee before gallery hopping. Food trucks appear on weekends. Restaurants and bars come alive in the evening." },
        { heading: "Practical tips", body: "Blocks are long, so wear comfortable shoes. Bring a hat and water on hot days. Restrooms in ROW DTLA and galleries. Daytime is safe; stick to well-lit streets at night. An eSIM helps with gallery info and navigation." },
      ],
      [
        { q: "Is the Arts District safe?", a: "Safe and busy during the day. Stick to lit streets after dark." },
        { q: "Are galleries free?", a: "Most, including Hauser & Wirth, are free admission." },
        { q: "Is there parking?", a: "Paid lots at ROW DTLA and around the neighbourhood. Metro access is also convenient." },
        { q: "How long does the walk take?", a: "Two to three hours for galleries and coffee. Half a day with meals." },
      ],
    ),
  },

  // ─── 13. LA — Silver Lake ─────────────────────────────────────────
  "la-silver-lake-walk": {
    ja: ja(US_JA_CTA,
      "シルバーレイクのカフェと階段散歩",
      "ロサンゼルスのシルバーレイクを歩き、丘の上のカフェ、隠れた階段道、貯水池周辺を巡るルートガイド。",
      img("File:Silver Lake Reservoir Los Angeles.jpg", 1280, 854, "シルバーレイク貯水池", "丘に囲まれた美しい貯水池"),
      [
        img("File:Sunset Boulevard Silver Lake.jpg", 1280, 854, "サンセットブルバード", "カフェとショップが並ぶメイン通り"),
        img("File:Silver Lake stairs Los Angeles.jpg", 1280, 854, "隠れた階段道", "丘の住宅街を結ぶ公共階段"),
        img("File:Intelligentsia Silver Lake.jpg", 1280, 854, "インテリジェンシア", "サードウェーブコーヒーの名店"),
        img("File:Silver Lake meadow.jpg", 1280, 854, "メドウ", "貯水池沿いの芝生エリア"),
        img("File:Sunset Junction Silver Lake.jpg", 1280, 854, "サンセットジャンクション", "地元コミュニティの中心地"),
      ],
      LA_X,
      [
        { heading: "このルートの特徴", body: "シルバーレイクはロサンゼルスの丘陵地帯に広がるクリエイティブな住宅街で、ビーチとは違うLAの一面を見せてくれます。丘の斜面にはミッドセンチュリーモダンの住宅が点在し、住宅街を結ぶ公共の階段道（ヒドゥンステアーズ）が散歩の醍醐味。サンセットブルバード沿いにはサードウェーブコーヒーの草分けインテリジェンシアや独立系書店が並び、地元住民のおしゃれなライフスタイルを垣間見られます。" },
        { heading: "アクセスと起点", body: "ダウンタウンLAから車で約15分。バスはメトロ2番か4番でサンセットブルバードへ。起点はサンセットジャンクション（サンセット通りとサンタモニカ通りの交差点）が便利で、ここからカフェ巡りと階段散歩を始められます。" },
        { heading: "主要スポット", body: "シルバーレイク貯水池は周囲約4kmの遊歩道があり、ジョギングや犬の散歩をする地元住民に人気。貯水池南側のメドウは芝生でピクニックができます。隠れた階段道は住宅街の斜面を縫うように設置された公共階段で、頂上からはLAのスカイラインが一望できます。サンセットブルバード沿いのカフェやブティックは11時頃から賑わいます。" },
        { heading: "時間帯とタイミング", body: "午前中にカフェでコーヒーを飲み、その後階段散歩と貯水池一周。午後はサンセットブルバードでショッピング。夕方はレストランでディナーという流れがおすすめ。週末はファーマーズマーケットが開催されることも。気候は年間通じて温暖ですが、丘歩きは日差しが強いので水を持参してください。" },
        { heading: "実用情報", body: "階段散歩は高低差があるので歩きやすい靴が必須。貯水池周辺にトイレはほとんどないので、カフェで済ませておきましょう。駐車は住宅街の路上パーキングが中心で、週末は混みます。eSIMがあれば階段の場所検索やナビゲーションがスムーズです。" },
      ],
      [
        { q: "シルバーレイクの治安は?", a: "安全な住宅街です。日中の散歩は全く問題ありません。" },
        { q: "階段道はどこにある?", a: "Googleマップで「Silver Lake stairs」と検索すると複数見つかります。最も有名なのはバクスターステアーズです。" },
        { q: "駐車場はある?", a: "専用駐車場は少なく、路上パーキングが中心です。メーターや時間制限に注意してください。" },
        { q: "所要時間は?", a: "貯水池一周と階段散歩で2〜3時間。カフェとショッピングを含めると半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Silver Lake Café and Stairway Walk in LA",
      "Discover LA's creative hillside neighbourhood — hidden stairways, reservoir loop, specialty coffee, and indie boutiques in Silver Lake.",
      img("File:Silver Lake Reservoir Los Angeles.jpg", 1280, 854, "Silver Lake Reservoir", "The neighbourhood's scenic centrepiece"),
      [
        img("File:Sunset Boulevard Silver Lake.jpg", 1280, 854, "Sunset Boulevard", "Cafés and shops on the main drag"),
        img("File:Silver Lake stairs Los Angeles.jpg", 1280, 854, "Hidden stairways", "Public stairs linking hillside homes"),
        img("File:Intelligentsia Silver Lake.jpg", 1280, 854, "Intelligentsia", "Pioneering third-wave coffee shop"),
        img("File:Silver Lake meadow.jpg", 1280, 854, "Meadow", "Grassy lakeside picnic area"),
        img("File:Sunset Junction Silver Lake.jpg", 1280, 854, "Sunset Junction", "Neighbourhood crossroads"),
      ],
      LA_X,
      [
        { heading: "What makes this route special", body: "Silver Lake is LA's creative hillside enclave, a world away from the beach. Mid-century modern houses dot the slopes, and public stairways — the famous hidden stairs — connect the streets, rewarding climbers with sweeping city views. Sunset Boulevard through the neighbourhood hosts Intelligentsia Coffee, indie bookshops, and stylish brunch spots. The reservoir loop provides a flat, scenic walk popular with joggers and dog walkers." },
        { heading: "Getting there and starting point", body: "About fifteen minutes by car from downtown LA. Metro buses 2 and 4 run along Sunset Boulevard. Start at Sunset Junction — the intersection of Sunset and Santa Monica boulevards — for cafés and easy access to the stairways." },
        { heading: "Key stops", body: "The Silver Lake Reservoir has a four-kilometre walking path around its perimeter. The Meadow on the south side is a grassy area for picnics. The hidden stairways — Baxter Stairs being the most famous — climb through residential slopes to panoramic views. Sunset Boulevard's cafés and boutiques pick up around 11 am." },
        { heading: "Best times to visit", body: "Morning coffee, then stairway climbs and the reservoir loop. Afternoon for Sunset Boulevard shopping. Evening for dinner at one of the neighbourhood's restaurants. Weekends may bring a farmers' market. The climate is warm year-round, but carry water for hill walks." },
        { heading: "Practical tips", body: "Wear sturdy shoes for the stairways. Few restrooms near the reservoir — use cafés. Parking is mostly street-side and fills up on weekends. An eSIM keeps stairway location searches and navigation smooth." },
      ],
      [
        { q: "Is Silver Lake safe?", a: "It is a safe residential neighbourhood. Daytime walking is perfectly fine." },
        { q: "Where are the hidden stairs?", a: "Search 'Silver Lake stairs' on Google Maps. Baxter Stairs is the most well-known set." },
        { q: "Is there parking?", a: "Mostly street parking. Watch for meters and time limits." },
        { q: "How long does the walk take?", a: "Two to three hours for the reservoir and stairs. Half a day with cafés and shopping." },
      ],
    ),
  },

  // ─── 14. Boston — Beacon Hill ─────────────────────────────────────
  "boston-beacon-hill-walk": {
    ja: ja(US_JA_CTA,
      "ビーコンヒルのレンガ通り散策",
      "ボストンのビーコンヒルを歩き、ガス灯が灯るレンガ通り、エーコーンストリート、チャールズ通りを巡るルートガイド。",
      img("File:Acorn Street Boston.jpg", 1280, 854, "エーコーンストリート", "ボストンで最も写真撮影される通り"),
      [
        img("File:Beacon Hill Boston.jpg", 1280, 854, "ビーコンヒル", "レンガ造りのタウンハウスが並ぶ丘"),
        img("File:Charles Street Boston.jpg", 1280, 854, "チャールズ通り", "アンティークショップとカフェの通り"),
        img("File:Massachusetts State House.jpg", 1280, 960, "マサチューセッツ州議事堂", "金のドームが目印の州庁舎"),
        img("File:Louisburg Square Boston.jpg", 1280, 854, "ルイスバーグスクエア", "ボストン最高級の住宅広場"),
        img("File:Boston Common.jpg", 1280, 854, "ボストンコモン", "アメリカ最古の公園"),
      ],
      BOSTON_X,
      [
        { heading: "このルートの特徴", body: "ビーコンヒルはボストンで最も美しい住宅地で、19世紀のレンガ造りタウンハウス、ガス灯、石畳の路地が残る歴史的エリアです。エーコーンストリートは「ボストンで最も写真撮影される通り」として知られ、紅葉シーズンは特に絶景。チャールズ通りにはアンティークショップやカフェが並び、散策とショッピングを同時に楽しめます。" },
        { heading: "アクセスと起点", body: "メトロ・レッドラインまたはグリーンラインのパーク・ストリート駅から徒歩5分。起点はマサチューセッツ州議事堂の金ドームが便利で、ここからビーコンヒルの住宅街に入っていきます。ボストンコモンを横切ってアクセスするのも気持ちの良いルートです。" },
        { heading: "主要スポット", body: "マサチューセッツ州議事堂は金色のドームが印象的で、内部見学ツアーも無料です。エーコーンストリートは短い石畳の路地ですが、フォトジェニックな定番スポット。ルイスバーグスクエアはボストンで最も高級な住宅広場で、美しい鉄柵に囲まれています。チャールズ通りはアンティーク家具、古書、カフェが集まるメインショッピング通り。ボストンコモンはアメリカ最古の公園で、散策の起点や終点に最適です。" },
        { heading: "時間帯とタイミング", body: "午前中は光が柔らかくエーコーンストリートの写真撮影に最適。チャールズ通りのショップは10時〜11時頃にオープン。秋（9〜11月）は紅葉とレンガのコントラストが美しく、ビーコンヒルのベストシーズン。冬はクリスマスのデコレーションが雰囲気を盛り上げます。" },
        { heading: "実用情報", body: "ビーコンヒルは坂道と石畳が多いので歩きやすい靴を。住宅街なので静かに歩くマナーを守りましょう。トイレはチャールズ通りのカフェやボストンコモンのビジターセンターが便利。冬は路面凍結に注意。eSIMがあれば歴史スポットの情報検索やナビゲーションがスムーズです。" },
      ],
      [
        { q: "ビーコンヒルの治安は?", a: "ボストンで最も安全なエリアのひとつです。日中も夜間も問題ありません。" },
        { q: "エーコーンストリートは混む?", a: "紅葉シーズンの週末は写真撮影の人で賑わいます。平日朝が最も空いています。" },
        { q: "駐車場はある?", a: "住宅街のため駐車は非常に限られます。公共交通機関の利用がおすすめです。" },
        { q: "所要時間は?", a: "ビーコンヒル散策だけなら1.5〜2時間。チャールズ通りのショッピングを含めると3〜4時間です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Beacon Hill Brick Lane Walk in Boston",
      "Walk Boston's most picturesque neighbourhood — gas-lit brick lanes, Acorn Street, antique shops, and the golden-domed State House.",
      img("File:Acorn Street Boston.jpg", 1280, 854, "Acorn Street", "Boston's most photographed street"),
      [
        img("File:Beacon Hill Boston.jpg", 1280, 854, "Beacon Hill", "Brick townhouses climbing the hill"),
        img("File:Charles Street Boston.jpg", 1280, 854, "Charles Street", "Antique shops and cafés"),
        img("File:Massachusetts State House.jpg", 1280, 960, "State House", "Gold-domed capitol building"),
        img("File:Louisburg Square Boston.jpg", 1280, 854, "Louisburg Square", "Boston's most exclusive address"),
        img("File:Boston Common.jpg", 1280, 854, "Boston Common", "America's oldest public park"),
      ],
      BOSTON_X,
      [
        { heading: "What makes this route special", body: "Beacon Hill is Boston's most beautiful residential neighbourhood — nineteenth-century brick townhouses, gas lanterns, and cobblestone alleys frozen in a genteel time warp. Acorn Street, barely wider than a car, is called the most photographed street in Boston. Charles Street at the foot of the hill is lined with antique dealers and cosy cafés. The Massachusetts State House, topped by a golden dome, presides over the whole scene." },
        { heading: "Getting there and starting point", body: "Red or Green Line to Park Street station, then a five-minute walk. Start at the State House and climb into the residential streets. Crossing Boston Common to get there is a pleasant approach." },
        { heading: "Key stops", body: "The State House offers free interior tours and a gleaming gold dome. Acorn Street is a short cobblestone lane and an essential photo stop. Louisburg Square is Boston's most exclusive residential square, ringed by iron fences. Charles Street has antique furniture, rare books, and cafés. Boston Common, America's oldest public park, is the perfect bookend." },
        { heading: "Best times to visit", body: "Morning light is best for Acorn Street photos. Charles Street shops open around 10 to 11 am. Autumn (September to November) brings spectacular foliage against the red brick. Winter holiday decorations add extra charm." },
        { heading: "Practical tips", body: "Wear sturdy shoes — the cobblestones and hills are real. Keep noise down in the residential streets. Restrooms in Charles Street cafés and the Boston Common visitor centre. Watch for icy sidewalks in winter. An eSIM keeps your history lookups and navigation running smoothly." },
      ],
      [
        { q: "Is Beacon Hill safe?", a: "One of Boston's safest neighbourhoods, day and night." },
        { q: "Is Acorn Street crowded?", a: "Autumn weekends draw photographers. Weekday mornings are quietest." },
        { q: "Is there parking?", a: "Extremely limited in the residential streets. Use public transit." },
        { q: "How long does the walk take?", a: "Ninety minutes to two hours for the hill. Three to four hours with Charles Street shopping." },
      ],
    ),
  },

  // ─── 15. Boston — North End ───────────────────────────────────────
  "boston-north-end-walk": {
    ja: ja(US_JA_CTA,
      "ノースエンドのイタリア人街と海辺",
      "ボストンのノースエンドを歩き、イタリアンレストラン、カンノーリの名店、フリーダムトレイルの史跡を巡るルートガイド。",
      img("File:Hanover Street Boston.jpg", 1280, 854, "ハノーバー通り", "イタリアンレストランが並ぶメインストリート"),
      [
        img("File:Mike's Pastry Boston.jpg", 1280, 854, "マイクスペストリー", "カンノーリの名店"),
        img("File:Old North Church Boston.jpg", 1280, 960, "オールドノースチャーチ", "1723年築のボストン最古の教会"),
        img("File:Paul Revere House Boston.jpg", 1280, 854, "ポール・リヴィアの家", "独立戦争の英雄の旧宅"),
        img("File:Boston waterfront North End.jpg", 1280, 854, "ウォーターフロント", "ハーバーウォーク沿いの眺め"),
        img("File:Copp's Hill Burying Ground.jpg", 1280, 854, "コップスヒル墓地", "17世紀の歴史的墓地"),
      ],
      BOSTON_X,
      [
        { heading: "このルートの特徴", body: "ノースエンドはボストン最古の住宅地で、19世紀からイタリア系移民が築いたリトルイタリーとして知られます。ハノーバー通りにはイタリアンレストラン、ベーカリー、カフェが密集し、カンノーリやエスプレッソの香りが漂います。同時にフリーダムトレイル沿いの歴史的スポットも多く、アメリカ独立の歴史とイタリアの食文化を一度に楽しめる贅沢なエリアです。" },
        { heading: "アクセスと起点", body: "メトロ・グリーンラインまたはオレンジラインのヘイマーケット駅から徒歩3分。ローズケネディグリーンウェイを渡ればすぐノースエンドです。起点はハノーバー通りの入口が便利で、通りをまっすぐ歩くとオールドノースチャーチ方面に向かえます。" },
        { heading: "主要スポット", body: "マイクスペストリーとモダンペストリーはカンノーリの二大名店で、どちらも行列ができる人気ぶり。オールドノースチャーチは1723年築でボストン最古の教会、独立戦争の合図がここから送られました。ポール・リヴィアの家は木造建築として現存する貴重な史跡。コップスヒル墓地からはチャールズタウンのバンカーヒル記念塔が見渡せます。ウォーターフロントのハーバーウォークは海辺の散歩に最適です。" },
        { heading: "時間帯とタイミング", body: "マイクスペストリーは午前中が比較的空いています。ランチタイム（12〜14時）はレストランが混みます。フリーダムトレイルの史跡は午前中に回るのが効率的。夏季の週末にはイタリア系の聖人祭（フィエスタ）が開かれ、通りが屋台で埋まります。" },
        { heading: "実用情報", body: "ノースエンドは非常にコンパクトで全て徒歩圏内。通りが狭いので車は不向きです。トイレはレストランやオールドノースチャーチで借りられます。カンノーリは現金のみの店もあるので小銭を用意。eSIMがあればフリーダムトレイルの音声ガイドアプリやレストラン検索がスムーズです。" },
      ],
      [
        { q: "ノースエンドの治安は?", a: "ボストンで最も安全なエリアのひとつです。夜間もレストラン街は賑わっています。" },
        { q: "マイクスペストリーの待ち時間は?", a: "週末の午後は20〜30分待ちになることがあります。平日午前中がおすすめです。" },
        { q: "フリーダムトレイルはここから歩ける?", a: "はい、ノースエンドにはフリーダムトレイル上のスポットが複数あり、ダウンタウン方面へも歩いて続けられます。" },
        { q: "所要時間は?", a: "食事とカンノーリ込みで2〜3時間。史跡もじっくり見るなら半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Boston's North End Italian Quarter and Waterfront Walk",
      "Taste Boston's Little Italy — cannoli rivals, Freedom Trail history, and harbour views in the North End.",
      img("File:Hanover Street Boston.jpg", 1280, 854, "Hanover Street", "Italian restaurants lining the main street"),
      [
        img("File:Mike's Pastry Boston.jpg", 1280, 854, "Mike's Pastry", "Legendary cannoli shop"),
        img("File:Old North Church Boston.jpg", 1280, 960, "Old North Church", "Boston's oldest church, built 1723"),
        img("File:Paul Revere House Boston.jpg", 1280, 854, "Paul Revere House", "Revolutionary War hero's home"),
        img("File:Boston waterfront North End.jpg", 1280, 854, "Waterfront", "Harbour Walk views"),
        img("File:Copp's Hill Burying Ground.jpg", 1280, 854, "Copp's Hill", "Seventeenth-century burial ground"),
      ],
      BOSTON_X,
      [
        { heading: "What makes this route special", body: "The North End is Boston's oldest residential neighbourhood and its Little Italy since the nineteenth century. Hanover Street is packed with Italian restaurants, bakeries, and espresso bars. At the same time, the neighbourhood sits on the Freedom Trail, so you can mix cannoli with colonial history in a single walk. The waterfront Harbour Walk adds ocean breezes and skyline views." },
        { heading: "Getting there and starting point", body: "Green or Orange Line to Haymarket station, then a three-minute walk across the Rose Kennedy Greenway. Enter at Hanover Street and walk north toward the Old North Church." },
        { heading: "Key stops", body: "Mike's Pastry and Modern Pastry are the duelling cannoli institutions — try both and pick a side. The Old North Church, built in 1723, is where the lantern signal launched Paul Revere's ride. The Paul Revere House is one of the oldest surviving wooden structures in the city. Copp's Hill Burying Ground offers views of Bunker Hill Monument across the water. The Harbour Walk is perfect for a post-meal stroll." },
        { heading: "Best times to visit", body: "Mike's Pastry is less hectic in the morning. Lunch rush hits noon to 2 pm. Freedom Trail sites are best visited in the morning. Summer weekends bring Italian saint festivals — the streets fill with food stalls and parades." },
        { heading: "Practical tips", body: "The North End is tiny and entirely walkable. Streets are narrow — do not drive. Restrooms in restaurants and the Old North Church. Some bakeries are cash-only, so carry small bills. An eSIM helps with Freedom Trail audio-guide apps and restaurant searches." },
      ],
      [
        { q: "Is the North End safe?", a: "One of Boston's safest areas. Restaurant streets stay busy well into the evening." },
        { q: "How long is the wait at Mike's?", a: "Weekend afternoons can mean a twenty-to-thirty-minute queue. Weekday mornings are quick." },
        { q: "Can I walk the Freedom Trail from here?", a: "Yes — several Trail stops are in the North End, and you can continue south toward downtown." },
        { q: "How long does the walk take?", a: "Two to three hours with food. Half a day if you explore the historical sites in depth." },
      ],
    ),
  },

  // ─── 16. Montréal — Plateau ───────────────────────────────────────
  "montreal-plateau-walk": {
    ja: ja(CA_JA_CTA,
      "プラトーモンロワイヤルの階段通りとカフェ",
      "モントリオールのプラトー地区を歩き、カラフルな外階段、バイリンガルなカフェ文化、独立系書店を楽しむルートガイド。",
      img("File:Plateau Mont-Royal Montreal.jpg", 1280, 854, "プラトーモンロワイヤル", "カラフルな外階段が特徴の住宅街"),
      [
        img("File:Saint-Laurent Boulevard Montreal.jpg", 1280, 854, "サン・ローラン大通り", "多文化が交差するメインストリート"),
        img("File:Mont Royal Park Montreal.jpg", 1280, 960, "モンロワイヤル公園", "市街地を一望できる丘の公園"),
        img("File:Schwartz's Deli Montreal.jpg", 1280, 854, "シュワルツデリ", "スモークミートの名店"),
        img("File:Parc La Fontaine Montreal.jpg", 1280, 854, "ラ・フォンテーヌ公園", "地元住民憩いの湖畔公園"),
        img("File:Mile End Montreal.jpg", 1280, 854, "マイルエンド", "ベーグルとクリエイティブの街"),
      ],
      MONTREAL_X,
      [
        { heading: "このルートの特徴", body: "プラトーモンロワイヤルはモントリオールで最も個性的な住宅街で、カラフルな外階段のある集合住宅が通り全体に並ぶ独特の景観が広がります。フランス語圏の文化と英語圏の文化が混じり合うバイリンガルなカフェ文化、独立系書店、ヴィンテージショップが集まり、ボヘミアンな雰囲気に包まれています。隣接するマイルエンド地区はベーグル戦争（フェアモントvsサン・ヴィアトゥール）の舞台でもあります。" },
        { heading: "アクセスと起点", body: "メトロ・オレンジラインのモンロワイヤル駅またはシェルブルック駅から徒歩すぐ。起点はモンロワイヤル通りとサン・ローラン大通りの交差点がおすすめ。ここから南北にカフェやショップを巡り、東にラ・フォンテーヌ公園、北にマイルエンドへと足を延ばせます。" },
        { heading: "主要スポット", body: "サン・ローラン大通りは英仏文化の境界線で、レストラン、バー、ライブハウスが集中。シュワルツデリは1928年創業のスモークミートサンドイッチの聖地で行列必至。ラ・フォンテーヌ公園は湖畔でのんびりできる憩いの場。マイルエンドではフェアモントベーグルとサン・ヴィアトゥールベーグルの食べ比べが定番。モンロワイヤル公園の展望台からはモントリオール市街が一望できます。" },
        { heading: "時間帯とタイミング", body: "カフェは朝から営業しているので、まずコーヒーとベーグルで朝食。午前中に外階段の街並み散策とシュワルツデリへ。午後はラ・フォンテーヌ公園でのんびり。夏（6〜8月）はテラス席が最高で、冬はホットチョコレートが楽しめます。" },
        { heading: "実用情報", body: "プラトーはコンパクトで全て徒歩圏内。BIXIバイクシェアも便利です。フランス語が主要言語ですが、英語も広く通じます。トイレはカフェ利用時に。冬は-20度以下になることもあるので防寒必須。eSIMがあれば翻訳アプリやBIXIアプリがスムーズに使えます。" },
      ],
      [
        { q: "プラトーの治安は?", a: "モントリオールで最も安全なエリアのひとつです。夜間も問題ありません。" },
        { q: "シュワルツデリの待ち時間は?", a: "ランチタイムは30分以上待つこともあります。11時前か14時以降が狙い目です。" },
        { q: "英語は通じる?", a: "フランス語圏ですが、観光エリアでは英語が広く通じます。フランス語の挨拶を使うと喜ばれます。" },
        { q: "所要時間は?", a: "プラトーだけなら3〜4時間。マイルエンドとモンロワイヤル公園を含めると丸一日です。" },
      ],
    ),
    en: en(CA_EN_CTA,
      "Plateau Mont-Royal Stairway and Café Walk in Montréal",
      "Wander Montréal's most bohemian quarter — colourful outdoor staircases, bilingual café culture, and the famous smoked-meat rivalry.",
      img("File:Plateau Mont-Royal Montreal.jpg", 1280, 854, "Plateau Mont-Royal", "Colourful outdoor staircases on residential streets"),
      [
        img("File:Saint-Laurent Boulevard Montreal.jpg", 1280, 854, "Boulevard Saint-Laurent", "Multicultural main drag"),
        img("File:Mont Royal Park Montreal.jpg", 1280, 960, "Mont Royal Park", "Hilltop park with city views"),
        img("File:Schwartz's Deli Montreal.jpg", 1280, 854, "Schwartz's Deli", "Legendary smoked-meat sandwich shop"),
        img("File:Parc La Fontaine Montreal.jpg", 1280, 854, "Parc La Fontaine", "Lakeside park for locals"),
        img("File:Mile End Montreal.jpg", 1280, 854, "Mile End", "Bagel and creative quarter"),
      ],
      MONTREAL_X,
      [
        { heading: "What makes this route special", body: "The Plateau Mont-Royal is Montréal's most distinctive residential neighbourhood, famous for its colourful outdoor staircases zigzagging up triplexes. Bilingual café culture — French on one side of Saint-Laurent, English on the other — defines the vibe. Independent bookshops, vintage stores, and live-music venues fill every block. Neighbouring Mile End is the stage for the great bagel war between Fairmount and St-Viateur." },
        { heading: "Getting there and starting point", body: "Orange Line Metro to Mont-Royal or Sherbrooke station. Start at the intersection of Avenue du Mont-Royal and Boulevard Saint-Laurent, then fan out — south to Parc La Fontaine, north to Mile End." },
        { heading: "Key stops", body: "Boulevard Saint-Laurent is the cultural dividing line of the city, packed with restaurants and bars. Schwartz's Deli has served smoked meat since 1928 — the queue is part of the experience. Parc La Fontaine offers lakeside calm. In Mile End, taste-test Fairmount and St-Viateur bagels back to back. The Mont-Royal Park lookout gives a panoramic sweep of the city." },
        { heading: "Best times to visit", body: "Start with coffee and a bagel in the morning. Hit the staircase streets and Schwartz's before noon. Afternoon in Parc La Fontaine. Summer (June to August) is terrace season; winter brings cosy hot chocolate. The Plateau is lively year-round." },
        { heading: "Practical tips", body: "The Plateau is compact and walkable. BIXI bike-share stations are everywhere. French is the primary language, but English is widely understood — a few French greetings go a long way. Restrooms in cafés. Winter drops to minus twenty, so dress warmly. An eSIM keeps translation and BIXI apps running." },
      ],
      [
        { q: "Is the Plateau safe?", a: "Very safe, day and night. One of Montréal's friendliest neighbourhoods." },
        { q: "How long is the wait at Schwartz's?", a: "Lunchtime can mean thirty-plus minutes. Go before 11 am or after 2 pm." },
        { q: "Is English spoken?", a: "Widely, though French is the main language. A bonjour opener is appreciated." },
        { q: "How long does the walk take?", a: "Three to four hours for the Plateau alone. A full day with Mile End and Mont Royal." },
      ],
    ),
  },

  // ─── 17. Montréal — Old Port ──────────────────────────────────────
  "montreal-old-port-walk": {
    ja: ja(CA_JA_CTA,
      "オールドモントリオールの石畳散策",
      "モントリオール旧市街を歩き、ノートルダム大聖堂、石畳の通り、港沿いのウォーターフロントを巡るルートガイド。",
      img("File:Notre-Dame Basilica Montreal.jpg", 1280, 854, "ノートルダム大聖堂", "壮麗なネオゴシック様式の大聖堂"),
      [
        img("File:Old Montreal cobblestone.jpg", 1280, 854, "石畳の通り", "17世紀の街並みが残る旧市街"),
        img("File:Place Jacques-Cartier Montreal.jpg", 1280, 854, "ジャック・カルティエ広場", "レストランとパフォーマーの広場"),
        img("File:Old Port Montreal.jpg", 1280, 960, "オールドポート", "セントローレンス川沿いの港湾エリア"),
        img("File:Bonsecours Market Montreal.jpg", 1280, 854, "ボンスクール市場", "19世紀のネオクラシック市場"),
        img("File:Montreal City Hall.jpg", 1280, 854, "モントリオール市庁舎", "第二帝政様式の壮麗な建物"),
      ],
      MONTREAL_X,
      [
        { heading: "このルートの特徴", body: "オールドモントリオールはセントローレンス川沿いに広がる17世紀フランス植民地時代の旧市街で、石畳の通りにグレーストーンの建物が並ぶヨーロッパ的な景観が広がります。ノートルダム大聖堂はパリの本家にも引けを取らない壮麗さで、内部のブルーを基調とした装飾は息をのむ美しさ。港沿いのウォーターフロントはサイクリングや散歩に最適な開放的な空間です。" },
        { heading: "アクセスと起点", body: "メトロ・オレンジラインのプラス・ダルム駅から徒歩2分でノートルダム大聖堂。起点は大聖堂前のダルム広場が定番で、ここからジャック・カルティエ広場、ボンスクール市場方面に東へ歩くルートがおすすめです。" },
        { heading: "主要スポット", body: "ノートルダム大聖堂は入場料を払って内部見学する価値があります。ブルーの天井と精緻な木彫りは圧巻。ジャック・カルティエ広場は夏にはパフォーマーやレストランのテラスで賑わいます。ボンスクール市場はケベック産のお土産を扱うショップが入居。セントローレンス川沿いのオールドポートは冬にはスケートリンクに、夏にはビーチやサイエンスセンターで賑わいます。" },
        { heading: "時間帯とタイミング", body: "ノートルダム大聖堂は午前中が空いています。ジャック・カルティエ広場は昼過ぎから賑わいます。夏（6〜8月）はテラス席と港のイベントが最高。冬はライトアップされた旧市街が幻想的で、アイススケートも楽しめます。" },
        { heading: "実用情報", body: "石畳の道が多いので歩きやすい靴を。冬は路面凍結するので滑りにくい靴底が必須。トイレはボンスクール市場やカフェが便利。英語・フランス語どちらも通じます。eSIMがあれば大聖堂の見学予約やレストラン検索がスムーズです。" },
      ],
      [
        { q: "オールドモントリオールの治安は?", a: "観光エリアなので非常に安全です。夜間もレストラン街は賑わっています。" },
        { q: "ノートルダム大聖堂の入場料は?", a: "約18カナダドル（約2,000円）です。光と音のショーは別料金ですが見る価値があります。" },
        { q: "冬でも楽しめる?", a: "ライトアップされた旧市街は冬が最も美しいという人も多いです。アイススケートも楽しめます。" },
        { q: "所要時間は?", a: "大聖堂とオールドポートで2〜3時間。食事とショッピングを含めると半日です。" },
      ],
    ),
    en: en(CA_EN_CTA,
      "Old Montréal Cobblestone and Waterfront Walk",
      "Explore Montréal's French-colonial heart — Notre-Dame Basilica, cobblestone lanes, and the St Lawrence waterfront.",
      img("File:Notre-Dame Basilica Montreal.jpg", 1280, 854, "Notre-Dame Basilica", "Stunning neo-Gothic interior"),
      [
        img("File:Old Montreal cobblestone.jpg", 1280, 854, "Cobblestone streets", "Seventeenth-century old town"),
        img("File:Place Jacques-Cartier Montreal.jpg", 1280, 854, "Place Jacques-Cartier", "Restaurants and performers"),
        img("File:Old Port Montreal.jpg", 1280, 960, "Old Port", "St Lawrence River waterfront"),
        img("File:Bonsecours Market Montreal.jpg", 1280, 854, "Bonsecours Market", "Neoclassical market hall"),
        img("File:Montreal City Hall.jpg", 1280, 854, "City Hall", "Second Empire grandeur"),
      ],
      MONTREAL_X,
      [
        { heading: "What makes this route special", body: "Old Montréal is a seventeenth-century French-colonial quarter of greystone buildings and cobblestone streets along the St Lawrence River. Notre-Dame Basilica rivals its Parisian namesake with an interior awash in blue and gold. The waterfront Old Port area adds a modern counterpoint with cycling paths, a science centre, and seasonal events. It is the most European-feeling neighbourhood in North America." },
        { heading: "Getting there and starting point", body: "Orange Line Metro to Place-d'Armes station, a two-minute walk to Notre-Dame Basilica. Start at Place d'Armes in front of the basilica, then walk east toward Place Jacques-Cartier and the Bonsecours Market." },
        { heading: "Key stops", body: "Notre-Dame Basilica's blue-vaulted interior and carved woodwork justify the admission fee. Place Jacques-Cartier buzzes with performers and terrace dining in summer. Bonsecours Market houses Québécois souvenir shops. The Old Port waterfront transforms seasonally — skating rink in winter, urban beach in summer." },
        { heading: "Best times to visit", body: "Mornings for a quieter basilica visit. Place Jacques-Cartier livens up after lunch. Summer (June to August) is terrace season. Winter brings magical illumination and ice skating." },
        { heading: "Practical tips", body: "Wear comfortable shoes for cobblestones. Non-slip soles are essential in winter. Restrooms in Bonsecours Market and cafés. Both English and French are spoken. An eSIM helps with basilica bookings and restaurant searches." },
      ],
      [
        { q: "Is Old Montréal safe?", a: "Very safe — it is a major tourist area. Restaurant streets are lively at night." },
        { q: "How much is Notre-Dame entry?", a: "About C$18. The light-and-sound show is extra but worth it." },
        { q: "Is it worth visiting in winter?", a: "Absolutely — the illuminated old town is arguably more beautiful in winter. Plus there is ice skating." },
        { q: "How long does the walk take?", a: "Two to three hours for the basilica and waterfront. Half a day with dining and shopping." },
      ],
    ),
  },

  // ─── 18. Honolulu — Chinatown ─────────────────────────────────────
  "honolulu-chinatown-walk": {
    ja: ja(US_JA_CTA,
      "ホノルル・チャイナタウンのアート散策",
      "ホノルルのチャイナタウンを歩き、ギャラリー、ローカルフード、歴史的マーケットを巡るルートガイド。",
      img("File:Chinatown Honolulu.jpg", 1280, 854, "チャイナタウン", "ホノルル最古の商業地区"),
      [
        img("File:Oahu Market Honolulu.jpg", 1280, 854, "オアフマーケット", "1904年創業の生鮮市場"),
        img("File:Chinatown art gallery Honolulu.jpg", 1280, 854, "アートギャラリー", "増加するギャラリーシーン"),
        img("File:Maunakea Street Honolulu.jpg", 1280, 854, "マウナケア通り", "レイショップと飲食店が並ぶ通り"),
        img("File:Foster Botanical Garden Honolulu.jpg", 1280, 960, "フォスター植物園", "ハワイ最古の植物園"),
        img("File:Chinatown Cultural Plaza Honolulu.jpg", 1280, 854, "チャイナタウン文化プラザ", "アジア系コミュニティの中心"),
      ],
      HONOLULU_X,
      [
        { heading: "このルートの特徴", body: "ホノルルのチャイナタウンはワイキキビーチとは全く異なる顔を持つエリアで、19世紀の中国系移民が築いた歴史的商業地区です。近年はギャラリーやクラフトカクテルバーが増え、ホノルルのアートシーンの中心地となっています。オアフマーケットでは地元の生鮮食品やハワイの食材が手に入り、レイショップではフレッシュフラワーレイを購入できます。" },
        { heading: "アクセスと起点", body: "ワイキキからバスまたはタクシーで約15分。起点はホテルストリートとマウナケア通りの交差点が便利です。ここからマウナケア通りを南に歩き、オアフマーケットやギャラリーを巡るルートがおすすめです。" },
        { heading: "主要スポット", body: "オアフマーケットは1904年創業の生鮮市場で、新鮮な魚介、トロピカルフルーツ、ポケが揃います。マウナケア通りにはレイショップが並び、生花のレイを購入できます。フォスター植物園はハワイ最古の植物園で、巨大な熱帯樹木が茂る静かなオアシス。ファーストフライデー（毎月第1金曜）にはギャラリーが一斉にオープンし、通りがアートイベントに変わります。" },
        { heading: "時間帯とタイミング", body: "オアフマーケットは朝早くから営業しており、午前中の訪問がベスト。ギャラリーは11時頃から。ファーストフライデー（毎月第1金曜の夕方）はチャイナタウン散策の最高のタイミング。ランチはベトナム料理のフォーやハワイアンプレートランチがおすすめです。" },
        { heading: "実用情報", body: "チャイナタウンはコンパクトで全て徒歩圏内。日中の観光エリアは安全ですが、周辺部は夜間注意が必要です。トイレは文化プラザやレストランが便利。現金を多少持っておくとマーケットでの買い物に便利。eSIMがあればギャラリー情報やバス時刻表の確認がスムーズです。" },
      ],
      [
        { q: "チャイナタウンの治安は?", a: "日中の観光エリアは安全です。夜間はファーストフライデーなどイベント時以外は早めに退去しましょう。" },
        { q: "ワイキキからの行き方は?", a: "バスで約15分。タクシーやUberでも10〜15分です。" },
        { q: "ファーストフライデーとは?", a: "毎月第1金曜日の夕方にギャラリーが一斉オープンし、アートウォークが開催されるイベントです。" },
        { q: "所要時間は?", a: "マーケットとギャラリーで2〜3時間。植物園を含めると半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Honolulu Chinatown Art and Market Walk",
      "Discover Honolulu beyond the beach — art galleries, fresh-lei shops, and historic markets in Chinatown.",
      img("File:Chinatown Honolulu.jpg", 1280, 854, "Chinatown", "Honolulu's oldest commercial district"),
      [
        img("File:Oahu Market Honolulu.jpg", 1280, 854, "Oahu Market", "Fresh market since 1904"),
        img("File:Chinatown art gallery Honolulu.jpg", 1280, 854, "Art gallery", "Growing gallery scene"),
        img("File:Maunakea Street Honolulu.jpg", 1280, 854, "Maunakea Street", "Lei shops and eateries"),
        img("File:Foster Botanical Garden Honolulu.jpg", 1280, 960, "Foster Botanical Garden", "Hawaii's oldest botanical garden"),
        img("File:Chinatown Cultural Plaza Honolulu.jpg", 1280, 854, "Cultural Plaza", "Asian community hub"),
      ],
      HONOLULU_X,
      [
        { heading: "What makes this route special", body: "Honolulu's Chinatown is a world away from Waikiki — a nineteenth-century Chinese-immigrant commercial district that has reinvented itself as the city's art hub. Galleries and craft-cocktail bars sit alongside decades-old lei shops and the bustling Oahu Market. First Friday gallery walks draw crowds every month. It is the best place to see Honolulu's multicultural roots and creative present in a single walk." },
        { heading: "Getting there and starting point", body: "Bus or taxi from Waikiki takes about fifteen minutes. Start at the intersection of Hotel Street and Maunakea Street, then walk south along Maunakea through the market and gallery blocks." },
        { heading: "Key stops", body: "Oahu Market, open since 1904, sells fresh fish, tropical fruit, and poke. Maunakea Street lei shops offer fragrant fresh-flower leis. Foster Botanical Garden is Hawaii's oldest garden, an oasis of towering tropical trees. First Friday (first Friday of each month, evening) turns the streets into an open-air art event." },
        { heading: "Best times to visit", body: "Oahu Market is best in the morning. Galleries open around 11 am. First Friday evenings are the prime time for a Chinatown visit. Lunch options include Vietnamese pho and Hawaiian plate lunches." },
        { heading: "Practical tips", body: "Chinatown is compact and walkable. The tourist area is safe by day; surrounding blocks need caution at night. Restrooms in the Cultural Plaza and restaurants. Carry some cash for market purchases. An eSIM helps with gallery info and bus schedules." },
      ],
      [
        { q: "Is Chinatown safe?", a: "The tourist core is safe during the day. At night, stick to First Friday events or leave early." },
        { q: "How do I get from Waikiki?", a: "Bus takes about fifteen minutes. Taxi or Uber is ten to fifteen minutes." },
        { q: "What is First Friday?", a: "A monthly evening event on the first Friday when galleries open late and an art walk takes over the streets." },
        { q: "How long does the walk take?", a: "Two to three hours for the market and galleries. Half a day with the botanical garden." },
      ],
    ),
  },

  // ─── 19. Honolulu — Kaimuki ───────────────────────────────────────
  "honolulu-kaimuki-walk": {
    ja: ja(US_JA_CTA,
      "カイムキのローカルグルメ通り",
      "ホノルルのカイムキ地区を歩き、地元で愛されるレストラン、カフェ、ベーカリーを巡るルートガイド。",
      img("File:Waialae Avenue Kaimuki.jpg", 1280, 854, "ワイアラエ通り", "カイムキのメインストリート"),
      [
        img("File:Kaimuki restaurants Honolulu.jpg", 1280, 854, "レストラン街", "多国籍料理が集まる通り"),
        img("File:Koko Head Cafe Kaimuki.jpg", 1280, 854, "ココヘッドカフェ", "人気ブランチスポット"),
        img("File:Wilhelmina Rise Kaimuki.jpg", 1280, 854, "ウィルヘルミナライズ", "丘の上からの眺望"),
        img("File:Kaimuki bakery Honolulu.jpg", 1280, 854, "ベーカリー", "地元のパン屋とスイーツ"),
        img("File:Kaimuki neighborhood Honolulu.jpg", 1280, 854, "住宅街", "穏やかなローカルの雰囲気"),
      ],
      HONOLULU_X,
      [
        { heading: "このルートの特徴", body: "カイムキはワイキキから車で約10分の住宅街で、ホノルルのフーディーたちが通うグルメエリアです。ワイアラエ通りを中心に、ハワイアン、日本食、ベトナム料理、メキシカンなど多国籍なレストランが軒を連ね、観光客向けではないリアルなローカルフードが楽しめます。丘の上からはダイヤモンドヘッドとワイキキの絶景が望めます。" },
        { heading: "アクセスと起点", body: "ワイキキからバスまたはタクシーで約10分。起点はワイアラエ通りと12thアベニューの交差点が便利で、ここからワイアラエ通りを東に歩いていくとレストランやカフェが次々に現れます。" },
        { heading: "主要スポット", body: "ココヘッドカフェは行列のできるブランチスポットで、ハワイアンフュージョンの朝食が人気。ワイアラエ通り沿いには個人経営のレストランが密集しており、寿司、フォー、タコスなどバラエティ豊か。地元のベーカリーではハワイアンスイートブレッドやマラサダ（ハワイ式ドーナツ）が買えます。ウィルヘルミナライズの丘を登れば、ダイヤモンドヘッドの壮大な眺めが広がります。" },
        { heading: "時間帯とタイミング", body: "ブランチなら9時〜11時にココヘッドカフェへ。ランチは12時〜14時にワイアラエ通りのレストランで。夕方はディナー前に丘の上からサンセットを眺めるのもおすすめ。週末はブランチ目当ての人で混みます。" },
        { heading: "実用情報", body: "カイムキはワイアラエ通り沿いがメインで、全て徒歩圏内です。路上パーキングは比較的見つけやすいです。トイレはレストランやカフェで。観光地化されていないので英語のメニューがないこともありますが、eSIMがあれば翻訳アプリで対応できます。" },
      ],
      [
        { q: "カイムキの治安は?", a: "安全な住宅街です。日中の散歩は全く問題ありません。" },
        { q: "ココヘッドカフェの予約は?", a: "予約は受け付けていません。週末は30分以上待つこともあります。開店時間に行くのがおすすめです。" },
        { q: "ワイキキからの行き方は?", a: "バスで約10分。タクシーやUberでも同程度です。" },
        { q: "所要時間は?", a: "食事メインで2〜3時間。丘の散歩を含めると半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Kaimuki Local Food Street Walk in Honolulu",
      "Eat your way through Honolulu's foodie neighbourhood — brunch cafés, multicultural restaurants, and hilltop views in Kaimuki.",
      img("File:Waialae Avenue Kaimuki.jpg", 1280, 854, "Waialae Avenue", "Kaimuki's main street"),
      [
        img("File:Kaimuki restaurants Honolulu.jpg", 1280, 854, "Restaurant row", "Multicultural dining strip"),
        img("File:Koko Head Cafe Kaimuki.jpg", 1280, 854, "Koko Head Cafe", "Popular brunch spot"),
        img("File:Wilhelmina Rise Kaimuki.jpg", 1280, 854, "Wilhelmina Rise", "Hilltop views"),
        img("File:Kaimuki bakery Honolulu.jpg", 1280, 854, "Bakery", "Local breads and sweets"),
        img("File:Kaimuki neighborhood Honolulu.jpg", 1280, 854, "Neighbourhood", "Quiet local residential feel"),
      ],
      HONOLULU_X,
      [
        { heading: "What makes this route special", body: "Kaimuki is where Honolulu's food lovers eat when they are not in Waikiki. Waialae Avenue, the main drag, is lined with independent restaurants serving Hawaiian, Japanese, Vietnamese, and Mexican fare — real local food, not tourist menus. The residential streets are quiet, and the hilltop of Wilhelmina Rise offers stunning views of Diamond Head and Waikiki. It is a taste of everyday Honolulu." },
        { heading: "Getting there and starting point", body: "About ten minutes by bus or taxi from Waikiki. Start at the intersection of Waialae Avenue and 12th Avenue, then walk east along Waialae to hit the restaurant and café blocks." },
        { heading: "Key stops", body: "Koko Head Cafe is a brunch institution with Hawaiian-fusion breakfasts — expect a queue on weekends. Waialae Avenue's independent restaurants span sushi, pho, tacos, and more. Local bakeries sell Hawaiian sweet bread and malasadas. A short climb up Wilhelmina Rise rewards you with a panoramic view of Diamond Head." },
        { heading: "Best times to visit", body: "Brunch at Koko Head Cafe between 9 and 11 am. Lunch on Waialae Avenue from noon to 2 pm. Late afternoon for a hilltop sunset view. Weekends are busiest for brunch." },
        { heading: "Practical tips", body: "Kaimuki is walkable along Waialae Avenue. Street parking is usually available. Restrooms in restaurants and cafés. Some menus are in Japanese or Vietnamese — an eSIM with translation apps helps." },
      ],
      [
        { q: "Is Kaimuki safe?", a: "A safe residential neighbourhood. No concerns for daytime walks." },
        { q: "Does Koko Head Cafe take reservations?", a: "No reservations — walk-in only. Weekend waits can exceed thirty minutes. Arrive at opening." },
        { q: "How do I get from Waikiki?", a: "Bus or ride-share, about ten minutes either way." },
        { q: "How long does the walk take?", a: "Two to three hours focused on food. Half a day with the hilltop walk." },
      ],
    ),
  },

  // ─── 20. Oahu — Kailua ────────────────────────────────────────────
  "oahu-kailua-walk": {
    ja: ja(US_JA_CTA,
      "カイルアのビーチタウン散歩",
      "オアフ島のカイルアを歩き、エメラルドグリーンのビーチ、おしゃれなタウンセンター、ローカルカフェを巡るルートガイド。",
      img("File:Kailua Beach Oahu.jpg", 1280, 854, "カイルアビーチ", "エメラルドグリーンの海と白砂ビーチ"),
      [
        img("File:Lanikai Beach Oahu.jpg", 1280, 854, "ラニカイビーチ", "天国の海と呼ばれる絶景ビーチ"),
        img("File:Kailua town center.jpg", 1280, 854, "カイルアタウン", "おしゃれなショップとカフェの街"),
        img("File:Lanikai Pillbox Trail Oahu.jpg", 1280, 854, "ラニカイピルボックス", "丘の上からの絶景トレイル"),
        img("File:Kailua farmers market.jpg", 1280, 854, "ファーマーズマーケット", "地元の新鮮食材が並ぶ市場"),
        img("File:Kailua kayaking Oahu.jpg", 1280, 854, "カヤック", "フラットアイランドへのカヤック"),
      ],
      HONOLULU_X,
      [
        { heading: "このルートの特徴", body: "カイルアはオアフ島の風上側（ウィンドワード）に位置するビーチタウンで、ワイキキとは異なる静かで洗練された雰囲気が魅力です。カイルアビーチは全米ベストビーチに何度も選ばれたエメラルドグリーンの海と白砂のビーチ。隣のラニカイビーチは「天国の海」の異名を持つ絶景スポット。タウンセンターにはローカルカフェやブティックが集まり、ビーチとショッピングの両方が楽しめます。" },
        { heading: "アクセスと起点", body: "ワイキキから車で約30分。バスは56番または57番で約45分。起点はカイルアタウンセンターが便利で、ここからビーチへは徒歩約15分です。レンタカーがあればビーチの駐車場に直接行けますが、週末は混雑するので早めの到着がおすすめです。" },
        { heading: "主要スポット", body: "カイルアビーチパークは広い砂浜とターコイズブルーの海が広がり、カヤックやSUPのレンタルも充実。ラニカイビーチは住宅街の小道を抜けてアクセスする隠れビーチで、モクルアと呼ばれる双子の島が目の前に浮かびます。ラニカイピルボックストレイルは約30分のハイキングで、頂上からカイルア湾の絶景パノラマが楽しめます。タウンセンターにはアサイーボウルやポケの人気店が点在しています。" },
        { heading: "時間帯とタイミング", body: "朝早くラニカイピルボックスに登ってサンライズを見るのが最高の体験。その後ビーチで泳ぎ、昼にタウンセンターでランチ。日曜の夕方にはファーマーズマーケットが開催されることも。貿易風が吹く午後はカイトサーフィンに最適です。" },
        { heading: "実用情報", body: "ラニカイビーチには公共トイレや駐車場がないので、カイルアビーチパークを拠点にしましょう。日焼け止めはリーフセーフ製品を使ってください（ハワイ州法で有害成分の日焼け止めは禁止）。ビーチには貴重品を持ち込まないこと。eSIMがあればカヤックレンタルの予約やレストラン検索がスムーズです。" },
      ],
      [
        { q: "カイルアビーチとラニカイビーチの違いは?", a: "カイルアは施設が充実した広いビーチ。ラニカイはこぢんまりした絶景ビーチですが施設はありません。" },
        { q: "ピルボックストレイルは難しい?", a: "片道約30分の短いハイキングですが、急な斜面があるので歩きやすい靴を。頂上からの眺めは絶景です。" },
        { q: "ワイキキからの行き方は?", a: "車で約30分。バスは56番か57番で約45分です。" },
        { q: "所要時間は?", a: "ビーチとタウンで半日。ピルボックスとカヤックを含めると丸一日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Kailua Beach Town Walk on Oahu",
      "Explore Oahu's windward paradise — emerald waters, the Lanikai Pillbox hike, and a charming town centre in Kailua.",
      img("File:Kailua Beach Oahu.jpg", 1280, 854, "Kailua Beach", "Emerald water and white sand"),
      [
        img("File:Lanikai Beach Oahu.jpg", 1280, 854, "Lanikai Beach", "The 'heavenly sea' beach"),
        img("File:Kailua town center.jpg", 1280, 854, "Kailua Town", "Boutiques and cafés"),
        img("File:Lanikai Pillbox Trail Oahu.jpg", 1280, 854, "Lanikai Pillbox Trail", "Hilltop panoramic viewpoint"),
        img("File:Kailua farmers market.jpg", 1280, 854, "Farmers market", "Fresh local produce"),
        img("File:Kailua kayaking Oahu.jpg", 1280, 854, "Kayaking", "Paddle to the Mokulua Islands"),
      ],
      HONOLULU_X,
      [
        { heading: "What makes this route special", body: "Kailua is Oahu's windward beach town — quieter and more polished than Waikiki. Kailua Beach has been named America's best beach multiple times, with turquoise water and soft white sand. Neighbouring Lanikai Beach, accessed through residential lanes, is a postcard of twin offshore islands and crystalline shallows. The town centre adds boutique shopping and locally loved cafés. It is the perfect day away from the hotel strip." },
        { heading: "Getting there and starting point", body: "About thirty minutes by car from Waikiki or forty-five minutes by bus (routes 56 or 57). Start at Kailua Town Centre, a fifteen-minute walk to the beach. If driving, head straight to Kailua Beach Park but arrive early on weekends for parking." },
        { heading: "Key stops", body: "Kailua Beach Park has wide sand, kayak and SUP rentals, and proper facilities. Lanikai Beach is a hidden gem with the twin Mokulua Islands framing the view. The Lanikai Pillbox Trail is a thirty-minute climb to a jaw-dropping panorama of Kailua Bay. In town, try açaí bowls and poke from local favourites." },
        { heading: "Best times to visit", body: "Sunrise at the Lanikai Pillbox is magical. Swim in the morning, lunch in town, and spend the afternoon on the beach. Sunday evenings sometimes bring a farmers' market. Afternoon trade winds are ideal for kite surfing." },
        { heading: "Practical tips", body: "Lanikai Beach has no public restrooms or parking — use Kailua Beach Park as your base. Sunscreen must be reef-safe by Hawaiian law. Leave valuables out of sight on the beach. An eSIM keeps kayak bookings and restaurant searches running." },
      ],
      [
        { q: "Kailua vs Lanikai — which is better?", a: "Kailua has facilities and space; Lanikai has stunning scenery but no amenities. Visit both." },
        { q: "Is the Pillbox Trail hard?", a: "About thirty minutes each way with some steep sections. Wear proper shoes. The view is outstanding." },
        { q: "How do I get from Waikiki?", a: "Car takes about thirty minutes. Bus routes 56 or 57 take around forty-five minutes." },
        { q: "How long should I spend?", a: "Half a day for beach and town. A full day with the Pillbox hike and kayaking." },
      ],
    ),
  },
};

export const AMERICAS_2_GUIDE_SLUGS = Object.keys(AMERICAS_2_GUIDE_CONTENT);
