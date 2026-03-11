import { generateAutomationScript } from "@/services/portal-automator";
import type { PortalPattern, UserProfile, SavedCredentials } from "@/lib/types";

const profile: UserProfile = {
  firstName: "Taro",
  lastName: "Yamada",
  email: "taro@example.com",
};

const agreeOnlyPattern: PortalPattern = {
  spotId: "test-agree",
  name: "Test WiFi",
  nameJa: "テストWiFi",
  airportCode: "NRT",
  country: "JP",
  ssids: ["TestWiFi"],
  portalType: "agree_only",
  tier: "free",
  patternVersion: 1,
  lastVerified: "2025-01-01",
  agreeOnly: {
    actions: [
      {
        description: "Click agree button",
        selector: "#agree-btn",
        action: "click",
      },
    ],
    successCondition: { method: "http_probe", value: "" },
  },
};

const registrationPattern: PortalPattern = {
  spotId: "test-reg",
  name: "Reg WiFi",
  nameJa: "登録WiFi",
  airportCode: "HND",
  country: "JP",
  ssids: ["RegWiFi"],
  portalType: "registration",
  tier: "free",
  patternVersion: 1,
  lastVerified: "2025-01-01",
  registration: {
    fields: [
      {
        fieldId: "email",
        selector: "#email",
        valueSource: "profile.email",
        inputMethod: "set_value",
      },
      {
        fieldId: "password",
        selector: "#password",
        valueSource: "credentials.password",
        inputMethod: "set_value",
      },
    ],
    postFillActions: [
      {
        description: "Submit",
        selector: "#submit",
        action: "click",
      },
    ],
    successCondition: { method: "http_probe", value: "" },
  },
};

describe("generateAutomationScript", () => {
  it("generates valid IIFE for agree_only pattern", () => {
    const { script } = generateAutomationScript(agreeOnlyPattern, profile);
    expect(script).toContain("(function()");
    expect(script).toContain("findEl");
    expect(script).toContain("report");
    expect(script).toContain("#agree-btn");
  });

  it("includes helper functions", () => {
    const { script } = generateAutomationScript(agreeOnlyPattern, profile);
    expect(script).toContain("setInputValue");
    expect(script).toContain("delay");
    expect(script).toContain("runAutomation");
  });

  it("includes 30s timeout guard", () => {
    const { script } = generateAutomationScript(agreeOnlyPattern, profile);
    expect(script).toContain("30000");
    expect(script).toContain("timed out");
  });

  it("generates password for registration without saved credentials", () => {
    const { script, generatedPassword } = generateAutomationScript(
      registrationPattern,
      profile
    );
    expect(generatedPassword).toBeDefined();
    expect(generatedPassword!.length).toBeGreaterThanOrEqual(12);
    expect(script).toContain("#email");
    expect(script).toContain("#password");
  });

  it("does not generate password when credentials provided", () => {
    const creds: SavedCredentials = {
      spotId: "test-reg",
      password: "savedpass",
      registeredAt: new Date().toISOString(),
    };
    const { generatedPassword } = generateAutomationScript(
      registrationPattern,
      profile,
      creds
    );
    expect(generatedPassword).toBeUndefined();
  });

  it("resolves profile.email correctly", () => {
    const { script } = generateAutomationScript(registrationPattern, profile);
    expect(script).toContain("taro@example.com");
  });

  it("handles preActions", () => {
    const pattern = {
      ...agreeOnlyPattern,
      preActions: [
        {
          description: "Scroll",
          selector: "#terms",
          action: "scroll_to" as const,
        },
      ],
    };
    const { script } = generateAutomationScript(pattern, profile);
    expect(script).toContain("scrollIntoView");
  });

  it("includes customScript when provided", () => {
    const pattern = {
      ...agreeOnlyPattern,
      customScript: "console.log('custom');",
    };
    const { script } = generateAutomationScript(pattern, profile);
    expect(script).toContain("console.log('custom');");
  });
});
