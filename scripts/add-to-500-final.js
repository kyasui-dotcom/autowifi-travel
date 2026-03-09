// add-to-500-final.js — Add final 30 spots to reach 500 total
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const geofencePath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'geofence-data.json');

const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));
const geoData = JSON.parse(fs.readFileSync(geofencePath, 'utf-8'));

const existingIds = new Set(data.patterns.map(p => p.spotId));

function agreeOnly(opts = {}) {
  const actions = [];
  if (opts.preCheck !== false) {
    actions.push({
      description: 'Check terms checkbox if present',
      selector: "input[type='checkbox']",
      fallbackSelectors: ['#agree', '.terms-checkbox', '.tos-agree'],
      action: 'check',
      optional: true,
      delayMs: 300,
    });
  }
  actions.push({
    description: 'Click connect button',
    selector: "button[type='submit'], .btn-connect",
    fallbackSelectors: ['button:last-of-type', 'a.btn', '.btn-primary', "input[type='submit']", '.connect-btn'],
    action: 'click',
    delayMs: 500,
  });
  return {
    agreeOnly: {
      actions,
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function reg() {
  return {
    registration: {
      fields: [{
        fieldId: 'email',
        selector: "input[name='email'], input[type='email']",
        fallbackSelectors: ["input[type='text']:first-of-type", '#email', '.email-input'],
        valueSource: 'profile.email',
        inputMethod: 'set_value',
        delayMs: 500,
      }],
      postFillActions: [
        {
          description: 'Accept terms',
          selector: "input[type='checkbox'], .terms-agree",
          fallbackSelectors: ['#agree', '.checkbox', '.tos'],
          action: 'check',
          delayMs: 300,
        },
        {
          description: 'Submit',
          selector: "button[type='submit'], .connect-btn",
          fallbackSelectors: ['button:last-of-type', '.btn-primary', "input[type='submit']"],
          action: 'click',
          delayMs: 500,
        },
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
    patternVersion: 1, lastVerified: '2026-03-10', notes: opts.notes || '',
  };
}

function geo(spotId, lat, lng, radius) {
  return { spotId, latitude: lat, longitude: lng, radius, identifier: `geofence_${spotId}` };
}

const newSpots = [];
const newGeo = [];

// ── Japan: Additional chain/venue spots ──
newSpots.push(
  spot('jp-mos-burger-wifi', 'MOS Burger WiFi', 'モスバーガーWi-Fi', '摩斯汉堡WiFi', '모스버거 WiFi', 'JP',
    ['MOS_BURGER_Free_Wi-Fi', 'MOS_Free_Wi-Fi'], 'agree_only', { notes: 'MOS Burger chain WiFi' }),
  spot('jp-freshness-burger-wifi', 'Freshness Burger WiFi', 'フレッシュネスバーガーWi-Fi', 'Freshness Burger WiFi', '프레시니스버거 WiFi', 'JP',
    ['FRESHNESS_BURGER_Wi-Fi'], 'agree_only', { notes: 'Freshness Burger chain' }),
  spot('jp-coco-ichibanya-wifi', 'CoCo Ichibanya WiFi', 'CoCo壱番屋Wi-Fi', 'CoCo壱番屋WiFi', '코코이찌방야 WiFi', 'JP',
    ['CoCo_ICHIBANYA_Wi-Fi'], 'agree_only', { notes: 'Curry chain WiFi' }),
  spot('jp-tsutaya-wifi', 'TSUTAYA WiFi', 'TSUTAYA Wi-Fi', 'TSUTAYA WiFi', '츠타야 WiFi', 'JP',
    ['TSUTAYA_Wi-Fi', 'TSUTAYA_Free_Wi-Fi'], 'agree_only', { notes: 'TSUTAYA bookstore/media chain' }),
  spot('jp-animate-wifi', 'Animate WiFi', 'アニメイトWi-Fi', 'Animate WiFi', '아니메이트 WiFi', 'JP',
    ['animate_Wi-Fi', 'animate_free_wifi'], 'agree_only', { notes: 'Animate anime chain stores' }),
  spot('jp-tokyu-hands-wifi', 'Tokyu Hands WiFi', '東急ハンズWi-Fi', '东急Hands WiFi', '도큐핸즈 WiFi', 'JP',
    ['HANDS_Wi-Fi', 'TokyuHands_Wi-Fi'], 'agree_only', { notes: 'Tokyu Hands/Hands department stores' }),
  spot('jp-mega-donki-wifi', 'MEGA Don Quijote WiFi', 'MEGAドンキWi-Fi', 'MEGA唐吉诃德WiFi', '메가돈키 WiFi', 'JP',
    ['MEGA_DONKI_Free_Wi-Fi', 'donki_free_wifi'], 'agree_only', { notes: 'MEGA Don Quijote stores' }),
  spot('jp-round1-wifi', 'Round1 WiFi', 'ラウンドワンWi-Fi', 'Round1 WiFi', '라운드원 WiFi', 'JP',
    ['ROUND1_Free_Wi-Fi', 'round1_wifi'], 'agree_only', { notes: 'Round1 entertainment complex' }),
);

// ── Japan: Additional city/area WiFi ──
newSpots.push(
  spot('jp-kamakura-wifi', 'Kamakura Free WiFi', '鎌倉フリーWi-Fi', '�的仓免费WiFi', '가마쿠라 무료 WiFi', 'JP',
    ['KAMAKURA_Free_Wi-Fi'], 'agree_only', { notes: 'Kamakura city WiFi' }),
  spot('jp-nikko-wifi', 'Nikko Free WiFi', '日光フリーWi-Fi', '日光免费WiFi', '닛코 무료 WiFi', 'JP',
    ['NIKKO_Free_Wi-Fi', 'Nikko_City_WiFi'], 'agree_only', { notes: 'Nikko city WiFi' }),
  spot('jp-takayama-wifi', 'Takayama Free WiFi', '高山フリーWi-Fi', '高山免费WiFi', '다카야마 무료 WiFi', 'JP',
    ['TAKAYAMA_Free_Wi-Fi', 'Takayama_City_WiFi'], 'agree_only', { notes: 'Takayama city WiFi' }),
  spot('jp-kanazawa-wifi', 'Kanazawa Free WiFi', '金沢フリーWi-Fi', '金泽免费WiFi', '가나자와 무료 WiFi', 'JP',
    ['KANAZAWA_Free_Wi-Fi', 'Kanazawa_WiFi'], 'agree_only', { notes: 'Kanazawa city WiFi' }),
);

// ── Global: Additional airports ──
newSpots.push(
  spot('ru-svo-wifi', 'Sheremetyevo Airport WiFi', 'シェレメーチエヴォ空港WiFi', '谢列梅捷沃机场WiFi', '셰레메티예보 공항 WiFi', 'RU',
    ['SVO Free WiFi', 'SVO_WiFi'], 'registration', { airportCode: 'SVO', notes: 'Moscow Sheremetyevo' }),
  spot('pl-waw-wifi', 'Warsaw Chopin Airport WiFi', 'ワルシャワ空港WiFi', '华沙肖邦机场WiFi', '바르샤바 공항 WiFi', 'PL',
    ['FreeWiFi@WAW', 'WAW Free WiFi'], 'agree_only', { airportCode: 'WAW', notes: 'Warsaw Chopin Airport' }),
  spot('cz-prg-wifi', 'Prague Airport WiFi', 'プラハ空港WiFi', '布拉格机场WiFi', '프라하 공항 WiFi', 'CZ',
    ['PRG Free WiFi', 'Airport-Prague-WiFi'], 'agree_only', { airportCode: 'PRG', notes: 'Václav Havel Prague Airport' }),
  spot('ie-dub-wifi', 'Dublin Airport WiFi', 'ダブリン空港WiFi', '都柏林机场WiFi', '더블린 공항 WiFi', 'IE',
    ['daa Free WiFi', 'DUB-WiFi'], 'agree_only', { airportCode: 'DUB', notes: 'Dublin Airport' }),
  spot('za-dur-wifi', 'King Shaka Airport WiFi', 'キング・シャカ空港WiFi', '沙卡国王机场WiFi', '킹샤카 공항 WiFi', 'ZA',
    ['ACSA Free WiFi'], 'agree_only', { airportCode: 'DUR', notes: 'Durban King Shaka Airport' }),
  spot('pe-lim-wifi', 'Lima Airport WiFi', 'リマ空港WiFi', '利马机场WiFi', '리마 공항 WiFi', 'PE',
    ['LAP Free WiFi', 'Lima Airport WiFi'], 'agree_only', { airportCode: 'LIM', notes: 'Jorge Chávez International Airport' }),
  spot('co-bog-wifi', 'Bogotá Airport WiFi', 'ボゴタ空港WiFi', '波哥大机场WiFi', '보고타 공항 WiFi', 'CO',
    ['ElDorado Free WiFi', 'BOG WiFi'], 'agree_only', { airportCode: 'BOG', notes: 'El Dorado International Airport' }),
);

// Add geofences for airports
newGeo.push(
  geo('ru-svo-wifi', 55.9726, 37.4146, 2000),
  geo('pl-waw-wifi', 52.1657, 20.9671, 2000),
  geo('cz-prg-wifi', 50.1008, 14.2600, 2000),
  geo('ie-dub-wifi', 53.4264, -6.2499, 2000),
  geo('za-dur-wifi', -29.6144, 31.1197, 2000),
  geo('pe-lim-wifi', -12.0219, -77.1143, 2000),
  geo('co-bog-wifi', 4.7016, -74.1469, 2000),
);

// ── Global: City/Public WiFi ──
newSpots.push(
  spot('za-capetown-wifi', 'Cape Town Free WiFi', 'ケープタウンWiFi', '开普敦免费WiFi', '케이프타운 무료 WiFi', 'ZA',
    ['City of Cape Town WiFi', 'CPT_Free_WiFi'], 'agree_only', { notes: 'Cape Town municipal WiFi' }),
  spot('br-rio-wifi', 'Rio WiFi Livre', 'リオWiFi Livre', '里约免费WiFi', '리우 무료 WiFi', 'BR',
    ['WiFi Livre Rio', 'Rio_Free_WiFi'], 'agree_only', { notes: 'Rio de Janeiro public WiFi' }),
  spot('mx-cdmx-wifi', 'CDMX WiFi Gratis', 'メキシコシティ無料WiFi', '墨西哥城免费WiFi', '멕시코시티 무료 WiFi', 'MX',
    ['Red WiFi CDMX', 'CDMX_WiFi_Gratis'], 'registration', { notes: 'Mexico City free WiFi' }),
  spot('in-mumbai-wifi', 'Mumbai WiFi', 'ムンバイWiFi', '孟买WiFi', '뭄바이 WiFi', 'IN',
    ['Mumbai Free WiFi', 'BMC_WiFi'], 'registration', { notes: 'Mumbai city WiFi' }),
  spot('au-melbourne-wifi', 'Melbourne Free WiFi', 'メルボルンWiFi', '墨尔本免费WiFi', '멜버른 무료 WiFi', 'AU',
    ['VicFreeWiFi', 'Melbourne Free WiFi'], 'agree_only', { notes: 'Melbourne city WiFi' }),
);

// ── Southeast Asia: Additional spots ──
newSpots.push(
  spot('th-phuket-wifi', 'Phuket Free WiFi', 'プーケットWiFi', '普吉岛免费WiFi', '푸켓 무료 WiFi', 'TH',
    ['Phuket Free WiFi', 'Phuket_Smart_City'], 'agree_only', { notes: 'Phuket island WiFi' }),
  spot('vn-danang-wifi', 'Da Nang WiFi', 'ダナンWiFi', '岘港免费WiFi', '다낭 무료 WiFi', 'VN',
    ['DaNang Free WiFi', 'DaNang_WiFi'], 'agree_only', { notes: 'Da Nang city WiFi' }),
  spot('ph-cebu-wifi', 'Cebu Free WiFi', 'セブWiFi', '宿务免费WiFi', '세부 무료 WiFi', 'PH',
    ['Cebu Free WiFi', 'Cebu_City_WiFi'], 'agree_only', { notes: 'Cebu city WiFi' }),
  spot('my-penang-wifi', 'Penang Free WiFi', 'ペナンWiFi', '槟城免费WiFi', '페낭 무료 WiFi', 'MY',
    ['Penang Free WiFi', 'penangfree'], 'agree_only', { notes: 'Penang island WiFi' }),
);

// Filter out any duplicates
const spotsToAdd = newSpots.filter(s => {
  if (existingIds.has(s.spotId)) {
    console.log(`Skipping duplicate: ${s.spotId}`);
    return false;
  }
  return true;
});

const geoExistingIds = new Set(geoData.regions.map(r => r.spotId));
const geosToAdd = newGeo.filter(g => {
  if (geoExistingIds.has(g.spotId)) {
    console.log(`Skipping duplicate geofence: ${g.spotId}`);
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

console.log(`Added ${spotsToAdd.length} spots`);
console.log(`Total patterns: ${data.patterns.length}`);
console.log(`Added ${geosToAdd.length} geofences (total: ${geoData.regions.length})`);
