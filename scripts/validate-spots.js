// validate-spots.js — Validate patterns-v1.json and geofence-data.json integrity
// Run: node scripts/validate-spots.js

const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const geofencePath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'geofence-data.json');

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ❌ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠️  WARN: ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

// ===== 1. Parse JSON =====
console.log('\n=== 1. JSON Parse Test ===');

let data, geoData;
try {
  data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));
  ok(`patterns-v1.json parsed successfully`);
} catch (e) {
  error(`patterns-v1.json parse failed: ${e.message}`);
  process.exit(1);
}

try {
  geoData = JSON.parse(fs.readFileSync(geofencePath, 'utf-8'));
  ok(`geofence-data.json parsed successfully`);
} catch (e) {
  error(`geofence-data.json parse failed: ${e.message}`);
  process.exit(1);
}

// ===== 2. Top-level structure =====
console.log('\n=== 2. Top-level Structure ===');

if (typeof data.version !== 'number') error('patterns: version is not a number');
else ok(`patterns version: ${data.version}`);

if (!data.updatedAt) error('patterns: missing updatedAt');
else ok(`patterns updatedAt: ${data.updatedAt}`);

if (!Array.isArray(data.patterns)) error('patterns: patterns is not an array');
else ok(`patterns count: ${data.patterns.length}`);

if (typeof geoData.version !== 'number') error('geofence: version is not a number');
else ok(`geofence version: ${geoData.version}`);

if (!Array.isArray(geoData.regions)) error('geofence: regions is not an array');
else ok(`geofence regions count: ${geoData.regions.length}`);

// ===== 3. Spot ID uniqueness =====
console.log('\n=== 3. Spot ID Uniqueness ===');

const spotIds = data.patterns.map(p => p.spotId);
const dupes = spotIds.filter((id, idx) => spotIds.indexOf(id) !== idx);
if (dupes.length > 0) {
  error(`Duplicate spotIds: ${[...new Set(dupes)].join(', ')}`);
} else {
  ok(`All ${spotIds.length} spotIds are unique`);
}

// ===== 4. Required fields =====
console.log('\n=== 4. Required Fields ===');

const requiredFields = ['spotId', 'name', 'nameJa', 'country', 'ssids', 'portalType', 'tier'];
const validPortalTypes = ['agree_only', 'registration', 'login', 'redirect_only'];
const validTiers = ['free', 'premium'];

let fieldErrors = 0;
for (const p of data.patterns) {
  for (const field of requiredFields) {
    if (!p[field] && p[field] !== 0) {
      error(`${p.spotId || '??'}: missing required field '${field}'`);
      fieldErrors++;
    }
  }

  // Validate portalType
  if (p.portalType && !validPortalTypes.includes(p.portalType)) {
    error(`${p.spotId}: invalid portalType '${p.portalType}'`);
  }

  // Validate tier
  if (p.tier && !validTiers.includes(p.tier)) {
    error(`${p.spotId}: invalid tier '${p.tier}'`);
  }

  // Validate ssids is array
  if (p.ssids && !Array.isArray(p.ssids)) {
    error(`${p.spotId}: ssids is not an array`);
  } else if (p.ssids && p.ssids.length === 0) {
    warn(`${p.spotId}: ssids array is empty`);
  }

  // Validate portal pattern data exists
  if (p.portalType === 'agree_only' && !p.agreeOnly) {
    warn(`${p.spotId}: portalType is agree_only but no agreeOnly data`);
  }
  if (p.portalType === 'registration' && !p.registration) {
    warn(`${p.spotId}: portalType is registration but no registration data`);
  }
}

if (fieldErrors === 0) {
  ok('All spots have required fields');
}

// ===== 5. Multi-language coverage =====
console.log('\n=== 5. Multi-language Coverage ===');

let hasJa = 0, hasZh = 0, hasKo = 0;
for (const p of data.patterns) {
  if (p.nameJa) hasJa++;
  if (p.nameZh) hasZh++;
  if (p.nameKo) hasKo++;
}

ok(`Japanese names: ${hasJa}/${data.patterns.length} (${Math.round(hasJa/data.patterns.length*100)}%)`);
ok(`Chinese names: ${hasZh}/${data.patterns.length} (${Math.round(hasZh/data.patterns.length*100)}%)`);
ok(`Korean names: ${hasKo}/${data.patterns.length} (${Math.round(hasKo/data.patterns.length*100)}%)`);

if (hasJa < data.patterns.length) warn(`${data.patterns.length - hasJa} spots missing Japanese name`);
if (hasZh < data.patterns.length) warn(`${data.patterns.length - hasZh} spots missing Chinese name`);
if (hasKo < data.patterns.length) warn(`${data.patterns.length - hasKo} spots missing Korean name`);

// ===== 6. Country code validation =====
console.log('\n=== 6. Country Code Distribution ===');

const countries = {};
for (const p of data.patterns) {
  countries[p.country] = (countries[p.country] || 0) + 1;
}

const sorted = Object.entries(countries).sort((a, b) => b[1] - a[1]);
for (const [code, count] of sorted) {
  console.log(`  ${code}: ${count}`);
}

ok(`${Object.keys(countries).length} unique countries/regions`);

// ===== 7. Geofence validation =====
console.log('\n=== 7. Geofence Validation ===');

const geoIds = geoData.regions.map(r => r.spotId);
const geoDupes = geoIds.filter((id, idx) => geoIds.indexOf(id) !== idx);
if (geoDupes.length > 0) {
  error(`Duplicate geofence spotIds: ${[...new Set(geoDupes)].join(', ')}`);
} else {
  ok(`All ${geoIds.length} geofence spotIds are unique`);
}

// All geofence entries should reference valid spots
let invalidGeo = 0;
for (const r of geoData.regions) {
  if (!spotIds.includes(r.spotId)) {
    error(`Geofence references non-existent spot: ${r.spotId}`);
    invalidGeo++;
  }

  // Validate coordinates
  if (typeof r.latitude !== 'number' || r.latitude < -90 || r.latitude > 90) {
    error(`${r.spotId}: invalid latitude ${r.latitude}`);
  }
  if (typeof r.longitude !== 'number' || r.longitude < -180 || r.longitude > 180) {
    error(`${r.spotId}: invalid longitude ${r.longitude}`);
  }
  if (typeof r.radius !== 'number' || r.radius <= 0) {
    error(`${r.spotId}: invalid radius ${r.radius}`);
  }
  if (!r.identifier || !r.identifier.startsWith('geofence_')) {
    error(`${r.spotId}: invalid identifier format '${r.identifier}'`);
  }
}
if (invalidGeo === 0) {
  ok('All geofence entries reference valid spots');
}

// Check airport spots have geofences
console.log('\n=== 8. Airport Geofence Coverage ===');

const airportSpots = data.patterns.filter(p => p.airportCode);
const geoSpotSet = new Set(geoIds);
let airportsMissing = 0;
for (const p of airportSpots) {
  if (!geoSpotSet.has(p.spotId)) {
    warn(`Airport ${p.spotId} (${p.airportCode}) has no geofence`);
    airportsMissing++;
  }
}
ok(`${airportSpots.length - airportsMissing}/${airportSpots.length} airports have geofences`);

// ===== 9. Portal pattern data validation =====
console.log('\n=== 9. Portal Pattern Data ===');

let validPatterns = 0;
for (const p of data.patterns) {
  const hasAgree = p.agreeOnly && (p.agreeOnly.actions || p.agreeOnly.agreeButtonSelector);
  const hasReg = p.registration && (p.registration.fields || p.registration.emailSelector);
  const hasPatternData = p.patternData;

  if (hasAgree || hasReg || hasPatternData) {
    validPatterns++;
  } else {
    warn(`${p.spotId}: no portal pattern data found`);
  }
}
ok(`${validPatterns}/${data.patterns.length} spots have portal pattern data`);

// ===== 10. SSID overlap check =====
console.log('\n=== 10. SSID Overlap Check ===');

const ssidMap = {};
for (const p of data.patterns) {
  if (!p.ssids) continue;
  for (const ssid of p.ssids) {
    if (!ssidMap[ssid]) ssidMap[ssid] = [];
    ssidMap[ssid].push(p.spotId);
  }
}

let overlaps = 0;
for (const [ssid, spots] of Object.entries(ssidMap)) {
  if (spots.length > 1) {
    // Same SSID in different spots is OK if different countries/contexts
    const countries = [...new Set(spots.map(id => {
      const p = data.patterns.find(pp => pp.spotId === id);
      return p ? p.country : '??';
    }))];
    if (countries.length === 1) {
      warn(`SSID "${ssid}" shared by same-country spots: ${spots.join(', ')}`);
      overlaps++;
    }
  }
}
if (overlaps === 0) {
  ok('No problematic SSID overlaps within same country');
} else {
  console.log(`  Found ${overlaps} same-country SSID overlaps (may be intentional for chain variants)`);
}

// ===== Summary =====
console.log('\n========================================');
console.log(`  TOTAL SPOTS: ${data.patterns.length}`);
console.log(`  TOTAL GEOFENCES: ${geoData.regions.length}`);
console.log(`  COUNTRIES: ${Object.keys(countries).length}`);
console.log(`  ERRORS: ${errors}`);
console.log(`  WARNINGS: ${warnings}`);
console.log('========================================');

if (errors > 0) {
  console.log('\n🔴 VALIDATION FAILED');
  process.exit(1);
} else {
  console.log('\n🟢 VALIDATION PASSED');
  process.exit(0);
}
