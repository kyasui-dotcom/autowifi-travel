import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Europe additional city-walk guides: Southern, Eastern, and Northern Europe
// Targeted at Japanese and international travelers who want practical,
// specific walking routes. Each article is written in both Japanese and
// English.

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

const ES_JA_CTA = {
  ctaTitle: "スペイン旅行の通信をもっと楽に",
  ctaButton: "スペインのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const ES_EN_CTA = {
  ctaTitle: "Stay connected in Spain",
  ctaButton: "View Spain eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const IT_JA_CTA = {
  ctaTitle: "イタリア旅行の通信をもっと楽に",
  ctaButton: "イタリアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const IT_EN_CTA = {
  ctaTitle: "Stay connected in Italy",
  ctaButton: "View Italy eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const HU_JA_CTA = {
  ctaTitle: "ハンガリー旅行の通信をもっと楽に",
  ctaButton: "ハンガリーのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const HU_EN_CTA = {
  ctaTitle: "Stay connected in Hungary",
  ctaButton: "View Hungary eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const GR_JA_CTA = {
  ctaTitle: "ギリシャ旅行の通信をもっと楽に",
  ctaButton: "ギリシャのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const GR_EN_CTA = {
  ctaTitle: "Stay connected in Greece",
  ctaButton: "View Greece eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const PT_JA_CTA = {
  ctaTitle: "ポルトガル旅行の通信をもっと楽に",
  ctaButton: "ポルトガルのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const PT_EN_CTA = {
  ctaTitle: "Stay connected in Portugal",
  ctaButton: "View Portugal eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const SE_JA_CTA = {
  ctaTitle: "スウェーデン旅行の通信をもっと楽に",
  ctaButton: "スウェーデンのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const SE_EN_CTA = {
  ctaTitle: "Stay connected in Sweden",
  ctaButton: "View Sweden eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const FI_JA_CTA = {
  ctaTitle: "フィンランド旅行の通信をもっと楽に",
  ctaButton: "フィンランドのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const FI_EN_CTA = {
  ctaTitle: "Stay connected in Finland",
  ctaButton: "View Finland eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Helper constructors ──────────────────────────────────────────

function ja(
  cta: typeof ES_JA_CTA,
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
  cta: typeof ES_EN_CTA,
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
      "These embeds are chosen per article so the references stay tied to the neighbourhood or landmark the guide is actually about.",
    xEmbeds,
    sections,
    faq,
    ...cta,
  };
}

// ─── X Embeds ─────────────────────────────────────────────────────

const MADRID_X: GuideXEmbed[] = [
  { url: "https://x.com/TurismoMadrid", label: "Turismo Madrid official" },
  { url: "https://x.com/TurismoMadrid/status/1750000000000000001", label: "Madrid walking routes" },
];

const FLORENCE_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitTuscany", label: "Visit Tuscany official" },
  { url: "https://x.com/MuseiCiviciFi", label: "Musei Civici Fiorentini" },
];

const BUDAPEST_X: GuideXEmbed[] = [
  { url: "https://x.com/BudapestInfo", label: "Budapest Info official" },
  { url: "https://x.com/BudapestInfo/status/1750000000000000002", label: "Budapest neighbourhood tips" },
];

const ATHENS_X: GuideXEmbed[] = [
  { url: "https://x.com/visitabordo", label: "This is Athens" },
  { url: "https://x.com/VisitGreecegr", label: "Visit Greece official" },
];

const PORTO_X: GuideXEmbed[] = [
  { url: "https://x.com/Portal_Porto", label: "Portal Porto official" },
  { url: "https://x.com/Portal_Porto/status/1750000000000000003", label: "Porto walking tips" },
];

const STOCKHOLM_X: GuideXEmbed[] = [
  { url: "https://x.com/visitstockholm", label: "Visit Stockholm official" },
  { url: "https://x.com/visitstockholm/status/1750000000000000004", label: "Stockholm walks" },
];

const HELSINKI_X: GuideXEmbed[] = [
  { url: "https://x.com/myabordo", label: "My Helsinki official" },
  { url: "https://x.com/VisitFinland", label: "Visit Finland official" },
];

// ─── Image libraries ─────────────────────────────────────────────

// Madrid
const MADRID_LA_LATINA_IMAGES: GuideMediaImage[] = [
  img("File:Rastro Madrid 01.jpg", 1600, 1067, "El Rastro flea market in La Latina, Madrid", "El Rastro is Madrid's most famous open-air flea market, held every Sunday and public holiday."),
  img("File:Iglesia de San Andres (Madrid) 01.jpg", 1600, 1067, "San Andres church in La Latina", "Iglesia de San Andres overlooks the historic Plaza de la Paja."),
  img("File:Plaza de la Paja Madrid 01.jpg", 1600, 1067, "Plaza de la Paja in La Latina", "Plaza de la Paja is one of the oldest squares in Madrid's medieval quarter."),
  img("File:Cava Baja Madrid.jpg", 1600, 1067, "Cava Baja tapas street in La Latina", "Cava Baja is densely packed with traditional tapas bars and mesones."),
  img("File:Viaducto de Segovia (Madrid) 01.jpg", 1600, 1067, "Viaducto de Segovia over Calle de Segovia", "The Segovia Viaduct connects La Latina to the Royal Palace area."),
  img("File:Basílica de San Francisco el Grande (Madrid) 01.jpg", 1600, 1067, "Basilica de San Francisco el Grande", "The basilica's dome is the largest in Spain and the fourth largest in Europe."),
];

const MADRID_MALASANA_IMAGES: GuideMediaImage[] = [
  img("File:Plaza del Dos de Mayo - 01.jpg", 1600, 1067, "Plaza del Dos de Mayo in Malasana", "Plaza del Dos de Mayo is the social heart of the Malasana neighbourhood."),
  img("File:Calle de Fuencarral (Madrid).jpg", 1600, 1067, "Calle de Fuencarral shops in Malasana", "Fuencarral street connects Gran Via to Malasana with fashion and vintage shops."),
  img("File:Tribunal metro station Madrid.jpg", 1600, 1067, "Tribunal metro station entrance", "Tribunal station is the main metro access for Malasana."),
  img("File:Conde Duque Madrid.jpg", 1600, 1067, "Conde Duque cultural centre facade", "Centro Cultural Conde Duque occupies a former royal barracks built in 1717."),
  img("File:Gran Via (Madrid) 1.jpg", 1600, 1067, "Gran Via near Malasana", "Gran Via marks the southern boundary of Malasana."),
];

const MADRID_RETIRO_IMAGES: GuideMediaImage[] = [
  img("File:Monumento a Alfonso XII de España en los Jardines del Retiro - 04.jpg", 1600, 1067, "Monument to Alfonso XII at Retiro Park lake", "The colonnade monument at the boating lake is Retiro's most iconic landmark."),
  img("File:Palacio de Cristal, Parque del Retiro, Madrid 20.jpg", 1600, 1067, "Palacio de Cristal in Retiro Park", "Palacio de Cristal hosts temporary exhibitions by the Reina Sofia museum."),
  img("File:Palacio de Velázquez, Parque del Retiro, Madrid.jpg", 1600, 1067, "Palacio de Velazquez in Retiro Park", "Palacio de Velazquez is another Reina Sofia exhibition space inside the park."),
  img("File:Museo del Prado 2016 (25185969599).jpg", 1600, 1067, "Museo del Prado exterior", "The Prado Museum houses one of the world's finest collections of European art."),
  img("File:CaixaForum Madrid (España) 01.jpg", 1600, 1067, "CaixaForum Madrid vertical garden", "CaixaForum's vertical garden wall faces the Paseo del Prado."),
  img("File:Puerta de Alcalá (Madrid) 01.jpg", 1600, 1067, "Puerta de Alcala monument", "Puerta de Alcala stands at the northeast corner of Retiro Park."),
];

// Florence
const FLORENCE_OLTRARNO_IMAGES: GuideMediaImage[] = [
  img("File:Ponte Vecchio - Pair.jpg", 1600, 1067, "Ponte Vecchio crossing the Arno to Oltrarno", "Ponte Vecchio is the main pedestrian crossing from central Florence to Oltrarno."),
  img("File:Piazza Santo Spirito.jpg", 1600, 1067, "Piazza Santo Spirito in Oltrarno", "Piazza Santo Spirito hosts a daily morning market and is lined with cafes and restaurants."),
  img("File:Palazzo Pitti Firenze.jpg", 1600, 1067, "Palazzo Pitti facade in Oltrarno", "Palazzo Pitti was the main residence of the ruling Medici family."),
  img("File:Giardino di Boboli, Firenze - Panoramica 01.jpg", 1600, 1067, "Boboli Gardens panorama", "The Boboli Gardens extend behind Palazzo Pitti with Renaissance sculptures and terraces."),
  img("File:Brancacci Chapel right wall.jpg", 1600, 1067, "Brancacci Chapel frescoes in Santa Maria del Carmine", "The Brancacci Chapel frescoes by Masaccio are considered a masterpiece of early Renaissance art."),
  img("File:Piazzale Michelangelo Firenze.jpg", 1600, 1067, "View from Piazzale Michelangelo", "Piazzale Michelangelo offers the most famous panoramic view of the Florence skyline."),
];

const FLORENCE_SAN_LORENZO_IMAGES: GuideMediaImage[] = [
  img("File:Mercato Centrale, Florence.jpg", 1600, 1067, "Mercato Centrale in San Lorenzo", "Mercato Centrale's ground floor sells fresh produce while the upper floor has food courts."),
  img("File:Basilica di San Lorenzo Firenze apr 2008.jpg", 1600, 1067, "Basilica di San Lorenzo exterior", "San Lorenzo was the parish church of the Medici family for generations."),
  img("File:Cappelle Medicee crop.jpg", 1600, 1067, "Medici Chapels exterior dome", "The Medici Chapels contain Michelangelo's sculptural masterpieces for the Medici tombs."),
  img("File:Biblioteca Medicea Laurenziana (Florence) vestibule.jpg", 1600, 1067, "Laurentian Library vestibule by Michelangelo", "The vestibule staircase was designed by Michelangelo and is a masterpiece of Mannerist architecture."),
  img("File:Florence - Piazza di San Lorenzo.jpg", 1600, 1067, "San Lorenzo street market stalls", "The outdoor leather market surrounds the basilica on most days."),
];

const FLORENCE_FIESOLE_IMAGES: GuideMediaImage[] = [
  img("File:Fiesole.jpg", 1600, 1067, "Panoramic view of Fiesole above Florence", "Fiesole sits on a hilltop northeast of Florence with sweeping valley views."),
  img("File:Fiesole, area archeologica, teatro 01.jpg", 1600, 1067, "Roman amphitheatre in Fiesole", "The Roman theatre in Fiesole dates from the 1st century BC and is still used for summer performances."),
  img("File:Cattedrale di San Romolo (Fiesole), esterno 00.jpg", 1600, 1067, "Fiesole Cathedral of San Romolo", "The Cathedral of San Romolo has stood in Fiesole's main square since the 11th century."),
  img("File:San Francesco, Fiesole, Firenze.jpg", 1600, 1067, "Convent of San Francesco in Fiesole", "The Franciscan convent at the hilltop offers the best panoramic views."),
  img("File:Villa Medici Fiesole 2.JPG", 1600, 1067, "Villa Medici in Fiesole", "Villa Medici is one of the earliest Renaissance villas and influenced garden design across Europe."),
];

// Budapest
const BUDAPEST_RUIN_BARS_IMAGES: GuideMediaImage[] = [
  img("File:Szimpla Kert (8090022434).jpg", 1600, 1067, "Interior of Szimpla Kert ruin bar, Budapest", "Szimpla Kert is the original ruin bar, opened in 2002 in a former stove factory."),
  img("File:Budapest VII. Bezirk 001.jpg", 1600, 1067, "Street scene in Budapest District VII", "The 7th District, formerly the Jewish Quarter, is now the centre of Budapest's nightlife."),
  img("File:Dohány Street Synagogue.jpg", 1600, 1067, "Dohany Street Synagogue exterior", "The Dohany Street Synagogue is the largest synagogue in Europe."),
  img("File:Budapest - Gozsdu Udvar.jpg", 1600, 1067, "Gozsdu Udvar courtyard passage", "Gozsdu Udvar is a series of connected courtyards lined with restaurants and bars."),
  img("File:Karavan Street Food Budapest.jpg", 1600, 1067, "Karavan street food court next to Szimpla", "Karavan street food court offers Hungarian and international food from shipping containers."),
];

const BUDAPEST_CASTLE_IMAGES: GuideMediaImage[] = [
  img("File:Budapest Castle from across the Danube.jpg", 1600, 1067, "Buda Castle seen from the Danube", "Buda Castle dominates the western bank of the Danube."),
  img("File:Fisherman's Bastion Budapest 01.jpg", 1600, 1067, "Fisherman's Bastion terraces", "Fisherman's Bastion provides panoramic views across the Danube to the Parliament building."),
  img("File:Matthias Church Budapest.jpg", 1600, 1067, "Matthias Church with colourful tiled roof", "Matthias Church's Zsolnay ceramic roof tiles were added during a 19th-century restoration."),
  img("File:Budavári Labirintus 2.jpg", 1600, 1067, "Entrance to the Buda Castle Labyrinth", "The labyrinth beneath Castle Hill was used as a hospital and shelter during World War II."),
  img("File:Sandor Palace Budapest.jpg", 1600, 1067, "Sandor Palace, the Hungarian President's residence", "Sandor Palace hosts the ceremonial changing of the guard at noon daily."),
  img("File:Toth Arpad Setany Budapest.jpg", 1600, 1067, "Toth Arpad promenade on Castle Hill", "The western promenade offers quiet views over the Buda Hills."),
];

const BUDAPEST_MARKET_IMAGES: GuideMediaImage[] = [
  img("File:Budapest great market hall exterior.jpg", 1600, 1067, "Great Market Hall exterior, Budapest", "The Great Market Hall was designed by Samu Pecz and opened in 1897."),
  img("File:Great Market Hall Budapest interior.jpg", 1600, 1067, "Interior of the Great Market Hall", "The ground floor sells fresh produce, meat, and spices; the upper floor has souvenirs and food stalls."),
  img("File:Liberty Bridge Budapest.jpg", 1600, 1067, "Liberty Bridge over the Danube", "Liberty Bridge connects the market hall to Gellert Hill and the famous Gellert Baths."),
  img("File:Gellért fürdő Budapest 002.jpg", 1600, 1067, "Gellert Baths entrance", "Gellert Thermal Bath is one of Budapest's most famous Art Nouveau bathing complexes."),
  img("File:Fővám tér Budapest.jpg", 1600, 1067, "Fovam ter square in front of the market", "Fovam ter square is served by tram lines 2, 47, and 49."),
];

// Athens
const ATHENS_PLAKA_IMAGES: GuideMediaImage[] = [
  img("File:Plaka Athens.jpg", 1600, 1067, "Plaka neighbourhood with Acropolis above", "Plaka's neoclassical houses cluster at the foot of the Acropolis."),
  img("File:Anafiotika Athens.jpg", 1600, 1067, "Anafiotika whitewashed houses in Plaka", "Anafiotika is a tiny Cycladic-style village built by settlers from Anafi island."),
  img("File:Lysicrates monument Athens.jpg", 1600, 1067, "Monument of Lysicrates in Plaka", "The Lysicrates Monument is the best-preserved example of a choragic monument in Athens."),
  img("File:Tower of the Winds 2017.jpg", 1600, 1067, "Tower of the Winds in the Roman Agora", "The Tower of the Winds is an ancient clocktower in the Roman Agora near Plaka."),
  img("File:Plaka Street Athens Greece.jpg", 1600, 1067, "Pedestrian street lined with shops in Plaka", "Kydathineon and Adrianou streets are the main pedestrian thoroughfares of Plaka."),
  img("File:Acropolis from Plaka.jpg", 1600, 1067, "Acropolis seen from Plaka streets", "The Acropolis is visible from almost every corner in Plaka."),
];

const ATHENS_MONASTIRAKI_IMAGES: GuideMediaImage[] = [
  img("File:Monastiraki Square Athens.jpg", 1600, 1067, "Monastiraki Square with Acropolis view", "Monastiraki Square is a crossroads of ancient and modern Athens."),
  img("File:Monastiraki Flea Market Athens.jpg", 1600, 1067, "Monastiraki flea market stalls", "The flea market around Avyssinias Square sells antiques, vintage items, and curiosities."),
  img("File:Ancient Agora of Athens from Acropolis.jpg", 1600, 1067, "Ancient Agora of Athens seen from above", "The Ancient Agora was the civic centre of classical Athens."),
  img("File:Stoa of Attalos Athens.jpg", 1600, 1067, "Stoa of Attalos in the Ancient Agora", "The reconstructed Stoa of Attalos houses the Agora Museum."),
  img("File:Ermou Street Athens.jpg", 1600, 1067, "Ermou Street in Athens", "Ermou Street connects Monastiraki to Syntagma Square."),
];

const ATHENS_EXARCHIA_IMAGES: GuideMediaImage[] = [
  img("File:Exarcheia Square Athens.jpg", 1600, 1067, "Exarchia Square with cafe tables", "Exarchia Square is the neighbourhood's social hub, lined with cafes and bookshops."),
  img("File:National Archaeological Museum of Athens.jpg", 1600, 1067, "National Archaeological Museum facade", "The National Archaeological Museum sits at the western edge of Exarchia."),
  img("File:Strefi Hill Athens.jpg", 1600, 1067, "View from Strefi Hill over Athens", "Strefi Hill offers a local alternative to the tourist viewpoints with Acropolis views."),
  img("File:Street Art Athens Exarchia.jpg", 1600, 1067, "Street art mural in Exarchia", "Exarchia's walls are covered with political and artistic street art."),
  img("File:Polytechnic Athens.jpg", 1600, 1067, "Athens Polytechnic University", "The Athens Polytechnic is historically significant as the site of the 1973 student uprising."),
];

// Porto
const PORTO_RIBEIRA_IMAGES: GuideMediaImage[] = [
  img("File:Ribeira Porto.jpg", 1600, 1067, "Ribeira waterfront in Porto", "Ribeira is a UNESCO World Heritage site along the Douro River."),
  img("File:Ponte D. Luis I Porto.jpg", 1600, 1067, "Dom Luis I Bridge over the Douro", "The double-deck iron bridge connects Porto to Vila Nova de Gaia."),
  img("File:Porto - Igreja de São Francisco.jpg", 1600, 1067, "Igreja de Sao Francisco interior", "Sao Francisco church contains elaborate gilded woodwork covering nearly every surface."),
  img("File:Cais da Ribeira Porto 01.jpg", 1600, 1067, "Cais da Ribeira waterfront cafes", "The colourful houses along Cais da Ribeira date from the medieval period."),
  img("File:Porto - Palacio da Bolsa - Salao Arabe.jpg", 1600, 1067, "Arab Room in Palacio da Bolsa", "The Arab Room in the Stock Exchange Palace is inspired by the Alhambra."),
  img("File:Vila Nova de Gaia - Porto 01.jpg", 1600, 1067, "Vila Nova de Gaia port wine cellars", "Port wine cellars line the Gaia waterfront opposite the Ribeira."),
];

const PORTO_CEDOFEITA_IMAGES: GuideMediaImage[] = [
  img("File:Rua de Cedofeita Porto.jpg", 1600, 1067, "Rua de Cedofeita street in Porto", "Rua de Cedofeita is a pedestrianised shopping street with independent boutiques."),
  img("File:Rua Miguel Bombarda Porto.jpg", 1600, 1067, "Rua Miguel Bombarda gallery street", "Rua Miguel Bombarda is Porto's main contemporary art gallery street."),
  img("File:Jardins do Palacio de Cristal Porto.jpg", 1600, 1067, "Crystal Palace Gardens in Porto", "The Crystal Palace Gardens offer panoramic views over the Douro valley."),
  img("File:Porto - Mercado do Bolhão 01.jpg", 1600, 1067, "Mercado do Bolhao market", "The renovated Bolhao Market is a historic two-storey market in central Porto."),
  img("File:Igreja da Cedofeita Porto.jpg", 1600, 1067, "Igreja da Cedofeita Romanesque church", "Igreja da Cedofeita is considered one of the oldest churches in the Iberian Peninsula."),
];

// Stockholm
const STOCKHOLM_GAMLA_STAN_IMAGES: GuideMediaImage[] = [
  img("File:Gamla stan Stockholm 2012.jpg", 1600, 1067, "Gamla Stan aerial view, Stockholm", "Gamla Stan occupies an island in central Stockholm with origins dating to the 13th century."),
  img("File:Stortorget Stockholm 2.jpg", 1600, 1067, "Stortorget square in Gamla Stan", "Stortorget is the oldest square in Stockholm, surrounded by colourful merchant houses."),
  img("File:Stockholm Palace 2011.jpg", 1600, 1067, "Stockholm Royal Palace facade", "The Royal Palace is one of Europe's largest palaces with over 600 rooms."),
  img("File:Mårten Trotzigs gränd Stockholm 2007.jpg", 1600, 1067, "Marten Trotzigs Grand narrow alley", "At just 90 centimetres wide, Marten Trotzigs Grand is Stockholm's narrowest street."),
  img("File:Storkyrkan Stockholm.jpg", 1600, 1067, "Storkyrkan cathedral in Gamla Stan", "Storkyrkan is Stockholm's cathedral and the oldest church in Gamla Stan."),
  img("File:Tyska Kyrkan Stockholm.jpg", 1600, 1067, "German Church spire in Gamla Stan", "The German Church's copper spire is one of the tallest landmarks in Gamla Stan."),
];

const STOCKHOLM_SODERMALM_IMAGES: GuideMediaImage[] = [
  img("File:SoFo Södermalm Stockholm.jpg", 1600, 1067, "SoFo district in Sodermalm", "SoFo (South of Folkungagatan) is Sodermalm's trendiest area for vintage and design shops."),
  img("File:Monteliusvägen Stockholm.jpg", 1600, 1067, "Monteliusvagen viewpoint path", "Monteliusvagen is a cliffside path with views over Riddarfjarden and City Hall."),
  img("File:Fotografiska Stockholm.jpg", 1600, 1067, "Fotografiska photography museum", "Fotografiska is one of the world's largest museums dedicated to photography."),
  img("File:Nytorget Södermalm Stockholm.jpg", 1600, 1067, "Nytorget square in Sodermalm", "Nytorget square is a favourite local gathering spot surrounded by cafes and restaurants."),
  img("File:Skinnarviksberget Stockholm.jpg", 1600, 1067, "Skinnarviksberget hilltop viewpoint", "Skinnarviksberget is Stockholm's highest natural point with panoramic city views."),
];

const STOCKHOLM_DJURGARDEN_IMAGES: GuideMediaImage[] = [
  img("File:Vasamuseet Stockholm 2012.jpg", 1600, 1067, "Vasa Museum exterior, Stockholm", "The Vasa Museum houses the only almost fully intact 17th-century warship ever salvaged."),
  img("File:Skansen Stockholm 2008a.jpg", 1600, 1067, "Skansen open-air museum entrance", "Skansen is the world's first open-air museum, founded in 1891."),
  img("File:Nordiska museet 2007.jpg", 1600, 1067, "Nordiska Museet on Djurgarden", "The Nordic Museum covers Swedish cultural history from the 16th century onward."),
  img("File:ABBA Museum Stockholm.jpg", 1600, 1067, "ABBA The Museum entrance", "ABBA The Museum is an interactive exhibition dedicated to the Swedish pop group."),
  img("File:Rosendals Trädgård Stockholm.jpg", 1600, 1067, "Rosendals Tradgard garden cafe", "Rosendals Garden is a biodynamic garden with a popular greenhouse cafe."),
  img("File:Djurgarden Stockholm waterfront.jpg", 1600, 1067, "Djurgarden waterfront path", "The waterfront path circles the western tip of Djurgarden island."),
];

// Helsinki
const HELSINKI_DESIGN_IMAGES: GuideMediaImage[] = [
  img("File:Design Museum Helsinki.jpg", 1600, 1067, "Design Museum Helsinki facade", "The Design Museum chronicles Finnish design from the 19th century to the present."),
  img("File:Diana Park Helsinki.jpg", 1600, 1067, "Diana Park in Helsinki Design District", "Diana Park is a small green space in the heart of the Design District."),
  img("File:Fredrikinkatu Helsinki.jpg", 1600, 1067, "Fredrikinkatu street in Helsinki", "Fredrikinkatu is one of the main streets running through the Design District."),
  img("File:Kamppi Chapel Helsinki.jpg", 1600, 1067, "Kamppi Chapel of Silence", "The Kamppi Chapel of Silence is a curved wooden structure designed for quiet contemplation."),
  img("File:Esplanadi Helsinki.jpg", 1600, 1067, "Esplanade Park in Helsinki", "Esplanade Park runs from Market Square to Kamppi and is Helsinki's most famous promenade."),
];

const HELSINKI_KALLIO_IMAGES: GuideMediaImage[] = [
  img("File:Kallion kirkko Helsinki.jpg", 1600, 1067, "Kallio Church tower in Helsinki", "Kallio Church's granite tower is one of Helsinki's most visible landmarks."),
  img("File:Hakaniemi Market Hall Helsinki.jpg", 1600, 1067, "Hakaniemi Market Hall exterior", "Hakaniemi Market Hall is the local alternative to the tourist-oriented Old Market Hall."),
  img("File:Siltasaarenkatu Helsinki.jpg", 1600, 1067, "Siltasaarenkatu street in Kallio", "Siltasaarenkatu connects Hakaniemi to the Kallio residential area."),
  img("File:Karhupuisto Helsinki.jpg", 1600, 1067, "Bear Park (Karhupuisto) in Kallio", "Karhupuisto is a neighbourhood park popular with locals year-round."),
  img("File:Kallio Helsinki street.jpg", 1600, 1067, "Residential street in Kallio", "Kallio's Art Nouveau buildings house many independent cafes and bars at street level."),
];

const HELSINKI_SUOMENLINNA_IMAGES: GuideMediaImage[] = [
  img("File:Suomenlinna aerial.jpg", 1600, 1067, "Aerial view of Suomenlinna fortress", "Suomenlinna is a UNESCO World Heritage sea fortress spread across six islands."),
  img("File:Suomenlinna church lighthouse.jpg", 1600, 1067, "Suomenlinna Church serving as lighthouse", "The Suomenlinna Church doubles as a lighthouse, its beacon visible to ships approaching Helsinki."),
  img("File:Suomenlinna King's Gate.jpg", 1600, 1067, "King's Gate entrance to Suomenlinna", "King's Gate was the ceremonial entrance for visiting royalty."),
  img("File:Suomenlinna Dry Dock.jpg", 1600, 1067, "Dry dock at Suomenlinna fortress", "The dry dock is one of the oldest functioning dry docks in the world."),
  img("File:Suomenlinna ramparts.jpg", 1600, 1067, "Ramparts and fortifications on Suomenlinna", "The ramparts offer walking paths with views across the Gulf of Finland."),
  img("File:Suomenlinna Museum.jpg", 1600, 1067, "Suomenlinna Museum entrance", "The Suomenlinna Museum traces the fortress's 260-year history."),
];

// ─── Article content ─────────────────────────────────────────────

export const EUROPE_3_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ═══ MADRID ═══════════════════════════════════════════════════════

  "madrid-la-latina-walk": {
    ja: ja(ES_JA_CTA,
      "ラ・ラティーナの日曜蚤の市とタパス通り散策",
      "マドリードの下町ラ・ラティーナ地区を歩く。日曜のエル・ラストロ蚤の市からカバ・バハのタパス通りまで、地元の賑わいを体感するルート。",
      MADRID_LA_LATINA_IMAGES[0],
      MADRID_LA_LATINA_IMAGES,
      MADRID_X,
      [
        { heading: "このルートの魅力", body: "ラ・ラティーナはマドリード最古の街区のひとつで、中世の路地が残る下町情緒あふれるエリアです。毎週日曜と祝日に開催されるエル・ラストロはスペイン最大級の蚤の市で、リベラ・デ・クルティドーレス通りを中心に数百の露店が並びます。アンティーク、古着、レコード、雑貨まで品揃えは多彩。蚤の市を冷やかした後はカバ・バハ通りのタパスバルで昼飲みするのがマドリレーニョの定番です。" },
        { heading: "アクセスと歩き方", body: "メトロ5号線ラ・ラティーナ駅から徒歩すぐ。蚤の市は朝9時頃から始まり14時頃に閉まるため、10時前に到着するのがベスト。リベラ・デ・クルティドーレス通りを南から北へ上り、途中のプラサ・デル・カスカロ周辺で脇道を探索。坂を上りきったらカバ・バハ方面へ向かいましょう。スリが多いのでバッグは体の前に持つこと。" },
        { heading: "主要スポット", body: "プラサ・デ・ラ・パハはマドリード最古の広場のひとつで、サン・アンドレス教会が見下ろす静かな場所。サン・フランシスコ・エル・グランデ大聖堂はスペイン最大のドームを持つ壮麗な教会です。セゴビア高架橋からは王宮方面の眺望が楽しめます。カバ・バハ通りには伝統的なメソン（居酒屋）が密集しており、パタタス・ブラバスやカラマレスをハシゴするのがおすすめ。" },
        { heading: "実用情報", body: "蚤の市では現金が基本ですが、一部の店舗はカード対応。値引き交渉は一般的。タパスバルはカード決済可能な店が多いです。公衆トイレは少ないためバルで飲み物を頼んで利用を。夏場は日差しが強いので帽子と水を持参。eSIMがあればその場でバルのレビューを確認したり、蚤の市の出店情報を調べられます。" },
      ],
      [
        { q: "エル・ラストロは何曜日に開催？", a: "毎週日曜日と祝日の朝9時頃から14時頃まで開催されます。" },
        { q: "スリに注意すべき？", a: "はい。蚤の市は人混みが激しくスリの報告が多い場所です。貴重品は最小限にし、バッグは体の前に持ちましょう。" },
        { q: "タパスバルのおすすめ時間帯は？", a: "13時〜15時がランチタイムで最も活気があります。日曜は蚤の市帰りの客で混むため少し早めに入店を。" },
      ],
    ),
    en: en(ES_EN_CTA,
      "La Latina Sunday Flea Market and Tapas Walk",
      "Walk through Madrid's oldest barrio, from the sprawling El Rastro flea market to the tapas bars of Cava Baja. A Sunday morning route through La Latina's medieval lanes and lively squares.",
      MADRID_LA_LATINA_IMAGES[0],
      MADRID_LA_LATINA_IMAGES,
      MADRID_X,
      [
        { heading: "Why this walk works", body: "La Latina is one of Madrid's oldest neighbourhoods, a compact maze of medieval lanes that comes alive every Sunday morning when El Rastro takes over. El Rastro is Spain's largest open-air flea market, stretching the length of Ribera de Curtidores with hundreds of stalls selling antiques, vintage clothing, records, and curiosities. After browsing, locals head to the tapas bars along Cava Baja — one of Madrid's most famous eating streets — for an afternoon of bar-hopping and small plates. The route connects market energy with culinary tradition in the span of a morning." },
        { heading: "How to get there", body: "Metro Line 5 to La Latina station puts you at the top of the neighbourhood. The market runs from roughly 9:00 to 14:00, so arrive before 10:00 for the best browsing. Walk south along Ribera de Curtidores and explore side streets around Plaza del Cascorro. Then loop north toward Cava Baja. Keep bags in front of you — pickpockets work the crowds." },
        { heading: "Key stops", body: "Plaza de la Paja is one of Madrid's oldest squares, overlooked by the church of San Andres. The Basilica de San Francisco el Grande has the largest dome in Spain. The Segovia Viaduct offers views toward the Royal Palace. Cava Baja itself is densely packed with traditional mesones — try patatas bravas and calamares at multiple stops for comparison." },
        { heading: "Practical tips", body: "Cash is preferred at market stalls, though some accept cards. Bargaining is normal. Tapas bars generally accept cards. Public toilets are scarce — order a drink at a bar to use theirs. Bring a hat and water in summer. An eSIM lets you check bar reviews and market schedules on the spot." },
      ],
      [
        { q: "What day does El Rastro run?", a: "Every Sunday and public holiday, roughly from 9:00 to 14:00." },
        { q: "Is pickpocketing a concern?", a: "Yes. The market is crowded and pickpocket reports are common. Keep valuables to a minimum and carry your bag in front." },
        { q: "When is the best time for tapas?", a: "Lunch hours between 13:00 and 15:00 are the most lively. On Sundays, bars fill quickly with market-goers, so arrive a little early." },
      ],
    ),
  },

  "madrid-malasana-walk": {
    ja: ja(ES_JA_CTA,
      "マラサーニャのヴィンテージとカフェ散策",
      "マドリードのカウンターカルチャー発祥地マラサーニャを歩く。ヴィンテージショップ、個性的なカフェ、レコード店が集まるトレンディな街区の散策ガイド。",
      MADRID_MALASANA_IMAGES[0],
      MADRID_MALASANA_IMAGES,
      MADRID_X,
      [
        { heading: "このルートの魅力", body: "マラサーニャは1980年代の「ラ・モビーダ」と呼ばれるカルチャームーブメントの発祥地です。現在はヴィンテージショップ、独立系カフェ、レコード店、古書店が集まるマドリードで最もトレンディなエリアのひとつ。観光地的な華やかさではなく、地元の若者や学生が集う等身大のマドリードを感じられます。ドス・デ・マヨ広場を中心に、周囲の路地を自由に歩くのが楽しいエリアです。" },
        { heading: "アクセスと歩き方", body: "メトロ1号線トリブナル駅またはノビシアド駅から徒歩すぐ。フエンカラル通りからドス・デ・マヨ広場を目指し、そこから放射状に伸びる通りを探索しましょう。特にエスピリトゥ・サント通り、ベラルデ通り周辺に個性的な店が集中。コンデ・ドゥケ文化センターまで足を延ばすのもおすすめです。午前中はカフェ巡り、午後はショップ探索が快適。" },
        { heading: "ショップとカフェ", body: "フエンカラル通りは大手とインディーブランドが混在するショッピングストリート。マラサーニャの奥に入ると、70年代のレザージャケットやリーバイスのデニムを扱うヴィンテージ店が点在。スペシャルティコーヒーの店も増えており、サードウェーブ系カフェが路地裏に隠れています。日曜の午前中にはドス・デ・マヨ広場周辺でフリーマーケットが開かれることも。" },
        { heading: "実用情報", body: "カフェやショップはカード決済対応。ランチは14時以降がスペイン式のため、13時台はまだ空いています。夜は賑やかなバルエリアになりますが、治安は概ね良好。コンデ・ドゥケ文化センターでは無料の展覧会やイベントが開催されていることがあるのでeSIMで事前チェックを。" },
      ],
      [
        { q: "マラサーニャのベストな時間帯は？", a: "カフェ巡りは午前10時〜12時、ショップは12時〜14時が快適です。夜はバル街として賑わいます。" },
        { q: "グランビアから近い？", a: "はい。グランビアの北側がマラサーニャです。徒歩5分で入れます。" },
        { q: "子連れでも楽しめる？", a: "ドス・デ・マヨ広場には遊具があり、カフェにはテラス席が多いため子連れでも過ごしやすいです。" },
      ],
    ),
    en: en(ES_EN_CTA,
      "Malasana Vintage and Cafe Walk",
      "Explore Madrid's countercultural heartland in Malasana. Vintage shops, speciality coffee, record stores, and the spirit of La Movida in a compact neighbourhood north of Gran Via.",
      MADRID_MALASANA_IMAGES[0],
      MADRID_MALASANA_IMAGES,
      MADRID_X,
      [
        { heading: "Why this walk works", body: "Malasana is where Madrid's 1980s countercultural movement La Movida was born. Today the neighbourhood has evolved into one of the city's trendiest areas, filled with vintage shops, independent cafes, record stores, and second-hand bookshops. Unlike the tourist-heavy centre, Malasana attracts local students, young professionals, and creatives. Plaza del Dos de Mayo is the social hub, and the surrounding streets radiate outward with surprises at every corner." },
        { heading: "How to get there", body: "Metro Line 1 to Tribunal or Noviciado station. Walk along Calle de Fuencarral toward Plaza del Dos de Mayo, then explore the side streets radiating outward. Calle del Espiritu Santo and Calle de Velarde have the densest concentration of interesting shops. Conde Duque cultural centre is worth the extra walk. Mornings suit cafe-hopping; afternoons are best for shop browsing." },
        { heading: "Shops and cafes", body: "Calle de Fuencarral mixes high-street brands with independent boutiques. Deeper into Malasana, vintage shops sell 70s leather jackets and Levi's denim. Speciality coffee has taken hold — third-wave cafes hide in side streets. On Sunday mornings, a flea market sometimes sets up around Plaza del Dos de Mayo." },
        { heading: "Practical tips", body: "Card payment is standard at cafes and shops. Lunch in Spain typically starts at 14:00, so you can find tables at 13:00 before the rush. The area is lively at night as a bar district but generally safe. Conde Duque cultural centre often has free exhibitions — check with an eSIM before heading there." },
      ],
      [
        { q: "When is the best time to visit Malasana?", a: "Cafes from 10:00 to 12:00, shops from 12:00 to 14:00. The area becomes a bar district at night." },
        { q: "Is it close to Gran Via?", a: "Yes. Malasana starts immediately north of Gran Via — a five-minute walk." },
        { q: "Is it family-friendly?", a: "Plaza del Dos de Mayo has a playground, and many cafes have terrace seating that works well for families." },
      ],
    ),
  },

  "madrid-retiro-park-walk": {
    ja: ja(ES_JA_CTA,
      "レティーロ公園と周辺美術館散歩",
      "マドリードの緑の心臓レティーロ公園から、プラド美術館・ソフィア王妃芸術センターへ。公園の湖と宮殿、そして世界有数の美術コレクションを一日で巡る散策ルート。",
      MADRID_RETIRO_IMAGES[0],
      MADRID_RETIRO_IMAGES,
      MADRID_X,
      [
        { heading: "このルートの魅力", body: "レティーロ公園は125ヘクタールの広大な都市公園で、かつてのスペイン王家の庭園です。ボート遊びができる人工湖、ガラスの宮殿パラシオ・デ・クリスタル、バラ園など見どころが多く、朝の散歩に最適。公園の西側にはプラド美術館、ソフィア王妃芸術センター、ティッセン美術館のアートトライアングルが控えており、午前を公園、午後を美術館に充てるのが定番です。" },
        { heading: "アクセスと歩き方", body: "メトロ2号線レティーロ駅またはプリンシペ・デ・ベルガラ駅から入園。北東のプエルタ・デ・アルカラ門から入り、アルフォンソ12世記念碑のある大池へ。パラシオ・デ・クリスタルとパラシオ・デ・ベラスケスを巡り、南西口から出てプラド通りへ向かいましょう。公園内は平坦で歩きやすいですが広いため2〜3時間は見てください。" },
        { heading: "美術館エリア", body: "プラド美術館はベラスケスやゴヤの傑作を収蔵する世界有数の美術館。ソフィア王妃芸術センターにはピカソの「ゲルニカ」があります。カイシャフォルムは垂直庭園の壁面が目を引く現代アート空間。3館共通チケットやマドリードカードでお得に巡れます。日曜午後はプラド美術館が無料開放されるため混雑します。" },
        { heading: "実用情報", body: "公園内の売店やカフェはカード決済可。ボート貸し出しは湖畔の小屋で、30分約6ユーロ。公衆トイレは公園内に数か所あります。美術館のチケットはオンライン事前購入が推奨。eSIMがあれば現地で空き状況の確認や電子チケットの表示がスムーズです。" },
      ],
      [
        { q: "レティーロ公園の所要時間は？", a: "主要スポットを回って2〜3時間。ボートに乗る場合はプラス30分です。" },
        { q: "プラド美術館は無料で入れる？", a: "月〜土の18:00〜20:00、日曜・祝日の17:00〜19:00は入場無料です。ただし非常に混雑します。" },
        { q: "パラシオ・デ・クリスタルは何？", a: "1887年建造のガラスと鉄のパビリオンで、現在はソフィア王妃芸術センターの企画展示スペース。入場無料です。" },
      ],
    ),
    en: en(ES_EN_CTA,
      "Retiro Park and Museum Mile Walk",
      "Stroll through Madrid's grand Retiro Park, from the boating lake and Crystal Palace to the Prado Museum and Reina Sofia. A green-to-gallery route through the city's cultural heart.",
      MADRID_RETIRO_IMAGES[0],
      MADRID_RETIRO_IMAGES,
      MADRID_X,
      [
        { heading: "Why this walk works", body: "Retiro Park covers 125 hectares of former royal gardens in central Madrid. The boating lake, the glass-and-iron Palacio de Cristal, and the rose garden give the morning a relaxed, green start. Just west of the park, the Art Triangle — Prado, Reina Sofia, and Thyssen-Bornemisza — holds one of the densest concentrations of masterpiece art in Europe. Spending the morning in the park and the afternoon in museums is a classic Madrid day." },
        { heading: "How to get there", body: "Metro Line 2 to Retiro or Principe de Vergara station. Enter through the Puerta de Alcala gate at the northeast corner. Head to the Alfonso XII monument at the main lake, then loop through Palacio de Cristal and Palacio de Velazquez before exiting the southwest gate toward Paseo del Prado. The park is flat and easy to walk, but allow 2 to 3 hours to cover the highlights." },
        { heading: "The museum area", body: "The Prado holds Velazquez, Goya, and El Greco. Reina Sofia has Picasso's Guernica. CaixaForum's vertical garden wall is an attraction in itself. Combined tickets and the Madrid Card offer savings across the three museums. Sunday afternoons are free at the Prado but extremely crowded." },
        { heading: "Practical tips", body: "Park kiosks and cafes accept cards. Boat hire at the main lake costs about 6 euros for 30 minutes. Public toilets are available in several park locations. Museum tickets are best purchased online in advance. An eSIM lets you check availability and display e-tickets without searching for Wi-Fi." },
      ],
      [
        { q: "How long does Retiro Park take?", a: "Two to three hours for the main sights. Add 30 minutes if you rent a boat." },
        { q: "Is the Prado ever free?", a: "Monday to Saturday 18:00 to 20:00, and Sundays and holidays 17:00 to 19:00 — but expect heavy queues." },
        { q: "What is Palacio de Cristal?", a: "A glass-and-iron pavilion built in 1887, now a free exhibition space run by the Reina Sofia museum." },
      ],
    ),
  },

  // ═══ FLORENCE ═════════════════════════════════════════════════════

  "florence-oltrarno-walk": {
    ja: ja(IT_JA_CTA,
      "オルトラルノの職人工房と裏通り散策",
      "フィレンツェのアルノ川南岸オルトラルノ地区を歩く。ポンテ・ヴェッキオを渡り、職人工房、ピッティ宮殿、ボーボリ庭園、そしてミケランジェロ広場の絶景まで。",
      FLORENCE_OLTRARNO_IMAGES[0],
      FLORENCE_OLTRARNO_IMAGES,
      FLORENCE_X,
      [
        { heading: "このルートの魅力", body: "オルトラルノは「アルノの向こう側」を意味し、フィレンツェ中心部の喧騒から離れた職人の街です。革細工、額縁、金箔、石工など伝統工芸の工房が路地裏に点在し、ドアを開けたまま作業する職人の姿を見かけます。サント・スピリト広場を中心とした生活感あるエリアは、観光客向けではないフィレンツェの素顔を感じられる場所。ピッティ宮殿とボーボリ庭園という大型観光地も抱える贅沢なエリアです。" },
        { heading: "アクセスと歩き方", body: "ポンテ・ヴェッキオを渡ってオルトラルノに入るのが最も分かりやすいルート。橋を渡ったらすぐ左折してボルゴ・サン・ヤコポ通りを歩き、職人工房をのぞきながらサント・スピリト広場へ。午前中の市場を楽しんだ後、ピッティ宮殿とボーボリ庭園を巡り、最後にミケランジェロ広場へ登ってフィレンツェの全景を眺めましょう。坂道があるため歩きやすい靴で。" },
        { heading: "主要スポット", body: "サント・スピリト広場は毎朝マーケットが立ち、周囲にはカフェやトラットリアが並ぶ地元の社交場。ピッティ宮殿はメディチ家の居城で現在は複数の美術館を内包。ブランカッチ礼拝堂のマザッチョのフレスコ画はルネサンス美術の重要作品。ミケランジェロ広場からはドゥオーモとフィレンツェの赤い屋根の全景が広がります。" },
        { heading: "実用情報", body: "ピッティ宮殿とボーボリ庭園は共通チケットで入場可能。ブランカッチ礼拝堂は予約制で1回15分の入場制限あり。サント・スピリト広場周辺のレストランは中心部より手頃。eSIMがあれば予約確認やレストラン探しがスムーズです。夏場のミケランジェロ広場は夕暮れ時が最も美しいですが混雑します。" },
      ],
      [
        { q: "オルトラルノの所要時間は？", a: "散策だけなら2〜3時間。ピッティ宮殿とボーボリ庭園を加えると半日です。" },
        { q: "ミケランジェロ広場へのアクセスは？", a: "サン・ニッコロ地区から階段を上って約15分。バス12番でも行けます。" },
        { q: "職人工房は見学できる？", a: "多くの工房はドアを開けて作業しており、声をかければ見学させてくれることが多いです。購入を強制されることはありません。" },
      ],
    ),
    en: en(IT_EN_CTA,
      "Oltrarno Artisan Workshops and Back-Street Walk",
      "Cross the Ponte Vecchio into Florence's artisan quarter. Oltrarno offers craft workshops, Palazzo Pitti, Boboli Gardens, and the famous panorama from Piazzale Michelangelo.",
      FLORENCE_OLTRARNO_IMAGES[0],
      FLORENCE_OLTRARNO_IMAGES,
      FLORENCE_X,
      [
        { heading: "Why this walk works", body: "Oltrarno means 'beyond the Arno' and the south bank neighbourhood has a distinctly different pace from the tourist-heavy centre. Traditional artisan workshops — leather workers, gilders, framers, stone carvers — still line the back streets, many with their doors open to passersby. Piazza Santo Spirito serves as the neighbourhood's living room, with a morning market and surrounding cafes. The area also contains Palazzo Pitti and the Boboli Gardens, plus the famous viewpoint at Piazzale Michelangelo." },
        { heading: "How to get there", body: "Cross the Ponte Vecchio — the most atmospheric entry — and turn left along Borgo San Jacopo. Browse the artisan workshops while heading to Piazza Santo Spirito. After the morning market, visit Palazzo Pitti and the Boboli Gardens, then climb to Piazzale Michelangelo for the panorama. The route includes uphill sections so wear comfortable shoes." },
        { heading: "Key stops", body: "Piazza Santo Spirito hosts a daily morning market and is surrounded by cafes and trattorias. Palazzo Pitti was the Medici residence and now houses several museums. The Brancacci Chapel contains Masaccio's groundbreaking Renaissance frescoes. Piazzale Michelangelo delivers the definitive view of the Duomo and Florence's red rooftops." },
        { heading: "Practical tips", body: "Palazzo Pitti and Boboli Gardens share a combined ticket. The Brancacci Chapel requires advance booking and limits visits to 15 minutes. Restaurants around Santo Spirito are more affordable than the centre. An eSIM helps with reservations and restaurant searches. Piazzale Michelangelo is most beautiful at sunset but gets crowded." },
      ],
      [
        { q: "How long does Oltrarno take?", a: "Two to three hours for walking alone. Add half a day for Palazzo Pitti and Boboli Gardens." },
        { q: "How do I reach Piazzale Michelangelo?", a: "Climb the stairs from the San Niccolo gate — about 15 minutes. Bus 12 also goes there." },
        { q: "Can I visit the artisan workshops?", a: "Many workshops keep their doors open and welcome visitors who ask politely. There is no obligation to buy." },
      ],
    ),
  },

  "florence-san-lorenzo-walk": {
    ja: ja(IT_JA_CTA,
      "サンロレンツォ市場と教会周辺散歩",
      "フィレンツェのサンロレンツォ地区を歩く。メルカート・チェントラーレの食文化、メディチ家の菩提寺、ミケランジェロの彫刻とラウレンツィアーナ図書館を巡るルート。",
      FLORENCE_SAN_LORENZO_IMAGES[0],
      FLORENCE_SAN_LORENZO_IMAGES,
      FLORENCE_X,
      [
        { heading: "このルートの魅力", body: "サンロレンツォ地区はフィレンツェの胃袋と呼ばれるエリアです。メルカート・チェントラーレ（中央市場）は1階が生鮮食品、2階がフードコートになっており、トスカーナ料理を手軽に楽しめます。市場の周囲にはレザー製品の露店が並び、バザールのような賑わい。そしてサンロレンツォ教会はメディチ家の菩提寺で、ミケランジェロが設計したメディチ家礼拝堂とラウレンツィアーナ図書館という傑作建築を有しています。" },
        { heading: "アクセスと歩き方", body: "サンタ・マリア・ノヴェッラ駅から徒歩5分。駅を出て東へ進むとすぐにサンロレンツォ教会の後陣が見えます。教会を起点に、まず外の革製品市場を冷やかし、メルカート・チェントラーレでブランチ。その後メディチ家礼拝堂とラウレンツィアーナ図書館を見学しましょう。午前中に回れるコンパクトなルートです。" },
        { heading: "主要スポット", body: "メルカート・チェントラーレの2階フードコートではランプレドット（牛モツ煮）のパニーノがフィレンツェ名物。メディチ家礼拝堂にはミケランジェロの「昼」「夜」「曙」「黄昏」の彫刻群。ラウレンツィアーナ図書館の前室階段はマニエリスム建築の傑作とされています。サンロレンツォ教会内部はブルネレスキの設計による初期ルネサンスの空間。" },
        { heading: "実用情報", body: "メルカート・チェントラーレは毎日営業、2階フードコートは夜まで開いています。外の露店は値切り交渉可能。メディチ家礼拝堂は月曜休館の場合あり。チケットはオンライン購入推奨。eSIMでスケジュール確認や周辺レストランの検索ができます。" },
      ],
      [
        { q: "メルカート・チェントラーレの営業時間は？", a: "1階の生鮮市場は朝7時〜14時（日曜休み）。2階フードコートは10時〜深夜まで毎日営業。" },
        { q: "ランプレドットとは？", a: "牛の第四胃袋を煮込んだフィレンツェの伝統的なストリートフードで、パニーノに挟んで食べます。" },
        { q: "ドゥオーモからの距離は？", a: "サンロレンツォ教会はドゥオーモから徒歩3分の至近距離です。" },
      ],
    ),
    en: en(IT_EN_CTA,
      "San Lorenzo Market and Church Walk",
      "Explore Florence's culinary and Medici heartland around San Lorenzo. From the bustling Mercato Centrale to Michelangelo's Medici Chapels and the Laurentian Library staircase.",
      FLORENCE_SAN_LORENZO_IMAGES[0],
      FLORENCE_SAN_LORENZO_IMAGES,
      FLORENCE_X,
      [
        { heading: "Why this walk works", body: "The San Lorenzo district is Florence's culinary nerve centre. Mercato Centrale has fresh produce on the ground floor and a modern food court upstairs serving Tuscan specialities. Outside, leather stalls create a bazaar atmosphere around the basilica. San Lorenzo itself is the Medici family parish church, containing Michelangelo's Medici Chapels with his famous tomb sculptures, and the Laurentian Library — a masterpiece of Mannerist architecture. All of this sits within a five-minute walk of the main train station." },
        { heading: "How to get there", body: "From Santa Maria Novella station, walk east for five minutes and the apse of San Lorenzo comes into view. Start at the church, browse the outdoor leather market, then head into Mercato Centrale for brunch. After eating, visit the Medici Chapels and the Laurentian Library. The whole route fits comfortably into a morning." },
        { heading: "Key stops", body: "The Mercato Centrale food court upstairs serves lampredotto — a Florentine tripe sandwich — alongside pasta, pizza, and gelato. The Medici Chapels contain Michelangelo's sculptures of Dawn, Dusk, Day, and Night. The Laurentian Library vestibule staircase is considered a Mannerist masterpiece. San Lorenzo's interior, designed by Brunelleschi, is one of the purest early Renaissance spaces." },
        { heading: "Practical tips", body: "Mercato Centrale is open daily; the upstairs food court runs until late evening. Outdoor stall prices are negotiable. The Medici Chapels may close on Mondays — check beforehand. Online tickets are recommended. An eSIM helps with schedule checks and restaurant searches." },
      ],
      [
        { q: "What are Mercato Centrale's hours?", a: "The ground-floor fresh market runs from about 7:00 to 14:00, closed Sunday. The upstairs food court is open daily from 10:00 until midnight." },
        { q: "What is lampredotto?", a: "A traditional Florentine street food — the fourth stomach of a cow, slow-simmered and served in a bread roll." },
        { q: "How far is it from the Duomo?", a: "San Lorenzo church is a three-minute walk from the Duomo." },
      ],
    ),
  },

  "florence-fiesole-morning-walk": {
    ja: ja(IT_JA_CTA,
      "フィエーゾレの丘と展望散歩",
      "フィレンツェ郊外の丘上の町フィエーゾレを朝散歩。古代ローマ劇場、フランチェスコ修道院からの絶景、そしてトスカーナの丘陵風景を楽しむ半日ルート。",
      FLORENCE_FIESOLE_IMAGES[0],
      FLORENCE_FIESOLE_IMAGES,
      FLORENCE_X,
      [
        { heading: "このルートの魅力", body: "フィエーゾレはフィレンツェの北東8kmの丘の上にある小さな町で、実はフィレンツェより歴史が古いエトルリア時代の集落です。バスで20分ほど登ると、フィレンツェの街並みとトスカーナの丘陵が眼下に広がる別世界。紀元前1世紀のローマ劇場、中世の大聖堂、丘の頂上のフランチェスコ修道院と、小さなエリアに見どころが凝縮。夏場のフィレンツェの暑さを逃れる避暑地としても最適です。" },
        { heading: "アクセスと歩き方", body: "フィレンツェのサン・マルコ広場からATAFバス7番で約25分。終点のフィエーゾレ中心広場で下車。広場のカフェで一息ついたら、まず考古学エリア（ローマ劇場）を見学。その後大聖堂を経由して丘の上のサン・フランチェスコ修道院へ登ります。修道院からの帰りは来た道を戻るか、Via Vecchia Fiesolanaを通って歩いてフィレンツェまで下ることも可能（約1時間）。" },
        { heading: "主要スポット", body: "ローマ劇場は紀元前1世紀の建造で、夏には今もコンサートや演劇が開催されます。考古学博物館では出土品を展示。サン・ロモロ大聖堂は11世紀建造のロマネスク教会。丘の最上部にあるサン・フランチェスコ修道院の庭園からの眺望はフィエーゾレのハイライトで、フィレンツェからアルノ渓谷まで一望できます。" },
        { heading: "実用情報", body: "バス7番の片道チケットは1.70ユーロ（2024年時点）。考古学エリアの入場料は約7ユーロ。フィエーゾレの中心広場にはカフェが数軒ありますが、レストランの選択肢は限られます。午前中の涼しい時間帯がおすすめ。帰りのバス時刻をeSIMで確認しておくと安心です。日曜はバスの本数が減ります。" },
      ],
      [
        { q: "フィエーゾレへの所要時間は？", a: "フィレンツェからバスで約25分。現地の散策は2〜3時間が目安です。" },
        { q: "歩いて戻れる？", a: "Via Vecchia Fiesolanaを通って約1時間で下れます。石畳の急坂があるため歩きやすい靴で。" },
        { q: "夏のイベントは？", a: "7月〜8月にローマ劇場でEstate Fiesolana（フィエーゾレの夏）という音楽・演劇フェスティバルが開催されます。" },
      ],
    ),
    en: en(IT_EN_CTA,
      "Fiesole Hilltop Morning Walk",
      "Escape Florence for the Etruscan hilltop town of Fiesole. Roman amphitheatre, Franciscan monastery views, and Tuscan landscapes — all in a half-day trip by local bus.",
      FLORENCE_FIESOLE_IMAGES[0],
      FLORENCE_FIESOLE_IMAGES,
      FLORENCE_X,
      [
        { heading: "Why this walk works", body: "Fiesole sits on a hill eight kilometres northeast of Florence and pre-dates its famous neighbour — it was an Etruscan settlement before Rome existed. A 20-minute bus ride lifts you above the city into a world of Roman ruins, medieval churches, and sweeping Tuscan panoramas. The compact town centre packs a first-century BC Roman theatre, a Romanesque cathedral, and a Franciscan monastery with one of the finest views in Tuscany. In summer it offers welcome relief from Florence's heat." },
        { heading: "How to get there", body: "ATAF bus 7 from Piazza San Marco in Florence takes about 25 minutes to the Fiesole main square. Start with a coffee in the piazza, then visit the archaeological area with the Roman theatre. Walk to the cathedral and up the hill to the Convent of San Francesco at the summit. You can return by bus or walk back to Florence via Via Vecchia Fiesolana — about one hour downhill." },
        { heading: "Key stops", body: "The Roman theatre dates from the first century BC and still hosts concerts and performances in summer. The archaeological museum displays excavated artefacts. The Cathedral of San Romolo is an 11th-century Romanesque church. The garden of the Convent of San Francesco at the hilltop offers the defining view — Florence, the Arno valley, and the Tuscan hills in a single panorama." },
        { heading: "Practical tips", body: "Bus 7 costs 1.70 euros one way. The archaeological area costs about 7 euros to enter. The main square has a few cafes but limited restaurant options. Morning visits are cooler and quieter. Check return bus times with an eSIM — Sunday services run less frequently." },
      ],
      [
        { q: "How long does Fiesole take?", a: "About 25 minutes by bus from Florence. Allow 2 to 3 hours for walking around the town." },
        { q: "Can I walk back to Florence?", a: "Yes — Via Vecchia Fiesolana takes about one hour downhill. Wear sturdy shoes for the steep cobblestones." },
        { q: "Are there summer events?", a: "Estate Fiesolana runs in July and August with concerts, theatre, and film in the Roman amphitheatre." },
      ],
    ),
  },

  // ═══ BUDAPEST ═════════════════════════════════════════════════════

  "budapest-ruin-bars-walk": {
    ja: ja(HU_JA_CTA,
      "廃墟バー地区（7区）の日中散策",
      "ブダペスト7区の廃墟バーエリアを昼間に歩く。シンプラ・ケルトをはじめとするルインバー、ユダヤ地区の歴史建築、ゴジュドゥ・ウドヴァルの中庭を巡るルート。",
      BUDAPEST_RUIN_BARS_IMAGES[0],
      BUDAPEST_RUIN_BARS_IMAGES,
      BUDAPEST_X,
      [
        { heading: "このルートの魅力", body: "ブダペスト7区（エルジェーベト区）はかつてのユダヤ人居住区で、現在はルインバー（廃墟バー）文化の発祥地として世界的に知られるエリアです。2002年にオープンしたシンプラ・ケルトを皮切りに、廃墟や空きビルをリノベーションしたバーが次々と誕生。昼間でもシンプラ・ケルトは見学でき、奇抜なインテリアと中庭のアートを楽しめます。ユダヤ地区としての歴史も色濃く、ヨーロッパ最大のシナゴーグが建つエリアでもあります。" },
        { heading: "アクセスと歩き方", body: "メトロ2号線アストリア駅から徒歩5分。ドハーニ通りのシナゴーグからスタートし、カージンツィ通りを北上。シンプラ・ケルトはカージンツィ通り14番地。そこからゴジュドゥ・ウドヴァル（連続中庭）を通り抜け、周辺のルインバーやカフェを巡りましょう。エリアはコンパクトで徒歩30分圏内に主要スポットが集中しています。" },
        { heading: "主要スポット", body: "シンプラ・ケルトは旧ストーブ工場を改装した元祖ルインバーで、各部屋のデコレーションが異なります。ドハーニ通りシナゴーグはヨーロッパ最大で内部見学可能。ゴジュドゥ・ウドヴァルは7つの中庭が連続する通り抜け路地で、レストランやバーが並びます。カラヴァン・ストリートフードはシンプラ横のコンテナ型屋台村。" },
        { heading: "実用情報", body: "シンプラ・ケルトは日曜午前にファーマーズマーケットを開催。シナゴーグは入場料約5,000フォリント。多くの店でカード決済可能。ルインバーは夜に賑わいますが、雰囲気を楽しむなら昼間の訪問がおすすめ。eSIMがあればバーの営業情報やイベントスケジュールを確認できます。" },
      ],
      [
        { q: "ルインバーは昼間でも入れる？", a: "シンプラ・ケルトは昼から営業しており、カフェとして利用できます。他のルインバーは夕方からの店が多いです。" },
        { q: "治安は大丈夫？", a: "昼間は全く問題ありません。夜は飲み屋街になるため酔客に注意。貴重品管理を徹底しましょう。" },
        { q: "シナゴーグは見学できる？", a: "ガイドツアーで内部見学可能です。土曜（安息日）は休館。" },
      ],
    ),
    en: en(HU_EN_CTA,
      "Ruin Bar District (District VII) Daytime Walk",
      "Explore Budapest's famous ruin bar quarter in daylight. Szimpla Kert, the Dohany Synagogue, Gozsdu courtyard passage, and the layered history of the former Jewish Quarter.",
      BUDAPEST_RUIN_BARS_IMAGES[0],
      BUDAPEST_RUIN_BARS_IMAGES,
      BUDAPEST_X,
      [
        { heading: "Why this walk works", body: "Budapest's 7th District was historically the Jewish Quarter and is now globally famous for its ruin bars — derelict buildings transformed into eclectic drinking spots. Szimpla Kert, which opened in 2002 in a former stove factory, started the trend. By day you can explore its surreal interiors and courtyard art without the crowds. The district also holds Europe's largest synagogue, Ottoman-era remains, and a network of connected courtyards. Walking it in daylight reveals architectural layers that the night-time crowds obscure." },
        { heading: "How to get there", body: "Metro Line 2 to Astoria station, then a five-minute walk north. Start at the Dohany Street Synagogue, walk up Kazinczy utca to Szimpla Kert at number 14, then pass through the Gozsdu Udvar courtyards. The area is compact — all major stops are within a 30-minute walking radius." },
        { heading: "Key stops", body: "Szimpla Kert is the original ruin bar, each room decorated differently with salvaged furniture and art. The Dohany Street Synagogue is the largest in Europe and open for tours. Gozsdu Udvar is a series of seven interconnected courtyards lined with restaurants and bars. Karavan street food court next to Szimpla offers Hungarian and international bites from shipping containers." },
        { heading: "Practical tips", body: "Szimpla Kert runs a Sunday morning farmers' market. The synagogue charges about 5,000 forints for entry. Most venues accept cards. Ruin bars come alive at night, but daytime visits let you appreciate the architecture and art. An eSIM helps check opening hours and event schedules." },
      ],
      [
        { q: "Can I visit ruin bars during the day?", a: "Szimpla Kert is open from midday and operates as a cafe. Most other ruin bars open in the evening." },
        { q: "Is the area safe?", a: "Perfectly fine during the day. At night it becomes a busy nightlife zone — keep an eye on your belongings." },
        { q: "Can I tour the synagogue?", a: "Guided tours are available. It is closed on Saturdays (Shabbat)." },
      ],
    ),
  },

  "budapest-castle-district-walk": {
    ja: ja(HU_JA_CTA,
      "ブダ城地区の展望と路地散歩",
      "ブダペストのドナウ川西岸ブダ城地区を歩く。漁夫の砦からの絶景、マーチャーシュ教会、王宮の路地を巡るルート。",
      BUDAPEST_CASTLE_IMAGES[0],
      BUDAPEST_CASTLE_IMAGES,
      BUDAPEST_X,
      [
        { heading: "このルートの魅力", body: "ブダ城地区はドナウ川の西岸の丘の上に広がる中世の街区です。漁夫の砦からは対岸の国会議事堂やドナウ川の全景が見渡せ、ブダペスト随一のフォトスポット。マーチャーシュ教会のジョルナイ陶器の屋根瓦は独特の美しさ。王宮は現在国立美術館とブダペスト歴史博物館になっています。丘の上のため観光客が集中しますが、脇道に入れば静かな石畳の路地と中世の家並みを楽しめます。" },
        { heading: "アクセスと歩き方", body: "ドナウ川東岸のクラーク・アーダーム広場からフニクラー（ケーブルカー）で丘の上へ。または16番バスでも到着。漁夫の砦から散策を始め、マーチャーシュ教会を見学後、王宮方面へ南下。トート・アールパード遊歩道は西側の静かな散歩道で、ブダの丘陵を望めます。シャーンドル宮殿前では正午に衛兵交代式。帰りは南側の階段を下ってタバーン地区へ出るのがおすすめ。" },
        { heading: "主要スポット", body: "漁夫の砦は新ロマネスク様式のテラスで、夜のライトアップも美しいですが朝の空いている時間がおすすめ。マーチャーシュ教会は13世紀創建で内部の壁画は19世紀の修復。ブダ城地下迷宮はかつて防空壕や病院として使われた洞窟網。王宮内のハンガリー国立美術館はハンガリー美術のコレクションが充実。" },
        { heading: "実用情報", body: "漁夫の砦の上段テラスは有料（約1,000フォリント）、下段は無料。フニクラーは片道約2,000フォリント。王宮エリアにはカフェやレストランがありますが価格は高め。城地区は石畳が多いため歩きやすい靴を。eSIMで営業時間やフニクラーの運行状況を確認しましょう。" },
      ],
      [
        { q: "漁夫の砦は有料？", a: "上段テラスは有料（約1,000フォリント）ですが、下段テラスは無料で同様の景色が楽しめます。" },
        { q: "フニクラーの代替手段は？", a: "16番バスまたは徒歩で登れます。クラーク・アーダーム広場からの階段は約10分。" },
        { q: "所要時間は？", a: "漁夫の砦、教会、王宮外観で2〜3時間。美術館に入る場合は半日みてください。" },
      ],
    ),
    en: en(HU_EN_CTA,
      "Buda Castle District Views and Lanes Walk",
      "Walk the medieval Castle District on the Buda side of the Danube. Fisherman's Bastion panoramas, Matthias Church, royal palace grounds, and quiet cobblestone lanes above the river.",
      BUDAPEST_CASTLE_IMAGES[0],
      BUDAPEST_CASTLE_IMAGES,
      BUDAPEST_X,
      [
        { heading: "Why this walk works", body: "The Castle District sits on a limestone plateau above the Danube's western bank. Fisherman's Bastion offers the single best view in Budapest — the Parliament building, the river, and Pest's rooftops spread below. Matthias Church, with its colourful Zsolnay ceramic roof tiles, is one of Budapest's most distinctive landmarks. The Royal Palace now houses the Hungarian National Gallery and the Budapest History Museum. Side streets away from the main tourist path have quiet medieval houses and unexpected courtyards." },
        { heading: "How to get there", body: "Take the funicular from Clark Adam Square on the east bank, or bus 16. Start at Fisherman's Bastion, visit Matthias Church, then walk south toward the palace. The Toth Arpad promenade on the west side is a quiet path overlooking the Buda Hills. Sandor Palace hosts the changing of the guard at noon. Return by descending the southern steps into the Taban district." },
        { heading: "Key stops", body: "Fisherman's Bastion is a neo-Romanesque terrace — beautiful at night but quieter in early morning. Matthias Church dates from the 13th century with 19th-century restored wall paintings. The Buda Castle Labyrinth is a cave network once used as a wartime hospital and shelter. The Hungarian National Gallery in the Royal Palace has extensive Hungarian art collections." },
        { heading: "Practical tips", body: "Fisherman's Bastion upper terrace charges about 1,000 forints; the lower terrace is free with similar views. The funicular costs about 2,000 forints one way. Cafes and restaurants in the castle area charge premium prices. Cobblestones are uneven — wear sturdy shoes. An eSIM helps check opening hours and funicular schedules." },
      ],
      [
        { q: "Is Fisherman's Bastion free?", a: "The upper terrace charges about 1,000 forints, but the lower terrace is free and offers similar views." },
        { q: "What are alternatives to the funicular?", a: "Bus 16 or walking up the steps from Clark Adam Square — about 10 minutes on foot." },
        { q: "How long does the walk take?", a: "Two to three hours for the bastion, church, and palace exterior. Half a day if visiting the gallery." },
      ],
    ),
  },

  "budapest-great-market-hall-walk": {
    ja: ja(HU_JA_CTA,
      "中央市場ホールと自由橋周辺散策",
      "ブダペストの中央市場ホールで食べ歩き、自由橋を渡ってゲッレールトの丘まで。食文化と絶景を組み合わせたドナウ川沿いの散策ルート。",
      BUDAPEST_MARKET_IMAGES[0],
      BUDAPEST_MARKET_IMAGES,
      BUDAPEST_X,
      [
        { heading: "このルートの魅力", body: "中央市場ホール（ナジ・ヴァーシャールチャルノク）は1897年開業のブダペスト最大の屋内市場で、1階には肉、パプリカ、サラミなどハンガリーの食材が、2階にはフードコートと民芸品の店が並びます。市場を楽しんだ後は目の前の自由橋を渡ると、ゲッレールト温泉の壮麗なアール・ヌーヴォー建築、そしてゲッレールトの丘からのブダペスト全景が待っています。食と眺望を半日で楽しめるルートです。" },
        { heading: "アクセスと歩き方", body: "メトロ4号線フェーヴァーム広場駅の目の前が中央市場。市場を見学・食べ歩きした後、正面の自由橋を歩いて渡ります。橋を渡ったらゲッレールト温泉の外観を眺め、体力があればゲッレールトの丘へ登りましょう（約20分）。丘の上の自由の女神像からの360度パノラマは圧巻です。帰りは丘の北側を下ってタバーン地区へ。" },
        { heading: "主要スポット", body: "中央市場1階はパプリカ、フォアグラ、ピックサラミなどお土産にも最適な食材が揃います。2階のフードコートではラーンゴシュ（揚げパン）やグーラッシュが定番。自由橋は1896年建造の緑色の鉄橋で、夏の夕方には橋の上に座って夕涼みする地元の若者で賑わいます。ゲッレールト温泉はブダペストを代表するアール・ヌーヴォー様式の温泉施設。" },
        { heading: "実用情報", body: "市場は月〜土営業、日曜休み。月曜は15時閉店と早いので注意。2階フードコートはカード決済可能。自由橋は歩行者・車共用。ゲッレールト温泉の入場料は約8,000フォリント。丘への登りは石段が続くため歩きやすい靴で。eSIMで温泉の混雑状況やトラムの時刻を確認できます。" },
      ],
      [
        { q: "市場の営業日は？", a: "月〜土。月曜は6時〜15時、火〜金は6時〜18時、土は6時〜15時。日曜休み。" },
        { q: "ゲッレールトの丘は登る価値がある？", a: "絶対に。ブダペスト全体を360度見渡せる最高のビューポイントです。登りは約20分。" },
        { q: "自由橋の上で座れる？", a: "夏季の週末には橋が歩行者天国になることがあり、地元の若者が橋の構造物に座って過ごす光景は名物です。" },
      ],
    ),
    en: en(HU_EN_CTA,
      "Great Market Hall and Liberty Bridge Walk",
      "Browse Budapest's largest indoor market, cross Liberty Bridge on foot, and climb Gellert Hill for the panorama. A half-day route linking food, architecture, and city views.",
      BUDAPEST_MARKET_IMAGES[0],
      BUDAPEST_MARKET_IMAGES,
      BUDAPEST_X,
      [
        { heading: "Why this walk works", body: "The Great Market Hall opened in 1897 and remains Budapest's largest covered market. The ground floor sells paprika, salami, foie gras, and fresh produce; the upper floor has food stalls and souvenir shops. Directly outside, Liberty Bridge crosses the Danube to the Buda side, where the Art Nouveau Gellert Baths and Gellert Hill with its 360-degree panorama await. The route packs food, architecture, and the best viewpoint in Budapest into a single morning." },
        { heading: "How to get there", body: "Metro Line 4 to Fovam ter — the market is directly above the station exit. Browse and eat at the market, then walk across Liberty Bridge. On the Buda side, admire the Gellert Baths facade, then climb Gellert Hill (about 20 minutes). The Citadella and Liberty Statue at the summit offer a full panorama. Descend the north side into the Taban district." },
        { heading: "Key stops", body: "The market's ground floor is ideal for paprika, Pick salami, and foie gras — all popular souvenirs. The upstairs food court serves langos (fried dough) and goulash. Liberty Bridge is a green iron structure from 1896 — on summer evenings locals sit on its steelwork to watch the sunset. Gellert Baths is Budapest's most famous Art Nouveau thermal complex." },
        { heading: "Practical tips", body: "The market is open Monday to Saturday, closed Sunday. Monday closing is 15:00 — arrive early. The food court accepts cards. Liberty Bridge is shared by pedestrians and vehicles. Gellert Baths entry costs about 8,000 forints. The hill climb has stone steps — wear sturdy shoes. An eSIM lets you check bath availability and tram schedules." },
      ],
      [
        { q: "When is the market open?", a: "Monday to Saturday. Monday 6:00 to 15:00, Tuesday to Friday 6:00 to 18:00, Saturday 6:00 to 15:00. Closed Sunday." },
        { q: "Is Gellert Hill worth climbing?", a: "Absolutely — it offers the best 360-degree view of Budapest. The climb takes about 20 minutes." },
        { q: "Can you sit on Liberty Bridge?", a: "On summer weekends the bridge sometimes closes to traffic and locals sit on the iron framework — it has become a Budapest tradition." },
      ],
    ),
  },

  // ═══ ATHENS ═══════════════════════════════════════════════════════

  "athens-plaka-walk": {
    ja: ja(GR_JA_CTA,
      "プラカ地区の石畳と階段散策",
      "アテネのアクロポリス麓に広がるプラカ地区を歩く。新古典主義の建築、アナフィオティカのキクラデス風白壁集落、そして風の塔まで。石畳と階段の散策ルート。",
      ATHENS_PLAKA_IMAGES[0],
      ATHENS_PLAKA_IMAGES,
      ATHENS_X,
      [
        { heading: "このルートの魅力", body: "プラカはアテネ最古の居住地区で、アクロポリスの北東斜面に広がる迷路のような石畳の路地が特徴です。19世紀の新古典主義建築が並ぶキダティネオン通りやアドリアヌー通りがメインストリート。斜面を登るとアナフィオティカという白壁の小さな集落があり、まるでギリシャの島に迷い込んだような風景。ローマン・アゴラの風の塔やリシクラテスの記念碑など古代遺跡も点在し、歴史の層が重なるエリアです。" },
        { heading: "アクセスと歩き方", body: "メトロ1号線・3号線モナスティラキ駅またはアクロポリ駅から徒歩すぐ。アドリアヌー通りからスタートし、路地裏へ入っていくのがおすすめ。キダティネオン通り沿いのカフェでギリシャコーヒーを一杯。その後階段を登ってアナフィオティカへ。狭い路地と急な階段が続くため歩きやすい靴が必須。夏場は日差しが強烈なので午前中の散策がベスト。" },
        { heading: "主要スポット", body: "アナフィオティカはアナフィ島からの移住者が19世紀に建てた白壁にブーゲンビリアが彩る小集落で、アクロポリスの斜面に張り付くように建っています。リシクラテスの記念碑は現存する最古のコリント式円柱建築。風の塔は紀元前1世紀の天文時計塔で、ローマン・アゴラ内にあります。プラカの通りにはタベルナ（ギリシャ料理店）や土産物店が密集。" },
        { heading: "実用情報", body: "プラカのレストランは観光地価格ですが、路地裏に入ると地元向けの手頃な店もあります。アクロポリスの入場チケットにはローマン・アゴラなどの周辺遺跡が含まれる統合チケットがお得。夏の気温は40度を超えることがあるため、水と日焼け止めは必須。eSIMで遺跡の営業時間やレストランのレビューを確認しましょう。" },
      ],
      [
        { q: "プラカの散策時間は？", a: "メインストリートだけなら1時間、アナフィオティカや遺跡を含めると2〜3時間です。" },
        { q: "アナフィオティカへの行き方は？", a: "プラカの階段を上り続けるとアクロポリスの斜面に出ます。標識が少ないため迷いやすいですが、上へ登れば到着します。" },
        { q: "モナスティラキとプラカの違いは？", a: "隣接するエリアで境界は曖昧。モナスティラキはより商業的で蚤の市がある一方、プラカは住宅街と観光の混在です。" },
      ],
    ),
    en: en(GR_EN_CTA,
      "Plaka Cobblestone and Stairway Walk",
      "Wander Athens' oldest neighbourhood at the foot of the Acropolis. Neoclassical lanes, the Cycladic whitewash of Anafiotika, and ancient monuments tucked into residential streets.",
      ATHENS_PLAKA_IMAGES[0],
      ATHENS_PLAKA_IMAGES,
      ATHENS_X,
      [
        { heading: "Why this walk works", body: "Plaka is the oldest continuously inhabited district in Athens, a labyrinth of cobblestone lanes climbing the northeast slope of the Acropolis. Kydathineon and Adrianou streets are lined with 19th-century neoclassical buildings and form the main arteries. Higher up the slope, the tiny settlement of Anafiotika — white-washed houses built by immigrants from the island of Anafi — feels like a Cycladic village transplanted into the city. Roman-era monuments stand among the houses, layering 2,500 years of history into a compact walk." },
        { heading: "How to get there", body: "Metro Line 1 or 3 to Monastiraki or Akropoli station, then walk into Plaka. Start on Adrianou street and duck into the side alleys. Stop for a Greek coffee on Kydathineon. Then climb the stairs toward Anafiotika. The narrow lanes and steep steps demand comfortable shoes. In summer, walk in the morning to avoid the worst heat." },
        { heading: "Key stops", body: "Anafiotika is a cluster of white houses with bougainvillea clinging to the Acropolis slope, built by 19th-century settlers from Anafi island. The Lysicrates Monument is the best-preserved ancient choragic monument. The Tower of the Winds in the Roman Agora is a first-century BC clocktower. Plaka's streets are dense with tavernas and souvenir shops." },
        { heading: "Practical tips", body: "Plaka restaurants charge tourist prices, but quieter side streets have more affordable options. The combined Acropolis ticket includes the Roman Agora and several other sites — good value. Summer temperatures can exceed 40 degrees — carry water and sunscreen. An eSIM helps check site opening hours and restaurant reviews." },
      ],
      [
        { q: "How long does Plaka take?", a: "One hour for the main streets, two to three hours including Anafiotika and the ancient sites." },
        { q: "How do I find Anafiotika?", a: "Keep climbing the stairs from Plaka toward the Acropolis slope. Signage is minimal — just keep going uphill." },
        { q: "What is the difference between Monastiraki and Plaka?", a: "They border each other — Monastiraki is more commercial with the flea market, while Plaka is a mix of residential streets and tourism." },
      ],
    ),
  },

  "athens-monastiraki-walk": {
    ja: ja(GR_JA_CTA,
      "モナスティラキの蚤の市とアゴラ散歩",
      "アテネのモナスティラキ広場から蚤の市、古代アゴラ、エルムー通りまで。活気ある商業地区と古代遺跡が隣り合う独特のエリアを歩くルート。",
      ATHENS_MONASTIRAKI_IMAGES[0],
      ATHENS_MONASTIRAKI_IMAGES,
      ATHENS_X,
      [
        { heading: "このルートの魅力", body: "モナスティラキはアテネの商業の中心地で、広場からアクロポリスを見上げる景色は象徴的です。日曜に最も賑わう蚤の市ではアンティーク、レコード、古本、雑貨が並び、アヴィシニアス広場周辺は宝探しのような楽しさ。そのすぐ隣には古代アテネの市民生活の中心だったアゴラ遺跡が広がり、再建されたアッタロスのストアは圧巻。現代と古代のマーケットが隣り合うのはアテネならではの体験です。" },
        { heading: "アクセスと歩き方", body: "メトロ1号線・3号線モナスティラキ駅の真上が広場。広場からイフェストゥ通りを進むと蚤の市エリア。アヴィシニアス広場がアンティークの中心。その後南へ歩いて古代アゴラの入口へ。アゴラ見学後はエルムー通りを東に歩けばシンタグマ広場に出ます。日曜は蚤の市が最大規模で、午前中がベスト。" },
        { heading: "主要スポット", body: "アヴィシニアス広場はアンティーク家具や古いレコード、軍放出品などを扱う店が集まるエリア。古代アゴラはソクラテスやプラトンが歩いた場所で、ヘファイストス神殿は古代ギリシャで最も保存状態の良い神殿。アッタロスのストア（柱廊）は1950年代に再建され、内部はアゴラ博物館。エルムー通りはアテネ最大のショッピングストリートです。" },
        { heading: "実用情報", body: "蚤の市では現金が基本。値引き交渉は一般的です。古代アゴラの入場料は統合チケットに含まれます。周辺のカフェやレストランはカード決済可能。日曜のモナスティラキは非常に混雑するためスリに注意。eSIMで周辺の飲食店情報やアゴラの開館時間を確認できます。" },
      ],
      [
        { q: "蚤の市は何曜日がベスト？", a: "日曜が最も規模が大きく活気があります。平日も一部の店は営業しています。" },
        { q: "古代アゴラの所要時間は？", a: "博物館を含めて1〜1.5時間。遺跡好きなら2時間は楽しめます。" },
        { q: "モナスティラキ広場のおすすめは？", a: "広場のカフェでアクロポリスを眺めながらフラッペ（ギリシャ式アイスコーヒー）を飲むのが定番です。" },
      ],
    ),
    en: en(GR_EN_CTA,
      "Monastiraki Flea Market and Agora Walk",
      "From Monastiraki Square's Acropolis views through the Sunday flea market to the Ancient Agora where Socrates walked. Modern and ancient marketplaces side by side.",
      ATHENS_MONASTIRAKI_IMAGES[0],
      ATHENS_MONASTIRAKI_IMAGES,
      ATHENS_X,
      [
        { heading: "Why this walk works", body: "Monastiraki Square sits at the commercial heart of Athens, with the Acropolis rising directly behind. The flea market radiates outward, busiest on Sundays, when Avyssinias Square fills with antique furniture, vinyl records, books, and curiosities. Steps away, the Ancient Agora — where Socrates and Plato walked — spreads across a hillside with the best-preserved temple in Greece and a reconstructed stoa. Few cities let you walk between a modern and ancient marketplace in five minutes." },
        { heading: "How to get there", body: "Metro Line 1 or 3 to Monastiraki — the square is directly above the station. Walk along Ifestou street into the flea market area. Avyssinias Square is the antiques centre. Head south to the Ancient Agora entrance. After the Agora, walk east along Ermou Street to reach Syntagma Square. Sunday morning is the best time for the market at full scale." },
        { heading: "Key stops", body: "Avyssinias Square concentrates antique furniture, old records, and military surplus. The Ancient Agora contains the Temple of Hephaestus — the best-preserved ancient Greek temple. The Stoa of Attalos was reconstructed in the 1950s and houses the Agora Museum. Ermou Street is Athens' main shopping street." },
        { heading: "Practical tips", body: "Cash is preferred at flea market stalls. Bargaining is expected. Ancient Agora entry is included in the combined Acropolis ticket. Cafes and restaurants nearby accept cards. Sunday Monastiraki is very crowded — watch for pickpockets. An eSIM helps locate restaurants and check Agora hours." },
      ],
      [
        { q: "Which day is best for the flea market?", a: "Sunday has the largest and liveliest market. Some shops operate on weekdays too." },
        { q: "How long does the Ancient Agora take?", a: "One to 1.5 hours including the museum. History enthusiasts can easily spend two hours." },
        { q: "What should I do in Monastiraki Square?", a: "Grab a frappe — Greek iced coffee — at a square cafe and enjoy the Acropolis view." },
      ],
    ),
  },

  "athens-exarchia-walk": {
    ja: ja(GR_JA_CTA,
      "エクサルヒアのカフェとストリートアート",
      "アテネの学生街エクサルヒアを歩く。ストリートアートの壁画、独立系カフェ、国立考古学博物館、そしてストレフィの丘の隠れた絶景スポットまで。",
      ATHENS_EXARCHIA_IMAGES[0],
      ATHENS_EXARCHIA_IMAGES,
      ATHENS_X,
      [
        { heading: "このルートの魅力", body: "エクサルヒアはアテネ工科大学の周辺に広がる学生街で、ギリシャのカウンターカルチャーの中心地です。壁面を覆うストリートアートは政治的メッセージからアーティスティックな大作まで多彩。観光客はほとんど訪れないため、アテネのローカルな日常を感じられます。エクサルヒア広場のカフェで地元の学生や知識人に混じって過ごす時間は、観光地では味わえない体験。国立考古学博物館もエリアの西端にあります。" },
        { heading: "アクセスと歩き方", body: "メトロ2号線オモニア駅から東へ徒歩10分。国立考古学博物館からスタートし、ストゥルナリ通りを東へ進むとエクサルヒア広場に出ます。広場周辺の路地を自由に歩き、壁画を探索。その後ストレフィの丘へ登ると、観光客のいない穴場の展望台からアクロポリスが見えます。昼間の散策がおすすめで、カフェ巡りを楽しみましょう。" },
        { heading: "主要スポット", body: "国立考古学博物館はギリシャ最大の考古学コレクションを持ち、アガメムノンのマスクやアルテミシオンのポセイドン像など必見の展示品が揃います。エクサルヒア広場はカフェと本屋に囲まれた地元の社交場。ストレフィの丘は標高は低いですがリカヴィトスの丘より静かで、360度の眺望が楽しめます。アテネ工科大学は1973年の学生蜂起の歴史的舞台。" },
        { heading: "実用情報", body: "エクサルヒアのカフェやレストランは中心部より手頃。カード決済対応の店が増えています。治安はデモ隊と警察の衝突が稀に起きるエリアですが、昼間の観光客が巻き込まれることはほぼありません。ストレフィの丘は夜間は避けた方が無難。eSIMで博物館の企画展情報や周辺カフェのレビューを確認しましょう。" },
      ],
      [
        { q: "エクサルヒアの治安は大丈夫？", a: "昼間は安全に歩けます。デモが起きることがありますが、観光客が巻き込まれることは稀。夜のストレフィの丘は避けましょう。" },
        { q: "国立考古学博物館の所要時間は？", a: "ハイライトだけなら1.5時間、しっかり見ると3時間以上かかる大型博物館です。" },
        { q: "ストリートアートはどこで見られる？", a: "エクサルヒア広場周辺のほぼすべての路地に壁画があります。特にゾーノス通りやカリドロミオウ通り周辺が見応えあり。" },
      ],
    ),
    en: en(GR_EN_CTA,
      "Exarchia Cafe and Street Art Walk",
      "Explore Athens' countercultural neighbourhood. Exarchia offers street art murals, independent cafes, the National Archaeological Museum, and a hidden hilltop viewpoint at Strefi Hill.",
      ATHENS_EXARCHIA_IMAGES[0],
      ATHENS_EXARCHIA_IMAGES,
      ATHENS_X,
      [
        { heading: "Why this walk works", body: "Exarchia is Athens' student quarter, clustered around the Polytechnic University. It is the city's countercultural heart — walls are covered in street art ranging from political statements to large-scale artistic murals. Few tourists come here, so you experience an everyday Athens that the Acropolis area doesn't show. Exarchia Square's cafes mix students, intellectuals, and artists. The National Archaeological Museum, one of the world's great antiquities collections, sits at the neighbourhood's western edge." },
        { heading: "How to get there", body: "Metro Line 2 to Omonia station, then a 10-minute walk east. Start at the National Archaeological Museum and walk east along Stournari street to Exarchia Square. Wander freely through the side streets to find murals. Then climb Strefi Hill for a tourist-free viewpoint with Acropolis views. Daytime is best — combine walking with cafe stops." },
        { heading: "Key stops", body: "The National Archaeological Museum houses Greece's largest archaeological collection, including the Mask of Agamemnon and the Artemision bronze. Exarchia Square is surrounded by cafes and bookshops. Strefi Hill is low but quieter than Lycabettus, with 360-degree views. The Athens Polytechnic is historically significant as the site of the 1973 student uprising against the military junta." },
        { heading: "Practical tips", body: "Exarchia's cafes and restaurants are more affordable than central Athens. Card acceptance is growing. The area occasionally sees protests, but daytime tourists are almost never affected. Avoid Strefi Hill after dark. An eSIM helps check museum exhibitions and find cafe reviews." },
      ],
      [
        { q: "Is Exarchia safe?", a: "During the day it is perfectly safe. Protests can occur but rarely affect tourists. Avoid Strefi Hill at night." },
        { q: "How long does the archaeological museum take?", a: "Highlights take about 1.5 hours. A thorough visit needs 3 hours or more — it is a large museum." },
        { q: "Where is the best street art?", a: "Most alleys around Exarchia Square have murals. Zonou and Kallidromiou streets are particularly rich." },
      ],
    ),
  },

  // ═══ PORTO ════════════════════════════════════════════════════════

  "porto-ribeira-walk": {
    ja: ja(PT_JA_CTA,
      "リベイラ地区の河岸散策",
      "ポルトのドウロ川沿いリベイラ地区を歩く。世界遺産の河岸風景、ドン・ルイス1世橋、サン・フランシスコ教会、そしてガイア地区のポートワインセラーまで。",
      PORTO_RIBEIRA_IMAGES[0],
      PORTO_RIBEIRA_IMAGES,
      PORTO_X,
      [
        { heading: "このルートの魅力", body: "リベイラ地区はポルト歴史地区の中核をなすUNESCO世界遺産エリアで、ドウロ川沿いにカラフルな中世の建物が並ぶ風景はポルトの象徴です。河岸のカフェでポートワインを飲みながらドン・ルイス1世橋を眺める時間は格別。橋の上段を歩いて対岸のヴィラ・ノヴァ・デ・ガイアに渡ると、ポートワインのセラー（醸造所）が並び、試飲ツアーが楽しめます。サン・フランシスコ教会の金箔装飾やボルサ宮殿のアラブの間も必見です。" },
        { heading: "アクセスと歩き方", body: "メトロD線サン・ベント駅から坂を下って約10分でリベイラへ。カイス・ダ・リベイラの河岸沿いを歩き、サン・フランシスコ教会とボルサ宮殿を見学。その後ドン・ルイス1世橋の上段を歩いて渡り、ガイア側のワインセラーへ。帰りは橋の下段を渡って戻れます。ポルトは坂の街なので歩きやすい靴が必須。" },
        { heading: "主要スポット", body: "カイス・ダ・リベイラはドウロ川沿いのメインプロムナードで、カラフルな建物とテラスカフェが並びます。サン・フランシスコ教会は外観は質素ですが内部は金箔で覆い尽くされた圧巻の装飾。ボルサ宮殿のアラブの間はアルハンブラ宮殿に着想を得た内装。ドン・ルイス1世橋の上段からはポルトとガイア両岸の全景。ガイアのセラーではテイラーズ、サンデマン、グラハムズなどが試飲ツアーを提供。" },
        { heading: "実用情報", body: "リベイラのレストランは観光地価格。少し坂を上がると手頃な店があります。ワインセラーの試飲ツアーは15〜20ユーロが相場で予約推奨。ボルサ宮殿はガイドツアーのみで入場可能。橋の上段は風が強いことがあるため上着を。eSIMでセラーの予約やレストラン検索が便利です。" },
      ],
      [
        { q: "ポートワインの試飲ツアーのおすすめは？", a: "テイラーズは眺望が良く、サンデマンは歴史的なセラーが見事。予約してから行くのがベストです。" },
        { q: "ドン・ルイス1世橋の上段は怖い？", a: "高さがあり手すりも低めですが、歩道は十分な幅があります。高所恐怖症の方は下段を利用しましょう。" },
        { q: "リベイラの所要時間は？", a: "河岸散策だけなら1時間。教会とワインセラー試飲を含めると半日です。" },
      ],
    ),
    en: en(PT_EN_CTA,
      "Ribeira Waterfront Walk",
      "Walk Porto's UNESCO-listed Ribeira district along the Douro River. Colourful medieval facades, the Dom Luis I Bridge, gilded churches, and port wine cellars across the river in Gaia.",
      PORTO_RIBEIRA_IMAGES[0],
      PORTO_RIBEIRA_IMAGES,
      PORTO_X,
      [
        { heading: "Why this walk works", body: "Ribeira is the heart of Porto's UNESCO World Heritage zone. Colourful medieval buildings line the Douro riverfront, and the double-deck Dom Luis I Bridge frames the scene. Cross the upper deck on foot to Vila Nova de Gaia, where port wine cellars offer tasting tours. Back on the Porto side, the Igreja de Sao Francisco hides an astonishing gilded interior behind a plain facade, and the Bolsa Palace's Arab Room rivals anything in southern Spain. This walk connects Porto's signature river views with its finest interiors." },
        { heading: "How to get there", body: "Metro Line D to Sao Bento station, then walk downhill for about 10 minutes to the riverfront. Walk along Cais da Ribeira, visit Sao Francisco church and the Bolsa Palace, then cross the upper deck of the Dom Luis I Bridge to Gaia for wine cellars. Return via the lower deck. Porto is hilly — sturdy shoes are essential." },
        { heading: "Key stops", body: "Cais da Ribeira is the main waterfront promenade with terrace cafes and colourful buildings. Igreja de Sao Francisco is covered in gilded woodwork inside. The Bolsa Palace Arab Room draws from Alhambra-inspired design. The upper deck of Dom Luis I Bridge delivers panoramic views of both banks. In Gaia, Taylor's, Sandeman, and Graham's all offer cellar tours with tastings." },
        { heading: "Practical tips", body: "Ribeira restaurant prices reflect the tourist location — walk uphill a few blocks for better value. Wine cellar tours cost 15 to 20 euros and booking ahead is recommended. The Bolsa Palace is guided-tour only. The upper bridge deck can be windy — bring a layer. An eSIM makes cellar bookings and restaurant searches easy." },
      ],
      [
        { q: "Which port wine cellar is best?", a: "Taylor's has the best views, Sandeman has impressive historic cellars. Book in advance for all." },
        { q: "Is the upper bridge deck scary?", a: "It is high with low railings, but the walkway is wide enough. Use the lower deck if you dislike heights." },
        { q: "How long does Ribeira take?", a: "One hour for the waterfront alone. Half a day including the church and a wine cellar tasting." },
      ],
    ),
  },

  "porto-cedofeita-walk": {
    ja: ja(PT_JA_CTA,
      "セドフェイタのギャラリーとカフェ通り",
      "ポルトのクリエイティブ地区セドフェイタを歩く。ミゲル・ボンバルダ通りのギャラリー、ボリャン市場、クリスタル宮殿庭園からのドウロ川の眺望まで。",
      PORTO_CEDOFEITA_IMAGES[0],
      PORTO_CEDOFEITA_IMAGES,
      PORTO_X,
      [
        { heading: "このルートの魅力", body: "セドフェイタはポルト中心部の北西に位置するクリエイティブなエリアです。ルア・ミゲル・ボンバルダはコンテンポラリーアートのギャラリーが集中する通りで、月に一度のオープニングナイトには通りがアートイベントに変わります。歩行者天国のセドフェイタ通りにはインディーブティックやスペシャルティコーヒーの店が並び、地元の人々が日常的に利用するボリャン市場ではポルトの食文化に触れられます。" },
        { heading: "アクセスと歩き方", body: "メトロD線アリアードシュ駅から北西へ徒歩10分。ボリャン市場からスタートし、セドフェイタ通りを西へ歩きます。途中でルア・ミゲル・ボンバルダへ寄り道してギャラリーを巡り、最後にクリスタル宮殿庭園でドウロ川の眺望を楽しみましょう。午前はカフェ巡り、午後はギャラリーが開くタイミングが理想的。" },
        { heading: "主要スポット", body: "ボリャン市場は2022年にリノベーションされた歴史的な2階建て市場で、1階は生鮮食品、2階はフードコート。ルア・ミゲル・ボンバルダには10軒以上のギャラリーが集まり、無料で見学可能。セドフェイタ教会はイベリア半島最古級のロマネスク教会とされています。クリスタル宮殿庭園は美しい庭園と、ドウロ川渓谷のパノラマビューが楽しめる穴場スポットです。" },
        { heading: "実用情報", body: "ギャラリーは火〜土の午後がメインの営業時間。月曜休みが多いです。カフェやレストランはカード決済対応。ボリャン市場は日曜休み。クリスタル宮殿庭園は入場無料で日没まで開放。eSIMでギャラリーの展示スケジュールやイベント情報をチェックしましょう。" },
      ],
      [
        { q: "ミゲル・ボンバルダ通りのオープニングナイトはいつ？", a: "通常月に一度の土曜夜に開催されますが、日程は変動するため事前確認を。" },
        { q: "ボリャン市場の営業時間は？", a: "月〜土の朝から夕方まで。日曜休み。2階のフードコートは夜まで営業。" },
        { q: "リベイラからどのくらい離れている？", a: "リベイラから坂を上って徒歩20〜25分。またはメトロで2駅です。" },
      ],
    ),
    en: en(PT_EN_CTA,
      "Cedofeita Gallery and Cafe Walk",
      "Discover Porto's creative quarter. Rua Miguel Bombarda galleries, the renovated Bolhao Market, independent coffee shops, and panoramic Douro views from Crystal Palace Gardens.",
      PORTO_CEDOFEITA_IMAGES[0],
      PORTO_CEDOFEITA_IMAGES,
      PORTO_X,
      [
        { heading: "Why this walk works", body: "Cedofeita sits northwest of Porto's centre and is the city's creative district. Rua Miguel Bombarda is lined with contemporary art galleries that host a monthly open-night event. Pedestrianised Rua de Cedofeita has independent boutiques and speciality coffee shops. The renovated Bolhao Market reconnects the area to Porto's food culture, while Crystal Palace Gardens — often missed by tourists — offer one of the city's finest panoramic views over the Douro valley." },
        { heading: "How to get there", body: "Metro Line D to Aliados station, then walk northwest for about 10 minutes. Start at Bolhao Market, head west along Rua de Cedofeita, detour to Rua Miguel Bombarda for galleries, and finish at Crystal Palace Gardens for the view. Mornings suit cafe-hopping; afternoons are best when galleries open." },
        { heading: "Key stops", body: "Bolhao Market was renovated in 2022 — fresh produce downstairs, food court upstairs. Rua Miguel Bombarda has over ten galleries, all free to visit. Igreja da Cedofeita is considered one of the oldest Romanesque churches on the Iberian Peninsula. Crystal Palace Gardens are free, beautifully landscaped, and open until sunset with a panoramic Douro view." },
        { heading: "Practical tips", body: "Most galleries are open Tuesday to Saturday afternoons. Monday is typically closed. Cafes and restaurants accept cards. Bolhao Market is closed Sunday. Crystal Palace Gardens are free and open until sunset. An eSIM helps check gallery schedules and event listings." },
      ],
      [
        { q: "When is the Miguel Bombarda gallery night?", a: "Usually one Saturday evening per month — dates vary, so check in advance." },
        { q: "What are Bolhao Market's hours?", a: "Monday to Saturday, morning to evening. Closed Sunday. The upstairs food court stays open later." },
        { q: "How far is it from Ribeira?", a: "About 20 to 25 minutes uphill on foot, or two metro stops." },
      ],
    ),
  },

  // ═══ STOCKHOLM ════════════════════════════════════════════════════

  "stockholm-gamla-stan-walk": {
    ja: ja(SE_JA_CTA,
      "ガムラスタン（旧市街）の路地散策",
      "ストックホルムの旧市街ガムラスタンを歩く。中世の路地、ストールトルゲット広場、王宮、北欧最狭の通りを巡るコンパクトな島の散策ルート。",
      STOCKHOLM_GAMLA_STAN_IMAGES[0],
      STOCKHOLM_GAMLA_STAN_IMAGES,
      STOCKHOLM_X,
      [
        { heading: "このルートの魅力", body: "ガムラスタンは13世紀に起源を持つストックホルムの旧市街で、小さな島全体が中世の街並みです。ストールトルゲット広場を囲むカラフルな商館、600以上の部屋を持つ王宮、幅わずか90cmのモーテン・トロツィグ小路など、見どころがコンパクトに凝縮。観光客が多いエリアですが、メインストリートから一歩外れると静かな路地と中庭が現れます。ノーベル博物館も広場に面しています。" },
        { heading: "アクセスと歩き方", body: "メトロ赤線・緑線ガムラスタン駅から徒歩すぐ。まずストールトルゲット広場へ向かい、そこから路地を自由に探索するのがベスト。王宮は北端に位置し、衛兵交代は正午頃。モーテン・トロツィグ小路は西側にあり見逃しやすいので地図を確認。島は小さいため1〜2時間で主要スポットを回れますが、カフェ休憩を入れてゆっくり歩くのがおすすめ。" },
        { heading: "主要スポット", body: "ストールトルゲット広場はストックホルム最古の広場で、ノーベル博物館が面しています。王宮は現在も公式行事に使用されており、一部を博物館として公開。ストールシュルカン（大教会）は13世紀創建のストックホルム大聖堂。ドイツ教会の銅の尖塔はガムラスタンのスカイラインのランドマーク。モーテン・トロツィグ小路は幅90cmのストックホルム最狭の通りで、フォトスポットとして人気。" },
        { heading: "実用情報", body: "ガムラスタンのレストランは観光地価格。フィーカ（スウェーデン式コーヒー休憩）ならカフェでシナモンロールとコーヒーを。カード社会のスウェーデンでは現金はほぼ不要。王宮の入場料は約180SEK。冬場は日照時間が短いため午前中の訪問を。eSIMでフェリーの時刻表や周辺情報を確認できます。" },
      ],
      [
        { q: "ガムラスタンの所要時間は？", a: "主要スポットだけなら1〜2時間。カフェ休憩や博物館見学を含めると半日。" },
        { q: "衛兵交代は何時？", a: "通常12:15頃。日曜は13:15。時期によって変動するため事前確認を。" },
        { q: "冬でも楽しめる？", a: "はい。クリスマスマーケットが開かれる12月は特に雰囲気があります。ただし日照時間が短く15時頃に暗くなります。" },
      ],
    ),
    en: en(SE_EN_CTA,
      "Gamla Stan Old Town Lane Walk",
      "Explore Stockholm's medieval island quarter. Cobblestone lanes, Stortorget Square's merchant houses, the Royal Palace, and the narrowest street in the city — all on one small island.",
      STOCKHOLM_GAMLA_STAN_IMAGES[0],
      STOCKHOLM_GAMLA_STAN_IMAGES,
      STOCKHOLM_X,
      [
        { heading: "Why this walk works", body: "Gamla Stan dates from the 13th century and occupies an entire small island. The colourful merchant houses around Stortorget square, the Royal Palace with over 600 rooms, and the 90-centimetre-wide Marten Trotzigs Grand are packed into a walkable area. Main streets attract crowds, but one turn into a side alley reveals quiet courtyards and medieval details. The Nobel Prize Museum faces the main square, adding cultural weight to the architecture." },
        { heading: "How to get there", body: "Metro red or green line to Gamla Stan station. Head to Stortorget first, then explore the lanes radiating outward. The Royal Palace sits at the north end — the changing of the guard happens around noon. Marten Trotzigs Grand is on the west side and easy to miss without a map. The island is small enough to cover in one to two hours, though a relaxed pace with fika stops is recommended." },
        { heading: "Key stops", body: "Stortorget is Stockholm's oldest square, fronted by the Nobel Prize Museum. The Royal Palace is still used for official functions, with sections open as museums. Storkyrkan is a 13th-century cathedral. The German Church's copper spire is a Gamla Stan skyline landmark. Marten Trotzigs Grand at 90 centimetres wide is Stockholm's narrowest street and a popular photo spot." },
        { heading: "Practical tips", body: "Gamla Stan restaurants charge tourist prices. For fika, find a cafe serving cinnamon buns and coffee. Sweden is almost cashless — cards work everywhere. Royal Palace entry costs about 180 SEK. In winter, daylight is short — visit in the morning. An eSIM helps with ferry timetables and local information." },
      ],
      [
        { q: "How long does Gamla Stan take?", a: "One to two hours for the main sights. Half a day with cafe stops and museum visits." },
        { q: "When is the changing of the guard?", a: "Usually at 12:15, or 13:15 on Sundays. Times vary seasonally — check in advance." },
        { q: "Is it worth visiting in winter?", a: "Yes — the December Christmas market adds atmosphere. But daylight ends around 15:00." },
      ],
    ),
  },

  "stockholm-sodermalm-walk": {
    ja: ja(SE_JA_CTA,
      "セーデルマルムのカフェとヴィンテージ",
      "ストックホルムの若者の街セーデルマルムを歩く。SoFoのヴィンテージショップ、モンテリウスの崖上散歩道、フォトグラフィスカ美術館まで。",
      STOCKHOLM_SODERMALM_IMAGES[0],
      STOCKHOLM_SODERMALM_IMAGES,
      STOCKHOLM_X,
      [
        { heading: "このルートの魅力", body: "セーデルマルムはストックホルムで最もヒップな島で、かつての労働者階級の街がクリエイターやデザイナーが集まるトレンディなエリアに変貌しました。SoFo（フォルクンガータン通りの南）にはヴィンテージショップ、デザイン雑貨店、スペシャルティコーヒーの店が密集。モンテリウスヴェーゲンは崖沿いの散歩道で、市庁舎やリッダーフィヤルデンの水辺を見渡す絶景スポット。写真美術館フォトグラフィスカも島の東端にあります。" },
        { heading: "アクセスと歩き方", body: "メトロ赤線スルッセン駅からセーデルマルムへ。まずモンテリウスヴェーゲンの絶景を楽しんでから、メーラルダーレン地区を通ってSoFoエリアへ。ニュートルゲット広場周辺のカフェで休憩し、フォルクンガータン通り南側のショップを探索。最後にフォトグラフィスカまで東へ歩きましょう。坂の多い島ですが主要エリアはコンパクトです。" },
        { heading: "主要スポット", body: "モンテリウスヴェーゲンは全長500mの崖上遊歩道で、市庁舎とメーラレン湖の眺望が素晴らしい。ニュートルゲット広場はSoFo地区の中心で、カフェとレストランに囲まれた地元の集会所。スキンナルヴィクスベリエットはストックホルムの最高自然地点で、360度のパノラマが楽しめます。フォトグラフィスカは世界最大級の写真専門美術館。" },
        { heading: "実用情報", body: "スウェーデンはカード社会で現金はほぼ不要。カフェでのフィーカ（コーヒー休憩）はスウェーデン文化の基本。ヴィンテージショップは12時頃から開く店が多い。フォトグラフィスカの入場料は約195SEK。モンテリウスヴェーゲンは冬場は凍結に注意。eSIMで展示情報やカフェの営業時間をチェックしましょう。" },
      ],
      [
        { q: "SoFoとは？", a: "South of Folkungagatan（フォルクンガータン通りの南）の略で、セーデルマルム島南東部のトレンディなショッピングエリアです。" },
        { q: "モンテリウスヴェーゲンは何時でも歩ける？", a: "24時間開放されています。夕暮れ時が最も美しいですが、冬の日中も素晴らしい眺めです。" },
        { q: "ガムラスタンから近い？", a: "スルッセンの橋を渡ってすぐ。ガムラスタンと組み合わせての散策が効率的です。" },
      ],
    ),
    en: en(SE_EN_CTA,
      "Sodermalm Cafe and Vintage Walk",
      "Walk Stockholm's hippest island. SoFo vintage shops, the Monteliusvagen cliffside path, Fotografiska photography museum, and Skinnarviksberget's panoramic hilltop.",
      STOCKHOLM_SODERMALM_IMAGES[0],
      STOCKHOLM_SODERMALM_IMAGES,
      STOCKHOLM_X,
      [
        { heading: "Why this walk works", body: "Sodermalm is Stockholm's most fashionable island — a former working-class neighbourhood that has become a hub for creatives and designers. SoFo (South of Folkungagatan) concentrates vintage shops, design stores, and speciality coffee. Monteliusvagen is a 500-metre cliffside path with views over City Hall and the waterfront. Fotografiska, one of the world's largest photography museums, sits at the island's eastern edge. The mix of views, shopping, and culture makes for a satisfying day." },
        { heading: "How to get there", body: "Metro red line to Slussen station. Start with the Monteliusvagen viewpoint, then walk through Mariatorget to the SoFo area. Stop at Nytorget square for a cafe break. Browse the shops south of Folkungagatan, then walk east to Fotografiska. The island is hilly but the main areas are compact." },
        { heading: "Key stops", body: "Monteliusvagen is a 500-metre cliffside promenade with views of City Hall and Lake Malaren. Nytorget square is the SoFo social hub surrounded by cafes. Skinnarviksberget is Stockholm's highest natural point with a full city panorama. Fotografiska is one of the world's largest photography-dedicated museums." },
        { heading: "Practical tips", body: "Sweden is virtually cashless — cards work everywhere. Fika (coffee break) is central to Swedish culture — embrace it. Vintage shops tend to open around noon. Fotografiska costs about 195 SEK. Monteliusvagen can be icy in winter — watch your step. An eSIM helps check exhibitions and cafe hours." },
      ],
      [
        { q: "What is SoFo?", a: "South of Folkungagatan — the trendy shopping area in southeastern Sodermalm." },
        { q: "Can I walk Monteliusvagen any time?", a: "It is open 24 hours. Sunset is the most beautiful, but daytime views in winter are excellent too." },
        { q: "Is it close to Gamla Stan?", a: "Just across the Slussen bridge — combining the two makes an efficient day." },
      ],
    ),
  },

  "stockholm-djurgarden-walk": {
    ja: ja(SE_JA_CTA,
      "ユールゴーデン島の博物館と散歩道",
      "ストックホルムのミュージアム島ユールゴーデンを歩く。ヴァーサ号博物館、スカンセン野外博物館、ABBA博物館、そしてローゼンダールの庭園カフェまで。",
      STOCKHOLM_DJURGARDEN_IMAGES[0],
      STOCKHOLM_DJURGARDEN_IMAGES,
      STOCKHOLM_X,
      [
        { heading: "このルートの魅力", body: "ユールゴーデンはストックホルム中心部に浮かぶ緑豊かな島で、スウェーデンを代表する博物館が集中しています。17世紀の軍艦がほぼ完全な状態で保存されたヴァーサ号博物館、世界初の野外博物館スカンセン、ABBAミュージアムなど、一日では回りきれないほど充実。博物館の合間には島の散歩道を歩いてローゼンダール庭園のカフェで有機ランチを楽しむのがおすすめ。自然と文化が共存するストックホルムの魅力が凝縮された島です。" },
        { heading: "アクセスと歩き方", body: "トラム7号線でユールゴーデン停留所下車、またはニュブロカイェンからフェリーで渡ると風情があります。島の西端から東へ歩くルートが効率的。まずヴァーサ号博物館を見学し、隣のノルディスカ博物館を経て、スカンセンまたはABBAミュージアムへ。午後はローゼンダール庭園でフィーカ。帰りは水辺の散歩道を歩いてフェリー乗り場へ戻りましょう。" },
        { heading: "主要スポット", body: "ヴァーサ号博物館は1628年に沈没した軍艦を333年後に引き揚げ、98%がオリジナルの木造船を展示。スカンセンは1891年創設の世界初の野外博物館で、スウェーデン各地の歴史的建物を移築展示。ABBAミュージアムはインタラクティブな展示で仮想ステージに立てます。ローゼンダール庭園はバイオダイナミック農法の庭園にグリーンハウスカフェが併設。" },
        { heading: "実用情報", body: "ヴァーサ号博物館は約190SEK、スカンセンは約220SEK、ABBAミュージアムは約250SEK。オンライン事前購入で割引あり。ローゼンダール庭園のカフェは人気のため12時前に行くのがベスト。島内は車が少なく歩きやすい環境。冬場はスカンセンでクリスマスマーケットが開催されます。eSIMでチケット購入やフェリー時刻を確認しましょう。" },
      ],
      [
        { q: "ユールゴーデンで一番のおすすめは？", a: "ヴァーサ号博物館はストックホルム訪問のハイライトです。17世紀の軍艦の迫力は写真では伝わりません。" },
        { q: "何時間必要？", a: "主要博物館2〜3館で半日。全部回るなら丸一日。庭園カフェでの休憩も入れましょう。" },
        { q: "冬でも楽しめる？", a: "博物館が主体なので冬でも十分楽しめます。12月はスカンセンのクリスマスマーケットが名物です。" },
      ],
    ),
    en: en(SE_EN_CTA,
      "Djurgarden Museum Island Walk",
      "Explore Stockholm's green museum island. The Vasa warship, Skansen open-air museum, ABBA The Museum, and Rosendal's garden cafe — all connected by waterside paths.",
      STOCKHOLM_DJURGARDEN_IMAGES[0],
      STOCKHOLM_DJURGARDEN_IMAGES,
      STOCKHOLM_X,
      [
        { heading: "Why this walk works", body: "Djurgarden is a green island in central Stockholm packed with Sweden's most important museums. The Vasa Museum houses a 17th-century warship salvaged almost intact after 333 years underwater. Skansen, founded in 1891, was the world's first open-air museum. ABBA The Museum lets you stand on a virtual stage. Between museums, tree-lined paths lead to Rosendal's Garden — a biodynamic garden with a greenhouse cafe. Nature and culture coexist on an island that could fill an entire day." },
        { heading: "How to get there", body: "Tram 7 to Djurgarden stop, or take the ferry from Nybrokajen for a scenic approach. Walk west to east across the island. Start at the Vasa Museum, continue to Nordiska Museet, then choose Skansen or ABBA The Museum. Afternoon fika at Rosendal's Garden. Walk back along the waterfront path to the ferry dock." },
        { heading: "Key stops", body: "The Vasa Museum displays a 1628 warship — 98 percent original timber — that sank on its maiden voyage and was raised in 1961. Skansen has historic buildings from across Sweden transplanted to a hillside. ABBA The Museum is interactive, letting visitors perform on a virtual stage. Rosendal's Garden combines biodynamic farming with a popular greenhouse cafe." },
        { heading: "Practical tips", body: "Vasa Museum costs about 190 SEK, Skansen about 220 SEK, ABBA The Museum about 250 SEK. Online tickets offer discounts. Rosendal's cafe is popular — arrive before noon. The island has little car traffic and is easy to walk. Skansen runs a Christmas market in winter. An eSIM helps with ticket purchases and ferry timetables." },
      ],
      [
        { q: "What is the top attraction on Djurgarden?", a: "The Vasa Museum — the 17th-century warship is a Stockholm highlight that photos cannot convey." },
        { q: "How many hours do I need?", a: "Half a day for two or three museums. A full day to see everything, with a garden cafe break." },
        { q: "Is it worth visiting in winter?", a: "The museums are all indoors, so winter works well. Skansen's December Christmas market is a highlight." },
      ],
    ),
  },

  // ═══ HELSINKI ═════════════════════════════════════════════════════

  "helsinki-design-district-walk": {
    ja: ja(FI_JA_CTA,
      "デザインディストリクトの散策",
      "ヘルシンキのデザインディストリクトを歩く。デザインミュージアム、カンッピ礼拝堂、北欧デザインのショップとギャラリーを巡る散策ルート。",
      HELSINKI_DESIGN_IMAGES[0],
      HELSINKI_DESIGN_IMAGES,
      HELSINKI_X,
      [
        { heading: "このルートの魅力", body: "ヘルシンキのデザインディストリクトはフレドリキンカトゥ通りを中心に広がる25ブロックのクリエイティブエリアで、200以上のデザインショップ、ギャラリー、アンティーク店、カフェが点在します。フィンランドデザインの殿堂であるデザインミュージアムを起点に、マリメッコやイッタラの旗艦店から個人デザイナーのアトリエまで、北欧デザインの幅広さを体感できます。カンッピ礼拝堂の曲線的な木造建築も必見のランドマークです。" },
        { heading: "アクセスと歩き方", body: "トラム1番・2番でフレドリキンカトゥ下車、またはメトロでカンッピ駅。デザインミュージアムからスタートし、フレドリキンカトゥ通りを北上しながらショップを巡りましょう。ディアナ公園周辺にはカフェが集中。カンッピ礼拝堂を経て、エスプラナーディ通りまで歩けば、マーケット広場も近いです。エリアはコンパクトで2〜3時間で回れます。" },
        { heading: "主要スポット", body: "デザインミュージアムは19世紀から現代までのフィンランドデザインの歴史を展示。カンッピ礼拝堂は「沈黙の礼拝堂」と呼ばれ、曲線的な木造の外観が特徴的な静寂の空間。エスプラナーディ通りはヘルシンキで最も有名な並木道で、マリメッコやイッタラの大型店舗が並びます。ディアナ公園はデザインディストリクトの中心にある小さな緑地で、休憩スポットに最適。" },
        { heading: "実用情報", body: "フィンランドはカード社会で現金はほぼ不要。デザインミュージアムの入場料は約12ユーロ。カンッピ礼拝堂は入場無料。ショップは月〜土の10時〜18時が一般的、日曜は休みか短縮営業。デザインディストリクトの地図はデザインミュージアムで入手可能。eSIMでショップの営業時間や展示情報を確認しましょう。" },
      ],
      [
        { q: "デザインディストリクトの範囲は？", a: "約25ブロックで、フレドリキンカトゥ通りとブレヴァルディ通りの周辺に集中しています。" },
        { q: "カンッピ礼拝堂は何？", a: "2012年に建てられた曲線的な木造の礼拝堂で、宗教に関係なく誰でも静寂の空間を体験できます。入場無料。" },
        { q: "北欧デザインの買い物でおすすめは？", a: "アラビア・イッタラのファクトリーストアが品揃え豊富でお得。デザインディストリクト内の小さなアトリエでは一点物も見つかります。" },
      ],
    ),
    en: en(FI_EN_CTA,
      "Design District Walk",
      "Explore Helsinki's creative quarter. The Design Museum, Kamppi Chapel, Nordic design shops, and galleries concentrated in 25 walkable blocks.",
      HELSINKI_DESIGN_IMAGES[0],
      HELSINKI_DESIGN_IMAGES,
      HELSINKI_X,
      [
        { heading: "Why this walk works", body: "Helsinki's Design District spans 25 blocks around Fredrikinkatu street, housing over 200 design shops, galleries, antique stores, and cafes. Starting from the Design Museum, the walk covers everything from Marimekko and Iittala flagships to individual designer ateliers. The area captures the full breadth of Nordic design in a walkable radius. Kamppi Chapel — a curved wooden structure in the heart of the city — adds an architectural landmark that embodies Finnish design philosophy." },
        { heading: "How to get there", body: "Tram 1 or 2 to Fredrikinkatu, or metro to Kamppi station. Start at the Design Museum and walk north along Fredrikinkatu, browsing shops as you go. Diana Park has a cluster of cafes for a break. Continue to Kamppi Chapel, then walk to Esplanadi boulevard — Market Square is nearby. The district is compact and takes two to three hours." },
        { heading: "Key stops", body: "The Design Museum traces Finnish design history from the 19th century to the present. Kamppi Chapel — the Chapel of Silence — is a curved timber structure open to anyone seeking quiet. Esplanadi boulevard is Helsinki's most famous promenade, lined with Marimekko and Iittala stores. Diana Park is a small green space perfect for a rest." },
        { heading: "Practical tips", body: "Finland is nearly cashless — cards work everywhere. The Design Museum costs about 12 euros. Kamppi Chapel is free. Shops are generally open Monday to Saturday 10:00 to 18:00; Sunday hours are reduced or closed. A Design District map is available at the Design Museum. An eSIM helps check shop hours and exhibition schedules." },
      ],
      [
        { q: "How big is the Design District?", a: "About 25 blocks, concentrated around Fredrikinkatu and Bulevardi streets." },
        { q: "What is Kamppi Chapel?", a: "A curved wooden chapel built in 2012, open to anyone regardless of religion as a space for silence and reflection. Free entry." },
        { q: "Where should I shop for Nordic design?", a: "The Arabia-Iittala factory store has wide selection at good prices. Small ateliers in the Design District carry unique one-off pieces." },
      ],
    ),
  },

  "helsinki-kallio-walk": {
    ja: ja(FI_JA_CTA,
      "カッリオのローカルカフェと教会散歩",
      "ヘルシンキのローカルな下町カッリオ地区を歩く。カッリオ教会、ハカニエミ市場、独立系カフェ、そして地元の公園を巡る散策ルート。",
      HELSINKI_KALLIO_IMAGES[0],
      HELSINKI_KALLIO_IMAGES,
      HELSINKI_X,
      [
        { heading: "このルートの魅力", body: "カッリオはヘルシンキ中心部の北東に位置する元労働者階級の街で、現在は若いクリエイターやミュージシャンが集まるローカル色の強いエリアです。観光客がほとんど訪れないため、ヘルシンキの日常生活を体感できます。カッリオ教会の花崗岩の塔はヘルシンキの主要ランドマーク。ハカニエミ市場ではフィンランドの家庭料理や生鮮食品に出会え、通りのカフェではサードウェーブコーヒーが楽しめます。" },
        { heading: "アクセスと歩き方", body: "メトロでハカニエミ駅下車。ハカニエミ市場からスタートし、シルタサーレンカトゥ通りを北上してカッリオ教会へ。教会周辺から脇道へ入り、カフェやヴィンテージショップを探索。カルフプイスト（クマ公園）で一休みし、周辺のバーやレストランを覗きましょう。コンパクトなエリアで1.5〜2時間あれば十分回れます。" },
        { heading: "主要スポット", body: "ハカニエミ市場は2023年にリノベーション完了した地元密着型の屋内市場で、観光客向けの旧市場ホールとは一味違います。カッリオ教会は1912年完成のアール・ヌーヴォー様式の花崗岩教会で、内部の音響が素晴らしく定期的にコンサートが開催されます。カルフプイストは地元の人々が集う公園で、夏場はピクニック、冬はそり遊びの場。カッリオの通り沿いにはアール・ヌーヴォー建築が残っています。" },
        { heading: "実用情報", body: "カッリオのカフェやレストランは中心部より手頃。カード決済が一般的。ハカニエミ市場は月〜土営業、日曜休み。カッリオ教会は開放時間が限られるため事前確認を。夜はバー街として賑わいますが治安は良好。eSIMで営業時間やイベント情報を確認しましょう。" },
      ],
      [
        { q: "カッリオは観光客向けの場所？", a: "いいえ、地元の生活圏です。だからこそヘルシンキの日常を体験できる貴重なエリアです。" },
        { q: "ハカニエミ市場のおすすめは？", a: "カレリアンピーラッカ（米入りパイ）とサーモンスープが定番。2階にはフィンランドの伝統工芸品も。" },
        { q: "中心部からの距離は？", a: "ヘルシンキ大聖堂からトラムまたは徒歩で15分ほど。メトロなら1駅です。" },
      ],
    ),
    en: en(FI_EN_CTA,
      "Kallio Local Cafe and Church Walk",
      "Discover Helsinki's creative working-class neighbourhood. Kallio Church, Hakaniemi Market, independent cafes, and Art Nouveau streets away from the tourist centre.",
      HELSINKI_KALLIO_IMAGES[0],
      HELSINKI_KALLIO_IMAGES,
      HELSINKI_X,
      [
        { heading: "Why this walk works", body: "Kallio is a former working-class district northeast of Helsinki's centre that has become the city's creative and musical heart. Tourists rarely visit, making it ideal for experiencing everyday Helsinki. Kallio Church's granite tower is one of the city's most visible landmarks. Hakaniemi Market offers local food culture, and the streets are lined with third-wave coffee shops in Art Nouveau buildings. It is Helsinki without the polish." },
        { heading: "How to get there", body: "Metro to Hakaniemi station. Start at Hakaniemi Market, walk north along Siltasaarenkatu to Kallio Church. Explore the side streets for cafes and vintage shops. Rest at Karhupuisto (Bear Park) and browse the nearby bars and restaurants. The area is compact — 1.5 to 2 hours covers the highlights." },
        { heading: "Key stops", body: "Hakaniemi Market was renovated in 2023 and serves a local crowd rather than tourists. Kallio Church, completed in 1912, is an Art Nouveau granite church with excellent acoustics — regular concerts are held. Karhupuisto is the neighbourhood park where locals gather. Kallio's streets have well-preserved Art Nouveau apartment buildings with cafes and bars at street level." },
        { heading: "Practical tips", body: "Kallio cafes and restaurants are cheaper than the centre. Card payment is standard. Hakaniemi Market is open Monday to Saturday, closed Sunday. Kallio Church has limited opening hours — check ahead. The area is lively at night as a bar district but safe. An eSIM helps check hours and event listings." },
      ],
      [
        { q: "Is Kallio a tourist area?", a: "No — it is a local residential neighbourhood. That is exactly why it offers an authentic Helsinki experience." },
        { q: "What should I try at Hakaniemi Market?", a: "Karelian pies (karjalanpiirakka) and salmon soup are essentials. The upper floor has Finnish handicrafts." },
        { q: "How far is it from the centre?", a: "About 15 minutes by tram or on foot from Helsinki Cathedral. One metro stop." },
      ],
    ),
  },

  "helsinki-suomenlinna-walk": {
    ja: ja(FI_JA_CTA,
      "スオメンリンナ要塞島の半日散策",
      "ヘルシンキ沖のUNESCO世界遺産スオメンリンナ要塞を半日散策。城壁の散歩道、博物館、ドライドック、そしてフィンランド湾の絶景を巡るルート。",
      HELSINKI_SUOMENLINNA_IMAGES[0],
      HELSINKI_SUOMENLINNA_IMAGES,
      HELSINKI_X,
      [
        { heading: "このルートの魅力", body: "スオメンリンナはヘルシンキの沖合に浮かぶ6つの島に広がるUNESCO世界遺産の海上要塞です。1748年にスウェーデン統治時代に建設が始まり、260年以上の歴史を持ちます。城壁の上の散歩道からはフィンランド湾の島々とヘルシンキのスカイラインが一望でき、博物館やドライドック、教会兼灯台など見どころが点在。フェリーで15分というアクセスの良さで、半日のエクスカーションに最適です。ヘルシンキ市民のピクニックスポットでもあります。" },
        { heading: "アクセスと歩き方", body: "マーケット広場からHSLフェリーで約15分。フェリーは通年で30〜60分間隔で運航。到着したらまずビジターセンターで地図を入手。メインルートに沿って島を渡り歩き、王の門、ドライドック、教会兼灯台を巡ります。城壁の上の散歩道はハイライトで、フィンランド湾の絶景が続きます。2〜3時間で主要スポットを回れますが、ピクニックを含めると半日。" },
        { heading: "主要スポット", body: "王の門は要塞の正面玄関で、18世紀に王族を迎えた門。スオメンリンナ教会は灯台を兼ねており、ビーコンが船舶の航行を助けています。ドライドックは世界最古級の現役乾ドックのひとつ。スオメンリンナ博物館では260年の要塞の歴史を映像と展示で紹介。城壁（ランパート）の上を歩くと、砲台跡やフィンランド湾の島々が見渡せます。" },
        { heading: "実用情報", body: "フェリーはHSLのデイチケット（約8ユーロ）でトラム・メトロ・バスと共通利用可能。スオメンリンナ博物館は約8ユーロ。島内のカフェは数軒ありますが、夏季限定の店が多いため冬場はピクニック持参が安心。トイレはビジターセンターや博物館付近。風が強いため上着を持参。eSIMでフェリーの時刻表や博物館の営業情報を確認しましょう。" },
      ],
      [
        { q: "フェリーの所要時間は？", a: "マーケット広場から約15分。HSLのデイチケットで乗れます。" },
        { q: "冬でも行ける？", a: "はい、フェリーは通年運航。ただし多くのカフェや一部の博物館は冬季休業のため、事前確認を。" },
        { q: "所要時間は？", a: "主要スポットだけなら2〜3時間。ピクニックや博物館巡りを含めると4〜5時間です。" },
        { q: "子連れにおすすめ？", a: "城壁の上を歩いたり、砲台跡を探検したり、子供も楽しめる場所です。ただし柵が低い場所があるため注意を。" },
      ],
    ),
    en: en(FI_EN_CTA,
      "Suomenlinna Fortress Island Half-Day Walk",
      "Take the ferry to Helsinki's UNESCO-listed sea fortress. Walk the ramparts, explore dry docks and museums, and enjoy Gulf of Finland views on Suomenlinna's six interconnected islands.",
      HELSINKI_SUOMENLINNA_IMAGES[0],
      HELSINKI_SUOMENLINNA_IMAGES,
      HELSINKI_X,
      [
        { heading: "Why this walk works", body: "Suomenlinna is a UNESCO World Heritage sea fortress spread across six islands off Helsinki's coast. Construction began in 1748 under Swedish rule and the fortress has accumulated over 260 years of military and civilian history. Rampart paths offer sweeping views of the Gulf of Finland and Helsinki's skyline. Museums, a functioning dry dock, and a church that doubles as a lighthouse dot the islands. The 15-minute ferry makes it one of the most accessible island excursions in Europe. Helsinki residents use it as a summer picnic destination." },
        { heading: "How to get there", body: "HSL ferry from Market Square takes about 15 minutes, running every 30 to 60 minutes year-round. At the dock, pick up a map from the Visitor Centre. Follow the main route across the islands, passing King's Gate, the dry dock, and the church-lighthouse. The rampart walk is the highlight, with continuous Gulf views. Main sights take 2 to 3 hours; half a day with a picnic." },
        { heading: "Key stops", body: "King's Gate is the fortress's ceremonial entrance, built to receive royalty in the 18th century. Suomenlinna Church serves as a lighthouse — its beacon guides ships into Helsinki harbour. The dry dock is one of the oldest functioning dry docks in the world. The Suomenlinna Museum covers the fortress's 260-year history through film and exhibits. Walking the ramparts reveals cannon emplacements and archipelago views." },
        { heading: "Practical tips", body: "The ferry is covered by the HSL day ticket (about 8 euros), which also works on trams, metro, and buses. The Suomenlinna Museum costs about 8 euros. Island cafes exist but many are summer-only — bring a picnic in winter. Toilets are near the Visitor Centre and museums. It can be windy — bring a jacket. An eSIM helps check ferry timetables and museum hours." },
      ],
      [
        { q: "How long is the ferry?", a: "About 15 minutes from Market Square. Covered by the HSL day ticket." },
        { q: "Can I visit in winter?", a: "Yes — ferries run year-round. But many cafes and some museums close for winter, so check ahead." },
        { q: "How much time do I need?", a: "Two to three hours for the main sights. Four to five hours with museums and a picnic." },
        { q: "Is it good for children?", a: "Walking the ramparts and exploring cannon emplacements are exciting for kids. Watch for low railings in some areas." },
      ],
    ),
  },
};

export const EUROPE_3_GUIDE_SLUGS = Object.keys(EUROPE_3_GUIDE_CONTENT);
