// Per-guide enrichment data for minor travel guides.
// These fields override the generic template content with concrete,
// region-specific copy that names real streets, stations, shrines, and stops.
// They are merged into MinorGuideLocaleConfig at config-resolution time so
// each article gets its own neighborhood-character intro, route walk-through,
// named anchor list, local-mistake notes, and bonus FAQs on top of the
// shared template scaffolding.
//
// Field length targets (per locale, per slug):
//   neighborhoodCharacter ~140-220 chars
//   concreteRoute         ~180-260 chars
//   namedStops            4 entries
//   localMistakes         ~150-220 chars
//   extraFaqs             2 entries
//
// All facts are intentionally written at the level of district structure,
// shrine names, station exits, and broadly known anchors so the content
// stays accurate even as individual shops change hands.

type EnrichmentBody = {
  neighborhoodCharacter: string;
  concreteRoute: string;
  namedStops: { name: string; note: string }[];
  localMistakes: string;
  extraFaqs: { q: string; a: string }[];
};

type Enrichment = {
  ja: EnrichmentBody;
  en: EnrichmentBody;
};

export const MINOR_GUIDE_ENRICHMENTS: Record<string, Enrichment> = {
  "quiet-tokyo-neighborhoods": {
    ja: {
      neighborhoodCharacter:
        "静かな東京とは、谷中・根津・千駄木・清澄白河・蔵前・神楽坂・上野桜木のように、戦前からの低層住宅地と寺社、商店街がコンパクトに残った地区の総称です。地名で覚えるより「JR山手線の内側で坂と路地が多い場所」と理解する方が現地で迷いません。",
      concreteRoute:
        "起点は千駄木駅2番出口かJR日暮里駅西口。最初に谷中銀座か夕やけだんだんで街区の高低差をつかみ、根津神社方面か上野桜木の上野桜木あたり経由で寺町を歩きます。半日プランなら最後は不忍池まで降りて上野駅で締めると山手線で各方面に戻れます。",
      namedStops: [
        { name: "夕やけだんだん(日暮里)", note: "谷中銀座の入口にある階段。低い街並みを一望できる" },
        { name: "根津神社(文京区)", note: "つつじ苑とつつじ祭りで有名。本殿と乙女稲荷の朱鳥居も外せない" },
        { name: "上野桜木あたり(谷中)", note: "古民家3棟を改装した複合店舗。カヤバベーカリーが入る" },
        { name: "不忍池(上野)", note: "蓮田と弁天堂。上野駅まで徒歩10分でアクセスが良い" },
      ],
      localMistakes:
        "「静かな東京」と聞いて谷中銀座だけを目指すと夕方は意外と混みます。混雑回避は朝9〜10時か15時以降が基本。月曜は谷中銀座の個人店が休む店が多く、根津神社から逆向きに歩くか別の半日に振り替える方がきれいです。",
      extraFaqs: [
        {
          q: "1日で全部のエリアを回れますか?",
          a: "回れますが満足度は下がります。谷中・根津と清澄白河・蔵前は山手線の内外で街の質感が違うので、半日ずつ別の日に分ける方が記憶に残ります。",
        },
        {
          q: "外国人でも歩きやすい順番は?",
          a: "千駄木駅から入って根津神社→へび道→谷中銀座→不忍池の順は迷いにくく、駅の数も少ないので翻訳アプリを開く回数が減ります。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Quiet Tokyo is shorthand for Yanaka, Nezu, Sendagi, Kiyosumi-Shirakawa, Kuramae, Kagurazaka, and the lower-rise blocks just inside the Yamanote loop where prewar lanes, shrines, and shotengai shopping streets are still tightly packed. Think of it as the part of Tokyo where slopes and side streets matter more than skyline.",
      concreteRoute:
        "Start at Sendagi Station Exit 2 or Nippori Station West Exit. Use Yuyake Dandan stairs and Yanaka Ginza to read the elevation change first, then move toward Nezu Shrine via Hebi-michi or through the Ueno Sakuragi corner before letting Shinobazu Pond close the half day at Ueno Station.",
      namedStops: [
        { name: "Yuyake Dandan stairs (Nippori)", note: "Top of Yanaka Ginza. Best single viewpoint for low-rise Tokyo" },
        { name: "Nezu Shrine (Bunkyo)", note: "Famous for the azalea garden and the Otome Inari vermilion torii row" },
        { name: "Ueno Sakuragi Atari (Yanaka)", note: "Three converted prewar houses, now home to Kayaba Bakery and small studios" },
        { name: "Shinobazu Pond (Ueno)", note: "Lotus pond and Benten-do. About 10 minutes on foot from Ueno Station" },
      ],
      localMistakes:
        "Going straight to Yanaka Ginza around sunset is the most common mistake — locals call it crowded by 4 pm. Try mornings before 10 am or after 3 pm. Many small Yanaka Ginza shops also close on Mondays, so reverse the route from Nezu Shrine if you arrive early in the week.",
      extraFaqs: [
        {
          q: "Can I cover all of these districts in one day?",
          a: "Technically yes, but quality drops. Yanaka and Nezu sit inside the Yamanote loop while Kiyosumi-Shirakawa and Kuramae sit outside it, and the texture is genuinely different. Splitting into two half days works much better.",
        },
        {
          q: "Which order is easiest for first-time foreign visitors?",
          a: "Sendagi Station to Nezu Shrine, then Hebi-michi, Yanaka Ginza, and finally Shinobazu Pond at Ueno is the simplest path because the stations are predictable and you barely need a translator app.",
        },
      ],
    },
  },

  "yanaka-nezu-sendagi-walk": {
    ja: {
      neighborhoodCharacter:
        "谷根千(やねせん)は谷中・根津・千駄木の3地区の頭文字。坂と寺町が密集する谷中、神社と路地の根津、住宅地の千駄木で歩行の質が変わります。3地区とも文京区と台東区の境界で、低層建築規制のおかげで戦前の街並みが残っています。",
      concreteRoute:
        "千駄木駅団子坂下出口が最も自然な起点。団子坂を上って森鴎外記念館の脇を抜け、根津神社へ。表参道から本殿、乙女稲荷の朱鳥居を見たら、へび道を北上して谷中銀座へ。最後は夕やけだんだんで上って日暮里駅で締めるのが定番ルートです。",
      namedStops: [
        { name: "森鴎外記念館(団子坂)", note: "鴎外の旧居跡。観潮楼から谷中の街並みが見える" },
        { name: "根津神社", note: "本殿は権現造の重要文化財。4月のつつじ祭りは早朝が空く" },
        { name: "へび道(藍染川跡)", note: "蛇行した暗渠の生活道路。地元住民の通り道なので静かに歩く" },
        { name: "谷中銀座", note: "夕やけだんだんから入ると一番きれい。猫グッズの店が多い" },
      ],
      localMistakes:
        "谷中銀座から逆向きに入って夕やけだんだんを下りると坂の感動が半減します。必ず日暮里側から上ってください。根津神社のつつじ祭り期間は本殿前が混むので、神苑(つつじ苑)を先に見て本殿は後回しにすると並びません。",
      extraFaqs: [
        {
          q: "ルート所要時間に休憩込みで何時間見ておけばいい?",
          a: "歩きだけで2時間、根津神社で30分、カフェ休憩30分、谷中銀座で買い食い30分とすると半日3.5〜4時間が現実的です。",
        },
        {
          q: "雨の日でも成立しますか?",
          a: "成立します。谷中銀座と根津神社は屋根や軒が多く、千駄木側のカフェ(谷中珈琲店など)で雨宿りできます。へび道だけは傘必須です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Yanesen is the local nickname for Yanaka, Nezu, and Sendagi — three districts straddling the Bunkyo and Taito ward border. Each one walks differently: Yanaka has temple-side slopes, Nezu has shrine grounds and quiet alleys, Sendagi is mostly low-rise housing. Strict building height rules have preserved the prewar street grid here.",
      concreteRoute:
        "Sendagi Station Dangozaka-shita Exit is the most natural start. Walk up Dango-zaka past the Mori Ogai Memorial Museum, then move to Nezu Shrine for the main hall and the Otome Inari torii row. Take Hebi-michi north into Yanaka Ginza, finish by climbing Yuyake Dandan to Nippori Station.",
      namedStops: [
        { name: "Mori Ogai Memorial Museum", note: "Sits on the writer's former home. Rooftop view over Yanaka roofs" },
        { name: "Nezu Shrine", note: "Important Cultural Property in gongen-zukuri style. Azalea garden in late April" },
        { name: "Hebi-michi (Aizome river path)", note: "A snaking covered-stream lane. Stay quiet — it's a residential walking street" },
        { name: "Yanaka Ginza", note: "Always enter from the Yuyake Dandan stairs side. Known for cat-themed shops" },
      ],
      localMistakes:
        "Walking Yanaka Ginza in reverse and going down Yuyake Dandan kills the slope reveal. Always climb up from Nippori. During azalea season at Nezu Shrine, see the garden first and visit the main hall afterwards — the queue at the main hall builds up before noon.",
      extraFaqs: [
        {
          q: "How many hours including breaks?",
          a: "Two hours of pure walking, 30 minutes at Nezu Shrine, 30 minutes for a cafe stop, 30 minutes for snacks at Yanaka Ginza. Plan around 3.5 to 4 hours for the half day.",
        },
        {
          q: "Does this work in the rain?",
          a: "Yes. Yanaka Ginza has covered shopfronts, Nezu Shrine has roofed walkways, and several Sendagi-side cafes (such as Yanaka Coffee Ten) work as rain shelters. Only Hebi-michi truly needs an umbrella.",
        },
      ],
    },
  },

  "kiyosumi-shirakawa-walk": {
    ja: {
      neighborhoodCharacter:
        "清澄白河は深川エリアの北端で、東京メトロ半蔵門線と都営大江戸線の交差駅。Blue Bottle Coffee日本1号店のオープン以来「東京のブルックリン」と呼ばれていますが、本当の魅力は清澄庭園と古い深川の生活感がコーヒーシーンと共存している点です。",
      concreteRoute:
        "清澄白河駅A3出口から清澄庭園(磯渡りと泉水)を15分歩き、清洲橋通りに出てBlue Bottle Coffee→ARiSE Coffee Roasters→All Press Espressoの三角形を回ります。最後は深川江戸資料館で江戸の長屋を見て、森下駅から大江戸線で帰るのが王道です。",
      namedStops: [
        { name: "清澄庭園", note: "明治の回遊式林泉庭園。岩を踏んで池を渡る磯渡りが名物" },
        { name: "Blue Bottle Coffee 清澄白河ロースタリー&カフェ", note: "倉庫改装の日本1号店。週末朝はかなり並ぶ" },
        { name: "深川江戸資料館", note: "等身大の江戸長屋セット。30〜45分で見終わる手頃なサイズ" },
        { name: "白河三丁目の深川いっぷく", note: "庭園と森下の間の路地茶屋。和菓子と煎茶で休憩" },
      ],
      localMistakes:
        "清澄庭園は月曜定休(祝日は翌日)。コーヒー店巡りだけで終わらせると庭園と街区のバランスが崩れます。Blue Bottleは平日午前中なら待ち時間ゼロのことも多く、混む土日午後は他のロースターに振った方が満足度が高いです。",
      extraFaqs: [
        {
          q: "コーヒー店を何件回るのが現実的?",
          a: "3件が上限です。エスプレッソ系を1件、ハンドドリップを1件、ロースタリーを1件のように種類で分けると味の違いも記憶に残ります。",
        },
        {
          q: "庭園の入園料は?",
          a: "一般150円、65歳以上70円(2026年現在)。Suica決済可。月曜と年末年始は休園です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Kiyosumi-Shirakawa is the northern edge of the Fukagawa area, sitting on both the Tokyo Metro Hanzomon Line and the Toei Oedo Line. Locals have called it 'Tokyo's Brooklyn' since Blue Bottle Coffee opened its first Japanese flagship here, but the real strength is that Kiyosumi Garden and older Fukagawa daily life sit right next to the coffee scene.",
      concreteRoute:
        "Exit A3 of Kiyosumi-Shirakawa Station leads you straight into Kiyosumi Garden — give the iso-watari stepping stones and the central pond at least 15 minutes. Then head onto Kiyosu-bashi-dori for the Blue Bottle / ARiSE Coffee Roasters / All Press Espresso triangle. Close at the Fukagawa Edo Museum and exit via Morishita Station on the Oedo Line.",
      namedStops: [
        { name: "Kiyosumi Garden", note: "Meiji-era stroll garden. The iso-watari stepping stones across the pond are the signature view" },
        { name: "Blue Bottle Coffee Kiyosumi-Shirakawa Flagship", note: "Original Japanese roastery in a converted warehouse. Long lines on weekend mornings" },
        { name: "Fukagawa Edo Museum", note: "Life-size Edo-era tenement reconstruction. Tight 30 to 45 minute visit" },
        { name: "Fukagawa Ippuku (Shirakawa 3-chome)", note: "Tiny tea house between the garden and Morishita. Wagashi and sencha pause" },
      ],
      localMistakes:
        "Kiyosumi Garden closes on Mondays (Tuesday if Monday is a holiday). Spending the whole half day on cafes alone unbalances the route. Blue Bottle on a weekday morning is often walk-in, while Saturday and Sunday afternoons can mean a 30-minute queue — consider rotating to ARiSE or All Press during peak times.",
      extraFaqs: [
        {
          q: "How many cafes can you realistically visit?",
          a: "Three is the practical maximum. Pick one espresso bar, one pour-over specialist, and one roastery so the styles are clearly different on the palate.",
        },
        {
          q: "What's the garden admission fee?",
          a: "150 yen for adults, 70 yen for seniors over 65 as of 2026. Suica is accepted. Closed on Mondays and during the New Year period.",
        },
      ],
    },
  },

  "kuramae-walk": {
    ja: {
      neighborhoodCharacter:
        "蔵前は浅草と秋葉原の中間に位置する旧倉庫街で、隅田川と江戸通りに挟まれた台東区南部のエリアです。職人系の文具・革・紙・コーヒーの小さな個人店が増え、地元では「東京のブルックリン2号」と呼ばれます。一区画ごとに店の質感が変わるのが歩きどころです。",
      concreteRoute:
        "都営浅草線蔵前駅A6出口から春日通りを越え、Kakimori、SyuRo、ペリカンベーカリー、From afarの順で江戸通りまで西に進みます。次に隅田川沿いに出て厩橋から蔵前橋を眺め、最後はカキモリ系列のink stand by kakimoriで自分のインクを詰めて締めるのが王道です。",
      namedStops: [
        { name: "Kakimori(カキモリ)", note: "オーダーノートの専門店。表紙、紙、リング、ゴムを選んで30分で完成" },
        { name: "ペリカンベーカリー喫茶店", note: "1942年創業ペリカンの食パン専門喫茶。トーストセットが昼まで" },
        { name: "SyuRo(シュロ)", note: "ブリキ缶と日用品の柳橋寄りの店。鳩居堂と並ぶ蔵前の代表" },
        { name: "蔵前橋(隅田川)", note: "1927年完成の鋼アーチ橋。スカイツリーが正面に見える" },
      ],
      localMistakes:
        "Kakimoriは平日でも午後は1〜2時間待ちが普通で、ノート製作したいなら開店10時直後に整理券を取るのが必須。月曜は多くの店が定休で蔵前歩きに不向きです。隅田川沿いは風が強い日は橋上の写真撮影だけ済ませて街区へ戻る方が快適です。",
      extraFaqs: [
        {
          q: "蔵前の店は土日も開いていますか?",
          a: "ほとんどは火〜日曜営業で月曜定休が多いです。ただし第2火曜休みの店もあるので、行きたい店は事前にInstagramで確認するのが安全です。",
        },
        {
          q: "浅草とセットで歩けますか?",
          a: "歩けます。蔵前駅から浅草駅は徒歩20分、隅田川沿いを北上すると景色が変わるので地下鉄より散歩の方がおすすめです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Kuramae sits between Asakusa and Akihabara on the south side of Taito Ward, wedged between the Sumida River and Edo-dori. Once a wholesale warehouse district, it now hosts small artisan studios for stationery, leather, paper, and coffee — locals jokingly call it Tokyo's second Brooklyn. Each block has its own retail texture.",
      concreteRoute:
        "From Toei Asakusa Line Kuramae Station Exit A6, cross Kasuga-dori and walk west via Kakimori, SyuRo, Pelican Bakery, and From afar before reaching Edo-dori. Then head out to the Sumida River, look at Umayabashi and Kuramae Bridge, and close the route at ink stand by kakimori where you can mix your own fountain-pen ink.",
      namedStops: [
        { name: "Kakimori", note: "Custom-notebook shop. Choose cover, paper, ring, and band — finished in about 30 minutes" },
        { name: "Pelican Bakery Cafe", note: "Cafe from the 1942 Pelican bakery. Toast sets only until early afternoon" },
        { name: "SyuRo", note: "Tin canisters and everyday objects near the Yanagibashi side. A Kuramae anchor since the early 2000s" },
        { name: "Kuramae Bridge", note: "Steel arch bridge from 1927. Tokyo Skytree visible head-on from the deck" },
      ],
      localMistakes:
        "Kakimori notebook builds run a 1 to 2 hour wait even on weekdays — grab a numbered ticket right at 10 am opening. Most Kuramae shops close on Mondays, so the district is a poor Monday choice. On windy days, do bridge photos quickly and head back to the inland blocks.",
      extraFaqs: [
        {
          q: "Are these shops open on weekends?",
          a: "Most run Tuesday to Sunday with Monday closed. A few add a second Tuesday closure each month, so check the shop's Instagram before showing up.",
        },
        {
          q: "Can I combine this with Asakusa?",
          a: "Yes. Kuramae Station to Asakusa Station is about a 20 minute walk and the Sumida River route is more scenic than the subway transfer.",
        },
      ],
    },
  },

  "tokyo-tram-line-stops": {
    ja: {
      neighborhoodCharacter:
        "東京で残る最後の路面電車「東京さくらトラム(都電荒川線)」は、三ノ輪橋〜早稲田の12.2kmを30の停留場で結ぶ単線です。東京の山の手と下町の境目を縫うように走り、王子・庚申塚・町屋など昭和の街並みが残る停留場周辺が観光価値の高い区間です。",
      concreteRoute:
        "王子駅前停留場から乗車し、飛鳥山(花見の名所)→巣鴨新田→庚申塚(とげぬき地蔵商店街経由)で町屋方面か、逆方向の早稲田まで乗ります。一日乗車券は400円、現金または都電パス対応IC決済。途中下車は2〜3停留場が現実的で、全部回ると半日以上かかります。",
      namedStops: [
        { name: "飛鳥山停留場", note: "桜の名所、無料モノレール「あすかパークレール」で公園山頂へ" },
        { name: "庚申塚停留場", note: "巣鴨地蔵通商店街(おばあちゃんの原宿)へ徒歩2分" },
        { name: "三ノ輪橋停留場", note: "始発駅で関東の駅百選。レトロアーケード商店街がすぐ脇" },
        { name: "鬼子母神前停留場", note: "雑司ヶ谷鬼子母神堂とけやき並木。早稲田寄りの隠れた名所" },
      ],
      localMistakes:
        "都電は1両編成で混雑時は乗れないことがあります。土日午後の飛鳥山〜王子区間は花見シーズンに大混雑するので、平日午前か朝早い時間に行くのが基本。一日乗車券は車内で買えますが、東京メトロの一日券とは別物なので注意です。",
      extraFaqs: [
        {
          q: "Suicaで乗れますか?",
          a: "乗れます。乗車は前ドアから後払い、運賃は均一170円(IC165円)。一日乗車券400円の方が3回以上乗るならお得です。",
        },
        {
          q: "終点まで全線乗るとどれくらいかかる?",
          a: "三ノ輪橋から早稲田まで約56分(信号待ちで前後)。途中下車なしなら片道1時間を見ておけば確実です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "The Tokyo Sakura Tram (formerly Toden Arakawa Line) is the city's last surviving streetcar line, running 12.2 km between Minowabashi and Waseda with 30 stops. It threads the seam between uptown and downtown Tokyo, and the most photogenic stretch sits around Oji, Koshinzuka, and Machiya where Showa-era streetscapes still survive.",
      concreteRoute:
        "Board at Oji-ekimae Stop and ride to Asukayama (cherry blossom hill), Sugamo Shinden, Koshinzuka (transfer to Sugamo Jizo-dori), or all the way to Waseda. A day pass is 400 yen, payable in cash or with the dedicated Toden pass IC. Two or three short stop-offs is realistic — riding the whole line with stops takes more than a half day.",
      namedStops: [
        { name: "Asukayama Stop", note: "Cherry-blossom hill with the free Asuka Park Rail mini-monorail to the summit" },
        { name: "Koshinzuka Stop", note: "Two minutes' walk to Sugamo Jizo-dori, the 'Harajuku for grandmothers' shopping street" },
        { name: "Minowabashi Stop", note: "Northern terminus and one of Japan's top 100 stations. Retro covered shopping arcade just outside" },
        { name: "Kishibojin-mae Stop", note: "Zoshigaya Kishibojin Hall and a zelkova tree avenue. A quieter highlight near the Waseda end" },
      ],
      localMistakes:
        "The trams are single-car so peak-hour rides can leave you behind. The Asukayama-Oji stretch is intensely crowded on spring weekends — go on a weekday morning or before 9 am instead. Day passes are sold on board, but they are separate from the Tokyo Metro day pass.",
      extraFaqs: [
        {
          q: "Can I tap in with Suica?",
          a: "Yes. Board through the front door and pay when exiting. Flat fare is 170 yen (165 yen with IC). The 400 yen day pass pays for itself after three rides.",
        },
        {
          q: "How long is the full end-to-end trip?",
          a: "Minowabashi to Waseda is roughly 56 minutes including signal stops. Allow one hour for a single direct ride.",
        },
      ],
    },
  },

  "rainy-day-tokyo-neighborhoods": {
    ja: {
      neighborhoodCharacter:
        "雨の日に強い東京街区とは、屋根のあるアーケード商店街、軒の深い古い商店、近距離に喫茶やベーカリーが集まる地区を指します。具体的には千駄木のよみせ通り、清澄白河の駅前カフェ街、蔵前の小さな店密集ブロック、神楽坂の毘沙門天周辺が代表格です。",
      concreteRoute:
        "千駄木駅出口2番→よみせ通り(谷中銀座と並行する屋根付き商店街)→根津神社拝殿(屋根あり)→不忍通りのカフェ→千駄木カヤバ珈琲で締める半日が最も雨に強いです。距離が短く、各立ち寄り先が傘を畳める屋内です。",
      namedStops: [
        { name: "よみせ通り商店街(千駄木)", note: "谷中銀座と並行する屋根付きのアーケード。雨でも傘いらず" },
        { name: "根津神社の楼門と拝殿", note: "本殿前は屋根があり、長時間の雨宿りに最適" },
        { name: "カヤバ珈琲(谷中)", note: "1938年創業の喫茶店。雨の日は店内が空く穴場" },
        { name: "千駄木 養源寺", note: "本堂と庫裏の軒下が広く、急な雷雨にも対応できる" },
      ],
      localMistakes:
        "雨だからといって地下街に潜るのは違います。日比谷や東京駅の地下街は雨除けですが「街歩き」にはなりません。屋根のある商店街と屋内休憩所が連続する千駄木〜谷中、清澄白河、神楽坂のような場所を選ぶ方が雨の半日として満足度が高くなります。",
      extraFaqs: [
        {
          q: "傘は折りたたみでも大丈夫ですか?",
          a: "風が強くなければ折りたたみで十分。商店街区間は傘なしで歩けるので、コンパクトな方が立ち寄り時に邪魔になりません。",
        },
        {
          q: "雨でカヤバ珈琲が混雑する時間帯は?",
          a: "土日の昼12〜14時は雨でも並びます。雨の日狙いなら15〜16時の遅い昼か、平日朝9時開店直後がおすすめです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "The Tokyo neighborhoods that hold up in rain are the ones with covered shotengai arcades, deep eaves on older shops, and a tight cluster of cafes and bakeries. Sendagi's Yomise-dori, the Kiyosumi-Shirakawa station-front cafe block, the small-shop core of Kuramae, and the Bishamonten area in Kagurazaka all qualify.",
      concreteRoute:
        "From Sendagi Station Exit 2, walk Yomise-dori (the covered arcade parallel to Yanaka Ginza), pause at Nezu Shrine's roofed main hall, drop into a Shinobazu-dori cafe, and finish at Kayaba Coffee in Yanaka. The whole loop is short and every anchor lets you collapse the umbrella.",
      namedStops: [
        { name: "Yomise-dori (Sendagi)", note: "Covered shopping arcade running parallel to Yanaka Ginza. No umbrella needed" },
        { name: "Nezu Shrine main hall", note: "Wide roofed approach perfect for waiting out a heavy shower" },
        { name: "Kayaba Coffee (Yanaka)", note: "Cafe founded in 1938. Less crowded on rainy days, especially mid-afternoon" },
        { name: "Yogen-ji Temple (Sendagi)", note: "Generous temple eaves work as an emergency rain shelter" },
      ],
      localMistakes:
        "Switching to underground arcades like Yaesu or Hibiya isn't the same as a neighborhood walk — it stops being a guide. Pick areas where covered shotengai and indoor breaks alternate (Sendagi-Yanaka, Kiyosumi-Shirakawa, Kagurazaka) and the rainy half day still feels like a real walk.",
      extraFaqs: [
        {
          q: "Will a folding umbrella be enough?",
          a: "Yes, unless it's windy. Most arcade segments don't need an umbrella at all, so a small folding model is easier to handle while shopping.",
        },
        {
          q: "When does Kayaba Coffee get crowded on rainy days?",
          a: "Saturdays and Sundays from 12 to 2 pm even in the rain. Aim for a 3 to 4 pm late lunch or weekday 9 am opening to avoid the line.",
        },
      ],
    },
  },

  "ueno-to-yanaka-walk": {
    ja: {
      neighborhoodCharacter:
        "上野から谷中へ抜けるルートは、JR上野駅・上野公園のにぎわいから、寛永寺の墓地と寺町を経由して、低層住宅地の谷中へ街の温度を下げていく散歩です。同じ台東区内なのに歩行密度が極端に変わるので、外国人旅行者に「東京のレイヤー」を実感させる教材として優秀です。",
      concreteRoute:
        "上野駅公園口→西郷さん像→東照宮→不忍池→上野桜木あたり(谷中口)→寛永寺墓地脇→朝倉彫塑館→谷中銀座→夕やけだんだん→日暮里駅というルート。距離は約3km、歩行時間2時間+休憩30分で半日として収まります。",
      namedStops: [
        { name: "上野東照宮", note: "1627年創建の重要文化財。金色殿と灯籠列が無料拝観区域から見える" },
        { name: "上野桜木あたり", note: "古民家3棟改装の複合施設。カヤバベーカリー、ビアホール、塩屋が同居" },
        { name: "朝倉彫塑館", note: "彫刻家朝倉文夫のアトリエ。中庭と屋上から谷中の街並みが見える" },
        { name: "夕やけだんだん", note: "谷中銀座の入口階段。日暮里側に降りると坂の落差が一番きれい" },
      ],
      localMistakes:
        "上野公園の桜や西洋美術館に時間を使いすぎると谷中まで体力が持ちません。上野は最初の30分で切り上げて、メインを谷中側に置くと記憶に残るルートになります。朝倉彫塑館は月木休館なのでカレンダー確認必須です。",
      extraFaqs: [
        {
          q: "上野駅から谷中まで何分ですか?",
          a: "公園口から上野桜木あたりまで徒歩約20分、谷中銀座入口まで約30分。平坦な道なので体力消費は少ないです。",
        },
        {
          q: "美術館とセットで歩けますか?",
          a: "国立西洋美術館か東京都美術館を上野で1館だけ見て、午後に谷中側というスケジュールが現実的です。2館見ると谷中まで体力が持ちません。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "The Ueno-to-Yanaka route deliberately steps down from the busy JR Ueno Station and Ueno Park crowds, through the Kaneiji temple grounds and graveyard, into the low-rise residential blocks of Yanaka. Both districts sit inside Taito Ward but the walking density changes so dramatically that this is one of the best routes for showing foreign visitors how Tokyo layers itself.",
      concreteRoute:
        "Exit Ueno Park Exit at JR Ueno Station, pass the Saigo statue, Toshogu, Shinobazu Pond, Ueno Sakuragi Atari, the Kaneiji graveyard edge, the Asakura Museum of Sculpture, Yanaka Ginza, Yuyake Dandan stairs, and finish at Nippori Station. Roughly 3 km, 2 hours of walking plus 30 minutes for breaks.",
      namedStops: [
        { name: "Ueno Toshogu Shrine", note: "Important Cultural Property founded 1627. The gold hall and stone lanterns are visible from the free zone" },
        { name: "Ueno Sakuragi Atari", note: "Three converted prewar houses housing Kayaba Bakery, a beer hall, and a salt shop" },
        { name: "Asakura Museum of Sculpture", note: "Home and studio of sculptor Fumio Asakura. Roof terrace looks down over Yanaka rooftops" },
        { name: "Yuyake Dandan stairs", note: "The Yanaka Ginza entry stairs. Always descend from the Nippori side to feel the slope drop" },
      ],
      localMistakes:
        "Spending too long on Ueno Park's cherry blossoms or Western art museum will burn the energy you need for Yanaka. Cap Ueno at 30 minutes and let Yanaka be the main act. Asakura Museum is closed on Mondays and Thursdays — confirm before going.",
      extraFaqs: [
        {
          q: "How long does it take to walk from Ueno Station to Yanaka?",
          a: "About 20 minutes from the Park Exit to Ueno Sakuragi Atari, around 30 minutes to the Yanaka Ginza entrance. The grade is gentle.",
        },
        {
          q: "Can I add a museum?",
          a: "Combining one museum (the National Museum of Western Art or Tokyo Metropolitan Art Museum) with the Yanaka half works. Two museums will leave you too tired for Yanaka.",
        },
      ],
    },
  },

  "nezu-sendagi-morning-walk": {
    ja: {
      neighborhoodCharacter:
        "根津と千駄木の朝(7〜10時)は文京区の中でも最も静かな時間帯。根津神社の朝拝、千駄木カフェの開店、団子坂の通学風景が同時に進行する現地時間で、観光客と地元住民の比率が逆転する瞬間が見られます。",
      concreteRoute:
        "千駄木駅団子坂下出口を7:30〜8:00に出発、団子坂→森鴎外記念館前→根津神社(朝7時参拝可)→不忍通りのモーニングカフェ(谷中珈琲店)で朝食→へび道→千駄木駅で解散の2.5時間構成が朝散歩として最も完成度が高いです。",
      namedStops: [
        { name: "団子坂(千駄木)", note: "森鴎外旧居『観潮楼』跡に向かう坂。朝の通学風景が見える" },
        { name: "根津神社 朝の本殿", note: "朝7時から参拝可能。御朱印は9時から" },
        { name: "谷中珈琲店", note: "千駄木〜根津間にある朝7時開店のチェーン系。コーヒー1杯400円前後" },
        { name: "へび道(藍染川跡)", note: "朝はジョギングと犬の散歩で住民が多いので、写真撮影は控えめに" },
      ],
      localMistakes:
        "朝散歩は気合を入れて回りすぎると後の半日が台無しになります。2時間程度で切り上げて、午後は別エリアか宿で休む方がトータルの満足度が高いです。根津神社の御朱印は9時開始なので、御朱印目当てなら出発を後ろにずらしてください。",
      extraFaqs: [
        {
          q: "朝の散歩で危ない場所はありますか?",
          a: "ありません。むしろ昼より静かで安全です。ただしへび道は街灯が暗いので、日の出前(冬の6時前など)は避けてください。",
        },
        {
          q: "根津神社で朝拝に参加できますか?",
          a: "毎日7時から朝拝があります。一般参拝者も参列可能で、所要15分程度。本殿前で静かに参列してください。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Mornings (7 to 10 am) are the quietest window in Nezu and Sendagi, even by Bunkyo Ward standards. The morning prayer at Nezu Shrine, the cafe openings on Sendagi, and the school commute up Dango-zaka all happen at once — you see the moment where local-resident-to-tourist ratio flips back to normal.",
      concreteRoute:
        "Start at Sendagi Station Dangozaka-shita Exit between 7:30 and 8:00, walk up Dango-zaka past the Mori Ogai Memorial site, visit Nezu Shrine main hall (open from 7 am), grab coffee at Yanaka Coffee Ten on Shinobazu-dori, walk Hebi-michi back, and finish at Sendagi Station. Total around 2.5 hours.",
      namedStops: [
        { name: "Dango-zaka (Sendagi)", note: "Slope leading to the former Mori Ogai residence Kanchoro. Morning school commute scenes" },
        { name: "Nezu Shrine main hall (early)", note: "Open for visits from 7 am. Goshuin stamps start at 9 am" },
        { name: "Yanaka Coffee Ten", note: "Local chain between Sendagi and Nezu. Opens at 7 am, single coffee around 400 yen" },
        { name: "Hebi-michi (Aizome stream path)", note: "Joggers and dog walkers in the morning — keep photos low-key" },
      ],
      localMistakes:
        "Pushing too hard on the morning walk wastes the rest of the half day. Cap it at two hours and keep the afternoon free. If you want a goshuin stamp from Nezu Shrine, push your start time later — they don't begin until 9 am.",
      extraFaqs: [
        {
          q: "Are mornings safe to walk?",
          a: "Yes, in fact safer and quieter than afternoons. The only caveat is that Hebi-michi has dim street lighting, so avoid it before sunrise in winter.",
        },
        {
          q: "Can foreign visitors join the morning prayer at Nezu Shrine?",
          a: "Yes. The morning prayer happens daily at 7 am, lasts about 15 minutes, and visitors can stand quietly at the main hall.",
        },
      ],
    },
  },

  "monzen-nakacho-fukagawa-walk": {
    ja: {
      neighborhoodCharacter:
        "門前仲町と深川は江戸三大祭りのひとつ「深川八幡祭り」の本拠地で、富岡八幡宮を中心とする下町です。江東区の西端で、清澄白河から南へ徒歩15分。寺社・運河・木場の歴史が一体となった東東京らしい街区で、観光客はまだ多くありません。",
      concreteRoute:
        "都営大江戸線・東京メトロ東西線門前仲町駅1番出口→富岡八幡宮(本殿と横綱力士碑)→深川不動堂(成田山東京別院)→永代通りを北上→清澄庭園もしくは深川江戸資料館(時間あれば)→清澄白河駅で締め。所要2.5〜3時間です。",
      namedStops: [
        { name: "富岡八幡宮", note: "1627年創建。江戸勧進相撲発祥の地で、横綱力士碑が境内にある" },
        { name: "深川不動堂", note: "成田山新勝寺の東京別院。護摩焚きは1日5回(平日9・11・13・15・17時)" },
        { name: "深川公園と深川公会堂", note: "区民の生活感が見える公園。富岡八幡宮の隣で休憩に良い" },
        { name: "永代橋方面の隅田川", note: "夕方の隅田川と永代橋のシルエットが美しい" },
      ],
      localMistakes:
        "深川八幡祭り本祭(3年に1度、8月中旬)の時期は神輿担ぎで大混雑するので観光不向き。逆に何もない平日は永代寺前の門前仲町商店街が地味に見えるので、富岡八幡宮と深川不動堂をじっくり見る心構えが必要です。",
      extraFaqs: [
        {
          q: "清澄白河と門前仲町はどっちが先?",
          a: "清澄白河→門前仲町の順がおすすめ。清澄庭園(月曜休)は午前中、深川不動堂の護摩焚きは午後の方が回数が多いので時間帯がきれいに合います。",
        },
        {
          q: "東京駅から何分かかりますか?",
          a: "東京駅から東京メトロ東西線で大手町→門前仲町まで約15分。乗換1回・距離が近いので半日散歩に組みやすいです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Monzen-Nakacho and Fukagawa are home to Tomioka Hachimangu Shrine, the host of one of Edo's three great festivals (the Fukagawa Hachiman Matsuri). This western edge of Koto Ward is a 15 minute walk south of Kiyosumi-Shirakawa, layering shrines, canals, and the old timber-yard history into a part of east Tokyo that is still mostly off the foreign tourist trail.",
      concreteRoute:
        "From Monzen-Nakacho Station Exit 1 (Toei Oedo or Tokyo Metro Tozai), walk to Tomioka Hachimangu Shrine, see the main hall and the yokozuna sumo monument, continue to Fukagawa Fudo-do (the Tokyo branch of Naritasan), then head north on Eitai-dori and finish at either Kiyosumi Garden or the Fukagawa Edo Museum. Total 2.5 to 3 hours.",
      namedStops: [
        { name: "Tomioka Hachimangu Shrine", note: "Founded 1627. Birthplace of Edo-era sumo. The yokozuna monument is in the grounds" },
        { name: "Fukagawa Fudo-do", note: "Tokyo branch of Naritasan Shinshoji. Goma fire ritual five times daily on weekdays at 9, 11, 13, 15, and 17" },
        { name: "Fukagawa Park", note: "Local-feeling park next to Tomioka Hachimangu. Good rest stop" },
        { name: "Sumida River near Eitaibashi", note: "Eitai Bridge silhouette is best in late afternoon" },
      ],
      localMistakes:
        "The Fukagawa Hachiman Festival (held every three years in mid-August) brings huge crowds — bad timing for casual sightseeing. On normal weekdays the shotengai near the shrine looks plain, so plan to spend most of your visual time on the shrine and the Fudo-do.",
      extraFaqs: [
        {
          q: "Should I do Kiyosumi-Shirakawa or Monzen-Nakacho first?",
          a: "Kiyosumi-Shirakawa first works better. Kiyosumi Garden closes Monday and prefers a morning visit, while the Fudo-do's goma rituals are more frequent in the afternoon.",
        },
        {
          q: "How far from Tokyo Station?",
          a: "About 15 minutes by Tokyo Metro Tozai Line via Otemachi. One transfer, very easy to slot into a half day.",
        },
      ],
    },
  },

  "asakusa-kuramae-sumida-walk": {
    ja: {
      neighborhoodCharacter:
        "浅草・蔵前・隅田川を結ぶルートは、観光地の浅草から職人街の蔵前へ歩行密度を落としていく半日です。隅田川と東京スカイツリーを背景にしながら、橋を渡る・くぐる・眺めるの3つを使い分けるのがこのエリアの歩き方の本質です。",
      concreteRoute:
        "東武伊勢崎線または東京メトロ銀座線浅草駅→雷門→仲見世→浅草寺(早朝が良い)→吾妻橋→隅田川テラスを南下→駒形橋→厩橋→蔵前のKakimoriや小さな店→蔵前駅で締め。距離は約3km、橋4つを通過する2.5時間ルートです。",
      namedStops: [
        { name: "雷門と仲見世通り", note: "浅草寺の参道。早朝7時前なら観光客がほとんどいない" },
        { name: "吾妻橋", note: "アサヒビール本社とスカイツリーを同じフレームに収められる定番撮影スポット" },
        { name: "隅田川テラス", note: "両岸に整備された遊歩道。江戸通り側を歩くと景色が変わる" },
        { name: "Kakimori(蔵前)", note: "蔵前ルートの定番。オーダーノートで30分の体験が可能" },
      ],
      localMistakes:
        "雷門前は午前10時以降は観光客で身動きが取れません。早朝7時前後に浅草に着いて雷門を見てから蔵前へ降りる順番が正解です。隅田川テラスは強風日に水しぶきが上がるので、川風が強い日は江戸通りを歩いた方が快適です。",
      extraFaqs: [
        {
          q: "浅草と蔵前の中間で食事するならどこ?",
          a: "ペリカンベーカリー喫茶店(蔵前駅近く)がおすすめです。1942年創業ペリカンの食パントーストが食べられます。",
        },
        {
          q: "東京スカイツリーまで歩けますか?",
          a: "歩けます。吾妻橋から押上駅まで約15分、スカイツリータウンまでは20分。蔵前ルートを優先するなら別の半日に分ける方がきれいです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "The Asakusa-Kuramae-Sumida route deliberately steps down from peak Asakusa tourism into the artisan blocks of Kuramae. The walking discipline here is bridge work — crossing them, going under them, and using them as photo anchors against the Sumida River and Tokyo Skytree backdrop.",
      concreteRoute:
        "From Asakusa Station (Tobu Isesaki or Tokyo Metro Ginza), walk to Kaminarimon, Nakamise, Senso-ji (best at sunrise), Azuma Bridge, head south along the Sumida River Terrace, cross Komagata Bridge and Umaya Bridge, drop into Kakimori and the smaller Kuramae shops, and finish at Kuramae Station. About 3 km, four bridges, 2.5 hours.",
      namedStops: [
        { name: "Kaminarimon and Nakamise", note: "Senso-ji approach. Almost empty before 7 am" },
        { name: "Azuma Bridge", note: "Classic photo spot — Asahi Beer headquarters and Tokyo Skytree in one frame" },
        { name: "Sumida River Terrace", note: "Riverside walkway on both banks. The Edo-dori side has different sightlines" },
        { name: "Kakimori (Kuramae)", note: "The signature Kuramae stop. 30-minute custom notebook build" },
      ],
      localMistakes:
        "Kaminarimon is impossible to enjoy after 10 am because of the crowds. Arrive in Asakusa around 7 am, see Kaminarimon first, then drop south into Kuramae. On windy days the river terrace gets sprayed — switch to Edo-dori inland.",
      extraFaqs: [
        {
          q: "Where should I eat between Asakusa and Kuramae?",
          a: "Pelican Bakery Cafe near Kuramae Station. Toast set built around the 1942-founded Pelican shokupan loaf.",
        },
        {
          q: "Can I extend the walk to Tokyo Skytree?",
          a: "Yes — Azuma Bridge to Oshiage Station is about 15 minutes, Tokyo Skytree Town about 20. But the Kuramae anchors fade if you stretch the day too far, so consider doing them on different half days.",
        },
      ],
    },
  },

  "oji-asukayama-tram-walk": {
    ja: {
      neighborhoodCharacter:
        "王子と飛鳥山は東京さくらトラム(都電)沿線の北端寄りで、北区の桜の名所として有名です。飛鳥山公園は徳川吉宗が江戸庶民の花見スポットとして整備した日本最古の公園で、明治・大正期の歴史的建築と路面電車・滑り台までが詰まったコンパクトな散歩エリアです。",
      concreteRoute:
        "JR京浜東北線王子駅中央口または都電王子駅前停留場→飛鳥山公園(あすかパークレールで山頂へ)→渋沢史料館・北区飛鳥山博物館・紙の博物館の3館→音無親水公園→音無橋→王子神社→駅で締め。2.5〜3時間の散歩です。",
      namedStops: [
        { name: "あすかパークレール", note: "無料の小型モノレール。王子駅前から飛鳥山山頂まで2分" },
        { name: "渋沢史料館", note: "渋沢栄一の旧邸跡。新一万円札の人物史を学べる" },
        { name: "音無親水公園", note: "石神井川の下流で水遊びができる谷状の公園。夏は涼しい" },
        { name: "王子神社", note: "東京十社のひとつで王子の地名由来。1322年創建" },
      ],
      localMistakes:
        "桜の季節(3月末〜4月初め)の土日は飛鳥山公園が大混雑するので、桜以外の季節か平日訪問が現実的です。3つの博物館は月曜休館なので訪問日を選んでください。あすかパークレールは雨天でも運行しますが強風時は休止することがあります。",
      extraFaqs: [
        {
          q: "博物館3館は全部見るべき?",
          a: "渋沢史料館だけ見ればこの地区の主題は十分。3館全部見るなら半日では足りないので、どれか1館に絞るのがきれいです。",
        },
        {
          q: "都電と京浜東北線、どっちで来るのがいい?",
          a: "京浜東北線が早いです(東京駅から約20分)。都電体験を優先するなら帰りに都電で池袋方面に抜けるのがおすすめ。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Oji and Asukayama sit on the northern half of the Tokyo Sakura Tram line in Kita Ward. Asukayama Park was originally laid out by shogun Tokugawa Yoshimune as a public hanami spot, making it one of Japan's oldest public parks. Today the small hilltop area packs three museums, prewar buildings, the tram, and a tiny mini-monorail into one compact walk.",
      concreteRoute:
        "From JR Keihin-Tohoku Oji Station Central Exit or the Toden Oji-ekimae stop, take the free Asuka Park Rail to the summit, visit the three museums (Shibusawa Memorial, Kita City Asukayama, and Paper Museum), descend through Otonashi Shinsui Park, cross Otonashi Bridge, and finish at Oji Shrine before returning to the station. 2.5 to 3 hours.",
      namedStops: [
        { name: "Asuka Park Rail", note: "Free mini-monorail from Oji Station to the Asukayama summit. About two minutes" },
        { name: "Shibusawa Memorial Museum", note: "Site of industrialist Shibusawa Eiichi's residence. Now featured on the new 10,000-yen note" },
        { name: "Otonashi Shinsui Park", note: "Valley-floor park along the Shakujii River. Cool spot for summer water play" },
        { name: "Oji Shrine", note: "One of the Tokyo Ten Shrines. Founded 1322 and the source of the Oji place name" },
      ],
      localMistakes:
        "Cherry season weekends (late March to early April) at Asukayama Park are extremely crowded. Visit off-season or on weekdays instead. All three museums close on Mondays. The Asuka Park Rail runs in rain but stops in heavy wind.",
      extraFaqs: [
        {
          q: "Should I see all three museums?",
          a: "Just the Shibusawa Memorial Museum is enough to anchor the day. Visiting all three doesn't fit a half day, so pick one.",
        },
        {
          q: "JR or tram to get here?",
          a: "JR Keihin-Tohoku is faster — about 20 minutes from Tokyo Station. Take the tram on the way out toward Ikebukuro if you want the streetcar experience.",
        },
      ],
    },
  },

  "nishi-nippori-yanaka-walk": {
    ja: {
      neighborhoodCharacter:
        "西日暮里から谷中へ抜けるルートは、JR山手線の駅を起点に下町へ降りる導線として最も実用的です。富士見坂(かつての富士山眺望スポット)、諏方神社、谷中銀座入口を順番に通るので、東京の地形と歴史が同時に体感できます。",
      concreteRoute:
        "JR西日暮里駅西口→道灌山通り→諏方神社(西日暮里駅西口から徒歩5分、東京城北の総鎮守)→富士見坂(現在は富士山見えず、説明板のみ)→夕やけだんだん→谷中銀座→朝倉彫塑館→千駄木駅で締め。2.5時間ルートです。",
      namedStops: [
        { name: "諏方神社(西日暮里)", note: "1205年創建。境内から下町を見下ろせる高台" },
        { name: "富士見坂(日暮里)", note: "都内で最後まで富士山が見えた坂。今は説明板だけ残る" },
        { name: "夕やけだんだん", note: "谷中銀座の入口階段。夕焼け時は観光客が増える" },
        { name: "朝倉彫塑館", note: "彫刻家朝倉文夫の旧居。屋上からの谷中の眺めは絶景" },
      ],
      localMistakes:
        "西日暮里駅西口は出口が複数あって迷いやすいので、改札を出たら「諏方神社方面」表示を探してください。富士見坂は実際には富士山が見えないので「説明板を読む場所」と割り切るのが正解です。",
      extraFaqs: [
        {
          q: "JRなら日暮里駅と西日暮里駅どっちで降りる?",
          a: "西日暮里駅の方が諏方神社に近く高低差を体験できます。日暮里駅から入ると平坦すぎて街区の落差が分かりにくくなります。",
        },
        {
          q: "雨の日でも歩けますか?",
          a: "歩けますが諏方神社と富士見坂はほぼ屋根なしです。雨の日は先に谷中銀座とよみせ通りに行く別ルートをおすすめします。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Walking from Nishi-Nippori down to Yanaka uses a JR Yamanote Line station as the entry point and is the most practical way to reach the old town from above. The route hits Fujimi-zaka (an old Mt. Fuji viewing slope), Suwa Shrine, and the Yanaka Ginza entry stairs in order, so you experience Tokyo's terrain and history together.",
      concreteRoute:
        "From JR Nishi-Nippori Station West Exit, walk Dokanyama-dori to Suwa Shrine (five minutes from the station, the old north Tokyo guardian shrine), then Fujimi-zaka (no Fuji view today, just an explanation board), Yuyake Dandan stairs, Yanaka Ginza, the Asakura Museum of Sculpture, and finish at Sendagi Station. 2.5 hours.",
      namedStops: [
        { name: "Suwa Shrine (Nishi-Nippori)", note: "Founded 1205. Hilltop grounds with a view down into the old town" },
        { name: "Fujimi-zaka (Nippori)", note: "The last slope in central Tokyo where Mt. Fuji could be seen. Now only a plaque" },
        { name: "Yuyake Dandan stairs", note: "Yanaka Ginza entry staircase. Crowded around sunset" },
        { name: "Asakura Museum of Sculpture", note: "Former home of sculptor Fumio Asakura. The roof terrace has the best Yanaka view" },
      ],
      localMistakes:
        "Nishi-Nippori West Exit has multiple sub-exits that confuse first-time visitors — look for the Suwa Shrine signage after the gates. Fujimi-zaka no longer has the Fuji view, so treat it as a 'read the plaque' stop rather than a sightseeing payoff.",
      extraFaqs: [
        {
          q: "JR Nippori or Nishi-Nippori — which station?",
          a: "Nishi-Nippori is closer to Suwa Shrine and gives you the elevation drop. Starting at Nippori is too flat and the district contrast disappears.",
        },
        {
          q: "Does it work in the rain?",
          a: "Mostly. Suwa Shrine and Fujimi-zaka are exposed. On rainy days, swap to a Yanaka Ginza and Yomise-dori focused route instead.",
        },
      ],
    },
  },

  "sendagi-yomise-dori-walk": {
    ja: {
      neighborhoodCharacter:
        "千駄木のよみせ通りは谷中銀座と並行する屋根付き商店街で、谷中側の観光客が少ない裏通り扱いです。地元住民の生活感が強く、夕方の買い物時間に行くと豆腐屋や惣菜屋の店先で会話が聞こえます。雨の日でも歩ける貴重なルートです。",
      concreteRoute:
        "千駄木駅団子坂下出口→不忍通りを北上→よみせ通り入口(谷中銀座の北側)→アーケード内を歩いてカフェや惣菜屋を覗く→谷中銀座とよみせ通りの分岐で左右を見比べる→夕やけだんだんで終了→日暮里駅で締め。2時間構成です。",
      namedStops: [
        { name: "よみせ通り商店街", note: "谷中銀座と並行する屋根付き商店街。観光客が少ない" },
        { name: "千駄木 養源寺", note: "よみせ通り近くの臨済宗寺院。境内は静か" },
        { name: "谷中銀座とよみせ通り分岐", note: "両方の街の質感が比較できる地点" },
        { name: "夕やけだんだん", note: "終点の階段。日暮里駅まで徒歩5分" },
      ],
      localMistakes:
        "よみせ通りは生活商店街なので、観光客向けのお土産は少ないです。買い物目的なら谷中銀座、生活感を見たいならよみせ通り、と目的を分けて歩く方が満足度が上がります。日曜定休の店が多いので平日午後がおすすめです。",
      extraFaqs: [
        {
          q: "よみせ通りと谷中銀座の違いは?",
          a: "谷中銀座は観光客向けの食べ歩き、よみせ通りは住民の生活買い物。同じ街区にあって性格が真逆です。",
        },
        {
          q: "傘なしで歩けますか?",
          a: "アーケード内はほぼ屋根があるので歩けます。出入口だけ気をつけてください。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Yomise-dori in Sendagi is a covered shopping arcade running parallel to Yanaka Ginza, treated by locals as the back-street version while Yanaka Ginza absorbs the tourist load. The shops here serve neighborhood residents — at the late-afternoon shopping rush you can hear conversations at the tofu shops and prepared-food counters.",
      concreteRoute:
        "From Sendagi Station Dangozaka-shita Exit, walk north on Shinobazu-dori, enter Yomise-dori from its north end (above the Yanaka Ginza fork), browse the cafes and side-by-side prepared-food shops in the arcade, compare the tone of the two streets at the fork, descend Yuyake Dandan, and finish at Nippori Station. About 2 hours.",
      namedStops: [
        { name: "Yomise-dori shopping arcade", note: "Covered shopping street parallel to Yanaka Ginza. Far fewer tourists" },
        { name: "Yogen-ji Temple (Sendagi)", note: "Rinzai-school temple near Yomise-dori. Very quiet grounds" },
        { name: "Yomise-dori / Yanaka Ginza fork", note: "Best viewpoint to compare the two streets side by side" },
        { name: "Yuyake Dandan stairs", note: "Endpoint staircase. Five minutes' walk to Nippori Station" },
      ],
      localMistakes:
        "Yomise-dori is a working neighborhood shotengai with few tourist souvenirs. Use it for daily-life observation, save the food souvenirs for Yanaka Ginza. Many shops close on Sundays, so weekday afternoons are best.",
      extraFaqs: [
        {
          q: "What's the difference between Yomise-dori and Yanaka Ginza?",
          a: "Yanaka Ginza is for tourist food browsing. Yomise-dori is for resident grocery shopping. They sit in the same district but feel almost opposite.",
        },
        {
          q: "Can I walk without an umbrella?",
          a: "Yes, the arcade is covered for most of its length. Only the entry and exit points are exposed.",
        },
      ],
    },
  },

  "morishita-kiyosumi-walk": {
    ja: {
      neighborhoodCharacter:
        "森下と清澄白河は都営大江戸線で1駅分の距離(徒歩15分)。森下側は江東区の住宅と古い下町、清澄白河側はカフェと庭園の街と、地下鉄1駅で街の表情が大きく変わるエリアです。両方を歩くと東東京の多層性が見えます。",
      concreteRoute:
        "都営大江戸線森下駅A2出口→深川神明宮(森下の地名由来)→清澄通りを北上→深川江戸資料館→清澄庭園(時間あれば)→清澄白河駅A3出口で締め。2〜2.5時間構成です。",
      namedStops: [
        { name: "深川神明宮", note: "森下の地名由来となった神社。1626年創建で深川エリア最古" },
        { name: "深川江戸資料館", note: "等身大の江戸長屋セット。30〜45分で見終わる" },
        { name: "清澄庭園", note: "明治の回遊式庭園。月曜定休に注意" },
        { name: "Blue Bottle Coffee 清澄白河", note: "ルートを清澄白河で締めるならコーヒー1杯で休憩" },
      ],
      localMistakes:
        "深川江戸資料館は月曜と第2・第4水曜定休なので訪問日を選んでください。森下→清澄白河の方向に歩く方が地形上自然で、逆順だと最後に住宅街で迷いやすくなります。",
      extraFaqs: [
        {
          q: "森下駅と清澄白河駅、どちらから始めるべき?",
          a: "森下駅から始める方がきれいです。古い下町→カフェ街の順で街の変化を体感できます。",
        },
        {
          q: "深川江戸資料館の入館料は?",
          a: "一般400円、小中学生50円(2026年現在)。Suica不可、現金のみです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Morishita and Kiyosumi-Shirakawa are one Toei Oedo Line stop apart, about a 15 minute walk between them. The Morishita side is older residential Koto Ward, while Kiyosumi-Shirakawa is the cafe-and-garden district. Walking both shows how dramatically east Tokyo can shift in just one subway stop.",
      concreteRoute:
        "From Toei Oedo Morishita Station Exit A2, visit Fukagawa Shinmei Shrine (the source of the Morishita place name), walk north on Kiyosumi-dori, stop at the Fukagawa Edo Museum, optionally visit Kiyosumi Garden, and finish at Kiyosumi-Shirakawa Station Exit A3. 2 to 2.5 hours.",
      namedStops: [
        { name: "Fukagawa Shinmei Shrine", note: "Origin of the Morishita place name. Founded 1626, oldest in Fukagawa" },
        { name: "Fukagawa Edo Museum", note: "Life-size Edo tenement reconstruction. Tight 30 to 45 minute visit" },
        { name: "Kiyosumi Garden", note: "Meiji-era stroll garden. Closed on Mondays" },
        { name: "Blue Bottle Coffee Kiyosumi-Shirakawa", note: "Natural finish at the original Japanese flagship" },
      ],
      localMistakes:
        "The Fukagawa Edo Museum is closed on Mondays and on the second and fourth Wednesdays — check the calendar. Walk Morishita to Kiyosumi-Shirakawa, not the reverse — the residential exit on the Morishita side is harder to navigate.",
      extraFaqs: [
        {
          q: "Which station should I start from?",
          a: "Morishita is the cleaner start. The transition from old residential streets to cafe district feels natural in that direction.",
        },
        {
          q: "What's the Fukagawa Edo Museum admission?",
          a: "400 yen for adults, 50 yen for elementary and middle school students as of 2026. Cash only — Suica is not accepted.",
        },
      ],
    },
  },

  "ryogoku-kuramae-walk": {
    ja: {
      neighborhoodCharacter:
        "両国と蔵前は隅田川の両岸に向かい合う街で、両国側は相撲と歴史(国技館・江戸東京博物館・回向院)、蔵前側は職人と新店舗の街。橋を渡るだけで街の役割が180度変わるのが歩きどころです。",
      concreteRoute:
        "JR総武線両国駅西口→国技館(外観のみ)→江戸東京博物館(改修中の場合は外観のみ)→回向院→両国橋を渡って蔵前へ→Kakimoriやペリカンベーカリーを覗く→蔵前駅で締め。約2.5km、2時間ルートです。",
      namedStops: [
        { name: "両国国技館", note: "1909年創建。場所中(1月・5月・9月)は当日券で観戦可能" },
        { name: "回向院(両国)", note: "1657年明暦の大火犠牲者供養に始まる寺院。鼠小僧の墓がある" },
        { name: "両国橋", note: "1659年初代架橋。現在の橋は1932年。蔵前へ徒歩5分" },
        { name: "蔵前 Kakimori", note: "オーダーノートの店。両国側の歴史と対になる現代蔵前の象徴" },
      ],
      localMistakes:
        "江戸東京博物館は2026年現在も改修工事中(再オープンは2026年以降)なので、館内見学を期待しないでください。両国場所中(1月・5月・9月)は両国駅周辺が大混雑するので避けるか、逆に観戦に行くかどちらかです。",
      extraFaqs: [
        {
          q: "両国国技館の中を見たいときは?",
          a: "本場所(年3回、各15日間)期間中なら当日券(2,200円〜)で観戦可能。それ以外の日は外観のみで、博物館も見れません。",
        },
        {
          q: "蔵前と両国どちらが先?",
          a: "両国→蔵前の順がきれいです。歴史の重い両国を先に見て、現代の蔵前で軽くする流れが歩きやすいです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Ryogoku and Kuramae face each other across the Sumida River. Ryogoku is the historical side — sumo, the Edo-Tokyo Museum, the Eko-in temple. Kuramae is the artisan and new-shop side. Crossing one bridge flips the whole identity of the route 180 degrees.",
      concreteRoute:
        "From JR Sobu Line Ryogoku Station West Exit, view the Kokugikan from the outside, pass the Edo-Tokyo Museum (under renovation through 2026), visit Eko-in, cross Ryogoku Bridge to Kuramae, and end the route at Kakimori or Pelican Bakery before reaching Kuramae Station. About 2.5 km, 2 hours.",
      namedStops: [
        { name: "Ryogoku Kokugikan", note: "Founded 1909. Same-day tickets available during the January, May, and September tournaments" },
        { name: "Eko-in Temple (Ryogoku)", note: "Built in 1657 to mourn victims of the Meireki Fire. Holds the grave of Nezumi Kozo" },
        { name: "Ryogoku Bridge", note: "First built 1659. Current bridge from 1932. Five minutes' walk to Kuramae" },
        { name: "Kakimori (Kuramae)", note: "Custom notebook shop. The modern Kuramae counterpoint to Ryogoku's history" },
      ],
      localMistakes:
        "The Edo-Tokyo Museum is still under renovation as of 2026 — don't plan an interior visit. During the January, May, and September sumo tournaments, crowds around Ryogoku Station are heavy. Either avoid those windows or commit to going for the matches.",
      extraFaqs: [
        {
          q: "How do I see inside the Kokugikan?",
          a: "Only during the three annual 15-day grand tournaments. Same-day tickets start around 2,200 yen. Outside tournament season the building is closed and the attached museum is too.",
        },
        {
          q: "Should I do Ryogoku or Kuramae first?",
          a: "Ryogoku first. The historical density is heavier — leading with it and finishing with Kuramae's lighter modern shops feels more balanced.",
        },
      ],
    },
  },

  "machiya-arakawa-tram-walk": {
    ja: {
      neighborhoodCharacter:
        "町屋と荒川区側の都電沿線は、観光地化していない正真正銘の生活の街です。町屋駅周辺は東京メトロ千代田線・京成線・都電の3線が交わる交通結節点で、駅前商店街と都電停留場が密接しています。荒川自然公園や尾久橋通り沿いの低層住宅地は外国人観光客がほぼ来ません。",
      concreteRoute:
        "東京メトロ千代田線町屋駅3a出口→町屋駅前停留場(都電)→町屋二丁目→荒川七丁目→荒川自然公園(プールと交通公園あり)→東尾久三丁目→宮ノ前停留場で降りて尾久八幡神社→宮ノ前駅で締め。1.5〜2時間です。",
      namedStops: [
        { name: "町屋駅前商店街", note: "千代田線・京成・都電の交差駅前商店街。生活感が強い" },
        { name: "荒川自然公園", note: "下水処理場の上に造られた人工公園。プールと交通公園あり" },
        { name: "尾久八幡神社", note: "宮ノ前停留場名の由来。1312年創建の地元の神社" },
        { name: "都電宮ノ前停留場", note: "町屋と尾久の境目。降りてすぐ尾久八幡神社" },
      ],
      localMistakes:
        "観光客向けのスポットがほぼないため、「歩いて街を見る」目的が明確でない人には向きません。都電1両編成は朝夕通勤時間帯に混むので、午前10時〜午後3時がおすすめです。",
      extraFaqs: [
        {
          q: "町屋に観光名所はありますか?",
          a: "ありません。これは観光名所を巡るルートではなく、東京の住宅街の質感を見るための散歩ルートです。",
        },
        {
          q: "都電沿線の他の停留場も降りるべき?",
          a: "町屋・宮ノ前・小台あたりが歩きやすいです。三ノ輪橋寄りは商店街が別の魅力です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Machiya and the Arakawa Ward stretch of the tram line are genuinely non-touristy residential Tokyo. Machiya itself is a transit hub — Tokyo Metro Chiyoda Line, Keisei, and the Tokyo Sakura Tram all meet here, with the shotengai and the tram stop sitting right next to each other. Arakawa Nature Park and the low-rise blocks along Ogubashi-dori see almost no foreign visitors.",
      concreteRoute:
        "From Tokyo Metro Chiyoda Machiya Station Exit 3a, ride or walk via Machiya-ekimae stop, Machiya-nichome, Arakawa-nanachome, Arakawa Nature Park (with a pool and traffic park), Higashi-Ogu-sanchome, and step off at Miya-no-mae stop for Ogu Hachiman Shrine. 1.5 to 2 hours.",
      namedStops: [
        { name: "Machiya-ekimae shotengai", note: "Shopping street outside the Chiyoda / Keisei / tram interchange. Strong local-life feel" },
        { name: "Arakawa Nature Park", note: "Built on top of a sewage treatment plant. Pool and traffic-education park inside" },
        { name: "Ogu Hachiman Shrine", note: "Source of the Miya-no-mae stop name. Founded 1312" },
        { name: "Miya-no-mae tram stop", note: "Border between Machiya and Ogu. Ogu Hachiman is right outside" },
      ],
      localMistakes:
        "There are essentially no tourist attractions here, so the route is wrong for visitors who want sightseeing density. Tram cars are single units and crowded during the morning and evening commute — go between 10 am and 3 pm.",
      extraFaqs: [
        {
          q: "Are there tourist attractions in Machiya?",
          a: "No. This is a 'see how Tokyo really lives' route, not an attraction crawl.",
        },
        {
          q: "Should I get off at other tram stops too?",
          a: "Machiya, Miya-no-mae, and Odai are the easiest to walk. The Minowabashi end is a different kind of shotengai experience.",
        },
      ],
    },
  },

  "hebi-michi-nezu-shrine-walk": {
    ja: {
      neighborhoodCharacter:
        "へび道(藍染川跡)は千駄木と根津の境界を蛇行して流れていた藍染川を暗渠化した生活道路です。文京区と台東区の境界そのものなので、片側が文京区、もう片側が台東区という珍しい街区。根津神社とセットで歩くと、川と神社と路地の関係が分かります。",
      concreteRoute:
        "千駄木駅団子坂下出口→不忍通りを南下→へび道入口→蛇行する暗渠道を北東方向へ→根津神社東門→本殿と乙女稲荷→西参道→不忍通り→千駄木駅で締め。2時間構成です。",
      namedStops: [
        { name: "へび道入口(千駄木)", note: "藍染川の旧河道。区境のため車道ではない歩行者道路" },
        { name: "根津神社東門", note: "へび道側からの入口。表参道よりも静か" },
        { name: "乙女稲荷神社", note: "根津神社境内の朱鳥居が連なる稲荷。観光客の写真スポット" },
        { name: "根津神社本殿", note: "1706年造営、国指定重要文化財。権現造の代表作" },
      ],
      localMistakes:
        "へび道は生活道路で住民の家の前を通るので、写真撮影は控えめに。早朝・夕方のジョギングや犬の散歩時間帯は道が狭く感じます。根津神社のつつじ祭り期間中(4月)は神苑が有料(500円)になります。",
      extraFaqs: [
        {
          q: "へび道はなぜ蛇行しているのですか?",
          a: "もともと藍染川という小さな川だったからです。暗渠化する際に川の蛇行をそのまま道路の形状にしたため、東京で珍しい曲がりくねった生活道路になりました。",
        },
        {
          q: "根津神社のつつじ祭りは見るべき?",
          a: "4月中旬〜下旬の2週間程度、神苑のつつじが見頃です。早朝(8〜9時)が空いていて、平日の方が圧倒的に楽です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Hebi-michi (literally 'snake road') is the covered-over path of the former Aizome stream that snaked along the Sendagi-Nezu border. It's also the Bunkyo / Taito ward boundary, so one side of the lane is technically in a different ward from the other — a rare street type in Tokyo. Pair it with Nezu Shrine to see how the stream, the shrine, and the alleys all connected historically.",
      concreteRoute:
        "From Sendagi Station Dangozaka-shita Exit, head south on Shinobazu-dori, enter Hebi-michi, follow the meandering covered-stream lane northeast, reach Nezu Shrine through the East Gate, see the main hall and the Otome Inari torii row, exit via the West approach, and return to Sendagi Station. About 2 hours.",
      namedStops: [
        { name: "Hebi-michi entry (Sendagi)", note: "Former bed of the Aizome stream. Pedestrian-only because it sits on the ward border" },
        { name: "Nezu Shrine East Gate", note: "Quieter entrance than the main approach, used by the Hebi-michi route" },
        { name: "Otome Inari Shrine (inside Nezu Shrine)", note: "Vermilion torii row inside the grounds. The famous photo spot here" },
        { name: "Nezu Shrine main hall", note: "Built 1706 in gongen-zukuri style. Important Cultural Property" },
      ],
      localMistakes:
        "Hebi-michi is a residential walking lane — keep photo activity discreet, especially in front of houses. Mornings and evenings can feel narrow because of joggers and dog walkers. During the azalea festival in April, the Nezu Shrine garden charges 500 yen for entry.",
      extraFaqs: [
        {
          q: "Why is Hebi-michi so curvy?",
          a: "Because the original Aizome stream meandered naturally. When it was covered over, the lane preserved the old streambed shape — a rare survival in central Tokyo.",
        },
        {
          q: "Is the Nezu Shrine azalea festival worth seeing?",
          a: "The peak runs roughly two weeks in mid to late April. Early morning (8 to 9 am) is much calmer, and weekdays are dramatically easier than weekends.",
        },
      ],
    },
  },

  "yanaka-cemetery-and-cafe-walk": {
    ja: {
      neighborhoodCharacter:
        "谷中霊園は徳川慶喜や横山大観など著名人の墓がある都立霊園で、面積約10万平米。霊園内は桜並木と石畳の道が縦横に走り、墓参りだけでなく散策路としても機能します。隣接する谷中銀座と組み合わせると「死者の街と生活の街」のコントラストが歩けます。",
      concreteRoute:
        "JR日暮里駅南口→谷中霊園西側入口→中央道(桜並木の名物道路)→徳川慶喜墓所→澤の屋旅館前→朝倉彫塑館前→夕やけだんだん→谷中銀座→千駄木駅で締め。2.5時間です。",
      namedStops: [
        { name: "谷中霊園 中央道", note: "桜並木の名物道路。春は花見スポットだが基本は静かな散歩道" },
        { name: "徳川慶喜墓所", note: "霊園内にある最後の将軍の墓。一般人も参拝可能" },
        { name: "朝倉彫塑館", note: "谷中の代表的な観光スポット。霊園散策後の休憩地" },
        { name: "カヤバ珈琲", note: "1938年創業の喫茶店。霊園散策後の定番カフェ" },
      ],
      localMistakes:
        "霊園内は静粛にし、墓地の写真撮影は墓石を入れずに桜並木のみにするのがマナーです。お盆と彼岸時期(8月13〜16日、3月20日前後、9月23日前後)は墓参の地元住民が増えるので散策には不向きです。",
      extraFaqs: [
        {
          q: "霊園内に入って大丈夫ですか?",
          a: "都立霊園なので自由に入れますが、葬儀中の場所を避け、墓石を直接撮影しないでください。桜並木の写真は問題ありません。",
        },
        {
          q: "霊園の散策時間はどれくらい必要?",
          a: "中央道だけなら30分、徳川慶喜墓所まで足を伸ばすと1時間。谷中全体の散歩なら2時間以上見てください。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Yanaka Cemetery is a Tokyo metropolitan cemetery covering roughly 100,000 square meters and holding the graves of figures like Tokugawa Yoshinobu and Yokoyama Taikan. Cherry-tree avenues and stone-paved paths cross the grounds, so it functions as a walking park as well as a cemetery. Pairing it with Yanaka Ginza next door gives you the deliberate contrast between a 'city of the dead' and a 'city of daily life.'",
      concreteRoute:
        "From JR Nippori Station South Exit, enter the cemetery's west side, walk the central avenue (the cherry-tree corridor), see the Tokugawa Yoshinobu grave, pass Sawanoya Ryokan and the Asakura Museum of Sculpture, descend Yuyake Dandan, walk Yanaka Ginza, and finish at Sendagi Station. About 2.5 hours.",
      namedStops: [
        { name: "Yanaka Cemetery central avenue", note: "Cherry-tree corridor. Hanami spot in spring, otherwise a calm walking path" },
        { name: "Tokugawa Yoshinobu grave", note: "The last shogun's grave inside the cemetery. Open to visitors" },
        { name: "Asakura Museum of Sculpture", note: "Yanaka's signature museum. A natural rest after the cemetery walk" },
        { name: "Kayaba Coffee", note: "Cafe founded in 1938. The default reset stop after the cemetery loop" },
      ],
      localMistakes:
        "Stay quiet inside the cemetery and avoid photographing individual gravestones — frame the cherry trees instead. Avoid the Bon and equinox visiting periods (August 13 to 16, around March 20, and around September 23) when local families are visiting graves.",
      extraFaqs: [
        {
          q: "Is it okay to walk into the cemetery?",
          a: "Yes — it's a metropolitan cemetery and open to the public. Avoid funeral services in progress and don't photograph graves directly. Cherry-avenue photos are fine.",
        },
        {
          q: "How long should the cemetery part take?",
          a: "30 minutes for just the central avenue, an hour if you walk to the Tokugawa Yoshinobu grave. Two hours for the full Yanaka loop afterward.",
        },
      ],
    },
  },

  "kiyosumi-garden-coffee-roasters-walk": {
    ja: {
      neighborhoodCharacter:
        "清澄白河のコーヒー街は、Blue Bottle Coffeeの2015年日本1号店オープン以来、少なくとも10店舗以上のスペシャルティロースタリーが集積しました。半径500m以内に主要なロースタリーが密集しているのは東京ではここだけで、コーヒー目当ての半日散歩として完成度が高いエリアです。",
      concreteRoute:
        "清澄白河駅A3出口→Blue Bottle Coffee→ARiSE Coffee Roasters→ALLPRESS ESPRESSO→THE CREAM OF THE CROP COFFEE→深川いっぷくで和菓子休憩→清澄庭園で散策→清澄白河駅A1出口で締め。2.5〜3時間です。",
      namedStops: [
        { name: "Blue Bottle Coffee 清澄白河ロースタリー", note: "倉庫改装の日本1号店。エスプレッソとシングルオリジンが基本" },
        { name: "ARiSE Coffee Roasters", note: "オーナー焙煎の小規模ロースタリー。ハンドドリップ専門" },
        { name: "ALLPRESS ESPRESSO Tokyo Roastery", note: "ニュージーランド発のロースタリー。倉庫感が強い空間" },
        { name: "清澄庭園", note: "コーヒーの後の散歩用。月曜定休に注意" },
      ],
      localMistakes:
        "5店舗以上回ろうとするとカフェイン過多で胃に来ます。3店舗(エスプレッソ系1、ハンドドリップ1、ロースタリー1)に絞るのが現実的。Blue Bottleの土日昼は1時間以上待つことがあるので、平日午前を狙ってください。",
      extraFaqs: [
        {
          q: "コーヒー店の平均価格は?",
          a: "エスプレッソ400〜600円、ハンドドリップ600〜900円、ペストリー400〜600円が相場(2026年現在)。3店舗回ると合計2,500〜4,000円程度です。",
        },
        {
          q: "コーヒー以外で食事はできる?",
          a: "Blue Bottleとi-i Coffeeはペストリーのみ。ランチを取りたいなら清澄白河駅周辺の定食屋(深川丼など)に行くのがおすすめです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Kiyosumi-Shirakawa's coffee corridor has built up since Blue Bottle Coffee opened its first Japanese flagship here in 2015 — at least ten specialty roasteries now sit within a 500 meter radius. No other Tokyo neighborhood concentrates this many serious roasters in one walking distance, making it the strongest coffee-focused half-day in the city.",
      concreteRoute:
        "From Kiyosumi-Shirakawa Station Exit A3, hit Blue Bottle Coffee, ARiSE Coffee Roasters, ALLPRESS ESPRESSO, and THE CREAM OF THE CROP COFFEE in turn. Add a wagashi tea pause at Fukagawa Ippuku, walk Kiyosumi Garden for the reset, and exit through Kiyosumi-Shirakawa Station Exit A1. 2.5 to 3 hours.",
      namedStops: [
        { name: "Blue Bottle Coffee Kiyosumi-Shirakawa Flagship", note: "Original Japanese flagship in a converted warehouse. Espresso and single-origin focused" },
        { name: "ARiSE Coffee Roasters", note: "Owner-roasted small batch operation. Pour-over only" },
        { name: "ALLPRESS ESPRESSO Tokyo Roastery", note: "New Zealand origin roastery. Strong industrial warehouse feel" },
        { name: "Kiyosumi Garden", note: "Use this as a post-coffee walk reset. Closed Mondays" },
      ],
      localMistakes:
        "Five or more shops in one session is too much caffeine. Limit to three (one espresso bar, one pour-over specialist, one roastery). Blue Bottle's Saturday and Sunday afternoons can mean an hour-plus wait — aim for a weekday morning instead.",
      extraFaqs: [
        {
          q: "What do drinks cost?",
          a: "Espresso 400 to 600 yen, pour-over 600 to 900 yen, pastries 400 to 600 yen as of 2026. Three shops typically run 2,500 to 4,000 yen total.",
        },
        {
          q: "Can I get lunch besides coffee?",
          a: "Blue Bottle and i-i Coffee only do pastries. For lunch try the local teishoku diners around Kiyosumi-Shirakawa Station (Fukagawa-meshi rice bowls are a regional specialty).",
        },
      ],
    },
  },

  "kuramae-bridge-and-craft-walk": {
    ja: {
      neighborhoodCharacter:
        "蔵前の橋(蔵前橋・厩橋・両国橋)と職人の店を組み合わせるルートは、隅田川の水景と内陸の小さな店舗の対比を歩く半日です。蔵前橋(1927年完成)は鋼製アーチ橋で、東京スカイツリーと隅田川を同じ画角に収められる撮影スポットとしても有名です。",
      concreteRoute:
        "都営浅草線蔵前駅A6出口→Kakimori→SyuRo→蔵前橋(撮影)→隅田川テラス→厩橋(撮影)→ペリカンベーカリー喫茶店→蔵前駅A0出口で締め。2.5時間ルートです。",
      namedStops: [
        { name: "蔵前橋", note: "1927年鋼製アーチ橋。スカイツリーが背景に入る橋撮影の定番" },
        { name: "厩橋", note: "1929年完成の3連アーチ橋。蔵前橋から徒歩5分の距離" },
        { name: "Kakimori", note: "オーダーノートの専門店。蔵前のクラフトシーンの代表" },
        { name: "ペリカンベーカリー喫茶店", note: "1942年創業ペリカンの直営喫茶。トーストセットが昼まで" },
      ],
      localMistakes:
        "橋の写真撮影は強風日に手すりから身を乗り出さないでください。隅田川は風が強いと水面が荒れて画面が暗くなります。日没後の橋ライトアップ時間(夏18時〜冬17時)は逆光になるので注意。",
      extraFaqs: [
        {
          q: "橋を全部渡る必要はありますか?",
          a: "渡るのは1〜2橋で十分。蔵前橋を渡って両国側まで行くか、厩橋を渡って本所側を覗くか、片方に絞ってください。",
        },
        {
          q: "Kakimoriのオーダーノート完成まで何分?",
          a: "選んだ部材の組み合わせ次第で20〜40分。整理券制なので朝開店直後に取りに行くのが最も早いです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Combining Kuramae's bridges (Kuramae, Umaya, and Ryogoku) with its small artisan shops gives you a half day built around the contrast between Sumida River water views and inland one-person retail. Kuramae Bridge itself, a 1927 steel arch, is a classic photo spot for framing Tokyo Skytree above the river.",
      concreteRoute:
        "From Toei Asakusa Line Kuramae Station Exit A6, visit Kakimori, SyuRo, walk out to Kuramae Bridge for photos, follow the Sumida River Terrace to Umaya Bridge, photograph again, finish at Pelican Bakery Cafe, and exit via Kuramae Station Exit A0. 2.5 hours.",
      namedStops: [
        { name: "Kuramae Bridge", note: "1927 steel arch bridge. Default photo spot with Tokyo Skytree behind" },
        { name: "Umaya Bridge", note: "1929 three-arch bridge. Five minutes' walk from Kuramae Bridge" },
        { name: "Kakimori", note: "Custom notebook shop. The signature Kuramae craft destination" },
        { name: "Pelican Bakery Cafe", note: "Cafe from the 1942 Pelican bakery. Toast sets only until early afternoon" },
      ],
      localMistakes:
        "On windy days, do not lean over the bridge railings to photograph. The Sumida churns and your photos darken. Bridge lighting comes on around 17:00 in winter and 18:00 in summer — that's a backlight risk if you're shooting east.",
      extraFaqs: [
        {
          q: "Do I have to cross all the bridges?",
          a: "One or two is enough. Either cross Kuramae Bridge to the Ryogoku side, or cross Umaya Bridge to the Honjo side, but don't try to do both.",
        },
        {
          q: "How long does a Kakimori notebook take?",
          a: "20 to 40 minutes depending on the parts you choose. It's a numbered-ticket system, so arriving right at opening gets you the earliest slot.",
        },
      ],
    },
  },

  "waseda-omokagebashi-tram-walk": {
    ja: {
      neighborhoodCharacter:
        "早稲田から面影橋までの都電終点エリアは、神田川と都電が並走する地形の楽しさが歩きどころです。早稲田大学キャンパスのすぐ脇を都電が走り、面影橋停留場の周りは神田川の桜と古い橋(豊川稲荷脇)が静かに残っています。",
      concreteRoute:
        "東京メトロ東西線早稲田駅3a出口→早稲田大学大隈講堂→早稲田キャンパス周辺→都電早稲田停留場→面影橋停留場→面影橋(神田川)→豊川稲荷→鬼子母神前停留場で都電に乗って引き返すか、JR目白駅まで徒歩。1.5〜2時間です。",
      namedStops: [
        { name: "早稲田大学大隈講堂", note: "1927年完成の早稲田の象徴。外観のみ無料で見学可能" },
        { name: "都電早稲田停留場", note: "都電荒川線の終点。1両編成の発着が見られる" },
        { name: "面影橋(神田川)", note: "神田川にかかる小さな橋。江戸時代から続く名所" },
        { name: "鬼子母神前停留場", note: "雑司ヶ谷鬼子母神堂への入口。けやき並木がある" },
      ],
      localMistakes:
        "早稲田大学のキャンパス内は大学関係者向けなので、観光客は外から眺めるだけにしてください。試験期間や受験シーズンは特に静かに歩くこと。面影橋周辺の桜は3月末〜4月初旬で、それ以外は地味な小川です。",
      extraFaqs: [
        {
          q: "早稲田大学に観光客は入れますか?",
          a: "正門から大隈講堂までは自由に入れますが、教室棟や図書館は入れません。大隈講堂は外観のみ無料見学可能です。",
        },
        {
          q: "面影橋は普通の橋ですか?",
          a: "はい、長さ20m程度の小さな橋です。江戸時代から続く地名と桜の風景を見るための立ち寄り先で、構造的に特別ではありません。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "The Waseda end of the Tokyo Sakura Tram, especially the Omokagebashi area, is built around the visual play of the tram line running parallel to the Kanda River. The streetcar passes right beside Waseda University, and the Omokagebashi stop area still preserves the small river bridge and the Toyokawa Inari shrine in a quietly historic block.",
      concreteRoute:
        "From Tokyo Metro Tozai Waseda Station Exit 3a, see the Okuma Auditorium of Waseda University, walk through the campus edge, board the tram at Waseda stop, ride to Omokagebashi, walk to Omokagebashi Bridge over the Kanda River, see Toyokawa Inari, and either return on the tram or walk to JR Mejiro Station. 1.5 to 2 hours.",
      namedStops: [
        { name: "Okuma Auditorium (Waseda University)", note: "1927 building and the symbol of the university. Exterior is freely viewable" },
        { name: "Toden Waseda stop", note: "Western terminus of the Tokyo Sakura Tram. Watch the single-car trams turn around" },
        { name: "Omokagebashi Bridge (Kanda River)", note: "Small bridge with an Edo-era name. The classic photo here" },
        { name: "Kishibojin-mae stop", note: "Entry to Zoshigaya Kishibojin Hall. Zelkova-lined approach" },
      ],
      localMistakes:
        "The Waseda University campus is for students and staff — visitors should view from outside. Walk especially quietly during exam season and entrance-exam dates. Cherry blossoms around Omokagebashi peak in late March to early April; outside that window the river feels plain.",
      extraFaqs: [
        {
          q: "Can tourists enter Waseda University?",
          a: "The main gate to the Okuma Auditorium is open, but classroom buildings and libraries are not. The auditorium exterior is free to view at any time.",
        },
        {
          q: "Is Omokagebashi an unusual bridge?",
          a: "No — it's a small (about 20 meter) river crossing. The visit value is the historical name and the cherry trees, not the engineering.",
        },
      ],
    },
  },

  "kichijoji-inokashira-park-morning": {
    ja: {
      neighborhoodCharacter:
        "吉祥寺は武蔵野市の中心駅で、JR中央線・京王井の頭線・東京メトロ丸ノ内線(直通)が乗り入れます。「住みたい街ランキング」常連ですが、観光客視点では井の頭恩賜公園と古い商店街(ハーモニカ横丁・サンロード)が見どころ。朝7〜10時は地元住民の散歩時間で、都心と全く違うスローな東京を体感できます。",
      concreteRoute:
        "JR吉祥寺駅公園口(南口)→七井橋通り→井の頭公園入口→井の頭池(時計回り)→井の頭弁財天(中の島)→ボート乗り場→三鷹の森ジブリ美術館方面(時間あれば)→吉祥寺駅へ戻る。2〜2.5時間です。",
      namedStops: [
        { name: "井の頭公園入口", note: "吉祥寺駅南口から徒歩5分。早朝は地元のジョギング客が多い" },
        { name: "井の頭弁財天", note: "井の頭池の中島にある弁財天堂。1197年源頼朝建立伝承" },
        { name: "井の頭池", note: "湧水の池で井の頭の地名由来。一周約30分" },
        { name: "ハーモニカ横丁", note: "吉祥寺駅北口の戦後闇市跡商店街。朝は閉まっている" },
      ],
      localMistakes:
        "井の頭公園は朝早すぎ(6時前)はホームレス清掃やジョギング客で混みます。7〜9時が最も気持ち良い時間帯。三鷹の森ジブリ美術館は事前予約必須(当日券なし)なので、寄るなら計画段階で予約済みであること。",
      extraFaqs: [
        {
          q: "吉祥寺駅から井の頭公園まで何分?",
          a: "南口から徒歩5分。七井橋通りを真っ直ぐ南へ歩けばすぐ着きます。",
        },
        {
          q: "ジブリ美術館に当日入れますか?",
          a: "入れません。完全予約制で、ローソンチケットでの事前購入が必須です。月替わり予約開始で常に売り切れです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Kichijoji is the main station of Musashino City and a junction of the JR Chuo Line, Keio Inokashira Line, and Tokyo Metro Marunouchi Line (through service). Often topped 'most desirable place to live' lists, but for visitors the pull is Inokashira Onshi Park and the older shotengai (Harmonica Yokocho, Sunroad). Mornings 7 to 10 am are local-resident walking time and feel completely different from central Tokyo.",
      concreteRoute:
        "From JR Kichijoji Station Park Exit (South Exit), walk down Nanaibashi-dori to the Inokashira Park entrance, do a clockwise loop around Inokashira Pond, visit Inokashira Benzaiten on the central island, pass the rowboat dock, optionally extend toward the Ghibli Museum, and return to Kichijoji Station. 2 to 2.5 hours.",
      namedStops: [
        { name: "Inokashira Park entrance", note: "Five minutes from Kichijoji South Exit. Early mornings full of local joggers" },
        { name: "Inokashira Benzaiten", note: "Benten hall on the island in Inokashira Pond. Tradition says it was founded by Minamoto no Yoritomo in 1197" },
        { name: "Inokashira Pond", note: "Spring-fed pond and source of the Inokashira name. A full loop is about 30 minutes" },
        { name: "Harmonica Yokocho", note: "Postwar black-market alley shotengai outside Kichijoji North Exit. Closed in the morning" },
      ],
      localMistakes:
        "The park is too crowded with cleanup crews and joggers before 6 am — 7 to 9 am is the comfortable window. The Ghibli Museum is advance-reservation only with no walk-up tickets, so plan it before arriving.",
      extraFaqs: [
        {
          q: "How far is Inokashira Park from Kichijoji Station?",
          a: "About a five minute walk from the South Exit, straight down Nanaibashi-dori.",
        },
        {
          q: "Can I get into the Ghibli Museum on the same day?",
          a: "No. Tickets are advance-only via Lawson Ticket. Reservations open on a monthly cycle and usually sell out immediately.",
        },
      ],
    },
  },

  "kagurazaka-backstreets-walk": {
    ja: {
      neighborhoodCharacter:
        "神楽坂は新宿区の坂道の街で、明治期から花街(料亭街)として発展しました。表通りの神楽坂通りは飲食店中心ですが、本当の魅力は坂から枝分かれする石畳の路地(兵庫横丁・かくれんぼ横丁・芸者新道)。フランス系の住民も多く、フレンチビストロが点在しています。",
      concreteRoute:
        "JR飯田橋駅西口または東京メトロ南北線飯田橋駅B3出口→神楽坂下交差点→神楽坂通りを上りながら兵庫横丁・かくれんぼ横丁・芸者新道に折れる→善国寺(毘沙門天)→赤城神社→神楽坂駅で締め。2時間ルートです。",
      namedStops: [
        { name: "兵庫横丁", note: "神楽坂通りから一本入った石畳の路地。料亭街の名残" },
        { name: "善国寺(毘沙門天)", note: "1595年創建。神楽坂の象徴的な寺で縁日(寅の日)が有名" },
        { name: "赤城神社", note: "隈研吾設計のモダンな社殿(2010年再建)。神楽坂北端の高台" },
        { name: "かくれんぼ横丁", note: "路地が複雑に曲がる花街跡。地元住民が今も住む" },
      ],
      localMistakes:
        "兵庫横丁などの路地は住民の生活圏なので、写真撮影は控えめにしてください。料亭街の雰囲気は土日昼は感じにくいので、平日夕方(18〜19時)が最も街の魅力が出ます。神楽坂通りは坂下→坂上が一方通行(土日は歩行者天国)なので、土日午後の散歩が歩きやすいです。",
      extraFaqs: [
        {
          q: "神楽坂通りはいつ歩行者天国ですか?",
          a: "土日祝日の12〜13時は坂下→坂上、13〜19時は坂上→坂下が歩行者天国になります(時期により変動あり)。",
        },
        {
          q: "フランス料理店が多いのはなぜ?",
          a: "1952年にフランス政府が東京日仏学院を神楽坂に開設したことがきっかけです。今もフランス系住民とフレンチビストロが多く残っています。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Kagurazaka is a slope district in Shinjuku Ward that grew as a Meiji-era hanamachi (geisha district). The main street is restaurant-heavy, but the real character lives in the stone-paved alleys branching off the slope — Hyogo Yokocho, Kakurenbo Yokocho, and Geisha Shindo. Postwar French diplomatic ties also left a strong French expat community and a string of bistros.",
      concreteRoute:
        "From JR Iidabashi West Exit or Tokyo Metro Namboku Iidabashi Exit B3, climb the Kagurazaka slope and turn into Hyogo Yokocho, Kakurenbo Yokocho, and Geisha Shindo as you go, visit Zenkokuji (Bishamonten), continue up to Akagi Shrine, and exit at Kagurazaka Station. About 2 hours.",
      namedStops: [
        { name: "Hyogo Yokocho", note: "Stone-paved alley one step off the main slope. A direct survival from the geisha district" },
        { name: "Zenkokuji (Bishamonten)", note: "Founded 1595. The signature Kagurazaka temple, famous for Tora-no-hi festival days" },
        { name: "Akagi Shrine", note: "Modern reconstructed shrine designed by Kengo Kuma (2010). Sits on the hill at Kagurazaka's northern end" },
        { name: "Kakurenbo Yokocho", note: "Twisting alleyway in the former hanamachi block, still residential" },
      ],
      localMistakes:
        "The narrow alleys are residential — keep photo activity low-key. Weekend afternoons feel less like a hanamachi district. Weekday evenings around 6 to 7 pm are when the slope reveals its real mood. The main street becomes pedestrian-only on weekend afternoons, which is the easiest time to explore.",
      extraFaqs: [
        {
          q: "When is the main street pedestrianized?",
          a: "Weekends and holidays, traffic flows uphill from 12 to 1 pm and downhill from 1 to 7 pm during pedestrian hours (subject to seasonal change).",
        },
        {
          q: "Why are there so many French restaurants?",
          a: "The Institut Francais du Japon opened a Tokyo campus in Kagurazaka in 1952, and the resulting French community has shaped the local restaurant mix ever since.",
        },
      ],
    },
  },

  "jimbocho-kanda-booktown-walk": {
    ja: {
      neighborhoodCharacter:
        "神保町は世界最大級の古書店街で、靖国通りと白山通りの交差点を中心に約180軒の書店が密集します。明治期の旧制学校(東京大学法学部前身など)が集積したことで学生街として発展し、戦後の闇市時代を経て古書店街として定着しました。",
      concreteRoute:
        "東京メトロ半蔵門線・都営三田線・新宿線神保町駅A7出口→さくら通り(古書まつりの会場)→すずらん通り(老舗カフェ多数)→東京堂書店→三省堂書店本店→さぼうる(老舗喫茶)→神田明神(時間あれば)→御茶ノ水駅で締め。2.5時間です。",
      namedStops: [
        { name: "さくら通り(古書街)", note: "毎年10月末〜11月初旬の神田古本まつりの会場" },
        { name: "すずらん通り", note: "古書店と老舗カフェが並ぶ通り。さぼうる、ラドリオ、ミロンガ" },
        { name: "東京堂書店", note: "1890年創業の総合書店。3階建てでカフェ併設" },
        { name: "さぼうる", note: "1955年創業の喫茶店。神保町を代表する純喫茶" },
      ],
      localMistakes:
        "古書店巡りは時間を取られすぎるので、3〜4軒に絞ってください。神田古本まつり期間(10月末〜11月初旬)は通り全体に露店が出て歩きやすいですが、それ以外の時期は店内をじっくり見るスタイルになります。日曜定休の古書店が多いので平日が基本です。",
      extraFaqs: [
        {
          q: "古書店で英語の本は買えますか?",
          a: "北沢書店(神保町交差点近く)が洋書の老舗で、英語の古書を扱っています。それ以外の店は日本語書籍がメインです。",
        },
        {
          q: "神田古本まつりはいつ?",
          a: "毎年10月末〜11月初旬の約1週間。さくら通り全体に露店が並び、神保町のハイライトです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Jimbocho is one of the largest used-book districts in the world, with around 180 bookstores clustered around the Yasukuni-dori and Hakusan-dori intersection. The district grew as a student town in the Meiji era when several future universities (including the predecessors of the University of Tokyo's law school) were located here, and it consolidated as a booktown after the postwar black-market era.",
      concreteRoute:
        "From Jimbocho Station Exit A7 (Hanzomon, Toei Mita, or Toei Shinjuku Lines), walk Sakura-dori (the book fair venue), Suzuran-dori (lined with classic kissaten cafes), Tokyodo Shoten, Sanseido Shoten flagship, the Saboru kissaten, optionally Kanda Myojin Shrine, and finish at Ochanomizu Station. 2.5 hours.",
      namedStops: [
        { name: "Sakura-dori (booktown)", note: "Hosts the Kanda Used Book Festival every late October to early November" },
        { name: "Suzuran-dori", note: "Lined with used-book stores and old kissaten — Saboru, Ladrio, Milonga" },
        { name: "Tokyodo Shoten", note: "Founded 1890. Three-floor general bookstore with an in-house cafe" },
        { name: "Saboru kissaten", note: "Founded 1955. The signature pure-coffee kissaten of Jimbocho" },
      ],
      localMistakes:
        "Each shop can absorb hours, so commit to three or four maximum. The Kanda Used Book Festival (late October to early November) brings outdoor stalls and is the easiest time to walk the district. Outside the festival, plan for indoor browsing. Many shops close Sundays — weekdays are the default.",
      extraFaqs: [
        {
          q: "Are there English-language used books?",
          a: "Kitazawa Books (near the Jimbocho intersection) has the longest history with foreign-language books and stocks English used titles. Most other shops are Japanese-only.",
        },
        {
          q: "When is the Kanda Used Book Festival?",
          a: "About one week from late October into early November every year. The whole length of Sakura-dori fills with outdoor stalls — the highlight of the Jimbocho calendar.",
        },
      ],
    },
  },

  "nakameguro-daikanyama-side-streets": {
    ja: {
      neighborhoodCharacter:
        "中目黒と代官山は目黒区と渋谷区にまたがるおしゃれエリアですが、目黒川沿いの桜並木と表通りだけだと観光客が密集します。本当の魅力は表通りから一本入った住宅街の路地で、低層住宅と独立系のアトリエ・ショップが混在しています。",
      concreteRoute:
        "東急東横線中目黒駅正面口→目黒川(山手通り側)を北上→中目黒高架下→駒沢通りを横断→旧山手通りを東へ→代官山アドレス→蔦屋書店(代官山T-SITE)→旧朝倉家住宅→代官山駅で締め。2.5時間ルートです。",
      namedStops: [
        { name: "目黒川桜並木", note: "3月末〜4月初旬の桜の名所。それ以外の時期は普通の川沿い歩道" },
        { name: "中目黒高架下", note: "東急高架下の商業施設。隈研吾設計でカフェ・書店が並ぶ" },
        { name: "代官山 T-SITE(蔦屋書店)", note: "2011年開業のクマケン設計の文化施設。本+カフェ+音楽" },
        { name: "旧朝倉家住宅", note: "大正8年(1919年)建築の重要文化財。代官山唯一の和風建築見学可" },
      ],
      localMistakes:
        "目黒川の桜シーズン(3月末〜4月初旬)以外は川沿いの魅力が半減するので、桜以外の時期は裏通りメインに切り替えてください。蔦屋書店は人気で土日午後は混みます。旧朝倉家住宅は月曜・年末年始休館。",
      extraFaqs: [
        {
          q: "目黒川の桜以外の見頃は?",
          a: "11月のイルミネーション(目黒川みんなのイルミネーション)が冬の名物。それ以外の季節は普通の川沿い歩道として歩く方が現実的です。",
        },
        {
          q: "中目黒と代官山の徒歩距離は?",
          a: "中目黒駅から代官山駅まで徒歩約15〜20分。坂を上る形になるので、中目黒→代官山の方向が体力的にきれいです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Nakameguro and Daikanyama straddle Meguro and Shibuya wards as fashion-forward districts, but the cherry-tree promenade along the Meguro River and the obvious main streets get crammed with tourists. The actual character lives one block off the main strips, in low-rise residential lanes mixed with independent ateliers and shops.",
      concreteRoute:
        "From Tokyu Toyoko Nakameguro Station Front Exit, walk north along the Meguro River, pass under the Nakameguro Koka-shita complex, cross Komazawa-dori, head east on Kyu-Yamate-dori, see Daikanyama Address, the Daikanyama T-SITE (Tsutaya Books), and the Former Asakura Family House, then exit at Daikanyama Station. 2.5 hours.",
      namedStops: [
        { name: "Meguro River cherry trees", note: "Cherry-blossom corridor in late March to early April. Off-season it's a plain riverside walk" },
        { name: "Nakameguro Koka-shita", note: "Retail and cafe complex under the Tokyu line viaduct. Designed by Kengo Kuma" },
        { name: "Daikanyama T-SITE / Tsutaya Books", note: "Cultural complex opened 2011, designed by Klein Dytham. Books, cafe, music store" },
        { name: "Former Asakura Family House", note: "Important Cultural Property from 1919. The only traditional Japanese house in Daikanyama open to visitors" },
      ],
      localMistakes:
        "Outside cherry season the riverside loses most of its appeal — switch to a side-street focused route. T-SITE is busiest on weekend afternoons. The Asakura House is closed Mondays and over the New Year.",
      extraFaqs: [
        {
          q: "Other seasonal highlights besides cherry season?",
          a: "The Meguro River winter illumination in November is the main winter event. Outside spring and that window, treat the river as a plain footpath.",
        },
        {
          q: "How far apart are Nakameguro and Daikanyama on foot?",
          a: "15 to 20 minutes between stations. The route is uphill, so walking from Nakameguro toward Daikanyama is easier on the legs than the reverse.",
        },
      ],
    },
  },

  "shibamata-retro-day-trip": {
    ja: {
      neighborhoodCharacter:
        "柴又は葛飾区東部の江戸川沿いにある下町で、映画『男はつらいよ』(寅さんシリーズ)の舞台として有名です。京成金町線の終着駅で、東京の中でも最も郊外感のある下町。帝釈天参道は1920年代の街並みがほぼ手つかずで残り、レトロ散歩の聖地的存在です。",
      concreteRoute:
        "京成金町線柴又駅→寅さん像と桜の像→帝釈天参道(草だんごの店多数)→柴又帝釈天(題経寺)→邃渓園と帝釈堂彫刻ギャラリー→山本亭(大正期の和洋折衷邸宅)→江戸川土手→矢切の渡し(対岸へ船で渡れる)→柴又駅で締め。3〜4時間ルートです。",
      namedStops: [
        { name: "柴又帝釈天(題経寺)", note: "1629年創建。日蓮宗の寺で帝釈堂彫刻ギャラリーは必見" },
        { name: "山本亭", note: "1926年建築の和洋折衷邸宅。庭園と書院造の和室が公開されている" },
        { name: "矢切の渡し", note: "江戸川にかかる手漕ぎ船の渡し。対岸の松戸市まで約5分" },
        { name: "高木屋老舗", note: "寅さんも愛した草だんごの老舗。1868年創業" },
      ],
      localMistakes:
        "柴又は京成金町線という単線(2両編成)が必要なので、京成本線高砂駅で乗り換えが必須です。乗り換えを忘れると京成線で素通りします。山本亭と帝釈堂彫刻ギャラリーは月曜定休なので、どちらかを見たい場合は曜日確認必須。",
      extraFaqs: [
        {
          q: "東京駅から柴又までの行き方は?",
          a: "JR上野駅から京成上野駅まで徒歩、京成本線で高砂駅まで約25分、京成金町線に乗り換えて柴又駅まで約4分。所要約45分です。",
        },
        {
          q: "寅さん記念館は別の場所?",
          a: "葛飾柴又寅さん記念館は柴又駅から徒歩10分。山本亭の隣です。映画ファンなら必訪です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Shibamata sits on the Edogawa River in eastern Katsushika Ward and is famous as the setting of the long-running film series Otoko wa Tsurai yo (Tora-san). It's the terminus of the Keisei Kanamachi Line and one of the most outer-feeling old-town districts in Tokyo. The Taishakuten approach street has barely changed since the 1920s, making it the de facto pilgrimage site for retro Tokyo walks.",
      concreteRoute:
        "From Keisei Kanamachi Line Shibamata Station, see the Tora-san and Sakura statues, walk the Taishakuten approach (lined with grass-dumpling shops), visit Shibamata Taishakuten (Daikyoji Temple), the Suikei-en garden and the Taishakudo carving gallery, Yamamoto-tei (a 1926 hybrid Japanese-Western residence), the Edogawa riverbank, and the Yagiri no Watashi rowboat ferry. 3 to 4 hours.",
      namedStops: [
        { name: "Shibamata Taishakuten (Daikyoji)", note: "Founded 1629. Nichiren-sect temple. The Taishakudo carving gallery is the must-see" },
        { name: "Yamamoto-tei", note: "1926 hybrid Japanese-Western residence. Garden and shoin-zukuri rooms open to visitors" },
        { name: "Yagiri no Watashi rowboat ferry", note: "Hand-rowed Edogawa crossing to Matsudo City on the opposite bank. About 5 minutes" },
        { name: "Takagi-ya Roho", note: "Grass-dumpling shop founded 1868. Tora-san's favorite in the films" },
      ],
      localMistakes:
        "Reaching Shibamata requires switching from the Keisei main line to the single-track two-car Keisei Kanamachi Line at Takasago Station. Don't forget the transfer or you'll fly straight past on the main line. Yamamoto-tei and the Taishakudo carving gallery are closed Mondays — check before going.",
      extraFaqs: [
        {
          q: "How do I get to Shibamata from Tokyo Station?",
          a: "Walk from JR Ueno Station to Keisei Ueno, ride the Keisei main line to Takasago (about 25 minutes), transfer to the Keisei Kanamachi Line, and continue four minutes to Shibamata. Total around 45 minutes.",
        },
        {
          q: "Is the Tora-san Memorial Museum nearby?",
          a: "Yes — the Katsushika Shibamata Tora-san Museum is a 10-minute walk from Shibamata Station, right next to Yamamoto-tei. Essential for fans of the films.",
        },
      ],
    },
  },

  "tokyo-morning-walks": {
    ja: {
      neighborhoodCharacter:
        "東京の朝散歩は7〜10時の3時間が最高で、その後は観光客と通勤客で街の表情が変わります。朝散歩に向く街区の条件は「カフェが7時前後に開く」「神社が早朝参拝可能」「人通りが少ない住宅地が近い」の3つで、谷中・千駄木・清澄白河・神楽坂などが代表格です。",
      concreteRoute:
        "千駄木駅団子坂下出口を7:30出発→根津神社朝拝(7時から)→谷中珈琲店で朝食(7時開店)→へび道→谷中銀座(朝は閉店中だが街並みは見える)→夕やけだんだん→日暮里駅で締め。2.5時間構成です。",
      namedStops: [
        { name: "根津神社 朝拝", note: "毎日7時から。一般参拝者も参列可能で15分程度" },
        { name: "谷中珈琲店", note: "千駄木〜根津間にある朝7時開店のチェーン" },
        { name: "へび道(早朝)", note: "ジョギングと犬の散歩で住民が多いが車は通らない" },
        { name: "夕やけだんだん", note: "朝の坂は夕方より静かで、段差がきれいに見える" },
      ],
      localMistakes:
        "朝散歩は気合を入れて2時間以上歩くと午後がきつくなります。1.5〜2時間で切り上げて、午後は宿で休むかカフェで読書するのが正解。早朝5〜6時は人がいなさすぎて住宅街に入ると不審がられるので、7時以降がおすすめです。",
      extraFaqs: [
        {
          q: "朝散歩中に朝食を取れる場所は?",
          a: "千駄木の谷中珈琲店、清澄白河のBlue Bottle Coffee、神楽坂の老舗喫茶店などが7〜8時開店。コンビニはどこでも開いています。",
        },
        {
          q: "冬の朝散歩は寒すぎませんか?",
          a: "12〜2月は7時で氷点下近くになる日もあります。手袋と帽子、ホットコーヒーを持参すれば成立しますが、初心者は3〜11月の方が無難です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Tokyo morning walks peak in the 7 to 10 am window. After that the streets shift into commuter and tourist mode. The best morning-walk districts share three traits: cafes that open by 7 am, shrines that allow early visits, and quiet residential blocks nearby. Yanaka, Sendagi, Kiyosumi-Shirakawa, and Kagurazaka all qualify.",
      concreteRoute:
        "From Sendagi Station Dangozaka-shita Exit at 7:30, attend the Nezu Shrine morning prayer (from 7 am), get coffee at Yanaka Coffee Ten (opens 7 am), walk Hebi-michi, look at Yanaka Ginza (closed but the street is visible), descend Yuyake Dandan, finish at Nippori Station. 2.5 hours.",
      namedStops: [
        { name: "Nezu Shrine morning prayer", note: "Daily from 7 am. Visitors can stand quietly at the back. About 15 minutes" },
        { name: "Yanaka Coffee Ten", note: "Local chain between Sendagi and Nezu. Opens 7 am, single coffee around 400 yen" },
        { name: "Hebi-michi (early morning)", note: "Joggers and dog walkers, but no cars" },
        { name: "Yuyake Dandan stairs", note: "The morning slope is quieter than evening and shows the steps cleanly" },
      ],
      localMistakes:
        "Walking more than two hours in the morning leaves you wrecked for the afternoon. Cap at 1.5 to 2 hours and use the afternoon to rest or read in a cafe. Pre-7 am can feel uncomfortable in residential blocks because almost no one is out — 7 am onward is the safer floor.",
      extraFaqs: [
        {
          q: "Where can I eat breakfast on a morning walk?",
          a: "Yanaka Coffee Ten in Sendagi, Blue Bottle Coffee in Kiyosumi-Shirakawa, and several old kissaten in Kagurazaka all open by 7 to 8 am. Convenience stores are everywhere.",
        },
        {
          q: "Is winter too cold for morning walks?",
          a: "December to February can be near freezing at 7 am. With gloves, a hat, and hot coffee it still works, but first-timers should stick to March through November.",
        },
      ],
    },
  },

  "tokyo-local-transit-half-day": {
    ja: {
      neighborhoodCharacter:
        "東京の路線で「観光地より地元」の体験ができるのは、都電荒川線、京成本線、京急本線の各駅停車、東急世田谷線、東京メトロ千代田線の北綾瀬支線などです。これらの路線は1時間に4〜6本程度で、観光客がほぼ乗らないので地元住民の通勤通学風景が見られます。",
      concreteRoute:
        "東京メトロ千代田線町屋駅→都電町屋駅前→大塚駅前→鬼子母神前→早稲田駅で都電下車。途中、町屋・庚申塚・鬼子母神前で降りて散歩を加えると半日構成。あるいは京成本線で京成上野→押上の各駅停車で郊外感を体験するのもアリです。",
      namedStops: [
        { name: "都電町屋駅前", note: "千代田線・京成・都電の3線交差点。生活感が強い" },
        { name: "都電庚申塚", note: "巣鴨地蔵通商店街(おばあちゃんの原宿)直結" },
        { name: "都電鬼子母神前", note: "雑司ヶ谷鬼子母神堂とけやき並木の入口" },
        { name: "東急世田谷線三軒茶屋", note: "別ルートとしておすすめの路面電車。10両編成の世田谷線" },
      ],
      localMistakes:
        "都電一日乗車券(400円)を買わずに何度も乗ると170円×乗車回数で割高になります。3回以上乗るなら確実に一日券。世田谷線の一日券は340円で別物なので注意してください。",
      extraFaqs: [
        {
          q: "東京の路面電車は都電と世田谷線だけ?",
          a: "はい、都電荒川線(東京さくらトラム)と東急世田谷線の2路線のみです。両方とも1両編成で生活路線として残っています。",
        },
        {
          q: "外国人観光客向けのフリーパスはありますか?",
          a: "都営まるごとパス(700円、都営地下鉄+都電+都営バス1日乗り放題)があります。観光案内所で買えます。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Tokyo lines that feel more local than touristy include the Tokyo Sakura Tram (Toden Arakawa Line), the Keisei main line locals, the Keikyu locals, the Tokyu Setagaya Line, and the Kitaayase branch of the Tokyo Metro Chiyoda Line. These run 4 to 6 trains an hour and almost no tourists ride them, so you see the ordinary commute and school-run scenes.",
      concreteRoute:
        "From Tokyo Metro Chiyoda Machiya Station to the Toden Machiya stop, ride the tram with stop-offs at Otsuka-ekimae, Koshinzuka, Kishibojin-mae, and finish at Toden Waseda. Or try the Keisei main line locals from Keisei Ueno toward Oshiage for a more outer-Tokyo feel.",
      namedStops: [
        { name: "Toden Machiya-ekimae", note: "Three-line interchange (Chiyoda, Keisei, tram). Strong daily-life atmosphere" },
        { name: "Toden Koshinzuka", note: "Connects directly to the Sugamo Jizo-dori shopping street" },
        { name: "Toden Kishibojin-mae", note: "Entry to Zoshigaya Kishibojin Hall via the zelkova-lined approach" },
        { name: "Tokyu Setagaya Line Sangenjaya", note: "The other tram line. Single-car cars connecting Sangenjaya to Shimo-Takaido" },
      ],
      localMistakes:
        "Without the 400 yen Toden day pass, the 170 yen flat fare adds up quickly. Three or more rides means the day pass pays off. The Setagaya Line day pass is a separate 340 yen ticket — they don't interchange.",
      extraFaqs: [
        {
          q: "Are these the only trams in Tokyo?",
          a: "Yes — only the Tokyo Sakura Tram (Toden Arakawa Line) and the Tokyu Setagaya Line remain. Both still operate as everyday commuter lines using single-car trains.",
        },
        {
          q: "Is there a foreign-traveler day pass?",
          a: "The Toei Marugoto Pass (700 yen) covers Toei subways, Toden, and Toei buses for a day. Sold at tourist information centers.",
        },
      ],
    },
  },

  "tokyo-waterfront-slow-route": {
    ja: {
      neighborhoodCharacter:
        "東京の水辺で「ゆっくり歩ける」場所は、隅田川テラス・神田川沿い・運河の街(豊洲・東雲)・お台場の3カテゴリーです。観光地の浜離宮恩賜庭園は外せませんが、本当の魅力は隅田川の橋を順番に渡る半日と、運河沿いの新興住宅地の対比にあります。",
      concreteRoute:
        "東京メトロ銀座線浅草駅→吾妻橋(撮影)→隅田川テラスを南下→駒形橋→厩橋→蔵前橋→両国橋→新大橋→清洲橋→永代橋→佃大橋→月島駅で締め。橋を7つ渡る2.5〜3時間ルートです。",
      namedStops: [
        { name: "吾妻橋", note: "アサヒビール本社とスカイツリーの定番撮影スポット" },
        { name: "清洲橋", note: "1928年完成の吊り橋。永代橋とセットで重要文化財" },
        { name: "永代橋", note: "1926年完成の青いアーチ橋。国の重要文化財" },
        { name: "佃大橋", note: "中央区佃島と築地を結ぶ橋。月島駅近くで散歩終点" },
      ],
      localMistakes:
        "橋を全部渡ると体力がもたないので、5〜7橋を選んでください。隅田川テラスは強風日に水しぶきが上がるので天気予報の風速をチェック。隅田川の上流(浅草以北)は柵が多い区間があるので散歩より下流側がきれいです。",
      extraFaqs: [
        {
          q: "隅田川の橋は何本ありますか?",
          a: "源流の白髭橋から河口の佃大橋まで約27本。観光的には浅草以南の8〜10本が散歩の対象です。",
        },
        {
          q: "雨の日でも歩けますか?",
          a: "歩けますが橋上は風が強く、傘が壊れやすいです。雨予報の日は隅田川より神田川沿い(屋根のある区間が多い)の方が安全です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Tokyo's slow waterfront walks fall into three categories: the Sumida River Terrace, the Kanda River edge, and the new canal districts (Toyosu, Shinonome, and Odaiba). Hama-rikyu is the obvious garden anchor, but the most memorable half day is built from sequential bridge crossings on the Sumida and the contrast against the newer canal-side housing.",
      concreteRoute:
        "From Tokyo Metro Ginza Asakusa Station, photograph Azuma Bridge, walk south on the Sumida River Terrace, cross Komagata, Umaya, Kuramae, Ryogoku, Shin-Ohashi, Kiyosu, Eitai, and Tsukuda Ohashi bridges, ending at Tsukishima Station. Seven bridges, 2.5 to 3 hours.",
      namedStops: [
        { name: "Azuma Bridge", note: "Classic photo spot — Asahi Beer headquarters and Tokyo Skytree in one frame" },
        { name: "Kiyosu Bridge", note: "1928 suspension bridge. Important Cultural Property paired with Eitai Bridge" },
        { name: "Eitai Bridge", note: "1926 blue arch bridge. National Important Cultural Property" },
        { name: "Tsukuda Ohashi", note: "Connects Tsukudajima to Tsukiji. Natural finish near Tsukishima Station" },
      ],
      localMistakes:
        "Crossing every bridge will burn out your legs — pick five to seven. The river terrace gets sprayed in high wind, so check the forecast. Upstream of Asakusa has long fenced sections that are less pleasant than the downstream side.",
      extraFaqs: [
        {
          q: "How many bridges cross the Sumida?",
          a: "About 27 between Shirahige Bridge upstream and Tsukuda Ohashi at the mouth. For walking purposes the 8 to 10 bridges south of Asakusa are the practical set.",
        },
        {
          q: "Does it work in the rain?",
          a: "Yes, but bridges are windy and umbrellas break easily. On rainy days the Kanda River walk has more covered sections and is safer.",
        },
      ],
    },
  },

  "tokyo-old-town-hillside-walk": {
    ja: {
      neighborhoodCharacter:
        "東京の山の手と下町の境目には坂道地形が連続する地区があり、文京区(本郷・湯島)、台東区(谷中)、新宿区(神楽坂・市谷)、千代田区(駿河台)が代表格です。これらは江戸時代の武家屋敷跡が残る高台で、坂を下ると商家や寺町に変わるという階層構造を体感できます。",
      concreteRoute:
        "東京メトロ千代田線根津駅2番出口→根津神社→不忍通り→本郷三丁目方面→東京大学本郷キャンパス(赤門・安田講堂)→湯島天神→湯島聖堂→御茶ノ水駅で締め。坂を5〜6本上り下りする2.5時間ルートです。",
      namedStops: [
        { name: "東京大学本郷キャンパス 赤門", note: "1827年建造の重要文化財。加賀藩前田家の朱塗門" },
        { name: "東京大学 安田講堂", note: "1925年完成のシンボル建築。三四郎池とセットで散歩" },
        { name: "湯島天神", note: "458年創建。学問の神様で受験シーズンは混雑" },
        { name: "湯島聖堂", note: "1690年創建の孔子廟。神田明神の隣で静か" },
      ],
      localMistakes:
        "東京大学キャンパスは観光地ではなく学術施設なので、講義中の建物入館や学生の写真撮影は控えてください。三四郎池と安田講堂前広場は自由に入れます。湯島天神の合格祈願期(1〜2月)は受験生で混雑します。",
      extraFaqs: [
        {
          q: "東大の構内に観光客が入っても大丈夫?",
          a: "正門・赤門・本郷通りからの自由通行は問題ありません。教室棟・図書館・研究室は学生証必須です。安田講堂前広場と三四郎池は誰でも入れます。",
        },
        {
          q: "湯島天神は受験以外でも見るべき?",
          a: "梅まつり(2月中旬〜3月中旬)が有名です。受験以外なら春の梅か秋の七五三が静かでおすすめです。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "The seam between Tokyo's uptown and downtown is full of districts where slopes pile up — Hongo and Yushima in Bunkyo, Yanaka in Taito, Kagurazaka and Ichigaya in Shinjuku, and Surugadai in Chiyoda. These are former samurai-residence highlands where you literally walk down the slope to find merchant streets and temple districts. The vertical layering is the point.",
      concreteRoute:
        "From Tokyo Metro Chiyoda Nezu Station Exit 2, visit Nezu Shrine, walk along Shinobazu-dori toward Hongo-sanchome, enter the University of Tokyo Hongo campus (Akamon and Yasuda Auditorium), then Yushima Tenjin and Yushima Seido, and finish at Ochanomizu Station. Five or six slopes up and down across 2.5 hours.",
      namedStops: [
        { name: "University of Tokyo Akamon", note: "Built 1827. Important Cultural Property. Vermilion gate of the former Maeda samurai residence" },
        { name: "University of Tokyo Yasuda Auditorium", note: "1925 symbolic building. Pair it with the Sanshiro Pond walk" },
        { name: "Yushima Tenjin", note: "Founded 458 according to tradition. The shrine of academic luck — packed during exam season" },
        { name: "Yushima Seido", note: "Confucian temple founded 1690. Quiet, right next to Kanda Myojin" },
      ],
      localMistakes:
        "The University of Tokyo campus is an academic institution, not an attraction — don't enter classroom buildings during lectures or photograph students directly. The Sanshiro Pond and the Yasuda plaza are open. Yushima Tenjin gets crowded with exam-prep visitors in January and February.",
      extraFaqs: [
        {
          q: "Is it okay to enter the University of Tokyo grounds?",
          a: "The main gate, Akamon, and Hongo-dori paths are open to anyone. Classroom buildings, libraries, and research rooms require a student ID. The Yasuda plaza and Sanshiro Pond are unrestricted.",
        },
        {
          q: "Is Yushima Tenjin worth visiting outside exam season?",
          a: "The plum festival from mid-February to mid-March is the main draw. Spring plums and autumn shichi-go-san blessings are quieter alternatives.",
        },
      ],
    },
  },

  "tokyo-station-based-short-stays": {
    ja: {
      neighborhoodCharacter:
        "東京駅周辺(丸の内・八重洲・京橋・有楽町)は短期滞在の旅行者にとって最重要拠点で、駅から徒歩圏内に皇居・東京国際フォーラム・銀座・日本橋がすべて入ります。1〜2泊の出張や乗り継ぎ滞在なら、東京駅を中心に半径1.5kmの徒歩圏で完結する半日散歩が最も効率的です。",
      concreteRoute:
        "JR東京駅丸の内中央口→丸の内仲通り(レンガ街と並木道)→皇居外苑→楠木正成銅像→二重橋→日比谷公園→東京国際フォーラム→丸の内オアゾ→東京駅で締め。1.5〜2時間です。",
      namedStops: [
        { name: "丸の内仲通り", note: "三菱地所が整備した並木道。冬のイルミネーションが美しい" },
        { name: "皇居外苑(楠木正成像周辺)", note: "皇居前広場は無料で散策可能。富士山形の砂利が敷かれている" },
        { name: "二重橋(皇居正門石橋)", note: "皇居正門の外側橋。記念撮影スポット" },
        { name: "東京国際フォーラム", note: "ガラスと鉄の建築美術。地下のホール棟は無料で入れる" },
      ],
      localMistakes:
        "皇居の中(東御苑以外)は事前申込の参観ツアーが必須です。丸の内仲通りは平日11〜15時に歩行者天国になるので、車道を歩けて快適。週末は車道も歩行者OKです。",
      extraFaqs: [
        {
          q: "皇居の中を見学できますか?",
          a: "東御苑(皇居東御苑)は無料で入園可能(火・金・年末年始休み)。皇居参観ツアーは事前申込制で午前10時と午後1時半の2回です。",
        },
        {
          q: "東京駅から銀座まで歩けますか?",
          a: "歩けます。丸の内オアゾから銀座一丁目まで徒歩約10分。八重洲側→京橋経由が便利です。",
        },
      ],
    },
    en: {
      neighborhoodCharacter:
        "Tokyo Station's surrounding districts (Marunouchi, Yaesu, Kyobashi, Yurakucho) are the single most important base for short-stay travelers. The Imperial Palace, Tokyo International Forum, Ginza, and Nihonbashi are all inside walking distance. For a one or two night stay or a layover, a half-day walk that stays within 1.5 km of the station is the most efficient possible itinerary.",
      concreteRoute:
        "From JR Tokyo Station Marunouchi Central Exit, walk Marunouchi Naka-dori (red brick street and tree-lined avenue), the outer Imperial Palace gardens, the Kusunoki Masashige bronze statue, Nijubashi Bridge, Hibiya Park, Tokyo International Forum, the Marunouchi Oazo complex, and finish back at Tokyo Station. 1.5 to 2 hours.",
      namedStops: [
        { name: "Marunouchi Naka-dori", note: "Tree-lined street developed by Mitsubishi Estate. Famous for winter illumination" },
        { name: "Outer Imperial Palace gardens", note: "Free public access. Notable for the Mt. Fuji-shape gravel beds" },
        { name: "Nijubashi Bridge", note: "Outer stone bridge of the Imperial Palace main gate. Classic photo spot" },
        { name: "Tokyo International Forum", note: "Glass-and-steel architecture. The basement hall building is free to enter" },
      ],
      localMistakes:
        "Most of the Imperial Palace interior (apart from the East Garden) requires an advance-booked tour. Marunouchi Naka-dori becomes a pedestrian zone on weekday afternoons (11 to 3) and full weekends — those are the best times to walk the road itself.",
      extraFaqs: [
        {
          q: "Can I tour inside the Imperial Palace?",
          a: "The East Garden is free (closed Tuesdays, Fridays, and over the New Year). The official Imperial Palace tour requires advance booking and runs at 10 am and 1:30 pm.",
        },
        {
          q: "Can I walk from Tokyo Station to Ginza?",
          a: "Yes — about 10 minutes from Marunouchi Oazo to Ginza 1-chome. The route via the Yaesu side and Kyobashi is the easiest.",
        },
      ],
    },
  },
};

export type MinorGuideEnrichmentSlug = keyof typeof MINOR_GUIDE_ENRICHMENTS;

export function getMinorGuideEnrichment(slug: string) {
  return (MINOR_GUIDE_ENRICHMENTS as Record<string, Enrichment | undefined>)[slug] ?? null;
}
