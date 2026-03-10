/**
 * portal-auto-detector.ts
 *
 * Generic captive portal detection + auto selector estimation.
 * When no known pattern matches the current SSID, this module injects
 * a DOM analysis script into the WebView. The script scans the portal
 * page for forms, buttons, checkboxes and input fields, then reports
 * back a structured description of the portal so we can generate an
 * automation script on the fly.
 */

import type { AutoDetectedPortal, DetectedField, DetectedAction } from "@/lib/types";

// ─── DOM Scanner Script ────────────────────────────────────────────
// This JavaScript is injected into the WebView to analyze the portal page.
// It returns an AutoDetectedPortal object via postMessage.

export function generateScannerScript(): string {
  return `
(function() {
  function report(data) {
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }

  function bestSelector(el) {
    if (el.id) return '#' + CSS.escape(el.id);
    if (el.name) return el.tagName.toLowerCase() + '[name="' + el.name + '"]';
    if (el.type && el.tagName === 'INPUT')
      return 'input[type="' + el.type + '"]';
    if (el.className && typeof el.className === 'string') {
      var cls = el.className.trim().split(/\\s+/).filter(function(c) { return c.length > 0; });
      if (cls.length > 0) return el.tagName.toLowerCase() + '.' + cls.join('.');
    }
    // Fallback: nth-child
    var parent = el.parentElement;
    if (parent) {
      var idx = Array.from(parent.children).indexOf(el) + 1;
      return bestSelector(parent) + ' > ' + el.tagName.toLowerCase() + ':nth-child(' + idx + ')';
    }
    return el.tagName.toLowerCase();
  }

  function guessFieldType(el) {
    var type = (el.type || '').toLowerCase();
    var name = (el.name || '').toLowerCase();
    var id = (el.id || '').toLowerCase();
    var placeholder = (el.placeholder || '').toLowerCase();
    var label = '';
    if (el.id) {
      var lbl = document.querySelector('label[for="' + CSS.escape(el.id) + '"]');
      if (lbl) label = (lbl.textContent || '').toLowerCase();
    }
    var all = name + ' ' + id + ' ' + placeholder + ' ' + label + ' ' + type;

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

  function guessActionPurpose(el) {
    var text = (el.textContent || el.value || '').trim().toLowerCase();
    var cls = (el.className || '').toLowerCase();
    var type = (el.type || '').toLowerCase();
    var all = text + ' ' + cls;

    if (/agree|accept|同意|同意する|수락|接受/.test(all)) return 'agree';
    if (/free|無料|免费|무료/.test(all)) return 'free_access';
    if (/connect|接続|연결|连接|login|ログイン|登录|sign.?in/.test(all)) return 'connect';
    if (/submit|送信|提出|提交|register|登録|注册/.test(all)) return 'submit';
    if (/continue|次へ|next|进入|繼續/.test(all)) return 'continue';
    if (type === 'submit') return 'submit';
    return 'action';
  }

  function isVisible(el) {
    var rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    var style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }

  function scan() {
    var result = {
      type: 'portal_scan_result',
      url: window.location.href,
      title: document.title,
      detectedType: 'unknown',
      fields: [],
      actions: [],
      checkboxes: [],
      confidence: 0,
      rawFormCount: 0,
      language: document.documentElement.lang || 'unknown'
    };

    // Find all forms
    var forms = document.querySelectorAll('form');
    result.rawFormCount = forms.length;

    // Scan text inputs (visible ones)
    var inputs = document.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="password"], ' +
      'input[type="tel"], input[type="number"], input:not([type])'
    );
    inputs.forEach(function(inp) {
      if (!isVisible(inp)) return;
      var fieldType = guessFieldType(inp);
      result.fields.push({
        selector: bestSelector(inp),
        fieldType: fieldType,
        inputType: inp.type || 'text',
        name: inp.name || '',
        placeholder: inp.placeholder || '',
        required: inp.required || false,
        confidence: fieldType !== 'unknown' ? 0.8 : 0.3
      });
    });

    // Scan checkboxes (likely terms agreement)
    var checks = document.querySelectorAll('input[type="checkbox"]');
    checks.forEach(function(cb) {
      if (!isVisible(cb)) return;
      var label = '';
      if (cb.id) {
        var lbl = document.querySelector('label[for="' + CSS.escape(cb.id) + '"]');
        if (lbl) label = lbl.textContent.trim();
      }
      if (!label && cb.parentElement) {
        label = cb.parentElement.textContent.trim().substring(0, 100);
      }
      var isTerms = /terms|agree|条件|利用規約|同意|약관|条款/.test(label.toLowerCase());
      result.checkboxes.push({
        selector: bestSelector(cb),
        label: label,
        isTermsRelated: isTerms,
        checked: cb.checked,
        confidence: isTerms ? 0.9 : 0.5
      });
    });

    // Scan clickable elements (buttons, submit inputs, links with button-like roles)
    var buttons = document.querySelectorAll(
      'button, input[type="submit"], input[type="button"], ' +
      'a.btn, a.button, a[class*="connect"], a[class*="submit"], ' +
      '[role="button"]'
    );
    buttons.forEach(function(btn) {
      if (!isVisible(btn)) return;
      var text = (btn.textContent || btn.value || '').trim();
      if (text.length > 60) text = text.substring(0, 60);
      if (!text) return;
      var purpose = guessActionPurpose(btn);
      result.actions.push({
        selector: bestSelector(btn),
        text: text,
        tagName: btn.tagName.toLowerCase(),
        type: btn.type || '',
        purpose: purpose,
        confidence: purpose !== 'action' ? 0.8 : 0.4
      });
    });

    // Determine portal type and overall confidence
    var hasEmail = result.fields.some(function(f) { return f.fieldType === 'email'; });
    var hasPassword = result.fields.some(function(f) { return f.fieldType === 'password'; });
    var hasTermsCheckbox = result.checkboxes.some(function(c) { return c.isTermsRelated; });
    var hasConnectButton = result.actions.some(function(a) {
      return a.purpose === 'connect' || a.purpose === 'agree' || a.purpose === 'submit' || a.purpose === 'free_access';
    });

    if (result.fields.length === 0 && hasConnectButton) {
      result.detectedType = 'agree_only';
      result.confidence = hasTermsCheckbox ? 0.95 : 0.80;
    } else if (hasEmail && hasPassword) {
      result.detectedType = 'registration';
      result.confidence = 0.85;
    } else if (hasEmail && !hasPassword) {
      result.detectedType = 'email_only';
      result.confidence = 0.80;
    } else if (hasPassword && !hasEmail) {
      result.detectedType = 'login';
      result.confidence = 0.70;
    } else if (result.fields.length > 0) {
      result.detectedType = 'registration';
      result.confidence = 0.60;
    } else if (hasConnectButton) {
      result.detectedType = 'agree_only';
      result.confidence = 0.50;
    } else {
      result.detectedType = 'unknown';
      result.confidence = 0.20;
    }

    report(result);
  }

  // Wait for page to settle, then scan
  if (document.readyState === 'complete') {
    setTimeout(scan, 1500);
  } else {
    window.addEventListener('load', function() { setTimeout(scan, 1500); });
  }
  // Backup: scan after 5s regardless
  setTimeout(scan, 5000);
  true;
})();
`;
}

// ─── Auto-generate automation script from scan result ──────────────

export function generateAutoScript(
  scanResult: AutoDetectedPortal,
  email?: string
): string {
  const parts: string[] = [];

  parts.push(`
(function() {
  function findEl(selector, fallbacks) {
    var el = document.querySelector(selector);
    if (el) return el;
    if (fallbacks) {
      for (var i = 0; i < fallbacks.length; i++) {
        el = document.querySelector(fallbacks[i]);
        if (el) return el;
      }
    }
    return null;
  }

  function setInputValue(el, value) {
    var setter = Object.getOwnPropertyDescriptor(
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
    return new Promise(function(r) { setTimeout(r, ms); });
  }

  async function runAutoDetectedAutomation() {
    try {
      report('started', 'Auto-detected portal automation');
`);

  // Fill email fields
  if (email) {
    const emailFields = scanResult.fields.filter(
      (f) => f.fieldType === "email" || (f.fieldType === "text" && f.confidence < 0.5)
    );
    for (const field of emailFields) {
      const escaped = escapeJs(email);
      parts.push(`
      await delay(500);
      {
        var el = findEl('${escapeJs(field.selector)}');
        if (el) {
          setInputValue(el, '${escaped}');
          report('field_filled', '${escapeJs(field.fieldType)}');
        }
      }
`);
    }
  }

  // Check terms checkboxes
  const termsCheckboxes = scanResult.checkboxes.filter((c) => c.isTermsRelated);
  for (const cb of termsCheckboxes) {
    parts.push(`
      await delay(300);
      {
        var el = findEl('${escapeJs(cb.selector)}');
        if (el && !el.checked) {
          el.click();
          report('action_done', 'Checked terms checkbox');
        }
      }
`);
  }

  // If no terms checkboxes but there are other checkboxes, check them too
  if (termsCheckboxes.length === 0) {
    for (const cb of scanResult.checkboxes) {
      parts.push(`
      await delay(300);
      {
        var el = findEl('${escapeJs(cb.selector)}');
        if (el && !el.checked) {
          el.click();
          report('action_done', 'Checked checkbox');
        }
      }
`);
    }
  }

  // Click the most likely action button
  // Priority: agree > connect > free_access > submit > continue > action
  const priorityOrder = ["agree", "connect", "free_access", "submit", "continue", "action"];
  const sortedActions = [...scanResult.actions].sort((a, b) => {
    const ai = priorityOrder.indexOf(a.purpose);
    const bi = priorityOrder.indexOf(b.purpose);
    return ai - bi;
  });

  if (sortedActions.length > 0) {
    const best = sortedActions[0];
    const fallbacks = sortedActions
      .slice(1, 4)
      .map((a) => a.selector);
    parts.push(`
      await delay(500);
      {
        var el = findEl('${escapeJs(best.selector)}', ${JSON.stringify(fallbacks)});
        if (el) {
          el.click();
          report('action_done', 'Clicked: ${escapeJs(best.text.substring(0, 30))}');
        } else {
          report('action_not_found', 'No suitable button found');
        }
      }
`);
  }

  parts.push(`
      report('completed', 'Auto-detected automation finished');
    } catch (err) {
      report('error', err.message || 'Unknown error');
    }
  }

  var _automationTimer = setTimeout(function() {
    report('error', 'Auto-detected automation timed out after 30s');
  }, 30000);

  setTimeout(function() {
    runAutoDetectedAutomation().finally(function() {
      clearTimeout(_automationTimer);
    });
  }, 800);
  true;
})();
`);

  return parts.join("\n");
}

function escapeJs(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/</g, "\\x3c")
    .replace(/>/g, "\\x3e");
}

// ─── Convert scan result to a reusable PortalPattern ───────────────

export function scanResultToPattern(
  scanResult: AutoDetectedPortal,
  ssid: string
): {
  spotId: string;
  name: string;
  ssids: string[];
  portalType: string;
  agreeOnly?: object;
  registration?: object;
} {
  const safeId = "auto-" + ssid.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");

  if (scanResult.detectedType === "agree_only") {
    const actions = [];

    for (const cb of scanResult.checkboxes.filter((c) => c.isTermsRelated)) {
      actions.push({
        description: "Check terms checkbox",
        selector: cb.selector,
        fallbackSelectors: ["input[type='checkbox']"],
        action: "check",
        optional: true,
        delayMs: 300,
      });
    }

    const bestButton = [...scanResult.actions].sort((a, b) => {
      const p = ["agree", "connect", "free_access", "submit", "continue", "action"];
      return p.indexOf(a.purpose) - p.indexOf(b.purpose);
    })[0];

    if (bestButton) {
      actions.push({
        description: "Click connect button",
        selector: bestButton.selector,
        fallbackSelectors: scanResult.actions
          .filter((a) => a.selector !== bestButton.selector)
          .slice(0, 3)
          .map((a) => a.selector),
        action: "click",
        delayMs: 500,
      });
    }

    return {
      spotId: safeId,
      name: ssid,
      ssids: [ssid],
      portalType: "agree_only",
      agreeOnly: {
        actions,
        successCondition: {
          method: "http_probe",
          value: "http://connectivitycheck.gstatic.com/generate_204",
        },
      },
    };
  }

  // Registration / email-only
  const fields = scanResult.fields.map((f) => ({
    fieldId: f.fieldType,
    selector: f.selector,
    fallbackSelectors: [],
    valueSource: f.fieldType === "email" ? "profile.email"
      : f.fieldType === "firstName" ? "profile.firstName"
      : f.fieldType === "lastName" ? "profile.lastName"
      : f.fieldType === "fullName" ? "profile.fullName"
      : "profile.email",
    inputMethod: "set_value",
    delayMs: 500,
  }));

  const postFillActions = [];
  for (const cb of scanResult.checkboxes.filter((c) => c.isTermsRelated)) {
    postFillActions.push({
      description: "Accept terms",
      selector: cb.selector,
      fallbackSelectors: ["input[type='checkbox']"],
      action: "check",
      delayMs: 300,
    });
  }

  const bestButton = [...scanResult.actions].sort((a, b) => {
    const p = ["submit", "connect", "agree", "continue", "free_access", "action"];
    return p.indexOf(a.purpose) - p.indexOf(b.purpose);
  })[0];

  if (bestButton) {
    postFillActions.push({
      description: "Submit",
      selector: bestButton.selector,
      fallbackSelectors: scanResult.actions
        .filter((a) => a.selector !== bestButton.selector)
        .slice(0, 3)
        .map((a) => a.selector),
      action: "click",
      delayMs: 500,
    });
  }

  return {
    spotId: safeId,
    name: ssid,
    ssids: [ssid],
    portalType: "registration",
    registration: {
      fields,
      postFillActions,
      successCondition: {
        method: "http_probe",
        value: "http://connectivitycheck.gstatic.com/generate_204",
      },
    },
  };
}
