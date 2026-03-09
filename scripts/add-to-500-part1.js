// Part 1: Add ~100 spots — Japan expansion + global airports + Asia commercial
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const geofencePath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'geofence-data.json');

const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));
const geoData = JSON.parse(fs.readFileSync(geofencePath, 'utf-8'));

function agreeOnly(extras = {}) {
  return {
    agreeOnly: {
      actions: [
        ...(extras.preCheck ? [{ description: 'Accept terms checkbox', selector: "input[type='checkbox']", fallbackSelectors: ['.terms-checkbox', '#agree', '.checkbox'], action: 'check', delayMs: 500 }] : []),
        { description: 'Click connect button', selector: "button[type='submit'], .btn-connect, .submit-btn, input[type='submit']", fallbackSelectors: ['button:last-of-type', 'a.btn', '.btn-primary'], action: 'click', delayMs: 500 },
      ],
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function reg() {
  return {
    registration: {
      fields: [{ fieldId: 'email', selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: 'profile.email', inputMethod: 'set_value', delayMs: 500 }],
      postFillActions: [
        { description: 'Accept terms', selector: "input[type='checkbox'], .terms-agree", fallbackSelectors: ['#agree', '.checkbox'], action: 'check', delayMs: 300 },
        { description: 'Submit', selector: "button[type='submit'], .connect-btn, input[type='submit']", fallbackSelectors: ['button:last-of-type', '.btn-primary'], action: 'click', delayMs: 500 },
      ],
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function spot(id, name, ja, zh, ko, country, ssids, type, opts = {}) {
  return {
    spotId: id, name, nameJa: ja, nameZh: zh, nameKo: ko,
    ...(opts.airportCode ? { airportCode: opts.airportCode } : {}),
    country, ssids, portalType: type, tier: 'free',
    ...(type === 'agree_only' ? agreeOnly({ preCheck: opts.preCheck !== false }) : reg()),
    patternVersion: 1, lastVerified: '2026-03-10',
    notes: opts.notes || '',
  };
}

function geo(id, lat, lng, r) {
  return { spotId: id, latitude: lat, longitude: lng, radius: r, identifier: `geofence_${id}` };
}

const newSpots = [
  // ===== JAPAN — Public / Tourist / Library / Bus =====
  spot('jp-osaka-wifi', 'Osaka Free WiFi', '大阪 Free WiFi', '大阪免费WiFi', '오사카 무료 WiFi', 'JP', ['Osaka_Free_Wi-Fi', 'Osaka-Free-WiFi'], 'agree_only', { notes: 'Osaka city WiFi. Dotonbori, Namba, Umeda, Tennoji.' }),
  spot('jp-kyoto-city-wifi', 'KYOTO Wi-Fi', 'KYOTO Wi-Fi', '京都WiFi', '교토 WiFi', 'JP', ['KYOTO_Wi-Fi'], 'agree_only', { notes: 'Kyoto city WiFi. Kiyomizu, Fushimi Inari, Arashiyama area.' }),
  spot('jp-hakone-wifi', 'Hakone Free WiFi', '箱根 Free WiFi', '箱根免费WiFi', '하코네 무료 WiFi', 'JP', ['HAKONE_Free_Wi-Fi'], 'agree_only', { notes: 'Hakone area. Hot springs, Owakudani, Lake Ashi.' }),
  spot('jp-nikko-wifi', 'Nikko Free WiFi', '日光 Free WiFi', '日光免费WiFi', '닛코 무료 WiFi', 'JP', ['NIKKO_Free_Wi-Fi'], 'agree_only', { notes: 'Nikko area. Toshogu Shrine, Kegon Falls.' }),
  spot('jp-kamakura-wifi', 'Kamakura Free WiFi', '鎌倉 Free WiFi', '镰仓免费WiFi', '가마쿠라 무료 WiFi', 'JP', ['KAMAKURA_Free_Wi-Fi'], 'agree_only', { notes: 'Kamakura. Great Buddha, Hasedera, Komachi-dori.' }),
  spot('jp-miyajima-wifi', 'Miyajima Free WiFi', '宮島 Free WiFi', '宫岛免费WiFi', '미야지마 무료 WiFi', 'JP', ['MIYAJIMA_Free_Wi-Fi'], 'agree_only', { notes: 'Itsukushima Shrine island, Hiroshima.' }),
  spot('jp-beppu-wifi', 'Beppu Free WiFi', '別府 Free WiFi', '别府免费WiFi', '벳부 무료 WiFi', 'JP', ['BEPPU_Free_Wi-Fi'], 'agree_only', { notes: 'Beppu hot spring town, Oita.' }),
  spot('jp-atami-wifi', 'Atami Free WiFi', '熱海 Free WiFi', '热海免费WiFi', '아타미 무료 WiFi', 'JP', ['ATAMI_Free_Wi-Fi'], 'agree_only', { notes: 'Atami hot spring resort, Shizuoka.' }),
  spot('jp-fuji-wifi', 'Fuji City Free WiFi', '富士市 Free WiFi', '富士市免费WiFi', '후지시 무료 WiFi', 'JP', ['FUJI_Free_Wi-Fi'], 'agree_only', { notes: 'Fuji city area. Mt Fuji gateway.' }),
  spot('jp-naoshima-wifi', 'Naoshima Free WiFi', '直島 Free WiFi', '直岛免费WiFi', '나오시마 무료 WiFi', 'JP', ['NAOSHIMA_Free_Wi-Fi'], 'agree_only', { notes: 'Art island in Seto Inland Sea.' }),
  spot('jp-okayama-wifi', 'Okayama Free WiFi', '岡山 Free WiFi', '冈山免费WiFi', '오카야마 무료 WiFi', 'JP', ['OKAYAMA_Free_Wi-Fi'], 'agree_only', { notes: 'Okayama Station, Korakuen Garden, Kurashiki.' }),
  spot('jp-takamatsu-wifi', 'Takamatsu Free WiFi', '高松 Free WiFi', '高松免费WiFi', '다카마쓰 무료 WiFi', 'JP', ['TAKAMATSU_Free_Wi-Fi'], 'agree_only', { notes: 'Takamatsu, Kagawa. Ritsurin Garden, udon capital.' }),
  spot('jp-tokushima-wifi', 'Tokushima Free WiFi', '徳島 Free WiFi', '德岛免费WiFi', '도쿠시마 무료 WiFi', 'JP', ['TOKUSHIMA_Free_Wi-Fi'], 'agree_only', { notes: 'Tokushima. Awa Odori, Naruto whirlpools.' }),
  spot('jp-saga-wifi', 'Saga Free WiFi', '佐賀 Free WiFi', '佐贺免费WiFi', '사가 무료 WiFi', 'JP', ['SAGA_Free_Wi-Fi'], 'agree_only', { notes: 'Saga Station area.' }),
  spot('jp-oita-wifi', 'Oita Free WiFi', '大分 Free WiFi', '大分免费WiFi', '오이타 무료 WiFi', 'JP', ['OITA_Free_Wi-Fi'], 'agree_only', { notes: 'Oita city. Gateway to Beppu & Yufuin.' }),
  spot('jp-miyazaki-wifi', 'Miyazaki Free WiFi', '宮崎 Free WiFi', '宫崎免费WiFi', '미야자키 무료 WiFi', 'JP', ['MIYAZAKI_Free_Wi-Fi'], 'agree_only', { notes: 'Miyazaki city, Aoshima.' }),
  spot('jp-tottori-wifi', 'Tottori Free WiFi', '鳥取 Free WiFi', '�的取免费WiFi', '돗토리 무료 WiFi', 'JP', ['TOTTORI_Free_Wi-Fi'], 'agree_only', { notes: 'Tottori Sand Dunes area.' }),
  spot('jp-kanazawa-station-wifi', 'Kanazawa Station Free WiFi', '金沢駅 Free WiFi', '金泽站免费WiFi', '가나자와역 WiFi', 'JP', ['KANAZAWA_Station_Wi-Fi'], 'agree_only', { notes: 'Kanazawa Station dedicated WiFi.' }),
  spot('jp-naha-kokusai-wifi', 'Naha Kokusai Street WiFi', '那覇国際通り WiFi', '那霸国际通WiFi', '나하 고쿠사이도리 WiFi', 'JP', ['NAHA_Free_Wi-Fi'], 'agree_only', { notes: 'Naha Kokusai Street shopping area, Okinawa.' }),
  spot('jp-aomori-wifi', 'Aomori Free WiFi', '青森 Free WiFi', '青森免费WiFi', '아오모리 무료 WiFi', 'JP', ['AOMORI_Free_Wi-Fi'], 'agree_only', { notes: 'Aomori Station, Nebuta area.' }),
  spot('jp-akita-wifi', 'Akita Free WiFi', '秋田 Free WiFi', '秋田免费WiFi', '아키타 무료 WiFi', 'JP', ['AKITA_Free_Wi-Fi'], 'agree_only', { notes: 'Akita city.' }),
  spot('jp-yamagata-wifi', 'Yamagata Free WiFi', '山形 Free WiFi', '山形免费WiFi', '야마가타 무료 WiFi', 'JP', ['YAMAGATA_Free_Wi-Fi'], 'agree_only', { notes: 'Yamagata Station, Zao area.' }),
  spot('jp-morioka-wifi', 'Morioka Free WiFi', '盛岡 Free WiFi', '�的冈免费WiFi', '모리오카 무료 WiFi', 'JP', ['MORIOKA_Free_Wi-Fi'], 'agree_only', { notes: 'Morioka city, Iwate.' }),
  spot('jp-fukui-wifi', 'Fukui Free WiFi', '福井 Free WiFi', '福井免费WiFi', '후쿠이 무료 WiFi', 'JP', ['FUKUI_Free_Wi-Fi'], 'agree_only', { notes: 'Fukui city. Dinosaur Museum gateway.' }),
  spot('jp-toyama-wifi', 'Toyama Free WiFi', '富山 Free WiFi', '富山免费WiFi', '도야마 무료 WiFi', 'JP', ['TOYAMA_Free_Wi-Fi'], 'agree_only', { notes: 'Toyama Station, Tateyama gateway.' }),
  // Japan bus & ferry
  spot('jp-willer-wifi', 'WILLER EXPRESS WiFi', 'WILLER EXPRESS WiFi', 'WILLER巴士WiFi', 'WILLER EXPRESS WiFi', 'JP', ['WILLER_Free_Wi-Fi'], 'agree_only', { notes: 'Long-distance highway bus. Tokyo-Osaka-Nagoya routes.' }),
  spot('jp-jr-bus-wifi', 'JR Bus WiFi', 'JRバス WiFi', 'JR巴士WiFi', 'JR 버스 WiFi', 'JP', ['JR_BUS_Free_Wi-Fi'], 'agree_only', { notes: 'JR Highway Bus. Tokyo-Nagoya-Osaka Shinkansen alternative.' }),
  spot('jp-limousine-bus-wifi', 'Airport Limousine Bus WiFi', '空港リムジンバス WiFi', '机场大巴WiFi', '공항 리무진 WiFi', 'JP', ['Limousine_Bus_Free_Wi-Fi'], 'agree_only', { notes: 'Airport limousine buses: Narita, Haneda, Kansai.' }),
  // Japan retail/food
  spot('jp-daiso-wifi', 'DAISO Free WiFi', 'ダイソー Free WiFi', '大创免费WiFi', '다이소 무료 WiFi', 'JP', ['DAISO_Free_Wi-Fi'], 'agree_only', { notes: '100-yen store. WiFi at major locations.' }),
  spot('jp-gyumu-wifi', 'Gyomu Super Free WiFi', '業務スーパー WiFi', '业务超市WiFi', '교무슈퍼 WiFi', 'JP', ['Gyomu_Super_Free_Wi-Fi'], 'agree_only', { notes: 'Discount supermarket chain.' }),
  spot('jp-nitori-wifi', 'Nitori Free WiFi', 'ニトリ Free WiFi', '宜得利WiFi', '니토리 무료 WiFi', 'JP', ['NITORI_Free_Wi-Fi'], 'agree_only', { notes: 'Home furnishing chain. WiFi at major stores.' }),
  spot('jp-muji-wifi', 'MUJI Free WiFi', '無印良品 Free WiFi', '无印良品WiFi', '무인양품 무료 WiFi', 'JP', ['MUJI_Free_Wi-Fi'], 'agree_only', { notes: 'MUJI stores. WiFi at flagship and large stores.' }),
  spot('jp-tsutaya-wifi', 'TSUTAYA / T-SITE WiFi', 'TSUTAYA WiFi', 'TSUTAYA WiFi', 'TSUTAYA WiFi', 'JP', ['TSUTAYA_Free_Wi-Fi'], 'agree_only', { notes: 'Bookstore/cafe. Daikanyama T-SITE, Shonan T-SITE.' }),
  spot('jp-matsuya-dept-wifi', 'Matsuya Ginza WiFi', '松屋銀座 WiFi', '银座松屋WiFi', '마츠야 긴자 WiFi', 'JP', ['MATSUYA_GINZA_Free_Wi-Fi'], 'agree_only', { notes: 'Matsuya Department Store Ginza.' }),
  spot('jp-tokyu-hands-wifi', 'Tokyu Hands Free WiFi', '東急ハンズ WiFi', '东急Hands WiFi', '도큐 핸즈 WiFi', 'JP', ['HANDS_Free_Wi-Fi'], 'agree_only', { notes: 'DIY/lifestyle store. Major locations.' }),

  // ===== GLOBAL AIRPORTS — Asia Pacific expansion =====
  spot('au-per-wifi', 'Perth Airport', 'パース空港', '珀斯机场', '퍼스 공항', 'AU', ['Perth Airport Free WiFi'], 'registration', { airportCode: 'PER', notes: 'Perth International Airport.' }),
  spot('au-adl-wifi', 'Adelaide Airport', 'アデレード空港', '阿德莱德机场', '애들레이드 공항', 'AU', ['Adelaide Airport WiFi'], 'registration', { airportCode: 'ADL', notes: 'Adelaide Airport.' }),
  spot('nz-chc-wifi', 'Christchurch Airport', 'クライストチャーチ空港', '基督城机场', '크라이스트처치 공항', 'NZ', ['CHC Free WiFi'], 'agree_only', { airportCode: 'CHC', notes: 'Christchurch International.' }),
  spot('fj-nan-wifi', 'Fiji Nadi Airport', 'フィジー・ナンディ空港', '斐济楠迪机场', '피지 난디 공항', 'FJ', ['NAN Free WiFi'], 'agree_only', { airportCode: 'NAN', notes: 'Nadi International Airport, Fiji.' }),
  spot('mv-mle-wifi', 'Maldives Male Airport', 'モルディブ・マレ空港', '马尔代夫马累机场', '몰디브 말레 공항', 'MV', ['VIA Free WiFi'], 'agree_only', { airportCode: 'MLE', notes: 'Velana International Airport.' }),
  spot('uz-tas-wifi', 'Tashkent Airport', 'タシケント空港', '塔什干机场', '타슈켄트 공항', 'UZ', ['TAS Free WiFi'], 'agree_only', { airportCode: 'TAS', notes: 'Islam Karimov International Airport.' }),
  spot('kz-ala-wifi', 'Almaty Airport', 'アルマトイ空港', '阿拉木图机场', '알마티 공항', 'KZ', ['ALA Free WiFi'], 'agree_only', { airportCode: 'ALA', notes: 'Almaty International Airport.' }),
  spot('ge-tbs-wifi', 'Tbilisi Airport', 'トビリシ空港', '第比利斯机场', '트빌리시 공항', 'GE', ['TBS Free WiFi'], 'agree_only', { airportCode: 'TBS', notes: 'Tbilisi International Airport, Georgia.' }),

  // ===== GLOBAL AIRPORTS — Europe expansion =====
  spot('be-bru-wifi', 'Brussels Airport', 'ブリュッセル空港', '布鲁塞尔机场', '브뤼셀 공항', 'BE', ['Brussels Airport Free WiFi'], 'agree_only', { airportCode: 'BRU', notes: 'Brussels Airport.' }),
  spot('de-ber-wifi', 'Berlin Brandenburg Airport', 'ベルリン空港', '柏林机场', '베를린 공항', 'DE', ['BER Free WiFi'], 'agree_only', { airportCode: 'BER', notes: 'Berlin Brandenburg Airport.' }),
  spot('de-ham-wifi', 'Hamburg Airport', 'ハンブルク空港', '汉堡机场', '함부르크 공항', 'DE', ['HAM Free WiFi'], 'agree_only', { airportCode: 'HAM', notes: 'Hamburg Airport.' }),
  spot('de-dus-wifi', 'Dusseldorf Airport', 'デュッセルドルフ空港', '杜塞尔多夫机场', '뒤셀도르프 공항', 'DE', ['DUS Free WiFi'], 'agree_only', { airportCode: 'DUS', notes: 'Dusseldorf Airport.' }),
  spot('it-nap-wifi', 'Naples Airport', 'ナポリ空港', '那不勒斯机场', '나폴리 공항', 'IT', ['NAP Free WiFi'], 'registration', { airportCode: 'NAP', notes: 'Naples International Airport.' }),
  spot('it-vce-wifi', 'Venice Marco Polo Airport', 'ヴェネツィア空港', '威尼斯机场', '베네치아 공항', 'IT', ['VCE Free WiFi'], 'registration', { airportCode: 'VCE', notes: 'Venice Marco Polo Airport.' }),
  spot('es-agp-wifi', 'Malaga Airport', 'マラガ空港', '马拉加机场', '말라가 공항', 'ES', ['WiFi-AENA'], 'agree_only', { airportCode: 'AGP', notes: 'Costa del Sol gateway.' }),
  spot('es-pmis-wifi', 'Palma de Mallorca Airport', 'マヨルカ空港', '帕尔马机场', '팔마 공항', 'ES', ['WiFi-AENA'], 'agree_only', { airportCode: 'PMI', notes: 'Mallorca island gateway.' }),
  spot('pt-opo-wifi', 'Porto Airport', 'ポルト空港', '波尔图机场', '포르투 공항', 'PT', ['ANA Free WiFi'], 'agree_only', { airportCode: 'OPO', notes: 'Porto Francisco Sa Carneiro Airport.' }),
  spot('gb-man-wifi', 'Manchester Airport', 'マンチェスター空港', '曼彻斯特机场', '맨체스터 공항', 'GB', ['_Manchester Airport Wi-Fi'], 'registration', { airportCode: 'MAN', notes: 'Manchester Airport.' }),
  spot('gb-edi-wifi', 'Edinburgh Airport', 'エディンバラ空港', '爱丁堡机场', '에든버러 공항', 'GB', ['Edinburgh Airport Free WiFi'], 'registration', { airportCode: 'EDI', notes: 'Edinburgh Airport.' }),
  spot('is-kef-wifi', 'Reykjavik Keflavik Airport', 'レイキャビク空港', '雷克雅未克机场', '레이캬비크 공항', 'IS', ['KEF Free WiFi'], 'agree_only', { airportCode: 'KEF', notes: 'Keflavik International Airport, Iceland.' }),

  // ===== GLOBAL AIRPORTS — Americas expansion =====
  spot('us-dtw-wifi', 'Detroit Metro Airport', 'デトロイト空港', '底特律机场', '디트로이트 공항', 'US', ['DTW Free WiFi'], 'agree_only', { airportCode: 'DTW', notes: 'Detroit Metropolitan Wayne County.' }),
  spot('us-clt-wifi', 'Charlotte Airport', 'シャーロット空港', '夏洛特机场', '샬럿 공항', 'US', ['CLT Free WiFi'], 'agree_only', { airportCode: 'CLT', notes: 'Charlotte Douglas International.' }),
  spot('us-fll-wifi', 'Fort Lauderdale Airport', 'フォートローダーデール空港', '劳德代尔堡机场', '포트로더데일 공항', 'US', ['FLL Free WiFi'], 'agree_only', { airportCode: 'FLL', notes: 'Fort Lauderdale-Hollywood International.' }),
  spot('us-phl-wifi', 'Philadelphia Airport', 'フィラデルフィア空港', '费城机场', '필라델피아 공항', 'US', ['PHL Free WiFi'], 'agree_only', { airportCode: 'PHL', notes: 'Philadelphia International.' }),
  spot('us-pdx-wifi', 'Portland Airport', 'ポートランド空港', '波特兰机场', '포틀랜드 공항', 'US', ['PDX Free WiFi'], 'agree_only', { airportCode: 'PDX', notes: 'Portland International, Oregon.' }),
  spot('us-sna-wifi', 'John Wayne Airport (Orange County)', 'ジョン・ウェイン空港', '约翰韦恩机场', '존 웨인 공항', 'US', ['SNA Free WiFi'], 'agree_only', { airportCode: 'SNA', notes: 'Orange County, California.' }),
  spot('us-hnl-wifi-v2', 'Honolulu Daniel K. Inouye Airport', 'ホノルル空港', '檀香山机场', '호놀룰루 공항', 'US', ['HNL Free WiFi', 'Honolulu Airport WiFi'], 'agree_only', { airportCode: 'HNL', notes: 'Main Hawaii hub. Upgraded from old hnl entry.' }),
  spot('pa-pty-wifi', 'Panama City Tocumen Airport', 'パナマシティ空港', '巴拿马城机场', '파나마시티 공항', 'PA', ['PTY Free WiFi'], 'agree_only', { airportCode: 'PTY', notes: 'Tocumen International. Central America hub.' }),
  spot('cr-sjo-wifi', 'San Jose Costa Rica Airport', 'サンホセ空港', '圣何塞机场', '산호세 공항', 'CR', ['SJO Free WiFi'], 'agree_only', { airportCode: 'SJO', notes: 'Juan Santamaria International.' }),

  // ===== KOREA — Commercial expansion =====
  spot('kr-homeplus-wifi', 'Homeplus WiFi', 'ホームプラス WiFi', 'Homeplus WiFi', '홈플러스 WiFi', 'KR', ['Homeplus_Free_WiFi'], 'agree_only', { notes: 'Major hypermarket chain in Korea.' }),
  spot('kr-emart-wifi', 'E-mart WiFi', 'イーマート WiFi', '易买得WiFi', '이마트 WiFi', 'KR', ['Emart_Free_WiFi'], 'agree_only', { notes: 'Largest hypermarket chain in Korea. Shinsegae group.' }),
  spot('kr-olive-young-wifi', 'Olive Young WiFi', 'オリーブヤング WiFi', 'Olive Young WiFi', '올리브영 WiFi', 'KR', ['OliveYoung_Free_WiFi'], 'agree_only', { notes: 'Health & beauty chain. Popular with tourists.' }),
  spot('kr-daiso-wifi', 'DAISO WiFi (Korea)', 'ダイソー WiFi（韓国）', '大创WiFi（韩国）', '다이소 WiFi (한국)', 'KR', ['DAISO_Free_WiFi'], 'agree_only', { notes: 'DAISO Korea. Larger stores have WiFi.' }),
  spot('kr-gwangjang-wifi', 'Gwangjang Market WiFi', '広蔵市場 WiFi', '广藏市场WiFi', '광장시장 WiFi', 'KR', ['Gwangjang_Free_WiFi'], 'agree_only', { notes: 'Traditional market in Seoul. Street food capital.' }),
  spot('kr-dongdaemun-wifi', 'Dongdaemun WiFi', '東大門 WiFi', '东大门WiFi', '동대문 WiFi', 'KR', ['Dongdaemun_Free_WiFi'], 'agree_only', { notes: 'Dongdaemun Design Plaza and shopping area.' }),
  spot('kr-myeongdong-wifi', 'Myeongdong Free WiFi', '明洞 WiFi', '明洞WiFi', '명동 무료 WiFi', 'KR', ['Myeongdong_Free_WiFi'], 'agree_only', { notes: 'Seoul Myeongdong shopping district.' }),
  spot('kr-jeju-wifi', 'Jeju Free WiFi', '済州 WiFi', '济州WiFi', '제주 무료 WiFi', 'KR', ['Jeju_Free_WiFi'], 'agree_only', { notes: 'Jeju Island public WiFi. Tourist spots.' }),

  // ===== TAIWAN — Expansion =====
  spot('tw-tainan-wifi', 'Tainan Free WiFi', '台南 WiFi', '台南WiFi', '타이난 WiFi', 'TW', ['Tainan Free', 'iTainan'], 'agree_only', { notes: 'Tainan city public WiFi. Historic temples.' }),
  spot('tw-hualien-wifi', 'Hualien Free WiFi', '花蓮 WiFi', '花莲WiFi', '화롄 WiFi', 'TW', ['Hualien Free'], 'agree_only', { notes: 'Hualien. Taroko Gorge gateway.' }),
  spot('tw-tsa-wifi', 'Taipei Songshan Airport', '台北松山空港', '台北松山机场', '타이베이 쑹산 공항', 'TW', ['TSA Free WiFi'], 'agree_only', { airportCode: 'TSA', notes: 'Taipei Songshan Airport (domestic + China/Japan).' }),
  spot('tw-rmq-wifi', 'Taichung Airport', '台中空港', '台中机场', '타이중 공항', 'TW', ['RMQ Free WiFi'], 'agree_only', { airportCode: 'RMQ', notes: 'Taichung International Airport.' }),

  // ===== THAILAND — Expansion =====
  spot('th-pattaya-wifi', 'Pattaya Free WiFi', 'パタヤ WiFi', '芭提雅WiFi', '파타야 WiFi', 'TH', ['Pattaya_Free_WiFi'], 'agree_only', { notes: 'Pattaya Beach area, Walking Street.' }),
  spot('th-chiangrai-wifi', 'Chiang Rai Free WiFi', 'チェンライ WiFi', '清莱WiFi', '치앙라이 WiFi', 'TH', ['ChiangRai_Free_WiFi'], 'agree_only', { notes: 'Chiang Rai. White Temple area.' }),
  spot('th-krabi-wifi', 'Krabi Airport', 'クラビ空港', '甲米机场', '끄라비 공항', 'TH', ['KBV Free WiFi'], 'agree_only', { airportCode: 'KBV', notes: 'Krabi Airport. Beach resort gateway.' }),
  spot('th-samui-wifi', 'Koh Samui Airport', 'サムイ島空港', '苏梅岛机场', '코사무이 공항', 'TH', ['USM Free WiFi'], 'agree_only', { airportCode: 'USM', notes: 'Koh Samui Airport. Island resort.' }),

  // ===== VIETNAM — Expansion =====
  spot('vn-phu-quoc-wifi', 'Phu Quoc Airport', 'フーコック空港', '富国岛机场', '푸꾸옥 공항', 'VN', ['PQC Free WiFi'], 'agree_only', { airportCode: 'PQC', notes: 'Phu Quoc Island Airport.' }),
  spot('vn-hcmc-metro-wifi', 'HCMC Metro WiFi', 'ホーチミンメトロ WiFi', '胡志明地铁WiFi', '호치민 메트로 WiFi', 'VN', ['HCMC_Metro_WiFi'], 'agree_only', { notes: 'Ho Chi Minh City Metro Line 1.' }),

  // ===== SINGAPORE — Expansion =====
  spot('sg-mrt-wifi', 'Singapore MRT WiFi', 'シンガポールMRT WiFi', '新加坡地铁WiFi', '싱가포르 MRT WiFi', 'SG', ['Wireless@SGx', 'Wireless@SG'], 'agree_only', { notes: 'Singapore MRT stations. Government WiFi.' }),

  // ===== HONG KONG — Expansion =====
  spot('hk-wifi-hk', 'Wi-Fi.HK', 'Wi-Fi.HK', 'Wi-Fi.HK', 'Wi-Fi.HK', 'HK', ['Wi-Fi.HK via PCCW', 'freegovwifi-e'], 'agree_only', { notes: 'Hong Kong government free WiFi. Parks, libraries, govt buildings.' }),

  // ===== MALAYSIA — Expansion =====
  spot('my-langkawi-wifi', 'Langkawi Airport', 'ランカウイ空港', '兰卡威机场', '랑카위 공항', 'MY', ['LGK Free WiFi'], 'agree_only', { airportCode: 'LGK', notes: 'Langkawi International Airport.' }),

  // ===== INDONESIA — Expansion =====
  spot('id-lombok-wifi', 'Lombok Airport', 'ロンボク空港', '龙目岛机场', '롬복 공항', 'ID', ['LOP Free WiFi'], 'agree_only', { airportCode: 'LOP', notes: 'Lombok International Airport.' }),
  spot('id-makassar-wifi', 'Makassar Airport', 'マカッサル空港', '望加锡机场', '마카사르 공항', 'ID', ['UPG Free WiFi'], 'agree_only', { airportCode: 'UPG', notes: 'Sultan Hasanuddin Airport, Makassar.' }),

  // ===== AFRICA — Expansion =====
  spot('tz-dar-wifi', 'Dar es Salaam Airport', 'ダルエスサラーム空港', '达累斯萨拉姆机场', '다르에스살람 공항', 'TZ', ['DAR Free WiFi'], 'agree_only', { airportCode: 'DAR', notes: 'Julius Nyerere International Airport.' }),
  spot('gh-acc-wifi', 'Accra Kotoka Airport', 'アクラ空港', '阿克拉机场', '아크라 공항', 'GH', ['ACC Free WiFi'], 'agree_only', { airportCode: 'ACC', notes: 'Kotoka International Airport, Ghana.' }),
  spot('sn-dss-wifi', 'Dakar Airport', 'ダカール空港', '达喀尔机场', '다카르 공항', 'SN', ['DSS Free WiFi'], 'agree_only', { airportCode: 'DSS', notes: 'Blaise Diagne International Airport.' }),
  spot('mu-mru-wifi', 'Mauritius Airport', 'モーリシャス空港', '毛里求斯机场', '모리셔스 공항', 'MU', ['MRU Free WiFi'], 'agree_only', { airportCode: 'MRU', notes: 'Sir Seewoosagur Ramgoolam International.' }),

  // ===== MIDDLE EAST — Expansion =====
  spot('jo-amm-wifi', 'Amman Queen Alia Airport', 'アンマン空港', '安曼机场', '암만 공항', 'JO', ['AMM Free WiFi'], 'agree_only', { airportCode: 'AMM', notes: 'Queen Alia International Airport, Jordan.' }),
  spot('lb-bey-wifi', 'Beirut Airport', 'ベイルート空港', '贝鲁特机场', '베이루트 공항', 'LB', ['BEY Free WiFi'], 'agree_only', { airportCode: 'BEY', notes: 'Rafic Hariri International Airport.' }),

  // ===== AMERICAS — Expansion =====
  spot('uy-mvd-wifi', 'Montevideo Airport', 'モンテビデオ空港', '蒙得维的亚机场', '몬테비데오 공항', 'UY', ['MVD Free WiFi'], 'agree_only', { airportCode: 'MVD', notes: 'Carrasco International Airport, Uruguay.' }),
  spot('ec-uio-wifi', 'Quito Airport', 'キト空港', '基多机场', '키토 공항', 'EC', ['UIO Free WiFi'], 'agree_only', { airportCode: 'UIO', notes: 'Mariscal Sucre International, Ecuador.' }),
  spot('do-sdq-wifi', 'Santo Domingo Airport', 'サントドミンゴ空港', '圣多明各机场', '산토도밍고 공항', 'DO', ['SDQ Free WiFi'], 'agree_only', { airportCode: 'SDQ', notes: 'Las Americas International, Dominican Republic.' }),
  spot('jm-kin-wifi', 'Kingston Airport', 'キングストン空港', '金斯顿机场', '킹스턴 공항', 'JM', ['KIN Free WiFi'], 'agree_only', { airportCode: 'KIN', notes: 'Norman Manley International, Jamaica.' }),
  spot('tt-pos-wifi', 'Port of Spain Airport', 'ポートオブスペイン空港', '西班牙港机场', '포트오브스페인 공항', 'TT', ['POS Free WiFi'], 'agree_only', { airportCode: 'POS', notes: 'Piarco International, Trinidad.' }),
];

const newGeofences = [
  // Australia/Oceania
  geo('au-per-wifi', -31.9403, 115.9670, 2000),
  geo('au-adl-wifi', -34.9461, 138.5311, 1500),
  geo('nz-chc-wifi', -43.4894, 172.5322, 1500),
  geo('fj-nan-wifi', -17.7553, 177.4436, 1500),
  geo('mv-mle-wifi', 4.1918, 73.5294, 1000),
  // Central Asia / Caucasus
  geo('uz-tas-wifi', 41.2611, 69.2813, 1500),
  geo('kz-ala-wifi', 43.3521, 77.0405, 2000),
  geo('ge-tbs-wifi', 41.6692, 44.9547, 1500),
  // Europe
  geo('be-bru-wifi', 50.9014, 4.4844, 1500),
  geo('de-ber-wifi', 52.3667, 13.5033, 2500),
  geo('de-ham-wifi', 53.6304, 9.9882, 1500),
  geo('de-dus-wifi', 51.2895, 6.7668, 1500),
  geo('it-nap-wifi', 40.8860, 14.2908, 1500),
  geo('it-vce-wifi', 45.5053, 12.3519, 1500),
  geo('es-agp-wifi', 36.6749, -4.4991, 1500),
  geo('es-pmis-wifi', 39.5517, 2.7388, 1500),
  geo('pt-opo-wifi', 41.2481, -8.6814, 1500),
  geo('gb-man-wifi', 53.3537, -2.2750, 2000),
  geo('gb-edi-wifi', 55.9508, -3.3615, 1500),
  geo('is-kef-wifi', 63.9850, -22.6056, 2000),
  // US
  geo('us-dtw-wifi', 42.2124, -83.3534, 2500),
  geo('us-clt-wifi', 35.2140, -80.9431, 2000),
  geo('us-fll-wifi', 26.0726, -80.1527, 1500),
  geo('us-phl-wifi', 39.8721, -75.2411, 2000),
  geo('us-pdx-wifi', 45.5898, -122.5951, 1500),
  geo('us-sna-wifi', 33.6762, -117.8674, 1000),
  // Americas
  geo('pa-pty-wifi', 9.0714, -79.3835, 2000),
  geo('cr-sjo-wifi', 9.9939, -84.2088, 1500),
  geo('uy-mvd-wifi', -34.8384, -56.0308, 1500),
  geo('ec-uio-wifi', -0.1292, -78.3575, 2000),
  geo('do-sdq-wifi', 18.4297, -69.6689, 1500),
  geo('jm-kin-wifi', 17.9357, -76.7875, 1500),
  geo('tt-pos-wifi', 10.5953, -61.3372, 1500),
  // SE Asia
  geo('th-krabi-wifi', 8.0986, 98.9862, 1000),
  geo('th-samui-wifi', 9.5478, 100.0623, 1000),
  geo('vn-phu-quoc-wifi', 10.1697, 103.9931, 1000),
  geo('my-langkawi-wifi', 6.3299, 99.7286, 1000),
  geo('id-lombok-wifi', -8.7573, 116.2767, 1500),
  geo('id-makassar-wifi', -5.0616, 119.5540, 1500),
  geo('tw-tsa-wifi', 25.0694, 121.5525, 1000),
  geo('tw-rmq-wifi', 24.2648, 120.6208, 1000),
  // Africa
  geo('tz-dar-wifi', -6.8781, 39.2026, 1500),
  geo('gh-acc-wifi', 5.6052, -0.1668, 1500),
  geo('sn-dss-wifi', 14.6706, -17.0731, 2000),
  geo('mu-mru-wifi', -20.4302, 57.6836, 1500),
  // Middle East
  geo('jo-amm-wifi', 31.7226, 35.9932, 2000),
  geo('lb-bey-wifi', 33.8209, 35.4884, 1000),
];

// Add spots
let added = 0;
for (const s of newSpots) {
  if (!data.patterns.find(p => p.spotId === s.spotId)) { data.patterns.push(s); added++; }
  else { console.log(`Skip: ${s.spotId}`); }
}
console.log(`Added ${added} spots`);

// Add geofences
let geoAdded = 0;
for (const g of newGeofences) {
  if (!geoData.regions.find(r => r.spotId === g.spotId)) { geoData.regions.push(g); geoAdded++; }
}

data.version = 12; data.updatedAt = '2026-03-10';
geoData.version = 7; geoData.updatedAt = '2026-03-10';

fs.writeFileSync(patternsPath, JSON.stringify(data, null, 2) + '\n');
fs.writeFileSync(geofencePath, JSON.stringify(geoData, null, 2) + '\n');

console.log(`Total patterns: ${data.patterns.length}`);
console.log(`Added ${geoAdded} geofences (total: ${geoData.regions.length})`);
