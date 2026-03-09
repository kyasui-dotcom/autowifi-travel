// Fix legacy spots that have patternData in old format (missing agreeOnly/registration at top level)
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));

let fixed = 0;

for (const p of data.patterns) {
  // Fix agree_only spots that have patternData but not agreeOnly at top level
  if (p.portalType === 'agree_only' && !p.agreeOnly) {
    if (p.patternData && p.patternData.agreeOnly) {
      // Has patternData.agreeOnly — promote to top level
      p.agreeOnly = {
        actions: [{
          description: 'Click connect button',
          selector: p.patternData.agreeOnly.agreeButtonSelector || "button[type='submit'], .btn-connect",
          fallbackSelectors: ['button:last-of-type', 'a.btn', '.btn-primary', "input[type='submit']"],
          action: 'click',
          delayMs: 500,
        }],
        successCondition: {
          method: 'http_probe',
          value: 'http://connectivitycheck.gstatic.com/generate_204',
        },
      };
      fixed++;
      console.log(`Fixed agree_only: ${p.spotId}`);
    }
  }

  // Fix registration spots that have patternData but not registration at top level
  if (p.portalType === 'registration' && !p.registration) {
    if (p.patternData && p.patternData.registration) {
      p.registration = {
        fields: [{
          fieldId: 'email',
          selector: p.patternData.registration.emailSelector || "input[name='email'], input[type='email']",
          fallbackSelectors: ["input[type='text']:first-of-type"],
          valueSource: 'profile.email',
          inputMethod: 'set_value',
          delayMs: 500,
        }],
        postFillActions: [
          {
            description: 'Accept terms',
            selector: "input[type='checkbox'], .terms-agree",
            fallbackSelectors: ['#agree', '.checkbox'],
            action: 'check',
            delayMs: 300,
          },
          {
            description: 'Submit',
            selector: p.patternData.registration.submitSelector || "button[type='submit'], .connect-btn",
            fallbackSelectors: ['button:last-of-type', '.btn-primary', "input[type='submit']"],
            action: 'click',
            delayMs: 500,
          },
        ],
        successCondition: {
          method: 'http_probe',
          value: 'http://connectivitycheck.gstatic.com/generate_204',
        },
      };
      fixed++;
      console.log(`Fixed registration: ${p.spotId}`);
    }
  }
}

console.log(`\nFixed ${fixed} legacy patterns`);

fs.writeFileSync(patternsPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Total patterns: ${data.patterns.length}`);
