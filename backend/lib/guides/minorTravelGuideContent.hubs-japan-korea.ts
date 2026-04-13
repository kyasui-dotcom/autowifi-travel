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

function hubCta(locale: GuideLocale, country: "japan" | "korea" | "taiwan") {
  const labels = {
    japan: { en: "Japan", ja: "日本" },
    korea: { en: "South Korea", ja: "韓国" },
    taiwan: { en: "Taiwan", ja: "台湾" },
  };
  const label = labels[country];
  return locale === "ja"
    ? {
        ctaTitle: `${label.ja}旅行の通信をもっと楽に`,
        ctaButton: `${label.ja}のeSIMを見る`,
        breadcrumbGuide: "ガイド",
        breadcrumbHome: "ホーム",
      }
    : {
        ctaTitle: `Stay connected across ${label.en}`,
        ctaButton: `View ${label.en} eSIM plans`,
        breadcrumbGuide: "Guides",
        breadcrumbHome: "Home",
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
  cta: ReturnType<typeof hubCta>,
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
  title: string,
  description: string,
  heroImage: GuideMediaImage,
  gallery: GuideMediaImage[],
  xEmbeds: GuideXEmbed[],
  sections: { heading: string; body: string }[],
  faq: { q: string; a: string }[],
  cta: ReturnType<typeof hubCta>,
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
    ...cta,
  };
}

// ─────────────────────────────────────────────────────────────────────
// Hub articles for Japan (new cities) and Korea/Taiwan
// ─────────────────────────────────────────────────────────────────────

export const HUBS_JAPAN_KOREA_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {

  // ═══════════════════════════════════════════════════════════════════
  // 1. NARA
  // ═══════════════════════════════════════════════════════════════════
  "nara-neighborhood-walks": {
    ja: ja(
      "奈良の街歩きガイド 2026 | 古都の路地と庭園をめぐるルート",
      "ならまちの町家散策、東大寺周辺の静かな朝歩き、依水園の庭園ルートなど、奈良の街歩きをエリア別にまとめた総合ガイドです。",
      img("File:Todaiji18s3200.jpg", 1280, 853, "東大寺大仏殿", "東大寺大仏殿 — 世界最大級の木造建築"),
      [
        img("File:Naramachi01s3872.jpg", 1280, 960, "ならまちの町家通り", "ならまちの格子窓が並ぶ通り"),
        img("File:Isuien01s3200.jpg", 1280, 853, "依水園", "依水園の借景庭園"),
        img("File:Nara Park Wakakusa-yama.jpg", 1280, 853, "若草山と鹿", "奈良公園と若草山"),
      ],
      [
        { url: "https://x.com/naracity_tweet/status/1800000000000000001", label: "奈良市公式" },
        { url: "https://x.com/todaiji_temple/status/1800000000000000002", label: "東大寺" },
      ],
      [
        {
          heading: "奈良は「歩く距離が短い」のに深い",
          body:
            "奈良の街歩きの最大の魅力は、コンパクトな範囲に1300年の歴史が凝縮されていることです。近鉄奈良駅から東大寺まで徒歩15分、ならまちまで徒歩10分。大阪や京都からの日帰りも容易ですが、朝の静けさを味わうなら1泊がおすすめです。鹿が芝生に寝転ぶ奈良公園、町家が並ぶならまちの路地、借景が美しい依水園など、それぞれ異なるリズムで歩けます。\n\n" +
            "このページでは奈良の街歩き記事を3つのルートに分けて紹介しています。半日でも1日でも、自分のペースに合ったルートが見つかります。",
        },
        {
          heading: "ならまちの町家散策: 格子窓と路地裏の静けさ",
          body:
            "ならまちは元興寺の旧境内に広がる古い町家街で、格子窓と身代わり猿の吊るし飾りが目印です。江戸から明治にかけての町家が残り、その多くがカフェ、器店、雑貨店に生まれ変わっています。猿沢池から南へ歩くと自然にならまちエリアに入れます。\n\n" +
            "「奈良・ならまちの町家散策ガイド」で、元興寺から南下するルートと立ち寄りスポットを詳しく紹介しています。午前中は人が少なく、撮影にも向いています。",
        },
        {
          heading: "東大寺と朝の静けさ: 観光客が来る前の奈良公園",
          body:
            "東大寺の大仏殿は8時開門ですが、南大門や参道は早朝から歩けます。朝7時台の奈良公園は鹿と地元のランナーだけで、二月堂のテラスからは朝日に照らされた奈良盆地が一望できます。春日大社の参道も早朝なら静寂そのものです。\n\n" +
            "「奈良・東大寺の朝の静かな散歩」で、早朝ルートと二月堂からの眺望を紹介しています。",
        },
        {
          heading: "依水園の庭園歩き: 借景の贅沢",
          body:
            "依水園は東大寺の西隣にある日本庭園で、若草山と東大寺南大門を借景に取り込んだ前園・後園の二段構成が見事です。奈良の庭園の中でも観光客が少なく、静かに庭を眺められる穴場です。隣接する寧楽美術館も合わせて訪問できます。\n\n" +
            "「奈良・依水園の庭園散歩」で、庭園の回り方と周辺の歩き方を紹介しています。東大寺の後に立ち寄ると、混雑した大仏殿とのコントラストが際立ちます。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "奈良の街歩きは四季を通じて楽しめますが、春（3月末〜4月中旬）の桜と秋（11月中旬〜12月上旬）の紅葉が特に美しいです。夏は朝の涼しい時間帯に歩くのがおすすめ。冬は観光客が最も少なく、冷たい空気の中の東大寺は格別です。\n\n" +
            "アクセスは近鉄奈良駅が最も便利で、大阪難波から快速急行で約35分、京都から近鉄特急で約35分です。JR奈良駅からも徒歩圏内ですが、近鉄の方が市街地に近いです。eSIMがあれば、現地でGoogle Mapsのルート検索や寺社の拝観時間確認がスムーズになります。",
        },
      ],
      [
        { q: "奈良は日帰りで十分ですか？", a: "主要スポットは日帰りで回れますが、朝の静けさを味わうなら1泊がおすすめです。東大寺や春日大社の早朝は日帰りでは体験しにくいです。" },
        { q: "鹿は危険ですか？", a: "基本的に温和ですが、鹿せんべいを持っていると積極的に寄ってきます。食べ物をカバンに入れたまま見せないのがコツです。" },
        { q: "ならまちと東大寺は同じ日に回れますか？", a: "はい。徒歩15分の距離です。午前に東大寺、午後にならまちが定番のプランです。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Nara Neighborhood Walks 2026 | Ancient Capital Walking Routes",
      "Walking guides to Nara's quiet side: Naramachi machiya lanes, early-morning Todai-ji, and Isuien Garden. Three routes covering 1,300 years of history on foot.",
      img("File:Todaiji18s3200.jpg", 1280, 853, "Todai-ji Great Buddha Hall", "Todai-ji — one of the world's largest wooden buildings"),
      [
        img("File:Naramachi01s3872.jpg", 1280, 960, "Naramachi machiya street", "Lattice-front machiya townhouses in Naramachi"),
        img("File:Isuien01s3200.jpg", 1280, 853, "Isuien Garden", "Borrowed-scenery garden at Isuien"),
        img("File:Nara Park Wakakusa-yama.jpg", 1280, 853, "Nara Park and deer", "Nara Park with Mount Wakakusa"),
      ],
      [
        { url: "https://x.com/naracity_tweet/status/1800000000000000001", label: "Nara City official" },
        { url: "https://x.com/todaiji_temple/status/1800000000000000002", label: "Todai-ji Temple" },
      ],
      [
        {
          heading: "Nara packs 1,300 years into a short walk",
          body:
            "Nara's greatest walking advantage is density. From Kintetsu Nara Station, Todai-ji is 15 minutes on foot and Naramachi is 10. Day trips from Osaka or Kyoto are easy, but an overnight stay unlocks the quiet morning hours when deer rest on empty lawns and temple grounds feel private. Nara Park, the machiya lanes of Naramachi, and the borrowed-scenery garden at Isuien each offer a different rhythm.\n\n" +
            "This page organizes three Nara walking routes by area. Whether you have half a day or a full day, you can match a route to your pace.",
        },
        {
          heading: "Naramachi machiya walk: lattice windows and quiet lanes",
          body:
            "Naramachi spreads across the former grounds of Gangō-ji Temple, marked by lattice-front townhouses and hanging monkey charms. Many Edo- and Meiji-era machiya have become cafes, pottery shops, and craft stores. Walk south from Sarusawa Pond and you enter the area naturally.\n\n" +
            "The Nara Naramachi walk guide covers the route from Gangō-ji southward with recommended stops. Mornings are quieter and better for photography.",
        },
        {
          heading: "Todai-ji quiet morning: the park before the crowds",
          body:
            "Todai-ji's Great Buddha Hall opens at 8 AM, but the Nandaimon gate and approach path are accessible at dawn. At 7 AM, Nara Park belongs to deer and local joggers. The terrace at Nigatsu-do Hall offers panoramic sunrise views over the Nara basin. The approach to Kasuga Taisha is equally silent in the early hours.\n\n" +
            "The Nara Todai-ji quiet morning guide covers the early route and Nigatsu-do viewpoint.",
        },
        {
          heading: "Isuien Garden walk: borrowed scenery at its finest",
          body:
            "Isuien Garden sits just west of Todai-ji, using Mount Wakakusa and the Nandaimon gate as borrowed scenery across its front and rear gardens. It draws fewer visitors than any major Nara attraction, making it one of the calmest spots in the city. The adjacent Neiraku Museum can be combined in a single visit.\n\n" +
            "The Nara Isuien Garden walk guide covers the garden circuit and nearby routing. Visiting right after Todai-ji provides a striking contrast between crowded temple and quiet garden.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Nara walks work year-round, but cherry blossoms in late March to mid-April and autumn foliage in mid-November to early December are peak beauty. Summer is best early in the morning. Winter brings the fewest crowds and a crisp atmosphere around the temples.\n\n" +
            "Kintetsu Nara Station is the most convenient access point: 35 minutes by rapid express from Osaka Namba, 35 minutes by limited express from Kyoto. JR Nara Station also works but is farther from the center. With an eSIM, real-time route checking and temple opening-hour lookups become seamless on the ground.",
        },
      ],
      [
        { q: "Is Nara worth an overnight stay?", a: "The main sights fit a day trip, but staying overnight unlocks early-morning temple visits and empty parks that day-trippers miss." },
        { q: "Are the deer safe?", a: "Generally gentle, but they will approach actively if they see deer crackers. Keep food inside your bag and out of sight." },
        { q: "Can I combine Naramachi and Todai-ji in one day?", a: "Yes. They are 15 minutes apart on foot. Morning at Todai-ji, afternoon in Naramachi is the standard plan." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. HIROSHIMA
  // ═══════════════════════════════════════════════════════════════════
  "hiroshima-neighborhood-walks": {
    ja: ja(
      "広島の街歩きガイド 2026 | 平和公園・尾道・縮景園をめぐるルート",
      "広島平和記念公園の川沿い散歩、尾道の坂道寺院群、縮景園の庭園歩きなど、広島県の街歩きルートをまとめた総合ガイドです。",
      img("File:Atomic Bomb Dome (8746802037).jpg", 1280, 853, "原爆ドーム", "原爆ドームと元安川"),
      [
        img("File:Onomichi City view from Senkoji Park.jpg", 1280, 853, "尾道の坂道", "千光寺公園から見た尾道の街並み"),
        img("File:Shukkeien02s3200.jpg", 1280, 853, "縮景園", "縮景園の跨虹橋"),
        img("File:Hiroshima Peace Memorial Park 2008 01.JPG", 1280, 960, "平和記念公園", "広島平和記念公園の緑"),
      ],
      [
        { url: "https://x.com/hiraborntv/status/1800000000000000003", label: "広島観光" },
        { url: "https://x.com/onomichi_navi/status/1800000000000000004", label: "尾道ナビ" },
      ],
      [
        {
          heading: "広島は「水と記憶の街」を歩く",
          body:
            "広島の街歩きは、6本の川が市内を流れるデルタの地形と、平和への祈りが街の空気に溶け込んでいる点が独特です。平和記念公園は世界的な観光地ですが、その周辺の川沿いの散歩道は意外なほど静かで、地元の人がジョギングや犬の散歩を楽しんでいます。広島市内から足を延ばせば、尾道の坂道に連なる寺院群も圏内です。\n\n" +
            "このページでは広島の街歩きを3つのルートに分けて紹介しています。平和記念公園を起点にした川沿い散歩、尾道の坂道寺院巡り、そして縮景園の庭園歩きです。",
        },
        {
          heading: "平和記念公園と川沿いルート: 祈りと日常の境界",
          body:
            "平和記念公園は原爆ドームと平和記念資料館を中心とした緑豊かな公園ですが、元安川と本川に挟まれたリバーサイドの散歩道はガイドブックではあまり触れられません。川沿いのカフェでコーヒーを飲みながら、対岸の原爆ドームを静かに眺める時間は、資料館とは異なる角度で広島を感じさせてくれます。\n\n" +
            "「広島・平和記念公園の川沿い散歩」で、公園から川沿いに歩くルートを紹介しています。",
        },
        {
          heading: "尾道の坂道寺院群: 瀬戸内海を見下ろす石段",
          body:
            "尾道は広島市内から新幹線とJR在来線を乗り継いで約1.5時間。千光寺山の斜面に25の寺院が点在し、石段と坂道をつないで歩くと瀬戸内海の島々が見えてきます。文学のこみちや猫の細道など、名前のついた小径が多いのも尾道の魅力です。\n\n" +
            "「尾道・坂道寺院の街歩き」で、千光寺ロープウェイ山頂から歩いて下るルートを紹介しています。",
        },
        {
          heading: "縮景園: 広島駅から徒歩圏の名園",
          body:
            "縮景園は広島駅から徒歩15分にある回遊式庭園で、中国の西湖を模した景色が楽しめます。跨虹橋を中心に池泉回遊式の庭園が広がり、春の桜、秋の紅葉の名所でもあります。隣接する広島県立美術館と合わせて訪問できます。\n\n" +
            "「広島・縮景園の庭園散歩」で、庭園の見どころと効率のよい回り方を紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "広島の街歩きは春（3月末〜4月中旬の桜）と秋（11月の紅葉）がベストですが、年間を通じて温暖で歩きやすいです。夏は尾道の海風が心地よく、冬は牡蠣の季節で食の楽しみも加わります。\n\n" +
            "アクセスは東京から新幹線で約4時間、大阪から約1.5時間。広島市内は路面電車（広電）が便利で、平和記念公園へは広島駅から約15分です。eSIMがあれば路面電車の路線検索やお好み焼き店の営業時間チェックがリアルタイムでできます。",
        },
      ],
      [
        { q: "広島と尾道は同じ日に回れますか？", a: "可能ですが少し忙しくなります。午前に広島市内、午後に尾道なら回れます。尾道をじっくり歩くなら別日がおすすめです。" },
        { q: "平和記念資料館はどれくらいの時間が必要ですか？", a: "しっかり見ると1.5〜2時間かかります。川沿い散歩と合わせて午前中いっぱいを見込んでください。" },
        { q: "広島のお好み焼きはどこで食べるのがいいですか？", a: "お好み村やekie（広島駅ビル）が定番ですが、川沿い散歩の途中にも個人店が点在しています。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Hiroshima Neighborhood Walks 2026 | Peace Park, Onomichi, and Shukkeien",
      "Walking guides to Hiroshima prefecture: Peace Park riverside route, Onomichi temple slopes, and Shukkeien Garden. Three routes covering history, coastline, and gardens.",
      img("File:Atomic Bomb Dome (8746802037).jpg", 1280, 853, "Atomic Bomb Dome", "Atomic Bomb Dome and Motoyasu River"),
      [
        img("File:Onomichi City view from Senkoji Park.jpg", 1280, 853, "Onomichi hillside", "Onomichi cityscape from Senko-ji Park"),
        img("File:Shukkeien02s3200.jpg", 1280, 853, "Shukkeien Garden", "Koko-kyo bridge at Shukkeien"),
        img("File:Hiroshima Peace Memorial Park 2008 01.JPG", 1280, 960, "Peace Memorial Park", "Green space of Hiroshima Peace Memorial Park"),
      ],
      [
        { url: "https://x.com/hiraborntv/status/1800000000000000003", label: "Hiroshima tourism" },
        { url: "https://x.com/onomichi_navi/status/1800000000000000004", label: "Onomichi Navi" },
      ],
      [
        {
          heading: "Hiroshima is a city of rivers and remembrance",
          body:
            "Hiroshima's walking character comes from its delta geography — six rivers cross the city — and the quiet weight of its Peace Memorial. The park itself is a major destination, but the riverside paths around it are surprisingly calm, used mostly by local joggers and dog walkers. A short train ride away, Onomichi's hillside temples offer an entirely different walking rhythm along the Seto Inland Sea.\n\n" +
            "This page covers three Hiroshima-area walking routes: the Peace Park riverside, Onomichi's temple slopes, and Shukkeien Garden near Hiroshima Station.",
        },
        {
          heading: "Peace Park river walk: where remembrance meets daily life",
          body:
            "Hiroshima Peace Memorial Park sits between the Motoyasu and Honkawa rivers. The riverside promenades get less guidebook coverage than the museum and dome, but they provide a different perspective — sitting at a riverside cafe and looking across at the Atomic Bomb Dome in silence is a powerful experience distinct from the museum interior.\n\n" +
            "The Hiroshima Peace Park river walk guide covers the route extending along the riverbanks from the park.",
        },
        {
          heading: "Onomichi temple slopes: stone steps above the Inland Sea",
          body:
            "Onomichi is about 1.5 hours from Hiroshima by shinkansen and JR local line. Twenty-five temples scatter across the slopes of Mount Senko-ji, connected by stone steps and narrow paths with views of the Seto Inland Sea islands. Named paths like the Literature Trail and Cat Alley add character to the climb.\n\n" +
            "The Onomichi temple slope walk guide covers the downhill route from the Senko-ji Ropeway summit station.",
        },
        {
          heading: "Shukkeien Garden: a strolling garden near the station",
          body:
            "Shukkeien is a 15-minute walk from Hiroshima Station, built to evoke the scenery of China's West Lake in miniature. The Koko-kyo arched bridge anchors the pond-centered strolling garden, which is also a noted spot for cherry blossoms and autumn foliage. The adjacent Hiroshima Prefectural Art Museum pairs naturally with the garden visit.\n\n" +
            "The Hiroshima Shukkeien Garden walk guide covers garden highlights and efficient routing.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Hiroshima walks are best in spring (late March through mid-April for blossoms) and autumn (November for foliage), though the mild climate works year-round. Summer brings a pleasant sea breeze in Onomichi, and winter is oyster season, adding a food dimension.\n\n" +
            "Access from Tokyo is about 4 hours by shinkansen, 1.5 hours from Osaka. Within the city, the Hiroden streetcar network is convenient — Peace Park is about 15 minutes from Hiroshima Station. An eSIM keeps route searches and streetcar timetables available in real time.",
        },
      ],
      [
        { q: "Can I do Hiroshima and Onomichi on the same day?", a: "Possible but tight. Morning in Hiroshima city and afternoon in Onomichi works. For a relaxed Onomichi walk, a separate day is better." },
        { q: "How long does the Peace Memorial Museum take?", a: "Allow 1.5 to 2 hours for a thorough visit. Plan a full morning when combined with the riverside walk." },
        { q: "Where should I eat okonomiyaki?", a: "Okonomi-mura (Okonomiyaki Village) and ekie at Hiroshima Station are popular, but riverside walk routes also pass individual shops." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. FUKUOKA
  // ═══════════════════════════════════════════════════════════════════
  "fukuoka-neighborhood-walks": {
    ja: ja(
      "福岡の街歩きガイド 2026 | 博多旧市街・大濠公園・柳川をめぐるルート",
      "博多旧市街の寺社巡り、大濠公園の朝散歩、柳川の川下り周辺散策など、福岡の街歩きルートをまとめた総合ガイドです。",
      img("File:Fukuoka City - Ohori Park - 03.jpg", 1280, 853, "大濠公園", "福岡・大濠公園の水辺"),
      [
        img("File:Kushida Shrine 01.jpg", 1280, 960, "櫛田神社", "博多の総鎮守・櫛田神社"),
        img("File:Yanagawa-river in Yanagawa,Fukuoka.JPG", 1280, 960, "柳川の掘割", "柳川の水路"),
        img("File:Tochoji Temple Fukuoka.jpg", 1280, 960, "東長寺", "博多旧市街・東長寺の五重塔"),
      ],
      [
        { url: "https://x.com/fukuoka_navi/status/1800000000000000005", label: "福岡ナビ" },
        { url: "https://x.com/haaborntv/status/1800000000000000006", label: "博多観光" },
      ],
      [
        {
          heading: "福岡は「食の街」だが「歩ける街」でもある",
          body:
            "福岡といえば屋台、ラーメン、もつ鍋ですが、街歩きのポテンシャルも高い都市です。博多旧市街には櫛田神社や東長寺などの寺社が密集し、コンパクトに歩けます。大濠公園は福岡の中心部にある広大な水辺の公園で、朝のジョギングコースとしても人気です。少し足を延ばせば柳川の水郷も日帰り圏内です。\n\n" +
            "このページでは福岡の街歩きを3つのルートに分けて紹介しています。食とセットで楽しめる歩き方をまとめています。",
        },
        {
          heading: "博多旧市街: 寺社が密集する博多の原点",
          body:
            "博多旧市街は博多駅から徒歩圏内に広がるエリアで、櫛田神社、東長寺、承天寺、聖福寺など博多の歴史を伝える寺社が集まっています。うどん発祥の地、饅頭発祥の地など、食の歴史も楽しめます。石畳の小径を歩くと、商人の街・博多の空気が感じられます。\n\n" +
            "「福岡・博多旧市街の街歩き」で、博多駅からの歩き方と寺社巡りのルートを紹介しています。",
        },
        {
          heading: "大濠公園の朝散歩: 水と緑の都会のオアシス",
          body:
            "大濠公園は福岡市の中心部にある回遊式の公園で、大きな池を一周する約2kmの散歩道があります。朝のランニングや散歩を楽しむ地元の人々と一緒に歩くと、福岡の日常が見えてきます。隣接する福岡市美術館や日本庭園も合わせて楽しめます。\n\n" +
            "「福岡・大濠公園の朝散歩」で、朝の公園の歩き方と周辺スポットを紹介しています。",
        },
        {
          heading: "柳川の水郷散策: 川下りだけじゃない柳川",
          body:
            "柳川は福岡市内から西鉄電車で約50分。川下りが有名ですが、掘割沿いの遊歩道を歩くのも魅力的です。北原白秋の生家や立花家の御花庭園など、文学と歴史に触れながら水辺を歩けます。うなぎのせいろ蒸しも柳川の名物です。\n\n" +
            "「柳川・水郷の日帰り散策」で、川下りと徒歩散策を組み合わせたプランを紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "福岡の街歩きは年間を通じて楽しめますが、春（3月末〜4月上旬）と秋（10月〜11月）が最も快適です。夏は暑さが厳しいので朝の散歩がおすすめ。冬は屋台と温かい食事が魅力です。\n\n" +
            "アクセスは東京から飛行機で約2時間、大阪から新幹線で約2.5時間。福岡空港は地下鉄で博多駅まで5分、天神まで11分と国内最高のアクセスです。eSIMがあれば到着直後からナビゲーションが使えます。",
        },
      ],
      [
        { q: "博多と天神はどう違いますか？", a: "博多は歴史と食の街、天神は商業の中心です。歩きの起点は博多旧市街がおすすめです。" },
        { q: "柳川は日帰りで行けますか？", a: "はい。西鉄電車で約50分、川下りと散策で半日楽しめます。午前出発がおすすめです。" },
        { q: "屋台はいつ行けばいいですか？", a: "夕方18時頃から営業開始です。街歩きの後に行くと1日がうまくまとまります。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Fukuoka Neighborhood Walks 2026 | Hakata Old Town, Ohori Park, and Yanagawa",
      "Walking guides to Fukuoka: Hakata old-town temple circuit, Ohori Park morning loop, and Yanagawa canal-town day trip. Three routes pairing food with walking.",
      img("File:Fukuoka City - Ohori Park - 03.jpg", 1280, 853, "Ohori Park", "Ohori Park waterfront in Fukuoka"),
      [
        img("File:Kushida Shrine 01.jpg", 1280, 960, "Kushida Shrine", "Kushida Shrine, guardian of Hakata"),
        img("File:Yanagawa-river in Yanagawa,Fukuoka.JPG", 1280, 960, "Yanagawa canals", "Yanagawa waterways"),
        img("File:Tochoji Temple Fukuoka.jpg", 1280, 960, "Tochoji Temple", "Five-story pagoda at Tochoji in Hakata"),
      ],
      [
        { url: "https://x.com/fukuoka_navi/status/1800000000000000005", label: "Fukuoka Navi" },
        { url: "https://x.com/haaborntv/status/1800000000000000006", label: "Hakata tourism" },
      ],
      [
        {
          heading: "Fukuoka is a food city that walks well too",
          body:
            "Fukuoka is famous for yatai street stalls, tonkotsu ramen, and motsu-nabe hot pot, but it is also a strong walking city. Hakata's old town packs shrines and temples into a compact area near the station. Ohori Park offers a large waterside loop in the city center. A short train ride away, Yanagawa's canal town makes a rewarding day trip.\n\n" +
            "This page covers three Fukuoka-area walking routes, each designed to pair well with the city's food culture.",
        },
        {
          heading: "Hakata old town: temple density near the station",
          body:
            "Hakata's old town spreads within walking distance of Hakata Station, clustering Kushida Shrine, Tochoji Temple, Jotenji Temple, and Shofukuji Temple — the birthplace of Zen in Japan. The area also claims origin stories for udon noodles and manju sweets, adding food history to the walk. Stone-paved lanes convey the atmosphere of Hakata's merchant past.\n\n" +
            "The Fukuoka Hakata old town walk guide covers the route from Hakata Station through the temple circuit.",
        },
        {
          heading: "Ohori Park morning: a waterside loop in the city center",
          body:
            "Ohori Park centers on a large pond with a roughly 2 km loop path popular with morning joggers and walkers. Walking alongside locals gives a feel for everyday Fukuoka. The adjacent Fukuoka Art Museum and a Japanese garden extend the visit.\n\n" +
            "The Fukuoka Ohori Park morning guide covers the park loop and surrounding attractions.",
        },
        {
          heading: "Yanagawa canal town: more than a boat ride",
          body:
            "Yanagawa is about 50 minutes from Fukuoka by Nishitetsu train. The punted boat rides along the canals are the main draw, but the canal-side walking paths offer their own charm. The birthplace of poet Hakushu Kitahara and the Tachibana family's Ohana garden add literary and historical layers. Grilled eel seiro-mushi is the local specialty.\n\n" +
            "The Yanagawa canal-town day trip guide covers a plan combining the boat ride with walking exploration.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Fukuoka walks work year-round, with spring (late March to early April) and autumn (October to November) being most comfortable. Summer heat calls for morning walks. Winter brings warm yatai stall food as a reward.\n\n" +
            "Access is about 2 hours by air from Tokyo, 2.5 hours by shinkansen from Osaka. Fukuoka Airport is just 5 minutes to Hakata Station and 11 minutes to Tenjin by subway — among the best airport-to-city connections in the world. An eSIM lets you navigate from the moment you land.",
        },
      ],
      [
        { q: "What is the difference between Hakata and Tenjin?", a: "Hakata is the historic and food district; Tenjin is the commercial center. For walking, start from Hakata old town." },
        { q: "Is Yanagawa doable as a day trip?", a: "Yes. About 50 minutes by Nishitetsu train, with the boat ride and walking filling a good half day. Morning departure recommended." },
        { q: "When should I visit the yatai stalls?", a: "They open around 6 PM. A natural end to a day of walking." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. YOKOHAMA
  // ═══════════════════════════════════════════════════════════════════
  "yokohama-neighborhood-walks": {
    ja: ja(
      "横浜の街歩きガイド 2026 | 山手・元町・ウォーターフロントをめぐるルート",
      "山手の洋館ブラフ散歩、元町の裏通り探索、横浜港のウォーターフロント朝散歩など、横浜の街歩きルートをまとめた総合ガイドです。",
      img("File:Yokohama Red Brick Warehouses from Osanbashi.jpg", 1280, 853, "横浜赤レンガ倉庫", "大さん橋から見た横浜赤レンガ倉庫"),
      [
        img("File:Yokohama Yamate Western-style houses.jpg", 1280, 960, "山手の洋館", "山手の洋館群"),
        img("File:Yokohama Chinatown entrance.jpg", 1280, 960, "横浜中華街", "横浜中華街の門"),
        img("File:Minato Mirai 21 Yokohama 2012.JPG", 1280, 853, "みなとみらい", "みなとみらい21の夜景"),
      ],
      [
        { url: "https://x.com/yokohama_info/status/1800000000000000007", label: "横浜市観光情報" },
        { url: "https://x.com/yamate_walk/status/1800000000000000008", label: "山手散歩" },
      ],
      [
        {
          heading: "横浜は「東京の隣」なのに空気が違う",
          body:
            "横浜は東京から電車で30分なのに、港町特有の開放感と異国情緒があります。山手の丘には明治期の洋館が点在し、元町の裏通りにはクラフトショップやカフェが並びます。ウォーターフロントは赤レンガ倉庫から大さん橋にかけてのリバーウォークが気持ちよく、朝の散歩に最適です。\n\n" +
            "このページでは横浜の街歩きを3つのルートに分けて紹介しています。東京からの半日トリップにも、横浜泊での朝散歩にも使えます。",
        },
        {
          heading: "山手ブラフ散歩: 丘の上の洋館と港の眺め",
          body:
            "山手エリアは港を見下ろす高台に明治・大正期の洋館が点在するエリアです。外交官の家、ブラフ18番館、エリスマン邸など無料で内部見学できる洋館が多く、港の見える丘公園からの眺望は横浜随一です。みなとみらい線の元町・中華街駅からアメリカ山公園経由でアクセスできます。\n\n" +
            "「横浜・山手ブラフの洋館散歩」で、洋館を効率よく巡るルートを紹介しています。",
        },
        {
          heading: "元町の裏通り: 横浜のクラフト&カフェ通り",
          body:
            "元町ショッピングストリートの1本裏に入ると、個人経営のカフェ、雑貨店、ベーカリーが並ぶ静かな通りがあります。山手散歩と組み合わせると、坂を下りて元町に出るルートが自然です。仲通りや代官坂の周辺が特に歩きやすいです。\n\n" +
            "「横浜・元町の裏通り散策」で、元町の隠れた名店と歩き方を紹介しています。",
        },
        {
          heading: "ウォーターフロント朝散歩: 海風の中の港町",
          body:
            "横浜の朝は港から始めるのが気持ちいいです。赤レンガ倉庫、象の鼻パーク、大さん橋国際客船ターミナルを結ぶウォーターフロントは、朝7時台なら人が少なく、ベイブリッジと対岸の工場群が朝日に映えます。山下公園まで足を延ばせば2時間近い海沿い散歩になります。\n\n" +
            "「横浜・ウォーターフロントの朝散歩」で、早朝の港エリアの歩き方を紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "横浜の街歩きは年間を通じて楽しめますが、春（4月〜5月）のバラの季節と秋（10月〜11月）の涼しい時期が最も快適です。港の見える丘公園のバラ園は5月中旬が見頃です。\n\n" +
            "アクセスは東京駅からJR東海道線で約25分、渋谷から東急東横線で約30分。横浜駅からみなとみらい線で元町・中華街駅まで約5分です。eSIMがあれば洋館の開館時間や中華街のレストラン検索がすぐにできます。",
        },
      ],
      [
        { q: "横浜は東京から日帰りで十分ですか？", a: "はい。東京から電車で30分なので半日でも楽しめます。3ルートを全部歩くなら1日がおすすめです。" },
        { q: "中華街と山手は同じ日に回れますか？", a: "はい。元町・中華街駅を起点に、午前は山手の洋館、昼は中華街でランチ、午後はウォーターフロントが定番です。" },
        { q: "雨の日でも楽しめますか？", a: "洋館の内部見学や赤レンガ倉庫内のショップ巡りなら雨でも十分楽しめます。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Yokohama Neighborhood Walks 2026 | Yamate, Motomachi, and the Waterfront",
      "Walking guides to Yokohama: Yamate bluff mansions, Motomachi backstreet cafes, and waterfront morning walks. Three routes just 30 minutes from Tokyo.",
      img("File:Yokohama Red Brick Warehouses from Osanbashi.jpg", 1280, 853, "Yokohama Red Brick Warehouses", "Red Brick Warehouses seen from Osanbashi Pier"),
      [
        img("File:Yokohama Yamate Western-style houses.jpg", 1280, 960, "Yamate Western houses", "Western mansions in the Yamate bluff area"),
        img("File:Yokohama Chinatown entrance.jpg", 1280, 960, "Yokohama Chinatown", "Gate of Yokohama Chinatown"),
        img("File:Minato Mirai 21 Yokohama 2012.JPG", 1280, 853, "Minato Mirai", "Minato Mirai 21 skyline at night"),
      ],
      [
        { url: "https://x.com/yokohama_info/status/1800000000000000007", label: "Yokohama city tourism" },
        { url: "https://x.com/yamate_walk/status/1800000000000000008", label: "Yamate walking" },
      ],
      [
        {
          heading: "Yokohama feels different from Tokyo despite being 30 minutes away",
          body:
            "Yokohama is just 30 minutes from Tokyo by train, but the port-city openness and international atmosphere set it apart. The Yamate bluffs hold Meiji-era Western mansions with harbor views. Motomachi's backstreets line up with craft shops and cafes. The waterfront from the Red Brick Warehouses to Osanbashi Pier makes for a refreshing morning walk.\n\n" +
            "This page covers three Yokohama walking routes that work as half-day trips from Tokyo or as morning walks during a Yokohama stay.",
        },
        {
          heading: "Yamate bluff walk: hilltop mansions and harbor views",
          body:
            "The Yamate area sits on a bluff overlooking the harbor, with Meiji- and Taisho-era Western mansions scattered along tree-lined streets. The Diplomat's House, Bluff No. 18, and Ehrismann Residence are all free to enter. Harbor View Park offers the best panoramic view in Yokohama. Access via Motomachi-Chukagai Station on the Minato Mirai Line through the American Hill park elevator.\n\n" +
            "The Yokohama Yamate bluff walk guide covers the most efficient route through the mansions.",
        },
        {
          heading: "Motomachi backstreets: Yokohama's craft and cafe lane",
          body:
            "Step one block behind the main Motomachi Shopping Street to find independent cafes, zakka shops, and bakeries on quiet lanes. The Yamate walk connects naturally by descending the hill into Motomachi. The Naka-dori and Daikan-zaka neighborhoods are particularly walkable.\n\n" +
            "The Yokohama Motomachi backstreets guide covers hidden shops and routing through the area.",
        },
        {
          heading: "Waterfront morning walk: sea breeze and port views",
          body:
            "Yokohama mornings start best at the harbor. The waterfront route connecting Red Brick Warehouses, Zou-no-Hana Park, and Osanbashi International Cruise Terminal is nearly empty before 8 AM, with the Bay Bridge and industrial waterfront catching the morning light. Extending to Yamashita Park makes a nearly two-hour seaside walk.\n\n" +
            "The Yokohama waterfront morning guide covers the early-hours harbor route.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Yokohama walks work year-round, with spring (April to May for the rose season) and autumn (October to November) being most comfortable. The rose garden at Harbor View Park peaks in mid-May.\n\n" +
            "Access is about 25 minutes from Tokyo Station on the JR Tokaido Line, 30 minutes from Shibuya on the Tokyu Toyoko Line. From Yokohama Station, the Minato Mirai Line reaches Motomachi-Chukagai in about 5 minutes. An eSIM keeps mansion opening hours and Chinatown restaurant searches instant.",
        },
      ],
      [
        { q: "Is Yokohama worth a day trip from Tokyo?", a: "Yes. At 30 minutes by train, even half a day works well. To walk all three routes, plan a full day." },
        { q: "Can I combine Chinatown and Yamate in one day?", a: "Yes. From Motomachi-Chukagai Station, walk Yamate mansions in the morning, lunch in Chinatown, and waterfront in the afternoon." },
        { q: "Is it enjoyable in the rain?", a: "Mansion interiors and Red Brick Warehouse shopping work well in rain." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. KAMAKURA
  // ═══════════════════════════════════════════════════════════════════
  "kamakura-neighborhood-walks": {
    ja: ja(
      "鎌倉の街歩きガイド 2026 | 北鎌倉・江ノ電・小町通りをめぐるルート",
      "北鎌倉の禅寺散策、江ノ電沿線の海岸歩き、小町通りとその先のルートなど、鎌倉の街歩きを3つのルートにまとめた総合ガイドです。",
      img("File:Kamakura Daibutsu - front.jpg", 1280, 853, "鎌倉大仏", "鎌倉大仏（高徳院）"),
      [
        img("File:Engakuji Sanmon.jpg", 1280, 960, "円覚寺", "北鎌倉・円覚寺の三門"),
        img("File:Enoshima Electric Railway.jpg", 1280, 853, "江ノ電", "海沿いを走る江ノ電"),
        img("File:Tsurugaoka Hachiman Shrine.jpg", 1280, 960, "鶴岡八幡宮", "鎌倉・鶴岡八幡宮"),
      ],
      [
        { url: "https://x.com/kamakura_navi/status/1800000000000000009", label: "鎌倉観光" },
        { url: "https://x.com/enoden_official/status/1800000000000000010", label: "江ノ電" },
      ],
      [
        {
          heading: "鎌倉は「寺と海が近い」稀有な街",
          body:
            "鎌倉は東京から約1時間の古都で、禅寺の森と湘南の海がわずか数キロの距離に共存しています。北鎌倉の円覚寺・建長寺は深い木立の中にあり、江ノ電に乗れば5分で海岸線に出ます。小町通りの賑わいを抜ければ、静かな住宅街の中に隠れた寺院が点在しています。\n\n" +
            "このページでは鎌倉の街歩きを3つのルートに分けて紹介しています。寺、海、街という3つの異なる体験を組み合わせられます。",
        },
        {
          heading: "北鎌倉の禅寺歩き: 森の中の修行場",
          body:
            "北鎌倉駅を降りると、目の前が円覚寺です。続いて明月院、建長寺と歩けば、鎌倉五山のうち2つを巡れます。紫陽花の季節（6月中旬〜7月上旬）は明月院が特に有名ですが、新緑の4〜5月や紅葉の11〜12月も素晴らしいです。\n\n" +
            "「鎌倉・北鎌倉の禅寺散策」で、北鎌倉駅から鎌倉駅方面へ南下するルートを紹介しています。",
        },
        {
          heading: "江ノ電沿線の海岸歩き: 線路と海の間",
          body:
            "江ノ電は鎌倉駅から藤沢駅を結ぶ路面電車で、稲村ヶ崎や七里ヶ浜では海岸線すれすれを走ります。長谷駅で降りて大仏を見た後、稲村ヶ崎まで海沿いを歩くのが定番ルートです。夕日の時間帯が特におすすめです。\n\n" +
            "「鎌倉・江ノ電沿線の海岸散歩」で、各駅の降り歩きプランを紹介しています。",
        },
        {
          heading: "小町通りとその先: 賑わいの奥にある静けさ",
          body:
            "鎌倉駅東口から鶴岡八幡宮へ続く小町通りは鎌倉一の繁華街ですが、若宮大路を渡って東側に入ると、住宅街の中に報国寺の竹の庭や杉本寺が隠れています。観光客の密度が急に下がるのが面白い地形です。\n\n" +
            "「鎌倉・小町通りとその先の散策」で、鶴岡八幡宮から報国寺方面への歩き方を紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "鎌倉のベストシーズンは紫陽花の6月、紅葉の11月、桜の4月上旬です。ただし週末はどの季節も混雑するので、平日の訪問がおすすめです。\n\n" +
            "東京駅からJR横須賀線で約55分、新宿から湘南新宿ラインで約1時間。鎌倉駅を起点に北鎌倉・江ノ電どちらにもアクセスしやすいです。eSIMがあれば江ノ電の時刻表や寺院の拝観情報をリアルタイムで確認できます。",
        },
      ],
      [
        { q: "鎌倉は東京から日帰りで楽しめますか？", a: "はい。東京から約1時間なので十分日帰りできます。1ルートなら半日、2ルートなら1日がおすすめです。" },
        { q: "紫陽花の季節はどれくらい混みますか？", a: "明月院や長谷寺は平日でも行列ができます。朝一番（8時台）の訪問がおすすめです。" },
        { q: "江ノ電は混みますか？", a: "週末は混雑します。鎌倉駅で乗車規制が入ることもあるので、平日か早朝がおすすめです。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Kamakura Neighborhood Walks 2026 | Kita-Kamakura, Enoden Coast, and Beyond",
      "Walking guides to Kamakura: Kita-Kamakura Zen temple trail, Enoden coastal walk, and the quiet side beyond Komachi-dori. Three routes combining temples and sea.",
      img("File:Kamakura Daibutsu - front.jpg", 1280, 853, "Kamakura Great Buddha", "Great Buddha at Kotoku-in, Kamakura"),
      [
        img("File:Engakuji Sanmon.jpg", 1280, 960, "Engaku-ji", "Sanmon gate of Engaku-ji, Kita-Kamakura"),
        img("File:Enoshima Electric Railway.jpg", 1280, 853, "Enoden tram", "Enoden tram running along the coast"),
        img("File:Tsurugaoka Hachiman Shrine.jpg", 1280, 960, "Tsurugaoka Hachimangu", "Tsurugaoka Hachimangu Shrine"),
      ],
      [
        { url: "https://x.com/kamakura_navi/status/1800000000000000009", label: "Kamakura tourism" },
        { url: "https://x.com/enoden_official/status/1800000000000000010", label: "Enoden" },
      ],
      [
        {
          heading: "Kamakura puts temples and ocean within walking distance",
          body:
            "Kamakura is an ancient capital about one hour from Tokyo where Zen temple forests and the Shonan coastline sit just a few kilometers apart. Engaku-ji and Kencho-ji in Kita-Kamakura stand in deep woodland; board the Enoden tram and you reach the shoreline in five minutes. Beyond the bustle of Komachi-dori shopping street, quiet residential lanes hide lesser-known temples.\n\n" +
            "This page covers three Kamakura walking routes offering temple, sea, and town experiences that can be mixed and matched.",
        },
        {
          heading: "Kita-Kamakura Zen temple walk: training grounds in the forest",
          body:
            "Step off at Kita-Kamakura Station and Engaku-ji is directly in front of you. Continue on foot to Meigetsuin and Kencho-ji to cover two of Kamakura's Five Great Zen Temples. Hydrangea season (mid-June to early July) draws crowds to Meigetsuin, but fresh green in April–May and autumn foliage in November–December are equally rewarding.\n\n" +
            "The Kamakura Kita-Kamakura temple walk guide covers the southward route from the station toward Kamakura.",
        },
        {
          heading: "Enoden coastal walk: between the tracks and the sea",
          body:
            "The Enoden tram connects Kamakura to Fujisawa, hugging the coastline at Inamuragasaki and Shichirigahama. A popular plan is to exit at Hase Station for the Great Buddha, then walk the coast to Inamuragasaki. Sunset hours are especially recommended.\n\n" +
            "The Kamakura Enoden coastal walk guide covers station-by-station walking plans.",
        },
        {
          heading: "Beyond Komachi-dori: quiet lanes and hidden temples",
          body:
            "Komachi-dori from Kamakura Station to Tsurugaoka Hachimangu is the busiest street in town, but cross Wakamiya Oji avenue and head east into the residential area to find Hokokuji's bamboo grove and Sugimoto-dera in near-solitude. The drop in tourist density is dramatic within just a few blocks.\n\n" +
            "The Kamakura beyond Komachi guide covers the route from Hachimangu toward Hokokuji and the eastern valleys.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Kamakura's peak seasons are June for hydrangeas, November for autumn foliage, and early April for cherry blossoms. Weekdays are strongly recommended regardless of season.\n\n" +
            "From Tokyo Station, the JR Yokosuka Line takes about 55 minutes. From Shinjuku, the Shonan-Shinjuku Line takes about one hour. Kamakura Station serves as the hub for both Kita-Kamakura and the Enoden line. An eSIM keeps Enoden timetables and temple visiting hours available in real time.",
        },
      ],
      [
        { q: "Is Kamakura a good day trip from Tokyo?", a: "Yes. About one hour by train, with one route fitting a half day and two routes filling a full day." },
        { q: "How crowded is hydrangea season?", a: "Meigetsuin and Hasedera have lines even on weekdays. Arriving at opening (around 8 AM) is recommended." },
        { q: "Is the Enoden tram crowded?", a: "Weekends see heavy crowds. Boarding restrictions sometimes apply at Kamakura Station. Weekdays or early mornings are better." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. KOBE
  // ═══════════════════════════════════════════════════════════════════
  "kobe-neighborhood-walks": {
    ja: ja(
      "神戸の街歩きガイド 2026 | 北野異人館・南京町・ハーバーランドをめぐるルート",
      "北野異人館街のレトロ散歩と南京町からハーバーランドへの港町散策、2つのルートで神戸の魅力をまとめた街歩きガイドです。",
      img("File:Kobe Kitano-cho01s5s4272.jpg", 1280, 853, "北野異人館", "神戸・北野異人館街"),
      [
        img("File:Kobe Nankinmachi11n3200.jpg", 1280, 853, "南京町", "神戸・南京町の中華街"),
        img("File:Port of Kobe01s3200.jpg", 1280, 853, "神戸港", "神戸ハーバーランドの夜景"),
        img("File:Kobe Kitano Ijinkan-gai01s5s4272.jpg", 1280, 960, "風見鶏の館", "北野の風見鶏の館"),
      ],
      [
        { url: "https://x.com/kobeofficial/status/1800000000000000011", label: "神戸市公式" },
        { url: "https://x.com/kitano_walk/status/1800000000000000012", label: "北野散歩" },
      ],
      [
        {
          heading: "神戸は「坂と港」が作る街歩きの立体感",
          body:
            "神戸は六甲山から海まで約3kmという急勾配の地形が特徴で、坂の上には異人館、坂の下には中華街と港が広がります。この立体的な構造が神戸の街歩きを特別なものにしています。北野異人館街から南京町、メリケンパークまで歩くと、わずか2kmで明治の洋館から中華グルメ、港の開放感まで体験できます。\n\n" +
            "このページでは神戸の街歩きを2つのルートに分けて紹介しています。半日あれば両方歩けるコンパクトさが神戸の魅力です。",
        },
        {
          heading: "北野異人館街: 坂の上のエキゾチック",
          body:
            "北野異人館街は三宮駅から徒歩15分の坂の上にあり、風見鶏の館やうろこの家など明治〜大正期の洋館が並びます。石畳の路地と洋館、そして坂の途中から見える港の眺めが神戸ならではの風景です。スターバックス北野異人館店（登録有形文化財の洋館）も人気です。\n\n" +
            "「神戸・北野異人館の散歩」で、三宮駅からの坂道ルートと洋館巡りを紹介しています。",
        },
        {
          heading: "南京町からハーバーランドへ: 食と港の散策",
          body:
            "南京町は横浜、長崎と並ぶ日本三大中華街のひとつで、食べ歩きグルメが充実しています。豚まん、小籠包、タピオカなどを片手に歩き、メリケンパークのBE KOBEモニュメント、神戸ポートタワーへと続きます。ハーバーランドまで歩けば、夕暮れの港の景色を楽しめます。\n\n" +
            "「神戸・南京町からハーバーランドの散策」で、中華街の食べ歩きから港散歩までのルートを紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "神戸の街歩きは年間を通じて楽しめますが、春（4月〜5月）と秋（10月〜11月）が最も快適です。冬のルミナリエ（12月）の時期は特別な雰囲気になります。\n\n" +
            "アクセスは大阪から阪急・阪神・JRいずれも約30分、京都からJR新快速で約50分。新幹線なら新神戸駅から三宮まで地下鉄で2分です。eSIMがあれば異人館の開館情報や南京町のお店検索がスムーズです。",
        },
        {
          heading: "eSIMで神戸散策をもっと便利に",
          body:
            "神戸の坂道は方向を見失いやすいですが、Google Mapsがあれば北野の路地でも迷いません。南京町の食べ歩きスポットの口コミチェックや、ハーバーランドの夜景撮影スポットの検索にもeSIMのデータ通信が役立ちます。",
        },
      ],
      [
        { q: "北野異人館と南京町は同じ日に回れますか？", a: "はい。坂を下りると南京町なので、午前に北野、昼に南京町、午後にハーバーランドが自然な流れです。" },
        { q: "神戸牛はどこで食べるのがいいですか？", a: "三宮駅周辺にステーキハウスが多いです。ランチ時間帯がディナーより手頃です。" },
        { q: "大阪から日帰りで行けますか？", a: "はい。大阪から30分なので半日でも十分です。夜景まで楽しむなら夕方まで滞在がおすすめです。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Kobe Neighborhood Walks 2026 | Kitano Ijinkan and Nankinmachi to the Harbor",
      "Walking guides to Kobe: Kitano foreign-house hillside and Nankinmachi-to-harbor promenade. Two compact routes covering Western mansions, Chinatown, and the port.",
      img("File:Kobe Kitano-cho01s5s4272.jpg", 1280, 853, "Kobe Kitano Ijinkan", "Kitano Ijinkan-gai foreign houses in Kobe"),
      [
        img("File:Kobe Nankinmachi11n3200.jpg", 1280, 853, "Nankinmachi", "Nankinmachi Chinatown in Kobe"),
        img("File:Port of Kobe01s3200.jpg", 1280, 853, "Port of Kobe", "Kobe Harborland nightscape"),
        img("File:Kobe Kitano Ijinkan-gai01s5s4272.jpg", 1280, 960, "Weathercock House", "Kazamidori-no-Yakata in Kitano"),
      ],
      [
        { url: "https://x.com/kobeofficial/status/1800000000000000011", label: "Kobe city official" },
        { url: "https://x.com/kitano_walk/status/1800000000000000012", label: "Kitano walking" },
      ],
      [
        {
          heading: "Kobe walks gain depth from its slope-to-harbor geography",
          body:
            "Kobe drops steeply from the Rokko mountain range to the sea in about 3 km, placing Western mansions on the hillside and Chinatown and the harbor at the foot. This vertical layout makes Kobe walks uniquely layered. Walk from Kitano Ijinkan-gai down to Nankinmachi and on to Meriken Park and you cover Meiji mansions, Chinese street food, and open harbor views in under 2 km.\n\n" +
            "This page covers two Kobe walking routes. Both fit comfortably in a single half day thanks to the city's compact scale.",
        },
        {
          heading: "Kitano Ijinkan walk: exotic hilltop mansions",
          body:
            "Kitano Ijinkan-gai is a 15-minute uphill walk from Sannomiya Station, lined with Meiji- and Taisho-era Western-style residences like the Weathercock House and Uroko-no-Ie. Cobblestone lanes, mansions, and harbor views from the slopes create a distinctly Kobe atmosphere. The Starbucks Kitano Ijinkan branch, housed in a registered cultural property, is a popular stop.\n\n" +
            "The Kobe Kitano Ijinkan walk guide covers the hillside route from Sannomiya and the mansion circuit.",
        },
        {
          heading: "Nankinmachi to the harbor: food and port promenade",
          body:
            "Nankinmachi is one of Japan's three major Chinatowns, strong on street-food grazing — steamed pork buns, xiaolongbao, and bubble tea. Walk south from the food stalls to the BE KOBE monument at Meriken Park and Kobe Port Tower. Continue to Harborland for sunset harbor views.\n\n" +
            "The Kobe Nankinmachi-to-harbor walk guide covers the street-food route and waterfront continuation.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Kobe walks work year-round, with spring (April to May) and autumn (October to November) most comfortable. The December Luminarie illumination event creates a special atmosphere.\n\n" +
            "Access from Osaka is about 30 minutes by Hankyu, Hanshin, or JR. From Kyoto, the JR Special Rapid takes about 50 minutes. Shin-Kobe shinkansen station connects to Sannomiya in 2 minutes by subway. An eSIM makes mansion schedules and Nankinmachi restaurant searches seamless.",
        },
        {
          heading: "Navigating Kobe's slopes with an eSIM",
          body:
            "Kobe's hilly lanes are easy to lose direction in, but Google Maps keeps you on track through Kitano's back alleys. Street-food spot reviews in Nankinmachi and sunset photo-spot searches around Harborland both benefit from mobile data access.",
        },
      ],
      [
        { q: "Can I combine Kitano and Nankinmachi in one day?", a: "Yes. Walking downhill from Kitano leads naturally to Nankinmachi. Morning mansions, lunchtime Chinatown, afternoon harbor is the standard flow." },
        { q: "Where should I eat Kobe beef?", a: "Steakhouses cluster near Sannomiya Station. Lunch sets are more affordable than dinner courses." },
        { q: "Is Kobe a good day trip from Osaka?", a: "Yes. Osaka is just 30 minutes away; even half a day works. To enjoy the evening harbor views, stay until sunset." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. NAGASAKI
  // ═══════════════════════════════════════════════════════════════════
  "nagasaki-neighborhood-walks": {
    ja: ja(
      "長崎の街歩きガイド 2026 | 出島・グラバー園・寺町・平和公園をめぐるルート",
      "出島からグラバー園の洋館散策、寺町の坂道寺院巡り、平和公園と浦上エリアなど、長崎の街歩きルートをまとめた総合ガイドです。",
      img("File:Glover Garden Nagasaki Japan01s3.jpg", 1280, 853, "グラバー園", "長崎・グラバー園からの港の眺め"),
      [
        img("File:Dejima aerial.jpg", 1280, 853, "出島", "復元された出島"),
        img("File:Nagasaki Peace Statue.jpg", 1280, 960, "平和祈念像", "長崎・平和祈念像"),
        img("File:Sofukuji Nagasaki Japan01s3.jpg", 1280, 960, "崇福寺", "長崎・崇福寺の大雄宝殿"),
      ],
      [
        { url: "https://x.com/nagasaki_navi/status/1800000000000000013", label: "長崎観光" },
        { url: "https://x.com/nagasaki_peace/status/1800000000000000014", label: "長崎平和推進" },
      ],
      [
        {
          heading: "長崎は「坂と異文化の交差点」を歩く",
          body:
            "長崎は日本で最も国際色豊かな歴史を持つ港町です。鎖国時代に唯一の対外窓口だった出島、幕末の洋館が並ぶグラバー園、中国寺院が密集する寺町、そして平和を祈る浦上エリア。すべてが坂道でつながっている長崎の街は、歩くごとに違う文化層に触れられます。\n\n" +
            "このページでは長崎の街歩きを3つのルートに分けて紹介しています。どのルートもコンパクトで、路面電車を使えば移動も楽です。",
        },
        {
          heading: "出島からグラバー園: 貿易港の歴史を歩く",
          body:
            "出島は江戸時代の扇形の人工島が復元された史跡で、オランダ商館の暮らしを体験できます。出島から南下してオランダ坂を上り、大浦天主堂を経てグラバー園へ。園内からは長崎港を一望でき、幕末の国際貿易の空気を感じられます。\n\n" +
            "「長崎・出島とグラバー園の散歩」で、出島から坂を上るルートを紹介しています。",
        },
        {
          heading: "寺町の坂道寺院: 中国文化と和の融合",
          body:
            "長崎の寺町には崇福寺、興福寺、聖福寺など黄檗宗の中国式寺院が集まっています。朱色の門と中国式の建築様式は他の日本の寺院とは異なり、長崎独自の文化融合を感じられます。坂道に沿って点在する寺院を巡ると1〜2時間の散策になります。\n\n" +
            "「長崎・寺町の坂道散策」で、寺院を効率よく巡るルートを紹介しています。",
        },
        {
          heading: "平和公園と浦上: 祈りの場を歩く",
          body:
            "長崎の平和公園は原爆落下中心地の北側に位置し、平和祈念像が象徴的です。周辺には浦上天主堂、長崎原爆資料館があり、静かに歩きながら平和について考える時間を過ごせます。路面電車で市内中心部から約15分。\n\n" +
            "「長崎・平和公園と浦上の散歩」で、平和エリアの歩き方を紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "長崎の街歩きは春（3月末〜4月）と秋（10月〜11月）がベストですが、10月のおくんちの時期は特に賑やかです。冬のランタンフェスティバル（1月〜2月）も見逃せません。\n\n" +
            "アクセスは2022年開通の西九州新幹線で博多から約1時間20分、福岡空港から直通バスもあります。市内は路面電車が便利で、1日乗車券（600円）がおすすめです。eSIMがあれば路面電車の路線図や坂道のルート確認に便利です。",
        },
      ],
      [
        { q: "長崎は何日必要ですか？", a: "主要スポットは1日で回れますが、3ルートをゆっくり歩くなら1泊2日がおすすめです。" },
        { q: "坂道は大変ですか？", a: "長崎は坂の街なので歩きやすい靴が必須です。グラバー園にはエスカレーターもあります。" },
        { q: "ちゃんぽんはどこで食べるのがいいですか？", a: "新地中華街の四海楼が発祥の地。市内各所にも名店があります。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Nagasaki Neighborhood Walks 2026 | Dejima, Glover Garden, Temple Town, and Peace Park",
      "Walking guides to Nagasaki: Dejima-to-Glover Garden history trail, Chinese temple hill walk, and Peace Park-Urakami reflection route. Three routes in a city of slopes.",
      img("File:Glover Garden Nagasaki Japan01s3.jpg", 1280, 853, "Glover Garden", "Harbor view from Glover Garden, Nagasaki"),
      [
        img("File:Dejima aerial.jpg", 1280, 853, "Dejima", "Reconstructed Dejima trading island"),
        img("File:Nagasaki Peace Statue.jpg", 1280, 960, "Peace Statue", "Peace Statue in Nagasaki"),
        img("File:Sofukuji Nagasaki Japan01s3.jpg", 1280, 960, "Sofuku-ji", "Daiyuhoden hall at Sofuku-ji Temple"),
      ],
      [
        { url: "https://x.com/nagasaki_navi/status/1800000000000000013", label: "Nagasaki tourism" },
        { url: "https://x.com/nagasaki_peace/status/1800000000000000014", label: "Nagasaki peace" },
      ],
      [
        {
          heading: "Nagasaki is a walk through cross-cultural layers on slopes",
          body:
            "Nagasaki has Japan's most internationally layered history as a port city. Dejima was the sole gateway to the outside world during the isolation period. Glover Garden holds Meiji-era Western mansions. The temple district concentrates Chinese Buddhist temples. The Urakami area carries the weight of the atomic bombing. All connected by the city's signature slopes.\n\n" +
            "This page covers three Nagasaki walking routes. Each is compact, and the city's tram network makes transitions between them easy.",
        },
        {
          heading: "Dejima to Glover Garden: trading-port history on foot",
          body:
            "Dejima is the reconstructed fan-shaped artificial island where Dutch traders lived during Japan's isolation era. Walk south from Dejima up Dutch Slope, pass Oura Church, and arrive at Glover Garden with its panoramic harbor views and Meiji-era mansions that witnessed the end of Japan's feudal period.\n\n" +
            "The Nagasaki Dejima-Glover walk guide covers the uphill route from the trading island to the garden.",
        },
        {
          heading: "Temple hill walk: Chinese culture meets Japan",
          body:
            "Nagasaki's temple district clusters Obaku Zen temples built in Chinese architectural style — Sofuku-ji, Kofuku-ji, and Shofuku-ji. The vermilion gates and Chinese-style halls look unlike any other Japanese temple, reflecting Nagasaki's unique cultural fusion. Walking the hillside temples takes one to two hours.\n\n" +
            "The Nagasaki temple hill walk guide covers the efficient route through the temple district.",
        },
        {
          heading: "Peace Park and Urakami: a walk of reflection",
          body:
            "Nagasaki's Peace Park sits north of the atomic bomb hypocenter, anchored by the Peace Statue. Nearby Urakami Cathedral and the Nagasaki Atomic Bomb Museum provide context for a quiet, reflective walk. The area is about 15 minutes from central Nagasaki by tram.\n\n" +
            "The Nagasaki Peace Park and Urakami walk guide covers the route through the peace area.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Nagasaki walks are best in spring (late March to April) and autumn (October to November). The Kunchi festival in October adds special energy, and the Lantern Festival in January–February transforms the city center.\n\n" +
            "Access improved with the Nishi-Kyushu Shinkansen (opened 2022), bringing Hakata within about 1 hour 20 minutes. Direct buses from Fukuoka Airport are also available. Within the city, the tram network is convenient with a one-day pass at 600 yen. An eSIM helps with tram routing and navigating the city's many slopes.",
        },
      ],
      [
        { q: "How many days do I need for Nagasaki?", a: "Major sights fit one day, but two days with an overnight stay allows a relaxed pace across all three routes." },
        { q: "Are the slopes difficult?", a: "Nagasaki is a hilly city, so comfortable shoes are essential. Glover Garden has escalators to help with the climb." },
        { q: "Where should I eat champon?", a: "Shikairou in Shinchi Chinatown is the birthplace of the dish. Good options exist throughout the city." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. MATSUYAMA
  // ═══════════════════════════════════════════════════════════════════
  "matsuyama-neighborhood-walks": {
    ja: ja(
      "松山の街歩きガイド 2026 | 道後温泉・松山城下町をめぐるルート",
      "道後温泉の温泉街散策と松山城下町の城下町歩き、2つのルートで松山の魅力をまとめた街歩きガイドです。路面電車で回れるコンパクトな街。",
      img("File:Dogo Onsen Honkan 2010.jpg", 1280, 853, "道後温泉本館", "道後温泉本館"),
      [
        img("File:Matsuyama Castle Tower 3.JPG", 1280, 960, "松山城", "松山城天守"),
        img("File:Dogo Onsen shopping street.jpg", 1280, 960, "道後温泉商店街", "道後温泉商店街のアーケード"),
        img("File:Matsuyama City Tram.jpg", 1280, 853, "松山の路面電車", "松山市内を走る路面電車"),
      ],
      [
        { url: "https://x.com/matsuyama_city/status/1800000000000000015", label: "松山市公式" },
        { url: "https://x.com/dogo_onsen/status/1800000000000000016", label: "道後温泉" },
      ],
      [
        {
          heading: "松山は「温泉と城が路面電車でつながる」街",
          body:
            "松山は四国最大の都市ですが、観光エリアはコンパクトにまとまっています。日本最古の温泉のひとつ道後温泉と、難攻不落の松山城が路面電車で約20分の距離にあり、1日で両方楽しめます。夏目漱石の『坊っちゃん』の舞台としても知られ、文学散歩の要素もあります。\n\n" +
            "このページでは松山の街歩きを2つのルートに分けて紹介しています。温泉と城、どちらから始めても半日ずつで回れます。",
        },
        {
          heading: "道後温泉散策: 日本最古の温泉街を歩く",
          body:
            "道後温泉本館は2024年に保存修理を終え、シンボルの振鷺閣が美しく復元されています。本館の入浴後に道後温泉商店街（道後ハイカラ通り）を歩くと、みかんジュース蛇口やタオル美術館などユニークなスポットが点在しています。足湯や別館の飛鳥乃湯泉もおすすめです。\n\n" +
            "「松山・道後温泉の散策ガイド」で、温泉と商店街の歩き方を紹介しています。",
        },
        {
          heading: "松山城下町歩き: 現存天守と城下のレトロ",
          body:
            "松山城は標高132mの勝山山頂にある現存12天守のひとつで、ロープウェイまたはリフトで登れます。天守からの瀬戸内海の眺めは抜群です。城下にはロープウェイ街や大街道商店街があり、じゃこ天や鯛めしなど松山の味覚も楽しめます。\n\n" +
            "「松山城下町の街歩き」で、城の見どころと城下散策のルートを紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "松山は温暖な気候で年間を通じて歩きやすいですが、春（3月末〜4月）の桜の季節と秋（10月〜11月）が特におすすめです。松山城の桜は四国でも有数の名所です。\n\n" +
            "アクセスは東京・大阪から飛行機で約1.5時間、岡山から特急しおかぜで約2.5時間。松山空港からリムジンバスで松山駅まで約20分です。市内は路面電車が便利で、1日乗車券が800円です。eSIMがあれば路面電車の路線図やレストラン検索に便利です。",
        },
        {
          heading: "eSIMで松山の移動を快適に",
          body:
            "松山は路面電車での移動が基本です。Google Mapsで路線番号と行き先を確認できれば、初めての松山でも迷いません。道後温泉の混雑状況チェックや、松山城のロープウェイ運行状況の確認にもeSIMのデータ通信が活躍します。",
        },
      ],
      [
        { q: "道後温泉本館は入浴できますか？", a: "はい。保存修理を経て営業しています。混雑時は整理券が必要な場合があります。" },
        { q: "松山城は何時間かかりますか？", a: "ロープウェイと天守見学で約1.5時間。城下散策を含めると半日です。" },
        { q: "松山から他の四国の街へ行けますか？", a: "高松へ特急で約2.5時間、高知へ約2.5時間。四国周遊の拠点として便利です。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Matsuyama Neighborhood Walks 2026 | Dogo Onsen and Castle Town",
      "Walking guides to Matsuyama: Dogo Onsen hot-spring district stroll and Matsuyama Castle hilltop-to-town route. Two walks connected by the city's retro tram.",
      img("File:Dogo Onsen Honkan 2010.jpg", 1280, 853, "Dogo Onsen Honkan", "Dogo Onsen Honkan bathhouse"),
      [
        img("File:Matsuyama Castle Tower 3.JPG", 1280, 960, "Matsuyama Castle", "Matsuyama Castle tower"),
        img("File:Dogo Onsen shopping street.jpg", 1280, 960, "Dogo shopping arcade", "Dogo Onsen Haikara-dori shopping arcade"),
        img("File:Matsuyama City Tram.jpg", 1280, 853, "Matsuyama tram", "Streetcar running through Matsuyama"),
      ],
      [
        { url: "https://x.com/matsuyama_city/status/1800000000000000015", label: "Matsuyama city official" },
        { url: "https://x.com/dogo_onsen/status/1800000000000000016", label: "Dogo Onsen" },
      ],
      [
        {
          heading: "Matsuyama connects a hot spring and a hilltop castle by tram",
          body:
            "Matsuyama is Shikoku's largest city but its tourist highlights are compact. Dogo Onsen, one of Japan's oldest hot springs, and the hilltop Matsuyama Castle are about 20 minutes apart by tram, making both fit easily into a single day. The city is also the setting of Natsume Soseki's novel Botchan, adding a literary dimension.\n\n" +
            "This page covers two Matsuyama walking routes. Hot spring and castle, in either order, each fill a comfortable half day.",
        },
        {
          heading: "Dogo Onsen stroll: Japan's oldest hot-spring town",
          body:
            "Dogo Onsen Honkan completed its conservation restoration in 2024, with the iconic Shinro-kaku turret beautifully renewed. After bathing, walk through the Dogo Haikara-dori shopping arcade to find quirks like a mikan (orange) juice tap and a towel art museum. Foot baths and the annex Asuka-no-Yu are also worth a stop.\n\n" +
            "The Matsuyama Dogo Onsen walk guide covers the bathhouse and arcade route.",
        },
        {
          heading: "Matsuyama Castle town walk: an original keep and retro streets",
          body:
            "Matsuyama Castle sits atop 132-meter Mount Katsuyama, reachable by ropeway or chairlift. It is one of only 12 castles in Japan retaining its original keep, with sweeping views of the Seto Inland Sea from the top. Below the castle, Ropeway Street and Okaido shopping arcade offer jako-ten fish cakes and tai-meshi sea bream rice.\n\n" +
            "The Matsuyama castle town walk guide covers the castle highlights and the streets below.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Matsuyama's mild climate makes it walkable year-round, but spring cherry blossoms (late March to April) and autumn (October to November) are peak. Matsuyama Castle's cherry trees are among the best in Shikoku.\n\n" +
            "Flights from Tokyo and Osaka take about 1.5 hours. From Okayama, the JR Shiokaze limited express runs about 2.5 hours. Airport limousine bus to Matsuyama Station is about 20 minutes. The city tram has an 800-yen day pass. An eSIM keeps tram routing and restaurant searches smooth.",
        },
        {
          heading: "Getting around Matsuyama with an eSIM",
          body:
            "The tram network is Matsuyama's primary transport. Google Maps with line numbers and destinations means you will not get lost even on a first visit. Checking Dogo Onsen crowd levels and ropeway operating status in real time also benefits from mobile data.",
        },
      ],
      [
        { q: "Can I bathe at Dogo Onsen Honkan?", a: "Yes. It is open after the conservation restoration. Numbered tickets may be required during peak times." },
        { q: "How long does Matsuyama Castle take?", a: "About 1.5 hours for the ropeway and keep visit. Add the castle-town streets for a full half day." },
        { q: "Can I reach other Shikoku cities from Matsuyama?", a: "Takamatsu is about 2.5 hours by limited express, Kochi about 2.5 hours. Matsuyama works well as a Shikoku base." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 9. SENDAI
  // ═══════════════════════════════════════════════════════════════════
  "sendai-neighborhood-walks": {
    ja: ja(
      "仙台の街歩きガイド 2026 | 定禅寺通り・青葉城址をめぐるルート",
      "定禅寺通りのケヤキ並木散歩と青葉城址の歴史散策、2つのルートで杜の都・仙台の魅力をまとめた街歩きガイドです。",
      img("File:Jozenji-dori Avenue 2010.jpg", 1280, 853, "定禅寺通り", "仙台・定禅寺通りのケヤキ並木"),
      [
        img("File:Sendai Castle Reconstructed Watchtower.jpg", 1280, 960, "仙台城址", "仙台城址（青葉城）"),
        img("File:Sendai Mediatheque.jpg", 1280, 960, "せんだいメディアテーク", "伊東豊雄設計のせんだいメディアテーク"),
        img("File:Date Masamune equestrian statue.jpg", 1280, 960, "伊達政宗像", "青葉城址の伊達政宗騎馬像"),
      ],
      [
        { url: "https://x.com/sendai_tourism/status/1800000000000000017", label: "仙台観光" },
        { url: "https://x.com/jozenji_walk/status/1800000000000000018", label: "定禅寺通り散歩" },
      ],
      [
        {
          heading: "仙台は「杜の都」の名にふさわしい緑の街",
          body:
            "仙台は東北最大の都市でありながら、街路樹と緑地が豊富で「杜の都」と呼ばれます。定禅寺通りのケヤキ並木は仙台の象徴で、4列のケヤキが作る緑のトンネルは春の新緑から秋の紅葉、冬のイルミネーションまで四季折々に楽しめます。青葉山にそびえる仙台城址からは市街地を一望できます。\n\n" +
            "このページでは仙台の街歩きを2つのルートに分けて紹介しています。どちらも仙台駅から徒歩またはバスでアクセスしやすいです。",
        },
        {
          heading: "定禅寺通りのケヤキ並木散歩: 杜の都のメインストリート",
          body:
            "定禅寺通りは勾当台公園から西公園まで約700mのケヤキ並木が続く仙台のシンボルロードです。中央遊歩道にはブロンズ像が点在し、せんだいメディアテーク（伊東豊雄設計）も沿道にあります。5月の仙台・青葉まつり、12月のSENDAI光のページェントの時期は特に華やかです。\n\n" +
            "「仙台・定禅寺通りの散歩」で、ケヤキ並木の歩き方と周辺スポットを紹介しています。",
        },
        {
          heading: "青葉城址と仙台城下: 伊達政宗の城下町",
          body:
            "仙台城（青葉城）は青葉山の上に築かれた伊達政宗の居城で、現在は石垣と伊達政宗騎馬像が残ります。天守台からの仙台市街の眺めは圧巻です。城下に下りると、青葉通りや一番町アーケードで牛タンの名店巡りが楽しめます。\n\n" +
            "「仙台・青葉城址の散歩」で、城址へのアクセスと城下散策のルートを紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "仙台の街歩きは新緑の5月〜6月と紅葉の10月〜11月がベストです。12月のSENDAI光のページェントも見逃せません。夏は仙台七夕まつり（8月6〜8日）の時期が最も賑わいます。\n\n" +
            "東京から東北新幹線で約1.5時間。仙台駅を起点に定禅寺通りまで徒歩約15分、青葉城址まではるーぷる仙台（周遊バス）で約20分です。eSIMがあればバスの時刻表や牛タン店の営業時間がすぐに確認できます。",
        },
        {
          heading: "eSIMで仙台散策をスムーズに",
          body:
            "仙台は東北観光の拠点となる街です。松島や山寺への日帰り旅にもeSIMのデータ通信が役立ちます。Google Mapsでの経路検索や、仙台駅のずんだシェイク店の場所確認など、細かな情報アクセスが旅の質を上げます。",
        },
      ],
      [
        { q: "仙台は東京から日帰りで行けますか？", a: "はい。新幹線で約1.5時間なので十分日帰りできます。2ルートを歩くなら半日〜1日です。" },
        { q: "牛タンはどこで食べるのがいいですか？", a: "仙台駅3階の牛タン通りが手軽です。一番町の利久や司など名店は街歩き途中に立ち寄れます。" },
        { q: "松島とセットで回れますか？", a: "はい。JR仙石線で約40分。午前に松島、午後に仙台市内という組み合わせが定番です。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Sendai Neighborhood Walks 2026 | Jozenji-dori and Aoba Castle Routes",
      "Walking guides to Sendai: Jozenji-dori zelkova avenue stroll and Aoba Castle hilltop history walk. Two routes through the 'City of Trees' in northeast Japan.",
      img("File:Jozenji-dori Avenue 2010.jpg", 1280, 853, "Jozenji-dori Avenue", "Zelkova-lined Jozenji-dori in Sendai"),
      [
        img("File:Sendai Castle Reconstructed Watchtower.jpg", 1280, 960, "Sendai Castle", "Aoba Castle ruins"),
        img("File:Sendai Mediatheque.jpg", 1280, 960, "Sendai Mediatheque", "Toyo Ito's Sendai Mediatheque"),
        img("File:Date Masamune equestrian statue.jpg", 1280, 960, "Date Masamune statue", "Equestrian statue of Date Masamune at Aoba Castle"),
      ],
      [
        { url: "https://x.com/sendai_tourism/status/1800000000000000017", label: "Sendai tourism" },
        { url: "https://x.com/jozenji_walk/status/1800000000000000018", label: "Jozenji-dori walk" },
      ],
      [
        {
          heading: "Sendai is the 'City of Trees' — and it shows",
          body:
            "Sendai is the largest city in the Tohoku region yet earns its 'City of Trees' nickname with generous street planting and green spaces. The zelkova-lined Jozenji-dori avenue is the city's symbol, forming a green tunnel from spring through autumn and a glittering light corridor in December. Aoba Castle on Mount Aoba offers city panoramas above the treetops.\n\n" +
            "This page covers two Sendai walking routes, both easily reached on foot or by bus from Sendai Station.",
        },
        {
          heading: "Jozenji-dori zelkova walk: Sendai's green main street",
          body:
            "Jozenji-dori runs about 700 meters from Kotodai Park to Nishi Park, lined with four rows of zelkova trees. Bronze sculptures stand along the center promenade, and Sendai Mediatheque (designed by Toyo Ito) faces the avenue. The Aoba Festival in May and the Pageant of Starlight in December are the street's peak moments.\n\n" +
            "The Sendai Jozenji-dori walk guide covers the avenue route and surrounding stops.",
        },
        {
          heading: "Aoba Castle and the castle town: Date Masamune's domain",
          body:
            "Sendai Castle (Aoba Castle) was built on Mount Aoba by feudal lord Date Masamune. The stone walls and equestrian statue remain, with panoramic views of the city from the keep platform. Descending to the castle-town streets of Aoba-dori and Ichibancho arcade leads to Sendai's famous gyutan (beef tongue) restaurants.\n\n" +
            "The Sendai Aoba Castle walk guide covers access to the castle ruins and the downtown route below.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Sendai walks are best during fresh-green May–June and autumn foliage in October–November. The Pageant of Starlight in December is a highlight. Summer peaks with the Tanabata Festival (August 6–8).\n\n" +
            "From Tokyo, the Tohoku Shinkansen takes about 1.5 hours. From Sendai Station, Jozenji-dori is 15 minutes on foot and Aoba Castle is about 20 minutes by the Loople Sendai sightseeing bus. An eSIM keeps bus schedules and gyutan restaurant hours at hand.",
        },
        {
          heading: "Using an eSIM as a Tohoku base",
          body:
            "Sendai serves as a gateway for Tohoku travel. Day trips to Matsushima Bay or Yamadera are easy, and eSIM data helps with route searches and timetable checks. Even small queries like finding the best zunda shake at Sendai Station benefit from on-the-ground connectivity.",
        },
      ],
      [
        { q: "Is Sendai a good day trip from Tokyo?", a: "Yes. About 1.5 hours by shinkansen. Both routes fit a half day to full day." },
        { q: "Where should I eat gyutan?", a: "Gyutan Street on the third floor of Sendai Station is convenient. Rikyu and Tsukasa on Ichibancho are well-known sit-down options along the walking routes." },
        { q: "Can I combine Matsushima with Sendai?", a: "Yes. JR Senseki Line takes about 40 minutes. Morning in Matsushima, afternoon in Sendai is a popular combination." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 10. SAPPORO
  // ═══════════════════════════════════════════════════════════════════
  "sapporo-neighborhood-walks": {
    ja: ja(
      "札幌の街歩きガイド 2026 | 狸小路・円山公園をめぐるルート",
      "狸小路のアーケード散策と円山公園の自然散歩、2つのルートで札幌の魅力をまとめた街歩きガイドです。碁盤の目の街は歩きやすい。",
      img("File:Odori Park Sapporo 01.jpg", 1280, 853, "大通公園", "札幌・大通公園とテレビ塔"),
      [
        img("File:Tanukikoji Shopping Street.jpg", 1280, 960, "狸小路", "札幌・狸小路商店街"),
        img("File:Maruyama Park Sapporo.jpg", 1280, 960, "円山公園", "札幌・円山公園の森"),
        img("File:Sapporo Clock Tower.jpg", 1280, 960, "時計台", "札幌時計台"),
      ],
      [
        { url: "https://x.com/sapporo_tourism/status/1800000000000000019", label: "札幌観光" },
        { url: "https://x.com/tanukikoji/status/1800000000000000020", label: "狸小路" },
      ],
      [
        {
          heading: "札幌は「碁盤の目」だから歩きやすい",
          body:
            "札幌は明治の開拓時代に計画的に作られた碁盤の目状の街路が特徴で、地図を見なくても方角がわかりやすい都市です。大通公園を中心に北は北海道庁旧本庁舎、南は狸小路やすすきのが広がります。少し足を延ばせば円山公園の原始林も地下鉄で15分です。\n\n" +
            "このページでは札幌の街歩きを2つのルートに分けて紹介しています。中心部の商店街散策と、自然の中の散歩を組み合わせられます。",
        },
        {
          heading: "狸小路アーケード散策: 全天候型の街歩き",
          body:
            "狸小路は1丁目から7丁目まで約900m続くアーケード商店街で、雨でも雪でも快適に歩けます。老舗の喫茶店、みそラーメンの名店、北海道の土産物店が並び、薄野（すすきの）にも近いです。近年はリノベーションカフェや個性的な雑貨店も増えています。\n\n" +
            "「札幌・狸小路の散策ガイド」で、アーケードの歩き方とおすすめスポットを紹介しています。",
        },
        {
          heading: "円山公園の自然散歩: 都市の中の原始林",
          body:
            "円山公園は地下鉄円山公園駅から徒歩5分にある都市公園で、隣接する円山原始林は国の天然記念物です。標高225mの円山山頂までのハイキングは片道約30分で、山頂からは札幌市街を一望できます。北海道神宮の参道も森の中を歩く気持ちいいルートです。\n\n" +
            "「札幌・円山公園の散歩ガイド」で、原始林散策と北海道神宮参拝のルートを紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "札幌の街歩きは春（5月〜6月）の桜とライラック、夏（7〜8月）の爽やかな気候がベストです。冬（12月〜2月）は雪景色が美しいですが、路面凍結に注意が必要です。2月のさっぽろ雪まつりの時期は特に賑わいます。\n\n" +
            "東京から飛行機で約1.5時間。新千歳空港から札幌駅までJR快速エアポートで約37分です。市内は地下鉄3路線と路面電車が便利。eSIMがあれば到着直後から移動に困りません。",
        },
        {
          heading: "eSIMで札幌・北海道旅行を快適に",
          body:
            "札幌は北海道観光の拠点です。小樽、富良野、旭川への日帰り旅の計画にもeSIMのデータ通信が役立ちます。冬は路面状況の確認や除雪情報のチェックにもスマートフォンが必須です。",
        },
      ],
      [
        { q: "札幌は冬でも街歩きできますか？", a: "はい。狸小路はアーケードなので雪でも快適です。屋外は滑りにくい靴が必須です。地下歩行空間も活用できます。" },
        { q: "味噌ラーメンはどこがおすすめですか？", a: "狸小路周辺やすすきのに名店が集中しています。街歩き途中に立ち寄れる距離です。" },
        { q: "小樽とセットで回れますか？", a: "はい。JR快速で約35分。午前に小樽、午後に札幌市内という組み合わせが定番です。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Sapporo Neighborhood Walks 2026 | Tanukikoji Arcade and Maruyama Park",
      "Walking guides to Sapporo: covered Tanukikoji arcade stroll and Maruyama Park nature walk. Two routes in Hokkaido's grid-planned capital.",
      img("File:Odori Park Sapporo 01.jpg", 1280, 853, "Odori Park", "Odori Park and TV Tower in Sapporo"),
      [
        img("File:Tanukikoji Shopping Street.jpg", 1280, 960, "Tanukikoji", "Tanukikoji shopping arcade"),
        img("File:Maruyama Park Sapporo.jpg", 1280, 960, "Maruyama Park", "Maruyama Park primeval forest"),
        img("File:Sapporo Clock Tower.jpg", 1280, 960, "Clock Tower", "Sapporo Clock Tower"),
      ],
      [
        { url: "https://x.com/sapporo_tourism/status/1800000000000000019", label: "Sapporo tourism" },
        { url: "https://x.com/tanukikoji/status/1800000000000000020", label: "Tanukikoji" },
      ],
      [
        {
          heading: "Sapporo's grid layout makes it one of Japan's most walkable cities",
          body:
            "Sapporo was built on a grid during the Meiji settlement era, making navigation intuitive even without a map. Odori Park bisects the city center, with the Former Hokkaido Government Office to the north and Tanukikoji and Susukino to the south. A short subway ride brings you to Maruyama Park's primeval forest.\n\n" +
            "This page covers two Sapporo walking routes: a central arcade stroll and a nature walk, easily combined in a single day.",
        },
        {
          heading: "Tanukikoji arcade walk: all-weather street walking",
          body:
            "Tanukikoji stretches about 900 meters from Block 1 to Block 7 under a covered arcade, comfortable in any weather. Old-school coffee shops, miso ramen institutions, and Hokkaido souvenir stores line the route, with Susukino entertainment district close by. Recent additions include renovation cafes and independent zakka shops.\n\n" +
            "The Sapporo Tanukikoji walk guide covers the arcade route and recommended stops.",
        },
        {
          heading: "Maruyama Park nature walk: primeval forest in the city",
          body:
            "Maruyama Park is five minutes on foot from Maruyama-Koen subway station. The adjacent Maruyama Primeval Forest is a designated natural monument. A hike to the 225-meter summit of Mount Maruyama takes about 30 minutes one way, with panoramic views of Sapporo at the top. The Hokkaido Shrine approach path cuts through the forest for a peaceful walk.\n\n" +
            "The Sapporo Maruyama Park walk guide covers the forest trails and shrine visit.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Sapporo walks are best in spring (May–June for cherry blossoms and lilacs) and summer (July–August for mild weather). Winter (December–February) offers snow scenery but requires careful footing. The Sapporo Snow Festival in February draws large crowds.\n\n" +
            "Flights from Tokyo take about 1.5 hours. JR Rapid Airport runs from New Chitose Airport to Sapporo Station in about 37 minutes. Three subway lines and a streetcar cover the city center. An eSIM ensures navigation works from arrival.",
        },
        {
          heading: "An eSIM for Hokkaido exploration",
          body:
            "Sapporo is the base for Hokkaido travel. Day trips to Otaru, Furano, or Asahikawa benefit from mobile data for route planning. In winter, checking road conditions and snow-removal status makes a smartphone essential.",
        },
      ],
      [
        { q: "Can I walk Sapporo in winter?", a: "Yes. Tanukikoji's arcade is snow-proof. Outdoors, non-slip footwear is essential. The underground walkway network also helps." },
        { q: "Where is the best miso ramen?", a: "Renowned shops cluster around Tanukikoji and Susukino, all within walking distance of the routes." },
        { q: "Can I combine Otaru with Sapporo?", a: "Yes. JR rapid train takes about 35 minutes. Morning in Otaru, afternoon in Sapporo is the standard combination." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 11. HAKONE
  // ═══════════════════════════════════════════════════════════════════
  "hakone-neighborhood-walks": {
    ja: ja(
      "箱根の街歩きガイド 2026 | 旧東海道・強羅公園をめぐるルート",
      "箱根旧東海道の石畳ハイキングと強羅公園周辺の散策、2つのルートで箱根の自然と歴史をまとめた街歩きガイドです。",
      img("File:Hakone Ashinoko lake.JPG", 1280, 853, "芦ノ湖", "箱根・芦ノ湖と富士山"),
      [
        img("File:Hakone Old Tokaido Road.jpg", 1280, 960, "旧東海道", "箱根旧東海道の石畳"),
        img("File:Gora Park Hakone.jpg", 1280, 960, "強羅公園", "強羅公園のフランス式庭園"),
        img("File:Hakone Ropeway.jpg", 1280, 853, "箱根ロープウェイ", "箱根ロープウェイからの大涌谷"),
      ],
      [
        { url: "https://x.com/hakone_navi/status/1800000000000000021", label: "箱根ナビ" },
        { url: "https://x.com/hakone_tozan/status/1800000000000000022", label: "箱根登山鉄道" },
      ],
      [
        {
          heading: "箱根は「乗り物と歩き」の組み合わせが楽しい",
          body:
            "箱根は東京から約1.5時間のリゾートエリアで、登山電車、ケーブルカー、ロープウェイ、海賊船と多彩な乗り物が楽しめます。しかし歩いてこそ見つかる箱根もあります。旧東海道の石畳は江戸時代の旅人が歩いた道そのものですし、強羅公園周辺はフランス式庭園と温泉の両方を楽しめるエリアです。\n\n" +
            "このページでは箱根の街歩きを2つのルートに分けて紹介しています。乗り物観光の合間に歩きの要素を加えると、箱根の体験が深まります。",
        },
        {
          heading: "旧東海道の石畳歩き: 江戸時代の箱根越え",
          body:
            "箱根旧東海道は箱根湯本から芦ノ湖まで続く旧街道で、畑宿付近の石畳は江戸時代に敷かれたものが残っています。杉並木の中を歩く約2時間のハイキングは、箱根の歴史を肌で感じられるルートです。箱根関所跡も見学できます。\n\n" +
            "「箱根・旧東海道の石畳歩き」で、畑宿から芦ノ湖へのハイキングルートを紹介しています。",
        },
        {
          heading: "強羅公園周辺の散策: 庭園と温泉のエリア",
          body:
            "強羅公園は箱根登山ケーブルカーの公園上駅から徒歩1分にあるフランス式庭園で、バラ園やブーゲンビリアが美しいです。周辺には箱根美術館、ポーラ美術館、彫刻の森美術館など文化施設も充実しています。散策の後は強羅温泉で疲れを癒せます。\n\n" +
            "「箱根・強羅公園周辺の散策」で、庭園と美術館を組み合わせたルートを紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "箱根の街歩きは紫陽花の6月〜7月、紅葉の11月がベストです。新緑の5月も気持ちいいです。冬は温泉が最も楽しい季節です。\n\n" +
            "新宿から小田急ロマンスカーで約85分、箱根湯本駅下車。箱根フリーパスを使えば登山電車、ケーブルカー、ロープウェイ、海賊船が乗り放題です。eSIMがあれば各乗り物の運行状況やルート検索がリアルタイムでできます。",
        },
        {
          heading: "eSIMで箱根の乗り継ぎをスムーズに",
          body:
            "箱根は乗り物が多いぶん、乗り継ぎの計画が重要です。各交通機関の運行時間や混雑状況をリアルタイムで確認できるeSIMのデータ通信が、箱根観光をスムーズにします。大涌谷の火山性ガス規制の最新情報も確認できます。",
        },
      ],
      [
        { q: "箱根は日帰りで楽しめますか？", a: "はい。新宿から約1.5時間で、1日で主要スポットを回れます。温泉に入るなら1泊がおすすめです。" },
        { q: "旧東海道の石畳歩きはきついですか？", a: "畑宿から芦ノ湖までは約2時間の上り坂です。歩きやすい靴と水を持参してください。" },
        { q: "箱根フリーパスは必要ですか？", a: "2日間有効で各乗り物が乗り放題なので、ほとんどの場合お得です。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Hakone Neighborhood Walks 2026 | Old Tokaido Trail and Gora Park",
      "Walking guides to Hakone: Old Tokaido stone-paved trail hike and Gora Park garden-and-museum stroll. Two routes adding depth to the classic transport loop.",
      img("File:Hakone Ashinoko lake.JPG", 1280, 853, "Lake Ashi", "Lake Ashi and Mount Fuji from Hakone"),
      [
        img("File:Hakone Old Tokaido Road.jpg", 1280, 960, "Old Tokaido", "Stone-paved Old Tokaido Road in Hakone"),
        img("File:Gora Park Hakone.jpg", 1280, 960, "Gora Park", "French-style garden at Gora Park"),
        img("File:Hakone Ropeway.jpg", 1280, 853, "Hakone Ropeway", "Hakone Ropeway over Owakudani"),
      ],
      [
        { url: "https://x.com/hakone_navi/status/1800000000000000021", label: "Hakone Navi" },
        { url: "https://x.com/hakone_tozan/status/1800000000000000022", label: "Hakone Tozan Railway" },
      ],
      [
        {
          heading: "Hakone rewards walking between the transport stops",
          body:
            "Hakone is a resort area about 1.5 hours from Tokyo, famous for its mountain railway, cable car, ropeway, and pirate ship loop. But Hakone reveals more when you walk. The Old Tokaido stone-paved road is the same path Edo-period travelers used, and the Gora Park area combines a French garden with onsen hot springs.\n\n" +
            "This page covers two Hakone walking routes that add depth to the standard transport loop.",
        },
        {
          heading: "Old Tokaido stone trail: crossing Hakone like an Edo traveler",
          body:
            "The Hakone Old Tokaido road runs from Hakone-Yumoto toward Lake Ashi. Near Hatajuku, original Edo-period stone paving survives under cedar-tree canopy. The roughly two-hour hike gives a physical sense of historical travel. The Hakone Checkpoint (Sekisho) museum awaits at the lake end.\n\n" +
            "The Hakone Old Tokaido walk guide covers the Hatajuku-to-Ashi trail.",
        },
        {
          heading: "Gora Park area: gardens and hot springs",
          body:
            "Gora Park is one minute on foot from Koen-Kami Station on the Hakone Tozan Cable Car. Its French-style terraced garden features rose beds and bougainvillea. Nearby cultural sites include Hakone Museum of Art, Pola Museum of Art, and the Hakone Open-Air Museum. After walking, Gora's hot springs provide recovery.\n\n" +
            "The Hakone Gora Park walk guide covers the garden-and-museum circuit.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Hakone walks are best during hydrangea season (June–July) and autumn foliage (November). May's fresh green is also comfortable. Winter is peak hot-spring season.\n\n" +
            "From Shinjuku, the Odakyu Romancecar takes about 85 minutes to Hakone-Yumoto. The Hakone Free Pass covers the mountain railway, cable car, ropeway, and pirate ship. An eSIM keeps transport schedules and route searches available in real time.",
        },
        {
          heading: "Managing Hakone's transport connections with an eSIM",
          body:
            "Hakone's multiple transport modes make planning important. Real-time schedule and congestion checks smooth the experience. Current Owakudani volcanic gas restriction status is also accessible with mobile data.",
        },
      ],
      [
        { q: "Is Hakone a good day trip from Tokyo?", a: "Yes. About 1.5 hours from Shinjuku, with a full transport loop fitting one day. An overnight stay adds an onsen soak." },
        { q: "Is the Old Tokaido hike difficult?", a: "The Hatajuku-to-Ashi section is about two hours uphill. Bring good shoes and water." },
        { q: "Is the Hakone Free Pass worth it?", a: "For most visitors, yes. It covers two days of unlimited transport on multiple modes." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 12. NIKKO
  // ═══════════════════════════════════════════════════════════════════
  "nikko-neighborhood-walks": {
    ja: ja(
      "日光の街歩きガイド 2026 | 憾満ヶ淵・社寺エリアをめぐるルート",
      "憾満ヶ淵の渓流散歩と東照宮・二荒山神社・輪王寺の社寺エリア散策、2つのルートで日光の自然と歴史をまとめたガイドです。",
      img("File:Nikko Toshogu Yomeimon M3249.jpg", 1280, 853, "日光東照宮", "日光東照宮の陽明門"),
      [
        img("File:Kanmangafuchi Abyss Jizo.jpg", 1280, 960, "憾満ヶ淵", "憾満ヶ淵の並び地蔵"),
        img("File:Shinkyo Bridge Nikko.jpg", 1280, 960, "神橋", "日光・神橋"),
        img("File:Nikko Futarasan Shrine.jpg", 1280, 960, "二荒山神社", "日光二荒山神社"),
      ],
      [
        { url: "https://x.com/nikko_tourism/status/1800000000000000023", label: "日光観光" },
        { url: "https://x.com/nikko_toshogu/status/1800000000000000024", label: "日光東照宮" },
      ],
      [
        {
          heading: "日光は「世界遺産の社寺」だけじゃない",
          body:
            "日光といえば東照宮の陽明門が有名ですが、社寺エリアの裏手に広がる渓流や森にも魅力があります。憾満ヶ淵は大谷川沿いの渓谷で、約70体の地蔵が並ぶ「化地蔵」は日光の隠れた名所です。世界遺産の社寺と自然散歩を組み合わせると、日光の奥深さが見えてきます。\n\n" +
            "このページでは日光の街歩きを2つのルートに分けて紹介しています。どちらも東武日光駅またはJR日光駅から路線バスでアクセスできます。",
        },
        {
          heading: "憾満ヶ淵の渓流散歩: 化地蔵と大谷川の渓谷",
          body:
            "憾満ヶ淵は大谷川の上流にある渓谷で、約70体の地蔵菩薩像（化地蔵）が苔むしたまま並んでいます。「数えるたびに数が変わる」という伝説があり、静かな渓流沿いの散歩道は東照宮の華やかさとは対照的な日光の一面を見せてくれます。\n\n" +
            "「日光・憾満ヶ淵の渓流散歩」で、田母沢御用邸からのアクセスと渓谷の歩き方を紹介しています。",
        },
        {
          heading: "社寺エリア散策: 東照宮・二荒山神社・輪王寺",
          body:
            "日光の世界遺産エリアには東照宮、二荒山神社、輪王寺の三社寺が集まっています。陽明門の彫刻は圧巻ですが、二荒山神社の静かな境内や輪王寺の大猷院も見逃せません。杉並木の参道を歩く時間も日光らしい体験です。\n\n" +
            "「日光・社寺エリアの散策ガイド」で、三社寺を効率よく巡るルートを紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "日光の街歩きは新緑の5月と紅葉の10月〜11月がベストです。いろは坂の紅葉は10月中旬〜下旬が見頃。冬は積雪があるため、社寺エリアの歩きが中心になります。\n\n" +
            "東京から東武特急スペーシアで約2時間、JR日光線で約2時間。日光駅から世界遺産エリアまでバスで約10分（徒歩でも約30分）。eSIMがあればバスの時刻表や社寺の拝観情報がすぐに確認できます。",
        },
        {
          heading: "eSIMで日光観光をスムーズに",
          body:
            "日光は広いエリアに見どころが分散しているため、路線バスの時刻表確認が重要です。東照宮の混雑状況やいろは坂の紅葉情報もリアルタイムでチェックできるeSIMのデータ通信が便利です。",
        },
      ],
      [
        { q: "日光は東京から日帰りで行けますか？", a: "はい。東武特急で約2時間なので十分日帰りできます。社寺と憾満ヶ淵を合わせて1日で回れます。" },
        { q: "東照宮はどれくらいの時間が必要ですか？", a: "じっくり見ると1.5〜2時間かかります。三社寺すべて回るなら半日を見込んでください。" },
        { q: "中禅寺湖とセットで回れますか？", a: "可能ですが少し忙しくなります。社寺を午前、中禅寺湖を午後に分けるのがおすすめです。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Nikko Neighborhood Walks 2026 | Kanmangafuchi Gorge and Temple-Shrine District",
      "Walking guides to Nikko: Kanmangafuchi gorge trail with mossy Jizo statues and the World Heritage temple-shrine circuit. Two routes combining nature and ornate architecture.",
      img("File:Nikko Toshogu Yomeimon M3249.jpg", 1280, 853, "Nikko Toshogu", "Yomeimon Gate at Nikko Toshogu"),
      [
        img("File:Kanmangafuchi Abyss Jizo.jpg", 1280, 960, "Kanmangafuchi Jizo", "Ghostly Jizo statues at Kanmangafuchi"),
        img("File:Shinkyo Bridge Nikko.jpg", 1280, 960, "Shinkyo Bridge", "Sacred Shinkyo Bridge in Nikko"),
        img("File:Nikko Futarasan Shrine.jpg", 1280, 960, "Futarasan Shrine", "Nikko Futarasan Shrine"),
      ],
      [
        { url: "https://x.com/nikko_tourism/status/1800000000000000023", label: "Nikko tourism" },
        { url: "https://x.com/nikko_toshogu/status/1800000000000000024", label: "Nikko Toshogu" },
      ],
      [
        {
          heading: "Nikko has more than the famous shrine",
          body:
            "Nikko is known for the ornate Yomeimon Gate at Toshogu, but the gorges and forests behind the shrine district hold their own appeal. Kanmangafuchi is a riverside ravine along the Daiya River where about 70 moss-covered Jizo statues line the path — a hidden gem contrasting with Toshogu's gilded surfaces. Combining the World Heritage shrines with a nature walk reveals Nikko's full depth.\n\n" +
            "This page covers two Nikko walking routes, both accessible by bus from Tobu Nikko or JR Nikko Station.",
        },
        {
          heading: "Kanmangafuchi gorge walk: mossy Jizo and river paths",
          body:
            "Kanmangafuchi is a gorge along the upper Daiya River where roughly 70 Jizo bodhisattva statues, called Bake-Jizo or 'ghost Jizo,' stand in a moss-covered row. Legend says the count changes each time you try. The quiet streamside path contrasts sharply with the crowds at Toshogu.\n\n" +
            "The Nikko Kanmangafuchi walk guide covers access from Tamozawa Imperial Villa and the gorge route.",
        },
        {
          heading: "Temple-shrine district: Toshogu, Futarasan, and Rinnoji",
          body:
            "Nikko's World Heritage zone clusters three major sites: Toshogu Shrine, Futarasan Shrine, and Rinnoji Temple. Toshogu's carved Yomeimon gate is the showpiece, but the quiet grounds of Futarasan and the Taiyuin mausoleum at Rinnoji are equally worth exploring. Walking the cedar-lined approach road is a distinctly Nikko experience.\n\n" +
            "The Nikko temple-shrine walk guide covers the efficient route through all three sites.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Nikko walks are best during fresh green in May and autumn foliage in October–November. The Irohazaka curves peak in mid to late October. Winter brings snow, narrowing walks mostly to the shrine district.\n\n" +
            "From Tokyo, the Tobu Spacia limited express takes about 2 hours, as does the JR Nikko Line. From the station, a bus reaches the World Heritage zone in about 10 minutes (or about 30 minutes on foot). An eSIM keeps bus schedules and shrine visiting information accessible.",
        },
        {
          heading: "Navigating Nikko with an eSIM",
          body:
            "Nikko's sights are spread across a wide area, making bus timetable access essential. Checking Toshogu crowd levels and Irohazaka foliage status in real time benefits from mobile data.",
        },
      ],
      [
        { q: "Is Nikko a good day trip from Tokyo?", a: "Yes. About 2 hours by Tobu express. The shrine district and Kanmangafuchi fit comfortably in one day." },
        { q: "How long does Toshogu take?", a: "Allow 1.5 to 2 hours for a thorough visit. Plan a half day if covering all three sites." },
        { q: "Can I combine Lake Chuzenji with the shrines?", a: "Possible but tight. Shrines in the morning and the lake in the afternoon works best." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 13. KAGOSHIMA
  // ═══════════════════════════════════════════════════════════════════
  "kagoshima-neighborhood-walks": {
    ja: ja(
      "鹿児島の街歩きガイド 2026 | 天文館・仙巌園をめぐるルート",
      "天文館の繁華街散策と仙巌園の庭園・歴史散歩、2つのルートで桜島を望む鹿児島の魅力をまとめた街歩きガイドです。",
      img("File:Sakurajima from Kagoshima.jpg", 1280, 853, "桜島", "鹿児島市内から見た桜島"),
      [
        img("File:Tenmonkan Kagoshima.jpg", 1280, 960, "天文館", "鹿児島・天文館通り"),
        img("File:Sengan-en Garden.jpg", 1280, 960, "仙巌園", "仙巌園と桜島"),
        img("File:Kagoshima City Tram.jpg", 1280, 853, "鹿児島の路面電車", "鹿児島市電"),
      ],
      [
        { url: "https://x.com/kagoshima_navi/status/1800000000000000025", label: "鹿児島観光" },
        { url: "https://x.com/sengan_en/status/1800000000000000026", label: "仙巌園" },
      ],
      [
        {
          heading: "鹿児島は「桜島を眺めながら歩く」街",
          body:
            "鹿児島の街歩きの最大の特徴は、市内のどこからでも活火山・桜島が見えることです。繁華街の天文館からも、海沿いの遊歩道からも、仙巌園の庭園からも、桜島の雄大な姿が目に入ります。路面電車で市内を移動しながら、南国の空気と火山の風景を同時に楽しめるのが鹿児島です。\n\n" +
            "このページでは鹿児島の街歩きを2つのルートに分けて紹介しています。繁華街の食べ歩きと、歴史的庭園の散策をそれぞれ楽しめます。",
        },
        {
          heading: "天文館散策: 鹿児島の台所とアーケード",
          body:
            "天文館は鹿児島最大の繁華街で、アーケード商店街を中心に黒豚とんかつ、白くまかき氷、鶏飯（けいはん）など鹿児島グルメの名店が集まっています。山形屋百貨店を起点にアーケードを歩くと、地元の人々の日常が見えてきます。夜は屋台村の「かごっまふるさと屋台村」も楽しいです。\n\n" +
            "「鹿児島・天文館の街歩き」で、グルメとショッピングのルートを紹介しています。",
        },
        {
          heading: "仙巌園: 桜島を借景にした大名庭園",
          body:
            "仙巌園は島津家が築いた大名庭園で、桜島と錦江湾を借景に取り込んだスケールの大きな庭園です。2015年に「明治日本の産業革命遺産」として世界遺産に登録されました。隣接する尚古集成館では島津家の近代化の歩みを学べます。鹿児島中央駅からバスで約30分。\n\n" +
            "「鹿児島・仙巌園の散歩」で、庭園の見どころと周辺の歩き方を紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "鹿児島は温暖な気候で年間を通じて歩きやすいですが、春（3月末〜4月）と秋（10月〜11月）がベストです。夏は暑さが厳しいので朝の散歩がおすすめ。桜島の火山灰が降る日は傘やマスクがあると便利です。\n\n" +
            "東京から飛行機で約1.5時間、大阪から約1時間。博多から九州新幹線で約1.5時間。市内は路面電車が便利で、1日乗車券が600円です。桜島フェリーは鹿児島港から約15分で、24時間運行しています。eSIMがあれば桜島の噴火情報や路面電車の時刻表をリアルタイムで確認できます。",
        },
        {
          heading: "eSIMで鹿児島観光を安心に",
          body:
            "鹿児島は活火山がある街です。桜島の噴火情報や降灰予報をリアルタイムで確認できるeSIMのデータ通信は、安全面でも役立ちます。屋久島や指宿への足を延ばす際のルート検索にも便利です。",
        },
      ],
      [
        { q: "桜島には行くべきですか？", a: "はい。フェリーで15分なので気軽に行けます。展望台から間近に見る火山は迫力があります。" },
        { q: "白くまかき氷はどこで食べるのがいいですか？", a: "天文館の「天文館むじゃき」が元祖です。行列ができますが並ぶ価値があります。" },
        { q: "指宿の砂蒸し風呂とセットで回れますか？", a: "はい。JR指宿枕崎線で約1時間。午前に指宿、午後に鹿児島市内という組み合わせが可能です。" },
      ],
      hubCta("ja", "japan"),
    ),
    en: en(
      "Kagoshima Neighborhood Walks 2026 | Tenmonkan and Sengan-en Garden",
      "Walking guides to Kagoshima: Tenmonkan arcade food stroll and Sengan-en garden with Sakurajima volcano views. Two routes in Japan's southernmost major city.",
      img("File:Sakurajima from Kagoshima.jpg", 1280, 853, "Sakurajima", "Sakurajima volcano seen from Kagoshima city"),
      [
        img("File:Tenmonkan Kagoshima.jpg", 1280, 960, "Tenmonkan", "Tenmonkan shopping district in Kagoshima"),
        img("File:Sengan-en Garden.jpg", 1280, 960, "Sengan-en", "Sengan-en Garden with Sakurajima"),
        img("File:Kagoshima City Tram.jpg", 1280, 853, "Kagoshima tram", "Kagoshima city streetcar"),
      ],
      [
        { url: "https://x.com/kagoshima_navi/status/1800000000000000025", label: "Kagoshima tourism" },
        { url: "https://x.com/sengan_en/status/1800000000000000026", label: "Sengan-en" },
      ],
      [
        {
          heading: "Kagoshima is a city where you walk with a volcano in view",
          body:
            "Kagoshima's defining feature is Sakurajima, the active volcano visible from everywhere in the city — the Tenmonkan shopping district, the seaside promenade, and the Sengan-en garden alike. The tram network connects the city while subtropical air and volcanic scenery create an atmosphere unlike anywhere else in Japan.\n\n" +
            "This page covers two Kagoshima walking routes: downtown food exploration and a historic garden visit.",
        },
        {
          heading: "Tenmonkan stroll: Kagoshima's kitchen and arcade",
          body:
            "Tenmonkan is Kagoshima's main entertainment district, with arcade shopping streets anchored by kurobuta (black pork) tonkatsu, shirokuma shaved ice, and keihan chicken-and-rice restaurants. Starting from the Yamagataya department store and walking through the arcades reveals everyday Kagoshima. The evening yatai village, Kagomma Furusato Yataimura, adds a nighttime option.\n\n" +
            "The Kagoshima Tenmonkan walk guide covers the food and shopping route.",
        },
        {
          heading: "Sengan-en: a feudal garden with Sakurajima as borrowed scenery",
          body:
            "Sengan-en is the Shimazu clan's feudal garden, using Sakurajima and Kinko Bay as borrowed scenery on a grand scale. It was inscribed as a UNESCO World Heritage Site in 2015 as part of the 'Sites of Japan's Meiji Industrial Revolution.' The adjacent Shoko Shuseikan museum covers the Shimazu clan's modernization efforts. About 30 minutes by bus from Kagoshima-Chuo Station.\n\n" +
            "The Kagoshima Sengan-en walk guide covers garden highlights and the surrounding area.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Kagoshima's mild climate makes it walkable year-round, with spring (late March to April) and autumn (October to November) being best. Summer heat calls for morning walks. Volcanic ash occasionally falls from Sakurajima — an umbrella or mask helps on those days.\n\n" +
            "Flights from Tokyo take about 1.5 hours, from Osaka about 1 hour. The Kyushu Shinkansen reaches Kagoshima-Chuo from Hakata in about 1.5 hours. The city tram has a 600-yen day pass. The Sakurajima Ferry runs 24 hours, taking about 15 minutes. An eSIM keeps eruption alerts and tram schedules accessible in real time.",
        },
        {
          heading: "Safety and navigation with an eSIM",
          body:
            "Kagoshima sits next to an active volcano. Real-time eruption alerts and ash-fall forecasts are practical safety tools that mobile data enables. Route searches for extended trips to Yakushima or Ibusuki also benefit from connectivity.",
        },
      ],
      [
        { q: "Should I visit Sakurajima?", a: "Yes. The ferry takes just 15 minutes. Seeing the volcano up close from the observation deck is powerful." },
        { q: "Where should I eat shirokuma shaved ice?", a: "Tenmonkan Mujaki is the originator. Lines form but it is worth the wait." },
        { q: "Can I combine Ibusuki sand baths with Kagoshima?", a: "Yes. JR Ibusuki-Makurazaki Line takes about one hour. Morning at Ibusuki, afternoon in Kagoshima city works well." },
      ],
      hubCta("en", "japan"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 14. BUSAN
  // ═══════════════════════════════════════════════════════════════════
  "busan-neighborhood-walks": {
    ja: ja(
      "釜山の街歩きガイド 2026 | 甘川文化村・海雲台・南浦洞をめぐるルート",
      "甘川文化村のカラフル路地、海雲台ビーチの朝散歩、南浦洞とジャガルチ市場の散策など、釜山の街歩きルートをまとめた総合ガイドです。",
      img("File:Gamcheon Culture Village Busan.jpg", 1280, 853, "甘川文化村", "釜山・甘川文化村のカラフルな家々"),
      [
        img("File:Haeundae Beach Busan.jpg", 1280, 853, "海雲台ビーチ", "釜山・海雲台ビーチ"),
        img("File:Jagalchi Fish Market Busan.jpg", 1280, 960, "ジャガルチ市場", "釜山・ジャガルチ市場"),
        img("File:Haedong Yonggungsa Temple.jpg", 1280, 960, "海東龍宮寺", "海沿いの海東龍宮寺"),
      ],
      [
        { url: "https://x.com/visitbusan/status/1800000000000000027", label: "Visit Busan" },
        { url: "https://x.com/busan_walks/status/1800000000000000028", label: "釜山街歩き" },
      ],
      [
        {
          heading: "釜山は「海と坂と市場」の街を歩く",
          body:
            "釜山はソウルに次ぐ韓国第二の都市で、海と山に挟まれた地形が独特の街歩き体験を生みます。甘川文化村のカラフルな坂道集落、海雲台ビーチの開放的な海岸線、南浦洞のレトロな繁華街とジャガルチ市場の活気。それぞれまったく異なる表情の釜山を歩けます。\n\n" +
            "このページでは釜山の街歩きを3つのルートに分けて紹介しています。地下鉄で各エリアにアクセスしやすく、1日2エリアが目安です。",
        },
        {
          heading: "甘川文化村: 釜山のマチュピチュを歩く",
          body:
            "甘川文化村は山の斜面にカラフルな家々が段々に並ぶ集落で、「釜山のマチュピチュ」と呼ばれています。路地にはアート作品が点在し、海を見下ろすフォトスポットが至るところにあります。地下鉄土城駅からマウルバスで約10分。スタンプラリーのマップを入口で入手すると効率よく回れます。\n\n" +
            "「釜山・甘川文化村の散策」で、村内の歩き方とフォトスポットを紹介しています。",
        },
        {
          heading: "海雲台ビーチの朝散歩: 韓国を代表するビーチを歩く",
          body:
            "海雲台ビーチは韓国で最も有名なビーチのひとつで、朝7時台は地元の人がジョギングや散歩を楽しむ穏やかな時間です。ビーチ沿いのカフェでコーヒーを飲み、海雲台市場で朝食を取るのがおすすめです。近くの海東龍宮寺は海に面した珍しい寺院で、足を延ばす価値があります。\n\n" +
            "「釜山・海雲台ビーチの朝散歩」で、ビーチから市場、寺院への歩き方を紹介しています。",
        },
        {
          heading: "南浦洞とジャガルチ市場: 釜山の台所",
          body:
            "南浦洞は釜山の旧市街で、BIFF広場（映画の街通り）やレトロな商店街が広がるエリアです。すぐ近くのジャガルチ市場は韓国最大の水産市場で、新鮮な刺身をその場で食べられます。国際市場では衣料品や日用品の激安ショッピングも楽しめます。地下鉄南浦駅下車。\n\n" +
            "「釜山・南浦洞とジャガルチ市場の散策」で、市場の楽しみ方とエリアの歩き方を紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "釜山の街歩きは春（4月〜5月）と秋（9月〜11月）がベストです。夏はビーチが賑わいますが暑さが厳しいです。冬は穏やかですが海風が冷たいです。\n\n" +
            "東京から飛行機で約2時間、福岡から高速船（ビートル）で約3.5時間。金海国際空港から市内へは地下鉄またはリムジンバスで約40分。市内の地下鉄は日本語表示もあり使いやすいです。eSIMがあれば地下鉄の路線検索やレストランの口コミチェックがスムーズです。",
        },
      ],
      [
        { q: "釜山は何日必要ですか？", a: "2泊3日が理想です。1泊2日でも2エリアは十分回れます。" },
        { q: "韓国語が話せなくても大丈夫ですか？", a: "観光エリアは英語・日本語メニューが増えています。地下鉄の案内も多言語対応です。eSIMでGoogle翻訳が使えればさらに安心です。" },
        { q: "ソウルから日帰りで行けますか？", a: "KTX（韓国高速鉄道）で約2.5時間なので日帰り可能ですが、2エリア以上歩くなら1泊がおすすめです。" },
      ],
      hubCta("ja", "korea"),
    ),
    en: en(
      "Busan Neighborhood Walks 2026 | Gamcheon Village, Haeundae Beach, and Jagalchi",
      "Walking guides to Busan: colorful Gamcheon Culture Village, Haeundae Beach morning walk, and Nampo-dong market district. Three routes in South Korea's coastal second city.",
      img("File:Gamcheon Culture Village Busan.jpg", 1280, 853, "Gamcheon Culture Village", "Colorful hillside houses in Gamcheon Culture Village"),
      [
        img("File:Haeundae Beach Busan.jpg", 1280, 853, "Haeundae Beach", "Haeundae Beach in Busan"),
        img("File:Jagalchi Fish Market Busan.jpg", 1280, 960, "Jagalchi Market", "Jagalchi Fish Market in Busan"),
        img("File:Haedong Yonggungsa Temple.jpg", 1280, 960, "Haedong Yonggungsa", "Seaside Haedong Yonggungsa Temple"),
      ],
      [
        { url: "https://x.com/visitbusan/status/1800000000000000027", label: "Visit Busan" },
        { url: "https://x.com/busan_walks/status/1800000000000000028", label: "Busan walks" },
      ],
      [
        {
          heading: "Busan is a city of sea, slopes, and markets",
          body:
            "Busan is South Korea's second-largest city, built between mountains and the sea in a way that creates distinct walking experiences in each neighborhood. Gamcheon Culture Village stacks colorful houses on steep slopes. Haeundae Beach stretches open along the coast. Nampo-dong's retro streets and Jagalchi Market buzz with energy. Each area shows a different face of Busan.\n\n" +
            "This page covers three Busan walking routes. The subway connects all areas easily, with two areas per day as a comfortable pace.",
        },
        {
          heading: "Gamcheon Culture Village: Busan's hillside art village",
          body:
            "Gamcheon Culture Village cascades down a mountainside in colorful layers, earning the nickname 'Busan's Machu Picchu.' Art installations line the narrow alleys, and ocean-view photo spots appear at every turn. Take the maeul bus from Toseong subway station (about 10 minutes). Pick up the stamp-rally map at the entrance for efficient routing.\n\n" +
            "The Busan Gamcheon Culture Village guide covers the village walking route and photo spots.",
        },
        {
          heading: "Haeundae Beach morning walk: Korea's most famous shoreline",
          body:
            "Haeundae is one of South Korea's best-known beaches. Before 8 AM, the sand belongs to local joggers and morning walkers. A beachfront cafe coffee followed by breakfast at Haeundae Market sets the pace. Nearby Haedong Yonggungsa, a temple perched on the ocean cliffs, is worth the side trip.\n\n" +
            "The Busan Haeundae morning walk guide covers the beach-to-market-to-temple route.",
        },
        {
          heading: "Nampo-dong and Jagalchi: Busan's kitchen",
          body:
            "Nampo-dong is Busan's old downtown, with BIFF Square (the film-street plaza) and retro shopping arcades. Adjacent Jagalchi Market is South Korea's largest seafood market, where you can eat fresh sashimi on the spot. Gukje Market nearby offers bargain clothing and household goods. Exit at Nampo Station on the subway.\n\n" +
            "The Busan Nampo-Jagalchi walk guide covers market exploration and area routing.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Busan walks are best in spring (April–May) and autumn (September–November). Summer brings beach crowds and heat. Winter is mild but sea breezes are cold.\n\n" +
            "Flights from Tokyo take about 2 hours. The JR Beetle hydrofoil from Fukuoka runs about 3.5 hours. From Gimhae International Airport, the subway or limousine bus reaches the city center in about 40 minutes. The Busan subway has Japanese-language signage and is easy to use. An eSIM enables subway route searches and restaurant review checks.",
        },
      ],
      [
        { q: "How many days do I need for Busan?", a: "Two nights and three days is ideal. Even one night covers two areas comfortably." },
        { q: "Can I get by without Korean?", a: "Tourist areas increasingly offer English and Japanese menus. Subway signage is multilingual. Google Translate via eSIM adds further comfort." },
        { q: "Is a day trip from Seoul possible?", a: "KTX takes about 2.5 hours, making a day trip feasible. For two or more areas, an overnight stay is better." },
      ],
      hubCta("en", "korea"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 15. JEJU
  // ═══════════════════════════════════════════════════════════════════
  "jeju-neighborhood-walks": {
    ja: ja(
      "済州の街歩きガイド 2026 | 翰林海岸・西帰浦市場・牛島をめぐるルート",
      "翰林の海岸線散歩、西帰浦のオルレ市場散策、牛島のアイランドウォークなど、済州島の街歩きルートをまとめた総合ガイドです。",
      img("File:Jeju Jusangjeolli Cliff.jpg", 1280, 853, "柱状節理", "済州島・柱状節理帯"),
      [
        img("File:Hallim Coastal Road Jeju.jpg", 1280, 853, "翰林海岸", "済州島・翰林海岸の道"),
        img("File:Seogwipo Olle Market.jpg", 1280, 960, "西帰浦市場", "西帰浦オルレ市場"),
        img("File:Udo Island Jeju.jpg", 1280, 853, "牛島", "済州島沖の牛島"),
      ],
      [
        { url: "https://x.com/visitjeju/status/1800000000000000029", label: "Visit Jeju" },
        { url: "https://x.com/jeju_walks/status/1800000000000000030", label: "済州散歩" },
      ],
      [
        {
          heading: "済州島は「韓国のハワイ」以上の歩く島",
          body:
            "済州島は韓国最大の島で、「韓国のハワイ」と呼ばれるリゾート地ですが、歩いてこそ見つかる魅力がたくさんあります。火山島特有の地形、黒い溶岩と青い海のコントラスト、石垣に囲まれた畑、そして済州オルレ（トレイルコース）は歩く人のための島です。\n\n" +
            "このページでは済州の街歩きを3つのルートに分けて紹介しています。レンタカーがなくても、バスとタクシーでアクセスできるルートを選んでいます。",
        },
        {
          heading: "翰林の海岸線散歩: 済州西部の自然美",
          body:
            "翰林（ハルリム）は済州島の西部にある海辺の町で、挟才（ヒョプチェ）ビーチのエメラルドグリーンの海と翰林公園が見どころです。海岸沿いの散歩道は溶岩の岩場と砂浜が交互に現れ、済州島の火山地形を肌で感じられます。\n\n" +
            "「済州・翰林の海岸線散歩」で、ビーチから翰林公園への歩き方を紹介しています。",
        },
        {
          heading: "西帰浦のオルレ市場散策: 済州の味覚を歩く",
          body:
            "西帰浦（ソギポ）は済州島南部の中心都市で、オルレ市場は地元の食材と済州グルメが集まる庶民的な市場です。黒豚焼肉、アワビ粥、みかんジュースなど済州の味覚を食べ歩きできます。近くの天地淵（チョンジヨン）滝も徒歩圏内です。\n\n" +
            "「済州・西帰浦市場の散策」で、市場の歩き方と周辺スポットを紹介しています。",
        },
        {
          heading: "牛島のアイランドウォーク: 済州の中の済州",
          body:
            "牛島（ウド）は済州島東部から船で15分の小さな島で、済州島をさらに凝縮したような風景が広がります。一周約17kmの島を自転車やバスで回れますが、東側の海岸沿いは歩いて回るのが一番です。ピーナッツアイスクリームが名物です。\n\n" +
            "「済州・牛島のアイランドウォーク」で、島の歩き方とベストルートを紹介しています。",
        },
        {
          heading: "ベストシーズンとアクセス",
          body:
            "済州島の街歩きは春（4月〜5月の菜の花とチェリーブロッサム）と秋（9月〜11月）がベストです。夏はビーチシーズンですが暑く、冬は風が強いですがオフシーズンの静けさが魅力です。\n\n" +
            "東京から直行便で約2.5時間、ソウルから国内線で約1時間。済州空港から市内へはバスで約20分。島内はバスネットワークが充実していますが、eSIMがあればバスの路線検索やカフェの場所確認がスムーズです。",
        },
      ],
      [
        { q: "済州島はレンタカーなしで回れますか？", a: "主要スポットはバスでアクセスできます。ただし効率を求めるならレンタカーかタクシーチャーターがおすすめです。" },
        { q: "済州島は何日必要ですか？", a: "2泊3日が最低限。3泊4日あればオルレコースのハイキングも楽しめます。" },
        { q: "牛島はどうやって行きますか？", a: "城山港（ソンサンポ）からフェリーで約15分。1日で十分回れます。" },
      ],
      hubCta("ja", "korea"),
    ),
    en: en(
      "Jeju Neighborhood Walks 2026 | Hallim Coast, Seogwipo Market, and Udo Island",
      "Walking guides to Jeju Island: Hallim coastal trail, Seogwipo Olle Market food walk, and Udo Island loop. Three routes on South Korea's volcanic resort island.",
      img("File:Jeju Jusangjeolli Cliff.jpg", 1280, 853, "Jusangjeolli Cliff", "Columnar jointing cliffs on Jeju Island"),
      [
        img("File:Hallim Coastal Road Jeju.jpg", 1280, 853, "Hallim coast", "Hallim coastal road, Jeju"),
        img("File:Seogwipo Olle Market.jpg", 1280, 960, "Seogwipo Market", "Seogwipo Olle Market"),
        img("File:Udo Island Jeju.jpg", 1280, 853, "Udo Island", "Udo Island off Jeju's east coast"),
      ],
      [
        { url: "https://x.com/visitjeju/status/1800000000000000029", label: "Visit Jeju" },
        { url: "https://x.com/jeju_walks/status/1800000000000000030", label: "Jeju walks" },
      ],
      [
        {
          heading: "Jeju is more than 'Korea's Hawaii' — it is a walking island",
          body:
            "Jeju is South Korea's largest island, known as a resort destination, but its walking potential goes far deeper. Volcanic terrain creates dramatic contrasts between black lava and blue sea. Stone-walled fields, coastal trails, and the Jeju Olle trail network make this an island designed for walkers.\n\n" +
            "This page covers three Jeju walking routes, all accessible by bus and taxi without a rental car.",
        },
        {
          heading: "Hallim coastal walk: west Jeju's natural beauty",
          body:
            "Hallim is a seaside town on Jeju's west coast. Hyeopjae Beach's emerald water and Hallim Park are the main draws. The coastal path alternates between lava rock formations and sandy stretches, giving a physical sense of the island's volcanic origins.\n\n" +
            "The Jeju Hallim coastal walk guide covers the beach-to-park route.",
        },
        {
          heading: "Seogwipo Olle Market: tasting Jeju on foot",
          body:
            "Seogwipo is the main city on Jeju's south coast. Olle Market is a lively local market packed with Jeju ingredients and street food — black pork, abalone porridge, and tangerine juice for starters. Cheonjiyeon Waterfall is within walking distance.\n\n" +
            "The Jeju Seogwipo market walk guide covers market navigation and nearby spots.",
        },
        {
          heading: "Udo Island walk: Jeju within Jeju",
          body:
            "Udo is a small island 15 minutes by ferry from Jeju's east coast, offering a condensed version of Jeju's landscape. The 17 km circumference can be covered by bicycle or bus, but the east coast stretch is best on foot. Peanut ice cream is the island's signature snack.\n\n" +
            "The Jeju Udo Island walk guide covers the route and best sections for walking.",
        },
        {
          heading: "Best seasons and access",
          body:
            "Jeju walks are best in spring (April–May for canola flowers and cherry blossoms) and autumn (September–November). Summer is beach season but hot. Winter is windy but offers off-season quiet.\n\n" +
            "Direct flights from Tokyo take about 2.5 hours. Domestic flights from Seoul take about 1 hour. Buses from Jeju Airport reach the city center in about 20 minutes. The island's bus network is extensive, but an eSIM smooths route searches and cafe lookups.",
        },
      ],
      [
        { q: "Can I get around Jeju without a car?", a: "Main spots are bus-accessible, but a rental car or taxi charter is more efficient." },
        { q: "How many days do I need on Jeju?", a: "Two nights minimum. Three nights allows for Olle trail hiking as well." },
        { q: "How do I get to Udo Island?", a: "Ferry from Seongsan Port takes about 15 minutes. A full day covers the island comfortably." },
      ],
      hubCta("en", "korea"),
    ),
  },

  // ═══════════════════════════════════════════════════════════════════
  // 16. TAIPEI
  // ═══════════════════════════════════════════════════════════════════
  "taipei-neighborhood-walks": {
    ja: ja(
      "台北の街歩きガイド 2026 | 大稻埕・永康街・北投・松山をめぐるルート",
      "大稻埕の問屋街散策、永康街のグルメ散歩、北投温泉の散策、松山文創園区のカルチャーウォークなど、台北の街歩きルートをまとめた総合ガイドです。",
      img("File:Dihua Street Taipei.jpg", 1280, 853, "迪化街", "台北・迪化街の問屋街"),
      [
        img("File:Yongkang Street Taipei.jpg", 1280, 960, "永康街", "台北・永康街"),
        img("File:Beitou Hot Spring Museum.jpg", 1280, 960, "北投温泉博物館", "北投温泉博物館"),
        img("File:Songshan Cultural Park Taipei.jpg", 1280, 960, "松山文創園区", "松山文創園区のリノベーション建築"),
      ],
      [
        { url: "https://x.com/taiwantourism/status/1800000000000000031", label: "台湾観光局" },
        { url: "https://x.com/taipei_walks/status/1800000000000000032", label: "台北散歩" },
      ],
      [
        {
          heading: "台北は「MRTで行ける路地裏」が面白い",
          body:
            "台北は東アジアで最も路地裏が面白い都市のひとつです。清朝時代の問屋街・大稻埕、小籠包発祥の地・永康街、温泉地・北投、旧タバコ工場をリノベした松山文創園区と、MRT（地下鉄）で各エリアに手軽にアクセスでき、それぞれが徒歩圏内でコンパクトに歩けます。\n\n" +
            "このページでは台北の街歩きを4つのルートに分けて紹介しています。どれも半日プランで、2つを組み合わせれば充実の1日になります。",
        },
        {
          heading: "大稻埕・迪化街: 清朝の問屋街をリノベカフェと歩く",
          body:
            "大稻埕（ダーダオチェン）の迪化街は清朝末期からの問屋街で、乾物、漢方薬、布地の店が並びます。近年はバロック様式の建物をリノベーションしたカフェやセレクトショップが増え、新旧が混在する独特の空気があります。MRT大橋頭駅から徒歩約10分。\n\n" +
            "「台北・大稻埕と迪化街の散策」で、問屋街の歩き方とリノベスポットを紹介しています。",
        },
        {
          heading: "永康街のグルメ散歩: 小籠包と台湾スイーツの聖地",
          body:
            "永康街は鼎泰豊（ディンタイフォン）本店がある台北屈指のグルメストリートです。小籠包のほか、マンゴーかき氷、牛肉麺、タピオカミルクティーなど台湾を代表する味覚が1本の通りに集まっています。MRT東門駅直結で、食べ歩きと雑貨店巡りで2〜3時間楽しめます。\n\n" +
            "「台北・永康街のグルメ散歩」で、食べ歩きルートとおすすめ店を紹介しています。",
        },
        {
          heading: "北投温泉散策: 台北市内の温泉郷",
          body:
            "北投（ベイトウ）は台北市内からMRTで約30分の温泉地です。北投温泉博物館（和洋折衷の歴史建築）、地熱谷（硫黄の煙が立ち上る温泉池）、北投図書館（グリーン建築の図書館）と、温泉に入らなくても散策だけで楽しいエリアです。もちろん温泉も各種あります。\n\n" +
            "「台北・北投温泉の散策」で、温泉エリアの歩き方と見どころを紹介しています。",
        },
        {
          heading: "松山文創園区のカルチャーウォーク",
          body:
            "松山文創園区は旧タバコ工場をリノベーションした文化施設で、台湾のデザインショップ、ギャラリー、カフェが入っています。誠品生活松菸店（大型書店）も併設されており、半日のカルチャーウォークに最適です。MRT市政府駅から徒歩約10分。\n\n" +
            "「台北・松山文創園区の散策」で、園区内の歩き方とおすすめスポットを紹介しています。",
        },
      ],
      [
        { q: "台北は何日あれば楽しめますか？", a: "2泊3日で主要エリアは回れます。4つのルートすべて歩くなら3泊4日がおすすめです。" },
        { q: "中国語が話せなくても大丈夫ですか？", a: "MRTの案内は英語表示があり、観光地では英語メニューも増えています。日本語が通じるお店も多いです。" },
        { q: "夜市はどこがおすすめですか？", a: "士林夜市が最大ですが、寧夏夜市は規模がコンパクトでグルメの質が高いです。街歩きの後に寄れます。" },
        { q: "悠遊カード（EasyCard）は必要ですか？", a: "あると便利です。MRT、バス、コンビニで使え、各駅で購入できます。" },
      ],
      hubCta("ja", "taiwan"),
    ),
    en: en(
      "Taipei Neighborhood Walks 2026 | Dadaocheng, Yongkang, Beitou, and Songshan",
      "Walking guides to Taipei: Dadaocheng heritage street, Yongkang food lane, Beitou hot-spring village, and Songshan cultural park. Four MRT-accessible routes in Taiwan's capital.",
      img("File:Dihua Street Taipei.jpg", 1280, 853, "Dihua Street", "Dihua Street wholesale district in Dadaocheng, Taipei"),
      [
        img("File:Yongkang Street Taipei.jpg", 1280, 960, "Yongkang Street", "Yongkang Street in Taipei"),
        img("File:Beitou Hot Spring Museum.jpg", 1280, 960, "Beitou Hot Spring Museum", "Beitou Hot Spring Museum"),
        img("File:Songshan Cultural Park Taipei.jpg", 1280, 960, "Songshan Cultural Park", "Renovated architecture at Songshan Cultural and Creative Park"),
      ],
      [
        { url: "https://x.com/taiwantourism/status/1800000000000000031", label: "Taiwan Tourism" },
        { url: "https://x.com/taipei_walks/status/1800000000000000032", label: "Taipei walks" },
      ],
      [
        {
          heading: "Taipei's back lanes are just an MRT ride away",
          body:
            "Taipei is one of East Asia's most rewarding cities for lane-walking. Dadaocheng's Qing-dynasty wholesale streets, Yongkang Street where xiaolongbao originated, the hot-spring town of Beitou, and the converted tobacco factory at Songshan Cultural Park — each is an easy MRT ride from central Taipei and walkable in a compact radius.\n\n" +
            "This page covers four Taipei walking routes, each designed as a half-day plan. Combine two for a full day.",
        },
        {
          heading: "Dadaocheng and Dihua Street: Qing-era wholesalers meet renovation cafes",
          body:
            "Dadaocheng's Dihua Street has been a wholesale district since the late Qing dynasty, trading dried goods, Chinese medicine, and fabrics. In recent years, Baroque-style buildings have been converted into cafes and concept shops, blending old and new in a way that feels distinctly Taipei. About 10 minutes on foot from MRT Daqiaotou Station.\n\n" +
            "The Taipei Dadaocheng-Dihua walk guide covers the wholesale-street route and renovation highlights.",
        },
        {
          heading: "Yongkang Street food walk: xiaolongbao and Taiwanese sweets",
          body:
            "Yongkang Street is home to the original Din Tai Fung and concentrates Taipei's greatest food hits on a single lane — xiaolongbao, mango shaved ice, beef noodle soup, and bubble tea. Directly connected to MRT Dongmen Station, it fills two to three hours with eating and browsing the neighborhood's small shops.\n\n" +
            "The Taipei Yongkang Street walk guide covers the food route and recommended stops.",
        },
        {
          heading: "Beitou hot-spring village: onsen culture inside the city",
          body:
            "Beitou is a hot-spring district about 30 minutes from central Taipei by MRT. The Beitou Hot Spring Museum (a blended Japanese-Western heritage building), Thermal Valley (a steaming sulfur pool), and Beitou Public Library (a green-architecture landmark) make the area worth visiting even without bathing. Hot springs of various styles are available too.\n\n" +
            "The Taipei Beitou hot-spring walk guide covers the area's walking route and key attractions.",
        },
        {
          heading: "Songshan Cultural and Creative Park: a culture walk in a factory",
          body:
            "Songshan Cultural and Creative Park occupies a former tobacco factory renovated into galleries, Taiwanese design shops, and cafes. The attached Eslite Spectrum Songyan (a flagship bookstore) rounds out a half day of cultural browsing. About 10 minutes on foot from MRT City Hall Station.\n\n" +
            "The Taipei Songshan cultural walk guide covers the park layout and recommended stops.",
        },
      ],
      [
        { q: "How many days do I need in Taipei?", a: "Two nights cover the main areas. Three nights allows all four routes at a comfortable pace." },
        { q: "Can I get by without Mandarin?", a: "MRT signage includes English, and tourist areas increasingly offer English menus. Many shops understand basic Japanese too." },
        { q: "Which night market is best?", a: "Shilin is the largest, but Ningxia is more compact with higher food quality. Both work well after a day of walking." },
        { q: "Do I need an EasyCard?", a: "Highly recommended. It works on MRT, buses, and convenience stores, and is available at any station." },
      ],
      hubCta("en", "taiwan"),
    ),
  },
};

// ─── Related child slugs per hub ──────────────────────────────────
export const HUBS_JAPAN_KOREA_RELATED: Record<string, string[]> = {
  "nara-neighborhood-walks": [
    "nara-naramachi-walk",
    "nara-todaiji-quiet-morning",
    "nara-isuien-garden-walk",
  ],
  "hiroshima-neighborhood-walks": [
    "hiroshima-peace-park-river-walk",
    "onomichi-temple-slope-walk",
    "hiroshima-shukkeien-garden-walk",
  ],
  "fukuoka-neighborhood-walks": [
    "fukuoka-hakata-old-town-walk",
    "fukuoka-ohori-park-morning",
    "yanagawa-boat-canals-day",
  ],
  "yokohama-neighborhood-walks": [
    "yokohama-yamate-bluff-walk",
    "yokohama-motomachi-backstreets",
    "yokohama-waterfront-morning",
  ],
  "kamakura-neighborhood-walks": [
    "kamakura-kitakamakura-temple-walk",
    "kamakura-enoden-coastal-walk",
    "kamakura-komachi-and-beyond",
  ],
  "kobe-neighborhood-walks": [
    "kobe-kitano-ijinkan-walk",
    "kobe-nankinmachi-harbor-walk",
  ],
  "nagasaki-neighborhood-walks": [
    "nagasaki-dejima-glover-walk",
    "nagasaki-teramachi-walk",
    "nagasaki-peace-park-urakami-walk",
  ],
  "matsuyama-neighborhood-walks": [
    "matsuyama-dogo-onsen-walk",
    "matsuyama-castle-town-walk",
  ],
  "sendai-neighborhood-walks": [
    "sendai-jozenji-dori-walk",
    "sendai-aoba-castle-walk",
  ],
  "sapporo-neighborhood-walks": [
    "sapporo-tanukikoji-walk",
    "sapporo-maruyama-park-walk",
  ],
  "hakone-neighborhood-walks": [
    "hakone-old-tokaido-walk",
    "hakone-gora-park-walk",
  ],
  "nikko-neighborhood-walks": [
    "nikko-kanmangafuchi-walk",
    "nikko-temple-shrine-walk",
  ],
  "kagoshima-neighborhood-walks": [
    "kagoshima-tenmonkan-walk",
    "kagoshima-sengan-en-walk",
  ],
  "busan-neighborhood-walks": [
    "busan-gamcheon-culture-village",
    "busan-haeundae-morning-walk",
    "busan-nampo-jagalchi-walk",
  ],
  "jeju-neighborhood-walks": [
    "jeju-hallim-coastal-walk",
    "jeju-seogwipo-market-walk",
    "jeju-udo-island-walk",
  ],
  "taipei-neighborhood-walks": [
    "taipei-dadaocheng-dihua-walk",
    "taipei-yongkang-street-walk",
    "taipei-beitou-hot-spring-walk",
    "taipei-songshan-cultural-walk",
  ],
};

export const HUBS_JAPAN_KOREA_SLUGS = Object.keys(HUBS_JAPAN_KOREA_CONTENT);
