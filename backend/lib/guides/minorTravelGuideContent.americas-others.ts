import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// North America, Hong Kong, and Oceania walking-guide articles.
// 20 neighbourhood-level routes for cities outside the main hub guides.

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

const HK_JA_CTA = {
  ctaTitle: "香港旅行の通信をもっと楽に",
  ctaButton: "香港のeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const HK_EN_CTA = {
  ctaTitle: "Stay connected in Hong Kong",
  ctaButton: "View Hong Kong eSIM plans",
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

const NYC_X: GuideXEmbed[] = [
  { url: "https://x.com/naborhoodsnyc", label: "@naborhoodsnyc" },
  { url: "https://x.com/NYCgo", label: "@NYCgo" },
];
const SF_X: GuideXEmbed[] = [
  { url: "https://x.com/SFTravelTips", label: "@SFTravelTips" },
];
const PORTLAND_X: GuideXEmbed[] = [
  { url: "https://x.com/TravelPortland", label: "@TravelPortland" },
];
const CHICAGO_X: GuideXEmbed[] = [
  { url: "https://x.com/ChooseChicago", label: "@ChooseChicago" },
];
const HK_X: GuideXEmbed[] = [
  { url: "https://x.com/discoverhk", label: "@discoverhk" },
];
const MELBOURNE_X: GuideXEmbed[] = [
  { url: "https://x.com/visitmelbourne", label: "@visitmelbourne" },
];
const SYDNEY_X: GuideXEmbed[] = [
  { url: "https://x.com/sydney", label: "@sydney" },
];
const VANCOUVER_X: GuideXEmbed[] = [
  { url: "https://x.com/MyVancouver", label: "@MyVancouver" },
];
const MEXICO_CITY_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitMexico", label: "@VisitMexico" },
];

// ═══════════════════════════════════════════════════════════════════
// Content
// ═══════════════════════════════════════════════════════════════════

export const AMERICAS_OTHERS_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ─── 1. NYC Lower East Side ─────────────────────────────────────
  "nyc-lower-east-side-walk": {
    ja: ja(US_JA_CTA,
      "ロウアーイーストサイドのグルメとアート散策",
      "移民文化が息づくNYCロウアーイーストサイドを歩き、名物グルメとギャラリーを巡るルートガイド。",
      img("File:Orchard Street NYC.jpg", 1280, 854, "オーチャードストリート", "かつての露店街は今やギャラリーとカフェの通り"),
      [
        img("File:Katz's Delicatessen.jpg", 1280, 854, "カッツデリ", "1888年創業のパストラミサンドの名店"),
        img("File:New Museum.jpg", 1280, 960, "ニューミュージアム", "バワリー通りに建つ現代美術館"),
        img("File:Essex Market NYC.jpg", 1280, 854, "エセックスマーケット", "2019年に移転リニューアルしたフードホール"),
        img("File:Tenement Museum.jpg", 1280, 854, "テネメント博物館", "移民の暮らしを再現した歴史博物館"),
        img("File:Sara D. Roosevelt Park.jpg", 1280, 854, "サラ・D・ルーズベルト公園", "地元住民の憩いの場"),
      ],
      NYC_X,
      [
        { heading: "このルートの特徴", body: "ロウアーイーストサイド（LES）は19世紀末から東欧系・中国系移民が暮らしてきた地区で、近年はギャラリーやクラフトカクテルバーが急増しています。オーチャードストリートを中心に、わずか数ブロックの中に老舗デリ、ヴィンテージショップ、ストリートアートが共存する独特の風景が広がります。観光客で混雑するソーホーやイーストビレッジと比べ、まだローカル感が色濃く残るエリアです。" },
        { heading: "アクセスと起点", body: "地下鉄F線デランシーストリート駅が最寄り。JMZ線のエセックスストリート駅からも徒歩1分です。マンハッタンブリッジやウィリアムズバーグブリッジの徒歩圏でもあり、ブルックリン散策と組み合わせやすい立地。起点はエセックスマーケットがおすすめで、ここで軽く朝食を済ませてから南下するルートが効率的です。" },
        { heading: "主要スポット", body: "カッツデリカテッセンのパストラミサンドは行列必至ですが一度は食べたい名物。ニューミュージアムは現代アートの企画展が充実し、入館料は週末夕方に割引になることも。オーチャードストリート沿いの小規模ギャラリーは木〜日曜に開くところが多く、フリーで鑑賞できます。リヴィントンストリートには人気ベーグル店やスペシャルティコーヒー店が集まっています。" },
        { heading: "時間帯とタイミング", body: "午前中はエセックスマーケットとカッツデリを回り、午後にギャラリー巡りをするのがベスト。金曜夜はバーやライブ会場が賑わい、夜の街歩きも楽しめます。夏場の週末にはオーチャードストリートが歩行者天国になることがあります。冬は日没が早いので、ギャラリーは15時頃までに回りきるのがおすすめです。" },
        { heading: "実用情報", body: "エリア全体がコンパクトなので徒歩で十分回れます。トイレはエセックスマーケット内とニューミュージアムが利用しやすいです。カッツデリは現金のみの窓口もあるので少額の現金を持っておくと安心。Wi-Fiはカフェやマーケット内で無料接続できますが、eSIMがあれば地図アプリでの移動がスムーズです。" },
      ],
      [
        { q: "ロウアーイーストサイドの治安は?", a: "日中は観光客も多く安全です。夜間もバーエリアは人通りがありますが、住宅街の裏通りは暗くなるので大通りを歩きましょう。" },
        { q: "カッツデリの待ち時間は?", a: "週末の昼は30〜60分待ちになることがあります。平日の11時頃が比較的空いています。" },
        { q: "ギャラリーは予約が必要?", a: "ほとんどのギャラリーは予約不要で入場無料です。ニューミュージアムのみ入館料が必要です。" },
        { q: "所要時間の目安は?", a: "食事込みで3〜4時間が目安です。ギャラリーをじっくり見るなら半日を見てください。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Lower East Side Food and Art Walk in NYC",
      "Explore New York's Lower East Side on foot — pastrami sandwiches, gallery hops, and immigrant heritage in one compact neighbourhood.",
      img("File:Orchard Street NYC.jpg", 1280, 854, "Orchard Street", "Once a pushcart market, now lined with galleries and cafés"),
      [
        img("File:Katz's Delicatessen.jpg", 1280, 854, "Katz's Deli", "Pastrami institution since 1888"),
        img("File:New Museum.jpg", 1280, 960, "New Museum", "Contemporary art on the Bowery"),
        img("File:Essex Market NYC.jpg", 1280, 854, "Essex Market", "Renovated food hall reopened in 2019"),
        img("File:Tenement Museum.jpg", 1280, 854, "Tenement Museum", "Recreated immigrant apartments"),
        img("File:Sara D. Roosevelt Park.jpg", 1280, 854, "Sara D. Roosevelt Park", "Green strip between the blocks"),
      ],
      NYC_X,
      [
        { heading: "What makes this route special", body: "The Lower East Side is where nineteenth-century immigrant tenements meet twenty-first-century galleries. Orchard Street, once crammed with pushcart vendors, is now a corridor of small art spaces, vintage boutiques, and specialty coffee shops. Unlike neighbouring SoHo, the LES keeps a grittier, more local feel that rewards slow wandering. Expect murals on every other wall, a soundtrack of live music leaking from basement bars, and some of the best cheap eats left in Manhattan." },
        { heading: "Getting there and starting point", body: "Take the F train to Delancey Street or the J/M/Z to Essex Street. Both stations drop you right at the edge of the action. A good starting point is Essex Market on the ground floor of the Essex Crossing development. Grab a coffee or a breakfast taco here before heading south on Orchard Street. The area is also within walking distance of the Manhattan and Williamsburg Bridges, making it easy to combine with a Brooklyn loop." },
        { heading: "Key stops", body: "Katz's Delicatessen needs no introduction — the pastrami sandwich is worth the queue. The New Museum, a stack of off-kilter white boxes on the Bowery, always has thought-provoking contemporary shows. Small galleries along Orchard and Rivington streets are mostly free and open Thursday through Sunday. The Tenement Museum offers guided tours of restored immigrant apartments and is one of the most unique history experiences in the city. End the walk with a craft cocktail on Ludlow Street." },
        { heading: "Best times to visit", body: "Morning is ideal for Essex Market and Katz's before the lunch rush. Galleries are best visited in the early afternoon, Thursday through Sunday. Friday and Saturday evenings bring out the bar-and-live-music scene. In summer, Orchard Street occasionally closes to traffic for street fairs. Winter daylight fades early, so plan gallery visits before 3 pm if you want natural light." },
        { heading: "Practical tips", body: "The neighbourhood is compact and entirely walkable. Restrooms are easiest to find inside Essex Market and the New Museum. Katz's has a cash-only counter, so carry small bills. Free Wi-Fi is available in most cafés and the market, but an eSIM keeps your map and transit apps running seamlessly between stops." },
      ],
      [
        { q: "Is the Lower East Side safe?", a: "Daytime is very safe with plenty of foot traffic. At night, stick to well-lit streets like Orchard, Rivington, and Ludlow — the bar crowd keeps them lively." },
        { q: "How long is the wait at Katz's?", a: "Weekend lunch can mean a 30-to-60-minute line. Weekday mornings around 11 am are much quieter." },
        { q: "Do I need to book gallery visits?", a: "Most galleries are walk-in and free. Only the New Museum charges admission." },
        { q: "How much time should I budget?", a: "Three to four hours including a meal. Add another couple of hours if you want to linger in galleries." },
      ],
    ),
  },

  // ─── 2. NYC Williamsburg ────────────────────────────────────────
  "nyc-williamsburg-walk": {
    ja: ja(US_JA_CTA,
      "ウィリアムズバーグのブルックリン散歩",
      "ブルックリンのウィリアムズバーグを歩き、クラフトビール・古着・ウォーターフロントの眺望を楽しむルートガイド。",
      img("File:Williamsburg Brooklyn New York.jpg", 1280, 854, "ウィリアムズバーグの街並み", "ブルックリン随一のトレンドエリア"),
      [
        img("File:Bedford Avenue Brooklyn.jpg", 1280, 854, "ベッドフォードアベニュー", "メインストリートのカフェとショップ"),
        img("File:Domino Park Brooklyn.jpg", 1280, 854, "ドミノパーク", "旧砂糖工場跡のウォーターフロント公園"),
        img("File:Brooklyn Brewery.jpg", 1280, 854, "ブルックリンブルワリー", "地元発のクラフトビール醸造所"),
        img("File:Smorgasburg Brooklyn.jpg", 1280, 854, "スモーガスバーグ", "週末限定の巨大フードマーケット"),
        img("File:McCarren Park Brooklyn.jpg", 1280, 854, "マッカレンパーク", "地域の憩いの大型公園"),
      ],
      NYC_X,
      [
        { heading: "このルートの特徴", body: "ウィリアムズバーグはブルックリン北部のウォーターフロント地区で、2000年代以降アーティストやクリエイターが集まり、NYCでもっともトレンディなエリアのひとつに成長しました。ベッドフォードアベニュー沿いにはインディペンデントなカフェ、古着店、レコードショップが並び、イーストリバー沿いにはドミノパークなどの親水公園が整備されています。マンハッタンのスカイラインを望む夕景は格別です。" },
        { heading: "アクセスと起点", body: "地下鉄L線ベッドフォードアベニュー駅が最寄り。マンハッタンのユニオンスクエアから約15分です。ウィリアムズバーグブリッジを徒歩で渡ってLESから来ることもできます。起点はベッドフォードアベニュー駅を出てすぐのメインストリートから。北に向かってマッカレンパーク方面へ歩くルートが効率的です。" },
        { heading: "主要スポット", body: "ベッドフォードアベニューのカフェで朝食後、サウス側のドミノパークへ。旧ドミノ砂糖工場のリノベーションエリアで、マンハッタンの眺望が抜群です。週末はスモーガスバーグ（4月〜10月）で世界各国のストリートフード。ブルックリンブルワリーでは週末にツアーとテイスティングが楽しめます。古着好きならノース6〜7ストリート周辺のヴィンテージショップへ。" },
        { heading: "時間帯とタイミング", body: "午前中のカフェ巡りから始め、昼過ぎにスモーガスバーグ（週末のみ）、夕方にドミノパークで夕景を眺めるのが理想的な流れです。平日は混雑が少なくゆったり歩けます。夏の週末は非常に混むので、早めの到着がおすすめ。冬のウォーターフロントは風が強いので防寒対策を。" },
        { heading: "実用情報", body: "ベッドフォードアベニュー沿いは歩道が広く歩きやすいです。トイレはドミノパークとマッカレンパークに公衆トイレがあります。多くの店がカード対応ですが、フリーマーケットでは現金が必要な場合も。eSIMがあればマップや口コミの確認がリアルタイムでできて便利です。" },
      ],
      [
        { q: "スモーガスバーグはいつ開催?", a: "例年4月〜10月の毎週土曜に開催されます。場所は年によって変わるので最新情報を確認してください。" },
        { q: "ウィリアムズバーグブリッジは徒歩で渡れる?", a: "はい。歩行者・自転車用の通路があり、LESから約20分で渡れます。眺めも良いのでおすすめです。" },
        { q: "子連れでも楽しめる?", a: "ドミノパークには遊具があり、マッカレンパークも広いので子連れに向いています。" },
        { q: "所要時間は?", a: "3〜5時間が目安です。スモーガスバーグと夕景まで含めると半日コースになります。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Williamsburg Brooklyn Walk",
      "Stroll Brooklyn's Williamsburg for craft beer, vintage shops, street food markets, and Manhattan skyline views from the waterfront.",
      img("File:Williamsburg Brooklyn New York.jpg", 1280, 854, "Williamsburg streetscape", "Brooklyn's trendiest neighbourhood"),
      [
        img("File:Bedford Avenue Brooklyn.jpg", 1280, 854, "Bedford Avenue", "The main artery lined with cafés"),
        img("File:Domino Park Brooklyn.jpg", 1280, 854, "Domino Park", "Waterfront park at the old sugar refinery"),
        img("File:Brooklyn Brewery.jpg", 1280, 854, "Brooklyn Brewery", "Local craft beer pioneer"),
        img("File:Smorgasburg Brooklyn.jpg", 1280, 854, "Smorgasburg", "Weekend open-air food market"),
        img("File:McCarren Park Brooklyn.jpg", 1280, 854, "McCarren Park", "Neighbourhood green space"),
      ],
      NYC_X,
      [
        { heading: "What makes this route special", body: "Williamsburg sits on Brooklyn's north waterfront and has spent the last two decades evolving from an industrial zone into one of New York's most creative neighbourhoods. Bedford Avenue is the spine — lined with independent cafés, record shops, and vintage stores — while the East River edge offers parks, converted warehouses, and unobstructed views of the Manhattan skyline. The mix of Hasidic heritage, Latin American food stalls, and hipster culture gives every block a different character." },
        { heading: "Getting there and starting point", body: "The L train to Bedford Avenue is the fastest route — about fifteen minutes from Union Square. You can also walk across the Williamsburg Bridge from the Lower East Side in roughly twenty minutes, which doubles as a sightseeing experience. Start on Bedford Avenue at the station exit and head north toward McCarren Park, weaving onto side streets as shops and murals catch your eye." },
        { heading: "Key stops", body: "Fuel up at one of Bedford Avenue's third-wave coffee shops, then detour south to Domino Park, the beautifully converted sugar-refinery waterfront. On weekends between April and October, Smorgasburg draws thousands with dozens of food vendors — arrive before noon to beat the queues. Brooklyn Brewery offers weekend tours and tastings. Vintage hunters should hit the thrift stores clustered around North 6th and 7th Streets. End at McCarren Park for a breather." },
        { heading: "Best times to visit", body: "Start with morning coffee, hit Smorgasburg around midday on weekends, and save the waterfront for golden-hour skyline views. Weekdays are noticeably calmer and let you linger in shops without crowds. Summer weekends get packed, so an early start pays off. In winter the waterfront is windy; layer up and duck into breweries to warm up." },
        { heading: "Practical tips", body: "Bedford Avenue has wide sidewalks and is easy to navigate. Public restrooms are in Domino Park and McCarren Park. Most shops accept cards, but flea-market vendors may want cash. An eSIM keeps your map and review apps working smoothly as you hop between blocks." },
      ],
      [
        { q: "When is Smorgasburg open?", a: "Typically every Saturday from April through October. Check the official site for the current year's location and hours." },
        { q: "Can I walk across the Williamsburg Bridge?", a: "Yes. There is a pedestrian and bike path. The crossing takes about twenty minutes and offers great views." },
        { q: "Is Williamsburg family-friendly?", a: "Domino Park has a playground and McCarren Park has open lawns, making both good stops for families." },
        { q: "How much time do I need?", a: "Three to five hours covers the highlights. Add more time if you want to catch sunset at the waterfront." },
      ],
    ),
  },

  // ─── 3. NYC High Line & Chelsea ─────────────────────────────────
  "nyc-highline-chelsea-walk": {
    ja: ja(US_JA_CTA,
      "ハイライン〜チェルシーマーケット散策",
      "空中公園ハイラインを歩き、チェルシーマーケットやギャラリー街を巡るNYC西側の散策ルート。",
      img("File:High Line 20th Street looking downtown.jpg", 1280, 854, "ハイライン", "廃線跡を再生した空中緑道"),
      [
        img("File:Chelsea Market NYC.jpg", 1280, 854, "チェルシーマーケット", "旧ナビスコ工場を改装したフードホール"),
        img("File:The High Line Park.jpg", 1280, 854, "ハイラインの植栽", "四季折々の植物が楽しめる"),
        img("File:Hudson Yards New York.jpg", 1280, 960, "ハドソンヤーズ", "ハイライン北端の再開発エリア"),
        img("File:Chelsea Gallery District.jpg", 1280, 854, "チェルシーギャラリー", "世界最大級のギャラリー集積地"),
        img("File:Whitney Museum NYC.jpg", 1280, 854, "ホイットニー美術館", "ハイライン南端のアメリカ美術館"),
      ],
      NYC_X,
      [
        { heading: "このルートの特徴", body: "ハイラインはマンハッタン西側の廃線高架を再生した全長約2.3kmの空中公園です。地上から一段高い視点でビル群と植栽を眺めながら歩ける、NYCならではの体験。南端のホイットニー美術館から北端のハドソンヤーズまで一本道で、途中にチェルシーマーケットとギャラリー街が控えています。建築、アート、食の三拍子が揃う散策ルートです。" },
        { heading: "アクセスと起点", body: "南端の起点はガンズヴォートストリート入口で、地下鉄A/C/E線14ストリート駅から徒歩5分。ホイットニー美術館のすぐ横です。北端のハドソンヤーズ側から始めて南下する逆ルートもおすすめ。7線34ストリート-ハドソンヤーズ駅が最寄りです。どちら起点でも所要時間はほぼ同じです。" },
        { heading: "主要スポット", body: "ホイットニー美術館はアメリカ現代美術の殿堂で、屋上テラスからの眺めも見事。ハイライン自体が彫刻やインスタレーションの展示空間になっており、季節ごとに作品が入れ替わります。10番街のチェルシーギャラリー群は200軒以上が集中し、ほぼすべて入場無料。チェルシーマーケットでは世界各国のグルメやクラフトショップを楽しめます。" },
        { heading: "時間帯とタイミング", body: "朝9時頃はハイラインが空いていて写真撮影に最適。チェルシーマーケットは11時頃から混み始めます。ギャラリーは火〜土曜の10〜18時が基本で、木曜夜にオープニングレセプションを行う画廊も多いです。夕暮れ時のハイラインはハドソン川に沈む夕日が美しく、特に秋の夕景がおすすめです。" },
        { heading: "実用情報", body: "ハイラインは全線バリアフリーでエレベーター付き入口が複数あります。トイレはハイライン上の数カ所とチェルシーマーケット内に。飲食の持ち込みは可能ですがベンチが限られるので、マーケットで食べてから歩くのが楽です。Wi-Fiはチェルシーマーケット内で利用可能。eSIMがあれば歩きながらギャラリー情報を検索できます。" },
      ],
      [
        { q: "ハイラインの入場料は?", a: "無料です。年中無休で開園していますが、冬季は閉園時間が早まります。" },
        { q: "雨の日でも歩ける?", a: "舗装されているので歩けますが、滑りやすい箇所があります。屋根はないので雨具は必須です。" },
        { q: "チェルシーマーケットの営業時間は?", a: "おおむね7〜21時ですが、店舗により異なります。日曜は閉店が早い店もあります。" },
        { q: "所要時間は?", a: "ハイライン通し歩きで約45分。チェルシーマーケットとギャラリー込みで3〜5時間が目安です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "High Line to Chelsea Market Walk in NYC",
      "Walk New York's elevated park from the Whitney Museum to Hudson Yards, with detours to Chelsea Market and 200-plus free galleries.",
      img("File:High Line 20th Street looking downtown.jpg", 1280, 854, "The High Line", "Elevated greenway on a former rail line"),
      [
        img("File:Chelsea Market NYC.jpg", 1280, 854, "Chelsea Market", "Food hall in the old Nabisco factory"),
        img("File:The High Line Park.jpg", 1280, 854, "High Line planting", "Seasonal gardens above the streets"),
        img("File:Hudson Yards New York.jpg", 1280, 960, "Hudson Yards", "Northern terminus development"),
        img("File:Chelsea Gallery District.jpg", 1280, 854, "Chelsea galleries", "World's densest gallery district"),
        img("File:Whitney Museum NYC.jpg", 1280, 854, "Whitney Museum", "American art at the southern entrance"),
      ],
      NYC_X,
      [
        { heading: "What makes this route special", body: "The High Line is a 2.3-kilometre linear park built on a disused elevated freight rail line on Manhattan's west side. Walking it gives you a unique vantage point — one storey above street level — through architecture, public art, and carefully curated plantings. At one end sits the Whitney Museum of American Art; at the other, the gleaming towers of Hudson Yards. In between you pass directly over Chelsea Market and alongside the world's largest concentration of contemporary art galleries." },
        { heading: "Getting there and starting point", body: "The southern entrance at Gansevoort Street is a five-minute walk from the A/C/E at 14th Street. Start here next to the Whitney Museum and walk north. Alternatively, begin at the northern end by taking the 7 train to 34th Street–Hudson Yards and walk south. Either direction takes roughly the same time, so choose based on where you want to finish." },
        { heading: "Key stops", body: "The Whitney's rooftop terrace offers sweeping Hudson River views before you even step onto the High Line. The park itself doubles as an open-air gallery with rotating sculptures and installations. Descend at 15th Street for Chelsea Market — a food hall with everything from lobster rolls to artisan doughnuts. Back on the High Line, exit at 24th Street and head to Tenth Avenue for the gallery district, where more than two hundred spaces show contemporary work for free." },
        { heading: "Best times to visit", body: "Early morning around 9 am is the quietest time for photography on the High Line. Chelsea Market begins filling up by 11 am. Galleries keep Tuesday-to-Saturday hours, typically 10 am to 6 pm, with many hosting Thursday-evening openings. Sunset on the High Line, especially in autumn, delivers spectacular views of the sun dropping behind the Hudson River." },
        { heading: "Practical tips", body: "The High Line is fully accessible with several elevator entrances. Restrooms are available at a few points along the park and inside Chelsea Market. You can bring food onto the High Line, but bench space is limited — eating inside the market first is easier. Chelsea Market has free Wi-Fi. An eSIM lets you look up gallery shows and wayfind as you walk." },
      ],
      [
        { q: "Is the High Line free?", a: "Yes, admission is free and the park is open year-round, though winter hours are shorter." },
        { q: "Can I walk the High Line in the rain?", a: "The surface is paved so it is walkable, but it can be slippery and there is no cover. Bring rain gear." },
        { q: "What are Chelsea Market's hours?", a: "Generally 7 am to 9 pm, but individual shops vary. Some close earlier on Sundays." },
        { q: "How long does the full walk take?", a: "The High Line alone is about 45 minutes. With Chelsea Market and galleries, budget three to five hours." },
      ],
    ),
  },

  // ─── 4. NYC DUMBO & Brooklyn Heights ────────────────────────────
  "nyc-dumbo-brooklyn-heights-walk": {
    ja: ja(US_JA_CTA,
      "ダンボとブルックリンハイツの橋と展望",
      "マンハッタンブリッジのフォトスポットからブルックリンハイツの遊歩道まで、絶景を巡るルートガイド。",
      img("File:Manhattan Bridge DUMBO.jpg", 1280, 854, "ダンボからのマンハッタンブリッジ", "ワシントンストリートの定番アングル"),
      [
        img("File:Brooklyn Bridge Park.jpg", 1280, 854, "ブルックリンブリッジパーク", "イーストリバー沿いの親水公園"),
        img("File:Brooklyn Heights Promenade.jpg", 1280, 854, "ブルックリンハイツ遊歩道", "マンハッタンのスカイラインを一望"),
        img("File:Jane's Carousel Brooklyn.jpg", 1280, 854, "ジェーンズカルーセル", "ガラス張りパビリオンの回転木馬"),
        img("File:Time Out Market New York.jpg", 1280, 854, "タイムアウトマーケット", "ダンボのフードホール"),
        img("File:Brooklyn Bridge Walk.jpg", 1280, 854, "ブルックリンブリッジ", "歴史的な吊り橋を徒歩で渡る"),
      ],
      NYC_X,
      [
        { heading: "このルートの特徴", body: "DUMBO（Down Under the Manhattan Bridge Overpass）は、マンハッタンブリッジとブルックリンブリッジに挟まれた石畳の小さなエリア。ワシントンストリートからのブリッジビューはNYCを代表する撮影スポットです。隣接するブルックリンハイツは歴史ある住宅街で、プロムナードからはロウアーマンハッタンのパノラマが広がります。二つの橋と二つのエリアを徒歩で繋ぐルートです。" },
        { heading: "アクセスと起点", body: "地下鉄F線ヨークストリート駅がダンボの最寄り。またはA/C線ハイストリート-ブルックリンブリッジ駅からも徒歩5分です。マンハッタンからブルックリンブリッジを歩いて渡り、ダンボに降りるルートも人気があります。起点はワシントンストリートとウォーターストリートの交差点付近がおすすめです。" },
        { heading: "主要スポット", body: "ワシントンストリートのフォトスポットで橋の写真を撮ったら、ブルックリンブリッジパークへ。ジェーンズカルーセルは1922年製の回転木馬をジャン・ヌーヴェル設計のガラスパビリオンに収めた名所。タイムアウトマーケットでランチ後、ブルックリンハイツのプロムナードへ。全長600mの遊歩道からマンハッタンのスカイラインと自由の女神が見えます。" },
        { heading: "時間帯とタイミング", body: "朝のダンボは人が少なくフォトスポットが撮りやすいです。ブルックリンハイツのプロムナードは夕暮れ時が最高で、マンハッタンの夜景が始まる時間帯がベスト。週末のブルックリンブリッジは混雑するので、平日早朝の渡橋がおすすめ。冬はウォーターフロントの風が冷たいので防寒を。" },
        { heading: "実用情報", body: "ダンボは石畳の道が多いのでスニーカー推奨。トイレはブルックリンブリッジパーク内とタイムアウトマーケットに。飲食店はダンボに集中しており、ブルックリンハイツ側はモンタギューストリートにカフェがあります。橋の上は電波が不安定になることがあるので、オフラインマップも準備しておくと安心です。" },
      ],
      [
        { q: "ブルックリンブリッジは徒歩でどのくらい?", a: "約30〜40分です。歩行者レーンは自転車と分かれていますが、混雑時は注意が必要です。" },
        { q: "ダンボのフォトスポットはどこ?", a: "ワシントンストリートとウォーターストリートの交差点が定番。橋の間にエンパイアステートビルが見えるアングルです。" },
        { q: "ジェーンズカルーセルの料金は?", a: "1回2ドル程度です。営業時間は季節により異なります。" },
        { q: "全行程の所要時間は?", a: "ブリッジ渡りを含めて3〜4時間。食事やプロムナードでの休憩込みで半日が目安です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "DUMBO and Brooklyn Heights Bridge Walk",
      "Chase iconic bridge views in DUMBO, ride a vintage carousel, and take in the Manhattan skyline from the Brooklyn Heights Promenade.",
      img("File:Manhattan Bridge DUMBO.jpg", 1280, 854, "Manhattan Bridge from DUMBO", "The classic Washington Street angle"),
      [
        img("File:Brooklyn Bridge Park.jpg", 1280, 854, "Brooklyn Bridge Park", "Waterfront park along the East River"),
        img("File:Brooklyn Heights Promenade.jpg", 1280, 854, "Brooklyn Heights Promenade", "Panoramic Manhattan skyline views"),
        img("File:Jane's Carousel Brooklyn.jpg", 1280, 854, "Jane's Carousel", "1922 carousel in a glass pavilion"),
        img("File:Time Out Market New York.jpg", 1280, 854, "Time Out Market", "DUMBO food hall"),
        img("File:Brooklyn Bridge Walk.jpg", 1280, 854, "Brooklyn Bridge", "Walking across the historic suspension bridge"),
      ],
      NYC_X,
      [
        { heading: "What makes this route special", body: "DUMBO — Down Under the Manhattan Bridge Overpass — is a cobblestoned pocket squeezed between two of New York's most famous bridges. The view of the Manhattan Bridge framed by brick warehouses on Washington Street is one of the most photographed scenes in the city. Next door, Brooklyn Heights is one of the oldest residential neighbourhoods in New York, and its Promenade offers an unbroken panorama of Lower Manhattan, the Statue of Liberty, and both bridges. This walk links the two areas on foot." },
        { heading: "Getting there and starting point", body: "Take the F train to York Street for DUMBO, or the A/C to High Street–Brooklyn Bridge. Another popular option is walking across the Brooklyn Bridge itself from Manhattan — about thirty to forty minutes — and descending into DUMBO on the Brooklyn side. Start at the intersection of Washington and Water Streets for the signature bridge photo." },
        { heading: "Key stops", body: "After the photo op, head into Brooklyn Bridge Park. Jane's Carousel, a restored 1922 merry-go-round housed in a Jean Nouvel glass pavilion, is a highlight for all ages. Grab lunch at Time Out Market, then walk south into Brooklyn Heights. The Promenade stretches 600 metres above the Brooklyn-Queens Expressway and offers the best skyline panorama in the borough — especially at sunset." },
        { heading: "Best times to visit", body: "Early morning is best for DUMBO photos without crowds. The Brooklyn Heights Promenade shines at dusk when Manhattan's lights flicker on. The Brooklyn Bridge itself is least crowded on weekday mornings. In winter the waterfront wind can be biting, so dress warmly." },
        { heading: "Practical tips", body: "DUMBO's cobblestone streets call for sturdy shoes. Restrooms are inside Brooklyn Bridge Park and Time Out Market. Dining is concentrated in DUMBO; on the Heights side, Montague Street has cafés. Cell signal can be patchy on the bridges, so download offline maps as a backup." },
      ],
      [
        { q: "How long does it take to walk the Brooklyn Bridge?", a: "About thirty to forty minutes. The pedestrian lane is separated from bikes, but stay alert during busy times." },
        { q: "Where is the famous DUMBO photo spot?", a: "The intersection of Washington Street and Water Street, where the Manhattan Bridge is framed between brick buildings." },
        { q: "How much does Jane's Carousel cost?", a: "Around two dollars per ride. Hours vary by season." },
        { q: "How much time should I plan?", a: "Three to four hours including a bridge crossing. A half day with meals and the Promenade sunset." },
      ],
    ),
  },

  // ─── 5. SF Mission District ─────────────────────────────────────
  "sf-mission-district-walk": {
    ja: ja(US_JA_CTA,
      "ミッション地区のミューラルとタケリア",
      "サンフランシスコのミッション地区を歩き、色鮮やかな壁画とメキシカンストリートフードを楽しむルートガイド。",
      img("File:Mission District San Francisco.jpg", 1280, 854, "ミッション地区の壁画", "バルミーアレーのカラフルなミューラル"),
      [
        img("File:Balmy Alley San Francisco.jpg", 1280, 854, "バルミーアレー", "壁画が両側に続く路地"),
        img("File:Clarion Alley San Francisco.jpg", 1280, 854, "クラリオンアレー", "もうひとつのミューラルストリート"),
        img("File:Dolores Park San Francisco.jpg", 1280, 854, "ドロレスパーク", "市街を見渡せる芝生の丘"),
        img("File:Mission Dolores Basilica.jpg", 1280, 854, "ミッション・ドロレス", "1776年建設のSF最古の建物"),
        img("File:Valencia Street San Francisco.jpg", 1280, 854, "バレンシアストリート", "独立系書店やカフェが並ぶ"),
      ],
      SF_X,
      [
        { heading: "このルートの特徴", body: "ミッション地区はサンフランシスコのラテン文化の中心地で、バルミーアレーやクラリオンアレーには政治的・芸術的メッセージを込めた壁画が密集しています。同時に、本格的なタケリア（メキシコ料理店）が並ぶ24番ストリートは「ブリトーの聖地」とも呼ばれます。SF市内で最も日照時間が長いエリアで、霧に包まれがちな他地区と対照的に晴れていることが多いのも魅力です。" },
        { heading: "アクセスと起点", body: "BART 24thストリートミッション駅が最寄り。地上に出るとすぐミッション地区の中心部です。16thストリートミッション駅から始めて南下するルートも人気。市内バスのMuni 14番や49番も利用できます。起点はバレンシアストリートと16thの交差点がわかりやすいです。" },
        { heading: "主要スポット", body: "バルミーアレーは1970年代から壁画が描かれ続けている路地で、社会正義をテーマにした作品が並びます。クラリオンアレーはよりポップで頻繁に塗り替えられるため、訪れるたびに新しい作品に出会えます。ドロレスパークは広大な芝生の丘で、ダウンタウンの眺望が素晴らしいです。ミッション・ドロレスはSF最古の建築物で、1776年のスペイン植民地時代に遡ります。" },
        { heading: "時間帯とタイミング", body: "壁画は午前中の光が美しいです。ランチはタケリアで本場のブリトーやタコスを。ドロレスパークは午後の日差しが気持ちよく、地元の人々がピクニックを楽しんでいます。週末は混雑しますが活気があります。バレンシアストリートのバーは夜も賑わうので、ディナーまで楽しめるエリアです。" },
        { heading: "実用情報", body: "徒歩で十分回れるコンパクトなエリアです。坂は少なく歩きやすい地形。トイレはドロレスパークに公衆トイレがあります。タケリアは現金のみの店もあるので小額紙幣を用意してください。eSIMがあれば壁画のアーティスト情報をその場で調べられて便利です。" },
      ],
      [
        { q: "ミッション地区の治安は?", a: "観光エリアは日中安全ですが、16thストリート駅周辺は夜間注意が必要です。バレンシアストリートとドロレスパーク周辺は比較的安全です。" },
        { q: "おすすめのタケリアは?", a: "La Taqueria やEl Farolito が地元で人気です。どちらも現金のみの場合があります。" },
        { q: "壁画は撮影してよい?", a: "公共の路地にあるので自由に撮影できます。アーティストへの敬意を込めてSNS投稿時はタグ付けを。" },
        { q: "所要時間は?", a: "2〜3時間で主要スポットを回れます。食事とドロレスパークでの休憩を含めると半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Mission District Murals and Taquerias Walk in San Francisco",
      "Explore San Francisco's Mission District for vibrant alley murals, legendary burritos, and sunny Dolores Park views.",
      img("File:Mission District San Francisco.jpg", 1280, 854, "Mission District murals", "Colourful murals lining Balmy Alley"),
      [
        img("File:Balmy Alley San Francisco.jpg", 1280, 854, "Balmy Alley", "Decades of murals on both walls"),
        img("File:Clarion Alley San Francisco.jpg", 1280, 854, "Clarion Alley", "Rotating street art gallery"),
        img("File:Dolores Park San Francisco.jpg", 1280, 854, "Dolores Park", "Hilltop views and sunshine"),
        img("File:Mission Dolores Basilica.jpg", 1280, 854, "Mission Dolores", "San Francisco's oldest building, 1776"),
        img("File:Valencia Street San Francisco.jpg", 1280, 854, "Valencia Street", "Indie bookshops and cafés"),
      ],
      SF_X,
      [
        { heading: "What makes this route special", body: "The Mission is San Francisco's Latin cultural heart, famous for two things: political murals and outstanding Mexican food. Balmy Alley and Clarion Alley are open-air galleries where artists have been painting social-justice themes since the 1970s. Meanwhile, 24th Street is sometimes called the burrito capital of the world. The Mission also enjoys more sunshine than almost any other neighbourhood in fog-prone SF, making it ideal for walking." },
        { heading: "Getting there and starting point", body: "Take BART to 24th Street Mission or 16th Street Mission. Both stations put you right in the thick of it. Muni bus lines 14 and 49 also serve the area. A good starting point is the intersection of Valencia Street and 16th, from where you can head south through the murals and taqueria belt." },
        { heading: "Key stops", body: "Balmy Alley has been accumulating murals since the 1970s, with themes ranging from immigration to indigenous rights. Clarion Alley rotates more frequently and tends toward pop art and humour. Dolores Park, a wide grassy hillside, gives you a panorama of downtown and is the city's favourite picnic spot. Mission Dolores, the oldest surviving structure in San Francisco, dates to the Spanish colonial period. Valencia Street rounds things out with independent bookstores and specialty coffee." },
        { heading: "Best times to visit", body: "Morning light is best for mural photography. Lunch at a taqueria on 24th Street is a must — arrive before noon to skip the line. Dolores Park fills up on sunny afternoons, especially on weekends. Valencia Street bars keep the neighbourhood lively into the evening, so you can easily extend the walk into dinner." },
        { heading: "Practical tips", body: "The area is flat and compact, easy to cover on foot. Public restrooms are in Dolores Park. Some taquerias are cash only, so carry small bills. An eSIM is handy for looking up mural artists and restaurant reviews on the spot." },
      ],
      [
        { q: "Is the Mission District safe?", a: "The main tourist streets are safe by day. The area around 16th Street station can be sketchy at night. Valencia Street and Dolores Park are generally fine." },
        { q: "Which taqueria should I try?", a: "La Taqueria and El Farolito are local favourites. Both may be cash only." },
        { q: "Can I photograph the murals?", a: "Yes, they are in public alleys. Consider tagging the artists if you post on social media." },
        { q: "How much time do I need?", a: "Two to three hours for the highlights. A half day if you include lunch and Dolores Park." },
      ],
    ),
  },

  // ─── 6. SF North Beach ──────────────────────────────────────────
  "sf-north-beach-walk": {
    ja: ja(US_JA_CTA,
      "ノースビーチのイタリアンとビートニク散歩",
      "サンフランシスコのリトルイタリー・ノースビーチを歩き、伝説の書店とイタリアンカフェを巡るルートガイド。",
      img("File:City Lights Bookstore.jpg", 1280, 854, "シティライツ書店", "ビートジェネレーションの聖地"),
      [
        img("File:Washington Square San Francisco.jpg", 1280, 854, "ワシントンスクエア", "ノースビーチの中心広場"),
        img("File:Coit Tower San Francisco.jpg", 1280, 960, "コイトタワー", "テレグラフヒル頂上の展望塔"),
        img("File:North Beach San Francisco.jpg", 1280, 854, "コロンバスアベニュー", "イタリアンレストランが並ぶ通り"),
        img("File:Filbert Steps San Francisco.jpg", 1280, 854, "フィルバートステップス", "緑豊かな階段路地"),
        img("File:Caffe Trieste San Francisco.jpg", 1280, 854, "カフェ・トリエステ", "1956年創業のエスプレッソバー"),
      ],
      SF_X,
      [
        { heading: "このルートの特徴", body: "ノースビーチはSFのリトルイタリーとして知られ、イタリア系移民が築いた食文化が今も息づいています。同時に1950年代のビートジェネレーション発祥の地でもあり、シティライツ書店やカフェ・トリエステなど文学史に残るスポットが点在。コイトタワーからの360度パノラマ、急坂の階段路地、そしてエスプレッソの香り。コンパクトなエリアに濃密な体験が詰まっています。" },
        { heading: "アクセスと起点", body: "地下鉄のMuni Metro やBARTパウエル駅からバス30番・45番でコロンバスアベニューへ。徒歩ならチャイナタウンのグラントアベニューを北へ抜けるとノースビーチに入ります。起点はシティライツ書店がわかりやすく、ブロードウェイとコロンバスの交差点にあります。" },
        { heading: "主要スポット", body: "シティライツ書店はアレン・ギンズバーグの『吠える』を出版したことで有名な独立系書店。隣のヴェスヴィオ・カフェはビート詩人のたまり場でした。ワシントンスクエアパークを抜け、テレグラフヒルを登るとコイトタワーに到着。内部のWPA壁画と展望台が見どころです。下りはフィルバートステップスの緑のトンネルを歩くのがおすすめ。" },
        { heading: "時間帯とタイミング", body: "午前中にコイトタワーへ登ると混雑を避けられます。ランチはコロンバスアベニュー沿いのイタリアンで。午後はシティライツ書店でゆっくり本を眺め、カフェ・トリエステでエスプレッソを。週末の午後はワシントンスクエアで地元のミュージシャンが演奏していることもあります。" },
        { heading: "実用情報", body: "コイトタワーへの坂道は急なのでスニーカー必須。フィルバートステップスは200段以上あります。トイレはコイトタワー内とワシントンスクエアパーク横に。コロンバスアベニュー沿いはカード利用可の店がほとんどです。eSIMがあれば坂の途中でもマップを確認しやすいです。" },
      ],
      [
        { q: "コイトタワーの入場料は?", a: "展望台は有料（大人10ドル前後）。1階のWPA壁画エリアは無料です。" },
        { q: "シティライツ書店の営業時間は?", a: "毎日10時〜深夜まで営業しています。年中無休です。" },
        { q: "坂道はきつい?", a: "テレグラフヒルは急坂です。体力に自信がない方は39番バスでコイトタワー前まで行けます。" },
        { q: "所要時間は?", a: "2〜3時間が目安。ランチとカフェ休憩を入れると半日コースです。" },
      ],
    ),
    en: en(US_EN_CTA,
      "North Beach Italian and Beatnik Walk in San Francisco",
      "Walk San Francisco's Little Italy through Beat Generation bookshops, Italian espresso bars, and Coit Tower panoramas on Telegraph Hill.",
      img("File:City Lights Bookstore.jpg", 1280, 854, "City Lights Bookstore", "Birthplace of the Beat movement"),
      [
        img("File:Washington Square San Francisco.jpg", 1280, 854, "Washington Square", "The neighbourhood's central plaza"),
        img("File:Coit Tower San Francisco.jpg", 1280, 960, "Coit Tower", "Art-deco tower on Telegraph Hill"),
        img("File:North Beach San Francisco.jpg", 1280, 854, "Columbus Avenue", "Italian restaurants and cafés"),
        img("File:Filbert Steps San Francisco.jpg", 1280, 854, "Filbert Steps", "Leafy stairway down Telegraph Hill"),
        img("File:Caffe Trieste San Francisco.jpg", 1280, 854, "Caffè Trieste", "Espresso bar since 1956"),
      ],
      SF_X,
      [
        { heading: "What makes this route special", body: "North Beach is San Francisco's Little Italy and the cradle of the Beat Generation. Italian immigrant food culture thrives alongside literary landmarks like City Lights Bookstore, where Allen Ginsberg's Howl was first published. Climb Telegraph Hill to Coit Tower for a 360-degree panorama, then descend via the garden-lined Filbert Steps. The compact area packs Italian delis, espresso bars, and literary history into a few walkable blocks." },
        { heading: "Getting there and starting point", body: "Take Muni bus 30 or 45 to Columbus Avenue. Walking from Chinatown via Grant Avenue is another scenic approach — you cross from lantern-hung streets into café-lined ones in two blocks. Start at City Lights Bookstore at the corner of Broadway and Columbus." },
        { heading: "Key stops", body: "City Lights is an independent bookshop with a rich counter-culture history. Vesuvio Café next door was the Beat poets' hangout. Cross Washington Square Park and climb Telegraph Hill to Coit Tower — the WPA murals inside and the observation deck are both worth the visit. Coming down, take the Filbert Steps through lush gardens. Finish with an espresso at Caffè Trieste, the oldest espresso house on the West Coast." },
        { heading: "Best times to visit", body: "Morning is quietest at Coit Tower. Lunch on Columbus Avenue at a traditional Italian trattoria is the classic move. Spend the afternoon browsing City Lights and sipping espresso. On weekend afternoons, musicians sometimes play in Washington Square." },
        { heading: "Practical tips", body: "Wear sturdy shoes — Telegraph Hill is steep and the Filbert Steps have over 200 stairs. Restrooms are inside Coit Tower and near Washington Square. Most restaurants on Columbus Avenue accept cards. An eSIM keeps your maps working on the hillside." },
      ],
      [
        { q: "How much is Coit Tower admission?", a: "The observation deck costs about ten dollars. The ground-floor WPA murals are free." },
        { q: "What are City Lights' hours?", a: "Open daily from 10 am until midnight, year-round." },
        { q: "Are the hills manageable?", a: "Telegraph Hill is steep. If mobility is a concern, Muni bus 39 goes to the top of Coit Tower." },
        { q: "How long does this walk take?", a: "Two to three hours. Half a day with lunch and a café stop." },
      ],
    ),
  },

  // ─── 7. Portland Alberta Arts ───────────────────────────────────
  "portland-alberta-arts-walk": {
    ja: ja(US_JA_CTA,
      "アルバータ通りのアートとカフェ",
      "ポートランドのアルバータ・アーツ地区を歩き、ギャラリー巡りとサードウェーブコーヒーを楽しむルートガイド。",
      img("File:Alberta Street Portland Oregon.jpg", 1280, 854, "アルバータストリート", "壁画とギャラリーが並ぶアート通り"),
      [
        img("File:Alberta Arts District Portland.jpg", 1280, 854, "アルバータ・アーツ地区", "カラフルな店舗が並ぶ"),
        img("File:Last Thursday Portland.jpg", 1280, 854, "ラスト・サーズデー", "月末木曜のアートウォークイベント"),
        img("File:Portland Coffee Roasters.jpg", 1280, 854, "コーヒーロースター", "ポートランドのサードウェーブ文化"),
        img("File:Alberta Park Portland.jpg", 1280, 854, "アルバータパーク", "地域の公園"),
        img("File:Portland Street Art.jpg", 1280, 854, "ストリートアート", "壁面を彩るミューラル"),
      ],
      PORTLAND_X,
      [
        { heading: "このルートの特徴", body: "アルバータ通り（NE Alberta Street）はポートランドのアートシーンを象徴するストリートです。約30ブロックにわたってギャラリー、カフェ、ブティック、ストリートアートが連なり、クリエイティブなエネルギーに満ちています。毎月最終木曜の「ラスト・サーズデー」にはアートウォークイベントが開催され、通り全体がオープンギャラリーに変わります。" },
        { heading: "アクセスと起点", body: "PortlandのMAXライトレール沿線からはバスで乗り継ぎ。72番バスがアルバータ通りを東西に走っています。車の場合はストリート沿いに無料パーキングが点在。起点はNE 15thアベニューとアルバータの交差点あたりから東へ歩くのがおすすめです。" },
        { heading: "主要スポット", body: "ギャラリーは小規模で個性的な店が多く、地元アーティストの作品を直接購入できます。サードウェーブのコーヒーショップが複数あり、ロースタリー併設の店でシングルオリジンを楽しめます。ヴィンテージショップや手作りアクセサリーの店も充実。壁面のミューラルは数ブロックごとに大作があり、歩くだけでアート鑑賞になります。" },
        { heading: "時間帯とタイミング", body: "午前中はカフェでゆっくりスタート。ギャラリーは11時頃から開く店が多いです。ラスト・サーズデー（毎月最終木曜、夏季18〜21時頃）は必見イベントで、路上パフォーマンスやフードカートも出ます。週末の午後も賑わいますが、平日は落ち着いた雰囲気で散策できます。" },
        { heading: "実用情報", body: "全行程フラットで歩きやすいです。トイレはカフェやレストランで利用可能。ポートランドは雨が多いので折りたたみ傘を。クレジットカードはほぼどこでも使えます。eSIMがあればギャラリー情報やフードカートの口コミをリアルタイムで確認できます。" },
      ],
      [
        { q: "ラスト・サーズデーはいつ?", a: "毎月最終木曜日。夏季（6〜9月頃）が最も盛大で、18〜21時頃の開催です。" },
        { q: "雨の日でも楽しめる?", a: "はい。ギャラリーやカフェが多いので、屋内で過ごす時間も十分あります。" },
        { q: "子連れで楽しめる?", a: "アルバータパークに遊具があり、通り自体も穏やかな雰囲気で子連れに向いています。" },
        { q: "所要時間は?", a: "2〜3時間が目安。カフェとギャラリーをじっくり回るなら半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Alberta Arts District Café and Gallery Walk in Portland",
      "Wander Portland's Alberta Street for indie galleries, third-wave coffee, murals, and the monthly Last Thursday art walk.",
      img("File:Alberta Street Portland Oregon.jpg", 1280, 854, "Alberta Street", "Portland's creative corridor"),
      [
        img("File:Alberta Arts District Portland.jpg", 1280, 854, "Alberta Arts District", "Colourful shopfronts"),
        img("File:Last Thursday Portland.jpg", 1280, 854, "Last Thursday", "Monthly art-walk event"),
        img("File:Portland Coffee Roasters.jpg", 1280, 854, "Coffee roaster", "Portland's third-wave culture"),
        img("File:Alberta Park Portland.jpg", 1280, 854, "Alberta Park", "Neighbourhood green space"),
        img("File:Portland Street Art.jpg", 1280, 854, "Street art", "Murals across the district"),
      ],
      PORTLAND_X,
      [
        { heading: "What makes this route special", body: "NE Alberta Street is the creative heartbeat of Portland. Roughly thirty blocks of galleries, cafés, boutiques, and street art make it one of the most walkable art districts on the West Coast. The monthly Last Thursday event turns the entire street into an open-air gallery with live music, food carts, and buskers. Even on a regular weekday, the murals and independent shops give every block character." },
        { heading: "Getting there and starting point", body: "Bus 72 runs the length of Alberta Street. From downtown, transfer at a MAX light-rail stop. Free street parking is available along most of the route. Start around NE 15th Avenue and Alberta and walk east." },
        { heading: "Key stops", body: "Small galleries feature local artists and often let you meet the makers. Several third-wave roasters have tasting rooms attached. Vintage clothing and handmade jewellery shops are scattered between cafés. Large-scale murals appear every few blocks, turning the walk itself into a gallery visit." },
        { heading: "Best times to visit", body: "Morning for a quiet coffee start. Most galleries open around 11 am. Last Thursday — the final Thursday of each month, roughly 6 to 9 pm in summer — is the marquee event with street performers and food carts. Weekday afternoons are calm and pleasant for browsing." },
        { heading: "Practical tips", body: "The route is flat and easy to walk. Restrooms are available in cafés and restaurants. Portland rain is frequent, so bring a compact umbrella. Cards are accepted nearly everywhere. An eSIM lets you check gallery info and food-cart reviews on the go." },
      ],
      [
        { q: "When is Last Thursday?", a: "The last Thursday of every month. The biggest turnout is in summer (June to September), from about 6 to 9 pm." },
        { q: "Is it enjoyable in the rain?", a: "Yes — galleries and cafés provide plenty of indoor time between mural-spotting dashes." },
        { q: "Is Alberta Street family-friendly?", a: "Alberta Park has a playground, and the overall vibe is relaxed and welcoming for families." },
        { q: "How long does the walk take?", a: "Two to three hours. A half day if you linger in galleries and coffee shops." },
      ],
    ),
  },

  // ─── 8. Portland Hawthorne ──────────────────────────────────────
  "portland-hawthorne-walk": {
    ja: ja(US_JA_CTA,
      "ホーソン通りのヴィンテージと書店",
      "ポートランドのホーソン通りを歩き、ヴィンテージショップ・独立系書店・カフェを巡るルートガイド。",
      img("File:Hawthorne District Portland.jpg", 1280, 854, "ホーソン通り", "ヴィンテージとカウンターカルチャーの街"),
      [
        img("File:Powell's Books Hawthorne.jpg", 1280, 854, "パウエルズ・ブックス", "世界最大級の独立系書店の分店"),
        img("File:Hawthorne Bridge Portland.jpg", 1280, 854, "ホーソンブリッジ", "ウィラメット川を渡る歴史的な橋"),
        img("File:Bagdad Theater Portland.jpg", 1280, 854, "バグダッドシアター", "映画館兼ブルワリー"),
        img("File:Hawthorne Vintage Portland.jpg", 1280, 854, "ヴィンテージショップ", "古着とレトロ雑貨の宝庫"),
        img("File:Ladd's Addition Portland.jpg", 1280, 854, "ラッズアディション", "ヨーロッパ風の住宅街"),
      ],
      PORTLAND_X,
      [
        { heading: "このルートの特徴", body: "ホーソン通り（SE Hawthorne Boulevard）はポートランドの古くからのカウンターカルチャー地区です。パウエルズ・ブックスの分店を筆頭に、独立系書店、ヴィンテージショップ、レコード店が軒を連ねます。チェーン店が少なく、地元オーナーの個性的な店が中心。隣接するラッズアディションはダイアゴナル（斜め）の道路配置がユニークなヨーロッパ風住宅街で、散歩が楽しいエリアです。" },
        { heading: "アクセスと起点", body: "バス14番がホーソン通りを走っています。ダウンタウンからホーソンブリッジを渡って徒歩でもアクセス可能。起点はSE 12thアベニューあたりから東へ歩くのが効率的。ホーソンブリッジ自体も歩行者・自転車用レーンがあり、橋からの眺めが良いです。" },
        { heading: "主要スポット", body: "パウエルズ・ブックス（ホーソン店）は本店ほど大きくないですが、厳選されたセレクションが魅力。バグダッドシアターはマクメナミンズ系列の映画館兼ブルワリーで、ビール片手に映画を楽しめます。ヴィンテージショップは通り沿いに複数あり、70年代〜90年代の古着やレトロ家具が見つかります。カフェも個性的な店が多く、コーヒーの街ポートランドらしい体験ができます。" },
        { heading: "時間帯とタイミング", body: "午前中はカフェとパウエルズからスタート。ヴィンテージショップは11時頃から開店が多いです。午後は散策とウィンドウショッピング。バグダッドシアターで夕方の映画を観るのも良いプランです。週末は混みますが活気があり、平日はゆっくり店員と話しながら買い物できます。" },
        { heading: "実用情報", body: "通り沿いはフラットで歩きやすいです。トイレはパウエルズやバグダッドシアター内で利用可能。ほとんどの店がカード対応。ラッズアディションは住宅街なので静かに散策を。eSIMがあれば古着の相場検索や書店の在庫確認に便利です。" },
      ],
      [
        { q: "パウエルズ・ブックスの営業時間は?", a: "おおむね9〜21時ですが、季節や曜日で異なります。公式サイトで確認してください。" },
        { q: "バグダッドシアターの映画は英語のみ?", a: "上映作品はほぼ英語です。ビールやフードの注文は座席から可能です。" },
        { q: "ホーソン通りの治安は?", a: "日中は安全で、家族連れも多いエリアです。夜間も通り沿いは人通りがあります。" },
        { q: "所要時間は?", a: "2〜3時間が目安。映画鑑賞を含めると半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Hawthorne District Vintage and Bookshop Walk in Portland",
      "Browse Portland's Hawthorne Boulevard for indie bookstores, vintage shops, brewpub cinemas, and the quirky Ladd's Addition neighbourhood.",
      img("File:Hawthorne District Portland.jpg", 1280, 854, "Hawthorne District", "Vintage and counter-culture hub"),
      [
        img("File:Powell's Books Hawthorne.jpg", 1280, 854, "Powell's Books", "Branch of the world-famous bookstore"),
        img("File:Hawthorne Bridge Portland.jpg", 1280, 854, "Hawthorne Bridge", "Historic bridge over the Willamette"),
        img("File:Bagdad Theater Portland.jpg", 1280, 854, "Bagdad Theater", "Cinema-brewpub combo"),
        img("File:Hawthorne Vintage Portland.jpg", 1280, 854, "Vintage shop", "Retro clothing and collectibles"),
        img("File:Ladd's Addition Portland.jpg", 1280, 854, "Ladd's Addition", "European-style diagonal streets"),
      ],
      PORTLAND_X,
      [
        { heading: "What makes this route special", body: "SE Hawthorne Boulevard is Portland's long-standing counter-culture strip. Led by a branch of Powell's Books, the street is lined with independent bookshops, vintage stores, and record shops — very few chains in sight. Next door, Ladd's Addition has a rare diagonal street grid that feels almost European. The combination of browsable shops, strong coffee, and a brewpub cinema makes this one of the city's most rewarding walks." },
        { heading: "Getting there and starting point", body: "Bus 14 runs along Hawthorne. You can also walk from downtown across the Hawthorne Bridge, which has a dedicated pedestrian and bike lane with good river views. Start around SE 12th Avenue and head east." },
        { heading: "Key stops", body: "Powell's Books on Hawthorne is smaller than the flagship but has a curated selection. The Bagdad Theater, a McMenamins property, lets you watch a film with a craft beer in hand. Vintage shops along the boulevard stock 1970s to 1990s clothing and retro homewares. Cafés are plentiful and distinctly Portland — expect single-origin pour-overs and house-baked pastries." },
        { heading: "Best times to visit", body: "Morning is ideal for coffee and bookshop browsing. Vintage stores open around 11 am. Spend the afternoon window-shopping and exploring Ladd's Addition. An early evening film at the Bagdad Theater caps the day nicely. Weekdays are quieter; weekends are busier but more lively." },
        { heading: "Practical tips", body: "The boulevard is flat and easy to walk. Restrooms are available at Powell's and the Bagdad Theater. Nearly all shops accept cards. Ladd's Addition is residential, so keep noise down. An eSIM helps with checking vintage price comparisons and bookshop inventory." },
      ],
      [
        { q: "What are Powell's hours?", a: "Generally 9 am to 9 pm, but hours vary by season. Check the official site." },
        { q: "Are Bagdad Theater films in English?", a: "Yes. You can order beer and food from your seat." },
        { q: "Is Hawthorne safe?", a: "Very safe during the day, with families around. The boulevard stays lively into the evening." },
        { q: "How long is the walk?", a: "Two to three hours. Add time if you catch a movie." },
      ],
    ),
  },

  // ─── 9. Chicago Wicker Park ─────────────────────────────────────
  "chicago-wicker-park-walk": {
    ja: ja(US_JA_CTA,
      "ウィッカーパークのカフェとブティック散策",
      "シカゴのウィッカーパーク地区を歩き、トレンドカフェ・ブティック・ライブハウスを巡るルートガイド。",
      img("File:Wicker Park Chicago.jpg", 1280, 854, "ウィッカーパーク", "シカゴのトレンディな住宅街"),
      [
        img("File:Milwaukee Avenue Chicago.jpg", 1280, 854, "ミルウォーキーアベニュー", "ショップとカフェのメインストリート"),
        img("File:Wicker Park Fountain.jpg", 1280, 854, "ウィッカーパークの噴水", "公園中央のランドマーク"),
        img("File:Division Street Chicago.jpg", 1280, 854, "ディヴィジョンストリート", "レストランとバーが並ぶ"),
        img("File:Flat Iron Building Chicago.jpg", 1280, 854, "フラットアイアンビル", "三角形の歴史的建築"),
        img("File:Wicker Park Mural Chicago.jpg", 1280, 854, "ストリートアート", "地区を彩る壁画"),
      ],
      CHICAGO_X,
      [
        { heading: "このルートの特徴", body: "ウィッカーパークはシカゴ北西部のクリエイティブな地区で、1990年代のインディーロックシーンから発展したカルチャーが今も息づいています。ミルウォーキーアベニューを中心に、個性的なカフェ、デザイナーズブティック、レコードショップ、ライブハウスが集まります。ヴィクトリアン様式の住宅と現代的なショップが混在する街並みは、シカゴの新しい顔です。" },
        { heading: "アクセスと起点", body: "CTA（シカゴ交通局）ブルーラインのダーメン駅が最寄り。ダウンタウンのループから約15分です。駅を出ると目の前がミルウォーキー・ノース・ダーメンの6差路交差点で、ここが散策の起点。フラットアイアンビルが目印です。" },
        { heading: "主要スポット", body: "ミルウォーキーアベニュー沿いのカフェでコーヒーからスタート。ディヴィジョンストリートを東へ歩くとレストランやバーが並びます。ウィッカーパーク（公園）は噴水を中心にした緑地で、天気の良い日は地元の人がリラックスしています。ダーメンアベニュー沿いにはヴィンテージショップやレコード店も。夜はライブハウスでシカゴのインディーミュージックを体験できます。" },
        { heading: "時間帯とタイミング", body: "午前中はカフェ巡りに最適。ショップは11時頃から開店。午後は公園でひと休みしつつブティックを回ります。ディナーはディヴィジョンストリートの多国籍レストランで。金・土曜のライブハウスは要チェック。夏は公園でのイベントも多く、冬は屋内のカフェ巡りが楽しいです。" },
        { heading: "実用情報", body: "フラットな地形で歩きやすいです。トイレはカフェやレストランで利用。CTA1日パスがあればバスとの組み合わせも便利。治安は良好ですが、夜間の裏通りは避けましょう。eSIMがあればライブスケジュールやレストランの予約をリアルタイムで確認できます。" },
      ],
      [
        { q: "ウィッカーパークの治安は?", a: "日中はとても安全です。夜間もメインストリートは人通りが多く問題ありませんが、暗い裏通りは避けてください。" },
        { q: "おすすめのカフェは?", a: "地元ロースターの店が複数あり、どれもレベルが高いです。ミルウォーキーアベニュー沿いを歩けばすぐ見つかります。" },
        { q: "ライブハウスのチケットは?", a: "多くの会場でオンライン事前購入が可能です。当日券が出ることもありますが人気公演は売り切れます。" },
        { q: "所要時間は?", a: "2〜3時間でメインスポットを回れます。ディナーとライブ込みで半日〜一日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Wicker Park Café and Boutique Walk in Chicago",
      "Explore Chicago's Wicker Park for indie cafés, designer boutiques, record shops, and live-music venues around the six-way intersection.",
      img("File:Wicker Park Chicago.jpg", 1280, 854, "Wicker Park", "Chicago's creative neighbourhood"),
      [
        img("File:Milwaukee Avenue Chicago.jpg", 1280, 854, "Milwaukee Avenue", "Main strip of shops and cafés"),
        img("File:Wicker Park Fountain.jpg", 1280, 854, "Wicker Park fountain", "Centrepiece of the park"),
        img("File:Division Street Chicago.jpg", 1280, 854, "Division Street", "Restaurant and bar row"),
        img("File:Flat Iron Building Chicago.jpg", 1280, 854, "Flat Iron Building", "Triangular historic landmark"),
        img("File:Wicker Park Mural Chicago.jpg", 1280, 854, "Street art", "Murals across the district"),
      ],
      CHICAGO_X,
      [
        { heading: "What makes this route special", body: "Wicker Park is Chicago's creative quarter, rooted in the 1990s indie-rock scene and now home to a dense mix of cafés, boutiques, record shops, and live-music venues. Milwaukee Avenue is the spine, converging with Damen and North Avenues at the iconic six-way intersection. Victorian-era houses sit next to modern storefronts, giving the neighbourhood a layered visual character that feels distinctly Chicago." },
        { heading: "Getting there and starting point", body: "Take the CTA Blue Line to Damen station — about fifteen minutes from the Loop. Exit and you are at the six-way intersection, with the triangular Flat Iron Building as your landmark. Start here and fan out along Milwaukee, Damen, and Division." },
        { heading: "Key stops", body: "Begin with coffee at one of the local roasters on Milwaukee Avenue. Walk east on Division Street for a row of restaurants and bars. Wicker Park itself, the green space, has a central fountain and benches. Damen Avenue has vintage and record shops worth browsing. In the evening, catch a show at one of several intimate live-music venues to experience Chicago's indie scene first-hand." },
        { heading: "Best times to visit", body: "Morning for cafés, midday for shops — most open around 11 am. Afternoon in the park if the weather is fine. Dinner on Division Street at one of the multicultural restaurants. Friday and Saturday nights are best for live music. Summer brings outdoor events; winter shifts the focus to cosy café hopping." },
        { heading: "Practical tips", body: "The terrain is flat and walkable. Restrooms are available in cafés and restaurants. A CTA day pass makes bus connections easy. The neighbourhood is safe but avoid poorly lit side streets at night. An eSIM keeps you connected for live-show schedules and restaurant reservations." },
      ],
      [
        { q: "Is Wicker Park safe?", a: "Very safe during the day. At night, the main streets are well-trafficked. Avoid dark side streets." },
        { q: "Any café recommendations?", a: "Several local roasters line Milwaukee Avenue, all excellent. Just walk the strip and pick what catches your eye." },
        { q: "How do I get live-music tickets?", a: "Most venues sell tickets online in advance. Walk-ups are possible but popular shows sell out." },
        { q: "How much time do I need?", a: "Two to three hours for the highlights. A half to full day with dinner and a show." },
      ],
    ),
  },

  // ─── 10. Chicago Pilsen ─────────────────────────────────────────
  "chicago-pilsen-walk": {
    ja: ja(US_JA_CTA,
      "ピルゼン地区のメキシコ文化とミューラル",
      "シカゴのピルゼン地区を歩き、メキシコ系コミュニティの壁画・ギャラリー・タケリアを巡るルートガイド。",
      img("File:Pilsen Chicago.jpg", 1280, 854, "ピルゼンの壁画", "16thストリート沿いのカラフルなミューラル"),
      [
        img("File:National Museum of Mexican Art.jpg", 1280, 854, "メキシコ美術国立博物館", "入場無料の充実した美術館"),
        img("File:16th Street Pilsen.jpg", 1280, 854, "16thストリート", "メキシコ料理店が並ぶメインストリート"),
        img("File:Pilsen Murals Chicago.jpg", 1280, 854, "ピルゼンの壁画群", "建物全面を覆うミューラル"),
        img("File:Harrison Park Chicago.jpg", 1280, 854, "ハリソンパーク", "地域のコミュニティパーク"),
        img("File:18th Street Pilsen.jpg", 1280, 854, "18thストリート", "ギャラリーとショップ"),
      ],
      CHICAGO_X,
      [
        { heading: "このルートの特徴", body: "ピルゼンはシカゴ南西部のメキシコ系コミュニティが根づく地区で、建物全面を覆う大規模な壁画が地区のアイデンティティです。16thストリートと18thストリートを中心に、本格的なメキシコ料理店、パン屋（パナデリア）、ギャラリーが並びます。メキシコ美術国立博物館は入場無料で、メキシコとチカーノの芸術を幅広くコレクションしています。" },
        { heading: "アクセスと起点", body: "CTAピンクラインの18thストリート駅が最寄り。ダウンタウンのループから約10分です。駅を出て西に歩くとすぐ壁画が目に入ります。18thストリートを起点に南北に散策するのが効率的です。" },
        { heading: "主要スポット", body: "メキシコ美術国立博物館は3000点以上の作品を所蔵し、常設展・企画展ともに見応えがあります。16thストリート沿いの壁画は1970年代のチカーノ運動に端を発し、世代を超えて描き継がれています。タケリアでアル・パストールのタコス、パナデリアでコンチャ（甘いパン）を試してください。18thストリートには新しいギャラリーやカフェも増えています。" },
        { heading: "時間帯とタイミング", body: "午前中は壁画の撮影に最適な光。博物館は10時開館。ランチはタケリアで。午後はギャラリーと18thストリートのショップ巡り。毎年秋の「Día de los Muertos（死者の日）」パレードは地区最大のイベントで、特別な体験ができます。" },
        { heading: "実用情報", body: "フラットで歩きやすい地形です。トイレは博物館内とカフェで利用可能。タケリアは現金のみの店もあるので小額紙幣を。治安は日中問題ありませんが、夜間は大通りを歩きましょう。eSIMがあれば壁画のアーティスト情報やイベントスケジュールを確認できます。" },
      ],
      [
        { q: "メキシコ美術国立博物館の入場料は?", a: "無料です。火〜日曜、10〜17時開館。" },
        { q: "ピルゼンの治安は?", a: "日中は観光客も多く安全です。夜間はメインストリートを歩くようにしてください。" },
        { q: "英語は通じる?", a: "はい。スペイン語が主な店もありますが、英語でも問題なく注文できます。" },
        { q: "所要時間は?", a: "博物館込みで3〜4時間。食事を加えると半日です。" },
      ],
    ),
    en: en(US_EN_CTA,
      "Pilsen Mexican Culture and Mural Walk in Chicago",
      "Walk Chicago's Pilsen neighbourhood for large-scale murals, the free National Museum of Mexican Art, and authentic taquerias.",
      img("File:Pilsen Chicago.jpg", 1280, 854, "Pilsen murals", "Colourful murals along 16th Street"),
      [
        img("File:National Museum of Mexican Art.jpg", 1280, 854, "National Museum of Mexican Art", "Free admission, extensive collection"),
        img("File:16th Street Pilsen.jpg", 1280, 854, "16th Street", "Mexican restaurants and bakeries"),
        img("File:Pilsen Murals Chicago.jpg", 1280, 854, "Pilsen mural art", "Building-sized murals"),
        img("File:Harrison Park Chicago.jpg", 1280, 854, "Harrison Park", "Community green space"),
        img("File:18th Street Pilsen.jpg", 1280, 854, "18th Street", "Galleries and shops"),
      ],
      CHICAGO_X,
      [
        { heading: "What makes this route special", body: "Pilsen is the centre of Chicago's Mexican-American community and one of the country's most impressive open-air mural districts. Building-sized paintings line 16th and 18th Streets, many tracing back to the Chicano rights movement of the 1970s. The National Museum of Mexican Art — one of very few Latino museums with Smithsonian affiliate status — is free to enter. Add authentic taquerias and panaderías, and you have a neighbourhood that is as rewarding to eat through as it is to photograph." },
        { heading: "Getting there and starting point", body: "Take the CTA Pink Line to 18th Street station, about ten minutes from the Loop. Step outside and murals greet you immediately. Start on 18th Street and explore north and south from there." },
        { heading: "Key stops", body: "The National Museum of Mexican Art holds over 3,000 works spanning ancient to contemporary Mexican and Chicano art. Murals along 16th Street are multi-generational, each wall telling a different story. Try al pastor tacos at a taqueria and conchas at a panadería. Newer galleries and cafés are popping up along 18th Street." },
        { heading: "Best times to visit", body: "Morning light is best for mural photography. The museum opens at 10 am. Lunch at a taqueria around noon. Afternoon for galleries and 18th Street shops. The annual Día de los Muertos parade in autumn is the neighbourhood's biggest event and well worth timing a visit around." },
        { heading: "Practical tips", body: "Flat and walkable. Restrooms in the museum and cafés. Some taquerias are cash only, so carry small bills. Daytime safety is good; at night, stick to main streets. An eSIM helps with looking up mural artists and event schedules." },
      ],
      [
        { q: "Is the museum really free?", a: "Yes, always free. Open Tuesday to Sunday, 10 am to 5 pm." },
        { q: "Is Pilsen safe?", a: "Daytime is safe with plenty of foot traffic. At night, keep to the main streets." },
        { q: "Do I need Spanish?", a: "English works everywhere, though some shops are primarily Spanish-speaking." },
        { q: "How much time should I allow?", a: "Three to four hours including the museum. A half day with meals." },
      ],
    ),
  },

  // ─── 11. Hong Kong Sheung Wan ───────────────────────────────────
  "hongkong-sheung-wan-walk": {
    ja: ja(HK_JA_CTA,
      "上環のアンティークと乾物街散策",
      "香港・上環を歩き、骨董品店・乾物問屋・ハーブティーの老舗を巡る下町散策ルートガイド。",
      img("File:Sheung Wan Hong Kong.jpg", 1280, 854, "上環の街並み", "乾物店が並ぶ古い商店街"),
      [
        img("File:Cat Street Hong Kong.jpg", 1280, 854, "キャットストリート", "骨董品と雑貨の露店市"),
        img("File:Man Mo Temple Hong Kong.jpg", 1280, 854, "文武廟", "1847年建立の道教寺院"),
        img("File:Dried Seafood Street Hong Kong.jpg", 1280, 854, "乾物街", "干しアワビやフカヒレの問屋"),
        img("File:Hollywood Road Hong Kong.jpg", 1280, 854, "ハリウッドロード", "アートギャラリーが並ぶ通り"),
        img("File:PMQ Hong Kong.jpg", 1280, 854, "PMQ", "旧警察宿舎をリノベしたクリエイティブ施設"),
      ],
      HK_X,
      [
        { heading: "このルートの特徴", body: "上環（シェンワン）は香港島の西側に位置する歴史ある下町エリアです。キャットストリート（摩羅上街）の骨董品露店、デヴォーロードの乾物問屋街、ハリウッドロードのギャラリーなど、新旧が混在する独特の街歩きが楽しめます。中環（セントラル）の喧騒から少し離れた、よりローカルな香港を体験できるエリアです。" },
        { heading: "アクセスと起点", body: "MTR上環駅A2出口が最寄り。駅を出たら文咸東街（ボーナムストランドイースト）を西へ歩き始めます。中環駅からも徒歩10分程度。ヒルサイドエスカレーターの中腹からハリウッドロードに出ることもできます。起点は文武廟前が分かりやすいです。" },
        { heading: "主要スポット", body: "文武廟（マンモーテンプル）は1847年建立の道教寺院で、巨大な渦巻き線香が天井から吊り下がる独特の光景。キャットストリートでは毛沢東グッズや翡翠の小物、古い時計などが雑然と並びます。乾物街では干しアワビ、フカヒレ、干し貝柱の専門店が軒を連ね、香港の食文化を肌で感じられます。PMQは旧警察宿舎をリノベしたデザインショップ＆カフェの複合施設。" },
        { heading: "時間帯とタイミング", body: "午前中は乾物街が活気にあふれ、問屋の商売風景を見られます。キャットストリートは10時頃から露店が開きます。ランチは地元の茶餐廳（チャーチャンテン）で香港式ミルクティーとセットメニュー。午後はPMQやギャラリー巡り。週末は人出が多いですが、平日のほうがゆっくり写真を撮れます。" },
        { heading: "実用情報", body: "上環は坂道と階段が多いのでスニーカー推奨。トイレは文武廟横やPMQ内に。八達通（オクトパスカード）があれば交通もコンビニも便利です。乾物街の店は英語が通じにくいこともあるので指差しで。eSIMがあればマップと翻訳アプリが同時に使えて安心です。" },
      ],
      [
        { q: "キャットストリートは何を売っている?", a: "骨董品、古銭、翡翠の装飾品、中国雑貨、ヴィンテージ時計など雑多な露店市です。" },
        { q: "文武廟の入場料は?", a: "無料です。毎日8〜18時頃開放されています。線香をお供えすることもできます。" },
        { q: "乾物は買って帰れる?", a: "日本への持ち込みは食品検疫の対象になるものがあります。包装済みの乾燥エビやシイタケは比較的問題が少ないですが、事前に確認を。" },
        { q: "所要時間は?", a: "2〜3時間で主要スポットを回れます。ランチとPMQ込みで半日が目安です。" },
      ],
    ),
    en: en(HK_EN_CTA,
      "Sheung Wan Antiques and Dried-Goods Walk in Hong Kong",
      "Explore Hong Kong's Sheung Wan for Cat Street antique stalls, dried-seafood wholesalers, Man Mo Temple incense, and PMQ design shops.",
      img("File:Sheung Wan Hong Kong.jpg", 1280, 854, "Sheung Wan streetscape", "Traditional shophouses and dried-goods stores"),
      [
        img("File:Cat Street Hong Kong.jpg", 1280, 854, "Cat Street", "Open-air antique and curio market"),
        img("File:Man Mo Temple Hong Kong.jpg", 1280, 854, "Man Mo Temple", "Taoist temple built in 1847"),
        img("File:Dried Seafood Street Hong Kong.jpg", 1280, 854, "Dried seafood street", "Wholesale abalone and shark fin"),
        img("File:Hollywood Road Hong Kong.jpg", 1280, 854, "Hollywood Road", "Gallery-lined street"),
        img("File:PMQ Hong Kong.jpg", 1280, 854, "PMQ", "Former police quarters turned creative hub"),
      ],
      HK_X,
      [
        { heading: "What makes this route special", body: "Sheung Wan is the older, quieter sibling of neighbouring Central. Its narrow streets are a patchwork of antique stalls on Cat Street, wholesale dried-seafood shops, incense-filled temples, and contemporary galleries on Hollywood Road. The area lets you see a more local side of Hong Kong Island — the sounds of Cantonese bargaining, the smell of dried shrimp, and the haze of coil incense inside Man Mo Temple." },
        { heading: "Getting there and starting point", body: "Take the MTR to Sheung Wan station, exit A2. Walk west along Bonham Strand. You can also reach Hollywood Road via the Central–Mid-Levels Escalator from Central. A good starting point is the Man Mo Temple on Hollywood Road." },
        { heading: "Key stops", body: "Man Mo Temple, built in 1847, is famous for its giant coil incense spirals hanging from the ceiling. Cat Street is an open-air flea market of curios — Mao memorabilia, jade trinkets, vintage watches. The dried-seafood streets are a sensory overload of abalone, shark fin, and dried scallops. PMQ, a converted police married quarters, houses independent designers and cafés. Hollywood Road itself is lined with art galleries mixing Chinese antiquities with contemporary work." },
        { heading: "Best times to visit", body: "Morning is when the dried-goods wholesalers are busiest and most photogenic. Cat Street stalls open around 10 am. Lunch at a local cha chaan teng for milk tea and a set meal. Afternoon for PMQ and galleries. Weekdays are calmer for photography; weekends draw more crowds." },
        { heading: "Practical tips", body: "Sheung Wan has steep slopes and stairs — wear sturdy shoes. Restrooms are near Man Mo Temple and inside PMQ. An Octopus card covers transit and convenience stores. English may be limited in dried-goods shops, so pointing works. An eSIM keeps your map and translation apps running simultaneously." },
      ],
      [
        { q: "What is sold on Cat Street?", a: "Antiques, old coins, jade ornaments, Chinese curios, and vintage watches — a varied open-air flea market." },
        { q: "Is Man Mo Temple free?", a: "Yes, free entry. Open daily roughly 8 am to 6 pm. You can offer incense." },
        { q: "Can I bring dried goods home?", a: "Customs rules vary by country. Packaged dried shrimp and mushrooms are usually fine; check your destination's import rules for seafood products." },
        { q: "How much time do I need?", a: "Two to three hours for the main sights. Half a day with lunch and PMQ." },
      ],
    ),
  },

  // ─── 12. Hong Kong Sham Shui Po ─────────────────────────────────
  "hongkong-sham-shui-po-walk": {
    ja: ja(HK_JA_CTA,
      "深水埗のローカルマーケットと布市場",
      "香港・深水埗を歩き、電子部品街・布市場・屋台グルメのディープな下町を巡るルートガイド。",
      img("File:Sham Shui Po Market.jpg", 1280, 854, "深水埗のマーケット", "雑然とした露店が並ぶ下町"),
      [
        img("File:Apliu Street Hong Kong.jpg", 1280, 854, "鴨寮街", "電子部品とガジェットの露店市"),
        img("File:Ki Lung Street Hong Kong.jpg", 1280, 854, "基隆街", "布とボタンの問屋街"),
        img("File:Sham Shui Po Food.jpg", 1280, 854, "深水埗の屋台", "ローカルな麺や腸粉の店"),
        img("File:Jockey Club Creative Arts Centre.jpg", 1280, 854, "JCCAC", "旧工場ビルのアートセンター"),
        img("File:Mei Ho House Hong Kong.jpg", 1280, 854, "美荷樓", "公共住宅博物館兼ユースホステル"),
      ],
      HK_X,
      [
        { heading: "このルートの特徴", body: "深水埗（シャムスイポー）は九龍半島の下町で、香港のディープなローカル文化を体験できるエリアです。鴨寮街（アプリウストリート）は電子部品やヴィンテージガジェットの露天市、基隆街はボタン・リボン・布地の問屋が並ぶ手芸好きの聖地。観光客向けに整備されていない分、本来の香港の活気を感じられます。" },
        { heading: "アクセスと起点", body: "MTR深水埗駅A2出口が最寄り。駅を出るとすぐ鴨寮街の電子部品市が始まります。ダウンタウンの尖沙咀から荃湾線で4駅です。起点はMTR駅前から鴨寮街を北へ歩くルートがおすすめです。" },
        { heading: "主要スポット", body: "鴨寮街はUSBケーブルからヴィンテージラジオまで、電子製品が何でも揃うカオスな露店市。基隆街周辺の布問屋はプロのデザイナーも仕入れに来る場所で、少量でも購入可能。美荷樓は1950年代の公共住宅を博物館に改装したユニークなスポット。JCCAC（賽馬會創意藝術中心）は旧工場ビルに入ったアーティストのスタジオ＆ギャラリーです。" },
        { heading: "時間帯とタイミング", body: "鴨寮街は午前中から夕方まで営業。基隆街の布問屋は午前中が活気があります。ランチは地元の麺店や腸粉（チョンファン）の屋台で。JCCACは午後に訪れるのがおすすめで、週末にはオープンスタジオイベントがあることも。美荷樓は火〜日曜開館です。" },
        { heading: "実用情報", body: "歩道が狭く人混みが多いので貴重品の管理に注意。トイレはJCCACや美荷樓内に。露店は現金が基本なので小額紙幣を多めに。英語が通じにくい店も多いので翻訳アプリが役立ちます。eSIMがあればナビと翻訳を同時に使えて便利です。" },
      ],
      [
        { q: "深水埗は安全?", a: "日中は人通りが多く安全です。スリには注意し、貴重品はしっかり管理してください。" },
        { q: "布問屋で少量でも買える?", a: "はい。1ヤードから購入できる店が多いです。言葉が通じない場合は電卓で値段交渉を。" },
        { q: "美荷樓の入場料は?", a: "博物館部分は無料です。ユースホステル部分は宿泊者のみ。" },
        { q: "所要時間は?", a: "2〜3時間でメインスポットを回れます。ランチとJCCAC込みで半日です。" },
      ],
    ),
    en: en(HK_EN_CTA,
      "Sham Shui Po Local Markets and Fabric Walk in Hong Kong",
      "Dive into Kowloon's Sham Shui Po for electronics flea markets, wholesale fabric lanes, street-food stalls, and converted factory art spaces.",
      img("File:Sham Shui Po Market.jpg", 1280, 854, "Sham Shui Po market", "Bustling street stalls in Kowloon"),
      [
        img("File:Apliu Street Hong Kong.jpg", 1280, 854, "Apliu Street", "Electronics and gadget flea market"),
        img("File:Ki Lung Street Hong Kong.jpg", 1280, 854, "Ki Lung Street", "Fabric and button wholesalers"),
        img("File:Sham Shui Po Food.jpg", 1280, 854, "Street food", "Local noodles and cheung fun"),
        img("File:Jockey Club Creative Arts Centre.jpg", 1280, 854, "JCCAC", "Art centre in a former factory"),
        img("File:Mei Ho House Hong Kong.jpg", 1280, 854, "Mei Ho House", "Public-housing museum and hostel"),
      ],
      HK_X,
      [
        { heading: "What makes this route special", body: "Sham Shui Po is the unvarnished side of Hong Kong — a Kowloon neighbourhood where wholesale fabric markets, electronics flea stalls, and old-school noodle shops line narrow streets with zero pretension. Apliu Street sells everything from USB cables to vintage radios. Ki Lung Street is where professional designers source buttons, ribbons, and bolts of fabric. It is the opposite of the polished harbour-front experience, and that is exactly the appeal." },
        { heading: "Getting there and starting point", body: "Take the MTR Tsuen Wan Line to Sham Shui Po station, exit A2. You step directly into the Apliu Street flea market. It is four stops from Tsim Sha Tsui. Start at the station and walk north along Apliu Street." },
        { heading: "Key stops", body: "Apliu Street is a chaotic electronics bazaar — expect USB adapters, retro radios, and second-hand phones. Ki Lung Street's fabric wholesalers sell by the yard even to casual buyers. Mei Ho House is a 1950s public-housing block converted into a museum and youth hostel. JCCAC, the Jockey Club Creative Arts Centre, houses artist studios and galleries inside a former factory building." },
        { heading: "Best times to visit", body: "Apliu Street runs morning to evening. Fabric wholesalers are liveliest in the morning. Lunch at a local noodle stall or cheung-fun vendor. JCCAC is best in the afternoon; weekend open-studio events are a bonus. Mei Ho House museum is open Tuesday to Sunday." },
        { heading: "Practical tips", body: "Sidewalks are narrow and crowded — keep valuables secure. Restrooms are inside JCCAC and Mei Ho House. Market stalls are cash only, so bring plenty of small bills. English is limited in many shops, so a translation app helps. An eSIM lets you run navigation and translation simultaneously." },
      ],
      [
        { q: "Is Sham Shui Po safe?", a: "Daytime is safe with heavy foot traffic. Watch for pickpockets and keep belongings secure." },
        { q: "Can I buy fabric in small quantities?", a: "Yes, most shops sell by the yard. Use a calculator app for price negotiations if language is a barrier." },
        { q: "Is Mei Ho House free?", a: "The museum section is free. The hostel section is for guests only." },
        { q: "How much time do I need?", a: "Two to three hours for the main spots. Half a day with lunch and JCCAC." },
      ],
    ),
  },

  // ─── 13. Hong Kong Sai Kung ─────────────────────────────────────
  "hongkong-sai-kung-walk": {
    ja: ja(HK_JA_CTA,
      "西貢の海鮮街と海辺散策",
      "香港の西貢タウンを歩き、新鮮なシーフードと海辺の遊歩道を楽しむルートガイド。",
      img("File:Sai Kung Hong Kong.jpg", 1280, 854, "西貢の海辺", "漁船が並ぶウォーターフロント"),
      [
        img("File:Sai Kung Seafood Street.jpg", 1280, 854, "西貢海鮮街", "水槽から選ぶ新鮮シーフード"),
        img("File:Sai Kung Waterfront.jpg", 1280, 854, "西貢遊歩道", "海沿いの散歩道"),
        img("File:Sai Kung Town Centre.jpg", 1280, 854, "西貢タウン", "カフェや雑貨店が並ぶ中心部"),
        img("File:Sharp Island Hong Kong.jpg", 1280, 854, "橋咀洲", "ボートで行ける近くの離島"),
        img("File:Sai Kung Pier.jpg", 1280, 854, "西貢ピア", "漁船とチャーターボートの発着場"),
      ],
      HK_X,
      [
        { heading: "このルートの特徴", body: "西貢（サイクン）は香港の新界東部にある海辺の町で、「香港の裏庭」と呼ばれるほど自然が豊かです。ウォーターフロントには海鮮レストランが並び、目の前の水槽から好きな魚介を選んで調理してもらうスタイルが名物。小さな町ですが、カフェやジェラートショップも増え、海辺の散歩とグルメを同時に楽しめます。" },
        { heading: "アクセスと起点", body: "MTR彩虹駅からミニバス1A番で約30分。またはMTR鑽石山駅からバス92番でもアクセス可能。西貢バスターミナルが起点で、降りると目の前がウォーターフロントです。市街地はコンパクトなので、バスターミナルから徒歩で全エリアを回れます。" },
        { heading: "主要スポット", body: "海鮮街では活きたエビ、カニ、貝類を選び、隣接するレストランで調理してもらえます。値段交渉が必要なので、相場を確認してから。ウォーターフロントの遊歩道は海風が心地よく、漁船を眺めながら歩けます。ピアからはボートで橋咀洲（シャープアイランド）など近隣の島へ日帰りトリップも可能。町中にはジェラートショップやクラフトビールバーもあります。" },
        { heading: "時間帯とタイミング", body: "午前中に到着してウォーターフロント散歩、ランチに海鮮を楽しむのがベスト。午後はカフェやショップ巡り、またはボートで離島へ。週末は香港市民で混み合うので、平日がおすすめ。海鮮レストランは昼時が最も活気があります。" },
        { heading: "実用情報", body: "ミニバスは八達通カード利用可。海鮮の値段はキロ単位で交渉制のため、ぼったくりに注意。調理代は別料金（店によって異なる）。トイレはバスターミナル横とウォーターフロント沿いに公衆トイレがあります。eSIMがあればミニバスの時刻表や海鮮の相場を事前に調べられます。" },
      ],
      [
        { q: "海鮮レストランの予算は?", a: "2人で300〜600HKD程度が目安です。高級食材（ロブスターなど）を選ぶと上がります。" },
        { q: "離島ボートの料金は?", a: "橋咀洲へのチャーターボートは片道約50〜100HKD/人。週末は値段が上がることも。" },
        { q: "西貢は何時間あれば?", a: "海鮮ランチと散歩で3〜4時間。離島を含めると1日コースです。" },
        { q: "英語は通じる?", a: "観光客慣れしているので基本的に通じます。海鮮の値段交渉は電卓を使うとスムーズです。" },
      ],
    ),
    en: en(HK_EN_CTA,
      "Sai Kung Seafood and Waterfront Walk in Hong Kong",
      "Head to Sai Kung Town for tank-to-table seafood, a breezy waterfront promenade, and boat trips to nearby islands.",
      img("File:Sai Kung Hong Kong.jpg", 1280, 854, "Sai Kung waterfront", "Fishing boats moored along the shore"),
      [
        img("File:Sai Kung Seafood Street.jpg", 1280, 854, "Seafood street", "Pick your catch from live tanks"),
        img("File:Sai Kung Waterfront.jpg", 1280, 854, "Waterfront promenade", "Seaside walking path"),
        img("File:Sai Kung Town Centre.jpg", 1280, 854, "Sai Kung town", "Cafés and shops in the centre"),
        img("File:Sharp Island Hong Kong.jpg", 1280, 854, "Sharp Island", "Nearby island day trip"),
        img("File:Sai Kung Pier.jpg", 1280, 854, "Sai Kung pier", "Departure point for boat charters"),
      ],
      HK_X,
      [
        { heading: "What makes this route special", body: "Sai Kung is a seaside town in Hong Kong's New Territories, often called the city's back garden for its access to beaches and hiking. The waterfront seafood strip is the main draw — choose live fish, prawns, or crabs from pavement tanks and have them cooked in the restaurant next door. The compact town also has a growing café and gelato scene, making it an easy half-day escape from the urban core." },
        { heading: "Getting there and starting point", body: "Take the MTR to Choi Hung station, then minibus 1A — about thirty minutes. Alternatively, bus 92 from Diamond Hill MTR. The Sai Kung bus terminus is right on the waterfront and serves as the starting point. The town is small enough to cover entirely on foot." },
        { heading: "Key stops", body: "The seafood street lets you pick live shellfish and fish from tanks and carry them to an adjoining restaurant for cooking. Prices are per kilogram and negotiable — check going rates first. The waterfront promenade is pleasant for a stroll past fishing boats. From the pier, charter boats to Sharp Island or other nearby islands. Back in town, gelato shops and craft-beer bars are multiplying." },
        { heading: "Best times to visit", body: "Arrive in the morning for a waterfront walk, then lunch on seafood. Afternoon for cafés and shops, or a boat trip to an island. Weekends are busy with locals; weekdays are quieter. The seafood strip is liveliest around lunchtime." },
        { heading: "Practical tips", body: "Minibuses accept Octopus cards. Seafood prices are per kilogram and require bargaining — watch for overcharging and confirm the cooking fee separately. Public restrooms are near the bus terminus and along the waterfront. An eSIM helps with checking minibus schedules and seafood price references." },
      ],
      [
        { q: "How much does a seafood meal cost?", a: "Budget around HKD 300 to 600 for two people. Premium items like lobster push the price higher." },
        { q: "How much are the island boats?", a: "Charter boats to Sharp Island run about HKD 50 to 100 per person one way. Prices rise on weekends." },
        { q: "How long should I spend in Sai Kung?", a: "Three to four hours for seafood and a stroll. A full day if you add an island trip." },
        { q: "Is English spoken?", a: "The town is used to tourists, so basic English works. For seafood negotiation, a calculator app is handy." },
      ],
    ),
  },

  // ─── 14. Melbourne Fitzroy ──────────────────────────────────────
  "melbourne-fitzroy-walk": {
    ja: ja(AU_JA_CTA,
      "フィッツロイのカフェとストリートアート",
      "メルボルンのフィッツロイ地区を歩き、サードウェーブコーヒーとストリートアートを巡るルートガイド。",
      img("File:Fitzroy Melbourne.jpg", 1280, 854, "フィッツロイの街並み", "カフェとアートが共存する通り"),
      [
        img("File:Brunswick Street Melbourne.jpg", 1280, 854, "ブランズウィックストリート", "カフェとライブハウスのメイン通り"),
        img("File:Gertrude Street Melbourne.jpg", 1280, 854, "ガートルードストリート", "ギャラリーとバーが並ぶ"),
        img("File:Fitzroy Street Art.jpg", 1280, 854, "フィッツロイのストリートアート", "路地裏の大型ミューラル"),
        img("File:Smith Street Melbourne.jpg", 1280, 854, "スミスストリート", "多国籍レストランが並ぶ"),
        img("File:Edinburgh Gardens Melbourne.jpg", 1280, 854, "エディンバラガーデンズ", "地元民の憩いの公園"),
      ],
      MELBOURNE_X,
      [
        { heading: "このルートの特徴", body: "フィッツロイはメルボルンCBD（中心業務地区）のすぐ北に位置する、市内でもっともクリエイティブな地区です。ブランズウィックストリートとスミスストリートを中心に、サードウェーブのカフェ、ヴィンテージショップ、ライブハウス、多国籍レストランが密集。路地裏にはラージスケールのストリートアートが点在し、街歩き自体がアート体験になります。メルボルンのコーヒー文化を最も濃厚に体感できるエリアです。" },
        { heading: "アクセスと起点", body: "メルボルンCBDからトラム11番でブランズウィックストリート下車。徒歩でもCBDから15分程度です。起点はブランズウィックストリートとジョンストンストリートの交差点が分かりやすく、ここから北へ歩きます。ガートルードストリートから始めて東西に移動するルートもおすすめです。" },
        { heading: "主要スポット", body: "ブランズウィックストリート沿いのカフェはどこも本格的なスペシャルティコーヒーを提供。ガートルードストリートは先住民アートのギャラリーや小さなバーが集まるおしゃれな通り。裏路地（レーンウェイ）のストリートアートは定期的に更新されるので、何度訪れても新しい発見があります。スミスストリートはベトナム料理やエチオピア料理など多国籍な食が充実。エディンバラガーデンズは地元民のピクニックスポットです。" },
        { heading: "時間帯とタイミング", body: "朝はカフェでフラットホワイトとアボカドトースト。午前中にストリートアート巡り。ランチはスミスストリートの多国籍レストランで。午後はガートルードストリートのギャラリー。週末はブランズウィックストリートが混みますが活気があります。夜はライブハウスやバーが賑わいます。" },
        { heading: "実用情報", body: "フラットで歩きやすいです。トイレはカフェやエディンバラガーデンズに。メルボルンはカード社会で現金はほぼ不要。天気が変わりやすいので重ね着がおすすめ。eSIMがあればストリートアートのアーティスト検索やカフェの口コミ確認に便利です。" },
      ],
      [
        { q: "フィッツロイの治安は?", a: "日中はとても安全です。夜間もブランズウィックストリート沿いは人通りがあり問題ありません。" },
        { q: "おすすめのコーヒーショップは?", a: "ブランズウィックストリートには地元ロースターの直営店が複数あります。どこもレベルが高いので好みで選んでください。" },
        { q: "ストリートアートはどこで見られる?", a: "ブランズウィックストリートの裏路地やローズストリート周辺に大型作品が多いです。" },
        { q: "所要時間は?", a: "2〜3時間で主要エリアを回れます。ランチとカフェ休憩込みで半日が目安です。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Fitzroy Café and Street Art Walk in Melbourne",
      "Explore Melbourne's Fitzroy for third-wave coffee, laneway murals, live music, and multicultural dining on Brunswick and Smith Streets.",
      img("File:Fitzroy Melbourne.jpg", 1280, 854, "Fitzroy streetscape", "Where cafés and art coexist"),
      [
        img("File:Brunswick Street Melbourne.jpg", 1280, 854, "Brunswick Street", "Main strip of cafés and venues"),
        img("File:Gertrude Street Melbourne.jpg", 1280, 854, "Gertrude Street", "Galleries and small bars"),
        img("File:Fitzroy Street Art.jpg", 1280, 854, "Fitzroy street art", "Large-scale laneway murals"),
        img("File:Smith Street Melbourne.jpg", 1280, 854, "Smith Street", "Multicultural restaurant row"),
        img("File:Edinburgh Gardens Melbourne.jpg", 1280, 854, "Edinburgh Gardens", "Local picnic park"),
      ],
      MELBOURNE_X,
      [
        { heading: "What makes this route special", body: "Fitzroy is Melbourne's creative engine room, sitting just north of the CBD. Brunswick Street and Smith Street anchor the neighbourhood with specialty cafés, vintage shops, live-music venues, and restaurants spanning Vietnamese, Ethiopian, and beyond. Back lanes harbour large-scale murals that change regularly, turning every stroll into a gallery visit. It is the most concentrated expression of Melbourne's celebrated coffee culture." },
        { heading: "Getting there and starting point", body: "Tram 11 from the CBD drops you on Brunswick Street. Walking from the city takes about fifteen minutes. Start at the corner of Brunswick and Johnston Streets and head north. An alternative is to begin on Gertrude Street and zigzag east to Smith Street." },
        { heading: "Key stops", body: "Any Brunswick Street café serves serious specialty coffee — flat whites and single-origin pour-overs. Gertrude Street has Indigenous art galleries and intimate bars. Laneway murals rotate frequently, so there is always something new. Smith Street delivers multicultural food — Vietnamese pho, Ethiopian injera, Mexican tacos. Edinburgh Gardens is the neighbourhood's picnic and people-watching hub." },
        { heading: "Best times to visit", body: "Morning for a flat white and avocado toast. Mid-morning for mural hunting. Lunch on Smith Street. Afternoon in Gertrude Street galleries. Brunswick Street is busier on weekends but more atmospheric. Evening brings live music and bar culture." },
        { heading: "Practical tips", body: "Flat terrain, easy to walk. Restrooms in cafés and Edinburgh Gardens. Melbourne is almost entirely card-based — cash is rarely needed. Weather changes quickly, so layer up. An eSIM is useful for looking up street-art artists and café reviews." },
      ],
      [
        { q: "Is Fitzroy safe?", a: "Very safe by day. Brunswick Street stays busy into the evening with no issues." },
        { q: "Best coffee shop?", a: "Several local roasters have shopfronts on Brunswick Street. Quality is uniformly high — just pick one that catches your eye." },
        { q: "Where is the street art?", a: "Back lanes off Brunswick Street and around Rose Street have the largest pieces." },
        { q: "How long does the walk take?", a: "Two to three hours. Half a day with lunch and café stops." },
      ],
    ),
  },

  // ─── 15. Melbourne Laneways ─────────────────────────────────────
  "melbourne-laneways-walk": {
    ja: ja(AU_JA_CTA,
      "メルボルンのレーンウェイとアーケード",
      "メルボルンCBDの隠れた路地裏を歩き、歴史的アーケード・カフェ・ストリートアートを巡るルートガイド。",
      img("File:Melbourne Laneways.jpg", 1280, 854, "メルボルンのレーンウェイ", "ホージアレーンのストリートアート"),
      [
        img("File:Hosier Lane Melbourne.jpg", 1280, 854, "ホージアレーン", "世界的に有名なストリートアートの路地"),
        img("File:Block Arcade Melbourne.jpg", 1280, 854, "ブロックアーケード", "1892年築のヴィクトリアン建築"),
        img("File:Royal Arcade Melbourne.jpg", 1280, 854, "ロイヤルアーケード", "オーストラリア最古のアーケード"),
        img("File:Centre Place Melbourne.jpg", 1280, 854, "センタープレイス", "カフェが並ぶ狭い路地"),
        img("File:Degraves Street Melbourne.jpg", 1280, 854, "デグレーブスストリート", "メルボルンを代表するカフェ通り"),
      ],
      MELBOURNE_X,
      [
        { heading: "このルートの特徴", body: "メルボルンCBDに張り巡らされたレーンウェイ（路地裏）は、この街の最大の魅力のひとつです。ホージアレーンの世界的に有名なストリートアート、19世紀のヴィクトリアン建築が残るアーケード、そして路地裏に隠れた名カフェ。表通りからは見えない「裏のメルボルン」を発見する散策ルートです。" },
        { heading: "アクセスと起点", body: "フリンダースストリート駅が起点として最適。駅を出て北へ数分歩くとデグレーブスストリートに入ります。メルボルンCBDは無料トラムゾーン内なので、フリートラムで移動しながらレーンウェイに入る方法もあります。" },
        { heading: "主要スポット", body: "ホージアレーンはメルボルン随一のストリートアートスポットで、壁面が頻繁に塗り替えられます。ブロックアーケード（1892年）は精緻なモザイクタイルとガラス天井が美しく、老舗のティールームがあります。ロイヤルアーケードはオーストラリア最古のショッピングアーケード。センタープレイスとデグレーブスストリートは狭い路地にカフェが密集し、メルボルンのカフェ文化の象徴です。" },
        { heading: "時間帯とタイミング", body: "午前中のカフェタイムから始めるのが最適。ホージアレーンは午前中の光が美しく、観光客も少なめ。アーケードは10時頃から店が開きます。ランチはデグレーブスストリートかセンタープレイスのカフェで。午後は気ままにレーンウェイを探索。夜はライトアップされたアーケードも美しいです。" },
        { heading: "実用情報", body: "CBD内は完全にフラットで歩きやすいです。無料トラムゾーンを活用すれば広範囲を回れます。トイレはフリンダースストリート駅やアーケード内に。メルボルンはカード社会で現金はほぼ不要。eSIMがあればレーンウェイの位置を確認しながら迷わず歩けます。" },
      ],
      [
        { q: "ホージアレーンの入場料は?", a: "無料です。24時間オープンの公道です。" },
        { q: "アーケードの営業時間は?", a: "おおむね8〜18時（店舗は10〜17時頃）。日曜は短縮営業の店もあります。" },
        { q: "レーンウェイは安全?", a: "日中はとても安全。夜間も人通りの多い路地なら問題ありません。暗く人気のない路地は避けてください。" },
        { q: "所要時間は?", a: "主要スポットで2〜3時間。カフェ休憩込みで半日が楽しいです。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Melbourne Laneways and Arcades Walk",
      "Navigate Melbourne's hidden laneways for Hosier Lane street art, Victorian-era arcades, and tucked-away speciality coffee bars.",
      img("File:Melbourne Laneways.jpg", 1280, 854, "Melbourne laneways", "Hosier Lane street art"),
      [
        img("File:Hosier Lane Melbourne.jpg", 1280, 854, "Hosier Lane", "Internationally famous street art"),
        img("File:Block Arcade Melbourne.jpg", 1280, 854, "Block Arcade", "Victorian architecture from 1892"),
        img("File:Royal Arcade Melbourne.jpg", 1280, 854, "Royal Arcade", "Australia's oldest arcade"),
        img("File:Centre Place Melbourne.jpg", 1280, 854, "Centre Place", "Narrow laneway packed with cafés"),
        img("File:Degraves Street Melbourne.jpg", 1280, 854, "Degraves Street", "Melbourne's signature café strip"),
      ],
      MELBOURNE_X,
      [
        { heading: "What makes this route special", body: "Melbourne's CBD is threaded with laneways — narrow back alleys that hide world-class street art, century-old arcades, and some of the city's best cafés. Hosier Lane is the headline act, but dozens of smaller lanes reward exploration. The Victorian-era Block Arcade and Royal Arcade add architectural grandeur. This walk reveals the Melbourne that sits behind the main streets." },
        { heading: "Getting there and starting point", body: "Flinders Street Station is the ideal starting point. Walk north a few minutes to reach Degraves Street. The Melbourne CBD falls within the free-tram zone, so you can hop on and off trams to reach different laneway clusters." },
        { heading: "Key stops", body: "Hosier Lane is Melbourne's premier street-art destination, with walls repainted constantly. Block Arcade, built in 1892, features ornate mosaic floors, a glass canopy ceiling, and a heritage tearoom. Royal Arcade is Australia's oldest shopping arcade. Centre Place and Degraves Street are narrow lanes crammed with café tables — the epicentre of Melbourne's coffee culture." },
        { heading: "Best times to visit", body: "Morning for coffee on Degraves Street. Hosier Lane photographs best in morning light and is less crowded then. Arcade shops open around 10 am. Lunch in a laneway café. Afternoon for free-range exploration of smaller lanes. Arcades are beautiful under evening lights too." },
        { heading: "Practical tips", body: "The CBD is flat and walkable. Free trams extend your range. Restrooms at Flinders Street Station and inside arcades. Melbourne runs on cards — cash is seldom needed. An eSIM keeps your laneway maps accurate so you do not miss hidden entries." },
      ],
      [
        { q: "Is Hosier Lane free?", a: "Yes, it is a public street open around the clock." },
        { q: "What are the arcade hours?", a: "Roughly 8 am to 6 pm; individual shops open around 10 am to 5 pm. Some close early on Sundays." },
        { q: "Are the laneways safe?", a: "Very safe during the day. At night, stick to busy lanes and avoid dark, empty ones." },
        { q: "How long does the walk take?", a: "Two to three hours for the highlights. A half day with café breaks." },
      ],
    ),
  },

  // ─── 16. Sydney Surry Hills ─────────────────────────────────────
  "sydney-surry-hills-walk": {
    ja: ja(AU_JA_CTA,
      "サリーヒルズのカフェとブティック散策",
      "シドニーのサリーヒルズを歩き、スペシャルティコーヒーとデザイナーズブティックを巡るルートガイド。",
      img("File:Surry Hills Sydney.jpg", 1280, 854, "サリーヒルズの街並み", "テラスハウスとカフェが並ぶ住宅街"),
      [
        img("File:Crown Street Surry Hills.jpg", 1280, 854, "クラウンストリート", "カフェとブティックのメイン通り"),
        img("File:Bourke Street Surry Hills.jpg", 1280, 854, "バークストリート", "レストランとバーが並ぶ"),
        img("File:Shannon Reserve Surry Hills.jpg", 1280, 854, "シャノンリザーブ", "地域の小さな公園"),
        img("File:Brett Whiteley Studio.jpg", 1280, 854, "ブレット・ホワイトリースタジオ", "著名画家のアトリエ兼ギャラリー"),
        img("File:Surry Hills Markets Sydney.jpg", 1280, 854, "サリーヒルズマーケット", "毎週土曜のファーマーズマーケット"),
      ],
      SYDNEY_X,
      [
        { heading: "このルートの特徴", body: "サリーヒルズはシドニーCBDのすぐ南に位置する、カフェ文化とクリエイティブシーンが融合した住宅街です。ヴィクトリアン様式のテラスハウスが並ぶ街並みに、スペシャルティコーヒーのロースタリー、デザイナーズブティック、ギャラリーが点在。クラウンストリートとバークストリートを中心に、シドニーでもっとも食とファッションのレベルが高いエリアのひとつです。" },
        { heading: "アクセスと起点", body: "セントラル駅から徒歩5分。またはCBDからバス301・302番で。起点はセントラル駅のデヴォンシャーストリート出口が便利で、そこからクラウンストリートを北東へ歩きます。コンパクトなエリアなので全行程徒歩で回れます。" },
        { heading: "主要スポット", body: "クラウンストリート沿いのカフェで朝のフラットホワイトからスタート。オーストラリアを代表するロースターの直営店が複数あります。ブレット・ホワイトリースタジオは豪州の著名画家のアトリエをそのまま公開しているギャラリー。バークストリートはディナー向けのレストランが充実。土曜のファーマーズマーケットではオーガニック食材やベーカリーのパンが買えます。" },
        { heading: "時間帯とタイミング", body: "朝のカフェタイムが最高の体験。ブティックは10時頃から開店。土曜はファーマーズマーケット（8〜14時頃）が狙い目。ランチはクラウンストリートかバークストリートで。夕方以降はバーやレストランが賑わい、ディナーまで楽しめるエリアです。" },
        { heading: "実用情報", body: "緩やかな坂はありますが歩きやすいです。トイレはカフェやシャノンリザーブ周辺に。シドニーはカード社会でほぼ現金不要。天候が変わりやすいので羽織りものを。eSIMがあればカフェやレストランの口コミをリアルタイムで確認できます。" },
      ],
      [
        { q: "サリーヒルズの治安は?", a: "日中はとても安全。夜間もメインストリートは人通りが多く問題ありません。" },
        { q: "ファーマーズマーケットはいつ?", a: "毎週土曜、8〜14時頃。シャノンリザーブ周辺で開催されます。" },
        { q: "ブレット・ホワイトリースタジオの入場料は?", a: "無料です。金〜日曜のみ開館。" },
        { q: "所要時間は?", a: "2〜3時間でメインエリアを回れます。ランチとマーケット込みで半日です。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Surry Hills Café and Boutique Walk in Sydney",
      "Stroll Sydney's Surry Hills for specialty roasters, designer boutiques, Saturday farmers' markets, and Brett Whiteley's studio.",
      img("File:Surry Hills Sydney.jpg", 1280, 854, "Surry Hills streetscape", "Terrace houses and café culture"),
      [
        img("File:Crown Street Surry Hills.jpg", 1280, 854, "Crown Street", "Main café and boutique strip"),
        img("File:Bourke Street Surry Hills.jpg", 1280, 854, "Bourke Street", "Restaurants and bars"),
        img("File:Shannon Reserve Surry Hills.jpg", 1280, 854, "Shannon Reserve", "Small neighbourhood park"),
        img("File:Brett Whiteley Studio.jpg", 1280, 854, "Brett Whiteley Studio", "Artist's studio turned gallery"),
        img("File:Surry Hills Markets Sydney.jpg", 1280, 854, "Surry Hills Markets", "Saturday farmers' market"),
      ],
      SYDNEY_X,
      [
        { heading: "What makes this route special", body: "Surry Hills sits just south of Sydney's CBD and combines Victorian terrace-house charm with one of the city's strongest café and dining scenes. Crown Street and Bourke Street are lined with specialty roasters, designer boutiques, and galleries. The Brett Whiteley Studio preserves the famous Australian painter's workspace. On Saturdays, a farmers' market fills Shannon Reserve with organic produce and artisan bread." },
        { heading: "Getting there and starting point", body: "Central Station is a five-minute walk away. Buses 301 and 302 also serve the area from the CBD. Start at Central's Devonshire Street exit and walk northeast along Crown Street. The neighbourhood is compact and fully walkable." },
        { heading: "Key stops", body: "Start with a flat white at one of the Crown Street roasters — several of Australia's top coffee brands have flagship stores here. Brett Whiteley Studio is a free gallery preserving the painter's atelier. Bourke Street comes alive at dinner with upscale restaurants. The Saturday farmers' market at Shannon Reserve sells organic produce and bakery bread." },
        { heading: "Best times to visit", body: "Morning for the café experience. Boutiques open around 10 am. Saturday's farmers' market runs roughly 8 am to 2 pm. Lunch on Crown or Bourke Street. Evening dining and bar culture rounds out the day." },
        { heading: "Practical tips", body: "Gentle slopes but easy to walk. Restrooms in cafés and near Shannon Reserve. Sydney runs on cards — cash is rarely needed. Weather changes, so bring a layer. An eSIM keeps café and restaurant reviews at your fingertips." },
      ],
      [
        { q: "Is Surry Hills safe?", a: "Very safe during the day. Main streets are well-lit and busy at night too." },
        { q: "When is the farmers' market?", a: "Every Saturday, roughly 8 am to 2 pm, around Shannon Reserve." },
        { q: "Is Brett Whiteley Studio free?", a: "Yes, free admission. Open Friday to Sunday." },
        { q: "How long is the walk?", a: "Two to three hours. Half a day with the market and lunch." },
      ],
    ),
  },

  // ─── 17. Sydney Newtown ─────────────────────────────────────────
  "sydney-newtown-walk": {
    ja: ja(AU_JA_CTA,
      "ニュータウンのカウンターカルチャーとカフェ",
      "シドニーのニュータウンを歩き、ヴィンテージショップ・壁画・多国籍カフェを巡るルートガイド。",
      img("File:Newtown Sydney.jpg", 1280, 854, "ニュータウンの街並み", "キングストリートのカラフルな店舗"),
      [
        img("File:King Street Newtown.jpg", 1280, 854, "キングストリート", "ヴィンテージとカフェのメインストリート"),
        img("File:Newtown Street Art Sydney.jpg", 1280, 854, "ニュータウンのストリートアート", "建物を覆う大型ミューラル"),
        img("File:Enmore Road Sydney.jpg", 1280, 854, "エンモアロード", "ライブハウスが並ぶ通り"),
        img("File:Camperdown Memorial Rest Park.jpg", 1280, 854, "キャンパーダウンパーク", "歴史ある公園"),
        img("File:Newtown Vintage Sydney.jpg", 1280, 854, "ヴィンテージショップ", "古着とレトロ雑貨の宝庫"),
      ],
      SYDNEY_X,
      [
        { heading: "このルートの特徴", body: "ニュータウンはシドニーの内西部に位置するカウンターカルチャーの中心地です。キングストリートを軸に、ヴィンテージショップ、独立系書店、多国籍レストラン、ライブハウスが延々と続きます。LGBTQ+フレンドリーで、多様なコミュニティが共存する包容力のある雰囲気。建物の壁面にはストリートアートが描かれ、常に新しいカルチャーが生まれている街です。" },
        { heading: "アクセスと起点", body: "シドニートレインのニュータウン駅が最寄り。セントラル駅から2駅です。駅を出ると目の前がキングストリート。南へ向かって歩くとエンモアロードに繋がります。駅前から南へ下るルートが効率的です。" },
        { heading: "主要スポット", body: "キングストリートは全長約2kmで、ヴィンテージショップが集中する南半分が特に面白いです。タイ料理、ベトナム料理、レバノン料理など多国籍レストランのレベルが高く、リーズナブル。エンモアロードにはライブハウスのエンモアシアターがあり、地元バンドのギグが毎晩のように開催されています。壁面ミューラルはキングストリート沿いに複数あり、Iスクリームのアイコニックな壁画が有名です。" },
        { heading: "時間帯とタイミング", body: "午前中はカフェでブランチ。11時頃からヴィンテージショップが開きます。ランチはキングストリートの多国籍レストランで。午後はストリートアート散策とウィンドウショッピング。夜はエンモアロードのライブハウスやバーへ。週末は賑やかで、平日はゆっくり買い物できます。" },
        { heading: "実用情報", body: "キングストリートは長いので、興味のあるエリアを絞って歩くのがおすすめ。トイレはカフェやキャンパーダウンパークに。ほとんどの店がカード対応。eSIMがあればヴィンテージの相場チェックやライブスケジュール確認に便利です。" },
      ],
      [
        { q: "ニュータウンの治安は?", a: "日中も夜間もメインストリートは安全です。多様性を重視するフレンドリーな雰囲気です。" },
        { q: "おすすめのヴィンテージショップは?", a: "キングストリートの駅南側に集中しています。複数の店を回ると掘り出し物が見つかりやすいです。" },
        { q: "ライブハウスのチケットは?", a: "エンモアシアターはオンライン事前購入が基本。小さなバーは当日入場できることも多いです。" },
        { q: "所要時間は?", a: "2〜3時間でメインエリアを回れます。ディナーとライブ込みで半日〜1日です。" },
      ],
    ),
    en: en(AU_EN_CTA,
      "Newtown Counter-Culture and Café Walk in Sydney",
      "Walk Sydney's Newtown along King Street for vintage shops, street-art murals, multicultural dining, and live-music venues.",
      img("File:Newtown Sydney.jpg", 1280, 854, "Newtown streetscape", "Colourful shopfronts on King Street"),
      [
        img("File:King Street Newtown.jpg", 1280, 854, "King Street", "Main strip of vintage and cafés"),
        img("File:Newtown Street Art Sydney.jpg", 1280, 854, "Newtown street art", "Building-scale murals"),
        img("File:Enmore Road Sydney.jpg", 1280, 854, "Enmore Road", "Live-music venue row"),
        img("File:Camperdown Memorial Rest Park.jpg", 1280, 854, "Camperdown Park", "Historic green space"),
        img("File:Newtown Vintage Sydney.jpg", 1280, 854, "Vintage shops", "Retro clothing treasures"),
      ],
      SYDNEY_X,
      [
        { heading: "What makes this route special", body: "Newtown is Sydney's inner-west counter-culture hub. King Street runs for about two kilometres of vintage shops, independent bookstores, multicultural restaurants, and live-music venues. The neighbourhood is proudly LGBTQ+-friendly and diverse. Building-sized murals line the street, and new cultural energy is always bubbling up." },
        { heading: "Getting there and starting point", body: "Take the Sydney train to Newtown station, two stops from Central. King Street starts right at the station. Walk south toward Enmore Road for the full experience." },
        { heading: "Key stops", body: "The southern half of King Street has the densest cluster of vintage shops. Multicultural restaurants — Thai, Vietnamese, Lebanese — are excellent and affordable. The Enmore Theatre on Enmore Road hosts local and touring bands most nights. Several large murals are along King Street, including the iconic I Have a Dream piece." },
        { heading: "Best times to visit", body: "Morning for brunch at a café. Vintage shops open around 11 am. Lunch at a multicultural restaurant. Afternoon for street-art and window-shopping. Evenings for live music and bars on Enmore Road. Weekends are lively; weekdays are calmer for shopping." },
        { heading: "Practical tips", body: "King Street is long — focus on the section that interests you most. Restrooms in cafés and Camperdown Park. Most shops take cards. An eSIM helps with vintage price checks and gig schedules." },
      ],
      [
        { q: "Is Newtown safe?", a: "Safe day and night on the main streets. The atmosphere is friendly and inclusive." },
        { q: "Best vintage shops?", a: "Clustered on the southern end of King Street past the station. Browse several for the best finds." },
        { q: "How do I get live-music tickets?", a: "Enmore Theatre sells tickets online. Smaller bars often have walk-in entry." },
        { q: "How long is the walk?", a: "Two to three hours. A half to full day with dinner and a gig." },
      ],
    ),
  },

  // ─── 18. Vancouver Gastown ──────────────────────────────────────
  "vancouver-gastown-walk": {
    ja: ja(CA_JA_CTA,
      "ガスタウンの蒸気時計と倉庫リノベ散策",
      "バンクーバーのガスタウンを歩き、蒸気時計・レンガ倉庫リノベ・クラフトカクテルバーを巡るルートガイド。",
      img("File:Gastown Vancouver.jpg", 1280, 854, "ガスタウンの蒸気時計", "ウォーターストリートのランドマーク"),
      [
        img("File:Water Street Vancouver.jpg", 1280, 854, "ウォーターストリート", "石畳とレンガ倉庫の通り"),
        img("File:Gastown Steam Clock.jpg", 1280, 854, "蒸気時計", "15分ごとに蒸気を噴く時計"),
        img("File:Maple Tree Square Vancouver.jpg", 1280, 854, "メープルツリースクエア", "ガスタウンの起点の広場"),
        img("File:Blood Alley Vancouver.jpg", 1280, 854, "ブラッドアレー", "リノベされた裏路地"),
        img("File:Gastown Restaurants Vancouver.jpg", 1280, 854, "ガスタウンのレストラン", "倉庫リノベのダイニング"),
      ],
      VANCOUVER_X,
      [
        { heading: "このルートの特徴", body: "ガスタウンはバンクーバー発祥の地であり、19世紀のレンガ造りの倉庫がリノベされてレストラン・バー・ブティックに生まれ変わった歴史地区です。石畳のウォーターストリートに立つ蒸気時計は15分ごとに蒸気を噴き上げるフォトスポット。近年はクラフトカクテルバーやファームトゥテーブルのレストランが増え、バンクーバーのグルメシーンを牽引するエリアになっています。" },
        { heading: "アクセスと起点", body: "スカイトレインのウォーターフロント駅から徒歩5分。駅を出てウォーターストリートを東へ歩くとガスタウンに入ります。蒸気時計前が分かりやすい起点です。バラードインレット（港）を背にして南へ探索するルートもおすすめです。" },
        { heading: "主要スポット", body: "蒸気時計はガスタウンのシンボルで、正時と15分ごとに蒸気を噴きます。メープルツリースクエアはガスタウン創設者「ガッシー」ジャック・デイトンの像がある広場。ウォーターストリート沿いにはカナダ先住民アートのギャラリーや地元デザイナーのブティックが。ブラッドアレーはかつての精肉業地区をリノベした裏路地で、今は雰囲気のあるダイニングスポットです。" },
        { heading: "時間帯とタイミング", body: "午前中は蒸気時計の写真撮影に最適。ブティックは10時頃から開店。ランチはファームトゥテーブルのレストランで。午後はギャラリーと裏路地散策。夕方以降はカクテルバーが本領を発揮し、ガスタウンの雰囲気が最も魅力的になる時間帯です。" },
        { heading: "実用情報", body: "石畳の道なのでヒールは避けてスニーカーで。トイレはレストランやカフェで利用可能。バンクーバーは雨が多いので雨具を忘れずに。カード社会でほぼ現金不要。eSIMがあればレストランの予約やギャラリー情報の確認がスムーズです。" },
      ],
      [
        { q: "ガスタウンの治安は?", a: "メインストリートは安全ですが、東端のイーストヘイスティングスストリート方面は注意が必要です。夜間も観光エリア内は問題ありません。" },
        { q: "蒸気時計はいつ見られる?", a: "24時間屋外に設置されています。15分ごとに蒸気を噴くので、タイミングを少し待つだけです。" },
        { q: "先住民アートはどこで買える?", a: "ウォーターストリート沿いに数軒の専門ギャラリーがあります。認証付きの作品を扱う店を選んでください。" },
        { q: "所要時間は?", a: "1.5〜2.5時間で主要スポットを回れます。ディナーとバー込みで半日です。" },
      ],
    ),
    en: en(CA_EN_CTA,
      "Gastown Steam Clock and Warehouse Walk in Vancouver",
      "Explore Vancouver's Gastown for the iconic steam clock, brick-warehouse dining, Indigenous art galleries, and craft cocktail bars.",
      img("File:Gastown Vancouver.jpg", 1280, 854, "Gastown steam clock", "Water Street landmark"),
      [
        img("File:Water Street Vancouver.jpg", 1280, 854, "Water Street", "Cobblestones and brick warehouses"),
        img("File:Gastown Steam Clock.jpg", 1280, 854, "Steam clock", "Whistles every fifteen minutes"),
        img("File:Maple Tree Square Vancouver.jpg", 1280, 854, "Maple Tree Square", "Founding square of Gastown"),
        img("File:Blood Alley Vancouver.jpg", 1280, 854, "Blood Alley", "Renovated back lane"),
        img("File:Gastown Restaurants Vancouver.jpg", 1280, 854, "Gastown restaurants", "Warehouse-converted dining"),
      ],
      VANCOUVER_X,
      [
        { heading: "What makes this route special", body: "Gastown is where Vancouver began. Its nineteenth-century brick warehouses have been converted into restaurants, bars, and boutiques, while the cobblestone streets and the iconic steam clock — whistling every fifteen minutes — give the district an old-world feel. The area now leads Vancouver's food scene with farm-to-table restaurants and craft cocktail bars." },
        { heading: "Getting there and starting point", body: "SkyTrain to Waterfront station, then a five-minute walk east on Water Street. The steam clock is an obvious starting landmark. You can also start at Maple Tree Square on the eastern edge and walk west." },
        { heading: "Key stops", body: "The steam clock is Gastown's signature photo spot. Maple Tree Square has a statue of founder Gassy Jack Deighton. Water Street is lined with Indigenous art galleries and local-designer boutiques. Blood Alley, the former meatpacking lane, now hosts atmospheric dining. Evening cocktail bars in converted warehouse basements are a highlight." },
        { heading: "Best times to visit", body: "Morning for steam-clock photos. Shops open around 10 am. Lunch at a farm-to-table spot. Afternoon for gallery and lane exploration. Evening is when the cocktail bars and restaurants shine — Gastown's atmosphere peaks after dark." },
        { heading: "Practical tips", body: "Cobblestones mean flat shoes are best. Restrooms in restaurants and cafés. Vancouver is rainy — pack an umbrella. Cards are accepted nearly everywhere. An eSIM smooths restaurant bookings and gallery lookups." },
      ],
      [
        { q: "Is Gastown safe?", a: "The main tourist streets are safe. Avoid the east end toward East Hastings Street. Evening in the core district is fine." },
        { q: "When can I see the steam clock?", a: "It is outdoors and runs around the clock, whistling every fifteen minutes." },
        { q: "Where can I buy Indigenous art?", a: "Several certified galleries are on Water Street. Choose shops that carry authenticated works." },
        { q: "How much time do I need?", a: "Ninety minutes to two and a half hours. Half a day with dinner and bars." },
      ],
    ),
  },

  // ─── 19. Vancouver Granville Island ─────────────────────────────
  "vancouver-granville-island-walk": {
    ja: ja(CA_JA_CTA,
      "グランビルアイランドのマーケットとアート",
      "バンクーバーのグランビルアイランドを歩き、公設市場・アーティストスタジオ・クラフトビールを巡るルートガイド。",
      img("File:Granville Island Vancouver.jpg", 1280, 854, "グランビルアイランド", "フォールスクリーク沿いのマーケット地区"),
      [
        img("File:Granville Island Public Market.jpg", 1280, 854, "公設市場", "新鮮な食材とグルメが並ぶ"),
        img("File:Granville Island Artisan.jpg", 1280, 854, "アーティストスタジオ", "工芸作家の工房"),
        img("File:False Creek Vancouver.jpg", 1280, 854, "フォールスクリーク", "水上からの眺め"),
        img("File:Granville Island Brewing.jpg", 1280, 854, "グランビルアイランド・ブリューイング", "地元のクラフトビール醸造所"),
        img("File:Net Loft Granville Island.jpg", 1280, 854, "ネットロフト", "ブティックとギャラリーの複合施設"),
      ],
      VANCOUVER_X,
      [
        { heading: "このルートの特徴", body: "グランビルアイランドはバンクーバーのフォールスクリーク沿いにある旧工業地区で、1970年代にアートとマーケットの拠点に再開発されました。公設市場には地元の新鮮な農産物、チーズ、ベーカリー、シーフードが並び、週末は観光客と地元民で大賑わい。島内にはアーティストの工房やギャラリー、クラフトビール醸造所も点在し、食とアートを同時に楽しめるエリアです。" },
        { heading: "アクセスと起点", body: "ダウンタウンからアクアバス（小型フェリー）で約5分。水上からのアプローチが最もおすすめです。バス50番でもアクセス可能。車の場合は島内駐車場が限られるので公共交通が便利。起点は公設市場の入口から。" },
        { heading: "主要スポット", body: "公設市場は朝9時からオープンし、フルーツ、チーズ、スモークサーモン、焼きたてパンなど目移りする品揃え。フードコートではチャウダーや寿司も。ネットロフトにはブティックやテキスタイルギャラリーが入っています。アーティストスタジオでは陶芸やガラス工芸の制作過程を見学できます。グランビルアイランド・ブリューイングではテイスティングルームで地ビールを楽しめます。" },
        { heading: "時間帯とタイミング", body: "午前中に公設市場で朝食兼買い物。アーティストスタジオは10時頃から見学可能。ランチは市場内のフードコートで。午後はギャラリーとブリューイング。平日は混雑が少なくゆっくり回れます。夏の週末は非常に混むので、開店直後の到着がおすすめです。" },
        { heading: "実用情報", body: "島内はコンパクトで30分あれば一周できます。トイレは公設市場内に複数。市場内の食べ歩きは現金・カード両方対応。天候が良ければフォールスクリーク沿いのベンチでピクニックも。eSIMがあればアクアバスの時刻表やアーティスト情報を確認できます。" },
      ],
      [
        { q: "公設市場の営業時間は?", a: "毎日9〜19時頃（季節により変動）。月曜定休の場合もあるので確認を。" },
        { q: "アクアバスの料金は?", a: "片道3.75CAD程度。現金・カード両方対応です。" },
        { q: "子連れでも楽しめる?", a: "キッズマーケットという子ども向け施設もあり、家族連れに人気のスポットです。" },
        { q: "所要時間は?", a: "2〜3時間で主要スポットを回れます。ランチとブリューイング込みで半日です。" },
      ],
    ),
    en: en(CA_EN_CTA,
      "Granville Island Market and Art Walk in Vancouver",
      "Explore Vancouver's Granville Island for the public market, artist studios, craft brewing, and False Creek waterfront views.",
      img("File:Granville Island Vancouver.jpg", 1280, 854, "Granville Island", "Market district on False Creek"),
      [
        img("File:Granville Island Public Market.jpg", 1280, 854, "Public Market", "Fresh produce and gourmet food"),
        img("File:Granville Island Artisan.jpg", 1280, 854, "Artist studios", "Working craft workshops"),
        img("File:False Creek Vancouver.jpg", 1280, 854, "False Creek", "Views from the water"),
        img("File:Granville Island Brewing.jpg", 1280, 854, "Granville Island Brewing", "Local craft brewery"),
        img("File:Net Loft Granville Island.jpg", 1280, 854, "Net Loft", "Boutiques and galleries"),
      ],
      VANCOUVER_X,
      [
        { heading: "What makes this route special", body: "Granville Island is a former industrial site on False Creek that was transformed in the 1970s into an art-and-market destination. The Public Market is the centrepiece — stalls overflow with local produce, cheese, smoked salmon, and baked goods. Surrounding it are artist studios, a craft brewery, and boutique shops. Arriving by Aquabus across False Creek adds a scenic start." },
        { heading: "Getting there and starting point", body: "The Aquabus mini-ferry from downtown takes about five minutes and is the most scenic approach. Bus 50 also reaches the island. Parking is limited, so public transit is recommended. Start at the Public Market entrance." },
        { heading: "Key stops", body: "The Public Market opens at 9 am with fruit, cheese, smoked salmon, and fresh bread. The food court serves chowder, sushi, and more. Net Loft houses boutiques and textile galleries. Artist studios let you watch potters and glassblowers at work. Granville Island Brewing has a tasting room for local craft beers." },
        { heading: "Best times to visit", body: "Morning for market shopping and breakfast. Studios open around 10 am. Lunch in the food court. Afternoon for galleries and the brewery. Weekdays are calmer; summer weekends get crowded, so arrive at opening." },
        { heading: "Practical tips", body: "The island is compact — you can loop it in thirty minutes. Restrooms inside the Public Market. Market vendors accept cards and cash. Good weather invites picnicking along False Creek. An eSIM helps with Aquabus schedules and artist info." },
      ],
      [
        { q: "What are the market hours?", a: "Roughly 9 am to 7 pm daily, hours vary by season. Some vendors close on Mondays." },
        { q: "How much is the Aquabus?", a: "About CAD 3.75 one way. Cash and cards accepted." },
        { q: "Is it good for kids?", a: "The Kids Market on the island is a dedicated children's attraction, making it very family-friendly." },
        { q: "How long should I plan?", a: "Two to three hours. Half a day with lunch and the brewery." },
      ],
    ),
  },

  // ─── 20. Mexico City Roma-Condesa ───────────────────────────────
  "mexico-city-roma-condesa-walk": {
    ja: ja(MX_JA_CTA,
      "ローマ・コンデサ地区のアールデコ建築とカフェ",
      "メキシコシティのローマ・コンデサ地区を歩き、アールデコ建築・並木道・クラフトコーヒーを巡るルートガイド。",
      img("File:Condesa Mexico City.jpg", 1280, 854, "コンデサ地区", "並木道が美しい住宅街"),
      [
        img("File:Roma Norte Mexico City.jpg", 1280, 854, "ローマ・ノルテ", "アールデコとアールヌーヴォーの建築"),
        img("File:Parque Mexico.jpg", 1280, 854, "パルケ・メヒコ", "コンデサ地区の中心公園"),
        img("File:Avenida Amsterdam Mexico City.jpg", 1280, 854, "アムステルダム通り", "楕円形の並木道"),
        img("File:Alvaro Obregon Mexico City.jpg", 1280, 854, "アルバロ・オブレゴン通り", "カフェとレストランのメインストリート"),
        img("File:Fuente de Cibeles Mexico City.jpg", 1280, 854, "シベレスの噴水", "ローマ地区のランドマーク"),
        img("File:Condesa Cafe Mexico City.jpg", 1280, 854, "コンデサのカフェ", "スペシャルティコーヒーの店"),
      ],
      MEXICO_CITY_X,
      [
        { heading: "このルートの特徴", body: "ローマとコンデサはメキシコシティの中央部に隣接する二つの住宅地区で、1920〜40年代のアールデコ・アールヌーヴォー建築が数多く残っています。緑豊かな並木道、楕円形のアムステルダム通り、洗練されたカフェやレストランが特徴。近年はクリエイティブ産業が集積し、メキシコシティでもっともコスモポリタンなエリアとして知られています。" },
        { heading: "アクセスと起点", body: "メトロの1号線インスルヘンテス駅またはチャプルテペック駅が最寄り。メトロバスのソノラ停留所からも徒歩圏。起点はローマ・ノルテのアルバロ・オブレゴン通り東端からスタートし、西へ歩いてコンデサのパルケ・メヒコまで抜けるルートがおすすめです。全行程フラットで歩きやすいです。" },
        { heading: "主要スポット", body: "アルバロ・オブレゴン通りはローマ地区のメインストリートで、並木の下にカフェやギャラリーが並びます。シベレスの噴水はスペインのマドリードから送られたレプリカ。コンデサ地区に入ると楕円形のアムステルダム通りがあり、ジョギングや犬の散歩をする地元民で賑わいます。パルケ・メヒコは噴水とアールデコのベンチがある美しい公園。スペシャルティコーヒーショップも急増中です。" },
        { heading: "時間帯とタイミング", body: "午前中はカフェでチラキレスの朝食から。建築散策は午前の光がきれい。ランチはオブレゴン通りかコンデサのレストランで。午後はパルケ・メヒコとアムステルダム通りの散歩。夕方以降はルーフトップバーやレストランが賑わいます。日曜はアムステルダム通りに屋台が出ることもあります。" },
        { heading: "実用情報", body: "両地区とも歩道が広く歩きやすいです。メキシコシティは標高2240mで日差しが強いので日焼け止めと水を。トイレはカフェやレストランで。タクシーはUberが安全で便利。現金とカード両方使える店が多いですが、屋台は現金のみ。eSIMがあればUber配車やレストラン検索がスムーズです。" },
      ],
      [
        { q: "ローマ・コンデサの治安は?", a: "メキシコシティの中では安全なエリアです。日中は問題なく、夜間もメインストリートは人通りがあります。暗い裏通りは避けてください。" },
        { q: "メトロは安全?", a: "日中の利用は問題ありません。ラッシュ時は混雑するので貴重品に注意。女性専用車両もあります。" },
        { q: "英語は通じる?", a: "カフェやレストランでは基本的に通じます。メトロや屋台ではスペイン語が中心なので翻訳アプリがあると便利。" },
        { q: "所要時間は?", a: "両地区を歩いて3〜4時間。食事とカフェ休憩込みで半日が目安です。" },
        { q: "おすすめの季節は?", a: "11〜4月の乾季がベスト。雨季（6〜10月）は午後にスコールが来ますが、午前中は晴れることが多いです。" },
      ],
    ),
    en: en(MX_EN_CTA,
      "Roma-Condesa Art Deco and Café Walk in Mexico City",
      "Walk Mexico City's Roma and Condesa neighbourhoods for art-deco architecture, tree-lined Avenida Amsterdam, and specialty coffee.",
      img("File:Condesa Mexico City.jpg", 1280, 854, "Condesa neighbourhood", "Tree-lined residential streets"),
      [
        img("File:Roma Norte Mexico City.jpg", 1280, 854, "Roma Norte", "Art-deco and art-nouveau facades"),
        img("File:Parque Mexico.jpg", 1280, 854, "Parque México", "Central park of Condesa"),
        img("File:Avenida Amsterdam Mexico City.jpg", 1280, 854, "Avenida Amsterdam", "Oval-shaped boulevard with trees"),
        img("File:Alvaro Obregon Mexico City.jpg", 1280, 854, "Alvaro Obregón", "Main café and restaurant avenue"),
        img("File:Fuente de Cibeles Mexico City.jpg", 1280, 854, "Fuente de Cibeles", "Roma landmark fountain"),
        img("File:Condesa Cafe Mexico City.jpg", 1280, 854, "Condesa café", "Specialty coffee scene"),
      ],
      MEXICO_CITY_X,
      [
        { heading: "What makes this route special", body: "Roma and Condesa are twin residential neighbourhoods in central Mexico City, renowned for their concentration of 1920s–1940s art-deco and art-nouveau architecture. Leafy boulevards, the oval-shaped Avenida Amsterdam, and a thriving café and restaurant scene make these districts the most cosmopolitan corner of the city. In recent years, creative industries have clustered here, adding galleries, design shops, and specialty roasters to the mix." },
        { heading: "Getting there and starting point", body: "Take Metro Line 1 to Insurgentes or Chapultepec station. Metrobús stop Sonora is also within walking distance. Start at the eastern end of Avenida Alvaro Obregón in Roma Norte and walk west toward Parque México in Condesa. The entire route is flat." },
        { heading: "Key stops", body: "Avenida Alvaro Obregón is Roma's main artery, shaded by trees and lined with cafés and galleries. The Fuente de Cibeles is a replica fountain gifted by Madrid. Entering Condesa, Avenida Amsterdam forms an elegant oval loop popular with joggers and dog walkers. Parque México has art-deco benches and a central fountain. Specialty coffee shops are multiplying across both neighbourhoods." },
        { heading: "Best times to visit", body: "Morning for a chilaquiles breakfast and building photography in soft light. Lunch along Obregón or in Condesa. Afternoon for Parque México and Avenida Amsterdam. Evening for rooftop bars and restaurants. Sunday sometimes brings pop-up stalls on Amsterdam." },
        { heading: "Practical tips", body: "Wide sidewalks make both neighbourhoods very walkable. Mexico City sits at 2,240 metres, so sunscreen and water are essential. Restrooms in cafés and restaurants. Uber is safe and convenient. Most places accept cards, but street stalls want cash. An eSIM makes Uber and restaurant searches seamless." },
      ],
      [
        { q: "Is Roma-Condesa safe?", a: "It is one of Mexico City's safer areas. Daytime is fine, and main streets are busy at night. Avoid dark side streets." },
        { q: "Is the Metro safe?", a: "Daytime use is generally fine. Watch valuables in rush hour. Women-only carriages are available." },
        { q: "Is English spoken?", a: "Cafés and restaurants usually have English-speaking staff. Metro and stalls are mainly Spanish — a translation app helps." },
        { q: "How long does the walk take?", a: "Three to four hours across both neighbourhoods. Half a day with meals and café stops." },
        { q: "Best time of year?", a: "November to April, the dry season. The rainy season (June to October) brings afternoon showers, but mornings are usually clear." },
      ],
    ),
  },
};

export const AMERICAS_OTHERS_GUIDE_SLUGS = Object.keys(AMERICAS_OTHERS_GUIDE_CONTENT);
