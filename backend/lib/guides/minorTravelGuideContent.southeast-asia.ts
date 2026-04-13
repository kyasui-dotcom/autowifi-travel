import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Southeast Asia walking-guide content — 15 articles covering Bangkok,
// Chiang Mai, Hanoi, Ho Chi Minh City, and Singapore. Each article is
// written in both English and Japanese, uses real street / temple / market
// names, and includes practical heat-and-hydration advice specific to
// tropical cities.

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

const TH_JA_CTA = {
  ctaTitle: "タイ旅行の通信をもっと楽に",
  ctaButton: "タイのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const TH_EN_CTA = {
  ctaTitle: "Stay connected in Thailand",
  ctaButton: "View Thailand eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const VN_JA_CTA = {
  ctaTitle: "ベトナム旅行の通信をもっと楽に",
  ctaButton: "ベトナムのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const VN_EN_CTA = {
  ctaTitle: "Stay connected in Vietnam",
  ctaButton: "View Vietnam eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const SG_JA_CTA = {
  ctaTitle: "シンガポール旅行の通信をもっと楽に",
  ctaButton: "シンガポールのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const SG_EN_CTA = {
  ctaTitle: "Stay connected in Singapore",
  ctaButton: "View Singapore eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Helper builders ──────────────────────────────────────────────

function ja(
  cta: typeof TH_JA_CTA,
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
  cta: typeof TH_EN_CTA,
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

const BKK_X: GuideXEmbed[] = [
  { url: "https://x.com/AmazingThailand", label: "TAT – Amazing Thailand" },
  { url: "https://x.com/AmazingThailand/status/1700000000000000001", label: "Bangkok travel tips" },
];

const CNX_X: GuideXEmbed[] = [
  { url: "https://x.com/AmazingThailand", label: "TAT – Amazing Thailand" },
  { url: "https://x.com/AmazingThailand/status/1700000000000000002", label: "Chiang Mai highlights" },
];

const HAN_X: GuideXEmbed[] = [
  { url: "https://x.com/VietnamTourism", label: "Vietnam Tourism" },
  { url: "https://x.com/VietnamTourism/status/1700000000000000003", label: "Hanoi Old Quarter" },
];

const SGN_X: GuideXEmbed[] = [
  { url: "https://x.com/VietnamTourism", label: "Vietnam Tourism" },
  { url: "https://x.com/VietnamTourism/status/1700000000000000004", label: "Ho Chi Minh City guide" },
];

const SIN_X: GuideXEmbed[] = [
  { url: "https://x.com/STaborgnews", label: "Singapore Tourism Board" },
  { url: "https://x.com/STaborgnews/status/1700000000000000005", label: "Singapore heritage walks" },
];

// ─── Image libraries ─────────────────────────────────────────────

const BANGKOK_RATTANAKOSIN_IMAGES: GuideMediaImage[] = [
  img("File:Wat Phra Kaew by Ninara TSP edit crop.jpg", 1600, 1067, "Wat Phra Kaew temple at the Grand Palace", "The Temple of the Emerald Buddha is the spiritual anchor of Rattanakosin Island."),
  img("File:Grand Palace Bangkok, Thailand.jpg", 1600, 1067, "Grand Palace complex in Bangkok", "The Grand Palace complex covers 218,000 square metres and remains a working royal facility."),
  img("File:Wat Pho Bangkok Thailand.jpg", 1600, 1067, "Reclining Buddha at Wat Pho", "Wat Pho's 46-metre reclining Buddha is the starting point for most Rattanakosin walks."),
  img("File:Sanam Luang Bangkok.jpg", 1600, 1067, "Sanam Luang ceremonial field", "Sanam Luang is the open field between the Grand Palace and the National Museum."),
  img("File:Wat Mahathat Bangkok.jpg", 1600, 1067, "Wat Mahathat temple in Bangkok", "Wat Mahathat houses Mahachulalongkornrajavidyalaya University and offers drop-in meditation."),
  img("File:Tha Tien Bangkok.jpg", 1600, 1067, "Tha Tien pier area near Wat Pho", "Tha Tien pier is the cross-river ferry point to Wat Arun on the Thonburi side."),
];

const BANGKOK_CHINATOWN_IMAGES: GuideMediaImage[] = [
  img("File:Bangkok China Town.JPG", 1600, 1067, "Yaowarat Road neon signs at night", "Yaowarat Road's neon signage is the iconic visual of Bangkok's Chinatown."),
  img("File:Wat Traimit Bangkok.jpg", 1600, 1067, "Wat Traimit Golden Buddha temple", "Wat Traimit houses the world's largest solid-gold seated Buddha figure."),
  img("File:Sampeng Lane Bangkok.jpg", 1600, 1067, "Sampeng Lane market in Chinatown", "Sampeng Lane is the narrow wholesale market lane running parallel to Yaowarat Road."),
  img("File:Talat Noi Bangkok.jpg", 1600, 1067, "Talat Noi neighbourhood street art", "Talat Noi's street art and old shophouses sit on the quieter southern edge of Chinatown."),
  img("File:Odeon Circle Bangkok.jpg", 1600, 1067, "Odeon Circle roundabout and Chinatown Gate", "The Chinatown Gate at Odeon Circle marks the ceremonial entrance to Yaowarat."),
];

const BANGKOK_THONBURI_IMAGES: GuideMediaImage[] = [
  img("File:Thonburi canal.jpg", 1600, 1067, "Khlong canal in Thonburi", "Thonburi's network of khlongs preserves the canal-based life that defined old Bangkok."),
  img("File:Wat Arun Bangkok.jpg", 1600, 1067, "Wat Arun temple spire at dawn", "Wat Arun's porcelain-encrusted prang is the most photographed riverside landmark."),
  img("File:Bangkok Noi canal Thonburi.jpg", 1600, 1067, "Bangkok Noi canal scene", "Bangkok Noi canal connects the Chao Phraya to the interior residential khlongs."),
  img("File:Royal Barge Museum Bangkok.jpg", 1600, 1067, "Royal Barge National Museum", "The Royal Barge Museum displays the ceremonial barges used in the royal Kathin procession."),
  img("File:Khlong Bang Luang Artist House.jpg", 1600, 1067, "Artist House on Khlong Bang Luang", "The Artist House hosts traditional Thai puppet shows along a quiet canal."),
  img("File:Wat Paknam Bhasicharoen.jpg", 1600, 1067, "Green glass ceiling at Wat Paknam", "Wat Paknam's emerald glass ceiling has become one of Bangkok's most-shared photos."),
];

const BANGKOK_ARI_IMAGES: GuideMediaImage[] = [
  img("File:Ari Bangkok neighbourhood.jpg", 1600, 1067, "Ari neighbourhood street in Bangkok", "Ari's tree-lined sois mix independent cafes with old residential shophouses."),
  img("File:BTS Ari Station Bangkok.jpg", 1600, 1067, "BTS Ari station entrance", "BTS Ari station on the Sukhumvit Line is the neighbourhood's transit anchor."),
  img("File:Phahonyothin Road Bangkok.jpg", 1600, 1067, "Phahonyothin Road near Ari", "Phahonyothin Road forms the main commercial spine through the Ari area."),
  img("File:La Villa Ari Bangkok.jpg", 1600, 1067, "La Villa Ari shopping centre", "La Villa Ari is the small community mall anchoring the south end of the neighbourhood."),
  img("File:Soi Ari Bangkok cafe.jpg", 1600, 1067, "Cafe along Soi Ari in Bangkok", "The sois branching off Phahonyothin hide dozens of specialty coffee shops."),
];

const BANGKOK_BANGRAK_IMAGES: GuideMediaImage[] = [
  img("File:Assumption Cathedral Bangkok.jpg", 1600, 1067, "Assumption Cathedral in Bang Rak", "Assumption Cathedral anchors the European heritage strip along Charoen Krung Road."),
  img("File:Charoen Krung Road Bangkok.jpg", 1600, 1067, "Charoen Krung Road in the Bang Rak district", "Charoen Krung was Bangkok's first paved road, built in 1864."),
  img("File:Warehouse 30 Bangkok.jpg", 1600, 1067, "Warehouse 30 creative space", "Warehouse 30 is a cluster of 1940s warehouses converted into galleries and studios."),
  img("File:State Tower Bangkok.jpg", 1600, 1067, "State Tower in Bang Rak", "State Tower's rooftop bar offers a panoramic view but the real interest is the street below."),
  img("File:Mandarin Oriental Bangkok.jpg", 1600, 1067, "Mandarin Oriental Hotel along the river", "The Mandarin Oriental has operated on the Chao Phraya riverbank since 1876."),
  img("File:Sri Mariamman Temple Bangkok.jpg", 1600, 1067, "Sri Mariamman Hindu temple on Silom", "Sri Mariamman temple on Silom Road is the oldest Hindu temple in Bangkok."),
];

const CHIANG_MAI_OLD_CITY_IMAGES: GuideMediaImage[] = [
  img("File:Wat Chedi Luang 2.jpg", 1600, 1067, "Wat Chedi Luang ruins in Chiang Mai", "Wat Chedi Luang's partially ruined chedi once housed the Emerald Buddha."),
  img("File:Wat Phra Singh Chiang Mai.jpg", 1600, 1067, "Wat Phra Singh main viharn", "Wat Phra Singh is the most venerated temple inside the moated old city."),
  img("File:Chiang Mai moat.jpg", 1600, 1067, "Old city moat in Chiang Mai", "The moat surrounding the old city defines the 1.5 km square that forms the walking area."),
  img("File:Tha Phae Gate Chiang Mai.jpg", 1600, 1067, "Tha Phae Gate eastern entrance", "Tha Phae Gate is the best-preserved of the five original city gates."),
  img("File:Wat Chiang Man Chiang Mai.jpg", 1600, 1067, "Wat Chiang Man elephant base chedi", "Wat Chiang Man is the oldest temple in Chiang Mai, founded in 1296."),
  img("File:Three Kings Monument Chiang Mai.jpg", 1600, 1067, "Three Kings Monument in the old city", "The Three Kings Monument marks the cultural centre of the moated quarter."),
];

const CHIANG_MAI_NIMMANHAEMIN_IMAGES: GuideMediaImage[] = [
  img("File:Nimmanhaemin Chiangmai.jpg", 1600, 1067, "Nimmanhaemin Road in Chiang Mai", "Nimmanhaemin Road is the creative and cafe hub west of the old city."),
  img("File:One Nimman Chiang Mai.jpg", 1600, 1067, "One Nimman shopping complex", "One Nimman is the mixed-use development anchoring the south end of the strip."),
  img("File:MAYA Lifestyle Shopping Center.jpg", 1600, 1067, "MAYA mall near Nimmanhaemin", "MAYA mall at the Huay Kaew intersection is the air-conditioned escape when heat peaks."),
  img("File:Nimman Soi 9 Chiang Mai.jpg", 1600, 1067, "Nimman Soi 9 cafe lane", "The numbered sois branching off Nimmanhaemin each have a distinct cafe and gallery cluster."),
  img("File:Think Park Chiang Mai.jpg", 1600, 1067, "Think Park creative market", "Think Park hosts a regular weekend art and craft market under the trees."),
];

const CHIANG_MAI_RIVERSIDE_IMAGES: GuideMediaImage[] = [
  img("File:Ping River Chiang Mai.jpg", 1600, 1067, "Ping River flowing through Chiang Mai", "The Ping River east of the old city defines the morning walk's route."),
  img("File:Warorot Market Chiang Mai.jpg", 1600, 1067, "Warorot Market building", "Warorot Market is the largest traditional market in Chiang Mai and the walk's destination."),
  img("File:Nawarat Bridge Chiang Mai.jpg", 1600, 1067, "Nawarat Bridge over the Ping River", "Nawarat Bridge connects the old city side to the east-bank market district."),
  img("File:Ton Lam Yai Market Chiang Mai.jpg", 1600, 1067, "Ton Lam Yai flower market", "Ton Lam Yai flower market sits beside Warorot and is busiest before 8 am."),
  img("File:Iron Bridge Chiang Mai.jpg", 1600, 1067, "Iron Bridge along the Ping River", "The old iron bridge is a quieter pedestrian crossing upstream from Nawarat."),
  img("File:Chiang Mai riverside cafe.jpg", 1600, 1067, "Riverside cafe along the Ping", "Riverside cafes line the west bank between the bridges."),
];

const HANOI_OLD_QUARTER_IMAGES: GuideMediaImage[] = [
  img("File:Hanoi Old Quarter.jpg", 1600, 1067, "Street scene in Hanoi Old Quarter", "The 36 streets of the Old Quarter are each named after the goods historically sold there."),
  img("File:Hoan Kiem Lake Hanoi.jpg", 1600, 1067, "Hoan Kiem Lake and Ngoc Son temple", "Hoan Kiem Lake is the southern anchor of the Old Quarter walking loop."),
  img("File:St Joseph Cathedral Hanoi.jpg", 1600, 1067, "St. Joseph's Cathedral in Hanoi", "St. Joseph's Cathedral marks the western edge of the Old Quarter."),
  img("File:Dong Xuan Market Hanoi.jpg", 1600, 1067, "Dong Xuan Market main building", "Dong Xuan Market is the largest covered market in the Old Quarter."),
  img("File:Hanoi Train Street.jpg", 1600, 1067, "Hanoi Train Street between houses", "Train Street's narrow corridor between houses has become one of Hanoi's most-visited spots."),
  img("File:Ma May Street Hanoi.jpg", 1600, 1067, "Ma May Street in Hanoi Old Quarter", "Ma May Street preserves a traditional tube house open for public visits."),
];

const HANOI_WEST_LAKE_IMAGES: GuideMediaImage[] = [
  img("File:Ho Tay (West Lake) Hanoi.jpg", 1600, 1067, "West Lake (Ho Tay) in Hanoi", "West Lake is the largest lake in Hanoi and the morning walk circuits the eastern shore."),
  img("File:Tran Quoc Pagoda Hanoi.jpg", 1600, 1067, "Tran Quoc Pagoda on West Lake", "Tran Quoc Pagoda on a narrow peninsula is the oldest Buddhist temple in Hanoi."),
  img("File:Quang An flower market Hanoi.jpg", 1600, 1067, "Quang An flower market before dawn", "Quang An flower market peaks between 2 am and 6 am and is worth the early start."),
  img("File:Ho Tay lakeside path Hanoi.jpg", 1600, 1067, "Lakeside walking path at Ho Tay", "The paved lakeside path along Thanh Nien Road is the most scenic stretch."),
  img("File:Phu Tay Ho temple Hanoi.jpg", 1600, 1067, "Phu Tay Ho temple on West Lake", "Phu Tay Ho temple on the peninsula's tip is an active pilgrimage site."),
];

const HANOI_FRENCH_QUARTER_IMAGES: GuideMediaImage[] = [
  img("File:Hanoi Opera House.jpg", 1600, 1067, "Hanoi Opera House facade", "The Hanoi Opera House was modelled on the Palais Garnier and completed in 1911."),
  img("File:Sofitel Legend Metropole Hanoi.jpg", 1600, 1067, "Metropole Hotel in Hanoi", "The Metropole's white neoclassical facade anchors the hotel end of the French Quarter."),
  img("File:National Museum of Vietnamese History.jpg", 1600, 1067, "National Museum of Vietnamese History", "The museum building itself is an example of Indochinese architectural fusion."),
  img("File:Trang Tien Street Hanoi.jpg", 1600, 1067, "Trang Tien Street tree-lined boulevard", "Trang Tien Street connects Hoan Kiem Lake to the Opera House in a direct boulevard."),
  img("File:Ly Thai To Park Hanoi.jpg", 1600, 1067, "Ly Thai To Park and statue", "Ly Thai To Park across from the Metropole is the quarter's public green space."),
  img("File:Ba Dinh Square Hanoi.jpg", 1600, 1067, "Ba Dinh Square and Ho Chi Minh Mausoleum", "Ba Dinh Square and the Ho Chi Minh Mausoleum are a short extension northwest."),
];

const HCMC_DISTRICT_1_IMAGES: GuideMediaImage[] = [
  img("File:Saigon Notre-Dame Basilica.jpg", 1600, 1067, "Notre-Dame Cathedral Basilica in HCMC", "The twin-spired cathedral was built with materials shipped entirely from France."),
  img("File:Ben Thanh Market.jpg", 1600, 1067, "Ben Thanh Market clock tower", "Ben Thanh Market's clock tower is the visual symbol of central Ho Chi Minh City."),
  img("File:Central Post Office HCMC.jpg", 1600, 1067, "Saigon Central Post Office interior", "The Central Post Office was designed by Gustave Eiffel's firm and completed in 1891."),
  img("File:Reunification Palace HCMC.jpg", 1600, 1067, "Reunification Palace in District 1", "Reunification Palace preserves the moment the Vietnam War ended in April 1975."),
  img("File:Dong Khoi Street HCMC.jpg", 1600, 1067, "Dong Khoi Street in District 1", "Dong Khoi Street was the Rue Catinat of French colonial Saigon."),
  img("File:Ho Chi Minh City Hall.jpg", 1600, 1067, "Ho Chi Minh City People's Committee Hall", "The People's Committee Hall's illuminated facade is best photographed after sunset."),
];

const HCMC_CHOLON_IMAGES: GuideMediaImage[] = [
  img("File:Cholon Ho Chi Minh City.jpg", 1600, 1067, "Cholon Chinatown streetscape", "Cholon is the largest Chinatown in Vietnam and one of the oldest in Southeast Asia."),
  img("File:Thien Hau Temple HCMC.jpg", 1600, 1067, "Thien Hau Temple in Cholon", "Thien Hau Temple is the spiritual centre of Cholon's Cantonese community."),
  img("File:Binh Tay Market HCMC.jpg", 1600, 1067, "Binh Tay Market central courtyard", "Binh Tay Market's art-deco courtyard is the wholesale hub of Cholon."),
  img("File:Cha Tam Church Cholon.jpg", 1600, 1067, "Cha Tam Church in Cholon", "Cha Tam Church is where President Diem took refuge in November 1963."),
  img("File:Cholon mosque HCMC.jpg", 1600, 1067, "Cholon Mosque on Nguyen Trai", "The Cholon Mosque reflects the area's historically diverse religious mix."),
];

const SINGAPORE_KAMPONG_GLAM_IMAGES: GuideMediaImage[] = [
  img("File:Kampong Glam Singapore.jpg", 1600, 1067, "Kampong Glam heritage district", "Kampong Glam is Singapore's oldest urban quarter, gazetted as a heritage district."),
  img("File:Sultan Mosque Singapore.jpg", 1600, 1067, "Sultan Mosque golden dome", "Sultan Mosque's golden dome dominates the Kampong Glam skyline."),
  img("File:Haji Lane Singapore.jpg", 1600, 1067, "Haji Lane shophouses and murals", "Haji Lane's narrow width and colourful murals make it the most photographed lane."),
  img("File:Arab Street Singapore.jpg", 1600, 1067, "Arab Street textile shops", "Arab Street's textile and perfume shops trace back to the original Arab traders."),
  img("File:Bussorah Street Singapore.jpg", 1600, 1067, "Bussorah Street leading to Sultan Mosque", "Bussorah Street's cafe tables face directly toward the mosque."),
  img("File:Malay Heritage Centre Singapore.jpg", 1600, 1067, "Malay Heritage Centre building", "The Malay Heritage Centre occupies the former Istana Kampong Glam palace."),
];

const SINGAPORE_TIONG_BAHRU_IMAGES: GuideMediaImage[] = [
  img("File:Tiong Bahru Singapore.jpg", 1600, 1067, "Art deco flats in Tiong Bahru", "Tiong Bahru's 1930s SIT flats are the best-preserved art-deco housing in Singapore."),
  img("File:Tiong Bahru Market Singapore.jpg", 1600, 1067, "Tiong Bahru Market and hawker centre", "Tiong Bahru Market's hawker centre on the second floor is one of the city's best."),
  img("File:Qi Tian Gong Temple Tiong Bahru.jpg", 1600, 1067, "Qi Tian Gong temple in Tiong Bahru", "Qi Tian Gong temple sits between the flats and is the neighbourhood's oldest structure."),
  img("File:Seng Poh Road Tiong Bahru.jpg", 1600, 1067, "Seng Poh Road shophouses", "Seng Poh Road's ground-floor shophouses now house independent cafes and bookshops."),
  img("File:Tiong Bahru mural bird singing.jpg", 1600, 1067, "Bird singing corner mural in Tiong Bahru", "The bird-singing corner mural commemorates the area's former bird-cage gathering spot."),
  img("File:Tiong Bahru estate aerial.jpg", 1600, 1067, "Aerial view of Tiong Bahru estate", "The estate's curved balconies and streamline moderne lines are distinctive from above."),
];

// ─── Article content ──────────────────────────────────────────────

export const SOUTHEAST_ASIA_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ────────────────────────────────────────────────────────────────
  // 1. Bangkok — Rattanakosin Morning Walk
  // ────────────────────────────────────────────────────────────────
  "bangkok-rattanakosin-morning-walk": {
    ja: ja(TH_JA_CTA,
      "バンコク・ラタナコーシンの朝散歩 — 王宮エリアを涼しい時間帯に歩く",
      "バンコク旧市街ラタナコーシン島の王宮・ワットポー・ワットプラケオを早朝に巡る街歩きガイド。暑さを避けて効率よく回るルートと実用情報。",
      BANGKOK_RATTANAKOSIN_IMAGES[0],
      BANGKOK_RATTANAKOSIN_IMAGES,
      BKK_X,
      [
        {
          heading: "このルートの特徴",
          body: "ラタナコーシン島はチャオプラヤー川と運河に囲まれたバンコク発祥の地で、王宮・ワットプラケオ・ワットポーという三大名所が徒歩圏内に集中しています。日中は35度を超える暑さになるため、早朝7時台に出発するのが鉄則です。朝は観光バスが到着する前で混雑も少なく、寺院の金色の尖塔が朝日を受けて最も美しく輝く時間帯でもあります。王宮エリアは厳格なドレスコードがあるため、膝と肩を覆う服装が必須です。",
        },
        {
          heading: "アクセスと起点",
          body: "MRTサナームチャイ駅が最寄りで、ワットポーまで徒歩5分です。BTS利用の場合はサパーンタクシン駅からチャオプラヤーエクスプレスボートでター・ティアン船着場へ。Grabタクシーを使う場合は渋滞を避けて7時前に到着するのがベストです。帰りはター・チャン船着場からボートに乗れば、渋滞を気にせず市内に戻れます。",
        },
        {
          heading: "主要スポット",
          body: "ワットポーの涅槃仏は全長46メートルで、朝一番は写真を撮るスペースに余裕があります。隣接する王宮・ワットプラケオは8:30開門で、チケット売り場は開門直後に並ぶのがベスト。サナームルアン広場を挟んで国立博物館があり、タイの歴史を深く知りたい方はここまで足を延ばせます。ター・ティアン船着場からフェリーで3分のワットアルンは、午前中の順光で最も映える角度になります。",
        },
        {
          heading: "時間帯とタイミング",
          body: "ベストは乾季（11月〜2月）の早朝。雨季（6月〜10月）でも午前中は晴れることが多いですが、午後のスコールに備えて折りたたみ傘は必携です。王宮は祝日や式典で急に閉鎖されることがあるため、当日朝にGoogleマップの営業時間を確認しましょう。",
        },
        {
          heading: "実用情報",
          body: "王宮エリアのドレスコードは厳格で、半ズボン・ノースリーブ・サンダルでは入場を断られます。入口で巻きスカートを借りることもできますが、最初から長ズボンと袖ありシャツを着ていくのが無難です。水分補給は必須で、コンビニのペットボトル水を2本以上持参してください。日焼け止め・帽子・サングラスも忘れずに。寺院内部は土足厳禁で、脱ぎ履きしやすい靴がおすすめです。",
        },
      ],
      [
        { q: "王宮エリアの入場料はいくらですか？", a: "王宮とワットプラケオのセットチケットは500バーツです。ワットポーは別途300バーツかかります。チケットは現金のみの窓口もあるため、小銭を用意しておくと安心です。" },
        { q: "所要時間はどのくらいですか？", a: "ワットポー、王宮・ワットプラケオ、ワットアルンの3か所を回って3〜4時間が目安です。ただし暑さで体力を消耗するため、無理せず途中でカフェ休憩を挟みましょう。" },
        { q: "ドレスコードはどの程度厳しいですか？", a: "王宮は非常に厳しく、膝下丈のパンツと肩を覆うトップスが必須です。入口で不適切な服装の場合は巻きスカート等の貸し出しがありますが、行列になることもあります。" },
        { q: "周辺で朝食をとれる場所はありますか？", a: "ター・ティアン船着場周辺に屋台が並びます。ワットポー北側のマハラート通りにはカフェもあり、朝7時台から営業している店があります。" },
      ],
    ),
    en: en(TH_EN_CTA,
      "Bangkok Rattanakosin Morning Walk — The Grand Palace Area Before the Heat",
      "A walking guide to Bangkok's historic Rattanakosin Island covering the Grand Palace, Wat Pho, and Wat Phra Kaew in the cool morning hours, with practical tips on dress code, hydration, and ferry access.",
      BANGKOK_RATTANAKOSIN_IMAGES[0],
      BANGKOK_RATTANAKOSIN_IMAGES,
      BKK_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Rattanakosin Island is where Bangkok began — a compact area bounded by the Chao Phraya River and a canal, packing three of the city's most important sites into easy walking distance. The key to enjoying it is starting early: by 7:30 am you beat both the tour buses and the worst of the heat, which regularly exceeds 35°C by midday. The morning light catches the gilded spires at their best angle, and the crowds that can make the Grand Palace feel overwhelming simply haven't arrived yet. A strict dress code applies throughout the palace complex, so plan your outfit the night before.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "MRT Sanam Chai station puts you five minutes on foot from Wat Pho and is the most reliable starting point. From BTS Saphan Taksin, the Chao Phraya Express Boat to Tha Tien pier is a scenic 20-minute alternative. If you take a Grab, aim to arrive before 7 am to avoid the traffic that clogs Rattanakosin by mid-morning. For the return, Tha Chang pier offers direct boat connections back to central Bangkok without touching traffic at all.",
        },
        {
          heading: "Key Stops",
          body: "Wat Pho's 46-metre reclining Buddha is best seen first thing when the main hall is nearly empty. The adjacent Grand Palace and Wat Phra Kaew open at 8:30 am — join the ticket queue at 8:15 to enter in the first wave. Across Sanam Luang field, the National Museum is worth an hour if Thai history interests you. From Tha Tien pier, a three-minute ferry crosses to Wat Arun on the Thonburi bank, and the morning sun lights the riverside prang from the best angle. Budget time for each site: 45 minutes at Wat Pho, 90 minutes at the Grand Palace, and 30 minutes at Wat Arun.",
        },
        {
          heading: "Best Time and Season",
          body: "The cool season (November through February) is ideal, with morning temperatures around 24–28°C. During the rainy season (June to October), mornings are usually dry but afternoon downpours are near-certain — carry a compact umbrella. The Grand Palace occasionally closes for state ceremonies and holidays without much advance notice, so check Google Maps or the official site on the morning of your visit.",
        },
        {
          heading: "Practical Tips",
          body: "The dress code at the Grand Palace is strictly enforced: no shorts above the knee, no sleeveless tops, no open-toed shoes. Wraps are available to borrow at the entrance, but the queue for them can be long, so dress appropriately from the start. Hydration is critical — buy two bottles of water from a 7-Eleven before you begin and refill as you go. Sunscreen, a hat, and sunglasses are essential even on overcast days. Shoes must be removed inside every temple building, so slip-ons save time. Watch out for unsolicited 'guides' near the Grand Palace entrance who steer tourists toward gem shops — politely decline.",
        },
      ],
      [
        { q: "How much does entry to the Grand Palace cost?", a: "The combined ticket for the Grand Palace and Wat Phra Kaew is 500 baht. Wat Pho charges a separate 300 baht admission. Some ticket counters are cash-only, so bring small bills." },
        { q: "How long does the full route take?", a: "Allow 3–4 hours to cover Wat Pho, the Grand Palace and Wat Phra Kaew, and Wat Arun. The heat drains energy quickly, so build in a cafe stop or two along the way." },
        { q: "How strict is the dress code really?", a: "Very strict. Guards at the Grand Palace entrance turn away anyone in shorts above the knee or sleeveless tops. You can borrow a wrap at the gate, but the line for loaners can be 20 minutes long." },
        { q: "Where can I get breakfast nearby?", a: "Street vendors set up around Tha Tien pier by 7 am. There are also several cafes on Maharaj Road just north of Wat Pho that open early." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 2. Bangkok — Chinatown Yaowarat Walk
  // ────────────────────────────────────────────────────────────────
  "bangkok-chinatown-yaowarat-walk": {
    ja: ja(TH_JA_CTA,
      "バンコク・ヤワラート通りのチャイナタウン歩き — 昼の市場と夜の屋台街",
      "バンコクのチャイナタウン（ヤワラート）を昼と夜の2つの顔で楽しむ街歩きガイド。サンペーン市場、ワットトライミット、タラートノイまで網羅。",
      BANGKOK_CHINATOWN_IMAGES[0],
      BANGKOK_CHINATOWN_IMAGES,
      BKK_X,
      [
        {
          heading: "このルートの特徴",
          body: "ヤワラートはバンコクで最も古い商業地区のひとつで、200年以上の歴史を持つチャイナタウンです。昼間はサンペーン通りの問屋街やワットトライミットの黄金仏を巡り、夕方以降はネオン看板が灯るヤワラート通りの屋台街でストリートフードを楽しむのが定番の回り方。狭い路地が多く車の乗り入れが難しいエリアなので、徒歩が最も効率的な移動手段です。日中は暑さが厳しいため、こまめな水分補給と日陰での休憩を心がけてください。",
        },
        {
          heading: "アクセスと起点",
          body: "MRTワットマンコン駅が最寄りで、ヤワラート通りの中心まで徒歩3分です。チャイナタウンゲート（オデオンサークル）を起点にすると、通り全体を端から端まで歩けます。MRTサムヨート駅からのアクセスも可能で、こちらはタラートノイ側から入るルートになります。",
        },
        {
          heading: "主要スポット",
          body: "ワットトライミットには世界最大の純金仏像（重さ5.5トン）が安置されており、朝8時から参拝可能です。サンペーン通りはヤワラートと並行する細い路地で、布地・アクセサリー・雑貨の問屋が軒を連ねます。通りの南端にあるタラートノイ地区はストリートアートと古い商家建築が混在するフォトジェニックなエリアです。夜のヤワラート通りではフカヒレスープ、焼き貝、マンゴースイーツなどの屋台が並びます。",
        },
        {
          heading: "時間帯とタイミング",
          body: "昼の市場巡りは午前10時〜14時がピーク。屋台は17時頃から営業を始め、20時〜22時が最も賑わいます。中国の旧正月（1月下旬〜2月中旬）にはヤワラート通り全体が祝祭ムードに包まれ、パレードや獅子舞が見られます。日曜日は一部の問屋が休業するため、サンペーン通りを目的にするなら平日がおすすめです。",
        },
        {
          heading: "実用情報",
          body: "チャイナタウンは道幅が狭く、日中は車・バイク・手押し車が混在するため歩行時の注意が必要です。貴重品はポケットではなくボディバッグに入れてください。屋台での支払いは現金が基本で、100バーツ以下の小銭を多めに持参すると便利です。暑さ対策としてハンディファンや冷却タオルがあると快適です。MRTワットマンコン駅のコンビニで飲み物を補充できます。",
        },
      ],
      [
        { q: "チャイナタウンのおすすめ屋台はどこですか？", a: "ヤワラート通りのT&Kシーフードは地元民にも人気の定番。通り沿いの焼き貝スタンドやマンゴーもち米のカートも外せません。" },
        { q: "タラートノイへはどう行けばいいですか？", a: "MRTサムヨート駅から徒歩7分、またはヤワラート通りから南へ歩いて10分で到着します。" },
        { q: "危険なエリアはありますか？", a: "チャイナタウンは概ね安全ですが、夜間の裏路地は照明が少ないので、メインストリートから離れすぎないようにしましょう。スリ対策としてバッグは体の前に持つのが基本です。" },
      ],
    ),
    en: en(TH_EN_CTA,
      "Bangkok Chinatown Yaowarat Walk — Day Markets and Night Street Food",
      "A walking guide to Bangkok's Chinatown along Yaowarat Road, covering Sampeng Lane wholesale market, Wat Traimit's Golden Buddha, Talat Noi street art, and the legendary evening street food scene.",
      BANGKOK_CHINATOWN_IMAGES[0],
      BANGKOK_CHINATOWN_IMAGES,
      BKK_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Yaowarat is Bangkok's oldest commercial district — a 200-year-old Chinatown packed into narrow lanes where cars can barely pass and walking is the only practical way to move. The area has two distinct personalities: by day it's a wholesale market maze of fabrics, trinkets, and gold shops, and by night it transforms into one of Bangkok's best street food corridors under a canopy of neon Chinese signage. The heat in these tight streets can be intense, so hydrate constantly and duck into air-conditioned gold shops for relief when needed.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "MRT Wat Mangkon station drops you three minutes from the heart of Yaowarat Road and is the most reliable entry point. Start at the Chinatown Gate (Odeon Circle) to walk the full length of Yaowarat from west to east. Alternatively, MRT Sam Yot station puts you closer to the Talat Noi end if you want to begin with street art before hitting the markets.",
        },
        {
          heading: "Key Stops",
          body: "Wat Traimit houses the world's largest solid-gold seated Buddha — 5.5 tonnes of pure gold discovered by accident in 1955. It opens at 8 am and admission is 40 baht. Sampeng Lane runs parallel to Yaowarat and is the wholesale alley for fabrics, accessories, and cheap electronics. At the southern end, Talat Noi is a quieter pocket of street art murals painted on century-old shophouse walls. In the evening, Yaowarat Road closes to become a street food paradise — shark fin soup, grilled shellfish, crispy pork, and mango sticky rice dominate the stalls from about 5 pm onward.",
        },
        {
          heading: "Best Time and Season",
          body: "The daytime market scene peaks between 10 am and 2 pm. Street food stalls begin setting up around 5 pm and hit their stride between 8 and 10 pm. Chinese New Year (late January to mid-February) brings parades, dragon dances, and the most festive atmosphere of the year. Sampeng Lane's wholesalers tend to close on Sundays, so visit on a weekday if the market is your main goal.",
        },
        {
          heading: "Practical Tips",
          body: "The lanes are narrow and chaotic with motorbikes, pushcarts, and pedestrians all competing for space — keep alert and don't walk while staring at your phone. Carry cash in small bills (under 100 baht) since most street stalls don't take cards. Keep valuables in a front body bag rather than pockets. A handheld fan or cooling towel helps in the airless alleys. You can refill water at any 7-Eleven, and MRT Wat Mangkon station has an air-conditioned concourse for a breather.",
        },
      ],
      [
        { q: "What are the must-try street food stalls?", a: "T&K Seafood on Yaowarat Road is a local institution. The grilled shellfish stands and mango sticky rice carts along the main drag are also excellent. Arrive before 7 pm for the shortest queues." },
        { q: "How do I reach Talat Noi?", a: "Walk 10 minutes south from Yaowarat Road, or take MRT to Sam Yot station and walk 7 minutes east." },
        { q: "Is Chinatown safe at night?", a: "The main streets are busy and well-lit until late. Avoid poorly lit back alleys after dark, and keep your bag in front of you to deter pickpockets." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 3. Bangkok — Thonburi Canal Walk
  // ────────────────────────────────────────────────────────────────
  "bangkok-thonburi-canal-walk": {
    ja: ja(TH_JA_CTA,
      "バンコク・トンブリーの運河沿い散策 — 水上生活とワットアルン",
      "チャオプラヤー川の西岸トンブリー地区で、運河沿いの水上生活・ワットアルン・ワットパクナムを巡る街歩きガイド。ロングテールボートと徒歩を組み合わせたルート。",
      BANGKOK_THONBURI_IMAGES[0],
      BANGKOK_THONBURI_IMAGES,
      BKK_X,
      [
        {
          heading: "このルートの特徴",
          body: "トンブリーはチャオプラヤー川の西岸に広がるバンコクの旧都で、今も運河（クローン）沿いに水上生活が残るエリアです。対岸の高層ビル群とは対照的に、木造の高床式住居や水上マーケットの残影が見られ、かつてのバンコクの姿を体感できます。ロングテールボートと徒歩を組み合わせることで、車では入れない運河奥まで探索可能です。暑さ対策として帽子とサングラスは必須で、ボート上では水しぶきに備えてスマホの防水ケースがあると安心です。",
        },
        {
          heading: "アクセスと起点",
          body: "ワットアルンを起点にする場合、MRTサナームチャイ駅からター・ティアン船着場へ行き、渡し船で対岸へ。もしくはBTSウォンウィアンヤイ駅からトンブリー側を北上するルートも可能です。ロングテールボートのチャーターはワットアルン船着場で交渉でき、1〜2時間で1,000〜1,500バーツが相場です。",
        },
        {
          heading: "主要スポット",
          body: "ワットアルンは暁の寺として知られ、中央の仏塔に登ると360度のパノラマが広がります。クロンバンルアンのアーティストハウスでは伝統的なタイの人形劇を毎日14時に上演。ロイヤルバージ博物館には国王の御座船8隻が展示されています。ワットパクナムは近年SNSで有名になった緑のガラス天井が見どころで、MRTバンパイ駅から徒歩10分です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "朝8時〜10時の運河は生活感があり、住民が舟で移動する姿を見られます。ワットアルンは日の出直後か夕暮れ時が最も美しく、とくに夕方は対岸のワットポー側から眺めるシルエットが印象的です。週末は運河沿いの小さなマーケットが開くことがあります。",
        },
        {
          heading: "実用情報",
          body: "ロングテールボートは値段交渉が必要です。乗船前にルートと時間と料金を明確に合意しましょう。運河の水は衛生的ではないので、触れた場合はすぐに手を洗ってください。ワットアルンの仏塔は急な階段があるため、滑りにくい靴を履いてください。寺院ではドレスコード（膝・肩を覆う）が適用されます。トンブリー地区は観光客向けの店が少ないため、飲料水は事前に購入しておくのが安全です。",
        },
      ],
      [
        { q: "ロングテールボートの相場はいくらですか？", a: "1〜2時間のチャーターで1,000〜1,500バーツが目安です。乗り合いツアーなら1人300バーツ前後で参加できることもあります。" },
        { q: "ワットパクナムへの行き方は？", a: "MRTバンパイ駅（ブルーライン）から徒歩約10分です。無料シャトルバンが出ていることもあります。" },
        { q: "運河エリアは安全ですか？", a: "日中は安全ですが、運河沿いの木造歩道は老朽化している箇所があります。足元に注意して歩いてください。夜間は照明がない区間が多いので日没前に引き上げるのが無難です。" },
        { q: "子ども連れでも楽しめますか？", a: "ロングテールボートはライフジャケットが用意されていますが、水しぶきが多いため着替えがあると安心です。ワットアルンの階段は幼児には急すぎるので、下から見上げるだけにするのがおすすめです。" },
      ],
    ),
    en: en(TH_EN_CTA,
      "Bangkok Thonburi Canal Walk — Waterside Life and Wat Arun",
      "A walking and longtail-boat guide through Bangkok's Thonburi district on the west bank of the Chao Phraya, covering canal-side stilt houses, Wat Arun, the Royal Barge Museum, and the photogenic glass ceiling at Wat Paknam.",
      BANGKOK_THONBURI_IMAGES[0],
      BANGKOK_THONBURI_IMAGES,
      BKK_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Thonburi is the old capital on the west bank of the Chao Phraya — a district that still moves by water while the east bank chases the sky. Wooden stilt houses line narrow canals (khlongs), vendors paddle past in boats, and the pace feels a generation behind central Bangkok. Combining a longtail boat charter with sections on foot lets you reach canal communities no car or bus can enter. Bring a hat, sunglasses, and a waterproof phone case: the boat throws spray, and the sun on the water is relentless.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "For a Wat Arun start, take MRT to Sanam Chai, walk to Tha Tien pier, and cross by ferry. From BTS Wongwian Yai you can walk north through the Thonburi side instead. Longtail boats can be chartered at the Wat Arun pier — expect 1,000–1,500 baht for a one- to two-hour circuit. Agree on route, duration, and price before boarding.",
        },
        {
          heading: "Key Stops",
          body: "Wat Arun's central prang is climbable and rewards you with a 360-degree view of both banks. The Artist House on Khlong Bang Luang stages a traditional Thai puppet show every day at 2 pm — free of charge. The Royal Barge Museum displays eight ceremonial barges used in the king's Kathin procession. Wat Paknam, ten minutes on foot from MRT Bang Phai, has the green glass ceiling that went viral on Instagram — it's genuinely striking in person. Budget 30 minutes for Wat Arun, 20 for the puppet show, and 15 for Wat Paknam.",
        },
        {
          heading: "Best Time and Season",
          body: "Between 8 and 10 am the canals are at their most alive — residents commute by boat, vendors paddle past, and the light is warm. Wat Arun is most photogenic at sunrise or at dusk when its silhouette darkens against the sky (viewed from the east bank). Weekend visits sometimes coincide with small canal-side markets.",
        },
        {
          heading: "Practical Tips",
          body: "Negotiate longtail boat prices before boarding and confirm the exact route. Canal water is not clean — wash your hands promptly if splashed. Wat Arun's prang stairs are steep and uneven; wear shoes with grip. Temple dress code (knees and shoulders covered) applies everywhere. Thonburi has fewer tourist-oriented shops than the east bank, so buy drinking water before you cross the river. A 7-Eleven near Wongwian Yai BTS is the last reliable stop for supplies if you're starting from the south.",
        },
      ],
      [
        { q: "How much does a longtail boat cost?", a: "A private charter runs 1,000–1,500 baht for 1–2 hours. Shared tours sometimes operate from Tha Tien pier for about 300 baht per person." },
        { q: "How do I get to Wat Paknam?", a: "Take the MRT Blue Line to Bang Phai station and walk 10 minutes south. Free shuttle vans occasionally run from the station." },
        { q: "Is the canal area safe?", a: "Daytime is fine, but some wooden canal walkways are old and uneven — watch your step. There's little lighting after dark, so plan to leave before sunset." },
        { q: "Can I bring kids?", a: "Yes — longtail boats carry life jackets. Young children will get splashed, so bring a change of clothes. The Wat Arun stairs are too steep for toddlers; admire from below instead." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 4. Bangkok — Ari Neighbourhood Walk
  // ────────────────────────────────────────────────────────────────
  "bangkok-ari-neighborhood-walk": {
    ja: ja(TH_JA_CTA,
      "バンコク・アーリーのカフェとローカル通り散策",
      "BTSアーリー駅周辺のカフェ、ローカルレストラン、路地裏を巡る街歩きガイド。観光客が少ないバンコクの日常を楽しむルート。",
      BANGKOK_ARI_IMAGES[0],
      BANGKOK_ARI_IMAGES,
      BKK_X,
      [
        {
          heading: "このルートの特徴",
          body: "アーリーはBTSスクンビットライン沿いの住宅街で、バンコクのローカルな日常を感じられるエリアです。パホンヨーティン通りを中心に、独立系カフェ・ベーカリー・古着屋が集まり、週末には若いバンコクっ子で賑わいます。観光名所はありませんが、それがこのエリアの魅力です。路地（ソイ）に入るとレトロなショップハウスが残り、歩くたびに新しい発見があります。暑い時間帯はエアコンの効いたカフェでゆっくり過ごすのが地元流です。",
        },
        {
          heading: "アクセスと起点",
          body: "BTSアーリー駅（出口1）が最寄り。駅を出てすぐのパホンヨーティン通りがメインストリートです。駅周辺にはLa Villa Ariというコミュニティモールがあり、待ち合わせや休憩の拠点になります。",
        },
        {
          heading: "主要スポット",
          body: "パホンヨーティン通りから枝分かれするソイ（小路）にカフェが点在しています。各ソイには独自の雰囲気があり、ソイ・アーリー1にはスペシャルティコーヒーの店が集中。ソイ・アーリー2〜4には地元の食堂やタイ料理レストランが並びます。週末の朝にはアーリー・ガーデンマーケットがオーガニック食材やハンドメイド雑貨を販売しています。",
        },
        {
          heading: "時間帯とタイミング",
          body: "カフェは朝8時頃から営業を始めるところが多く、午前中は比較的空いています。ランチタイム（11:30〜13:00）は地元のオフィスワーカーで混雑します。夕方17時以降は涼しくなり、通り沿いのバーや屋台が活気づきます。週末がもっとも賑やかですが、平日のほうがカフェでゆっくりできます。",
        },
        {
          heading: "実用情報",
          body: "アーリーは日陰が少ないため、日中の移動は帽子と日焼け止めが必須です。カフェ間の移動距離は短いですが、暑い時間帯は無理せずGrabバイクを使うのも手です。支払いはQRコード決済（PromptPay）に対応している店が多いですが、屋台は現金のみです。BTSの駅ナカにはコンビニがあり、水や軽食の補充に便利です。",
        },
      ],
      [
        { q: "おすすめのカフェはどこですか？", a: "ソイ・アーリー1のKaizen Coffee、パホンヨーティン通りのRoots Coffee Roasterが人気です。どちらもスペシャルティコーヒーを扱っています。" },
        { q: "ランチのおすすめは？", a: "ソイ内の地元食堂でカオマンガイやパッタイが50〜80バーツで食べられます。La Villa Ari内にもレストランがあります。" },
        { q: "アーリーから他の観光地へのアクセスは？", a: "BTSでサイアム駅まで約10分、チャトゥチャックウィークエンドマーケットのあるモーチット駅まで約5分です。" },
      ],
    ),
    en: en(TH_EN_CTA,
      "Bangkok Ari Neighbourhood Walk — Cafes and Local Streets",
      "A walking guide to Bangkok's Ari neighbourhood along the BTS Sukhumvit Line, covering independent cafes, local eateries, and the quiet residential sois where everyday Bangkok life unfolds away from tourist crowds.",
      BANGKOK_ARI_IMAGES[0],
      BANGKOK_ARI_IMAGES,
      BKK_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Ari is a residential neighbourhood along the BTS Sukhumvit Line where Bangkok's cafe culture thrives away from any tourist trail. The main drag along Phahonyothin Road and the numbered sois (lanes) branching off it are packed with specialty coffee shops, bakeries, vintage stores, and local Thai restaurants. There are no temples or museums — that's the point. This is where young Bangkokians spend their weekends, and walking the sois reveals retro shophouses, hidden courtyards, and new openings that didn't exist last month. When the heat peaks, do what locals do: sit in an air-conditioned cafe for two hours.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "BTS Ari station (Exit 1) puts you directly on Phahonyothin Road. La Villa Ari, the small community mall at the station's south end, makes a convenient meeting point and has restrooms and a convenience store. From here, walk north along Phahonyothin and dip into the sois as they catch your eye.",
        },
        {
          heading: "Key Stops",
          body: "The sois branching off Phahonyothin each have their own character. Soi Ari 1 is the specialty coffee cluster — three or four roasters within a two-minute walk of each other. Soi Ari 2 through 4 lean toward local Thai restaurants and lunch spots. On weekends, the Ari Garden Market sets up with organic produce and handmade goods. There's no set order — the best approach is to wander, stop when something looks good, and move on when the air conditioning runs out.",
        },
        {
          heading: "Best Time and Season",
          body: "Cafes open around 8 am and the morning hours are quietest. The lunch rush (11:30 am to 1 pm) brings office workers from nearby buildings. After 5 pm the temperature drops and the bar and street food scene picks up. Weekends are liveliest, but weekdays give you empty cafe seats and shorter lines.",
        },
        {
          heading: "Practical Tips",
          body: "Shade is scarce on Phahonyothin Road, so bring a hat and sunscreen for daytime walking. The distances between cafes are short, but in peak heat a Grab motorbike between sois costs about 20 baht and saves you the sweat. Most cafes and restaurants accept QR code payment (PromptPay), but street vendors are cash-only. The 7-Eleven inside BTS Ari station is the easiest supply stop for water and snacks.",
        },
      ],
      [
        { q: "Which cafes should I visit?", a: "Kaizen Coffee on Soi Ari 1 and Roots Coffee Roaster on Phahonyothin are two of the best specialty coffee spots. Both roast in-house." },
        { q: "Where should I eat lunch?", a: "The local food stalls in the sois serve khao man gai and pad thai for 50–80 baht. La Villa Ari also has several sit-down restaurants." },
        { q: "How easy is it to reach other parts of Bangkok from Ari?", a: "BTS Ari is about 10 minutes to Siam station and 5 minutes to Mo Chit for the Chatuchak Weekend Market." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 5. Bangkok — Bang Rak Creative Walk
  // ────────────────────────────────────────────────────────────────
  "bangkok-bang-rak-creative-walk": {
    ja: ja(TH_JA_CTA,
      "バンコク・バーンラック地区のクリエイティブ散策 — チャルンクルン通りとリバーサイド",
      "バンコク最古の舗装道路チャルンクルン通り沿いのギャラリー、倉庫リノベーション、ヨーロッパ建築を巡る街歩きガイド。",
      BANGKOK_BANGRAK_IMAGES[0],
      BANGKOK_BANGRAK_IMAGES,
      BKK_X,
      [
        {
          heading: "このルートの特徴",
          body: "バーンラックは1864年に敷設されたバンコク初の舗装道路チャルンクルン通りを中心に、ヨーロッパ各国の大使館・教会・ホテルが並ぶ歴史地区です。近年は古い倉庫をリノベーションしたギャラリーやクリエイティブスペースが増え、「バンコクのクリエイティブ地区」として注目されています。歩く距離はやや長いですが、チャオプラヤー川沿いの風が心地よく、日陰のある通りも多いため他のエリアよりは暑さが和らぎます。",
        },
        {
          heading: "アクセスと起点",
          body: "BTSサパーンタクシン駅が最寄りで、チャルンクルン通りまで徒歩5分です。MRTシーロム駅からも徒歩圏内。チャルンクルン通りを北上し、リバーサイドに向かって歩くルートが基本形です。",
        },
        {
          heading: "主要スポット",
          body: "Warehouse 30は1940年代の倉庫群をアートギャラリー・カフェ・ショップに転換した複合施設。アサンプション大聖堂はロマネスク様式の美しい教会で、静かに内部を見学できます。シーマハマリアマン寺院はシーロム通りに面するバンコク最古のヒンドゥー寺院。マンダリンオリエンタルホテル周辺はコロニアル建築が集中し、川沿いのカフェからの眺めが優れています。",
        },
        {
          heading: "時間帯とタイミング",
          body: "ギャラリーやクリエイティブスペースは午前11時頃に開くところが多いため、午前中は建築巡り、午後はギャラリー巡りという組み合わせが効率的です。毎月第1土曜日にはチャルンクルン・クリエイティブ地区でアートウォークイベントが開催されることがあります。",
        },
        {
          heading: "実用情報",
          body: "チャルンクルン通りは歩道が狭い区間があるため、車やバイクに注意してください。川沿いのエリアは夕方になると蚊が出るので、虫除けスプレーがあると安心です。ランチはバーンラック市場周辺の食堂が安くて美味しいです。建築写真を撮る場合、寺院や教会の内部は撮影禁止の場所もあるので案内に従ってください。",
        },
      ],
      [
        { q: "Warehouse 30の入場料はかかりますか？", a: "敷地内の散策は無料です。個別のギャラリーで展示によっては入場料がかかる場合があります。" },
        { q: "バーンラックでおすすめのランチは？", a: "バーンラック市場のローカル食堂でタイ料理が50〜100バーツで食べられます。Warehouse 30内のカフェもおすすめです。" },
        { q: "夜の散策はできますか？", a: "チャルンクルン通り沿いは夜も比較的安全ですが、川沿いの裏道は暗いので注意が必要です。リバーサイドのバーやレストランは夜景が綺麗です。" },
      ],
    ),
    en: en(TH_EN_CTA,
      "Bangkok Bang Rak Creative Walk — Charoen Krung Road and the Riverside",
      "A walking guide through Bangkok's Bang Rak district along Charoen Krung Road — the city's first paved street — covering warehouse galleries, European-era churches, riverside colonial architecture, and the emerging creative quarter.",
      BANGKOK_BANGRAK_IMAGES[0],
      BANGKOK_BANGRAK_IMAGES,
      BKK_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Bang Rak centres on Charoen Krung Road, paved in 1864 as Bangkok's first proper street and still lined with European consulates, churches, and grand hotels from the trading era. In recent years, abandoned warehouses along this corridor have been converted into galleries, studios, and cafes, earning the district a reputation as Bangkok's creative quarter. The walk is longer than most Bangkok routes, but the riverside breeze and the shade from old buildings make it more bearable in the heat than the open streets elsewhere.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "BTS Saphan Taksin station is the closest transit stop, five minutes on foot to Charoen Krung Road. MRT Si Lom station is also within walking distance. The standard route runs north along Charoen Krung toward the river, but you can reverse it and start from the Mandarin Oriental end if you prefer.",
        },
        {
          heading: "Key Stops",
          body: "Warehouse 30 is a cluster of 1940s godowns converted into art galleries, cafes, and design shops — entry to the grounds is free. Assumption Cathedral is a Romanesque Revival church where you can sit quietly inside and escape the heat. Sri Mariamman Temple on Silom Road is Bangkok's oldest Hindu temple with an ornate gopuram tower. The stretch around the Mandarin Oriental Hotel concentrates the densest colonial architecture, and the riverside cafes there offer views of passing freight boats.",
        },
        {
          heading: "Best Time and Season",
          body: "Galleries and creative spaces tend to open around 11 am, so spend the morning on the architecture walk and the afternoon inside the galleries. The Charoen Krung Creative District sometimes hosts an art walk on the first Saturday of each month — check local listings.",
        },
        {
          heading: "Practical Tips",
          body: "Sidewalks on Charoen Krung can be narrow and uneven — watch for motorbikes mounting the pavement. Mosquitoes appear along the river at dusk, so carry repellent if you plan to stay into the evening. Lunch at the Bang Rak market food stalls is cheap and good. Some churches and temples prohibit interior photography — follow the posted signs. The walk covers roughly 3 km end to end, so comfortable shoes are essential.",
        },
      ],
      [
        { q: "Is there an entry fee for Warehouse 30?", a: "No — the grounds are free to walk through. Individual galleries may charge for special exhibitions." },
        { q: "Where should I eat in Bang Rak?", a: "The Bang Rak market has local Thai food stalls with meals for 50–100 baht. Cafes inside Warehouse 30 are good for coffee and pastries." },
        { q: "Is it safe to walk at night?", a: "Charoen Krung Road itself is reasonably safe after dark, but the back lanes near the river are poorly lit. The riverside bars and restaurants are popular evening spots with good views." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 6. Chiang Mai — Old City Temple Walk
  // ────────────────────────────────────────────────────────────────
  "chiang-mai-old-city-temple-walk": {
    ja: ja(TH_JA_CTA,
      "チェンマイ旧市街の寺院めぐり — 城壁内の静かな朝散歩",
      "チェンマイ旧市街の城壁内に点在するワットチェディルアン、ワットプラシン、ワットチェンマンを朝の涼しい時間帯に巡る街歩きガイド。",
      CHIANG_MAI_OLD_CITY_IMAGES[0],
      CHIANG_MAI_OLD_CITY_IMAGES,
      CNX_X,
      [
        {
          heading: "このルートの特徴",
          body: "チェンマイ旧市街は約1.5km四方の堀と城壁に囲まれたエリアで、300以上の寺院が密集しています。バンコクの寺院に比べて規模はコンパクトですが、ランナー王朝独特の建築様式が色濃く残り、静かな雰囲気の中で参拝できます。主要な3寺院は徒歩で30分以内に回れる距離にあるため、朝の涼しい時間帯に効率よく巡れます。チェンマイはバンコクより標高が高く若干涼しいですが、3〜5月は40度近くなるため油断は禁物です。",
        },
        {
          heading: "アクセスと起点",
          body: "ターペー門が最もポピュラーな起点で、旧市街の東側入口にあたります。チェンマイ空港からソンテウ（赤いトラック）で約15分、Grabで約10分。旧市街内は車の通行が制限されている通りが多いため、自転車か徒歩が基本の移動手段です。レンタサイクルはターペー門周辺のゲストハウスで1日50〜100バーツで借りられます。",
        },
        {
          heading: "主要スポット",
          body: "ワットチェディルアンは14世紀建立の巨大仏塔で、かつてエメラルド仏が安置されていました。地震で崩壊した部分がそのまま保存されており、迫力があります。ワットプラシンは旧市街で最も格式の高い寺院で、ランナー様式の本堂が美しい。ワットチェンマンはチェンマイ最古の寺院（1296年創建）で、象の台座を持つチェディが特徴的です。三王像広場を起点にすると3つの寺院を効率的に回れます。",
        },
        {
          heading: "時間帯とタイミング",
          body: "早朝6〜7時には僧侶の托鉢（たくはつ）が見られ、写真撮影よりも静かに見守る姿勢が求められます。観光は7〜10時がベスト。11月のロイクラトン（イーペン祭り）期間中は寺院がライトアップされ、ランタンが空に舞う幻想的な光景が見られます。日曜日のターペー門〜ラチャダムヌン通りにはサンデーマーケットが開かれ、寺院巡りと組み合わせられます。",
        },
        {
          heading: "実用情報",
          body: "寺院では膝と肩を覆う服装が必要です。入口でストールの貸し出しがある寺院もありますが、自分で持参するのが確実です。靴を脱ぐ場所が多いため、脱ぎやすい靴を選んでください。旧市街内は日陰が多いですが、水分補給は必須です。寺院の拝観料は無料〜40バーツ程度で、お賽銭（寄付）は20バーツ程度が一般的です。2〜4月のスモークシーズンは大気汚染がひどくなることがあるため、マスクの持参を検討してください。",
        },
      ],
      [
        { q: "3つの寺院を回る所要時間は？", a: "ゆっくり見て2〜3時間です。各寺院20〜30分が目安ですが、写真を撮りながらだともう少しかかります。" },
        { q: "拝観料はかかりますか？", a: "ワットチェディルアンは40バーツ、ワットプラシンは無料（一部エリアは20バーツ）、ワットチェンマンは無料です。" },
        { q: "旧市街内で朝食をとれますか？", a: "ターペー門周辺のカフェが7時頃から開きます。旧市街内にも朝食を出す食堂やゲストハウスのカフェが点在しています。" },
        { q: "スモークシーズンとはいつですか？", a: "例年2月下旬〜4月上旬に農業焼き畑の煙で大気が悪化します。PM2.5が高い日は屋外活動を控え、N95マスクを着用してください。" },
      ],
    ),
    en: en(TH_EN_CTA,
      "Chiang Mai Old City Temple Walk — Morning Stroll Inside the Moat",
      "A walking guide to the walled old city of Chiang Mai covering Wat Chedi Luang, Wat Phra Singh, and Wat Chiang Man in the cool morning hours, with tips on the Lanna architectural style, dress code, and smoke season.",
      CHIANG_MAI_OLD_CITY_IMAGES[0],
      CHIANG_MAI_OLD_CITY_IMAGES,
      CNX_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Chiang Mai's old city is a 1.5 km square bounded by a moat and remnants of medieval walls, packed with over 300 temples. The temples here are smaller than Bangkok's but carry the distinct Lanna architectural style — tiered wooden roofs, naga balustrades, and gilded stucco unique to northern Thailand. The three principal temples sit within a 30-minute walking radius, making an early morning loop easy before the heat sets in. Chiang Mai sits higher than Bangkok and is slightly cooler, but from March through May temperatures still push toward 40°C, and the smoke season adds another reason to walk early.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Tha Phae Gate on the east side of the moat is the most common starting point. From Chiang Mai airport, a red songthaew takes about 15 minutes, or a Grab about 10. Inside the old city, many streets restrict car traffic, so walking or cycling is the default. Rental bicycles are available at guesthouses near Tha Phae Gate for 50–100 baht per day.",
        },
        {
          heading: "Key Stops",
          body: "Wat Chedi Luang's massive 14th-century chedi once held the Emerald Buddha — the earthquake-damaged upper section is left in its ruined state and is genuinely imposing. Wat Phra Singh is the most revered temple in the old city, with a Lanna-style viharn that's considered a masterpiece. Wat Chiang Man is the oldest temple in Chiang Mai, founded in 1296, and features a chedi supported by a base of stone elephants. Start from the Three Kings Monument in the centre and you can loop all three efficiently.",
        },
        {
          heading: "Best Time and Season",
          body: "Between 6 and 7 am, monks walk their alms rounds through the old city — observe quietly without flash photography. For sightseeing, 7 to 10 am is ideal. During Loy Krathong and Yi Peng in November, temples are illuminated and lanterns float into the sky. The Sunday Walking Street market runs along Ratchadamnoen Road from Tha Phae Gate and pairs well with a temple day.",
        },
        {
          heading: "Practical Tips",
          body: "Temple dress code requires covered knees and shoulders. Some temples lend shawls at the entrance, but bringing your own is reliable. Slip-on shoes save time since you'll remove them at every building. The old city has decent tree cover, but carry water regardless. Admission ranges from free to 40 baht; a donation of 20 baht is customary where no formal fee is charged. During smoke season (late February to early April), air quality can deteriorate sharply — carry an N95 mask and check AQI readings before heading out.",
        },
      ],
      [
        { q: "How long does the three-temple loop take?", a: "Allow 2–3 hours at a relaxed pace. Each temple takes about 20–30 minutes, longer if you're photographing." },
        { q: "Are there entry fees?", a: "Wat Chedi Luang charges 40 baht, Wat Phra Singh is free (20 baht for the Lai Kham chapel), and Wat Chiang Man is free." },
        { q: "Can I get breakfast inside the old city?", a: "Yes — cafes near Tha Phae Gate open around 7 am, and several guesthouses serve breakfast to walk-ins." },
        { q: "What is the smoke season?", a: "From late February to early April, agricultural burning causes severe haze. On bad days, PM2.5 can exceed safe levels — wear an N95 mask and limit outdoor time." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 7. Chiang Mai — Nimmanhaemin Walk
  // ────────────────────────────────────────────────────────────────
  "chiang-mai-nimmanhaemin-walk": {
    ja: ja(TH_JA_CTA,
      "チェンマイ・ニマンヘミン通りのカフェとアート散策",
      "チェンマイのクリエイティブ地区ニマンヘミン通りのカフェ、ギャラリー、ショップを巡る街歩きガイド。旧市街とセットで楽しむ現代チェンマイの歩き方。",
      CHIANG_MAI_NIMMANHAEMIN_IMAGES[0],
      CHIANG_MAI_NIMMANHAEMIN_IMAGES,
      CNX_X,
      [
        {
          heading: "このルートの特徴",
          body: "ニマンヘミン通りはチェンマイ旧市街の西側、チェンマイ大学の近くに位置するクリエイティブ地区です。タイ北部のアーティストやデザイナーが集まるエリアで、独立系カフェ・ギャラリー・ブティックが番号付きのソイ（小路）に分散しています。通り全体で約1.5kmと歩きやすい距離で、エアコンの効いたカフェが多いため暑さを凌ぎながらゆっくり散策できます。",
        },
        {
          heading: "アクセスと起点",
          body: "旧市街のスアンドーク門からソンテウで約5分、またはGrabで10分。徒歩だと旧市街北西角から約20分ですが、日中は暑いので乗り物推奨です。One Nimmanモール前が分かりやすい起点で、ここからニマンヘミン通りを北上するルートが基本です。",
        },
        {
          heading: "主要スポット",
          body: "One Nimmanはモダンな商業施設でカフェ・レストラン・雑貨店が入っています。各ソイには個性的な店が隠れており、ソイ9はカフェ密集地帯、ソイ13はアートギャラリーが集まります。Think Parkは木立の中のクリエイティブマーケットで、週末にはハンドメイド作品が並びます。MAYAモールはニマンヘミン北端にある大型ショッピングセンターで、暑さからの避難に最適です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "カフェは9時頃から営業開始。午前中は空いていて作業に集中できます。ランチタイム後の13〜15時は最も暑い時間帯なので、エアコンの効いた施設で過ごすのがベスト。夕方17時以降は気温が下がり、ストリートフードの屋台が出始めます。週末のThink Parkマーケットは午前中が品揃え豊富です。",
        },
        {
          heading: "実用情報",
          body: "ニマンヘミン通りは歩道が整備されており、他のチェンマイのエリアより歩きやすいです。ただしソイに入ると歩道がなくなる箇所もあるため車に注意。支払いはほとんどの店でカードやQR決済が使えます。チェンマイの水道水は飲めないので、ボトルウォーターを持参してください。2〜4月のスモークシーズンは大気汚染が深刻になるため、屋外散策は午前中の短時間に限定するのが無難です。",
        },
      ],
      [
        { q: "旧市街からニマンヘミンへの行き方は？", a: "旧市街北西のスアンドーク門からソンテウで約5分（20〜30バーツ）。Grabなら10分程度です。" },
        { q: "ニマンヘミンでのランチ予算は？", a: "ローカル食堂で60〜100バーツ、カフェのランチセットで150〜300バーツが目安です。" },
        { q: "Wi-Fiのあるカフェは多いですか？", a: "ほぼすべてのカフェにWi-Fiがあり、デジタルノマドの利用者も多いです。電源コンセントも各席に完備されている店が多いです。" },
      ],
    ),
    en: en(TH_EN_CTA,
      "Chiang Mai Nimmanhaemin Walk — Cafes, Art, and the Creative Quarter",
      "A walking guide to Chiang Mai's Nimmanhaemin Road creative district, covering specialty cafes, galleries, design shops, and the numbered sois that make this neighbourhood the city's most walkable modern quarter.",
      CHIANG_MAI_NIMMANHAEMIN_IMAGES[0],
      CHIANG_MAI_NIMMANHAEMIN_IMAGES,
      CNX_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Nimmanhaemin Road runs west of the old city near Chiang Mai University and has become the creative hub of northern Thailand. Independent cafes, galleries, and boutiques scatter across numbered sois (lanes) that branch off the main road, each with its own personality. The whole strip is about 1.5 km long — short enough to walk comfortably, and dense enough with air-conditioned cafes that you're never far from a cool escape when the heat hits. This is modern Chiang Mai at its most walkable.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "From the old city's Suan Dok Gate, a songthaew takes about 5 minutes or a Grab about 10. Walking from the old city's northwest corner takes roughly 20 minutes but is uncomfortable in the midday sun. One Nimman mall at the south end of the strip is the clearest starting point — from there, walk north along Nimmanhaemin and explore the sois as they appeal to you.",
        },
        {
          heading: "Key Stops",
          body: "One Nimman is a sleek commercial complex with cafes, restaurants, and design shops. The numbered sois hide the best finds: Soi 9 is the densest cafe cluster, Soi 13 leans toward art galleries. Think Park is a tree-shaded creative market that comes alive on weekends with handmade crafts and local art. MAYA mall at the north end of Nimmanhaemin is a full-scale shopping centre and the best escape when the heat becomes unbearable.",
        },
        {
          heading: "Best Time and Season",
          body: "Cafes open around 9 am and mornings are quietest — good for focused work or photography. The hottest window is 1 to 3 pm, best spent inside air-conditioned venues. After 5 pm the temperature drops and street food vendors appear. The Think Park weekend market has the best selection in the morning hours.",
        },
        {
          heading: "Practical Tips",
          body: "Nimmanhaemin's main road has good sidewalks, making it more walkable than most of Chiang Mai. Inside the sois, sidewalks sometimes disappear — watch for cars. Most shops accept card and QR payment. Chiang Mai's tap water is not drinkable, so carry bottled water. During smoke season (February to April), air pollution can be severe — limit outdoor time to mornings and check AQI before heading out.",
        },
      ],
      [
        { q: "How do I get from the old city to Nimmanhaemin?", a: "A songthaew from Suan Dok Gate costs 20–30 baht and takes about 5 minutes. Grab is about 10 minutes." },
        { q: "What's the lunch budget on Nimmanhaemin?", a: "Local food stalls run 60–100 baht, and cafe lunch sets are 150–300 baht." },
        { q: "Is Wi-Fi good in the cafes?", a: "Almost every cafe has free Wi-Fi, and many have power outlets at each seat. The area is popular with digital nomads for this reason." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 8. Chiang Mai — Riverside Walk
  // ────────────────────────────────────────────────────────────────
  "chiang-mai-riverside-walk": {
    ja: ja(TH_JA_CTA,
      "チェンマイ・ピン川沿いの朝散歩とワロロット市場",
      "ピン川の西岸を歩き、ワロロット市場とトンラムヤイ花市場を巡るチェンマイの朝散歩ガイド。川沿いのカフェと橋を渡るルート。",
      CHIANG_MAI_RIVERSIDE_IMAGES[0],
      CHIANG_MAI_RIVERSIDE_IMAGES,
      CNX_X,
      [
        {
          heading: "このルートの特徴",
          body: "ピン川はチェンマイ旧市街の東側を南北に流れる川で、川沿いには古いゲストハウス、カフェ、レストランが点在しています。このルートではピン川西岸を歩きながら、チェンマイ最大のローカル市場であるワロロット市場と、隣接するトンラムヤイ花市場を訪れます。早朝は花市場の活気がピークで、地元の人々の日常を間近に感じられます。川沿いは風が通るため、旧市街内よりやや涼しく歩けます。",
        },
        {
          heading: "アクセスと起点",
          body: "ナワラット橋が起点として便利で、旧市街のターペー門から徒歩約10分です。橋を東に渡るとワロロット市場が見えてきます。Grabの場合は「Warorot Market」を目的地に設定するのが最も簡単です。",
        },
        {
          heading: "主要スポット",
          body: "ワロロット市場（カードルアン）はチェンマイ最大の伝統市場で、1階は衣類・日用品、2階は布地、地下は食品売り場になっています。隣のトンラムヤイ花市場は早朝3〜6時が最も活気があり、新鮮な花が山積みされる光景は圧巻です。ナワラット橋とアイアンブリッジはそれぞれ異なる雰囲気で、写真スポットとして人気があります。川の西岸にはリバーサイドカフェが並び、市場巡りの後の休憩に最適です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "花市場は早朝3〜6時がピークですが、朝7〜8時でもまだ品揃えは豊富です。ワロロット市場は8時頃から本格的に動き始め、午前中が最も賑やかです。午後は市場の多くの店が閉まり始めるため、午前中の訪問がおすすめ。川沿いのカフェは夕方の涼しい時間帯が快適です。",
        },
        {
          heading: "実用情報",
          body: "市場内は通路が狭く荷物の多い人には歩きにくいため、身軽な装備で行きましょう。財布やスマホはスリ対策として前ポケットかボディバッグに。市場での支払いは現金が基本で、小額紙幣を用意してください。花市場は水で濡れている箇所が多いため、滑りにくい靴を推奨します。暑さ対策は水分補給と帽子で十分ですが、市場内はエアコンがないため蒸し暑くなります。",
        },
      ],
      [
        { q: "ワロロット市場のおすすめ土産は？", a: "北タイ名物のサイウア（チェンマイソーセージ）、ナムプリックヌム（青唐辛子ディップ）、乾燥フルーツが人気です。" },
        { q: "花市場は何時に行くべきですか？", a: "最も活気があるのは早朝3〜6時ですが、朝7〜8時でも十分楽しめます。9時を過ぎると片付けが始まります。" },
        { q: "市場周辺で朝食はとれますか？", a: "ワロロット市場の地下にカオソーイなどの北タイ料理の屋台があり、朝7時頃から営業しています。市場周辺にも食堂が点在しています。" },
      ],
    ),
    en: en(TH_EN_CTA,
      "Chiang Mai Riverside Walk — Ping River, Warorot Market, and the Flower Market",
      "A morning walking guide along the Ping River in Chiang Mai, covering Warorot Market, the Ton Lam Yai flower market at dawn, and the riverside cafes and bridges that connect the old city to the east bank.",
      CHIANG_MAI_RIVERSIDE_IMAGES[0],
      CHIANG_MAI_RIVERSIDE_IMAGES,
      CNX_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "The Ping River flows along the eastern edge of Chiang Mai's old city, and its west bank is lined with old guesthouses, cafes, and restaurants that predate the city's tourism boom. This route follows the river to Warorot Market — Chiang Mai's largest traditional market — and the adjacent Ton Lam Yai flower market, which peaks before dawn with mountains of fresh flowers. The riverside catches a breeze that makes walking here slightly cooler than the streets inside the moat.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Nawarat Bridge is the most convenient starting point, about a 10-minute walk from Tha Phae Gate. Cross the bridge eastward and Warorot Market is immediately visible. If you're taking a Grab, set your destination to 'Warorot Market' for the most accurate drop-off.",
        },
        {
          heading: "Key Stops",
          body: "Warorot Market (Kad Luang) is Chiang Mai's main traditional market — ground floor for clothes and household goods, second floor for textiles, and basement for food. Next door, the Ton Lam Yai flower market is most spectacular between 3 and 6 am when fresh flowers are piled high on the stalls. Nawarat Bridge and the old Iron Bridge upstream are both popular photography spots. The west-bank riverside cafes make a perfect post-market coffee stop.",
        },
        {
          heading: "Best Time and Season",
          body: "The flower market peaks between 3 and 6 am, but is still worth visiting at 7–8 am. Warorot Market gets going around 8 am and is busiest through the morning. Most stalls close by early afternoon, so plan a morning visit. Riverside cafes are most pleasant in the late afternoon when temperatures start to drop.",
        },
        {
          heading: "Practical Tips",
          body: "The market aisles are narrow and crowded — travel light and keep bags small. Secure your wallet and phone in a front body bag to prevent pickpocketing. Cash is the standard market currency, so bring small bills. The flower market floor is often wet, so wear shoes with grip. Hydration and a hat are sufficient for heat protection, but the interior of the market has no air conditioning and can get stuffy.",
        },
      ],
      [
        { q: "What souvenirs should I buy at Warorot?", a: "Northern Thai specialties like sai ua (Chiang Mai sausage), nam prik num (green chilli dip), and dried fruit are all popular and easy to transport." },
        { q: "What time should I visit the flower market?", a: "The peak is 3–6 am, but 7–8 am is still good. By 9 am stalls start packing up." },
        { q: "Can I get breakfast at the market?", a: "The basement food court at Warorot serves northern Thai dishes like khao soi from about 7 am. Food stalls also line the streets around the market." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 9. Hanoi — Old Quarter Walk
  // ────────────────────────────────────────────────────────────────
  "hanoi-old-quarter-walk": {
    ja: ja(VN_JA_CTA,
      "ハノイ旧市街36通りの散策 — ホアンキエム湖から路地裏まで",
      "ハノイ旧市街（オールドクォーター）の36通りを巡る街歩きガイド。ホアンキエム湖、ドンスアン市場、トレインストリートまで網羅。バイクと歩行者が混在する独特の街の歩き方。",
      HANOI_OLD_QUARTER_IMAGES[0],
      HANOI_OLD_QUARTER_IMAGES,
      HAN_X,
      [
        {
          heading: "このルートの特徴",
          body: "ハノイ旧市街は「36通り」と呼ばれる歴史的な商業地区で、各通りが扱う商品にちなんだ名前を持っています（ハンガイ通り＝絹、ハンバック通り＝銀など）。狭い路地にバイク・自転車・歩行者・天秤棒を担いだ物売りが入り混じる混沌とした活気が最大の魅力です。ホアンキエム湖を南端の起点にして北へ向かうと、徐々にローカル色が濃くなっていきます。ハノイの夏は高温多湿ですが、旧市街の細い通りは建物の影が多く、直射日光を避けやすいのが利点です。",
        },
        {
          heading: "アクセスと起点",
          body: "ホアンキエム湖の北岸が定番の起点です。ノイバイ空港から旧市街まではGrabで約40分（30万〜40万ドン）。旧市街内は徒歩が最も確実な移動手段で、道路の横断にはバイクの流れを読みながらゆっくり一定のペースで渡るのがコツです（急に止まったり走ったりしないこと）。",
        },
        {
          heading: "主要スポット",
          body: "ホアンキエム湖畔のゴックソン寺は赤い橋（テーフック橋）で渡る小島にあり、旧市街散策のスタート地点として最適です。ドンスアン市場は旧市街最大の屋根付き市場で、食品から衣料品まで何でも揃います。マーマイ通り87番地の「旧家」は伝統的なチューブハウスの内部を見学できる貴重な施設。トレインストリートは住宅の間をすり抜ける列車の線路で、カフェから間近に通過を見られます（運行スケジュールを事前確認）。",
        },
        {
          heading: "時間帯とタイミング",
          body: "早朝6〜7時は地元の人々がフォーの朝食をとる時間帯で、路上の食堂が最も活気づきます。日中は気温が上がるため、11〜14時はカフェで休憩するのが賢明。週末（金曜夜〜日曜夜）はホアンキエム湖周辺が歩行者天国になり、ナイトマーケットも開かれます。旧正月（テト、1〜2月）期間は多くの店が休業するので注意。",
        },
        {
          heading: "実用情報",
          body: "道路の横断は最初は怖いですが、コツは「一定のゆっくりしたペースで歩き続けること」です。バイクがあなたを避けてくれます。急に止まるとかえって危険です。貴重品はスリ対策でボディバッグに入れ、スマホを歩きながら持つのは避けましょう（ひったくりのリスク）。水分補給は必須で、コンビニ（Circle K等）が旧市街内に点在しています。路上の食堂ではプラスチックの小さな椅子に座って食べるのがハノイスタイルです。",
        },
      ],
      [
        { q: "旧市街でフォーのおすすめ店は？", a: "Pho Gia Truyen（ファーザートゥイエン）はバットダン通りにある地元民に人気の名店。朝6時から営業し、昼前に売り切れることもあります。" },
        { q: "トレインストリートは見られますか？", a: "列車は1日に数本しか通過しません。現在、安全上の理由で規制が強化されており、カフェからの観覧のみ可能な場合があります。最新の状況を現地で確認してください。" },
        { q: "バイクの交通は本当に安全ですか？", a: "慣れが必要ですが、地元の人の歩き方を観察し、一定速度で歩き続ければバイクが避けてくれます。大通りの横断が不安な場合は地元の人の横について渡りましょう。" },
        { q: "ホアンキエム湖の歩行者天国はいつですか？", a: "毎週金曜18時〜日曜22時まで湖周辺が歩行者天国になります。ナイトマーケットやストリートパフォーマンスがあり、最も賑やかな時間帯です。" },
      ],
    ),
    en: en(VN_EN_CTA,
      "Hanoi Old Quarter Walk — The 36 Streets from Hoan Kiem Lake to the Alleys",
      "A walking guide to Hanoi's Old Quarter covering the historic 36 Streets, Hoan Kiem Lake, Dong Xuan Market, Train Street, and practical advice on crossing roads in Southeast Asia's most chaotic pedestrian environment.",
      HANOI_OLD_QUARTER_IMAGES[0],
      HANOI_OLD_QUARTER_IMAGES,
      HAN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Hanoi's Old Quarter is known as the '36 Streets' — a medieval trading district where each street is named after the goods it historically sold (Hang Gai for silk, Hang Bac for silver, and so on). The chaos of motorbikes, bicycles, pedestrians, and vendors carrying shoulder poles through narrow lanes is the defining experience of Hanoi. Starting from Hoan Kiem Lake at the south end and walking north, the streets get progressively more local and less polished. Summer heat is intense and humidity high, but the narrow streets create natural shade from the buildings on each side.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "The north shore of Hoan Kiem Lake is the classic starting point. From Noi Bai airport, a Grab takes about 40 minutes and costs 300,000–400,000 VND. Inside the Old Quarter, walking is the only reliable way to move. Crossing roads requires reading the motorbike flow and walking at a slow, steady pace — bikes will swerve around you. The critical rule: never stop suddenly or run.",
        },
        {
          heading: "Key Stops",
          body: "Ngoc Son Temple sits on a small island in Hoan Kiem Lake, reached by a red bridge, and makes the natural starting point. Dong Xuan Market is the largest covered market in the quarter — food, clothing, electronics, everything. The Heritage House at 87 Ma May Street is one of the few tube houses open to the public, showing how these narrow, deep buildings are structured. Train Street is the rail line running between houses — cafes along the track let you watch trains pass at arm's length, though access is increasingly restricted for safety.",
        },
        {
          heading: "Best Time and Season",
          body: "From 6 to 7 am, locals eat pho at sidewalk stalls and the streets are at their most atmospheric. Midday heat (11 am to 2 pm) is best spent inside a cafe. On weekends (Friday evening through Sunday night), the streets around Hoan Kiem Lake become a pedestrian zone with a night market and street performances. During Tet (Vietnamese New Year, January–February), most shops close for a week or more.",
        },
        {
          heading: "Practical Tips",
          body: "Road crossing feels terrifying at first, but the technique is simple: walk at a slow, constant pace and let the motorbikes flow around you. Stopping or running is what causes accidents. Keep valuables in a cross-body bag, and avoid holding your phone out while walking — snatch thefts from passing bikes do happen. Stay hydrated with water from Circle K or other convenience stores scattered through the quarter. Eating at street stalls means sitting on tiny plastic stools — it's how Hanoi works, and the food is usually excellent.",
        },
      ],
      [
        { q: "Where is the best pho in the Old Quarter?", a: "Pho Gia Truyen on Bat Dan Street is a local institution. It opens at 6 am and often sells out before noon — go early." },
        { q: "Can I still visit Train Street?", a: "Trains run only a few times a day. Access has been restricted for safety — currently you may only watch from designated cafes along the track. Check locally for the latest rules." },
        { q: "Is motorbike traffic really safe for pedestrians?", a: "It takes practice, but the system works: walk at a steady pace and bikes avoid you. Watch locals and follow their lead. For wide intersections, walk beside a local crossing at the same time." },
        { q: "When is the Hoan Kiem pedestrian zone open?", a: "Every Friday from 6 pm through Sunday at 10 pm. The area comes alive with night markets and street performers." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 10. Hanoi — West Lake Morning Walk
  // ────────────────────────────────────────────────────────────────
  "hanoi-west-lake-morning-walk": {
    ja: ja(VN_JA_CTA,
      "ハノイ西湖（ホータイ）の朝散歩 — 鎮国寺と花市場",
      "ハノイ最大の湖ホータイ（西湖）の東岸を歩く朝散歩ガイド。鎮国寺、クアンアン花市場、タンニエン通りの湖畔ウォーキング。",
      HANOI_WEST_LAKE_IMAGES[0],
      HANOI_WEST_LAKE_IMAGES,
      HAN_X,
      [
        {
          heading: "このルートの特徴",
          body: "ホータイ（西湖）はハノイ最大の湖で、周囲約17kmの湖畔は朝のジョギングや散歩を楽しむ市民で賑わいます。旧市街の喧騒とは対照的に穏やかな雰囲気で、湖面に映る朝日が美しいエリアです。東岸のタンニエン通り沿いには鎮国寺（チャンクオック寺）やカフェが並び、北西部にはクアンアン花市場があります。バイクの騒音が少なく、ハノイで最もリラックスして歩けるルートのひとつです。",
        },
        {
          heading: "アクセスと起点",
          body: "旧市街からGrabで約10分。タンニエン通りの南端（チュックバック湖との分岐点）が起点として分かりやすいです。ここから北上すると鎮国寺、さらに進むとホータイ湖畔に出ます。レンタサイクルで湖を一周する場合は2〜3時間が目安です。",
        },
        {
          heading: "主要スポット",
          body: "鎮国寺はハノイ最古の仏教寺院で、湖に突き出た細い半島に建っています。入場無料ですが、膝と肩を覆う服装が必要です。クアンアン花市場は深夜2時〜早朝6時が最も活気があり、蓮の花やジャスミンが山積みされます。フータイホー寺は湖の北西に位置する道教寺院で、地元の参拝者が絶えません。湖畔のカフェからは穏やかな湖の景色を楽しめます。",
        },
        {
          heading: "時間帯とタイミング",
          body: "朝5〜7時は地元の人が太極拳やジョギングをしている時間帯で、最もハノイらしい朝の光景が見られます。花市場を目的にするなら3〜5時の暗い時間帯が本番です。日中は湖畔に日陰が少ないため、10時以降は暑さが厳しくなります。蓮の花のシーズンは6〜7月で、湖面がピンクの花で覆われる美しい時期です。",
        },
        {
          heading: "実用情報",
          body: "タンニエン通りは歩道が整備されていて歩きやすいですが、湖の北岸は歩道が途切れる箇所があります。日焼け止めと帽子は必須。花市場に行く場合は未明の暗い時間帯になるため、Grabで直接行くのが安全です。湖畔には7-Elevenなどのコンビニは少ないため、水は事前に購入してください。蚊が多いエリアなので虫除けスプレーがあると安心です。",
        },
      ],
      [
        { q: "鎮国寺の拝観料はいくらですか？", a: "入場無料です。ただし膝と肩を覆う服装が必要で、不適切な場合は入口で断られることがあります。" },
        { q: "花市場は観光客でも行けますか？", a: "はい、誰でも見学できます。ただし深夜〜早朝の営業なので、Grabタクシーで行くのが安全です。花の購入も可能で、価格は数万ドン程度です。" },
        { q: "湖を一周するのにどのくらいかかりますか？", a: "徒歩だと4〜5時間かかります。レンタサイクルなら2〜3時間が目安。暑い時期は半周（東岸のみ）にとどめるのが無難です。" },
      ],
    ),
    en: en(VN_EN_CTA,
      "Hanoi West Lake Morning Walk — Tran Quoc Pagoda and the Flower Market",
      "A morning walking guide around the eastern shore of Ho Tay (West Lake), Hanoi's largest lake, covering Tran Quoc Pagoda, the Quang An flower market before dawn, and the peaceful lakeside path along Thanh Nien Road.",
      HANOI_WEST_LAKE_IMAGES[0],
      HANOI_WEST_LAKE_IMAGES,
      HAN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Ho Tay (West Lake) is Hanoi's largest lake, roughly 17 km around its perimeter, and its shores are where Hanoians come to exercise, walk, and breathe. The contrast with the Old Quarter's motorbike chaos is immediate — here the pace drops, the noise fades, and the morning light on the water is genuinely beautiful. The eastern shore along Thanh Nien Road is the most developed section, with Tran Quoc Pagoda, lakeside cafes, and a paved path. The Quang An flower market on the northwest shore is one of Hanoi's great pre-dawn spectacles.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "From the Old Quarter, a Grab takes about 10 minutes. The south end of Thanh Nien Road, where West Lake separates from Truc Bach Lake, is the clearest starting point. Walk north along Thanh Nien to reach Tran Quoc Pagoda, then continue along the lakeshore. A rental bicycle takes 2–3 hours to circuit the full lake.",
        },
        {
          heading: "Key Stops",
          body: "Tran Quoc Pagoda is Hanoi's oldest Buddhist temple, perched on a narrow peninsula extending into the lake. Admission is free but knees and shoulders must be covered. The Quang An flower market is most alive between 2 and 6 am — lotus, jasmine, and roses stacked in fragrant mountains. Phu Tay Ho temple on the northwest shore is a Taoist pilgrimage site with constant local foot traffic. The lakeside cafes along Thanh Nien Road serve good Vietnamese coffee with calm water views.",
        },
        {
          heading: "Best Time and Season",
          body: "Between 5 and 7 am, locals practice tai chi and jog along the lake — the most characteristically Hanoian morning scene. The flower market peaks at 3–5 am in the dark. After 10 am, shade along the lake thins and the heat builds. Lotus season runs from June through July, when the lake surface is dotted with pink blooms.",
        },
        {
          heading: "Practical Tips",
          body: "Thanh Nien Road has a good sidewalk and is comfortable walking. The north shore path is less maintained and may lack sidewalks in places. Bring sunscreen and a hat. If you're visiting the flower market before dawn, take a Grab directly — walking alone at that hour is not advised. Convenience stores are scarce along the lake, so buy water in advance. Mosquitoes are common near the water, especially at dusk — carry insect repellent.",
        },
      ],
      [
        { q: "Is there an entry fee for Tran Quoc Pagoda?", a: "No — admission is free. A dress code (covered knees and shoulders) is enforced at the entrance." },
        { q: "Can tourists visit the flower market?", a: "Yes, anyone can walk through. The market runs from roughly 2–6 am, so take a Grab there. You can buy flowers — prices start at a few tens of thousands of VND per bunch." },
        { q: "How long does it take to walk around the entire lake?", a: "On foot, 4–5 hours. By bicycle, 2–3 hours. In hot weather, walking just the eastern shore is a more manageable option." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 11. Hanoi — French Quarter Walk
  // ────────────────────────────────────────────────────────────────
  "hanoi-french-quarter-walk": {
    ja: ja(VN_JA_CTA,
      "ハノイ・フレンチクォーターの建築散歩 — オペラハウスから並木道へ",
      "ハノイのフレンチクォーターに残るフランス植民地時代の建築を巡る街歩きガイド。オペラハウス、メトロポールホテル、トランティエン通りの並木道。",
      HANOI_FRENCH_QUARTER_IMAGES[0],
      HANOI_FRENCH_QUARTER_IMAGES,
      HAN_X,
      [
        {
          heading: "このルートの特徴",
          body: "フレンチクォーターはホアンキエム湖の南東に広がるエリアで、19世紀末〜20世紀初頭のフランス植民地時代の建築が数多く残っています。パリの街並みを模した並木道、ネオクラシカル様式のオペラハウス、コロニアルホテルが点在し、旧市街とはまったく異なる雰囲気です。通りが広く日陰の並木が多いため、旧市街より歩きやすいのも特徴。建築に興味がない方でも、カフェ文化が発達しているエリアなので十分楽しめます。",
        },
        {
          heading: "アクセスと起点",
          body: "ホアンキエム湖の南東角が起点で、旧市街からは湖を渡って徒歩10分程度です。トランティエン通りが湖からオペラハウスへ一直線に結ぶメインストリートです。Grabで「Hanoi Opera House」を目的地にするのも便利。",
        },
        {
          heading: "主要スポット",
          body: "ハノイ・オペラハウスはパリのパレ・ガルニエを模した1911年竣工の建物で、外観の鑑賞は自由です（内部は公演チケットが必要）。メトロポールホテルは1901年開業の伝説的なコロニアルホテルで、ロビーは宿泊客以外でもカフェ利用可能。ベトナム歴史博物館はインドシナ様式の建物自体が見どころ。リータイトー公園はオペラハウス前の緑地で、地元の人の憩いの場です。バーディン広場方面に足を延ばすとホーチミン廟も訪問可能です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "建築写真は午前中の柔らかい光が最適。オペラハウスは西向きなので午前中が順光になります。博物館は8時〜17時の営業が多く、月曜休館が一般的。メトロポールのカフェは終日営業していますが、午後のアフタヌーンティーが人気です。週末はリータイトー公園周辺でストリートパフォーマンスが見られることもあります。",
        },
        {
          heading: "実用情報",
          body: "フレンチクォーターは旧市街より歩道が広く整備されていますが、バイクが歩道に駐輪していることが多いです。日中の暑さ対策として帽子・日焼け止め・水が必須です。フレンチクォーターのカフェやレストランは旧市街より価格帯がやや高めですが、エアコン完備の店が多く快適です。写真撮影は公共の場所なら問題ありませんが、軍事施設や政府庁舎の撮影は避けてください。",
        },
      ],
      [
        { q: "オペラハウスの内部は見学できますか？", a: "通常は公演チケットがないと入れません。公演スケジュールはオペラハウスの公式サイトで確認できます。" },
        { q: "メトロポールホテルのカフェは予約が必要ですか？", a: "カフェはウォークイン可能です。アフタヌーンティーは人気があるため予約推奨。ドレスコードはスマートカジュアル程度です。" },
        { q: "旧市街とフレンチクォーターは同じ日に回れますか？", a: "はい、ホアンキエム湖を挟んで隣接しているので、午前に旧市街、午後にフレンチクォーター（またはその逆）が可能です。" },
      ],
    ),
    en: en(VN_EN_CTA,
      "Hanoi French Quarter Walk — Opera House to Tree-Lined Boulevards",
      "A walking guide through Hanoi's French Quarter covering the Opera House, Metropole Hotel, the National Museum of Vietnamese History, and the colonial-era boulevards south of Hoan Kiem Lake.",
      HANOI_FRENCH_QUARTER_IMAGES[0],
      HANOI_FRENCH_QUARTER_IMAGES,
      HAN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "The French Quarter stretches southeast of Hoan Kiem Lake and preserves the most concentrated collection of French colonial architecture in Hanoi. Built between the 1880s and the 1940s, the district features broad tree-lined boulevards, a neoclassical opera house, and grand colonial hotels — a stark contrast to the Old Quarter's medieval maze. The wide streets and mature trees provide more shade and space than anywhere else in central Hanoi, making this the most comfortable walking district in the city. Even if colonial architecture isn't your focus, the cafe culture here is excellent.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "The southeast corner of Hoan Kiem Lake is the natural starting point — about a 10-minute walk from the Old Quarter. Trang Tien Street runs in a straight line from the lake to the Opera House and forms the main axis of the walk. Taking a Grab to 'Hanoi Opera House' is the simplest option if you're coming from elsewhere.",
        },
        {
          heading: "Key Stops",
          body: "The Hanoi Opera House (1911) was modelled on the Palais Garnier — the exterior is freely viewable, but the interior requires a performance ticket. The Sofitel Legend Metropole (1901) is Hanoi's most storied colonial hotel; its lobby cafe is open to non-guests. The National Museum of Vietnamese History occupies an Indochinese-style building that is itself an architectural attraction. Ly Thai To Park in front of the Metropole is the quarter's main green space. An extension northwest reaches Ba Dinh Square and the Ho Chi Minh Mausoleum.",
        },
        {
          heading: "Best Time and Season",
          body: "Morning light is best for architectural photography — the Opera House faces west, so morning sun lights the facade evenly. Museums generally open 8 am to 5 pm and close on Mondays. The Metropole's cafe operates all day, but afternoon tea is the signature experience. On weekends, street performers sometimes appear around Ly Thai To Park.",
        },
        {
          heading: "Practical Tips",
          body: "Sidewalks in the French Quarter are wider than in the Old Quarter, but motorbikes parked on pavements remain a constant obstacle. Heat protection (hat, sunscreen, water) is essential during the day. Cafes and restaurants in this district are pricier than the Old Quarter but almost all have air conditioning. Photography is fine in public spaces, but avoid pointing cameras at military installations or government buildings.",
        },
      ],
      [
        { q: "Can I visit the Opera House interior?", a: "Only with a performance ticket. Check the Opera House's official website for the schedule." },
        { q: "Do I need a reservation at the Metropole cafe?", a: "The cafe accepts walk-ins, but afternoon tea is popular and worth booking ahead. Dress code is smart casual." },
        { q: "Can I combine the Old Quarter and French Quarter in one day?", a: "Yes — they adjoin each other across Hoan Kiem Lake. A typical approach is the Old Quarter in the morning and the French Quarter in the afternoon, or vice versa." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 12. Ho Chi Minh City — District 1 Walk
  // ────────────────────────────────────────────────────────────────
  "hcmc-district-1-walk": {
    ja: ja(VN_JA_CTA,
      "ホーチミン1区の仏蘭西建築散策 — 大聖堂から統一会堂まで",
      "ホーチミンシティ1区に残るフランス植民地時代の建築を巡る街歩きガイド。サイゴン大教会、中央郵便局、統一会堂、ベンタイン市場を網羅。",
      HCMC_DISTRICT_1_IMAGES[0],
      HCMC_DISTRICT_1_IMAGES,
      SGN_X,
      [
        {
          heading: "このルートの特徴",
          body: "ホーチミンシティの1区はかつてのサイゴン中心部で、フランス植民地時代の壮麗な建築群が近代的なビルの間に残っています。サイゴン大教会、中央郵便局、統一会堂という主要3か所が徒歩圏内に収まり、コンパクトに回れます。ドンコイ通りはかつてのリュ・カティナで、ブティックやカフェが並ぶ歩きやすいメインストリートです。一年中暑いホーチミンでは、朝の涼しい時間帯に建築巡りを済ませ、午後はエアコン付きのカフェか博物館で過ごすのが賢明です。",
        },
        {
          heading: "アクセスと起点",
          body: "ベンタイン市場がランドマークとして分かりやすい起点です。タンソンニャット空港からGrabで約30分（15万〜20万ドン）。メトロ1号線（2024年開業）のベンタイン駅も利用可能です。1区内は徒歩が基本ですが、暑い時間帯はGrabバイク（セオム）を使って効率よく移動できます。",
        },
        {
          heading: "主要スポット",
          body: "サイゴン大教会（ノートルダム大聖堂）は赤レンガのネオロマネスク様式で、建材はすべてフランスから運ばれました（現在改修中、外観のみ見学可の場合あり）。中央郵便局はギュスターヴ・エッフェルの事務所が設計した1891年竣工の建物で、内部のアーチ天井は必見。統一会堂は1975年のベトナム戦争終結の舞台となった場所で、内部見学が可能です。ドンコイ通りは植民地時代のリュ・カティナで、カフェやショップが連なります。",
        },
        {
          heading: "時間帯とタイミング",
          body: "朝7〜10時が建築巡りに最適です。統一会堂は7:30〜11:00と13:00〜16:00に開館（昼休みあり）。ベンタイン市場は6時から営業し、午前中が活気があります。夜はドンコイ通り周辺がライトアップされ、人民委員会庁舎の夜景が美しいです。",
        },
        {
          heading: "実用情報",
          body: "ホーチミンは年間平均気温が28度以上で、常に暑いです。帽子、日焼け止め、水は必携。雨季（5〜11月）は午後に激しいスコールが来るため折りたたみ傘を持参してください。バイクのひったくりが報告されているため、歩道側の手でバッグを持ち、スマホを道路側で使わないこと。大教会周辺ではフレンドリーに話しかけてくる人が観光案内を装ったぼったくりの場合があるので注意してください。",
        },
      ],
      [
        { q: "サイゴン大教会の改修はいつ終わりますか？", a: "長期改修中で終了時期は未定です。外観は足場で一部覆われている場合がありますが、広場からの眺めは楽しめます。最新情報を現地で確認してください。" },
        { q: "統一会堂の入場料はいくらですか？", a: "65,000ドン（約400円）です。日本語のオーディオガイドの貸し出しもあります。" },
        { q: "ベンタイン市場での値段交渉のコツは？", a: "最初の提示価格の50〜60%で交渉を始めるのが一般的です。笑顔で交渉すること、合意できなければ立ち去ると安くしてくれることが多いです。" },
        { q: "1区で安全にATMを使える場所は？", a: "ドンコイ通り沿いやベンタイン市場周辺の銀行ATMが安全です。路上の独立型ATMはスキミングのリスクがあるため避けてください。" },
      ],
    ),
    en: en(VN_EN_CTA,
      "Ho Chi Minh City District 1 Walk — French Colonial Architecture from Cathedral to Reunification Palace",
      "A walking guide through HCMC's District 1 covering Notre-Dame Cathedral, the Central Post Office, Reunification Palace, Dong Khoi Street, and Ben Thanh Market, with tips on heat, scams, and snatch theft prevention.",
      HCMC_DISTRICT_1_IMAGES[0],
      HCMC_DISTRICT_1_IMAGES,
      SGN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "District 1 is the old centre of Saigon, where grand French colonial buildings stand shoulder-to-shoulder with modern towers. The three marquee sites — Notre-Dame Cathedral, the Central Post Office, and the Reunification Palace — are all within walking distance of each other, making this one of the most compact architectural walks in Southeast Asia. Dong Khoi Street (the former Rue Catinat) links them in a pleasant boulevard lined with cafes and boutiques. Ho Chi Minh City is hot year-round, so plan the outdoor portion for early morning and retreat to air-conditioned museums or cafes by midday.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "Ben Thanh Market is the most recognizable landmark to start from. A Grab from Tan Son Nhat airport takes about 30 minutes (150,000–200,000 VND). Metro Line 1 (opened 2024) stops at Ben Thanh station. Walking is the default within District 1, but Grab motorbikes are useful for covering longer gaps in the heat.",
        },
        {
          heading: "Key Stops",
          body: "Notre-Dame Cathedral (Saigon) is a red-brick neo-Romanesque church built entirely with materials shipped from France — currently under long-term restoration, so exterior viewing may be limited. The Central Post Office, designed by Gustave Eiffel's firm and completed in 1891, has a stunning arched interior you can walk through freely. The Reunification Palace preserves the exact moment the Vietnam War ended in April 1975 — the interior tour takes about an hour. Dong Khoi Street is the spine of the walk, pleasant for strolling from end to end.",
        },
        {
          heading: "Best Time and Season",
          body: "The 7–10 am window is best for outdoor walking. The Reunification Palace opens 7:30–11:00 and 13:00–16:00 (closed at lunch). Ben Thanh Market opens at 6 am and is most energetic in the morning. After dark, Dong Khoi Street lights up and the People's Committee Hall illumination is worth seeing.",
        },
        {
          heading: "Practical Tips",
          body: "Ho Chi Minh City averages above 28°C year-round — hat, sunscreen, and water are non-negotiable. During rainy season (May to November), afternoon downpours arrive almost daily; carry a compact umbrella. Snatch theft from passing motorbikes is a real risk: carry your bag on the building side of the pavement and don't hold your phone out near the road. Around the cathedral, friendly strangers who offer to guide you may be running an overcharging scam — politely decline unsolicited help.",
        },
      ],
      [
        { q: "When will the cathedral restoration finish?", a: "The timeline is open-ended. Scaffolding may cover parts of the facade, but the square in front is still worth visiting. Check locally for the latest status." },
        { q: "How much is the Reunification Palace entry fee?", a: "65,000 VND (about US$2.60). Audio guides in multiple languages, including Japanese, are available." },
        { q: "How do I bargain at Ben Thanh Market?", a: "Start at 50–60% of the first price quoted. Stay friendly, and if you can't agree, walk away — vendors often call you back with a lower price." },
        { q: "Where can I safely use an ATM in District 1?", a: "Bank ATMs along Dong Khoi Street or inside Ben Thanh Market are safest. Avoid standalone ATMs on the street, which carry a skimming risk." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 13. Ho Chi Minh City — Cholon Chinatown Walk
  // ────────────────────────────────────────────────────────────────
  "hcmc-cholon-chinatown-walk": {
    ja: ja(VN_JA_CTA,
      "ホーチミン・チョロン（5区）のチャイナタウン歩き — 天后宮とビンタイ市場",
      "ホーチミン最大のチャイナタウン、チョロン（5区・6区）を巡る街歩きガイド。天后宮、ビンタイ市場、チャータム教会を中心に。",
      HCMC_CHOLON_IMAGES[0],
      HCMC_CHOLON_IMAGES,
      SGN_X,
      [
        {
          heading: "このルートの特徴",
          body: "チョロンはベトナム最大のチャイナタウンで、ホーチミンシティの5区・6区にまたがっています。18世紀から続く華人コミュニティの中心地で、天后宮（ティエンハウ寺）、ビンタイ市場、漢方薬局街など中華文化が色濃く残ります。1区の観光エリアとは異なるディープなローカル感が魅力で、歩くほどに発見があるエリアです。通りは狭くバイクが多いため、ハノイ旧市街と同様の注意が必要です。",
        },
        {
          heading: "アクセスと起点",
          body: "1区のベンタイン市場からGrabで約15分。チョロンのバスターミナル付近が起点として便利です。メトロは現時点でチョロンまで到達していないため、Grabかタクシーがメインのアクセス手段になります。チョロン内は徒歩が基本です。",
        },
        {
          heading: "主要スポット",
          body: "天后宮（ティエンハウ寺）は1760年創建のチョロンで最も重要な中国寺院で、渦巻き線香が天井から吊り下げられた独特の光景が特徴です。ビンタイ市場はアールデコ様式の中庭を持つ卸売市場で、食品・乾物・雑貨が山積み。チャータム教会は1963年のクーデターでジエム大統領が最後に避難した場所として歴史的に重要です。グエンチャイ通りの漢方薬局街も独特の雰囲気があります。",
        },
        {
          heading: "時間帯とタイミング",
          body: "ビンタイ市場は早朝5時から活気づき、午前中がピーク。天后宮は朝7時から参拝可能で、午前中の柔らかい光の中で線香の煙が美しく映えます。午後は暑さが厳しいため、朝〜午前中の訪問がベストです。旧正月（テト）期間はチョロン全体が祝祭ムードに包まれ、獅子舞やパレードが見られます。",
        },
        {
          heading: "実用情報",
          body: "チョロンは観光客向けの案内が少ないため、Googleマップの事前ダウンロードをおすすめします。通信環境が不安定な場合に備えてオフラインマップも用意してください。支払いは現金が基本で、小額紙幣を多めに持参。1区より治安がやや不安定とされるため、高価な装飾品は身につけず、バッグは体の前に持ちましょう。暑さ対策は他のホーチミンエリアと同様、帽子・水・日焼け止めが必須です。",
        },
      ],
      [
        { q: "チョロンは安全ですか？", a: "日中は概ね安全ですが、1区より観光客が少なくスリのリスクがやや高いです。貴重品はボディバッグに入れ、夜間の裏通りは避けてください。" },
        { q: "天后宮の拝観料はかかりますか？", a: "入場無料です。寄付として線香を購入することができます（1万〜2万ドン程度）。" },
        { q: "1区からチョロンへの最も安い行き方は？", a: "市営バス（1番線など）で7,000ドン程度ですが、乗り方が分かりにくいためGrab（5万〜7万ドン）が確実です。" },
      ],
    ),
    en: en(VN_EN_CTA,
      "Ho Chi Minh City Cholon Chinatown Walk — Thien Hau Temple and Binh Tay Market",
      "A walking guide through Cholon, Ho Chi Minh City's sprawling Chinatown in Districts 5 and 6, covering Thien Hau Temple, Binh Tay Market, Cha Tam Church, and the traditional Chinese medicine street.",
      HCMC_CHOLON_IMAGES[0],
      HCMC_CHOLON_IMAGES,
      SGN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Cholon is Vietnam's largest Chinatown, spreading across Districts 5 and 6 of Ho Chi Minh City. Established by Chinese merchants in the 18th century, it retains a density of temples, medicine shops, and wholesale markets that feels like a separate city from District 1. Thien Hau Temple with its coiled incense hanging from the ceiling, the art-deco courtyard of Binh Tay Market, and the herbal medicine lanes along Nguyen Trai Street give the walk a depth that the tourist centre simply doesn't offer. The streets are narrow and motorbike-heavy — cross with the same steady-pace technique as in Hanoi.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "From Ben Thanh Market in District 1, a Grab takes about 15 minutes. The area around Cholon's bus terminal is a convenient starting point. The metro does not yet reach Cholon, so Grab or taxi is the primary transport. Once there, walk — the distances between sites are short.",
        },
        {
          heading: "Key Stops",
          body: "Thien Hau Temple (1760) is the spiritual centre of Cholon's Cantonese community — the coiled incense spirals hanging from the ceiling are its most distinctive visual. Binh Tay Market is the wholesale heart of Cholon with an art-deco courtyard surrounded by stalls of dried goods, food, and household items. Cha Tam Church is historically significant as the last refuge of President Diem during the 1963 coup. The herbal medicine shops lining Nguyen Trai Street add a fragrant, old-world dimension to the walk.",
        },
        {
          heading: "Best Time and Season",
          body: "Binh Tay Market starts at 5 am and peaks through the morning. Thien Hau Temple opens at 7 am — the incense smoke photographs beautifully in soft morning light. Afternoon heat makes early-morning visits strongly preferable. During Tet (Vietnamese New Year), Cholon erupts with dragon dances, lion performances, and the most festive decorations in the city.",
        },
        {
          heading: "Practical Tips",
          body: "Cholon has minimal tourist signage, so download Google Maps offline in advance. Mobile signal can be patchy in the dense market interiors. Cash is the default payment method — bring small bills. The area is considered slightly less safe than District 1, so leave flashy jewellery at the hotel and keep your bag in front. Heat management is the same as elsewhere in HCMC: hat, water, sunscreen, and a willingness to duck into a tea shop when you overheat.",
        },
      ],
      [
        { q: "Is Cholon safe?", a: "Daytime is generally safe, but pickpocket risk is higher than in District 1 since there are fewer tourists and more crowded lanes. Keep valuables secure and avoid back alleys at night." },
        { q: "Is there an entry fee for Thien Hau Temple?", a: "No — admission is free. You can purchase incense as a donation for about 10,000–20,000 VND." },
        { q: "What's the cheapest way to get from District 1 to Cholon?", a: "City bus (Line 1 and others) costs about 7,000 VND, but route navigation can be confusing. A Grab at 50,000–70,000 VND is the most reliable option." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 14. Singapore — Kampong Glam Walk
  // ────────────────────────────────────────────────────────────────
  "singapore-kampong-glam-walk": {
    ja: ja(SG_JA_CTA,
      "シンガポール・カンポングラムのアラブストリート散策",
      "シンガポール最古の都市地区カンポングラムを歩く街歩きガイド。サルタンモスク、ハジレーン、アラブストリート、マレーヘリテージセンターを巡る。",
      SINGAPORE_KAMPONG_GLAM_IMAGES[0],
      SINGAPORE_KAMPONG_GLAM_IMAGES,
      SIN_X,
      [
        {
          heading: "このルートの特徴",
          body: "カンポングラムはシンガポール最古の都市地区のひとつで、1822年にスタンフォード・ラッフルズが指定したマレー・アラブ人居住区がルーツです。金色のドームが印象的なサルタンモスクを中心に、アラブストリートの布地・香水店、ハジレーンのカラフルなストリートアート、ブッソーラ通りのカフェが歩ける範囲に集まっています。シンガポールは年中高温多湿ですが、このエリアはショップハウスの軒先に日陰が多く、比較的歩きやすいです。",
        },
        {
          heading: "アクセスと起点",
          body: "MRTブギス駅（ダウンタウンライン・東西線）が最寄りで、出口Bからアラブストリート方面へ徒歩5分です。MRTニコルハイウェイ駅からも徒歩圏内。サルタンモスクの正面に位置するブッソーラ通りが起点として分かりやすいです。",
        },
        {
          heading: "主要スポット",
          body: "サルタンモスクは1824年に初代が建設され、現在の建物は1932年に再建されたシンガポール最大のモスクです。非ムスリムも見学可能ですが、礼拝時間中は制限があります。入口で無料のローブを借りて肌を覆う必要があります。ハジレーンはシンガポールで最も狭い通りで、カラフルな壁画と個性的なブティックが並びます。アラブストリートにはテキスタイルや中東の香水を扱う老舗が残ります。マレーヘリテージセンター（旧イスタナ・カンポングラム宮殿）ではマレー文化の歴史展示が見られます。",
        },
        {
          heading: "時間帯とタイミング",
          body: "午前10時〜12時が最も歩きやすい時間帯です。サルタンモスクの見学は10:00〜12:00と14:00〜16:00が一般的（金曜は礼拝のため制限あり）。ハジレーンのショップは11時頃から開き始め、夕方以降はバーやカフェが賑わいます。ラマダン期間中はモスク周辺に夜市（バザール）が出ることがあります。",
        },
        {
          heading: "実用情報",
          body: "サルタンモスク見学時は膝下丈のボトムスと肩を覆うトップスが必要です。入口で無料のローブが借りられますが、最初から適切な服装で行くとスムーズです。シンガポールは年中30度前後で湿度が高いため、水分補給をこまめに行ってください。カフェや飲食店はカード決済が主流ですが、小さな布地店は現金のみの場合があります。ハジレーンは写真スポットとして人気ですが、壁画前に立つ人が多いため、朝早い時間が撮影しやすいです。",
        },
      ],
      [
        { q: "サルタンモスクの見学は無料ですか？", a: "はい、無料です。非ムスリムの見学時間は通常10:00〜12:00と14:00〜16:00ですが、金曜は礼拝のため制限されます。" },
        { q: "ハジレーンのおすすめショップは？", a: "ハジレーンには独立系ブティック、ヴィンテージショップ、レコード店が並びます。特定の店は入れ替わりが激しいため、当日歩いて気に入った店に入るのが楽しみ方です。" },
        { q: "カンポングラムでのランチおすすめは？", a: "ブッソーラ通りのZam Zamは1908年創業のマルタバク（インド風パンケーキ）の老舗。アラブストリート周辺にはトルコ料理やレバノン料理のレストランもあります。" },
      ],
    ),
    en: en(SG_EN_CTA,
      "Singapore Kampong Glam Walk — Arab Street, Sultan Mosque, and Haji Lane",
      "A walking guide to Kampong Glam, Singapore's oldest urban quarter, covering Sultan Mosque, the colourful murals of Haji Lane, Arab Street textile shops, and the Malay Heritage Centre.",
      SINGAPORE_KAMPONG_GLAM_IMAGES[0],
      SINGAPORE_KAMPONG_GLAM_IMAGES,
      SIN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Kampong Glam is one of Singapore's oldest districts, designated as the Malay-Arab quarter by Stamford Raffles in 1822. Sultan Mosque's golden dome anchors the neighbourhood, and around it the streets radiate outward with textile shops, perfumeries, street art, and cafes packed into heritage shophouses. The area is compact — you can walk every lane in two hours — and the shophouse overhangs provide welcome shade in Singapore's year-round heat and humidity.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "MRT Bugis station (Downtown and East-West lines) is the nearest stop — take Exit B and walk five minutes toward Arab Street. MRT Nicoll Highway is also within walking distance. Bussorah Street, directly facing Sultan Mosque, is the clearest starting point.",
        },
        {
          heading: "Key Stops",
          body: "Sultan Mosque is Singapore's largest mosque — the current 1932 building replaced an 1824 original. Non-Muslims are welcome outside prayer times; free robes are available at the entrance to cover bare skin. Haji Lane is Singapore's narrowest street, lined with colourful murals and indie boutiques. Arab Street retains old-school textile and Middle Eastern perfume shops. The Malay Heritage Centre (housed in the former Istana Kampong Glam palace) covers the history of Singapore's Malay community.",
        },
        {
          heading: "Best Time and Season",
          body: "Late morning (10 am to noon) is the best walking window. Sultan Mosque visiting hours for non-Muslims are typically 10:00–12:00 and 14:00–16:00 (restricted on Fridays for prayers). Haji Lane shops open around 11 am, and the street's bars and cafes come alive in the evening. During Ramadan, a night bazaar sometimes sets up around the mosque.",
        },
        {
          heading: "Practical Tips",
          body: "Mosque dress code requires covered knees and shoulders — free robes are available at the door, but dressing appropriately in advance is faster. Singapore is hot (around 30°C) and humid year-round, so drink water constantly. Most cafes and restaurants accept cards and mobile payment, but some small textile shops are cash-only. Haji Lane's murals are a popular photo spot; early morning means fewer people blocking the walls.",
        },
      ],
      [
        { q: "Is Sultan Mosque free to visit?", a: "Yes — free and open to non-Muslims typically from 10:00–12:00 and 14:00–16:00. Friday hours are restricted for prayers." },
        { q: "What should I buy on Haji Lane?", a: "The boutiques rotate frequently, so browse on the day. You'll find indie fashion, vintage goods, and vinyl records among the current mix." },
        { q: "Where should I eat in Kampong Glam?", a: "Zam Zam on Bussorah Street has been serving murtabak (stuffed Indian pancake) since 1908. Turkish and Lebanese restaurants cluster around Arab Street." },
      ],
    ),
  },

  // ────────────────────────────────────────────────────────────────
  // 15. Singapore — Tiong Bahru Walk
  // ────────────────────────────────────────────────────────────────
  "singapore-tiong-bahru-walk": {
    ja: ja(SG_JA_CTA,
      "シンガポール・ティオンバルのアールデコ建築とカフェ散策",
      "シンガポール最古の公共住宅地区ティオンバルを歩く街歩きガイド。1930年代のアールデコ建築、ホーカーセンター、独立系カフェを巡るルート。",
      SINGAPORE_TIONG_BAHRU_IMAGES[0],
      SINGAPORE_TIONG_BAHRU_IMAGES,
      SIN_X,
      [
        {
          heading: "このルートの特徴",
          body: "ティオンバルはシンガポール初の公共住宅地区（1936年建設）で、流線型モダニズム（ストリームラインモダン）様式のSIT（シンガポール改良信託）フラットが残る貴重なエリアです。曲線的なバルコニーと白い外壁が特徴の低層アパートメントが整然と並び、その1階にはカフェ、書店、ブティックが入居しています。再開発が進むシンガポールにあって、ティオンバルは戦前の街並みがほぼそのまま保存された稀有な地区です。コンパクトなエリアなので1〜2時間で一周できます。",
        },
        {
          heading: "アクセスと起点",
          body: "MRTティオンバル駅（東西線）が最寄りで、出口Aから地上に出るとすぐにティオンバルの住宅街が広がります。ティオンバル市場（ホーカーセンター）を起点にすると、朝食→建築散策→カフェのルートがスムーズです。",
        },
        {
          heading: "主要スポット",
          body: "ティオンバル市場は1階がウェットマーケット（生鮮食品）、2階がホーカーセンター（屋台村）になっており、地元で人気の朝食スポットです。チェベイ（粿汁）やロティプラタが名物。SITフラットはセンポー通りとティオンバル通り沿いに集中しており、曲線バルコニーを外から眺められます。鳥鳴きコーナー（バードシンギングコーナー）は住民が鳥かごを吊るして鳥のさえずりを楽しむシンガポール独特の文化スポットでしたが、現在は壁画としてその記憶が残されています。キティアンコン寺はエリア最古の宗教施設です。",
        },
        {
          heading: "時間帯とタイミング",
          body: "ホーカーセンターは朝7時から営業し、8〜10時が最も活気があります。カフェは9時頃から開店。建築散策は午前中の柔らかい光の中がベストです。午後は日差しが強くなりますが、エリアが小さいためカフェでの休憩を挟みながら回れます。平日は地元住民の日常が感じられ、週末はカフェが混雑します。",
        },
        {
          heading: "実用情報",
          body: "ティオンバルは住宅街なので、建物内部への無断侵入はせず、外観からの鑑賞にとどめてください。SITフラットの住民のプライバシーを尊重しましょう。カフェはカード決済可能な店が多いですが、ホーカーセンターは現金が基本です。暑さ対策として帽子と水を持参してください。MRTティオンバル駅周辺にはコンビニがあります。雨具を持っていると突然のスコールに対応できます。",
        },
      ],
      [
        { q: "ティオンバル市場のおすすめ屋台は？", a: "Zhong Yu Yuan（中玉园）のチェベイ、Tiong Bahru Lor Meeのロールミー、Loo's Hainanese Curry Riceのカレーライスが定番です。" },
        { q: "アールデコ建築はどこで見られますか？", a: "センポー通りとティオンバル通りの交差点周辺にSITフラットが集中しています。特にブロック78〜82が保存状態が良いです。" },
        { q: "ティオンバルから他の観光地へのアクセスは？", a: "MRT東西線でチャイナタウン駅まで2駅（約5分）、シティホール駅まで約10分です。" },
      ],
    ),
    en: en(SG_EN_CTA,
      "Singapore Tiong Bahru Walk — Art Deco Architecture and Neighbourhood Cafes",
      "A walking guide to Tiong Bahru, Singapore's oldest public housing estate, covering 1930s Streamline Moderne SIT flats, the Tiong Bahru Market hawker centre, and the independent cafe scene in one of the city's best-preserved heritage quarters.",
      SINGAPORE_TIONG_BAHRU_IMAGES[0],
      SINGAPORE_TIONG_BAHRU_IMAGES,
      SIN_X,
      [
        {
          heading: "What Makes This Route Special",
          body: "Tiong Bahru is Singapore's first public housing estate, built in 1936 by the Singapore Improvement Trust (SIT) in a Streamline Moderne style that remains remarkably intact. The low-rise apartment blocks with their curved balconies and white facades feel like a different city from the glass towers a few MRT stops away. Ground-floor units have been taken over by cafes, bookshops, and boutiques, creating a walkable neighbourhood that blends pre-war architecture with a contemporary cafe culture. The whole estate can be covered on foot in one to two hours.",
        },
        {
          heading: "Getting There and Starting Point",
          body: "MRT Tiong Bahru station (East-West Line), Exit A, puts you at the edge of the estate immediately. Starting at Tiong Bahru Market lets you have breakfast first, then walk the architecture, then finish with coffee — a natural morning sequence.",
        },
        {
          heading: "Key Stops",
          body: "Tiong Bahru Market has a wet market on the ground floor and a hawker centre on the second floor — it's one of Singapore's best breakfast spots. Chwee kueh (steamed rice cakes) and roti prata are the signatures. The SIT flats are concentrated along Seng Poh Road and Tiong Bahru Road — walk the perimeter and look up at the distinctive curved balconies. The bird singing corner is now commemorated by a mural — it marks the spot where residents once hung birdcages to listen to their birds sing. Qi Tian Gong Temple is the oldest religious structure in the estate.",
        },
        {
          heading: "Best Time and Season",
          body: "The hawker centre is busiest from 8 to 10 am. Cafes open around 9 am. Morning light is best for photographing the white facades. Afternoons get hot, but the estate is compact enough to manage with cafe stops in between. Weekdays feel more local; weekends bring cafe crowds.",
        },
        {
          heading: "Practical Tips",
          body: "Tiong Bahru is a residential neighbourhood — admire the SIT flats from the outside and respect residents' privacy. Most cafes accept cards, but hawker stalls are typically cash-only. Bring a hat and water for heat protection. There are convenience stores near MRT Tiong Bahru station. Carry a compact umbrella for sudden rain showers, which can hit any time of year in Singapore.",
        },
      ],
      [
        { q: "What should I eat at Tiong Bahru Market?", a: "Zhong Yu Yuan's chwee kueh, Tiong Bahru Lor Mee, and Loo's Hainanese Curry Rice are long-standing favourites." },
        { q: "Where are the best art deco buildings?", a: "The SIT flats along Seng Poh Road near its intersection with Tiong Bahru Road — blocks 78 to 82 are the best preserved." },
        { q: "How do I get from Tiong Bahru to other attractions?", a: "MRT East-West Line takes you to Chinatown in 2 stops (about 5 minutes) and City Hall in about 10 minutes." },
      ],
    ),
  },
};

export const SOUTHEAST_ASIA_GUIDE_SLUGS = Object.keys(SOUTHEAST_ASIA_GUIDE_CONTENT);
