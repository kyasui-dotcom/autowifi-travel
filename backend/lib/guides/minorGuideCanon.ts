const MINOR_GUIDE_CANON = {
  "kyoto-demachiyanagi-kamo-walk": {
    en: {
      title: "Kyoto Demachiyanagi and Kamo Walk 2026",
      desc: "A quieter Kyoto half day through Demachiyanagi, the Kamo riverside, Shimogamo Shrine, and Kyoto Botanical Garden.",
    },
    ja: {
      title: "京都・出町柳と鴨川デルタの半日ガイド 2026",
      desc: "出町柳、鴨川デルタ、下鴨神社、京都府立植物園をつなぐ静かな京都半日ガイドです。",
    },
    ko: {
      title: "교토 데마치야나기와 가모강 산책 가이드 2026",
      desc: "데마치야나기, 가모강 변, 시모가모 신사, 교토부립식물원을 잇는 조용한 교토 반나절 가이드입니다.",
    },
    zh: {
      title: "京都出町柳与鸭川散步指南 2026",
      desc: "串联出町柳、鸭川河边、下鸭神社与京都府立植物园的安静京都半日路线。",
    },
  },
  "kyoto-fushimi-sake-district-walk": {
    en: {
      title: "Kyoto Fushimi Sake District Walk 2026",
      desc: "A practical Fushimi half day for sake-brewery architecture, canal scenery, and a Kyoto route beyond temples.",
    },
    ja: {
      title: "京都・伏見酒蔵地区の半日街歩き 2026",
      desc: "月桂冠大倉記念館、水路、寺田屋、中書島駅周辺をつなぐ伏見酒蔵地区の半日ガイドです。",
    },
    ko: {
      title: "교토 후시미 사케 지구 산책 가이드 2026",
      desc: "사케 양조장 건물, 운하 풍경, 역사적 거리로 구성한 교토 후시미 반나절 가이드입니다.",
    },
    zh: {
      title: "京都伏见酒藏区散步指南 2026",
      desc: "适合想看酒藏建筑、运河风景与历史街区的京都伏见半日路线。",
    },
  },
  "osaka-sumiyoshi-retro-tram-route": {
    en: {
      title: "Osaka Sumiyoshi Retro Tram Route 2026",
      desc: "A quieter Osaka half day built around Sumiyoshi Taisha and the Hankai tram line.",
    },
    ja: {
      title: "大阪・住吉レトロ路面電車ルート 2026",
      desc: "住吉大社と阪堺電車を軸にした、静かな大阪半日ルートのガイドです。",
    },
    ko: {
      title: "오사카 스미요시 레트로 트램 루트 2026",
      desc: "스미요시타이샤와 한카이 노면전차를 묶은 조금 더 차분한 오사카 반나절 가이드입니다.",
    },
    zh: {
      title: "大阪住吉复古电车路线指南 2026",
      desc: "以住吉大社和阪堺路面电车为主轴的更安静大阪半日路线。",
    },
  },
  "kyoto-saga-arashiyama-morning-backstreets": {
    en: {
      title: "Kyoto Saga Arashiyama Morning Backstreets 2026",
      desc: "A morning-first Arashiyama route with quieter lanes, Rakushisha, and a softer northwestern extension.",
    },
    ja: {
      title: "京都・嵯峨嵐山の朝の裏通りガイド 2026",
      desc: "嵯峨嵐山で混雑前の時間を使い、裏通りと落柿舎、化野念仏寺寄りまで静かに歩く半日ガイドです。",
    },
    ko: {
      title: "교토 사가 아라시야마 아침 뒷골목 가이드 2026",
      desc: "혼잡 전 시간대에 더 조용한 골목과 라쿠시샤, 북서쪽 연장 구간을 보는 아라시야마 반나절 가이드입니다.",
    },
    zh: {
      title: "京都嵯峨岚山晨间背街指南 2026",
      desc: "利用清晨时段走更安静的岚山侧巷、落柿舍与更偏北西一带的半日路线。",
    },
  },
  "kyoto-nishijin-machiya-lanes": {
    en: {
      title: "Kyoto Nishijin Machiya Lanes 2026",
      desc: "A quieter Kyoto half day through Nishijin machiya streets, Seimei Shrine, Kitano Tenmangu, and Kamishichiken.",
    },
    ja: {
      title: "京都・西陣町家路地ガイド 2026",
      desc: "西陣の町家街区、晴明神社、北野天満宮、上七軒をつなぐ静かな京都半日ガイドです。",
    },
    ko: {
      title: "교토 니시진 마치야 골목 가이드 2026",
      desc: "니시진의 마치야 거리, 세이메이 신사, 기타노텐만구, 가미시치켄을 잇는 조용한 교토 반나절 가이드입니다.",
    },
    zh: {
      title: "京都西阵町家小巷指南 2026",
      desc: "串联西阵町家街区、晴明神社、北野天满宫与上七轩的安静京都半日路线。",
    },
  },
} as const;

export type CanonMinorGuideSlug = keyof typeof MINOR_GUIDE_CANON;

export { MINOR_GUIDE_CANON };
