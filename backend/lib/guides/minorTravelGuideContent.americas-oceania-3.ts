import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Americas & Oceania walking-guide articles — batch 3.
// 20 neighbourhood-level routes for Toronto, Washington DC, New Orleans,
// Seattle, Santiago, Medellín, Cusco, Auckland, Perth, and Oaxaca.

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

const CL_JA_CTA = {
  ctaTitle: "チリ旅行の通信をもっと楽に",
  ctaButton: "チリのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const CL_EN_CTA = {
  ctaTitle: "Stay connected in Chile",
  ctaButton: "View Chile eSIM plans",
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

const MX_JA_CTA = {
  ctaTitle: "メキシコ旅行の通信をもっと楽に",
  ctaButton: "メキシコのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const MX_EN_CTA = {
  ctaTitle: "Stay connected in Mexico",
  ctaButton: "View Mexico eSIM plans",
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

const TORONTO_X: GuideXEmbed[] = [
  { url: "https://x.com/SeeTorontoNow", label: "@SeeTorontoNow" },
  { url: "https://x.com/blogTO", label: "@blogTO" },
];
const DC_X: GuideXEmbed[] = [
  { url: "https://x.com/WashingtonDC", label: "@WashingtonDC" },
  { url: "https://x.com/capitalweather", label: "@capitalweather" },
];
const NOLA_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitNewOrleans", label: "@VisitNewOrleans" },
  { url: "https://x.com/NOLAcom", label: "@NOLAcom" },
];
const SEATTLE_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitSeattle", label: "@VisitSeattle" },
  { url: "https://x.com/SeattleTimes", label: "@SeattleTimes" },
];
const SANTIAGO_X: GuideXEmbed[] = [
  { url: "https://x.com/Chile_Travel", label: "@Chile_Travel" },
  { url: "https://x.com/santaboreal", label: "@santaboreal" },
];
const MEDELLIN_X: GuideXEmbed[] = [
  { url: "https://x.com/MedellinGuru", label: "@MedellinGuru" },
  { url: "https://x.com/Colombia_Travel", label: "@Colombia_Travel" },
];
const CUSCO_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitPeru", label: "@VisitPeru" },
  { url: "https://x.com/CuscoPost", label: "@CuscoPost" },
];
const AUCKLAND_X: GuideXEmbed[] = [
  { url: "https://x.com/AucklandNZ", label: "@AucklandNZ" },
  { url: "https://x.com/PureNewZealand", label: "@PureNewZealand" },
];
const PERTH_X: GuideXEmbed[] = [
  { url: "https://x.com/DestPerth", label: "@DestPerth" },
  { url: "https://x.com/wesaboreal", label: "@wesaboreal" },
];
const OAXACA_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitMexico", label: "@VisitMexico" },
  { url: "https://x.com/oaboreal", label: "@oaboreal" },
];

// ═══════════════════════════════════════════════════════════════════
// Content
// ═══════════════════════════════════════════════════════════════════

export const AMERICAS_OCEANIA_3_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ─── 1. Toronto — Kensington Market ─────────────────────────────
  "toronto-kensington-market-walk": {
    ja: ja(CA_JA_CTA,
      "ケンジントンマーケットのボヘミアン散策",
      "トロントのケンジントンマーケットを歩き、多国籍グルメとヴィンテージショップを巡るルートガイド。",
      img("File:Kensington Market entrance sign Toronto.jpg", 1280, 854, "ケンジントンマーケット入口", "カラフルな看板が迎えるマーケット入口"),
      [
        img("File:Kensington Market Toronto 2010.jpg", 1280, 854, "マーケットの通り", "ヴィンテージショップが並ぶオーガスタ通り"),
        img("File:Graffiti in Kensington Market, Toronto.jpg", 1280, 854, "ストリートアート", "壁面を彩るカラフルなグラフィティ"),
        img("File:Bellevue Square Park Toronto.jpg", 1280, 854, "ベルビュースクエア公園", "地元住民の憩いの場"),
        img("File:Chinatown Toronto Spadina Avenue.jpg", 1280, 854, "スパダイナ通り", "隣接するチャイナタウンの賑わい"),
        img("File:Pedestrian Sunday Kensington Market.jpg", 1280, 854, "歩行者天国", "夏季の歩行者天国イベント"),
      ],
      TORONTO_X,
      [
        { heading: "このルートの特徴", body: "ケンジントンマーケットはトロント中心部にありながら、チェーン店がほとんどない独立系ショップの集積地です。ポルトガル系、カリブ系、中華系の食文化が交差し、わずか数ブロックのなかにヴィンテージ古着屋、チーズ専門店、レコードショップが密集しています。築100年以上のビクトリア様式の家屋がカラフルに塗り替えられ、壁一面のグラフィティアートとともにボヘミアンな雰囲気を作り出しています。" },
        { heading: "アクセスと起点", body: "地下鉄2号線スパダイナ駅から徒歩5分、カレッジストリートカーでも到着できます。オーガスタ通りとダンダス通りの交差点を起点にすると、北から南へ自然に下るルートが組めます。隣接するチャイナタウンと組み合わせれば半日たっぷり楽しめます。" },
        { heading: "主要スポット", body: "オーガスタ通りのヴィンテージ店はそれぞれ品揃えに個性があり、ミリタリー古着やデッドストックのスニーカーなど掘り出し物も。チーズマジックでは世界各国のチーズを試食でき、隣の魚屋やベーカリーもローカルに人気です。ベルビュースクエア公園でコーヒー片手に一息つくのも定番。ナッソーストリートにはラテン系の食料品店やカフェが集まっています。" },
        { heading: "時間帯とおすすめ季節", body: "午前10時頃から店が開き始め、午後1〜3時がもっとも活気があります。夏季（5〜10月）の最終日曜にはペデストリアンサンデーが開催され、通りが歩行者天国になり、路上ライブやフードスタンドが出現します。冬はカフェ巡りがメインになりますが、人が少ないぶんゆっくり買い物ができます。" },
        { heading: "実用情報", body: "マーケット内はクレジットカード対応の店が増えていますが、小さな露店は現金のみの場合もあるので少額を持参しましょう。公衆トイレはベルビュースクエア公園にあります。Wi-Fiはカフェで利用可能ですが、eSIMがあれば移動中の地図検索も安心です。" },
      ],
      [
        { q: "ケンジントンマーケットの営業時間は?", a: "店舗ごとに異なりますが、多くは10時〜18時営業。月曜定休の店が多いので火〜日曜の訪問がおすすめです。" },
        { q: "ペデストリアンサンデーはいつ?", a: "5月〜10月の最終日曜に開催されます。正午〜19時頃まで車両が通行止めになります。" },
        { q: "所要時間の目安は?", a: "食事込みで2〜3時間。チャイナタウンも回るなら半日を見てください。" },
        { q: "治安は大丈夫?", a: "日中は観光客も多く安全です。夜間もバーエリアは人通りがありますが、暗い裏通りは避けましょう。" },
      ],
    ),
    en: en(CA_EN_CTA,
      "Kensington Market Bohemian Walk in Toronto",
      "Stroll through Toronto's Kensington Market — vintage shops, multicultural street food, and colourful murals in a chain-free neighbourhood.",
      img("File:Kensington Market entrance sign Toronto.jpg", 1280, 854, "Kensington Market entrance", "The colourful sign welcoming visitors"),
      [
        img("File:Kensington Market Toronto 2010.jpg", 1280, 854, "Market streets", "Vintage shops lining Augusta Avenue"),
        img("File:Graffiti in Kensington Market, Toronto.jpg", 1280, 854, "Street art", "Colourful graffiti covering the walls"),
        img("File:Bellevue Square Park Toronto.jpg", 1280, 854, "Bellevue Square Park", "A neighbourhood green space"),
        img("File:Chinatown Toronto Spadina Avenue.jpg", 1280, 854, "Spadina Avenue", "Adjacent Chinatown bustle"),
        img("File:Pedestrian Sunday Kensington Market.jpg", 1280, 854, "Pedestrian Sunday", "Summer car-free street event"),
      ],
      TORONTO_X,
      [
        { heading: "What makes this route special", body: "Kensington Market is one of the last chain-free neighbourhoods in downtown Toronto. Portuguese bakeries sit next to Caribbean jerk joints and vintage clothing racks spill onto the pavement. The Victorian-era houses have been painted every colour imaginable, and almost every wall doubles as a mural canvas. It feels like stepping into a different city — slower, louder, and far more eclectic than the glass towers just a few blocks east." },
        { heading: "Getting there and starting point", body: "Take the Line 2 subway to Spadina station and walk five minutes south, or hop on the College streetcar. Start at the corner of Augusta Avenue and Dundas Street West and work your way south. The adjacent Chinatown stretches along Spadina Avenue and makes an easy add-on for a half-day outing." },
        { heading: "Key stops", body: "Augusta Avenue is the vintage core — each shop has its own niche, from military surplus to deadstock sneakers. Cheese Magic lets you sample artisan cheeses from around the world. Bellevue Square Park is the perfect spot for a coffee break. Nassau Street has Latin American grocery stores and tiny cafés serving empanadas and arepas. The fish market on Baldwin Street has been operating for decades and is worth a peek even if you are not buying." },
        { heading: "Best times to visit", body: "Shops start opening around 10 am, and the market hits peak energy between 1 and 3 pm. The last Sunday of each month from May to October is Pedestrian Sunday, when the streets close to cars and fill with buskers, food stalls, and craft vendors. Winter visits are quieter but ideal for café hopping without the crowds." },
        { heading: "Practical tips", body: "Most shops now accept cards, but a few smaller stalls are cash only — carry some small bills. Public restrooms are in Bellevue Square Park. Free Wi-Fi is available in cafés, but an eSIM keeps your maps and transit apps running smoothly between stops." },
      ],
      [
        { q: "What are the opening hours?", a: "Most shops open 10 am to 6 pm. Many close on Mondays, so Tuesday through Sunday is best." },
        { q: "When is Pedestrian Sunday?", a: "The last Sunday of each month from May to October, roughly noon to 7 pm." },
        { q: "How much time should I budget?", a: "Two to three hours including a meal. Add extra time if you combine it with Chinatown." },
        { q: "Is the area safe?", a: "Very safe during the day with plenty of foot traffic. Evening bar streets are lively; just avoid dark side alleys late at night." },
      ],
    ),
  },

  // ─── 2. Toronto — Distillery District ───────────────────────────
  "toronto-distillery-district-walk": {
    ja: ja(CA_JA_CTA,
      "ディスティラリー地区の歴史的散歩",
      "トロントのディスティラリー地区を歩き、ヴィクトリア朝の産業建築とギャラリー・カフェを巡るルートガイド。",
      img("File:Distillery District December 2020.jpg", 1280, 854, "ディスティラリー地区", "赤レンガの歴史的建造物群"),
      [
        img("File:Gooderham and Worts Distillery.jpg", 1280, 854, "グーダーハム&ワーツ", "かつて世界最大の蒸溜所だった建物"),
        img("File:Distillery District Toronto art.jpg", 1280, 854, "パブリックアート", "地区内に点在する現代アート作品"),
        img("File:Young Centre for the Performing Arts.jpg", 1280, 854, "ヤングセンター", "旧タンク室を改装した劇場"),
        img("File:St. Lawrence Market Toronto.jpg", 1280, 854, "セントローレンスマーケット", "近隣の歴史的市場"),
        img("File:Corktown Common Toronto.jpg", 1280, 854, "コークタウンコモン", "再開発エリアの新しい公園"),
      ],
      TORONTO_X,
      [
        { heading: "このルートの特徴", body: "ディスティラリー地区は1832年創業のグーダーハム&ワーツ蒸溜所跡を再開発した歩行者専用エリアです。北米最大級のヴィクトリア朝産業建築群が保存され、赤レンガの壁と石畳の通りが独特の雰囲気を醸し出しています。現在はギャラリー、クラフトビール醸造所、チョコレート工房、カフェが入居し、車の通らない静かな空間で芸術と食文化を楽しめます。" },
        { heading: "アクセスと起点", body: "地下鉄1号線キング駅からキングストリートカーに乗り換え、パーラメントストリートで下車して徒歩5分。ユニオン駅からは504番カーで直通です。ミルストリートの入口ゲートを起点に、時計回りに地区内を巡ると効率的です。" },
        { heading: "主要スポット", body: "ミルストリートブルワリーでは地元醸造のクラフトビールが試飲できます。ソーマチョコレートは豆からバーまでの製造工程を公開しており、カカオの香りに包まれた店内は必見。ギャラリーは10以上あり、写真・彫刻・現代美術まで幅広いジャンルを無料で観覧できます。冬季にはトロント・クリスマスマーケットが開催され、イルミネーションが街区を彩ります。" },
        { heading: "時間帯とおすすめ季節", body: "午前中は人が少なく写真撮影に最適。カフェやレストランは11時頃から賑わい始めます。冬のクリスマスマーケット（11月中旬〜12月下旬）は夜のライトアップが美しく、最大の見どころです。夏はパティオ席でのビールが気持ちよく、週末にはストリートパフォーマンスも見られます。" },
        { heading: "実用情報", body: "地区内は完全歩行者専用で車の心配がありません。多くの店がカード決済に対応しています。トイレはブルワリーやカフェ内で利用可能。周辺のコークタウンやセントローレンスマーケットとの組み合わせで半日〜1日コースになります。eSIMがあれば地図での位置確認がスムーズです。" },
      ],
      [
        { q: "入場料は必要?", a: "地区への入場は無料です。クリスマスマーケット期間のみ週末に入場料がかかることがあります。" },
        { q: "所要時間の目安は?", a: "カフェやギャラリーを含め2〜3時間が目安です。食事をするなら3〜4時間見てください。" },
        { q: "クリスマスマーケットの時期は?", a: "例年11月中旬から12月下旬まで開催されます。平日夕方が比較的空いています。" },
        { q: "子供連れでも楽しめる?", a: "歩行者専用エリアなので安全です。チョコレート工房やパブリックアートは子供にも人気があります。" },
      ],
    ),
    en: en(CA_EN_CTA,
      "Distillery District Heritage Walk in Toronto",
      "Explore Toronto's Distillery District — Victorian-era red-brick warehouses turned galleries, craft breweries, and artisan cafés.",
      img("File:Distillery District December 2020.jpg", 1280, 854, "Distillery District", "Heritage red-brick buildings"),
      [
        img("File:Gooderham and Worts Distillery.jpg", 1280, 854, "Gooderham & Worts", "Once the world's largest distillery"),
        img("File:Distillery District Toronto art.jpg", 1280, 854, "Public art", "Contemporary installations throughout"),
        img("File:Young Centre for the Performing Arts.jpg", 1280, 854, "Young Centre", "Theatre in a former tank house"),
        img("File:St. Lawrence Market Toronto.jpg", 1280, 854, "St. Lawrence Market", "Nearby historic market"),
        img("File:Corktown Common Toronto.jpg", 1280, 854, "Corktown Common", "New park in the redevelopment area"),
      ],
      TORONTO_X,
      [
        { heading: "What makes this route special", body: "The Distillery District is a pedestrian-only village built inside the 1832 Gooderham and Worts whisky distillery — once the largest in the British Empire. Forty-seven heritage buildings of red brick and limestone line cobblestone lanes free of cars and chain stores. Today the complex houses galleries, a bean-to-bar chocolate maker, a craft brewery, and independent cafés, all within a compact loop you can walk in under an hour." },
        { heading: "Getting there and starting point", body: "From King station on Line 1, take the King streetcar east and alight at Parliament Street — the entrance gate is a five-minute walk south. The 504 streetcar from Union Station is a direct ride. Enter through the Mill Street gate and loop clockwise through the main lanes." },
        { heading: "Key stops", body: "Mill Street Brewery offers flights of locally brewed beer in a taproom set inside a former malt house. Soma Chocolatemaker roasts cacao on-site and sells single-origin bars you can watch being made. Over a dozen galleries cover photography, sculpture, and contemporary painting — all free to enter. In winter, the Toronto Christmas Market fills the lanes with lights, mulled wine, and artisan stalls." },
        { heading: "Best times to visit", body: "Mornings are quiet and ideal for photography. Cafés and restaurants get busy from around 11 am. The Christmas Market runs from mid-November to late December and is most magical after dark. Summer weekends bring patio season and street performances." },
        { heading: "Practical tips", body: "The entire district is car-free, so it is very stroller- and wheelchair-friendly. Most shops accept cards. Restrooms are available inside the brewery and cafés. Combine the visit with nearby Corktown Common or St. Lawrence Market for a half- to full-day outing. An eSIM is handy for map navigation between the district and adjacent neighbourhoods." },
      ],
      [
        { q: "Is there an admission fee?", a: "The district is free to enter year-round. The Christmas Market charges a small weekend admission fee." },
        { q: "How much time should I budget?", a: "Two to three hours for galleries and a café stop. Three to four with a sit-down meal." },
        { q: "When is the Christmas Market?", a: "Mid-November through late December. Weekday evenings are less crowded than weekends." },
        { q: "Is it family-friendly?", a: "Very much so — the car-free streets are safe for kids, and the chocolate factory and public art are big hits with families." },
      ],
    ),
  },

  // ─── 3. Washington DC — Georgetown ──────────────────────────────
  "dc-georgetown-walk": {
    ja: ja(US_JA_CTA,
      "ジョージタウンの石畳とカフェ散策",
      "ワシントンDCジョージタウンの石畳の通りを歩き、歴史的タウンハウスとカフェ、運河沿いの散歩を楽しむルートガイド。",
      img("File:Georgetown, Washington, D.C..jpg", 1280, 854, "ジョージタウンの通り", "歴史的なタウンハウスが並ぶメインストリート"),
      [
        img("File:Georgetown Waterfront Park.jpg", 1280, 854, "ウォーターフロントパーク", "ポトマック川沿いの遊歩道"),
        img("File:C&O Canal Georgetown.jpg", 1280, 854, "C&O運河", "かつての水運路が散歩道に"),
        img("File:M Street Georgetown Washington DC.jpg", 1280, 854, "Mストリート", "ブティックとレストランが並ぶメイン通り"),
        img("File:Dumbarton Oaks Gardens 01.jpg", 1280, 854, "ダンバートンオークス庭園", "美しい庭園と美術館"),
        img("File:Georgetown University Healy Hall.jpg", 1280, 854, "ジョージタウン大学", "歴史あるヒーリーホール"),
      ],
      DC_X,
      [
        { heading: "このルートの特徴", body: "ジョージタウンはワシントンDCで最も古い街区で、連邦政府成立以前の1751年に開かれました。石畳の路地、連邦様式のタウンハウス、ポトマック川沿いの遊歩道が一体となった散策エリアです。Mストリートとウィスコンシンアベニューを軸にブティック、カフェ、レストランが密集し、政治の街DCの中にあって最もヨーロッパ的な風情を持つ地区です。" },
        { heading: "アクセスと起点", body: "ジョージタウンにはメトロの駅がないため、フォギーボトム駅から徒歩15分、またはDCサーキュレーターバスで直行できます。Mストリートとウィスコンシンアベニューの交差点を起点に、まず南のウォーターフロントへ下り、C&O運河沿いを西へ歩くルートがおすすめです。" },
        { heading: "主要スポット", body: "ジョージタウンウォーターフロントパークはポトマック川の眺望が素晴らしく、ベンチでくつろぐのに最適。C&O運河のトウパスは木漏れ日の中を静かに歩ける散歩道です。ダンバートンオークスは美術館と手入れの行き届いた庭園を持ち、春のバラ園は息をのむ美しさ。Mストリートにはジョージタウンカップケーキなどの人気店が軒を連ねます。" },
        { heading: "時間帯とおすすめ季節", body: "午前中は静かで写真撮影に向いています。カフェやショップは10時頃から開き、午後はMストリートが賑わいます。春（4月）は桜とダンバートンオークスの花々が見事。秋は紅葉が石畳の通りを彩ります。夏は暑さが厳しいので午前中の散策がベターです。" },
        { heading: "実用情報", body: "石畳の道が多いので歩きやすい靴が必須です。駐車場は限られるので公共交通かライドシェアが便利。トイレはウォーターフロントパークやカフェで利用可能。eSIMがあれば地図での移動やレストラン検索がスムーズです。" },
      ],
      [
        { q: "ジョージタウンへのアクセスは?", a: "メトロの駅はありませんが、フォギーボトム駅から徒歩15分、またはDCサーキュレーターバスが便利です。" },
        { q: "所要時間の目安は?", a: "ショッピングと食事を含め3〜4時間が目安。ダンバートンオークスも回るなら半日を見てください。" },
        { q: "ダンバートンオークスの入場料は?", a: "庭園は有料（季節により変動）、美術館は無料です。" },
        { q: "食事のおすすめは?", a: "Mストリート沿いにイタリアン、フレンチ、アメリカンと多彩なレストランが揃っています。カジュアルならカップケーキやベーグル店もおすすめ。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Georgetown Cobblestone and Café Walk in Washington DC",
      "Walk the cobblestone streets of Georgetown — historic townhouses, canal paths, and waterfront cafés in Washington DC's oldest neighbourhood.",
      img("File:Georgetown, Washington, D.C..jpg", 1280, 854, "Georgetown street", "Historic townhouses along the main street"),
      [
        img("File:Georgetown Waterfront Park.jpg", 1280, 854, "Waterfront Park", "Promenade along the Potomac River"),
        img("File:C&O Canal Georgetown.jpg", 1280, 854, "C&O Canal", "Former trade canal turned walking path"),
        img("File:M Street Georgetown Washington DC.jpg", 1280, 854, "M Street", "Boutiques and restaurants"),
        img("File:Dumbarton Oaks Gardens 01.jpg", 1280, 854, "Dumbarton Oaks", "Beautiful gardens and museum"),
        img("File:Georgetown University Healy Hall.jpg", 1280, 854, "Georgetown University", "Historic Healy Hall"),
      ],
      DC_X,
      [
        { heading: "What makes this route special", body: "Georgetown predates the federal capital itself — it was chartered in 1751, forty years before Washington DC existed. Cobblestone side streets, Federal-style townhouses, and a towpath along the Chesapeake & Ohio Canal give the neighbourhood a distinctly European feel. M Street and Wisconsin Avenue form the commercial spine, packed with independent boutiques, bakeries, and upscale restaurants that draw both locals and visitors year round." },
        { heading: "Getting there and starting point", body: "Georgetown has no Metro station. The easiest approach is to walk fifteen minutes west from Foggy Bottom station or take the DC Circulator bus. Start at the intersection of M Street and Wisconsin Avenue and head south to the Waterfront Park on the Potomac, then loop west along the C&O Canal towpath." },
        { heading: "Key stops", body: "Georgetown Waterfront Park offers sweeping views of the Potomac and the Kennedy Center. The C&O Canal towpath is a leafy, car-free path perfect for a quiet stroll. Dumbarton Oaks houses a small but exquisite museum of Byzantine art and some of the finest formal gardens on the East Coast — the rose garden in spring is breathtaking. Back on M Street, Georgetown Cupcake and Baked & Wired are local institutions for a sugar break." },
        { heading: "Best times to visit", body: "Mornings are calm and great for photos. Shops open around 10 am, and M Street is liveliest in the afternoon. Spring brings cherry blossoms and garden flowers; autumn drapes the brick streets in red and gold. Summer can be hot and humid — stick to morning walks and canal-side shade." },
        { heading: "Practical tips", body: "Wear comfortable shoes — cobblestones are charming but uneven. Street parking is scarce, so public transit or ride-shares are recommended. Restrooms are available at Waterfront Park and inside cafés. An eSIM keeps your maps and restaurant searches running between stops." },
      ],
      [
        { q: "How do I get to Georgetown?", a: "No Metro station — walk from Foggy Bottom or take the DC Circulator bus." },
        { q: "How much time should I budget?", a: "Three to four hours for shopping and a meal. Half a day if you include Dumbarton Oaks." },
        { q: "Is Dumbarton Oaks free?", a: "The museum is free. The gardens charge a seasonal admission fee." },
        { q: "Where should I eat?", a: "M Street has Italian, French, and American options. For something quick, Georgetown Cupcake and Baked & Wired are popular." },
      ],
    ),
  },

  // ─── 4. Washington DC — Capitol Hill ────────────────────────────
  "dc-capitol-hill-walk": {
    ja: ja(US_JA_CTA,
      "キャピトルヒルの並木道と東部市場",
      "ワシントンDCキャピトルヒルの並木道を歩き、イースタンマーケットと歴史的タウンハウスを巡るルートガイド。",
      img("File:Eastern Market, Washington, D.C..jpg", 1280, 854, "イースタンマーケット", "1873年創業の歴史的市場"),
      [
        img("File:Capitol Hill rowhouses DC.jpg", 1280, 854, "キャピトルヒルのタウンハウス", "カラフルなロウハウスが並ぶ住宅街"),
        img("File:Lincoln Park DC.jpg", 1280, 854, "リンカーンパーク", "地元住民の憩いの公園"),
        img("File:Barracks Row Washington DC.jpg", 1280, 854, "バラックスロウ", "レストランとショップが並ぶ8th Street"),
        img("File:Library of Congress Thomas Jefferson Building.jpg", 1280, 854, "議会図書館", "世界最大の図書館の壮麗な建築"),
        img("File:United States Capitol Building.jpg", 1280, 960, "合衆国議事堂", "国会議事堂のドーム"),
      ],
      DC_X,
      [
        { heading: "このルートの特徴", body: "キャピトルヒルは合衆国議事堂の東側に広がる住宅街で、19世紀のロウハウス（長屋建築）が美しく保存されたエリアです。政治の中枢でありながら、並木道の下にはカフェやベーカリーが点在し、週末にはイースタンマーケットのフリーマーケットが賑わいます。観光客が多いナショナルモールとは対照的に、DC市民の日常生活が垣間見える散歩コースです。" },
        { heading: "アクセスと起点", body: "メトロのブルー/オレンジ/シルバー線イースタンマーケット駅が最寄りで、駅から市場まで徒歩1分です。イースタンマーケットを起点に、バラックスロウ（8th Street SE）を南下し、その後北へ向かって議会図書館方面へ歩くルートが効率的です。" },
        { heading: "主要スポット", body: "イースタンマーケットは1873年から続く市場で、平日は精肉・青果・チーズの対面販売、週末は屋外にアンティークやクラフトの露店が広がります。バラックスロウにはイタリアンやエチオピア料理の人気店が並びます。リンカーンパークは地元の子供たちが遊ぶ静かな公園。議会図書館トーマスジェファーソンビルは無料見学でき、天井画やグレートホールの壮麗さは必見です。" },
        { heading: "時間帯とおすすめ季節", body: "週末の午前中がベストで、イースタンマーケットの屋外フリーマーケットが最も充実します。議会図書館は平日のほうが空いています。春は並木のハナミズキが美しく、秋は紅葉が通りを彩ります。夏の午後は暑いので午前中の散策がおすすめです。" },
        { heading: "実用情報", body: "エリア全体が平坦で歩きやすいです。トイレはイースタンマーケット内と議会図書館で利用できます。バラックスロウのレストランは予約なしでも入れる店が多いです。eSIMがあればレストランの口コミ検索やバスの到着時刻確認に便利です。" },
      ],
      [
        { q: "イースタンマーケットの営業日は?", a: "火〜日曜営業、月曜定休。週末の屋外フリーマーケットは土日のみです。" },
        { q: "議会図書館は予約が必要?", a: "予約不要で入場無料です。セキュリティチェックがあるので身分証明書を持参してください。" },
        { q: "所要時間の目安は?", a: "マーケットとバラックスロウで2〜3時間。議会図書館も含めると半日が目安です。" },
        { q: "治安は?", a: "日中の主要通りは安全です。夜間は人通りが少なくなる裏通りを避け、メインストリートを歩きましょう。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Capitol Hill Tree-Lined Walk and Eastern Market in DC",
      "Explore Capitol Hill's tree-lined streets — rowhouse architecture, Eastern Market finds, and the Library of Congress in Washington DC.",
      img("File:Eastern Market, Washington, D.C..jpg", 1280, 854, "Eastern Market", "Historic market since 1873"),
      [
        img("File:Capitol Hill rowhouses DC.jpg", 1280, 854, "Capitol Hill rowhouses", "Colourful rowhouses on residential streets"),
        img("File:Lincoln Park DC.jpg", 1280, 854, "Lincoln Park", "Neighbourhood park"),
        img("File:Barracks Row Washington DC.jpg", 1280, 854, "Barracks Row", "Restaurants and shops on 8th Street"),
        img("File:Library of Congress Thomas Jefferson Building.jpg", 1280, 854, "Library of Congress", "The stunning Thomas Jefferson Building"),
        img("File:United States Capitol Building.jpg", 1280, 960, "US Capitol", "The Capitol dome"),
      ],
      DC_X,
      [
        { heading: "What makes this route special", body: "Capitol Hill is where Washington DC's political grandeur meets residential charm. East of the Capitol dome, tree-lined streets are flanked by beautifully preserved nineteenth-century rowhouses in every shade of red, grey, and cream. Eastern Market anchors the neighbourhood with a lively weekend flea market, while Barracks Row — the city's oldest commercial corridor — serves up everything from Ethiopian injera to wood-fired pizza. It is a side of DC that most tourists never see." },
        { heading: "Getting there and starting point", body: "Take the Blue, Orange, or Silver line to Eastern Market station. The market is a one-minute walk from the exit. Start here, head south along Barracks Row on 8th Street SE, then loop north toward the Library of Congress and the Capitol grounds." },
        { heading: "Key stops", body: "Eastern Market sells fresh meats, cheeses, and produce on weekdays; on weekends an outdoor flea market adds antiques, crafts, and street food. Barracks Row has some of the best casual dining on the Hill — try Ethiopian, Italian, or a classic American brunch. Lincoln Park is a quiet green break away from the crowds. The Library of Congress Thomas Jefferson Building is free and astonishing — the Great Hall ceiling alone is worth the visit." },
        { heading: "Best times to visit", body: "Weekend mornings are ideal for the outdoor flea market. The Library of Congress is quieter on weekdays. Spring brings flowering dogwoods along the residential blocks; autumn colours are equally photogenic. Summer afternoons can be brutally hot, so aim for morning walks." },
        { heading: "Practical tips", body: "The area is flat and very walkable. Restrooms are inside Eastern Market and the Library of Congress. Barracks Row restaurants are mostly walk-in friendly. An eSIM is useful for checking restaurant reviews and bus arrival times on the go." },
      ],
      [
        { q: "When is Eastern Market open?", a: "Tuesday to Sunday. The outdoor flea market runs Saturday and Sunday only. Closed Monday." },
        { q: "Do I need to book the Library of Congress?", a: "No reservation required, and admission is free. Bring a photo ID for security screening." },
        { q: "How much time should I budget?", a: "Two to three hours for the market and Barracks Row. Half a day if you include the Library of Congress." },
        { q: "Is it safe?", a: "Main streets are very safe during the day. At night, stick to well-lit roads and avoid quiet back alleys." },
      ],
    ),
  },

  // ─── 5. New Orleans — French Quarter ────────────────────────────
  "new-orleans-french-quarter-walk": {
    ja: ja(US_JA_CTA,
      "フレンチクォーターのジャズとバルコニー",
      "ニューオーリンズのフレンチクォーターを歩き、ジャズクラブとフランス植民地時代のバルコニー建築を楽しむルートガイド。",
      img("File:French Quarter03 New Orleans.jpg", 1280, 854, "フレンチクォーター", "鉄細工のバルコニーが続く通り"),
      [
        img("File:Jackson Square New Orleans.jpg", 1280, 854, "ジャクソンスクエア", "大聖堂を背景にした歴史的広場"),
        img("File:Bourbon Street New Orleans 2013.jpg", 1280, 854, "バーボンストリート", "ネオンサインが輝く夜の通り"),
        img("File:Cafe Du Monde New Orleans.jpg", 1280, 854, "カフェデュモンド", "名物ベニエとカフェオレの老舗"),
        img("File:St. Louis Cathedral New Orleans.jpg", 1280, 960, "セントルイス大聖堂", "アメリカ最古の大聖堂"),
        img("File:Royal Street French Quarter.jpg", 1280, 854, "ロイヤルストリート", "アンティークショップとギャラリーの通り"),
      ],
      NOLA_X,
      [
        { heading: "このルートの特徴", body: "フレンチクォーターはニューオーリンズで最も古い地区で、フランスとスペインの植民地時代に建てられた鉄細工のバルコニー付き建築が碁盤目状に並んでいます。ジャクソンスクエアを中心に、ジャズの生演奏が路上から聞こえ、カフェデュモンドのベニエの甘い香りが漂います。バーボンストリートの喧騒からロイヤルストリートの静かなギャラリーまで、数ブロックで雰囲気が劇的に変わるのがこの地区の魅力です。" },
        { heading: "アクセスと起点", body: "ストリートカーのカナルストリート停留所が最寄りで、フレンチクォーターの西端からアクセスできます。ジャクソンスクエアを起点にすると、大聖堂・カフェデュモンド・リバーウォークがまとまって回れます。その後ロイヤルストリートを北上し、バーボンストリートを横切るルートが効率的です。" },
        { heading: "主要スポット", body: "ジャクソンスクエアでは画家や占い師が出店し、セントルイス大聖堂の白い尖塔が背景に映えます。カフェデュモンドは24時間営業で、揚げたてのベニエに粉砂糖が山盛りにかかった名物は必食。ロイヤルストリートにはアンティーク家具店やジャズギャラリーが軒を連ね、日中は路上ミュージシャンの演奏が楽しめます。夜はバーボンストリートのライブハウスでニューオーリンズジャズを堪能しましょう。" },
        { heading: "時間帯とおすすめ季節", body: "午前中はジャクソンスクエア周辺が静かで散策に最適。夕方からバーボンストリートが賑わい始めます。2〜3月のマルディグラ期間は最大の祭りですが混雑も激しいです。10〜11月は気候が穏やかで歩きやすく、ジャズフェスティバルも開催されます。夏は高温多湿なので水分補給を忘れずに。" },
        { heading: "実用情報", body: "地区全体がコンパクトで徒歩で十分回れます。バーボンストリートではスリに注意し、貴重品は最小限にしましょう。トイレはカフェデュモンドやジャクソンブルワリーで利用可能。多くの店がカード対応ですが、路上パフォーマーへのチップ用に少額現金があると便利です。eSIMがあればジャズクラブの営業情報をリアルタイムで確認できます。" },
      ],
      [
        { q: "フレンチクォーターの治安は?", a: "日中は安全ですが、夜間のバーボンストリートではスリに注意。人通りの少ない裏通りは避けましょう。" },
        { q: "カフェデュモンドの待ち時間は?", a: "週末は30分以上並ぶことも。平日早朝や深夜（24時間営業）が空いています。" },
        { q: "所要時間の目安は?", a: "日中の散策で3〜4時間、夜のジャズクラブも含めると1日楽しめます。" },
        { q: "マルディグラの時期は?", a: "毎年2〜3月（イースターの47日前の火曜日まで）。パレードの日程は年によって異なります。" },
      ],
    ),
    en: en(US_EN_CTA,
      "French Quarter Jazz and Balcony Walk in New Orleans",
      "Stroll through New Orleans' French Quarter — wrought-iron balconies, live jazz on every corner, and beignets at Café Du Monde.",
      img("File:French Quarter03 New Orleans.jpg", 1280, 854, "French Quarter", "Wrought-iron balconies lining the street"),
      [
        img("File:Jackson Square New Orleans.jpg", 1280, 854, "Jackson Square", "Historic square with the cathedral backdrop"),
        img("File:Bourbon Street New Orleans 2013.jpg", 1280, 854, "Bourbon Street", "Neon-lit nightlife strip"),
        img("File:Cafe Du Monde New Orleans.jpg", 1280, 854, "Café Du Monde", "Iconic beignets and café au lait"),
        img("File:St. Louis Cathedral New Orleans.jpg", 1280, 960, "St. Louis Cathedral", "America's oldest cathedral"),
        img("File:Royal Street French Quarter.jpg", 1280, 854, "Royal Street", "Antiques and galleries"),
      ],
      NOLA_X,
      [
        { heading: "What makes this route special", body: "The French Quarter is the original heart of New Orleans, laid out in 1718 and still pulsing with life three centuries later. Wrought-iron balconies drip with ferns above narrow streets where jazz spills from doorways at all hours. Jackson Square anchors the quarter with street artists and fortune tellers under the spires of St. Louis Cathedral, while Royal Street offers a quieter corridor of antique dealers and gallery owners. A few blocks away, Bourbon Street flips the switch to neon and noise." },
        { heading: "Getting there and starting point", body: "The Canal Street streetcar stop sits at the western edge of the Quarter and makes a natural entry point. Walk to Jackson Square first to take in the cathedral, the river, and Café Du Monde. Then head north along Royal Street and eventually cross Bourbon Street for the full contrast." },
        { heading: "Key stops", body: "Jackson Square is the visual centrepiece — painters, buskers, and tarot readers set up daily. Café Du Monde serves powdered-sugar-dusted beignets around the clock. Royal Street's galleries and antique shops are best browsed during the day when some musicians set up impromptu performances on the pavement. By evening, Bourbon Street's live-music bars take over — Preservation Hall is the gold standard for traditional New Orleans jazz." },
        { heading: "Best times to visit", body: "Mornings are the calmest time for Jackson Square and Royal Street. Bourbon Street wakes up after dark. Mardi Gras in February or March is the ultimate spectacle, though crowds are intense. October and November bring pleasant temperatures and the Jazz and Heritage Festival season. Summer is hot and sticky — carry water and plan around afternoon heat." },
        { heading: "Practical tips", body: "The Quarter is compact and entirely walkable. Watch for pickpockets on Bourbon Street and keep valuables minimal. Restrooms are available at Café Du Monde, Jackson Brewery, and most sit-down restaurants. Street performers appreciate cash tips — carry small bills. An eSIM helps you look up set times and bar schedules in real time." },
      ],
      [
        { q: "Is the French Quarter safe?", a: "Daytime is very safe. At night, Bourbon Street is busy but watch for pickpockets. Avoid empty side streets after dark." },
        { q: "How long is the wait at Café Du Monde?", a: "Weekends can mean a 30-minute-plus queue. Early mornings and late nights are quieter since it is open 24 hours." },
        { q: "How much time should I budget?", a: "Three to four hours for a daytime walk. A full day if you include evening jazz clubs." },
        { q: "When is Mardi Gras?", a: "The Tuesday 47 days before Easter, usually in February or March. Parade schedules vary each year." },
      ],
    ),
  },

  // ─── 6. New Orleans — Magazine Street ───────────────────────────
  "new-orleans-magazine-street-walk": {
    ja: ja(US_JA_CTA,
      "マガジンストリートのアンティークとカフェ",
      "ニューオーリンズのマガジンストリートを歩き、アンティークショップとローカルカフェを巡る6マイルのルートガイド。",
      img("File:Magazine Street New Orleans.jpg", 1280, 854, "マガジンストリート", "色とりどりの独立系ショップが並ぶ通り"),
      [
        img("File:Garden District New Orleans House.jpg", 1280, 854, "ガーデンディストリクト", "豪壮なアンテベラム建築の邸宅"),
        img("File:Audubon Park New Orleans.jpg", 1280, 854, "オーデュボンパーク", "樫の大木に覆われた公園"),
        img("File:St. Charles Streetcar New Orleans.jpg", 1280, 854, "セントチャールズ・ストリートカー", "世界最古の現役路面電車"),
        img("File:Lafayette Cemetery No. 1 New Orleans.jpg", 1280, 854, "ラファイエット墓地", "地上墓が並ぶ歴史的墓地"),
        img("File:Lower Garden District New Orleans.jpg", 1280, 854, "ローワーガーデンディストリクト", "おしゃれなカフェエリア"),
      ],
      NOLA_X,
      [
        { heading: "このルートの特徴", body: "マガジンストリートはフレンチクォーターから南西に約6マイル延びる通りで、ニューオーリンズのローカル文化を最も感じられるエリアです。アンティーク家具店、ヴィンテージ古着屋、地元アーティストのギャラリーが軒を連ね、チェーン店はほとんどありません。ガーデンディストリクトのアンテベラム建築を眺めながら、カフェやポーボーイの名店をはしごする一日を過ごせます。" },
        { heading: "アクセスと起点", body: "セントチャールズ・ストリートカーがマガジンストリートの1ブロック北を並走しており、どの停留所からもアクセス可能です。カナルストリートからストリートカーに乗り、ジャクソンアベニューで降りてマガジンストリートに入るのがおすすめ。全6マイルを歩くのは大変なので、気になるエリアだけ歩いてストリートカーで移動する方法が効率的です。" },
        { heading: "主要スポット", body: "ローワーガーデンディストリクトにはサードウェーブ系のカフェが集中しています。ジャクソンアベニュー周辺はアンティーク店の密集地帯で、掘り出し物探しに最適。ラファイエット墓地は映画のロケ地にもなった地上墓地で、無料で見学できます。オーデュボンパーク方面まで歩くと、樫の木のトンネルが見事な遊歩道があります。" },
        { heading: "時間帯とおすすめ季節", body: "ショップは10時〜17時頃の営業が多いので、午前中に出発するのがベスト。日曜は閉まっている店もあるので注意。10〜11月は気候が穏やかで最も歩きやすい時期です。夏は暑さが厳しいので、カフェで涼みながらゆっくり進みましょう。" },
        { heading: "実用情報", body: "通り全体を歩くと2時間以上かかるので、ストリートカー（1日パス利用可）を併用しましょう。多くの店がカード対応ですが、アンティーク店は現金値引きをしてくれることも。トイレはカフェやレストランで利用可能。eSIMがあればショップの口コミ確認や帰りのバスルート検索に便利です。" },
      ],
      [
        { q: "マガジンストリート全体を歩く所要時間は?", a: "全6マイルを歩くと2〜3時間ですが、買い物を含めると半日〜1日かかります。ストリートカー併用がおすすめです。" },
        { q: "アンティーク店の価格帯は?", a: "小物は$20〜$50から見つかります。家具は$200〜数千ドルまで幅広いです。" },
        { q: "おすすめのカフェは?", a: "ローワーガーデンディストリクトのサードウェーブ系カフェが人気。ポーボーイならパーキーズがおすすめです。" },
        { q: "日曜は営業している?", a: "多くの店は営業していますが、一部のアンティーク店は日曜定休です。事前に確認を。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Magazine Street Antique and Café Walk in New Orleans",
      "Walk Magazine Street's six-mile stretch — antique shops, local cafés, and Garden District mansions in New Orleans.",
      img("File:Magazine Street New Orleans.jpg", 1280, 854, "Magazine Street", "Independent shops lining the street"),
      [
        img("File:Garden District New Orleans House.jpg", 1280, 854, "Garden District", "Grand antebellum mansion"),
        img("File:Audubon Park New Orleans.jpg", 1280, 854, "Audubon Park", "Oak-canopied park grounds"),
        img("File:St. Charles Streetcar New Orleans.jpg", 1280, 854, "St. Charles Streetcar", "The world's oldest operating streetcar"),
        img("File:Lafayette Cemetery No. 1 New Orleans.jpg", 1280, 854, "Lafayette Cemetery", "Above-ground tombs"),
        img("File:Lower Garden District New Orleans.jpg", 1280, 854, "Lower Garden District", "Trendy café neighbourhood"),
      ],
      NOLA_X,
      [
        { heading: "What makes this route special", body: "Magazine Street runs six miles southwest from the French Quarter through some of the most characterful neighbourhoods in New Orleans. Chain stores are almost non-existent — instead you get antique dealers, vintage clothing racks, local art galleries, and po'boy counters tucked into painted shotgun houses. The parallel St. Charles Avenue streetcar line offers a backup ride whenever your legs need a break, so you can dip in and out of the walk at will." },
        { heading: "Getting there and starting point", body: "The St. Charles streetcar runs one block north of Magazine Street the entire way. From Canal Street, ride the streetcar to Jackson Avenue and walk one block south to Magazine. You can also start at the Lower Garden District end and work uptown toward Audubon Park. Walking the full six miles is not necessary — pick two or three sections and use the streetcar between them." },
        { heading: "Key stops", body: "The Lower Garden District has the highest density of third-wave coffee shops. Around Jackson Avenue, antique stores cluster together and invite browsing. Lafayette Cemetery No. 1, one block off Magazine, is a photogenic above-ground graveyard that has appeared in numerous films. Continue uptown toward Audubon Park for a stroll beneath a tunnel of live oaks dripping with Spanish moss." },
        { heading: "Best times to visit", body: "Shops mostly open from 10 am to 5 pm, so start in the morning. Some stores close on Sundays. October and November offer the most comfortable walking weather. Summer is hot — pace yourself with café stops and shade breaks." },
        { heading: "Practical tips", body: "Use the streetcar day pass to hop between sections — walking the full six miles is a commitment. Most shops accept cards, though antique dealers sometimes offer cash discounts. Restrooms are in cafés and restaurants along the way. An eSIM is useful for looking up shop reviews and checking bus routes home." },
      ],
      [
        { q: "How long does it take to walk all of Magazine Street?", a: "The full six miles takes two to three hours of walking, but with shopping it can fill half a day or more. Use the streetcar to hop between sections." },
        { q: "What is the price range at antique shops?", a: "Small items start around twenty to fifty dollars. Furniture ranges from a couple of hundred to several thousand." },
        { q: "Any recommended cafés?", a: "The Lower Garden District has popular third-wave spots. For a classic po'boy, try Parkway Bakery." },
        { q: "Are shops open on Sundays?", a: "Most are, but some antique stores close on Sundays. Check ahead if you have a specific shop in mind." },
      ],
    ),
  },

  // ─── 7. Seattle — Pike Place ────────────────────────────────────
  "seattle-pike-place-walk": {
    ja: ja(US_JA_CTA,
      "パイクプレイスマーケットと周辺散策",
      "シアトルのパイクプレイスマーケットを歩き、魚投げパフォーマンスとクラフトショップを楽しむルートガイド。",
      img("File:Pike Place Market Entrance.jpg", 1280, 854, "パイクプレイスマーケット", "象徴的なネオンサインと時計"),
      [
        img("File:Pike Place Fish Market.jpg", 1280, 854, "フィッシュマーケット", "名物の魚投げパフォーマンス"),
        img("File:Original Starbucks Pike Place.jpg", 1280, 854, "スターバックス1号店", "1971年創業の第1号店"),
        img("File:Pike Place Market Flowers.jpg", 1280, 854, "フラワースタンド", "色とりどりの花束が並ぶ"),
        img("File:Post Alley Pike Place.jpg", 1280, 854, "ポストアレー", "チューインガムの壁で有名な路地"),
        img("File:Elliott Bay Seattle.jpg", 1280, 854, "エリオットベイ", "マーケットからの海の眺め"),
        img("File:Victor Steinbrueck Park Seattle.jpg", 1280, 854, "ビクタースタインブルック公園", "トーテムポールがある見晴らし公園"),
      ],
      SEATTLE_X,
      [
        { heading: "このルートの特徴", body: "パイクプレイスマーケットは1907年開設のシアトルのシンボルで、鮮魚店の魚投げパフォーマンスとスターバックス1号店で世界的に知られています。メインの大通りだけでなく、地下フロアや裏通りのポストアレーにも個性的な店が隠れており、何度訪れても新しい発見があります。マーケットからエリオットベイの水辺まで歩けば、フェリーターミナルと山並みの絶景が待っています。" },
        { heading: "アクセスと起点", body: "リンクライトレール・ウエストレイク駅から徒歩10分、パイクストリートを西に下るとマーケットに到着します。マーケットの正面入口（パイクプレイス）を起点に、まず1階のフィッシュマーケットを見てから地下フロアへ進み、最後にウォーターフロントに出るルートがおすすめです。" },
        { heading: "主要スポット", body: "パイクプレイスフィッシュマーケットの魚投げは朝が最も活気があります。スターバックス1号店は常に行列ですが、限定マグカップやタンブラーが人気。ポストアレーのガムウォールはSNS映えスポットとして有名です。地下フロアには手作りジュエリーやヴィンテージポスターの店が並び、上階の花屋では地元産の切り花を格安で買えます。ビクタースタインブルック公園からはピュージェット湾とオリンピック山脈の眺望が楽しめます。" },
        { heading: "時間帯とおすすめ季節", body: "平日の9〜10時頃がマーケットの混雑が少なく快適です。週末は11時以降かなり混みます。6〜9月はシアトルのベストシーズンで晴天が多く、屋外散策に最適。冬は雨が多いですが、マーケット内は屋根があるのでそれほど影響ありません。" },
        { heading: "実用情報", body: "マーケット内は階段が多いので歩きやすい靴を。トイレはマーケット内に公衆トイレがあります。ほとんどの店がカード対応ですが、個人出店のクラフト店は現金のみの場合も。eSIMがあれば混雑時の待ち時間確認やレストラン予約に役立ちます。" },
      ],
      [
        { q: "魚投げパフォーマンスは何時に見られる?", a: "マーケット営業時間中（月〜土6時〜18時、日7時〜17時）は随時行われていますが、午前中が最も活気があります。" },
        { q: "スターバックス1号店の待ち時間は?", a: "ピーク時は30〜45分待ち。早朝か平日午後が比較的空いています。" },
        { q: "所要時間の目安は?", a: "マーケット内で2〜3時間、ウォーターフロントも含めると3〜4時間です。" },
        { q: "駐車場はある?", a: "マーケット専用駐車場がありますが早い時間に埋まります。公共交通かライドシェアが便利です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Pike Place Market and Waterfront Walk in Seattle",
      "Explore Seattle's Pike Place Market — fish-throwing showmanship, craft stalls, the original Starbucks, and Elliott Bay views.",
      img("File:Pike Place Market Entrance.jpg", 1280, 854, "Pike Place Market", "Iconic neon sign and clock"),
      [
        img("File:Pike Place Fish Market.jpg", 1280, 854, "Fish market", "Famous fish-throwing performance"),
        img("File:Original Starbucks Pike Place.jpg", 1280, 854, "Original Starbucks", "The 1971 first store"),
        img("File:Pike Place Market Flowers.jpg", 1280, 854, "Flower stands", "Colourful bouquets"),
        img("File:Post Alley Pike Place.jpg", 1280, 854, "Post Alley", "The famous Gum Wall"),
        img("File:Elliott Bay Seattle.jpg", 1280, 854, "Elliott Bay", "Sea views from the market"),
        img("File:Victor Steinbrueck Park Seattle.jpg", 1280, 854, "Victor Steinbrueck Park", "Totem poles with a view"),
      ],
      SEATTLE_X,
      [
        { heading: "What makes this route special", body: "Pike Place Market has been the soul of Seattle since 1907. The fish mongers who hurl salmon over the counter are the headline act, but the real magic is in the warren of lower levels and side alleys where independent craftspeople, tiny bookshops, and hole-in-the-wall diners hide. From the market, a short downhill walk reaches Elliott Bay's waterfront promenade, where ferries cross Puget Sound against a backdrop of the Olympic Mountains." },
        { heading: "Getting there and starting point", body: "Ride the Link Light Rail to Westlake station and walk ten minutes west down Pike Street. Start at the main Pike Place entrance, work through the fish market and flower stalls on the first floor, descend to the lower levels, then exit toward the waterfront via the Pike Place MarketFront expansion." },
        { heading: "Key stops", body: "Pike Place Fish Market is liveliest in the morning when the throwing starts early. The original Starbucks always has a queue, but the limited-edition merch makes it worthwhile for fans. The Gum Wall in Post Alley is a gloriously odd photo stop. Downstairs, look for handmade jewellery, vintage posters, and the market's own heritage pork butcher. Victor Steinbrueck Park at the north end offers totem poles and panoramic Sound views." },
        { heading: "Best times to visit", body: "Weekday mornings between 9 and 10 am are the quietest. Weekends get packed from 11 am onward. June through September is Seattle's dry season and ideal for outdoor strolling. Winter brings rain, but the covered market sections keep you dry." },
        { heading: "Practical tips", body: "Wear comfortable shoes — there are lots of stairs inside the market. Public restrooms are available on site. Most vendors accept cards, though some craft stalls are cash only. An eSIM is handy for checking wait times and making restaurant reservations on the fly." },
      ],
      [
        { q: "When does the fish throwing happen?", a: "Throughout market hours — Monday to Saturday 6 am to 6 pm, Sunday 7 am to 5 pm. Mornings are the most energetic." },
        { q: "How long is the Starbucks queue?", a: "Peak times mean a 30-to-45-minute wait. Early mornings and weekday afternoons are shorter." },
        { q: "How much time should I budget?", a: "Two to three hours for the market. Three to four including the waterfront." },
        { q: "Is there parking?", a: "A market garage exists but fills early. Public transit or ride-shares are easier." },
      ],
    ),
  },

  // ─── 8. Seattle — Capitol Hill ──────────────────────────────────
  "seattle-capitol-hill-walk": {
    ja: ja(US_JA_CTA,
      "キャピトルヒルのカフェとライブハウス通り",
      "シアトルのキャピトルヒルを歩き、サードウェーブコーヒーとライブミュージック、LGBTQ+カルチャーを体感するルートガイド。",
      img("File:Capitol Hill Seattle Broadway.jpg", 1280, 854, "ブロードウェイ通り", "キャピトルヒルのメインストリート"),
      [
        img("File:Volunteer Park Seattle.jpg", 1280, 854, "ボランティアパーク", "水道塔からの街のパノラマビュー"),
        img("File:Cal Anderson Park Seattle.jpg", 1280, 854, "カルアンダーソンパーク", "地域コミュニティの中心"),
        img("File:Pike-Pine corridor Seattle.jpg", 1280, 854, "パイクパイン回廊", "バーとレストランが密集するエリア"),
        img("File:Elliott Bay Book Company Seattle.jpg", 1280, 854, "エリオットベイ書店", "シアトルを代表する独立系書店"),
        img("File:Seattle Asian Art Museum.jpg", 1280, 854, "シアトルアジア美術館", "ボランティアパーク内のアールデコ建築"),
      ],
      SEATTLE_X,
      [
        { heading: "このルートの特徴", body: "キャピトルヒルはシアトルのカルチャーの心臓部です。LGBTQ+コミュニティの発信地であり、グランジ発祥の地でもあるこの地区は、独立系コーヒーロースターやレコードショップ、ライブハウスが密集しています。パイクパイン回廊を中心にバーやレストランが軒を連ね、夜遅くまでエネルギッシュな雰囲気が続きます。ボランティアパークの丘の上からはスペースニードルとダウンタウンの眺望が楽しめます。" },
        { heading: "アクセスと起点", body: "リンクライトレール・キャピトルヒル駅から地上に出ると、すぐにブロードウェイ通りです。駅を起点にまず南のパイクパイン回廊へ向かい、カフェ巡りをしてからブロードウェイを北上してボランティアパークを目指すルートが効率的です。" },
        { heading: "主要スポット", body: "エリオットベイ書店はシアトル最大の独立系書店で、木製の棚が迷路のように続く店内は本好きの聖地です。パイクパイン回廊にはサードウェーブ系ロースタリーが複数あり、各店で個性的なブレンドを試せます。カルアンダーソンパークは地元住民の交流の場。ボランティアパークの水道塔に上ると360度のパノラマビューが待っています。シアトルアジア美術館もパーク内にあります。" },
        { heading: "時間帯とおすすめ季節", body: "カフェは7時頃から開くので朝のスタートが可能。午後はレコードショップやヴィンテージ店巡りに最適。夜はライブハウスとバーが本領を発揮します。6〜9月の晴天期がベストシーズン。冬は雨が多いですが、カフェやバーがメインなら屋内中心で楽しめます。" },
        { heading: "実用情報", body: "坂が多いエリアなので歩きやすい靴を。トイレはカルアンダーソンパークやカフェで利用可能。パイクパイン回廊の飲食店はほぼカード対応です。ライブハウスは21歳以上限定の場所が多いのでID持参を忘れずに。eSIMがあればライブスケジュールの確認やカフェの混雑状況チェックに便利です。" },
      ],
      [
        { q: "キャピトルヒルの治安は?", a: "日中は安全で歩きやすいエリアです。夜もパイクパイン回廊は人通りが多いですが、暗い裏通りは避けましょう。" },
        { q: "おすすめのコーヒーショップは?", a: "複数のサードウェーブロースタリーがあり、それぞれ焙煎スタイルが異なるので飲み比べがおすすめです。" },
        { q: "所要時間の目安は?", a: "カフェ巡りとボランティアパークで3〜4時間。夜のライブも含めると半日〜1日です。" },
        { q: "ライブハウスの料金は?", a: "カバーチャージは$10〜$25程度が一般的。人気アーティストの場合は事前チケット購入を。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Capitol Hill Coffee and Live Music Walk in Seattle",
      "Wander Seattle's Capitol Hill — third-wave roasters, indie bookshops, live-music venues, and panoramic views from Volunteer Park.",
      img("File:Capitol Hill Seattle Broadway.jpg", 1280, 854, "Broadway", "Capitol Hill's main drag"),
      [
        img("File:Volunteer Park Seattle.jpg", 1280, 854, "Volunteer Park", "Water tower panorama"),
        img("File:Cal Anderson Park Seattle.jpg", 1280, 854, "Cal Anderson Park", "Community gathering space"),
        img("File:Pike-Pine corridor Seattle.jpg", 1280, 854, "Pike-Pine corridor", "Bar and restaurant hub"),
        img("File:Elliott Bay Book Company Seattle.jpg", 1280, 854, "Elliott Bay Book Company", "Seattle's iconic indie bookshop"),
        img("File:Seattle Asian Art Museum.jpg", 1280, 854, "Asian Art Museum", "Art Deco building in the park"),
      ],
      SEATTLE_X,
      [
        { heading: "What makes this route special", body: "Capitol Hill is Seattle's cultural engine — the birthplace of the grunge scene, the centre of the city's LGBTQ+ community, and home to more independent coffee roasters per block than almost anywhere else in the country. The Pike-Pine corridor is packed with bars, restaurants, and live-music venues, while the hilltop Volunteer Park offers a water tower you can climb for a full 360-degree view of the skyline and the mountains beyond." },
        { heading: "Getting there and starting point", body: "Exit the Link Light Rail at Capitol Hill station and you are on Broadway. Head south first to the Pike-Pine corridor for a coffee crawl, then walk north up Broadway toward Volunteer Park for views and the Asian Art Museum." },
        { heading: "Key stops", body: "Elliott Bay Book Company is a labyrinth of wooden shelves and one of the best independent bookstores in the country. The Pike-Pine corridor has multiple third-wave roasteries, each with a distinct style — try a few and compare. Cal Anderson Park is the neighbourhood's living room, always lively on sunny days. Climb the water tower in Volunteer Park for an unbeatable panorama of the Space Needle, downtown, and Mount Rainier on a clear day. The Seattle Asian Art Museum inside the park is worth a stop for its Art Deco architecture alone." },
        { heading: "Best times to visit", body: "Cafés open early, so you can start by 7 am. Afternoons are ideal for record shops and vintage stores. Evenings are all about live music and bars. June to September brings dry weather and long daylight hours. Winter is rainy but the scene is mostly indoors, so it works year round." },
        { heading: "Practical tips", body: "The neighbourhood is hilly — wear comfortable shoes. Restrooms are in Cal Anderson Park and cafés. Most restaurants and bars accept cards. Live-music venues are often 21-plus, so carry ID. An eSIM helps with checking gig schedules and café crowd levels in real time." },
      ],
      [
        { q: "Is Capitol Hill safe?", a: "Very walkable and safe during the day. The Pike-Pine corridor stays busy at night, but avoid quiet side streets after dark." },
        { q: "Any recommended coffee shops?", a: "Several third-wave roasteries compete for the best cup — try a few and see which style you prefer." },
        { q: "How much time should I budget?", a: "Three to four hours for cafés and Volunteer Park. Half a day or more if you include evening live music." },
        { q: "How much do live shows cost?", a: "Cover charges are typically ten to twenty-five dollars. Popular acts may sell advance tickets." },
      ],
    ),
  },

  // ─── 9. Santiago — Lastarria ────────────────────────────────────
  "santiago-lastarria-walk": {
    ja: ja(CL_JA_CTA,
      "ラスタリア地区のカフェとギャラリー散策",
      "サンティアゴのラスタリア地区を歩き、アートギャラリーとカフェ文化を楽しむルートガイド。",
      img("File:Barrio Lastarria Santiago Chile.jpg", 1280, 854, "ラスタリア地区", "石畳の歩行者通り"),
      [
        img("File:Museo Nacional de Bellas Artes Chile.jpg", 1280, 854, "国立美術館", "アールヌーヴォー建築の美術館"),
        img("File:Cerro Santa Lucia Santiago.jpg", 1280, 854, "サンタルシアの丘", "街を見渡す歴史的な丘"),
        img("File:Parque Forestal Santiago.jpg", 1280, 854, "フォレスタル公園", "マポチョ川沿いの緑豊かな公園"),
        img("File:GAM Centro Cultural Gabriela Mistral.jpg", 1280, 854, "GAM文化センター", "ガブリエラ・ミストラル文化センター"),
        img("File:Jose Victorino Lastarria Street.jpg", 1280, 854, "ラスタリア通り", "古本市やカフェが並ぶ歩行者天国"),
      ],
      SANTIAGO_X,
      [
        { heading: "このルートの特徴", body: "バリオラスタリアはサンティアゴ中心部の東側に位置する文化地区で、19世紀の建築を活かしたカフェ、ギャラリー、デザインショップが集まっています。ラスタリア通りは歩行者天国で、古本市やクラフトマーケットが定期的に開かれます。すぐ隣のサンタルシアの丘に上ればアンデス山脈を背景にした市街地の絶景が広がり、フォレスタル公園では地元の人々がジョギングやピクニックを楽しんでいます。" },
        { heading: "アクセスと起点", body: "地下鉄1号線のウニベルシダ・カトリカ駅が最寄りで、駅を出るとすぐにラスタリア通りです。まずサンタルシアの丘に上って市街地を俯瞰し、下りてからラスタリア通りを北に向かい、フォレスタル公園と国立美術館に至るルートがおすすめです。" },
        { heading: "主要スポット", body: "サンタルシアの丘は標高差約70メートルで階段を15分ほど上ると展望台に着きます。国立美術館はアールヌーヴォー建築の建物自体が美しく、チリと南米の美術を無料で鑑賞できます。GAM文化センターでは現代演劇や展示が開催され、建物内のカフェも居心地が良いです。ラスタリア通りのカフェではチリ産ワインやエンパナーダを手軽に楽しめます。" },
        { heading: "時間帯とおすすめ季節", body: "午前中にサンタルシアの丘に上ると、光の具合が写真撮影に最適です。カフェやギャラリーは11時頃から賑わい始めます。南半球なので3〜5月（秋）と9〜11月（春）が最も過ごしやすい気候です。夏（12〜2月）は暑いですが、丘の上は風があって涼しいです。" },
        { heading: "実用情報", body: "ラスタリア地区は治安が良く、観光客にも歩きやすいエリアです。サンタルシアの丘は入場無料。カフェやレストランではクレジットカードが使えます。チリペソへの両替は市内のカサデカンビオが好レートです。eSIMがあればギャラリーの開館情報やレストランの口コミをリアルタイムで確認できます。" },
      ],
      [
        { q: "ラスタリア地区の治安は?", a: "サンティアゴで最も治安の良いエリアの一つです。ただし貴重品の管理は基本として心がけましょう。" },
        { q: "サンタルシアの丘はきつい?", a: "階段で約15分。きつい坂ではないので普通の体力があれば問題ありません。" },
        { q: "所要時間の目安は?", a: "丘・カフェ・美術館を含めて3〜4時間が目安です。" },
        { q: "英語は通じる?", a: "カフェやギャラリーでは基本的な英語が通じます。翻訳アプリがあると安心です。" },
      ],
    ),
    en: en(CL_EN_CTA,
      "Lastarria Café and Gallery Walk in Santiago",
      "Explore Santiago's Barrio Lastarria — hilltop views, art galleries, and café culture at the foot of Cerro Santa Lucía.",
      img("File:Barrio Lastarria Santiago Chile.jpg", 1280, 854, "Barrio Lastarria", "Cobblestone pedestrian street"),
      [
        img("File:Museo Nacional de Bellas Artes Chile.jpg", 1280, 854, "National Fine Arts Museum", "Art Nouveau museum building"),
        img("File:Cerro Santa Lucia Santiago.jpg", 1280, 854, "Cerro Santa Lucía", "Historic hilltop viewpoint"),
        img("File:Parque Forestal Santiago.jpg", 1280, 854, "Parque Forestal", "Riverside green space"),
        img("File:GAM Centro Cultural Gabriela Mistral.jpg", 1280, 854, "GAM Cultural Centre", "Gabriela Mistral cultural hub"),
        img("File:Jose Victorino Lastarria Street.jpg", 1280, 854, "Lastarria Street", "Bookstalls and cafés"),
      ],
      SANTIAGO_X,
      [
        { heading: "What makes this route special", body: "Barrio Lastarria is Santiago's walkable cultural quarter, tucked between Cerro Santa Lucía and the Mapocho River. Nineteenth-century townhouses have been converted into cafés, boutique galleries, and design stores, and the main street is pedestrian-only with regular book fairs and craft markets. Climb Santa Lucía for an Andes-backed skyline view, then descend into Parque Forestal where joggers and picnickers line the riverbank." },
        { heading: "Getting there and starting point", body: "Take Line 1 of the metro to Universidad Católica station — Lastarria Street begins right outside the exit. Start with a climb up Cerro Santa Lucía for a bird's-eye orientation, then walk north along Lastarria toward Parque Forestal and the Fine Arts Museum." },
        { heading: "Key stops", body: "Cerro Santa Lucía is a fifteen-minute stair climb to panoramic terraces — entry is free. The National Museum of Fine Arts occupies a striking Art Nouveau building and houses Chilean and South American art, also free. GAM, the Gabriela Mistral Cultural Centre, hosts rotating exhibitions and has a good in-house café. On Lastarria Street itself, sample Chilean wine and empanadas at any of the sidewalk terraces." },
        { heading: "Best times to visit", body: "Morning light is best for hilltop photos. Cafés and galleries pick up from 11 am. The shoulder seasons — March to May and September to November — have the most comfortable temperatures. Summer (December to February) is warm but breezy on the hill." },
        { heading: "Practical tips", body: "Lastarria is one of Santiago's safest neighbourhoods and very tourist-friendly. Santa Lucía is free to enter. Cafés and restaurants accept credit cards. Exchange pesos at a casa de cambio for the best rate. An eSIM keeps gallery hours and restaurant reviews at your fingertips." },
      ],
      [
        { q: "Is Lastarria safe?", a: "One of the safest areas in Santiago. Standard precautions with valuables are enough." },
        { q: "Is the hill climb difficult?", a: "About fifteen minutes up stairs — moderate effort, manageable for most fitness levels." },
        { q: "How much time should I budget?", a: "Three to four hours including the hill, cafés, and the museum." },
        { q: "Is English widely spoken?", a: "Basic English works in cafés and galleries. A translation app helps elsewhere." },
      ],
    ),
  },

  // ─── 10. Santiago — Barrio Italia ───────────────────────────────
  "santiago-barrio-italia-walk": {
    ja: ja(CL_JA_CTA,
      "バリオイタリアのアンティークとカフェ",
      "サンティアゴのバリオイタリアを歩き、アンティークショップとサードウェーブカフェを巡るルートガイド。",
      img("File:Barrio Italia Santiago.jpg", 1280, 854, "バリオイタリア", "カラフルな建物が並ぶイタリア通り"),
      [
        img("File:Barrio Italia antique shops.jpg", 1280, 854, "アンティークショップ", "ヴィンテージ家具と雑貨の宝庫"),
        img("File:Barrio Italia cafe Santiago.jpg", 1280, 854, "カフェ", "おしゃれなサードウェーブカフェ"),
        img("File:Barrio Italia mural Santiago.jpg", 1280, 854, "壁画アート", "通りを彩るストリートアート"),
        img("File:Parque Bustamante Santiago.jpg", 1280, 854, "ブスタマンテ公園", "並木道が美しい都市公園"),
        img("File:Barrio Italia design shop.jpg", 1280, 854, "デザインショップ", "チリ人デザイナーの雑貨店"),
      ],
      SANTIAGO_X,
      [
        { heading: "このルートの特徴", body: "バリオイタリアは19世紀末にイタリア移民が開拓した住宅街で、近年アンティークショップとクリエイティブ系のショップが急増しているエリアです。イタリア通りを軸に、中庭を持つ古い邸宅が改装されてギャラリーやカフェになっており、一見普通の住宅の奥に個性的な店が隠れているのが探索の醍醐味です。観光客はまだ少なく、サンティアゴのローカル文化を肌で感じられます。" },
        { heading: "アクセスと起点", body: "地下鉄5号線のイラルサバル駅が最寄りで、駅から徒歩5分でイタリア通りに到着します。イタリア通りとカウポリカン通りの交差点を起点に、南北に歩きながら脇道の中庭にも立ち寄るルートがおすすめです。" },
        { heading: "主要スポット", body: "アンティークモール形式の建物が複数あり、ヴィンテージ家具、レトロ雑貨、古本が所狭しと並んでいます。チリ人デザイナーのハンドメイド雑貨を扱うショップも増えており、お土産探しに最適。カフェはサードウェーブ系が主流で、チリ産スペシャルティコーヒーを楽しめます。ブスタマンテ公園は並木道が美しく、散策の途中で一息つけます。" },
        { heading: "時間帯とおすすめ季節", body: "ショップは11時〜19時頃の営業が多く、午前中は静かです。土曜日は最も賑わい、週末限定のクラフトマーケットが開かれることも。3〜5月と9〜11月が気候的にベスト。日曜は閉まっている店が多いので注意してください。" },
        { heading: "実用情報", body: "小さな路地に入ることが多いので歩きやすい靴で。アンティーク店は現金値引きをしてくれる場合があるのでチリペソを持っておくと良いです。カフェはカード対応がほとんど。eSIMがあれば隠れ家的なショップの場所を地図で確認できて便利です。" },
      ],
      [
        { q: "バリオイタリアの治安は?", a: "日中は安全で歩きやすいエリアです。夜間は通りが暗くなるので明るいうちに回りましょう。" },
        { q: "アンティークの価格帯は?", a: "小物は数千ペソ（数百円）から。家具は数万ペソからと、日本と比べてかなり手頃です。" },
        { q: "所要時間の目安は?", a: "カフェ休憩を含めて2〜3時間。じっくり見るなら半日を見てください。" },
        { q: "英語は通じる?", a: "おしゃれなカフェでは基本的な英語が通じますが、アンティーク店ではスペイン語がメインです。" },
      ],
    ),
    en: en(CL_EN_CTA,
      "Barrio Italia Antique and Café Walk in Santiago",
      "Browse Santiago's Barrio Italia — hidden-courtyard antique shops, artisan design stores, and specialty coffee in a former Italian immigrant quarter.",
      img("File:Barrio Italia Santiago.jpg", 1280, 854, "Barrio Italia", "Colourful buildings on Italia Avenue"),
      [
        img("File:Barrio Italia antique shops.jpg", 1280, 854, "Antique shops", "Vintage furniture and curios"),
        img("File:Barrio Italia cafe Santiago.jpg", 1280, 854, "Café", "Third-wave coffee spot"),
        img("File:Barrio Italia mural Santiago.jpg", 1280, 854, "Mural", "Street art on the walls"),
        img("File:Parque Bustamante Santiago.jpg", 1280, 854, "Parque Bustamante", "Tree-lined urban park"),
        img("File:Barrio Italia design shop.jpg", 1280, 854, "Design shop", "Chilean designer goods"),
      ],
      SANTIAGO_X,
      [
        { heading: "What makes this route special", body: "Barrio Italia began as an Italian immigrant settlement in the late nineteenth century and has quietly morphed into Santiago's antique and design hub. Old mansions with internal courtyards have been carved up into tiny shops selling vintage furniture, retro oddities, and Chilean-designer homewares. The district flies well under the tourist radar, so you browse alongside locals rather than tour groups. Street art covers side-alley walls, and specialty coffee has taken root on almost every block." },
        { heading: "Getting there and starting point", body: "Take metro Line 5 to Irarrázaval station and walk five minutes east to Italia Avenue. Start where Italia meets Caupolicán and meander north and south, ducking into courtyard passages whenever you spot an open gate." },
        { heading: "Key stops", body: "Several antique malls pack vintage furniture, retro kitchenware, and secondhand books into labyrinthine corridors. Newer design shops showcase handmade ceramics and textile work by Chilean artisans — great for unique souvenirs. Third-wave cafés serve Chilean single-origin beans with serious attention to detail. Parque Bustamante, a few blocks west, offers shaded avenues and benches for a mid-walk rest." },
        { heading: "Best times to visit", body: "Most shops open around 11 am and close by 7 pm. Saturday is the busiest day and sometimes hosts pop-up craft fairs. March to May and September to November offer the best weather. Many shops close on Sundays, so check ahead." },
        { heading: "Practical tips", body: "Comfortable shoes are a must — you will duck into narrow alleys and cobbled courtyards. Antique dealers sometimes give cash discounts, so carry Chilean pesos. Cafés take cards. An eSIM helps you find hidden shops on the map and read reviews on the spot." },
      ],
      [
        { q: "Is Barrio Italia safe?", a: "Safe and pleasant during the day. Stick to daylight hours as side streets get dark after sunset." },
        { q: "What is the price range for antiques?", a: "Small items start at a few thousand pesos. Furniture is remarkably affordable compared to European markets." },
        { q: "How much time should I budget?", a: "Two to three hours with a café stop. Half a day if you browse thoroughly." },
        { q: "Is English spoken?", a: "Trendy cafés usually have some English. Antique dealers mostly speak Spanish — a translation app helps." },
      ],
    ),
  },

  // ─── 11. Medellín — Comuna 13 ───────────────────────────────────
  "medellin-comuna-13-walk": {
    ja: ja(CO_JA_CTA,
      "コムナ13のエスカレーターとストリートアート",
      "メデジンのコムナ13を歩き、屋外エスカレーターとストリートアートで生まれ変わった地区を体感するルートガイド。",
      img("File:Comuna 13 Medellin graffiti tour.jpg", 1280, 854, "コムナ13", "カラフルなグラフィティが壁面を覆う"),
      [
        img("File:Comuna 13 escalators Medellin.jpg", 1280, 854, "屋外エスカレーター", "丘を登る公共エスカレーター"),
        img("File:Comuna 13 street art Medellin.jpg", 1280, 854, "ストリートアート", "地域の歴史を伝える壁画"),
        img("File:Comuna 13 Medellin overview.jpg", 1280, 854, "丘からの眺望", "カラフルな家々と谷の景色"),
        img("File:Medellin Metro cable car.jpg", 1280, 854, "メトロケーブル", "街を見渡すゴンドラ"),
        img("File:Comuna 13 dance performance.jpg", 1280, 854, "ダンスパフォーマンス", "地元の若者によるヒップホップダンス"),
      ],
      MEDELLIN_X,
      [
        { heading: "このルートの特徴", body: "コムナ13はかつてメデジンで最も危険とされた地区でしたが、2011年に設置された屋外エスカレーターを皮切りに都市再生が進み、今やメデジン随一の観光スポットに変貌しました。急斜面に建ち並ぶカラフルな家々の壁面にはストリートアーティストの壁画が描かれ、地域の暗い歴史と再生の希望が表現されています。地元のヒップホップダンサーのパフォーマンスも必見です。" },
        { heading: "アクセスと起点", body: "メデジンメトロのサンハビエル駅が最寄りで、駅から徒歩でエスカレーター入口に向かいます。地元ガイドのツアー（英語・スペイン語）に参加するのが最も安全で情報量も多い方法です。エスカレーターで丘の上まで上り、ストリートアートを見ながら歩いて下るルートが一般的です。" },
        { heading: "主要スポット", body: "6区画分の屋外エスカレーターは約6分で急斜面を楽に上れる公共交通機関で、世界中から注目を集めました。壁画は地域の歴史を語るものが多く、紛争の記憶と平和への願いが込められています。エスカレーター周辺にはカフェやジュースバー、お土産ショップが並びます。丘の上からの眺望はメデジンの谷全体を見渡せる絶景ポイントです。" },
        { heading: "時間帯とおすすめ季節", body: "午前中の早い時間帯がツアーも含めて最適で、日差しが強くなる前に回れます。週末は地元のパフォーマンスやマーケットが増えます。メデジンは「常春の街」と呼ばれ年間を通して気温20〜28度と過ごしやすいですが、4〜5月と10〜11月は雨季なので午前中の訪問がベターです。" },
        { heading: "実用情報", body: "地元ガイド付きツアーへの参加を強くおすすめします（一人でも安全ですが、歴史の背景を理解できます）。高価な装飾品は控えめに、カメラは首からぶら下げずバッグに入れましょう。トイレはカフェで利用可能。現金（コロンビアペソ）を少額持参すると、お土産や飲み物の購入がスムーズです。eSIMがあればツアーの予約確認やSNS投稿に便利です。" },
      ],
      [
        { q: "コムナ13は安全?", a: "日中のツアー参加であれば安全です。夜間の訪問は避けましょう。地元ガイド付きが最も安心です。" },
        { q: "ガイドツアーの料金は?", a: "英語ツアーで一人約2〜4万ペソ（$5〜$10 USD程度）が相場です。チップは別途歓迎されます。" },
        { q: "所要時間の目安は?", a: "ガイドツアーで2〜3時間が一般的です。" },
        { q: "エスカレーターは無料?", a: "はい、公共交通機関として無料で利用できます。" },
      ],
    ),
    en: en(CO_EN_CTA,
      "Comuna 13 Escalator and Street Art Walk in Medellín",
      "Ride the outdoor escalators and explore the vibrant street art of Medellín's Comuna 13 — a neighbourhood reborn through urban renewal.",
      img("File:Comuna 13 Medellin graffiti tour.jpg", 1280, 854, "Comuna 13", "Colourful graffiti covering the hillside walls"),
      [
        img("File:Comuna 13 escalators Medellin.jpg", 1280, 854, "Outdoor escalators", "Public escalators ascending the hill"),
        img("File:Comuna 13 street art Medellin.jpg", 1280, 854, "Street art", "Murals telling the community's story"),
        img("File:Comuna 13 Medellin overview.jpg", 1280, 854, "Hilltop view", "Colourful houses and valley panorama"),
        img("File:Medellin Metro cable car.jpg", 1280, 854, "Metro Cable", "Gondola over the city"),
        img("File:Comuna 13 dance performance.jpg", 1280, 854, "Dance performance", "Local hip-hop dancers"),
      ],
      MEDELLIN_X,
      [
        { heading: "What makes this route special", body: "Comuna 13 was once the most dangerous neighbourhood in Medellín. Today it is arguably the city's most vibrant attraction, transformed by a set of outdoor escalators installed in 2011 and an explosion of street art that tells stories of conflict, resilience, and hope. Colourful houses cascade down steep hillsides, every surface painted by local and international muralists. Hip-hop dancers perform on the landings, and juice bars and souvenir stalls line the walkways." },
        { heading: "Getting there and starting point", body: "Take the Medellín Metro to San Javier station and walk to the escalator entrance. Joining a local guided tour — available in English and Spanish — is the safest and most informative way to visit. The standard route rides the escalators up and then walks down through the art-covered streets." },
        { heading: "Key stops", body: "The six-section outdoor escalator covers a hillside climb that once took residents over thirty minutes on foot. Murals along the route depict the neighbourhood's violent past and its journey toward peace — a guide can explain the symbolism. Cafés and juice bars at the top of the escalators offer sweeping valley views. Weekend visits often include live breakdancing and hip-hop performances." },
        { heading: "Best times to visit", body: "Early morning is ideal to beat the heat and the tour-group crowds. Weekends bring more street performances and market stalls. Medellín's eternal-spring climate keeps temperatures between 20 and 28 degrees Celsius year round, but the rainy months of April to May and October to November can bring afternoon showers — go in the morning." },
        { heading: "Practical tips", body: "A local guided tour is strongly recommended — it is safe to visit independently, but a guide adds invaluable historical context. Keep flashy jewellery to a minimum and store your camera in a bag rather than wearing it around your neck. Restrooms are available in cafés. Carry small amounts of Colombian pesos for souvenirs and drinks. An eSIM is useful for booking tours and posting on social media." },
      ],
      [
        { q: "Is Comuna 13 safe?", a: "Daytime visits with a guided tour are safe. Avoid going at night. A local guide is the most comfortable option." },
        { q: "How much does a guided tour cost?", a: "English tours run about 20,000 to 40,000 pesos per person — roughly five to ten US dollars. Tips are appreciated." },
        { q: "How much time should I budget?", a: "Two to three hours for a guided tour." },
        { q: "Are the escalators free?", a: "Yes, they are free public transport." },
      ],
    ),
  },

  // ─── 12. Medellín — El Poblado ──────────────────────────────────
  "medellin-el-poblado-walk": {
    ja: ja(CO_JA_CTA,
      "エルポブラドのカフェとパルケリャノ",
      "メデジンのエルポブラドを歩き、パルケリャノ周辺のカフェとレストラン、緑豊かな住宅街を散策するルートガイド。",
      img("File:Parque Lleras Medellin.jpg", 1280, 854, "パルケリャノ", "エルポブラドの中心的な広場"),
      [
        img("File:El Poblado Medellin street.jpg", 1280, 854, "エルポブラドの通り", "緑豊かな住宅街"),
        img("File:Medellin El Poblado cafes.jpg", 1280, 854, "カフェ通り", "おしゃれなカフェが並ぶ"),
        img("File:Provenza Medellin.jpg", 1280, 854, "プロベンサ通り", "トレンドのレストランエリア"),
        img("File:El Castillo Museo y Jardines Medellin.jpg", 1280, 854, "エルカスティーヨ博物館", "フランス風城館と庭園"),
        img("File:Medellin skyline from El Poblado.jpg", 1280, 854, "市街地の眺望", "エルポブラドからの夜景"),
      ],
      MEDELLIN_X,
      [
        { heading: "このルートの特徴", body: "エルポブラドはメデジンの南東に位置する高級住宅街で、外国人旅行者やデジタルノマドが最も多く滞在するエリアです。パルケリャノを中心にカフェ、レストラン、バーが密集し、夜はナイトライフの中心地になります。坂道に沿って緑豊かな並木が続き、メデジンの「常春の街」らしい気候を最も感じられる場所です。プロベンサ通りは新しいレストランやブティックが次々とオープンしている注目エリアです。" },
        { heading: "アクセスと起点", body: "メデジンメトロのポブラド駅が最寄りで、駅からパルケリャノまで徒歩15分ほどの坂道を上ります。パルケリャノを起点にプロベンサ通りへ向かい、その後エルカスティーヨ博物館方面まで歩くルートがおすすめです。" },
        { heading: "主要スポット", body: "パルケリャノは緑に囲まれた小さな広場で、周囲にはテラス席のレストランやバーが並びます。プロベンサ通りはメデジンで最もトレンドの飲食エリアで、コロンビアコーヒーの専門店やフュージョン料理のレストランが軒を連ねます。エルカスティーヨ博物館はフランスのロワール城を模した建物で、美しい庭園とアート収蔵品があります。" },
        { heading: "時間帯とおすすめ季節", body: "カフェ巡りは午前中がベストで、プロベンサ通りは昼食時から賑わい始めます。パルケリャノのナイトライフは木〜土曜の夜が最も活気があります。年間を通して過ごしやすい気候ですが、乾季（12〜3月、6〜8月）が最も歩きやすいです。" },
        { heading: "実用情報", body: "エルポブラドはメデジンで最も治安の良いエリアですが、スマートフォンを路上で長時間見せないなどの基本的な注意は必要です。多くの店がカード対応です。坂道が多いので歩きやすい靴を。トイレはカフェやレストランで利用可能。eSIMがあればカフェのWi-Fiに頼らずにナビゲーションやSNSが使えます。" },
      ],
      [
        { q: "エルポブラドの治安は?", a: "メデジンで最も安全なエリアの一つです。ただしスマートフォンのひったくりには注意しましょう。" },
        { q: "パルケリャノは夜も安全?", a: "人通りが多く基本的に安全ですが、深夜は酔客も増えるので注意。タクシーアプリでの帰宅がおすすめです。" },
        { q: "所要時間の目安は?", a: "カフェ巡りとプロベンサ通りで3〜4時間。エルカスティーヨも含めると半日です。" },
        { q: "コーヒーの値段は?", a: "スペシャルティコーヒーは1杯5,000〜15,000ペソ（$1.5〜$4 USD程度）と手頃です。" },
      ],
    ),
    en: en(CO_EN_CTA,
      "El Poblado Café and Parque Lleras Walk in Medellín",
      "Explore Medellín's El Poblado — leafy streets, specialty coffee, and the restaurant scene around Parque Lleras and Provenza.",
      img("File:Parque Lleras Medellin.jpg", 1280, 854, "Parque Lleras", "El Poblado's central square"),
      [
        img("File:El Poblado Medellin street.jpg", 1280, 854, "El Poblado street", "Leafy residential avenue"),
        img("File:Medellin El Poblado cafes.jpg", 1280, 854, "Café row", "Stylish coffee spots"),
        img("File:Provenza Medellin.jpg", 1280, 854, "Provenza", "Trendy restaurant strip"),
        img("File:El Castillo Museo y Jardines Medellin.jpg", 1280, 854, "El Castillo Museum", "French-style château and gardens"),
        img("File:Medellin skyline from El Poblado.jpg", 1280, 854, "City view", "Evening skyline from El Poblado"),
      ],
      MEDELLIN_X,
      [
        { heading: "What makes this route special", body: "El Poblado is Medellín's upscale southern hillside — the neighbourhood where most foreign visitors and digital nomads base themselves. Parque Lleras is the social hub, ringed by terrace restaurants and bars. A block away, Provenza street has become the city's trendiest dining corridor, with Colombian specialty-coffee shops and fusion restaurants opening at a rapid pace. The tree-lined residential streets are steep but beautifully green, capturing the city's eternal-spring climate at its best." },
        { heading: "Getting there and starting point", body: "Take the metro to Poblado station and walk uphill for about fifteen minutes to Parque Lleras. Start at the park, stroll through Provenza, and then continue uphill to El Castillo Museum if you have the energy." },
        { heading: "Key stops", body: "Parque Lleras is a compact green square surrounded by sidewalk dining and cocktail bars. Provenza is the restaurant mile — single-origin Colombian coffee, ceviche counters, and craft-beer taprooms compete for attention. El Castillo Museum is a Loire-style château with manicured gardens and an art collection. The walk there passes through some of El Poblado's most photogenic residential streets." },
        { heading: "Best times to visit", body: "Morning is best for café hopping. Provenza picks up at lunch and stays busy through dinner. Parque Lleras nightlife peaks Thursday to Saturday. Dry seasons — December to March and June to August — offer the most comfortable walking weather." },
        { heading: "Practical tips", body: "El Poblado is one of Medellín's safest areas, but avoid flashing your phone on the street for extended periods. Most places accept cards. The hills are steep, so wear good walking shoes. Restrooms are in cafés and restaurants. An eSIM means you do not have to rely on café Wi-Fi for navigation and social media." },
      ],
      [
        { q: "Is El Poblado safe?", a: "One of Medellín's safest neighbourhoods. Just be cautious with phones and flashy items on the street." },
        { q: "Is Parque Lleras safe at night?", a: "Busy and generally safe. Late at night crowds get rowdy — use a ride-hailing app to get home." },
        { q: "How much time should I budget?", a: "Three to four hours for cafés and Provenza. Half a day with El Castillo Museum." },
        { q: "How much does coffee cost?", a: "Specialty coffee runs 5,000 to 15,000 pesos — roughly one-fifty to four US dollars." },
      ],
    ),
  },

  // ─── 13. Cusco — San Blas ───────────────────────────────────────
  "cusco-san-blas-walk": {
    ja: ja(PE_JA_CTA,
      "サンブラス地区の石畳と職人工房",
      "クスコのサンブラス地区を歩き、石畳の坂道と伝統工芸の職人工房を巡るルートガイド。",
      img("File:San Blas Cusco Peru.jpg", 1280, 854, "サンブラス地区", "石畳の坂道と白壁の家々"),
      [
        img("File:San Blas Church Cusco.jpg", 1280, 854, "サンブラス教会", "精巧な木彫りの説教壇で有名"),
        img("File:Cusco artisan workshop.jpg", 1280, 854, "職人工房", "伝統的な陶芸の工房"),
        img("File:Cuesta de San Blas Cusco.jpg", 1280, 854, "サンブラスの坂", "白壁に挟まれた石畳の坂道"),
        img("File:Plazoleta de San Blas Cusco.jpg", 1280, 854, "サンブラス広場", "カフェに囲まれた小さな広場"),
        img("File:Cusco rooftops view.jpg", 1280, 854, "屋根の眺望", "赤茶色の屋根が連なるクスコの街並み"),
      ],
      CUSCO_X,
      [
        { heading: "このルートの特徴", body: "サンブラスはクスコ旧市街の北東に位置する職人街で、インカ時代の石積み土台の上にスペイン植民地時代の白壁が重なる独特の景観が広がっています。急な石畳の坂道沿いに陶芸、木彫り、織物の工房が並び、職人の作業風景を間近で見学できます。観光客が集中するアルマス広場から歩いて10分ほどの距離ですが、静かで落ち着いた雰囲気があります。" },
        { heading: "アクセスと起点", body: "アルマス広場からトゥナルスーヨ通り（旧ハトゥンルミヨク通り）を上り、12角の石を見てからサンブラス方面へ進むルートが定番です。標高約3,400メートルの高地なので、坂道はゆっくり歩きましょう。到着初日は高山病予防のためコカ茶を飲んで慣らしてからの散策がおすすめです。" },
        { heading: "主要スポット", body: "サンブラス教会は小さな教会ですが、一木彫りの説教壇が南米植民地美術の傑作として知られています。サンブラス広場にはカフェやレストランが並び、クスコの屋根越しの眺望を楽しめます。周辺の工房ではアーティストが実際に制作しているところを見学でき、直接購入も可能。カルメン・アルト通りの展望ポイントからは赤茶色の瓦屋根が連なるクスコの全景が一望できます。" },
        { heading: "時間帯とおすすめ季節", body: "午前中は光が柔らかく写真撮影に最適。工房は9時〜17時頃に開いています。乾季の5〜9月はほとんど雨が降らず最も歩きやすい時期。雨季（12〜3月）は午後にスコールがあるので午前中に回りましょう。" },
        { heading: "実用情報", body: "標高が高いので無理は禁物。水分をこまめに取り、ゆっくり歩きましょう。石畳は雨の後滑りやすいので、グリップの効く靴が必要です。工房でのクラフト購入は現金がメインですが、一部カード対応の店もあります。トイレはカフェで利用可能。eSIMがあれば工房の場所や口コミを地図で確認できます。" },
      ],
      [
        { q: "高山病は心配?", a: "標高約3,400メートルなので、到着初日は無理せずコカ茶を飲んで体を慣らしましょう。急な坂はゆっくり歩くことが大切です。" },
        { q: "工房の見学は無料?", a: "多くの工房は無料で見学できます。購入を強制されることはありませんが、気に入った作品があれば支援になります。" },
        { q: "所要時間の目安は?", a: "サンブラス地区だけで2〜3時間。高地なのでペースをゆっくりに設定してください。" },
        { q: "英語は通じる?", a: "カフェや観光向けの工房では基本的な英語が通じます。ローカルな工房ではスペイン語が主です。" },
      ],
    ),
    en: en(PE_EN_CTA,
      "San Blas Cobblestone and Artisan Walk in Cusco",
      "Climb the cobblestone lanes of Cusco's San Blas quarter — artisan workshops, Inca stonework, and rooftop views of the red-tile skyline.",
      img("File:San Blas Cusco Peru.jpg", 1280, 854, "San Blas", "Cobblestone lanes and whitewashed houses"),
      [
        img("File:San Blas Church Cusco.jpg", 1280, 854, "San Blas Church", "Famous carved-wood pulpit"),
        img("File:Cusco artisan workshop.jpg", 1280, 854, "Artisan workshop", "Traditional pottery studio"),
        img("File:Cuesta de San Blas Cusco.jpg", 1280, 854, "Cuesta de San Blas", "Steep stone lane between white walls"),
        img("File:Plazoleta de San Blas Cusco.jpg", 1280, 854, "Plazoleta de San Blas", "Café-ringed pocket square"),
        img("File:Cusco rooftops view.jpg", 1280, 854, "Rooftop view", "Terracotta roofs stretching across the valley"),
      ],
      CUSCO_X,
      [
        { heading: "What makes this route special", body: "San Blas is Cusco's artisan quarter, perched on a hillside just northeast of the Plaza de Armas. Inca stone foundations support Spanish colonial whitewashed walls, and the steep cobblestone lanes are lined with workshops where potters, woodcarvers, and weavers still practise their craft. It is only a ten-minute walk from the busy main square, yet the atmosphere is noticeably calmer and more intimate." },
        { heading: "Getting there and starting point", body: "From the Plaza de Armas, walk up Calle Hatunrumiyoc — pause to find the famous twelve-angled stone — and continue uphill toward San Blas. At roughly 3,400 metres above sea level, the grade is steep. Walk slowly, and consider acclimatising with coca tea on your first day in Cusco." },
        { heading: "Key stops", body: "San Blas Church is tiny but houses a masterpiece: a pulpit carved from a single cedar trunk, considered one of the finest examples of colonial-era woodwork in the Americas. The plazoleta outside has cafés with rooftop terraces overlooking terracotta rooftops. Surrounding workshops let you watch artisans at work and buy directly. The viewpoint on Carmen Alto street provides a sweeping panorama of the city and distant peaks." },
        { heading: "Best times to visit", body: "Morning light is softest and ideal for photography. Workshops open around 9 am and close by 5 pm. The dry season from May to September is the most comfortable for walking. During the wet season (December to March), showers tend to come in the afternoon — go in the morning." },
        { heading: "Practical tips", body: "Take the altitude seriously — drink water, walk slowly, and rest when needed. Cobblestones can be slippery after rain, so wear shoes with good grip. Most workshops prefer cash, though some accept cards. Restrooms are in cafés around the plazoleta. An eSIM helps you find workshops and check reviews on the map." },
      ],
      [
        { q: "Should I worry about altitude sickness?", a: "At 3,400 metres, yes — take it easy on your first day, drink coca tea, and walk slowly up the hills." },
        { q: "Are workshop visits free?", a: "Most let you watch for free. There is no obligation to buy, but purchases directly support local artisans." },
        { q: "How much time should I budget?", a: "Two to three hours for San Blas. Plan for a slower pace because of the altitude." },
        { q: "Is English spoken?", a: "Tourist-facing cafés and workshops usually have basic English. More local studios operate in Spanish." },
      ],
    ),
  },

  // ─── 14. Cusco — Plaza de Armas ─────────────────────────────────
  "cusco-plaza-de-armas-walk": {
    ja: ja(PE_JA_CTA,
      "アルマス広場と大聖堂周辺散策",
      "クスコのアルマス広場を起点に、大聖堂とインカの石壁を巡り、周辺の路地でペルー料理を楽しむルートガイド。",
      img("File:Cusco Plaza de Armas panorama.jpg", 1280, 854, "アルマス広場", "大聖堂とイエズス会教会に囲まれた広場"),
      [
        img("File:Cusco Cathedral.jpg", 1280, 854, "クスコ大聖堂", "南米を代表するバロック建築の大聖堂"),
        img("File:Twelve Angled Stone Cusco.jpg", 1280, 854, "12角の石", "精密なインカの石積み技術"),
        img("File:Qorikancha Cusco.jpg", 1280, 854, "コリカンチャ", "インカの太陽神殿跡に建つ教会"),
        img("File:Cusco balconies colonial.jpg", 1280, 854, "植民地時代のバルコニー", "木製バルコニーが並ぶ通り"),
        img("File:Mercado de San Pedro Cusco.jpg", 1280, 854, "サンペドロ市場", "地元の食材が並ぶ活気ある市場"),
      ],
      CUSCO_X,
      [
        { heading: "このルートの特徴", body: "アルマス広場はかつてインカ帝国の儀式の場だった場所で、スペイン征服後にバロック様式の大聖堂とイエズス会教会が建てられました。広場を囲むアーケードにはカフェやレストランが並び、2階のバルコニー席からの広場の眺めは格別です。周辺の路地にはインカ時代の精密な石積みが残り、コリカンチャ（太陽の神殿）やサンペドロ市場へも徒歩圏内です。" },
        { heading: "アクセスと起点", body: "クスコ空港からタクシーで約15分。アルマス広場はクスコの中心なのでほとんどのホテルから徒歩でアクセスできます。広場の北西角を起点に、まず大聖堂を見学し、ハトゥンルミヨク通りで12角の石を見て、コリカンチャまで南下するルートが定番です。" },
        { heading: "主要スポット", body: "クスコ大聖堂は内部の宗教画コレクションが見事で、特に「最後の晩餐」のクスコ版（クイを食べるイエス）は必見。12角の石はインカの石積み技術の精密さを象徴する遺構で、カミソリの刃も入らないほどぴったりと組まれています。コリカンチャはインカの太陽神殿の上にスペインの教会を建てた歴史的建造物。サンペドロ市場ではフレッシュジュースやペルー料理のランチを格安で楽しめます。" },
        { heading: "時間帯とおすすめ季節", body: "午前中は大聖堂やコリカンチャの見学に最適。昼食はサンペドロ市場で地元のランチを試しましょう。午後は広場のカフェのバルコニー席でゆっくり過ごすのがおすすめ。5〜9月の乾季がベストシーズンで、6月のインティライミ（太陽の祭り）は広場が壮大な祭りの舞台になります。" },
        { heading: "実用情報", body: "ボレト・ツリスティコ（観光チケット）を購入すると、大聖堂やコリカンチャを含む複数の観光地に割引で入場できます。標高3,400メートルなので無理せずゆっくり歩きましょう。広場周辺は観光客も多いですが、スリには注意。トイレはカフェやレストランで利用可能。eSIMがあれば観光地の営業時間や歴史情報をその場で調べられます。" },
      ],
      [
        { q: "大聖堂の入場料は?", a: "ボレト・ツリスティコ（約130ソル）に含まれるか、単独チケット（約40ソル）で入場できます。" },
        { q: "12角の石はどこにある?", a: "ハトゥンルミヨク通りの壁面にあります。アルマス広場から徒歩2分です。" },
        { q: "所要時間の目安は?", a: "大聖堂・12角の石・コリカンチャ・市場を回って半日が目安です。" },
        { q: "インティライミはいつ?", a: "毎年6月24日に開催されます。チケットは事前購入がおすすめです。" },
      ],
    ),
    en: en(PE_EN_CTA,
      "Plaza de Armas and Cathedral Walk in Cusco",
      "Start at Cusco's Plaza de Armas — baroque cathedrals, Inca stonework, and Peruvian street food in the ancient capital of the Inca Empire.",
      img("File:Cusco Plaza de Armas panorama.jpg", 1280, 854, "Plaza de Armas", "Cathedral and Jesuit church framing the square"),
      [
        img("File:Cusco Cathedral.jpg", 1280, 854, "Cusco Cathedral", "Baroque masterpiece"),
        img("File:Twelve Angled Stone Cusco.jpg", 1280, 854, "Twelve-Angled Stone", "Precision Inca masonry"),
        img("File:Qorikancha Cusco.jpg", 1280, 854, "Qorikancha", "Sun temple foundations beneath a church"),
        img("File:Cusco balconies colonial.jpg", 1280, 854, "Colonial balconies", "Wooden balconies lining the street"),
        img("File:Mercado de San Pedro Cusco.jpg", 1280, 854, "San Pedro Market", "Bustling local market"),
      ],
      CUSCO_X,
      [
        { heading: "What makes this route special", body: "The Plaza de Armas sits on what was once the ceremonial heart of the Inca Empire. After the Spanish conquest, baroque cathedrals and arcaded colonnades replaced Inca temples, but the stones beneath your feet still carry the weight of both civilisations. Cafés with second-floor balconies ring the square, and surrounding streets reveal Inca walls so precise that no mortar was needed. Qorikancha and San Pedro Market are both within easy walking distance." },
        { heading: "Getting there and starting point", body: "A taxi from Cusco airport takes about fifteen minutes. The Plaza de Armas is the city centre, reachable on foot from virtually any hotel. Begin at the northwest corner of the square, visit the Cathedral, walk along Hatunrumiyoc to see the Twelve-Angled Stone, then head south to Qorikancha." },
        { heading: "Key stops", body: "Cusco Cathedral houses a remarkable collection of colonial religious paintings, including a local version of The Last Supper featuring cuy — guinea pig. The Twelve-Angled Stone on Hatunrumiyoc demonstrates Inca masonry at its most precise: each block fits so tightly a razor blade cannot slip between them. Qorikancha is a colonial church built atop the foundations of the Inca sun temple — both layers are visible. San Pedro Market is the place for cheap, filling Peruvian lunches and fresh fruit juices." },
        { heading: "Best times to visit", body: "Mornings are best for cathedral and museum visits. Grab lunch at San Pedro Market around midday. Afternoons are perfect for lingering at a balcony café overlooking the square. The dry season from May to September is ideal, and June 24 brings Inti Raymi — the Festival of the Sun — when the plaza becomes a grand ceremonial stage." },
        { heading: "Practical tips", body: "A Boleto Turístico covers admission to the cathedral, Qorikancha, and several other sites at a discount. The altitude of 3,400 metres is no joke — walk slowly, drink water, and rest as needed. The square is busy with tourists, so keep an eye on your belongings. Restrooms are in cafés and restaurants. An eSIM lets you look up opening hours and historical background on the spot." },
      ],
      [
        { q: "What is the cathedral admission fee?", a: "Around 40 soles for a single ticket, or included in the Boleto Turístico (about 130 soles for multiple sites)." },
        { q: "Where is the Twelve-Angled Stone?", a: "On the wall along Hatunrumiyoc street, a two-minute walk from the Plaza de Armas." },
        { q: "How much time should I budget?", a: "Half a day for the cathedral, Twelve-Angled Stone, Qorikancha, and market combined." },
        { q: "When is Inti Raymi?", a: "June 24 every year. Book tickets in advance as it is a major event." },
      ],
    ),
  },

  // ─── 15. Auckland — Ponsonby ────────────────────────────────────
  "auckland-ponsonby-walk": {
    ja: ja(NZ_JA_CTA,
      "ポンソンビーのカフェとブティック通り",
      "オークランドのポンソンビーを歩き、独立系カフェとブティックが並ぶおしゃれな通りを散策するルートガイド。",
      img("File:Ponsonby Road Auckland.jpg", 1280, 854, "ポンソンビーロード", "カフェとブティックが並ぶメインストリート"),
      [
        img("File:Ponsonby Central Auckland.jpg", 1280, 854, "ポンソンビーセントラル", "フードホールとショップの複合施設"),
        img("File:Western Park Auckland.jpg", 1280, 854, "ウェスタンパーク", "緑豊かな丘の上の公園"),
        img("File:Three Lamps junction Auckland.jpg", 1280, 854, "スリーランプス", "ポンソンビーの象徴的な交差点"),
        img("File:K Road Auckland.jpg", 1280, 854, "カランガハペロード", "アートとカルチャーの通り"),
        img("File:Auckland Harbour Bridge.jpg", 1280, 854, "ハーバーブリッジ", "ポンソンビーから見えるハーバーブリッジ"),
      ],
      AUCKLAND_X,
      [
        { heading: "このルートの特徴", body: "ポンソンビーはオークランドCBDの西に位置するトレンドエリアで、ポンソンビーロードを軸に独立系カフェ、ブティック、レストランが約1.5キロにわたって並んでいます。ヴィクトリア様式の木造住宅が立ち並ぶ住宅街に新しいフードホールやデザインショップが混在し、オークランドで最もおしゃれなエリアとして知られています。ニュージーランドのカフェ文化を体験するには最適の場所です。" },
        { heading: "アクセスと起点", body: "オークランドCBDからバスまたは徒歩20分でポンソンビーロードに到着します。スリーランプス交差点を起点に、ポンソンビーロードを北西に向かって歩くルートがおすすめです。途中でカランガハペロード（Kロード）を経由するとアートギャラリーも回れます。" },
        { heading: "主要スポット", body: "ポンソンビーセントラルは旧映画館を改装した複合施設で、フードホール、ショップ、バーが入っています。ポンソンビーロード沿いには世界レベルのフラットホワイトを出すカフェが点在。ウェスタンパークは丘の上にある緑豊かな公園で、街の眺めを楽しみながら一休みできます。Kロード方面にはアートギャラリーやレコードショップがあり、よりオルタナティブな雰囲気です。" },
        { heading: "時間帯とおすすめ季節", body: "カフェは7〜8時から開くので朝のコーヒー散歩が楽しめます。ショップは10時頃からオープン。週末のブランチが特に人気です。ニュージーランドの夏（12〜2月）は天候に恵まれ最も歩きやすいですが、秋（3〜5月）も穏やかで良い季節です。" },
        { heading: "実用情報", body: "ポンソンビーロードは約1.5キロの一本道なので迷う心配はありません。ほぼ全ての店がカード対応（タッチ決済が主流）。トイレはポンソンビーセントラルやカフェで利用可能。eSIMがあればカフェの口コミチェックやバスの時刻表確認に便利です。" },
      ],
      [
        { q: "ポンソンビーの治安は?", a: "オークランドで最も安全なエリアの一つです。夜も飲食店が多く人通りがあります。" },
        { q: "所要時間の目安は?", a: "カフェとショッピングを含めて2〜3時間。ブランチを入れると半日です。" },
        { q: "おすすめのカフェは?", a: "ポンソンビーロード沿いに多数。ニュージーランド名物のフラットホワイトをぜひ試してください。" },
        { q: "Kロードも歩くべき?", a: "アートやカルチャーに興味があれば組み合わせるのがおすすめ。徒歩10分で行き来できます。" },
      ],
    ),
    en: en(NZ_EN_CTA,
      "Ponsonby Café and Boutique Walk in Auckland",
      "Stroll Auckland's Ponsonby Road — independent cafés, designer boutiques, and flat-white culture in the city's trendiest strip.",
      img("File:Ponsonby Road Auckland.jpg", 1280, 854, "Ponsonby Road", "Cafés and boutiques along the main drag"),
      [
        img("File:Ponsonby Central Auckland.jpg", 1280, 854, "Ponsonby Central", "Food hall and shops"),
        img("File:Western Park Auckland.jpg", 1280, 854, "Western Park", "Hilltop green space"),
        img("File:Three Lamps junction Auckland.jpg", 1280, 854, "Three Lamps", "Iconic intersection"),
        img("File:K Road Auckland.jpg", 1280, 854, "Karangahape Road", "Art and culture strip"),
        img("File:Auckland Harbour Bridge.jpg", 1280, 854, "Harbour Bridge", "View from the neighbourhood"),
      ],
      AUCKLAND_X,
      [
        { heading: "What makes this route special", body: "Ponsonby is Auckland's café-and-boutique heartland, stretching about one and a half kilometres along Ponsonby Road. Victorian timber villas sit alongside converted food halls and designer stores, and flat whites here rival the best in the Southern Hemisphere. The residential side streets are leafy and photogenic, and the adjacent Karangahape Road (K Road) adds an edgier art-gallery and record-shop layer." },
        { heading: "Getting there and starting point", body: "Ponsonby is a twenty-minute walk or a short bus ride west of the Auckland CBD. Start at the Three Lamps intersection and walk northwest along Ponsonby Road. Detour through K Road on the way back for galleries and vintage stores." },
        { heading: "Key stops", body: "Ponsonby Central is a converted cinema that now houses a food hall, boutique shops, and a bar. Along the road, world-class cafés compete for the perfect flat white. Western Park sits on a hilltop with city views and makes a peaceful mid-walk rest stop. K Road is Auckland's alternative arts corridor — galleries, record shops, and independent fashion labels cluster here." },
        { heading: "Best times to visit", body: "Cafés open from 7 or 8 am, so an early coffee walk is easy. Shops follow around 10 am. Weekend brunch is the neighbourhood's signature event. New Zealand summer (December to February) is the best weather, though autumn (March to May) is mild and less crowded." },
        { heading: "Practical tips", body: "Ponsonby Road is a straight one-and-a-half-kilometre strip — hard to get lost. Almost every shop takes contactless payment. Restrooms are in Ponsonby Central and cafés. An eSIM keeps café reviews and bus timetables at your fingertips." },
      ],
      [
        { q: "Is Ponsonby safe?", a: "One of Auckland's safest areas. Well-lit and busy even in the evening." },
        { q: "How much time should I budget?", a: "Two to three hours with café stops. Half a day if you include brunch and K Road." },
        { q: "Any recommended cafés?", a: "Several along Ponsonby Road — try the flat white, New Zealand's signature coffee." },
        { q: "Should I also visit K Road?", a: "If you enjoy art and culture, absolutely. It is a ten-minute walk between the two." },
      ],
    ),
  },

  // ─── 16. Auckland — Wynyard Quarter ─────────────────────────────
  "auckland-wynyard-quarter-walk": {
    ja: ja(NZ_JA_CTA,
      "ワイナード地区のウォーターフロント散歩",
      "オークランドのワイナード地区を歩き、港沿いのレストランとモダン建築を楽しむルートガイド。",
      img("File:Wynyard Quarter Auckland.jpg", 1280, 854, "ワイナードクォーター", "モダンな建築が並ぶウォーターフロント"),
      [
        img("File:Silo Park Auckland.jpg", 1280, 854, "サイロパーク", "旧サイロを活かした公園"),
        img("File:Viaduct Harbour Auckland.jpg", 1280, 854, "バイアダクトハーバー", "ヨットが停泊するマリーナ"),
        img("File:Auckland Fish Market.jpg", 1280, 854, "フィッシュマーケット", "新鮮な魚介類の市場"),
        img("File:Te Wero Island Bridge Auckland.jpg", 1280, 854, "テウェロ島ブリッジ", "歩行者用の跳ね橋"),
        img("File:North Wharf Auckland.jpg", 1280, 854, "ノースワーフ", "おしゃれなレストラン街"),
      ],
      AUCKLAND_X,
      [
        { heading: "このルートの特徴", body: "ワイナードクォーターはオークランドの旧港湾地区を再開発したウォーターフロントエリアで、モダンな建築と海辺の散歩道が調和しています。旧産業施設のサイロやクレーンがアート作品やランドマークとして残され、レストラン、フィッシュマーケット、遊び場が充実した都市空間に生まれ変わっています。バイアダクトハーバーのヨットとハーバーブリッジの景色が美しいエリアです。" },
        { heading: "アクセスと起点", body: "オークランドCBDのブリトマート駅から徒歩10分でバイアダクトハーバーに到着します。バイアダクトハーバーを起点に、テウェロ島を渡ってワイナードクォーターに入り、ノースワーフ沿いにサイロパークまで歩くルートがおすすめです。" },
        { heading: "主要スポット", body: "バイアダクトハーバーにはアメリカズカップの歴史を感じるヨットが停泊し、周囲にはレストランが並びます。オークランドフィッシュマーケットは新鮮な魚介を使ったフィッシュ&チップスが人気。ノースワーフは改装された倉庫にレストランやカフェが入った注目のダイニングエリア。サイロパークでは週末にナイトマーケットが開催されることもあります。" },
        { heading: "時間帯とおすすめ季節", body: "昼食時にフィッシュマーケットで食事をし、午後にウォーターフロントを散歩するのがベスト。夕暮れ時のハーバーの景色は特に美しいです。夏（12〜2月）は屋外ダイニングが最高ですが、秋や冬でもカフェで暖かく過ごせます。" },
        { heading: "実用情報", body: "全体がフラットで歩きやすいエリアです。全ての店がカード対応。トイレはフィッシュマーケットやレストラン内で利用可能。風が強い日があるので上着を持参しましょう。eSIMがあればレストランの予約やイベント情報の確認に便利です。" },
      ],
      [
        { q: "ワイナードクォーターの治安は?", a: "非常に安全なエリアです。夜もレストランやバーが営業しており人通りがあります。" },
        { q: "フィッシュマーケットの営業時間は?", a: "通常は朝から夕方まで営業。新鮮な魚が目当てなら午前中が最適です。" },
        { q: "所要時間の目安は?", a: "食事込みで2〜3時間。夕暮れまで過ごすなら半日を見てください。" },
        { q: "子供連れでも楽しめる?", a: "はい。遊び場やオープンスペースが充実しており、ベビーカーでも移動しやすいフラットなエリアです。" },
      ],
    ),
    en: en(NZ_EN_CTA,
      "Wynyard Quarter Waterfront Walk in Auckland",
      "Explore Auckland's Wynyard Quarter — harbour-side dining, the fish market, and silo-park sunsets on the regenerated waterfront.",
      img("File:Wynyard Quarter Auckland.jpg", 1280, 854, "Wynyard Quarter", "Modern waterfront architecture"),
      [
        img("File:Silo Park Auckland.jpg", 1280, 854, "Silo Park", "Repurposed industrial silo park"),
        img("File:Viaduct Harbour Auckland.jpg", 1280, 854, "Viaduct Harbour", "Yacht-filled marina"),
        img("File:Auckland Fish Market.jpg", 1280, 854, "Fish Market", "Fresh seafood market"),
        img("File:Te Wero Island Bridge Auckland.jpg", 1280, 854, "Te Wero Island Bridge", "Pedestrian swing bridge"),
        img("File:North Wharf Auckland.jpg", 1280, 854, "North Wharf", "Converted warehouse restaurants"),
      ],
      AUCKLAND_X,
      [
        { heading: "What makes this route special", body: "Wynyard Quarter is Auckland's showcase waterfront regeneration project. Old silos and dockside cranes have been kept as landmarks while the surrounding wharves now house restaurants, a fish market, and public spaces with harbour views. The pedestrian bridge to Te Wero Island, the yacht-filled Viaduct Basin, and the Harbour Bridge in the background make it one of the most photogenic walks in the city." },
        { heading: "Getting there and starting point", body: "Walk ten minutes north from Britomart station in the CBD to reach Viaduct Harbour. Cross Te Wero Island and continue into Wynyard Quarter, following the waterfront north to Silo Park." },
        { heading: "Key stops", body: "Viaduct Harbour is Auckland's dining waterfront, full of restaurants with marina views. Auckland Fish Market sells fresh catches and does excellent fish and chips on-site. North Wharf is a row of converted warehouses now home to upmarket restaurants and craft-beer bars. Silo Park, at the northern end, hosts weekend night markets and outdoor movie screenings in summer." },
        { heading: "Best times to visit", body: "Lunchtime at the fish market followed by an afternoon waterfront stroll is the classic itinerary. Sunset light over the harbour is stunning. Summer (December to February) is ideal for outdoor dining, but autumn and winter are fine for café-centred visits." },
        { heading: "Practical tips", body: "The entire area is flat and very stroller-friendly. All venues accept contactless payment. Restrooms are in the fish market and restaurants. Bring a jacket — harbour winds can be brisk. An eSIM is handy for restaurant bookings and event listings." },
      ],
      [
        { q: "Is Wynyard Quarter safe?", a: "Very safe, with good foot traffic day and night thanks to the restaurants and bars." },
        { q: "What are the fish market hours?", a: "Typically morning to late afternoon. Go early for the freshest catches." },
        { q: "How much time should I budget?", a: "Two to three hours including a meal. Half a day if you stay for sunset." },
        { q: "Is it family-friendly?", a: "Absolutely — playgrounds, open spaces, and flat paths make it easy with kids and strollers." },
      ],
    ),
  },

  // ─── 17. Perth — Fremantle ──────────────────────────────────────
  "perth-fremantle-walk": {
    ja: ja(AU_JA_CTA,
      "フリーマントルの港町マーケット散策",
      "パースのフリーマントルを歩き、歴史的マーケットと港町の雰囲気を楽しむルートガイド。",
      img("File:Fremantle Markets entrance.jpg", 1280, 854, "フリーマントルマーケット", "1897年から続く歴史的マーケット"),
      [
        img("File:Fremantle Prison entrance.jpg", 1280, 854, "フリーマントル刑務所", "世界遺産に登録された旧刑務所"),
        img("File:Fishing Boat Harbour Fremantle.jpg", 1280, 854, "フィッシングボートハーバー", "フィッシュ&チップスの名所"),
        img("File:Cappuccino Strip Fremantle.jpg", 1280, 854, "カプチーノストリップ", "カフェとレストランが並ぶ通り"),
        img("File:Round House Fremantle.jpg", 1280, 854, "ラウンドハウス", "西オーストラリア最古の建物"),
        img("File:Fremantle Arts Centre.jpg", 1280, 854, "フリーマントルアーツセンター", "美しい石造りの文化施設"),
      ],
      PERTH_X,
      [
        { heading: "このルートの特徴", body: "フリーマントルはパースの南西に位置する港町で、19世紀の石灰岩造りの建物と活気あるマーケット文化で知られています。フリーマントルマーケットは1897年から続くランドマークで、地元の食材やクラフト雑貨が並びます。カプチーノストリップにはカフェが密集し、フィッシングボートハーバーでは獲れたてのフィッシュ&チップスが楽しめます。小さな街の中にオーストラリアの歴史と食文化が凝縮されています。" },
        { heading: "アクセスと起点", body: "パースCBDからフリーマントル線の電車で約30分。フリーマントル駅を出ると目の前がマーケットです。マーケットを起点に、カプチーノストリップを通ってハーバーへ向かい、ラウンドハウスを経由して駅に戻るルートが効率的です。" },
        { heading: "主要スポット", body: "フリーマントルマーケットは金〜日曜と祝日に開き、地元産の蜂蜜やオリーブオイル、オーストラリア先住民のアートなどが並びます。フリーマントル刑務所は世界遺産で、ガイド付きトンネルツアーが人気。ハーバーのフィッシュ&チップスは外せません。ラウンドハウスは1831年建造の西オーストラリア最古の建物です。アーツセンターでは無料で地元アーティストの展示を見られます。" },
        { heading: "時間帯とおすすめ季節", body: "マーケットは金曜9時〜20時、土日10時〜17時の営業。午前中に訪問すると混雑を避けられます。南半球なので9〜11月（春）と3〜5月（秋）が最も過ごしやすく、夏（12〜2月）は暑いですが海風が心地良いです。" },
        { heading: "実用情報", body: "街全体がコンパクトで徒歩で十分回れます。ほとんどの店がカード対応。トイレはマーケット内やハーバー周辺にあります。海風が強い日があるので薄手の上着を持参しましょう。eSIMがあればカフェやレストランの口コミ確認に便利です。" },
      ],
      [
        { q: "マーケットの営業日は?", a: "金曜9時〜20時、土日10時〜17時、祝日も営業。月〜木は閉まっています。" },
        { q: "フリーマントル刑務所の入場料は?", a: "ツアーにより$22〜$65 AUD程度。トンネルツアーは事前予約がおすすめです。" },
        { q: "所要時間の目安は?", a: "マーケット・ハーバー・ラウンドハウスで3〜4時間。刑務所も含めると半日です。" },
        { q: "パースからのアクセスは?", a: "フリーマントル線の電車で約30分。トランスパースカードで乗車できます。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Fremantle Port Town Market Walk near Perth",
      "Explore Fremantle — heritage markets, harbour fish and chips, and convict-era architecture in Perth's characterful port town.",
      img("File:Fremantle Markets entrance.jpg", 1280, 854, "Fremantle Markets", "Heritage market since 1897"),
      [
        img("File:Fremantle Prison entrance.jpg", 1280, 854, "Fremantle Prison", "World Heritage convict site"),
        img("File:Fishing Boat Harbour Fremantle.jpg", 1280, 854, "Fishing Boat Harbour", "Fish and chips with harbour views"),
        img("File:Cappuccino Strip Fremantle.jpg", 1280, 854, "Cappuccino Strip", "Café-lined street"),
        img("File:Round House Fremantle.jpg", 1280, 854, "Round House", "Oldest building in Western Australia"),
        img("File:Fremantle Arts Centre.jpg", 1280, 854, "Fremantle Arts Centre", "Heritage stone arts venue"),
      ],
      PERTH_X,
      [
        { heading: "What makes this route special", body: "Fremantle is Perth's port-town alter ego — a compact grid of limestone buildings, buzzing weekend markets, and a harbour where trawlers unload next to fish-and-chip counters. The Fremantle Markets have been running since 1897, and the Cappuccino Strip rivals any café precinct in Australia. Add a World Heritage convict prison and the state's oldest building and you have a half-day of heritage, food, and harbour breezes in one walkable package." },
        { heading: "Getting there and starting point", body: "Catch the Fremantle line train from Perth CBD — the ride takes about thirty minutes. Fremantle station is directly opposite the markets. Start there, walk through the Cappuccino Strip to the harbour, loop past the Round House, and return to the station." },
        { heading: "Key stops", body: "Fremantle Markets open Friday to Sunday and on public holidays, selling local honey, olive oil, indigenous art, and handmade crafts. Fremantle Prison, a World Heritage site, offers popular guided tunnel tours. Fishing Boat Harbour is the go-to spot for fish and chips. The Round House, built in 1831, is the oldest structure in Western Australia. The Arts Centre hosts free exhibitions by local artists in a beautiful stone building." },
        { heading: "Best times to visit", body: "The markets open at 9 am on Fridays (until 8 pm), and 10 am on weekends (until 5 pm). Go early to avoid crowds. Southern-hemisphere spring (September to November) and autumn (March to May) are the most comfortable seasons. Summer is hot but the sea breeze helps." },
        { heading: "Practical tips", body: "The town is compact and entirely walkable. Most shops accept cards. Restrooms are inside the markets and near the harbour. Bring a light jacket for windy days. An eSIM keeps café reviews and transport info handy." },
      ],
      [
        { q: "What days are the markets open?", a: "Friday 9 am to 8 pm, Saturday and Sunday 10 am to 5 pm, plus public holidays. Closed Monday to Thursday." },
        { q: "How much is the prison tour?", a: "Tours range from about $22 to $65 AUD depending on the tour type. The tunnel tour should be booked in advance." },
        { q: "How much time should I budget?", a: "Three to four hours for markets, harbour, and Round House. Half a day with the prison." },
        { q: "How do I get from Perth?", a: "The Fremantle line train takes about thirty minutes. Use a SmartRider card for fare payment." },
      ],
    ),
  },

  // ─── 18. Perth — Northbridge ────────────────────────────────────
  "perth-northbridge-walk": {
    ja: ja(AU_JA_CTA,
      "ノースブリッジのアートとレストラン通り",
      "パースのノースブリッジを歩き、ストリートアートと多国籍レストラン、バーを巡るルートガイド。",
      img("File:Northbridge Perth street.jpg", 1280, 854, "ノースブリッジ", "カラフルなストリートアートと飲食店"),
      [
        img("File:Perth Cultural Centre.jpg", 1280, 854, "パースカルチャーセンター", "美術館と図書館の文化エリア"),
        img("File:Art Gallery of Western Australia.jpg", 1280, 854, "西オーストラリア美術館", "先住民アートのコレクション"),
        img("File:William Street Perth.jpg", 1280, 854, "ウィリアムストリート", "飲食店が集中するメインストリート"),
        img("File:Northbridge Piazza Perth.jpg", 1280, 854, "ノースブリッジピアッツァ", "屋外スクリーンのある広場"),
        img("File:Lake Street Northbridge.jpg", 1280, 854, "レイクストリート", "アジア料理のレストラン街"),
      ],
      PERTH_X,
      [
        { heading: "このルートの特徴", body: "ノースブリッジはパースCBDのすぐ北に位置するエンターテイメント地区で、多国籍レストラン、バー、ストリートアートが集まるナイトライフの中心地です。パースカルチャーセンターには西オーストラリア美術館、博物館、州立図書館が無料で公開されており、昼間は文化散策、夜は食事とバー巡りを楽しめます。アジア料理のレストランが特に充実しており、中華、ベトナム、日本料理、韓国料理が揃っています。" },
        { heading: "アクセスと起点", body: "パース駅から歩道橋を渡って徒歩5分でノースブリッジに入ります。パースカルチャーセンターを起点に、まず美術館を見てからウィリアムストリートを北上し、レストランエリアに向かうルートがおすすめです。" },
        { heading: "主要スポット", body: "西オーストラリア美術館はアボリジニアートのコレクションが素晴らしく、入場無料。ウィリアムストリートとジェームスストリートにはバーやレストランが密集しています。レイクストリートはアジア料理のメッカで、特に中華料理とベトナム料理が人気。ノースブリッジピアッツァには大型屋外スクリーンがあり、イベントが開催されることもあります。裏通りのストリートアートは散策しながら発見する楽しさがあります。" },
        { heading: "時間帯とおすすめ季節", body: "美術館は10時開館で午前中の見学に最適。レストランは昼食時から賑わい始め、夜がピークです。金〜土曜の夜はバーやライブミュージックが特に活気があります。パースは年間を通じて天候が良く、特に3〜5月と9〜11月が過ごしやすいです。" },
        { heading: "実用情報", body: "パース駅から徒歩圏内なのでアクセスは非常に便利。ほとんどの店がカード対応です。夜間はメインストリートは安全ですが、人通りの少ない裏通りは注意しましょう。トイレはカルチャーセンターやレストランで利用可能。eSIMがあればレストランの予約やストリートアートマップの確認に便利です。" },
      ],
      [
        { q: "ノースブリッジの治安は?", a: "昼間は安全で歩きやすいエリアです。夜間のメインストリートも人通りが多いですが、裏通りは注意が必要です。" },
        { q: "美術館は無料?", a: "はい、西オーストラリア美術館と博物館は入場無料です。" },
        { q: "所要時間の目安は?", a: "美術館と食事で3〜4時間。バー巡りも含めると夕方から半日です。" },
        { q: "おすすめの料理は?", a: "レイクストリートのアジア料理、特に中華料理とベトナム麺が人気です。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Northbridge Art and Restaurant Walk in Perth",
      "Explore Perth's Northbridge — street art, multicultural restaurants, free galleries, and the city's best night-time dining strip.",
      img("File:Northbridge Perth street.jpg", 1280, 854, "Northbridge", "Colourful street art and eateries"),
      [
        img("File:Perth Cultural Centre.jpg", 1280, 854, "Perth Cultural Centre", "Museum and gallery precinct"),
        img("File:Art Gallery of Western Australia.jpg", 1280, 854, "Art Gallery of WA", "Indigenous art collection"),
        img("File:William Street Perth.jpg", 1280, 854, "William Street", "Restaurant-lined main road"),
        img("File:Northbridge Piazza Perth.jpg", 1280, 854, "Northbridge Piazza", "Outdoor screen plaza"),
        img("File:Lake Street Northbridge.jpg", 1280, 854, "Lake Street", "Asian restaurant row"),
      ],
      PERTH_X,
      [
        { heading: "What makes this route special", body: "Northbridge is Perth's entertainment and multicultural dining quarter, sitting just across the railway from the CBD. By day it offers free world-class galleries — the Art Gallery of Western Australia has one of the country's finest indigenous art collections — and by night it transforms into a strip of bars, live-music venues, and restaurants covering cuisines from Vietnamese pho to Korean barbecue. Street art fills laneways and building walls, making every side street worth a detour." },
        { heading: "Getting there and starting point", body: "Walk five minutes north from Perth station via the overpass. Start at the Perth Cultural Centre, visit the gallery, then head north along William Street into the restaurant zone." },
        { heading: "Key stops", body: "The Art Gallery of Western Australia is free and its Aboriginal art galleries are outstanding. William and James streets are the main bar-and-restaurant arteries. Lake Street is the Asian food corridor — Chinese, Vietnamese, Japanese, and Korean eateries compete side by side. Northbridge Piazza has a large outdoor screen and hosts occasional events. Lane art is scattered throughout — wander and discover." },
        { heading: "Best times to visit", body: "Galleries open at 10 am and make a good morning start. Restaurants pick up from lunch onward, peaking at dinner. Friday and Saturday nights are the liveliest for bars and live music. Perth's mild climate makes any time of year pleasant, though March to May and September to November are optimal." },
        { heading: "Practical tips", body: "It is an easy walk from Perth station. Almost all venues accept cards. Main streets are safe at night, but quieter back alleys warrant caution. Restrooms are in the Cultural Centre and restaurants. An eSIM is useful for restaurant bookings and checking street-art map guides." },
      ],
      [
        { q: "Is Northbridge safe?", a: "Daytime is very safe. Main streets at night are busy and well-lit, but be cautious in quieter back alleys." },
        { q: "Are the galleries free?", a: "Yes, both the Art Gallery and the WA Museum are free to enter." },
        { q: "How much time should I budget?", a: "Three to four hours for galleries and a meal. An evening adds bar hopping and live music." },
        { q: "What food is recommended?", a: "Asian cuisine on Lake Street is the highlight — Chinese and Vietnamese noodles are particularly popular." },
      ],
    ),
  },

  // ─── 19. Oaxaca — Centro Histórico ──────────────────────────────
  "oaxaca-centro-historico-walk": {
    ja: ja(MX_JA_CTA,
      "オアハカ歴史地区のアートとメスカル",
      "オアハカの歴史地区を歩き、先住民アート、メスカルバー、市場グルメを楽しむルートガイド。",
      img("File:Oaxaca Centro Historico.jpg", 1280, 854, "オアハカ歴史地区", "カラフルな植民地時代の建物"),
      [
        img("File:Santo Domingo Church Oaxaca.jpg", 1280, 960, "サントドミンゴ教会", "バロック様式の壮麗な教会"),
        img("File:Mercado Benito Juarez Oaxaca.jpg", 1280, 854, "ベニートフアレス市場", "地元の食材と料理が並ぶ市場"),
        img("File:Andador Turistico Oaxaca.jpg", 1280, 854, "歩行者天国", "サントドミンゴへ続く歩行者通り"),
        img("File:Museo de las Culturas de Oaxaca.jpg", 1280, 854, "オアハカ文化博物館", "モンテアルバンの出土品を展示"),
        img("File:Mezcal bar Oaxaca.jpg", 1280, 854, "メスカルバー", "オアハカ名物のメスカルを試飲"),
        img("File:Oaxaca street art mural.jpg", 1280, 854, "ストリートアート", "壁面を彩る先住民モチーフの壁画"),
      ],
      OAXACA_X,
      [
        { heading: "このルートの特徴", body: "オアハカの歴史地区はユネスコ世界遺産に登録された植民地時代の街並みが残るエリアで、先住民サポテカ文化とスペイン植民地文化が融合した独特の雰囲気が漂います。サントドミンゴ教会のバロック建築、伝統市場の食文化、メスカルバーが徒歩圏内に集まり、メキシコで最も魅力的な街歩きスポットの一つです。街のいたるところにストリートアートやギャラリーがあり、アートの街としても注目されています。" },
        { heading: "アクセスと起点", body: "オアハカ空港からタクシーで約20分。歴史地区のソカロ（中央広場）を起点に、アンダドール・ツリスティコ（歩行者天国の通り）を北に歩いてサントドミンゴ教会に向かい、周辺のギャラリーを巡ってからベニートフアレス市場に戻るルートがおすすめです。" },
        { heading: "主要スポット", body: "サントドミンゴ教会は外観も内装も圧巻のバロック建築で、隣接する文化博物館にはモンテアルバン遺跡の出土品が展示されています。ベニートフアレス市場ではトラユーダ（オアハカ風の巨大トルティーヤ）やチャプリネス（バッタの塩炒め）などの地元料理が味わえます。歴史地区のメスカルバーでは、数十種類のメスカルをテイスティングできます。ストリートアートは特にハラトラコ地区への道沿いに多く見られます。" },
        { heading: "時間帯とおすすめ季節", body: "午前中にサントドミンゴ教会と博物館を見学し、昼食を市場で。午後はカフェとギャラリー巡り、夕方からメスカルバーへ向かうのが理想的な1日です。10〜4月の乾季が最も歩きやすく、10月末〜11月初旬の死者の日は街全体が祭りの装飾で彩られます。" },
        { heading: "実用情報", body: "歴史地区はコンパクトで徒歩で十分回れます。多くのレストランやバーがカード対応ですが、市場は現金がメイン。トイレはレストランや博物館で利用可能。日差しが強いので帽子と日焼け止めを忘れずに。eSIMがあればメスカルバーの場所やギャラリーの開館情報をリアルタイムで確認できます。" },
      ],
      [
        { q: "オアハカの治安は?", a: "歴史地区は治安が良く、夜もソカロ周辺は人通りがあります。ただし暗い裏通りは避けましょう。" },
        { q: "メスカルの試飲は無料?", a: "多くのメスカルバーで無料のテイスティングが提供されます。気に入ったボトルを購入することもできます。" },
        { q: "所要時間の目安は?", a: "教会・市場・カフェで半日。メスカルバーも含めると1日楽しめます。" },
        { q: "死者の日はいつ?", a: "10月31日〜11月2日がメインです。特に11月1〜2日は墓地やパレードで盛大に祝われます。" },
      ],
    ),
    en: en(MX_EN_CTA,
      "Oaxaca Centro Histórico Art and Mezcal Walk",
      "Walk Oaxaca's historic centre — baroque churches, indigenous markets, mezcal tastings, and vibrant street art in a UNESCO World Heritage city.",
      img("File:Oaxaca Centro Historico.jpg", 1280, 854, "Oaxaca Centro Histórico", "Colourful colonial buildings"),
      [
        img("File:Santo Domingo Church Oaxaca.jpg", 1280, 960, "Santo Domingo Church", "Baroque masterpiece"),
        img("File:Mercado Benito Juarez Oaxaca.jpg", 1280, 854, "Mercado Benito Juárez", "Local produce and street food"),
        img("File:Andador Turistico Oaxaca.jpg", 1280, 854, "Pedestrian corridor", "Car-free street to Santo Domingo"),
        img("File:Museo de las Culturas de Oaxaca.jpg", 1280, 854, "Museum of Oaxacan Cultures", "Monte Albán artefacts"),
        img("File:Mezcal bar Oaxaca.jpg", 1280, 854, "Mezcal bar", "Tasting Oaxaca's signature spirit"),
        img("File:Oaxaca street art mural.jpg", 1280, 854, "Street art", "Indigenous-motif murals"),
      ],
      OAXACA_X,
      [
        { heading: "What makes this route special", body: "Oaxaca's centro histórico is a UNESCO World Heritage Site where Zapotec indigenous culture and Spanish colonial architecture meet in a city that is also Mexico's gastronomic and mezcal capital. Santo Domingo Church is one of the most ornate baroque structures in the Americas, the traditional markets overflow with ingredients and flavours found nowhere else, and mezcal bars let you taste dozens of small-batch spirits in a single evening. Street art and galleries add another creative layer." },
        { heading: "Getting there and starting point", body: "A taxi from Oaxaca airport takes about twenty minutes. Start at the Zócalo (central square), walk north along the pedestrian-only Andador Turístico to Santo Domingo Church, explore the surrounding galleries, and then loop back south to Mercado Benito Juárez." },
        { heading: "Key stops", body: "Santo Domingo Church is staggering inside and out — the barrel-vaulted ceiling is covered in gold leaf and polychrome stucco. The adjacent Museum of Oaxacan Cultures displays treasures from Monte Albán. Mercado Benito Juárez is the place for tlayudas (giant Oaxacan tortillas) and chapulines (toasted grasshoppers). Mezcal bars in the centro let you taste artisanal varieties from across the state. Street art is richest on the lanes leading toward Jalatlaco." },
        { heading: "Best times to visit", body: "Mornings are ideal for the church and museum. Lunch at the market around midday. Afternoons for cafés and galleries, evenings for mezcal. The dry season from October to April is most comfortable. Late October to early November brings Día de los Muertos — the city is draped in marigolds and altars." },
        { heading: "Practical tips", body: "The centro is compact and walkable. Restaurants and bars mostly accept cards, but the market runs on cash. Restrooms are in restaurants and the museum. The sun is strong — bring a hat and sunscreen. An eSIM helps you find mezcal bars and check gallery hours in real time." },
      ],
      [
        { q: "Is Oaxaca safe?", a: "The centro histórico is safe with good foot traffic even at night around the Zócalo. Avoid dark side streets." },
        { q: "Are mezcal tastings free?", a: "Many bars offer free tastings. You can buy bottles on the spot if you find one you like." },
        { q: "How much time should I budget?", a: "Half a day for the church, market, and cafés. A full day if you add mezcal bars and galleries." },
        { q: "When is Día de los Muertos?", a: "October 31 to November 2, with November 1 and 2 being the main celebration days." },
      ],
    ),
  },

  // ─── 20. Oaxaca — Jalatlaco ─────────────────────────────────────
  "oaxaca-jalatlaco-walk": {
    ja: ja(MX_JA_CTA,
      "ハラトラコのカラフルな路地散策",
      "オアハカのハラトラコ地区を歩き、カラフルな路地と地元カフェ、工芸品ショップを巡るルートガイド。",
      img("File:Jalatlaco Oaxaca colorful street.jpg", 1280, 854, "ハラトラコの路地", "パステルカラーの壁が続く路地"),
      [
        img("File:Jalatlaco Oaxaca church.jpg", 1280, 854, "ハラトラコの教会", "小さな地区の可愛らしい教会"),
        img("File:Jalatlaco Oaxaca cafe.jpg", 1280, 854, "路地裏カフェ", "ローカルなカフェでコーヒーを"),
        img("File:Jalatlaco Oaxaca mural.jpg", 1280, 854, "壁画アート", "建物全体を覆うカラフルな壁画"),
        img("File:Jalatlaco Oaxaca paper decorations.jpg", 1280, 854, "ペーパーデコレーション", "路地に飾られた切り紙アート"),
        img("File:Jalatlaco Oaxaca artisan shop.jpg", 1280, 854, "工芸品ショップ", "地元アーティストの作品を販売"),
      ],
      OAXACA_X,
      [
        { heading: "このルートの特徴", body: "ハラトラコはオアハカ歴史地区のすぐ東に位置する小さな地区で、パステルカラーに塗られた壁面と路地に吊るされた色とりどりの切り紙装飾（パペルピカド）がフォトジェニックな景観を作り出しています。かつては職人の街として知られ、現在もアーティストやカフェオーナーが集まるクリエイティブなコミュニティです。観光の中心地から外れているため静かで、のんびりとした散策が楽しめます。" },
        { heading: "アクセスと起点", body: "オアハカのソカロから徒歩15分、またはタクシーで5分。ハラトラコの小さな教会がある広場を起点に、周辺の路地を自由に散策するのがベストです。迷路のような路地ですが、地区が小さいので迷う心配はありません。" },
        { heading: "主要スポット", body: "地区のメイン広場にある教会はこぢんまりとしていますが、地域の中心です。周囲の路地はどこを切り取っても絵になるカラフルさで、壁画アートも豊富。路地裏にはローカルなカフェや工芸品ショップが隠れており、オアハカのブラックポタリー（黒陶器）やテキスタイルを扱う店もあります。パペルピカドが路地全体に飾られた通りは特にフォトジェニックです。" },
        { heading: "時間帯とおすすめ季節", body: "午前中の光が柔らかい時間帯が写真撮影に最適です。カフェは9時頃から開き始めます。10〜4月の乾季が最も歩きやすく、死者の日（11月初旬）にはハラトラコも装飾が増えて特に美しくなります。夏の午後はスコールが来ることがあるので午前中がベターです。" },
        { heading: "実用情報", body: "地区全体を回っても1時間ほどの広さです。カフェはカード対応の店とそうでない店が半々なので、現金を持っておくと安心。トイレはカフェで利用可能。路地の石畳は凸凹があるので歩きやすい靴で。eSIMがあれば路地のストリートアートの情報検索やSNS投稿に便利です。" },
      ],
      [
        { q: "ハラトラコの治安は?", a: "日中は安全で静かな住宅街です。夜間も地区内は落ち着いていますが、歴史地区への帰り道は大通りを使いましょう。" },
        { q: "所要時間の目安は?", a: "カフェ休憩を含めて1〜2時間。歴史地区と組み合わせると半日です。" },
        { q: "おすすめの時間帯は?", a: "午前中の光が最も美しく、写真撮影に最適です。" },
        { q: "歴史地区からの行き方は?", a: "ソカロから東に歩いて15分。タクシーなら5分程度です。" },
      ],
    ),
    en: en(MX_EN_CTA,
      "Jalatlaco Colourful Alley Walk in Oaxaca",
      "Wander Oaxaca's Jalatlaco — pastel-painted walls, papel picado banners, hidden cafés, and artisan shops in a quiet creative quarter.",
      img("File:Jalatlaco Oaxaca colorful street.jpg", 1280, 854, "Jalatlaco alley", "Pastel-coloured walls and decorations"),
      [
        img("File:Jalatlaco Oaxaca church.jpg", 1280, 854, "Jalatlaco church", "The neighbourhood's small church"),
        img("File:Jalatlaco Oaxaca cafe.jpg", 1280, 854, "Hidden café", "Local coffee in a quiet lane"),
        img("File:Jalatlaco Oaxaca mural.jpg", 1280, 854, "Mural art", "Building-sized colourful mural"),
        img("File:Jalatlaco Oaxaca paper decorations.jpg", 1280, 854, "Papel picado", "Cut-paper banners strung across the lane"),
        img("File:Jalatlaco Oaxaca artisan shop.jpg", 1280, 854, "Artisan shop", "Local crafts and black pottery"),
      ],
      OAXACA_X,
      [
        { heading: "What makes this route special", body: "Jalatlaco is a tiny residential quarter on the eastern edge of Oaxaca's centro histórico. Its narrow lanes are painted in every pastel shade imaginable and strung with papel picado — traditional cut-paper banners — that flutter overhead year round. Once an artisan neighbourhood, it now attracts a creative community of café owners, muralists, and craft-shop proprietors. Because it sits just outside the main tourist circuit, the pace is slower and the streets far quieter." },
        { heading: "Getting there and starting point", body: "Walk fifteen minutes east from the Zócalo, or take a five-minute taxi ride. The small church plaza at the centre of Jalatlaco is the natural starting point. From there, just wander the surrounding alleys — the district is small enough that you cannot really get lost." },
        { heading: "Key stops", body: "The neighbourhood church is a modest but charming landmark. Every lane around it is a photo opportunity — pastel walls, murals, and draped papel picado create an almost theatrical backdrop. Hidden cafés serve excellent Oaxacan coffee, and small shops sell black pottery, textiles, and other regional crafts. The lane with the densest paper-banner canopy is especially photogenic." },
        { heading: "Best times to visit", body: "Morning light is softest and best for photography. Cafés begin opening around 9 am. The dry season from October to April is the most comfortable for walking. During Día de los Muertos in early November, Jalatlaco's decorations multiply and the neighbourhood is at its most beautiful. Summer afternoons can bring sudden rain — go in the morning." },
        { heading: "Practical tips", body: "The entire district takes about an hour to walk. Some cafés accept cards, but others are cash only — bring pesos. Restrooms are in cafés. The cobblestone alleys are uneven, so wear sturdy shoes. An eSIM is useful for looking up street-art locations and posting to social media." },
      ],
      [
        { q: "Is Jalatlaco safe?", a: "Safe and quiet during the day. At night the area is calm, but use main roads when walking back to the centro." },
        { q: "How much time should I budget?", a: "One to two hours with a café stop. Half a day combined with the centro histórico." },
        { q: "Best time for photos?", a: "Morning light gives the softest colours on the pastel walls." },
        { q: "How do I get there from the centro?", a: "Walk east from the Zócalo for about fifteen minutes, or take a short taxi ride." },
      ],
    ),
  },
};

export const AMERICAS_OCEANIA_3_GUIDE_SLUGS = Object.keys(AMERICAS_OCEANIA_3_GUIDE_CONTENT);
