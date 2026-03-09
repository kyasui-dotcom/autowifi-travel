#!/usr/bin/env node
// test-spot-automation.js — Test automation script generation for all WiFi spots
// Run: node scripts/test-spot-automation.js
// No dependencies required — uses only Node.js built-ins

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));

// ======== Inline reimplementation of portal-automator (TypeScript → JS) ========

function escapeJs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/</g, '\\x3c')
    .replace(/>/g, '\\x3e');
}

function resolveValue(field, profile, credentials, generatedPassword) {
  switch (field.valueSource) {
    case 'profile.firstName': return profile.firstName;
    case 'profile.lastName': return profile.lastName;
    case 'profile.fullName': return `${profile.firstName} ${profile.lastName}`;
    case 'profile.fullNameReversed': return `${profile.lastName} ${profile.firstName}`;
    case 'profile.email': return profile.email;
    case 'credentials.password': return (credentials && credentials.password) || generatedPassword || '';
    case 'credentials.username': return (credentials && credentials.username) || profile.email;
    case 'static': return field.staticValue || '';
    default: return '';
  }
}

function generateFieldCode(field, value) {
  const fallbacks = JSON.stringify(field.fallbackSelectors || []);
  const escaped = escapeJs(value);

  let fillCode;
  switch (field.inputMethod) {
    case 'set_value':
      fillCode = `setInputValue(el, '${escaped}');`;
      break;
    case 'check':
      fillCode = `if (!el.checked) el.click();`;
      break;
    case 'select':
      fillCode = `el.value = '${escaped}'; el.dispatchEvent(new Event('change', {bubbles:true}));`;
      break;
    case 'click':
      fillCode = `el.click();`;
      break;
    default:
      fillCode = `setInputValue(el, '${escaped}');`;
  }

  return `
    await delay(${field.delayMs || 200});
    {
      const el = findEl('${escapeJs(field.selector)}', ${fallbacks});
      if (el) {
        ${fillCode}
        report('field_filled', '${field.fieldId}');
      } else {
        report('field_not_found', '${field.fieldId}');
      }
    }
  `;
}

function generateActionCode(action) {
  const fallbacks = JSON.stringify(action.fallbackSelectors || []);
  const desc = escapeJs(action.description);

  let waitCode = '';
  if (action.waitForSelector) {
    waitCode = `
      await new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(), ${action.waitTimeoutMs || 5000});
        const check = () => {
          if (document.querySelector('${escapeJs(action.waitForSelector)}')) {
            clearTimeout(timeout);
            resolve();
          } else {
            setTimeout(check, 200);
          }
        };
        check();
      });
    `;
  }

  let actionCode;
  switch (action.action) {
    case 'click': actionCode = 'el.click();'; break;
    case 'check': actionCode = 'if (!el.checked) el.click();'; break;
    case 'scroll_to': actionCode = "el.scrollIntoView({behavior:'smooth'});"; break;
    case 'wait': actionCode = '// wait only'; break;
    default: actionCode = 'el.click();';
  }

  return `
    await delay(${action.delayMs || 300});
    ${waitCode}
    {
      const el = findEl('${escapeJs(action.selector)}', ${fallbacks});
      if (el) {
        ${actionCode}
        report('action_done', '${desc}');
      } else {
        report('action_not_found', '${desc}');
      }
    }
  `;
}

function generateAutomationScript(pattern, profile, savedCredentials) {
  const isReturning = !!savedCredentials;
  let generatedPassword;

  if (!isReturning && pattern.portalType === 'registration') {
    generatedPassword = 'TestPass123!'; // Deterministic for testing
  }

  const scriptParts = [];

  scriptParts.push(`
    (function() {
      function findEl(selector, fallbacks) {
        let el = document.querySelector(selector);
        if (el) return el;
        if (fallbacks) {
          for (const fb of fallbacks) {
            el = document.querySelector(fb);
            if (el) return el;
          }
        }
        return null;
      }

      function setInputValue(el, value) {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        );
        if (setter && setter.set) {
          setter.set.call(el, value);
        } else {
          el.value = value;
        }
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }

      function report(status, detail) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'automation_status', status: status, detail: detail })
        );
      }

      function delay(ms) {
        return new Promise(r => setTimeout(r, ms));
      }

      async function runAutomation() {
        try {
          report('started', 'Beginning automation');
  `);

  if (pattern.preActions) {
    for (const action of pattern.preActions) {
      scriptParts.push(generateActionCode(action));
    }
  }

  if (pattern.portalType === 'agree_only' && pattern.agreeOnly) {
    for (const action of pattern.agreeOnly.actions) {
      scriptParts.push(generateActionCode(action));
    }
  }

  const flow = isReturning ? pattern.login : pattern.registration;

  if (flow && pattern.portalType !== 'agree_only') {
    for (const field of flow.fields) {
      const value = resolveValue(field, profile, savedCredentials, generatedPassword);
      scriptParts.push(generateFieldCode(field, value));
    }
    for (const action of flow.postFillActions) {
      scriptParts.push(generateActionCode(action));
    }
  }

  if (pattern.customScript) {
    scriptParts.push(pattern.customScript);
  }

  scriptParts.push(`
          report('completed', 'Automation finished');
        } catch (err) {
          report('error', err.message || 'Unknown error');
        }
      }

      var _automationTimer = setTimeout(function() {
        report('error', 'Automation timed out after 30s');
      }, 30000);

      setTimeout(function() {
        runAutomation().finally(function() {
          clearTimeout(_automationTimer);
        });
      }, 1500);
      true;
    })();
  `);

  return { script: scriptParts.join('\n'), generatedPassword };
}

// ======== Test Helpers ========

const mockProfile = {
  firstName: 'Taro',
  lastName: 'Tanaka',
  email: 'taro.tanaka@example.com',
};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
  } catch (e) {
    failedTests++;
    failures.push({ name, error: e.message });
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${e.message}`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

// ======== TEST SUITE 1: Script Generation for All Spots ========

console.log('\n══════════════════════════════════════════════');
console.log('  TEST SUITE 1: Script Generation (All Spots)');
console.log('══════════════════════════════════════════════\n');

for (const pattern of data.patterns) {
  test(`${pattern.spotId}: generates valid script`, () => {
    const result = generateAutomationScript(pattern, mockProfile);

    // Must return an object with script string
    assert(result && typeof result.script === 'string', 'Result must have script string');
    assert(result.script.length > 100, 'Script must not be empty/trivial');

    // Must be an IIFE
    assert(result.script.includes('(function()'), 'Script must be an IIFE');
    assert(result.script.includes('runAutomation'), 'Script must contain runAutomation');

    // Must include standard helpers
    assert(result.script.includes('findEl'), 'Script must include findEl helper');
    assert(result.script.includes('report'), 'Script must include report helper');
    assert(result.script.includes('delay'), 'Script must include delay helper');

    // Must report started and completed
    assert(result.script.includes("report('started'"), 'Script must report started');
    assert(result.script.includes("report('completed'"), 'Script must report completed');

    // Must include timeout guard
    assert(result.script.includes('30000'), 'Script must have 30s timeout guard');
  });

  test(`${pattern.spotId}: script is valid JavaScript`, () => {
    const result = generateAutomationScript(pattern, mockProfile);

    // Try to parse as JavaScript (syntax check only)
    try {
      new vm.Script(result.script, { filename: `${pattern.spotId}.js` });
    } catch (e) {
      throw new Error(`Invalid JS syntax: ${e.message}`);
    }
  });

  // Test that registration spots generate password
  if (pattern.portalType === 'registration') {
    test(`${pattern.spotId}: registration generates password`, () => {
      const result = generateAutomationScript(pattern, mockProfile);
      assert(result.generatedPassword, 'Registration must generate password');
    });
  }

  // Test that agree_only spots have actions in script
  if (pattern.portalType === 'agree_only' && pattern.agreeOnly) {
    test(`${pattern.spotId}: agree_only includes action code`, () => {
      const result = generateAutomationScript(pattern, mockProfile);
      assert(
        result.script.includes('action_done') || result.script.includes('action_not_found'),
        'Agree-only script must attempt actions'
      );
    });
  }

  // Test that registration spots include field filling
  if (pattern.portalType === 'registration' && pattern.registration) {
    test(`${pattern.spotId}: registration includes field filling`, () => {
      const result = generateAutomationScript(pattern, mockProfile);
      assert(
        result.script.includes('field_filled') || result.script.includes('field_not_found'),
        'Registration script must attempt field filling'
      );
    });
  }
}

// ======== TEST SUITE 2: Mock DOM Automation ========

console.log('\n══════════════════════════════════════════════');
console.log('  TEST SUITE 2: Mock DOM Automation');
console.log('══════════════════════════════════════════════\n');

// Create a minimal DOM environment for testing
function createMockDom(html) {
  // We can't use jsdom in a zero-dependency setup, so we test the
  // generated script structure and selector logic instead
  return html;
}

// Test CSS selector patterns are syntactically valid
function isValidSelector(selector) {
  // Basic regex check for common CSS selectors
  // Real validation would need a CSS parser, but this catches obvious issues
  if (!selector || typeof selector !== 'string') return false;
  if (selector.trim() === '') return false;
  // Check for balanced quotes and brackets
  const openBrackets = (selector.match(/\[/g) || []).length;
  const closeBrackets = (selector.match(/\]/g) || []).length;
  if (openBrackets !== closeBrackets) return false;
  const openParens = (selector.match(/\(/g) || []).length;
  const closeParens = (selector.match(/\)/g) || []).length;
  if (openParens !== closeParens) return false;
  return true;
}

test('CSS selector validator works', () => {
  assert(isValidSelector("input[type='checkbox']"), 'Valid selector');
  assert(isValidSelector('button.primary'), 'Valid class selector');
  assert(isValidSelector('#submit'), 'Valid ID selector');
  assert(!isValidSelector(''), 'Empty selector invalid');
  assert(!isValidSelector(null), 'Null selector invalid');
});

for (const pattern of data.patterns) {
  // Test all selectors in the pattern are valid
  const selectors = [];

  if (pattern.agreeOnly && pattern.agreeOnly.actions) {
    for (const action of pattern.agreeOnly.actions) {
      selectors.push({ context: `agreeOnly action "${action.description}"`, selector: action.selector });
      if (action.fallbackSelectors) {
        action.fallbackSelectors.forEach((s, i) => {
          selectors.push({ context: `agreeOnly fallback[${i}]`, selector: s });
        });
      }
    }
  }

  if (pattern.registration) {
    if (pattern.registration.fields) {
      for (const field of pattern.registration.fields) {
        selectors.push({ context: `registration field "${field.fieldId}"`, selector: field.selector });
        if (field.fallbackSelectors) {
          field.fallbackSelectors.forEach((s, i) => {
            selectors.push({ context: `field fallback[${i}]`, selector: s });
          });
        }
      }
    }
    if (pattern.registration.postFillActions) {
      for (const action of pattern.registration.postFillActions) {
        selectors.push({ context: `postFill action "${action.description}"`, selector: action.selector });
        if (action.fallbackSelectors) {
          action.fallbackSelectors.forEach((s, i) => {
            selectors.push({ context: `postFill fallback[${i}]`, selector: s });
          });
        }
      }
    }
  }

  if (selectors.length > 0) {
    test(`${pattern.spotId}: all CSS selectors are valid`, () => {
      for (const { context, selector } of selectors) {
        assert(isValidSelector(selector), `Invalid selector in ${context}: "${selector}"`);
      }
    });
  }
}

// ======== TEST SUITE 3: Portal Type Consistency ========

console.log('\n══════════════════════════════════════════════');
console.log('  TEST SUITE 3: Portal Type Consistency');
console.log('══════════════════════════════════════════════\n');

for (const pattern of data.patterns) {
  test(`${pattern.spotId}: portal type matches data structure`, () => {
    if (pattern.portalType === 'agree_only') {
      assert(
        pattern.agreeOnly || (pattern.patternData && pattern.patternData.agreeOnly),
        'agree_only portal must have agreeOnly data'
      );
    }
    if (pattern.portalType === 'registration') {
      assert(
        pattern.registration || (pattern.patternData && pattern.patternData.registration),
        'registration portal must have registration data'
      );
    }
  });

  test(`${pattern.spotId}: has valid success condition`, () => {
    const flow = pattern.agreeOnly || pattern.registration;
    if (flow && flow.successCondition) {
      const validMethods = ['url_change', 'url_contains', 'element_appears', 'element_disappears', 'http_probe'];
      assert(
        validMethods.includes(flow.successCondition.method),
        `Invalid success method: ${flow.successCondition.method}`
      );
      assert(
        flow.successCondition.value && flow.successCondition.value.length > 0,
        'Success condition must have value'
      );
    }
  });
}

// ======== TEST SUITE 4: Returning User (Login) Flow ========

console.log('\n══════════════════════════════════════════════');
console.log('  TEST SUITE 4: Returning User Flow');
console.log('══════════════════════════════════════════════\n');

const mockCredentials = {
  spotId: 'test-spot',
  username: 'taro.tanaka@example.com',
  password: 'SavedPass456!',
  registeredAt: '2026-03-01T00:00:00Z',
  lastUsedAt: '2026-03-08T00:00:00Z',
};

for (const pattern of data.patterns) {
  if (pattern.portalType === 'registration') {
    test(`${pattern.spotId}: returning user script is valid JS`, () => {
      const creds = { ...mockCredentials, spotId: pattern.spotId };
      const result = generateAutomationScript(pattern, mockProfile, creds);

      assert(result && typeof result.script === 'string', 'Must generate script');

      // Should NOT generate new password for returning user
      assert(!result.generatedPassword, 'Returning user should not generate new password');

      // Parse check
      try {
        new vm.Script(result.script, { filename: `${pattern.spotId}-returning.js` });
      } catch (e) {
        throw new Error(`Invalid JS syntax for returning user: ${e.message}`);
      }
    });
  }
}

// ======== TEST SUITE 5: Value Resolution ========

console.log('\n══════════════════════════════════════════════');
console.log('  TEST SUITE 5: Value Resolution');
console.log('══════════════════════════════════════════════\n');

test('resolveValue: profile.firstName', () => {
  const v = resolveValue({ valueSource: 'profile.firstName' }, mockProfile);
  assert(v === 'Taro', `Expected "Taro", got "${v}"`);
});

test('resolveValue: profile.lastName', () => {
  const v = resolveValue({ valueSource: 'profile.lastName' }, mockProfile);
  assert(v === 'Tanaka', `Expected "Tanaka", got "${v}"`);
});

test('resolveValue: profile.fullName', () => {
  const v = resolveValue({ valueSource: 'profile.fullName' }, mockProfile);
  assert(v === 'Taro Tanaka', `Expected "Taro Tanaka", got "${v}"`);
});

test('resolveValue: profile.fullNameReversed', () => {
  const v = resolveValue({ valueSource: 'profile.fullNameReversed' }, mockProfile);
  assert(v === 'Tanaka Taro', `Expected "Tanaka Taro", got "${v}"`);
});

test('resolveValue: profile.email', () => {
  const v = resolveValue({ valueSource: 'profile.email' }, mockProfile);
  assert(v === 'taro.tanaka@example.com', `Expected email, got "${v}"`);
});

test('resolveValue: credentials.password with saved', () => {
  const v = resolveValue(
    { valueSource: 'credentials.password' },
    mockProfile,
    mockCredentials
  );
  assert(v === 'SavedPass456!', `Expected saved password, got "${v}"`);
});

test('resolveValue: credentials.password with generated fallback', () => {
  const v = resolveValue(
    { valueSource: 'credentials.password' },
    mockProfile,
    null,
    'GenPass789!'
  );
  assert(v === 'GenPass789!', `Expected generated password, got "${v}"`);
});

test('resolveValue: credentials.username fallback to email', () => {
  const v = resolveValue(
    { valueSource: 'credentials.username' },
    mockProfile,
    null
  );
  assert(v === 'taro.tanaka@example.com', `Expected email fallback, got "${v}"`);
});

test('resolveValue: static value', () => {
  const v = resolveValue({ valueSource: 'static', staticValue: 'tourist' }, mockProfile);
  assert(v === 'tourist', `Expected "tourist", got "${v}"`);
});

test('resolveValue: unknown source returns empty', () => {
  const v = resolveValue({ valueSource: 'unknown_source' }, mockProfile);
  assert(v === '', `Expected empty string, got "${v}"`);
});

// ======== TEST SUITE 6: escapeJs ========

console.log('\n══════════════════════════════════════════════');
console.log('  TEST SUITE 6: JavaScript Escaping');
console.log('══════════════════════════════════════════════\n');

test('escapeJs: single quotes', () => {
  assert(escapeJs("it's") === "it\\'s", 'Single quotes not escaped');
});

test('escapeJs: double quotes', () => {
  assert(escapeJs('say "hi"') === 'say \\"hi\\"', 'Double quotes not escaped');
});

test('escapeJs: backticks', () => {
  assert(escapeJs('`code`') === '\\`code\\`', 'Backticks not escaped');
});

test('escapeJs: HTML tags', () => {
  const result = escapeJs('<script>');
  assert(!result.includes('<'), 'HTML < not escaped');
  assert(!result.includes('>'), 'HTML > not escaped');
});

test('escapeJs: dollar signs', () => {
  assert(escapeJs('$var') === '\\$var', 'Dollar sign not escaped');
});

test('escapeJs: newlines', () => {
  assert(!escapeJs('line1\nline2').includes('\n'), 'Newline not escaped');
});

// ======== Summary ========

console.log('\n══════════════════════════════════════════════');
console.log('  TEST RESULTS');
console.log('══════════════════════════════════════════════');
console.log(`  Total:  ${totalTests}`);
console.log(`  Passed: ${passedTests} ✅`);
console.log(`  Failed: ${failedTests} ❌`);
console.log('══════════════════════════════════════════════');

if (failures.length > 0) {
  console.log('\nFailed tests:');
  for (const f of failures) {
    console.log(`  ❌ ${f.name}`);
    console.log(`     ${f.error}`);
  }
  console.log('');
  console.log('🔴 TESTS FAILED');
  process.exit(1);
} else {
  console.log('\n🟢 ALL TESTS PASSED');
  process.exit(0);
}
