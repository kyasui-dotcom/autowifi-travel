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

function guideCta(locale: GuideLocale) {
  return locale === "ja"
    ? {
        ctaTitle: "京都・大阪の現地判断を軽くしておく",
        ctaButton: "日本のeSIMを見る",
        breadcrumbGuide: "ガイド",
        breadcrumbHome: "ホーム",
      }
    : {
        ctaTitle: "Keep Kyoto and Osaka route changes easy on the ground",
        ctaButton: "View Japan eSIM plans",
        breadcrumbGuide: "Guides",
        breadcrumbHome: "Home",
      };
}

function jpContent(
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
    xSectionTitle: "Xで現地の空気を確かめる",
    xSectionDescription:
      "埋め込みは各記事の場所やテーマに寄せて選び直し、京都・大阪全体の汎用ポストを機械的に使い回さないようにしています。",
    xEmbeds,
    sections,
    faq,
    ...guideCta("ja"),
  };
}

function enContent(
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
    xSectionTitle: "Recent X posts that actually fit this route",
    xSectionDescription:
      "These embeds are selected per guide so the references stay tied to the district, operator, or institution the article is actually about.",
    xEmbeds,
    sections,
    faq,
    ...guideCta("en"),
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
};
