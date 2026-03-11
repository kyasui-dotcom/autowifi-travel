import type {
  PortalPattern,
  UserProfile,
  SavedCredentials,
  FieldMapping,
  ActionStep,
  PortalFlow,
} from "@/lib/types";
import { generatePassword } from "@/services/password-generator";

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

function resolveValue(
  field: FieldMapping,
  profile: UserProfile,
  credentials?: SavedCredentials | null,
  generatedPassword?: string
): string {
  switch (field.valueSource) {
    case "profile.firstName":
      return profile.firstName;
    case "profile.lastName":
      return profile.lastName;
    case "profile.fullName":
      return `${profile.firstName} ${profile.lastName}`;
    case "profile.fullNameReversed":
      return `${profile.lastName} ${profile.firstName}`;
    case "profile.email":
      return profile.email;
    case "credentials.password":
      return credentials?.password ?? generatedPassword ?? "";
    case "credentials.username":
      return credentials?.username ?? profile.email;
    case "static":
      return field.staticValue ?? "";
    default:
      return "";
  }
}

function generateFieldCode(
  field: FieldMapping,
  value: string
): string {
  const fallbacks = JSON.stringify(field.fallbackSelectors ?? []);
  const escaped = escapeJs(value);

  let fillCode: string;
  switch (field.inputMethod) {
    case "set_value":
      fillCode = `setInputValue(el, '${escaped}');`;
      break;
    case "check":
      fillCode = `if (!el.checked) el.click();`;
      break;
    case "select":
      fillCode = `el.value = '${escaped}'; el.dispatchEvent(new Event('change', {bubbles:true}));`;
      break;
    case "click":
      fillCode = `el.click();`;
      break;
  }

  return `
    await delay(${field.delayMs ?? 200});
    {
      const el = await findElWithRetry('${escapeJs(field.selector)}', ${fallbacks});
      if (el) {
        ${fillCode}
        report('field_filled', '${field.fieldId}');
      } else {
        report('field_not_found', '${field.fieldId}');
      }
    }
  `;
}

function generateActionCode(action: ActionStep): string {
  const fallbacks = JSON.stringify(action.fallbackSelectors ?? []);
  const desc = escapeJs(action.description);

  let waitCode = "";
  if (action.waitForSelector) {
    waitCode = `
      await new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(), ${action.waitTimeoutMs ?? 5000});
        const check = () => {
          if (document.querySelector('${escapeJs(action.waitForSelector!)}')) {
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

  let actionCode: string;
  switch (action.action) {
    case "click":
      actionCode = "el.click();";
      break;
    case "check":
      actionCode = "if (!el.checked) el.click();";
      break;
    case "scroll_to":
      actionCode = "el.scrollIntoView({behavior:'smooth'});";
      break;
    case "wait":
      actionCode = "// wait only";
      break;
  }

  return `
    await delay(${action.delayMs ?? 300});
    ${waitCode}
    {
      const el = await findElWithRetry('${escapeJs(action.selector)}', ${fallbacks});
      if (el) {
        ${actionCode}
        report('action_done', '${desc}');
      } else {
        report('action_not_found', '${desc}');
      }
    }
  `;
}

export function generateAutomationScript(
  pattern: PortalPattern,
  profile: UserProfile,
  savedCredentials?: SavedCredentials | null
): { script: string; generatedPassword?: string } {
  const isReturning = !!savedCredentials;
  let generatedPassword: string | undefined;

  // Generate password if needed for registration
  if (!isReturning && pattern.portalType === "registration") {
    generatedPassword = generatePassword(pattern.passwordRules);
  }

  const scriptParts: string[] = [];

  // IIFE wrapper with helpers
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

      async function findElWithRetry(selector, fallbacks, retries) {
        retries = retries || 3;
        for (var attempt = 0; attempt < retries; attempt++) {
          var el = findEl(selector, fallbacks);
          if (el && el.offsetParent !== null && !el.disabled) return el;
          if (attempt < retries - 1) await delay(500);
        }
        return findEl(selector, fallbacks);
      }

      async function runAutomation() {
        try {
          report('started', 'Beginning automation');
  `);

  // Pre-actions
  if (pattern.preActions) {
    scriptParts.push(`          _automationPhase = 'pre_actions';`);
    for (const action of pattern.preActions) {
      scriptParts.push(generateActionCode(action));
    }
  }

  // Agree-only flow
  if (pattern.portalType === "agree_only" && pattern.agreeOnly) {
    for (const action of pattern.agreeOnly.actions) {
      scriptParts.push(generateActionCode(action));
    }
  }

  // Registration or Login flow
  const flow: PortalFlow | undefined = isReturning
    ? pattern.login
    : pattern.registration;

  if (flow && pattern.portalType !== "agree_only") {
    scriptParts.push(`          _automationPhase = 'fields';`);
    for (const field of flow.fields) {
      const value = resolveValue(field, profile, savedCredentials, generatedPassword);
      scriptParts.push(generateFieldCode(field, value));
    }
    scriptParts.push(`          _automationPhase = 'post_actions';`);
    for (const action of flow.postFillActions) {
      scriptParts.push(generateActionCode(action));
    }
  }

  // Custom script
  if (pattern.customScript) {
    scriptParts.push(pattern.customScript);
  }

  // Close IIFE
  scriptParts.push(`
          _automationPhase = 'complete';
          report('completed', 'Automation finished');
        } catch (err) {
          report('error', err.message || 'Unknown error');
        }
      }

      // Timeout guard: abort if automation takes >30s
      var _automationPhase = 'init';
      var _automationTimer = setTimeout(function() {
        report('error', 'Automation timed out after 30s during: ' + _automationPhase);
      }, 30000);

      setTimeout(function() {
        runAutomation().finally(function() {
          clearTimeout(_automationTimer);
        });
      }, 1500);
      true;
    })();
  `);

  return {
    script: scriptParts.join("\n"),
    generatedPassword,
  };
}
