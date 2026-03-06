import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { portalPatterns, patternBundleVersions } from "@/lib/db/schema";

const SEED_PATTERNS = [
  {
    spotId: "icn-airport-wifi",
    name: "Incheon International Airport",
    nameJa: "仁川国際空港",
    airportCode: "ICN",
    country: "KR",
    ssids: ["AirportWiFi", "ICN Free WiFi", "NAVER - Free WiFi Service"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Accept terms checkbox", selector: "input[type='checkbox']", fallbackSelectors: [".terms-checkbox", "#agree"], action: "check", delayMs: 500 },
          { description: "Click connect button", selector: "button[type='submit'], .btn-connect, .submit-btn", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "ICN may vary between terminals.",
  },
  {
    spotId: "sin-changi-wifi",
    name: "Changi Airport",
    nameJa: "チャンギ空港",
    airportCode: "SIN",
    country: "SG",
    ssids: ["#WiFi@Changi", "WiFiChangi"],
    portalType: "registration",
    tier: "free",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox'], .terms-agree", fallbackSelectors: ["#agree", ".checkbox"], action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit'], .connect-btn, #connect-now", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: null,
  },
  {
    spotId: "hnl-free-wifi",
    name: "Daniel K. Inouye International Airport",
    nameJa: "ダニエル・K・イノウエ国際空港 (ハワイ)",
    airportCode: "HNL",
    country: "US",
    ssids: ["HNL Free WiFi", "HNLFreeWiFi", "Boingo Hotspot"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Select free WiFi option", selector: ".free-wifi-btn, [data-plan='free']", fallbackSelectors: ["button:first-of-type", "a.free"], action: "click", delayMs: 1000 },
          { description: "Accept terms", selector: "input[type='checkbox'], .terms-checkbox", fallbackSelectors: ["#agree"], action: "check", delayMs: 500 },
          { description: "Click connect", selector: "button[type='submit'], .connect-btn, #accept", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: null,
  },
  {
    spotId: "hkg-airport-wifi",
    name: "Hong Kong International Airport",
    nameJa: "香港国際空港",
    airportCode: "HKG",
    country: "HK",
    ssids: ["#HKAirport Free WiFi", "HKAirportFreeWifi"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree-checkbox", "#terms"], action: "check", delayMs: 500 },
          { description: "Click connect", selector: "button[type='submit'], .connect-btn", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: null,
  },
  {
    spotId: "tpe-taoyuan-wifi",
    name: "Taoyuan International Airport",
    nameJa: "桃園国際空港",
    airportCode: "TPE",
    country: "TW",
    ssids: ["Airport_Free_WiFi", "TPE-Free.WiFi"],
    portalType: "registration",
    tier: "premium",
    patternData: {
      registration: {
        fields: [
          { fieldId: "name", selector: "input[name='name'], input[name='username']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.fullName", inputMethod: "set_value", delayMs: 500 },
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:nth-of-type(2)"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 200 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit']", fallbackSelectors: ["input[type='submit']", "button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: null,
  },
  {
    spotId: "bkk-suvarnabhumi-wifi",
    name: "Suvarnabhumi Airport",
    nameJa: "スワンナプーム空港",
    airportCode: "BKK",
    country: "TH",
    ssids: ["AOTFreeWiFibyNT", "AOT Airport Free Wi-Fi by NT", ".AOTFreeWiFi"],
    portalType: "registration",
    tier: "premium",
    patternData: {
      registration: {
        fields: [
          { fieldId: "name", selector: "input[name='name'], input[name='fullname']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.fullName", inputMethod: "set_value", delayMs: 500 },
          { fieldId: "email", selector: "input[name='email'], input[type='email']", valueSource: "profile.email", inputMethod: "set_value", delayMs: 200 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", action: "check", delayMs: 300 },
          { description: "Submit registration", selector: "button[type='submit'], .btn-submit", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
      passwordRules: { minLength: 8, maxLength: 16, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecial: false },
    },
    notes: null,
  },
  {
    spotId: "jp-starbucks-wifi",
    name: "Starbucks Japan",
    nameJa: "スターバックス",
    airportCode: "",
    country: "JP",
    ssids: ["at_STARBUCKS_Wi2"],
    portalType: "registration",
    tier: "free",
    patternData: {
      portalUrl: "https://service.wi2.ne.jp/freewifi/starbucks/",
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
          { fieldId: "password", selector: "input[name='password'], input[type='password']", fallbackSelectors: ["input[type='password']:first-of-type"], valueSource: "credentials.password", inputMethod: "set_value", delayMs: 200 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit login", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type", ".btn-login"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
      passwordRules: { minLength: 8, maxLength: 20, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecial: false },
    },
    notes: "Wi2 operated. Session: 1 hour.",
  },
  {
    spotId: "jp-mcdonalds-wifi",
    name: "McDonald's Japan",
    nameJa: "マクドナルド",
    airportCode: "",
    country: "JP",
    ssids: ["00_MCD-FREE-WIFI"],
    portalType: "registration",
    tier: "free",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms", ".terms-checkbox"], action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "Email or SNS registration. Session: 60 min.",
  },
  {
    spotId: "jp-lawson-wifi",
    name: "Lawson Free WiFi",
    nameJa: "ローソン",
    airportCode: "",
    country: "JP",
    ssids: ["LAWSON_Free_Wi-Fi"],
    portalType: "registration",
    tier: "free",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Register/Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type", "a.btn"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "Email registration valid for 1 year. Session: 60 min, 5 times/day.",
  },
  {
    spotId: "jp-jr-east-wifi",
    name: "JR East Free WiFi",
    nameJa: "JR東日本",
    airportCode: "",
    country: "JP",
    ssids: ["JR-EAST_FREE_Wi-Fi"],
    portalType: "registration",
    tier: "free",
    patternData: {
      portalUrl: "https://captive-portal.wifi-cloud.jp",
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept privacy policy", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#privacy"], action: "check", delayMs: 300 },
          { description: "Submit registration", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type", "a.btn-register"], action: "click", delayMs: 500 },
          { description: "Agree to security notice", selector: "button[type='submit'], .btn-agree, a.agree", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 1000 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "NTT-BP operated. Email only. Session: 3 hours.",
  },
  {
    spotId: "jp-metro-wifi",
    name: "Tokyo Metro Free WiFi",
    nameJa: "東京メトロ",
    airportCode: "",
    country: "JP",
    ssids: ["Metro_Free_Wi-Fi"],
    portalType: "registration",
    tier: "free",
    patternData: {
      portalUrl: "https://captive-portal.wifi-cloud.jp",
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "NTT-BP operated. Session: 3 hours.",
  },
  {
    spotId: "jp-toei-wifi",
    name: "Toei Subway Free WiFi",
    nameJa: "都営地下鉄",
    airportCode: "",
    country: "JP",
    ssids: ["Toei_Subway_Free_Wi-Fi"],
    portalType: "registration",
    tier: "free",
    patternData: {
      portalUrl: "https://captive-portal.wifi-cloud.jp",
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "NTT-BP operated. Same platform as Tokyo Metro and JR East.",
  },
  {
    spotId: "jp-narita-wifi",
    name: "Narita Airport",
    nameJa: "成田空港",
    airportCode: "NRT",
    country: "JP",
    ssids: ["FreeWiFi-NARITA"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Click connect to internet", selector: "a.btn, button.connect, .btn-connect", fallbackSelectors: ["button:first-of-type", "a:first-of-type"], action: "click", delayMs: 500 },
          { description: "Agree to terms", selector: "button[type='submit'], .btn-agree, a.agree", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "No registration needed. Available at T1, T2, T3.",
  },
  {
    spotId: "jp-haneda-wifi",
    name: "Haneda Airport",
    nameJa: "羽田空港",
    airportCode: "HND",
    country: "JP",
    ssids: ["HANEDA-FREE-WIFI"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Click connect", selector: "a.btn, button.connect, .btn-connect", fallbackSelectors: ["button:first-of-type", "a:first-of-type"], action: "click", delayMs: 500 },
          { description: "Agree to terms", selector: "button[type='submit'], .btn-agree, a.agree, input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "Wi2 operated. Session: ~5 hours.",
  },
  {
    spotId: "jp-7eleven-wifi",
    name: "7-Eleven Japan WiFi",
    nameJa: "セブンイレブン",
    airportCode: "",
    country: "JP",
    ssids: ["7SPOT"],
    portalType: "registration",
    tier: "free",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "Email registration. Session: 60 min, 3 times/day.",
  },
  {
    spotId: "jp-familymart-wifi",
    name: "FamilyMart WiFi",
    nameJa: "ファミリーマート",
    airportCode: "",
    country: "JP",
    ssids: ["Famima_Wi-Fi"],
    portalType: "registration",
    tier: "free",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "Email registration. Session: 20 min, 3 times/day.",
  },
  {
    spotId: "jp-kix-wifi",
    name: "Kansai International Airport",
    nameJa: "関西国際空港",
    airportCode: "KIX",
    country: "JP",
    ssids: ["FreeWiFi-KIX"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Click connect", selector: "a.btn, button.connect, .btn-connect", fallbackSelectors: ["button:first-of-type", "a:first-of-type"], action: "click", delayMs: 500 },
          { description: "Agree to terms", selector: "button[type='submit'], .btn-agree, a.agree", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "No registration needed. Available at T1, T2.",
  },
  {
    spotId: "jp-fuk-wifi",
    name: "Fukuoka Airport",
    nameJa: "福岡空港",
    airportCode: "FUK",
    country: "JP",
    ssids: ["FUK_Free_Wi-Fi"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Click connect", selector: "a.btn, button.connect, .btn-connect", fallbackSelectors: ["button:first-of-type", "a:first-of-type"], action: "click", delayMs: 500 },
          { description: "Agree to terms", selector: "button[type='submit'], .btn-agree, a.agree", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "No registration needed.",
  },
  {
    spotId: "jp-ngo-wifi",
    name: "Chubu Centrair International Airport",
    nameJa: "中部国際空港",
    airportCode: "NGO",
    country: "JP",
    ssids: ["centrair-free-wifi"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Click connect", selector: "a.btn, button.connect, .btn-connect", fallbackSelectors: ["button:first-of-type", "a:first-of-type"], action: "click", delayMs: 500 },
          { description: "Agree to terms", selector: "button[type='submit'], .btn-agree, a.agree", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "No registration needed.",
  },
  {
    spotId: "jp-tullys-wifi",
    name: "Tully's Coffee WiFi",
    nameJa: "タリーズコーヒー",
    airportCode: "",
    country: "JP",
    ssids: ["tullys_Wi-Fi"],
    portalType: "registration",
    tier: "free",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "Wi2 operated. Email registration. Session: 60 min.",
  },
  {
    spotId: "jp-doutor-wifi",
    name: "Doutor Coffee WiFi",
    nameJa: "ドトールコーヒー",
    airportCode: "",
    country: "JP",
    ssids: ["doutor_Wi-Fi"],
    portalType: "registration",
    tier: "free",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
    notes: "Wi2 operated. Email registration. Session: 60 min.",
  },
  {
    spotId: "jp-dwifi",
    name: "d Wi-Fi (NTT docomo)",
    nameJa: "d Wi-Fi (docomo)",
    airportCode: "",
    country: "JP",
    ssids: ["0000docomo"],
    portalType: "registration",
    tier: "premium",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email'], input[name='userId']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
          { fieldId: "password", selector: "input[name='password'], input[type='password']", fallbackSelectors: ["input[type='password']:first-of-type"], valueSource: "credentials.password", inputMethod: "set_value", delayMs: 200 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit login", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type", ".btn-login"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
      passwordRules: { minLength: 8, maxLength: 20, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecial: false },
    },
    notes: "Requires d-account (docomo ID).",
  },
  {
    spotId: "jp-au-wifi",
    name: "au Wi-Fi",
    nameJa: "au Wi-Fi",
    airportCode: "",
    country: "JP",
    ssids: ["au_Wi-Fi", "au_Wi-Fi2"],
    portalType: "registration",
    tier: "premium",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email'], input[name='userId']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
          { fieldId: "password", selector: "input[name='password'], input[type='password']", fallbackSelectors: ["input[type='password']:first-of-type"], valueSource: "credentials.password", inputMethod: "set_value", delayMs: 200 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit login", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type", ".btn-login"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
      passwordRules: { minLength: 8, maxLength: 20, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecial: false },
    },
    notes: "Requires au ID.",
  },
  {
    spotId: "jp-softbank-wifi",
    name: "SoftBank Wi-Fi Spot",
    nameJa: "ソフトバンクWi-Fi",
    airportCode: "",
    country: "JP",
    ssids: ["0002softbank", "mobilepoint"],
    portalType: "registration",
    tier: "premium",
    patternData: {
      registration: {
        fields: [
          { fieldId: "email", selector: "input[name='email'], input[type='email'], input[name='userId']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
          { fieldId: "password", selector: "input[name='password'], input[type='password']", fallbackSelectors: ["input[type='password']:first-of-type"], valueSource: "credentials.password", inputMethod: "set_value", delayMs: 200 },
        ],
        postFillActions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
          { description: "Submit login", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type", ".btn-login"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
      passwordRules: { minLength: 8, maxLength: 20, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecial: false },
    },
    notes: "Requires SoftBank/Y!mobile account.",
  },
];

export async function POST() {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    for (const p of SEED_PATTERNS) {
      await db.insert(portalPatterns).values({
        spotId: p.spotId,
        name: p.name,
        nameJa: p.nameJa,
        airportCode: p.airportCode,
        country: p.country,
        ssids: p.ssids,
        portalType: p.portalType,
        tier: p.tier,
        patternData: p.patternData,
        patternVersion: 1,
        lastVerified: now,
        isActive: true,
        notes: p.notes,
        createdAt: now,
        updatedAt: now,
      }).onConflictDoUpdate({
        target: portalPatterns.spotId,
        set: {
          patternData: p.patternData,
          ssids: p.ssids,
          updatedAt: now,
        },
      });
    }

    await db.insert(patternBundleVersions).values({
      version: 3,
      publishedAt: now,
    });

    return NextResponse.json({
      ok: true,
      inserted: SEED_PATTERNS.length,
    });
  } catch (error) {
    console.error("Seed failed:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
