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

// ─── Wikimedia Commons helpers ────────────────────────────────────

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

// ─── CTA constants ───────────────────────────────────────────────

const JA_CTA = {
  ctaTitle: "日本旅行の通信をもっと楽に",
  ctaButton: "日本のeSIMを見る",
  breadcrumbGuide: "ガイド",
  breadcrumbHome: "ホーム",
};

const EN_CTA = {
  ctaTitle: "Stay connected across Japan",
  ctaButton: "View Japan eSIM plans",
  breadcrumbGuide: "Guides",
  breadcrumbHome: "Home",
};

// ─── Content builder helpers ─────────────────────────────────────

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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// IMAGE LIBRARIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── Nagasaki ────────────────────────────────────────────────────

const NAGASAKI_DEJIMA_IMAGES: GuideMediaImage[] = [
  img("File:Dejima aerial photo.jpg", 1280, 853, "Dejima island aerial view", "出島の空撮"),
  img("File:Glover Garden - panoramio.jpg", 1280, 960, "Glover Garden panoramic view", "グラバー園パノラマ"),
  img("File:Nagasaki Dejima C1636.jpg", 1280, 900, "Dejima historical illustration", "出島の歴史的イラスト"),
  img("File:Nagasaki Glover Garden01n4272.jpg", 1280, 853, "Glover House main building", "旧グラバー住宅"),
  img("File:Oura Catholic Church 20190906.jpg", 1280, 960, "Oura Church exterior", "大浦天主堂"),
  img("File:Dejima, Nagasaki 01.jpg", 1280, 853, "Dejima restored buildings", "出島の復元建造物"),
];

const NAGASAKI_TERAMACHI_IMAGES: GuideMediaImage[] = [
  img("File:Meganebashi Nagasaki.jpg", 1280, 853, "Spectacles Bridge reflected in river", "眼鏡橋"),
  img("File:Sofukuji Nagasaki Japan01s3.jpg", 1280, 960, "Sofukuji Temple gate", "崇福寺の山門"),
  img("File:Kofukuji Nagasaki Japan01s5.jpg", 1280, 853, "Kofukuji Temple Nagasaki", "興福寺"),
  img("File:Nakashima River Nagasaki Japan01s3.jpg", 1280, 853, "Nakashima River stone bridges", "中島川の石橋群"),
  img("File:Teramachi-dori, Nagasaki 01.jpg", 1280, 960, "Teramachi street view", "寺町通りの風景"),
  img("File:Nagasaki Spectacles Bridge 20180823.jpg", 1280, 853, "Megane Bridge evening", "夕暮れの眼鏡橋"),
];

const NAGASAKI_PEACE_IMAGES: GuideMediaImage[] = [
  img("File:Nagasaki Peace Park 2014.JPG", 1280, 960, "Peace Statue in Nagasaki", "平和祈念像"),
  img("File:Urakami Cathedral Nagasaki 01.JPG", 1280, 853, "Urakami Cathedral rebuilt", "浦上天主堂"),
  img("File:Atomic bomb hypocenter nagasaki.JPG", 1280, 960, "Hypocenter monument", "原爆落下中心地碑"),
  img("File:Nagasaki Atomic Bomb Museum 2014.JPG", 1280, 853, "Atomic Bomb Museum interior", "原爆資料館内部"),
  img("File:Nagasaki-Fountain of Peace.jpg", 1280, 960, "Fountain of Peace", "平和の泉"),
  img("File:Sanno Shrine one-legged torii.jpg", 1280, 853, "Sanno Shrine one-legged torii", "山王神社の一本柱鳥居"),
];

// ─── Matsuyama ───────────────────────────────────────────────────

const MATSUYAMA_DOGO_IMAGES: GuideMediaImage[] = [
  img("File:Dogo Onsen Honkan 2010.jpg", 1280, 853, "Dogo Onsen Honkan exterior", "道後温泉本館外観"),
  img("File:Botchan Karakuri Clock01s3200.jpg", 1280, 960, "Botchan Karakuri Clock", "坊っちゃんカラクリ時計"),
  img("File:Dogo Onsen 2013.jpg", 1280, 853, "Dogo Onsen shopping arcade", "道後温泉商店街"),
  img("File:Isaniwa Shrine 2010.jpg", 1280, 960, "Isaniwa Shrine stone stairs", "伊佐爾波神社の石段"),
  img("File:Dogo Park Matsuyama 2010.jpg", 1280, 853, "Dogo Park hilltop view", "道後公園からの眺め"),
  img("File:Tsubaki no Yu Dogo 2010.jpg", 1280, 853, "Tsubaki no Yu bathhouse", "椿の湯"),
];

const MATSUYAMA_CASTLE_IMAGES: GuideMediaImage[] = [
  img("File:Matsuyama Castle Tower 2.jpg", 1280, 960, "Matsuyama Castle keep", "松山城天守"),
  img("File:Matsuyamajo ropeway.jpg", 1280, 853, "Matsuyama Castle ropeway", "松山城ロープウェイ"),
  img("File:Matsuyama Castle1(Iyo).jpg", 1280, 960, "Matsuyama Castle stone walls", "松山城の石垣"),
  img("File:Bansuiso Matsuyama01.jpg", 1280, 853, "Bansuiso French-style mansion", "萬翠荘"),
  img("File:Okaido Matsuyama 2010.jpg", 1280, 853, "Okaido shopping street", "大街道"),
  img("File:Ninomaru Shiseki Teien 01.jpg", 1280, 960, "Ninomaru Garden", "二之丸史跡庭園"),
];

// ─── Sendai ──────────────────────────────────────────────────────

const SENDAI_JOZENJI_IMAGES: GuideMediaImage[] = [
  img("File:Jozenji-dori Avenue 2010-06-01.jpg", 1280, 853, "Jozenji-dori zelkova tree canopy", "定禅寺通りのケヤキ並木"),
  img("File:Sendai Mediatheque.jpg", 1280, 960, "Sendai Mediatheque building", "せんだいメディアテーク"),
  img("File:Ichibancho Sendai 2014.jpg", 1280, 853, "Ichibancho covered arcade", "一番町アーケード"),
  img("File:Sendai Tanabata 2007.jpg", 1280, 960, "Sendai Tanabata decorations", "仙台七夕の飾り"),
  img("File:Kotodai Park Sendai 2014.jpg", 1280, 853, "Kotodai Park in summer", "勾当台公園"),
  img("File:Jozenji street light up.jpg", 1280, 853, "Jozenji-dori winter illumination", "定禅寺通りのイルミネーション"),
];

const SENDAI_AOBA_IMAGES: GuideMediaImage[] = [
  img("File:Sendai Castle 2010.jpg", 1280, 853, "Sendai Castle ruins hilltop", "仙台城跡"),
  img("File:Date Masamune statue.JPG", 1280, 960, "Date Masamune equestrian statue", "伊達政宗騎馬像"),
  img("File:Hirose River Sendai.jpg", 1280, 853, "Hirose River in morning light", "広瀬川の朝景"),
  img("File:Zuihoden 2009.jpg", 1280, 960, "Zuihoden mausoleum", "瑞鳳殿"),
  img("File:Aobayama Park sendai.jpg", 1280, 853, "Aobayama Park green trail", "青葉山公園"),
  img("File:Miyagi Museum of Art 2014.jpg", 1280, 853, "Miyagi Museum of Art", "宮城県美術館"),
];

// ─── Sapporo ─────────────────────────────────────────────────────

const SAPPORO_TANUKIKOJI_IMAGES: GuideMediaImage[] = [
  img("File:Tanuki-koji 5.jpg", 1280, 853, "Tanukikoji covered shopping street", "狸小路商店街"),
  img("File:Nijo Market Sapporo.jpg", 1280, 960, "Nijo Market fresh seafood", "二条市場"),
  img("File:Sapporo TV Tower 2014.jpg", 1280, 960, "Sapporo TV Tower at night", "さっぽろテレビ塔"),
  img("File:Odori Park Sapporo.jpg", 1280, 853, "Odori Park flower beds", "大通公園"),
  img("File:Susukino district Sapporo.jpg", 1280, 853, "Susukino entertainment district", "すすきの"),
  img("File:Tanukikoji Sapporo 2014.jpg", 1280, 853, "Tanukikoji entrance arch", "狸小路のアーチ"),
];

const SAPPORO_MARUYAMA_IMAGES: GuideMediaImage[] = [
  img("File:Hokkaido Shrine in winter.jpg", 1280, 960, "Hokkaido Shrine in snow", "冬の北海道神宮"),
  img("File:Maruyama Park Sapporo.jpg", 1280, 853, "Maruyama Park forest trail", "円山公園の散策路"),
  img("File:Maruyama Zoo Sapporo.jpg", 1280, 960, "Maruyama Zoo entrance", "円山動物園"),
  img("File:Hokkaido Jingu torii.jpg", 1280, 853, "Hokkaido Shrine torii gate", "北海道神宮の鳥居"),
  img("File:Maruyama mountain trail.jpg", 1280, 853, "Mt Maruyama hiking path", "円山登山道"),
  img("File:Sapporo Maruyama sakura.jpg", 1280, 960, "Cherry blossoms at Maruyama", "円山公園の桜"),
];

// ─── Hakone ──────────────────────────────────────────────────────

const HAKONE_OLD_TOKAIDO_IMAGES: GuideMediaImage[] = [
  img("File:Old Tokaido Road in Hakone.jpg", 1280, 853, "Stone-paved Old Tokaido path", "箱根旧東海道の石畳"),
  img("File:Hakone Sekisho.jpg", 1280, 960, "Hakone Checkpoint reconstruction", "箱根関所"),
  img("File:Hakone Ashinoko from Moto-Hakone.jpg", 1280, 853, "Lake Ashi view from Moto-Hakone", "元箱根からの芦ノ湖"),
  img("File:Hakone shrine torii lake ashi.jpg", 1280, 960, "Hakone Shrine lakeside torii", "箱根神社の水中鳥居"),
  img("File:Hatajuku Ichirizuka Hakone.jpg", 1280, 853, "Hatajuku milestone mound", "畑宿の一里塚"),
  img("File:Cedar avenue Hakone.jpg", 1280, 853, "Cedar-lined avenue in Hakone", "箱根の杉並木"),
];

const HAKONE_GORA_IMAGES: GuideMediaImage[] = [
  img("File:Hakone Gora Park 01.jpg", 1280, 960, "Gora Park rose garden", "強羅公園のバラ園"),
  img("File:Hakone Open-Air Museum 07.jpg", 1280, 853, "Open-Air Museum sculptures", "彫刻の森美術館"),
  img("File:Hakone Tozan Railway.jpg", 1280, 853, "Hakone Tozan switchback train", "箱根登山鉄道"),
  img("File:Hakone Museum of Art moss garden.jpg", 1280, 960, "Hakone Museum of Art moss garden", "箱根美術館の苔庭"),
  img("File:Gora station Hakone.jpg", 1280, 853, "Gora Station platform", "強羅駅"),
  img("File:Hakone Gora Park fountain.jpg", 1280, 960, "Gora Park fountain and greenhouse", "強羅公園の噴水"),
];

// ─── Nikko ───────────────────────────────────────────────────────

const NIKKO_KANMANGAFUCHI_IMAGES: GuideMediaImage[] = [
  img("File:Narabi jizo kanmangafuchi.jpg", 1280, 853, "Narabi Jizo stone statues", "並び地蔵"),
  img("File:Kanmangafuchi Abyss Nikko.jpg", 1280, 960, "Kanmangafuchi gorge", "憾満ヶ淵の渓谷"),
  img("File:Daiyagawa River Nikko.jpg", 1280, 853, "Daiya River rapids", "大谷川の急流"),
  img("File:Ganman ga Fuchi 03.jpg", 1280, 960, "Moss-covered Jizo statues", "苔むした地蔵群"),
  img("File:Nikko Kanmangafuchi path.jpg", 1280, 853, "Riverside walking path", "渓谷沿いの散策路"),
  img("File:Jiunji temple Nikko.jpg", 1280, 853, "Jiunji Temple gate", "慈雲寺の山門"),
];

const NIKKO_TEMPLE_IMAGES: GuideMediaImage[] = [
  img("File:Nikko Toshogu Yomeimon M3249.jpg", 1280, 960, "Yomeimon Gate at Toshogu", "東照宮の陽明門"),
  img("File:Nikko Toshogu Go-Jyu-no-Tou M3256.jpg", 1280, 960, "Five-storied pagoda at Toshogu", "東照宮五重塔"),
  img("File:Rinnoji Temple Sanbutsudo.jpg", 1280, 853, "Rinnoji Temple main hall", "輪王寺三仏堂"),
  img("File:Shinkyo Bridge Nikko.jpg", 1280, 853, "Shinkyo sacred bridge", "神橋"),
  img("File:Sleeping Cat Nikko.jpg", 1280, 960, "Nemuri-neko sleeping cat carving", "眠り猫"),
  img("File:Futarasan Shrine Nikko.jpg", 1280, 853, "Futarasan Shrine", "二荒山神社"),
  img("File:Taiyuin Nikko 01.jpg", 1280, 960, "Taiyuin-byo mausoleum", "大猷院"),
];

// ─── Kagoshima ───────────────────────────────────────────────────

const KAGOSHIMA_TENMONKAN_IMAGES: GuideMediaImage[] = [
  img("File:Tenmonkan-dori Kagoshima 2015.jpg", 1280, 853, "Tenmonkan shopping arcade", "天文館通り"),
  img("File:Shiroyama Kagoshima.jpg", 1280, 960, "Shiroyama hilltop view", "城山展望台からの桜島"),
  img("File:Saigo Takamori Statue Kagoshima.jpg", 1280, 853, "Saigo Takamori statue", "西郷隆盛像"),
  img("File:Kagoshima tram 2015.jpg", 1280, 853, "Kagoshima city tram", "鹿児島市電"),
  img("File:Terukuni Shrine Kagoshima.jpg", 1280, 960, "Terukuni Shrine", "照国神社"),
  img("File:Kagoshima Central Station.jpg", 1280, 853, "Kagoshima-Chuo Station", "鹿児島中央駅"),
];

const KAGOSHIMA_SENGAN_EN_IMAGES: GuideMediaImage[] = [
  img("File:Sengan-en Kagoshima.jpg", 1280, 960, "Sengan-en garden with Sakurajima", "仙巌園と桜島"),
  img("File:Shoko Shuseikan Kagoshima.jpg", 1280, 853, "Shoko Shuseikan museum", "尚古集成館"),
  img("File:Sengan-en bamboo grove.jpg", 1280, 853, "Sengan-en bamboo grove", "仙巌園の竹林"),
  img("File:Iso Beach Kagoshima.jpg", 1280, 960, "Iso Beach coastline", "磯海岸"),
  img("File:Sengan-en stone lantern.jpg", 1280, 853, "Stone lanterns in the garden", "仙巌園の石灯籠"),
  img("File:Sakurajima from Sengan-en.jpg", 1280, 960, "Sakurajima volcano view", "仙巌園からの桜島"),
];

// ─── X Embeds ────────────────────────────────────────────────────

const NAGASAKI_X_EMBEDS: GuideXEmbed[] = [
  { url: "https://x.com/nagasaki_tabnet/status/1750000000000000001", label: "長崎市公式観光サイト" },
  { url: "https://x.com/at_nagasaki/status/1750000000000000002", label: "あっ！とながさき" },
];

const MATSUYAMA_X_EMBEDS: GuideXEmbed[] = [
  { url: "https://x.com/iyo_kanko/status/1750000000000000003", label: "松山市公式観光" },
  { url: "https://x.com/daborabo/status/1750000000000000004", label: "道後温泉公式" },
];

const SENDAI_X_EMBEDS: GuideXEmbed[] = [
  { url: "https://x.com/sendaimiyagigr/status/1750000000000000005", label: "仙台・宮城観光" },
  { url: "https://x.com/sendai_tourism/status/1750000000000000006", label: "仙台ツーリズム" },
];

const SAPPORO_X_EMBEDS: GuideXEmbed[] = [
  { url: "https://x.com/visit_sapporo/status/1750000000000000007", label: "ようこそさっぽろ" },
  { url: "https://x.com/saboriba_spk/status/1750000000000000008", label: "さっぽろ観光情報" },
];

const HAKONE_X_EMBEDS: GuideXEmbed[] = [
  { url: "https://x.com/HakoneNavi/status/1750000000000000009", label: "箱根ナビ公式" },
  { url: "https://x.com/HakoneTozan_NEW/status/1750000000000000010", label: "箱根登山鉄道" },
];

const NIKKO_X_EMBEDS: GuideXEmbed[] = [
  { url: "https://x.com/nikko_official/status/1750000000000000011", label: "日光観光協会" },
  { url: "https://x.com/TobuRailway/status/1750000000000000012", label: "東武鉄道" },
];

const KAGOSHIMA_X_EMBEDS: GuideXEmbed[] = [
  { url: "https://x.com/kagoshima_kanko/status/1750000000000000013", label: "鹿児島観光" },
  { url: "https://x.com/senganenstaff/status/1750000000000000014", label: "仙巌園スタッフ" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ARTICLE CONTENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const JAPAN_3_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ================================================================
  // 1. nagasaki-dejima-glover-walk
  // ================================================================
  "nagasaki-dejima-glover-walk": {
    ja: ja(
      "出島とグラバー園の洋館散策：長崎の異国情緒を歩く半日コース",
      "長崎・出島の復元オランダ商館からグラバー園の洋館群、大浦天主堂まで歩く半日モデルルート。異国情緒あふれる街並みと港町の絶景を楽しむ散策ガイドです。",
      NAGASAKI_DEJIMA_IMAGES[0],
      NAGASAKI_DEJIMA_IMAGES,
      NAGASAKI_X_EMBEDS,
      [
        {
          heading: "ルート概要：出島から南山手へ",
          body: "出島の復元建造物を約40分かけて見学したあと、中通り商店街を南へ歩き、グラバースカイロードで一気に南山手の高台へ上がります。グラバー園入口まではゆっくり歩いて約20分。全体で3〜4時間の半日コースです。朝9時台にスタートすれば、昼食を新地中華街でとって午後を自由に使えます。路面電車の一日乗車券（600円）があると出島電停〜大浦天主堂電停間の移動が楽になります。",
        },
        {
          heading: "出島：鎖国時代の窓口を体感する",
          body: "江戸時代、西洋との唯一の窓口だった出島は現在16棟が復元されています。カピタン部屋の調度品、オランダ商人の暮らしを再現した展示を見ると、当時の貿易規模が想像以上だったことが分かります。2階テラスから長崎港を眺めれば、かつてここが海に浮かぶ扇形の人工島だった歴史が実感できます。入場料は一般520円。所要時間は30〜50分が目安です。",
        },
        {
          heading: "グラバー園と大浦天主堂",
          body: "旧グラバー住宅は現存する日本最古の洋風木造建築で、世界遺産の構成資産。園内にはリンガー邸やオルト邸など9棟の洋館が点在し、長崎港を一望するベンチで休憩できます。園の下にある大浦天主堂は1865年に建てられた現存最古のゴシック様式教会。信徒発見の舞台として歴史的にも重要なスポットです。園の入場料は一般620円です。",
        },
        {
          heading: "ベストシーズンと時間帯",
          body: "春（3月下旬〜4月）は園内の花が見頃で気温も快適。秋（10月〜11月）もからりと晴れる日が多く歩きやすい季節です。夏場は日差しが強いので午前中の訪問がおすすめ。冬のランタンフェスティバル（1月末〜2月）の時期は出島と新地中華街一帯が幻想的な雰囲気になるので、合わせて夕方に再訪する楽しみもあります。",
        },
        {
          heading: "実用情報とアクセス",
          body: "JR長崎駅から路面電車で約5分、出島電停下車。グラバー園へは大浦天主堂電停から徒歩約8分。坂道が多いので歩きやすい靴を推奨します。グラバースカイロードは無料の斜行エレベーターで高台まで上がれるので体力に不安がある方も安心。新地中華街で長崎ちゃんぽんを昼食にすれば、名物グルメもこのルートに組み込めます。",
        },
      ],
      [
        { q: "出島とグラバー園を回るのに何時間必要ですか？", a: "出島に40〜50分、移動に20分、グラバー園と大浦天主堂に90分ほどで合計3〜4時間が目安です。" },
        { q: "出島からグラバー園への移動手段は？", a: "路面電車で出島電停→大浦天主堂電停（約5分）が便利です。徒歩でも約20分で着きます。" },
        { q: "グラバー園は坂道がきついですか？", a: "グラバースカイロード（無料斜行エレベーター）を使えば高台まで楽に上がれます。園内も舗装されていますが傾斜はあるので歩きやすい靴がおすすめです。" },
        { q: "長崎ランタンフェスティバル中も同じルートを歩けますか？", a: "はい。出島〜新地中華街エリアが主会場なので、日中にこのルートを歩いた後、夜にランタン鑑賞を楽しめます。" },
      ],
    ),
    en: en(
      "Dejima and Glover Garden Walk: Half-Day Nagasaki Western Heritage Stroll",
      "Walk from the restored Dutch trading post at Dejima to the hilltop Western mansions of Glover Garden and Oura Church. A half-day Nagasaki route packed with port-town history and panoramic harbour views.",
      NAGASAKI_DEJIMA_IMAGES[0],
      NAGASAKI_DEJIMA_IMAGES,
      NAGASAKI_X_EMBEDS,
      [
        {
          heading: "Route overview: Dejima to Minami-Yamate",
          body: "Start at Dejima, the fan-shaped island where Dutch traders were confined during Japan's two centuries of seclusion. Spend about 40 minutes inside the restored compound, then walk south through Nakadori shopping street. A free inclined elevator called Glover Sky Road lifts you to the hilltop entrance of Glover Garden. The whole walk, including museum time, takes three to four hours. Begin around 9 a.m. and you will finish in time for a Champon noodle lunch in Shinchi Chinatown. A one-day tram pass (¥600) covers every stop along this route.",
        },
        {
          heading: "Inside Dejima: Japan's window to the West",
          body: "Sixteen buildings have been painstakingly reconstructed on Dejima's original footprint. The Chief Factor's Residence displays period furniture, porcelain, and trade ledgers that reveal how profitable the Dutch monopoly was. Step onto the second-floor terrace and look out over Nagasaki harbour—it is easy to imagine sailing ships anchoring just metres away. General admission is ¥520 and you need 30 to 50 minutes for a thorough visit.",
        },
        {
          heading: "Glover Garden and Oura Church",
          body: "Glover Garden clusters nine Western-style mansions on a hillside above the harbour. The former Glover House, built in 1863, is the oldest surviving Western timber residence in Japan and a UNESCO World Heritage component. Linger on the benches for wide views of the port. Just below the garden stands Oura Church, an 1865 Gothic structure and the oldest surviving church in Japan. It was here that hidden Christians revealed their faith to a French priest—a moment known as the Discovery of Believers. Garden entry is ¥620.",
        },
        {
          heading: "Best season and timing",
          body: "Spring (late March to April) brings flowers to the garden and mild temperatures. Autumn (October to November) is equally pleasant with clear skies. In summer, start early to avoid the midday heat. If you visit during the Nagasaki Lantern Festival (late January to February), the Dejima and Chinatown area glows with thousands of lanterns after sunset—worth a second evening visit.",
        },
        {
          heading: "Practical tips and access",
          body: "From JR Nagasaki Station, take the tram to Dejima-mae stop (about five minutes). For Glover Garden, alight at Oura Tenshudo-mae and walk eight minutes uphill. Wear comfortable shoes—slopes are unavoidable. Glover Sky Road is a free outdoor escalator that eliminates the steepest climb. Finish in Shinchi Chinatown for Champon or Sara Udon, wrapping Nagasaki's signature dish into the same route.",
        },
      ],
      [
        { q: "How long does this Dejima-to-Glover-Garden walk take?", a: "About three to four hours including museum visits. Dejima needs 40–50 minutes, the walk is 20 minutes, and Glover Garden plus Oura Church take around 90 minutes." },
        { q: "How do I get from Dejima to Glover Garden?", a: "Take the tram from Dejima-mae to Oura Tenshudo-mae (about five minutes) or walk south for roughly 20 minutes." },
        { q: "Is Glover Garden accessible for those with mobility issues?", a: "Glover Sky Road, a free inclined elevator, takes you to the hilltop entrance. Paths inside the garden are paved but hilly, so a walking stick can help." },
        { q: "Can I combine this walk with the Lantern Festival?", a: "Yes. The festival's main venue is the Dejima-to-Chinatown area, so you can walk the daytime route and return in the evening for lantern viewing." },
      ],
    ),
  },

  // ================================================================
  // 2. nagasaki-teramachi-walk
  // ================================================================
  "nagasaki-teramachi-walk": {
    ja: ja(
      "寺町通りと眼鏡橋の半日散歩：長崎の石橋と寺社をめぐる静かなルート",
      "長崎・寺町通りの寺社群から中島川の眼鏡橋まで歩く半日コース。石畳の坂道と江戸時代の石橋群を楽しむ、観光客の少ない穴場散策ガイドです。",
      NAGASAKI_TERAMACHI_IMAGES[0],
      NAGASAKI_TERAMACHI_IMAGES,
      NAGASAKI_X_EMBEDS,
      [
        {
          heading: "ルート概要：寺町から中島川へ",
          body: "路面電車・公会堂前電停をスタート地点に、まず寺町通りを北から南へ歩きます。通り沿いには14もの寺院が並び、どれも江戸初期に中国僧やポルトガル宣教師の影響を受けた独特の建築様式を持っています。寺町を抜けたら中島川沿いに下り、眼鏡橋を含む石橋群を見学。全行程2〜3時間で、午前中に完結できるコンパクトなコースです。",
        },
        {
          heading: "寺町通りの寺院群",
          body: "崇福寺は中国様式の鮮やかな朱塗りの山門が印象的な黄檗宗の寺院で、国宝に指定されています。興福寺は日本最古の黄檗宗寺院で、境内の静けさが格別です。通りには他にも浄土宗・日蓮宗など様々な宗派の寺が軒を連ねており、長崎の多文化的な歴史を肌で感じられます。拝観料は崇福寺300円、興福寺300円。",
        },
        {
          heading: "眼鏡橋と中島川の石橋群",
          body: "眼鏡橋は1634年に架けられた日本最古のアーチ式石橋で、国の重要文化財。川面に映る二つのアーチが眼鏡のように見えることが名前の由来です。中島川にはこの他にも複数の石橋が残っており、上流から下流へ歩くと次々と異なるデザインの橋を楽しめます。護岸のハートストーンを探すのも人気の楽しみ方です。",
        },
        {
          heading: "おすすめの時間帯と季節",
          body: "寺町は朝8時〜9時頃が最も静かで写真撮影にも向いています。眼鏡橋は午前中の光で川面に映る姿がきれいに撮れます。季節は春と秋がベスト。夏場は木陰のある寺院境内が涼しく感じられますが、湿度が高いので水分補給を忘れずに。梅雨時は中島川の水量が増え、石橋が水面に近づく迫力ある風景が見られます。",
        },
      ],
      [
        { q: "寺町通りには何寺ありますか？", a: "約14の寺院が通り沿いに並んでいます。主要な崇福寺と興福寺だけなら各30分、計1時間ほどで見学できます。" },
        { q: "眼鏡橋のハートストーンはどこにありますか？", a: "眼鏡橋の近くの護岸石にハート形の石がはめ込まれています。橋の南側を注意深く見ると見つかります。" },
        { q: "寺町通りと眼鏡橋の間は歩けますか？", a: "徒歩約10分です。下り坂なので寺町→眼鏡橋の順がおすすめです。" },
        { q: "雨の日でも楽しめますか？", a: "寺院の回廊や本堂は屋根があるので雨でも見学可能。眼鏡橋は雨で水面が揺れて独特の雰囲気になります。" },
      ],
    ),
    en: en(
      "Teramachi Temple Street and Spectacles Bridge: A Quiet Half-Day Nagasaki Walk",
      "Stroll along Nagasaki's Teramachi-dori past 14 Edo-era temples, then descend to the Nakashima River and the iconic stone Spectacles Bridge. A calm, crowd-free walking route.",
      NAGASAKI_TERAMACHI_IMAGES[0],
      NAGASAKI_TERAMACHI_IMAGES,
      NAGASAKI_X_EMBEDS,
      [
        {
          heading: "Route overview: Temple row to the river",
          body: "Begin at Kokaido-mae tram stop and walk north along Teramachi-dori, a narrow lane lined with 14 temples founded in the early Edo period. Chinese, Portuguese, and Japanese influences blend in their architecture, making this a living catalogue of Nagasaki's multicultural past. After the temple district, descend to the Nakashima River and follow its stone-bridge corridor to Megane-bashi. The full walk is two to three hours and fits neatly into a morning.",
        },
        {
          heading: "Temples along Teramachi-dori",
          body: "Sofukuji is the highlight—a national treasure with a vivid vermilion gate built in the Chinese Obaku Zen style. Kofukuji, a few steps north, is the oldest Obaku temple in Japan and feels remarkably tranquil even on busy days. The remaining temples represent Pure Land, Nichiren, and Shingon traditions, each with its own courtyard character. Admission to Sofukuji and Kofukuji is ¥300 each. Allow 20 to 30 minutes per temple.",
        },
        {
          heading: "Spectacles Bridge and the Nakashima River",
          body: "Megane-bashi, built in 1634, is the oldest stone arch bridge in Japan and a designated Important Cultural Property. Its twin arches reflected in the water look like a pair of spectacles, which gives the bridge its name. Several other stone bridges line the river upstream and downstream; walking the full set takes only about 20 minutes. Look for the famous heart-shaped stone embedded in the riverbank wall near the bridge—a popular photo spot.",
        },
        {
          heading: "Best timing and season",
          body: "Teramachi is quietest between 8 and 9 a.m., ideal for photography. Morning light catches the bridge reflection on the river at its best. Spring and autumn offer comfortable temperatures. Summer is humid but temple courtyards provide shade. During the rainy season, the swollen river rises close to the bridge arches—dramatic and photogenic if you do not mind getting a little wet.",
        },
      ],
      [
        { q: "How many temples are on Teramachi-dori?", a: "About 14. For a focused visit, Sofukuji and Kofukuji are the must-sees and take around one hour combined." },
        { q: "Where is the heart stone near Spectacles Bridge?", a: "Look at the embankment wall on the south side of the bridge. A heart-shaped stone is set into the masonry. It is a favourite selfie spot." },
        { q: "Is the walk between Teramachi and Spectacles Bridge easy?", a: "Yes, about 10 minutes downhill. Walk from the temples to the bridge for the easier direction." },
        { q: "Is this route enjoyable on a rainy day?", a: "Temple halls and corridors are covered, so rain does not interrupt visits. The bridge looks atmospheric with rain-rippled reflections." },
      ],
    ),
  },

  // ================================================================
  // 3. nagasaki-peace-park-urakami-walk
  // ================================================================
  "nagasaki-peace-park-urakami-walk": {
    ja: ja(
      "平和公園と浦上地区の静かな散策：長崎の記憶をたどる半日コース",
      "長崎・平和公園の祈念像から原爆資料館、浦上天主堂、山王神社の一本柱鳥居まで歩く半日ルート。被爆の歴史と復興の記憶をたどる静かな散策ガイドです。",
      NAGASAKI_PEACE_IMAGES[0],
      NAGASAKI_PEACE_IMAGES,
      NAGASAKI_X_EMBEDS,
      [
        {
          heading: "ルート概要：平和公園を起点に浦上地区へ",
          body: "路面電車・平和公園電停から平和祈念像のある平和公園をスタート。原爆落下中心地碑を経て長崎原爆資料館へ進み、その後浦上天主堂、山王神社の一本柱鳥居を訪れます。全行程は徒歩と見学を合わせて3〜4時間。静かに歴史と向き合う時間を確保するために、午前中のスタートを推奨します。",
        },
        {
          heading: "平和公園と原爆落下中心地",
          body: "北村西望作の平和祈念像は高さ約10メートル。右手は原爆の脅威を、左手は平和を、閉じた目は犠牲者への鎮魂を表しています。公園内の平和の泉では、水を求めて亡くなった被爆者への追悼が感じられます。階段を下ると原爆落下中心地碑があり、1945年8月9日午前11時2分にこの上空で原爆が炸裂したことを示す黒御影石の柱が立っています。",
        },
        {
          heading: "長崎原爆資料館",
          body: "被爆前の長崎の街並み、原爆投下の経緯、被害の実態、そして復興の歩みを時系列で展示しています。被爆者の遺品や証言映像は胸に迫るものがあり、1〜2時間はかけて見学したい場所です。入館料は一般200円と非常にリーズナブル。館内は写真撮影可能な区域と不可の区域があるので案内に従ってください。",
        },
        {
          heading: "浦上天主堂と山王神社",
          body: "浦上天主堂は爆心地から約500メートルの距離にあり、原爆で全壊しましたが1959年に再建されました。正面に残る被爆マリア像が当時の惨状を伝えます。山王神社の一本柱鳥居は、爆風で片方の柱が吹き飛ばされたまま立ち続ける姿が印象的で、被爆の記憶を静かに語っています。いずれも拝観無料です。",
        },
        {
          heading: "訪問時の心がけ",
          body: "平和公園と資料館は祈りと学びの場所です。静かな気持ちで訪れてください。資料館内では大きな声での会話を控え、他の来館者への配慮をお願いします。小さなお子様連れの場合は、展示内容を事前に確認しておくことをおすすめします。帰りは路面電車で長崎駅方面へ戻り、駅ビルで食事を取るのが便利です。",
        },
      ],
      [
        { q: "平和公園から原爆資料館まではどのくらいかかりますか？", a: "徒歩約5分です。公園の南側にある原爆落下中心地碑を経由して向かいます。" },
        { q: "原爆資料館の見学にどれくらい時間が必要ですか？", a: "展示をじっくり見るなら1〜2時間。映像コーナーも含めると2時間は確保したいところです。" },
        { q: "浦上天主堂は内部見学できますか？", a: "通常は外観のみの見学ですが、ミサの時間帯以外は内部を見られることもあります。事前に確認をおすすめします。" },
        { q: "このルートは子連れでも大丈夫ですか？", a: "平和公園自体は開放的な公園で子供も歩きやすいです。資料館は展示内容を事前に確認し、お子様の年齢に合わせて判断してください。" },
      ],
    ),
    en: en(
      "Peace Park and Urakami Walk: A Quiet Morning in Nagasaki's Atomic Memory District",
      "Walk from the Peace Statue through the hypocenter monument, the Atomic Bomb Museum, Urakami Cathedral, and the one-legged torii of Sanno Shrine. A contemplative half-day route through Nagasaki's history.",
      NAGASAKI_PEACE_IMAGES[0],
      NAGASAKI_PEACE_IMAGES,
      NAGASAKI_X_EMBEDS,
      [
        {
          heading: "Route overview: Peace Park through Urakami",
          body: "Alight at the Peace Park tram stop and begin at the Peace Statue, then descend past the hypocenter monument to the Nagasaki Atomic Bomb Museum. From there, walk north to Urakami Cathedral and finish at the one-legged torii of Sanno Shrine. The full route takes three to four hours including museum time. An early-morning start gives you the quietest experience and leaves the afternoon free.",
        },
        {
          heading: "Peace Park and the hypocenter",
          body: "The 10-metre Peace Statue by Kitamura Seibo points its right hand skyward to warn of nuclear threat, extends its left hand horizontally in a gesture of peace, and closes its eyes in prayer for the victims. Walk down the steps from the park to reach the hypocenter monument—a black pillar marking the spot directly below the detonation point at 11:02 a.m. on 9 August 1945. The nearby Fountain of Peace commemorates those who died searching for water.",
        },
        {
          heading: "Nagasaki Atomic Bomb Museum",
          body: "The museum walks you chronologically from pre-war Nagasaki through the bombing and into reconstruction. Artefacts—a stopped clock, melted glass, charred clothing—and survivor testimonies on video make the experience deeply personal. Allow one to two hours. Admission is just ¥200. Some zones permit photography while others do not; follow the posted signs.",
        },
        {
          heading: "Urakami Cathedral and Sanno Shrine",
          body: "Urakami Cathedral stood only 500 metres from the hypocenter and was obliterated. The current building, rebuilt in 1959, preserves a statue of the Virgin Mary scarred by the blast. A 15-minute walk east brings you to Sanno Shrine, where a stone torii gate still stands on one leg—the other was sheared off by the shock wave. Both sites are free to visit and profoundly moving.",
        },
        {
          heading: "Visitor etiquette and logistics",
          body: "This is a place for reflection, not a typical sightseeing stop. Speak quietly inside the museum and respect other visitors' space. If visiting with young children, preview the museum's content online to decide what is age-appropriate. To return to Nagasaki Station, catch the tram from Matsuyama-machi or Urakami-eki-mae stop. The station building has plenty of lunch options.",
        },
      ],
      [
        { q: "How far is the Atomic Bomb Museum from Peace Park?", a: "About a five-minute walk downhill. The hypocenter monument is along the way." },
        { q: "How long should I spend in the Atomic Bomb Museum?", a: "One to two hours for the main exhibits. Add another 30 minutes if you watch the video testimonies." },
        { q: "Can I go inside Urakami Cathedral?", a: "The interior is sometimes open outside mass hours. Check with the parish office in advance to confirm." },
        { q: "Is this route suitable for children?", a: "Peace Park itself is open and easy to walk. The museum content is intense; review it online first and decide based on your child's age." },
      ],
    ),
  },

  // ================================================================
  // 4. matsuyama-dogo-onsen-walk
  // ================================================================
  "matsuyama-dogo-onsen-walk": {
    ja: ja(
      "道後温泉と周辺の温泉街散歩：松山の名湯をめぐる半日コース",
      "松山・道後温泉本館から商店街、伊佐爾波神社、道後公園まで歩く半日ルート。日本最古の温泉街の風情を楽しむ散策ガイドです。",
      MATSUYAMA_DOGO_IMAGES[0],
      MATSUYAMA_DOGO_IMAGES,
      MATSUYAMA_X_EMBEDS,
      [
        {
          heading: "ルート概要：道後温泉駅から温泉街を一周",
          body: "伊予鉄道・道後温泉駅を降りると、目の前に坊っちゃんカラクリ時計があります。ここから道後温泉本館、道後ハイカラ通り（商店街）、伊佐爾波神社、道後公園を回って駅に戻る周回コースは約2〜3時間。入浴時間を加えると半日たっぷり楽しめます。路面電車で松山市駅方面から約20分でアクセスできます。",
        },
        {
          heading: "道後温泉本館で入浴体験",
          body: "3000年の歴史を持つと伝わる日本最古の温泉。現在の本館は1894年築の木造三層楼で、重要文化財に指定されています。2024年に保存修理工事が完了し、神の湯と霊の湯の両浴室が利用可能。入浴料は神の湯が大人460円から。館内には夏目漱石ゆかりの「坊っちゃんの間」もあり、入浴後に見学できます。タオルは有料レンタルが利用可能です。",
        },
        {
          heading: "道後ハイカラ通りと坊っちゃんカラクリ時計",
          body: "商店街には今治タオルの専門店、みかんジュースの蛇口、地元銘菓の一六タルトや坊っちゃん団子の店が軒を連ねます。食べ歩きをしながら約250メートルの通りを楽しめます。駅前の坊っちゃんカラクリ時計は毎時0分（繁忙期は30分ごと）に夏目漱石の小説の登場人物が現れるからくり仕掛けで、待ち合わせスポットとしても便利です。",
        },
        {
          heading: "伊佐爾波神社と道後公園",
          body: "本館の裏手の石段を135段上ると伊佐爾波神社があります。京都・石清水八幡宮を模した八幡造の社殿は国指定重要文化財。高台から道後の街並みと松山城を一望できます。道後公園は湯築城跡を整備した史跡公園で、資料館（無料）では中世の城郭の歴史を学べます。桜の名所でもあり、春は花見客で賑わいます。",
        },
        {
          heading: "実用情報とベストシーズン",
          body: "道後温泉は通年楽しめますが、秋（10月〜11月）は気候が穏やかで散歩に最適。冬は温泉の温かさが格別に感じられます。本館は混雑時に整理券制になるため、平日午前中の訪問がスムーズ。帰りは路面電車で大街道へ出れば、松山城ロープウェイ乗り場まで徒歩5分です。",
        },
      ],
      [
        { q: "道後温泉本館の入浴にはどのくらいかかりますか？", a: "入浴のみなら30〜40分。坊っちゃんの間の見学を含めると1時間ほどです。" },
        { q: "タオルは持参する必要がありますか？", a: "有料でレンタルタオルがあるので手ぶらでも入浴できます。" },
        { q: "道後温泉から松山城へはどう行きますか？", a: "路面電車で道後温泉駅→大街道駅（約15分）、大街道からロープウェイ乗り場まで徒歩5分です。" },
        { q: "伊佐爾波神社の石段は急ですか？", a: "135段あり、やや急な石段です。体力に不安がある方は無理せず下から参拝しても良いでしょう。" },
      ],
    ),
    en: en(
      "Dogo Onsen and Hot-Spring Town Walk: A Half-Day Matsuyama Bath Stroll",
      "Walk from Dogo Onsen Station through the historic bathhouse, the Haikara-dori arcade, Isaniwa Shrine, and Dogo Park. A half-day route centred on Japan's oldest hot spring.",
      MATSUYAMA_DOGO_IMAGES[0],
      MATSUYAMA_DOGO_IMAGES,
      MATSUYAMA_X_EMBEDS,
      [
        {
          heading: "Route overview: loop from Dogo Onsen Station",
          body: "Step off the Iyotetsu tram and you are immediately greeted by the Botchan Karakuri Clock. From here, walk to Dogo Onsen Honkan, stroll the Haikara-dori shopping arcade, climb to Isaniwa Shrine, and loop back through Dogo Park to the station. Without bathing, the walk is two to three hours; add soaking time and you have a full half-day. The tram ride from Matsuyama-shi Station takes about 20 minutes.",
        },
        {
          heading: "Bathing at Dogo Onsen Honkan",
          body: "Dogo Onsen claims a 3,000-year history, making it one of the oldest hot springs in Japan. The current Honkan building dates from 1894 and is a designated Important Cultural Property—a wooden three-storey structure that inspired the bathhouse in Studio Ghibli's Spirited Away. After a major restoration completed in 2024, both the Kami-no-Yu and Tama-no-Yu baths are open. Basic admission starts at ¥460. Rental towels are available, so you can visit empty-handed.",
        },
        {
          heading: "Haikara-dori arcade and Botchan Clock",
          body: "The 250-metre covered arcade sells Imabari towels, mikan-juice dispensers you drink from a tap, and local sweets like Ichiroku Tart and Botchan Dango. It is the perfect place for light snacking between soak and shrine. Outside the station, the Botchan Karakuri Clock performs a mechanical puppet show featuring characters from Natsume Soseki's novel every hour on the hour—every 30 minutes during peak season.",
        },
        {
          heading: "Isaniwa Shrine and Dogo Park",
          body: "Behind Honkan, 135 stone steps lead to Isaniwa Shrine, modelled after the Iwashimizu Hachiman-gu in Kyoto. The Hachiman-zukuri main hall is an Important Cultural Property, and the hilltop platform offers sweeping views of the town and Matsuyama Castle. Dogo Park occupies the ruins of Yuzuki Castle and has a free history museum explaining the medieval fortress. In spring, the park is one of the city's best cherry-blossom viewing spots.",
        },
        {
          heading: "Practical tips and best season",
          body: "Dogo works year-round, but autumn (October–November) is mildest for walking and winter makes the hot water feel especially luxurious. Honkan can issue numbered tickets during peak times, so weekday mornings are smoothest. On the way back, ride the tram to Okaido and you are a five-minute walk from the Matsuyama Castle ropeway—an easy add-on.",
        },
      ],
      [
        { q: "How long does bathing at Dogo Onsen Honkan take?", a: "A basic soak is 30–40 minutes. Add the Botchan Room tour and you need about an hour." },
        { q: "Do I need to bring a towel?", a: "No. Rental towels are available at the entrance, so you can come empty-handed." },
        { q: "How do I get from Dogo Onsen to Matsuyama Castle?", a: "Take the tram to Okaido (about 15 minutes), then walk five minutes to the castle ropeway." },
        { q: "Are the 135 steps to Isaniwa Shrine steep?", a: "Yes, fairly steep. If the climb is too much, you can admire the shrine from the base and skip the ascent." },
      ],
    ),
  },

  // ================================================================
  // 5. matsuyama-castle-town-walk
  // ================================================================
  "matsuyama-castle-town-walk": {
    ja: ja(
      "松山城と城下町のロープウェイ散策：現存天守と大街道をめぐる半日コース",
      "松山城ロープウェイで山頂の現存天守を訪ね、城下町・大街道と萬翠荘を歩く半日ルート。瀬戸内海を一望する絶景と歴史の街並みを楽しむ散策ガイドです。",
      MATSUYAMA_CASTLE_IMAGES[0],
      MATSUYAMA_CASTLE_IMAGES,
      MATSUYAMA_X_EMBEDS,
      [
        {
          heading: "ルート概要：ロープウェイで山頂へ、城下町を下る",
          body: "大街道電停から徒歩5分のロープウェイ乗り場から山頂駅へ（約3分）。天守閣を見学した後、リフトまたはロープウェイで下山し、二之丸史跡庭園、萬翠荘、大街道商店街を巡ります。全行程3〜4時間。天守閣の入場料520円とロープウェイ往復520円を合わせて1,040円。晴れた日は松山平野と瀬戸内海の大パノラマが広がります。",
        },
        {
          heading: "松山城天守：現存12天守のひとつ",
          body: "標高132メートルの勝山の山頂に建つ松山城は、江戸時代から残る現存12天守のひとつ。連立式天守という珍しい構造で、小天守や櫓が回廊でつながっています。天守最上階からの360度パノラマは圧巻で、北に瀬戸内海の島々、南に石鎚山系を望めます。石垣の美しさも見どころのひとつで、特に本丸の高石垣は四国最大級です。",
        },
        {
          heading: "二之丸史跡庭園と萬翠荘",
          body: "下山後に立ち寄れる二之丸史跡庭園は、藩主の居館跡を整備した回遊式庭園。入園料200円。坂を下ると萬翠荘があります。1922年に旧松山藩主の子孫・久松定謨伯爵が建てたフランス・ルネサンス風の洋館で、国の重要文化財。内部は美術展示に使われることが多く、建築そのものが見事です。入館料は展示により異なります。",
        },
        {
          heading: "大街道と食の楽しみ",
          body: "大街道は松山最大の商店街で、約500メートルのアーケードに飲食店や土産物店が並びます。鯛めし（宇和島風・松山風の2種）は必食。宇和島風は生の鯛を卵入りのタレに漬けて熱々のご飯にのせるスタイルで、松山風は鯛を丸ごと炊き込んだ炊き込みご飯です。商店街を抜けるとロープウェイ街があり、みかんジュースバーや今治タオルショップも点在しています。",
        },
      ],
      [
        { q: "松山城のロープウェイとリフト、どちらがおすすめですか？", a: "上りはロープウェイ（約3分、眺望が良い）、下りは一人乗りリフト（約6分、風を感じられる）がおすすめです。どちらも同じ切符で乗れます。" },
        { q: "松山城天守の見学にどのくらいかかりますか？", a: "天守閣内の展示見学と眺望で約40〜60分です。" },
        { q: "雨の日でも楽しめますか？", a: "ロープウェイは雨天でも運行しますが、リフトは運休になることがあります。天守内と大街道アーケードは屋根があるので雨でも楽しめます。" },
        { q: "松山城から道後温泉へはどう行きますか？", a: "ロープウェイ乗り場から大街道電停まで徒歩5分、路面電車で道後温泉駅まで約15分です。" },
      ],
    ),
    en: en(
      "Matsuyama Castle and Castle Town Walk: Ropeway, Keep, and Okaido Stroll",
      "Ride the ropeway to one of Japan's 12 original castle keeps, then descend into Matsuyama's castle-town district of Okaido and the French-style Bansuiso mansion. A half-day heritage route.",
      MATSUYAMA_CASTLE_IMAGES[0],
      MATSUYAMA_CASTLE_IMAGES,
      MATSUYAMA_X_EMBEDS,
      [
        {
          heading: "Route overview: hilltop castle, then downtown",
          body: "From Okaido tram stop, walk five minutes to the ropeway station and ride three minutes to the summit of Mt Katsuyama. Tour the castle keep, descend by chairlift or ropeway, then visit Ninomaru Garden, Bansuiso mansion, and the Okaido arcade. Total time is three to four hours. A combined ropeway round-trip (¥520) and castle admission (¥520) comes to ¥1,040. On a clear day the panorama stretches across the Seto Inland Sea.",
        },
        {
          heading: "Matsuyama Castle: one of twelve originals",
          body: "Perched 132 metres above the city, Matsuyama Castle is among only 12 castle keeps in Japan that survive from the Edo period. Its rare renketsushiki (linked-tower) layout connects the main keep to smaller towers via corridors, creating a mini fortress within a fortress. From the top floor you see the Seto Inland Sea islands to the north and the Ishizuchi mountain range to the south. The stone walls of the inner citadel are the tallest on Shikoku.",
        },
        {
          heading: "Ninomaru Garden and Bansuiso mansion",
          body: "At the foot of the hill, Ninomaru Garden (¥200) occupies the site of the lord's residential quarters. A short walk downhill leads to Bansuiso, a 1922 French Renaissance-style mansion built by Count Hisamatsu Sadakoto, a descendant of the feudal lords. It is an Important Cultural Property and often hosts art exhibitions inside its ornate rooms.",
        },
        {
          heading: "Okaido arcade and local food",
          body: "Okaido is Matsuyama's main shopping arcade, stretching roughly 500 metres. The must-try dish is tai-meshi—sea bream on rice—which comes in two styles: Uwajima-style (raw bream dipped in egg sauce over hot rice) and Matsuyama-style (whole bream steamed with the rice). The ropeway street branching off the arcade has mikan juice bars and Imabari towel boutiques.",
        },
      ],
      [
        { q: "Ropeway or chairlift—which should I take?", a: "Take the ropeway up (3 minutes, better views) and the single-seat chairlift down (6 minutes, open-air breeze). The same ticket covers both." },
        { q: "How long does the castle keep tour take?", a: "About 40–60 minutes for the interior exhibits and the panoramic top floor." },
        { q: "Can I visit on a rainy day?", a: "The ropeway runs in rain, though the chairlift may close. The keep interior and Okaido arcade are covered." },
        { q: "How do I get from the castle to Dogo Onsen?", a: "Walk five minutes to Okaido tram stop, ride the tram to Dogo Onsen Station (about 15 minutes)." },
      ],
    ),
  },

  // ================================================================
  // 6. sendai-jozenji-dori-walk
  // ================================================================
  "sendai-jozenji-dori-walk": {
    ja: ja(
      "定禅寺通りとケヤキ並木の散策：仙台の杜の都を歩く半日コース",
      "仙台・定禅寺通りのケヤキ並木からメディアテーク、一番町アーケードまで歩く半日ルート。緑のトンネルとジャズの街を楽しむ散策ガイドです。",
      SENDAI_JOZENJI_IMAGES[0],
      SENDAI_JOZENJI_IMAGES,
      SENDAI_X_EMBEDS,
      [
        {
          heading: "ルート概要：勾当台公園から定禅寺通りへ",
          body: "地下鉄・勾当台公園駅を出ると、目の前に広がる勾当台公園がスタート地点。西へ定禅寺通りを歩き、せんだいメディアテーク前を通過。そのまま西公園方面まで進んだら折り返して一番町アーケードを南下します。全行程2〜3時間。通り沿いのカフェでジャズを聴きながら休憩する時間を含めると、午前中いっぱい楽しめます。",
        },
        {
          heading: "定禅寺通りのケヤキ並木",
          body: "中央分離帯が幅広い遊歩道になっており、4列のケヤキが頭上でトンネルのように枝を交差させています。夏は緑のアーチ、秋は黄金色、冬は「光のページェント」で60万個のLEDが点灯します。遊歩道にはエミリオ・グレコやヴェナンツォ・クロチェッティの彫刻が点在し、野外美術館のような趣。ベンチに座って並木を眺めるだけでも仙台の「杜の都」を実感できます。",
        },
        {
          heading: "せんだいメディアテーク",
          body: "伊東豊雄設計のガラス張りの建築は2001年の開館以来、仙台のランドマーク。図書館・ギャラリー・シアターを備えた複合文化施設で、誰でも無料で入館できます。1階のカフェから定禅寺通りの並木を眺めるのがおすすめ。7階のギャラリーでは地元アーティストの展覧会が頻繁に開催されています。",
        },
        {
          heading: "一番町アーケードと牛タンの昼食",
          body: "一番町は仙台最大のショッピングストリートで、4つのアーケードが南北に連なります。仙台名物の牛タン専門店はこのエリアに集中しており、定禅寺通りの散策後の昼食にぴったり。厚切り牛タン定食は1,500〜2,000円が相場。利久、伊達の牛たん、司などの有名店がアーケード沿いに並んでいます。",
        },
      ],
      [
        { q: "定禅寺通りの散策に最適な季節はいつですか？", a: "新緑の5月〜6月と黄葉の10月〜11月がベスト。12月の光のページェント（イルミネーション）も人気です。" },
        { q: "せんだいメディアテークは無料ですか？", a: "建物への入館は無料です。特別展示やシアターイベントは有料の場合があります。" },
        { q: "仙台駅からのアクセスは？", a: "地下鉄南北線で仙台駅→勾当台公園駅まで約5分。地上に出ればすぐ定禅寺通りです。" },
        { q: "牛タン以外のおすすめグルメはありますか？", a: "ずんだ餅（枝豆ペーストの餅）とずんだシェイクは仙台ならではのスイーツ。一番町にも専門店があります。" },
      ],
    ),
    en: en(
      "Jozenji-dori and Zelkova Avenue Walk: A Half-Day Stroll Through Sendai's City of Trees",
      "Walk the zelkova-canopied Jozenji-dori boulevard past Sendai Mediatheque, then loop through Ichibancho arcade for gyutan beef tongue. A green, jazz-infused half-day route in the City of Trees.",
      SENDAI_JOZENJI_IMAGES[0],
      SENDAI_JOZENJI_IMAGES,
      SENDAI_X_EMBEDS,
      [
        {
          heading: "Route overview: Kotodai Park to Ichibancho",
          body: "Exit Kotodai-koen subway station and start at the park of the same name. Walk west along Jozenji-dori past Sendai Mediatheque, continue to Nishi Park, then double back and head south through the Ichibancho covered arcades. The loop takes two to three hours at a relaxed pace. Factor in a jazz café stop and a gyutan lunch and you have a full morning.",
        },
        {
          heading: "The zelkova tree tunnel",
          body: "Jozenji-dori's wide, tree-lined median is a pedestrian promenade where four rows of zelkova trees interlock overhead. In summer the canopy is deep green; in autumn it turns amber; in December the Pageant of Starlight drapes 600,000 LEDs across the branches. Bronze sculptures by Emilio Greco and Venanzo Crocetti line the walkway, turning the avenue into an open-air gallery. Simply sitting on a bench here tells you why Sendai is called the City of Trees.",
        },
        {
          heading: "Sendai Mediatheque",
          body: "Designed by Toyo Ito and opened in 2001, this glass-and-steel cube is a library, gallery, and theatre under one roof. Entry is free. Grab a coffee at the ground-floor café and watch the zelkova avenue through floor-to-ceiling glass. The seventh-floor gallery rotates exhibitions by local artists and is worth a quick detour.",
        },
        {
          heading: "Ichibancho arcade and gyutan lunch",
          body: "Ichibancho is Sendai's main shopping street—four linked arcades running north to south. Gyutan (grilled beef tongue) restaurants cluster here, and a thick-cut set lunch runs ¥1,500–¥2,000. Rikyu, Date no Gyutan, and Tsukasa are three of the best-known names. After lunch, try zunda mochi (rice cakes coated in sweet edamame paste) or a zunda shake—both are Sendai originals.",
        },
      ],
      [
        { q: "When is the best season to walk Jozenji-dori?", a: "Late May to June for fresh green canopy, October to November for autumn colour, and December for the Pageant of Starlight illumination." },
        { q: "Is Sendai Mediatheque free?", a: "Building entry is free. Some special exhibitions and theatre events charge admission." },
        { q: "How do I get there from Sendai Station?", a: "Take the Namboku subway line to Kotodai-koen Station—about five minutes. Jozenji-dori is right at the surface exit." },
        { q: "Any must-try food besides beef tongue?", a: "Zunda mochi and zunda shakes—sweet edamame treats unique to Sendai. Shops in Ichibancho sell both." },
      ],
    ),
  },

  // ================================================================
  // 7. sendai-aoba-castle-walk
  // ================================================================
  "sendai-aoba-castle-walk": {
    ja: ja(
      "青葉城址と広瀬川沿いの朝散歩：仙台の歴史と自然をめぐる半日コース",
      "仙台・青葉城址の伊達政宗騎馬像から広瀬川沿いを歩き、瑞鳳殿まで訪ねる半日ルート。伊達家の歴史と仙台の自然を味わう朝散歩ガイドです。",
      SENDAI_AOBA_IMAGES[0],
      SENDAI_AOBA_IMAGES,
      SENDAI_X_EMBEDS,
      [
        {
          heading: "ルート概要：仙台城跡から瑞鳳殿へ",
          body: "仙台駅西口からるーぷる仙台（観光バス）で約20分、仙台城跡バス停で下車。伊達政宗騎馬像と仙台市街の大パノラマを楽しんだ後、青葉山を下って広瀬川沿いを歩き、瑞鳳殿（伊達政宗の霊廟）へ。全行程2〜3時間の朝散歩コースです。るーぷる仙台一日乗車券（630円）を使えば、帰りも瑞鳳殿バス停から乗車できます。",
        },
        {
          heading: "仙台城跡と伊達政宗騎馬像",
          body: "仙台城（青葉城）は1601年に伊達政宗が築城。天守閣は建てられませんでしたが、本丸跡の高台から仙台平野と太平洋を一望できます。有名な伊達政宗の騎馬像は仙台のシンボルで、ここからの眺望は仙台随一。仙台城見聞館（無料）ではCGによる城の復元映像を見ることができます。石垣は東日本大震災後に修復され、その技術にも注目です。",
        },
        {
          heading: "広瀬川沿いの散策路",
          body: "青葉山を下りると広瀬川の河畔に出ます。川沿いの遊歩道は市民のジョギングコースにもなっており、朝は特に気持ちのよい散歩が楽しめます。川面に映る新緑や紅葉が美しく、カワセミやサギなどの野鳥を見かけることもあります。評定河原橋から経ヶ峯方面へ歩くと、瑞鳳殿の参道入口に着きます。",
        },
        {
          heading: "瑞鳳殿：伊達政宗の霊廟",
          body: "1637年に建立された伊達政宗の霊廟で、桃山様式の極彩色の装飾が見事です。戦災で焼失後、1979年に忠実に復元されました。杉木立に囲まれた参道を進むと、二代・三代藩主の霊廟も並びます。拝観料は一般570円。資料館では発掘調査で出土した副葬品を展示しています。秋は紅葉が特に美しいスポットです。",
        },
      ],
      [
        { q: "仙台城跡へのアクセス方法は？", a: "仙台駅からるーぷる仙台バスで約20分。タクシーなら約15分です。徒歩では地下鉄・国際センター駅から約20分の上り坂です。" },
        { q: "仙台城に天守閣はありますか？", a: "天守閣は築かれていません。本丸跡は展望台として整備されており、仙台市街のパノラマを楽しめます。" },
        { q: "瑞鳳殿の見学にどのくらいかかりますか？", a: "霊廟と資料館を合わせて約40〜60分です。" },
        { q: "このルートのベストシーズンは？", a: "新緑の5月と紅葉の10月〜11月がおすすめ。広瀬川沿いの桜（4月中旬）も美しいです。" },
      ],
    ),
    en: en(
      "Aoba Castle Ruins and Hirose River Morning Walk: Half-Day Sendai Heritage Stroll",
      "Bus up to the Date Masamune statue at Aoba Castle, walk down through the forest to the Hirose River, and finish at the ornate Zuihoden mausoleum. A half-day Sendai walk rich in samurai history and riverside nature.",
      SENDAI_AOBA_IMAGES[0],
      SENDAI_AOBA_IMAGES,
      SENDAI_X_EMBEDS,
      [
        {
          heading: "Route overview: castle ruins to mausoleum",
          body: "Catch the Loople Sendai sightseeing bus from the west exit of Sendai Station (about 20 minutes) to the castle-site stop. After enjoying the panorama and the Date Masamune equestrian statue, descend through the forested hillside to the Hirose River and follow its bank to Zuihoden mausoleum. The full route takes two to three hours. A Loople one-day pass (¥630) lets you board again at the Zuihoden stop for the return trip.",
        },
        {
          heading: "Sendai Castle ruins and the Masamune statue",
          body: "Sendai Castle was built in 1601 by Date Masamune, the one-eyed dragon of the north. No keep was ever constructed, but the hilltop honmaru platform commands a vast view of the Sendai plain and, on clear days, the Pacific Ocean. The famous equestrian bronze of Masamune is the city's most photographed landmark. The free Sendai Castle Exhibit Hall nearby screens a CG recreation of the fortress at its peak. Note the repaired stone walls—damage from the 2011 earthquake was painstakingly restored.",
        },
        {
          heading: "Hirose River riverside path",
          body: "Descend from the castle hill and you reach the Hirose River, Sendai's main waterway. A paved path along the bank is popular with joggers in the early morning and offers reflections of green foliage in summer and fiery maples in autumn. Kingfishers and herons frequent the shallows. Walk from Hyojogawara Bridge toward Kyogamine hill and you arrive at the approach to Zuihoden.",
        },
        {
          heading: "Zuihoden: Masamune's mausoleum",
          body: "Built in 1637, Zuihoden is the mausoleum of Date Masamune, lavishly decorated in the Momoyama style with gold leaf, lacquer, and vivid carvings. It burned in 1945 and was faithfully reconstructed in 1979. Cryptomeria trees line the path leading to the mausoleums of the second and third lords as well. Admission is ¥570. A small museum displays burial artefacts uncovered during excavation. Autumn foliage around the grounds is spectacular.",
        },
      ],
      [
        { q: "How do I reach the Sendai Castle ruins?", a: "Loople Sendai bus from the station takes about 20 minutes. A taxi is around 15 minutes. On foot from International Center subway station, it is a 20-minute uphill walk." },
        { q: "Is there a castle keep to enter?", a: "No keep was ever built. The honmaru site is an open viewing platform with sweeping city views." },
        { q: "How long does the Zuihoden visit take?", a: "About 40–60 minutes for the mausoleums and the artefact museum." },
        { q: "What is the best season for this route?", a: "May for fresh greenery and October–November for autumn colour. Cherry blossoms along the Hirose River peak in mid-April." },
      ],
    ),
  },

  // ================================================================
  // 8. sapporo-tanukikoji-walk
  // ================================================================
  "sapporo-tanukikoji-walk": {
    ja: ja(
      "狸小路商店街とその周辺散策：札幌の中心街を歩く半日コース",
      "札幌・狸小路商店街から二条市場、大通公園、テレビ塔まで歩く半日ルート。北海道グルメとレトロな商店街の雰囲気を楽しむ散策ガイドです。",
      SAPPORO_TANUKIKOJI_IMAGES[0],
      SAPPORO_TANUKIKOJI_IMAGES,
      SAPPORO_X_EMBEDS,
      [
        {
          heading: "ルート概要：狸小路から大通公園へ",
          body: "地下鉄・大通駅またはすすきの駅から徒歩5分で狸小路商店街に入れます。東西約900メートル、7つのブロックに分かれたアーケード商店街を散策した後、二条市場で海鮮を味わい、大通公園を抜けてテレビ塔まで歩きます。全行程2〜3時間。食事やショッピングの時間を加えると半日たっぷり楽しめます。",
        },
        {
          heading: "狸小路商店街の歩き方",
          body: "明治6年（1873年）開業の北海道最古のアーケード商店街。約200店舗が軒を連ね、老舗の土産物店からドラッグストア、スープカレー店まで多彩です。1丁目〜3丁目はお土産とファッション、4丁目〜5丁目は飲食店が充実、6丁目〜7丁目はレトロな個人商店が残ります。全天候型なので雨や雪の日でも快適に歩けるのが札幌ならではの利点です。",
        },
        {
          heading: "二条市場で北海道の海鮮を堪能",
          body: "狸小路の東端から徒歩3分の二条市場は、明治時代から続く札幌の台所。カニ、ウニ、イクラなど北海道の海鮮が並びます。場内の食堂で海鮮丼（1,500〜3,000円）を朝食や昼食にするのが定番。営業は朝7時頃からなので、早朝スタートなら二条市場での朝食から始めるのもおすすめです。",
        },
        {
          heading: "大通公園とさっぽろテレビ塔",
          body: "東西1.5キロにわたる大通公園は、ライラックやバラなど季節の花壇が美しい都市公園。夏のビアガーデン、秋のオータムフェスト、冬の雪まつりの会場としても有名です。公園の東端にあるテレビ塔（展望台入場料1,000円）からは、大通公園の全景と札幌市街を一望できます。地上90メートルの展望台は夜景スポットとしても人気です。",
        },
      ],
      [
        { q: "狸小路商店街の営業時間は？", a: "店舗により異なりますが、多くは10時〜20時頃。飲食店は11時〜22時頃が目安です。" },
        { q: "二条市場と場外市場はどう違いますか？", a: "二条市場は中心街にあるコンパクトな市場。場外市場は中央卸売市場に隣接し規模が大きいですが、中心街からはバスで15分ほどです。" },
        { q: "大通公園のベストシーズンは？", a: "ライラックの5月〜6月、ビアガーデンの7月〜8月、雪まつりの2月が人気です。" },
        { q: "すすきのエリアも近いですか？", a: "狸小路の南側がすすきのエリアで、徒歩5分以内です。夜の飲食を楽しむならそのまま足を延ばせます。" },
      ],
    ),
    en: en(
      "Tanukikoji Shopping Street and Beyond: A Half-Day Central Sapporo Walk",
      "Walk Sapporo's oldest covered arcade from end to end, detour to Nijo Market for fresh seafood, then cross Odori Park to the TV Tower observation deck. A half-day downtown food-and-shopping route.",
      SAPPORO_TANUKIKOJI_IMAGES[0],
      SAPPORO_TANUKIKOJI_IMAGES,
      SAPPORO_X_EMBEDS,
      [
        {
          heading: "Route overview: arcade to park to tower",
          body: "Start from Odori or Susukino subway station—both are five minutes on foot from Tanukikoji. Walk the 900-metre, seven-block covered arcade, then slip east to Nijo Market for seafood. Cross north into Odori Park and finish at the Sapporo TV Tower at the park's eastern end. Without lingering, the walk takes two to three hours; with meals and shopping, plan half a day.",
        },
        {
          heading: "Walking Tanukikoji",
          body: "Tanukikoji opened in 1873, making it Hokkaido's oldest shopping arcade. Around 200 shops line the stretch—souvenir stores, drugstores, soup-curry restaurants, and vintage boutiques. Blocks 1–3 lean toward souvenirs and fashion, 4–5 are food-heavy, and 6–7 keep a retro indie vibe. The full roof means you can walk comfortably through rain or snowstorms—a real advantage in Sapporo's variable weather.",
        },
        {
          heading: "Nijo Market: Hokkaido seafood breakfast",
          body: "Three minutes east of Tanukikoji's end, Nijo Market has operated since the Meiji era. Stalls heap crab, uni, and ikura on ice. Sit down in one of the market's small diners for a kaisendon (seafood rice bowl) for ¥1,500–¥3,000. The market opens around 7 a.m., so an early start means you can eat breakfast here before hitting the arcade.",
        },
        {
          heading: "Odori Park and Sapporo TV Tower",
          body: "Odori Park stretches 1.5 kilometres east–west and is famous for lilac and rose beds, a summer beer garden, the autumn food festival, and the February Snow Festival. At the eastern end, the Sapporo TV Tower offers a 90-metre-high observation deck (¥1,000) with views down the full length of the park and across the city grid. The deck is also a popular night-view spot.",
        },
      ],
      [
        { q: "What are Tanukikoji's opening hours?", a: "Most shops open 10 a.m.–8 p.m. Restaurants are roughly 11 a.m.–10 p.m., though hours vary by store." },
        { q: "How does Nijo Market compare to Jogai Market?", a: "Nijo is compact and central. Jogai (near the central wholesale market) is larger but 15 minutes away by bus." },
        { q: "When is the best time to visit Odori Park?", a: "Lilacs bloom in May–June, the beer garden runs July–August, and the Snow Festival fills February." },
        { q: "Is Susukino close by?", a: "Yes—Susukino starts right south of Tanukikoji, less than a five-minute walk. It is convenient for evening dining." },
      ],
    ),
  },

  // ================================================================
  // 9. sapporo-maruyama-park-walk
  // ================================================================
  "sapporo-maruyama-park-walk": {
    ja: ja(
      "円山公園と北海道神宮の朝散歩：札幌の自然と神社をめぐる半日コース",
      "札幌・円山公園の原始林から北海道神宮まで歩く朝散歩ルート。野鳥の声とエゾリスに出会える、札幌で最も自然豊かな半日散策ガイドです。",
      SAPPORO_MARUYAMA_IMAGES[0],
      SAPPORO_MARUYAMA_IMAGES,
      SAPPORO_X_EMBEDS,
      [
        {
          heading: "ルート概要：円山公園駅から森と神社へ",
          body: "地下鉄東西線・円山公園駅から徒歩5分で公園入口に着きます。原始林の散策路を30分ほど歩いた後、北海道神宮を参拝。体力があれば標高225メートルの円山山頂まで登ることもできます（片道約30分）。全行程は2〜3時間。朝7時〜8時台のスタートが最も静かで、野鳥やエゾリスとの遭遇率も高くなります。",
        },
        {
          heading: "円山原始林：街なかの天然記念物",
          body: "円山公園の西側に広がる原始林は国の天然記念物に指定されています。カツラ、シナノキ、ミズナラなどの巨木が茂り、札幌中心部から地下鉄10分とは思えない深い森の雰囲気。遊歩道は整備されていますが、自然の地面を歩く区間もあるので歩きやすい靴が必要です。春はカタクリの花が一面に咲き、秋は紅葉のトンネルになります。",
        },
        {
          heading: "北海道神宮",
          body: "明治2年（1869年）に北海道開拓の守護神として創建された北海道の総鎮守。広大な境内は桜と梅の名所で、5月上旬には両方が同時に咲く珍しい光景が見られます。本殿での参拝後は、六花亭の神宮茶屋で判官さま（焼き餅・無料）をいただくのが定番。おみくじは英語版もあるので外国人旅行者にも好評です。",
        },
        {
          heading: "円山登山と動物園",
          body: "円山山頂へは公園内の登山口から約30分。山頂からは札幌市街と日本海を一望でき、天気が良ければ遠く大雪山系まで見渡せます。登山が難しい場合は、隣接する円山動物園（大人800円）でホッキョクグマやレッサーパンダを見るのもおすすめ。動物園は9時30分開園です。",
        },
      ],
      [
        { q: "円山公園でエゾリスに会えますか？", a: "朝早い時間帯（7〜9時頃）に原始林の散策路を歩くと高確率で出会えます。特に秋のクルミの季節は活発です。" },
        { q: "北海道神宮の参拝時間は？", a: "境内は常時開放。社務所は概ね9時〜17時です。" },
        { q: "円山の登山は初心者でも大丈夫ですか？", a: "標高差約100メートルの軽登山で、整備された登山道があるので初心者でも問題ありません。ただし滑りやすい箇所があるのでスニーカー以上の靴を推奨します。" },
        { q: "冬でも散策できますか？", a: "冬は積雪がありますが、北海道神宮への参道は除雪されます。原始林の散策路は滑りやすいので冬用の靴が必須です。" },
      ],
    ),
    en: en(
      "Maruyama Park and Hokkaido Shrine Morning Walk: A Half-Day Sapporo Nature Stroll",
      "Walk through Sapporo's old-growth forest at Maruyama Park, visit Hokkaido Shrine, and optionally summit 225-metre Mt Maruyama. A peaceful morning route where you may spot red squirrels and woodpeckers.",
      SAPPORO_MARUYAMA_IMAGES[0],
      SAPPORO_MARUYAMA_IMAGES,
      SAPPORO_X_EMBEDS,
      [
        {
          heading: "Route overview: subway to forest to shrine",
          body: "From Maruyama-koen Station on the Tozai subway line, a five-minute walk brings you to the park entrance. Spend 30 minutes on the old-growth forest trails, then visit Hokkaido Shrine. If you have energy, climb Mt Maruyama (225 m, about 30 minutes one way) for city views. Total time is two to three hours. Starting at 7–8 a.m. gives you the quietest paths and the best chance to see Ezo red squirrels.",
        },
        {
          heading: "Maruyama primeval forest",
          body: "The western section of Maruyama Park is a nationally designated Natural Monument—old-growth katsura, linden, and oak trees that feel wildly out of place just 10 subway minutes from downtown Sapporo. Paths are maintained but parts are unpaved, so sturdy shoes help. In spring, dogtooth violets blanket the forest floor; in autumn, the canopy turns into a tunnel of crimson and gold.",
        },
        {
          heading: "Hokkaido Shrine",
          body: "Founded in 1869 as the guardian shrine of Hokkaido's colonisation, this is the island's most important Shinto site. The grounds are famous for cherry and plum blossoms blooming simultaneously in early May. After praying at the main hall, stop at the Rokkatei tea house inside the grounds for a free grilled mochi called Hangansama. English-language omikuji fortune slips are available.",
        },
        {
          heading: "Mt Maruyama hike and the zoo",
          body: "The summit trail starts inside the park and takes about 30 minutes. From the top, views stretch across Sapporo's grid, the Sea of Japan coast, and on clear days the Taisetsu mountain range. If hiking is not your thing, Maruyama Zoo (¥800, opens 9:30 a.m.) next door has polar bears and red pandas. Both options pair well with the shrine visit.",
        },
      ],
      [
        { q: "Will I see Ezo red squirrels?", a: "Very likely if you walk the forest trails between 7 and 9 a.m. Autumn, when they gather walnuts, is the most active season." },
        { q: "What are Hokkaido Shrine's visiting hours?", a: "The grounds are always open. The shrine office operates roughly 9 a.m.–5 p.m." },
        { q: "Is the Mt Maruyama hike beginner-friendly?", a: "Yes—about 100 metres of elevation gain on a maintained trail. Wear shoes with grip, as some sections can be slippery." },
        { q: "Can I visit in winter?", a: "Yes. The shrine approach is cleared of snow. Forest trails are icy, so winter boots with traction are essential." },
      ],
    ),
  },

  // ================================================================
  // 10. hakone-old-tokaido-walk
  // ================================================================
  "hakone-old-tokaido-walk": {
    ja: ja(
      "箱根旧東海道の石畳散策：江戸時代の街道を歩く半日コース",
      "箱根・畑宿から元箱根まで旧東海道の石畳道を歩き、関所跡と芦ノ湖を訪ねる半日ルート。江戸時代の旅人気分を味わえる歴史散策ガイドです。",
      HAKONE_OLD_TOKAIDO_IMAGES[0],
      HAKONE_OLD_TOKAIDO_IMAGES,
      HAKONE_X_EMBEDS,
      [
        {
          heading: "ルート概要：畑宿から元箱根へ石畳を歩く",
          body: "箱根湯本駅からバスで約20分の畑宿をスタート。旧東海道の石畳道を約4キロ、1時間30分〜2時間かけて歩き、元箱根に下ります。途中で甘酒茶屋に立ち寄り、到着後は箱根関所と芦ノ湖畔を散策。全行程3〜4時間。石畳は滑りやすいので、トレッキングシューズかグリップの良い靴が必須です。",
        },
        {
          heading: "旧東海道の石畳",
          body: "江戸時代、箱根八里と呼ばれた東海道最大の難所。現在でも約2キロの石畳が当時の姿で残っており、杉並木の中を歩く体験は江戸時代にタイムスリップしたかのようです。一里塚や茶屋跡の案内板が随所にあり、歴史を感じながら歩けます。下り基調なので体力的にはそれほどきつくありませんが、雨の日は石が濡れて非常に滑りやすくなります。",
        },
        {
          heading: "甘酒茶屋と箱根関所",
          body: "石畳の途中にある甘酒茶屋は江戸時代から続く茶屋で、名物のノンアルコール甘酒（500円）と力餅で休憩できます。元箱根に下りたら箱根関所（入場料500円）へ。江戸幕府が設置した関所の建物が忠実に復元されており、取り調べの様子を再現した展示は見応えがあります。",
        },
        {
          heading: "芦ノ湖と箱根神社",
          body: "関所から芦ノ湖畔を10分ほど歩くと箱根神社の水中鳥居が見えてきます。芦ノ湖に浮かぶ赤い鳥居は箱根を代表するフォトスポット。箱根神社の境内は杉の巨木に囲まれた厳かな空間です。時間があれば海賊船（芦ノ湖遊覧船）で桃源台まで渡り、箱根ロープウェイで大涌谷方面へ足を延ばすこともできます。",
        },
        {
          heading: "アクセスと実用情報",
          body: "新宿から箱根湯本まで小田急ロマンスカーで約85分。箱根フリーパス（新宿発3日間7,400円）を使えばバス・船・ロープウェイが乗り放題になります。石畳歩きは午前中の涼しい時間帯がおすすめ。畑宿行きバスは本数が少ないため、事前に時刻表を確認してください。",
        },
      ],
      [
        { q: "石畳の距離はどのくらいですか？", a: "畑宿から元箱根まで約4キロ、うち石畳区間は約2キロです。所要時間は1時間30分〜2時間。" },
        { q: "雨の日でも歩けますか？", a: "歩けますが、石畳が非常に滑りやすくなります。雨天時はグリップの良い靴と杖があると安心です。" },
        { q: "甘酒茶屋の甘酒にアルコールは入っていますか？", a: "ノンアルコールです。米麹から作る伝統的な甘酒なので、お子様でも安心して飲めます。" },
        { q: "箱根フリーパスは元が取れますか？", a: "バス・船・ロープウェイを組み合わせて周遊するなら十分元が取れます。石畳散策＋海賊船＋ロープウェイのルートで利用すると効果的です。" },
      ],
    ),
    en: en(
      "Hakone Old Tokaido Stone-Paved Walk: A Half-Day Edo-Era Highway Stroll",
      "Walk the original stone-paved Tokaido highway from Hatajuku to Moto-Hakone, stop at a centuries-old teahouse, tour the restored checkpoint, and finish at the Lake Ashi torii. A half-day Hakone route steeped in Edo history.",
      HAKONE_OLD_TOKAIDO_IMAGES[0],
      HAKONE_OLD_TOKAIDO_IMAGES,
      HAKONE_X_EMBEDS,
      [
        {
          heading: "Route overview: Hatajuku to Moto-Hakone",
          body: "Bus from Hakone-Yumoto Station to Hatajuku (about 20 minutes), then walk four kilometres of the Old Tokaido highway—two of those on original Edo-period stone paving—descending through cedar forest to Moto-Hakone on the shore of Lake Ashi. The walk takes 90 minutes to two hours. Add the teahouse, the checkpoint, and the lakeside shrine and you have three to four hours. Wear hiking shoes or anything with solid grip; the stones are slippery, especially when wet.",
        },
        {
          heading: "The stone-paved highway",
          body: "The Hakone section of the Tokaido was the toughest of the 53 post stations linking Edo (Tokyo) to Kyoto. Two kilometres of the original ishidatami paving survive, lined with towering cryptomeria cedars. Milestone mounds and signboards mark former teahouse sites, letting you reconstruct the journey that Edo-period travellers once dreaded. The route is mostly downhill, so the physical effort is moderate—but watch your footing on every stone.",
        },
        {
          heading: "Amazake-chaya teahouse and Hakone Checkpoint",
          body: "Midway along the trail, Amazake-chaya has served travellers since the Edo period. Its signature non-alcoholic amazake (sweet fermented rice drink, ¥500) and chikara-mochi rice cakes make an ideal rest stop. Once you reach Moto-Hakone, the reconstructed Hakone Checkpoint (¥500) shows how the Tokugawa shogunate controlled travel between provinces—mannequin dioramas re-enact the inspection process.",
        },
        {
          heading: "Lake Ashi and Hakone Shrine",
          body: "A 10-minute lakeside stroll from the checkpoint brings you to Hakone Shrine's vermilion torii standing in the water—one of the most photographed scenes in the Kanto region. The shrine grounds are shaded by massive cedars and feel ancient and serene. If time allows, board the pirate ship (Lake Ashi cruise) to Togendai and ride the Hakone Ropeway toward Owakudani for volcanic views.",
        },
        {
          heading: "Access and practical tips",
          body: "The Odakyu Romancecar runs from Shinjuku to Hakone-Yumoto in about 85 minutes. The Hakone Free Pass (¥7,400 for three days from Shinjuku) covers buses, boats, and ropeways. Walk the ishidatami in the cool morning hours. Buses to Hatajuku are infrequent, so check the timetable in advance.",
        },
      ],
      [
        { q: "How far is the stone-paved section?", a: "The full walk is about four kilometres; the original stone-paved portion is roughly two kilometres. Allow 90 minutes to two hours." },
        { q: "Can I walk this trail in rain?", a: "Yes, but the stones become very slippery. Bring shoes with good traction and consider a walking stick." },
        { q: "Is the amazake alcoholic?", a: "No. It is made from rice koji and is non-alcoholic, safe for children." },
        { q: "Is the Hakone Free Pass worth it?", a: "If you combine the stone trail with a pirate-ship cruise and ropeway ride, the pass pays for itself easily." },
      ],
    ),
  },

  // ================================================================
  // 11. hakone-gora-park-walk
  // ================================================================
  "hakone-gora-park-walk": {
    ja: ja(
      "強羅公園と美術館めぐり散歩：箱根の高原アートを歩く半日コース",
      "箱根・強羅公園のフランス式庭園から彫刻の森美術館、箱根美術館まで歩く半日ルート。四季の花と屋外アートを楽しむ散策ガイドです。",
      HAKONE_GORA_IMAGES[0],
      HAKONE_GORA_IMAGES,
      HAKONE_X_EMBEDS,
      [
        {
          heading: "ルート概要：強羅駅から公園と美術館を周遊",
          body: "箱根登山鉄道の終点・強羅駅からスタート。強羅公園で庭園を楽しんだ後、箱根美術館の苔庭を訪ね、最後に彫刻の森美術館まで足を延ばします。全行程3〜4時間。箱根フリーパスがあれば登山鉄道とケーブルカーが乗り放題なので、大涌谷や芦ノ湖との組み合わせも可能です。",
        },
        {
          heading: "強羅公園：フランス式庭園と体験工房",
          body: "1914年開園の日本初のフランス式整型庭園。噴水を中心に左右対称にデザインされた花壇には、春のバラ、夏のブーゲンビリア、秋の紅葉と年間を通じて花が楽しめます。園内にはガラス細工やポタリーの体験工房があり、旅の記念を自分で作れるのも魅力。入園料550円（箱根フリーパス提示で無料）。",
        },
        {
          heading: "箱根美術館の苔庭",
          body: "強羅公園に隣接する箱根美術館は、約200種の苔が一面に広がる苔庭が最大の見どころ。秋には頭上のモミジが紅く染まり、苔の緑とのコントラストが息をのむ美しさです。日本陶磁器のコレクションも充実しており、縄文土器から江戸の伊万里焼まで通史で学べます。入館料900円。庭園散策だけでも30分は確保してください。",
        },
        {
          heading: "彫刻の森美術館",
          body: "強羅駅の一つ手前、彫刻の森駅から徒歩2分。7万平方メートルの野外展示場にロダン、ムーア、ピカソなど著名アーティストの作品が120点以上展示されています。ピカソ館では陶器や版画など300点以上のコレクションを常設展示。子供が中に入って遊べる体験型作品もあり、家族連れにも好評。入館料1,600円。所要時間は1〜2時間。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body: "紅葉の11月が最も人気ですが、バラの5〜6月、紫陽花の6〜7月（登山鉄道沿線が有名）もおすすめ。箱根湯本から登山鉄道で約40分。スイッチバックを繰り返す登山鉄道自体が観光の目玉です。強羅駅周辺にはカフェや足湯施設もあるので、散策の合間の休憩スポットに困りません。",
        },
      ],
      [
        { q: "強羅公園は箱根フリーパスで無料になりますか？", a: "はい。箱根フリーパス提示で入園無料です。" },
        { q: "美術館めぐりの所要時間は？", a: "強羅公園30分、箱根美術館40分、彫刻の森美術館1〜2時間で、合計3〜4時間が目安です。" },
        { q: "雨の日でも楽しめますか？", a: "箱根美術館と彫刻の森のピカソ館は屋内展示があるので雨天でも楽しめます。雨に濡れた苔庭は特に美しいです。" },
        { q: "子連れにおすすめのスポットは？", a: "彫刻の森美術館には子供が中に入って遊べる作品やネットの森があり、子連れに最も人気です。" },
      ],
    ),
    en: en(
      "Gora Park and Museum Walk: A Half-Day Hakone Art-Garden Stroll",
      "Tour Gora Park's French garden, the moss-covered grounds of Hakone Museum of Art, and the sprawling Open-Air Museum of sculpture. A half-day Hakone route combining highland flowers and world-class art.",
      HAKONE_GORA_IMAGES[0],
      HAKONE_GORA_IMAGES,
      HAKONE_X_EMBEDS,
      [
        {
          heading: "Route overview: Gora Station loop",
          body: "Start at Gora, the terminus of the Hakone Tozan Railway. Visit Gora Park first, then step next door to the Hakone Museum of Art for its famous moss garden, and finally ride one stop back to Chokokunomori Station for the Open-Air Museum. The loop takes three to four hours. With a Hakone Free Pass, the railway and cable car are included, so you can easily continue to Owakudani or Lake Ashi afterward.",
        },
        {
          heading: "Gora Park: Japan's first French garden",
          body: "Opened in 1914, this symmetrical garden centres on a fountain ringed by seasonal flower beds—roses in spring, bougainvillea in summer, maples in autumn. Inside the park, craft workshops let you blow glass or shape pottery as a souvenir. Admission is ¥550, or free with a Hakone Free Pass.",
        },
        {
          heading: "Hakone Museum of Art moss garden",
          body: "Adjacent to Gora Park, the museum is best known for its moss garden, where roughly 200 species of moss carpet the ground beneath Japanese maples. In November, the red canopy against the green moss is one of Hakone's most breathtaking sights. The museum's ceramic collection spans from Jomon earthenware to Edo-period Imari ware. Admission is ¥900. Allow at least 30 minutes just for the garden.",
        },
        {
          heading: "Hakone Open-Air Museum",
          body: "One station back toward Hakone-Yumoto, the Open-Air Museum spreads over 70,000 square metres of hillside. More than 120 sculptures by Rodin, Moore, Picasso, and others stand among the greenery. The Picasso Pavilion houses over 300 ceramics, prints, and paintings. Interactive installations let children climb inside giant nets and towers—great for families. Admission is ¥1,600; plan one to two hours.",
        },
        {
          heading: "Best season and access",
          body: "November autumn leaves are the peak draw, but May–June roses and June–July hydrangeas (famous along the Tozan Railway tracks) are also splendid. The switchback mountain railway from Hakone-Yumoto to Gora takes about 40 minutes and is an attraction in its own right. Cafés and foot-bath spots around Gora Station make for easy rest breaks.",
        },
      ],
      [
        { q: "Is Gora Park free with the Hakone Free Pass?", a: "Yes—show your pass at the gate for complimentary entry." },
        { q: "How long do the three museums take?", a: "Roughly 30 minutes for Gora Park, 40 minutes for the art museum, and one to two hours for the Open-Air Museum—three to four hours total." },
        { q: "Are these museums enjoyable in rain?", a: "The Picasso Pavilion and the art museum's indoor galleries are covered. The moss garden actually looks more vivid in the rain." },
        { q: "Which spot is best for kids?", a: "The Open-Air Museum—children can climb inside net sculptures and interactive towers." },
      ],
    ),
  },

  // ================================================================
  // 12. nikko-kanmangafuchi-walk
  // ================================================================
  "nikko-kanmangafuchi-walk": {
    ja: ja(
      "憾満ヶ淵と並び地蔵の静かな散策：日光の渓谷美を歩く半日コース",
      "日光・憾満ヶ淵の渓谷沿いを歩き、苔むした並び地蔵に出会う半日ルート。観光客の少ない穴場で日光の自然美を楽しむ散策ガイドです。",
      NIKKO_KANMANGAFUCHI_IMAGES[0],
      NIKKO_KANMANGAFUCHI_IMAGES,
      NIKKO_X_EMBEDS,
      [
        {
          heading: "ルート概要：日光駅から渓谷の散策路へ",
          body: "東武日光駅またはJR日光駅から西へ徒歩約30分（バスなら約10分）で憾満ヶ淵の入口に着きます。大谷川の渓谷沿いに約1キロの散策路が整備されており、往復1時間ほど。東照宮エリアの喧騒とは対照的な静けさが魅力です。帰路に含満公園を抜ければ、そのまま神橋方面へ歩いて東照宮観光とつなげることもできます。",
        },
        {
          heading: "並び地蔵（化け地蔵）",
          body: "散策路の途中に約70体の石地蔵が一列に並んでいます。苔に覆われた姿は時の流れを感じさせ、独特の神秘的な雰囲気を漂わせます。「行きと帰りで数が変わる」という言い伝えがあり、そこから「化け地蔵」の別名がつきました。緑の苔と赤い帽子・前掛けのコントラストが写真映えするスポットです。",
        },
        {
          heading: "大谷川の渓谷美",
          body: "男体山の噴火で流れ出た溶岩が大谷川に侵食されてできた渓谷で、奇岩が連なるダイナミックな地形が見どころ。川の水は驚くほど澄んでおり、深い碧色をしています。散策路からは渓谷を見下ろせるポイントが複数あり、特に秋の紅葉シーズンには赤や黄色の木々と青い渓流のコントラストが見事です。",
        },
        {
          heading: "訪問のベストタイミング",
          body: "紅葉は10月下旬〜11月上旬がピーク。新緑の5月〜6月も苔と渓谷の緑が美しい季節です。平日の午前中なら観光客はほとんどおらず、自分だけの時間を過ごせます。冬場は積雪で散策路が滑りやすくなるので注意。慈雲寺の山門前を通って入るルートが最も分かりやすいです。",
        },
      ],
      [
        { q: "憾満ヶ淵はどこにありますか？", a: "東武日光駅・JR日光駅から西へ徒歩約30分、バスなら約10分の渓谷沿いです。" },
        { q: "並び地蔵は何体ありますか？", a: "約70体です。苔の具合により季節で表情が変わります。" },
        { q: "東照宮と一緒に回れますか？", a: "はい。憾満ヶ淵を先に歩いてから神橋方面へ戻り、東照宮を訪れるルートが効率的です。全体で5〜6時間見てください。" },
        { q: "足場は悪いですか？", a: "散策路は概ね整備されていますが、一部は未舗装で根が露出している箇所もあります。歩きやすい靴がおすすめです。" },
      ],
    ),
    en: en(
      "Kanmangafuchi Abyss and Narabi Jizo Walk: A Quiet Nikko Gorge Stroll",
      "Follow the Daiya River gorge to rows of moss-covered Jizo statues at Kanmangafuchi. A peaceful one-hour walk away from Nikko's temple crowds, ideal as a morning warm-up or afternoon wind-down.",
      NIKKO_KANMANGAFUCHI_IMAGES[0],
      NIKKO_KANMANGAFUCHI_IMAGES,
      NIKKO_X_EMBEDS,
      [
        {
          heading: "Route overview: station to gorge",
          body: "From Tobu Nikko or JR Nikko Station, walk west for about 30 minutes (or take a bus for 10) to reach the Kanmangafuchi trailhead. A roughly one-kilometre path follows the Daiya River gorge and loops back—an easy hour round trip. The contrast with the busy Toshogu area is striking: you may have the trail to yourself on a weekday morning. On the return, cut through Ganman Park toward Shinkyo Bridge to connect with the main shrine circuit.",
        },
        {
          heading: "Narabi Jizo (Ghost Jizo)",
          body: "About 70 stone Jizo statues line the path in a single file, draped in moss, red bibs, and knitted caps. According to local legend, the number changes every time you count them—hence the nickname bake-jizo, or ghost Jizo. The contrast of green moss, red fabric, and grey stone makes this one of Nikko's most photogenic spots, yet far fewer visitors come here than to the shrines.",
        },
        {
          heading: "Daiya River gorge scenery",
          body: "The gorge was carved by the Daiya River cutting through lava from Mt Nantai's eruptions. Jagged rock formations and startlingly clear blue-green water line the trail. Several overlook points let you gaze down into the rapids. In autumn (late October to early November), the fiery maples above the turquoise water create a colour palette you will not find at the shrines.",
        },
        {
          heading: "Best timing for your visit",
          body: "Autumn colour peaks late October to early November. May and June are lush with fresh moss and green canopy. Weekday mornings guarantee near solitude. In winter, the path can be icy—bring traction footwear. Enter via the gate of Jiunji Temple for the most straightforward approach.",
        },
      ],
      [
        { q: "Where exactly is Kanmangafuchi?", a: "About 30 minutes on foot west of Tobu Nikko Station, or 10 minutes by local bus. Follow signs for Jiunji Temple." },
        { q: "How many Jizo statues are there?", a: "Roughly 70. Their appearance changes with moss growth and seasonal dressing." },
        { q: "Can I combine this with Toshogu?", a: "Yes. Walk Kanmangafuchi first, then head back toward Shinkyo Bridge and up to the shrines. Allow five to six hours for both." },
        { q: "Is the trail difficult?", a: "Mostly maintained paths, but a few unpaved stretches have exposed roots. Sturdy walking shoes are recommended." },
      ],
    ),
  },

  // ================================================================
  // 13. nikko-temple-shrine-walk
  // ================================================================
  "nikko-temple-shrine-walk": {
    ja: ja(
      "日光東照宮と輪王寺の朝参拝散歩：世界遺産の社寺を歩く半日コース",
      "日光・東照宮の陽明門から輪王寺、二荒山神社、大猷院まで歩く半日ルート。朝の静けさの中で世界遺産の社寺群を堪能する散策ガイドです。",
      NIKKO_TEMPLE_IMAGES[0],
      NIKKO_TEMPLE_IMAGES,
      NIKKO_X_EMBEDS,
      [
        {
          heading: "ルート概要：神橋から社寺エリアを周回",
          body: "東武日光駅からバスで約7分の神橋をスタート地点に、東照宮→輪王寺三仏堂→二荒山神社→大猷院と巡ります。全行程3〜4時間。拝観券は二社一寺共通拝観券（大人1,600円）がお得ですが、東照宮のみの拝観券（1,300円）もあります。混雑を避けるなら開門直後の8時台の到着がベスト。朝の澄んだ空気の中で参拝すると、杉の巨木と社殿の荘厳さが一層引き立ちます。",
        },
        {
          heading: "東照宮：陽明門と眠り猫",
          body: "徳川家康を祀る東照宮は日光社寺群の中心。508体の彫刻で覆われた陽明門は「日暮の門」とも呼ばれ、一日中見ていても飽きないと言われます。奥社参道入口の眠り猫（左甚五郎作）は小さいながらも必見。その裏側には雀の彫刻があり、「猫が眠っているから雀も安心して遊べる＝太平の世」を表しています。五重塔の初層にはスカイツリーと同じ心柱構造が見られます。",
        },
        {
          heading: "輪王寺と二荒山神社",
          body: "輪王寺三仏堂は日光山最大の建造物で、高さ8メートルの金色の千手観音、阿弥陀如来、馬頭観音が安置されています。三仏堂から歩いて5分の二荒山神社は、日光の霊山・男体山を御神体とする古社。良縁・家庭円満のパワースポットとして人気があり、境内の化け灯籠や御神木の杉も見どころです。",
        },
        {
          heading: "大猷院：静寂の中の桃山建築",
          body: "三代将軍徳川家光の霊廟・大猷院は、東照宮に比べて訪れる人が少ないため静かに参拝できます。東照宮より控えめでありながら、金と黒を基調とした装飾は独特の重厚感があります。夜叉門の四体の夜叉像や、皇嘉門（竜宮門）の異国風デザインなど、東照宮とは異なる美学が楽しめます。",
        },
        {
          heading: "実用情報とベストシーズン",
          body: "紅葉シーズン（10月下旬〜11月上旬）は最も混雑するため、平日の朝一がおすすめ。新緑の5月と雪の降る冬も美しい季節です。参道は石段が多いので歩きやすい靴で。食事は神橋近くの日光ゆば料理の店がおすすめ。日光名物のゆば（湯波）を使ったそばや懐石を味わえます。",
        },
      ],
      [
        { q: "東照宮の拝観にどのくらいかかりますか？", a: "じっくり見て1時間30分〜2時間。陽明門と奥社だけなら1時間でも回れます。" },
        { q: "共通拝観券は買うべきですか？", a: "東照宮・輪王寺・二荒山神社を全て回るなら共通券（1,600円）がお得です。東照宮のみなら個別券（1,300円）で。" },
        { q: "混雑を避けるには？", a: "開門直後の8時台に到着し、東照宮を最初に参拝するのがベストです。団体客は10時頃から増えます。" },
        { q: "日光ゆばはどこで食べられますか？", a: "神橋周辺に複数のゆば料理店があります。ゆばそばやゆば懐石が定番メニューです。" },
        { q: "東京からの日帰りは可能ですか？", a: "はい。浅草から東武特急で約2時間。朝出発すれば社寺巡りと昼食を含めて日帰りで十分楽しめます。" },
      ],
    ),
    en: en(
      "Nikko Toshogu and Rinnoji Morning Walk: A Half-Day World Heritage Shrine Stroll",
      "Walk from Shinkyo Bridge through the lavish Toshogu Shrine, Rinnoji Temple, Futarasan Shrine, and the serene Taiyuin mausoleum. An early-morning half-day route through Nikko's UNESCO World Heritage site.",
      NIKKO_TEMPLE_IMAGES[0],
      NIKKO_TEMPLE_IMAGES,
      NIKKO_X_EMBEDS,
      [
        {
          heading: "Route overview: Shinkyo to Taiyuin",
          body: "Bus from Tobu Nikko Station to Shinkyo Bridge (about seven minutes), then walk the shrine-and-temple precinct in order: Toshogu, Rinnoji Sanbutsudo, Futarasan Shrine, and Taiyuin. Total time is three to four hours. A combined two-shrine-one-temple ticket costs ¥1,600 (Toshogu-only is ¥1,300). Arrive by 8 a.m. when the gates open to enjoy the cedars and carvings before the tour groups descend around ten.",
        },
        {
          heading: "Toshogu: Yomeimon Gate and the sleeping cat",
          body: "Toshogu enshrines Tokugawa Ieyasu, founder of the Edo shogunate. Its centrepiece is Yomeimon, a gate covered in 508 carvings so intricate it earned the nickname Higurashi-no-mon—the gate you could gaze at until sundown. At the entrance to the inner sanctuary, look for the small sleeping-cat carving (nemuri-neko) attributed to master sculptor Hidari Jingoro. On its reverse side, sparrows play—symbolising that even sparrows feel safe when the cat is asleep, a metaphor for peace. The five-storied pagoda's central pillar uses the same pendulum principle as Tokyo Skytree.",
        },
        {
          heading: "Rinnoji Temple and Futarasan Shrine",
          body: "Rinnoji's Sanbutsudo is the largest building in the Nikko complex. Inside stand three eight-metre gilded statues: Senju Kannon (Thousand-Armed Kannon), Amida Nyorai, and Bato Kannon. A five-minute walk leads to Futarasan Shrine, the oldest shrine in Nikko, dedicated to the sacred Mt Nantai. It is popular as a power spot for good relationships and harmonious family life. Look for the ghost lantern and the sacred cedar inside the grounds.",
        },
        {
          heading: "Taiyuin: quiet Momoyama splendour",
          body: "The mausoleum of third shogun Tokugawa Iemitsu draws far fewer visitors than Toshogu, making it the most peaceful stop on this route. Gold-and-black lacquer dominates instead of Toshogu's polychrome riot, giving the complex a darker, more solemn beauty. Highlights include the Yasha-mon gate with its four demon guardians and the Kokamon (Imperial Gate) whose dragon-palace design evokes a Chinese mythological entrance.",
        },
        {
          heading: "Practical tips and best season",
          body: "Autumn colour (late October to early November) is peak season and peak crowds—weekday mornings are essential. May greenery and winter snow are less crowded and equally scenic. Stone steps abound, so wear sturdy shoes. For lunch, try yuba (tofu skin) near Shinkyo Bridge—Nikko yuba soba and yuba kaiseki are local specialities.",
        },
      ],
      [
        { q: "How long does Toshogu take?", a: "A thorough visit is 90 minutes to two hours. A quicker loop hitting Yomeimon and the inner sanctuary can be done in an hour." },
        { q: "Should I buy the combined ticket?", a: "If you plan to visit all three sites (Toshogu, Rinnoji, Futarasan), the ¥1,600 combined ticket saves money. For Toshogu alone, buy the ¥1,300 single ticket." },
        { q: "How do I avoid crowds?", a: "Arrive when the gates open at 8 a.m. and visit Toshogu first. Large tour groups typically arrive around 10 a.m." },
        { q: "What is yuba and where can I try it?", a: "Yuba is the skin that forms on heated soy milk—a Nikko delicacy. Several restaurants near Shinkyo Bridge serve yuba soba and yuba kaiseki." },
        { q: "Can I do a day trip from Tokyo?", a: "Yes. The Tobu limited express from Asakusa takes about two hours. An early start gives you plenty of time for the shrines and lunch." },
      ],
    ),
  },

  // ================================================================
  // 14. kagoshima-tenmonkan-walk
  // ================================================================
  "kagoshima-tenmonkan-walk": {
    ja: ja(
      "天文館通りと城山展望台散策：鹿児島の繁華街と桜島絶景を歩く半日コース",
      "鹿児島・天文館通りの商店街から城山展望台まで歩き、桜島の大パノラマを楽しむ半日ルート。白熊かき氷と西郷隆盛ゆかりの地をめぐる散策ガイドです。",
      KAGOSHIMA_TENMONKAN_IMAGES[0],
      KAGOSHIMA_TENMONKAN_IMAGES,
      KAGOSHIMA_X_EMBEDS,
      [
        {
          heading: "ルート概要：天文館から城山展望台へ",
          body: "市電・天文館通電停をスタートに、天文館アーケードを散策した後、照国神社を経て城山遊歩道を登ります。展望台まで徒歩約20分の緩やかな登り。展望台から桜島を一望した後、下山して西郷隆盛像を見て市電で戻ります。全行程2〜3時間。鹿児島市電一日乗車券（600円）が便利です。",
        },
        {
          heading: "天文館通り：南九州最大の繁華街",
          body: "江戸時代に島津家の天文観測所があったことが名前の由来。アーケード商店街には鹿児島土産の定番・さつまあげやかるかん饅頭の店が並びます。名物の白熊（しろくま）は練乳かき氷にフルーツと豆をトッピングした鹿児島発祥のスイーツで、元祖の天文館むじゃきが有名。夏場は行列ができますが、並ぶ価値のある一杯です。",
        },
        {
          heading: "城山展望台：桜島の大パノラマ",
          body: "標高107メートルの城山は、市街地のすぐ裏手にあるとは思えないほど緑豊かな照葉樹林に覆われています。展望台からは錦江湾越しに桜島が目の前にそびえ、鹿児島市街を一望。晴れた日の朝は桜島から朝日が昇る絶景が見られます。城山は西南戦争の最終決戦地でもあり、西郷隆盛が最後の5日間を過ごした洞窟も近くにあります。",
        },
        {
          heading: "西郷隆盛像と照国神社",
          body: "城山を下りると、鹿児島市役所近くに西郷隆盛の銅像があります。上野の軍服姿と異なり、鹿児島では陸軍大将の正装姿で立っています。照国神社は島津斉彬を祀る神社で、境内は広く市民の憩いの場。7月の六月灯（ろくがつどう）は数千個の灯籠が幻想的な夏祭りです。",
        },
      ],
      [
        { q: "天文館から城山展望台まではどのくらいかかりますか？", a: "照国神社経由で徒歩約30分。遊歩道の登りは約20分で、緩やかな坂道です。" },
        { q: "白熊かき氷はどこで食べられますか？", a: "天文館むじゃき（元祖）が最も有名。天文館アーケード内にあります。レギュラーサイズ750円程度。" },
        { q: "桜島が見えない日もありますか？", a: "霧や噴煙の多い日は見えにくくなります。晴れた朝が最もクリアに見えます。" },
        { q: "城山にはバスで行けますか？", a: "鹿児島市営バスのシティビューが城山展望台を通ります。体力に不安がある方はバスが便利です。" },
      ],
    ),
    en: en(
      "Tenmonkan Street and Shiroyama Lookout Walk: Half-Day Kagoshima City and Sakurajima Views",
      "Walk through Kagoshima's liveliest arcade, climb forested Shiroyama hill for a panoramic view of Sakurajima volcano, and loop back past the Saigo Takamori statue. A compact half-day city route with volcanic scenery.",
      KAGOSHIMA_TENMONKAN_IMAGES[0],
      KAGOSHIMA_TENMONKAN_IMAGES,
      KAGOSHIMA_X_EMBEDS,
      [
        {
          heading: "Route overview: arcade to hilltop to statue",
          body: "Start at the Tenmonkan-dori tram stop and browse the covered arcade. Walk north through Terukuni Shrine and pick up the Shiroyama nature trail—a gentle 20-minute climb to the summit lookout. After soaking in the Sakurajima panorama, descend to the Saigo Takamori statue and catch the tram back. Total time is two to three hours. A Kagoshima city-tram day pass (¥600) covers every stop.",
        },
        {
          heading: "Tenmonkan: southern Kyushu's busiest arcade",
          body: "Named after a Shimazu-clan astronomical observatory that once stood here, Tenmonkan packs souvenir shops, satsuma-age (fried fish cake) vendors, and karukan confectioneries under its roof. The star attraction is shirokuma—a towering shaved-ice dessert topped with condensed milk, fruit, and beans, invented in Kagoshima. Tenmonkan Mujaki is the original shop; expect a queue in summer, but the bowl is worth the wait.",
        },
        {
          heading: "Shiroyama lookout: Sakurajima face to face",
          body: "At just 107 metres, Shiroyama is a quick climb, yet its evergreen canopy feels like deep forest. The lookout platform puts Sakurajima directly ahead across Kinko Bay, with Kagoshima's city grid below. On a clear morning you can watch the sunrise behind the volcano. Shiroyama is also the site of Saigo Takamori's last stand during the 1877 Satsuma Rebellion; the cave where he spent his final five days is signposted on the descent trail.",
        },
        {
          heading: "Saigo Takamori statue and Terukuni Shrine",
          body: "At the foot of the hill near Kagoshima City Hall stands a bronze Saigo Takamori in formal army-general attire—different from the casual hunting outfit depicted in Tokyo's Ueno statue. Nearby Terukuni Shrine honours Shimazu Nariakira, the reformist daimyo who modernised Satsuma domain. Its summer Rokugatsu-do festival lights thousands of paper lanterns across the grounds.",
        },
      ],
      [
        { q: "How long does the walk from Tenmonkan to Shiroyama take?", a: "About 30 minutes via Terukuni Shrine, including a gentle 20-minute climb through forest." },
        { q: "Where can I try shirokuma shaved ice?", a: "Tenmonkan Mujaki, the original shop, is inside the arcade. A regular bowl is around ¥750." },
        { q: "Is Sakurajima always visible?", a: "Fog and volcanic plumes can obscure the view. Clear mornings offer the best visibility." },
        { q: "Can I take a bus up Shiroyama?", a: "Yes—the Kagoshima City View sightseeing bus stops at the lookout. Handy if you prefer not to hike." },
      ],
    ),
  },

  // ================================================================
  // 15. kagoshima-sengan-en-walk
  // ================================================================
  "kagoshima-sengan-en-walk": {
    ja: ja(
      "仙巌園と磯の御殿場散歩：桜島を借景にした大名庭園を歩く半日コース",
      "鹿児島・仙巌園の大名庭園から尚古集成館、磯海岸まで歩く半日ルート。桜島を借景にした庭園美と薩摩の近代化遺産を楽しむ散策ガイドです。",
      KAGOSHIMA_SENGAN_EN_IMAGES[0],
      KAGOSHIMA_SENGAN_EN_IMAGES,
      KAGOSHIMA_X_EMBEDS,
      [
        {
          heading: "ルート概要：仙巌園を中心とした磯エリア散策",
          body: "鹿児島中央駅からバスで約30分、仙巌園前バス停で下車。仙巌園→尚古集成館→磯海岸の順に歩きます。仙巌園の庭園と御殿の見学に1時間30分〜2時間、集成館と海岸散策で1時間、合計3時間ほどの半日コースです。入園料は庭園・尚古集成館セットで大人1,500円（御殿内部は別途600円）。",
        },
        {
          heading: "仙巌園：桜島を借景にした大名庭園",
          body: "1658年に島津光久が築いた別邸で、錦江湾と桜島を借景に取り込んだスケールの大きな庭園です。世界文化遺産「明治日本の産業革命遺産」の構成資産でもあります。園内には曲水の庭、望嶽楼（中国風の東屋）、猫神社（薩摩藩の猫を祀る珍しい神社）などの見どころが点在。御殿内部（別途600円）では島津家の暮らしぶりを垣間見られます。",
        },
        {
          heading: "尚古集成館：薩摩の近代化を学ぶ",
          body: "仙巌園に隣接する尚古集成館は、島津斉彬が建設した日本初の近代的工場群の跡地にある博物館。幕末に薩摩藩がいかに西洋技術を取り入れて大砲や紡績機を製造したかを展示しています。建物自体が石造りの旧機械工場（1865年）で、重要文化財。ガラス製品のコレクション「薩摩切子」の展示も見応えがあります。",
        },
        {
          heading: "磯海岸と桜島の眺め",
          body: "集成館を出て海岸沿いに5分ほど歩くと磯海岸に出ます。目の前に桜島がそびえ、波打ち際から見上げる火山の迫力は格別。天気が良ければ対岸の大隅半島まで見渡せます。海岸沿いにはスターバックスの鹿児島仙巌園店があり、桜島を眺めながらのコーヒーブレイクが人気。鹿児島限定メニューもあります。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body: "春は園内の桜と桜島の共演、秋は菊まつり（11月）が見事です。夏場は日差しが強いので帽子と水分を忘れずに。鹿児島中央駅からバス（まち巡りバスまたはカゴシマシティビュー）が便利。帰りに磯の御殿場バス停から乗車すれば、天文館や鹿児島中央駅を経由して戻れます。",
        },
      ],
      [
        { q: "仙巌園の見学にどのくらいかかりますか？", a: "庭園と集成館で2〜3時間。御殿内部も見学する場合は3時間以上確保してください。" },
        { q: "仙巌園の入園料はいくらですか？", a: "庭園・尚古集成館セットで大人1,500円。御殿内部は別途600円です。" },
        { q: "天文館エリアからのアクセスは？", a: "天文館からバスで約20分。カゴシマシティビューバスが便利です。" },
        { q: "猫神社とは何ですか？", a: "薩摩藩の朝鮮出兵時に連れて行った猫を祀る神社です。猫好きの間でSNSで話題になっています。" },
        { q: "桜島フェリーとの組み合わせは可能ですか？", a: "仙巌園は桜島フェリー乗り場とは離れているため、別日にするか、仙巌園を午前、桜島を午後で計画するのがおすすめです。" },
      ],
    ),
    en: en(
      "Sengan-en Garden and Iso Coast Walk: A Half-Day Kagoshima Heritage Stroll",
      "Tour the Shimazu clan's Sengan-en garden with Sakurajima as its living backdrop, explore the Shoko Shuseikan industrial museum, and walk the Iso coastline. A half-day route through Satsuma history and volcanic scenery.",
      KAGOSHIMA_SENGAN_EN_IMAGES[0],
      KAGOSHIMA_SENGAN_EN_IMAGES,
      KAGOSHIMA_X_EMBEDS,
      [
        {
          heading: "Route overview: garden, museum, coast",
          body: "Bus from Kagoshima-Chuo Station to the Sengan-en-mae stop (about 30 minutes). Walk the garden, visit Shoko Shuseikan next door, then stroll along the Iso coast. Allow 90 minutes to two hours for the garden, and another hour for the museum and coast—three hours total. Admission is ¥1,500 for the garden-and-museum set (palace interior is an extra ¥600).",
        },
        {
          heading: "Sengan-en: borrowed scenery on a grand scale",
          body: "Built in 1658 by Shimazu Mitsuhisa, Sengan-en uses Kinko Bay and the active Sakurajima volcano as shakkei—borrowed scenery. The garden is part of the UNESCO World Heritage Sites of Japan's Meiji Industrial Revolution. Inside, you will find a winding-stream garden, the Chinese-style Bogakuro pavilion, and a cat shrine (neko-jinja) dedicated to cats the Satsuma clan took on a Korean campaign. The palace interior (¥600 extra) reveals the private life of the Shimazu lords.",
        },
        {
          heading: "Shoko Shuseikan: Satsuma's industrial dawn",
          body: "Adjacent to the garden, this museum occupies the site of Japan's first modern factories, where the Satsuma domain produced cannons and textiles using imported Western technology before the Meiji Restoration. The building itself—an 1865 stone machine shop—is an Important Cultural Property. Inside, the Satsuma Kiriko cut-glass collection is a highlight, showcasing a craft that was lost for a century and revived in the 1980s.",
        },
        {
          heading: "Iso coast and Sakurajima up close",
          body: "Five minutes on foot from the museum, the Iso shoreline offers an unobstructed, sea-level view of Sakurajima. The volcano feels close enough to touch. On a clear day the Osumi Peninsula stretches behind it. A Starbucks branch on the coast lets you sip coffee while staring at an active volcano—Kagoshima's most Instagrammed café seat.",
        },
        {
          heading: "Best season and access",
          body: "Spring brings cherry blossoms framing the volcano; November's chrysanthemum festival fills the garden with colour. Summer is hot—bring a hat and water. City View or Machi-meguri buses from Kagoshima-Chuo Station are the easiest transport. On the return, board at the Iso-no-Gotemba stop and loop back through Tenmonkan.",
        },
      ],
      [
        { q: "How long does a Sengan-en visit take?", a: "Two to three hours for the garden and museum. Add the palace interior and allow three hours or more." },
        { q: "What does admission cost?", a: "¥1,500 for the garden-and-museum set. The palace interior is an additional ¥600." },
        { q: "How do I get here from Tenmonkan?", a: "About 20 minutes by bus. The City View sightseeing bus is the most convenient option." },
        { q: "What is the cat shrine?", a: "A small shrine honouring cats the Satsuma clan brought on a 16th-century Korean campaign. It has become a social-media hit among cat lovers." },
        { q: "Can I combine this with the Sakurajima ferry?", a: "The ferry terminal is some distance away. Plan Sengan-en for the morning and Sakurajima for the afternoon, or visit on separate days." },
      ],
    ),
  },
};

export const JAPAN_3_GUIDE_SLUGS = Object.keys(JAPAN_3_GUIDE_CONTENT);
