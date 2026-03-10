// add-to-600.js — Add 100 spots (500→600)
// Focus: strengthen weak regions + Japan depth + more global airports/cities
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const geofencePath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'geofence-data.json');

const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));
const geoData = JSON.parse(fs.readFileSync(geofencePath, 'utf-8'));
const existingIds = new Set(data.patterns.map(p => p.spotId));
console.log(`Starting: ${data.patterns.length} spots`);

function agreeOnly(opts = {}) {
  const actions = [];
  if (opts.preCheck !== false) {
    actions.push({
      description: 'Check terms checkbox if present',
      selector: "input[type='checkbox']",
      fallbackSelectors: ['#agree', '.terms-checkbox', '.tos-agree'],
      action: 'check', optional: true, delayMs: 300,
    });
  }
  actions.push({
    description: 'Click connect button',
    selector: "button[type='submit'], .btn-connect",
    fallbackSelectors: ['button:last-of-type', 'a.btn', '.btn-primary', "input[type='submit']", '.connect-btn'],
    action: 'click', delayMs: 500,
  });
  return { agreeOnly: { actions, successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' } } };
}

function reg() {
  return {
    registration: {
      fields: [{ fieldId: 'email', selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type", '#email', '.email-input'], valueSource: 'profile.email', inputMethod: 'set_value', delayMs: 500 }],
      postFillActions: [
        { description: 'Accept terms', selector: "input[type='checkbox'], .terms-agree", fallbackSelectors: ['#agree', '.checkbox', '.tos'], action: 'check', delayMs: 300 },
        { description: 'Submit', selector: "button[type='submit'], .connect-btn", fallbackSelectors: ['button:last-of-type', '.btn-primary', "input[type='submit']"], action: 'click', delayMs: 500 },
      ],
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function s(id, name, ja, zh, ko, country, ssids, type, opts = {}) {
  return {
    spotId: id, name, nameJa: ja, nameZh: zh, nameKo: ko,
    ...(opts.airportCode ? { airportCode: opts.airportCode } : {}),
    country, ssids, portalType: type, tier: 'free',
    ...(type === 'agree_only' ? agreeOnly({ preCheck: opts.preCheck !== false }) : reg()),
    patternVersion: 1, lastVerified: '2026-03-10', notes: opts.notes || '',
  };
}

function geo(spotId, lat, lng, radius) {
  return { spotId, latitude: lat, longitude: lng, radius, identifier: `geofence_${spotId}` };
}

const newSpots = [];
const newGeo = [];

// ══════════════════════════════════════════════
// JAPAN: More chains, stations, tourist areas (30)
// ══════════════════════════════════════════════
newSpots.push(
  // Restaurant chains
  s('jp-gyukaku-wifi', 'Gyukaku WiFi', '牛角Wi-Fi', '牛角WiFi', '규카쿠 WiFi', 'JP', ['GYUKAKU_Free_Wi-Fi'], 'agree_only', { notes: 'Gyukaku yakiniku chain' }),
  s('jp-katsuya-wifi', 'Katsuya WiFi', 'かつやWi-Fi', 'Katsuya WiFi', '카츠야 WiFi', 'JP', ['KATSUYA_Free_Wi-Fi'], 'agree_only', { notes: 'Katsuya tonkatsu chain' }),
  s('jp-ootoya-wifi', 'Ootoya WiFi', '大戸屋Wi-Fi', '大户屋WiFi', '오오토야 WiFi', 'JP', ['OOTOYA_Free_Wi-Fi'], 'agree_only', { notes: 'Ootoya teishoku chain' }),
  s('jp-cocos-wifi', "Coco's WiFi", 'ココスWi-Fi', 'Cocos WiFi', '코코스 WiFi', 'JP', ['COCOS_Free_Wi-Fi'], 'agree_only', { notes: "Coco's family restaurant chain" }),
  s('jp-royal-host-wifi', 'Royal Host WiFi', 'ロイヤルホストWi-Fi', 'Royal Host WiFi', '로얄호스트 WiFi', 'JP', ['ROYALHOST_Free_Wi-Fi'], 'agree_only', { notes: 'Royal Host family restaurant' }),
  s('jp-ikinari-steak-wifi', 'Ikinari Steak WiFi', 'いきなりステーキWi-Fi', 'Ikinari Steak WiFi', '이키나리 스테이크 WiFi', 'JP', ['IKINARI_STEAK_Wi-Fi'], 'agree_only', { notes: 'Ikinari Steak chain' }),
  s('jp-pepper-lunch-wifi', 'Pepper Lunch WiFi', 'ペッパーランチWi-Fi', 'Pepper Lunch WiFi', '페퍼런치 WiFi', 'JP', ['PEPPERLUNCH_Free_Wi-Fi'], 'agree_only', { notes: 'Pepper Lunch chain' }),
  // Convenience stores & retail
  s('jp-daiso-wifi', 'DAISO WiFi', 'ダイソーWi-Fi', '大创WiFi', '다이소 WiFi', 'JP', ['DAISO_Free_Wi-Fi'], 'agree_only', { notes: 'DAISO 100-yen chain' }),
  s('jp-seria-wifi', 'Seria WiFi', 'セリアWi-Fi', 'Seria WiFi', '세리아 WiFi', 'JP', ['Seria_Free_Wi-Fi'], 'agree_only', { notes: 'Seria 100-yen chain' }),
  s('jp-abc-mart-wifi', 'ABC-MART WiFi', 'ABCマートWi-Fi', 'ABC-MART WiFi', 'ABC마트 WiFi', 'JP', ['ABCMART_Free_Wi-Fi'], 'agree_only', { notes: 'ABC-MART shoe stores' }),
  // Coffee & cafe
  s('jp-komeda-wifi', 'Komeda WiFi', 'コメダ珈琲Wi-Fi', 'Komeda WiFi', '코메다 WiFi', 'JP', ['Komeda_Wi-Fi', 'KOMEDA_Free'], 'agree_only', { notes: 'Komeda Coffee chain' }),
  s('jp-ueshima-wifi', 'Ueshima Coffee WiFi', '上島珈琲Wi-Fi', '上岛咖啡WiFi', '우에시마 WiFi', 'JP', ['UESHIMA_Wi-Fi', 'UCC_Wi-Fi'], 'agree_only', { notes: 'Ueshima Coffee chain' }),
  s('jp-veloce-wifi', 'Veloce WiFi', 'ベローチェWi-Fi', 'Veloce WiFi', '벨로체 WiFi', 'JP', ['VELOCE_Free_Wi-Fi'], 'agree_only', { notes: 'Cafe Veloce chain' }),
  // Train stations
  s('jp-toei-wifi', 'Toei Subway WiFi', '都営地下鉄Wi-Fi', '都营地铁WiFi', '도에이 지하철 WiFi', 'JP', ['Toei_Subway_Free_Wi-Fi', 'toei_wifi'], 'agree_only', { notes: 'Toei subway lines' }),
  s('jp-yokohama-metro-wifi', 'Yokohama Metro WiFi', '横浜市営地下鉄Wi-Fi', '横滨地铁WiFi', '요코하마 지하철 WiFi', 'JP', ['Yokohama_City_Wi-Fi'], 'agree_only', { notes: 'Yokohama municipal subway' }),
  s('jp-sapporo-metro-wifi', 'Sapporo Metro WiFi', '札幌地下鉄Wi-Fi', '札幌地铁WiFi', '삿포로 지하철 WiFi', 'JP', ['Sapporo_City_Wi-Fi', 'Sapporo_Subway_WiFi'], 'agree_only', { notes: 'Sapporo subway WiFi' }),
  // Tourist areas
  s('jp-hakone-wifi', 'Hakone Free WiFi', '箱根フリーWi-Fi', '箱根免费WiFi', '하코네 무료 WiFi', 'JP', ['HAKONE_Free_Wi-Fi'], 'agree_only', { notes: 'Hakone area WiFi' }),
  s('jp-atami-wifi', 'Atami Free WiFi', '熱海フリーWi-Fi', '热海免费WiFi', '아타미 무료 WiFi', 'JP', ['ATAMI_Free_Wi-Fi'], 'agree_only', { notes: 'Atami city WiFi' }),
  s('jp-enoshima-wifi', 'Enoshima WiFi', '江の島Wi-Fi', '江之岛WiFi', '에노시마 WiFi', 'JP', ['ENOSHIMA_Free_Wi-Fi'], 'agree_only', { notes: 'Enoshima island WiFi' }),
  s('jp-miyajima-wifi', 'Miyajima WiFi', '宮島Wi-Fi', '宫岛WiFi', '미야지마 WiFi', 'JP', ['Miyajima_Free_Wi-Fi', 'MIYAJIMA_WiFi'], 'agree_only', { notes: 'Miyajima island WiFi' }),
  s('jp-shirakawago-wifi', 'Shirakawa-go WiFi', '白川郷Wi-Fi', '白川乡WiFi', '시라카와고 WiFi', 'JP', ['Shirakawago_Free_Wi-Fi'], 'agree_only', { notes: 'Shirakawa-go village WiFi' }),
  s('jp-naoshima-wifi', 'Naoshima WiFi', '直島Wi-Fi', '直岛WiFi', '나오시마 WiFi', 'JP', ['NAOSHIMA_Free_Wi-Fi'], 'agree_only', { notes: 'Naoshima art island WiFi' }),
  // Shopping malls
  s('jp-aeon-wifi', 'AEON Mall WiFi', 'イオンモールWi-Fi', '永旺梦乐城WiFi', '이온몰 WiFi', 'JP', ['AEON_MALL_Wi-Fi', 'AEON_Free_WiFi'], 'agree_only', { notes: 'AEON Mall chain' }),
  s('jp-lalaport-wifi', 'LaLaport WiFi', 'ららぽーとWi-Fi', 'LaLaport WiFi', '라라포트 WiFi', 'JP', ['LALAPORT_Free_Wi-Fi'], 'agree_only', { notes: 'LaLaport shopping malls' }),
  s('jp-lumine-wifi', 'LUMINE WiFi', 'ルミネWi-Fi', 'LUMINE WiFi', '루미네 WiFi', 'JP', ['LUMINE_Free_Wi-Fi'], 'agree_only', { notes: 'LUMINE department stores' }),
  // Amusement/Entertainment
  s('jp-usj-wifi', 'USJ WiFi', 'USJ Wi-Fi', '日本环球影城WiFi', 'USJ WiFi', 'JP', ['USJ_Free_Wi-Fi', 'Universal_WiFi'], 'agree_only', { notes: 'Universal Studios Japan WiFi' }),
  s('jp-tdl-wifi', 'Tokyo Disney WiFi', '東京ディズニーWi-Fi', '东京迪士尼WiFi', '도쿄 디즈니 WiFi', 'JP', ['TDR_Free_Wi-Fi', 'Disney_Guest_WiFi'], 'agree_only', { notes: 'Tokyo Disneyland/DisneySea WiFi' }),
  // Hotels
  s('jp-toyoko-inn-wifi', 'Toyoko Inn WiFi', '東横インWi-Fi', '东横INN WiFi', '도요코인 WiFi', 'JP', ['TOYOKO-INN', 'ToyokoInn_WiFi'], 'agree_only', { notes: 'Toyoko Inn hotel chain' }),
  s('jp-apa-hotel-wifi', 'APA Hotel WiFi', 'アパホテルWi-Fi', 'APA酒店WiFi', 'APA호텔 WiFi', 'JP', ['APA_HOTEL_WiFi', 'APA_HOTEL'], 'agree_only', { notes: 'APA Hotel chain' }),
  s('jp-super-hotel-wifi', 'Super Hotel WiFi', 'スーパーホテルWi-Fi', 'Super Hotel WiFi', '슈퍼호텔 WiFi', 'JP', ['SuperHotel_WiFi', 'SUPER_HOTEL'], 'agree_only', { notes: 'Super Hotel chain' }),
);

// ══════════════════════════════════════════════
// KOREA: Expand (10)
// ══════════════════════════════════════════════
newSpots.push(
  s('kr-daegu-metro-wifi', 'Daegu Metro WiFi', '大邱地下鉄WiFi', '大邱地铁WiFi', '대구 지하철 WiFi', 'KR', ['Daegu_Metro_WiFi', 'DaeguMetro_Free'], 'agree_only', { notes: 'Daegu metro WiFi' }),
  s('kr-gwangju-wifi', 'Gwangju WiFi', '光州WiFi', '光州WiFi', '광주 WiFi', 'KR', ['Gwangju_Free_WiFi'], 'agree_only', { notes: 'Gwangju city WiFi' }),
  s('kr-daejeon-wifi', 'Daejeon WiFi', '大田WiFi', '大田WiFi', '대전 WiFi', 'KR', ['Daejeon_Free_WiFi'], 'agree_only', { notes: 'Daejeon city WiFi' }),
  s('kr-gangnam-wifi', 'Gangnam WiFi', '江南WiFi', '江南WiFi', '강남 WiFi', 'KR', ['Gangnam_Free_WiFi', 'GN_WiFi'], 'agree_only', { notes: 'Gangnam district WiFi' }),
  s('kr-myeongdong-wifi', 'Myeongdong WiFi', '明洞WiFi', '明洞WiFi', '명동 WiFi', 'KR', ['Myeongdong_Free_WiFi'], 'agree_only', { notes: 'Myeongdong shopping district WiFi' }),
  s('kr-hongdae-wifi', 'Hongdae WiFi', '弘大WiFi', '弘大WiFi', '홍대 WiFi', 'KR', ['Hongdae_Free_WiFi'], 'agree_only', { notes: 'Hongdae area WiFi' }),
  s('kr-ediya-wifi', 'Ediya Coffee WiFi', 'イディヤWiFi', 'Ediya咖啡WiFi', '이디야 WiFi', 'KR', ['EDIYA_WiFi', 'ediya_free'], 'agree_only', { notes: 'Ediya Coffee chain WiFi' }),
  s('kr-twosome-wifi', 'A Twosome Place WiFi', 'トゥーサムWiFi', 'A Twosome WiFi', '투썸플레이스 WiFi', 'KR', ['TWOSOME_WiFi', 'ATwosome_Free'], 'agree_only', { notes: 'A Twosome Place cafe chain' }),
  s('kr-paris-baguette-wifi', 'Paris Baguette WiFi', 'パリバゲットWiFi', '巴黎贝甜WiFi', '파리바게뜨 WiFi', 'KR', ['ParisBaguette_WiFi', 'PB_Free_WiFi'], 'agree_only', { notes: 'Paris Baguette bakery chain' }),
  s('kr-olive-young-wifi', 'Olive Young WiFi', 'オリーブヤングWiFi', 'Olive Young WiFi', '올리브영 WiFi', 'KR', ['OliveYoung_WiFi'], 'agree_only', { notes: 'Olive Young stores' }),
);

// ══════════════════════════════════════════════
// TAIWAN: Expand (5)
// ══════════════════════════════════════════════
newSpots.push(
  s('tw-kaohsiung-wifi', 'Kaohsiung WiFi', '高雄WiFi', '高雄免费WiFi', '가오슝 WiFi', 'TW', ['Kaohsiung Free WiFi', 'KHH_WiFi'], 'agree_only', { notes: 'Kaohsiung city WiFi' }),
  s('tw-tainan-wifi', 'Tainan WiFi', '台南WiFi', '台南免费WiFi', '타이난 WiFi', 'TW', ['Tainan Free WiFi'], 'agree_only', { notes: 'Tainan city WiFi' }),
  s('tw-taichung-wifi', 'Taichung WiFi', '台中WiFi', '台中免费WiFi', '타이중 WiFi', 'TW', ['Taichung Free WiFi', 'TC_WiFi'], 'agree_only', { notes: 'Taichung city WiFi' }),
  s('tw-hsinchu-wifi', 'Hsinchu WiFi', '新竹WiFi', '新竹免费WiFi', '신주 WiFi', 'TW', ['Hsinchu Free WiFi'], 'agree_only', { notes: 'Hsinchu city WiFi' }),
  s('tw-louisa-wifi', 'Louisa Coffee WiFi', 'ルイサコーヒーWiFi', '路易莎咖啡WiFi', '루이사커피 WiFi', 'TW', ['Louisa_WiFi', 'LouisaCoffee_Free'], 'agree_only', { notes: 'Louisa Coffee chain (Taiwan)' }),
);

// ══════════════════════════════════════════════
// EUROPE: Strengthen weak countries (15)
// ══════════════════════════════════════════════
newSpots.push(
  // Scandinavia
  s('se-stockholm-wifi', 'Stockholm WiFi', 'ストックホルムWiFi', '斯德哥尔摩WiFi', '스톡홀름 WiFi', 'SE', ['Stockholm_Free_WiFi', 'SL_WiFi'], 'agree_only', { notes: 'Stockholm city/transit WiFi' }),
  s('dk-copenhagen-wifi', 'Copenhagen WiFi', 'コペンハーゲンWiFi', '哥本哈根WiFi', '코펜하겐 WiFi', 'DK', ['Copenhagen_Free_WiFi', 'CPH_WiFi'], 'agree_only', { notes: 'Copenhagen city WiFi' }),
  s('fi-helsinki-wifi', 'Helsinki WiFi', 'ヘルシンキWiFi', '赫尔辛基WiFi', '헬싱키 WiFi', 'FI', ['Helsinki_City_Open', 'HEL_WiFi'], 'agree_only', { notes: 'Helsinki city WiFi' }),
  s('no-oslo-wifi', 'Oslo WiFi', 'オスロWiFi', '奥斯陆WiFi', '오슬로 WiFi', 'NO', ['Oslo_Free_WiFi', 'Oslo_Bynet'], 'agree_only', { notes: 'Oslo city WiFi' }),
  // Eastern Europe
  s('pl-krakow-wifi', 'Krakow WiFi', 'クラクフWiFi', '克拉科夫WiFi', '크라쿠프 WiFi', 'PL', ['Krakow_Free_WiFi', 'KRK_WiFi'], 'agree_only', { notes: 'Krakow city WiFi' }),
  s('hu-budapest-wifi', 'Budapest WiFi', 'ブダペストWiFi', '布达佩斯WiFi', '부다페스트 WiFi', 'HU', ['Budapest_Free_WiFi', 'BKK_WiFi'], 'agree_only', { notes: 'Budapest city/transit WiFi' }),
  s('cz-prague-wifi', 'Prague WiFi', 'プラハWiFi', '布拉格WiFi', '프라하 WiFi', 'CZ', ['Prague_Free_WiFi', 'Praha_WiFi'], 'agree_only', { notes: 'Prague city WiFi' }),
  s('gr-athens-wifi', 'Athens WiFi', 'アテネWiFi', '雅典WiFi', '아테네 WiFi', 'GR', ['Athens_Free_WiFi', 'Athens_WiFi'], 'agree_only', { notes: 'Athens city WiFi' }),
  s('hr-zagreb-wifi', 'Zagreb WiFi', 'ザグレブWiFi', '萨格勒布WiFi', '자그레브 WiFi', 'HR', ['Zagreb_Free_WiFi'], 'agree_only', { notes: 'Zagreb city WiFi' }),
  s('tr-istanbul-wifi', 'Istanbul WiFi', 'イスタンブールWiFi', '伊斯坦布尔WiFi', '이스탄불 WiFi', 'TR', ['Istanbul_Free_WiFi', 'IBB_WiFi', 'ibbWifi'], 'agree_only', { notes: 'Istanbul city WiFi' }),
  // Additional airports
  s('se-arn-wifi', 'Stockholm Arlanda WiFi', 'アーランダ空港WiFi', '阿兰达机场WiFi', '알란다 공항 WiFi', 'SE', ['Arlanda Free WiFi', 'ARN_WiFi'], 'agree_only', { airportCode: 'ARN', notes: 'Stockholm Arlanda Airport' }),
  s('dk-cph-wifi', 'Copenhagen Airport WiFi', 'コペンハーゲン空港WiFi', '哥本哈根机场WiFi', '코펜하겐 공항 WiFi', 'DK', ['CPH Airport WiFi', 'CPH_Free'], 'agree_only', { airportCode: 'CPH', notes: 'Copenhagen Kastrup Airport' }),
  s('fi-hel-wifi', 'Helsinki Airport WiFi', 'ヘルシンキ空港WiFi', '赫尔辛基机场WiFi', '헬싱키 공항 WiFi', 'FI', ['Helsinki Airport WiFi', 'HEL_Airport_Free'], 'agree_only', { airportCode: 'HEL', notes: 'Helsinki-Vantaa Airport' }),
  s('no-osl-wifi', 'Oslo Airport WiFi', 'オスロ空港WiFi', '奥斯陆机场WiFi', '오슬로 공항 WiFi', 'NO', ['OSL Free WiFi', 'Avinor_WiFi'], 'agree_only', { airportCode: 'OSL', notes: 'Oslo Gardermoen Airport' }),
  s('be-bru-wifi', 'Brussels Airport WiFi', 'ブリュッセル空港WiFi', '布鲁塞尔机场WiFi', '브뤼셀 공항 WiFi', 'BE', ['BRU Free WiFi', 'Brussels_Airport_WiFi'], 'agree_only', { airportCode: 'BRU', notes: 'Brussels Zaventem Airport' }),
);

newGeo.push(
  geo('se-arn-wifi', 59.6519, 17.9186, 2000),
  geo('dk-cph-wifi', 55.6180, 12.6561, 2000),
  geo('fi-hel-wifi', 60.3172, 24.9633, 2000),
  geo('no-osl-wifi', 60.1939, 11.1004, 2000),
  geo('be-bru-wifi', 50.9014, 4.4844, 2000),
);

// ══════════════════════════════════════════════
// CHINA: More cities (5)
// ══════════════════════════════════════════════
newSpots.push(
  s('cn-chengdu-wifi', 'Chengdu WiFi', '成都WiFi', '成都免费WiFi', '청두 WiFi', 'CN', ['i-Chengdu', 'Chengdu_Free_WiFi'], 'registration', { notes: 'Chengdu city WiFi' }),
  s('cn-xian-wifi', "Xi'an WiFi", '西安WiFi', '西安免费WiFi', '시안 WiFi', 'CN', ['i-XiAn', 'XiAn_Free_WiFi'], 'registration', { notes: "Xi'an city WiFi" }),
  s('cn-hangzhou-wifi', 'Hangzhou WiFi', '杭州WiFi', '杭州免费WiFi', '항저우 WiFi', 'CN', ['i-Hangzhou', 'Hangzhou_Free_WiFi'], 'registration', { notes: 'Hangzhou city WiFi' }),
  s('cn-nanjing-wifi', 'Nanjing WiFi', '南京WiFi', '南京免费WiFi', '난징 WiFi', 'CN', ['i-Nanjing', 'Nanjing_Free_WiFi'], 'registration', { notes: 'Nanjing city WiFi' }),
  s('cn-wuhan-wifi', 'Wuhan WiFi', '武漢WiFi', '武汉免费WiFi', '우한 WiFi', 'CN', ['i-Wuhan', 'Wuhan_Free_WiFi'], 'registration', { notes: 'Wuhan city WiFi' }),
);

// ══════════════════════════════════════════════
// INDIA: More cities/airports (5)
// ══════════════════════════════════════════════
newSpots.push(
  s('in-blr-wifi', 'Bangalore Airport WiFi', 'バンガロール空港WiFi', '班加罗尔机场WiFi', '방갈로르 공항 WiFi', 'IN', ['BLR Airport WiFi', 'BLR_Free_WiFi'], 'agree_only', { airportCode: 'BLR', notes: 'Kempegowda Airport Bangalore' }),
  s('in-ccu-wifi', 'Kolkata Airport WiFi', 'コルカタ空港WiFi', '加尔各答机场WiFi', '콜카타 공항 WiFi', 'IN', ['CCU Airport WiFi', 'CCU_Free'], 'agree_only', { airportCode: 'CCU', notes: 'Netaji Subhas Kolkata Airport' }),
  s('in-jaipur-wifi', 'Jaipur City WiFi', 'ジャイプールWiFi', '斋浦尔WiFi', '자이푸르 WiFi', 'IN', ['Jaipur Free WiFi', 'Jaipur_Smart_City'], 'agree_only', { notes: 'Jaipur city WiFi' }),
  s('in-goa-wifi', 'Goa WiFi', 'ゴアWiFi', '果阿WiFi', '고아 WiFi', 'IN', ['Goa Free WiFi', 'GOI_WiFi'], 'agree_only', { notes: 'Goa tourist area WiFi' }),
  s('in-varanasi-wifi', 'Varanasi WiFi', 'バラナシWiFi', '瓦拉纳西WiFi', '바라나시 WiFi', 'IN', ['Varanasi Free WiFi', 'VNS_WiFi'], 'agree_only', { notes: 'Varanasi city WiFi' }),
);

newGeo.push(
  geo('in-blr-wifi', 13.1986, 77.7066, 2000),
  geo('in-ccu-wifi', 22.6544, 88.4467, 2000),
);

// ══════════════════════════════════════════════
// SE ASIA: More depth (10)
// ══════════════════════════════════════════════
newSpots.push(
  s('th-chiangrai-wifi', 'Chiang Rai WiFi', 'チェンライWiFi', '清莱WiFi', '치앙라이 WiFi', 'TH', ['ChiangRai Free WiFi', 'CR_WiFi'], 'agree_only', { notes: 'Chiang Rai city WiFi' }),
  s('th-krabi-wifi', 'Krabi WiFi', 'クラビWiFi', '甲米WiFi', '끄라비 WiFi', 'TH', ['Krabi Free WiFi', 'Krabi_WiFi'], 'agree_only', { notes: 'Krabi tourist area WiFi' }),
  s('vn-nhatrang-wifi', 'Nha Trang WiFi', 'ニャチャンWiFi', '芽庄WiFi', '나트랑 WiFi', 'VN', ['NhaTrang Free WiFi', 'NhaTrang_WiFi'], 'agree_only', { notes: 'Nha Trang city WiFi' }),
  s('vn-dalat-wifi', 'Da Lat WiFi', 'ダラットWiFi', '大叻WiFi', '달랏 WiFi', 'VN', ['DaLat Free WiFi'], 'agree_only', { notes: 'Da Lat city WiFi' }),
  s('id-yogya-wifi', 'Yogyakarta WiFi', 'ジョグジャカルタWiFi', '日惹WiFi', '족자카르타 WiFi', 'ID', ['Jogja Free WiFi', 'Jogja_WiFi'], 'agree_only', { notes: 'Yogyakarta city WiFi' }),
  s('ph-boracay-wifi', 'Boracay WiFi', 'ボラカイWiFi', '长滩岛WiFi', '보라카이 WiFi', 'PH', ['Boracay Free WiFi', 'Boracay_WiFi'], 'agree_only', { notes: 'Boracay island WiFi' }),
  s('my-langkawi-wifi', 'Langkawi WiFi', 'ランカウイWiFi', '兰卡威WiFi', '랑카위 WiFi', 'MY', ['Langkawi Free WiFi', 'LGK_WiFi'], 'agree_only', { notes: 'Langkawi island WiFi' }),
  s('kh-siem-reap-wifi', 'Siem Reap WiFi', 'シェムリアップWiFi', '暹粒WiFi', '씨엠립 WiFi', 'KH', ['SiemReap Free WiFi', 'REP_WiFi'], 'agree_only', { notes: 'Siem Reap (Angkor Wat area) WiFi' }),
  s('la-vientiane-wifi', 'Vientiane WiFi', 'ビエンチャンWiFi', '万象WiFi', '비엔티안 WiFi', 'LA', ['Vientiane Free WiFi', 'VTE_WiFi'], 'agree_only', { notes: 'Vientiane city WiFi' }),
  s('mm-yangon-wifi', 'Yangon WiFi', 'ヤンゴンWiFi', '仰光WiFi', '양곤 WiFi', 'MM', ['Yangon Free WiFi', 'YGN_WiFi'], 'agree_only', { notes: 'Yangon city WiFi' }),
);

// ══════════════════════════════════════════════
// AMERICAS: More depth (10)
// ══════════════════════════════════════════════
newSpots.push(
  s('us-mia-metro-wifi', 'Miami Metrorail WiFi', 'マイアミメトロWiFi', '迈阿密地铁WiFi', '마이애미 메트로 WiFi', 'US', ['MiamiDade_Free_WiFi', 'MDT_WiFi'], 'agree_only', { notes: 'Miami-Dade transit WiFi' }),
  s('us-portland-wifi', 'Portland WiFi', 'ポートランドWiFi', '波特兰WiFi', '포틀랜드 WiFi', 'US', ['Portland Free WiFi', 'PDX_City_WiFi'], 'agree_only', { notes: 'Portland city WiFi' }),
  s('us-austin-wifi', 'Austin WiFi', 'オースティンWiFi', '奥斯汀WiFi', '오스틴 WiFi', 'US', ['Austin Free WiFi', 'ATX_WiFi'], 'agree_only', { notes: 'Austin city WiFi' }),
  s('us-denver-wifi', 'Denver WiFi', 'デンバーWiFi', '丹佛WiFi', '덴버 WiFi', 'US', ['Denver_Free_WiFi', 'Mile_High_WiFi'], 'agree_only', { notes: 'Denver city WiFi' }),
  s('ca-vancouver-wifi', 'Vancouver WiFi', 'バンクーバーWiFi', '温哥华WiFi', '밴쿠버 WiFi', 'CA', ['#VanWiFi', 'Vancouver_Free_WiFi'], 'agree_only', { notes: 'Vancouver city WiFi' }),
  s('ca-montreal-wifi', 'Montreal WiFi', 'モントリオールWiFi', '蒙特利尔WiFi', '몬트리올 WiFi', 'CA', ['MTL WiFi', 'Montreal_Free_WiFi'], 'agree_only', { notes: 'Montreal city WiFi' }),
  s('mx-cancun-wifi', 'Cancun WiFi', 'カンクンWiFi', '坎昆WiFi', '칸쿤 WiFi', 'MX', ['Cancun Free WiFi', 'CUN_WiFi'], 'agree_only', { notes: 'Cancun tourist area WiFi' }),
  s('br-saopaulo-metro-wifi', 'SP Metro WiFi', 'サンパウロメトロWiFi', '圣保罗地铁WiFi', '상파울루 메트로 WiFi', 'BR', ['SP_Free_WiFi', 'Metro_SP_WiFi'], 'agree_only', { notes: 'São Paulo metro WiFi' }),
  s('cl-santiago-wifi', 'Santiago WiFi', 'サンティアゴWiFi', '圣地亚哥WiFi', '산티아고 WiFi', 'CL', ['Santiago WiFi', 'SCL_WiFi'], 'agree_only', { notes: 'Santiago city WiFi' }),
  s('ar-mendoza-wifi', 'Mendoza WiFi', 'メンドーサWiFi', '门多萨WiFi', '멘도사 WiFi', 'AR', ['Mendoza Free WiFi', 'MDZ_WiFi'], 'agree_only', { notes: 'Mendoza city WiFi' }),
);

// ══════════════════════════════════════════════
// AFRICA & MIDDLE EAST: Strengthen (10)
// ══════════════════════════════════════════════
newSpots.push(
  s('eg-cairo-wifi', 'Cairo WiFi', 'カイロWiFi', '开罗WiFi', '카이로 WiFi', 'EG', ['Cairo Free WiFi', 'CAI_WiFi'], 'agree_only', { notes: 'Cairo city WiFi' }),
  s('ma-marrakech-wifi', 'Marrakech WiFi', 'マラケシュWiFi', '马拉喀什WiFi', '마라케시 WiFi', 'MA', ['Marrakech Free WiFi', 'RAK_WiFi'], 'agree_only', { notes: 'Marrakech city WiFi' }),
  s('ke-nairobi-wifi', 'Nairobi WiFi', 'ナイロビWiFi', '内罗毕WiFi', '나이로비 WiFi', 'KE', ['Nairobi Free WiFi', 'NBO_WiFi'], 'agree_only', { notes: 'Nairobi city WiFi' }),
  s('za-durban-wifi', 'Durban WiFi', 'ダーバンWiFi', '德班WiFi', '더반 WiFi', 'ZA', ['Durban Free WiFi', 'DUR_City_WiFi'], 'agree_only', { notes: 'Durban city WiFi' }),
  s('ae-abudhabi-wifi', 'Abu Dhabi WiFi', 'アブダビWiFi', '阿布扎比WiFi', '아부다비 WiFi', 'AE', ['AbuDhabi Free WiFi', 'AUH_City_WiFi'], 'agree_only', { notes: 'Abu Dhabi city WiFi' }),
  s('il-telaviv-wifi', 'Tel Aviv WiFi', 'テルアビブWiFi', '特拉维夫WiFi', '텔아비브 WiFi', 'IL', ['FREE_TLV', 'TelAviv_WiFi'], 'agree_only', { notes: 'Tel Aviv city WiFi' }),
  s('sa-riyadh-wifi', 'Riyadh WiFi', 'リヤドWiFi', '利雅得WiFi', '리야드 WiFi', 'SA', ['Riyadh Free WiFi', 'RUH_WiFi'], 'agree_only', { notes: 'Riyadh city WiFi' }),
  s('ng-lagos-wifi', 'Lagos WiFi', 'ラゴスWiFi', '拉各斯WiFi', '라고스 WiFi', 'NG', ['Lagos Free WiFi', 'LOS_WiFi'], 'agree_only', { notes: 'Lagos city WiFi' }),
  s('tz-zanzibar-wifi', 'Zanzibar WiFi', 'ザンジバルWiFi', '桑给巴尔WiFi', '잔지바르 WiFi', 'TZ', ['Zanzibar Free WiFi', 'ZNZ_WiFi'], 'agree_only', { notes: 'Zanzibar island WiFi' }),
  s('jo-amman-wifi', 'Amman WiFi', 'アンマンWiFi', '安曼WiFi', '암만 WiFi', 'JO', ['Amman Free WiFi', 'AMM_WiFi'], 'agree_only', { notes: 'Amman city WiFi' }),
);

// ══════════════════════════════════════════════
// Apply
// ══════════════════════════════════════════════
const spotsToAdd = newSpots.filter(sp => {
  if (existingIds.has(sp.spotId)) {
    console.log(`Skipping duplicate: ${sp.spotId}`);
    return false;
  }
  return true;
});

const geoExistingIds = new Set(geoData.regions.map(r => r.spotId));
const geosToAdd = newGeo.filter(g => {
  if (geoExistingIds.has(g.spotId)) {
    console.log(`Skipping geo duplicate: ${g.spotId}`);
    return false;
  }
  return true;
});

data.patterns.push(...spotsToAdd);
data.version += 1;
data.updatedAt = '2026-03-10';

geoData.regions.push(...geosToAdd);
geoData.version += 1;
geoData.updatedAt = '2026-03-10';

fs.writeFileSync(patternsPath, JSON.stringify(data, null, 2) + '\n');
fs.writeFileSync(geofencePath, JSON.stringify(geoData, null, 2) + '\n');

console.log(`\nAdded ${spotsToAdd.length} spots`);
console.log(`Total patterns: ${data.patterns.length}`);
console.log(`Added ${geosToAdd.length} geofences (total: ${geoData.regions.length})`);
