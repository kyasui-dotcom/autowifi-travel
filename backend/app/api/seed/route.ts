import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { portalPatterns, patternBundleVersions } from "@/lib/db/schema";

const SEED_PATTERNS = [
  {
    spotId: "icn-airport-wifi",
    name: "Incheon International Airport",
    nameJa: "仁川国際空港",
    nameZh: "仁川国际机场",
    nameKo: "인천국제공항",
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
    nameZh: "樟宜机场",
    nameKo: "창이공항",
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
    nameZh: "丹尼尔·K·井上国际机场（夏威夷）",
    nameKo: "대니얼 K. 이노우에 국제공항 (하와이)",
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
    nameZh: "香港国际机场",
    nameKo: "홍콩국제공항",
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
    nameZh: "桃园国际机场",
    nameKo: "타오위안국제공항",
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
    nameZh: "素万那普机场",
    nameKo: "수완나품공항",
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
    spotId: "kr-gimpo-wifi",
    name: "Gimpo International Airport",
    nameJa: "金浦国際空港",
    nameZh: "金浦国际机场",
    nameKo: "김포국제공항",
    airportCode: "GMP",
    country: "KR",
    ssids: ["GimpoAirport_FreeWiFi", "GMP_Free_WiFi"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".terms-checkbox", "#agree"], action: "check", delayMs: 500 },
          { description: "Click connect", selector: "button[type='submit'], .btn-connect", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
  },
  {
    spotId: "kr-ktx-wifi",
    name: "KTX (Korea Train eXpress)",
    nameJa: "KTX（韓国高速鉄道）",
    nameZh: "KTX（韩国高速铁路）",
    nameKo: "KTX (한국고속철도)",
    airportCode: "",
    country: "KR",
    ssids: ["KTX_WiFi", "KTX_Free_WiFi", "KORAIL_WiFi"],
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
    notes: "Available at KTX stations.",
  },
  {
    spotId: "kr-seoul-metro-wifi",
    name: "Seoul Metro T WiFi Zone",
    nameJa: "ソウル地下鉄 T WiFi",
    nameZh: "首尔地铁 T WiFi",
    nameKo: "서울지하철 T WiFi Zone",
    airportCode: "",
    country: "KR",
    ssids: ["T_WiFi_Zone", "T wifi zone", "Seoul_Metro_WiFi"],
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
    notes: "SK Telecom operated.",
  },
  {
    spotId: "tw-taipei-metro-wifi",
    name: "Taipei Metro (TPE-Free)",
    nameJa: "台北MRT（TPE-Free）",
    nameZh: "台北捷运（TPE-Free）",
    nameKo: "타이베이 MRT (TPE-Free)",
    airportCode: "",
    country: "TW",
    ssids: ["TPE-Free", "Taipei_Free_WiFi"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".terms-checkbox", "#agree"], action: "check", delayMs: 500 },
          { description: "Click connect", selector: "button[type='submit'], .btn-connect", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
  },
  {
    spotId: "tw-thsr-wifi",
    name: "Taiwan High Speed Rail",
    nameJa: "台湾高速鉄道（高鉄）",
    nameZh: "台湾高速铁路（高铁）",
    nameKo: "타이완 고속철도 (고철)",
    airportCode: "",
    country: "TW",
    ssids: ["THSR_WiFi", "THSR_Free_WiFi"],
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
  },
  {
    spotId: "cn-pek-wifi",
    name: "Beijing Capital Airport",
    nameJa: "北京首都空港",
    nameZh: "北京首都国际机场",
    nameKo: "베이징수도공항",
    airportCode: "PEK",
    country: "CN",
    ssids: ["Airport-Free-WiFi", "PEK_Free_WiFi"],
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
    notes: "May require phone number in some terminals.",
  },
  {
    spotId: "cn-pvg-wifi",
    name: "Shanghai Pudong Airport",
    nameJa: "上海浦東空港",
    nameZh: "上海浦东国际机场",
    nameKo: "상하이푸둥공항",
    airportCode: "PVG",
    country: "CN",
    ssids: ["PVG-Free-WiFi", "#AirportWiFi"],
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
    notes: "May require WeChat or phone number.",
  },
  {
    spotId: "cn-can-wifi",
    name: "Guangzhou Baiyun Airport",
    nameJa: "広州白雲空港",
    nameZh: "广州白云国际机场",
    nameKo: "광저우바이윈공항",
    airportCode: "CAN",
    country: "CN",
    ssids: ["CAN-Airport-WiFi", "BAIYUN_Free_WiFi"],
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
    notes: "May require WeChat or phone number.",
  },
  {
    spotId: "my-klia-wifi",
    name: "KLIA (Kuala Lumpur International Airport)",
    nameJa: "クアラルンプール国際空港",
    nameZh: "吉隆坡国际机场",
    nameKo: "쿠알라룸푸르국제공항",
    airportCode: "KUL",
    country: "MY",
    ssids: ["KLIA_Free_WiFi", "@KLIA_WiFi", "KLIA2WiFi"],
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
  },
  {
    spotId: "vn-sgn-wifi",
    name: "Tan Son Nhat International Airport",
    nameJa: "タンソンニャット国際空港",
    nameZh: "新山一国际机场",
    nameKo: "떤선녓국제공항",
    airportCode: "SGN",
    country: "VN",
    ssids: ["TSN_Airport_WiFi", "SGN_Free_WiFi"],
    portalType: "agree_only",
    tier: "free",
    patternData: {
      agreeOnly: {
        actions: [
          { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".terms-checkbox", "#agree"], action: "check", delayMs: 500 },
          { description: "Click connect", selector: "button[type='submit'], .btn-connect", fallbackSelectors: ["button:last-of-type", "input[type='submit']"], action: "click", delayMs: 500 },
        ],
        successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" },
      },
    },
  },
  {
    spotId: "ph-mnl-wifi",
    name: "Ninoy Aquino International Airport",
    nameJa: "ニノイ・アキノ国際空港",
    nameZh: "尼诺伊·阿基诺国际机场",
    nameKo: "니노이아키노국제공항",
    airportCode: "MNL",
    country: "PH",
    ssids: ["NAIA_Free_WiFi", "MNL_Airport_WiFi"],
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
  },
  {
    spotId: "id-cgk-wifi",
    name: "Soekarno-Hatta International Airport",
    nameJa: "スカルノ・ハッタ国際空港",
    nameZh: "苏加诺-哈达国际机场",
    nameKo: "수카르노하타국제공항",
    airportCode: "CGK",
    country: "ID",
    ssids: ["@wifi.id", "CGK_Airport_WiFi", "FreeWiFi_SHIA"],
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
  },
  {
    spotId: "jp-starbucks-wifi",
    name: "Starbucks Japan",
    nameJa: "スターバックス",
    nameZh: "星巴克",
    nameKo: "스타벅스",
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
    nameZh: "麦当劳",
    nameKo: "맥도날드",
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
    nameZh: "罗森",
    nameKo: "로손",
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
    nameZh: "JR东日本",
    nameKo: "JR 동일본",
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
    nameZh: "东京地铁",
    nameKo: "도쿄메트로",
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
    nameZh: "都营地铁",
    nameKo: "도에이 지하철",
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
    nameZh: "成田机场",
    nameKo: "나리타공항",
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
    nameZh: "羽田机场",
    nameKo: "하네다공항",
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
    nameZh: "7-11便利店",
    nameKo: "세븐일레븐",
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
    nameZh: "全家便利店",
    nameKo: "패밀리마트",
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
    nameZh: "关西国际机场",
    nameKo: "간사이국제공항",
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
    nameZh: "福冈机场",
    nameKo: "후쿠오카공항",
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
    nameZh: "中部国际机场",
    nameKo: "주부국제공항",
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
    nameZh: "塔利咖啡",
    nameKo: "탈리스커피",
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
    nameZh: "罗多伦咖啡",
    nameKo: "도토루커피",
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
    nameZh: "d Wi-Fi (docomo)",
    nameKo: "d Wi-Fi (docomo)",
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
    nameZh: "au Wi-Fi",
    nameKo: "au Wi-Fi",
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
    nameZh: "软银Wi-Fi",
    nameKo: "소프트뱅크 Wi-Fi",
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
  // ===== Japan Airports (new) =====
  {
    spotId: "jp-cts-wifi", name: "New Chitose Airport", nameJa: "新千歳空港", nameZh: "新千岁机场", nameKo: "신치토세공항",
    airportCode: "CTS", country: "JP", ssids: ["New_Chitose_Airport_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "New Chitose Airport, Hokkaido.",
  },
  {
    spotId: "jp-sdj-wifi", name: "Sendai Airport", nameJa: "仙台空港", nameZh: "仙台机场", nameKo: "센다이공항",
    airportCode: "SDJ", country: "JP", ssids: ["Sendai-Airport_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Sendai Airport.",
  },
  {
    spotId: "jp-nrt-t3-wifi", name: "Narita Airport Terminal 3", nameJa: "成田空港 第3ターミナル", nameZh: "成田机场第3航站楼", nameKo: "나리타공항 제3터미널",
    airportCode: "NRT", country: "JP", ssids: ["FreeWiFi-NARITA_T3"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "LCC terminal at Narita. Same NTT-BP system.",
  },
  {
    spotId: "jp-itm-wifi", name: "Osaka Itami Airport", nameJa: "大阪伊丹空港", nameZh: "大阪伊丹机场", nameKo: "오사카 이타미공항",
    airportCode: "ITM", country: "JP", ssids: ["Osaka-Airport_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Osaka Itami Airport (domestic).",
  },
  {
    spotId: "jp-oka-wifi", name: "Naha Airport", nameJa: "那覇空港", nameZh: "那霸机场", nameKo: "나하공항",
    airportCode: "OKA", country: "JP", ssids: ["NAHA_AIRPORT_FREE_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Naha Airport, Okinawa.",
  },
  {
    spotId: "jp-kmj-wifi", name: "Kumamoto Airport", nameJa: "熊本空港", nameZh: "熊本机场", nameKo: "구마모토공항",
    airportCode: "KMJ", country: "JP", ssids: ["Kumamoto-Airport_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Kumamoto Airport.",
  },
  {
    spotId: "jp-hij-wifi", name: "Hiroshima Airport", nameJa: "広島空港", nameZh: "广岛机场", nameKo: "히로시마공항",
    airportCode: "HIJ", country: "JP", ssids: ["Hiroshima-Airport_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Hiroshima Airport.",
  },
  {
    spotId: "jp-kmq-wifi", name: "Komatsu Airport", nameJa: "小松空港", nameZh: "小松机场", nameKo: "고마쓰공항",
    airportCode: "KMQ", country: "JP", ssids: ["Komatsu-Airport_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Komatsu Airport (Kanazawa area).",
  },
  {
    spotId: "jp-kag-wifi", name: "Kagoshima Airport", nameJa: "鹿児島空港", nameZh: "鹿儿岛机场", nameKo: "가고시마공항",
    airportCode: "KOJ", country: "JP", ssids: ["Kagoshima-Airport_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Kagoshima Airport.",
  },
  {
    spotId: "jp-matsuyama-wifi", name: "Matsuyama Airport", nameJa: "松山空港", nameZh: "松山机场", nameKo: "마쓰야마공항",
    airportCode: "MYJ", country: "JP", ssids: ["Matsuyama-Airport_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Matsuyama Airport, Ehime.",
  },
  // ===== Japan Transit & City WiFi =====
  {
    spotId: "jp-shinkansen-wifi", name: "Shinkansen Free WiFi", nameJa: "新幹線 Free Wi-Fi", nameZh: "新干线免费WiFi", nameKo: "신칸센 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["Shinkansen_Free_Wi-Fi", "Shinkansen Free Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Tokaido/Sanyo/Tohoku Shinkansen.",
  },
  {
    spotId: "jp-jr-west-wifi", name: "JR-WEST FREE Wi-Fi", nameJa: "JR西日本 Free Wi-Fi", nameZh: "JR西日本免费WiFi", nameKo: "JR서일본 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["JR-WEST_FREE_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Major JR West stations. 30 min sessions.",
  },
  {
    spotId: "jp-osaka-metro-wifi", name: "Osaka Metro Free Wi-Fi", nameJa: "大阪メトロ Free Wi-Fi", nameZh: "大阪地铁免费WiFi", nameKo: "오사카 메트로 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["Osaka_Metro_Free_Wi-Fi", "OSAKA_Free_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "All Osaka Metro stations.",
  },
  // ===== Japan City WiFi =====
  {
    spotId: "jp-kyoto-wifi", name: "KYOTO Wi-Fi", nameJa: "KYOTO Wi-Fi", nameZh: "京都WiFi", nameKo: "교토 WiFi",
    airportCode: "", country: "JP", ssids: ["KYOTO_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Kyoto city. Bus stops, tourist spots, subway.",
  },
  {
    spotId: "jp-tokyo-wifi", name: "FREE Wi-Fi & TOKYO", nameJa: "FREE Wi-Fi & TOKYO", nameZh: "东京免费WiFi", nameKo: "도쿄 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["FREE_Wi-Fi_and_TOKYO"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Tokyo Metropolitan Government WiFi.",
  },
  {
    spotId: "jp-yokohama-wifi", name: "YOKOHAMA Free Wi-Fi", nameJa: "よこはまFree Wi-Fi", nameZh: "横滨免费WiFi", nameKo: "요코하마 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["YOKOHAMA_Free_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Yokohama city WiFi.",
  },
  {
    spotId: "jp-nagoya-wifi", name: "Nagoya Free Wi-Fi", nameJa: "なごや Free Wi-Fi", nameZh: "名古屋免费WiFi", nameKo: "나고야 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["Nagoya_Free_Wi-Fi", "NAGOYA-Free-WiFi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Nagoya city WiFi.",
  },
  {
    spotId: "jp-sapporo-wifi", name: "Sapporo City Wi-Fi", nameJa: "Sapporo City Wi-Fi", nameZh: "札幌市WiFi", nameKo: "삿포로 시티 WiFi",
    airportCode: "", country: "JP", ssids: ["Sapporo_City_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Sapporo city WiFi.",
  },
  {
    spotId: "jp-fukuoka-wifi", name: "Fukuoka City Wi-Fi", nameJa: "Fukuoka City Wi-Fi", nameZh: "福冈市WiFi", nameKo: "후쿠오카 시티 WiFi",
    airportCode: "", country: "JP", ssids: ["Fukuoka_City_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Fukuoka city WiFi.",
  },
  {
    spotId: "jp-kobe-wifi", name: "KOBE Free Wi-Fi", nameJa: "KOBE Free Wi-Fi", nameZh: "神户免费WiFi", nameKo: "고베 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["KOBE_Free_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Kobe city WiFi.",
  },
  {
    spotId: "jp-okinawa-wifi", name: "Okinawa Free Wi-Fi", nameJa: "沖縄 Free Wi-Fi", nameZh: "冲绳免费WiFi", nameKo: "오키나와 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["Okinawa_Free_Wi-Fi", "Be.Okinawa Free Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Okinawa Prefecture WiFi.",
  },
  // ===== Japan Shops & Restaurants =====
  {
    spotId: "jp-aeon-wifi", name: "AEON Free Wi-Fi", nameJa: "イオン Free Wi-Fi", nameZh: "永旺免费WiFi", nameKo: "이온 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["AEON_Free_Wi-Fi", "AEON_MALL_Free_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "AEON / AEON Mall. 600+ locations.",
  },
  {
    spotId: "jp-uniqlo-wifi", name: "UNIQLO Free Wi-Fi", nameJa: "ユニクロ Free Wi-Fi", nameZh: "优衣库免费WiFi", nameKo: "유니클로 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["UNIQLO_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "UNIQLO flagship stores.",
  },
  {
    spotId: "jp-komeda-wifi", name: "Komeda Coffee Wi-Fi", nameJa: "コメダ珈琲 Wi-Fi", nameZh: "Komeda咖啡WiFi", nameKo: "코메다 커피 WiFi",
    airportCode: "", country: "JP", ssids: ["Komeda_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Komeda Coffee. 900+ locations.",
  },
  {
    spotId: "jp-mos-wifi", name: "MOS BURGER Free Wi-Fi", nameJa: "モスバーガー Free Wi-Fi", nameZh: "摩斯汉堡免费WiFi", nameKo: "모스버거 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["MOS_BURGER_Free_Wi-Fi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "MOS BURGER. 1300+ locations.",
  },
  {
    spotId: "jp-ministop-wifi", name: "MINISTOP Free Wi-Fi", nameJa: "ミニストップ Free Wi-Fi", nameZh: "迷你岛免费WiFi", nameKo: "미니스톱 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["MINISTOP_Wi-Fi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "MINISTOP convenience store.",
  },
  {
    spotId: "jp-gusto-wifi", name: "Gusto Free Wi-Fi", nameJa: "ガスト Free Wi-Fi", nameZh: "Gusto免费WiFi", nameKo: "가스토 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["skylark_free_wifi", ".Wi-Fi(skylark)"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Gusto / Skylark group (Bamiyan, Jonathan's).",
  },
  {
    spotId: "jp-japan-wifi", name: "Japan Connected Free Wi-Fi", nameJa: "Japan Connected Free Wi-Fi", nameZh: "日本连接免费WiFi", nameKo: "재팬 커넥티드 무료 WiFi",
    airportCode: "", country: "JP", ssids: ["Japan_Free_Wi-Fi", "FREE_Wi-Fi_JAPAN"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [
      { fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 },
    ], postFillActions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree", "#terms"], action: "check", delayMs: 300 },
      { description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "NTT-BP. 200,000+ spots nationwide.",
  },
  // ========== OVERSEAS EXPANSION (v7) ==========
  // US Airports (8)
  {
    spotId: "us-lax-wifi", name: "Los Angeles International Airport", nameJa: "ロサンゼルス国際空港", nameZh: "洛杉矶国际机场", nameKo: "로스앤젤레스 국제공항",
    airportCode: "LAX", country: "US", ssids: ["_Free LAX WiFi", "LAX Free WiFi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "LAX free WiFi. All terminals.",
  },
  {
    spotId: "us-jfk-wifi", name: "John F. Kennedy International Airport", nameJa: "ジョン・F・ケネディ国際空港", nameZh: "肯尼迪国际机场", nameKo: "JFK 국제공항",
    airportCode: "JFK", country: "US", ssids: ["_Free JFK WiFi", "FreeJFKWiFi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "JFK free WiFi.",
  },
  {
    spotId: "us-sfo-wifi", name: "San Francisco International Airport", nameJa: "サンフランシスコ国際空港", nameZh: "旧金山国际机场", nameKo: "샌프란시스코 국제공항",
    airportCode: "SFO", country: "US", ssids: ["SFO FREE WIFI", "#SFO FREE WIFI"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "SFO free WiFi.",
  },
  {
    spotId: "us-ord-wifi", name: "O'Hare International Airport", nameJa: "オヘア国際空港", nameZh: "奥黑尔国际机场", nameKo: "오헤어 국제공항",
    airportCode: "ORD", country: "US", ssids: ["_Free ORD WiFi", "ohare free wifi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Chicago O'Hare.",
  },
  {
    spotId: "us-atl-wifi", name: "Hartsfield-Jackson Atlanta Airport", nameJa: "アトランタ国際空港", nameZh: "亚特兰大机场", nameKo: "애틀랜타 국제공항",
    airportCode: "ATL", country: "US", ssids: ["ATL WiFi", "ATL FREE WIFI"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Atlanta airport.",
  },
  {
    spotId: "us-dfw-wifi", name: "Dallas/Fort Worth International Airport", nameJa: "ダラス国際空港", nameZh: "达拉斯机场", nameKo: "댈러스 국제공항",
    airportCode: "DFW", country: "US", ssids: ["DFW Free WiFi", "DFW WiFi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "DFW airport.",
  },
  {
    spotId: "us-sea-wifi", name: "Seattle-Tacoma International Airport", nameJa: "シアトル国際空港", nameZh: "西雅图机场", nameKo: "시애틀 국제공항",
    airportCode: "SEA", country: "US", ssids: ["SEA Free WiFi", "Free SEA WiFi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Sea-Tac airport.",
  },
  {
    spotId: "us-mia-wifi", name: "Miami International Airport", nameJa: "マイアミ国際空港", nameZh: "迈阿密国际机场", nameKo: "마이애미 국제공항",
    airportCode: "MIA", country: "US", ssids: ["MIA Free WiFi", "_Free MIA WiFi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [
      { description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },
      { description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 },
    ], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Miami airport.",
  },
  // TH (5)
  {
    spotId: "th-dmk-wifi", name: "Don Mueang International Airport", nameJa: "ドンムアン国際空港", nameZh: "廊曼国际机场", nameKo: "돈무앙 국제공항",
    airportCode: "DMK", country: "TH", ssids: [".TrueAirport Free WiFi", "Airport Free WiFi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Don Mueang LCC terminal.",
  },
  {
    spotId: "th-cnx-wifi", name: "Chiang Mai International Airport", nameJa: "チェンマイ国際空港", nameZh: "清迈国际机场", nameKo: "치앙마이 국제공항",
    airportCode: "CNX", country: "TH", ssids: ["Airport Free WiFi", ".TrueAirport Free WiFi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Chiang Mai airport.",
  },
  {
    spotId: "th-hkt-wifi", name: "Phuket International Airport", nameJa: "プーケット国際空港", nameZh: "普吉国际机场", nameKo: "푸켓 국제공항",
    airportCode: "HKT", country: "TH", ssids: ["Airport Free WiFi", "HKT-Free-WiFi"], portalType: "registration", tier: "free",
    patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Phuket airport.",
  },
  {
    spotId: "th-bts-wifi", name: "BTS SkyTrain Free WiFi", nameJa: "BTSスカイトレイン Wi-Fi", nameZh: "BTS轻轨免费WiFi", nameKo: "BTS 스카이트레인 WiFi",
    airportCode: "", country: "TH", ssids: [".BTS-SkyTrain", "BTS Free WiFi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Bangkok BTS SkyTrain.",
  },
  {
    spotId: "th-mrt-wifi", name: "MRT Bangkok Free WiFi", nameJa: "MRTバンコク Wi-Fi", nameZh: "MRT曼谷免费WiFi", nameKo: "MRT 방콕 WiFi",
    airportCode: "", country: "TH", ssids: [".MRT Free WiFi", "MRT-Free-WiFi"], portalType: "agree_only", tier: "free",
    patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } },
    notes: "Bangkok MRT subway.",
  },
  // VN (3)
  { spotId: "vn-han-wifi", name: "Noi Bai International Airport", nameJa: "ノイバイ国際空港", nameZh: "内排国际机场", nameKo: "노이바이 국제공항", airportCode: "HAN", country: "VN", ssids: ["Noibai-Airport-Free-Wifi", "Airport-Free-WiFi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Hanoi airport." },
  { spotId: "vn-dad-wifi", name: "Da Nang International Airport", nameJa: "ダナン国際空港", nameZh: "岘港国际机场", nameKo: "다낭 국제공항", airportCode: "DAD", country: "VN", ssids: ["DAD-Airport-Free-Wifi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Da Nang airport." },
  { spotId: "vn-cxr-wifi", name: "Cam Ranh International Airport", nameJa: "カムラン国際空港", nameZh: "金兰国际机场", nameKo: "캄란 국제공항", airportCode: "CXR", country: "VN", ssids: ["CXR-Airport-Free-Wifi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Nha Trang / Cam Ranh." },
  // ID (3)
  { spotId: "id-dps-wifi", name: "Ngurah Rai International Airport (Bali)", nameJa: "ングラライ国際空港（バリ）", nameZh: "巴厘岛机场", nameKo: "발리 국제공항", airportCode: "DPS", country: "ID", ssids: ["@wifi.id", "Free-WiFi-Airport"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Bali airport." },
  { spotId: "id-sub-wifi", name: "Juanda International Airport", nameJa: "ジュアンダ国際空港", nameZh: "泗水机场", nameKo: "수라바야 국제공항", airportCode: "SUB", country: "ID", ssids: ["@wifi.id", "SUB-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Surabaya airport." },
  { spotId: "id-jog-wifi", name: "Yogyakarta International Airport", nameJa: "ジョグジャカルタ国際空港", nameZh: "日惹国际机场", nameKo: "족자카르타 국제공항", airportCode: "YIA", country: "ID", ssids: ["@wifi.id", "YIA-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Yogyakarta airport." },
  // PH (2)
  { spotId: "ph-ceb-wifi", name: "Mactan-Cebu International Airport", nameJa: "マクタン・セブ国際空港", nameZh: "宿务机场", nameKo: "세부 국제공항", airportCode: "CEB", country: "PH", ssids: ["MCIA Free WiFi", "CEB-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Cebu airport." },
  { spotId: "ph-crk-wifi", name: "Clark International Airport", nameJa: "クラーク国際空港", nameZh: "克拉克机场", nameKo: "클라크 국제공항", airportCode: "CRK", country: "PH", ssids: ["CRK Free WiFi", "Clark-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Clark airport." },
  // MY (3)
  { spotId: "my-pen-wifi", name: "Penang International Airport", nameJa: "ペナン国際空港", nameZh: "槟城国际机场", nameKo: "페낭 국제공항", airportCode: "PEN", country: "MY", ssids: ["KLIA Free WiFi", "PEN-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Penang airport." },
  { spotId: "my-bki-wifi", name: "Kota Kinabalu International Airport", nameJa: "コタキナバル国際空港", nameZh: "亚庇国际机场", nameKo: "코타키나발루 국제공항", airportCode: "BKI", country: "MY", ssids: ["KLIA Free WiFi", "BKI-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Kota Kinabalu airport." },
  { spotId: "my-lrt-wifi", name: "KL Rapid Transit WiFi", nameJa: "KL高速鉄道 Wi-Fi", nameZh: "吉隆坡轻轨WiFi", nameKo: "KL 경전철 WiFi", airportCode: "", country: "MY", ssids: ["RapidKL-Free-WiFi", "RapidKL Free WiFi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "KL LRT/MRT/Monorail." },
  // SG (1)
  { spotId: "sg-wireless-sg", name: "Wireless@SG (MRT/Public)", nameJa: "Wireless@SG (MRT/公共)", nameZh: "Wireless@SG (地铁/公共)", nameKo: "Wireless@SG (MRT/공공)", airportCode: "", country: "SG", ssids: ["Wireless@SG", "Wireless@SGx"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Singapore nationwide free WiFi." },
  // HK (2)
  { spotId: "hk-mtr-wifi", name: "MTR Free Wi-Fi", nameJa: "MTR フリーWi-Fi", nameZh: "MTR免费WiFi", nameKo: "MTR 무료 WiFi", airportCode: "", country: "HK", ssids: ["MTR Free Wi-Fi", "MTR-Free-WiFi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Hong Kong MTR subway." },
  { spotId: "hk-govt-wifi", name: "Wi-Fi.HK (Government)", nameJa: "Wi-Fi.HK（政府）", nameZh: "Wi-Fi.HK（政府）", nameKo: "Wi-Fi.HK (정부)", airportCode: "", country: "HK", ssids: ["Wi-Fi.HK via PCCW", "Wi-Fi.HK via HKT", "freegovwifi-e"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "HK government free WiFi." },
  // TW (3)
  { spotId: "tw-khh-wifi", name: "Kaohsiung International Airport", nameJa: "高雄国際空港", nameZh: "高雄国际机场", nameKo: "가오슝 국제공항", airportCode: "KHH", country: "TW", ssids: ["KHH Airport Free WiFi", "KHH-Free-WiFi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Kaohsiung airport." },
  { spotId: "tw-itaiwan-wifi", name: "iTaiwan Free WiFi", nameJa: "iTaiwan 無料WiFi", nameZh: "iTaiwan免费WiFi", nameKo: "iTaiwan 무료 WiFi", airportCode: "", country: "TW", ssids: ["iTaiwan", "iTaiwan-TP"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Taiwan government free WiFi. 30,000+ spots." },
  { spotId: "tw-kaohsiung-metro", name: "Kaohsiung Metro Free WiFi", nameJa: "高雄メトロ Wi-Fi", nameZh: "高雄地铁WiFi", nameKo: "가오슝 메트로 WiFi", airportCode: "", country: "TW", ssids: ["KRTC Free WiFi", "KRTC-Free-WiFi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Kaohsiung Metro/MRT." },
  // KR (4)
  { spotId: "kr-pus-wifi", name: "Gimhae International Airport", nameJa: "金海国際空港（釜山）", nameZh: "金海国际机场（釜山）", nameKo: "김해국제공항 (부산)", airportCode: "PUS", country: "KR", ssids: ["AirportWiFi", "PUS Free WiFi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Busan Gimhae airport." },
  { spotId: "kr-cju-wifi", name: "Jeju International Airport", nameJa: "済州国際空港", nameZh: "济州国际机场", nameKo: "제주국제공항", airportCode: "CJU", country: "KR", ssids: ["AirportWiFi", "CJU Free WiFi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Jeju Island airport." },
  { spotId: "kr-busan-metro", name: "Busan Metro Free WiFi", nameJa: "釜山メトロ Wi-Fi", nameZh: "釜山地铁WiFi", nameKo: "부산 지하철 WiFi", airportCode: "", country: "KR", ssids: ["Busan Metro WiFi", "BusanMetro-Free-WiFi"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Busan subway." },
  { spotId: "kr-public-wifi", name: "Korea Public WiFi", nameJa: "韓国公共WiFi", nameZh: "韩国公共WiFi", nameKo: "공공와이파이", airportCode: "", country: "KR", ssids: ["Public WiFi Free", "PublicWiFi@KR"], portalType: "agree_only", tier: "free", patternData: { agreeOnly: { actions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Connect", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Korean government public WiFi." },
  // CN (5)
  { spotId: "cn-szx-wifi", name: "Shenzhen Bao'an Airport", nameJa: "深セン宝安空港", nameZh: "深圳宝安机场", nameKo: "선전 바오안 공항", airportCode: "SZX", country: "CN", ssids: ["AirportWiFi", "SZX-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Shenzhen airport." },
  { spotId: "cn-ctu-wifi", name: "Chengdu Tianfu Airport", nameJa: "成都天府空港", nameZh: "成都天府机场", nameKo: "청두 톈푸 공항", airportCode: "TFU", country: "CN", ssids: ["AirportWiFi", "CTU-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Chengdu new airport." },
  { spotId: "cn-ckg-wifi", name: "Chongqing Jiangbei Airport", nameJa: "重慶江北空港", nameZh: "重庆江北机场", nameKo: "충칭 장베이 공항", airportCode: "CKG", country: "CN", ssids: ["AirportWiFi", "CKG-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Chongqing airport." },
  { spotId: "cn-xmn-wifi", name: "Xiamen Gaoqi Airport", nameJa: "厦門高崎空港", nameZh: "厦门高崎机场", nameKo: "샤먼 가오치 공항", airportCode: "XMN", country: "CN", ssids: ["AirportWiFi", "XMN-Free-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "Xiamen airport." },
  { spotId: "cn-highspeed-wifi", name: "China High-Speed Rail WiFi", nameJa: "中国高速鉄道 Wi-Fi", nameZh: "中国高铁WiFi", nameKo: "중국 고속철도 WiFi", airportCode: "", country: "CN", ssids: ["CRNet-CRH", "highspeed-WiFi"], portalType: "registration", tier: "free", patternData: { registration: { fields: [{ fieldId: "email", selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: "profile.email", inputMethod: "set_value", delayMs: 500 }], postFillActions: [{ description: "Accept terms", selector: "input[type='checkbox']", fallbackSelectors: [".agree"], action: "check", delayMs: 300 },{ description: "Submit", selector: "button[type='submit'], input[type='submit']", fallbackSelectors: ["button:last-of-type"], action: "click", delayMs: 500 }], successCondition: { method: "http_probe", value: "http://connectivitycheck.gstatic.com/generate_204" } } }, notes: "China Railway high-speed." },
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
        nameZh: p.nameZh,
        nameKo: p.nameKo,
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
          name: p.name,
          nameJa: p.nameJa,
          nameZh: p.nameZh,
          nameKo: p.nameKo,
          patternData: p.patternData,
          ssids: p.ssids,
          tier: p.tier,
          notes: p.notes,
          updatedAt: now,
        },
      });
    }

    await db.insert(patternBundleVersions).values({
      version: 7,
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
