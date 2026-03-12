export type Continent =
  | 'asia'
  | 'europe'
  | 'north-america'
  | 'south-america'
  | 'oceania'
  | 'africa'
  | 'middle-east';

export interface Country {
  code: string;
  slug: string;
  nameEn: string;
  nameJa: string;
  nameKo: string;
  nameZh: string;
  flag: string;
  continent: Continent;
}

const countries: Country[] = [
  // ── Asia ──────────────────────────────────────────────────
  { code: 'JP', slug: 'japan', nameEn: 'Japan', nameJa: '日本', nameKo: '일본', nameZh: '日本', flag: '🇯🇵', continent: 'asia' },
  { code: 'KR', slug: 'south-korea', nameEn: 'South Korea', nameJa: '韓国', nameKo: '한국', nameZh: '韩国', flag: '🇰🇷', continent: 'asia' },
  { code: 'CN', slug: 'china', nameEn: 'China', nameJa: '中国', nameKo: '중국', nameZh: '中国', flag: '🇨🇳', continent: 'asia' },
  { code: 'TW', slug: 'taiwan', nameEn: 'Taiwan', nameJa: '台湾', nameKo: '대만', nameZh: '台湾', flag: '🇹🇼', continent: 'asia' },
  { code: 'HK', slug: 'hong-kong', nameEn: 'Hong Kong', nameJa: '香港', nameKo: '홍콩', nameZh: '香港', flag: '🇭🇰', continent: 'asia' },
  { code: 'MO', slug: 'macau', nameEn: 'Macau', nameJa: 'マカオ', nameKo: '마카오', nameZh: '澳门', flag: '🇲🇴', continent: 'asia' },
  { code: 'TH', slug: 'thailand', nameEn: 'Thailand', nameJa: 'タイ', nameKo: '태국', nameZh: '泰国', flag: '🇹🇭', continent: 'asia' },
  { code: 'SG', slug: 'singapore', nameEn: 'Singapore', nameJa: 'シンガポール', nameKo: '싱가포르', nameZh: '新加坡', flag: '🇸🇬', continent: 'asia' },
  { code: 'MY', slug: 'malaysia', nameEn: 'Malaysia', nameJa: 'マレーシア', nameKo: '말레이시아', nameZh: '马来西亚', flag: '🇲🇾', continent: 'asia' },
  { code: 'ID', slug: 'indonesia', nameEn: 'Indonesia', nameJa: 'インドネシア', nameKo: '인도네시아', nameZh: '印度尼西亚', flag: '🇮🇩', continent: 'asia' },
  { code: 'PH', slug: 'philippines', nameEn: 'Philippines', nameJa: 'フィリピン', nameKo: '필리핀', nameZh: '菲律宾', flag: '🇵🇭', continent: 'asia' },
  { code: 'VN', slug: 'vietnam', nameEn: 'Vietnam', nameJa: 'ベトナム', nameKo: '베트남', nameZh: '越南', flag: '🇻🇳', continent: 'asia' },
  { code: 'IN', slug: 'india', nameEn: 'India', nameJa: 'インド', nameKo: '인도', nameZh: '印度', flag: '🇮🇳', continent: 'asia' },
  { code: 'LK', slug: 'sri-lanka', nameEn: 'Sri Lanka', nameJa: 'スリランカ', nameKo: '스리랑카', nameZh: '斯里兰卡', flag: '🇱🇰', continent: 'asia' },
  { code: 'NP', slug: 'nepal', nameEn: 'Nepal', nameJa: 'ネパール', nameKo: '네팔', nameZh: '尼泊尔', flag: '🇳🇵', continent: 'asia' },
  { code: 'BD', slug: 'bangladesh', nameEn: 'Bangladesh', nameJa: 'バングラデシュ', nameKo: '방글라데시', nameZh: '孟加拉国', flag: '🇧🇩', continent: 'asia' },
  { code: 'KH', slug: 'cambodia', nameEn: 'Cambodia', nameJa: 'カンボジア', nameKo: '캄보디아', nameZh: '柬埔寨', flag: '🇰🇭', continent: 'asia' },
  { code: 'LA', slug: 'laos', nameEn: 'Laos', nameJa: 'ラオス', nameKo: '라오스', nameZh: '老挝', flag: '🇱🇦', continent: 'asia' },
  { code: 'MM', slug: 'myanmar', nameEn: 'Myanmar', nameJa: 'ミャンマー', nameKo: '미얀마', nameZh: '缅甸', flag: '🇲🇲', continent: 'asia' },
  { code: 'PK', slug: 'pakistan', nameEn: 'Pakistan', nameJa: 'パキスタン', nameKo: '파키스탄', nameZh: '巴基斯坦', flag: '🇵🇰', continent: 'asia' },
  { code: 'KZ', slug: 'kazakhstan', nameEn: 'Kazakhstan', nameJa: 'カザフスタン', nameKo: '카자흐스탄', nameZh: '哈萨克斯坦', flag: '🇰🇿', continent: 'asia' },
  { code: 'UZ', slug: 'uzbekistan', nameEn: 'Uzbekistan', nameJa: 'ウズベキスタン', nameKo: '우즈베키스탄', nameZh: '乌兹别克斯坦', flag: '🇺🇿', continent: 'asia' },
  { code: 'MN', slug: 'mongolia', nameEn: 'Mongolia', nameJa: 'モンゴル', nameKo: '몽골', nameZh: '蒙古', flag: '🇲🇳', continent: 'asia' },

  // ── Europe ────────────────────────────────────────────────
  { code: 'GB', slug: 'united-kingdom', nameEn: 'United Kingdom', nameJa: 'イギリス', nameKo: '영국', nameZh: '英国', flag: '🇬🇧', continent: 'europe' },
  { code: 'FR', slug: 'france', nameEn: 'France', nameJa: 'フランス', nameKo: '프랑스', nameZh: '法国', flag: '🇫🇷', continent: 'europe' },
  { code: 'DE', slug: 'germany', nameEn: 'Germany', nameJa: 'ドイツ', nameKo: '독일', nameZh: '德国', flag: '🇩🇪', continent: 'europe' },
  { code: 'IT', slug: 'italy', nameEn: 'Italy', nameJa: 'イタリア', nameKo: '이탈리아', nameZh: '意大利', flag: '🇮🇹', continent: 'europe' },
  { code: 'ES', slug: 'spain', nameEn: 'Spain', nameJa: 'スペイン', nameKo: '스페인', nameZh: '西班牙', flag: '🇪🇸', continent: 'europe' },
  { code: 'PT', slug: 'portugal', nameEn: 'Portugal', nameJa: 'ポルトガル', nameKo: '포르투갈', nameZh: '葡萄牙', flag: '🇵🇹', continent: 'europe' },
  { code: 'NL', slug: 'netherlands', nameEn: 'Netherlands', nameJa: 'オランダ', nameKo: '네덜란드', nameZh: '荷兰', flag: '🇳🇱', continent: 'europe' },
  { code: 'BE', slug: 'belgium', nameEn: 'Belgium', nameJa: 'ベルギー', nameKo: '벨기에', nameZh: '比利时', flag: '🇧🇪', continent: 'europe' },
  { code: 'CH', slug: 'switzerland', nameEn: 'Switzerland', nameJa: 'スイス', nameKo: '스위스', nameZh: '瑞士', flag: '🇨🇭', continent: 'europe' },
  { code: 'AT', slug: 'austria', nameEn: 'Austria', nameJa: 'オーストリア', nameKo: '오스트리아', nameZh: '奥地利', flag: '🇦🇹', continent: 'europe' },
  { code: 'SE', slug: 'sweden', nameEn: 'Sweden', nameJa: 'スウェーデン', nameKo: '스웨덴', nameZh: '瑞典', flag: '🇸🇪', continent: 'europe' },
  { code: 'NO', slug: 'norway', nameEn: 'Norway', nameJa: 'ノルウェー', nameKo: '노르웨이', nameZh: '挪威', flag: '🇳🇴', continent: 'europe' },
  { code: 'DK', slug: 'denmark', nameEn: 'Denmark', nameJa: 'デンマーク', nameKo: '덴마크', nameZh: '丹麦', flag: '🇩🇰', continent: 'europe' },
  { code: 'FI', slug: 'finland', nameEn: 'Finland', nameJa: 'フィンランド', nameKo: '핀란드', nameZh: '芬兰', flag: '🇫🇮', continent: 'europe' },
  { code: 'IE', slug: 'ireland', nameEn: 'Ireland', nameJa: 'アイルランド', nameKo: '아일랜드', nameZh: '爱尔兰', flag: '🇮🇪', continent: 'europe' },
  { code: 'PL', slug: 'poland', nameEn: 'Poland', nameJa: 'ポーランド', nameKo: '폴란드', nameZh: '波兰', flag: '🇵🇱', continent: 'europe' },
  { code: 'CZ', slug: 'czech-republic', nameEn: 'Czech Republic', nameJa: 'チェコ', nameKo: '체코', nameZh: '捷克', flag: '🇨🇿', continent: 'europe' },
  { code: 'HU', slug: 'hungary', nameEn: 'Hungary', nameJa: 'ハンガリー', nameKo: '헝가리', nameZh: '匈牙利', flag: '🇭🇺', continent: 'europe' },
  { code: 'GR', slug: 'greece', nameEn: 'Greece', nameJa: 'ギリシャ', nameKo: '그리스', nameZh: '希腊', flag: '🇬🇷', continent: 'europe' },
  { code: 'HR', slug: 'croatia', nameEn: 'Croatia', nameJa: 'クロアチア', nameKo: '크로아티아', nameZh: '克罗地亚', flag: '🇭🇷', continent: 'europe' },
  { code: 'RO', slug: 'romania', nameEn: 'Romania', nameJa: 'ルーマニア', nameKo: '루마니아', nameZh: '罗马尼亚', flag: '🇷🇴', continent: 'europe' },
  { code: 'BG', slug: 'bulgaria', nameEn: 'Bulgaria', nameJa: 'ブルガリア', nameKo: '불가리아', nameZh: '保加利亚', flag: '🇧🇬', continent: 'europe' },
  { code: 'RU', slug: 'russia', nameEn: 'Russia', nameJa: 'ロシア', nameKo: '러시아', nameZh: '俄罗斯', flag: '🇷🇺', continent: 'europe' },
  { code: 'UA', slug: 'ukraine', nameEn: 'Ukraine', nameJa: 'ウクライナ', nameKo: '우크라이나', nameZh: '乌克兰', flag: '🇺🇦', continent: 'europe' },
  { code: 'IS', slug: 'iceland', nameEn: 'Iceland', nameJa: 'アイスランド', nameKo: '아이슬란드', nameZh: '冰岛', flag: '🇮🇸', continent: 'europe' },

  // ── North America ─────────────────────────────────────────
  { code: 'US', slug: 'united-states', nameEn: 'United States', nameJa: 'アメリカ', nameKo: '미국', nameZh: '美国', flag: '🇺🇸', continent: 'north-america' },
  { code: 'CA', slug: 'canada', nameEn: 'Canada', nameJa: 'カナダ', nameKo: '캐나다', nameZh: '加拿大', flag: '🇨🇦', continent: 'north-america' },
  { code: 'MX', slug: 'mexico', nameEn: 'Mexico', nameJa: 'メキシコ', nameKo: '멕시코', nameZh: '墨西哥', flag: '🇲🇽', continent: 'north-america' },
  { code: 'CR', slug: 'costa-rica', nameEn: 'Costa Rica', nameJa: 'コスタリカ', nameKo: '코스타리카', nameZh: '哥斯达黎加', flag: '🇨🇷', continent: 'north-america' },
  { code: 'PA', slug: 'panama', nameEn: 'Panama', nameJa: 'パナマ', nameKo: '파나마', nameZh: '巴拿马', flag: '🇵🇦', continent: 'north-america' },
  { code: 'DO', slug: 'dominican-republic', nameEn: 'Dominican Republic', nameJa: 'ドミニカ共和国', nameKo: '도미니카 공화국', nameZh: '多米尼加', flag: '🇩🇴', continent: 'north-america' },
  { code: 'JM', slug: 'jamaica', nameEn: 'Jamaica', nameJa: 'ジャマイカ', nameKo: '자메이카', nameZh: '牙买加', flag: '🇯🇲', continent: 'north-america' },
  { code: 'GT', slug: 'guatemala', nameEn: 'Guatemala', nameJa: 'グアテマラ', nameKo: '과테말라', nameZh: '危地马拉', flag: '🇬🇹', continent: 'north-america' },

  // ── South America ─────────────────────────────────────────
  { code: 'BR', slug: 'brazil', nameEn: 'Brazil', nameJa: 'ブラジル', nameKo: '브라질', nameZh: '巴西', flag: '🇧🇷', continent: 'south-america' },
  { code: 'AR', slug: 'argentina', nameEn: 'Argentina', nameJa: 'アルゼンチン', nameKo: '아르헨티나', nameZh: '阿根廷', flag: '🇦🇷', continent: 'south-america' },
  { code: 'CL', slug: 'chile', nameEn: 'Chile', nameJa: 'チリ', nameKo: '칠레', nameZh: '智利', flag: '🇨🇱', continent: 'south-america' },
  { code: 'CO', slug: 'colombia', nameEn: 'Colombia', nameJa: 'コロンビア', nameKo: '콜롬비아', nameZh: '哥伦比亚', flag: '🇨🇴', continent: 'south-america' },
  { code: 'PE', slug: 'peru', nameEn: 'Peru', nameJa: 'ペルー', nameKo: '페루', nameZh: '秘鲁', flag: '🇵🇪', continent: 'south-america' },
  { code: 'EC', slug: 'ecuador', nameEn: 'Ecuador', nameJa: 'エクアドル', nameKo: '에콰도르', nameZh: '厄瓜多尔', flag: '🇪🇨', continent: 'south-america' },
  { code: 'UY', slug: 'uruguay', nameEn: 'Uruguay', nameJa: 'ウルグアイ', nameKo: '우루과이', nameZh: '乌拉圭', flag: '🇺🇾', continent: 'south-america' },

  // ── Oceania ───────────────────────────────────────────────
  { code: 'AU', slug: 'australia', nameEn: 'Australia', nameJa: 'オーストラリア', nameKo: '호주', nameZh: '澳大利亚', flag: '🇦🇺', continent: 'oceania' },
  { code: 'NZ', slug: 'new-zealand', nameEn: 'New Zealand', nameJa: 'ニュージーランド', nameKo: '뉴질랜드', nameZh: '新西兰', flag: '🇳🇿', continent: 'oceania' },
  { code: 'FJ', slug: 'fiji', nameEn: 'Fiji', nameJa: 'フィジー', nameKo: '피지', nameZh: '斐济', flag: '🇫🇯', continent: 'oceania' },
  { code: 'GU', slug: 'guam', nameEn: 'Guam', nameJa: 'グアム', nameKo: '괌', nameZh: '关岛', flag: '🇬🇺', continent: 'oceania' },

  // ── Middle East ───────────────────────────────────────────
  { code: 'AE', slug: 'united-arab-emirates', nameEn: 'United Arab Emirates', nameJa: 'アラブ首長国連邦', nameKo: '아랍에미리트', nameZh: '阿联酋', flag: '🇦🇪', continent: 'middle-east' },
  { code: 'TR', slug: 'turkey', nameEn: 'Turkey', nameJa: 'トルコ', nameKo: '터키', nameZh: '土耳其', flag: '🇹🇷', continent: 'middle-east' },
  { code: 'SA', slug: 'saudi-arabia', nameEn: 'Saudi Arabia', nameJa: 'サウジアラビア', nameKo: '사우디아라비아', nameZh: '沙特阿拉伯', flag: '🇸🇦', continent: 'middle-east' },
  { code: 'IL', slug: 'israel', nameEn: 'Israel', nameJa: 'イスラエル', nameKo: '이스라엘', nameZh: '以色列', flag: '🇮🇱', continent: 'middle-east' },
  { code: 'QA', slug: 'qatar', nameEn: 'Qatar', nameJa: 'カタール', nameKo: '카타르', nameZh: '卡塔尔', flag: '🇶🇦', continent: 'middle-east' },
  { code: 'OM', slug: 'oman', nameEn: 'Oman', nameJa: 'オマーン', nameKo: '오만', nameZh: '阿曼', flag: '🇴🇲', continent: 'middle-east' },
  { code: 'JO', slug: 'jordan', nameEn: 'Jordan', nameJa: 'ヨルダン', nameKo: '요르단', nameZh: '约旦', flag: '🇯🇴', continent: 'middle-east' },
  { code: 'KW', slug: 'kuwait', nameEn: 'Kuwait', nameJa: 'クウェート', nameKo: '쿠웨이트', nameZh: '科威特', flag: '🇰🇼', continent: 'middle-east' },
  { code: 'BH', slug: 'bahrain', nameEn: 'Bahrain', nameJa: 'バーレーン', nameKo: '바레인', nameZh: '巴林', flag: '🇧🇭', continent: 'middle-east' },

  // ── Africa ────────────────────────────────────────────────
  { code: 'EG', slug: 'egypt', nameEn: 'Egypt', nameJa: 'エジプト', nameKo: '이집트', nameZh: '埃及', flag: '🇪🇬', continent: 'africa' },
  { code: 'ZA', slug: 'south-africa', nameEn: 'South Africa', nameJa: '南アフリカ', nameKo: '남아프리카', nameZh: '南非', flag: '🇿🇦', continent: 'africa' },
  { code: 'KE', slug: 'kenya', nameEn: 'Kenya', nameJa: 'ケニア', nameKo: '케냐', nameZh: '肯尼亚', flag: '🇰🇪', continent: 'africa' },
  { code: 'MA', slug: 'morocco', nameEn: 'Morocco', nameJa: 'モロッコ', nameKo: '모로코', nameZh: '摩洛哥', flag: '🇲🇦', continent: 'africa' },
  { code: 'TN', slug: 'tunisia', nameEn: 'Tunisia', nameJa: 'チュニジア', nameKo: '튀니지', nameZh: '突尼斯', flag: '🇹🇳', continent: 'africa' },
  { code: 'NG', slug: 'nigeria', nameEn: 'Nigeria', nameJa: 'ナイジェリア', nameKo: '나이지리아', nameZh: '尼日利亚', flag: '🇳🇬', continent: 'africa' },
  { code: 'GH', slug: 'ghana', nameEn: 'Ghana', nameJa: 'ガーナ', nameKo: '가나', nameZh: '加纳', flag: '🇬🇭', continent: 'africa' },
  { code: 'TZ', slug: 'tanzania', nameEn: 'Tanzania', nameJa: 'タンザニア', nameKo: '탄자니아', nameZh: '坦桑尼亚', flag: '🇹🇿', continent: 'africa' },
];

/** Get the localized name for a country given a locale string. */
export function getCountryName(country: Country, locale: string): string {
  switch (locale) {
    case 'ja': return country.nameJa;
    case 'ko': return country.nameKo;
    case 'zh': return country.nameZh;
    default:   return country.nameEn;
  }
}

// ── Lookup indexes (built once) ─────────────────────────────

const bySlug = new Map<string, Country>(countries.map((c) => [c.slug, c]));
const byCode = new Map<string, Country>(countries.map((c) => [c.code, c]));

// ── Public helpers ──────────────────────────────────────────

export function getCountryBySlug(slug: string): Country | undefined {
  return bySlug.get(slug);
}

export function getCountryByCode(code: string): Country | undefined {
  return byCode.get(code.toUpperCase());
}

export function getAllCountries(): Country[] {
  return countries;
}

export function getCountriesByContinent(continent: Continent): Country[] {
  return countries.filter((c) => c.continent === continent);
}

export interface ContinentGroup {
  continent: Continent;
  label: {
    en: string;
    ja: string;
    ko: string;
    zh: string;
  };
  countries: Country[];
}

const continentLabels: Record<Continent, ContinentGroup['label']> = {
  asia: { en: 'Asia', ja: 'アジア', ko: '아시아', zh: '亚洲' },
  europe: { en: 'Europe', ja: 'ヨーロッパ', ko: '유럽', zh: '欧洲' },
  'north-america': { en: 'North America', ja: '北米', ko: '북미', zh: '北美洲' },
  'south-america': { en: 'South America', ja: '南米', ko: '남미', zh: '南美洲' },
  oceania: { en: 'Oceania', ja: 'オセアニア', ko: '오세아니아', zh: '大洋洲' },
  'middle-east': { en: 'Middle East', ja: '中東', ko: '중동', zh: '中东' },
  africa: { en: 'Africa', ja: 'アフリカ', ko: '아프리카', zh: '非洲' },
};

const continentOrder: Continent[] = [
  'asia',
  'europe',
  'north-america',
  'south-america',
  'oceania',
  'middle-east',
  'africa',
];

export function getCountriesGroupedByContinent(): ContinentGroup[] {
  return continentOrder.map((continent) => ({
    continent,
    label: continentLabels[continent],
    countries: getCountriesByContinent(continent),
  }));
}
