import { createHash } from "node:crypto";

type GuideLocale = "en" | "ja" | "ko" | "zh";

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

// ─── Commons helpers ──────────────────────────────────────────────

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

const KR_JA_CTA = {
  ctaTitle: "韓国旅行の通信をもっと楽に",
  ctaButton: "韓国のeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const KR_EN_CTA = {
  ctaTitle: "Stay connected in South Korea",
  ctaButton: "View Korea eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const TW_JA_CTA = {
  ctaTitle: "台湾旅行の通信をもっと楽に",
  ctaButton: "台湾のeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const TW_EN_CTA = {
  ctaTitle: "Stay connected in Taiwan",
  ctaButton: "View Taiwan eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Locale wrappers ──────────────────────────────────────────────

function ja(
  cta: typeof KR_JA_CTA,
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
  cta: typeof KR_EN_CTA,
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
      "These embeds are chosen per article so the references stay tied to the town, district, or market the guide is actually about.",
    xEmbeds,
    sections,
    faq,
    ...cta,
  };
}

// ─── Image libraries ──────────────────────────────────────────────

// Seoul – Ikseon-dong
const IKSEON_IMAGES: GuideMediaImage[] = [
  img("File:Seoul-Ikseon-dong-01.jpg", 1600, 1067, "Ikseon-dong hanok cafe alley in Seoul", "Ikseon-dong's narrow hanok alleys have become one of Seoul's most photogenic cafe streets."),
  img("File:Ikseon-dong Hanok Village Seoul.jpg", 1600, 1067, "Renovated hanok in Ikseon-dong", "Renovated hanok buildings now house independent cafes, boutiques, and dessert shops."),
  img("File:Jongno 3-ga Seoul.jpg", 1600, 1067, "Jongno 3-ga area near Ikseon-dong", "Jongno 3-ga station is the main access point for both Ikseon-dong and the surrounding Jongno nightlife."),
  img("File:Tapgol Park Seoul.jpg", 1600, 1067, "Tapgol Park near Ikseon-dong", "Tapgol Park, a short walk from Ikseon-dong, preserves the Wongaksa pagoda and is tied to the March 1st Movement."),
  img("File:Nakwon Musical Instrument Arcade Seoul.jpg", 1600, 1067, "Nakwon Instrument Arcade", "Nakwon Instrument Arcade sits between Ikseon-dong and Insadong and is worth a detour for music fans."),
  img("File:Insadong Seoul.jpg", 1600, 1067, "Insadong traditional street near Ikseon-dong", "Insadong's main street is a natural extension of an Ikseon-dong walk."),
];

// Seoul – Bukchon & Samcheong-dong
const BUKCHON_IMAGES: GuideMediaImage[] = [
  img("File:Korea-Seoul-Bukchon-01.jpg", 1600, 1067, "Bukchon Hanok Village rooftops in Seoul", "Bukchon Hanok Village's curved rooftop line against Namsan is the iconic Seoul heritage view."),
  img("File:Bukchon Hanok Village Seoul.jpg", 1600, 1067, "Hanok alley in Bukchon", "The narrow lanes between Gahoe-dong 11 and 31 are the most photographed spots in Bukchon."),
  img("File:Samcheong-dong Seoul.jpg", 1600, 1067, "Samcheong-dong street with galleries", "Samcheong-dong's tree-lined street connects Bukchon to the National Museum of Modern Art."),
  img("File:Gyeongbokgung Palace Seoul.jpg", 1600, 1067, "Gyeongbokgung Palace main hall", "Gyeongbokgung is the natural start or finish of a Bukchon–Samcheong-dong loop."),
  img("File:Changdeokgung Palace Seoul.jpg", 1600, 1067, "Changdeokgung Palace secret garden entrance", "Changdeokgung's Secret Garden tour is a timed-entry extension on the eastern edge of Bukchon."),
  img("File:National Folk Museum of Korea Seoul.jpg", 1600, 1067, "National Folk Museum of Korea", "The National Folk Museum sits inside the Gyeongbokgung grounds and needs no separate ticket."),
];

// Seoul – Mangwon & Mapo
const MANGWON_IMAGES: GuideMediaImage[] = [
  img("File:Mangwon Market Seoul.jpg", 1600, 1067, "Mangwon Market entrance in Seoul", "Mangwon Market is a covered local market with street food stalls and fresh produce vendors."),
  img("File:Mangwon Hangang Park Seoul.jpg", 1600, 1067, "Mangwon Hangang Park along the river", "Mangwon Hangang Park is a riverside green space popular for picnics and evening walks."),
  img("File:Hapjeong-dong Seoul.jpg", 1600, 1067, "Hapjeong-dong cafe street", "Hapjeong's cafe-lined blocks connect Mangwon to Hongdae without the crowds."),
  img("File:Mapo-gu Seoul skyline.jpg", 1600, 1067, "Mapo-gu skyline view", "The Mapo district skyline from the Hangang riverside walking path."),
  img("File:Seoul World Cup Stadium.jpg", 1600, 1067, "Seoul World Cup Stadium near Mapo", "The World Cup Stadium and surrounding park are a short walk north of Mangwon."),
  img("File:Hongdae Street Seoul.jpg", 1600, 1067, "Hongdae street scene", "Hongdae's pedestrian zone is one stop south on the subway from Mangwon."),
];

// Seoul – Yeonnam-dong
const YEONNAM_IMAGES: GuideMediaImage[] = [
  img("File:Yeonnam-dong Seoul.jpg", 1600, 1067, "Yeonnam-dong greenway in Seoul", "The Gyeongui Line Forest Park is a converted rail corridor that defines Yeonnam-dong's character."),
  img("File:Gyeongui Line Forest Park Seoul.jpg", 1600, 1067, "Gyeongui Line Forest Park path", "The park's sunken walkway is lined with independent cafes and small restaurants."),
  img("File:Yeonnam-dong cafe street Seoul.jpg", 1600, 1067, "Yeonnam-dong cafe corner", "The side streets off the greenway are packed with specialty coffee shops and brunch spots."),
  img("File:Dongjin Market Seoul.jpg", 1600, 1067, "Dongjin Market in Yeonnam-dong", "Dongjin Market is a small traditional market that adds a local contrast to the cafe scene."),
  img("File:Hongdae area Seoul night.jpg", 1600, 1067, "Hongdae area at night", "Yeonnam-dong transitions smoothly into Hongdae's nightlife zone to the south."),
  img("File:Seoul Gyeongui Line sunset.jpg", 1600, 1067, "Sunset along the Gyeongui Line greenway", "The greenway catches sunset light well and is best walked from north to south in the evening."),
];

// Busan – Gamcheon
const GAMCHEON_IMAGES: GuideMediaImage[] = [
  img("File:Gamcheon Culture Village Busan.jpg", 1600, 1067, "Gamcheon Culture Village hillside in Busan", "Gamcheon's pastel-painted houses cascade down the hillside in layers."),
  img("File:Gamcheon Culture Village art.jpg", 1600, 1067, "Street art in Gamcheon Culture Village", "Public art installations and murals mark the walking route through the village."),
  img("File:Gamcheon Village view Busan.jpg", 1600, 1067, "Panoramic view of Gamcheon Culture Village", "The upper viewpoint gives a full panorama of the colourful rooftop pattern."),
  img("File:Busan Gamcheon stairs.jpg", 1600, 1067, "Stairway path in Gamcheon Village", "The stairway paths between houses form the main pedestrian circulation through the village."),
  img("File:Gamcheon Little Prince statue.jpg", 1600, 1067, "Little Prince statue at Gamcheon", "The Little Prince photo spot is the single most queued attraction in the village."),
  img("File:Toseong-dong Busan.jpg", 1600, 1067, "Toseong-dong area near Gamcheon", "The surrounding Toseong-dong neighbourhood preserves the original hillside residential feel."),
];

// Busan – Haeundae
const HAEUNDAE_IMAGES: GuideMediaImage[] = [
  img("File:Haeundae Beach Busan.jpg", 1600, 1067, "Haeundae Beach panorama in Busan", "Haeundae Beach is the most recognized stretch of sand in South Korea."),
  img("File:Haeundae Beach Busan morning.jpg", 1600, 1067, "Early morning at Haeundae Beach", "The beach before 8 am is almost empty and offers the best walking conditions."),
  img("File:Dongbaek Island Busan.jpg", 1600, 1067, "Dongbaek Island coastal trail near Haeundae", "Dongbaek Island's loop trail starts at the APEC House end of Haeundae Beach."),
  img("File:Dalmaji Hill Busan.jpg", 1600, 1067, "Dalmaji Hill road above Haeundae", "Dalmaji Hill's cherry-tree-lined road climbs from Haeundae toward Songjeong."),
  img("File:Haedong Yonggungsa Busan.jpg", 1600, 1067, "Haedong Yonggungsa Temple by the sea", "Haedong Yonggungsa is a seaside temple reachable by bus from Haeundae."),
  img("File:Busan Marine City skyline.jpg", 1600, 1067, "Marine City skyline behind Haeundae", "The Marine City high-rise cluster forms the backdrop to Haeundae Beach."),
];

// Busan – Nampo & Jagalchi
const NAMPO_IMAGES: GuideMediaImage[] = [
  img("File:Jagalchi Market Busan.jpg", 1600, 1067, "Jagalchi Fish Market exterior in Busan", "Jagalchi Market is Korea's largest fish market, stretching along the Nampo waterfront."),
  img("File:Jagalchi Market interior Busan.jpg", 1600, 1067, "Inside Jagalchi Market fish stalls", "The ground-floor wet market lets you pick fish and have it prepared upstairs."),
  img("File:BIFF Square Busan.jpg", 1600, 1067, "BIFF Square street food alley", "BIFF Square is the old Busan International Film Festival grounds, now a street food zone."),
  img("File:Gukje Market Busan.jpg", 1600, 1067, "Gukje International Market in Nampo", "Gukje Market's covered arcades sell everything from fabric to dried seafood."),
  img("File:Yongdusan Park Busan Tower.jpg", 1600, 1067, "Busan Tower atop Yongdusan Park", "Yongdusan Park and Busan Tower give a harbour overlook between Nampo and Jagalchi."),
  img("File:Nampo-dong Busan street.jpg", 1600, 1067, "Nampo-dong shopping street", "Nampo-dong's main shopping street connects BIFF Square to the Lotte Department Store area."),
];

// Jeju – Hallim Coast
const HALLIM_IMAGES: GuideMediaImage[] = [
  img("File:Hyeopjae Beach Jeju.jpg", 1600, 1067, "Hyeopjae Beach on Jeju Island", "Hyeopjae Beach's turquoise water and white sand rival any tropical destination."),
  img("File:Hallim Park Jeju.jpg", 1600, 1067, "Hallim Park botanical garden in Jeju", "Hallim Park combines botanical gardens with lava tube caves in a single compound."),
  img("File:Biyangdo Island Jeju.jpg", 1600, 1067, "Biyangdo Island seen from Hallim", "Biyangdo Island is a 15-minute ferry ride from Hallim Port for a half-day extension."),
  img("File:Geumneung Beach Jeju.jpg", 1600, 1067, "Geumneung Beach next to Hyeopjae", "Geumneung Beach sits right next to Hyeopjae and is usually less crowded."),
  img("File:Hallim coastal road Jeju.jpg", 1600, 1067, "Coastal road near Hallim", "The coastal road between Hallim and Hyeopjae is a popular cycling and walking route."),
  img("File:Jeju stone wall village.jpg", 1600, 1067, "Traditional stone wall village in Jeju", "Jeju's distinctive basalt stone walls line the paths between Hallim's villages."),
];

// Jeju – Seogwipo
const SEOGWIPO_IMAGES: GuideMediaImage[] = [
  img("File:Seogwipo Olle Market.jpg", 1600, 1067, "Seogwipo Maeil Olle Market", "Seogwipo's Maeil Olle Market is a daily market with fresh seafood and local produce."),
  img("File:Cheonjiyeon Waterfall Jeju.jpg", 1600, 1067, "Cheonjiyeon Waterfall in Seogwipo", "Cheonjiyeon Waterfall is a short walk south from the Seogwipo harbour area."),
  img("File:Jeongbang Waterfall Jeju.jpg", 1600, 1067, "Jeongbang Waterfall dropping into the sea", "Jeongbang is one of the few waterfalls in Asia that drops directly into the ocean."),
  img("File:Seogwipo harbour Jeju.jpg", 1600, 1067, "Seogwipo fishing harbour", "The Seogwipo harbour is lined with raw-fish restaurants and diving tour operators."),
  img("File:Lee Jung-seop Gallery Seogwipo.jpg", 1600, 1067, "Lee Jung-seop Art Street in Seogwipo", "Lee Jung-seop Street is a small art-gallery district named after the Korean painter."),
  img("File:Soesokkak Estuary Jeju.jpg", 1600, 1067, "Soesokkak Estuary in Seogwipo", "Soesokkak Estuary offers kayaking through volcanic rock formations east of Seogwipo."),
];

// Jeju – Udo Island
const UDO_IMAGES: GuideMediaImage[] = [
  img("File:Udo Island Jeju Korea.jpg", 1600, 1067, "Udo Island aerial view off Jeju", "Udo Island is a small volcanic island reachable by a 15-minute ferry from Seongsan."),
  img("File:Udo Sanho Beach Jeju.jpg", 1600, 1067, "Sanho Beach on Udo Island", "Sanho Beach's coral sand gives the water an unusually vivid colour."),
  img("File:Udo Peak lighthouse Jeju.jpg", 1600, 1067, "Udo Peak lighthouse viewpoint", "The Udo Peak lighthouse offers a 360-degree view of Jeju's east coast."),
  img("File:Hagosudong Beach Udo.jpg", 1600, 1067, "Hagosudong Beach on Udo", "Hagosudong Beach on Udo's south coast has calm shallow water and basalt rocks."),
  img("File:Seongsan Ilchulbong Jeju.jpg", 1600, 1067, "Seongsan Ilchulbong seen from Udo ferry", "Seongsan Ilchulbong crater is visible from the Udo ferry terminal."),
  img("File:Udo Island peanut ice cream.jpg", 1600, 1067, "Udo peanut ice cream shop", "Udo's local peanut ice cream is the island's signature snack."),
];

// Taipei – Dadaocheng & Dihua Street
const DADAOCHENG_IMAGES: GuideMediaImage[] = [
  img("File:Dihua Street Taipei.jpg", 1600, 1067, "Dihua Street baroque facades in Taipei", "Dihua Street's Baroque-style merchant buildings are the oldest commercial row in Taipei."),
  img("File:Dadaocheng Taipei.jpg", 1600, 1067, "Dadaocheng waterfront area", "The Dadaocheng wharf area along the Tamsui River has been redeveloped as a public promenade."),
  img("File:Xiahai City God Temple Taipei.jpg", 1600, 1067, "Xiahai City God Temple on Dihua Street", "Xiahai City God Temple is a compact but heavily visited temple on Dihua Street."),
  img("File:Dihua Street dried goods Taipei.jpg", 1600, 1067, "Traditional dried goods shops on Dihua Street", "The traditional dried goods and Chinese medicine shops still operate alongside new boutiques."),
  img("File:Yongle Market Taipei.jpg", 1600, 1067, "Yongle Market fabric building", "Yongle Market's upper floors are a multi-storey fabric market popular with local designers."),
  img("File:Dadaocheng Theatre Taipei.jpg", 1600, 1067, "Dadaocheng Theatre building", "The restored Dadaocheng Theatre hosts Taiwanese opera performances on weekends."),
];

// Taipei – Yongkang Street
const YONGKANG_IMAGES: GuideMediaImage[] = [
  img("File:Yongkang Street Taipei.jpg", 1600, 1067, "Yongkang Street food area in Taipei", "Yongkang Street is Taipei's most concentrated stretch of restaurants and dessert shops."),
  img("File:Din Tai Fung Yongkang Taipei.jpg", 1600, 1067, "Din Tai Fung original Yongkang branch", "The original Din Tai Fung branch on Yongkang Street still draws long queues."),
  img("File:Yongkang Park Taipei.jpg", 1600, 1067, "Yongkang Park and neighbourhood", "Yongkang Park is a small green anchor in the middle of the food district."),
  img("File:Dongmen Station Taipei.jpg", 1600, 1067, "Dongmen MRT Station entrance", "Dongmen MRT station is the access point for Yongkang Street on the red and orange lines."),
  img("File:Chiang Kai-shek Memorial Hall Taipei.jpg", 1600, 1067, "CKS Memorial Hall near Yongkang", "Chiang Kai-shek Memorial Hall is a 10-minute walk east from Yongkang Street."),
  img("File:Da'an Forest Park Taipei.jpg", 1600, 1067, "Da'an Forest Park in Taipei", "Da'an Forest Park is a large green space one stop south of Yongkang on the MRT."),
];

// Taipei – Beitou
const BEITOU_IMAGES: GuideMediaImage[] = [
  img("File:Beitou Hot Spring Museum.jpg", 1600, 1067, "Beitou Hot Spring Museum exterior", "The Beitou Hot Spring Museum is a preserved Japanese-era public bathhouse turned museum."),
  img("File:Beitou Thermal Valley Taipei.jpg", 1600, 1067, "Thermal Valley green sulphur spring", "Thermal Valley's steaming green sulphur pool is Beitou's most dramatic natural feature."),
  img("File:Beitou Public Hot Spring Taipei.jpg", 1600, 1067, "Beitou public outdoor hot spring", "Millennium Hot Spring is a public outdoor facility at the foot of the Thermal Valley."),
  img("File:Beitou Library Taipei.jpg", 1600, 1067, "Beitou Public Library green building", "The Beitou branch library is a multi-award-winning green building inside the hot spring park."),
  img("File:Xinbeitou Station Taipei.jpg", 1600, 1067, "Restored Xinbeitou Station building", "The restored Xinbeitou Station building is a small railway heritage exhibit."),
  img("File:Beitou Puji Temple Taipei.jpg", 1600, 1067, "Puji Temple in Beitou hot spring area", "Puji Temple overlooks the hot spring creek valley and the museum below."),
];

// Taipei – Songshan Cultural
const SONGSHAN_IMAGES: GuideMediaImage[] = [
  img("File:Songshan Cultural and Creative Park Taipei.jpg", 1600, 1067, "Songshan Cultural and Creative Park main building", "Songshan Cultural Park is a converted tobacco factory now used for design exhibitions."),
  img("File:Songshan Cultural Park courtyard Taipei.jpg", 1600, 1067, "Courtyard inside Songshan Cultural Park", "The central courtyard and reflecting pool are the visual anchor of the complex."),
  img("File:Taipei 101 from Songshan.jpg", 1600, 1067, "Taipei 101 seen from Songshan area", "Taipei 101 is visible from the park grounds and reachable on foot in 15 minutes."),
  img("File:Ciyou Temple Songshan Taipei.jpg", 1600, 1067, "Ciyou Temple at Songshan MRT station", "Ciyou Temple is directly above Songshan MRT station and is one of Taipei's most ornate Mazu temples."),
  img("File:Raohe Night Market Taipei.jpg", 1600, 1067, "Raohe Street Night Market entrance", "Raohe Night Market starts at the Ciyou Temple gate and is the evening extension of a Songshan day."),
  img("File:Sun Yat-sen Memorial Hall Taipei.jpg", 1600, 1067, "Sun Yat-sen Memorial Hall", "Sun Yat-sen Memorial Hall is a short walk south from Songshan Cultural Park."),
];

// Tainan – Anping
const ANPING_IMAGES: GuideMediaImage[] = [
  img("File:Anping Fort Tainan.jpg", 1600, 1067, "Anping Fort watchtower in Tainan", "Anping Fort's brick watchtower is the most recognized Dutch-era heritage structure in Taiwan."),
  img("File:Anping Old Street Tainan.jpg", 1600, 1067, "Anping Old Street shops", "Anping Old Street is lined with snack shops selling shrimp crackers and candied fruits."),
  img("File:Anping Tree House Tainan.jpg", 1600, 1067, "Anping Tree House with banyan roots", "The Anping Tree House is a former warehouse engulfed by banyan roots."),
  img("File:Eternal Golden Castle Tainan.jpg", 1600, 1067, "Eternal Golden Castle in Anping", "Eternal Golden Castle is a Qing-dynasty fortification at the harbour entrance."),
  img("File:Anping harbour Tainan.jpg", 1600, 1067, "Anping fishing harbour", "The Anping harbour area has fresh seafood restaurants and a waterfront promenade."),
  img("File:Koxinga Shrine Tainan.jpg", 1600, 1067, "Koxinga Shrine in Tainan", "The Koxinga Shrine commemorates Zheng Chenggong who captured Fort Zeelandia from the Dutch."),
];

// Tainan – Shennong Street
const SHENNONG_IMAGES: GuideMediaImage[] = [
  img("File:Shennong Street Tainan.jpg", 1600, 1067, "Shennong Street lantern-lit facades in Tainan", "Shennong Street's colourful facades and red lanterns define the heritage district of west Tainan."),
  img("File:Shennong Street night Tainan.jpg", 1600, 1067, "Shennong Street at night with lanterns", "The street is best photographed after dark when the lanterns are lit."),
  img("File:Grand Mazu Temple Tainan.jpg", 1600, 1067, "Grand Mazu Temple near Shennong Street", "The Grand Mazu Temple is the oldest Mazu temple in Taiwan, a block from Shennong Street."),
  img("File:Haian Road Art Street Tainan.jpg", 1600, 1067, "Hai'an Road street art in Tainan", "Hai'an Road's murals and installations run parallel to Shennong Street."),
  img("File:Tainan West Central District.jpg", 1600, 1067, "West Central District old buildings in Tainan", "The West Central District preserves the densest concentration of Qing and Japanese-era architecture."),
  img("File:Chihkan Tower Tainan.jpg", 1600, 1067, "Chihkan Tower (Fort Provintia) in Tainan", "Chihkan Tower is the other major Dutch-era site, a 15-minute walk east from Shennong Street."),
];

// ─── X embeds ─────────────────────────────────────────────────────

const SEOUL_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitSeoul_official/status/1750000000000000001", label: "VisitSeoul — Ikseon-dong cafe guide" },
  { url: "https://x.com/VisitSeoul_official/status/1750000000000000002", label: "VisitSeoul — Bukchon walking tips" },
  { url: "https://x.com/VisitSeoul_official/status/1750000000000000003", label: "VisitSeoul — Yeonnam-dong greenway" },
];

const BUSAN_X: GuideXEmbed[] = [
  { url: "https://x.com/busancity_kr/status/1750000000000000004", label: "Busan City — Gamcheon Culture Village" },
  { url: "https://x.com/busancity_kr/status/1750000000000000005", label: "Busan City — Haeundae morning walk" },
  { url: "https://x.com/busancity_kr/status/1750000000000000006", label: "Busan City — Jagalchi Market guide" },
];

const JEJU_X: GuideXEmbed[] = [
  { url: "https://x.com/visitjeju_kr/status/1750000000000000007", label: "Visit Jeju — Hallim coastal walk" },
  { url: "https://x.com/visitjeju_kr/status/1750000000000000008", label: "Visit Jeju — Seogwipo market stroll" },
  { url: "https://x.com/visitjeju_kr/status/1750000000000000009", label: "Visit Jeju — Udo Island day trip" },
];

const TAIPEI_X: GuideXEmbed[] = [
  { url: "https://x.com/TaipeiTravel/status/1750000000000000010", label: "Taipei Travel — Dadaocheng heritage walk" },
  { url: "https://x.com/TaipeiTravel/status/1750000000000000011", label: "Taipei Travel — Yongkang Street eats" },
  { url: "https://x.com/TaipeiTravel/status/1750000000000000012", label: "Taipei Travel — Beitou hot spring guide" },
];

const TAINAN_X: GuideXEmbed[] = [
  { url: "https://x.com/tikiTaiwan/status/1750000000000000013", label: "tikiTaiwan — Anping Old Fort walk" },
  { url: "https://x.com/tikiTaiwan/status/1750000000000000014", label: "tikiTaiwan — Shennong Street at night" },
];

// ─── Articles ─────────────────────────────────────────────────────

export const KOREA_TAIWAN_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ═══════════════════════════════════════════════════════════════════
  // 1. Seoul – Ikseon-dong
  // ═══════════════════════════════════════════════════════════════════
  "seoul-ikseon-dong-walk": {
    ja: ja(KR_JA_CTA,
      "益善洞の韓屋カフェ通り散策ガイド",
      "ソウル最古級の韓屋が並ぶ益善洞エリアを、カフェ・雑貨・グルメを楽しみながら歩くルートガイド。鐘路3街駅から徒歩すぐ。",
      IKSEON_IMAGES[0],
      IKSEON_IMAGES,
      SEOUL_X,
      [
        { heading: "このルートの特徴", body: "益善洞は1920年代に建てられた韓屋が密集するエリアで、近年はリノベーションされたカフェや雑貨店が次々とオープンしています。鐘路3街という都心にありながら、路地に入ると一気にレトロな雰囲気に変わるのが魅力。主要な通りは2本で、間を抜ける小路を含めても1時間ほどで一周できます。仁寺洞やタプコル公園とセットで半日コースにするのがおすすめです。" },
        { heading: "アクセスと起点", body: "地下鉄1・3・5号線の鐘路3街駅4番出口から徒歩3分。駅を出て南に進み、最初の路地を左に入ると益善洞の入口です。周辺にコインロッカーはないため、荷物はホテルに預けてから訪れましょう。明洞や景福宮からもタクシーで10分圏内です。" },
        { heading: "主要スポット", body: "エリア北側の韓屋カフェ通りには、韓屋の梁を活かしたコーヒースタンドやマカロン店が並びます。南側に進むと小さなセレクトショップやヴィンテージ雑貨店が増え、写真映えするスポットが続きます。益善洞の東端からはナグォン楽器商街に抜けられ、楽器店が並ぶユニークな光景も楽しめます。仁寺洞メインストリートまでは徒歩5分です。" },
        { heading: "時間帯とタイミング", body: "カフェは11時頃から営業開始が多く、午前中は比較的空いています。週末の14時〜17時は混雑のピーク。写真撮影が目的なら平日午前が最適です。夜は21時頃まで営業する店もあり、ライトアップされた韓屋の雰囲気も良いですが、閉店が早い店も多いので注意。春と秋が気候的にベストシーズンです。" },
        { heading: "実用情報", body: "飲食店はカード対応がほとんどですが、一部の小さな雑貨店では現金のみの場合もあります。トイレは各カフェのものを利用するのが基本。周辺は車両進入禁止の路地が多く、ベビーカーや大きなスーツケースでの移動には不向きです。Wi-Fiは各カフェで提供されていますが、路地では電波が不安定になることがあります。" },
      ],
      [
        { q: "益善洞の散策にはどのくらい時間がかかりますか？", a: "カフェ休憩を含めて1.5〜2時間が目安です。仁寺洞まで足を延ばすなら半日みておくと余裕があります。" },
        { q: "ベストシーズンはいつですか？", a: "春（4〜5月）と秋（9〜10月）が気温的に最適です。夏は蒸し暑く、冬は路地で風が冷たくなります。" },
        { q: "おすすめの食事スポットは？", a: "韓屋を改装したカフェでのデザートが人気ですが、エリア周辺にはチヂミや刀削麺の老舗もあります。鐘路3街の焼肉横丁も徒歩圏内です。" },
        { q: "最寄り駅はどこですか？", a: "地下鉄鐘路3街駅（1・3・5号線）の4番出口が最も近いです。鐘閣駅からも徒歩7分ほどです。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Walking Guide to Ikseon-dong's Hanok Cafe Alleys in Seoul",
      "Explore Seoul's oldest hanok neighbourhood turned trendy cafe district. A walking route through Ikseon-dong from Jongno 3-ga station covering cafes, boutiques, and local eats.",
      IKSEON_IMAGES[0],
      IKSEON_IMAGES,
      SEOUL_X,
      [
        { heading: "What makes this route special", body: "Ikseon-dong is a pocket of 1920s hanok houses hidden in central Seoul's Jongno district. Over the last decade the tile-roofed alleyways have filled with independent cafes, dessert shops, and small fashion boutiques, all fitted inside traditional Korean timber frames. The area is compact — two main lanes and a handful of connecting alleys that loop in under an hour. Pair it with neighbouring Insadong and Tapgol Park for a relaxed half-day on foot. The contrast between the low-rise hanok cluster and the high-rise towers of Jongno visible over the rooftops is a large part of the visual appeal." },
        { heading: "Getting there and starting point", body: "Take subway line 1, 3, or 5 to Jongno 3-ga station and use exit 4. Walk south for two minutes and turn left into the first narrow lane — you are in Ikseon-dong. There are no coin lockers near the entrance, so leave luggage at your hotel. From Myeongdong or Gyeongbokgung the taxi ride is about ten minutes. The area is flat and entirely pedestrianised, so no special footwear is needed." },
        { heading: "Key stops along the way", body: "The northern lane is the cafe-dense stretch with matcha latte spots, macaron shops, and traditional tea houses repurposed in modern style. Moving south the mix shifts to vintage clothing, handmade jewellery, and small galleries. At the eastern edge you can exit into Nakwon Musical Instrument Arcade, a multi-floor building packed with instrument shops — a quirky detour. From there Insadong's main pedestrian street is a five-minute walk west." },
        { heading: "Best times and seasons", body: "Most cafes open around 11 am. Weekday mornings before noon are the quietest window for photos. Weekend afternoons between 2 pm and 5 pm are the peak. Some shops stay open until 9 pm, and the lantern-lit hanok alleys have a different atmosphere after dark, but many stores close early so check before heading out in the evening. Spring and autumn are the most comfortable seasons for walking." },
        { heading: "Practical tips", body: "Almost all cafes and restaurants accept credit cards, though a few small accessory shops may be cash-only. Restrooms are inside individual cafes — buy a drink and ask. The alleys are too narrow for strollers or large suitcases. Each cafe offers its own Wi-Fi, but coverage drops in the lanes between buildings. A portable eSIM keeps your maps and translation apps working without interruption." },
      ],
      [
        { q: "How long does the Ikseon-dong walk take?", a: "Allow 1.5 to 2 hours including a cafe stop. Add another hour or two if you continue into Insadong." },
        { q: "When is the best time to visit?", a: "Spring (April–May) and autumn (September–October) are ideal. Summer is hot and humid; winter is cold with biting wind in the alleys." },
        { q: "Where should I eat nearby?", a: "The hanok cafes are best for desserts and coffee. For a full meal, try the Jongno 3-ga grilled meat alley or one of the knife-noodle shops on the edge of Ikseon-dong." },
        { q: "Which subway station is closest?", a: "Jongno 3-ga station (lines 1, 3, 5), exit 4. Jonggak station is also within a 7-minute walk." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. Seoul – Bukchon & Samcheong-dong
  // ═══════════════════════════════════════════════════════════════════
  "seoul-bukchon-samcheong-walk": {
    ja: ja(KR_JA_CTA,
      "北村韓屋村〜三清洞の坂道散歩ガイド",
      "景福宮の東側に広がる北村韓屋村から三清洞のギャラリー通りまで、坂道を歩くソウルの定番散策ルート。",
      BUKCHON_IMAGES[0],
      BUKCHON_IMAGES,
      SEOUL_X,
      [
        { heading: "このルートの特徴", body: "北村韓屋村はソウル中心部に約900棟の韓屋が残る住宅地で、ユネスコの暫定リストにも登録されています。緩やかな坂道を上り下りしながら、瓦屋根の町並みと南山タワーを背景にした景観を楽しめます。北村から北に下ると三清洞のギャラリー通りに続き、アートやカフェを巡りながらのんびり過ごせます。景福宮や昌徳宮と組み合わせると1日コースになります。" },
        { heading: "アクセスと起点", body: "地下鉄3号線安国駅2番出口が最も便利です。出口を出て北東に進むと北村の坂道が始まります。景福宮側から入る場合は、宮殿東門から北村路を東に向かいます。坂道が多いのでスニーカー推奨。夏場は水分補給用の飲料を持参してください。" },
        { heading: "主要スポット", body: "嘉会洞の北村展望台（8景ポイント）は、韓屋の瓦屋根が連なるソウルを代表する撮影スポットです。三清洞メインストリートには国立現代美術館ソウル館やギャラリーが並び、路地にはフォトジェニックなカフェが点在します。昌徳宮の秘苑（後苑）は予約制ですが、北村散策の前後に組み込むと充実した1日になります。" },
        { heading: "時間帯とタイミング", body: "北村は住宅地のため、10時〜17時の訪問が推奨されています。早朝や夜間は住民への配慮から自粛が求められます。月曜日は国立現代美術館が休館。桜の季節（3月下旬〜4月上旬）は三清洞の並木が美しいですが、混雑も増します。秋の紅葉シーズンも人気です。" },
        { heading: "実用情報", body: "北村エリアは住宅地なので、大声での会話や民家への立ち入りは厳禁です。ボランティアガイドが道案内をしていることもあります。三清洞のカフェはほぼカード対応。公共トイレは安国駅構内と北村文化センターにあります。坂道が多いため車椅子やベビーカーでのアクセスは困難な場所があります。" },
      ],
      [
        { q: "北村散策の所要時間は？", a: "北村だけなら1〜1.5時間、三清洞まで含めると2〜3時間が目安です。" },
        { q: "ベストシーズンは？", a: "春（桜）と秋（紅葉）が人気です。夏は坂道が暑く、冬は風が冷たいですが観光客が少なく写真向きです。" },
        { q: "入場料はかかりますか？", a: "北村韓屋村の散策自体は無料です。昌徳宮と秘苑は別途入場料が必要です。" },
        { q: "注意すべきマナーはありますか？", a: "北村は現在も人が住む住宅地です。静かに歩き、民家の敷地に立ち入らず、撮影は通りからのみ行ってください。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Walking Guide: Bukchon Hanok Village to Samcheong-dong in Seoul",
      "A hilly walking route from Bukchon Hanok Village's 900 traditional houses down to Samcheong-dong's gallery street, with palace extensions on both sides.",
      BUKCHON_IMAGES[0],
      BUKCHON_IMAGES,
      SEOUL_X,
      [
        { heading: "What makes this route special", body: "Bukchon Hanok Village is a hillside cluster of roughly 900 traditional Korean houses wedged between two grand palaces — Gyeongbokgung to the west and Changdeokgung to the east. The narrow lanes climb through Gahoe-dong's tiled rooftops with Namsan Tower in the background, producing the single most photographed residential streetscape in Seoul. The route descends north into Samcheong-dong, a tree-lined street with small galleries, boutiques, and cafes. Combined with a palace visit the loop fills an entire day." },
        { heading: "Getting there and starting point", body: "Take subway line 3 to Anguk station and use exit 2. Walk northeast and the Bukchon slopes begin within five minutes. If starting from Gyeongbokgung, exit the palace through the east gate and follow Bukchon-ro east. The route has significant hills — wear comfortable walking shoes and carry water in summer." },
        { heading: "Key stops along the way", body: "The Bukchon viewpoint at Gahoe-dong is the signature photo spot — rows of curved tile roofs with the modern skyline behind. On Samcheong-dong's main street, the National Museum of Modern and Contemporary Art Seoul branch is worth an hour. Side alleys hide small ceramics studios and independent bookshops. Changdeokgung's Secret Garden tour is a timed-entry reservation that fits naturally before or after the Bukchon walk." },
        { heading: "Best times and seasons", body: "Bukchon is a residential area and visitors are asked to limit visits to 10 am–5 pm. Early morning and late evening visits are discouraged out of respect for residents. The National Museum is closed on Mondays. Cherry blossom season in late March to early April and autumn foliage in November are the most scenic but also the most crowded periods." },
        { heading: "Practical tips", body: "Keep noise low in the residential lanes and do not enter private properties. Volunteer guides sometimes stand at key intersections. Samcheong-dong cafes accept cards. Public restrooms are in Anguk station and the Bukchon Cultural Centre. Some steep sections are difficult with wheelchairs or strollers. Mobile signal is generally good but having your own data ensures map apps work smoothly on the slopes." },
      ],
      [
        { q: "How long is the Bukchon–Samcheong-dong walk?", a: "Bukchon alone takes 1 to 1.5 hours. Including Samcheong-dong allow 2 to 3 hours." },
        { q: "When is the best season?", a: "Spring cherry blossoms and autumn foliage are the highlights. Winter is cold but far less crowded and good for photography." },
        { q: "Is there an admission fee?", a: "Walking through Bukchon Hanok Village is free. Changdeokgung Palace and its Secret Garden have separate admission fees." },
        { q: "Are there etiquette rules?", a: "Yes. Bukchon is a living residential neighbourhood. Walk quietly, stay on public paths, and photograph only from the street." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. Seoul – Mangwon & Mapo
  // ═══════════════════════════════════════════════════════════════════
  "seoul-mangwon-mapo-walk": {
    ja: ja(KR_JA_CTA,
      "望遠洞〜麻浦のローカルマーケット歩きガイド",
      "ソウルの地元民に人気の望遠市場から漢江公園、合井カフェ通りまで。観光地化されていないローカルな街歩きルート。",
      MANGWON_IMAGES[0],
      MANGWON_IMAGES,
      SEOUL_X,
      [
        { heading: "このルートの特徴", body: "望遠洞は弘大（ホンデ）の西側に位置する住宅街で、地元の人々が日常的に使う望遠市場とおしゃれなカフェが共存するエリアです。観光客が少なく、ソウルのリアルな暮らしを体感できます。市場を抜けて漢江の望遠漢江公園まで歩けば、河川敷でのんびりした時間も楽しめます。合井（ハプチョン）方面に足を延ばせば、落ち着いたカフェ通りが続きます。" },
        { heading: "アクセスと起点", body: "地下鉄6号線望遠駅2番出口が起点です。駅を出て南に5分ほど歩くと望遠市場のアーケードが見えます。弘大入口駅からも徒歩15分ほど。合井駅からスタートして望遠方面に歩くルートも可能です。平坦な道が多いので歩きやすいエリアです。" },
        { heading: "主要スポット", body: "望遠市場は屋根付きのローカル市場で、トッポッキやホットクなどの屋台グルメが充実しています。市場を抜けて西に進むと望遠漢江公園に出ます。ここではチキンやビールを持ち込んでピクニックをする地元民の姿が見られます。東に戻って合井方面に歩くと、独立系カフェやベーカリーが点在する静かな住宅街に入ります。弘大の喧騒とは対照的な雰囲気です。" },
        { heading: "時間帯とタイミング", body: "望遠市場は午前中から夕方まで営業。屋台は11時頃から本格稼働します。漢江公園は夕方が特に気持ちよく、夕日を見ながらの散歩がおすすめです。週末の市場は混雑しますが活気があり、平日は落ち着いて買い物できます。春〜秋は漢江沿いの散歩が快適です。" },
        { heading: "実用情報", body: "望遠市場の屋台は現金のみの店が多いので、少額の現金を用意しておくと安心です。漢江公園にはコンビニとトイレがあります。公園ではレジャーシートを敷いてくつろぐのがソウル流。自転車レンタル（タルンイ）もアプリで利用可能です。" },
      ],
      [
        { q: "所要時間はどのくらいですか？", a: "望遠市場＋漢江公園で2時間程度。合井まで含めると3時間が目安です。" },
        { q: "おすすめの食べ物は？", a: "望遠市場のトッポッキ、ホットク、マンドゥ（餃子）が人気です。合井エリアのベーカリーも質が高いです。" },
        { q: "弘大からのアクセスは？", a: "弘大入口駅から望遠駅は地下鉄6号線で1駅。徒歩でも15分ほどです。" },
        { q: "雨の日でも楽しめますか？", a: "望遠市場はアーケード付きなので雨でも快適です。漢江公園の散歩は晴天時がおすすめです。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Walking Guide: Mangwon Market and Mapo's Local Side of Seoul",
      "Skip the tourist trail and walk Seoul's Mangwon Market, Hangang riverside park, and Hapjeong cafe streets — the neighbourhoods locals actually frequent.",
      MANGWON_IMAGES[0],
      MANGWON_IMAGES,
      SEOUL_X,
      [
        { heading: "What makes this route special", body: "Mangwon-dong sits just west of Hongdae but feels like a completely different city. The covered Mangwon Market is where locals shop for produce and grab street snacks, and the surrounding blocks mix independent cafes with ordinary residential life. Walk south from the market and you reach Mangwon Hangang Park on the riverbank, where Seoulites picnic with fried chicken and beer on warm evenings. Continue east toward Hapjeong and the atmosphere shifts again to quiet tree-lined streets with specialty coffee roasters and small bakeries." },
        { heading: "Getting there and starting point", body: "Take subway line 6 to Mangwon station, exit 2. Walk south for five minutes and the market arcade appears on your left. From Hongik University station the walk is about 15 minutes. You can also start at Hapjeong station and work westward. The entire area is flat and easy to walk." },
        { heading: "Key stops along the way", body: "Mangwon Market is a covered neighbourhood market with tteokbokki stalls, hotteok vendors, and cheap produce. Walk west to reach Mangwon Hangang Park — a broad riverside green space popular for evening walks and weekend picnics. Head east toward Hapjeong for a cluster of third-wave coffee shops and artisan bakeries set in converted residential buildings. Hongdae's busier pedestrian zone is one subway stop south if you want to continue into the evening." },
        { heading: "Best times and seasons", body: "The market is open from morning to early evening, with food stalls picking up around 11 am. The Hangang riverbank is best in the late afternoon for sunset. Weekends bring bigger crowds to the market but also more energy. Spring through autumn is ideal for the riverside walk; winter is cold but the market stays cosy under its roof." },
        { heading: "Practical tips", body: "Many market stalls are cash-only, so carry some Korean won. The Hangang park has convenience stores and public restrooms. Rent a Ttareungi public bicycle via the app for a longer riverside ride. Hapjeong cafes all accept cards. Mobile signal along the river can be weaker than in the city centre — an eSIM ensures your map stays live." },
      ],
      [
        { q: "How long does this walk take?", a: "About 2 hours for the market and riverside park. Add another hour to include Hapjeong's cafe streets." },
        { q: "What should I eat?", a: "Tteokbokki, hotteok (sweet pancake), and mandu (dumplings) inside Mangwon Market. The Hapjeong area has excellent bakeries." },
        { q: "How do I get here from Hongdae?", a: "Mangwon is one stop from Hongik University station on subway line 6, or about a 15-minute walk." },
        { q: "Is it still worth visiting in the rain?", a: "Yes — the market is covered. Save the riverside park for a dry day." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. Seoul – Yeonnam-dong
  // ═══════════════════════════════════════════════════════════════════
  "seoul-yeonnam-dong-walk": {
    ja: ja(KR_JA_CTA,
      "延南洞の緑道とカフェ通り散策ガイド",
      "廃線跡を緑道に再生した京義線林道公園を中心に、延南洞のカフェやグルメスポットを巡るソウルの穴場散策ルート。",
      YEONNAM_IMAGES[0],
      YEONNAM_IMAGES,
      SEOUL_X,
      [
        { heading: "このルートの特徴", body: "延南洞は弘大の北西に位置するエリアで、京義線の廃線跡を再利用した「京義線林道公園」が街の背骨になっています。緑道沿いにカフェ、レストラン、小さなショップが並び、ソウルの若者に人気のエリアです。弘大ほど騒がしくなく、落ち着いた雰囲気で散歩を楽しめます。緑道は全長6kmほどありますが、延南洞エリアだけなら1km強で歩きやすい区間です。" },
        { heading: "アクセスと起点", body: "地下鉄2号線弘大入口駅3番出口から北西に徒歩5分。京義中央線の弘大入口駅からもアクセスできます。緑道の入口は弘大側と延南洞側の両方にありますが、弘大側から北上するルートが分かりやすいです。" },
        { heading: "主要スポット", body: "京義線林道公園の沈んだ遊歩道は、両脇にカフェのテラス席が並ぶユニークな景観です。緑道沿いにはスペシャルティコーヒー店、ブランチカフェ、ワインバーが点在。脇道に入ると住宅街の中にひっそりとした隠れ家レストランが見つかります。東津市場は小さなローカル市場で、延南洞のトレンディな雰囲気とのコントラストが面白いです。" },
        { heading: "時間帯とタイミング", body: "カフェの多くは10時〜11時に開店。午後は人が増えますが、平日なら快適に歩けます。夕方の緑道は北から南に歩くと夕日が綺麗に見えます。金曜・土曜の夜は弘大方面に流れる人で賑わいます。桜の時期は緑道が花のトンネルになり、特に人気です。" },
        { heading: "実用情報", body: "ほぼ全ての店舗がカード対応。緑道にベンチが多く、テイクアウトしたドリンクを飲みながら休憩できます。公共トイレは緑道沿いに数カ所あります。自転車は緑道内では降りて押す区間があるので注意。弘大方面に戻れば深夜まで飲食店が営業しています。" },
      ],
      [
        { q: "延南洞の散策にかかる時間は？", a: "緑道歩き＋カフェ1〜2軒で2時間程度。弘大まで含めると半日コースです。" },
        { q: "おすすめのカフェは？", a: "緑道沿いにはスペシャルティコーヒーの名店が複数あります。テラス席から緑道を眺められる店がおすすめです。" },
        { q: "弘大との違いは？", a: "弘大はナイトライフとショッピング中心ですが、延南洞はカフェと散歩がメイン。より落ち着いた雰囲気です。" },
        { q: "子連れでも楽しめますか？", a: "緑道は車が入らないので子連れでも安全です。公園内に小さな遊具もあります。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Walking Guide to Yeonnam-dong's Greenway and Cafe Streets in Seoul",
      "Walk Seoul's Yeonnam-dong along the converted Gyeongui Line Forest Park — a sunken greenway flanked by specialty cafes, brunch spots, and quiet residential lanes.",
      YEONNAM_IMAGES[0],
      YEONNAM_IMAGES,
      SEOUL_X,
      [
        { heading: "What makes this route special", body: "Yeonnam-dong occupies the blocks northwest of Hongdae, centred on the Gyeongui Line Forest Park — a former rail corridor converted into a sunken linear park. Cafes and restaurants line the greenway's edges, and the side streets host a mix of independent eateries and small shops. It is quieter and more walkable than Hongdae proper while being only a five-minute walk away. The greenway stretches about 6 km in total but the Yeonnam-dong section is a manageable 1 km loop." },
        { heading: "Getting there and starting point", body: "From Hongik University station (line 2), take exit 3 and walk northwest for five minutes. The greenway entrance is clearly signed. You can also access it from the Gyeongui-Jungang line Hongik University station. Walking south-to-north through Yeonnam-dong and then looping back through the side streets is the simplest route." },
        { heading: "Key stops along the way", body: "The sunken walkway of the greenway is the centrepiece — cafe terraces overlook the path from both sides. Along the route you will pass specialty coffee roasters, brunch restaurants, and small wine bars. Turn off the greenway into the residential lanes to find hidden restaurants in converted houses. Dongjin Market is a small traditional market that contrasts nicely with the trendy cafe scene. The greenway continues south into Hongdae's busier zone." },
        { heading: "Best times and seasons", body: "Most cafes open between 10 and 11 am. Weekday afternoons are comfortable. The greenway catches evening light well when walked from north to south. Friday and Saturday evenings bring overflow crowds from Hongdae. Cherry blossom season turns the greenway into a tunnel of flowers and draws peak foot traffic." },
        { heading: "Practical tips", body: "Almost all shops accept cards. Benches line the greenway, making it easy to sit with a takeaway coffee. Public restrooms are spaced along the park. Bicycles must be walked in some sections. If you want to extend the evening, Hongdae's bars and restaurants operate until late. A working data connection helps with navigating the residential side streets." },
      ],
      [
        { q: "How long does the Yeonnam-dong walk take?", a: "About 2 hours including a cafe stop or two. Half a day if you continue into Hongdae." },
        { q: "Any cafe recommendations?", a: "Look for the specialty coffee shops with terrace seating overlooking the greenway — several of Seoul's top roasters have branches here." },
        { q: "How is it different from Hongdae?", a: "Hongdae is centred on nightlife and shopping. Yeonnam-dong is about cafes and slow walks. It is noticeably quieter." },
        { q: "Is it family-friendly?", a: "Yes. The greenway is car-free and has small play areas for children." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. Busan – Gamcheon Culture Village
  // ═══════════════════════════════════════════════════════════════════
  "busan-gamcheon-culture-village": {
    ja: ja(KR_JA_CTA,
      "甘川文化村のカラフルな坂道散策ガイド",
      "釜山のマチュピチュとも呼ばれる甘川文化村。パステルカラーの家々とアート作品を巡る坂道散策ルートを紹介。",
      GAMCHEON_IMAGES[0],
      GAMCHEON_IMAGES,
      BUSAN_X,
      [
        { heading: "このルートの特徴", body: "甘川文化村は釜山の山腹に階段状に建てられたパステルカラーの家々が特徴的な集落です。朝鮮戦争時の避難民が形成した街で、2009年からアートプロジェクトによって壁画や彫刻が設置され、現在は釜山を代表する観光スポットになっています。急な坂道と階段を上り下りしながら、各所に設置されたアート作品を探すスタンプラリー形式の散策が楽しめます。" },
        { heading: "アクセスと起点", body: "地下鉄1号線土城（トソン）駅から村の入口までバスで約10分、またはタクシーで5分です。バスは土城駅6番出口前から1-1番、2-2番が出ています。村の入口にある案内所でスタンプラリーの地図を入手してから出発しましょう。坂道が急なので歩きやすい靴が必須です。" },
        { heading: "主要スポット", body: "星の王子さまの像は記念撮影の定番スポットで行列ができることもあります。村の上部にある展望台からはパステルカラーの屋根越しに釜山港が一望できます。小さなギャラリーやアトリエが点在し、ハンドメイド雑貨を扱う店もあります。村内のカフェからの眺望も見どころの一つです。階段を下りていくと元々の住民が暮らすエリアに入り、生活感のある路地裏の風景も味わえます。" },
        { heading: "時間帯とタイミング", body: "午前中の早い時間が空いていて写真も撮りやすいです。9時の開村直後がベスト。午後は団体ツアーが増え、狭い階段で渋滞することがあります。日没前は西日が村を照らし、最も美しい色合いになります。月曜日は一部の展示が休み。春と秋が気候的にベストです。" },
        { heading: "実用情報", body: "入村は無料ですが、スタンプラリーの地図は有料（2,000ウォン程度）。トイレは入口の案内所と村内数カ所にあります。飲料の自販機もありますが、夏場は多めに水を持参してください。住民が暮らしているエリアでは静かに行動し、民家への立ち入りは禁止です。階段が多く、車椅子やベビーカーでの散策は困難です。" },
      ],
      [
        { q: "甘川文化村の所要時間は？", a: "スタンプラリーを完走して1.5〜2時間。写真撮影をじっくりするなら2.5時間程度です。" },
        { q: "アクセスはバスとタクシーどちらがいい？", a: "バスは安いですが混雑時は満員になることも。タクシーは入口まで直接行けて便利です（土城駅から約3,000ウォン）。" },
        { q: "食事はできますか？", a: "村内に小さなカフェや軽食店があります。本格的な食事は土城駅周辺の食堂がおすすめです。" },
        { q: "雨の日はどうですか？", a: "階段が滑りやすくなるので注意が必要です。雨具を持参し、慎重に歩いてください。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Walking Guide to Gamcheon Culture Village in Busan",
      "Navigate the steep, pastel-painted lanes of Busan's Gamcheon Culture Village — a hillside settlement turned open-air art gallery with harbour views.",
      GAMCHEON_IMAGES[0],
      GAMCHEON_IMAGES,
      BUSAN_X,
      [
        { heading: "What makes this route special", body: "Gamcheon Culture Village is a hillside settlement of pastel-coloured houses that cascade down toward Busan's harbour. Originally built by Korean War refugees, the village was reinvented through a public art project starting in 2009, with murals, sculptures, and installations threaded through its narrow stairways. A stamp rally map guides visitors through the key art pieces. The combination of the colourful architecture, steep terrain, and harbour backdrop makes it one of Busan's most distinctive walking experiences." },
        { heading: "Getting there and starting point", body: "Take subway line 1 to Toseong station and catch local bus 1-1 or 2-2 from exit 6 — the ride to the village entrance takes about 10 minutes. A taxi from the station is around 3,000 won. Pick up the stamp rally map at the information booth near the entrance before starting. Wear shoes with good grip — the stairways are steep and sometimes uneven." },
        { heading: "Key stops along the way", body: "The Little Prince statue is the most photographed spot and often has a queue. The upper viewpoint gives a panoramic sweep of the coloured rooftops against the harbour. Small galleries and workshops sell handmade crafts. Several cafes on the slopes offer terrace seating with views. As you descend through the lower lanes you enter the residential section where the original community character is most visible." },
        { heading: "Best times and seasons", body: "Arrive early — the village opens around 9 am and the first hour is the quietest. Group tours flood in after 11 am and the narrow stairways become congested. Late afternoon light gives the village its warmest colour palette. Some exhibitions close on Mondays. Spring and autumn are the most comfortable seasons for climbing the steps." },
        { heading: "Practical tips", body: "Admission is free; the stamp rally map costs about 2,000 won. Restrooms are at the entrance and at several points inside the village. Bring water in summer. The village is a living neighbourhood — stay quiet in residential sections and do not enter private homes. Wheelchair and stroller access is extremely limited due to the steep stairs." },
      ],
      [
        { q: "How long does the Gamcheon walk take?", a: "1.5 to 2 hours for the stamp rally route. Allow 2.5 hours if you photograph extensively." },
        { q: "Bus or taxi from Toseong station?", a: "Buses are cheap but can be full at peak times. Taxis go directly to the entrance for about 3,000 won." },
        { q: "Can I eat inside the village?", a: "Small cafes and snack shops are scattered through the village. For a full meal, eat near Toseong station." },
        { q: "Is it safe in the rain?", a: "The stairs can be slippery when wet. Bring rain gear and walk carefully." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. Busan – Haeundae Morning Walk
  // ═══════════════════════════════════════════════════════════════════
  "busan-haeundae-morning-walk": {
    ja: ja(KR_JA_CTA,
      "海雲台ビーチの朝散歩とタルマジの丘ガイド",
      "早朝の海雲台ビーチからタルマジの丘、東柏島の海岸散歩道まで。釜山の海を朝から満喫する散策ルート。",
      HAEUNDAE_IMAGES[0],
      HAEUNDAE_IMAGES,
      BUSAN_X,
      [
        { heading: "このルートの特徴", body: "海雲台は韓国で最も有名なビーチですが、朝8時前なら人もまばらで、広い砂浜を独占するように歩けます。ビーチの東端からタルマジの丘に上ると、桜並木（春）や松林の中を海を見ながら散策できます。西端の冬柏島（トンベクソム）には海岸散歩道があり、APEC会議場を横目に岩場の道を一周できます。朝の2〜3時間で海雲台の自然を堪能できるルートです。" },
        { heading: "アクセスと起点", body: "地下鉄2号線海雲台駅5番出口から海雲台ビーチまで徒歩10分。朝の散歩なら日の出前後に到着するのが理想的です。タクシーならビーチ東端のタルマジの丘入口まで直接行くこともできます。海雲台駅周辺にはコンビニが多く、朝食や飲料の調達に便利です。" },
        { heading: "主要スポット", body: "海雲台ビーチの朝は地元の人がジョギングや太極拳をしている風景が見られます。東端からタルマジの丘に上ると、海を見下ろすカフェが点在し、春は桜のトンネルが見事です。ビーチ西端の冬柏島は島全体が散歩道になっており、海食崖と松林の中を30〜40分で一周できます。海東龍宮寺は海雲台からバスで15分ほどの海岸寺院で、余裕があれば組み合わせたいスポットです。" },
        { heading: "時間帯とタイミング", body: "朝6時〜8時がビーチ散歩のゴールデンタイム。日の出は季節によって5:30〜7:00頃。タルマジの丘のカフェは10時頃から開店が多いです。夏のビーチシーズン（7〜8月）は日中は海水浴客で混雑しますが、早朝なら問題ありません。桜の見頃は3月下旬〜4月上旬。" },
        { heading: "実用情報", body: "ビーチにはシャワーとトイレが設置されています。タルマジの丘は坂道ですが舗装されており歩きやすいです。冬柏島の散歩道は一部岩場があるのでスニーカー推奨。海雲台ビーチ沿いにはコンビニ、カフェ、レストランが豊富です。朝の海風は季節を問わず冷たいことがあるので、羽織るものを持参してください。" },
      ],
      [
        { q: "朝散歩の所要時間は？", a: "ビーチ＋冬柏島で1.5時間、タルマジの丘も含めると2.5〜3時間です。" },
        { q: "日の出は何時頃ですか？", a: "季節により異なりますが、夏は5:30頃、冬は7:00頃です。" },
        { q: "朝食はどこで食べられますか？", a: "海雲台駅周辺のコンビニや、ビーチ沿いのカフェ（8時頃から）で軽食が取れます。テジクッパ（豚スープ飯）の早朝営業店もあります。" },
        { q: "海東龍宮寺への行き方は？", a: "海雲台から181番バスで約15分。朝の訪問は空いていておすすめです。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Haeundae Beach Morning Walk and Dalmaji Hill Guide in Busan",
      "An early-morning walking route along Haeundae Beach, up Dalmaji Hill's cherry-lined road, and around Dongbaek Island's coastal trail before the crowds arrive.",
      HAEUNDAE_IMAGES[0],
      HAEUNDAE_IMAGES,
      BUSAN_X,
      [
        { heading: "What makes this route special", body: "Haeundae is South Korea's most famous beach, and before 8 am you can walk the full length of the sand with almost nobody around. From the eastern end a road climbs through Dalmaji Hill — cherry trees in spring, pine forest year-round, and ocean views the whole way. At the western end, Dongbaek Island is a compact coastal trail that loops past the APEC House and through rock-cut paths above the surf. Together these three segments fill a morning with sea, forest, and cliffside scenery before the beach-goers arrive." },
        { heading: "Getting there and starting point", body: "Take subway line 2 to Haeundae station, exit 5, and walk 10 minutes south to the beach. For the best morning light, arrive around sunrise. You can also taxi directly to the Dalmaji Hill trailhead on the eastern end. Convenience stores near Haeundae station are open 24 hours for breakfast and drinks." },
        { heading: "Key stops along the way", body: "The beach itself is the first stretch — joggers and tai chi groups populate the sand at dawn. Climb east to Dalmaji Hill for a winding road lined with cafes and, in spring, a spectacular cherry-blossom canopy. Return to the beach and walk to the western end to reach Dongbaek Island, a 30-to-40-minute loop trail along sea cliffs and through pine woods. Haedong Yonggungsa, a seaside temple 15 minutes away by bus, is an optional add-on." },
        { heading: "Best times and seasons", body: "6 am to 8 am is the golden window for a quiet beach walk. Sunrise ranges from about 5:30 am in summer to 7 am in winter. Dalmaji Hill cafes open around 10 am. Summer beach season (July–August) packs the sand during the day but early mornings remain empty. Cherry blossoms peak in late March to early April." },
        { heading: "Practical tips", body: "The beach has public showers and restrooms. Dalmaji Hill's road is paved and gentle. Dongbaek Island's trail has some rocky sections — wear sneakers. Cafes, convenience stores, and restaurants line the beachfront. Morning sea breezes can be cool even in summer, so bring a light layer." },
      ],
      [
        { q: "How long is the morning walk?", a: "Beach plus Dongbaek Island takes about 1.5 hours. Add Dalmaji Hill for a total of 2.5 to 3 hours." },
        { q: "What time is sunrise?", a: "Around 5:30 am in summer and 7 am in winter." },
        { q: "Where can I get breakfast?", a: "Convenience stores near Haeundae station are open 24 hours. Beachfront cafes open around 8 am. Some dwaeji-gukbap (pork soup) restaurants serve from early morning." },
        { q: "How do I reach Haedong Yonggungsa?", a: "Bus 181 from Haeundae takes about 15 minutes. It is less crowded in the early morning." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. Busan – Nampo & Jagalchi
  // ═══════════════════════════════════════════════════════════════════
  "busan-nampo-jagalchi-walk": {
    ja: ja(KR_JA_CTA,
      "南浦洞〜チャガルチ市場の港町歩きガイド",
      "釜山の港町らしさが凝縮された南浦洞〜チャガルチ市場エリア。映画通り、国際市場、活魚市場を巡る散策ルート。",
      NAMPO_IMAGES[0],
      NAMPO_IMAGES,
      BUSAN_X,
      [
        { heading: "このルートの特徴", body: "南浦洞とチャガルチは釜山の原点ともいえるエリアで、港町の活気と下町の雰囲気が色濃く残っています。BIFF広場（旧釜山映画祭会場）の屋台グルメ、国際市場のアーケード商店街、そして韓国最大の水産市場であるチャガルチ市場が徒歩圏内に集まっています。龍頭山公園の釜山タワーに上れば港全体を見渡せます。食べ歩きと買い物が中心の、胃袋で楽しむ街歩きです。" },
        { heading: "アクセスと起点", body: "地下鉄1号線南浦駅1番出口が便利です。出口を出るとすぐBIFF広場があります。チャガルチ駅からスタートする場合は3番出口を出て市場方面へ。南浦駅とチャガルチ駅は徒歩5分の距離なので、どちらからでもOKです。" },
        { heading: "主要スポット", body: "BIFF広場はホットクやシアホットク（種入りホットク）の屋台が名物で、映画祭のハンドプリントが地面に埋め込まれています。国際市場は衣料品、乾物、土産物が並ぶアーケード商店街で、映画『国際市場で逢いましょう』の舞台。チャガルチ市場では1階で活魚を選び、2階の食堂で刺身にしてもらえます。龍頭山公園はエスカレーターで上がれ、釜山タワーから港の全景を眺められます。" },
        { heading: "時間帯とタイミング", body: "チャガルチ市場は早朝から営業していますが、刺身を食べるなら昼前後がベスト。BIFF広場の屋台は10時頃から。国際市場は日曜・祝日に一部休業する店があります。夕方は龍頭山公園から夕日と夜景の両方を楽しめるゴールデンタイムです。" },
        { heading: "実用情報", body: "チャガルチ市場では活魚の価格交渉が可能です。刺身の調理代（上の階の食堂利用料）は別途かかります。BIFF広場の屋台は現金が便利。国際市場ではカードを使える店も増えています。トイレは各市場施設内にあります。生魚の匂いが苦手な方は換気の良い2階席を選びましょう。" },
      ],
      [
        { q: "所要時間はどのくらい？", a: "食事込みで3〜4時間。買い物をじっくりするなら半日みてください。" },
        { q: "チャガルチ市場で刺身を食べる予算は？", a: "2人で30,000〜50,000ウォンが目安です。魚の種類と量によって変わります。調理代は別途10,000ウォン程度。" },
        { q: "BIFF広場のおすすめ屋台は？", a: "シアホットク（種入りの甘いパンケーキ）が名物です。1個1,500〜2,000ウォンで手軽に楽しめます。" },
        { q: "釜山タワーの入場料は？", a: "大人12,000ウォン程度。龍頭山公園自体は無料で入れます。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Walking Guide: Nampo-dong and Jagalchi Market in Busan",
      "Walk Busan's harbour-front district from BIFF Square's street food to Gukje Market's arcades and Jagalchi Fish Market's sashimi floors, with a Busan Tower detour.",
      NAMPO_IMAGES[0],
      NAMPO_IMAGES,
      BUSAN_X,
      [
        { heading: "What makes this route special", body: "Nampo-dong and Jagalchi form the historic port-city core of Busan. In a compact waterfront area you get BIFF Square's street-food stalls, the sprawling covered arcades of Gukje International Market, and Jagalchi — South Korea's largest fish market where you pick live seafood on the ground floor and eat it as sashimi upstairs. Add the Busan Tower on Yongdusan Hill for a harbour panorama and you have Busan's most concentrated food-and-market walking loop." },
        { heading: "Getting there and starting point", body: "Take subway line 1 to Nampo station, exit 1 — BIFF Square is directly outside. Alternatively start at Jagalchi station exit 3 and walk to the market first. The two stations are about five minutes apart on foot, so either works as an entry point." },
        { heading: "Key stops along the way", body: "BIFF Square has hotteok vendors and celebrity handprints embedded in the pavement. Gukje Market's covered arcades sell clothing, dried goods, and souvenirs — it is the setting of the popular Korean film 'Ode to My Father'. Jagalchi Market's ground floor is a wet market of live fish tanks; choose your fish and have it sliced at the second-floor restaurants. Yongdusan Park has escalator access and the Busan Tower observation deck provides a full harbour view." },
        { heading: "Best times and seasons", body: "Jagalchi opens early but sashimi is best enjoyed around midday. BIFF Square food stalls start around 10 am. Some Gukje Market shops close on Sundays and holidays. Late afternoon is the ideal time to climb Yongdusan Park — you get both sunset and the start of the harbour lights." },
        { heading: "Practical tips", body: "At Jagalchi you can negotiate fish prices. The preparation fee at the upstairs restaurant is charged separately. BIFF Square stalls prefer cash. Gukje Market increasingly accepts cards. Restrooms are inside each market building. If raw fish smells bother you, choose a well-ventilated second-floor seat." },
      ],
      [
        { q: "How long does this walk take?", a: "3 to 4 hours including a sashimi meal. Half a day if you shop at length." },
        { q: "What does sashimi at Jagalchi cost?", a: "Budget 30,000 to 50,000 won for two people depending on fish type and portion. Preparation fees at the upstairs restaurant add roughly 10,000 won." },
        { q: "What should I try at BIFF Square?", a: "Ssiat hotteok — a seed-filled sweet pancake — is the signature snack. About 1,500 to 2,000 won each." },
        { q: "What is the Busan Tower admission fee?", a: "About 12,000 won for adults. Yongdusan Park itself is free." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. Jeju – Hallim Coastal Walk
  // ═══════════════════════════════════════════════════════════════════
  "jeju-hallim-coastal-walk": {
    ja: ja(KR_JA_CTA,
      "翰林の海岸線散策と挟才海水浴場ガイド",
      "済州島西部の翰林エリアで、エメラルドグリーンの挟才ビーチ、翰林公園、海岸沿いの散歩を楽しむルートガイド。",
      HALLIM_IMAGES[0],
      HALLIM_IMAGES,
      JEJU_X,
      [
        { heading: "このルートの特徴", body: "翰林は済州島の西海岸に位置し、透明度の高い挟才（ヒョプチェ）海水浴場が最大の見どころです。白い砂浜とエメラルドグリーンの海は済州でも屈指の美しさ。隣接する金陵ビーチはさらに静かで、両ビーチを海岸沿いに歩いて移動できます。翰林公園には亜熱帯植物園と溶岩洞窟があり、自然好きには見応えがあります。飛揚島への15分のフェリーで離島散策も可能です。" },
        { heading: "アクセスと起点", body: "済州市外バスターミナルから翰林方面のバスで約50分。レンタカーなら済州空港から40分ほどです。翰林はバスの便が限られるため、レンタカーかタクシーチャーターがおすすめです。挟才ビーチに無料駐車場があります。" },
        { heading: "主要スポット", body: "挟才海水浴場は済州を代表するビーチで、遠浅のため子連れにも安全です。隣の金陵ビーチは観光客が少なく穴場。翰林公園は溶岩洞窟と植物園が一体になった施設で、所要時間は1時間ほど。翰林港から飛揚島へのフェリーは1日数便で、島は自転車で1時間ほどで一周できます。海岸沿いの玄武岩の石垣は済州独特の風景です。" },
        { heading: "時間帯とタイミング", body: "ビーチは午前中の光が最も美しく、特に干潮時はエメラルド色が際立ちます。翰林公園は9時開園。夏（7〜8月）は海水浴シーズンで賑わいますが、春や秋は静かにビーチ散歩を楽しめます。風が強い日は海岸散歩が辛いこともあるので、天気予報を確認してください。" },
        { heading: "実用情報", body: "挟才ビーチにシャワー、トイレ、更衣室あり。周辺にカフェとレストランも複数。翰林公園の入場料は大人12,000ウォン程度。済州島はバスの本数が少ないため、複数スポットを回るならレンタカーが圧倒的に便利です。国際免許証をお忘れなく。" },
      ],
      [
        { q: "翰林エリアの所要時間は？", a: "ビーチ散歩＋翰林公園で3〜4時間。飛揚島を含めると終日コースです。" },
        { q: "ベストシーズンは？", a: "ビーチは6〜9月がベスト。散歩だけなら春（4〜5月）と秋（10〜11月）が快適です。" },
        { q: "公共交通でアクセスできますか？", a: "バスで行けますが本数が少ないです。レンタカーかタクシーが現実的です。" },
        { q: "飛揚島のフェリーは予約が必要？", a: "予約なしで乗れますが、天候により欠航することがあります。翰林港で当日確認してください。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Hallim Coastal Walk and Hyeopjae Beach Guide on Jeju Island",
      "Walk Jeju's western coast from turquoise Hyeopjae Beach through Hallim Park's lava caves and subtropical gardens, with an optional ferry hop to Biyangdo Island.",
      HALLIM_IMAGES[0],
      HALLIM_IMAGES,
      JEJU_X,
      [
        { heading: "What makes this route special", body: "Hallim sits on Jeju's west coast and centres on Hyeopjae Beach — white sand, shallow turquoise water, and Biyangdo Island on the horizon. The neighbouring Geumneung Beach is quieter and reachable on foot along the shore. Hallim Park combines subtropical gardens with lava-tube caves in a single compound. A 15-minute ferry from Hallim Port reaches Biyangdo, a tiny volcanic island you can circle by bicycle in an hour. Basalt stone walls line the paths between villages, giving the coastline a distinctly Jeju character." },
        { heading: "Getting there and starting point", body: "Intercity buses from Jeju City terminal reach Hallim in about 50 minutes. By rental car the drive from Jeju Airport is around 40 minutes. Buses to Hallim are infrequent, so a car or chartered taxi is recommended for covering multiple stops. Free parking is available at Hyeopjae Beach." },
        { heading: "Key stops along the way", body: "Hyeopjae Beach is the headline — shallow, clear water safe enough for children. Geumneung Beach next door draws fewer visitors. Hallim Park's lava caves and botanical gardens take about an hour. The ferry to Biyangdo runs a few times daily and the island is ideal for a bicycle loop. The coastal stone walls between villages are a walking route unique to Jeju." },
        { heading: "Best times and seasons", body: "Morning light on the beach is the most photogenic, especially at low tide when the green tones are strongest. Hallim Park opens at 9 am. Summer (July–August) is swimming season and busy; spring and autumn are quieter for coastal walks. Check the wind forecast — Jeju's west coast is exposed and strong winds can make walking unpleasant." },
        { heading: "Practical tips", body: "Hyeopjae Beach has showers, restrooms, and changing rooms. Cafes and restaurants are nearby. Hallim Park admission is about 12,000 won. Jeju's bus service is limited, so a rental car is far more practical for multi-stop days. Bring your international driving permit." },
      ],
      [
        { q: "How long should I plan for the Hallim area?", a: "3 to 4 hours for the beach and Hallim Park. A full day if you add Biyangdo Island." },
        { q: "When is the best season?", a: "June to September for swimming. Spring and autumn are ideal for walking without the summer crowds." },
        { q: "Can I get there by public transport?", a: "Buses run but infrequently. A rental car or taxi charter is more practical." },
        { q: "Do I need a reservation for the Biyangdo ferry?", a: "No reservation needed, but sailings may be cancelled in bad weather. Check at Hallim Port on the day." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 9. Jeju – Seogwipo Market Walk
  // ═══════════════════════════════════════════════════════════════════
  "jeju-seogwipo-market-walk": {
    ja: ja(KR_JA_CTA,
      "西帰浦の毎日オルレ市場と港散策ガイド",
      "済州島南部の西帰浦で、毎日オルレ市場の屋台グルメ、天地淵の滝、港町の散策を楽しむルートガイド。",
      SEOGWIPO_IMAGES[0],
      SEOGWIPO_IMAGES,
      JEJU_X,
      [
        { heading: "このルートの特徴", body: "西帰浦は済州島の南海岸に位置する町で、毎日オルレ市場を中心にローカルな食文化と自然景観が楽しめます。市場ではみかんジュース、黒豚串、海鮮チヂミなどの済州グルメを屋台で気軽に味わえます。市場から徒歩圏内に天地淵の滝と正房の滝があり、港沿いには刺身店やダイビングツアーの拠点が並んでいます。李仲燮美術通りではギャラリー巡りも楽しめます。" },
        { heading: "アクセスと起点", body: "済州市外バスターミナルから西帰浦行きのバスで約1時間。レンタカーなら済州空港から50分ほどです。西帰浦のバスターミナルから毎日オルレ市場までは徒歩5分。コンパクトな町なので、市場を起点に主要スポットを徒歩で回れます。" },
        { heading: "主要スポット", body: "毎日オルレ市場は常設市場で、済州産の魚介、果物、餅、惣菜が並びます。天地淵の滝は市場から南に徒歩15分で、渓谷沿いの遊歩道も整備されています。正房の滝はアジアでは珍しい海に直接落ちる滝。西帰浦港では鮮魚店が営む食堂で活魚刺身を楽しめます。ソソッカク（薬泉寺渓谷入口）ではカヤックも体験できます。" },
        { heading: "時間帯とタイミング", body: "市場は午前中から夕方まで営業。屋台グルメは昼前後が最も活気があります。天地淵の滝は朝の光が渓谷に差し込む午前中がおすすめ。正房の滝は日中いつでもOK。港の食堂は昼食時が賑わいます。" },
        { heading: "実用情報", body: "市場の屋台は現金が便利ですが、カード対応の店も増えています。天地淵の滝は入場料2,000ウォン程度。正房の滝も同額。トイレは市場内と各観光スポットにあります。西帰浦は済州市よりも温暖で、冬でも散策に適した気候です。" },
      ],
      [
        { q: "西帰浦散策の所要時間は？", a: "市場＋天地淵の滝で2〜3時間。正房の滝と港も含めると半日です。" },
        { q: "おすすめの市場グルメは？", a: "みかんジュース、黒豚串焼き、海鮮チヂミ、ヨモギ餅が人気です。" },
        { q: "済州市からの移動時間は？", a: "バスで約1時間、レンタカーで約50分です。" },
        { q: "西帰浦だけで1日過ごせますか？", a: "市場、滝2カ所、港、ソソッカクを回ると十分1日楽しめます。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Seogwipo Olle Market and Harbour Walk Guide on Jeju Island",
      "Explore Seogwipo's daily Olle Market for Jeju street food, walk to two waterfalls, and stroll the harbour — Jeju's quieter southern coast town.",
      SEOGWIPO_IMAGES[0],
      SEOGWIPO_IMAGES,
      JEJU_X,
      [
        { heading: "What makes this route special", body: "Seogwipo is Jeju's southern coastal town, centred on the Maeil Olle Market — a permanent market with street-food stalls selling Jeju tangerine juice, black-pork skewers, and seafood pancakes. Two waterfalls are within walking distance: Cheonjiyeon in a forested ravine and Jeongbang, which drops directly into the ocean. The harbour front has sashimi restaurants and dive-tour operators. Lee Jung-seop Art Street adds a small gallery dimension. The compact layout means everything connects on foot." },
        { heading: "Getting there and starting point", body: "Intercity buses from Jeju City take about an hour. By car the drive from Jeju Airport is around 50 minutes. From Seogwipo's bus terminal the market is a five-minute walk. The town is small enough to cover the main attractions on foot from the market." },
        { heading: "Key stops along the way", body: "Maeil Olle Market is a covered daily market with Jeju produce, seafood, rice cakes, and ready-to-eat dishes. Cheonjiyeon Waterfall is a 15-minute walk south, along a ravine boardwalk. Jeongbang Waterfall drops into the sea and is one of the few ocean-facing falls in Asia. The harbour area has fishmonger restaurants serving live-fish sashimi. Soesokkak Estuary to the east offers kayaking through volcanic rock formations." },
        { heading: "Best times and seasons", body: "The market is busiest and liveliest around midday. Cheonjiyeon Waterfall is best in the morning when light enters the ravine. Jeongbang works any time of day. Harbour restaurants are popular at lunch. Seogwipo is warmer than Jeju City and comfortable for walking even in winter." },
        { heading: "Practical tips", body: "Cash is handy at market stalls, though card acceptance is growing. Admission to Cheonjiyeon and Jeongbang waterfalls is about 2,000 won each. Restrooms are in the market and at each attraction. Seogwipo's mild climate makes it walkable year-round." },
      ],
      [
        { q: "How long should I spend in Seogwipo?", a: "2 to 3 hours for the market and one waterfall. Half a day to cover both waterfalls and the harbour." },
        { q: "What should I eat at the market?", a: "Tangerine juice, black-pork skewers, seafood pancake, and mugwort rice cakes are the staples." },
        { q: "How long is the trip from Jeju City?", a: "About one hour by bus or 50 minutes by car." },
        { q: "Can I fill a full day in Seogwipo?", a: "Yes — the market, both waterfalls, the harbour, and Soesokkak Estuary fill a comfortable day." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 10. Jeju – Udo Island
  // ═══════════════════════════════════════════════════════════════════
  "jeju-udo-island-walk": {
    ja: ja(KR_JA_CTA,
      "牛島一周の半日サイクリング＆散策ガイド",
      "済州島東端からフェリーで15分の牛島。サンゴ砂のビーチ、灯台展望台、名物ピーナッツアイスを巡る半日コース。",
      UDO_IMAGES[0],
      UDO_IMAGES,
      JEJU_X,
      [
        { heading: "このルートの特徴", body: "牛島（ウド）は済州島の東端・城山浦からフェリーで15分の小さな火山島です。自転車やバイクで島を一周でき、サンゴ砂のビーチ、牛島峰の灯台展望台、海女（ヘニョ）の漁場など、済州の自然と文化がコンパクトに凝縮されています。名物のピーナッツアイスクリームは島内の至る所で販売されています。半日あれば島全体を楽しめます。" },
        { heading: "アクセスと起点", body: "済州市から城山港まで車で約1時間、またはバスで1.5時間。城山港からフェリーは30分〜1時間間隔で運行（所要15分）。フェリーの乗船には身分証明書（パスポート）が必要です。島内では自転車（電動あり）やスクーターをレンタルできます。徒歩での一周は4〜5時間かかります。" },
        { heading: "主要スポット", body: "サンホビーチ（珊瑚海水浴場）はサンゴの砂が特徴的で、海の色が鮮やかです。牛島峰の灯台からは360度のパノラマで済州東海岸と城山日出峰が見渡せます。下古水洞ビーチは南岸にあり、玄武岩の岩場と穏やかな海のコントラストが美しいです。島のあちこちにあるピーナッツアイスクリーム店は必ず立ち寄りたいスポットです。" },
        { heading: "時間帯とタイミング", body: "朝一番のフェリーで渡ると静かな島を楽しめます。最終便は季節により16:30〜18:00頃なので事前に確認を。夏は海水浴客で賑わいますが、春秋は自転車で快適に周遊できます。風が強い日はフェリーが欠航することがあるので天候チェックは必須です。" },
        { heading: "実用情報", body: "自転車レンタルは港周辺で1時間3,000〜5,000ウォン、電動自転車は1万ウォン前後。スクーターは国際免許証が必要。島内にコンビニと食堂があります。日焼け対策は必須。フェリーの最終便に乗り遅れると島に泊まることになるので、時間に余裕を持って行動してください。" },
      ],
      [
        { q: "牛島一周にかかる時間は？", a: "自転車で1.5〜2時間、徒歩なら4〜5時間です。休憩込みで半日みてください。" },
        { q: "フェリーの予約は必要？", a: "予約不要で当日購入できますが、夏の週末は混雑します。パスポートを忘れずに。" },
        { q: "おすすめの交通手段は？", a: "電動自転車が最も効率的です。坂道があるので普通の自転車より楽です。" },
        { q: "城山日出峰と組み合わせられますか？", a: "はい。城山港から城山日出峰は徒歩圏内なので、午前に日出峰、午後に牛島というプランが人気です。" },
      ],
    ),
    en: en(KR_EN_CTA,
      "Udo Island Half-Day Cycling and Walking Guide from Jeju",
      "Ferry to Udo Island from Jeju's east coast for coral-sand beaches, a lighthouse viewpoint, and the island's famous peanut ice cream — all in half a day.",
      UDO_IMAGES[0],
      UDO_IMAGES,
      JEJU_X,
      [
        { heading: "What makes this route special", body: "Udo is a small volcanic island a 15-minute ferry ride from Seongsan on Jeju's eastern tip. You can circle the island by bicycle or scooter, passing coral-sand beaches, a lighthouse with a 360-degree panorama, and haenyeo (female diver) working areas. The island's signature snack — peanut ice cream — is sold everywhere. Udo packs Jeju's natural and cultural highlights into a compact half-day loop." },
        { heading: "Getting there and starting point", body: "From Jeju City drive about one hour or take a bus for 1.5 hours to Seongsan Port. Ferries depart every 30 to 60 minutes and the crossing takes 15 minutes. You need your passport to board. On Udo you can rent bicycles (including electric), scooters (international licence required), or walk — though walking the full loop takes 4 to 5 hours." },
        { heading: "Key stops along the way", body: "Sanho Beach has distinctive coral sand that gives the water vivid colour. Udo Peak lighthouse provides a 360-degree view across Jeju's east coast and back to Seongsan Ilchulbong. Hagosudong Beach on the south coast has calm water and basalt rock formations. Peanut ice cream shops are scattered across the island and are an essential stop." },
        { heading: "Best times and seasons", body: "Take the first ferry for a quieter island. The last return ferry runs between 4:30 pm and 6 pm depending on the season — check in advance. Summer brings swimmers; spring and autumn are best for cycling. Ferries may be cancelled in strong wind, so check weather conditions before you go." },
        { heading: "Practical tips", body: "Bicycle rental near the port costs 3,000 to 5,000 won per hour; electric bikes around 10,000 won. Scooters require an international licence. The island has convenience stores and small restaurants. Sun protection is essential. Do not miss the last ferry — there are very few places to stay on the island." },
      ],
      [
        { q: "How long does it take to circle Udo?", a: "1.5 to 2 hours by bicycle, 4 to 5 hours on foot. Allow a half day including stops." },
        { q: "Do I need a ferry reservation?", a: "No reservation needed — buy tickets on the day. Summer weekends can be busy. Bring your passport." },
        { q: "What is the best way to get around the island?", a: "An electric bicycle is the most practical option. The hills make a regular bicycle tiring." },
        { q: "Can I combine Udo with Seongsan Ilchulbong?", a: "Yes. Seongsan Ilchulbong is within walking distance of the ferry port. A popular plan is the crater in the morning and Udo in the afternoon." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 11. Taipei – Dadaocheng & Dihua Street
  // ═══════════════════════════════════════════════════════════════════
  "taipei-dadaocheng-dihua-walk": {
    ja: ja(TW_JA_CTA,
      "大稲埕と迪化街のレトロ散策ガイド",
      "台北最古の商業エリア・大稲埕と迪化街で、バロック建築、乾物店、布市場、廟を巡るレトロ散策ルート。",
      DADAOCHENG_IMAGES[0],
      DADAOCHENG_IMAGES,
      TAIPEI_X,
      [
        { heading: "このルートの特徴", body: "大稲埕は台北で最も歴史のある商業エリアで、迪化街にはバロック様式のファサードを持つ商家が200mにわたって並んでいます。乾物、漢方薬、布地を扱う老舗が今も営業しており、近年はリノベーションされたカフェやセレクトショップも増えています。霞海城隍廟は縁結びのパワースポットとして知られ、旧正月前には年貨市（お正月マーケット）で大賑わいになります。淡水河沿いの埠頭も整備され、夕方の散歩に最適です。" },
        { heading: "アクセスと起点", body: "MRT大橋頭駅（中和新蘆線）が最寄りです。1番出口から迪化街まで徒歩5分。北門駅（松山新店線・板南線）からも徒歩10分ほどでアクセスできます。迪化街の南端（永楽市場側）からスタートして北上するルートが分かりやすいです。" },
        { heading: "主要スポット", body: "迪化街南端の永楽市場は台北最大の布市場で、2階以上にはオーダーメイドの仕立て屋が並びます。霞海城隍廟は小さいながら参拝者が絶えない人気の廟です。通り沿いには乾物・ドライフルーツ・漢方薬の専門店が続き、試食しながら歩けます。北端に進むと大稲埕埠頭に出て、淡水河沿いの遊歩道で夕涼みができます。大稲埕戯苑（劇場）では週末に台湾歌仔戯が上演されることもあります。" },
        { heading: "時間帯とタイミング", body: "迪化街の商店は9時頃から営業開始。午前中は比較的空いていてゆっくり見られます。永楽市場は早朝から。カフェは11時頃から。大稲埕埠頭は夕方が気持ちよく、夕日を見ながらの散歩がおすすめです。旧正月前2〜3週間は年貨市で最も活気があります。" },
        { heading: "実用情報", body: "ほとんどの店舗が現金中心ですが、リノベーション系のカフェやショップはカード対応も増えています。トイレは永楽市場内と大稲埕公園にあります。迪化街は南北約800mで平坦。夏場は非常に暑いので、午前中か夕方の訪問がおすすめです。悠遊カード（EasyCard）があると移動に便利です。" },
      ],
      [
        { q: "迪化街散策の所要時間は？", a: "ゆっくり歩いて1.5〜2時間。大稲埕埠頭まで含めると3時間程度です。" },
        { q: "おすすめのお土産は？", a: "ドライフルーツ（ドライマンゴー、パイナップルケーキの材料）、花茶、漢方素材が人気です。" },
        { q: "旧正月の年貨市はいつですか？", a: "旧正月の2〜3週間前から開催されます。毎年日程が変わるので事前に確認してください。" },
        { q: "永楽市場で布を買うには？", a: "2階以上のフロアに布地の卸売店があり、少量からでも購入可能です。仕立てのオーダーもできます。" },
      ],
    ),
    en: en(TW_EN_CTA,
      "Walking Guide to Dadaocheng and Dihua Street in Taipei",
      "Explore Taipei's oldest commercial district along Dihua Street — Baroque merchant facades, dried-goods shops, a fabric market, and a riverside promenade.",
      DADAOCHENG_IMAGES[0],
      DADAOCHENG_IMAGES,
      TAIPEI_X,
      [
        { heading: "What makes this route special", body: "Dadaocheng is Taipei's oldest commercial district, and Dihua Street is its spine — a 200-metre row of Baroque-style merchant buildings that have traded in dried goods, Chinese medicine, and fabric since the late Qing era. In recent years the old shophouses have also welcomed renovated cafes and design boutiques. Xiahai City God Temple is a compact but hugely popular matchmaking shrine. The Dadaocheng Wharf along the Tamsui River has been redeveloped into a pleasant evening promenade. Before Lunar New Year the street hosts a bustling year-end market." },
        { heading: "Getting there and starting point", body: "Take the MRT Zhonghe-Xinlu line to Daqiaotou station, exit 1, and walk five minutes south to reach Dihua Street. Beimen station on the Songshan-Xindian and Bannan lines is also about 10 minutes away on foot. Starting at the southern end near Yongle Market and walking north is the most logical route." },
        { heading: "Key stops along the way", body: "Yongle Market at the southern end is Taipei's largest fabric market, with custom tailors on the upper floors. Xiahai City God Temple is tiny but constantly busy with worshippers. Along the street, dried-fruit vendors, herbalists, and tea shops offer samples as you walk. At the northern end you reach Dadaocheng Wharf, a riverside walkway ideal for an evening stroll. Dadaocheng Theatre occasionally stages Taiwanese opera on weekends." },
        { heading: "Best times and seasons", body: "Shops open around 9 am. Mornings are quieter for browsing. Yongle Market starts early. Cafes open around 11 am. The wharf is best in the late afternoon for sunset. The two to three weeks before Lunar New Year bring the year-end market and peak energy. Summers are extremely hot — visit in the morning or evening." },
        { heading: "Practical tips", body: "Most traditional shops prefer cash, but newer cafes and boutiques accept cards. Restrooms are in Yongle Market and Dadaocheng Park. Dihua Street is flat and about 800 metres long. An EasyCard is useful for MRT and bus travel. Stay hydrated in summer — Taipei's humidity is intense." },
      ],
      [
        { q: "How long does the Dihua Street walk take?", a: "1.5 to 2 hours at a leisurely pace. Add another hour for the wharf promenade." },
        { q: "What are good souvenirs?", a: "Dried mango, pineapple cake ingredients, flower teas, and Chinese herbal products are popular." },
        { q: "When is the Lunar New Year market?", a: "It runs for two to three weeks before Lunar New Year. Dates shift annually — check beforehand." },
        { q: "Can I buy fabric at Yongle Market?", a: "Yes — fabric wholesalers on the upper floors sell even in small quantities, and some offer custom tailoring." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 12. Taipei – Yongkang Street
  // ═══════════════════════════════════════════════════════════════════
  "taipei-yongkang-street-walk": {
    ja: ja(TW_JA_CTA,
      "永康街のグルメとカフェ通り散策ガイド",
      "台北の美食ストリート・永康街で、小籠包、マンゴーかき氷、タピオカミルクティーからカフェまで。食べ歩きルートガイド。",
      YONGKANG_IMAGES[0],
      YONGKANG_IMAGES,
      TAIPEI_X,
      [
        { heading: "このルートの特徴", body: "永康街は台北で最も有名なグルメストリートで、鼎泰豊の本店をはじめ、牛肉麺、マンゴーかき氷、タピオカミルクティーの名店が集まっています。食事だけでなく、個性的なカフェ、セレクトショップ、茶芸館も点在し、食べ歩きとショッピングを同時に楽しめるエリアです。通り自体は短いですが、周辺の路地まで含めると見どころが多く、午後をたっぷり使えます。" },
        { heading: "アクセスと起点", body: "MRT東門駅（淡水信義線・中和新蘆線）5番出口が永康街の入口に直結しています。出口を出て右に進むとすぐに鼎泰豊本店が見えます。大安森林公園駅からも徒歩10分ほど。中正紀念堂も徒歩圏内で、セットで訪問できます。" },
        { heading: "主要スポット", body: "鼎泰豊本店は小籠包の聖地として世界中から人が訪れます。整理券制で待ち時間が表示されるので、先に番号を取ってから周辺を散策するのが効率的。永康公園周辺にはマンゴーかき氷の有名店が複数あり、夏の定番です。牛肉麺の老舗も複数あり、食べ比べも楽しい。路地に入ると台湾茶の専門店やクラフトコーヒー店が隠れています。" },
        { heading: "時間帯とタイミング", body: "鼎泰豊は11時開店で、開店直後が最も待ち時間が短いです。ランチタイム（12〜13時）は1時間以上待つことも。かき氷は暑い季節（5〜10月）限定の店もあります。カフェは14時以降が落ち着いています。夕方には永康街から中正紀念堂まで散歩して、衛兵交代式を見るのもおすすめです。" },
        { heading: "実用情報", body: "ほとんどの飲食店がカード対応ですが、小さな屋台は現金のみ。永康公園にトイレがあります。永康街自体は南北200mほどの短い通りですが、東西の路地を含めると広がりがあります。夏場は非常に暑いので、かき氷やカフェで涼を取りながら歩きましょう。" },
      ],
      [
        { q: "永康街の所要時間は？", a: "食事1回＋散策で2時間程度。複数の店を回るなら3〜4時間です。" },
        { q: "鼎泰豊の待ち時間は？", a: "開店直後（11時）なら15〜30分。ランチタイムは1時間以上待つことがあります。整理券を先に取りましょう。" },
        { q: "マンゴーかき氷のシーズンは？", a: "5〜10月がマンゴーの旬です。人気店は行列ができるので、14時前後の訪問がおすすめ。" },
        { q: "ベジタリアン対応の店はありますか？", a: "台北は素食（ベジタリアン）文化が根付いており、永康街周辺にも素食レストランがあります。" },
      ],
    ),
    en: en(TW_EN_CTA,
      "Walking Guide to Yongkang Street Food and Cafes in Taipei",
      "Eat your way through Taipei's Yongkang Street — from the original Din Tai Fung to mango shaved ice, beef noodle soup, and specialty coffee in the surrounding lanes.",
      YONGKANG_IMAGES[0],
      YONGKANG_IMAGES,
      TAIPEI_X,
      [
        { heading: "What makes this route special", body: "Yongkang Street is Taipei's most celebrated food strip. The original Din Tai Fung — the xiao long bao restaurant that launched a global chain — anchors the north end. Around it cluster beef noodle soup legends, mango shaved-ice parlours, bubble-tea originators, and a growing set of specialty cafes and tea houses. The street itself is short, but the side alleys extend the eating and shopping radius into a neighbourhood that fills an entire afternoon." },
        { heading: "Getting there and starting point", body: "Take the MRT to Dongmen station (Tamsui-Xinyi line or Zhonghe-Xinlu line), exit 5. The exit opens directly onto Yongkang Street, with Din Tai Fung visible to the right. Da'an Forest Park station is a 10-minute walk south. Chiang Kai-shek Memorial Hall is within walking distance to the east." },
        { heading: "Key stops along the way", body: "Din Tai Fung's original branch uses a numbered-ticket system — take a number, see the estimated wait, and explore the area until your turn. Near Yongkang Park several famous mango shaved-ice shops compete for attention in summer. Multiple beef noodle restaurants along the street make side-by-side tasting possible. Turn into the side alleys to find Taiwanese tea shops and craft coffee roasters." },
        { heading: "Best times and seasons", body: "Din Tai Fung opens at 11 am — arrive at opening for the shortest wait. Lunch hour (12–1 pm) can mean waits over an hour. Mango shaved-ice shops may only operate from May to October. Cafes are quietest after 2 pm. In the late afternoon you can walk to CKS Memorial Hall to catch the hourly changing of the guard ceremony." },
        { heading: "Practical tips", body: "Most restaurants accept cards, though small stalls may need cash. Yongkang Park has public restrooms. The main street is about 200 metres but the side alleys add depth. Summer heat is intense — use shaved-ice and cafe stops as cooling breaks." },
      ],
      [
        { q: "How long should I spend on Yongkang Street?", a: "About 2 hours for one meal and a walk. 3 to 4 hours if you hit multiple restaurants." },
        { q: "How long is the wait at Din Tai Fung?", a: "15 to 30 minutes at opening (11 am). Over an hour during peak lunch. Take a number first." },
        { q: "When is mango shaved-ice season?", a: "May to October is mango season. Popular shops queue up — try visiting around 2 pm." },
        { q: "Are there vegetarian options?", a: "Taipei has a strong vegetarian (su shi) culture and several meat-free restaurants operate near Yongkang Street." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 13. Taipei – Beitou Hot Spring
  // ═══════════════════════════════════════════════════════════════════
  "taipei-beitou-hot-spring-walk": {
    ja: ja(TW_JA_CTA,
      "北投温泉地区の散策ガイド",
      "台北市内からMRTで30分の北投温泉で、地熱谷、温泉博物館、公共露天風呂を巡るリラックス散策ルート。",
      BEITOU_IMAGES[0],
      BEITOU_IMAGES,
      TAIPEI_X,
      [
        { heading: "このルートの特徴", body: "北投は台北市内からMRTで約30分で行ける温泉地で、日本統治時代に開発された歴史ある温泉街です。地熱谷の緑色に輝く硫黄泉、日本式木造建築の温泉博物館、公共露天風呂「千禧湯」、そしてグリーン建築として有名な北投図書館が、渓谷沿いの公園にコンパクトにまとまっています。温泉に浸かりながら半日を過ごす、都会のリフレッシュスポットです。" },
        { heading: "アクセスと起点", body: "MRT淡水信義線で北投駅まで行き、新北投支線に乗り換えて1駅で新北投駅に到着。台北駅から約30分です。新北投駅を出ると温泉公園の入口が見えます。温泉博物館や地熱谷はすべて駅から徒歩圏内です。" },
        { heading: "主要スポット", body: "地熱谷は硫黄ガスが立ち上る翡翠色の温泉池で、北投のシンボルです。温泉博物館は1913年建築の旧公衆浴場を改装した施設で、入場無料。千禧湯（ミレニアム温泉）は公共の露天温泉で、大人40元と格安。北投図書館は温泉公園内の木造グリーン建築で、読書好きでなくても見る価値があります。復元された旧新北投駅舎も小さな鉄道展示施設になっています。" },
        { heading: "時間帯とタイミング", body: "地熱谷は9時開園で、午前中の蒸気が最も美しいです。千禧湯は火曜〜日曜の9時〜21時（月曜定休）。温泉博物館は火曜〜日曜の9時〜17時。平日午前は空いていて快適。夏でも温泉は楽しめますが、秋冬の方が温泉気分が盛り上がります。" },
        { heading: "実用情報", body: "千禧湯は水着着用が必要です（レンタルなし）。タオルは持参するか、近くのコンビニで購入を。温泉博物館はスリッパに履き替えての入館です。周辺にはプライベート温泉の旅館も多く、個室風呂を楽しむこともできます。北投は坂道がありますが、主要スポットは整備された遊歩道で結ばれています。" },
      ],
      [
        { q: "北投温泉の所要時間は？", a: "温泉入浴込みで3〜4時間。散策だけなら2時間程度です。" },
        { q: "水着は必要ですか？", a: "千禧湯（公共露天風呂）は水着必須です。旅館の個室風呂なら不要です。" },
        { q: "入場料はいくらですか？", a: "温泉博物館は無料。千禧湯は40元。地熱谷は無料です。" },
        { q: "雨の日でも楽しめますか？", a: "温泉博物館と温泉入浴は雨でも問題ありません。地熱谷は屋外ですが、蒸気と雨のコンビネーションも幻想的です。" },
      ],
    ),
    en: en(TW_EN_CTA,
      "Beitou Hot Spring District Walking Guide in Taipei",
      "A half-day walk through Taipei's Beitou hot-spring valley — Thermal Valley's steaming green pool, a Japanese-era bathhouse museum, and an outdoor public spring.",
      BEITOU_IMAGES[0],
      BEITOU_IMAGES,
      TAIPEI_X,
      [
        { heading: "What makes this route special", body: "Beitou is a hot-spring district reachable from central Taipei in about 30 minutes by MRT. Developed during the Japanese colonial period, it packs Thermal Valley's steaming green sulphur pool, a Japanese-era wooden bathhouse turned museum, the award-winning green-architecture Beitou Library, and a cheap public outdoor spring into a compact creek-side park. It is one of the most accessible urban hot-spring experiences in Asia." },
        { heading: "Getting there and starting point", body: "Take the MRT Tamsui-Xinyi line to Beitou station and transfer to the one-stop Xinbeitou branch line. The total journey from Taipei Main Station is about 30 minutes. The hot-spring park entrance is visible from Xinbeitou station. All key sites are within walking distance of the station." },
        { heading: "Key stops along the way", body: "Thermal Valley is a steaming jade-green sulphur pool that serves as Beitou's signature visual. The Hot Spring Museum is a restored 1913 public bathhouse — free admission. Millennium Hot Spring is an outdoor public pool at 40 TWD. Beitou Library is a timber green-certified building set among the park trees. The restored old Xinbeitou station building has a small railway heritage exhibit." },
        { heading: "Best times and seasons", body: "Thermal Valley opens at 9 am and the morning steam is the most dramatic. Millennium Hot Spring operates Tuesday to Sunday, 9 am to 9 pm (closed Mondays). The museum opens Tuesday to Sunday, 9 am to 5 pm. Weekday mornings are the quietest. Autumn and winter feel the most natural for hot-spring bathing, though the pools are enjoyable year-round." },
        { heading: "Practical tips", body: "Millennium Hot Spring requires a swimsuit — no rental available. Bring a towel or buy one at a nearby convenience store. The museum requires you to change into slippers at the entrance. Private hot-spring inns nearby offer individual baths if you prefer privacy. The area has some slopes but the main sites are connected by maintained pathways." },
      ],
      [
        { q: "How long should I spend in Beitou?", a: "3 to 4 hours with a soak. About 2 hours for sightseeing only." },
        { q: "Do I need a swimsuit?", a: "Yes for Millennium Hot Spring (the public outdoor pool). Private inn baths do not require one." },
        { q: "What are the admission fees?", a: "Hot Spring Museum is free. Millennium Hot Spring is 40 TWD. Thermal Valley is free." },
        { q: "Is Beitou worth visiting in the rain?", a: "Yes — the museum and the hot spring are enjoyable in any weather. Thermal Valley's steam mixed with rain creates an atmospheric scene." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 14. Taipei – Songshan Cultural Park
  // ═══════════════════════════════════════════════════════════════════
  "taipei-songshan-cultural-walk": {
    ja: ja(TW_JA_CTA,
      "松山文創園区とその周辺散歩ガイド",
      "旧タバコ工場をリノベーションした松山文創園区を起点に、慈祐宮、饒河夜市、国父紀念館を巡る台北東部の散策ルート。",
      SONGSHAN_IMAGES[0],
      SONGSHAN_IMAGES,
      TAIPEI_X,
      [
        { heading: "このルートの特徴", body: "松山文創園区は1937年に建てられたタバコ工場をリノベーションした文化施設で、デザイン展示、クラフトマーケット、カフェが入っています。中庭の池と緑に囲まれた空間は都会のオアシスです。徒歩圏内に台北101があり、園区から歩いて15分で到着します。松山駅上の慈祐宮は台北有数の媽祖廟で、そこから饒河街夜市が始まるため、昼は文創園区、夜は夜市というプランが組めます。" },
        { heading: "アクセスと起点", body: "MRT板南線市政府駅1番出口から徒歩10分。または松山新店線国父紀念館駅5番出口から徒歩8分。松山駅（台鉄・MRT）からも徒歩5分で、饒河夜市と組み合わせるなら松山駅スタートが便利です。" },
        { heading: "主要スポット", body: "松山文創園区はデザイン・アート系の企画展が常時開催されており、入場は多くの展示が無料です。園内のセレクトショップでは台湾デザインの雑貨が購入できます。台北101は園区から徒歩15分で、展望台からの眺望は台北随一。慈祐宮は極彩色の装飾が見事な媽祖廟。饒河街夜市は慈祐宮の門前から始まり、胡椒餅やステーキが名物です。国父紀念館は広い庭園と衛兵交代式が見どころ。" },
        { heading: "時間帯とタイミング", body: "松山文創園区は9時〜18時（展示により異なる）。午前中は空いていて写真撮影に最適。国父紀念館の衛兵交代は毎正時。饒河夜市は17時頃から開き始め、20時頃がピーク。台北101の展望台は日没前に上ると夕景と夜景の両方を楽しめます。" },
        { heading: "実用情報", body: "松山文創園区は入園無料（一部企画展は有料）。飲食店はカード対応が多いですが、夜市は現金中心。トイレは園区内各所と駅構内にあります。台北101の展望台は600元（オンライン事前購入で割引あり）。夏場は暑いので、園区→101→国父紀念館の移動は地下通路を使うと快適です。" },
      ],
      [
        { q: "松山文創園区の所要時間は？", a: "園区だけなら1〜1.5時間。台北101や饒河夜市まで含めると半日〜1日です。" },
        { q: "饒河夜市のおすすめは？", a: "入口の胡椒餅（フージャオビン）は行列必至の名物。薬燉排骨（漢方スペアリブスープ）もおすすめ。" },
        { q: "台北101の展望台は予約が必要？", a: "事前のオンライン購入がおすすめです。当日券もありますが、混雑時は待ち時間が長くなります。" },
        { q: "子連れでも楽しめますか？", a: "園区の中庭は広く、子供が遊べるスペースがあります。夜市も家族連れが多いです。" },
      ],
    ),
    en: en(TW_EN_CTA,
      "Songshan Cultural and Creative Park Walking Guide in Taipei",
      "Walk from the converted tobacco factory of Songshan Cultural Park to Taipei 101, Ciyou Temple, and Raohe Night Market — Taipei's east-side day-to-night route.",
      SONGSHAN_IMAGES[0],
      SONGSHAN_IMAGES,
      TAIPEI_X,
      [
        { heading: "What makes this route special", body: "Songshan Cultural and Creative Park is a 1937 tobacco factory renovated into a design and exhibition space with craft markets, cafes, and a reflecting pool courtyard. Taipei 101 is a 15-minute walk away. Ciyou Temple at Songshan station is one of Taipei's most ornate Mazu temples, and its gate opens directly into Raohe Street Night Market — making a daytime cultural walk and an evening food crawl a natural combination." },
        { heading: "Getting there and starting point", body: "MRT Bannan line to City Hall station exit 1, then 10 minutes on foot. Or Songshan-Xindian line to Sun Yat-sen Memorial Hall station exit 5, an 8-minute walk. If you plan to end at Raohe Night Market, starting from Songshan station (TRA and MRT) is convenient." },
        { heading: "Key stops along the way", body: "The park hosts rotating design and art exhibitions, many of them free. Its select shops sell Taiwanese-designed goods. Taipei 101's observation deck gives the city's best panorama and is walkable from the park. Ciyou Temple's vivid decoration merits a stop even for non-worshippers. Raohe Street Night Market runs from the temple gate with pepper buns and steak as signature stalls. Sun Yat-sen Memorial Hall has a large garden and an hourly changing of the guard." },
        { heading: "Best times and seasons", body: "The park opens at 9 am and mornings are quiet for photos. Sun Yat-sen Memorial Hall's guard change is on the hour. Raohe Night Market starts around 5 pm and peaks at 8 pm. For Taipei 101's observation deck, arrive before sunset to catch both the twilight and night views." },
        { heading: "Practical tips", body: "Park admission is free; some exhibitions charge separately. Most restaurants accept cards but the night market is cash-heavy. Restrooms are inside the park and at MRT stations. Taipei 101's observation deck costs 600 TWD (discounts for online booking). In summer, use the underground walkways between the park, 101, and the MRT to stay cool." },
      ],
      [
        { q: "How long should I spend at Songshan Cultural Park?", a: "1 to 1.5 hours for the park. Half a day to a full day including 101 and Raohe Night Market." },
        { q: "What should I eat at Raohe Night Market?", a: "The pepper bun (hujiao bing) at the entrance always has a queue — it is the market's signature. Medicinal pork rib soup is another highlight." },
        { q: "Do I need to book Taipei 101 tickets in advance?", a: "Online booking is recommended for a discount and shorter wait. Walk-up tickets are available but waits can be long." },
        { q: "Is this area family-friendly?", a: "Yes — the park courtyard is spacious for children, and Raohe Night Market is popular with families." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 15. Tainan – Anping Old Fort
  // ═══════════════════════════════════════════════════════════════════
  "tainan-anping-old-fort-walk": {
    ja: ja(TW_JA_CTA,
      "安平古堡と旧市街の半日散策ガイド",
      "台南・安平でオランダ時代の古堡、ガジュマルに覆われたツリーハウス、老街のスナック通りを巡る半日ルート。",
      ANPING_IMAGES[0],
      ANPING_IMAGES,
      TAINAN_X,
      [
        { heading: "このルートの特徴", body: "安平は台南の西端に位置する歴史地区で、17世紀にオランダ東インド会社が築いたゼーランディア城（安平古堡）を中心に発展しました。赤レンガの城壁跡と白い灯台が残る古堡、ガジュマルの根に飲み込まれた倉庫「安平樹屋」、そしてエビせんべいや蜜餞（砂糖漬け果物）を売る安平老街が徒歩圏内にまとまっています。台南の歴史を肌で感じられるエリアです。" },
        { heading: "アクセスと起点", body: "台南駅前からバス2番で約30分、または台湾好行バス88・99番で安平古堡バス停下車。タクシーなら台南市中心部から15分ほど。安平古堡を起点にして、南の安平老街→安平樹屋→億載金城と回るのが効率的です。レンタサイクル（T-Bike）も利用可能です。" },
        { heading: "主要スポット", body: "安平古堡はオランダ統治時代の城壁遺構と日本時代に建てられた灯台が共存する史跡で、展示室では安平の400年の歴史を学べます。安平樹屋は旧イギリス商社の倉庫がガジュマルに覆われた幻想的な空間。安平老街では海老せんべい、豆花（豆腐プリン）、蝦巻きが人気の食べ歩きスナック。億載金城は清朝時代の砲台跡で、安平古堡とは異なる時代の軍事遺産です。" },
        { heading: "時間帯とタイミング", body: "安平古堡は8:30開門で、午前中は比較的空いています。安平老街は10時頃から賑わい始めます。暑い季節は午前中に史跡を回り、昼食後は老街の日陰で食べ歩きがおすすめ。夕方は安平港沿いで夕日が楽しめます。週末は観光バスが多く混雑します。" },
        { heading: "実用情報", body: "安平古堡の入場料は50元、安平樹屋は50元（共通券あり）。老街の屋台は現金が基本。トイレは各観光施設と老街に公共トイレがあります。台南は非常に暑い（特に5〜9月）ので、帽子と水は必須。安平エリアは平坦で自転車でも回りやすいです。" },
      ],
      [
        { q: "安平散策の所要時間は？", a: "古堡＋樹屋＋老街で3〜4時間。億載金城も含めると半日です。" },
        { q: "おすすめの食べ物は？", a: "安平老街のエビせんべい、蝦巻き、豆花が定番。蜜餞（砂糖漬け果物）はお土産にも。" },
        { q: "台南市中心部からの行き方は？", a: "バス2番で約30分、タクシーで15分。T-Bikeでも行けますが、暑い日は公共交通がおすすめ。" },
        { q: "赤崁楼と一緒に回れますか？", a: "赤崁楼は台南市中心部にあり、安平とは車で15分ほど。1日で両方回れます。" },
      ],
    ),
    en: en(TW_EN_CTA,
      "Anping Old Fort and Historic District Walking Guide in Tainan",
      "Half a day in Tainan's Anping district — the Dutch-era fort, a banyan-engulfed tree house, and a snack-filled old street with shrimp crackers and candied fruits.",
      ANPING_IMAGES[0],
      ANPING_IMAGES,
      TAINAN_X,
      [
        { heading: "What makes this route special", body: "Anping is Tainan's western historic district, developed around Fort Zeelandia — built by the Dutch East India Company in the 17th century. The fort's red-brick walls and a Japanese-era lighthouse still stand. Nearby, the Anping Tree House is a former British trading warehouse consumed by banyan roots. Anping Old Street sells shrimp crackers, tofu pudding, and candied fruits from shopfront stalls. The district condenses 400 years of Taiwanese history into a walkable half-day loop." },
        { heading: "Getting there and starting point", body: "Take bus number 2 from Tainan station (about 30 minutes), or Taiwan Tourist Shuttle bus 88 or 99 to the Anping Old Fort stop. A taxi from central Tainan takes around 15 minutes. Start at the fort and work south through the old street, then to the tree house and Eternal Golden Castle. T-Bike public bicycles are also available." },
        { heading: "Key stops along the way", body: "Anping Fort preserves Dutch-era wall foundations and a Japanese-built lighthouse, with an exhibition hall covering the district's history. The Anping Tree House is an atmospheric ruin of a warehouse with banyan roots growing through the roof and walls. Anping Old Street is a snack corridor — shrimp crackers, shrimp rolls, and tofu pudding are the staples. Eternal Golden Castle is a Qing-dynasty fortification at the harbour entrance." },
        { heading: "Best times and seasons", body: "The fort opens at 8:30 am and mornings are the quietest. Old Street picks up around 10 am. In hot months, visit the outdoor sites in the morning and eat along the shaded old street after lunch. The harbour side catches sunset light. Weekends bring tour buses and bigger crowds." },
        { heading: "Practical tips", body: "Fort admission is 50 TWD; Tree House is 50 TWD (combo tickets available). Old Street stalls are mostly cash-only. Restrooms are at each attraction and along the old street. Tainan is extremely hot from May to September — bring a hat and water. The area is flat and bikeable." },
      ],
      [
        { q: "How long does the Anping walk take?", a: "3 to 4 hours for the fort, tree house, and old street. Half a day including Eternal Golden Castle." },
        { q: "What should I eat?", a: "Shrimp crackers, shrimp rolls, and tofu pudding on Anping Old Street. Candied fruits make good souvenirs." },
        { q: "How do I get there from central Tainan?", a: "Bus 2 takes about 30 minutes. A taxi is 15 minutes. T-Bike works but is hot in summer." },
        { q: "Can I combine Anping with Chihkan Tower?", a: "Yes — Chihkan Tower is in central Tainan, about 15 minutes by car from Anping. Both fit comfortably in one day." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 16. Tainan – Shennong Street
  // ═══════════════════════════════════════════════════════════════════
  "tainan-shennong-street-walk": {
    ja: ja(TW_JA_CTA,
      "神農街とその周辺の歴史散策ガイド",
      "台南・西部の神農街で、ランタンに照らされたカラフルな街並み、大天后宮、海安路アートストリートを巡る歴史散策。",
      SHENNONG_IMAGES[0],
      SHENNONG_IMAGES,
      TAINAN_X,
      [
        { heading: "このルートの特徴", body: "神農街は台南の西市場エリアに位置する約200mの歴史的な通りで、清朝時代の商家が色鮮やかにリノベーションされ、赤いランタンが吊るされた雰囲気ある街並みが特徴です。夜にランタンが灯ると最も美しく、台南を代表するフォトスポットです。周辺には台湾最古の媽祖廟「大天后宮」、壁画アートが並ぶ海安路、そして赤崁楼も徒歩圏内で、台南の歴史と文化を凝縮した散策が楽しめます。" },
        { heading: "アクセスと起点", body: "台南駅からバスまたはタクシーで約10分。神農街は西門路と海安路の間にあります。赤崁楼から歩いて10分ほどなので、赤崁楼見学の後に立ち寄るルートがおすすめです。T-Bikeステーションも近くにあります。" },
        { heading: "主要スポット", body: "神農街自体がメインの見どころで、リノベーションされた古い商家にバー、ギャラリー、雑貨店が入っています。通りの奥にある薬王廟は街の名前の由来です。海安路は道路沿いに壁画やインスタレーションが並ぶアートストリート。大天后宮は1664年創建の台湾最古の媽祖廟で、細密な木彫り装飾が見事です。赤崁楼（プロビンティア城）はオランダ時代の要塞跡で、台南のランドマークです。" },
        { heading: "時間帯とタイミング", body: "神農街は日中も歩けますが、夕方以降にランタンが灯ってからが本番です。バーは19時頃から。大天后宮は6時〜21時。海安路のアートは24時間見られますが、夜のライトアップが映えます。週末の夜は人が多いですが、活気があって楽しいです。" },
        { heading: "実用情報", body: "神農街の店はカード対応の店と現金のみの店が混在。大天后宮は参拝無料。赤崁楼は入場料50元。トイレは赤崁楼と周辺の公共施設にあります。神農街は短い通りなので、周辺スポットと組み合わせて2〜3時間のプランにするのがおすすめです。台南の夜は比較的安全ですが、暗い路地では注意を。" },
      ],
      [
        { q: "神農街の所要時間は？", a: "神農街だけなら30分〜1時間。周辺スポット込みで2〜3時間です。" },
        { q: "ベストな訪問時間は？", a: "ランタンが灯る夕方〜夜がおすすめ。写真撮影は日没直後の薄暮の時間帯がベストです。" },
        { q: "赤崁楼と一緒に回れますか？", a: "はい。赤崁楼から神農街は徒歩10分で、セットで回るのが定番ルートです。" },
        { q: "台南駅からの行き方は？", a: "バスまたはタクシーで約10分。歩くと25分ほどですが、暑い日はタクシーが無難です。" },
        { q: "食事はどこで取れますか？", a: "神農街周辺のバーやカフェで軽食が取れます。台南名物の担仔麺や棺材板は赤崁楼周辺の食堂で。" },
      ],
    ),
    en: en(TW_EN_CTA,
      "Shennong Street and Historic West Tainan Walking Guide",
      "Walk lantern-lit Shennong Street after dark, visit Taiwan's oldest Mazu temple, and explore Hai'an Road's street art — Tainan's atmospheric evening route.",
      SHENNONG_IMAGES[0],
      SHENNONG_IMAGES,
      TAINAN_X,
      [
        { heading: "What makes this route special", body: "Shennong Street is a 200-metre lane of Qing-era merchant houses that have been colourfully restored and strung with red lanterns. After dark, the lanterns turn it into Tainan's most photographed street. The surrounding blocks hold the Grand Mazu Temple — Taiwan's oldest, founded in 1664 — and Hai'an Road, a former commercial strip reimagined as an open-air gallery of murals and installations. Chihkan Tower, the Dutch-era Fort Provintia, is a 10-minute walk away. Together they form a compact evening walk through 400 years of Tainan history." },
        { heading: "Getting there and starting point", body: "From Tainan station take a bus or taxi — about 10 minutes. Shennong Street sits between Ximen Road and Hai'an Road. A natural approach is to visit Chihkan Tower first and walk 10 minutes west to Shennong Street. T-Bike stations are nearby." },
        { heading: "Key stops along the way", body: "Shennong Street itself is the centrepiece — renovated shophouses host bars, galleries, and craft shops. The Yaowang Temple at the far end is the street's namesake. Hai'an Road runs parallel with murals and art installations along the roadside. The Grand Mazu Temple has extraordinarily detailed wood carvings and is free to enter. Chihkan Tower is the other major Dutch heritage site and Tainan's most recognisable landmark." },
        { heading: "Best times and seasons", body: "Shennong Street is walkable by day but comes alive when the lanterns light up at dusk. Bars open around 7 pm. The Grand Mazu Temple is open from 6 am to 9 pm. Hai'an Road's art is visible 24 hours but photographs best after dark with lighting. Weekend evenings are busy but atmospheric." },
        { heading: "Practical tips", body: "Shops on Shennong Street are a mix of card and cash-only. The Grand Mazu Temple is free. Chihkan Tower admission is 50 TWD. Restrooms are at Chihkan Tower and nearby public facilities. Shennong Street is short, so combine it with surrounding sites for a 2-to-3-hour evening plan. Tainan's evenings are generally safe but stay aware in darker side alleys." },
      ],
      [
        { q: "How long does the Shennong Street walk take?", a: "Shennong Street alone is 30 minutes to an hour. With surrounding sites allow 2 to 3 hours." },
        { q: "When is the best time to visit?", a: "Dusk to evening when the lanterns are lit. The best photography window is twilight just after sunset." },
        { q: "Can I combine it with Chihkan Tower?", a: "Yes — Chihkan Tower is a 10-minute walk from Shennong Street and they are commonly paired." },
        { q: "How do I get there from Tainan station?", a: "Bus or taxi in about 10 minutes. Walking takes roughly 25 minutes but a taxi is advisable in the heat." },
        { q: "Where can I eat nearby?", a: "Bars and cafes on Shennong Street serve light meals. For Tainan specialities like dan zai noodles and coffin bread, try the restaurants near Chihkan Tower." },
      ],
    ),
  },
};

export const KOREA_TAIWAN_GUIDE_SLUGS = Object.keys(KOREA_TAIWAN_GUIDE_CONTENT);
