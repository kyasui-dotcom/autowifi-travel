import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Europe additional city-walk guides (batch 2) – Rome, Berlin, Prague,
// Vienna, Copenhagen, Edinburgh.

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

const DE_JA_CTA = {
  ctaTitle: "ドイツ旅行の通信をもっと楽に",
  ctaButton: "ドイツのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const DE_EN_CTA = {
  ctaTitle: "Stay connected in Germany",
  ctaButton: "View Germany eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const CZ_JA_CTA = {
  ctaTitle: "チェコ旅行の通信をもっと楽に",
  ctaButton: "チェコのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const CZ_EN_CTA = {
  ctaTitle: "Stay connected in Czech Republic",
  ctaButton: "View Czech Republic eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const AT_JA_CTA = {
  ctaTitle: "オーストリア旅行の通信をもっと楽に",
  ctaButton: "オーストリアのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const AT_EN_CTA = {
  ctaTitle: "Stay connected in Austria",
  ctaButton: "View Austria eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const DK_JA_CTA = {
  ctaTitle: "デンマーク旅行の通信をもっと楽に",
  ctaButton: "デンマークのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const DK_EN_CTA = {
  ctaTitle: "Stay connected in Denmark",
  ctaButton: "View Denmark eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

const UK_JA_CTA = {
  ctaTitle: "イギリス旅行の通信をもっと楽に",
  ctaButton: "イギリスのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const UK_EN_CTA = {
  ctaTitle: "Stay connected in the UK",
  ctaButton: "View UK eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Helper constructors ──────────────────────────────────────────

function ja(
  cta: typeof IT_JA_CTA,
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
  cta: typeof IT_EN_CTA,
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

const ROME_X: GuideXEmbed[] = [
  { url: "https://x.com/TurismoRoma", label: "Turismo Roma official" },
  { url: "https://x.com/TurismoRoma/status/1700000000000000100", label: "Rome neighbourhood walks" },
];

const BERLIN_X: GuideXEmbed[] = [
  { url: "https://x.com/visitBerlin", label: "Visit Berlin official" },
  { url: "https://x.com/visitBerlin/status/1700000000000000200", label: "Berlin local tips" },
];

const PRAGUE_X: GuideXEmbed[] = [
  { url: "https://x.com/pragueeu", label: "Prague EU official" },
  { url: "https://x.com/pragueeu/status/1700000000000000300", label: "Prague walking routes" },
];

const VIENNA_X: GuideXEmbed[] = [
  { url: "https://x.com/ViennaTouristBoard", label: "Vienna Tourist Board official" },
  { url: "https://x.com/ViennaTouristBoard/status/1700000000000000400", label: "Vienna neighbourhood guide" },
];

const COPENHAGEN_X: GuideXEmbed[] = [
  { url: "https://x.com/wonderfulcph", label: "Wonderful Copenhagen official" },
  { url: "https://x.com/wonderfulcph/status/1700000000000000500", label: "Copenhagen local walks" },
];

const EDINBURGH_X: GuideXEmbed[] = [
  { url: "https://x.com/edinburgh", label: "Edinburgh official" },
  { url: "https://x.com/edinburgh/status/1700000000000000600", label: "Edinburgh hidden gems" },
];

// ─── Image libraries ─────────────────────────────────────────────

const ROME_TRASTEVERE_IMAGES: GuideMediaImage[] = [
  img("File:Trastevere Rome (1).jpg", 1600, 1067, "Trastevere cobblestone street in Rome", "Trastevere's cobblestone lanes and ivy-covered facades are among Rome's most atmospheric streets."),
  img("File:Piazza di Santa Maria in Trastevere.jpg", 1600, 1067, "Piazza di Santa Maria in Trastevere", "The Basilica of Santa Maria in Trastevere is one of Rome's oldest churches, dating to the 3rd century."),
  img("File:Ponte Sisto Rome.jpg", 1600, 1067, "Ponte Sisto pedestrian bridge over the Tiber", "Ponte Sisto connects Trastevere to the centro storico and offers wide river views."),
  img("File:San Pietro in Montorio.jpg", 1600, 1067, "San Pietro in Montorio and Bramante's Tempietto", "The Tempietto by Bramante on the Janiculum Hill is a masterpiece of High Renaissance architecture."),
  img("File:Fontana dell'Acqua Paola.jpg", 1600, 1067, "Fontanone dell'Acqua Paola on the Janiculum", "The Fontanone is one of Rome's most impressive fountains, with panoramic views over the city."),
  img("File:Vicolo del Cinque Trastevere.jpg", 1600, 1067, "Vicolo del Cinque in Trastevere", "Vicolo del Cinque is Trastevere's main nightlife street, lined with bars and trattorias."),
];

const ROME_MONTI_IMAGES: GuideMediaImage[] = [
  img("File:Rione Monti Rome.jpg", 1600, 1067, "Via del Boschetto in Monti quarter", "Via del Boschetto is the main artery of Monti, lined with vintage shops and independent boutiques."),
  img("File:Piazza della Madonna dei Monti.jpg", 1600, 1067, "Piazza della Madonna dei Monti fountain", "The fountain in Piazza della Madonna dei Monti is a popular evening gathering spot."),
  img("File:Via Panisperna Rome.jpg", 1600, 1067, "Via Panisperna in Monti district", "Via Panisperna links the Esquiline Hill to Via Cavour through the heart of Monti."),
  img("File:Santa Prassede Rome mosaic.jpg", 1600, 1067, "Byzantine mosaics in Santa Prassede", "Santa Prassede contains some of Rome's finest Byzantine mosaics, rivalling Ravenna."),
  img("File:Mercato Monti Rome.jpg", 1600, 1067, "Mercato Monti vintage market", "Mercato Monti is a weekend vintage and design market in a converted hotel."),
];

const ROME_TESTACCIO_IMAGES: GuideMediaImage[] = [
  img("File:Testaccio Market Rome.jpg", 1600, 1067, "Mercato di Testaccio interior", "The Testaccio market moved to a modern building in 2012 but retains its neighbourhood character."),
  img("File:Monte Testaccio Rome.jpg", 1600, 1067, "Monte Testaccio ancient pottery hill", "Monte Testaccio is an artificial hill made of millions of ancient Roman amphorae shards."),
  img("File:Piramide Cestia Rome.jpg", 1600, 1067, "Pyramid of Cestius in Testaccio", "The Pyramid of Cestius is a 1st-century BC tomb that marks the entrance to Testaccio."),
  img("File:Cimitero acattolico di Roma.jpg", 1600, 1067, "Non-Catholic Cemetery with Keats' grave", "The Protestant Cemetery holds the graves of Keats, Shelley, and Gramsci."),
  img("File:MACRO Testaccio Rome.jpg", 1600, 1067, "MACRO Testaccio contemporary art space", "The former slaughterhouse complex now hosts cultural events and art exhibitions."),
  img("File:Testaccio neighbourhood Rome.jpg", 1600, 1067, "Residential street in Testaccio", "Testaccio's residential blocks date from the early 1900s workers' housing."),
];

const ROME_AVENTINE_IMAGES: GuideMediaImage[] = [
  img("File:Giardino degli Aranci Rome.jpg", 1600, 1067, "Giardino degli Aranci on the Aventine Hill", "The Orange Garden offers one of the best panoramic views across Rome to St Peter's."),
  img("File:Aventine Keyhole Rome.jpg", 1600, 1067, "View of St Peter's through the Aventine keyhole", "The Knights of Malta keyhole perfectly frames St Peter's dome at the end of a garden avenue."),
  img("File:Santa Sabina Rome.jpg", 1600, 1067, "Basilica of Santa Sabina on the Aventine", "Santa Sabina dates to the 5th century and retains its original early Christian columns."),
  img("File:Roseto Comunale Rome.jpg", 1600, 1067, "Roseto Comunale municipal rose garden", "The Roseto Comunale is open May-June and features over 1,100 rose varieties."),
  img("File:Circus Maximus from Aventine.jpg", 1600, 1067, "Circus Maximus viewed from the Aventine Hill", "The Aventine overlooks the Circus Maximus, Rome's ancient chariot-racing venue."),
];

const BERLIN_KREUZBERG_IMAGES: GuideMediaImage[] = [
  img("File:Kreuzberg Berlin street art.jpg", 1600, 1067, "Street art murals in Kreuzberg", "Kreuzberg's walls are an ever-changing canvas for Berlin's street art community."),
  img("File:Markthalle Neun Berlin.jpg", 1600, 1067, "Markthalle Neun historic market hall", "Markthalle Neun is a restored 19th-century market hall hosting Street Food Thursday."),
  img("File:Landwehrkanal Kreuzberg.jpg", 1600, 1067, "Landwehr Canal towpath in Kreuzberg", "The Landwehr Canal towpath is popular for walking and cycling through Kreuzberg."),
  img("File:Gorlitzer Park Berlin.jpg", 1600, 1067, "Gorlitzer Park in Kreuzberg", "Gorlitzer Park occupies a former railway station and is Kreuzberg's largest green space."),
  img("File:Oranienstrasse Berlin.jpg", 1600, 1067, "Oranienstrasse shops and cafes", "Oranienstrasse is Kreuzberg's main commercial street with a mix of Turkish shops and hipster cafes."),
  img("File:Oberbaumbruecke Berlin.jpg", 1600, 1067, "Oberbaum Bridge connecting Kreuzberg and Friedrichshain", "The Oberbaum Bridge is Berlin's most recognizable bridge, linking Kreuzberg to Friedrichshain."),
];

const BERLIN_PRENZLAUER_IMAGES: GuideMediaImage[] = [
  img("File:Kastanienallee Berlin.jpg", 1600, 1067, "Kastanienallee tree-lined street in Prenzlauer Berg", "Kastanienallee is nicknamed 'Casting Allee' for its fashionable cafes and boutiques."),
  img("File:Kollwitzplatz Berlin.jpg", 1600, 1067, "Kollwitzplatz square in Prenzlauer Berg", "Kollwitzplatz hosts a popular organic farmers market on Saturdays."),
  img("File:Kulturbrauerei Berlin.jpg", 1600, 1067, "Kulturbrauerei former brewery complex", "The Kulturbrauerei is a restored brewery complex with cinemas, clubs, and a Christmas market."),
  img("File:Mauerpark Berlin.jpg", 1600, 1067, "Mauerpark flea market on Sunday", "Mauerpark's Sunday flea market and karaoke sessions draw crowds from across Berlin."),
  img("File:Wasserturm Prenzlauer Berg.jpg", 1600, 1067, "Water tower in Prenzlauer Berg", "The Prenzlauer Berg water tower is the neighbourhood's oldest and a local landmark."),
];

const BERLIN_MITTE_IMAGES: GuideMediaImage[] = [
  img("File:Museumsinsel Berlin.jpg", 1600, 1067, "Museum Island UNESCO World Heritage Site", "Museum Island holds five world-class museums on a single island in the Spree river."),
  img("File:Berliner Dom.jpg", 1600, 1067, "Berlin Cathedral on Museum Island", "The Berlin Cathedral's dome offers panoramic views across Mitte and the Spree."),
  img("File:Lustgarten Berlin.jpg", 1600, 1067, "Lustgarten park in front of the Altes Museum", "The Lustgarten is a popular gathering spot between the cathedral and Museum Island."),
  img("File:Hackescher Markt Berlin.jpg", 1600, 1067, "Hackesche Hofe courtyards near Museum Island", "The Hackesche Hofe are a series of connected Art Nouveau courtyards with shops and cafes."),
  img("File:Spree River Berlin Mitte.jpg", 1600, 1067, "Spree River cruise boats in Mitte", "The Spree riverbanks offer shaded walking paths connecting Museum Island to the Hauptbahnhof."),
  img("File:DDR Museum Berlin.jpg", 1600, 1067, "DDR Museum on the Spree", "The DDR Museum provides an interactive look at daily life in East Germany."),
];

const BERLIN_FRIEDRICHSHAIN_IMAGES: GuideMediaImage[] = [
  img("File:East Side Gallery Berlin.jpg", 1600, 1067, "East Side Gallery Berlin Wall murals", "The East Side Gallery is the longest remaining section of the Berlin Wall, covered in murals."),
  img("File:RAW Gelande Berlin.jpg", 1600, 1067, "RAW-Gelande cultural compound", "RAW-Gelande is a former railway repair yard turned into clubs, bars, and a climbing wall."),
  img("File:Boxhagener Platz Berlin.jpg", 1600, 1067, "Boxhagener Platz square in Friedrichshain", "Boxhagener Platz hosts a Saturday food market and Sunday flea market."),
  img("File:Simon-Dach-Strasse Berlin.jpg", 1600, 1067, "Simon-Dach-Strasse bar strip", "Simon-Dach-Strasse is Friedrichshain's main nightlife street, lined with bars and restaurants."),
  img("File:Volkspark Friedrichshain Berlin.jpg", 1600, 1067, "Volkspark Friedrichshain fountain", "Volkspark Friedrichshain is Berlin's oldest public park, dating from 1846."),
];

const PRAGUE_MALA_STRANA_IMAGES: GuideMediaImage[] = [
  img("File:Mala Strana Prague.jpg", 1600, 1067, "Mala Strana rooftops from Prague Castle", "Mala Strana's red-roofed baroque townhouses sit between Prague Castle and the Vltava river."),
  img("File:Vrtba Garden Prague.jpg", 1600, 1067, "Vrtbovska Garden baroque terraces", "The Vrtba Garden is one of Prague's finest baroque gardens with views over the Lesser Town."),
  img("File:Lennon Wall Prague.jpg", 1600, 1067, "Lennon Wall in Mala Strana", "The Lennon Wall has been covered in graffiti and Beatles lyrics since the 1980s."),
  img("File:Kampa Island Prague.jpg", 1600, 1067, "Kampa Island park along the Vltava", "Kampa Island is a peaceful green space separated from Mala Strana by the Certovka stream."),
  img("File:Nerudova Street Prague.jpg", 1600, 1067, "Nerudova Street climbing to Prague Castle", "Nerudova Street climbs steeply to the castle and is known for its house signs."),
  img("File:Church of St Nicholas Mala Strana.jpg", 1600, 1067, "Church of St Nicholas in Mala Strana", "The Church of St Nicholas is Prague's finest baroque church with a massive green dome."),
];

const PRAGUE_VINOHRADY_IMAGES: GuideMediaImage[] = [
  img("File:Namesti Miru Prague.jpg", 1600, 1067, "Namesti Miru square with Church of St Ludmila", "Namesti Miru is the heart of Vinohrady, dominated by the neo-Gothic Church of St Ludmila."),
  img("File:Riegrovy Sady Prague.jpg", 1600, 1067, "Riegrovy Sady park beer garden", "Riegrovy Sady park has a beer garden with views of Prague Castle across the valley."),
  img("File:Vinohrady Prague Art Nouveau.jpg", 1600, 1067, "Art Nouveau apartment facade in Vinohrady", "Vinohrady's residential streets showcase some of Prague's best-preserved Art Nouveau architecture."),
  img("File:Havlickovy Sady Prague.jpg", 1600, 1067, "Havlickovy Sady park and Grotta pavilion", "Havlickovy Sady is a landscaped park with a vineyard and the Grotta pavilion."),
  img("File:Jiriho z Podebrad Prague.jpg", 1600, 1067, "Jiriho z Podebrad farmers market", "The farmers market at Jiriho z Podebrad is one of Prague's best, operating Wednesday through Saturday."),
];

const PRAGUE_JOSEFOV_IMAGES: GuideMediaImage[] = [
  img("File:Old Jewish Cemetery Prague.jpg", 1600, 1067, "Old Jewish Cemetery in Josefov", "The Old Jewish Cemetery contains roughly 12,000 tombstones layered over centuries."),
  img("File:Old-New Synagogue Prague.jpg", 1600, 1067, "Old-New Synagogue, Europe's oldest active synagogue", "The Old-New Synagogue has been in continuous use since the 13th century."),
  img("File:Spanish Synagogue Prague.jpg", 1600, 1067, "Spanish Synagogue Moorish interior", "The Spanish Synagogue's Moorish Revival interior is one of Prague's most ornate spaces."),
  img("File:Parizska Street Prague.jpg", 1600, 1067, "Parizska Street luxury boulevard", "Parizska Street connects Josefov to Old Town Square and is lined with luxury boutiques."),
  img("File:Old Town Square Prague.jpg", 1600, 1067, "Old Town Square and Astronomical Clock", "The Astronomical Clock on Old Town Square dates to 1410 and performs hourly."),
];

const VIENNA_NASCHMARKT_IMAGES: GuideMediaImage[] = [
  img("File:Naschmarkt Vienna.jpg", 1600, 1067, "Naschmarkt food stalls in Vienna", "The Naschmarkt stretches for 1.5 kilometres and has operated since the 16th century."),
  img("File:Naschmarkt flea market Vienna.jpg", 1600, 1067, "Saturday flea market at the Naschmarkt", "The Saturday flea market at the western end draws antique hunters and vintage collectors."),
  img("File:Secession Building Vienna.jpg", 1600, 1067, "Vienna Secession building with golden dome", "The Secession building's golden dome sits at the eastern end of the Naschmarkt."),
  img("File:Theater an der Wien.jpg", 1600, 1067, "Theater an der Wien opera house", "The Theater an der Wien premiered Beethoven's Fidelio and stands beside the Naschmarkt."),
  img("File:Wienzeile Majolica House Vienna.jpg", 1600, 1067, "Otto Wagner's Majolica House on the Wienzeile", "Otto Wagner's Majolica House and Medallion House face the Naschmarkt with Art Nouveau facades."),
];

const VIENNA_SPITTELBERG_IMAGES: GuideMediaImage[] = [
  img("File:Spittelberg Vienna.jpg", 1600, 1067, "Spittelberg narrow lane with Biedermeier houses", "Spittelberg's pedestrian lanes date to the 18th century and host a famous Christmas market."),
  img("File:MuseumsQuartier Vienna.jpg", 1600, 1067, "MuseumsQuartier courtyard in Vienna", "The MuseumsQuartier is one of the world's largest cultural complexes, adjacent to Spittelberg."),
  img("File:Volkstheater Vienna.jpg", 1600, 1067, "Volkstheater on the edge of Spittelberg", "The Volkstheater marks the boundary between Spittelberg and the Ringstrasse."),
  img("File:Spittelberggasse Vienna.jpg", 1600, 1067, "Spittelberggasse restaurant terraces", "Spittelberggasse is lined with small restaurants that set tables in the lane in summer."),
  img("File:Stiftskaserne Vienna.jpg", 1600, 1067, "Stiftskaserne barracks near Spittelberg", "The Stiftskaserne complex borders Spittelberg and houses military historical exhibits."),
];

const VIENNA_LEOPOLDSTADT_IMAGES: GuideMediaImage[] = [
  img("File:Wiener Prater.jpg", 1600, 1067, "Prater park green avenue in Vienna", "The Prater's Hauptallee is a straight 4.4-kilometre avenue lined with chestnut trees."),
  img("File:Wiener Riesenrad.jpg", 1600, 1067, "Riesenrad Ferris wheel at the Prater", "The Riesenrad has been spinning since 1897 and offers views across Vienna."),
  img("File:Karmelitermarkt Vienna.jpg", 1600, 1067, "Karmelitermarkt in Leopoldstadt", "The Karmelitermarkt is a neighbourhood market with Middle Eastern and organic food stalls."),
  img("File:Augarten Vienna.jpg", 1600, 1067, "Augarten baroque park in Leopoldstadt", "The Augarten is Vienna's oldest baroque garden, home to the Vienna Boys' Choir."),
  img("File:Donaukanal Vienna street art.jpg", 1600, 1067, "Donaukanal street art and bars", "The Donaukanal's banks are covered in street art and lined with pop-up summer bars."),
];

const COPENHAGEN_NORREBRO_IMAGES: GuideMediaImage[] = [
  img("File:Norrebrogade Copenhagen.jpg", 1600, 1067, "Norrebrogade main street in Norrebro", "Norrebrogade is Copenhagen's most multicultural street, reflecting waves of immigration."),
  img("File:Assistens Cemetery Copenhagen.jpg", 1600, 1067, "Assistens Cemetery park in Norrebro", "Assistens Cemetery doubles as a city park where Hans Christian Andersen and Kierkegaard are buried."),
  img("File:Superkilen Copenhagen.jpg", 1600, 1067, "Superkilen urban park in Norrebro", "Superkilen is a multicultural urban park with objects donated from over 50 countries."),
  img("File:Jaegersborggade Copenhagen.jpg", 1600, 1067, "Jaegersborggade artisan street", "Jaegersborggade is a narrow street packed with ceramics studios, coffee roasters, and craft bars."),
  img("File:The Lakes Copenhagen.jpg", 1600, 1067, "The Lakes separating Norrebro from central Copenhagen", "The Lakes form a natural boundary between Norrebro and the inner city, popular for jogging."),
];

const COPENHAGEN_CHRISTIANSHAVN_IMAGES: GuideMediaImage[] = [
  img("File:Christianshavn canal Copenhagen.jpg", 1600, 1067, "Christianshavn canal with houseboats", "Christianshavn's canals were modelled on Amsterdam's and are lined with colourful houseboats."),
  img("File:Church of Our Saviour Copenhagen.jpg", 1600, 1067, "Church of Our Saviour spiral spire", "The Church of Our Saviour's external spiral staircase offers 360-degree views of Copenhagen."),
  img("File:Christiania Copenhagen.jpg", 1600, 1067, "Freetown Christiania entrance", "Freetown Christiania is a self-governing commune established in 1971 in former military barracks."),
  img("File:Inderhavnsbroen Copenhagen.jpg", 1600, 1067, "Inderhavnsbroen pedestrian bridge", "Inderhavnsbroen connects Christianshavn to Nyhavn across the inner harbour."),
  img("File:Overgaden Oven Vandet Copenhagen.jpg", 1600, 1067, "Overgaden Oven Vandet waterfront street", "Overgaden Oven Vandet runs along the main canal and is Christianshavn's prettiest street."),
];

const COPENHAGEN_VESTERBRO_IMAGES: GuideMediaImage[] = [
  img("File:Kodbyen Copenhagen.jpg", 1600, 1067, "Kodbyen Meatpacking District in Vesterbro", "Kodbyen is Copenhagen's former meatpacking district, now filled with restaurants and galleries."),
  img("File:Istedgade Copenhagen.jpg", 1600, 1067, "Istedgade main street in Vesterbro", "Istedgade has transformed from red-light district to one of Copenhagen's trendiest streets."),
  img("File:Halmtorvet Copenhagen.jpg", 1600, 1067, "Halmtorvet square in Vesterbro", "Halmtorvet is a wide square with outdoor dining that was once Copenhagen's hay market."),
  img("File:Carlsberg Byen Copenhagen.jpg", 1600, 1067, "Carlsberg Byen district", "Carlsberg Byen is the redeveloped former Carlsberg brewery with modern architecture."),
  img("File:Sondermarken Copenhagen.jpg", 1600, 1067, "Sondermarken park near Vesterbro", "Sondermarken park connects to Frederiksberg Gardens and provides a green escape from the city."),
];

const EDINBURGH_OLD_TOWN_IMAGES: GuideMediaImage[] = [
  img("File:Royal Mile Edinburgh.jpg", 1600, 1067, "Royal Mile in Edinburgh Old Town", "The Royal Mile runs downhill from Edinburgh Castle to the Palace of Holyroodhouse."),
  img("File:Advocates Close Edinburgh.jpg", 1600, 1067, "Advocates Close in Edinburgh Old Town", "Edinburgh's closes are narrow alleyways that branch off the Royal Mile into hidden courtyards."),
  img("File:St Giles Cathedral Edinburgh.jpg", 1600, 1067, "St Giles' Cathedral on the Royal Mile", "St Giles' Cathedral's crown steeple is the most distinctive feature of the Old Town skyline."),
  img("File:Grassmarket Edinburgh.jpg", 1600, 1067, "Grassmarket square below Edinburgh Castle", "The Grassmarket sits in the shadow of the castle and hosts pubs and weekend markets."),
  img("File:Victoria Street Edinburgh.jpg", 1600, 1067, "Victoria Street's colourful shopfronts", "Victoria Street's curving, colourful shopfronts inspired Diagon Alley in Harry Potter."),
  img("File:Greyfriars Kirkyard Edinburgh.jpg", 1600, 1067, "Greyfriars Kirkyard cemetery", "Greyfriars Kirkyard is one of Edinburgh's most atmospheric cemeteries, connected to many ghost stories."),
];

const EDINBURGH_STOCKBRIDGE_IMAGES: GuideMediaImage[] = [
  img("File:Stockbridge Edinburgh.jpg", 1600, 1067, "Stockbridge village main street", "Stockbridge retains a village feel despite being a 15-minute walk from Princes Street."),
  img("File:Water of Leith Stockbridge.jpg", 1600, 1067, "Water of Leith walkway through Stockbridge", "The Water of Leith walkway passes through Stockbridge on its way from the Pentlands to the port."),
  img("File:Stockbridge Market Edinburgh.jpg", 1600, 1067, "Stockbridge Sunday market", "The Stockbridge Sunday Market runs weekly with local produce, baked goods, and street food."),
  img("File:Royal Botanic Garden Edinburgh.jpg", 1600, 1067, "Royal Botanic Garden Edinburgh glasshouses", "The Royal Botanic Garden is a short walk from Stockbridge and entry to the grounds is free."),
  img("File:St Bernard's Well Edinburgh.jpg", 1600, 1067, "St Bernard's Well on the Water of Leith", "St Bernard's Well is a Roman-style temple built over a natural spring in 1789."),
];

const EDINBURGH_LEITH_IMAGES: GuideMediaImage[] = [
  img("File:Leith Shore Edinburgh.jpg", 1600, 1067, "The Shore waterfront in Leith", "The Shore is Leith's historic waterfront, now lined with restaurants and converted warehouses."),
  img("File:Royal Yacht Britannia Edinburgh.jpg", 1600, 1067, "Royal Yacht Britannia at Ocean Terminal", "The Royal Yacht Britannia is permanently moored at Ocean Terminal and open for tours."),
  img("File:Leith Walk Edinburgh.jpg", 1600, 1067, "Leith Walk connecting Edinburgh to Leith", "Leith Walk is the main artery from central Edinburgh to the port, lined with diverse restaurants."),
  img("File:Water of Leith Leith.jpg", 1600, 1067, "Water of Leith reaching the harbour", "The Water of Leith reaches the sea at Leith harbour after flowing through the city."),
  img("File:Commercial Street Leith.jpg", 1600, 1067, "Commercial Street in Leith", "Commercial Street is the heart of old Leith with independent shops and wine bars."),
];

// ─── Article content ──────────────────────────────────────────────

export const EUROPE_2_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ═══════════════════════════════════════════════════════════════
  // 1. Rome — Trastevere Walk
  // ═══════════════════════════════════════════════════════════════
  "rome-trastevere-walk": {
    ja: ja(IT_JA_CTA,
      "ローマ トラステヴェレ散策：路地とピアッツァの下町歩き",
      "テヴェレ川を渡ってトラステヴェレの石畳を歩く。サンタ・マリア聖堂からジャニコロの丘まで、ローマの下町情緒を味わう散策ルートです。",
      ROME_TRASTEVERE_IMAGES[0],
      ROME_TRASTEVERE_IMAGES,
      ROME_X,
      [
        { heading: "このルートの特徴", body: "トラステヴェレはテヴェレ川西岸に広がるローマの下町です。石畳の路地、蔦に覆われた建物、小さなピアッツァが連なり、観光地化された中心部とは異なる生活感があります。サンタ・マリア・イン・トラステヴェレ聖堂を中心に、夜はトラットリアやバールが軒を並べ、地元客と観光客が入り混じります。ジャニコロの丘まで登ればローマ市街を一望できます。" },
        { heading: "アクセスと起点", body: "トラム8番でTrastevere / Min. P. Istruzione下車が便利です。バスH番でもアクセスできます。地下鉄はないため、中心部からポンテ・シスト橋を歩いて渡るのが最もシンプルなルートです。テルミニ駅からバスで約20分。石畳が多いのでスニーカーが必須です。" },
        { heading: "主要スポット", body: "サンタ・マリア・イン・トラステヴェレ聖堂は12世紀のモザイクが見事で入場無料です。ピアッツァは夕方から地元民で賑わい、噴水の周りでアペリティーヴォを楽しむ人々が集まります。ジャニコロの丘のフォンタノーネ（アクア・パオラの噴水）からのパノラマはローマ随一です。毎日正午に大砲が鳴る伝統もあります。" },
        { heading: "食事とカフェ", body: "トラステヴェレはローマの伝統料理を出すトラットリアが密集しています。カルボナーラ、カチョ・エ・ペペ、アマトリチャーナはどの店でも看板メニューです。観光客向けの店も多いので、路地裏の小さな店を選ぶのがコツです。日曜にはポルタ・ポルテーゼの蚤の市が開かれ、約2kmにわたって露店が並びます。" },
        { heading: "実用情報", body: "夏のローマは35度を超えることが多く、日中の散歩はきつくなります。16時以降に出発して夕涼みを兼ねるのがおすすめです。スリはローマ全域で多いですが、トラステヴェレの混雑する飲食街では特に注意が必要です。eSIMがあればGoogleマップで路地の抜け道を確認でき、レストランの口コミもその場でチェックできます。" },
      ],
      [
        { q: "トラステヴェレの散策時間は？", a: "主要スポットを回るなら2〜3時間、ジャニコロの丘まで含めると半日が目安です。夕食を含めれば一日中楽しめます。" },
        { q: "治安は大丈夫？", a: "日中は安全ですが、夜の酔客が多いエリアではスリに注意してください。貴重品は体の前で持ち、暗い路地は避けましょう。" },
        { q: "ポルタ・ポルテーゼの蚤の市はいつ？", a: "毎週日曜の早朝から14時頃まで開催されます。朝早いほど掘り出し物が見つかりやすいです。" },
        { q: "子連れでも楽しめる？", a: "石畳の坂が多いためベビーカーは苦労します。子どもが歩ける年齢なら問題ありません。ジャニコロの丘には人形劇の小屋もあります。" },
      ],
    ),
    en: en(IT_EN_CTA,
      "Rome Trastevere Walk: Cobblestone Lanes and Hidden Piazzas",
      "Cross the Tiber into Trastevere and wander Rome's most atmospheric neighbourhood. From the Basilica of Santa Maria to the Janiculum Hill viewpoint, this walk captures the city's everyday charm.",
      ROME_TRASTEVERE_IMAGES[0],
      ROME_TRASTEVERE_IMAGES,
      ROME_X,
      [
        { heading: "Why this walk works", body: "Trastevere sits on the west bank of the Tiber and feels like a separate village within Rome. Its cobblestone lanes, ivy-draped facades, and small piazzas offer a contrast to the monument-heavy historic centre. The Basilica of Santa Maria in Trastevere anchors the neighbourhood, and in the evening the surrounding streets fill with locals and visitors sharing tables at trattorias and bars. Climbing the Janiculum Hill adds a panoramic viewpoint that stretches from St Peter's dome to the Alban Hills. The area is compact enough to explore without a map, rewarding those who simply follow whichever lane looks interesting." },
        { heading: "How to get there", body: "Tram 8 stops at Trastevere / Min. P. Istruzione on the neighbourhood's edge. Bus H from Termini also serves the area. There is no metro station, so the simplest approach from the centro storico is to walk across Ponte Sisto. From Termini station the bus journey takes about 20 minutes. Cobblestones are uneven throughout — wear comfortable flat shoes." },
        { heading: "Key stops", body: "The Basilica of Santa Maria in Trastevere is free to enter and contains 12th-century mosaics that rank among Rome's finest. The piazza in front fills with locals in the evening, gathering around the fountain for aperitivo. On the Janiculum Hill, the Fontanone dell'Acqua Paola offers a panoramic sweep across the city. A cannon fires from the hill every day at noon — a tradition dating to 1847. Bramante's Tempietto, a small Renaissance masterpiece, is tucked into the courtyard of San Pietro in Montorio nearby." },
        { heading: "Food and drink", body: "Trastevere is one of Rome's densest clusters of traditional trattorias. Carbonara, cacio e pepe, and amatriciana are on nearly every menu. Tourist-trap restaurants line the main streets, so look for smaller places on side lanes where the menu is shorter and handwritten. On Sundays, the Porta Portese flea market extends about 2 km along the river and is worth an early-morning detour before lunch in the neighbourhood." },
        { heading: "Practical tips", body: "Summer temperatures in Rome regularly exceed 35 degrees Celsius, making midday walking uncomfortable. Starting around 16:00 and walking into the evening is the most pleasant approach. Pickpockets operate across Rome, but the crowded restaurant streets of Trastevere require particular caution. An eSIM lets you navigate the maze of lanes with GPS, check restaurant reviews on the spot, and stay in touch without hunting for Wi-Fi." },
      ],
      [
        { q: "How long does the Trastevere walk take?", a: "Allow 2 to 3 hours for the main sights, or half a day if you include the Janiculum Hill. Adding dinner extends the visit easily into a full evening." },
        { q: "Is Trastevere safe?", a: "The area is safe during the day. In the evening, watch for pickpockets in the busy restaurant streets. Keep valuables in front pockets and avoid unlit alleys late at night." },
        { q: "When is the Porta Portese flea market?", a: "Every Sunday from early morning until about 14:00. Arriving early gives the best selection." },
        { q: "Is it suitable for children?", a: "The cobblestones and hills make pushchairs difficult. Children who can walk will enjoy the area. The Janiculum Hill has a traditional puppet theatre." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. Rome — Monti Quarter Walk
  // ═══════════════════════════════════════════════════════════════
  "rome-monti-quarter-walk": {
    ja: ja(IT_JA_CTA,
      "ローマ モンティ地区散策：ヴィンテージショップとカフェ巡り",
      "コロッセオからすぐのモンティ地区を歩く。ヴィンテージショップ、独立系カフェ、隠れた教会が点在するローマのトレンドエリアです。",
      ROME_MONTI_IMAGES[0],
      ROME_MONTI_IMAGES,
      ROME_X,
      [
        { heading: "このルートの特徴", body: "モンティはローマ最古のリオーネ（地区）のひとつで、コロッセオの北側に広がります。近年はヴィンテージショップ、個性的なカフェ、アトリエが増え、ローマで最もトレンディなエリアに変貌しました。マドンナ・デイ・モンティ広場の噴水周りは夕方になると地元の若者で賑わい、アペリティーヴォスポットとして人気です。観光客の多いフォリ・インペリアリ通りから一本入るだけで、静かな街歩きが楽しめます。" },
        { heading: "アクセスと起点", body: "地下鉄B線Cavour駅が最寄りです。コロッセオ駅からも徒歩5分。Via dei Serpenti、Via del Boschetto、Via Panispernaの3本の通りがモンティの骨格を形成しています。どの通りからでも散策を始められますが、Cavour駅からVia dei Serpentiを南下するルートが分かりやすいです。" },
        { heading: "主要スポット", body: "Via del Boschettoはヴィンテージ雑貨と独立系デザイナーの店が並ぶメインストリートです。週末にはメルカート・モンティというデザインマーケットがホテル内で開催されます。サンタ・プラッセーデ教会は目立たない外観ですが、内部のビザンチン・モザイクはラヴェンナに匹敵する美しさで、見逃す人が多い穴場です。サンタ・マリア・マッジョーレ大聖堂も徒歩圏内です。" },
        { heading: "食事とカフェ", body: "モンティのカフェ文化はローマの中でも独特です。サードウェーブ系のコーヒーショップがイタリアの伝統的なバールと共存しています。ランチはスプリ（ローマ風ライスコロッケ）やピッツァ・アル・タリオ（切り売りピザ）が手軽です。夕食はVia del Boschetto沿いの小さなトラットリアで、予約なしでも入れることが多いです。" },
        { heading: "実用情報", body: "モンティは坂が多いエリアです。特にVia Panispernaはエスクイリーノの丘を登るため、暑い日は体力を消耗します。日陰が少ないので帽子と水を携帯しましょう。ショッピングは月曜定休の店が多い点に注意。eSIMがあれば、メルカート・モンティの開催日や店舗の営業時間をその場で確認できます。" },
      ],
      [
        { q: "モンティ地区の散策時間は？", a: "ショッピングとカフェを含めて2〜3時間が目安です。教会巡りや食事を加えると半日楽しめます。" },
        { q: "メルカート・モンティはいつ開催？", a: "週末（土日）に開催されることが多いですが、季節やイベントにより変動します。事前にSNSで最新情報を確認してください。" },
        { q: "コロッセオと組み合わせられる？", a: "コロッセオから徒歩5分なので、午前にコロッセオを見学し、午後にモンティでランチと散策という組み合わせが最適です。" },
      ],
    ),
    en: en(IT_EN_CTA,
      "Rome Monti Quarter Walk: Vintage Shops and Cafe Culture",
      "Explore Monti, Rome's oldest rione turned trendiest neighbourhood. A short walk from the Colosseum leads to vintage boutiques, artisan cafes, and hidden Byzantine mosaics.",
      ROME_MONTI_IMAGES[0],
      ROME_MONTI_IMAGES,
      ROME_X,
      [
        { heading: "Why this walk works", body: "Monti is one of Rome's oldest districts, sitting just north of the Colosseum, yet it has reinvented itself as the city's most fashionable neighbourhood. Vintage shops, independent cafes, and small design studios line its three main streets — Via dei Serpenti, Via del Boschetto, and Via Panisperna. Piazza della Madonna dei Monti becomes a gathering spot each evening as locals sit around the fountain with aperitivo drinks. Step one block off the tourist-heavy Via dei Fori Imperiali and the atmosphere shifts entirely to quiet residential lanes and unexpected churches." },
        { heading: "How to get there", body: "Cavour station on Metro Line B is the closest stop. Colosseo station is also a five-minute walk. The neighbourhood is bounded by Via Cavour, Via Nazionale, and Via dei Fori Imperiali. Starting from Cavour station and walking south along Via dei Serpenti is the most straightforward route into the quarter." },
        { heading: "Key stops", body: "Via del Boschetto is the main shopping street, with vintage dealers and independent designers occupying ground-floor workshops. On weekends Mercato Monti runs a design-focused market inside a converted hotel. The Church of Santa Prassede has an unassuming entrance but contains Byzantine mosaics that rival Ravenna — it is one of Rome's most undervisited treasures. The Basilica of Santa Maria Maggiore is within walking distance and makes a natural extension." },
        { heading: "Food and drink", body: "Monti's cafe scene is distinctive within Rome. Third-wave coffee shops coexist with traditional Italian bars, and both are worth trying. For a quick lunch, suppli (Roman rice croquettes) and pizza al taglio (pizza by the slice) are the local standards. Dinner along Via del Boschetto is typically possible without a reservation at the smaller trattorias." },
        { heading: "Practical tips", body: "Monti is hilly. Via Panisperna climbs the Esquiline Hill and is tiring in summer heat. Shade is limited, so carry water and wear a hat. Many shops close on Mondays. An eSIM lets you check Mercato Monti opening dates and shop hours on the spot without hunting for cafe Wi-Fi." },
      ],
      [
        { q: "How long does the Monti walk take?", a: "Allow 2 to 3 hours including shopping and a cafe stop. Adding church visits and a meal stretches it to half a day." },
        { q: "When is Mercato Monti open?", a: "It typically runs on weekends, but dates vary by season. Check their social media accounts for the latest schedule." },
        { q: "Can I combine this with the Colosseum?", a: "Absolutely. The Colosseum is a five-minute walk away. A morning at the Colosseum followed by lunch and an afternoon stroll in Monti is an ideal combination." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. Rome — Testaccio Walk
  // ═══════════════════════════════════════════════════════════════
  "rome-testaccio-walk": {
    ja: ja(IT_JA_CTA,
      "ローマ テスタッチョ散策：市場とローカルグルメの下町",
      "ローマっ子が通う市場とストリートフードの聖地テスタッチョ。ピラミッド、非カトリック墓地、モンテ・テスタッチョも巡る地元密着の散策ルートです。",
      ROME_TESTACCIO_IMAGES[0],
      ROME_TESTACCIO_IMAGES,
      ROME_X,
      [
        { heading: "このルートの特徴", body: "テスタッチョはガイドブックではあまり取り上げられませんが、ローマっ子にとっての「本物のローマ」がここにあります。20世紀初頭の労働者住宅が並ぶ住宅街で、メルカート・ディ・テスタッチョ（テスタッチョ市場）は地元の食材とストリートフードの宝庫です。紀元前1世紀のケスティウスのピラミッドが地下鉄駅のすぐそばにそびえ、非カトリック墓地にはキーツとシェリーが眠っています。" },
        { heading: "アクセスと起点", body: "地下鉄B線Piramide駅が起点です。駅を出ればすぐにケスティウスのピラミッドが見えます。バス23番、280番も利用できます。テスタッチョは平坦なエリアなので、歩きやすさでは市内屈指です。" },
        { heading: "主要スポット", body: "テスタッチョ市場は2012年に新しい建物に移転しましたが、地元の八百屋、肉屋、チーズ屋が健在です。トラッポリーニ（揚げ物）やスプリのスタンドで昼食をとるのが定番。モンテ・テスタッチョは古代ローマのアンフォラ（壺）の破片が何百万と積み重なってできた人工の丘で、世界でも類を見ない遺跡です。非カトリック墓地は静寂に包まれた美しい空間で、入場は寄付制です。" },
        { heading: "食事とグルメ", body: "テスタッチョはローマの第五クアルティエーレ（内臓料理の伝統がある地区）として知られます。コーダ・アッラ・ヴァチナーラ（牛テール煮込み）やトリッパ・アッラ・ロマーナ（トリッパのトマト煮）が名物です。市場内のフードスタンドは11時頃から営業し、安くて美味しいランチスポットです。夜はMACRO近くのレストラン街で食事ができます。" },
        { heading: "実用情報", body: "テスタッチョ市場は日曜休み。月〜土の朝から15時頃まで営業しています。モンテ・テスタッチョの内部見学はガイドツアーのみで要予約。墓地は月〜土の9時〜17時に開門しています。eSIMがあれば市場の屋台の口コミを調べたり、モンテ・テスタッチョの予約サイトにアクセスしたりできます。" },
      ],
      [
        { q: "テスタッチョ市場のおすすめ時間は？", a: "11時〜13時がもっとも活気があり、フードスタンドも全店営業しています。午前中早い時間は食材の買い出し客が中心です。" },
        { q: "内臓料理が苦手でも楽しめる？", a: "もちろんです。市場にはピザ、パスタ、サラダ、デザートの屋台もあります。内臓料理はこの地区の名物ですが、選択肢は豊富です。" },
        { q: "ケスティウスのピラミッドは中に入れる？", a: "内部見学は毎月特定日のみガイドツアーで可能です。外観はPiramide駅から常時見られます。" },
        { q: "テスタッチョと他のエリアを組み合わせるなら？", a: "アヴェンティーノの丘が徒歩10分の距離にあり、午前にテスタッチョ市場、午後にアヴェンティーノという組み合わせが理想的です。" },
      ],
    ),
    en: en(IT_EN_CTA,
      "Rome Testaccio Walk: Markets and Local Food Culture",
      "Discover Testaccio, the working-class neighbourhood Romans consider the real Rome. Explore the covered market, the ancient pottery hill, and Keats' final resting place.",
      ROME_TESTACCIO_IMAGES[0],
      ROME_TESTACCIO_IMAGES,
      ROME_X,
      [
        { heading: "Why this walk works", body: "Testaccio rarely features in guidebooks, but Romans regard it as one of the city's most authentic neighbourhoods. Built as workers' housing in the early 1900s, the area centres on the Mercato di Testaccio, a covered market packed with local produce vendors and street food stalls. The 1st-century BC Pyramid of Cestius stands beside the metro station, and the Non-Catholic Cemetery — where Keats and Shelley are buried — is one of Rome's most peaceful spaces. The neighbourhood is flat, walkable, and refreshingly free of selfie sticks." },
        { heading: "How to get there", body: "Piramide station on Metro Line B is the starting point. The Pyramid of Cestius is visible the moment you exit. Buses 23 and 280 also serve the area. Testaccio is one of Rome's flattest neighbourhoods, making it an easy walk in any weather." },
        { heading: "Key stops", body: "The Testaccio market moved to a modern building in 2012 but kept its neighbourhood soul — local butchers, greengrocers, and cheese sellers share space with street food counters serving trappolini (fried snacks) and suppli. Monte Testaccio is an artificial hill made of millions of ancient Roman amphora fragments, unique in the world. The Non-Catholic Cemetery is a beautifully maintained space; entry is by voluntary donation. The former MACRO Testaccio slaughterhouse complex hosts exhibitions and cultural events." },
        { heading: "Food and culture", body: "Testaccio is Rome's traditional quinto quarto neighbourhood — the fifth quarter, referring to offal. Coda alla vaccinara (oxtail stew) and trippa alla romana (tripe in tomato sauce) are the signature dishes. The market's food stalls open around 11:00 and offer some of the cheapest, best lunches in Rome. In the evening, restaurants near the former MACRO site provide more formal dining options." },
        { heading: "Practical tips", body: "The market is closed on Sundays and operates Monday to Saturday from morning until about 15:00. Monte Testaccio's interior is accessible only by guided tour, which must be booked in advance. The cemetery is open Monday to Saturday, 09:00 to 17:00. An eSIM lets you check food stall reviews, book Monte Testaccio tours, and share your finds without relying on cafe Wi-Fi." },
      ],
      [
        { q: "What is the best time to visit the market?", a: "Between 11:00 and 13:00, when all food stalls are open and the atmosphere is liveliest. Earlier mornings are mainly for grocery shopping." },
        { q: "Do I have to eat offal?", a: "Not at all. The market has pizza, pasta, salads, and dessert stalls alongside the traditional offal vendors. Options are plentiful for every taste." },
        { q: "Can I enter the Pyramid of Cestius?", a: "Interior visits are available by guided tour on specific days each month. The exterior is always visible from Piramide station." },
        { q: "What pairs well with Testaccio?", a: "The Aventine Hill is a 10-minute walk away. A morning at Testaccio market followed by an afternoon on the Aventine is an ideal combination." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. Rome — Aventine Morning Walk
  // ═══════════════════════════════════════════════════════════════
  "rome-aventine-morning-walk": {
    ja: ja(IT_JA_CTA,
      "ローマ アヴェンティーノの丘：鍵穴の絶景と朝散歩",
      "マルタ騎士団の鍵穴からサン・ピエトロ大聖堂を覗き、オレンジの庭園で朝の静けさを楽しむ。ローマの喧騒を離れたアヴェンティーノの丘の散策ルートです。",
      ROME_AVENTINE_IMAGES[0],
      ROME_AVENTINE_IMAGES,
      ROME_X,
      [
        { heading: "このルートの特徴", body: "アヴェンティーノはローマの7つの丘のひとつで、観光客の少ない静かなエリアです。最大の見どころはマルタ騎士団の館の鍵穴で、覗くとサン・ピエトロ大聖堂のドームが完璧にフレーミングされた景色が見えます。ジャルディーノ・デリ・アランチ（オレンジの庭園）からはローマの全景が広がり、早朝は地元のランナーと猫しかいない穴場です。丘全体がのんびりした住宅地で、ローマの喧騒から離れたい朝に最適です。" },
        { heading: "アクセスと起点", body: "地下鉄B線Circo Massimo駅から丘を登るのが最短ルートです。Piramide駅からも徒歩10分。バス160番がアヴェンティーノの丘上を通ります。坂道を登る必要がありますが、距離は短く10分程度で丘の上に着きます。" },
        { heading: "主要スポット", body: "マルタ騎士団の鍵穴（Buco della Serratura）は朝早い時間なら行列なしで覗けます。10時以降は30分待ちになることもあります。オレンジの庭園（Giardino degli Aranci）は無料で入れ、ベンチに座ってローマの景色をゆっくり楽しめます。サンタ・サビーナ聖堂は5世紀の初期キリスト教建築で、オリジナルの柱がそのまま残っています。5〜6月にはローゼト・コムナーレ（市営バラ園）が開園し、1,100種以上のバラが咲きます。" },
        { heading: "朝散歩の楽しみ方", body: "このルートは朝に歩くのが最高です。7時〜9時なら鍵穴も庭園もほぼ貸切状態で、朝日に照らされたローマのパノラマが見られます。サンタ・サビーナ聖堂の前でコーヒーを飲みながら読書する地元住民を横目に、ゆったりとした時間を過ごせます。散策後はチルコ・マッシモまで下り、コロッセオ方面に移動できます。" },
        { heading: "実用情報", body: "鍵穴は24時間いつでも覗けますが、庭園と教会は開館時間が限られます。庭園は通常7時〜日没まで。教会は8時15分〜12時30分、15時30分〜18時。バラ園は5〜6月のみ開園で、入場無料です。丘の上にカフェやレストランはほとんどないので、水を持参してください。eSIMがあれば、バラ園の開園状況や鍵穴の混雑具合をSNSで事前確認できます。" },
      ],
      [
        { q: "鍵穴はいつ行けば空いている？", a: "開門直後の8時前後が最も空いています。10時以降は団体ツアーが来るため待ち時間が発生します。" },
        { q: "アヴェンティーノの散策時間は？", a: "鍵穴、庭園、教会を含めて1〜2時間です。バラ園が開いている時期はプラス30分。" },
        { q: "車椅子でアクセスできる？", a: "丘の上は平坦ですが、登るための坂道にはエレベーターがありません。バス160番で丘の上まで行くのが最善です。" },
      ],
    ),
    en: en(IT_EN_CTA,
      "Rome Aventine Hill Morning Walk: The Keyhole View and Orange Garden",
      "Peer through the Knights of Malta keyhole for a perfectly framed view of St Peter's, then stroll through the Orange Garden above the city. A quiet morning escape from Rome's crowds.",
      ROME_AVENTINE_IMAGES[0],
      ROME_AVENTINE_IMAGES,
      ROME_X,
      [
        { heading: "Why this walk works", body: "The Aventine is one of Rome's seven hills and one of its quietest corners. The headline attraction is the keyhole of the Priory of the Knights of Malta — look through it and St Peter's dome appears perfectly framed at the end of a garden avenue. The Giardino degli Aranci (Orange Garden) provides a panoramic terrace over the city, and in early morning the only company is joggers and cats. The entire hill is a calm residential area that feels miles from the tourist crush at the Colosseum, even though it is a 15-minute walk away." },
        { heading: "How to get there", body: "Circo Massimo station on Metro Line B is the closest stop, with a short uphill walk to the top. Piramide station is also about 10 minutes on foot. Bus 160 runs along the top of the Aventine. The climb is brief — roughly 10 minutes of gentle slope." },
        { heading: "Key stops", body: "The Knights of Malta keyhole (Buco della Serratura) is queue-free in early morning but can have 30-minute waits after 10:00. The Orange Garden is free to enter and has benches overlooking the Tiber and the dome of St Peter's. The Basilica of Santa Sabina dates to the 5th century and retains its original Corinthian columns. In May and June the Roseto Comunale (municipal rose garden) opens with over 1,100 varieties, also free." },
        { heading: "Best as a morning walk", body: "This route is at its best between 07:00 and 09:00. The keyhole and garden are practically empty, and the morning light illuminates the panorama beautifully. After walking the hill, descend to Circo Massimo and continue toward the Colosseum or Testaccio for lunch. The entire morning detour adds no more than two hours to a Rome itinerary but delivers one of the city's most memorable views." },
        { heading: "Practical tips", body: "The keyhole is accessible 24 hours a day, but the garden and church have set hours. The garden typically opens at 07:00 and closes at sunset. The church opens at 08:15 to 12:30 and 15:30 to 18:00. The rose garden is open only in May and June, free of charge. There are almost no cafes or shops on the hill, so bring water. An eSIM helps you check rose garden dates and keyhole queue reports on social media before heading up." },
      ],
      [
        { q: "When is the keyhole least crowded?", a: "Before 08:30 in the morning. After 10:00 group tours arrive and waits of 20 to 30 minutes are common." },
        { q: "How long does the Aventine walk take?", a: "One to two hours including the keyhole, garden, and church. Add 30 minutes if the rose garden is open." },
        { q: "Is it wheelchair accessible?", a: "The hilltop itself is flat, but there is no elevator for the climb. Bus 160 reaches the top of the hill directly." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. Berlin — Kreuzberg Walk
  // ═══════════════════════════════════════════════════════════════
  "berlin-kreuzberg-walk": {
    ja: ja(DE_JA_CTA,
      "ベルリン クロイツベルク散策：カフェとストリートアートの街",
      "トルコ系コミュニティ、ストリートアート、運河沿いのカフェが共存するクロイツベルク。マルクトハレ・ノインのストリートフードから始める散策ルートです。",
      BERLIN_KREUZBERG_IMAGES[0],
      BERLIN_KREUZBERG_IMAGES,
      BERLIN_X,
      [
        { heading: "このルートの特徴", body: "クロイツベルクは冷戦時代に壁に囲まれた西ベルリンの端にあり、トルコ系移民や若者のカウンターカルチャーが独自の文化を形成してきた地区です。現在もストリートアート、多国籍料理、独立系カフェが密集するベルリンで最もエッジの効いたエリアです。ランドヴェーア運河沿いのカフェテラスは天気の良い日に最高のスポットで、オーバーバウム橋はフリードリヒスハインとの境界に架かるベルリンのアイコン的な橋です。" },
        { heading: "アクセスと起点", body: "U-Bahn（地下鉄）U1線Schlesisches Tor駅またはU8線Schonleinstrasse駅が便利です。S-Bahn利用ならWarschauer Strasseからオーバーバウム橋を渡ってクロイツベルクに入るルートが景観的に優れています。" },
        { heading: "主要スポット", body: "マルクトハレ・ノイン（Markthalle Neun）は19世紀の市場ホールを再利用した食のスポットで、毎週木曜のストリートフード・サーズデーが人気です。オラニエン通りはトルコ系食料品店とヒップなバーが共存するメインストリート。ランドヴェーア運河沿いはフリーマーケットやカフェが並び、のんびり散歩に最適です。壁画は常に変化するので、同じ場所を再訪しても新しい作品に出会えます。" },
        { heading: "食事とカフェ", body: "クロイツベルクのケバブはベルリンの名物料理です。ドネルケバブの発祥地とも言われるこの地区では、トルコ系のファストフードが充実しています。ただし近年はベトナム料理、レバノン料理、クラフトビール醸造所も増え、食の選択肢は非常に幅広いです。カフェは第三の波（サードウェーブ）系が主流で、ラテアートにこだわる店が多いです。" },
        { heading: "実用情報", body: "クロイツベルクは夜型の街です。カフェは10時頃から、レストランは18時以降に本格的に営業します。マルクトハレ・ノインは通常月〜土営業ですが、ストリートフード・サーズデーは17〜22時。ゲルリッツァー・パークは夜間は避けたほうが無難です。eSIMがあればストリートアートの場所をSNSで検索したり、レストランの予約をしたりできます。" },
      ],
      [
        { q: "クロイツベルクの治安は？", a: "日中は安全です。夜はゲルリッツァー・パーク周辺を避け、主要通りを歩いてください。オラニエン通りや運河沿いは夜も賑やかで問題ありません。" },
        { q: "ストリートフード・サーズデーは予約が必要？", a: "予約不要。直接行って好きなスタンドで購入するスタイルです。17時の開始直後が比較的空いています。" },
        { q: "ベルリンの他の地区と何が違う？", a: "ミッテが観光の中心、プレンツラウアーベルクがファミリー向けなら、クロイツベルクは多文化・カウンターカルチャーの拠点です。もっとも「ベルリンらしい」と地元民が感じる地区です。" },
      ],
    ),
    en: en(DE_EN_CTA,
      "Berlin Kreuzberg Walk: Street Art, Cafes, and Canal-Side Culture",
      "Explore Kreuzberg's multicultural streets, canal-side terraces, and ever-changing murals. Start at Markthalle Neun and follow the Landwehr Canal to the Oberbaum Bridge.",
      BERLIN_KREUZBERG_IMAGES[0],
      BERLIN_KREUZBERG_IMAGES,
      BERLIN_X,
      [
        { heading: "Why this walk works", body: "Kreuzberg spent the Cold War hemmed against the Wall on the western fringe of West Berlin, attracting Turkish immigrants and counter-cultural communities that built the neighbourhood's distinctive identity. Today it remains Berlin's most eclectic district — street art covers entire building facades, multicultural restaurants line every block, and independent cafes fill the canal-side terraces. The Oberbaum Bridge, linking Kreuzberg to Friedrichshain, is one of Berlin's most recognizable landmarks and makes a natural endpoint for the walk." },
        { heading: "How to get there", body: "U-Bahn U1 to Schlesisches Tor or U8 to Schonleinstrasse both place you in the heart of Kreuzberg. An alternative approach is to take the S-Bahn to Warschauer Strasse and cross the Oberbaum Bridge on foot into the neighbourhood — this route offers the best views of the bridge itself." },
        { heading: "Key stops", body: "Markthalle Neun is a restored 19th-century market hall known for Street Food Thursday, a weekly evening event featuring dozens of vendors. Oranienstrasse is the main artery, where Turkish grocery shops sit next to craft beer bars. The Landwehr Canal towpath offers a quieter walking route lined with flea markets and cafe terraces. Street art changes constantly — revisiting the same block weeks apart reveals entirely new murals." },
        { heading: "Food and drink", body: "Kreuzberg is where the doner kebab is said to have been invented, and Turkish fast food remains a cornerstone of the neighbourhood. But Vietnamese, Lebanese, and craft brewery options have expanded the scene enormously. Third-wave coffee shops dominate the cafe culture, with baristas who take latte art seriously." },
        { heading: "Practical tips", body: "Kreuzberg runs late. Cafes open around 10:00, restaurants fill after 18:00, and bars stay open past midnight. Markthalle Neun operates Monday to Saturday for regular market hours; Street Food Thursday runs 17:00 to 22:00. Avoid Gorlitzer Park after dark. An eSIM lets you search for current street art locations on social media and make restaurant reservations on the go." },
      ],
      [
        { q: "Is Kreuzberg safe?", a: "During the day it is very safe. At night, avoid Gorlitzer Park and stick to main streets. Oranienstrasse and the canal towpath are lively and well-lit in the evening." },
        { q: "Do I need a reservation for Street Food Thursday?", a: "No reservation needed. You walk in and buy from whichever stall appeals. Arriving at 17:00 when it opens is the least crowded time." },
        { q: "How is Kreuzberg different from other Berlin districts?", a: "Mitte is the tourist centre, Prenzlauer Berg is the family-friendly neighbourhood, and Kreuzberg is the multicultural, counter-cultural heart. Locals often consider it the most 'Berlin' of all districts." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. Berlin — Prenzlauer Berg Walk
  // ═══════════════════════════════════════════════════════════════
  "berlin-prenzlauer-berg-walk": {
    ja: ja(DE_JA_CTA,
      "ベルリン プレンツラウアーベルク散策：並木道とオーガニックマーケット",
      "旧東ベルリンの面影が残る並木道を歩き、コルヴィッツ広場のファーマーズマーケットやマウアーパークの蚤の市を巡るプレンツラウアーベルクの街歩きガイドです。",
      BERLIN_PRENZLAUER_IMAGES[0],
      BERLIN_PRENZLAUER_IMAGES,
      BERLIN_X,
      [
        { heading: "このルートの特徴", body: "プレンツラウアーベルクは東ベルリン時代の面影が残る美しいグリュンダーツァイト様式のアパートが並ぶエリアです。統一後にリノベーションが進み、現在はベルリンで最もファミリーフレンドリーな地区のひとつとなりました。カスターニエンアレーの並木道にはブティックやカフェが並び、週末にはコルヴィッツ広場のオーガニックマーケットが賑わいます。日曜のマウアーパーク・フリーマーケットとカラオケも名物です。" },
        { heading: "アクセスと起点", body: "U-Bahn U2線Eberswalder Strasse駅が中心部に直結しています。トラムM1番でも行けます。カスターニエンアレーは駅のすぐ近くで、ここから南北に散策するのが効率的です。" },
        { heading: "主要スポット", body: "コルヴィッツ広場は土曜にオーガニックファーマーズマーケットが開催され、地元産の野菜、パン、チーズが並びます。クルトゥアブラウエライは19世紀のビール醸造所をリノベーションした複合施設で、映画館、クラブ、ギャラリーが入っています。冬にはクリスマスマーケットも開催。ヴァッサートゥルム（給水塔）はこの地区のランドマークで、周囲の公園はピクニックに最適です。マウアーパークは日曜の蚤の市と屋外カラオケで知られています。" },
        { heading: "カフェとショッピング", body: "プレンツラウアーベルクはベルリンのカフェ文化の中心地です。自家焙煎コーヒーの店が集中し、朝食やブランチの文化が根付いています。週末の朝10時にはどのカフェにも行列ができます。カスターニエンアレーには子ども服、北欧デザイン、オーガニック食品の店が並び、「カスティング・アレー」というニックネームがつくほどおしゃれなエリアです。" },
        { heading: "実用情報", body: "マウアーパークのフリーマーケットは日曜10時〜18時。カラオケは14時頃から開始。コルヴィッツ広場のマーケットは土曜9時〜16時。クルトゥアブラウエライは年中営業、施設により時間が異なります。ベルリンの公共交通はABゾーンチケットで市内ほぼ全域をカバーします。eSIMがあればマーケットの出店情報やカフェの空き状況をリアルタイムで確認できます。" },
      ],
      [
        { q: "マウアーパークの蚤の市はいつ？", a: "毎週日曜日、10時〜18時です。雨天でも開催されますが、出店数が減ることがあります。" },
        { q: "子連れにおすすめ？", a: "プレンツラウアーベルクはベルリンで最も子どもに優しい地区です。遊び場、子ども向けカフェ、広い歩道が充実しています。" },
        { q: "クロイツベルクとどう違う？", a: "クロイツベルクが多文化・カウンターカルチャーなら、プレンツラウアーベルクは落ち着いたファミリー向け。カフェ文化とオーガニック志向が特徴です。" },
      ],
    ),
    en: en(DE_EN_CTA,
      "Berlin Prenzlauer Berg Walk: Tree-Lined Streets and Organic Markets",
      "Stroll Prenzlauer Berg's Grunderzeit boulevards, browse the Kollwitzplatz farmers market, and catch Sunday karaoke at Mauerpark. A neighbourhood walk through Berlin's most family-friendly district.",
      BERLIN_PRENZLAUER_IMAGES[0],
      BERLIN_PRENZLAUER_IMAGES,
      BERLIN_X,
      [
        { heading: "Why this walk works", body: "Prenzlauer Berg preserves some of East Berlin's finest Grunderzeit-era apartment blocks, now renovated and lining wide, tree-canopied streets. Since reunification the area has become Berlin's most family-friendly neighbourhood, with organic cafes, boutique shops, and weekend markets replacing the squatter culture of the 1990s. Kastanienallee — nicknamed 'Casting Allee' for its fashionable crowd — anchors the walk, while Kollwitzplatz and Mauerpark provide weekend market highlights. The atmosphere is calm, green, and stroller-paced." },
        { heading: "How to get there", body: "Eberswalder Strasse station on U-Bahn Line U2 is the neighbourhood hub. Tram M1 also serves the area. Kastanienallee begins steps from the station, making it a natural starting point for exploring north or south along the boulevard." },
        { heading: "Key stops", body: "Kollwitzplatz hosts an organic farmers market on Saturdays, selling local vegetables, artisan bread, and cheese. Kulturbrauerei is a former brewery complex converted into cinemas, clubs, and galleries, with a Christmas market in December. The Wasserturm (water tower) is the neighbourhood landmark, and the surrounding park is popular for picnics. Mauerpark draws crowds on Sundays for its flea market and outdoor karaoke amphitheatre." },
        { heading: "Cafes and shopping", body: "Prenzlauer Berg is the capital of Berlin's brunch culture. Speciality coffee roasters cluster along every main street, and weekend queues start forming at 10:00. Kastanienallee is lined with children's clothing shops, Scandinavian design stores, and organic grocers — the concentration of tasteful retail earned it the 'Casting Allee' nickname." },
        { heading: "Practical tips", body: "Mauerpark flea market runs Sundays 10:00 to 18:00; karaoke begins around 14:00. Kollwitzplatz market operates Saturdays 09:00 to 16:00. Kulturbrauerei is open year-round with varying hours per venue. Berlin's AB zone public transport ticket covers nearly the entire city. An eSIM lets you check market vendor lists and cafe availability in real time." },
      ],
      [
        { q: "When is the Mauerpark flea market?", a: "Every Sunday, 10:00 to 18:00. It runs in rain too, though some vendors may not set up." },
        { q: "Is it good for children?", a: "Prenzlauer Berg is Berlin's most child-friendly district, with playgrounds, kid-oriented cafes, and wide pavements throughout." },
        { q: "How does it differ from Kreuzberg?", a: "Kreuzberg is multicultural and counter-cultural; Prenzlauer Berg is quieter, family-oriented, and centred on cafe culture and organic food." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. Berlin — Mitte Museum Island Walk
  // ═══════════════════════════════════════════════════════════════
  "berlin-mitte-museum-island-walk": {
    ja: ja(DE_JA_CTA,
      "ベルリン ミッテ散策：博物館島とハッケシャー・マルクト周辺",
      "ユネスコ世界遺産の博物館島を起点に、ベルリン大聖堂、ハッケシェ・ヘーフェのアールヌーヴォー中庭、シュプレー川沿いを歩くミッテの街歩きガイドです。",
      BERLIN_MITTE_IMAGES[0],
      BERLIN_MITTE_IMAGES,
      BERLIN_X,
      [
        { heading: "このルートの特徴", body: "ミッテはベルリンの歴史的中心地であり、博物館島（ムゼウムスインゼル）はシュプレー川の中州に5つの世界的美術館が集中するユネスコ世界遺産です。ペルガモン博物館のイシュタル門、新博物館のネフェルティティ胸像、旧ナショナルギャラリーの印象派コレクションなど、どれかひとつを選ぶだけでも充実した時間を過ごせます。島の外に出ればベルリン大聖堂のドームに登れ、ハッケシェ・ヘーフェのアールヌーヴォー中庭やDDR博物館も徒歩圏内です。" },
        { heading: "アクセスと起点", body: "S-Bahn Hackescher Markt駅が最寄りです。U-Bahn U6線Friedrichstrasse駅からも徒歩10分。バス100番と200番はUnter den Lindenを通り、博物館島の近くを通過します。ベルリンのABゾーンチケットで全公共交通機関が利用できます。" },
        { heading: "主要スポット", body: "博物館島の5館は共通チケット（Museumsinsel-Ticket）で入場可能。すべて見るには2日必要ですが、1館だけなら2〜3時間。ベルリン大聖堂は入場有料でドームからの360度パノラマが見どころ。ルストガルテン（庭園）はピクニックや休憩に最適な広場です。ハッケシェ・ヘーフェは8つの中庭が連なるアールヌーヴォー建築で、ショップとカフェが並びます。DDR博物館は旧東ドイツの日常生活を体験型展示で紹介しています。" },
        { heading: "シュプレー川沿いの散歩", body: "博物館島からシュプレー川沿いに歩くとベルリン中央駅（ハウプトバーンホフ）方面に抜けられます。川沿いの遊歩道は木陰が多く、クルーズ船を眺めながらゆっくり歩けます。夏にはカフェテラスや屋外バーが川岸に並び、ベルリンのリラックスした雰囲気を体験できます。" },
        { heading: "実用情報", body: "博物館は月曜休館のところが多いので注意。ペルガモン博物館は現在一部改修中のため、訪問前に開館状況を確認してください。ベルリン大聖堂は1時間で見られます。eSIMがあれば博物館のチケットをオンラインで事前購入でき、行列を回避できます。" },
      ],
      [
        { q: "博物館島で1つだけ選ぶなら？", a: "新博物館（ネフェルティティ胸像）かペルガモン博物館（イシュタル門）が最も人気です。美術に興味があれば旧ナショナルギャラリーも見応えがあります。" },
        { q: "博物館島の共通チケットは必要？", a: "2館以上見るなら共通チケットがお得です。1館だけなら個別チケットで十分です。" },
        { q: "雨の日のプランとして使える？", a: "博物館島は屋内なので雨天に最適です。ハッケシェ・ヘーフェも屋根付き中庭が多いので雨でも楽しめます。" },
      ],
    ),
    en: en(DE_EN_CTA,
      "Berlin Mitte Walk: Museum Island and Hackesche Hofe",
      "Start at the UNESCO-listed Museum Island, climb the Berlin Cathedral dome, and browse the Art Nouveau courtyards of Hackesche Hofe. A walk through Berlin's historic heart along the Spree.",
      BERLIN_MITTE_IMAGES[0],
      BERLIN_MITTE_IMAGES,
      BERLIN_X,
      [
        { heading: "Why this walk works", body: "Mitte is Berlin's historic centre, and Museum Island — a UNESCO World Heritage Site — concentrates five world-class museums on a single island in the Spree. The Ishtar Gate at the Pergamon Museum, Nefertiti's bust at the Neues Museum, and the Impressionist collection at the Alte Nationalgalerie each justify a visit on their own. Beyond the island, the Berlin Cathedral dome offers a 360-degree panorama, the Hackesche Hofe present eight connected Art Nouveau courtyards, and the DDR Museum recreates daily life in East Germany. The area packs more cultural density into a short walk than almost anywhere else in Europe." },
        { heading: "How to get there", body: "Hackescher Markt S-Bahn station is the closest stop. Friedrichstrasse station on U-Bahn Line U6 is a 10-minute walk. Buses 100 and 200 run along Unter den Linden past the island. Berlin's AB zone ticket covers all public transport in the area." },
        { heading: "Key stops", body: "The five Museum Island museums share a combined ticket (Museumsinsel-Ticket). Seeing all five takes two days, but a single museum visit fits into 2 to 3 hours. The Berlin Cathedral charges an entry fee, with the dome climb offering panoramic views. Lustgarten is a green square ideal for a rest or picnic. Hackesche Hofe is a complex of eight interconnected courtyards in Art Nouveau style, lined with shops and cafes. The DDR Museum offers interactive exhibits on everyday East German life." },
        { heading: "Spree riverside walk", body: "From Museum Island the Spree riverbank path leads toward the Hauptbahnhof (central station). The tree-shaded promenade passes cruise boats and, in summer, opens onto cafe terraces and pop-up bars along the water. The walk adds about 30 minutes and provides a relaxed contrast to the density of the museum area." },
        { heading: "Practical tips", body: "Many museums close on Mondays. The Pergamon Museum is partially closed for renovation — check current opening status before visiting. The Berlin Cathedral can be seen in about an hour. An eSIM lets you buy museum tickets online in advance and skip queues." },
      ],
      [
        { q: "If I can only visit one museum, which should I choose?", a: "The Neues Museum (Nefertiti) and the Pergamon Museum (Ishtar Gate) are the most popular. For art lovers, the Alte Nationalgalerie's Impressionist collection is outstanding." },
        { q: "Is the combined museum ticket worth it?", a: "If you plan to visit two or more museums, the combined ticket saves money. For a single museum, an individual ticket is sufficient." },
        { q: "Is this a good rainy-day plan?", a: "Museum Island is entirely indoors, making it ideal for wet weather. Hackesche Hofe's covered courtyards also work well in the rain." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. Berlin — Friedrichshain Walk
  // ═══════════════════════════════════════════════════════════════
  "berlin-friedrichshain-walk": {
    ja: ja(DE_JA_CTA,
      "ベルリン フリードリヒスハイン散策：イーストサイドギャラリーと週末マーケット",
      "ベルリンの壁に描かれたイーストサイドギャラリーから、ボックスハーゲナー広場のマーケット、フォルクスパークまで歩く旧東ベルリンの街歩きガイドです。",
      BERLIN_FRIEDRICHSHAIN_IMAGES[0],
      BERLIN_FRIEDRICHSHAIN_IMAGES,
      BERLIN_X,
      [
        { heading: "このルートの特徴", body: "フリードリヒスハインは旧東ベルリンの地区で、イーストサイドギャラリー（ベルリンの壁の最長残存区間）が最大の見どころです。1.3kmにわたる壁面には100以上のアーティストが壁画を描き、冷戦の記憶とアートが融合した世界でもユニークなオープンエアギャラリーとなっています。壁から離れれば、ボックスハーゲナー広場の週末マーケット、RAWゲレンデのカルチャーコンプレックス、ジモン・ダッハ通りのバーストリートが続きます。" },
        { heading: "アクセスと起点", body: "S-Bahn/U-Bahn Warschauer Strasse駅が起点です。イーストサイドギャラリーは駅から徒歩3分。Ostbahnhof駅からギャラリーの反対端にアクセスすることもできます。全体的に平坦で歩きやすいエリアです。" },
        { heading: "主要スポット", body: "イーストサイドギャラリーは24時間アクセス可能で入場無料。有名な「兄弟のキス」（ホーネッカーとブレジネフ）の壁画が最も写真に撮られるスポットです。RAWゲレンデは旧鉄道修理工場をリノベーションしたカルチャースポットで、クラブ、バー、クライミングウォール、フリーマーケットが集まっています。ボックスハーゲナー広場は土曜がフードマーケット、日曜がフリーマーケット。フォルクスパーク・フリードリヒスハインはベルリン最古の公園で、噴水と広い芝生があります。" },
        { heading: "ナイトライフ", body: "フリードリヒスハインはベルリンのクラブシーンの中心地です。ジモン・ダッハ通りにはバーが密集し、夏はテラス席で深夜まで賑わいます。RAWゲレンデにはテクノクラブが複数あり、金曜・土曜は朝まで営業しています。ただし散策目的なら日中がおすすめで、アートと市場を堪能できます。" },
        { heading: "実用情報", body: "イーストサイドギャラリーは屋外なので天候に左右されます。壁画は経年劣化が進んでおり、修復も行われています。ボックスハーゲナー広場の土曜マーケットは9時〜16時、日曜フリーマーケットは10時〜18時。RAWゲレンデ周辺は夜間スリに注意。eSIMがあれば壁画の作品解説をオンラインで検索しながら歩けます。" },
      ],
      [
        { q: "イーストサイドギャラリーの所要時間は？", a: "全長1.3kmを歩くだけなら20分ですが、壁画を見ながら歩くと40分〜1時間かかります。" },
        { q: "クロイツベルクと組み合わせられる？", a: "オーバーバウム橋を渡ればクロイツベルクです。フリードリヒスハイン→クロイツベルクのルートが自然につながります。" },
        { q: "RAWゲレンデは子連れでも行ける？", a: "日中は問題ありませんが、夜はクラブエリアとなるため子連れには不向きです。クライミングウォールは子どもも利用可能です。" },
      ],
    ),
    en: en(DE_EN_CTA,
      "Berlin Friedrichshain Walk: East Side Gallery and Weekend Markets",
      "Walk the longest remaining stretch of the Berlin Wall at the East Side Gallery, browse Boxhagener Platz markets, and explore the RAW-Gelande cultural compound in former East Berlin.",
      BERLIN_FRIEDRICHSHAIN_IMAGES[0],
      BERLIN_FRIEDRICHSHAIN_IMAGES,
      BERLIN_X,
      [
        { heading: "Why this walk works", body: "Friedrichshain is a former East Berlin district anchored by the East Side Gallery — the longest surviving section of the Berlin Wall, stretching 1.3 km along the Spree. Over 100 artists have painted murals on the wall, creating a unique open-air gallery where Cold War memory meets contemporary art. Beyond the wall, the neighbourhood offers Boxhagener Platz's weekend markets, the RAW-Gelande cultural compound in a former railway repair yard, and Simon-Dach-Strasse's bustling bar scene. The contrast between history and present-day energy makes this one of Berlin's most compelling walks." },
        { heading: "How to get there", body: "Warschauer Strasse station (S-Bahn and U-Bahn) is the starting point. The East Side Gallery begins a three-minute walk from the station. Alternatively, start from Ostbahnhof to approach from the opposite end. The entire area is flat and easy to walk." },
        { heading: "Key stops", body: "The East Side Gallery is open 24 hours and free to enter. The most photographed mural is the 'Fraternal Kiss' between Honecker and Brezhnev by Dmitri Vrubel. RAW-Gelande is a converted railway repair yard now housing clubs, bars, a climbing wall, and flea markets. Boxhagener Platz runs a food market on Saturdays and a flea market on Sundays. Volkspark Friedrichshain is Berlin's oldest public park, with a fountain, open lawns, and hilltop viewpoints." },
        { heading: "Nightlife", body: "Friedrichshain is central to Berlin's club scene. Simon-Dach-Strasse packs bars along both sides, with summer terraces open late. RAW-Gelande houses several techno clubs that operate through the night on weekends. For a daytime walk, however, the art and markets provide more than enough to fill a morning or afternoon." },
        { heading: "Practical tips", body: "The East Side Gallery is outdoors, so check the weather. Murals show signs of aging and some are under restoration. Boxhagener Platz Saturday market runs 09:00 to 16:00; Sunday flea market 10:00 to 18:00. Watch for pickpockets around RAW-Gelande at night. An eSIM lets you look up mural descriptions and artist backgrounds as you walk." },
      ],
      [
        { q: "How long does the East Side Gallery take?", a: "Walking the full 1.3 km without stopping takes about 20 minutes. Viewing the murals carefully takes 40 minutes to an hour." },
        { q: "Can I combine this with Kreuzberg?", a: "Yes. The Oberbaum Bridge connects Friedrichshain directly to Kreuzberg. Walking from the East Side Gallery across the bridge into Kreuzberg is a natural route." },
        { q: "Is RAW-Gelande suitable for children?", a: "During the day it is fine, and the climbing wall welcomes children. At night the area transforms into a clubbing zone and is not suitable for families." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. Prague — Mala Strana Walk
  // ═══════════════════════════════════════════════════════════════
  "prague-mala-strana-walk": {
    ja: ja(CZ_JA_CTA,
      "プラハ マラーストラナ散策：坂道とバロック庭園の小地区",
      "カレル橋からマラーストラナの坂道を登り、バロック庭園とレノンの壁を巡るプラハの裏道散策ルートです。プラハ城の麓に広がる静かなエリアを歩きます。",
      PRAGUE_MALA_STRANA_IMAGES[0],
      PRAGUE_MALA_STRANA_IMAGES,
      PRAGUE_X,
      [
        { heading: "このルートの特徴", body: "マラーストラナ（小地区）はプラハ城の麓からヴルタヴァ川まで広がるバロック建築の宝庫です。カレル橋を渡ってすぐのエリアですが、旧市街ほど観光客で混雑せず、石畳の坂道を登ると美しい庭園や隠れた教会に出会えます。赤い屋根の街並みはプラハの象徴的な風景で、ネルドヴァ通りを上れば城まで直結しています。カンパ島やレノンの壁など、フォトジェニックなスポットも点在しています。" },
        { heading: "アクセスと起点", body: "地下鉄A線Malostranska駅が最寄りです。カレル橋の西側からそのまま歩いて入るのが最も一般的なルートです。トラム12番、20番、22番もマラーストラナを通ります。坂道が多いので、歩きやすい靴が必須です。" },
        { heading: "主要スポット", body: "聖ミクラーシュ教会はプラハ最美のバロック教会で、巨大な緑のドームが目印です。入場有料ですが内部のフレスコ画は圧巻。ヴルトゥボフスカー庭園（ヴルトバ庭園）はバロック式のテラスガーデンで、マラーストラナの赤い屋根を見下ろす絶景ポイントです。レノンの壁は1980年代からビートルズの歌詞やグラフィティで覆われた壁で、写真スポットとして人気。カンパ島はチェルトフカ運河で隔てられた小さな島で、モダンアート美術館や静かな公園があります。" },
        { heading: "ネルドヴァ通りとプラハ城", body: "ネルドヴァ通りはマラーストラナからプラハ城へ続く急な坂道で、建物の看板（家紋）が見どころです。「三本のバイオリンの家」「金の杯の家」など、番地がなかった時代の名残です。通りの先はプラハ城に直結しており、マラーストラナ散策と城見学を一続きにできます。ただし坂道は急なので、体力に余裕を持って挑みましょう。" },
        { heading: "実用情報", body: "マラーストラナのレストランは旧市街より観光客向けが少なく、コスパが良い店が見つかります。チェコクローネが基本通貨ですが、多くの店でカードが使えます。ユーロは観光地では受け付ける店もありますが、レートが不利です。eSIMがあれば坂道のルートをGPSで確認しながら歩けます。" },
      ],
      [
        { q: "マラーストラナの散策時間は？", a: "庭園とレノンの壁を含めて2〜3時間。プラハ城まで歩くと半日コースになります。" },
        { q: "坂道はきつい？", a: "ネルドヴァ通りは急坂ですが距離は短く、10〜15分で城の入口に着きます。庭園のテラスも階段が多いです。" },
        { q: "カレル橋はいつが空いている？", a: "早朝6〜7時が最も空いています。日中は常に混雑し、特に10時〜16時はかなり混みます。" },
        { q: "カンパ島は無料で入れる？", a: "島自体は24時間アクセス可能で無料。カンパ美術館のみ入場有料です。" },
      ],
    ),
    en: en(CZ_EN_CTA,
      "Prague Mala Strana Walk: Baroque Gardens and Cobblestone Lanes",
      "Cross the Charles Bridge into Mala Strana and climb through baroque gardens, past the Lennon Wall, and up Nerudova Street toward Prague Castle. A quieter side of Prague below the castle walls.",
      PRAGUE_MALA_STRANA_IMAGES[0],
      PRAGUE_MALA_STRANA_IMAGES,
      PRAGUE_X,
      [
        { heading: "Why this walk works", body: "Mala Strana (the Lesser Town) spreads from the foot of Prague Castle down to the Vltava river. Its baroque townhouses and red-tiled rooftops are among Prague's most iconic images, yet the area draws noticeably fewer visitors than the Old Town across the river. Cobblestone lanes climb past hidden churches and terraced gardens, offering views over the rooftops that reward every steep ascent. Kampa Island and the Lennon Wall add photogenic variety, and Nerudova Street connects the quarter directly to Prague Castle for those who want to continue uphill." },
        { heading: "How to get there", body: "Malostranska station on Metro Line A is the closest stop. The most popular approach is simply to walk across the Charles Bridge from the Old Town. Trams 12, 20, and 22 also pass through Mala Strana. Comfortable shoes are essential — the streets are cobblestoned and hilly." },
        { heading: "Key stops", body: "The Church of St Nicholas is Prague's finest baroque church, with a massive green dome visible across the quarter. The Vrtba Garden is a baroque terrace garden with panoramic views over the red rooftops. The Lennon Wall has been covered in Beatles lyrics and graffiti since the 1980s. Kampa Island, separated from the mainland by the Certovka stream, offers a modern art museum and a quiet park." },
        { heading: "Nerudova Street and Prague Castle", body: "Nerudova Street climbs steeply from Mala Strana to Prague Castle. Its buildings are identified by painted house signs — 'At the Three Violins', 'At the Golden Cup' — relics from the era before street numbers. The street connects directly to the castle entrance, making it natural to combine the Mala Strana walk with a castle visit. The slope is steep but short, taking 10 to 15 minutes to climb." },
        { heading: "Practical tips", body: "Restaurants in Mala Strana tend to offer better value than those in the Old Town, with fewer tourist traps. Czech koruna is the standard currency, though most shops accept cards. Euros are accepted at some tourist-facing venues but at unfavourable rates. An eSIM lets you navigate the hilly streets with GPS and check opening hours on the go." },
      ],
      [
        { q: "How long does the Mala Strana walk take?", a: "Allow 2 to 3 hours including gardens and the Lennon Wall. Extending up to Prague Castle makes it a half-day route." },
        { q: "Are the hills difficult?", a: "Nerudova Street is steep but short — 10 to 15 minutes to the castle entrance. The garden terraces also involve stairs." },
        { q: "When is the Charles Bridge least crowded?", a: "Early morning between 06:00 and 07:00. During the day it is consistently crowded, especially from 10:00 to 16:00." },
        { q: "Is Kampa Island free to visit?", a: "The island itself is open 24 hours and free. Only the Kampa Museum charges an entrance fee." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. Prague — Vinohrady Walk
  // ═══════════════════════════════════════════════════════════════
  "prague-vinohrady-walk": {
    ja: ja(CZ_JA_CTA,
      "プラハ ヴィノフラディ散策：アールヌーヴォー建築とカフェ文化",
      "地元プラハっ子に愛されるヴィノフラディ地区を歩く。アールヌーヴォーのアパート、ビアガーデン付きの公園、ファーマーズマーケットを巡る穴場ルートです。",
      PRAGUE_VINOHRADY_IMAGES[0],
      PRAGUE_VINOHRADY_IMAGES,
      PRAGUE_X,
      [
        { heading: "このルートの特徴", body: "ヴィノフラディはプラハ中心部のすぐ南東に位置する住宅地で、観光客はほとんど訪れません。19世紀末〜20世紀初頭のアールヌーヴォーやネオ・ルネサンスのアパートが並ぶ美しい街並みが特徴で、プラハで最も住みたい地区として知られています。カフェ文化が発達しており、サードウェーブ系のコーヒーショップからクラシックなチェコのビアホールまで、飲食店の質が高いエリアです。" },
        { heading: "アクセスと起点", body: "地下鉄A線Namesti Miru駅が中心です。駅を出るとすぐに聖ルドミラ教会とナームニェスティー・ミール広場が目に入ります。地下鉄A線Jiriho z Podebrad駅もヴィノフラディの北端にあり、ファーマーズマーケットの最寄りです。" },
        { heading: "主要スポット", body: "ナームニェスティー・ミール広場のネオ・ゴシック様式の聖ルドミラ教会がランドマーク。リーグロヴィ・サディ公園はプラハ城を見渡せるビアガーデンがあり、地元民の憩いの場です。ハヴリーチコヴィ・サディは19世紀の風景式庭園で、グロッタ・パビリオンとブドウ畑があります。イジーホ・ズ・ポジェブラト広場では水〜土曜にファーマーズマーケットが開催され、地元の農産物やチェコのペストリーが並びます。" },
        { heading: "建築散歩", body: "ヴィノフラディの魅力は建物そのものです。大通りを一本入ると、色とりどりのアールヌーヴォーファサード、鉄細工のバルコニー、タイル装飾のエントランスが次々と現れます。特にKorunni通り、Manesova通り、Polska通り周辺に見応えのある建物が集中しています。建築写真が好きな方には宝の山です。" },
        { heading: "実用情報", body: "ヴィノフラディは観光地ではないため、物価がプラハ中心部より安いです。カフェのコーヒーは旧市街の半額近いことも。ファーマーズマーケットは水〜土曜の朝から14時頃まで。リーグロヴィ・サディのビアガーデンは4月〜10月の天気の良い日に営業。eSIMがあれば建築物の歴史をその場で調べたり、カフェの口コミを確認できます。" },
      ],
      [
        { q: "ヴィノフラディの散策時間は？", a: "2〜3時間でカフェ、マーケット、公園を一通り回れます。建築散歩を含めると半日楽しめます。" },
        { q: "旧市街から遠い？", a: "地下鉄A線で2駅（Mustek駅から Namesti Miru駅）、5分で着きます。歩いても20分程度です。" },
        { q: "英語は通じる？", a: "カフェやレストランではほぼ通じます。マーケットの露店では片言の場合もありますが、指差しで問題ありません。" },
      ],
    ),
    en: en(CZ_EN_CTA,
      "Prague Vinohrady Walk: Art Nouveau Architecture and Local Cafe Culture",
      "Discover Vinohrady, the residential neighbourhood Praguers love most. Walk past Art Nouveau apartments, sip beer at a hilltop garden, and browse the farmers market the tourists miss.",
      PRAGUE_VINOHRADY_IMAGES[0],
      PRAGUE_VINOHRADY_IMAGES,
      PRAGUE_X,
      [
        { heading: "Why this walk works", body: "Vinohrady sits just southeast of Prague's centre and draws almost no tourists. Its streets are lined with Art Nouveau and Neo-Renaissance apartment blocks from the late 19th and early 20th centuries, making it one of Prague's most architecturally rewarding walks. The neighbourhood is consistently rated the most desirable in Prague, with a cafe culture that spans third-wave coffee shops and traditional Czech beer halls. Walking here feels like seeing the city the way residents do." },
        { heading: "How to get there", body: "Namesti Miru station on Metro Line A is the centre of the neighbourhood. The neo-Gothic Church of St Ludmila and Namesti Miru square are immediately outside. Jiriho z Podebrad station, also on Line A, sits at the northern edge and is closest to the farmers market." },
        { heading: "Key stops", body: "The Church of St Ludmila on Namesti Miru square is the neighbourhood landmark. Riegrovy Sady park has a beer garden with views of Prague Castle across the valley — a favourite local gathering spot. Havlickovy Sady is a 19th-century landscaped park with a Grotta pavilion and a working vineyard. The farmers market at Jiriho z Podebrad square operates Wednesday to Saturday, selling local produce and Czech pastries." },
        { heading: "Architecture walk", body: "Vinohrady's appeal lies in the buildings themselves. Step off the main roads and colourful Art Nouveau facades, wrought-iron balconies, and tiled entrance halls appear on every block. Korunni, Manesova, and Polska streets have particularly notable concentrations. For anyone interested in architectural photography, the neighbourhood is a treasure chest." },
        { heading: "Practical tips", body: "Because Vinohrady is not a tourist zone, prices are noticeably lower than in the Old Town. A cafe coffee can cost nearly half the Old Town price. The farmers market runs Wednesday to Saturday, morning until about 14:00. Riegrovy Sady beer garden operates April to October on fair-weather days. An eSIM lets you look up building histories and check cafe reviews on the spot." },
      ],
      [
        { q: "How long does the Vinohrady walk take?", a: "Two to three hours covers the cafes, market, and parks. Adding an architecture walk extends it to half a day." },
        { q: "Is it far from the Old Town?", a: "Two metro stops on Line A from Mustek to Namesti Miru — about five minutes. On foot it takes roughly 20 minutes." },
        { q: "Is English widely spoken?", a: "Cafes and restaurants generally speak English. Market vendors may have limited English, but pointing works fine." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. Prague — Josefov Walk
  // ═══════════════════════════════════════════════════════════════
  "prague-josefov-walk": {
    ja: ja(CZ_JA_CTA,
      "プラハ ヨゼフォフ散策：ユダヤ人地区と旧市街の歴史を歩く",
      "ヨーロッパで最も保存状態の良いユダヤ人地区のひとつ、ヨゼフォフを歩く。旧ユダヤ人墓地、シナゴーグ群、そして旧市街広場の天文時計まで繋ぐ歴史散策ルートです。",
      PRAGUE_JOSEFOV_IMAGES[0],
      PRAGUE_JOSEFOV_IMAGES,
      PRAGUE_X,
      [
        { heading: "このルートの特徴", body: "ヨゼフォフ（旧ユダヤ人地区）はプラハ旧市街の北側に位置し、13世紀から続くユダヤ人コミュニティの歴史を今に伝える地区です。旧ユダヤ人墓地には約12,000基の墓石が何層にも重なり、ヨーロッパで最も印象的なユダヤ人墓地のひとつです。シナゴーグ群はユダヤ博物館として公開されており、共通チケットで見学できます。地区を抜ければすぐに旧市街広場で、天文時計やティーン聖母教会も徒歩圏内です。" },
        { heading: "アクセスと起点", body: "地下鉄A線Staromestska駅が最寄りです。駅からヨゼフォフまで徒歩3分。パジーシュスカー通りはヨゼフォフのメインストリートで、高級ブティックが並ぶプラハのシャンゼリゼとも呼ばれます。" },
        { heading: "主要スポット", body: "旧新シナゴーグは13世紀から使われ続けるヨーロッパ最古の現役シナゴーグです。スペインシナゴーグはムーア復興様式の内装が圧巻で、ユダヤ博物館の中でも最も華やかな空間です。旧ユダヤ人墓地は15世紀から使用され、土地不足のため墓石が何層にも積み重なっています。旧市街広場の天文時計は1410年製で、毎正時に使徒の人形が動くからくり仕掛けが見られます。" },
        { heading: "パジーシュスカー通りと周辺", body: "パジーシュスカー通りはヨゼフォフから旧市街広場に抜けるメイン通りで、19世紀末の都市改造で整備されました。アールヌーヴォーの建物が並ぶ美しい通りですが、高級ブランド店が多く、散策だけでも楽しめます。通りの裏手には小さなカフェやギャラリーが隠れています。" },
        { heading: "実用情報", body: "ユダヤ博物館の共通チケットは旧新シナゴーグを含むものと含まないものの2種類があります。すべて見学するには3〜4時間必要です。安息日（土曜）とユダヤの祝日は閉館する施設があります。旧市街広場周辺は観光客向けの飲食店が多く割高なので、一本裏の通りを探すとよいでしょう。eSIMがあればチケットをオンラインで事前購入でき、行列を避けられます。" },
      ],
      [
        { q: "ユダヤ博物館は何時間必要？", a: "共通チケットの全施設を見るなら3〜4時間。シナゴーグ2〜3箇所と墓地だけなら2時間で足ります。" },
        { q: "子どもでも楽しめる？", a: "歴史的な重みのある場所なので、ある程度の年齢の子どものほうが理解できます。天文時計のからくりは小さな子どもにも人気です。" },
        { q: "安息日に行っても見られるものはある？", a: "土曜日はシナゴーグと墓地は閉館しますが、旧市街広場や建築は外から見られます。日曜日は通常営業です。" },
        { q: "旧市街広場で安く食事するには？", a: "広場に面したレストランは観光地価格です。一本裏の通りに入ると地元向けの店があり、半額近い値段で食べられます。" },
      ],
    ),
    en: en(CZ_EN_CTA,
      "Prague Josefov Walk: The Jewish Quarter and Old Town History",
      "Walk through one of Europe's best-preserved Jewish quarters. Visit centuries-old synagogues, the layered Old Jewish Cemetery, and continue to the Astronomical Clock on Old Town Square.",
      PRAGUE_JOSEFOV_IMAGES[0],
      PRAGUE_JOSEFOV_IMAGES,
      PRAGUE_X,
      [
        { heading: "Why this walk works", body: "Josefov, Prague's former Jewish quarter, sits just north of Old Town Square and preserves centuries of Jewish history within a compact area. The Old Jewish Cemetery holds roughly 12,000 tombstones layered over each other due to lack of space — one of Europe's most haunting sights. The synagogues function as the Jewish Museum of Prague and can be visited on a combined ticket. The quarter connects directly to Old Town Square, where the 1410 Astronomical Clock and the Tyn Church await." },
        { heading: "How to get there", body: "Staromestska station on Metro Line A is a three-minute walk from Josefov. Parizska Street is the quarter's main boulevard, lined with luxury boutiques and often called Prague's Champs-Elysees." },
        { heading: "Key stops", body: "The Old-New Synagogue has been in continuous use since the 13th century, making it Europe's oldest active synagogue. The Spanish Synagogue features a Moorish Revival interior that is the most ornate space in the museum complex. The Old Jewish Cemetery, in use from the 15th century, has tombstones stacked in multiple layers. On Old Town Square the Astronomical Clock performs an apostle procession every hour on the hour." },
        { heading: "Parizska Street and surroundings", body: "Parizska Street was built during the late 19th-century urban renewal that replaced much of Josefov's original fabric. Art Nouveau buildings line the boulevard, which is pleasant to walk even without shopping. Side streets off Parizska hide smaller cafes and galleries away from the luxury frontage." },
        { heading: "Practical tips", body: "The Jewish Museum offers two combined ticket options — one including the Old-New Synagogue and one without. Visiting all sites takes 3 to 4 hours. Some facilities close on Saturdays (Shabbat) and Jewish holidays. Restaurants around Old Town Square charge tourist prices; better value is found one street back. An eSIM lets you buy tickets online in advance and skip queues." },
      ],
      [
        { q: "How many hours does the Jewish Museum need?", a: "Three to four hours for all sites on the combined ticket. Visiting two or three synagogues and the cemetery takes about two hours." },
        { q: "Is it suitable for children?", a: "The historical weight of the sites is more meaningful for older children. Younger children tend to enjoy the Astronomical Clock's hourly procession on Old Town Square." },
        { q: "Can I visit on the Sabbath?", a: "Synagogues and the cemetery close on Saturdays. Old Town Square and the exterior architecture are accessible any day. Sunday hours are normal." },
        { q: "Where can I eat affordably near Old Town Square?", a: "Restaurants facing the square charge tourist prices. Walking one street back reveals local establishments at roughly half the cost." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. Vienna — Naschmarkt Walk
  // ═══════════════════════════════════════════════════════════════
  "vienna-naschmarkt-walk": {
    ja: ja(AT_JA_CTA,
      "ウィーン ナッシュマルクト散策：市場グルメとセセッション建築",
      "ウィーン最大の屋外市場ナッシュマルクトを歩き、オットー・ワーグナーのアールヌーヴォー建築とセセッション館を巡る。土曜の蚤の市も見逃せないグルメ＆建築散策ルートです。",
      VIENNA_NASCHMARKT_IMAGES[0],
      VIENNA_NASCHMARKT_IMAGES,
      VIENNA_X,
      [
        { heading: "このルートの特徴", body: "ナッシュマルクトはウィーン最大の屋外市場で、16世紀から続く歴史があります。約1.5kmにわたって120以上のスタンドが並び、トルコ料理、地中海食材、チーズ、スパイス、ワインが揃います。市場の東端にはセセッション（分離派会館）の金のドームが輝き、ウィーン通り沿いにはオットー・ワーグナーが設計したマヨリカハウスとメダイヨンハウスのアールヌーヴォー建築が並びます。食と建築の両方を一度に楽しめるウィーンならではのルートです。" },
        { heading: "アクセスと起点", body: "U-Bahn U1/U2/U4線Karlsplatz駅が最寄りです。セセッション館側（東端）から市場に入り、西に向かって歩くルートが順路です。土曜には西端で蚤の市が開催されるので、蚤の市まで一直線に歩けます。" },
        { heading: "主要スポット", body: "セセッション館はクリムトの「ベートーヴェン・フリーズ」を収蔵し、金色のキャベツドームが目印です。市場内ではトルコのギョズレメ、ギリシャのオリーブ、オーストリアのキュルビスケルンエル（カボチャの種のオイル）が定番の購入品です。ウィーン通りに面したマヨリカハウスは花柄タイルのファサードが見事で、オットー・ワーグナーのユーゲントシュティール（アールヌーヴォー）建築の代表作です。土曜の蚤の市はアンティーク、レコード、古着が並びます。" },
        { heading: "市場での食事", body: "ナッシュマルクトは朝食からランチまで食べ歩きの宝庫です。スタンドごとに異なる国の料理が楽しめ、トルコ、インド、日本食のスタンドもあります。朝9時頃から店が開き始め、ランチタイムの12〜14時がもっとも賑わいます。ワインスタンドでオーストリアワインの試飲もできます。テーブル席があるスタンドも多く、座って食事することも可能です。" },
        { heading: "実用情報", body: "市場は月〜土営業、日曜休み。蚤の市は土曜のみ。早朝6時から開いている店もありますが、飲食スタンドは9時頃から。蚤の市は6時半から。カード払い可能な店が増えていますが、小さなスタンドでは現金のみの場合もあります。eSIMがあれば各スタンドの口コミをチェックしたり、マヨリカハウスの建築解説を調べたりできます。" },
      ],
      [
        { q: "ナッシュマルクトのおすすめ時間は？", a: "食べ歩きなら10〜12時。蚤の市は早朝の7時頃が掘り出し物のチャンスです。午後は片付けが始まる店もあります。" },
        { q: "日曜は開いている？", a: "市場は日曜休みです。セセッション館は火〜日曜に営業しているので、建築見学は日曜でも可能です。" },
        { q: "予算はどのくらい必要？", a: "食べ歩きのランチで10〜20ユーロが目安です。蚤の市は掘り出し物次第ですが、見て歩くだけなら無料です。" },
      ],
    ),
    en: en(AT_EN_CTA,
      "Vienna Naschmarkt Walk: Market Food and Secession Architecture",
      "Explore Vienna's largest open-air market, taste Turkish, Mediterranean, and Austrian specialities, and admire Otto Wagner's Art Nouveau facades — all on a single walkable strip.",
      VIENNA_NASCHMARKT_IMAGES[0],
      VIENNA_NASCHMARKT_IMAGES,
      VIENNA_X,
      [
        { heading: "Why this walk works", body: "The Naschmarkt is Vienna's largest outdoor market, stretching 1.5 kilometres with over 120 stalls selling Turkish, Mediterranean, and Austrian produce. At its eastern end the Secession building's golden dome marks the birthplace of Vienna's Art Nouveau movement, and along the Wienzeile Otto Wagner's Majolica House and Medallion House display Jugendstil facades. The combination of food, architecture, and a Saturday flea market makes this one of Vienna's most rewarding short walks." },
        { heading: "How to get there", body: "Karlsplatz station (U1, U2, U4) is the starting point. Enter the market from the Secession end (east) and walk west. On Saturdays the flea market occupies the western end, giving the walk a natural finish point." },
        { heading: "Key stops", body: "The Secession building houses Klimt's Beethoven Frieze and is topped by its iconic golden cabbage dome. Inside the market, Turkish gozleme, Greek olives, and Austrian Kurbiskernol (pumpkin seed oil) are popular purchases. The Majolica House on the Wienzeile is covered in floral tiles — Otto Wagner's most recognisable Jugendstil facade. The Saturday flea market at the western end sells antiques, vinyl records, and vintage clothing." },
        { heading: "Eating at the market", body: "The Naschmarkt is a grazing destination from breakfast through lunch. Each stall offers a different cuisine — Turkish, Indian, Japanese, and Austrian sit side by side. Stalls begin opening around 09:00, with the busiest period between 12:00 and 14:00. Several stalls have seating, and Austrian wine tasting is available at dedicated stands." },
        { heading: "Practical tips", body: "The market operates Monday to Saturday; it is closed on Sundays. The flea market is Saturday only. Some food stalls open as early as 06:00, but most start around 09:00. The flea market begins at 06:30. Card payment is increasingly accepted, but small stalls may still require cash. An eSIM lets you check stall reviews and read up on the Majolica House's architectural history as you walk." },
      ],
      [
        { q: "What is the best time to visit?", a: "For food, 10:00 to 12:00. For the flea market, arrive by 07:00 for the best finds. Some stalls begin packing up in the afternoon." },
        { q: "Is it open on Sundays?", a: "The market is closed on Sundays. The Secession building is open Tuesday to Sunday, so the architecture is accessible on Sundays." },
        { q: "How much should I budget?", a: "A grazing lunch costs roughly 10 to 20 euros. The flea market is free to browse." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. Vienna — Spittelberg Walk
  // ═══════════════════════════════════════════════════════════════
  "vienna-spittelberg-walk": {
    ja: ja(AT_JA_CTA,
      "ウィーン シュピッテルベルク散策：ビーダーマイヤー建築と路地のレストラン",
      "ミュージアムクォーター隣接のシュピッテルベルクを歩く。18世紀のビーダーマイヤー建築が残る歩行者専用の路地と、夏のテラス席が魅力の穴場エリアです。",
      VIENNA_SPITTELBERG_IMAGES[0],
      VIENNA_SPITTELBERG_IMAGES,
      VIENNA_X,
      [
        { heading: "このルートの特徴", body: "シュピッテルベルクはウィーン7区の小さな一角で、18世紀のビーダーマイヤー様式の建物が立ち並ぶ歩行者専用の路地が魅力です。ミュージアムクォーターの裏手にあり、夏にはレストランが路地にテーブルを出し、冬にはウィーンで最も雰囲気のあるクリスマスマーケットが開催されます。リングシュトラーセの壮大な建築とは対照的な、人間的なスケールの街並みが楽しめます。" },
        { heading: "アクセスと起点", body: "U-Bahn U2/U3線Volkstheater駅が最寄りです。ミュージアムクォーターの正面入口から裏手に回るとシュピッテルベルクの路地に入れます。U6線Burggasse-Stadthalle駅からもアクセス可能です。" },
        { heading: "主要スポット", body: "シュピッテルベルク通り（Spittelberggasse）が中心で、ビーダーマイヤー建築のファサードが連なる絵になる通りです。小さなギャラリー、手工芸品の店、ワインバーが点在しています。ミュージアムクォーターは世界最大級の文化施設複合体で、レオポルド美術館（エゴン・シーレのコレクション）とMUMOK（現代美術館）が主要施設です。中庭は無料で入れ、夏にはデザイン家具が並ぶ屋外ラウンジになります。" },
        { heading: "食事と飲み", body: "シュピッテルベルクのレストランは路地の狭さを活かしたテラス席が特徴で、夏の夕方は特にロマンティックな雰囲気です。オーストリア料理、地中海料理、ワインバーが混在しており、カジュアルからセミフォーマルまで選べます。ミュージアムクォーターの中庭にもカフェがあり、こちらはよりカジュアルです。" },
        { heading: "実用情報", body: "シュピッテルベルクは小さなエリアなので30分〜1時間で歩けますが、ミュージアムクォーターの美術館を含めると半日コースです。クリスマスマーケットは11月中旬〜12月23日頃まで開催。路地は冬でも雰囲気がありますが、防寒対策は必須です。eSIMがあれば美術館の企画展情報やレストランの予約をその場でできます。" },
      ],
      [
        { q: "シュピッテルベルクだけなら何分？", a: "路地を歩くだけなら30分〜1時間。レストランで食事をすると2時間以上になります。" },
        { q: "ミュージアムクォーターのおすすめは？", a: "エゴン・シーレが好きならレオポルド美術館。現代アートならMUMOK。中庭だけでも雰囲気を楽しめます。" },
        { q: "クリスマスマーケットはいつ？", a: "11月中旬〜12月23日頃。平日夕方が比較的空いています。週末は混雑します。" },
      ],
    ),
    en: en(AT_EN_CTA,
      "Vienna Spittelberg Walk: Biedermeier Lanes and the MuseumsQuartier",
      "Explore the pedestrian lanes of Spittelberg with their 18th-century Biedermeier facades and alfresco restaurants, then step into the MuseumsQuartier's world-class galleries.",
      VIENNA_SPITTELBERG_IMAGES[0],
      VIENNA_SPITTELBERG_IMAGES,
      VIENNA_X,
      [
        { heading: "Why this walk works", body: "Spittelberg is a small pocket of Vienna's 7th district where 18th-century Biedermeier buildings line pedestrian-only lanes. It sits directly behind the MuseumsQuartier, one of the world's largest cultural complexes, creating a walk that pairs intimate architecture with major museums. In summer, restaurants fill the narrow lanes with outdoor tables. In winter, one of Vienna's most atmospheric Christmas markets takes over. The human scale of Spittelberg contrasts beautifully with the grand Ringstrasse buildings nearby." },
        { heading: "How to get there", body: "Volkstheater station (U2, U3) is the closest stop. From the MuseumsQuartier's main entrance, walk around to the back to enter Spittelberg's lanes. Burggasse-Stadthalle station on the U6 also provides access." },
        { heading: "Key stops", body: "Spittelberggasse is the central lane, with a continuous stretch of Biedermeier facades, small galleries, craft shops, and wine bars. The MuseumsQuartier houses the Leopold Museum (home to the world's largest Egon Schiele collection) and MUMOK (Museum of Modern Art) as its headline institutions. The MuseumsQuartier courtyard is free to enter and becomes an outdoor lounge with designer furniture in summer." },
        { heading: "Food and drink", body: "Spittelberg's restaurants use the narrow lanes for terrace seating, creating a romantic atmosphere on summer evenings. Austrian, Mediterranean, and wine-bar options mix along the streets, ranging from casual to semi-formal. The MuseumsQuartier courtyard has more casual cafe options." },
        { heading: "Practical tips", body: "Spittelberg itself is small enough to walk in 30 minutes to an hour, but adding a MuseumsQuartier museum extends the visit to half a day. The Christmas market runs from mid-November to around 23 December. The lanes are atmospheric in winter but dress warmly. An eSIM lets you check museum exhibition schedules and make restaurant reservations on the spot." },
      ],
      [
        { q: "How long does Spittelberg take on its own?", a: "Walking the lanes takes 30 minutes to an hour. A restaurant meal adds two hours or more." },
        { q: "Which MuseumsQuartier museum is best?", a: "The Leopold Museum for Egon Schiele fans, MUMOK for modern and contemporary art. The courtyard alone is worth a visit for its atmosphere." },
        { q: "When is the Christmas market?", a: "Mid-November to around 23 December. Weekday evenings are quieter; weekends draw large crowds." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. Vienna — Leopoldstadt Walk
  // ═══════════════════════════════════════════════════════════════
  "vienna-leopoldstadt-walk": {
    ja: ja(AT_JA_CTA,
      "ウィーン レオポルドシュタット散策：プラーター公園とドナウ運河の散歩",
      "大観覧車のプラーターからカルメリーターマルクト、ドナウ運河のストリートアートまで歩くレオポルドシュタットの街歩きガイドです。",
      VIENNA_LEOPOLDSTADT_IMAGES[0],
      VIENNA_LEOPOLDSTADT_IMAGES,
      VIENNA_X,
      [
        { heading: "このルートの特徴", body: "レオポルドシュタットはウィーン2区で、ドナウ運河とドナウ川に挟まれた島のような地区です。プラーターのリーゼンラート（大観覧車）はウィーンのアイコンですが、遊園地の奥に広がるハウプトアレーは4.4kmの栗並木が続く静かな散歩道です。カルメリーターマルクトは地元民向けの市場で、中東料理やオーガニック食材が揃います。ドナウ運河沿いにはストリートアートと夏季限定のポップアップバーが並びます。" },
        { heading: "アクセスと起点", body: "U-Bahn U1/U2線Praterstern駅がプラーターの入口です。カルメリーターマルクトへはU2線Taborstrasse駅が最寄り。ドナウ運河沿いはU1/U4線Schwedenplatz駅からアクセスできます。3つのエリアを結んで歩くと半日コースになります。" },
        { heading: "主要スポット", body: "リーゼンラート（大観覧車）は1897年製で、ゴンドラからウィーン市街を一望できます。プラーターのハウプトアレーは自転車やジョギングにも人気の並木道で、遊園地とは異なる落ち着いた雰囲気です。カルメリーターマルクトは火〜土曜に開催され、中東系のファラフェルやフムスのスタンドが人気。アウガルテンはバロック式庭園で、ウィーン少年合唱団の本拠地です。ドナウ運河のストリートアートは年々拡大し、夏にはウィーンのビーチバー文化が楽しめます。" },
        { heading: "レオポルドシュタットの多文化", body: "レオポルドシュタットは歴史的にウィーンのユダヤ人コミュニティの中心地でした。現在は多文化が共存する地区で、カルメリーターマルクト周辺にはトルコ、中東、バルカン、オーストリア料理の店が混在しています。この多様性がエリアの魅力となっており、ウィーン中心部のクラシカルな雰囲気とは一味違った体験ができます。" },
        { heading: "実用情報", body: "プラーター遊園地は入場無料（各アトラクションは有料）。リーゼンラートは通年営業。カルメリーターマルクトは月曜休み。ドナウ運河のポップアップバーは5月〜9月頃。ハウプトアレーを全部歩くと往復9km近くになるので、途中で引き返すか自転車を借りるのが現実的です。eSIMがあれば遊園地のアトラクション情報やバーの営業状況をリアルタイムで確認できます。" },
      ],
      [
        { q: "プラーターは遊園地だけ？", a: "遊園地は入口付近のみ。奥に広がる6平方kmの緑地は公園で、4.4kmの栗並木道は散歩やサイクリングに最適です。" },
        { q: "カルメリーターマルクトのおすすめは？", a: "中東系のファラフェルやフムスのスタンドが人気です。オーストリアのケーゼシュパッツレ（チーズパスタ）を出す店もあります。" },
        { q: "ドナウ運河で泳げる？", a: "運河での遊泳は推奨されていません。泳ぎたい場合はドナウ川のコパカバーナ・ビーチやアルテ・ドナウがおすすめです。" },
      ],
    ),
    en: en(AT_EN_CTA,
      "Vienna Leopoldstadt Walk: Prater Park and the Danube Canal",
      "Ride the Riesenrad Ferris wheel, stroll the chestnut-lined Hauptallee, browse Karmelitermarkt, and follow the Danube Canal's street art to summer pop-up bars.",
      VIENNA_LEOPOLDSTADT_IMAGES[0],
      VIENNA_LEOPOLDSTADT_IMAGES,
      VIENNA_X,
      [
        { heading: "Why this walk works", body: "Leopoldstadt is Vienna's 2nd district, sitting on an island between the Danube Canal and the Danube proper. The Prater's Riesenrad Ferris wheel is a city icon, but beyond the amusement park entrance lies the Hauptallee — a 4.4-kilometre chestnut-lined avenue that offers a quiet escape. Karmelitermarkt is a neighbourhood market with Middle Eastern and organic food stalls. Along the Danube Canal, street art covers the embankment walls and summer pop-up bars line the waterfront. Together these three areas create a walk that shows a side of Vienna most visitors miss." },
        { heading: "How to get there", body: "Praterstern station (U1, U2) is the Prater entrance. Taborstrasse station (U2) is closest to Karmelitermarkt. Schwedenplatz station (U1, U4) provides access to the Danube Canal. Connecting all three on foot makes a comfortable half-day route." },
        { heading: "Key stops", body: "The Riesenrad has been turning since 1897 and offers panoramic views from its enclosed gondolas. The Prater's Hauptallee is popular with cyclists and runners, offering a peaceful contrast to the amusement park. Karmelitermarkt operates Tuesday to Saturday, with falafel and hummus stalls drawing the biggest queues. The Augarten is a baroque garden that serves as the home base of the Vienna Boys' Choir. The Danube Canal's street art grows yearly, and summer brings Vienna's distinctive beach-bar culture to the waterfront." },
        { heading: "Multicultural Leopoldstadt", body: "Leopoldstadt was historically the centre of Vienna's Jewish community. Today it is a multicultural district where Turkish, Middle Eastern, Balkan, and Austrian food coexist around Karmelitermarkt. This diversity gives the area a character distinctly different from the classical city centre and makes it one of Vienna's most rewarding neighbourhoods for eating." },
        { heading: "Practical tips", body: "Prater amusement park entry is free; individual rides are paid. The Riesenrad operates year-round. Karmelitermarkt is closed on Mondays. Danube Canal pop-up bars run roughly May to September. Walking the full Hauptallee and back covers nearly 9 km — turning back partway or renting a bicycle is practical. An eSIM lets you check ride information and bar opening times in real time." },
      ],
      [
        { q: "Is the Prater just an amusement park?", a: "The amusement park is a small area near the entrance. Behind it stretches 6 square kilometres of parkland, including the 4.4-kilometre Hauptallee avenue." },
        { q: "What should I eat at Karmelitermarkt?", a: "The Middle Eastern stalls serving falafel and hummus are the most popular. Austrian Kasespatzle (cheese pasta) is available at several stands too." },
        { q: "Can I swim in the Danube Canal?", a: "Swimming in the canal is not recommended. For swimming, head to the Copacabana beach or Alte Donau on the main Danube." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 15. Copenhagen — Norrebro Walk
  // ═══════════════════════════════════════════════════════════════
  "copenhagen-norrebro-walk": {
    ja: ja(DK_JA_CTA,
      "コペンハーゲン ノアブロ散策：多文化カフェとスーパーキーレン",
      "コペンハーゲンで最も多文化な地区ノアブロを歩く。スーパーキーレン公園、イェーガスボーガデのアートストリート、アシステンス墓地を巡る散策ルートです。",
      COPENHAGEN_NORREBRO_IMAGES[0],
      COPENHAGEN_NORREBRO_IMAGES,
      COPENHAGEN_X,
      [
        { heading: "このルートの特徴", body: "ノアブロはコペンハーゲンで最も多文化なエリアで、デンマーク人、中東系、アフリカ系、アジア系の住民が共存する活気ある地区です。メインストリートのノアブロガデには多国籍料理の店が並び、スーパーキーレンは50カ国以上からの寄贈品で構成されたユニークな都市公園です。イェーガスボーガデは陶芸工房やクラフトビールバーが集まるアートストリート。湖（レイクス）沿いの散歩は中心部との自然な境界を形成しています。" },
        { heading: "アクセスと起点", body: "地下鉄M3線Norrebros Runddel駅またはNorrebro駅が便利です。バス5A番もノアブロガデを通ります。中心部からレイクス（湖）を渡るとすぐにノアブロに入ります。徒歩でも中央駅から20分程度です。" },
        { heading: "主要スポット", body: "スーパーキーレンは2012年にオープンした都市公園で、赤・黒・緑の3ゾーンに分かれています。50カ国以上のベンチ、遊具、オブジェが設置され、多文化共生のコンセプトが形になった場所です。アシステンス墓地はアンデルセンとキルケゴールが眠る場所ですが、地元民にとっては日光浴やピクニックを楽しむ公園でもあります。イェーガスボーガデは陶芸、コーヒーの焙煎所、クラフトビールバーが200mほどの通りに凝縮されています。" },
        { heading: "食事とカフェ", body: "ノアブロの食は多国籍です。中東系のシャワルマ、ベトナムのフォー、エチオピア料理の店が並ぶ中に、北欧スタイルのカフェやベーカリーも点在します。イェーガスボーガデのカフェはサードウェーブ系で、北欧デザインの空間でコーヒーを楽しめます。レイクス沿いにもテラスカフェがあり、天気の良い日は混雑します。" },
        { heading: "実用情報", body: "デンマークはほぼ完全なキャッシュレス社会で、現金を受け付けない店も多いです。クレジットカードまたはモバイル決済が必須。ノアブロは治安が良いですが、夜遅い時間のノアブロガデ東端はやや注意が必要です。eSIMがあればモバイル決済の認証や、カフェの口コミ検索がスムーズです。" },
      ],
      [
        { q: "ノアブロの散策時間は？", a: "スーパーキーレン、イェーガスボーガデ、アシステンス墓地を回って2〜3時間です。食事を含めると半日。" },
        { q: "子連れに向いている？", a: "スーパーキーレンの遊具は子どもに大人気です。アシステンス墓地の広い芝生もピクニックに最適。" },
        { q: "中心部からの行き方は？", a: "ノアハウンから徒歩20分、レイクスを渡ればすぐです。地下鉄M3なら5分。" },
      ],
    ),
    en: en(DK_EN_CTA,
      "Copenhagen Norrebro Walk: Multicultural Streets and Superkilen Park",
      "Explore Norrebro, Copenhagen's most diverse neighbourhood. Walk through Superkilen's global park, browse artisan shops on Jaegersborggade, and visit Andersen's grave at Assistens Cemetery.",
      COPENHAGEN_NORREBRO_IMAGES[0],
      COPENHAGEN_NORREBRO_IMAGES,
      COPENHAGEN_X,
      [
        { heading: "Why this walk works", body: "Norrebro is Copenhagen's most multicultural district, where Danish, Middle Eastern, African, and Asian communities share the same streets. Norrebrogade, the main road, is lined with international restaurants, and Superkilen is a unique urban park assembled from objects donated by over 50 countries. Jaegersborggade packs ceramics studios, coffee roasters, and craft beer bars into a single short street. The Lakes form a natural boundary with the inner city and provide a scenic walking route." },
        { heading: "How to get there", body: "Norrebros Runddel or Norrebro stations on Metro Line M3 are the most convenient. Bus 5A runs along Norrebrogade. From the city centre, crossing the Lakes on foot takes about 20 minutes from Nyhavn." },
        { heading: "Key stops", body: "Superkilen opened in 2012 and is divided into red, black, and green zones, each filled with benches, play equipment, and objects from over 50 countries — a physical expression of multiculturalism. Assistens Cemetery is where Hans Christian Andersen and Kierkegaard are buried, but locals treat it as a park for sunbathing and picnics. Jaegersborggade concentrates ceramics workshops, speciality coffee, and craft beer into roughly 200 metres of independent shops." },
        { heading: "Food and drink", body: "Norrebro's food scene is thoroughly international. Shawarma, Vietnamese pho, and Ethiopian restaurants sit alongside Nordic-style cafes and bakeries. Jaegersborggade's cafes are third-wave, serving carefully sourced coffee in minimalist Scandinavian interiors. The Lakes also have terrace cafes that fill quickly on sunny days." },
        { heading: "Practical tips", body: "Denmark is nearly cashless — many shops and cafes do not accept cash at all. A credit card or mobile payment is essential. Norrebro is generally safe, though the eastern end of Norrebrogade warrants some caution late at night. An eSIM supports mobile payment authentication and makes cafe and restaurant searches seamless." },
      ],
      [
        { q: "How long does the Norrebro walk take?", a: "Two to three hours covers Superkilen, Jaegersborggade, and Assistens Cemetery. Add a meal and it stretches to half a day." },
        { q: "Is it good for children?", a: "Superkilen's play equipment is a hit with children, and Assistens Cemetery's lawns are ideal for a picnic." },
        { q: "How do I get there from the centre?", a: "A 20-minute walk from Nyhavn across the Lakes, or five minutes on Metro Line M3." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 16. Copenhagen — Christianshavn Walk
  // ═══════════════════════════════════════════════════════════════
  "copenhagen-christianshavn-walk": {
    ja: ja(DK_JA_CTA,
      "コペンハーゲン クリスチャンスハウン散策：運河とフリータウン・クリスチャニア",
      "アムステルダムをモデルにした運河の街クリスチャンスハウンを歩く。救世主教会の螺旋尖塔に登り、フリータウン・クリスチャニアを訪れる散策ルートです。",
      COPENHAGEN_CHRISTIANSHAVN_IMAGES[0],
      COPENHAGEN_CHRISTIANSHAVN_IMAGES,
      COPENHAGEN_X,
      [
        { heading: "このルートの特徴", body: "クリスチャンスハウンはコペンハーゲン中心部の対岸に位置する運河の街で、17世紀にアムステルダムをモデルに建設されました。カラフルなハウスボートが浮かぶ運河沿いの散歩は、ニューハウンに匹敵する美しさです。救世主教会の外部螺旋階段を登れば、コペンハーゲン全体を360度見渡せます。フリータウン・クリスチャニアは1971年に旧軍施設を占拠して生まれた自治コミューンで、独自の文化と規則を持つユニークな場所です。" },
        { heading: "アクセスと起点", body: "地下鉄M1/M2線Christianshavn駅が最寄りです。ニューハウンからインナーハーバー橋（Inderhavnsbroen）を歩いて渡るルートも景色が良いです。バス2A番もクリスチャンスハウンを通ります。" },
        { heading: "主要スポット", body: "救世主教会（Vor Frelsers Kirke）は黒と金の螺旋尖塔で有名で、外部の螺旋階段を400段登ると360度のパノラマが待っています。風の強い日は上部が閉鎖されることがあります。オーヴァーガーデン・オーヴェン・ヴァンデは運河沿いのメインストリートで、最も美しい建物が並びます。フリータウン・クリスチャニアは写真撮影が禁止されているエリアがあります（入口の看板を確認）。" },
        { heading: "クリスチャニアについて", body: "クリスチャニアは約1,000人が暮らす自治コミューンです。手作りの家、アート、コミュニティスペースがあり、独自のルールがあります。写真撮影が禁止されているエリアでは必ずルールを守ってください。ドラッグの売買に関するエリア（プッシャーストリート）はクリスチャニアが自ら認めていたものですが、2023年に閉鎖されました。訪問時はリスペクトを持って行動しましょう。" },
        { heading: "実用情報", body: "救世主教会の螺旋階段は大人65DKK程度。冬季は閉鎖されることがあります。クリスチャニアは入場無料ですが、ガイドツアー（有料）もあります。デンマークは完全キャッシュレスの店が多いのでカード必携。eSIMがあれば教会のチケットをオンラインで確認でき、運河沿いのレストランの予約もスムーズです。" },
      ],
      [
        { q: "救世主教会の螺旋階段は怖い？", a: "高所恐怖症の方には厳しいです。外部の階段は狭く、上に行くほど傾斜がきつくなります。途中で引き返すことは可能です。" },
        { q: "クリスチャニアは安全？", a: "日中は安全で、家族連れの住民もいます。写真撮影禁止エリアのルールを守り、住民のプライバシーを尊重してください。" },
        { q: "ニューハウンから歩いて行ける？", a: "インナーハーバー橋で10分ほどです。橋自体も新しいデザインで写真スポットになっています。" },
      ],
    ),
    en: en(DK_EN_CTA,
      "Copenhagen Christianshavn Walk: Canals and Freetown Christiania",
      "Stroll the Amsterdam-inspired canals of Christianshavn, climb the spiralling spire of Church of Our Saviour, and visit the self-governing commune of Freetown Christiania.",
      COPENHAGEN_CHRISTIANSHAVN_IMAGES[0],
      COPENHAGEN_CHRISTIANSHAVN_IMAGES,
      COPENHAGEN_X,
      [
        { heading: "Why this walk works", body: "Christianshavn sits across the harbour from central Copenhagen, built in the 17th century on an Amsterdam-inspired canal grid. Colourful houseboats line the waterways, and the canal-side streets rival Nyhavn for charm without the crowds. The Church of Our Saviour features an external spiral staircase that delivers a 360-degree panorama of the city from its gilded top. Freetown Christiania, a self-governing commune established in 1971 in former military barracks, adds a social and cultural dimension found nowhere else in Scandinavia." },
        { heading: "How to get there", body: "Christianshavn station on Metro Lines M1 and M2 is the closest stop. Walking from Nyhavn across the Inderhavnsbroen pedestrian bridge is a scenic alternative that takes about 10 minutes. Bus 2A also serves the area." },
        { heading: "Key stops", body: "The Church of Our Saviour (Vor Frelsers Kirke) is recognisable by its black-and-gold spiral spire. Climbing the 400 external steps rewards you with a full panorama of Copenhagen — the spire may close on very windy days. Overgaden Oven Vandet is the prettiest canal-side street. Freetown Christiania has areas where photography is prohibited — check signs at the entrance." },
        { heading: "About Christiania", body: "Christiania is home to roughly 1,000 residents living in a self-governing commune. It features handmade houses, community art, and its own set of rules. Photography restrictions apply in certain areas and must be respected. Pusher Street, previously known for open drug sales, was closed in 2023. Visit with respect for the community and its guidelines." },
        { heading: "Practical tips", body: "The church spire climb costs around 65 DKK for adults. Winter closures are possible. Christiania is free to enter; paid guided tours are also available. Denmark is heavily cashless — carry a card. An eSIM lets you check church ticket availability online and book canal-side restaurant tables." },
      ],
      [
        { q: "Is the church spire climb scary?", a: "It can be challenging for those with a fear of heights. The external staircase narrows toward the top and the slope increases. You can turn back at any point." },
        { q: "Is Christiania safe?", a: "During the day it is safe, and families with children live there. Respect the no-photography zones and residents' privacy." },
        { q: "Can I walk from Nyhavn?", a: "Yes, about 10 minutes across the Inderhavnsbroen bridge, which is itself a photo-worthy modern design." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 17. Copenhagen — Vesterbro Walk
  // ═══════════════════════════════════════════════════════════════
  "copenhagen-vesterbro-walk": {
    ja: ja(DK_JA_CTA,
      "コペンハーゲン ヴェスターブロ散策：ミートパッキング地区とカフェ文化",
      "かつての精肉地区がレストラン街に変貌したクービエンと、トレンディなカフェが並ぶイステッドガデを歩くヴェスターブロの街歩きガイドです。",
      COPENHAGEN_VESTERBRO_IMAGES[0],
      COPENHAGEN_VESTERBRO_IMAGES,
      COPENHAGEN_X,
      [
        { heading: "このルートの特徴", body: "ヴェスターブロはコペンハーゲン中央駅のすぐ西にある地区で、かつての赤線地区から近年コペンハーゲンで最もトレンディなエリアに変貌しました。クービエン（ミートパッキング地区）は白い精肉工場がレストラン、ギャラリー、ナイトクラブに生まれ変わった場所です。イステッドガデはかつての歓楽街が多国籍レストランとカフェの通りになりました。カールスベア・ビエン（旧カールスベア醸造所）は近代建築が並ぶ再開発エリアです。" },
        { heading: "アクセスと起点", body: "コペンハーゲン中央駅（Kobenhavn H）から徒歩5分でヴェスターブロに入れます。地下鉄M3線Enghave Plads駅もヴェスターブロの中心にあります。S-tog Carlsberg駅はカールスベア・ビエンの最寄りです。" },
        { heading: "主要スポット", body: "クービエン（Kodbyen）は白壁の旧精肉工場群がそのまま残り、内部がレストランやバーに改装されています。ミシュラン掲載店からカジュアルな居酒屋まで揃っています。ハルムトーヴェト広場は元干し草市場で、現在は屋外ダイニングスポットです。カールスベア・ビエンはカールスベアビールの旧醸造所跡地で、近代建築と歴史的な醸造施設が共存する再開発地区です。ゼナーマルケン公園は隣接するフレデリクスベア庭園と繋がっており、都市の緑地として最適です。" },
        { heading: "食事とナイトライフ", body: "ヴェスターブロの飲食シーンは多彩です。クービエンにはニューノルディック系のレストランが集まり、週末は予約推奨。イステッドガデにはタイ、メキシコ、イタリアの店が混在し、カジュアルな食事に最適です。ナイトライフはクービエン周辺のバーやクラブが中心で、木〜土の夜が最も賑わいます。" },
        { heading: "実用情報", body: "ヴェスターブロは中央駅から近いので、到着直後や出発前の半日に最適です。デンマークは完全キャッシュレスの店が多く、カード必携。クービエンのレストランは週末ランチ・ディナーともに混むので予約を。eSIMがあればレストラン予約アプリへのアクセスや、カールスベア・ビエンの最新イベント情報の確認がスムーズです。" },
      ],
      [
        { q: "ヴェスターブロの散策時間は？", a: "クービエンとイステッドガデで2〜3時間。カールスベア・ビエンを含めると半日です。" },
        { q: "子連れで行ける？", a: "日中のクービエンやカールスベア・ビエンは問題ありません。夜のクービエンはバーエリアなので子連れには不向きです。" },
        { q: "中央駅から近い？", a: "徒歩5分です。デンマーク到着後すぐに散策を始められます。" },
      ],
    ),
    en: en(DK_EN_CTA,
      "Copenhagen Vesterbro Walk: Meatpacking District and Trendy Cafes",
      "Walk through Kodbyen, Copenhagen's meatpacking district turned restaurant quarter, then explore Istedgade's multicultural cafes and the redeveloped Carlsberg Byen brewery district.",
      COPENHAGEN_VESTERBRO_IMAGES[0],
      COPENHAGEN_VESTERBRO_IMAGES,
      COPENHAGEN_X,
      [
        { heading: "Why this walk works", body: "Vesterbro sits immediately west of Copenhagen Central Station and has transformed from a red-light district into the city's trendiest neighbourhood. Kodbyen (the Meatpacking District) is a cluster of white-walled former slaughterhouses now housing restaurants, galleries, and nightclubs. Istedgade, once a red-light street, has become a multicultural dining and cafe strip. Carlsberg Byen, the former Carlsberg brewery site, adds modern architecture to the mix. The proximity to the station makes Vesterbro ideal for a first or last half-day in Copenhagen." },
        { heading: "How to get there", body: "Copenhagen Central Station (Kobenhavn H) is a five-minute walk from Vesterbro. Enghave Plads station on Metro Line M3 is in the heart of the district. S-tog Carlsberg station serves Carlsberg Byen." },
        { heading: "Key stops", body: "Kodbyen's white-tiled former meatpacking halls now house everything from Michelin-listed restaurants to casual wine bars. Halmtorvet square, a former hay market, is now an outdoor dining destination. Carlsberg Byen preserves historic brewing structures alongside contemporary architecture in a major redevelopment. Sondermarken park connects to Frederiksberg Gardens, providing green space on the district's edge." },
        { heading: "Food and nightlife", body: "Vesterbro's dining scene is diverse. Kodbyen concentrates New Nordic restaurants that often require weekend reservations. Istedgade mixes Thai, Mexican, and Italian options for casual meals. Nightlife centres on Kodbyen's bars and clubs, busiest Thursday through Saturday." },
        { heading: "Practical tips", body: "Vesterbro's proximity to the central station makes it ideal for arrival or departure days. Denmark is heavily cashless — carry a card. Kodbyen restaurants are busy at weekend lunch and dinner; book ahead. An eSIM lets you access restaurant booking apps and check Carlsberg Byen event listings." },
      ],
      [
        { q: "How long does the Vesterbro walk take?", a: "Two to three hours for Kodbyen and Istedgade. Adding Carlsberg Byen extends it to half a day." },
        { q: "Is it suitable for children?", a: "Kodbyen and Carlsberg Byen are fine during the day. Kodbyen at night is a bar and club area, less suited to families." },
        { q: "How far is it from the central station?", a: "A five-minute walk. You can start exploring immediately on arrival in Denmark." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 18. Edinburgh — Old Town Closes Walk
  // ═══════════════════════════════════════════════════════════════
  "edinburgh-old-town-closes-walk": {
    ja: ja(UK_JA_CTA,
      "エディンバラ オールドタウンの路地（クローズ）散策",
      "ロイヤルマイルから枝分かれする中世の路地「クローズ」を探検する。グラスマーケット、ヴィクトリア・ストリート、グレイフライアーズ教会墓地を巡るエディンバラの裏道散策です。",
      EDINBURGH_OLD_TOWN_IMAGES[0],
      EDINBURGH_OLD_TOWN_IMAGES,
      EDINBURGH_X,
      [
        { heading: "このルートの特徴", body: "エディンバラのオールドタウンはロイヤルマイルを背骨として、左右に無数の「クローズ」（narrow close）と呼ばれる路地が枝分かれしています。中世から変わらない石造りの路地は暗く狭いですが、抜けると思わぬ景色が広がることもあります。ハリーポッターのダイアゴン横丁のモデルとも言われるヴィクトリア・ストリート、グラスマーケットの古い酒場、ゴースト伝説の残るグレイフライアーズ教会墓地など、歴史と物語が凝縮されたエリアです。" },
        { heading: "アクセスと起点", body: "エディンバラ・ウェイヴァリー駅から徒歩5分でロイヤルマイルに出ます。城側（西端）から始めてホリルードハウス宮殿（東端）方面に下っていくのが一般的ですが、クローズ探索ならロイヤルマイルの中間地点（セント・ジャイルズ大聖堂付近）からが便利です。" },
        { heading: "主要スポット", body: "ヴィクトリア・ストリートはカーブした通りにカラフルな店が並び、上から見下ろすとグラスマーケットに繋がっています。アドヴォケイツ・クローズは観光客が見落としがちな静かな路地で、城の景色が見える隠れスポットです。グラスマーケットはかつての処刑場で、現在はパブとレストランが並ぶ広場です。グレイフライアーズ教会墓地は忠犬ボビーの物語と多数のゴースト伝説で知られ、ハリーポッターの登場人物の名前の元になった墓石もあります。" },
        { heading: "ゴーストツアーと夜の散策", body: "エディンバラはヨーロッパで最もゴーストツアーが盛んな街です。夜のオールドタウンは昼間とは全く異なる雰囲気で、地下都市（ヴォールト）のツアーも人気です。メアリーキングス・クローズは地下に埋もれた17世紀の通りで、ガイドツアーでのみ見学可能です。ゴーストツアーは通常19〜21時に出発し、事前予約が必要です。" },
        { heading: "実用情報", body: "エディンバラの石畳は滑りやすく、特に雨の日は注意が必要です。クローズは暗い場所もあるので、スマートフォンのライトが役立ちます。8月のフェスティバル期間中は街全体が劇場になり、ロイヤルマイルはパフォーマーで溢れます。宿泊費も高騰するので早めの予約を。eSIMがあればクローズの歴史情報を検索したり、ゴーストツアーを予約したりできます。" },
      ],
      [
        { q: "クローズ散策の所要時間は？", a: "ロイヤルマイルの主要なクローズを歩くなら2〜3時間。ゴーストツアーを含めると半日コースです。" },
        { q: "ゴーストツアーは怖い？", a: "ツアーによって怖さのレベルが異なります。ファミリー向けの歴史ツアーもありますので、予約時に確認してください。" },
        { q: "8月のフェスティバル中でも散策できる？", a: "できますが、ロイヤルマイルは非常に混雑します。クローズに入ると混雑から逃れられるのが利点です。" },
        { q: "グレイフライアーズ墓地は無料？", a: "入場無料です。開門時間は通常7時〜日没です。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "Edinburgh Old Town Closes Walk: Hidden Alleys off the Royal Mile",
      "Duck into the medieval closes branching off the Royal Mile and discover Grassmarket pubs, the colourful curve of Victoria Street, and the ghost stories of Greyfriars Kirkyard.",
      EDINBURGH_OLD_TOWN_IMAGES[0],
      EDINBURGH_OLD_TOWN_IMAGES,
      EDINBURGH_X,
      [
        { heading: "Why this walk works", body: "Edinburgh's Old Town uses the Royal Mile as its spine, with dozens of narrow closes — medieval alleyways — branching off on both sides. These stone-walled passages are dark and narrow, but many open onto unexpected views or hidden courtyards. Victoria Street's curving, colourful shopfronts are said to have inspired Diagon Alley in Harry Potter. The Grassmarket below the castle is one of Edinburgh's oldest gathering places, and Greyfriars Kirkyard is layered with ghost stories and the graves that gave their names to Harry Potter characters. The walk compresses centuries of Scottish history into a few hundred metres." },
        { heading: "How to get there", body: "Edinburgh Waverley station is a five-minute walk from the Royal Mile. The standard route runs from the castle (west) downhill toward the Palace of Holyroodhouse (east), but for close exploration, starting near St Giles' Cathedral in the middle is most efficient." },
        { heading: "Key stops", body: "Victoria Street curves downhill in a sweep of colourful shopfronts, connecting the Royal Mile to the Grassmarket. Advocates Close is a quieter passage with a hidden castle viewpoint. The Grassmarket, once a public execution site, is now a square ringed by pubs and restaurants. Greyfriars Kirkyard is famous for the story of Greyfriars Bobby and for tombstones that share names with Harry Potter characters." },
        { heading: "Ghost tours and evening walks", body: "Edinburgh runs more ghost tours than almost any city in Europe. The Old Town after dark is dramatically different from daytime, and underground vault tours are popular. Mary King's Close is a 17th-century street buried beneath the Royal Mile, accessible only by guided tour. Ghost tours typically depart between 19:00 and 21:00 and should be booked in advance." },
        { heading: "Practical tips", body: "Edinburgh's cobblestones are slippery, especially in rain. Some closes are dark — a smartphone torch is useful. During the August festivals the entire city becomes a stage, and the Royal Mile fills with performers. Accommodation prices spike, so book early. An eSIM lets you look up close histories, book ghost tours, and navigate without relying on cafe Wi-Fi." },
      ],
      [
        { q: "How long does the closes walk take?", a: "Two to three hours for the main Royal Mile closes. Adding a ghost tour extends the visit to half a day." },
        { q: "Are ghost tours frightening?", a: "Scare levels vary by tour. Family-friendly historical tours are available — check the description when booking." },
        { q: "Can I walk during the August festivals?", a: "Yes, but the Royal Mile is extremely crowded. Ducking into the closes is actually an advantage, as they offer an escape from the crowds." },
        { q: "Is Greyfriars Kirkyard free?", a: "Entry is free. The gates are typically open from 07:00 until dusk." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 19. Edinburgh — Stockbridge Walk
  // ═══════════════════════════════════════════════════════════════
  "edinburgh-stockbridge-walk": {
    ja: ja(UK_JA_CTA,
      "エディンバラ ストックブリッジ散策：川沿いの散歩と日曜マーケット",
      "ウォーター・オブ・リース川沿いに歩き、ストックブリッジの村のような雰囲気と日曜マーケット、王立植物園を巡る散策ルートです。",
      EDINBURGH_STOCKBRIDGE_IMAGES[0],
      EDINBURGH_STOCKBRIDGE_IMAGES,
      EDINBURGH_X,
      [
        { heading: "このルートの特徴", body: "ストックブリッジはエディンバラ中心部から徒歩15分でありながら、独立した村のような雰囲気を持つエリアです。ウォーター・オブ・リース川が地区を流れ、川沿いの遊歩道はペントランド丘陵からリース港まで続く長距離ウォーキングルートの一部です。ストックブリッジ区間は緑が濃く、水辺の静けさが都市であることを忘れさせます。日曜にはファーマーズマーケットが開かれ、地元のベーカリーやチーズ、ストリートフードが並びます。" },
        { heading: "アクセスと起点", body: "プリンシズ・ストリートから北に徒歩15分です。バス24番、29番、42番がストックブリッジを通ります。ニュータウンのジョージ・ストリート付近から坂を下ると自然にストックブリッジに入ります。" },
        { heading: "主要スポット", body: "ストックブリッジ日曜マーケットは毎週日曜10時〜17時に開催され、地元の食材やクラフト品が並びます。ウォーター・オブ・リース遊歩道はストックブリッジから両方向に歩け、セント・バーナーズ・ウェルは1789年に建てられたローマ風の小さな神殿です。王立植物園は徒歩10分の距離にあり、庭園への入場は無料です（温室は有料）。インヴェリース・テラスの独立系ショップやカフェも散策の楽しみです。" },
        { heading: "川沿いの散歩", body: "ウォーター・オブ・リース遊歩道のストックブリッジ区間は約2kmで、上流のディーン・ヴィレッジ方面に歩くと、さらに静かな渓谷のような景観が楽しめます。ディーン・ヴィレッジは19世紀の水車小屋が残る美しいエリアで、ストックブリッジから片道20分ほどです。下流方面に歩けばリース港（別記事）に繋がります。" },
        { heading: "実用情報", body: "日曜マーケットは雨天でも開催しますが、屋根がないので雨具が必要です。王立植物園は10時開園、季節により閉園時間が変わります（夏は18時、冬は16時）。ストックブリッジのカフェはイギリスの中でもレベルが高く、ブランチの人気店は11時頃に行列ができます。eSIMがあればマーケットの出店情報やカフェの混雑状況をリアルタイムで確認できます。" },
      ],
      [
        { q: "ストックブリッジの散策時間は？", a: "マーケットと川沿いの散歩で2〜3時間。植物園を含めると半日です。" },
        { q: "日曜以外でも楽しめる？", a: "カフェ、川沿いの散歩、植物園は毎日楽しめます。マーケットだけが日曜限定です。" },
        { q: "ディーン・ヴィレッジも行ける？", a: "ストックブリッジから上流方向に徒歩20分です。非常に美しいエリアなのでセットで訪問をおすすめします。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "Edinburgh Stockbridge Walk: Riverside Path and Sunday Market",
      "Follow the Water of Leith through Stockbridge village, browse the Sunday farmers market, and walk to the Royal Botanic Garden. A green escape 15 minutes from Princes Street.",
      EDINBURGH_STOCKBRIDGE_IMAGES[0],
      EDINBURGH_STOCKBRIDGE_IMAGES,
      EDINBURGH_X,
      [
        { heading: "Why this walk works", body: "Stockbridge is a 15-minute walk from Edinburgh's centre yet feels like a separate village. The Water of Leith flows through the neighbourhood, and its riverside walkway forms part of a long-distance path from the Pentland Hills to the port of Leith. The Stockbridge section is thickly green and the sound of water replaces traffic. On Sundays a farmers market fills the main street with local bakers, cheesemakers, and street food vendors. The Royal Botanic Garden is a short walk north." },
        { heading: "How to get there", body: "Walk north from Princes Street for about 15 minutes. Buses 24, 29, and 42 serve Stockbridge. From the New Town, descending from George Street leads naturally into the village." },
        { heading: "Key stops", body: "The Stockbridge Sunday Market runs every Sunday from 10:00 to 17:00 with local produce and craft stalls. The Water of Leith walkway extends in both directions from Stockbridge. St Bernard's Well is a Roman-style temple over a natural spring, built in 1789. The Royal Botanic Garden is a 10-minute walk away — grounds entry is free, glasshouses are paid. Inverleith Terrace's independent shops and cafes add to the village feel." },
        { heading: "Riverside walking", body: "The Water of Leith walkway through Stockbridge covers about 2 km. Walking upstream toward Dean Village leads to a quiet, almost rural gorge. Dean Village preserves 19th-century mill buildings and is roughly 20 minutes from Stockbridge on foot. Walking downstream leads toward Leith and the port." },
        { heading: "Practical tips", body: "The Sunday market runs rain or shine but is open-air, so wet-weather gear is advisable. The Royal Botanic Garden opens at 10:00, with closing times varying by season — 18:00 in summer, 16:00 in winter. Stockbridge's cafes are among Edinburgh's best, with popular brunch spots queuing by 11:00. An eSIM lets you check market vendor lists and cafe availability in real time." },
      ],
      [
        { q: "How long does the Stockbridge walk take?", a: "Two to three hours for the market and riverside path. Adding the Botanic Garden extends it to half a day." },
        { q: "Is it worth visiting on non-Sundays?", a: "Cafes, the riverside walk, and the Botanic Garden are available every day. Only the market is Sunday-specific." },
        { q: "Can I walk to Dean Village?", a: "Yes, about 20 minutes upstream along the Water of Leith. It is a beautiful area and well worth combining with Stockbridge." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 20. Edinburgh — Leith Walk
  // ═══════════════════════════════════════════════════════════════
  "edinburgh-leith-walk": {
    ja: ja(UK_JA_CTA,
      "エディンバラ リース散策：港町のレストラン街と王室ヨット",
      "エディンバラの港町リースを歩く。ショア地区のウォーターフロントレストラン、ロイヤルヨット・ブリタニア号、コマーシャルストリートのワインバーを巡る散策ルートです。",
      EDINBURGH_LEITH_IMAGES[0],
      EDINBURGH_LEITH_IMAGES,
      EDINBURGH_X,
      [
        { heading: "このルートの特徴", body: "リースはエディンバラ北部の港町で、かつては独立した自治体でした。近年は倉庫をレストランやバーに改装したウォーターフロントの再開発が進み、エディンバラで最も食のレベルが高いエリアのひとつになっています。ショア地区は港に面したレストランが並び、ミシュラン星付き店もあります。ロイヤルヨット・ブリタニア号はエリザベス2世が使用した王室ヨットで、内部を見学できます。" },
        { heading: "アクセスと起点", body: "リース・ウォークはエディンバラ中心部からリースまで一直線に続く約3kmの大通りです。バス11番、22番、35番がリース・ウォークを通り、中心部から20分ほど。トラムのリース延伸線が開通しており、エディンバラ空港からリースまで直通で行けます。" },
        { heading: "主要スポット", body: "ショア（The Shore）はリースの歴史的な港エリアで、17〜18世紀の倉庫を改装したレストランが水辺に並びます。ランチからディナーまで、シーフードを中心に多彩な選択肢があります。ロイヤルヨット・ブリタニア号はオーシャン・ターミナルに係留されており、船内のステートルームや乗組員の居住区を見学できます。コマーシャル・ストリートは独立系ワインバーやデリが集まるリースの中心街です。" },
        { heading: "リースの食文化", body: "リースはエディンバラの食のホットスポットです。ショア周辺にはミシュラン星付き・ビブグルマンの店が集中し、予算を問わず質の高い食事ができます。シーフードが特に強く、ムール貝やフィッシュ＆チップスは定番。ワインバーの自然派ワインシーンも成長しています。ファーマーズマーケットは週末に開催されることがあります。" },
        { heading: "実用情報", body: "ロイヤルヨット・ブリタニア号は通年営業で、チケットはオンライン予約推奨。ショアのレストランは週末ディナーの予約が必要です。リース・ウォークは再開発工事が進行中で一部迂回が必要な場合があります。eSIMがあればレストランの予約やブリタニア号のチケット購入がスムーズです。" },
      ],
      [
        { q: "リースの散策時間は？", a: "ショア地区とコマーシャルストリートで2〜3時間。ブリタニア号見学を含めると半日です。" },
        { q: "リースまで歩けるの？", a: "リース・ウォーク経由で中心部から約3km、40分の直線歩きです。バスやトラムなら20分。" },
        { q: "ブリタニア号は予約必須？", a: "事前予約が推奨ですが、当日空きがあれば入れます。ピーク時は売り切れることがあります。" },
        { q: "リースの治安は？", a: "ショア地区とコマーシャルストリートは安全です。リース・ウォークの一部はやや荒れたエリアを通りますが、日中は問題ありません。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "Edinburgh Leith Walk: The Port Town Restaurant Quarter and Royal Yacht",
      "Explore Leith's waterfront restaurants at The Shore, tour the Royal Yacht Britannia, and browse the wine bars of Commercial Street in Edinburgh's port neighbourhood.",
      EDINBURGH_LEITH_IMAGES[0],
      EDINBURGH_LEITH_IMAGES,
      EDINBURGH_X,
      [
        { heading: "Why this walk works", body: "Leith is Edinburgh's port district, historically a separate town, now reborn as the city's strongest dining destination. Converted warehouses along The Shore house everything from Michelin-starred restaurants to casual seafood counters. The Royal Yacht Britannia, moored at Ocean Terminal, offers a walk through the private quarters of the late Queen Elizabeth II. Commercial Street brings independent wine bars and delis to the heart of old Leith. The contrast between maritime heritage and contemporary food culture makes the walk distinctive." },
        { heading: "How to get there", body: "Leith Walk is a 3-kilometre straight road from Edinburgh's centre to the port. Buses 11, 22, and 35 run the route in about 20 minutes. The tram extension to Leith is now operational, providing a direct link from Edinburgh Airport. Walking takes roughly 40 minutes." },
        { heading: "Key stops", body: "The Shore is Leith's historic harbour area, where 17th- and 18th-century warehouses have been converted into waterfront restaurants. Seafood dominates, with options from casual to fine dining. The Royal Yacht Britannia is moored at Ocean Terminal and open for tours of the staterooms and crew quarters. Commercial Street is the high street of old Leith, with independent wine bars and delicatessens." },
        { heading: "Leith's food scene", body: "Leith has become Edinburgh's culinary hotspot. Michelin-starred and Bib Gourmand restaurants cluster around The Shore, and the quality is high across all price ranges. Seafood is the strength — mussels and fish and chips are standards. The natural wine bar scene is growing rapidly. Weekend farmers markets operate intermittently." },
        { heading: "Practical tips", body: "The Royal Yacht Britannia is open year-round; online booking is recommended. Shore restaurants require weekend dinner reservations. Parts of Leith Walk are undergoing redevelopment, so some diversions may be in place. An eSIM makes restaurant booking and Britannia ticket purchase straightforward." },
      ],
      [
        { q: "How long does the Leith walk take?", a: "Two to three hours for The Shore and Commercial Street. Adding the Britannia extends it to half a day." },
        { q: "Can I walk from the city centre?", a: "Yes, Leith Walk is roughly 3 km, a 40-minute straight walk. Buses and the tram take about 20 minutes." },
        { q: "Do I need to book the Britannia?", a: "Advance booking is recommended. Same-day tickets are sometimes available, but peak periods sell out." },
        { q: "Is Leith safe?", a: "The Shore and Commercial Street are safe and well-lit. Some sections of Leith Walk are rougher but are fine during the day." },
      ],
    ),
  },

};

export const EUROPE_2_GUIDE_SLUGS = Object.keys(EUROPE_2_GUIDE_CONTENT);
