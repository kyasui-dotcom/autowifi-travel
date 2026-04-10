import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";
import type { GuideMediaImage, GuideXEmbed } from "./priorityGuideContent";

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
  neighborhoodCharacter?: string;
  concreteRoute?: string;
  namedStops?: { name: string; note: string }[];
  localMistakes?: string;
  extraFaqs?: { q: string; a: string }[];
};

export type MinorGuideConfigOverride = {
  heroImage?: GuideMediaImage;
  galleryOverride?: GuideMediaImage[];
  xEmbedsOverride?: Partial<Record<GuideLocale, GuideXEmbed[]>>;
  copyOverride?: Partial<MinorGuideClusterCopy>;
  photoFocusOverride?: Partial<Record<GuideLocale, string>>;
  consistencyChecks?: {
    requiredTextTerms?: Partial<Record<GuideLocale, string[]>>;
    requiredVisualTerms?: Partial<Record<GuideLocale, string[]>>;
  };
  ja?: Partial<MinorGuideLocaleConfig>;
  en?: Partial<MinorGuideLocaleConfig>;
};

function commonsFileUrl(fileTitle: string) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replace(/ /g, "_"))}`;
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
  return {
    src: commonsThumbUrl(fileTitle, thumbWidth),
    alt,
    width,
    height,
    caption,
    creditLabel: "Photo: Wikimedia Commons contributors",
    creditUrl: commonsFileUrl(fileTitle),
  };
}

function derivedLocalGuideImage(
  src: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
  sourceFileTitle: string,
): GuideMediaImage {
  return {
    src,
    alt,
    width,
    height,
    caption,
    creditLabel: "Derived from photo: Wikimedia Commons contributors",
    creditUrl: commonsFileUrl(sourceFileTitle),
  };
}

const GENERIC_TOKYO_WALK_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO公式: 江戸の層を感じる東京散歩の参考" },
    { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 静かな東京の朝歩きの参考" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "文京区公式: 東京の街歩き温度に近い参考投稿" },
  ],
  en: [
    { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO: an older-Tokyo walking reference" },
    { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a quieter Tokyo morning reference" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "Bunkyo ward: a useful Tokyo neighborhood-walk reference" },
  ],
};

const YANAKA_STREET_IMAGE: GuideMediaImage = {
  src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg",
  alt: "A calm Yanaka street with low-rise storefronts in Tokyo",
  width: 1280,
  height: 853,
  caption: "Low-rise Yanaka streets are one of the clearest visual anchors for slower Tokyo neighborhood walking.",
  creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)",
  creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg",
};

const NEZU_SHRINE_IMAGE: GuideMediaImage = {
  src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg",
  alt: "Nezu Shrine torii and greenery in Tokyo",
  width: 1280,
  height: 853,
  caption: "Nezu Shrine is one of the clearest visual anchors for old-town Tokyo walks around Nezu and Sendagi.",
  creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)",
  creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_2020.jpg",
};

const YOMISE_DORI_IMAGE: GuideMediaImage = {
  src: "/guide/rainy-day-tokyo-neighborhoods/yomisedori.jpg",
  alt: "Yomise-dori shopping street in Tokyo",
  width: 1944,
  height: 2592,
  caption: "Yomise-dori is a useful visual anchor whenever the route is really about slower shopping-street texture rather than one big landmark.",
  creditLabel: "Photo: Kentin / Wikimedia Commons (CC BY-SA 3.0)",
  creditUrl: "https://commons.wikimedia.org/wiki/File:Yomisedori_shopping_street_taito_bunkyo_tokyo_2009.JPG",
};

const TODEN_ASUKAYAMA_IMAGE: GuideMediaImage = {
  src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg",
  alt: "Tokyo Sakura Tram near Asukayama in Tokyo",
  width: 1800,
  height: 1200,
  caption: "The tram itself is useful here because it visibly sets the route's pace instead of serving as a decorative transport detail.",
  creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)",
  creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg",
};

const UENO_STATION_PARK_GATE = commonsThumbImage(
  "File:JR East Ueno Station Park Gate, Tokyo 20230212.jpg",
  1600,
  1067,
  "JR East Ueno Station Park Gate in Tokyo",
  "A Ueno-side station gate is the most literal way to show that this route genuinely starts from Ueno before moving into Yanaka.",
  1400,
);

const UENO_PARK_GATE_1 = commonsThumbImage(
  "File:Tokyo-metro Ginza-line Ueno-STA Ueno-park-District-Gate-1.jpg",
  1600,
  1067,
  "Tokyo Metro Ueno Park district gate",
  "This keeps the Ueno side visible instead of letting the article drift straight into Yanaka-only imagery.",
  1400,
);

const UENO_PARK_GATE_2 = commonsThumbImage(
  "File:Tokyo-metro Ginza-line Ueno-STA Ueno-park-District-Gate-2.jpg",
  1600,
  1067,
  "Another Ueno Park district gate in Tokyo",
  "A second Ueno entrance view helps the article read like a real transition route rather than a renamed Yanaka page.",
  1400,
);

const NISHI_NIPPORI_STATION_1 = commonsThumbImage(
  "File:Nishi-Nippori Station.jpg",
  1600,
  1067,
  "Nishi-Nippori Station in Tokyo",
  "A Nishi-Nippori station view is necessary if the route title promises that this is the entry side of the walk.",
  1400,
);

const NISHI_NIPPORI_STATION_2 = commonsThumbImage(
  "File:Nishi-Nippori Station 2024 Sept 10 various 13 21 02 618000.jpeg",
  1600,
  1200,
  "Recent Nishi-Nippori Station view",
  "A second station-side image keeps the route anchored in Nishi-Nippori before Yanaka takes over.",
  1400,
);

const NISHI_NIPPORI_STATION_3 = commonsThumbImage(
  "File:Nishi-Nippori Station 2024 Sept 10 various 13 22 12 546000.jpeg",
  1600,
  1200,
  "Nishi-Nippori station entrance area",
  "The route needs one more Nishi-Nippori-side image so the opening is not visually erased by the destination district.",
  1400,
);

const SENDAGI_STATION_1 = commonsThumbImage(
  "File:Sendagi station - 2024 Sept 10 various.jpeg",
  1600,
  1200,
  "Sendagi Station in Tokyo",
  "A Sendagi station image makes the morning route read as station-to-neighborhood movement instead of generic old-town filler.",
  1400,
);

const SENDAGI_STATION_2 = commonsThumbImage(
  "File:Sendagi-station-Exit1.jpg",
  1600,
  1200,
  "Sendagi Station Exit 1",
  "An exit image matters because this route is really about how the neighborhood opens from the station in the first few minutes.",
  1400,
);

const OJI_STATION_GATE = commonsThumbImage(
  "File:Tokyo-Metro Oji-STA Gate.jpg",
  1600,
  1067,
  "Tokyo Metro Oji station gate",
  "The Oji side needs to be visible in the gallery, otherwise the page collapses into a generic Asukayama tram article.",
  1400,
);

const OJI_STATION_SIGN = commonsThumbImage(
  "File:TokyoMetro-N16-Oji-station-sign-20171209-160725.jpg",
  1200,
  1600,
  "Oji station sign in Tokyo",
  "One Oji sign image helps keep the title honest about where this route actually begins.",
  1200,
);

const KIYOSUMI_BLUE_BOTTLE_OUTSIDE = commonsThumbImage(
  "File:Bluebottlejapan-opening-outsidebuilding-feb8-2015.jpg",
  4608,
  3072,
  "Blue Bottle Coffee storefront in Kiyosumi-Shirakawa",
  "A roaster storefront makes it clear this route is about coffee plus the quieter streets around it.",
);

const KIYOSUMI_BLUE_BOTTLE_INSIDE = commonsThumbImage(
  "File:Bluebottlejapan-opening-insidebuilding-feb8-2015.jpg",
  2910,
  2283,
  "Coffee counter inside Blue Bottle Coffee in Kiyosumi-Shirakawa",
  "One interior roaster image grounds the route in actual coffee stops instead of only garden space.",
);

const KIYOSUMI_BLUE_BOTTLE_OUTSIDE_SOURCE = "File:Bluebottlejapan-opening-outsidebuilding-feb8-2015.jpg";
const KIYOSUMI_BLUE_BOTTLE_INSIDE_SOURCE = "File:Bluebottlejapan-opening-insidebuilding-feb8-2015.jpg";
const KIYOSUMI_BLUE_BOTTLE_LATTE_SOURCE =
  "File:清澄白河 Cafe, 東京 Blue Bottle, 東京, 日本, とうきょう, にっぽん, にほん, LATTE, BLEND, Kiyosumi Cafe, Tokyo Blue Bottle, Tokyo, Japan, Nippon, Nihon (22694591526).jpg";

const KIYOSUMI_COFFEE_WALK_IMAGES: GuideMediaImage[] = [
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-walk-hero.jpg",
    1600,
    1067,
    "Blue Bottle Kiyosumi-Shirakawa flagship exterior at the start of a coffee walk",
    "The walk should open on the flagship roastery facade itself, because this article is about coffee counters and coffee streets, not a garden detour.",
    KIYOSUMI_BLUE_BOTTLE_OUTSIDE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-facade.jpg",
    1600,
    1067,
    "Glass-fronted Blue Bottle roastery facade in Kiyosumi-Shirakawa",
    "A full facade view keeps the article honest about what the route is centered on: a serious coffee flagship, not a generic east-Tokyo stroll.",
    KIYOSUMI_BLUE_BOTTLE_OUTSIDE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-entrance.jpg",
    1600,
    1067,
    "Entrance line at the Blue Bottle flagship in Kiyosumi-Shirakawa",
    "This entrance crop shows the real first decision on the route: how the queue, the doorway, and the first cup shape the timing of the half day.",
    KIYOSUMI_BLUE_BOTTLE_OUTSIDE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-counter-wide.jpg",
    1600,
    1067,
    "Wide coffee counter scene inside the Kiyosumi-Shirakawa flagship",
    "The wide counter shot makes the page feel like a coffee walk instead of a neighborhood page that happens to mention coffee once.",
    KIYOSUMI_BLUE_BOTTLE_INSIDE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-espresso-bar.jpg",
    1600,
    1067,
    "Espresso bar and machines inside the Kiyosumi-Shirakawa roastery",
    "Espresso machines and the bar line are part of the point here. The walk should read as coffee-first from the visuals alone.",
    KIYOSUMI_BLUE_BOTTLE_INSIDE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-pour-over.jpg",
    1600,
    1067,
    "Pour-over counter detail inside the Blue Bottle flagship in Kiyosumi-Shirakawa",
    "A tighter counter detail keeps the gallery tied to the actual act of ordering and drinking coffee, not to filler scenery.",
    KIYOSUMI_BLUE_BOTTLE_INSIDE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-roastery-crowd.jpg",
    1600,
    1067,
    "Roastery crowd and coffee counter movement in Kiyosumi-Shirakawa",
    "This is the texture the title promises: people around a roastery counter, not a separate sightseeing anchor pulling the route away from coffee.",
    KIYOSUMI_BLUE_BOTTLE_INSIDE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-cups.jpg",
    1600,
    1067,
    "Coffee cups from Blue Bottle in Kiyosumi-Shirakawa",
    "Once the route is coffee-led, a cup-in-hand image belongs in the gallery because that is how most travelers actually experience the neighborhood.",
    KIYOSUMI_BLUE_BOTTLE_LATTE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-latte-art.jpg",
    1600,
    1067,
    "Close-up latte art from the Kiyosumi-Shirakawa coffee walk",
    "Latte art and cup detail make the article feel specific to a coffee walk rather than a generic Kiyosumi introduction with prettier captions.",
    KIYOSUMI_BLUE_BOTTLE_LATTE_SOURCE,
  ),
  derivedLocalGuideImage(
    "/guide/kiyosumi-shirakawa-walk/coffee-blue-bottle-cup.jpg",
    1600,
    1067,
    "Blue Bottle cup detail on a coffee counter in Kiyosumi-Shirakawa",
    "The closing image should still be unmistakably coffee-related, so the page ends on the same promise the title makes.",
    KIYOSUMI_BLUE_BOTTLE_LATTE_SOURCE,
  ),
];

const KIYOSUMI_GARDEN_COFFEE_IMAGES = [
  commonsThumbImage("File:Kiyosumi Garden (11301989825).jpg", 1600, 1200, "Pond and stepping stones at Kiyosumi Garden", "A garden stop belongs in the article because the route is meant to balance coffee with quieter outdoor space."),
  commonsThumbImage("File:Kiyosumi Garden (11302018475).jpg", 1600, 1200, "Garden path at Kiyosumi Garden", "The walk is stronger when it includes one calm garden segment rather than only roaster interiors."),
  commonsThumbImage("File:Kiyosumi Garden (9227377264).jpg", 1600, 1200, "Bridge and pond in Kiyosumi Garden", "A bridge and pond view keeps the article aligned with its coffee-and-garden framing."),
  commonsThumbImage("File:Kiyosumi-shirakawa-Station-ExitA1.jpg", 1600, 1200, "Kiyosumi-Shirakawa Station exit", "Station imagery makes the route more usable for travelers planning the walk on foot."),
  commonsThumbImage("File:Toei Kiyosumi-shirakawa-STA Gate.jpg", 1600, 1066, "Toei Kiyosumi-Shirakawa gate", "One station-gate image helps show how the route starts in practice."),
  commonsThumbImage("File:Tokyo-Metro Kiyosumi-shirakawa-STA Kiyosumi-dori-Ave-Gate.jpg", 1600, 1067, "Tokyo Metro gate at Kiyosumi-Shirakawa", "The neighborhood changes quickly once you leave the station, so the page should show that transition."),
  commonsThumbImage("File:Tokyo-Metro Kiyosumi-shirakawa-STA Mitsume-dori-Ave-Gate.jpg", 1600, 1067, "Another Kiyosumi-Shirakawa station gate", "This reinforces the station-to-neighborhood logic of the route."),
  commonsThumbImage("File:Bird @ Kiyosumi Garden (9227371118).jpg", 1600, 1200, "Birds and water at Kiyosumi Garden", "A garden wildlife view fits the slower side of Kiyosumi-Shirakawa better than another generic street scene."),
];

const KIYOSUMI_COFFEE_WALK_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/bluebottleroast/status/1889358892628623478", label: "Blue Bottle Coffee: カフェ体験と季節のラテが見える投稿" },
    { url: "https://x.com/JapanArchitects/status/1827217467296366881", label: "japan-architects: ブルーボトルの建築と店内体験の参考" },
    { url: "https://x.com/fullress/status/1996748084966314157", label: "Fullress: ブルーボトルの限定ドリンクと物販の参考" },
  ],
  en: [
    { url: "https://x.com/bluebottleroast/status/1889358892628623478", label: "Blue Bottle Coffee: a recent cafe-and-latte reference" },
    { url: "https://x.com/JapanArchitects/status/1827217467296366881", label: "japan-architects: a Blue Bottle architecture and cafe-space reference" },
    { url: "https://x.com/fullress/status/1996748084966314157", label: "Fullress: a limited Blue Bottle drink and merchandise reference" },
  ],
};

const YANAKA_CEMETERY_IMAGES = [
  commonsThumbImage("File:Yanaka Cemetery @ Nippori @ Tokyo (10621423595).jpg", 3648, 2736, "Yanaka Cemetery path in Tokyo", "The cemetery-edge stretch is the core reason this walk feels quieter than the shopping-street version of Yanaka."),
  commonsThumbImage("File:Tokyo - Yanaka 022 - Yanaka Cemetery (15621418149).jpg", 2848, 4288, "Trees and graves at Yanaka Cemetery", "Longer shaded paths are what slow the route down and separate it from a standard old-town stop list."),
  commonsThumbImage("File:Tokyo - Yanaka 037 - Yanaka Cemetery (15623053737).jpg", 4288, 2848, "Yanaka Cemetery lane in Tokyo", "This wider cemetery view fits the article title much better than a generic Yanaka street alone."),
  commonsThumbImage("File:Yanaka Cemetery @ Nippori @ Tokyo (10621466754).jpg", 3648, 2736, "Another cemetery-side path in Yanaka", "The walk works because the route keeps returning to this open, low-rise cemetery edge."),
  commonsThumbImage("File:Yanaka Cemetery @ Nippori @ Tokyo (10621474046).jpg", 2736, 3648, "Vertical Yanaka Cemetery view", "A vertical view helps show how the trees and graves shape the pace of the route."),
  commonsThumbImage("File:Yanaka Cemetery @ Nippori @ Tokyo (10621475746).jpg", 2736, 3648, "Tall trees at Yanaka Cemetery", "The cemetery is not just a landmark here. It is the reason the walk feels spacious by Tokyo standards."),
  commonsThumbImage("File:Cafe Kayaba 20211126.jpg", 4608, 3456, "Cafe Kayaba in Yanaka", "One deliberate cafe stop is enough once the cemetery section has done the slower work of the route."),
  commonsThumbImage("File:Cafe in Yanaka (53417016454).jpg", 5712, 4284, "Cafe exterior in Yanaka", "Cafe pauses matter here because they reset the walk without breaking the quieter mood."),
  commonsThumbImage("File:Cafe with Lanterns and Bicycle, Yanaka (53431278377).jpg", 5712, 4284, "Cafe with lanterns in Yanaka", "This kind of low-key cafe is a better match for the route than turning Yanaka into a food crawl."),
];

const YANAKA_LOW_RISE_STREET = commonsThumbImage(
  "File:2024-10-20 Tokyo, Yanaka 1.jpg",
  1600,
  1067,
  "Low-rise Yanaka street with small storefronts",
  "One lower-rise Yanaka street scene keeps the cemetery walk connected to the neighborhood around it.",
);

const KICHIJOJI_INOKASHIRA_IMAGES = [
  commonsThumbImage("File:Inokashira Benzaiten Temple @ Inokashira Park @ Kichijoji (9434335030).jpg", 3648, 2736, "Benzaiten Temple at Inokashira Park", "The park and temple setting is the visual anchor that the Kichijoji morning route was missing."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9431557927).jpg", 3648, 2736, "Morning view at Inokashira Park", "A calm park scene fits the second half of the route better than unrelated east-Tokyo imagery."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9431563835).jpg", 3648, 2736, "Park path at Inokashira Park", "The guide is about letting the park hold more of the morning, not just using it as a quick add-on."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9431564095).jpg", 3648, 2736, "Another tree-lined path at Inokashira Park", "This route is strongest when greenery and easy walking carry more of the story than store density."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9431564967).jpg", 3648, 2736, "Bridge and water in Inokashira Park", "Water and footbridges are part of what makes the park side feel like a true reset from the station area."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9431565721).jpg", 3648, 2736, "Quiet morning space in Inokashira Park", "The article title promises a park-led morning, so the gallery now shows that directly."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9434331196).jpg", 3648, 2736, "Lake view at Inokashira Park", "A lake-side image keeps the route anchored in the actual park instead of generic Tokyo calm."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9434336524).jpg", 3648, 2736, "Another Inokashira Park scene", "This reinforces the park-led structure of the half day."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9434337368).jpg", 3648, 2736, "Path and trees inside Inokashira Park", "The page now shows the park itself instead of pointing to another district."),
  commonsThumbImage("File:Inokashira Park @ Kichijoji (9434339020).jpg", 3648, 2736, "Green space inside Inokashira Park", "Kichijoji morning content should show the park that defines the route."),
];

const KICHIJOJI_INOKASHIRA_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/InokashiraZoo/status/2041326677683482913", label: "井の頭文化園: 井の頭まわりの朝の空気感" },
    { url: "https://x.com/InokashiraZoo/status/2040950255936819327", label: "井の頭文化園: 朝に立ち寄りやすい園内の様子" },
    { url: "https://x.com/InokashiraZoo/status/2040313390988685326", label: "井の頭文化園: 春の井の頭エリアの参考投稿" },
  ],
  en: [
    { url: "https://x.com/InokashiraZoo/status/2041326677683482913", label: "Inokashira Zoo: a morning reference close to the park" },
    { url: "https://x.com/InokashiraZoo/status/2040950255936819327", label: "Inokashira Zoo: an early-day park-area reference" },
    { url: "https://x.com/InokashiraZoo/status/2040313390988685326", label: "Inokashira Zoo: a seasonal reference for the park side of the route" },
  ],
};

const KAGURAZAKA_IMAGES = [
  commonsThumbImage("File:Kagurazaka Tokyo Japan.jpg", 1544, 1024, "Kagurazaka street in Tokyo", "The main slope belongs on this page, but only as the entry point into the quieter lanes behind it.", 1400),
  commonsThumbImage("File:Kagurazaka Tokyo Japan2.jpg", 1544, 1024, "Another Kagurazaka streetscape", "This keeps the article rooted in Kagurazaka rather than reusing Yanaka imagery.", 1400),
  commonsThumbImage("File:Kagurazaka path 2009.JPG", 2592, 1944, "Stone path in Kagurazaka", "Stone lanes are part of the title promise, so they now show up directly in the gallery."),
  commonsThumbImage("File:KagurazakaStreet.JPG", 1536, 1152, "Kagurazaka main street", "One main-street image is enough before the route turns into smaller side lanes.", 1400),
  commonsThumbImage("File:Mojo Coffee, Kagurazaka, Tokyo, Japan.jpg", 3000, 2000, "Coffee stop in Kagurazaka", "A smaller coffee stop fits the side-lane version of Kagurazaka better than a restaurant crawl."),
  commonsThumbImage("File:Kagurazaka-STA Kagurazaka-Gate.jpg", 5333, 3556, "Kagurazaka Station gate", "Station positioning matters because it changes how quickly the route escapes the main slope."),
  commonsThumbImage("File:Kagurazaka-Station-Exit1b-2020.jpg", 4032, 3024, "Kagurazaka Station Exit 1b", "An exit image makes the article more useful for first-time travelers building the route on foot."),
  commonsThumbImage("File:Kagurazaka-Station-Yaraicho-gate.jpg", 4032, 3024, "Yaraicho gate at Kagurazaka Station", "Different exits create meaningfully different starts for this district."),
  commonsThumbImage("File:Kagurazaka-station-exit1b.jpg", 3409, 3015, "Kagurazaka Station exit street scene", "Kagurazaka is about where the route turns, not just where the famous slope begins."),
  commonsThumbImage("File:TokyoMetro-T05-Kagurazaka-station-2-entrance.jpg", 2816, 2112, "Tokyo Metro entrance in Kagurazaka", "This keeps the page aligned with the district named in the title all the way through the gallery."),
];

const JIMBOCHO_IMAGES = [
  commonsThumbImage("File:Books along a walkway in the Kanda-Jimbocho area of Tokyo.JPG", 3264, 2448, "Books along a walkway in Jimbocho", "Outdoor book displays immediately communicate why this district is different from a generic Tokyo shopping walk."),
  commonsThumbImage("File:2013-02-25 Second-hand bookshop in Kanda-Jinbocho.jpg", 4000, 2248, "Secondhand bookstore in Kanda-Jimbocho", "Used-book interiors belong on this page because the title is explicitly about booktown walking."),
  commonsThumbImage("File:Bookshop in Kanda-Jimbocho area of Tokyo.JPG", 3264, 2448, "Bookshop in Kanda-Jimbocho", "A street-facing bookshop is a much better fit than a generic central Tokyo storefront."),
  commonsThumbImage("File:Jimbōchō Book Town 2025 01.jpg", 2675, 3576, "Jimbocho Book Town street scene", "Recent Jimbocho street photography keeps the gallery locked to the district named in the title."),
  commonsThumbImage("File:Jimbōchō Book Town 2025 02.jpg", 3880, 2587, "Another view of Jimbocho Book Town", "This reinforces that the route is really about books, side streets, and kissa pauses in the same district."),
  commonsThumbImage("File:Jinbocho ladrio 2023-10-20(2) as.jpg", 8192, 5464, "Coffee stop in Jimbocho", "One classic coffee stop fits the title much better than sending the gallery to another neighborhood entirely."),
  commonsThumbImage("File:Kanda-Jimboucho Book Town.jpg", 480, 640, "Historic booktown reference in Jimbocho", "Even a small-format historical image supports the booktown theme better than generic Tokyo imagery.", 900),
  commonsThumbImage("File:Kitazawa Foreign Bookstore, at Kanda-Jinbocho.jpg", 1704, 2272, "Kitazawa Foreign Bookstore in Jimbocho", "Named bookstores make the article feel grounded in the actual district rather than in a generic reading theme."),
  commonsThumbImage("File:San'yodo Shoten, at Kanda-Jinbocho.jpg", 1704, 2272, "San'yodo Shoten in Jimbocho", "Another real Jimbocho storefront keeps the title and gallery in sync."),
  commonsThumbImage("File:Suzuran Street Jimbocho.jpg", 6000, 4000, "Suzuran Street in Jimbocho", "A street-level Jimbocho image closes the gallery with the district itself, not an unrelated Tokyo block."),
];

const JIMBOCHO_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/sawatokyokosho/status/1985893957755432997", label: "神保町の古書店まわりに近い参考投稿" },
    { url: "https://x.com/asahipress_2hen/status/1204022566765023233", label: "神保町まわりの書店イベント参考" },
    { url: "https://x.com/20th_jinbocho/status/1734774114232242414", label: "神保町エリアの本と街の動きの参考" },
  ],
  en: [
    { url: "https://x.com/sawatokyokosho/status/1985893957755432997", label: "A Jimbocho used-book reference" },
    { url: "https://x.com/asahipress_2hen/status/1204022566765023233", label: "A bookstore event reference around Jimbocho" },
    { url: "https://x.com/20th_jinbocho/status/1734774114232242414", label: "A neighborhood books-and-street reference for Jimbocho" },
  ],
};

const NAKAMEGURO_DAIKANYAMA_IMAGES = [
  commonsThumbImage("File:Walk in Nakameguro 2.jpg", 4032, 3024, "Walkable street in Nakameguro", "The route is about what happens once you leave the headline photo spots and walk the smaller streets."),
  commonsThumbImage("File:Nakameguro 1-chome.jpg", 4080, 3072, "Nakameguro neighborhood street", "A residential-adjacent Nakameguro street fits the article better than reused east-Tokyo imagery."),
  commonsThumbImage("File:Nakameguro 2-chome.jpg", 4080, 3072, "Another Nakameguro side street", "This keeps the page tied to the quieter side of Nakameguro rather than just the river photo stops."),
  commonsThumbImage("File:Meguro river view.jpg", 3906, 3125, "Meguro River view", "One river image is enough to acknowledge the obvious draw before the route turns into side streets."),
  commonsThumbImage("File:Daikan-yama Station - central exit - June 10 2019.jpg", 5208, 3928, "Daikanyama Station central exit", "Station positioning matters because the route changes character once Daikanyama takes over from Nakameguro."),
  commonsThumbImage("File:Walk in Daikanyama.jpg", 4032, 3024, "Walkable side street in Daikanyama", "This is the kind of quieter Daikanyama street the title is actually promising."),
  commonsThumbImage("File:Daikanyama Tokyo (95913545).jpeg", 2048, 1399, "Street scene in Daikanyama", "A real Daikanyama street scene is a much better fit than a placeholder from another district."),
  commonsThumbImage("File:Daikanyama Tokyo (95913553).jpeg", 2048, 1366, "Another Daikanyama block", "This supports the side-street framing of the guide rather than a single destination stop."),
  commonsThumbImage("File:Buildings in Daikanyama -23742.jpeg", 3072, 4080, "Buildings in Daikanyama", "The route works because Daikanyama changes the walking texture without requiring a full itinerary reset."),
  commonsThumbImage("File:\"Cirty library\" in Daikanyama.jpg", 4080, 3072, "Daikanyama library storefront", "A calmer storefront image keeps the guide grounded in the side-street version of Daikanyama."),
];

const NAKAMEGURO_DAIKANYAMA_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/meguro_city/status/2041395548264304983", label: "目黒区: 中目黒の街歩き寄りの最新参考" },
    { url: "https://x.com/meguro_city/status/2038858833674854524", label: "目黒区: 中目黒スクエア周辺の参考投稿" },
    { url: "https://x.com/DAIKANYAMATSITE/status/2039540101487943898", label: "代官山 蔦屋書店: 代官山側の最新動き" },
  ],
  en: [
    { url: "https://x.com/meguro_city/status/2041395548264304983", label: "Meguro city: a current Nakameguro street reference" },
    { url: "https://x.com/meguro_city/status/2038858833674854524", label: "Meguro city: a local Nakameguro area update" },
    { url: "https://x.com/DAIKANYAMATSITE/status/2039540101487943898", label: "Daikanyama T-Site: a Daikanyama-side neighborhood reference" },
  ],
};

const SHIBAMATA_IMAGES = [
  commonsThumbImage("File:Shibamata street.jpg", 1527, 1069, "Retro shopping street in Shibamata", "The retro shopping street has to be visible here because it is one of the main reasons to do the day trip at all.", 1400),
  commonsThumbImage("File:Shibamata -Edogawa.jpg", 3745, 2487, "Edogawa riverside near Shibamata", "The river edge is what gives the second half of the route room after the temple approach."),
  commonsThumbImage("File:Shibamata Taishakuten March 11 2021 various 20 44 40 638000.jpeg", 4032, 3024, "Shibamata Taishakuten detail", "Temple detail belongs on the page because the route is built around the Taishakuten approach."),
  commonsThumbImage("File:Shibamata Taishakuten.jpg", 1150, 766, "Shibamata Taishakuten main view", "A direct Taishakuten image aligns the gallery with the title immediately.", 1200),
  commonsThumbImage("File:Yamamoto-Tei Shibamata.jpg", 2592, 986, "Yamamoto-tei in Shibamata", "Yamamoto-tei is part of what makes the outing feel like a fuller retro half day rather than only a temple stop."),
  commonsThumbImage("File:Yamamototei entrance shibamata 2009.JPG", 2592, 1944, "Entrance to Yamamoto-tei in Shibamata", "This reinforces that the route extends naturally beyond the approach street."),
  commonsThumbImage("File:Rickshaw by TANAKA Juuyoh in Shibamata, Tokyo.jpg", 3648, 2736, "Rickshaw in Shibamata", "A rickshaw image supports the retro mood the title promises without needing a film-reference detour."),
  commonsThumbImage("File:Keisei Bus Katsushika Shobu Meguri Bus Shibamata Taishakuten Bus stop sign 2018.jpg", 1536, 2048, "Bus stop sign near Shibamata Taishakuten", "Transit access matters because this is framed as a day trip rather than only a neighborhood stroll."),
  commonsThumbImage("File:Tokyo metropolitan road 307 at Shibamata 7chome 20191002 160857.jpg", 4032, 2268, "Street scene in Shibamata 7-chome", "This keeps the gallery rooted in the broader Shibamata area, not just the main shopping street."),
  commonsThumbImage("File:Tokyo metropolitan road 307 near Shin-Shibamata station 20191002 160041.jpg", 4032, 2268, "Street near Shin-Shibamata Station", "A station-adjacent image helps the article function as a usable day-trip guide."),
];

const KURAMAE_STATION_EXIT = commonsThumbImage(
  "File:Kuramae Station July 31 2021 various.jpeg",
  1600,
  1200,
  "Kuramae Station exit in Tokyo",
  "A Kuramae station exit matters because these routes begin to work only once the station flips quickly into a walkable east-Tokyo block.",
  1400,
);

const KURAMAE_STATION_A6 = commonsThumbImage(
  "File:Kuramae-Sta-A6.JPG",
  1600,
  1200,
  "Kuramae Station A6 exit in Tokyo",
  "An A6-side entry makes the walk read as Kuramae from the first minute instead of drifting into generic central-Tokyo access imagery.",
  1400,
);

const TOEI_KURAMAE_GATE = commonsThumbImage(
  "File:Toei Kuramae-STA Gate.jpg",
  1600,
  1067,
  "Toei Kuramae station gate in Tokyo",
  "A gate image keeps the route practical and location-specific before the bridge and small-shop sections take over.",
  1400,
);

const TOEI_KURAMAE_PLATFORM = commonsThumbImage(
  "File:Toei Kuramae-STA Platform1-2.jpg",
  1600,
  1067,
  "Toei Kuramae station platform",
  "Platform views help this page stay tied to the actual station logic that shapes short Kuramae half days.",
  1400,
);

const KURAMAE_A17_PLATFORM = commonsThumbImage(
  "File:Toei-subway-A17-Kuramae-station-platform-20230514-082053.jpg",
  1600,
  1067,
  "Asakusa Line platform at Kuramae Station",
  "The Kuramae side needs one more clear station image so the route does not collapse into bridge-only abstraction.",
  1400,
);

const KURAMAE_BRIDGE_OCT = commonsThumbImage(
  "File:Kuramaebashi - Tokyo - Oct 2015.jpg",
  1600,
  1200,
  "Kuramae Bridge in Tokyo",
  "A second bridge view makes Kuramae feel like a real river-edge neighborhood rather than a single-photo motif.",
  1400,
);

const SUMIDA_RIVER_TOKYO = commonsThumbImage(
  "File:Tokyo - Sumida river (2318963173).jpg",
  1600,
  1200,
  "Sumida River in east Tokyo",
  "The Sumida edge is part of the route logic whenever Kuramae and Asakusa are tied together in one half day.",
  1400,
);

const KURAMAE_SHRINE_COMMONS = commonsThumbImage(
  "File:Kuramaejinja - Taito- July 31 2021 various.jpeg",
  1600,
  1200,
  "Kuramae Shrine in Tokyo",
  "A Kuramae shrine image is still useful as a neighborhood anchor as long as it is not allowed to become the whole page.",
  1400,
);

const ASAKUSA_AZUMA_RIVERSIDE = commonsThumbImage(
  "File:Sumida Riverside at Azuma Bridge in 2010.jpg",
  1600,
  1200,
  "Sumida riverside at Azuma Bridge in Asakusa",
  "An Asakusa-side riverside view is the cleanest way to show that this route leaves the denser temple axis for the water edge.",
  1400,
);

const MORISHITA_STATION_BUILDING = commonsThumbImage(
  "File:Morishita Station-2.jpg",
  1600,
  1200,
  "Morishita Station in Tokyo",
  "A Morishita station image is needed so the route reads as Morishita to Kiyosumi, not just another Kiyosumi page with a renamed intro.",
  1400,
);

const MORISHITA_ENTRANCE_A1 = commonsThumbImage(
  "File:Toei-subway-Morishita-station-entrance-A1-20190831-171117.jpg",
  1600,
  1067,
  "Morishita Station entrance A1",
  "An entrance-level image keeps the opening leg geographically honest and usable for first-time visitors.",
  1400,
);

const MORISHITA_SIGN = commonsThumbImage(
  "File:Toei-subway-E13-Morishita-station-sign-20191201-113918.jpg",
  1600,
  1067,
  "Morishita station sign in Tokyo",
  "The Morishita side should be visible in the gallery itself, not only inferred from the copy.",
  1400,
);

const TOEI_MORISHITA_SHIN_OHASHI_GATE = commonsThumbImage(
  "File:Toei Morishita-STA Shin-ohashi-District-Gate.jpg",
  1600,
  1067,
  "Shin-Ohashi district gate at Morishita Station",
  "A second Morishita gate makes the route feel like a real entry sequence instead of a post-hoc title claim.",
  1400,
);

const RYOGOKU_STATION_NIGHT = commonsThumbImage(
  "File:JR Ryogoku Station building at night 20211008.jpg",
  1600,
  1067,
  "JR Ryogoku Station building at night",
  "A Ryogoku station building image anchors the opening side of the walk before bridges shift the route toward Kuramae.",
  1400,
);

const TOEI_RYOGOKU_PLATFORM = commonsThumbImage(
  "File:Toei Ryogoku-STA Platform1-2.jpg",
  1600,
  1067,
  "Toei Ryogoku station platform",
  "Platform imagery keeps the route tied to Ryogoku's actual transit geometry rather than a vague east-Tokyo idea.",
  1400,
);

const RYOGOKU_BRIDGE_SUNSET = commonsThumbImage(
  "File:Sunset across the Ryogoku bridge from the bank of the Sumida river at Onmagayashi.jpg",
  1600,
  1200,
  "Sunset view across Ryogoku Bridge",
  "A Ryogoku Bridge view matters because the bridge crossing is the whole point of the route shape.",
  1400,
);

const KURAMAE_BRIDGE_VIEW = commonsThumbImage(
  "File:Tokyo Skytree, view from Kuramae-bashi bridge on Sumida-gawa river. (14555040147).jpg",
  1600,
  900,
  "View from Kuramae Bridge toward the Sumida River and Tokyo Skytree",
  "A bridge-led hero fits Kuramae better when the article is promising river-edge movement instead of only generic neighborhood texture.",
);

const ASAKUSA_SUMIDA_VIEW = commonsThumbImage(
  "File:Sumida River + Tokyo Skytree @ Asakusa (13824463095).jpg",
  1600,
  1200,
  "Sumida River view near Asakusa",
  "A Sumida River view makes the Asakusa and Kuramae route read as a riverside walk instead of a shrine-led page.",
);

const MONZEN_NAKACHO_GATE = commonsThumbImage(
  "File:Toei Monzen-nakacho-STA Gate.jpg",
  1600,
  1067,
  "Monzen-Nakacho station gate in Tokyo",
  "A Monzen-Nakacho entry image anchors the route in the station and neighborhood named in the title.",
);

const MORISHITA_GATE = commonsThumbImage(
  "File:Toei Morishita-STA Kiyosumi-dori-District-Gate.jpg",
  1600,
  1200,
  "Morishita station gate in Tokyo",
  "A Morishita-side entry image clarifies that this route starts in quieter east-Tokyo streets before Kiyosumi takes over.",
);

const MACHIYA_STATION_VIEW = commonsThumbImage(
  "File:Machiya-nichome Station September 12 2021 various.jpeg",
  1600,
  1200,
  "Machiya-Nichome station area in Tokyo",
  "A Machiya hero makes the tram walk read as a real neighborhood route rather than a generic Asukayama page.",
);

const RYOGOKU_GATE = commonsThumbImage(
  "File:Toei Ryogoku-STA Gate.jpg",
  1600,
  1067,
  "Ryogoku station gate in Tokyo",
  "A Ryogoku-side station image keeps the route tied to its actual start point instead of implying Kuramae only.",
);

const KURAMAE_SMALL_SHOPS_IMAGES = [
  KURAMAE_BRIDGE_VIEW,
  KURAMAE_STATION_EXIT,
  KURAMAE_STATION_A6,
  TOEI_KURAMAE_GATE,
  TOEI_KURAMAE_PLATFORM,
  KURAMAE_A17_PLATFORM,
  KURAMAE_BRIDGE_OCT,
  SUMIDA_RIVER_TOKYO,
  KURAMAE_SHRINE_COMMONS,
];

const ASAKUSA_KURAMAE_IMAGES = [
  ASAKUSA_SUMIDA_VIEW,
  ASAKUSA_AZUMA_RIVERSIDE,
  KURAMAE_BRIDGE_VIEW,
  KURAMAE_BRIDGE_OCT,
  SUMIDA_RIVER_TOKYO,
  KURAMAE_STATION_EXIT,
  TOEI_KURAMAE_GATE,
  TOEI_KURAMAE_PLATFORM,
  KURAMAE_A17_PLATFORM,
];

const MORISHITA_KIYOSUMI_IMAGES = [
  MORISHITA_GATE,
  MORISHITA_STATION_BUILDING,
  MORISHITA_ENTRANCE_A1,
  MORISHITA_SIGN,
  TOEI_MORISHITA_SHIN_OHASHI_GATE,
  KIYOSUMI_GARDEN_COFFEE_IMAGES[0],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[1],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[2],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[3],
];

const RYOGOKU_KURAMAE_IMAGES = [
  RYOGOKU_GATE,
  RYOGOKU_STATION_NIGHT,
  TOEI_RYOGOKU_PLATFORM,
  RYOGOKU_BRIDGE_SUNSET,
  SUMIDA_RIVER_TOKYO,
  KURAMAE_BRIDGE_VIEW,
  KURAMAE_BRIDGE_OCT,
  KURAMAE_STATION_EXIT,
  TOEI_KURAMAE_GATE,
];

const OMOKAGEBASHI_VIEW = commonsThumbImage(
  "File:Omokage-bashi 2016.jpg",
  1024,
  768,
  "Omokagebashi bridge in Tokyo",
  "An Omokagebashi image is the minimum needed for the Waseda and Omokagebashi title to feel literal.",
  1400,
);

const WASEDA_TRAM_SIGN = commonsThumbImage(
  "File:Tokyo Sakura Tram Waseda Station Signage.jpg",
  1600,
  1067,
  "Tokyo Sakura Tram Waseda Station signage",
  "A Waseda-side tram image keeps the route aligned with the actual stations named in the title.",
);

const WASEDA_OMOKAGEBASHI_IMAGES = [
  WASEDA_TRAM_SIGN,
  commonsThumbImage("File:Waseda Station - Toden - March 25 2008.jpg", 640, 480, "Waseda tram stop in Tokyo", "A Waseda stop view makes the route feel geographically real, not generic.", 1200),
  commonsThumbImage("File:Waseda Stop.jpg", 640, 480, "Waseda Stop on the Tokyo Sakura Tram", "The route needs visible Waseda-side tram content to justify the title.", 1200),
  commonsThumbImage("File:Waseda Stop 2.jpg", 640, 480, "Another Waseda tram stop view", "Waseda should appear in the gallery itself, not only in the copy.", 1200),
  commonsThumbImage("File:Waseda Stop 3.jpg", 640, 480, "Waseda tram stop streetscape", "This keeps the route tied to Waseda before it reaches Omokagebashi.", 1200),
  OMOKAGEBASHI_VIEW,
  commonsThumbImage("File:Omokage-bashi bridge 166.JPG", 2816, 2112, "Omokagebashi bridge detail", "The bridge itself is part of the title promise and has to be shown directly.", 1400),
  commonsThumbImage("File:Omokagebashi Station.jpg", 2048, 1536, "Omokagebashi Station in Tokyo", "Station imagery keeps the route usable for visitors walking it in order.", 1400),
  commonsThumbImage("File:Toden-SA29-Omokagebashi-station-platform-20181214-143646.jpg", 4608, 3456, "Omokagebashi station platform", "The platform image makes the Omokagebashi half of the walk unambiguous.", 1400),
];

const MONZEN_FUKAGAWA_IMAGES = [
  commonsThumbImage("File:Toei-monzen-nakacho-platform.jpg", 1280, 853, "Monzen-Nakacho platform in Tokyo", "Platform and gate images make the station-led start legible for travelers.", 1400),
  MONZEN_NAKACHO_GATE,
  commonsThumbImage("File:Toei Monzen-nakacho-STA Platform1-2.jpg", 1600, 1067, "Monzen-Nakacho station platform 1 and 2", "This reinforces that the route genuinely starts in Monzen-Nakacho.", 1400),
  commonsThumbImage("File:Toei Monzen-nakacho-STA Tozai-Line-for-Nakano-Transfer-Gate.jpg", 1600, 1067, "Transfer gate at Monzen-Nakacho Station", "Transfer-gate imagery helps the route stay practical rather than abstract.", 1400),
  commonsThumbImage("File:Tokyo-metro Monzen-nakacho-STA Kuramaebashi-dori-Ave-Gate.jpg", 1600, 1067, "Tokyo Metro gate at Monzen-Nakacho", "This keeps the gallery tied to the actual station and district named in the title.", 1400),
  commonsThumbImage("File:Fukagawa (13593943875).jpg", 1600, 1200, "Street scene in Fukagawa", "A Fukagawa street view keeps the second half of the route from collapsing back into generic Kiyosumi photos.", 1400),
  commonsThumbImage("File:River cruise @ Oedo Fukagawa Cherry Blossom Festival @ Tokyo (13593846035).jpg", 1600, 1200, "River scene in Fukagawa", "A Fukagawa waterside image is needed for the waterside framing of the article.", 1400),
  commonsThumbImage("File:River cruise @ Oedo Fukagawa Cherry Blossom Festival @ Tokyo (13593848035).jpg", 1600, 1200, "Another Fukagawa river view", "The page should visibly show the waterside side of Fukagawa, not only transit gates.", 1400),
  commonsThumbImage("File:River cruise @ Oedo Fukagawa Cherry Blossom Festival @ Tokyo (13594219924).jpg", 1600, 1200, "Fukagawa canal-side view", "This keeps the gallery aligned with the waterside promise in the title.", 1400),
];

const TOKYO_WATERFRONT_SLOW_IMAGES = [
  ASAKUSA_SUMIDA_VIEW,
  ASAKUSA_AZUMA_RIVERSIDE,
  SUMIDA_RIVER_TOKYO,
  MONZEN_NAKACHO_GATE,
  MONZEN_FUKAGAWA_IMAGES[5],
  MONZEN_FUKAGAWA_IMAGES[6],
  MONZEN_FUKAGAWA_IMAGES[7],
  MONZEN_FUKAGAWA_IMAGES[8],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[0],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[1],
];

const MACHIYA_IMAGES = [
  MACHIYA_STATION_VIEW,
  commonsThumbImage("File:Machiya-nichome Station September 12 2021 various 04 48 50 465000.jpeg", 1600, 1200, "Another Machiya-Nichome station view", "Multiple Machiya views are necessary so the route does not drift back into an Asukayama page.", 1400),
  commonsThumbImage("File:Tokyo-Metro Machiya-STA Elevator-Gate.jpg", 1600, 1067, "Tokyo Metro Machiya elevator gate", "Station-gate images keep the guide specific to Machiya.", 1400),
  commonsThumbImage("File:Tokyo-Metro Machiya-STA Machiya-Gate.jpg", 1600, 1067, "Tokyo Metro Machiya gate", "A second Machiya gate makes the route more usable on arrival.", 1400),
  commonsThumbImage("File:Tokyo-Metro Machiya-STA Platform1.jpg", 1600, 1067, "Machiya station platform 1", "Platform imagery helps the page read as a real tram-line route starting in Machiya.", 1400),
  commonsThumbImage("File:Tokyo-Metro Machiya-STA Platform2.jpg", 1600, 1067, "Machiya station platform 2", "Another Machiya platform view keeps the gallery geographically honest.", 1400),
  commonsThumbImage("File:Toden Arakawa Line (12432172594).jpg", 1600, 1200, "Toden Arakawa Line streetcar in Tokyo", "One generic tram image is fine once the page is already clearly anchored in Machiya.", 1400),
  commonsThumbImage("File:Toden Arakawa Line in Tokyo, Japan; August 2010.jpg", 1600, 1200, "Another Toden Arakawa Line view", "A tram-line route still needs actual tram imagery, not only station gates.", 1400),
  commonsThumbImage("File:Toden-arakawa-line-Omokagebashi-station.jpg", 1600, 1067, "Tokyo Sakura Tram on an urban street", "One rolling-stock image helps complete the route without pulling it away from the tram theme.", 1400),
];

const UENO_YANAKA_IMAGES = [
  UENO_STATION_PARK_GATE,
  UENO_PARK_GATE_1,
  UENO_PARK_GATE_2,
  YANAKA_LOW_RISE_STREET,
  ...YANAKA_CEMETERY_IMAGES.slice(0, 6),
];

const NISHI_NIPPORI_YANAKA_IMAGES = [
  NISHI_NIPPORI_STATION_1,
  NISHI_NIPPORI_STATION_2,
  NISHI_NIPPORI_STATION_3,
  YANAKA_LOW_RISE_STREET,
  ...YANAKA_CEMETERY_IMAGES.slice(0, 6),
];

const SENDAGI_MORNING_IMAGES = [
  SENDAGI_STATION_1,
  SENDAGI_STATION_2,
  YOMISE_DORI_IMAGE,
  NEZU_SHRINE_IMAGE,
  YANAKA_LOW_RISE_STREET,
  ...YANAKA_CEMETERY_IMAGES.slice(0, 5),
];

const OJI_ASUKAYAMA_IMAGES = [
  OJI_STATION_GATE,
  OJI_STATION_SIGN,
  TODEN_ASUKAYAMA_IMAGE,
  commonsThumbImage("File:Asukayama Park.jpg", 1600, 1067, "Asukayama Park in Tokyo", "Asukayama Park is part of the point of this route, not just a generic green pause.", 1400),
  commonsThumbImage("File:Asukayama Park 19.jpg", 1600, 1200, "Path inside Asukayama Park", "The park path matters because this walk is about the Oji side as much as the tram itself.", 1400),
  commonsThumbImage("File:Asukayama Park 24.jpg", 1600, 1200, "Another path inside Asukayama Park", "A second park view keeps the route aligned with the park-led half-day structure promised in the title.", 1400),
  commonsThumbImage("File:Asukayama Park 27.jpg", 1600, 1200, "Green area in Asukayama Park", "Asukayama needs to appear directly in the gallery instead of being left to the copy alone.", 1400),
  commonsThumbImage("File:Asukayama Park 28.jpg", 1600, 2133, "Vertical Asukayama Park view", "A vertical park image helps show that the Oji side has real breathing room.", 1400),
  commonsThumbImage("File:Toden Arakawa Line (12432172594).jpg", 1600, 1200, "Tokyo Sakura Tram streetcar on the route", "A tram-line route still needs one obvious tram image once the station and park context are established.", 1400),
  commonsThumbImage("File:Toden Arakawa Line in Tokyo, Japan; August 2010.jpg", 1600, 1200, "Another Tokyo Sakura Tram street scene", "This closes the set without losing the Oji and Asukayama focus.", 1400),
];

const TOKYO_MORNING_IMAGES = [
  YANAKA_STREET_IMAGE,
  NEZU_SHRINE_IMAGE,
  YOMISE_DORI_IMAGE,
  ...KICHIJOJI_INOKASHIRA_IMAGES.slice(0, 4),
  ...YANAKA_CEMETERY_IMAGES.slice(0, 3),
];

const TOKYO_LOCAL_TRANSIT_IMAGES = [
  UENO_STATION_PARK_GATE,
  MONZEN_NAKACHO_GATE,
  MORISHITA_GATE,
  MACHIYA_STATION_VIEW,
  WASEDA_TRAM_SIGN,
  OJI_STATION_GATE,
  KIYOSUMI_GARDEN_COFFEE_IMAGES[3],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[4],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[5],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[6],
];

const TOKYO_OLD_TOWN_HILLSIDE_IMAGES = [
  KAGURAZAKA_IMAGES[0],
  KAGURAZAKA_IMAGES[1],
  KAGURAZAKA_IMAGES[2],
  NEZU_SHRINE_IMAGE,
  YANAKA_LOW_RISE_STREET,
  ...YANAKA_CEMETERY_IMAGES.slice(0, 5),
];

const STATION_BASED_SHORT_STAY_IMAGES = [
  UENO_STATION_PARK_GATE,
  NISHI_NIPPORI_STATION_1,
  SENDAGI_STATION_1,
  MONZEN_NAKACHO_GATE,
  MORISHITA_GATE,
  MACHIYA_STATION_VIEW,
  WASEDA_TRAM_SIGN,
  KIYOSUMI_GARDEN_COFFEE_IMAGES[3],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[4],
  KIYOSUMI_GARDEN_COFFEE_IMAGES[5],
];

const UENO_YANAKA_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 上野側から静かな東京へ入る朝の参考" },
    { url: "https://x.com/uenotoshogu/status/2040216484417573116", label: "上野東照宮: 上野側の立ち寄り参考" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "文京区公式: 根津・谷根千へつながる街歩き温度の参考" },
  ],
  en: [
    { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: an early-morning Ueno-side reference" },
    { url: "https://x.com/uenotoshogu/status/2040216484417573116", label: "Ueno Toshogu: a Ueno-side stop that pairs well with the walk" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "Bunkyo ward: a neighborhood-walk reference that fits the Yanaka side" },
  ],
};

const NEZU_SENDAGI_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/NedujinjaOhgai/status/2039595160791875832", label: "根津神社まわりの新緑と街歩きの雰囲気" },
    { url: "https://x.com/NedujinjaOhgai/status/2039485998586032513", label: "根津神社まわりの静かな景色" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "文京区公式: 千駄木まわりの街歩き感に近い投稿" },
  ],
  en: [
    { url: "https://x.com/NedujinjaOhgai/status/2039595160791875832", label: "A Nezu Shrine and greenery reference" },
    { url: "https://x.com/NedujinjaOhgai/status/2039485998586032513", label: "A calmer Nezu Shrine view" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "A Bunkyo ward post that fits the Sendagi side of the walk" },
  ],
};

const OJI_ASUKAYAMA_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/toeikotsu_eng/status/2041063366857462042", label: "都電の最新運行状況 夕方便" },
    { url: "https://x.com/toeikotsu_eng/status/2040912370747551810", label: "都電の最新運行状況 朝便" },
    { url: "https://x.com/toeikotsu/status/2041063365712433193", label: "都営交通公式: 都電運行情報" },
  ],
  en: [
    { url: "https://x.com/toeikotsu_eng/status/2041063366857462042", label: "Tokyo Sakura Tram evening service status" },
    { url: "https://x.com/toeikotsu_eng/status/2040912370747551810", label: "Tokyo Sakura Tram morning service status" },
    { url: "https://x.com/toeikotsu/status/2041063365712433193", label: "Toei transport official tram status" },
  ],
};

const TOKYO_MORNING_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 朝の静かな東京の参考" },
    { url: "https://x.com/InokashiraZoo/status/2041326677683482913", label: "井の頭まわりの朝時間に近い参考" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "文京区公式: 朝散歩に近い街歩きの参考" },
  ],
  en: [
    { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a quiet Tokyo morning reference" },
    { url: "https://x.com/InokashiraZoo/status/2041326677683482913", label: "Inokashira-area morning reference" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "Bunkyo ward: a neighborhood-morning reference" },
  ],
};

const TOKYO_LOCAL_TRANSIT_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/toeikotsu_eng/status/2041063366857462042", label: "都電・都営側の最新運行状況" },
    { url: "https://x.com/toeikotsu/status/2040912368147010009", label: "都営交通公式: 朝の運行状況" },
    { url: "https://x.com/toeikotsu/status/2040700975892320344", label: "都営交通公式: 夕方の運行状況" },
  ],
  en: [
    { url: "https://x.com/toeikotsu_eng/status/2041063366857462042", label: "A local-transit status check for the day" },
    { url: "https://x.com/toeikotsu/status/2040912368147010009", label: "Morning Toei transport status" },
    { url: "https://x.com/toeikotsu/status/2040700975892320344", label: "Evening Toei transport status" },
  ],
};

const TOKYO_OLD_TOWN_HILLSIDE_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO公式: 江戸の痕跡と旧市街歩きの参考" },
    { url: "https://x.com/NedujinjaOhgai/status/2039595160791875832", label: "根津神社まわりの旧市街的な空気感" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "文京区公式: 坂と旧市街の街歩きに近い投稿" },
  ],
  en: [
    { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO: an old-Tokyo historical walking reference" },
    { url: "https://x.com/NedujinjaOhgai/status/2039595160791875832", label: "A Nezu-side old-town reference" },
    { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "Bunkyo ward: a slower hillside-and-neighborhood reference" },
  ],
};

const STATION_BASED_SHORT_STAY_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 朝にすぐ歩き始められる東京の参考" },
    { url: "https://x.com/toeikotsu_eng/status/2041063366857462042", label: "都営側の最新運行状況の参考" },
    { url: "https://x.com/InokashiraZoo/status/2041326677683482913", label: "短時間で組みやすい朝ルートの参考" },
  ],
  en: [
    { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a short-stay morning-walk reference" },
    { url: "https://x.com/toeikotsu_eng/status/2041063366857462042", label: "Transit status reference for a short-stay day" },
    { url: "https://x.com/InokashiraZoo/status/2041326677683482913", label: "A compact morning-route reference" },
  ],
};

const KURAMAE_BRIDGE_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/kuramaeiine/status/2030463059828027671", label: "蔵前橋まわりの橋景色の参考" },
    { url: "https://x.com/kuramaeiine/status/2030088136227967190", label: "蔵前橋の光と川沿いの参考" },
    { url: "https://x.com/kuramaeiine/status/2030792925832184027", label: "蔵前の朝食と小さな店の参考" },
  ],
  en: [
    { url: "https://x.com/kuramaeiine/status/2030463059828027671", label: "A bridge-side Kuramae reference" },
    { url: "https://x.com/kuramaeiine/status/2030088136227967190", label: "Kuramae Bridge and river mood reference" },
    { url: "https://x.com/kuramaeiine/status/2030792925832184027", label: "A small-shop and breakfast reference near Kuramae" },
  ],
};

const KIYOSUMI_GARDEN_AND_COFFEE_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/KiyosumiTeien/status/2040959759235621217", label: "清澄庭園の季節の参考" },
    { url: "https://x.com/KiyosumiTeien/status/2039555359740940707", label: "清澄庭園の花の参考" },
    { url: "https://x.com/bluebottleroast/status/1889358892628623478", label: "ブルーボトル清澄白河のコーヒー体験の参考" },
  ],
  en: [
    { url: "https://x.com/KiyosumiTeien/status/2040959759235621217", label: "A seasonal Kiyosumi Garden reference" },
    { url: "https://x.com/KiyosumiTeien/status/2039555359740940707", label: "A Kiyosumi Garden flowers reference" },
    { url: "https://x.com/bluebottleroast/status/1889358892628623478", label: "A Blue Bottle Kiyosumi-Shirakawa coffee reference" },
  ],
};

const MONZEN_FUKAGAWA_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/KiyosumiTeien/status/2040979030548299824", label: "東東京の水辺と緑に近い参考" },
    { url: "https://x.com/KiyosumiTeien/status/2040251219831349644", label: "東東京の雨の日の水辺の参考" },
    { url: "https://x.com/KiyosumiTeien/status/2039609841896018288", label: "東東京の庭園施設運用の参考" },
  ],
  en: [
    { url: "https://x.com/KiyosumiTeien/status/2040979030548299824", label: "An east-Tokyo greenery and waterside reference" },
    { url: "https://x.com/KiyosumiTeien/status/2040251219831349644", label: "A rainy-day east-Tokyo waterside reference" },
    { url: "https://x.com/KiyosumiTeien/status/2039609841896018288", label: "A practical east-Tokyo garden facility reference" },
  ],
};

const ASAKUSA_KURAMAE_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/kuramaeiine/status/2030463059828027671", label: "蔵前橋まわりの参考" },
    { url: "https://x.com/kuramaeiine/status/2030088136227967190", label: "隅田川と蔵前橋の参考" },
    { url: "https://x.com/icho8man/status/2033076363670991003", label: "浅草橋寄りの東東京の空気感の参考" },
  ],
  en: [
    { url: "https://x.com/kuramaeiine/status/2030463059828027671", label: "A Kuramae bridge-side reference" },
    { url: "https://x.com/kuramaeiine/status/2030088136227967190", label: "A Sumida and Kuramae bridge reference" },
    { url: "https://x.com/icho8man/status/2033076363670991003", label: "An east-Tokyo side-street reference near the Asakusabashi side" },
  ],
};

const RYOGOKU_KURAMAE_X: Partial<Record<GuideLocale, GuideXEmbed[]>> = {
  ja: [
    { url: "https://x.com/edotokyomuseum/status/2037429580269777351", label: "両国側の文化スポットの参考" },
    { url: "https://x.com/kuramaeiine/status/2030463059828027671", label: "蔵前橋まわりの橋景色の参考" },
    { url: "https://x.com/kuramaeiine/status/2030088136227967190", label: "隅田川と橋の流れの参考" },
  ],
  en: [
    { url: "https://x.com/edotokyomuseum/status/2037429580269777351", label: "A Ryogoku-side cultural reference" },
    { url: "https://x.com/kuramaeiine/status/2030463059828027671", label: "A Kuramae bridge-side reference" },
    { url: "https://x.com/kuramaeiine/status/2030088136227967190", label: "A Sumida bridge-and-river reference" },
  ],
};

export const MINOR_GUIDE_CONFIG_OVERRIDES: Partial<Record<string, MinorGuideConfigOverride>> = {
  "quiet-tokyo-neighborhoods": {
    heroImage: YANAKA_STREET_IMAGE,
    galleryOverride: [
      NEZU_SHRINE_IMAGE,
      YOMISE_DORI_IMAGE,
      KURAMAE_BRIDGE_VIEW,
      KIYOSUMI_GARDEN_COFFEE_IMAGES[0],
      KICHIJOJI_INOKASHIRA_IMAGES[0],
      YANAKA_CEMETERY_IMAGES[0],
      MACHIYA_STATION_VIEW,
      MONZEN_NAKACHO_GATE,
      KAGURAZAKA_IMAGES[0],
    ],
    xEmbedsOverride: GENERIC_TOKYO_WALK_X,
    photoFocusOverride: {
      ja: "谷中、根津、清澄白河、蔵前のように、静かな東京が地区ごとにどう違って見えるか",
      en: "how quieter Tokyo looks across districts such as Yanaka, Nezu, Kiyosumi-Shirakawa, Kuramae, and other low-pressure streets",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["静かな", "東京"],
        en: ["quiet", "tokyo"],
      },
      requiredVisualTerms: {
        ja: ["東京"],
        en: ["tokyo"],
      },
    },
  },
  "yanaka-nezu-sendagi-walk": {
    heroImage: NEZU_SHRINE_IMAGE,
    galleryOverride: [
      YANAKA_STREET_IMAGE,
      YOMISE_DORI_IMAGE,
      ...YANAKA_CEMETERY_IMAGES.slice(0, 7),
    ],
    xEmbedsOverride: NEZU_SENDAGI_X,
    photoFocusOverride: {
      ja: "谷中、根津、千駄木の三つの街区がどうつながるか。神社、路地、低い店並みの切り替わり",
      en: "how Yanaka, Nezu, and Sendagi connect through shrine space, lower-rise streets, and quieter old-town lanes",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["谷中", "根津", "千駄木"],
        en: ["yanaka", "nezu", "sendagi"],
      },
      requiredVisualTerms: {
        ja: ["谷中", "根津"],
        en: ["yanaka", "nezu"],
      },
    },
  },
  "kiyosumi-shirakawa-walk": {
    heroImage: KIYOSUMI_COFFEE_WALK_IMAGES[0],
    galleryOverride: KIYOSUMI_COFFEE_WALK_IMAGES.slice(1),
    xEmbedsOverride: KIYOSUMI_COFFEE_WALK_X,
    photoFocusOverride: {
      ja: "フラッグシップの外観、入口の並び、カウンター、エスプレッソマシン、ラテ、持ち歩く一杯",
      en: "the flagship exterior, the entrance line, the coffee counter, espresso machines, latte detail, and the cup-in-hand mood of the walk",
    },
    copyOverride: {
      xDescriptionJa: "Xの埋め込みはコーヒー関連の投稿だけへ固定し、庭園や別地区の汎用リンクは外しています。",
      xDescriptionEn: "These embeds are coffee-specific now. The page no longer falls back to garden or generic district posts.",
      foodJa: "このルートではコーヒーを二回までに抑えるくらいがちょうどよく、最初はフラッグシップ、二杯目は同じ街区の小さな店へ寄せると題名どおりの半日になります。",
      foodEn: "Two coffee stops are enough here. The strongest version uses the flagship first, then one smaller second cup on the same Kiyosumi-Shirakawa grid instead of drifting into unrelated sightseeing.",
      weatherJa: "雨でも成立しますが、その場合は庭園へ逃げず、フラッグシップと二杯目の店、それをつなぐ短い街区だけで組んだ方がタイトルとの整合が保てます。",
      weatherEn: "Rain is fine, but the fix is not to escape into a garden. Keep the day anchored to the flagship, a second coffee stop, and the short streets between them.",
      transportJa: "重要なのは庭園の時間ではなく、駅出口、行列、営業時間、クラス開催の有無です。清澄白河はその場で順番を入れ替えることが多いので、軽く見られる状態が合います。",
      transportEn: "What matters here is not garden timing but station exits, queue length, opening hours, and whether a class or special menu is running. This route works best when you can reorder stops in real time.",
    },
    ja: {
      title: "清澄白河のコーヒー街歩き",
      description: "清澄白河で本気のコーヒー時間を半日にまとめるための街歩きガイドです。フラッグシップのロースタリー、カウンター、二杯目の寄り方までコーヒー軸で整理します。",
      lead: "このページは清澄庭園へ逃がすためのものではなく、清澄白河をコーヒー街として読み切るためのガイドです。起点はブルーボトルのフラッグシップで、そこから先もコーヒーの余韻が切れない範囲で歩きます。",
      route: "清澄白河駅から入り、平野一丁目のブルーボトル清澄白河フラッグシップを一つ目の軸にします。その後は白河・常盤・清澄の低い街区へ戻り、iki ESPRESSO や Allpress Espresso Tokyo Roastery & Cafe のような二杯目候補を同じ街区で拾う形がもっとも扱いやすいです。",
      focus: "主題は庭園や水辺ではなく、ロースタリーの外観、C Bar やトレーニングラボのようなコーヒー体験、持ち歩く一杯と低い街区のつながりです。コーヒーの温度を切らさず半日を組めるかがこのルートの核心です。",
      bestFor: "東京で一度はちゃんとしたコーヒー半日を作りたい旅行者",
      avoid: "清澄白河を庭園と組み合わせた汎用観光ルートとして扱いたい人",
      extension: "延ばすなら同じ清澄白河の街区で二杯目を足し、短縮するならフラッグシップともう一杯だけで終える方がタイトルどおりにまとまります。",
      timeNeeded: "2.5〜4時間",
    },
    en: {
      title: "Kiyosumi-Shirakawa Coffee Walk",
      description: "A coffee-first Kiyosumi-Shirakawa guide built around the flagship roastery, coffee counters, and the low-rise streets that still feel like part of the same cup-to-cup walk.",
      lead: "This page is not here to soften Kiyosumi-Shirakawa with a garden detour. It is here to treat the district as a real coffee walk, with the Blue Bottle flagship as the center of gravity and the rest of the half day staying loyal to that coffee logic.",
      route: "Start from Kiyosumi-Shirakawa Station and make the Blue Bottle flagship at 1-4-8 Hirano the first anchor. After that, stay on the Kiyosumi-Shirakawa grid for a second coffee stop such as iki ESPRESSO or Allpress Espresso Tokyo Roastery & Cafe, instead of drifting toward unrelated sightseeing filler.",
      focus: "The point is the roastery exterior, the counter experience, the C Bar and training-lab culture described in Blue Bottle's own flagship material, and the way one serious cup leads into another across the same quiet set of blocks.",
      bestFor: "travelers who want one serious Tokyo coffee half day rather than a mixed sightseeing loop",
      avoid: "travelers who want to dilute Kiyosumi-Shirakawa into a garden-and-coffee compromise",
      extension: "Extend by adding one second cup on the same coffee grid, or shorten by keeping only the flagship and one nearby follow-up stop.",
      timeNeeded: "2.5 to 4 hours",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["清澄", "コーヒー", "フラッグシップ"],
        en: ["kiyosumi", "coffee", "flagship"],
      },
      requiredVisualTerms: {
        en: ["coffee", "roastery", "latte"],
      },
    },
  },
  "kuramae-walk": {
    heroImage: KURAMAE_BRIDGE_VIEW,
    galleryOverride: KURAMAE_SMALL_SHOPS_IMAGES,
    xEmbedsOverride: KURAMAE_BRIDGE_X,
    photoFocusOverride: {
      ja: "橋の見え方、小さな店の密度、駅を出た直後の交差点、川沿いへ抜ける時の空気",
      en: "bridge views, small-shop density, the first intersection after the station, and the change in feel as the route reaches the river edge",
    },
    copyOverride: {
      xDescriptionJa: "Xの埋め込みは蔵前、橋、浅草橋寄りの街歩きに近い投稿へ寄せ、別地区の固定リンクは避けています。",
      xDescriptionEn: "These embeds now stay with Kuramae, nearby bridges, and adjacent east-Tokyo street references instead of pretending the route is about product categories alone.",
    },
    ja: {
      title: "蔵前の小さな店と橋景色の街歩き",
      description: "蔵前で小さな店、橋の景色、静かな東東京の通りをつなぐための半日街歩きガイドです。",
      lead: "蔵前の良さは、商品ジャンルよりも、橋景色と小さな店が同じ速度で現れることにあります。",
      route: "蔵前駅から入り、小さな店を一つ二つ、橋の見える区間を一つ、その間の静かな通りをつなぐ形がもっとも扱いやすいです。",
      focus: "買い物の件数ではなく、橋と街区の切り替わり、小さな店に入る前後の余白がこのルートの核になります。",
    },
    en: {
      title: "Kuramae Small Shops and Bridge Views Walk",
      description: "A lower-key Kuramae half day built around small shops, bridge views, and the slower east-Tokyo streets between them.",
      lead: "Kuramae is more convincing when it is framed as a walk between smaller shops and bridge views, not as a checklist of product categories.",
      route: "Start at Kuramae Station, keep one or two small-shop stops, one bridge segment, and use the quieter blocks between them as part of the route rather than filler.",
      focus: "The point is the change between small-shop streets and river-edge views, not the number of retail stops you can stack into the walk.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["蔵前", "橋"], en: ["kuramae", "bridge"] },
      requiredVisualTerms: { en: ["kuramae", "bridge"] },
    },
  },
  "yanaka-cemetery-and-cafe-walk": {
    heroImage: YANAKA_CEMETERY_IMAGES[0],
    galleryOverride: [...YANAKA_CEMETERY_IMAGES.slice(1), YANAKA_LOW_RISE_STREET],
    xEmbedsOverride: NEZU_SENDAGI_X,
    photoFocusOverride: {
      ja: "谷中霊園の長い並木道、墓地の境目、低い街並みの喫茶、霊園から街へ戻る時の静けさ",
      en: "long tree-lined cemetery paths, the edge between graves and neighborhood streets, low-key cafes, and the quiet shift back into Yanaka blocks",
    },
    copyOverride: {
      xDescriptionJa: "Xの埋め込みは谷中側の街歩き温度に近いものへ寄せ、霊園と喫茶の雰囲気を壊す別地区リンクを避けています。",
      xDescriptionEn: "The embeds are pulled toward slow Yanaka references so the page no longer reuses unrelated district posts that break the cemetery-and-cafe mood.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["谷中", "霊園", "喫茶"], en: ["yanaka", "cemetery", "cafe"] },
      requiredVisualTerms: { en: ["yanaka", "cemetery"] },
    },
  },
  "kiyosumi-garden-coffee-roasters-walk": {
    heroImage: KIYOSUMI_BLUE_BOTTLE_OUTSIDE,
    galleryOverride: [KIYOSUMI_BLUE_BOTTLE_INSIDE, ...KIYOSUMI_GARDEN_COFFEE_IMAGES.slice(0, 8)],
    xEmbedsOverride: KIYOSUMI_GARDEN_AND_COFFEE_X,
    photoFocusOverride: {
      ja: "ロースターの外観と店内、庭園の水辺、駅から店と庭園へ切り替わる通り",
      en: "roaster storefronts and interiors, garden waterside views, and the short streets that connect the station, cafes, and Kiyosumi Garden",
    },
    copyOverride: {
      xDescriptionJa: "Xの埋め込みは清澄庭園と清澄白河の現地感に寄せ、記事と無関係な固定リンクを外しています。",
      xDescriptionEn: "These embeds stay tied to the Kiyosumi area so the post set no longer drifts away from the garden-and-roaster framing of the guide.",
    },
    ja: {
      title: "清澄庭園とコーヒー散歩ガイド",
      description: "清澄庭園と清澄白河のコーヒー時間を一つの半日としてつなぐ街歩きガイドです。",
    },
    en: {
      title: "Kiyosumi Garden and Coffee Walk",
      description: "A Kiyosumi half day that links Kiyosumi Garden with one strong coffee stop and the slower streets between them.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["清澄", "庭園", "コーヒー"], en: ["kiyosumi", "garden", "coffee"] },
      requiredVisualTerms: { en: ["kiyosumi", "garden", "coffee"] },
    },
  },
  "kuramae-bridge-and-craft-walk": {
    heroImage: KURAMAE_BRIDGE_VIEW,
    galleryOverride: KURAMAE_SMALL_SHOPS_IMAGES,
    xEmbedsOverride: KURAMAE_BRIDGE_X,
    photoFocusOverride: {
      ja: "橋の見え方、小さな店の外観、交差点、川沿いへ抜ける時の街区の変化",
      en: "bridge views, small storefronts, key intersections, and the neighborhood change that happens as the route reaches the river",
    },
    ja: {
      title: "蔵前の橋景色と小さな店の街歩き",
      description: "蔵前の橋景色と小さな店を中心に、東東京らしい余白を歩くための半日ガイドです。",
      focus: "橋と小さな店の切り替わりを見ることが目的で、商品の種類を細かく追うことは主題ではありません。",
    },
    en: {
      title: "Kuramae Bridge Views and Small-Shop Walk",
      description: "A Kuramae half day centered on bridge views, smaller storefronts, and the slower east-Tokyo blocks between them.",
      focus: "The route is about the shift between bridges and smaller shop-lined streets, not about promising a fully itemized craft crawl.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["蔵前", "橋"], en: ["kuramae", "bridge"] },
      requiredVisualTerms: { en: ["kuramae", "bridge"] },
    },
  },
  "tokyo-tram-line-stops": {
    heroImage: TODEN_ASUKAYAMA_IMAGE,
    galleryOverride: [
      ...OJI_ASUKAYAMA_IMAGES.slice(1, 6),
      ...MACHIYA_IMAGES.slice(0, 3),
      WASEDA_OMOKAGEBASHI_IMAGES[0],
    ],
    xEmbedsOverride: OJI_ASUKAYAMA_X,
    photoFocusOverride: {
      ja: "都電そのものだけでなく、停留場、公園、町屋側の生活道路まで含めた沿線の空気",
      en: "not only the tram itself but also the stop spacing, parks, and residential-scale roads that make the tram line feel local",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["都電", "東京"],
        en: ["tram", "tokyo"],
      },
      requiredVisualTerms: {
        ja: ["都電"],
        en: ["tram"],
      },
    },
  },
  "rainy-day-tokyo-neighborhoods": {
    heroImage: YOMISE_DORI_IMAGE,
    galleryOverride: [
      SENDAGI_STATION_1,
      SENDAGI_STATION_2,
      YANAKA_STREET_IMAGE,
      YANAKA_CEMETERY_IMAGES[7],
      KAGURAZAKA_IMAGES[4],
      KIYOSUMI_GARDEN_COFFEE_IMAGES[3],
      KIYOSUMI_GARDEN_COFFEE_IMAGES[4],
      MONZEN_NAKACHO_GATE,
      KURAMAE_BRIDGE_VIEW,
    ],
    xEmbedsOverride: {
      ja: [
        { url: "https://x.com/KiyosumiTeien/status/2040251219831349644", label: "清澄公園: 雨の日の参考" },
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 静かな東京の朝の参考" },
        { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "文京区公式: 商店街と街歩きの参考" },
      ],
      en: [
        { url: "https://x.com/KiyosumiTeien/status/2040251219831349644", label: "Kiyosumi Park: a rainy-day reference" },
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a quiet-Tokyo morning reference" },
        { url: "https://x.com/bunkyo_tokyo/status/2040595277674152282", label: "Bunkyo ward: a shopping-street walk reference" },
      ],
    },
    photoFocusOverride: {
      ja: "雨でも歩ける商店街、駅を出てすぐ休める街、濡れすぎずに次の判断ができる東京の路地",
      en: "shopping streets and calmer Tokyo lanes that still work in rain because they stay close to stations and easy indoor pauses",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["雨", "東京"],
        en: ["rainy", "tokyo"],
      },
      requiredVisualTerms: {
        ja: ["東京"],
        en: ["tokyo"],
      },
    },
  },
  "ueno-to-yanaka-walk": {
    heroImage: UENO_YANAKA_IMAGES[0],
    galleryOverride: UENO_YANAKA_IMAGES.slice(1),
    xEmbedsOverride: UENO_YANAKA_X,
    photoFocusOverride: {
      ja: "上野駅側から谷中へ抜ける入口、駅の密度が低い街並みに変わる瞬間",
      en: "the Ueno-side station entry and the moment the route shifts from Ueno density into Yanaka's lower-rise streets",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["上野", "谷中"],
        en: ["ueno", "yanaka"],
      },
      requiredVisualTerms: {
        ja: ["上野", "谷中"],
        en: ["ueno", "yanaka"],
      },
    },
  },
  "nezu-sendagi-morning-walk": {
    heroImage: SENDAGI_MORNING_IMAGES[0],
    galleryOverride: SENDAGI_MORNING_IMAGES.slice(1),
    xEmbedsOverride: NEZU_SENDAGI_X,
    photoFocusOverride: {
      ja: "千駄木駅から朝の根津神社やよみせ通りへ抜ける、開店前後の静かな東京",
      en: "the quieter hour when Sendagi Station, Nezu Shrine, and Yomise-dori still feel like a real morning sequence",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["根津", "千駄木", "朝"],
        en: ["nezu", "sendagi", "morning"],
      },
      requiredVisualTerms: {
        ja: ["根津", "千駄木"],
        en: ["nezu", "sendagi"],
      },
    },
  },
  "oji-asukayama-tram-walk": {
    heroImage: OJI_ASUKAYAMA_IMAGES[0],
    galleryOverride: OJI_ASUKAYAMA_IMAGES.slice(1),
    xEmbedsOverride: OJI_ASUKAYAMA_X,
    photoFocusOverride: {
      ja: "王子駅、飛鳥山公園、都電が同じ半日でどうつながるか",
      en: "how Oji Station, Asukayama Park, and the Tokyo Sakura Tram lock together as one half day",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["王子", "飛鳥山", "都電"],
        en: ["oji", "asukayama", "tram"],
      },
      requiredVisualTerms: {
        ja: ["王子", "飛鳥山"],
        en: ["oji", "asukayama"],
      },
    },
  },
  "nishi-nippori-yanaka-walk": {
    heroImage: NISHI_NIPPORI_YANAKA_IMAGES[0],
    galleryOverride: NISHI_NIPPORI_YANAKA_IMAGES.slice(1),
    xEmbedsOverride: NEZU_SENDAGI_X,
    photoFocusOverride: {
      ja: "西日暮里駅から谷中へ入る静かな入口と、谷中らしい低い街並みへの切り替わり",
      en: "the quieter Nishi-Nippori entry and the gradual shift into Yanaka's slower low-rise streets",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["西日暮里", "谷中"],
        en: ["nishi-nippori", "yanaka"],
      },
      requiredVisualTerms: {
        ja: ["西日暮里", "谷中"],
        en: ["nishi-nippori", "yanaka"],
      },
    },
  },
  "sendagi-yomise-dori-walk": {
    heroImage: YOMISE_DORI_IMAGE,
    galleryOverride: [
      SENDAGI_STATION_1,
      SENDAGI_STATION_2,
      NEZU_SHRINE_IMAGE,
      YANAKA_STREET_IMAGE,
      ...YANAKA_CEMETERY_IMAGES.slice(0, 5),
    ],
    xEmbedsOverride: NEZU_SENDAGI_X,
    photoFocusOverride: {
      ja: "よみせ通り、千駄木駅、商店街から一本入った静かな路地",
      en: "Yomise-dori itself, Sendagi Station, and the quieter side lanes that make the shopping street feel lived-in",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["千駄木", "よみせ"],
        en: ["sendagi", "yomise"],
      },
      requiredVisualTerms: {
        ja: ["千駄木", "よみせ"],
        en: ["sendagi", "yomise"],
      },
    },
  },
  "hebi-michi-nezu-shrine-walk": {
    heroImage: NEZU_SHRINE_IMAGE,
    galleryOverride: [
      YANAKA_STREET_IMAGE,
      SENDAGI_STATION_2,
      YOMISE_DORI_IMAGE,
      ...YANAKA_CEMETERY_IMAGES.slice(0, 6),
    ],
    xEmbedsOverride: NEZU_SENDAGI_X,
    photoFocusOverride: {
      ja: "根津神社からへび道へ抜ける静かな路地と、神社の余韻が生活道路へ変わる瞬間",
      en: "the shift from Nezu Shrine into Hebi-michi-style side lanes where shrine atmosphere gives way to quieter residential streets",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["へび道", "根津"],
        en: ["hebi", "nezu"],
      },
      requiredVisualTerms: {
        ja: ["根津"],
        en: ["nezu"],
      },
    },
  },
  "kichijoji-inokashira-park-morning": {
    heroImage: KICHIJOJI_INOKASHIRA_IMAGES[0],
    galleryOverride: KICHIJOJI_INOKASHIRA_IMAGES.slice(1),
    xEmbedsOverride: KICHIJOJI_INOKASHIRA_X,
    photoFocusOverride: {
      ja: "井の頭公園の水辺、弁財天、園路、吉祥寺駅南口から公園へ抜ける流れ",
      en: "Inokashira Park water views, Benzaiten, calmer paths, and the move from Kichijoji Station into the park side of the morning",
    },
    copyOverride: {
      xDescriptionJa: "Xの埋め込みは井の頭公園まわりの朝時間に近い投稿だけを使い、別地区の固定リンクは外しています。",
      xDescriptionEn: "These embeds are pulled toward actual Inokashira-area references so the page no longer reuses unrelated east-Tokyo posts.",
      foodJa: "吉祥寺では朝食や喫茶を一回だけ入れるくらいがちょうどよく、公園の時間を削りすぎない方がこのルートらしくなります。",
      foodEn: "One breakfast or coffee stop is enough here. The route gets better when the park still carries most of the morning.",
      weatherJa: "小雨でも成立しますが、公園の滞在を少し短くして駅南口側の屋内休憩を増やす方が安定します。",
      weatherEn: "This still works in light rain, but it improves if you shorten the park time slightly and let one indoor stop near the station do more of the work.",
      transportJa: "吉祥寺駅南口と公園側の入口を押さえておけば十分です。",
      transportEn: "You mostly need the south-side Kichijoji exit and the right park entry points to keep the route readable.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["吉祥寺", "井の頭"], en: ["kichijoji", "inokashira"] },
      requiredVisualTerms: { en: ["inokashira"] },
    },
  },
  "kagurazaka-backstreets-walk": {
    heroImage: KAGURAZAKA_IMAGES[0],
    galleryOverride: KAGURAZAKA_IMAGES.slice(1),
    xEmbedsOverride: GENERIC_TOKYO_WALK_X,
    photoFocusOverride: {
      ja: "坂の途中で曲がる細い路地、石畳、小さな喫茶、駅出口ごとの入り方の違い",
      en: "narrow lanes branching off the slope, stone paths, low-key cafe fronts, and the different route shapes created by each station exit",
    },
    copyOverride: {
      xDescriptionJa: "公開投稿が限られるため、Xの埋め込みは神楽坂の空気に近い東京街歩きの投稿へ絞っています。",
      xDescriptionEn: "Public Kagurazaka posts are limited, so the embeds are narrowed to Tokyo walking references that still match the side-lane mood of the page.",
      foodJa: "神楽坂では飲食の件数を増やすより、坂と路地を一度落ち着いて歩いてから一軒だけ入る方がこの街らしくまとまります。",
      foodEn: "Kagurazaka works better when you let the slopes and lanes settle first, then use one cafe or small food stop instead of turning the route into a restaurant list.",
      weatherJa: "小雨の日はむしろ相性が良いですが、強い雨なら坂の長い往復を減らして駅寄りの路地を多めに使ってください。",
      weatherEn: "Light rain still fits this district, but in heavier weather the route improves if you shorten the longest slope segments and stay closer to the station-side lanes.",
      transportJa: "飯田橋側から入るか神楽坂駅側から入るかで空気が変わるので、入口だけ先に決めておくと十分です。",
      transportEn: "The route changes a lot depending on whether you enter from Iidabashi or from Kagurazaka Station, so deciding the entry side early is usually enough.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["神楽坂"], en: ["kagurazaka"] },
      requiredVisualTerms: { en: ["kagurazaka"] },
    },
  },
  "jimbocho-kanda-booktown-walk": {
    heroImage: JIMBOCHO_IMAGES[0],
    galleryOverride: JIMBOCHO_IMAGES.slice(1),
    xEmbedsOverride: JIMBOCHO_X,
    photoFocusOverride: {
      ja: "店先に並ぶ本、古書店の棚、喫茶、神保町の通りが書店街として見える瞬間",
      en: "books spilling onto the street, used-book interiors, old coffee shops, and the moments when Jimbocho visibly reads as booktown instead of generic central Tokyo",
    },
    copyOverride: {
      xDescriptionJa: "Xの埋め込みは神保町の古書店や街の動きに近い投稿へ寄せ、無関係な東東京リンクは外しています。",
      xDescriptionEn: "These embeds now stay with Jimbocho book references instead of reusing unrelated east-Tokyo neighborhood posts.",
      foodJa: "喫茶は一回で十分で、主役は本棚と通りの密度です。長居できる一軒を決める方が神保町らしくなります。",
      foodEn: "One coffee-house stop is enough. The route is really about shelves, storefront density, and how the streets themselves read as booktown.",
      weatherJa: "小雨ならかなり成立します。書店と喫茶が近いので、濡れる区間を短くしながら歩けます。",
      weatherEn: "This works well in light rain because bookshops and coffee-house stops stay close together and shorten the exposed segments.",
      transportJa: "神保町駅と御茶ノ水側への抜けだけ押さえておけば十分です。",
      transportEn: "You mainly need the Jimbocho exit and the possible Ochanomizu-side escape if you want to end on a different line.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["神保町", "本"], en: ["jimbocho", "book"] },
      requiredVisualTerms: { en: ["jimbocho", "book"] },
    },
  },
  "nakameguro-daikanyama-side-streets": {
    heroImage: NAKAMEGURO_DAIKANYAMA_IMAGES[0],
    galleryOverride: NAKAMEGURO_DAIKANYAMA_IMAGES.slice(1),
    xEmbedsOverride: NAKAMEGURO_DAIKANYAMA_X,
    photoFocusOverride: {
      ja: "川沿いから裏通りへ切り替わる瞬間、代官山の小さな街区、駅から住宅地寄りへ抜ける通り",
      en: "the shift from river edge to side streets, smaller Daikanyama blocks, and the routes that move away from the station into calmer residential-adjacent streets",
    },
    copyOverride: {
      xDescriptionJa: "Xの埋め込みは中目黒と代官山の実景に寄せ、神保町や東東京の固定リンクを使わない形に戻しています。",
      xDescriptionEn: "These embeds now stay with Nakameguro and Daikanyama instead of inheriting fixed links from unrelated districts.",
      foodJa: "ここも店数より一軒の休憩で十分です。主役は川沿いから裏通りへ切り替わる歩きの温度差です。",
      foodEn: "One stop is enough here too. The route is stronger when the shift from the river edge into side streets stays central.",
      weatherJa: "小雨なら成立しますが、川沿いを短くして代官山側の街区を少し増やす方が安定します。",
      weatherEn: "This still works in light rain, but it improves if you shorten the river segment and let Daikanyama-side blocks do more of the work.",
      transportJa: "中目黒駅で入って代官山で抜けるか、その逆かを決めておけば十分です。",
      transportEn: "You mainly need to choose whether the route starts at Nakameguro and exits through Daikanyama or the reverse.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["中目黒", "代官山"], en: ["nakameguro", "daikanyama"] },
      requiredVisualTerms: { en: ["nakameguro", "daikanyama"] },
    },
  },
  "shibamata-retro-day-trip": {
    heroImage: SHIBAMATA_IMAGES[0],
    galleryOverride: SHIBAMATA_IMAGES.slice(1),
    xEmbedsOverride: GENERIC_TOKYO_WALK_X,
    photoFocusOverride: {
      ja: "柴又帝釈天の参道、レトロな商店街、山本亭、江戸川沿いへ抜ける余白",
      en: "the Taishakuten approach, retro shopping-street details, Yamamoto-tei, and the extra breathing room that appears once the route reaches the Edogawa side",
    },
    copyOverride: {
      xDescriptionJa: "公開投稿が散っているため、Xの埋め込みは東京の街歩き参考に絞りつつ、記事本体は柴又の実景へ合わせています。",
      xDescriptionEn: "Public Shibamata posts are scattered, so the embeds are kept as broader Tokyo walking references while the article itself stays tightly aligned with Shibamata.",
      foodJa: "柴又は食べ歩きよりも、参道を一度歩いてから一軒入る方がまとまります。主役は街の速度です。",
      foodEn: "Shibamata is better with one deliberate stop after the approach street rather than a long grazing list. The route is really about tempo and retro texture.",
      weatherJa: "小雨でも成立しますが、川沿いの区間を短くして帝釈天と山本亭を軸にすると安定します。",
      weatherEn: "This still works in light rain, but it is stronger if you shorten the riverside segment and let the Taishakuten-Yamamoto-tei axis carry the day.",
      transportJa: "京成側と北総側のどちらで入るかだけ押さえておけば、現地では十分調整できます。",
      transportEn: "You mainly need to decide whether the route starts from the Keisei side or the Hokuso side. After that the walk is easy to adjust.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["柴又"], en: ["shibamata"] },
      requiredVisualTerms: { en: ["shibamata"] },
    },
  },
  "monzen-nakacho-fukagawa-walk": {
    heroImage: MONZEN_NAKACHO_GATE,
    galleryOverride: MONZEN_FUKAGAWA_IMAGES,
    xEmbedsOverride: MONZEN_FUKAGAWA_X,
    photoFocusOverride: {
      ja: "門前仲町の駅前、深川の寺社と水辺、生活街へ抜ける橋まわり",
      en: "Monzen-Nakacho station edges, Fukagawa shrine-and-waterside segments, and the bridges that link them back to quieter residential streets",
    },
    ja: {
      title: "門前仲町と深川の水辺街歩き",
      description: "門前仲町から深川の寺社と水辺へつなぐ、東東京らしい半日街歩きガイドです。",
    },
    en: {
      title: "Monzen-Nakacho and Fukagawa Waterside Walk",
      description: "A practical east-Tokyo half day linking Monzen-Nakacho with Fukagawa shrine space and waterside streets.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["門前仲町", "深川"], en: ["monzen", "fukagawa"] },
      requiredVisualTerms: { en: ["monzen"] },
    },
  },
  "asakusa-kuramae-sumida-walk": {
    heroImage: ASAKUSA_SUMIDA_VIEW,
    galleryOverride: ASAKUSA_KURAMAE_IMAGES,
    xEmbedsOverride: ASAKUSA_KURAMAE_X,
    photoFocusOverride: {
      ja: "浅草側の川景色、隅田川、蔵前へ戻る橋、混雑から外れた東東京の抜け方",
      en: "Asakusa-side river views, the Sumida River itself, bridges back toward Kuramae, and the quieter exits away from the densest tourist flow",
    },
    ja: {
      title: "浅草の川沿いから蔵前へ歩く半日ルート",
      description: "浅草の外縁と隅田川、蔵前の静かな東東京ブロックをつなぐ半日ルートです。",
    },
    en: {
      title: "Asakusa Riverside to Kuramae Walk",
      description: "A half-day east-Tokyo route that leaves the busiest Asakusa blocks for the Sumida River edge and a calmer Kuramae finish.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["浅草", "蔵前", "隅田"], en: ["asakusa", "kuramae", "sumida"] },
      requiredVisualTerms: { en: ["asakusa", "sumida"] },
    },
  },
  "morishita-kiyosumi-walk": {
    heroImage: MORISHITA_GATE,
    galleryOverride: MORISHITA_KIYOSUMI_IMAGES,
    xEmbedsOverride: KIYOSUMI_GARDEN_AND_COFFEE_X,
    photoFocusOverride: {
      ja: "森下の駅前と生活街、清澄庭園へ移る前の静かな東東京の通り",
      en: "Morishita station edges, quieter everyday east-Tokyo streets, and the change in mood before the route reaches Kiyosumi Garden",
    },
    ja: {
      title: "森下から清澄庭園へ歩く半日ガイド",
      description: "森下の生活街から清澄庭園へつなぐ、東東京らしい静かな半日ガイドです。",
    },
    en: {
      title: "Morishita to Kiyosumi Garden Walk",
      description: "A slower east-Tokyo half day that starts in Morishita streets and ends with a Kiyosumi Garden pause.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["森下", "清澄"], en: ["morishita", "kiyosumi"] },
      requiredVisualTerms: { en: ["morishita"] },
    },
  },
  "ryogoku-kuramae-walk": {
    heroImage: RYOGOKU_GATE,
    galleryOverride: RYOGOKU_KURAMAE_IMAGES,
    xEmbedsOverride: RYOGOKU_KURAMAE_X,
    photoFocusOverride: {
      ja: "両国側の入口、橋を渡って蔵前へ変わる空気、川沿いと駅前の切り替わり",
      en: "the Ryogoku-side entry, the pace change as the walk crosses bridges toward Kuramae, and the shift between station blocks and river edges",
    },
    ja: {
      title: "両国から蔵前へ橋を渡って歩く半日ガイド",
      description: "両国側から入り、橋と川沿いを使って蔵前へ抜ける東東京の半日ルートです。",
    },
    en: {
      title: "Ryogoku to Kuramae Bridge Walk",
      description: "A practical east-Tokyo half day that starts on the Ryogoku side and crosses bridges toward a calmer Kuramae finish.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["両国", "蔵前"], en: ["ryogoku", "kuramae"] },
      requiredVisualTerms: { en: ["ryogoku"] },
    },
  },
  "machiya-arakawa-tram-walk": {
    heroImage: MACHIYA_STATION_VIEW,
    galleryOverride: MACHIYA_IMAGES,
    xEmbedsOverride: OJI_ASUKAYAMA_X,
    photoFocusOverride: {
      ja: "町屋の停留場と駅、荒川側の生活道路、都電が街に近い距離で走る感じ",
      en: "Machiya station and tram-stop edges, everyday Arakawa-side streets, and the way the tram stays close to residential-scale roads",
    },
    ja: {
      title: "町屋の都電街歩きガイド",
      description: "町屋から始める、少しローカルな都電沿線の半日街歩きガイドです。",
    },
    en: {
      title: "Machiya Tram-Line Walk Guide",
      description: "A lower-key tram-line half day that starts from Machiya and stays close to everyday northeast-Tokyo streets.",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["町屋"], en: ["machiya"] },
      requiredVisualTerms: { en: ["machiya"] },
    },
  },
  "waseda-omokagebashi-tram-walk": {
    heroImage: OMOKAGEBASHI_VIEW,
    galleryOverride: WASEDA_OMOKAGEBASHI_IMAGES,
    xEmbedsOverride: OJI_ASUKAYAMA_X,
    photoFocusOverride: {
      ja: "早稲田停留場、面影橋、神田川沿いへ抜ける短い都電の流れ",
      en: "Waseda tram stops, Omokagebashi, and the short tram-and-riverside flow along this south-side segment",
    },
    consistencyChecks: {
      requiredTextTerms: { ja: ["早稲田", "面影橋"], en: ["waseda", "omokagebashi"] },
      requiredVisualTerms: { en: ["waseda", "omokagebashi"] },
    },
  },
  "tokyo-morning-walks": {
    heroImage: TOKYO_MORNING_IMAGES[0],
    galleryOverride: TOKYO_MORNING_IMAGES.slice(1),
    xEmbedsOverride: TOKYO_MORNING_X,
    photoFocusOverride: {
      ja: "朝の谷中、根津、井の頭のように、人が増える前の東京がどう見えるか",
      en: "how Tokyo reads before the city speeds up, across places such as Yanaka, Nezu, and Inokashira",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["東京", "朝"],
        en: ["tokyo", "morning"],
      },
      requiredVisualTerms: {
        ja: ["東京"],
        en: ["tokyo"],
      },
    },
  },
  "tokyo-local-transit-half-day": {
    heroImage: TOKYO_LOCAL_TRANSIT_IMAGES[0],
    galleryOverride: TOKYO_LOCAL_TRANSIT_IMAGES.slice(1),
    xEmbedsOverride: TOKYO_LOCAL_TRANSIT_X,
    photoFocusOverride: {
      ja: "駅、停留場、短い移動と短い街歩きが同じ半日を支える東京のローカル交通の実感",
      en: "the feel of local transit when station gates, tram stops, and short neighborhood walks all support the same half day",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["東京", "交通"],
        en: ["tokyo", "transit"],
      },
      requiredVisualTerms: {
        ja: ["駅", "都電"],
        en: ["station", "tram"],
      },
    },
  },
  "tokyo-waterfront-slow-route": {
    heroImage: TOKYO_WATERFRONT_SLOW_IMAGES[0],
    galleryOverride: TOKYO_WATERFRONT_SLOW_IMAGES.slice(1),
    xEmbedsOverride: MONZEN_FUKAGAWA_X,
    photoFocusOverride: {
      ja: "東東京の水辺、庭園、川沿いの余白が急がない半日をどう支えるか",
      en: "how east-Tokyo waterside edges, gardens, and quieter river segments support a slower half day",
    },
    ja: {
      title: "東東京の庭園と水辺をゆっくり歩く半日ルート",
      description: "清澄側の庭園と東東京の水辺感を軸に、急がず歩く半日ルートを組み立てるガイドです。",
      lead: "このルートは大きな海辺観光ではなく、東東京の庭園、水辺、駅近の余白を静かにつなぐ考え方の方が合います。",
      focus: "海辺の絶景を集めるより、庭園の水面と東東京の水辺感をどうゆっくり使うかが主題です。",
    },
    en: {
      title: "East Tokyo Garden and Waterside Slow Route",
      description: "A slower east-Tokyo half day built around garden pauses, waterside atmosphere, and compact station-to-neighborhood transitions.",
      lead: "This route works better as an east-Tokyo garden-and-waterside half day than as a promise of dramatic open-water sightseeing.",
      focus: "The page is about how to use garden water, neighborhood edges, and compact east-Tokyo transitions at a slower pace, not about chasing big waterfront spectacle.",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["東東京", "庭園", "水辺"],
        en: ["east-tokyo", "garden", "waterside"],
      },
      requiredVisualTerms: {
        en: ["river", "garden"],
      },
    },
  },
  "tokyo-old-town-hillside-walk": {
    heroImage: TOKYO_OLD_TOWN_HILLSIDE_IMAGES[0],
    galleryOverride: TOKYO_OLD_TOWN_HILLSIDE_IMAGES.slice(1),
    xEmbedsOverride: TOKYO_OLD_TOWN_HILLSIDE_X,
    photoFocusOverride: {
      ja: "下町の低い街並みと坂の切り替わり、神社や寺の縁で東京の古い層がどう見えるか",
      en: "how old-town Tokyo and slight hillside changes show up through shrine edges, lower-rise streets, and back-lane transitions",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["下町", "坂"],
        en: ["old-town", "hillside"],
      },
      requiredVisualTerms: {
        ja: ["神楽坂", "根津"],
        en: ["kagurazaka", "nezu"],
      },
    },
  },
  "tokyo-station-based-short-stays": {
    heroImage: STATION_BASED_SHORT_STAY_IMAGES[0],
    galleryOverride: STATION_BASED_SHORT_STAY_IMAGES.slice(1),
    xEmbedsOverride: STATION_BASED_SHORT_STAY_X,
    photoFocusOverride: {
      ja: "駅を出てすぐ半日が始まる感じ、出口から街区の空気へ切り替わる東京の短時間ルート",
      en: "how fast a short-stay Tokyo half day begins once you leave the station and step into a usable neighborhood",
    },
    consistencyChecks: {
      requiredTextTerms: {
        ja: ["駅", "短時間", "東京"],
        en: ["station", "short", "tokyo"],
      },
      requiredVisualTerms: {
        ja: ["駅"],
        en: ["station"],
      },
    },
  },
};
