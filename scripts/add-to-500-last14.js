// add-to-500-last14.js — Final 14 spots to reach exactly 500
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

// ── Japan: More chains/venues ──
newSpots.push(
  spot('jp-saizeriya-wifi', 'Saizeriya WiFi', 'サイゼリヤWi-Fi', '萨莉亚WiFi', '사이제리야 WiFi', 'JP',
    ['Saizeriya_Free_Wi-Fi'], 'agree_only', { notes: 'Saizeriya Italian restaurant chain' }),
  spot('jp-yoshinoya-wifi', 'Yoshinoya WiFi', '吉野家Wi-Fi', '吉野家WiFi', '요시노야 WiFi', 'JP',
    ['YOSHINOYA_Wi-Fi', 'Yoshinoya_Free'], 'agree_only', { notes: 'Yoshinoya beef bowl chain' }),
  spot('jp-sukiya-wifi', 'Sukiya WiFi', 'すき家Wi-Fi', 'Sukiya WiFi', '스키야 WiFi', 'JP',
    ['SUKIYA_Free_Wi-Fi'], 'agree_only', { notes: 'Sukiya beef bowl chain' }),
  spot('jp-kurazushi-wifi', 'Kura Sushi WiFi', 'くら寿司Wi-Fi', '藏寿司WiFi', '쿠라스시 WiFi', 'JP',
    ['kura_sushi_Wi-Fi', 'KURA_SUSHI_FREE'], 'agree_only', { notes: 'Kura Sushi conveyor belt sushi chain' }),
);

// ── Europe: More city WiFi ──
newSpots.push(
  spot('de-munich-wifi', 'München Free WiFi', 'ミュンヘン無料WiFi', '慕尼黑免费WiFi', '뮌헨 무료 WiFi', 'DE',
    ['M-WLAN', 'muenchen.de/wifi'], 'agree_only', { notes: 'Munich city WiFi (M-WLAN)' }),
  spot('it-florence-wifi', 'Firenze WiFi', 'フィレンツェWiFi', '佛罗伦萨WiFi', '피렌체 WiFi', 'IT',
    ['Firenze WiFi', 'FirenzeWiFi'], 'agree_only', { notes: 'Florence city WiFi' }),
  spot('nl-amsterdam-wifi', 'Amsterdam Free WiFi', 'アムステルダムWiFi', '阿姆斯特丹WiFi', '암스테르담 WiFi', 'NL',
    ['Amsterdam Free WiFi', 'I amsterdam WiFi'], 'agree_only', { notes: 'Amsterdam public WiFi' }),
  spot('at-vienna-wifi', 'Wien Free WiFi', 'ウィーン無料WiFi', '维也纳免费WiFi', '빈 무료 WiFi', 'AT',
    ['wien.at Free WiFi', 'freewave'], 'agree_only', { notes: 'Vienna city WiFi' }),
);

// ── Middle East / Central Asia ──
newSpots.push(
  spot('ae-dubai-mall-wifi', 'Dubai Mall WiFi', 'ドバイモールWiFi', '迪拜购物中心WiFi', '두바이몰 WiFi', 'AE',
    ['Dubai Mall WiFi', 'DubaiMall_Free'], 'agree_only', { notes: 'Dubai Mall free WiFi' }),
  spot('qa-doha-metro-wifi', 'Doha Metro WiFi', 'ドーハメトロWiFi', '多哈地铁WiFi', '도하 메트로 WiFi', 'QA',
    ['QRail_WiFi', 'Doha_Metro_Free'], 'agree_only', { notes: 'Qatar Rail Doha Metro WiFi' }),
);

// ── Americas ──
newSpots.push(
  spot('ca-toronto-wifi', 'Toronto WiFi', 'トロントWiFi', '多伦多WiFi', '토론토 WiFi', 'CA',
    ['Toronto Free WiFi', 'TO_WiFi'], 'agree_only', { notes: 'Toronto city WiFi' }),
  spot('ar-buenosaires-wifi', 'BA WiFi', 'ブエノスアイレスWiFi', '布宜诺斯艾利斯WiFi', '부에노스아이레스 WiFi', 'AR',
    ['BA WiFi', 'BA Libre'], 'agree_only', { notes: 'Buenos Aires city WiFi' }),
);

// ── Korea ──
newSpots.push(
  spot('kr-jeju-wifi', 'Jeju Free WiFi', '済州フリーWiFi', '济州免费WiFi', '제주 무료 WiFi', 'KR',
    ['Jeju Free WiFi', 'JejuFreeWiFi'], 'agree_only', { notes: 'Jeju island public WiFi' }),
  spot('kr-busan-metro-wifi', 'Busan Metro WiFi', '釜山地下鉄WiFi', '釜山地铁WiFi', '부산 지하철 WiFi', 'KR',
    ['Busan Metro WiFi', 'BusanMetro_Free'], 'agree_only', { notes: 'Busan metro WiFi' }),
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
console.log(`Total geofences: ${geoData.regions.length}`);
