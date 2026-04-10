import type { GuideLocale } from "./extraGuides";

export interface GuideMediaImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  creditLabel?: string;
  creditUrl?: string;
}

export interface GuideXEmbed {
  url: string;
  label?: string;
}

export interface GuideArticleContent {
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
}

type PriorityGuideMap = Record<string, Partial<Record<GuideLocale, GuideArticleContent>>>;

export const EXTRA_PRIORITY_GUIDE_RELATED: Record<string, string[]> = {
  "ueno-to-yanaka-walk": [
    "quiet-tokyo-neighborhoods",
    "yanaka-nezu-sendagi-walk",
    "nezu-sendagi-morning-walk",
    "japan-esim",
  ],
  "nezu-sendagi-morning-walk": [
    "yanaka-nezu-sendagi-walk",
    "ueno-to-yanaka-walk",
    "rainy-day-tokyo-neighborhoods",
    "japan-esim",
  ],
  "monzen-nakacho-fukagawa-walk": [
    "kiyosumi-shirakawa-walk",
    "quiet-tokyo-neighborhoods",
    "rainy-day-tokyo-neighborhoods",
    "japan-esim",
  ],
  "asakusa-kuramae-sumida-walk": [
    "kuramae-walk",
    "tokyo-tram-line-stops",
    "quiet-tokyo-neighborhoods",
    "japan-esim",
  ],
  "oji-asukayama-tram-walk": [
    "tokyo-tram-line-stops",
    "quiet-tokyo-neighborhoods",
    "rainy-day-tokyo-neighborhoods",
    "japan-esim",
  ],
};

export const EXTRA_PRIORITY_GUIDE_CONTENT: PriorityGuideMap = {
  "ueno-to-yanaka-walk": {
    ja: {
      title: "上野から谷中へ歩く半日ガイド 2026",
      description:
        "上野公園周辺のにぎわいから谷中の静かな路地へ移りたい外国人旅行者向けに、博物館前後にも組みやすい半日ルートを整理したガイドです。",
      heroImage: {
        src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg",
        alt: "谷中の落ち着いた通り沿いに並ぶ個人店とカフェ",
        width: 1280,
        height: 853,
        caption: "上野の大きな動線から少し離れるだけで、歩く速度が自然に落ちる谷中らしい街並みに入れます。",
        creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg",
      },
      gallery: [
        {
          src: "/guide/yanaka-nezu-sendagi-walk/yanaka-ginza.jpg",
          alt: "谷中銀座の商店街",
          width: 2048,
          height: 1365,
          caption: "谷中銀座は終点というより途中の目印として考えると歩きやすく、混雑も避けやすくなります。",
          creditLabel: "Photo: Syced / Wikimedia Commons (CC BY-SA 3.0)",
          creditUrl: "https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_01.jpg",
        },
      ],
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "公式埋め込みを、朝の上野と少し静かな東京散歩の参考として置いています。本文は現地で歩きやすい順路に絞っています。",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 上野の朝時間をイメージしやすい参考投稿" },
        { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO公式: 谷中へつなげやすい歴史散歩の空気感" },
      ],
      sections: [
        {
          heading: "上野から静かな東京へ切り替えるのにちょうどいい",
          body:
            "上野は空港アクセス、ホテル、博物館で便利ですが、そのまま半日を終えると東京の記憶が忙しいままになりやすいです。谷中へ歩いて抜けると、低い建物、小さな店、寺町寄りの空気へ自然に切り替えられます。\n\n初回の東京でも使いやすい大きな駅を起点にしながら、後半は明らかに違う街の密度を感じられるのがこのルートの強みです。",
        },
        {
          heading: "おすすめは上野を短く、谷中を少し長く",
          body:
            "上野公園や博物館を1〜1.5時間ほどに抑え、谷中側で少し長く歩く方が半日としてまとまります。上野で長居しすぎると、谷中に着いた頃には情報量で疲れてしまうからです。\n\n谷中側では保存した店を2〜3件だけ軸にして、路地や寺の脇道をゆるく挟むくらいがちょうどよく、谷中銀座も“通り抜ければ十分”と考えると消耗しにくくなります。",
        },
        {
          heading: "午前から昼にかけてが最も自然",
          body:
            "朝の上野は広々していて入りやすく、谷中側は昼前後に店が開き始めるため、時間帯の接続がきれいです。午後遅くから始めると、上野の混雑が強く、谷中でも閉店が気になりやすくなります。\n\n静かな東京へ切り替えるという目的なら、午前スタートが一番扱いやすいです。",
        },
      ],
      faq: [
        { q: "上野から谷中までは徒歩でも現実的ですか？", a: "はい。急いで移動する日には向きませんが、半日散歩としてなら十分現実的です。" },
        { q: "博物館と一緒に組むならどちらを先にした方が良いですか？", a: "朝に上野公園や博物館を入れ、午後手前から谷中へ移る流れの方が歩きやすいです。" },
        { q: "谷中銀座は必須ですか？", a: "必須ではありません。路地や寺町の空気を楽しむだけでも十分満足しやすいエリアです。" },
      ],
      ctaTitle: "東京旅行の準備をまとめて確認する",
      ctaButton: "旅の準備を見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
    en: {
      title: "Ueno to Yanaka Walk Guide 2026",
      description: "A practical half-day route from busy Ueno into calmer Yanaka for travelers who want museums, side streets, and an easier old-Tokyo finish.",
      heroImage: {
        src: "/guide/quiet-tokyo-neighborhoods/yanaka-street.jpg",
        alt: "A calm Yanaka street with small cafes and low-rise storefronts in Tokyo",
        width: 1280,
        height: 853,
        caption: "This is the kind of street shift many travelers want after a busy Ueno start: lower buildings, smaller shops, and a pace that slows down on its own.",
        creditLabel: "Photo: Alexkom000 / Wikimedia Commons (CC BY 4.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:2024-10-20_Tokyo,_Yanaka_1.jpg",
      },
      gallery: [
        {
          src: "/guide/yanaka-nezu-sendagi-walk/yanaka-ginza.jpg",
          alt: "Yanaka Ginza shopping street in Tokyo",
          width: 2048,
          height: 1365,
          caption: "Yanaka Ginza works best here as a waypoint rather than the whole point of the route, especially if you want the walk to stay calm.",
          creditLabel: "Photo: Syced / Wikimedia Commons (CC BY-SA 3.0)",
          creditUrl: "https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_01.jpg",
        },
      ],
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds help frame the mood of an early Ueno start and the quieter Tokyo atmosphere that pairs well with a Yanaka finish.",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a useful reference for an early, lower-stress Ueno start" },
        { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO: an Edo-history angle that fits the Yanaka side of the walk" },
      ],
      sections: [
        {
          heading: "Why this route works better than staying in Ueno all day",
          body:
            "Ueno is useful for museums, the park, and practical hotel access, but it can leave the memory of the morning tilted toward crowds and big-station tempo. Walking from Ueno into Yanaka changes that rhythm without requiring a complicated transfer.\n\nYou begin in a familiar visitor hub and end in a lower-rise, older-feeling part of Tokyo that often leaves a stronger impression than another large attraction stop.",
        },
        {
          heading: "Keep Ueno short and let Yanaka carry the second half",
          body:
            "A useful split is around one to one-and-a-half hours in Ueno before you move on. Once you move toward Yanaka, the route works best with just a few saved anchors: one cafe or bakery, one lane or temple-side stretch, and one flexible end point.\n\nYanaka Ginza can fit into that plan, but it does not need to dominate it.",
        },
        {
          heading: "Weekday mornings through lunch are the strongest window",
          body:
            "If your goal is the quieter version of Tokyo, weekday mornings through lunch are the strongest window. Weekends are workable, but the closer you get to the middle of the day, the less calm Yanaka can feel around its best-known stretches.\n\nThat is why this route is most useful as a morning half day instead of a late-afternoon add-on.",
        },
      ],
      faq: [
        { q: "Is it realistic to walk from Ueno to Yanaka in one half day?", a: "Yes. It works well as a half-day plan as long as you do not overload the Ueno portion first." },
        { q: "Should I do museums before or after the neighborhood walk?", a: "Usually before. Ueno is easier to handle while your energy is still high, and Yanaka is better when you want the pace to slow down." },
        { q: "Do I need to make Yanaka Ginza the main stop?", a: "No. It is better as one part of the route than as the only goal, especially if you want the day to stay lower-key." },
      ],
      ctaTitle: "See the essentials for Tokyo trip prep",
      ctaButton: "View travel prep",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
  },
  "nezu-sendagi-morning-walk": {
    en: {
      title: "Nezu and Sendagi Morning Walk Guide 2026",
      description: "A lower-key morning route through Nezu Shrine, Sendagi side streets, and older shopping streets before central Tokyo gets busy.",
      heroImage: {
        src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg",
        alt: "Nezu Shrine torii and greenery in Tokyo",
        width: 1920,
        height: 1280,
        caption: "Nezu works best here as part of a calm morning rhythm rather than as a one-stop headline attraction.",
        creditLabel: "Photo: Wiiii / Wikimedia Commons (CC BY-SA 3.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_-_Tokyo,_Japan_-_DSC_6296.jpg",
      },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "These official embeds help frame the older, calmer Tokyo mood that fits a Nezu and Sendagi morning better than a rush-hour sightseeing schedule.",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO: an older-Tokyo angle that fits this route well" },
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a useful reminder of how good quieter Tokyo can feel early" },
      ],
      sections: [
        {
          heading: "A route for travelers who want Tokyo before it gets loud",
          body:
            "Nezu and Sendagi are useful when you want a Tokyo morning that feels calm without becoming obscure or inconvenient. The area gives you a clear starting point at Nezu Shrine, then enough side-street texture and shopping-street atmosphere to build a satisfying half day without leaning on major attractions.\n\nThat makes it especially good for travelers who want the day to begin gently rather than with a checklist.",
        },
        {
          heading: "Do not let the shrine become the whole plan",
          body:
            "Nezu Shrine is the easiest anchor, but it is better treated as the beginning of the route than the complete reason for it. Once you have had that first quiet stretch, move into Sendagi while the neighborhood still feels slow and lightly occupied.\n\nThat is where the route becomes more distinctive.",
        },
        {
          heading: "Minimal prep works better than a rigid list",
          body:
            "The most useful prep is one station, one first stop, one break point, and one sensible exit. If you save too many stores, the route becomes unnecessarily rigid and you start chasing pins instead of enjoying the neighborhood.\n\nFor many travelers, that lighter structure is exactly what makes the route work.",
        },
      ],
      faq: [
        { q: "How early should I start this route?", a: "You do not need a sunrise start, but the first half of the morning is the best window if you want the calmer version of the area." },
        { q: "Should I extend this into Yanaka as well?", a: "You can, but you do not have to. Nezu and Sendagi are enough on their own if your goal is a lower-stress morning walk." },
        { q: "Does this still work in light rain?", a: "Yes. In light rain it can work very well, as long as you shorten the route slightly and use shopping-street pauses more intentionally." },
      ],
      ctaTitle: "See the essentials for Tokyo trip prep",
      ctaButton: "View travel prep",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
    ja: {
      title: "根津と千駄木の朝散歩ガイド 2026",
      description: "根津神社、千駄木の路地、昔ながらの商店街を朝の時間帯でつなぎ、混む前の東京を静かに歩きたい外国人旅行者向けに組み立てたガイドです。",
      heroImage: {
        src: "/guide/yanaka-nezu-sendagi-walk/nezu-shrine.jpg",
        alt: "根津神社の鳥居と緑",
        width: 1920,
        height: 1280,
        caption: "根津神社まわりは、派手な観光ではなく朝の空気の良さで記憶に残るタイプの東京散歩と相性が良いです。",
        creditLabel: "Photo: Wiiii / Wikimedia Commons (CC BY-SA 3.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Nezu_Shrine_-_Tokyo,_Japan_-_DSC_6296.jpg",
      },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "朝の上野寄りの空気と、歴史層を感じる東京散歩の参考になる公式埋め込みを置いています。",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO公式: 古い東京の文脈を感じやすい参考投稿" },
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 朝の落ち着いた東京の入り方として使いやすい投稿" },
      ],
      sections: [
        {
          heading: "混む前の東京に入りたい人向けのルート",
          body:
            "根津と千駄木は、東京の“静かな朝”を探している旅行者にとって使いやすいエリアです。根津神社の周辺で少し空気を切り替え、千駄木側では路地や商店街をゆっくりつなぐことで、大きな観光スポットに頼らない半日が作れます。\n\n見どころを消化するというより、朝の体温に合わせて街に入っていけることがこのルートの便利さです。",
        },
        {
          heading: "根津神社を滞在の中心にしすぎない",
          body:
            "根津神社は分かりやすい起点ですが、長時間滞在する場所として考えるより、朝の空気を整える最初の区間として置く方がまとまりやすいです。参道や周辺の静けさを味わったら、早めに千駄木側へ動いた方が街歩きの流れが自然です。\n\n千駄木では、古い商店街や生活寄りの道を混ぜることで、観光地としての“見た感”ではなく、街にいた時間の記憶が残りやすくなります。",
        },
        {
          heading: "朝に向いている理由は、店より空気が先にあること",
          body:
            "このエリアは昼以降でも歩けますが、朝向きなのは“まず街の雰囲気がある”からです。最初の1〜2時間を静かな歩行に使えると、このルートの良さが出やすいです。\n\n昼近くになったら、軽食や喫茶を1か所入れて終えるくらいがちょうどよく、別の大きな観光地へ接続する余力も残しやすくなります。",
        },
      ],
      faq: [
        { q: "朝はどれくらい早く行くのがよいですか？", a: "極端に早くなくても大丈夫ですが、午前の前半に歩き始めると、このエリアの落ち着きが感じやすいです。" },
        { q: "谷中まで広げた方がよいですか？", a: "時間があれば広げられますが、このルートは根津と千駄木だけでも十分成立します。" },
        { q: "雨の日にも向いていますか？", a: "軽い雨なら向いています。大雨の日は無理に広げず、商店街と休憩を多めにした方が歩きやすいです。" },
      ],
      ctaTitle: "東京旅行の準備をまとめて確認する",
      ctaButton: "旅の準備を見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
  },
  "monzen-nakacho-fukagawa-walk": {
    en: {
      title: "Monzen-Nakacho and Fukagawa Walk 2026",
      description: "A practical slow-Tokyo route for temple approaches, river edges, and quieter east-side streets around Monzen-Nakacho and Fukagawa.",
      heroImage: {
        src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg",
        alt: "A peaceful pond and greenery at Kiyosumi Garden in Tokyo",
        width: 1280,
        height: 960,
        caption: "This side of Tokyo works well when temple atmosphere, water, and slower local streets stay in the same half day.",
        creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg",
      },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "This official embed supports the older-Tokyo mood that fits Monzen-Nakacho and Fukagawa better than a checklist-heavy route.",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO: an Edo-layer walking reference that suits this side of Tokyo" },
      ],
      sections: [
        {
          heading: "A calmer east-side half day",
          body:
            "Monzen-Nakacho and Fukagawa work well when you want east Tokyo to feel local instead of over-programmed. Temple approaches, river edges, and old low-rise streets all stay close enough together that the route feels coherent without needing many stops.\n\nThat makes it useful for travelers who want a slower district but still need something easy to read on a map.",
        },
        {
          heading: "Start with the temple-town mood, then let the water reset the pace",
          body:
            "Beginning around Monzen-Nakacho gives the walk a clear opening. After that, moving gradually toward the quieter Fukagawa side shifts the half day from shrine-and-street texture into more open river and canal air.\n\nThat contrast is the main reason this route feels satisfying.",
        },
        {
          heading: "Plan one break point before you plan details",
          body:
            "This area can look compact but often stretches a little more than expected once bridges and riverside segments enter the route. A single deliberate cafe or rest stop is more useful than saving many pins.\n\nIf you also need data or directions on the move, keep the route connected to your Japan eSIM page rather than adding another detour.",
        },
      ],
      faq: [
        { q: "Should I combine this with Kiyosumi-Shirakawa?", a: "You can, but you do not need to. This route is already enough for a half day." },
        { q: "Who is this best for?", a: "Travelers who want older east-side Tokyo, water, and a quieter walking rhythm." },
        { q: "Does it still work in light rain?", a: "Yes, though shorter waterside segments usually feel better." },
      ],
      ctaTitle: "See the essentials for Tokyo trip prep",
      ctaButton: "View travel prep",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
    ja: {
      title: "門前仲町と深川の半日街歩き 2026",
      description:
        "寺町の参道、水辺、下町の落ち着いた通りをつなぐ、門前仲町と深川の実用的な半日散歩ガイドです。",
      heroImage: {
        src: "/guide/quiet-tokyo-neighborhoods/kiyosumi-garden.jpg",
        alt: "清澄庭園の池と緑が見える静かな景色",
        width: 1280,
        height: 960,
        caption: "東東京の魅力は、参道と水辺が近い距離で切り替わることにあります。",
        creditLabel: "Photo: Guilhem Vellut / Wikimedia Commons (CC BY 2.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Kiyosumi_Garden_(9224579199).jpg",
      },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "江戸の余韻が残る東東京散歩の参考として、公式埋め込みを置いています。",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/2028696875835199524", label: "GO TOKYO公式: 江戸の層を感じる散歩の参考投稿" },
      ],
      sections: [
        {
          heading: "東東京で静かな半日を作りやすい",
          body:
            "門前仲町と深川は、参道、水辺、下町の通りが近い距離でつながっているため、派手すぎないのに記憶に残る半日を作りやすいです。大きな観光地を連打しなくても、東京の別の密度を感じられます。\n\n初回の東京でも扱いやすい一方で、定番だけでは物足りない人にも向いています。",
        },
        {
          heading: "門前仲町を入口にすると流れがきれい",
          body:
            "最初に寺町の参道らしい空気を入れてから、深川側へ少しずつ抜けると、街全体の変化が見えやすくなります。歩く目的が曖昧でも、参道から水辺へ抜けるだけで半日がまとまりやすいです。\n\n深川では小さな休憩を一度入れると、後半の歩行がかなり楽になります。",
        },
        {
          heading: "細かな立ち寄り先より休憩点を先に決める",
          body:
            "橋や川沿いが入るぶん、見た目より少し距離が伸びやすいエリアです。店を多く保存するより、どこで一度座るかを先に決める方が実用的です。\n\n地図確認や接続の不安を減らしたいなら、別回線ではなく日本向けeSIMの導線と一緒に考えるくらいがちょうどよいです。",
        },
      ],
      faq: [
        { q: "清澄白河と一緒に回した方がよいですか？", a: "時間があれば可能ですが、このルートだけでも十分半日になります。" },
        { q: "どんな人に向いていますか？", a: "寺町と水辺の落ち着いた東東京を見たい人に向いています。" },
        { q: "雨の日でも歩けますか？", a: "軽い雨なら問題ありませんが、水辺区間は短めの方が歩きやすいです。" },
      ],
      ctaTitle: "東京旅行の準備をまとめて確認する",
      ctaButton: "旅の準備を見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
  },
  "asakusa-kuramae-sumida-walk": {
    en: {
      title: "Asakusa, Kuramae, and Sumida River Walk 2026",
      description: "A calmer route that uses Asakusa as a starting point, then shifts into Kuramae backstreets and Sumida riverside walking.",
      heroImage: {
        src: "/guide/kuramae-walk/kuramae-shrine.jpg",
        alt: "Kuramae Shrine in Tokyo",
        width: 1600,
        height: 1067,
        caption: "This route works because Asakusa opens the half day and Kuramae slows it down before the Sumida River resets the pace again.",
        creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg",
      },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "This official embed supports the quieter Tokyo pacing that fits a route leaving Asakusa instead of staying in crowds all day.",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a useful quiet-Tokyo reference for the second half of this walk" },
      ],
      sections: [
        {
          heading: "Use Asakusa as the front door, not the whole plan",
          body:
            "Asakusa is an easy headline district, but many travelers do better when it becomes the start of the walk rather than the full half day. Once you move onward, the memory of the outing becomes less about crowd management and more about the shape of east Tokyo.\n\nThat is the reason this route feels more balanced than a longer stay around the same famous blocks.",
        },
        {
          heading: "Kuramae is where the pace resets",
          body:
            "Kuramae gives you smaller streets, a more local retail scale, and a lower-pressure place to stop for coffee or a short break. You do not need a shopping list here. One or two anchors are enough.\n\nThe value is in changing the tempo, not maximizing stops.",
        },
        {
          heading: "The river adds breathing room at the end",
          body:
            "Even a short Sumida riverside segment changes the feel of the route. It creates a clean contrast with denser streets and gives the half day a more open finish.\n\nIf you rely on maps throughout the walk, keep your route planning tied to your Japan eSIM setup instead of adding another app or detour.",
        },
      ],
      faq: [
        { q: "Is this better than spending the full half day in Asakusa?", a: "If you prefer a calmer second half, usually yes." },
        { q: "Do I need to shop in Kuramae?", a: "No. The route still works with one cafe and mostly walking." },
        { q: "Can I do this in light rain?", a: "Yes, though the river section should stay short." },
      ],
      ctaTitle: "See the essentials for Tokyo trip prep",
      ctaButton: "View travel prep",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
    ja: {
      title: "浅草・蔵前・隅田川の街歩きガイド 2026",
      description:
        "浅草を起点にしながら、蔵前の裏通りと隅田川沿いへ抜ける少し静かな半日ルートです。",
      heroImage: {
        src: "/guide/kuramae-walk/kuramae-shrine.jpg",
        alt: "蔵前神社の鳥居と境内",
        width: 1600,
        height: 1067,
        caption: "浅草から蔵前へ抜けると、同じ東東京でも歩く速度がかなり落ち着きます。",
        creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Kuramae_Shrine_2021.jpg",
      },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "浅草から少し静かな東京へ切り替える感覚に近い、公式埋め込みの参考です。",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 静かな東京の朝の参考投稿" },
      ],
      sections: [
        {
          heading: "浅草を入口にすると使いやすい",
          body:
            "浅草の定番感を押さえつつ、蔵前と隅田川沿いへ抜けると、混雑の記憶だけで半日が終わりにくくなります。浅草を見たうえで、少し落ち着いた東東京に切り替えたい人に向いています。\n\n大きな移動を入れずに雰囲気を変えられるのがこのルートの実用性です。",
        },
        {
          heading: "蔵前で半日の温度を下げる",
          body:
            "蔵前では、小さな店や喫茶を2〜3件だけ軸にするくらいがちょうどよいです。目的地を増やしすぎると、せっかくの静けさが薄れます。\n\n浅草の後半として“歩くための街”に切り替えるイメージで組むとまとまりやすいです。",
        },
        {
          heading: "川沿いは短くても効く",
          body:
            "隅田川沿いを短く入れるだけで、街中の密度との対比が出て半日がきれいにまとまります。最後に少し空が開くことで、浅草の混雑も含めて整理された印象になります。\n\n地図確認が多くなりそうなら、回線は別手段より日本向けeSIMに寄せておくと扱いやすいです。",
        },
      ],
      faq: [
        { q: "浅草だけで回るよりこちらの方がよいですか？", a: "混雑が苦手なら、こちらの方が満足しやすいことがあります。" },
        { q: "蔵前では何を目的にするとよいですか？", a: "気になるジャンルを1〜2個だけ決める方が歩きやすいです。" },
        { q: "何時間くらい必要ですか？", a: "3〜4時間で十分まとまります。" },
      ],
      ctaTitle: "東京旅行の準備をまとめて確認する",
      ctaButton: "旅の準備を見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
  },
  "oji-asukayama-tram-walk": {
    en: {
      title: "Oji and Asukayama Tram Walk Guide 2026",
      description: "A slower half-day around Oji and Asukayama for tram views, park pauses, and a more local north-Tokyo feel.",
      heroImage: {
        src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg",
        alt: "Toden tram near Asukayama in Tokyo",
        width: 1800,
        height: 1200,
        caption: "The route is strongest when the tram shapes the neighborhood feel rather than becoming the only attraction.",
        creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg",
      },
      xSectionTitle: "Relevant posts on X",
      xSectionDescription: "This official embed supports the quieter Tokyo pacing that suits Oji and Asukayama better than a dense sightseeing loop.",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO: a useful quiet-Tokyo reference for a slower north-side half day" },
      ],
      sections: [
        {
          heading: "A neighborhood-paced half day",
          body:
            "Oji and Asukayama are useful when you want Tokyo to slow down through park edges, tram views, and a more local street scale. The route is not about packing in major sights. It is about letting the district's rhythm do most of the work.\n\nThat makes it a strong counterweight to denser parts of a Tokyo itinerary.",
        },
        {
          heading: "You only need a few tram moments",
          body:
            "Many travelers over-plan tram routes here. In practice, one short ride or a few good viewing points are usually enough. The appeal comes from how the tram fits into the neighborhood, not from maximizing stations.\n\nPair that with a park pause and the half day is already complete.",
        },
        {
          heading: "A good option for a softer afternoon",
          body:
            "This route works especially well when you need a calmer half day after busier sightseeing elsewhere. It is also one of the easier niche routes to navigate because the park and tram line create obvious anchors.\n\nFor maps and timetable checks, it helps to keep your connection stable through your Japan eSIM rather than juggling public Wi-Fi as you move.",
        },
      ],
      faq: [
        { q: "Do I need to ride the tram a lot?", a: "No. A short ride or mostly walking version still works well." },
        { q: "Is it realistic for a first Tokyo trip?", a: "Yes, especially as a change of pace from more standard districts." },
        { q: "Is it only worth doing in cherry blossom season?", a: "No. Quieter periods are often easier to enjoy." },
      ],
      ctaTitle: "See the essentials for Tokyo trip prep",
      ctaButton: "View travel prep",
      breadcrumbGuide: "Guides",
      breadcrumbHome: "Home",
    },
    ja: {
      title: "王子と飛鳥山の都電街歩きガイド 2026",
      description:
        "都電の景色、飛鳥山の休憩、北東京らしい落ち着いた空気を楽しむ半日街歩きガイドです。",
      heroImage: {
        src: "/guide/tokyo-tram-line-stops/toden-arakawa-asukayama.jpg",
        alt: "飛鳥山付近を走る都電荒川線",
        width: 1800,
        height: 1200,
        caption: "都電に長く乗るより、都電が似合う街の速度で半日を過ごすのに向いています。",
        creditLabel: "Photo: Kakidai / Wikimedia Commons (CC BY-SA 4.0)",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_Asukayama_2023.jpg",
      },
      xSectionTitle: "Xで雰囲気をつかむ",
      xSectionDescription: "北東京の静かな半日に近い空気感の参考として、公式埋め込みを置いています。",
      xEmbeds: [
        { url: "https://x.com/GOTOKYOofficial/status/1418012925713784834", label: "GO TOKYO公式: 静かな東京の朝の参考投稿" },
      ],
      sections: [
        {
          heading: "都電そのものより街のスケールが魅力",
          body:
            "王子と飛鳥山では、電車と通りの距離が近いことで、東京の見え方が少しやわらかくなります。乗り物体験として派手ではありませんが、北東京らしい落ち着きが半日にきれいに入ります。\n\n定番エリアの合間に入れると、旅程全体の温度を下げやすいです。",
        },
        {
          heading: "王子を起点にするとまとまりやすい",
          body:
            "駅、公園、都電沿いを短くつなぐだけで、控えめですが記憶に残る半日になります。すべてを回ろうとするより、良さそうな区間を少し長めに歩く方がこのエリアには合っています。\n\n飛鳥山公園で一度座るだけでも全体の満足度が上がりやすいです。",
        },
        {
          heading: "午後にも使いやすい静かな半日",
          body:
            "午前でも午後でも使えますが、定番観光の合間に入れて1日の温度を下げる用途と相性が良いです。構造が単純なので、移動中の確認も比較的少なくて済みます。\n\n地図や時刻の確認を安定させたいなら、回線は日本向けeSIMに寄せておくと安心です。",
        },
      ],
      faq: [
        { q: "都電に長く乗る必要はありますか？", a: "いいえ。短く乗るか、見ながら歩くだけでも十分です。" },
        { q: "初めての東京でも向いていますか？", a: "はい。定番の合間に入れるとバランスが取りやすいです。" },
        { q: "桜の時期以外でも楽しめますか？", a: "はい。むしろ落ち着いて歩きやすい時期も多いです。" },
      ],
      ctaTitle: "東京旅行の準備をまとめて確認する",
      ctaButton: "旅の準備を見る",
      breadcrumbGuide: "ガイド",
      breadcrumbHome: "ホーム",
    },
  },
};
