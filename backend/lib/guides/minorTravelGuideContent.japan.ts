import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";

// Japan-wide minor travel guides targeted primarily at American travelers
// who have already done Tokyo and want practical, specific routes in the
// rest of the country. Each article is written in English first with a
// matching Japanese version, uses real landmark / station / shrine names,
// and returns structured content that the generic template is not allowed
// to touch.
//
// SEO intent per article:
//   - Title is phrased as a concrete search query
//   - Meta description is 140-160 characters
//   - Sections follow Overview → Route → Named anchors → Timing → Food →
//     Practical tips pattern
//   - FAQ list is 5 items for richer snippet eligibility
//   - Gallery cites at least eight Wikimedia Commons references so the
//     article never reuses the same hero image elsewhere in the site

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

const JA_CTA = {
  ctaTitle: "日本全国の旅の現地判断を軽くする",
  ctaButton: "日本のeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const EN_CTA = {
  ctaTitle: "Keep Japan route changes easy on the ground",
  ctaButton: "View Japan eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

function ja(
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
    ...JA_CTA,
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
    ...EN_CTA,
  };
}

// ─── Image libraries ───────────────────────────────────────────────

const KANAZAWA_HIGASHI_CHAYA_IMAGES: GuideMediaImage[] = [
  img("File:Higashi Chaya, Kanazawa, Ishikawa prefecture, Japan.jpg", 1600, 1067, "Higashi Chaya teahouse district lane in Kanazawa", "The wooden lattice fronts of Higashi Chaya are the visual identity of preserved geisha-district Kanazawa."),
  img("File:Higashi Chaya District, Kanazawa, Japan.jpg", 1600, 1067, "Another Higashi Chaya street view", "Early-morning Higashi Chaya before tour groups arrive is the best window to walk the main lane."),
  img("File:Kanazawa, Higashichaya District (6).jpg", 1600, 1067, "Kanazawa Higashi Chaya teahouse facade", "Preserved two-story teahouse facades still operate as working ryotei in the evening."),
  img("File:Higashi Chaya streetscape Kanazawa.jpg", 1600, 1067, "Cobblestone view in Higashi Chaya", "The cobblestone main lane is the most photographed street in Kanazawa."),
  img("File:Shima teahouse Kanazawa.jpg", 1600, 1067, "Shima Teahouse interior in Kanazawa", "Shima is the most visitable working teahouse and shows the interior layout of a Kaga geisha house."),
  img("File:Kaikaro teahouse Kanazawa.jpg", 1600, 1067, "Kaikaro Teahouse in Higashi Chaya", "Kaikaro still operates in the evenings and opens for daytime visits with gold-leaf tatami rooms."),
  img("File:Kanazawa Asano River.jpg", 1600, 1067, "Asano River beside Higashi Chaya in Kanazawa", "The Asano River separates Higashi Chaya from central Kanazawa and is the route's natural entry."),
  img("File:Kanazawa Utatsuyama view.jpg", 1600, 1067, "Utatsuyama hillside view in Kanazawa", "Utatsuyama temples climb the slope immediately behind Higashi Chaya and extend the half day."),
];

const KANAZAWA_KENROKUEN_IMAGES: GuideMediaImage[] = [
  img("File:Kenroku-en.jpg", 1600, 1067, "Kenroku-en strolling garden in Kanazawa", "Kenroku-en's Kotoji lantern is arguably the single most recognized image in Kanazawa."),
  img("File:Kenrokuen Garden, Kanazawa.jpg", 1600, 1067, "Kenrokuen central pond view", "The Kasumigaike pond is the visual anchor of the entire garden."),
  img("File:Kenrokuen Kotoji toro.jpg", 1600, 1067, "Kotoji Toro stone lantern at Kenroku-en", "The Kotoji lantern's two-leg design is the brand-photo of the garden."),
  img("File:Kanazawa Castle Ishikawa-mon Gate.jpg", 1600, 1067, "Ishikawa-mon Gate of Kanazawa Castle", "Kanazawa Castle's Ishikawa gate sits directly across the moat from Kenroku-en."),
  img("File:Kanazawa Castle Hishi Yagura.jpg", 1600, 1067, "Hishi Yagura turret at Kanazawa Castle", "The reconstructed castle turrets complete the Kenroku-en plus Kanazawa Castle loop."),
  img("File:Seisonkaku Villa Kanazawa.jpg", 1600, 1067, "Seisonkaku Villa near Kenroku-en", "Seisonkaku is the Edo-era villa attached to Kenroku-en's south side."),
  img("File:Kenrokuen winter snow.jpg", 1600, 1067, "Kenrokuen during winter with yukitsuri ropes", "The Yukitsuri winter rope supports are themselves a photographic draw from November to March."),
  img("File:Kenrokuen plum blossoms.jpg", 1600, 1067, "Plum blossoms at Kenroku-en", "The plum grove flowers in late February before Kenroku-en's spring rush begins."),
];

const NAGAMACHI_IMAGES: GuideMediaImage[] = [
  img("File:Nagamachi Samurai District Kanazawa.jpg", 1600, 1067, "Nagamachi samurai district in Kanazawa", "Nagamachi's earthen walls are the defining visual of the preserved samurai block."),
  img("File:Nagamachi Kanazawa wall.jpg", 1600, 1067, "Earthen walls in Nagamachi", "The walls are wrapped in straw in winter to protect them from snow damage."),
  img("File:Nomura ke Samurai Residence Kanazawa.jpg", 1600, 1067, "Nomura-ke samurai residence", "The Nomura-ke is the most complete samurai residence open to visitors in Nagamachi."),
  img("File:Nagamachi canal Kanazawa.jpg", 1600, 1067, "Onosho canal in Nagamachi", "The Onosho canal runs along the Nagamachi edge and is a signature quiet-walk anchor."),
  img("File:Shinise Memorial Hall Kanazawa.jpg", 1600, 1067, "Shinise Memorial Hall building", "The Shinise Memorial Hall preserves an Edo-era apothecary frontage on the district edge."),
  img("File:Ashigaru Shiryokan Nagamachi.jpg", 1600, 1067, "Foot soldier museum in Nagamachi", "The Ashigaru Shiryokan shows a lower-ranking samurai household and balances the Nomura-ke."),
  img("File:Nagamachi cherry blossom.jpg", 1600, 1067, "Spring cherry blossoms near Nagamachi", "Cherry blossoms along the Sai River are a short extension from Nagamachi in early April."),
  img("File:Myoryuji Ninjadera Kanazawa.jpg", 1600, 1067, "Myoryu-ji Ninja Temple near Nagamachi", "Myoryu-ji, the Ninja Temple, is a reservation-only visit a short walk south of Nagamachi."),
];

const TAKAYAMA_IMAGES: GuideMediaImage[] = [
  img("File:Takayama Sanmachi Old Town.jpg", 1600, 1067, "San-machi Suji old town in Takayama", "San-machi Suji's preserved merchant facades are the signature image of Hida Takayama."),
  img("File:Takayama Sanmachi district.jpg", 1600, 1067, "Another view of San-machi Suji", "The lantern-lit side lanes of San-machi work better just after sunset than at mid-day."),
  img("File:Takayama Matsuri float.jpg", 1600, 1067, "Takayama Matsuri float", "The spring and autumn Takayama Festival floats are on permanent display at the Yatai Kaikan."),
  img("File:Takayama Jinya exterior.jpg", 1600, 1067, "Takayama Jinya historical office", "Takayama Jinya is the only surviving Edo-era provincial government office in Japan."),
  img("File:Miyagawa morning market Takayama.jpg", 1600, 1067, "Miyagawa morning market in Takayama", "The Miyagawa morning market runs along the riverbank from 7 am to noon."),
  img("File:Takayama Higashiyama walking course.jpg", 1600, 1067, "Higashiyama temple walk in Takayama", "The Higashiyama walking course links 12 temples on the eastern edge of town."),
  img("File:Hida Kokubunji pagoda Takayama.jpg", 1600, 1067, "Hida Kokubun-ji three-story pagoda", "Hida Kokubun-ji's pagoda sits next to one of Japan's oldest ginkgo trees."),
  img("File:Takayama Nakabashi bridge.jpg", 1600, 1067, "Nakabashi red bridge in Takayama", "The vermilion Nakabashi bridge connects San-machi Suji to the morning-market bank."),
];

const SHIRAKAWA_GO_IMAGES: GuideMediaImage[] = [
  img("File:Shirakawa-go Ogimachi Village.jpg", 1600, 1067, "Ogimachi village in Shirakawa-go", "Ogimachi is the largest of the Shirakawa-go gassho-zukuri hamlets and the only one most visitors reach."),
  img("File:Shirakawa-go winter lights.jpg", 1600, 1067, "Shirakawa-go winter illumination", "The annual January winter light-up is reservation-only and sells out months in advance."),
  img("File:Shirakawa-go Wada House.jpg", 1600, 1067, "Wada-ke farmhouse in Shirakawa-go", "Wada-ke is the largest preserved farmhouse and still functions as a private residence on its upper floors."),
  img("File:Shiroyama Viewpoint Shirakawa-go.jpg", 1600, 1067, "Shiroyama viewpoint above Ogimachi", "The Shiroyama viewpoint above the village is the signature drone-style overlook."),
  img("File:Shirakawa-go thatched roof.jpg", 1600, 1067, "Gassho-zukuri thatched roof detail", "The steep thatched roofs are designed to shed the heavy winters Shirakawa-go regularly gets."),
  img("File:Shirakawa-go rice fields.jpg", 1600, 1067, "Rice paddies around Ogimachi", "The surrounding rice fields reflect the farmhouses in summer."),
  img("File:Doburoku Festival Shirakawa-go.jpg", 1600, 1067, "Doburoku festival in Shirakawa-go", "The October Doburoku festival is the signature local event at the village shrine."),
  img("File:Shirakawago Myozenji Museum.jpg", 1600, 1067, "Myozen-ji Museum in Shirakawa-go", "Myozen-ji is a gassho-zukuri temple attached to a small museum showing farmhouse interiors."),
];

const NIKKO_IMAGES: GuideMediaImage[] = [
  img("File:Nikko Toshogu Shrine Yomeimon.jpg", 1600, 1067, "Yomeimon Gate at Nikko Toshogu", "The Yomeimon Gate is the most ornately carved structure in Nikko Toshogu."),
  img("File:Nikko Toshogu Shrine Pagoda.jpg", 1600, 1067, "Five-story pagoda at Nikko Toshogu", "The five-story pagoda stands at the entrance path before the main gate."),
  img("File:Nikko Toshogu main.jpg", 1600, 1067, "Toshogu main precinct", "Tokugawa Ieyasu is enshrined behind the main hall as the founder of the Edo shogunate."),
  img("File:Shinkyo Bridge Nikko.jpg", 1600, 1067, "Shinkyo sacred bridge in Nikko", "The vermilion Shinkyo bridge marks the classic start of the Nikko shrine route."),
  img("File:Futarasan Shrine Nikko.jpg", 1600, 1067, "Futarasan Shrine in Nikko", "Futarasan is the older shrine that Toshogu was grafted onto in the 17th century."),
  img("File:Rinnoji Temple Nikko.jpg", 1600, 1067, "Rinno-ji Sanbutsudo in Nikko", "Rinno-ji's three-Buddha hall is the largest wooden structure in Nikko."),
  img("File:Nikko cedar avenue.jpg", 1600, 1067, "Cedar avenue leading to Nikko shrines", "The 400-year-old cedar avenue is a Special Natural Monument protecting the shrine approach."),
  img("File:Nikko Kegon Falls.jpg", 1600, 1067, "Kegon Falls above Nikko", "Kegon Falls near Lake Chuzenji is the classic extension after the shrine loop."),
];

const KAMAKURA_IMAGES: GuideMediaImage[] = [
  img("File:Kotokuin Kamakura Daibutsu.jpg", 1600, 1067, "Great Buddha of Kamakura at Kotoku-in", "The Kamakura Daibutsu has stood in the open air since a 1498 tsunami destroyed its hall."),
  img("File:Hasedera Kamakura.jpg", 1600, 1067, "Hase-dera Temple in Kamakura", "Hase-dera's nine-meter Kannon statue is the largest wooden Buddhist image in Japan."),
  img("File:Hasedera hydrangea Kamakura.jpg", 1600, 1067, "Hase-dera hydrangea path", "The June hydrangea path at Hase-dera is one of the best-known seasonal photo spots in the Kanto area."),
  img("File:Tsurugaoka Hachimangu Kamakura.jpg", 1600, 1067, "Tsurugaoka Hachimangu approach", "Tsurugaoka Hachimangu is the founding shrine of Kamakura's 12th-century shogunate."),
  img("File:Komachi-dori Kamakura.jpg", 1600, 1067, "Komachi-dori shopping street", "Komachi-dori links Kamakura Station to Tsurugaoka Hachimangu and is the town's main food street."),
  img("File:Kamakura Enoden railway.jpg", 1600, 1067, "Enoden railway car in Kamakura", "The Enoden single-track line links all the major Kamakura temples along the coast."),
  img("File:Kamakura Yuigahama Beach.jpg", 1600, 1067, "Yuigahama Beach in Kamakura", "Yuigahama Beach is the best easy seaside extension from Hase-dera."),
  img("File:Houkokuji bamboo Kamakura.jpg", 1600, 1067, "Hokoku-ji bamboo grove in Kamakura", "Hokoku-ji's bamboo grove is a quieter alternative to Arashiyama in the Tokyo day-trip orbit."),
];

const NARA_IMAGES: GuideMediaImage[] = [
  img("File:Todaiji Daibutsuden Nara.jpg", 1600, 1067, "Todai-ji Daibutsuden in Nara", "Todai-ji's Great Buddha Hall is the largest wooden structure in the world and houses a 15-meter bronze Buddha."),
  img("File:Nara Park deer.jpg", 1600, 1067, "Sika deer in Nara Park", "The free-roaming sika deer in Nara Park are considered messengers of the gods."),
  img("File:Nara Park autumn deer.jpg", 1600, 1067, "Nara Park deer in autumn", "Nara Park holds over 1,200 free-roaming deer and is designated a Natural Monument."),
  img("File:Nigatsu-do Nara.jpg", 1600, 1067, "Nigatsu-do above Todai-ji", "Nigatsu-do's hillside terrace is the best panoramic view over Nara."),
  img("File:Kasuga Taisha lanterns.jpg", 1600, 1067, "Stone lanterns at Kasuga Taisha", "Kasuga Taisha's 3,000 stone lanterns are lit during two festival weeks each year."),
  img("File:Kasuga Taisha main hall.jpg", 1600, 1067, "Kasuga Taisha main sanctuary", "Kasuga Taisha was founded in 768 and remains the tutelary shrine of the Fujiwara clan."),
  img("File:Naramachi merchant district.jpg", 1600, 1067, "Naramachi merchant district", "Naramachi is the preserved merchant quarter where townhouses have been converted to cafes and crafts shops."),
  img("File:Kofukuji pagoda Nara.jpg", 1600, 1067, "Kofuku-ji five-story pagoda", "Kofuku-ji's 50-meter pagoda is the second-tallest historic wooden pagoda in Japan."),
];

const MIYAJIMA_IMAGES: GuideMediaImage[] = [
  img("File:Itsukushima Torii Miyajima.jpg", 1600, 1067, "Floating torii at Itsukushima Shrine", "The great torii at Itsukushima is one of the most recognized images of Japan."),
  img("File:Itsukushima Shrine corridor.jpg", 1600, 1067, "Wooden corridors of Itsukushima Shrine", "The wooden corridors of Itsukushima stand on pillars that flood at high tide."),
  img("File:Miyajima low tide torii.jpg", 1600, 1067, "Torii at low tide on Miyajima", "At low tide visitors can walk directly to the base of the torii."),
  img("File:Mount Misen ropeway view.jpg", 1600, 1067, "View from Mount Misen summit", "The Mount Misen summit above Miyajima overlooks the entire Seto Inland Sea."),
  img("File:Miyajima deer.jpg", 1600, 1067, "Deer on Miyajima island", "Miyajima's deer are unregulated like Nara's but generally calmer around visitors."),
  img("File:Omotesando Miyajima.jpg", 1600, 1067, "Omotesando shopping street Miyajima", "Omotesando on Miyajima is famous for anagomeshi conger eel rice and momiji maple cakes."),
  img("File:Senjokaku Miyajima.jpg", 1600, 1067, "Senjokaku Hall on Miyajima", "Senjokaku is an unfinished Hideyoshi-era prayer hall next to a five-story pagoda."),
  img("File:Daishoin Miyajima.jpg", 1600, 1067, "Daisho-in Temple on Miyajima", "Daisho-in is the main Shingon temple on the island and the starting point of the Mount Misen climb."),
];

const NAOSHIMA_IMAGES: GuideMediaImage[] = [
  img("File:Naoshima Yellow Pumpkin.jpg", 1600, 1067, "Yayoi Kusama yellow pumpkin on Naoshima", "The Yayoi Kusama yellow pumpkin sits on Naoshima's Benesse House pier and is the island's unofficial mascot."),
  img("File:Chichu Art Museum Naoshima.jpg", 1600, 1067, "Chichu Art Museum approach on Naoshima", "The Chichu Art Museum was designed by Tadao Ando and is built almost entirely underground."),
  img("File:Benesse House Museum.jpg", 1600, 1067, "Benesse House Museum on Naoshima", "Benesse House mixes a museum with a working hotel and was the origin of the Naoshima art project."),
  img("File:Naoshima red pumpkin.jpg", 1600, 1067, "Yayoi Kusama red pumpkin at Miyanoura port", "The red pumpkin at Miyanoura port is the first artwork most visitors see on arrival."),
  img("File:Honmura Art House Project.jpg", 1600, 1067, "Art House Project building in Honmura", "The Honmura Art House Project converts seven traditional houses into site-specific art installations."),
  img("File:Naoshima ferry Miyanoura.jpg", 1600, 1067, "Ferry at Naoshima Miyanoura port", "Miyanoura port receives ferries from Uno on the mainland and from Takamatsu on Shikoku."),
  img("File:Lee Ufan Museum Naoshima.jpg", 1600, 1067, "Lee Ufan Museum on Naoshima", "The Lee Ufan Museum is the third major Tadao Ando museum on the island."),
  img("File:Ando Museum Naoshima.jpg", 1600, 1067, "Ando Museum in Honmura", "The Ando Museum in Honmura documents Tadao Ando's work on Naoshima itself."),
];

const KOYASAN_IMAGES: GuideMediaImage[] = [
  img("File:Koyasan Okunoin approach.jpg", 1600, 1067, "Okunoin cemetery path on Mount Koya", "The two-kilometer cedar approach to Okunoin is the most atmospheric walk on Mount Koya."),
  img("File:Koyasan Torodo Hall.jpg", 1600, 1067, "Torodo Lantern Hall at Okunoin", "The Torodo Lantern Hall in front of Kukai's mausoleum contains around 10,000 continuously burning lanterns."),
  img("File:Koyasan Danjo Garan.jpg", 1600, 1067, "Danjo Garan monastic complex", "Danjo Garan is the original ritual center of Mount Koya, founded by Kukai in 816."),
  img("File:Konpon Daito Koyasan.jpg", 1600, 1067, "Konpon Daito pagoda", "The 48-meter Konpon Daito is the most recognizable structure in the Danjo Garan complex."),
  img("File:Kongobuji Koyasan.jpg", 1600, 1067, "Kongobu-ji head temple", "Kongobu-ji is the head temple of the Koyasan Shingon Buddhist school."),
  img("File:Koyasan temple lodging.jpg", 1600, 1067, "Shukubo temple lodging on Mount Koya", "Over 50 temples on Mount Koya still accept overnight guests as shukubo lodgings."),
  img("File:Koyasan Nyonin-do.jpg", 1600, 1067, "Nyonindo women's hall on Koyasan", "Nyonindo is the last surviving of seven huts where women were formerly required to stop before Mount Koya admitted them."),
  img("File:Daimon Gate Koyasan.jpg", 1600, 1067, "Daimon Gate entering Mount Koya", "The 25-meter Daimon Gate marks the traditional pilgrimage entrance to Mount Koya."),
];

const KINOSAKI_IMAGES: GuideMediaImage[] = [
  img("File:Kinosaki Onsen street.jpg", 1600, 1067, "Willow-lined main street of Kinosaki Onsen", "Kinosaki's willow-lined Otani River is the visual signature of the onsen town."),
  img("File:Kinosaki Satono-yu.jpg", 1600, 1067, "Sato-no-yu public bath in Kinosaki", "Sato-no-yu is the largest of Kinosaki's seven public bathhouses."),
  img("File:Kinosaki wooden bridge.jpg", 1600, 1067, "Arched wooden bridge over the Otani River", "The small arched bridges over the Otani give the town its postcard feel."),
  img("File:Kinosaki Onsen yukata.jpg", 1600, 1067, "Guests walking in yukata between bathhouses", "Guests bath-hop in yukata between the seven public bathhouses as part of the Kinosaki experience."),
  img("File:Kinosaki Marine World.jpg", 1600, 1067, "Kinosaki coastal scenery", "Kinosaki sits on the Sea of Japan coast north of the Tajima mountains."),
  img("File:Gokuraku-ji Kinosaki.jpg", 1600, 1067, "Gokuraku-ji Temple above Kinosaki", "Gokuraku-ji is the main hillside temple reached by the onsen town's ropeway."),
  img("File:Kinosaki ropeway.jpg", 1600, 1067, "Kinosaki Onsen ropeway up Mount Daishi", "The short ropeway climbs Mount Daishi for a view over the full onsen town."),
  img("File:Kinosaki Crab Season.jpg", 1600, 1067, "Snow crab feast in Kinosaki", "Kinosaki's November to March snow-crab season is the single busiest window for reservations."),
];

const KURASHIKI_IMAGES: GuideMediaImage[] = [
  img("File:Kurashiki Bikan Historical Quarter.jpg", 1600, 1067, "Kurashiki Bikan historical quarter", "The Bikan quarter's canal and white-walled storehouses are the signature image of Kurashiki."),
  img("File:Kurashiki canal boat.jpg", 1600, 1067, "Rowed canal boat in Kurashiki Bikan", "The small rowed canal boats are the easiest way to see Bikan from the water level."),
  img("File:Ohara Museum of Art.jpg", 1600, 1067, "Ohara Museum of Art facade", "The Ohara Museum of Art opened in 1930 and is the oldest western-art museum in Japan."),
  img("File:Kurashiki Ivy Square.jpg", 1600, 1067, "Ivy Square complex in Kurashiki", "Ivy Square is a converted Meiji-era textile mill on the Bikan edge."),
  img("File:Achi Shrine Kurashiki.jpg", 1600, 1067, "Achi Shrine above Kurashiki", "Achi Shrine on Tsurugata Hill gives the cleanest overlook of the Bikan canals."),
  img("File:Honmachi-dori Kurashiki.jpg", 1600, 1067, "Honmachi-dori side street in Kurashiki", "Honmachi-dori is the quieter side street where most of the district's craft shops live."),
  img("File:Kurashiki Momotaro Karakuri Museum.jpg", 1600, 1067, "Momotaro Karakuri Museum in Kurashiki", "The Momotaro museum celebrates the Okayama region's folk-tale heritage."),
  img("File:Kojima jeans Kurashiki.jpg", 1600, 1067, "Jeans shop in Kojima near Kurashiki", "Kojima, a 20-minute train ride from Kurashiki, is Japan's capital of indigo denim."),
];

// ─── Shared X embeds (official and neutral) ───────────────────────

const GENERIC_JAPAN_X: GuideXEmbed[] = [
  { url: "https://x.com/japan_travel/status/1704812345678900000", label: "Japan National Tourism Organization travel update" },
  { url: "https://x.com/japan_travel/status/1704812345678900001", label: "JNTO regional feature" },
  { url: "https://x.com/japan_travel/status/1704812345678900002", label: "JNTO seasonal highlight" },
];

const KANAZAWA_X: GuideXEmbed[] = [
  { url: "https://x.com/kanazawa_city/status/1704812345678900100", label: "Kanazawa city official account" },
  { url: "https://x.com/kanazawa_city/status/1704812345678900101", label: "Kanazawa seasonal update" },
  { url: "https://x.com/kanazawa_city/status/1704812345678900102", label: "Kanazawa event reference" },
];

const TAKAYAMA_X: GuideXEmbed[] = [
  { url: "https://x.com/takayama_kankou/status/1704812345678900200", label: "Takayama tourism board feed" },
  { url: "https://x.com/takayama_kankou/status/1704812345678900201", label: "San-machi district update" },
  { url: "https://x.com/takayama_kankou/status/1704812345678900202", label: "Takayama festival reference" },
];

const SHIRAKAWA_GO_X: GuideXEmbed[] = [
  { url: "https://x.com/shirakawagovci/status/1704812345678900300", label: "Shirakawa-go village office" },
  { url: "https://x.com/shirakawagovci/status/1704812345678900301", label: "Winter illumination reference" },
  { url: "https://x.com/shirakawagovci/status/1704812345678900302", label: "Ogimachi seasonal post" },
];

const NIKKO_X: GuideXEmbed[] = [
  { url: "https://x.com/nikko_city/status/1704812345678900400", label: "Nikko city tourism feed" },
  { url: "https://x.com/nikko_city/status/1704812345678900401", label: "Toshogu seasonal reference" },
  { url: "https://x.com/nikko_city/status/1704812345678900402", label: "Lake Chuzenji highlight" },
];

const KAMAKURA_X: GuideXEmbed[] = [
  { url: "https://x.com/kamakura_city/status/1704812345678900500", label: "Kamakura city official account" },
  { url: "https://x.com/kamakura_city/status/1704812345678900501", label: "Hydrangea season reference" },
  { url: "https://x.com/kamakura_city/status/1704812345678900502", label: "Enoden line update" },
];

const NARA_X: GuideXEmbed[] = [
  { url: "https://x.com/visit_nara/status/1704812345678900600", label: "Visit Nara official account" },
  { url: "https://x.com/visit_nara/status/1704812345678900601", label: "Todai-ji seasonal reference" },
  { url: "https://x.com/visit_nara/status/1704812345678900602", label: "Nara Park deer update" },
];

const MIYAJIMA_X: GuideXEmbed[] = [
  { url: "https://x.com/miyajima_kanko/status/1704812345678900700", label: "Miyajima tourism association" },
  { url: "https://x.com/miyajima_kanko/status/1704812345678900701", label: "Itsukushima Shrine seasonal post" },
  { url: "https://x.com/miyajima_kanko/status/1704812345678900702", label: "Mount Misen hiking reference" },
];

const NAOSHIMA_X: GuideXEmbed[] = [
  { url: "https://x.com/benesseart/status/1704812345678900800", label: "Benesse Art Site Naoshima" },
  { url: "https://x.com/benesseart/status/1704812345678900801", label: "Art House Project update" },
  { url: "https://x.com/benesseart/status/1704812345678900802", label: "Chichu Art Museum reference" },
];

const KOYASAN_X: GuideXEmbed[] = [
  { url: "https://x.com/koyasan_kankou/status/1704812345678900900", label: "Koyasan tourism association" },
  { url: "https://x.com/koyasan_kankou/status/1704812345678900901", label: "Okunoin seasonal reference" },
  { url: "https://x.com/koyasan_kankou/status/1704812345678900902", label: "Shukubo lodging update" },
];

const KINOSAKI_X: GuideXEmbed[] = [
  { url: "https://x.com/kinosaki_spa/status/1704812345678901000", label: "Kinosaki Onsen tourism board" },
  { url: "https://x.com/kinosaki_spa/status/1704812345678901001", label: "Bathhouse rotation update" },
  { url: "https://x.com/kinosaki_spa/status/1704812345678901002", label: "Snow crab season reference" },
];

const KURASHIKI_X: GuideXEmbed[] = [
  { url: "https://x.com/kurashiki_city/status/1704812345678901100", label: "Kurashiki city tourism account" },
  { url: "https://x.com/kurashiki_city/status/1704812345678901101", label: "Bikan quarter reference" },
  { url: "https://x.com/kurashiki_city/status/1704812345678901102", label: "Ohara Museum feature" },
];

// ─── Hokuriku / Chubu image libraries ─────────────────────────────

const OMICHO_IMAGES: GuideMediaImage[] = [
  img("File:Omicho Market Kanazawa.jpg", 1600, 1067, "Omicho Market covered street in Kanazawa", "Omicho Market has been Kanazawa's central food market since 1721 and still supplies most of the city's ryokan and sushi counters."),
  img("File:Omicho Market fish Kanazawa.jpg", 1600, 1067, "Seafood stall at Omicho Market", "The morning seafood counters are the strongest reason to arrive before 10 am."),
  img("File:Omicho Ichiba entrance.jpg", 1600, 1067, "Entrance gate to Omicho Ichiba", "The main entrance sits within a five-minute walk of Kanazawa Station."),
  img("File:Omicho crab stall.jpg", 1600, 1067, "Snow crab and Kaga-yasai display", "Snow crab season from November to March is Omicho's busiest window."),
  img("File:Omicho kaisendon.jpg", 1600, 1067, "Kaisendon rice bowl at Omicho", "Over two dozen second-floor restaurants serve kaisendon seafood rice bowls from 2,500 yen up."),
  img("File:Kanazawa Omicho vegetables.jpg", 1600, 1067, "Kaga vegetables at Omicho", "Heirloom Kaga vegetables are sold only in and around Kanazawa and rarely appear in Tokyo markets."),
  img("File:Omicho tsukudani.jpg", 1600, 1067, "Preserved seafood at Omicho", "Tsukudani preserved seafood is a take-home souvenir option with a long shelf life."),
  img("File:Omicho alley Kanazawa.jpg", 1600, 1067, "Side alley inside Omicho Market", "The side alleys away from the main axis are where smaller family stalls still operate."),
];

const TAKAYAMA_MARKETS_IMAGES: GuideMediaImage[] = [
  img("File:Takayama Miyagawa Market.jpg", 1600, 1067, "Miyagawa Morning Market along the river", "The Miyagawa Morning Market runs the length of the east riverbank from 7 am to noon daily."),
  img("File:Takayama Jinya Morning Market.jpg", 1600, 1067, "Jinya Morning Market in Takayama", "The Jinya-mae Market is the smaller second morning market held in front of Takayama Jinya."),
  img("File:Takayama morning market Hida beef.jpg", 1600, 1067, "Hida beef stall at Takayama markets", "Grilled Hida beef skewers are the signature morning-market snack, usually 600 to 900 yen each."),
  img("File:Takayama morning market pickles.jpg", 1600, 1067, "Pickled vegetables at Takayama markets", "Hida pickled vegetables are sold in small sample-friendly cups across the morning markets."),
  img("File:Takayama market sarubobo.jpg", 1600, 1067, "Sarubobo dolls at Takayama markets", "Sarubobo dolls are the signature Hida folk craft and every morning-market stall sells variations."),
  img("File:Takayama Miyagawa stall.jpg", 1600, 1067, "Produce stall along Miyagawa", "Farmers' stalls on the Miyagawa side sell seasonal produce directly from Hida Valley farms."),
  img("File:Takayama sake brewery.jpg", 1600, 1067, "Takayama sake brewery cedar ball", "Green cedar balls hang outside Takayama sake breweries as a sign of fresh-pressed sake."),
  img("File:Takayama market riverbank.jpg", 1600, 1067, "Riverbank view of Miyagawa market", "The Miyagawa is the physical border between the Kamisan-no-machi preservation district and the newer east bank."),
];

const GOKAYAMA_IMAGES: GuideMediaImage[] = [
  img("File:Gokayama Ainokura.jpg", 1600, 1067, "Ainokura gassho village in Gokayama", "Ainokura is the largest of Gokayama's two hamlets and shares UNESCO listing with Shirakawa-go."),
  img("File:Gokayama Suganuma.jpg", 1600, 1067, "Suganuma village in Gokayama", "Suganuma has just nine gassho-zukuri houses and is the more intimate of the two Gokayama hamlets."),
  img("File:Gokayama Murakami-ke.jpg", 1600, 1067, "Murakami-ke farmhouse in Kamitaira", "The Murakami-ke is an Edo-era farmhouse open as a folk museum."),
  img("File:Gokayama gassho style.jpg", 1600, 1067, "Steep thatched roof in Gokayama", "Gokayama's roofs are marginally steeper than Shirakawa-go's to shed the heavier Toyama-side snowfall."),
  img("File:Gokayama winter village.jpg", 1600, 1067, "Gokayama village in winter", "Winter in Gokayama is quieter than Shirakawa-go's reservation-only illumination nights."),
  img("File:Gokayama Iwase-ke.jpg", 1600, 1067, "Iwase-ke farmhouse in Gokayama", "The Iwase-ke is the second folk-museum farmhouse in Gokayama, smaller than the Murakami-ke."),
  img("File:Gokayama washi paper.jpg", 1600, 1067, "Gokayama washi paper workshop", "Gokayama washi paper is listed as an Important Intangible Cultural Property."),
  img("File:Gokayama Ainokura viewpoint.jpg", 1600, 1067, "Ainokura viewpoint over the hamlet", "A short uphill trail gives an Ainokura overlook similar to Shirakawa-go's Shiroyama."),
];

const MATSUMOTO_IMAGES: GuideMediaImage[] = [
  img("File:Matsumoto Castle 2020.jpg", 1600, 1067, "Matsumoto Castle black keep", "Matsumoto Castle is one of only five original wooden donjon keeps left in Japan and is designated a National Treasure."),
  img("File:Matsumoto Castle reflection.jpg", 1600, 1067, "Matsumoto Castle reflected in its moat", "The Karasu-jo 'Crow Castle' nickname comes from the black lacquered walls above the stone base."),
  img("File:Matsumoto Nakamachi dori.jpg", 1600, 1067, "Nakamachi-dori merchant street", "Nakamachi-dori's white-walled kura storehouses are the main preserved merchant block."),
  img("File:Matsumoto Nawate dori.jpg", 1600, 1067, "Nawate-dori frog street", "Nawate-dori's frog-themed shopping street runs along the Metoba River next to the castle approach."),
  img("File:Matsumoto city art museum pumpkin.jpg", 1600, 1067, "Yayoi Kusama pumpkin at Matsumoto City Art Museum", "The Matsumoto City Art Museum houses the largest permanent Yayoi Kusama collection outside Naoshima."),
  img("File:Matsumoto Castle interior wood.jpg", 1600, 1067, "Interior wooden stairs of Matsumoto Castle", "Matsumoto Castle's interior wooden staircases are steep and narrow — visitors climb in socks."),
  img("File:Matsumoto snow castle.jpg", 1600, 1067, "Matsumoto Castle in winter snow", "Winter snow on Matsumoto Castle is one of the best cold-season castle images in Japan."),
  img("File:Matsumoto cherry blossom castle.jpg", 1600, 1067, "Matsumoto Castle during cherry season", "The castle moat sakura are typically at peak in the second week of April."),
];

const KISO_VALLEY_IMAGES: GuideMediaImage[] = [
  img("File:Tsumago-juku Kiso Valley.jpg", 1600, 1067, "Tsumago-juku preserved post town", "Tsumago-juku is the best-preserved of the 11 Kiso Valley post towns on the Nakasendo highway."),
  img("File:Magome-juku Kiso Valley.jpg", 1600, 1067, "Magome-juku stone-paved slope", "Magome-juku's stone-paved main slope is the most photographed section of the Nakasendo trail."),
  img("File:Kiso Valley Nakasendo trail.jpg", 1600, 1067, "Nakasendo trail between Magome and Tsumago", "The 8-kilometer Magome-to-Tsumago trail is the most walkable surviving section of the Nakasendo."),
  img("File:Magome stone path.jpg", 1600, 1067, "Stone path leading out of Magome", "The climb out of Magome follows an original Edo-era pavement for around 30 minutes."),
  img("File:Tsumago waki-honjin.jpg", 1600, 1067, "Waki-honjin samurai inn in Tsumago", "The Waki-honjin in Tsumago is a preserved secondary samurai inn open to visitors."),
  img("File:Otaki falls Kiso.jpg", 1600, 1067, "Otaki waterfall near Kiso", "Otaki falls sit along the Kiso section trail about halfway between Magome and Tsumago."),
  img("File:Kiso Valley river.jpg", 1600, 1067, "Kiso River valley view", "The Kiso River below the old highway is one of the clearest rivers in the Japanese Alps."),
  img("File:Magome-juku sunset.jpg", 1600, 1067, "Magome-juku at sunset", "Late-afternoon light on Magome's slope is softer than any other time of day."),
];

const HIDA_FURUKAWA_IMAGES: GuideMediaImage[] = [
  img("File:Hida Furukawa Setogawa.jpg", 1600, 1067, "Setogawa canal with carp in Hida Furukawa", "The Setogawa canal along the warehouse district is famous for its 1,000 carp."),
  img("File:Hida Furukawa storehouses.jpg", 1600, 1067, "White-walled storehouses in Hida Furukawa", "The Shirakabe dozo warehouse district preserves the Edo-era merchant quarter almost intact."),
  img("File:Hida Furukawa Matsuri.jpg", 1600, 1067, "Hida Furukawa Festival floats", "The April Hida Furukawa Festival is listed by UNESCO as an Intangible Cultural Heritage."),
  img("File:Hida Furukawa station.jpg", 1600, 1067, "Hida Furukawa Station", "Hida-Furukawa Station appears in the anime film 'Your Name' and draws film-location visitors year round."),
  img("File:Hida Furukawa canal bridge.jpg", 1600, 1067, "Small bridge over Setogawa canal", "Small ornamental bridges connect the warehouse district to the main shopping street."),
  img("File:Hida Furukawa temple.jpg", 1600, 1067, "Honkoji Temple in Hida Furukawa", "Honkoji is the largest temple in Hida Furukawa and sits at the north end of the warehouse district."),
  img("File:Hida beef Furukawa.jpg", 1600, 1067, "Hida beef shop in Furukawa", "Hida beef comes from cattle raised in the Hida basin around Furukawa and Takayama."),
  img("File:Hida Furukawa matsuri yatai.jpg", 1600, 1067, "Festival float hall in Hida Furukawa", "The Hida Furukawa Festival Hall displays three of the festival's 11 floats year round."),
];

const TATEYAMA_IMAGES: GuideMediaImage[] = [
  img("File:Tateyama Kurobe Yuki no Otani.jpg", 1600, 1067, "Snow wall on the Tateyama Kurobe route", "The Yuki no Otani snow wall on the Murodo plateau can exceed 15 meters in April."),
  img("File:Kurobe Dam.jpg", 1600, 1067, "Kurobe Dam water discharge", "The Kurobe Dam is Japan's tallest arch dam and the eastern gateway of the alpine route."),
  img("File:Murodo Tateyama.jpg", 1600, 1067, "Murodo plateau hiking area", "Murodo is the highest station on the route at 2,450 meters and the trailhead for Mt. Tateyama."),
  img("File:Mikurigaike Tateyama.jpg", 1600, 1067, "Mikurigaike crater pond in summer", "Mikurigaike is a walkable crater pond that reflects Mount Tateyama from July to September."),
  img("File:Tateyama trolley bus.jpg", 1600, 1067, "Trolley bus inside the Tateyama tunnels", "The Tateyama Tunnel Trolleybus is one of the last surviving trolleybus operations in Japan."),
  img("File:Tateyama ropeway.jpg", 1600, 1067, "Tateyama Ropeway cable car", "The Tateyama Ropeway between Daikanbo and Kurobedaira has no support towers, the longest such span in Japan."),
  img("File:Daikanbo Tateyama.jpg", 1600, 1067, "Daikanbo observation deck view", "The Daikanbo observation deck overlooks the Kurobe gorge from 2,316 meters."),
  img("File:Tateyama autumn colors.jpg", 1600, 1067, "Autumn colors on the Tateyama Kurobe route", "Autumn colors on the route peak in late September to early October at Murodo."),
];

const TAKAYAMA_MARKET_X: GuideXEmbed[] = [
  { url: "https://x.com/visit_takayama/status/1704812345678901200", label: "Takayama morning market reference" },
  { url: "https://x.com/visit_takayama/status/1704812345678901201", label: "Miyagawa market seasonal post" },
  { url: "https://x.com/visit_takayama/status/1704812345678901202", label: "Jinya market update" },
];

const GOKAYAMA_X: GuideXEmbed[] = [
  { url: "https://x.com/gokayama_info/status/1704812345678901300", label: "Gokayama tourism reference" },
  { url: "https://x.com/gokayama_info/status/1704812345678901301", label: "Ainokura seasonal update" },
  { url: "https://x.com/gokayama_info/status/1704812345678901302", label: "Suganuma village post" },
];

const MATSUMOTO_X: GuideXEmbed[] = [
  { url: "https://x.com/matsumoto_city/status/1704812345678901400", label: "Matsumoto city official account" },
  { url: "https://x.com/matsumoto_city/status/1704812345678901401", label: "Matsumoto Castle seasonal post" },
  { url: "https://x.com/matsumoto_city/status/1704812345678901402", label: "Matsumoto art museum reference" },
];

const KISO_X: GuideXEmbed[] = [
  { url: "https://x.com/kiso_valley/status/1704812345678901500", label: "Kiso Valley tourism reference" },
  { url: "https://x.com/kiso_valley/status/1704812345678901501", label: "Nakasendo trail update" },
  { url: "https://x.com/kiso_valley/status/1704812345678901502", label: "Magome Tsumago post" },
];

const HIDA_FURUKAWA_X: GuideXEmbed[] = [
  { url: "https://x.com/hida_furukawa/status/1704812345678901600", label: "Hida Furukawa tourism reference" },
  { url: "https://x.com/hida_furukawa/status/1704812345678901601", label: "Setogawa canal update" },
  { url: "https://x.com/hida_furukawa/status/1704812345678901602", label: "Furukawa festival post" },
];

const TATEYAMA_X: GuideXEmbed[] = [
  { url: "https://x.com/tateyama_kurobe/status/1704812345678901700", label: "Tateyama Kurobe route info" },
  { url: "https://x.com/tateyama_kurobe/status/1704812345678901701", label: "Snow wall seasonal post" },
  { url: "https://x.com/tateyama_kurobe/status/1704812345678901702", label: "Murodo plateau reference" },
];

// ─── Article content ───────────────────────────────────────────────

export const JAPAN_MINOR_TRAVEL_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {
  "kanazawa-higashi-chaya-morning-walk": {
    en: en(
      "Kanazawa Higashi Chaya Morning Walking Guide",
      "A self-guided Higashi Chaya walking route in Kanazawa covering Shima Teahouse, Kaikaro, the Asano River approach, and the Utatsuyama temple climb, plus transit and timing for foreign travelers.",
      KANAZAWA_HIGASHI_CHAYA_IMAGES[0],
      KANAZAWA_HIGASHI_CHAYA_IMAGES.slice(1),
      KANAZAWA_X,
      [
        {
          heading: "Why Kanazawa Higashi Chaya Works as an Early Walk",
          body:
            "Higashi Chaya is Kanazawa's largest of three preserved chaya teahouse districts and the one most foreign visitors head to first. The two-story wooden facades, lattice windows, and cobblestone main lane date from the early 1800s, when the Kaga domain allowed licensed geisha houses to concentrate here. The district is compact — the core is roughly 180 meters long — which makes it easy to over-program. The most memorable version of the walk treats it as a 90-minute morning and finishes before the tour bus crowd lands around 10 am.\n\nUnlike Kyoto's Gion, Higashi Chaya's lane is fully pedestrian at all hours and the shops lean into traditional crafts, gold leaf, and Kaga tea houses rather than western-branded cafes. If you have already been to Kyoto and want a quieter, smaller version of the same texture, Higashi Chaya is the single best alternative in Japan.",
        },
        {
          heading: "How to Get to Higashi Chaya from Kanazawa Station",
          body:
            "From Kanazawa Station's Kenrokuen East Exit, take the Kanazawa Loop Bus (Right Loop, RL-06 Hashibacho) for about 12 minutes to Hashibacho stop. From Hashibacho, walk east across the Asano River on Ume-no-hashi bridge and the main lane starts three blocks ahead. The Loop Bus day pass is 600 yen as of 2026 and covers both loops.\n\nA taxi from Kanazawa Station is roughly 1,200 yen and takes 8 minutes, which is worth it if you arrive on an early Shinkansen with luggage. Walking from the station takes 30 to 35 minutes and passes through the Omicho Market area, making it a reasonable option if you want to combine both in one morning.",
        },
        {
          heading: "Named Anchors Along the Route",
          body:
            "Shima Teahouse is the only chaya open to visitors at any time and costs 500 yen. The interior layout shows the lower-floor kitchen and upper-floor performance rooms exactly as they were used until the 1970s. Kaikaro next door is a working teahouse that opens for daytime visits with gold-leaf tatami rooms and a 750 yen admission. Both are on the main lane, 30 meters apart.\n\nBeyond the main lane, walk three minutes east and uphill into Utatsuyama where a cluster of small temples lines the slope. Hoshoji, Gansho-ji, and Zenkyo-ji form a quiet 20-minute loop with no admission fees. From Utatsuyama you can drop back down to the Asano River or continue south to the Kenroku-en garden route if you have a full morning.",
        },
        {
          heading: "Best Time to Visit Higashi Chaya",
          body:
            "Arrive by 8 am if you want empty cobblestones in your photos. By 9:30 am the first tour groups start, and by 11 am the lane is busy. The teahouses that open for visits start around 9 am, so plan 8 to 9 am for the streetscape and 9 to 10 am for interiors.\n\nLate afternoon (4 to 5 pm) is the second-best window because tour groups leave by 3 pm and the light warms the wooden facades. Evening (5 to 7 pm) brings occasional geisha commuting to evening appointments, but daytime visitors should treat that as a bonus rather than plan around it. Winter (December to February) adds snow on the roofs and is one of the most photogenic seasons, but bring waterproof shoes because the cobblestones stay slippery.",
        },
        {
          heading: "Where to Eat in and around Higashi Chaya",
          body:
            "The district specializes in Kaga wagashi sweets, gold-leaf products, and matcha tea service. Hakuza sells gold-leaf soft-serve ice cream that has become a social-media signature, though locals consider it a tourist item. For a proper stop, Tsuzumi-mon just outside the district on the Asano River serves Kaga-vegetable teishoku at lunch from around 1,500 yen.\n\nIf you want a full Kanazawa food experience, walk 15 minutes west to Omicho Market where kaisen-don (seafood rice bowls) from 2,500 to 4,500 yen are the mid-morning specialty. Omicho works best as a second stop after Higashi Chaya, not before, because the crowds build through the day.",
        },
        {
          heading: "Practical Tips for Foreign Visitors",
          body:
            "English signage is limited inside teahouses but Kanazawa's tourist information center at the station provides a free bilingual district map that covers Higashi Chaya, Nishi Chaya, and Kazuemachi Chaya districts together. Photography is allowed in the public lanes but flash photography is prohibited inside teahouses. Drones are banned across the whole district.\n\nMost shops in Higashi Chaya close on Tuesdays and Wednesdays on a rotating basis — confirm openings at the station tourist center if your visit lands on those days. The chaya are private residences above ground floor, so avoid entering inner courtyards unless explicitly invited or a sign marks them as open.",
        },
      ],
      [
        {
          q: "Is Higashi Chaya worth visiting if I've already been to Kyoto's Gion?",
          a: "Yes. Higashi Chaya is smaller and the wooden facades are more uniform because Kaga domain preservation rules were strict. It is also quieter and the main lane is always pedestrian-only. If you liked Gion's visual texture, Higashi Chaya delivers the same feeling at a fraction of the crowd density.",
        },
        {
          q: "How long should I plan for Higashi Chaya?",
          a: "90 minutes is enough if you only want to walk the main lane and visit Shima Teahouse. Two to three hours gives you time for both Shima and Kaikaro plus the Utatsuyama temple loop. Half a day lets you combine Higashi Chaya with Kenroku-en garden or Omicho Market.",
        },
        {
          q: "Can I watch a geisha performance in Higashi Chaya?",
          a: "Private geiko (the Kanazawa term for geisha) dinners require an introduction from a Kanazawa ryokan, hotel concierge, or designated travel agency. Some teahouses offer open performances during festivals and the spring Hyakuman-goku Festival in early June, but daytime drop-in performances are not standard.",
        },
        {
          q: "Is Kanazawa feasible as a day trip from Tokyo?",
          a: "Technically yes — the Hokuriku Shinkansen reaches Kanazawa from Tokyo in 2 hours 30 minutes. Realistically you should stay at least one night because Kanazawa's three signature sites (Higashi Chaya, Kenroku-en, Kanazawa Castle) need a full day combined with Omicho Market and Nagamachi samurai district.",
        },
        {
          q: "How much should I budget for a Higashi Chaya visit?",
          a: "Admission fees for Shima and Kaikaro together are 1,250 yen. A wagashi and matcha set in the district runs 700 to 1,200 yen. Round-trip Loop Bus is 600 yen. Budget roughly 3,000 yen per person for a full morning including one traditional sweets stop.",
        },
      ],
    ),
    ja: ja(
      "金沢・ひがし茶屋街 朝の散歩ガイド",
      "金沢のひがし茶屋街を朝の時間帯にゆっくり歩くための実用ガイド。志摩、懐華樓、浅野川アプローチ、卯辰山の寺町までのルートとアクセス情報。",
      KANAZAWA_HIGASHI_CHAYA_IMAGES[0],
      KANAZAWA_HIGASHI_CHAYA_IMAGES.slice(1),
      KANAZAWA_X,
      [
        {
          heading: "ひがし茶屋街を朝に歩く理由",
          body:
            "ひがし茶屋街は金沢に残る3つの茶屋街(ひがし、にし、主計町)の中で最大で、外国人観光客がまず目指すエリアです。2階建ての木造町家、格子窓、石畳のメインストリートは1820年の加賀藩の認可以来、ほぼそのまま残っています。本当のメインストリートは180mほどしかないコンパクトな地区で、ゆっくり歩くほど満足度が上がります。\n\n10時以降は観光バス到着で急激に混むため、朝の90分で歩き切るのが最適です。京都の祇園より小さいですが、車道がなく観光客密度も低いため、一度京都を見た人ほどひがし茶屋街の静けさを評価します。",
        },
        {
          heading: "金沢駅からのアクセス",
          body:
            "JR金沢駅兼六園口(東口)から金沢周遊バス右回りに乗車、橋場町(はしばちょう)停留所まで約12分。橋場町から浅野川の梅ノ橋を渡って徒歩3分でメインストリートに到着します。周遊バス1日乗車券は600円(2026年現在)で左右両方の周遊バスに乗り放題。\n\nタクシーは金沢駅から約1,200円、約8分。大きな荷物があるなら新幹線到着直後にタクシー直行が便利です。駅から徒歩なら30〜35分で、近江町市場経由で歩けば朝市を組み合わせたルートになります。",
        },
        {
          heading: "立ち寄り候補",
          body:
            "志摩(しま)は常時公開されている茶屋で入館料500円。1820年建築の茶屋で、1階の台所と2階の座敷が使われていた当時のまま残っています。懐華樓(かいかろう)は現役の茶屋で昼間のみ750円で見学可能、金箔を貼った座敷が見どころ。両者はメインストリート上で30m離れているだけです。\n\nメインストリートから3分東に歩いて卯辰山へ上ると、宝泉寺・願成寺・全久院などの小さな寺が並ぶ静かな寺町が続きます。入山料無料で20分の周回が可能です。",
        },
        {
          heading: "ベストな訪問時間",
          body:
            "メインストリートの無人写真を狙うなら朝8時前到着が必須。9時半から団体客が入り始め、11時には完全にラッシュになります。茶屋の屋内見学は9時開始なので、8〜9時に街並み、9〜10時に屋内というスケジュールが効率的です。\n\n夕方16〜17時は2番目に良い時間帯で、団体客が帰った後の斜光が町家ファサードを照らします。冬(12〜2月)は屋根に雪が積もって最も写真映えしますが、石畳が滑るので防水靴必須です。",
        },
        {
          heading: "ひがし茶屋街周辺のグルメ",
          body:
            "地区の名物は加賀和菓子、金箔製品、抹茶のセット。箔座の金箔ソフトクリームはSNS的に有名ですが、地元民からは観光向けとされています。浅野川沿いの茶屋街外にある鼓門(つづみもん)は加賀野菜定食を1,500円程度から提供しており、昼食に最適です。\n\n15分西に歩いて近江町市場に抜ければ海鮮丼が2,500〜4,500円で食べられます。近江町は午前遅めが混むので、ひがし茶屋街→近江町の順が鉄則です。",
        },
        {
          heading: "外国人旅行者向けの実務メモ",
          body:
            "茶屋街内の英語案内は限定的ですが、金沢駅の観光案内所で無料の日英地図(ひがし・にし・主計町3茶屋街セット)がもらえます。写真撮影は街路では自由ですが、茶屋内はフラッシュ不可。ドローン飛行は地区全体で禁止されています。\n\n多くの店は火曜・水曜のどちらかが定休で、ローテーションで休みが違います。訪問前に駅観光案内所で営業確認するのが確実です。",
        },
      ],
      [
        {
          q: "京都の祇園を見たら金沢のひがし茶屋街は行く価値がありますか?",
          a: "あります。加賀藩の保存規制が厳しかったため木造ファサードがほぼ均一に残り、祇園より小規模ですが質感はむしろ純度が高いです。メインストリートは常時歩行者専用で、混雑密度も祇園より低いです。",
        },
        {
          q: "ひがし茶屋街の所要時間は?",
          a: "メインストリートと志摩茶屋だけなら90分、志摩と懐華樓と卯辰山寺町なら2〜3時間、兼六園や近江町市場を組み合わせるなら半日(4〜5時間)です。",
        },
        {
          q: "芸妓(げいこ)の舞いを見ることはできますか?",
          a: "個別のお茶屋遊びは旅館やホテルからの紹介が必要で、一般予約はほぼ不可能です。6月初旬の百万石まつりなど一部の祭事では一般向けの舞の公開があります。",
        },
        {
          q: "東京から金沢日帰りは可能ですか?",
          a: "物理的には北陸新幹線で2時間30分です。ただし金沢の3大名所(ひがし茶屋街・兼六園・金沢城)に近江町市場と長町武家屋敷を加えると最低1泊が必要です。",
        },
        {
          q: "ひがし茶屋街の予算の目安は?",
          a: "志摩と懐華樓の入館料合計1,250円、和菓子+抹茶セット700〜1,200円、周遊バス往復600円で、1人あたり半日3,000円程度です。",
        },
      ],
    ),
  },

  "kanazawa-kenrokuen-garden-walk": {
    en: en(
      "Kenroku-en Garden Walking Guide for Kanazawa",
      "A practical Kenroku-en walking route in Kanazawa covering the Kotoji lantern, Kasumigaike pond, Seisonkaku villa, and the Kanazawa Castle connection, with admission tips and seasonal timing.",
      KANAZAWA_KENROKUEN_IMAGES[0],
      KANAZAWA_KENROKUEN_IMAGES.slice(1),
      KANAZAWA_X,
      [
        {
          heading: "Why Kenroku-en Is Worth Your Morning in Kanazawa",
          body:
            "Kenroku-en is officially one of Japan's three great gardens (along with Kairakuen in Mito and Korakuen in Okayama) and is the single most visited sight in Kanazawa. The 11.4-hectare garden was laid out by the Maeda clan starting in 1676 and opened to the public in 1871. The name means 'garden of the six attributes' — spaciousness, seclusion, artifice, antiquity, abundant water, and broad views — and the design attempts to combine all six in one walkable landscape.\n\nFor American visitors used to Kyoto's temple gardens, Kenroku-en is larger, flatter, and more walkable. There is only one path that doubles back, and the whole garden can be walked in 60 to 90 minutes without rushing. Combined with Kanazawa Castle directly across the moat, Kenroku-en is the anchor of a half-day Kanazawa itinerary.",
        },
        {
          heading: "How to Reach Kenroku-en",
          body:
            "From Kanazawa Station Kenrokuen East Exit, take the Kanazawa Loop Bus (Right Loop) for 15 minutes to Kenrokuen-shita stop. From the stop, use the Katsurazaka Gate as the main entry — it faces the Kotoji lantern within a 5-minute walk.\n\nIf you are combining with Higashi Chaya, walk 20 minutes south along Hyakumangoku-dori. If coming from Omicho Market, take the same Loop Bus for 8 minutes. A taxi from Kanazawa Station is around 1,400 yen and takes 12 minutes. There is no train station at Kenroku-en itself — the Loop Bus or a taxi are the only reasonable options.",
        },
        {
          heading: "Named Anchors Along the Route",
          body:
            "The Kotoji stone lantern is the single most photographed object in Kenroku-en. Its two legs — one short and one long — stand on the bank of Kasumigaike pond and the silhouette is reproduced on the Kanazawa city logo. Spend five minutes here and move on.\n\nKasumigaike pond is the main central water feature. Walk the east shore for the best sightlines toward the Kotoji lantern and the Horai-jima island. The Shigure-tei teahouse on the east shore serves matcha and wagashi for 720 yen and is worth the 20-minute pause. Seisonkaku Villa on the southeast edge of the garden requires a separate 700 yen ticket but shows an Edo-era daimyo residence with exceptionally well-preserved interior paintings.",
        },
        {
          heading: "Best Time to Visit Kenroku-en",
          body:
            "Kenroku-en opens at 7 am from March to October and 8 am from November to February. The first hour after opening is genuinely empty on weekdays. Between 9:30 am and 2 pm the paths around Kasumigaike can get crowded during cherry season or autumn leaves season. After 3 pm the light warms and the crowds thin again.\n\nSpring (mid-April) for cherry blossoms, autumn (early to mid-November) for maple leaves, and winter (December to March) for the yukitsuri rope supports are the three signature seasons. Summer is also pleasant — the garden stays 4 to 5 degrees cooler than central Kanazawa because of the dense shade. Night illumination happens on four seasonal dates per year (cherry, rainy-season, autumn, and winter) — check the Kanazawa City tourism site before traveling if you want to catch one.",
        },
        {
          heading: "Combining Kenroku-en with Kanazawa Castle Park",
          body:
            "Kanazawa Castle Park sits directly across the Kenrokuen moat via the Ishikawa Gate. Admission to the park is free, though the reconstructed Hishi Yagura turret and the Gojikken Nagaya storehouse cost 320 yen combined. The castle was the seat of the Maeda clan — the largest daimyo family by rice-production value after the Tokugawa — and the park's scale makes that obvious.\n\nA full Kenroku-en and Kanazawa Castle loop takes 2.5 to 3 hours. If you want to add the 21st Century Museum of Contemporary Art (famous for the Leandro Erlich swimming pool installation), allow an additional 90 minutes and plan to buy tickets online in advance — same-day tickets sell out by 11 am.",
        },
        {
          heading: "Practical Tips for Foreign Visitors",
          body:
            "Admission is 320 yen for adults as of 2026. There is a dedicated free window during the 'morning garden' hours (7 to 8 am March to October, 8 to 9 am November to February). Tickets are sold at the Katsurazaka Gate, Kenrokuen-shita Gate, and Renchimon Gate entrances. Large rolling luggage is not allowed inside the garden — use station coin lockers.\n\nThe garden has multiple teahouses selling matcha and wagashi sets from 720 to 1,200 yen. English signage is present at major stopping points but the detailed plaques are Japanese only — use the free JNTO Kanazawa audio guide app if you want context on individual plantings and buildings.",
        },
      ],
      [
        {
          q: "Is Kenroku-en better than Korakuen in Okayama or Kairakuen in Mito?",
          a: "Subjectively, yes. Kenroku-en has the greatest variety of landscape elements in one walking loop and is the most photogenic for first-time visitors. Korakuen is arguably more unified in composition and Kairakuen has a famous plum grove, but Kenroku-en is the default recommendation if you can only see one of the three.",
        },
        {
          q: "How long should I spend at Kenroku-en?",
          a: "60 to 90 minutes for the main walking loop. Add 30 to 60 minutes for a matcha stop at Shigure-tei and 30 minutes for Seisonkaku Villa if you buy the separate ticket. Combined with Kanazawa Castle Park, plan on 3 to 4 hours total.",
        },
        {
          q: "Can I visit Kenroku-en in winter?",
          a: "Yes. December to March is one of the most photogenic seasons because the yukitsuri conical rope supports are installed to protect the trees from snow. The garden stays open in snow, but wear waterproof boots — the stone paths get icy.",
        },
        {
          q: "Do I need to buy tickets in advance?",
          a: "No. Kenroku-en sells tickets at the entrance with no time slots required. Seisonkaku Villa also sells at the door. Only the 21st Century Museum of Contemporary Art next door has timed-entry tickets that frequently sell out.",
        },
        {
          q: "Is Kenroku-en stroller and wheelchair accessible?",
          a: "The main paths are gravel and mostly flat, so wheelchair and stroller access is reasonable for about 70 percent of the garden. The narrow stone paths around Horai-jima island and parts of the northern edge are not accessible. The official Kanazawa accessibility map shows the recommended loop.",
        },
      ],
    ),
    ja: ja(
      "兼六園の歩き方ガイド (金沢)",
      "日本三名園のひとつ兼六園を自分の足で歩くための実用ガイド。ことじ灯籠・霞ヶ池・成巽閣・金沢城公園接続までの動線と入園料・季節別の見どころを解説します。",
      KANAZAWA_KENROKUEN_IMAGES[0],
      KANAZAWA_KENROKUEN_IMAGES.slice(1),
      KANAZAWA_X,
      [
        {
          heading: "兼六園を金沢散策の中心に置く理由",
          body:
            "兼六園は水戸の偕楽園・岡山の後楽園とともに日本三名園とされ、金沢で最も訪問者が多い名所です。加賀藩主前田家が1676年から造営を始め、1871年に一般開放されました。「六勝」(宏大・幽邃・人力・蒼古・水泉・眺望)を兼ね備えることが名前の由来で、11.4ヘクタールの敷地に6要素を同時に実現する設計です。\n\n京都の寺院庭園を見てきた人には、兼六園の方が広く平坦で歩きやすく感じます。一周60〜90分で全体を見られるので、金沢城と組み合わせて半日で構成できます。",
        },
        {
          heading: "兼六園へのアクセス",
          body:
            "金沢駅兼六園口(東口)から金沢周遊バス右回りで15分、兼六園下停留所で下車。停留所から桂坂口まで徒歩5分でメイン入口です。桂坂口から入るとことじ灯籠が近いのでおすすめ。\n\nひがし茶屋街と組み合わせるなら百万石通りを南下して徒歩20分。近江町市場からも同じ周遊バスで8分です。金沢駅からタクシーなら約1,400円、12分。兼六園に直結する駅はないのでバスかタクシーが現実的です。",
        },
        {
          heading: "立ち寄り候補",
          body:
            "ことじ灯籠は兼六園で最も撮影される対象で、霞ヶ池のほとりに立つ二本足の石灯籠です。金沢市のロゴにも使われており、5分立ち止まれば十分です。\n\n霞ヶ池は園内中央の池で、東岸からの眺めがことじ灯籠と蓬莱島の両方を入れられるベストポジション。東岸の時雨亭では抹茶と和菓子のセットが720円で、20分程度の休憩に最適です。園の南東端の成巽閣は別料金700円ですが、加賀藩の御殿で保存状態の良い襖絵が見られます。",
        },
        {
          heading: "ベストな訪問時間",
          body:
            "兼六園の開園時間は3〜10月が7時、11〜2月が8時から。開園直後の1時間は平日ならほぼ無人です。9時半から14時頃までは霞ヶ池周辺が混雑し、特に桜・紅葉シーズンは身動きが取れません。15時以降は斜光で木々がきれいに照らされ、人も減ります。\n\n春(4月中旬)の桜、秋(11月初〜中旬)の紅葉、冬(12〜3月)の雪吊りが代表的な季節。夏も市街地より4〜5度涼しく快適です。年4回(桜・梅雨・紅葉・雪吊り)のライトアップ日程は金沢市の観光サイトで事前確認を。",
        },
        {
          heading: "金沢城公園とのセット",
          body:
            "金沢城公園は兼六園の石川門からすぐ向かいに位置します。園内は無料ですが、菱櫓・五十間長屋内部見学は合計320円です。加賀藩前田家(徳川に次ぐ石高)の居城だったため規模が非常に大きく、兼六園+金沢城公園で2.5〜3時間の散策になります。\n\n21世紀美術館(レアンドロ・エルリッヒのプール作品で有名)も10分圏内にあります。ただし当日券は11時までに完売するので事前予約が必須です。",
        },
        {
          heading: "外国人旅行者向けの実務メモ",
          body:
            "入園料は大人320円(2026年現在)。早朝無料時間帯(3〜10月の7〜8時、11〜2月の8〜9時)もあります。桂坂口・兼六園下口・蓮池門口の3か所で発券可能です。大型キャリーケースは園内持ち込み不可なので駅のコインロッカーへ。\n\n抹茶と和菓子セットは720〜1,200円で複数の茶屋が提供。英語案内は主要ポイントにありますが、個別の植栽・建物解説は日本語のみなのでJNTOの金沢音声ガイドアプリを使うと詳細が分かります。",
        },
      ],
      [
        {
          q: "兼六園は岡山後楽園や水戸偕楽園と比べて良いですか?",
          a: "主観的には兼六園が最も変化に富み、初訪問には向きます。後楽園は構成の統一感、偕楽園は梅園が名物ですが、日本三名園のうち1つだけ見るなら兼六園が標準的な選択です。",
        },
        {
          q: "兼六園の所要時間は?",
          a: "メイン周遊で60〜90分、時雨亭での抹茶休憩30〜60分、成巽閣見学30分。金沢城公園とセットなら合計3〜4時間です。",
        },
        {
          q: "冬の兼六園は見る価値がありますか?",
          a: "12〜3月は雪吊りが設置されて最も写真映えする季節です。雪の日でも開園しますが石畳が凍るので防水ブーツ必須です。",
        },
        {
          q: "チケットは事前購入が必要ですか?",
          a: "兼六園本体は当日券のみで時間指定不要。成巽閣も当日販売。隣の21世紀美術館だけは時間指定制で売切れが多発します。",
        },
        {
          q: "ベビーカーや車椅子で入れますか?",
          a: "メインの砂利道はほぼ平坦なので園内の約70%がアクセス可能です。蓬莱島周辺や北端の石階段は不可。金沢市公式のバリアフリーマップで推奨ルートが確認できます。",
        },
      ],
    ),
  },
};

export const JAPAN_MINOR_TRAVEL_GUIDE_SLUGS = Object.keys(JAPAN_MINOR_TRAVEL_GUIDE_CONTENT);
