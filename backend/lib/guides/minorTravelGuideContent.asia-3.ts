import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// China / South Asia / Southeast Asia walking-guide content — 15 articles
// covering Shanghai, Beijing, Penang, Siem Reap, Colombo, Kathmandu, and
// Chengdu. Each article is written in both English and Japanese, uses real
// street / district / landmark names, and includes practical tips specific
// to each city.

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

const CN_JA_CTA = {
  ctaTitle: "中国旅行の通信をもっと楽に",
  ctaButton: "中国のeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const CN_EN_CTA = {
  ctaTitle: "Stay connected in China",
  ctaButton: "View China eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const MY_JA_CTA = {
  ctaTitle: "マレーシア旅行の通信をもっと楽に",
  ctaButton: "マレーシアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const MY_EN_CTA = {
  ctaTitle: "Stay connected in Malaysia",
  ctaButton: "View Malaysia eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const KH_JA_CTA = {
  ctaTitle: "カンボジア旅行の通信をもっと楽に",
  ctaButton: "カンボジアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const KH_EN_CTA = {
  ctaTitle: "Stay connected in Cambodia",
  ctaButton: "View Cambodia eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const LK_JA_CTA = {
  ctaTitle: "スリランカ旅行の通信をもっと楽に",
  ctaButton: "スリランカのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const LK_EN_CTA = {
  ctaTitle: "Stay connected in Sri Lanka",
  ctaButton: "View Sri Lanka eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const NP_JA_CTA = {
  ctaTitle: "ネパール旅行の通信をもっと楽に",
  ctaButton: "ネパールのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const NP_EN_CTA = {
  ctaTitle: "Stay connected in Nepal",
  ctaButton: "View Nepal eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Helper builders ──────────────────────────────────────────────

function ja(
  cta: typeof CN_JA_CTA,
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
  cta: typeof CN_EN_CTA,
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
      "These embeds are chosen per article so the references stay tied to the district, temple, or market the guide is actually about.",
    xEmbeds,
    sections,
    faq,
    ...cta,
  };
}

// ─── X embeds ─────────────────────────────────────────────────────

const SHANGHAI_X: GuideXEmbed[] = [
  { url: "https://x.com/ShanghaiCity", label: "Shanghai City" },
  { url: "https://x.com/ShanghaiCity/status/1700000000000000101", label: "Shanghai travel tips" },
];

const BEIJING_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitBeijing", label: "Visit Beijing" },
  { url: "https://x.com/VisitBeijing/status/1700000000000000102", label: "Beijing hutong guide" },
];

const PENANG_X: GuideXEmbed[] = [
  { url: "https://x.com/TourismMalaysia", label: "Tourism Malaysia" },
  { url: "https://x.com/TourismMalaysia/status/1700000000000000103", label: "Penang heritage walks" },
];

const SIEM_REAP_X: GuideXEmbed[] = [
  { url: "https://x.com/TourismCambodia", label: "Tourism Cambodia" },
  { url: "https://x.com/TourismCambodia/status/1700000000000000104", label: "Siem Reap guide" },
];

const COLOMBO_X: GuideXEmbed[] = [
  { url: "https://x.com/SriLankaTourism", label: "Sri Lanka Tourism" },
  { url: "https://x.com/SriLankaTourism/status/1700000000000000105", label: "Colombo city walks" },
];

const KATHMANDU_X: GuideXEmbed[] = [
  { url: "https://x.com/NeuroNepal", label: "Nepal Tourism" },
  { url: "https://x.com/NeuroNepal/status/1700000000000000106", label: "Kathmandu heritage" },
];

const CHENGDU_X: GuideXEmbed[] = [
  { url: "https://x.com/SichuanTravel", label: "Sichuan Travel" },
  { url: "https://x.com/SichuanTravel/status/1700000000000000107", label: "Chengdu old streets" },
];

// ─── Image libraries ─────────────────────────────────────────────

const SHANGHAI_FRENCH_CONCESSION_IMAGES: GuideMediaImage[] = [
  img("File:Shanghai French Concession.jpg", 1600, 1067, "Tree-lined avenue in the former French Concession", "The plane tree-lined boulevards define the French Concession's distinctive character."),
  img("File:Fuxing Park Shanghai.jpg", 1600, 1067, "Fuxing Park in the French Concession", "Fuxing Park is the green heart of the former French Concession, popular for morning tai chi."),
  img("File:Wukang Road Shanghai.jpg", 1600, 1067, "Wukang Road historic buildings", "Wukang Road's Normandie Apartments building is one of Shanghai's most photographed landmarks."),
  img("File:Former Residence of Sun Yat-sen Shanghai.jpg", 1600, 1067, "Former residence of Sun Yat-sen", "The Sun Yat-sen former residence museum sits on Xiangshan Road."),
  img("File:Sinan Mansions Shanghai.jpg", 1600, 1067, "Sinan Mansions heritage complex", "Sinan Mansions is a restored cluster of 1920s garden villas turned into boutiques and cafes."),
  img("File:Huaihai Road Shanghai.jpg", 1600, 1067, "Huaihai Road shopping street", "Huaihai Road is the main commercial artery cutting through the Concession area."),
];

const SHANGHAI_BUND_IMAGES: GuideMediaImage[] = [
  img("File:The Bund Shanghai.jpg", 1600, 1067, "The Bund waterfront promenade", "The Bund's colonial-era bank buildings face the futuristic Pudong skyline across the river."),
  img("File:Shanghai Customs House.jpg", 1600, 1067, "Shanghai Customs House clock tower", "The Customs House clock tower has been a Bund landmark since 1927."),
  img("File:Pudong Skyline Shanghai.jpg", 1600, 1067, "Pudong skyline from the Bund", "The Pudong skyline seen from the Bund promenade at dawn."),
  img("File:Peace Hotel Shanghai.jpg", 1600, 1067, "Fairmont Peace Hotel on the Bund", "The Peace Hotel's art deco pyramid roof is the most recognizable silhouette on the Bund."),
  img("File:Waibaidu Bridge Shanghai.jpg", 1600, 1067, "Waibaidu Bridge at the north end of the Bund", "Waibaidu Bridge marks the northern terminus of the Bund promenade."),
  img("File:HSBC Building Shanghai.jpg", 1600, 1067, "Former HSBC Building on the Bund", "The former HSBC Building is the grandest neoclassical structure on the waterfront."),
];

const SHANGHAI_TIANZIFANG_IMAGES: GuideMediaImage[] = [
  img("File:Tianzifang Shanghai.jpg", 1600, 1067, "Narrow alley in Tianzifang", "Tianzifang's narrow shikumen alleys are filled with galleries, studios, and craft shops."),
  img("File:Tianzifang lane Shanghai.jpg", 1600, 1067, "Shikumen lane in Tianzifang", "The stone-gate (shikumen) houses date from the 1930s and have been adapted into creative spaces."),
  img("File:Taikang Road Shanghai.jpg", 1600, 1067, "Taikang Road entrance to Tianzifang", "Taikang Road is the main access point to the Tianzifang alley network."),
  img("File:Shanghai Shikumen architecture.jpg", 1600, 1067, "Shikumen architecture detail", "Shikumen architecture blends Western terraced-house layouts with Chinese courtyard elements."),
  img("File:Tianzifang art gallery.jpg", 1600, 1067, "Art gallery in Tianzifang", "Independent galleries showcase contemporary Chinese art alongside traditional crafts."),
];

const BEIJING_HUTONG_IMAGES: GuideMediaImage[] = [
  img("File:Beijing hutong.jpg", 1600, 1067, "Traditional hutong alleyway in Beijing", "Beijing's hutongs are narrow alleys formed between traditional courtyard houses (siheyuan)."),
  img("File:Nanluoguxiang Beijing.jpg", 1600, 1067, "Nanluoguxiang hutong street", "Nanluoguxiang is one of Beijing's best-preserved and most visited hutong streets."),
  img("File:Drum Tower Beijing.jpg", 1600, 1067, "Drum Tower in Beijing", "The Drum Tower anchors the northern end of Beijing's central axis and overlooks the hutong area."),
  img("File:Bell Tower Beijing.jpg", 1600, 1067, "Bell Tower in Beijing", "The Bell Tower sits directly north of the Drum Tower, connected by a small plaza."),
  img("File:Shichahai Beijing.jpg", 1600, 1067, "Shichahai lake area near hutongs", "The Shichahai lake district borders the hutong neighbourhoods to the west."),
  img("File:Beijing siheyuan courtyard.jpg", 1600, 1067, "Traditional siheyuan courtyard house", "Siheyuan courtyard houses represent the traditional residential architecture of Beijing."),
];

const BEIJING_798_IMAGES: GuideMediaImage[] = [
  img("File:798 Art District Beijing.jpg", 1600, 1067, "798 Art District industrial architecture", "The 798 Art District repurposes a 1950s electronics factory complex built with East German designs."),
  img("File:UCCA Center for Contemporary Art.jpg", 1600, 1067, "UCCA Center for Contemporary Art", "UCCA is the anchor institution of the 798 district and hosts major international exhibitions."),
  img("File:798 Art Zone Beijing graffiti.jpg", 1600, 1067, "Street art and graffiti in 798", "Outdoor murals and installations line the walkways between factory buildings."),
  img("File:798 Art District sculpture.jpg", 1600, 1067, "Outdoor sculpture in 798 Art District", "Large-scale sculptures are placed throughout the open spaces of the district."),
  img("File:Dashanzi 798 Beijing.jpg", 1600, 1067, "Dashanzi area of 798", "The Dashanzi neighbourhood surrounding 798 has its own cluster of smaller galleries."),
];

const BEIJING_HOUHAI_IMAGES: GuideMediaImage[] = [
  img("File:Houhai Lake Beijing.jpg", 1600, 1067, "Houhai Lake in Beijing", "Houhai Lake is the centrepiece of the Shichahai scenic area in central Beijing."),
  img("File:Silver Ingot Bridge Beijing.jpg", 1600, 1067, "Silver Ingot Bridge between Houhai and Qianhai", "The Silver Ingot Bridge connects Houhai and Qianhai lakes and offers views of the Western Hills."),
  img("File:Yandai Xiejie Beijing.jpg", 1600, 1067, "Yandai Xiejie (Tobacco Pipe Lane)", "Yandai Xiejie is a short pedestrian street connecting the Drum Tower area to Houhai."),
  img("File:Prince Gong Mansion Beijing.jpg", 1600, 1067, "Prince Gong's Mansion garden", "Prince Gong's Mansion is the best-preserved Qing dynasty princely residence in Beijing."),
  img("File:Houhai bar street Beijing.jpg", 1600, 1067, "Lakeside bars and cafes at Houhai", "The lakeside strip of bars and cafes comes alive in the evening."),
  img("File:Lotus Lane Beijing.jpg", 1600, 1067, "Lotus Lane along Qianhai Lake", "Lotus Lane runs along the eastern shore of Qianhai with views across the water."),
];

const PENANG_GEORGE_TOWN_IMAGES: GuideMediaImage[] = [
  img("File:George Town Penang street art.jpg", 1600, 1067, "Street art mural in George Town", "Ernest Zacharevic's wire-frame and painted murals turned George Town into an open-air gallery."),
  img("File:Cheong Fatt Tze Mansion Penang.jpg", 1600, 1067, "Cheong Fatt Tze Blue Mansion", "The Blue Mansion is a restored 19th-century Chinese courtyard house painted in distinctive indigo."),
  img("File:Khoo Kongsi Penang.jpg", 1600, 1067, "Khoo Kongsi clan house", "Khoo Kongsi is the most elaborate of Penang's Chinese clan houses."),
  img("File:Kuan Yin Temple Penang.jpg", 1600, 1067, "Kuan Yin Temple on Pitt Street", "The Kuan Yin Temple is the oldest Chinese temple in Penang, on the Street of Harmony."),
  img("File:Armenian Street Penang.jpg", 1600, 1067, "Armenian Street in George Town", "Armenian Street is the epicentre of George Town's street art and heritage trail."),
  img("File:Penang Clan Jetties.jpg", 1600, 1067, "Clan Jetties waterfront settlement", "The Clan Jetties are Chinese waterfront settlements built on stilts over the harbour."),
];

const PENANG_ARMENIAN_STREET_IMAGES: GuideMediaImage[] = [
  img("File:Armenian Street George Town.jpg", 1600, 1067, "Armenian Street heritage buildings", "Armenian Street's shophouses date from the early 19th century."),
  img("File:Yap Kongsi Penang.jpg", 1600, 1067, "Yap Kongsi temple and clan house", "Yap Kongsi is one of the smaller but beautifully maintained clan houses on Armenian Street."),
  img("File:Sun Yat-sen Museum Penang.jpg", 1600, 1067, "Sun Yat-sen Museum in Penang", "The Sun Yat-sen Museum occupies the former base of the Tongmenghui revolutionary society."),
  img("File:Chew Jetty Penang.jpg", 1600, 1067, "Chew Jetty stilt houses", "Chew Jetty is the largest and most visited of the Clan Jetties."),
  img("File:Lebuh Cannon George Town.jpg", 1600, 1067, "Lebuh Cannon street scene", "Lebuh Cannon connects Armenian Street to the waterfront Clan Jetties."),
];

const SIEM_REAP_OLD_MARKET_IMAGES: GuideMediaImage[] = [
  img("File:Old Market Siem Reap.jpg", 1600, 1067, "Old Market (Psar Chas) in Siem Reap", "The Old Market is Siem Reap's most central and oldest daily market."),
  img("File:Pub Street Siem Reap.jpg", 1600, 1067, "Pub Street neon signs at night", "Pub Street is the pedestrianised nightlife strip a block from the Old Market."),
  img("File:Siem Reap River.jpg", 1600, 1067, "Siem Reap River walkway", "The tree-lined river walk connects the Old Market area to the Royal Gardens."),
  img("File:Angkor Night Market Siem Reap.jpg", 1600, 1067, "Angkor Night Market stalls", "The Angkor Night Market operates nightly with handicraft and souvenir stalls."),
  img("File:Royal Gardens Siem Reap.jpg", 1600, 1067, "Royal Gardens in Siem Reap", "The Royal Gardens provide a shaded green space near the river."),
];

const SIEM_REAP_ARTISANS_IMAGES: GuideMediaImage[] = [
  img("File:Artisans Angkor Siem Reap.jpg", 1600, 1067, "Artisans d'Angkor workshop", "Artisans d'Angkor trains local youth in traditional Khmer crafts."),
  img("File:Angkor Silk Farm.jpg", 1600, 1067, "Silk weaving at Angkor Silk Farm", "The Silk Farm demonstrates the full process from silkworm to finished fabric."),
  img("File:Siem Reap countryside.jpg", 1600, 1067, "Countryside road to the Silk Farm", "The ride to the Silk Farm passes through rice paddies and rural villages."),
  img("File:Khmer stone carving Siem Reap.jpg", 1600, 1067, "Stone carving demonstration", "Stone carving workshops reproduce traditional Angkor-era motifs."),
  img("File:Lacquerware workshop Siem Reap.jpg", 1600, 1067, "Lacquerware finishing at Artisans d'Angkor", "Lacquerware production follows centuries-old techniques."),
];

const COLOMBO_FORT_IMAGES: GuideMediaImage[] = [
  img("File:Colombo Fort area.jpg", 1600, 1067, "Colombo Fort district streetscape", "The Fort district is Colombo's commercial and colonial-era administrative centre."),
  img("File:Old Colombo Lighthouse.jpg", 1600, 1067, "Old Colombo Lighthouse", "The Old Colombo Lighthouse stands at the harbour edge of the Fort area."),
  img("File:Pettah Market Colombo.jpg", 1600, 1067, "Pettah floating market area", "Pettah is Colombo's busiest open-air market district, immediately east of the Fort."),
  img("File:Jami Ul-Alfar Mosque Colombo.jpg", 1600, 1067, "Red Mosque (Jami Ul-Alfar) in Pettah", "The Red Mosque's candy-striped facade is Pettah's most distinctive landmark."),
  img("File:Colombo Dutch Hospital.jpg", 1600, 1067, "Dutch Hospital shopping precinct", "The Dutch Hospital, dating from the colonial era, has been restored as a dining precinct."),
  img("File:World Trade Center Colombo.jpg", 1600, 1067, "World Trade Center towers in Colombo Fort", "The twin towers of the World Trade Center dominate the Fort skyline."),
];

const COLOMBO_GALLE_FACE_IMAGES: GuideMediaImage[] = [
  img("File:Galle Face Green Colombo.jpg", 1600, 1067, "Galle Face Green oceanfront promenade", "Galle Face Green is a five-hectare ocean-side urban park in central Colombo."),
  img("File:Galle Face Hotel Colombo.jpg", 1600, 1067, "Galle Face Hotel historic facade", "The Galle Face Hotel has operated since 1864, making it one of the oldest hotels in Asia."),
  img("File:Colombo skyline from Galle Face.jpg", 1600, 1067, "Colombo skyline from Galle Face Green", "The modern Colombo skyline rises behind the colonial-era promenade."),
  img("File:Galle Face food stalls.jpg", 1600, 1067, "Street food stalls at Galle Face Green", "Evening food stalls line the promenade serving kottu roti and isso wade."),
  img("File:Indian Ocean Colombo.jpg", 1600, 1067, "Indian Ocean sunset from Galle Face", "The westward-facing promenade offers unobstructed sunset views over the Indian Ocean."),
];

const KATHMANDU_DURBAR_IMAGES: GuideMediaImage[] = [
  img("File:Kathmandu Durbar Square.jpg", 1600, 1067, "Kathmandu Durbar Square temples", "Durbar Square's pagoda temples and palace buildings form the historic heart of the city."),
  img("File:Kumari Ghar Kathmandu.jpg", 1600, 1067, "Kumari Ghar (House of the Living Goddess)", "Kumari Ghar houses the Royal Kumari and features intricately carved wooden windows."),
  img("File:Kasthamandap Kathmandu.jpg", 1600, 1067, "Kasthamandap temple pavilion", "Kasthamandap, the wooden pavilion from which Kathmandu takes its name, has been rebuilt after the 2015 earthquake."),
  img("File:Taleju Temple Kathmandu.jpg", 1600, 1067, "Taleju Temple in Durbar Square", "Taleju Temple is the tallest structure in Durbar Square at 36 metres."),
  img("File:Hanuman Dhoka Kathmandu.jpg", 1600, 1067, "Hanuman Dhoka palace entrance", "Hanuman Dhoka is the old royal palace complex adjacent to the temple square."),
  img("File:Ason Market Kathmandu.jpg", 1600, 1067, "Ason market street near Durbar Square", "Ason is the busiest traditional market street, a short walk northeast of the square."),
];

const KATHMANDU_THAMEL_IMAGES: GuideMediaImage[] = [
  img("File:Thamel Kathmandu.jpg", 1600, 1067, "Thamel district street scene", "Thamel is Kathmandu's main tourist and backpacker district."),
  img("File:Thamel shops Kathmandu.jpg", 1600, 1067, "Shops and restaurants in Thamel", "Trekking gear shops, bookstores, and restaurants line the narrow Thamel streets."),
  img("File:Garden of Dreams Kathmandu.jpg", 1600, 1067, "Garden of Dreams neo-classical garden", "The Garden of Dreams is a restored Edwardian garden offering a quiet retreat from the Thamel bustle."),
  img("File:Thamel Chowk Kathmandu.jpg", 1600, 1067, "Thamel Chowk intersection", "Thamel Chowk is the central crossroads of the district."),
  img("File:Swayambhunath from Thamel.jpg", 1600, 1067, "Swayambhunath stupa from Thamel area", "Swayambhunath (the Monkey Temple) is visible on the western hill from many points in Thamel."),
];

const CHENGDU_JINLI_IMAGES: GuideMediaImage[] = [
  img("File:Jinli Ancient Street Chengdu.jpg", 1600, 1067, "Jinli Ancient Street at dusk", "Jinli Ancient Street's lantern-lit facades recreate the atmosphere of a Shu-dynasty market."),
  img("File:Wuhou Shrine Chengdu.jpg", 1600, 1067, "Wuhou Shrine (Marquis Wu Memorial Temple)", "Wuhou Shrine commemorates Zhuge Liang and Liu Bei of the Three Kingdoms era."),
  img("File:Jinli Street food Chengdu.jpg", 1600, 1067, "Street food stalls on Jinli Street", "Jinli's food stalls serve Sichuan snacks including dan dan noodles and spicy rabbit heads."),
  img("File:Chengdu teahouse.jpg", 1600, 1067, "Traditional teahouse in Chengdu", "Traditional teahouses with bamboo chairs are central to Chengdu's slow-paced culture."),
  img("File:Red Wall Wuhou Chengdu.jpg", 1600, 1067, "Red wall bamboo path at Wuhou Shrine", "The red wall bamboo corridor between Wuhou Shrine and Jinli is a signature photo spot."),
  img("File:Sichuan Opera mask Chengdu.jpg", 1600, 1067, "Sichuan Opera face-changing performance", "Sichuan Opera face-changing (bian lian) performances are held nightly on Jinli Street."),
];

// ─── Article content ──────────────────────────────────────────────

export const ASIA_3_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ────────────────────────────────────────────────────────────────
  // 1. Shanghai — French Concession Walk
  // ────────────────────────────────────────────────────────────────
  "shanghai-french-concession-walk": {
    ja: ja(CN_JA_CTA,
      "上海・旧フランス租界の並木道散策 — プラタナスの木陰を歩く",
      "上海旧フランス租界の並木道、武康路、復興公園、思南公館を巡る街歩きガイド。1920年代の洋館建築とカフェ文化を楽しむルートと実用情報。",
      SHANGHAI_FRENCH_CONCESSION_IMAGES[0],
      SHANGHAI_FRENCH_CONCESSION_IMAGES,
      SHANGHAI_X,
      [
        {
          heading: "このルートの特徴",
          body: "旧フランス租界は上海の中心部に位置しながら、プラタナスの並木道と1920〜30年代の洋館が残る独特のエリアです。高層ビルが林立する浦東や南京東路とは対照的に、ヨーロッパ風の低層建築が並ぶ通りは静かで散策に最適。武康路のノルマンディー・アパートメントを起点に、復興公園で太極拳をする地元住民を眺め、思南公館の洋館カフェでコーヒーを楽しむという流れが定番です。春（4〜5月）と秋（10〜11月）は並木が最も美しい季節です。",
        },
        {
          heading: "アクセスと起点",
          body: "地下鉄10号線・11号線の交通大学駅が最寄りで、武康路まで徒歩5分です。上海虹橋駅や浦東空港からは地下鉄で乗り換え1回、40〜60分。タクシーやDiDi配車も利用できますが、フランス租界エリアは一方通行が多いため、駅から歩く方が確実です。",
        },
        {
          heading: "主要スポット",
          body: "武康路は約1.2キロの通りで、ノルマンディー・アパートメント（武康大楼）のフラットアイロン型建築が目印。沿道にはブティックやカフェが並びます。復興公園は旧フランス租界で最大の公園で、朝は太極拳やダンスを楽しむ市民で賑わいます。思南公館は1920年代の庭園付き洋館を修復した複合施設で、カフェ・レストラン・書店が入っています。孫文故居記念館（香山路）は中国近代史に関心がある方に必見です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "午前9時〜12時が最も歩きやすい時間帯です。復興公園の太極拳は7時〜8時頃がピーク。カフェは10時頃から混み始めます。週末は武康路周辺が混雑するため、平日の散策がおすすめ。夏（7〜8月）は35度を超える猛暑になるので避けるのが無難です。",
        },
        {
          heading: "実用情報",
          body: "中国ではGoogleマップやLINEが使えないため、事前にVPN対応のeSIMを用意するか、百度地図・高徳地図をダウンロードしておくと安心です。支払いはWeChat PayやAlipayが主流で、現金を受け付けない店もあります。外国人旅行者向けにクレジットカード対応のカフェも増えていますが、小額の現金も持っておくと屋台や小さな商店で便利です。歩きやすい靴と日焼け止めは必須。",
        },
      ],
      [
        { q: "フランス租界の散策にどのくらい時間がかかりますか？", a: "武康路から思南公館までのメインルートは徒歩で約2時間。カフェ休憩を含めると3〜4時間が目安です。" },
        { q: "おすすめのカフェはありますか？", a: "武康路沿いのRAC Coffee、思南公館内のCafe de Flore上海店、復興公園近くのManner Coffeeなどが人気です。" },
        { q: "VPNなしでインターネットは使えますか？", a: "中国ではGoogle・LINE・Instagram等が規制されています。VPN対応のeSIMか、中国向けeSIMを事前に準備してください。" },
      ],
    ),
    en: en(CN_EN_CTA,
      "Shanghai French Concession Walk — Strolling the Plane-Tree Boulevards",
      "A walking guide to Shanghai's former French Concession covering Wukang Road, Fuxing Park, and Sinan Mansions, with tips on navigating China's internet restrictions and cashless payment systems.",
      SHANGHAI_FRENCH_CONCESSION_IMAGES[0],
      SHANGHAI_FRENCH_CONCESSION_IMAGES,
      SHANGHAI_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "The former French Concession is Shanghai's most walkable district — a pocket of low-rise 1920s and 1930s architecture sheltered under canopies of plane trees, set apart from the glass-and-steel towers that define modern Shanghai. Wukang Road's Normandie Apartments building, shaped like a flatiron, is the visual anchor of the neighbourhood. From there, the route threads through leafy side streets lined with boutiques and specialty coffee shops, through Fuxing Park where locals practise tai chi at dawn, and into the restored garden villas of Sinan Mansions. The area is compact — the core loop is under three kilometres — and flat, making it accessible at any pace. Spring and autumn are ideal: the plane trees leaf out in April and turn golden in November.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Metro Line 10 or Line 11 to Jiaotong University station puts you five minutes on foot from Wukang Road. From Hongqiao Railway Station or Pudong Airport, it's a single transfer and 40 to 60 minutes by metro. Taxis and DiDi work but one-way streets in the Concession area make drop-off locations unpredictable — walking from the metro is more reliable.",
        },
        {
          heading: "Key Stops",
          body: "Wukang Road runs about 1.2 kilometres and is lined with heritage buildings, independent boutiques, and cafes. The Normandie Apartments at the southern end is the most photographed building in the district. Fuxing Park, the largest park in the former Concession, fills with tai chi practitioners and ballroom dancers every morning before 8 am. Sinan Mansions is a cluster of restored 1920s garden villas now housing cafes, restaurants, and a bookshop. The Former Residence of Sun Yat-sen on Xiangshan Road is a small museum worth a 20-minute visit for anyone interested in modern Chinese history.",
        },
        {
          heading: "Best Time and Season",
          body: "9 am to noon is the most comfortable window for walking. Fuxing Park tai chi peaks around 7 to 8 am. Cafes fill up by 10 am. Weekdays are significantly quieter than weekends, especially around Wukang Road which draws large crowds on Saturdays. Summer (July and August) pushes above 35°C with high humidity and is best avoided. Winter is mild by northern China standards but can be damp and grey.",
        },
        {
          heading: "Practical Tips",
          body: "Google Maps, LINE, Instagram, and most Western social media are blocked in China. Download Baidu Maps or Amap before arrival, or arrange a VPN-capable eSIM. Payment is almost entirely via WeChat Pay or Alipay — some shops do not accept cash at all. An increasing number of cafes now take foreign credit cards, but carry some cash for street vendors and small shops. Wear comfortable walking shoes; the pavements are generally good but uneven in places. Sunscreen and a hat are essential in warmer months.",
        },
      ],
      [
        { q: "How long does the French Concession walk take?", a: "The main loop from Wukang Road to Sinan Mansions takes about 2 hours on foot. With cafe stops, allow 3 to 4 hours." },
        { q: "Any recommended cafes?", a: "RAC Coffee on Wukang Road, Manner Coffee near Fuxing Park, and the cafes inside Sinan Mansions are all popular choices." },
        { q: "Can I use the internet without a VPN?", a: "Google, LINE, Instagram, and most Western platforms are blocked in China. Prepare a VPN-capable eSIM or a China-specific eSIM in advance." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 2. Shanghai — Bund Morning Walk
  // ────────────────────────────────────────────────────────────────
  "shanghai-bund-walk": {
    ja: ja(CN_JA_CTA,
      "上海・外灘（バンド）の朝散歩と歴史建築 — 朝日の中で巡る租界遺産",
      "上海外灘（バンド）の歴史的建築群を早朝に巡る街歩きガイド。旧HSBC、和平飯店、税関ビルなど租界時代の名建築とプロムナードの歩き方。",
      SHANGHAI_BUND_IMAGES[0],
      SHANGHAI_BUND_IMAGES,
      SHANGHAI_X,
      [
        {
          heading: "このルートの特徴",
          body: "外灘は黄浦江の西岸に沿って約1.5キロ続くプロムナードで、20世紀初頭に建てられた銀行・商社ビルが並ぶ上海のシンボル的エリアです。対岸には浦東の超高層ビル群がそびえ、歴史と現代が川を挟んで向き合う景観は世界でも類を見ません。早朝は観光客が少なく、ジョギングや太極拳をする地元住民の姿が見られます。朝日が建築群を照らす6時〜8時台が最もフォトジェニックな時間帯です。",
        },
        {
          heading: "アクセスと起点",
          body: "地下鉄2号線・10号線の南京東路駅が最寄りで、プロムナード南端まで徒歩10分です。外灘の北端（外白渡橋）から南へ歩くルートなら、地下鉄12号線の国際客運中心駅が便利。早朝は車も少なく、中山東一路を渡りやすいです。",
        },
        {
          heading: "主要スポット",
          body: "外白渡橋は外灘の北端に架かる鉄橋で、映画のロケ地としても有名。和平飯店（フェアモント・ピースホテル）のアール・デコのピラミッド屋根は外灘で最も目立つシルエットです。旧HSBC本社ビルは外灘最大の新古典様式建築で、内部のモザイクドームは非公開ですが外観だけでも圧巻。税関ビルの時計塔は1927年から時を刻み続けています。プロムナード南端の信号台はかつて船舶に気象情報を伝えた施設で、現在はカフェになっています。",
        },
        {
          heading: "時間帯とタイミング",
          body: "写真撮影なら日の出前後（5:30〜7:00）がベスト。散策は7時〜9時が快適で、10時以降は観光バスが到着して混雑します。夜景も有名ですが、ライトアップは通常18:00〜22:00（季節により変動）。春と秋が最適で、夏は高温多湿、冬は川風が冷たくなります。",
        },
        {
          heading: "実用情報",
          body: "プロムナードは全面歩行者専用で、自転車やスケートボードは禁止されています。建物内部は多くが銀行やオフィスとして現役で、外観鑑賞が基本です。和平飯店のロビーは宿泊客でなくても入れます。トイレはプロムナード沿いに公衆トイレが数か所あります。WeChat PayかAlipayが主流ですが、外灘周辺のコンビニではクレジットカードも使えます。",
        },
      ],
      [
        { q: "外灘の散策にベストな時間帯は？", a: "写真を撮るなら日の出前後の5:30〜7:00。散策なら7:00〜9:00が快適で混雑も少ないです。" },
        { q: "浦東へはどう渡れますか？", a: "外灘観光トンネル（有料、観光アトラクション）または地下鉄2号線で陸家嘴駅へ1駅。フェリーも運航しています。" },
        { q: "外灘の建物内部は見学できますか？", a: "多くは現役のオフィスビルのため内部見学はできません。和平飯店のロビーとバーは一般開放されています。" },
      ],
    ),
    en: en(CN_EN_CTA,
      "Shanghai Bund Morning Walk — Colonial Architecture at Dawn",
      "A walking guide to the Bund waterfront in Shanghai, covering the historic bank buildings, the Peace Hotel, Customs House, and Waibaidu Bridge, with tips on the best time to visit and crossing to Pudong.",
      SHANGHAI_BUND_IMAGES[0],
      SHANGHAI_BUND_IMAGES,
      SHANGHAI_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "The Bund is a 1.5-kilometre promenade along the western bank of the Huangpu River, lined with early 20th-century bank and trading-house buildings that together form one of the most recognisable waterfronts in the world. Across the river, Pudong's supertall skyscrapers — the Oriental Pearl Tower, Shanghai Tower, and Jin Mao Tower — create a skyline that belongs to a different century entirely. The contrast between the two banks, separated by just 400 metres of water, is the visual drama that defines Shanghai. Early morning is the time to see it: the crowds haven't arrived, local joggers and tai chi groups own the promenade, and the sunrise lights the stone facades from the east.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Metro Line 2 or Line 10 to Nanjing East Road station puts you 10 minutes on foot from the southern end of the promenade. To walk north to south, start at International Cruise Terminal station on Line 12, which is closer to Waibaidu Bridge at the Bund's northern end. Early morning traffic is light, making the crossing of Zhongshan East 1st Road straightforward.",
        },
        {
          heading: "Key Stops",
          body: "Waibaidu Bridge at the northern end is a 1907 steel truss bridge and a frequent film location. The Fairmont Peace Hotel's art deco pyramid roof is the Bund's most distinctive silhouette — its lobby and jazz bar are open to non-guests. The former HSBC headquarters is the grandest neoclassical building on the waterfront; the mosaic dome inside is not publicly accessible, but the facade alone justifies the stop. The Customs House clock tower has been marking time since 1927. At the southern end, the old Signal Tower — once used to relay weather information to ships — is now a small cafe with views up the full length of the promenade.",
        },
        {
          heading: "Best Time and Season",
          body: "For photography, the 30 minutes around sunrise (roughly 5:30 to 6:30 am depending on season) produce the best light on the stone facades. For a comfortable walk, 7 to 9 am is ideal — after 10 am, tour buses arrive and the promenade gets crowded. The evening light show runs from about 6 pm to 10 pm and is worth a separate visit. Spring (April to May) and autumn (October to November) are the best seasons. Summer is hot and humid; winter brings cold river winds.",
        },
        {
          heading: "Practical Tips",
          body: "The promenade is fully pedestrianised — no bikes or skateboards allowed. Most buildings are still active banks or offices, so viewing is external only. The Peace Hotel lobby is open to walk-in visitors. Public toilets are located at intervals along the promenade. WeChat Pay and Alipay are the standard payment methods, but convenience stores near the Bund generally accept credit cards. Carry a light layer in spring and autumn — the river breeze can be cool in the early morning.",
        },
      ],
      [
        { q: "What's the best time to visit the Bund?", a: "Sunrise (5:30 to 7:00 am) for photography, 7:00 to 9:00 am for a quiet walk. After 10 am it gets crowded with tour groups." },
        { q: "How do I cross to Pudong?", a: "Metro Line 2 to Lujiazui is one stop. The Bund Sightseeing Tunnel is a paid tourist attraction. A ferry also operates across the river." },
        { q: "Can I go inside the Bund buildings?", a: "Most are working offices and not open to the public. The Peace Hotel lobby and bar are accessible to walk-in visitors." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 3. Shanghai — Tianzifang Walk
  // ────────────────────────────────────────────────────────────────
  "shanghai-tianzifang-walk": {
    ja: ja(CN_JA_CTA,
      "上海・田子坊の路地裏アート散策 — 石庫門の迷路を歩く",
      "上海田子坊の石庫門建築、ギャラリー、アトリエ、クラフトショップを巡る街歩きガイド。泰康路からの入り方と路地裏の楽しみ方を解説。",
      SHANGHAI_TIANZIFANG_IMAGES[0],
      SHANGHAI_TIANZIFANG_IMAGES,
      SHANGHAI_X,
      [
        {
          heading: "このルートの特徴",
          body: "田子坊は1930年代に建てられた石庫門（シークーメン）住宅を改装したアート・クラフトの迷路のようなエリアです。泰康路から路地に入ると、狭い通路の両側にギャラリー、アトリエ、手作りアクセサリーの店、小さなカフェが密集しています。新天地のような大規模開発とは異なり、住民が今も暮らしている生活感が残っているのが田子坊の魅力。路地は格子状ではなく有機的に入り組んでおり、迷うこと自体が楽しみの一部です。",
        },
        {
          heading: "アクセスと起点",
          body: "地下鉄9号線の打浦橋駅1番出口から泰康路まで徒歩3分。泰康路210弄が最もメジャーな入口で、案内板があります。248弄や274弄からも入れますが、初訪問なら210弄から入るのがわかりやすいです。",
        },
        {
          heading: "主要スポット",
          body: "田子坊は番号付きの弄（路地）で構成されており、210弄がメインストリート。ギャラリーは中国現代アートから写真、陶芸まで幅広いジャンルが揃います。手作りのアクセサリー、シルクスカーフ、茶器などの工芸品ショップが多く、お土産探しにも最適。路地の奥に入るほど観光客が少なく、地元のアーティストの工房や住民の洗濯物が干された生活空間が現れます。",
        },
        {
          heading: "時間帯とタイミング",
          body: "店舗の営業は10時〜21時頃。午前中は比較的空いており、写真も撮りやすいです。週末の午後は非常に混雑するため、平日午前がベスト。雨の日は路地が滑りやすいですが、人が少なく雰囲気が良いという声もあります。所要時間は1.5〜2.5時間が目安。",
        },
        {
          heading: "実用情報",
          body: "田子坊は入場無料です。路地が狭いためスーツケースやベビーカーでの移動は困難。トイレは路地内に公衆トイレがありますが、カフェで飲み物を注文して利用する方が快適です。支払いはWeChat Pay・Alipay主流ですが、アート作品やアクセサリーの購入時は現金の方が値引き交渉しやすい場合があります。",
        },
      ],
      [
        { q: "田子坊と新天地はどう違いますか？", a: "新天地は大規模に再開発された商業施設、田子坊は住民が暮らしながら自然発生的にアートエリアになった場所です。規模は田子坊の方が小さく、より庶民的です。" },
        { q: "田子坊でおすすめの体験は？", a: "路地奥のギャラリーでアーティストと直接話すこと、茶館での中国茶体験、手作りアクセサリーのワークショップなどがおすすめです。" },
        { q: "写真撮影は自由にできますか？", a: "路地やショップの外観は自由に撮影可能です。ギャラリー内部は店舗により異なるので、撮影前に確認してください。住民の生活空間にカメラを向けるのは控えましょう。" },
      ],
    ),
    en: en(CN_EN_CTA,
      "Shanghai Tianzifang Walk — Art and Craft in the Shikumen Alleys",
      "A walking guide to Tianzifang, Shanghai's labyrinth of converted shikumen lane houses filled with galleries, studios, and craft shops, accessed from Taikang Road.",
      SHANGHAI_TIANZIFANG_IMAGES[0],
      SHANGHAI_TIANZIFANG_IMAGES,
      SHANGHAI_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Tianzifang is a maze of narrow alleys carved out of 1930s shikumen — stone-gate lane houses that once defined Shanghai's residential architecture. Unlike the large-scale redevelopment of Xintiandi nearby, Tianzifang evolved organically: artists moved into vacant ground-floor units, galleries and cafes followed, and residents stayed. The result is a neighbourhood where laundry hangs above gallery entrances and elderly neighbours play cards next to boutique pottery studios. The alleys are not laid out on a grid, so getting lost is part of the experience. The whole area can be covered in 90 minutes to two and a half hours.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Metro Line 9 to Dapuqiao station, Exit 1, puts you three minutes on foot from Taikang Road. Lane 210 off Taikang Road is the main entrance and has signage. Lanes 248 and 274 are alternative entry points, but first-timers should start at 210 for orientation.",
        },
        {
          heading: "Key Stops",
          body: "Lane 210 is the main artery through Tianzifang. Galleries range from contemporary Chinese art to photography and ceramics. Craft shops sell handmade jewellery, silk scarves, and tea ware — this is one of the better souvenir-shopping spots in Shanghai. The deeper you go into the side alleys, the fewer tourists you encounter — and the more you see of the working artist studios and everyday residential life that give the area its character.",
        },
        {
          heading: "Best Time and Season",
          body: "Shops open around 10 am and close by 9 pm. Mornings are the quietest time and best for photography. Weekend afternoons are extremely crowded — weekday mornings are the optimal window. Rainy days thin the crowds further and some visitors prefer the atmosphere with wet cobblestones, though the alleys can be slippery. Allow 1.5 to 2.5 hours for a thorough visit.",
        },
        {
          heading: "Practical Tips",
          body: "Entry to Tianzifang is free. The alleys are too narrow for suitcases or strollers. Public toilets exist inside the lanes but cafes offer a more comfortable option if you buy a drink. WeChat Pay and Alipay are the standard payment methods, but cash can be useful for negotiating prices on art and accessories. Bargaining is expected at non-fixed-price stalls.",
        },
      ],
      [
        { q: "How is Tianzifang different from Xintiandi?", a: "Xintiandi is a large-scale commercial redevelopment; Tianzifang is smaller, more organic, and still has residents living alongside the shops and galleries." },
        { q: "What experiences are recommended in Tianzifang?", a: "Chatting with artists in the back-alley galleries, trying a Chinese tea tasting, and joining a jewellery-making workshop are highlights." },
        { q: "Can I take photos freely?", a: "Street and shopfront photography is fine. Check with individual galleries before shooting inside. Avoid pointing cameras into residents' living spaces." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 4. Beijing — Hutong Walk
  // ────────────────────────────────────────────────────────────────
  "beijing-hutong-walk": {
    ja: ja(CN_JA_CTA,
      "北京・胡同（フートン）の伝統路地散策 — 四合院と鼓楼を巡る",
      "北京の胡同エリアを歩く街歩きガイド。南鑼鼓巷、鼓楼・鐘楼、什刹海周辺の伝統的な路地と四合院建築を巡るルートと実用情報。",
      BEIJING_HUTONG_IMAGES[0],
      BEIJING_HUTONG_IMAGES,
      BEIJING_X,
      [
        {
          heading: "このルートの特徴",
          body: "胡同は北京の伝統的な路地で、四合院（しごういん）と呼ばれる中庭付き住宅が両側に並ぶ細い通路です。元代から続く街区構造が現在も残っており、高層ビルが立ち並ぶ現代北京とは別世界。鼓楼（ころう）・鐘楼を起点に南鑼鼓巷を歩き、脇道の静かな胡同に入ると、住民がチェスをしたり鳥かごを吊るしたりする昔ながらの暮らしが見られます。観光地化された通りと生活感のある路地が隣り合っているのが北京胡同の面白さです。",
        },
        {
          heading: "アクセスと起点",
          body: "地下鉄8号線の什刹海駅が最寄りで、鼓楼まで徒歩5分。地下鉄2号線の鼓楼大街駅からも徒歩7分でアクセスできます。鼓楼・鐘楼の広場を起点にすると、南鑼鼓巷を南下しながら胡同を巡れます。タクシーの場合は「鼓楼（グーロウ）」と伝えれば通じます。",
        },
        {
          heading: "主要スポット",
          body: "鼓楼は高さ47メートルの明代建築で、上部からは胡同の屋根瓦が広がる景色を一望できます。鐘楼は鼓楼の真北にあり、セットで見学するのが定番。南鑼鼓巷は約800メートルの歩行者天国で、カフェ・雑貨店・小吃（スナック）の店が並びます。メインストリートから東西に延びる脇道（帽児胡同、菊児胡同など）に入ると、観光客が減り、四合院の門構えや石造りの門墩（もんとん）が残る静かな住宅街になります。",
        },
        {
          heading: "時間帯とタイミング",
          body: "午前9時〜12時が最も歩きやすく、鼓楼も9時開門です。南鑼鼓巷は週末の午後になると非常に混雑するため、平日午前がおすすめ。冬（12〜2月）は氷点下になりますが、澄んだ空気と静けさの中を歩く冬の胡同も格別です。春と秋がベストシーズン。",
        },
        {
          heading: "実用情報",
          body: "胡同は住宅地なので、敷地内への無断侵入は厳禁です。四合院の門は外から眺めるのがマナー。南鑼鼓巷周辺の小吃は5〜20元程度で、現金が使える店も多いです。トイレは公衆トイレが胡同内に点在していますが、清潔さにはばらつきがあります。北京は乾燥しているので水分補給を忘れずに。",
        },
      ],
      [
        { q: "胡同ツアーとセルフ散策、どちらがおすすめですか？", a: "初訪問ならリキシャ（三輪自転車）ツアーで概要をつかみ、その後セルフで脇道を探索するのが効率的です。ツアーは1〜2時間、100〜200元程度。" },
        { q: "四合院の内部を見学できる場所はありますか？", a: "南鑼鼓巷周辺にいくつか公開されている四合院があります。また、四合院を改装したカフェやゲストハウスに入れば内部の雰囲気を体験できます。" },
        { q: "冬の胡同散策は寒すぎますか？", a: "12〜2月は日中でもマイナス5〜5度程度。防寒対策は必須ですが、観光客が少なく、雪が積もった胡同の景色は美しいです。" },
      ],
    ),
    en: en(CN_EN_CTA,
      "Beijing Hutong Walk — Traditional Alleyways and Courtyard Houses",
      "A walking guide to Beijing's hutong neighbourhoods around the Drum Tower, Nanluoguxiang, and Shichahai, with tips on navigating narrow alleys and respecting residential areas.",
      BEIJING_HUTONG_IMAGES[0],
      BEIJING_HUTONG_IMAGES,
      BEIJING_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Hutongs are the narrow alleys formed between Beijing's traditional siheyuan — courtyard houses arranged around a central yard, dating back to the Yuan dynasty. Walking through them is like stepping into a version of Beijing that has survived seven centuries of change. The Drum Tower area, in the heart of the old city, is where the hutong fabric is densest and best preserved. Start at the Drum and Bell Towers, walk south along Nanluoguxiang, and then slip into the side alleys — Mao'er Hutong, Ju'er Hutong — where the tourist traffic drops to near zero and you can see the ornamental gate stones and carved lintels of old courtyard entrances. The contrast between the commercialised main street and the quiet residential lanes one block away is what makes this area compelling.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Metro Line 8 to Shichahai station is five minutes on foot from the Drum Tower. Line 2 to Guloudajie station is also close, about seven minutes' walk. Starting at the Drum and Bell Tower plaza gives you a natural route south through Nanluoguxiang. Taxis can be directed to 'Gulou' (Drum Tower) without difficulty.",
        },
        {
          heading: "Key Stops",
          body: "The Drum Tower is a 47-metre Ming dynasty structure with rooftop views across the grey-tiled hutong roofscape — it opens at 9 am. The Bell Tower directly behind it is usually visited as a pair. Nanluoguxiang is an 800-metre pedestrianised lane lined with cafes, snack vendors, and boutiques. The real interest is in the side alleys branching east and west — Mao'er Hutong, Ju'er Hutong, and others — where siheyuan gate details, stone door-drum carvings, and quiet residential life survive largely unaltered.",
        },
        {
          heading: "Best Time and Season",
          body: "9 am to noon is the best walking window, aligning with the Drum Tower's opening. Nanluoguxiang is overwhelmingly crowded on weekend afternoons — weekday mornings are far more manageable. Winter (December to February) drops below freezing but the cold keeps crowds thin and the air is often clear; a hutong under snow is genuinely beautiful. Spring and autumn are the most comfortable seasons.",
        },
        {
          heading: "Practical Tips",
          body: "Hutongs are residential neighbourhoods. Do not enter courtyard gates uninvited — admire the carved stone and wooden details from the outside. Snacks along Nanluoguxiang cost 5 to 20 yuan and many vendors take cash. Public toilets are scattered through the hutongs; quality varies. Beijing is dry year-round, so carry water. Comfortable walking shoes are essential as the paving in side alleys can be uneven.",
        },
      ],
      [
        { q: "Should I take a hutong tour or walk on my own?", a: "A rickshaw tour (1–2 hours, 100–200 yuan) gives a good overview. Afterwards, explore the side alleys on foot at your own pace for the quieter, more authentic experience." },
        { q: "Can I visit the inside of a siheyuan?", a: "A few siheyuan near Nanluoguxiang are open to visitors. Cafes and guesthouses converted from courtyard houses also let you see the interior layout." },
        { q: "Is winter too cold for hutong walking?", a: "Daytime temperatures range from -5 to 5°C in December to February. Dress warmly and you'll be rewarded with fewer tourists and potentially snow-dusted alleys." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 5. Beijing — 798 Art District Walk
  // ────────────────────────────────────────────────────────────────
  "beijing-798-art-district-walk": {
    ja: ja(CN_JA_CTA,
      "北京・798芸術区のギャラリー散歩 — 工場跡地のアートシーン",
      "北京798芸術区のギャラリー、アトリエ、屋外彫刻を巡る街歩きガイド。UCCA現代美術センターを中心に、旧工場建築とアートを楽しむルート。",
      BEIJING_798_IMAGES[0],
      BEIJING_798_IMAGES,
      BEIJING_X,
      [
        {
          heading: "このルートの特徴",
          body: "798芸術区は1950年代に東ドイツの技術協力で建てられた電子部品工場群を改装したアートエリアです。バウハウス様式の工場建築の中に、ギャラリー、アトリエ、デザインスタジオ、カフェが入居しています。屋外には大型彫刻やグラフィティアートが点在し、建物の間を歩くだけでもアートを楽しめます。北京の伝統的な観光とは異なる、現代中国のクリエイティブシーンに触れられる場所です。",
        },
        {
          heading: "アクセスと起点",
          body: "地下鉄14号線の望京南駅からタクシーまたはバスで約10分。地下鉄の直結駅はないため、DiDi配車が最も便利です。エリアの正門（大山子芸術区入口）から入ると、メインストリートに沿ってギャラリーが並んでいます。",
        },
        {
          heading: "主要スポット",
          body: "UCCA尤伦斯当代艺术中心は798のフラッグシップ機関で、国際的な企画展を開催しています。入場料は通常60〜100元。長征空間、佩斯画廊（Pace Gallery）、常青画廊なども注目のギャラリーです。工場の煙突やパイプラインが残る建物外観自体がフォトスポット。メインストリートから外れた小道に入ると、個人アーティストの工房や実験的なスペースが見つかります。",
        },
        {
          heading: "時間帯とタイミング",
          body: "ギャラリーの多くは10時〜18時営業で、月曜休館が多いです。午前中は来場者が少なく、じっくり鑑賞できます。週末は若者で賑わいますが、混雑が苦手な方は平日がベスト。展覧会の入れ替え時期（年に数回）は閉館中のギャラリーが増えるため、事前にUCCAのサイトで確認するのがおすすめ。",
        },
        {
          heading: "実用情報",
          body: "798エリアへの入場は無料で、個別のギャラリーが入場料を設定しています（無料の場所も多い）。エリアは広く、全体を回ると2〜3時間かかります。カフェやレストランはエリア内に多数あり、休憩には困りません。支払いはWeChat Pay・Alipayが主流。夏は日陰が少ないエリアもあるので帽子と水を持参してください。",
        },
      ],
      [
        { q: "798芸術区は無料で入れますか？", a: "エリアへの入場は無料です。UCCAなど一部のギャラリーは入場料（60〜100元程度）がかかりますが、多くの小規模ギャラリーは無料です。" },
        { q: "アート購入はできますか？", a: "はい、多くのギャラリーで作品を購入可能です。価格帯は数千元から数十万元まで。小さなプリントやポストカードなら数十元から買えます。" },
        { q: "798から他の観光地へのアクセスは？", a: "DiDi配車で天安門まで約30分、三里屯まで約15分。地下鉄14号線望京南駅まで戻り、乗り換えで市内各所へアクセスできます。" },
      ],
    ),
    en: en(CN_EN_CTA,
      "Beijing 798 Art District Walk — Galleries in a Soviet-Era Factory Complex",
      "A walking guide to Beijing's 798 Art District, covering UCCA Center for Contemporary Art, outdoor sculptures, and converted Bauhaus-style factory buildings in the Dashanzi area.",
      BEIJING_798_IMAGES[0],
      BEIJING_798_IMAGES,
      BEIJING_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "The 798 Art District occupies a 1950s electronics factory complex built with East German technical assistance in a Bauhaus-influenced industrial style. When the factories wound down in the early 2000s, artists moved into the cavernous spaces, and the area has since grown into Beijing's primary contemporary art hub. The combination of exposed brick, saw-tooth rooflines, and industrial piping with gallery white walls and large-scale installations creates a visual contrast you won't find in Beijing's historic sites. Outdoor sculptures and murals are scattered between the buildings, so even the walk between galleries is interesting.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "There is no metro station directly at 798. The closest is Wangjing South on Line 14, from which a taxi or DiDi ride takes about 10 minutes. Enter through the main Dashanzi Art District gate to reach the central avenue where the major galleries are clustered.",
        },
        {
          heading: "Key Stops",
          body: "UCCA Center for Contemporary Art is the flagship institution, hosting major international exhibitions. Admission is typically 60 to 100 yuan. Long March Space, Pace Gallery, and Galleria Continua are other established names worth visiting. The factory exteriors — smokestacks, exposed piping, Mao-era slogans still faintly visible on walls — are photographic subjects in their own right. Venture off the main street into the side lanes to discover smaller artist-run spaces and experimental studios.",
        },
        {
          heading: "Best Time and Season",
          body: "Most galleries open 10 am to 6 pm and close on Mondays. Mornings are quieter for viewing. Weekends draw young crowds but the atmosphere is lively. Exhibition changeover periods can leave several galleries temporarily closed — check UCCA's website before visiting. Spring and autumn are the most comfortable seasons; summer can be hot with limited shade in the open areas.",
        },
        {
          heading: "Practical Tips",
          body: "Entry to the 798 district itself is free; individual galleries set their own admission fees, and many are free. The full area takes 2 to 3 hours to cover at a comfortable pace. Cafes and restaurants are plentiful inside the district. Payment is via WeChat Pay or Alipay at most places. Bring a hat and water in summer, as some stretches between buildings offer little shade.",
        },
      ],
      [
        { q: "Is 798 Art District free to enter?", a: "The district itself is free. UCCA and some larger galleries charge admission (60–100 yuan), but many smaller galleries are free." },
        { q: "Can I buy artwork?", a: "Yes, most galleries sell works. Prices range from a few thousand to hundreds of thousands of yuan. Small prints and postcards are available from a few dozen yuan." },
        { q: "How do I get from 798 to other attractions?", a: "DiDi to Tiananmen takes about 30 minutes, to Sanlitun about 15 minutes. You can also take a taxi back to Wangjing South metro station and transfer from there." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 6. Beijing — Houhai Lake Walk
  // ────────────────────────────────────────────────────────────────
  "beijing-houhai-lake-walk": {
    ja: ja(CN_JA_CTA,
      "北京・后海湖畔の散策とカフェ — 湖を囲む胡同と恭王府",
      "北京后海（ホウハイ）湖畔を巡る街歩きガイド。銀錠橋、煙袋斜街、恭王府、蓮花胡同を経て湖畔カフェでくつろぐルートと実用情報。",
      BEIJING_HOUHAI_IMAGES[0],
      BEIJING_HOUHAI_IMAGES,
      BEIJING_X,
      [
        {
          heading: "このルートの特徴",
          body: "后海は什刹海（シーチャーハイ）エリアの中心にある湖で、周囲には胡同、恭王府（清朝の親王邸宅）、カフェやバーが並ぶ湖畔通りがあります。鼓楼から煙袋斜街を通って銀錠橋に出ると、后海と前海の湖面が広がり、晴れた日には遠くに西山の稜線も見えます。日中は静かな散策エリアで、夕方から夜にかけてはバーやライブハウスが賑わう二面性のある場所です。",
        },
        {
          heading: "アクセスと起点",
          body: "地下鉄8号線の什刹海駅が最寄り。鼓楼方面から煙袋斜街を通って后海に向かうルートが自然な流れです。地下鉄6号線の北海北駅からも徒歩10分でアクセスできます。",
        },
        {
          heading: "主要スポット",
          body: "煙袋斜街（イェンダイシェジエ）は鼓楼エリアと后海をつなぐ短い歩行者通りで、パイプ（煙袋）の形に曲がっていることから名付けられました。銀錠橋は后海と前海を分ける小さな石橋で、ここからの景色が什刹海のベストビュー。恭王府は清朝の和珅（ヘシェン）が建てた豪邸で、庭園が特に見事です（入場料40元）。荷花胡同（蓮花通り）は名前の通り蓮の花にちなんだ静かな路地です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "朝の散策は7時〜10時が静かで気持ちよく、地元住民が湖畔で体操をしている姿が見られます。恭王府は8:30開門。夕方の湖畔バーは17時頃から営業し始め、夏の夜は特に賑わいます。冬（12〜2月）には后海が凍結し、天然のスケートリンクになります。",
        },
        {
          heading: "実用情報",
          body: "后海の湖畔は遊歩道が整備されており、一周約3キロ、徒歩40〜50分です。湖畔のバーやカフェはやや観光地価格ですが、雰囲気は良いです。ボート（手漕ぎ・ペダル）のレンタルもあり、夏は湖上から胡同の屋根瓦を眺められます。支払いはWeChat Pay・Alipay主流。湖畔は街灯があるので夜も比較的安全ですが、スリには注意してください。",
        },
      ],
      [
        { q: "后海でボートに乗れますか？", a: "4月〜10月頃、手漕ぎボートやペダルボートをレンタルできます。1時間80〜120元程度。冬季は凍結するためスケートに替わります。" },
        { q: "恭王府は見学の価値がありますか？", a: "清朝の豪邸と庭園が良好な状態で保存されており、北京の宮廷文化に興味がある方には必見です。所要時間は約1時間。" },
        { q: "后海エリアの夜は安全ですか？", a: "湖畔のバーエリアは明るく人通りも多いので概ね安全です。ただし酔客が多くなる深夜帯は注意が必要です。" },
      ],
    ),
    en: en(CN_EN_CTA,
      "Beijing Houhai Lake Walk — Lakeside Hutongs, Prince Gong's Mansion, and Waterside Cafes",
      "A walking guide to Beijing's Houhai Lake covering Silver Ingot Bridge, Yandai Xiejie, Prince Gong's Mansion, and the lakeside bar and cafe strip in the Shichahai scenic area.",
      BEIJING_HOUHAI_IMAGES[0],
      BEIJING_HOUHAI_IMAGES,
      BEIJING_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Houhai is the central lake of the Shichahai scenic area, surrounded by hutong alleys, the Qing dynasty Prince Gong's Mansion, and a strip of lakeside bars and cafes. From the Drum Tower, the route threads through Yandai Xiejie — a short pedestrian street named after its tobacco-pipe shape — and emerges at Silver Ingot Bridge, where the view opens across both Houhai and Qianhai lakes, with the Western Hills visible on clear days. By day it's a quiet walking area; by evening the lakeside bars come alive with live music. In winter, the lake freezes solid and becomes a natural skating rink.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Metro Line 8 to Shichahai station is the nearest stop. The natural walking route comes from the Drum Tower area through Yandai Xiejie to the lakefront. Line 6 to Beihai North station also works, putting you about 10 minutes' walk from the lake's southern shore.",
        },
        {
          heading: "Key Stops",
          body: "Yandai Xiejie is a short, curved pedestrian street connecting the Drum Tower neighbourhood to the lakefront — its name refers to the pipe-like bend in the road. Silver Ingot Bridge is a small stone bridge dividing Houhai from Qianhai, offering the area's best view. Prince Gong's Mansion is a lavish Qing dynasty estate originally built for the official Heshen, with particularly impressive gardens (admission 40 yuan). Lotus Lane runs along the eastern shore of Qianhai with lake views and quieter cafes than the main Houhai strip.",
        },
        {
          heading: "Best Time and Season",
          body: "Early morning (7 to 10 am) is the quietest time, when locals exercise along the lakefront. Prince Gong's Mansion opens at 8:30 am. Lakeside bars open around 5 pm and are busiest in summer evenings. Winter (December to February) freezes the lake — ice skating and sledging replace the boats. Spring and autumn are ideal for comfortable walking temperatures.",
        },
        {
          heading: "Practical Tips",
          body: "The lakeside path is paved and roughly 3 kilometres around, taking 40 to 50 minutes at walking pace. Lakeside bars and cafes are priced above average for Beijing but the atmosphere compensates. Pedal boats and rowing boats are available for rent in summer (80–120 yuan per hour). Payment is mostly via WeChat Pay or Alipay. The lakefront is well-lit at night and generally safe, but watch for pickpockets in crowded bar areas.",
        },
      ],
      [
        { q: "Can I go boating on Houhai?", a: "From roughly April to October, pedal boats and rowing boats are available for hire at 80 to 120 yuan per hour. In winter the lake freezes and skating takes over." },
        { q: "Is Prince Gong's Mansion worth visiting?", a: "Yes — it's one of the best-preserved Qing dynasty noble residences in Beijing, with extensive gardens. Allow about an hour." },
        { q: "Is the Houhai area safe at night?", a: "The lakeside bar strip is well-lit and busy, making it generally safe. Exercise normal caution in the late hours when crowds thin out." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 7. Penang — George Town Walk
  // ────────────────────────────────────────────────────────────────
  "penang-george-town-walk": {
    ja: ja(MY_JA_CTA,
      "ペナン・ジョージタウンのストリートアートと遺産散策 — 世界遺産の街を歩く",
      "ペナン・ジョージタウンのストリートアート、チョン・ファッ・ツィー邸、クー・コンシ、ハーモニーストリートを巡る街歩きガイド。UNESCO世界遺産の街並みと多文化建築。",
      PENANG_GEORGE_TOWN_IMAGES[0],
      PENANG_GEORGE_TOWN_IMAGES,
      PENANG_X,
      [
        {
          heading: "このルートの特徴",
          body: "ジョージタウンはUNESCO世界遺産に登録されたペナン島の中心街で、中国系、マレー系、インド系、ヨーロッパ系の建築と文化が混在する多文化都市です。2012年にリトアニア人アーティスト、エルネスト・ザカレビッチのストリートアートが設置されて以来、壁画アートの街としても世界的に知られるようになりました。ショップハウスが連なる通りを歩きながら、宗教施設、クランハウス（氏族会館）、コロニアル建築を巡る散策は2〜3時間で回れます。",
        },
        {
          heading: "アクセスと起点",
          body: "ペナン国際空港からジョージタウン中心部までGrabタクシーで約30分。フェリーターミナル（ペナン本土側から）からは徒歩圏内です。コムター（KOMTAR）バスターミナルが公共交通のハブで、ここから旧市街までは徒歩15分。ルブー・チュリア（Lebuh Chulia）またはルブー・パンタイ（Lebuh Pantai）を起点にするのが一般的です。",
        },
        {
          heading: "主要スポット",
          body: "チョン・ファッ・ツィー邸（ブルーマンション）は19世紀の中国系富豪の邸宅で、鮮やかなインディゴブルーの外壁が目印。ガイドツアーでのみ内部見学可能です。クー・コンシはペナンで最も華麗な氏族会館で、精緻な彫刻と装飾が見事。アルメニアンストリート周辺にストリートアートが集中しており、「自転車に乗る子供たち」「ブランコに乗る少女」などの壁画が人気です。ハーモニーストリート（ルブー・ピット）にはモスク、中国寺院、ヒンドゥー寺院、教会が一本の通りに並ぶ多宗教共存の象徴です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "朝8時〜11時が涼しく歩きやすいですが、ブルーマンションのツアーは11時と14時のみ（要確認）。ストリートアートの撮影は早朝が人が少なくベスト。週末は観光客が多いですが、活気ある雰囲気も楽しめます。雨季（9〜11月）は午後にスコールがありますが、短時間で止むことが多いです。",
        },
        {
          heading: "実用情報",
          body: "ジョージタウンは熱帯気候で年間を通じて30度前後。日焼け止め、帽子、水は必須です。ストリートフード（ホーカー）はジョージタウンの大きな魅力で、アッサムラクサ、チャークエティアオ、ワンタンミーなどが名物。支払いは現金が主流で、屋台では5〜15リンギット程度。クレジットカードはカフェやレストランで使えます。歩道が狭い場所が多いので、車やバイクに注意してください。",
        },
      ],
      [
        { q: "ジョージタウンの散策に何時間必要ですか？", a: "主要スポットを回るなら2〜3時間。ストリートフードや博物館も含めると半日〜1日楽しめます。" },
        { q: "おすすめのストリートフードは？", a: "アッサムラクサ（酸味のある魚出汁麺）、チャークエティアオ（炒め麺）、煎蕊（チェンドル、かき氷デザート）は必食です。" },
        { q: "ブルーマンションの見学は予約が必要ですか？", a: "ガイドツアーは先着順で、11時と14時の2回（時期により変更あり）。宿泊客はいつでも見学可能です。" },
      ],
    ),
    en: en(MY_EN_CTA,
      "Penang George Town Walk — Street Art, Clan Houses, and Heritage Architecture",
      "A walking guide to George Town's UNESCO World Heritage core covering street art murals, Cheong Fatt Tze Mansion, Khoo Kongsi, and the Street of Harmony's multi-faith heritage.",
      PENANG_GEORGE_TOWN_IMAGES[0],
      PENANG_GEORGE_TOWN_IMAGES,
      PENANG_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "George Town is a UNESCO World Heritage Site where Chinese, Malay, Indian, and European architectural traditions converge on a walkable grid of colonial-era shophouses. Since 2012, when Lithuanian artist Ernest Zacharevic installed a series of wall murals, the old town has doubled as an open-air street art gallery. The combination of ornate clan houses, a mosque, Hindu temple, Chinese temple, and church all on the same street (Lebuh Pitt, known as the Street of Harmony), and the vibrant hawker food scene make George Town one of Southeast Asia's most layered walking cities. The core heritage zone is compact enough to cover in 2 to 3 hours on foot.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Penang International Airport to central George Town is about 30 minutes by Grab. The ferry terminal from the mainland is within walking distance of the heritage zone. KOMTAR bus terminal is the public transport hub, a 15-minute walk to the old town. Starting from Lebuh Chulia or Lebuh Pantai puts you at the edge of the heritage core.",
        },
        {
          heading: "Key Stops",
          body: "Cheong Fatt Tze Mansion, known as the Blue Mansion, is a 19th-century Chinese merchant's house painted in striking indigo — interior visits are by guided tour only. Khoo Kongsi is the most elaborate of Penang's Chinese clan houses, with extraordinarily detailed carvings and gilded decorations. Street art is concentrated around Armenian Street, with the 'Children on a Bicycle' and 'Girl on a Swing' murals drawing the most visitors. The Street of Harmony (Lebuh Pitt) lines up a mosque, Chinese temple, Hindu temple, and church on a single road — a physical expression of George Town's multi-faith identity.",
        },
        {
          heading: "Best Time and Season",
          body: "8 to 11 am is the coolest window for walking. Blue Mansion tours run at 11 am and 2 pm (confirm times in advance). Street art photography is best very early before other visitors arrive. The wet season (September to November) brings afternoon downpours, but they typically pass within an hour.",
        },
        {
          heading: "Practical Tips",
          body: "George Town is tropical year-round, averaging 30°C. Sunscreen, a hat, and water are essential. Hawker food is a major attraction — asam laksa, char kway teow, and cendol are signatures. Street stalls are cash-based, typically 5 to 15 ringgit per dish. Cafes and restaurants accept credit cards. Pavements can be narrow and uneven, so watch for motorbikes and cars.",
        },
      ],
      [
        { q: "How long does the George Town walk take?", a: "The main heritage loop takes 2 to 3 hours. Add hawker food and museum stops and you can fill half a day to a full day." },
        { q: "What street food should I try?", a: "Asam laksa (sour fish broth noodles), char kway teow (stir-fried noodles), and cendol (shaved ice dessert) are must-tries." },
        { q: "Do I need to book the Blue Mansion tour?", a: "Tours are first-come first-served at 11 am and 2 pm (schedules may vary). Staying overnight at the mansion gives you unrestricted access." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 8. Penang — Armenian Street Walk
  // ────────────────────────────────────────────────────────────────
  "penang-armenian-street-walk": {
    ja: ja(MY_JA_CTA,
      "ペナン・アルメニアンストリートとクラン桟橋散歩 — 壁画から水上集落へ",
      "ペナン・アルメニアンストリートの壁画アート、ヤップ・コンシ、孫文博物館からクラン桟橋（姓周橋）を巡る街歩きガイド。",
      PENANG_ARMENIAN_STREET_IMAGES[0],
      PENANG_ARMENIAN_STREET_IMAGES,
      PENANG_X,
      [
        {
          heading: "このルートの特徴",
          body: "アルメニアンストリート（ルブー・アルメニア）はジョージタウンのストリートアートの中心地で、通り沿いにはカフェ、ギャラリー、土産物店が並んでいます。ここから南へ歩くと、クラン桟橋（姓氏橋）と呼ばれる水上集落に到着します。クラン桟橋は中国系移民の氏族ごとに建てられた桟橋沿いの住居群で、今も住民が暮らす生きた文化遺産です。壁画アートから水上生活まで、ペナンの歴史と文化の層を一度に体験できるルートです。",
        },
        {
          heading: "アクセスと起点",
          body: "アルメニアンストリートはジョージタウンの旧市街中心にあり、コムターバスターミナルから徒歩15分。Grabタクシーの場合は「Armenian Street」を指定。通りの北端から南へ歩き、最終的にウェルド・キー（Weld Quay）沿いのクラン桟橋に至るルートが自然です。",
        },
        {
          heading: "主要スポット",
          body: "アルメニアンストリート沿いのストリートアートは「自転車に乗る子供たち」が最も有名。ヤップ・コンシ（葉氏宗祠）は小規模ながら美しく保存された氏族会館です。孫文博物館（孫中山ペナン基地記念館）は辛亥革命の歴史に触れられる施設。クラン桟橋は7つの桟橋から成り、最大の周姓橋（チュー・ジェティ）が最も観光しやすいです。桟橋の先端からはペナン海峡の眺めが楽しめます。",
        },
        {
          heading: "時間帯とタイミング",
          body: "朝8時〜10時が涼しく、壁画の写真撮影にも最適です。クラン桟橋は早朝に漁師が出入りする姿が見られ、生活感があります。午後は暑さが厳しいので、午前中に完歩するのがおすすめ。全ルートで約2時間。中国の旧正月時期はクラン桟橋が飾り付けされ、特別な雰囲気になります。",
        },
        {
          heading: "実用情報",
          body: "クラン桟橋は住民の生活の場です。大声を出したり、住居の中を覗き込んだりしないよう配慮してください。桟橋の板は木製で雨の日は滑りやすいので注意。ストリートフードはアルメニアンストリート周辺に多く、特にアイスカチャン（かき氷）やチェンドルが人気。支払いは現金が安心です。",
        },
      ],
      [
        { q: "クラン桟橋は入場料がかかりますか？", a: "周姓橋は無料で歩けます。他の桟橋も基本的に無料ですが、住民のプライバシーを尊重してください。" },
        { q: "アルメニアンストリートからクラン桟橋まで何分ですか？", a: "徒歩で約15〜20分です。途中にカフェや商店があるので、立ち寄りながら歩くと30分程度。" },
        { q: "壁画は全部で何か所ありますか？", a: "ジョージタウン全体で50か所以上。アルメニアンストリート周辺に集中していますが、街全体に散らばっています。観光案内所で壁画マップをもらえます。" },
      ],
    ),
    en: en(MY_EN_CTA,
      "Penang Armenian Street and Clan Jetties Walk — From Murals to Waterfront Settlements",
      "A walking guide from Armenian Street's murals and Yap Kongsi through the Sun Yat-sen Museum to the Clan Jetties, Penang's stilt-house waterfront settlements on Weld Quay.",
      PENANG_ARMENIAN_STREET_IMAGES[0],
      PENANG_ARMENIAN_STREET_IMAGES,
      PENANG_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Armenian Street sits at the centre of George Town's street art scene, lined with cafes, galleries, and souvenir shops. Walking south from here brings you to the Clan Jetties on Weld Quay — a series of waterfront stilt-house settlements built by Chinese immigrant clans, each named after the family surname of its residents. The jetties are living communities, not museum exhibits, and they provide a direct connection to the migrant history that shaped Penang. The route from murals to waterfront covers the full spectrum of George Town's layered cultural heritage in a single walk.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Armenian Street is in the heart of George Town's old town, about 15 minutes on foot from KOMTAR bus terminal. By Grab, specify 'Armenian Street.' The natural route runs from the northern end of the street southward, finishing at the Clan Jetties on Weld Quay.",
        },
        {
          heading: "Key Stops",
          body: "The 'Children on a Bicycle' mural on Armenian Street is the most photographed piece of street art in George Town. Yap Kongsi is a smaller but beautifully maintained clan house. The Sun Yat-sen Museum (Sun Yat-sen Penang Base Memorial Hall) documents the revolutionary movement's connection to Penang. The Clan Jetties consist of seven jetties, with Chew Jetty being the largest and most visited. Walking to the end of a jetty gives you views across the Penang Strait.",
        },
        {
          heading: "Best Time and Season",
          body: "8 to 10 am is coolest and best for mural photography with fewer people in frame. The Clan Jetties are most atmospheric early morning when fishermen are active. Afternoon heat is intense, so aim to finish by noon. The full route takes about 2 hours. Chinese New Year transforms the jetties with decorations and festivities.",
        },
        {
          heading: "Practical Tips",
          body: "The Clan Jetties are residential — keep noise down and don't peer into homes. The wooden boardwalks can be slippery in rain. Street food is plentiful around Armenian Street; ice kacang and cendol are popular refreshments. Cash is the safer payment method at food stalls and jetty-side shops.",
        },
      ],
      [
        { q: "Is there an admission fee for the Clan Jetties?", a: "Chew Jetty and most others are free to walk. Respect residents' privacy while visiting." },
        { q: "How far is it from Armenian Street to the Clan Jetties?", a: "About 15 to 20 minutes on foot. With stops along the way, allow 30 minutes." },
        { q: "How many murals are there in total?", a: "George Town has over 50 murals spread across the old town, with the highest concentration around Armenian Street. Pick up a mural map at the tourist information centre." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 9. Siem Reap — Old Market Walk
  // ────────────────────────────────────────────────────────────────
  "siem-reap-old-market-walk": {
    ja: ja(KH_JA_CTA,
      "シェムリアップ・オールドマーケットとパブストリート周辺散策 — アンコール遺跡の街の日常",
      "シェムリアップのオールドマーケット（プサー・チャス）、パブストリート、シェムリアップ川沿いを巡る街歩きガイド。アンコール遺跡以外の街の楽しみ方。",
      SIEM_REAP_OLD_MARKET_IMAGES[0],
      SIEM_REAP_OLD_MARKET_IMAGES,
      SIEM_REAP_X,
      [
        {
          heading: "このルートの特徴",
          body: "シェムリアップはアンコールワットの玄関口として知られていますが、街自体にも魅力があります。オールドマーケット（プサー・チャス）はシェムリアップで最も古い常設市場で、生鮮食品、スパイス、手工芸品が所狭しと並びます。すぐ隣のパブストリートは夜になるとネオンが灯るエンターテインメント通り。シェムリアップ川沿いの遊歩道は並木が美しく、朝夕の散歩に最適です。遺跡見学の合間に、街の日常に触れる半日散策ルートです。",
        },
        {
          heading: "アクセスと起点",
          body: "シェムリアップ国際空港から中心部までトゥクトゥクで約20分（5〜7ドル）。ほとんどのホテルがオールドマーケット周辺に位置しているため、徒歩でアクセスできます。オールドマーケットの北端を起点にすると、市場を抜けてパブストリートへ、さらに川沿いを歩くルートが自然です。",
        },
        {
          heading: "主要スポット",
          body: "オールドマーケットは朝6時頃から営業し、午前中が最も活気があります。生鮮食品エリアは地元の食文化を体感でき、手工芸品・シルクスカーフのエリアではお土産も探せます。パブストリートは歩行者天国で、レストラン、バー、マッサージ店が並びます。シェムリアップ川沿いの遊歩道はロイヤルガーデンまで続き、途中にカフェが点在。アンコール・ナイトマーケットは夕方から営業し、ハンドメイドの土産物が豊富です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "オールドマーケットは朝6時〜昼過ぎが営業のピーク。パブストリートは17時頃から賑わい始め、21時〜23時がピーク。川沿いの散歩は朝夕が涼しくておすすめ。乾季（11月〜4月）がベストシーズンで、雨季（5〜10月）は午後のスコールが頻繁ですが、朝は晴れることが多いです。",
        },
        {
          heading: "実用情報",
          body: "カンボジアでは米ドルが広く流通しており、オールドマーケットでもドル払いが可能。ただしお釣りはリエル（現地通貨）で返ってくることが多いです。値段交渉は一般的で、提示価格の50〜70%を目安に交渉しましょう。トゥクトゥクは1日チャーターで15〜20ドルが相場。暑さ対策は必須で、帽子・日焼け止め・水を常備してください。",
        },
      ],
      [
        { q: "オールドマーケットでおすすめのお土産は？", a: "カンボジアシルクのスカーフ（5〜15ドル）、クメール胡椒（カンポットペッパー）、手彫りの石鹸ケースなどが人気です。" },
        { q: "パブストリートの物価は高いですか？", a: "地ビール（ドラフト）は0.5〜1ドル、食事は3〜8ドル程度。観光地価格ではありますが、日本と比べると非常に安価です。" },
        { q: "一人旅でも安全ですか？", a: "シェムリアップ中心部は観光客が多く比較的安全です。ただし夜間の暗い路地や、バイクタクシーでのスリには注意してください。" },
      ],
    ),
    en: en(KH_EN_CTA,
      "Siem Reap Old Market and Pub Street Walk — The Town Beyond the Temples",
      "A walking guide to Siem Reap's Old Market (Psar Chas), Pub Street, the riverside promenade, and the Angkor Night Market — exploring the town that serves as the gateway to Angkor.",
      SIEM_REAP_OLD_MARKET_IMAGES[0],
      SIEM_REAP_OLD_MARKET_IMAGES,
      SIEM_REAP_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Siem Reap exists because of Angkor Wat, but the town itself has grown into a destination worth exploring on its own terms. The Old Market (Psar Chas) is the oldest permanent market in town, a dense grid of stalls selling fresh produce, spices, silks, and handicrafts. One block away, Pub Street is the pedestrianised entertainment strip that fills with light and music after sunset. The Siem Reap River walk, shaded by old trees, connects the market area to the Royal Gardens and offers a quieter counterpoint. This is a half-day route designed for the hours between temple visits.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Siem Reap International Airport to the town centre is about 20 minutes by tuk-tuk (5 to 7 USD). Most hotels are within walking distance of the Old Market area. Starting at the northern end of the Old Market lets you walk through the market, emerge onto Pub Street, and continue along the river.",
        },
        {
          heading: "Key Stops",
          body: "The Old Market opens around 6 am and is busiest in the morning. The fresh food section is the most immersive cultural experience; the handicraft and silk-scarf section is better for souvenirs. Pub Street is pedestrianised and lined with restaurants, bars, and massage shops. The riverside promenade runs to the Royal Gardens, with cafes spaced along the way. The Angkor Night Market opens in the evening and stocks handmade souvenirs and local crafts.",
        },
        {
          heading: "Best Time and Season",
          body: "The Old Market peaks from 6 am to early afternoon. Pub Street warms up around 5 pm and peaks between 9 and 11 pm. The river walk is most pleasant in the cooler morning and evening hours. The dry season (November to April) is the best time; the wet season (May to October) brings afternoon showers but mornings are usually clear.",
        },
        {
          heading: "Practical Tips",
          body: "US dollars are widely accepted in Cambodia — the Old Market takes dollars, but change is often given in riel (local currency). Bargaining is expected; aim for 50 to 70 percent of the asking price. Tuk-tuks can be hired for a full day at 15 to 20 USD. Heat protection is essential — hat, sunscreen, and water at all times.",
        },
      ],
      [
        { q: "What souvenirs are good at the Old Market?", a: "Cambodian silk scarves (5–15 USD), Kampot pepper, and hand-carved soap dishes are popular choices." },
        { q: "Is Pub Street expensive?", a: "Draft beer runs 0.50 to 1 USD, meals 3 to 8 USD. It's priced for tourists but very affordable by international standards." },
        { q: "Is it safe to walk around alone?", a: "Central Siem Reap is busy with tourists and generally safe. Take normal precautions at night in quiet side streets and watch for bag-snatching from passing motorbikes." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 10. Siem Reap — Artisans Walk
  // ────────────────────────────────────────────────────────────────
  "siem-reap-artisans-walk": {
    ja: ja(KH_JA_CTA,
      "シェムリアップ・アーティザンズ・アンコールとシルクファーム — クメール工芸の現場を訪ねる",
      "シェムリアップのアーティザンズ・アンコール工房とシルクファームを巡るガイド。石彫り、漆器、シルク織りのクメール伝統工芸を間近で体験。",
      SIEM_REAP_ARTISANS_IMAGES[0],
      SIEM_REAP_ARTISANS_IMAGES,
      SIEM_REAP_X,
      [
        {
          heading: "このルートの特徴",
          body: "アーティザンズ・アンコール（Artisans d'Angkor）はカンボジアの若者にクメール伝統工芸を教育・雇用する社会企業です。シェムリアップ市内の本部工房では石彫り、木彫り、漆器、銀細工の制作過程を無料で見学できます。郊外のシルクファームでは蚕の飼育からシルク染色・織りまでの全工程を体験可能。アンコール遺跡の彫刻技術が現代にどう受け継がれているかを知る、遺跡見学の補完的な体験です。",
        },
        {
          heading: "アクセスと起点",
          body: "市内工房はシェムリアップ中心部から徒歩圏内（オールドマーケットから約10分）。シルクファームは市内から西へ約16キロ、トゥクトゥクで約30分です。工房とシルクファームをセットで訪問する場合、午前中に工房、午後にシルクファームという順が効率的です。シルクファームへの無料シャトルバスも運行しています（要確認）。",
        },
        {
          heading: "主要スポット",
          body: "市内工房ではガイド付きツアー（英語・フランス語、無料）で制作工程を見学でき、所要約45分。職人がアンコール時代のモチーフを再現する石彫りは特に見応えがあります。ショップでは制作品を購入でき、売上は職人の雇用に直結します。シルクファームでは蚕室、天然染料の畑、手織り機での織り作業を順に見学。カンボジア固有の黄金繭（ゴールデンシルク）は世界的にも希少です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "市内工房は7:30〜18:30営業。シルクファームは8:00〜17:00。職人の作業が見られるのは平日の午前中がベスト。週末や祝日は一部の工程が休止していることがあります。全体で半日（4〜5時間）を確保すると余裕を持って回れます。",
        },
        {
          heading: "実用情報",
          body: "市内工房・シルクファームともに入場無料。ガイドツアーも無料ですがチップは歓迎されます。シルクファームは田舎道を通るため、雨季はぬかるむことがあり、歩きやすい靴がおすすめ。工房ショップの品質は高く、正規品なので値引き交渉はありません。暑さ対策の水と帽子を持参してください。",
        },
      ],
      [
        { q: "アーティザンズ・アンコールは無料で見学できますか？", a: "はい、市内工房もシルクファームもガイドツアーを含めて無料です。チップは任意です。" },
        { q: "シルクファームへの行き方は？", a: "トゥクトゥクで約30分（往復10〜15ドル程度）。無料シャトルバスが運行されている時期もあるので事前に確認してください。" },
        { q: "子供連れでも楽しめますか？", a: "はい、蚕や染料の植物を見たり、織り機の実演を見たりと、子供でも楽しめる体験型の施設です。" },
      ],
    ),
    en: en(KH_EN_CTA,
      "Siem Reap Artisans d'Angkor and Silk Farm — Khmer Craft Traditions Up Close",
      "A guide to visiting Artisans d'Angkor's workshop in Siem Reap and the Silk Farm outside town, covering stone carving, lacquerware, and the full silk production process from silkworm to loom.",
      SIEM_REAP_ARTISANS_IMAGES[0],
      SIEM_REAP_ARTISANS_IMAGES,
      SIEM_REAP_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Artisans d'Angkor is a social enterprise that trains young Cambodians in traditional Khmer crafts and employs them as full-time artisans. The workshop in central Siem Reap demonstrates stone carving, wood carving, lacquerware, and silverwork — all free to visit. The Silk Farm, about 16 kilometres west of town, shows the entire silk production chain from silkworm rearing through natural dyeing to hand-loom weaving. Together they offer context for the carvings you see at Angkor and a way to support the community that preserves those skills.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "The town workshop is a 10-minute walk from the Old Market. The Silk Farm is 16 kilometres west, about 30 minutes by tuk-tuk. Visiting the workshop in the morning and the farm in the afternoon is the most efficient sequence. A free shuttle bus to the farm operates on some days — check with the workshop before heading out.",
        },
        {
          heading: "Key Stops",
          body: "The town workshop offers free guided tours (English and French, about 45 minutes) through the production areas. Watching artisans reproduce Angkor-era stone-carving motifs is the highlight. The on-site shop sells the finished products, with proceeds going directly to artisan employment. At the Silk Farm, the tour covers the silkworm rooms, the natural-dye garden, and the hand-loom weaving stations. Cambodia's native golden silk (from a unique local silkworm) is one of the rarest textiles in the world.",
        },
        {
          heading: "Best Time and Season",
          body: "The town workshop is open 7:30 am to 6:30 pm. The Silk Farm runs 8 am to 5 pm. Weekday mornings are best for seeing artisans at work — some processes may be paused on weekends and holidays. Allow half a day (4 to 5 hours) for both sites combined.",
        },
        {
          heading: "Practical Tips",
          body: "Both the workshop and Silk Farm are free to enter, including guided tours. Tips are appreciated but not required. The road to the Silk Farm passes through rural areas and can be muddy in the wet season — wear sturdy shoes. Shop prices are fixed and the quality is high, so bargaining does not apply. Bring water and a hat for heat protection.",
        },
      ],
      [
        { q: "Is Artisans d'Angkor free to visit?", a: "Yes, both the town workshop and the Silk Farm are free, including guided tours. Tips are welcome but optional." },
        { q: "How do I get to the Silk Farm?", a: "By tuk-tuk, about 30 minutes each way (10–15 USD round trip). A free shuttle bus runs on some days — confirm at the workshop." },
        { q: "Is it suitable for children?", a: "Yes — silkworms, dye plants, and live weaving demonstrations make it an engaging experience for kids." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 11. Colombo — Fort and Pettah Walk
  // ────────────────────────────────────────────────────────────────
  "colombo-fort-pettah-walk": {
    ja: ja(LK_JA_CTA,
      "コロンボフォートとペター市場散策 — 植民地建築から庶民の市場へ",
      "コロンボのフォート地区のコロニアル建築とペター市場を巡る街歩きガイド。旧オランダ病院、赤モスク（ジャミ・ウル・アルファー）、ワールドトレードセンターを経由するルート。",
      COLOMBO_FORT_IMAGES[0],
      COLOMBO_FORT_IMAGES,
      COLOMBO_X,
      [
        {
          heading: "このルートの特徴",
          body: "コロンボ・フォート地区はかつてポルトガル、オランダ、イギリスの植民地支配の中心だったエリアで、コロニアル建築とモダンな高層ビルが共存しています。フォートからひと通り東に入ると、ペター地区の活気ある市場街が広がります。ペターはコロンボで最もエネルギッシュなエリアで、衣料品、電子機器、スパイス、野菜が通りごとに専門化して並んでいます。ジャミ・ウル・アルファー・モスク（赤モスク）の赤白縞模様のファサードはペターの象徴的なランドマークです。",
        },
        {
          heading: "アクセスと起点",
          body: "コロンボ・フォート駅が最寄りで、フォート地区の中心まで徒歩5分。バンダラナイケ国際空港からは高速道路経由で約1時間（タクシー3,000〜5,000ルピー）。旧オランダ病院（ダッチ・ホスピタル）を起点にすると、レストランで朝食をとってから散策を始められます。",
        },
        {
          heading: "主要スポット",
          body: "旧オランダ病院はコロンボ最古の建築物のひとつで、現在はレストラン・カフェ・ショップが入る複合施設。フォート地区のワールドトレードセンターのツインタワーはコロンボのスカイラインを形成しています。ペターに入ると、セカンドクロスストリートからメインストリートにかけて市場が密集。赤モスク（ジャミ・ウル・アルファー・モスク）は1909年建造で、インド・ムーア様式の独特のデザイン。礼拝時間以外は見学可能です（適切な服装が必要）。",
        },
        {
          heading: "時間帯とタイミング",
          body: "市場は朝7時頃から活気づき、午前中がピーク。午後は暑さで人が減り、一部の店が閉まります。赤モスクは金曜の昼（礼拝時間）は見学不可。フォート地区は平日がビジネス街として機能しており、土日は静かです。ペターは土曜午前も賑わいますが、日曜は大半の店が休業。",
        },
        {
          heading: "実用情報",
          body: "ペターは非常に混雑するため、貴重品は体の前に持ち、バッグのファスナーを閉めておきましょう。支払いは現金（スリランカルピー）が基本。両替はフォート地区に銀行があります。暑さと湿度が厳しいので水と帽子は必携。赤モスク見学時は肩と膝を覆う服装が必要で、女性はスカーフで頭を覆ってください。トゥクトゥクは初乗り100ルピー程度ですが、メーターを使わない運転手もいるので乗車前に料金交渉を。",
        },
      ],
      [
        { q: "ペター市場は安全ですか？", a: "昼間は概ね安全ですが、人混みでのスリに注意してください。大きな荷物は持たず、貴重品は体に密着させましょう。" },
        { q: "赤モスクの見学時間は？", a: "礼拝時間以外（通常9時〜12時、14時〜16時頃）に見学可能ですが、金曜昼は礼拝のため不可。入口で確認してください。" },
        { q: "フォート地区とペターの距離は？", a: "徒歩で10〜15分程度。旧オランダ病院から赤モスクまでまっすぐ歩けます。" },
      ],
    ),
    en: en(LK_EN_CTA,
      "Colombo Fort and Pettah Market Walk — Colonial Heritage Meets Street Markets",
      "A walking guide to Colombo's Fort district and Pettah bazaar covering the Dutch Hospital, Jami Ul-Alfar Mosque, the World Trade Center, and the bustling market streets of Pettah.",
      COLOMBO_FORT_IMAGES[0],
      COLOMBO_FORT_IMAGES,
      COLOMBO_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Colombo Fort was the administrative centre under Portuguese, Dutch, and British rule, and its streets still carry the layered architectural evidence of all three colonial periods alongside modern glass towers. One block east, Pettah erupts into one of South Asia's most intense market districts — streets specialised by commodity, packed with vendors and shoppers from early morning. The Jami Ul-Alfar Mosque, with its red-and-white candy-striped facade, is Pettah's most distinctive landmark and one of the most photographed buildings in Sri Lanka. The contrast between the corporate calm of Fort and the raw commercial energy of Pettah is what makes this route work.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Colombo Fort railway station puts you five minutes on foot from the centre of the Fort district. From Bandaranaike International Airport, the expressway takes about one hour by taxi (3,000–5,000 rupees). Starting at the Dutch Hospital — Colombo's oldest surviving building, now a dining and shopping precinct — lets you have breakfast before walking.",
        },
        {
          heading: "Key Stops",
          body: "The Dutch Hospital complex houses restaurants, cafes, and shops in a restored colonial-era structure. The World Trade Center twin towers define the Fort skyline. Entering Pettah from Second Cross Street, the market density increases rapidly — textiles, electronics, spices, and vegetables are each concentrated on their own streets. The Jami Ul-Alfar Mosque (Red Mosque), built in 1909 in an Indo-Moorish style, is open to visitors outside prayer times with appropriate dress.",
        },
        {
          heading: "Best Time and Season",
          body: "The market comes alive around 7 am and peaks in the morning. Afternoons are hot and quieter, with some stalls closing. The Red Mosque is closed to visitors during Friday midday prayers. Fort is a business district — weekdays are bustling, weekends quiet. Pettah's Saturday mornings are busy but most shops close on Sundays.",
        },
        {
          heading: "Practical Tips",
          body: "Pettah is extremely crowded — keep valuables in a front-facing bag with zippers closed. Cash (Sri Lankan rupees) is the standard payment method. Banks in the Fort area offer exchange. Heat and humidity are significant, so carry water and a hat. Visiting the Red Mosque requires shoulders and knees covered; women should bring a headscarf. Tuk-tuks start at about 100 rupees but drivers may not use meters — negotiate the fare before boarding.",
        },
      ],
      [
        { q: "Is Pettah market safe?", a: "Daytime is generally safe but crowded. Watch for pickpockets, travel light, and keep bags close to your body." },
        { q: "When can I visit the Red Mosque?", a: "Outside prayer times, roughly 9 am to noon and 2 to 4 pm. Friday midday prayers close it to visitors. Check at the entrance." },
        { q: "How far is Fort from Pettah?", a: "10 to 15 minutes on foot. The Dutch Hospital and the Red Mosque are connected by a straight walk." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 12. Colombo — Galle Face Walk
  // ────────────────────────────────────────────────────────────────
  "colombo-galle-face-walk": {
    ja: ja(LK_JA_CTA,
      "コロンボ・ゴールフェイスグリーンと海沿い散歩 — インド洋の夕日と屋台グルメ",
      "コロンボのゴールフェイスグリーン、ゴールフェイスホテル、海沿いプロムナードを巡る散歩ガイド。夕日鑑賞とストリートフードの楽しみ方。",
      COLOMBO_GALLE_FACE_IMAGES[0],
      COLOMBO_GALLE_FACE_IMAGES,
      COLOMBO_X,
      [
        {
          heading: "このルートの特徴",
          body: "ゴールフェイスグリーンはコロンボ中心部に位置する約5ヘクタールの海沿い公園で、1859年にイギリス植民地政府が造成しました。インド洋に面した西向きの立地のため、夕日の名所として知られています。平日の夕方から地元住民が集まり始め、週末は家族連れやカップルで賑わいます。プロムナード沿いには屋台が並び、コットゥ・ロティ（刻んだロティの炒め物）やイッソ・ワデ（海老のフリッター）などのスリランカ料理が楽しめます。",
        },
        {
          heading: "アクセスと起点",
          body: "コロンボ・フォート駅から南へ徒歩15分。ゴールフェイスホテル（1864年創業、アジア最古級のホテル）がランドマークで、ここを起点にプロムナードを北へ歩くルートがおすすめ。トゥクトゥクならフォートから100〜200ルピー程度です。",
        },
        {
          heading: "主要スポット",
          body: "ゴールフェイスホテルはコロニアル建築の優雅な外観が見どころで、ロビーカフェで一服もできます。プロムナードは約1キロの遊歩道で、海風を感じながら歩けます。夕方になると屋台が営業を始め、コットゥ・ロティ、ワデ、フルーツジュースが人気。北端にはフォート地区の高層ビル群が見え、新旧のコロンボの対比を楽しめます。凧揚げやクリケットをする地元住民の姿も日常的な風景です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "夕日鑑賞なら日没の1時間前（17時頃）に到着するのがベスト。屋台は16時頃から出始め、19時〜20時が最も賑わいます。朝の散歩も気持ちよく、6時〜8時はジョギングやヨガをする人々が見られます。週末の夕方は非常に混雑するので、静かに歩きたいなら平日の朝がおすすめ。",
        },
        {
          heading: "実用情報",
          body: "屋台の食事は100〜500ルピー程度で現金払い。ゴールフェイスグリーンは入場無料で24時間開放されていますが、深夜は人が少なくなるため22時までに切り上げるのが安心です。海風が強いので帽子が飛ばされないよう注意。日中は日差しが強いため日焼け止めと水を持参。プロムナードにトイレは少ないので、ホテルやカフェで済ませておきましょう。",
        },
      ],
      [
        { q: "ゴールフェイスグリーンの入場料は？", a: "無料で24時間開放されています。" },
        { q: "おすすめの屋台料理は？", a: "コットゥ・ロティ（炒めロティ）とイッソ・ワデ（海老フリッター）は定番。フレッシュフルーツジュースも暑さしのぎに最適です。" },
        { q: "ゴールフェイスグリーンから他の観光地への距離は？", a: "フォート地区まで徒歩15分、ガンガラーマ寺院まで徒歩20分。コロンボ国立博物館へはトゥクトゥクで10分程度です。" },
      ],
    ),
    en: en(LK_EN_CTA,
      "Colombo Galle Face Green Walk — Sunset, Street Food, and Ocean Breezes",
      "A walking guide to Galle Face Green, Colombo's oceanfront promenade, covering the historic Galle Face Hotel, sunset viewing, and the evening street food stalls along the Indian Ocean.",
      COLOMBO_GALLE_FACE_IMAGES[0],
      COLOMBO_GALLE_FACE_IMAGES,
      COLOMBO_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Galle Face Green is a five-hectare oceanfront park in central Colombo, laid out by the British colonial administration in 1859. Its west-facing position on the Indian Ocean makes it the city's premier sunset spot. From late afternoon, locals gather on the green — families flying kites, couples on the promenade, cricket games on the grass — and food stalls line the walkway selling kottu roti, isso wade, and fresh fruit juice. The atmosphere is entirely local, even though the location is central and easy to reach.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Colombo Fort station is a 15-minute walk north. The Galle Face Hotel (operating since 1864, one of the oldest hotels in Asia) serves as the landmark starting point — walk north along the promenade from there. A tuk-tuk from Fort costs about 100 to 200 rupees.",
        },
        {
          heading: "Key Stops",
          body: "The Galle Face Hotel's colonial facade is worth a look, and its lobby cafe is open to non-guests. The promenade runs about one kilometre along the seafront. Evening food stalls set up from around 4 pm, with kottu roti, wade (lentil fritters), and fruit juice being the top sellers. At the northern end, the Fort district's high-rise towers provide a modern backdrop. Locals flying kites and playing cricket on the grass are part of the everyday scene.",
        },
        {
          heading: "Best Time and Season",
          body: "Arrive about an hour before sunset (around 5 pm) for the best light. Food stalls are busiest between 7 and 8 pm. Early morning (6 to 8 am) is pleasant for joggers and yoga practitioners. Weekend evenings draw large crowds; weekday mornings are quieter. The southwest monsoon (May to September) can bring rough seas and wind but the promenade stays accessible.",
        },
        {
          heading: "Practical Tips",
          body: "Street food costs 100 to 500 rupees and is cash-only. Galle Face Green is free and open 24 hours, but it's best to leave by 10 pm when the crowd thins. Sea breezes can be strong — secure hats and loose items. Daytime sun is intense; bring sunscreen and water. Public toilets along the promenade are scarce, so use hotel or cafe facilities beforehand.",
        },
      ],
      [
        { q: "Is there an entry fee for Galle Face Green?", a: "No — it's free and open 24 hours." },
        { q: "What street food should I try?", a: "Kottu roti (chopped stir-fried flatbread) and isso wade (prawn fritters) are the signatures. Fresh fruit juice is the best way to cool down." },
        { q: "How far is Galle Face Green from other attractions?", a: "Fort district is 15 minutes on foot, Gangaramaya Temple 20 minutes. The Colombo National Museum is about 10 minutes by tuk-tuk." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 13. Kathmandu — Durbar Square Walk
  // ────────────────────────────────────────────────────────────────
  "kathmandu-durbar-square-walk": {
    ja: ja(NP_JA_CTA,
      "カトマンズ・ダルバール広場と周辺寺院散策 — ネワール建築の宝庫を歩く",
      "カトマンズ・ダルバール広場のパゴダ寺院、クマリの館、カスタマンダップ、ハヌマン・ドカ旧王宮を巡る街歩きガイド。2015年地震後の復興状況も紹介。",
      KATHMANDU_DURBAR_IMAGES[0],
      KATHMANDU_DURBAR_IMAGES,
      KATHMANDU_X,
      [
        {
          heading: "このルートの特徴",
          body: "カトマンズ・ダルバール広場はUNESCO世界遺産に登録されたネワール建築の集積地で、パゴダ様式の寺院、旧王宮、生き神クマリの館が集中しています。2015年のネパール大地震で大きな被害を受けましたが、復興が進み、多くの寺院が再建されています。広場から北東に歩くとアソン市場に至り、日用品やスパイスの活気ある商店街が続きます。歴史、宗教、日常生活が凝縮されたカトマンズの核心部です。",
        },
        {
          heading: "アクセスと起点",
          body: "トリブバン国際空港からタクシーで約30分（500〜800ルピー）。タメル地区からは徒歩20〜25分で、ダルバール広場の北西入口に到着します。広場への入場料は外国人1,000ルピー（約8ドル）で、パスポート提示が必要です。チケットは1日有効で、複数日の滞在なら無料で延長手続きが可能です。",
        },
        {
          heading: "主要スポット",
          body: "カスタマンダップはカトマンズの名前の由来となった木造パビリオンで、地震後に再建されました。クマリの館（クマリ・ガル）は精緻な木彫りの窓が見事で、運が良ければ生き神クマリが窓から顔を見せます（写真撮影は禁止）。タレジュ寺院は広場で最も高い建造物（36メートル）。ハヌマン・ドカ旧王宮は博物館になっており、王室の歴史を学べます。広場を出てアソン市場に向かうと、スパイスや金物の専門店が路地に密集しています。",
        },
        {
          heading: "時間帯とタイミング",
          body: "朝7時〜9時は地元住民の参拝で賑わい、寺院に花や線香を捧げる光景が見られます。観光客が増えるのは10時以降。夕方16時〜18時も穏やかな光の中で寺院が美しく映えます。雨季（6〜9月）は午後にスコールがありますが、雨上がりの濡れた石畳は雰囲気があります。ベストシーズンは10月〜11月と3月〜4月。",
        },
        {
          heading: "実用情報",
          body: "広場の石畳は雨の日に滑りやすいので注意。寺院の多くはヒンドゥー教徒以外の内部立ち入りが制限されていますが、外観は自由に見学できます。ガイドを雇う場合は広場入口に公認ガイドがいます（1,500〜3,000ルピー/2時間）。現金払いが基本で、ATMはタメル方面に複数あります。靴を脱いで入る寺院があるので、脱ぎ履きしやすい靴がおすすめ。",
        },
      ],
      [
        { q: "ダルバール広場の入場料はいくらですか？", a: "外国人1,000ルピー（約8ドル）。パスポート提示が必要です。長期滞在の場合は無料で複数日パスに延長できます。" },
        { q: "地震の被害はまだ残っていますか？", a: "主要な寺院の多くは再建済みまたは修復中です。一部の建物には足場が残っていますが、広場全体は見学可能です。" },
        { q: "クマリに会えますか？", a: "クマリの館の中庭から窓を見上げると、クマリが姿を見せることがあります。時間は不定期で、写真撮影は厳禁です。" },
      ],
    ),
    en: en(NP_EN_CTA,
      "Kathmandu Durbar Square Walk — Pagoda Temples and the Living Goddess",
      "A walking guide to Kathmandu Durbar Square covering Kasthamandap, Kumari Ghar, Taleju Temple, Hanuman Dhoka, and the Ason market, with notes on post-2015 earthquake restoration.",
      KATHMANDU_DURBAR_IMAGES[0],
      KATHMANDU_DURBAR_IMAGES,
      KATHMANDU_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Kathmandu Durbar Square is a UNESCO World Heritage Site and the historic heart of the Kathmandu Valley's Newar civilisation. Pagoda-roofed temples, the old royal palace, and the house of the Kumari (living goddess) are packed into a compact square that has served as the city's ceremonial centre for centuries. The 2015 earthquake caused significant damage, but restoration is well advanced and most major structures are accessible. Walking northeast from the square leads to Ason, the city's busiest traditional market street, where spice vendors, metalworkers, and vegetable sellers occupy the same narrow lanes they have for generations.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Tribhuvan International Airport to Durbar Square is about 30 minutes by taxi (500–800 rupees). From the Thamel tourist district, it's a 20 to 25-minute walk to the square's northwest entrance. Admission for foreign visitors is 1,000 rupees (about 8 USD) — bring your passport. The ticket is valid for one day but can be extended free of charge for multi-day stays.",
        },
        {
          heading: "Key Stops",
          body: "Kasthamandap is the wooden pavilion that gave Kathmandu its name — rebuilt after the earthquake and now open again. Kumari Ghar houses the Royal Kumari behind intricately carved wooden windows; if she appears at the window (timing is unpredictable), photography is strictly forbidden. Taleju Temple is the tallest structure in the square at 36 metres. Hanuman Dhoka, the old royal palace, is now a museum covering the monarchy's history. From the square, walk to Ason market for a dense, sensory immersion in spice shops, brass vendors, and vegetable stalls.",
        },
        {
          heading: "Best Time and Season",
          body: "7 to 9 am is when locals come to pray, offering flowers and incense at the temple platforms — the most atmospheric window. Tourist crowds arrive after 10 am. Late afternoon (4 to 6 pm) light is soft and flattering on the temple brickwork. The monsoon (June to September) brings afternoon downpours; wet flagstones are photogenic but slippery. October to November and March to April are the best seasons for clear skies.",
        },
        {
          heading: "Practical Tips",
          body: "The stone paving is slippery in rain — watch your footing. Many temples restrict interior access to Hindus only, but exterior viewing and photography are unrestricted. Licensed guides are available at the square entrance (1,500–3,000 rupees for a 2-hour tour). Cash is the main payment method; ATMs are available toward Thamel. Some temples require removing shoes, so wear slip-on footwear for convenience.",
        },
      ],
      [
        { q: "How much is the Durbar Square entry fee?", a: "1,000 rupees (about 8 USD) for foreign visitors. Passport required. Multi-day extensions are free on request." },
        { q: "Is earthquake damage still visible?", a: "Most major temples are restored or under active restoration. Some scaffolding remains, but the square is fully open to visitors." },
        { q: "Can I see the Kumari?", a: "She sometimes appears at the window of Kumari Ghar, but the timing is unpredictable. Photography is strictly prohibited when she does." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 14. Kathmandu — Thamel Walk
  // ────────────────────────────────────────────────────────────────
  "kathmandu-thamel-walk": {
    ja: ja(NP_JA_CTA,
      "カトマンズ・タメル地区のバックパッカー通り散歩 — トレッキング準備と異文化体験",
      "カトマンズ・タメル地区のトレッキングショップ、カフェ、ドリームガーデン、スワヤンブナート遠望を楽しむ散歩ガイド。バックパッカー文化の中心地の歩き方。",
      KATHMANDU_THAMEL_IMAGES[0],
      KATHMANDU_THAMEL_IMAGES,
      KATHMANDU_X,
      [
        {
          heading: "このルートの特徴",
          body: "タメルはカトマンズのツーリスト地区で、1960年代のヒッピートレイル以来、世界中の旅行者が集まるバックパッカー文化の中心地です。狭い通りにトレッキング用品店、書店、レストラン、ライブミュージックバーがひしめき、ネパール語、英語、日本語、韓国語の看板が混在しています。タメル・チョーク（中心交差点）を起点に、カフェでダルバート（ネパール定食）を食べ、トレッキングギアを物色し、ドリームガーデンで一息つくのが定番の過ごし方です。",
        },
        {
          heading: "アクセスと起点",
          body: "空港からタメルまでタクシーで約25分（500〜700ルピー）。カトマンズ市内のほとんどのホテルがタメル地区またはその周辺にあるため、徒歩でアクセスできる場合がほとんど。タメル・チョークを起点に、北のカルダラ方面と南のダルバール広場方面の2方向に歩けます。",
        },
        {
          heading: "主要スポット",
          body: "タメル・チョークはタメルの中心で、ここから放射状に商店街が広がります。トレッキング用品店はダウンジャケットからトレッキングポールまで何でも揃い、レンタルも可能（値引き交渉はほぼ必須）。ドリームガーデン（夢の庭園）はタメルの喧騒から逃れられるネオクラシカル様式の庭園で、入場料200ルピー。タメルの高い場所からは西の丘にスワヤンブナート（モンキーテンプル）のストゥーパが遠望できます。ピルグリムス書店は古本と地図の老舗です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "トレッキングショップは9時〜20時頃営業。朝は比較的静かで、カフェでゆっくり朝食をとれます。夕方以降はレストランやバーが活気づきます。トレッキングシーズン（10〜11月、3〜4月）はタメルが最も賑わい、ギア店の品揃えも豊富。雨季のオフシーズンは値引きが効きやすいです。",
        },
        {
          heading: "実用情報",
          body: "タメルは観光地価格の店と地元向けの店が混在しています。トレッキングギアは複数店舗で比較するのがコツ。食事は300〜1,000ルピー程度。通りが狭くバイクも通るため、歩行時は注意が必要。SIMカードはタメルの通信ショップで購入可能（パスポート必要、500〜1,000ルピー）。両替所も多数ありますが、レートを比較してから交換しましょう。",
        },
      ],
      [
        { q: "タメルでトレッキング装備をレンタルできますか？", a: "はい、ダウンジャケット、寝袋、トレッキングポールなどのレンタルが可能です。1日50〜200ルピー程度で、デポジットが必要です。" },
        { q: "タメルからスワヤンブナートへの行き方は？", a: "徒歩で約30分。タクシーまたはトゥクトゥクなら10分程度（200〜300ルピー）です。" },
        { q: "タメルの治安は大丈夫ですか？", a: "昼間は安全ですが、夜間の暗い路地は避けましょう。スリやぼったくりに注意し、値段は事前に確認する習慣をつけてください。" },
      ],
    ),
    en: en(NP_EN_CTA,
      "Kathmandu Thamel Walk — The Backpacker District and Trekking Gear Strip",
      "A walking guide to Kathmandu's Thamel district covering trekking shops, cafes, the Garden of Dreams, and views of Swayambhunath, with tips on bargaining and navigating the narrow streets.",
      KATHMANDU_THAMEL_IMAGES[0],
      KATHMANDU_THAMEL_IMAGES,
      KATHMANDU_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Thamel has been the gravitational centre of Kathmandu's backpacker and trekker scene since the hippie trail days of the 1960s. Narrow streets packed with trekking gear shops, bookstores, restaurants, and live music bars create a dense, energetic atmosphere that's unlike anywhere else in Nepal. Signs in Nepali, English, Japanese, and Korean reflect the international mix. The appeal is not any single landmark but the aggregate experience — browsing gear for an Annapurna trek, eating dal bhat at a rooftop cafe, and retreating to the Garden of Dreams when the noise gets to you.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Airport to Thamel is about 25 minutes by taxi (500–700 rupees). Most Kathmandu hotels are in or near Thamel, making it walkable from wherever you're staying. Thamel Chowk, the central crossroads, is the natural starting point — from there you can head north toward Kaldhara or south toward Durbar Square.",
        },
        {
          heading: "Key Stops",
          body: "Thamel Chowk is the district's central intersection, with shops radiating in every direction. Trekking gear stores stock everything from down jackets to trekking poles — rental is common and bargaining is expected. The Garden of Dreams is a restored Edwardian garden offering a quiet counterpoint to Thamel's chaos (admission 200 rupees). From elevated points in Thamel, Swayambhunath stupa (the Monkey Temple) is visible on the western hillside. Pilgrims Bookhouse is a long-established source of secondhand books and trekking maps.",
        },
        {
          heading: "Best Time and Season",
          body: "Trekking shops open around 9 am and stay open until 8 pm or later. Mornings are calmer — good for a slow cafe breakfast. Evenings are when the restaurants and bars come alive. Peak trekking seasons (October to November, March to April) bring the most activity and the fullest stock in gear shops. Off-season (monsoon months) means better bargaining leverage.",
        },
        {
          heading: "Practical Tips",
          body: "Thamel mixes tourist-priced and local-priced shops — compare gear across several stores before buying or renting. Meals cost 300 to 1,000 rupees. Streets are narrow and shared with motorbikes, so stay alert. SIM cards can be bought at communication shops in Thamel (passport required, 500–1,000 rupees). Exchange offices are plentiful but compare rates before changing money.",
        },
      ],
      [
        { q: "Can I rent trekking gear in Thamel?", a: "Yes — down jackets, sleeping bags, trekking poles, and more. Daily rental is typically 50 to 200 rupees with a deposit." },
        { q: "How do I get to Swayambhunath from Thamel?", a: "About 30 minutes on foot, or 10 minutes by taxi or tuk-tuk (200–300 rupees)." },
        { q: "Is Thamel safe?", a: "Daytime is generally safe. Avoid dark side streets at night. Watch for pickpockets and always confirm prices before committing to a purchase." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 15. Chengdu — Jinli Street Walk
  // ────────────────────────────────────────────────────────────────
  "chengdu-jinli-street-walk": {
    ja: ja(CN_JA_CTA,
      "成都・錦里古街と武侯祠の歴史散歩 — 三国志の聖地と蜀の味覚",
      "成都の錦里古街と武侯祠（三国志・諸葛亮の祠堂）を巡る街歩きガイド。担々麺、兔頭、川劇の変面ショーなど四川文化を体験するルート。",
      CHENGDU_JINLI_IMAGES[0],
      CHENGDU_JINLI_IMAGES,
      CHENGDU_X,
      [
        {
          heading: "このルートの特徴",
          body: "錦里古街は成都を代表する歴史街区で、蜀（三国時代の劉備の国）の市場を再現した約350メートルの通りです。提灯に照らされた木造の商家が並び、四川スナック、茶館、土産物店、川劇（四川オペラ）のパフォーマンスが楽しめます。隣接する武侯祠は三国志の名軍師・諸葛亮（孔明）と蜀漢の初代皇帝・劉備を祀る中国唯一の君臣合祀の祠堂で、三国志ファンの聖地です。歴史と食と文化を一度に堪能できるルートです。",
        },
        {
          heading: "アクセスと起点",
          body: "地下鉄3号線の高升橋駅から徒歩10分。成都双流国際空港からは地下鉄10号線で乗り換え1回、約50分。武侯祠の正門から入場し、祠堂を見学した後、南側の出口から錦里古街に入るルートが自然な流れです。",
        },
        {
          heading: "主要スポット",
          body: "武侯祠は入場料50元で、劉備殿、諸葛亮殿、惠陵（劉備の墓）が主要な見どころ。武侯祠と錦里をつなぐ赤壁と竹林の小道は成都で最も人気のフォトスポットのひとつです。錦里古街では担々麺（タンタンメン）、三大砲（餅菓子）、兔頭（ウサギの頭の煮込み、四川名物）などのスナックが屋台で楽しめます。茶館では成都伝統のカバー付き蓋碗茶を体験でき、夜は川劇の変面（ビェンリェン）ショーが上演されます。",
        },
        {
          heading: "時間帯とタイミング",
          body: "武侯祠は8時〜18時（季節変動あり）。錦里古街は終日営業ですが、提灯が灯る夕方〜夜（18時以降）が最も雰囲気があります。変面ショーは夜の部が人気。週末は非常に混雑するため、平日の訪問がおすすめ。春（3〜5月）と秋（9〜11月）が気温的にベスト。",
        },
        {
          heading: "実用情報",
          body: "錦里古街は入場無料で、屋台の食べ歩きは5〜20元程度。WeChat Pay・Alipayが主流ですが、屋台では現金も使えます。成都は内陸の盆地気候で夏は蒸し暑く、冬は曇天が多いです。辛い料理が苦手な方は「不辣（ブーラー）」と伝えれば辛さ控えめにしてもらえますが、四川料理の基本は唐辛子と花椒なので完全に辛くない料理は少ないです。",
        },
      ],
      [
        { q: "武侯祠と錦里はセットで見学すべきですか？", a: "はい、隣接しているため武侯祠→錦里の順で半日コースとして組むのが効率的です。" },
        { q: "変面ショーはどこで見られますか？", a: "錦里古街内の小劇場で毎晩上演されています。入場料は50〜150元程度。成都市内の他の劇場でも鑑賞可能です。" },
        { q: "錦里の食べ歩きでおすすめは？", a: "担々麺、三大砲（きなこ餅）、鐘水餃（水餃子）、そしてチャレンジ精神があれば兔頭（ウサギの頭）がおすすめです。" },
        { q: "成都でVPNは必要ですか？", a: "はい、中国全土でGoogle・LINE・Instagram等は規制されています。VPN対応eSIMを事前に準備してください。" },
      ],
    ),
    en: en(CN_EN_CTA,
      "Chengdu Jinli Street and Wuhou Shrine Walk — Three Kingdoms History and Sichuan Flavours",
      "A walking guide to Chengdu's Jinli Ancient Street and Wuhou Shrine (Marquis Wu Memorial Temple), covering Three Kingdoms history, Sichuan street food, teahouse culture, and Sichuan Opera face-changing performances.",
      CHENGDU_JINLI_IMAGES[0],
      CHENGDU_JINLI_IMAGES,
      CHENGDU_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Jinli Ancient Street is Chengdu's most visited heritage street — a 350-metre lane of lantern-lit timber-fronted shops recreating the atmosphere of a marketplace from the Shu kingdom (the state founded by Liu Bei during the Three Kingdoms era). Adjacent Wuhou Shrine is China's only memorial temple that honours both a ruler (Liu Bei) and his minister (Zhuge Liang, the legendary military strategist of Romance of the Three Kingdoms). Together they offer a compact loop through history, food, and living culture. The red-wall bamboo corridor connecting the two has become one of Chengdu's signature photo spots.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Metro Line 3 to Gaoshengqiao station is a 10-minute walk. From Chengdu Shuangliu International Airport, take Metro Line 10 with one transfer — about 50 minutes total. The natural route enters through Wuhou Shrine's main gate, walks through the memorial halls, and exits through the south gate directly into Jinli Street.",
        },
        {
          heading: "Key Stops",
          body: "Wuhou Shrine (admission 50 yuan) contains the Liu Bei Hall, Zhuge Liang Hall, and Huiling (Liu Bei's tomb). The red wall and bamboo path between the shrine and Jinli is one of Chengdu's most photographed spots. Jinli Street's food stalls serve dan dan noodles, san da pao (glutinous rice cakes), and rabbit head (a Sichuan specialty for the adventurous). Traditional teahouses serve lidded-bowl tea in the Chengdu style. In the evening, Sichuan Opera face-changing (bian lian) performances are staged in a small theatre on the street.",
        },
        {
          heading: "Best Time and Season",
          body: "Wuhou Shrine opens 8 am to 6 pm (hours vary by season). Jinli Street operates all day but is most atmospheric after 6 pm when the lanterns come on. Face-changing shows run in the evening. Weekends are very crowded; weekday visits are recommended. Spring (March to May) and autumn (September to November) offer the most comfortable temperatures.",
        },
        {
          heading: "Practical Tips",
          body: "Jinli Street is free to enter. Street food costs 5 to 20 yuan per item. WeChat Pay and Alipay dominate, but cash works at most stalls. Chengdu's inland basin climate means hot, humid summers and grey, damp winters. If you have low spice tolerance, say 'bu la' (not spicy) — but Sichuan cuisine is built on chilli and Sichuan pepper, so completely mild dishes are limited. As in all of China, Google, LINE, and Instagram are blocked — arrange a VPN-capable eSIM before arrival.",
        },
      ],
      [
        { q: "Should I visit Wuhou Shrine and Jinli together?", a: "Yes — they're adjacent and work best as a combined half-day itinerary, starting with the shrine and finishing with Jinli's food stalls." },
        { q: "Where can I see a face-changing show?", a: "A small theatre on Jinli Street stages nightly performances (50–150 yuan admission). Other venues around Chengdu also offer shows." },
        { q: "What street food should I try on Jinli?", a: "Dan dan noodles, san da pao (glutinous rice cakes), zhong shui jiao (dumplings), and — if you're feeling adventurous — rabbit head." },
        { q: "Do I need a VPN in Chengdu?", a: "Yes, all of China blocks Google, LINE, Instagram, and most Western platforms. Prepare a VPN-capable eSIM before your trip." },
      ],
    ),
  },
};

export const ASIA_3_GUIDE_SLUGS = Object.keys(ASIA_3_GUIDE_CONTENT);
