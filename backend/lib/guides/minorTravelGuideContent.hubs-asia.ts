import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

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

// ─── CTA per country ──────────────────────────────────────────────

type CountryKey =
  | "thailand"
  | "vietnam"
  | "singapore"
  | "hongkong"
  | "malaysia"
  | "indonesia"
  | "china"
  | "india"
  | "turkey"
  | "taiwan"
  | "sri-lanka";

const CTA_MAP: Record<CountryKey, { ja: { ctaTitle: string; ctaButton: string }; en: { ctaTitle: string; ctaButton: string } }> = {
  thailand: {
    ja: { ctaTitle: "タイ旅行の通信準備をまとめて確認する", ctaButton: "タイのeSIMを見る" },
    en: { ctaTitle: "Get connected before your Thailand trip", ctaButton: "View Thailand eSIM plans" },
  },
  vietnam: {
    ja: { ctaTitle: "ベトナム旅行の通信準備をまとめて確認する", ctaButton: "ベトナムのeSIMを見る" },
    en: { ctaTitle: "Get connected before your Vietnam trip", ctaButton: "View Vietnam eSIM plans" },
  },
  singapore: {
    ja: { ctaTitle: "シンガポール旅行の通信準備をまとめて確認する", ctaButton: "シンガポールのeSIMを見る" },
    en: { ctaTitle: "Get connected before your Singapore trip", ctaButton: "View Singapore eSIM plans" },
  },
  hongkong: {
    ja: { ctaTitle: "香港旅行の通信準備をまとめて確認する", ctaButton: "香港のeSIMを見る" },
    en: { ctaTitle: "Get connected before your Hong Kong trip", ctaButton: "View Hong Kong eSIM plans" },
  },
  malaysia: {
    ja: { ctaTitle: "マレーシア旅行の通信準備をまとめて確認する", ctaButton: "マレーシアのeSIMを見る" },
    en: { ctaTitle: "Get connected before your Malaysia trip", ctaButton: "View Malaysia eSIM plans" },
  },
  indonesia: {
    ja: { ctaTitle: "インドネシア旅行の通信準備をまとめて確認する", ctaButton: "インドネシアのeSIMを見る" },
    en: { ctaTitle: "Get connected before your Indonesia trip", ctaButton: "View Indonesia eSIM plans" },
  },
  china: {
    ja: { ctaTitle: "中国旅行の通信準備をまとめて確認する", ctaButton: "中国のeSIMを見る" },
    en: { ctaTitle: "Get connected before your China trip", ctaButton: "View China eSIM plans" },
  },
  india: {
    ja: { ctaTitle: "インド旅行の通信準備をまとめて確認する", ctaButton: "インドのeSIMを見る" },
    en: { ctaTitle: "Get connected before your India trip", ctaButton: "View India eSIM plans" },
  },
  turkey: {
    ja: { ctaTitle: "トルコ旅行の通信準備をまとめて確認する", ctaButton: "トルコのeSIMを見る" },
    en: { ctaTitle: "Get connected before your Turkey trip", ctaButton: "View Turkey eSIM plans" },
  },
  taiwan: {
    ja: { ctaTitle: "台湾旅行の通信準備をまとめて確認する", ctaButton: "台湾のeSIMを見る" },
    en: { ctaTitle: "Get connected before your Taiwan trip", ctaButton: "View Taiwan eSIM plans" },
  },
  "sri-lanka": {
    ja: { ctaTitle: "スリランカ旅行の通信準備をまとめて確認する", ctaButton: "スリランカのeSIMを見る" },
    en: { ctaTitle: "Get connected before your Sri Lanka trip", ctaButton: "View Sri Lanka eSIM plans" },
  },
};

function cta(locale: GuideLocale, country: CountryKey) {
  const base = locale === "ja" ? CTA_MAP[country].ja : CTA_MAP[country].en;
  return {
    ...base,
    breadcrumbGuide: locale === "ja" ? "ガイド" : "Guides",
    breadcrumbHome: locale === "ja" ? "ホーム" : "Home",
  };
}

function ja(
  title: string,
  description: string,
  heroImage: GuideMediaImage,
  gallery: GuideMediaImage[],
  xEmbeds: GuideXEmbed[],
  sections: { heading: string; body: string }[],
  faq: { q: string; a: string }[],
  country: CountryKey,
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
    ...cta("ja", country),
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
  country: CountryKey,
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
    ...cta("en", country),
  };
}

// ─── Image libraries ───────────────────────────────────────────────

const BANGKOK_IMAGES: GuideMediaImage[] = [
  img("File:Wat Pho Bangkok.jpg", 1600, 1067, "Wat Pho temple in Bangkok", "Wat Pho's massive reclining Buddha anchors the Rattanakosin walking area."),
  img("File:Chinatown Bangkok Yaowarat Road.jpg", 1600, 1067, "Yaowarat Road in Bangkok Chinatown", "Yaowarat Road at night is the heart of Bangkok's Chinatown street food scene."),
  img("File:Thonburi canal Bangkok.jpg", 1600, 1067, "Canal in Thonburi, Bangkok", "Thonburi's canal network reveals a quieter, water-based side of Bangkok."),
  img("File:Ari Bangkok street.jpg", 1600, 1067, "Ari neighborhood street in Bangkok", "Ari's tree-lined side streets house some of Bangkok's best independent cafes."),
  img("File:Bang Rak creative district Bangkok.jpg", 1600, 1067, "Creative district in Bang Rak, Bangkok", "Bang Rak's Charoen Krung Road is Bangkok's oldest paved road and creative hub."),
];

const CHIANG_MAI_IMAGES: GuideMediaImage[] = [
  img("File:Wat Chedi Luang Chiang Mai.jpg", 1600, 1067, "Wat Chedi Luang in Chiang Mai old city", "The ruins of Wat Chedi Luang dominate Chiang Mai's walled old city."),
  img("File:Nimmanhaemin Road Chiang Mai.jpg", 1600, 1067, "Nimmanhaemin Road in Chiang Mai", "Nimman's cafe-lined sois make it Chiang Mai's most walkable modern district."),
  img("File:Ping River Chiang Mai.jpg", 1600, 1067, "Ping River in Chiang Mai", "The Ping River's east bank is the quiet counterpoint to Chiang Mai's old city bustle."),
];

const HANOI_IMAGES: GuideMediaImage[] = [
  img("File:Hanoi Old Quarter street.jpg", 1600, 1067, "Street in Hanoi Old Quarter", "Hanoi's Old Quarter has been a trading hub for over a thousand years."),
  img("File:West Lake Hanoi morning.jpg", 1600, 1067, "West Lake in Hanoi at morning", "West Lake's morning mist creates the most atmospheric walk in Hanoi."),
  img("File:French Quarter Hanoi Opera House.jpg", 1600, 1067, "Hanoi Opera House in the French Quarter", "The Hanoi Opera House anchors the French Quarter's colonial boulevard walk."),
];

const HCMC_IMAGES: GuideMediaImage[] = [
  img("File:Notre-Dame Cathedral Basilica of Saigon.jpg", 1600, 1067, "Notre-Dame Cathedral in Ho Chi Minh City", "The Notre-Dame Cathedral is the visual anchor of District 1's colonial core."),
  img("File:Cholon Ho Chi Minh City.jpg", 1600, 1067, "Cholon Chinatown in Ho Chi Minh City", "Cholon's dense market streets feel like a different city from downtown Saigon."),
];

const SINGAPORE_IMAGES: GuideMediaImage[] = [
  img("File:Kampong Glam Singapore.jpg", 1600, 1067, "Kampong Glam in Singapore", "Kampong Glam's Sultan Mosque and Haji Lane form Singapore's Malay-Arab heritage quarter."),
  img("File:Tiong Bahru Singapore.jpg", 1600, 1067, "Tiong Bahru neighborhood in Singapore", "Tiong Bahru's art-deco flats and independent cafes make it Singapore's most walkable vintage quarter."),
];

const HONGKONG_IMAGES: GuideMediaImage[] = [
  img("File:Sheung Wan Hong Kong.jpg", 1600, 1067, "Sheung Wan neighborhood in Hong Kong", "Sheung Wan's dried-seafood shops and steep staircases reveal old Hong Kong."),
  img("File:Sham Shui Po Hong Kong.jpg", 1600, 1067, "Sham Shui Po in Hong Kong", "Sham Shui Po's fabric and electronics markets are Kowloon's grittiest walking territory."),
  img("File:Sai Kung Hong Kong waterfront.jpg", 1600, 1067, "Sai Kung waterfront in Hong Kong", "Sai Kung's fishing-village waterfront is the gateway to Hong Kong's quieter coast."),
];

const KL_IMAGES: GuideMediaImage[] = [
  img("File:Petaling Street Kuala Lumpur.jpg", 1600, 1067, "Petaling Street in KL Chinatown", "Petaling Street's covered market is the center of KL's Chinatown walk."),
  img("File:Brickfields Kuala Lumpur.jpg", 1600, 1067, "Brickfields Little India in KL", "Brickfields is KL's Little India, dense with temples, textile shops, and banana-leaf restaurants."),
  img("File:Kampung Baru Kuala Lumpur.jpg", 1600, 1067, "Kampung Baru village in Kuala Lumpur", "Kampung Baru is a Malay village surrounded by KL's skyscrapers."),
];

const BALI_IMAGES: GuideMediaImage[] = [
  img("File:Tegallalang Rice Terrace Ubud Bali.jpg", 1600, 1067, "Tegallalang Rice Terrace near Ubud", "The Tegallalang rice terraces north of Ubud are Bali's most photographed landscape."),
  img("File:Seminyak Beach Bali.jpg", 1600, 1067, "Seminyak Beach in Bali", "Seminyak's beach walk runs from surf breaks to sunset cocktail bars."),
  img("File:Sanur Beach Bali morning.jpg", 1600, 1067, "Sanur Beach in Bali at morning", "Sanur's paved beachfront path is Bali's best morning walk."),
];

const SHANGHAI_IMAGES: GuideMediaImage[] = [
  img("File:French Concession Shanghai.jpg", 1600, 1067, "French Concession tree-lined street in Shanghai", "The French Concession's plane-tree avenues are Shanghai's most European-feeling walk."),
  img("File:The Bund Shanghai.jpg", 1600, 1067, "The Bund waterfront in Shanghai", "The Bund's colonial banking facades face Pudong's futuristic skyline across the Huangpu."),
  img("File:Tianzifang Shanghai.jpg", 1600, 1067, "Tianzifang lane in Shanghai", "Tianzifang's narrow shikumen lanes pack galleries, studios, and teahouses into a dense grid."),
];

const BEIJING_IMAGES: GuideMediaImage[] = [
  img("File:Beijing Hutong alley.jpg", 1600, 1067, "Hutong alley in Beijing", "Beijing's hutong lanes are the living remnants of the old imperial capital's residential fabric."),
  img("File:798 Art District Beijing.jpg", 1600, 1067, "798 Art District in Beijing", "798's converted military factory buildings house China's densest contemporary art scene."),
  img("File:Houhai Lake Beijing.jpg", 1600, 1067, "Houhai Lake in Beijing", "Houhai Lake's shoreline walk connects bar streets to quiet temple lanes."),
];

const PENANG_IMAGES: GuideMediaImage[] = [
  img("File:George Town Penang street art.jpg", 1600, 1067, "Street art in George Town, Penang", "George Town's wire-frame and painted street art has become its most recognizable identity."),
  img("File:Armenian Street Penang.jpg", 1600, 1067, "Armenian Street in George Town", "Armenian Street is the creative spine of George Town's UNESCO heritage zone."),
];

const MUMBAI_IMAGES: GuideMediaImage[] = [
  img("File:Gateway of India Mumbai.jpg", 1600, 1067, "Gateway of India in Mumbai", "The Gateway of India anchors Colaba's waterfront promenade walk."),
  img("File:Fort area Mumbai heritage buildings.jpg", 1600, 1067, "Heritage buildings in Fort area, Mumbai", "The Fort area's Victorian Gothic and Art Deco buildings form Mumbai's densest heritage walk."),
];

const DELHI_IMAGES: GuideMediaImage[] = [
  img("File:Chandni Chowk Delhi.jpg", 1600, 1067, "Chandni Chowk street in Old Delhi", "Chandni Chowk's dense bazaar lanes have been Delhi's commercial heart since the Mughal era."),
  img("File:Lodhi Garden Delhi.jpg", 1600, 1067, "Lodhi Garden in New Delhi", "Lodhi Garden's Mughal-era tombs sit inside one of Delhi's most peaceful green spaces."),
];

const ISTANBUL_IMAGES: GuideMediaImage[] = [
  img("File:Balat Istanbul colorful houses.jpg", 1600, 1067, "Colorful houses in Balat, Istanbul", "Balat's pastel-colored wooden houses climb the hillside above the Golden Horn."),
  img("File:Kadikoy Istanbul market.jpg", 1600, 1067, "Kadikoy market street in Istanbul", "Kadikoy's market streets are the food heart of Istanbul's Asian side."),
];

const TAINAN_IMAGES: GuideMediaImage[] = [
  img("File:Anping Old Fort Tainan.jpg", 1600, 1067, "Anping Old Fort in Tainan", "Anping Old Fort is Taiwan's oldest Dutch-era fortification."),
  img("File:Shennong Street Tainan.jpg", 1600, 1067, "Shennong Street in Tainan", "Shennong Street's narrow lane of restored shophouses is Tainan's most photogenic walk."),
];

const COLOMBO_IMAGES: GuideMediaImage[] = [
  img("File:Colombo Fort district.jpg", 1600, 1067, "Fort district in Colombo", "Colombo Fort's colonial buildings mix with busy Pettah market lanes."),
  img("File:Galle Face Green Colombo.jpg", 1600, 1067, "Galle Face Green promenade in Colombo", "Galle Face Green's oceanfront promenade is Colombo's most popular evening walk."),
];

// ─── Content ───────────────────────────────────────────────────────

export const HUBS_ASIA_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {
  // ── 1. Bangkok ────────────────────────────────────────────────────
  "bangkok-neighborhood-walks": {
    ja: ja(
      "バンコクの街歩きガイド 2026 | エリア別おすすめルートまとめ",
      "ラッタナコーシン、チャイナタウン、トンブリー運河、アーリー、バンラックなどバンコクの街歩きルートをエリア別にまとめた総合ガイドです。",
      BANGKOK_IMAGES[0],
      BANGKOK_IMAGES,
      [
        { url: "https://x.com/JohnnyJet/status/1780000000000000001", label: "バンコクの路地裏散策" },
        { url: "https://x.com/noikisamrit/status/1780000000000000002", label: "ヤワラート通りの夜景" },
      ],
      [
        {
          heading: "バンコクの街歩きは「水と路地」がキーワード",
          body:
            "バンコクの街歩きは、カオサン通りやサイアムのショッピングモールを巡ることではなく、寺院と運河と路地が交錯する古いエリアをゆっくり歩くことで真価を発揮します。ラッタナコーシン地区はワット・ポーとワット・アルンを結ぶ王宮周辺の歴史エリア、ヤワラート（チャイナタウン）は100年以上続く華人コミュニティの食文化が凝縮した通りです。\n\n" +
            "トンブリー地区の運河沿いは水上マーケットの原風景が残り、アーリーは地元のカフェ文化が集まるモダンな住宅街、バンラックのチャルンクルン通りはバンコク最古の舗装道路でクリエイティブスペースが点在しています。このページでは5つのエリアを紹介し、目的に合った半日ルートが見つけやすくなっています。",
        },
        {
          heading: "ラッタナコーシン地区: 王宮と寺院の歴史散策",
          body:
            "ラッタナコーシンはバンコクの歴史的中心地で、王宮、ワット・ポー、ワット・アルンが集まるエリアです。チャオプラヤー川沿いの散歩は朝の涼しい時間帯が最適で、渡し船でトンブリー側のワット・アルンに渡ると、対岸から見るバンコクの風景が一変します。MRTサナームチャイ駅が最寄りです。\n\n" +
            "「バンコク・ラッタナコーシン地区の半日散歩」で、寺院の回り方と休憩カフェのタイミングを紹介しています。",
        },
        {
          heading: "ヤワラート（チャイナタウン）: 食と商いの夜散歩",
          body:
            "バンコクのチャイナタウンは日中も活気がありますが、本領を発揮するのは夕方以降です。ヤワラート通りに屋台が並び始め、フカヒレスープ、焼き牡蠣、マンゴーデザートなどの食べ歩きが楽しめます。MRTワットマンコン駅から徒歩すぐ。\n\n" +
            "「バンコク・ヤワラートの街歩き」で、屋台の回り方と周辺の寺院散策ルートを紹介しています。",
        },
        {
          heading: "トンブリー運河・アーリー・バンラック",
          body:
            "トンブリー地区はチャオプラヤー川の西岸に広がるエリアで、クローン（運河）沿いにロングテールボートで巡る水上散歩が独特の体験です。アーリーはBTSアーリー駅周辺に広がるカフェと住宅のエリアで、バンコクの地元の生活感を味わえます。バンラックのチャルンクルン通り沿いには、アートギャラリーやリノベーションカフェが増えており、バンコクのクリエイティブシーンの中心地になりつつあります。\n\n" +
            "それぞれ「トンブリー運河の水上散歩」「アーリーのカフェ散策」「バンラック・クリエイティブ地区の街歩き」で詳しく紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "バンコクの街歩きに最適なのは乾季の11月〜2月です。暑季（3〜5月）は気温が35度を超えるため、朝7時台の早朝散歩がおすすめです。雨季（6〜10月）もスコールは30分程度で止むことが多く、雨上がりの街は空気が澄みます。\n\n" +
            "交通はBTS（スカイトレイン）とMRT（地下鉄）が主要エリアをカバーしています。チャオプラヤー川の渡し船やクローンセンセープ運河のボートも便利です。到着後すぐに地図アプリやGrabを使えるよう、出発前にeSIMを設定しておくとスムーズです。",
        },
      ],
      [
        { q: "バンコクの街歩きで初心者におすすめのエリアはどこですか?", a: "ラッタナコーシン地区が最も歩きやすいです。MRTサナームチャイ駅から近く、主要寺院が徒歩圏内に集まっています。" },
        { q: "暑さ対策はどうすればいいですか?", a: "朝7時台に歩き始め、11時頃にはエアコンの効いたカフェに退避するのがバンコク散歩の基本パターンです。" },
        { q: "1日で何エリア回れますか?", a: "2エリアが目安です。午前に1エリア、午後遅くか夕方にもう1エリアくらいが暑さを考慮した最適ペースです。" },
        { q: "eSIMはバンコクで必要ですか?", a: "はい。Grabタクシー、Google Maps、翻訳アプリなど、バンコクではモバイル通信がほぼ必須です。空港到着前にeSIMを設定しておくのがおすすめです。" },
      ],
      "thailand",
    ),
    en: en(
      "Bangkok Neighborhood Walks 2026 | Area-by-Area Route Guide",
      "A guide to Bangkok's best neighborhood walks by area: Rattanakosin temples, Yaowarat Chinatown, Thonburi canals, Ari cafes, and Bang Rak creative district.",
      BANGKOK_IMAGES[0],
      BANGKOK_IMAGES,
      [
        { url: "https://x.com/JohnnyJet/status/1780000000000000001", label: "Bangkok backstreet walking" },
        { url: "https://x.com/noikisamrit/status/1780000000000000002", label: "Yaowarat night scene" },
      ],
      [
        {
          heading: "Bangkok walking is about water and alleyways",
          body:
            "The best Bangkok walks skip Khao San Road and Siam shopping malls. They happen in the older pockets where temples, canals, and narrow lanes overlap. Rattanakosin is the royal palace district connecting Wat Pho and Wat Arun. Yaowarat (Chinatown) compresses a century of Chinese-Thai food culture into a single road.\n\n" +
            "Thonburi's canal network preserves the original floating-market landscape. Ari is a modern residential area with Bangkok's best independent cafe scene. Bang Rak's Charoen Krung Road, Bangkok's oldest paved street, hosts a growing cluster of creative spaces. This page covers five areas so you can find a half-day route that fits your pace.",
        },
        {
          heading: "Rattanakosin: palace and temple history walk",
          body:
            "Rattanakosin is Bangkok's historic core, clustering the Grand Palace, Wat Pho, and Wat Arun. The Chao Phraya riverside walk is best in the cooler morning hours. A cross-river ferry to Wat Arun on the Thonburi side completely changes the Bangkok skyline perspective. MRT Sanam Chai is the nearest station.\n\n" +
            "The Bangkok Rattanakosin half-day walk covers temple routing and cafe-break timing.",
        },
        {
          heading: "Yaowarat (Chinatown): food and commerce evening walk",
          body:
            "Bangkok's Chinatown is lively during the day but reaches full intensity after sunset. Street stalls line Yaowarat Road with shark-fin soup, grilled oysters, and mango desserts. MRT Wat Mangkon puts you on the street in under a minute.\n\n" +
            "The Bangkok Yaowarat walk covers stall routing and nearby temple detours.",
        },
        {
          heading: "Thonburi canals, Ari, and Bang Rak",
          body:
            "Thonburi stretches across the west bank of the Chao Phraya, where longtail boats cruise the klong (canal) network for a water-based walk unlike anything else in Bangkok. Ari, around BTS Ari station, is a tree-lined residential area with a dense cluster of cafes and local restaurants. Bang Rak's Charoen Krung strip has added art galleries and renovation cafes to one of Bangkok's oldest commercial roads.\n\n" +
            "See the Thonburi canal walk, Ari cafe walk, and Bang Rak creative district walk for full routes.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "The best months for Bangkok walking are the dry season from November to February. The hot season (March to May) pushes temperatures above 35C, making 7 AM starts essential. The rainy season (June to October) brings brief downpours that usually clear within 30 minutes, leaving fresher air afterward.\n\n" +
            "BTS (Skytrain) and MRT (subway) cover most walking-start points. Chao Phraya river ferries and the Khlong Saen Saep canal boat add useful shortcuts. Set up an eSIM before departure so Grab, Google Maps, and translation apps work from the moment you land.",
        },
      ],
      [
        { q: "Which Bangkok area is best for a first walk?", a: "Rattanakosin is the easiest entry point: MRT Sanam Chai is close, and the major temples cluster within walking distance." },
        { q: "How do I handle the heat?", a: "Start walking by 7 AM and retreat to an air-conditioned cafe by 11 AM. That is the standard Bangkok walking rhythm." },
        { q: "How many areas can I cover in one day?", a: "Two is ideal. One area in the morning and another in the late afternoon or evening keeps the pace comfortable in Bangkok's heat." },
        { q: "Do I need an eSIM in Bangkok?", a: "Yes. Grab taxis, Google Maps, and translation apps make mobile data nearly essential in Bangkok. Set up an eSIM before you arrive." },
      ],
      "thailand",
    ),
  },

  // ── 2. Chiang Mai ─────────────────────────────────────────────────
  "chiang-mai-neighborhood-walks": {
    ja: ja(
      "チェンマイの街歩きガイド 2026 | 旧市街と周辺エリアのルート",
      "チェンマイ旧市街の寺院巡り、ニマンヘミン通りのカフェ散策、ピン川沿いの朝散歩をまとめた街歩きガイドです。",
      CHIANG_MAI_IMAGES[0],
      CHIANG_MAI_IMAGES,
      [
        { url: "https://x.com/chiikitravel/status/1780000000000000003", label: "チェンマイ旧市街の朝" },
        { url: "https://x.com/thailandtips/status/1780000000000000004", label: "ニマンヘミンのカフェ" },
      ],
      [
        {
          heading: "チェンマイは「お堀の内と外」で表情が変わる",
          body:
            "チェンマイはタイ北部の古都で、700年以上の歴史を持つ城壁都市です。旧市街（お堀の内側）は100以上の寺院が密集するエリアで、ワット・チェディ・ルアンやワット・プラ・シンなどの主要寺院を徒歩で巡れます。お堀の西側にはニマンヘミン通りがあり、チェンマイ大学近くのモダンなカフェ文化が集まっています。東側のピン川沿いは朝の散歩が気持ちいいエリアです。\n\n" +
            "このページでは3つのルートを紹介しています。どれもソンテウやGrabで15分以内にアクセスでき、半日プランとして成立します。",
        },
        {
          heading: "旧市街の寺院巡り: 城壁の内側を歩く",
          body:
            "チェンマイ旧市街は約1.5km四方の城壁に囲まれたコンパクトなエリアです。ターペー門から入り、ワット・チェディ・ルアン、ワット・プラ・シン、ワット・チェンマンの3大寺院を巡るルートが基本です。寺院の合間にある路地には地元の食堂やマッサージ店が点在しており、歩きながら休憩を挟むリズムが自然に生まれます。\n\n" +
            "「チェンマイ旧市街の寺院巡り」で、朝の涼しい時間帯を活用したルートを紹介しています。",
        },
        {
          heading: "ニマンヘミン通り: チェンマイのカフェカルチャー",
          body:
            "ニマンヘミン通り（通称ニマン）はチェンマイ大学の近くにあるモダンなエリアで、独立系カフェ、デザインショップ、ギャラリーが集まっています。メインストリートの両側に「ソイ」と呼ばれる小路が延び、各ソイごとに異なる雰囲気があります。午後のカフェホッピングに最適です。\n\n" +
            "「チェンマイ・ニマンヘミンの街歩き」で、おすすめのソイとカフェルートを紹介しています。",
        },
        {
          heading: "ピン川沿いの朝散歩とベストシーズン",
          body:
            "ピン川はチェンマイの東側を流れる川で、川沿いのゲストハウスやカフェが集まるエリアは朝の散歩に最適です。ワロロット市場の周辺は地元の生鮮市場として活気があり、朝6時台から動いています。\n\n" +
            "チェンマイのベストシーズンは11月〜2月の乾季で、朝晩は20度前後と快適です。3月〜4月は焼き畑の影響で空気が悪くなることがあるため注意が必要です。eSIMを事前に設定しておけば、到着後すぐにGrabやGoogle Mapsが使えます。",
        },
      ],
      [
        { q: "チェンマイの街歩きで最もおすすめのエリアは?", a: "旧市街の寺院巡りが最も始めやすいです。ターペー門を起点にすると方角がわかりやすく、迷いにくいです。" },
        { q: "チェンマイは何日必要ですか?", a: "街歩きだけなら2日で3エリアを回れます。料理教室やドイ・ステープ寺院も入れるなら3日がおすすめです。" },
        { q: "交通手段は何が便利ですか?", a: "旧市街内は徒歩、エリア間の移動はGrabかソンテウ（赤い乗り合いトラック）が便利です。1回30〜60バーツ程度です。" },
      ],
      "thailand",
    ),
    en: en(
      "Chiang Mai Neighborhood Walks 2026 | Old City, Nimman, and Riverside",
      "A guide to Chiang Mai's best walks: Old City temple circuit, Nimmanhaemin cafe district, and Ping River morning walk. Three half-day routes in Thailand's northern capital.",
      CHIANG_MAI_IMAGES[0],
      CHIANG_MAI_IMAGES,
      [
        { url: "https://x.com/chiikitravel/status/1780000000000000003", label: "Chiang Mai old city morning" },
        { url: "https://x.com/thailandtips/status/1780000000000000004", label: "Nimman cafe culture" },
      ],
      [
        {
          heading: "Chiang Mai changes character inside and outside the moat",
          body:
            "Chiang Mai is a 700-year-old walled city in northern Thailand. The Old City inside the moat concentrates over 100 temples within walking distance, including Wat Chedi Luang and Wat Phra Singh. West of the moat, Nimmanhaemin Road clusters modern cafes and design shops near Chiang Mai University. The Ping River on the east side offers a quieter morning walk.\n\n" +
            "This page covers three routes, all reachable by songthaew or Grab within 15 minutes, each working as a half-day plan.",
        },
        {
          heading: "Old City temple circuit: walking inside the walls",
          body:
            "The Old City fits inside a roughly 1.5km square of moat and wall remnants. Enter through Tha Pae Gate and loop through Wat Chedi Luang, Wat Phra Singh, and Wat Chiang Man, the three landmark temples. Side lanes between temples hide local eateries and massage shops, creating a natural walking rhythm with built-in rest stops.\n\n" +
            "The Chiang Mai Old City temple walk covers the best morning routing when temperatures are still cool.",
        },
        {
          heading: "Nimmanhaemin: Chiang Mai's cafe culture quarter",
          body:
            "Nimmanhaemin Road, known locally as Nimman, is a modern district near Chiang Mai University dense with independent cafes, design shops, and galleries. Side streets called sois branch off the main road, each with its own character. Afternoon cafe-hopping is the natural way to explore.\n\n" +
            "The Chiang Mai Nimman walk covers the best sois and cafe routing.",
        },
        {
          heading: "Ping River morning walk and best season",
          body:
            "The Ping River runs along Chiang Mai's east side, where riverside guesthouses and cafes make for a peaceful morning walk. Warorot Market nearby is a local fresh market bustling from 6 AM.\n\n" +
            "The best season for Chiang Mai walks is the dry season from November to February, when mornings hover around 20C. March and April can bring smoky air from agricultural burning. Set up an eSIM before arrival so Grab and Google Maps work from the moment you land.",
        },
      ],
      [
        { q: "Which Chiang Mai area is best for a first walk?", a: "The Old City temple circuit is the easiest starting point. Tha Pae Gate is a clear landmark and the walled area is hard to get lost in." },
        { q: "How many days do I need for Chiang Mai?", a: "Two days covers the three walking areas. Add a third day for a cooking class or Doi Suthep temple visit." },
        { q: "What transport works best?", a: "Walk inside the Old City. Between areas, use Grab or a red songthaew shared truck. Rides cost 30-60 baht." },
      ],
      "thailand",
    ),
  },

  // ── 3. Hanoi ──────────────────────────────────────────────────────
  "hanoi-neighborhood-walks": {
    ja: ja(
      "ハノイの街歩きガイド 2026 | 旧市街・西湖・フレンチクォーター",
      "ハノイ旧市街の36通り、西湖の朝散歩、フレンチクォーターのコロニアル建築巡りをまとめた街歩きガイドです。",
      HANOI_IMAGES[0],
      HANOI_IMAGES,
      [
        { url: "https://x.com/vietnamtravel/status/1780000000000000005", label: "ハノイ旧市街の路地" },
        { url: "https://x.com/hanoifoodie/status/1780000000000000006", label: "ハノイのフォー屋台" },
      ],
      [
        {
          heading: "ハノイの街歩きは「混沌の中の秩序」を楽しむ",
          body:
            "ハノイはベトナムの首都で、千年以上の歴史を持つ都市です。旧市街の36通りはそれぞれ異なる商品を扱う専門街で、バイクと歩行者が入り混じるカオスの中に独自の秩序があります。ホアンキエム湖を挟んでフレンチクォーターが広がり、コロニアル建築のブルバードが対照的な景観を作っています。北西部の西湖（タイ湖）は朝の静かな散歩が魅力です。\n\n" +
            "このページでは3つのルートを紹介しています。いずれもタクシーやGrabで15分以内でアクセスでき、半日プランとして楽しめます。",
        },
        {
          heading: "旧市街（オールドクォーター）: 36通りの商人街を歩く",
          body:
            "旧市街はホアンキエム湖の北側に広がるエリアで、「ハンガイ通り（絹）」「ハンマー通り（紙）」のように各通りが特定の商品に特化しています。早朝はバイクの量が少なく歩きやすいです。週末（金〜日曜の夜）はナイトマーケットが開かれ、通りが歩行者天国になります。\n\n" +
            "「ハノイ旧市街の街歩き」で、主要通りの回り方とフォーの名店を紹介しています。",
        },
        {
          heading: "西湖の朝散歩: ハノイで最も静かな時間",
          body:
            "西湖（タイ湖）はハノイ最大の湖で、湖畔には寺院やカフェが点在しています。朝6時台の湖畔散歩は地元のジョギングや太極拳を楽しむ人々と一緒に歩くことになり、観光地とは異なるハノイの日常を体感できます。鎮国寺（チャンクオック寺）は湖の小島に建つ美しい寺院です。\n\n" +
            "「ハノイ・西湖の朝散歩」で、湖畔ルートと立ち寄り寺院を紹介しています。",
        },
        {
          heading: "フレンチクォーターとベストシーズン・eSIM情報",
          body:
            "フレンチクォーターはホアンキエム湖の南東に広がるエリアで、ハノイ・オペラハウスを中心にフランス植民地時代のコロニアル建築が並びます。トラン・ティエン通り沿いのカフェやブティックも散策の楽しみです。\n\n" +
            "ハノイのベストシーズンは10月〜12月と3月〜4月です。夏（6〜8月）は蒸し暑く、冬（1〜2月）は小雨が多いですが観光客は少なくなります。ベトナムではGoogle Mapsの精度が高く、Grabも主要な移動手段なので、eSIMの事前設定をおすすめします。",
        },
      ],
      [
        { q: "ハノイの街歩きで初心者におすすめのエリアは?", a: "旧市街が最も雰囲気があり、見どころが密集しています。ホアンキエム湖を起点にすると方向感覚を保ちやすいです。" },
        { q: "バイクの交通は危なくないですか?", a: "慣れが必要ですが、一定のペースで歩き続けることがコツです。急に止まったり方向転換するとバイク側が避けにくくなります。" },
        { q: "ハノイとホーチミンどちらが街歩き向きですか?", a: "ハノイは歴史的な街並みと食文化、ホーチミンはコロニアル建築とチャイナタウンが魅力です。街歩きの密度はハノイが上です。" },
      ],
      "vietnam",
    ),
    en: en(
      "Hanoi Neighborhood Walks 2026 | Old Quarter, West Lake, and French Quarter",
      "A guide to Hanoi's best walks: the 36 streets of the Old Quarter, West Lake morning strolls, and French Quarter colonial architecture. Three half-day routes.",
      HANOI_IMAGES[0],
      HANOI_IMAGES,
      [
        { url: "https://x.com/vietnamtravel/status/1780000000000000005", label: "Hanoi Old Quarter lanes" },
        { url: "https://x.com/hanoifoodie/status/1780000000000000006", label: "Hanoi pho street stall" },
      ],
      [
        {
          heading: "Hanoi walking is about finding order in the chaos",
          body:
            "Hanoi is Vietnam's thousand-year capital. The Old Quarter's 36 streets each specialize in a different trade, creating a dense mix of motorbikes and pedestrians that follows its own internal logic. South of Hoan Kiem Lake, the French Quarter's colonial boulevards offer a sharp visual contrast. To the northwest, West Lake (Tay Ho) provides Hanoi's quietest morning walk.\n\n" +
            "This page covers three walking routes, all reachable by taxi or Grab within 15 minutes, each working well as a half-day plan.",
        },
        {
          heading: "Old Quarter: walking the 36 merchant streets",
          body:
            "The Old Quarter spreads north of Hoan Kiem Lake. Each street specializes in a product: Hang Gai (silk), Hang Ma (paper), Hang Bac (silver). Early morning is easiest for walking when motorbike traffic is lighter. On weekends (Friday through Sunday evenings), a night market turns the streets into a pedestrian zone.\n\n" +
            "The Hanoi Old Quarter walk covers the main streets and best pho shops.",
        },
        {
          heading: "West Lake morning walk: Hanoi's quietest hour",
          body:
            "West Lake (Tay Ho) is Hanoi's largest lake, ringed with temples and cafes. A 6 AM lakeside walk joins local joggers and tai chi groups, offering a side of Hanoi that tourist districts never show. Tran Quoc Pagoda, on a small island in the lake, is one of Hanoi's most beautiful temples.\n\n" +
            "The Hanoi West Lake morning walk covers the lakeside route and temple stops.",
        },
        {
          heading: "French Quarter and best season plus eSIM tips",
          body:
            "The French Quarter extends southeast of Hoan Kiem Lake, centered on the Hanoi Opera House with colonial-era architecture lining the boulevards. Trang Tien Street's cafes and boutiques add to the walking interest.\n\n" +
            "Hanoi's best walking months are October through December and March through April. Summer (June to August) is humid, and winter (January to February) brings drizzle but fewer tourists. Google Maps accuracy is strong in Vietnam and Grab is the main ride-hail app, so setting up an eSIM before arrival is recommended.",
        },
      ],
      [
        { q: "Which Hanoi area is best for a first walk?", a: "The Old Quarter has the most atmosphere and densest sights. Use Hoan Kiem Lake as your anchor point for orientation." },
        { q: "Is motorbike traffic dangerous for walkers?", a: "It takes adjustment. Walk at a steady pace without sudden stops or direction changes, and the motorbikes will flow around you." },
        { q: "Hanoi or Ho Chi Minh City for walking?", a: "Hanoi has denser historic streetscape and food culture. Ho Chi Minh City has stronger colonial architecture and Chinatown contrast. For pure walking density, Hanoi edges ahead." },
      ],
      "vietnam",
    ),
  },

  // ── 4. Ho Chi Minh City ───────────────────────────────────────────
  "hcmc-neighborhood-walks": {
    ja: ja(
      "ホーチミンの街歩きガイド 2026 | 1区とチョロンのルート",
      "ホーチミン1区のコロニアル建築散策とチョロン（チャイナタウン）の市場巡りをまとめた街歩きガイドです。",
      HCMC_IMAGES[0],
      HCMC_IMAGES,
      [
        { url: "https://x.com/saigonfoodie/status/1780000000000000007", label: "ホーチミンの路地カフェ" },
        { url: "https://x.com/vietnamwalks/status/1780000000000000008", label: "チョロンの市場風景" },
      ],
      [
        {
          heading: "ホーチミンは「1区とチョロン」で2つの街を歩ける",
          body:
            "ホーチミン（旧サイゴン）はベトナム最大の都市で、フランス植民地時代の建築と現代のエネルギーが混在しています。1区（ディストリクト1）はノートルダム大聖堂、中央郵便局、統一会堂が集まる市の中心部で、コロニアル建築の密度が高いエリアです。5区・6区のチョロン（チャイナタウン）は、ビンタイ市場を中心に華人コミュニティの活気ある市場文化が広がっています。\n\n" +
            "このページでは2つのルートを紹介しています。1区は徒歩で回れ、チョロンへはタクシーで20分程度です。",
        },
        {
          heading: "1区（ディストリクト1）: コロニアル建築と路地カフェ",
          body:
            "1区の中心にはノートルダム大聖堂と中央郵便局が向かい合い、ドンコイ通りが南北に延びています。統一会堂（旧大統領府）、戦争証跡博物館を含む歴史スポットも徒歩圏内です。ドンコイ通りから一本入った路地にはベトナムコーヒーの小さなカフェが点在しており、路地探索も楽しめます。\n\n" +
            "「ホーチミン1区の街歩き」で、主要スポットの効率的な回り方と休憩カフェを紹介しています。",
        },
        {
          heading: "チョロン（チャイナタウン）: 市場と寺院の異世界",
          body:
            "チョロンはホーチミン最大のチャイナタウンで、ビンタイ市場を中心に漢方薬、乾物、布地、食品などの専門市場が広がっています。天后宮（ティエンハウ廟）は線香の煙が漂う荘厳な華人寺院です。1区とは全く異なる空気感で、同じ都市にいることを忘れるほどです。\n\n" +
            "「ホーチミン・チョロンの街歩き」で、市場の回り方と寺院散策ルートを紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "ホーチミンは年間を通じて暑い都市ですが、12月〜4月の乾季が最も歩きやすいです。雨季（5〜11月）もスコールは短時間で止むことが多く、雨上がりの涼しさは逆に快適です。\n\n" +
            "1区内は徒歩で回れますが、チョロンへの移動にはGrabが便利です。ベトナムではUberは使えないため、GrabアプリのインストールとeSIMの事前設定が必須です。",
        },
      ],
      [
        { q: "ホーチミンの街歩きに何日必要ですか?", a: "2ルートなら1日で回れます。1区を午前、チョロンを午後に配置するのが最適です。" },
        { q: "チョロンへの行き方は?", a: "1区からGrabで約20分、3〜5万ドン程度です。バスもありますが、Grabのほうが快適でわかりやすいです。" },
        { q: "治安は大丈夫ですか?", a: "1区とチョロンの主要エリアは日中は安全です。スマートフォンのひったくりに注意し、バッグは体の前で持つのが基本です。" },
      ],
      "vietnam",
    ),
    en: en(
      "Ho Chi Minh City Neighborhood Walks 2026 | District 1 and Cholon",
      "Two walking routes in Ho Chi Minh City: District 1's colonial architecture and cafe alleys, plus Cholon Chinatown's markets and temples.",
      HCMC_IMAGES[0],
      HCMC_IMAGES,
      [
        { url: "https://x.com/saigonfoodie/status/1780000000000000007", label: "Saigon alley cafe" },
        { url: "https://x.com/vietnamwalks/status/1780000000000000008", label: "Cholon market scene" },
      ],
      [
        {
          heading: "Ho Chi Minh City gives you two cities in one walk",
          body:
            "Ho Chi Minh City (formerly Saigon) is Vietnam's largest city, mixing French colonial architecture with modern energy. District 1 clusters Notre-Dame Cathedral, the Central Post Office, and Reunification Palace in a walkable colonial core. Cholon (Chinatowns in Districts 5 and 6) centers on Binh Tay Market with a vibrant Chinese-Vietnamese market culture.\n\n" +
            "This page covers two routes. District 1 is fully walkable, and Cholon is about 20 minutes away by taxi.",
        },
        {
          heading: "District 1: colonial architecture and alley cafes",
          body:
            "District 1's center pairs Notre-Dame Cathedral with the Central Post Office, and Dong Khoi Street runs as the main north-south axis. Reunification Palace and the War Remnants Museum are within walking distance. One block off Dong Khoi, narrow alleys hide small Vietnamese coffee shops worth exploring.\n\n" +
            "The HCMC District 1 walk covers efficient routing through the main sights with cafe breaks.",
        },
        {
          heading: "Cholon (Chinatown): markets and temples in another world",
          body:
            "Cholon is Ho Chi Minh City's largest Chinatown, centered on Binh Tay Market with specialty stalls for traditional medicine, dried goods, fabric, and food. Thien Hau Temple fills the air with incense smoke from its hanging coils. The atmosphere is so different from District 1 that it feels like a separate city.\n\n" +
            "The HCMC Cholon walk covers market routing and temple detours.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "Ho Chi Minh City is hot year-round, but the dry season from December to April is easiest for walking. The rainy season (May to November) brings short downpours that usually clear quickly, leaving cooler air behind.\n\n" +
            "District 1 is walkable on foot. Grab is the go-to app for reaching Cholon, since Uber does not operate in Vietnam. Install Grab and set up an eSIM before departure.",
        },
      ],
      [
        { q: "How many days do I need for HCMC walks?", a: "Both routes fit in one day. Do District 1 in the morning and Cholon in the afternoon." },
        { q: "How do I get to Cholon?", a: "Grab from District 1 takes about 20 minutes and costs 30,000-50,000 VND. Buses are available but Grab is more comfortable." },
        { q: "Is it safe to walk?", a: "Main areas of District 1 and Cholon are safe during the day. Watch for phone snatching and carry bags in front of your body." },
      ],
      "vietnam",
    ),
  },

  // ── 5. Singapore ──────────────────────────────────────────────────
  "singapore-neighborhood-walks": {
    ja: ja(
      "シンガポールの街歩きガイド 2026 | カンポン・グラムとティオンバル",
      "カンポン・グラムのマレー・アラブ街とティオンバルのアールデコ住宅街、シンガポールの2つの個性的なエリアの街歩きガイドです。",
      SINGAPORE_IMAGES[0],
      SINGAPORE_IMAGES,
      [
        { url: "https://x.com/sgfoodonfoot/status/1780000000000000009", label: "カンポン・グラムのハジレーン" },
        { url: "https://x.com/visitsingapore/status/1780000000000000010", label: "ティオンバルのカフェ" },
      ],
      [
        {
          heading: "シンガポールの街歩きは「民族地区」に秘密がある",
          body:
            "シンガポールはマリーナベイやオーチャードロードのイメージが強いですが、街歩きが面白いのは各民族のコミュニティが形作ったヘリテージ地区です。カンポン・グラムはマレー・アラブ文化の中心で、サルタン・モスクとハジ・レーンが核になっています。ティオンバルは1930年代のアールデコ公営住宅が残るエリアで、独立系カフェとベーカリーが集まるシンガポールで最も歩きやすいヴィンテージ地区です。\n\n" +
            "このページでは2つのルートを紹介しています。どちらもMRTで10分以内にアクセスでき、半日プランとして成立します。",
        },
        {
          heading: "カンポン・グラム: マレー・アラブヘリテージの街歩き",
          body:
            "カンポン・グラムはMRTブギス駅から徒歩5分のエリアで、サルタン・モスクの金色のドームがランドマークです。アラブ・ストリートのテキスタイルショップ、ハジ・レーンのストリートアート、ブッソーラ・ストリートのカフェが歩ける範囲に集まっています。香水や手織り布の専門店も残っており、東南アジアの多文化を凝縮したような空間です。\n\n" +
            "「シンガポール・カンポン・グラムの街歩き」で、モスク周辺の散策ルートとおすすめショップを紹介しています。",
        },
        {
          heading: "ティオンバル: アールデコとカフェの住宅街",
          body:
            "ティオンバルはMRTティオンバル駅から徒歩すぐのエリアで、1930年代に建てられたアールデコ様式の公営住宅ブロックが今も使われている珍しい地区です。40 Hands CoffeeやBooksActuallyなどの独立系店舗が集まり、シンガポールで最もコンパクトにカフェホッピングできるエリアです。ティオンバル・マーケットのホーカーセンターも朝食に最適です。\n\n" +
            "「シンガポール・ティオンバルの街歩き」で、アールデコ建築の見どころとカフェルートを紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "シンガポールは年間を通じて高温多湿ですが、2月〜4月がやや降水量が少なく歩きやすいです。スコールは30分程度で止むことが多いので、雨を避けてカフェに入るリズムが自然です。\n\n" +
            "MRTが市内をほぼ完全にカバーしており、どのエリアも駅から徒歩圏内です。シンガポールはGrabの本拠地でもあるため、タクシー代わりに使えます。WiFiは多くのカフェで利用可能ですが、移動中の地図確認にはeSIMが便利です。",
        },
      ],
      [
        { q: "シンガポールの街歩きで1日何エリア回れますか?", a: "2エリアがちょうどいいです。午前にカンポン・グラム、午後にティオンバルの組み合わせが最も効率的です。" },
        { q: "暑さ対策はどうすればいいですか?", a: "朝9時前に歩き始め、正午前後はエアコンの効いたショッピングモールやカフェで休むのがシンガポール流です。" },
        { q: "英語は通じますか?", a: "はい。シンガポールは英語が公用語のひとつなので、言語の心配はほぼ不要です。" },
      ],
      "singapore",
    ),
    en: en(
      "Singapore Neighborhood Walks 2026 | Kampong Glam and Tiong Bahru",
      "Two Singapore walking routes: Kampong Glam's Malay-Arab heritage quarter and Tiong Bahru's art-deco cafe neighborhood. Both within 10 minutes by MRT.",
      SINGAPORE_IMAGES[0],
      SINGAPORE_IMAGES,
      [
        { url: "https://x.com/sgfoodonfoot/status/1780000000000000009", label: "Haji Lane in Kampong Glam" },
        { url: "https://x.com/visitsingapore/status/1780000000000000010", label: "Tiong Bahru cafe scene" },
      ],
      [
        {
          heading: "Singapore's best walks are in its ethnic heritage districts",
          body:
            "Singapore's walking interest is not in Marina Bay or Orchard Road but in the ethnic communities that shaped its heritage quarters. Kampong Glam is the Malay-Arab cultural center, anchored by Sultan Mosque and Haji Lane. Tiong Bahru preserves 1930s art-deco public housing blocks alongside independent cafes and bakeries, making it Singapore's most walkable vintage district.\n\n" +
            "This page covers two routes, both reachable by MRT within 10 minutes, each working as a half-day plan.",
        },
        {
          heading: "Kampong Glam: Malay-Arab heritage walk",
          body:
            "Kampong Glam is a five-minute walk from MRT Bugis station. Sultan Mosque's golden dome is the landmark. Arab Street's textile shops, Haji Lane's street art, and Bussorah Street's cafes cluster within walking distance. Perfumeries and hand-woven fabric shops survive here, compressing Southeast Asian multiculturalism into a single quarter.\n\n" +
            "The Singapore Kampong Glam walk covers mosque-area routing and shop recommendations.",
        },
        {
          heading: "Tiong Bahru: art deco and cafe neighborhood",
          body:
            "Tiong Bahru is steps from MRT Tiong Bahru station. Its 1930s art-deco public housing blocks are still in daily use, creating an unusual streetscape backdrop. Shops like 40 Hands Coffee and BooksActually cluster here, making it Singapore's most compact cafe-hopping district. Tiong Bahru Market's hawker center is ideal for breakfast.\n\n" +
            "The Singapore Tiong Bahru walk covers the art-deco highlights and cafe routing.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "Singapore is hot and humid year-round, but February to April brings slightly lower rainfall. Rain showers typically last about 30 minutes, making a duck-into-a-cafe rhythm natural.\n\n" +
            "The MRT covers the city comprehensively, putting every walking area within reach of a station. Grab, headquartered in Singapore, works as a taxi alternative. WiFi is widely available in cafes, but an eSIM helps with map navigation between stops.",
        },
      ],
      [
        { q: "How many areas can I cover in one day?", a: "Two is ideal. Kampong Glam in the morning and Tiong Bahru in the afternoon is the most efficient pairing." },
        { q: "How do I handle the heat?", a: "Start before 9 AM and take midday breaks in air-conditioned malls or cafes. That is the standard Singapore walking approach." },
        { q: "Is English widely spoken?", a: "Yes. English is one of Singapore's official languages, so language is rarely an issue." },
      ],
      "singapore",
    ),
  },

  // ── 6. Hong Kong ──────────────────────────────────────────────────
  "hongkong-neighborhood-walks": {
    ja: ja(
      "香港の街歩きガイド 2026 | 上環・深水ポ・西貢のルート",
      "上環の乾物街と階段路地、深水ポの生地・電気街、西貢の漁村散歩をまとめた香港の街歩きガイドです。",
      HONGKONG_IMAGES[0],
      HONGKONG_IMAGES,
      [
        { url: "https://x.com/hkfoodtour/status/1780000000000000011", label: "上環の坂道散歩" },
        { url: "https://x.com/hongkongwalks/status/1780000000000000012", label: "深水ポのストリートフード" },
      ],
      [
        {
          heading: "香港の街歩きは「密度と高低差」が魅力",
          body:
            "香港は世界で最も人口密度が高い都市のひとつですが、その密度こそが街歩きを面白くしています。上環（シェンワン）は香港島西部の乾物街と急な階段路地が交錯するエリアで、古い香港の空気が最も濃く残る場所です。九龍側の深水ポ（サムスイポー）は生地問屋と電気街が混在する庶民的な街で、最近はカフェやギャラリーも増えています。西貢（サイクン）は新界の漁村で、都市の喧騒から一転した海沿いの散歩が楽しめます。\n\n" +
            "このページでは3つのルートを紹介しています。いずれもMTRで30分以内にアクセスできます。",
        },
        {
          heading: "上環（シェンワン）: 乾物街と階段路地の香港島散歩",
          body:
            "上環はMTR上環駅から始められるエリアで、摩羅上街（キャットストリート）のアンティーク市場、ハリウッドロード沿いのギャラリー、乾物街の独特の香りが記憶に残ります。坂と階段が多い地形なので、歩きやすい靴が必須です。文武廟（マンモーテンプル）は街歩きの途中に立ち寄れる美しい道教寺院です。\n\n" +
            "「香港・上環の街歩き」で、階段路地の攻略ルートと休憩カフェを紹介しています。",
        },
        {
          heading: "深水ポ: 生地街・電気街と新しいカフェ",
          body:
            "深水ポはMTR深水ポ駅が最寄りの九龍側のエリアで、鴨寮街（アプリウストリート）の電気・ガジェット市場、基隆街の生地問屋街が並びます。最近は空き店舗を利用したカフェやクラフトビールの店も増え、古いものと新しいものが混在するエリアになっています。\n\n" +
            "「香港・深水ポの街歩き」で、市場の歩き方と新しいスポットを紹介しています。",
        },
        {
          heading: "西貢: 漁村の海沿い散歩とベストシーズン",
          body:
            "西貢は新界東部の漁村で、MTR坑口駅からバスまたはミニバスで約20分です。海鮮レストランが並ぶ海沿いのプロムナード、西貢海鮮街での昼食、近くのビーチへの散歩が半日プランになります。都市部とは全く異なる空気感です。\n\n" +
            "香港のベストシーズンは10月〜12月で、湿度が低く快適です。1〜3月はやや肌寒く、4〜9月は蒸し暑いです。オクトパスカード（ICカード）があればMTR、バス、フェリーすべてで使えます。eSIMがあれば移動中のGoogle Maps利用もスムーズです。",
        },
      ],
      [
        { q: "香港の街歩きで最も歩きやすいエリアは?", a: "上環が最もアクセスしやすく、見どころの密度も高いです。ただし坂と階段が多いので体力は必要です。" },
        { q: "広東語や英語は必要ですか?", a: "観光エリアでは英語が通じます。深水ポなど地元密着のエリアでは広東語が主ですが、Google翻訳で対応できます。" },
        { q: "オクトパスカードはどこで買えますか?", a: "空港のMTRカスタマーサービスセンターか、コンビニのセブンイレブンで購入できます。150HKD（うちデポジット50HKD）です。" },
      ],
      "hongkong",
    ),
    en: en(
      "Hong Kong Neighborhood Walks 2026 | Sheung Wan, Sham Shui Po, and Sai Kung",
      "Three Hong Kong walking routes: Sheung Wan's staircase lanes, Sham Shui Po's market streets, and Sai Kung's fishing-village waterfront.",
      HONGKONG_IMAGES[0],
      HONGKONG_IMAGES,
      [
        { url: "https://x.com/hkfoodtour/status/1780000000000000011", label: "Sheung Wan hillside walk" },
        { url: "https://x.com/hongkongwalks/status/1780000000000000012", label: "Sham Shui Po street food" },
      ],
      [
        {
          heading: "Hong Kong walking thrives on density and elevation",
          body:
            "Hong Kong is one of the world's most densely packed cities, and that density is what makes it exceptional for walking. Sheung Wan on Hong Kong Island's west side mixes dried-seafood streets with steep staircase lanes that hold the oldest atmosphere in the city. Sham Shui Po in Kowloon blends fabric wholesalers and electronics markets with a growing wave of cafes and galleries. Sai Kung in the New Territories is a fishing village offering a waterfront walk that feels nothing like the city.\n\n" +
            "This page covers three routes, all reachable by MTR within 30 minutes.",
        },
        {
          heading: "Sheung Wan: dried-goods streets and staircase lanes",
          body:
            "Sheung Wan starts from MTR Sheung Wan station. Cat Street's antique market, Hollywood Road's galleries, and the distinctive aroma of dried-goods shops create a sensory-rich walk. The terrain is steep, so comfortable shoes are essential. Man Mo Temple is a beautiful Taoist shrine tucked into the route.\n\n" +
            "The Hong Kong Sheung Wan walk covers staircase routing and rest-stop cafes.",
        },
        {
          heading: "Sham Shui Po: fabric, electronics, and new cafes",
          body:
            "Sham Shui Po is served by MTR Sham Shui Po station in Kowloon. Apliu Street's electronics flea market and Ki Lung Street's fabric wholesalers define the old character. New cafes and craft-beer spots have moved into vacant shopfronts, creating a mix of old and new that is Kowloon's grittiest walking territory.\n\n" +
            "The Hong Kong Sham Shui Po walk covers market navigation and newer spots.",
        },
        {
          heading: "Sai Kung: fishing-village waterfront and best season",
          body:
            "Sai Kung is a fishing village in the eastern New Territories, about 20 minutes by bus or minibus from MTR Hang Hau station. The seafood-restaurant promenade, a lunch stop at the seafood street, and a short beach walk fill a comfortable half day.\n\n" +
            "Hong Kong's best walking months are October through December when humidity drops. January through March is cooler, and April through September is hot and humid. An Octopus card covers MTR, buses, and ferries. An eSIM keeps Google Maps working during transit.",
        },
      ],
      [
        { q: "Which Hong Kong area is easiest to walk?", a: "Sheung Wan has the best access and densest sights, but expect hills and staircases." },
        { q: "Do I need Cantonese?", a: "Tourist areas are English-friendly. Local neighborhoods like Sham Shui Po are mostly Cantonese, but Google Translate handles the gap." },
        { q: "Where do I get an Octopus card?", a: "At the MTR Customer Service Centre in the airport or any 7-Eleven. It costs HKD 150 including a HKD 50 deposit." },
      ],
      "hongkong",
    ),
  },

  // ── 7. Kuala Lumpur ───────────────────────────────────────────────
  "kuala-lumpur-neighborhood-walks": {
    ja: ja(
      "クアラルンプールの街歩きガイド 2026 | チャイナタウン・ブリックフィールズ・カンポンバル",
      "KLチャイナタウンのペタリング通り、ブリックフィールズのリトルインディア、カンポンバルのマレー村をまとめた街歩きガイドです。",
      KL_IMAGES[0],
      KL_IMAGES,
      [
        { url: "https://x.com/klfoodwalks/status/1780000000000000013", label: "ペタリング通りの屋台" },
        { url: "https://x.com/visitkl/status/1780000000000000014", label: "ブリックフィールズの寺院" },
      ],
      [
        {
          heading: "KLの街歩きは「3つの文化圏」を横断する",
          body:
            "クアラルンプール（KL）はマレー、中華、インドの3文化が混在する都市で、それぞれの文化圏が独自の街区を形成しています。チャイナタウン（ペタリング通り）は漢方薬屋と屋台が密集する華人エリア、ブリックフィールズはヒンドゥー寺院とバナナリーフカレーのリトルインディア、カンポンバルは高層ビルに囲まれたマレー村です。3つのエリアを歩くことで、KLの多文化が体感できます。\n\n" +
            "このページでは3つのルートを紹介しています。いずれもLRT/MRTで15分以内にアクセスできます。",
        },
        {
          heading: "チャイナタウン: ペタリング通りと関帝廟",
          body:
            "チャイナタウンはLRTパサール・スニ駅が最寄りで、ペタリング通りのアーケード市場が中心です。関帝廟（クアン・ティ廟）は通りの中ほどにある美しい中華寺院で、線香の煙と赤い提灯が印象的です。市場の周辺には屋台が点在し、ワンタンミーやロティチャナイなどKLらしい食事が手軽に楽しめます。\n\n" +
            "「KLチャイナタウンの街歩き」で、市場の回り方と食事スポットを紹介しています。",
        },
        {
          heading: "ブリックフィールズ: リトルインディアの色彩散歩",
          body:
            "ブリックフィールズはKLセントラル駅から徒歩5分のエリアで、インド系コミュニティの中心地です。スリ・カンダスワミー寺院の鮮やかなゴープラム（塔門）がランドマークで、通り沿いにはサリー布の店、ジャスミンの花輪屋、バナナリーフカレーの食堂が並びます。\n\n" +
            "「KLブリックフィールズの街歩き」で、寺院の見どころとカレーの名店を紹介しています。",
        },
        {
          heading: "カンポンバルとベストシーズン・eSIM情報",
          body:
            "カンポンバルはKLCCの高層ビル群のすぐ北にある伝統的なマレー村で、木造の住宅、モスク、マレー料理の食堂が残るエリアです。都市の中の村という不思議な空間で、ナシレマッの朝食がおすすめです。LRTカンポンバル駅が最寄りです。\n\n" +
            "KLのベストシーズンは5月〜9月で、比較的降水量が少ないです。年間を通じて暑いので、朝の散歩がおすすめです。GrabがKLの主要な移動手段で、eSIMがあれば到着後すぐに使えます。",
        },
      ],
      [
        { q: "KLの街歩きで最もおすすめのエリアは?", a: "チャイナタウンが最もアクセスしやすく、食事と見どころのバランスが良いです。" },
        { q: "3エリアを1日で回れますか?", a: "可能です。午前にチャイナタウン、昼にブリックフィールズでカレー、午後にカンポンバルという順序がスムーズです。" },
        { q: "マレー語は必要ですか?", a: "観光エリアでは英語が通じます。KLは英語の普及率が高い東南アジアの都市のひとつです。" },
      ],
      "malaysia",
    ),
    en: en(
      "Kuala Lumpur Neighborhood Walks 2026 | Chinatown, Brickfields, and Kampung Baru",
      "Three KL walking routes crossing three cultures: Chinatown's Petaling Street, Brickfields Little India, and the Malay village of Kampung Baru.",
      KL_IMAGES[0],
      KL_IMAGES,
      [
        { url: "https://x.com/klfoodwalks/status/1780000000000000013", label: "Petaling Street stalls" },
        { url: "https://x.com/visitkl/status/1780000000000000014", label: "Brickfields temple" },
      ],
      [
        {
          heading: "KL walking crosses three cultural zones",
          body:
            "Kuala Lumpur blends Malay, Chinese, and Indian cultures into a single city, each community maintaining its own distinct quarter. Chinatown (Petaling Street) packs Chinese medicine shops and street stalls. Brickfields is Little India with Hindu temples and banana-leaf curry. Kampung Baru is a traditional Malay village surrounded by skyscrapers. Walking through all three gives you KL's multicultural character in a single day.\n\n" +
            "This page covers three routes, all reachable by LRT or MRT within 15 minutes.",
        },
        {
          heading: "Chinatown: Petaling Street and Guan Di Temple",
          body:
            "Chinatown is closest to LRT Pasar Seni station. Petaling Street's covered market is the center, with Guan Di Temple halfway along offering incense-scented calm amid the market bustle. Surrounding stalls serve KL staples like wonton mee and roti canai.\n\n" +
            "The KL Chinatown walk covers market routing and food spots.",
        },
        {
          heading: "Brickfields: Little India's colorful walk",
          body:
            "Brickfields is a five-minute walk from KL Sentral station. The Sri Kandaswamy Temple's ornate gopuram tower is the landmark. Sari shops, jasmine garland sellers, and banana-leaf curry restaurants line the streets.\n\n" +
            "The KL Brickfields walk covers temple highlights and curry recommendations.",
        },
        {
          heading: "Kampung Baru and best season plus eSIM tips",
          body:
            "Kampung Baru is a traditional Malay village just north of the KLCC skyscrapers, preserving wooden houses, a mosque, and Malay food stalls. The village-in-a-city contrast is striking. Nasi lemak breakfast is the move here. LRT Kampung Baru station is the nearest stop.\n\n" +
            "KL's best months are May to September, with relatively lower rainfall. It is hot year-round, making morning walks ideal. Grab is KL's primary ride-hail service, and an eSIM ensures it works from arrival.",
        },
      ],
      [
        { q: "Which KL area is best for a first walk?", a: "Chinatown has the easiest access and the best balance of food and sights." },
        { q: "Can I cover all three areas in one day?", a: "Yes. Morning in Chinatown, lunch curry in Brickfields, and afternoon in Kampung Baru is a smooth sequence." },
        { q: "Do I need Malay?", a: "English is widely spoken in tourist areas. KL has one of the highest English proficiency rates in Southeast Asia." },
      ],
      "malaysia",
    ),
  },

  // ── 8. Bali ───────────────────────────────────────────────────────
  "bali-neighborhood-walks": {
    ja: ja(
      "バリの街歩きガイド 2026 | ウブド・スミニャック・サヌールのルート",
      "ウブドのライステラス散歩、スミニャックのビーチウォーク、サヌールの朝の散歩道をまとめたバリの街歩きガイドです。",
      BALI_IMAGES[0],
      BALI_IMAGES,
      [
        { url: "https://x.com/balitraveller/status/1780000000000000015", label: "ウブドのライステラス" },
        { url: "https://x.com/balicafe/status/1780000000000000016", label: "サヌールの朝" },
      ],
      [
        {
          heading: "バリの街歩きは「ビーチと棚田と寺院」の3軸",
          body:
            "バリは世界的なリゾート地ですが、街歩きとして楽しめるエリアも豊富です。ウブドは棚田の風景と伝統芸能が交錯する内陸の文化エリア、スミニャックはビーチ沿いのカフェとブティックが集まるモダンなエリア、サヌールは舗装されたビーチフロントの遊歩道が朝の散歩に最適な落ち着いたエリアです。\n\n" +
            "このページでは3つのルートを紹介しています。エリア間の移動はGrabかチャーターカーが便利です。",
        },
        {
          heading: "ウブド: ライステラスとアートの内陸散歩",
          body:
            "ウブドはバリの内陸に位置する文化の中心地で、テガララン・ライステラスの棚田風景が有名です。ウブド王宮周辺のメインストリートにはギャラリーやカフェが並び、モンキーフォレストまでの散歩道は木陰が多く快適です。朝7時台のライステラスは観光客が少なく、最も美しい光が差します。\n\n" +
            "「ウブドのライステラス散歩」で、棚田ルートとカフェの休憩ポイントを紹介しています。",
        },
        {
          heading: "スミニャック: ビーチウォークとブティック散策",
          body:
            "スミニャックはバリ南部のビーチリゾートエリアで、ビーチ沿いの散歩とオベロイ通り周辺のブティック・カフェ巡りが楽しめます。夕方のビーチウォークはサンセットを見ながら歩けるバリのハイライトのひとつです。\n\n" +
            "「スミニャックのビーチウォーク」で、ビーチ沿いのルートと夕暮れの楽しみ方を紹介しています。",
        },
        {
          heading: "サヌールの朝散歩とベストシーズン・eSIM情報",
          body:
            "サヌールはバリ東海岸の静かなリゾートタウンで、海沿いに約4kmの舗装された遊歩道が整備されています。朝6時台のウォーキングは地元の住民やヨガ帰りの旅行者と一緒に歩くことになり、バリで最もリラックスした朝の時間を過ごせます。\n\n" +
            "バリのベストシーズンは乾季の4月〜10月です。雨季（11月〜3月）もスコールは短時間で、雨上がりの空気は清涼です。Grabがバリの主要な移動手段ですが、ウブドなど一部エリアではドライバーの手配に時間がかかることがあります。eSIMを事前に設定しておくと安心です。",
        },
      ],
      [
        { q: "バリで最もおすすめの街歩きエリアは?", a: "ウブドが最も歩きごたえがあります。ライステラス、寺院、カフェ、ギャラリーと要素が豊富です。" },
        { q: "エリア間の移動はどうすればいいですか?", a: "Grabまたはチャーターカーが便利です。ウブド〜スミニャック間は約1時間〜1.5時間です。" },
        { q: "バリでeSIMは使えますか?", a: "はい。主要キャリアのeSIMが利用可能で、Grab利用やGoogle Maps確認に便利です。空港到着前に設定しておきましょう。" },
      ],
      "indonesia",
    ),
    en: en(
      "Bali Neighborhood Walks 2026 | Ubud, Seminyak, and Sanur",
      "Three Bali walking routes: Ubud rice-terrace walk, Seminyak beach walk, and Sanur morning promenade. Area-by-area guide beyond the resorts.",
      BALI_IMAGES[0],
      BALI_IMAGES,
      [
        { url: "https://x.com/balitraveller/status/1780000000000000015", label: "Ubud rice terraces" },
        { url: "https://x.com/balicafe/status/1780000000000000016", label: "Sanur morning walk" },
      ],
      [
        {
          heading: "Bali walking runs on three axes: beach, terraces, and temples",
          body:
            "Bali is a global resort destination, but it also offers strong neighborhood walking. Ubud is the inland cultural center where rice terraces meet traditional arts. Seminyak lines cafes and boutiques along the beach. Sanur's paved beachfront promenade is the most relaxed morning walk on the island.\n\n" +
            "This page covers three routes. Grab or a chartered car handles the distances between areas.",
        },
        {
          heading: "Ubud: rice terraces and art galleries inland",
          body:
            "Ubud sits in Bali's interior as the cultural center, known for Tegallalang's stepped rice terraces. The main street near Ubud Royal Palace lines up with galleries and cafes, and the walk to Monkey Forest is shaded and comfortable. The terraces are quietest and best lit before 8 AM.\n\n" +
            "The Ubud rice-terrace walk covers the terrace route and cafe rest stops.",
        },
        {
          heading: "Seminyak: beach walk and boutique browsing",
          body:
            "Seminyak is a southern Bali beach resort area combining beachside strolling with boutique and cafe circuits around Oberoi Road. The sunset beach walk is one of Bali's highlight experiences.\n\n" +
            "The Seminyak beach walk covers the coastal route and sunset timing.",
        },
        {
          heading: "Sanur morning walk and best season plus eSIM tips",
          body:
            "Sanur is a quiet resort town on Bali's east coast with a roughly 4km paved beachfront promenade. A 6 AM walk puts you alongside locals and post-yoga travelers for the most relaxed morning in Bali.\n\n" +
            "Bali's best months are the dry season from April to October. The rainy season (November to March) brings short bursts that clear quickly. Grab is the main transport app, though drivers in Ubud can be slower to arrive. Set up an eSIM before departure.",
        },
      ],
      [
        { q: "Which Bali area is best for walking?", a: "Ubud has the most walking substance: rice terraces, temples, cafes, and galleries." },
        { q: "How do I get between areas?", a: "Grab or a chartered car. Ubud to Seminyak is about 1 to 1.5 hours." },
        { q: "Does eSIM work in Bali?", a: "Yes. Major carrier eSIMs work in Bali and are useful for Grab and Google Maps. Set one up before you arrive." },
      ],
      "indonesia",
    ),
  },

  // ── 9. Shanghai ───────────────────────────────────────────────────
  "shanghai-neighborhood-walks": {
    ja: ja(
      "上海の街歩きガイド 2026 | 旧フランス租界・外灘・田子坊のルート",
      "上海旧フランス租界のプラタナス並木、外灘のウォーターフロント、田子坊の石庫門路地をまとめた街歩きガイドです。",
      SHANGHAI_IMAGES[0],
      SHANGHAI_IMAGES,
      [
        { url: "https://x.com/shanghaiwalks/status/1780000000000000017", label: "旧フランス租界の並木道" },
        { url: "https://x.com/bundview/status/1780000000000000018", label: "外灘の夜景" },
      ],
      [
        {
          heading: "上海の街歩きは「時代の層」を歩くこと",
          body:
            "上海は世界で最も急速に変化した都市のひとつですが、その変化の層がそのまま街歩きのテーマになります。旧フランス租界はプラタナスの並木道と1920〜30年代のアールデコ建築が残るヨーロッパ風のエリア、外灘（バンド）は20世紀初頭の銀行建築群と浦東の超高層ビルが向かい合うウォーターフロント、田子坊は石庫門（シークーメン）と呼ばれる上海独特の集合住宅をリノベーションしたアートエリアです。\n\n" +
            "このページでは3つのルートを紹介しています。いずれも地下鉄で15分以内にアクセスできます。",
        },
        {
          heading: "旧フランス租界: プラタナス並木のヨーロッパ風散歩",
          body:
            "旧フランス租界は地下鉄10号線の陝西南路駅や1号線の衡山路駅からアクセスできます。武康路、安福路、永康路などの並木道に、1930年代のアールデコ建築が並び、カフェやブティックが入っています。武康大楼（ノルマンディー・アパートメント）は上海で最もフォトジェニックな建築のひとつです。秋の紅葉シーズンは特に美しいです。\n\n" +
            "「上海・旧フランス租界の街歩き」で、主要な通りの歩き方とカフェ休憩を紹介しています。",
        },
        {
          heading: "外灘: 東西の時代が向かい合うウォーターフロント",
          body:
            "外灘は黄浦江沿いの約1.5kmの遊歩道で、西側に20世紀初頭の新古典主義建築、東側に浦東の超高層ビル群が広がる上海のシンボル的景観です。朝の散歩は人が少なく写真撮影に最適、夜はライトアップされた両岸のコントラストが圧巻です。地下鉄2号線・10号線の南京東路駅が最寄りです。\n\n" +
            "「上海・外灘の街歩き」で、遊歩道のルートと周辺の見どころを紹介しています。",
        },
        {
          heading: "田子坊とベストシーズン・eSIM情報",
          body:
            "田子坊は地下鉄9号線の打浦橋駅から徒歩5分のエリアで、石庫門と呼ばれる上海独特の集合住宅の路地をリノベーションしたアート・ショッピング地区です。路地の奥にギャラリー、工芸品ショップ、茶館が入っており、迷路のように歩く楽しさがあります。午前中の早い時間帯が比較的空いています。\n\n" +
            "上海のベストシーズンは10月〜11月と3月〜5月です。夏（7〜8月）は高温多湿、冬（12〜2月）は底冷えします。中国ではGoogle Maps、LINE、Instagramなどの主要アプリがブロックされているため、VPN付きのeSIMの準備が重要です。",
        },
      ],
      [
        { q: "上海の街歩きで最もおすすめのエリアは?", a: "旧フランス租界が最も歩きやすく、カフェの密度も高いです。半日ゆっくり歩けるエリアです。" },
        { q: "中国のインターネット規制に注意が必要ですか?", a: "はい。Google Maps、LINE、Instagramは中国ではブロックされます。VPN付きeSIMか、事前にVPNアプリをインストールしておくことを強くおすすめします。" },
        { q: "キャッシュレス決済は必要ですか?", a: "ほぼ必須です。WeChat PayかAlipayが主流で、現金はほとんど使われません。旅行者向けのAlipay Tour Passの事前設定をおすすめします。" },
      ],
      "china",
    ),
    en: en(
      "Shanghai Neighborhood Walks 2026 | French Concession, Bund, and Tianzifang",
      "Three Shanghai walking routes: the French Concession's tree-lined avenues, the Bund's waterfront contrast, and Tianzifang's shikumen lanes.",
      SHANGHAI_IMAGES[0],
      SHANGHAI_IMAGES,
      [
        { url: "https://x.com/shanghaiwalks/status/1780000000000000017", label: "French Concession tree-lined avenue" },
        { url: "https://x.com/bundview/status/1780000000000000018", label: "Bund night view" },
      ],
      [
        {
          heading: "Shanghai walking is about layers of time",
          body:
            "Shanghai is one of the world's fastest-changing cities, and those layers of change are themselves the walking theme. The former French Concession preserves plane-tree boulevards and 1920s-30s art-deco architecture. The Bund lines early-20th-century banking facades against Pudong's supertall skyline across the Huangpu River. Tianzifang repurposes shikumen, Shanghai's distinctive lane-house blocks, into a gallery-and-teahouse art district.\n\n" +
            "This page covers three routes, all reachable by metro within 15 minutes.",
        },
        {
          heading: "French Concession: European-style boulevard walking",
          body:
            "The French Concession is accessible from Metro Line 10 Shaanxi South Road or Line 1 Hengshan Road stations. Wukang Road, Anfu Road, and Yongkang Road line up with 1930s art-deco buildings housing cafes and boutiques. The Wukang Mansion (Normandie Apartments) is one of Shanghai's most photographed buildings. The autumn foliage season is especially beautiful.\n\n" +
            "The Shanghai French Concession walk covers the main streets and cafe stops.",
        },
        {
          heading: "The Bund: waterfront where two eras face each other",
          body:
            "The Bund is a 1.5km promenade along the Huangpu River with early-20th-century neoclassical buildings on one side and Pudong's supertall cluster on the other. Morning walks are quieter and best for photography. Evening illumination creates a dramatic contrast. Metro Line 2 and Line 10 Nanjing East Road station is nearest.\n\n" +
            "The Shanghai Bund walk covers the promenade route and nearby sights.",
        },
        {
          heading: "Tianzifang and best season plus eSIM tips",
          body:
            "Tianzifang is a five-minute walk from Metro Line 9 Dapuqiao station. The shikumen lane-house alleys have been converted into galleries, craft shops, and teahouses, creating a maze-like walking experience. Early mornings are less crowded.\n\n" +
            "Shanghai's best walking months are October to November and March to May. Summer (July to August) is hot and humid, winter (December to February) is biting cold. In China, Google Maps, LINE, Instagram, and most Western apps are blocked, so an eSIM with VPN access is essential.",
        },
      ],
      [
        { q: "Which Shanghai area is best for walking?", a: "The French Concession is the most walkable with the highest cafe density. It fills a comfortable half day." },
        { q: "Do I need to worry about China's internet restrictions?", a: "Yes. Google Maps, LINE, and Instagram are blocked in China. An eSIM with VPN or a pre-installed VPN app is strongly recommended." },
        { q: "Do I need mobile payments?", a: "Almost essential. WeChat Pay and Alipay dominate, and cash is rarely used. Set up an Alipay Tour Pass before arrival." },
      ],
      "china",
    ),
  },

  // ── 10. Beijing ───────────────────────────────────────────────────
  "beijing-neighborhood-walks": {
    ja: ja(
      "北京の街歩きガイド 2026 | 胡同・798芸術区・后海のルート",
      "北京の胡同（フートン）路地歩き、798芸術区のアートウォーク、后海湖畔の散歩をまとめた街歩きガイドです。",
      BEIJING_IMAGES[0],
      BEIJING_IMAGES,
      [
        { url: "https://x.com/beijingwalks/status/1780000000000000019", label: "胡同の路地風景" },
        { url: "https://x.com/798artzone/status/1780000000000000020", label: "798芸術区のギャラリー" },
      ],
      [
        {
          heading: "北京の街歩きは「皇帝の都の裏側」を歩くこと",
          body:
            "北京は故宮と天安門のイメージが強いですが、街歩きの魅力はその裏側に広がる胡同（フートン）の路地にあります。数百年続く四合院住宅が残る路地は、皇帝の都の日常を今も伝えています。798芸術区は軍事工場をリノベーションした中国最大の現代アートエリア、后海（ホウハイ）は湖畔のバーストリートと静かな寺院路地が共存するエリアです。\n\n" +
            "このページでは3つのルートを紹介しています。いずれも地下鉄で20分以内にアクセスできます。",
        },
        {
          heading: "胡同: 四合院と路地の歴史散歩",
          body:
            "胡同は北京の伝統的な路地で、南鑼鼓巷（ナンルオグーシャン）、国子監通り、鼓楼周辺が観光客にもアクセスしやすいエリアです。南鑼鼓巷はやや観光地化していますが、一本脇に入ると静かな四合院の路地が広がります。朝の時間帯は地元住民の生活リズムを感じられます。地下鉄6号線の南鑼鼓巷駅が最寄りです。\n\n" +
            "「北京・胡同の路地歩き」で、観光エリアから一歩外れた静かな胡同ルートを紹介しています。",
        },
        {
          heading: "798芸術区: 工場跡地のアートウォーク",
          body:
            "798芸術区は地下鉄14号線の望京南駅からバスまたはタクシーで10分のエリアで、旧東ドイツ支援の軍事工場群をギャラリー、スタジオ、カフェに転用した中国最大の現代アートエリアです。UCCA（ユーレンス現代美術センター）を中心に、国内外のアーティストの展示が常時行われています。週末は混むので平日がおすすめです。\n\n" +
            "「北京・798芸術区のアートウォーク」で、主要ギャラリーの回り方を紹介しています。",
        },
        {
          heading: "后海とベストシーズン・eSIM情報",
          body:
            "后海は什刹海エリアの中心で、湖畔にバーやレストランが並ぶ賑やかな面と、一本裏に入ると静かな寺院や胡同が残る二面性が魅力です。恭王府（かつての王府）や銀錠橋周辺の散歩は夕方の光が美しいです。地下鉄8号線の什刹海駅が最寄りです。\n\n" +
            "北京のベストシーズンは9月〜11月の秋で、空が高く澄んでいます。春（4〜5月）は黄砂が来ることがあり、夏（7〜8月）は暑く、冬（12〜2月）は厳寒です。上海と同様、中国のインターネット規制があるため、VPN付きeSIMの事前準備が必須です。",
        },
      ],
      [
        { q: "北京の街歩きで最もおすすめのエリアは?", a: "胡同エリアが最も北京らしい体験です。南鑼鼓巷駅を起点に、脇道に入って静かな路地を探すのがコツです。" },
        { q: "故宮の後に胡同を歩けますか?", a: "はい。故宮の北門（神武門）から景山公園を経由して鼓楼・胡同エリアまで徒歩30分程度です。" },
        { q: "VPNは必ず必要ですか?", a: "Google Maps、LINE、Instagramを使いたい場合は必須です。百度地図や微信（WeChat）など中国アプリだけで乗り切ることも可能ですが、日本語対応が限られます。" },
      ],
      "china",
    ),
    en: en(
      "Beijing Neighborhood Walks 2026 | Hutong, 798 Art District, and Houhai Lake",
      "Three Beijing walking routes: hutong alleyways, 798 Art District galleries, and Houhai Lake's bar-and-temple shoreline.",
      BEIJING_IMAGES[0],
      BEIJING_IMAGES,
      [
        { url: "https://x.com/beijingwalks/status/1780000000000000019", label: "Hutong alley scene" },
        { url: "https://x.com/798artzone/status/1780000000000000020", label: "798 gallery walk" },
      ],
      [
        {
          heading: "Beijing walking happens behind the imperial facades",
          body:
            "Beijing's image centers on the Forbidden City and Tiananmen, but the walking interest lies in the hutong alleyways behind them. These lanes of centuries-old courtyard houses still carry the daily rhythm of the imperial capital. The 798 Art District converts a military factory complex into China's largest contemporary art zone. Houhai Lake pairs a lively bar waterfront with quiet temple lanes one block behind.\n\n" +
            "This page covers three routes, all reachable by metro within 20 minutes.",
        },
        {
          heading: "Hutong: courtyard houses and alley history",
          body:
            "Hutongs are Beijing's traditional lane networks. Nanluoguxiang, Guozijian Street, and the Drum Tower area are the most visitor-accessible. Nanluoguxiang is somewhat commercialized, but one lane off the main drag you find quiet courtyard neighborhoods. Early mornings reveal local life rhythms. Metro Line 6 Nanluoguxiang station is nearest.\n\n" +
            "The Beijing hutong walk covers quieter lanes just off the tourist routes.",
        },
        {
          heading: "798 Art District: factory-campus art walk",
          body:
            "798 Art District is about 10 minutes by bus or taxi from Metro Line 14 Wangjing South station. The former East German-designed military factories now house galleries, studios, and cafes. UCCA (Ullens Center for Contemporary Art) anchors the complex with rotating international shows. Weekdays are less crowded.\n\n" +
            "The Beijing 798 art walk covers the main gallery loop.",
        },
        {
          heading: "Houhai Lake and best season plus eSIM tips",
          body:
            "Houhai is the center of the Shichahai lake district. The waterfront mixes bars and restaurants on the shore with quiet temple lanes and hutongs one block behind. Prince Gong's Mansion and Yinding Bridge are best in late-afternoon light. Metro Line 8 Shichahai station is nearest.\n\n" +
            "Beijing's best season is autumn (September to November) with clear, high skies. Spring (April to May) can bring sandstorms, summer (July to August) is hot, and winter (December to February) is intensely cold. As in Shanghai, China's internet restrictions block Google Maps, LINE, and Instagram, making a VPN-enabled eSIM essential.",
        },
      ],
      [
        { q: "Which Beijing area is best for a first walk?", a: "The hutong area is the most authentically Beijing experience. Start from Nanluoguxiang station and explore the quieter side lanes." },
        { q: "Can I walk to hutongs after the Forbidden City?", a: "Yes. From the Forbidden City's north gate (Shenwumen), walk through Jingshan Park to the Drum Tower and hutong area in about 30 minutes." },
        { q: "Do I definitely need a VPN?", a: "If you want Google Maps, LINE, or Instagram, yes. You can survive on Baidu Maps and WeChat alone, but Japanese and English support is limited." },
      ],
      "china",
    ),
  },

  // ── 11. Penang ────────────────────────────────────────────────────
  "penang-neighborhood-walks": {
    ja: ja(
      "ペナンの街歩きガイド 2026 | ジョージタウンとアルメニアン通り",
      "ペナン・ジョージタウンのUNESCO世界遺産ストリートアートとアルメニアン通りのクリエイティブ散歩をまとめたガイドです。",
      PENANG_IMAGES[0],
      PENANG_IMAGES,
      [
        { url: "https://x.com/penangfoodie/status/1780000000000000021", label: "ジョージタウンのストリートアート" },
        { url: "https://x.com/penangwalks/status/1780000000000000022", label: "アルメニアン通りのカフェ" },
      ],
      [
        {
          heading: "ペナンの街歩きは「ストリートアートと食」で完結する",
          body:
            "ペナン島のジョージタウンはUNESCO世界遺産に登録された港町で、マレー、中華、インド、イギリスの4文化が層をなしています。リトアニア人アーティストのエルネスト・ザカレヴィッチによるワイヤーフレームアートと壁画が街角に点在し、歩くだけでアート鑑賞になります。アルメニアン通りはそのクリエイティブシーンの中心で、ギャラリー、カフェ、ブティックが集まっています。\n\n" +
            "このページでは2つのルートを紹介しています。ジョージタウンはコンパクトで、徒歩だけで回れます。",
        },
        {
          heading: "ジョージタウン: 世界遺産のストリートアート散歩",
          body:
            "ジョージタウンのストリートアートはコムター近くのメインエリアに集中しています。「自転車に乗る子供たち」「ブランコに乗る少女」など有名な壁画を巡るルートは徒歩2〜3時間で回れます。クー・コンシー（邱公司）やチョン・ファッ・ツィー・マンション（ブルーマンション）など、歴史建築も散策ルートに組み込めます。\n\n" +
            "「ペナン・ジョージタウンの街歩き」で、ストリートアートの位置と歴史建築の効率的な回り方を紹介しています。",
        },
        {
          heading: "アルメニアン通り: クリエイティブの集積地",
          body:
            "アルメニアン通りはジョージタウンの中心に位置するクリエイティブストリートで、独立系カフェ、ハンドメイドショップ、ギャラリーが軒を連ねています。通り沿いのワイヤーフレームアートも見どころのひとつです。週末はストリートマーケットが開かれることもあります。\n\n" +
            "「ペナン・アルメニアン通りの散歩」で、カフェとギャラリーの巡り方を紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "ペナンのベストシーズンは12月〜3月の乾季です。年間を通じて暑いですが、海からの風があるため内陸部よりは快適です。\n\n" +
            "ジョージタウン中心部は徒歩で回れるコンパクトさです。少し離れたエリアへはGrabが便利です。ペナンの屋台街での食事にはキャッシュが必要なこともあるので、少額の現金も持っておくと安心です。eSIMがあれば地図と翻訳アプリが常時使えます。",
        },
      ],
      [
        { q: "ペナンの街歩きに何日必要ですか?", a: "ジョージタウンのストリートアートと食べ歩きで丸1日、アルメニアン通り周辺で半日、合計1.5〜2日がおすすめです。" },
        { q: "ペナンの食事はどこがおすすめですか?", a: "ガーニー・ドライブのホーカーセンター、チュリア通りの屋台、ニュー・レーン・ホーカーズが定番です。チャークイティオ（焼きそば）とアッサム・ラクサは必食です。" },
        { q: "英語は通じますか?", a: "ジョージタウンでは広く通じます。マレーシアの中でもペナンは英語の普及率が高いエリアです。" },
      ],
      "malaysia",
    ),
    en: en(
      "Penang Neighborhood Walks 2026 | George Town and Armenian Street",
      "Two Penang walking routes: George Town's UNESCO street art and heritage architecture, plus Armenian Street's creative quarter. Both walkable on foot.",
      PENANG_IMAGES[0],
      PENANG_IMAGES,
      [
        { url: "https://x.com/penangfoodie/status/1780000000000000021", label: "George Town street art" },
        { url: "https://x.com/penangwalks/status/1780000000000000022", label: "Armenian Street cafe" },
      ],
      [
        {
          heading: "Penang walking is street art and food, start to finish",
          body:
            "George Town on Penang Island is a UNESCO World Heritage port city where Malay, Chinese, Indian, and British cultures layer on top of each other. Wire-frame sculptures and murals by Lithuanian artist Ernest Zacharevic dot the streets, turning a walk into an art tour. Armenian Street is the creative spine of this scene, clustering galleries, cafes, and boutiques.\n\n" +
            "This page covers two routes. George Town is compact enough to cover entirely on foot.",
        },
        {
          heading: "George Town: UNESCO street art and heritage walk",
          body:
            "George Town's street art concentrates near Komtar. The famous murals including Children on a Bicycle and Girl on a Swing can be covered in a 2-3 hour walking loop. Khoo Kongsi clan house and Cheong Fatt Tze Mansion (the Blue Mansion) add heritage architecture to the route.\n\n" +
            "The Penang George Town walk covers street-art locations and efficient heritage routing.",
        },
        {
          heading: "Armenian Street: creative district hub",
          body:
            "Armenian Street sits at the center of George Town's creative scene with independent cafes, handcraft shops, and galleries lining both sides. Wire-frame art installations are part of the street furniture. Weekend street markets appear regularly.\n\n" +
            "The Penang Armenian Street walk covers the cafe and gallery circuit.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "Penang's best months are the dry season from December to March. It stays hot year-round but sea breezes make it more comfortable than the mainland.\n\n" +
            "Central George Town is walkable without transport. Grab handles longer distances. Street-food stalls sometimes require cash, so carry small notes. An eSIM keeps maps and translation apps always available.",
        },
      ],
      [
        { q: "How many days do I need for Penang?", a: "One full day for George Town street art and food, plus a half day for Armenian Street. Total: 1.5 to 2 days." },
        { q: "Where should I eat in Penang?", a: "Gurney Drive hawker center, Chulia Street stalls, and New Lane Hawkers are the standards. Char kway teow and assam laksa are essential." },
        { q: "Is English widely spoken?", a: "Yes. George Town has one of the highest English proficiency rates in Malaysia." },
      ],
      "malaysia",
    ),
  },

  // ── 12. Mumbai ────────────────────────────────────────────────────
  "mumbai-neighborhood-walks": {
    ja: ja(
      "ムンバイの街歩きガイド 2026 | コラバとフォートエリアのルート",
      "ムンバイ・コラバの海沿い散歩とフォートエリアのヴィクトリアンゴシック建築巡りをまとめた街歩きガイドです。",
      MUMBAI_IMAGES[0],
      MUMBAI_IMAGES,
      [
        { url: "https://x.com/mumbaiwalks/status/1780000000000000023", label: "ゲートウェイ・オブ・インディアの朝" },
        { url: "https://x.com/bombayfood/status/1780000000000000024", label: "フォートエリアのカフェ" },
      ],
      [
        {
          heading: "ムンバイの街歩きは「植民地建築と海」がテーマ",
          body:
            "ムンバイはインド最大の都市で、イギリス植民地時代のヴィクトリアンゴシック建築とアールデコ建築が世界遺産に登録されています。コラバ地区はゲートウェイ・オブ・インディアを起点とした海沿いの散歩が魅力で、タージマハルホテルの壮麗な外観も目の前です。フォートエリアはチャトラパティ・シヴァージー・ターミナス（旧VT駅）を中心に、ゴシック様式の建築群が密集しています。\n\n" +
            "このページでは2つのルートを紹介しています。どちらも南ムンバイに位置し、徒歩で回れます。",
        },
        {
          heading: "コラバ: ゲートウェイ・オブ・インディアから海沿いへ",
          body:
            "コラバはムンバイ最南端のエリアで、ゲートウェイ・オブ・インディアがランドマークです。ここからコラバ・コーズウェイ通りを北へ歩くと、カフェ、ブックショップ、雑貨店が並びます。レオポルドカフェは1871年創業の有名な老舗です。朝のマリンドライブ（クイーンズネックレス）沿いの散歩も組み合わせると、ムンバイの海沿いの開放感を味わえます。\n\n" +
            "「ムンバイ・コラバの街歩き」で、海沿いルートとカフェ休憩を紹介しています。",
        },
        {
          heading: "フォートエリア: ゴシック建築とアールデコの密集地帯",
          body:
            "フォートエリアはチャトラパティ・シヴァージー・ターミナス（CST）駅を中心に、ヴィクトリアンゴシック様式の公共建築が密集しています。ムンバイ大学、ハイコート、フローラ・ファウンテンなど、19世紀の建築群を歩いて巡れます。近隣のオーバル・マイダンを挟んでアールデコ建築群も広がっており、建築好きには堪らないエリアです。\n\n" +
            "「ムンバイ・フォートエリアの街歩き」で、主要建築の位置と効率的な巡回ルートを紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "ムンバイのベストシーズンは11月〜2月の冬季で、気温が25〜30度と比較的過ごしやすいです。モンスーン期（6〜9月）は激しい雨で街歩きには不向きですが、独特の雰囲気があります。\n\n" +
            "南ムンバイのコラバ〜フォートエリアは徒歩で回れます。それ以外のエリアへはムンバイローカル列車またはOla/Uberが便利です。インドではGoogle Mapsが正確に動作し、Uberも利用可能です。eSIMを事前に設定しておけば到着後すぐに使えます。",
        },
      ],
      [
        { q: "ムンバイの街歩きに何日必要ですか?", a: "コラバとフォートエリアで丸1日です。ダラヴィやバンドラも歩くなら2日がおすすめです。" },
        { q: "暑さや人混みへの対策は?", a: "朝7時台に歩き始め、正午までには屋内に入るのがベストです。人混みは避けられないので、貴重品は体の前で管理してください。" },
        { q: "英語は通じますか?", a: "はい。ムンバイは英語がビジネス言語として定着しており、観光エリアでは問題なく通じます。" },
      ],
      "india",
    ),
    en: en(
      "Mumbai Neighborhood Walks 2026 | Colaba and Fort Area",
      "Two Mumbai walking routes: Colaba's Gateway of India waterfront and the Fort area's Victorian Gothic and Art Deco heritage buildings.",
      MUMBAI_IMAGES[0],
      MUMBAI_IMAGES,
      [
        { url: "https://x.com/mumbaiwalks/status/1780000000000000023", label: "Gateway of India morning" },
        { url: "https://x.com/bombayfood/status/1780000000000000024", label: "Fort area cafe" },
      ],
      [
        {
          heading: "Mumbai walking is colonial architecture meets the sea",
          body:
            "Mumbai is India's largest city, with its Victorian Gothic and Art Deco buildings holding UNESCO World Heritage status. Colaba district starts at the Gateway of India with a waterfront walk past the Taj Mahal Palace Hotel. The Fort area clusters Gothic-style public buildings around Chhatrapati Shivaji Maharaj Terminus.\n\n" +
            "This page covers two routes, both in south Mumbai, both walkable on foot.",
        },
        {
          heading: "Colaba: Gateway of India to the waterfront",
          body:
            "Colaba is Mumbai's southernmost district, anchored by the Gateway of India. Walking north along Colaba Causeway passes cafes, bookshops, and curio stores. Leopold Cafe, open since 1871, is a landmark stop. Combining with a morning Marine Drive (Queen's Necklace) walk adds Mumbai's oceanfront openness.\n\n" +
            "The Mumbai Colaba walk covers the waterfront route and cafe stops.",
        },
        {
          heading: "Fort area: Gothic and Art Deco density",
          body:
            "The Fort area centers on Chhatrapati Shivaji Maharaj Terminus (CST), surrounded by Victorian Gothic public buildings. Mumbai University, the High Court, and Flora Fountain are all within walking distance. Across Oval Maidan, the Art Deco building cluster adds another architectural layer.\n\n" +
            "The Mumbai Fort area walk covers building locations and an efficient loop route.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "Mumbai's best walking months are November to February when temperatures stay around 25-30C. The monsoon (June to September) brings heavy rain that makes walking difficult, though it has its own atmosphere.\n\n" +
            "Colaba and the Fort area are walkable on foot. For other areas, Mumbai local trains or Ola/Uber work well. Google Maps is accurate in India and Uber is available. Set up an eSIM before departure for immediate connectivity.",
        },
      ],
      [
        { q: "How many days do I need for Mumbai walking?", a: "Colaba and the Fort area fill one full day. Add a second day for Dharavi or Bandra." },
        { q: "How do I handle heat and crowds?", a: "Start walking by 7 AM and be indoors by noon. Crowds are unavoidable, so keep valuables in front of your body." },
        { q: "Is English widely spoken?", a: "Yes. English is Mumbai's business language and works well in tourist areas." },
      ],
      "india",
    ),
  },

  // ── 13. Delhi ──────────────────────────────────────────────────────
  "delhi-neighborhood-walks": {
    ja: ja(
      "デリーの街歩きガイド 2026 | オールドデリー・チャンドニーチョウクとローディーガーデン",
      "オールドデリーのチャンドニーチョウク市場散策とローディーガーデンのムガル朝遺跡散歩をまとめたデリーの街歩きガイドです。",
      DELHI_IMAGES[0],
      DELHI_IMAGES,
      [
        { url: "https://x.com/delhiheritage/status/1780000000000000025", label: "チャンドニーチョウクの賑わい" },
        { url: "https://x.com/delhiwalks/status/1780000000000000026", label: "ローディーガーデンの朝" },
      ],
      [
        {
          heading: "デリーの街歩きは「ムガルの混沌とイギリスの秩序」の対比",
          body:
            "デリーはオールドデリーとニューデリーという全く異なる2つの都市が結合した首都です。オールドデリーのチャンドニーチョウクはムガル帝国時代から続く巨大市場で、香辛料、宝石、布地、菓子の専門通りが迷路のように広がっています。対照的に、ニューデリーのローディーガーデンはムガル朝以前のロディ朝時代の墓廟が緑豊かな公園の中に点在する、デリーで最も平和なグリーンスペースです。\n\n" +
            "このページでは2つのルートを紹介しています。メトロで30分以内に移動でき、1日で両方回ることも可能です。",
        },
        {
          heading: "オールドデリー・チャンドニーチョウク: ムガルの市場迷路",
          body:
            "チャンドニーチョウクはメトロ・チャンドニーチョウク駅が最寄りで、レッドフォート（ラール・キラー）の正面から西に延びる大通りです。通り沿いに香辛料のカリバオリ市場、銀細工のダリバカラン、菓子のオールドフェイマス・ジャレビワラなどの名物スポットが並びます。ジャマー・マスジド（金曜モスク）はインド最大のモスクで、屋上からオールドデリーの全景を見渡せます。\n\n" +
            "「デリー・チャンドニーチョウクの街歩き」で、市場の攻略ルートと名物グルメを紹介しています。",
        },
        {
          heading: "ローディーガーデン: ムガル以前の墓廟と緑の散歩",
          body:
            "ローディーガーデンはメトロ・ジョール・バーグ駅から徒歩10分の都市公園で、15世紀のロディ朝時代の墓廟がいくつも点在しています。早朝はジョガーやヨガを楽しむ地元住民で賑わい、デリーで最もリラックスした朝の時間を過ごせます。バラ・グンバド（大きなドーム）やシカンダル・ローディーの墓など、建築的にも見応えがあります。\n\n" +
            "「デリー・ローディーガーデンの散歩」で、園内の墓廟ルートと朝のベストタイミングを紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "デリーのベストシーズンは10月〜3月の冬季で、日中の気温が20〜25度と快適です。4〜6月は40度を超える酷暑、7〜9月はモンスーンで蒸し暑くなります。\n\n" +
            "デリーメトロは市内をほぼカバーしており、主要観光地へのアクセスは容易です。タクシーはOla/Uberが便利で、オートリキシャも短距離移動に使えます。Google Mapsが正確に動作するため、eSIMを事前に設定しておくと移動がスムーズです。",
        },
      ],
      [
        { q: "デリーの街歩きに何日必要ですか?", a: "チャンドニーチョウクとローディーガーデンで1日です。フマユーン廟やコンノートプレイスも回るなら2日がおすすめです。" },
        { q: "チャンドニーチョウクの治安は大丈夫ですか?", a: "日中は安全ですが、人混みでのスリに注意してください。貴重品は体の前で管理し、高価なカメラの取り扱いには気をつけましょう。" },
        { q: "オートリキシャの値段交渉は必要ですか?", a: "はい。メーターを使わない場合が多いので、乗車前に行き先と料金を確認してください。Ola/Uberを使えば料金交渉は不要です。" },
      ],
      "india",
    ),
    en: en(
      "Delhi Neighborhood Walks 2026 | Old Delhi Chandni Chowk and Lodhi Garden",
      "Two Delhi walking routes: Chandni Chowk's Mughal-era bazaar labyrinth and Lodhi Garden's tomb-studded green space.",
      DELHI_IMAGES[0],
      DELHI_IMAGES,
      [
        { url: "https://x.com/delhiheritage/status/1780000000000000025", label: "Chandni Chowk bustle" },
        { url: "https://x.com/delhiwalks/status/1780000000000000026", label: "Lodhi Garden morning" },
      ],
      [
        {
          heading: "Delhi walking contrasts Mughal chaos with British order",
          body:
            "Delhi is two completely different cities fused into one capital. Old Delhi's Chandni Chowk is a massive Mughal-era bazaar where spice, jewelry, fabric, and sweets streets extend like a labyrinth. New Delhi's Lodhi Garden places pre-Mughal Lodi dynasty tombs inside one of the city's most peaceful green spaces.\n\n" +
            "This page covers two routes. They are about 30 minutes apart by metro, and both fit into a single day.",
        },
        {
          heading: "Old Delhi Chandni Chowk: Mughal market labyrinth",
          body:
            "Chandni Chowk starts at Metro Chandni Chowk station, with the boulevard running west from Red Fort. Khari Baoli spice market, Dariba Kalan silver bazaar, and Old Famous Jalebi Wala sweets anchor the route. Jama Masjid, India's largest mosque, offers rooftop views over Old Delhi's skyline.\n\n" +
            "The Delhi Chandni Chowk walk covers market routing and signature food stops.",
        },
        {
          heading: "Lodhi Garden: pre-Mughal tombs in green space",
          body:
            "Lodhi Garden is a 10-minute walk from Metro Jor Bagh station. The park scatters 15th-century Lodi dynasty tombs across landscaped grounds. Early mornings bring joggers and yoga practitioners, making it Delhi's most relaxed start to the day. Bara Gumbad and Sikandar Lodi's Tomb are architecturally noteworthy.\n\n" +
            "The Delhi Lodhi Garden walk covers the tomb route and best morning timing.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "Delhi's best months are October to March when daytime temperatures stay around 20-25C. April to June is extreme heat above 40C, and July to September brings humid monsoon weather.\n\n" +
            "Delhi Metro covers most of the city and reaches major tourist sites. Ola and Uber handle taxis, and auto-rickshaws work for short hops. Google Maps is accurate in India, so an eSIM set up before arrival keeps navigation smooth.",
        },
      ],
      [
        { q: "How many days do I need for Delhi walking?", a: "Chandni Chowk and Lodhi Garden fill one day. Add a second for Humayun's Tomb and Connaught Place." },
        { q: "Is Chandni Chowk safe?", a: "Daytime is safe, but watch for pickpockets in crowds. Keep valuables in front and be careful with expensive cameras." },
        { q: "Do I need to negotiate auto-rickshaw fares?", a: "Yes, meters are often unused. Agree on destination and price before boarding. Ola or Uber eliminates the negotiation." },
      ],
      "india",
    ),
  },

  // ── 14. Istanbul ──────────────────────────────────────────────────
  "istanbul-neighborhood-walks": {
    ja: ja(
      "イスタンブールの街歩きガイド 2026 | バラット・フェネルとカドゥキョイ",
      "イスタンブール旧市街のバラット・フェネル地区のカラフルな路地歩きとアジア側カドゥキョイの食文化散歩をまとめたガイドです。",
      ISTANBUL_IMAGES[0],
      ISTANBUL_IMAGES,
      [
        { url: "https://x.com/istanbulwalks/status/1780000000000000027", label: "バラットのカラフルな家" },
        { url: "https://x.com/kadikoylife/status/1780000000000000028", label: "カドゥキョイの市場" },
      ],
      [
        {
          heading: "イスタンブールの街歩きは「ヨーロッパとアジアの交差点」",
          body:
            "イスタンブールはボスポラス海峡を挟んでヨーロッパ側とアジア側に分かれた世界で唯一の大陸横断都市です。観光の中心はスルタンアフメット地区（ブルーモスク、アヤソフィア）ですが、街歩きが面白いのはその外側です。バラット・フェネル地区はゴールデンホーン（金角湾）沿いのパステルカラーの木造家屋が並ぶエリアで、Instagram以前から写真家を惹きつけてきました。アジア側のカドゥキョイはフェリーで渡る食の街で、市場と路地が最高の食文化散歩を提供します。\n\n" +
            "このページでは2つのルートを紹介しています。バラットはメトロで、カドゥキョイはフェリーでアクセスできます。",
        },
        {
          heading: "バラット・フェネル: 金角湾沿いのカラフルな坂道",
          body:
            "バラット・フェネルは金角湾の南岸に位置するエリアで、ギリシャ正教の総主教庁やブルガリア正教会の鉄の教会など、多宗教の歴史遺産が点在しています。パステルカラーの木造家屋が坂道に沿って並ぶ風景は、イスタンブールで最もフォトジェニックな光景のひとつです。メトロM1号線のフェネル・バラット駅が最寄りです。\n\n" +
            "「イスタンブール・バラット・フェネルの街歩き」で、カラフルな通りと歴史的建築の巡り方を紹介しています。",
        },
        {
          heading: "カドゥキョイ: アジア側の食文化と市場散歩",
          body:
            "カドゥキョイはボスポラス海峡をフェリーで渡ったアジア側の港町で、カドゥキョイ市場を中心に新鮮な食材、スパイス、チーズ、オリーブの店が密集しています。市場周辺のモダ地区にはカフェやアンティークショップが並び、地元のイスタンブール市民が週末を過ごすリラックスした雰囲気があります。エミノニュ桟橋からフェリーで約20分です。\n\n" +
            "「イスタンブール・カドゥキョイの街歩き」で、市場の回り方とモダ地区の散策ルートを紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "イスタンブールのベストシーズンは4月〜6月と9月〜11月です。夏（7〜8月）は暑く観光客も多い、冬（12〜2月）は寒いですが観光客が少なく独特の雰囲気があります。\n\n" +
            "イスタンブールカード（ICカード）があればメトロ、トラム、バス、フェリーすべてで使えます。Grab は利用できませんが、BiTaksi アプリがタクシー配車に使えます。eSIMを事前に設定しておけば、フェリーの時刻確認や地図検索がスムーズです。",
        },
      ],
      [
        { q: "イスタンブールの街歩きに何日必要ですか?", a: "バラットとカドゥキョイで丸1日です。スルタンアフメット地区も含めるなら2〜3日がおすすめです。" },
        { q: "フェリーのチケットはどうやって買いますか?", a: "イスタンブールカードをチャージしてフェリー乗り場の改札にタッチするだけです。カードはメトロ駅の自動販売機で購入できます。" },
        { q: "トルコ語は必要ですか?", a: "観光エリアでは英語が通じますが、カドゥキョイ市場など地元密着のエリアではトルコ語が主です。Google翻訳で十分対応できます。" },
      ],
      "turkey",
    ),
    en: en(
      "Istanbul Neighborhood Walks 2026 | Balat-Fener and Kadikoy",
      "Two Istanbul walking routes: Balat-Fener's colorful hillside lanes on the European side, and Kadikoy's food-market streets on the Asian side.",
      ISTANBUL_IMAGES[0],
      ISTANBUL_IMAGES,
      [
        { url: "https://x.com/istanbulwalks/status/1780000000000000027", label: "Balat colorful houses" },
        { url: "https://x.com/kadikoylife/status/1780000000000000028", label: "Kadikoy market" },
      ],
      [
        {
          heading: "Istanbul walking crosses the Europe-Asia divide",
          body:
            "Istanbul is the world's only major city spanning two continents, split by the Bosphorus Strait. The tourist center is Sultanahmet (Blue Mosque, Hagia Sophia), but the best walking happens beyond it. Balat-Fener lines pastel-colored wooden houses along the Golden Horn, a neighborhood that attracted photographers long before Instagram. Kadikoy on the Asian side is a food city reached by ferry, where markets and lanes deliver some of Istanbul's best street-food walking.\n\n" +
            "This page covers two routes. Balat is reachable by metro, Kadikoy by ferry.",
        },
        {
          heading: "Balat-Fener: colorful hillside along the Golden Horn",
          body:
            "Balat-Fener sits on the Golden Horn's south bank, scattering Greek Orthodox and Bulgarian Iron Church heritage among pastel wooden houses climbing the hillside. The streetscape is one of Istanbul's most photogenic. Metro M1 Fener-Balat station is nearest.\n\n" +
            "The Istanbul Balat-Fener walk covers the colorful streets and historic buildings.",
        },
        {
          heading: "Kadikoy: Asian-side food culture and market walk",
          body:
            "Kadikoy is an Asian-side port neighborhood reached by ferry from Eminonu pier in about 20 minutes. Kadikoy Market clusters fresh produce, spices, cheese, and olive vendors. The nearby Moda district adds cafes and antique shops in a relaxed weekend atmosphere popular with local Istanbulites.\n\n" +
            "The Istanbul Kadikoy walk covers market routing and the Moda extension.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "Istanbul's best months are April to June and September to November. Summer (July to August) is hot and crowded, while winter (December to February) is cold but quieter.\n\n" +
            "An Istanbulkart covers metro, tram, bus, and ferry. Grab is not available, but the BiTaksi app handles taxi booking. An eSIM set up before arrival helps with ferry schedules and map navigation.",
        },
      ],
      [
        { q: "How many days do I need for Istanbul walking?", a: "Balat and Kadikoy fill one full day. Add 2-3 days to include Sultanahmet and the Grand Bazaar area." },
        { q: "How do I buy ferry tickets?", a: "Load an Istanbulkart and tap at the ferry terminal turnstile. Cards are sold at metro station vending machines." },
        { q: "Do I need Turkish?", a: "English works in tourist areas. Kadikoy Market is mainly Turkish, but Google Translate handles the gap." },
      ],
      "turkey",
    ),
  },

  // ── 15. Tainan ────────────────────────────────────────────────────
  "tainan-neighborhood-walks": {
    ja: ja(
      "台南の街歩きガイド 2026 | 安平古堡と神農街のルート",
      "台南の安平古堡オランダ要塞散歩と神農街のレトロ商店街をまとめた街歩きガイドです。台湾最古の街を歩きます。",
      TAINAN_IMAGES[0],
      TAINAN_IMAGES,
      [
        { url: "https://x.com/tainaneats/status/1780000000000000029", label: "神農街の夜景" },
        { url: "https://x.com/taiwanwalks/status/1780000000000000030", label: "安平のオランダ要塞" },
      ],
      [
        {
          heading: "台南は「台湾の食の都」であり「最古の街」",
          body:
            "台南は台湾で最も古い都市で、オランダ統治時代（17世紀）からの歴史を持ちます。台湾料理の発祥地とも言われ、担仔麺、棺桶パン、豆花、牛肉湯など名物が尽きません。安平地区はオランダ東インド会社が築いた安平古堡（ゼーランディア城）を中心とした歴史エリア、神農街は清朝時代の商店街をレトロにリノベーションした人気の散策スポットです。\n\n" +
            "このページでは2つのルートを紹介しています。台南駅からバスまたはタクシーで20分以内にアクセスできます。",
        },
        {
          heading: "安平古堡: オランダ要塞と海沿いの歴史散歩",
          body:
            "安平古堡は1624年にオランダ人が築いた台湾最古の要塞で、レンガ造りの城壁と展望台からは安平港を見渡せます。周辺の安平老街は伝統的な菓子や蝦捲（エビ巻き）の店が並ぶ食べ歩きストリートです。安平樹屋（ガジュマルに覆われた旧倉庫）も徒歩圏内の見どころです。\n\n" +
            "「台南・安平古堡の街歩き」で、要塞の見どころと食べ歩きルートを紹介しています。",
        },
        {
          heading: "神農街: レトロ商店街のフォトウォーク",
          body:
            "神農街は台南中心部にある約100mの短い通りで、清朝時代の商店建築をリノベーションしたカフェ、ギャラリー、雑貨店が並んでいます。夜になると提灯が灯り、台南で最もフォトジェニックな通りになります。周辺には水仙宮市場や薬王廟など歴史スポットも点在しています。\n\n" +
            "「台南・神農街の街歩き」で、通りの散策と周辺スポットの巡り方を紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "台南のベストシーズンは10月〜4月で、気温が20〜25度と快適です。5月〜9月は暑く、台風シーズン（7〜9月）には注意が必要です。\n\n" +
            "台南市内の移動はバスが便利ですが、本数が少ないエリアもあるため、タクシーやレンタル自転車（T-Bike）も活用できます。台湾ではGoogle Mapsが正確に動作し、LINEも普通に使えます。eSIMを事前に設定しておけば到着後すぐにナビゲーションが使えます。",
        },
      ],
      [
        { q: "台南の街歩きに何日必要ですか?", a: "安平と神農街で丸1日です。台南のグルメ巡りも入れるなら2日がおすすめです。" },
        { q: "台北から台南へのアクセスは?", a: "台湾高速鉄道（新幹線）で台北から台南まで約1時間45分です。高鉄台南駅から市内へはシャトルバスで約30分です。" },
        { q: "日本語は通じますか?", a: "観光地では一部通じることがありますが、基本は中国語です。Google翻訳やeSIMでのナビ利用が安心です。" },
      ],
      "taiwan",
    ),
    en: en(
      "Tainan Neighborhood Walks 2026 | Anping Old Fort and Shennong Street",
      "Two Tainan walking routes: Anping Old Fort's Dutch-era history walk and Shennong Street's restored Qing-dynasty shophouses. Taiwan's oldest city on foot.",
      TAINAN_IMAGES[0],
      TAINAN_IMAGES,
      [
        { url: "https://x.com/tainaneats/status/1780000000000000029", label: "Shennong Street at night" },
        { url: "https://x.com/taiwanwalks/status/1780000000000000030", label: "Anping Dutch fort" },
      ],
      [
        {
          heading: "Tainan is Taiwan's food capital and oldest city",
          body:
            "Tainan is Taiwan's oldest city, with history stretching back to Dutch colonial rule in the 17th century. It is often called the birthplace of Taiwanese cuisine: danzai noodles, coffin bread, douhua, and beef soup are just the beginning. Anping district centers on Anping Old Fort (Fort Zeelandia), built by the Dutch East India Company. Shennong Street is a Qing-dynasty commercial lane restored into a lantern-lit photo walk.\n\n" +
            "This page covers two routes, both reachable from Tainan Station by bus or taxi within 20 minutes.",
        },
        {
          heading: "Anping Old Fort: Dutch fortress and seaside history",
          body:
            "Anping Old Fort was built by the Dutch in 1624 and is Taiwan's oldest fortress. Its brick walls and observation tower overlook Anping Harbor. Anping Old Street nearby lines up traditional snack shops selling shrimp rolls and sweets. The Anping Tree House, a former warehouse engulfed by banyan roots, is within walking distance.\n\n" +
            "The Tainan Anping walk covers the fort sights and food-stall routing.",
        },
        {
          heading: "Shennong Street: retro shophouse photo walk",
          body:
            "Shennong Street is a roughly 100-meter lane in central Tainan lined with restored Qing-dynasty shophouses converted into cafes, galleries, and sundry shops. After dark, hanging lanterns turn it into Tainan's most photogenic street. Nearby Shuixian Temple Market and the Medicine King Temple add historical depth.\n\n" +
            "The Tainan Shennong Street walk covers the lane itself and surrounding sights.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "Tainan's best months are October to April, with temperatures around 20-25C. May to September is hot, and typhoon season (July to September) requires weather monitoring.\n\n" +
            "City buses cover Tainan but frequencies vary by area. Taxis and T-Bike (rental bicycles) fill the gaps. Google Maps works accurately in Taiwan and LINE is the main messaging app. An eSIM set up before departure enables immediate navigation.",
        },
      ],
      [
        { q: "How many days do I need for Tainan?", a: "Anping and Shennong Street fill one day. Add a second day for deeper food exploration." },
        { q: "How do I get from Taipei to Tainan?", a: "Taiwan High Speed Rail takes about 1 hour 45 minutes from Taipei. A shuttle bus runs from HSR Tainan Station to the city center in about 30 minutes." },
        { q: "Is Japanese or English spoken?", a: "Some Japanese is understood in tourist spots, but Chinese is the main language. Google Translate and an eSIM for navigation are recommended." },
      ],
      "taiwan",
    ),
  },

  // ── 16. Colombo ───────────────────────────────────────────────────
  "colombo-neighborhood-walks": {
    ja: ja(
      "コロンボの街歩きガイド 2026 | フォート・ペター地区とゴールフェイス",
      "コロンボのフォート・ペター地区の植民地建築と市場散歩、ゴールフェイス・グリーンの海辺散歩をまとめたガイドです。",
      COLOMBO_IMAGES[0],
      COLOMBO_IMAGES,
      [
        { url: "https://x.com/srilankawalks/status/1780000000000000031", label: "フォート地区の建築" },
        { url: "https://x.com/colombolife/status/1780000000000000032", label: "ゴールフェイスの夕暮れ" },
      ],
      [
        {
          heading: "コロンボの街歩きは「植民地建築と海岸線」の2軸",
          body:
            "コロンボはスリランカの商業首都で、ポルトガル、オランダ、イギリスの植民地支配を経た多層的な歴史を持つ港町です。フォート地区はイギリス統治時代のコロニアル建築が残るビジネス中心地、隣接するペター地区はスリランカ最大の市場街で、香辛料、布地、電気製品の屋台が道路を埋め尽くしています。ゴールフェイス・グリーンはインド洋沿いの広大な芝生広場で、夕方の散歩と屋台グルメが楽しめるコロンボ市民の憩いの場です。\n\n" +
            "このページでは2つのルートを紹介しています。フォート〜ペターは徒歩、ゴールフェイスはトゥクトゥクで10分程度です。",
        },
        {
          heading: "フォート・ペター地区: 植民地建築と大市場の散歩",
          body:
            "フォート地区はコロンボ・フォート駅が最寄りで、旧国会議事堂、ライトハウス・クロックタワー、オランダ改革教会などのコロニアル建築が集まっています。南に隣接するペター地区に入ると雰囲気が一変し、スリランカ最大の屋外市場が広がります。ペター浮遊市場（フローティングマーケット）は新しい観光名所です。\n\n" +
            "「コロンボ・フォート・ペター地区の街歩き」で、建築散策と市場の攻略ルートを紹介しています。",
        },
        {
          heading: "ゴールフェイス・グリーン: インド洋沿いの夕方散歩",
          body:
            "ゴールフェイス・グリーンはコロンボ中心部のインド洋沿いに広がる約500mの芝生広場で、夕方になると地元住民や観光客で賑わいます。凧揚げ、クリケット、屋台のクトゥロティ（刻んだロティの炒め物）やワデ（豆のフリッター）が楽しめます。ゴールフェイスホテルは1864年創業のコロニアルホテルで、テラスでのサンセットドリンクも魅力です。\n\n" +
            "「コロンボ・ゴールフェイスの散歩」で、夕方のベストタイミングと屋台グルメを紹介しています。",
        },
        {
          heading: "ベストシーズンと交通・eSIM情報",
          body:
            "コロンボのベストシーズンは12月〜3月の乾季です。5月〜9月は南西モンスーンの影響で雨が多くなります。年間を通じて暑いため、朝か夕方の散歩がおすすめです。\n\n" +
            "コロンボ市内の移動はトゥクトゥク（三輪タクシー）が便利で、PickMe アプリで配車できます。Grabは使えません。Google Mapsの精度はやや低い場所もあるため、複数の地図アプリを併用するのがおすすめです。eSIMを事前に設定しておけば到着後すぐにナビゲーションが使えます。",
        },
      ],
      [
        { q: "コロンボの街歩きに何日必要ですか?", a: "フォート・ペターとゴールフェイスで1日です。ガンガラーマ寺院やナショナルミュージアムも回るなら2日がおすすめです。" },
        { q: "トゥクトゥクの料金は?", a: "市内の短距離移動で200〜500ルピー程度です。PickMeアプリを使えばメーター制で安心です。" },
        { q: "英語は通じますか?", a: "はい。スリランカは英語が公用語のひとつで、コロンボの観光エリアでは広く通じます。" },
      ],
      "sri-lanka",
    ),
    en: en(
      "Colombo Neighborhood Walks 2026 | Fort-Pettah and Galle Face Green",
      "Two Colombo walking routes: Fort-Pettah's colonial buildings and massive bazaar, plus Galle Face Green's oceanfront sunset promenade.",
      COLOMBO_IMAGES[0],
      COLOMBO_IMAGES,
      [
        { url: "https://x.com/srilankawalks/status/1780000000000000031", label: "Fort district architecture" },
        { url: "https://x.com/colombolife/status/1780000000000000032", label: "Galle Face sunset" },
      ],
      [
        {
          heading: "Colombo walking runs on colonial architecture and coastline",
          body:
            "Colombo is Sri Lanka's commercial capital, a port city layered by Portuguese, Dutch, and British colonial rule. The Fort district preserves British-era colonial buildings in the business center. Adjacent Pettah is Sri Lanka's largest bazaar, where spice, fabric, and electronics stalls fill every street. Galle Face Green is a vast oceanfront lawn where evening strolls and street-food stalls draw locals and visitors.\n\n" +
            "This page covers two routes. Fort-Pettah is walkable on foot, and Galle Face is about 10 minutes away by tuk-tuk.",
        },
        {
          heading: "Fort-Pettah: colonial buildings and the great bazaar",
          body:
            "The Fort district is nearest to Colombo Fort railway station, clustering the Old Parliament Building, Lighthouse Clock Tower, and Dutch Reformed Church. Step south into Pettah and the atmosphere transforms into Sri Lanka's largest outdoor market. The Pettah Floating Market is a newer attraction.\n\n" +
            "The Colombo Fort-Pettah walk covers architecture and market routing.",
        },
        {
          heading: "Galle Face Green: Indian Ocean sunset walk",
          body:
            "Galle Face Green is a roughly 500-meter lawn along the Indian Ocean in central Colombo. Evenings bring locals and tourists flying kites, playing cricket, and eating kottu roti and vadai from stalls. The Galle Face Hotel, open since 1864, offers sunset drinks on its colonial terrace.\n\n" +
            "The Colombo Galle Face walk covers the best evening timing and street-food picks.",
        },
        {
          heading: "Best season, transport, and eSIM tips",
          body:
            "Colombo's best months are the dry season from December to March. The southwest monsoon (May to September) brings heavier rain. It stays hot year-round, making morning or evening walks ideal.\n\n" +
            "Tuk-tuks are the standard Colombo transport. The PickMe app handles ride-hailing since Grab is unavailable. Google Maps accuracy varies, so using multiple map apps is recommended. Set up an eSIM before departure for immediate navigation.",
        },
      ],
      [
        { q: "How many days do I need for Colombo walking?", a: "Fort-Pettah and Galle Face fill one day. Add a second for Gangaramaya Temple and the National Museum." },
        { q: "How much do tuk-tuks cost?", a: "Short city rides cost 200-500 LKR. The PickMe app uses metered pricing for transparency." },
        { q: "Is English widely spoken?", a: "Yes. English is one of Sri Lanka's official languages and works well in Colombo's tourist areas." },
      ],
      "sri-lanka",
    ),
  },
};

export const HUBS_ASIA_SLUGS = Object.keys(HUBS_ASIA_CONTENT);

export const HUBS_ASIA_RELATED: Record<string, string[]> = {
  "bangkok-neighborhood-walks": [
    "rattanakosin",
    "chinatown-yaowarat",
    "thonburi-canal",
    "ari",
    "bang-rak-creative",
  ],
  "chiang-mai-neighborhood-walks": [
    "old-city-temple",
    "nimmanhaemin",
    "riverside",
  ],
  "hanoi-neighborhood-walks": [
    "old-quarter",
    "west-lake-morning",
    "french-quarter",
  ],
  "hcmc-neighborhood-walks": [
    "district-1",
    "cholon-chinatown",
  ],
  "singapore-neighborhood-walks": [
    "kampong-glam",
    "tiong-bahru",
  ],
  "hongkong-neighborhood-walks": [
    "sheung-wan",
    "sham-shui-po",
    "sai-kung",
  ],
  "kuala-lumpur-neighborhood-walks": [
    "chinatown",
    "brickfields",
    "kampung-baru",
  ],
  "bali-neighborhood-walks": [
    "ubud-rice-terrace",
    "seminyak-beach",
    "sanur-morning",
  ],
  "shanghai-neighborhood-walks": [
    "french-concession",
    "bund",
    "tianzifang",
  ],
  "beijing-neighborhood-walks": [
    "hutong",
    "798-art-district",
    "houhai-lake",
  ],
  "penang-neighborhood-walks": [
    "george-town",
    "armenian-street",
  ],
  "mumbai-neighborhood-walks": [
    "colaba",
    "fort-area",
  ],
  "delhi-neighborhood-walks": [
    "old-delhi-chandni-chowk",
    "lodhi-garden",
  ],
  "istanbul-neighborhood-walks": [
    "balat-fener",
    "kadikoy",
  ],
  "tainan-neighborhood-walks": [
    "anping-old-fort",
    "shennong-street",
  ],
  "colombo-neighborhood-walks": [
    "fort-pettah",
    "galle-face",
  ],
};
