import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";
import { CUSTOM_MINOR_TRAVEL_GUIDE_CONTENT } from "./minorTravelGuideContent.custom";
import { HUB_GUIDE_CONTENT } from "./minorTravelGuideContent.hubs";
import { HUBS_JAPAN_KOREA_CONTENT } from "./minorTravelGuideContent.hubs-japan-korea";
import { HUBS_ASIA_CONTENT } from "./minorTravelGuideContent.hubs-asia";
import { HUBS_EUROPE_CONTENT } from "./minorTravelGuideContent.hubs-europe";
import { HUBS_AMERICAS_OTHERS_CONTENT } from "./minorTravelGuideContent.hubs-americas-others";
import { JAPAN_MINOR_TRAVEL_GUIDE_CONTENT } from "./minorTravelGuideContent.japan";
import { JAPAN_EXPANSION_GUIDE_CONTENT } from "./minorTravelGuideContent.japan-expansion";
import { JAPAN_3_GUIDE_CONTENT } from "./minorTravelGuideContent.japan-3";
import { KOREA_TAIWAN_GUIDE_CONTENT } from "./minorTravelGuideContent.korea-taiwan";
import { SOUTHEAST_ASIA_GUIDE_CONTENT } from "./minorTravelGuideContent.southeast-asia";
import { EUROPE_GUIDE_CONTENT } from "./minorTravelGuideContent.europe";
import { EUROPE_2_GUIDE_CONTENT } from "./minorTravelGuideContent.europe-2";
import { EUROPE_3_GUIDE_CONTENT } from "./minorTravelGuideContent.europe-3";
import { AMERICAS_OTHERS_GUIDE_CONTENT } from "./minorTravelGuideContent.americas-others";
import { AMERICAS_2_GUIDE_CONTENT } from "./minorTravelGuideContent.americas-2";
import { AMERICAS_OCEANIA_3_GUIDE_CONTENT } from "./minorTravelGuideContent.americas-oceania-3";
import { ASIA_2_GUIDE_CONTENT } from "./minorTravelGuideContent.asia-2";
import { ASIA_3_GUIDE_CONTENT } from "./minorTravelGuideContent.asia-3";
import { OCEANIA_MIDEAST_AFRICA_GUIDE_CONTENT } from "./minorTravelGuideContent.oceania-mideast-africa";
import { MINOR_GUIDE_CONFIG_OVERRIDES } from "./minorTravelGuideOverrides";
import { MINOR_GUIDE_ENRICHMENTS } from "./minorTravelGuideEnrichments";

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

type MinorGuideCluster = "yanaka" | "kiyosumi" | "kuramae" | "tram";

type MinorGuideClusterCopy = {
  xDescriptionJa: string;
  xDescriptionEn: string;
  foodJa: string;
  foodEn: string;
  weatherJa: string;
  weatherEn: string;
  transportJa: string;
  transportEn: string;
};

type MinorGuideLocaleConfig = {
  title: string;
  description: string;
  lead: string;
  route: string;
  focus: string;
  bestFor: string;
  avoid: string;
  extension: string;
  timeNeeded: string;
  // Per-article enrichment fields. Optional so we can roll out incrementally
  // without breaking existing entries; buildSections falls back to the generic
  // template paragraphs when these are missing.
  neighborhoodCharacter?: string;
  concreteRoute?: string;
  namedStops?: { name: string; note: string }[];
  localMistakes?: string;
  extraFaqs?: { q: string; a: string }[];
};

type MinorGuideConsistencyChecks = {
  requiredTextTerms?: Partial<Record<GuideLocale, string[]>>;
  requiredVisualTerms?: Partial<Record<GuideLocale, string[]>>;
};

type MinorGuideConfig = {
  cluster: MinorGuideCluster;
  galleryStart: number;
  embedStart: number;
  heroImage: GuideMediaImage;
  galleryOverride?: GuideMediaImage[];
  xEmbedsOverride?: Partial<Record<GuideLocale, GuideXEmbed[]>>;
  copyOverride?: Partial<MinorGuideClusterCopy>;
  photoFocusOverride?: Partial<Record<GuideLocale, string>>;
  consistencyChecks?: MinorGuideConsistencyChecks;
  ja: MinorGuideLocaleConfig;
  en: MinorGuideLocaleConfig;
};

type MinorGuideConfigOverride = Omit<Partial<MinorGuideConfig>, "ja" | "en"> & {
  ja?: Partial<MinorGuideLocaleConfig>;
  en?: Partial<MinorGuideLocaleConfig>;
};

const JA_CTA = {
  ctaTitle: "東京旅行の準備をまとめて確認する",
  ctaButton: "旅の準備を見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const EN_CTA = {
  ctaTitle: "See the essentials for Tokyo trip prep",
  ctaButton: "View travel prep",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

function commonsFileUrl(fileTitle: string) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replace(/ /g, "_"))}`;
}

function commonsImage(
  fileTitle: string,
  src: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
): GuideMediaImage {
  return {
    src,
    alt,
    width,
    height,
    caption,
    creditLabel: "Photo: Wikimedia Commons contributors",
    creditUrl: commonsFileUrl(fileTitle),
  };
}

const COMMONS_THUMB_WIDTHS = [120, 250, 330, 500, 960, 1280, 1920, 3840] as const;

function normalizeCommonsThumbWidth(requestedWidth: number) {
  return COMMONS_THUMB_WIDTHS.reduce((closest, candidate) => {
    const candidateDistance = Math.abs(candidate - requestedWidth);
    const closestDistance = Math.abs(closest - requestedWidth);
    return candidateDistance < closestDistance ? candidate : closest;
  }, COMMONS_THUMB_WIDTHS[0]);
}

function commonsThumbUrl(fileTitle: string, thumbWidth = 1280) {
  const normalized = fileTitle.replace(/^File:/, "").replace(/ /g, "_");
  const hash = createHash("md5").update(normalized).digest("hex");
  const encoded = encodeURIComponent(normalized);
  const normalizedThumbWidth = normalizeCommonsThumbWidth(thumbWidth);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash[0]}/${hash.slice(0, 2)}/${encoded}/${normalizedThumbWidth}px-${encoded}`;
}

function commonsThumbImage(
  fileTitle: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
  thumbWidth = 1280,
): GuideMediaImage {
  return commonsImage(fileTitle, commonsThumbUrl(fileTitle, thumbWidth), width, height, alt, caption);
}

function rotatePick<T>(items: T[], start: number, count: number) {
  return Array.from({ length: count }, (_, index) => items[(start + index) % items.length]);
}

function uniqueBy<T>(items: T[], getKey: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function joinList(locale: GuideLocale, values: string[]) {
  if (locale === "ja") {
    return values.join("、");
  }
  if (values.length <= 1) {
    return values[0] ?? "";
  }
  return `${values.slice(0, -1).join(", ")} and ${values.at(-1)}`;
}

const CLUSTER_COPY: Record<MinorGuideCluster, MinorGuideClusterCopy> = {
  yanaka: {
    xDescriptionJa: "X の埋め込みは毎回同じリンクではなく、谷中、根津、千駄木、文京寄りの街歩きと相性が近い投稿だけを入れています。",
    xDescriptionEn: "These embeds are no longer the same repeating city-wide links. They are limited to posts that fit the Yanaka, Nezu, and Sendagi side of Tokyo.",
    foodJa: "この系統の街歩きは、飲食を増やしすぎると街の良さが薄れます。甘味か喫茶を一回だけ丁寧に入れる方が、路地と商店街の印象がきれいに残ります。",
    foodEn: "These neighborhood walks flatten out if food stops take over. One deliberate cafe or sweets pause usually leaves a much stronger memory than turning the route into a list of places to eat.",
    weatherJa: "小雨にはかなり強い系統です。軒のある商店街、小さな店、神社や喫茶が近く、濡れても次の判断をしやすいからです。",
    weatherEn: "This cluster is relatively strong in light rain because covered shopping streets, shrine pauses, and small indoor stops stay close together.",
    transportJa: "出口、営業時間、臨時休業をたまに見る程度で十分ですが、その場で見られる状態だと歩きやすさが大きく変わります。日本向けeSIMを前もって入れておけば、紙の計画を増やさずに済みます。",
    transportEn: "You mostly need exits, opening hours, and the occasional detour check. Having Japan eSIM access available beforehand keeps those checks small and lets the walk stay flexible.",
  },
  kiyosumi: {
    xDescriptionJa: "X の埋め込みは清澄庭園や清澄公園の季節情報に寄せて、記事内容とズレないものだけへ差し替えています。",
    xDescriptionEn: "These embeds are tied to Kiyosumi Garden and Kiyosumi Park updates so the posts stay close to what the article is actually about.",
    foodJa: "コーヒーやベーカリーを軸にしつつも、一回しっかり座る休憩を決めるだけで十分です。飲食の件数より、庭園や水辺とのバランスを優先してください。",
    foodEn: "One clear coffee or bakery pause is enough here. The route gets better when garden space and neighborhood walking stay in balance instead of disappearing behind too many cafe decisions.",
    weatherJa: "小雨でも成立しますが、庭園や水辺の滞在は短くし、屋内の店を一つ増やすくらいの調整が実務的です。",
    weatherEn: "These routes still work in light rain, but they improve if you shorten the outdoor garden and waterside segments and let one indoor stop carry more of the day.",
    transportJa: "駅出口や店の混み具合をその場で微調整することが多いので、日本向けeSIMがあると並び直しや順番の入れ替えが楽になります。",
    transportEn: "Because these routes are often adjusted around queues, garden timing, and station exits, Japan eSIM access makes the on-the-go decisions much easier.",
  },
  kuramae: {
    xDescriptionJa: "X の埋め込みは蔵前、浅草橋、両国、橋まわりの小さな動きを拾う構成へ変えています。",
    xDescriptionEn: "These embeds now point to Kuramae, Asakusabashi, Ryogoku, and bridge-adjacent references instead of repeating the same Tokyo-wide posts.",
    foodJa: "ベーカリーか朝食か喫茶のどれか一回で十分です。蔵前系の街歩きは店を増やすほど慌ただしくなるので、小さな店と橋の余白を残してください。",
    foodEn: "One bakery, breakfast, or cafe stop is enough. Kuramae-style routes usually become less interesting once too many shop or food stops begin competing for the same half day.",
    weatherJa: "風の影響を受けやすい橋や川沿いがあるので、天気が悪い日は橋の滞在を短くして、店と店の間をつなぐ構成にしてください。",
    weatherEn: "Because bridge and river segments are part of the appeal, wind matters more here than in some other clusters. In rough weather, shorten the bridge time and rely more on the indoor neighborhood anchors.",
    transportJa: "橋を渡るか、どの駅へ抜けるか、店に並ぶかをその場で変えることが多いので、日本向けeSIMがあるとルートの完成度が上がります。",
    transportEn: "These routes often change around bridge choices, station exits, and queue decisions, which is exactly where Japan eSIM access improves the day in practice.",
  },
  tram: {
    xDescriptionJa: "X の埋め込みは都電の運行や沿線情報に寄せ、毎回同じ東京全体の投稿を流し込まない形にしました。",
    xDescriptionEn: "These embeds are operator and line references, not the same generic Tokyo-wide posts repeated across every page.",
    foodJa: "都電沿線は大きな飲食計画を立てるより、短く休む方が合います。街の速度を感じることが主役なので、食事でルートを重くしすぎないでください。",
    foodEn: "Tram-line routes usually work better with a short break than with a major food agenda. The goal is to feel the pace of the neighborhood, not to turn the route into a meal plan.",
    weatherJa: "停留場で待つ時間が長くなると急に疲れるので、小雨なら歩き中心、風が強い日は短い区間だけにすると安定します。",
    weatherEn: "Waiting at exposed stops can make these routes tiring quickly. In light rain, walking-led versions usually work better, and in wind the route should stay shorter.",
    transportJa: "都電の運行と停留場位置がその場で見られれば十分です。途中で乗るか歩くかを変えやすいので、日本向けeSIMと相性が良い系統です。",
    transportEn: "You mainly need live operator status and stop positions. Because you may switch between riding and walking mid-route, Japan eSIM access fits this cluster particularly well.",
  },
};

const CLUSTER_X_EMBEDS: Record<"ja" | "en", Record<MinorGuideCluster, GuideXEmbed[]>> = {
  ja: {
    yanaka: [
      { url: "https://x.com/NedujinjaOhgai/status/2039595160791875832", label: "根津神社まわりの新緑と庭の雰囲気" },
      { url: "https://x.com/NedujinjaOhgai/status/2039485998586032513", label: "舞姫の家と根津神社まわりの静かな景色" },
      { url: "https://x.com/NedujinjaOhgai/status/2039126840628097287", label: "つつじまつり前後の根津神社の空気感" },
      { url: "https://x.com/bunkyo_tokyo/status/2040950111237505084", label: "文京区公式の根津神社まつり案内" },
      { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "文京区のまち歩き視点に近い投稿" },
      { url: "https://x.com/himitsuno132/status/2040443489532686637", label: "谷中本店にもつながる下町の甘味スポット" },
      { url: "https://x.com/uenotoshogu/status/2040216484417573116", label: "上野側からつなげやすい春の立ち寄り先" },
    ],
    kiyosumi: [
      { url: "https://x.com/KiyosumiTeien/status/2040979030548299824", label: "清澄公園の桜と園路の空気感" },
      { url: "https://x.com/KiyosumiTeien/status/2040959759235621217", label: "清澄庭園の里桜と庭園の見どころ" },
      { url: "https://x.com/KiyosumiTeien/status/2040251219831349644", label: "雨の日の清澄公園の様子" },
      { url: "https://x.com/KiyosumiTeien/status/2039555359740940707", label: "清澄庭園のツツジと季節の変化" },
      { url: "https://x.com/KiyosumiTeien/status/2038851364806373643", label: "清澄庭園の花の見どころ" },
      { url: "https://x.com/KiyosumiTeien/status/2038844019741176181", label: "新芽と庭園の色合いの参考" },
      { url: "https://x.com/KiyosumiTeien/status/2039609841896018288", label: "庭園施設の使い方に関する案内" },
    ],
    kuramae: [
      { url: "https://x.com/kuramaeiine/status/2030792925832184027", label: "蔵前近くの朝食スポットの雰囲気" },
      { url: "https://x.com/kuramaeiine/status/2030463059828027671", label: "厩橋まわりの橋の景色" },
      { url: "https://x.com/kuramaeiine/status/2030088136227967190", label: "蔵前橋の見え方の参考" },
      { url: "https://x.com/kuramaeiine/status/2031940919310868637", label: "蔵前近辺の新しい飲食店の投稿" },
      { url: "https://x.com/icho8man/status/2033076363670991003", label: "浅草橋寄りの神社と朝市の空気" },
      { url: "https://x.com/icho8man/status/2031973197617447175", label: "浅草橋の駅近神社の雰囲気" },
      { url: "https://x.com/edotokyomuseum/status/2037429580269777351", label: "両国側の文化スポット案内" },
    ],
    tram: [
      { url: "https://x.com/toeikotsu_eng/status/2041063366857462042", label: "都電荒川線の最新運行状況 夕方便" },
      { url: "https://x.com/toeikotsu_eng/status/2040912370747551810", label: "都電荒川線の最新運行状況 朝便" },
      { url: "https://x.com/toeikotsu_eng/status/2040700978538909728", label: "都電荒川線の前日運行状況" },
      { url: "https://x.com/toeikotsu/status/2041063365712433193", label: "都営交通公式の都電運行情報" },
      { url: "https://x.com/toeikotsu/status/2040912368147010009", label: "朝の都電運行状況" },
      { url: "https://x.com/toeikotsu/status/2040700975892320344", label: "夕方の都電運行状況" },
    ],
  },
  en: {
    yanaka: [
      { url: "https://x.com/NedujinjaOhgai/status/2039595160791875832", label: "Nezu area greenery and garden atmosphere" },
      { url: "https://x.com/NedujinjaOhgai/status/2039485998586032513", label: "Calmer garden views around Nezu Shrine" },
      { url: "https://x.com/NedujinjaOhgai/status/2039126840628097287", label: "A seasonal Nezu Shrine reference" },
      { url: "https://x.com/bunkyo_tokyo/status/2040950111237505084", label: "Bunkyo ward update tied to Nezu Shrine" },
      { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "A neighborhood-watching post from Bunkyo" },
      { url: "https://x.com/himitsuno132/status/2040443489532686637", label: "A Yanaka-linked dessert stop reference" },
      { url: "https://x.com/uenotoshogu/status/2040216484417573116", label: "A Ueno-side spring stop that pairs well with Yanaka" },
    ],
    kiyosumi: [
      { url: "https://x.com/KiyosumiTeien/status/2040979030548299824", label: "Kiyosumi Park cherry blossoms and park atmosphere" },
      { url: "https://x.com/KiyosumiTeien/status/2040959759235621217", label: "Kiyosumi Garden seasonal blooms" },
      { url: "https://x.com/KiyosumiTeien/status/2040251219831349644", label: "A rainy-day look at Kiyosumi Park" },
      { url: "https://x.com/KiyosumiTeien/status/2039555359740940707", label: "Seasonal flowers around Kiyosumi Garden" },
      { url: "https://x.com/KiyosumiTeien/status/2038851364806373643", label: "A Kiyosumi garden-path reference" },
      { url: "https://x.com/KiyosumiTeien/status/2038844019741176181", label: "Fresh spring color inside Kiyosumi Garden" },
      { url: "https://x.com/KiyosumiTeien/status/2039609841896018288", label: "A practical Kiyosumi Garden facility update" },
    ],
    kuramae: [
      { url: "https://x.com/kuramaeiine/status/2030792925832184027", label: "A breakfast stop near Kuramae" },
      { url: "https://x.com/kuramaeiine/status/2030463059828027671", label: "A bridge-side view around Kuramae" },
      { url: "https://x.com/kuramaeiine/status/2030088136227967190", label: "Kuramae Bridge lighting and river mood" },
      { url: "https://x.com/kuramaeiine/status/2031940919310868637", label: "A new neighborhood opening near Kuramae" },
      { url: "https://x.com/icho8man/status/2033076363670991003", label: "A small shrine market scene near Asakusabashi" },
      { url: "https://x.com/icho8man/status/2031973197617447175", label: "A shrine reference close to the Kuramae side of east Tokyo" },
      { url: "https://x.com/edotokyomuseum/status/2037429580269777351", label: "A Ryogoku-side cultural event reference" },
    ],
    tram: [
      { url: "https://x.com/toeikotsu_eng/status/2041063366857462042", label: "Tokyo Sakura Tram latest evening service update" },
      { url: "https://x.com/toeikotsu_eng/status/2040912370747551810", label: "Tokyo Sakura Tram latest morning service update" },
      { url: "https://x.com/toeikotsu_eng/status/2040700978538909728", label: "A previous-day tram service reference" },
      { url: "https://x.com/toeikotsu/status/2041063365712433193", label: "Toei transport official tram status" },
      { url: "https://x.com/toeikotsu/status/2040912368147010009", label: "Morning tram operations from the operator" },
      { url: "https://x.com/toeikotsu/status/2040700975892320344", label: "Evening tram operations from the operator" },
    ],
  },
};

const CLUSTER_GALLERIES: Record<MinorGuideCluster, GuideMediaImage[]> = {
  yanaka: [
    commonsImage("File:2024-10-20 Tokyo, Yanaka 1.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2024-10-20_Tokyo%2C_Yanaka_1.jpg/1920px-2024-10-20_Tokyo%2C_Yanaka_1.jpg", 1600, 1067, "Yanaka side-street storefronts in Tokyo", "A low-rise Yanaka street scene that fits slow neighborhood walking."),
    commonsImage("File:2024-10-20 Tokyo, Yanaka 2.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2024-10-20_Tokyo%2C_Yanaka_2.jpg/1920px-2024-10-20_Tokyo%2C_Yanaka_2.jpg", 1600, 1067, "Shops and houses in Yanaka", "Small shopfronts and houses are part of why Yanaka feels readable on foot."),
    commonsImage("File:2024-10-20 Tokyo, Yanaka 4.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/2024-10-20_Tokyo%2C_Yanaka_4.jpg/1920px-2024-10-20_Tokyo%2C_Yanaka_4.jpg", 1600, 1067, "A quieter lane in Yanaka", "Narrower streets help this part of Tokyo feel slower than the main tourist districts."),
    commonsImage("File:2024-10-20 Tokyo, Yanaka 5.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/2024-10-20_Tokyo%2C_Yanaka_5.jpg/1920px-2024-10-20_Tokyo%2C_Yanaka_5.jpg", 1600, 1067, "Street view in Yanaka", "A simple residential-commercial mix is exactly what many travelers come here to see."),
    commonsImage("File:Tokyo - Yanaka 141A.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Tokyo_-_Yanaka_141A.jpg/1920px-Tokyo_-_Yanaka_141A.jpg", 1600, 1063, "An older Yanaka townscape", "Yanaka still rewards travelers who prefer lower-rise Tokyo over neon-heavy districts."),
    commonsImage("File:Komainu of Nezu Shrine left.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Komainu_of_Nezu_Shrine_left.jpg/1920px-Komainu_of_Nezu_Shrine_left.jpg", 1600, 2397, "Komainu statue at Nezu Shrine", "Nezu Shrine adds structure and atmosphere to Yanaka-side neighborhood walks."),
    commonsImage("File:Nezu Shrine 2010.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Nezu_Shrine_2010.jpg/1920px-Nezu_Shrine_2010.jpg", 1600, 1153, "Nezu Shrine grounds in Tokyo", "The shrine grounds are one of the easiest ways to add calm scenery to this cluster."),
    commonsImage("File:Nezu Shrine Festival @ Bunkyo (9975329594).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Nezu_Shrine_Festival_%40_Bunkyo_%289975329594%29.jpg/1920px-Nezu_Shrine_Festival_%40_Bunkyo_%289975329594%29.jpg", 1600, 1200, "Festival detail at Nezu Shrine", "Seasonal detail helps anchor the route without changing its quieter tone."),
    commonsImage("File:Nezu Shrine Festival @ Bunkyo (9975468166).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Nezu_Shrine_Festival_%40_Bunkyo_%289975468166%29.jpg/1920px-Nezu_Shrine_Festival_%40_Bunkyo_%289975468166%29.jpg", 1600, 1200, "Another Nezu Shrine detail", "Shrine texture and surrounding lanes are part of what make this cluster feel layered."),
    commonsImage("File:Omikuji at Nezu Shrine Tokyo.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Omikuji_at_Nezu_Shrine_Tokyo.jpg/1920px-Omikuji_at_Nezu_Shrine_Tokyo.jpg", 1600, 2397, "Omikuji at Nezu Shrine", "Small shrine details often land more strongly than one giant sightseeing stop."),
    commonsImage("File:Yanaka Ginza, Tokyo, Japan (6790100548).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Yanaka_Ginza%2C_Tokyo%2C_Japan_%286790100548%29.jpg/1920px-Yanaka_Ginza%2C_Tokyo%2C_Japan_%286790100548%29.jpg", 1600, 1067, "Yanaka Ginza shopping street", "Yanaka Ginza works best as one anchor inside the route, not the whole reason to do it."),
    commonsImage("File:Yanaka Ginza 2.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Yanaka_Ginza_2.jpg/1920px-Yanaka_Ginza_2.jpg", 1600, 1200, "Street scene at Yanaka Ginza", "A shopping-street segment gives the route a useful change of rhythm."),
  ],
  kiyosumi: [
    commonsImage("File:Bird @ Kiyosumi Garden (9227371118).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bird_%40_Kiyosumi_Garden_%289227371118%29.jpg/1920px-Bird_%40_Kiyosumi_Garden_%289227371118%29.jpg", 1600, 1200, "Birds and water at Kiyosumi Garden", "The garden works because it brings wildlife, water, and rest into the same short walk."),
    commonsImage("File:Kiyosumi Garden (11301989825).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Kiyosumi_Garden_%2811301989825%29.jpg/1920px-Kiyosumi_Garden_%2811301989825%29.jpg", 1600, 1200, "Pond and stepping stones at Kiyosumi Garden", "Stepping stones and water views help define the Kiyosumi side of the route."),
    commonsImage("File:Kiyosumi Garden (11302018475).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kiyosumi_Garden_%2811302018475%29.jpg/1920px-Kiyosumi_Garden_%2811302018475%29.jpg", 1600, 1200, "Garden path at Kiyosumi Garden", "A garden segment prevents the whole half day from becoming only cafes and transit."),
    commonsImage("File:Kiyosumi Garden (9224577121).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kiyosumi_Garden_%289224577121%29.jpg/1920px-Kiyosumi_Garden_%289224577121%29.jpg", 1600, 1200, "Rocks and water at Kiyosumi Garden", "The older garden layout is one of the strongest reasons to slow down in this part of Tokyo."),
    commonsImage("File:Kiyosumi Garden (9227377264).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Kiyosumi_Garden_%289227377264%29.jpg/1920px-Kiyosumi_Garden_%289227377264%29.jpg", 1600, 1200, "Bridge and pond in Kiyosumi Garden", "Even one waterside stop changes the rhythm of east-Tokyo walking."),
    commonsImage("File:Toei Monzen-nakacho-STA Gate.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Toei_Monzen-nakacho-STA_Gate.jpg/1920px-Toei_Monzen-nakacho-STA_Gate.jpg", 1600, 1067, "Monzen-Nakacho station gate", "Monzen-Nakacho is a strong extension if you want a broader east-Tokyo half day."),
  ],
  kuramae: [
    commonsImage("File:Kuramae JP Terrace Jutaku.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Kuramae_JP_Terrace_Jutaku.jpg/1920px-Kuramae_JP_Terrace_Jutaku.jpg", 1600, 2133, "Mid-rise buildings in Kuramae", "Modern east-Tokyo housing and small shops often sit side by side here."),
    commonsImage("File:Tokyo Skytree, view from Kuramae-bashi bridge on Sumida-gawa river. (14555040147).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Tokyo_Skytree%2C_view_from_Kuramae-bashi_bridge_on_Sumida-gawa_river._%2814555040147%29.jpg/1920px-Tokyo_Skytree%2C_view_from_Kuramae-bashi_bridge_on_Sumida-gawa_river._%2814555040147%29.jpg", 1600, 900, "View from Kuramae Bridge toward the river", "Bridge views are one of the cleanest ways to separate Kuramae from inland shopping districts."),
    commonsImage("File:Tokyo - Sumida river (2318963173).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Tokyo_-_Sumida_river_%282318963173%29.jpg/1920px-Tokyo_-_Sumida_river_%282318963173%29.jpg", 1600, 893, "Sumida River near the east-Tokyo route", "The river gives these routes breathing room that tighter districts often lack."),
    commonsImage("File:Sumida River + Tokyo Skytree @ Asakusa (13824463095).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Sumida_River_%2B_Tokyo_Skytree_%40_Asakusa_%2813824463095%29.jpg/1920px-Sumida_River_%2B_Tokyo_Skytree_%40_Asakusa_%2813824463095%29.jpg", 1600, 1200, "Asakusa and Sumida River view", "Asakusa-side river views help this cluster feel broader than a single shopping neighborhood."),
    commonsImage("File:Kokugikan-Wrestling-Hall-Ryogoku-Bridge-Tokyo-1935.png", "https://upload.wikimedia.org/wikipedia/commons/6/6e/Kokugikan-Wrestling-Hall-Ryogoku-Bridge-Tokyo-1935.png", 1646, 1053, "Historic Ryogoku and bridge context", "Ryogoku adds historical and cultural weight when you extend the walk beyond Kuramae."),
    commonsImage("File:Uitzicht op het kruispunt “Kuramae 1-chme” in de wijk Tait in Tokio, kijkend naar het westnoordwesten, -zondag 20 november 2022 10：32.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Uitzicht_op_het_kruispunt_%E2%80%9CKuramae_1-ch%C5%8Dme%E2%80%9D_in_de_wijk_Tait%C5%8D_in_Tokio%2C_kijkend_naar_het_westnoordwesten%2C_-zondag_20_november_2022_10%EF%BC%9A32.jpg/1920px-Uitzicht_op_het_kruispunt_%E2%80%9CKuramae_1-ch%C5%8Dme%E2%80%9D_in_de_wijk_Tait%C5%8D_in_Tokio%2C_kijkend_naar_het_westnoordwesten%2C_-zondag_20_november_2022_10%EF%BC%9A32.jpg", 1600, 900, "Kuramae 1-chome intersection", "Intersections and side streets do most of the work on this cluster of routes."),
  ],
  tram: [
    commonsImage("File:Toden-Arakawa-Line Asukayama.jpg", "https://upload.wikimedia.org/wikipedia/commons/4/46/Toden-Arakawa-Line_Asukayama.jpg", 640, 480, "Toden Arakawa Line near Asukayama", "The tram itself matters less than the neighborhood scale it preserves."),
    commonsImage("File:Toden Arakawa Line (12432172594).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Toden_Arakawa_Line_%2812432172594%29.jpg/1920px-Toden_Arakawa_Line_%2812432172594%29.jpg", 1600, 1200, "A Toden Arakawa Line car in Tokyo", "Street-level rail is what makes this set of routes feel local and slow."),
    commonsImage("File:Toden Arakawa Line in Tokyo, Japan; August 2010.jpg", "https://upload.wikimedia.org/wikipedia/commons/4/43/Toden_Arakawa_Line_in_Tokyo%2C_Japan%3B_August_2010.jpg", 1920, 1440, "Toden Arakawa Line street view", "The line works best when it is part of the walk rather than the whole attraction."),
    commonsImage("File:Tokyo Sakura Tram Waseda Station Signage.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Tokyo_Sakura_Tram_Waseda_Station_Signage.jpg/1920px-Tokyo_Sakura_Tram_Waseda_Station_Signage.jpg", 1600, 1067, "Tokyo Sakura Tram signage", "Even route signage can help travelers understand how to structure a lighter day."),
    commonsImage("File:Tokyo Sakura tram (Toden Arakawa Line) 2019-04-05.webm", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Tokyo_Sakura_tram_%28Toden_Arakawa_Line%29_2019-04-05.webm/1920px--Tokyo_Sakura_tram_%28Toden_Arakawa_Line%29_2019-04-05.webm.jpg", 1600, 900, "Tokyo Sakura Tram moving through the city", "Movement through low-rise streets is the reason tram routes feel distinct."),
    commonsImage("File:Asukayama Park.jpg", "https://upload.wikimedia.org/wikipedia/commons/e/e6/Asukayama_Park.jpg", 1000, 666, "Asukayama Park", "Asukayama is a useful green pause for any tram-based half day."),
    commonsImage("File:Asukayama Park 19.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Asukayama_Park_19.jpg/1920px-Asukayama_Park_19.jpg", 1600, 1200, "Path inside Asukayama Park", "A park segment helps break up the rail and shopping-street sections."),
    commonsImage("File:Asukayama Park 24.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Asukayama_Park_24.jpg/1920px-Asukayama_Park_24.jpg", 1600, 1200, "Another view of Asukayama Park", "Asukayama gives the Oji side of the route room to breathe."),
    commonsImage("File:Asukayama Park 27.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asukayama_Park_27.jpg/1920px-Asukayama_Park_27.jpg", 1600, 1200, "Garden-style area at Asukayama Park", "This kind of pause is why tram routes do not feel like transit-only content."),
    commonsImage("File:Asukayama Park 28.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Asukayama_Park_28.jpg/1920px-Asukayama_Park_28.jpg", 1600, 2133, "Vertical view inside Asukayama Park", "A vertical park view helps show how much green the tram side can hold."),
    commonsImage("File:Machiya-nichome Station September 12 2021 various.jpeg", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Machiya-nichome_Station_September_12_2021_various.jpeg/1920px-Machiya-nichome_Station_September_12_2021_various.jpeg", 1600, 1200, "Machiya-Nichome station area", "Machiya adds the everyday north-east Tokyo feel that many visitors miss."),
    commonsImage("File:Machiya-nichome Station September 12 2021 various 04 48 50 465000.jpeg", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Machiya-nichome_Station_September_12_2021_various_04_48_50_465000.jpeg/1920px-Machiya-nichome_Station_September_12_2021_various_04_48_50_465000.jpeg", 1600, 1200, "Another Machiya-Nichome station view", "Machiya is useful when you want a quieter tram-line finish or starting point."),
  ],
};

const BASE_GUIDE_CONFIGS: Record<string, MinorGuideConfig> = {
  "quiet-tokyo-neighborhoods": {
    cluster: "yanaka",
    galleryStart: 0,
    embedStart: 0,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A calm Yanaka street with small cafes and low-rise storefronts in Tokyo", width: 1280, height: 853, caption: "Lower-rise streets and smaller shops are often what travelers remember most from quieter Tokyo.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
    ja: {
      title: "静かな東京の街歩きガイド",
      description: "大通りの定番観光ではなく、落ち着いた路地、小さな個人店、喫茶や散歩を楽しみたい人向けの東京街歩きガイドです。",
      lead: "静かな東京の良さは、派手なランドマークの代わりに歩行の速度が落ちることにあります。",
      route: "上野、谷中、根津、清澄白河、蔵前のうち、その日に相性の良い二地区をつなぐくらいの密度がちょうどよいです。",
      focus: "低い街並み、神社や庭園の余白、小さな店、雨でも崩れにくい商店街の使い分けがこのガイドの中心です。",
      bestFor: "定番観光の合間に、半日だけ空気を変えたい旅行者",
      avoid: "夜の華やかさや大量の買い物を一気に回収したい人",
      extension: "延ばすなら同じ温度の隣接地区へ、短縮するなら一地区を丁寧に使う方が成功します。",
      timeNeeded: "4〜6時間",
    },
    en: {
      title: "Quiet Tokyo Neighborhoods Guide",
      description: "A slower Tokyo guide for travelers who want calm streets, small shops, coffee stops, and walkable neighborhoods beyond the busiest districts.",
      lead: "The appeal of quieter Tokyo is not that nothing happens. It is that the city becomes easier to absorb once the pace drops.",
      route: "The strongest version usually links two neighborhoods such as Yanaka, Nezu, Kiyosumi-Shirakawa, or Kuramae instead of forcing too many districts into one day.",
      focus: "Low-rise streets, shrine or garden pauses, smaller shops, and rainy-day-friendly shopping streets are the real anchors here.",
      bestFor: "travelers who want one calmer half day between major Tokyo districts",
      avoid: "travelers who want nightlife intensity or heavy shopping as the main event",
      extension: "Extend into an adjacent neighborhood with a similar mood, or shorten by treating one district as the entire half day.",
      timeNeeded: "4 to 6 hours",
    },
  },
  "yanaka-nezu-sendagi-walk": {
    cluster: "yanaka",
    galleryStart: 2,
    embedStart: 1,
    heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "Nezu Shrine torii and greenery in Tokyo", width: 1280, height: 853, caption: "Shrine atmosphere and side-street walking stay close together here.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
    ja: {
      title: "谷中・根津・千駄木の半日街歩きガイド",
      description: "谷中・根津・千駄木を半日でゆるく回る、静かな東京街歩きのための実用ガイドです。",
      lead: "谷根千とひとまとめに呼ばれますが、実際には谷中、根津、千駄木で歩き方の重心が違います。",
      route: "根津駅か千駄木駅から入り、根津神社、へび道、谷中の路地、必要なら谷中銀座を一つの半日としてつなぐ構成が使いやすいです。",
      focus: "神社、寺町、路地、商店街が短い距離で切り替わるので、役割を分けて立ち寄るほど完成度が上がります。",
      bestFor: "古い東京を歩きたいが、無理に名所数を増やしたくない旅行者",
      avoid: "大きなランドマークだけを効率重視で見たい人",
      extension: "延ばすなら上野か西日暮里へ、短縮するなら谷中銀座を外しても十分成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Yanaka, Nezu, and Sendagi Half-Day Walk",
      description: "A slower half-day Tokyo route through Yanaka, Nezu, and Sendagi for travelers who want old-town streets, shrine stops, cafes, and a calmer pace.",
      lead: "Yanaka, Nezu, and Sendagi are often bundled together, but the route becomes much better once you let each section play a different role.",
      route: "The easiest structure is to enter through Nezu or Sendagi, use Nezu Shrine and Hebi-michi as anchors, then let Yanaka lanes and, if needed, Yanaka Ginza close the half day.",
      focus: "Shrine space, temple-side lanes, shopping-street texture, and quieter residential blocks all matter more than one single “must-see” point.",
      bestFor: "travelers who want old Tokyo texture without an attraction checklist",
      avoid: "travelers who mainly want major visual icons and heavy shopping",
      extension: "Extend toward Ueno or Nishi-Nippori, or shorten by dropping Yanaka Ginza entirely.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "kiyosumi-shirakawa-walk": {
    cluster: "kiyosumi",
    galleryStart: 0,
    embedStart: 0,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "A peaceful pond and greenery at Kiyosumi Garden in Tokyo", width: 1280, height: 960, caption: "Coffee stops and quieter green spaces stay close together here.", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
    ja: {
      title: "清澄白河のコーヒーとギャラリー街歩き",
      description: "清澄白河でコーヒー、ギャラリー、庭園まわりの静かな時間を組み立てる街歩きガイドです。",
      lead: "清澄白河はコーヒーの街として有名ですが、実際には庭園と水辺の余白が入ることで半日として完成します。",
      route: "清澄白河駅から入り、庭園、カフェ、ギャラリー感のある通り、水辺のいずれかを二つか三つつなぐ形がもっとも扱いやすいです。",
      focus: "店の数よりも、庭園と街区のバランス、店に入らない時間の気持ちよさ、駅から一歩出た後の空気が重要です。",
      bestFor: "コーヒーも見たいが、それだけでは終わらせたくない旅行者",
      avoid: "人気店を大量に巡ることを主目的にしたい人",
      extension: "延ばすなら門前仲町か森下、短縮するなら庭園かカフェのどちらか一方を主役にするとまとまります。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Kiyosumi-Shirakawa Coffee and Gallery Walk",
      description: "A practical guide to Kiyosumi-Shirakawa for travelers who want coffee stops, small galleries, slower streets, and a calm half-day in Tokyo.",
      lead: "Kiyosumi-Shirakawa is famous for coffee, but it only becomes a real half day once the garden and waterside rhythm are part of the plan.",
      route: "Start near the station and connect two or three anchors such as Kiyosumi Garden, one cafe, one gallery-like street, and one waterside or bridge segment.",
      focus: "The balance between curated stops and unprogrammed streets matters much more than the number of cafes you manage to enter.",
      bestFor: "travelers who want coffee and design atmosphere without losing the slower east-Tokyo mood",
      avoid: "travelers who want a high-volume cafe crawl",
      extension: "Extend toward Monzen-Nakacho or Morishita, or shorten by making either the garden or the cafe stop the clear center.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "kuramae-walk": {
    cluster: "kuramae",
    galleryStart: 0,
    embedStart: 0,
    heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "Kuramae Shrine in Tokyo", width: 1600, height: 1067, caption: "Kuramae works when you let smaller streets and modest stops control the pace.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
    ja: {
      title: "蔵前の文具と器とベーカリー街歩き",
      description: "蔵前で文具、器、ベーカリー、小さな店を静かに回るための街歩きガイドです。",
      lead: "蔵前の良さは、店そのものより、店と店の間の通りにあります。",
      route: "蔵前駅から入り、小さな店、ベーカリー、橋の景色、一本裏の通りを組み合わせると半日として綺麗にまとまります。",
      focus: "文具や器の店を見つつも、交差点、橋、駅の出入り、浅草橋側への抜けなど、街そのものの切り替わりが主役です。",
      bestFor: "東東京で少し静かな買い物と街歩きを両立したい旅行者",
      avoid: "有名店だけを詰め込んで短時間で消化したい人",
      extension: "延ばすなら両国か浅草橋、短縮するなら橋を減らして蔵前駅周辺だけでも成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Kuramae Walk for Stationery, Ceramics, and Bakeries",
      description: "A low-key Kuramae guide for travelers who want stationery shops, ceramics, bakeries, and a calmer shopping walk near Asakusa.",
      lead: "Kuramae becomes memorable once you stop treating it as a shopping list and start reading it as a sequence of smaller streets.",
      route: "Enter through Kuramae Station and connect a few small shops, one bakery or breakfast stop, one bridge view, and one back-street segment.",
      focus: "Station access, small-scale retail, intersections, and river-adjacent blocks matter more than any one named stop.",
      bestFor: "travelers who want a calmer east-Tokyo shopping walk",
      avoid: "travelers who want a dense attraction checklist",
      extension: "Extend toward Ryogoku or Asakusabashi, or shorten by staying on the Kuramae station side.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "tokyo-tram-line-stops": {
    cluster: "tram",
    galleryStart: 0,
    embedStart: 0,
    heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "Toden tram near Asukayama in Tokyo", width: 1800, height: 1200, caption: "The tram line matters because it keeps the city feeling closer to street level and easier to absorb on foot.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
    ja: {
      title: "都電沿線の静かな東京街歩き",
      description: "都電沿線の静かな街をつないで歩きたい人向けの、少しローカル寄りの東京散歩ガイドです。",
      lead: "都電沿線の魅力は、路面電車そのものより、路面電車が似合う街のスケールにあります。",
      route: "王子、飛鳥山、町屋などから一つか二つの区間を選び、都電を見送る時間と歩く時間を混ぜる構成が向いています。",
      focus: "停留場、公園、生活道路、短い商店街、そして都電が街の中を抜ける瞬間がこのガイドの主役です。",
      bestFor: "少しローカルな東京を半日で歩いてみたい旅行者",
      avoid: "派手な名所を短時間でたくさん回りたい人",
      extension: "延ばすなら一駅分だけ、短縮するなら一つの停留場間だけ歩いて終えても十分です。",
      timeNeeded: "2.5〜4時間",
    },
    en: {
      title: "Quiet Tokyo Tram-Line Stops Guide",
      description: "A guide to calmer Tokyo neighborhoods along the tram line, useful for travelers who want a more local-feeling city walk.",
      lead: "The appeal of the tram-line neighborhoods is not only the tram itself. It is the street scale the tram preserves.",
      route: "Choose one or two segments around Oji, Asukayama, or Machiya and mix walking time with a short tram ride or a few passing-tram moments.",
      focus: "Stops, park edges, local streets, and the moments where the tram cuts through everyday Tokyo are what matter here.",
      bestFor: "travelers who want a lower-key, more local-feeling Tokyo half day",
      avoid: "travelers who mainly want major attractions and dense visual icons",
      extension: "Extend by one tram segment if it still feels calm, or shorten by making one inter-stop walk the whole route.",
      timeNeeded: "2.5 to 4 hours",
    },
  },
  "rainy-day-tokyo-neighborhoods": {
    cluster: "yanaka",
    galleryStart: 5,
    embedStart: 4,
    heroImage: { src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg", alt: "Yomise-dori shopping street in Tokyo", width: 1944, height: 2592, caption: "Rainy Tokyo is often better in neighborhoods where you can walk a little, pause a little, and keep moving.", creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG" },
    ja: {
      title: "雨の日の東京で歩きやすい静かな街ガイド",
      description: "雨の日でも歩きやすい、商店街や喫茶、軒のある通りを中心にした東京のマイナー街歩きガイドです。",
      lead: "雨の日の東京は、全部を屋内へ逃がすより、雨に強い街を選んだ方が半日としてきれいにまとまります。",
      route: "千駄木、根津、清澄白河、蔵前のように、次の休憩先が近いエリアを一つか二つつなぐ構成が向いています。",
      focus: "よみせ通りのような商店街、短く入れる神社や庭園、座れる喫茶とベーカリーが軸になります。",
      bestFor: "雨の日でも少しだけ街歩きを残したい旅行者",
      avoid: "長い川沿いや広い公園を歩き続けたい人",
      extension: "延ばすより短く切る方が成功します。商店街一つ、休憩一つ、寄り道一つで十分です。",
      timeNeeded: "2.5〜4時間",
    },
    en: {
      title: "Rainy-Day Quiet Tokyo Neighborhoods Guide",
      description: "A practical rainy-day Tokyo guide built around shopping streets, cafe pauses, and lower-pressure neighborhoods that still work when the weather turns.",
      lead: "Rainy Tokyo does not need to become an all-indoor day if you choose the right neighborhoods.",
      route: "Use one or two areas such as Sendagi, Nezu, Kiyosumi-Shirakawa, or Kuramae where covered streets and indoor pauses stay close together.",
      focus: "Shopping-street spines, short shrine or garden stops, and easy cafe resets are what make the route work.",
      bestFor: "travelers who want to keep some neighborhood walking in the plan during bad weather",
      avoid: "long exposed walks along wide parks or river edges",
      extension: "Rainy-day versions usually get better when they stay shorter and more selective.",
      timeNeeded: "2.5 to 4 hours",
    },
  },
  "ueno-to-yanaka-walk": {
    cluster: "yanaka",
    galleryStart: 4,
    embedStart: 2,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A calm Yanaka street with small cafes and low-rise storefronts in Tokyo", width: 1280, height: 853, caption: "This route works because the city visibly slows down once you leave Ueno behind.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
    ja: {
      title: "上野から谷中へ抜ける静かな街歩き",
      description: "上野のにぎわいを抜けて谷中側へ温度を落とす、外国人旅行者向けの半日街歩きガイドです。",
      lead: "上野から谷中へ抜けると、東京の速度がかなりはっきり変わります。",
      route: "上野駅か上野公園外縁から入り、寺町や谷中の路地を通って日暮里か谷中銀座側へ抜ける構成が扱いやすいです。",
      focus: "上野の続きではなく、上野から静かな東京へ切り替わる境目を見ることがこのルートの核心です。",
      bestFor: "上野を見た日にもう半日だけ静かな東京を足したい旅行者",
      avoid: "上野公園の大型施設を全部同日に回したい人",
      extension: "延ばすなら根津や西日暮里へ、短縮するなら谷中銀座を外しても成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Ueno to Yanaka Walk Guide",
      description: "A half-day route that lets travelers leave Ueno behind and ease into Yanaka for a noticeably calmer Tokyo neighborhood walk.",
      lead: "The strongest part of this route is the speed change once Ueno starts to fade and Yanaka begins to take over.",
      route: "Enter from Ueno Station or the park edge, move through temple-side blocks and Yanaka lanes, and close near Nippori or the Yanaka Ginza side.",
      focus: "The route is about the transition from major-district Tokyo into quieter neighborhood Tokyo, not about treating Yanaka as just another add-on.",
      bestFor: "travelers who want one calmer half day after a partial Ueno visit",
      avoid: "travelers who want to exhaust all of Ueno first",
      extension: "Extend toward Nezu or Nishi-Nippori, or shorten by dropping Yanaka Ginza.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "nezu-sendagi-morning-walk": {
    cluster: "yanaka",
    galleryStart: 6,
    embedStart: 3,
    heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "Nezu Shrine torii and greenery in Tokyo", width: 1280, height: 853, caption: "Nezu and Sendagi work best as a calm morning sequence rather than a crowded midday stop.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
    ja: {
      title: "根津・千駄木の朝散歩ガイド",
      description: "根津と千駄木を朝の時間帯に歩くための、静かな東京の半日ガイドです。",
      lead: "根津と千駄木は、昼以降より朝の方が良さが見えやすい東京エリアです。",
      route: "根津駅か千駄木駅から入り、神社、へび道、商店街、小さな喫茶を朝の時間帯に一つの流れとしてつなぎます。",
      focus: "店が全部開いていなくても、街の空気が整って見える時間帯そのものがこのルートの価値です。",
      bestFor: "朝のうちに静かな東京を一つ入れたい旅行者",
      avoid: "夕方以降のにぎわいを主役にしたい人",
      extension: "延ばすなら谷中へ、短縮するなら根津神社と周辺の路地だけでも成立します。",
      timeNeeded: "2.5〜3.5時間",
    },
    en: {
      title: "Nezu and Sendagi Morning Walk Guide",
      description: "A slower morning route through Nezu and Sendagi for travelers who want a quieter Tokyo half day before the city fully speeds up.",
      lead: "Nezu and Sendagi make unusual sense in the morning, before they start reading as standard sightseeing.",
      route: "Start from Nezu or Sendagi Station and connect one shrine segment, one lane segment, one shopping-street segment, and one small morning break.",
      focus: "The route is centered on how the area feels before the day fully opens, not on how many businesses you can enter.",
      bestFor: "travelers who want one calm Tokyo morning before a busier afternoon",
      avoid: "travelers who want an evening-led version of this area",
      extension: "Extend toward Yanaka, or shorten by keeping Nezu Shrine and the nearest lanes as the full route.",
      timeNeeded: "2.5 to 3.5 hours",
    },
  },
  "monzen-nakacho-fukagawa-walk": {
    cluster: "kiyosumi",
    galleryStart: 3,
    embedStart: 2,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "A peaceful pond and greenery at Kiyosumi Garden in Tokyo", width: 1280, height: 960, caption: "This side of Tokyo works when temple atmosphere, water, and slower local streets stay in the same half day.", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
    ja: {
      title: "門前仲町と深川の半日街歩き",
      description: "門前仲町と深川の寺社、水辺、生活街をゆるくつなぐ東東京の半日ガイドです。",
      lead: "門前仲町と深川は、清澄白河よりも生活街の温度が前に出る東東京です。",
      route: "門前仲町駅から入り、寺社、門前町、水辺、場合によっては清澄方面への接続を半日でつなぐと綺麗にまとまります。",
      focus: "寺社だけでなく、その外側にある生活街と橋や川の余白まで含めて東東京を見ることがこのルートの軸です。",
      bestFor: "寺社と生活街の両方を見たい東東京好きの旅行者",
      avoid: "有名店だけで半日を埋めたい人",
      extension: "延ばすなら清澄白河、短縮するなら門前仲町側だけで十分成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Monzen-Nakacho and Fukagawa Walk Guide",
      description: "A practical east-Tokyo half day linking Monzen-Nakacho and Fukagawa through shrine space, local streets, and waterside edges.",
      lead: "Monzen-Nakacho and Fukagawa feel more lived-in than Kiyosumi-Shirakawa, and that difference is what makes the route useful.",
      route: "Start at Monzen-Nakacho Station and connect shrine space, town streets, one waterside segment, and, if wanted, a light extension toward Kiyosumi.",
      focus: "The important move is to step beyond the religious core and let the surrounding neighborhood explain why east Tokyo feels layered.",
      bestFor: "travelers who want both shrine atmosphere and local east-Tokyo streets",
      avoid: "a route built only around famous food or one attraction",
      extension: "Extend toward Kiyosumi-Shirakawa, or shorten by making Monzen-Nakacho and one Fukagawa-side street segment the whole route.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "asakusa-kuramae-sumida-walk": {
    cluster: "kuramae",
    galleryStart: 3,
    embedStart: 2,
    heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "Kuramae Shrine in Tokyo", width: 1600, height: 1067, caption: "This route works when Asakusa opens the half day and Kuramae slows it back down.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
    ja: {
      title: "浅草・蔵前・隅田川の半日街歩き",
      description: "浅草の外縁から蔵前、隅田川沿いへ抜ける、少し静かめの東東京半日ガイドです。",
      lead: "浅草の密度をそのまま受け止めず、川沿いと蔵前へ逃がすことで東東京の半日がぐっと整います。",
      route: "浅草の外縁か蔵前駅側から入り、川沿い、橋、小さな店を軸に組み立て、浅草は必要な分だけ使う形が向いています。",
      focus: "浅草をゼロにするのではなく、浅草の外側から東東京の静かな部分へ重心をずらすことがこのガイドの目的です。",
      bestFor: "浅草も見たいが、人の多さで一日を終えたくない旅行者",
      avoid: "仲見世や雷門のど真ん中を長く歩きたい人",
      extension: "延ばすなら両国か浅草橋、短縮するなら橋を一つ減らして蔵前側に寄せてください。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Asakusa, Kuramae, and Sumida River Walk Guide",
      description: "A practical east-Tokyo half day that uses the quieter edges of Asakusa, the Sumida River, and Kuramae instead of staying in the densest tourist flow.",
      lead: "The route works best when Asakusa is treated as context, not the whole day.",
      route: "Enter from outer Asakusa or the Kuramae side, then use the river edge, one bridge, and smaller Kuramae streets as the main structure.",
      focus: "The route is about shifting weight from the busiest Asakusa axis into the calmer east-Tokyo blocks around it.",
      bestFor: "travelers who want some Asakusa context without giving the whole half day to the crowd",
      avoid: "travelers who want the main shrine approach to be the center of the route",
      extension: "Extend toward Ryogoku or Asakusabashi, or shorten by keeping the walk concentrated on Kuramae and one bridge segment.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "oji-asukayama-tram-walk": {
    cluster: "tram",
    galleryStart: 3,
    embedStart: 2,
    heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "Toden tram near Asukayama in Tokyo", width: 1800, height: 1200, caption: "Tram-line routes work best when the streetcar adds neighborhood atmosphere rather than becoming a checklist of stops.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
    ja: {
      title: "王子・飛鳥山の都電街歩き",
      description: "飛鳥山公園と都電沿線を中心に、王子側の静かな東京を歩く半日ガイドです。",
      lead: "王子と飛鳥山は、都電沿線の中でも公園の余白が分かりやすく入る組み合わせです。",
      route: "王子駅か飛鳥山から入り、公園、停留場、王子側の通りを半日でゆるくつなぐと綺麗にまとまります。",
      focus: "都電だけでなく、公園から街へ戻る時の速度変化まで含めて見られるのがこのルートの良さです。",
      bestFor: "都電も公園も一つずつ入れたい旅行者",
      avoid: "停留場をたくさん回る乗り鉄ルートにしたい人",
      extension: "延ばすなら一駅分、短縮するなら飛鳥山公園を主役にしたまま都電を補助線として使う形が向いています。",
      timeNeeded: "2.5〜4時間",
    },
    en: {
      title: "Oji and Asukayama Tram Walk Guide",
      description: "A half-day route around Asukayama Park and the Tokyo Sakura Tram for travelers who want a quieter north-side Tokyo walk.",
      lead: "Oji and Asukayama are one of the clearest tram-line combinations because the park immediately gives the route breathing room.",
      route: "Enter through Oji or Asukayama and link one park segment, one tram segment, and one neighborhood segment rather than trying to do too much.",
      focus: "The value comes from moving between park calm, tram movement, and ordinary streets at close range.",
      bestFor: "travelers who want tram atmosphere plus one strong green pause",
      avoid: "traveler plans built around many stops or a rail-only checklist",
      extension: "Extend by one more tram segment, or shorten by keeping Asukayama central and the tram secondary.",
      timeNeeded: "2.5 to 4 hours",
    },
  },
  "nishi-nippori-yanaka-walk": {
    cluster: "yanaka",
    galleryStart: 1,
    embedStart: 4,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A calm Yanaka street with small cafes and low-rise storefronts in Tokyo", width: 1280, height: 853, caption: "Starting from Nishi-Nippori makes it easier to reach Yanaka without the sharper pace shift that some travelers feel in Ueno.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
    ja: {
      title: "西日暮里から谷中へ歩くガイド",
      description: "西日暮里から谷中へ入り、低い街並みと路地を味わう半日街歩きガイドです。",
      lead: "西日暮里から谷中へ入ると、谷中が観光地より街として見えやすくなります。",
      route: "西日暮里駅から入り、寺町、谷中の路地、谷中銀座の手前までを丁寧につなぐ構成が向いています。",
      focus: "上野経由より初速が静かなので、谷中の入口を丁寧に使えることがこのルートの価値です。",
      bestFor: "谷中をできるだけ静かな入口から味わいたい旅行者",
      avoid: "上野と谷中を同じ密度で全部見たい人",
      extension: "延ばすなら根津方面、短縮するなら谷中銀座前で切っても成立します。",
      timeNeeded: "3時間前後",
    },
    en: {
      title: "Nishi-Nippori to Yanaka Walk Guide",
      description: "A half-day walk that enters Yanaka from Nishi-Nippori for a quieter, more neighborhood-first version of old Tokyo.",
      lead: "Entering from Nishi-Nippori makes Yanaka feel more like a neighborhood and less like a staged attraction.",
      route: "Start at Nishi-Nippori Station and use temple-side blocks, Yanaka lanes, and the run-up to Yanaka Ginza as the core sequence.",
      focus: "The key value is the softer entry into Yanaka, which lets the district reveal itself more gradually than the Ueno side does.",
      bestFor: "travelers who want the calmest possible entry into Yanaka",
      avoid: "plans that try to make Ueno and Yanaka equally dense on the same half day",
      extension: "Extend toward Nezu, or shorten before Yanaka Ginza if you want to keep the route quieter.",
      timeNeeded: "about 3 hours",
    },
  },
  "sendagi-yomise-dori-walk": {
    cluster: "yanaka",
    galleryStart: 7,
    embedStart: 5,
    heroImage: { src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg", alt: "Yomise-dori shopping street in Tokyo", width: 1944, height: 2592, caption: "Neighborhood routes that let you walk a little, pause a little, and keep moving are often the most useful ones in Tokyo.", creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG" },
    ja: {
      title: "千駄木とよみせ通りの街歩きガイド",
      description: "千駄木とよみせ通りを軸に、商店街と路地をつなぐ静かな東京の半日ガイドです。",
      lead: "千駄木とよみせ通りは、谷中よりさらに生活街寄りの空気を味わえる組み合わせです。",
      route: "千駄木駅から入り、よみせ通りを背骨にしつつ、横道や喫茶を一つ二つ差し込む構成が向いています。",
      focus: "商店街一本ではなく、商店街から一本入ったところの空気まで見ることがこのルートの肝です。",
      bestFor: "生活街の温度差や商店街の密度を見たい旅行者",
      avoid: "派手なランドマーク中心の散策をしたい人",
      extension: "延ばすなら根津へ、短縮するなら千駄木の商店街圏だけでも十分です。",
      timeNeeded: "2.5〜3.5時間",
    },
    en: {
      title: "Sendagi and Yomise-dori Walk Guide",
      description: "A quieter Tokyo half day centered on Sendagi and Yomise-dori, built around shopping-street texture and smaller side lanes rather than major attractions.",
      lead: "Sendagi and Yomise-dori lean even more toward everyday neighborhood atmosphere than Yanaka does.",
      route: "Start from Sendagi Station and use Yomise-dori as the spine while allowing two or three short side-lane detours and one quiet break.",
      focus: "The route becomes meaningful once you treat the main shopping street as a backbone and the surrounding side streets as the real texture.",
      bestFor: "travelers who prefer local shopping-street texture over famous visual icons",
      avoid: "plans centered on big signature landmarks",
      extension: "Extend toward Nezu, or keep the whole route inside Sendagi for a more everyday-neighborhood version.",
      timeNeeded: "2.5 to 3.5 hours",
    },
  },
  "morishita-kiyosumi-walk": {
    cluster: "kiyosumi",
    galleryStart: 6,
    embedStart: 4,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "A peaceful pond and greenery at Kiyosumi Garden in Tokyo", width: 1280, height: 960, caption: "Even one garden or waterside pause changes the rhythm of an east-Tokyo half day for the better.", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
    ja: {
      title: "森下から清澄白河へ歩く半日ガイド",
      description: "森下から清澄白河へつなぎ、東東京の生活街と庭園・喫茶を一緒に見る半日ガイドです。",
      lead: "森下から入ると、清澄白河が人気エリアではなく東東京の一部として見えやすくなります。",
      route: "森下駅から入り、生活街、橋や水辺、最後に清澄白河の庭園やカフェへ移る形が扱いやすいです。",
      focus: "前半の地味さと後半の整った感じの落差が、このガイドの一番大きな価値です。",
      bestFor: "清澄白河だけで終わらせず、東東京の生活感も少し感じたい旅行者",
      avoid: "最初から人気店だけを回りたい人",
      extension: "延ばすなら門前仲町、短縮するなら清澄白河に着いた時点で終えても成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Morishita to Kiyosumi-Shirakawa Walk Guide",
      description: "A slower east-Tokyo half day that starts in Morishita and ends in Kiyosumi-Shirakawa for a better balance of everyday streets and curated stops.",
      lead: "Starting in Morishita makes Kiyosumi-Shirakawa feel less like an isolated trend district and more like part of a broader east-Tokyo fabric.",
      route: "Start around Morishita Station, use quieter streets and one river-edge segment, then let Kiyosumi-Shirakawa hold the later garden or cafe pause.",
      focus: "The route works because the opening stays understated and the second half feels more earned as a result.",
      bestFor: "travelers who want some everyday east-Tokyo texture before the more polished Kiyosumi side",
      avoid: "jumping directly into the most famous cafes",
      extension: "Extend toward Monzen-Nakacho, or shorten by stopping once Kiyosumi-Shirakawa has delivered its main pause.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "ryogoku-kuramae-walk": {
    cluster: "kuramae",
    galleryStart: 6,
    embedStart: 4,
    heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "Kuramae Shrine in Tokyo", width: 1600, height: 1067, caption: "Bridge crossings and a Kuramae finish give this route a calmer east-Tokyo shape than many first-timer districts.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
    ja: {
      title: "両国から蔵前へ歩く半日ガイド",
      description: "橋の景色と蔵前の小さな店をつなぐ、東東京の少し落ち着いた半日街歩きガイドです。",
      lead: "両国から蔵前へ向かうと、橋をまたぐごとに東東京の空気が変わるのが分かります。",
      route: "両国駅側から入り、橋と川沿いを使って蔵前寄りの街区へ移り、小さな店で締める構成が向いています。",
      focus: "両国の文化的な重さと蔵前の軽さの切り替わりを歩きの中で感じることが主題です。",
      bestFor: "東東京の橋と街区の変化を見たい旅行者",
      avoid: "両国だけ、または蔵前だけを深く掘りたい人",
      extension: "延ばすなら浅草橋、短縮するなら蔵前駅で終えるのが綺麗です。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Ryogoku to Kuramae Walk Guide",
      description: "A practical east-Tokyo route from Ryogoku toward Kuramae for bridge views, craft stops, and a lower-key alternative to denser sightseeing districts.",
      lead: "Ryogoku to Kuramae is one of the clearest east-Tokyo walks for understanding how a bridge can reset the whole pace of a half day.",
      route: "Start near Ryogoku Station, use one or two bridge segments and a river edge, then let Kuramae hold the small-shop finish.",
      focus: "The route is built around the contrast between Ryogoku’s cultural weight and Kuramae’s lighter neighborhood texture.",
      bestFor: "travelers who want the outer edge of east-Tokyo culture without staying in one district all day",
      avoid: "routes that want to go very deep on Ryogoku alone or Kuramae alone",
      extension: "Extend toward Asakusabashi, or shorten by ending once Kuramae has taken over the route.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "machiya-arakawa-tram-walk": {
    cluster: "tram",
    galleryStart: 6,
    embedStart: 3,
    heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "Toden tram near Asukayama in Tokyo", width: 1800, height: 1200, caption: "Tram-line routes work best when the streetcar adds neighborhood atmosphere rather than becoming a checklist of stops.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
    ja: {
      title: "町屋と荒川の都電街歩きガイド",
      description: "町屋と都電沿線をつなぐ、少しローカルな北東東京の半日街歩きガイドです。",
      lead: "町屋と荒川側の都電沿線は、都電が生活のすぐ横を通っている感覚が特に強い区間です。",
      route: "町屋駅前か町屋二丁目から入り、停留場、生活道路、商店街を一つか二つの区間でまとめる形が向いています。",
      focus: "大きな名所より、都電が日常に近い距離で走ることそのものが記事の核になります。",
      bestFor: "定番の外側にある東京の日常を見たい旅行者",
      avoid: "写真映えする有名観光地だけを探したい人",
      extension: "延ばすなら町屋周辺でゆっくり、短縮するなら一駅分の歩きだけでも十分です。",
      timeNeeded: "2.5〜3.5時間",
    },
    en: {
      title: "Machiya and Arakawa Tram Walk Guide",
      description: "A local-feeling north-east Tokyo half day around Machiya and the tram line for travelers who want a quieter route with streetcar atmosphere.",
      lead: "The Machiya and Arakawa side of the tram line is one of the strongest places to feel how close daily-life Tokyo sits to the tracks.",
      route: "Start near Machiya-ekimae or Machiya-Nichome and use one or two tram-adjacent walking segments as the whole half day.",
      focus: "The route is centered on everyday Tokyo texture rather than on any one attraction or photographable icon.",
      bestFor: "travelers who want a quieter look at ordinary Tokyo outside the usual sightseeing frame",
      avoid: "travelers who only want famous landmarks or visual icons",
      extension: "Extend around Machiya if it still feels calm, or shorten to one inter-stop walk and end there.",
      timeNeeded: "2.5 to 3.5 hours",
    },
  },
  "hebi-michi-nezu-shrine-walk": {
    cluster: "yanaka",
    galleryStart: 0,
    embedStart: 0,
    heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "Nezu Shrine torii and greenery in Tokyo", width: 1280, height: 853, caption: "This route works best when Nezu Shrine sets the tone early and Hebi-michi keeps the pace quiet afterward.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
    ja: {
      title: "へび道と根津神社の朝寄り街歩きガイド",
      description: "根津神社からへび道へ抜ける、静かな東京の朝寄り半日ルートをまとめた実用ガイドです。",
      lead: "根津神社とへび道は近いのに、神社の整った空気と生活道路のやわらかさがきれいに切り替わります。",
      route: "根津駅から入り、根津神社を先に見てから、へび道と千駄木寄りの路地へ重心を移す構成がもっとも扱いやすいです。",
      focus: "鳥居や参道を“見どころ”として消費するだけでなく、その後に街の速度が落ちる瞬間まで含めて歩くことがこのルートの核になります。",
      bestFor: "朝のうちに静かな東京を一つ入れておきたい旅行者",
      avoid: "谷根千全域を一気に回収したい人",
      extension: "延ばすなら千駄木側の路地へ、短縮するなら根津神社とへび道だけで十分成立します。",
      timeNeeded: "2.5〜3.5時間",
    },
    en: {
      title: "Hebi-michi and Nezu Shrine Walk Guide",
      description: "A quieter Tokyo half-day route that links Nezu Shrine with Hebi-michi for travelers who want shrine atmosphere without losing the neighborhood feel.",
      lead: "Nezu Shrine and Hebi-michi sit close together, but the route only becomes good once you let the shrine mood give way to quieter lane walking.",
      route: "Enter from Nezu Station, use Nezu Shrine first, then shift the route toward Hebi-michi and the softer residential lanes on the Sendagi side.",
      focus: "The payoff is not just the shrine itself. It is the transition from formal approach space into side-street Tokyo within a very short walk.",
      bestFor: "travelers who want one calm Tokyo morning or an easier old-Tokyo half day",
      avoid: "travelers trying to cover the entire Yanesen area in one push",
      extension: "Extend toward Sendagi lanes, or shorten by keeping only Nezu Shrine and Hebi-michi as the route core.",
      timeNeeded: "2.5 to 3.5 hours",
    },
  },
  "yanaka-cemetery-and-cafe-walk": {
    cluster: "yanaka",
    galleryStart: 3,
    embedStart: 3,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A calm Yanaka street with small cafes and low-rise storefronts in Tokyo", width: 1280, height: 853, caption: "This version of Yanaka works when small cafes and longer low-rise stretches matter more than checklist sightseeing.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
    ja: {
      title: "谷中霊園まわりと喫茶の静かな街歩き",
      description: "谷中霊園まわりの静けさと小さな喫茶休憩を組み合わせる、落ち着いた東京半日ルートのガイドです。",
      lead: "谷中は商店街だけでなく、霊園まわりの余白を歩くと街の密度がほどけて見えてきます。",
      route: "日暮里か西日暮里側から入り、谷中霊園周辺の長い歩行区間を先に取り、その後で喫茶か小さな甘味休憩を一度入れる組み方が向いています。",
      focus: "にぎやかな谷中銀座より、低い街並みが長く続く区間と、その静けさを壊さない休憩の入れ方に価値があります。",
      bestFor: "人の多い観光地のあとに、落ち着いた東京を歩き直したい旅行者",
      avoid: "商店街や食べ歩きを主役にしたい人",
      extension: "延ばすなら根津寄りの路地へ、短縮するなら霊園周辺と喫茶一回だけでも十分です。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Yanaka Cemetery and Cafe Walk Guide",
      description: "A quieter Yanaka half-day route for travelers who want longer low-rise streets, cemetery-edge calm, and one deliberate cafe pause.",
      lead: "Yanaka feels very different once you stop centering the shopping street and let the cemetery-side calm shape the walk instead.",
      route: "Start from Nippori or Nishi-Nippori, take the longer cemetery-edge stretch first, then use one cafe or sweets stop to reset before finishing.",
      focus: "This route is less about commercial texture and more about the long, low-rise sections that make Yanaka feel open and slow by Tokyo standards.",
      bestFor: "travelers who want a calmer second look at old-Tokyo neighborhoods",
      avoid: "travelers who want shopping or snack-hopping to drive the whole half day",
      extension: "Extend toward Nezu-side lanes, or shorten by keeping the cemetery-edge section and one break as the whole outing.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "kiyosumi-garden-coffee-roasters-walk": {
    cluster: "kiyosumi",
    galleryStart: 5,
    embedStart: 4,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "A peaceful pond and greenery at Kiyosumi Garden in Tokyo", width: 1280, height: 960, caption: "This route works when the garden carries the first half and one or two roaster stops carry the rest.", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
    ja: {
      title: "清澄庭園とロースター街歩きガイド",
      description: "清澄庭園の余白と清澄白河のロースター文化を一つの半日にまとめる、静かな東東京ガイドです。",
      lead: "清澄白河の良さは、ロースター巡りの前に庭園の静けさを入れると、街の印象が一段きれいに整うことです。",
      route: "清澄庭園を先に置き、その後でロースターかベーカリーを一つか二つつなぐ構成にすると、歩きと休憩の比率がちょうどよくなります。",
      focus: "店の数よりも、庭園の余白からコーヒー街区へ空気が移る順番をどう作るかがこのガイドの軸です。",
      bestFor: "清澄白河でコーヒーを見たいが、街歩きとしても成立させたい旅行者",
      avoid: "短時間で人気店を大量に回りたい人",
      extension: "延ばすなら水辺側へ、短縮するなら庭園とロースター一軒だけでも十分まとまります。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Kiyosumi Garden and Coffee Roasters Walk",
      description: "A calmer Kiyosumi-Shirakawa half day for travelers who want Kiyosumi Garden first, then one or two roaster or bakery stops at a slower pace.",
      lead: "Kiyosumi-Shirakawa gets better once the garden comes before the coffee scene rather than after it.",
      route: "Start with Kiyosumi Garden, then let one or two roaster, bakery, or gallery-adjacent stops carry the second half of the walk.",
      focus: "The route is built around the order of moods: garden calm first, then coffee-street texture, instead of treating every stop like equal-weight curation.",
      bestFor: "travelers who want coffee in east Tokyo without losing the neighborhood rhythm",
      avoid: "travelers trying to maximize the number of famous cafes in a short window",
      extension: "Extend toward the waterside edge, or shorten by keeping the garden and one roaster as the full half day.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "kuramae-bridge-and-craft-walk": {
    cluster: "kuramae",
    galleryStart: 6,
    embedStart: 4,
    heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "Kuramae Shrine in Tokyo", width: 1600, height: 1067, caption: "Kuramae works best when bridge views and small craft stops balance each other instead of competing.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
    ja: {
      title: "蔵前の橋景色とクラフト店街歩き",
      description: "橋の景色と蔵前の小さなクラフト店をつなぐ、少し静かな東東京半日ルートのガイドです。",
      lead: "蔵前は店だけでなく、橋へ出たときに街の密度がほどけることで半日としての完成度が上がります。",
      route: "蔵前駅から入り、クラフト店や文具店を一つ二つ拾いながら、途中で橋の景色を必ず一回入れる構成が向いています。",
      focus: "買い物そのものより、店から川沿いへ抜けた時に東東京の余白が見えることがこのルートの価値です。",
      bestFor: "静かめの買い物と橋の景色を一つの半日にまとめたい旅行者",
      avoid: "有名店を何軒も回ることが主目的の人",
      extension: "延ばすなら浅草橋か隅田川沿い、短縮するなら蔵前駅周辺と橋一つだけでも成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Kuramae Bridge and Craft Walk Guide",
      description: "A lower-pressure Kuramae route for travelers who want small craft shops, stationery stops, and one or two bridge views in the same half day.",
      lead: "Kuramae becomes much stronger once the bridges are treated as part of the route logic instead of as quick photo breaks.",
      route: "Enter from Kuramae Station, take one or two craft or stationery stops, then use at least one bridge view to open the route back up.",
      focus: "The value is in the contrast between compact small-shop streets and the breathing room you get once the river and bridges enter the walk.",
      bestFor: "travelers who want calmer shopping and a little east-Tokyo river atmosphere",
      avoid: "travelers trying to rush through a long list of named stores",
      extension: "Extend toward Asakusabashi or the Sumida edge, or shorten by keeping the route on the Kuramae side with one bridge detour.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "waseda-omokagebashi-tram-walk": {
    cluster: "tram",
    galleryStart: 0,
    embedStart: 0,
    heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "Toden tram near Asukayama in Tokyo", width: 1800, height: 1200, caption: "A good tram-line walk uses the streetcar to set the pace, not to turn the route into transit trivia.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
    ja: {
      title: "早稲田と面影橋の都電街歩きガイド",
      description: "早稲田側から面影橋へかけて都電と街の速度を感じる、静かな東京半日ルートのガイドです。",
      lead: "都電沿線でも早稲田側は、停留場の近さと街の生活感が一体になって見えやすいエリアです。",
      route: "早稲田寄りから入り、停留場を一つか二つ区切りにしながら歩き、面影橋側で川や小さな休憩を入れる構成が扱いやすいです。",
      focus: "電車に乗ることより、路面電車が通る前提でできている街の速度と歩幅を感じることがこのルートの主題です。",
      bestFor: "都電沿線を少し静かな入口から試したい旅行者",
      avoid: "有名停留場を数多く回る鉄道中心の人",
      extension: "延ばすなら一停留場だけ、短縮するなら早稲田か面影橋のどちらか一方に寄せてください。",
      timeNeeded: "2.5〜3.5時間",
    },
    en: {
      title: "Waseda and Omokagebashi Tram Walk Guide",
      description: "A quieter Tokyo tram-line half day that links the Waseda side with Omokagebashi for travelers who want everyday streetcar atmosphere instead of a sightseeing checklist.",
      lead: "The Waseda side of the tram line works because the streetcar still feels embedded in ordinary neighborhood pace rather than separated from it.",
      route: "Start near Waseda, walk one or two stop-length segments, then let Omokagebashi-side river air or one short break close the route.",
      focus: "The point is not to ride as much as possible. It is to feel how the tram changes the scale and pace of the surrounding streets.",
      bestFor: "travelers who want to try a tram-line neighborhood without making the whole half day about rail fandom",
      avoid: "travelers chasing a long list of famous tram stops",
      extension: "Extend by one more stop if the day still feels light, or shorten by keeping either Waseda or Omokagebashi as the main anchor.",
      timeNeeded: "2.5 to 3.5 hours",
    },
  },
  "kichijoji-inokashira-park-morning": {
    cluster: "kiyosumi",
    galleryStart: 2,
    embedStart: 2,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg", alt: "A quiet green scene that fits a slower Tokyo morning", width: 1280, height: 960, caption: "A Kichijoji and Inokashira morning works when greenery and neighborhood streets carry more of the route than shopping intensity.", creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg" },
    ja: {
      title: "吉祥寺と井の頭公園の朝散歩ガイド",
      description: "吉祥寺の路地と井の頭公園を朝の時間帯でつなぐ、外国人旅行者向けの実用的な半日街歩きガイドです。",
      lead: "吉祥寺と井の頭公園は、東京の西側で朝の空気を無理なく使える数少ない半日ルートです。",
      route: "吉祥寺駅南口側から入り、混み始める前の商店街や裏通りを短く見てから、井の頭公園へ抜ける形が最も扱いやすいです。",
      focus: "買い物街の便利さと、公園に入った瞬間の落ち着きの落差がこのガイドのいちばん大きな価値です。",
      bestFor: "都心の密度より、少し住んでいる街に近い東京の朝を歩きたい旅行者",
      avoid: "朝から人気店や買い物先を詰め込み続ける動き方",
      extension: "延ばすなら公園滞在を長くし、短縮するなら井の頭公園の入口までで終えても十分成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Kichijoji and Inokashira Park Morning Walk",
      description: "A practical west-Tokyo morning route for foreign travelers who want Kichijoji side streets, Inokashira Park, and a slower local start.",
      lead: "Kichijoji and Inokashira Park are one of the easiest ways to use a Tokyo morning without forcing it into big-city density too early.",
      route: "Start from the south side of Kichijoji Station, use one or two quieter shopping or residential-adjacent lanes, then let Inokashira Park hold the second half.",
      focus: "The value comes from the contrast between convenient neighborhood retail and the calmer park atmosphere that follows it.",
      bestFor: "travelers who want a west-Tokyo morning that feels lived-in rather than headline-driven",
      avoid: "turning the route into a store list from the start of the morning",
      extension: "Extend by lingering longer in the park, or shorten by ending once the Inokashira side has delivered its main calm stretch.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "kagurazaka-backstreets-walk": {
    cluster: "yanaka",
    galleryStart: 4,
    embedStart: 1,
    heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "A shrine-adjacent Tokyo scene that fits older lane walking", width: 1280, height: 853, caption: "Kagurazaka works best when the main slope becomes only an entry point and the quieter side lanes do the real work of the half day.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
    ja: {
      title: "神楽坂の裏通りと路地歩きガイド",
      description: "神楽坂通りの表通りだけで終わらせず、石畳の路地や神社まわりまで歩きたい人向けの半日ガイドです。",
      lead: "神楽坂は坂の表通りだけを見るより、一本入った路地や横丁に入って初めて街の輪郭が見えます。",
      route: "飯田橋寄りから上り、メインストリートは短く使い、石畳や寺社まわりの細い道へ何度か折れる構成が向いています。",
      focus: "表通りの便利さと、裏に入った瞬間の静けさの差をどう半日で読むかが記事の主題です。",
      bestFor: "大きな観光地ではないけれど、中央東京で歩く質を上げたい旅行者",
      avoid: "神楽坂通りの飲食店だけを順番に回る計画",
      extension: "延ばすなら赤城神社側、短縮するなら石畳の区間を一つ拾って終えても成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Kagurazaka Backstreets and Side-Lane Walk",
      description: "A practical Kagurazaka route for travelers who want stone lanes, shrine pauses, and older Tokyo side streets beyond the main slope.",
      lead: "Kagurazaka only becomes distinctive once you leave the main slope and begin reading the side lanes, stair steps, and stone-textured backstreets around it.",
      route: "Enter from the Iidabashi side, keep the main street brief, and use repeated turns into stone lanes, shrine-adjacent stretches, and smaller side streets.",
      focus: "The route is built around the gap between Kagurazaka’s visible convenience and the quieter texture that appears as soon as you step off the obvious line.",
      bestFor: "travelers who want a more deliberate central-Tokyo walk without falling back on major sightseeing anchors",
      avoid: "treating the district as a straight line of cafes and restaurants only",
      extension: "Extend toward the Akagi Shrine side, or shorten by letting one strong lane sequence be the main payoff.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "jimbocho-kanda-booktown-walk": {
    cluster: "kuramae",
    galleryStart: 1,
    embedStart: 5,
    heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "A calmer central Tokyo street scene suitable for a bookstore walk", width: 1600, height: 1067, caption: "Jimbocho and nearby Kanda work when bookstores, coffee breaks, and quieter central blocks balance each other instead of competing.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
    ja: {
      title: "神保町と神田ブックタウン散歩ガイド",
      description: "古書店、喫茶、静かな中央東京の街区を半日でつなぐ、神保町と神田の街歩きガイドです。",
      lead: "神保町と神田の良さは、本を買うことそのものよりも、本屋と喫茶の間をどう歩くかにあります。",
      route: "神保町駅側から入り、古書店街を軸にしながら、喫茶や裏通りを一つずつ挟んで神田寄りへつなぐ形が扱いやすいです。",
      focus: "中央東京なのに歩く速度を落とせること、それ自体がこのルートのいちばん大きな価値です。",
      bestFor: "本屋、喫茶、落ち着いた中央東京の街区を半日で味わいたい旅行者",
      avoid: "本屋の件数を増やし続けて歩行の余白をなくすこと",
      extension: "延ばすなら御茶ノ水寄り、短縮するなら神保町の古書店街だけで締めても成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Jimbocho and Kanda Booktown Walk",
      description: "A practical booktown half day for travelers who want secondhand bookstores, cafe pauses, and calmer central Tokyo blocks.",
      lead: "Jimbocho and nearby Kanda work best when secondhand bookstores, coffee breaks, and short central-Tokyo transitions share the route instead of turning it into a shopping mission.",
      route: "Start near Jimbocho Station, let the bookshop streets set the first half, then add one cafe or quieter side-street transition toward the Kanda side.",
      focus: "The route succeeds because it lets central Tokyo slow down into readable blocks rather than staying purely functional or crowded.",
      bestFor: "travelers who want books, coffee, and a lower-pressure central-Tokyo half day",
      avoid: "trying to maximize the number of bookstores at the expense of the walking rhythm",
      extension: "Extend toward Ochanomizu, or shorten by letting the Jimbocho book streets be the complete arc.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "nakameguro-daikanyama-side-streets": {
    cluster: "kuramae",
    galleryStart: 3,
    embedStart: 0,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A slower Tokyo side-street scene suited to neighborhood walking", width: 1280, height: 853, caption: "Nakameguro and Daikanyama improve once you step off the most photographed strips and let smaller streets control the pace.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
    ja: {
      title: "中目黒と代官山の裏通りガイド",
      description: "目黒川の定番写真だけで終わらせず、中目黒と代官山の裏通りを静かに歩きたい人向けの半日ガイドです。",
      lead: "中目黒と代官山は、誰でも知る通りに留まるより、一本外れた通りを長めに歩いた方が街の質感が伝わります。",
      route: "中目黒駅側から始め、川沿いは短く使い、住宅寄りの道や小さな店が続く通りを通って代官山へ寄せる構成が向いています。",
      focus: "有名な写真の場所を過ぎてから、どれだけ静かな街区へ滑らかに入れるかがこのルートの中心です。",
      bestFor: "中目黒や代官山を見たいが、人の密度を少し下げて歩きたい旅行者",
      avoid: "人気店の行列だけを追う半日",
      extension: "延ばすなら恵比寿寄り、短縮するなら代官山の街区に入った時点で終えても成立します。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Nakameguro and Daikanyama Side Streets",
      description: "A calmer Tokyo half day for travelers who want Nakameguro and Daikanyama beyond the most photographed river and shopping strips.",
      lead: "Nakameguro and Daikanyama get better once you leave the most photographed stretches and let smaller residential-adjacent streets carry more of the walk.",
      route: "Start near Nakameguro Station, keep the river section short, then use quieter lanes and small-shop streets as you drift toward Daikanyama.",
      focus: "The route is centered on what happens after the obvious photo stops, when the district begins to feel more readable and less performative.",
      bestFor: "travelers who want Nakameguro and Daikanyama with less crowd pressure and more neighborhood continuity",
      avoid: "structuring the half day only around queues at the best-known shops",
      extension: "Extend toward Ebisu, or shorten once Daikanyama has taken over the route with its calmer blocks.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "shibamata-retro-day-trip": {
    cluster: "tram",
    galleryStart: 0,
    embedStart: 2,
    heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "A retro-feeling Tokyo transit scene suited to an old-town day trip", width: 1800, height: 1200, caption: "Shibamata is strongest when transit, temple-town atmosphere, and river-edge pauses stay in one slow day instead of being over-programmed.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
    ja: {
      title: "柴又レトロ日帰りガイド",
      description: "帝釈天の参道、江戸川、水辺の空気をまとめて味わえる、柴又の実用的な半日から日帰りガイドです。",
      lead: "柴又は有名映画の舞台という説明だけでは足りず、参道と川辺の間をどうゆっくりつなぐかで印象が決まるエリアです。",
      route: "柴又駅から入り、帝釈天参道を最初の軸にしながら、山本亭や江戸川側の余白へ抜ける形がもっとも自然です。",
      focus: "低い街並みと、水辺へ抜けた時の静けさを同じ半日で感じられることがこのガイドの主題です。",
      bestFor: "下町のレトロ感と、少し郊外寄りの東京をまとめて見たい旅行者",
      avoid: "参道だけを短く見てすぐ戻ること",
      extension: "延ばすなら河川敷側を長く、短縮するなら帝釈天周辺だけで終えても最低限の形になります。",
      timeNeeded: "4〜5時間",
    },
    en: {
      title: "Shibamata Retro Day Trip from Central Tokyo",
      description: "A practical retro Tokyo day trip for travelers who want temple approaches, river air, and a lower-rise old-Tokyo feel in Shibamata.",
      lead: "Shibamata is more than a film reference. The route becomes worthwhile once you connect the temple approach, lower-rise townscape, and Edogawa riverside calm into one readable outing.",
      route: "Enter from Shibamata Station, let the Taishakuten approach set the first half, then move outward toward Yamamoto-tei and the river edge for the slower second half.",
      focus: "The main value is that old-town texture and open river atmosphere can sit in the same half day without feeling forced.",
      bestFor: "travelers who want retro Tokyo and a slightly outer-neighborhood day without needing a complicated plan",
      avoid: "treating the temple approach as the only point of the trip",
      extension: "Extend by spending longer along the river, or shorten by keeping the route centered on the Taishakuten side only.",
      timeNeeded: "4 to 5 hours",
    },
  },
  "tokyo-morning-walks": {
    cluster: "yanaka",
    galleryStart: 1,
    embedStart: 5,
    heroImage: { src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg", alt: "A calm low-rise morning street in Tokyo", width: 1280, height: 853, caption: "Tokyo mornings get better when the route begins in a neighborhood that feels readable before the city fully accelerates.", creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg" },
    ja: {
      title: "東京の朝散歩ベストルートガイド",
      description: "外国人旅行者向けに、混雑前の東京を歩きやすい順番でまとめた、静かな朝散歩ガイドです。",
      lead: "東京の朝は、同じエリアでも昼とは別の都市に見えることがあります。",
      route: "谷中、根津、清澄白河、吉祥寺のように、朝の光と店の開き方が相性のよい地区を一つか二つだけ選び、朝食か喫茶を一回だけ挟む構成が最も扱いやすいです。",
      focus: "人が増える前の低い街並み、神社や庭園の余白、商店街が営業前後で切り替わる瞬間を半日として読むことがこの記事の軸です。",
      bestFor: "昼以降は定番観光を入れつつ、朝だけ静かな東京を取りたい旅行者",
      avoid: "朝から大型施設や人気店の回収数を増やしたい人",
      extension: "延ばすなら同じ温度の駅隣接エリアへ、短縮するなら一地区だけを丁寧に歩く方が朝らしさが残ります。",
      timeNeeded: "2.5〜4時間",
    },
    en: {
      title: "Best Tokyo Morning Walks Guide",
      description: "A practical guide to Tokyo morning walks for foreign travelers who want calmer streets, early neighborhood rhythm, and a lower-pressure start to the day.",
      lead: "Tokyo in the morning can feel like a different city if you choose the right neighborhoods.",
      route: "Use one or two morning-friendly districts such as Yanaka, Nezu, Kiyosumi-Shirakawa, or Kichijoji, and structure the half day around one breakfast or coffee pause instead of a dense attraction list.",
      focus: "The point is to read low-rise streets, shrine or garden calm, and shopping streets in their pre-crowd phase rather than treat morning as wasted time before the city wakes up.",
      bestFor: "travelers who want a calmer Tokyo chapter before a busier sightseeing afternoon",
      avoid: "travelers who want to maximize headline attractions from the start of the day",
      extension: "Extend into an adjacent neighborhood with the same quieter early rhythm, or shorten by keeping the route to one district only.",
      timeNeeded: "2.5 to 4 hours",
    },
  },
  "tokyo-local-transit-half-day": {
    cluster: "tram",
    galleryStart: 3,
    embedStart: 3,
    heroImage: { src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg", alt: "A Tokyo streetcar scene near Asukayama", width: 1800, height: 1200, caption: "Transit-led half days work best when stations, tram stops, and short walks all keep the route flexible instead of overplanned.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg" },
    ja: {
      title: "東京のローカル交通で回る半日ルート",
      description: "都電や駅近の静かな街区を使って、外国人旅行者が半日で回しやすい東京ルートをまとめたガイドです。",
      lead: "東京の移動は速さだけで組むより、街の速度が見えるローカル交通を軸にした方が半日の完成度が上がることがあります。",
      route: "王子、飛鳥山、町屋、蔵前、門前仲町のように、駅と街区の境目が読みやすいエリアを一つか二つ選び、乗る区間と歩く区間を短く交互に入れる構成が向いています。",
      focus: "停留場、駅出口、橋、公園、商店街がどうつながるかを体験として掴めることがこのガイドの主題です。",
      bestFor: "徒歩だけでは長く、地下鉄だけでは味気ない東京半日を作りたい旅行者",
      avoid: "路線図だけで最短移動を詰め込みたい人",
      extension: "延ばすなら一停留場か一駅分だけ、短縮するなら最初の街区と最後の出口だけを決めて途中の移動量を減らしてください。",
      timeNeeded: "3〜4.5時間",
    },
    en: {
      title: "Local Transit-Led Tokyo Half-Day Routes",
      description: "A Tokyo guide for foreign travelers who want quieter half days shaped by local transit, short walks, and neighborhoods that stay legible on the move.",
      lead: "Some Tokyo half days improve once local transit becomes part of the rhythm instead of just a hidden logistics layer.",
      route: "Choose one or two areas where stations, tram stops, or compact rail links stay close to the street texture, then alternate short rides with short walks rather than forcing a purely walking or purely rail-based version.",
      focus: "The real payoff is understanding how stops, exits, parks, bridges, and shopping streets connect in practice, not just moving efficiently on the map.",
      bestFor: "travelers who want a Tokyo half day that feels mobile and local without becoming stressful",
      avoid: "travelers who only care about the fastest possible route between attractions",
      extension: "Extend by one extra stop or one adjacent station, or shorten by simplifying the transfer points and letting one neighborhood carry more of the route.",
      timeNeeded: "3 to 4.5 hours",
    },
  },
  "tokyo-waterfront-slow-route": {
    cluster: "kiyosumi",
    galleryStart: 2,
    embedStart: 4,
    heroImage: commonsImage("File:Kiyosumi Garden (9224579199).jpg", "https://upload.wikimedia.org/wikipedia/commons/3/30/Kiyosumi_Garden_%289224579199%29.jpg", 1280, 960, "A quiet waterside scene in east Tokyo", "Tokyo waterfront half days get stronger when they combine water, green space, and short neighborhood transitions."),
    ja: {
      title: "東京の水辺をゆっくり歩く半日ルート",
      description: "清澄白河や東東京の水辺を中心に、外国人旅行者が無理なく歩ける静かな半日ルートをまとめたガイドです。",
      lead: "東京の水辺は、派手な夜景よりも、昼の余白として使う方が旅程に入れやすいことが多いです。",
      route: "清澄白河、門前仲町、蔵前のように川や運河と街区が短い距離で切り替わるエリアを一つか二つつなぎ、橋や庭園の滞在は短めに、休憩は一回に絞ると安定します。",
      focus: "水辺そのものより、水辺と街区の切り替わり、橋を渡る前後で空気が変わる感じ、座って風景を整える時間がこのルートの核です。",
      bestFor: "東京で少し風通しのよい半日を入れたい旅行者",
      avoid: "長い川沿いを歩き続けること自体を目的化したい人",
      extension: "延ばすなら同じ川沿いの隣接区間へ、短縮するなら橋一つと庭園か喫茶一つだけでも十分まとまります。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Tokyo Waterfront and Slow Route Guide",
      description: "A calmer Tokyo half day built around waterfront edges, bridges, garden pauses, and east-side neighborhoods that are easier to absorb at a slower pace.",
      lead: "Tokyo’s waterfront is often better as a daytime breathing-space route than as a headline skyline exercise.",
      route: "Link one or two areas where canals, river edges, gardens, and neighborhood blocks sit close together, then keep bridge time selective and let one indoor or seated pause stabilize the half day.",
      focus: "The route is really about transitions between water and city blocks, not about walking the longest possible stretch beside the river.",
      bestFor: "travelers who want one airier, lower-pressure Tokyo half day",
      avoid: "travelers who want a long exposed waterfront march as the main goal",
      extension: "Extend into an adjacent waterside district with a similar pace, or shorten by keeping one bridge crossing and one green or cafe pause only.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "tokyo-old-town-hillside-walk": {
    cluster: "yanaka",
    galleryStart: 3,
    embedStart: 6,
    heroImage: { src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg", alt: "Nezu Shrine and greenery in old Tokyo", width: 1280, height: 853, caption: "Old-town Tokyo works best when shrine slopes, temple edges, and quieter lanes are read as one continuous half day.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg" },
    ja: {
      title: "東京の下町と坂まわり街歩きガイド",
      description: "谷中、根津、神楽坂のような、下町と坂の空気が残る東京を半日で歩くための実用ガイドです。",
      lead: "東京の“古さ”は建物単体より、坂、寺町、神社、低い街並みが連続して見える時にいちばん伝わります。",
      route: "谷中、根津、千駄木、神楽坂のように、高低差が少しありながら街区が歩きやすいエリアを一つか二つ選び、坂の上と下で休憩位置を変える構成が使いやすいです。",
      focus: "坂の手前後で音と歩行の速度が変わること、神社や寺町の縁が生活道路へ戻る瞬間を見ることがこのルートの中心です。",
      bestFor: "東京で古い街並みと少しの起伏を一緒に感じたい旅行者",
      avoid: "平坦な移動効率だけで街歩きを組みたい人",
      extension: "延ばすなら隣の旧市街エリアへ、短縮するなら神社か坂道のどちらか一つを軸にして街区の連続だけを残してください。",
      timeNeeded: "3〜4時間",
    },
    en: {
      title: "Tokyo Old-Town and Hillside Walk Guide",
      description: "A practical Tokyo guide for travelers who want older streets, shrine edges, slight elevation change, and neighborhoods that still feel slower and more layered.",
      lead: "Old Tokyo is easiest to feel when shrine space, hillside turns, temple-adjacent lanes, and lower-rise streets stay in one readable sequence.",
      route: "Use one or two neighborhoods such as Yanaka, Nezu, Sendagi, or Kagurazaka where slight elevation change and older street texture help the walk feel layered without becoming difficult.",
      focus: "The route is about how pace and sound shift around slopes, shrine edges, and older residential blocks, not about finding one nostalgic landmark.",
      bestFor: "travelers who want older Tokyo character with a little topographic variety",
      avoid: "travelers who want a flat, purely efficiency-led walking day",
      extension: "Extend toward an adjacent old-town district with the same slower texture, or shorten by keeping only one shrine-and-slope sequence as the route core.",
      timeNeeded: "3 to 4 hours",
    },
  },
  "tokyo-station-based-short-stays": {
    cluster: "kuramae",
    galleryStart: 4,
    embedStart: 4,
    heroImage: { src: "/guide/kuramae-walk/kuramae-shrine.jpg", alt: "Kuramae Shrine near a station-based Tokyo route", width: 1600, height: 1067, caption: "Station-based Tokyo routes work when one or two exits lead directly into a neighborhood that is usable even on a short stay.", creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg" },
    ja: {
      title: "東京の駅起点で回る短時間街歩き",
      description: "短い滞在や移動の合間でも使いやすい、駅起点の東京半日ルートを外国人旅行者向けにまとめたガイドです。",
      lead: "東京の短時間街歩きは、名所の数より“駅を出てすぐ半日が始まるか”で使いやすさが決まります。",
      route: "蔵前、清澄白河、根津、吉祥寺のように、駅出口から街区の空気へ切り替わるのが早いエリアを一つか二つ選び、ホテル移動や新幹線・空港アクセスの前後へ差し込む構成が向いています。",
      focus: "駅から最初の五分で街の温度が変わること、途中で戻りやすいこと、出口の選び直しで全体が崩れにくいことがこの記事の主題です。",
      bestFor: "到着日や出発日でも東京の街歩きを少し入れたい旅行者",
      avoid: "駅から遠い大型観光地を短時間で無理に回したい人",
      extension: "延ばすなら隣駅まで一つ、短縮するなら最初の街区と最後の休憩先だけを残しても十分成立します。",
      timeNeeded: "2〜3.5時間",
    },
    en: {
      title: "Station-Based Tokyo Walks for Short Stays",
      description: "A practical Tokyo guide for foreign travelers who want short-stay neighborhood walks that start close to stations and stay easy to shorten or exit cleanly.",
      lead: "Short-stay Tokyo routes work best when the half day begins almost immediately after you leave the station.",
      route: "Choose one or two neighborhoods where the station exit gives way to a usable street atmosphere within minutes, making the route easy to slot before check-in, after check-out, or between longer transfers.",
      focus: "The real value is fast entry, easy backup exits, and a route shape that survives short timing changes without turning into rushed sightseeing.",
      bestFor: "travelers who want one useful neighborhood half day on arrival, departure, or transfer-heavy days",
      avoid: "travelers who want to force distant major attractions into a short gap",
      extension: "Extend by one adjacent station or short neighborhood spillover, or shorten by keeping only the first district and one reset stop.",
      timeNeeded: "2 to 3.5 hours",
    },
  },
};

const GUIDE_CONFIGS = Object.fromEntries(
  Object.entries(BASE_GUIDE_CONFIGS).map(([slug, config]) => {
    const override = MINOR_GUIDE_CONFIG_OVERRIDES[slug];
    if (!override) {
      return [slug, config];
    }

    return [
      slug,
      {
        ...config,
        ...override,
        ja: {
          ...config.ja,
          ...override.ja,
          ...(MINOR_GUIDE_ENRICHMENTS[slug]?.ja ?? {}),
        },
        en: {
          ...config.en,
          ...override.en,
          ...(MINOR_GUIDE_ENRICHMENTS[slug]?.en ?? {}),
        },
      },
    ];
  }),
) as Record<string, MinorGuideConfig>;

function normalizeXUrl(url: string) {
  const match = url.match(/status\/(\d+)/);
  return match ? `https://x.com/i/status/${match[1]}` : url;
}

function getGuideCopy(config: MinorGuideConfig) {
  return {
    ...CLUSTER_COPY[config.cluster],
    ...config.copyOverride,
  };
}

function getPhotoFocus(locale: GuideLocale, config: MinorGuideConfig) {
  const override = config.photoFocusOverride?.[locale];
  if (override) {
    return override;
  }

  const photoFocus = {
    yanaka: {
      ja: "低い街並み、神社の参道、寺町の境目、商店街が急に生活道路へ戻る瞬間",
      en: "low-rise streets, shrine approaches, temple-adjacent blocks, and the moments when shopping streets fall back into everyday lanes",
    },
    kiyosumi: {
      ja: "庭園の余白、水辺、駅から街区へ移る切り替わり、コーヒー街の外側の静かな通り",
      en: "garden space, waterside edges, the shift from station exits into neighborhood blocks, and the quieter streets beyond the coffee label",
    },
    kuramae: {
      ja: "橋の見え方、小さな店の密度、交差点の空気、川沿いと街区の切り替わり",
      en: "bridge views, small-shop density, the feel of intersections, and the change between river edges and interior blocks",
    },
    tram: {
      ja: "停留場の距離感、公園の余白、都電が街の速度を決める感じ、生活道路の近さ",
      en: "the spacing of tram stops, park pauses, the way the tram sets the street rhythm, and how close the route stays to daily-life roads",
    },
  } satisfies Record<MinorGuideCluster, Record<"ja" | "en", string>>;

  return photoFocus[config.cluster][locale === "ja" ? "ja" : "en"];
}

function localizeGallery(locale: GuideLocale, gallery: GuideMediaImage[]) {
  if (locale !== "ja") {
    return gallery;
  }

  return gallery.map((image) => ({
    ...image,
    caption: undefined,
    creditLabel: "写真: Wikimedia Commons contributors",
  }));
}

function buildNeighborhoodSections(locale: "ja" | "en", config: MinorGuideLocaleConfig) {
  const sections: { heading: string; body: string }[] = [];

  if (config.neighborhoodCharacter) {
    sections.push({
      heading: locale === "ja" ? "この街区がほかと違う理由" : "What makes this district different",
      body: config.neighborhoodCharacter,
    });
  }

  if (config.concreteRoute || config.namedStops?.length) {
    const stopsBlock = config.namedStops?.length
      ? "\n\n" +
        (locale === "ja"
          ? "立ち寄り候補:\n"
          : "Recommended anchors along the way:\n") +
        config.namedStops.map((stop) => `- ${stop.name} — ${stop.note}`).join("\n")
      : "";
    sections.push({
      heading: locale === "ja" ? "歩く順番と立ち寄り候補" : "Suggested route and named anchors",
      body: `${config.concreteRoute ?? ""}${stopsBlock}`.trim(),
    });
  }

  if (config.localMistakes) {
    sections.push({
      heading: locale === "ja" ? "現地で見落としやすい注意点" : "Local mistakes worth avoiding",
      body: config.localMistakes,
    });
  }

  return sections;
}

function buildSections(
  locale: "ja" | "en",
  config: MinorGuideLocaleConfig,
  guideConfig: MinorGuideConfig,
  embeds: GuideXEmbed[],
) {
  const copy = getGuideCopy(guideConfig);
  const xLabels = joinList(locale, embeds.map((embed) => embed.label ?? "X"));
  const photoFocus = getPhotoFocus(locale, guideConfig);
  const customSections = buildNeighborhoodSections(locale, config);

  if (locale === "ja") {
    return [
      ...customSections,
      {
        heading: "このルートで見るべき東京",
        body:
          `${config.lead} ${config.focus} このガイドは、有名観光地を別の言い方でなぞるためのものではなく、観光地として消費されすぎていない東京を、半日単位でどう読むかを整理するためのものです。` +
          ` 特に外国人旅行者にとっては、ランドマークの数よりも、街がどの速度で歩けるか、どの駅から入ると雰囲気が変わるか、小さな休憩をどこで入れると全体の印象が整うかの方が満足度に直結します。` +
          ` その意味で、この手の記事は「何を見るか」の一覧ではなく、「どういう順番で空気が変わるか」を先に理解するための下書きです。\n\n` +
          `ここで重視しているのは、写真映えする一点ではなく、街区の連続です。 ${config.bestFor} という条件に近い人ほど、予定を増やすより、同じ温度の区間を長めに歩いた方がこの記事の価値を回収しやすくなります。` +
          ` 逆に言えば、短時間で“成果”を増やそうとするほど、マイナーな街歩きの記事を読む意味は薄れていきます。`,
      },
      {
        heading: "半日の組み立て方",
        body:
          `${config.route} 所要時間は ${config.timeNeeded} を基準に考えると扱いやすく、前半に一つ目の軸、後半に二つ目の軸を置くと、歩き疲れずにまとまります。` +
          ` 実際には駅を出てから最初の十分でその日の印象がほぼ決まるので、最初の入口だけは雑に決めない方がよいです。\n\n` +
          `この種のルートでは、喫茶や軽食は「何件行くか」より「どこで一度座って街の速度を戻すか」が重要です。休憩は一回でも十分で、前後の歩行区間が落ち着いていれば、半日全体に余白が残ります。`,
      },
      {
        heading: "何を削ると満足度が上がるか",
        body:
          `このガイドは ${config.avoid} という動き方とは相性がよくありません。見どころを増やし続けると、記事の主題である ${config.focus} が薄まり、結局はただの移動量の多い日になります。` +
          ` 迷ったら「あと一つ追加する」より「今いる区間を十五分長く歩く」を優先してください。\n\n` +
          `${config.extension} この延長や短縮の指示は、単に距離を増減するためではなく、記事の温度感を壊さずに調整するためのものです。マイナーな街歩きは、到達点よりもつなぎ方で印象が変わります。`,
      },
      {
        heading: "10枚の写真で押さえる景色",
        body:
          `今回の写真セットは、${photoFocus} をきちんと見せるために十枚で組んでいます。観光ガイドでよくあるように、同じ名所の別角度を並べるのではなく、入口、途中、余白、街区の変化が分かる並びにしています。` +
          ` そのため、写真を上から順に見るだけでも、現地でどの瞬間を拾えばこのルートらしくなるかが分かる構成です。写真は単なる飾りではなく、ルートの判断基準を視覚化したものとして置いています。\n\n` +
          `記事の本文は写真と同じ論理で書いています。つまり「ここへ行け」ではなく「どういう順番で空気が変わるか」を読むためのガイドです。現地で全部を再現する必要はなく、写真のうち三、四枚分の景色が拾えれば、その半日は十分成功と言えます。` +
          ` 逆に、写真に出てこない密度の高い寄り道を詰め込むと、記事が狙っている静けさから外れやすくなります。`,
      },
      {
        heading: "Xの投稿をどう読むか",
        body:
          `今回入れている投稿は ${xLabels} で、記事の舞台とズレる汎用リンクを避けています。X の投稿は本文の代わりではなく、現地の季節感、花の状態、運行、まちの小さな動きの確認用です。` +
          ` 同じ投稿を全記事へ流し込まず、このガイドの景色や歩き方に近いものだけを選ぶ方針に切り替えています。\n\n` +
          `この運用にしている理由は単純で、X だけを並べても旅行者向けガイドにはならない一方、記事本文だけだと更新速度に限界があるからです。記事は構造、X はその時点の空気、という役割分担にすると、情報の鮮度と読み物としての完成度を両立しやすくなります。`,
      },
      {
        heading: "休憩・天気・歩行量の調整",
        body:
          `${copy.foodJa} ${copy.weatherJa} 半日ルートを壊さずに調整したい場合は、観光地を足すより、屋内休憩を一つ増やすか、橋・庭園・停留場のような外気の強い区間を短くしてください。\n\n` +
          `また、疲れが出るのは終盤の移動ではなく、中盤で判断回数が増えたときです。だからこそ、保存しておく店は一、二件で十分で、記事の中で軸としている街区を先に歩き切る方が成功しやすくなります。`,
      },
      {
        heading: "外国人旅行者向けの実務メモ",
        body:
          `${copy.transportJa} 特に日本に不慣れな旅行者は、駅の出口番号、営業日、臨時休業、雨雲、運行状況の確認だけで印象が大きく変わります。` +
          ` この記事では観光を主役にしていますが、現地での判断を軽くする準備はしておいた方がよく、その延長線上に日本向けeSIMを薄く置いています。\n\n` +
          `要するに、このガイドの目的は通信の必要性を説くことではなく、現地で判断に追われずに済む状態を作ることです。そうして初めて、マイナーな街区の良さが“情報処理”ではなく“体験”として残ります。`,
      },
    ];
  }

  return [
    ...customSections,
    {
      heading: "What this route is actually good at",
      body:
        `${config.lead} ${config.focus} This guide is not trying to rename the usual sightseeing checklist. It is designed to show how a minor Tokyo half day works once you stop forcing the city into major attractions only.` +
        ` For foreign travelers, the bigger question is usually not “what is the one famous thing here?” but “how fast does this area move, what kind of street texture does it hold, and when does it stop feeling over-produced?”` +
        ` In that sense, this article is meant to give you a reading order for the neighborhood before it gives you a list of stops.\n\n` +
        `${config.bestFor} are usually the travelers who get the most from this format. The route improves when you let one neighborhood mood stay intact instead of turning the half day into a sequence of disconnected highlights.` +
        ` The faster you try to prove you have “covered” the area, the less value this kind of route usually returns.`,
    },
    {
      heading: "How to structure the half day",
      body:
        `${config.route} In practice, ${config.timeNeeded} is the right planning range because it gives the route enough room to breathe without letting the walk become a full-day commitment.` +
        ` The first ten or fifteen minutes matter more than people expect, so the entry station and the first small anchor should be chosen with intention rather than left to chance.\n\n` +
        `On this kind of route, breaks matter less as a list and more as a reset. One coffee stop, bakery pause, or bench moment is usually enough if the walking segments before and after it are coherent. That is what keeps the route from collapsing into pure logistics.`,
    },
    {
      heading: "What to cut so the route stays good",
      body:
        `This guide is a weak fit for ${config.avoid}. The more stops you keep adding, the more the route loses the exact thing that makes it useful: ${config.focus}` +
        ` If you are unsure, cutting one extra attraction is almost always smarter than adding one more.\n\n` +
        `${config.extension} That extension note is not just about distance. It is about preserving the tone of the route. Minor-city walking succeeds when the transitions feel deliberate, not when the map looks efficient.`,
    },
    {
      heading: "What the ten-photo set is meant to show",
      body:
        `The ten-photo set is there to show ${photoFocus}. It is not built like a standard attraction gallery where the same landmark appears from slightly different angles. Instead, the images are arranged to show entry points, quieter middle sections, street-to-street transitions, and the kind of visual detail that tells you the route is still working.\n\n` +
        `The article follows the same logic. It is less interested in telling you to stand in one exact spot and more interested in helping you understand what kind of half day you are building. If your actual walk captures even three or four of the visual moods represented in the photo set, the route has probably already done its job.` +
        ` If you end up chasing a denser, more famous version of the district than the photo set suggests, you usually leave the guide’s intended rhythm behind.`,
    },
    {
      heading: "Why these X posts were chosen",
      body:
        `The embeds selected for this page are ${xLabels}. They were chosen because they match the place, season, operator, or neighborhood movement described in the article instead of repeating one generic Tokyo feed on every page.` +
        ` That shift matters because a minor travel guide stops being credible the moment every article points to the same social references regardless of theme.\n\n` +
        `The role split matters. The article provides the structure and the reasoning. X provides narrow, timely references such as seasonal blooms, line status, ward-level announcements, or recent neighborhood scenes. Keeping those roles separate makes the page more useful than either a static guide or a pure social-media roundup.`,
    },
    {
      heading: "How to adjust for breaks, weather, and pacing",
      body:
        `${copy.foodEn} ${copy.weatherEn} If the weather shifts or energy drops, the best adjustment is usually to shorten the most exposed outdoor segment or add one indoor reset rather than force more ground into the same half day.\n\n` +
        `Most route fatigue comes from too many mid-route decisions rather than from pure walking distance. That is why saving only one or two realistic break options works better than over-preparing. The route gets stronger when the day remains readable.`,
    },
    {
      heading: "Practical notes for foreign travelers",
      body:
        `${copy.transportEn} For visitors who do not already know Tokyo station logic, that small layer of live checking often changes the day more than any extra sightseeing stop would.` +
        ` The article keeps tourism at the center, but it still leaves a light travel-prep path in place because smoother on-the-ground decisions are what protect the route from turning into friction.\n\n` +
        `That is the practical reason the page links gently toward Japan eSIM prep rather than making connectivity the main story. The goal is not to sell the need for data. The goal is to keep the neighborhood experience from being consumed by avoidable decision overhead.`,
    },
  ];
}

function buildFaq(locale: "ja" | "en", config: MinorGuideLocaleConfig, guideConfig: MinorGuideConfig) {
  const copy = getGuideCopy(guideConfig);
  const extras = config.extraFaqs ?? [];

  if (locale === "ja") {
    return [
      ...extras,
      {
        q: "このルートは初めての東京旅行でも使えますか？",
        a: `${config.bestFor} であれば十分使えます。むしろ定番観光の密度に疲れやすい人ほど相性がよく、最初から無理に数を回収しない方が満足度が上がります。`,
      },
      {
        q: "所要時間を短くしたい場合はどこを削ればよいですか？",
        a: `${config.extension} 基本は延長側を切るより、移動の多い区間を一つ減らしてください。写真の枚数を減らすのではなく、街区の切り替わりを一回減らす感覚です。`,
      },
      {
        q: "雨の日や疲れている日でも成立しますか？",
        a: `${copy.weatherJa} ただし強い雨や風の日は、外気にさらされる区間を短くし、喫茶や屋内休憩を一つ増やす方が安定します。`,
      },
      {
        q: "Xの投稿は毎回確認した方がよいですか？",
        a: "毎回ではありません。花の状態、運行、臨時休業、現地の温度感を見たいときだけで十分です。本文で半日の骨格を掴み、必要な時だけXを見る使い方が最も実用的です。",
      },
      {
        q: "外国人旅行者が最低限保存しておくとよいものは何ですか？",
        a: "駅名、最初の入口、最後の出口候補、休憩先を一つ、必要なら日本向けeSIMの準備です。保存量を増やすより、現地での判断回数を減らすことを優先してください。",
      },
    ];
  }

  return [
    ...extras,
    {
      q: "Does this route work for a first Tokyo trip?",
      a: `Yes, especially for ${config.bestFor}. It is often better for first-time visitors who want a calmer half day than for travelers trying to maximize big-name sightseeing density.`,
    },
    {
      q: "What should I cut if I need a shorter version?",
      a: `${config.extension} In most cases, the best cut is one transition or exposed segment rather than the core mood-setting streets.`,
    },
    {
      q: "Does the route still work in rain or low energy conditions?",
        a: `${copy.weatherEn} In stronger weather, shorten the most exposed outdoor section and let one indoor reset carry more of the route.`,
    },
    {
      q: "Do I need to open every X post while I am out?",
      a: "No. The posts are there for narrow checks such as seasonal timing, operator updates, or neighborhood mood. The article should remain usable even if you only use the X references selectively.",
    },
    {
      q: "What should foreign travelers save on their phone before starting?",
      a: "Save the entry station, one break option, one backup exit, and light travel prep such as Japan eSIM access if you want low-friction map and schedule checks. Keeping the saved set small usually works better than over-planning.",
    },
  ];
}

function getTextLength(content: GuideArticleContent) {
  const sectionText = content.sections.map((section) => `${section.heading}${section.body}`).join("");
  const faqText = content.faq.map((item) => `${item.q}${item.a}`).join("");
  const xText = `${content.xSectionTitle ?? ""}${content.xSectionDescription ?? ""}${content.xEmbeds?.map((embed) => embed.label ?? "").join("") ?? ""}`;
  return `${content.title}${content.description}${sectionText}${faqText}${content.ctaTitle}${content.ctaButton}${xText}`.length;
}

function assertGuideTerms(slug: string, locale: GuideLocale, scope: "text" | "visual", corpus: string, terms?: string[]) {
  if (!terms?.length) {
    return;
  }

  const normalized = corpus.toLowerCase();
  const missing = terms.filter((term) => !normalized.includes(term.toLowerCase()));
  if (missing.length > 0) {
    throw new Error(
      `Minor travel guide "${slug}" failed ${scope} consistency for ${locale}: missing ${missing.join(", ")}.`,
    );
  }
}

function validateGuideConsistency(locale: GuideLocale, slug: string, config: MinorGuideConfig, content: GuideArticleContent) {
  const checks = config.consistencyChecks;
  if (!checks) {
    throw new Error(`Minor travel guide "${slug}" is missing explicit consistency checks.`);
  }

  const textCorpus = [
    content.title,
    content.description,
    content.sections.map((section) => `${section.heading} ${section.body}`).join(" "),
    content.faq.map((item) => `${item.q} ${item.a}`).join(" "),
    content.xSectionTitle ?? "",
    content.xSectionDescription ?? "",
    content.xEmbeds?.map((embed) => `${embed.label ?? ""} ${embed.url}`).join(" ") ?? "",
  ].join(" ");

  const visualCorpus = [
    content.heroImage ? `${content.heroImage.alt} ${content.heroImage.caption ?? ""}` : "",
    content.gallery?.map((image) => `${image.alt} ${image.caption ?? ""}`).join(" ") ?? "",
  ].join(" ");

  const visualTerms = locale === "ja"
    ? (checks.requiredVisualTerms?.en ?? checks.requiredVisualTerms?.ja)
    : checks.requiredVisualTerms?.[locale];

  assertGuideTerms(slug, locale, "text", textCorpus, checks.requiredTextTerms?.[locale]);
  assertGuideTerms(slug, locale, "visual", visualCorpus, visualTerms);
}

function validateGuideImages(slug: string, content: GuideArticleContent) {
  const imageSources = [
    content.heroImage?.src,
    ...(content.gallery?.map((image) => image.src) ?? []),
  ].filter((value): value is string => Boolean(value));

  const duplicates = imageSources.filter((src, index) => imageSources.indexOf(src) !== index);
  if (duplicates.length > 0) {
    throw new Error(`Minor travel guide "${slug}" reuses the same photo source: ${[...new Set(duplicates)].join(", ")}.`);
  }

  const imageCount = imageSources.length;
  if (imageCount < 4) {
    throw new Error(`Minor travel guide "${slug}" must expose at least 4 photos, but only has ${imageCount}.`);
  }
}

function buildGuideContent(locale: "ja" | "en", slug: string, config: MinorGuideConfig): GuideArticleContent {
  if (!config.galleryOverride?.length) {
    throw new Error(`Minor travel guide "${slug}" must define an explicit galleryOverride.`);
  }

  if (!config.xEmbedsOverride?.ja?.length || !config.xEmbedsOverride?.en?.length) {
    throw new Error(`Minor travel guide "${slug}" must define explicit X embeds for both locales.`);
  }

  if (!config.consistencyChecks) {
    throw new Error(`Minor travel guide "${slug}" must define explicit consistency checks.`);
  }

  const localeConfig = config[locale];
  const galleryPool = uniqueBy(
    config.galleryOverride
    ? config.galleryOverride
    : CLUSTER_GALLERIES[config.cluster].filter(
        (image) =>
          image.src !== config.heroImage.src &&
          image.creditUrl !== config.heroImage.creditUrl,
      ),
    (image) => image.src,
  ).filter((image) => image.src !== config.heroImage.src);

  if (galleryPool.length < 3) {
    throw new Error(`Minor travel guide "${slug}" does not have enough unique gallery images.`);
  }

  const baseEmbeds = (config.xEmbedsOverride?.[locale] ?? rotatePick(CLUSTER_X_EMBEDS[locale][config.cluster], config.embedStart, 3)).map(
    (embed) => ({
      ...embed,
      url: normalizeXUrl(embed.url),
    }),
  );

  const gallery = localizeGallery(
    locale,
    config.galleryOverride
      ? galleryPool
      : rotatePick(galleryPool, config.galleryStart, Math.min(9, galleryPool.length)),
  );
  const content: GuideArticleContent = {
    title: localeConfig.title,
    description: localeConfig.description,
    sections: buildSections(locale, localeConfig, config, baseEmbeds),
    faq: buildFaq(locale, localeConfig, config),
    heroImage: config.heroImage,
    gallery,
    xSectionTitle: locale === "ja" ? "Xで現地の空気を見る" : "Recent X posts that match this route",
    xSectionDescription:
      locale === "ja"
        ? "埋め込みは毎回同じものを使わず、記事のルートや季節感に近い投稿だけへ差し替えています。"
        : "These embeds are selected per guide so the posts stay close to the route, season, and neighborhood focus of the page.",
    xEmbeds: baseEmbeds,
    ...(locale === "ja" ? JA_CTA : EN_CTA),
  };

  validateGuideImages(slug, content);

  if ((content.xEmbeds?.length ?? 0) < 3) {
    throw new Error(`Minor travel guide "${slug}" must expose at least 3 X embeds.`);
  }

  const textLength = getTextLength(content);
  if (textLength < 3000) {
    throw new Error(`Minor travel guide "${slug}" is too thin at ${textLength} characters.`);
  }

  validateGuideConsistency(locale, slug, config, content);

  return content;
}

export const MINOR_TRAVEL_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> =
  {
    ...Object.fromEntries(
      Object.entries(GUIDE_CONFIGS).map(([slug, config]) => [
        slug,
        {
          ja: buildGuideContent("ja", slug, config),
          en: buildGuideContent("en", slug, config),
        },
      ]),
    ),
    ...CUSTOM_MINOR_TRAVEL_GUIDE_CONTENT,
    ...JAPAN_MINOR_TRAVEL_GUIDE_CONTENT,
    ...JAPAN_EXPANSION_GUIDE_CONTENT,
    ...JAPAN_3_GUIDE_CONTENT,
    ...KOREA_TAIWAN_GUIDE_CONTENT,
    ...SOUTHEAST_ASIA_GUIDE_CONTENT,
    ...EUROPE_GUIDE_CONTENT,
    ...EUROPE_2_GUIDE_CONTENT,
    ...EUROPE_3_GUIDE_CONTENT,
    ...AMERICAS_OTHERS_GUIDE_CONTENT,
    ...AMERICAS_2_GUIDE_CONTENT,
    ...AMERICAS_OCEANIA_3_GUIDE_CONTENT,
    ...ASIA_2_GUIDE_CONTENT,
    ...ASIA_3_GUIDE_CONTENT,
    ...OCEANIA_MIDEAST_AFRICA_GUIDE_CONTENT,
    ...HUB_GUIDE_CONTENT,
    ...HUBS_JAPAN_KOREA_CONTENT,
    ...HUBS_ASIA_CONTENT,
    ...HUBS_EUROPE_CONTENT,
    ...HUBS_AMERICAS_OTHERS_CONTENT,
  };

/**
 * Derive related minor-travel-guide slugs for internal linking.
 *
 * Strategy: find other MINOR_TRAVEL_GUIDE_CONTENT slugs that share the
 * longest common leading city-token prefix with the current slug
 * (tries 3-token, then 2-token, then 1-token prefixes).
 * Hub articles (*-neighborhood-walks / *-walks) are prioritized first.
 * Returns up to `limit` slugs, excluding the current one.
 */
export function deriveMinorGuideRelatedSlugs(slug: string, limit = 6): string[] {
  const all = Object.keys(MINOR_TRAVEL_GUIDE_CONTENT);
  if (!all.includes(slug)) return [];

  const tokens = slug.split("-");
  const tryLengths = [3, 2, 1].filter((n) => n < tokens.length);

  for (const n of tryLengths) {
    const prefix = `${tokens.slice(0, n).join("-")}-`;
    const matches = all.filter((s) => s !== slug && s.startsWith(prefix));
    if (matches.length >= 3) {
      const hubs = matches.filter(
        (s) => s.endsWith("-neighborhood-walks") || s.endsWith("-walks"),
      );
      const rest = matches.filter((s) => !hubs.includes(s));
      return [...hubs, ...rest].slice(0, limit);
    }
  }
  return [];
}
