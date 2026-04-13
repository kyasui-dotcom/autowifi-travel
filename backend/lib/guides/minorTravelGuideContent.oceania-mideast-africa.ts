import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Oceania, Middle East & Africa walking-guide articles.
// 15 neighbourhood-level routes.

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

const UAE_JA_CTA = {
  ctaTitle: "UAE旅行の通信をもっと楽に",
  ctaButton: "UAEのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const UAE_EN_CTA = {
  ctaTitle: "Stay connected in UAE",
  ctaButton: "View UAE eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const IL_JA_CTA = {
  ctaTitle: "イスラエル旅行の通信をもっと楽に",
  ctaButton: "イスラエルのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const IL_EN_CTA = {
  ctaTitle: "Stay connected in Israel",
  ctaButton: "View Israel eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const QA_JA_CTA = {
  ctaTitle: "カタール旅行の通信をもっと楽に",
  ctaButton: "カタールのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const QA_EN_CTA = {
  ctaTitle: "Stay connected in Qatar",
  ctaButton: "View Qatar eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const KE_JA_CTA = {
  ctaTitle: "ケニア旅行の通信をもっと楽に",
  ctaButton: "ケニアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const KE_EN_CTA = {
  ctaTitle: "Stay connected in Kenya",
  ctaButton: "View Kenya eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const EG_JA_CTA = {
  ctaTitle: "エジプト旅行の通信をもっと楽に",
  ctaButton: "エジプトのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const EG_EN_CTA = {
  ctaTitle: "Stay connected in Egypt",
  ctaButton: "View Egypt eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Helper builders ──────────────────────────────────────────────

function ja(
  cta: typeof AU_JA_CTA,
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
  cta: typeof AU_EN_CTA,
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

const SYDNEY_X: GuideXEmbed[] = [
  { url: "https://x.com/sydney", label: "@sydney" },
  { url: "https://x.com/sydneylocal", label: "@sydneylocal" },
];
const MELBOURNE_X: GuideXEmbed[] = [
  { url: "https://x.com/visitmelbourne", label: "@visitmelbourne" },
  { url: "https://x.com/Melbourne", label: "@Melbourne" },
];
const CAPE_TOWN_X: GuideXEmbed[] = [
  { url: "https://x.com/CapeTownTourism", label: "@CapeTownTourism" },
  { url: "https://x.com/lovecapetown", label: "@lovecapetown" },
];
const DUBAI_X: GuideXEmbed[] = [
  { url: "https://x.com/visitdubai", label: "@visitdubai" },
  { url: "https://x.com/DubaiTourism", label: "@DubaiTourism" },
];
const TEL_AVIV_X: GuideXEmbed[] = [
  { url: "https://x.com/TelAviv", label: "@TelAviv" },
  { url: "https://x.com/Israel", label: "@Israel" },
];
const DOHA_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitQatar", label: "@VisitQatar" },
  { url: "https://x.com/QatarTourism", label: "@QatarTourism" },
];
const NAIROBI_X: GuideXEmbed[] = [
  { url: "https://x.com/MagicalKenya", label: "@MagicalKenya" },
  { url: "https://x.com/NairobiCity", label: "@NairobiCity" },
];
const CAIRO_X: GuideXEmbed[] = [
  { url: "https://x.com/EgyptTourism", label: "@EgyptTourism" },
  { url: "https://x.com/ExperienceEgypt", label: "@ExperienceEgypt" },
];

// ═══════════════════════════════════════════════════════════════════
// Content
// ═══════════════════════════════════════════════════════════════════

export const OCEANIA_MIDEAST_AFRICA_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ─── 1. Sydney — The Rocks ──────────────────────────────────────
  "sydney-the-rocks-walk": {
    ja: ja(AU_JA_CTA,
      "ザ・ロックスの歴史的港町散策",
      "シドニー発祥の地ザ・ロックスを歩き、砂岩の建物や港の景観を楽しむ街歩きルートガイド。",
      img("File:The Rocks Sydney.jpg", 1280, 854, "ザ・ロックス", "砂岩造りの歴史的建物が並ぶシドニー最古の地区"),
      [
        img("File:Sydney Harbour Bridge from The Rocks.jpg", 1280, 854, "ハーバーブリッジ", "ザ・ロックスから望むハーバーブリッジ"),
        img("File:Cadmans Cottage Sydney.jpg", 1280, 854, "カドマンズコテージ", "1816年建造のシドニー最古の民間建築"),
        img("File:Susannah Place Museum.jpg", 1280, 854, "スザンナプレイス博物館", "19世紀の労働者住宅を保存した博物館"),
        img("File:Dawes Point Park Sydney.jpg", 1280, 854, "ドーズポイント公園", "ハーバーブリッジの真下に広がる芝生公園"),
        img("File:The Rocks Markets Sydney.jpg", 1280, 854, "ザ・ロックスマーケット", "週末に開かれるアート＆クラフトマーケット"),
      ],
      SYDNEY_X,
      [
        { heading: "このルートの特徴", body: "ザ・ロックスは1788年にイギリス第一艦隊が上陸した場所で、シドニーの歴史がそのまま凝縮されたエリアです。砂岩を切り出して造られた倉庫や住宅が残り、石畳の路地を歩くだけで植民地時代にタイムスリップしたような感覚を味わえます。現在はギャラリー、パブ、週末マーケットが集まる観光拠点ですが、路地裏に一歩入ると静かな歴史散策が楽しめます。" },
        { heading: "アクセスと起点", body: "サーキュラーキー駅から徒歩5分。フェリーターミナルからも直結しています。起点はジョージストリート北端のザ・ロックス・ディスカバリー・ミュージアムが便利です。ここでエリアの歴史を予習してから散策を始めると、建物の背景がより深く理解できます。オペラハウスとも徒歩圏なので、午前にザ・ロックス、午後にオペラハウスという組み合わせが人気です。" },
        { heading: "主要スポット", body: "カドマンズコテージはシドニー現存最古の民間建築で、1816年に建てられました。スザンナプレイス博物館では19世紀の労働者階級の暮らしを再現しています。ナースウォークは細い路地ですが、かつて病院があった名残の地名です。ドーズポイント公園からはハーバーブリッジを真下から見上げる迫力のアングルが楽しめます。週末のザ・ロックスマーケットはハンドメイドジュエリーやアート作品が並びます。" },
        { heading: "時間帯とタイミング", body: "平日の午前中は観光客が少なく、ゆっくり写真撮影ができます。週末はマーケットが開催されるため賑やかですが、それも含めて楽しむのがおすすめ。パブでのランチは12時前に入ると席を確保しやすいです。夕方はハーバーブリッジのライトアップが美しく、ドーズポイント公園からの夜景撮影も人気があります。" },
        { heading: "実用情報", body: "エリアはコンパクトで徒歩30分ほどで一周できます。坂道や階段が多いので歩きやすい靴がおすすめ。トイレはサーキュラーキー駅構内とマーケット周辺に公衆トイレがあります。カフェやパブでは無料Wi-Fiが使えますが、港沿いを歩く際はeSIMがあるとマップアプリが途切れず便利です。日差しが強いので帽子と日焼け止めを忘れずに。" },
      ],
      [
        { q: "ザ・ロックスの所要時間は?", a: "1.5〜2時間で主要スポットを回れます。マーケットやパブでのランチを含めると半日が目安です。" },
        { q: "週末マーケットは何時から?", a: "土日の10時〜17時に開催されます。雨天でもテント付きで営業しています。" },
        { q: "ベビーカーでも回れる?", a: "メインの通りは平坦ですが、路地や階段は狭い箇所があります。ベビーカーはジョージストリート沿いを中心に回るのがおすすめです。" },
        { q: "おすすめの食事は?", a: "ハーバーブリッジを眺めながら食事できるパブが数軒あります。オーストラリアンミートパイやフィッシュ＆チップスが人気です。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "The Rocks Historic Harbour Walk in Sydney",
      "Walk through Sydney's oldest neighbourhood — sandstone laneways, convict-era buildings, and harbour views at every turn.",
      img("File:The Rocks Sydney.jpg", 1280, 854, "The Rocks", "Sydney's oldest district with sandstone heritage buildings"),
      [
        img("File:Sydney Harbour Bridge from The Rocks.jpg", 1280, 854, "Harbour Bridge", "View of the bridge from The Rocks"),
        img("File:Cadmans Cottage Sydney.jpg", 1280, 854, "Cadman's Cottage", "Sydney's oldest surviving residential building, built 1816"),
        img("File:Susannah Place Museum.jpg", 1280, 854, "Susannah Place Museum", "Preserved terrace of 1840s workers' houses"),
        img("File:Dawes Point Park Sydney.jpg", 1280, 854, "Dawes Point Park", "Grassy park directly under the Harbour Bridge"),
        img("File:The Rocks Markets Sydney.jpg", 1280, 854, "The Rocks Markets", "Weekend arts and crafts market"),
      ],
      SYDNEY_X,
      [
        { heading: "What makes this route special", body: "The Rocks is where Sydney began. The First Fleet landed here in 1788, and the sandstone warehouses and workers' cottages from the colonial era still line narrow laneways. Today those buildings house galleries, pubs, and artisan shops, but the heritage fabric is meticulously preserved. You can trace the neighbourhood's evolution from convict settlement to plague-era quarantine zone to modern cultural precinct, all within a few walkable blocks." },
        { heading: "Getting there and starting point", body: "Circular Quay station is a five-minute walk away and the ferry terminal is directly adjacent. Start at The Rocks Discovery Museum on Kendall Lane — free entry and a useful primer on the area's layered history. From there, head north along George Street and loop back via the waterfront. The Opera House is within easy walking distance, so you can pair a morning in The Rocks with an afternoon at Bennelong Point." },
        { heading: "Key stops", body: "Cadman's Cottage, built in 1816 for the government coxswain, is Sydney's oldest surviving private building. Susannah Place Museum is a terrace of four houses frozen in various decades from the 1840s to the 1990s — guided tours bring the rooms to life. Nurses Walk is a narrow laneway named after the colonial hospital that once stood here. Dawes Point Park offers a dramatic angle on the Harbour Bridge from directly below. On weekends, The Rocks Markets fill George Street with handmade jewellery, art prints, and local food stalls." },
        { heading: "Best times to visit", body: "Weekday mornings are quietest for photography and museum visits. Weekends bring the markets and a lively buzz — embrace the crowd or arrive early. Pubs fill up for lunch around noon, so beat the rush. Late afternoon light is beautiful on the sandstone facades, and staying into evening rewards you with the Harbour Bridge lit up against the sky." },
        { heading: "Practical tips", body: "The area is compact — a full loop takes about 30 minutes without stops. Wear comfortable shoes for cobblestones and stairs. Public restrooms are at Circular Quay station and near the markets. Cafés and pubs offer free Wi-Fi, but an eSIM keeps your maps working along the waterfront. Sun protection is essential year-round in Sydney." },
      ],
      [
        { q: "How long does the walk take?", a: "One and a half to two hours for the main sights. Add a half day if you include the markets and a pub lunch." },
        { q: "When are the weekend markets?", a: "Saturday and Sunday, 10 am to 5 pm. They run rain or shine under covered stalls." },
        { q: "Is it stroller-friendly?", a: "Main streets are flat, but some laneways have steps. Stick to George Street for the smoothest route." },
        { q: "Where should I eat?", a: "Several pubs have outdoor terraces with bridge views. Try an Australian meat pie or fish and chips." },
      ],
    ),
  },

  // ─── 2. Sydney — Bondi to Coogee ──────────────────────────────
  "sydney-bondi-to-coogee-walk": {
    ja: ja(AU_JA_CTA,
      "ボンダイ〜クージーの海岸遊歩道",
      "シドニーを代表する海岸沿いのウォーキングコース。断崖絶壁と白砂ビーチが連なる6kmの絶景ルート。",
      img("File:Bondi to Coogee coastal walk.jpg", 1280, 854, "ボンダイ〜クージー", "海岸線に沿って続く遊歩道"),
      [
        img("File:Bondi Beach Sydney.jpg", 1280, 854, "ボンダイビーチ", "シドニーで最も有名なサーフビーチ"),
        img("File:Tamarama Beach Sydney.jpg", 1280, 854, "タマラマビーチ", "地元で愛される小さな入り江のビーチ"),
        img("File:Bronte Beach Sydney.jpg", 1280, 854, "ブロンテビーチ", "家族連れに人気の穏やかなビーチ"),
        img("File:Clovelly Beach Sydney.jpg", 1280, 854, "クロベリービーチ", "シュノーケリングに最適な細長い入り江"),
        img("File:Coogee Beach Sydney.jpg", 1280, 854, "クージービーチ", "遊歩道の終点にある開放的なビーチ"),
      ],
      SYDNEY_X,
      [
        { heading: "このルートの特徴", body: "ボンダイからクージーまでの海岸遊歩道は、シドニーで最も人気のあるウォーキングコースです。全長約6km、所要時間は2〜3時間。断崖絶壁の上を歩くセクションと、白砂のビーチに降りるセクションが交互に現れ、景色に飽きることがありません。途中にはタマラマ、ブロンテ、クロベリーと個性の異なるビーチが並び、どこで泳いでも構いません。冬場でも気候が温暖なので年中歩けます。" },
        { heading: "アクセスと起点", body: "ボンダイビーチへはシティからバス333番で約40分。ボンダイジャンクション駅からバス380番に乗り換えても行けます。遊歩道はボンダイビーチ南端のアイスバーグスプール横からスタート。クージー側から逆方向に歩いてもOKですが、ボンダイ発が人気なのは午前の太陽が海側に当たり写真映えするためです。" },
        { heading: "主要スポット", body: "ボンダイ・アイスバーグスはオーシャンプールで有名。タマラマビーチは小さいですがサーファーに人気。ブロンテビーチにはBBQ施設と芝生の公園があり、ピクニックに最適です。ブロンテからクロベリーにかけてのセクションは最も断崖が高く、ホエールウォッチングのスポットでもあります。クロベリーの細長い入り江は波が穏やかでシュノーケリング向き。終点のクージービーチには複数のカフェとパブがあります。" },
        { heading: "時間帯とタイミング", body: "朝7〜8時のスタートがおすすめ。日差しが穏やかで、特に夏場は日中の紫外線が強烈です。平日は空いていて快適。週末の午前中は地元ランナーで賑わいます。冬（6〜8月）は涼しく歩きやすいですが、風が強い日もあるので上着を持参してください。5〜11月はザトウクジラの回遊シーズンで、遊歩道から肉眼で見えることがあります。" },
        { heading: "実用情報", body: "遊歩道は整備されていますが、一部に急な階段や岩場があります。スニーカーかトレイルシューズがおすすめ。各ビーチにトイレとシャワーがあります。日焼け止め・帽子・水は必須です。途中のカフェでコーヒー休憩も取れます。eSIMがあれば、途中のビーチの混雑状況や帰りのバス時刻をリアルタイムで確認できます。" },
      ],
      [
        { q: "全行程の所要時間は?", a: "写真撮影をしながらゆっくり歩いて2〜3時間。泳いだりカフェに立ち寄ると半日以上かかります。" },
        { q: "泳ぐ場所はある?", a: "ボンダイ、タマラマ、ブロンテ、クロベリー、クージーの全ビーチで泳げます。ボンダイとブロンテにはオーシャンプールもあります。" },
        { q: "雨の日でも歩ける?", a: "小雨なら問題ありませんが、岩場が滑りやすくなるので注意。大雨・強風時はルートが閉鎖されることがあります。" },
        { q: "帰りの交通手段は?", a: "クージービーチからバス370番でシティへ直行できます。所要約30分です。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Bondi to Coogee Coastal Walk in Sydney",
      "Sydney's most iconic coastal trail — six kilometres of cliff-top paths, hidden coves, and five beaches from Bondi to Coogee.",
      img("File:Bondi to Coogee coastal walk.jpg", 1280, 854, "Bondi to Coogee", "The coastal path hugging the cliff edge"),
      [
        img("File:Bondi Beach Sydney.jpg", 1280, 854, "Bondi Beach", "Sydney's most famous surf beach"),
        img("File:Tamarama Beach Sydney.jpg", 1280, 854, "Tamarama Beach", "A tiny cove loved by locals"),
        img("File:Bronte Beach Sydney.jpg", 1280, 854, "Bronte Beach", "Family-friendly beach with grassy picnic areas"),
        img("File:Clovelly Beach Sydney.jpg", 1280, 854, "Clovelly Beach", "A narrow inlet perfect for snorkelling"),
        img("File:Coogee Beach Sydney.jpg", 1280, 854, "Coogee Beach", "The walk's endpoint — wide sand and beachside pubs"),
      ],
      SYDNEY_X,
      [
        { heading: "What makes this route special", body: "The Bondi to Coogee walk is Sydney's most popular coastal trail — six kilometres of cliff-top paths that connect five distinct beaches. The scenery shifts constantly: sheer sandstone cliffs, rock shelves with crashing waves, secluded coves, ocean pools, and wide sandy bays. It is beautiful year-round thanks to Sydney's mild climate, and every section offers a chance to stop and swim. Unlike a bush walk, you are never far from a café, a restroom, or a bus stop." },
        { heading: "Getting there and starting point", body: "Bus 333 from the city reaches Bondi Beach in about 40 minutes. You can also take the train to Bondi Junction and transfer to bus 380. The trail starts at the southern end of Bondi Beach beside the Icebergs ocean pool. Walking south means the morning sun lights up the ocean side — better for photos. You can walk it in reverse from Coogee, but Bondi to Coogee is the classic direction." },
        { heading: "Key stops", body: "Bondi Icebergs is an iconic ocean pool carved into the rock shelf. Tamarama is a pocket beach popular with surfers. Bronte has barbecue facilities and a large grassy park — ideal for a picnic midway. The cliff section between Bronte and Clovelly is the highest and a prime whale-watching vantage point. Clovelly's narrow inlet is calm and great for snorkelling. Coogee Beach at the end has multiple cafés and a pub right on the sand." },
        { heading: "Best times to visit", body: "Start between seven and eight in the morning to avoid the strongest sun, especially in summer when UV levels are extreme. Weekdays are quieter. Weekend mornings draw local runners and exercise groups. Winter (June to August) is cool and very pleasant for walking, though bring a jacket for windy days. Humpback whales migrate past between May and November — binoculars are worth packing." },
        { heading: "Practical tips", body: "The path is well maintained but includes steep stairs and rocky sections. Wear trainers or trail shoes, not flip-flops. Every beach has restrooms and showers. Sunscreen, a hat, and water are non-negotiable. Cafés at Bronte and Coogee are good coffee-stop options. An eSIM is handy for checking live beach conditions and return bus times along the way." },
      ],
      [
        { q: "How long does the full walk take?", a: "Two to three hours at a relaxed pace with photo stops. Add a half day if you swim and eat along the way." },
        { q: "Can I swim during the walk?", a: "Yes — all five beaches are swimmable. Bondi and Bronte also have ocean pools." },
        { q: "Is it safe in the rain?", a: "Light rain is fine, but rocks get slippery. The path may be closed in storms or high winds." },
        { q: "How do I get back from Coogee?", a: "Bus 370 runs from Coogee Beach to the city centre in about 30 minutes." },
      ],
    ),
  },

  // ─── 3. Melbourne — Collingwood ────────────────────────────────
  "melbourne-collingwood-walk": {
    ja: ja(AU_JA_CTA,
      "コリングウッドのブルワリーとカフェ",
      "メルボルンのクラフトビール聖地コリングウッドを歩き、ブルワリーとサードウェーブカフェを巡るルート。",
      img("File:Smith Street Collingwood Melbourne.jpg", 1280, 854, "スミスストリート", "ストリートアートとカフェが並ぶコリングウッドのメインストリート"),
      [
        img("File:Collingwood Yards Melbourne.jpg", 1280, 854, "コリングウッドヤーズ", "旧技術学校を転用したアート複合施設"),
        img("File:Easey Street Collingwood.jpg", 1280, 854, "イージーストリート", "屋上に電車が載ったユニークなバーガー店"),
        img("File:Abbotsford Convent Melbourne.jpg", 1280, 854, "アボッツフォードコンベント", "修道院を改装したアートとカフェの複合施設"),
        img("File:Victoria Street Richmond Melbourne.jpg", 1280, 854, "ビクトリアストリート", "ベトナム料理店が連なるリトルサイゴン"),
        img("File:Yarra River Abbotsford.jpg", 1280, 854, "ヤラ川", "アボッツフォード付近のヤラ川沿い遊歩道"),
      ],
      MELBOURNE_X,
      [
        { heading: "このルートの特徴", body: "コリングウッドはメルボルンCBDの北東に位置し、かつての工業地帯がクラフトビールとコーヒーの発信拠点に生まれ変わったエリアです。スミスストリートを軸に、独立系ブルワリー、ロースタリー、ストリートアートが密集しています。隣接するフィッツロイやアボッツフォードと合わせて歩くと、メルボルンのインディーカルチャーを一日で満喫できます。" },
        { heading: "アクセスと起点", body: "シティからトラム86番でスミスストリートへ直行、約15分。コリングウッド駅からも徒歩5分です。起点はスミスストリートとジョンストンストリートの交差点がわかりやすく、ここから南下しながらブルワリーとカフェを回ります。" },
        { heading: "主要スポット", body: "コリングウッドヤーズは旧技術学校をリノベーションしたアート複合施設で、ギャラリーやワークショップスペースがあります。イージーストリートのバーガーショップは屋上に廃電車が載っていることで有名。アボッツフォードコンベントは修道院を改装した文化施設で、カフェ、ギャラリー、ファーマーズマーケットが開かれます。ビクトリアストリートはリトルサイゴンと呼ばれ、フォーやバインミーの名店が並びます。" },
        { heading: "時間帯とタイミング", body: "カフェは朝7時から開き始めるので、朝食からスタートするのがおすすめ。ブルワリーのタップルームは午後から営業が多いです。土曜はアボッツフォードコンベントでファーマーズマーケットが開催されます。夜はスミスストリートのバーが賑わい、ライブミュージックも楽しめます。" },
        { heading: "実用情報", body: "エリアは平坦で歩きやすいです。スミスストリート沿いにトイレ利用可能なカフェが多数。クレジットカードが使えない小さなバーや屋台もあるので現金も少し持参を。メルボルンの天気は変わりやすいので折りたたみ傘があると安心。eSIMがあればブルワリーの営業時間やレビューをその場で確認できます。" },
      ],
      [
        { q: "コリングウッドの治安は?", a: "日中は安全です。夜間もスミスストリート沿いは人通りがありますが、裏通りは暗いので大通りを歩きましょう。" },
        { q: "おすすめのブルワリーは?", a: "スミスストリート周辺に複数のクラフトブルワリーがあります。タップルームでフライトセット（少量飲み比べ）を注文するのがおすすめです。" },
        { q: "子連れでも楽しめる?", a: "カフェやアボッツフォードコンベントは子連れフレンドリー。ブルワリーは夕方以降は大人向けの雰囲気になります。" },
        { q: "所要時間は?", a: "カフェ2〜3軒とブルワリー1軒で3〜4時間。アボッツフォードまで足を延ばすと半日です。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Collingwood Brewery and Café Walk in Melbourne",
      "Explore Melbourne's craft-beer heartland — independent breweries, third-wave roasters, and street art along Smith Street.",
      img("File:Smith Street Collingwood Melbourne.jpg", 1280, 854, "Smith Street", "Street art and cafés on Collingwood's main strip"),
      [
        img("File:Collingwood Yards Melbourne.jpg", 1280, 854, "Collingwood Yards", "Arts complex in a former technical school"),
        img("File:Easey Street Collingwood.jpg", 1280, 854, "Easey Street", "Burger joint famous for the train carriage on the roof"),
        img("File:Abbotsford Convent Melbourne.jpg", 1280, 854, "Abbotsford Convent", "Converted convent with galleries and cafés"),
        img("File:Victoria Street Richmond Melbourne.jpg", 1280, 854, "Victoria Street", "Little Saigon — Melbourne's Vietnamese food strip"),
        img("File:Yarra River Abbotsford.jpg", 1280, 854, "Yarra River", "Riverside path near Abbotsford"),
      ],
      MELBOURNE_X,
      [
        { heading: "What makes this route special", body: "Collingwood sits northeast of Melbourne's CBD and has transformed from a gritty industrial suburb into the city's craft-beer and specialty-coffee epicentre. Smith Street is the backbone — lined with independent breweries, single-origin roasters, vintage stores, and murals on every laneway wall. Walk south from Johnston Street and you pass through layers of Melbourne's creative subculture, from punk-era record shops to polished natural-wine bars." },
        { heading: "Getting there and starting point", body: "Tram 86 from the city runs along Smith Street — about 15 minutes. Collingwood station on the Hurstbridge line is a five-minute walk. Start at the corner of Smith and Johnston streets and work your way south, dipping into side streets as the mood takes you." },
        { heading: "Key stops", body: "Collingwood Yards is a former technical school converted into studios, galleries, and event spaces. The Easey Street burger shop is unmissable — it has a decommissioned train carriage perched on the roof. Abbotsford Convent, a 10-minute walk east, is a sprawling cultural precinct with cafés, galleries, and a Saturday farmers' market. Victoria Street in neighbouring Richmond is Little Saigon, packed with excellent pho and banh mi shops." },
        { heading: "Best times to visit", body: "Cafés open from around seven — start with breakfast. Brewery taprooms typically open after noon. Saturdays bring the Abbotsford Convent farmers' market. Evenings on Smith Street are lively with bars and live music. Sundays are quieter and good for a slower-paced wander." },
        { heading: "Practical tips", body: "The terrain is flat and easy to walk. Restrooms are available in cafés along Smith Street. Some small bars and food stalls are cash-only, so carry a bit. Melbourne weather changes fast — pack a light rain jacket. An eSIM lets you look up brewery hours and reviews on the spot." },
      ],
      [
        { q: "Is Collingwood safe?", a: "Daytime is very safe. At night, Smith Street is busy, but avoid poorly lit side streets." },
        { q: "Best breweries?", a: "Several craft breweries cluster around Smith Street. Order a tasting flight to sample the range." },
        { q: "Family-friendly?", a: "Cafés and the Convent are great for families. Breweries tend to be adults-only after late afternoon." },
        { q: "How long does the walk take?", a: "Three to four hours with two or three café stops and a brewery. Half a day if you include Abbotsford." },
      ],
    ),
  },

  // ─── 4. Melbourne — South Melbourne Market ─────────────────────
  "melbourne-south-melbourne-market-walk": {
    ja: ja(AU_JA_CTA,
      "サウスメルボルンマーケット周辺散策",
      "メルボルンで最も歴史あるマーケットを起点に、カフェとビーチを繋ぐ散歩ルートガイド。",
      img("File:South Melbourne Market.jpg", 1280, 854, "サウスメルボルンマーケット", "1867年創業のメルボルン最古のマーケット"),
      [
        img("File:South Melbourne streetscape.jpg", 1280, 854, "サウスメルボルンの街並み", "ビクトリア朝のテラスハウスが残る住宅街"),
        img("File:Albert Park Lake Melbourne.jpg", 1280, 854, "アルバートパーク湖", "F1グランプリのサーキットに囲まれた湖"),
        img("File:St Kilda Beach Melbourne.jpg", 1280, 854, "セントキルダビーチ", "メルボルンで最も人気のビーチ"),
        img("File:Clarendon Street South Melbourne.jpg", 1280, 854, "クラレンドンストリート", "カフェとレストランが並ぶメインストリート"),
        img("File:South Melbourne Town Hall.jpg", 1280, 854, "サウスメルボルン市庁舎", "19世紀のクラシカルな市庁舎建築"),
      ],
      MELBOURNE_X,
      [
        { heading: "このルートの特徴", body: "サウスメルボルンマーケットは1867年に開業したメルボルン最古のマーケットで、生鮮食品からデリ、コーヒースタンドまで150以上の店舗が入っています。マーケットを起点に、ビクトリア朝のテラスハウスが並ぶ住宅街を抜け、アルバートパーク湖まで足を延ばすルートは、観光客の少ない地元密着型の散歩コースです。" },
        { heading: "アクセスと起点", body: "シティからトラム96番でサウスメルボルンマーケット停留所まで約10分。車の場合はマーケット地下に有料駐車場があります。起点はマーケットの正面入口（セシルストリート側）から。まずマーケット内を一周してから周辺散策に出るのがおすすめです。" },
        { heading: "主要スポット", body: "マーケット内では名物のディムシムとフィッシュ＆チップスが定番。オーガニック野菜や地元チーズの専門店も充実しています。マーケットを出たらクラレンドンストリートを南下し、カフェでコーヒーブレイク。さらに南のアルバートパーク湖はF1グランプリの市街地サーキットの一部で、湖畔のウォーキングコースは一周約5km。時間があればセントキルダビーチまで足を延ばせます。" },
        { heading: "時間帯とタイミング", body: "マーケットは水・金・土・日曜に営業。特に土曜の朝8〜10時が最も活気があります。日曜は比較的空いています。アルバートパーク湖は早朝のジョギングコースとしても人気。F1開催時期（3月頃）はサーキット設営のため湖畔の一部が通行制限されます。" },
        { heading: "実用情報", body: "マーケット内にトイレあり。マーケットからアルバートパーク湖まで徒歩約15分。湖畔は平坦で歩きやすいです。マーケット内は現金のみの店もあるので少額の現金を持参しましょう。風が強い日はアルバートパーク湖畔で冷えるので上着があると安心。eSIMがあれば近くのカフェの営業情報をすぐに確認できます。" },
      ],
      [
        { q: "マーケットの営業日は?", a: "水・金・土・日曜の8時〜16時です。土曜が最も賑わいます。" },
        { q: "名物の食べ物は?", a: "サウスメルボルンディムシム（揚げ餃子）とフィッシュ＆チップスが定番です。" },
        { q: "アルバートパーク湖まで遠い?", a: "マーケットから徒歩約15分。湖畔一周は約5kmで1時間ほどです。" },
        { q: "所要時間の目安は?", a: "マーケットだけなら1〜2時間。湖やセントキルダビーチまで含めると半日コースです。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "South Melbourne Market and Lakeside Walk",
      "Start at Melbourne's oldest market, stroll through Victorian terraces, and loop around Albert Park Lake on this local-favourite route.",
      img("File:South Melbourne Market.jpg", 1280, 854, "South Melbourne Market", "Melbourne's oldest market, established 1867"),
      [
        img("File:South Melbourne streetscape.jpg", 1280, 854, "South Melbourne streets", "Victorian-era terrace houses"),
        img("File:Albert Park Lake Melbourne.jpg", 1280, 854, "Albert Park Lake", "Lake ringed by the Formula 1 street circuit"),
        img("File:St Kilda Beach Melbourne.jpg", 1280, 854, "St Kilda Beach", "Melbourne's most popular beach"),
        img("File:Clarendon Street South Melbourne.jpg", 1280, 854, "Clarendon Street", "Main café and restaurant strip"),
        img("File:South Melbourne Town Hall.jpg", 1280, 854, "South Melbourne Town Hall", "Classical 19th-century civic building"),
      ],
      MELBOURNE_X,
      [
        { heading: "What makes this route special", body: "South Melbourne Market has been trading since 1867, making it the city's oldest continuously operating market. Over 150 stalls sell everything from fresh seafood to specialty coffee. The surrounding streets are lined with Victorian terrace houses and independent cafés, and Albert Park Lake is a 15-minute walk south. This route skips the tourist crowds and shows you how locals spend a Saturday morning." },
        { heading: "Getting there and starting point", body: "Tram 96 from the city drops you at the South Melbourne Market stop in about 10 minutes. Paid parking is available under the market. Start at the Cecil Street entrance, loop through the market halls, then head south on Clarendon Street." },
        { heading: "Key stops", body: "Inside the market, the dim sim — a Melbourne invention — and fresh fish and chips are essential. Organic greengrocers and local cheese vendors are also excellent. Outside, Clarendon Street has a string of cafés for a flat white. Albert Park Lake, circled by the Formula 1 street circuit, offers a flat five-kilometre walking loop. If you have time, continue south to St Kilda Beach for pier views and penguin-spotting at dusk." },
        { heading: "Best times to visit", body: "The market opens Wednesday, Friday, Saturday, and Sunday. Saturday morning between eight and ten is the most vibrant. Sundays are quieter. Albert Park Lake is popular for early-morning jogs. During the F1 Grand Prix (around March), parts of the lakeside path are fenced off for circuit setup." },
        { heading: "Practical tips", body: "Restrooms inside the market. The walk from the market to Albert Park Lake is about 15 minutes on flat ground. Some market stalls are cash-only, so bring small notes. A jacket is useful if the wind picks up around the lake. An eSIM keeps you connected for café lookups and transport updates." },
      ],
      [
        { q: "When is the market open?", a: "Wednesday, Friday, Saturday, and Sunday, 8 am to 4 pm. Saturday is the busiest day." },
        { q: "What should I eat?", a: "The South Melbourne dim sim — a deep-fried dumpling unique to the city — and fresh fish and chips." },
        { q: "How far is Albert Park Lake?", a: "About a 15-minute walk from the market. The lake loop is five kilometres and takes around an hour." },
        { q: "How long does the full route take?", a: "One to two hours for the market alone. Half a day if you add the lake and St Kilda Beach." },
      ],
    ),
  },

  // ─── 5. Cape Town — Bo-Kaap ────────────────────────────────────
  "cape-town-bo-kaap-walk": {
    ja: ja(ZA_JA_CTA,
      "ボカープのカラフルな家と歴史散策",
      "ケープタウンのシグナルヒル麓に広がるボカープ地区。色鮮やかな家並みとケープマレー文化を巡る散策ガイド。",
      img("File:Bo-Kaap Cape Town.jpg", 1280, 854, "ボカープ", "パステルカラーの家が並ぶボカープの坂道"),
      [
        img("File:Bo-Kaap Museum Cape Town.jpg", 1280, 854, "ボカープ博物館", "ケープマレー文化の歴史を展示する博物館"),
        img("File:Auwal Mosque Cape Town.jpg", 1280, 854, "アウワルモスク", "南アフリカ最古のモスク（1794年建立）"),
        img("File:Signal Hill Cape Town.jpg", 1280, 854, "シグナルヒル", "ボカープの背後にそびえるシグナルヒル"),
        img("File:Wale Street Bo-Kaap.jpg", 1280, 854, "ウェイルストリート", "最もフォトジェニックなカラフルストリート"),
        img("File:Cape Town CBD from Bo-Kaap.jpg", 1280, 854, "ケープタウンCBD", "ボカープから見下ろす市街地の眺め"),
      ],
      CAPE_TOWN_X,
      [
        { heading: "このルートの特徴", body: "ボカープはケープタウンのシグナルヒル東斜面に広がる歴史的住宅地で、パステルカラーに塗られた家々がSNSで世界的に有名になりました。17世紀にオランダ東インド会社がマレー半島やインドネシアから連れてきた人々の子孫が暮らすケープマレーコミュニティの中心地です。坂道を歩きながら、モスク、スパイスショップ、ケープマレー料理の香りに包まれる独特の散策体験ができます。" },
        { heading: "アクセスと起点", body: "ケープタウンCBDのウェイルストリートを上っていくとボカープに入ります。MyCiTiバスのシビックセンター駅から徒歩10分。起点はウェイルストリートとチャペルストリートの交差点が定番の撮影スポットです。ここから坂を上りながらボカープ博物館を目指しましょう。" },
        { heading: "主要スポット", body: "ボカープ博物館はケープマレーの歴史と文化を紹介する小さな博物館で、入場料も安価。アウワルモスクは1794年に建てられた南アフリカ最古のモスクです（内部見学は要確認）。チャペルストリートとウェイルストリートの坂道が最もフォトジェニック。地元のケープマレー料理教室に参加すれば、ボボティーやサモサの作り方を学べます。上部からはテーブルマウンテンとCBDを見渡す眺望も楽しめます。" },
        { heading: "時間帯とタイミング", body: "午前中の柔らかい光がカラフルな家を最も美しく見せます。観光客が少ない平日の午前がベスト。金曜はモスクの礼拝日なので、撮影はモスク周辺では控えめに。ラマダン期間中は地区全体が静かになります。" },
        { heading: "実用情報", body: "急な坂道が多いので歩きやすい靴が必須。住民の生活エリアなので、玄関先での撮影は声をかけてから。貴重品は目立たないように持ち、スマートフォンの取り扱いにも注意してください。トイレはボカープ博物館内かCBD側のショッピングセンターが便利。eSIMがあれば地図アプリで坂道の多いルートを効率よくナビゲートできます。" },
      ],
      [
        { q: "ボカープは安全?", a: "日中は観光客も多く概ね安全です。ただし一人での早朝・夜間散策は避け、貴重品の管理に注意してください。" },
        { q: "写真撮影のマナーは?", a: "住民の家なので、玄関先で撮影する際は一声かけるのがマナーです。モスク周辺では特に配慮を。" },
        { q: "所要時間は?", a: "1〜1.5時間で主要スポットを回れます。料理教室に参加するなら半日を見てください。" },
        { q: "ケープマレー料理とは?", a: "マレー・インドネシア由来のスパイス料理。ボボティー（ひき肉のスパイスグラタン）やサモサが代表的です。" },
      ],
    ),
    en: en(ZA_EN_CTA,
      "Bo-Kaap Colourful Heritage Walk in Cape Town",
      "Explore Cape Town's most photogenic neighbourhood — pastel-painted houses, Cape Malay culture, and Signal Hill views.",
      img("File:Bo-Kaap Cape Town.jpg", 1280, 854, "Bo-Kaap", "Pastel-painted houses climbing the slopes of Signal Hill"),
      [
        img("File:Bo-Kaap Museum Cape Town.jpg", 1280, 854, "Bo-Kaap Museum", "Museum dedicated to Cape Malay history"),
        img("File:Auwal Mosque Cape Town.jpg", 1280, 854, "Auwal Mosque", "South Africa's oldest mosque, founded 1794"),
        img("File:Signal Hill Cape Town.jpg", 1280, 854, "Signal Hill", "The hill rising behind Bo-Kaap"),
        img("File:Wale Street Bo-Kaap.jpg", 1280, 854, "Wale Street", "The most photographed colourful street"),
        img("File:Cape Town CBD from Bo-Kaap.jpg", 1280, 854, "Cape Town CBD", "City views from upper Bo-Kaap"),
      ],
      CAPE_TOWN_X,
      [
        { heading: "What makes this route special", body: "Bo-Kaap is a historic residential quarter on the eastern slope of Signal Hill, famous worldwide for its rows of brightly painted houses. The community descends from people brought to the Cape by the Dutch East India Company from the Malay Peninsula and Indonesia in the seventeenth century. Walking these steep cobbled streets, you pass mosques, spice shops, and kitchens fragrant with Cape Malay cooking — a living cultural landscape rather than a museum piece." },
        { heading: "Getting there and starting point", body: "Walk up Wale Street from the CBD — Bo-Kaap begins where the buildings turn pastel. The MyCiTi bus Civic Centre stop is a 10-minute walk. The corner of Wale and Chiappini streets is the classic photo spot and a natural starting point. From there, climb the hill towards the Bo-Kaap Museum." },
        { heading: "Key stops", body: "The Bo-Kaap Museum occupies one of the oldest houses in the area and provides context on Cape Malay culture — entry is inexpensive. The Auwal Mosque, founded in 1794, is South Africa's oldest. Chiappini and Wale streets offer the most photogenic facades. Local cooking classes teach you to make bobotie and samosas. From the upper streets, you get panoramic views of Table Mountain and the city bowl." },
        { heading: "Best times to visit", body: "Morning light flatters the colourful walls. Weekday mornings are quietest. Fridays are prayer day, so be discreet near the mosques. During Ramadan the neighbourhood is especially quiet." },
        { heading: "Practical tips", body: "Wear comfortable shoes for steep hills. This is a residential area — ask before photographing people's homes. Keep valuables discreet and hold your phone securely. Restrooms are in the museum or shopping centres on the CBD side. An eSIM helps you navigate the hilly streets efficiently with a maps app." },
      ],
      [
        { q: "Is Bo-Kaap safe?", a: "Daytime is generally safe with other visitors around. Avoid walking alone early in the morning or after dark, and be mindful of valuables." },
        { q: "Photography etiquette?", a: "The houses are people's homes — ask before taking close-up shots of doorways. Be especially respectful near mosques." },
        { q: "How long does the walk take?", a: "One to one and a half hours for the main sights. A cooking class extends it to half a day." },
        { q: "What is Cape Malay food?", a: "Spiced cuisine with Malay and Indonesian roots. Try bobotie (spiced mince bake) and samosas." },
      ],
    ),
  },

  // ─── 6. Cape Town — V&A Waterfront ─────────────────────────────
  "cape-town-waterfront-walk": {
    ja: ja(ZA_JA_CTA,
      "V&Aウォーターフロントと港散歩",
      "ケープタウンの港湾再開発エリア、V&Aウォーターフロントを歩くルートガイド。ショッピング、水族館、テーブルマウンテンの眺望。",
      img("File:V&A Waterfront Cape Town.jpg", 1280, 854, "V&Aウォーターフロント", "テーブルマウンテンを背景にしたウォーターフロントの全景"),
      [
        img("File:Two Oceans Aquarium Cape Town.jpg", 1280, 854, "二大洋水族館", "大西洋とインド洋の海洋生物を展示する水族館"),
        img("File:Clock Tower Cape Town Waterfront.jpg", 1280, 854, "クロックタワー", "1882年建造の赤いゴシック様式時計塔"),
        img("File:Zeitz MOCAA Cape Town.jpg", 1280, 854, "ツァイツMOCAA", "旧穀物サイロを改装したアフリカ現代美術館"),
        img("File:Robben Island Ferry Cape Town.jpg", 1280, 854, "ロベン島フェリー", "ウォーターフロントから出発するロベン島行きフェリー"),
        img("File:Cape Town Waterfront canal.jpg", 1280, 854, "運河沿い", "レストランが並ぶ運河沿いの散歩道"),
      ],
      CAPE_TOWN_X,
      [
        { heading: "このルートの特徴", body: "V&Aウォーターフロントはケープタウン最大の観光エリアで、旧港湾施設を再開発したショッピング・文化・エンターテインメントの複合拠点です。テーブルマウンテンとライオンズヘッドを背景にした港の景観は息をのむ美しさ。ツァイツMOCAA（アフリカ現代美術館）、二大洋水族館、ロベン島行きフェリーターミナルなど見どころが集中しています。" },
        { heading: "アクセスと起点", body: "CBD中心部から徒歩15分。MyCiTiバスのウォーターフロント停留所が便利。起点はクロックタワー周辺がおすすめ。1882年建造のゴシック様式の時計塔を目印に、ここからノーベルスクエア方面へ反時計回りに歩くと効率よく回れます。" },
        { heading: "主要スポット", body: "ツァイツMOCAAは旧穀物サイロを大胆にくり抜いた建築が圧巻で、アフリカ大陸最大の現代美術館です。二大洋水族館は大西洋とインド洋の海洋生物を展示し、家族連れに人気。ノーベルスクエアにはマンデラら南アフリカのノーベル平和賞受賞者の銅像が並びます。ロベン島へのフェリーもここから出発。運河沿いにはシーフードレストランが並び、テラス席でテーブルマウンテンを眺めながら食事ができます。" },
        { heading: "時間帯とタイミング", body: "午前中にツァイツMOCAAを見てから、昼は運河沿いでシーフードランチというのが王道コース。夕方はテーブルマウンテンが夕日に染まる絶景タイム。週末はストリートパフォーマーやライブ音楽で賑わいます。ロベン島ツアーは事前予約必須で、朝のフェリーが混みにくいです。" },
        { heading: "実用情報", body: "エリア全体がセキュリティ管理されており、ケープタウンで最も安全な観光エリアの一つです。トイレはショッピングモール内に多数。レストランはクレジットカード利用可。日差しが強いので帽子と日焼け止めを忘れずに。eSIMがあればロベン島のフェリー予約状況やレストランのメニューをその場で確認できます。" },
      ],
      [
        { q: "V&Aウォーターフロントの所要時間は?", a: "ショッピングと食事で3〜4時間。ツァイツMOCAAやロベン島ツアーを含めると丸一日です。" },
        { q: "ロベン島ツアーの予約方法は?", a: "公式サイトから事前予約が必要です。当日券はほぼ売り切れるので、数日前までに予約しましょう。" },
        { q: "夜も安全?", a: "ウォーターフロントエリア内はセキュリティが巡回しており、夜も比較的安全です。帰りはUberの利用がおすすめ。" },
        { q: "子連れにおすすめの場所は?", a: "二大洋水族館は子供に大人気。運河沿いのアイスクリーム店や観覧車もあります。" },
      ],
    ),
    en: en(ZA_EN_CTA,
      "V&A Waterfront Harbour Walk in Cape Town",
      "Cape Town's vibrant harbour precinct — Zeitz MOCAA, the Two Oceans Aquarium, Robben Island ferries, and Table Mountain views.",
      img("File:V&A Waterfront Cape Town.jpg", 1280, 854, "V&A Waterfront", "The waterfront with Table Mountain behind"),
      [
        img("File:Two Oceans Aquarium Cape Town.jpg", 1280, 854, "Two Oceans Aquarium", "Marine life from the Atlantic and Indian oceans"),
        img("File:Clock Tower Cape Town Waterfront.jpg", 1280, 854, "Clock Tower", "1882 Gothic-style red clock tower"),
        img("File:Zeitz MOCAA Cape Town.jpg", 1280, 854, "Zeitz MOCAA", "Africa's largest contemporary art museum in a converted grain silo"),
        img("File:Robben Island Ferry Cape Town.jpg", 1280, 854, "Robben Island Ferry", "Ferry departure point for Robben Island"),
        img("File:Cape Town Waterfront canal.jpg", 1280, 854, "Canal walk", "Restaurants lining the waterfront canal"),
      ],
      CAPE_TOWN_X,
      [
        { heading: "What makes this route special", body: "The V&A Waterfront is Cape Town's flagship tourism precinct — a redeveloped working harbour backed by the dramatic silhouette of Table Mountain and Lion's Head. It packs in Zeitz MOCAA (Africa's largest contemporary art museum), the Two Oceans Aquarium, hundreds of shops and restaurants, and the ferry terminal for Robben Island. Unlike many waterfront developments, it retains a working harbour feel, with fishing boats and dry docks alongside the attractions." },
        { heading: "Getting there and starting point", body: "A 15-minute walk from the CBD or a short MyCiTi bus ride to the Waterfront stop. Start at the Clock Tower — the 1882 Gothic brick landmark is hard to miss. Walk anticlockwise towards Nobel Square and the main shopping areas." },
        { heading: "Key stops", body: "Zeitz MOCAA occupies a former grain silo dramatically hollowed out by architect Thomas Heatherwick — the building alone is worth the visit. The Two Oceans Aquarium showcases marine life from both the Atlantic and Indian oceans, making it a hit with families. Nobel Square features bronze statues of South Africa's four Nobel Peace Prize laureates including Mandela. The Robben Island ferry departs from the Nelson Mandela Gateway. Canal-side restaurants serve excellent seafood with Table Mountain views." },
        { heading: "Best times to visit", body: "Morning for Zeitz MOCAA, then a seafood lunch by the canal is the classic itinerary. Late afternoon brings stunning light on Table Mountain. Weekends have street performers and live music. Book Robben Island tours well in advance — morning ferries are less crowded." },
        { heading: "Practical tips", body: "The precinct has private security and is one of Cape Town's safest tourist areas. Restrooms throughout the shopping centre. Restaurants accept credit cards. Sun protection is essential. An eSIM lets you check ferry availability and restaurant menus on the go." },
      ],
      [
        { q: "How long should I spend?", a: "Three to four hours for shopping and dining. A full day if you add Zeitz MOCAA and a Robben Island tour." },
        { q: "How do I book Robben Island?", a: "Book online in advance through the official site. Same-day tickets are almost always sold out." },
        { q: "Is it safe at night?", a: "The waterfront precinct has active security patrols and is relatively safe at night. Use Uber for the trip home." },
        { q: "Best for kids?", a: "The Two Oceans Aquarium is a favourite. There is also a Ferris wheel and ice-cream shops along the canal." },
      ],
    ),
  },

  // ─── 7. Cape Town — Woodstock ──────────────────────────────────
  "cape-town-woodstock-walk": {
    ja: ja(ZA_JA_CTA,
      "ウッドストックのストリートアートとマーケット",
      "ケープタウンのアートとクラフトの発信地ウッドストック。壁画、デザインスタジオ、人気マーケットを巡るルート。",
      img("File:Woodstock street art Cape Town.jpg", 1280, 854, "ウッドストック壁画", "ウッドストックの建物を彩る大規模な壁画"),
      [
        img("File:Old Biscuit Mill Cape Town.jpg", 1280, 854, "オールドビスケットミル", "週末のNeighbourgoods Marketが人気のフードマーケット"),
        img("File:Woodstock Exchange Cape Town.jpg", 1280, 854, "ウッドストックエクスチェンジ", "デザイナーやアーティストのスタジオが入るビル"),
        img("File:Albert Road Woodstock.jpg", 1280, 854, "アルバートロード", "カフェとギャラリーが並ぶメインストリート"),
        img("File:Salt River Circle Cape Town.jpg", 1280, 854, "ソルトリバーサークル", "ウッドストック隣接エリアの交差点"),
        img("File:Woodstock Cave Table Mountain.jpg", 1280, 854, "ウッドストック洞窟", "テーブルマウンテンの中腹にある洞窟ハイキング"),
      ],
      CAPE_TOWN_X,
      [
        { heading: "このルートの特徴", body: "ウッドストックはケープタウンCBDの東に位置する、アートとデザインが集まるクリエイティブ地区です。旧工場や倉庫がギャラリー、デザインスタジオ、クラフトブルワリーに生まれ変わり、建物の壁面には世界的アーティストによる大規模壁画が描かれています。土曜のNeighbourgoods Marketは地元のグルメマーケットとして大人気で、これを目当てに来る人も多いです。" },
        { heading: "アクセスと起点", body: "CBDからウッドストックまでUberで約10分。MyCiTiバスでも行けますが、エリア内の移動は徒歩がメイン。起点はアルバートロードとビクトリアロードの交差点付近。ここからオールドビスケットミル方面へ歩きましょう。" },
        { heading: "主要スポット", body: "オールドビスケットミルは旧ビスケット工場をリノベーションした複合施設で、土曜のNeighbourgoods Marketが最大の魅力。ウッドストックエクスチェンジにはインディペンデントなデザイナーやアーティストのスタジオが入っています。アルバートロード沿いのカフェとギャラリーを回りながら、建物の壁画を探すストリートアートハントも楽しい。テーブルマウンテン中腹のウッドストック洞窟ハイキングも人気です。" },
        { heading: "時間帯とタイミング", body: "土曜午前のNeighbourgoods Marketが最大のハイライトなので、土曜日の訪問がおすすめ。9時に到着すると混雑前にゆっくり買い物ができます。平日はスタジオやギャラリーが静かに回れます。壁画の撮影は午前中の光がベスト。" },
        { heading: "実用情報", body: "ウッドストックは急速にジェントリフィケーションが進んでいますが、メインストリートから外れると治安が良くないエリアもあります。日中のメインストリート沿いを歩き、貴重品の管理に注意してください。トイレはオールドビスケットミル内にあります。マーケットではカードが使える店が増えていますが、現金もあると安心。eSIMがあれば壁画のアーティスト情報や店舗の営業情報をすぐに調べられます。" },
      ],
      [
        { q: "Neighbourgoods Marketはいつ開催?", a: "毎週土曜の9時〜15時です。雨天でも屋内スペースで営業しています。" },
        { q: "ストリートアートはどこで見られる?", a: "アルバートロードとその周辺の路地に集中しています。ガイド付きストリートアートツアーも催行されています。" },
        { q: "治安は大丈夫?", a: "日中のメインストリート沿いは概ね安全です。脇道への一人歩きは避け、UberやBoltで移動するのがおすすめ。" },
        { q: "所要時間は?", a: "マーケットとストリートアートで2〜3時間。カフェやギャラリーも回ると半日です。" },
      ],
    ),
    en: en(ZA_EN_CTA,
      "Woodstock Street Art and Market Walk in Cape Town",
      "Cape Town's creative quarter — large-scale murals, design studios, and the famous Neighbourgoods Market at the Old Biscuit Mill.",
      img("File:Woodstock street art Cape Town.jpg", 1280, 854, "Woodstock murals", "Large-scale murals covering warehouse walls"),
      [
        img("File:Old Biscuit Mill Cape Town.jpg", 1280, 854, "Old Biscuit Mill", "Home of the Saturday Neighbourgoods Market"),
        img("File:Woodstock Exchange Cape Town.jpg", 1280, 854, "Woodstock Exchange", "Building housing designer and artist studios"),
        img("File:Albert Road Woodstock.jpg", 1280, 854, "Albert Road", "Main strip with cafés and galleries"),
        img("File:Salt River Circle Cape Town.jpg", 1280, 854, "Salt River Circle", "Roundabout at the edge of Woodstock"),
        img("File:Woodstock Cave Table Mountain.jpg", 1280, 854, "Woodstock Cave", "Popular hiking spot on Table Mountain"),
      ],
      CAPE_TOWN_X,
      [
        { heading: "What makes this route special", body: "Woodstock, east of Cape Town's CBD, is the city's creative engine room. Former factories and warehouses have been converted into galleries, design studios, and craft breweries, and the building facades are canvases for internationally recognised street artists. The Saturday Neighbourgoods Market at the Old Biscuit Mill draws foodies from across the city and is reason enough to visit. Between the murals and the market, you get a snapshot of Cape Town's contemporary creative scene." },
        { heading: "Getting there and starting point", body: "An Uber from the CBD takes about 10 minutes. MyCiTi buses also serve the area, but walking is the best way to explore once you arrive. Start near the corner of Albert Road and Victoria Road, then head towards the Old Biscuit Mill." },
        { heading: "Key stops", body: "The Old Biscuit Mill is a converted factory that hosts the Neighbourgoods Market on Saturdays — artisan food, local crafts, and live music. Woodstock Exchange houses independent designers and artists in studio-retail spaces. Albert Road cafés and galleries are good for a slow browse. Look out for murals on side streets — guided street-art tours are available. For an active add-on, the Woodstock Cave hike on Table Mountain's slopes is a local favourite." },
        { heading: "Best times to visit", body: "Saturday morning for the Neighbourgoods Market — arrive by nine to beat the crowds. Weekdays are quieter, better for gallery visits and mural photography. Morning light is best for photographing the street art." },
        { heading: "Practical tips", body: "Woodstock is gentrifying rapidly but some side streets remain rough. Stick to main roads during the day and keep valuables secure. Restrooms are inside the Old Biscuit Mill. Card payment is increasingly accepted at the market, but cash is useful. An eSIM helps you look up mural artists and shop details on the spot." },
      ],
      [
        { q: "When is the Neighbourgoods Market?", a: "Every Saturday, 9 am to 3 pm. Indoor space means it runs rain or shine." },
        { q: "Where is the street art?", a: "Concentrated along Albert Road and surrounding lanes. Guided street-art tours are offered by local operators." },
        { q: "Is it safe?", a: "Main streets are generally fine during the day. Avoid wandering alone into side streets, and use Uber or Bolt for transport." },
        { q: "How long does the walk take?", a: "Two to three hours for the market and murals. Half a day with cafés and galleries." },
      ],
    ),
  },

  // ─── 8. Dubai — Al Fahidi ──────────────────────────────────────
  "dubai-al-fahidi-walk": {
    ja: ja(UAE_JA_CTA,
      "アルファヒディ歴史地区の風の塔散策",
      "ドバイの超高層ビル群の合間に残る旧市街アルファヒディ地区。風の塔と砂色の建築を巡る歴史散策ガイド。",
      img("File:Al Fahidi Historical Neighbourhood Dubai.jpg", 1280, 854, "アルファヒディ歴史地区", "伝統的な風の塔が並ぶアルファヒディの路地"),
      [
        img("File:Dubai Museum Al Fahidi Fort.jpg", 1280, 854, "ドバイ博物館", "1787年建造のアルファヒディ砦内の博物館"),
        img("File:Wind Tower Dubai.jpg", 1280, 854, "風の塔", "天然のエアコンとして機能した伝統建築"),
        img("File:Dubai Creek Abra.jpg", 1280, 854, "アブラ船", "ドバイクリークを渡る伝統的な渡し船"),
        img("File:XVA Gallery Dubai.jpg", 1280, 854, "XVAギャラリー", "伝統家屋を改装したアートギャラリー兼ホテル"),
        img("File:Al Fahidi Street Dubai.jpg", 1280, 854, "アルファヒディストリート", "テキスタイルスークへ続く通り"),
      ],
      DUBAI_X,
      [
        { heading: "このルートの特徴", body: "アルファヒディ歴史地区（旧バスタキヤ地区）は、ドバイクリーク沿いに残る19世紀後半のペルシャ商人の居住区です。「風の塔」と呼ばれる天然の換気装置を備えた砂色の建物が狭い路地に並び、超近代的なドバイとは全く異なる静かな雰囲気が漂います。取り壊しの危機を乗り越えて保存され、現在はギャラリー、カフェ、ブティックホテルが入る文化地区になっています。" },
        { heading: "アクセスと起点", body: "メトロのアルファヒディ駅から徒歩5分。バスタキヤ・モスク横の入口から地区に入ります。起点はドバイ博物館（アルファヒディ砦）がおすすめ。ドバイの歴史を概観してから路地散策に出ると理解が深まります。" },
        { heading: "主要スポット", body: "ドバイ博物館はアルファヒディ砦（1787年建造）内にあり、真珠採りや砂漠の暮らしをジオラマで紹介しています。風の塔は屋上に突き出た四面開口の構造物で、風を室内に導く天然エアコン。XVAギャラリーは伝統家屋を改装したアートスペース兼ブティックホテルで、中庭カフェが居心地抜群。クリークまで歩けばアブラ（木造渡し船）でデイラ側へ1ディルハムで渡れます。" },
        { heading: "時間帯とタイミング", body: "夏場（6〜9月）は気温45度を超えるため、早朝か夕方以降の散策が必須。10〜3月の冬季は日中も快適に歩けます。金曜はモスクの礼拝時間帯を避けて訪問を。夕方にはクリーク沿いのカフェから夕日が見えます。" },
        { heading: "実用情報", body: "路地は狭く日陰が多いですが、夏は水を必ず持参。ドバイ博物館のトイレが利用可能。服装はモスク周辺では肩と膝が隠れるものを。撮影は自由ですが、住居として使われている建物もあるので配慮を。eSIMがあればアブラ船の時刻や博物館の開館情報をその場で確認できます。" },
      ],
      [
        { q: "アルファヒディ地区は無料?", a: "地区自体は無料で散策できます。ドバイ博物館の入場料は3ディルハム（約120円）と格安です。" },
        { q: "夏でも歩ける?", a: "日中は40度超えで厳しいです。早朝（7〜9時）か夕方（17時以降）に訪れてください。" },
        { q: "アブラ船の料金は?", a: "片道1ディルハム（約40円）で、ドバイクリークを渡れます。現金のみです。" },
        { q: "所要時間は?", a: "1.5〜2時間で主要スポットを回れます。クリークのスーク散策も含めると3〜4時間です。" },
      ],
    ),
    en: en(UAE_EN_CTA,
      "Al Fahidi Historic District Wind Tower Walk in Dubai",
      "Step back in time in Dubai's oldest neighbourhood — wind towers, narrow lanes, and creek-side heritage in the heart of the modern city.",
      img("File:Al Fahidi Historical Neighbourhood Dubai.jpg", 1280, 854, "Al Fahidi Historic District", "Traditional wind-tower houses lining a narrow lane"),
      [
        img("File:Dubai Museum Al Fahidi Fort.jpg", 1280, 854, "Dubai Museum", "Museum inside the 1787 Al Fahidi Fort"),
        img("File:Wind Tower Dubai.jpg", 1280, 854, "Wind tower", "Traditional ventilation tower — a natural air conditioner"),
        img("File:Dubai Creek Abra.jpg", 1280, 854, "Abra boat", "Traditional water taxi crossing Dubai Creek"),
        img("File:XVA Gallery Dubai.jpg", 1280, 854, "XVA Gallery", "Art gallery and boutique hotel in a heritage house"),
        img("File:Al Fahidi Street Dubai.jpg", 1280, 854, "Al Fahidi Street", "Road leading towards the Textile Souk"),
      ],
      DUBAI_X,
      [
        { heading: "What makes this route special", body: "Al Fahidi Historical Neighbourhood, formerly known as Bastakiya, is a pocket of nineteenth-century Persian merchant houses on the bank of Dubai Creek. The wind towers — four-sided rooftop structures that channel breezes into rooms — are the area's architectural signature and a reminder that cooling existed long before electricity. Saved from demolition in the 1990s, the district now houses galleries, cafés, and boutique hotels, offering a quiet contrast to the skyscraper city around it." },
        { heading: "Getting there and starting point", body: "Al Fahidi Metro station is a five-minute walk. Enter the district near the Bastakiya Mosque. Start at the Dubai Museum inside Al Fahidi Fort — it gives a quick primer on the city's pre-oil history before you explore the lanes." },
        { heading: "Key stops", body: "Dubai Museum occupies the 1787 fort and uses dioramas to illustrate pearl diving and desert life. The wind towers are best seen from the narrow alleys where you can look straight up into their openings. XVA Gallery is an art space and hotel inside a traditional courtyard house — the café is a peaceful place for Arabic coffee. Walk to the creek and hop on an abra (wooden water taxi) to cross to Deira for just one dirham." },
        { heading: "Best times to visit", body: "Summer temperatures exceed 45 degrees Celsius — walk only in the early morning or after sunset. October to March is comfortable all day. Avoid Friday prayer times near the mosque. Late afternoon brings beautiful light on the sand-coloured walls and a sunset view from the creek." },
        { heading: "Practical tips", body: "Lanes are narrow and mostly shaded, but carry water in any season. Restrooms at Dubai Museum. Dress modestly near the mosque — cover shoulders and knees. Photography is welcome, but some buildings are private residences. An eSIM is useful for checking abra schedules and museum hours on the spot." },
      ],
      [
        { q: "Is Al Fahidi free to visit?", a: "The district is open and free to walk around. Dubai Museum charges three dirhams — about one US dollar." },
        { q: "Can I visit in summer?", a: "Midday exceeds 40 degrees. Go early morning (7–9 am) or evening (after 5 pm)." },
        { q: "How much is an abra ride?", a: "One dirham (about 27 US cents) for a one-way creek crossing. Cash only." },
        { q: "How long does the walk take?", a: "One and a half to two hours for the main sights. Three to four hours if you add the creek-side souks." },
      ],
    ),
  },

  // ─── 9. Dubai — Deira Gold and Spice Souks ────────────────────
  "dubai-deira-gold-spice-souks-walk": {
    ja: ja(UAE_JA_CTA,
      "デイラのゴールドスークとスパイススーク",
      "ドバイ・デイラ地区の伝統市場を歩く。きらめく金製品とスパイスの香りに包まれるルートガイド。",
      img("File:Dubai Gold Souk.jpg", 1280, 854, "ゴールドスーク", "金製品のショーウィンドウが連なるゴールドスーク"),
      [
        img("File:Dubai Spice Souk.jpg", 1280, 854, "スパイススーク", "色とりどりのスパイスが山積みされた市場"),
        img("File:Deira Waterfront Dubai.jpg", 1280, 854, "デイラウォーターフロント", "クリーク沿いのダウ船と倉庫群"),
        img("File:Perfume Souk Dubai.jpg", 1280, 854, "パフュームスーク", "アラビアンパフュームの専門店が並ぶ通り"),
        img("File:Al Ras Dubai.jpg", 1280, 854, "アルラス地区", "デイラの歴史的な住宅街"),
        img("File:Deira Twin Towers Dubai.jpg", 1280, 854, "デイラツインタワー", "デイラのランドマークツインタワー"),
      ],
      DUBAI_X,
      [
        { heading: "このルートの特徴", body: "デイラはドバイクリークの北側に位置する旧市街で、ゴールドスーク、スパイススーク、パフュームスークという3つの伝統市場が密集しています。きらびやかな金のジュエリーが壁一面に並ぶゴールドスークは世界最大規模。スパイススークではサフラン、カルダモン、乳香が山積みで、中東の香りに包まれます。モールとは違う、アラビアの伝統的な買い物体験ができる貴重なエリアです。" },
        { heading: "アクセスと起点", body: "メトロのアルラス駅から徒歩5分。アルファヒディ地区からアブラ船でクリークを渡るルートもおすすめ。起点はスパイススークのクリーク沿い入口が便利。スパイスの香りに誘われながら奥に進み、ゴールドスークへ抜けるルートが効率的です。" },
        { heading: "主要スポット", body: "スパイススークではサフラン、乳香、デーツ、ローズウォーターなどが手頃な価格で買えます。ゴールドスークは300以上の店舗が並び、値段交渉が基本。パフュームスークではアラビアンウードやアタール（天然香料）を試せます。クリーク沿いにはダウ船（木造帆船）が停泊し、中東・アフリカとの貿易の名残が見られます。" },
        { heading: "時間帯とタイミング", body: "午前10時〜13時と16時〜22時が営業時間。14〜16時頃は昼休みで閉まる店が多いです。金曜は午後からの営業が一般的。ラマダン期間中は営業時間が変動します。夕方以降はライトアップされて雰囲気が増します。" },
        { heading: "実用情報", body: "値段交渉はスーク文化の一部なので、最初の提示価格から30〜50%の値引きを目安に。金製品は重さと純度で価格が決まるので、購入前に当日の金相場を確認しておくと安心。スパイスは密封パックを選ぶと持ち帰りやすいです。トイレはスーク内のモスク横にあります。eSIMがあれば金相場や店舗のレビューをリアルタイムで確認できます。" },
      ],
      [
        { q: "値段交渉は必要?", a: "ゴールドスーク・スパイススークとも交渉が基本です。最初の提示価格からの値引きを前提に声をかけましょう。" },
        { q: "偽物は多い?", a: "ゴールドスークのジュエリーはドバイ政府の品質管理下にあり、偽物はほぼありません。ただし路上売りには注意。" },
        { q: "おすすめのお土産は?", a: "サフラン、乳香、デーツ、アラビアンパフュームが人気。小分けパックなら荷物にもなりません。" },
        { q: "所要時間は?", a: "3つのスークを回って2〜3時間。買い物に時間をかけるなら半日見てください。" },
      ],
    ),
    en: en(UAE_EN_CTA,
      "Deira Gold and Spice Souks Walk in Dubai",
      "Wander through Dubai's traditional markets — glittering gold, mountains of spice, and Arabian perfumes in the historic Deira quarter.",
      img("File:Dubai Gold Souk.jpg", 1280, 854, "Gold Souk", "Windows glittering with gold jewellery"),
      [
        img("File:Dubai Spice Souk.jpg", 1280, 854, "Spice Souk", "Colourful mounds of spice at the market"),
        img("File:Deira Waterfront Dubai.jpg", 1280, 854, "Deira Waterfront", "Dhow boats and warehouses along the creek"),
        img("File:Perfume Souk Dubai.jpg", 1280, 854, "Perfume Souk", "Shops specialising in Arabian oud and attar"),
        img("File:Al Ras Dubai.jpg", 1280, 854, "Al Ras", "Historic residential area of Deira"),
        img("File:Deira Twin Towers Dubai.jpg", 1280, 854, "Deira Twin Towers", "Landmark towers above the souk district"),
      ],
      DUBAI_X,
      [
        { heading: "What makes this route special", body: "Deira, on the northern bank of Dubai Creek, is the old city — a world away from the glass towers of Downtown. Three traditional souks sit within walking distance of each other: the Gold Souk, one of the largest gold markets on earth; the Spice Souk, heaped with saffron, cardamom, and frankincense; and the Perfume Souk, where you can sample Arabian oud and natural attar oils. This is bargaining-and-banter shopping, not mall retail." },
        { heading: "Getting there and starting point", body: "Al Ras Metro station is a five-minute walk. Alternatively, take an abra across the creek from Al Fahidi — it is the more atmospheric approach. Start at the Spice Souk entrance on the creek side and work your way inland towards the Gold Souk." },
        { heading: "Key stops", body: "The Spice Souk sells saffron, frankincense, dates, and rosewater at bargain prices. The Gold Souk has over 300 shops and haggling is expected. The Perfume Souk lets you try Arabian oud and attar before you buy. Along the creek, wooden dhow boats recall the trade routes that connected Dubai to East Africa and the Indian subcontinent." },
        { heading: "Best times to visit", body: "Shops open roughly 10 am to 1 pm and 4 pm to 10 pm. Many close for a midday break between 2 and 4 pm. Fridays usually mean afternoon-only trading. Ramadan can shift hours — check locally. The souks are most atmospheric in the evening under lights." },
        { heading: "Practical tips", body: "Haggling is part of the culture — aim for 30 to 50 per cent off the initial asking price. Gold is priced by weight and purity, so check the day's gold rate before buying. Choose sealed spice packs for easy transport. Restrooms near the souk mosque. An eSIM lets you check live gold prices and shop reviews on the go." },
      ],
      [
        { q: "Do I need to haggle?", a: "Yes — bargaining is standard at the Gold and Spice souks. Vendors expect it and price accordingly." },
        { q: "Is the gold genuine?", a: "Gold Souk jewellery is regulated by Dubai authorities and fakes are extremely rare. Be cautious of street sellers outside the souk." },
        { q: "Best souvenirs?", a: "Saffron, frankincense, dates, and Arabian perfume are popular and easy to pack." },
        { q: "How long does the walk take?", a: "Two to three hours for all three souks. Half a day if you shop seriously." },
      ],
    ),
  },

  // ─── 10. Dubai — Jumeirah Beach ────────────────────────────────
  "dubai-jumeirah-beach-walk": {
    ja: ja(UAE_JA_CTA,
      "ジュメイラビーチの朝散歩",
      "ドバイのジュメイラビーチ沿いを早朝に歩く爽やかなルート。バージュ・アル・アラブを眺めながらの海岸散策。",
      img("File:Jumeirah Beach Dubai.jpg", 1280, 854, "ジュメイラビーチ", "白砂が続くジュメイラビーチの朝"),
      [
        img("File:Burj Al Arab from Jumeirah Beach.jpg", 1280, 854, "バージュ・アル・アラブ", "帆の形をした世界的に有名な超高級ホテル"),
        img("File:Jumeirah Mosque Dubai.jpg", 1280, 854, "ジュメイラモスク", "非イスラム教徒も見学可能な美しいモスク"),
        img("File:Kite Beach Dubai.jpg", 1280, 854, "カイトビーチ", "カイトサーフィンやビーチバレーが盛んなビーチ"),
        img("File:La Mer Dubai.jpg", 1280, 854, "ラ・メール", "カフェやブティックが並ぶ海沿いの複合施設"),
        img("File:Jumeirah Beach Park Dubai.jpg", 1280, 854, "ジュメイラビーチパーク", "緑豊かなビーチサイドパーク"),
      ],
      DUBAI_X,
      [
        { heading: "このルートの特徴", body: "ジュメイラビーチはドバイで最も人気のあるパブリックビーチで、白砂の海岸線が数キロにわたって続きます。早朝の散歩では、バージュ・アル・アラブの帆型シルエットを眺めながら、地元のジョガーやヨガグループに交じって歩けます。カイトビーチではカイトサーフィンやビーチバレーを見学でき、ラ・メールではビーチサイドの朝食が楽しめます。" },
        { heading: "アクセスと起点", body: "ジュメイラビーチへはタクシーまたはUberが便利。メトロは少し離れていますが、バスでアクセスも可能。起点はジュメイラビーチパーク付近がおすすめ。ここから南のカイトビーチ方面へ海岸線を歩きます。" },
        { heading: "主要スポット", body: "ジュメイラモスクは非イスラム教徒でも見学可能な数少ないモスクの一つで、ガイド付きツアーが催行されています。カイトビーチはアクティビティが豊富で、カイトサーフィンのレッスンも受けられます。バージュ・アル・アラブは外観だけでも見る価値があり、ビーチからの写真スポットとして最も人気。ラ・メールは2018年にオープンした海沿いの複合施設で、カフェ、ブティック、ウォーターパークがあります。" },
        { heading: "時間帯とタイミング", body: "早朝6〜8時が最適。気温が上がる前に歩けるだけでなく、朝日に照らされるバージュ・アル・アラブが絶景です。冬季（11〜3月）は日中も快適に散歩できます。夏は9時を過ぎると猛暑になるので必ず早朝に。金曜の朝はビーチが比較的空いています。" },
        { heading: "実用情報", body: "ビーチには無料のシャワーとトイレが設置されています。日焼け止め・帽子・サングラスは必須。水を最低1リットルは持参しましょう。ビーチ沿いにはカフェが点在しているので補給も可能。公共ビーチでの服装はビキニ・水着OKですが、ビーチを離れたら肩と膝が隠れる服装に。eSIMがあればUberの手配やカフェの検索がスムーズです。" },
      ],
      [
        { q: "ジュメイラビーチは無料?", a: "パブリックビーチは無料です。シャワー・トイレも無料で利用できます。" },
        { q: "泳げる?", a: "年中泳げます。ライフガードが常駐しているビーチを選びましょう。" },
        { q: "夏の暑さ対策は?", a: "夏場は気温40度超。早朝（6〜8時）に限定し、大量の水と日焼け止めを必ず持参してください。" },
        { q: "所要時間は?", a: "ビーチ散歩だけなら1〜1.5時間。モスク見学やラ・メールでの朝食を含めると3時間程度です。" },
      ],
    ),
    en: en(UAE_EN_CTA,
      "Jumeirah Beach Morning Walk in Dubai",
      "An early-morning stroll along Dubai's finest public beach — Burj Al Arab views, kite surfers, and beachside breakfast.",
      img("File:Jumeirah Beach Dubai.jpg", 1280, 854, "Jumeirah Beach", "White sand stretching along the coast at dawn"),
      [
        img("File:Burj Al Arab from Jumeirah Beach.jpg", 1280, 854, "Burj Al Arab", "The sail-shaped icon of Dubai's skyline"),
        img("File:Jumeirah Mosque Dubai.jpg", 1280, 854, "Jumeirah Mosque", "One of few mosques open to non-Muslim visitors"),
        img("File:Kite Beach Dubai.jpg", 1280, 854, "Kite Beach", "Popular spot for kite surfing and beach volleyball"),
        img("File:La Mer Dubai.jpg", 1280, 854, "La Mer", "Beachside dining and retail complex"),
        img("File:Jumeirah Beach Park Dubai.jpg", 1280, 854, "Jumeirah Beach Park", "Green parkland beside the shore"),
      ],
      DUBAI_X,
      [
        { heading: "What makes this route special", body: "Jumeirah Beach is Dubai's most popular public coastline — kilometres of white sand with the Burj Al Arab as a permanent backdrop. An early-morning walk lets you share the beach with local joggers and yoga groups before the heat sets in. Kite Beach adds a sporty vibe with kite surfers and volleyball courts, and La Mer offers a stylish beachside breakfast scene. It is the relaxed, outdoorsy side of Dubai that most visitors miss." },
        { heading: "Getting there and starting point", body: "Taxi or Uber is the easiest option. The Metro does not reach the beach directly, but buses connect. Start near Jumeirah Beach Park and walk south along the shore towards Kite Beach and the Burj Al Arab." },
        { heading: "Key stops", body: "Jumeirah Mosque is one of the few mosques in Dubai that offers guided tours for non-Muslim visitors — well worth the stop. Kite Beach has kite-surfing lessons and an energetic atmosphere. The Burj Al Arab is best photographed from the beach — no need to go inside. La Mer, opened in 2018, is a beachfront complex with cafés, boutiques, and a water park." },
        { heading: "Best times to visit", body: "Six to eight in the morning is ideal. The temperature is bearable, and the Burj Al Arab catches beautiful morning light. Winter (November to March) is comfortable all day. In summer, the heat becomes fierce by nine — morning walks are the only option. Friday mornings tend to be quieter." },
        { heading: "Practical tips", body: "Free public showers and restrooms on the beach. Sunscreen, hat, and sunglasses are essential. Bring at least a litre of water. Cafés are spaced along the beach for top-ups. Swimwear is fine on the beach, but cover shoulders and knees when you leave. An eSIM makes it easy to call an Uber and search for nearby cafés." },
      ],
      [
        { q: "Is Jumeirah Beach free?", a: "The public beach is free, including showers and restrooms." },
        { q: "Can I swim?", a: "Yes, year-round. Choose a section with lifeguards on duty." },
        { q: "How do I handle summer heat?", a: "Summer exceeds 40 degrees. Limit walks to early morning (6–8 am) and carry plenty of water and sun protection." },
        { q: "How long does the walk take?", a: "One to one and a half hours for the beach walk. About three hours with a mosque visit and breakfast at La Mer." },
      ],
    ),
  },

  // ─── 11. Tel Aviv — Jaffa ──────────────────────────────────────
  "tel-aviv-jaffa-walk": {
    ja: ja(IL_JA_CTA,
      "ヤッフォの旧市街と港散策",
      "テルアビブ南部の古代都市ヤッフォを歩く。4000年の歴史が残る石畳の路地と地中海の港を巡るルートガイド。",
      img("File:Old Jaffa Tel Aviv.jpg", 1280, 854, "旧市街ヤッフォ", "地中海を見下ろすヤッフォの丘の上の旧市街"),
      [
        img("File:Jaffa Port Tel Aviv.jpg", 1280, 854, "ヤッフォ港", "古代から続く地中海沿いの港"),
        img("File:Jaffa Clock Tower.jpg", 1280, 854, "時計塔", "1903年建造のオスマン帝国時代の時計塔"),
        img("File:Jaffa Flea Market.jpg", 1280, 854, "フリーマーケット", "ヴィンテージ家具やアンティークが並ぶ市場"),
        img("File:St Peter Church Jaffa.jpg", 1280, 854, "聖ペテロ教会", "港を見下ろすフランシスコ会の教会"),
        img("File:HaPisgah Garden Jaffa.jpg", 1280, 854, "ハピスガ庭園", "テルアビブのスカイラインを一望する丘の上の庭園"),
      ],
      TEL_AVIV_X,
      [
        { heading: "このルートの特徴", body: "ヤッフォ（ジャッファ）は4000年以上の歴史を持つ古代港湾都市で、テルアビブの南端に位置します。石畳の路地にはアーティストのギャラリーやスタジオが入り、地中海を見渡す丘の上には古代の遺跡と教会が立っています。フリーマーケットエリアにはヴィンテージショップやカフェが集まり、モダンなテルアビブとは全く異なる雰囲気。ユダヤ、キリスト、イスラムの歴史が層をなす独特の場所です。" },
        { heading: "アクセスと起点", body: "テルアビブ中心部からバスまたはタクシーで約15分。ライトレール（LRT）のヤッフォ停留所も利用可能。起点は時計塔が目印。1903年にオスマン帝国スルタンの即位記念に建てられた時計塔から、丘の上の旧市街方面へ歩き始めましょう。" },
        { heading: "主要スポット", body: "ハピスガ庭園は丘の頂上にある小さな公園で、テルアビブのスカイラインと地中海の絶景が楽しめます。聖ペテロ教会はナポレオンも立ち寄ったとされるフランシスコ会の教会。ヤッフォ港は現在も小規模な漁港として機能し、港沿いのレストランでシーフードが楽しめます。フリーマーケットエリアは金・土曜が特に賑わい、アンティーク家具や中東雑貨が見つかります。" },
        { heading: "時間帯とタイミング", body: "午前中の柔らかい光が石畳の路地を美しく照らします。フリーマーケットは金曜の午前中が活気があります。土曜（安息日シャバット）は多くの店が閉まりますが、旧市街自体の散策は可能。夕方にはヤッフォ港からの地中海の夕日が絶景です。" },
        { heading: "実用情報", body: "石畳は滑りやすいので歩きやすい靴が必須。坂道が多いですがエリアはコンパクトです。トイレは時計塔付近の公衆トイレかカフェで。宗教施設を訪問する際は肩と膝が隠れる服装を。水を持参し、夏場は帽子と日焼け止めも。eSIMがあれば旧市街の入り組んだ路地でもマップアプリでナビゲートできます。" },
      ],
      [
        { q: "ヤッフォの治安は?", a: "日中は観光客が多く安全です。夜間も港周辺のレストランエリアは人通りがありますが、暗い路地は避けましょう。" },
        { q: "フリーマーケットは毎日?", a: "店舗は日〜木曜に営業。屋外の露店は金曜午前が最も賑わいます。土曜はシャバットで多くが休みです。" },
        { q: "テルアビブ中心部から遠い?", a: "海岸沿いの遊歩道を歩いても30〜40分。バスやタクシーなら15分程度です。" },
        { q: "所要時間は?", a: "2〜3時間で旧市街と港を回れます。フリーマーケットとランチを含めると半日です。" },
      ],
    ),
    en: en(IL_EN_CTA,
      "Jaffa Old City and Port Walk in Tel Aviv",
      "Explore one of the world's oldest port cities — 4,000 years of history, artist studios, and Mediterranean sunsets south of Tel Aviv.",
      img("File:Old Jaffa Tel Aviv.jpg", 1280, 854, "Old Jaffa", "The hilltop old city overlooking the Mediterranean"),
      [
        img("File:Jaffa Port Tel Aviv.jpg", 1280, 854, "Jaffa Port", "Ancient harbour still used by local fishermen"),
        img("File:Jaffa Clock Tower.jpg", 1280, 854, "Clock Tower", "Ottoman-era clock tower built in 1903"),
        img("File:Jaffa Flea Market.jpg", 1280, 854, "Flea Market", "Vintage furniture and antiques market"),
        img("File:St Peter Church Jaffa.jpg", 1280, 854, "St Peter's Church", "Franciscan church overlooking the port"),
        img("File:HaPisgah Garden Jaffa.jpg", 1280, 854, "HaPisgah Garden", "Hilltop garden with Tel Aviv skyline views"),
      ],
      TEL_AVIV_X,
      [
        { heading: "What makes this route special", body: "Jaffa is one of the oldest continuously inhabited ports in the world — over 4,000 years of history compressed into a hilltop of stone alleys. Today those alleys house artist studios, galleries, and small restaurants, while the ancient harbour still shelters fishing boats. The flea-market quarter adds vintage shops and trendy cafés. Walking from the Ottoman clock tower to the hilltop garden, you cross layers of Jewish, Christian, and Islamic heritage that make this place unlike anywhere else in Tel Aviv." },
        { heading: "Getting there and starting point", body: "Bus or taxi from central Tel Aviv takes about 15 minutes. The light rail (LRT) stops at Jaffa. Start at the clock tower — built in 1903 to mark the Ottoman Sultan's jubilee — and climb towards the old city on the hill." },
        { heading: "Key stops", body: "HaPisgah Garden at the summit offers panoramic views of the Tel Aviv skyline and the Mediterranean. St Peter's Church is a Franciscan building reputedly visited by Napoleon. Jaffa Port still functions as a small fishing harbour, and waterfront restaurants serve fresh seafood. The flea-market area is liveliest on Friday mornings, with antique furniture, Middle Eastern crafts, and street food." },
        { heading: "Best times to visit", body: "Morning light is loveliest on the stone alleys. The flea market peaks on Friday mornings. Saturday (Shabbat) closes most shops, but the old city is still walkable. Evening brings a spectacular Mediterranean sunset from the port." },
        { heading: "Practical tips", body: "Wear comfortable shoes — cobblestones are slippery. The area is hilly but compact. Restrooms near the clock tower or in cafés. Dress modestly at religious sites — cover shoulders and knees. Carry water and sunscreen in summer. An eSIM helps you navigate the maze of old-city lanes with a maps app." },
      ],
      [
        { q: "Is Jaffa safe?", a: "Daytime is very safe with plenty of tourists. At night, stick to the port restaurant area and avoid dark alleys." },
        { q: "Is the flea market open daily?", a: "Shops are open Sunday to Thursday. Friday morning is the busiest outdoor market day. Most shops close on Saturday for Shabbat." },
        { q: "How far is it from central Tel Aviv?", a: "A 30-to-40-minute walk along the seafront promenade, or about 15 minutes by bus or taxi." },
        { q: "How long does the walk take?", a: "Two to three hours for the old city and port. Half a day with the flea market and lunch." },
      ],
    ),
  },

  // ─── 12. Tel Aviv — Neve Tzedek ────────────────────────────────
  "tel-aviv-neve-tzedek-walk": {
    ja: ja(IL_JA_CTA,
      "ネヴェツェデクのカフェとギャラリー",
      "テルアビブ最古の住宅地ネヴェツェデク。パステルカラーの建物とブティックカフェが並ぶおしゃれ散策ルート。",
      img("File:Neve Tzedek Tel Aviv.jpg", 1280, 854, "ネヴェツェデク", "パステルカラーの建物が並ぶネヴェツェデクの通り"),
      [
        img("File:Suzanne Dellal Centre Tel Aviv.jpg", 1280, 854, "スザンヌ・ダラル・センター", "コンテンポラリーダンスの殿堂"),
        img("File:Shabazi Street Neve Tzedek.jpg", 1280, 854, "シャバジストリート", "ブティックとカフェのメインストリート"),
        img("File:Neve Tzedek Tower Tel Aviv.jpg", 1280, 854, "ネヴェツェデクタワー", "地区を見渡すモダンな高層ビル"),
        img("File:Gutman Museum Tel Aviv.jpg", 1280, 854, "ナフム・グートマン美術館", "イスラエルの著名画家の作品を展示"),
        img("File:Neve Tzedek streets.jpg", 1280, 854, "裏通り", "花が咲き乱れる静かな住宅街"),
      ],
      TEL_AVIV_X,
      [
        { heading: "このルートの特徴", body: "ネヴェツェデクは1887年に設立されたテルアビブ最初の住宅地で、「正義の大地」を意味します。1990年代まで荒廃していましたが、リノベーションによってテルアビブで最もおしゃれなエリアに生まれ変わりました。低層のパステルカラーの建物にブティック、ギャラリー、カフェが入り、裏通りにはブーゲンビリアが咲き乱れる静かな住宅街が広がります。" },
        { heading: "アクセスと起点", body: "テルアビブ中心部から徒歩20分。バスやLRTでもアクセス可能。起点はスザンヌ・ダラル・センター（コンテンポラリーダンスの劇場）の広場が便利。ここからシャバジストリートに向かって歩き始めましょう。" },
        { heading: "主要スポット", body: "シャバジストリートはネヴェツェデクのメインストリートで、デザイナーズブティック、ジュエリーショップ、スペシャルティコーヒー店が並びます。スザンヌ・ダラル・センターはバットシェバ舞踊団の本拠地で、公演がなくても中庭のカフェは訪問可能。ナフム・グートマン美術館はイスラエル建国期を描いた画家の作品を展示。裏通りを歩けば、花に覆われたバルコニーやオスマン帝国時代の建築の名残を見つけられます。" },
        { heading: "時間帯とタイミング", body: "午前中のカフェは比較的空いていて、ゆっくりブランチを楽しめます。シャバジストリートの店舗は10時頃から開店。午後はギャラリーや美術館を回るのに最適。夕方はバーやレストランが賑わい始めます。土曜（シャバット）は店舗が休みのところが多いですが、散策自体は楽しめます。" },
        { heading: "実用情報", body: "エリアはコンパクトで平坦、歩きやすいです。トイレはスザンヌ・ダラル・センターやカフェで。クレジットカードがほとんどの店で使えます。夏場は日差しが強いので帽子と日焼け止めを。eSIMがあればカフェのレビューやギャラリーの展覧会情報をすぐに確認できます。" },
      ],
      [
        { q: "ネヴェツェデクの見どころは?", a: "シャバジストリートのブティックとカフェ巡り、スザンヌ・ダラル・センターの建築、裏通りの散策が主な楽しみ方です。" },
        { q: "ヤッフォとどちらを先に回る?", a: "ネヴェツェデクとヤッフォは隣接しています。午前にネヴェツェデク、午後にヤッフォという流れがおすすめです。" },
        { q: "食事のおすすめは?", a: "シャバジストリートにはイスラエル料理のモダンレストランやカフェが充実。シャクシューカやフムスが定番です。" },
        { q: "所要時間は?", a: "1.5〜2時間でメインスポットを回れます。カフェやショッピングを楽しむなら3時間は見てください。" },
      ],
    ),
    en: en(IL_EN_CTA,
      "Neve Tzedek Café and Gallery Walk in Tel Aviv",
      "Tel Aviv's first neighbourhood, reborn — pastel buildings, designer boutiques, and speciality coffee on quiet tree-lined streets.",
      img("File:Neve Tzedek Tel Aviv.jpg", 1280, 854, "Neve Tzedek", "Pastel-painted buildings on a quiet street"),
      [
        img("File:Suzanne Dellal Centre Tel Aviv.jpg", 1280, 854, "Suzanne Dellal Centre", "Home of contemporary dance in Israel"),
        img("File:Shabazi Street Neve Tzedek.jpg", 1280, 854, "Shabazi Street", "Main boutique and café strip"),
        img("File:Neve Tzedek Tower Tel Aviv.jpg", 1280, 854, "Neve Tzedek Tower", "Modern tower overlooking the historic quarter"),
        img("File:Gutman Museum Tel Aviv.jpg", 1280, 854, "Nahum Gutman Museum", "Works by one of Israel's founding-era artists"),
        img("File:Neve Tzedek streets.jpg", 1280, 854, "Back streets", "Bougainvillea-draped residential lanes"),
      ],
      TEL_AVIV_X,
      [
        { heading: "What makes this route special", body: "Neve Tzedek — meaning 'oasis of justice' — was Tel Aviv's first residential neighbourhood, founded in 1887. Neglected for decades, it was revitalised in the 1990s and is now the city's most fashionable quarter. Low-rise pastel buildings house designer boutiques, galleries, and speciality cafés, while side streets are quiet and draped in bougainvillea. It is the antithesis of Tel Aviv's loud, beachy reputation." },
        { heading: "Getting there and starting point", body: "A 20-minute walk from central Tel Aviv, or a short bus or light-rail ride. Start at Suzanne Dellal Centre — the contemporary-dance venue whose courtyard is a pleasant gathering point. From there, walk towards Shabazi Street." },
        { heading: "Key stops", body: "Shabazi Street is the main artery, lined with designer clothing shops, jewellery stores, and third-wave coffee roasters. Suzanne Dellal Centre is home to the Batsheva Dance Company — the courtyard café is open even when no show is on. Nahum Gutman Museum showcases paintings of early Tel Aviv. Explore the back streets for flower-covered balconies and remnants of Ottoman-era architecture." },
        { heading: "Best times to visit", body: "Morning cafés are quieter and great for a leisurely brunch. Shops on Shabazi open around ten. Afternoons suit gallery and museum visits. Evenings bring a lively bar and restaurant scene. Saturday (Shabbat) closes many shops, but the streetscape is still enjoyable." },
        { heading: "Practical tips", body: "The area is compact and flat. Restrooms at Suzanne Dellal Centre or in cafés. Most shops accept credit cards. Summer sun is strong — wear a hat and sunscreen. An eSIM helps you check café reviews and gallery exhibitions on the go." },
      ],
      [
        { q: "What are the highlights?", a: "Boutique shopping and café-hopping on Shabazi Street, the Suzanne Dellal Centre architecture, and quiet back-street strolls." },
        { q: "Should I visit Jaffa or Neve Tzedek first?", a: "They are adjacent. Morning in Neve Tzedek, afternoon in Jaffa works well." },
        { q: "Where to eat?", a: "Modern Israeli restaurants and cafés line Shabazi Street. Try shakshuka or hummus." },
        { q: "How long does the walk take?", a: "One and a half to two hours for the main sights. Three hours with café stops and shopping." },
      ],
    ),
  },

  // ─── 13. Doha — Souq Waqif ─────────────────────────────────────
  "doha-souq-waqif-walk": {
    ja: ja(QA_JA_CTA,
      "スークワキフの伝統市場散策",
      "ドーハ旧市街のスークワキフを歩く。スパイス、テキスタイル、鷹の市場が連なるカタールの伝統的な商業地区。",
      img("File:Souq Waqif Doha.jpg", 1280, 854, "スークワキフ", "伝統的な建築が復元されたスークワキフの通り"),
      [
        img("File:Falcon Souq Doha.jpg", 1280, 854, "ファルコンスーク", "鷹と鷹匠用品を扱う世界でも珍しい市場"),
        img("File:Souq Waqif spices Doha.jpg", 1280, 854, "スパイス売り場", "色鮮やかなスパイスが並ぶ通路"),
        img("File:Souq Waqif Art Centre Doha.jpg", 1280, 854, "アートセンター", "スーク内のギャラリースペース"),
        img("File:Msheireb Museums Doha.jpg", 1280, 854, "ムシェイレブ博物館", "カタールの歴史と近代化を展示する博物館群"),
        img("File:Corniche Doha night.jpg", 1280, 854, "コーニッシュ", "スークワキフからも近い海岸沿いの遊歩道"),
      ],
      DOHA_X,
      [
        { heading: "このルートの特徴", body: "スークワキフはドーハで最も歴史のある市場で、ベドウィンの遊牧民が羊毛や農産物を売りに来たことが名前の由来です。2006年に大規模修復されましたが、伝統的な泥壁と木造の建築様式が忠実に再現されています。スパイス、テキスタイル、アラビアンパフューム、そして世界的にも珍しいファルコンスーク（鷹市場）があり、カタールの文化と伝統を最も身近に感じられる場所です。" },
        { heading: "アクセスと起点", body: "ドーハメトロのスークワキフ駅から直結。起点はメイン入口のアルスーク通り側がわかりやすいです。スパイスエリアからスタートし、テキスタイル、ファルコンスーク、レストランエリアと時計回りに回るのが効率的。" },
        { heading: "主要スポット", body: "ファルコンスークは鷹と鷹匠用品を専門に扱う市場で、鷹の病院まで併設されています。スパイスエリアではサフラン、カルダモン、ローズウォーター、乳香が手に入ります。アートセンターではカタール人アーティストの作品を展示。夜はアラビアンコーヒーとシーシャを楽しめるカフェテラスが人気。隣接するムシェイレブ博物館群では石油発見前のカタールの暮らしを学べます。" },
        { heading: "時間帯とタイミング", body: "午前9時〜12時は比較的空いています。16時以降は地元住民や観光客で賑わい始め、夜のスークが最も雰囲気があります。金曜は午後からの営業。ラマダン期間中は日没後のイフタール（断食明け食事）で特に賑わいます。夏場（5〜9月）は日中の気温が50度近くになるので夜間訪問が基本です。" },
        { heading: "実用情報", body: "エアコン完備の屋内セクションと、風通しの良い屋外セクションがあります。トイレはスーク内に数カ所。値段交渉はスパイスやテキスタイルでは一般的。レストランは固定価格です。カタールでは公共の場での飲酒は禁止。服装は肩と膝が隠れるものが望ましいです。eSIMがあれば店舗情報や翻訳アプリをその場で活用できます。" },
      ],
      [
        { q: "スークワキフの営業時間は?", a: "店舗により異なりますが、概ね9時〜12時、16時〜22時。金曜は午後のみ。レストランは深夜まで営業。" },
        { q: "ファルコンスークは見学だけでも?", a: "はい、見学は無料です。鷹との写真撮影も可能な場合があります（店舗の許可を取ってから）。" },
        { q: "おすすめのお土産は?", a: "サフラン、アラビアンパフューム（ウード）、カタール産のデーツ、伝統的なアラビアンコーヒーポットが人気です。" },
        { q: "夏でも行ける?", a: "屋外は50度近くになるため、夕方〜夜の訪問をおすすめします。スーク内のエアコン付きセクションなら日中も快適です。" },
        { q: "所要時間は?", a: "スーク全体をゆっくり回って2〜3時間。レストランでの食事を含めると半日です。" },
      ],
    ),
    en: en(QA_EN_CTA,
      "Souq Waqif Traditional Market Walk in Doha",
      "Doha's restored heritage market — spices, textiles, a falcon souk, and Arabian coffee under traditional mud-and-timber architecture.",
      img("File:Souq Waqif Doha.jpg", 1280, 854, "Souq Waqif", "Restored traditional-style streets of the souq"),
      [
        img("File:Falcon Souq Doha.jpg", 1280, 854, "Falcon Souq", "One of the world's few markets dedicated to falconry"),
        img("File:Souq Waqif spices Doha.jpg", 1280, 854, "Spice section", "Vibrant displays of spices and herbs"),
        img("File:Souq Waqif Art Centre Doha.jpg", 1280, 854, "Art Centre", "Gallery space inside the souq"),
        img("File:Msheireb Museums Doha.jpg", 1280, 854, "Msheireb Museums", "Museum complex on Qatar's history and modernisation"),
        img("File:Corniche Doha night.jpg", 1280, 854, "Corniche", "Waterfront promenade near the souq"),
      ],
      DOHA_X,
      [
        { heading: "What makes this route special", body: "Souq Waqif is Doha's oldest marketplace, named after the Bedouin traders who once stood here selling wool and produce. Extensively restored in 2006, it faithfully recreates the mud-and-timber architecture of the original market. The souq sells spices, textiles, Arabian perfumes, and — unusually — falcons and falconry equipment. It is the most immersive way to experience Qatari heritage in a city of glass towers." },
        { heading: "Getting there and starting point", body: "Doha Metro's Souq Waqif station is directly connected. Enter from the Al Souq Street side. Start in the spice section and loop clockwise through textiles, the Falcon Souq, and the restaurant quarter." },
        { heading: "Key stops", body: "The Falcon Souq sells live falcons and all the equipment a falconer needs — there is even a falcon hospital attached. The spice section offers saffron, cardamom, rosewater, and frankincense. The Art Centre showcases Qatari contemporary artists. After dark, terrace cafés serve Arabian coffee and shisha. The adjacent Msheireb Museums document Qatari life before the oil era." },
        { heading: "Best times to visit", body: "Morning (9 am to noon) is quieter. The souq comes alive after 4 pm when locals and visitors arrive, and evening is the most atmospheric time. Fridays are afternoon-only. During Ramadan, the post-iftar buzz is exceptional. In summer (May to September) daytime temperatures approach 50 degrees — visit at night." },
        { heading: "Practical tips", body: "The souq has both air-conditioned indoor sections and open-air passages. Restrooms are at several points. Bargaining is normal for spices and textiles; restaurants have fixed prices. Public alcohol consumption is prohibited in Qatar. Dress to cover shoulders and knees. An eSIM lets you use translation and shop-finder apps on the spot." },
      ],
      [
        { q: "What are the opening hours?", a: "Roughly 9 am to noon and 4 pm to 10 pm — varies by shop. Fridays afternoon only. Restaurants stay open late." },
        { q: "Can I just look at the falcons?", a: "Yes — browsing is free. You may be able to photograph a falcon with the shopkeeper's permission." },
        { q: "Best souvenirs?", a: "Saffron, Arabian oud perfume, Qatari dates, and a traditional Arabian coffee pot." },
        { q: "Is it open in summer?", a: "Outdoor areas hit nearly 50 degrees, so visit in the evening. Air-conditioned sections are comfortable by day." },
        { q: "How long does the walk take?", a: "Two to three hours for a thorough browse. Half a day including a restaurant meal." },
      ],
    ),
  },

  // ─── 14. Nairobi — Karen ───────────────────────────────────────
  "nairobi-karen-walk": {
    ja: ja(KE_JA_CTA,
      "カレン地区のカフェと自然散策",
      "ナイロビ郊外のカレン地区を歩く。キリンセンター、カレン・ブリクセン博物館、緑豊かなカフェを巡るルート。",
      img("File:Karen Blixen Museum Nairobi.jpg", 1280, 854, "カレン・ブリクセン博物館", "映画『愛と哀しみの果て』の舞台となった邸宅"),
      [
        img("File:Giraffe Centre Nairobi.jpg", 1280, 854, "キリンセンター", "絶滅危惧種のロスチャイルドキリンに餌やり体験"),
        img("File:Karen Blixen Coffee Garden.jpg", 1280, 854, "カレン・ブリクセン・コーヒーガーデン", "旧農場を改装したレストランとカフェ"),
        img("File:Ngong Hills Nairobi.jpg", 1280, 854, "ンゴング丘陵", "カレンから望むンゴング丘陵のシルエット"),
        img("File:Kazuri Beads Nairobi.jpg", 1280, 854, "カズリビーズ工房", "ケニアの女性が手作りするセラミックビーズ"),
        img("File:Karen shopping centre.jpg", 1280, 854, "カレンショッピングセンター", "カフェやギャラリーが入るモダンなショッピングモール"),
      ],
      NAIROBI_X,
      [
        { heading: "このルートの特徴", body: "カレン地区はナイロビ中心部から南西約15kmに位置する緑豊かな郊外エリアで、デンマーク人作家カレン・ブリクセン（ペンネーム：イサク・ディネセン）がコーヒー農園を営んでいたことで知られます。映画『愛と哀しみの果て（Out of Africa）』の舞台として世界的に有名になりました。現在はナイロビの高級住宅地で、カフェ、ギャラリー、自然体験施設が点在する落ち着いた散策エリアです。" },
        { heading: "アクセスと起点", body: "ナイロビCBDからタクシーまたはUberで約30〜40分（交通状況による）。マタトゥ（乗合バス）でもアクセス可能ですが、初めてならUberが安全で便利。起点はカレン・ブリクセン博物館がおすすめ。午前中に博物館を見学してから周辺を回りましょう。" },
        { heading: "主要スポット", body: "カレン・ブリクセン博物館は彼女が1917〜1931年に暮らした邸宅で、映画に登場する調度品が残っています。キリンセンター（AFEW Giraffe Centre）では絶滅危惧種のロスチャイルドキリンに目の前で餌やりができ、子供から大人まで大人気。カズリビーズ工房ではケニアの女性たちが手作りするセラミックビーズの製造工程を見学・購入できます。カレン・ブリクセン・コーヒーガーデンは旧農場跡地のレストランで、庭園ランチが楽しめます。" },
        { heading: "時間帯とタイミング", body: "午前中のキリンセンターが最も混みにくいです（9〜10時が開場直後）。博物館は終日営業。ランチはカレン・ブリクセン・コーヒーガーデンかカレンショッピングセンター内のカフェで。午後は日差しが強くなるので、カフェで休憩しながらゆっくり回るのがおすすめ。雨季（3〜5月、10〜12月）は午後にスコールがあるので折りたたみ傘を持参。" },
        { heading: "実用情報", body: "カレン地区内は車社会で、スポット間の移動はUberやタクシーが便利。徒歩で回れる範囲は限られますが、各施設の敷地内は歩いて楽しめます。トイレは各施設内にあります。ケニアシリングの現金も持参しておくとお土産購入に便利。eSIMがあればUber手配や施設の営業時間確認がスムーズです。ナイロビは赤道直下ですが標高約1700mのため日中も涼しく過ごせます。" },
      ],
      [
        { q: "キリンセンターの入場料は?", a: "外国人は約1500ケニアシリング（約15ドル）。事前のオンライン予約がおすすめです。" },
        { q: "カレン地区の治安は?", a: "ナイロビの中では安全な高級住宅地エリアです。ただし夜間の一人歩きは避け、移動はUberを利用しましょう。" },
        { q: "子連れにおすすめ?", a: "キリンセンターは子供に大人気。カレン・ブリクセン博物館の庭園も広く、家族連れに適しています。" },
        { q: "所要時間は?", a: "博物館とキリンセンターで3〜4時間。ランチとカフェ巡りを含めると半日〜1日です。" },
      ],
    ),
    en: en(KE_EN_CTA,
      "Karen District Café and Nature Walk in Nairobi",
      "Explore Nairobi's leafy Karen suburb — the Giraffe Centre, Karen Blixen Museum, and garden cafés at the foot of the Ngong Hills.",
      img("File:Karen Blixen Museum Nairobi.jpg", 1280, 854, "Karen Blixen Museum", "The farmhouse made famous by Out of Africa"),
      [
        img("File:Giraffe Centre Nairobi.jpg", 1280, 854, "Giraffe Centre", "Hand-feed endangered Rothschild's giraffes"),
        img("File:Karen Blixen Coffee Garden.jpg", 1280, 854, "Karen Blixen Coffee Garden", "Restaurant and café on the former farm grounds"),
        img("File:Ngong Hills Nairobi.jpg", 1280, 854, "Ngong Hills", "The hills silhouetted beyond Karen"),
        img("File:Kazuri Beads Nairobi.jpg", 1280, 854, "Kazuri Beads", "Handmade ceramic beads by Kenyan women"),
        img("File:Karen shopping centre.jpg", 1280, 854, "Karen shopping centre", "Modern mall with cafés and galleries"),
      ],
      NAIROBI_X,
      [
        { heading: "What makes this route special", body: "Karen is a leafy suburb about 15 kilometres southwest of Nairobi's centre, named after Danish author Karen Blixen who ran a coffee farm here from 1917 to 1931. The film Out of Africa put it on the world map. Today it is an upscale residential area dotted with cafés, galleries, and nature attractions — a calm counterpoint to the bustle of the city centre and a favourite half-day escape for visitors." },
        { heading: "Getting there and starting point", body: "Taxi or Uber from the CBD takes 30 to 40 minutes depending on traffic. Matatus (shared minibuses) also run to Karen, but Uber is safer and more convenient for first-timers. Start at the Karen Blixen Museum — visit in the morning before it gets busy, then move to the other stops." },
        { heading: "Key stops", body: "The Karen Blixen Museum is the farmhouse where she lived, still furnished with items from the film era. The AFEW Giraffe Centre lets you hand-feed endangered Rothschild's giraffes from an elevated platform — a highlight for all ages. Kazuri Beads is a workshop where Kenyan women handcraft ceramic beads; you can watch the process and buy directly. Karen Blixen Coffee Garden, on the old farm grounds, is a lovely spot for a garden lunch." },
        { heading: "Best times to visit", body: "The Giraffe Centre is quietest right at opening (9–10 am). The museum is open all day. Lunch at the Coffee Garden or one of Karen's modern café-malls. Afternoon sun can be strong, so pace yourself with coffee breaks. The rainy seasons (March to May, October to December) bring afternoon showers — carry a compact umbrella." },
        { heading: "Practical tips", body: "Karen is car-dependent — Uber between stops. Walking is enjoyable within each venue's grounds but not between them. Restrooms at all major attractions. Carry some Kenyan shillings for souvenirs and tips. An eSIM makes Uber booking and opening-hours checks seamless. Nairobi sits at about 1,700 metres, so despite being on the equator the climate is pleasantly cool." },
      ],
      [
        { q: "How much is the Giraffe Centre?", a: "About 1,500 Kenyan shillings (around 15 US dollars) for foreigners. Online booking is recommended." },
        { q: "Is Karen safe?", a: "It is one of Nairobi's safest suburbs. Use Uber for transport and avoid walking alone after dark." },
        { q: "Good for families?", a: "The Giraffe Centre is a huge hit with kids. The museum gardens are spacious and family-friendly." },
        { q: "How long does the visit take?", a: "Three to four hours for the museum and Giraffe Centre. A half to full day with lunch and café stops." },
      ],
    ),
  },

  // ─── 15. Cairo — Islamic Quarter ───────────────────────────────
  "cairo-islamic-quarter-walk": {
    ja: ja(EG_JA_CTA,
      "イスラム地区のモスクとバザール散策",
      "カイロ旧市街のイスラム地区を歩く。中世のモスク、マドラサ、ハンハリーリバザールを巡る世界遺産散策ルート。",
      img("File:Al-Muizz Street Cairo.jpg", 1280, 854, "ムイッズ通り", "中世イスラム建築が両側に並ぶカイロ旧市街のメインストリート"),
      [
        img("File:Khan el-Khalili Cairo.jpg", 1280, 854, "ハンハリーリ", "14世紀から続くカイロ最大のバザール"),
        img("File:Al-Azhar Mosque Cairo.jpg", 1280, 854, "アズハルモスク", "970年創建の世界最古の大学の一つ"),
        img("File:Sultan Hassan Mosque Cairo.jpg", 1280, 854, "スルタン・ハサン・モスク", "14世紀マムルーク朝の壮大なモスク"),
        img("File:Bab Zuweila Cairo.jpg", 1280, 854, "ズウェイラ門", "11世紀ファーティマ朝の城門"),
        img("File:Al-Muizz Street lamp Cairo.jpg", 1280, 854, "ランプ職人", "ムイッズ通りの伝統的な金属細工ランプ"),
      ],
      CAIRO_X,
      [
        { heading: "このルートの特徴", body: "カイロのイスラム地区（ヒストリック・カイロ）はユネスコ世界遺産に登録されており、7世紀から19世紀にかけて建てられた数百のモスク、マドラサ（神学校）、廟が密集しています。中心を貫くムイッズ通り（アル・ムイッズ・リディン・イッラー通り）は「屋外博物館」と呼ばれ、ファーティマ朝、アイユーブ朝、マムルーク朝の壮麗な建築が連なります。ハンハリーリバザールでは14世紀から続く商業活動を肌で感じられます。" },
        { heading: "アクセスと起点", body: "カイロメトロのアタバ駅から徒歩10分。タクシーやUberでアズハルモスク付近まで行くのも便利。起点はバブ・アル・フトゥーフ門（北門）から南に向かって歩くのが歴史的な順路ですが、混雑を避けるならアズハルモスクを起点に周辺を回るのもおすすめです。" },
        { heading: "主要スポット", body: "アズハルモスクは970年にファーティマ朝が創建した世界最古級の大学で、現在も神学の最高学府として機能。ムイッズ通り沿いにはカラウーン複合施設（モスク・病院・マドラサ）が並び、マムルーク建築の粋が見られます。スルタン・ハサン・モスクは14世紀の巨大モスクで、内部の空間スケールに圧倒されます。ハンハリーリバザールではスパイス、金銀細工、ランプ、パピルスなどの伝統的な土産物が手に入ります。ズウェイラ門は11世紀のファーティマ朝の城門で、塔に登るとイスラム地区を一望できます。" },
        { heading: "時間帯とタイミング", body: "午前中はモスクの見学に最適で、光が内部に差し込む時間帯が美しいです。バザールは10時頃から活気づきます。金曜の正午は大礼拝のためモスク見学は避けてください。夏場（6〜9月）は気温40度超になるため、朝8時のスタートが必須。冬季（11〜2月）は日中も快適に歩けます。ラマダン期間中は日没後にバザールが特に賑わいます。" },
        { heading: "実用情報", body: "モスクの入場は無料ですが、靴を脱ぐ必要があります。女性はスカーフで髪を覆い、男女とも長袖・長ズボンが望ましいです。トイレはモスク付属のものが利用可能。バザールでは値段交渉が基本で、最初の提示価格から50%以上の値引きも珍しくありません。水を常に持参。eSIMがあれば翻訳アプリやマップが使え、入り組んだ路地でも迷いにくくなります。交通渋滞が激しいので、帰りは時間に余裕を持ちましょう。" },
      ],
      [
        { q: "イスラム地区の治安は?", a: "日中は観光客も多く概ね安全です。ただし混雑した場所ではスリに注意。夜間は暗い路地を避け、大通りを歩きましょう。" },
        { q: "モスクの見学に入場料は?", a: "ほとんどのモスクは無料です。靴を脱ぎ、肌の露出を控えた服装で訪問してください。" },
        { q: "ハンハリーリの買い物のコツは?", a: "値段交渉は必須。複数の店で相場を確認してから購入しましょう。急かされても慌てず、歩き去るのも交渉テクニックです。" },
        { q: "所要時間は?", a: "ムイッズ通りとバザールで3〜4時間。モスクをじっくり見るなら半日〜1日は必要です。" },
        { q: "ガイドは必要?", a: "英語ガイドを雇うと歴史的背景の理解が深まります。アズハルモスク周辺で公認ガイドを見つけられます。" },
      ],
    ),
    en: en(EG_EN_CTA,
      "Islamic Quarter Mosque and Bazaar Walk in Cairo",
      "Walk through UNESCO-listed Historic Cairo — medieval mosques, Mamluk architecture, and the 14th-century Khan el-Khalili bazaar.",
      img("File:Al-Muizz Street Cairo.jpg", 1280, 854, "Al-Muizz Street", "Medieval Islamic architecture lining Cairo's most historic street"),
      [
        img("File:Khan el-Khalili Cairo.jpg", 1280, 854, "Khan el-Khalili", "Cairo's largest bazaar, trading since the 14th century"),
        img("File:Al-Azhar Mosque Cairo.jpg", 1280, 854, "Al-Azhar Mosque", "One of the world's oldest universities, founded 970 CE"),
        img("File:Sultan Hassan Mosque Cairo.jpg", 1280, 854, "Sultan Hassan Mosque", "Monumental 14th-century Mamluk mosque"),
        img("File:Bab Zuweila Cairo.jpg", 1280, 854, "Bab Zuweila", "11th-century Fatimid city gate"),
        img("File:Al-Muizz Street lamp Cairo.jpg", 1280, 854, "Lamp workshop", "Traditional metalwork lamps on Al-Muizz Street"),
      ],
      CAIRO_X,
      [
        { heading: "What makes this route special", body: "Historic Cairo's Islamic quarter is a UNESCO World Heritage Site containing hundreds of mosques, madrasas, and mausoleums built between the seventh and nineteenth centuries. Al-Muizz Street, the main artery, is often called an open-air museum — Fatimid, Ayyubid, and Mamluk masterpieces line both sides. Khan el-Khalili, the bazaar at its heart, has been trading continuously since the fourteenth century. This walk is one of the densest architectural experiences in the world." },
        { heading: "Getting there and starting point", body: "Ataba Metro station is a 10-minute walk. A taxi or Uber to Al-Azhar Mosque is also convenient. The historical route starts at Bab al-Futuh gate in the north and walks south, but starting at Al-Azhar and exploring outward is an easier option for avoiding crowds." },
        { heading: "Key stops", body: "Al-Azhar Mosque, founded by the Fatimids in 970 CE, is one of the world's oldest universities and still functions as a centre of Islamic scholarship. The Qalawun complex on Al-Muizz Street combines a mosque, hospital, and madrasa in soaring Mamluk architecture. Sultan Hassan Mosque is a colossal fourteenth-century structure whose interior scale is breathtaking. Khan el-Khalili sells spices, gold and silver work, lamps, and papyrus. Bab Zuweila, an eleventh-century Fatimid gate, has towers you can climb for a panoramic view." },
        { heading: "Best times to visit", body: "Morning is best for mosque visits — light streaming through high windows is beautiful. The bazaar wakes up around ten. Avoid mosques during Friday noon prayers. Summer (June to September) exceeds 40 degrees, so start by eight. Winter (November to February) is comfortable all day. During Ramadan, the bazaar is especially lively after sunset." },
        { heading: "Practical tips", body: "Mosque entry is free but requires removing shoes. Women should bring a scarf for hair covering; both men and women should wear long sleeves and trousers. Restrooms are available at mosques. Bazaar prices are negotiable — expect to haggle 50 per cent or more off the opening price. Carry water at all times. An eSIM helps with translation apps and maps in the labyrinthine alleys. Cairo traffic is intense, so allow extra time for the return journey." },
      ],
      [
        { q: "Is the Islamic quarter safe?", a: "Daytime is generally safe with plenty of visitors. Watch for pickpockets in crowded areas. At night, stick to main streets." },
        { q: "Do mosques charge entry?", a: "Most are free. Remove your shoes and dress modestly — cover arms and legs." },
        { q: "Tips for shopping at Khan el-Khalili?", a: "Haggling is expected. Check prices at several shops before buying. Walking away is a legitimate negotiation tactic." },
        { q: "How long does the walk take?", a: "Three to four hours for Al-Muizz Street and the bazaar. Half a day to a full day if you visit mosques in depth." },
        { q: "Should I hire a guide?", a: "A licensed English-speaking guide adds valuable historical context. Find one near Al-Azhar Mosque." },
      ],
    ),
  },
};

export const OCEANIA_MIDEAST_AFRICA_GUIDE_SLUGS = Object.keys(OCEANIA_MIDEAST_AFRICA_GUIDE_CONTENT);
