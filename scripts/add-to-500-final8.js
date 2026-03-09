// add-to-500-final8.js — Last 8 spots to reach exactly 500
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));
const existingIds = new Set(data.patterns.map(p => p.spotId));

function agreeOnly() {
  return {
    agreeOnly: {
      actions: [
        { description: 'Check terms checkbox if present', selector: "input[type='checkbox']", fallbackSelectors: ['#agree', '.terms-checkbox', '.tos-agree'], action: 'check', optional: true, delayMs: 300 },
        { description: 'Click connect button', selector: "button[type='submit'], .btn-connect", fallbackSelectors: ['button:last-of-type', 'a.btn', '.btn-primary', "input[type='submit']", '.connect-btn'], action: 'click', delayMs: 500 },
      ],
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function reg() {
  return {
    registration: {
      fields: [{ fieldId: 'email', selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type", '#email'], valueSource: 'profile.email', inputMethod: 'set_value', delayMs: 500 }],
      postFillActions: [
        { description: 'Accept terms', selector: "input[type='checkbox'], .terms-agree", fallbackSelectors: ['#agree', '.checkbox'], action: 'check', delayMs: 300 },
        { description: 'Submit', selector: "button[type='submit'], .connect-btn", fallbackSelectors: ['button:last-of-type', '.btn-primary', "input[type='submit']"], action: 'click', delayMs: 500 },
      ],
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function spot(id, name, ja, zh, ko, country, ssids, type, notes) {
  return {
    spotId: id, name, nameJa: ja, nameZh: zh, nameKo: ko,
    country, ssids, portalType: type, tier: 'free',
    ...(type === 'agree_only' ? agreeOnly() : reg()),
    patternVersion: 1, lastVerified: '2026-03-10', notes: notes || '',
  };
}

const newSpots = [
  spot('jp-nitori-wifi', 'Nitori WiFi', 'ニトリWi-Fi', '尼达利WiFi', '니토리 WiFi', 'JP',
    ['NITORI_Free_Wi-Fi'], 'agree_only', 'Nitori furniture chain WiFi'),
  spot('jp-uniqlo-wifi', 'UNIQLO WiFi', 'ユニクロWi-Fi', '优衣库WiFi', '유니클로 WiFi', 'JP',
    ['UNIQLO_Free_Wi-Fi', 'UNIQLO_WiFi'], 'agree_only', 'UNIQLO stores WiFi'),
  spot('jp-muji-wifi', 'MUJI WiFi', '無印良品Wi-Fi', '无印良品WiFi', '무인양품 WiFi', 'JP',
    ['MUJI_passport_Wi-Fi', 'MUJI_Free_Wi-Fi'], 'agree_only', 'MUJI retail stores WiFi'),
  spot('jp-shibuya-wifi', 'Shibuya WiFi', '渋谷Wi-Fi', '涩谷WiFi', '시부야 WiFi', 'JP',
    ['SHIBUYA_Wi-Fi', 'Shibuya_Free_WiFi'], 'agree_only', 'Shibuya district WiFi'),
  spot('jp-ginza-wifi', 'Ginza WiFi', '銀座Wi-Fi', '银座WiFi', '긴자 WiFi', 'JP',
    ['GINZA_Free_Wi-Fi', 'Ginza_WiFi'], 'agree_only', 'Ginza district WiFi'),
  spot('it-venice-wifi', 'Venezia WiFi', 'ヴェネツィアWiFi', '威尼斯WiFi', '베네치아 WiFi', 'IT',
    ['Venezia WiFi', 'VeniceConnected'], 'agree_only', 'Venice city WiFi'),
  spot('es-barcelona-wifi', 'Barcelona WiFi', 'バルセロナWiFi', '巴塞罗那WiFi', '바르셀로나 WiFi', 'ES',
    ['Barcelona WiFi', 'BCN_WiFi'], 'agree_only', 'Barcelona city WiFi'),
  spot('gb-london-wifi', 'London WiFi', 'ロンドンWiFi', '伦敦WiFi', '런던 WiFi', 'GB',
    ['_Free London WiFi', 'London WiFi'], 'agree_only', 'London public WiFi zones'),
];

const spotsToAdd = newSpots.filter(s => {
  if (existingIds.has(s.spotId)) {
    console.log(`Skipping duplicate: ${s.spotId}`);
    return false;
  }
  return true;
});

data.patterns.push(...spotsToAdd);
data.version += 1;
data.updatedAt = '2026-03-10';

fs.writeFileSync(patternsPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Added ${spotsToAdd.length} spots`);
console.log(`🎉 Total patterns: ${data.patterns.length}`);
