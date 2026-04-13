import type { GuideLocale } from "./extraGuides";
import { MINOR_TRAVEL_GUIDE_CONTENT } from "./minorTravelGuideContent";
import { HUB_GUIDE_RELATED } from "./minorTravelGuideContent.hubs";

export interface GuideMediaImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  creditLabel?: string;
  creditUrl?: string;
}

export interface GuideXEmbed {
  url: string;
  label?: string;
}

export interface GuideArticleContent {
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
  datePublished?: string;
  dateModified?: string;
}

type PriorityGuideMap = Record<string, Partial<Record<GuideLocale, GuideArticleContent>>>;

const TOKYO_X_EN: GuideXEmbed[] = [
  { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO: an older-Tokyo walking reference" },
  { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a quieter Tokyo morning reference" },
];

const TOKYO_X_JA: GuideXEmbed[] = [
  { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO公式: 古い東京の散歩参考" },
  { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 静かな東京の朝の参考" },
];

function minorCta(locale: GuideLocale) {
  return locale === "ja"
    ? { ctaTitle: "東京旅行の準備をまとめて確認する", ctaButton: "旅の準備を見る", breadcrumbGuide: "ガイド", breadcrumbHome: "ホーム" }
    : { ctaTitle: "See the essentials for Tokyo trip prep", ctaButton: "View travel prep", breadcrumbGuide: "Guides", breadcrumbHome: "Home" };
}

export const PRIORITY_GUIDE_RELATED: Record<string, string[]> = {
  "quiet-tokyo-neighborhoods": ["yanaka-nezu-sendagi-walk", "kiyosumi-shirakawa-walk", "kuramae-walk", "tokyo-tram-line-stops", "rainy-day-tokyo-neighborhoods"],
  "yanaka-nezu-sendagi-walk": ["quiet-tokyo-neighborhoods", "ueno-to-yanaka-walk", "nezu-sendagi-morning-walk", "japan-esim"],
  "kiyosumi-shirakawa-walk": ["quiet-tokyo-neighborhoods", "monzen-nakacho-fukagawa-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "kuramae-walk": ["quiet-tokyo-neighborhoods", "asakusa-kuramae-sumida-walk", "kiyosumi-shirakawa-walk", "japan-esim"],
  "tokyo-tram-line-stops": ["quiet-tokyo-neighborhoods", "oji-asukayama-tram-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "rainy-day-tokyo-neighborhoods": ["quiet-tokyo-neighborhoods", "kiyosumi-shirakawa-walk", "kuramae-walk", "japan-esim"],
  "ueno-to-yanaka-walk": ["yanaka-nezu-sendagi-walk", "nezu-sendagi-morning-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "nezu-sendagi-morning-walk": ["yanaka-nezu-sendagi-walk", "ueno-to-yanaka-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "monzen-nakacho-fukagawa-walk": ["kiyosumi-shirakawa-walk", "quiet-tokyo-neighborhoods", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "asakusa-kuramae-sumida-walk": ["kuramae-walk", "quiet-tokyo-neighborhoods", "tokyo-tram-line-stops", "japan-esim"],
  "oji-asukayama-tram-walk": ["tokyo-tram-line-stops", "quiet-tokyo-neighborhoods", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "nishi-nippori-yanaka-walk": ["ueno-to-yanaka-walk", "yanaka-nezu-sendagi-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "sendagi-yomise-dori-walk": ["nezu-sendagi-morning-walk", "rainy-day-tokyo-neighborhoods", "yanaka-nezu-sendagi-walk", "japan-esim"],
  "morishita-kiyosumi-walk": ["kiyosumi-shirakawa-walk", "monzen-nakacho-fukagawa-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "ryogoku-kuramae-walk": ["asakusa-kuramae-sumida-walk", "kuramae-walk", "quiet-tokyo-neighborhoods", "japan-esim"],
  "machiya-arakawa-tram-walk": ["oji-asukayama-tram-walk", "tokyo-tram-line-stops", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "kichijoji-inokashira-park-morning": ["quiet-tokyo-neighborhoods", "kiyosumi-shirakawa-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "kagurazaka-backstreets-walk": ["quiet-tokyo-neighborhoods", "yanaka-nezu-sendagi-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "jimbocho-kanda-booktown-walk": ["quiet-tokyo-neighborhoods", "kuramae-walk", "travel-apps-esim", "japan-esim"],
  "nakameguro-daikanyama-side-streets": ["quiet-tokyo-neighborhoods", "kuramae-walk", "rainy-day-tokyo-neighborhoods", "japan-esim"],
  "shibamata-retro-day-trip": ["quiet-tokyo-neighborhoods", "tokyo-tram-line-stops", "ueno-to-yanaka-walk", "japan-esim"],
};

// Merge hub guide related links
Object.assign(PRIORITY_GUIDE_RELATED, HUB_GUIDE_RELATED);

// Add hub backlinks to child articles
for (const [hubSlug, children] of Object.entries(HUB_GUIDE_RELATED)) {
  for (const childSlug of children) {
    if (!PRIORITY_GUIDE_RELATED[childSlug]) {
      PRIORITY_GUIDE_RELATED[childSlug] = [hubSlug];
    } else if (!PRIORITY_GUIDE_RELATED[childSlug].includes(hubSlug)) {
      PRIORITY_GUIDE_RELATED[childSlug].unshift(hubSlug);
    }
  }
}

const PRIORITY_GUIDE_CONTENT_BASE: PriorityGuideMap = {

  "quiet-tokyo-neighborhoods": {
    ja: {
      title: "静かな東京の街歩きガイド 2026",
      description: "大通りの定番観光ではなく、落ち着いた路地、小さな個人店、喫茶や散歩を楽しみたい人向けの東京街歩きガイドです。",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "谷中の落ち着いた通り沿いに並ぶ個人店とカフェ", width: 1280, height: 853, caption: "静かな東京を探すなら、まずこうした低い街並みから入ると歩きやすいです。", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
      gallery: [{ src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "清澄庭園の池と緑が見える静かな景色", width: 1280, height: 960, caption: "庭園や水辺の余白がある街は、東京でも歩く速度を落としやすいです。", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" }],
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "公式埋め込みを、静かな東京散歩の気分づくりの参考として置いています。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "静かな東京は急がなくていい", body: "静かな東京の魅力は、有名観光地の代替ではなく、歩く速度を落とせることです。谷中、清澄白河、蔵前のようなエリアでは、小さな店、路地、庭園、水辺が近い距離でつながります。" },
        { heading: "2エリアまでにすると満足度が上がる", body: "午前に1エリア、昼前後にもう1エリアくらいまでにすると、店にも路地にも余白が残ります。" },
        { heading: "少ない準備で十分成立する", body: "駅、最初の休憩先、最後に寄りたい場所を1つずつ決めておけば十分です。" },
      ],
      faq: [
        { q: "初めてならどこが歩きやすいですか？", a: "谷中、清澄白河、蔵前が始めやすいです。" },
        { q: "雨の日でも向いていますか？", a: "はい。カフェや商店街のあるエリアを軸にすると回りやすいです。" },
        { q: "1日で何エリアくらいが適切ですか？", a: "2エリアくらいがちょうどよく、3エリアは上限です。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Quiet Tokyo Neighborhoods Guide 2026",
      description: "A slower Tokyo guide for travelers who want calm streets, small shops, coffee stops, and walkable neighborhoods beyond the busiest districts.",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A calm Yanaka street with small cafes and low-rise storefronts in Tokyo", width: 1280, height: 853, caption: "Lower-rise streets and smaller shops are often what travelers remember most from quieter Tokyo.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
      gallery: [{ src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "A peaceful pond and greenery at Kiyosumi Garden in Tokyo", width: 1280, height: 960, caption: "Garden and waterside pauses help quieter Tokyo routes feel sustainable over a half day.", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" }],
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds are mood references for a slower, quieter Tokyo walking day.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "Quiet Tokyo is about pace", body: "The appeal of quieter Tokyo neighborhoods is that the city becomes easier to absorb: calmer streets, older lanes, and enough breathing room to make walking itself the point." },
        { heading: "Two neighborhoods are usually enough", body: "One main area and one lighter extension is usually enough for a strong quiet-Tokyo day." },
        { heading: "Minimal prep works best", body: "Save one station, one break point, and one or two anchors. These routes improve when lightly planned." },
      ],
      faq: [
        { q: "Which areas are easiest for a first quiet Tokyo walk?", a: "Yanaka, Kiyosumi-Shirakawa, and Kuramae are all friendly starting points." },
        { q: "Can I still do this on a rainy day?", a: "Yes, especially if you lean into cafe and shopping-street pauses." },
        { q: "How many neighborhoods should I try in one day?", a: "Two is usually ideal, and three is the upper limit." },
      ],
      ...minorCta("en"),
    },
  },
  "yanaka-nezu-sendagi-walk": {
    ja: {
      title: "谷中・根津・千駄木の半日街歩きガイド 2026",
      description: "谷中・根津・千駄木を半日でゆるく回る、静かな東京街歩きのための実用ガイドです。",
      heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "根津神社の鳥居と緑", width: 1280, height: 853, caption: "谷根千は、寺町と路地の切り替わりが半日でちょうどよく収まるエリアです。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
      gallery: [{ src: "/guide/yanaka-nezu-sendagi-walk/yanaka-ginza.jpg", alt: "谷中銀座の商店街", width: 1200, height: 900, caption: "谷中銀座は途中の変化として入れると歩きやすいです。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_2010.JPG" }],
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "谷根千らしい歴史散歩の参考として公式埋め込みを置いています。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "古い東京を無理なく歩ける", body: "寺社、商店街、路地、小さな店が連続しやすく、外国人旅行者でも歩行のリズムを作りやすいです。" },
        { heading: "全部を見ようとしない", body: "行き先を増やしすぎると良さが薄れるので、気になる区間を2〜3本つなぐくらいがちょうどよいです。" },
        { heading: "朝から昼前後が扱いやすい", body: "朝は静けさが出やすく、昼前後は店も見やすくなります。" },
      ],
      faq: [
        { q: "初回でも迷いませんか？", a: "駅と最初の休憩先だけ決めておけば十分歩きやすいです。" },
        { q: "谷中銀座は必須ですか？", a: "必須ではありません。路地中心でも十分満足しやすいです。" },
        { q: "雨の日でも向いていますか？", a: "軽い雨なら問題ありません。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Yanaka, Nezu, and Sendagi Half-Day Walk 2026",
      description: "A slower half-day Tokyo route through Yanaka, Nezu, and Sendagi for travelers who want old-town streets, shrine stops, cafes, and a calmer pace.",
      heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "Nezu Shrine torii and greenery in Tokyo", width: 1280, height: 853, caption: "Shrine atmosphere and side-street walking stay close together here.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
      gallery: [{ src: "/guide/yanaka-nezu-sendagi-walk/yanaka-ginza.jpg", alt: "Yanaka Ginza shopping street in Tokyo", width: 1200, height: 900, caption: "Yanaka Ginza works as one stop within the route rather than the only goal.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_2010.JPG" }],
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds support the older-Tokyo atmosphere that makes this route work.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "An easy old-Tokyo half day", body: "This is one of the easiest ways to build a calmer half day with old-town texture, shrine atmosphere, and practical small-street walking." },
        { heading: "Do less than you think", body: "A few lanes, one shrine stop, and one or two small breaks are enough." },
        { heading: "Morning through lunch is strongest", body: "The area usually feels best when you enter it earlier rather than later." },
      ],
      faq: [
        { q: "Is this realistic for first-time visitors?", a: "Yes. It is niche, but still easy to use with minimal prep." },
        { q: "Do I need Yanaka Ginza?", a: "No. It helps as one stop, but the route still works without making it central." },
        { q: "Can I do it in light rain?", a: "Yes, though the route should stay a little shorter." },
      ],
      ...minorCta("en"),
    },
  },
  "kiyosumi-shirakawa-walk": {
    ja: {
      title: "清澄白河のコーヒー街歩き 2026",
      description: "清澄白河で本気のコーヒー時間を半日にまとめるための街歩きガイドです。ロースタリー、カウンター、二杯目の寄り方までコーヒー軸で整理します。",
      heroImage: { src: "/guide/kiyosumi-shirakawa-walk/coffee-walk-hero.jpg", alt: "清澄白河のブルーボトル外観とコーヒー街歩きの入口", width: 1600, height: 1067, caption: "このページは最初から最後までコーヒー街歩きとして読むため、ヒーローもロースタリー外観で固定しています。", creditLabel: "Derived from photo: Wikimedia Commons contributors", creditUrl: "https://commons.wikimedia.org/wiki/File:Bluebottlejapan-opening-outsidebuilding-feb8-2015.jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "コーヒー関連の投稿だけを置き、庭園や汎用的な東京散歩のリンクは外しています。",
      xEmbeds: [
        { url: "https://x.com/bluebottleroast/status/1889358892628623478", label: "Blue Bottle Coffee: カフェ体験と季節のラテが見える投稿" },
        { url: "https://x.com/JapanArchitects/status/1827217467296366881", label: "japan-architects: ブルーボトルの建築と店内体験の参考" },
        { url: "https://x.com/fullress/status/1996748084966314157", label: "Fullress: ブルーボトルの限定ドリンクと物販の参考" },
      ],
      sections: [
        { heading: "庭園ではなくコーヒーで読む", body: "このページは清澄庭園へ逃がさず、清澄白河をコーヒー街として読み切るためのものです。起点はフラッグシップのロースタリーで、カウンター体験と二杯目までを同じ街区でつなぎます。" },
        { heading: "フラッグシップを一杯目の軸にする", body: "平野一丁目のブルーボトルを最初の軸に置くと、外観、カウンター、C Bar的な学び、持ち歩く一杯まで全部が一つの流れとしてまとまります。" },
        { heading: "二杯目は同じ街区で拾う", body: "iki ESPRESSO や Allpress Espresso Tokyo Roastery & Cafe のように、清澄白河の低い街区から離れない二杯目にすると、タイトルどおりのコーヒー街歩きとして完成します。" },
      ],
      faq: [
        { q: "コーヒーに詳しくなくても楽しめますか？", a: "はい。ただしこのページはコーヒーを主役にしているので、少なくとも一杯を丁寧に飲む気持ちで入る方が楽しみやすいです。" },
        { q: "1人旅でも向いていますか？", a: "向いています。" },
        { q: "雨の日でも歩けますか？", a: "軽い雨なら問題ありません。庭園へ逃げず、フラッグシップと二杯目だけに絞るとまとまりやすいです。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Kiyosumi-Shirakawa Coffee Walk 2026",
      description: "A coffee-first Kiyosumi-Shirakawa guide built around the flagship roastery, coffee counters, and the second-cup decisions that keep the half day honest.",
      heroImage: { src: "/guide/kiyosumi-shirakawa-walk/coffee-walk-hero.jpg", alt: "Blue Bottle exterior at the start of a Kiyosumi-Shirakawa coffee walk", width: 1600, height: 1067, caption: "The hero is fixed on the roastery exterior because the page is meant to read as a coffee walk from the first screen.", creditLabel: "Derived from photo: Wikimedia Commons contributors", creditUrl: "https://commons.wikimedia.org/wiki/File:Bluebottlejapan-opening-outsidebuilding-feb8-2015.jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These posts are coffee-specific now. The page no longer falls back to garden or generic Tokyo-walk references.",
      xEmbeds: [
        { url: "https://x.com/bluebottleroast/status/1889358892628623478", label: "Blue Bottle Coffee: a recent cafe-and-latte reference" },
        { url: "https://x.com/JapanArchitects/status/1827217467296366881", label: "japan-architects: a Blue Bottle architecture and cafe-space reference" },
        { url: "https://x.com/fullress/status/1996748084966314157", label: "Fullress: a limited Blue Bottle drink and merchandise reference" },
      ],
      sections: [
        { heading: "Read it as coffee, not as a compromise route", body: "This page is not trying to balance coffee against a garden detour. It is meant to treat Kiyosumi-Shirakawa as a serious coffee half day, with the flagship roastery acting as the first anchor and the rest of the walk staying loyal to that coffee logic." },
        { heading: "Use the flagship as the first cup", body: "Starting at Blue Bottle's flagship makes the district make sense: exterior, queue, counter, cup-in-hand, then a second coffee decision on the same grid instead of a sightseeing jump cut." },
        { heading: "Keep the second stop on the same grid", body: "A second cup works best when it stays inside the Kiyosumi-Shirakawa coffee streets, whether that is iki ESPRESSO, Allpress Espresso Tokyo Roastery & Cafe, or another nearby counter that still feels part of the same walk." },
      ],
      faq: [
        { q: "Do I need to be very into coffee?", a: "No, but the route is intentionally coffee-first. It works best if you actually want to spend time at one serious counter, not just pass through for a photo." },
        { q: "Is it good for solo travelers?", a: "Yes." },
        { q: "Does it still work in light rain?", a: "Yes. In rain, keep the day anchored to the flagship and one second coffee stop instead of diluting it with a non-coffee detour." },
      ],
      ...minorCta("en"),
    },
  },

  "kuramae-walk": {
    ja: {
      title: "蔵前の文具と器とベーカリー街歩き 2026",
      description: "蔵前で文具、器、ベーカリー、小さな店を静かに回るための街歩きガイドです。",
      heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "蔵前神社の鳥居と桜", width: 1600, height: 1067, caption: "蔵前は名所よりも、小さな店の連なりで歩きやすさが決まります。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "静かな東京歩きの気分に近い公式埋め込みを置いています。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "買うより眺めながら歩く", body: "全部を回るより通りごとの密度を楽しむ方が半日としてきれいにまとまります。" },
        { heading: "浅草の後半にも単独半日にも使いやすい", body: "定番エリアの後に温度を下げたい時にも、最初から静かな半日を作りたい時にも使いやすいです。" },
        { heading: "2〜3件の店だけ保存する", body: "喫茶か軽食の休憩を1回入れるとちょうどよいです。" },
      ],
      faq: [
        { q: "買い物をしなくても楽しめますか？", a: "はい。小さな店や通りの雰囲気だけでも十分成立します。" },
        { q: "何時間くらいが適切ですか？", a: "3時間前後あればかなり歩きやすいです。" },
        { q: "雨の日にも向いていますか？", a: "軽い雨なら向いています。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Kuramae Walk for Stationery, Ceramics, and Bakeries 2026",
      description: "A low-key Kuramae guide for travelers who want stationery shops, ceramics, bakeries, and a calmer shopping walk near Asakusa.",
      heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "Kuramae Shrine in Tokyo", width: 1600, height: 1067, caption: "Kuramae works when you let smaller streets and modest stops control the pace.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds help frame the calmer Tokyo pacing that suits Kuramae.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "A shopping-adjacent walk", body: "Kuramae is strongest when it becomes a slower walk with stationery, ceramics, bakeries, and one or two pauses rather than a store-completion mission." },
        { heading: "Useful after busier districts", body: "It works well after Asakusa or as its own calmer half day, because the neighborhood resets the tempo quickly." },
        { heading: "Save only a few anchors", body: "Two or three saved shops and one break are enough." },
      ],
      faq: [
        { q: "Can I enjoy Kuramae without buying much?", a: "Yes. The small-street feel is a big part of the value." },
        { q: "How much time should I allow?", a: "Around three hours is usually enough." },
        { q: "Does it work in light rain?", a: "Yes, especially with one extra indoor pause." },
      ],
      ...minorCta("en"),
    },
  },
  "tokyo-tram-line-stops": {
    ja: {
      title: "都電沿線の静かな東京街歩き 2026",
      description: "都電沿線の静かな街をつないで歩きたい人向けの、少しローカル寄りの東京散歩ガイドです。",
      heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "飛鳥山付近を走る都電荒川線", width: 1800, height: 1200, caption: "都電沿線の魅力は、停留場ごとの景色より、街のスケールが小さく見えることにあります。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "静かな東京の朝歩きの雰囲気に近い公式埋め込みです。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "都電沿線は東京の速度を落としやすい", body: "停留場を集めるより、1〜2区間の雰囲気を使う方がうまくいきます。" },
        { heading: "飛鳥山や王子のような休憩点を入れる", body: "公園や広がりのある場所を1つ挟むと、半日の変化がはっきりして歩きやすくなります。" },
        { heading: "少しローカルな空気を入れたい人向け", body: "定番観光の密度ではなく、少しローカルな空気を入れたい人に向いています。" },
      ],
      faq: [
        { q: "鉄道好きでなくても楽しめますか？", a: "はい。主役は街歩きで、都電は雰囲気づくりの一部です。" },
        { q: "何駅も回る必要がありますか？", a: "必要ありません。1〜2区間で十分です。" },
        { q: "初回旅行でも向いていますか？", a: "はい。定番の合間に入れるとバランスが取りやすいです。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Quiet Tokyo Tram-Line Stops Guide 2026",
      description: "A guide to calmer Tokyo neighborhoods along the tram line, useful for travelers who want a more local-feeling city walk.",
      heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "Toden tram near Asukayama in Tokyo", width: 1800, height: 1200, caption: "The tram line matters because it keeps the city feeling closer to street level and easier to absorb on foot.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds support the quieter Tokyo pacing that fits tram-line walking.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "The tram line slows the city down", body: "A tram-adjacent route feels different from a subway-only Tokyo day because the city stays closer to street level and easier to read while walking." },
        { heading: "You do not need many stops", body: "One or two tram moments plus one park or pause is usually enough for a strong half day." },
        { heading: "Best for a calmer local-feeling route", body: "This is useful when you want Tokyo to feel less compressed and more neighborhood-based." },
      ],
      faq: [
        { q: "Do I need to be into trains for this to work?", a: "No. The walk matters more than the rail element." },
        { q: "Should I try many stops?", a: "Usually not. Fewer stops create a better half day." },
        { q: "Is it good for a first Tokyo trip?", a: "Yes, especially as a quieter change of pace." },
      ],
      ...minorCta("en"),
    },
  },
  "rainy-day-tokyo-neighborhoods": {
    ja: {
      title: "雨の日の東京街歩きガイド 2026",
      description: "雨の日でも歩きやすい静かな街、喫茶や商店街を組み合わせた東京街歩きガイドです。",
      heroImage: { src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg", alt: "文京区のよみせ通り商店街", width: 1944, height: 2592, caption: "雨の日の東京は、少し歩いてすぐ休める街の方が満足しやすいです。", creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "静かな東京の朝を参考にできる公式埋め込みです。",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 雨の日の静かな東京歩きの参考" }],
      sections: [
        { heading: "完全室内より少し歩ける街", body: "東京の雨の日は、完全に屋内へ逃げるより、少し歩いて少し休める街を選ぶ方が記憶に残りやすいです。" },
        { heading: "予定は普段の半分でよい", body: "1つの街をしっかり、もう1つは軽くくらいがちょうどよいです。" },
        { heading: "商店街と喫茶がある街は強い", body: "谷根千、蔵前、清澄白河のように、避難しやすい休憩点がある街が向いています。" },
      ],
      faq: [
        { q: "どのエリアが回りやすいですか？", a: "清澄白河、蔵前、谷根千まわりが扱いやすいです。" },
        { q: "美術館中心にした方がよいですか？", a: "短い街歩きを入れる方が東京らしさは残ります。" },
        { q: "何エリアくらいが適切ですか？", a: "半日なら1〜2エリアで十分です。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Rainy-Day Tokyo Neighborhoods Guide 2026",
      description: "Where to walk in Tokyo when the weather turns wet: calmer neighborhoods, covered streets, cafe-heavy routes, and half-day plans that still feel worth leaving the hotel for.",
      heroImage: { src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg", alt: "Yomise-dori shopping street in Tokyo", width: 1944, height: 2592, caption: "Rainy Tokyo is often better in neighborhoods where you can walk a little, pause a little, and keep moving.", creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "This official embed is a mood reference for quieter rainy-day Tokyo walking.",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a useful quiet-Tokyo morning reference" }],
      sections: [
        { heading: "Rainy Tokyo works best when it is not fully indoors", body: "A rainy day in Tokyo is often better when you use neighborhoods with short outdoor links and easy indoor pauses instead of forcing an all-indoor plan." },
        { heading: "Cut your itinerary in half", body: "Rain magnifies transfer fatigue, so one main neighborhood and one lighter extension is usually enough." },
        { heading: "Choose cafe and shopping-street balance", body: "Neighborhoods with shop cover, coffee stops, and shorter walking gaps usually work best." },
      ],
      faq: [
        { q: "Which neighborhoods are easiest in light rain?", a: "Kiyosumi-Shirakawa, Kuramae, and parts of Yanaka-Sendagi are all strong options." },
        { q: "Should I switch to museums only?", a: "Not necessarily. A short neighborhood walk often creates a better Tokyo memory." },
        { q: "How many areas should I try?", a: "Usually one main neighborhood and one light extension at most." },
      ],
      ...minorCta("en"),
    },
  },
  "ueno-to-yanaka-walk": {
    ja: {
      title: "上野から谷中へ歩く半日ガイド 2026",
      description: "にぎやかな上野から静かな谷中へ抜ける、外国人旅行者向けの実用的な半日街歩きガイドです。",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "谷中の落ち着いた通り沿いに並ぶ個人店とカフェ", width: 1280, height: 853, caption: "上野から谷中へ抜けると、東京の速度が自然に落ちてきます。", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
      gallery: [{ src: "/guide/yanaka-nezu-sendagi-walk/yanaka-ginza.jpg", alt: "谷中銀座の商店街", width: 1200, height: 900, caption: "谷中銀座は通り抜けの変化として入れると歩きやすいです。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_2010.JPG" }],
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "上野の朝と、歴史層のある東京散歩の参考として公式埋め込みを置いています。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "上野だけで終わらせない半日", body: "上野は便利ですが、そこだけで半日を終えると記憶が少し忙しいまま残りやすいです。谷中へ抜けると、東京の違う顔を自然に入れられます。" },
        { heading: "上野は短く、谷中は少し長く", body: "上野は1時間前後に抑え、谷中側に余白を残すと歩きやすいです。" },
        { heading: "準備は少なくてよい", body: "最初の出口、休憩先、最後に見たい通りだけ決めておけば十分です。" },
      ],
      faq: [
        { q: "徒歩でも現実的ですか？", a: "はい。半日散歩として十分成立します。" },
        { q: "博物館と組み合わせられますか？", a: "はい。朝に上野側を入れてから谷中へ移る流れが相性良いです。" },
        { q: "谷中銀座は必須ですか？", a: "必須ではありません。路地中心でも十分成立します。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Ueno to Yanaka Walk Guide 2026",
      description: "A practical half-day route from busy Ueno into calmer Yanaka for travelers who want museums, side streets, and an easier old-Tokyo finish.",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A calm Yanaka street with small cafes and low-rise storefronts in Tokyo", width: 1280, height: 853, caption: "This route works because the city visibly slows down once you leave Ueno behind.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
      gallery: [{ src: "/guide/yanaka-nezu-sendagi-walk/yanaka-ginza.jpg", alt: "Yanaka Ginza shopping street in Tokyo", width: 1200, height: 900, caption: "Yanaka Ginza is useful as one waypoint rather than the whole purpose of the route.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_2010.JPG" }],
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds support the mood of an early Ueno start and a quieter Yanaka finish.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "A better finish than staying in Ueno all day", body: "Ueno is useful, but spending the whole half day there can keep Tokyo feeling crowded and fast. Walking into Yanaka resets the pace without needing a complicated transfer." },
        { heading: "Keep Ueno short", body: "A shorter Ueno opening and a longer Yanaka second half usually produce a better memory." },
        { heading: "Minimal prep is enough", body: "Save one break point and one or two Yanaka anchors. That is usually all you need." },
      ],
      faq: [
        { q: "Is it realistic in one half day?", a: "Yes, as long as you do not overload the Ueno portion." },
        { q: "Should I do museums first?", a: "Usually yes. The quieter part of the route works better afterward." },
        { q: "Do I need Yanaka Ginza?", a: "No. The route still works without making it central." },
      ],
      ...minorCta("en"),
    },
  },
  "nezu-sendagi-morning-walk": {
    ja: {
      title: "根津と千駄木の朝散歩ガイド 2026",
      description: "根津神社、千駄木の路地、昔ながらの商店街をつなぐ、朝向きの静かな東京街歩きガイドです。",
      heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "根津神社の鳥居と緑", width: 1280, height: 853, caption: "根津と千駄木は、朝の空気の良さで記憶に残りやすいルートです。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
      gallery: [{ src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg", alt: "文京区のよみせ通り商店街", width: 1944, height: 2592, caption: "千駄木側は商店街と路地の組み合わせで歩きやすくなります。", creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG" }],
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "古い東京の気分に近い公式埋め込みを置いています。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "混む前の東京に入りたい人向け", body: "根津と千駄木は、朝の静かな東京を作りやすいエリアです。神社、路地、商店街を短くつなぐだけで半日が成立します。" },
        { heading: "根津神社を起点にするとわかりやすい", body: "最初に神社の空気を入れてから千駄木側へ移ると、街全体の流れがつかみやすいです。" },
        { heading: "朝の前半がもっとも相性がよい", body: "午前の前半に歩き始めるとこのルートの良さが出やすいです。" },
      ],
      faq: [
        { q: "どれくらい早く行けばよいですか？", a: "午前の前半に歩き始めれば十分です。" },
        { q: "谷中まで広げるべきですか？", a: "広げられますが、このルートだけでも十分成立します。" },
        { q: "軽い雨でも向いていますか？", a: "はい。距離を少し短くすると扱いやすいです。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Nezu and Sendagi Morning Walk Guide 2026",
      description: "A lower-key morning route through Nezu Shrine, Sendagi side streets, and older shopping streets before central Tokyo gets busy.",
      heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "Nezu Shrine torii and greenery in Tokyo", width: 1280, height: 853, caption: "Nezu and Sendagi work best as a calm morning sequence rather than a crowded midday stop.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
      gallery: [{ src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg", alt: "Yomise-dori shopping street in Tokyo", width: 1944, height: 2592, caption: "Older shopping-street texture is part of what makes the Sendagi side feel distinctive.", creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG" }],
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds support the older, calmer Tokyo mood that fits the route.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "A route for Tokyo before it gets loud", body: "Nezu and Sendagi are useful when you want a quiet morning route with shrine atmosphere, older lanes, and low-pressure neighborhood texture." },
        { heading: "Treat the shrine as the beginning", body: "The route becomes more interesting once you keep moving into the surrounding neighborhood." },
        { heading: "Morning is the point", body: "The walk is strongest when the quiet arrives before the shop activity fully takes over." },
      ],
      faq: [
        { q: "How early should I start?", a: "The first half of the morning is the strongest window." },
        { q: "Should I extend into Yanaka too?", a: "You can, but you do not need to." },
        { q: "Does it work in light rain?", a: "Yes, especially with a shorter route." },
      ],
      ...minorCta("en"),
    },
  },
  "monzen-nakacho-fukagawa-walk": {
    ja: {
      title: "門前仲町と深川の半日街歩き 2026",
      description: "寺町の参道、水辺、下町の落ち着いた通りをつなぐ、門前仲町と深川の実用的な半日散歩ガイドです。",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "清澄庭園の池と緑が見える静かな景色", width: 1280, height: 960, caption: "東東京の魅力は、参道と水辺が近い距離で切り替わることにあります。", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "歴史層のある東京散歩の参考として公式埋め込みを置いています。",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO公式: 江戸の余韻を感じる散歩の参考" }],
      sections: [
        { heading: "東東京で静かな半日を作りやすい", body: "門前仲町と深川は、参道、水辺、下町の通りが近い距離でつながり、派手すぎないけれど記憶に残る半日を作りやすいです。" },
        { heading: "門前仲町を起点にするとまとまりやすい", body: "最初に参道の雰囲気を入れてから、深川側へ少しずつ抜けると、街全体の変化が見えやすくなります。" },
        { heading: "休憩点を先に決めると歩きやすい", body: "橋や水辺で意外と距離が伸びるので、どこで一度座るかを先に決めておくと半日が整います。" },
      ],
      faq: [
        { q: "清澄白河と一緒に回した方がよいですか？", a: "時間があれば可能ですが、このルートだけでも十分半日になります。" },
        { q: "どんな人に向いていますか？", a: "寺町と水辺の落ち着いた東東京を見たい人に向いています。" },
        { q: "雨の日でも歩けますか？", a: "軽い雨なら問題ありませんが、水辺区間は短めが安全です。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Monzen-Nakacho and Fukagawa Walk 2026",
      description: "A practical slow-Tokyo route for temple approaches, river edges, and quieter east-side streets around Monzen-Nakacho and Fukagawa.",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "A peaceful pond and greenery at Kiyosumi Garden in Tokyo", width: 1280, height: 960, caption: "This side of Tokyo works when temple atmosphere, water, and slower local streets stay in the same half day.", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "This official embed supports the older-Tokyo mood of the route.",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO: an Edo-layer reference that fits this side of Tokyo" }],
      sections: [
        { heading: "A calmer east-side half day", body: "Temple approaches, water, and quieter streets all stay close enough here to build a coherent half day without crowd-heavy sightseeing pressure." },
        { heading: "Start with the temple-town feel", body: "Beginning around Monzen-Nakacho makes the rest of the route easier to appreciate." },
        { heading: "Plan your break before your details", body: "A single deliberate break point matters more here than a long saved list of stops." },
      ],
      faq: [
        { q: "Should I combine it with Kiyosumi-Shirakawa?", a: "You can, but you do not need to. This route is enough for a half day." },
        { q: "Who is it best for?", a: "Travelers who want older east-side Tokyo and a quieter walking pace." },
        { q: "Does it still work in light rain?", a: "Yes, though shorter waterside segments are better." },
      ],
      ...minorCta("en"),
    },
  },
  "asakusa-kuramae-sumida-walk": {
    ja: {
      title: "浅草・蔵前・隅田川の街歩きガイド 2026",
      description: "浅草を起点にしながら、蔵前の裏通りと隅田川沿いへ抜ける少し静かな半日ルートです。",
      heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "蔵前神社の鳥居と桜", width: 1600, height: 1067, caption: "浅草から蔵前へ抜けると、同じ東東京でも歩く速度がかなり落ち着きます。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "浅草から少し静かな東京へ切り替える気分に近い公式埋め込みです。",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 静かな東京の朝の参考" }],
      sections: [
        { heading: "浅草を入口にすると使いやすい", body: "浅草の定番感を押さえつつ、蔵前と隅田川沿いへ抜けると、混雑の記憶だけで半日が終わりにくくなります。" },
        { heading: "蔵前で半日の温度を下げる", body: "小さな店や喫茶を2〜3件だけ軸にすると、浅草の後半としてちょうどよい静けさが作れます。" },
        { heading: "川沿いは短くても効く", body: "隅田川沿いを短く入れるだけで、街中の密度との対比が出て半日がきれいにまとまります。" },
      ],
      faq: [
        { q: "浅草だけよりこちらの方がよいですか？", a: "混雑が苦手ならこちらの方が満足しやすいことがあります。" },
        { q: "蔵前では何を目的にするとよいですか？", a: "気になるジャンルを1〜2個だけ決める方が歩きやすいです。" },
        { q: "何時間くらい必要ですか？", a: "3〜4時間で十分まとまります。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Asakusa, Kuramae, and Sumida River Walk 2026",
      description: "A calmer route that uses Asakusa as a starting point, then shifts into Kuramae backstreets and Sumida riverside walking.",
      heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "Kuramae Shrine in Tokyo", width: 1600, height: 1067, caption: "This route works when Asakusa opens the half day and Kuramae slows it back down.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "This official embed supports the calmer Tokyo pacing that suits the route.",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a useful quiet-Tokyo morning reference" }],
      sections: [
        { heading: "Use Asakusa as the front door, not the whole half day", body: "The route works because you touch a famous district, then leave before it dominates the entire memory of the outing." },
        { heading: "Kuramae resets the pace", body: "Smaller streets, cafes, and modest shops make it easier to turn the second half into a walk rather than a crowd-management exercise." },
        { heading: "The river gives the route breathing room", body: "Even a short Sumida riverside stretch helps the half day feel more balanced." },
      ],
      faq: [
        { q: "Is this better than spending the whole half day in Asakusa?", a: "If you dislike crowds, often yes." },
        { q: "Do I need to shop in Kuramae?", a: "No. The route still works for quieter walking and one cafe stop." },
        { q: "Can I do it in light rain?", a: "Yes, though the river portion should stay short." },
      ],
      ...minorCta("en"),
    },
  },
  "oji-asukayama-tram-walk": {
    ja: {
      title: "王子と飛鳥山の都電街歩きガイド 2026",
      description: "都電の景色、飛鳥山の休憩、北東京らしい落ち着いた空気を楽しむ半日街歩きガイドです。",
      heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "飛鳥山付近を走る都電荒川線", width: 1800, height: 1200, caption: "都電に乗ること自体より、都電が似合う街の速度で半日を過ごすのに向いています。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "北東京の静かな半日に近い気分の公式埋め込みです。",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 静かな東京の朝の参考" }],
      sections: [
        { heading: "都電そのものより街のスケールが魅力", body: "王子と飛鳥山では、電車と通りの距離が近いことで、東京の見え方が少しやわらかくなります。" },
        { heading: "王子を起点にするとまとまりやすい", body: "駅、公園、都電沿いを短くつなぐだけで、控えめですが記憶に残る半日になります。" },
        { heading: "午後にも使いやすい静かな半日", body: "定番観光の合間に入れて、1日の温度を下げるのに向いています。" },
      ],
      faq: [
        { q: "都電に長く乗る必要はありますか？", a: "いいえ。短く乗るか、見ながら歩くだけでも十分です。" },
        { q: "初めての東京でも向いていますか？", a: "はい。定番の合間に入れるとバランスが取りやすいです。" },
        { q: "桜の時期以外でも楽しめますか？", a: "はい。むしろ落ち着いて歩きやすい時期も多いです。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Oji and Asukayama Tram Walk Guide 2026",
      description: "A slower half-day around Oji and Asukayama for tram views, park pauses, and a more local north-Tokyo feel.",
      heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "Toden tram near Asukayama in Tokyo", width: 1800, height: 1200, caption: "The route is strongest when the tram shapes the neighborhood feel rather than becoming the only attraction.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "This official embed supports the quieter Tokyo pacing that suits Oji and Asukayama.",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a useful quiet-Tokyo reference" }],
      sections: [
        { heading: "A neighborhood-paced half day", body: "Oji and Asukayama are useful when you want Tokyo to slow down through park edges, tram views, and a more local street scale." },
        { heading: "You do not need many tram stops", body: "One or two tram moments plus a park pause are usually enough for a satisfying route." },
        { heading: "Good for a softer afternoon", body: "This route works well when you need a calmer counterweight to denser sightseeing elsewhere." },
      ],
      faq: [
        { q: "Do I need to ride the tram much?", a: "No. A short ride or mostly walking version still works." },
        { q: "Is it realistic for a first Tokyo trip?", a: "Yes, especially as a change of pace from more standard districts." },
        { q: "Is it only worth doing in cherry blossom season?", a: "No. Quieter periods are often easier to enjoy." },
      ],
      ...minorCta("en"),
    },
  },
  "nishi-nippori-yanaka-walk": {
    ja: {
      title: "西日暮里から谷中へ歩く半日ガイド 2026",
      description: "西日暮里の落ち着いた入口から谷中へ抜ける、外国人旅行者向けの実用的な半日街歩きガイドです。",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "谷中の落ち着いた通り沿いに並ぶ個人店とカフェ", width: 1280, height: 853, caption: "西日暮里から入ると、谷中側の静かな街並みに無理なく切り替えやすくなります。", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
      gallery: [{ src: "/guide/yanaka-nezu-sendagi-walk/yanaka-ginza.jpg", alt: "谷中銀座の商店街", width: 1200, height: 900, caption: "谷中銀座は終点というより、歩行のリズムを変える途中の区間として使うとちょうどよいです。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_2010.JPG" }],
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "静かな東京の朝と古い街並みの気配をつかみやすい、公式埋め込みを参考として置いています。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "上野より少し静かな入口が欲しい人に向いている", body: "西日暮里は大きな乗り換え駅ですが、上野ほど観光の圧が強くないため、谷中方面へ歩き出す入口として扱いやすいです。最初から街歩きの温度で入れるので、半日の組み立てが軽くなります。\n\n到着後すぐに混雑を抜けたい人や、午後の前半だけで東京の静かな側面を見たい人と相性が良いです。" },
        { heading: "谷中の主役は名所よりも通りの切り替わり", body: "このルートは大きな名所を順番に消化するより、住宅寄りの通り、小さな店、寺町の気配がどう連続するかを見る方が満足しやすいです。谷中銀座も入れられますが、そこだけを目的地にしない方が半日全体は穏やかになります。" },
        { heading: "午前遅めから昼過ぎまでが現実的", body: "早朝にこだわる必要はありませんが、昼をまたぐくらいの時間帯がちょうどよいです。街の店が少しずつ開き、でも夕方ほど人が増えにくいため、外国人旅行者でも真似しやすい半日になります。\n\n地図確認が増える日なら、日本向けeSIMの接続を安定させておくと立ち止まる回数を減らせます。" },
      ],
      faq: [
        { q: "上野から歩くルートとの違いは何ですか？", a: "こちらは最初から少し落ち着いた入口に寄せたい人向けで、混雑の切り替えが穏やかです。" },
        { q: "谷中銀座は必ず入れるべきですか？", a: "必須ではありません。路地中心でも十分に成立します。" },
        { q: "半日で足りますか？", a: "はい。休憩を1回入れても3〜4時間でまとまりやすいです。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Nishi-Nippori to Yanaka Walk Guide 2026",
      description: "A practical half-day route from low-key Nishi-Nippori into Yanaka for travelers who want calmer station access, side streets, and an easy old-Tokyo finish.",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A calm Yanaka street with small cafes and low-rise storefronts in Tokyo", width: 1280, height: 853, caption: "Starting from Nishi-Nippori makes it easier to reach Yanaka without the sharper pace shift that some travelers feel in Ueno.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
      gallery: [{ src: "/guide/yanaka-nezu-sendagi-walk/yanaka-ginza.jpg", alt: "Yanaka Ginza shopping street in Tokyo", width: 1200, height: 900, caption: "Yanaka Ginza works best as one texture change within the route, not the only reason to do it.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_2010.JPG" }],
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds are useful mood references for quieter Tokyo walking and the older-street atmosphere that fits a Yanaka finish.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "A softer way into old Tokyo", body: "Nishi-Nippori works well when you want station convenience without opening the half day inside a fully touristic tempo. That makes the shift into Yanaka feel more gradual and easier to enjoy on foot.\n\nFor travelers who want calm streets more than big-ticket attractions, that softer start is the main advantage." },
        { heading: "The route is about street texture, not checklists", body: "This walk works when you let the neighborhood change in small increments: ordinary side streets, temple-adjacent lanes, and one or two modest stops. If you turn it into a long list of saved pins, the route loses what makes it useful." },
        { heading: "Late morning into early afternoon is the sweet spot", body: "You do not need to begin especially early. Late morning through early afternoon is enough for shops to feel open while the route still stays lighter than busier Tokyo districts.\n\nIf you expect to rely on maps and train checks throughout the day, it helps to keep your Japan eSIM connection stable rather than leaning on patchy public Wi-Fi." },
      ],
      faq: [
        { q: "How is this different from the Ueno to Yanaka walk?", a: "This version starts quieter and feels less like a transition out of crowds." },
        { q: "Do I need to center the walk on Yanaka Ginza?", a: "No. The route is usually better when Yanaka Ginza is only one part of it." },
        { q: "Is this enough for a half day?", a: "Yes. It is very workable in three to four hours, including a break." },
      ],
      ...minorCta("en"),
    },
  },
  "sendagi-yomise-dori-walk": {
    ja: {
      title: "千駄木とよみせ通りの街歩きガイド 2026",
      description: "千駄木の路地とよみせ通り商店街をつなぐ、雨の日にも使いやすい東京散歩ガイドです。",
      heroImage: { src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg", alt: "文京区のよみせ通り商店街", width: 1944, height: 2592, caption: "長く歩きすぎず、少し歩いて少し休める商店街のあるルートは、東京ではかなり実用的です。", creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG" },
      gallery: [{ src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "根津神社の鳥居と緑", width: 1280, height: 853, caption: "根津側まで少し広げると、商店街だけで終わらない朝から昼の半日が作りやすくなります。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" }],
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "古い東京の歩き方や、静かな午前の空気をイメージしやすい公式埋め込みを置いています。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "雨でも無理なく歩ける東京ルートの一つ", body: "千駄木とよみせ通りの組み合わせは、晴れの日だけでなく軽い雨の日にも使いやすいです。屋根が続く区間や休憩に入りやすい商店街があるため、歩行の負荷を上げすぎずに半日を作れます。" },
        { heading: "商店街を主役にしすぎない方がまとまる", body: "よみせ通りは歩きやすい軸ですが、商店街だけで完結させるより、千駄木の路地や根津寄りの静かな通りを少し混ぜた方が記憶に残りやすいです。\n\n“買い物目的の通り”ではなく、“低圧で歩ける東京”として組むのがこのルートのコツです。" },
        { heading: "午前後半に始めると使いやすい", body: "朝早すぎると閉まっている店が多く、午後遅いと人が増えがちです。午前後半に入って、喫茶か軽食を1回はさむくらいが旅行中には扱いやすいです。\n\n移動と地図確認が多い日なら、日本向けeSIMとあわせて考えると全体が滑らかになります。" },
      ],
      faq: [
        { q: "大雨の日でも向いていますか？", a: "大雨なら無理に広げず、商店街中心に短く切る方が安全です。" },
        { q: "根津や谷中まで広げるべきですか？", a: "時間があれば可能ですが、このルート単体でも半日になります。" },
        { q: "買い物中心の街歩きですか？", a: "いいえ。雰囲気重視で、必要なら軽く買い物を挟む程度が向いています。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Sendagi and Yomise-dori Walk Guide 2026",
      description: "A rain-friendly or low-pressure Tokyo route through Sendagi backstreets and Yomise-dori for travelers who want older shopping streets without major crowds.",
      heroImage: { src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg", alt: "Yomise-dori shopping street in Tokyo", width: 1944, height: 2592, caption: "Neighborhood routes that let you walk a little, pause a little, and keep moving are often the most useful ones in Tokyo.", creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG" },
      gallery: [{ src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "Nezu Shrine torii and greenery in Tokyo", width: 1280, height: 853, caption: "Extending slightly toward Nezu helps the route feel like a rounded half day instead of only a shopping-street pass.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" }],
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds help frame the older-Tokyo atmosphere and the kind of quiet morning that suits this route.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "One of the easier rain-friendly neighborhood walks", body: "This route works well in light rain and also on days when you simply want a lower-pressure half day. Older shopping-street texture, side lanes, and easy pause points make it more forgiving than routes built around large attractions." },
        { heading: "Treat the shopping street as structure, not the whole point", body: "Yomise-dori gives the walk a practical spine, but the route becomes more distinctive when you connect it with Sendagi backstreets and a few calmer residential-feeling stretches.\n\nThat keeps the outing from feeling like a simple retail detour." },
        { heading: "Best from late morning onward", body: "Late morning into lunch is usually the strongest window. It gives shops time to wake up while keeping the route lighter than many central districts.\n\nIf you expect to rely on navigation or train timing on the move, it is easier to keep your Japan eSIM active than to depend on intermittent public networks." },
      ],
      faq: [
        { q: "Does this still work in heavier rain?", a: "In heavier rain, keep it shorter and use the shopping-street portions more intentionally." },
        { q: "Should I extend it into Nezu or Yanaka?", a: "You can, but you do not need to. It already works as its own half day." },
        { q: "Is this mainly for shopping?", a: "Not really. It is better as a mood-first walk with optional small purchases." },
      ],
      ...minorCta("en"),
    },
  },
  "morishita-kiyosumi-walk": {
    ja: {
      title: "森下から清澄白河へ歩く半日ガイド 2026",
      description: "森下から清澄白河へつなぐ、喫茶や水辺を楽しみたい人向けの東東京半日散歩ガイドです。",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "清澄庭園の池と緑が見える静かな景色", width: 1280, height: 960, caption: "東東京の半日は、庭園や川の余白が入るだけで歩き方がかなりやわらかくなります。", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "静かな東京散歩の空気感や、古い東京の層をイメージしやすい公式埋め込みです。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "清澄白河だけで終わらせない東東京ルート", body: "清澄白河は単体でも歩きやすいですが、森下から入ると東東京らしい低い街並みと日常感が先に入り、後半の清澄白河がより整って見えます。喫茶やベーカリーだけでなく、半日の流れとして組みやすくなるのが利点です。" },
        { heading: "前半は生活寄り、後半は少し整った空気", body: "森下側では大きな目的地を増やしすぎず、駅から静かに歩き始めるくらいがちょうどよいです。清澄白河では庭園やカフェを一つ二つだけ選ぶと、観光としても生活街歩きとしてもバランスが取れます。" },
        { heading: "午後前半の散歩として使いやすい", body: "午前後半から昼過ぎでも成立しますが、別の観光地の後に午後前半だけ入れる使い方とも相性が良いです。疲れを増やしにくく、地図も読みやすい東東京の半日になります。\n\n接続確認が多い旅行なら、日本向けeSIMを旅程の前提にしておく方が迷いが減ります。" },
      ],
      faq: [
        { q: "清澄白河のガイドとどう違いますか？", a: "こちらは森下から入り、半日の流れとして東東京らしさを少し広く感じたい人向けです。" },
        { q: "庭園は必須ですか？", a: "必須ではありませんが、1か所入れると満足度が上がりやすいです。" },
        { q: "何時間くらい必要ですか？", a: "3〜4時間を見ておくと余裕があります。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Morishita to Kiyosumi-Shirakawa Walk Guide 2026",
      description: "A slower east-Tokyo half day linking Morishita and Kiyosumi-Shirakawa for coffee stops, river air, and a calmer neighborhood pace.",
      heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "A peaceful pond and greenery at Kiyosumi Garden in Tokyo", width: 1280, height: 960, caption: "Even one garden or waterside pause changes the rhythm of an east-Tokyo half day for the better.", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds are useful mood references for quieter Tokyo walking and the older-city atmosphere that fits this side of town.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "A broader east-Tokyo half day than Kiyosumi alone", body: "Kiyosumi-Shirakawa is already popular for coffee and galleries, but adding Morishita gives the route a calmer, more everyday opening. That makes the second half feel earned rather than pre-packaged." },
        { heading: "Let Morishita open the route, then use Kiyosumi selectively", body: "You do not need many stops in Morishita. The point is to begin with lower-key streets and then let one or two Kiyosumi anchors do the heavier lifting later.\n\nThat keeps the whole route slower and easier to absorb." },
        { heading: "Strong as a gentle afternoon", body: "This route is especially useful when you want an afternoon that does not compete with the rest of your itinerary. It is easy to read on a map and forgiving if you keep only a few planned stops.\n\nFor directions, transport checks, and light route changes, stable Japan eSIM access is more useful than depending on ad hoc public Wi-Fi." },
      ],
      faq: [
        { q: "How is this different from a Kiyosumi-Shirakawa guide?", a: "This version is about the route between neighborhoods, not only the Kiyosumi core." },
        { q: "Do I need to include the garden?", a: "No, but one green or waterside pause usually improves the walk." },
        { q: "Is three to four hours enough?", a: "Yes. That is usually the right amount of time." },
      ],
      ...minorCta("en"),
    },
  },
  "ryogoku-kuramae-walk": {
    ja: {
      title: "両国から蔵前へ歩く半日ガイド 2026",
      description: "橋の景色と蔵前の小さな店をつなぐ、東東京の少し落ち着いた半日街歩きガイドです。",
      heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "蔵前神社の鳥居と桜", width: 1600, height: 1067, caption: "両国から蔵前へ抜けると、川と橋の余白が入って東東京らしい歩き方になりやすいです。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "静かな東京の午前や、少し落ち着いた東東京散歩の気分に近い公式埋め込みです。",
      xEmbeds: TOKYO_X_JA,
      sections: [
        { heading: "両国を通過点として使うと歩きやすい", body: "両国は相撲や博物館の印象が強いですが、半日街歩きでは“入口”として使う方がまとまりやすいです。橋を渡って蔵前側へ向かうことで、観光の記憶が混雑よりも歩行の連続として残りやすくなります。" },
        { heading: "蔵前では小さな寄り道だけで十分", body: "蔵前は何かを大量にこなすエリアではなく、小さな店を1〜2件、喫茶を1か所くらい入れるとちょうどよいです。橋の景色と裏通りの切り替わりがこのルートの価値なので、予定を詰め込みすぎない方が機能します。" },
        { heading: "東東京の午後後半にも合わせやすい", body: "午前でも午後でも成立しますが、別の観光のあとに少し歩いて温度を下げたいときにも向いています。地図と営業時間の確認が多い日なら、日本向けeSIMを前提にしておくと迷いが少なくなります。" },
      ],
      faq: [
        { q: "相撲観光をしなくても成立しますか？", a: "はい。両国は入口として使うだけでも十分です。" },
        { q: "蔵前の既存ガイドとどう違いますか？", a: "こちらは橋を渡る東東京の流れを含めて半日を作りたい人向けです。" },
        { q: "雨の日でも可能ですか？", a: "軽い雨なら可能ですが、橋まわりは短めにした方が楽です。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Ryogoku to Kuramae Walk Guide 2026",
      description: "A practical east-Tokyo route from Ryogoku toward Kuramae for bridge views, craft stops, and a lower-key alternative to denser sightseeing districts.",
      heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "Kuramae Shrine in Tokyo", width: 1600, height: 1067, caption: "Bridge crossings and a Kuramae finish give this route a calmer east-Tokyo shape than many first-timer districts.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds help frame the quieter Tokyo mood that suits a Ryogoku-to-Kuramae half day.",
      xEmbeds: TOKYO_X_EN,
      sections: [
        { heading: "Ryogoku works well as a starting frame, not just a destination", body: "Many travelers know Ryogoku for sumo or museums, but it also works as a useful first frame for a calmer east-Tokyo walk. Once you begin moving toward Kuramae, the route shifts from headline attractions into a more street-based half day." },
        { heading: "The value is in the bridges and the pace change", body: "The main payoff here is not checking off many stops. It is the way bridge crossings, river edges, and smaller Kuramae streets change the feeling of the walk.\n\nThat makes it more memorable than simply spending longer in one dense district." },
        { heading: "A good lower-pressure option after busier sightseeing", body: "This route fits well when the rest of your itinerary is heavy on famous districts. It is readable, flexible, and easy to shorten if needed.\n\nIf you plan to navigate as you go, stable Japan eSIM access is usually more useful than improvising with public Wi-Fi near stations or cafes." },
      ],
      faq: [
        { q: "Does this still work if I am not interested in sumo?", a: "Yes. Ryogoku is useful here even as a simple starting point." },
        { q: "How is this different from the Kuramae walk?", a: "This route adds bridge crossings and a broader east-Tokyo transition before Kuramae." },
        { q: "Can I do this in light rain?", a: "Yes, though shorter bridge segments are usually better." },
      ],
      ...minorCta("en"),
    },
  },
  "machiya-arakawa-tram-walk": {
    ja: {
      title: "町屋と荒川の都電街歩きガイド 2026",
      description: "町屋と都電沿線をつなぐ、少しローカルな北東東京の半日街歩きガイドです。",
      heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "飛鳥山付近を走る都電荒川線", width: 1800, height: 1200, caption: "都電沿線は有名停留場を追うより、街に馴染んだ路面電車の空気を半日で味わう方が満足しやすいです。", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "静かな東京散歩の気分をつかむための、公式埋め込みを参考として置いています。",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 静かな東京の朝の参考" }],
      sections: [
        { heading: "王子よりさらにローカル寄りの都電半日", body: "町屋と荒川の都電沿線は、観光の記号が少ないぶん、東京の日常に近い空気で歩けます。派手な名所がなくても、路面電車があることで街のスケールが見えやすく、外国人旅行者でも半日を作りやすいです。" },
        { heading: "都電に乗りすぎない方がこのルートらしい", body: "このルートの魅力は、たくさん乗ることより、歩きながら都電の気配を感じることです。1区間だけ乗る、もしくは見送る時間を何回か入れるだけでも、十分に“その街で過ごした感”が出ます。" },
        { heading: "標準ルートに疲れた日に入れやすい", body: "浅草や渋谷のあとに、少し温度を落とした半日がほしいときにちょうどよいです。駅、商店街、都電の位置関係が分かりやすいので、細かな下調べが多くなくても動けます。\n\n時刻確認や地図利用のためには、日本向けeSIMの接続を安定させておくと安心です。" },
      ],
      faq: [
        { q: "初めての東京だと難しいですか？", a: "難しくありません。むしろ定番から少し外れたい人に向いています。" },
        { q: "都電に必ず乗る必要はありますか？", a: "いいえ。歩き中心でも十分成立します。" },
        { q: "何時間くらい見ればよいですか？", a: "3時間前後あれば、休憩を入れても無理なく回れます。" },
      ],
      ...minorCta("ja"),
    },
    en: {
      title: "Machiya and Arakawa Tram Walk Guide 2026",
      description: "A local-feeling north-east Tokyo half day around Machiya and the tram line for travelers who want a quieter route with streetcar atmosphere.",
      heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "Toden tram near Asukayama in Tokyo", width: 1800, height: 1200, caption: "Tram-line routes work best when the streetcar adds neighborhood atmosphere rather than becoming a checklist of stops.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "This official embed is a simple mood reference for the quieter Tokyo pacing that suits tram-line neighborhoods well.",
      xEmbeds: [{ url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a useful quiet-Tokyo morning reference" }],
      sections: [
        { heading: "A more local tram-line half day than the better-known stops", body: "Machiya and nearby Arakawa streets work well when you want the tram-line feeling without centering the day on its most photographed segments. The neighborhood scale stays easy to read, and the route feels more lived-in than performative." },
        { heading: "Walk first, ride only if it helps the rhythm", body: "You do not need to maximize tram rides here. A short ride, or even just a few good tram moments between walking segments, is enough to give the route its identity.\n\nThat approach keeps the half day flexible and much less forced." },
        { heading: "Good when standard Tokyo districts start to blur together", body: "This is a strong option after busier sightseeing days because it offers contrast without becoming inconvenient. Stations, local shopping streets, and the tram line create enough structure that the route stays practical.\n\nFor maps and timing checks, a stable Japan eSIM connection is more reliable than hoping for public Wi-Fi as you move." },
      ],
      faq: [
        { q: "Is this too obscure for a first Tokyo trip?", a: "No. It is simply quieter and more local-feeling than the default choices." },
        { q: "Do I have to ride the tram?", a: "No. A mostly walking version still works well." },
        { q: "How much time should I allow?", a: "Around three hours is usually enough, including a break." },
      ],
      ...minorCta("en"),
    },
  },
};

const ESIM_PRIORITY_GUIDE_RELATED: Record<string, string[]> = {
  "cheapest-esim-plans": [
    "best-esim-providers",
    "how-much-data-do-i-need-for-travel",
    "travel-internet-options",
  ],
  "best-esim-for-europe": [
    "europe-esim",
    "best-esim-for-asia",
    "travel-internet-options",
  ],
  "best-esim-for-asia": [
    "asia-travel-connectivity",
    "best-esim-for-europe",
    "travel-internet-options",
  ],
  "esim-vs-airport-sim": [
    "travel-internet-options",
    "wifi-vs-esim",
    "first-time-esim",
  ],
  "esim-hotspot-tethering": [
    "esim-for-business-travel",
    "how-much-data-do-i-need-for-travel",
    "esim-troubleshooting",
  ],
  "how-much-data-do-i-need-for-travel": [
    "cheapest-esim-plans",
    "esim-hotspot-tethering",
    "travel-data-usage-tips",
  ],
};

const ESIM_PRIORITY_GUIDE_CONTENT: PriorityGuideMap = {
  "cheapest-esim-plans": {
    ja: {
      title: "格安eSIMプラン比較 2026",
      description:
        "安いeSIMを探している人向けに、料金だけで失敗しない選び方を整理した比較ガイドです。短期旅行、周遊旅行、出張で本当にコスパが良いプランの見分け方を解説します。",
      sections: [
        {
          heading: "格安eSIMを選ぶ時に見るべき比較軸",
          body:
            "安いeSIMを選ぶ時は、表示価格だけで決めないことが重要です。比較したいのは、データ容量、有効期間、利用国数、テザリング可否、追加チャージのしやすさです。1GBあたりの単価が安く見えても、日数が短すぎたり、対象国が少なかったりすると結局割高になります。\n\n特に海外旅行では、地図、翻訳、配車、SNS、動画通話など用途が分かれるため、自分の使い方に合う容量を選ぶ方が失敗しにくいです。安さだけでなく、旅行日数と国数に合っているかを優先してください。",
        },
        {
          heading: "短期旅行と長期旅行で格安プランの考え方は違う",
          body:
            "2泊3日や週末旅行では、小容量の単国プランが最も安くなりやすいです。韓国、台湾、タイ、日本など需要の高い国は価格競争が強く、短期向けの格安eSIMが見つかりやすい傾向があります。\n\n一方で、2週間以上の旅行や複数国周遊では、単国プランを何度も買うよりもリージョナルeSIMの方が総額を抑えられる場合があります。ヨーロッパ周遊や東南アジア周遊では、国をまたいでも同じeSIMを使えるかがコストに大きく影響します。",
        },
        {
          heading: "安いeSIMで失敗しやすいポイント",
          body:
            "格安eSIMでありがちな失敗は、想定より容量が少ない、テザリング不可、速度が不安定、開通手順が分かりにくい、サポートが弱いという点です。価格だけを追うと、実際の旅行中に再購入や再設定が必要になり、結果的にコストも手間も増えます。\n\nそのため、安さを重視する場合でも、購入後すぐにQRコードが届くこと、注文後に手順が再確認できること、サポートやFAQが整っていることは最低限チェックしておくべきです。",
        },
        {
          heading: "コスパ良く選ぶなら用途別に決める",
          body:
            "地図とメッセージ中心なら小容量の格安プラン、動画視聴やテザリングが多いなら中容量以上、周遊旅行ならリージョナルプランが向いています。仕事利用やノマド用途では、安さよりも安定性を優先した方が結果的に満足度が高くなります。\n\nAutoWiFi Travel では、国別eSIMページで旅行日数と容量を比較しやすくしているため、格安重視でも過不足の少ないプランを選びやすいのが特徴です。",
        },
      ],
      faq: [
        {
          q: "格安eSIMは本当に安全ですか？",
          a: "価格が安いこと自体に問題はありませんが、通信品質、開通導線、サポートの有無まで確認することが大切です。特に旅行中は、再設定しやすいサービスの方が安心です。",
        },
        {
          q: "1週間の旅行なら何GBの格安eSIMを選べばよいですか？",
          a: "地図、SNS、メッセージ中心なら5GB前後が目安です。動画視聴やテザリングがある場合は10GB以上を検討すると安心です。",
        },
        {
          q: "単国プランと周遊プランはどちらが安いですか？",
          a: "1か国だけなら単国プランが安いことが多いです。複数国を移動するなら、リージョナルeSIMの方が買い足しを減らせて総額を抑えやすくなります。",
        },
      ],
      ctaTitle: "格安でも失敗しにくいeSIMを探す",
      ctaButton: "eSIMプランを見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
    en: {
      title: "Cheapest eSIM Plans for Travel 2026",
      description:
        "Looking for a cheap travel eSIM? This guide explains how to compare low-cost plans without sacrificing coverage, setup reliability, or the data you actually need on your trip.",
      sections: [
        {
          heading: "How to compare cheap eSIM plans",
          body:
            "The cheapest travel eSIM is not always the one with the lowest headline price. Compare data allowance, validity, destination coverage, tethering support, and top-up options before you buy. A plan can look inexpensive but become poor value if the validity window is too short or if you need to buy extra data halfway through your trip.\n\nFor most travelers, value comes from matching the plan to the trip rather than picking the lowest price on the page.",
        },
        {
          heading: "Cheap eSIM for short trips vs long trips",
          body:
            "For weekend city breaks or short business trips, small local plans are usually the cheapest choice. For longer vacations or multi-country travel, regional plans often deliver better value because you avoid repeated purchases every time you cross a border.\n\nEurope rail trips and Asia multi-country itineraries are two common cases where a regional plan can outperform several cheap local plans combined.",
        },
        {
          heading: "Where travelers go wrong with budget eSIMs",
          body:
            "Common problems with ultra-cheap eSIMs include unclear setup steps, no tethering, unstable network access, and weak support. If a service is cheap but hard to install or hard to recover during travel, the real cost can be much higher.\n\nA good budget eSIM should still provide instant QR delivery, clear instructions, and a simple way to check or re-open your order details.",
        },
        {
          heading: "Best-value plan depends on your usage",
          body:
            "Maps and messaging users can often stay on lower-cost plans, while video calls, hotspot use, and heavier browsing require larger data bundles. Business travelers and remote workers should prioritize stability over absolute price.\n\nAutoWiFi Travel helps you compare by destination, trip length, and data size so you can find a low-cost option that still fits real travel usage.",
        },
      ],
      faq: [
        {
          q: "Are cheap eSIM plans reliable?",
          a: "They can be, but you should compare setup flow, support quality, and network stability in addition to price.",
        },
        {
          q: "How much data should I buy for a one-week trip?",
          a: "For maps, messaging, and light social media, around 5GB is often enough. Choose more if you tether or watch video regularly.",
        },
        {
          q: "Is a regional eSIM cheaper than local plans?",
          a: "For one country, local plans are often cheaper. For multi-country travel, regional eSIMs can reduce total cost and hassle.",
        },
      ],
      ctaTitle: "Find a low-cost eSIM that still works well",
      ctaButton: "View eSIM Plans",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
  },
  "best-esim-for-europe": {
    ja: {
      title: "ヨーロッパ旅行におすすめのeSIM 2026",
      description:
        "ヨーロッパ周遊や都市旅行で失敗しにくいeSIMの選び方をまとめた比較ガイドです。単国プランと周遊プランの違い、EU圏外で注意したい点、日数別の選び方を解説します。",
      sections: [
        {
          heading: "ヨーロッパ旅行では単国eSIMか周遊eSIMかを先に決める",
          body:
            "パリ、ローマ、バルセロナなど1か国だけに滞在するなら単国eSIMが分かりやすく、費用も抑えやすいです。一方で、フランスからイタリア、スペイン、ドイツ、オランダなどを移動するなら、ヨーロッパ周遊eSIMの方が設定変更が少なく、旅行中のストレスも減ります。\n\n鉄道で複数国を移動する旅では、国境を越えても同じ回線で使い続けられるかどうかが重要です。プラン名にヨーロッパとあっても、対象国に差があるため、出発前に必ず対象国リストを確認してください。",
        },
        {
          heading: "EU圏内でもイギリスやスイスは別扱いになることがある",
          body:
            "ヨーロッパeSIM選びで見落としやすいのが、イギリス、スイス、トルコなどの扱いです。EU圏のローミング感覚で周遊できると思っていても、eSIMの対象国には含まれないケースがあります。\n\nロンドン、チューリッヒ、イスタンブールまで行く予定があるなら、最初からその国が入ったプランを選ぶ方が安全です。周遊eSIMは“行く予定の全都市”ではなく“行く予定の全国家”で確認するのがポイントです。",
        },
        {
          heading: "旅行日数と使い方でおすすめ容量は変わる",
          body:
            "3〜5日の短期旅行なら3GBから5GBでも足りることが多いです。Google Maps、翻訳、チケット表示、配車アプリ、SNS中心なら小〜中容量で十分です。1週間以上の周遊や、リモートワーク、動画視聴、テザリングがあるなら10GB以上を検討してください。\n\nヨーロッパは駅やホテルにWiFiがあることも多いですが、街歩きや移動中に安定して使える回線を持っている方が、遅延や接続切れを気にせずに済みます。",
        },
        {
          heading: "ヨーロッパ向けeSIMを選ぶ時の実務ポイント",
          body:
            "おすすめの条件は、対象国が明確、QRコード即時発行、テザリング可、利用残量が確認しやすい、再設定手順を後から見返せる、の5点です。初めてeSIMを使う人は、設定手順や注文詳細ページが整っているサービスを選ぶとトラブル時に強いです。\n\nAutoWiFi Travel では、ヨーロッパ関連の国別ページと比較ガイドを行き来しながら、自分の旅程に合うeSIMを選びやすい設計にしています。",
        },
      ],
      faq: [
        {
          q: "ヨーロッパ旅行なら単国eSIMと周遊eSIMのどちらが良いですか？",
          a: "1か国滞在なら単国eSIM、2か国以上を移動するなら周遊eSIMが便利です。設定の手間と総額を合わせて比較するのがおすすめです。",
        },
        {
          q: "イギリスやスイスもヨーロッパeSIMで使えますか？",
          a: "プランによります。ヨーロッパ周遊と書かれていても、イギリスやスイスが除外されることがあるため、対象国リストの確認が必要です。",
        },
        {
          q: "ヨーロッパ1週間旅行で必要なデータ容量は？",
          a: "地図、検索、SNS中心なら5GB前後が目安です。動画視聴やテザリングが多いなら10GB以上の方が安心です。",
        },
      ],
      ctaTitle: "ヨーロッパ旅行向けeSIMを比較する",
      ctaButton: "eSIMプランを見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
    en: {
      title: "Best eSIM for Europe Travel 2026",
      description:
        "Planning a Europe trip? This guide explains how to choose the best eSIM for city breaks, rail travel, and multi-country itineraries across Europe.",
      sections: [
        {
          heading: "Choose between local Europe plans and regional plans",
          body:
            "If you stay in one country, a local eSIM is often the simplest and cheapest option. If you move across France, Italy, Spain, Germany, the Netherlands, or other destinations, a Europe regional eSIM usually saves time and reduces setup friction.\n\nRail trips and open-jaw itineraries benefit most from plans that stay active across borders.",
        },
        {
          heading: "Not every Europe eSIM includes every country",
          body:
            "A common mistake is assuming that a Europe eSIM will automatically include the UK, Switzerland, or Turkey. Many plans treat these destinations separately.\n\nCheck the supported country list carefully before purchase, especially if your itinerary mixes EU and non-EU destinations.",
        },
        {
          heading: "Match your plan to trip length and usage",
          body:
            "Short trips with maps and messaging often work well with 3GB to 5GB. Longer trips, hotspot use, remote work, and video-heavy usage usually need 10GB or more.\n\nHotel and train station WiFi can help, but a strong travel eSIM removes the uncertainty during transfers and full travel days.",
        },
        {
          heading: "What makes a Europe eSIM worth recommending",
          body:
            "The best Europe travel eSIMs clearly list supported countries, allow hotspot use, provide instant setup, and make it easy to review your instructions later. Travelers benefit from services that are easy to recover if they misplace the setup email or need help on the road.\n\nAutoWiFi Travel links Europe comparison content with destination pages so you can compare based on your exact route rather than a generic regional label.",
        },
      ],
      faq: [
        {
          q: "Should I buy a local or regional Europe eSIM?",
          a: "Buy a local plan if you stay in one country. Choose a regional plan if you cross borders during the trip.",
        },
        {
          q: "Do Europe eSIMs include the UK and Switzerland?",
          a: "Not always. Many do not, so check the supported countries before buying.",
        },
        {
          q: "How much data do I need for one week in Europe?",
          a: "Around 5GB works for maps, messaging, and light browsing. Choose more if you tether or stream video.",
        },
      ],
      ctaTitle: "Compare eSIM plans for Europe travel",
      ctaButton: "View eSIM Plans",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
  },
  "best-esim-for-asia": {
    ja: {
      title: "アジア旅行におすすめのeSIM 2026",
      description:
        "韓国、台湾、タイ、日本、シンガポール、ベトナムなどアジア旅行で使いやすいeSIMの選び方をまとめました。単国旅行と周遊旅行で見るべきポイントが分かります。",
      sections: [
        {
          heading: "アジアeSIMは単国旅行と周遊旅行で最適解が変わる",
          body:
            "韓国、台湾、タイ、日本のように1か国だけ行く場合は単国プランが分かりやすく、価格も抑えやすいです。一方で、東南アジア周遊やアジア複数都市を回る旅では、アジアリージョンプランの方が設定を一本化しやすく、移動のたびにeSIMを買い足す必要がありません。\n\n特にLCCで国をまたいで移動する旅では、到着直後にネットが使えるかどうかが移動効率に直結します。配車、翻訳、決済、ホテル連絡が必要な人ほど、設定が一度で済む周遊eSIMは便利です。",
        },
        {
          heading: "アジアは国ごとに通信事情がかなり違う",
          body:
            "日本や韓国、シンガポールは高速通信が安定しやすい一方で、島が多い国や地方移動が多い国では、都市部と郊外で体感差が出やすいです。タイ、ベトナム、インドネシア、フィリピンなどは、都市観光中心か、地方やリゾートへ行くかで適したプランが変わります。\n\nそのため、アジア向けeSIMを選ぶ時は、国名だけではなく、どの都市・どの移動スタイルなのかも意識すると失敗が減ります。",
        },
        {
          heading: "旅行日数とデータ消費でおすすめ容量を決める",
          body:
            "2〜4日の短期旅行なら3GB前後、1週間前後なら5GB〜10GB、周遊や長期旅行なら10GB以上か大容量プランが現実的です。SNS中心なら小容量でも足りますが、動画、オンライン会議、テザリングを使うなら余裕のある容量が必要です。\n\nアジア旅行では地図アプリと翻訳アプリの利用頻度が高くなりやすいため、想定より少し多めに見積もると安心です。",
        },
        {
          heading: "アジア旅行向けeSIMで重視したいポイント",
          body:
            "おすすめ条件は、対象国の明確さ、QRコード即時発行、再設定しやすい導線、注文詳細の見直しやすさ、低残量時の把握しやすさです。特に初めてeSIMを使う人は、購入後の復旧導線まで整っているかが安心材料になります。\n\nAutoWiFi Travel では、人気国の国別ページに加えて、アジア旅行向けの比較記事からも選びやすくしているため、単国・周遊どちらでも判断しやすい構成にしています。",
        },
      ],
      faq: [
        {
          q: "アジア周遊なら単国プランよりリージョンプランの方が良いですか？",
          a: "複数国を移動するならリージョンプランの方が便利です。国ごとに買い足す手間が減り、到着後すぐ使える状態を保ちやすくなります。",
        },
        {
          q: "アジア旅行1週間で必要なデータ容量はどれくらいですか？",
          a: "地図、メッセージ、SNS中心なら5GB前後が目安です。動画視聴やテザリングを使うなら10GB以上を検討すると安心です。",
        },
        {
          q: "韓国や台湾のような短期旅行でもeSIMはおすすめですか？",
          a: "はい。短期旅行こそ、空港受け取り不要ですぐ使えるeSIMのメリットが大きく、費用も抑えやすいです。",
        },
      ],
      ctaTitle: "アジア旅行向けeSIMを比較する",
      ctaButton: "eSIMプランを見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
    en: {
      title: "Best eSIM for Asia Travel 2026",
      description:
        "Compare the best eSIM options for Asia travel, whether you are visiting one destination like Japan or Korea or planning a multi-country trip across Asia.",
      sections: [
        {
          heading: "Local Asia eSIM vs regional Asia eSIM",
          body:
            "For single-country trips such as Japan, South Korea, Taiwan, or Thailand, a local plan is often the best-value option. For multi-country Asia trips, a regional plan can reduce setup friction and make border crossings easier.\n\nThis matters most on itineraries with frequent flights where you need maps, ride apps, and translation tools the moment you land.",
        },
        {
          heading: "Network conditions vary across Asia",
          body:
            "Japan, Korea, and Singapore tend to offer very strong mobile coverage. Destinations with more islands or long-distance domestic movement can show bigger differences between city coverage and rural coverage.\n\nChoose your plan based not only on the country, but also on the kind of route you plan to travel within that country.",
        },
        {
          heading: "Choose data size based on trip length",
          body:
            "Short Asia trips can often work with around 3GB. One-week trips typically fit 5GB to 10GB. Backpacking, hotspot use, remote work, and long travel days usually require more.\n\nTravelers in Asia often rely heavily on maps and translation, so picking slightly more data than your rough estimate is usually smart.",
        },
        {
          heading: "What makes an Asia eSIM worth recommending",
          body:
            "The best Asia travel eSIMs clearly list covered countries, deliver QR codes instantly, and make it easy to re-open setup steps later. Services with strong post-purchase instructions are especially useful for first-time eSIM users.\n\nAutoWiFi Travel connects Asia comparison guides with country pages so you can choose based on your exact route.",
        },
      ],
      faq: [
        {
          q: "Is a regional Asia eSIM better than buying local plans?",
          a: "For one country, local plans are often better value. For multi-country travel, regional plans are usually more convenient.",
        },
        {
          q: "How much data do I need for a one-week Asia trip?",
          a: "Around 5GB works for maps, messaging, and light social media. Choose 10GB or more if you tether or stream often.",
        },
        {
          q: "Is eSIM worth it for short trips to Korea or Taiwan?",
          a: "Yes. Short trips benefit a lot from instant setup and no airport pickup requirement.",
        },
      ],
      ctaTitle: "Compare eSIM plans for Asia travel",
      ctaButton: "View eSIM Plans",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
  },
  "esim-vs-airport-sim": {
    ja: {
      title: "eSIM vs 空港SIMカード 2026",
      description:
        "出発前にeSIMを買うべきか、到着後に空港SIMカードを買うべきかを比較したガイドです。費用、手間、開通スピード、初心者向けの選び方を整理しています。",
      sections: [
        {
          heading: "一番の違いは“いつ準備できるか”",
          body:
            "eSIMは出発前にオンラインで購入して設定できます。空港SIMカードは現地到着後にカウンターを探して購入する流れが一般的です。到着直後から地図や配車アプリが必要な人にとっては、事前準備できるeSIMの方が有利です。\n\n一方で、eSIMに不安がある人や、端末がeSIM非対応の人は空港SIMカードが選択肢になります。ただし、空港での待ち時間や言語のやり取り、営業時間の制約は考慮しておくべきです。",
        },
        {
          heading: "料金はケース次第だが、短期旅行はeSIMが有利になりやすい",
          body:
            "短期旅行では、eSIMの方が比較しやすく、料金も事前に把握しやすい傾向があります。空港SIMカードは観光客向け料金になっていたり、余分な通話付きプランがセットになっていたりすることがあります。\n\n長期滞在や現地番号が必要な場合は、空港SIMや市中のSIMカードの方が有利な場面もあります。旅行日数と利用目的で判断するのが基本です。",
        },
        {
          heading: "初心者にとっての難しさは違う",
          body:
            "eSIMは最初のQR設定に慣れが必要ですが、事前に自宅で落ち着いて設定できるのが強みです。空港SIMカードは設定作業を店員に任せやすい反面、混雑や英語対応、想定外のオプション提案に戸惑うことがあります。\n\nどちらも“完全に簡単”ではありませんが、旅行直前に不安を減らしたいなら、手順を事前に確認できるeSIMの方が再現性が高いです。",
        },
        {
          heading: "こんな人にはeSIM、こんな人には空港SIM",
          body:
            "eSIMが向いているのは、短期旅行、出張、空港で時間を使いたくない人、到着後すぐネットが必要な人です。空港SIMが向いているのは、eSIM非対応端末の人、現地番号が必要な人、長期滞在で現地料金を優先したい人です。\n\n多くの海外旅行では、手間の少なさと事前準備のしやすさから、eSIMの方が旅行者向けと言えます。",
        },
      ],
      faq: [
        {
          q: "空港SIMカードの方が安いですか？",
          a: "必ずしも安いわけではありません。短期旅行ではeSIMの方が料金を比較しやすく、観光客向けの上乗せ料金を避けやすいことがあります。",
        },
        {
          q: "初めてならeSIMと空港SIMカードどちらが簡単ですか？",
          a: "事前に落ち着いて準備できる点ではeSIMが有利です。対面サポートを重視するなら空港SIMも選択肢ですが、待ち時間や言語面の負担があります。",
        },
        {
          q: "現地番号が必要ならどちらが良いですか？",
          a: "現地番号が必要なら、通話付きの空港SIMや現地SIMの方が向いているケースがあります。データ中心ならeSIMで十分なことが多いです。",
        },
      ],
      ctaTitle: "空港で迷う前にeSIMを比較する",
      ctaButton: "eSIMプランを見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
    en: {
      title: "eSIM vs Airport SIM Card 2026",
      description:
        "Should you buy an eSIM before departure or wait for an airport SIM card on arrival? This guide compares cost, convenience, and setup stress for travelers.",
      sections: [
        {
          heading: "The main difference is when you can prepare",
          body:
            "Travel eSIMs can be purchased and installed before departure. Airport SIM cards usually require finding a counter after arrival. If you need maps, ride apps, or translation right away, pre-trip eSIM setup is a major advantage.\n\nAirport SIM cards still make sense for travelers with non-eSIM phones or those who prefer face-to-face setup help.",
        },
        {
          heading: "For short trips, eSIM often wins on price clarity",
          body:
            "Airport SIM pricing can include tourist bundles or services you do not actually need. Travel eSIMs are easier to compare in advance because the data amount and validity are usually more transparent.\n\nFor longer stays or when a local phone number matters, physical SIM cards can still be useful.",
        },
        {
          heading: "Both have learning curves, but in different ways",
          body:
            "eSIM requires a QR-code setup flow, but you can do it calmly before the trip. Airport SIM cards may involve queues, language friction, and last-minute decisions after a long flight.\n\nFor many travelers, the ability to prepare in advance makes eSIM easier overall.",
        },
        {
          heading: "Who should choose each option",
          body:
            "eSIM is ideal for short trips, business travel, and people who want connectivity the moment they land. Airport SIM cards are better for travelers with incompatible phones or those who need a local number.\n\nFor most international leisure trips, eSIM is the more traveler-friendly option.",
        },
      ],
      faq: [
        {
          q: "Is an airport SIM card cheaper than eSIM?",
          a: "Not always. On short trips, eSIM often makes price comparison easier and can be more efficient overall.",
        },
        {
          q: "Which is easier for first-time travelers?",
          a: "eSIM is often easier because you can prepare before the trip. Airport SIM cards can be simple too, but involve queues and on-arrival decisions.",
        },
        {
          q: "What if I need a local phone number?",
          a: "A physical SIM card may be better if you specifically need voice service and a local number.",
        },
      ],
      ctaTitle: "Compare eSIM before you line up at the airport",
      ctaButton: "View eSIM Plans",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
  },
  "esim-hotspot-tethering": {
    ja: {
      title: "eSIMテザリング完全ガイド 2026",
      description:
        "旅行用eSIMでテザリングやモバイルホットスポットを使いたい人向けのガイドです。対応可否の見方、PCやタブレットへ共有する時の注意点、容量の考え方をまとめています。",
      sections: [
        {
          heading: "旅行用eSIMでもテザリングは使えることが多い",
          body:
            "多くの旅行用eSIMはテザリングに対応していますが、すべてのプランで無制限に使えるわけではありません。特に無制限プランや格安プランでは、テザリング量に制限があったり、ホットスポット利用が不可になっている場合があります。\n\nそのため、テザリング目的でeSIMを選ぶなら、購入前に“テザリング可”かどうかを確認するのが最優先です。",
        },
        {
          heading: "PC作業やタブレット共有ではデータ消費が増えやすい",
          body:
            "スマホ単体で使う時より、PCやタブレットへ共有するとデータ消費は大きくなります。クラウド同期、動画会議、OS更新、ブラウザの重いページ表示が重なると、数日で容量を使い切ることもあります。\n\n出張やワーケーションでテザリングを使うなら、小容量プランではなく、10GB以上か大容量プランを前提に考える方が安全です。",
        },
        {
          heading: "テザリング時に確認したい実務ポイント",
          body:
            "確認したいのは、テザリング可否、速度制限、追加チャージ方法、バッテリー消費の4点です。ホットスポットはバッテリーを消耗しやすいため、移動日や長時間作業日にはモバイルバッテリーがあると安心です。\n\nまた、PC側の自動更新やクラウド同期をオフにしておくと、旅行中のデータ消費をかなり抑えられます。",
        },
        {
          heading: "eSIMテザリングが向いている人",
          body:
            "テザリング対応eSIMは、一人旅、出張、ノートPCを持つリモートワーカーに特に向いています。ポケットWiFiを別で持たなくても、スマホ一台で移動中の作業環境を作れるからです。\n\n逆に、家族全員で長時間シェアするなら、専用ルーターの方が向く場合もあります。1人または少人数の短中期利用なら、eSIMテザリングの機動力はかなり高いです。",
        },
      ],
      faq: [
        {
          q: "eSIMでテザリングできるかはどう確認しますか？",
          a: "プラン詳細でテザリング可否を確認するのが基本です。特に無制限プランや格安プランは制限があることがあるため注意が必要です。",
        },
        {
          q: "テザリング利用なら何GBくらい必要ですか？",
          a: "メールや軽い作業なら5GB前後でも足りますが、PC作業、動画会議、ファイル送信があるなら10GB以上を目安にすると安心です。",
        },
        {
          q: "ポケットWiFiの代わりにeSIMテザリングで十分ですか？",
          a: "一人利用や短期出張なら十分なことが多いです。複数人で長時間シェアする場合はポケットWiFiの方が安定しやすいです。",
        },
      ],
      ctaTitle: "テザリング対応のeSIMを比較する",
      ctaButton: "eSIMプランを見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
    en: {
      title: "eSIM Hotspot & Tethering Guide 2026",
      description:
        "Want to use your travel eSIM as a hotspot? This guide explains how tethering works on travel eSIM plans and how to avoid running out of data too quickly.",
      sections: [
        {
          heading: "Many travel eSIMs support tethering, but not all",
          body:
            "A large number of travel eSIM plans allow hotspot use, but some unlimited or ultra-cheap plans restrict it. Always check tethering rules before buying if you plan to share data with a laptop or tablet.\n\nThe phrase to look for is whether hotspot or tethering is explicitly allowed.",
        },
        {
          heading: "Hotspot use increases data consumption fast",
          body:
            "Laptop work, cloud sync, video calls, and software updates consume much more data than maps and messaging on a phone alone. Business travelers and remote workers should assume they need a bigger plan than phone-only users.\n\nFor many work-focused trips, 10GB or more is a more realistic starting point.",
        },
        {
          heading: "Practical checks before you rely on eSIM tethering",
          body:
            "Check whether tethering is allowed, whether speed restrictions apply, how easy top-ups are, and how much battery the hotspot drains. Turning off automatic updates on laptops can save a surprising amount of data during travel.\n\nA power bank is also a smart companion when you expect heavy hotspot use.",
        },
        {
          heading: "Who benefits most from eSIM tethering",
          body:
            "eSIM tethering works especially well for solo travelers, short business trips, and remote workers who want to avoid carrying a separate hotspot device. It is less ideal for large families sharing a connection all day.\n\nFor one person or light sharing, hotspot-capable eSIM plans can be very efficient.",
        },
      ],
      faq: [
        {
          q: "How do I know if an eSIM plan supports tethering?",
          a: "Check the plan details for hotspot or tethering support before purchase.",
        },
        {
          q: "How much data do I need if I tether?",
          a: "Light work may fit within 5GB, but laptops, video calls, and file sharing usually justify 10GB or more.",
        },
        {
          q: "Can eSIM tethering replace pocket WiFi?",
          a: "For solo travelers or short work trips, yes. For multi-person heavy sharing, pocket WiFi can still make sense.",
        },
      ],
      ctaTitle: "Compare hotspot-friendly eSIM plans",
      ctaButton: "View eSIM Plans",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
  },
  "how-much-data-do-i-need-for-travel": {
    ja: {
      title: "海外旅行に必要なデータ容量の目安 2026",
      description:
        "旅行中に何GB必要か分からない人向けに、地図、SNS、動画、テザリング、出張利用など用途別の目安を整理しました。eSIM選びで容量を決める時の基準になります。",
      sections: [
        {
          heading: "まずは自分が何に通信を使うかを分ける",
          body:
            "必要なデータ容量は、旅行日数よりも使い方で大きく変わります。地図、メッセージ、検索中心なら消費は比較的少なく、動画視聴、SNSへの写真・動画投稿、テザリング、オンライン会議が増えるほど必要量も増えます。\n\nそのため、eSIM選びでは“何日旅行するか”だけでなく、“外で何をするか”を基準に容量を決めるのが実用的です。",
        },
        {
          heading: "利用シーン別のざっくり目安",
          body:
            "軽い利用なら1日300MB〜500MB前後が目安です。これはGoogle Maps、翻訳、配車、検索、メッセージ中心の旅行です。SNSをよく見たり、写真投稿をしたりするなら1日500MB〜1GB前後、動画視聴やテザリング、仕事利用があるなら1日1GB以上を見ておくと安心です。\n\n週末旅行なら1GB〜3GB、1週間旅行なら5GB前後、長期旅行や周遊、リモートワークなら10GB以上が目安になりやすいです。",
        },
        {
          heading: "容量選びで失敗しやすい人の共通点",
          body:
            "失敗しやすいのは、ホテルWiFiが常に使える前提で考える人、PC作業やテザリングの消費を見落とす人、移動中の地図利用を軽く見積もる人です。海外では、空港、駅、街歩き、配車待ちなど、細かい場面で通信が必要になります。\n\n少し余裕のある容量を選んでおくと、現地で再購入に追われるリスクを下げられます。追加チャージしやすいサービスを選ぶのも有効です。",
        },
        {
          heading: "迷ったらこう決める",
          body:
            "1人旅や短期旅行なら5GB前後を基準に、軽い利用なら下げる、仕事や動画があるなら増やすという考え方が分かりやすいです。複数国を周遊する場合は、容量だけでなく対象国数も確認してください。\n\nAutoWiFi Travel では、国別ページと比較記事を見ながら、日数と使い方に近いプランを選びやすくしています。まずは“最小容量”ではなく“足りなくなりにくい容量”で考えるのがおすすめです。",
        },
      ],
      faq: [
        {
          q: "1週間の海外旅行なら何GBあれば足りますか？",
          a: "地図、検索、SNS中心なら5GB前後が目安です。動画視聴やテザリングがあるなら10GB以上あると安心です。",
        },
        {
          q: "Google Mapsはどれくらいデータを使いますか？",
          a: "使い方によりますが、地図と経路検索中心なら比較的少なめです。ただし、旅行中は頻繁に開くため積み重なると無視できません。",
        },
        {
          q: "迷ったら小容量と大容量どちらを選ぶべきですか？",
          a: "旅行中に通信が切れる不便さを考えると、迷ったら少し余裕のある容量を選ぶ方が失敗しにくいです。",
        },
      ],
      ctaTitle: "自分に合う容量のeSIMを探す",
      ctaButton: "eSIMプランを見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
    en: {
      title: "How Much Data Do I Need for Travel? 2026",
      description:
        "Not sure how many GB to buy for your trip? This guide breaks down travel data needs by maps, messaging, social media, hotspot use, and work use cases.",
      sections: [
        {
          heading: "Your usage matters more than your trip length alone",
          body:
            "Travel data needs depend heavily on what you do while connected. Maps, messaging, and search use less than video, hotspot sharing, uploads, and remote work.\n\nThe best eSIM choice comes from combining trip length with real usage patterns.",
        },
        {
          heading: "A simple usage estimate by travel style",
          body:
            "Light users often fit within 300MB to 500MB per day. Social media users may need closer to 500MB to 1GB per day. Travelers who tether, stream, or join video calls often need 1GB or more per day.\n\nThat means a weekend trip may fit within 1GB to 3GB, while a one-week trip often works best with around 5GB.",
        },
        {
          heading: "Where travelers underestimate data needs",
          body:
            "People often assume hotel WiFi will cover everything, forget how much hotspot use can consume, or underestimate how often they rely on maps in transit. Airports, train stations, ride apps, and translation all add up.\n\nChoosing slightly more data than your bare minimum estimate is usually safer.",
        },
        {
          heading: "A practical way to decide",
          body:
            "For solo travel and short trips, around 5GB is a useful starting point. Go lower only if your usage is clearly light. Choose more if you work online, tether devices, or watch video often.\n\nAutoWiFi Travel lets you compare trip length and plan size so you can choose a package that is less likely to run out mid-trip.",
        },
      ],
      faq: [
        {
          q: "How much data do I need for one week abroad?",
          a: "Around 5GB is a common fit for maps, messaging, and normal browsing. Choose more for hotspot use or heavy media consumption.",
        },
        {
          q: "Does Google Maps use a lot of data?",
          a: "It is relatively light compared with video, but frequent travel-day use can still add up over time.",
        },
        {
          q: "Should I choose a larger plan if I am unsure?",
          a: "Yes. Running out of data while traveling is usually more inconvenient than paying slightly more upfront.",
        },
      ],
      ctaTitle: "Find the right eSIM data size for your trip",
      ctaButton: "View eSIM Plans",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
  },
};

Object.assign(PRIORITY_GUIDE_RELATED, ESIM_PRIORITY_GUIDE_RELATED);

const PRIORITY_GUIDE_CONTENT: PriorityGuideMap = {
  ...PRIORITY_GUIDE_CONTENT_BASE,
  ...MINOR_TRAVEL_GUIDE_CONTENT,
};

const PRIORITY_GUIDE_CONTENT_WITH_ESIM: PriorityGuideMap = {
  ...PRIORITY_GUIDE_CONTENT,
  ...ESIM_PRIORITY_GUIDE_CONTENT,
};

export function getPriorityGuideContent(
  slug: string,
  locale: GuideLocale
): GuideArticleContent | null {
  const content = PRIORITY_GUIDE_CONTENT_WITH_ESIM[slug];
  if (!content) return null;
  return content[locale] ?? content.en ?? null;
}
