import type { GuideLocale } from "./extraGuides";

type GuideArticleContent = {
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaButton: string;
  breadcrumbGuide: string;
  breadcrumbHome: string;
};

function hubCta(locale: GuideLocale, city: "tokyo" | "kyoto" | "osaka" | "seoul" | "kanazawa") {
  const countryLabel = city === "seoul" ? "Korea" : "Japan";
  const countryLabelJa = city === "seoul" ? "韓国" : "日本";
  return locale === "ja"
    ? {
        ctaTitle: `${countryLabelJa}旅行の通信準備をまとめて確認する`,
        ctaButton: `${countryLabelJa}のeSIMを見る`,
        breadcrumbGuide: "ガイド",
        breadcrumbHome: "ホーム",
      }
    : {
        ctaTitle: `Get connected before your ${countryLabel} trip`,
        ctaButton: `View ${countryLabel} eSIM plans`,
        breadcrumbGuide: "Guides",
        breadcrumbHome: "Home",
      };
}

export const HUB_GUIDE_CONTENT: Record<string, Partial<Record<GuideLocale, GuideArticleContent>>> = {
  "tokyo-neighborhood-walks": {
    ja: {
      title: "東京の街歩きガイド 2026 | エリア別おすすめルートまとめ",
      description: "谷根千、清澄白河、蔵前、都電沿線など東京の静かな街歩きルートをエリア別にまとめた総合ガイドです。30以上の記事から目的に合ったルートが見つかります。",
      sections: [
        {
          heading: "東京の街歩きは「どのエリアか」で決まる",
          body:
            "東京の街歩きは、渋谷や新宿のような大きな駅を回ることではなく、路地と個人店が残る小さなエリアをゆっくり歩くことで成立します。谷中・根津・千駄木（谷根千）は寺町と喫茶のリズムが心地よく、清澄白河はコーヒーロースタリーの集積が際立ちます。蔵前は文具と器とベーカリーの密度が高く、都電荒川線沿線は昭和の空気がそのまま残っています。\n\n" +
            "このページでは30以上の街歩き記事を東京のエリア別に整理しています。初めての東京でも、二度目以降の東京でも、目的に合った半日ルートが見つけやすくなっています。",
        },
        {
          heading: "下町エリア: 谷根千・上野・日暮里",
          body:
            "東京の街歩きで最も始めやすいのが谷根千エリアです。JR日暮里駅または東京メトロ千代田線の根津駅・千駄木駅から歩き始められます。谷中銀座の商店街、根津神社のつつじ、千駄木の古い路地が徒歩圏内に集まっています。\n\n" +
            "「谷中・根津・千駄木の半日街歩きガイド」で基本ルートを確認できます。朝の静かな時間帯を狙うなら「根津・千駄木の朝散歩ガイド」、上野から歩きたいなら「上野から谷中への街歩きガイド」がそれぞれ参考になります。谷中霊園を経由するルート、へび道から根津神社へ抜けるルートなど、同じエリアでも切り口が異なる記事を用意しています。",
        },
        {
          heading: "水辺エリア: 清澄白河・門前仲町・深川",
          body:
            "清澄白河はブルーボトルコーヒーのフラッグシップを起点にしたコーヒー街歩きが定番です。清澄庭園の水辺、隅田川沿いの散歩道、門前仲町の深川不動尊まで足を延ばせば半日以上楽しめます。\n\n" +
            "「清澄白河のコーヒー街歩き」でロースタリー中心のルート、「門前仲町・深川の半日散歩」で下町らしい参道と商店街のルート、「森下・清澄の静かな街歩き」で地元の空気に近いルートがそれぞれ紹介されています。雨の日でもカフェホッピングを軸に回りやすいエリアです。",
        },
        {
          heading: "都電沿線・郊外エリア",
          body:
            "都電荒川線（東京さくらトラム）沿線は、東京で最も昭和の空気が残るエリアのひとつです。王子・飛鳥山、町屋、早稲田・面影橋など、各停留所ごとに異なる街の表情があります。\n\n" +
            "「東京都電沿線の街歩き」で全体像を把握し、「王子・飛鳥山の都電散歩」や「町屋・荒川の都電散歩」で個別エリアを深掘りできます。吉祥寺・井の頭公園、神楽坂、神保町・神田、中目黒・代官山、柴又など、山手線の外側にも魅力的な街歩きエリアが点在しています。",
        },
        {
          heading: "テーマ別の横断ガイド",
          body:
            "エリアを横断する切り口でもガイドを用意しています。「東京の朝散歩ガイド」は早朝から動きたい人向け、「雨の日の東京街歩き」は天候に左右されにくいルートをまとめています。「東京ローカル交通の半日旅」は都電やバスを使った移動術、「東京のマーケット・カフェ・地元の通り」は買い物と休憩を組み合わせたプランです。\n\n" +
            "これらのテーマ別記事は、特定のエリアに決めきれないときや、天候・時間帯で柔軟に動きたいときに便利です。",
        },
      ],
      faq: [
        { q: "東京の街歩きで初心者におすすめのエリアはどこですか？", a: "谷根千（谷中・根津・千駄木）が最も歩きやすいです。駅から近く、道に迷いにくく、休憩スポットも多いです。" },
        { q: "1日で何エリア回れますか？", a: "2エリアが目安です。午前に1エリア、移動して午後にもう1エリアくらいが満足度が高くなります。3エリアは駆け足になりがちです。" },
        { q: "雨の日でも街歩きはできますか？", a: "はい。清澄白河のカフェ巡り、谷中銀座や商店街のあるエリアなら、雨でも十分楽しめます。「雨の日の東京街歩き」で詳しく紹介しています。" },
      ],
      ...hubCta("ja", "tokyo"),
    },
    en: {
      title: "Tokyo Neighborhood Walks 2026 | Area-by-Area Route Guide",
      description: "A comprehensive guide to Tokyo's quieter neighborhood walks organized by area: Yanaka, Kiyosumi-Shirakawa, Kuramae, tram lines, and more. Over 30 routes to match your pace.",
      sections: [
        {
          heading: "Tokyo walking is about choosing the right neighborhood",
          body:
            "The best Tokyo walks are not about covering major stations. They happen in the smaller pockets where old lanes, independent shops, and local rhythm still set the pace. Yanaka-Nezu-Sendagi offers temple-town texture with coffee breaks. Kiyosumi-Shirakawa is Tokyo's most concentrated coffee-roastery district. Kuramae is dense with stationery shops, ceramics, and bakeries. The Toden Arakawa tram line preserves mid-century Tokyo atmosphere stop by stop.\n\n" +
            "This page organizes over 30 walking guides by Tokyo area so you can find a half-day route that fits your interests, whether it is your first or fifth time in the city.",
        },
        {
          heading: "Shitamachi: Yanaka, Nezu, Sendagi, and Ueno",
          body:
            "The Yanaka-Nezu-Sendagi area (often called Yanesen) is the easiest entry point for quiet Tokyo walking. Start from JR Nippori or Metro Nezu/Sendagi stations. Yanaka Ginza shopping street, Nezu Shrine's azalea garden, and Sendagi's old residential lanes are all within walking distance of each other.\n\n" +
            "The Yanaka-Nezu-Sendagi half-day walk covers the standard route. For a morning-focused version, see the Nezu-Sendagi morning walk. If you want to start from Ueno, the Ueno-to-Yanaka walk connects the park district to the old-town lanes. Multiple route variations cover the Yanaka cemetery path, Hebi-michi lane to Nezu Shrine, and Nishi-Nippori approaches.",
        },
        {
          heading: "Waterfront: Kiyosumi-Shirakawa, Monzen-Nakacho, Fukagawa",
          body:
            "Kiyosumi-Shirakawa anchors Tokyo's specialty coffee scene with Blue Bottle's flagship roastery as the starting point. Kiyosumi Garden's pond, Sumida River walking paths, and Monzen-Nakacho's Fukagawa Fudoson temple are all reachable on foot for a strong half day.\n\n" +
            "The Kiyosumi-Shirakawa coffee walk focuses on roastery-first routing. The Monzen-Nakacho and Fukagawa guide covers the temple-and-market side. The Morishita-Kiyosumi walk stays closer to local streets. This area works particularly well on rainy days because cafe-hopping provides natural shelter between stops.",
        },
        {
          heading: "Tram line and outer neighborhoods",
          body:
            "The Toden Arakawa Line (Tokyo Sakura Tram) runs through some of Tokyo's most unchanged mid-century neighborhoods. Oji and Asukayama Park, Machiya, and the Waseda-Omokagebashi stretch each have distinct character.\n\n" +
            "The Tokyo tram line stops overview covers the full line. Individual guides for Oji-Asukayama and Machiya-Arakawa go deeper into specific sections. Beyond the tram, Kichijoji and Inokashira Park, Kagurazaka's back alleys, Jimbocho's booktown, Nakameguro-Daikanyama side streets, and Shibamata's retro day trip all offer strong half-day walks outside the Yamanote loop.",
        },
        {
          heading: "Cross-area theme guides",
          body:
            "Several guides cut across neighborhoods by theme rather than area. Tokyo morning walks covers early-start routes. Rainy-day Tokyo neighborhoods lists weather-resistant options. Tokyo local transit half day uses trams and buses for mobility. Tokyo markets, cafes, and local streets combines shopping with rest stops.\n\n" +
            "These theme guides are most useful when you have not decided on a specific area yet, or when weather or timing calls for flexibility.",
        },
      ],
      faq: [
        { q: "Which Tokyo neighborhood is best for a first quiet walk?", a: "Yanaka-Nezu-Sendagi (Yanesen) is the easiest starting point: close to stations, hard to get lost, and full of rest stops." },
        { q: "How many areas can I cover in one day?", a: "Two is ideal. One area in the morning and another after lunch keeps the pace comfortable. Three tends to feel rushed." },
        { q: "Can I do these walks in the rain?", a: "Yes. Kiyosumi-Shirakawa cafe hopping and Yanaka Ginza shopping street work well in rain. See the rainy-day Tokyo guide for more options." },
      ],
      ...hubCta("en", "tokyo"),
    },
  },

  "kyoto-neighborhood-walks": {
    ja: {
      title: "京都の街歩きガイド 2026 | 定番の裏側を歩くエリア別ルート",
      description: "岡崎、出町柳、伏見、嵐山裏道、西陣など京都の静かな街歩きルートをまとめた総合ガイドです。寺社の裏側にある日常の京都を歩けます。",
      sections: [
        {
          heading: "京都の街歩きは「寺社の外側」で変わる",
          body:
            "京都の有名寺社はもちろん素晴らしいですが、本当に歩いて気持ちいいのは、その裏側や周辺に広がる日常の通りです。疏水沿いの美術館エリア、鴨川デルタの開放感、伏見の酒蔵通り、嵐山の早朝の裏道、西陣の町家が並ぶ路地。どれも観光客の密度が低く、京都らしい空気を味わいやすいエリアです。\n\n" +
            "このページでは京都の街歩き記事を5つのエリアに分けて紹介しています。金閣寺や清水寺の後に「もう少し静かな場所を歩きたい」と思ったとき、ここから選べます。",
        },
        {
          heading: "岡崎・疏水エリア: 美術館と水辺の半日",
          body:
            "京都市美術館（京セラ美術館）、国立近代美術館、平安神宮の大鳥居が集まる岡崎エリアは、東山の喧騒から少し離れた文化散歩に向いています。琵琶湖疏水沿いの桜並木は春が有名ですが、新緑の季節や秋も落ち着いて歩けます。地下鉄東山駅から徒歩5分。\n\n" +
            "「京都・岡崎の疏水と美術館の半日散歩」で、疏水沿いのルートと美術館の回り方を詳しく紹介しています。",
        },
        {
          heading: "出町柳・鴨川デルタ: 京都北部の余白",
          body:
            "出町柳は鴨川と高野川が合流する場所で、飛び石渡りができるデルタが有名です。糺の森を抜けて下鴨神社へ向かう散歩道は、京都で最も落ち着ける森林散策のひとつです。京阪出町柳駅が起点。時間があれば京都府立植物園まで北へ延ばせます。\n\n" +
            "「京都・出町柳と鴨川デルタの街歩き」で川沿い散歩から下鴨神社までのルートを紹介しています。",
        },
        {
          heading: "伏見・嵐山裏道・西陣: 個性の違う3エリア",
          body:
            "伏見の酒蔵エリアは、月桂冠大倉記念館を中心に運河沿いの蔵が並ぶ独特の風景が広がります。京阪中書島駅から徒歩圏内で、日本酒の試飲もできます。嵐山は早朝に裏道を歩くと、竹林の混雑を避けながら嵯峨野の田園風景に出会えます。JR嵯峨嵐山駅から北へ。\n\n" +
            "西陣は町家と織物の街で、千本通りから今出川通りにかけての路地に職人の気配が残ります。北野天満宮や上七軒の花街も徒歩圏内です。「京都・伏見の酒蔵街歩き」「京都・嵯峨嵐山の朝の裏通り」「京都・西陣の町家路地歩き」でそれぞれのルートを確認できます。",
        },
      ],
      faq: [
        { q: "京都の街歩きに一番おすすめの季節はいつですか？", a: "春（3月末〜4月中旬）と秋（11月中旬〜12月上旬）が最も歩きやすいですが、新緑の5月や冬の1〜2月も人が少なく快適です。" },
        { q: "有名寺社と組み合わせられますか？", a: "はい。例えば午前に清水寺や金閣寺を見て、午後に岡崎や西陣を歩くと、密度の違う京都を1日で味わえます。" },
      ],
      ...hubCta("ja", "kyoto"),
    },
    en: {
      title: "Kyoto Neighborhood Walks 2026 | Quieter Routes Beyond the Temples",
      description: "A guide to Kyoto's quieter walking routes: Okazaki canal, Demachiyanagi riverside, Fushimi sake district, Arashiyama backstreets, and Nishijin machiya lanes.",
      sections: [
        {
          heading: "Kyoto walking gets better away from the temple crowds",
          body:
            "Kyoto's famous temples are worth seeing, but the most comfortable walking often happens in the neighborhoods just behind them. The Okazaki canal museum district, the open space around the Kamo River delta, Fushimi's sake brewery streets, early-morning Arashiyama backroads, and Nishijin's machiya lanes all offer lower tourist density and a stronger sense of everyday Kyoto.\n\n" +
            "This page organizes five Kyoto walking guides by area. When you have already checked off Kinkaku-ji and Kiyomizu-dera and want something quieter, start here.",
        },
        {
          heading: "Okazaki and the canal: museums and waterside walking",
          body:
            "The Okazaki area clusters Kyoto City Museum of Art (Kyocera Museum), the National Museum of Modern Art, and Heian Shrine's giant torii within a calm canal-side setting. The Lake Biwa Canal path is famous for cherry blossoms in spring but stays pleasant in any season. Five minutes on foot from Higashiyama Station on the Tozai subway line.\n\n" +
            "The Kyoto Okazaki canal and museums walk covers the canal route and museum spacing in detail.",
        },
        {
          heading: "Demachiyanagi and Kamo Delta: north Kyoto breathing room",
          body:
            "Demachiyanagi sits where the Kamo and Takano rivers meet, forming the famous stepping-stone delta. The forest path through Tadasu no Mori to Shimogamo Shrine is one of the most peaceful walks in central Kyoto. Start from Keihan Demachiyanagi Station. If you have energy left, extend north to Kyoto Botanical Garden.\n\n" +
            "The Demachiyanagi and Kamo River walk covers the full riverside-to-shrine route.",
        },
        {
          heading: "Fushimi, Arashiyama backstreets, and Nishijin",
          body:
            "Fushimi's sake brewery district centers on the Gekkeikan Okura Museum with canal-side warehouses creating a townscape unlike anywhere else in Kyoto. Reachable on foot from Keihan Chushojima Station, with sake tasting along the way. Arashiyama's backstreets reward early risers with quiet paths through Sagano's rural landscape, away from the bamboo grove crowds. Start from JR Saga-Arashiyama and head north.\n\n" +
            "Nishijin is the weaving district where machiya townhouses and artisan workshops line narrow lanes between Senbon-dori and Imadegawa-dori. Kitano Tenmangu shrine and the Kamishichiken geiko district are within walking distance. See the Fushimi sake district walk, Saga-Arashiyama morning backstreets, and Nishijin machiya lanes guides for full routes.",
        },
      ],
      faq: [
        { q: "What is the best season for Kyoto neighborhood walks?", a: "Spring (late March to mid-April) and autumn (mid-November to early December) are ideal, but May's fresh green and quiet winter months of January-February also work well with fewer crowds." },
        { q: "Can I combine these with major temple visits?", a: "Yes. A morning at Kinkaku-ji or Kiyomizu-dera pairs well with an afternoon walk through Okazaki or Nishijin for a full day with contrasting Kyoto moods." },
      ],
      ...hubCta("en", "kyoto"),
    },
  },

  "osaka-neighborhood-walks": {
    ja: {
      title: "大阪の街歩きガイド 2026 | 道頓堀の外を歩くルート",
      description: "中之島のリバーサイドと住吉のレトロ路面電車、道頓堀やなんばの外にある大阪の静かな街歩きルートをまとめたガイドです。",
      sections: [
        {
          heading: "大阪の街歩きは「キタとミナミの外側」にある",
          body:
            "大阪の観光というと道頓堀、心斎橋、通天閣が定番ですが、静かに歩いて楽しいエリアはその外側にあります。中之島は堂島川と土佐堀川に挟まれた中洲で、大阪市中央公会堂や国立国際美術館が点在するリバーサイド散歩が楽しめます。住吉エリアでは阪堺電気軌道（路面電車）に乗って住吉大社まで向かうレトロなルートが、昭和の大阪を体感させてくれます。\n\n" +
            "このページでは2つの大阪街歩きルートを紹介しています。どちらもなんばや梅田から30分以内でアクセスでき、半日で十分楽しめます。",
        },
        {
          heading: "中之島リバーサイド: 水辺と近代建築の半日",
          body:
            "中之島は京阪中之島線なにわ橋駅が最寄りで、駅を出るとすぐに大阪市中央公会堂のレンガ造りの外観が見えます。東洋陶磁美術館、バラ園、国立国際美術館と川沿いに文化施設が並び、晴れた日はリバーウォークだけでも気持ちいいエリアです。\n\n" +
            "「大阪・中之島リバーサイドの半日散歩」で、川沿いの歩き方と美術館の回り方を詳しく紹介しています。",
        },
        {
          heading: "住吉・阪堺電車: レトロ路面電車で南大阪へ",
          body:
            "天王寺駅前から阪堺電車（路面電車）に乗ると、約20分で住吉大社の最寄り停留所に着きます。車窓から見える下町の風景、住吉大社の太鼓橋、周辺の古い商店街が大阪の別の顔を見せてくれます。片道210円で乗れる手軽さも魅力です。\n\n" +
            "「大阪・住吉のレトロ路面電車ルート」で、天王寺からの乗り方と住吉大社周辺の歩き方を紹介しています。",
        },
      ],
      faq: [
        { q: "道頓堀の後に行けますか？", a: "はい。中之島はなんばから地下鉄で10分、住吉は天王寺から路面電車で20分です。午後の散歩先として最適です。" },
        { q: "大阪の街歩きに適した時間帯は？", a: "中之島は午前中の光が川面に映えます。住吉は午後の穏やかな時間帯が歩きやすいです。" },
      ],
      ...hubCta("ja", "osaka"),
    },
    en: {
      title: "Osaka Neighborhood Walks 2026 | Beyond Dotonbori",
      description: "Quieter Osaka walks away from Dotonbori: Nakanoshima riverside museums and Sumiyoshi retro tram route. Two half-day routes you can reach in under 30 minutes from central Osaka.",
      sections: [
        {
          heading: "Osaka walking happens outside Kita and Minami",
          body:
            "Osaka's tourist core is Dotonbori, Shinsaibashi, and Tsutenkaku, but the city's most comfortable walks are in the margins. Nakanoshima is a sandbar island between the Dojima and Tosabori rivers, lined with the Osaka Central Public Hall, the National Museum of Art, and a long riverside promenade. The Sumiyoshi area offers a retro tram ride on the Hankai Railway to Sumiyoshi Taisha, one of Japan's oldest shrines, through unchanged working-class neighborhoods.\n\n" +
            "This page covers two Osaka walking routes. Both are under 30 minutes from Namba or Umeda and work well as half-day plans.",
        },
        {
          heading: "Nakanoshima riverside: waterfront and modern architecture",
          body:
            "Nakanoshima is closest to Naniwabashi Station on the Keihan Nakanoshima Line. Step out and the red-brick Osaka Central Public Hall is immediately visible. The Museum of Oriental Ceramics, a rose garden, and the National Museum of Art line the riverbanks. On a clear day, the river walk alone makes the trip worthwhile.\n\n" +
            "The Nakanoshima riverside day guide covers the walking route and museum spacing in detail.",
        },
        {
          heading: "Sumiyoshi and the Hankai tram: retro south Osaka",
          body:
            "Board the Hankai tram at Tennoji-ekimae and reach the Sumiyoshi Taisha stop in about 20 minutes. The window views of old-town streets, the shrine's arched Taiko-bashi bridge, and the surrounding vintage shopping streets reveal a side of Osaka most visitors never see. A one-way fare is just 210 yen.\n\n" +
            "The Sumiyoshi retro tram route guide covers how to ride from Tennoji and what to walk around Sumiyoshi Taisha.",
        },
      ],
      faq: [
        { q: "Can I visit after Dotonbori?", a: "Yes. Nakanoshima is 10 minutes by subway from Namba. Sumiyoshi is 20 minutes by tram from Tennoji. Both work well as afternoon destinations." },
        { q: "What time of day works best?", a: "Nakanoshima is best in morning light reflecting off the river. Sumiyoshi is most pleasant in the calm afternoon hours." },
      ],
      ...hubCta("en", "osaka"),
    },
  },

  "seoul-neighborhood-walks": {
    ja: {
      title: "ソウルの街歩きガイド 2026 | 明洞の外を歩くルート",
      description: "ソウルの朝散歩と聖水洞カフェ街など、明洞や弘大の外にある静かなソウルの街歩きルートをまとめたガイドです。",
      sections: [
        {
          heading: "ソウルの街歩きは「観光エリアの外」で本領を発揮する",
          body:
            "ソウルの定番観光は明洞のショッピング、弘大のナイトライフ、景福宮の歴史探訪ですが、歩いて面白いのはその周辺の「まだ旅行者が少ないエリア」です。北村韓屋村の朝は観光客がまだ少なく、三清洞のカフェ通りも静かに歩けます。聖水洞はソウルのブルックリンと呼ばれるリノベーションカフェの集積地で、倉庫を改装したカフェやギャラリーが集まっています。\n\n" +
            "このページではソウルの街歩きルートを2つ紹介しています。どちらも地下鉄でアクセスしやすく、半日プランとして成立します。",
        },
        {
          heading: "ソウルの朝散歩: 北村・三清洞・仁寺洞",
          body:
            "ソウルの朝散歩は安国駅から始めるのが最も楽です。北村韓屋村の坂道は午前8時台ならほぼ貸し切り状態で、韓屋の瓦屋根と路地の静けさを味わえます。三清洞のカフェ通りを南下し、仁寺洞のギャラリー通りまで歩くと、約3時間で3つのエリアを無理なく回れます。\n\n" +
            "「ソウルの朝散歩ガイド」で、朝の時間帯に最適なルートと、カフェ休憩のタイミングを紹介しています。",
        },
        {
          heading: "聖水洞: リノベカフェとクリエイティブの集積地",
          body:
            "聖水駅（地下鉄2号線）から歩いてすぐのエリアに、倉庫をリノベーションしたカフェ、独立系ブランドのショップ、ギャラリーが集まっています。大林倉庫ギャラリーやオニオンカフェなど、建物自体が目的地になるスポットが多いのが特徴です。\n\n" +
            "「ソウル・聖水洞のサイドストリート散歩」で、駅からの歩き方とおすすめのカフェルートを紹介しています。午後から夕方にかけてが最も活気があります。",
        },
      ],
      faq: [
        { q: "ソウルの街歩きに韓国語は必要ですか？", a: "基本的には不要です。カフェやショップでは英語メニューが増えており、地下鉄の案内も英語表記があります。Google翻訳があればさらに安心です。" },
        { q: "明洞から聖水洞はどれくらいかかりますか？", a: "地下鉄で約20分です。明洞駅から4号線で東大門歴史文化公園駅へ行き、2号線に乗り換えて聖水駅で降ります。" },
      ],
      ...hubCta("ja", "seoul"),
    },
    en: {
      title: "Seoul Neighborhood Walks 2026 | Quieter Routes Beyond Myeongdong",
      description: "Quieter Seoul walks beyond Myeongdong and Hongdae: morning walks through Bukchon and Samcheong-dong, plus Seongsu-dong's renovated cafe district. Two practical half-day routes.",
      sections: [
        {
          heading: "Seoul walking gets interesting outside the tourist core",
          body:
            "Seoul's standard tourist circuit covers Myeongdong shopping, Hongdae nightlife, and Gyeongbokgung Palace, but the city's best walking happens in the neighborhoods where visitor density drops. Bukchon Hanok Village in the early morning is nearly empty, and Samcheong-dong's cafe lane stays calm. Seongsu-dong, called Seoul's Brooklyn, clusters renovated warehouse cafes, independent brand shops, and galleries in a formerly industrial zone.\n\n" +
            "This page covers two Seoul walking routes. Both are easily reachable by subway and work as half-day plans.",
        },
        {
          heading: "Seoul morning walks: Bukchon, Samcheong-dong, Insadong",
          body:
            "Start a Seoul morning walk from Anguk Station. Bukchon Hanok Village's hillside lanes are nearly private before 9 AM, with traditional tiled rooftops and quiet alleys at their atmospheric best. Walk south through Samcheong-dong's cafe street, then continue to Insadong's gallery lane for a comfortable three-hour route through three distinct areas.\n\n" +
            "The Seoul morning walks guide covers the best early-morning routing and cafe break timing.",
        },
        {
          heading: "Seongsu-dong: renovated cafes and creative district",
          body:
            "Step out of Seongsu Station (Line 2) into a neighborhood where converted warehouses house specialty cafes, independent fashion labels, and art galleries. Daelim Warehouse Gallery and Onion Cafe are among the spots where the building itself is the destination.\n\n" +
            "The Seoul Seongsu side streets guide covers the walking route from the station and recommended cafe stops. The area is most lively from afternoon into early evening.",
        },
      ],
      faq: [
        { q: "Do I need Korean for these walks?", a: "No. Cafes and shops increasingly offer English menus, and subway signage includes English. Google Translate adds extra comfort." },
        { q: "How long does it take to get from Myeongdong to Seongsu-dong?", a: "About 20 minutes by subway. Take Line 4 from Myeongdong to Dongdaemun History & Culture Park, transfer to Line 2, and exit at Seongsu Station." },
      ],
      ...hubCta("en", "seoul"),
    },
  },

  "kanazawa-neighborhood-walks": {
    ja: {
      title: "金沢の街歩きガイド 2026 | ひがし茶屋街と兼六園を静かに歩く",
      description: "金沢のひがし茶屋街の朝散歩と兼六園の庭園歩き、2つのルートをまとめた金沢街歩きガイドです。北陸新幹線で東京から約2.5時間。",
      sections: [
        {
          heading: "金沢は「歩く速度」で体験が変わる街",
          body:
            "金沢は北陸新幹線で東京から約2時間半、京都から特急サンダーバードで約2時間と、日帰りも可能なコンパクトな城下町です。兼六園、ひがし茶屋街、近江町市場という3大定番がありますが、どれも急いで回ると魅力が半減します。特にひがし茶屋街の朝と兼六園の早朝は、人が少なく、金沢の本来の静けさを体感できる時間帯です。\n\n" +
            "このページでは金沢の街歩きルートを2つ紹介しています。どちらも金沢駅からバスで15分以内のアクセスで、半日プランとして組み立てやすいです。",
        },
        {
          heading: "ひがし茶屋街の朝散歩: 観光客が来る前の茶屋建築",
          body:
            "ひがし茶屋街は金沢で最も格式の高い茶屋街で、出格子と紅殻格子の建築が通り沿いに並びます。日中は観光客で賑わいますが、午前8時台に訪れると、ほぼ貸し切りの状態で茶屋建築の美しさを味わえます。浅野川沿いの散歩道も朝の光が映えます。金沢駅からバスで約10分、橋場町バス停下車。\n\n" +
            "「金沢・ひがし茶屋街の朝散歩」で、早朝のルートと周辺の立ち寄りスポットを紹介しています。",
        },
        {
          heading: "兼六園の庭園歩き: 日本三名園を自分のペースで",
          body:
            "兼六園は日本三名園のひとつで、春の桜、夏の緑、秋の紅葉、冬の雪吊りと四季折々の表情があります。園内は約11万平方メートルと広く、霞ヶ池、徽軫灯籠、雁行橋など見どころが点在しています。早朝開園（季節により4時〜7時台）を狙えば無料で入園でき、静かな庭園を独占できます。\n\n" +
            "「金沢・兼六園の庭園歩き」で、季節ごとの見どころと効率のよい回り方を紹介しています。午前中に兼六園を歩き、午後にひがし茶屋街やにし茶屋街を回ると1日プランが組めます。",
        },
      ],
      faq: [
        { q: "金沢は日帰りで行けますか？", a: "東京から北陸新幹線で約2.5時間なので日帰りは可能です。ただし2エリアをゆっくり歩くなら1泊がおすすめです。" },
        { q: "金沢の街歩きに最適な季節は？", a: "春（4月上旬の桜）と秋（11月の紅葉）が人気ですが、冬の雪景色も兼六園では格別です。6月の梅雨時期は雨に濡れた茶屋街が美しく、穴場です。" },
      ],
      ...hubCta("ja", "kanazawa"),
    },
    en: {
      title: "Kanazawa Neighborhood Walks 2026 | Higashi Chaya and Kenroku-en at Your Own Pace",
      description: "Two Kanazawa walking routes: early-morning Higashi Chaya teahouse district and Kenroku-en garden. About 2.5 hours from Tokyo by Hokuriku Shinkansen.",
      sections: [
        {
          heading: "Kanazawa rewards a slower pace",
          body:
            "Kanazawa is a compact castle town about 2.5 hours from Tokyo by Hokuriku Shinkansen and 2 hours from Kyoto by Thunderbird express. The three main attractions, Kenroku-en Garden, Higashi Chaya teahouse district, and Omicho Market, all lose their charm when rushed. Early morning at Higashi Chaya and dawn at Kenroku-en offer the quiet, unhurried Kanazawa that most day-trippers never experience.\n\n" +
            "This page covers two Kanazawa walking routes. Both are under 15 minutes by bus from Kanazawa Station and work well as half-day plans.",
        },
        {
          heading: "Higashi Chaya morning walk: teahouse architecture before the crowds",
          body:
            "Higashi Chaya is Kanazawa's most prestigious geisha district, with distinctive lattice-front teahouses lining both sides of the main street. During the day it fills with tourists, but arriving before 9 AM gives you near-private access to the architecture. The Asano River walking path catches beautiful morning light. Take a bus from Kanazawa Station to Hashiba-cho stop, about 10 minutes.\n\n" +
            "The Kanazawa Higashi Chaya morning walk guide covers the early route and nearby stops.",
        },
        {
          heading: "Kenroku-en garden walk: one of Japan's three great gardens",
          body:
            "Kenroku-en is one of Japan's three most celebrated landscape gardens, with cherry blossoms in spring, deep green in summer, autumn foliage, and the iconic yukitsuri snow-protection ropes in winter. The 11-hectare grounds include Kasumigaike Pond, the Kotoji stone lantern, and Ganko-bashi Bridge. Early-morning openings (from 4 AM to 7 AM depending on season) offer free admission and a near-empty garden.\n\n" +
            "The Kanazawa Kenroku-en garden walk guide covers seasonal highlights and efficient routing. Walk Kenroku-en in the morning and follow with Higashi Chaya or Nishi Chaya in the afternoon for a full-day plan.",
        },
      ],
      faq: [
        { q: "Can I do Kanazawa as a day trip from Tokyo?", a: "Yes, the Hokuriku Shinkansen takes about 2.5 hours. But to walk both areas at a relaxed pace, an overnight stay is recommended." },
        { q: "What is the best season for Kanazawa walks?", a: "Spring cherry blossoms (early April) and autumn foliage (November) are popular, but winter snow scenery at Kenroku-en is exceptional. The rainy season in June makes Higashi Chaya's wet streets surprisingly photogenic." },
      ],
      ...hubCta("en", "kanazawa"),
    },
  },
};

export const HUB_GUIDE_RELATED: Record<string, string[]> = {
  "tokyo-neighborhood-walks": [
    "quiet-tokyo-neighborhoods",
    "yanaka-nezu-sendagi-walk",
    "kiyosumi-shirakawa-walk",
    "kuramae-walk",
    "tokyo-tram-line-stops",
    "rainy-day-tokyo-neighborhoods",
    "ueno-to-yanaka-walk",
    "nezu-sendagi-morning-walk",
    "monzen-nakacho-fukagawa-walk",
    "asakusa-kuramae-sumida-walk",
    "oji-asukayama-tram-walk",
    "nishi-nippori-yanaka-walk",
    "sendagi-yomise-dori-walk",
    "morishita-kiyosumi-walk",
    "ryogoku-kuramae-walk",
    "machiya-arakawa-tram-walk",
    "hebi-michi-nezu-shrine-walk",
    "yanaka-cemetery-and-cafe-walk",
    "kiyosumi-garden-coffee-roasters-walk",
    "kuramae-bridge-and-craft-walk",
    "waseda-omokagebashi-tram-walk",
    "tokyo-morning-walks",
    "tokyo-local-transit-half-day",
    "tokyo-waterfront-slow-route",
    "tokyo-old-town-hillside-walk",
    "tokyo-station-based-short-stays",
    "tokyo-markets-cafes-local-streets",
    "kichijoji-inokashira-park-morning",
    "kagurazaka-backstreets-walk",
    "jimbocho-kanda-booktown-walk",
    "nakameguro-daikanyama-side-streets",
    "shibamata-retro-day-trip",
  ],
  "kyoto-neighborhood-walks": [
    "kyoto-okazaki-canal-and-museums",
    "kyoto-demachiyanagi-kamo-walk",
    "kyoto-fushimi-sake-district-walk",
    "kyoto-saga-arashiyama-morning-backstreets",
    "kyoto-nishijin-machiya-lanes",
  ],
  "osaka-neighborhood-walks": [
    "osaka-nakanoshima-riverside-day",
    "osaka-sumiyoshi-retro-tram-route",
  ],
  "seoul-neighborhood-walks": [
    "seoul-morning-walks",
    "seoul-seongsu-side-streets-day",
  ],
  "kanazawa-neighborhood-walks": [
    "kanazawa-higashi-chaya-morning-walk",
    "kanazawa-kenrokuen-garden-walk",
  ],
};
