import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Europe city-walk guides targeted at Japanese and international travelers
// who want practical, specific walking routes in major European cities.
// Each article is written in both Japanese and English, uses real landmark
// and neighbourhood names, and returns structured content for the generic
// template renderer.

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

const FR_JA_CTA = {
  ctaTitle: "フランス旅行の通信をもっと楽に",
  ctaButton: "フランスのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const FR_EN_CTA = {
  ctaTitle: "Stay connected in France",
  ctaButton: "View France eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

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

const NL_JA_CTA = {
  ctaTitle: "オランダ旅行の通信をもっと楽に",
  ctaButton: "オランダのeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};
const NL_EN_CTA = {
  ctaTitle: "Stay connected in the Netherlands",
  ctaButton: "View Netherlands eSIM plans",
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

// ─── Helper constructors ──────────────────────────────────────────

function ja(
  cta: typeof UK_JA_CTA,
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
  cta: typeof UK_EN_CTA,
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

const LONDON_X: GuideXEmbed[] = [
  { url: "https://x.com/visitlondon", label: "Visit London official" },
  { url: "https://x.com/visitlondon/status/1700000000000000001", label: "South Bank latest" },
  { url: "https://x.com/visitlondon/status/1700000000000000002", label: "London walking tips" },
];

const PARIS_X: GuideXEmbed[] = [
  { url: "https://x.com/ParisJeTaime", label: "Paris Je T'aime official" },
  { url: "https://x.com/ParisJeTaime/status/1700000000000000003", label: "Paris walks" },
  { url: "https://x.com/ParisJeTaime/status/1700000000000000004", label: "Paris local tips" },
];

const BARCELONA_X: GuideXEmbed[] = [
  { url: "https://x.com/VisitBCN_EN", label: "Visit Barcelona official" },
  { url: "https://x.com/VisitBCN_EN/status/1700000000000000005", label: "Barcelona neighbourhoods" },
];

const AMSTERDAM_X: GuideXEmbed[] = [
  { url: "https://x.com/Iamsterdam", label: "I amsterdam official" },
  { url: "https://x.com/Iamsterdam/status/1700000000000000006", label: "Amsterdam canal walks" },
];

const LISBON_X: GuideXEmbed[] = [
  { url: "https://x.com/visitlisboa", label: "Visit Lisboa official" },
  { url: "https://x.com/visitlisboa/status/1700000000000000007", label: "Lisbon neighbourhood guide" },
  { url: "https://x.com/visitlisboa/status/1700000000000000008", label: "Lisbon local tips" },
];

// ─── Image libraries ─────────────────────────────────────────────

const LONDON_SOUTH_BANK_IMAGES: GuideMediaImage[] = [
  img("File:Tate Modern London.jpg", 1600, 1067, "Tate Modern on the South Bank of the Thames", "Tate Modern's former power station silhouette is the South Bank's most recognizable landmark."),
  img("File:Borough Market London.jpg", 1600, 1067, "Borough Market entrance in Southwark", "Borough Market has operated in some form since the 13th century and is London's premier food market."),
  img("File:Millennium Bridge London.jpg", 1600, 1067, "Millennium Bridge crossing the Thames", "The Millennium Bridge links Tate Modern directly to St Paul's Cathedral on the north bank."),
  img("File:Shakespeare Globe Theatre London.jpg", 1600, 1067, "Shakespeare's Globe Theatre reconstruction", "The reconstructed Globe Theatre sits a short walk east of Tate Modern along Bankside."),
  img("File:Southwark Cathedral London.jpg", 1600, 1067, "Southwark Cathedral near Borough Market", "Southwark Cathedral is the oldest Gothic church building in London, adjacent to Borough Market."),
  img("File:Thames Path South Bank London.jpg", 1600, 1067, "Thames Path along the South Bank", "The Thames Path offers uninterrupted walking from Westminster Bridge to Tower Bridge."),
];

const LONDON_NOTTING_HILL_IMAGES: GuideMediaImage[] = [
  img("File:Portobello Road Market London.jpg", 1600, 1067, "Portobello Road Market stalls", "Portobello Road Market is busiest on Saturdays when antiques dealers set up the full length."),
  img("File:Notting Hill Houses London.jpg", 1600, 1067, "Pastel-coloured Victorian houses in Notting Hill", "The pastel terraces around Lancaster Road are the most photographed streets in the area."),
  img("File:Notting Hill Gate London.jpg", 1600, 1067, "Notting Hill Gate station area", "Notting Hill Gate tube station is the most convenient starting point for the walk."),
  img("File:Ladbroke Grove Notting Hill.jpg", 1600, 1067, "Ladbroke Grove gardens in Notting Hill", "Ladbroke Grove's communal gardens are private but visible through the iron railings."),
  img("File:Electric Cinema Notting Hill.jpg", 1600, 1067, "Electric Cinema on Portobello Road", "The Electric Cinema on Portobello Road is one of Britain's oldest working cinemas."),
];

const LONDON_SHOREDITCH_IMAGES: GuideMediaImage[] = [
  img("File:Shoreditch Street Art London.jpg", 1600, 1067, "Street art murals in Shoreditch", "Shoreditch's street art changes constantly, with new pieces appearing weekly."),
  img("File:Brick Lane London.jpg", 1600, 1067, "Brick Lane street sign and shops", "Brick Lane is the historic centre of London's Bangladeshi community and its curry restaurants."),
  img("File:Spitalfields Market London.jpg", 1600, 1067, "Old Spitalfields Market interior", "Old Spitalfields Market combines Victorian architecture with independent traders and food stalls."),
  img("File:Columbia Road Flower Market.jpg", 1600, 1067, "Columbia Road Flower Market on Sunday", "Columbia Road Flower Market runs only on Sunday mornings from 8 am to about 3 pm."),
  img("File:Boxpark Shoreditch London.jpg", 1600, 1067, "Boxpark pop-up mall in Shoreditch", "Boxpark Shoreditch pioneered the shipping-container retail concept in 2011."),
];

const LONDON_HAMPSTEAD_IMAGES: GuideMediaImage[] = [
  img("File:Hampstead Heath London.jpg", 1600, 1067, "Parliament Hill on Hampstead Heath", "Parliament Hill's summit offers one of the best panoramic views across central London."),
  img("File:Kenwood House Hampstead.jpg", 1600, 1067, "Kenwood House on Hampstead Heath", "Kenwood House is a free English Heritage property with a Vermeer and a Rembrandt."),
  img("File:Hampstead Village London.jpg", 1600, 1067, "Hampstead Village high street", "Hampstead Village retains its Georgian character with independent shops and cafes."),
  img("File:Hampstead Ponds London.jpg", 1600, 1067, "Swimming ponds on Hampstead Heath", "The Hampstead bathing ponds are among the few open-water swimming spots in London."),
  img("File:Flask Walk Hampstead.jpg", 1600, 1067, "Flask Walk lane in Hampstead", "Flask Walk is a narrow pedestrian lane connecting the high street to the heath."),
];

const LONDON_GREENWICH_IMAGES: GuideMediaImage[] = [
  img("File:Royal Observatory Greenwich.jpg", 1600, 1067, "Royal Observatory Greenwich", "The Royal Observatory marks the Prime Meridian and the zero point of world time."),
  img("File:Cutty Sark Greenwich.jpg", 1600, 1067, "Cutty Sark clipper ship in Greenwich", "The Cutty Sark is the world's sole surviving tea clipper and sits in a glass dry dock."),
  img("File:Old Royal Naval College Greenwich.jpg", 1600, 1067, "Old Royal Naval College from the Thames", "The Painted Hall inside the Old Royal Naval College is called 'the Sistine Chapel of the UK'."),
  img("File:Greenwich Market London.jpg", 1600, 1067, "Greenwich Market interior", "Greenwich Market operates daily with a mix of crafts, antiques, and street food."),
  img("File:Greenwich Park London.jpg", 1600, 1067, "Greenwich Park view towards Canary Wharf", "Greenwich Park's hilltop gives views from the Isle of Dogs to the City skyline."),
  img("File:Queens House Greenwich.jpg", 1600, 1067, "Queen's House in Greenwich", "The Queen's House was the first purely classical building in England, designed by Inigo Jones."),
];

const PARIS_MARAIS_IMAGES: GuideMediaImage[] = [
  img("File:Place des Vosges Paris.jpg", 1600, 1067, "Place des Vosges in the Marais", "Place des Vosges is the oldest planned square in Paris, completed in 1612."),
  img("File:Rue des Rosiers Paris.jpg", 1600, 1067, "Rue des Rosiers in the Marais", "Rue des Rosiers is the historic heart of Paris's Jewish quarter with falafel shops and bakeries."),
  img("File:Musee Carnavalet Paris.jpg", 1600, 1067, "Musee Carnavalet courtyard", "The Musee Carnavalet traces the history of Paris from Roman times and is free to enter."),
  img("File:Hotel de Sully Paris.jpg", 1600, 1067, "Hotel de Sully courtyard", "The Hotel de Sully's courtyard is a hidden shortcut from Rue Saint-Antoine to Place des Vosges."),
  img("File:Marais Paris street.jpg", 1600, 1067, "Narrow street in the Marais district", "The Marais escaped Haussmann's demolitions and keeps its medieval street plan."),
  img("File:Musee Picasso Paris.jpg", 1600, 1067, "Musee Picasso Paris exterior", "The Musee Picasso occupies the Hotel Sale, a 17th-century mansion on Rue de Thorigny."),
];

const PARIS_CANAL_IMAGES: GuideMediaImage[] = [
  img("File:Canal Saint-Martin Paris.jpg", 1600, 1067, "Canal Saint-Martin iron footbridge", "The iron footbridges and plane trees make Canal Saint-Martin one of Paris's most photogenic walks."),
  img("File:Canal Saint-Martin lock Paris.jpg", 1600, 1067, "Lock on Canal Saint-Martin", "The canal has nine locks and two swing bridges along its 4.5-kilometre length."),
  img("File:Hotel du Nord Paris.jpg", 1600, 1067, "Hotel du Nord facade on Canal Saint-Martin", "The Hotel du Nord facade is a listed monument thanks to the 1938 film of the same name."),
  img("File:Quai de Valmy Paris.jpg", 1600, 1067, "Quai de Valmy cafes along the canal", "Quai de Valmy's terraces fill up on sunny afternoons with locals and visitors."),
  img("File:Place de la Republique Paris.jpg", 1600, 1067, "Place de la Republique", "Place de la Republique is the natural starting point for the canal walk heading north."),
];

const PARIS_MONTMARTRE_IMAGES: GuideMediaImage[] = [
  img("File:Sacré-Cœur Paris.jpg", 1600, 1067, "Basilica of Sacre-Coeur from below", "Sacre-Coeur's white travertine dome dominates the Paris skyline from the Butte Montmartre."),
  img("File:Place du Tertre Paris.jpg", 1600, 1067, "Artists in Place du Tertre", "Place du Tertre has hosted street artists since the 19th century."),
  img("File:Rue Lepic Montmartre.jpg", 1600, 1067, "Rue Lepic winding up Montmartre", "Rue Lepic winds up the hill past the Moulin de la Galette and independent food shops."),
  img("File:Montmartre vineyard Paris.jpg", 1600, 1067, "Clos Montmartre vineyard", "Clos Montmartre is the last working vineyard in Paris, producing about 500 bottles annually."),
  img("File:Lapin Agile Montmartre.jpg", 1600, 1067, "Au Lapin Agile cabaret", "Au Lapin Agile is the oldest cabaret in Paris and once hosted Picasso and Apollinaire."),
  img("File:Moulin Rouge Paris.jpg", 1600, 1067, "Moulin Rouge at the foot of Montmartre", "The Moulin Rouge sits at Boulevard de Clichy, marking the base of the Montmartre hill."),
];

const PARIS_LATIN_QUARTER_IMAGES: GuideMediaImage[] = [
  img("File:Shakespeare and Company Paris.jpg", 1600, 1067, "Shakespeare and Company bookshop", "Shakespeare and Company has been a literary landmark on the Left Bank since 1951."),
  img("File:Pantheon Paris.jpg", 1600, 1067, "Pantheon in the Latin Quarter", "The Pantheon houses the remains of Voltaire, Rousseau, Hugo, and Marie Curie."),
  img("File:Rue Mouffetard Paris.jpg", 1600, 1067, "Rue Mouffetard market street", "Rue Mouffetard is one of the oldest streets in Paris with a daily food market."),
  img("File:Jardin du Luxembourg Paris.jpg", 1600, 1067, "Luxembourg Gardens in the Latin Quarter", "The Jardin du Luxembourg is the favourite park of Left Bank Parisians."),
  img("File:La Sorbonne Paris.jpg", 1600, 1067, "La Sorbonne university building", "The Sorbonne has anchored student life in the Latin Quarter since 1257."),
];

const PARIS_BELLEVILLE_IMAGES: GuideMediaImage[] = [
  img("File:Belleville Paris.jpg", 1600, 1067, "Belleville neighbourhood street scene", "Belleville's multi-ethnic streetscape reflects waves of immigration from North Africa, China, and beyond."),
  img("File:Parc de Belleville Paris.jpg", 1600, 1067, "Parc de Belleville viewpoint", "Parc de Belleville's terrace offers one of the best panoramic views of Paris."),
  img("File:Belleville street art Paris.jpg", 1600, 1067, "Street art in Belleville", "Belleville's street art scene rivals the Marais with large-scale murals on residential buildings."),
  img("File:Menilmontant Paris.jpg", 1600, 1067, "Rue de Menilmontant", "Rue de Menilmontant connects Belleville to Pere Lachaise cemetery."),
  img("File:Pere Lachaise entrance Paris.jpg", 1600, 1067, "Pere Lachaise cemetery entrance", "Pere Lachaise is a short extension from Belleville and holds the graves of Chopin, Morrison, and Wilde."),
];

const BARCELONA_BORN_IMAGES: GuideMediaImage[] = [
  img("File:Born Barcelona.jpg", 1600, 1067, "Born quarter medieval street in Barcelona", "El Born's narrow medieval lanes predate Barcelona's grid-planned Eixample by centuries."),
  img("File:Basilica Santa Maria del Mar Barcelona.jpg", 1600, 1067, "Basilica of Santa Maria del Mar", "Santa Maria del Mar is a masterpiece of Catalan Gothic built in just 54 years."),
  img("File:Mercat del Born Barcelona.jpg", 1600, 1067, "Mercat del Born cultural centre", "The former Born Market now houses archaeological remains of 1714 Barcelona beneath its iron roof."),
  img("File:Passeig del Born Barcelona.jpg", 1600, 1067, "Passeig del Born promenade", "Passeig del Born was a medieval jousting ground and is now lined with cocktail bars."),
  img("File:Picasso Museum Barcelona.jpg", 1600, 1067, "Museu Picasso in El Born", "The Museu Picasso occupies five connected medieval mansions on Carrer Montcada."),
  img("File:Ciutadella Park Barcelona.jpg", 1600, 1067, "Parc de la Ciutadella fountain", "Parc de la Ciutadella's monumental cascade is a short walk from the Born quarter."),
];

const BARCELONA_GRACIA_IMAGES: GuideMediaImage[] = [
  img("File:Gracia Barcelona.jpg", 1600, 1067, "Placa del Sol in Gracia", "Placa del Sol is Gracia's social hub where locals gather at terrace cafes."),
  img("File:Mercat de l'Abaceria Gracia.jpg", 1600, 1067, "Mercat de l'Abaceria Central", "The Abaceria market is Gracia's main food market with local produce stalls."),
  img("File:Gracia Festival Barcelona.jpg", 1600, 1067, "Festa Major de Gracia decorated street", "Each August, Gracia's streets compete in a decoration contest during the Festa Major."),
  img("File:Casa Vicens Barcelona.jpg", 1600, 1067, "Casa Vicens by Gaudi in Gracia", "Casa Vicens was Gaudi's first major commission and opened as a museum in 2017."),
  img("File:Placa de la Vila de Gracia.jpg", 1600, 1067, "Placa de la Vila de Gracia with clock tower", "The clock tower in Placa de la Vila de Gracia is the neighbourhood's visual symbol."),
];

const BARCELONA_BARCELONETA_IMAGES: GuideMediaImage[] = [
  img("File:Barceloneta Beach.jpg", 1600, 1067, "Barceloneta beach in the morning", "Barceloneta's beach is busiest after 11 am; the early morning belongs to joggers and swimmers."),
  img("File:Barceloneta neighbourhood Barcelona.jpg", 1600, 1067, "Narrow streets of Barceloneta", "Barceloneta was built as a grid in 1753 to rehouse families displaced by the Ciutadella fortress."),
  img("File:Port Olimpic Barcelona.jpg", 1600, 1067, "Port Olimpic marina", "Port Olimpic was built for the 1992 Olympics and marks the northern end of the beach walk."),
  img("File:Mercat de la Barceloneta.jpg", 1600, 1067, "Mercat de la Barceloneta", "The renovated Barceloneta market is the best place for fresh seafood in the neighbourhood."),
  img("File:W Hotel Barcelona.jpg", 1600, 1067, "W Hotel at the tip of Barceloneta", "The sail-shaped W Hotel marks the southern tip of Barceloneta beach."),
];

const AMSTERDAM_JORDAAN_IMAGES: GuideMediaImage[] = [
  img("File:Jordaan Amsterdam.jpg", 1600, 1067, "Jordaan canal and houseboats in Amsterdam", "The Jordaan's narrow canals and houseboats create Amsterdam's most photographed streetscapes."),
  img("File:Anne Frank House Amsterdam.jpg", 1600, 1067, "Anne Frank House on Prinsengracht", "The Anne Frank House on Prinsengracht is the Jordaan's most visited attraction; book online weeks ahead."),
  img("File:Westerkerk Amsterdam.jpg", 1600, 1067, "Westerkerk tower in the Jordaan", "Westerkerk's tower is the tallest church tower in Amsterdam and offers views over the Jordaan."),
  img("File:Noordermarkt Amsterdam.jpg", 1600, 1067, "Noordermarkt farmers market", "The Noordermarkt hosts a farmers market on Saturdays and a flea market on Mondays."),
  img("File:Jordaan alley Amsterdam.jpg", 1600, 1067, "Hidden courtyard in the Jordaan", "The Jordaan's hofjes (hidden courtyards) are former almshouses, some still residential."),
  img("File:Brouwersgracht Amsterdam.jpg", 1600, 1067, "Brouwersgracht canal in Amsterdam", "Brouwersgracht is often cited as the most beautiful canal in Amsterdam."),
];

const AMSTERDAM_DE_PIJP_IMAGES: GuideMediaImage[] = [
  img("File:Albert Cuyp Market.jpg", 1600, 1067, "Albert Cuyp Market stalls in De Pijp", "The Albert Cuyp Market runs six days a week and is Amsterdam's largest outdoor market."),
  img("File:Sarphatipark Amsterdam.jpg", 1600, 1067, "Sarphatipark in De Pijp", "Sarphatipark is De Pijp's neighbourhood green space, popular for weekend picnics."),
  img("File:Heineken Experience Amsterdam.jpg", 1600, 1067, "Heineken Experience building", "The former Heineken brewery is now an interactive visitor experience on Stadhouderskade."),
  img("File:De Pijp street Amsterdam.jpg", 1600, 1067, "De Pijp neighbourhood street", "De Pijp's grid streets were built for workers in the 1880s and now host diverse restaurants."),
  img("File:Marie Heinekenplein Amsterdam.jpg", 1600, 1067, "Marie Heinekenplein square", "Marie Heinekenplein is the social centre of De Pijp with large terrace cafes."),
];

const AMSTERDAM_PLANTAGE_IMAGES: GuideMediaImage[] = [
  img("File:Hortus Botanicus Amsterdam.jpg", 1600, 1067, "Hortus Botanicus garden in Amsterdam", "The Hortus Botanicus was founded in 1638 and is one of the oldest botanical gardens in the world."),
  img("File:Artis Zoo Amsterdam.jpg", 1600, 1067, "Artis Royal Zoo entrance", "Artis is the oldest zoo in the Netherlands, founded in 1838 in the Plantage district."),
  img("File:Wertheimpark Amsterdam.jpg", 1600, 1067, "Wertheimpark in the Plantage", "Wertheimpark contains the Auschwitz memorial and is a quiet space in the Plantage."),
  img("File:Plantage Middenlaan Amsterdam.jpg", 1600, 1067, "Plantage Middenlaan tree-lined avenue", "Plantage Middenlaan is a wide, tree-lined boulevard connecting the district's main sites."),
  img("File:Hollandsche Schouwburg Amsterdam.jpg", 1600, 1067, "National Holocaust Memorial at Hollandsche Schouwburg", "The Hollandsche Schouwburg served as a deportation centre during WWII and is now a memorial."),
];

const LISBON_ALFAMA_IMAGES: GuideMediaImage[] = [
  img("File:Alfama Lisbon.jpg", 1600, 1067, "Alfama district narrow streets in Lisbon", "Alfama's labyrinthine alleys survived the 1755 earthquake and are Lisbon's oldest neighbourhood."),
  img("File:Castelo Sao Jorge Lisbon.jpg", 1600, 1067, "Castelo de Sao Jorge above Alfama", "Castelo de Sao Jorge crowns the hilltop above Alfama with panoramic views of the Tagus."),
  img("File:Fado Museum Lisbon.jpg", 1600, 1067, "Museu do Fado in Alfama", "The Museu do Fado documents the history of Lisbon's signature musical genre."),
  img("File:Miradouro Santa Luzia Lisbon.jpg", 1600, 1067, "Miradouro de Santa Luzia viewpoint", "Miradouro de Santa Luzia offers tile-framed views over Alfama's rooftops to the river."),
  img("File:Se Cathedral Lisbon.jpg", 1600, 1067, "Lisbon Cathedral Se", "The Se cathedral is Lisbon's oldest church, built in 1147 after the Reconquista."),
  img("File:Tram 28 Lisbon.jpg", 1600, 1067, "Tram 28 climbing through Alfama", "Tram 28 rattles through Alfama's narrowest streets but walking gives better access to side alleys."),
];

const LISBON_BAIRRO_ALTO_IMAGES: GuideMediaImage[] = [
  img("File:Bairro Alto Lisbon.jpg", 1600, 1067, "Bairro Alto street in Lisbon", "Bairro Alto's grid was laid out in the 16th century and is now Lisbon's nightlife centre."),
  img("File:Miradouro Sao Pedro Alcantara Lisbon.jpg", 1600, 1067, "Miradouro de Sao Pedro de Alcantara", "The Sao Pedro de Alcantara viewpoint looks east across the Baixa to Castelo de Sao Jorge."),
  img("File:Elevador da Gloria Lisbon.jpg", 1600, 1067, "Elevador da Gloria funicular", "The Gloria funicular has connected Restauradores to Bairro Alto since 1885."),
  img("File:Chiado Lisbon.jpg", 1600, 1067, "Chiado shopping district", "Chiado connects Bairro Alto to the Baixa and is Lisbon's traditional literary quarter."),
  img("File:Principe Real Lisbon.jpg", 1600, 1067, "Jardim do Principe Real", "The Principe Real garden's cedar tree creates a natural canopy over a large terrace cafe."),
];

const LISBON_BELEM_IMAGES: GuideMediaImage[] = [
  img("File:Belem Tower.jpg", 1600, 1067, "Torre de Belem on the Tagus river", "The Torre de Belem was the last sight sailors saw when departing Lisbon for the Age of Discoveries."),
  img("File:Jeronimos Monastery Lisbon.jpg", 1600, 1067, "Jeronimos Monastery in Belem", "The Jeronimos Monastery is Portugal's most important Manueline monument and a UNESCO site."),
  img("File:Padrao dos Descobrimentos Lisbon.jpg", 1600, 1067, "Monument to the Discoveries", "The Padrao dos Descobrimentos faces the Tagus and has a rooftop viewpoint with a river panorama."),
  img("File:MAAT Lisbon.jpg", 1600, 1067, "MAAT museum building in Belem", "MAAT's undulating roof is walkable and gives views along the Tagus riverfront."),
  img("File:Pasteis de Belem Lisbon.jpg", 1600, 1067, "Pasteis de Belem bakery", "Pasteis de Belem has baked custard tarts to a secret recipe since 1837."),
  img("File:Belem riverside Lisbon.jpg", 1600, 1067, "Belem riverside promenade", "The riverfront promenade connects all of Belem's monuments in a flat, easy walk."),
];

const LISBON_LX_FACTORY_IMAGES: GuideMediaImage[] = [
  img("File:LX Factory Lisbon.jpg", 1600, 1067, "LX Factory creative hub in Lisbon", "LX Factory converted a 19th-century textile compound into studios, shops, and restaurants."),
  img("File:Ponte 25 Abril Lisbon.jpg", 1600, 1067, "25 de Abril Bridge from Alcantara", "The 25 de Abril Bridge looms directly above LX Factory and frames the area's skyline."),
  img("File:Alcantara Lisbon.jpg", 1600, 1067, "Alcantara docks area", "Alcantara's former docklands are gradually being transformed into a mixed-use waterfront."),
  img("File:Village Underground Lisbon.jpg", 1600, 1067, "Village Underground creative space", "Village Underground Lisboa uses shipping containers and double-decker buses as workspaces."),
  img("File:Ler Devagar LX Factory.jpg", 1600, 1067, "Ler Devagar bookshop inside LX Factory", "Ler Devagar is a warehouse-scale bookshop with a printing press and bicycle suspended from the ceiling."),
];

// ─── Article content ──────────────────────────────────────────────

export const EUROPE_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ═══════════════════════════════════════════════════════════════
  // 1. London — South Bank Walk
  // ═══════════════════════════════════════════════════════════════
  "london-south-bank-walk": {
    ja: ja(UK_JA_CTA,
      "ロンドン テムズ南岸散策：テート・モダンからバラマーケットへ",
      "テート・モダンを起点にテムズ南岸を歩き、シェイクスピア・グローブ座、サザーク大聖堂を経てバラマーケットまで。ロンドンの文化と食を一本道で楽しむウォーキングルートです。",
      LONDON_SOUTH_BANK_IMAGES[0],
      LONDON_SOUTH_BANK_IMAGES,
      LONDON_X,
      [
        { heading: "このルートの特徴", body: "テムズ南岸はロンドン中心部でもっとも歩きやすい河沿い遊歩道です。テート・モダンからバラマーケットまで約2km、信号なしでほぼ一直線に歩けます。途中にシェイクスピア・グローブ座、ゴールデン・ハインド号のレプリカ、サザーク大聖堂が並び、美術・歴史・食をひとつのルートで体験できます。対岸にはセント・ポール大聖堂が見え、ミレニアムブリッジで渡ることも可能です。観光客は多いですが道幅が広く、混雑で歩けなくなることはほぼありません。" },
        { heading: "アクセスと起点", body: "最寄り駅はSouthwark駅（Jubilee線）またはBlackfriars駅（Circle/District線）。テート・モダン正面入口まで徒歩5分です。バラマーケットはLondon Bridge駅（Northern/Jubilee線）直結なので、片道で歩いて地下鉄で戻るのが効率的です。Oysterカードまたはコンタクトレス決済でタップするだけで乗車できます。" },
        { heading: "主要スポット", body: "テート・モダンは入場無料で、タービンホールの大型インスタレーションだけでも見る価値があります。グローブ座は外観見学は無料、内部ツアーは要予約。サザーク大聖堂は入場無料で静かに休憩できます。バラマーケットは木〜土が本格営業で、月〜水は一部店舗のみ。スリが多いエリアなので、バッグは体の前で持ちましょう。" },
        { heading: "時間帯とタイミング", body: "午前中にテート・モダンを見て、昼前にバラマーケットに着くのがベストです。土曜は市場がもっとも賑わいますが混雑も最大。木・金の午前が比較的空いています。夏場は21時頃まで明るいので、夕方スタートでサンセットを楽しむのも良いルートです。冬場は16時に暗くなるため早めの出発を。" },
        { heading: "実用情報", body: "イギリスはほぼ全店キャッシュレス対応で、現金が使えない店も増えています。トイレはテート・モダン内が清潔で無料。バラマーケットにも公衆トイレがあります。雨が多いのでレインジャケットは必携。12〜2月は防寒対策も重要です。eSIMがあればGoogleマップでリアルタイムに経路確認でき、バラマーケットの人気店の行列状況もSNSでチェックできます。" },
      ],
      [
        { q: "テムズ南岸ウォークの所要時間は？", a: "テート・モダンからバラマーケットまで歩くだけなら30分ですが、各スポットに立ち寄ると2〜3時間が目安です。テート・モダンでじっくり鑑賞する場合はさらに1〜2時間追加してください。" },
        { q: "バラマーケットのおすすめ曜日は？", a: "木曜〜土曜が全店舗営業日です。土曜がもっとも活気がありますが混雑します。平日の木・金午前中が空いていておすすめです。日曜は休みです。" },
        { q: "雨の日でも楽しめる？", a: "テート・モダンとバラマーケットは屋根があるため、雨天でも主要スポットは問題なく楽しめます。河沿いの遊歩道部分だけ傘が必要です。" },
        { q: "子連れでも歩ける？", a: "遊歩道はフラットでベビーカーも通れます。テート・モダンには子供向けワークショップもあります。バラマーケットは土曜午後は混雑するため、午前中がおすすめです。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "London South Bank Walk: Tate Modern to Borough Market",
      "Walk the Thames South Bank from Tate Modern past Shakespeare's Globe and Southwark Cathedral to Borough Market. A straight-line route through London's best stretch of culture and food.",
      LONDON_SOUTH_BANK_IMAGES[0],
      LONDON_SOUTH_BANK_IMAGES,
      LONDON_X,
      [
        { heading: "Why this walk works", body: "The South Bank is the most walkable riverside stretch in central London. From Tate Modern to Borough Market is roughly 2 km with no traffic lights, passing Shakespeare's Globe, the Golden Hinde replica, and Southwark Cathedral along the way. St Paul's Cathedral sits directly across the river, reachable via the Millennium Bridge. The path is wide enough that crowds rarely become a problem, and the mix of free museums, street performers, and food stalls keeps the route interesting without requiring a single ticket purchase. This is one of the few London walks where you genuinely do not need to plan — just follow the river east." },
        { heading: "How to get there", body: "Start at Southwark station (Jubilee line) or Blackfriars station (Circle and District lines), both a five-minute walk from Tate Modern's main entrance. Borough Market sits directly above London Bridge station (Northern and Jubilee lines), making a one-way walk with a Tube return the most efficient option. Use an Oyster card or contactless payment — paper tickets cost significantly more. If arriving by bus, routes 45, 63, and 100 all stop within two minutes of Tate Modern." },
        { heading: "Key stops", body: "Tate Modern is free to enter; the Turbine Hall installation alone justifies a stop. Shakespeare's Globe offers guided tours of the reconstructed theatre, but the exterior and exhibition are rewarding even without a ticket. Southwark Cathedral is free and makes a peaceful rest stop. Borough Market operates fully Thursday to Saturday; Monday to Wednesday sees only partial stall openings. Pickpockets operate in this area — keep bags closed and in front of you, especially at the market on Saturdays." },
        { heading: "Best timing", body: "Visit Tate Modern in the morning and reach Borough Market before noon for the best combination of quieter galleries and fresh market stock. Saturday is the liveliest market day but also the most crowded; Thursday and Friday mornings are calmer. In summer, daylight lasts until about 21:00, making an evening start viable for sunset views. In winter, darkness falls by 16:00, so start early. The South Bank Christmas market adds stalls from mid-November to early January." },
        { heading: "Practical tips", body: "Almost every shop and vendor in London accepts contactless payment; some refuse cash entirely. Free, clean toilets are available inside Tate Modern. Borough Market also has public facilities. Rain is frequent year-round — carry a packable waterproof jacket rather than an umbrella, which is awkward on crowded paths. With an eSIM you can check live bus times, look up market vendor menus, and navigate without searching for Wi-Fi." },
      ],
      [
        { q: "How long does the South Bank walk take?", a: "Walking from Tate Modern to Borough Market without stopping takes about 30 minutes. Allow 2 to 3 hours with stops at the main sights. Add another 1 to 2 hours if you plan to explore Tate Modern's galleries in depth." },
        { q: "Which day is best for Borough Market?", a: "Thursday through Saturday are full trading days. Saturday is the most atmospheric but also the busiest. Thursday and Friday mornings offer the same stalls with fewer crowds. The market is closed on Sundays." },
        { q: "Is the walk good in the rain?", a: "Yes. Tate Modern and Borough Market are both covered, so the main stops work fine in wet weather. Only the riverside path sections require a jacket or umbrella." },
        { q: "Can I do this walk with a pushchair?", a: "The entire path is flat and step-free. Tate Modern has lifts to all floors. Borough Market gets tight on Saturday afternoons, so morning visits work better with a pushchair." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. London — Notting Hill Walk
  // ═══════════════════════════════════════════════════════════════
  "london-notting-hill-walk": {
    ja: ja(UK_JA_CTA,
      "ロンドン ノッティングヒル散策：パステルハウスとポートベロマーケット",
      "カラフルなビクトリア朝テラスハウスとポートベロ・ロードのアンティーク市場を巡るノッティングヒルの街歩きガイド。映画ファンにも人気のフォトジェニックなルートです。",
      LONDON_NOTTING_HILL_IMAGES[0],
      LONDON_NOTTING_HILL_IMAGES,
      LONDON_X,
      [
        { heading: "このルートの特徴", body: "ノッティングヒルはパステルカラーのビクトリア朝テラスハウスが並ぶ、ロンドンでもっともフォトジェニックなエリアのひとつです。ポートベロ・ロードのアンティーク市場は土曜に最大規模で開催され、ヴィンテージ雑貨、レコード、ストリートフードが数百メートルにわたって並びます。映画『ノッティングヒルの恋人』のロケ地としても知られ、ブックショップやカフェを巡るだけでも楽しめます。住宅街のため静かな通りも多く、喧騒から離れた散歩が可能です。" },
        { heading: "アクセスと起点", body: "Notting Hill Gate駅（Central/Circle/District線）が最寄りです。駅を出て北へ向かえばすぐにポートベロ・ロードの入口です。Ladbroke Grove駅（Hammersmith & City線）から南下するルートもあります。バスなら52番・452番がNotting Hill Gate付近に停車します。" },
        { heading: "主要スポット", body: "ポートベロ・ロードは南端のアンティーク街から北のストリートフードまで性格が変わります。Lancaster RoadとSt Luke's Mews周辺がもっともカラフルなパステルハウスの集中するエリアです。エレクトリック・シネマは1910年開業のイギリス最古級の映画館で、革張りソファで映画を観られます。スリに注意し、貴重品は内ポケットに入れましょう。" },
        { heading: "時間帯とタイミング", body: "土曜は市場が最大規模ですが10時〜14時は非常に混雑します。写真撮影なら平日の早朝が最適で、パステルハウスを人なしで撮れます。8月下旬のノッティングヒル・カーニバルは世界最大級のストリートフェスティバルですが、散策とは異なる体験になります。" },
        { heading: "実用情報", body: "市場の支払いはキャッシュレスが主流ですが、一部の露店では現金が有利な場合もあります。公衆トイレは少ないため、カフェで購入して利用するのが現実的です。eSIMがあれば市場の混雑状況をリアルタイムでチェックでき、アンティークの相場をその場で調べることもできます。" },
      ],
      [
        { q: "ポートベロ・マーケットは毎日開いている？", a: "露店は主に土曜に全面展開します。平日も一部の常設店は開いていますが、アンティーク商の多くは土曜のみです。日曜は閑散としています。" },
        { q: "パステルハウスはどこにある？", a: "Lancaster Road、Westbourne Park Road、St Luke's Mews周辺がもっともカラフルなエリアです。Notting Hill Gate駅から北へ10分ほど歩きます。" },
        { q: "カーニバル期間中に散策できる？", a: "8月下旬のノッティングヒル・カーニバル中は通常の散策はほぼ不可能です。100万人以上が訪れ、通行規制が敷かれます。カーニバル自体を目的にするなら事前に情報収集してください。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "London Notting Hill Walk: Pastel Houses and Portobello Market",
      "Explore Notting Hill's colourful Victorian terraces and Portobello Road's antique market. A photogenic walking route through one of London's most distinctive neighbourhoods.",
      LONDON_NOTTING_HILL_IMAGES[0],
      LONDON_NOTTING_HILL_IMAGES,
      LONDON_X,
      [
        { heading: "Why this walk works", body: "Notting Hill delivers the most photogenic residential streetscape in London. The pastel-painted Victorian terraces around Lancaster Road and St Luke's Mews have become iconic, and Portobello Road hosts one of the world's great street markets every Saturday. The area blends upmarket residential calm with market-day energy, and the whole route is compact enough to cover in a morning. Unlike many London markets, Portobello changes character block by block — antiques at the south end, fashion in the middle, street food and vintage at the north — so the walk never feels repetitive." },
        { heading: "How to get there", body: "Notting Hill Gate station (Central, Circle, and District lines) is the standard starting point. Exit and walk north to reach Portobello Road within two minutes. Alternatively, start from Ladbroke Grove station (Hammersmith and City line) and walk south through the market. Buses 52 and 452 stop near Notting Hill Gate. The walk is entirely flat and pushchair-friendly." },
        { heading: "Key stops", body: "Portobello Road's character shifts as you walk north: antiques dealers in the first few blocks, then fashion boutiques, then food stalls and vintage clothing. The most photographed pastel houses are on Lancaster Road, Westbourne Park Road, and around St Luke's Mews. The Electric Cinema, dating from 1910, is one of Britain's oldest working cinemas and has leather armchairs. Watch for pickpockets, especially on busy Saturdays — keep valuables in inside pockets." },
        { heading: "Best timing", body: "Saturday is the full market experience but extremely crowded between 10:00 and 14:00. For photography of the pastel houses without crowds, visit on a weekday morning before 09:00. The Notting Hill Carnival in late August is the world's second-largest street festival but is a completely different experience from a quiet neighbourhood walk — plan accordingly." },
        { heading: "Practical tips", body: "Most market vendors accept contactless payment, but a few cash-only stalls remain, particularly among the antiques dealers. Public toilets are scarce; buying a coffee at a local cafe is the practical solution. An eSIM lets you check market crowds in real time and research antique prices on the spot." },
      ],
      [
        { q: "Is Portobello Market open every day?", a: "The full market with antiques runs on Saturdays only. Some permanent shops open on weekdays, but most stall holders are Saturday-only. Sunday is very quiet." },
        { q: "Where exactly are the pastel houses?", a: "The most colourful terraces are on Lancaster Road, Westbourne Park Road, and St Luke's Mews, all about a 10-minute walk north of Notting Hill Gate station." },
        { q: "Can I walk the area during Carnival?", a: "The Notting Hill Carnival in late August draws over a million visitors and road closures make normal walking routes impassable. If you want to attend the Carnival itself, plan specifically for it rather than combining it with a neighbourhood walk." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. London — Shoreditch Walk
  // ═══════════════════════════════════════════════════════════════
  "london-shoreditch-walk": {
    ja: ja(UK_JA_CTA,
      "ロンドン ショーディッチ散策：ストリートアートとカフェ巡り",
      "ショーディッチのストリートアート、ブリックレーン、スピタルフィールズマーケットを巡る東ロンドンの街歩きガイド。クリエイティブなカルチャーを体感できるルートです。",
      LONDON_SHOREDITCH_IMAGES[0],
      LONDON_SHOREDITCH_IMAGES,
      LONDON_X,
      [
        { heading: "このルートの特徴", body: "ショーディッチはロンドン東部のクリエイティブの中心地です。建物の壁一面に描かれたストリートアートが次々と現れ、毎週のように新しい作品に塗り替えられます。ブリックレーンのカレー通り、スピタルフィールズのヴィクトリア朝マーケット、日曜限定のコロンビアロード・フラワーマーケットと、歩くだけで東ロンドンのカルチャーを凝縮して体験できます。おしゃれなカフェやロースタリーが多く、コーヒー好きにも最適なエリアです。" },
        { heading: "アクセスと起点", body: "Liverpool Street駅（Central/Circle/Metropolitan/Elizabeth線）から北へ徒歩5分でショーディッチに入ります。Shoreditch High Street駅（Overground）も便利です。バスなら8番、26番、35番がエリア内を通ります。" },
        { heading: "主要スポット", body: "ブリックレーンは日曜にマーケットが立ち、ヴィンテージ雑貨やストリートフードが並びます。スピタルフィールズマーケットは毎日営業で木曜のアンティークデーが人気。コロンビアロード・フラワーマーケットは日曜朝8時〜15時のみ。ストリートアートはRivington Street、Hanbury Street周辺に集中しています。このエリアは夜間の一人歩きは避けたほうが安全です。" },
        { heading: "時間帯とタイミング", body: "日曜午前がベストで、ブリックレーンマーケットとコロンビアロード・フラワーマーケットの両方を回れます。ストリートアートの撮影は人が少ない平日早朝が理想的。金・土の夜はバーやクラブが賑わいますが、散策向きではありません。" },
        { heading: "実用情報", body: "フードストールでは現金のみの店もまだ残っています。小銭を用意しておくと便利です。トイレはスピタルフィールズマーケット内にあります。eSIMがあればストリートアートのアーティスト情報をその場で検索でき、Instagramでリアルタイムの作品情報も確認できます。" },
      ],
      [
        { q: "ストリートアートは常に見られる？", a: "はい、壁画は24時間見られます。ただし作品は頻繁に塗り替えられるため、特定の作品を目当てに行くなら事前にSNSで確認してください。" },
        { q: "日曜以外でも楽しめる？", a: "スピタルフィールズマーケットは毎日営業しており、カフェやストリートアートは曜日に関係なく楽しめます。ただしブリックレーンマーケットとコロンビアロードは日曜のみです。" },
        { q: "治安は大丈夫？", a: "日中は問題ありませんが、夜間の裏通りは避けた方が安全です。スリにも注意し、スマートフォンを出しっぱなしにしないでください。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "London Shoreditch Walk: Street Art and Cafe Culture",
      "Explore Shoreditch's ever-changing street art, Brick Lane's food scene, and Spitalfields Market. A walking guide to East London's creative heartland.",
      LONDON_SHOREDITCH_IMAGES[0],
      LONDON_SHOREDITCH_IMAGES,
      LONDON_X,
      [
        { heading: "Why this walk works", body: "Shoreditch is London's creative engine. Entire building facades serve as canvases for street artists, with new work appearing weekly. The route connects Brick Lane's curry houses, Spitalfields' Victorian market hall, and the Sunday-only Columbia Road Flower Market into a single loop through East London's most energetic quarter. Speciality coffee roasters and independent cafes are everywhere, making this the best neighbourhood in London for a coffee-fuelled walk. The area changes character dramatically between weekday calm and Sunday market buzz." },
        { heading: "How to get there", body: "Liverpool Street station (Central, Circle, Metropolitan, and Elizabeth lines) is five minutes' walk south of Shoreditch. Shoreditch High Street station (London Overground) drops you directly into the area. Buses 8, 26, and 35 run through the neighbourhood. The walk is flat throughout." },
        { heading: "Key stops", body: "Brick Lane hosts a full street market on Sundays with vintage goods and international food stalls. Spitalfields Market is open daily, with Thursday antique days drawing the most interesting traders. Columbia Road Flower Market runs Sunday mornings only, from about 08:00 to 15:00. The densest concentration of street art is around Rivington Street and Hanbury Street. Avoid walking alone through back streets late at night." },
        { heading: "Best timing", body: "Sunday morning is the prime slot, letting you hit both Brick Lane Market and Columbia Road Flower Market. For street art photography without crowds, visit on a weekday morning before 09:00. Friday and Saturday nights bring a lively bar and club scene, but that is a different experience from a daytime walk." },
        { heading: "Practical tips", body: "Some food stalls still operate cash-only, so carry some coins. Toilets are available inside Spitalfields Market. With an eSIM you can look up the artist behind a mural on the spot and check Instagram for the latest pieces. Keep your phone secure — street-level phone snatching is an issue in busy London areas." },
      ],
      [
        { q: "Can I see street art at any time?", a: "Yes, the murals are on public walls and visible around the clock. But specific pieces get painted over frequently, so check social media beforehand if you are looking for a particular work." },
        { q: "Is the area worth visiting on days other than Sunday?", a: "Spitalfields Market is open daily, and the cafes and street art are always there. However, the Brick Lane and Columbia Road markets are Sunday-only, so the full experience requires a Sunday visit." },
        { q: "Is Shoreditch safe?", a: "Daytime is fine. At night, stick to main streets and avoid poorly lit side roads. Phone snatching happens — do not walk with your phone out in your hand." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. London — Hampstead Heath Walk
  // ═══════════════════════════════════════════════════════════════
  "london-hampstead-heath-walk": {
    ja: ja(UK_JA_CTA,
      "ロンドン ハムステッドヒース散歩：丘の上の絶景と村の雰囲気",
      "ロンドン中心部を一望できるハムステッドヒースの丘と、ジョージアン様式の村ハムステッドを巡る自然と街の散歩ガイド。ケンウッドハウスの無料美術館も見どころです。",
      LONDON_HAMPSTEAD_IMAGES[0],
      LONDON_HAMPSTEAD_IMAGES,
      LONDON_X,
      [
        { heading: "このルートの特徴", body: "ハムステッドヒースはロンドン北部に広がる320エーカーの自然公園で、パーラメントヒルからはロンドン中心部のスカイラインを一望できます。ヒースの北端にはケンウッドハウスがあり、フェルメールやレンブラントを無料で鑑賞できます。公園を抜けるとジョージアン様式の建物が残るハムステッド・ビレッジがあり、独立系のカフェや書店が並ぶ落ち着いた街並みです。ロンドンの喧騒から離れた、半日の自然散歩に最適なルートです。" },
        { heading: "アクセスと起点", body: "Hampstead駅（Northern線）から徒歩5分でヒースの入口に着きます。Gospel Oak駅（Overground）やHampstead Heath駅（Overground）からもアクセス可能。ケンウッドハウスから始めたい場合はArchway駅からバス210番が便利です。" },
        { heading: "主要スポット", body: "パーラメントヒルは標高98mで、ロンドン中心部の360度パノラマが楽しめます。ケンウッドハウスはEnglish Heritage管理の無料美術館で、フェルメールの「ギター演奏者」が目玉です。ハムステッドの天然池では夏に屋外スイミングが可能（男性用・女性用・混合の3か所）。フラスク・ウォークは小さな路地で、独立系ショップが集まります。" },
        { heading: "時間帯とタイミング", body: "朝早い時間帯がもっとも空いており、犬の散歩をする地元民とすれ違うだけです。秋の紅葉シーズンは特に美しく、丘全体が赤と金に染まります。冬は泥が多くなるため防水の靴が必須。ケンウッドハウスは10時開館です。" },
        { heading: "実用情報", body: "ヒース内にカフェは2か所あります（パーラメントヒルのカフェとケンウッドハウスのカフェ）。トイレも同じ場所にあります。道は未舗装が多いため、しっかりした歩行靴を推奨します。eSIMがあればヒース内でも経路検索が可能で、迷いやすい森の中でもGPSナビが使えます。" },
      ],
      [
        { q: "ハムステッドヒースの所要時間は？", a: "パーラメントヒルの往復だけなら1時間。ケンウッドハウスまで歩いてビレッジに戻ると3〜4時間です。" },
        { q: "天然池で泳げる？", a: "はい、年間を通じて泳げます。男性用、女性用、混合用の3つの池があります。更衣室とロッカーがあり、入場料は数ポンドです。" },
        { q: "子連れにおすすめ？", a: "丘の上は広く開放的で子供が走り回れます。夏にはケンウッドハウス前の芝生でピクニックする家族も多いです。ただし一部急な坂があるためベビーカーは不向きなルートもあります。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "London Hampstead Heath Walk: Hilltop Views and Village Charm",
      "Walk Hampstead Heath for panoramic London skyline views, visit the free Kenwood House gallery, and explore the Georgian village of Hampstead. A half-day escape from the city centre.",
      LONDON_HAMPSTEAD_IMAGES[0],
      LONDON_HAMPSTEAD_IMAGES,
      LONDON_X,
      [
        { heading: "Why this walk works", body: "Hampstead Heath covers 320 acres of wild parkland in north London. Parliament Hill, the most popular viewpoint, gives a full skyline panorama from the Shard to Canary Wharf. At the northern end of the Heath, Kenwood House is a free English Heritage gallery holding a Vermeer and a Rembrandt in a stately home setting. The route finishes in Hampstead Village, where Georgian architecture, independent bookshops, and quiet cafes feel a world away from central London. This is the best half-day nature walk accessible by Tube." },
        { heading: "How to get there", body: "Hampstead station (Northern line) is five minutes' walk from the Heath entrance. Gospel Oak and Hampstead Heath stations (both London Overground) offer alternative entry points. For Kenwood House first, take bus 210 from Archway station. The Heath has multiple entrances so you can design a one-way route rather than doubling back." },
        { heading: "Key stops", body: "Parliament Hill at 98 metres elevation offers a 360-degree panorama of central London and is the classic first stop. Kenwood House is free and uncrowded even on weekends — Vermeer's The Guitar Player is the highlight. The Hampstead swimming ponds are open year-round for outdoor swimming in natural water (separate men's, women's, and mixed ponds). Flask Walk is a narrow lane of independent shops connecting the high street to the heath." },
        { heading: "Best timing", body: "Early morning is quietest; you will share the paths mainly with local dog walkers. Autumn brings spectacular foliage across the entire Heath. Winter makes paths muddy — waterproof boots are essential. Kenwood House opens at 10:00. Summer weekends draw sunbathers to Parliament Hill's slopes, adding a festival atmosphere." },
        { heading: "Practical tips", body: "Two cafes operate inside the Heath — one near Parliament Hill and one at Kenwood House — both with toilets. Paths are mostly unpaved, so sturdy walking shoes are important. With an eSIM, GPS navigation works inside the Heath's wooded areas where it is easy to lose your bearings. Mobile data also lets you check Kenwood House opening hours and any temporary closures." },
      ],
      [
        { q: "How long does the Hampstead Heath walk take?", a: "A return trip to Parliament Hill takes about an hour. Walking to Kenwood House and back through the village takes 3 to 4 hours." },
        { q: "Can I swim in the ponds?", a: "Yes, the ponds are open year-round. There are three: men's, women's, and mixed. Changing rooms and lockers are available, and there is a small entry fee." },
        { q: "Is it good for children?", a: "The hilltop areas are wide open for children to run. In summer, families picnic on the Kenwood House lawns. Some slopes are steep and paths uneven, so pushchairs are not ideal on all routes." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. London — Greenwich Walk
  // ═══════════════════════════════════════════════════════════════
  "london-greenwich-walk": {
    ja: ja(UK_JA_CTA,
      "ロンドン グリニッジ散策：天文台と海事地区を歩く",
      "本初子午線のグリニッジ天文台、カティサーク号、旧王立海軍大学を巡る世界遺産の街グリニッジ。テムズ川の眺望と海洋史を楽しむウォーキングガイドです。",
      LONDON_GREENWICH_IMAGES[0],
      LONDON_GREENWICH_IMAGES,
      LONDON_X,
      [
        { heading: "このルートの特徴", body: "グリニッジはUNESCO世界遺産に登録された海事地区で、本初子午線が通るグリニッジ天文台が最大の見どころです。グリニッジパークの丘からはテムズ川とカナリーワーフの高層ビル群が一望でき、旧王立海軍大学の「ペインテッド・ホール」はイギリス版システィーナ礼拝堂と呼ばれています。カティサーク号は世界で唯一現存する茶葉クリッパー船で、ガラスのドライドックに展示されています。一か所で歴史・建築・眺望を楽しめる効率的なルートです。" },
        { heading: "アクセスと起点", body: "DLRのCutty Sark駅が最寄りで、カティサーク号の前に直接出ます。テムズクリッパーの水上バスでウェストミンスターから来ることもでき、船上からの眺めも良いです。Greenwich駅（Southeastern線）も徒歩3分。ロンドン中心部からDLRで約20分です。" },
        { heading: "主要スポット", body: "グリニッジ天文台は本初子午線をまたいで記念写真を撮れます（有料エリア）。旧王立海軍大学のペインテッド・ホールは入場有料ですが必見。クイーンズハウスは無料でイニゴ・ジョーンズ設計のイギリス初の純粋古典主義建築。グリニッジマーケットはクラフトと食のマーケットで毎日営業。スリは観光地の常なのでバッグに注意してください。" },
        { heading: "時間帯とタイミング", body: "午前中にグリニッジパークの丘に登り、午後にマーケットと海事地区を回るのが効率的です。週末はマーケットが賑わいますが平日も毎日営業。天文台は予約制の場合があるため事前確認を。冬場は15時台に暗くなり始めるため早めの出発を。" },
        { heading: "実用情報", body: "グリニッジパークは無料で常時開放されています。トイレは天文台付近とマーケット内にあります。丘への坂道はやや急ですが10分ほどで登れます。eSIMがあれば天文台のチケット予約やテムズクリッパーの時刻表確認がその場でできます。" },
      ],
      [
        { q: "グリニッジ散策の所要時間は？", a: "主要スポットを一通り回ると3〜4時間です。天文台とペインテッド・ホールをじっくり見ると半日かかります。" },
        { q: "本初子午線をまたぐのは無料？", a: "中庭の子午線（写真撮影スポット）は天文台の有料チケットが必要です。敷地外にある子午線の地面のラインは無料で見られます。" },
        { q: "テムズクリッパーで行く価値はある？", a: "ウェストミンスターからの水上バスは約30分で、ロンドンの名所を川から見られます。OysterカードやTravelcardで割引になります。" },
      ],
    ),
    en: en(UK_EN_CTA,
      "London Greenwich Walk: Observatory and Maritime Quarter",
      "Walk through UNESCO-listed Greenwich, straddling the Prime Meridian at the Royal Observatory, boarding the Cutty Sark, and visiting the Painted Hall. A riverside heritage walk east of central London.",
      LONDON_GREENWICH_IMAGES[0],
      LONDON_GREENWICH_IMAGES,
      LONDON_X,
      [
        { heading: "Why this walk works", body: "Greenwich packs a UNESCO World Heritage maritime district into a compact, walkable area. The Royal Observatory marks the Prime Meridian and the origin of Greenwich Mean Time. Greenwich Park's hilltop gives a skyline view across the Thames to Canary Wharf. The Old Royal Naval College's Painted Hall is one of the finest baroque interiors in Europe, and the Cutty Sark is the world's last surviving tea clipper. Few places in London deliver this density of history, architecture, and views in a single walk." },
        { heading: "How to get there", body: "Cutty Sark DLR station is the most convenient starting point, depositing you directly in front of the ship. Thames Clippers water buses run from Westminster Pier and offer views of the riverside landmarks en route. Greenwich station (Southeastern trains) is a three-minute walk. The DLR journey from central London takes about 20 minutes." },
        { heading: "Key stops", body: "The Royal Observatory lets you stand on the Prime Meridian for a photo (paid area). The Painted Hall in the Old Royal Naval College is a ticketed attraction but worth every penny. The Queen's House is free and was England's first purely classical building, designed by Inigo Jones. Greenwich Market runs daily with a mix of crafts, antiques, and food. Watch for pickpockets in the busy tourist areas." },
        { heading: "Best timing", body: "Climb Greenwich Park's hill in the morning for the best light on the skyline, then visit the market and maritime quarter in the afternoon. The market is busiest at weekends but operates daily. The Observatory may require timed tickets — check online before visiting. In winter, darkness begins around 15:30, so start early." },
        { heading: "Practical tips", body: "Greenwich Park is free and open year-round. Toilets are available near the Observatory and inside the market. The hill climb is moderately steep but takes only about 10 minutes. An eSIM lets you book Observatory tickets and check Thames Clipper timetables on the spot without hunting for Wi-Fi." },
      ],
      [
        { q: "How long does the Greenwich walk take?", a: "Allow 3 to 4 hours for the main sites. If you explore the Observatory and Painted Hall in depth, plan for a half day." },
        { q: "Is standing on the Prime Meridian free?", a: "The courtyard meridian line — the classic photo spot — requires a paid Observatory ticket. A ground-level meridian marker outside the paid area is free to visit." },
        { q: "Is the Thames Clipper worth taking?", a: "The water bus from Westminster takes about 30 minutes and gives river-level views of London's landmarks. Oyster and Travelcard holders get a discount." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. Paris — Marais Walk
  // ═══════════════════════════════════════════════════════════════
  "paris-marais-walk": {
    ja: ja(FR_JA_CTA,
      "パリ マレ地区散策：ギャラリーとカフェを巡る中世の小路",
      "パリ最古の広場ヴォージュ広場を起点に、ユダヤ人街、ピカソ美術館、独立系ギャラリーを巡るマレ地区の街歩きガイド。オスマン改造を免れた中世の路地が残る貴重なエリアです。",
      PARIS_MARAIS_IMAGES[0],
      PARIS_MARAIS_IMAGES,
      PARIS_X,
      [
        { heading: "このルートの特徴", body: "マレ地区はオスマンによるパリ大改造を免れた数少ないエリアで、中世の細い路地がそのまま残っています。パリ最古の計画広場ヴォージュ広場、ユダヤ人街のリュ・デ・ロジエ、ピカソ美術館、無数の独立系ギャラリーが凝縮されたエリアです。カフェ文化も盛んで、歩き疲れたら小さなテラスで休憩するのもマレの楽しみ方。日曜にも多くの店が開いているパリでは珍しい地区です。" },
        { heading: "アクセスと起点", body: "メトロSaint-Paul駅（1号線）が最寄り。Bastille駅（1・5・8号線）からヴォージュ広場を経由して入るルートもおすすめです。Chemin Vert駅（8号線）からピカソ美術館方面に直接アクセスすることもできます。パリのメトロはNavigo Easyカードかスマホアプリでチケットを購入できます。" },
        { heading: "主要スポット", body: "ヴォージュ広場はパリ最古の計画広場で、アーケード下にカフェとギャラリーが並びます。オテル・ド・シュリの中庭はリュ・サンタントワーヌからヴォージュ広場への隠れたショートカット。ピカソ美術館は17世紀の邸宅を利用した美術館で事前予約推奨。リュ・デ・ロジエではファラフェルの名店が並びます。スリはメトロだけでなく観光地全般で多いため、バッグのファスナーは常に閉じておきましょう。" },
        { heading: "時間帯とタイミング", body: "日曜日がマレ散策のベストデーです。パリでは日曜に閉まる店が多い中、マレは例外的に営業しています。平日の午前中はギャラリーや美術館が空いていて快適。夏の夕方はテラスカフェが満席になるため、早めの時間帯がおすすめです。" },
        { heading: "実用情報", body: "フランスではほぼ全店でカード決済が可能です。公衆トイレはヴォージュ広場とカルナヴァレ美術館内にあります。カルナヴァレ美術館（パリ歴史博物館）は無料入場。eSIMがあればギャラリーの展示情報を調べたり、レストランの予約をその場でできます。" },
      ],
      [
        { q: "マレ地区の所要時間は？", a: "主要スポットを回って2〜3時間。ピカソ美術館やカルナヴァレ美術館もじっくり見ると半日です。" },
        { q: "日曜に開いている？", a: "はい、マレはパリで数少ない日曜も営業する商業地区です。ただし一部の個人商店は月曜定休の場合があります。" },
        { q: "ファラフェルのおすすめは？", a: "リュ・デ・ロジエのL'As du FalafelとMi-Vaが二大名店です。昼時は行列ができますが回転は早いです。" },
      ],
    ),
    en: en(FR_EN_CTA,
      "Paris Marais Walk: Galleries and Cafes in Medieval Lanes",
      "Explore the Marais from Place des Vosges through the Jewish quarter and Picasso Museum. A walking guide to the neighbourhood that escaped Haussmann's grand boulevards.",
      PARIS_MARAIS_IMAGES[0],
      PARIS_MARAIS_IMAGES,
      PARIS_X,
      [
        { heading: "Why this walk works", body: "The Marais is one of the few Paris neighbourhoods that survived Haussmann's 19th-century demolitions, preserving medieval street plans and aristocratic mansions. Place des Vosges, the city's oldest planned square, anchors the route. The Jewish quarter on Rue des Rosiers, the Picasso Museum in a 17th-century mansion, and dozens of independent galleries make this Paris's most culturally dense walking neighbourhood. Unusually for Paris, most Marais shops open on Sundays." },
        { heading: "How to get there", body: "Saint-Paul station (Metro line 1) is the closest stop. Starting from Bastille station (lines 1, 5, 8) and entering via Place des Vosges is an alternative. Chemin Vert station (line 8) gives direct access to the Picasso Museum area. Buy Metro tickets with a Navigo Easy card or the Ile-de-France Mobilites app." },
        { heading: "Key stops", body: "Place des Vosges has arcaded galleries and cafes on all four sides. The courtyard of Hotel de Sully is a hidden shortcut from Rue Saint-Antoine to Place des Vosges. The Picasso Museum occupies a 17th-century mansion and requires advance booking in peak season. Rue des Rosiers is lined with falafel shops — L'As du Falafel and Mi-Va are the most popular. Pickpockets operate throughout the area, not just on the Metro — keep zips closed." },
        { heading: "Best timing", body: "Sunday is the best day for the Marais, as most shops open while much of Paris shuts down. Weekday mornings are quieter for galleries and museums. Summer evenings fill terrace cafes quickly, so aim for earlier in the day if you want a seat outside." },
        { heading: "Practical tips", body: "Card payment is accepted almost everywhere in France. Public toilets are at Place des Vosges and inside the Musee Carnavalet. The Musee Carnavalet, covering the history of Paris, is free to enter. An eSIM lets you check gallery exhibitions, make restaurant bookings, and navigate the medieval lanes without searching for Wi-Fi." },
      ],
      [
        { q: "How long does the Marais walk take?", a: "The main route takes 2 to 3 hours. Add a half day if you plan to explore the Picasso Museum and Musee Carnavalet in depth." },
        { q: "Is the Marais open on Sundays?", a: "Yes, the Marais is one of the few Paris neighbourhoods where most shops open on Sundays. Some smaller independent stores may close on Mondays instead." },
        { q: "Which falafel place is best?", a: "L'As du Falafel and Mi-Va on Rue des Rosiers are the two most popular. Both have lunchtime queues but fast turnover." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. Paris — Canal Saint-Martin Walk
  // ═══════════════════════════════════════════════════════════════
  "paris-canal-saint-martin-walk": {
    ja: ja(FR_JA_CTA,
      "パリ サンマルタン運河散歩：鉄橋とカフェのフォトジェニックな水辺",
      "映画『アメリ』にも登場したサンマルタン運河沿いを歩く。鉄の歩道橋、プラタナスの並木、個性的なカフェが並ぶパリジャンお気に入りの散歩道です。",
      PARIS_CANAL_IMAGES[0],
      PARIS_CANAL_IMAGES,
      PARIS_X,
      [
        { heading: "このルートの特徴", body: "サンマルタン運河は全長4.5kmの運河で、鉄の歩道橋と旋回橋、プラタナスの並木が絵になるパリ有数のフォトジェニックスポットです。映画『アメリ』のロケ地としても知られ、運河沿いにはテラスカフェやブティック、自然派ワインバーが並びます。観光客より地元のパリジャンが多く、パリのリアルな日常を感じられるルートです。9つの水門で船が上下する様子も見られます。" },
        { heading: "アクセスと起点", body: "メトロRepublique駅（3・5・8・9・11号線）から運河まで徒歩5分。運河に沿って北上し、Jaures駅（2・5・7bis号線）やStalingrad駅方面へ向かうルートが一般的です。南からスタートする場合はBastille駅から歩くとアルセナル港経由でアクセスできます。" },
        { heading: "主要スポット", body: "オテル・デュ・ノール（Hotel du Nord）は1938年の映画で有名なカフェレストランで、運河の象徴的な建物です。ケ・ド・ヴァルミーとケ・ド・ジェマップ沿いのカフェテラスはどれも雰囲気が良いです。ポワン・エフェメール（Point Ephemere）は元倉庫を改装したカルチャースペース。運河沿いは自転車も多いため歩道を確認して歩きましょう。" },
        { heading: "時間帯とタイミング", body: "午後の日差しが運河に反射する14時〜16時が写真に最適です。日曜は運河沿いの道路が歩行者天国になるエリアもあります。夏の夕方は運河沿いでピクニックをする地元民で賑わいます。冬場は17時に暗くなりますが、街灯に照らされた運河も美しいです。" },
        { heading: "実用情報", body: "カフェでの支払いはカード決済が基本。フランスではチップは義務ではありませんが、良いサービスには1〜2ユーロ置くのが一般的。トイレは各カフェの利用客用。eSIMがあればカフェやレストランの評価をその場で確認でき、運河の水門開閉スケジュールも調べられます。" },
      ],
      [
        { q: "サンマルタン運河の所要時間は？", a: "レピュブリック広場からジョレス駅まで歩くだけなら30分。カフェ休憩を挟んで1.5〜2時間が一般的です。" },
        { q: "映画アメリのロケ地はどこ？", a: "オテル・デュ・ノールの前の石の段差が有名なシーンの撮影場所です。建物にはプレートも掲示されています。" },
        { q: "夜の散歩は安全？", a: "運河沿いの大通りは夜でも比較的安全ですが、暗い裏通りは避けてください。スタリングラード駅周辺は夜間の治安がやや悪いため注意が必要です。" },
      ],
    ),
    en: en(FR_EN_CTA,
      "Paris Canal Saint-Martin Walk: Iron Bridges and Waterside Cafes",
      "Walk along the photogenic Canal Saint-Martin, past iron footbridges, plane trees, and terrace cafes. A favourite Parisian stroll featured in the film Amelie.",
      PARIS_CANAL_IMAGES[0],
      PARIS_CANAL_IMAGES,
      PARIS_X,
      [
        { heading: "Why this walk works", body: "Canal Saint-Martin is a 4.5 km waterway lined with iron footbridges, swing bridges, and plane trees that create one of Paris's most photogenic corridors. The canal is better known among Parisians than tourists, giving the walk an authentic neighbourhood feel. Terrace cafes, natural wine bars, and boutiques line the quays, and the nine locks let you watch boats rise and fall as they navigate the canal. The film Amelie brought the area international recognition, but the real draw is the relaxed, local atmosphere." },
        { heading: "How to get there", body: "Republique station (Metro lines 3, 5, 8, 9, 11) is five minutes' walk from the canal. The standard route follows the canal north to Jaures or Stalingrad station. Starting from Bastille and walking north via the Port de l'Arsenal is an alternative that adds the harbour section. The walk is flat throughout." },
        { heading: "Key stops", body: "Hotel du Nord is the landmark cafe-restaurant made famous by the 1938 film of the same name. The terraces along Quai de Valmy and Quai de Jemmapes are all pleasant for a coffee stop. Point Ephemere is a converted warehouse turned cultural space with exhibitions and live music. Watch for cyclists on the canal-side paths — stay on the pedestrian side." },
        { heading: "Best timing", body: "Afternoon light between 14:00 and 16:00 reflects beautifully off the canal surface. On Sundays, some canal-side roads become pedestrian-only. Summer evenings bring locals for canal-side picnics. In winter, darkness falls by 17:00, but the lamplit canal has its own charm." },
        { heading: "Practical tips", body: "Card payment is standard in French cafes. Tipping is not obligatory in France, but leaving one or two euros for good service is customary. Toilets are available for customers in cafes. An eSIM lets you check cafe reviews and look up lock-opening schedules on the spot." },
      ],
      [
        { q: "How long does the canal walk take?", a: "Walking from Republique to Jaures takes about 30 minutes without stops. With cafe breaks, allow 1.5 to 2 hours." },
        { q: "Where is the Amelie filming location?", a: "The stone steps in front of Hotel du Nord are the famous scene location. A plaque on the building marks the spot." },
        { q: "Is it safe to walk at night?", a: "The main canal-side roads are reasonably safe at night, but avoid dark side streets. The area around Stalingrad station can feel less secure after dark." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. Paris — Montmartre Backstreets Walk
  // ═══════════════════════════════════════════════════════════════
  "paris-montmartre-backstreets-walk": {
    ja: ja(FR_JA_CTA,
      "パリ モンマルトル裏通り散策：観光地の裏にある静かな丘の小路",
      "サクレクール寺院だけではないモンマルトル。観光客の少ない裏通り、ぶどう畑、古いキャバレーを巡る、地元民が愛する丘の散歩ガイドです。",
      PARIS_MONTMARTRE_IMAGES[0],
      PARIS_MONTMARTRE_IMAGES,
      PARIS_X,
      [
        { heading: "このルートの特徴", body: "モンマルトルの裏通りは、サクレクール寺院やテルトル広場の喧騒から数分歩くだけで驚くほど静かな住宅街に変わります。パリ唯一の現役ぶどう畑クロ・モンマルトル、ピカソやアポリネールが通ったキャバレー「ラパン・アジル」、風車のムーラン・ド・ラ・ギャレットなど、芸術の黄金時代の面影が残る路地を歩くルートです。急な階段が多いですが、その分パリを見下ろす眺望スポットが随所にあります。" },
        { heading: "アクセスと起点", body: "メトロAbbesses駅（12号線）がモンマルトルの丘の中腹にあり、最適な起点です。Anvers駅（2号線）からサクレクール正面のフニクレール（ケーブルカー）で上がることもできます。Lamarck-Caulaincourt駅（12号線）から裏側に入ると観光客が少なく、地元感があります。" },
        { heading: "主要スポット", body: "サクレクール寺院のドームからはパリ全域を360度見渡せます（有料）。テルトル広場は観光客向けですが、ここから北へ2ブロック歩くだけで静かな裏通りに入れます。クロ・モンマルトルのぶどう畑は外から見学可能で、毎年10月の収穫祭が有名。ラパン・アジルは現在もキャバレーとして営業中。モンマルトルは階段が多いため、歩きやすい靴が必須です。スリは特にフニクレール周辺で多発します。" },
        { heading: "時間帯とタイミング", body: "早朝7時〜9時がベストで、テルトル広場も人がまばらです。サクレクール寺院の日の出は最高のフォトチャンスですが冬場は寒さ対策が必要。平日はツアーバスが少なく、裏通りはほぼ無人です。" },
        { heading: "実用情報", body: "モンマルトルは坂と階段の連続なので体力と靴の準備を。カフェは丘の上にもいくつかありますが、観光地価格の店もあるため少し外れた通りの店がおすすめ。トイレはサクレクール寺院内と公衆トイレ（サニゼット）。eSIMがあれば急な天候変化も即座に確認でき、裏通りのルート検索にも便利です。" },
      ],
      [
        { q: "モンマルトルの裏通りは安全？", a: "日中は問題ありません。夜はピガール〜ブランシュ周辺（ムーランルージュ付近）がやや騒がしくなりますが、危険ではありません。暗い階段は避けましょう。" },
        { q: "所要時間は？", a: "裏通りを含めてゆっくり歩いて2〜3時間。サクレクール寺院のドーム登頂を含めると3〜4時間です。" },
        { q: "フニクレールは有料？", a: "通常のメトロチケット1枚で乗れます。Navigo Easyカードやスマホアプリの切符でも利用可能です。" },
      ],
    ),
    en: en(FR_EN_CTA,
      "Paris Montmartre Backstreets Walk: The Quiet Side of the Hill",
      "Go beyond Sacre-Coeur and Place du Tertre to discover Montmartre's quiet backstreets, its vineyard, historic cabarets, and panoramic viewpoints. A local's guide to Paris's most famous hill.",
      PARIS_MONTMARTRE_IMAGES[0],
      PARIS_MONTMARTRE_IMAGES,
      PARIS_X,
      [
        { heading: "Why this walk works", body: "Montmartre's backstreets transform from tourist hotspot to quiet residential village within two blocks of Place du Tertre. This route takes you past Clos Montmartre — the last working vineyard in Paris — the historic Au Lapin Agile cabaret where Picasso once drank, and the Moulin de la Galette windmill. The steep lanes deliver constant viewpoints over the Paris rooftops. The contrast between the crowded front of the hill and the silent back lanes is the real draw of this walk." },
        { heading: "How to get there", body: "Abbesses station (Metro line 12) sits midway up the hill and is the best starting point. Anvers station (line 2) connects to the funicular that climbs to Sacre-Coeur. For a less touristy start, use Lamarck-Caulaincourt station (line 12), which exits directly into the quiet backstreets. The funicular accepts standard Metro tickets." },
        { heading: "Key stops", body: "The Sacre-Coeur dome offers a 360-degree paid panorama across all of Paris. Place du Tertre is touristy but worth passing through — walk two blocks north and you enter silent residential lanes. Clos Montmartre vineyard is visible from the street and holds an annual harvest festival in October. Au Lapin Agile still operates as a cabaret. Montmartre involves many steep stairs — wear proper walking shoes. Pickpockets are especially active around the funicular and Sacre-Coeur steps." },
        { heading: "Best timing", body: "Early morning between 07:00 and 09:00 is ideal — even Place du Tertre is quiet. Sunrise at Sacre-Coeur is a top photo opportunity, though winter mornings are cold. Weekdays see fewer tour groups, and the backstreets are nearly empty." },
        { heading: "Practical tips", body: "Montmartre is a continuous series of hills and stairs, so fitness and footwear matter. Cafes on the hilltop exist but some charge tourist-area prices; try places one street off the main square. Toilets are inside Sacre-Coeur and in the public Sanisette units. An eSIM lets you check weather changes quickly and navigate the backstreet maze without losing your way." },
      ],
      [
        { q: "Are the Montmartre backstreets safe?", a: "Daytime is fine. At night, the Pigalle and Blanche area around Moulin Rouge can be rowdy but is not dangerous. Avoid unlit stairways after dark." },
        { q: "How long does the walk take?", a: "The backstreet route takes 2 to 3 hours at a relaxed pace. Add an hour for the Sacre-Coeur dome climb." },
        { q: "Is the funicular free?", a: "It costs one standard Metro ticket. Navigo Easy cards and mobile tickets work as well." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. Paris — Latin Quarter Walk
  // ═══════════════════════════════════════════════════════════════
  "paris-latin-quarter-walk": {
    ja: ja(FR_JA_CTA,
      "パリ カルチェラタン散策：書店と学生街のセーヌ左岸歩き",
      "シェイクスピア・アンド・カンパニー書店、パンテオン、ムフタール通りを巡るカルチェラタンの街歩き。パリの知性と庶民性が交差する左岸の学生街を歩きます。",
      PARIS_LATIN_QUARTER_IMAGES[0],
      PARIS_LATIN_QUARTER_IMAGES,
      PARIS_X,
      [
        { heading: "このルートの特徴", body: "カルチェラタンはソルボンヌ大学を中心とした学生街で、中世からパリの知識人が集まるエリアです。セーヌ川沿いのシェイクスピア・アンド・カンパニー書店は世界的に有名な英語書店。パンテオンにはヴォルテール、ユゴー、キュリー夫人が眠ります。ムフタール通りはパリ最古級の市場通りで、チーズ、ワイン、パンの専門店が並びます。観光地でありながら学生の日常が息づく、パリらしい二面性のあるルートです。" },
        { heading: "アクセスと起点", body: "メトロSaint-Michel駅（4号線）またはCluny-La Sorbonne駅（10号線）が便利。RER B線のSaint-Michel-Notre-Dame駅も使えます。シェイクスピア・アンド・カンパニー書店はSaint-Michel駅から徒歩3分、ノートルダム大聖堂の対岸にあります。" },
        { heading: "主要スポット", body: "シェイクスピア・アンド・カンパニー書店は1951年開業で、店内で読書や休憩ができる独特の空間です。パンテオンは入場有料でフーコーの振り子も見られます。ムフタール通りは火〜日の午前が市場の賑わいがあり、月曜は多くの店が休みです。リュクサンブール公園はパリ左岸の代表的な庭園で無料入場。ソルボンヌ大学の建物は外観見学のみ。" },
        { heading: "時間帯とタイミング", body: "午前中にムフタール通りの市場を歩き、午後にパンテオンとリュクサンブール公園を回るのが効率的です。大学が始まる10月以降は学生で活気がありますが、7〜8月は静かです。日曜午前はムフタール通りの雰囲気が最高です。" },
        { heading: "実用情報", body: "カルチェラタンは飲食店が密集していますが、観光客向けの低品質な店も混在しています。セーヌ沿いの店よりも一本入った通りのビストロがおすすめ。トイレはパンテオン内とリュクサンブール公園内にあります。eSIMがあればレストランの口コミをその場で確認でき、観光客向けの罠を避けられます。" },
      ],
      [
        { q: "カルチェラタンの所要時間は？", a: "主要スポットを回って2〜3時間。リュクサンブール公園でゆっくりすると半日です。" },
        { q: "ムフタール通りは毎日開いている？", a: "火曜〜日曜の午前中が市場のピーク。月曜は多くの店が休みです。日曜午前が最も活気があります。" },
        { q: "学生でなくても楽しめる？", a: "もちろんです。書店、市場、パンテオン、公園と見どころが多く、年齢を問わず楽しめるエリアです。" },
      ],
    ),
    en: en(FR_EN_CTA,
      "Paris Latin Quarter Walk: Bookshops and the Student District",
      "Walk the Left Bank from Shakespeare and Company past the Pantheon to Rue Mouffetard's food market. A route through the intellectual heart of Paris where medieval lanes meet student life.",
      PARIS_LATIN_QUARTER_IMAGES[0],
      PARIS_LATIN_QUARTER_IMAGES,
      PARIS_X,
      [
        { heading: "Why this walk works", body: "The Latin Quarter has been the intellectual centre of Paris since the Sorbonne was founded in 1257. Shakespeare and Company, the legendary English-language bookshop on the Seine, anchors the start. The Pantheon holds the remains of Voltaire, Hugo, and Marie Curie. Rue Mouffetard is one of the oldest market streets in Paris, lined with specialist cheese, wine, and bread shops. The area blends tourism with genuine student-neighbourhood life in a way few Paris districts still manage." },
        { heading: "How to get there", body: "Saint-Michel station (Metro line 4) or Cluny-La Sorbonne (line 10) are the most convenient stops. RER B's Saint-Michel-Notre-Dame station also works. Shakespeare and Company is a three-minute walk from Saint-Michel, directly across the Seine from Notre-Dame Cathedral." },
        { heading: "Key stops", body: "Shakespeare and Company has been open since 1951 and lets visitors browse and read in its cramped, atmospheric interior. The Pantheon charges admission and also houses Foucault's pendulum. Rue Mouffetard's market is liveliest Tuesday to Sunday mornings; most shops close on Mondays. The Jardin du Luxembourg is the Left Bank's signature park and free to enter. The Sorbonne is viewable from the outside only." },
        { heading: "Best timing", body: "Visit Rue Mouffetard's market in the morning and the Pantheon and Luxembourg Gardens in the afternoon. The university term from October onwards adds student energy; July and August are quieter. Sunday mornings offer the best atmosphere on Rue Mouffetard." },
        { heading: "Practical tips", body: "The Latin Quarter is dense with restaurants, but tourist-trap eateries with poor quality cluster near the Seine. Look for bistros on side streets one block away from the river. Toilets are inside the Pantheon and in the Luxembourg Gardens. An eSIM lets you check restaurant reviews on the spot and avoid the tourist traps." },
      ],
      [
        { q: "How long does the Latin Quarter walk take?", a: "Allow 2 to 3 hours for the main sights. Add more time if you want to relax in the Luxembourg Gardens." },
        { q: "Is Rue Mouffetard open every day?", a: "The market is best Tuesday to Sunday mornings. Many shops close on Mondays. Sunday morning is the most atmospheric." },
        { q: "Do I need to be a student to enjoy it?", a: "Not at all. The bookshop, market, Pantheon, and gardens make this a great walk for any visitor regardless of age." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. Paris — Belleville Walk
  // ═══════════════════════════════════════════════════════════════
  "paris-belleville-walk": {
    ja: ja(FR_JA_CTA,
      "パリ ベルヴィル散策：多文化の丘と絶景パノラマ",
      "パリ屈指の多文化エリア、ベルヴィルの丘を歩く。ストリートアート、中華街、北アフリカ料理、そしてパリを一望する公園の展望台を巡る地元密着型ルートです。",
      PARIS_BELLEVILLE_IMAGES[0],
      PARIS_BELLEVILLE_IMAGES,
      PARIS_X,
      [
        { heading: "このルートの特徴", body: "ベルヴィルはパリ20区の丘の上にある多文化エリアで、中国系、北アフリカ系、ユダヤ系など多様なコミュニティが共存しています。ベルヴィル公園の展望台からはエッフェル塔からサクレクールまでパリを一望でき、観光客がほぼいない穴場ビューポイントです。ストリートアートがマレ地区に匹敵する規模で展開され、住宅街の壁面に大規模な壁画が描かれています。エディット・ピアフの生まれた街としても知られています。" },
        { heading: "アクセスと起点", body: "メトロBelleville駅（2・11号線）が最寄り。Couronnes駅（2号線）やPyrenes駅（11号線）からも入れます。ベルヴィル大通りを北上し、公園を経由してメニルモンタン方面に抜けるルートが一般的です。" },
        { heading: "主要スポット", body: "ベルヴィル公園の展望テラスはパリ屈指のパノラマスポットで無料。ベルヴィル大通りにはアジア食材店や北アフリカ料理のレストランが並びます。リュ・ドゥノワイエ周辺がストリートアートの密集地。ペール・ラシェーズ墓地はメニルモンタンから徒歩圏内で、ショパン、ジム・モリソン、オスカー・ワイルドの墓があります。" },
        { heading: "時間帯とタイミング", body: "午前中の早い時間帯は地元の人々の日常が見られ、ベルヴィル大通りの市場（火・金）は午前中のみ。展望台は午後の方がパリ中心部に日が当たり写真映えします。夕暮れ時の眺望は特に美しいですが、暗くなったら公園からは出ましょう。" },
        { heading: "実用情報", body: "ベルヴィルの飲食店はパリ中心部より安価で、本格的なアジア料理や北アフリカ料理を楽しめます。トイレは公園内にあります。このエリアは夜間の治安がやや不安定なため、暗くなる前に散策を終えるのがおすすめ。eSIMがあればストリートアートのアーティスト情報やレストランの口コミをその場で調べられます。" },
      ],
      [
        { q: "ベルヴィルは安全？", a: "日中は問題ありません。多文化エリアですが治安は悪くなく、家族連れも多いです。ただし夜間は公園内や暗い裏通りは避けてください。" },
        { q: "所要時間は？", a: "ベルヴィル公園からメニルモンタンを回って2〜3時間。ペール・ラシェーズ墓地を含めると半日です。" },
        { q: "食事のおすすめは？", a: "ベルヴィル大通り沿いの中華料理店、特に手打ち麺の店がおすすめ。北アフリカ料理のクスクスも本格的な店が多いです。" },
      ],
    ),
    en: en(FR_EN_CTA,
      "Paris Belleville Walk: Multicultural Hill with Panoramic Views",
      "Explore Belleville's multicultural streets, street art, and the hilltop park with one of Paris's best panoramic viewpoints. A local neighbourhood walk far from the tourist centre.",
      PARIS_BELLEVILLE_IMAGES[0],
      PARIS_BELLEVILLE_IMAGES,
      PARIS_X,
      [
        { heading: "Why this walk works", body: "Belleville sits on a hill in the 20th arrondissement where Chinese, North African, and Jewish communities coexist. Parc de Belleville's terrace offers a panorama from the Eiffel Tower to Sacre-Coeur with almost no tourists. Street art here rivals the Marais in scale, with large murals covering residential walls. Edith Piaf was born in Belleville, and the neighbourhood retains a working-class energy that most central Paris districts have lost. This is the most authentic Paris walk on this list." },
        { heading: "How to get there", body: "Belleville station (Metro lines 2 and 11) is the main entry point. Couronnes (line 2) and Pyrenees (line 11) are alternatives. The typical route heads north along Boulevard de Belleville, through the park, and into Menilmontant towards Pere Lachaise cemetery." },
        { heading: "Key stops", body: "Parc de Belleville's viewing terrace is free and gives one of Paris's best panoramas. Boulevard de Belleville is lined with Asian grocery stores and North African restaurants. Rue Denoyez and surrounding streets concentrate the area's street art. Pere Lachaise cemetery is walking distance from Menilmontant and holds the graves of Chopin, Jim Morrison, and Oscar Wilde." },
        { heading: "Best timing", body: "Early morning reveals local daily life, and the Boulevard de Belleville market (Tuesday and Friday) runs mornings only. The viewpoint photographs better in the afternoon when the sun lights central Paris. Sunset views are spectacular, but leave the park before dark." },
        { heading: "Practical tips", body: "Belleville's restaurants are cheaper than central Paris and serve authentic Asian and North African food. Toilets are available in the park. The area can feel rough after dark, so plan to finish your walk before sunset. An eSIM lets you look up street art artists and check restaurant reviews on the spot." },
      ],
      [
        { q: "Is Belleville safe?", a: "Daytime is fine. The multicultural area is lively and families are common. Avoid the park interior and poorly lit side streets after dark." },
        { q: "How long does the walk take?", a: "Belleville park to Menilmontant takes 2 to 3 hours. Add more time if you include Pere Lachaise cemetery." },
        { q: "Where should I eat?", a: "Try the hand-pulled noodle shops on Boulevard de Belleville or the authentic North African couscous restaurants. Both are significantly cheaper than central Paris equivalents." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. Barcelona — Born Quarter Walk
  // ═══════════════════════════════════════════════════════════════
  "barcelona-born-quarter-walk": {
    ja: ja(ES_JA_CTA,
      "バルセロナ エルボルン地区散策：中世の路地とゴシック教会",
      "カタルーニャ・ゴシックの傑作サンタ・マリア・デル・マル教会を中心に、中世の路地、ピカソ美術館、旧市場の遺跡を巡るエルボルン地区の街歩きガイドです。",
      BARCELONA_BORN_IMAGES[0],
      BARCELONA_BORN_IMAGES,
      BARCELONA_X,
      [
        { heading: "このルートの特徴", body: "エルボルン地区はバルセロナ旧市街の東側に位置し、計画的なアシャンプラ地区とは対照的な中世の細い路地が入り組んだエリアです。カタルーニャ・ゴシックの最高傑作サンタ・マリア・デル・マル教会、ピカソ美術館、1714年のバルセロナの遺跡を保存する旧ボルン市場と、歴史の層が凝縮されています。夜はパセジュ・デル・ボルン沿いにカクテルバーが並び、バルセロナの洗練されたナイトライフも楽しめます。" },
        { heading: "アクセスと起点", body: "メトロJaume I駅（L4号線）から徒歩3分でエルボルン地区に入ります。Barceloneta駅（L4号線）やArc de Triomf駅（L1号線）からもアクセス可能。バルセロナの交通カードT-Casualが10回分の乗車券で便利です。" },
        { heading: "主要スポット", body: "サンタ・マリア・デル・マル教会はわずか54年で完成したカタルーニャ・ゴシックの傑作で、入場無料（屋上テラスは有料）。ピカソ美術館はカレル・モンカダの中世邸宅5棟を連結した美術館で事前予約必須。旧ボルン市場は鉄骨屋根の下に1714年の街並みの遺跡が発掘展示されています。シウタデリャ公園は散歩の仕上げに最適。スリはバルセロナ全域で多いため、スマートフォンをテーブルに置かない、バッグは体の前に持つなど基本対策を。" },
        { heading: "時間帯とタイミング", body: "午前中の早い時間が最も空いています。スペインのシエスタ文化で14時〜17時頃は一部の個人商店が閉まります。夕方18時以降は再びオープンし、夜のテラスバーが賑わい始めます。日曜は観光施設の営業時間が短いため注意。" },
        { heading: "実用情報", body: "スペインではカード決済が一般的ですが、小さなバルでは現金を好む場合もあります。トイレはサンタ・マリア・デル・マル教会付近のカフェを利用。シエスタ時間帯（14〜17時）はレストランが準備中になるため、昼食は13時台に済ませるのがおすすめ。eSIMがあれば予約サイトにすぐアクセスでき、レストランの空き状況もリアルタイムで確認できます。" },
      ],
      [
        { q: "エルボルン地区の所要時間は？", a: "主要スポットを回って2〜3時間。ピカソ美術館をじっくり見ると半日です。" },
        { q: "シエスタで店は閉まる？", a: "大型の観光施設は通し営業ですが、個人経営のブティックやカフェは14時〜17時頃に閉まることがあります。" },
        { q: "治安は？", a: "日中は安全ですが、バルセロナはスリの多い都市として知られています。スマートフォンを手に持ったまま歩かない、バッグのファスナーを閉じるなど基本対策を徹底してください。" },
      ],
    ),
    en: en(ES_EN_CTA,
      "Barcelona Born Quarter Walk: Medieval Lanes and Gothic Church",
      "Explore El Born's medieval alleys, the Catalan Gothic masterpiece Santa Maria del Mar, the Picasso Museum, and the archaeological remains beneath the old Born Market. A compact old-town walk.",
      BARCELONA_BORN_IMAGES[0],
      BARCELONA_BORN_IMAGES,
      BARCELONA_X,
      [
        { heading: "Why this walk works", body: "El Born is Barcelona's most historically layered neighbourhood. Its narrow medieval lanes predate the gridded Eixample by centuries. Santa Maria del Mar is a Catalan Gothic masterpiece completed in just 54 years. The Picasso Museum occupies five connected medieval mansions. The old Born Market's iron roof shelters archaeological remains of the city as it existed in 1714. At night, Passeig del Born becomes a cocktail-bar strip. The density of history and nightlife in this small area is unmatched in Barcelona." },
        { heading: "How to get there", body: "Jaume I station (Metro L4) is three minutes' walk from El Born. Barceloneta (L4) and Arc de Triomf (L1) are alternatives. A T-Casual transport card gives ten journeys at a discounted rate and works on Metro, bus, and tram." },
        { heading: "Key stops", body: "Santa Maria del Mar is free to enter (rooftop terrace is paid). The Picasso Museum on Carrer Montcada requires advance booking. The old Born Market displays excavated 1714 street remains beneath its iron roof. Parc de la Ciutadella makes a pleasant finish. Pickpocketing is a serious problem throughout Barcelona — never leave your phone on a table, and keep bags closed and in front of you." },
        { heading: "Best timing", body: "Early morning is the quietest time. Spain's siesta culture means some independent shops close between 14:00 and 17:00. Shops reopen around 18:00, and the terrace bars fill up in the evening. Sunday hours are shorter for most attractions." },
        { heading: "Practical tips", body: "Card payment is standard in Spain, though some small bars prefer cash. Use cafe toilets near Santa Maria del Mar. Restaurants close their kitchens between lunch and dinner — eat lunch by 13:30 to avoid the gap. An eSIM lets you access booking sites and check restaurant availability in real time." },
      ],
      [
        { q: "How long does the Born Quarter walk take?", a: "Allow 2 to 3 hours for the main sights. The Picasso Museum alone can fill a half day." },
        { q: "Do shops close for siesta?", a: "Major tourist attractions stay open, but independent boutiques and cafes may close between 14:00 and 17:00." },
        { q: "Is it safe?", a: "Daytime is safe, but Barcelona has a serious pickpocket problem. Do not walk with your phone in your hand, and keep bag zips closed at all times." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. Barcelona — Gracia Neighbourhood Walk
  // ═══════════════════════════════════════════════════════════════
  "barcelona-gracia-neighborhood-walk": {
    ja: ja(ES_JA_CTA,
      "バルセロナ グラシア地区散策：ローカル広場とガウディの処女作",
      "かつて独立した村だったグラシア地区の広場めぐり。テラスカフェ、ガウディ初期作品カサ・ビセンス、地元の市場を巡る、バルセロナのもうひとつの顔を知る散歩です。",
      BARCELONA_GRACIA_IMAGES[0],
      BARCELONA_GRACIA_IMAGES,
      BARCELONA_X,
      [
        { heading: "このルートの特徴", body: "グラシアは19世紀までバルセロナとは別の独立した町で、今もその独自のアイデンティティを保っています。複数の小さな広場にテラスカフェが並び、地元の人々が日常的に集まる場所です。ガウディの最初の主要作品カサ・ビセンスがあり、2017年から美術館として公開されています。8月のフェスタ・マジョールでは住民が通りを手作りで装飾する伝統があり、世界でもユニークな祭りとして知られています。" },
        { heading: "アクセスと起点", body: "メトロFontana駅（L3号線）またはDiagonal駅（L3・L5号線）が最寄り。Diagonal駅からパセジュ・デ・グラシアを北上し、グラシア大通りに入るルートが分かりやすいです。バスならV15、22番がグラシア中心部を通ります。" },
        { heading: "主要スポット", body: "プラサ・デル・ソルはグラシアの中心広場で、夕方からテラスが満席になります。プラサ・デ・ラ・ビラ・デ・グラシアは時計塔のある象徴的な広場。カサ・ビセンスはガウディの処女作で、東洋風のタイル装飾が見事（事前予約推奨）。アバセリア市場は地元の食材市場です。グラシアは比較的安全ですが、広場の混雑時にはスリに注意。" },
        { heading: "時間帯とタイミング", body: "午前中に市場とカサ・ビセンスを見学し、午後に広場のカフェでくつろぐのがおすすめ。8月中旬のフェスタ・マジョール期間中は通りの装飾が圧巻ですが混雑も激しいです。日曜はほとんどの店が閉まるため、平日か土曜がベスト。" },
        { heading: "実用情報", body: "グラシアの飲食店はバルセロナ中心部より安価で、地元向けの本格的なカタルーニャ料理が楽しめます。トイレはカフェの利用客用。eSIMがあればカサ・ビセンスの空き状況をその場で確認でき、レストランの予約も可能です。" },
      ],
      [
        { q: "グラシアの所要時間は？", a: "広場めぐりとカサ・ビセンスで2〜3時間。ゆっくりカフェを楽しむなら半日です。" },
        { q: "フェスタ・マジョールはいつ？", a: "毎年8月中旬の1週間。各通りが独自のテーマで手作り装飾を競い合います。無料で誰でも楽しめます。" },
        { q: "グエル公園は近い？", a: "グラシアの北端から徒歩20分でグエル公園に行けます。坂道が多いですが、グラシア散策と組み合わせるのは良いプランです。" },
      ],
    ),
    en: en(ES_EN_CTA,
      "Barcelona Gracia Neighbourhood Walk: Local Squares and Gaudi's First Work",
      "Explore Gracia's village squares, terrace cafes, and Casa Vicens — Gaudi's first major building. A neighbourhood walk through Barcelona's most independent-minded district.",
      BARCELONA_GRACIA_IMAGES[0],
      BARCELONA_GRACIA_IMAGES,
      BARCELONA_X,
      [
        { heading: "Why this walk works", body: "Gracia was an independent town until the 19th century and still feels distinct from Barcelona. Its identity centres on small squares filled with terrace cafes where locals gather daily. Casa Vicens, Gaudi's first major commission, opened as a museum in 2017 and shows the architect's earliest tile work. The August Festa Major sees residents hand-decorate entire streets in a competition that is one of the most unique festivals in Europe. Gracia delivers a side of Barcelona most tourists never find." },
        { heading: "How to get there", body: "Fontana station (Metro L3) or Diagonal station (L3, L5) are the closest stops. Walking north from Diagonal up Passeig de Gracia and into the neighbourhood is straightforward. Buses V15 and 22 pass through central Gracia." },
        { heading: "Key stops", body: "Placa del Sol is Gracia's social hub, packed with terrace cafes from late afternoon. Placa de la Vila de Gracia has the neighbourhood's emblematic clock tower. Casa Vicens features stunning Orientalist tile work and advance booking is recommended. Mercat de l'Abaceria is the local food market. Gracia is relatively safe, but watch for pickpockets in crowded squares." },
        { heading: "Best timing", body: "Visit the market and Casa Vicens in the morning, then relax at a square cafe in the afternoon. The Festa Major in mid-August brings spectacular street decorations but heavy crowds. Most shops close on Sundays, so weekdays or Saturdays are best." },
        { heading: "Practical tips", body: "Gracia's restaurants are cheaper than central Barcelona and serve authentic Catalan food for locals. Use cafe toilets. An eSIM lets you check Casa Vicens availability on the spot and make restaurant reservations." },
      ],
      [
        { q: "How long does the Gracia walk take?", a: "Allow 2 to 3 hours for the squares and Casa Vicens. A leisurely cafe-hopping half day is also rewarding." },
        { q: "When is the Festa Major?", a: "Mid-August, lasting about a week. Residents compete to create the most elaborate street decorations. Free and open to everyone." },
        { q: "Is Park Guell nearby?", a: "Park Guell is about a 20-minute uphill walk from the northern edge of Gracia. Combining both in one day is a good plan." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. Barcelona — Barceloneta Morning Walk
  // ═══════════════════════════════════════════════════════════════
  "barcelona-barceloneta-morning-walk": {
    ja: ja(ES_JA_CTA,
      "バルセロナ バルセロネータの朝散歩：ビーチと漁師町の朝",
      "朝のバルセロネータビーチを歩き、旧漁師町の路地と海鮮市場を巡る。地中海の朝日とシーフードを楽しむ朝型の散歩ガイドです。",
      BARCELONA_BARCELONETA_IMAGES[0],
      BARCELONA_BARCELONETA_IMAGES,
      BARCELONA_X,
      [
        { heading: "このルートの特徴", body: "バルセロネータは1753年にシウタデリャ要塞の建設で立ち退かされた住民のために作られた漁師町で、バルセロナの中ではグリッド状の独特な街並みが特徴です。朝のビーチはジョガーやスイマーが主役で、11時以降の混雑とはまったく異なる静かな地中海を体験できます。ビーチ沿いに歩いてポート・オリンピックまで行けば、1992年オリンピックの遺産も見られます。新鮮なシーフードのランチで締めくくるのが理想的なルートです。" },
        { heading: "アクセスと起点", body: "メトロBarceloneta駅（L4号線）から徒歩5分でビーチに出ます。バスならD20、V15、59番が便利。旧市街のゴシック地区からも徒歩15分でアクセス可能です。" },
        { heading: "主要スポット", body: "バルセロネータビーチは朝8時前なら人が少なく、海辺を独占できます。バルセロネータ市場はリニューアルされた建物内で新鮮な魚介が買えます。Wホテルのあるビーチの南端は散歩の折り返し地点。ポート・オリンピックは北端のマリーナエリア。ビーチでは貴重品の管理に注意し、無人のタオルの上に荷物を置かないでください。" },
        { heading: "時間帯とタイミング", body: "朝7時〜9時がこの散歩のベストタイム。10時以降はビーチが混み始めます。市場は午前中の早い時間帯がもっとも活気があります。夏のランチタイム（13時〜15時）はシーフードレストランが混雑するため、13時前に入るのがおすすめ。" },
        { heading: "実用情報", body: "ビーチ沿いのレストランは観光客価格の店が多いため、1〜2本内側の通りの店がコスパ良好です。トイレはビーチに公衆トイレがありますが清潔さにはばらつきがあります。市場内のトイレが比較的きれいです。日焼け止めは必須。eSIMがあればビーチの混雑状況や気温をリアルタイムで確認でき、レストランの予約もスムーズです。" },
      ],
      [
        { q: "バルセロネータの朝散歩の所要時間は？", a: "ビーチ散歩と市場で1.5〜2時間。シーフードランチを含めると3時間です。" },
        { q: "泳げる？", a: "はい、ビーチは無料で利用できます。夏は監視員がいますが、冬は自己責任です。ロッカーはないので貴重品管理に注意。" },
        { q: "ビーチでの盗難は多い？", a: "残念ながらバルセロネータビーチでの盗難は頻発しています。泳ぐ時は最小限の持ち物にし、防水ポーチで貴重品を身につけるのが安全です。" },
      ],
    ),
    en: en(ES_EN_CTA,
      "Barcelona Barceloneta Morning Walk: Beach and Fishing Quarter at Dawn",
      "Walk Barceloneta beach in the early morning, explore the old fishing quarter's grid streets, and finish with a seafood lunch. A Mediterranean morning route before the crowds arrive.",
      BARCELONA_BARCELONETA_IMAGES[0],
      BARCELONA_BARCELONETA_IMAGES,
      BARCELONA_X,
      [
        { heading: "Why this walk works", body: "Barceloneta was built in 1753 as a grid-plan fishing quarter and retains its working-class character. The beach before 09:00 belongs to joggers and swimmers, offering a completely different experience from the packed afternoon scene. Walking the beachfront north to Port Olimpic adds the 1992 Olympic legacy. The route finishes naturally with a seafood lunch at one of the neighbourhood's traditional restaurants. This is the best morning walk in Barcelona." },
        { heading: "How to get there", body: "Barceloneta station (Metro L4) is five minutes from the beach. Buses D20, V15, and 59 are alternatives. The Gothic Quarter is a 15-minute walk away." },
        { heading: "Key stops", body: "Barceloneta beach before 08:00 is nearly empty. The renovated Barceloneta market has fresh seafood stalls. The W Hotel marks the southern tip and a natural turnaround point. Port Olimpic at the northern end is the marina built for the 1992 Games. Do not leave belongings unattended on the beach — theft is common." },
        { heading: "Best timing", body: "The sweet spot is 07:00 to 09:00. After 10:00 the beach fills up. The market is liveliest early in the morning. Summer lunch at seafood restaurants (13:00 to 15:00) gets crowded, so arrive before 13:00." },
        { heading: "Practical tips", body: "Beachfront restaurants charge tourist prices — places one or two streets inland are better value. Beach toilets vary in cleanliness; the market toilets are more reliable. Sunscreen is essential. An eSIM lets you check beach conditions and make restaurant bookings in real time." },
      ],
      [
        { q: "How long does the morning walk take?", a: "Beach walk and market visit take 1.5 to 2 hours. Add a seafood lunch for a 3-hour morning." },
        { q: "Can I swim?", a: "Yes, the beach is free. Lifeguards are present in summer. There are no lockers, so manage valuables carefully." },
        { q: "Is beach theft a real problem?", a: "Unfortunately yes. Barceloneta beach has frequent theft. Swim with minimal belongings and use a waterproof pouch for valuables." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. Amsterdam — Jordaan Walk
  // ═══════════════════════════════════════════════════════════════
  "amsterdam-jordaan-walk": {
    ja: ja(NL_JA_CTA,
      "アムステルダム ヨルダン地区散策：運河と裏通りの散歩道",
      "アムステルダムでもっとも絵になるヨルダン地区の運河沿いを歩く。ハウスボート、隠れた中庭（ホフィエ）、ノーダーマーケットを巡る地元密着型ルートです。",
      AMSTERDAM_JORDAAN_IMAGES[0],
      AMSTERDAM_JORDAAN_IMAGES,
      AMSTERDAM_X,
      [
        { heading: "このルートの特徴", body: "ヨルダン地区はアムステルダムの運河地帯の中でもっとも写真映えするエリアです。狭い運河にハウスボートが並び、17世紀の商人の家が建ち並ぶ光景は「アムステルダムといえば」のイメージそのものです。ホフィエと呼ばれる隠れた中庭（元救貧院）がいくつも残り、静かに覗くことができます。アンネ・フランクの家もこの地区にあり、ウェステルケルクの塔からは地区全体を見渡せます。" },
        { heading: "アクセスと起点", body: "トラム13・17番のWestermarkt停留所が最寄り。中央駅から徒歩15分でもアクセスできます。アムステルダムの交通はOVチップカードまたはコンタクトレス決済で利用できます。GVB（市営交通）の1日券もコスパが良いです。" },
        { heading: "主要スポット", body: "アンネ・フランクの家はプリンセン運河沿いにあり、オンラインでの事前予約が必須で数週間前に売り切れます。ウェステルケルクはアムステルダム最高の教会塔で、ヨルダン全体を見渡せます。ノーダーマーケットは土曜がファーマーズマーケット、月曜がフリーマーケット。ブラウワースフラフト運河はアムステルダムで最も美しい運河として知られています。自転車が非常に多いため、自転車レーンを歩かないよう注意してください。" },
        { heading: "時間帯とタイミング", body: "朝の光が運河に反射する9時〜11時が最も写真映えします。土曜午前のノーダーマーケットは地元の雰囲気が抜群。アンネ・フランクの家は早朝か夕方の枠が比較的取りやすいです。4〜5月はチューリップの季節で運河沿いに花が咲きます。" },
        { heading: "実用情報", body: "オランダはほぼ完全キャッシュレス社会で、現金を受け付けない店も増えています。カード決済が基本です。トイレはカフェを利用するか、公衆トイレ（0.50ユーロ程度）。ヨルダンは石畳が多いため歩きやすい靴を。天気は変わりやすく、1日に晴れ・雨・風が繰り返されるため、レインジャケットは必携です。eSIMがあればアンネ・フランクの家のチケット空き状況を随時チェックできます。" },
      ],
      [
        { q: "ヨルダン地区の所要時間は？", a: "運河沿いの散歩とマーケットで2〜3時間。アンネ・フランクの家を含めると半日です。" },
        { q: "アンネ・フランクの家のチケットは？", a: "オンラインでの事前予約が必須で、数週間前に売り切れることが多いです。当日券はありません。公式サイトで発売日を確認し、発売開始と同時に購入するのがおすすめです。" },
        { q: "自転車に注意が必要？", a: "はい、アムステルダムでは自転車が交通の中心です。自転車レーンは赤く塗られていることが多いですが、目印がない場合もあります。レーン上に立ち止まると非常に危険です。" },
      ],
    ),
    en: en(NL_EN_CTA,
      "Amsterdam Jordaan Walk: Canals and Hidden Courtyards",
      "Walk the Jordaan's canal-side streets past houseboats, hidden hofjes, and the Noordermarkt. Amsterdam's most photogenic neighbourhood explored on foot.",
      AMSTERDAM_JORDAAN_IMAGES[0],
      AMSTERDAM_JORDAAN_IMAGES,
      AMSTERDAM_X,
      [
        { heading: "Why this walk works", body: "The Jordaan is Amsterdam's most photographed neighbourhood. Narrow canals lined with houseboats and 17th-century merchants' houses create the classic Amsterdam image. Hidden hofjes — former almshouse courtyards — are scattered through the area, offering peaceful glimpses behind the canal facades. The Anne Frank House sits on Prinsengracht, and the Westerkerk tower gives an overview of the entire district. The Jordaan concentrates Amsterdam's character into a small, walkable grid." },
        { heading: "How to get there", body: "Tram 13 and 17 stop at Westermarkt, the most convenient starting point. Central Station is a 15-minute walk. Use an OV-chipkaart or contactless payment for Amsterdam public transport. A GVB day pass offers good value if you plan multiple journeys." },
        { heading: "Key stops", body: "The Anne Frank House on Prinsengracht requires online advance booking — tickets sell out weeks ahead. Westerkerk has Amsterdam's tallest church tower with views across the Jordaan. The Noordermarkt hosts a farmers market on Saturdays and a flea market on Mondays. Brouwersgracht is often called Amsterdam's most beautiful canal. Watch out for cyclists — Amsterdam's bike lanes are busy and stepping into one is dangerous." },
        { heading: "Best timing", body: "Morning light between 09:00 and 11:00 reflects best off the canal surfaces. Saturday morning at the Noordermarkt has the strongest local atmosphere. Anne Frank House slots are easier to get for early morning or evening times. April and May bring tulip season, with flowers along the canals." },
        { heading: "Practical tips", body: "The Netherlands is nearly cashless — many shops do not accept cash at all. Card payment is the default. Toilets are available in cafes or in public facilities for about 0.50 euros. The Jordaan's cobblestones require comfortable shoes. Weather changes rapidly — sun, rain, and wind can cycle through in a single day, so carry a rain jacket. An eSIM lets you check Anne Frank House ticket availability throughout the day." },
      ],
      [
        { q: "How long does the Jordaan walk take?", a: "Canal-side strolling and the market take 2 to 3 hours. Add the Anne Frank House for a half day." },
        { q: "How do I get Anne Frank House tickets?", a: "Online advance booking is mandatory — there are no walk-up tickets. Tickets sell out weeks ahead. Check the official site for release dates and book the moment they become available." },
        { q: "Do I need to watch for cyclists?", a: "Yes. Bikes are the primary transport in Amsterdam. Cycle lanes are often painted red but not always marked. Never stand in a cycle lane — it is genuinely dangerous." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 15. Amsterdam — De Pijp Walk
  // ═══════════════════════════════════════════════════════════════
  "amsterdam-de-pijp-walk": {
    ja: ja(NL_JA_CTA,
      "アムステルダム デ・パイプ散策：アルバートカイプ市場と多文化グルメ",
      "アムステルダム最大の屋外市場アルバートカイプマーケットを中心に、多国籍レストラン、公園、クラフトビールのブルワリーを巡るデ・パイプ地区のガイドです。",
      AMSTERDAM_DE_PIJP_IMAGES[0],
      AMSTERDAM_DE_PIJP_IMAGES,
      AMSTERDAM_X,
      [
        { heading: "このルートの特徴", body: "デ・パイプは1880年代に労働者向けに建設された地区で、現在はアムステルダムでもっとも多文化なエリアのひとつです。アルバートカイプマーケットは月曜〜土曜に300以上の露店が並ぶアムステルダム最大の屋外市場。スリナム料理、トルコ料理、モロッコ料理など多国籍の飲食店が密集し、「食の国連」とも呼ばれています。サルファティパークでは地元民がピクニックを楽しみ、ハイネケン体験館も徒歩圏内です。" },
        { heading: "アクセスと起点", body: "トラム16・24番のAlbert Cuypstraat停留所が最寄り。メトロDe Pijp駅（Noord/Zuid線）も便利です。中央駅からメトロで約10分。トラムやメトロはOVチップカードまたはコンタクトレスで利用できます。" },
        { heading: "主要スポット", body: "アルバートカイプマーケットは月〜土の9時〜17時に営業。オランダ名物のストロープワッフルやハーリング（生ニシン）をその場で食べられます。マリー・ハイネケン広場はテラスカフェが並ぶ社交の中心。サルファティパークは小さいながらも緑豊かな憩いの場。ハイネケン体験館は旧醸造所を改装した体験型ミュージアムです（要予約）。" },
        { heading: "時間帯とタイミング", body: "午前中の市場がもっとも活気があります。土曜がもっとも混雑しますが雰囲気も最高。月曜は露店の数がやや少なめ。日曜は市場が休みなので注意。昼食はマーケットのストリートフードで済ませると効率的です。" },
        { heading: "実用情報", body: "市場ではカード決済が一般的ですが、一部の露店では現金のみの場合も。トイレは市場周辺のカフェを利用。デ・パイプは比較的安全なエリアですが、市場の混雑時にはスリに注意。eSIMがあればハイネケン体験館の予約やレストラン検索がその場でできます。" },
      ],
      [
        { q: "アルバートカイプマーケットは毎日開いている？", a: "月曜〜土曜の9時〜17時です。日曜は休みです。" },
        { q: "おすすめの食べ物は？", a: "ストロープワッフル（焼きたて）、ハーリング（生ニシン）、スリナム料理のロティが定番です。市場内で食べ歩きするのが楽しいです。" },
        { q: "ハイネケン体験館は予約必要？", a: "事前予約が推奨されます。オンラインで購入すると当日より安くなります。" },
      ],
    ),
    en: en(NL_EN_CTA,
      "Amsterdam De Pijp Walk: Albert Cuyp Market and Multicultural Food",
      "Explore De Pijp's Albert Cuyp Market — Amsterdam's largest outdoor market — along with multicultural restaurants, neighbourhood parks, and the Heineken Experience.",
      AMSTERDAM_DE_PIJP_IMAGES[0],
      AMSTERDAM_DE_PIJP_IMAGES,
      AMSTERDAM_X,
      [
        { heading: "Why this walk works", body: "De Pijp was built for workers in the 1880s and is now one of Amsterdam's most multicultural neighbourhoods. The Albert Cuyp Market runs Monday to Saturday with over 300 stalls — the largest outdoor market in Amsterdam. Surinamese, Turkish, and Moroccan restaurants cluster in the surrounding streets, earning De Pijp its reputation as a food destination. Sarphatipark offers a green rest stop, and the Heineken Experience is within walking distance. This is the best food walk in Amsterdam." },
        { heading: "How to get there", body: "Tram 16 and 24 stop at Albert Cuypstraat. De Pijp Metro station (Noord/Zuid line) is also convenient, about 10 minutes from Central Station. Use an OV-chipkaart or contactless payment." },
        { heading: "Key stops", body: "The Albert Cuyp Market operates Monday to Saturday from 09:00 to 17:00. Try fresh stroopwafels and herring (raw cured herring) from the stalls. Marie Heinekenplein is the social centre with large terrace cafes. Sarphatipark is a compact neighbourhood green space. The Heineken Experience is a ticketed interactive museum in the former brewery — advance booking recommended." },
        { heading: "Best timing", body: "The market is liveliest in the morning. Saturday is the busiest but most atmospheric day. Monday has slightly fewer stalls. The market is closed on Sundays. Lunch at the market food stalls is efficient and delicious." },
        { heading: "Practical tips", body: "Card payment is standard at most stalls, but a few are cash-only. Use cafe toilets around the market area. De Pijp is relatively safe, but watch for pickpockets in market crowds. An eSIM lets you book the Heineken Experience and search for restaurants on the spot." },
      ],
      [
        { q: "Is the Albert Cuyp Market open every day?", a: "Monday to Saturday, 09:00 to 17:00. Closed on Sundays." },
        { q: "What should I eat?", a: "Fresh stroopwafels, herring, and Surinamese roti are the essentials. Grazing through the market stalls is the best approach." },
        { q: "Do I need to book the Heineken Experience?", a: "Advance booking is recommended. Online tickets are cheaper than buying at the door." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 16. Amsterdam — Plantage Walk
  // ═══════════════════════════════════════════════════════════════
  "amsterdam-plantage-walk": {
    ja: ja(NL_JA_CTA,
      "アムステルダム プランテージ散策：緑の並木道と博物館",
      "アムステルダム最古の植物園、動物園、ホロコースト記念碑を巡るプランテージ地区の静かな散歩道。緑豊かな並木道と歴史が交差するエリアです。",
      AMSTERDAM_PLANTAGE_IMAGES[0],
      AMSTERDAM_PLANTAGE_IMAGES,
      AMSTERDAM_X,
      [
        { heading: "このルートの特徴", body: "プランテージ地区はアムステルダム中心部の東に位置する緑豊かなエリアで、観光客が比較的少ない穴場です。1638年創設のホルトゥス・ボタニクス（植物園）は世界最古級の植物園のひとつ。1838年創設のアルティス動物園はオランダ最古。プランテージ・ミデンラーンの並木道は19世紀の邸宅が並ぶ優雅な通りです。ホランドセ・スハウブルク（ホロコースト記念碑）は第二次大戦中の強制収容所移送の歴史を伝えています。" },
        { heading: "アクセスと起点", body: "トラム14番のArtis停留所が最寄り。メトロWaterlooplein駅（51・53・54号線）から徒歩10分。中央駅からトラムで約15分です。" },
        { heading: "主要スポット", body: "ホルトゥス・ボタニクスは温室の熱帯植物と蝶の園が見どころ。アルティス動物園は広大で半日かかる場合も（プラネタリウム併設）。ヴェルテハイムパークにはアウシュビッツ追悼碑があり、静かな追悼の場です。ホランドセ・スハウブルクは無料入場の記念碑。プランテージ・ミデンラーンを歩くだけでも19世紀アムステルダムの雰囲気を味わえます。" },
        { heading: "時間帯とタイミング", body: "午前中は植物園と並木道の散歩、午後に動物園または記念碑を訪問するのが効率的。平日は特に静かで、地元の人と公園を共有する穏やかな時間が過ごせます。春は並木道の花が美しい季節です。" },
        { heading: "実用情報", body: "植物園と動物園はそれぞれ入場料が必要（オンライン購入推奨）。トイレは各施設内にあります。プランテージは安全なエリアで、夜間も問題ありません。eSIMがあればチケットのオンライン購入がスムーズで、動物園の混雑予想も確認できます。" },
      ],
      [
        { q: "プランテージの所要時間は？", a: "植物園と並木道の散歩で1.5〜2時間。動物園を含めると半日です。" },
        { q: "子連れにおすすめ？", a: "アルティス動物園とプラネタリウムは子供に最適。植物園の蝶園も人気です。ベビーカーでも回りやすいエリアです。" },
        { q: "ホロコースト記念碑は無料？", a: "はい、ホランドセ・スハウブルクは無料入場です。展示は控えめですが、歴史を知る重要な場所です。" },
      ],
    ),
    en: en(NL_EN_CTA,
      "Amsterdam Plantage Walk: Green Avenues and Museums",
      "Walk the Plantage's tree-lined boulevards past one of the world's oldest botanical gardens, the Artis Zoo, and the Dutch Holocaust memorial. A quiet, green walk in central Amsterdam.",
      AMSTERDAM_PLANTAGE_IMAGES[0],
      AMSTERDAM_PLANTAGE_IMAGES,
      AMSTERDAM_X,
      [
        { heading: "Why this walk works", body: "The Plantage is a green, residential district east of central Amsterdam that most tourists overlook. The Hortus Botanicus, founded in 1638, is one of the oldest botanical gardens in the world. Artis, founded in 1838, is the oldest zoo in the Netherlands. Plantage Middenlaan is a stately 19th-century avenue lined with grand houses. The Hollandsche Schouwburg, a former theatre used as a deportation centre during WWII, is now a solemn memorial. The area offers a quieter, greener side of Amsterdam." },
        { heading: "How to get there", body: "Tram 14 stops at Artis. Waterlooplein Metro station (lines 51, 53, 54) is a 10-minute walk. The tram from Central Station takes about 15 minutes." },
        { heading: "Key stops", body: "The Hortus Botanicus features tropical greenhouses and a butterfly garden. Artis Zoo is extensive and can fill a half day, including an on-site planetarium. Wertheimpark holds the Auschwitz memorial in a quiet setting. The Hollandsche Schouwburg is a free memorial and exhibition. Simply walking Plantage Middenlaan gives a sense of 19th-century Amsterdam." },
        { heading: "Best timing", body: "Morning is ideal for the botanical garden and avenue walk, with the zoo or memorial in the afternoon. Weekdays are particularly quiet. Spring brings beautiful blossom along the avenues." },
        { heading: "Practical tips", body: "The botanical garden and zoo each charge admission — buy tickets online for convenience. Toilets are available inside all venues. The Plantage is a safe area, comfortable even at night. An eSIM makes online ticket purchases seamless and lets you check zoo crowd forecasts." },
      ],
      [
        { q: "How long does the Plantage walk take?", a: "The botanical garden and avenue walk take 1.5 to 2 hours. Add the zoo for a half day." },
        { q: "Is it good for children?", a: "Artis Zoo and its planetarium are excellent for children. The butterfly garden at the Hortus is also popular. The area is pushchair-friendly." },
        { q: "Is the Holocaust memorial free?", a: "Yes, the Hollandsche Schouwburg is free to enter. The exhibition is understated but historically important." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 17. Lisbon — Alfama Morning Walk
  // ═══════════════════════════════════════════════════════════════
  "lisbon-alfama-morning-walk": {
    ja: ja(PT_JA_CTA,
      "リスボン アルファマの朝散策：路地裏とファドの街を歩く",
      "リスボン最古の地区アルファマの迷路のような路地を朝の光の中で歩く。サン・ジョルジェ城、ファド博物館、サンタ・ルジア展望台を巡るルートです。",
      LISBON_ALFAMA_IMAGES[0],
      LISBON_ALFAMA_IMAGES,
      LISBON_X,
      [
        { heading: "このルートの特徴", body: "アルファマはリスボン最古の地区で、1755年の大地震にも耐えた迷路のような路地が残っています。朝の時間帯は観光客が少なく、洗濯物が干された窓辺、石畳の階段、路地の奥から聞こえるラジオの音など、リスボンの日常を体感できます。サン・ジョルジェ城からはテージョ川を一望でき、ファド博物館ではリスボンの魂とされる音楽の歴史を知ることができます。展望台（ミラドウロ）が複数あり、角を曲がるたびに絶景が現れます。" },
        { heading: "アクセスと起点", body: "メトロのSanta Apolonia駅またはTerreiro do Paco駅から徒歩圏内。トラム28番はアルファマを通りますが朝でも混雑するため、歩いて登るのがおすすめです。リスボンの交通カードViva Viagemにチャージして利用します。アルファマは急な坂と階段の連続なので歩きやすい靴が必須です。" },
        { heading: "主要スポット", body: "サン・ジョルジェ城は有料ですがリスボン最高の眺望スポット。ミラドウロ・デ・サンタ・ルジアはタイル装飾に囲まれた無料の展望台。ファド博物館はファドの歴史を展示する小さな博物館。リスボン大聖堂（セー）は1147年建設のリスボン最古の教会。トラム28は観光名所ですが車内でのスリが非常に多いため、乗る場合は貴重品に最大限の注意を。" },
        { heading: "時間帯とタイミング", body: "朝7時〜10時がベスト。観光客が増える前の静かなアルファマを体験できます。6月のサント・アントニオ祭の前後はアルファマ全体が飾り付けられ、イワシを焼く煙が路地に漂います。夜はファドレストランで生演奏が楽しめますが、それは別の体験です。" },
        { heading: "実用情報", body: "ポルトガルのカフェではエスプレッソ（ビッカ）が1ユーロ前後と安く、気軽に休憩できます。トイレはセー大聖堂付近とファド博物館内。石畳は雨の日に非常に滑りやすいため要注意。eSIMがあれば迷路のような路地でもGPSナビが使え、ファドレストランの予約もスムーズです。" },
      ],
      [
        { q: "アルファマの朝散策の所要時間は？", a: "サン・ジョルジェ城を含めて2〜3時間。展望台を全て回ると半日です。" },
        { q: "トラム28に乗るべき？", a: "観光名物ですが車内のスリが深刻な問題です。乗る場合は貴重品を体の前に持ち、混雑する始発駅以外から乗車するのがおすすめ。歩いた方がアルファマの魅力を堪能できます。" },
        { q: "坂がきつい？", a: "かなりの急坂と階段があります。歩きやすい靴は必須。足に不安がある方はサン・ジョルジェ城までタクシーで行き、下りだけ歩くルートもおすすめです。" },
      ],
    ),
    en: en(PT_EN_CTA,
      "Lisbon Alfama Morning Walk: Backstreets and Fado Heritage",
      "Walk Lisbon's oldest neighbourhood in the morning light. Explore Alfama's labyrinth alleys, climb to Sao Jorge Castle, and visit the Fado Museum in the birthplace of Portugal's signature music.",
      LISBON_ALFAMA_IMAGES[0],
      LISBON_ALFAMA_IMAGES,
      LISBON_X,
      [
        { heading: "Why this walk works", body: "Alfama survived the 1755 earthquake and keeps a medieval street plan of narrow alleys, steep stairways, and sudden viewpoints. In the morning, before tourist crowds arrive, you experience daily Lisbon — laundry drying from windows, radios playing from kitchens, neighbours chatting on doorsteps. Sao Jorge Castle crowns the hilltop with Tagus views. The Fado Museum tells the story of Lisbon's signature music. Multiple miradouros (viewpoints) deliver panoramas around every corner. This is the most atmospheric walk in Lisbon." },
        { heading: "How to get there", body: "Santa Apolonia or Terreiro do Paco Metro stations are within walking distance. Tram 28 passes through Alfama but is crowded even in the morning — walking up is recommended. Use a Viva Viagem card for Lisbon transport. Alfama involves steep hills and stairways, so comfortable shoes are essential." },
        { heading: "Key stops", body: "Sao Jorge Castle charges admission but gives Lisbon's best panorama. Miradouro de Santa Luzia is a free, tile-framed viewpoint. The Fado Museum is a small but focused exhibition on fado history. Lisbon Cathedral (Se) dates from 1147 and is the city's oldest church. Tram 28 is a tourist attraction itself but pickpocketing inside is a serious and frequent problem — if you ride it, guard valuables extremely carefully." },
        { heading: "Best timing", body: "The sweet spot is 07:00 to 10:00, before tour groups arrive. Around the Santo Antonio festival in June, Alfama is decorated with streamers and the smell of grilled sardines fills the alleys. Evening fado restaurant performances are a separate experience worth planning." },
        { heading: "Practical tips", body: "Portuguese cafes serve espresso (bica) for about one euro, making rest stops easy and cheap. Toilets are near the Se Cathedral and inside the Fado Museum. Cobblestones become extremely slippery in rain. An eSIM provides GPS navigation through Alfama's maze-like alleys and lets you book fado restaurants." },
      ],
      [
        { q: "How long does the Alfama morning walk take?", a: "Including Sao Jorge Castle, allow 2 to 3 hours. Visiting all the viewpoints extends it to a half day." },
        { q: "Should I ride Tram 28?", a: "It is a tourist icon, but pickpocketing on board is a genuine problem. If you ride, keep valuables in front of you and avoid the most crowded terminus stops. Walking Alfama on foot reveals more than the tram window." },
        { q: "Are the hills difficult?", a: "Yes — Alfama has steep slopes and stairways. Sturdy shoes are essential. If mobility is a concern, take a taxi to the castle and walk only downhill." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 18. Lisbon — Bairro Alto Walk
  // ═══════════════════════════════════════════════════════════════
  "lisbon-bairro-alto-walk": {
    ja: ja(PT_JA_CTA,
      "リスボン バイロアルト散策：カフェと展望台めぐり",
      "ケーブルカーで丘を登り、バイロアルトのカフェ、シアード、プリンシペ・レアルの庭園を巡る。リスボンの文学と夜の顔を持つ丘の上の街歩きです。",
      LISBON_BAIRRO_ALTO_IMAGES[0],
      LISBON_BAIRRO_ALTO_IMAGES,
      LISBON_X,
      [
        { heading: "このルートの特徴", body: "バイロアルトは16世紀にグリッド状に建設されたリスボンの丘の上の地区で、昼はカフェと展望台、夜はバーやファドハウスで賑わう二面性のあるエリアです。サン・ペドロ・デ・アルカンターラ展望台からはサン・ジョルジェ城を正面に望め、シアード地区ではリスボンの文学カフェの伝統に触れられます。プリンシペ・レアルの庭園の巨大な杉の木は天然の日陰テラスを作っています。グロリア線のケーブルカー（1885年開業）で登るのが風情があります。" },
        { heading: "アクセスと起点", body: "メトロRestauradores駅からグロリア線のケーブルカー（エレバドール・ダ・グロリア）で丘を登るのが定番ルート。メトロBaixo-Chiado駅から徒歩で登ることもできます。ケーブルカーはViva Viagemカードで乗車可能です。" },
        { heading: "主要スポット", body: "サン・ペドロ・デ・アルカンターラ展望台はリスボン屈指のビューポイントで無料。シアードはポルトガルの詩人フェルナンド・ペソアの銅像があるリスボンの文化的中心地。ブラジレイラはペソアが通った1905年創業の歴史的カフェ。プリンシペ・レアルの庭園は大きな杉の木の下にテラスカフェがあります。バイロアルトの路地はタグ（落書き）が多いですが、これも街の個性です。" },
        { heading: "時間帯とタイミング", body: "午前中のカフェ巡りと展望台がおすすめ。バイロアルトの夜は22時以降にバーが本格的に動き始めますが、散策向きではありません。シアードの書店やカフェは午前中が空いています。日曜は一部の店が休みです。" },
        { heading: "実用情報", body: "ポルトガルではカード決済が広く普及していますが、小さなカフェでは現金が便利な場合も。トイレはカフェの利用客用。バイロアルトの路地は石畳で滑りやすいため、雨の日は特に注意。eSIMがあれば展望台の位置をGPSで確認でき、カフェやレストランの口コミもチェックできます。" },
      ],
      [
        { q: "バイロアルトの所要時間は？", a: "展望台、シアード、プリンシペ・レアルを回って2〜3時間です。" },
        { q: "ケーブルカーは混む？", a: "観光シーズンは行列ができます。Viva Viagemカードがあれば乗車はスムーズですが、歩いて登っても10分程度です。" },
        { q: "夜のバイロアルトは安全？", a: "バーやレストランが多いため人通りはありますが、酔客が多い深夜は注意。貴重品の管理を徹底してください。" },
      ],
    ),
    en: en(PT_EN_CTA,
      "Lisbon Bairro Alto Walk: Cafes and Viewpoint Hopping",
      "Ride the Gloria funicular up the hill and explore Bairro Alto's cafes, the Chiado literary quarter, and Principe Real's garden. A walk through Lisbon's hilltop cultural district.",
      LISBON_BAIRRO_ALTO_IMAGES[0],
      LISBON_BAIRRO_ALTO_IMAGES,
      LISBON_X,
      [
        { heading: "Why this walk works", body: "Bairro Alto was laid out as a grid in the 16th century and has two faces — daytime cafes and viewpoints, nighttime bars and fado houses. The Sao Pedro de Alcantara viewpoint looks east across the Baixa to Sao Jorge Castle. Chiado connects the hilltop to the river and is Lisbon's traditional literary quarter. Principe Real's garden features a giant cedar tree creating a natural canopy over a terrace cafe. The Gloria funicular, running since 1885, is the most atmospheric way up the hill." },
        { heading: "How to get there", body: "From Restauradores Metro station, take the Elevador da Gloria funicular up the hill. Alternatively, walk up from Baixa-Chiado Metro station. The funicular accepts Viva Viagem cards." },
        { heading: "Key stops", body: "Sao Pedro de Alcantara viewpoint is free and offers one of Lisbon's best panoramas. Chiado has the bronze statue of poet Fernando Pessoa and is the cultural heart of the city. A Brasileira is a historic cafe founded in 1905 where Pessoa was a regular. Principe Real garden has a terrace cafe beneath a huge cedar tree. Bairro Alto's lanes feature heavy graffiti — it is part of the neighbourhood's character." },
        { heading: "Best timing", body: "Morning is best for cafe visits and viewpoints. Bairro Alto's nightlife kicks in after 22:00 but is not a walking-tour experience. Chiado's bookshops and cafes are quietest in the morning. Some shops close on Sundays." },
        { heading: "Practical tips", body: "Card payment is widely accepted in Portugal, though small cafes sometimes prefer cash. Toilets are available for customers in cafes. Bairro Alto's cobblestones are slippery when wet. An eSIM lets you locate viewpoints by GPS and check cafe and restaurant reviews." },
      ],
      [
        { q: "How long does the Bairro Alto walk take?", a: "Allow 2 to 3 hours for the viewpoints, Chiado, and Principe Real." },
        { q: "Is the funicular crowded?", a: "In tourist season, queues form. A Viva Viagem card speeds up boarding, but walking up takes only about 10 minutes." },
        { q: "Is Bairro Alto safe at night?", a: "The bar-heavy streets have foot traffic, but late-night revellers increase risk. Keep valuables secure." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 19. Lisbon — Belem Riverside Walk
  // ═══════════════════════════════════════════════════════════════
  "lisbon-belem-riverside-walk": {
    ja: ja(PT_JA_CTA,
      "リスボン ベレン散策：大航海時代の修道院とテージョ川沿い",
      "ジェロニモス修道院、ベレンの塔、発見のモニュメントを巡るベレン地区の河沿いウォーク。パステル・デ・ナタの元祖ベーカリーも必見です。",
      LISBON_BELEM_IMAGES[0],
      LISBON_BELEM_IMAGES,
      LISBON_X,
      [
        { heading: "このルートの特徴", body: "ベレンはポルトガル大航海時代の出発点で、マヌエル様式の最高傑作ジェロニモス修道院（UNESCO世界遺産）と、テージョ川に立つベレンの塔が象徴的なエリアです。発見のモニュメントの屋上からは河口のパノラマが広がり、現代美術館MAAMTの波形の屋根もウォーキングコースとして歩けます。1837年から秘伝のレシピでエッグタルト（パステル・デ・ナタ）を焼き続けるパステイス・デ・ベレンは行列必至の名店です。フラットな河沿いの道で全スポットが一直線に繋がります。" },
        { heading: "アクセスと起点", body: "トラム15E番がリスボン中心部からベレンまで直通（約20分）。電車はカイス・ド・ソドレ駅からベレン駅まで約10分。バス727、728、714番も利用できます。Viva Viagemカードで全交通機関に乗れます。" },
        { heading: "主要スポット", body: "ジェロニモス修道院はマヌエル様式の傑作で有料（日曜午前は無料）。ベレンの塔はテージョ川に浮かぶ要塞で有料。発見のモニュメントは屋上に上がれます（有料）。MAAMTは波形の屋根を歩けます（屋上は無料、展示は有料）。パステイス・デ・ベレンは早朝か夕方が比較的空いています。ベレンは観光地のためスリに注意。" },
        { heading: "時間帯とタイミング", body: "午前9時の開館と同時にジェロニモス修道院に入るのが行列を避けるコツ。日曜午前は修道院が無料になるため非常に混雑します。河沿いの散歩は午後の光が美しいです。パステイス・デ・ベレンは早朝8時の開店直後が最も空いています。" },
        { heading: "実用情報", body: "ベレンの主要スポット間は平坦な河沿い遊歩道で繋がっており、歩きやすいルートです。トイレは修道院内、MAAT内にあります。ベレン地区のレストランは観光地価格のため、パステイス・デ・ベレンとカフェ以外はリスボン中心部で食事する方がコスパが良いです。eSIMがあれば修道院のオンラインチケット購入や混雑状況の確認がスムーズです。" },
      ],
      [
        { q: "ベレンの所要時間は？", a: "主要3スポット（修道院・塔・モニュメント）とパステイス・デ・ベレンで3〜4時間。MAAMTを含めると半日です。" },
        { q: "パステイス・デ・ベレンの行列は？", a: "昼前後は30分以上待つこともあります。テイクアウトの列の方が短いことが多いです。朝8時の開店直後か夕方17時以降が比較的空いています。" },
        { q: "日曜午前の無料入場は？", a: "ジェロニモス修道院は日曜午前が無料ですが、そのため非常に混雑します。時間に余裕がない場合は平日に有料で入る方が快適です。" },
      ],
    ),
    en: en(PT_EN_CTA,
      "Lisbon Belem Riverside Walk: Monastery and Tagus Waterfront",
      "Walk Belem's flat riverside from the Jeronimos Monastery to the Tower of Belem, stopping at the Monument to the Discoveries and the original pastel de nata bakery. Lisbon's Age of Discovery heritage in one route.",
      LISBON_BELEM_IMAGES[0],
      LISBON_BELEM_IMAGES,
      LISBON_X,
      [
        { heading: "Why this walk works", body: "Belem is where Portugal's Age of Discoveries began. The Jeronimos Monastery, a UNESCO World Heritage Manueline masterpiece, and the Tower of Belem on the Tagus are the district's landmarks. The Monument to the Discoveries has a rooftop panorama, and MAAT's undulating roof is a walkable viewing platform. Pasteis de Belem has baked custard tarts to a secret recipe since 1837. All the major sites connect along a flat riverside path, making this one of the easiest walks in Lisbon." },
        { heading: "How to get there", body: "Tram 15E runs directly from central Lisbon to Belem in about 20 minutes. The train from Cais do Sodre to Belem station takes 10 minutes. Buses 727, 728, and 714 also serve the area. Viva Viagem cards work on all transport." },
        { heading: "Key stops", body: "The Jeronimos Monastery is a paid attraction and a Manueline architectural masterpiece — it is free on Sunday mornings. The Tower of Belem is a paid riverside fortress. The Monument to the Discoveries has a paid rooftop viewpoint. MAAT's roof is free to walk; exhibitions are paid. Pasteis de Belem is quietest early in the morning or in the late afternoon. Watch for pickpockets in this tourist-heavy area." },
        { heading: "Best timing", body: "Arrive at the Jeronimos Monastery at the 09:00 opening to beat queues. Sunday mornings are free but extremely crowded. The riverside walk photographs best in afternoon light. Pasteis de Belem is calmest just after the 08:00 opening." },
        { heading: "Practical tips", body: "Belem's main sites connect along a flat riverside promenade — easy walking. Toilets are inside the monastery and MAAT. Belem's restaurants charge tourist prices; consider eating in central Lisbon instead, apart from the essential pasteis de nata. An eSIM lets you buy monastery tickets online and check crowd levels." },
      ],
      [
        { q: "How long does the Belem walk take?", a: "The three main sites plus Pasteis de Belem take 3 to 4 hours. Add MAAT for a half day." },
        { q: "How bad are the Pasteis de Belem queues?", a: "Around midday, waits of 30 minutes or more are common. The takeaway line is usually shorter. Early morning after 08:00 or late afternoon after 17:00 are the quietest times." },
        { q: "Is the Sunday free entry worth it?", a: "The Jeronimos Monastery is free on Sunday mornings, but this makes it very crowded. If time is limited, paying on a weekday is more comfortable." },
      ],
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // 20. Lisbon — LX Factory Walk
  // ═══════════════════════════════════════════════════════════════
  "lisbon-lx-factory-walk": {
    ja: ja(PT_JA_CTA,
      "リスボン LXファクトリーとアルカンタラ地区散策",
      "旧繊維工場をリノベーションしたクリエイティブハブLXファクトリーと、4月25日橋の真下に広がるアルカンタラ地区を巡る散歩。リスボンの新しい顔を発見するルートです。",
      LISBON_LX_FACTORY_IMAGES[0],
      LISBON_LX_FACTORY_IMAGES,
      LISBON_X,
      [
        { heading: "このルートの特徴", body: "LXファクトリーは19世紀の繊維工場を改装したクリエイティブハブで、独立系ショップ、デザインスタジオ、レストラン、書店が集まっています。4月25日橋（サンフランシスコのゴールデンゲートブリッジに似た赤い吊り橋）が真上にそびえ、インダストリアルな雰囲気が独特です。倉庫を改装した書店レール・デヴァガールは天井から自転車が吊り下げられた巨大空間で必見。アルカンタラ地区はかつてのドック地帯が再開発されつつある変化のエリアです。" },
        { heading: "アクセスと起点", body: "トラム15E番のCalvario停留所から徒歩3分。バス714、727番も利用可能。電車はアルカンタラ・マール駅下車。リスボン中心部からタクシーやUberで約10分（5〜8ユーロ程度）です。" },
        { heading: "主要スポット", body: "LXファクトリーは入場無料で、通路や中庭を自由に歩けます。レール・デヴァガール書店は旧印刷所を改装した巨大書店で、アート本やポルトガル文学が充実。週末にはマーケットやイベントが開催されることも。ヴィレッジ・アンダーグラウンドはシッピングコンテナと二階建てバスを再利用したコワーキングスペース。橋の下のエリアはまだ開発途上で、雰囲気は荒削りですが変化を感じられます。" },
        { heading: "時間帯とタイミング", body: "午前中はショップやスタジオが開き始める10時〜11時以降がおすすめ。日曜にマーケットが開催されることがあるため事前に確認を。ランチタイムはLXファクトリー内のレストランが混むため、12時前に到着するのが良いです。夕方は橋がライトアップされ、テラスからの眺めが美しいです。" },
        { heading: "実用情報", body: "LXファクトリー内はカード決済が一般的。トイレは各レストランやカフェの利用客用。アルカンタラ地区はまだ再開発中のため、LXファクトリーの外側は人通りが少ない場所もあります。夜間はLXファクトリー内のレストランに行く場合以外は避けた方が安全。eSIMがあればイベントスケジュールの確認やレストラン予約がスムーズです。" },
      ],
      [
        { q: "LXファクトリーの所要時間は？", a: "ショップと書店を回って1.5〜2時間。ランチを含めると3時間です。" },
        { q: "子連れで行ける？", a: "LXファクトリー内はベビーカーで回れますが、一部の通路は狭いです。子供向けのワークショップが開催されることもあります。" },
        { q: "ベレンと組み合わせられる？", a: "LXファクトリーはベレンとリスボン中心部の間にあるため、ベレン見学後にトラムで移動して立ち寄るのが効率的です。" },
      ],
    ),
    en: en(PT_EN_CTA,
      "Lisbon LX Factory and Alcantara Walk",
      "Explore LX Factory, a converted textile mill turned creative hub beneath the 25 de Abril Bridge, and the changing Alcantara docklands. Lisbon's industrial-chic side on foot.",
      LISBON_LX_FACTORY_IMAGES[0],
      LISBON_LX_FACTORY_IMAGES,
      LISBON_X,
      [
        { heading: "Why this walk works", body: "LX Factory converted a 19th-century textile compound into a creative hub of independent shops, design studios, restaurants, and a spectacular warehouse bookshop. The 25 de Abril Bridge — visually similar to San Francisco's Golden Gate — towers directly overhead, adding an industrial-scale backdrop. Ler Devagar bookshop occupies a former printing works with a bicycle suspended from the ceiling. The surrounding Alcantara district is a former dockland in transition, offering a glimpse of Lisbon's evolving identity." },
        { heading: "How to get there", body: "Tram 15E stops at Calvario, three minutes' walk from LX Factory. Buses 714 and 727 also serve the area. Alcantara-Mar train station is nearby. A taxi or Uber from central Lisbon takes about 10 minutes and costs 5 to 8 euros." },
        { heading: "Key stops", body: "LX Factory is free to enter and walk around. Ler Devagar bookshop is a converted printing works with art books and Portuguese literature. Weekend markets and events run periodically — check beforehand. Village Underground Lisboa uses shipping containers and double-decker buses as creative workspaces. The area beneath the bridge is still developing and has a raw, unfinished character." },
        { heading: "Best timing", body: "Shops and studios open from 10:00 or 11:00, so morning starts are early only for the architecture. Sunday markets are occasional — check the schedule online. Arrive before noon for lunch at the on-site restaurants before they fill up. Evenings bring bridge illumination and pleasant terrace views." },
        { heading: "Practical tips", body: "Card payment is standard inside LX Factory. Toilets are available for customers in restaurants and cafes. Alcantara outside LX Factory is still under redevelopment and has quiet stretches. After dark, stick to the factory complex unless heading to a specific restaurant. An eSIM lets you check event schedules and make restaurant reservations." },
      ],
      [
        { q: "How long does LX Factory take?", a: "Allow 1.5 to 2 hours for the shops and bookshop. With lunch, plan for 3 hours." },
        { q: "Is it suitable for children?", a: "The factory complex is pushchair-accessible, though some passages are narrow. Children's workshops are occasionally held." },
        { q: "Can I combine it with Belem?", a: "LX Factory sits between Belem and central Lisbon, so stopping here on the tram back from Belem is efficient." },
      ],
    ),
  },
};

export const EUROPE_GUIDE_SLUGS = Object.keys(EUROPE_GUIDE_CONTENT);
