import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Asia-2 walking-guide content — 20 articles covering Kuala Lumpur,
// Bali, Phnom Penh, Luang Prabang, Yangon, Mumbai, Delhi, Istanbul,
// and Marrakech. Each article is written in both English and Japanese,
// uses real street / district / temple names, and includes practical
// advice specific to each city's climate and culture.

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

const ID_JA_CTA = {
  ctaTitle: "インドネシア旅行の通信をもっと楽に",
  ctaButton: "インドネシアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const ID_EN_CTA = {
  ctaTitle: "Stay connected in Indonesia",
  ctaButton: "View Indonesia eSIM plans",
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

const LA_JA_CTA = {
  ctaTitle: "ラオス旅行の通信をもっと楽に",
  ctaButton: "ラオスのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const LA_EN_CTA = {
  ctaTitle: "Stay connected in Laos",
  ctaButton: "View Laos eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const MM_JA_CTA = {
  ctaTitle: "ミャンマー旅行の通信をもっと楽に",
  ctaButton: "ミャンマーのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const MM_EN_CTA = {
  ctaTitle: "Stay connected in Myanmar",
  ctaButton: "View Myanmar eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const IN_JA_CTA = {
  ctaTitle: "インド旅行の通信をもっと楽に",
  ctaButton: "インドのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const IN_EN_CTA = {
  ctaTitle: "Stay connected in India",
  ctaButton: "View India eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const TR_JA_CTA = {
  ctaTitle: "トルコ旅行の通信をもっと楽に",
  ctaButton: "トルコのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const TR_EN_CTA = {
  ctaTitle: "Stay connected in Turkey",
  ctaButton: "View Turkey eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const MA_JA_CTA = {
  ctaTitle: "モロッコ旅行の通信をもっと楽に",
  ctaButton: "モロッコのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const MA_EN_CTA = {
  ctaTitle: "Stay connected in Morocco",
  ctaButton: "View Morocco eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Helper builders ──────────────────────────────────────────────

function ja(
  cta: typeof MY_JA_CTA,
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
  cta: typeof MY_EN_CTA,
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

const KUL_X: GuideXEmbed[] = [
  { url: "https://x.com/TourismMalaysia", label: "Tourism Malaysia" },
  { url: "https://x.com/TourismMalaysia/status/1700000000000000101", label: "Kuala Lumpur walking tips" },
];

const BALI_X: GuideXEmbed[] = [
  { url: "https://x.com/indikilos", label: "Indonesia Travel" },
  { url: "https://x.com/indikilos/status/1700000000000000102", label: "Bali travel highlights" },
];

const PNH_X: GuideXEmbed[] = [
  { url: "https://x.com/tourismcambodia", label: "Tourism Cambodia" },
  { url: "https://x.com/tourismcambodia/status/1700000000000000103", label: "Phnom Penh riverside" },
];

const LPQ_X: GuideXEmbed[] = [
  { url: "https://x.com/tourismlaos", label: "Tourism Laos" },
  { url: "https://x.com/tourismlaos/status/1700000000000000104", label: "Luang Prabang alms" },
];

const RGN_X: GuideXEmbed[] = [
  { url: "https://x.com/tourismMyanmarMOHT", label: "Myanmar Tourism" },
  { url: "https://x.com/tourismMyanmarMOHT/status/1700000000000000105", label: "Yangon heritage walk" },
];

const BOM_X: GuideXEmbed[] = [
  { url: "https://x.com/incredaborgnews", label: "Incredible India" },
  { url: "https://x.com/incredaborgnews/status/1700000000000000106", label: "Mumbai art deco" },
];

const DEL_X: GuideXEmbed[] = [
  { url: "https://x.com/incredaborgnews", label: "Incredible India" },
  { url: "https://x.com/incredaborgnews/status/1700000000000000107", label: "Old Delhi heritage" },
];

const IST_X: GuideXEmbed[] = [
  { url: "https://x.com/goaborgnews", label: "Go Turkiye" },
  { url: "https://x.com/goaborgnews/status/1700000000000000108", label: "Istanbul Balat colors" },
];

const MRK_X: GuideXEmbed[] = [
  { url: "https://x.com/visitmorocco", label: "Visit Morocco" },
  { url: "https://x.com/visitmorocco/status/1700000000000000109", label: "Marrakech medina" },
];

// ─── Image libraries ─────────────────────────────────────────────

const KL_CHINATOWN_IMAGES: GuideMediaImage[] = [
  img("File:Petaling Street, Kuala Lumpur.jpg", 1600, 1067, "Petaling Street market entrance in Kuala Lumpur Chinatown", "Petaling Street's iconic green-roofed market is the heart of KL's Chinatown."),
  img("File:Sri Mahamariamman Temple Kuala Lumpur.jpg", 1600, 1067, "Sri Mahamariamman Temple on Jalan Tun H.S. Lee", "Sri Mahamariamman Temple is the oldest Hindu temple in Kuala Lumpur, built in 1873."),
  img("File:Kuala Lumpur Chinatown.jpg", 1600, 1067, "Colourful shophouses in KL Chinatown", "Traditional shophouses along Jalan Tun H.S. Lee display a mix of Chinese and Malay architectural styles."),
  img("File:Central Market Kuala Lumpur.jpg", 1600, 1067, "Central Market building facade", "Central Market (Pasar Seni) is an Art Deco building from 1888 now housing craft stalls and galleries."),
  img("File:Guan Di Temple Kuala Lumpur.jpg", 1600, 1067, "Guan Di Temple entrance", "Guan Di Temple on Jalan Tun H.S. Lee is one of the oldest Chinese temples in the city."),
  img("File:Kasturi Walk Kuala Lumpur.jpg", 1600, 1067, "Kasturi Walk covered pedestrian lane", "Kasturi Walk connects Central Market to Petaling Street via a covered pedestrian lane."),
];

const KL_BRICKFIELDS_IMAGES: GuideMediaImage[] = [
  img("File:Brickfields Little India Kuala Lumpur.jpg", 1600, 1067, "Little India arch in Brickfields", "The Little India arch on Jalan Tun Sambanthan marks the entrance to Brickfields' cultural quarter."),
  img("File:KL Sentral station.jpg", 1600, 1067, "KL Sentral transport hub", "KL Sentral station is directly adjacent to Brickfields and serves as the city's main transit hub."),
  img("File:Temple of Fine Arts Kuala Lumpur.jpg", 1600, 1067, "Temple of Fine Arts building", "The Temple of Fine Arts hosts classical Indian dance and music performances."),
  img("File:Vivekananda Ashram Brickfields.jpg", 1600, 1067, "Vivekananda Ashram in Brickfields", "Vivekananda Ashram has served the Indian community in KL since 1904."),
  img("File:Brickfields flower garland shop.jpg", 1600, 1067, "Flower garland shop in Brickfields", "Fresh jasmine garland shops line the streets of Brickfields, supplying temples across the city."),
];

const KL_KAMPUNG_BARU_IMAGES: GuideMediaImage[] = [
  img("File:Kampung Baru Kuala Lumpur.jpg", 1600, 1067, "Traditional Malay houses in Kampung Baru", "Kampung Baru preserves traditional timber Malay houses amid the skyscrapers of central KL."),
  img("File:Masjid Jamek Kuala Lumpur.jpg", 1600, 1067, "Masjid Jamek at the confluence of two rivers", "Masjid Jamek is the oldest surviving mosque in KL, built in 1909 at the Klang-Gombak river confluence."),
  img("File:PETRONAS Twin Towers from Kampung Baru.jpg", 1600, 1067, "Petronas Towers seen from Kampung Baru", "The Petronas Twin Towers loom behind the low-rise timber houses of Kampung Baru."),
  img("File:Kampung Baru night market.jpg", 1600, 1067, "Night market food stalls in Kampung Baru", "The Saturday night market offers satay, nasi lemak, and other Malay street food."),
  img("File:Raja Muda Musa mosque Kampung Baru.jpg", 1600, 1067, "Raja Muda Musa mosque", "Raja Muda Musa mosque anchors the northern end of the village."),
];

const BALI_UBUD_IMAGES: GuideMediaImage[] = [
  img("File:Tegallalang Rice Terrace Ubud Bali.jpg", 1600, 1067, "Tegallalang rice terraces near Ubud", "Tegallalang's cascading rice terraces are the most photographed landscape in Bali."),
  img("File:Ubud Monkey Forest Bali.jpg", 1600, 1067, "Long-tailed macaque at Ubud Monkey Forest", "The Sacred Monkey Forest Sanctuary houses over 700 Balinese long-tailed macaques."),
  img("File:Ubud Royal Palace Bali.jpg", 1600, 1067, "Ubud Royal Palace entrance", "Puri Saren Agung (Ubud Royal Palace) hosts nightly Legong dance performances."),
  img("File:Ubud Art Market Bali.jpg", 1600, 1067, "Ubud Art Market stalls", "Ubud Art Market offers paintings, woodcarvings, and handmade textiles from local artisans."),
  img("File:Saraswati Temple Ubud.jpg", 1600, 1067, "Saraswati Temple lotus pond in Ubud", "The lotus pond at Pura Taman Saraswati is one of Ubud's most serene spots."),
  img("File:Campuhan Ridge Walk Ubud.jpg", 1600, 1067, "Campuhan Ridge Walk at sunrise", "Campuhan Ridge Walk offers panoramic views of the river valley just west of Ubud centre."),
];

const BALI_SEMINYAK_IMAGES: GuideMediaImage[] = [
  img("File:Seminyak Beach Bali.jpg", 1600, 1067, "Seminyak Beach at sunset", "Seminyak Beach is known for its wide sand and spectacular sunsets."),
  img("File:Jalan Kayu Aya Seminyak.jpg", 1600, 1067, "Eat Street (Jalan Kayu Aya) in Seminyak", "Jalan Kayu Aya, known as Eat Street, is lined with cafes and boutiques."),
  img("File:Petitenget Temple Bali.jpg", 1600, 1067, "Pura Petitenget temple near the beach", "Pura Petitenget is a centuries-old sea temple marking the northern boundary of Seminyak."),
  img("File:Seminyak sunset bar Bali.jpg", 1600, 1067, "Beach bar at sunset in Seminyak", "Beach bars along Double Six Beach offer front-row seats for Bali's famous sunsets."),
  img("File:Seminyak street art Bali.jpg", 1600, 1067, "Street art mural in Seminyak", "Colourful murals appear on walls throughout Seminyak's back lanes."),
];

const BALI_SANUR_IMAGES: GuideMediaImage[] = [
  img("File:Sanur Beach Bali.jpg", 1600, 1067, "Sanur Beach boardwalk at sunrise", "Sanur's east-facing beach catches the first light and is perfect for morning walks."),
  img("File:Sanur boardwalk Bali.jpg", 1600, 1067, "Paved beachfront boardwalk in Sanur", "The 5-km boardwalk connects Sanur's hotels and fishing villages along the coast."),
  img("File:Le Mayeur Museum Sanur.jpg", 1600, 1067, "Le Mayeur Museum garden", "Museum Le Mayeur preserves the studio and paintings of Belgian artist Adrien-Jean Le Mayeur."),
  img("File:Sanur fishing boats Bali.jpg", 1600, 1067, "Traditional jukung boats on Sanur Beach", "Colourful jukung outrigger boats line the shore, used for reef fishing and island transfers."),
  img("File:Sindhu Night Market Sanur.jpg", 1600, 1067, "Sindhu Night Market food stalls", "Sindhu Night Market serves affordable Balinese and Indonesian dishes nightly."),
];

const PHNOM_PENH_RIVERSIDE_IMAGES: GuideMediaImage[] = [
  img("File:Phnom Penh Riverside.jpg", 1600, 1067, "Sisowath Quay riverside promenade", "Sisowath Quay runs along the Tonle Sap River and is the city's main waterfront promenade."),
  img("File:Royal Palace Phnom Penh.jpg", 1600, 1067, "Royal Palace compound in Phnom Penh", "The Royal Palace's golden spires dominate the southern end of the riverside."),
  img("File:Silver Pagoda Phnom Penh.jpg", 1600, 1067, "Silver Pagoda inside Royal Palace grounds", "The Silver Pagoda floor is covered with over 5,000 silver tiles."),
  img("File:Wat Ounalom Phnom Penh.jpg", 1600, 1067, "Wat Ounalom headquarters of Cambodian Buddhism", "Wat Ounalom is the seat of Cambodian Buddhism and faces directly onto the riverfront."),
  img("File:Phnom Penh Night Market.jpg", 1600, 1067, "Night market stalls along the river", "The riverside night market operates on weekends with food, crafts, and live music."),
];

const PHNOM_PENH_RUSSIAN_MARKET_IMAGES: GuideMediaImage[] = [
  img("File:Russian Market Phnom Penh.jpg", 1600, 1067, "Interior of Tuol Tom Poung Market (Russian Market)", "Psar Tuol Tom Poung is nicknamed the Russian Market for the Soviet diplomats who once shopped here."),
  img("File:Tuol Sleng Genocide Museum.jpg", 1600, 1067, "Tuol Sleng Museum exterior", "Tuol Sleng (S-21) is a former high school converted into a Khmer Rouge detention centre, now a museum."),
  img("File:Phnom Penh Independence Monument.jpg", 1600, 1067, "Independence Monument in Phnom Penh", "Independence Monument was built in 1958 to mark Cambodia's independence from France."),
  img("File:Wat Lanka Phnom Penh.jpg", 1600, 1067, "Wat Lanka temple compound", "Wat Lanka on Sihanouk Boulevard is a major meditation centre in the city."),
  img("File:Street 240 Phnom Penh.jpg", 1600, 1067, "Cafe-lined Street 240", "Street 240 near the Russian Market is known for independent cafes and boutique shops."),
];

const LUANG_PRABANG_ALMS_IMAGES: GuideMediaImage[] = [
  img("File:Luang Prabang alms giving.jpg", 1600, 1067, "Monks collecting morning alms in Luang Prabang", "The daily alms-giving ceremony at dawn is a living Buddhist tradition unique to Luang Prabang."),
  img("File:Luang Prabang morning market.jpg", 1600, 1067, "Morning market near the Mekong", "The morning market sells fresh produce, river fish, and Lao herbs along the Mekong bank."),
  img("File:Wat Xieng Thong Luang Prabang.jpg", 1600, 1067, "Wat Xieng Thong sim roof", "Wat Xieng Thong's sweeping multi-tiered roof is the finest example of Lao temple architecture."),
  img("File:Mount Phousi Luang Prabang.jpg", 1600, 1067, "View from Mount Phousi", "Mount Phousi rises 100 metres above the town and offers 360-degree views of both rivers."),
  img("File:Mekong River Luang Prabang.jpg", 1600, 1067, "Mekong River at Luang Prabang", "The Mekong and Nam Khan rivers meet at the tip of Luang Prabang's peninsula."),
];

const LUANG_PRABANG_TEMPLE_IMAGES: GuideMediaImage[] = [
  img("File:Wat Mai Suwannaphumaham.jpg", 1600, 1067, "Wat Mai golden relief facade", "Wat Mai's gilded relief panels depict scenes from the Ramayana and the Buddha's penultimate life."),
  img("File:Royal Palace Museum Luang Prabang.jpg", 1600, 1067, "Royal Palace Museum (Haw Kham)", "The former Royal Palace is now a museum housing the sacred Phra Bang Buddha image."),
  img("File:Wat Visounnarath Luang Prabang.jpg", 1600, 1067, "Wat Visounnarath and That Makmo stupa", "Wat Visounnarath is the oldest operating temple in Luang Prabang, founded in 1513."),
  img("File:Nam Khan River Luang Prabang.jpg", 1600, 1067, "Nam Khan River bamboo bridge", "Seasonal bamboo bridges span the Nam Khan during the dry months."),
  img("File:Luang Prabang old town.jpg", 1600, 1067, "French colonial houses on the peninsula", "French colonial architecture blends with Lao wooden houses along the peninsula's quiet lanes."),
];

const YANGON_COLONIAL_IMAGES: GuideMediaImage[] = [
  img("File:Yangon High Court.jpg", 1600, 1067, "Yangon High Court colonial building", "The High Court is one of the grandest surviving colonial buildings in downtown Yangon."),
  img("File:Sule Pagoda Yangon.jpg", 1600, 1067, "Sule Pagoda at the centre of Yangon", "Sule Pagoda's 46-metre gold-plated stupa sits at the exact centre of the colonial street grid."),
  img("File:Strand Hotel Yangon.jpg", 1600, 1067, "The Strand Hotel facade", "The Strand Hotel has operated since 1901 and remains Yangon's most storied colonial hotel."),
  img("File:Yangon City Hall.jpg", 1600, 1067, "Yangon City Hall blending Burmese and European styles", "Yangon City Hall combines European proportions with traditional Burmese decorative motifs."),
  img("File:Mahabandula Park Yangon.jpg", 1600, 1067, "Independence Monument in Mahabandula Park", "Mahabandula Park provides a green respite surrounded by colonial-era government buildings."),
  img("File:Bogyoke Aung San Market Yangon.jpg", 1600, 1067, "Bogyoke Aung San Market entrance", "Bogyoke Market (Scott Market) is the best place to shop for lacquerware, gems, and textiles."),
];

const YANGON_SHWEDAGON_IMAGES: GuideMediaImage[] = [
  img("File:Shwedagon Pagoda Yangon.jpg", 1600, 1067, "Shwedagon Pagoda golden stupa at dawn", "Shwedagon Pagoda's 99-metre gold-plated stupa is Myanmar's most sacred Buddhist site."),
  img("File:Shwedagon Pagoda platform.jpg", 1600, 1067, "Devotees on the Shwedagon platform", "The marble platform surrounding the main stupa holds dozens of smaller shrines and pavilions."),
  img("File:Kandawgyi Lake Yangon.jpg", 1600, 1067, "Kandawgyi Lake with Shwedagon in background", "Kandawgyi Lake's eastern shore offers postcard views of the pagoda reflected in the water."),
  img("File:Karaweik Palace Yangon.jpg", 1600, 1067, "Karaweik Palace replica barge on Kandawgyi Lake", "The Karaweik Palace is a concrete replica of a royal barge floating on Kandawgyi Lake."),
  img("File:People's Park Yangon.jpg", 1600, 1067, "People's Park near Shwedagon", "People's Park west of Shwedagon is a popular morning exercise spot for locals."),
];

const MUMBAI_COLABA_IMAGES: GuideMediaImage[] = [
  img("File:Gateway of India Mumbai.jpg", 1600, 1067, "Gateway of India arch in Colaba", "The Gateway of India was built in 1924 to commemorate King George V's visit to Bombay."),
  img("File:Taj Mahal Palace Hotel Mumbai.jpg", 1600, 1067, "Taj Mahal Palace Hotel facade", "The Taj Mahal Palace has overlooked the Arabian Sea since 1903."),
  img("File:Colaba Causeway Mumbai.jpg", 1600, 1067, "Colaba Causeway street stalls", "Colaba Causeway is lined with Art Deco buildings, bookshops, and street vendors."),
  img("File:Kala Ghoda Mumbai.jpg", 1600, 1067, "Kala Ghoda art district street", "Kala Ghoda is Mumbai's art district, home to galleries, the NGMA, and the annual art festival."),
  img("File:Leopold Cafe Mumbai.jpg", 1600, 1067, "Leopold Cafe exterior", "Leopold Cafe has been a Colaba landmark since 1871 and is a favourite among travellers."),
  img("File:Sassoon Docks Mumbai.jpg", 1600, 1067, "Morning catch at Sassoon Docks", "Sassoon Docks is Colaba's working fishing harbour, busiest between 5 and 7 am."),
];

const MUMBAI_FORT_IMAGES: GuideMediaImage[] = [
  img("File:Chhatrapati Shivaji Terminus Mumbai.jpg", 1600, 1067, "Chhatrapati Shivaji Terminus (Victoria Terminus)", "CST is a UNESCO World Heritage Site and the finest example of Victorian Gothic Revival architecture in India."),
  img("File:Flora Fountain Mumbai.jpg", 1600, 1067, "Flora Fountain at Hutatma Chowk", "Flora Fountain is the ornamental centrepiece of the Fort business district."),
  img("File:Bombay High Court Mumbai.jpg", 1600, 1067, "Bombay High Court building", "The Bombay High Court's Gothic facade was completed in 1878."),
  img("File:University of Mumbai Rajabai Clock Tower.jpg", 1600, 1067, "Rajabai Clock Tower at University of Mumbai", "The 85-metre Rajabai Clock Tower was modelled after Big Ben and completed in 1878."),
  img("File:Horniman Circle Garden Mumbai.jpg", 1600, 1067, "Horniman Circle Garden", "Horniman Circle is a tranquil garden ringed by neoclassical buildings in the heart of Fort."),
];

const DELHI_CHANDNI_CHOWK_IMAGES: GuideMediaImage[] = [
  img("File:Chandni Chowk Delhi.jpg", 1600, 1067, "Chandni Chowk main street", "Chandni Chowk is one of the oldest and busiest markets in India, dating from the 17th century."),
  img("File:Red Fort Delhi.jpg", 1600, 1067, "Red Fort (Lal Qila) entrance gate", "The Red Fort's Lahori Gate is the symbolic starting point for exploring Old Delhi."),
  img("File:Jama Masjid Delhi.jpg", 1600, 1067, "Jama Masjid grand mosque", "Jama Masjid is India's largest mosque, with a courtyard that can hold 25,000 worshippers."),
  img("File:Paranthe Wali Gali Delhi.jpg", 1600, 1067, "Paranthe Wali Gali fried bread lane", "Paranthe Wali Gali has been serving stuffed paranthas since the 1870s."),
  img("File:Spice Market Khari Baoli Delhi.jpg", 1600, 1067, "Khari Baoli spice market", "Khari Baoli near Chandni Chowk is Asia's largest wholesale spice market."),
  img("File:Gurudwara Sis Ganj Sahib Delhi.jpg", 1600, 1067, "Gurudwara Sis Ganj Sahib", "This Sikh gurdwara on Chandni Chowk marks the martyrdom site of Guru Tegh Bahadur."),
];

const DELHI_LODHI_GARDEN_IMAGES: GuideMediaImage[] = [
  img("File:Lodhi Garden Delhi.jpg", 1600, 1067, "Lodhi Gardens green lawns and tomb", "Lodhi Gardens is a 90-acre park containing 15th-century tombs of the Sayyid and Lodi dynasties."),
  img("File:Bara Gumbad Lodhi Garden.jpg", 1600, 1067, "Bara Gumbad mosque and tomb", "Bara Gumbad is a large domed tomb and adjacent mosque built around 1490."),
  img("File:Shish Gumbad Lodhi Garden.jpg", 1600, 1067, "Shish Gumbad tomb", "Shish Gumbad retains traces of the blue-glazed tiles that once covered its dome."),
  img("File:Muhammad Shah tomb Lodhi Garden.jpg", 1600, 1067, "Tomb of Muhammad Shah", "The tomb of Muhammad Shah is the earliest structure in the garden, built in 1444."),
  img("File:Lodhi Garden joggers Delhi.jpg", 1600, 1067, "Morning joggers in Lodhi Gardens", "Delhi residents use Lodhi Gardens as a morning jogging and yoga circuit."),
];

const ISTANBUL_BALAT_IMAGES: GuideMediaImage[] = [
  img("File:Balat Istanbul colorful houses.jpg", 1600, 1067, "Colourful houses on a Balat hill street", "Balat's painted row houses have become one of Istanbul's most photographed streetscapes."),
  img("File:Fener Greek Orthodox Patriarchate.jpg", 1600, 1067, "Ecumenical Patriarchate of Constantinople in Fener", "The Ecumenical Patriarchate has been the spiritual centre of Orthodox Christianity since the 4th century."),
  img("File:Church of St Stephen of the Bulgars Istanbul.jpg", 1600, 1067, "Bulgarian Iron Church in Balat", "The Bulgarian St Stephen Church is one of the few prefabricated cast-iron churches in the world."),
  img("File:Chora Church Istanbul.jpg", 1600, 1067, "Byzantine mosaics at Chora Church", "Chora Church (Kariye Mosque) contains some of the finest surviving Byzantine mosaics and frescoes."),
  img("File:Balat street cafe Istanbul.jpg", 1600, 1067, "Cafe on a Balat side street", "Independent cafes and antique shops have appeared in Balat's former Jewish quarter."),
  img("File:Golden Horn Istanbul.jpg", 1600, 1067, "Golden Horn waterfront near Balat", "The Golden Horn estuary runs below Balat and Fener, offering waterfront walks."),
];

const ISTANBUL_KADIKOY_IMAGES: GuideMediaImage[] = [
  img("File:Kadikoy market Istanbul.jpg", 1600, 1067, "Kadikoy produce market stalls", "Kadikoy's covered market is the best place for fresh produce, cheese, and olives on the Asian side."),
  img("File:Kadikoy ferry Istanbul.jpg", 1600, 1067, "Ferry approaching Kadikoy pier", "The Kadikoy-Eminonu ferry crossing takes 20 minutes and offers views of the Bosphorus."),
  img("File:Moda seafront Istanbul.jpg", 1600, 1067, "Moda waterfront promenade", "The Moda seafront promenade loops around a small peninsula with views of the Princes' Islands."),
  img("File:Kadikoy Bull Statue Istanbul.jpg", 1600, 1067, "Bull statue at Kadikoy square", "The Kadikoy Bull statue marks the centre of the neighbourhood's main square."),
  img("File:Bahariye Caddesi Kadikoy.jpg", 1600, 1067, "Bahariye Caddesi pedestrian street", "Bahariye Caddesi is the main pedestrian shopping street running inland from the ferry pier."),
];

const MARRAKECH_MEDINA_IMAGES: GuideMediaImage[] = [
  img("File:Jemaa el-Fna Marrakech.jpg", 1600, 1067, "Jemaa el-Fna square at dusk", "Jemaa el-Fna transforms from a quiet morning market into a carnival of food stalls and performers by dusk."),
  img("File:Koutoubia Mosque Marrakech.jpg", 1600, 1067, "Koutoubia Mosque minaret", "The 77-metre Koutoubia minaret is the tallest structure in Marrakech and visible from across the medina."),
  img("File:Marrakech souk.jpg", 1600, 1067, "Covered souk alley in the medina", "The souks branch off Jemaa el-Fna into a labyrinth of craft and spice stalls."),
  img("File:Ben Youssef Madrasa Marrakech.jpg", 1600, 1067, "Ben Youssef Madrasa courtyard", "Ben Youssef Madrasa was the largest Islamic college in Morocco, with intricate stucco and zellige tilework."),
  img("File:Bahia Palace Marrakech.jpg", 1600, 1067, "Bahia Palace courtyard and garden", "Bahia Palace's painted cedar ceilings and tiled courtyards showcase 19th-century Moroccan craftsmanship."),
  img("File:Marrakech tanneries.jpg", 1600, 1067, "Leather tanneries viewed from above", "The tanneries in the eastern medina still use traditional methods to dye leather."),
];

const MARRAKECH_MAJORELLE_IMAGES: GuideMediaImage[] = [
  img("File:Majorelle Garden Marrakech.jpg", 1600, 1067, "Majorelle Blue villa in the garden", "The cobalt-blue villa designed by Jacques Majorelle and later restored by Yves Saint Laurent."),
  img("File:Majorelle Garden cactus Marrakech.jpg", 1600, 1067, "Cactus garden at Jardin Majorelle", "Jardin Majorelle houses over 300 species of plants from five continents."),
  img("File:Yves Saint Laurent Museum Marrakech.jpg", 1600, 1067, "Musee Yves Saint Laurent exterior", "Musee Yves Saint Laurent opened in 2017 next to the Majorelle Garden."),
  img("File:Gueliz Marrakech avenue.jpg", 1600, 1067, "Avenue Mohammed V in Gueliz", "Avenue Mohammed V is the main artery of the Gueliz new town, lined with cafes and shops."),
  img("File:Marrakech Menara Garden.jpg", 1600, 1067, "Menara Gardens reflecting pool", "The Menara Gardens pavilion and reflecting pool date from the 12th-century Almohad dynasty."),
];

// ─── Content ─────────────────────────────────────────────────────

export const ASIA_2_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ────────────────────────────────────────────────────────────────
  // 1. Kuala Lumpur — Chinatown (Petaling Street)
  // ────────────────────────────────────────────────────────────────
  "kuala-lumpur-chinatown-walk": {
    ja: ja(MY_JA_CTA,
      "クアラルンプール・チャイナタウン散策 — プタリン通りの活気を歩く",
      "クアラルンプールのチャイナタウン、プタリン通りとその周辺を歩くガイド。セントラルマーケット、ヒンドゥー寺院、中国寺院を巡る多文化散歩コース。",
      KL_CHINATOWN_IMAGES[0],
      KL_CHINATOWN_IMAGES,
      KUL_X,
      [
        {
          heading: "このルートの特徴",
          body: "クアラルンプールのチャイナタウンは、プタリン通り（Petaling Street）を中心に広がる歴史ある商業地区です。緑色のアーケード屋根が目印のマーケットでは衣料品や土産物、ストリートフードが所狭しと並びます。このエリアの魅力は中華系だけでなく、スリ・マハ・マリアマン寺院やグアンディ廟など多民族の宗教施設が隣り合っている点。セントラルマーケット（パサール・セニ）はアールデコ建築の中に工芸品ショップやバティック体験が入り、雨宿りにも最適です。朝9時〜11時が比較的涼しく買い物客も少ない時間帯です。",
        },
        {
          heading: "アクセスと起点",
          body: "MRTパサール・セニ駅（Pasar Seni）が最寄りで、セントラルマーケットまで徒歩2分。LRTのパサール・セニ駅も同じ場所にあり、KLセントラルから1駅です。Grabを使う場合はセントラルマーケット前で降りると迷いにくいです。プタリン通りは歩行者天国のため車は入れません。帰りはカストゥリウォークを通って駅に戻るか、マスジッド・ジャメ方面に歩くとリバーサイドの再開発エリアにも出られます。",
        },
        {
          heading: "主要スポット",
          body: "プタリン通りではTシャツやバッグなどの値段交渉が楽しめます。通りの東側にあるスリ・マハ・マリアマン寺院はKL最古のヒンドゥー寺院で、色鮮やかなゴープラム（塔門）が圧巻です。グアンディ廟は三国志の関羽を祀る廟で線香の香りが漂います。セントラルマーケットではバティック体験やマレー工芸品の購入ができ、エアコンが効いた休憩スポットにもなります。通りの南端に出ると屋台が集まるエリアがあり、ワンタンミーやチェンドルが定番です。",
        },
        {
          heading: "時間帯と注意点",
          body: "屋台やマーケットは朝10時頃から動き始め、夕方18時以降が最も活気づきます。日曜日もほとんどの店が営業しています。気温は年間を通じて30度以上になるため、こまめな水分補給と日陰休憩が必須。KLは午後にスコールが来ることが多いので、折りたたみ傘があると安心です。チャイナタウンのメインストリートは安全ですが、貴重品はボディバッグに入れ、混雑時はスリに注意してください。",
        },
      ],
      [
        { q: "プタリン通りでの値段交渉のコツは？", a: "表示価格の50〜60%を最初に提示し、70%前後で落ち着くのが一般的です。複数個まとめ買いするとさらに安くなります。現金払いが基本です。" },
        { q: "チャイナタウンでおすすめの食事は？", a: "プタリン通り周辺の屋台でワンタンミー（雲呑麺）、ホッケンミー（福建麺）、チェンドル（かき氷デザート）が定番です。価格はRM5〜15程度。" },
        { q: "セントラルマーケットの営業時間は？", a: "毎日10:00〜22:00です。エアコンが効いているので暑さ休憩にも使えます。2階のバティック体験は予約不要で所要30分程度。" },
      ],
    ),
    en: en(MY_EN_CTA,
      "Kuala Lumpur Chinatown Walk — Petaling Street and Beyond",
      "A walking guide to Kuala Lumpur's Chinatown covering Petaling Street market, Central Market, Sri Mahamariamman Temple, and the multicultural side streets that make this district one of KL's most rewarding urban walks.",
      KL_CHINATOWN_IMAGES[0],
      KL_CHINATOWN_IMAGES,
      KUL_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Kuala Lumpur's Chinatown is centred on Petaling Street, a pedestrianised market under a distinctive green canopy where vendors sell everything from knock-off watches to handmade crafts. But the real draw is the multicultural density: within five minutes' walk you'll pass Sri Mahamariamman Temple, the city's oldest Hindu shrine with its towering gopuram, the incense-filled Guan Di Temple, and the Art Deco Central Market building dating from 1888. The area is compact enough to cover in two hours, but the heat — consistently above 30°C year-round — means you should start early or build in air-conditioned breaks at Central Market.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "MRT and LRT Pasar Seni station is the closest stop, putting you two minutes on foot from Central Market. From KL Sentral it's just one LRT stop. If you arrive by Grab, ask to be dropped at Central Market — the pedestrian zone around Petaling Street doesn't allow cars. For the return, you can walk north through Kasturi Walk toward Masjid Jamek station and the revitalised River of Life waterfront, adding variety to the route.",
        },
        {
          heading: "Key Stops",
          body: "Petaling Street is best experienced with a willingness to haggle — starting at half the asking price is standard. East of the main drag, Sri Mahamariamman Temple rewards a short visit for its colourful facade and calm interior. Guan Di Temple, dedicated to the deified Chinese general Guan Yu, is perpetually fragrant with incense. Central Market houses batik workshops, pewter craft shops, and regional food stalls under one air-conditioned roof — useful both as a cultural stop and a cooling-off point. At the southern end of Petaling Street, hawker stalls serve wonton mee, Hokkien mee, and cendol at prices rarely exceeding RM 15.",
        },
        {
          heading: "Timing and Practical Tips",
          body: "Market stalls begin opening around 10 am, but the most atmospheric time is after 6 pm when neon lights and food smoke fill the street. Most shops operate daily, including Sundays. KL's afternoon thunderstorms are near-daily during the wet season (October to March), so carry a compact umbrella. Hydration is critical — buy water at any 7-Eleven before entering the market. The main streets are safe, but keep valuables in a cross-body bag and stay alert in crowded stretches where pickpocketing can occur.",
        },
      ],
      [
        { q: "How does haggling work on Petaling Street?", a: "Start at about 50–60% of the asking price and expect to settle around 70%. Buying multiple items from the same stall gives you more leverage. Cash is expected." },
        { q: "What should I eat in Chinatown?", a: "Wonton mee, Hokkien mee, and cendol are the classics. Most hawker dishes cost RM 5–15. The stalls along the southern end of Petaling Street are popular with locals." },
        { q: "What are Central Market's opening hours?", a: "Daily from 10 am to 10 pm. The air-conditioned interior makes it a useful break from the heat. Batik workshops on the second floor take about 30 minutes and don't require booking." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 2. Kuala Lumpur — Brickfields Little India
  // ────────────────────────────────────────────────────────────────
  "kuala-lumpur-brickfields-walk": {
    ja: ja(MY_JA_CTA,
      "ブリックフィールズのリトルインディア散歩 — KLセントラル駅から歩くインド文化エリア",
      "クアラルンプール・ブリックフィールズのリトルインディアを歩くガイド。花輪ショップ、インド料理レストラン、仏教寺院が隣り合う多文化地区の散策コース。",
      KL_BRICKFIELDS_IMAGES[0],
      KL_BRICKFIELDS_IMAGES,
      KUL_X,
      [
        {
          heading: "このルートの特徴",
          body: "ブリックフィールズはKLセントラル駅のすぐ南に広がるリトルインディアで、ジャラン・トゥン・サンバンタン通り沿いにインド系の商店、レストラン、寺院が密集しています。ジャスミンの花輪を編む店、サリーを売る布地店、スパイスの香りが漂うバナナリーフカレー店が軒を連ね、まるでインドの地方都市に迷い込んだような雰囲気です。仏教寺院やキリスト教会も混在しており、マレーシアの多民族共生を凝縮したエリアといえます。徒歩30分〜1時間で主要スポットを回れます。",
        },
        {
          heading: "アクセスと起点",
          body: "KLセントラル駅の南口を出て徒歩5分で到着します。KLモノレール、KTMコミューター、KLIA Expressの乗り換え拠点なのでアクセスは極めて便利。リトルインディアのゲートアーチが起点として分かりやすいです。帰りは同じKLセントラル駅に戻るか、徒歩15分ほどでミッドバレーメガモール方面にも出られます。",
        },
        {
          heading: "主要スポット",
          body: "ジャラン・トゥン・サンバンタン沿いの花輪ショップは早朝から生花を編んでおり、写真映えします。テンプル・オブ・ファインアーツではインド古典舞踊や音楽の公演が定期的に開催されています。ヴィヴェーカーナンダ・アシュラムは1904年創設の歴史あるヒンドゥー文化施設で、無料で見学できます。食事はバナナリーフカレーが定番で、手で食べるスタイルを体験できる店が複数あります。通り沿いのチャイ屋でマサラチャイを飲みながら休憩するのがおすすめです。",
        },
        {
          heading: "実用情報",
          body: "ブリックフィールズは平坦で歩きやすいエリアですが、歩道が狭い箇所があるため車やバイクに注意してください。日差しは強烈なので帽子と日焼け止めは必須。寺院訪問時は靴を脱ぐため、スリッポンが便利です。ディーパバリ（ヒンドゥーの灯火祭、通常10月〜11月）の時期は通り全体がイルミネーションで彩られ、最も華やかな季節です。食事代はRM10〜25が相場で、現金払いの店も多いです。",
        },
      ],
      [
        { q: "バナナリーフカレーとは何ですか？", a: "バナナの葉を皿代わりにして、ご飯・カレー・副菜を盛り付ける南インドスタイルの食事です。手で混ぜて食べるのが伝統的ですが、スプーン・フォークも使えます。RM12〜20程度。" },
        { q: "KLセントラル駅からどのくらいかかりますか？", a: "南口から徒歩5分です。リトルインディアのアーチが見えたら到着。散策は30分〜1時間が目安です。" },
        { q: "ブリックフィールズは安全ですか？", a: "昼間は安全で観光客も多いエリアです。夜間も大通り沿いは問題ありませんが、裏路地には入らないようにしましょう。" },
      ],
    ),
    en: en(MY_EN_CTA,
      "Brickfields Little India Walk — A Cultural Stroll from KL Sentral",
      "A walking guide to Kuala Lumpur's Brickfields neighbourhood — the Little India district adjacent to KL Sentral station, with flower garland shops, banana leaf curry restaurants, Hindu temples, and a Buddhist vihara all within easy walking distance.",
      KL_BRICKFIELDS_IMAGES[0],
      KL_BRICKFIELDS_IMAGES,
      KUL_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Brickfields is KL's Little India, stretching south of the city's main transport hub at KL Sentral. Along Jalan Tun Sambanthan you'll find jasmine garland shops stringing flowers from dawn, sari merchants, and banana-leaf-curry restaurants where eating with your hands is the done thing. Buddhist temples and Christian churches sit alongside Hindu shrines, making this one of the most visibly multicultural pockets of an already diverse city. The entire walk fits comfortably into 30 to 60 minutes, and because it starts at KL Sentral, it's an easy addition to any day's itinerary.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Exit KL Sentral station via the south entrance and walk five minutes to reach the Little India gateway arch on Jalan Tun Sambanthan. KL Sentral connects KL Monorail, KTM Komuter, KLIA Ekspres, and multiple bus routes, so access is straightforward from anywhere in the city. For the return, double back to KL Sentral or walk 15 minutes south to Mid Valley Megamall if you want to combine the walk with shopping.",
        },
        {
          heading: "Key Stops",
          body: "The flower garland shops along Jalan Tun Sambanthan are most photogenic early in the morning when the jasmine is freshly strung. Temple of Fine Arts hosts regular Indian classical dance and music performances — check their schedule online. Vivekananda Ashram, founded in 1904, is a historic Hindu cultural centre open to visitors at no charge. For food, banana leaf curry is the signature experience: rice, curries, and pickles served on a banana leaf for around RM 12–20. Pause at one of the chai stalls for a masala tea between stops.",
        },
        {
          heading: "Practical Tips",
          body: "Brickfields is flat and walkable, though some pavements are narrow and you'll need to watch for traffic. Sunscreen and a hat are essential — there's little shade along the main road. Remove shoes before entering temples; slip-ons save time. During Deepavali (the Hindu festival of lights, usually October or November), the entire street is strung with lights and decorations, making it the most spectacular time to visit. Most meals cost RM 10–25, and while card payments are increasingly common, some smaller stalls still prefer cash.",
        },
      ],
      [
        { q: "What is banana leaf curry?", a: "A South Indian-style meal served on a banana leaf instead of a plate: rice, curries, chutneys, and pickles. Traditionally eaten with your hands, though cutlery is always available. Expect to pay RM 12–20." },
        { q: "How far is it from KL Sentral station?", a: "About five minutes on foot from the south exit. The walk itself takes 30 to 60 minutes depending on how many stops you make." },
        { q: "Is Brickfields safe for tourists?", a: "Yes, it's a busy, well-lit area during the day with plenty of foot traffic. The main road is fine at night too, but avoid poorly lit side alleys after dark." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 3. Kuala Lumpur — Kampung Baru
  // ────────────────────────────────────────────────────────────────
  "kuala-lumpur-kampung-baru-walk": {
    ja: ja(MY_JA_CTA,
      "カンポンバルのマレー村散策 — KLの超高層ビルの足元に残る伝統集落",
      "クアラルンプール中心部のマレー伝統集落カンポンバルを歩くガイド。木造マレー住居、モスク、サテー屋台、そしてペトロナスツインタワーの眺望。",
      KL_KAMPUNG_BARU_IMAGES[0],
      KL_KAMPUNG_BARU_IMAGES,
      KUL_X,
      [
        {
          heading: "このルートの特徴",
          body: "カンポンバルはKLCC（ペトロナスツインタワー）から徒歩15分にもかかわらず、伝統的な木造マレー住居が残る都市内集落です。1900年にマレー人農業定住地として設立され、120年以上経った現在も独自のコミュニティを維持しています。超高層ビル群をバックに平屋の木造家屋が並ぶ対比は、他のアジア都市では見られないユニークな風景です。週末のナイトマーケットではサテーやナシレマなど本格的なマレー料理が楽しめます。",
        },
        {
          heading: "アクセスと起点",
          body: "LRTのカンポンバル駅が最寄りで、集落の入口まで徒歩3分です。KLCCからは徒歩15分、またはGrabで5分。マスジッド・ジャメ駅からも徒歩10分でアクセス可能です。起点はマスジッド・ジャメ（ジャメ・モスク）がおすすめで、2つの川の合流点から散策を始めると歴史的な文脈も理解しやすくなります。",
        },
        {
          heading: "主要スポット",
          body: "ジャラン・ラジャ・ムダ・ムサ通り沿いに伝統的マレー住居が集中しており、高床式の木造建築を間近で見られます。ラジャ・ムダ・ムサ・モスクは地域の精神的中心です。集落の東端からはペトロナスツインタワーが真正面に見え、写真スポットとして人気があります。土曜のナイトマーケット（パサール・マラム）は18時頃から始まり、サテー、ナシレマ、クエ（マレー菓子）の屋台が並びます。",
        },
        {
          heading: "訪問マナーと注意点",
          body: "カンポンバルは観光地ではなく住民の生活の場です。住居の敷地内には入らず、住民を無断で撮影しないよう配慮してください。モスク訪問時は露出の少ない服装が必要で、女性はスカーフを持参すると良いです。金曜の昼はモスクでの礼拝時間と重なるため、静かに行動しましょう。ナイトマーケットの食事は現金払いが基本で、RM5〜15で十分な量が食べられます。日中は日差しが厳しいので帽子と水を忘れずに。",
        },
      ],
      [
        { q: "カンポンバルのナイトマーケットはいつですか？", a: "土曜日の18時〜23時頃が最も賑わいます。ラマダン期間中は毎日ラマダンバザールが開かれ、日没前後が最も活気づきます。" },
        { q: "ペトロナスツインタワーが一番きれいに見える場所は？", a: "カンポンバル東端のジャラン・ラジャ・アブドゥッラー沿いから、木造家屋越しにツインタワーを望む構図が有名です。夕暮れ時がベスト。" },
        { q: "住民に迷惑をかけないためのマナーは？", a: "私有地に入らない、住民を無断撮影しない、モスク周辺では静かにする、が基本です。挨拶（アッサラームアライクム）をすると好意的に迎えてもらえます。" },
      ],
    ),
    en: en(MY_EN_CTA,
      "Kampung Baru Walk — A Malay Village Below KL's Skyscrapers",
      "A walking guide to Kampung Baru, the traditional Malay settlement in central Kuala Lumpur where timber stilt houses stand in the shadow of the Petronas Twin Towers, with a Saturday night market and authentic Malay street food.",
      KL_KAMPUNG_BARU_IMAGES[0],
      KL_KAMPUNG_BARU_IMAGES,
      KUL_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Kampung Baru sits barely 15 minutes on foot from the Petronas Twin Towers, yet it feels like a different country. Established in 1900 as a Malay Agricultural Settlement, it retains its low-rise timber houses, kampung atmosphere, and tight-knit community more than a century later. The visual contrast between single-storey wooden homes and the glass towers immediately behind them is unlike anything else in Southeast Asia. On Saturday evenings the night market brings the neighbourhood to life with satay smoke, nasi lemak, and kuih stalls running along the main road.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "LRT Kampung Baru station is the nearest stop, three minutes' walk from the settlement's entrance. From KLCC it's a 15-minute walk or a five-minute Grab ride. Masjid Jamek station, 10 minutes on foot, is another good option — starting from the historic mosque at the confluence of the Klang and Gombak rivers provides context for the city's origins before you step into the village.",
        },
        {
          heading: "Key Stops",
          body: "Traditional Malay stilt houses are concentrated along Jalan Raja Muda Musa. The Raja Muda Musa Mosque is the community's spiritual anchor. From the eastern edge of the settlement, the Petronas Twin Towers appear directly ahead — a composition that has become one of KL's most photographed contrasts. The Saturday night market (pasar malam) starts around 6 pm with stalls selling satay, nasi lemak, and kuih (Malay sweets) at prices that rarely exceed RM 15.",
        },
        {
          heading: "Etiquette and Practical Tips",
          body: "Kampung Baru is a living neighbourhood, not a tourist attraction. Stay on public roads and don't enter private compounds or photograph residents without permission. Modest clothing is appropriate, especially near the mosque — women should carry a headscarf. Friday midday is prayer time, so be quiet and respectful in the area. Night market food is cash-only, with most dishes costing RM 5–15. During the day, the heat is intense, so bring a hat and water.",
        },
      ],
      [
        { q: "When is the Kampung Baru night market?", a: "Saturday evenings from around 6 pm to 11 pm are the busiest. During Ramadan, a daily bazaar runs in the late afternoon and early evening." },
        { q: "Where is the best view of the Petronas Towers from Kampung Baru?", a: "The eastern edge along Jalan Raja Abdullah, where you can frame the towers behind traditional timber houses. Sunset is the best time for photos." },
        { q: "How should I behave to be respectful?", a: "Stay on public roads, don't photograph people without asking, and keep noise down near the mosque. A greeting of 'Assalamualaikum' goes a long way." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 4. Bali — Ubud Rice Terraces and Monkey Forest
  // ────────────────────────────────────────────────────────────────
  "bali-ubud-rice-terrace-walk": {
    ja: ja(ID_JA_CTA,
      "ウブドの棚田とモンキーフォレスト散歩 — バリの自然と文化を歩く",
      "バリ島ウブドのテガララン棚田、モンキーフォレスト、王宮、アートマーケットを巡る街歩きガイド。チャンプアンリッジウォークの朝散歩もカバー。",
      BALI_UBUD_IMAGES[0],
      BALI_UBUD_IMAGES,
      BALI_X,
      [
        {
          heading: "このルートの特徴",
          body: "ウブドはバリ島中部の高地に位置する芸術と文化の中心地です。テガララン棚田の美しい段々畑、700頭以上のサルが暮らすモンキーフォレスト、王宮でのレゴンダンス鑑賞と、自然・文化・芸術のすべてが徒歩圏内に収まります。朝6時台のチャンプアンリッジウォークは、渓谷を見渡す尾根道で朝霧の中を歩く体験ができ、ウブドで最も気持ちのいい時間帯です。中心部の標高は約300mで、海沿いより2〜3度涼しいのも歩きやすいポイントです。",
        },
        {
          heading: "アクセスと起点",
          body: "デンパサール空港からウブド中心部まで車で約1時間半。Grabまたは事前予約の送迎が一般的です。ウブド王宮（プリ・サレン・アグン）を起点にすると、アートマーケット・モンキーフォレスト・サラスワティ寺院が徒歩圏内です。テガララン棚田はウブド中心部から北へ車で20分なので、バイクを借りるか運転手付きの車をチャーターするのがおすすめです。",
        },
        {
          heading: "主要スポット",
          body: "テガララン棚田はスバック（バリ伝統の灌漑システム）を間近で見られる場所で、ユネスコ世界遺産に登録されています。段々畑の間を歩くトレイルがあり、所要30〜60分。モンキーフォレストは森の中の遊歩道を歩きながらサルを観察できますが、サングラスや帽子をサルに取られないよう注意が必要です。王宮前のアートマーケットでは絵画や木彫りの交渉購入が楽しめます。プラ・タマン・サラスワティのハスの池は日中の撮影スポットです。",
        },
        {
          heading: "時間帯と実用情報",
          body: "チャンプアンリッジウォークは朝6時〜7時がベスト。モンキーフォレストは8:30開園で、午前中が比較的空いています。テガララン棚田は午前中の光が最も美しく、写真撮影には9時〜11時がおすすめです。王宮のレゴンダンスは毎晩19:30開演、チケットはRp 100,000前後。雨季（11月〜3月）は午後にスコールが来るため、午前中に屋外を回り切るスケジュールが賢明です。日焼け止めと虫よけスプレーを忘れずに。",
        },
      ],
      [
        { q: "モンキーフォレストでサルに荷物を取られませんか？", a: "食べ物やサングラス、帽子を持っていると取られることがあります。ポケットのファスナーを閉め、不要なものはバッグにしまってください。サルに直接触れるのは避けましょう。" },
        { q: "テガララン棚田の入場料は？", a: "入場料はRp 25,000〜50,000程度（約250〜500円）。棚田内のブランコやカフェは別途料金がかかります。" },
        { q: "ウブドは何日くらい滞在すべきですか？", a: "主要スポットだけなら1日で回れますが、ヨガクラスや料理教室、近郊の棚田ハイキングも含めると2〜3泊が理想的です。" },
        { q: "チャンプアンリッジウォークはどのくらいの距離ですか？", a: "片道約2kmで、往復1時間弱です。舗装された道で難易度は低いですが、朝露で滑りやすい箇所があるので運動靴がおすすめです。" },
      ],
    ),
    en: en(ID_EN_CTA,
      "Ubud Rice Terraces and Monkey Forest Walk — Nature and Culture in Bali's Highlands",
      "A walking guide to Ubud covering Tegallalang rice terraces, the Sacred Monkey Forest Sanctuary, Ubud Royal Palace, the Art Market, and the scenic Campuhan Ridge Walk at sunrise.",
      BALI_UBUD_IMAGES[0],
      BALI_UBUD_IMAGES,
      BALI_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Ubud is Bali's cultural heart, set in the highlands about 300 metres above sea level where the air is two to three degrees cooler than the coast. Tegallalang's cascading rice terraces, the Sacred Monkey Forest with over 700 macaques, and nightly Legong dance performances at the Royal Palace all lie within easy reach of the compact town centre. The Campuhan Ridge Walk, best done at first light around 6 am, follows a narrow ridge between two river valleys with panoramic views of palm trees and morning mist — it's the most peaceful hour you'll spend in Bali.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Ngurah Rai Airport to central Ubud takes about 90 minutes by car. Grab or a pre-booked driver are the standard options. Start at Ubud Royal Palace (Puri Saren Agung), which puts the Art Market, Monkey Forest, and Saraswati Temple all within walking distance. Tegallalang rice terraces are 20 minutes north by car, so hiring a scooter or chartering a driver for the morning is practical.",
        },
        {
          heading: "Key Stops",
          body: "Tegallalang's terraces are a UNESCO-listed example of subak, Bali's traditional cooperative irrigation system. Walking trails wind through the paddies in 30–60 minutes. The Monkey Forest is a shaded woodland walk, but guard your sunglasses and hats — the macaques are quick. The Art Market opposite the Royal Palace sells paintings, woodcarvings, and textiles at negotiable prices. Pura Taman Saraswati's lotus pond is photogenic throughout the day. Campuhan Ridge Walk, starting near Ibah Hotel, is a 2-km paved path along a ridge with sweeping valley views.",
        },
        {
          heading: "Timing and Practical Tips",
          body: "Campuhan Ridge Walk is best from 6 to 7 am. Monkey Forest opens at 8:30 am and is quietest in the first hour. Tegallalang's light is ideal between 9 and 11 am. Legong dance at the Royal Palace runs nightly at 7:30 pm, tickets around Rp 100,000. Wet season (November to March) brings afternoon downpours, so plan outdoor visits for the morning. Sunscreen and insect repellent are essential year-round.",
        },
      ],
      [
        { q: "Will monkeys steal my belongings?", a: "They will if given the chance — especially food, sunglasses, and hats. Zip your pockets, stow loose items in a closed bag, and avoid touching or feeding the macaques." },
        { q: "How much does Tegallalang rice terrace entry cost?", a: "Admission is Rp 25,000–50,000 (roughly USD 1.50–3). Swings and cafes inside the terraces charge separately." },
        { q: "How many days should I spend in Ubud?", a: "One full day covers the main sights, but two to three nights allow time for yoga classes, cooking workshops, and hikes through surrounding rice fields." },
        { q: "How long is the Campuhan Ridge Walk?", a: "About 2 km one way, taking under an hour for a round trip. The path is paved but can be slippery with morning dew, so wear trainers." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 5. Bali — Seminyak Beach and Cafe Street
  // ────────────────────────────────────────────────────────────────
  "bali-seminyak-beach-walk": {
    ja: ja(ID_JA_CTA,
      "スミニャックのビーチとカフェ通り — バリのトレンド発信地を歩く",
      "バリ島スミニャックのビーチウォーク、イートストリートのカフェ巡り、ペティテンゲット寺院、サンセットバーを楽しむ街歩きガイド。",
      BALI_SEMINYAK_IMAGES[0],
      BALI_SEMINYAK_IMAGES,
      BALI_X,
      [
        {
          heading: "このルートの特徴",
          body: "スミニャックはバリ島南西部の海岸沿いに広がるトレンドエリアで、おしゃれなカフェ、ブティック、ビーチバーが集中しています。ジャラン・カユ・アヤ（通称イートストリート）は飲食店が連なるメインストリートで、オーストラリア系のブランチカフェからバリニーズ料理まで幅広い選択肢があります。ビーチは幅広の砂浜が続き、夕方になるとサンセットを目当てにビーチバーが賑わいます。クタの喧騒とは異なり、落ち着いた大人の雰囲気が特徴です。",
        },
        {
          heading: "アクセスと起点",
          body: "デンパサール空港から車で約40分。Grabまたはホテルの送迎が一般的です。バリにはメーターのタクシーが少なく流しのタクシーは割高になることが多いため、Grabアプリの利用が安全です。イートストリート（ジャラン・カユ・アヤ）の東端を起点に、西へビーチに向かって歩くルートがおすすめです。",
        },
        {
          heading: "主要スポット",
          body: "イートストリートのカフェで朝食を取り、そこからビーチに向かうのが定番ルート。プラ・ペティテンゲットはスミニャック北端の海沿いにある古い寺院で、満月や新月の日には祭礼が行われます。ダブルシックスビーチは広い砂浜にビーンバッグが並び、サンセット鑑賞の特等席。スミニャック・スクエア周辺にはセレクトショップやアート系の店が集まり、買い物好きには外せないエリアです。裏路地にはウォールアートが点在し、散策の楽しみを増やしてくれます。",
        },
        {
          heading: "時間帯と実用情報",
          body: "カフェ巡りは午前中、ビーチは15時以降がベスト。サンセットは17:30〜18:30頃で、ビーチバーは16時頃から席が埋まり始めます。日焼け対策は必須で、SPF50以上の日焼け止めを塗り直してください。スミニャックの歩道は整備が不十分な箇所が多く、特に夜間は足元に注意。雨季は午後のスコールが多いですが、30分程度で止むことがほとんどです。飲食店ではカード決済が使える店が多いですが、小さな屋台はRp現金のみです。",
        },
      ],
      [
        { q: "スミニャックとクタの違いは？", a: "クタはバックパッカーや若者向けの賑やかなナイトライフが中心、スミニャックはカフェ文化やブティックが充実した大人向けエリアです。ビーチの広さはスミニャックの方が余裕があります。" },
        { q: "サンセットバーのおすすめは？", a: "ダブルシックスビーチ沿いのバーが人気。席は16時頃に確保するのがベスト。ドリンクはRp 80,000〜150,000が相場です。" },
        { q: "スミニャックでのバイク移動は安全ですか？", a: "交通量が多く道も狭いため、バイク経験が少ない方にはおすすめしません。Grabを使うか、徒歩圏内で過ごすのが安心です。" },
      ],
    ),
    en: en(ID_EN_CTA,
      "Seminyak Beach and Cafe Street Walk — Bali's Stylish Coastal Strip",
      "A walking guide to Seminyak covering the Eat Street cafe scene on Jalan Kayu Aya, Petitenget Temple, Double Six Beach sunset bars, and the boutique shopping lanes that make Seminyak Bali's most fashionable neighbourhood.",
      BALI_SEMINYAK_IMAGES[0],
      BALI_SEMINYAK_IMAGES,
      BALI_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Seminyak occupies Bali's southwest coast just north of Kuta but with a distinctly different personality: think brunch cafes, designer boutiques, and sunset cocktail bars rather than nightclubs and tourist tat. Jalan Kayu Aya, locally known as Eat Street, is the main drag — a kilometre of restaurants ranging from Australian-style brunch spots to Balinese warungs. The beach itself is wide and sandy, and by late afternoon the bean-bag-lined shore fills with visitors settling in to watch one of Bali's legendary sunsets.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Ngurah Rai Airport to Seminyak is about 40 minutes by car. Grab is the safest and most transparent transport option — metered taxis are rare and freelance drivers often overcharge. Start at the eastern end of Jalan Kayu Aya and walk west toward the beach, which gives you a natural arc from cafes to sand.",
        },
        {
          heading: "Key Stops",
          body: "Begin with breakfast on Eat Street, then head to the beach. Pura Petitenget, a centuries-old sea temple at the northern end of Seminyak, is especially atmospheric during full-moon and new-moon ceremonies. Double Six Beach has the widest stretch of sand and the densest cluster of sunset bars. Seminyak Square and the lanes around it are home to independent boutiques and surfwear labels. Back alleys throughout the area hide colourful murals that reward aimless wandering.",
        },
        {
          heading: "Timing and Practical Tips",
          body: "Cafe-hop in the morning, hit the beach from 3 pm onward. Sunset falls between 5:30 and 6:30 pm, and beachfront bars start filling seats by 4 pm. Sunscreen of SPF 50 or higher is non-negotiable. Seminyak's pavements are uneven and poorly lit at night, so watch your step. Wet-season (November to March) showers are usually heavy but short — 30 minutes at most. Most restaurants accept cards, but small warungs and street vendors take cash only in rupiah.",
        },
      ],
      [
        { q: "How does Seminyak compare to Kuta?", a: "Kuta is geared toward backpackers and nightlife; Seminyak is quieter, more cafe-and-boutique focused, and popular with couples and families. The beach is also wider and less crowded." },
        { q: "Best sunset bar recommendation?", a: "The bars lining Double Six Beach are the classics. Arrive by 4 pm to secure a seat. Cocktails run Rp 80,000–150,000." },
        { q: "Is it safe to rent a scooter in Seminyak?", a: "Traffic is heavy and lanes are narrow, so scooters aren't recommended for inexperienced riders. Grab or walking is safer for most visitors." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 6. Bali — Sanur Morning Walk
  // ────────────────────────────────────────────────────────────────
  "bali-sanur-morning-walk": {
    ja: ja(ID_JA_CTA,
      "サヌールの朝のビーチウォーク — バリのサンライズ海岸を歩く",
      "バリ島東海岸サヌールの朝の散策ガイド。5kmのボードウォーク、伝統的な漁船、ル・マユール美術館、シンドゥナイトマーケットまで。",
      BALI_SANUR_IMAGES[0],
      BALI_SANUR_IMAGES,
      BALI_X,
      [
        {
          heading: "このルートの特徴",
          body: "サヌールはバリ島の東海岸に位置し、東向きのビーチから日の出が美しく見えるエリアです。全長5kmの海岸遊歩道（ボードウォーク）が整備されており、朝のジョギングや散歩に最適。クタやスミニャックと比べて静かで、長期滞在者やファミリーに人気のリゾート地です。ビーチにはカラフルなジュクン（伝統的なアウトリガーカヌー）が並び、漁師の生活と観光が共存する穏やかな風景が広がっています。",
        },
        {
          heading: "アクセスと起点",
          body: "デンパサール空港から車で約30分。ウブドからは車で約1時間です。ボードウォークの北端（グランドバリビーチ付近）か南端（シンドゥビーチ）のどちらからでも始められますが、日の出を見るなら北端からスタートして南へ歩くルートがおすすめです。Grabで「Sanur Boardwalk」と入力すれば正確に到着できます。",
        },
        {
          heading: "主要スポット",
          body: "朝6時台にビーチに出ると、水平線から昇る日の出とジュクンのシルエットが美しい構図になります。ル・マユール美術館はベルギー人画家のアトリエ兼自宅で、バリの伝統生活を描いた作品が展示されています。ボードウォーク沿いにはカフェやワルンが点在し、歩き疲れたら海を見ながらコーヒー休憩ができます。シンドゥナイトマーケットは毎晩17時頃から営業し、ナシゴレンやサテーなどのインドネシア料理がRp 20,000〜40,000程度で食べられます。",
        },
        {
          heading: "実用情報",
          body: "ボードウォークは舗装されており、ベビーカーや車椅子でも通行可能です。朝6時台は涼しく快適ですが、8時を過ぎると日差しが強くなるため早めの行動がおすすめです。サヌールの海はリーフに守られているため波が穏やかで、子連れでも安心して遊べます。レヌンブン島やペニダ島へのボートがサヌール港から出ており、半日ツアーと組み合わせることも可能です。サヌールは全体的に治安が良く、夜間の散策も問題ありません。",
        },
      ],
      [
        { q: "サヌールのボードウォークは何時から歩けますか？", a: "24時間開放されていますが、日の出前の5:30頃〜8:00がベストタイム。ジョガーや地元民の散歩時間帯でもあります。" },
        { q: "サヌールは泳げるビーチですか？", a: "リーフに守られた穏やかな海で、波がほとんどなく安全です。ただし干潮時は浅すぎて泳ぎにくいことがあるため、潮汐表を確認してください。" },
        { q: "ル・マユール美術館の入場料は？", a: "Rp 50,000（約500円）。開館は日曜〜金曜の8:00〜15:30、土曜は12:30まで。所要30分程度です。" },
      ],
    ),
    en: en(ID_EN_CTA,
      "Sanur Morning Beach Walk — Bali's Sunrise Coast",
      "A walking guide to Sanur's 5-km boardwalk on Bali's east coast, covering sunrise views, traditional jukung fishing boats, the Le Mayeur Museum, and the Sindhu Night Market.",
      BALI_SANUR_IMAGES[0],
      BALI_SANUR_IMAGES,
      BALI_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Sanur faces east, which means sunrises rather than sunsets — and they're spectacular. A paved 5-km boardwalk hugs the coast, making it one of the few places in Bali where you can walk for an extended distance right on the shoreline. The mood here is quieter and more laid-back than Kuta or Seminyak, attracting long-stay visitors and families. Colourful jukung outrigger boats line the sand, and the reef-protected water is calm enough for children to wade safely.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Ngurah Rai Airport to Sanur is about 30 minutes by car; from Ubud, about an hour. The boardwalk runs from near Grand Bali Beach in the north to Sindhu Beach in the south. For sunrise, start at the north end and walk south so the light is ahead of you. Search 'Sanur Boardwalk' in Grab for a precise drop-off.",
        },
        {
          heading: "Key Stops",
          body: "Arrive at the beach by 6 am to catch the sunrise behind the silhouetted jukung boats. The Le Mayeur Museum, the former studio of Belgian painter Adrien-Jean Le Mayeur, displays his paintings of traditional Balinese life. Cafes and warungs dot the boardwalk, offering sea-view coffee stops whenever you need one. Sindhu Night Market opens nightly around 5 pm with Indonesian street food — nasi goreng, satay, and bakso — for Rp 20,000–40,000 per dish.",
        },
        {
          heading: "Practical Tips",
          body: "The boardwalk is paved and accessible to pushchairs and wheelchairs. Before 8 am the temperature is comfortable, but sunlight intensifies quickly, so start early. The reef keeps the water calm but at low tide it can be too shallow to swim — check tide tables before planning a dip. Boats to Nusa Lembongan and Nusa Penida depart from Sanur harbour, making it easy to combine the morning walk with a half-day island trip. Sanur is generally very safe, and evening strolls are perfectly fine.",
        },
      ],
      [
        { q: "What time should I start the boardwalk?", a: "The boardwalk is open 24 hours, but the sweet spot is 5:30 to 8 am — cool temperatures, sunrise views, and plenty of local joggers for company." },
        { q: "Can I swim at Sanur?", a: "Yes, the reef-protected water is calm and safe. At low tide it can be very shallow, so check tide charts if swimming is your priority." },
        { q: "How much is Le Mayeur Museum entry?", a: "Rp 50,000 (about USD 3). Open Sunday to Friday 8 am to 3:30 pm, Saturday until 12:30 pm. Allow about 30 minutes." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 7. Phnom Penh — Riverside Walk
  // ────────────────────────────────────────────────────────────────
  "phnom-penh-riverside-walk": {
    ja: ja(KH_JA_CTA,
      "プノンペンのリバーサイド散策 — 王宮からワットウナロムまで川沿いを歩く",
      "プノンペンのトンレサップ川沿いシソワットキーを歩くガイド。王宮、シルバーパゴダ、ワットウナロム、リバーサイドナイトマーケットを巡る。",
      PHNOM_PENH_RIVERSIDE_IMAGES[0],
      PHNOM_PENH_RIVERSIDE_IMAGES,
      PNH_X,
      [
        {
          heading: "このルートの特徴",
          body: "プノンペンのリバーサイド（シソワットキー）はトンレサップ川に面した全長約2kmの遊歩道で、王宮、仏教寺院、カフェ、ナイトマーケットが一直線に並んでいます。カンボジアの首都でありながら、バンコクやホーチミンほどの交通渋滞がなく、川風を受けながらゆったりと歩ける点が魅力です。夕方のリバーサイドは地元民がエクササイズやピクニックを楽しむ憩いの場になり、旅行者と地元の人が自然に交わる雰囲気があります。",
        },
        {
          heading: "アクセスと起点",
          body: "プノンペン国際空港から市内中心部まではトゥクトゥクで約30分（USD 10〜12）、Grabも利用可能です。王宮を起点にすると南から北へシソワットキーを歩くルートになります。市内の移動はトゥクトゥクかGrabが基本で、料金は事前交渉するか、アプリで確定させてから乗ってください。",
        },
        {
          heading: "主要スポット",
          body: "王宮は1866年建設の現役の王宮で、内部の銀の間（シルバーパゴダ）には5,000枚以上の銀タイルが敷かれています。入場料はUSD 10で、ガイドは別途USD 10。膝と肩を覆う服装が必要です。北に歩くとワットウナロムがあり、カンボジア仏教の本山として重要な寺院です。リバーサイド沿いにはフレンチコロニアル建築のカフェやレストランが並び、川を眺めながらの食事が楽しめます。週末のナイトマーケットではクメール雑貨や屋台料理が買えます。",
        },
        {
          heading: "実用情報",
          body: "ベストシーズンは乾季の11月〜2月で、気温は25〜32度と比較的快適です。雨季（5月〜10月）は午後のスコールが多いですが、朝は晴れることがほとんどです。通貨はリエルとUSDが併用されていますが、観光エリアではUSDが主流。ATMでの引き出しもUSDが出てきます。川沿いは夜間も照明があり安全ですが、バッグは前に持ち、スマホのひったくりに注意してください。水道水は飲めないので、ボトルウォーターを持参してください。",
        },
      ],
      [
        { q: "王宮の営業時間は？", a: "8:00〜11:00と14:00〜17:00の二部制。昼休みがあるので注意してください。入場料USD 10、カメラ持ち込みは無料です。" },
        { q: "リバーサイドでの食事の相場は？", a: "ローカル食堂でUSD 2〜5、観光客向けレストランでUSD 8〜15程度。クメール料理のアモック（ココナッツカレー蒸し）はぜひ試してください。" },
        { q: "プノンペンの治安は？", a: "リバーサイド周辺は昼夜とも比較的安全ですが、バイクによるひったくりが報告されています。スマホは歩道側の手で持ち、バッグは体の前に。" },
      ],
    ),
    en: en(KH_EN_CTA,
      "Phnom Penh Riverside Walk — From the Royal Palace to Wat Ounalom",
      "A walking guide along Sisowath Quay in Phnom Penh covering the Royal Palace and Silver Pagoda, Wat Ounalom, French-colonial riverside cafes, and the weekend night market on the Tonle Sap River.",
      PHNOM_PENH_RIVERSIDE_IMAGES[0],
      PHNOM_PENH_RIVERSIDE_IMAGES,
      PNH_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Sisowath Quay runs about 2 km along the Tonle Sap River, stringing together Phnom Penh's Royal Palace, Buddhist temples, cafes, and a night market in a single continuous waterfront walk. The Cambodian capital has far less traffic congestion than Bangkok or Ho Chi Minh City, and the river breeze makes walking pleasant even in the heat. In the late afternoon the promenade fills with locals exercising, picnicking, and socialising — a relaxed atmosphere that draws travellers into the everyday life of the city.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Phnom Penh International Airport to the city centre is about 30 minutes by tuk-tuk (USD 10–12) or Grab. Start at the Royal Palace at the southern end of Sisowath Quay and walk north. Within the city, tuk-tuks and Grab are the primary transport; always agree on a fare before boarding a tuk-tuk, or use the app for a fixed price.",
        },
        {
          heading: "Key Stops",
          body: "The Royal Palace, built in 1866, is still the King's official residence. Inside the compound, the Silver Pagoda's floor is laid with over 5,000 silver tiles. Entry is USD 10 and a guide costs another USD 10; knees and shoulders must be covered. Walking north along the quay you'll reach Wat Ounalom, the headquarters of Cambodian Buddhism and a working monastery. French-colonial buildings along the riverside house cafes and restaurants with river-view terraces. The weekend night market at the northern end sells Khmer crafts and street food.",
        },
        {
          heading: "Practical Tips",
          body: "The best season is November to February (dry, 25–32°C). In the wet season (May to October) expect afternoon downpours, though mornings are usually clear. The US dollar is the dominant currency in tourist areas — ATMs dispense USD. The riverside is well-lit and generally safe at night, but carry your bag in front and be alert for motorbike snatch-thefts targeting phones. Tap water is not safe to drink; carry bottled water.",
        },
      ],
      [
        { q: "What are the Royal Palace's opening hours?", a: "Two sessions: 8–11 am and 2–5 pm. Note the midday closure. Entry is USD 10; cameras are free to bring in." },
        { q: "How much does a meal cost on the riverside?", a: "Local eateries USD 2–5, tourist-oriented restaurants USD 8–15. Amok, a Khmer coconut-curry steamed fish, is the must-try dish." },
        { q: "Is Phnom Penh safe for walking?", a: "The riverside area is generally safe day and night, but motorbike bag-snatching does occur. Hold your phone on the building side of the pavement and keep bags in front of you." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 8. Phnom Penh — Russian Market and Tuol Sleng
  // ────────────────────────────────────────────────────────────────
  "phnom-penh-russian-market-walk": {
    ja: ja(KH_JA_CTA,
      "ロシアンマーケットとトゥールスレン周辺 — プノンペンの市場と歴史を歩く",
      "プノンペンのロシアンマーケット（トゥールトンポン市場）とトゥールスレン虐殺博物館を巡る街歩きガイド。カフェストリートや独立記念塔も網羅。",
      PHNOM_PENH_RUSSIAN_MARKET_IMAGES[0],
      PHNOM_PENH_RUSSIAN_MARKET_IMAGES,
      PNH_X,
      [
        {
          heading: "このルートの特徴",
          body: "ロシアンマーケット（プサール・トゥールトンポン）はプノンペン南部にある巨大な屋内市場で、シルク製品、クメール工芸品、アパレル工場の余剰品が驚くほど安い価格で手に入ります。1980年代にソ連の外交官が買い物に来たことからこの名前がつきました。近くのトゥールスレン虐殺博物館（S-21）はクメール・ルージュ時代の悲劇を伝える重要な歴史施設で、カンボジアを理解するうえで避けて通れない場所です。市場とミュージアムを組み合わせることで、プノンペンの現在と過去を一度に体験できます。",
        },
        {
          heading: "アクセスと起点",
          body: "リバーサイドからトゥクトゥクで15分（USD 3〜4）。ロシアンマーケットを先に訪れ、その後トゥールスレンに向かうルートが一般的です。市場は朝7時頃から動き始め、午前中が涼しくて買い物しやすい時間帯です。トゥールスレンは市場からトゥクトゥクで10分、徒歩なら25分です。",
        },
        {
          heading: "主要スポット",
          body: "ロシアンマーケットでは、シルクスカーフ（USD 5〜15）、クメール陶器、カシューナッツ、ペッパー（カンポットペッパー）などがお土産に最適です。値段交渉は必須で、表示の60〜70%を目指しましょう。トゥールスレン虐殺博物館は旧高校を転用した収容施設で、音声ガイド（USD 3）の利用を強くおすすめします。所要1〜2時間。独立記念塔は1958年建設のクメール様式の塔で、周辺は公園になっています。ストリート240周辺にはカフェやブティックが集まるおしゃれなエリアです。",
        },
        {
          heading: "実用情報",
          body: "ロシアンマーケット内部は屋根付きですが通気性が悪く、蒸し暑くなります。短い時間で効率よく回り、外のカフェで休憩するのがベスト。トゥールスレン博物館は精神的に重い内容なので、訪問後に気分転換できるカフェを確保しておくと良いでしょう。入場料はUSD 5。子連れの場合は内容を考慮して判断してください。市場での支払いはUSD現金が主流で、小額紙幣を用意しておくとスムーズです。",
        },
      ],
      [
        { q: "ロシアンマーケットのおすすめ土産は？", a: "カンポットペッパー、シルクスカーフ、クメール陶器が人気。カシューナッツもカンボジア産が安くて美味しいです。値段交渉を楽しんでください。" },
        { q: "トゥールスレン博物館は行くべきですか？", a: "カンボジアの歴史を理解するうえで重要な施設です。内容は重いですが、音声ガイドを借りて静かに見学することをおすすめします。所要1〜2時間。" },
        { q: "ロシアンマーケットの営業時間は？", a: "毎日6:30〜17:00頃。午前中が最も涼しく買い物しやすいです。月曜日も営業しています。" },
      ],
    ),
    en: en(KH_EN_CTA,
      "Russian Market and Tuol Sleng Walk — Markets and History in Phnom Penh",
      "A walking guide covering Phnom Penh's Russian Market (Psar Tuol Tom Poung) for silk and souvenirs, Tuol Sleng Genocide Museum for Khmer Rouge history, plus the cafe strip on Street 240 and the Independence Monument.",
      PHNOM_PENH_RUSSIAN_MARKET_IMAGES[0],
      PHNOM_PENH_RUSSIAN_MARKET_IMAGES,
      PNH_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "The Russian Market (Psar Tuol Tom Poung) is Phnom Penh's largest covered market, named for the Soviet diplomats who shopped here in the 1980s. Today it sells silk, Khmer handicrafts, and garment-factory surplus at remarkably low prices. Nearby, the Tuol Sleng Genocide Museum (S-21) is a sobering reminder of the Khmer Rouge era and an essential stop for understanding Cambodia. Combining the market and the museum in one outing gives you Phnom Penh's present-day energy alongside its difficult past.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "From the riverside, a tuk-tuk takes about 15 minutes (USD 3–4). Visit the Russian Market first and then head to Tuol Sleng. The market comes alive around 7 am; mornings are cooler and more pleasant for shopping. Tuol Sleng is a 10-minute tuk-tuk or 25-minute walk from the market.",
        },
        {
          heading: "Key Stops",
          body: "Inside the Russian Market, look for silk scarves (USD 5–15), Khmer pottery, cashew nuts, and Kampot pepper — all excellent souvenirs. Haggling is expected; aim for 60–70% of the opening price. Tuol Sleng, a former high school turned detention centre, is best experienced with the audio guide (USD 3). Allow 1–2 hours. The Independence Monument, a 1958 Khmer-style tower, stands in a roundabout park. The cafes and boutiques around Street 240 provide a lighter finish to the walk.",
        },
        {
          heading: "Practical Tips",
          body: "The market is roofed but poorly ventilated, so it gets hot inside — visit efficiently and take breaks at outside cafes. Tuol Sleng is emotionally heavy; plan a coffee stop afterward to decompress. Entry is USD 5. Families with young children should consider the content carefully before visiting. Cash in USD is the standard payment at the market — carry small bills.",
        },
      ],
      [
        { q: "Best souvenirs at the Russian Market?", a: "Kampot pepper, silk scarves, Khmer ceramics, and Cambodian cashew nuts. Bargaining is part of the experience." },
        { q: "Should I visit Tuol Sleng?", a: "It's an important historical site and worthwhile for understanding Cambodia. The content is heavy; the audio guide (USD 3) adds valuable context. Allow 1–2 hours." },
        { q: "What are the Russian Market's hours?", a: "Daily from about 6:30 am to 5 pm. Mornings are cooler and the best time to shop. Open every day including Mondays." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 9. Luang Prabang — Morning Alms and Market
  // ────────────────────────────────────────────────────────────────
  "luang-prabang-morning-alms-walk": {
    ja: ja(LA_JA_CTA,
      "ルアンパバーンの托鉢と朝市散歩 — メコン川沿いの朝を歩く",
      "ルアンパバーンの早朝托鉢儀式、メコン川沿いの朝市、ワットシェントーンを巡る街歩きガイド。世界遺産の古都で過ごす静かな朝。",
      LUANG_PRABANG_ALMS_IMAGES[0],
      LUANG_PRABANG_ALMS_IMAGES,
      LPQ_X,
      [
        {
          heading: "このルートの特徴",
          body: "ルアンパバーンはメコン川とナムカーン川の合流点に位置する世界遺産の古都で、毎朝5:30〜6:30頃に数百人の僧侶がオレンジ色の袈裟を着て托鉢に歩く光景は、東南アジアで最も印象的な朝の風景のひとつです。托鉢を見学した後はメコン川沿いの朝市で地元の食材や手工芸品を見て回り、ワットシェントーンまで足を延ばすのが理想的な朝のルートです。静かで敬虔な雰囲気の中、ラオスの仏教文化を肌で感じられます。",
        },
        {
          heading: "アクセスと起点",
          body: "ルアンパバーン国際空港から旧市街まで車で15分（USD 7程度）。市内は徒歩で十分回れるコンパクトな町です。托鉢の見学はサッカリン通り沿いがベストポイントで、朝5:15頃には場所を確保してください。ゲストハウスやホテルのスタッフに当日の托鉢ルートを確認すると確実です。",
        },
        {
          heading: "主要スポット",
          body: "托鉢は宗教的な儀式であり、観光イベントではありません。見学時はフラッシュ撮影を避け、僧侶から2m以上の距離を保ち、静かに見守ることが大切です。托鉢後はメコン川沿いの朝市へ。新鮮な川魚、野菜、ラオスのコーヒー豆、織物が並びます。プーシーの丘（標高100m）は328段の階段を上ると360度のパノラマが広がり、朝の清涼な空気の中での登頂がおすすめです。ワットシェントーンはラオス寺院建築の最高傑作で、重なり合う屋根のラインが美しいです。",
        },
        {
          heading: "実用情報",
          body: "托鉢への参加（食べ物を差し上げること）は可能ですが、炊きたてのもち米を用意する必要があり、ツアーオペレーターが配る市販のスナックを渡すのは僧侶に失礼とされています。見学のみにするか、宿のスタッフに正しい方法を聞いてください。乾季（11月〜2月）は朝晩の気温が15度以下に下がることもあるため、薄手の上着を持参してください。通貨はラオスキープですが、観光地ではUSDやタイバーツも使える場合があります。ATMは旧市街に複数あります。",
        },
      ],
      [
        { q: "托鉢は何時に始まりますか？", a: "通常5:30〜6:30の間に行われます。季節によって時間が多少変動するため、宿泊先で前日に確認するのがベストです。" },
        { q: "托鉢に参加してもいいですか？", a: "可能ですが、炊きたてのもち米を自分で用意する必要があります。観光客向けの市販スナックを渡すのはマナー違反です。見学のみでも十分です。" },
        { q: "プーシーの丘の入場料は？", a: "20,000キープ（約USD 1）。階段は328段で、15〜20分で頂上に着きます。朝か夕方が涼しくておすすめです。" },
        { q: "ルアンパバーンの食事の相場は？", a: "ローカル食堂で30,000〜50,000キープ（USD 2〜3）、観光客向けレストランで70,000〜150,000キープ（USD 4〜9）程度。" },
      ],
    ),
    en: en(LA_EN_CTA,
      "Luang Prabang Morning Alms and Market Walk — Dawn on the Mekong",
      "A walking guide to Luang Prabang's daily alms-giving ceremony, the Mekong riverside morning market, Mount Phousi, and Wat Xieng Thong — a quiet morning in the UNESCO World Heritage town.",
      LUANG_PRABANG_ALMS_IMAGES[0],
      LUANG_PRABANG_ALMS_IMAGES,
      LPQ_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Luang Prabang sits at the confluence of the Mekong and Nam Khan rivers, a UNESCO World Heritage town where hundreds of saffron-robed monks walk single file through the streets each morning to collect alms. The ceremony, taking place roughly between 5:30 and 6:30 am, is one of Southeast Asia's most arresting sights. After watching the procession, the walk continues to the Mekong riverside morning market and then to Wat Xieng Thong, the finest example of Lao temple architecture. The mood is quiet and reverent — a world apart from the busier capitals of the region.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Luang Prabang International Airport is 15 minutes by car from the old town (about USD 7). The town is compact enough to explore entirely on foot. The best spot to watch the alms procession is along Sakkaline Road — arrive by 5:15 am to find a position. Ask your hotel staff the evening before for the latest route information.",
        },
        {
          heading: "Key Stops",
          body: "The alms ceremony is a religious ritual, not a tourist show. Keep at least 2 metres from the monks, avoid flash photography, and remain silent. Afterward, head to the Mekong morning market for river fish, vegetables, Lao coffee beans, and handwoven textiles. Mount Phousi (100 metres, 328 steps) rewards an early climb with 360-degree panoramic views. Wat Xieng Thong, at the tip of the peninsula, has the most beautiful multi-layered roof in Lao architecture.",
        },
        {
          heading: "Practical Tips",
          body: "Participating in the alms-giving (offering food to monks) is possible, but you must prepare freshly steamed sticky rice. Pre-packaged snacks distributed by tour operators are considered disrespectful — observe only, or ask your hotel to help you prepare properly. During the cool season (November to February), morning temperatures can drop below 15°C, so bring a light jacket. The currency is Lao kip, though USD and Thai baht are sometimes accepted in tourist areas. ATMs are available in the old town.",
        },
      ],
      [
        { q: "What time does the alms ceremony start?", a: "Usually between 5:30 and 6:30 am, varying slightly by season. Check with your accommodation the night before for the current timing." },
        { q: "Can I participate in the alms giving?", a: "Yes, but you need to prepare your own freshly steamed sticky rice. Giving commercially packaged snacks is considered disrespectful. Watching respectfully is perfectly fine." },
        { q: "How much is Mount Phousi entry?", a: "20,000 kip (about USD 1). The climb is 328 steps and takes 15–20 minutes. Early morning or late afternoon is best for cooler temperatures." },
        { q: "What's the food budget in Luang Prabang?", a: "Local restaurants 30,000–50,000 kip (USD 2–3), tourist-oriented places 70,000–150,000 kip (USD 4–9)." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 10. Luang Prabang — Peninsula Temple Walk
  // ────────────────────────────────────────────────────────────────
  "luang-prabang-peninsula-temple-walk": {
    ja: ja(LA_JA_CTA,
      "半島の寺院めぐりとメコン川沿い — ルアンパバーンの世界遺産を歩く",
      "ルアンパバーン旧市街半島の寺院群、王宮博物館、フランス植民地建築、メコン川沿いのカフェを巡る街歩きガイド。",
      LUANG_PRABANG_TEMPLE_IMAGES[0],
      LUANG_PRABANG_TEMPLE_IMAGES,
      LPQ_X,
      [
        {
          heading: "このルートの特徴",
          body: "ルアンパバーンの旧市街はメコン川とナムカーン川に挟まれた半島上にあり、30以上の寺院と仏塔がわずか1.5kmの範囲に集中しています。フランス植民地時代のコロニアル建築とラオス伝統の木造寺院が隣り合って建つ独特の景観はユネスコ世界遺産に登録されています。半日あれば主要な寺院を回れますが、急がずにメコン川沿いのカフェで休憩しながらゆっくり歩くのがこの町の正しい楽しみ方です。",
        },
        {
          heading: "アクセスと起点",
          body: "王宮博物館（ハウカム）を起点にするのが最も分かりやすいルートです。ここから半島の先端にあるワットシェントーンまで歩いて20〜30分。途中に複数の寺院があるので、気になるものに立ち寄りながら進みます。午前中の涼しい時間帯（7:00〜11:00）がベストで、午後は暑さと眠気で寺院が閉まることもあります。",
        },
        {
          heading: "主要スポット",
          body: "王宮博物館にはラオス王家の歴史資料とプラバーン仏（町の名前の由来）が安置されています。入場料30,000キープ。ワットマイの正面ファサードは黄金のレリーフで覆われ、ラーマーヤナの場面が描かれています。ワットビスンナラートは1513年創建のルアンパバーン最古の現役寺院で、隣にはスイカ形の仏塔タートマクモが建っています。半島先端のワットシェントーンは必見で、裏側のモザイク壁画「生命の樹」も見逃さないでください。",
        },
        {
          heading: "実用情報",
          body: "寺院訪問時は膝と肩を覆う服装が必要です。サンダルで入れる寺院もありますが、脱ぎ履きしやすい靴がベスト。乾季のナムカーン川には竹の橋が架かり、対岸の村に渡れます（渡橋料10,000キープ）。メコン川沿いのカフェではラオスコーヒーが人気で、濃厚なドリップコーヒーにコンデンスミルクを入れるラオス式がおすすめです。夕方はメコン川に沈む夕日がきれいで、川沿いのレストランのテラス席が人気です。",
        },
      ],
      [
        { q: "半島の寺院巡りの所要時間は？", a: "主要5〜6寺院を回って2〜3時間が目安。カフェ休憩を入れると半日コースになります。" },
        { q: "王宮博物館の見どころは？", a: "ラオス王家の居室、プラバーン仏、各国からの贈答品が見どころ。内部は撮影禁止です。入場料30,000キープ（USD 1.8）。" },
        { q: "竹の橋はいつ渡れますか？", a: "乾季（11月〜5月頃）のみ架橋されます。雨季はナムカーン川の水位が上がるため撤去されます。渡橋料10,000キープ。" },
      ],
    ),
    en: en(LA_EN_CTA,
      "Luang Prabang Peninsula Temple Walk — UNESCO Heritage Temples and the Mekong",
      "A walking guide through the Luang Prabang old town peninsula covering the Royal Palace Museum, Wat Mai, Wat Visounnarath, Wat Xieng Thong, and the Mekong riverside cafes and colonial architecture.",
      LUANG_PRABANG_TEMPLE_IMAGES[0],
      LUANG_PRABANG_TEMPLE_IMAGES,
      LPQ_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Luang Prabang's old town occupies a narrow peninsula between the Mekong and Nam Khan rivers, packing more than 30 temples and stupas into an area barely 1.5 km long. French colonial buildings stand next to traditional Lao wooden monasteries — a juxtaposition that earned the town UNESCO World Heritage status. Half a day is enough for the main temples, but the town rewards a slower pace: stop at Mekong-side cafes, watch the light change on the gilded roofs, and let the quiet sink in.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Begin at the Royal Palace Museum (Haw Kham), which sits at the centre of the peninsula. From here it's a 20–30-minute walk to Wat Xieng Thong at the tip, with several temples along the way. Morning hours (7–11 am) are coolest and best for photography; some temples close during the hottest part of the afternoon.",
        },
        {
          heading: "Key Stops",
          body: "The Royal Palace Museum displays Lao royal artefacts and the Phra Bang Buddha, the sacred image for which the town is named. Entry is 30,000 kip. Wat Mai's facade is covered in gilded relief panels depicting the Ramayana. Wat Visounnarath, founded in 1513, is the oldest active temple in the town, standing beside the watermelon-shaped That Makmo stupa. Wat Xieng Thong at the peninsula's tip is the architectural jewel — don't miss the 'Tree of Life' mosaic on its rear wall.",
        },
        {
          heading: "Practical Tips",
          body: "Cover knees and shoulders when entering temples. Slip-on shoes are most practical since you'll be removing them repeatedly. During the dry season, bamboo bridges span the Nam Khan River, letting you cross to the far bank (10,000 kip toll). Mekong-side cafes serve Lao coffee — thick drip coffee with condensed milk — and make ideal rest stops. In the evening, the Mekong sunset from a riverside restaurant terrace is the perfect end to the day.",
        },
      ],
      [
        { q: "How long does the temple walk take?", a: "Visiting five or six main temples takes 2–3 hours. Add cafe breaks and you have a pleasant half-day outing." },
        { q: "What's worth seeing in the Royal Palace Museum?", a: "The royal living quarters, the Phra Bang Buddha image, and diplomatic gifts from foreign governments. Photography is not allowed inside. Entry 30,000 kip (USD 1.80)." },
        { q: "When is the bamboo bridge open?", a: "Only during the dry season, roughly November to May. It's dismantled when the Nam Khan rises in the wet season. Crossing fee 10,000 kip." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 11. Yangon — Colonial Quarter Walk
  // ────────────────────────────────────────────────────────────────
  "yangon-colonial-quarter-walk": {
    ja: ja(MM_JA_CTA,
      "ヤンゴンのコロニアル建築散策 — 英国植民地時代の建物群を歩く",
      "ヤンゴンのダウンタウンに残る英国植民地時代の建築群を巡る街歩きガイド。スーレーパゴダ、ハイコート、ストランドホテル、ボーヂョーマーケットまで。",
      YANGON_COLONIAL_IMAGES[0],
      YANGON_COLONIAL_IMAGES,
      RGN_X,
      [
        {
          heading: "このルートの特徴",
          body: "ヤンゴンのダウンタウンには、東南アジアで最も多くの英国植民地時代の建築物が残っています。ハイコート（高等裁判所）、ストランドホテル、旧中央郵便局、市庁舎など、19世紀後半〜20世紀初頭のヴィクトリアン様式やエドワーディアン様式の建物が、修復されたものも朽ちかけたものも混在して並んでいます。通りの中心にはスーレーパゴダの金色の塔が輝き、植民地建築と仏教寺院が共存するヤンゴン独特の景観を形成しています。格子状の通りは歩きやすく、2〜3時間で主要スポットを回れます。",
        },
        {
          heading: "アクセスと起点",
          body: "ヤンゴン国際空港からダウンタウンまでタクシーで約45分（8,000〜10,000チャット）。Grabも利用可能です。スーレーパゴダを起点にすると、周囲の主要建築が徒歩圏内に収まります。ダウンタウンの通りはバンデューラ通り（東西）とマハバンデューラ通り（南北）を基準に格子状になっており、迷いにくい構造です。",
        },
        {
          heading: "主要スポット",
          body: "スーレーパゴダは2,000年以上の歴史を持つとされ、街の中心に位置する八角形の寺院です。入場料3,000チャット。ハイコートはヤンゴン最大のコロニアル建築で、赤レンガのファサードが印象的。ストランドホテルは1901年創業で、ロビーだけでも見学の価値があります。マハバンデューラ公園は独立記念碑が建つ憩いの場で、市庁舎の写真撮影にも最適。ボーヂョーアウンサンマーケット（スコットマーケット）は漆器、宝石、テキスタイルの買い物に最適で、涼しいアーケード内にあります。",
        },
        {
          heading: "実用情報",
          body: "ヤンゴンは年間を通じて暑く、特に3月〜5月は40度近くになります。ベストシーズンは11月〜2月の乾季。雨季（6月〜10月）はスコールが多いですが、雨上がりの濡れた建物は独特の美しさがあります。通貨はミャンマーチャットで、ATMは街中にあります。歩道は状態が悪い箇所が多く、穴や段差に注意してください。ボーヂョーマーケットは月曜と祝日が休業日です。寺院訪問時は靴と靴下を脱ぐ必要があります。",
        },
      ],
      [
        { q: "ヤンゴンのコロニアル建築は中に入れますか？", a: "ハイコートや旧中央郵便局など一部は外観のみ。ストランドホテルのロビーは宿泊者以外も見学可能。ボーヂョーマーケットは自由に入れます。" },
        { q: "スーレーパゴダの参拝時間は？", a: "早朝4:00〜22:00。外国人入場料は3,000チャット。自分の曜日に対応する祠でお参りするのがミャンマー式です。" },
        { q: "ダウンタウンの治安は？", a: "昼間は安全で歩きやすいエリアです。夜間も大通り沿いは問題ありませんが、暗い路地は避けましょう。歩道の状態が悪いので足元に注意。" },
      ],
    ),
    en: en(MM_EN_CTA,
      "Yangon Colonial Quarter Walk — British-Era Architecture in Downtown",
      "A walking guide to Yangon's downtown colonial district covering Sule Pagoda, the High Court, Strand Hotel, City Hall, Mahabandula Park, and Bogyoke Aung San Market.",
      YANGON_COLONIAL_IMAGES[0],
      YANGON_COLONIAL_IMAGES,
      RGN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Downtown Yangon contains the largest collection of British colonial buildings in Southeast Asia. The High Court, Strand Hotel, former General Post Office, and City Hall represent Victorian and Edwardian architecture in various states of repair — some meticulously restored, others slowly crumbling. At the centre stands Sule Pagoda, its golden spire rising above the traffic roundabout to create the defining contrast of Yangon's streetscape: Buddhist sacred site surrounded by imperial-era masonry. The grid-pattern streets are easy to navigate, and two to three hours covers the key sights.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Yangon International Airport to downtown is about 45 minutes by taxi (8,000–10,000 kyat) or Grab. Start at Sule Pagoda, which sits at the geographical centre of the grid. The main reference streets — Bandula Road running east-west and Mahabandula Road running north-south — make it hard to get lost.",
        },
        {
          heading: "Key Stops",
          body: "Sule Pagoda is an octagonal stupa said to be over 2,000 years old. Entry is 3,000 kyat. The High Court is Yangon's largest colonial structure, with a striking red-brick facade. The Strand Hotel, open since 1901, is worth a look even if you're not staying — the lobby is accessible to non-guests. Mahabandula Park holds the Independence Monument and provides the best angle on City Hall. Bogyoke Aung San Market (Scott Market) is the go-to spot for lacquerware, gemstones, and textiles, all under a covered arcade that keeps the heat at bay.",
        },
        {
          heading: "Practical Tips",
          body: "Yangon is hot year-round, peaking near 40°C from March to May. The dry season (November to February) is the most comfortable time to walk. In the monsoon (June to October), showers are frequent but the rain-slicked buildings have their own beauty. The currency is Myanmar kyat; ATMs are widespread. Pavements downtown are in poor repair — watch for holes and uneven surfaces. Bogyoke Market is closed Mondays and public holidays. Shoes and socks must be removed at all pagodas.",
        },
      ],
      [
        { q: "Can I go inside the colonial buildings?", a: "Some, like the High Court and old post office, are exterior-only. The Strand Hotel's lobby is open to non-guests. Bogyoke Market is freely accessible." },
        { q: "What are Sule Pagoda's visiting hours?", a: "4 am to 10 pm daily. Foreign-visitor entry fee is 3,000 kyat. The Burmese tradition is to pray at the shrine corresponding to the day of the week you were born." },
        { q: "Is downtown Yangon safe?", a: "Daytime is safe and easy to walk. Main roads are fine at night too, but avoid unlit side streets. Watch your step — pavement quality is poor throughout." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 12. Yangon — Shwedagon Pagoda Morning Walk
  // ────────────────────────────────────────────────────────────────
  "yangon-shwedagon-pagoda-walk": {
    ja: ja(MM_JA_CTA,
      "シュエダゴンパゴダと周辺の朝散歩 — ヤンゴンの黄金の丘を歩く",
      "ヤンゴンのシュエダゴンパゴダを早朝に訪れ、カンドージー湖とピープルズパークまで歩くガイド。ミャンマー最大の聖地の朝の光と静けさを体験。",
      YANGON_SHWEDAGON_IMAGES[0],
      YANGON_SHWEDAGON_IMAGES,
      RGN_X,
      [
        {
          heading: "このルートの特徴",
          body: "シュエダゴンパゴダはミャンマーで最も神聖な仏教聖地で、高さ99メートルの金色の仏塔はヤンゴンのどこからでも見えるランドマークです。2,500年以上の歴史があるとされ、仏陀の遺髪8本を納めているとの伝承があります。早朝の参拝がおすすめで、朝日を受けて輝く黄金の仏塔は息をのむ美しさです。参拝後はカンドージー湖まで歩き、湖面に映るパゴダの姿を楽しめます。",
        },
        {
          heading: "アクセスと起点",
          body: "ダウンタウンからタクシーで15分（3,000〜5,000チャット）。シュエダゴンパゴダには4つの入口がありますが、南入口（メイン）が最も分かりやすいです。エレベーターで上のテラスまで上がれるため、階段を避けることも可能です。開門は朝4:00で、日の出前に到着すると地元の参拝者と一緒に静かな雰囲気の中で参拝できます。",
        },
        {
          heading: "主要スポット",
          body: "メインの仏塔を中心に、大理石のテラスには数十の小さな祠、仏像、ベルなどが配置されています。自分の生まれた曜日に対応する祠でお参りするのがミャンマーの慣習です。テラスを一周するのに30〜45分。パゴダの南東にあるカンドージー湖は朝の散歩コースとして人気で、東岸からパゴダが湖面に映る構図が撮影できます。湖畔のカラウェイ・パレス（王室の船をかたどった建物）も見どころ。西側のピープルズパークは朝のエクササイズ場として賑わいます。",
        },
        {
          heading: "実用情報",
          body: "入場料は外国人10,000チャット（USD 5相当）。靴と靴下は境内全体で脱ぐ必要があり、大理石の地面は日中かなり熱くなるため、朝の訪問が快適です。服装は膝と肩を覆うものが必須。ドローン撮影は禁止です。写真撮影は自由ですが、仏像に背を向けたポーズは控えてください。境内は広いので水を持参し、日焼け止めも忘れずに。帰りにカンドージー湖を経由してダウンタウンに戻るなら、Grabを湖畔から呼ぶのが便利です。",
        },
      ],
      [
        { q: "シュエダゴンパゴダの入場料は？", a: "外国人10,000チャット（USD 5相当）。4つの入口のどこでもチケットを購入できます。カメラ持ち込みは無料。" },
        { q: "一番いい訪問時間は？", a: "早朝4:00〜7:00が最高です。参拝者が少なく、朝日に照らされた黄金の仏塔が最も美しく見えます。日中は地面の大理石が焼けて裸足では歩けないほど熱くなります。" },
        { q: "服装の制限はありますか？", a: "膝下丈のパンツまたはスカート、肩を覆うトップスが必須。靴と靴下は入口で脱ぎます。レンタルのロンジー（巻きスカート）もあります。" },
        { q: "カンドージー湖まで歩けますか？", a: "シュエダゴンの東口から徒歩15〜20分です。湖の東岸がパゴダのベストビューポイント。" },
      ],
    ),
    en: en(MM_EN_CTA,
      "Shwedagon Pagoda Morning Walk — Yangon's Golden Hill at Dawn",
      "A walking guide to Shwedagon Pagoda at sunrise and the surrounding Kandawgyi Lake and People's Park circuit — experiencing Myanmar's holiest site in the quiet morning light.",
      YANGON_SHWEDAGON_IMAGES[0],
      YANGON_SHWEDAGON_IMAGES,
      RGN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Shwedagon Pagoda is Myanmar's most sacred Buddhist site: a 99-metre gold-plated stupa said to be over 2,500 years old and to enshrine eight strands of the Buddha's hair. It dominates the Yangon skyline from every direction. Visiting at dawn — the pagoda opens at 4 am — means fewer crowds, cooler marble underfoot, and the extraordinary sight of the gilded stupa catching the first rays of sunlight. After the visit, a walk to Kandawgyi Lake lets you photograph the pagoda reflected in still water.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "From downtown, a taxi takes 15 minutes (3,000–5,000 kyat). The south entrance is the main one and the easiest to find. Lifts take you up to the terrace level if you prefer not to climb stairs. Arriving before sunrise puts you among the local devotees in the quietest, most atmospheric window of the day.",
        },
        {
          heading: "Key Stops",
          body: "The marble terrace surrounding the main stupa holds dozens of smaller shrines, Buddha images, and bells. Burmese tradition is to pray at the planetary post that corresponds to the day of the week you were born. A full circuit of the terrace takes 30–45 minutes. Southeast of the pagoda, Kandawgyi Lake is a popular morning exercise route; the eastern shore gives the best reflection shot. Karaweik Palace, a concrete replica of a royal barge on the lake, is worth a glance. People's Park on the western side fills with joggers and tai chi groups each morning.",
        },
        {
          heading: "Practical Tips",
          body: "Foreign-visitor entry is 10,000 kyat (about USD 5). Shoes and socks must be removed for the entire compound — the marble gets painfully hot in the afternoon sun, which is another reason to go early. Knees and shoulders must be covered; longyi wraps are available to borrow. Drone photography is prohibited. Still photography is fine, but avoid posing with your back to a Buddha image. Bring water and sunscreen. To return downtown via Kandawgyi Lake, order a Grab from the lakefront.",
        },
      ],
      [
        { q: "How much is Shwedagon Pagoda entry?", a: "10,000 kyat (about USD 5) for foreign visitors, payable at any of the four entrances. Camera use is free." },
        { q: "When is the best time to visit?", a: "Dawn, between 4 and 7 am. Fewer visitors, cooler marble, and the golden stupa lit by the first sunlight. By midday the barefoot marble is painfully hot." },
        { q: "What are the dress requirements?", a: "Long trousers or a skirt below the knee, and a top covering the shoulders. Shoes and socks come off at the entrance. Longyi wraps can be borrowed." },
        { q: "Can I walk to Kandawgyi Lake from Shwedagon?", a: "Yes, it's 15–20 minutes on foot from the east entrance. The eastern shore of the lake offers the best view of the pagoda's reflection." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 13. Mumbai — Colaba Art Deco and Cafes
  // ────────────────────────────────────────────────────────────────
  "mumbai-colaba-walk": {
    ja: ja(IN_JA_CTA,
      "コラバのアートデコ建築とカフェ散策 — ムンバイの海沿いを歩く",
      "ムンバイ・コラバ地区のインド門、タージマハルホテル、コラバコーズウェイ、カラゴダのアート地区を巡る街歩きガイド。",
      MUMBAI_COLABA_IMAGES[0],
      MUMBAI_COLABA_IMAGES,
      BOM_X,
      [
        {
          heading: "このルートの特徴",
          body: "コラバはムンバイ最南端の半島に位置し、インドの玄関口であるインド門（ゲートウェイ・オブ・インディア）がランドマークです。植民地時代のアートデコ建築と現代のカフェ文化が共存するエリアで、タージマハルパレスホテルの壮麗な外観、コラバコーズウェイの賑やかな露店、カラゴダのギャラリー街が徒歩圏内に収まります。早朝にはサスーンドック（漁港）で水揚げの活気を見ることもできます。インドの大都市の中でもコラバは歩きやすいエリアです。",
        },
        {
          heading: "アクセスと起点",
          body: "チャトラパティ・シヴァージー国際空港からコラバまでタクシーで約1時間（Rs 600〜800）。ムンバイのローカル鉄道チャーチゲート駅からはバスまたはタクシーで15分。インド門を起点にすると、そこからコラバコーズウェイを北に歩いてカラゴダまで一直線のルートになります。",
        },
        {
          heading: "主要スポット",
          body: "インド門は1924年建設のアーチで、アラビア海を背景に写真映えするスポットです。隣接するタージマハルパレスホテルは1903年開業で、ロビーは宿泊者以外でも見学可能。コラバコーズウェイには書店、カフェ、露店が並び、レオポルドカフェは1871年創業の旅行者の聖地です。カラゴダ地区はNGMA（国立近代美術館）やギャラリーが集まるアート地区で、毎年2月のカラゴダ・アートフェスティバルは街全体がギャラリーになります。",
        },
        {
          heading: "実用情報",
          body: "ムンバイは10月〜2月が乾季で気温25〜32度と比較的快適。モンスーン期（6月〜9月）は豪雨で道路が冠水することがあるため注意。コラバは観光客が多く治安は良好ですが、インド門周辺の客引きや「無料ガイド」には毅然と断ってください。飲料水は必ずボトルウォーターを。現金とカード両方使える店が増えていますが、露店や小さなカフェはRs現金のみです。UPIモバイル決済も普及しています。",
        },
      ],
      [
        { q: "インド門の入場料は？", a: "インド門自体は無料。周辺の港からエレファンタ島へのボートはRs 200程度です。" },
        { q: "コラバでおすすめのカフェは？", a: "レオポルドカフェは歴史的な名所。カラゴダ周辺にはサードウェーブコーヒーショップも増えています。イラニカフェ（パールシー文化のカフェ）も独特の雰囲気です。" },
        { q: "サスーンドックは朝何時に行けばいいですか？", a: "5:00〜7:00が水揚げのピーク。魚の匂いが強烈なので覚悟して行ってください。日曜は休漁のため静かです。" },
      ],
    ),
    en: en(IN_EN_CTA,
      "Colaba Art Deco and Cafe Walk — Mumbai's Southern Peninsula",
      "A walking guide to Mumbai's Colaba district covering the Gateway of India, Taj Mahal Palace Hotel, Colaba Causeway, Kala Ghoda art quarter, and the early-morning Sassoon Docks fish market.",
      MUMBAI_COLABA_IMAGES[0],
      MUMBAI_COLABA_IMAGES,
      BOM_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Colaba is the southernmost tip of Mumbai's peninsula and home to the Gateway of India, the city's most recognisable landmark. Colonial-era Art Deco facades line the streets alongside modern cafes and galleries, while the Taj Mahal Palace Hotel anchors the waterfront with more than a century of history. From the bustling stalls of Colaba Causeway to the gallery-lined lanes of the Kala Ghoda art district, the walk covers Mumbai's layered identity in a compact, pedestrian-friendly stretch. At dawn, Sassoon Docks provides a raw, photogenic glimpse of the city's working harbour.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Chhatrapati Shivaji International Airport to Colaba is about an hour by taxi (Rs 600–800). From Churchgate station on the Western Railway, a bus or taxi takes 15 minutes. Start at the Gateway of India and walk north along Colaba Causeway toward Kala Ghoda — the route follows a straight line and is hard to get lost on.",
        },
        {
          heading: "Key Stops",
          body: "The Gateway of India, built in 1924, frames views of the Arabian Sea and is best photographed in the morning light. The Taj Mahal Palace Hotel next door has been operating since 1903 — its lobby is open to non-guests. Colaba Causeway is a lively strip of bookshops, cafes, and street stalls; Leopold Cafe, founded in 1871, is a traveller landmark. Kala Ghoda's galleries include the NGMA (National Gallery of Modern Art), and the annual Kala Ghoda Arts Festival in February transforms the streets into an open-air exhibition.",
        },
        {
          heading: "Practical Tips",
          body: "October to February is the dry season with temperatures of 25–32°C. During monsoon (June to September) heavy rain can flood streets, so plan accordingly. Colaba is tourist-heavy and generally safe, but decline unsolicited 'free guides' around the Gateway — they steer you toward commission-earning shops. Drink only bottled water. Card payments are increasingly accepted, but street stalls and small cafes still take cash in rupees. UPI mobile payments are widespread.",
        },
      ],
      [
        { q: "Is there an entry fee for the Gateway of India?", a: "No, the Gateway is free to visit. Boats to Elephanta Island leave from the adjacent jetty and cost about Rs 200." },
        { q: "Best cafe in Colaba?", a: "Leopold Cafe is the historic landmark. Around Kala Ghoda you'll find third-wave coffee shops. Irani cafes — a Parsi-Zoroastrian tradition — offer a unique atmosphere and chai." },
        { q: "What time should I visit Sassoon Docks?", a: "5–7 am for the peak fish-landing activity. Be prepared for strong smells. Sundays are rest days and the docks are quiet." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 14. Mumbai — Fort Area Victorian Walk
  // ────────────────────────────────────────────────────────────────
  "mumbai-fort-area-walk": {
    ja: ja(IN_JA_CTA,
      "フォートエリアのヴィクトリアン建築散歩 — ムンバイの歴史的中心部を歩く",
      "ムンバイ・フォートエリアのチャトラパティ・シヴァージー・ターミナス、フローラファウンテン、ラジャバイ時計塔、ホーニマンサークルを巡るガイド。",
      MUMBAI_FORT_IMAGES[0],
      MUMBAI_FORT_IMAGES,
      BOM_X,
      [
        {
          heading: "このルートの特徴",
          body: "フォートエリアはかつて東インド会社の城砦があった場所で、ムンバイのビジネス中心地です。チャトラパティ・シヴァージー・ターミナス（CST）はユネスコ世界遺産に登録されたヴィクトリアン・ゴシック建築の傑作で、現役の鉄道駅として毎日300万人以上が利用しています。周辺にはボンベイ高等裁判所、ムンバイ大学のラジャバイ時計塔、フローラファウンテンなどの壮麗な建築が集中しており、19世紀の大英帝国の建築遺産を間近で見られる世界でも数少ないエリアです。",
        },
        {
          heading: "アクセスと起点",
          body: "CST駅自体が最もアクセスしやすい起点です。ムンバイのローカル鉄道セントラルラインの終点で、チャーチゲート駅（ウエスタンライン）からも徒歩10分。空港からはタクシーで1時間弱。CSTの壮麗なファサードを正面から眺めてから、南に向かってフォートエリアを歩くルートがおすすめです。",
        },
        {
          heading: "主要スポット",
          body: "CSTは1888年完成のゴシック・リバイバル建築で、正面のステンドグラスと尖塔は圧巻。外観だけでも30分は費やせます。ボンベイ高等裁判所は1878年完成で、尖塔とアーチが美しい。ムンバイ大学のラジャバイ時計塔はビッグベンをモデルにした85メートルの塔で、一般公開は限定的です。フローラファウンテンはフォート地区の中心にある装飾噴水。ホーニマンサークルはネオクラシカル建築に囲まれた静かな庭園で、ビジネス街の喧騒から離れた休憩スポットです。",
        },
        {
          heading: "実用情報",
          body: "フォートエリアは平日のビジネスアワー（10:00〜17:00）に最も活気がありますが、建築撮影は日曜の早朝が人通りが少なく最適です。CSTの内部は通常の乗客として入場可能で、チケット不要でコンコースを歩けます。建築ツアーは「Mumbai Heritage Walks」が専門ガイド付きで催行しています。ムンバイの交通は激しいため、横断歩道でも車に十分注意してください。暑さ対策の水分補給と、カメラのバッテリー予備を忘れずに。",
        },
      ],
      [
        { q: "CSTの中に入れますか？", a: "はい、一般乗客として入場可能です。コンコースやプラットフォームを歩けますが、セキュリティチェックがあります。駅舎内部のステンドグラスやタイルワークも必見です。" },
        { q: "ラジャバイ時計塔は見学できますか？", a: "一般公開は限定的で、ムンバイ大学の許可が必要な場合があります。外観はフォートエリアのどこからでも見えます。" },
        { q: "フォートエリアの散策に何時間必要ですか？", a: "主要スポットを外観中心に回るなら2〜3時間。建築好きなら半日以上楽しめます。" },
      ],
    ),
    en: en(IN_EN_CTA,
      "Fort Area Victorian Walk — Mumbai's Architectural Centrepiece",
      "A walking guide to Mumbai's Fort district covering the UNESCO-listed Chhatrapati Shivaji Terminus, Flora Fountain, Rajabai Clock Tower, Bombay High Court, and the quiet Horniman Circle Garden.",
      MUMBAI_FORT_IMAGES[0],
      MUMBAI_FORT_IMAGES,
      BOM_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "The Fort area is where the British East India Company once had its fortifications, and today it remains Mumbai's business centre. Chhatrapati Shivaji Terminus (CST), a UNESCO World Heritage Site, is the pinnacle of Victorian Gothic Revival architecture and still functions as a railway station used by over three million commuters daily. Surrounding it are the Bombay High Court, the University of Mumbai's Rajabai Clock Tower, Flora Fountain, and a ring of neoclassical commercial buildings — one of the world's most concentrated displays of 19th-century imperial architecture.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "CST station itself is the most accessible starting point — it's the southern terminus of the Central Railway local line, and Churchgate station (Western Railway) is a 10-minute walk away. From the airport, a taxi takes just under an hour. Begin by studying CST's facade from directly across the road, then walk south through the Fort grid.",
        },
        {
          heading: "Key Stops",
          body: "CST, completed in 1888, has stained-glass windows, turrets, and sculptural details that justify at least 30 minutes of exterior observation. The Bombay High Court (1878) is notable for its spires and pointed arches. The 85-metre Rajabai Clock Tower at Mumbai University was modelled on Big Ben; public access is limited. Flora Fountain is the ornamental centrepiece of the Fort business district. Horniman Circle Garden is a green, quiet space ringed by neoclassical facades — a welcome break from street noise.",
        },
        {
          heading: "Practical Tips",
          body: "The area is liveliest on weekday business hours (10 am–5 pm), but early Sunday mornings offer the clearest sightlines for architecture photography. CST can be entered as an ordinary rail passenger — walk the concourse freely after security screening. Guided heritage walks are run by 'Mumbai Heritage Walks' with expert commentary. Mumbai traffic is aggressive, so take care even at pedestrian crossings. Carry water for hydration and a spare camera battery.",
        },
      ],
      [
        { q: "Can I go inside CST?", a: "Yes, as a regular rail user. Walk through the concourse and platforms after a standard security check. The interior stained glass and tilework are worth seeing." },
        { q: "Is Rajabai Clock Tower open to visitors?", a: "Public access is restricted and may require permission from the University of Mumbai. The exterior is visible from throughout the Fort area." },
        { q: "How long does the Fort walk take?", a: "Two to three hours for the main stops at a walking pace. Architecture enthusiasts can easily spend half a day." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 15. Delhi — Chandni Chowk Old Delhi
  // ────────────────────────────────────────────────────────────────
  "delhi-old-delhi-chandni-chowk-walk": {
    ja: ja(IN_JA_CTA,
      "オールドデリーのチャンドニーチョーク散策 — ムガル帝国の旧都を歩く",
      "デリーのチャンドニーチョーク、レッドフォート、ジャマーマスジッド、パランテワーリーガリ、カリバオリのスパイス市場を巡る街歩きガイド。",
      DELHI_CHANDNI_CHOWK_IMAGES[0],
      DELHI_CHANDNI_CHOWK_IMAGES,
      DEL_X,
      [
        {
          heading: "このルートの特徴",
          body: "チャンドニーチョークは17世紀にムガル帝国のシャー・ジャハーン帝が造った大通りで、インドで最も古く最も混雑する市場のひとつです。レッドフォート（ラール・キラー）のラホリ門から始まる通りには、銀細工、布地、電子部品、そして何世紀も続く食堂が軒を連ねます。圧倒的な人波、リクシャ、バイク、牛が同じ道を行き交う混沌とした光景は、インドのエネルギーを最も生々しく体験できる場所です。感覚過負荷になりやすいので、午前中の比較的落ち着いた時間帯に訪れるのがおすすめです。",
        },
        {
          heading: "アクセスと起点",
          body: "デリーメトロ・イエローラインのチャンドニーチョーク駅が最寄り。駅を出ると目の前がチャンドニーチョーク通りです。レッドフォートを起点にするなら、メトロ・バイオレットラインのラールキラー駅を利用してください。旧市街は車での移動が非常に困難なため、メトロ＋徒歩が最も効率的です。リクシャーを使う場合は乗車前に料金を交渉してください。",
        },
        {
          heading: "主要スポット",
          body: "レッドフォートはユネスコ世界遺産のムガル帝国の城砦で、毎年独立記念日（8月15日）に首相が演説する場所です。入場料Rs 35（外国人Rs 500）。ジャマーマスジッドはインド最大のモスクで、中庭には25,000人が収容可能。ミナレットからの眺望が素晴らしい（Rs 200）。パランテワーリーガリは1870年代から続くパランタ（詰め物入りパン）の名店通り。カリバオリはアジア最大のスパイス卸市場で、ターメリックと唐辛子の香りが充満しています。グルドワラ・シスガンジ・サヒブは歴史的なシク教寺院です。",
        },
        {
          heading: "実用情報",
          body: "チャンドニーチョークは平日・休日問わず混雑しますが、日曜は一部の店が閉まります。朝8時〜10時が比較的歩きやすい時間帯。ジャマーマスジッドは礼拝時間中（特に金曜昼）は観光不可。夏（4月〜6月）は45度を超えることがあるため、冬季（11月〜2月）の訪問を強くおすすめします。スリや詐欺に注意し、貴重品は最小限に。露店での食事は火が通ったものを選び、生水は絶対に飲まないでください。手指消毒ジェルがあると便利です。",
        },
      ],
      [
        { q: "レッドフォートの入場料は？", a: "インド人Rs 35、外国人Rs 500。音と光のショー（英語）は夕方にあり、別途Rs 80。月曜休館。" },
        { q: "チャンドニーチョークでの食事は安全ですか？", a: "火を通した料理を出す有名店なら概ね安全です。パランテワーリーガリの老舗やカリームのケバブは定番。生水と生野菜のサラダは避けてください。" },
        { q: "リクシャーの料金相場は？", a: "チャンドニーチョーク周辺の短距離ならRs 30〜80。乗車前に料金を確定させてください。メーターはないので交渉が必要です。" },
        { q: "ジャマーマスジッドは無料で入れますか？", a: "入場は無料ですが、カメラ持ち込みはRs 300。ミナレットの登頂はRs 200。金曜の昼（12:00〜13:30頃）は礼拝のため観光不可。" },
      ],
    ),
    en: en(IN_EN_CTA,
      "Chandni Chowk Walk — Through the Heart of Old Delhi",
      "A walking guide to Old Delhi's Chandni Chowk covering the Red Fort, Jama Masjid, Paranthe Wali Gali's legendary fried breads, and Asia's largest spice market at Khari Baoli.",
      DELHI_CHANDNI_CHOWK_IMAGES[0],
      DELHI_CHANDNI_CHOWK_IMAGES,
      DEL_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Chandni Chowk is the grand avenue laid out by Mughal emperor Shah Jahan in the 17th century, and today it is one of India's oldest and most frenetically busy markets. From the Red Fort's Lahori Gate, the street stretches westward in a river of people, cycle-rickshaws, motorbikes, and occasionally cattle. Silver merchants, cloth dealers, electronics vendors, and centuries-old food stalls compete for space. It is sensory overload in the best possible sense — the most unfiltered experience of Indian urban energy you can find. Visit in the morning when the chaos is at a manageable level.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Delhi Metro Yellow Line to Chandni Chowk station puts you directly on the main road. For the Red Fort, use Lal Qila station on the Violet Line. Driving in Old Delhi is near-impossible, so the metro plus walking is the only practical combination. If you take a cycle-rickshaw, negotiate the fare before boarding.",
        },
        {
          heading: "Key Stops",
          body: "The Red Fort is a UNESCO World Heritage Mughal citadel where the Prime Minister delivers the Independence Day address each August 15. Entry is Rs 35 for Indians, Rs 500 for foreigners. Jama Masjid, India's largest mosque, has a courtyard capacity of 25,000; the minaret climb (Rs 200) offers sweeping views. Paranthe Wali Gali has been serving stuffed paranthas since the 1870s. Khari Baoli is Asia's largest wholesale spice market — the air is thick with turmeric and chilli. Gurudwara Sis Ganj Sahib is a historic Sikh temple open to all.",
        },
        {
          heading: "Practical Tips",
          body: "Chandni Chowk is crowded every day; some shops close on Sundays. The most walkable window is 8–10 am. Jama Masjid closes to tourists during prayer times (especially Friday midday). Summer temperatures (April to June) exceed 45°C, so winter (November to February) is strongly recommended. Guard against pickpockets and carry only what you need. Eat only cooked food from well-known stalls, avoid raw salads, and never drink tap water. Hand sanitiser is useful.",
        },
      ],
      [
        { q: "What is Red Fort entry?", a: "Rs 35 for Indian visitors, Rs 500 for foreign nationals. A sound-and-light show (English) runs in the evening for Rs 80. Closed Mondays." },
        { q: "Is street food in Chandni Chowk safe?", a: "Stick to cooked dishes from well-established stalls — the paranthas on Paranthe Wali Gali and Karim's kebabs are safe bets. Avoid raw salads and tap water." },
        { q: "How much should a rickshaw cost?", a: "Rs 30–80 for short hops around Chandni Chowk. Agree on the fare before climbing in — there are no metres." },
        { q: "Is Jama Masjid free to enter?", a: "Entry is free. Camera charge is Rs 300. Minaret access is Rs 200. The mosque closes to tourists during Friday midday prayers (roughly 12–1:30 pm)." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 16. Delhi — Lodhi Garden Morning Walk
  // ────────────────────────────────────────────────────────────────
  "delhi-lodhi-garden-walk": {
    ja: ja(IN_JA_CTA,
      "ロディガーデンと遺跡の朝散歩 — デリーの緑のオアシスを歩く",
      "デリーのロディガーデンを早朝に散策するガイド。15世紀のムガル朝墳墓群、朝のジョギングコース、バードウォッチングポイントを紹介。",
      DELHI_LODHI_GARDEN_IMAGES[0],
      DELHI_LODHI_GARDEN_IMAGES,
      DEL_X,
      [
        {
          heading: "このルートの特徴",
          body: "ロディガーデンはニューデリー中心部にある90エーカー（約36ヘクタール）の公園で、15世紀のサイイド朝とロディ朝の墳墓群が芝生と大木の間に点在しています。デリーの喧騒から完全に隔離された静かな空間で、朝は地元のジョガーやヨガグループ、バードウォッチャーで賑わいます。インドの首都にこれほど広大な緑地と中世の遺跡が共存する場所は他にありません。入場無料で、朝5時から開園しているため、早朝の散歩に最適です。",
        },
        {
          heading: "アクセスと起点",
          body: "デリーメトロ・ジョール・バーグ駅から徒歩10分。ロディロード入口またはマックス・ミュラー・マーグ入口のどちらからでもアクセスできます。Uberまたはオート・リクシャーでの移動も便利で、「Lodhi Garden」で検索すれば正確に到着します。公園内は舗装された遊歩道があり、平坦で歩きやすいです。",
        },
        {
          heading: "主要スポット",
          body: "バラグンバドはドーム型の墳墓と隣接するモスクのセットで、1490年頃の建造です。シシュグンバドはかつて青い釉薬タイルで覆われていた痕跡が残ります。ムハンマド・シャーの墓はこの庭園で最も古い建造物（1444年）で、八角形のプランが特徴的です。公園内には100種以上の鳥が確認されており、特に冬季（11月〜2月）はインドクジャクやキツツキなどが見られます。ガーデン北端のインディアン・ハビタット・センターにはギャラリーとカフェがあります。",
        },
        {
          heading: "実用情報",
          body: "開園時間は朝5:00〜20:00（10月〜3月は6:00〜）。入場無料。ベストタイムは朝6:00〜8:00で、涼しく空いています。冬季（12月〜1月）の朝は10度以下になることもあるため、軽い上着を持参してください。園内にはベンチが多数ありますが売店は限られるため、水を持参するのがおすすめです。犬の散歩は許可されています。自転車の乗り入れは不可。ピクニックをしている地元の人も多く、リラックスした雰囲気です。",
        },
      ],
      [
        { q: "ロディガーデンの入場料は？", a: "無料です。朝5:00（冬季6:00）〜20:00まで開園。" },
        { q: "一周するのにどのくらいかかりますか？", a: "遊歩道をゆっくり歩いて1〜1.5時間。墳墓を内部まで見学するなら2時間は見てください。" },
        { q: "バードウォッチングに最適な季節は？", a: "冬季（11月〜2月）が最良で、渡り鳥が加わり100種以上が観察できます。早朝6:00〜7:00がベスト。" },
      ],
    ),
    en: en(IN_EN_CTA,
      "Lodhi Garden Morning Walk — Medieval Tombs in Delhi's Green Heart",
      "A morning walking guide to Lodhi Gardens in New Delhi covering 15th-century Sayyid and Lodi dynasty tombs, jogging trails, and birdwatching spots in the capital's most peaceful urban park.",
      DELHI_LODHI_GARDEN_IMAGES[0],
      DELHI_LODHI_GARDEN_IMAGES,
      DEL_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Lodhi Gardens is a 90-acre park in the heart of New Delhi where 15th-century tombs of the Sayyid and Lodi dynasties stand amid manicured lawns and ancient trees. It is the rare Delhi experience that is both historically significant and blissfully quiet — a green sanctuary walled off from the city's noise and traffic. Mornings bring joggers, yoga groups, and birdwatchers, but the park never feels crowded. Entry is free, and the gates open at 5 am, making it ideal for an early walk.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Jor Bagh metro station is a 10-minute walk from the park. Either the Lodi Road gate or the Max Mueller Marg gate works as a starting point. Uber and auto-rickshaws recognise 'Lodhi Garden' as a destination. The park's paved paths are flat and easy to navigate.",
        },
        {
          heading: "Key Stops",
          body: "Bara Gumbad is a large domed tomb with an adjacent mosque, built around 1490. Shish Gumbad retains traces of the blue-glazed tiles that once covered its dome. The Tomb of Muhammad Shah, dating to 1444, is the earliest structure in the garden and features an octagonal plan. The park is home to more than 100 bird species — Indian peafowl, woodpeckers, and parakeets are regulars, with winter migrants swelling the count. The India Habitat Centre at the north end has galleries and a cafe.",
        },
        {
          heading: "Practical Tips",
          body: "Open 5 am to 8 pm (6 am in the October–March winter months). Free entry. The sweet spot is 6–8 am when it's cool and uncrowded. Delhi winters (December–January) can drop below 10°C in the early morning, so bring a light jacket. There are benches throughout but limited refreshment stalls — carry water. Dogs are allowed on leads; bicycles are not. The atmosphere is relaxed, with plenty of locals picnicking and reading.",
        },
      ],
      [
        { q: "Is Lodhi Gardens free?", a: "Yes, completely free. Open from 5 am (6 am in winter) to 8 pm daily." },
        { q: "How long does a full loop take?", a: "A leisurely walk around the main path takes 1–1.5 hours. Add another 30 minutes if you explore each tomb's interior." },
        { q: "Best season for birdwatching?", a: "Winter (November to February) is peak time, when migratory birds join the resident population and the count exceeds 100 species. Early morning 6–7 am is optimal." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 17. Istanbul — Balat and Fener
  // ────────────────────────────────────────────────────────────────
  "istanbul-balat-fener-walk": {
    ja: ja(TR_JA_CTA,
      "バラットとフェネルのカラフルな街並み散策 — イスタンブールの旧ユダヤ・ギリシャ地区",
      "イスタンブールのバラットとフェネル地区を歩くガイド。カラフルな住宅街、正教会総主教座、ブルガリア鉄の教会、カリエ・モスクのビザンチンモザイクまで。",
      ISTANBUL_BALAT_IMAGES[0],
      ISTANBUL_BALAT_IMAGES,
      IST_X,
      [
        {
          heading: "このルートの特徴",
          body: "バラットとフェネルはイスタンブール旧市街の金角湾沿いに位置する歴史地区で、かつてはユダヤ人やギリシャ正教徒が暮らしたコスモポリタンな界隈でした。近年はカラフルに塗り替えられた木造住宅がSNSで人気を集め、独立系カフェやアンティークショップが増えています。観光客で混雑するスルタンアフメット地区とは異なり、地元の生活感が色濃く残る下町の雰囲気が魅力です。坂道が多いので歩きやすい靴が必須です。",
        },
        {
          heading: "アクセスと起点",
          body: "バラットへのアクセスはバスまたはフェリーが便利。エミノニュからバス（99番など）で約15分、またはフェネル・バラット停留所で下車。金角湾フェリーのバラット船着場もあります。メトロはやや離れているため、タクシーかバスの利用がおすすめです。フェネルの正教会総主教座を起点にして南にバラット方面に歩くと下り坂中心で楽です。",
        },
        {
          heading: "主要スポット",
          body: "コンスタンティノープル全地総主教座は4世紀以来の正教会の精神的中心で、外観は控えめですが内部は壮麗です。ブルガリアの聖ステファン教会はウィーンで製造された鋳鉄製の教会で、世界でも珍しい構造です。カリエ・モスク（旧コーラ修道院）には世界最高級のビザンチンモザイクとフレスコ画が残っています。バラットの丘の上にはカラフルな住宅が並び、写真スポットとして人気。途中にはアンティークショップやサードウェーブコーヒー店が点在しています。",
        },
        {
          heading: "実用情報",
          body: "バラットは坂道が多く、石畳の道も不揃いなので、スニーカーなどの歩きやすい靴が必須です。2〜3時間あれば主要スポットを回れます。教会やモスクの訪問時は露出の少ない服装が求められます。カリエ・モスクはモスクとして再開されているため、礼拝時間中は観光不可の場合があります。金角湾沿いにはシンプルなトルコ式朝食を出すカフェがあり、休憩スポットとしておすすめです。イスタンブールカードがあればバスやフェリーの支払いがスムーズです。",
        },
      ],
      [
        { q: "バラットは安全ですか？", a: "昼間は安全で、最近はカフェやショップが増えて活気があります。夜間の裏路地は照明が少ないため、大通り沿いを歩くのがベストです。" },
        { q: "カリエ・モスクは見学できますか？", a: "モスクとして利用されているため、礼拝時間外に見学可能。モザイクとフレスコ画は見られますが、一部覆われている場合があります。入場無料。" },
        { q: "バラットとスルタンアフメットの違いは？", a: "スルタンアフメットは主要観光地が集中する「ザ・観光エリア」。バラットは地元の生活が感じられる下町で、最近インスタ映えスポットとして人気上昇中です。" },
      ],
    ),
    en: en(TR_EN_CTA,
      "Balat and Fener Walk — Istanbul's Colourful Historic Neighbourhoods",
      "A walking guide to Istanbul's Balat and Fener districts covering colourful townhouses, the Ecumenical Patriarchate, the Bulgarian Iron Church, and the Byzantine mosaics at Chora Church (Kariye Mosque).",
      ISTANBUL_BALAT_IMAGES[0],
      ISTANBUL_BALAT_IMAGES,
      IST_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Balat and Fener are historic neighbourhoods on the Golden Horn in Istanbul's old city, formerly home to Jewish and Greek Orthodox communities. In recent years, brightly painted wooden houses have turned the streets into an Instagram phenomenon, and independent cafes, antique shops, and art spaces have followed. Unlike the tourist-saturated Sultanahmet district, Balat retains a lived-in, working-class character that gives the walk authenticity. Be prepared for hills — the terrain is steep and the cobblestones uneven.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Bus from Eminonu (route 99 or similar) takes about 15 minutes; get off at Fener-Balat. A Golden Horn ferry also stops at Balat pier. The metro is a bit far, so bus or taxi is easier. Starting at the Ecumenical Patriarchate in Fener and walking south toward Balat keeps you on a mostly downhill route.",
        },
        {
          heading: "Key Stops",
          body: "The Ecumenical Patriarchate of Constantinople has been the spiritual centre of Orthodox Christianity since the 4th century — the exterior is modest but the interior is magnificent. The Bulgarian St Stephen Church is a rare prefabricated cast-iron church manufactured in Vienna. Kariye Mosque (formerly Chora Church) houses some of the finest surviving Byzantine mosaics and frescoes. The hillside streets of Balat, lined with pastel-painted houses, are the area's signature photo spots. Antique dealers and third-wave coffee shops are scattered between them.",
        },
        {
          heading: "Practical Tips",
          body: "Wear comfortable shoes — the hills are steep and the cobblestones irregular. Two to three hours covers the main sights. Modest clothing is required at churches and mosques. Kariye Mosque has been reconverted to a mosque, so tourist access may be restricted during prayer times. Cafes along the Golden Horn waterfront serve traditional Turkish breakfast and make good rest stops. An Istanbulkart stored-value card makes bus and ferry payments seamless.",
        },
      ],
      [
        { q: "Is Balat safe?", a: "Daytime is perfectly safe and increasingly lively with new cafes and shops. At night, stick to main streets as some back lanes are poorly lit." },
        { q: "Can I visit Kariye Mosque?", a: "Yes, outside prayer times. It's free. The mosaics and frescoes are visible, though some panels may be covered." },
        { q: "How does Balat differ from Sultanahmet?", a: "Sultanahmet is the tourist core with the major monuments. Balat is a residential neighbourhood with local character and rising popularity for its colourful streets and independent businesses." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 18. Istanbul — Kadikoy Asian Side
  // ────────────────────────────────────────────────────────────────
  "istanbul-kadikoy-walk": {
    ja: ja(TR_JA_CTA,
      "カドゥキョイのアジア側マーケット散歩 — イスタンブールの隠れた食の宝庫",
      "イスタンブール・アジア側のカドゥキョイ地区を歩くガイド。青空市場、バハリエ通り、モダ海岸の散歩道を巡るフードウォーク。",
      ISTANBUL_KADIKOY_IMAGES[0],
      ISTANBUL_KADIKOY_IMAGES,
      IST_X,
      [
        {
          heading: "このルートの特徴",
          body: "カドゥキョイはイスタンブールのアジア側に位置する活気ある地区で、ヨーロッパ側の観光エリアとは異なる地元密着の雰囲気があります。フェリーターミナル周辺に広がる生鮮市場は、トルコのチーズ、オリーブ、ドライフルーツ、スパイスが山積みで、食べ歩きの宝庫です。バハリエ通りは歩行者天国のショッピングストリートで、モダ海岸の散歩道はプリンセス諸島を見渡す穏やかな海辺の散歩コースです。フェリーでのアクセス自体がボスフォラス海峡を横断する小旅行になります。",
        },
        {
          heading: "アクセスと起点",
          body: "エミノニュからカドゥキョイフェリーで約20分。フェリー自体がボスフォラス海峡と旧市街の眺望を楽しめる体験です。マルマライ線（海底鉄道）のアイリリクチェシメ駅からも徒歩10分。カドゥキョイの船着場を起点に、市場エリア→バハリエ通り→モダ海岸の順に歩くのがおすすめです。",
        },
        {
          heading: "主要スポット",
          body: "カドゥキョイ市場はフェリーターミナルのすぐそばに広がる屋内外の市場で、新鮮な魚、チーズ、オリーブの試食を楽しめます。バハリエ通り（Bahariye Caddesi）は歩行者天国のメインストリートで、衣料品店、本屋、カフェが並びます。牡牛の像があるカドゥキョイ広場はランドマーク。モダ地区は海沿いの散歩道（約3km）が続き、途中にカフェやベンチがあります。プリンセス諸島の眺望も楽しめます。",
        },
        {
          heading: "実用情報",
          body: "市場は午前中（9:00〜12:00）が最も活気があります。日曜は休業の店もあるため、平日か土曜がベスト。モダ海岸の散歩は夕方のゴールデンアワーがおすすめで、対岸のヨーロッパ側のスカイラインが美しく見えます。イスタンブールカードでフェリーに乗ると片道約7TL（現金で乗るより安い）。カドゥキョイは治安が良く、夜間の散策も問題ありません。市場での買い物は現金が便利ですが、多くのカフェやレストランではカード決済も可能です。",
        },
      ],
      [
        { q: "カドゥキョイへのフェリーは何分おきに出ていますか？", a: "エミノニュからは約20分間隔で運行。所要約20分。イスタンブールカードで乗れます。夕方のフェリーからの景色は特におすすめです。" },
        { q: "カドゥキョイ市場でのおすすめは？", a: "トルコのホワイトチーズ、カラマタオリーブ、干しイチジク、トルコ風紅茶（チャイ）がおすすめ。魚サンド（バルック・エクメキ）も定番。" },
        { q: "モダ海岸の散歩道はどのくらいの距離ですか？", a: "約3kmで、のんびり歩いて1時間弱。途中のカフェで休憩しながら歩くのがベストです。" },
      ],
    ),
    en: en(TR_EN_CTA,
      "Kadikoy Walk — Istanbul's Asian-Side Food Market and Waterfront",
      "A walking guide to Istanbul's Kadikoy district on the Asian shore covering the produce market, Bahariye Caddesi shopping street, and the Moda waterfront promenade with views of the Princes' Islands.",
      ISTANBUL_KADIKOY_IMAGES[0],
      ISTANBUL_KADIKOY_IMAGES,
      IST_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Kadikoy sits on Istanbul's Asian side and feels like a different city from the tourist-heavy European shore. The market surrounding the ferry terminal overflows with Turkish cheeses, olives, dried fruits, and spices — it's a food lover's paradise. Bahariye Caddesi, the pedestrian main street, is lined with shops and cafes, while the Moda waterfront promenade offers a calm seaside walk with views of the Princes' Islands. The ferry crossing itself is a highlight: 20 minutes on the Bosphorus with the old-city skyline as backdrop.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Take the ferry from Eminonu to Kadikoy — about 20 minutes, and the Bosphorus views make it a mini-excursion in itself. The Marmaray undersea rail line stops at Ayrilikçeşme, 10 minutes on foot from the market. Start at the ferry terminal and walk through the market, along Bahariye Caddesi, then out to the Moda waterfront.",
        },
        {
          heading: "Key Stops",
          body: "Kadikoy Market sprawls around the ferry pier with indoor and outdoor sections selling fresh fish, cheese, olives, and dried fruit — free samples are common. Bahariye Caddesi is the pedestrian spine, busy with clothes shops, bookstores, and cafes. Kadikoy's Bull Statue marks the central square. The Moda promenade is a roughly 3-km coastal loop with cafes, benches, and views across to the Princes' Islands.",
        },
        {
          heading: "Practical Tips",
          body: "The market is liveliest in the morning (9 am–noon). Some stalls close Sundays, so weekdays or Saturdays are best. The Moda promenade is most atmospheric at golden hour, when the European skyline glows across the water. An Istanbulkart makes the ferry about 7 TL (cheaper than cash). Kadikoy is safe and pleasant to walk at night. Cash is handy for market purchases, though most cafes and restaurants accept cards.",
        },
      ],
      [
        { q: "How often do ferries run to Kadikoy?", a: "Every 20 minutes or so from Eminonu. The trip takes about 20 minutes. Use an Istanbulkart. The evening return ferry has the best skyline views." },
        { q: "What should I buy at Kadikoy Market?", a: "Turkish white cheese, Kalamata olives, dried figs, and a glass of çay (tea). A fish sandwich (balık ekmek) is the signature street food." },
        { q: "How long is the Moda waterfront walk?", a: "About 3 km, taking just under an hour at a relaxed pace. Cafes along the way make it easy to break the walk into segments." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 19. Marrakech — Medina and Souks
  // ────────────────────────────────────────────────────────────────
  "marrakech-medina-walk": {
    ja: ja(MA_JA_CTA,
      "マラケシュのメディナとスーク散策 — 迷宮都市を歩く",
      "マラケシュのジャマ・エル・フナ広場、スーク、ベン・ユーセフ・マドラサ、バヒア宮殿を巡る街歩きガイド。迷路のような旧市街の歩き方。",
      MARRAKECH_MEDINA_IMAGES[0],
      MARRAKECH_MEDINA_IMAGES,
      MRK_X,
      [
        {
          heading: "このルートの特徴",
          body: "マラケシュのメディナ（旧市街）はユネスコ世界遺産に登録された迷宮都市で、ジャマ・エル・フナ広場を中心にスーク（市場）が放射状に広がっています。革製品、金属工芸、スパイス、織物など、職種ごとに区画が分かれたスークは何世紀も前から同じ場所で営業を続けています。夕方のジャマ・エル・フナ広場は屋台、大道芸人、ヘビ使い、ヘナタトゥー師が集結するカーニバルのような活気です。道に迷うのはメディナ体験の一部と割り切り、方角だけ把握して歩くのがコツです。",
        },
        {
          heading: "アクセスと起点",
          body: "マラケシュ・メナラ空港から旧市街までタクシーで約20分（80〜120DH）。ジャマ・エル・フナ広場を起点にすると、どの方向にもスークが広がっており、迷っても広場に戻れば位置を確認できます。広場に面したカフェ・ド・フランスやアルガナのテラスからは広場全体を見渡せるので、まずここで地理を把握するのがおすすめです。",
        },
        {
          heading: "主要スポット",
          body: "ジャマ・エル・フナ広場は朝はフルーツジュースの屋台、昼は控えめ、夕方からは食の屋台と芸人で爆発的に賑わいます。スークは広場北側から入り、染物のスーク、真鍮のスーク、スパイスのスークと専門区画が続きます。ベン・ユーセフ・マドラサはモロッコ最大のイスラム学院跡で、ゼリージュ（タイル装飾）と漆喰彫刻が圧巻です。バヒア宮殿は19世紀のモロッコ職人技の粋を集めた宮殿で、天井画とタイル張りの中庭が見どころ。クトゥビア・モスクの77mのミナレットはメディナのどこからでも見える目印になります。",
        },
        {
          heading: "買い物と注意点",
          body: "スークでの値段交渉は文化であり、最初の提示価格の3分の1〜半分を目安に交渉を始めてください。革製品はタンネリ（皮なめし場）近くの店が品質が良い傾向です。ミントの葉を鼻に当てると皮なめしの強烈な臭いが軽減できます。スークの狭い路地ではバイクやロバが通るため、後ろからの警笛に注意。「ガイドをしてあげる」と近づいてくる人は、後で高額な報酬を要求するケースが多いため、不要なら毅然と断りましょう。現金（DH）が基本ですが、一部の店ではカードも使えます。",
        },
        {
          heading: "時間帯と季節",
          body: "スーク巡りは午前9時〜12時が涼しく快適。広場の屋台食は18時以降が本番。夏（7月〜8月）は40度を超えるため、春（3月〜5月）か秋（9月〜11月）がベストシーズンです。冬（12月〜2月）は昼間は温暖ですが朝晩は冷え込みます。日中の直射日光は強烈なので、帽子・日焼け止め・水分補給は必須。メディナの路地は日陰が多いため、大通りよりは涼しいです。",
        },
      ],
      [
        { q: "スークでの値段交渉のコツは？", a: "最初の提示価格の30〜50%から交渉を始め、50〜70%で合意するのが一般的。笑顔で楽しみながら交渉するのがモロッコ流。急いでいる素振りを見せないのがポイントです。" },
        { q: "メディナで迷わないためのコツは？", a: "ジャマ・エル・フナ広場とクトゥビア・モスクのミナレットを目印にすれば大まかな方角が分かります。GoogleマップのGPSも路地では不正確ですが、大通りでは機能します。" },
        { q: "ベン・ユーセフ・マドラサの入場料は？", a: "70DH（約900円）。9:00〜18:00。内部の写真撮影は可能で、中庭のタイルワークが最も美しいスポットです。" },
        { q: "ジャマ・エル・フナ広場の屋台は安全ですか？", a: "地元民も利用する屋台は概ね安全です。煙が上がっている（火が通っている）料理を選び、ボトルウォーターを飲んでください。屋台番号44のフレッシュジュースが人気。" },
      ],
    ),
    en: en(MA_EN_CTA,
      "Marrakech Medina Walk — Into the Labyrinth of Souks and Squares",
      "A walking guide to Marrakech's UNESCO-listed medina covering Jemaa el-Fna square, the souk network, Ben Youssef Madrasa, Bahia Palace, and the Koutoubia Mosque minaret.",
      MARRAKECH_MEDINA_IMAGES[0],
      MARRAKECH_MEDINA_IMAGES,
      MRK_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Marrakech's medina is a UNESCO World Heritage walled city with Jemaa el-Fna square at its heart and a radiating network of souks — craft markets divided by trade: leather here, metalwork there, spices further on. Some stalls have occupied the same spot for centuries. By evening, Jemaa el-Fna transforms into a carnival of food smoke, musicians, snake charmers, and henna artists. Getting lost in the medina is inevitable and part of the experience — keep track of rough compass direction and you'll always find your way back to the square.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Marrakech Menara Airport to the medina is about 20 minutes by taxi (80–120 MAD). Jemaa el-Fna is the natural starting point — souks branch off in every direction, and you can always loop back to the square to reorient. The rooftop terraces of Cafe de France or Cafe Argana overlooking the square give you a bird's-eye view to study the layout before diving in.",
        },
        {
          heading: "Key Stops",
          body: "Jemaa el-Fna is quiet in the morning (fresh juice stalls only), moderate by afternoon, and explosive with food vendors and performers from dusk onward. The souks begin north of the square, organised by craft — dyers' souk, brass souk, spice souk. Ben Youssef Madrasa, Morocco's largest historic Islamic college, is an architectural masterwork of zellige tilework and carved stucco. Bahia Palace showcases 19th-century Moroccan craftsmanship in painted cedar ceilings and tiled courtyards. The 77-metre Koutoubia Mosque minaret is visible throughout the medina and serves as a reliable landmark.",
        },
        {
          heading: "Shopping and Streetwise Tips",
          body: "Haggling is cultural, not rude. Start at one-third to half the asking price and work toward a middle ground. Leather shops near the tanneries tend to have better quality — hold a sprig of mint to your nose to manage the tanning smell. In the narrow souk alleys, watch for motorbikes and donkeys coming from behind. People who offer to 'guide' you through the medina will expect a significant fee afterward — decline firmly if you don't want a guide. Cash in dirhams is the default, though some shops accept cards.",
        },
        {
          heading: "Timing and Season",
          body: "Souk shopping is best from 9 am to noon when it's cooler. The square's food scene starts around 6 pm. Summer (July–August) exceeds 40°C; spring (March–May) and autumn (September–November) are the most comfortable seasons. Winter (December–February) is warm by day but cold in the mornings and evenings. Sunscreen, a hat, and ample water are essential year-round. The shaded souk alleys are noticeably cooler than the open square.",
        },
      ],
      [
        { q: "How do I haggle in the souks?", a: "Start at 30–50% of the asking price and expect to settle around 50–70%. Keep it friendly and relaxed — never show urgency. Walking away often brings the price down further." },
        { q: "How do I avoid getting lost in the medina?", a: "Use Jemaa el-Fna and the Koutoubia minaret as reference points. Google Maps GPS is unreliable in the narrow alleys but works on main roads." },
        { q: "How much is Ben Youssef Madrasa entry?", a: "70 MAD (about USD 7). Open 9 am to 6 pm. Photography is allowed; the courtyard tilework is the star." },
        { q: "Is the food at Jemaa el-Fna safe?", a: "Generally yes — choose stalls that are busy with locals and where food is visibly being cooked to order. Drink bottled water. Stall number 44 is famous for fresh orange juice." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 20. Marrakech — Majorelle Garden and Gueliz
  // ────────────────────────────────────────────────────────────────
  "marrakech-majorelle-garden-walk": {
    ja: ja(MA_JA_CTA,
      "マジョレル庭園とゲリーズ地区散歩 — マラケシュのモダンな一面を歩く",
      "マラケシュのマジョレル庭園、イヴ・サンローラン美術館、ゲリーズ新市街のカフェ通りを巡る街歩きガイド。メディナの外の別の顔。",
      MARRAKECH_MAJORELLE_IMAGES[0],
      MARRAKECH_MAJORELLE_IMAGES,
      MRK_X,
      [
        {
          heading: "このルートの特徴",
          body: "マジョレル庭園はフランス人画家ジャック・マジョレルが1920年代に造園し、後にファッションデザイナーのイヴ・サンローランが修復した植物園で、鮮やかな「マジョレルブルー」の建物が世界的に有名です。隣接するイヴ・サンローラン美術館は2017年開館のモダン建築で、ファッション展示が常設されています。周辺のゲリーズ地区はフランス植民地時代に開発された新市街で、ムハンマド5世通り沿いにカフェ、パティスリー、ブティックが並ぶヨーロッパ風の雰囲気です。メディナの混沌とは対照的な、もうひとつのマラケシュを体験できます。",
        },
        {
          heading: "アクセスと起点",
          body: "ジャマ・エル・フナ広場からタクシーで10分（30〜40DH）、または徒歩30分。マジョレル庭園を起点にして、見学後にゲリーズ地区を南に歩くルートがおすすめです。庭園は開園直後の8:00に入場すると混雑を避けられます。特に10時以降は団体観光客で非常に混み合います。",
        },
        {
          heading: "主要スポット",
          body: "マジョレル庭園は5大陸から集められた300種以上の植物が育つ2.5エーカーの庭園で、サボテンガーデンが特に見事。入場料は70DH、ベルベル博物館（庭園内）は別途30DH。イヴ・サンローラン美術館はテラコッタ色の現代建築で、入場料は100DH。ゲリーズのムハンマド5世通りにはフレンチスタイルのパティスリーやカフェが並び、メディナとは全く異なる洗練された雰囲気です。メナラガーデンは12世紀アルモハド朝時代の庭園で、反射池とアトラス山脈の眺望が美しいです。",
        },
        {
          heading: "実用情報",
          body: "マジョレル庭園は非常に人気が高く、特にハイシーズン（10月〜4月）はチケットの事前オンライン購入を強くおすすめします。庭園内は三脚禁止。所要時間は庭園1〜1.5時間、YSL美術館30〜45分。ゲリーズ地区は歩道が広く平坦で、メディナに比べて歩きやすいです。カフェでのコーヒーは20〜40DH、レストランでのランチは80〜150DHが相場。ゲリーズではカード決済も広く受け入れられています。メナラガーデンは入場無料で、夕方の散歩に最適です。",
        },
      ],
      [
        { q: "マジョレル庭園の入場料は？", a: "庭園70DH、ベルベル博物館30DH、YSL美術館100DH。すべて別々のチケットです。オンライン事前購入で行列を避けられます。" },
        { q: "マジョレル庭園の所要時間は？", a: "庭園だけなら1〜1.5時間。YSL美術館を含めると2〜2.5時間。朝8:00の開園直後が空いています。" },
        { q: "ゲリーズ地区のおすすめカフェは？", a: "ムハンマド5世通り沿いにはフレンチスタイルのパティスリーが多数。クロワッサンとミントティーの組み合わせがモロッコ流のモーニングです。" },
      ],
    ),
    en: en(MA_EN_CTA,
      "Majorelle Garden and Gueliz Walk — Marrakech Beyond the Medina",
      "A walking guide to Marrakech's Majorelle Garden, the Musee Yves Saint Laurent, and the Gueliz new town covering the cafe-lined Avenue Mohammed V and the Menara Gardens reflecting pool.",
      MARRAKECH_MAJORELLE_IMAGES[0],
      MARRAKECH_MAJORELLE_IMAGES,
      MRK_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Majorelle Garden was created in the 1920s by French painter Jacques Majorelle and later restored by Yves Saint Laurent. Its signature cobalt-blue villa and 300-plus plant species from five continents make it one of Morocco's most visited sites. The adjacent Musee Yves Saint Laurent, opened in 2017, is a striking terracotta building dedicated to the designer's work. The surrounding Gueliz district, developed during the French Protectorate, has broad avenues lined with patisseries, cafes, and boutiques — a European-flavoured contrast to the medina's labyrinth.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "A taxi from Jemaa el-Fna takes 10 minutes (30–40 MAD), or you can walk in 30 minutes. Start at Majorelle Garden — arriving at the 8 am opening avoids the worst crowds. By 10 am, tour groups fill the paths. After the garden, walk south through Gueliz.",
        },
        {
          heading: "Key Stops",
          body: "Majorelle Garden is a 2.5-acre botanical garden with an outstanding cactus collection. Entry is 70 MAD; the Berber Museum inside the garden is an additional 30 MAD. Musee Yves Saint Laurent is 100 MAD and takes 30–45 minutes. Avenue Mohammed V in Gueliz has French-style bakeries and cafes with a polished, unhurried atmosphere. Menara Gardens, a 12th-century Almohad-era park with a reflecting pool and Atlas Mountain views, is free and ideal for an evening stroll.",
        },
        {
          heading: "Practical Tips",
          body: "Majorelle Garden is extremely popular — buy tickets online in advance, especially in high season (October to April). Tripods are not allowed. Budget 1–1.5 hours for the garden and 30–45 minutes for the YSL museum. Gueliz has wide, level pavements and is much easier to walk than the medina. Coffee runs 20–40 MAD in Gueliz cafes; restaurant lunches 80–150 MAD. Card payments are widely accepted in Gueliz. Menara Gardens is free and particularly pleasant at sunset.",
        },
      ],
      [
        { q: "How much is Majorelle Garden entry?", a: "Garden 70 MAD, Berber Museum 30 MAD, YSL Museum 100 MAD — each ticketed separately. Online booking skips the queue." },
        { q: "How long should I spend at Majorelle?", a: "1–1.5 hours for the garden alone. Add the YSL museum and it's 2–2.5 hours total. The 8 am opening is the quietest time." },
        { q: "Best cafe in Gueliz?", a: "Avenue Mohammed V has several French-style patisseries. A croissant with Moroccan mint tea is the local morning ritual." },
      ],
    ),
  },

};

export const ASIA_2_GUIDE_SLUGS = Object.keys(ASIA_2_GUIDE_CONTENT);
