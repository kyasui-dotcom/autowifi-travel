// add-to-500-final5.js — Final 5 spots to reach exactly 500
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));
const existingIds = new Set(data.patterns.map(p => p.spotId));
console.log(`Current: ${data.patterns.length} spots`);
console.log(`Need: ${500 - data.patterns.length} more`);

function agreeOnly() {
  return {
    agreeOnly: {
      actions: [
        { description: 'Check terms checkbox if present', selector: "input[type='checkbox']", fallbackSelectors: ['#agree', '.terms-checkbox'], action: 'check', optional: true, delayMs: 300 },
        { description: 'Click connect button', selector: "button[type='submit'], .btn-connect", fallbackSelectors: ['button:last-of-type', 'a.btn', '.btn-primary', "input[type='submit']", '.connect-btn'], action: 'click', delayMs: 500 },
      ],
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function spot(id, name, ja, zh, ko, country, ssids, notes) {
  return {
    spotId: id, name, nameJa: ja, nameZh: zh, nameKo: ko,
    country, ssids, portalType: 'agree_only', tier: 'free',
    ...agreeOnly(),
    patternVersion: 1, lastVerified: '2026-03-10', notes: notes || '',
  };
}

const newSpots = [
  spot('jp-roppongi-wifi', 'Roppongi WiFi', '六本木Wi-Fi', '六本木WiFi', '롯폰기 WiFi', 'JP',
    ['ROPPONGI_Free_Wi-Fi', 'Roppongi_WiFi'], 'Roppongi district WiFi'),
  spot('jp-ikebukuro-wifi', 'Ikebukuro WiFi', '池袋Wi-Fi', '池袋WiFi', '이케부쿠로 WiFi', 'JP',
    ['IKEBUKURO_Free_Wi-Fi', 'Ikebukuro_WiFi'], 'Ikebukuro district WiFi'),
  spot('jp-ueno-wifi', 'Ueno WiFi', '上野Wi-Fi', '上野WiFi', '우에노 WiFi', 'JP',
    ['UENO_Free_Wi-Fi', 'Ueno_WiFi'], 'Ueno district WiFi'),
  spot('jp-odaiba-wifi', 'Odaiba WiFi', 'お台場Wi-Fi', '台场WiFi', '오다이바 WiFi', 'JP',
    ['ODAIBA_Free_Wi-Fi', 'Odaiba_WiFi'], 'Odaiba area WiFi'),
  spot('jp-shimokitazawa-wifi', 'Shimokitazawa WiFi', '下北沢Wi-Fi', '下北�的WiFi', '시모키타자와 WiFi', 'JP',
    ['SHIMOKITAZAWA_Wi-Fi', 'Shimokita_WiFi'], 'Shimokitazawa district WiFi'),
  // Extra in case any are dupes
  spot('jp-akihabara-udx-wifi', 'Akihabara UDX WiFi', '秋葉原UDX Wi-Fi', '秋叶原UDX WiFi', '아키하바라 UDX WiFi', 'JP',
    ['UDX_Free_Wi-Fi', 'AkibaUDX_WiFi'], 'Akihabara UDX building WiFi'),
  spot('jp-harajuku-wifi', 'Harajuku WiFi', '原宿Wi-Fi', '原宿WiFi', '하라주쿠 WiFi', 'JP',
    ['HARAJUKU_Free_Wi-Fi', 'Harajuku_WiFi'], 'Harajuku district WiFi'),
  spot('jp-nakano-wifi', 'Nakano WiFi', '中野Wi-Fi', '中野WiFi', '나카노 WiFi', 'JP',
    ['NAKANO_Free_Wi-Fi', 'Nakano_WiFi'], 'Nakano district WiFi'),
];

const spotsToAdd = newSpots.filter(s => {
  if (existingIds.has(s.spotId)) {
    console.log(`Skipping duplicate: ${s.spotId}`);
    return false;
  }
  return true;
});

// Only add what we need
const needed = 500 - data.patterns.length;
const finalSpots = spotsToAdd.slice(0, needed);

data.patterns.push(...finalSpots);
data.version += 1;
data.updatedAt = '2026-03-10';

fs.writeFileSync(patternsPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Added ${finalSpots.length} spots`);
console.log(`🎉 Total patterns: ${data.patterns.length}`);
