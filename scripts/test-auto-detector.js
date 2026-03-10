// test-auto-detector.js — Tests for portal-auto-detector.ts logic
// Runs as standalone Node.js, no dependencies required
const vm = require('vm');

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${msg}`);
  }
}

function section(title) {
  console.log(`\n══════════════════════════════════════════════`);
  console.log(`  ${title}`);
  console.log(`══════════════════════════════════════════════\n`);
}

// ─── Helpers: re-implement the scanner logic in Node for testing ───

function guessFieldType(type, name, id, placeholder) {
  const all = `${name} ${id} ${placeholder} ${type}`.toLowerCase();
  if (type === 'email' || /email|e-?mail|メール|邮箱/.test(all)) return 'email';
  if (type === 'password' || /password|passwd|パスワード|密码/.test(all)) return 'password';
  if (/full.?name|your.?name|氏名|姓名/.test(all)) return 'fullName';
  if (/first.?name|given.?name|名前/.test(all)) return 'firstName';
  if (/last.?name|family.?name|surname|姓/.test(all)) return 'lastName';
  if (/phone|tel|mobile|電話|手机/.test(all)) return 'phone';
  if (/room|部屋|房间/.test(all)) return 'room';
  if (type === 'text') return 'text';
  return 'unknown';
}

function guessActionPurpose(text, cls) {
  const all = `${text} ${cls}`.toLowerCase();
  if (/agree|accept|同意|同意する|수락|接受/.test(all)) return 'agree';
  if (/free|無料|免费|무료/.test(all)) return 'free_access';
  if (/connect|接続|연결|连接|login|ログイン|登录|sign.?in/.test(all)) return 'connect';
  if (/submit|送信|提出|提交|register|登録|注册/.test(all)) return 'submit';
  if (/continue|次へ|next|进入|繼續/.test(all)) return 'continue';
  return 'action';
}

function detectPortalType(fields, checkboxes, actions) {
  const hasEmail = fields.some(f => f.fieldType === 'email');
  const hasPassword = fields.some(f => f.fieldType === 'password');
  const hasTermsCheckbox = checkboxes.some(c => c.isTermsRelated);
  const hasConnectButton = actions.some(a =>
    a.purpose === 'connect' || a.purpose === 'agree' || a.purpose === 'submit' || a.purpose === 'free_access'
  );

  if (fields.length === 0 && hasConnectButton) {
    return { type: 'agree_only', confidence: hasTermsCheckbox ? 0.95 : 0.80 };
  }
  if (hasEmail && hasPassword) {
    return { type: 'registration', confidence: 0.85 };
  }
  if (hasEmail && !hasPassword) {
    return { type: 'email_only', confidence: 0.80 };
  }
  if (hasPassword && !hasEmail) {
    return { type: 'login', confidence: 0.70 };
  }
  if (fields.length > 0) {
    return { type: 'registration', confidence: 0.60 };
  }
  if (hasConnectButton) {
    return { type: 'agree_only', confidence: 0.50 };
  }
  return { type: 'unknown', confidence: 0.20 };
}

// ─── Re-implement generateAutoScript logic for testing ───

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

function generateAutoScript(scanResult, email) {
  const parts = [];
  parts.push(`(function() {
    function findEl(s, fb) { return null; }
    function setInputValue(el, v) {}
    function report(s, d) { window.ReactNativeWebView.postMessage(JSON.stringify({type:'automation_status',status:s,detail:d})); }
    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
    async function run() {
      try { report('started', 'Auto-detected portal automation');`);

  if (email) {
    const emailFields = scanResult.fields.filter(f => f.fieldType === 'email' || (f.fieldType === 'text' && f.confidence < 0.5));
    for (const field of emailFields) {
      parts.push(`await delay(500); { var el = findEl('${escapeJs(field.selector)}'); if (el) { setInputValue(el, '${escapeJs(email)}'); report('field_filled', '${escapeJs(field.fieldType)}'); } }`);
    }
  }

  const termsCheckboxes = scanResult.checkboxes.filter(c => c.isTermsRelated);
  for (const cb of termsCheckboxes) {
    parts.push(`await delay(300); { var el = findEl('${escapeJs(cb.selector)}'); if (el && !el.checked) { el.click(); report('action_done', 'Checked terms'); } }`);
  }

  const priorityOrder = ['agree', 'connect', 'free_access', 'submit', 'continue', 'action'];
  const sortedActions = [...scanResult.actions].sort((a, b) =>
    priorityOrder.indexOf(a.purpose) - priorityOrder.indexOf(b.purpose)
  );

  if (sortedActions.length > 0) {
    const best = sortedActions[0];
    parts.push(`await delay(500); { var el = findEl('${escapeJs(best.selector)}'); if (el) { el.click(); report('action_done', 'Clicked'); } }`);
  }

  parts.push(`report('completed', 'Done'); } catch(e) { report('error', e.message); } }
    setTimeout(function() { run(); }, 800); true;
  })();`);

  return parts.join('\n');
}

// ══════════════════════════════════════════════
// TEST SUITE 1: Field Type Detection
// ══════════════════════════════════════════════
section('TEST SUITE 1: Field Type Detection');

// Email detection
assert(guessFieldType('email', '', '', '') === 'email', 'type=email → email');
assert(guessFieldType('text', 'email', '', '') === 'email', 'name=email → email');
assert(guessFieldType('text', '', 'user-email', '') === 'email', 'id=user-email → email');
assert(guessFieldType('text', '', '', 'Enter your e-mail') === 'email', 'placeholder with e-mail → email');
assert(guessFieldType('text', 'メール', '', '') === 'email', 'Japanese メール → email');
assert(guessFieldType('text', '邮箱', '', '') === 'email', 'Chinese 邮箱 → email');

// Password detection
assert(guessFieldType('password', '', '', '') === 'password', 'type=password → password');
assert(guessFieldType('text', 'passwd', '', '') === 'password', 'name=passwd → password');
assert(guessFieldType('text', 'パスワード', '', '') === 'password', 'Japanese パスワード → password');

// Name detection
assert(guessFieldType('text', 'firstName', '', '') === 'firstName', 'name=firstName → firstName');
assert(guessFieldType('text', 'given_name', '', '') === 'firstName', 'name=given_name → firstName');
assert(guessFieldType('text', 'lastName', '', '') === 'lastName', 'name=lastName → lastName');
assert(guessFieldType('text', 'family_name', '', '') === 'lastName', 'name=family_name → lastName');
assert(guessFieldType('text', '', '', 'Your name') === 'fullName', 'placeholder=Your name → fullName');
assert(guessFieldType('text', '氏名', '', '') === 'fullName', 'Japanese 氏名 → fullName');

// Phone
assert(guessFieldType('tel', '', '', '') === 'phone', 'type=tel → phone');
assert(guessFieldType('text', 'phone', '', '') === 'phone', 'name=phone → phone');
assert(guessFieldType('text', '電話', '', '') === 'phone', 'Japanese 電話 → phone');

// Room
assert(guessFieldType('text', 'room', '', '') === 'room', 'name=room → room');
assert(guessFieldType('text', '部屋', '', '') === 'room', 'Japanese 部屋 → room');

// Generic text
assert(guessFieldType('text', 'something', '', '') === 'text', 'unknown text input → text');

// Unknown
assert(guessFieldType('hidden', '', '', '') === 'unknown', 'type=hidden → unknown');

console.log(`  Field detection: ${passed} passed`);

// ══════════════════════════════════════════════
// TEST SUITE 2: Action Purpose Detection
// ══════════════════════════════════════════════
section('TEST SUITE 2: Action Purpose Detection');

const p0 = passed;

// Agree
assert(guessActionPurpose('I Agree', '') === 'agree', '"I Agree" → agree');
assert(guessActionPurpose('Accept Terms', '') === 'agree', '"Accept Terms" → agree');
assert(guessActionPurpose('同意する', '') === 'agree', '同意する → agree');
assert(guessActionPurpose('수락', '') === 'agree', '수락 → agree');
assert(guessActionPurpose('接受', '') === 'agree', '接受 → agree');

// Connect
assert(guessActionPurpose('Connect', '') === 'connect', '"Connect" → connect');
assert(guessActionPurpose('Login', '') === 'connect', '"Login" → connect');
assert(guessActionPurpose('Sign In', '') === 'connect', '"Sign In" → connect');
assert(guessActionPurpose('接続', '') === 'connect', '接続 → connect');
assert(guessActionPurpose('ログイン', '') === 'connect', 'ログイン → connect');
assert(guessActionPurpose('登录', '') === 'connect', '登录 → connect');

// Submit
assert(guessActionPurpose('Submit', '') === 'submit', '"Submit" → submit');
assert(guessActionPurpose('Register', '') === 'submit', '"Register" → submit');
assert(guessActionPurpose('送信', '') === 'submit', '送信 → submit');
assert(guessActionPurpose('注册', '') === 'submit', '注册 → submit');

// Continue
assert(guessActionPurpose('Continue', '') === 'continue', '"Continue" → continue');
assert(guessActionPurpose('Next', '') === 'continue', '"Next" → continue');
assert(guessActionPurpose('次へ', '') === 'continue', '次へ → continue');

// Free access
assert(guessActionPurpose('Free WiFi', '') === 'free_access', '"Free WiFi" → free_access');
assert(guessActionPurpose('無料で接続', '') === 'free_access', '無料で接続 → free_access');

// Generic
assert(guessActionPurpose('Click here', '') === 'action', '"Click here" → action');
assert(guessActionPurpose('OK', '') === 'action', '"OK" → action');

console.log(`  Action detection: ${passed - p0} passed`);

// ══════════════════════════════════════════════
// TEST SUITE 3: Portal Type Detection
// ══════════════════════════════════════════════
section('TEST SUITE 3: Portal Type Detection');

const p1 = passed;

// Agree-only: no fields, has button
{
  const r = detectPortalType(
    [],
    [{ isTermsRelated: true }],
    [{ purpose: 'agree' }]
  );
  assert(r.type === 'agree_only', 'No fields + agree button → agree_only');
  assert(r.confidence >= 0.9, 'With terms checkbox → high confidence');
}

{
  const r = detectPortalType(
    [],
    [],
    [{ purpose: 'connect' }]
  );
  assert(r.type === 'agree_only', 'No fields + connect button → agree_only');
  assert(r.confidence >= 0.7, 'Without terms → moderate confidence');
}

// Registration: email + password
{
  const r = detectPortalType(
    [{ fieldType: 'email' }, { fieldType: 'password' }],
    [],
    [{ purpose: 'submit' }]
  );
  assert(r.type === 'registration', 'Email + password → registration');
  assert(r.confidence >= 0.8, 'registration high confidence');
}

// Email-only
{
  const r = detectPortalType(
    [{ fieldType: 'email' }],
    [],
    [{ purpose: 'submit' }]
  );
  assert(r.type === 'email_only', 'Email only → email_only');
  assert(r.confidence >= 0.7, 'email_only moderate confidence');
}

// Login: password only
{
  const r = detectPortalType(
    [{ fieldType: 'password' }],
    [],
    [{ purpose: 'connect' }]
  );
  assert(r.type === 'login', 'Password only → login');
}

// Unknown: generic fields
{
  const r = detectPortalType(
    [{ fieldType: 'text' }],
    [],
    [{ purpose: 'action' }]
  );
  assert(r.type === 'registration', 'Generic field → registration (low conf)');
  assert(r.confidence <= 0.65, 'Generic field → low confidence');
}

// Unknown: nothing detected
{
  const r = detectPortalType([], [], []);
  assert(r.type === 'unknown', 'Nothing → unknown');
  assert(r.confidence <= 0.3, 'Nothing → very low confidence');
}

console.log(`  Portal type detection: ${passed - p1} passed`);

// ══════════════════════════════════════════════
// TEST SUITE 4: Auto Script Generation
// ══════════════════════════════════════════════
section('TEST SUITE 4: Auto Script Generation');

const p2 = passed;

// Agree-only portal
{
  const scan = {
    detectedType: 'agree_only',
    fields: [],
    checkboxes: [{ selector: '#agree', isTermsRelated: true }],
    actions: [{ selector: '#connect-btn', text: 'Connect', purpose: 'connect', confidence: 0.9 }],
    confidence: 0.95
  };
  const script = generateAutoScript(scan, 'test@example.com');
  assert(typeof script === 'string', 'generates string script');
  assert(script.includes('report'), 'script has report function');
  assert(script.includes('#agree'), 'script includes checkbox selector');
  assert(script.includes('#connect-btn'), 'script includes button selector');
  assert(!script.includes('test@example.com'), 'no email in agree_only script (no email fields)');
  // Syntax check
  try { new vm.Script(script); assert(true, 'agree_only script is valid JS'); }
  catch (e) { assert(false, `agree_only script syntax error: ${e.message}`); }
}

// Registration portal
{
  const scan = {
    detectedType: 'registration',
    fields: [
      { selector: '#email', fieldType: 'email', confidence: 0.9 },
    ],
    checkboxes: [{ selector: '#terms', isTermsRelated: true }],
    actions: [{ selector: '#submit', text: 'Register', purpose: 'submit', confidence: 0.8 }],
    confidence: 0.85
  };
  const script = generateAutoScript(scan, 'user@test.com');
  assert(script.includes('user@test.com'), 'email included in registration script');
  assert(script.includes('#email'), 'email field selector included');
  assert(script.includes('#terms'), 'terms checkbox selector included');
  assert(script.includes('#submit'), 'submit button selector included');
  try { new vm.Script(script); assert(true, 'registration script is valid JS'); }
  catch (e) { assert(false, `registration script syntax error: ${e.message}`); }
}

// No email provided
{
  const scan = {
    detectedType: 'registration',
    fields: [{ selector: '#email', fieldType: 'email', confidence: 0.9 }],
    checkboxes: [],
    actions: [{ selector: '#go', text: 'Go', purpose: 'action', confidence: 0.5 }],
    confidence: 0.8
  };
  const script = generateAutoScript(scan, undefined);
  // setInputValue is in function definition but should not be CALLED with any value
  assert(!script.includes('#email'), 'no email field selector without email provided');
  try { new vm.Script(script); assert(true, 'no-email script valid JS'); }
  catch (e) { assert(false, `no-email script syntax error: ${e.message}`); }
}

// Action priority: agree > connect > submit
{
  const scan = {
    detectedType: 'agree_only',
    fields: [],
    checkboxes: [],
    actions: [
      { selector: '#submit', text: 'Submit', purpose: 'submit', confidence: 0.8 },
      { selector: '#agree', text: 'Agree', purpose: 'agree', confidence: 0.9 },
      { selector: '#connect', text: 'Connect', purpose: 'connect', confidence: 0.8 },
    ],
    confidence: 0.9
  };
  const script = generateAutoScript(scan);
  // The agree button should be the primary findEl selector (first sorted by priority)
  // In the click section, findEl is called with the best action's selector
  const clickMatch = script.match(/findEl\('([^']+)'\)/g);
  const lastFindEl = clickMatch ? clickMatch[clickMatch.length - 1] : '';
  assert(lastFindEl.includes('#agree'), 'agree button is the primary click target');
  // Other buttons appear as fallbacks or not at all
  assert(script.includes('#agree'), 'agree selector in script');
}

// Multiple email fields
{
  const scan = {
    detectedType: 'registration',
    fields: [
      { selector: '#email1', fieldType: 'email', confidence: 0.9 },
      { selector: '#email2', fieldType: 'email', confidence: 0.8 },
    ],
    checkboxes: [],
    actions: [{ selector: '#go', text: 'Submit', purpose: 'submit', confidence: 0.8 }],
    confidence: 0.8
  };
  const script = generateAutoScript(scan, 'me@test.com');
  assert(script.includes('#email1'), 'fills first email field');
  assert(script.includes('#email2'), 'fills second email field');
  try { new vm.Script(script); assert(true, 'multi-email script valid JS'); }
  catch (e) { assert(false, `multi-email script syntax error: ${e.message}`); }
}

// Edge case: special characters in selectors
{
  const scan = {
    detectedType: 'agree_only',
    fields: [],
    checkboxes: [],
    actions: [{ selector: "button.connect-btn[data-id='123']", text: "Let's Go!", purpose: 'connect', confidence: 0.8 }],
    confidence: 0.8
  };
  const script = generateAutoScript(scan);
  assert(script.includes('connect-btn'), 'handles complex selector');
  try { new vm.Script(script); assert(true, 'special-char script valid JS'); }
  catch (e) { assert(false, `special-char script syntax error: ${e.message}`); }
}

console.log(`  Auto script generation: ${passed - p2} passed`);

// ══════════════════════════════════════════════
// TEST SUITE 5: Escape Function
// ══════════════════════════════════════════════
section('TEST SUITE 5: JS Escape Safety');

const p3 = passed;

assert(escapeJs("hello") === "hello", 'normal string unchanged');
assert(escapeJs("it's") === "it\\'s", 'single quotes escaped');
assert(escapeJs('say "hi"') === 'say \\"hi\\"', 'double quotes escaped');
assert(escapeJs("a`b") === "a\\`b", 'backticks escaped');
assert(escapeJs("a$b") === "a\\$b", 'dollar signs escaped');
assert(escapeJs("<script>") === "\\x3cscript\\x3e", 'HTML tags escaped');
assert(escapeJs("line1\nline2") === "line1\\nline2", 'newlines escaped');
assert(escapeJs("a\\b") === "a\\\\b", 'backslashes escaped');

// XSS attempt: verify quotes are escaped so they can't break out of a string literal
const xss = "');alert('xss');('";
const escaped = escapeJs(xss);
assert(escaped.includes("\\'"), 'XSS quotes are escaped');
// Verify: when placed in a JS string like 'VALUE', the escaped version is safe
// Every ' in the original becomes \' in the output
const unescapedQuoteCount = (xss.match(/'/g) || []).length;
const escapedQuoteCount = (escaped.match(/\\'/g) || []).length;
assert(escapedQuoteCount === unescapedQuoteCount, 'All quotes in XSS payload are escaped');

console.log(`  JS escape: ${passed - p3} passed`);

// ══════════════════════════════════════════════
// TEST SUITE 6: Portal Scenario Simulations
// ══════════════════════════════════════════════
section('TEST SUITE 6: Real Portal Scenarios');

const p4 = passed;

// Scenario 1: Simple airport "agree and connect" page
{
  const fields = [];
  const checkboxes = [{ isTermsRelated: true }];
  const actions = [{ purpose: 'agree' }, { purpose: 'free_access' }];
  const r = detectPortalType(fields, checkboxes, actions);
  assert(r.type === 'agree_only' && r.confidence >= 0.9, 'Airport agree portal → agree_only high conf');
}

// Scenario 2: Hotel with room number + name
{
  const fields = [{ fieldType: 'room' }, { fieldType: 'lastName' }];
  const checkboxes = [];
  const actions = [{ purpose: 'connect' }];
  const r = detectPortalType(fields, checkboxes, actions);
  assert(r.type === 'registration', 'Hotel room+name → registration');
}

// Scenario 3: Cafe with email registration
{
  const fields = [{ fieldType: 'email' }];
  const checkboxes = [{ isTermsRelated: true }];
  const actions = [{ purpose: 'submit' }];
  const r = detectPortalType(fields, checkboxes, actions);
  assert(r.type === 'email_only', 'Cafe email-only → email_only');
}

// Scenario 4: Full registration with email + password
{
  const fields = [{ fieldType: 'email' }, { fieldType: 'password' }, { fieldType: 'firstName' }];
  const checkboxes = [{ isTermsRelated: true }];
  const actions = [{ purpose: 'submit' }];
  const r = detectPortalType(fields, checkboxes, actions);
  assert(r.type === 'registration' && r.confidence >= 0.8, 'Full registration → registration high conf');
}

// Scenario 5: Chinese portal with phone login
{
  const fields = [{ fieldType: 'phone' }];
  const checkboxes = [];
  const actions = [{ purpose: 'submit' }];
  const r = detectPortalType(fields, checkboxes, actions);
  assert(r.type === 'registration', 'Phone-only portal → registration (generic)');
}

// Scenario 6: Empty page (SPA loading)
{
  const r = detectPortalType([], [], []);
  assert(r.type === 'unknown' && r.confidence <= 0.3, 'Empty page → unknown low conf');
}

// Scenario 7: Redirect-only (just a button, no fields, no checkbox)
{
  const r = detectPortalType([], [], [{ purpose: 'action' }]);
  assert(r.type === 'unknown', 'Generic button only → unknown');
}

// Scenario 8: Japanese convenience store WiFi (terms + connect)
{
  const fields = [];
  const checkboxes = [{ isTermsRelated: true }];
  const actions = [{ purpose: 'connect' }];
  const r = detectPortalType(fields, checkboxes, actions);
  assert(r.type === 'agree_only' && r.confidence >= 0.9, 'Conbini WiFi → agree_only');
}

console.log(`  Scenario tests: ${passed - p4} passed`);

// ══════════════════════════════════════════════
// TEST SUITE 7: Multilingual Detection
// ══════════════════════════════════════════════
section('TEST SUITE 7: Multilingual Detection');

const p5 = passed;

// Japanese
assert(guessFieldType('text', 'メールアドレス', '', '') === 'email', 'JA: メールアドレス → email');
assert(guessActionPurpose('同意して接続', '') === 'agree', 'JA: 同意して接続 → agree');
assert(guessActionPurpose('次へ進む', '') === 'continue', 'JA: 次へ進む → continue');
assert(guessActionPurpose('無料WiFiに接続', '') === 'free_access', 'JA: 無料WiFi → free_access');

// Chinese
assert(guessFieldType('text', '邮箱地址', '', '') === 'email', 'ZH: 邮箱地址 → email');
assert(guessFieldType('text', '密码', '', '') === 'password', 'ZH: 密码 → password');
assert(guessActionPurpose('接受并连接', '') === 'agree', 'ZH: 接受并连接 → agree');
assert(guessActionPurpose('登录', '') === 'connect', 'ZH: 登录 → connect');
assert(guessActionPurpose('免费上网', '') === 'free_access', 'ZH: 免费上网 → free_access');

// Korean
assert(guessActionPurpose('수락', '') === 'agree', 'KO: 수락 → agree');
assert(guessActionPurpose('연결', '') === 'connect', 'KO: 연결 → connect');
assert(guessActionPurpose('무료 WiFi', '') === 'free_access', 'KO: 무료 WiFi → free_access');

console.log(`  Multilingual: ${passed - p5} passed`);

// ══════════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════════
console.log(`\n══════════════════════════════════════════════`);
console.log(`  TEST RESULTS`);
console.log(`══════════════════════════════════════════════`);
console.log(`  Total:  ${passed + failed}`);
console.log(`  Passed: ${passed} ✅`);
console.log(`  Failed: ${failed} ❌`);
console.log(`══════════════════════════════════════════════\n`);

if (failed > 0) {
  console.log('🔴 SOME TESTS FAILED');
  process.exit(1);
} else {
  console.log('🟢 ALL TESTS PASSED');
}
