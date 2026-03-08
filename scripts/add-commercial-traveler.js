// Add commercial/traveler WiFi spots + fix existing entries
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));

// ===== Step 1: Remove discontinued services =====
const removeIds = ['jp-7eleven-wifi', 'jp-familymart-wifi'];
data.patterns = data.patterns.filter(p => !removeIds.includes(p.spotId));
console.log(`Removed ${removeIds.length} discontinued spots (7-Eleven, FamilyMart)`);

// ===== Step 2: Fix existing entries =====
const fixes = {
  'jp-starbucks-wifi': {
    portalType: 'agree_only',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  'jp-tullys-wifi': {
    portalType: 'agree_only',
    ssids: ['tullys_Wi-Fi'],
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  'jp-doutor-wifi': {
    portalType: 'agree_only',
    ssids: ['DOUTOR_FREE_Wi-Fi'],
    nameJa: 'ドトールコーヒー Free WiFi',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  'jp-aeon-wifi': {
    ssids: ['AEON_MALL', 'AEON_SC', 'AEON', 'AEON_Free_Wi-Fi', 'AEON_MALL_Free_Wi-Fi'],
  },
};

for (const [spotId, fix] of Object.entries(fixes)) {
  const idx = data.patterns.findIndex(p => p.spotId === spotId);
  if (idx !== -1) {
    Object.assign(data.patterns[idx], fix);
    console.log(`Fixed: ${spotId}`);
  }
}

// ===== Step 3: Add new spots =====
const newSpots = [
  // --- Shopping / Commercial (Japan-wide chains) ---
  {
    spotId: 'jp-donki-wifi',
    name: 'Don Quijote Free WiFi',
    nameJa: 'ドン・キホーテ Free WiFi',
    nameZh: '唐吉诃德免费WiFi',
    nameKo: '돈키호테 무료 WiFi',
    country: 'JP',
    ssids: ['DONKI_Free_Wi-Fi'],
    portalType: 'agree_only',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Available at all Don Quijote stores nationwide. No time limit.',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  {
    spotId: 'jp-mitsui-wifi',
    name: 'Mitsui Shopping Park Free WiFi',
    nameJa: '三井ショッピングパーク Free WiFi',
    nameZh: '三井购物公园免费WiFi',
    nameKo: '미츠이 쇼핑파크 무료 WiFi',
    country: 'JP',
    ssids: ['MSP_Free_Wi-Fi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'LaLaport, Mitsui Outlet Park, etc. 120 min session. Email or SNS login.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },
  {
    spotId: 'jp-premium-outlets-wifi',
    name: 'Premium Outlets Free WiFi',
    nameJa: 'プレミアム・アウトレット Free WiFi',
    nameZh: '奥特莱斯免费WiFi',
    nameKo: '프리미엄 아울렛 무료 WiFi',
    country: 'JP',
    ssids: ['PO_Free_Wi-Fi', 'PO Wi-Fi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Gotemba, Rinku, Sano, Tosu, Kobe-Sanda, etc. 1h session. Email or social login.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },
  {
    spotId: 'jp-lumine-wifi',
    name: 'LUMINE Free WiFi',
    nameJa: 'ルミネ Free WiFi',
    nameZh: 'LUMINE免费WiFi',
    nameKo: '루미네 무료 WiFi',
    country: 'JP',
    ssids: ['LUMINE_Free_Wi-Fi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Available at select LUMINE stores. 60 min session.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },

  // --- Traveler WiFi Services ---
  {
    spotId: 'jp-free-wifi-passport',
    name: 'FREE Wi-Fi PASSPORT',
    nameJa: 'FREE Wi-Fi PASSPORT (SoftBank)',
    nameZh: 'FREE Wi-Fi PASSPORT (旅客用)',
    nameKo: 'FREE Wi-Fi PASSPORT (여행자용)',
    country: 'JP',
    ssids: ['.FREE_Wi-Fi_PASSPORT'],
    portalType: 'agree_only',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'SoftBank traveler WiFi. Available at airports, stations, tourist spots. Agree to terms only.',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  {
    spotId: 'jp-freespot',
    name: 'FREESPOT',
    nameJa: 'FREESPOT',
    nameZh: 'FREESPOT',
    nameKo: 'FREESPOT',
    country: 'JP',
    ssids: ['FREESPOT', 'freespot'],
    portalType: 'agree_only',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Community free WiFi at hotels, cafes, public facilities across Japan.',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  {
    spotId: 'jp-wi2-free',
    name: 'Wi2 Free WiFi',
    nameJa: 'Wi2 フリーWiFi',
    nameZh: 'Wi2免费WiFi',
    nameKo: 'Wi2 무료 WiFi',
    country: 'JP',
    ssids: ['Wi2_free', 'wifi_square'],
    portalType: 'agree_only',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Wire and Wireless free tier. Available at cafes, stations, tourist spots.',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },

  // --- Transit (additional railways) ---
  {
    spotId: 'jp-jr-central-wifi',
    name: 'JR Central FREE Wi-Fi',
    nameJa: 'JR東海 Free WiFi',
    nameZh: 'JR东海免费WiFi',
    nameKo: 'JR도카이 무료 WiFi',
    country: 'JP',
    ssids: ['JR-Central_FREE', 'JR-Central_FREE_Wi-Fi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Nagoya Station, major Tokaido stations. Email registration.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },
  {
    spotId: 'jp-tobu-wifi',
    name: 'Tobu Railway Free WiFi',
    nameJa: '東武鉄道 Free WiFi',
    nameZh: '东武铁路免费WiFi',
    nameKo: '도부 철도 무료 WiFi',
    country: 'JP',
    ssids: ['TOBU_Free_Wi-Fi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Tobu Skytree Line, Asakusa, Nikko area stations.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },
  {
    spotId: 'jp-tokyu-wifi',
    name: 'Tokyu Free WiFi',
    nameJa: '東急 Free WiFi',
    nameZh: '东急免费WiFi',
    nameKo: '도큐 무료 WiFi',
    country: 'JP',
    ssids: ['tokyu_free_wifi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Tokyu Line stations: Shibuya, Futako-Tamagawa, etc.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },
  {
    spotId: 'jp-keio-wifi',
    name: 'Keio Free WiFi',
    nameJa: '京王 Free WiFi',
    nameZh: '京王免费WiFi',
    nameKo: '게이오 무료 WiFi',
    country: 'JP',
    ssids: ['keio_free_wifi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Keio Line: Shinjuku, Chofu, Hashimoto, Takaosanguchi.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },
  {
    spotId: 'jp-odakyu-wifi',
    name: 'Odakyu Free WiFi',
    nameJa: '小田急 Free WiFi',
    nameZh: '小田急免费WiFi',
    nameKo: '오다큐 무료 WiFi',
    country: 'JP',
    ssids: ['odakyu_Free_Wi-Fi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Odakyu Line: Shinjuku, Machida, Hakone area.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },

  // --- City WiFi (additional cities) ---
  {
    spotId: 'jp-nara-wifi',
    name: 'Nara Free WiFi',
    nameJa: '奈良 Free WiFi',
    nameZh: '奈良免费WiFi',
    nameKo: '나라 무료 WiFi',
    country: 'JP',
    ssids: ['NARA_Free_Wi-Fi'],
    portalType: 'agree_only',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Nara Park, Todaiji area, Nara Station.',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  {
    spotId: 'jp-hiroshima-city-wifi',
    name: 'Hiroshima FREE Wi-Fi',
    nameJa: '広島 Free WiFi',
    nameZh: '广岛免费WiFi',
    nameKo: '히로시마 무료 WiFi',
    country: 'JP',
    ssids: ['HIROSHIMA_FREE_Wi-Fi'],
    portalType: 'agree_only',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Hiroshima Peace Park, Hiroshima Station area, Miyajima.',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  {
    spotId: 'jp-kanazawa-wifi',
    name: 'Kanazawa Free WiFi',
    nameJa: '金沢 Free WiFi',
    nameZh: '金泽免费WiFi',
    nameKo: '가나자와 무료 WiFi',
    country: 'JP',
    ssids: ['KANAZAWA_FREE_Wi-Fi'],
    portalType: 'agree_only',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Kanazawa Station, Kenrokuen, Higashi Chaya district.',
    patternData: { agreeOnly: { agreeButtonSelector: 'input[type="submit"], button[type="submit"], .btn-primary, a.btn' } },
  },
  {
    spotId: 'jp-sendai-city-wifi',
    name: 'Sendai Free WiFi',
    nameJa: '仙台 Free WiFi',
    nameZh: '仙台免费WiFi',
    nameKo: '센다이 무료 WiFi',
    country: 'JP',
    ssids: ['SENDAI_free_Wi-Fi'],
    portalType: 'registration',
    tier: 'free',
    patternVersion: 1,
    lastVerified: '2026-03-08',
    notes: 'Sendai Station, Aoba-dori, Zuihoden area.',
    patternData: { registration: { emailSelector: 'input[type="email"], input[name*="mail"]', submitSelector: 'input[type="submit"], button[type="submit"]' } },
  },
];

// Add new spots (skip duplicates)
let added = 0;
for (const spot of newSpots) {
  if (!data.patterns.find(p => p.spotId === spot.spotId)) {
    data.patterns.push(spot);
    added++;
  } else {
    console.log(`Skip (already exists): ${spot.spotId}`);
  }
}
console.log(`Added ${added} new spots`);

// Update version
data.version = 8;
data.updatedAt = '2026-03-08';

// Write back
fs.writeFileSync(patternsPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Total patterns: ${data.patterns.length}`);
console.log(`Version: ${data.version}`);
