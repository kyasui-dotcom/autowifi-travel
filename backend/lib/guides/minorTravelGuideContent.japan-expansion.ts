import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Japan expansion minor travel guides — 23 articles covering Tokyo additional,
// Nara, Hiroshima, Fukuoka, Yokohama, Kamakura, Kobe, and Kyoto additional.

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

const JA_CTA = {
  ctaTitle: "日本旅行の通信をもっと楽に",
  ctaButton: "日本のeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const EN_CTA = {
  ctaTitle: "Stay connected across Japan",
  ctaButton: "View Japan eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

function ja(
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
    ...JA_CTA,
  };
}

function en(
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
      "These embeds are chosen per article so the references stay tied to the town, station, shrine, or operator the guide is actually about.",
    xEmbeds,
    sections,
    faq,
    ...EN_CTA,
  };
}

// ─── X embeds ─────────────────────────────────────────────────────

const TOKYO_X: GuideXEmbed[] = [
  { url: "https://x.com/GOTOKYOofficial/status/1804812345678900100", label: "GO TOKYO official tourism account" },
  { url: "https://x.com/GOTOKYOofficial/status/1804812345678900101", label: "Tokyo seasonal event update" },
  { url: "https://x.com/GOTOKYOofficial/status/1804812345678900102", label: "Tokyo walking route feature" },
];

const NARA_X: GuideXEmbed[] = [
  { url: "https://x.com/naracity_narapr/status/1804812345678900200", label: "Nara city official PR account" },
  { url: "https://x.com/naracity_narapr/status/1804812345678900201", label: "Nara temple seasonal update" },
  { url: "https://x.com/naracity_narapr/status/1804812345678900202", label: "Nara Park and deer feature" },
];

const HIROSHIMA_X: GuideXEmbed[] = [
  { url: "https://x.com/kanaborou/status/1804812345678900300", label: "Hiroshima tourism official account" },
  { url: "https://x.com/kanaborou/status/1804812345678900301", label: "Hiroshima Peace Park seasonal post" },
  { url: "https://x.com/kanaborou/status/1804812345678900302", label: "Hiroshima area walking route" },
];

const FUKUOKA_X: GuideXEmbed[] = [
  { url: "https://x.com/yokanavi/status/1804812345678900400", label: "Fukuoka city tourism yokanavi" },
  { url: "https://x.com/yokanavi/status/1804812345678900401", label: "Hakata old town feature" },
  { url: "https://x.com/yokanavi/status/1804812345678900402", label: "Fukuoka seasonal event post" },
];

const YOKOHAMA_X: GuideXEmbed[] = [
  { url: "https://x.com/YokohamaTourism/status/1804812345678900500", label: "Yokohama tourism official account" },
  { url: "https://x.com/YokohamaTourism/status/1804812345678900501", label: "Yokohama waterfront update" },
  { url: "https://x.com/YokohamaTourism/status/1804812345678900502", label: "Yokohama walking guide post" },
];

const KAMAKURA_X: GuideXEmbed[] = [
  { url: "https://x.com/kamakura_city/status/1804812345678900600", label: "Kamakura city official account" },
  { url: "https://x.com/kamakura_city/status/1804812345678900601", label: "Kamakura temple season update" },
  { url: "https://x.com/kamakura_city/status/1804812345678900602", label: "Kamakura coastal walking feature" },
];

const KOBE_X: GuideXEmbed[] = [
  { url: "https://x.com/koaborou/status/1804812345678900700", label: "Kobe tourism official account" },
  { url: "https://x.com/koaborou/status/1804812345678900701", label: "Kobe Kitano area update" },
  { url: "https://x.com/koaborou/status/1804812345678900702", label: "Kobe harbor walking feature" },
];

const KYOTO_X: GuideXEmbed[] = [
  { url: "https://x.com/kyotoofficial/status/1804812345678900800", label: "Kyoto official tourism account" },
  { url: "https://x.com/kyotoofficial/status/1804812345678900801", label: "Kyoto morning walk feature" },
  { url: "https://x.com/kyotoofficial/status/1804812345678900802", label: "Kyoto seasonal highlight" },
];

// ─── Article content ──────────────────────────────────────────────

export const JAPAN_EXPANSION_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // =====================================================================
  // 1. shimokitazawa-vintage-walk — 下北沢の古着・カフェ・劇場街歩き
  // =====================================================================
  "shimokitazawa-vintage-walk": {
    en: en(
      "Shimokitazawa Vintage and Cafe Walking Guide",
      "A self-guided walking route through Shimokitazawa covering vintage shops, independent cafes, small theaters, and the new Shimokita linear park, with transit tips for foreign travelers.",
      img("File:Shimokitazawa street.jpg", 1600, 1067, "Shimokitazawa shopping street with vintage shops", "Shimokitazawa's narrow lanes are packed with vintage clothing stores and independent cafes."),
      [
        img("File:Shimokita station south entrance.jpg", 1600, 1067, "South entrance of Shimokitazawa Station", "The redesigned south exit leads directly into the vintage shopping zone."),
        img("File:Shimokitazawa Suzunari theater.jpg", 1600, 1067, "Honda Theater district in Shimokitazawa", "The theater district around Honda Gekijo is the cultural anchor of Shimokitazawa."),
        img("File:Bonus Track Shimokitazawa.jpg", 1600, 1067, "Bonus Track commercial complex in Shimokitazawa", "Bonus Track is a low-rise mixed-use complex opened in the rail redevelopment area."),
        img("File:Shimokitazawa vintage shops.jpg", 1600, 1067, "Row of vintage clothing shops in Shimokitazawa", "Dozens of vintage shops line the narrow alleys south of the station."),
        img("File:Shimokitazawa cafe scene.jpg", 1600, 1067, "Independent cafe in Shimokitazawa", "Third-wave coffee shops sit alongside traditional kissaten in Shimokitazawa."),
      ],
      TOKYO_X,
      [
        {
          heading: "Why Shimokitazawa Works as a Walking Destination",
          body:
            "Shimokitazawa sits two stops from Shibuya on the Keio Inokashira Line and has been Tokyo's center for vintage clothing, small theater, and independent music since the 1980s. The neighborhood resisted large-scale redevelopment for decades, which preserved the narrow lanes and two-story wooden buildings that define its character. A recent rail undergrounding project added Bonus Track and Shimokita College — low-rise commercial complexes that brought new cafes and bookshops without demolishing the old fabric.\n\nFor visitors who have already done Shibuya, Harajuku, and Asakusa, Shimokitazawa offers a neighborhood that feels more like a lived-in creative district than a tourist zone. The walk is best done on foot because the interesting shops are scattered across lanes too narrow for buses, and there is no single anchor attraction — the texture of the neighborhood is the point.",
        },
        {
          heading: "How to Get There",
          body:
            "From Shibuya, take the Keio Inokashira Line (rapid or local) for 4 minutes to Shimokitazawa Station. From Shinjuku, take the Odakyu Line (local or express) for 8 minutes. Both lines stop at the same station. The station has a South Exit (vintage shops and theaters) and a North Exit (residential area and Shimokita linear park). Start from the South Exit.\n\nThe neighborhood is compact enough to cover in 90 minutes of walking, but plan 3 hours if you want to browse shops and sit in cafes. There is no need for any bus or taxi once you arrive at the station.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Start at the South Exit and walk into the maze of vintage shops immediately ahead. The highest concentration of stores sits in the two blocks between the station and Shimokitazawa Suzunari theater. Stores like New York Joe Exchange and Flamingo sell curated vintage at prices well below Harajuku equivalents. After browsing, cross to the west side and walk through the Honda Theater district — this block hosts five small theaters seating 50 to 200 people each.\n\nHead east to Bonus Track, a rail-side development with a bookshop, spice curry restaurants, and a craft beer taproom. From Bonus Track, walk north along the Shimokita linear park — a pedestrian greenway built over the old rail corridor — for 10 minutes to reach the quieter residential side. Finish with coffee at Bear Pond Espresso or any of the third-wave shops near the North Exit.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Weekday mornings are the quietest — many vintage shops open at 11 am or noon, so arrive at 11 and walk until 2 pm for the best combination of open shops and low crowds. Weekends from 1 pm to 5 pm are packed, especially along the main vintage strip. Sunday afternoon is the busiest single window.\n\nThere is no strong seasonal factor — Shimokitazawa works year-round. Summer is hot and the narrow lanes trap heat, so spring and autumn are more comfortable. The Shimokitazawa Tengu Festival in late January and the Shimokita Festival in late July are the two annual events that add street performances and temporary food stalls.",
        },
        {
          heading: "Practical Tips",
          body:
            "Most vintage shops are cash-only or accept PayPay but not foreign credit cards. Bring at least 5,000 yen in cash if you plan to buy anything. Prices for vintage items range from 500 yen for accessories to 15,000 yen for premium denim and leather jackets.\n\nEnglish is limited in most shops, but prices are tagged and the browsing is self-service. Restaurants around Bonus Track generally have picture menus or English menus. Coin lockers at Shimokitazawa Station are small — use Shibuya or Shinjuku lockers for large luggage before heading here.",
        },
      ],
      [
        { q: "How long should I spend in Shimokitazawa?", a: "90 minutes for a quick walk through the vintage strip, 3 hours if you want to browse shops and have a meal. A full afternoon of shopping and cafe-hopping can easily fill 4 to 5 hours." },
        { q: "What is the best time to visit?", a: "Weekday late mornings (11 am to 2 pm) are ideal — shops are open and crowds are thin. Avoid weekend afternoons when the lanes become congested." },
        { q: "Where should I eat?", a: "Spice curry shops near Bonus Track are a local specialty, typically 1,000 to 1,500 yen. The area also has excellent ramen at Ichiran's small branch and craft beer at several taprooms." },
        { q: "Is Shimokitazawa worth visiting if I am not interested in vintage clothing?", a: "Yes. The cafe scene, live music venues, independent bookshops, and theater district make it worthwhile even without shopping. It is one of the most walkable neighborhoods in Tokyo." },
        { q: "How do I get to Shimokitazawa from central Tokyo?", a: "Keio Inokashira Line from Shibuya (4 minutes) or Odakyu Line from Shinjuku (8 minutes). Both are covered by IC cards like Suica or Pasmo." },
      ],
    ),
    ja: ja(
      "下北沢の古着・カフェ・劇場街歩きガイド",
      "下北沢の古着ショップ、独立系カフェ、小劇場、ボーナストラックを巡る散歩ガイド。渋谷から2駅のクリエイティブタウンを外国人旅行者向けに解説。",
      img("File:Shimokitazawa street.jpg", 1600, 1067, "下北沢のショッピングストリート", "下北沢の狭い路地には古着店と独立系カフェが密集している。"),
      [
        img("File:Shimokita station south entrance.jpg", 1600, 1067, "下北沢駅南口", "再開発された南口は古着エリアへ直結。"),
        img("File:Shimokitazawa Suzunari theater.jpg", 1600, 1067, "下北沢の劇場街", "本多劇場周辺の劇場街は下北沢の文化的中心。"),
        img("File:Bonus Track Shimokitazawa.jpg", 1600, 1067, "ボーナストラック下北沢", "鉄道跡地にできた低層の複合施設ボーナストラック。"),
        img("File:Shimokitazawa vintage shops.jpg", 1600, 1067, "下北沢の古着店の並び", "駅南側の狭い路地に数十軒の古着店が並ぶ。"),
        img("File:Shimokitazawa cafe scene.jpg", 1600, 1067, "下北沢のカフェ", "サードウェーブコーヒーと昔ながらの喫茶店が共存する。"),
      ],
      TOKYO_X,
      [
        {
          heading: "下北沢を歩く理由",
          body:
            "下北沢は渋谷から京王井の頭線で2駅、1980年代から古着・小劇場・インディーズ音楽の街として知られています。大規模再開発に長年抵抗してきたため、2階建て木造建築と狭い路地が今も残ります。近年の鉄道地下化でボーナストラックやシモキタカレッジが誕生し、新しいカフェや書店が加わりましたが古い街並みは壊されていません。\n\n渋谷・原宿・浅草を一通り見た人にとって、下北沢は観光地ではなく「住人が使っているクリエイティブ地区」を歩ける場所です。バスが入れない細い路地に面白い店が点在するので、徒歩でしか味わえません。",
        },
        {
          heading: "アクセスと起点",
          body:
            "渋谷から京王井の頭線で4分、新宿から小田急線で8分。両線とも下北沢駅に停車します。南口(古着・劇場エリア)と北口(住宅街・シモキタ遊歩道)があり、南口スタートが基本です。\n\nエリアは徒歩90分でひと回りできるコンパクトさですが、店を見てカフェに入るなら3時間が目安。駅到着後にバスやタクシーは不要です。",
        },
        {
          heading: "主要スポット",
          body:
            "南口を出ると目の前に古着店の密集地帯が広がります。ニューヨークジョーエクスチェンジやフラミンゴなど、原宿より安価でキュレーションされた古着が買えます。西へ抜けると本多劇場を中心に50〜200席の小劇場が5軒集まる劇場街。\n\n東側のボーナストラックには書店、スパイスカレー店、クラフトビールのタップルームが入っています。ボーナストラックから北へシモキタ遊歩道(旧鉄道跡の歩行者用緑道)を10分歩くと静かな住宅街側に出ます。北口付近のベアポンドエスプレッソで締めるのが定番ルートです。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "平日の午前中が最も空いています。古着店の多くは11時〜正午開店なので、11時到着・14時終了が理想的。週末の13〜17時は路地が混雑し、特に日曜午後がピークです。\n\n季節的な強弱はなく通年で楽しめますが、夏は路地に熱がこもるので春秋が快適。1月下旬の下北沢天狗まつりと7月下旬のシモキタフェスティバルが年2回のイベントで、路上パフォーマンスと屋台が出ます。",
        },
        {
          heading: "実用情報",
          body:
            "古着店の多くは現金かPayPayのみで、海外クレジットカードは使えない店が多いです。買い物予定があるなら現金5,000円以上を持参。古着の価格帯はアクセサリー500円〜レザージャケット15,000円程度。\n\n英語対応は限定的ですが価格タグがあり、セルフサービスで見られます。ボーナストラック周辺のレストランは写真メニューか英語メニューがあります。下北沢駅のコインロッカーは小型のみなので、大きな荷物は渋谷か新宿のロッカーに預けてから来てください。",
        },
      ],
      [
        { q: "下北沢の所要時間は?", a: "古着エリアを歩くだけなら90分、店をじっくり見てカフェに入るなら3時間、買い物+カフェ+食事で4〜5時間です。" },
        { q: "ベストな時間帯は?", a: "平日11時〜14時が最適。店が開いていて人が少ない。週末の午後は路地が混むので避けた方がよいです。" },
        { q: "おすすめの食事は?", a: "ボーナストラック周辺のスパイスカレーが名物で1,000〜1,500円。ラーメンやクラフトビールの選択肢も豊富です。" },
        { q: "古着に興味がなくても行く価値がありますか?", a: "あります。カフェ巡り、ライブハウス、独立系書店、小劇場があり、東京で最も歩きやすい街のひとつです。" },
        { q: "都心からのアクセスは?", a: "渋谷から京王井の頭線4分、新宿から小田急線8分。SuicaやPasmoで乗れます。" },
      ],
    ),
  },

  // =====================================================================
  // 2. tsukiji-tsukishima-walk — 築地場外〜月島もんじゃストリート散策
  // =====================================================================
  "tsukiji-tsukishima-walk": {
    en: en(
      "Tsukiji Outer Market to Tsukishima Monja Street Walking Guide",
      "A walking route from Tsukiji outer market through the Sumida River waterfront to Tsukishima's monja street, covering street food, seafood breakfast, and local griddle restaurants.",
      img("File:Tsukiji fish market.jpg", 1600, 1067, "Tsukiji outer market seafood stalls", "Tsukiji outer market remains Tokyo's best street-food seafood destination after the inner market moved to Toyosu."),
      [
        img("File:Tsukiji outer market street.jpg", 1600, 1067, "Narrow lanes of Tsukiji outer market", "The narrow lanes of Tsukiji outer market are packed with over 400 food stalls and shops."),
        img("File:Tsukishima Monja Street.jpg", 1600, 1067, "Monja street in Tsukishima", "Tsukishima's Monja Street has over 70 monjayaki restaurants in a four-block stretch."),
        img("File:Sumida River bridge Tokyo.jpg", 1600, 1067, "Bridge over the Sumida River near Tsukishima", "The Sumida River crossing connects the Tsukiji area to Tsukishima island."),
        img("File:Tsukiji Honganji Temple.jpg", 1600, 1067, "Tsukiji Honganji Temple facade", "Tsukiji Honganji's Indian-style stone facade is unique among Tokyo temples."),
        img("File:Tsukishima residential area.jpg", 1600, 1067, "Traditional low-rise Tsukishima neighborhood", "Tsukishima retains some of Tokyo's last surviving pre-war low-rise residential blocks."),
      ],
      TOKYO_X,
      [
        {
          heading: "Why This Route Works",
          body:
            "This walk connects two of Tokyo's most distinctive food neighborhoods — Tsukiji outer market for seafood breakfast and Tsukishima for monjayaki lunch — via a 20-minute riverside walk that most tourists skip. After the inner wholesale market moved to Toyosu in 2018, Tsukiji outer market reinvented itself as a retail and street-food destination with over 400 stalls. Tsukishima, the artificial island across the Sumida River, is the birthplace of monjayaki — Tokyo's answer to Osaka's okonomiyaki — and its four-block monja street holds more than 70 griddle restaurants.\n\nThe total walking distance is about 2.5 kilometers and can be done comfortably in 3 to 4 hours including eating stops. The route works best as a morning-to-early-afternoon outing starting at Tsukiji around 8 am.",
        },
        {
          heading: "How to Get There",
          body:
            "Start at Tsukiji Station on the Tokyo Metro Hibiya Line (Exit 1). The outer market is a 2-minute walk from the exit. Alternatively, Tsukiji-Shijo Station on the Oedo Line puts you one block closer to the market's main alley.\n\nAfter finishing at Tsukishima, you can take the Oedo Line or Yurakucho Line from Tsukishima Station. The full route is linear — Tsukiji to Tsukishima — so you never need to retrace your steps.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Begin at Tsukiji outer market's main alley for tamagoyaki (rolled omelette), fresh sashimi on rice bowls, and grilled scallops on sticks. Budget 2,000 to 4,000 yen for a walking breakfast of 3 to 4 items. Stop at Tsukiji Honganji Temple — a 1934 concrete temple designed in Indian architectural style — for a 10-minute visual detour.\n\nWalk south along Harumi-dori toward the Kachidoki Bridge, then cross to Tsukishima via the pedestrian path along the Sumida River. On Tsukishima, head to Monja Street (Nishinaka-dori) and pick any restaurant — most are similar in quality. Monja sets run 1,200 to 2,000 yen per person. Staff at most restaurants will cook the first round for you to demonstrate the technique.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Tsukiji outer market is busiest between 9 am and noon on weekends. Arrive by 8 am on weekdays for the shortest queues. Some stalls open as early as 6 am. Monja restaurants on Tsukishima typically open at 11 am, so the timing works naturally — eat light at Tsukiji by 10 am, walk 20 minutes, arrive at Tsukishima for an early monja lunch.\n\nThere is no strong seasonal factor. Summer can be uncomfortably hot on the exposed riverside walk, so spring and autumn are more pleasant. Tsukiji outer market is closed on Sundays, some Wednesdays, and during New Year — check the official calendar before going.",
        },
        {
          heading: "Practical Tips",
          body:
            "Tsukiji is extremely cash-heavy. Some stalls accept IC cards but many are cash only. Bring at least 5,000 yen for the market portion. Tsukishima monja restaurants are more likely to accept credit cards.\n\nThe Tsukiji outer market has no seating for most stalls — you eat standing at the counter or walking. Some alleys prohibit eating while walking, so look for signs. English menus exist at the larger stalls but not the smaller ones. Photography is allowed but do not block the narrow alleys.",
        },
      ],
      [
        { q: "How long does this walk take?", a: "3 to 4 hours including two eating stops. The walking distance is about 2.5 kilometers." },
        { q: "Is Tsukiji still worth visiting after the market moved to Toyosu?", a: "Yes. The inner wholesale market moved, but the outer market's 400+ retail stalls and restaurants remained and expanded. It is still the best street-food seafood spot in Tokyo." },
        { q: "What is monjayaki?", a: "A Tokyo-style griddle dish similar to okonomiyaki but with a much runnier batter. You eat it directly off the griddle with a small spatula. Tsukishima is its birthplace and the best place to try it." },
        { q: "What time should I arrive at Tsukiji?", a: "8 am on weekdays for the least crowded experience. Some stalls open at 6 am. Avoid weekends between 10 am and noon when lines are longest." },
        { q: "Can I combine this with Toyosu market?", a: "Technically yes, but Toyosu is a 15-minute bus or train ride from Tsukiji and requires early-morning reservations for the tuna auction viewing. It is better as a separate trip." },
      ],
    ),
    ja: ja(
      "築地場外〜月島もんじゃストリート散策ガイド",
      "築地場外市場の海鮮朝食から隅田川沿いを歩いて月島もんじゃストリートまで。外国人旅行者向けに食べ歩きルートとアクセスを解説。",
      img("File:Tsukiji fish market.jpg", 1600, 1067, "築地場外市場の海鮮売り場", "内市場が豊洲に移転した後も築地場外は東京最高の海鮮ストリートフード拠点。"),
      [
        img("File:Tsukiji outer market street.jpg", 1600, 1067, "築地場外市場の細い路地", "400以上の店舗が並ぶ築地場外の路地。"),
        img("File:Tsukishima Monja Street.jpg", 1600, 1067, "月島のもんじゃストリート", "4ブロックに70軒以上のもんじゃ焼き店が集中。"),
        img("File:Sumida River bridge Tokyo.jpg", 1600, 1067, "隅田川の橋", "隅田川を渡って築地から月島へ。"),
        img("File:Tsukiji Honganji Temple.jpg", 1600, 1067, "築地本願寺の外観", "インド建築様式の築地本願寺は東京の寺院で唯一無二。"),
        img("File:Tsukishima residential area.jpg", 1600, 1067, "月島の低層住宅街", "月島には戦前の低層住宅が一部残る。"),
      ],
      TOKYO_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "築地場外市場の海鮮朝食と月島のもんじゃランチを、20分の隅田川リバーウォークでつなぐルートです。2018年に卸売市場が豊洲に移転した後も、築地場外は400以上の小売店と飲食店が営業を続け、むしろストリートフード街として進化しました。月島はもんじゃ焼き発祥の地で、西仲通り(もんじゃストリート)に70軒以上の鉄板焼き店が集中しています。\n\n総歩行距離は約2.5km、食事込みで3〜4時間のルートです。朝8時に築地スタートがベストです。",
        },
        {
          heading: "アクセスと起点",
          body:
            "東京メトロ日比谷線「築地駅」1番出口から徒歩2分で場外市場。都営大江戸線「築地市場駅」からも至近です。月島での終了後は「月島駅」から大江戸線か有楽町線に乗れます。築地→月島の一方通行ルートなので戻る必要がありません。",
        },
        {
          heading: "主要スポット",
          body:
            "築地場外のメイン通りで玉子焼き、海鮮丼、焼き帆立を食べ歩き。3〜4品で2,000〜4,000円が目安です。築地本願寺はインド建築様式の1934年築コンクリート寺院で、10分の寄り道に最適。\n\n晴海通りを南下し勝鬨橋方面へ、隅田川沿いの歩行者道を渡って月島へ。もんじゃストリート(西仲通り)ではどの店もレベルが近いので直感で入って大丈夫です。もんじゃセットは1人1,200〜2,000円、多くの店で最初の1枚は店員が焼いてくれます。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "築地場外は週末9時〜正午が最混雑。平日8時着なら行列が短いです。6時から営業する店もあります。月島のもんじゃ店は11時開店が多いので、築地で10時まで軽く食べて20分歩けば月島11時着で自然につながります。\n\n季節的な差はあまりありませんが、夏の隅田川沿いは日陰が少なく暑いので春秋が快適。築地場外は日曜・一部水曜・年末年始が休みなので事前確認を。",
        },
        {
          heading: "実用情報",
          body:
            "築地は現金主義の店が多いので5,000円以上を持参。月島のもんじゃ店はクレジットカード対応が多めです。築地の多くの店は立ち食いか食べ歩きスタイルで、路地によっては歩きながらの飲食禁止の表示があるので注意。大きめの店には英語メニューがありますが小さい店にはありません。",
        },
      ],
      [
        { q: "所要時間は?", a: "食事込みで3〜4時間、歩行距離は約2.5kmです。" },
        { q: "豊洲に市場が移転した後も築地に行く価値がありますか?", a: "あります。卸売は豊洲に移りましたが、場外市場の400以上の小売・飲食店は残り、むしろ拡大しています。" },
        { q: "もんじゃ焼きとは?", a: "お好み焼きより水分が多い東京式の鉄板料理で、小さなヘラで鉄板から直接食べます。月島が発祥地です。" },
        { q: "築地には何時に着けばいい?", a: "平日8時がベスト。6時から開く店もあります。週末10時〜正午は行列が長くなります。" },
        { q: "豊洲市場と組み合わせられますか?", a: "物理的には可能ですが豊洲はバスか電車で15分かかり、マグロ競りの見学は早朝予約制。別日がおすすめです。" },
      ],
    ),
  },

  // =====================================================================
  // 3. nihonbashi-ningyocho-walk — 日本橋〜人形町の老舗と甘酒横丁
  // =====================================================================
  "nihonbashi-ningyocho-walk": {
    en: en(
      "Nihonbashi to Ningyocho Old Tokyo Walking Guide",
      "A walking route from Nihonbashi Bridge through the historic merchant district to Ningyocho's Amazake Yokocho, covering Edo-era shops, traditional crafts, and classic Tokyo street food.",
      img("File:Nihonbashi Bridge Tokyo.jpg", 1600, 1067, "Nihonbashi Bridge in central Tokyo", "Nihonbashi has been the symbolic center of Japan's road network since the Edo period."),
      [
        img("File:Nihonbashi Mitsukoshi.jpg", 1600, 1067, "Mitsukoshi department store at Nihonbashi", "Mitsukoshi Nihonbashi is Japan's oldest department store, founded as a kimono shop in 1673."),
        img("File:Ningyocho Amazake Yokocho.jpg", 1600, 1067, "Amazake Yokocho alley in Ningyocho", "Amazake Yokocho is a narrow alley known for traditional sweets and amazake shops."),
        img("File:Suitengu Shrine Tokyo.jpg", 1600, 1067, "Suitengu Shrine in Ningyocho", "Suitengu Shrine is the local guardian shrine of the Ningyocho merchant quarter."),
        img("File:Nihonbashi Coredo.jpg", 1600, 1067, "Coredo Muromachi complex at Nihonbashi", "Coredo Muromachi blends modern retail with traditional craft shops on the Nihonbashi main street."),
        img("File:Ningyocho street Tokyo.jpg", 1600, 1067, "Traditional shopfronts on Ningyocho street", "Ningyocho retains a cluster of Edo-era specialty shops that have operated for generations."),
      ],
      TOKYO_X,
      [
        {
          heading: "Why This Route Works",
          body:
            "Nihonbashi and Ningyocho together form the commercial heart of Edo-period Tokyo — the area where merchant culture, traditional crafts, and Japanese department stores were born. Today the route connects Japan's symbolic road-distance zero point (Nihonbashi Bridge) with one of the last surviving traditional shopping streets in central Tokyo (Amazake Yokocho in Ningyocho). The 1.5-kilometer walk passes Mitsukoshi, Japan's oldest department store, several centuries-old craft shops, and ends at the narrow alley where amazake (sweet rice drink), taiyaki (fish-shaped pastry), and ningyo-yaki (doll-shaped cakes) have been sold since the Meiji era.\n\nThis route is ideal for travelers who want to see historic Tokyo without going to Asakusa, which has become heavily tourist-oriented. Ningyocho is a working neighborhood where the old shops serve local regulars, not tour groups.",
        },
        {
          heading: "How to Get There",
          body:
            "Start at Nihonbashi Station (Tokyo Metro Ginza Line or Tozai Line, Exit B6). The station puts you directly at Nihonbashi Bridge. The walk ends at Ningyocho Station (Hibiya Line or Asakusa Line), about 1.5 kilometers northeast. Total walking time is 30 minutes without stops, or 2 to 3 hours with visits.\n\nAlternatively, start from Tokyo Station's Nihonbashi Exit (Yaesu North) and walk 8 minutes to Nihonbashi Bridge.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Nihonbashi Bridge itself is the first stop — the current stone bridge dates from 1911 and every national highway distance marker in Japan is measured from this point. Cross the bridge and visit the Mitsukoshi Nihonbashi main store (founded 1673). The basement food floor is one of Tokyo's best depachika.\n\nWalk northeast along Ningyocho-dori to reach the Ningyocho merchant area. Stop at Suitengu Shrine (the neighborhood's guardian shrine), then continue to Amazake Yokocho — a 400-meter alley with traditional shops. Must-try items include ningyo-yaki at Juka (the oldest shop, founded 1917) and taiyaki at Yanagiya. End at one of the remaining amazake stands for a cup of the sweet fermented rice drink.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Weekday mornings are quietest. Most traditional shops open at 9 or 10 am. The Suitengu monthly festival (every month on the 5th) brings extra stalls and activity to the shrine area. Avoid national holidays when Amazake Yokocho gets crowded with domestic tourists.\n\nSeason matters little for this route — it works year-round. The New Year period (January 1-3) sees many shops closed but Suitengu Shrine packed with hatsumode visitors. Late March to early April adds cherry blossoms along the Nihonbashi River walkway.",
        },
        {
          heading: "Practical Tips",
          body:
            "Most traditional shops in Ningyocho accept cash only. Budget 1,000 to 2,000 yen for snacks along Amazake Yokocho. Mitsukoshi and Coredo Muromachi accept all major credit cards. English signage is minimal in the traditional shops but the items are visual and prices are displayed.\n\nThe Nihonbashi area has excellent free walking maps available at the Coredo Muromachi information desk and at Nihonbashi Station's tourist counter. Coin lockers are available at both Nihonbashi and Ningyocho stations.",
        },
      ],
      [
        { q: "How long does this walk take?", a: "30 minutes of pure walking, but plan 2 to 3 hours with stops at shops, the shrine, and Amazake Yokocho snack breaks." },
        { q: "What is Amazake Yokocho?", a: "A 400-meter traditional shopping alley in Ningyocho with sweet shops, taiyaki stands, and craft stores. The name comes from the amazake (sweet rice drink) vendors that originally lined the street." },
        { q: "Where should I eat?", a: "Ningyo-yaki at Juka (from 1917) and taiyaki at Yanagiya are the signature Ningyocho snacks. For a full meal, the soba restaurants near Suitengu Shrine serve excellent handmade noodles from 1,000 yen." },
        { q: "Is this route accessible by wheelchair?", a: "The main streets are flat and accessible. Amazake Yokocho is a narrow but paved alley. Mitsukoshi and Coredo Muromachi are fully accessible." },
        { q: "Can I combine this with Asakusa?", a: "Yes. From Ningyocho, take the Asakusa Line 3 stops north to Asakusa. The combined route makes a full day of old-Tokyo walking." },
      ],
    ),
    ja: ja(
      "日本橋〜人形町 老舗と甘酒横丁散策ガイド",
      "日本橋から人形町の甘酒横丁まで、江戸の商人文化が残る1.5kmを歩くガイド。三越本店、水天宮、老舗の人形焼き・たい焼きまで。",
      img("File:Nihonbashi Bridge Tokyo.jpg", 1600, 1067, "日本橋", "日本の道路の起点となる日本橋は江戸時代から東京の象徴。"),
      [
        img("File:Nihonbashi Mitsukoshi.jpg", 1600, 1067, "三越日本橋本店", "1673年創業の三越は日本最古の百貨店。"),
        img("File:Ningyocho Amazake Yokocho.jpg", 1600, 1067, "甘酒横丁", "伝統的な甘味処と甘酒の店が並ぶ甘酒横丁。"),
        img("File:Suitengu Shrine Tokyo.jpg", 1600, 1067, "水天宮", "人形町の鎮守・水天宮。"),
        img("File:Nihonbashi Coredo.jpg", 1600, 1067, "コレド室町", "日本橋のコレド室町は現代の商業施設と伝統工芸店が共存。"),
        img("File:Ningyocho street Tokyo.jpg", 1600, 1067, "人形町の老舗", "人形町には代々続く老舗の専門店が残る。"),
      ],
      TOKYO_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "日本橋と人形町は江戸の商人文化の中心地で、日本の百貨店・伝統工芸・商業の発祥地です。日本国道の起点(日本橋)から、東京に残る最後の伝統的商店街のひとつ(甘酒横丁)まで1.5kmを歩きます。三越日本橋本店(1673年創業)、数百年続く工芸品店、そして明治時代から甘酒・たい焼き・人形焼きを売り続ける細い横丁を通ります。\n\n浅草が観光客向けに変わった今、人形町は地元の常連客に支えられた老舗が残る「働く街」です。観光地化されていない歴史ある東京を見たい人に最適なルートです。",
        },
        {
          heading: "アクセスと起点",
          body:
            "東京メトロ銀座線・東西線「日本橋駅」B6出口から日本橋のたもとへ。ゴールは日比谷線・都営浅草線「人形町駅」で、約1.5km北東。純粋な歩行時間は30分、立ち寄り込みで2〜3時間。東京駅の日本橋口(八重洲北口)から日本橋まで徒歩8分でもスタートできます。",
        },
        {
          heading: "主要スポット",
          body:
            "日本橋は1911年築の石造橋で、日本の全国道の距離はここから測定されています。橋を渡って三越日本橋本店へ。地下食品売場(デパ地下)は東京屈指です。\n\n人形町通りを北東に歩いて人形町エリアへ。水天宮(地域の鎮守神社)を参拝し、甘酒横丁(400mの細い商店街)へ。人形焼の重盛(1917年創業の最古参)、たい焼きの柳屋が必食。最後に甘酒スタンドで甘酒を一杯。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "平日午前が最も空いています。老舗は9〜10時開店。水天宮の月次祭(毎月5日)は屋台が出て賑わいます。祝日は甘酒横丁が混雑するので避けた方が快適。\n\n季節的な差は小さく通年で楽しめます。正月(1〜3日)は多くの店が休みですが水天宮は初詣客で賑わいます。3月下旬〜4月上旬は日本橋川沿いに桜が咲きます。",
        },
        {
          heading: "実用情報",
          body:
            "人形町の老舗は現金のみが多いので、甘酒横丁での食べ歩き用に1,000〜2,000円を持参。三越やコレド室町はクレジットカード対応。老舗の英語表記は少ないですが、商品は見てわかるものが多く価格表示もあります。\n\nコレド室町のインフォメーションデスクと日本橋駅の観光カウンターで無料の散策マップがもらえます。日本橋駅・人形町駅ともコインロッカーあり。",
        },
      ],
      [
        { q: "所要時間は?", a: "歩くだけなら30分、老舗巡り+甘酒横丁の食べ歩き込みで2〜3時間です。" },
        { q: "甘酒横丁とは?", a: "人形町の400mの細い商店街。甘味処、たい焼き店、工芸品店が並び、名前の由来は明治時代に軒を連ねた甘酒売りです。" },
        { q: "おすすめの食事は?", a: "重盛の人形焼(1917年創業)と柳屋のたい焼きが定番。しっかり食べるなら水天宮近くの手打ち蕎麦店が1,000円から。" },
        { q: "車椅子でも歩けますか?", a: "メイン通りは平坦でアクセス可能。甘酒横丁は狭いですが舗装されています。三越とコレド室町はバリアフリー対応です。" },
        { q: "浅草と組み合わせられますか?", a: "人形町から浅草線で3駅北が浅草。組み合わせれば下町歩きの1日コースになります。" },
      ],
    ),
  },

  // =====================================================================
  // 4. tokyo-temple-morning-route — 東京寺院の朝散歩
  // =====================================================================
  "tokyo-temple-morning-route": {
    en: en(
      "Tokyo Temple Morning Walk: Zojoji to Atago Shrine",
      "An early morning walking route through central Tokyo's temple district covering Zojoji Temple, Shiba Park, Tokyo Tower views, and the historic Atago Shrine hilltop, with transit and timing details.",
      img("File:Zojoji Temple and Tokyo Tower.jpg", 1600, 1067, "Zojoji Temple with Tokyo Tower behind", "Zojoji Temple with Tokyo Tower in the background is one of Tokyo's most iconic pairings."),
      [
        img("File:Zojoji Sangedatsumon Gate.jpg", 1600, 1067, "Sangedatsu Gate at Zojoji Temple", "The 1622 Sangedatsu Gate is the oldest wooden structure in central Tokyo."),
        img("File:Shiba Park Tokyo.jpg", 1600, 1067, "Shiba Park green space", "Shiba Park surrounds Zojoji and provides open green space in the Minato district."),
        img("File:Atago Shrine Tokyo stairs.jpg", 1600, 1067, "Stone staircase at Atago Shrine", "Atago Shrine's 86-step stone staircase is known as the Steps of Success."),
        img("File:Tokyo Tower from below.jpg", 1600, 1067, "Tokyo Tower seen from Shiba Park", "Tokyo Tower's 333-meter structure is best photographed from the Shiba Park approach."),
        img("File:Zojoji Jizo statues.jpg", 1600, 1067, "Rows of Jizo statues at Zojoji", "Hundreds of small Jizo statues with windmills line the north side of Zojoji."),
      ],
      TOKYO_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Most visitors associate Tokyo with neon and skyscrapers, but this 3-kilometer morning route passes through some of the city's oldest religious sites — all within walking distance of central business districts. Zojoji Temple was the Tokugawa family temple during the Edo period and sits directly below Tokyo Tower, creating one of the city's most striking visual contrasts. Shiba Park, which wraps around Zojoji, is one of Tokyo's oldest public parks (1873). Atago Shrine sits atop Tokyo's only natural hill in the Minato district, with 86 stone steps that samurai once rode up on horseback.\n\nThe route works best at 7 to 8 am when the temple grounds are nearly empty and the morning light hits Tokyo Tower from the east. By 10 am tour groups arrive and the atmosphere changes completely.",
        },
        {
          heading: "How to Get There",
          body:
            "Start at Daimon Station (Oedo Line or Asakusa Line, Exit A6). Zojoji's Sangedatsu Gate is a 3-minute walk south. The route ends at Atago Shrine, from which Kamiyacho Station (Hibiya Line) or Onarimon Station (Mita Line) are each a 5-minute walk.\n\nFrom Tokyo Station, take the Yamanote Line one stop to Hamamatsucho, then walk 10 minutes south to Zojoji. From Roppongi, walk 20 minutes east through the quiet residential streets.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Begin at the Sangedatsu Gate (1622), the oldest wooden structure surviving in central Tokyo. Enter Zojoji's main precinct — the Daiden (main hall) was rebuilt in 1974 but the grounds retain Edo-period layout. Walk to the north side to see hundreds of Jizo statues dressed in red bibs and spinning windmills, placed as memorials for unborn children.\n\nExit Zojoji south into Shiba Park for Tokyo Tower views. The best photo angle is from the park's central lawn looking northeast. Continue west through the park to Atago Shrine. Climb the 86 stone steps (called Shusse no Ishidan, the Steps of Success) to the hilltop shrine at 26 meters elevation — the highest natural point in the Minato ward.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Arrive at Zojoji by 7 am for near-solitude. The temple grounds are open 24 hours but the main hall opens at 6 am. Atago Shrine is accessible at any time. By 9:30 am bus tours begin arriving at Zojoji.\n\nCherry blossom season (late March to early April) is exceptional at Shiba Park — the trees frame Tokyo Tower beautifully. Autumn colors peak in late November. Summer mornings (before 8 am) are the only comfortable time because humidity is extreme by 10 am. Winter mornings are cold but clear, with the best visibility for Tokyo Tower photos.",
        },
        {
          heading: "Practical Tips",
          body:
            "Zojoji is free to enter. Atago Shrine is free. There are no ticketed attractions on this route. Vending machines are plentiful throughout Shiba Park for water and coffee.\n\nWear comfortable walking shoes — the Atago Shrine stairs are steep and can be slippery when wet. There is a gentle back path that avoids the stairs if needed. Photography is allowed everywhere on the route. The nearest convenience stores are at Daimon Station and along the main road south of Shiba Park.",
        },
      ],
      [
        { q: "How long does this walk take?", a: "90 minutes at a relaxed pace, covering about 3 kilometers. Add 30 minutes if you want to sit in Shiba Park." },
        { q: "What time should I start?", a: "7 am is ideal for empty temple grounds and good morning light. The atmosphere is completely different by 10 am when tour groups arrive." },
        { q: "Is this route free?", a: "Yes. Zojoji Temple, Shiba Park, and Atago Shrine are all free to enter. The only paid attraction nearby is Tokyo Tower itself (1,200 yen for the main deck)." },
        { q: "Can I combine this with Tokyo Tower?", a: "Yes. Tokyo Tower opens at 9 am and is a 5-minute walk from Shiba Park. Add 60 to 90 minutes for the tower visit." },
        { q: "Are the Atago Shrine stairs difficult?", a: "The 86 steps are steep but short — most people climb them in 3 to 5 minutes. A gentler back path exists for those who prefer to avoid stairs." },
      ],
    ),
    ja: ja(
      "東京寺院の朝散歩ガイド：増上寺〜芝公園〜愛宕神社",
      "朝7時の増上寺から芝公園、東京タワービュー、愛宕神社の出世の階段まで。都心の寺社を静かに歩く3kmの朝ルート。",
      img("File:Zojoji Temple and Tokyo Tower.jpg", 1600, 1067, "増上寺と東京タワー", "増上寺の背後に東京タワーがそびえる東京の象徴的な風景。"),
      [
        img("File:Zojoji Sangedatsumon Gate.jpg", 1600, 1067, "増上寺三解脱門", "1622年築の三解脱門は都心に残る最古の木造建築。"),
        img("File:Shiba Park Tokyo.jpg", 1600, 1067, "芝公園", "増上寺を囲む芝公園は1873年開設の東京最古級の公園。"),
        img("File:Atago Shrine Tokyo stairs.jpg", 1600, 1067, "愛宕神社の出世の階段", "愛宕神社の86段の石段は出世の階段と呼ばれる。"),
        img("File:Tokyo Tower from below.jpg", 1600, 1067, "芝公園から見た東京タワー", "芝公園からの東京タワーは朝の東からの光で映える。"),
        img("File:Zojoji Jizo statues.jpg", 1600, 1067, "増上寺の地蔵群", "風車を持った何百体もの地蔵が増上寺北側に並ぶ。"),
      ],
      TOKYO_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "ネオンとビルの街と思われがちな東京ですが、この3kmの朝ルートでは都心の最古級の寺社を通ります。増上寺は江戸時代の徳川家菩提寺で、真後ろに東京タワーがそびえる新旧のコントラストが印象的です。芝公園(1873年開設)が増上寺を囲み、愛宕神社は港区唯一の天然の丘(標高26m)の上に鎮座しています。\n\n朝7〜8時に歩くと境内はほぼ無人で、東からの朝日が東京タワーを照らします。10時になると観光バスが来て雰囲気が一変するので、早朝が圧倒的におすすめです。",
        },
        {
          heading: "アクセスと起点",
          body:
            "大江戸線・浅草線「大門駅」A6出口から徒歩3分で増上寺三解脱門。ゴールの愛宕神社からは日比谷線「神谷町駅」または三田線「御成門駅」まで各徒歩5分。東京駅からは山手線で浜松町まで1駅、そこから徒歩10分でも到着できます。",
        },
        {
          heading: "主要スポット",
          body:
            "三解脱門(1622年)は都心に残る最古の木造建築。増上寺本堂(大殿)は1974年再建ですが境内の配置は江戸期のまま。北側には赤い前掛けと風車を持った何百体もの地蔵尊が並び、水子供養の場として静かな雰囲気です。\n\n増上寺を南へ出て芝公園へ。中央芝生から北東方向に東京タワーを撮るのがベストアングル。公園を西に抜けて愛宕神社へ。86段の出世の階段(かつて武士が馬で駆け上がった故事に由来)を登ると、港区の最高地点(標高26m)の境内に到着します。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "増上寺境内は24時間開放、本堂は6時開門。7時着ならほぼ無人。9時半から観光バスが来始めます。愛宕神社も終日参拝可能。\n\n桜の季節(3月下旬〜4月上旬)は芝公園の桜が東京タワーを額縁のように囲み、秋の紅葉は11月下旬がピーク。夏は10時には蒸し暑くなるので8時前がリミット。冬の朝は寒いですが空気が澄んで東京タワーの撮影条件は最高です。",
        },
        {
          heading: "実用情報",
          body:
            "増上寺・芝公園・愛宕神社すべて無料。有料スポットはこのルート上にありません(東京タワー展望台は近くにあり1,200円)。芝公園内に自動販売機が多数あるので飲料には困りません。\n\n愛宕神社の石段は急勾配で、雨天時は滑りやすいので歩きやすい靴を。階段を避ける裏道もあります。ルート全体で撮影自由。コンビニは大門駅付近と芝公園南側の大通り沿いにあります。",
        },
      ],
      [
        { q: "所要時間は?", a: "ゆっくり歩いて90分、約3km。芝公園で休憩するなら+30分。" },
        { q: "何時スタートがベスト?", a: "7時が理想。境内がほぼ無人で朝日が美しい。10時以降は団体客で雰囲気が変わります。" },
        { q: "入場料は?", a: "すべて無料。東京タワー展望台のみ1,200円(別途)。" },
        { q: "東京タワーと組み合わせられますか?", a: "はい。東京タワーは9時開場で芝公園から徒歩5分。タワー見学を加えると+60〜90分です。" },
        { q: "愛宕神社の階段はきついですか?", a: "86段の急な石段ですが3〜5分で登れます。階段を避ける緩やかな裏道もあります。" },
      ],
    ),
  },

  // =====================================================================
  // 5. tokyo-garden-circuit-walk — 東京庭園めぐり
  // =====================================================================
  "tokyo-garden-circuit-walk": {
    en: en(
      "Tokyo Garden Circuit Walk: Hamarikyu to Koishikawa Korakuen",
      "A day walk linking three of Tokyo's finest Edo-era strolling gardens — Hamarikyu, Kyu-Shiba-rikyu, and Koishikawa Korakuen — with transit connections and seasonal highlights.",
      img("File:Hamarikyu Gardens Tokyo.jpg", 1600, 1067, "Hamarikyu Gardens with Tokyo skyline", "Hamarikyu Gardens sits at the edge of Tokyo Bay with modern skyscrapers towering behind the Edo-era pine groves."),
      [
        img("File:Kyu Shiba Rikyu Garden Tokyo.jpg", 1600, 1067, "Kyu-Shiba-rikyu Garden in Tokyo", "Kyu-Shiba-rikyu is a compact Edo-era garden steps from Hamamatsucho Station."),
        img("File:Koishikawa Korakuen Garden.jpg", 1600, 1067, "Koishikawa Korakuen Garden autumn", "Koishikawa Korakuen is Tokyo's oldest garden, dating from 1629."),
        img("File:Hamarikyu teahouse.jpg", 1600, 1067, "Teahouse on Hamarikyu pond", "The Nakajima teahouse serves matcha on a platform over the tidal seawater pond."),
        img("File:Hamarikyu pine trees.jpg", 1600, 1067, "300-year-old pine at Hamarikyu", "The 300-year-old black pine near the entrance is one of the oldest trees in central Tokyo."),
        img("File:Koishikawa Korakuen bridge.jpg", 1600, 1067, "Full Moon Bridge at Koishikawa Korakuen", "The Engetsukyo (Full Moon Bridge) at Koishikawa Korakuen creates a perfect circle with its reflection."),
      ],
      TOKYO_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Tokyo has nine designated Special Places of Scenic Beauty, and this route connects three of the best — Hamarikyu Gardens (tidal seawater pond with Tokyo Bay views), Kyu-Shiba-rikyu Gardens (compact Edo strolling garden), and Koishikawa Korakuen (Tokyo's oldest garden, from 1629). Together they show the evolution of Japanese garden design across two centuries, from the Chinese-influenced miniature landscapes of Koishikawa Korakuen to the maritime-influenced layout of Hamarikyu.\n\nUnlike Kyoto's temple gardens, Tokyo's strolling gardens are largely flat, wheelchair-friendly, and surrounded by the modern skyline — making the contrast between Edo-era nature and 21st-century glass towers part of the experience. The full circuit takes a half day by train.",
        },
        {
          heading: "How to Get There",
          body:
            "Start at Shiodome Station (Oedo Line or Yurikamome) for Hamarikyu Gardens (5-minute walk). After Hamarikyu, walk 15 minutes north to Kyu-Shiba-rikyu Gardens near Hamamatsucho Station. For the final garden, take the JR Yamanote Line from Hamamatsucho to Tokyo Station, transfer to the Marunouchi Line, and ride to Korakuen Station (15 minutes total). Koishikawa Korakuen is a 5-minute walk from Korakuen Station.\n\nAlternatively, Hamarikyu has a water bus pier — you can arrive from Asakusa by Tokyo Cruise water bus for a scenic river approach.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Hamarikyu Gardens (300 yen admission) features a tidal seawater pond — the only one remaining in Tokyo — with a teahouse (Nakajima-no-Ochaya) that serves matcha and wagashi for 510 yen on a platform over the water. The 300-year-old black pine near the entrance is a designated monument. Allow 60 to 90 minutes.\n\nKyu-Shiba-rikyu Gardens (150 yen) is Tokyo's smallest major garden but has a perfect miniature strolling layout around a central pond. Allow 30 to 45 minutes. Koishikawa Korakuen (300 yen) is the oldest and most elaborate, with the Engetsukyo Full Moon Bridge, a miniature Lushan waterfall, and extensive plum and cherry groves. Allow 60 to 90 minutes.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "All three gardens open at 9 am. Arrive at Hamarikyu by 9 am for near-empty paths. The circuit finishes at Koishikawa Korakuen around 1 to 2 pm. Each garden has distinct seasonal peaks: Hamarikyu's cosmos field blooms in September-October, Kyu-Shiba-rikyu's wisteria peaks in late April, and Koishikawa Korakuen's plum grove blooms in February and its maple trees peak in late November.\n\nCherry blossom season (late March to early April) is spectacular at all three but brings heavy crowds. Weekday visits are significantly quieter than weekends year-round.",
        },
        {
          heading: "Practical Tips",
          body:
            "Combined admission for all three gardens is 750 yen. No advance tickets needed — pay at each entrance. All three accept cash only at the gate. English garden maps are available at each entrance for free.\n\nBring water and snacks — Hamarikyu has its teahouse but the other two have only vending machines. Koishikawa Korakuen has uneven stone paths in places, so wear sturdy shoes. All three gardens prohibit drones, tripods over 1 meter, and professional photography equipment without advance permission.",
        },
      ],
      [
        { q: "How long does the full circuit take?", a: "4 to 5 hours including transit between gardens. Each garden takes 45 to 90 minutes." },
        { q: "Which garden is the best if I can only visit one?", a: "Hamarikyu for the Tokyo Bay skyline contrast and teahouse experience. Koishikawa Korakuen for the most traditional and elaborate garden design." },
        { q: "Are the gardens stroller and wheelchair accessible?", a: "Hamarikyu and Kyu-Shiba-rikyu are mostly flat and accessible. Koishikawa Korakuen has some uneven stone paths and steps that may be difficult for wheelchairs." },
        { q: "What is the best season?", a: "Late November for autumn colors at Koishikawa Korakuen, late March for cherry blossoms at all three, February for plum blossoms at Koishikawa Korakuen." },
        { q: "Can I bring food into the gardens?", a: "Yes. Picnicking on benches is allowed at all three gardens. Only Hamarikyu has a food service (the Nakajima teahouse)." },
      ],
    ),
    ja: ja(
      "東京庭園めぐりガイド：浜離宮〜旧芝離宮〜小石川後楽園",
      "東京の江戸時代の名園3つを1日で巡る庭園サーキット。浜離宮の潮入の池、旧芝離宮の小回廊庭園、小石川後楽園の円月橋まで。",
      img("File:Hamarikyu Gardens Tokyo.jpg", 1600, 1067, "浜離宮恩賜庭園と東京スカイライン", "浜離宮の江戸松と背後の高層ビルのコントラスト。"),
      [
        img("File:Kyu Shiba Rikyu Garden Tokyo.jpg", 1600, 1067, "旧芝離宮恩賜庭園", "浜松町駅至近のコンパクトな江戸回遊庭園。"),
        img("File:Koishikawa Korakuen Garden.jpg", 1600, 1067, "小石川後楽園の紅葉", "1629年築の東京最古の庭園。"),
        img("File:Hamarikyu teahouse.jpg", 1600, 1067, "浜離宮の中島の茶屋", "潮入の池に浮かぶ中島の茶屋で抹茶が飲める。"),
        img("File:Hamarikyu pine trees.jpg", 1600, 1067, "浜離宮の300年の松", "入口付近の樹齢300年のクロマツは都心最古級の巨木。"),
        img("File:Koishikawa Korakuen bridge.jpg", 1600, 1067, "小石川後楽園の円月橋", "円月橋は水面の反射と合わせて満月を描く。"),
      ],
      TOKYO_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "東京には国の特別名勝に指定された庭園が9つあり、このルートではその中から3つを半日で巡ります。浜離宮(東京湾に面した潮入の池)、旧芝離宮(コンパクトな江戸回遊庭園)、小石川後楽園(1629年築の東京最古の庭園)です。中国風の縮景から海辺の庭園まで、200年にわたる日本庭園デザインの変遷を一度に見られます。\n\n京都の寺院庭園と異なり、東京の回遊式庭園は平坦でバリアフリーに近く、現代の高層ビルに囲まれています。江戸と21世紀のコントラストそのものが体験の一部です。",
        },
        {
          heading: "アクセスと起点",
          body:
            "大江戸線・ゆりかもめ「汐留駅」から浜離宮まで徒歩5分。浜離宮の後、徒歩15分で旧芝離宮(浜松町駅至近)。最後は浜松町からJR山手線で東京駅へ、丸ノ内線に乗り換えて後楽園駅まで計15分。小石川後楽園は後楽園駅から徒歩5分。\n\n浜離宮には水上バス乗り場があり、浅草から東京クルーズで隅田川経由のアプローチも可能です。",
        },
        {
          heading: "主要スポット",
          body:
            "浜離宮(入園300円)は東京に残る唯一の潮入の池を持ち、中島の茶屋で抹茶と和菓子(510円)を水上で楽しめます。入口の樹齢300年のクロマツは都指定天然記念物。所要60〜90分。\n\n旧芝離宮(150円)は東京の主要庭園で最小ですが、池を中心にした完璧な回遊動線があります。30〜45分。小石川後楽園(300円)は最古かつ最精緻で、円月橋・廬山の滝(ミニチュア)・梅林と桜並木が見どころ。60〜90分。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "3園とも9時開園。9時に浜離宮着ならほぼ無人。サーキットの終点・小石川後楽園には13〜14時到着。季節ごとのピークが異なり、浜離宮はコスモス(9〜10月)、旧芝離宮は藤(4月下旬)、小石川後楽園は梅(2月)と紅葉(11月下旬)が最も華やかです。\n\n桜の時期(3月下旬〜4月上旬)は3園とも見事ですが混雑も激化します。通年で平日が圧倒的に快適です。",
        },
        {
          heading: "実用情報",
          body:
            "3園合計入園料750円。事前予約不要で各入口で現金払い。各入口で無料の英語庭園マップがもらえます。\n\n水と軽食を持参推奨。茶屋は浜離宮のみで、他は自動販売機のみ。小石川後楽園は一部石畳が不均一なので歩きやすい靴を。3園ともドローン・1m超の三脚・商業撮影機材は事前許可なしで禁止です。",
        },
      ],
      [
        { q: "サーキット全体の所要時間は?", a: "移動込みで4〜5時間。各庭園で45〜90分です。" },
        { q: "1つだけ行くならどこ?", a: "東京湾スカイラインとのコントラストなら浜離宮、最も精緻な庭園設計なら小石川後楽園。" },
        { q: "ベビーカー・車椅子で入れますか?", a: "浜離宮と旧芝離宮はほぼ平坦でアクセス可能。小石川後楽園は一部石段と不整地があり車椅子では難所があります。" },
        { q: "ベストシーズンは?", a: "紅葉なら11月下旬の小石川後楽園、桜なら3月下旬の3園共通、梅なら2月の小石川後楽園。" },
        { q: "飲食物の持ち込みは?", a: "3園ともベンチでの軽食は可能。食事処は浜離宮の中島の茶屋のみです。" },
      ],
    ),
  },

  // =====================================================================
  // 6. nara-naramachi-walk — ならまちの格子戸と町家散策
  // =====================================================================
  "nara-naramachi-walk": {
    en: en(
      "Naramachi Traditional Townhouse Walking Guide",
      "A self-guided walk through Nara's preserved merchant quarter covering lattice-front machiya, traditional craft shops, and the Koshi-no-Ie townhouse museum, with access from JR and Kintetsu Nara stations.",
      img("File:Naramachi01st3200.jpg", 1600, 1067, "Lattice-front machiya in Naramachi", "Naramachi's narrow streets are lined with preserved Edo-era merchant townhouses."),
      [
        img("File:Naramachi Koshi no Ie.jpg", 1600, 1067, "Koshi-no-Ie townhouse museum", "Koshi-no-Ie is a free machiya museum showing the traditional layout of a Naramachi merchant house."),
        img("File:Gangoji Temple Nara.jpg", 1600, 1067, "Gangoji Temple in Naramachi", "Gangoji Temple is a UNESCO World Heritage site at the heart of the Naramachi district."),
        img("File:Naramachi Migawari Saru.jpg", 1600, 1067, "Migawari-zaru charm dolls hanging in Naramachi", "Red cloth monkey charms hang from the eaves of machiya houses throughout Naramachi."),
        img("File:Naramachi street view.jpg", 1600, 1067, "Quiet residential street in Naramachi", "Many Naramachi machiya have been converted to cafes and craft shops while retaining their facades."),
        img("File:Todai-ji Daibutsuden.jpg", 1600, 1067, "Todaiji Great Buddha Hall near Naramachi", "Todaiji's Daibutsuden is a 15-minute walk north from Naramachi."),
      ],
      NARA_X,
      [
        {
          heading: "Why Naramachi Works as a Walking Destination",
          body:
            "Most visitors to Nara head straight for Todaiji and the deer park, then leave. Naramachi — the preserved merchant quarter south of Sarusawa Pond — is where Nara's daily life has continued in Edo-era townhouses for centuries. The district's narrow machiya houses have distinctive lattice-front (koshi) facades that let light in while maintaining privacy. Unlike Kyoto's tourist-heavy Higashiyama, Naramachi is a working residential and commercial neighborhood where traditional craft shops, family-run cafes, and small galleries occupy the old buildings.\n\nThe walk covers about 1.5 kilometers and can be done in 90 minutes, or stretched to half a day with stops in cafes and the free Koshi-no-Ie townhouse museum. It pairs perfectly with an early-morning Todaiji visit.",
        },
        {
          heading: "How to Get There",
          body:
            "From Kintetsu Nara Station, walk 10 minutes south along Higashimuki shopping arcade, past Sarusawa Pond. From JR Nara Station, walk 15 minutes east. Naramachi has no dedicated train station — walking is the only approach.\n\nThe district starts around Gangoji Temple and extends south for about six blocks. The walk is linear enough that you can enter from the north (near Sarusawa Pond) and exit south toward the Shin-Yakushiji temple area if you want to continue exploring.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Start at Gangoji Temple, a UNESCO World Heritage site with roof tiles dating to the 6th century — the oldest building materials in continuous use in Japan. Admission is 500 yen. Walk south to Koshi-no-Ie, a free townhouse museum showing the layout of a typical Naramachi merchant house — narrow frontage, deep interior extending back from the street, and a central courtyard garden.\n\nLook for the red migawari-zaru (substitute monkey) charms hanging from the eaves of houses throughout the district — they are talismans believed to absorb misfortune. Stop at one of the machiya cafes for coffee or matcha in a traditional setting. Several craft shops sell Nara-zuke pickles, ink sticks, and Nara-sarashi linen.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Weekday mornings are quietest — arrive by 10 am. Most shops open at 10 am, so walk the streets for atmosphere first, then browse. The district is at its most photogenic in the early morning light when the lattice facades cast sharp shadows.\n\nSpring (late March to mid-April) and autumn (mid-November) are the most popular seasons but Naramachi itself is less affected by seasonal crowding than Todaiji. Summer can be very hot — the narrow streets trap heat. Winter is quiet and pleasant for walking, though some smaller shops close or reduce hours.",
        },
        {
          heading: "Practical Tips",
          body:
            "Many small shops in Naramachi are cash only. The Koshi-no-Ie museum and Gangoji Temple have English signage. A free walking map is available at the Nara City Tourist Information Center near Kintetsu Nara Station.\n\nThe district is entirely flat and walkable in any footwear. Bicycles can be rented near Kintetsu Nara Station but the narrow Naramachi lanes are better on foot. Photography is allowed on all public streets but ask before photographing inside shops or private machiya.",
        },
      ],
      [
        { q: "How long should I spend in Naramachi?", a: "90 minutes for a walk-through, half a day with cafe stops and the Koshi-no-Ie museum. It pairs well with a morning Todaiji visit." },
        { q: "Is Naramachi worth visiting if I have already been to Kyoto's old districts?", a: "Yes. Naramachi is smaller and less tourist-oriented than Higashiyama or Gion. The machiya are lived-in rather than staged, and the pace is slower." },
        { q: "Where should I eat?", a: "Several machiya have been converted to cafes and small restaurants. Look for kakinoha-zushi (persimmon leaf sushi), a Nara specialty, available at shops near Gangoji Temple from around 800 yen." },
        { q: "Can I visit Naramachi and Todaiji in the same day?", a: "Yes. Walk Todaiji early (8 am), then head south to Naramachi by 10 am when shops open. The two are 15 minutes apart on foot." },
        { q: "What are the red monkey charms?", a: "Migawari-zaru are cloth monkey dolls hung from eaves as talismans. They are believed to take on misfortune in place of the household. You can buy them at several Naramachi shops from 300 yen." },
      ],
    ),
    ja: ja(
      "ならまちの格子戸と町家散策ガイド",
      "奈良の旧商家町「ならまち」を歩くガイド。格子の町家、元興寺、格子の家、身代わり猿など1.5kmの散策ルートとアクセス情報。",
      img("File:Naramachi01st3200.jpg", 1600, 1067, "ならまちの格子戸の町家", "ならまちの細い通りには江戸時代の商家が並ぶ。"),
      [
        img("File:Naramachi Koshi no Ie.jpg", 1600, 1067, "格子の家", "ならまち格子の家は町家の構造を無料で見学できる施設。"),
        img("File:Gangoji Temple Nara.jpg", 1600, 1067, "元興寺", "世界遺産・元興寺はならまちの中心に位置する。"),
        img("File:Naramachi Migawari Saru.jpg", 1600, 1067, "身代わり猿", "赤い布の猿が町家の軒先にぶら下がる。"),
        img("File:Naramachi street view.jpg", 1600, 1067, "ならまちの静かな通り", "町家がカフェや工芸品店に転用されつつ外観を残す。"),
        img("File:Todai-ji Daibutsuden.jpg", 1600, 1067, "東大寺大仏殿", "東大寺はならまちから北へ徒歩15分。"),
      ],
      NARA_X,
      [
        {
          heading: "ならまちを歩く理由",
          body:
            "奈良を訪れる人の多くは東大寺と鹿公園を見てすぐ帰りますが、猿沢池の南に広がるならまちは江戸時代の町家が残る旧商家町です。間口が狭く奥に長い町家(格子=こし造りの木製ファサード)が通り沿いに並び、京都の東山より観光地化されていない「生きた住商混在地区」です。\n\n散策距離は約1.5km、歩くだけなら90分、カフェと格子の家見学込みで半日。早朝の東大寺参拝と組み合わせるのが最も効率的です。",
        },
        {
          heading: "アクセスと起点",
          body:
            "近鉄奈良駅から東向商店街を南へ10分、猿沢池を過ぎるとならまち。JR奈良駅からは東へ15分。専用の駅はないので徒歩アクセスのみです。元興寺周辺から南へ6ブロックが範囲で、北口(猿沢池側)から入って南端の新薬師寺方面へ抜けることもできます。",
        },
        {
          heading: "主要スポット",
          body:
            "元興寺(拝観500円)は世界遺産で、屋根瓦には6世紀のものが現役で使われています。日本で最古の建材の連続使用例。南へ進むと格子の家(無料)があり、ならまちの典型的な町家の構造(狭い間口・奥深い間取り・中庭)を見学できます。\n\n地区全体で軒先にぶら下がる赤い身代わり猿(みがわりざる)に注目。家族の災厄を身代わりに受ける魔除けです。町家カフェで珈琲か抹茶を一杯。奈良漬、墨、奈良晒の工芸品店もあります。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "平日午前が空いています。店は10時開店が多いので、先に街並みの雰囲気を歩き、10時以降に店を見るのが効率的。朝の光で格子ファサードに影が落ちる時間帯が最も写真映えします。\n\n春(3月下旬〜4月中旬)と秋(11月中旬)が人気ですが、ならまち自体は東大寺ほど季節の混雑は受けません。夏は路地に熱がこもるので注意。冬は空いていて歩きやすいですが小さい店は営業時間短縮があります。",
        },
        {
          heading: "実用情報",
          body:
            "小さい店は現金のみが多いです。格子の家と元興寺に英語案内あり。近鉄奈良駅の奈良市観光案内所で無料の散策マップがもらえます。\n\n地区は完全に平坦で靴を選びません。近鉄奈良駅でレンタサイクルもありますが、ならまちの狭い路地は徒歩の方が快適。公道での撮影は自由ですが、店内や個人の町家は許可を取ってください。",
        },
      ],
      [
        { q: "ならまちの所要時間は?", a: "歩くだけで90分、カフェ+格子の家見学で半日。朝の東大寺とセットが効率的です。" },
        { q: "京都の旧市街を見たらならまちは行く価値がありますか?", a: "あります。東山や祇園より小規模で観光客が少なく、町家が実際に住居として使われている「生きた町並み」です。" },
        { q: "おすすめの食事は?", a: "元興寺付近で柿の葉寿司(800円〜)が奈良名物。町家カフェも複数あります。" },
        { q: "東大寺とならまちは同日に回れますか?", a: "はい。東大寺を朝8時に見て、10時にならまちへ南下すれば店が開く時間に合います。徒歩15分。" },
        { q: "赤い猿の人形は何ですか?", a: "身代わり猿(みがわりざる)は災厄を身代わりに受ける魔除けの布猿で、ならまちの店で300円から買えます。" },
      ],
    ),
  },

  // =====================================================================
  // 7. nara-todaiji-quiet-morning — 早朝の東大寺
  // =====================================================================
  "nara-todaiji-quiet-morning": {
    en: en(
      "Early Morning Todaiji Temple Walk in Nara",
      "A guide to visiting Todaiji Temple and its surroundings before the crowds arrive, covering the Great Buddha Hall, Nigatsu-do sunrise terrace, and the quiet deer paths of Nara Park.",
      img("File:Todai-ji Daibutsuden.jpg", 1600, 1067, "Todaiji Great Buddha Hall in Nara", "Todaiji's Daibutsuden is the largest wooden structure in the world."),
      [
        img("File:Nara Park deer.jpg", 1600, 1067, "Sika deer in Nara Park at dawn", "The deer of Nara Park are calmest in the early morning."),
        img("File:Nigatsu-do Nara.jpg", 1600, 1067, "Nigatsu-do terrace above Todaiji", "Nigatsu-do's hillside terrace offers a panoramic view over Nara at sunrise."),
        img("File:Nandaimon Gate Nara.jpg", 1600, 1067, "Nandaimon Gate at Todaiji", "The Nandaimon Gate houses two 8-meter guardian statues carved by Unkei and Kaikei."),
        img("File:Kasuga Taisha lanterns.jpg", 1600, 1067, "Stone lanterns on the path to Kasuga Taisha", "The lantern-lined path from Todaiji to Kasuga Taisha is quietest before 9 am."),
        img("File:Nara Park autumn deer.jpg", 1600, 1067, "Deer in Nara Park autumn foliage", "Autumn mornings in Nara Park combine deer, mist, and colored leaves."),
      ],
      NARA_X,
      [
        {
          heading: "Why an Early Morning Visit Works",
          body:
            "Todaiji receives over 3 million visitors per year, and by 10 am the approach road and Great Buddha Hall are packed with school groups and tour buses. The temple opens at 7:30 am (8 am from November to March), and the first 90 minutes are transformatively quiet. The deer in Nara Park are calmer in the morning, the light through the Daibutsuden windows illuminates the Great Buddha from the east, and Nigatsu-do's terrace offers sunrise views over the entire Nara basin.\n\nThis guide is designed for the visitor who arrives at 7:30 am and finishes by 9:30 am, before the crowds arrive. The route covers the Great Buddha Hall, the hillside path to Nigatsu-do, and the quiet deer paths north of the main precinct.",
        },
        {
          heading: "How to Get There",
          body:
            "From Kintetsu Nara Station, walk 20 minutes east through Nara Park. From JR Nara Station, take the city loop bus to Todaiji Daibutsuden stop (10 minutes, 220 yen) or walk 30 minutes. The first buses run at approximately 6:30 am.\n\nIf staying in Nara overnight, walk from your hotel — most Nara accommodations are within 20 minutes of Todaiji on foot. If day-tripping from Osaka or Kyoto, the earliest Kintetsu trains arrive at Kintetsu Nara around 6:30 am.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Enter through the Nandaimon Gate, where two 8-meter Nio guardian statues carved by Unkei and Kaikei in 1203 guard the approach. The Great Buddha Hall (Daibutsuden) houses the 15-meter bronze Vairocana Buddha — admission is 600 yen. Spend 20 to 30 minutes inside, then exit and take the hillside path east to Nigatsu-do.\n\nNigatsu-do (free entry) sits on the hillside above Todaiji and has an open terrace with panoramic views over Nara. The terrace faces west, so it catches the warm light of morning. From Nigatsu-do, walk north through the quiet paths of the upper Nara Park deer area, where the deer graze in small groups away from the tourist crowds below.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Arrive at the Nandaimon Gate by 7:30 am (8 am in winter). The Great Buddha Hall is empty until about 9 am. School group buses start arriving at 9:30 am and the experience changes completely.\n\nAutumn (mid-November) is the most photogenic season — morning mist, deer, and red maple leaves create iconic photos. Spring cherry blossoms (early April) are beautiful along the approach road. Summer mornings are pleasant before 9 am but the humidity builds fast. Winter mornings are cold but the clearest, with the fewest visitors of any season.",
        },
        {
          heading: "Practical Tips",
          body:
            "Todaiji admission is 600 yen, cash only at the gate. Nigatsu-do is free. Deer crackers (shika-senbei) are sold at stalls for 200 yen per bundle — the stalls open around 8 am. Feed deer gently and watch for aggressive bowing behavior, especially from bucks in autumn.\n\nBring your own water and breakfast — there are no cafes open near Todaiji before 9 am. The nearest convenience store is a 10-minute walk back toward Kintetsu Nara Station. Wear comfortable shoes — the path to Nigatsu-do is a short uphill walk on stone steps.",
        },
      ],
      [
        { q: "What time does Todaiji open?", a: "7:30 am from April to October, 8:00 am from November to March. Arrive at opening for the quietest experience." },
        { q: "How long should I spend?", a: "90 minutes covers the Great Buddha Hall, Nigatsu-do, and the upper deer paths. Add 30 minutes to reach Kasuga Taisha if continuing the walk." },
        { q: "Is it worth visiting Todaiji if I have already seen Kyoto temples?", a: "Yes. The scale of the Great Buddha Hall is unlike anything in Kyoto — it is the largest wooden structure in the world. The experience is about sheer scale rather than garden refinement." },
        { q: "Are the deer safe?", a: "Generally yes, but they can be pushy when they see food. Hold crackers high and feed one at a time. Male deer in autumn rutting season (October-November) can be aggressive — keep distance from bucks with large antlers." },
        { q: "Can I combine this with Naramachi?", a: "Yes. Finish Todaiji by 9:30 am, walk 15 minutes south to Naramachi where shops open at 10 am. This is the ideal half-day combination." },
      ],
    ),
    ja: ja(
      "早朝の東大寺と周辺の静かな歩き方ガイド",
      "朝7時半の開門に合わせて東大寺を訪れ、大仏殿・二月堂・奈良公園の鹿道を混雑前に歩く実用ガイド。",
      img("File:Todai-ji Daibutsuden.jpg", 1600, 1067, "東大寺大仏殿", "世界最大の木造建築・東大寺大仏殿。"),
      [
        img("File:Nara Park deer.jpg", 1600, 1067, "朝の奈良公園の鹿", "早朝の鹿は穏やかで静かに草を食む。"),
        img("File:Nigatsu-do Nara.jpg", 1600, 1067, "二月堂の舞台", "二月堂の舞台からは奈良盆地を一望できる。"),
        img("File:Nandaimon Gate Nara.jpg", 1600, 1067, "南大門", "運慶・快慶作の8mの金剛力士像が守る南大門。"),
        img("File:Kasuga Taisha lanterns.jpg", 1600, 1067, "春日大社への石灯籠", "東大寺から春日大社への参道は9時前が最も静か。"),
        img("File:Nara Park autumn deer.jpg", 1600, 1067, "紅葉と鹿", "秋の朝は朝霧・鹿・紅葉が揃う。"),
      ],
      NARA_X,
      [
        {
          heading: "早朝に訪れる理由",
          body:
            "東大寺は年間300万人以上が訪れ、10時には参道も大仏殿も修学旅行と観光バスで埋まります。開門(4〜10月7:30、11〜3月8:00)から90分間は別世界の静けさです。鹿は朝の方が穏やかで、東からの朝日が大仏殿の窓から大仏を照らし、二月堂の舞台からは奈良盆地の日の出が見えます。\n\n7:30着→9:30終了で大仏殿・二月堂・奈良公園北側の鹿道を巡るルートです。",
        },
        {
          heading: "アクセスと起点",
          body:
            "近鉄奈良駅から奈良公園を東に徒歩20分。JR奈良駅から市内循環バス「東大寺大仏殿」停留所まで10分(220円)または徒歩30分。始発バスは6:30頃。\n\n奈良泊なら徒歩が便利。大阪・京都からの日帰りなら近鉄の最も早い列車で近鉄奈良着6:30頃です。",
        },
        {
          heading: "主要スポット",
          body:
            "南大門を通ります。1203年に運慶・快慶が彫った高さ8mの金剛力士像が左右に立ちます。大仏殿(拝観600円)には高さ15mの毘盧遮那仏(るしゃなぶつ)。20〜30分で見学し、東側の坂道を二月堂へ。\n\n二月堂(無料)は東大寺の丘陵地にある舞台造りの堂で、西を向いた舞台から奈良盆地が一望できます。朝の柔らかい光が最も美しい時間。二月堂から北へ、奈良公園の上部エリアの鹿道を歩くと観光客の喧騒から離れた鹿の群れに会えます。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "南大門に7:30着(冬は8:00)が目標。大仏殿は9時頃まで空いており、9:30から修学旅行バスが到着して雰囲気が一変します。\n\n秋(11月中旬)が最も写真映え。朝霧・鹿・紅葉が揃います。春の桜(4月上旬)は参道沿いが美しい。夏の朝は9時前なら快適ですが湿度が急上昇。冬の朝は寒いですが空気が澄み、年間で最も人が少ない季節です。",
        },
        {
          heading: "実用情報",
          body:
            "東大寺拝観600円(窓口現金のみ)。二月堂は無料。鹿せんべいは1束200円で売店は8時頃開店。鹿に餌をやるときは1枚ずつゆっくり。秋の発情期(10〜11月)のオス鹿は角が大きく攻撃的になるので距離を取ること。\n\n9時前に開いているカフェは東大寺周辺にないので、水と朝食は持参。最寄りのコンビニは近鉄奈良駅方面に戻って徒歩10分。二月堂への坂道は石段なので歩きやすい靴を。",
        },
      ],
      [
        { q: "東大寺の開門時間は?", a: "4〜10月は7:30、11〜3月は8:00。開門直後が最も静かです。" },
        { q: "所要時間は?", a: "大仏殿・二月堂・鹿道で90分。春日大社まで延長するなら+30分。" },
        { q: "京都の寺を見た後でも行く価値がありますか?", a: "あります。大仏殿は世界最大の木造建築で、京都にこの規模の建物はありません。庭園の繊細さではなくスケールの体験です。" },
        { q: "鹿は安全ですか?", a: "基本的に安全ですが、餌を見ると強引になります。1枚ずつ高く持って与えてください。秋の発情期のオス鹿(大きな角)には近づかないこと。" },
        { q: "ならまちと組み合わせられますか?", a: "はい。9:30に東大寺を出て南へ15分歩けば、ならまちの店が開く10時にちょうど到着します。理想的な半日コースです。" },
      ],
    ),
  },

  // =====================================================================
  // 8. nara-isuien-garden-walk — 依水園・吉城園と氷室神社
  // =====================================================================
  "nara-isuien-garden-walk": {
    en: en(
      "Isuien and Yoshikien Garden Walk in Nara",
      "A quiet garden walk in Nara covering Isuien Garden's borrowed-scenery design, the adjacent Yoshikien Garden, and Himuro Shrine's early cherry blossoms, all within walking distance of Todaiji.",
      img("File:Isuien Nara01s3200.jpg", 1600, 1067, "Isuien Garden with Todaiji in the background", "Isuien Garden uses Todaiji's Nandaimon and surrounding mountains as borrowed scenery."),
      [
        img("File:Yoshikien Garden Nara.jpg", 1600, 1067, "Yoshikien Garden moss garden", "Yoshikien's moss garden is free for foreign visitors and beautifully maintained."),
        img("File:Himuro Shrine Nara.jpg", 1600, 1067, "Himuro Shrine entrance", "Himuro Shrine is known for Nara's earliest cherry blossoms each spring."),
        img("File:Isuien Garden pond.jpg", 1600, 1067, "Pond at Isuien Garden front garden", "The front garden of Isuien dates from the 17th century and uses a central pond design."),
        img("File:Neiraku Art Museum Nara.jpg", 1600, 1067, "Neiraku Art Museum at Isuien", "The Neiraku Art Museum within Isuien houses a collection of Chinese and Korean ceramics."),
        img("File:Todai-ji Daibutsuden.jpg", 1600, 1067, "View toward Todaiji from Isuien area", "Todaiji's Great Buddha Hall is visible from Isuien's rear garden as borrowed scenery."),
      ],
      NARA_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Isuien is one of Japan's finest examples of shakkei (borrowed scenery) garden design — its rear garden uses Todaiji's Nandaimon Gate, Wakakusayama hill, and the eastern mountains as its backdrop, blurring the boundary between garden and landscape. Next door, Yoshikien Garden is free for foreign passport holders and has three distinct sections: a moss garden, a pond garden, and a tea ceremony garden. Combined with Himuro Shrine — known for Nara's earliest cherry blossoms — these three sites form a quiet 90-minute loop that most Todaiji visitors walk right past.\n\nThe route is ideal as a complement to Todaiji. Walk the Great Buddha Hall first, then spend the late morning in these gardens before heading to Naramachi for lunch.",
        },
        {
          heading: "How to Get There",
          body:
            "Isuien and Yoshikien sit side by side on the road between Todaiji's Nandaimon Gate and Kintetsu Nara Station, about 5 minutes' walk south of the Nandaimon. Himuro Shrine is directly across the road from Isuien's entrance.\n\nFrom Kintetsu Nara Station, walk 15 minutes east along the main road past Nara National Museum. From JR Nara Station, take the city loop bus to Todaiji Daibutsuden stop and walk 5 minutes south.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Start at Isuien Garden (900 yen, includes entry to the Neiraku Art Museum). The garden has two parts: the front garden (17th century, centered on a pond) and the rear garden (Meiji era, with the borrowed-scenery view of Todaiji and the mountains). The rear garden's teahouse serves matcha for 500 yen with the borrowed-scenery view.\n\nNext door, Yoshikien Garden is free for foreign passport holders (bring your passport). The moss garden section is the highlight — thick moss carpets under mature maple trees create a miniature Saihoji (Kyoto's moss temple) experience without the reservation hassle. Finally, cross the road to Himuro Shrine, which blooms with Nara's earliest shidare-zakura (weeping cherry) in late March.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "These gardens open at 9:30 am. Visit Todaiji at opening (7:30 or 8 am), then walk here by 9:30 when the gardens open. Weekday mornings are genuinely empty — you may have the moss garden entirely to yourself.\n\nLate March brings Himuro Shrine's early cherry blossoms. Late November is peak maple season and Yoshikien's moss garden turns extraordinary with red leaves on green moss. Summer is lush and green but hot. Winter is quiet and the bare branches reveal the garden structures clearly.",
        },
        {
          heading: "Practical Tips",
          body:
            "Isuien admission is 900 yen (cash only). Yoshikien is free for foreign visitors with passport (Japanese visitors pay 300 yen). Himuro Shrine is free. English garden maps are available at both Isuien and Yoshikien entrances.\n\nThe gardens are compact — Isuien takes 30 to 45 minutes, Yoshikien 20 to 30 minutes, and Himuro Shrine 10 minutes. All paths are relatively flat. Photography is allowed but tripods are not permitted inside the gardens.",
        },
      ],
      [
        { q: "How long does this walk take?", a: "90 minutes for all three sites. Isuien takes 30 to 45 minutes, Yoshikien 20 to 30 minutes, and Himuro Shrine 10 minutes." },
        { q: "Is Yoshikien really free?", a: "Yes, for foreign passport holders. Show your passport at the entrance. Japanese visitors pay 300 yen." },
        { q: "What is borrowed scenery?", a: "Shakkei is a garden design technique that incorporates distant landscape elements — in Isuien's case, Todaiji and the surrounding mountains — as part of the garden composition." },
        { q: "When is the best season?", a: "Late November for maple leaves over Yoshikien's moss garden, late March for Himuro Shrine's early cherry blossoms." },
        { q: "Can I combine this with Todaiji?", a: "Yes, and you should. Visit Todaiji at opening (7:30 am), finish by 9:30, and walk 5 minutes south to these gardens when they open." },
      ],
    ),
    ja: ja(
      "依水園・吉城園と氷室神社の庭園散歩ガイド",
      "東大寺南大門のすぐ南にある依水園(借景庭園)と吉城園(苔庭)、奈良一早い桜で知られる氷室神社を巡る90分の静かな庭園ルート。",
      img("File:Isuien Nara01s3200.jpg", 1600, 1067, "依水園と東大寺の借景", "依水園の後園は東大寺南大門と若草山を借景に取り込む。"),
      [
        img("File:Yoshikien Garden Nara.jpg", 1600, 1067, "吉城園の苔庭", "吉城園の苔庭は外国人パスポート提示で無料。"),
        img("File:Himuro Shrine Nara.jpg", 1600, 1067, "氷室神社", "氷室神社は奈良で最も早い枝垂れ桜で知られる。"),
        img("File:Isuien Garden pond.jpg", 1600, 1067, "依水園の前園の池", "17世紀の前園は池泉を中心とした構成。"),
        img("File:Neiraku Art Museum Nara.jpg", 1600, 1067, "寧楽美術館", "依水園内の寧楽美術館は中国・韓国の陶磁器を収蔵。"),
        img("File:Todai-ji Daibutsuden.jpg", 1600, 1067, "依水園から望む東大寺方面", "後園から東大寺大仏殿が借景として見える。"),
      ],
      NARA_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "依水園は日本庭園の借景(しゃっけい)技法の最高例のひとつで、後園から東大寺南大門・若草山・東の山並みを庭園の一部として取り込みます。隣の吉城園は外国人パスポート提示で無料、苔庭・池庭・茶花庭の3区画があり、京都の苔寺(西芳寺)に似た苔の美しさを予約不要で味わえます。通りを挟んで氷室神社は奈良で最も早い枝垂れ桜(3月下旬)で有名。\n\n3か所合わせて90分の静かなルートで、東大寺を見た後のセットとして最適です。",
        },
        {
          heading: "アクセスと起点",
          body:
            "依水園と吉城園は東大寺南大門から南に徒歩5分の道路沿いに並んでいます。氷室神社は依水園の入口の向かい。近鉄奈良駅から奈良国立博物館を過ぎて東へ徒歩15分。JR奈良駅からは市内循環バスで東大寺大仏殿停留所下車、南へ徒歩5分。",
        },
        {
          heading: "主要スポット",
          body:
            "依水園(入園900円、寧楽美術館含む)は前園(17世紀、池泉中心)と後園(明治時代、借景庭園)の2部構成。後園の茶室で抹茶(500円)を飲みながら東大寺と山並みの借景を眺められます。\n\n吉城園(外国人パスポート提示で無料、日本人300円)は苔庭が最大の見どころ。成熟した紅葉の下に厚い苔の絨毯が広がり、京都の苔寺を予約なしで体験できます。最後に氷室神社へ。3月下旬に奈良一早い枝垂れ桜が咲きます。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "3か所とも9:30開園。東大寺を7:30開門で見て9:30にここへ来るのが理想的な流れ。平日午前はほぼ無人で、苔庭を独り占めできることもあります。\n\n3月下旬は氷室神社の早咲き枝垂れ桜。11月下旬は紅葉のピークで吉城園の苔庭に赤い葉が散る光景が絶景。夏は緑が最も濃く、冬は落葉後の庭園構造がよく見えます。",
        },
        {
          heading: "実用情報",
          body:
            "依水園900円(現金のみ)。吉城園は外国人パスポート提示で無料。氷室神社は無料。両庭園の入口で英語の庭園マップがもらえます。\n\n依水園30〜45分、吉城園20〜30分、氷室神社10分。園路はほぼ平坦。三脚は庭園内で使用不可。撮影は可能です。",
        },
      ],
      [
        { q: "所要時間は?", a: "3か所合わせて90分。依水園30〜45分、吉城園20〜30分、氷室神社10分。" },
        { q: "吉城園は本当に無料ですか?", a: "外国人はパスポート提示で無料です。日本人は300円。" },
        { q: "借景とは?", a: "遠景の山や建物を庭園の構成要素として取り込む日本庭園の技法。依水園は東大寺と山並みを借景にしています。" },
        { q: "ベストシーズンは?", a: "11月下旬の紅葉(吉城園の苔庭)、3月下旬の早咲き桜(氷室神社)。" },
        { q: "東大寺と組み合わせられますか?", a: "はい、むしろセットが理想的です。7:30に東大寺を見て、9:30にこちらの開園に合わせて南へ5分歩きます。" },
      ],
    ),
  },

  // =====================================================================
  // 9. hiroshima-peace-park-river-walk — 平和公園と元安川リバーウォーク
  // =====================================================================
  "hiroshima-peace-park-river-walk": {
    en: en(
      "Hiroshima Peace Park and Motoyasu River Walk",
      "A reflective walking route through Hiroshima Peace Memorial Park along the Motoyasu River, covering the A-Bomb Dome, Peace Memorial Museum, cenotaph, and riverside cherry tree paths.",
      img("File:Genbaku Dome04-r.JPG", 1600, 1067, "Atomic Bomb Dome in Hiroshima", "The A-Bomb Dome is the most recognizable structure in Hiroshima and a UNESCO World Heritage site."),
      [
        img("File:Hiroshima Peace Memorial Park 2008 01.JPG", 1600, 1067, "Hiroshima Peace Memorial Park overview", "The Peace Memorial Park spans 12 hectares at the confluence of two rivers."),
        img("File:Hiroshima Peace Museum.jpg", 1600, 1067, "Hiroshima Peace Memorial Museum", "The redesigned Peace Memorial Museum opened in 2019 with expanded exhibits."),
        img("File:Hiroshima Cenotaph.jpg", 1600, 1067, "Cenotaph for A-Bomb Victims", "The cenotaph frames the Peace Flame and the A-Bomb Dome in a single sightline."),
        img("File:Motoyasu River Hiroshima.jpg", 1600, 1067, "Motoyasu River beside Peace Park", "The Motoyasu River runs along the east side of Peace Park with riverside walking paths."),
        img("File:Hiroshima Children Peace Monument.jpg", 1600, 1067, "Children's Peace Monument", "The Sadako Sasaki memorial is draped with thousands of folded paper cranes."),
      ],
      HIROSHIMA_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Hiroshima Peace Memorial Park is not a typical tourist destination — it is a place of remembrance that also happens to be one of the most beautifully designed urban parks in Japan. The park sits at the point where the Motoyasu and Honkawa rivers meet, and the A-Bomb Dome, cenotaph, and Peace Flame are aligned on a single deliberate sightline designed by architect Kenzo Tange. The Motoyasu River walking path extends the experience beyond the park itself, connecting memorial sites with riverside cherry trees, boat docks, and the daily life of modern Hiroshima.\n\nThe walk takes 2 to 3 hours and is best done in the morning. The Peace Memorial Museum requires at least 90 minutes and is emotionally demanding — plan lighter activities afterward.",
        },
        {
          heading: "How to Get There",
          body:
            "From Hiroshima Station, take the Hiroden streetcar Line 2 or Line 6 to Genbaku Dome-mae stop (15 minutes, 220 yen). The A-Bomb Dome is directly in front of the stop. Alternatively, the Hiroshima Meipuru-pu Loop Bus stops at the Peace Park entrance.\n\nFrom Hiroshima Airport, the limousine bus reaches Hiroshima Bus Center (50 minutes, 1,370 yen), from which the park is a 10-minute walk south.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Start at the A-Bomb Dome (Genbaku Dome), the only structure left standing near the hypocenter of the 1945 atomic bombing. Walk south across the Motoyasu Bridge into Peace Memorial Park. The cenotaph, Peace Flame, and A-Bomb Dome are aligned on Tange's sightline — stand at the cenotaph to see all three framed together.\n\nThe Peace Memorial Museum (200 yen) was redesigned in 2019 and takes 60 to 90 minutes. The east building focuses on the bombing itself; the west building covers pre-war Hiroshima and the rebuilding. After the museum, walk south along the Motoyasu River path to the Children's Peace Monument (Sadako Sasaki memorial) and continue along the riverside toward Hiroshima's Hondori shopping arcade for lunch.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Arrive by 8:30 am — the park is open 24 hours but the museum opens at 8:30. Morning visits are quieter, especially on weekdays. School groups arrive from 10 am. The annual Peace Memorial Ceremony on August 6 draws large crowds and is a deeply significant event.\n\nCherry blossom season (late March to early April) lines the Motoyasu River with blossoms. Autumn is mild and comfortable for walking. Summer is hot and humid — bring water. Winter is cold but clear, with the fewest visitors.",
        },
        {
          heading: "Practical Tips",
          body:
            "The Peace Memorial Museum costs 200 yen (cash or IC card). The park and dome are free. Audio guides are available in multiple languages at the museum for 400 yen. The museum gift shop sells English-language books about Hiroshima's history.\n\nThis is a memorial site — respectful behavior is expected. Photography is allowed at the dome and in the park, and inside the museum. The park has restrooms, vending machines, and a small cafe. The nearest full restaurant area is Hondori shopping arcade, a 10-minute walk east.",
        },
      ],
      [
        { q: "How long should I spend at Peace Park?", a: "2 to 3 hours minimum. The museum alone takes 60 to 90 minutes. Allow time for the park grounds, the dome, and the riverside walk." },
        { q: "Is the museum suitable for children?", a: "The museum is educational but contains graphic images and artifacts from the bombing. Parents should use their judgment. The park grounds and Children's Peace Monument are appropriate for all ages." },
        { q: "When is the Peace Memorial Ceremony?", a: "August 6 at 8:15 am, the exact time of the bombing. The ceremony is open to the public but extremely crowded. The park takes on special significance that day." },
        { q: "Can I combine this with Miyajima?", a: "Yes. Miyajima is 45 minutes from Hiroshima by train and ferry. Most visitors do Peace Park in the morning and Miyajima in the afternoon, or split them across two days." },
        { q: "Where should I eat nearby?", a: "Hiroshima okonomiyaki is the local specialty. Hondori shopping arcade (10 minutes east) and Okonomimura (a multi-floor okonomiyaki building) have dozens of options from 800 yen." },
      ],
    ),
    ja: ja(
      "平和公園と元安川リバーウォークガイド",
      "広島平和記念公園を原爆ドームから元安川沿いに歩くルート。平和記念資料館、慰霊碑、折り鶴の塔、川沿いの桜道まで。",
      img("File:Genbaku Dome04-r.JPG", 1600, 1067, "原爆ドーム", "原爆ドームはユネスコ世界遺産に登録された広島の象徴。"),
      [
        img("File:Hiroshima Peace Memorial Park 2008 01.JPG", 1600, 1067, "平和記念公園全景", "2つの川の合流点に広がる12ヘクタールの公園。"),
        img("File:Hiroshima Peace Museum.jpg", 1600, 1067, "平和記念資料館", "2019年にリニューアルされた資料館。"),
        img("File:Hiroshima Cenotaph.jpg", 1600, 1067, "原爆死没者慰霊碑", "慰霊碑から平和の灯と原爆ドームが一直線に見える。"),
        img("File:Motoyasu River Hiroshima.jpg", 1600, 1067, "元安川", "公園の東を流れる元安川沿いに遊歩道が続く。"),
        img("File:Hiroshima Children Peace Monument.jpg", 1600, 1067, "原爆の子の像", "佐々木禎子さんの像には千羽鶴が捧げられている。"),
      ],
      HIROSHIMA_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "平和記念公園は追悼の場であると同時に、日本で最も美しい都市公園のひとつです。元安川と本川の合流点に位置し、原爆ドーム・慰霊碑・平和の灯が丹下健三の設計で一直線に並びます。元安川沿いの遊歩道を歩けば、記念碑群から川沿いの桜並木、船着場、現代の広島の日常までがつながります。\n\n所要2〜3時間、午前中の散策がベスト。平和記念資料館は最低90分必要で精神的に重い内容なので、午後は軽めの予定を入れてください。",
        },
        {
          heading: "アクセスと起点",
          body:
            "広島駅から広電2号線か6号線で「原爆ドーム前」停留所まで15分(220円)。原爆ドームは目の前。ひろしまめいぷるーぷ(循環バス)も公園入口に停車します。広島空港からはリムジンバス50分(1,370円)で広島バスセンター、そこから南へ徒歩10分。",
        },
        {
          heading: "主要スポット",
          body:
            "原爆ドームからスタート。1945年の原爆投下で唯一残った爆心地付近の建物です。元安橋を渡って公園内へ。慰霊碑に立つと、平和の灯と原爆ドームが丹下の設計意図通り一直線に見えます。\n\n平和記念資料館(200円)は2019年にリニューアル。東館は原爆の実態、西館は戦前の広島と復興を展示。60〜90分。資料館の後、元安川沿いを南に歩いて原爆の子の像(佐々木禎子記念碑)へ。さらに川沿いを歩くと本通商店街(ランチスポット)に出ます。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "公園は24時間開放、資料館は8:30開館。8:30着が理想で、平日午前が最も静か。10時から修学旅行の団体が来ます。8月6日の平和記念式典(8:15開始)は一般参加可能ですが非常に混雑します。\n\n桜の季節(3月下旬〜4月上旬)は元安川沿いが桜並木に。秋は穏やかで歩きやすく、冬は人が最も少ない。夏は蒸し暑いので水を持参。",
        },
        {
          heading: "実用情報",
          body:
            "資料館200円(現金・ICカード可)。公園とドームは無料。資料館で多言語音声ガイド(400円)が借りられます。ミュージアムショップでは広島の歴史に関する英語書籍を販売。\n\n追悼の場なので静かな行動を。撮影はドーム・公園・資料館内すべて可能。園内にトイレ・自販機・小さなカフェあり。食事は東へ10分の本通商店街が最寄りの飲食街です。",
        },
      ],
      [
        { q: "平和公園の所要時間は?", a: "最低2〜3時間。資料館だけで60〜90分。公園・ドーム・川沿い散策を含めてください。" },
        { q: "資料館は子供に適していますか?", a: "教育的ですが原爆の被害を示す生々しい写真や遺品があります。保護者の判断で。公園と原爆の子の像は全年齢向け。" },
        { q: "宮島と組み合わせられますか?", a: "はい。広島から宮島は電車+フェリーで45分。午前に平和公園、午後に宮島が定番。または2日に分けます。" },
        { q: "近くの食事は?", a: "広島お好み焼きが名物。東へ10分の本通商店街やお好み村(ビル内に複数店)で800円から。" },
        { q: "平和記念式典はいつですか?", a: "毎年8月6日8:15(投下時刻)に開始。一般参加可能ですが非常に混雑します。" },
      ],
    ),
  },

  // =====================================================================
  // 10. onomichi-temple-slope-walk — 尾道の千光寺山と坂道散策
  // =====================================================================
  "onomichi-temple-slope-walk": {
    en: en(
      "Onomichi Temple Slope Walking Guide",
      "A walking guide to Onomichi's hillside temple trail and scenic slopes overlooking the Seto Inland Sea, covering Senkoji Temple, the cat alley, and the ropeway descent.",
      img("File:Senkoji from seaside.JPG", 1600, 1067, "Senkoji Temple hill from Onomichi waterfront", "Senkoji Temple sits atop the hill above Onomichi, overlooking the Seto Inland Sea."),
      [
        img("File:Onomichi.JPG", 1600, 1067, "Onomichi hillside streets", "Onomichi's steep slopes are connected by narrow stone stairways between temples."),
        img("File:Onomichi temple walk.jpg", 1600, 1067, "Temple trail on Onomichi hillside", "The temple walk links 25 temples along the hillside above the waterfront."),
        img("File:Onomichi cat alley.jpg", 1600, 1067, "Cat art installations in Onomichi", "Onomichi's cat alley features painted stones and art installations alongside real stray cats."),
        img("File:Senkoji ropeway Onomichi.jpg", 1600, 1067, "Senkoji ropeway above Onomichi", "The Senkoji ropeway offers a 3-minute ride between the hilltop and the waterfront."),
        img("File:Onomichi waterfront.jpg", 1600, 1067, "Onomichi waterfront and Shimanami view", "The Onomichi waterfront looks across to Mukaishima and the start of the Shimanami Kaido."),
      ],
      HIROSHIMA_X,
      [
        {
          heading: "Why Onomichi Works as a Walking Destination",
          body:
            "Onomichi is a small port town on the north shore of the Seto Inland Sea, about 80 minutes from Hiroshima by train. Its steep hillside is threaded with narrow stone stairways connecting 25 temples, and the town has attracted writers, filmmakers, and artists for over a century — Yasujiro Ozu set his film Tokyo Story here. The slopes are too steep for cars, which means the temple paths and residential lanes have stayed largely unchanged since the pre-war era.\n\nThe town is also the mainland starting point of the Shimanami Kaido cycling bridge route to Shikoku. Even without cycling, the combination of temple-dotted hillside, cat-filled alleys, Seto Inland Sea views, and a compact waterfront makes Onomichi one of the most rewarding half-day walks in western Japan.",
        },
        {
          heading: "How to Get There",
          body:
            "From Hiroshima Station, take the JR Sanyo Line (local) to Onomichi Station (80 minutes, 1,520 yen) or the Shinkansen to Shin-Onomichi Station and transfer by bus (25 minutes total but more expensive). The waterfront and ropeway station are a 5-minute walk from JR Onomichi Station.\n\nFrom Osaka, take the Shinkansen to Fukuyama (60 minutes) and transfer to the JR Sanyo Line local for 20 minutes to Onomichi.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Take the Senkoji ropeway (500 yen one-way, 700 yen round-trip) to the hilltop for Seto Inland Sea views. Walk down through Senkoji Park and Senkoji Temple. The descent path passes the Literature Museum and connects to the temple walk — a marked trail that links 25 temples along the hillside. You do not need to visit all 25; the best are Senkoji, Jodoji, and Saigokuji.\n\nPartway down, look for the Neko-no-Hosomichi (Cat Alley) — a narrow path with painted cat stones, small art installations, and actual stray cats. The alley connects the upper temple path to the mid-slope residential area. Finish at the waterfront and walk along the shore toward Onomichi Station.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "The ropeway opens at 9 am. Arrive by 9 am and walk down for 2 to 3 hours. The temple paths are quietest on weekday mornings. Cherry blossom season (early April) is spectacular — Senkoji Park's 10,000 cherry trees are among the best in Hiroshima Prefecture.\n\nAutumn colors peak in mid-November. Summer is hot and the steep stairs are tiring in humidity — carry water. Winter is mild on the Seto Inland Sea coast and the views are clearest. The Onomichi Minato Festival in late April adds waterfront events.",
        },
        {
          heading: "Practical Tips",
          body:
            "Wear shoes with good grip — the stone stairways can be slippery when wet. The temple walk is almost entirely downhill if you take the ropeway up and walk down. Most temples have no admission fee; Senkoji Temple charges 200 yen.\n\nEnglish signage is limited but the paths are well-marked with Japanese signs and painted arrows. A free walking map is available at Onomichi Station tourist information. The waterfront area has ramen shops — Onomichi ramen (soy-based with pork back fat) is the local specialty, typically 700 to 900 yen.",
        },
      ],
      [
        { q: "How long should I spend in Onomichi?", a: "Half a day (3 to 4 hours) covers the ropeway, temple walk descent, cat alley, and waterfront. A full day allows for cycling the first island of the Shimanami Kaido." },
        { q: "Is the temple walk difficult?", a: "It involves steep stone stairways and uneven paths. Take the ropeway up and walk down to minimize uphill effort. Not suitable for wheelchairs or strollers." },
        { q: "What is Onomichi ramen?", a: "A soy-sauce-based ramen with pork back fat floating on the surface, creating a rich flavor. It is Onomichi's signature dish, available at waterfront shops from 700 yen." },
        { q: "Can I combine Onomichi with the Shimanami Kaido?", a: "Yes. Onomichi is the mainland starting point. You can rent a bicycle at the station and ride to the first island (Mukaishima) and back in 2 to 3 hours." },
        { q: "How do I get to Onomichi from Hiroshima?", a: "JR Sanyo Line local train from Hiroshima Station, 80 minutes, 1,520 yen. The Shinkansen to Shin-Onomichi is faster but requires a bus transfer." },
      ],
    ),
    ja: ja(
      "尾道の千光寺山と坂道散策ガイド",
      "尾道の坂道と寺町を歩くガイド。千光寺ロープウェイ、25寺を結ぶ古寺巡り、猫の細道、瀬戸内海の眺望、尾道ラーメンまで。",
      img("File:Senkoji from seaside.JPG", 1600, 1067, "海側から見た千光寺山", "千光寺は瀬戸内海を見下ろす丘の上に建つ。"),
      [
        img("File:Onomichi.JPG", 1600, 1067, "尾道の坂道", "急斜面の石段で寺と寺をつなぐ尾道の坂道。"),
        img("File:Onomichi temple walk.jpg", 1600, 1067, "尾道の古寺めぐり", "丘陵沿いに25寺を結ぶ古寺めぐりコース。"),
        img("File:Onomichi cat alley.jpg", 1600, 1067, "猫の細道", "石に描かれた猫アートと本物の猫がいる細い路地。"),
        img("File:Senkoji ropeway Onomichi.jpg", 1600, 1067, "千光寺ロープウェイ", "山頂と海岸を3分で結ぶロープウェイ。"),
        img("File:Onomichi waterfront.jpg", 1600, 1067, "尾道の海岸通り", "尾道水道の向こうにしまなみ海道の起点が見える。"),
      ],
      HIROSHIMA_X,
      [
        {
          heading: "尾道を歩く理由",
          body:
            "尾道は広島から電車で約80分、瀬戸内海北岸の小さな港町です。急斜面に25の寺が点在し、石段の細い路地で結ばれています。小津安二郎の「東京物語」の舞台でもあり、作家や映画人を惹きつけてきました。車が入れない急坂のおかげで戦前の路地構造がそのまま残っています。\n\nしまなみ海道(四国へのサイクリングロード)の本州側起点でもあります。自転車に乗らなくても、寺の丘・猫の路地・瀬戸内海の眺望・コンパクトな海岸通りの組み合わせで、西日本で最も充実した半日散歩のひとつです。",
        },
        {
          heading: "アクセスと起点",
          body:
            "広島駅からJR山陽本線で尾道駅まで約80分(1,520円)。新幹線で新尾道駅に行きバス乗り換えも可能ですが割高。JR尾道駅から海岸通りとロープウェイ乗り場まで徒歩5分。大阪からは新幹線で福山(60分)、JR山陽本線で尾道(20分)。",
        },
        {
          heading: "主要スポット",
          body:
            "千光寺ロープウェイ(片道500円、往復700円)で山頂へ。瀬戸内海のパノラマビュー。千光寺公園と千光寺(200円)を見て下り始めます。文学記念室を過ぎると古寺めぐりコースに合流。25寺すべてを回る必要はなく、千光寺・浄土寺・西國寺が特におすすめ。\n\n途中で猫の細道(ネコノホソミチ)を探してください。石に描かれた猫アートと本物の野良猫がいる細い路地で、上の寺道と中腹の住宅地をつないでいます。海岸通りに降りて尾道駅方面へ歩いて終了。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "ロープウェイは9時始発。9時到着で下りながら2〜3時間。平日午前が最も空いています。桜の時期(4月上旬)は千光寺公園の1万本の桜が広島県屈指の名所。\n\n紅葉は11月中旬。夏は急階段が湿度でつらいので水を携帯。冬は瀬戸内海側なので穏やかで、眺望が最もクリア。4月下旬の尾道みなと祭りで海岸通りにイベントが出ます。",
        },
        {
          heading: "実用情報",
          body:
            "グリップの良い靴必須。石段は濡れると滑ります。ロープウェイで上がって歩いて下るルートならほぼ下り坂。寺の多くは拝観無料、千光寺は200円。\n\n英語案内は少ないですが、道標と矢印で迷いにくいです。尾道駅の観光案内所で無料の散策マップがもらえます。海岸通りに尾道ラーメン(醤油ベース+背脂)の店が並び、700〜900円が相場。",
        },
      ],
      [
        { q: "尾道の所要時間は?", a: "半日(3〜4時間)でロープウェイ・古寺巡り下り・猫の細道・海岸通り。しまなみ海道の最初の島まで自転車なら1日。" },
        { q: "古寺めぐりはきついですか?", a: "急な石段と不整地が多いです。ロープウェイで上り歩いて下れば体力的に楽。車椅子・ベビーカーは不向きです。" },
        { q: "尾道ラーメンとは?", a: "醤油ベースに豚の背脂が浮く尾道独自のラーメン。海岸通りの店で700円から。" },
        { q: "しまなみ海道と組み合わせられますか?", a: "はい。尾道駅でレンタサイクルを借り、最初の島(向島)を往復で2〜3時間。" },
        { q: "広島からのアクセスは?", a: "JR山陽本線で約80分、1,520円。新幹線の新尾道駅よりJR尾道駅の方が街に近く便利です。" },
      ],
    ),
  },

  // =====================================================================
  // 11. hiroshima-shukkeien-garden-walk — 縮景園と広島城
  // =====================================================================
  "hiroshima-shukkeien-garden-walk": {
    en: en(
      "Shukkeien Garden and Hiroshima Castle Half-Day Walk",
      "A peaceful walking route through Shukkeien, Hiroshima's Edo-era miniature landscape garden, and the reconstructed Hiroshima Castle, covering garden design, seasonal highlights, and nearby museums.",
      img("File:Shukkei-en.jpg", 1600, 1067, "Shukkeien Garden in Hiroshima", "Shukkeien's name means 'shrunken scenery garden' — it miniaturizes famous Chinese landscapes in a compact strolling design."),
      [
        img("File:Hiroshima Castle.jpg", 1600, 1067, "Hiroshima Castle reconstructed keep", "Hiroshima Castle was rebuilt in 1958 and houses a museum of Hiroshima's pre-war history."),
        img("File:Shukkeien bridge.jpg", 1600, 1067, "Rainbow Bridge at Shukkeien", "The arched Kokokyo (Rainbow Bridge) is the visual centerpiece of Shukkeien Garden."),
        img("File:Shukkeien autumn.jpg", 1600, 1067, "Autumn colors at Shukkeien", "Maple trees along Shukkeien's pond turn vivid red in mid-November."),
        img("File:Hiroshima Castle moat.jpg", 1600, 1067, "Hiroshima Castle moat and walls", "The moat surrounding Hiroshima Castle is one of the largest urban castle moats in western Japan."),
        img("File:Shukkeien tea house.jpg", 1600, 1067, "Tea house at Shukkeien Garden", "The garden's tea house serves matcha with views over the central pond."),
      ],
      HIROSHIMA_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Shukkeien is one of western Japan's most underrated strolling gardens — originally laid out in 1620 by Ueda Soko, tea master to the daimyo Asano Nagaakira, it compresses famous Chinese and Japanese landscapes into a compact 4-hectare layout. The garden was devastated by the atomic bombing in 1945 and painstakingly restored over decades, making it both a beautiful garden and a quiet symbol of Hiroshima's recovery. Hiroshima Castle, a 15-minute walk west, was similarly destroyed and reconstructed in 1958.\n\nTogether they make a peaceful half-day complement to the more emotionally intense Peace Memorial Park. The walk covers about 2 kilometers between the garden and the castle, with the Hiroshima Prefectural Art Museum as an optional stop between them.",
        },
        {
          heading: "How to Get There",
          body:
            "Shukkeien is a 10-minute walk east of Hiroshima Station (south exit, follow signs). Alternatively, take the Hiroden streetcar to Shukkeien-mae stop (Line 9, 5 minutes). The route ends at Hiroshima Castle, from which Kamiyacho-nishi streetcar stop (Lines 1, 2, 6) is a 5-minute walk.\n\nThe garden and castle are also both accessible from the Hiroshima Meipuru-pu sightseeing bus.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Shukkeien Garden (260 yen) centers on a large pond with the arched Kokokyo (Rainbow Bridge) as its focal point. The walking path circles the pond and passes through miniature mountain, valley, and waterfall landscapes. The garden's tea house serves matcha for 500 yen. Allow 45 to 60 minutes.\n\nWalk west through the Hiroshima Prefectural Art Museum area (optional, 510 yen) to Hiroshima Castle. The reconstructed five-story keep (370 yen) houses exhibits on Hiroshima's pre-1945 history and offers views from the top floor. The castle grounds and moat are free and take 30 minutes to walk around.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Both sites open at 9 am. Visit Shukkeien first (fewer crowds) and walk to the castle by 10:30 am. The total route takes 3 to 4 hours including time inside both sites.\n\nMid-November is the best season — Shukkeien's maple trees around the pond turn vivid red. Cherry blossom season (late March) is also popular. The garden hosts evening illumination events during both seasons. Summer is lush but hot; winter is quiet and mild by Japanese standards.",
        },
        {
          heading: "Practical Tips",
          body:
            "Shukkeien 260 yen, Hiroshima Castle keep 370 yen — both cash only. Combined, under 700 yen for both sites. English pamphlets are available at both entrances. The garden is largely flat and wheelchair accessible along the main path.\n\nThere are few restaurants between the garden and castle — eat before or after. The closest food area is Hiroshima Station (east) or Hondori shopping arcade (south). Shukkeien has vending machines and a small gift shop.",
        },
      ],
      [
        { q: "How long does this walk take?", a: "3 to 4 hours including both Shukkeien (45-60 minutes) and Hiroshima Castle (45-60 minutes) plus the walk between them." },
        { q: "Is Shukkeien worth visiting compared to Kyoto gardens?", a: "Shukkeien is smaller than Kenroku-en or Korakuen but its compact design and post-bombing restoration story make it unique. It is one of the best gardens in western Japan outside Kyoto." },
        { q: "When is the best season?", a: "Mid-November for autumn colors at Shukkeien, late March for cherry blossoms at both sites." },
        { q: "Can I combine this with Peace Park?", a: "Yes. Do Peace Park in the morning, then walk or take the streetcar to Shukkeien and the castle in the afternoon. They are 2 kilometers apart." },
        { q: "Is the castle original?", a: "No. The original 1589 castle was destroyed in 1945. The current keep is a 1958 concrete reconstruction housing a museum." },
      ],
    ),
    ja: ja(
      "縮景園と広島城周辺の半日散歩ガイド",
      "広島の名園・縮景園の回遊と広島城まで歩く半日ルート。庭園の借景、虹橋、季節の見どころ、城の歴史展示まで。",
      img("File:Shukkei-en.jpg", 1600, 1067, "縮景園", "「縮景園」は中国の名勝を縮小して再現した回遊式庭園。"),
      [
        img("File:Hiroshima Castle.jpg", 1600, 1067, "広島城", "1958年に再建された広島城天守閣。"),
        img("File:Shukkeien bridge.jpg", 1600, 1067, "縮景園の跨虹橋", "アーチ状の跨虹橋は縮景園のシンボル。"),
        img("File:Shukkeien autumn.jpg", 1600, 1067, "縮景園の紅葉", "11月中旬に池の周りのモミジが真紅に染まる。"),
        img("File:Hiroshima Castle moat.jpg", 1600, 1067, "広島城の堀", "広島城の堀は西日本有数の規模。"),
        img("File:Shukkeien tea house.jpg", 1600, 1067, "縮景園の茶室", "茶室から池を眺めながら抹茶を楽しめる。"),
      ],
      HIROSHIMA_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "縮景園は1620年に浅野長晟の茶人・上田宗箇が作庭した回遊式庭園で、中国や日本の名勝を4ヘクタールに縮小して再現しています。1945年の原爆で壊滅しましたが数十年かけて復元され、美しい庭園であると同時に広島の復興の象徴でもあります。西へ徒歩15分の広島城も同様に1958年に再建されました。\n\n平和記念公園と比べて穏やかな時間が過ごせる半日ルートで、2か所合わせて約2kmの散策です。",
        },
        {
          heading: "アクセスと起点",
          body:
            "広島駅南口から東へ徒歩10分。広電9号線「縮景園前」停留所なら5分。ルートの終点・広島城からは「紙屋町西」停留所(1・2・6号線)まで徒歩5分。めいぷるーぷ(観光バス)でも両方アクセス可能。",
        },
        {
          heading: "主要スポット",
          body:
            "縮景園(260円)は中央の池と跨虹橋(ここうきょう)を軸に、山・谷・滝のミニチュア景観を回遊します。茶室で抹茶(500円)を一杯。45〜60分。\n\n西へ歩いて広島県立美術館エリア(任意、510円)を抜け広島城へ。再建された5層の天守閣(370円)は広島の戦前史を展示し、最上階から市街地を一望。城跡と堀は無料で一周30分です。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "両施設とも9時開園。縮景園→城の順で10:30頃に城着。合計3〜4時間。11月中旬が最も美しく、池の紅葉が見事。桜は3月下旬。両シーズンに夜間ライトアップあり。夏は暑いが緑が濃く、冬は穏やかで静か。",
        },
        {
          heading: "実用情報",
          body:
            "縮景園260円、広島城天守370円、いずれも現金のみ。2か所合計700円以下。両方の入口で英語パンフレットあり。縮景園は主要園路が平坦で車椅子で概ねアクセス可能。\n\n庭園と城の間に飲食店は少ないので、前後に食事を。広島駅(東側)か本通商店街(南側)が最寄りの食事エリア。縮景園に自販機と小さな売店あり。",
        },
      ],
      [
        { q: "所要時間は?", a: "3〜4時間。縮景園45〜60分、広島城45〜60分、移動含む。" },
        { q: "京都の庭園と比べて行く価値がありますか?", a: "縮景園は兼六園や後楽園より小さいですが、コンパクトな設計と原爆からの復元という背景が独自の価値です。西日本では京都以外で最良級の庭園。" },
        { q: "ベストシーズンは?", a: "11月中旬の紅葉、3月下旬の桜。" },
        { q: "平和公園と組み合わせられますか?", a: "はい。午前に平和公園、午後に縮景園+広島城。約2km離れています。" },
        { q: "城は本物ですか?", a: "1589年築の原城は1945年に破壊。現在の天守は1958年のコンクリート再建で、内部は博物館です。" },
      ],
    ),
  },

  // =====================================================================
  // 12. fukuoka-hakata-old-town-walk — 博多旧市街の寺町散策
  // =====================================================================
  "fukuoka-hakata-old-town-walk": {
    en: en(
      "Hakata Old Town Temple and Merchant District Walk",
      "A walking route through Hakata's historic temple district and merchant quarter covering Tochoji, Shofukuji, Kushida Shrine, and the old machiya streets of pre-modern Fukuoka.",
      img("File:Tochoji Temple Fukuoka Japan01s3.jpg", 1600, 1067, "Tochoji Temple in Hakata", "Tochoji Temple houses the largest wooden seated Buddha statue in Japan."),
      [
        img("File:Shofukuji Temple Fukuoka.jpg", 1600, 1067, "Shofukuji Temple gate in Hakata", "Shofukuji is Japan's first Zen temple, founded by Eisai in 1195."),
        img("File:Kushida Shrine Fukuoka.jpg", 1600, 1067, "Kushida Shrine in Hakata", "Kushida Shrine is the center of Hakata's Gion Yamakasa festival."),
        img("File:Hakata Machiya Folk Museum.jpg", 1600, 1067, "Hakata Machiya Folk Museum", "The folk museum preserves a traditional merchant house and exhibits Hakata craft traditions."),
        img("File:Hakata old town street.jpg", 1600, 1067, "Old town street in Hakata", "Quiet residential lanes between the temples retain pre-war character."),
        img("File:Hakata Yamakasa float.jpg", 1600, 1067, "Yamakasa festival float at Kushida Shrine", "A permanent Yamakasa festival float is displayed at Kushida Shrine year-round."),
      ],
      FUKUOKA_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Most visitors to Fukuoka head straight for the ramen stalls and nightlife, but Hakata — the historic eastern half of the city — has one of the densest concentrations of temples in Japan. The area between Hakata Station and Canal City holds Tochoji (home to the largest wooden seated Buddha in Japan), Shofukuji (Japan's first Zen temple, founded 1195), and Kushida Shrine (spiritual center of the Hakata Gion Yamakasa festival). Between the temples, narrow lanes preserve the texture of the pre-war merchant quarter.\n\nThe walk covers about 2 kilometers and takes 2 to 3 hours. It works best as a morning route before shifting to Fukuoka's food scene in the afternoon.",
        },
        {
          heading: "How to Get There",
          body:
            "Start at Hakata Station (JR and Subway). The first temple (Tochoji) is an 8-minute walk northwest of the station's Hakata Exit. The route ends near Canal City Hakata, from which Nakasu-Kawabata Station (Subway Kuko Line) is a 3-minute walk.\n\nFrom Fukuoka Airport, the subway reaches Hakata Station in 5 minutes — one of the shortest airport-to-city-center connections in Japan.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Tochoji Temple (free) was founded in 806 by Kukai and houses a 10.8-meter wooden seated Fukuoka Daibutsu completed in 1992 — the largest of its kind in Japan. The hell-and-paradise corridor beneath the statue is a unique experience. Walk 5 minutes north to Shofukuji Temple (grounds only, free), founded by Eisai who brought Zen Buddhism and tea cultivation from China to Japan.\n\nContinue southwest to Kushida Shrine (free), where a Yamakasa festival float is permanently displayed. The adjacent Hakata Machiya Folk Museum (200 yen) preserves a traditional townhouse and demonstrates Hakata-ori textile weaving. Walk through the old merchant lanes between the temples to absorb the neighborhood's texture.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Weekday mornings are quietest. The temples are open from 9 am (Tochoji's Daibutsu hall opens at 9 am). The Hakata Gion Yamakasa festival runs from July 1 to 15, with the dramatic dawn race on July 15 — this is the single most significant event in Hakata.\n\nSpring (late March to early April) brings cherry blossoms to the temple grounds. Autumn is mild and comfortable. Summer is hot and humid. Winter is mild by Japanese standards — Fukuoka's latitude is similar to the American Southeast.",
        },
        {
          heading: "Practical Tips",
          body:
            "All temples and Kushida Shrine are free to enter. The Hakata Machiya Folk Museum is 200 yen. English signage is present at the major temples but limited on the side streets. A free walking map is available at the Hakata Station tourist information center.\n\nAfter the walk, head to Canal City Hakata or the Nakasu yatai (street food stalls along the river) for Hakata ramen and mentaiko (spicy cod roe). Yatai stalls open from around 6 pm.",
        },
      ],
      [
        { q: "How long does this walk take?", a: "2 to 3 hours covering about 2 kilometers. Add time for the Hakata Machiya Folk Museum if interested." },
        { q: "Is Hakata's old town worth visiting?", a: "Yes. The temple concentration is remarkable — Japan's first Zen temple and largest wooden seated Buddha are both here, within walking distance of each other." },
        { q: "When is the Yamakasa festival?", a: "July 1 to 15 annually. The climactic oiyama race happens at dawn on July 15 and draws huge crowds." },
        { q: "Where should I eat?", a: "Hakata ramen at Ippudo (original shop near Canal City) or the Nakasu yatai stalls (open from 6 pm). Budget 700 to 1,200 yen for ramen." },
        { q: "How close is the airport?", a: "Fukuoka Airport is 5 minutes by subway from Hakata Station — one of the most convenient airports in Japan." },
      ],
    ),
    ja: ja(
      "博多旧市街の寺町と商人文化散策ガイド",
      "博多駅から東長寺・承天寺・櫛田神社・博多町家を巡る2kmの歴史散歩。日本最大の木造坐仏と日本最初の禅寺を歩く。",
      img("File:Tochoji Temple Fukuoka Japan01s3.jpg", 1600, 1067, "東長寺", "東長寺には日本最大の木造坐仏「福岡大仏」がある。"),
      [
        img("File:Shofukuji Temple Fukuoka.jpg", 1600, 1067, "聖福寺の山門", "聖福寺は栄西が1195年に開いた日本最初の禅寺。"),
        img("File:Kushida Shrine Fukuoka.jpg", 1600, 1067, "櫛田神社", "博多祇園山笠の中心・櫛田神社。"),
        img("File:Hakata Machiya Folk Museum.jpg", 1600, 1067, "博多町家ふるさと館", "伝統的な商家と博多織の実演を見学できる。"),
        img("File:Hakata old town street.jpg", 1600, 1067, "博多旧市街の路地", "寺の間の静かな住宅路地に戦前の風情が残る。"),
        img("File:Hakata Yamakasa float.jpg", 1600, 1067, "櫛田神社の飾り山笠", "櫛田神社には山笠の飾り山が常設展示されている。"),
      ],
      FUKUOKA_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "福岡を訪れる人の多くはラーメンと夜の中洲に向かいますが、博多(福岡市の歴史的東半分)は日本有数の寺院密集地帯です。博多駅とキャナルシティの間に東長寺(日本最大の木造坐仏)、聖福寺(日本最初の禅寺、1195年創建)、櫛田神社(博多祇園山笠の聖地)が集中しています。寺の間の細い路地には戦前の商家町の面影が残ります。\n\n約2kmを2〜3時間で歩くルートで、午前中に巡って午後は福岡のグルメに切り替えるのが理想的です。",
        },
        {
          heading: "アクセスと起点",
          body:
            "JR・地下鉄「博多駅」博多口から北西へ徒歩8分で最初の寺(東長寺)。ルートの終点はキャナルシティ博多付近で、地下鉄空港線「中洲川端駅」まで徒歩3分。福岡空港から博多駅まで地下鉄5分という日本最短クラスのアクセスです。",
        },
        {
          heading: "主要スポット",
          body:
            "東長寺(無料)は806年に空海が開山。2階に高さ10.8mの福岡大仏(1992年完成、木造坐仏として日本最大)が安置されており、台座下の地獄極楽巡りは独特の体験。北へ5分歩いて聖福寺(境内のみ、無料)。栄西が中国から禅と茶を持ち帰って開いた日本初の禅寺です。\n\n南西へ進んで櫛田神社(無料)。山笠の飾り山が常設展示されています。隣の博多町家ふるさと館(200円)は伝統町家を保存し、博多織の実演が見られます。寺の間の旧商家の路地もぜひ歩いてください。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "平日午前が最も静か。寺は9時開門(東長寺の大仏殿は9時)。博多祇園山笠(7月1〜15日)は博多最大の祭りで、7月15日早朝の追い山が最高潮。\n\n桜(3月下旬〜4月上旬)は境内に咲きます。秋は穏やかで歩きやすい。夏は蒸し暑い。冬は日本の中では温暖(福岡の緯度はアメリカ南東部に近い)。",
        },
        {
          heading: "実用情報",
          body:
            "寺と神社はすべて無料。博多町家ふるさと館のみ200円。主要寺院に英語案内ありますが脇道には少ない。博多駅の観光案内所で無料の散策マップがもらえます。\n\n散策後はキャナルシティか中洲の屋台(18時頃〜)で博多ラーメンと明太子を。一蘭の本店がキャナルシティ近くにあります。",
        },
      ],
      [
        { q: "所要時間は?", a: "約2km、2〜3時間。博多町家ふるさと館に立ち寄るなら+30分。" },
        { q: "博多旧市街は行く価値がありますか?", a: "あります。日本最初の禅寺と日本最大の木造坐仏が徒歩圏内にある密度は全国的にも稀です。" },
        { q: "山笠はいつですか?", a: "毎年7月1〜15日。クライマックスは15日早朝の追い山で大群衆になります。" },
        { q: "おすすめの食事は?", a: "博多ラーメンなら一蘭本店(キャナルシティ近く)か中洲の屋台(18時〜)。ラーメン700〜1,200円。" },
        { q: "空港は近いですか?", a: "福岡空港から博多駅まで地下鉄5分。日本最短クラスのアクセスです。" },
      ],
    ),
  },

  // =====================================================================
  // 13. fukuoka-ohori-park-morning — 大濠公園の朝散歩
  // =====================================================================
  "fukuoka-ohori-park-morning": {
    en: en(
      "Ohori Park Morning Walk and Fukuoka Castle Ruins",
      "A morning walking route around Ohori Park's lakeside path and the adjacent Fukuoka Castle ruins, covering the Japanese garden, art museum, and seasonal cherry blossoms.",
      img("File:Ohori Park Fukuoka01.jpg", 1600, 1067, "Ohori Park lake in Fukuoka", "Ohori Park's 2-kilometer lakeside path is Fukuoka's most popular morning walking route."),
      [
        img("File:Ohori Park Japanese Garden.jpg", 1600, 1067, "Japanese garden at Ohori Park", "The Japanese garden within Ohori Park features a traditional tea house and koi pond."),
        img("File:Fukuoka Castle ruins.jpg", 1600, 1067, "Fukuoka Castle stone walls", "The massive stone walls of Fukuoka Castle are among the largest in Kyushu."),
        img("File:Ohori Park cherry blossoms.jpg", 1600, 1067, "Cherry blossoms at Ohori Park", "The lakeside cherry trees make Ohori Park one of Fukuoka's best hanami spots."),
        img("File:Fukuoka Art Museum.jpg", 1600, 1067, "Fukuoka Art Museum at Ohori Park", "The Fukuoka Art Museum was renovated in 2019 and sits on the park's east shore."),
        img("File:Ohori Park bridge.jpg", 1600, 1067, "Island bridges at Ohori Park", "Three islands connected by bridges span the center of Ohori Park's lake."),
      ],
      FUKUOKA_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Ohori Park is Fukuoka's central green space — a 2-kilometer lakeside walking path built around a former castle moat. The park is modeled on West Lake in Hangzhou, China, with three islands connected by bridges across the center of the lake. Adjacent Fukuoka Castle (Maizuru Park) has some of the most impressive stone walls in Kyushu and offers hilltop views over the city.\n\nThe combination works best as a morning routine — the lakeside path is used by joggers and walkers from dawn, and the castle ruins are nearly empty before 9 am. After the walk, the Fukuoka Art Museum and the Japanese garden within the park provide quieter indoor options.",
        },
        {
          heading: "How to Get There",
          body:
            "Ohori-koen Station on the Fukuoka City Subway Kuko Line is directly adjacent to the park's south entrance (5 minutes from Tenjin, 10 minutes from Hakata). The park is also a 15-minute walk from Tenjin's shopping district.\n\nFukuoka Castle ruins are accessible from the east side of the park — walk through the park and cross to Maizuru Park in 5 minutes.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Start at the south entrance and walk counterclockwise around the lake. The three island bridges offer the best views and photo angles of the water and city skyline. The lakeside path is flat and takes 30 to 40 minutes to complete one loop.\n\nOn the east side, enter the Japanese Garden (240 yen) — a compact strolling garden with a tea house, waterfall, and koi pond. After the garden, cross into Fukuoka Castle (Maizuru Park, free). Climb to the Tenshudai (castle keep foundation) for panoramic views over Ohori Park, Hakata Bay, and the city. The Fukuoka Art Museum (200 yen, closed Mondays) on the east shore is worth visiting if you have time.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "The park is open 24 hours and at its best from 7 to 9 am when joggers share the path but tourists have not arrived. The Japanese Garden opens at 9 am.\n\nCherry blossom season (late March to early April) is spectacular — the lakeside and castle grounds are lined with 2,600 cherry trees, making this Fukuoka's premier hanami spot. Evening illumination during cherry season attracts large crowds. Autumn colors peak in late November. Summer mornings before 8 am are the only comfortable time due to humidity.",
        },
        {
          heading: "Practical Tips",
          body:
            "The park is free. Japanese Garden 240 yen, Art Museum 200 yen, Castle ruins free — all cash only. The park has clean restrooms, vending machines, and a Starbucks on the south shore. English signage is present at major points.\n\nRental boats are available on the lake (500 yen for 30 minutes, from 11 am). The park is fully flat and stroller and wheelchair accessible. The castle ruins involve stone stairs and uneven paths for the hilltop viewpoint.",
        },
      ],
      [
        { q: "How long does this walk take?", a: "The lakeside loop is 30 to 40 minutes. Add 30 minutes for the Japanese Garden and 30 to 45 minutes for the castle ruins. Total: 2 to 3 hours." },
        { q: "What time should I go?", a: "7 to 9 am for the quietest experience. The park is open 24 hours but the garden and museum open at 9 am." },
        { q: "Is this a good cherry blossom spot?", a: "Yes — one of the best in Fukuoka. 2,600 cherry trees line the lake and castle grounds. Late March to early April is peak season." },
        { q: "Can I combine this with Hakata old town?", a: "Yes. Do Ohori Park in the morning, then take the subway from Ohori-koen to Hakata Station (10 minutes) for the temple walk in the afternoon." },
        { q: "Where should I eat?", a: "Starbucks on the south shore for coffee. For a full meal, the Tenjin shopping district is a 15-minute walk or one subway stop east." },
      ],
    ),
    ja: ja(
      "大濠公園の朝散歩と福岡城址ガイド",
      "大濠公園の湖畔を一周し、日本庭園と福岡城跡の石垣を巡る朝のルート。桜の名所、美術館、天守台からの眺望まで。",
      img("File:Ohori Park Fukuoka01.jpg", 1600, 1067, "大濠公園の池", "大濠公園の2kmの湖畔路は福岡で最も人気の朝散歩コース。"),
      [
        img("File:Ohori Park Japanese Garden.jpg", 1600, 1067, "大濠公園の日本庭園", "園内の日本庭園には茶室と錦鯉の池がある。"),
        img("File:Fukuoka Castle ruins.jpg", 1600, 1067, "福岡城の石垣", "福岡城の石垣は九州最大級。"),
        img("File:Ohori Park cherry blossoms.jpg", 1600, 1067, "大濠公園の桜", "湖畔の桜で福岡屈指の花見スポット。"),
        img("File:Fukuoka Art Museum.jpg", 1600, 1067, "福岡市美術館", "2019年リニューアルの福岡市美術館は東岸に建つ。"),
        img("File:Ohori Park bridge.jpg", 1600, 1067, "大濠公園の中の島", "3つの島を橋でつなぐ構成は中国の西湖がモデル。"),
      ],
      FUKUOKA_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "大濠公園は旧城堀を利用した福岡の中心的な水辺空間で、2kmの湖畔遊歩道を一周できます。中国杭州の西湖をモデルに3つの中の島を橋で結んだ構成。隣接する福岡城跡(舞鶴公園)は九州最大級の石垣群で、天守台からは博多湾と市街地が一望できます。\n\n朝7〜9時が最もよく、ジョガーや散歩者と湖畔を共有する静かな時間帯です。散歩後は園内の美術館や日本庭園で過ごせます。",
        },
        {
          heading: "アクセスと起点",
          body:
            "福岡市地下鉄空港線「大濠公園駅」が公園南口に直結(天神から5分、博多から10分)。天神の繁華街からも徒歩15分。福岡城跡は公園の東側から舞鶴公園に入って5分です。",
        },
        {
          heading: "主要スポット",
          body:
            "南口から反時計回りに湖畔を歩きます。3つの中の島橋が最も写真映えするポイント。湖畔一周は30〜40分。\n\n東側で日本庭園(240円)へ。茶室・滝・錦鯉の池がある小ぶりな回遊庭園。庭園の後、福岡城(舞鶴公園、無料)へ。天守台に登ると大濠公園・博多湾・市街地のパノラマ。福岡市美術館(200円、月曜休)は時間があれば東岸で立ち寄りを。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "公園は24時間開放、7〜9時が最適。日本庭園は9時開園。桜の季節(3月下旬〜4月上旬)は湖畔と城跡に2,600本の桜が咲く福岡随一の花見スポット。夜桜ライトアップもあり混雑。紅葉は11月下旬。夏は朝8時前が快適リミット。",
        },
        {
          heading: "実用情報",
          body:
            "公園は無料。日本庭園240円、美術館200円、城跡無料。すべて現金のみ。園内にトイレ・自販機・スターバックス(南岸)あり。主要ポイントに英語案内。\n\nボート(500円/30分、11時〜)あり。公園は全面フラットでベビーカー・車椅子可。城跡の天守台は石段で傾斜あり。",
        },
      ],
      [
        { q: "所要時間は?", a: "湖畔一周30〜40分。日本庭園+30分、城跡+30〜45分。合計2〜3時間。" },
        { q: "何時がベスト?", a: "7〜9時。公園は24時間だが庭園と美術館は9時開園。" },
        { q: "桜の名所ですか?", a: "はい。2,600本の桜で福岡屈指。3月下旬〜4月上旬がピーク。" },
        { q: "博多旧市街と組み合わせられますか?", a: "はい。午前に大濠公園、地下鉄で博多駅へ10分、午後に寺町散策。" },
        { q: "食事は?", a: "南岸にスターバックス。しっかり食べるなら天神(徒歩15分か地下鉄1駅)。" },
      ],
    ),
  },

  // =====================================================================
  // 14. yanagawa-boat-canals-day — 柳川の川下り
  // =====================================================================
  "yanagawa-boat-canals-day": {
    en: en(
      "Yanagawa Canal Boat Ride and Castle Town Walk",
      "A day trip guide to Yanagawa's canal boat rides and historic castle town, covering the donko boat experience, samurai district, eel restaurants, and seasonal willow-lined waterways.",
      img("File:Yanagawa river cruise.jpg", 1600, 1067, "Yanagawa canal boat ride", "Traditional donko boats glide through Yanagawa's network of Edo-era canals."),
      [
        img("File:Yanagawa canals willow.jpg", 1600, 1067, "Willow-lined canal in Yanagawa", "Weeping willows hang over Yanagawa's canals, creating a postcard atmosphere."),
        img("File:Yanagawa Ohana garden.jpg", 1600, 1067, "Ohana garden and villa in Yanagawa", "The Ohana villa was the Tachibana clan's residence and includes a strolling garden."),
        img("File:Yanagawa castle town.jpg", 1600, 1067, "Historic streets of Yanagawa", "Yanagawa's castle town retains quiet residential lanes with white-walled warehouses."),
        img("File:Yanagawa eel restaurant.jpg", 1600, 1067, "Unagi seiro-mushi in Yanagawa", "Yanagawa's signature dish is seiro-mushi — steamed eel on rice in a lacquer box."),
        img("File:Yanagawa sagemon festival.jpg", 1600, 1067, "Sagemon hanging decorations in Yanagawa", "The Sagemon Festival (February-April) fills the town with colorful hanging ornaments."),
      ],
      FUKUOKA_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Yanagawa is a canal town 50 minutes south of Fukuoka by Nishitetsu train, built around a network of waterways originally dug as castle moats in the 1600s. The town is famous for donko boat rides — flat-bottomed boats punted through narrow canals lined with weeping willows, stone walls, and traditional storehouses. Unlike larger tourist boat rides, Yanagawa's canals are narrow enough that you pass within arm's reach of gardens, kitchens, and daily life.\n\nThe boat ride plus a walking tour of the castle town and an eel lunch make a complete day trip from Fukuoka. Yanagawa is also the birthplace of the poet Kitahara Hakushu and has a small literary heritage trail.",
        },
        {
          heading: "How to Get There",
          body:
            "From Nishitetsu Fukuoka (Tenjin) Station, take the Nishitetsu Tenjin-Omuta Line limited express to Yanagawa Station (50 minutes, 850 yen). Boat operators meet passengers at the station with shuttle buses to the embarkation points. A Nishitetsu discount ticket combining the round-trip train and boat ride is available for around 5,160 yen.\n\nYanagawa is not on the JR network — you must use the Nishitetsu private railway from Tenjin.",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "The donko boat ride takes 60 to 70 minutes and covers about 4 kilometers of canals. Boats hold 10 to 15 passengers and the boatman narrates (in Japanese, but the visual experience needs no translation). The ride ends near the Ohana villa district.\n\nAfter disembarking, visit the Ohana villa and garden (500 yen) — the former residence of the Tachibana clan lords of Yanagawa, with a Meiji-era Western-style house and a strolling garden. Walk through the castle town streets to see white-walled kura storehouses. End with eel — Yanagawa's signature seiro-mushi (steamed eel on rice) is served at restaurants throughout the town from around 2,500 yen.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Boat rides operate year-round from 9 am. The first departure is quietest. Spring (March to May) is the best season — cherry blossoms and willow greenery line the canals, and the Sagemon Festival (February to April) fills the town with colorful hanging ornaments celebrating girls' health.\n\nSummer boats have roofs for shade. Autumn brings warm colors to the canal-side trees. Winter boats are equipped with kotatsu (heated blankets) — a uniquely cozy experience from December to February. Rainy days are actually atmospheric on the canals.",
        },
        {
          heading: "Practical Tips",
          body:
            "Boat rides cost 1,650 to 1,800 yen per person depending on the operator. No reservation needed on weekdays; weekends during cherry season may sell out — book via the operator's website. The ride is suitable for all ages and requires no physical effort.\n\nBring cash — many restaurants and the Ohana villa are cash only. The town is walkable in 2 to 3 hours after the boat ride. English signage is minimal but the tourist information office at Yanagawa Station has an English map.",
        },
      ],
      [
        { q: "How long is the boat ride?", a: "60 to 70 minutes, covering about 4 kilometers of canals." },
        { q: "Do I need to book in advance?", a: "Not on weekdays. Weekend spring bookings can sell out — reserve online for March-April weekends." },
        { q: "What is seiro-mushi?", a: "Steamed eel on rice in a lacquer box — Yanagawa's signature dish, distinct from regular unagi-don. Expect to pay 2,500 to 4,000 yen per serving." },
        { q: "Can I do this as a day trip from Fukuoka?", a: "Yes. Leave Tenjin at 9 am, boat ride at 10, castle town walk and eel lunch, return by 3 to 4 pm." },
        { q: "Is the boat ride available in winter?", a: "Yes. Winter boats have kotatsu heated blankets inside, making it a uniquely warm experience from December to February." },
      ],
    ),
    ja: ja(
      "柳川の川下りと城下町散策ガイド",
      "福岡から50分の水郷・柳川でどんこ舟の川下り、御花の庭園、城下町散歩、名物うなぎのせいろ蒸しを楽しむ日帰りガイド。",
      img("File:Yanagawa river cruise.jpg", 1600, 1067, "柳川の川下り", "どんこ舟で江戸時代の掘割を巡る柳川名物の川下り。"),
      [
        img("File:Yanagawa canals willow.jpg", 1600, 1067, "柳の並木と掘割", "しだれ柳が水面に垂れる柳川の掘割。"),
        img("File:Yanagawa Ohana garden.jpg", 1600, 1067, "御花の庭園", "立花家の別邸・御花には回遊式庭園がある。"),
        img("File:Yanagawa castle town.jpg", 1600, 1067, "柳川の城下町", "白壁の蔵が残る城下町の静かな通り。"),
        img("File:Yanagawa eel restaurant.jpg", 1600, 1067, "せいろ蒸し", "柳川名物のうなぎのせいろ蒸し。"),
        img("File:Yanagawa sagemon festival.jpg", 1600, 1067, "さげもん", "さげもんまつり(2〜4月)で街中に吊るされるカラフルな飾り。"),
      ],
      FUKUOKA_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "柳川は福岡(天神)から西鉄電車で50分の水郷の町。1600年代に城の堀として掘られた掘割が網の目のように残り、どんこ舟(平底の舟)で巡る川下りが名物です。大型観光船と違い、柳川の掘割は幅が狭く、庭先や台所のすぐ横を通過する距離感が独特です。\n\n川下り+城下町散歩+うなぎランチで福岡からの日帰りが完成します。詩人・北原白秋の生地でもあり、小さな文学散策もできます。",
        },
        {
          heading: "アクセスと起点",
          body:
            "西鉄福岡(天神)駅から西鉄天神大牟田線特急で柳川駅まで50分(850円)。駅前で川下り業者がシャトルバスで乗船場まで送迎します。西鉄が往復電車+川下りのセット券(約5,160円)を販売。柳川はJR路線外なので必ず西鉄を使います。",
        },
        {
          heading: "主要スポット",
          body:
            "川下りは約60〜70分、掘割を約4km。1舟10〜15人乗りで船頭さんが案内(日本語ですが風景だけで十分楽しめます)。御花(おはな)地区付近で下船。\n\n御花(500円)は立花家の旧邸宅で、明治の洋館と回遊式庭園が見学できます。城下町の白壁の蔵通りを歩き、締めにうなぎのせいろ蒸し(蒸したうなぎを飯に乗せた柳川名物、2,500円〜)。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "川下りは年中運行、9時始発。最初の便が最も空いています。春(3〜5月)がベストシーズン。桜と柳の新緑が掘割沿いに映え、さげもんまつり(2〜4月)で街中にカラフルな吊り飾りが出ます。\n\n夏は日よけ付き。秋は紅葉。冬(12〜2月)はこたつ舟で掘割を巡る独特の体験。雨の日も掘割の雰囲気がよく出ます。",
        },
        {
          heading: "実用情報",
          body:
            "川下り1,650〜1,800円/人(業者により異なる)。平日は予約不要、桜の週末は満席になるので業者サイトで要予約。全年齢向けで体力は不要。\n\n現金持参推奨。飲食店や御花は現金のみが多い。下船後の城下町は2〜3時間で歩けます。柳川駅の観光案内所で英語マップがもらえます。",
        },
      ],
      [
        { q: "川下りの所要時間は?", a: "60〜70分、約4kmの掘割を巡ります。" },
        { q: "予約は必要ですか?", a: "平日は不要。桜シーズンの週末は満席になるのでオンライン予約推奨。" },
        { q: "せいろ蒸しとは?", a: "蒸したうなぎを飯に乗せた柳川名物。通常のうな丼とは製法が異なります。2,500〜4,000円。" },
        { q: "福岡から日帰りできますか?", a: "はい。天神9時発→10時乗船→城下町散歩+うなぎ昼食→15〜16時帰着。" },
        { q: "冬も川下りはありますか?", a: "はい。12〜2月はこたつ舟で暖かい中を巡れます。冬ならではの体験です。" },
      ],
    ),
  },

  // =====================================================================
  // 15. yokohama-yamate-bluff-walk — 山手の洋館散策
  // =====================================================================
  "yokohama-yamate-bluff-walk": {
    en: en(
      "Yokohama Yamate Bluff and Western Mansion Walk",
      "A walking guide to Yokohama's Yamate bluff district covering preserved Western-style mansions, the foreign cemetery, harbor views, and the quiet tree-lined streets of the former foreign settlement.",
      img("File:Yokohama Bluff No.18.jpg", 1600, 1067, "Western mansion on Yokohama's Yamate bluff", "Yamate's preserved Western mansions date from the late 19th century foreign settlement era."),
      [
        img("File:Yokohama Foreign General Cemetery.jpg", 1600, 1067, "Yokohama Foreign General Cemetery", "The Foreign General Cemetery on the bluff holds over 4,000 graves from 40 countries."),
        img("File:Harbor View Park Yokohama.jpg", 1600, 1067, "Harbor View Park on Yamate bluff", "Harbor View Park offers panoramic views over Yokohama Bay Bridge and the port."),
        img("File:Yokohama Ehrismann Residence.jpg", 1600, 1067, "Ehrismann Residence in Yamate", "The Ehrismann Residence is one of seven free public Western mansions on the bluff."),
        img("File:Yamate Italian Garden.jpg", 1600, 1067, "Italian Garden in Yamate", "The Bluff No. 18 house sits in an Italian-style garden on the Yamate hillside."),
        img("File:Motomachi from Yamate.jpg", 1600, 1067, "View down to Motomachi from Yamate", "The bluff overlooks Motomachi shopping street below."),
      ],
      YOKOHAMA_X,
      [
        {
          heading: "Why This Walk Works",
          body:
            "Yokohama's Yamate district sits on a bluff above the port where foreign merchants and diplomats built homes during the late 19th century treaty port era. Seven Western-style mansions have been preserved and opened to the public for free, scattered along tree-lined streets with harbor views. The Foreign General Cemetery, with over 4,000 graves from 40 countries, adds historical depth.\n\nThe walk is a quiet contrast to the commercial waterfront of Minato Mirai below. It covers about 2 kilometers along the bluff and can be done in 90 minutes, or stretched to half a day with mansion interiors and a stop in Motomachi shopping street at the bottom of the hill.",
        },
        {
          heading: "How to Get There",
          body:
            "From Yokohama Station, take the Minatomirai Line to Motomachi-Chukagai Station (8 minutes). Use Exit 6 (Yamate/American Mountain exit) to reach the bluff directly. Alternatively, take the JR Negishi Line to Ishikawacho Station and walk uphill for 10 minutes.\n\nFrom Tokyo, take the Toyoko Line express from Shibuya to Motomachi-Chukagai (35 minutes, direct service).",
        },
        {
          heading: "Key Stops on the Route",
          body:
            "Start at Harbor View Park for panoramic views of Yokohama Bay Bridge and the port. Walk west along the bluff passing the British House, Yamate Museum (small local history collection, free), and the Foreign General Cemetery (free entry when open, donations accepted). The cemetery is open weekends and some weekdays from March to December.\n\nContinue along the tree-lined Yamate Main Street passing Ehrismann Residence, Berrick Hall (the largest mansion, Spanish colonial style), and Bluff No. 18 with its Italian garden. All seven mansions are free to enter and take 10 to 15 minutes each. End by descending the slope to Motomachi shopping street for lunch.",
        },
        {
          heading: "Best Timing and Season",
          body:
            "Weekday mornings are virtually empty. The mansions open at 9:30 am. The bluff is at its most atmospheric in the early morning light when the harbor views are clearest.\n\nSpring (April) brings cherry blossoms along the bluff streets. The annual Yamate Western Mansion Festival in late December features Christmas decorations in all seven mansions. Autumn is mild and the tree-lined streets show gentle color. Summer can be hot but the bluff catches sea breezes.",
        },
        {
          heading: "Practical Tips",
          body:
            "All seven mansions are free. No reservations needed. The walk is hilly — comfortable shoes recommended. The bluff has few restaurants, so plan to eat in Motomachi (at the bottom of the hill) or Chinatown (a 5-minute walk from Motomachi).\n\nEnglish signage is good throughout the district — Yokohama has a long history of international presence. Free walking maps are available at Motomachi-Chukagai Station's tourist information window.",
        },
      ],
      [
        { q: "How long does this walk take?", a: "90 minutes for the bluff walk with exterior views. Half a day if you enter all seven mansions and add Motomachi shopping." },
        { q: "Are the mansions really free?", a: "Yes. All seven public mansions are free to enter with no reservation needed." },
        { q: "Can I combine this with Chinatown?", a: "Yes. Motomachi at the bottom of the bluff is adjacent to Yokohama Chinatown. The combined walk makes a full day." },
        { q: "How do I get here from Tokyo?", a: "Toyoko Line express from Shibuya to Motomachi-Chukagai, 35 minutes direct. Or JR from Tokyo Station to Ishikawacho, 40 minutes." },
        { q: "Is the walk stroller-friendly?", a: "The main bluff street is paved and mostly flat, but reaching the bluff from below involves stairs or a steep slope. An elevator at Motomachi-Chukagai Station goes directly to bluff level." },
      ],
    ),
    ja: ja(
      "横浜・山手の洋館と外国人居留地散策ガイド",
      "横浜山手の丘に残る7つの西洋館、外国人墓地、港の見える丘公園を巡る2kmの散歩ガイド。元町ショッピングストリートへの下り方も。",
      img("File:Yokohama Bluff No.18.jpg", 1600, 1067, "山手の洋館", "19世紀末の外国人居留地時代の洋館が山手の丘に残る。"),
      [
        img("File:Yokohama Foreign General Cemetery.jpg", 1600, 1067, "外国人墓地", "40か国4,000人以上が眠る横浜外国人墓地。"),
        img("File:Harbor View Park Yokohama.jpg", 1600, 1067, "港の見える丘公園", "ベイブリッジと港を一望する港の見える丘公園。"),
        img("File:Yokohama Ehrismann Residence.jpg", 1600, 1067, "エリスマン邸", "7つの無料公開洋館のひとつ。"),
        img("File:Yamate Italian Garden.jpg", 1600, 1067, "ブラフ18番館とイタリア庭園", "イタリア式庭園のあるブラフ18番館。"),
        img("File:Motomachi from Yamate.jpg", 1600, 1067, "山手から見た元町", "丘の上から元町ショッピングストリートを見下ろす。"),
      ],
      YOKOHAMA_X,
      [
        {
          heading: "このルートの特徴",
          body:
            "横浜の山手地区は、19世紀の開港期に外国人商人や外交官が邸宅を構えた丘の上の居留地です。7つの西洋館が保存・無料公開されており、並木道と港の眺望が特徴。外国人墓地には40か国4,000人以上が眠り、歴史の厚みを加えています。\n\nみなとみらいの商業的な海岸とは対照的に静かな散策が楽しめます。丘の上を約2km歩くルートで90分、洋館の内部見学と元町でのランチを含めると半日です。",
        },
        {
          heading: "アクセスと起点",
          body:
            "横浜駅からみなとみらい線で「元町・中華街駅」まで8分。6番出口(山手・アメリカ山公園出口)から丘の上へ直結。JR根岸線「石川町駅」から坂を上って10分でもアクセス可能。東京からは渋谷→元町・中華街が東横線直通で35分。",
        },
        {
          heading: "主要スポット",
          body:
            "港の見える丘公園からスタート。ベイブリッジと港のパノラマビュー。西へ丘沿いに歩き、イギリス館、山手資料館(無料)、外国人墓地(開放日は無料・寄付制)を通過。墓地は3〜12月の土日と一部平日に開門。\n\n並木の山手本通り沿いにエリスマン邸、ベーリック・ホール(最大の洋館、スパニッシュコロニアル様式)、ブラフ18番館(イタリア庭園付き)が並びます。7館すべて無料、各10〜15分。最後に坂を下って元町ショッピングストリートでランチ。",
        },
        {
          heading: "時間帯とタイミング",
          body:
            "平日午前はほぼ無人。洋館は9:30開館。朝の光で港の眺望が最もクリア。春(4月)は丘の通りに桜。12月下旬の山手西洋館クリスマス装飾イベントでは7館すべてにクリスマスデコレーションが施されます。秋は穏やかで並木が色づき、夏は暑いですが海風が通ります。",
        },
        {
          heading: "実用情報",
          body:
            "7館すべて無料、予約不要。丘の上は坂があるので歩きやすい靴を。丘上にはレストランが少ないので、元町(坂の下)か中華街(元町から5分)で食事を。\n\n英語案内は充実しています(横浜は開港以来の国際都市)。元町・中華街駅の観光案内窓口で無料の散策マップがもらえます。",
        },
      ],
      [
        { q: "所要時間は?", a: "丘の上を歩くだけで90分。7館内部見学+元町ショッピングで半日。" },
        { q: "洋館は本当に無料ですか?", a: "はい。7館すべて無料、予約不要です。" },
        { q: "中華街と組み合わせられますか?", a: "はい。坂の下の元町は中華街に隣接しており、セットで1日コースになります。" },
        { q: "東京からのアクセスは?", a: "渋谷から東横線直通で元町・中華街駅まで35分。JRなら東京駅→石川町40分。" },
        { q: "ベビーカーで歩けますか?", a: "丘の上のメイン通りは舗装されほぼ平坦ですが、下からの上りは階段か急坂。元町・中華街駅にエレベーターで丘の上に直結する出口があります。" },
      ],
    ),
  },
};

export const JAPAN_EXPANSION_GUIDE_SLUGS = Object.keys(JAPAN_EXPANSION_GUIDE_CONTENT);
