import { createHash } from "node:crypto";

import type { GuideLocale } from "./extraGuides";
import { MINOR_GUIDE_CANON } from "./minorGuideCanon";

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
    creditUrl: commonsFileUrl(fileTitle.replace(/^ファイル:/, "File:")),
  };
}

type GuideRegion = "kyoto-osaka" | "kanto" | "kansai";

const GUIDE_CTA_TITLES: Record<GuideRegion, { ja: string; en: string }> = {
  "kyoto-osaka": {
    ja: "京都・大阪の現地判断を軽くしておく",
    en: "Keep Kyoto and Osaka route changes easy on the ground",
  },
  kanto: {
    ja: "関東の街歩きの現地判断を軽くしておく",
    en: "Keep your Kanto walking-route decisions easy on the ground",
  },
  kansai: {
    ja: "関西の街歩きの現地判断を軽くしておく",
    en: "Keep your Kansai walking-route decisions easy on the ground",
  },
};

function guideCta(locale: GuideLocale, region: GuideRegion = "kyoto-osaka") {
  const title = GUIDE_CTA_TITLES[region][locale === "ja" ? "ja" : "en"];
  return locale === "ja"
    ? {
        ctaTitle: title,
        ctaButton: "日本のeSIMを見る",
        breadcrumbGuide: "ガイド",
        breadcrumbHome: "ホーム",
      }
    : {
        ctaTitle: title,
        ctaButton: "View Japan eSIM plans",
        breadcrumbGuide: "Guides",
        breadcrumbHome: "Home",
      };
}

function jpContent(
  title: string,
  description: string,
  heroImage: GuideMediaImage | undefined,
  gallery: GuideMediaImage[],
  xEmbeds: GuideXEmbed[],
  sections: { heading: string; body: string }[],
  faq: { q: string; a: string }[],
  region: GuideRegion = "kyoto-osaka",
): GuideArticleContent {
  return {
    title,
    description,
    heroImage,
    gallery,
    xSectionTitle: "Xで現地の空気を確かめる",
    xSectionDescription:
      "埋め込みは各記事の場所やテーマに寄せて選び直し、汎用ポストを機械的に使い回さないようにしています。",
    xEmbeds,
    sections,
    faq,
    ...guideCta("ja", region),
  };
}

function enContent(
  title: string,
  description: string,
  heroImage: GuideMediaImage | undefined,
  gallery: GuideMediaImage[],
  xEmbeds: GuideXEmbed[],
  sections: { heading: string; body: string }[],
  faq: { q: string; a: string }[],
  region: GuideRegion = "kyoto-osaka",
): GuideArticleContent {
  return {
    title,
    description,
    heroImage,
    gallery,
    xSectionTitle: "Recent X posts that actually fit this route",
    xSectionDescription:
      "These embeds are selected per guide so the references stay tied to the district, operator, or institution the article is actually about.",
    xEmbeds,
    sections,
    faq,
    ...guideCta("en", region),
  };
}

const DEMACHIYANAGI_IMAGES: GuideMediaImage[] = [
  commonsThumbImage("File:Tadasu River Banks - Kamo River - Kyoto - DSC06593.JPG", 1600, 1067, "Kamo Delta riverbanks near Demachiyanagi in Kyoto", "The river confluence matters because this route is really about north-Kyoto breathing room before the city tightens again."),
  commonsThumbImage("File:鴨川デルタ3.jpg", 1600, 1067, "Stepping-stone area at the Kamo Delta in Kyoto", "The stepping stones are useful less as a checklist stop and more as a visual marker for the slower Demachiyanagi pace."),
  commonsThumbImage("File:Demachiyanagi01.JPG", 1600, 1200, "Demachiyanagi Station entrance in Kyoto", "A station-front image keeps the route honest about where most foreign travelers will actually begin."),
  commonsThumbImage("File:Demachiyanagi station building 20221008.jpg", 1600, 1067, "Demachiyanagi station building and forecourt", "The forecourt matters because the first five minutes decide whether the half day feels calm or fragmented."),
  commonsThumbImage("File:Eizan-Demachiyanagi-ticketgate.jpg", 1600, 1200, "Eizan Railway ticket gate at Demachiyanagi", "This adds the practical transfer context that makes the route easy to copy after a train arrival."),
  commonsThumbImage("File:Honden of Kamomioya Jinsha (43).jpg", 1600, 1067, "Main sanctuary area at Shimogamo Shrine", "Shimogamo is one of the route's real anchors, so the guide needs one clear shrine image rather than only generic greenery."),
  commonsThumbImage("File:Rōmon, Shimogamo-jinja.jpg", 1600, 1067, "Romon gate at Shimogamo Shrine", "A gate view makes the shrine segment read like an actual sequence instead of a vague Kyoto mood board."),
  commonsThumbImage("File:Tadasu no mori 200906a.jpg", 1600, 1067, "Wooded path inside Tadasu no Mori", "The forest path is the tone-setting transition between the river and the shrine precincts."),
  commonsThumbImage("File:KyotoBotanicalGarden.jpg", 1600, 1067, "Open grounds at Kyoto Botanical Garden", "The botanical garden works as the cleanest extension when the Demachiyanagi half day still has energy left."),
  commonsThumbImage("File:Kyoto Botanical Garden - inside conservatory.JPG", 1600, 1067, "Conservatory interior at Kyoto Botanical Garden", "One conservatory image matters because the guide is meant to stay useful even when the weather turns less cooperative."),
];

const FUSHIMI_IMAGES: GuideMediaImage[] = [
  commonsThumbImage("File:Gekkeikan Okura Sake Museum02s4592.jpg", 1600, 1067, "Gekkeikan Okura Sake Museum exterior in Fushimi", "The museum frontage signals immediately that this half day is about brewery streets and not another temple-heavy Kyoto loop."),
  commonsThumbImage("File:月桂冠大倉記念館 酒樽.jpg", 1600, 1067, "Sake barrels at Gekkeikan Okura Sake Museum", "A barrel image helps the article stay rooted in sake-making texture instead of drifting into abstract Kyoto nostalgia."),
  commonsThumbImage("File:Kyoto Fushimi Horikawa02s4592.jpg", 1600, 1067, "Canal-side scene in Fushimi, Kyoto", "The canal is one of the route's strongest visual arguments for choosing Fushimi over denser central-Kyoto blocks."),
  commonsThumbImage("File:Teradaya fg2.jpg", 1600, 1067, "Teradaya facade in Fushimi", "Teradaya gives the walk one historical anchor without forcing the whole page into a history-lecture tone."),
  commonsThumbImage("File:KH-ChushojimaStation-2.jpg", 1600, 1067, "Chushojima Station platform scene", "Station imagery matters here because Chushojima is the practical hinge that keeps the district easy to enter and leave."),
  commonsThumbImage("File:KH-ChushojimaStation-NorthGate.jpg", 1600, 1067, "North gate at Chushojima Station", "A gate view shows the traveler's actual decision point instead of only the postcard side of the neighborhood."),
  commonsThumbImage("File:Keihan Chushojima station south exit.jpg", 1600, 1067, "South exit at Chushojima Station", "The extra exit image keeps the route practical for visitors navigating the district from rail transfers."),
  commonsThumbImage("File:Kizakura Kappa Country03n4592.jpg", 1600, 1067, "Kizakura Kappa Country building in Fushimi", "One additional brewery-linked stop keeps the district from collapsing into a single-museum itinerary."),
  commonsThumbImage("File:Matsumoto Syuzo Kyoto JPN.jpg", 1600, 1067, "Traditional brewery building in Fushimi", "The guide needs brewery architecture in the photo set because that streetscape is the real reason the walk works."),
  commonsThumbImage("File:The birthplace of Ginza Fushimi Kyoto JPN.jpg", 1600, 1067, "Historic street marker in Fushimi", "A final street-level detail helps the page read like a district walk rather than a museum-only stop."),
];

const SUMIYOSHI_IMAGES: GuideMediaImage[] = [
  commonsThumbImage("File:Sumiyoshi-taisha, keidai-2.jpg", 1600, 1067, "Grounds of Sumiyoshi Taisha in Osaka", "The route works because shrine space and tram pacing sit close together rather than because one major landmark overwhelms the day."),
  commonsThumbImage("File:Sumiyoshi-taisya torii.jpg", 1600, 1067, "Sumiyoshi Taisha torii and approach", "A torii approach image keeps the shrine segment visually distinct from the tram segment."),
  commonsThumbImage("File:Sumiyoshi Grand Shrine in 201705 001.jpg", 1600, 1067, "Main precinct at Sumiyoshi Grand Shrine", "This gives the guide a second shrine angle so the page can show scale without repeating the same gate."),
  commonsThumbImage("File:Sumiyoshi Taisha2.jpg", 1600, 1067, "Architectural detail at Sumiyoshi Taisha", "The building detail matters because the guide promises older Osaka texture rather than only transport novelty."),
  commonsThumbImage("File:Sumiyoshi shrine Honden.jpg", 1600, 1067, "Main hall at Sumiyoshi Taisha", "One hall image makes the shrine stop feel complete before the route returns to the streetcar rhythm."),
  commonsThumbImage("File:Hankai Tramway 251&255.jpg", 1600, 1067, "Hankai tram cars in Osaka", "The streetcar itself is one of the route's core reasons for existing, so it needs clear gallery space."),
  commonsThumbImage("File:Platform of Sumiyoshi-Toriimae Station 4.jpg", 1600, 1067, "Platform at Sumiyoshi-Toriimae tram stop", "A platform image keeps the route practical for people deciding whether to ride one stop or continue on foot."),
  commonsThumbImage("File:Sumiyoshi-toriimae stn.jpg", 1600, 1067, "Street-level view at Sumiyoshi-Toriimae stop", "This is the transition point where shrine atmosphere and tram-line reality actually meet."),
  commonsThumbImage("File:Tenjin-no-mori stn.jpg", 1600, 1067, "Tenjin-no-Mori tram stop in Osaka", "A second stop keeps the route from looking like a shrine page with one token train photo added later."),
  commonsThumbImage("File:Hankai500Series02.jpg", 1600, 1067, "Hankai tram rolling through Osaka", "The last tram image shows movement, which is exactly the point of choosing this slower south-Osaka half day."),
];

const SAGA_IMAGES: GuideMediaImage[] = [
  commonsThumbImage("File:Rakushisha-1.jpg", 1600, 1067, "Rakushisha cottage in Saga-Arashiyama", "Rakushisha is the clearest way to tell the reader this page is about quieter Saga lanes rather than the most crowded bamboo-stop loop."),
  commonsThumbImage("File:Rakushisha01s3200.jpg", 1600, 1067, "Garden approach at Rakushisha", "The route needs a second Rakushisha image because this stop sets the tone for the whole morning."),
  commonsThumbImage("File:Adashino nenbutsuji01s3200.jpg", 1600, 1067, "Stone setting at Adashino Nenbutsu-ji", "Adashino gives the backstreet route its strongest northwestern extension without turning it into a long bus day."),
  commonsThumbImage("File:Adashino nenbutsuji03s3200.jpg", 1600, 1067, "Temple grounds at Adashino Nenbutsu-ji", "This temple view keeps the extension feeling intentional rather than tacked on."),
  commonsThumbImage("File:Toriimoto03s3200.jpg", 1600, 1067, "Traditional lane in Saga-Toriimoto", "Saga-Toriimoto is the exact lane texture this guide exists to preserve."),
  commonsThumbImage("File:Toriimoto07s3200.jpg", 1600, 1067, "Quiet preserved street in Saga-Toriimoto", "A second Toriimoto image matters because the article is really about street rhythm, not a single attraction shot."),
  commonsThumbImage("File:2021 Sagano Bamboo forest in Arashiyama, Kyoto, Japan.jpg", 1600, 1067, "Sagano bamboo grove in Kyoto", "The bamboo grove still belongs in the gallery, but only as one early-morning transition rather than the whole day's purpose."),
  commonsThumbImage("File:Togetsu-kyō bridge at golden hour, Kyoto, Japan.jpg", 1600, 1067, "Togetsukyo bridge in Arashiyama", "One bridge image shows where most visitors start mentally before the guide pushes them toward calmer backstreets."),
  commonsThumbImage("File:Arashiyama Station.JPG", 1600, 1067, "Arashiyama Station in Kyoto", "A station image makes the route easier to execute in the real morning window before crowds build up."),
  commonsThumbImage("File:Katsura River bank with pleasure boat and illuminated building at sunset, Kyoto, Japan.jpg", 1600, 1067, "Katsura River bank at Arashiyama", "The riverbank closes the set by reminding the reader that this is still Arashiyama, just not the loudest version of it."),
];

const NISHIJIN_IMAGES: GuideMediaImage[] = [
  commonsThumbImage("File:Kyoto Nishijin Daikoku-cho 2013-08A.JPG", 1600, 1067, "Low-rise Nishijin street in Kyoto", "This is the street scale the whole guide is built to protect: low, slow, and visibly residential even when a shrine stop enters the frame."),
  commonsThumbImage("File:Kyoto Nishijin Daikoku-cho 2013-08D.JPG", 1600, 1067, "Another Nishijin machiya-side street", "A second lane image makes clear that Nishijin is a texture-first half day rather than one famous gate and then a taxi ride."),
  commonsThumbImage("File:Seimei Jinja, First torii gate 001.jpg", 1600, 1067, "First torii at Seimei Shrine", "Seimei Shrine works best here as a precise anchor inside a broader machiya walk."),
  commonsThumbImage("File:Seimei Jinja, Worship Place and Main Sanctuary 001.jpg", 1600, 1067, "Main sanctuary at Seimei Shrine", "This keeps the shrine stop legible without letting it hijack the whole page."),
  commonsThumbImage("File:Seimei Jinja, Statue of Abe-no Seimei 001.jpg", 1600, 1067, "Abe no Seimei statue at Seimei Shrine", "One symbolic detail helps foreign travelers understand why this shrine feels so different from central-Kyoto defaults."),
  commonsThumbImage("File:Kitano-tenmangu Kyoto Japan41s3s4592.jpg", 1600, 1067, "Kitano Tenmangu grounds in Kyoto", "Kitano Tenmangu gives the route a stronger finish than ending on abstract lane walking alone."),
  commonsThumbImage("File:Main Shrine, Kitano-tenmangu-No1-2020-06.jpg", 1600, 1067, "Main shrine at Kitano Tenmangu", "A second Kitano image gives the northern extension enough weight to feel deliberate."),
  commonsThumbImage("File:Kitano temmangu Sankomon-2.JPG", 1600, 1067, "Sankomon gate at Kitano Tenmangu", "The gate view acts as the visual hinge between shrine architecture and the nearby geiko district."),
  commonsThumbImage("File:KamiShichiken.jpg", 1600, 1067, "Kamishichiken street in Kyoto", "Kamishichiken belongs here because it gives the route a lived-in cultural finish instead of a generic shrine exit."),
  commonsThumbImage("File:Kamisitiken information monument.2016.03.31.jpg", 1600, 1067, "Kamishichiken information monument", "The last image keeps the route grounded in neighborhood detail rather than only large shrine architecture."),
];

export const CUSTOM_MINOR_TRAVEL_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {
  "kyoto-demachiyanagi-kamo-walk": {
    ja: jpContent(
      MINOR_GUIDE_CANON["kyoto-demachiyanagi-kamo-walk"].ja.title,
      MINOR_GUIDE_CANON["kyoto-demachiyanagi-kamo-walk"].ja.desc,
      DEMACHIYANAGI_IMAGES[0],
      DEMACHIYANAGI_IMAGES.slice(1),
      [
        { url: "https://x.com/kamomioyajinja/status/2040908534867884496", label: "下鴨神社公式: 葵や森の季節感が分かる直近の境内投稿" },
        { url: "https://x.com/kamomioyajinja/status/2040907647604803915", label: "下鴨神社公式: 参道まわりの空気感を確認しやすい投稿" },
        { url: "https://x.com/kamomioyajinja/status/2019734997108994082", label: "下鴨神社公式: 糺の森と社頭の雰囲気をつかみやすい投稿" },
      ],
      [
        {
          heading: "この半日は京都の北側らしい速度で読む",
          body:
            "出町柳と鴨川デルタの良さは、名所を連打しなくても半日が成立することです。駅を出てすぐに川の開け方が見え、少し歩くと糺の森の陰に入れ、その先に下鴨神社の静かな重さがあります。さらに体力と時間が残っていれば、京都府立植物園まで延ばしても、まだ観光の密度に潰されません。\n\n" +
            "この順番が大事です。先に有名寺院を詰め込むと、出町柳の半日はただの移動調整に落ちます。逆に、川、森、神社、植物園という順で読むと、京都の北側にある余白そのものが主役になります。旅行者にとって実用的なのは、何を見るかを増やすことより、どこで都市の圧が下がるかを理解することです。",
        },
        {
          heading: "出町柳を起点にすると迷いが少ない",
          body:
            "外国人旅行者がこのルートを使いやすいのは、出町柳駅が入口として分かりやすいからです。京阪と叡山電車の結節点で、駅前の判断も単純です。まず川に出る、デルタの開けた場所で今日の歩く速度を決める、そのあと下鴨神社へ入る。この骨格だけで、紙の計画を細かく増やさなくても半日が崩れません。\n\n" +
            "実務上は、最初の休憩を出町柳で取るか、糺の森を抜けてから取るかだけを決めれば十分です。ここでカフェや甘味を詰め込みすぎると、せっかくの京都北側らしい軽さが消えます。記事タイトルどおり、あくまで出町柳と鴨川の歩きが中心で、飲食は補助にとどめる方が満足度は上がります。",
        },
        {
          heading: "鴨川デルタは観光名所というよりペースメーカー",
          body:
            "鴨川デルタは写真を撮って終わる場所ではなく、その日の歩き方を決める場所です。風が強いか、学生や地元の人の動きがどれくらいか、朝の光がどの程度柔らかいかをここで見れば、その後に神社と植物園をどれくらい静かに使えるかが読めます。つまり、この場所は記念写真のためではなく、半日の温度を合わせるためにあります。\n\n" +
            "だから、無理に長居する必要もありません。川沿いで十分空気を吸ったら、次は糺の森へ入る方がルートとしてはきれいです。京都の徒歩観光では、良い場所で長く止まりすぎるより、良い場所を合図にして次の静けさへ渡る方が全体の質が上がります。",
        },
        {
          heading: "下鴨神社と糺の森が半日の芯になる",
          body:
            "このガイドで最も大事なのは、下鴨神社を“参拝を一件こなす場所”として扱わないことです。糺の森の木陰から楼門へ進み、境内の広がりを見て、また少し速度を落とす。この切り替えがあるから、出町柳の半日はただの川沿い散歩では終わりません。京都の定番寺社に比べて、ここは圧の掛かり方がやわらかく、外国人旅行者でも動線を自分で回復しやすいのが強みです。\n\n" +
            "また、Xの埋め込みを神社公式に寄せたのは、記事本文の静けさと矛盾しないためです。花や森や境内の短い更新を見るだけで、その日その時の雰囲気が分かります。毎回同じ京都全体の観光投稿を貼るより、この場所に近い更新を置く方が、記事とタイトルの整合性がはっきりします。",
        },
        {
          heading: "植物園まで延ばすときは欲張らない",
          body:
            "京都府立植物園を後半に入れる場合、ポイントは“もう一つ大物を追加した”と思わないことです。ここは観光を濃くする装置ではなく、歩きの終わりを整える装置です。温室を一つ、並木か池まわりを一つ、それで十分です。全部を回る発想に変わると、せっかくの出町柳半日が途端に情報過多になります。\n\n" +
            "むしろ、植物園は雨の日の保険としても優秀です。外気が冷たい、花粉がつらい、混雑で疲れた、そういう時に屋根のある区画へ逃げられるだけで、ルート全体の完成度はかなり上がります。京都では“どこへ行くか”より、“どこへ退避できるか”の方が体感満足に効くことが多いです。",
        },
        {
          heading: "外国人旅行者向けの実務メモ",
          body:
            "保存しておくべきものは多くありません。出町柳駅、下鴨神社、植物園の入口候補、そして帰りに使う駅だけで十分です。京都の北側は中心部ほど案内が過密ではないので、むしろ保存を増やしすぎると判断が散ります。必要なのは、途中で出口や時間を少し変えても慌てない通信環境です。\n\n" +
            "その意味で、日本向けeSIMへの導線は薄くても相性が良いです。地図と運行確認がその場でできれば、川沿いを短くするか、植物園まで伸ばすか、叡山電車側へ戻るかを落ち着いて選べます。本文の主役はあくまで街歩きですが、現地での迷いを小さくする準備は、こうした静かな半日にこそ効いてきます。",
        },
      ],
      [
        { q: "このルートは春以外でも使えますか？", a: "使えます。春は分かりやすいですが、出町柳と鴨川デルタの良さは季節の花だけではなく、川と森と神社が近いことです。真夏は植物園の使い方を増やし、冬は川沿い滞在を短くすると安定します。" },
        { q: "植物園は必須ですか？", a: "必須ではありません。時間が短ければ、出町柳、鴨川デルタ、下鴨神社だけで十分に一つの半日として成立します。植物園は延長に向く後半カードです。" },
        { q: "一人旅でも歩きやすいですか？", a: "かなり歩きやすいです。京都北側らしい落ち着きがあり、途中で速度調整しやすいので、一人でも無理なく使えます。" },
        { q: "雨の日はどこを削るのが良いですか？", a: "鴨川デルタの滞在を短くし、糺の森と植物園の屋根付き区画を厚めに使うのが実務的です。川辺に固執しない方が、むしろ記事タイトルどおりの静けさを守れます。" },
        { q: "出町柳で食事を重くしても良いですか？", a: "軽めがおすすめです。この半日は食事回収より歩行の質が主役なので、最初から長居しすぎると川と森の切り替わりが鈍くなります。" },
      ],
    ),
    en: enContent(
      MINOR_GUIDE_CANON["kyoto-demachiyanagi-kamo-walk"].en.title,
      MINOR_GUIDE_CANON["kyoto-demachiyanagi-kamo-walk"].en.desc,
      DEMACHIYANAGI_IMAGES[0],
      DEMACHIYANAGI_IMAGES.slice(1),
      [
        { url: "https://x.com/kamomioyajinja/status/2040908534867884496", label: "Shimogamo Shrine: a recent post that shows the shrine precinct and seasonal atmosphere" },
        { url: "https://x.com/kamomioyajinja/status/2040907647604803915", label: "Shimogamo Shrine: a practical visual reference for the approach and grounds" },
        { url: "https://x.com/kamomioyajinja/status/2019734997108994082", label: "Shimogamo Shrine: another official look at the forest-and-shrine setting that defines this route" },
      ],
      [
        { heading: "Read this half day as north-Kyoto breathing room", body: "The value of Demachiyanagi is not that it hides a single dramatic attraction. The value is that river space, shrine woods, and a clear extension into Kyoto Botanical Garden sit close enough together to create a full half day without pressure. You leave the station, reach the Kamo confluence almost immediately, pass into Tadasu no Mori, and then decide whether the day should stay shrine-centered or continue into greenhouse and garden space.\n\nThat order matters. If you overload the half day with bigger-name Kyoto stops first, Demachiyanagi turns into a filler transfer point. If you let the river, forest, shrine, and garden set the sequence, the area becomes exactly what foreign travelers often want from Kyoto after one or two denser districts: quiet structure, lighter decisions, and enough room to keep walking because the pace still feels recoverable." },
        { heading: "Starting at Demachiyanagi keeps the route simple", body: "This route is practical because Demachiyanagi Station is an unusually readable starting point. The junction of Keihan and Eizan lines gives travelers a clean way in, and the opening move is obvious: go to the river first, let the Kamo Delta reset your pace, and then walk toward Shimogamo Shrine. That is already enough route logic to protect the half day from over-planning.\n\nFor execution, you only need one early decision: whether to take your first break near the station or after the shrine segment. That is why this page stays lighter than many Kyoto guides. Once too many coffee, sweets, and side-destination decisions begin piling up, the whole advantage of the north-Kyoto corridor disappears. The title promises Demachiyanagi and the Kamo walk, and the article is strongest when it stays loyal to that." },
        { heading: "The Kamo Delta is a pace-setter, not just a photo stop", body: "Travelers often remember the stepping-stone side of the Kamo Delta, but the more important role of the area is practical. It tells you what kind of day the route should be: how windy the river feels, whether the riverside is lively or quiet, and whether you should stay outdoors longer or move into the forest sooner. In that sense, the delta is less a checklist landmark than the place where the rest of the half day gets calibrated.\n\nThat is also why you do not need to linger there too long. The route becomes cleaner once the river functions as a signal and not a trap. Breathe, look, read the conditions, then move into Tadasu no Mori. Kyoto walking usually improves when one good space leads you into the next instead of trying to carry all the emotional weight by itself." },
        { heading: "Shimogamo Shrine and Tadasu no Mori are the real core", body: "The center of this guide is not the station and not the garden. It is the transition from river openness into the shade of Tadasu no Mori and then into the broader calm of Shimogamo Shrine. That sequence makes the half day feel substantial without becoming heavy. Compared with many first-trip shrine stops in Kyoto, Shimogamo allows more self-directed movement and less crowd-driven compression, which makes it particularly friendly for foreign travelers who want to recover their own pace.\n\nThe official X references are deliberately shrine-led for the same reason. They keep the live signals close to the route's true center instead of dropping in broad Kyoto posts that could fit any page. When a guide is this title-specific, the social references should stay title-specific too." },
        { heading: "Use the botanical garden as a clean extension, not a second main event", body: "Kyoto Botanical Garden belongs at the end of the route only if you still have energy and curiosity left. It is not there to increase sightseeing density. It is there to give the morning or early afternoon a softer landing. One conservatory segment, one garden axis, maybe one pond or seasonal bed is enough. If you suddenly switch into completion mode, the Demachiyanagi half day loses its shape.\n\nThis extension is especially useful in unstable weather. The garden gives you cover, indoor plant space, and a wider walking envelope without forcing a transport reset. That kind of flexibility is exactly what makes this route practical rather than merely poetic." },
        { heading: "Practical notes for foreign travelers", body: "You do not need to save much for this route: Demachiyanagi Station, Shimogamo Shrine, one garden entrance, and one backup exit are usually enough. North Kyoto is calmer than the central core, so the main risk is not getting lost in a dramatic way. The main risk is accumulating too many small decisions until the half day feels heavier than it should.\n\nThat is why a light Japan eSIM link still makes sense here. If maps, train checks, and a quick change of exit are easy on the spot, you can shorten the riverside, extend into the garden, or reverse the sequence without turning the whole outing into admin. The article stays tourism-first, but the route clearly benefits from low-friction connectivity in practice." },
      ],
      [
        { q: "Does this route still work outside spring?", a: "Yes. Spring is the easiest season to picture, but the real value of the route is the combination of river, woods, shrine, and botanical-garden extension. In hotter months, shorten the river segment and lean more on the garden." },
        { q: "Is the botanical garden essential?", a: "No. Demachiyanagi, the Kamo Delta, and Shimogamo Shrine already make a complete half day. The garden is the cleanest extension when you still have time and energy." },
        { q: "Is it good for solo travelers?", a: "Very much so. The route is easy to read, easy to shorten, and calm enough that a solo traveler can keep their own rhythm without feeling rushed by crowd flow." },
        { q: "How should I adjust it for rain?", a: "Shorten the exposed river time and give more weight to Tadasu no Mori and the covered parts of the botanical garden. Protecting the route's calm matters more than stubbornly preserving every outdoor segment." },
        { q: "Should I build a full meal around the area too?", a: "Usually not. A light break works better. The half day is strongest when walking quality stays central and food decisions remain secondary." },
      ],
    ),
  },
  "kyoto-fushimi-sake-district-walk": {
    ja: jpContent(
      MINOR_GUIDE_CANON["kyoto-fushimi-sake-district-walk"].ja.title,
      MINOR_GUIDE_CANON["kyoto-fushimi-sake-district-walk"].ja.desc,
      FUSHIMI_IMAGES[0],
      FUSHIMI_IMAGES.slice(1),
      [
        { url: "https://x.com/gekkeikansake/status/2041659627994325497", label: "月桂冠公式: 伏見の酒蔵文化と季節感をつかみやすい直近の投稿" },
        { url: "https://x.com/gekkeikansake/status/2016064206509369794", label: "月桂冠公式: 酒蔵由来の商品とブランドの現地感が分かる投稿" },
        { url: "https://x.com/gekkeikansake/status/2013144452647604688", label: "月桂冠公式: 伏見らしい酒文化の文脈を補強する公式投稿" },
      ],
      [
        { heading: "伏見は寺ではなく酒蔵の街として読む", body: "このルートの価値は、京都を寺社の街としてではなく、酒蔵と運河と物流の街として読み直せることにあります。月桂冠大倉記念館のような分かりやすい入口があり、その周囲に酒蔵の建物、水路の景色、寺田屋のような歴史の点が残っているため、半日が一本のテーマでまとまります。定番観光地を少し外したい外国人旅行者にとって、伏見は“京都らしさを失わずに密度を下げられる”数少ない選択肢です。\n\n重要なのは、ここを単なる酒飲みエリアにしないことです。実際に歩くと魅力の中心は飲酒より建築と街路の読みやすさにあります。樽や看板や白壁の連なりがあるだけで、歩きの意味がはっきりする。だからこそ、飲食店の数を増やしすぎず、まず街区そのものを読んだ方が記事タイトルとの整合も良くなります。" },
        { heading: "月桂冠大倉記念館を軸にすると記事タイトルがぶれない", body: "伏見酒蔵地区という言い方をする以上、最初の軸は月桂冠大倉記念館で問題ありません。ここから入れば、酒蔵資料、樽、建物、水路、周辺の歩行導線が一つながりになります。外国人旅行者にとってもテーマが理解しやすく、京都中心部の“何となく寺へ行く”半日とは違うことがすぐに伝わります。\n\nまた、公式X埋め込みも月桂冠に寄せることで、記事本文とソーシャル参照が一致します。酒蔵地区を扱う記事なのに、無関係な京都一般の投稿を並べると、一気に信頼感が落ちます。ここではブランドや季節の短い発信が、伏見の酒文化の今を補う役目を果たします。" },
        { heading: "運河沿いの時間がこの半日の空気を決める", body: "伏見の半日で一番効くのは、水路沿いをどう歩くかです。建物だけを見ると点の観光になりますが、運河が入ると地区全体が線でつながります。酒蔵建築を見て、水面の低さや流れの遅さを感じ、また歴史建物へ戻る。この繰り返しがあるから、伏見は“飲食店の集まり”ではなく、一つの歩行テーマとして成立します。\n\n写真セットに水路を多めに入れたのもそのためです。外国人旅行者は到着前に地名だけ見ても地区の質感がつかみにくいですが、水路と白壁の組み合わせを見ると、歩くべき距離感や街の低さを一気に想像できます。SEOの観点でも、伏見酒蔵地区をただの酒試飲記事にしない方が、検索意図の幅に応えやすいです。" },
        { heading: "寺田屋と中書島は補助線として使う", body: "寺田屋は有名ですが、ここを主役にしすぎると記事が幕末史に引っぱられます。中書島駅も実用上は重要ですが、駅案内ばかりに寄ると街歩きの文章として乾きます。どちらも必要なのは確かですが、酒蔵地区のテーマを支える補助線として置くのがちょうど良いです。タイトルに忠実であるためには、歴史も交通も“酒蔵街を読みやすくする要素”として扱う方が整理しやすいのです。\n\nこのバランスがあると、外国人旅行者にも分かりやすくなります。何を最初に見るべきか、どこで方向転換すべきか、どこで終えて良いのかが曖昧になりにくいからです。" },
        { heading: "飲む予定がなくても十分価値がある", body: "このガイドは試飲前提ではありません。アルコールを控えている人でも、十分に使えます。むしろ、建築と水路と駅導線に注目した方が、伏見という場所の特徴はきれいに見えます。酒蔵地区を歩く価値は“酒を買うこと”ではなく、“酒を生んだ都市構造を見られること”にあります。\n\n結果として、一人旅、朝寄りの半日、別の京都観光の合間にも組み込みやすいです。寺社をもう一件増やす代わりに、こうした産業的な京都を入れる方が、旅全体の印象は立体的になります。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、中書島駅、月桂冠大倉記念館、寺田屋、そして帰りに戻る駅だけです。伏見は見た目より分かりやすいので、保存量を増やすより、その場で少しだけ地図確認できる状態の方が向いています。曲がる回数より、歩く温度を保てるかの方が重要です。\n\nその意味で、日本向けeSIMはこの地区とも相性が良いです。川沿いを長めに取るか、酒蔵建築を多めに見るか、試飲可能な時間帯まで待つか。そうした小さな判断をその場で行えると、伏見の半日は急に実用的になります。本文の中心はあくまで街歩きですが、運用面の軽さが体験の質を支えるのは確かです。" },
      ],
      [
        { q: "お酒を飲まなくても楽しめますか？", a: "十分楽しめます。酒蔵地区の価値は建物、水路、駅導線、街の低さにあるので、飲酒しなくても半日は成立します。" },
        { q: "どこから歩き始めるのが一番分かりやすいですか？", a: "中書島駅か月桂冠大倉記念館を起点にすると分かりやすいです。両方の位置関係が見えると、街区の読み方が一気に簡単になります。" },
        { q: "寺田屋は必須ですか？", a: "必須ではありません。ただ、歴史の補助線として一度見ると地区の印象が締まります。" },
        { q: "雨の日でも向いていますか？", a: "軽い雨なら向いています。水路と白壁の相性が良く、屋内に逃げやすい酒蔵関連施設もあるからです。" },
        { q: "京都中心部の定番観光と同日に組めますか？", a: "組めますが、詰め込みすぎない方が良いです。伏見は移動で疲れた後に“もう一件”足すより、半日を独立して与えた方がきれいに効きます。" },
      ],
    ),
    en: enContent(
      MINOR_GUIDE_CANON["kyoto-fushimi-sake-district-walk"].en.title,
      MINOR_GUIDE_CANON["kyoto-fushimi-sake-district-walk"].en.desc,
      FUSHIMI_IMAGES[0],
      FUSHIMI_IMAGES.slice(1),
      [
        { url: "https://x.com/gekkeikansake/status/2041659627994325497", label: "Gekkeikan: a current official post that keeps the guide tied to Fushimi's sake identity" },
        { url: "https://x.com/gekkeikansake/status/2016064206509369794", label: "Gekkeikan: another official product-and-brand post that still fits the brewery-district theme" },
        { url: "https://x.com/gekkeikansake/status/2013144452647604688", label: "Gekkeikan: an official reference that reinforces the sake-culture context behind the route" },
      ],
      [
        { heading: "Read Fushimi as a brewery district, not as temple overflow", body: "The strongest reason to walk Fushimi is that it lets you read Kyoto through industry, waterways, and sake-brewery architecture instead of through the same temple sequence most first-trip itineraries repeat. Gekkeikan Okura Sake Museum gives you a clear front door, and from there the district makes sense in layers: canal edges, white-walled structures, Teradaya as a historical anchor, and Chushojima as the practical transport hinge.\n\nThat makes Fushimi one of the best lower-pressure Kyoto half days for foreign travelers who still want a place with a sharp identity. It does not feel generic, but it also does not force you into crowd-heavy, all-day sightseeing posture. The route is niche in the right way: specific, coherent, and still usable." },
        { heading: "Using Gekkeikan as the first anchor keeps the article honest", body: "If the title promises the Fushimi sake district, the route needs a real sake-district opening. Starting at Gekkeikan solves that immediately. You get a museum-grade entry point, visible barrel culture, recognizable brewery architecture, and an obvious reason to keep walking through the surrounding streets instead of treating the district as a single indoor stop.\n\nThe official X references stay centered on Gekkeikan for the same reason. A Fushimi guide should not lean on broad Kyoto tourism posts that could be pasted into any neighborhood page. The social references should reinforce the identity the article actually claims." },
        { heading: "The canal is what turns the district into a route", body: "Without the canal, Fushimi can read like a collection of separate buildings. Once you give the waterways their proper role, the area becomes a walk. The canal joins the brewery facades, quiet side streets, and historical points into one usable line. For travelers, that matters more than any single attraction because it tells you how the district should be felt: slow, low-rise, and tied to movement of goods as much as people.\n\nThis is also why the gallery leans hard on canal and street-level images. Search intent around Fushimi often mixes sake, architecture, and historical atmosphere. Showing all three inside one coherent walking shape makes the page stronger both editorially and from an SEO perspective." },
        { heading: "Use Teradaya and Chushojima as support lines, not as the main story", body: "Teradaya is famous enough to distort the route if you let it. Chushojima is practical enough to flatten the route if you over-explain it. Both belong here, but neither should overtake the sake-district logic. Teradaya works best as one historical anchor that adds depth. Chushojima works best as the station that makes the district easy to enter and exit without friction.\n\nThat balance matters for foreign travelers. When a district guide starts behaving like a full history essay or a full transport tutorial, the actual walk gets lost. Fushimi is strongest when the buildings, the water, and the station all support the same quiet half-day structure." },
        { heading: "You do not need to be planning a tasting-heavy day", body: "This guide is not written only for people who intend to drink. Even if you do not plan to taste much, the district still works because the real value is spatial: brewery architecture, water routes, modest street width, and a clear urban identity different from central Kyoto's more familiar sightseeing script.\n\nThat makes Fushimi especially good for solo travelers, for mornings or early afternoons with some energy but not a full-day ambition, and for travelers who want one Kyoto district that feels historical without being temple-dominated." },
        { heading: "Practical notes for foreign travelers", body: "Save Chushojima Station, Gekkeikan Okura Sake Museum, Teradaya, and one return station. That is usually enough. Fushimi is more readable than it looks, so the bigger problem is not hard navigation. The bigger problem is letting too many small decisions weigh down what should stay simple.\n\nA light Japan eSIM link still makes sense here because the on-the-ground decisions are small but meaningful: walk more of the canal, shorten the historical segment, wait for a museum window, or exit early. When those checks stay easy, Fushimi becomes much more usable in practice." },
      ],
      [
        { q: "Is this worth doing if I am not planning to drink sake?", a: "Yes. The district works because of architecture, waterways, and urban texture as much as because of tasting. Non-drinkers can still get a strong half day out of it." },
        { q: "What is the easiest place to start?", a: "Chushojima Station or Gekkeikan Okura Sake Museum. Once you understand the relationship between those two, the whole district becomes much easier to read." },
        { q: "Is Teradaya essential?", a: "No, but it helps as a historical support point. The route still works without turning it into the dominant stop." },
        { q: "Does it work in light rain?", a: "Yes. The canal and white-wall streets actually read well in light rain, and the district gives you several easier indoor fallback points." },
        { q: "Should I combine it with a crowded central-Kyoto day?", a: "Only if you keep expectations modest. Fushimi is better when it gets its own half day rather than being treated as one more box after a heavy temple schedule." },
      ],
    ),
  },
  "osaka-sumiyoshi-retro-tram-route": {
    ja: jpContent(
      MINOR_GUIDE_CANON["osaka-sumiyoshi-retro-tram-route"].ja.title,
      MINOR_GUIDE_CANON["osaka-sumiyoshi-retro-tram-route"].ja.desc,
      SUMIYOSHI_IMAGES[0],
      SUMIYOSHI_IMAGES.slice(1),
      [
        { url: "https://x.com/hankai_official/status/2041442221074104772", label: "阪堺電車公式: 車両整備の直近投稿で路線の現在感が分かる" },
        { url: "https://x.com/hankai_official/status/2041073992950485216", label: "阪堺電車公式: 古参車両の文脈を補強する公式投稿" },
        { url: "https://x.com/nankaibus_info/status/2041312507185500530", label: "南海バス公式: 住吉側にもつながる沿線の季節感が分かる投稿" },
      ],
      [
        { heading: "この半日は大阪を神社と路面電車の速度で読む", body: "住吉大社と阪堺電車を組み合わせた半日は、大阪の南側を“急がない都市”として体験できるのが魅力です。梅田やなんばのような中心部では、観光の速度も判断の密度も高くなりがちですが、住吉では大鳥居、境内、停留場、古い車両の気配が近い距離でつながります。外国人旅行者にとっては、ただ静かというだけでなく、動き方そのものが読みやすいのが強みです。\n\nこのページで大事なのは、神社見学とトラム乗車を別々に考えないことです。住吉大社を見て終わり、阪堺電車に乗って終わり、ではなく、両方の速度が似ているから一つの半日になる。そこがこのルートの一番実用的な価値です。" },
        { heading: "住吉大社は“巨大な名所”ではなく、速度を整える場所", body: "住吉大社は有名ですが、このガイドでは“ここで全部を回収する”対象ではありません。むしろ、橋を渡り、鳥居をくぐり、社殿の前で一度歩行のテンポを整えるための場所です。大阪観光で疲れやすい人ほど、この種の静かな導入が効きます。写真セットでも神社だけでなく停留場やトラムの画像を並べたのは、境内だけを主役にしないためです。\n\nSEO面でも、住吉大社単体記事より“住吉レトロ路面電車ルート”として打ち出した方が、何をすべき半日なのかが伝わりやすくなります。検索する人も、神社情報だけでなく、どう歩き、どう乗ればよいかを探しているからです。" },
        { heading: "阪堺電車は移動手段というより路線そのものが体験", body: "阪堺電車は、目的地に着くためだけの移動ではなく、それ自体がテーマです。停留場の距離感、車体の古さ、街との近さが、歩く半日と自然につながります。だからこのルートでは、何駅乗るかを事前に固めすぎない方がうまくいきます。一駅だけ乗ってまた歩く、停留場を見てやめる、次の車両を待つ。そうした小さな選択がそのまま観光体験になります。\n\n公式X埋め込みを阪堺電車に寄せたのも、路線自体を記事の中心に置くためです。一般的な大阪観光投稿では、この路線の具体的な空気は伝わりません。車両や沿線の季節を扱う投稿の方が、このページにははるかに合います。" },
        { heading: "住吉鳥居前と天神ノ森の間で街の密度が変わる", body: "このルートで面白いのは、停留場ごとに街の密度と見え方が変わることです。住吉鳥居前は神社の余韻が強く、天神ノ森側へ行くとより生活圏寄りの速度になります。つまり、どこで降りるかは単なる交通判断ではなく、“今日はどこまで古い大阪の温度を残したいか”という観光判断になります。\n\n外国人旅行者はつい主要停留場だけを目印にしがちですが、この路線は途中を含めて体験です。短くてもよいので、歩きと乗車が交互に入る構成にした方が、記事タイトルどおりのレトロ感が残ります。" },
        { heading: "この半日は食べ歩きよりも街のテンポ優先で良い", body: "南大阪には食の魅力もありますが、このルートでは食べ歩きを主役にしない方がまとまります。休憩は一回で十分です。住吉大社周辺か、停留場の切り替えで一度だけ軽く座る。それ以上増やすと、路面電車と神社のゆっくりした速度が、単なる店巡りに上書きされます。\n\nこのテーマは、観光情報を増やすことではなく、都市のテンポを下げることです。大阪でその価値は意外と大きく、翌日に中心部を歩く予定がある人ほど効いてきます。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、住吉大社、住吉鳥居前停留場、天神ノ森停留場、そして帰りに戻る大きめの駅だけです。乗換や運行確認をその場で少し見られれば十分で、詳細な時刻表を握りしめるほどのルートではありません。\n\nこのタイプの半日は日本向けeSIMとの相性が良いです。車両を待つか、次で降りるか、歩いて戻るか、沿線をもう少し伸ばすか。そうした小さな判断を軽くできると、路面電車の半日は急に快適になります。本文の中心はあくまで観光ですが、通信の軽さがこの体験を支えているのは確かです。" },
      ],
      [
        { q: "住吉大社だけ見て終えても良いですか？", a: "良いですが、このページの価値は阪堺電車と組み合わせた時に最大化します。少なくとも一駅か二駅は路線の速度を体験する方がタイトルに合います。" },
        { q: "阪堺電車は長く乗るべきですか？", a: "長く乗る必要はありません。短く乗って歩くを挟む方が、このガイドのレトロ感と実用性が両立します。" },
        { q: "大阪初心者でも使えますか？", a: "使えます。むしろ中心部に疲れやすい人ほど向いています。神社と停留場の導線が分かりやすいからです。" },
        { q: "雨の日でも成立しますか？", a: "小雨なら成立します。ただし停留場で待つ時間が長いと疲れやすいので、歩き区間を短くして乗車寄りに調整すると安定します。" },
        { q: "食事はどこで入れるのが良いですか？", a: "一回だけ軽く入れるのが良いです。休憩を増やしすぎるより、神社とトラムの速度を残す方が満足しやすい半日です。" },
      ],
    ),
    en: enContent(
      MINOR_GUIDE_CANON["osaka-sumiyoshi-retro-tram-route"].en.title,
      MINOR_GUIDE_CANON["osaka-sumiyoshi-retro-tram-route"].en.desc,
      SUMIYOSHI_IMAGES[0],
      SUMIYOSHI_IMAGES.slice(1),
      [
        { url: "https://x.com/hankai_official/status/2041442221074104772", label: "Hankai Tramway: a recent official maintenance-side post that keeps the route tied to the real operator" },
        { url: "https://x.com/hankai_official/status/2041073992950485216", label: "Hankai Tramway: an official post that reinforces the retro rolling-stock context behind the line" },
        { url: "https://x.com/nankaibus_info/status/2041312507185500530", label: "Nankai Bus: an official route-adjacent seasonal post that still fits the Sumiyoshi corridor" },
      ],
      [
        { heading: "This half day reads Osaka at shrine-and-streetcar speed", body: "The appeal of a Sumiyoshi half day is that it lets Osaka slow down without becoming empty. Sumiyoshi Taisha, the tram stops, and the low-rise streets around the Hankai line sit close enough together that the day can feel coherent almost immediately. For foreign travelers, that is a practical advantage, not just an atmospheric one. The route is easier to recover if energy drops, and easier to adjust if the weather or crowd levels shift.\n\nThe main mistake is treating the shrine and the tram as separate activities. This page works because both move at nearly the same tempo. You walk into shrine space, you come back out to a stop, you ride briefly, and the city stays small enough to keep the half day readable." },
        { heading: "Use Sumiyoshi Taisha to reset pace, not to accumulate checklist points", body: "Sumiyoshi Taisha is famous enough to tempt over-coverage, but that misses the point of this route. The shrine is strongest here as a pace reset: cross the bridge, pass the torii, slow down in the precinct, and let the tempo of the day change before the tram segment begins. Travelers who are already tired of high-density Osaka sightseeing often benefit from exactly this kind of reset.\n\nThat is why the photo set gives space both to the shrine and to the line. A Sumiyoshi guide that turns into shrine-only coverage would fail the title. The route is about old south-Osaka rhythm, not only about one famous precinct." },
        { heading: "The Hankai line is not just transport; it is the route itself", body: "The Hankai tram line works best when you stop treating it as a background transfer. The line is the experience: the older vehicles, the exposed platforms, the modest station spacing, and the fact that walking and riding can alternate without friction. That is why over-planning the exact number of stops usually weakens the day. One stop, then walk. Wait for another car, then decide again. That rhythm is the point.\n\nThe official X references stay operator-led for the same reason. Generic Osaka tourism posts cannot carry the specific route logic this page needs. Streetcar-led references fit much better because they keep the article tied to the actual line that shapes the half day." },
        { heading: "The route becomes more interesting once stop density starts to matter", body: "What makes this route memorable is that the urban feel changes at short intervals. Sumiyoshi-Toriimae still carries shrine atmosphere. Tenjin-no-Mori feels more residential and transit-led. That means where you choose to get off is not just a transport decision. It is a decision about how much of old south Osaka you want to keep in the half day.\n\nForeign travelers often focus only on the best-known stop names, but this line rewards shorter, more flexible choices. Even one additional stop on foot between rides can make the route feel far more deliberate." },
        { heading: "Keep food secondary to the route's slower rhythm", body: "There is no need to turn this into a food crawl. One light seated break is enough. Once too many food decisions enter the route, the shrine-and-tram structure starts dissolving into a standard neighborhood roam. The actual strength of the page is that it lowers the urban tempo, something Osaka does not always offer easily around its more obvious sightseeing zones.\n\nThat slower rhythm can also make the rest of the trip better. Travelers often use this kind of half day to rebalance after a busier downtown evening or before a denser following day." },
        { heading: "Practical notes for foreign travelers", body: "Save Sumiyoshi Taisha, Sumiyoshi-Toriimae, Tenjin-no-Mori, and one larger return station. That is usually enough. You do not need heavy planning or a full timetable in hand. What helps is being able to make small route decisions on the spot without friction.\n\nThat is why a light Japan eSIM path still belongs here. Whether you wait for the next tram, shorten the line segment, or walk farther along the corridor is exactly the sort of minor decision that gets easier with reliable mobile data. The article remains tourism-first, but the route clearly benefits from low-friction connectivity." },
      ],
      [
        { q: "Can I just visit Sumiyoshi Taisha and skip the tram?", a: "You can, but the page is strongest when you add at least a short Hankai segment. Otherwise it stops behaving like the retro tram route the title promises." },
        { q: "Do I need to ride the tram for a long stretch?", a: "No. Short rides with walking in between usually create a better half day than trying to maximize rail distance." },
        { q: "Is this realistic for first-time Osaka visitors?", a: "Yes, especially for travelers who want one calmer half day away from the densest downtown core." },
        { q: "Does it work in light rain?", a: "Yes, but shorten exposed waiting time. In rougher weather, lean a little more toward riding and a little less toward platform lingering." },
        { q: "Should I build a bigger meal plan into it?", a: "Usually not. One light break is enough. The route works best when the shrine-and-streetcar rhythm remains the main story." },
      ],
    ),
  },
  "kyoto-saga-arashiyama-morning-backstreets": {
    ja: jpContent(
      MINOR_GUIDE_CANON["kyoto-saga-arashiyama-morning-backstreets"].ja.title,
      MINOR_GUIDE_CANON["kyoto-saga-arashiyama-morning-backstreets"].ja.desc,
      SAGA_IMAGES[0],
      SAGA_IMAGES.slice(1),
      [
        { url: "https://x.com/sagano_kanko/status/2039126851885603069", label: "嵯峨野観光鉄道公式: 嵐山北西側の朝の文脈に近い公式投稿" },
        { url: "https://x.com/sagano_kanko/status/2035486296379494693", label: "嵯峨野観光鉄道公式: 嵯峨エリアの観光動線を補う公式投稿" },
        { url: "https://x.com/sagano_kanko/status/2028459513532268614", label: "嵯峨野観光鉄道公式: 早い時間帯に嵯峨を使う感覚と相性のよい公式投稿" },
      ],
      [
        { heading: "このページは“混雑前の嵐山”を作るためのもの", body: "嵐山は有名ですが、このガイドの焦点は有名な時間帯ではありません。混雑が本格化する前に、嵯峨側の裏通り、落柿舎、化野念仏寺、鳥居本あたりまで静かに歩くための半日です。つまり、タイトルの“朝の裏通り”が主語であって、渡月橋や竹林はあくまで入口の補助です。\n\nこの順番を守るだけで、同じ嵐山でも体験の質が大きく変わります。人が集まり切る前に主要導線を抜け、静かな側へ先に入る。そうすると、外国人旅行者でも“嵐山は人が多すぎる”という先入観だけで終わらず、北西側の低い街区の良さまで届きます。" },
        { heading: "落柿舎を最初の芯にすると記事がぶれない", body: "バックストリートを本気で書くなら、落柿舎をしっかり置くのが一番分かりやすいです。小さな庵の静けさ、庭の縮尺、そこへ向かう途中の道幅。どれも、このガイドが扱いたい嵯峨の質感と一致しています。ここを通るだけで、タイトルどおり“朝の裏通り”に入ったことが読者にも伝わります。\n\n逆に、主要景観だけでページを組むと、ただの嵐山ガイドに戻ってしまいます。落柿舎のような小さな強い核があるからこそ、バックストリートという言葉が記事の中身と一致します。" },
        { heading: "化野念仏寺と鳥居本は延長ではなく完成パーツ", body: "化野念仏寺や嵯峨鳥居本は、余った時間で足すオプションではありません。このルートでは、むしろここまで行って初めて“北西側へ抜けた”感じが出ます。もちろん時間が足りなければ短くして良いのですが、記事としてはこの側まで含めた方が、嵐山の静かな面をはっきり描けます。\n\n写真セットでも鳥居本や化野念仏寺の比重を高めたのはそのためです。定番の竹林や橋だけでは、他の嵐山記事との差が出ません。ここでは、古い家並みと寺の石灯籠や石仏が、ページの独自性を支えています。" },
        { heading: "竹林や渡月橋は入口としてだけ使う方が強い", body: "竹林や渡月橋を完全に外す必要はありません。ただし、それらを主役にすると朝の裏通りというテーマが崩れます。実務的には、最初の通過点として扱うか、帰り際に一度だけ見て戻るくらいがちょうど良いです。人が増え始めたら、すぐに小さな道へ戻る。これがこのページの読み方です。\n\nSEOの観点でも、定番ワードを記事内に持ちながら、主題は別に置く方が強いです。検索する人の入口は嵐山でも、実際に欲しいのはもっと静かな使い方であることが多いからです。" },
        { heading: "朝に寄せるほど一人旅でも使いやすい", body: "このルートは一人旅との相性がかなり良いです。早い時間帯なら、写真を撮る、立ち止まる、引き返すといった小さな自由度が残ります。混雑後の嵐山ではそれが難しくなり、行列や導線に自分の歩行が吸われがちです。朝に寄せること自体が、観光の質を上げる工夫になります。\n\nまた、落柿舎や化野念仏寺のような小さな核は、同行者の好みを合わせなくても成立しやすいです。派手さより納得感を重視する旅行者に向いています。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、嵐山駅か嵯峨嵐山駅、落柿舎、化野念仏寺、そして戻りの駅だけです。嵐山は有名エリアなので情報が多すぎますが、この半日はむしろ情報を減らした方がうまくいきます。静かな側へ先に入り、必要な時だけ地図と時刻を確認する。それで十分です。\n\nだから日本向けeSIMへの軽い導線は意味があります。竹林が混んできたらどう逃げるか、鳥居本まで伸ばすか、駅へ戻るか。そうした小さな判断がその場でできると、嵯峨嵐山の朝はかなり扱いやすくなります。本文の中心は街歩きですが、運用の軽さが静けさを守ります。" },
      ],
      [
        { q: "竹林は完全に外した方が良いですか？", a: "完全に外す必要はありません。ただし主役にしない方が、このガイドのテーマには合います。朝の短い通過点として使うくらいがちょうど良いです。" },
        { q: "落柿舎と化野念仏寺の両方を入れるべきですか？", a: "時間があれば両方がおすすめです。どちらか一つなら、まず落柿舎でルートの芯を作り、その後の体力で判断するとまとまりやすいです。" },
        { q: "嵐山初心者でも使えますか？", a: "使えます。むしろ有名景観だけで終わりたくない初回旅行者に向いています。朝の時間帯に寄せることが最大のコツです。" },
        { q: "雨の日は向いていますか？", a: "小雨なら成立します。竹林や橋の滞在を短くし、落柿舎や寺の滞在を中心にした方が安定します。" },
        { q: "食事やカフェはどこで入れると良いですか？", a: "一回だけで十分です。入れすぎるとバックストリートの流れが切れるので、駅へ戻る前後の一回に絞る方がきれいです。" },
      ],
    ),
    en: enContent(
      MINOR_GUIDE_CANON["kyoto-saga-arashiyama-morning-backstreets"].en.title,
      MINOR_GUIDE_CANON["kyoto-saga-arashiyama-morning-backstreets"].en.desc,
      SAGA_IMAGES[0],
      SAGA_IMAGES.slice(1),
      [
        { url: "https://x.com/sagano_kanko/status/2039126851885603069", label: "Sagano Scenic Railway: an official post that fits the early Saga-Arashiyama context of the route" },
        { url: "https://x.com/sagano_kanko/status/2035486296379494693", label: "Sagano Scenic Railway: another official route-adjacent reference for the Saga side of Arashiyama" },
        { url: "https://x.com/sagano_kanko/status/2028459513532268614", label: "Sagano Scenic Railway: a third official reference that keeps the page tied to the Saga corridor" },
      ],
      [
        { heading: "This page is about making Arashiyama usable before it hardens into crowds", body: "Arashiyama is famous, but this guide is not written for the famous hour. It is written for the quieter morning window when you can move through Saga-side backstreets, Rakushisha, Adashino Nenbutsu-ji, and the Toriimoto lanes before the district fully tightens. In other words, the title matters literally: morning first, backstreets first, and only then the better-known Arashiyama images at the edge.\n\nThat sequencing changes the district completely. You use the famous area as an entry corridor, then move quickly into the quieter northwestern side while the day is still recoverable. For foreign travelers who assume Arashiyama is only worth it if they tolerate major crowds, that is a meaningful shift." },
        { heading: "Rakushisha is the first anchor that keeps the page on theme", body: "If the guide promises backstreets, Rakushisha needs to matter. The cottage, the garden scale, and the approach lanes all belong to the exact Saga texture this article wants to preserve. Once Rakushisha becomes the first real anchor, the page stops behaving like a diluted general Arashiyama guide and starts behaving like a route with a point of view.\n\nThat also helps title consistency. Without a small but strong anchor like Rakushisha, the whole page would drift back toward bamboo-grove and bridge repetition. The route needs a quieter core, and Rakushisha provides it." },
        { heading: "Adashino Nenbutsu-ji and Toriimoto are completion pieces, not afterthoughts", body: "Adashino Nenbutsu-ji and Saga-Toriimoto should not be treated as optional leftovers when time happens to remain. For this route, they are what makes the backstreet promise feel complete. They carry the sense of having genuinely moved into a quieter northern extension rather than simply avoiding a crowd for twenty minutes.\n\nThat is why the gallery gives them real space. A page like this needs more than one famous gateway image. It needs preserved lanes, stone settings, and evidence of where the district becomes older and calmer again." },
        { heading: "The bamboo grove and Togetsukyo are still relevant, but only at the edges", body: "There is no need to pretend the bamboo grove or Togetsukyo do not exist. The mistake is letting them take over. In practical terms, they work best as threshold spaces: pass through early, or touch them again lightly on the way out. Once crowd growth starts to dominate, the route should move back toward smaller roads rather than trying to compete with the loudest version of Arashiyama.\n\nFrom an SEO perspective, that is also the stronger move. Search intent often starts with Arashiyama itself, but the traveler may really want a calmer way to use the district. This article can satisfy both only if it keeps the quieter use case in the center." },
        { heading: "Morning timing makes the route especially good for solo travelers", body: "Solo travelers often get the most out of this route because the early window still leaves room for small changes: stop for photos, turn back, linger briefly, or cut the northwestern extension without the whole area fighting back. Once Arashiyama is crowded, those freedoms shrink fast. So in this guide, time of day is not a detail. It is a design decision.\n\nThe smaller anchors also help. Rakushisha and Adashino Nenbutsu-ji are easier to absorb alone than a louder, queue-led itinerary built around the same district's busiest symbols." },
        { heading: "Practical notes for foreign travelers", body: "Save Arashiyama Station or Saga-Arashiyama Station, Rakushisha, Adashino Nenbutsu-ji, and one return point. That is enough. Arashiyama offers too much information, and this route usually improves when you save less and execute faster. Get into the quieter side first, then use maps only when a real decision appears.\n\nA light Japan eSIM link still belongs here because the key decisions happen in real time: should you leave the bamboo area earlier, extend into Toriimoto, or head back to the station before the district hardens? That kind of low-friction adjustment is exactly what keeps the morning calm intact." },
      ],
      [
        { q: "Should I skip the bamboo grove entirely?", a: "Not necessarily. It can still work as an early threshold stop. The point is to avoid letting it dominate the whole route." },
        { q: "Should I include both Rakushisha and Adashino Nenbutsu-ji?", a: "If time allows, yes. Rakushisha gives the route its core identity, and Adashino helps the northwestern extension feel complete." },
        { q: "Is this realistic for first-time Kyoto visitors?", a: "Yes, especially for travelers who want Arashiyama without giving the entire half day to the most crowded version of it." },
        { q: "Does it work in light rain?", a: "Yes. Shorten the open bridge and bamboo time, and rely more on the quieter temple and lane segments." },
        { q: "How much food planning should I add?", a: "Very little. One break is usually enough. Too many cafe or meal decisions interrupt the backstreet logic that makes the page work." },
      ],
    ),
  },
  "kyoto-nishijin-machiya-lanes": {
    ja: jpContent(
      MINOR_GUIDE_CANON["kyoto-nishijin-machiya-lanes"].ja.title,
      MINOR_GUIDE_CANON["kyoto-nishijin-machiya-lanes"].ja.desc,
      NISHIJIN_IMAGES[0],
      NISHIJIN_IMAGES.slice(1),
      [
        { url: "https://x.com/kitano_bunka/status/2014600697397002704", label: "北野文化研究所系アカウント: 北野天満宮周辺の文化文脈を補う投稿" },
        { url: "https://x.com/kitano_bunka/status/1900386003137146940", label: "北野文化研究所系アカウント: 上七軒・北野エリアの静かな空気と相性のよい投稿" },
        { url: "https://x.com/kitano_bunka/status/1890571318065846486", label: "北野文化研究所系アカウント: 北野側の街文化を支える公式投稿" },
      ],
      [
        { heading: "西陣は“何を見るか”より“どんな縮尺で歩くか”が大事", body: "西陣の半日は、名所の強さより街の縮尺で決まります。低い家並み、細い通り、町家の面、突然現れる小さな神社や寺。これらが連続しているから、西陣は外国人旅行者にとっても“静かな京都”として成立します。逆に、どこか一件だけを強い目的地にしてしまうと、西陣という街区の価値が消えやすいです。\n\nこのガイドでは、晴明神社、北野天満宮、上七軒を入れていますが、主役はあくまでその間をつなぐ町家路地です。タイトルの中心語は西陣町家であり、社寺や花街はその質感を支えるアンカーとして機能します。" },
        { heading: "晴明神社を前半の芯にすると導線がきれい", body: "晴明神社は、西陣を歩き始めるときの芯として優秀です。神社としての個性が強い一方で、規模が暴れすぎず、周辺の町家街区と喧嘩しません。ここを前半の核に置くと、歩きの温度を上げすぎずにルートの輪郭を作れます。陰陽師の象徴性が強い場所ですが、ガイドとしては“話題性のある入口”くらいに置く方がちょうど良いです。\n\n実際、外国人旅行者にとっては、ここで京都の中心観光と違う空気に切り替えられることの方が重要です。人の流れが少し落ち、町の表面が近く見える。その変化が西陣らしさです。" },
        { heading: "北野天満宮は後半の重心として効く", body: "北野天満宮は単独でも強い場所ですが、このページでは後半の重心です。町家路地を歩いた後に北野天満宮へ入ると、半日の終わりに少しだけ格が上がります。最初からここを主役にすると、西陣歩きが神社観光へ吸い込まれてしまいます。だから順番が重要です。\n\nまた、公式X埋め込みも北野側の文化アカウントに寄せることで、記事の後半テーマと合うようにしました。毎回同じ京都総合アカウントに頼るより、北野・上七軒寄りの文化文脈を置く方が、このページには自然です。" },
        { heading: "上七軒は“見学対象”より歩き終わりの温度調整", body: "上七軒は有名ですが、ここで何か特別なイベントを期待しすぎない方が良いです。むしろ、北野天満宮の後に街の温度を少し下げて終わる場所として優秀です。花街の名前だけが先行すると敷居が高く見えますが、実際には“静かな町の終わり方”として使う方が旅行者には実用的です。\n\n写真セットに上七軒の情報碑や通りの写真を入れたのも、その控えめな終わり方を見せるためです。派手な一枚より、低い街路の連続の方が、このルートの説明としては正確です。" },
        { heading: "西陣は雨や疲れに比較的強い", body: "西陣の良さの一つは、雨や疲れに比較的強いことです。広すぎる庭園や長い山道がなく、街区の単位が小さいので、切り上げ方や短縮の仕方が簡単です。晴明神社までで終える、北野天満宮までで締める、上七軒を省く。どれでも成立します。\n\nつまり、西陣は“完全攻略”ではなく、途中でやめても体験の輪郭が残るエリアです。これは実務上かなり大きな利点で、旅行中盤の疲れが出た日に特に向いています。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、晴明神社、北野天満宮、上七軒、そして帰りに使う主要停留所か駅だけです。西陣は路地が多いですが、同時に大きな見失いも起きにくいので、細かい保存を増やすより、途中で少しだけ地図を確認できる状態の方が向いています。\n\nその意味で、日本向けeSIMはこの半日とも相性が良いです。ここで曲がるか、北野天満宮を先に入れるか、上七軒を短くするか。そうした調整が軽くできれば、町家路地歩きの良さを壊さずに済みます。通信を主役にしないまま、現地判断だけを軽くするのが理想です。" },
      ],
      [
        { q: "西陣は初めての京都でも使えますか？", a: "使えます。むしろ中心部の混雑に疲れやすい初回旅行者ほど向いています。歩きの密度を自分で調整しやすいからです。" },
        { q: "晴明神社と北野天満宮の両方を入れるべきですか？", a: "時間があれば両方がおすすめです。短くするなら、晴明神社で西陣の空気に入り、北野天満宮で締める構成が最もきれいです。" },
        { q: "上七軒は夜の方が良いですか？", a: "このガイドでは昼の終わり方として使う前提です。静かな通りとして味わうだけでも十分価値があります。" },
        { q: "雨の日でも成立しますか？", a: "はい。区画が小さく、短縮しやすいので、軽い雨や疲労時にも比較的扱いやすいルートです。" },
        { q: "食事やカフェは多めに入れても良いですか？", a: "一回か二回までが無難です。西陣は街路の縮尺が主役なので、店判断を増やしすぎると歩く魅力が薄れます。" },
      ],
    ),
    en: enContent(
      MINOR_GUIDE_CANON["kyoto-nishijin-machiya-lanes"].en.title,
      MINOR_GUIDE_CANON["kyoto-nishijin-machiya-lanes"].en.desc,
      NISHIJIN_IMAGES[0],
      NISHIJIN_IMAGES.slice(1),
      [
        { url: "https://x.com/kitano_bunka/status/2014600697397002704", label: "Kitano-area cultural account: an official post that helps anchor the route's northern Kyoto context" },
        { url: "https://x.com/kitano_bunka/status/1900386003137146940", label: "Kitano-area cultural account: another official reference that fits the calmer northwestern corridor" },
        { url: "https://x.com/kitano_bunka/status/1890571318065846486", label: "Kitano-area cultural account: a third official post that supports the page's North Kyoto cultural framing" },
      ],
      [
        { heading: "In Nishijin, street scale matters more than attraction count", body: "A good Nishijin half day is not defined by how many headline stops you complete. It is defined by street scale: lower facades, narrower roads, machiya texture, and the way smaller shrines or temple edges appear inside residential-looking lanes. That is what makes Nishijin so useful for foreign travelers who want quieter Kyoto without falling into something vague or thin.\n\nThis guide includes Seimei Shrine, Kitano Tenmangu, and Kamishichiken, but the real subject remains the machiya lanes between them. If any one anchor starts dominating too much, the route stops behaving like a Nishijin walk and starts behaving like a single-attraction detour." },
        { heading: "Seimei Shrine works best as the first anchor", body: "Seimei Shrine is an unusually good opening stop for this route because it has a clear identity without overpowering the surrounding district. It gives the half day an obvious entry point, but it still lets the lane texture stay in control. That balance matters. The route is not trying to become a full myth-themed shrine article. It is trying to use a recognizable place to ease travelers into a quieter Nishijin pace.\n\nFor many foreign visitors, that shift in atmosphere is the real value: less crowd-led motion, more visible neighborhood surface, and a better sense of how Kyoto feels once you step one layer away from the heaviest center-city flows." },
        { heading: "Kitano Tenmangu gives the second half real weight", body: "Kitano Tenmangu is strong enough to serve as the route's heavier second anchor. After machiya lanes and the Seimei segment, it gives the half day a more formal finish without erasing the quieter street logic that came first. That sequencing is important. Put Kitano first, and the route risks collapsing into shrine-only Kyoto. Put it later, and it feels like a reward that still fits the neighborhood walk.\n\nThe official X references also lean north-Kyoto and Kitano-ward for that reason. This page needs social references that help the specific cultural corridor it is describing, not generic citywide Kyoto promotion." },
        { heading: "Kamishichiken works better as a temperature drop than as a big event stop", body: "Kamishichiken is famous enough to feel intimidating in advance, but for this route it works best as a gentle landing space after Kitano Tenmangu. You are not required to chase a performance or a high-drama geiko experience. The district can simply function as the final low-rise cultural street where the half day eases out.\n\nThat is why the gallery includes street and marker views rather than only theatrical imagery. The route needs to show how the neighborhood feels to walk, not only how it performs in the most polished moments." },
        { heading: "Nishijin is relatively forgiving in rain or low-energy conditions", body: "One of Nishijin's strengths is that it shortens well. The district is not built around a giant garden, a mountain trail, or a single all-or-nothing landmark. You can stop after Seimei Shrine, finish at Kitano Tenmangu, or trim Kamishichiken and still keep the route's identity intact. That makes it very good for mid-trip days when energy is imperfect.\n\nIn other words, Nishijin is a rare district where quitting early does not necessarily feel like failure. That matters more in real travel than many polished itinerary pages admit." },
        { heading: "Practical notes for foreign travelers", body: "Save Seimei Shrine, Kitano Tenmangu, Kamishichiken, and one return station or major stop. That is enough. Nishijin has many lanes, but it does not usually require heavy planning. The route improves when you allow small course corrections instead of carrying a large saved list of sub-stops.\n\nThat makes a light Japan eSIM path a sensible support layer here. Deciding whether to turn sooner, shorten the northern segment, or keep Kamishichiken brief is exactly the sort of small routing choice that mobile data can simplify without taking over the story. The page remains tourism-first, but low-friction connectivity clearly helps execution." },
      ],
      [
        { q: "Does this work for a first Kyoto trip?", a: "Yes, especially for travelers who want a quieter half day and do not need every Kyoto stop to be one of the most famous downtown icons." },
        { q: "Should I include both Seimei Shrine and Kitano Tenmangu?", a: "If time allows, yes. They create the cleanest structure for the route. If you shorten it, keep Seimei first and Kitano as the finish." },
        { q: "Is Kamishichiken worth it in daytime?", a: "Yes. In this guide, it works as a quieter ending rather than a night-focused performance goal." },
        { q: "Does the route still work in rain?", a: "Yes. The district is compact enough that it can be shortened easily, which makes it relatively resilient in light rain or lower-energy conditions." },
        { q: "How much cafe or meal planning should I add?", a: "Usually one or two decisions at most. Too many shop or food stops can dilute the lane-focused structure that makes Nishijin worthwhile." },
      ],
    ),
  },
  "kamakura-komachi-backstreets-walk": {
    ja: jpContent(
      MINOR_GUIDE_CANON["kamakura-komachi-backstreets-walk"].ja.title,
      MINOR_GUIDE_CANON["kamakura-komachi-backstreets-walk"].ja.desc,
      undefined,
      [],
      [],
      [
        { heading: "このルートは小町通りだけで終わらせない", body: "鎌倉の小町通りは鎌倉駅東口の赤い鳥居から始まる短い参道通りで、八幡宮までのおよそ350mを埋める飲食と土産の列です。多くの訪問者がここだけで半日を使い切ってしまいますが、このガイドの主題はその“裏路地”です。通りに並行して走る若宮大路との間には、細い抜け道と町家寄りの低層街区があり、人の密度が数十メートルで一気に下がります。\n\n順番はシンプルで、駅から赤い鳥居を抜けて一度だけ小町通りに入り、早いうちに横に逸れます。そうすると半日がただの買い物通りにならず、鎌倉らしい生活街区の呼吸に戻れます。ゴールは鶴岡八幡宮で良いのですが、そこに着くまでの道筋を二、三回意識的に曲げるだけで体験の質はかなり変わります。" },
        { heading: "鎌倉駅東口を起点にすると迷いが少ない", body: "出発点は鎌倉駅東口で問題ありません。ここはJR横須賀線と江ノ電の結節で、駅前の小さな広場を抜ければすぐ赤い鳥居が見えます。最初の判断はここで行います。小町通りをどこで離れるか、若宮大路側へ一度だけ渡るか、最初から一本奥の細道を選ぶか。この三択だけ決めておけば、半日が混雑に押し戻されることはありません。\n\n外国人旅行者にとって鎌倉の分かりにくさは道ではなく、どこまでが観光通りでどこからが住宅街かの境目です。赤い鳥居と鶴岡八幡宮という両端を固定し、途中の曲がり方を自由にする、この骨格が一番扱いやすいです。" },
        { heading: "裏路地が半日の主役になる", body: "小町通りと若宮大路の間の路地は、看板が少なく低い家並みが続きます。表通りの賑わいをすぐ横で切り捨てられるのは鎌倉の構造的な強みで、京都の中心部ではこれほど短い距離で街の層が切り替わることはあまりありません。写真を狙って歩くよりも、通りの幅と建物の高さの変化を見ながら歩く方が、このルートの価値は引き立ちます。\n\nまた、裏路地は逆方向にも使えます。鶴岡八幡宮から戻るとき、そのまま小町通りに再突入せず、一本ずれた道で駅へ戻れば、鎌倉の半日は一枚の連続した記憶として終わります。行きと帰りを同じ道にしない、それだけで密度は変わります。" },
        { heading: "鶴岡八幡宮は到達点であり休憩ポイント", body: "鶴岡八幡宮は小町通り北端の若宮大路突き当たりに鎮座する鎌倉の中心的な神社で、若宮大路の石段と段葛の景観と合わせて一つの大きな休止符として機能します。ここを観光の“最後の一件”として扱うのではなく、半日の中間休憩と位置付けると疲労が溜まりません。参道の広がりで一度ペースを落とし、境内で少し座り、その後に裏路地へ戻る。この順番だと鎌倉の半日は想像より軽く歩けます。\n\n紅葉や花の季節は境内も若宮大路側も混みますが、そのぶん裏路地の価値が相対的に上がります。観光の主戦場から50メートル離れるだけで、人流の圧が一段下がるのが鎌倉の特徴です。" },
        { heading: "紫陽花シーズンは逃げ道を必ず作っておく", body: "鎌倉は6月の紫陽花シーズンに人流が急増します。明月院や長谷寺などの紫陽花名所は小町通りから直接は行けませんが、鎌倉駅の江ノ電側や北鎌倉側に移動する人が多く、小町通り自体の混雑も連動して上がります。このルートではそれを前提に、紫陽花名所へ行くか行かないかを先に決めておくのが実務的です。\n\n名所へ向かわないなら、小町通りの早い時間帯と裏路地だけで半日を構成するのが最も静かです。向かうなら、小町通りを短く切り、先に紫陽花寺で時間を使い、鎌倉駅に戻ってから裏路地へ入る逆コースが安定します。どちらにしても、混雑期は“表通りで長く止まらない”の一点さえ守れば、鎌倉の半日は崩れにくいです。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、鎌倉駅東口、小町通りの赤い鳥居、鶴岡八幡宮、そして帰りに使う駅だけです。鎌倉は街区が小さく迷いにくい反面、人の多さで判断が鈍ります。途中で小町通りを一本外す、八幡宮から戻る道を変える、そのレベルの小さな調整がその場でできれば十分です。\n\nその意味で、日本向けeSIMはこの半日とも相性が良いです。地図で一本奥の道を確認する、江ノ電の時刻を見る、北鎌倉方面へ伸ばすかを決める。そうした現地判断を軽くできると、鎌倉は“行列のある街”から“選択できる街”に変わります。本文の中心は街歩きですが、通信の軽さが静けさを守ります。" },
      ],
      [
        { q: "小町通りは完全に避けるべきですか？", a: "避ける必要はありません。赤い鳥居から入ってすぐの区間は鎌倉の空気を感じる入口として必要です。ただし早めに一本裏へ逸れると半日の質が上がります。" },
        { q: "鶴岡八幡宮は必須ですか？", a: "必須ではありませんが、裏路地を歩く半日の到達点としては自然です。短くしたい場合でも、段葛か若宮大路のどちらかは通過すると記事タイトル通りの流れが残ります。" },
        { q: "紫陽花を見るならこのルートと両立しますか？", a: "両立します。ただし明月院や長谷寺は小町通りから直接歩ける距離ではないので、半日の配分を“裏路地か紫陽花か”で先に決めるのがおすすめです。" },
        { q: "一人旅でも歩きやすいですか？", a: "歩きやすいです。鎌倉は区画が小さく、途中で引き返しやすいので、一人でも無理なく速度を調整できます。" },
        { q: "雨の日でも成立しますか？", a: "小雨なら成立します。若宮大路や小町通りの屋根掛かりの区間を多めに使い、裏路地は短めにすると安定します。" },
      ],
      "kanto",
    ),
    en: enContent(
      MINOR_GUIDE_CANON["kamakura-komachi-backstreets-walk"].en.title,
      MINOR_GUIDE_CANON["kamakura-komachi-backstreets-walk"].en.desc,
      undefined,
      [],
      [],
      [
        { heading: "Do not let Komachi-dori eat the whole half day", body: "Komachi-dori is the short approach street that runs from the red torii at the east exit of Kamakura Station toward Tsurugaoka Hachimangu, roughly 350 meters of food and souvenir shops running parallel to the wider Wakamiya-oji avenue. Most first-time visitors spend the entire half day on it, and that is exactly the move this guide is written against. The real subject here is the set of quieter lanes between Komachi-dori and Wakamiya-oji.\n\nThe sequencing is simple: enter under the red torii, walk Komachi-dori briefly for context, then step off to the side within the first couple of blocks. That single adjustment changes the half day from a shopping-street loop into something closer to a real neighborhood walk, finishing at Tsurugaoka Hachimangu without the street noise dominating your memory of Kamakura." },
        { heading: "Kamakura Station east exit is the obvious starting point", body: "Start at the east exit of Kamakura Station, where the JR Yokosuka Line and the Enoden meet. The small plaza in front puts the red torii immediately in view, which is what makes the route easy to read without complex navigation. Your only real decision here is when to leave Komachi-dori: within the first block, somewhere in the middle, or not at all. Pick one and the whole day flows.\n\nFor foreign travelers, the confusing part of Kamakura is rarely the streets. It is the boundary between tourist corridor and residential lane, which is unusually close together here. Anchoring on the red torii and Tsurugaoka Hachimangu at the two ends, then improvising in between, is the most forgiving structure." },
        { heading: "The backstreets are the actual subject", body: "The lanes between Komachi-dori and Wakamiya-oji have fewer signs and lower buildings. Kamakura's strength is how quickly that change happens: stepping one street over can drop the crowd pressure almost immediately, which is rarely true in the busier parts of Kyoto. Walking here is less about hitting photo spots and more about noticing how quickly the width of the road and the height of the buildings change.\n\nThese backstreets also work in reverse. On the way back from Tsurugaoka Hachimangu, if you skip returning down Komachi-dori and use a parallel lane instead, the whole half day closes as one coherent walk rather than fragmenting into 'shopping street twice'." },
        { heading: "Tsurugaoka Hachimangu is a midpoint, not a grand finale", body: "Tsurugaoka Hachimangu sits at the end of Wakamiya-oji, framed by its stone steps and the raised Dankazura path. It works best as a structural pause in the middle of the half day rather than as the dramatic final stop. Slow down along the approach, rest briefly inside the precinct, then turn back into the backstreets. That keeps the visit physically recoverable even in warmer months.\n\nIn peak leaf or flower seasons the precinct itself and Wakamiya-oji get busier, which actually raises the relative value of the side lanes. In Kamakura, the distance needed to drop crowd pressure is unusually short." },
        { heading: "Plan an escape if you visit during hydrangea season", body: "Kamakura gets significantly busier in June, when the hydrangea temples Meigetsu-in and Hasedera pull heavy daily volume. Neither one is directly reachable from Komachi-dori, but the flow of visitors routing through Kamakura Station raises the pressure on Komachi-dori itself. This route still works in that window, but only if you decide in advance whether to include a hydrangea temple or stay inside the Komachi area.\n\nIf you skip the hydrangea temples, keep the half day strictly to early Komachi-dori plus the backstreets. If you include them, do the flower temple first, return to Kamakura Station, and then do the backstreet loop. Either way, the one rule is: do not loiter on Komachi-dori during peak hours." },
        { heading: "Practical notes for foreign travelers", body: "Save Kamakura Station east exit, the red torii, Tsurugaoka Hachimangu, and one return station. That is enough. Kamakura is compact and very readable, but crowd density makes small decisions feel harder than they really are. Having the ability to step off Komachi-dori, change the return path, or extend toward the Enoden side on the spot is the real quality-of-life factor.\n\nA light Japan eSIM path helps here for the same reason. Checking a map for a parallel lane, looking at Enoden timings, or deciding whether to add a Kita-Kamakura extension is exactly the sort of small, on-the-ground adjustment that makes Kamakura feel selectable rather than simply crowded." },
      ],
      [
        { q: "Should I avoid Komachi-dori entirely?", a: "No. The first segment from the red torii is worth walking as the natural entry to Kamakura. Just step off onto a parallel lane within the first couple of blocks to keep the half day balanced." },
        { q: "Is Tsurugaoka Hachimangu required?", a: "Not strictly, but it makes a natural pivot for a backstreet-centered route. Even a short pass along Dankazura is enough to keep the walk coherent with the title." },
        { q: "Does this work during hydrangea season?", a: "Yes, if you commit early: either skip the famous hydrangea temples and stay in the Komachi area, or do the flower temple first and return for the backstreet loop afterward." },
        { q: "Is it good for solo travelers?", a: "Yes. The area is small and easy to reverse, so a solo walker can adjust pace without losing the route." },
        { q: "What about rain?", a: "Light rain is fine. Lean a little more on the covered sections of Komachi-dori and Wakamiya-oji, and shorten the backstreet segments." },
      ],
      "kanto",
    ),
  },
  "yokohama-noge-retro-walk": {
    ja: jpContent(
      MINOR_GUIDE_CANON["yokohama-noge-retro-walk"].ja.title,
      MINOR_GUIDE_CANON["yokohama-noge-retro-walk"].ja.desc,
      undefined,
      [],
      [],
      [
        { heading: "野毛はみなとみらいの“反対側”として読む", body: "野毛は横浜・桜木町駅を挟んでみなとみらい地区の反対側にある、低層の飲み屋街とレトロな商店街です。みなとみらいが広くて新しい都市面だとすれば、野毛は狭くて古い路地面で、この対比を一日で歩けるのが横浜の半日ルートとしての強みです。大岡川を渡って一街区入るだけで、建物の高さも人の速度も大きく変わります。\n\nこの記事は野毛を“昼から夕方にかけて”歩くことを前提にしています。夜の飲みが主役になる街ですが、昼〜夕方の看板と街並みだけを見て歩いても十分成立します。飲まない旅行者でも、横浜の二面性を体感する半日として機能します。" },
        { heading: "桜木町駅と野毛ちかみちを入口にすると分かりやすい", body: "起点は桜木町駅です。JR根岸線・京浜東北線と横浜市営地下鉄ブルーラインが接続する駅で、みなとみらい側と野毛側を結ぶ地下通路“野毛ちかみち”がそのまま野毛地区への入口になります。駅からほぼ歩きのみで野毛大通りに出られる構造なので、初回でも迷いません。\n\n入口の選び方はもう一つあります。みなとみらい側を先に見て、桜木町に戻ってから野毛へ渡るルートです。先に広く新しい都市を体験してから古い路地へ入ると、野毛の低さが一層はっきり見えます。記事タイトルのレトロ感を一番素直に感じられるのはこの順序です。" },
        { heading: "野毛大通りと小路の使い分けが半日の肝", body: "野毛大通りは地区を貫く広めの通りですが、野毛の本質は大通りから枝分かれする細い路地にあります。飲食店の看板が密に並び、昭和〜平成初期の景観が多く残っています。ここで大事なのは、大通りだけを歩き切るのではなく、小路へ短く入って戻る、を繰り返すことです。一度入るだけで街の奥行きが変わります。\n\n写真を撮るために立ち止まるよりも、小路の幅と看板の密度の変化を見る方が、野毛の半日としては豊かです。京都の町家路地とは違う“横浜側の古さ”が、低層の看板群と手すりの鉄の錆と電線の張り方で表現されています。" },
        { heading: "野毛山公園と伊勢山皇大神宮までで半日が締まる", body: "街並みだけでは半日が少し足りない場合、野毛の西側を登って野毛山公園や伊勢山皇大神宮まで行くと、ルート全体がきれいに閉じます。坂道を少し使いますが、距離は大きくなく、見晴らしと静けさが一段上がります。大通りと路地だけで終えるか、公園まで延ばすかの二択で半日の密度を調整できます。\n\n逆に公園まで行かない場合は、大岡川沿いに少し戻り、桜木町駅方面を眺めて帰るとちょうど良い終わり方になります。どちらを選んでも、野毛の半日は“小さく古い都市を一つ見た”という満足感で終わります。" },
        { heading: "夜側に寄せるなら時間を短く設計する", body: "野毛は夕方以降に本領を発揮します。ただし夜の野毛を観光目的で歩く場合、全部を見ようとすると疲れるので、むしろ2〜3時間に絞った方が満足度が高いです。大通りを一往復、気になる小路を一本、軽く一杯、それで十分に“横浜のレトロ”は伝わります。\n\nまた、毎年4月末には野毛大道芸が開催され、地区一帯がパフォーマンス会場になります。このタイミングは通常の歩き方より人流が激しくなるため、レトロ街歩きを主目的にするなら日程を外す方が落ち着いて歩けます。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、桜木町駅、野毛ちかみち、野毛大通り、伊勢山皇大神宮、そして帰りの駅だけです。野毛は地区として小さく、道もほぼ格子状なので、細かい保存を増やすより現地で地図を軽く確認できる状態の方が向いています。\n\nそのため、日本向けeSIMとの相性は良いです。みなとみらい側へ戻るか、野毛山公園まで延ばすか、もう一本路地に入るか。その場でこうした判断を軽くできれば、横浜の対比は体感として強く残ります。飲む予定が無くても、野毛は歩くだけで十分に横浜らしい半日になります。" },
      ],
      [
        { q: "飲まなくても楽しめますか？", a: "十分楽しめます。野毛は建物、路地、看板の景観が主役で、昼〜夕方の通過でもレトロ街並みとして機能します。" },
        { q: "みなとみらいとどちらを先にすべきですか？", a: "みなとみらいを先に、野毛を後にするのがおすすめです。新しい都市を先に体験した方が、野毛側の低さが際立ちます。" },
        { q: "野毛山公園は必須ですか？", a: "必須ではありません。時間と体力があれば半日の締めとして効きますが、大通りと路地だけでも成立します。" },
        { q: "大道芸の日に行く価値はありますか？", a: "お祭りとして楽しむなら価値は高いですが、記事タイトルの静かなレトロ散歩にはなりません。目的で使い分けるのが良いです。" },
        { q: "雨の日でも成立しますか？", a: "小雨なら成立します。屋根付きの大通り区間を中心に使い、路地は短めに調整すると安定します。" },
      ],
      "kanto",
    ),
    en: enContent(
      MINOR_GUIDE_CANON["yokohama-noge-retro-walk"].en.title,
      MINOR_GUIDE_CANON["yokohama-noge-retro-walk"].en.desc,
      undefined,
      [],
      [],
      [
        { heading: "Read Noge as the opposite side of Minato Mirai", body: "Noge is the low-rise retro drinking and shopping quarter directly across from the tall Minato Mirai district, separated only by Sakuragicho Station and the Ooka River. If Minato Mirai is Yokohama's wide, glass-and-steel face, Noge is the narrow-lane, older-signage face of the same city. The value of this half day is that both sit within easy walking distance of each other, and crossing over produces a much sharper contrast than most Tokyo neighborhood walks can offer.\n\nThis guide assumes an afternoon-to-early-evening use of Noge, not a full bar crawl. Noge is genuinely famous for nightlife, but its streetscape and retro signage read clearly during daylight too, which means even travelers who do not drink can still get the core Yokohama contrast from this route." },
        { heading: "Sakuragicho Station and Noge-Chikamichi are the clean entry point", body: "Start at Sakuragicho Station, served by JR Keihin-Tohoku / Negishi and the Yokohama Municipal Subway Blue Line. The Noge-Chikamichi underpass connects Sakuragicho directly under the street network into Noge, so you enter the district almost entirely on foot without exposed traffic crossings. That makes the whole transition simple even for a first visit.\n\nA second option is to see Minato Mirai first and only then cross into Noge. Doing it in that order makes the contrast sharper: the scale of the towers on one side, then the low signage and narrow streets on the other. That sequencing is the easiest way to make this half day feel like one coherent route rather than two separate visits." },
        { heading: "The main street and the side lanes serve different purposes", body: "Noge-odori is the wider street running through the district, but the real identity of Noge lives in the smaller lanes branching off it. These are where the dense food-and-bar signage, older facades, and unmistakably Showa-era streetscape stay strongest. The practical move is not to walk Noge-odori end to end; it is to go short distances on it, peel off into a side lane, come back, and repeat.\n\nYou will likely get more from this route by observing how the width and signage density change than by hunting specific photo spots. It is a different kind of old than Kyoto-machiya old: Yokohama's version runs on low storefronts, metal railings, and a thick tangle of overhead cables." },
        { heading: "Nogeyama Park and Iseyama Kotai Jingu close the route cleanly", body: "If the streets alone do not fill the half day, climbing west to Nogeyama Park and Iseyama Kotai Jingu closes the route at a quieter elevation. The grade is moderate rather than hard, and it provides a visible break from the dense street layout below. Your main structural choice is whether to stay low in the streets or push up for the final segment.\n\nIf you skip the uphill finish, walking briefly back along the Ooka River toward Sakuragicho makes a clean alternative ending. Either way, the half day lands with a clear sense of having seen one small, older piece of Yokohama rather than only crossing it." },
        { heading: "If you lean into the evening, keep the scope tight", body: "Noge shows its full character after dark, but as a travel plan an open-ended bar crawl rarely beats a focused two-to-three-hour window. One round-trip on Noge-odori, one chosen side lane, and one seated break is usually enough to feel what the district does in the evening without exhausting the rest of the trip.\n\nOne timing note: the annual Noge Daidogei (street performance) festival takes place on a weekend in late April and fills the whole district with performers and crowds. That is fun on its own terms but it does not produce the quiet retro walk this page describes. If the retro-street feel is the goal, avoid the festival weekend." },
        { heading: "Practical notes for foreign travelers", body: "Save Sakuragicho Station, Noge-Chikamichi, Noge-odori, Iseyama Kotai Jingu, and one return station. That is enough. Noge is compact and mostly gridded, so heavy route saving is unnecessary. What matters is being able to make small decisions in the moment: whether to cut back to Minato Mirai, extend up to Nogeyama Park, or duck into one more lane.\n\nA light Japan eSIM path supports exactly that kind of small decision. Quick map checks and transit timing are what lets this route stay flexible on the ground, and that flexibility is what makes Yokohama feel like a two-sided city instead of only the postcard waterfront." },
      ],
      [
        { q: "Is it worth visiting if I do not drink?", a: "Yes. Noge's streetscape, signage, and low-rise layout read well in daylight too, so a daytime retro walk works cleanly on its own." },
        { q: "Should I see Noge or Minato Mirai first?", a: "Usually Minato Mirai first, then Noge. Seeing the tall, new side first makes the low, older side much more distinct when you cross." },
        { q: "Is Nogeyama Park essential?", a: "No. It is a clean ending if you have time, but the Noge-odori and side lanes already make a complete half day." },
        { q: "Is the Daidogei festival a good time to visit?", a: "It is a good experience on its own terms, but it does not fit this quieter retro-walk framing. Pick the goal first, then choose the date." },
        { q: "Does this route work in rain?", a: "Light rain is fine. Stay mostly on the more covered parts of the main street and shorten the side lanes." },
      ],
      "kanto",
    ),
  },
  "kawagoe-koedo-kurazukuri-walk": {
    ja: jpContent(
      MINOR_GUIDE_CANON["kawagoe-koedo-kurazukuri-walk"].ja.title,
      MINOR_GUIDE_CANON["kawagoe-koedo-kurazukuri-walk"].ja.desc,
      undefined,
      [],
      [],
      [
        { heading: "川越は“東京からの日帰り”の実用的な選択肢", body: "川越は埼玉県にある旧城下町で、蔵造りの商家が連続する一番街地区が中心です。新宿から西武新宿線で本川越駅まで、池袋から東武東上線やJR川越線で川越駅まで、いずれも片道30〜45分程度で届くため、東京からの日帰りとして無理のない距離にあります。日光や鎌倉より近く、浅草や両国と比べれば滞在時間の半分近くが実質的な街歩きに使えるのが強みです。\n\nこのガイドが扱うのは、観光地としての川越ではなく、蔵造り通り・時の鐘・菓子屋横丁・氷川神社の四点を一本の動線でつなぐ“歩くための一日”です。川越のエリアは徒歩で回りきれる範囲に集まっているので、半日でも一日でも使える柔軟なルートになります。" },
        { heading: "どの駅から入るかで街の印象が変わる", body: "川越には事実上三つの入口があります。西武新宿線の本川越駅、東武東上線の川越駅、JR川越線の川越駅です。本川越駅は中心部に最も近く、蔵造り通りまで徒歩10〜15分ほどで届くため、最短で街並みに入りたいなら本川越が楽です。東武・JRの川越駅はクレアモール商店街を抜けてから一番街へ向かう距離があり、そのぶん現代的な駅前から旧街区への変化を歩きで感じられます。\n\n初回訪問で分かりやすさを取るなら本川越、街の層を順に見たければ川越駅、と割り切るのが実務的です。帰りに別の駅を使うと、同じ道を二度歩かずに一日がまとまります。" },
        { heading: "一番街の蔵造り通りが半日の中心", body: "川越の主題は一番街の蔵造り通りです。1893年の大火のあとに防火構造として再建された重厚な商家が連続し、1999年には国の重要伝統的建造物群保存地区に選定されています。通りの中心には時の鐘が立ち、旧町の時間軸を象徴する存在として写真と音の両方で分かります。\n\nこの通りは両側の建物の屋根と壁の連続を見ながら歩くのが最も豊かな楽しみ方で、個別の店に入り浸るより、通り全体の連なりを一度往復する方が街の構造が見えます。周辺の脇道にも蔵造りが断続的に残っているので、一本裏へ入る余白を残しておくと体験の密度が上がります。" },
        { heading: "菓子屋横丁と喜多院は性格が違う寄り道", body: "蔵造り通りから少し北西へ入ると菓子屋横丁です。駄菓子と飴の店が並ぶ短い路地で、通りの雰囲気とは別の、やや庶民的な昭和の残り香があります。滞在は長くなくていいので、蔵造り通りの途中の方向転換として挟むとバランスが良いです。\n\nもう一つの寄り道は喜多院です。蔵造り通りから南側へ歩いて10分強の位置にあり、徳川家ゆかりの寺として歴史的な厚みがあります。こちらは蔵造りの商家建築とは別系統の文化財なので、体力と興味がある日に組み込むと一日の構造が“街+寺”の二層になります。" },
        { heading: "氷川神社は終盤に置くと流れが良い", body: "川越氷川神社は一番街のさらに北東側、新河岸川沿いに位置します。縁結びの神社として広く知られ、夏には風鈴祭(縁むすび風鈴)、7月20日には例大祭、10月の第三土日には川越祭(2016年にユネスコ無形文化遺産に登録された山車行事)など、季節ごとの行事が重なります。蔵造り通りと菓子屋横丁で街並みを歩いてから氷川神社へ抜けると、一日の終盤の空気が切り替わります。\n\nお祭りの日程に合わせるかは目的次第ですが、川越祭の週末は人流と交通規制が強く、蔵造り通り単体の静かな街歩きを求める旅行者には向きません。祭りが見たい日なのか、街並みが見たい日なのかを先に決めておく方が満足度が高いです。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、本川越駅もしくは川越駅、蔵造り通り(一番街)、時の鐘、菓子屋横丁、氷川神社、そして帰りの駅だけです。中心部はほぼ徒歩圏で、小江戸巡回バスもありますが、歩き中心の一日ならバス路線を厳密に覚える必要はありません。\n\nその意味で、日本向けeSIMはこの日帰りにも効きます。蔵造り通りを先に往復するか、菓子屋横丁を先に寄るか、氷川神社まで延ばすか、喜多院を足すか。その場で軽く地図と時刻を確認できるだけで、川越の一日はかなり扱いやすくなります。" },
      ],
      [
        { q: "川越は半日でも足りますか？", a: "足ります。蔵造り通り、時の鐘、菓子屋横丁だけに絞れば、本川越駅を起点に半日で十分成立します。" },
        { q: "東京から最短ルートはどれですか？", a: "西武新宿線で本川越駅まで行くのが中心部まで最短です。池袋から東武東上線の川越駅経由も近く、帰りを別ルートに取ると動線が重なりません。" },
        { q: "氷川神社と喜多院は両方入れるべきですか？", a: "一日で余裕があれば両方可能ですが、半日ベースなら氷川神社を優先すると蔵造り→街→神社という流れが自然です。" },
        { q: "川越祭の週末に行く価値はありますか？", a: "祭り目当てなら高い価値がありますが、静かな蔵造り散歩としては成立しにくくなります。目的を先に決めるのがおすすめです。" },
        { q: "雨の日でも成立しますか？", a: "成立します。蔵造り通りは屋根付きや庇のある区間が多く、菓子屋横丁も短いので、雨に弱いルートではありません。" },
      ],
      "kanto",
    ),
    en: enContent(
      MINOR_GUIDE_CANON["kawagoe-koedo-kurazukuri-walk"].en.title,
      MINOR_GUIDE_CANON["kawagoe-koedo-kurazukuri-walk"].en.desc,
      undefined,
      [],
      [],
      [
        { heading: "Kawagoe is one of the most practical day trips out of Tokyo", body: "Kawagoe is a former castle town in Saitama Prefecture, known for a continuous row of kura-zukuri (warehouse-style) merchant houses along Ichibangai street. It is roughly 30 to 45 minutes one way from central Tokyo: the Seibu Shinjuku Line runs to Hon-Kawagoe Station, and the Tobu Tojo Line from Ikebukuro plus the JR Kawagoe Line serve Kawagoe Station. That puts it closer to central Tokyo than Nikko or deep Kamakura extensions, which means much more of the day is actual walking time.\n\nThis guide is not written as a general Kawagoe overview. It is written as a walkable day linking four points: the Kurazukuri Preservation District, Toki no Kane bell tower, Kashiya Yokocho (the candy alley), and Hikawa Shrine. All four sit within a tight on-foot radius, which is why the route works equally well as a half day or a full day." },
        { heading: "Your station choice changes the shape of the day", body: "Kawagoe effectively has three station entries: Hon-Kawagoe on the Seibu Shinjuku Line, Kawagoe on the Tobu Tojo Line, and Kawagoe on the JR Kawagoe Line. Hon-Kawagoe is closest to the core, roughly a 10 to 15 minute walk to Ichibangai, so it is the fastest way to reach the kura-zukuri street directly. The Tobu and JR Kawagoe stations sit farther south; reaching Ichibangai from either involves walking through the modern Crea Mall shopping arcade first.\n\nA simple rule: use Hon-Kawagoe if you want to land in the old town quickly, and use Tobu or JR Kawagoe if you want the layered experience of modern station, contemporary shopping street, and then the historic district. Entering through one and leaving through a different one avoids walking the same ground twice." },
        { heading: "Ichibangai's kura-zukuri street is the core of the day", body: "The centerpiece is Ichibangai, the kura-zukuri merchant street rebuilt after Kawagoe's 1893 fire using fire-resistant clay-walled construction. The district was designated a National Important Preservation District for Groups of Traditional Buildings in 1999, and Toki no Kane, the wooden bell tower at the heart of the street, remains the visual anchor that ties the block together.\n\nWalking Ichibangai is less about individual shops and more about the continuous roofline and heavy front facades. Walking the street end-to-end once, then turning off onto a side lane, usually reveals more of the preservation layer than just standing in front of one storefront. The kura buildings do extend intermittently into adjacent streets, so leaving a little room to wander sideways is part of doing Ichibangai well." },
        { heading: "Kashiya Yokocho and Kitain are two different kinds of side trips", body: "Just northwest of Ichibangai, Kashiya Yokocho is a short candy-shop alley. It has a more everyday Showa-era feel than the heavier kura street, so it works best as a brief detour midway through Ichibangai rather than as a separate destination. You do not need to linger to get the point.\n\nKitain, the Tendai-sect temple associated with the Tokugawa family, sits about a 10-15 minute walk south of Ichibangai. It is a different cultural layer from the merchant-house architecture and adds real depth if you have the day rather than only the half day. Treat it as an optional second leg rather than part of the core kura-zukuri sequence." },
        { heading: "Hikawa Shrine makes the cleanest closing stop", body: "Kawagoe Hikawa Shrine is northeast of Ichibangai, along the Shingashi River. It is widely known for enmusubi (matchmaking) and hosts a summer wind-chime festival, a major annual festival on July 20, and the Kawagoe Matsuri on the third weekend of October (the festival's float procession was inscribed on UNESCO's Intangible Cultural Heritage list in 2016). Finishing the day with the shrine after Ichibangai and Kashiya Yokocho gives the route a gentler closing register.\n\nWhether to align with festival dates is a taste question. Kawagoe Matsuri weekend brings heavy crowd volume and traffic control to the old town, which is incompatible with a quiet kura-zukuri walk. Decide up front whether you are here for the festival or for the streetscape; the two visits look very different on the ground." },
        { heading: "Practical notes for foreign travelers", body: "Save Hon-Kawagoe or Kawagoe Station, Ichibangai, Toki no Kane, Kashiya Yokocho, Hikawa Shrine, and your return station. That is enough. Most of the core is walkable; the Koedo loop bus exists if you want it, but a walking-centric day does not require memorizing its routes.\n\nA light Japan eSIM path is helpful here because the in-day decisions are small but meaningful: do you extend to Kitain, lean harder into Hikawa Shrine, swap return stations, or shorten Ichibangai if the day is hotter than expected? Quick map and schedule checks on the ground are what makes Kawagoe feel like a flexible day trip rather than a fixed itinerary." },
      ],
      [
        { q: "Is a half day enough for Kawagoe?", a: "Yes. A half day starting at Hon-Kawagoe and covering Ichibangai, Toki no Kane, and Kashiya Yokocho works cleanly. A full day adds Hikawa Shrine and optionally Kitain." },
        { q: "What is the fastest way from central Tokyo?", a: "Seibu Shinjuku Line to Hon-Kawagoe lands closest to the old town. Tobu Tojo Line from Ikebukuro to Kawagoe Station is a common alternative; using different stations for arrival and departure avoids retracing the same walk." },
        { q: "Should I include both Hikawa Shrine and Kitain?", a: "With a full day, yes. For a half day, prioritize Hikawa Shrine as the closing stop, since it sits naturally at the end of the kura-zukuri walk." },
        { q: "Is Kawagoe Matsuri weekend a good time to go?", a: "It is excellent for the festival itself, but it is not compatible with a quiet kura-zukuri walk. Pick the purpose first, then the date." },
        { q: "Does this work in rain?", a: "Yes. Ichibangai has many storefront eaves and Kashiya Yokocho is short, so the route is relatively rain-tolerant compared to more exposed walks." },
      ],
      "kanto",
    ),
  },
  "nara-naramachi-machiya-walk": {
    ja: jpContent(
      MINOR_GUIDE_CANON["nara-naramachi-machiya-walk"].ja.title,
      MINOR_GUIDE_CANON["nara-naramachi-machiya-walk"].ja.desc,
      undefined,
      [],
      [],
      [
        { heading: "奈良は“東大寺と鹿”だけで終わらせない", body: "奈良観光は多くの場合、近鉄奈良駅から東大寺と奈良公園へ直行する定番ルートで消費されます。このガイドが扱う“ならまち”は、その反対方向、近鉄奈良駅の南側に広がる町家街区です。奈良町の範囲はかつて元興寺の境内だった場所と重なっており、今でも低層の町家と細い路地、小さな寺社が連続する奈良の古い生活層が残っています。\n\n東大寺側が“仏教建築の巨大さ”で奈良を見せる場所だとすれば、奈良町は“都市の低さ”で奈良を見せる場所です。観光のピークを避けたい旅行者、奈良に半日だけ使える旅行者、あるいは二度目以降の奈良訪問で別の層を体験したい旅行者にとっては、こちらの半日のほうが記憶に残りやすいです。" },
        { heading: "近鉄奈良駅から南へ歩くと骨格が分かりやすい", body: "起点は近鉄奈良駅が最も分かりやすいです。駅南口から猿沢池までは徒歩5分ほどで、池の向かいに興福寺の五重塔が立つ構図を見てから奈良町へ降りると、都市の縮尺が段階的に変わっていきます。JR奈良駅を起点にすることもでき、その場合は20分ほど東へ歩くことで三条通り経由で町の中心へ入れます。\n\nどちらの駅から入っても、奈良町の入口までは徒歩で収まる距離です。奈良公園と反対方向に歩くことさえ意識すれば、方向感覚を失う心配は少ないです。帰りをJRから戻すか、近鉄で戻すかを先に決めておくと一日がきれいに閉じます。" },
        { heading: "ならまちは元興寺を中心に読む", body: "奈良町の中心的な寺が元興寺です。もともと飛鳥寺の流れをくむ古代寺院で、奈良町の街区自体がかつての元興寺境内に由来しています。境内の規模は縮小しましたが、瓦屋根の古さや本堂周辺の静けさは、観光地化されきらないスケールで残っています。ここを一度訪れると、町家路地がただの“古そうな街並み”ではなく、大寺の境内の残滓を歩いているという構造が見えてきます。\n\n写真を撮って回る場所というより、境内と町家路地の距離感を肌で確認する場所です。奈良町の路地は狭く、白壁と格子戸、小さな祠が連続していますが、どれも元興寺の周囲に広がったかつての寺内町の輪郭に沿っています。歴史を全て覚える必要はなく、寺と町が同じ地面の上にあることが分かれば十分です。" },
        { heading: "猿沢池と興福寺は入口かつ休止符", body: "猿沢池は奈良町と奈良公園側の中間に位置する小さな池で、対岸の興福寺の五重塔を水面に映す定番の景観地です。観光の通過点として有名ですが、このルートでは“奈良町に入る前と後のリセット地点”として位置付けると有効に使えます。入る前に一度通ると気分が整い、奈良町から戻ってきたときに座って休むと、半日の集中力が回復します。\n\n興福寺は猿沢池から階段を上るとすぐで、国宝館の仏像群はそれだけで半日を埋める密度がありますが、ならまち歩きの日に組み込む場合は外観の通過だけでも意味があります。欲張って全部を見るより、半日の軸を奈良町側に保ったほうが記事タイトルに忠実です。" },
        { heading: "奈良町の路地は“観光用”として作られていない", body: "奈良町の魅力は、見学対象としてパッケージ化されていないことです。町家を改装したカフェやショップは増えていますが、中心はあくまで住宅街で、朝早い時間帯は特に生活の気配が強く残ります。これは京都の観光化された町家地区とは大きく違う点で、外国人旅行者にとっては“本物の古い街”として感じやすい要因になります。\n\nただし、生活街区であるがゆえに立ち入りのマナーは重要です。個人宅の敷地や私道に踏み込まない、大声で歩かない、写真は通りの公共空間に限る、といった基本的な節度を守るだけで、奈良町の半日は街と旅行者の双方にとって無理のないものになります。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、近鉄奈良駅、猿沢池、元興寺、そして帰りの駅(近鉄奈良かJR奈良)だけです。奈良町は区画が小さく、地図を細かく保存するより、交差点ごとに軽く確認できる状態の方が街の密度に合います。奈良交通の市内循環バス1・2系統も市内中心を周回しており、疲れた時のエスケープ手段になります。\n\n日本向けeSIMはこの半日とも相性が良いです。東大寺側へ戻るか、ならまちを短くするか、JR側へ抜けて戻るか、そうした小さな判断が軽くできれば、奈良は“鹿の街”ではなく“低い町の街”として記憶に残ります。本文の中心は街歩きですが、通信の軽さがその静けさを守ります。" },
      ],
      [
        { q: "東大寺や鹿を見なくても価値はありますか？", a: "あります。ならまちは奈良公園側とは別軸の街歩きとして成立するので、寺社や鹿を省いても半日は十分に機能します。" },
        { q: "近鉄奈良とJR奈良、どちらから入るべきですか？", a: "中心部に近いのは近鉄奈良駅です。JR奈良駅から入ると三条通り経由の距離があり、そのぶん街の変化を歩けます。" },
        { q: "元興寺は必須ですか？", a: "街の構造を理解するには一度入るのがおすすめです。奈良町全体がかつての境内だったという文脈が、路地歩きの意味を変えます。" },
        { q: "一人旅でも歩きやすいですか？", a: "歩きやすいです。区画が小さく混雑も比較的軽いため、一人でも速度を自分で保てます。" },
        { q: "雨の日でも成立しますか？", a: "成立します。路地は短い区間の連続なので、屋根のある建物に避難しやすく、奈良公園側より雨に強いルートです。" },
      ],
      "kansai",
    ),
    en: enContent(
      MINOR_GUIDE_CANON["nara-naramachi-machiya-walk"].en.title,
      MINOR_GUIDE_CANON["nara-naramachi-machiya-walk"].en.desc,
      undefined,
      [],
      [],
      [
        { heading: "Nara is not only Todai-ji and the deer", body: "A typical Nara day trip runs from Kintetsu Nara Station straight into Nara Park and Todai-ji, which compresses the city into its loudest, most famous segment. This guide covers the opposite direction: Naramachi, the old machiya district immediately south of Kintetsu Nara Station. Naramachi overlaps almost exactly with what were once the temple grounds of Gango-ji, and the area still preserves low-rise machiya houses, narrow lanes, and small shrines in a way that reads very differently from the park side.\n\nIf Todai-ji represents monumental-scale Nara, Naramachi represents low-rise Nara. For travelers who want to avoid peak-Nara crowding, for travelers with only a half day in the city, and especially for second-time Nara visitors, this half day often turns into the more memorable one." },
        { heading: "Walking south from Kintetsu Nara is the easiest structure", body: "Kintetsu Nara Station is the most convenient starting point. From the south side of the station it is about a 5-minute walk to Sarusawa-ike pond, with Kofuku-ji's five-story pagoda visible across the water. From the pond, descending south takes you into Naramachi within another few minutes. JR Nara Station also works, but requires roughly 20 minutes walking east via Sanjo-dori to reach the central district.\n\nFrom either station the entry is fully walkable. The one directional rule worth keeping in mind is: walk away from Nara Park, not toward it. If you commit to the opposite direction and plan whether to return via the same station or the other, the half day closes neatly." },
        { heading: "Naramachi is best read through Gango-ji", body: "The central temple of the district is Gango-ji, a temple with roots tracing back to Asuka-dera, and the Naramachi area itself developed on what were once its grounds. The modern temple compound is much smaller, but the tiled roofs and the quiet around the main hall read clearly as a surviving older core rather than a polished sightseeing stop. Once you understand that Naramachi literally sits on Gango-ji's former precincts, the lanes stop being 'generic old streets' and start reading as the remains of a temple town.\n\nThis is less a place to photograph exhaustively and more a place to feel the relationship between the temple interior and the surrounding lanes. The streets are narrow, the white walls and wooden lattices are continuous, and small shrines appear without warning, all roughly tracing the historical outline of what used to be one much larger temple complex." },
        { heading: "Sarusawa-ike and Kofuku-ji are a threshold, not the main event", body: "Sarusawa-ike sits between Nara Park and Naramachi, offering the classic reflection of Kofuku-ji's pagoda across the water. It is famous enough that most travelers pass through it, but for this route it works best as a reset point on the way in and a seated pause on the way back. Using the pond twice that way, rather than as a single photo stop, makes the half day feel structured without adding distance.\n\nKofuku-ji is right above the pond, and its National Treasure Hall alone is dense enough to eat a whole half day. On a Naramachi-centered day, treating Kofuku-ji as an optional exterior walk-through is usually the right call. Keeping the center of gravity on Naramachi is what keeps the page honest to its title." },
        { heading: "Naramachi was not built for tourism", body: "Naramachi's appeal is that it is not packaged. Cafes and shops inside renovated machiya have increased, but the neighborhood is still fundamentally residential, and in the early morning in particular the district reads as ordinary lived-in space. That is a meaningful contrast with heavily commercialized old districts in other cities, and it is a big reason foreign travelers often describe Naramachi as feeling 'genuinely old' rather than restored for visitors.\n\nBeing a residential district, the usual etiquette applies: keep off private land and driveways, keep voices low, and keep photography on public streets rather than into private windows. With those small baseline habits, the half day works smoothly for both the visitor and the neighborhood." },
        { heading: "Practical notes for foreign travelers", body: "Save Kintetsu Nara Station, Sarusawa-ike, Gango-ji, and your return station (Kintetsu Nara or JR Nara). That is enough. Naramachi is compact, so heavy pre-saved lists underperform compared to making small decisions at each junction. Nara Kotsu's city loop buses 1 and 2 circle the central area and can rescue tired legs if you need them.\n\nA light Japan eSIM path pairs well with this half day. Deciding whether to cut back toward Nara Park, shorten the Naramachi loop, or return via the other station is the kind of small call that benefits directly from reliable maps and timing on the ground. The route stays walking-first, but low-friction connectivity is what keeps it quietly flexible." },
      ],
      [
        { q: "Is it worth doing if I skip Todai-ji and the deer?", a: "Yes. Naramachi stands on its own as a half day, and travelers who already know Nara Park often find this the more memorable side of the city." },
        { q: "Should I start at Kintetsu Nara or JR Nara?", a: "Kintetsu Nara is closer to the core. JR Nara adds a walking segment along Sanjo-dori, which is useful if you want the layered approach through the city." },
        { q: "Is Gango-ji essential?", a: "Strongly recommended. Visiting Gango-ji is what turns the surrounding lanes from generic old streets into the outline of a former temple town." },
        { q: "Is this good for solo travelers?", a: "Yes. The district is compact and generally quieter than the park side, which makes solo pacing easy." },
        { q: "Does it work in rain?", a: "Yes. The lanes run in short segments, so sheltering between buildings is straightforward, and the route is noticeably more rain-tolerant than the exposed park side." },
      ],
      "kansai",
    ),
  },
  "kobe-kitano-ijinkan-walk": {
    ja: jpContent(
      MINOR_GUIDE_CANON["kobe-kitano-ijinkan-walk"].ja.title,
      MINOR_GUIDE_CANON["kobe-kitano-ijinkan-walk"].ja.desc,
      undefined,
      [],
      [],
      [
        { heading: "北野は“神戸らしさ”を最短で体感できる半日", body: "北野異人館街は、神戸の中心である三宮と新神戸の北側、六甲山の麓の斜面に広がる居留地由来の洋館群です。1868年の神戸開港以降、外国人居留地が中心部に設けられ、その関連で貿易商や領事が住居を構えたのが北野エリアで、煉瓦、下見板張り、ベイウィンドウといった西洋建築様式が坂道の上に並ぶ景観が残っています。\n\nこのルートは、神戸の“海・港・商業”の面ではなく、“港から人が上陸したあとに暮らした住居の街”を見る半日です。三宮から徒歩15分ほどで街区に入れるため、半日もしくは午後の短い時間でも十分に北野の主題を歩けます。" },
        { heading: "三宮と新神戸が実質的な二つの入口", body: "北野異人館街の代表的な入口は二つあります。三宮駅北口から坂を上がる動線と、新神戸駅から下りる動線です。どちらもおよそ徒歩15分の距離で、どちらを選んでも街区の中心(北野町広場周辺)に到達します。三宮から入ると“街から上がる”体験になり、新神戸から入ると“山側から下る”体験になります。\n\n実用的な組み方としては、片方から入ってもう片方で下りる往復ルートがおすすめです。同じ坂を二度歩かずに済み、斜面の街としての性格も双方向から感じられます。神戸市のシティループバスも北野異人館前に停車するので、体力を温存したい場合はバスを片道に組み込めます。" },
        { heading: "風見鶏の館と萌黄の館が街区の核", body: "北野の中心的な建物が、旧トーマス邸として知られる風見鶏の館です。ドイツ人貿易商G.トーマスのために1909年に建てられた住宅で、設計はドイツ人建築家G.デ・ラランデ。煉瓦外壁と半地下の花崗岩、尖塔の風見鶏が特徴で、国の重要文化財に指定されています。北野町広場の正面に立ち、この街区の象徴となっています。\n\n隣に並ぶ萌黄の館は、淡い黄緑色の木造洋館で、風見鶏の館とは別系統の穏やかな外観を持ちます。二棟を対比で見ると、北野の異人館が一つのスタイルに統一されていたのではなく、住人ごとの様式が斜面に点在していた街だということが分かります。内部見学は有料の館が多いので、外観と街路の連続を歩くだけでも十分に街の構造は伝わります。" },
        { heading: "坂道と細道を“街並み”として読む", body: "北野の面白さは、異人館一軒一軒よりも、それらを結ぶ坂道と細道の連続にあります。北野町広場を中心に、北野通り、山本通り、そして枝分かれする細い坂が斜面を等高線に沿って走り、角ごとに街並みの見え方が変わります。観光的な“必見の館”だけを線でつなぐのではなく、館の間を歩く時間に比重を置くと、神戸の半日としての密度が増します。\n\nまた、坂の上からは神戸の街と港方向への眺望がところどころに開けます。北野単体では港は見えませんが、街の高低差そのものが神戸の地形の物語を視覚化しているので、歩きながら高さを使うだけで、港町・神戸の構造が体で理解できます。" },
        { heading: "下山後は三宮・元町側に自然につながる", body: "北野の半日は、坂を下りて三宮や元町側に戻るところで自然に終わります。三宮はJR・阪急・阪神・ポートライナー・神戸市営地下鉄が集まる交通ハブで、北野を出たあとに夕食やショッピングを足すのも、そのまま別のエリアへ移動するのも簡単です。神戸港・メリケンパーク方面まで徒歩で続ける選択肢も実用的な範囲内にあります。\n\n一方で、半日を北野だけで完結させる構成も十分に成り立ちます。観光の“もう一件”を無理に積まないことで、北野異人館街というテーマが最後まで軸として残ります。ショートトリップで神戸を初めて訪れる旅行者にとっては、こちらの方が印象を散らさずに済みます。" },
        { heading: "外国人旅行者向けの実務メモ", body: "保存しておくと良いのは、三宮駅または新神戸駅、北野町広場、風見鶏の館、萌黄の館、そして帰りの駅だけです。北野は坂道ではありますが区画としては小さく、地図を細かく保存するより、坂の上と下のランドマークを押さえておく方が実務的です。神戸シティループバスが北野異人館前を通るので、片道を徒歩、もう片道をバスにしてもきれいに収まります。\n\n日本向けeSIMもこの半日と相性が良いです。次の館まで歩くか、バスを使うか、三宮側へ戻るか新神戸側へ下るか、といった現地判断を軽くできると、北野の坂道は単なる登りではなく“選べる街”になります。本文の中心は街歩きですが、通信の軽さが選択肢の幅を保ちます。" },
      ],
      [
        { q: "全部の異人館に入るべきですか？", a: "その必要はありません。内部見学は有料館が多く、外観と坂道の連続を歩くだけでも北野の街としての構造は十分に伝わります。" },
        { q: "三宮と新神戸、どちらから入るべきですか？", a: "どちらでも成立しますが、片方から入って反対から出る往復ルートが最もきれいです。同じ坂を二度歩かずに済みます。" },
        { q: "シティループバスは使うべきですか？", a: "疲労や時間次第で片道に組み込む価値があります。全行程をバスにする必要はなく、歩きと組み合わせる方が北野の斜面の性格が体で分かります。" },
        { q: "ポートタワー側と同日に回れますか？", a: "回れます。ただし北野と港側は性格がかなり違うので、半日ずつで分けた方が印象が散りにくいです。" },
        { q: "雨の日でも成立しますか？", a: "小雨なら成立します。異人館の外観と坂道の組み合わせは雨の日にも独特の雰囲気があり、見学を内部にシフトする余地もあります。" },
      ],
      "kansai",
    ),
    en: enContent(
      MINOR_GUIDE_CANON["kobe-kitano-ijinkan-walk"].en.title,
      MINOR_GUIDE_CANON["kobe-kitano-ijinkan-walk"].en.desc,
      undefined,
      [],
      [],
      [
        { heading: "Kitano is the fastest way to feel 'Kobe-like' Kobe", body: "The Kitano Ijinkan district sits on the slope north of Sannomiya and Shin-Kobe stations, at the base of Mt. Rokko. After Kobe opened as a port in 1868, a foreign settlement was set up in the central city, and the traders and consuls connected to it built residences uphill in Kitano. What remains is a scatter of Western-style residences with brick walls, wooden siding, and bay windows sitting along stepped streets above the modern city center.\n\nThis route is not the 'sea and port' side of Kobe. It is the 'where foreign residents lived after they arrived' side, and it is reachable in roughly 15 minutes on foot from Sannomiya, which makes it one of the more time-efficient half-day options in the Kansai region." },
        { heading: "Sannomiya and Shin-Kobe are the two natural entries", body: "Kitano effectively has two gateway stations. Sannomiya (JR, Hankyu, Hanshin, Port Liner, municipal subway) is the southern entry and involves walking up the slope. Shin-Kobe (Sanyo Shinkansen, municipal subway) is the northern entry and involves walking down. Either one is about 15 minutes to the heart of the district around Kitano-cho Square.\n\nThe practical move is to enter from one and leave from the other. That avoids walking the same slope twice and lets you feel Kitano from both the uphill and downhill sides. The City Loop bus also stops at Kitano Ijinkan, which makes a useful one-way option if you want to conserve energy for a later Kobe segment." },
        { heading: "The Weathercock House and the Moegi House are the district's core", body: "The centerpiece of Kitano is the Weathercock House (Kazamidori no Yakata), also known as the former Thomas Residence. It was built in 1909 for the German trader G. Thomas, designed by the German architect Georg de Lalande, and features a brick exterior, a half-basement granite level, and a spire topped by a weathervane. It is designated a National Important Cultural Property and faces directly onto Kitano-cho Square, which makes it the obvious visual anchor for the district.\n\nThe Moegi House (the 'light yellowish-green' residence) stands immediately next to it in a very different wooden Western style. Viewing the two buildings side by side clarifies that the Ijinkan were not a single unified architectural program; they were individual residences built to different tastes and scattered along the slope. Many interiors charge admission, but even just walking the exteriors and the streetscape conveys most of the district's story." },
        { heading: "Read the slope and side lanes as the actual streetscape", body: "Kitano is more interesting as a continuous slope than as a sequence of individual residences. Around Kitano-cho Square, Kitano-dori and Yamamoto-dori run roughly along the contours, and smaller stepped lanes branch off them. The view from one corner to the next keeps changing because of the grade. The highest-value approach is to give as much time to the walk between buildings as to the buildings themselves.\n\nFrom higher points along the slope, occasional views open up over central Kobe toward the port. Kitano itself does not overlook the water directly, but the elevation of the district relative to the city visualizes the port-town geography of Kobe in a way that reading a map does not. Climbing and descending the slope is the lesson." },
        { heading: "Coming down links naturally back to Sannomiya / Motomachi", body: "A Kitano half day closes almost automatically by descending back into Sannomiya or Motomachi. Sannomiya is the city's main multi-line hub, so dinner, shopping, or onward travel all attach easily. Continuing on foot toward Meriken Park and the Kobe Port area is also within a reasonable range if the day is cooperating.\n\nThat said, ending the day at Kitano is just as legitimate. Not forcing a second attraction keeps the Ijinkan district as the central memory rather than diluting it with a second, different district. For travelers doing Kobe as a short first visit, this often produces a cleaner impression of the city." },
        { heading: "Practical notes for foreign travelers", body: "Save Sannomiya or Shin-Kobe Station, Kitano-cho Square, the Weathercock House, the Moegi House, and your return station. That is enough. The district is on a slope but compact in plan, so detailed mapping matters less than knowing the top and bottom landmarks. The City Loop bus passes Kitano Ijinkan and can cover one direction if you want to save legs.\n\nA light Japan eSIM path supports exactly this kind of half day. Deciding whether to walk to the next house, grab the City Loop for one leg, return via Sannomiya, or descend to Shin-Kobe instead is what turns Kitano from a fixed climb into a selectable walk. The route remains tourism-first, but low-friction connectivity keeps the options open." },
      ],
      [
        { q: "Do I need to enter every Ijinkan?", a: "No. Most interior visits are paid, and walking the exteriors plus the slope streets already conveys the district's architectural story." },
        { q: "Sannomiya or Shin-Kobe as the entry?", a: "Either works. Entering from one and leaving via the other is the cleanest structure because it avoids walking the same slope twice." },
        { q: "Should I use the City Loop bus?", a: "It is worth using for one direction if energy or time is tight. Doing the full route by bus removes the slope experience that makes Kitano feel like Kitano." },
        { q: "Can I combine Kitano with the Kobe port area?", a: "Yes, but the two districts have very different characters. Giving each a half day usually produces a sharper impression than compressing them both into one morning." },
        { q: "Does it work in light rain?", a: "Yes. The combination of European-style exteriors and sloped streets carries a particular atmosphere in rain, and interior visits become more attractive as a fallback." },
      ],
      "kansai",
    ),
  },
};
