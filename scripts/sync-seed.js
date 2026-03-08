// Generate backend seed from patterns-v1.json
// Reads patterns-v1.json and outputs the SEED_PATTERNS array for route.ts
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const seedPath = path.join(__dirname, '..', 'backend', 'app', 'api', 'seed', 'route.ts');

const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));
const seedContent = fs.readFileSync(seedPath, 'utf-8');

// Generate SEED_PATTERNS entries from patterns-v1.json
const entries = data.patterns.map(p => {
  const obj = {
    spotId: p.spotId,
    name: p.name,
    nameJa: p.nameJa || null,
    nameZh: p.nameZh || null,
    nameKo: p.nameKo || null,
    airportCode: p.airportCode || null,
    country: p.country,
    ssids: p.ssids,
    portalType: p.portalType,
    tier: p.tier || 'free',
    patternData: p.patternData,
    notes: p.notes || null,
  };
  return '  ' + JSON.stringify(obj, null, 2).split('\n').join('\n  ');
}).join(',\n');

// Find and replace the SEED_PATTERNS array and version
const newSeed = seedContent
  .replace(
    /const SEED_PATTERNS = \[[\s\S]*?\n\];/,
    `const SEED_PATTERNS = [\n${entries}\n];`
  )
  .replace(
    /version: \d+/,
    `version: ${data.version}`
  );

fs.writeFileSync(seedPath, newSeed);

console.log(`Synced ${data.patterns.length} patterns to backend seed (version ${data.version})`);
