import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { portalPatterns, patternBundleVersions } from "@/lib/db/schema";

const SEED_PATTERNS = [
  {
    "spotId": "icn-airport-wifi",
    "name": "Incheon International Airport",
    "nameJa": "仁川国際空港",
    "nameZh": "仁川国际机场",
    "nameKo": "인천국제공항",
    "airportCode": "ICN",
    "country": "KR",
    "ssids": [
      "AirportWiFi",
      "ICN Free WiFi",
      "NAVER - Free WiFi Service"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "ICN may vary between terminals. Some use agree-only, some require email."
  },
  {
    "spotId": "sin-changi-wifi",
    "name": "Changi Airport",
    "nameJa": "チャンギ空港",
    "nameZh": "樟宜机场",
    "nameKo": "창이공항",
    "airportCode": "SIN",
    "country": "SG",
    "ssids": [
      "#WiFi@Changi",
      "WiFiChangi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "hnl-free-wifi",
    "name": "Daniel K. Inouye International Airport",
    "nameJa": "ダニエル・K・イノウエ国際空港 (ハワイ)",
    "nameZh": "丹尼尔·K·井上国际机场（夏威夷）",
    "nameKo": "대니얼 K. 이노우에 국제공항 (하와이)",
    "airportCode": "HNL",
    "country": "US",
    "ssids": [
      "HNL Free WiFi",
      "HNLFreeWiFi",
      "Boingo Hotspot"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": null
  },
  {
    "spotId": "hkg-airport-wifi",
    "name": "Hong Kong International Airport",
    "nameJa": "香港国際空港",
    "nameZh": "香港国际机场",
    "nameKo": "홍콩국제공항",
    "airportCode": "HKG",
    "country": "HK",
    "ssids": [
      "#HKAirport Free WiFi",
      "HKAirportFreeWifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": null
  },
  {
    "spotId": "tpe-taoyuan-wifi",
    "name": "Taoyuan International Airport",
    "nameJa": "桃園国際空港",
    "nameZh": "桃园国际机场",
    "nameKo": "타오위안국제공항",
    "airportCode": "TPE",
    "country": "TW",
    "ssids": [
      "Airport_Free_WiFi",
      "TPE-Free.WiFi"
    ],
    "portalType": "registration",
    "tier": "premium",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "bkk-suvarnabhumi-wifi",
    "name": "Suvarnabhumi Airport",
    "nameJa": "スワンナプーム空港",
    "nameZh": "素万那普机场",
    "nameKo": "수완나품공항",
    "airportCode": "BKK",
    "country": "TH",
    "ssids": [
      "AOTFreeWiFibyNT",
      "AOT Airport Free Wi-Fi by NT",
      ".AOTFreeWiFi"
    ],
    "portalType": "registration",
    "tier": "premium",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "kr-gimpo-wifi",
    "name": "Gimpo International Airport",
    "nameJa": "金浦国際空港",
    "nameZh": "金浦国际机场",
    "nameKo": "김포국제공항",
    "airportCode": "GMP",
    "country": "KR",
    "ssids": [
      "GimpoAirport_FreeWiFi",
      "GMP_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": null
  },
  {
    "spotId": "kr-ktx-wifi",
    "name": "KTX (Korea Train eXpress)",
    "nameJa": "KTX（韓国高速鉄道）",
    "nameZh": "KTX（韩国高速铁路）",
    "nameKo": "KTX (한국고속철도)",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "KTX_WiFi",
      "KTX_Free_WiFi",
      "KORAIL_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "kr-seoul-metro-wifi",
    "name": "Seoul Metro T WiFi Zone",
    "nameJa": "ソウル地下鉄 T WiFi",
    "nameZh": "首尔地铁 T WiFi",
    "nameKo": "서울지하철 T WiFi Zone",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "T_WiFi_Zone",
      "T wifi zone",
      "Seoul_Metro_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "tw-taipei-metro-wifi",
    "name": "Taipei Metro (TPE-Free)",
    "nameJa": "台北MRT（TPE-Free）",
    "nameZh": "台北捷运（TPE-Free）",
    "nameKo": "타이베이 MRT (TPE-Free)",
    "airportCode": null,
    "country": "TW",
    "ssids": [
      "TPE-Free",
      "Taipei_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": null
  },
  {
    "spotId": "tw-thsr-wifi",
    "name": "Taiwan High Speed Rail",
    "nameJa": "台湾高速鉄道（高鉄）",
    "nameZh": "台湾高速铁路（高铁）",
    "nameKo": "타이완 고속철도 (고철)",
    "airportCode": null,
    "country": "TW",
    "ssids": [
      "THSR_WiFi",
      "THSR_Free_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "cn-pek-wifi",
    "name": "Beijing Capital Airport",
    "nameJa": "北京首都空港",
    "nameZh": "北京首都国际机场",
    "nameKo": "베이징수도공항",
    "airportCode": "PEK",
    "country": "CN",
    "ssids": [
      "Airport-Free-WiFi",
      "PEK_Free_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "May require phone number in some terminals. Session varies."
  },
  {
    "spotId": "cn-pvg-wifi",
    "name": "Shanghai Pudong Airport",
    "nameJa": "上海浦東空港",
    "nameZh": "上海浦东国际机场",
    "nameKo": "상하이푸둥공항",
    "airportCode": "PVG",
    "country": "CN",
    "ssids": [
      "PVG-Free-WiFi",
      "#AirportWiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "May require WeChat or phone number verification."
  },
  {
    "spotId": "cn-can-wifi",
    "name": "Guangzhou Baiyun Airport",
    "nameJa": "広州白雲空港",
    "nameZh": "广州白云国际机场",
    "nameKo": "광저우바이윈공항",
    "airportCode": "CAN",
    "country": "CN",
    "ssids": [
      "CAN-Airport-WiFi",
      "BAIYUN_Free_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "May require WeChat or phone number verification."
  },
  {
    "spotId": "my-klia-wifi",
    "name": "KLIA (Kuala Lumpur International Airport)",
    "nameJa": "クアラルンプール国際空港",
    "nameZh": "吉隆坡国际机场",
    "nameKo": "쿠알라룸푸르국제공항",
    "airportCode": "KUL",
    "country": "MY",
    "ssids": [
      "KLIA_Free_WiFi",
      "@KLIA_WiFi",
      "KLIA2WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "vn-sgn-wifi",
    "name": "Tan Son Nhat International Airport",
    "nameJa": "タンソンニャット国際空港",
    "nameZh": "新山一国际机场",
    "nameKo": "떤선녓국제공항",
    "airportCode": "SGN",
    "country": "VN",
    "ssids": [
      "TSN_Airport_WiFi",
      "SGN_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": null
  },
  {
    "spotId": "ph-mnl-wifi",
    "name": "Ninoy Aquino International Airport",
    "nameJa": "ニノイ・アキノ国際空港",
    "nameZh": "尼诺伊·阿基诺国际机场",
    "nameKo": "니노이아키노국제공항",
    "airportCode": "MNL",
    "country": "PH",
    "ssids": [
      "NAIA_Free_WiFi",
      "MNL_Airport_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "id-cgk-wifi",
    "name": "Soekarno-Hatta International Airport",
    "nameJa": "スカルノ・ハッタ国際空港",
    "nameZh": "苏加诺-哈达国际机场",
    "nameKo": "수카르노하타국제공항",
    "airportCode": "CGK",
    "country": "ID",
    "ssids": [
      "@wifi.id",
      "CGK_Airport_WiFi",
      "FreeWiFi_SHIA"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": null
  },
  {
    "spotId": "jp-starbucks-wifi",
    "name": "Starbucks Japan",
    "nameJa": "スターバックス",
    "nameZh": "星巴克",
    "nameKo": "스타벅스",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "at_STARBUCKS_Wi2"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Wi2 operated. Requires pre-registration or SNS login. Session: 1 hour."
  },
  {
    "spotId": "jp-mcdonalds-wifi",
    "name": "McDonald's Japan",
    "nameJa": "マクドナルド",
    "nameZh": "麦当劳",
    "nameKo": "맥도날드",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "00_MCD-FREE-WIFI"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Email or SNS registration required. Session: 60 min."
  },
  {
    "spotId": "jp-lawson-wifi",
    "name": "Lawson Free WiFi",
    "nameJa": "ローソン",
    "nameZh": "罗森",
    "nameKo": "로손",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "LAWSON_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Email registration valid for 1 year. Session: 60 min, 5 times/day."
  },
  {
    "spotId": "jp-jr-east-wifi",
    "name": "JR East Free WiFi",
    "nameJa": "JR東日本",
    "nameZh": "JR东日本",
    "nameKo": "JR 동일본",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "JR-EAST_FREE_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "NTT-BP operated. Email only, no SNS login. Session: 3 hours."
  },
  {
    "spotId": "jp-metro-wifi",
    "name": "Tokyo Metro Free WiFi",
    "nameJa": "東京メトロ",
    "nameZh": "东京地铁",
    "nameKo": "도쿄메트로",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Metro_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "NTT-BP operated. Email or SNS login. Session: 3 hours. Station WiFi only."
  },
  {
    "spotId": "jp-toei-wifi",
    "name": "Toei Subway Free WiFi",
    "nameJa": "都営地下鉄",
    "nameZh": "都营地铁",
    "nameKo": "도에이 지하철",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Toei_Subway_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "NTT-BP operated. Same platform as Tokyo Metro and JR East."
  },
  {
    "spotId": "jp-narita-wifi",
    "name": "Narita Airport",
    "nameJa": "成田空港",
    "nameZh": "成田机场",
    "nameKo": "나리타공항",
    "airportCode": "NRT",
    "country": "JP",
    "ssids": [
      "FreeWiFi-NARITA"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "No registration needed. Just agree to terms. Available at T1, T2, T3."
  },
  {
    "spotId": "jp-haneda-wifi",
    "name": "Haneda Airport",
    "nameJa": "羽田空港",
    "nameZh": "羽田机场",
    "nameKo": "하네다공항",
    "airportCode": "HND",
    "country": "JP",
    "ssids": [
      "HANEDA-FREE-WIFI"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Wi2 operated. Session: ~5 hours. Signal may be weak in some areas."
  },
  {
    "spotId": "jp-kix-wifi",
    "name": "Kansai International Airport",
    "nameJa": "関西国際空港",
    "nameZh": "关西国际机场",
    "nameKo": "간사이국제공항",
    "airportCode": "KIX",
    "country": "JP",
    "ssids": [
      "FreeWiFi-KIX"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "No registration needed. Available at T1, T2."
  },
  {
    "spotId": "jp-fuk-wifi",
    "name": "Fukuoka Airport",
    "nameJa": "福岡空港",
    "nameZh": "福冈机场",
    "nameKo": "후쿠오카공항",
    "airportCode": "FUK",
    "country": "JP",
    "ssids": [
      "FUK_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "No registration needed. Domestic and international terminals."
  },
  {
    "spotId": "jp-ngo-wifi",
    "name": "Chubu Centrair International Airport",
    "nameJa": "中部国際空港",
    "nameZh": "中部国际机场",
    "nameKo": "주부국제공항",
    "airportCode": "NGO",
    "country": "JP",
    "ssids": [
      "centrair-free-wifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "No registration needed. Available throughout the airport."
  },
  {
    "spotId": "jp-tullys-wifi",
    "name": "Tully's Coffee WiFi",
    "nameJa": "タリーズコーヒー",
    "nameZh": "塔利咖啡",
    "nameKo": "탈리스커피",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "tullys_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Wi2 operated. Email registration. Session: 60 min."
  },
  {
    "spotId": "jp-doutor-wifi",
    "name": "Doutor Coffee WiFi",
    "nameJa": "ドトールコーヒー Free WiFi",
    "nameZh": "罗多伦咖啡",
    "nameKo": "도토루커피",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "DOUTOR_FREE_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Wi2 operated. Email registration. Session: 60 min."
  },
  {
    "spotId": "jp-dwifi",
    "name": "d Wi-Fi (NTT docomo)",
    "nameJa": "d Wi-Fi (docomo)",
    "nameZh": "d Wi-Fi (docomo)",
    "nameKo": "d Wi-Fi (docomo)",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "0000docomo"
    ],
    "portalType": "registration",
    "tier": "premium",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Requires d-account (docomo ID). Available at convenience stores, cafes, stations."
  },
  {
    "spotId": "jp-au-wifi",
    "name": "au Wi-Fi",
    "nameJa": "au Wi-Fi",
    "nameZh": "au Wi-Fi",
    "nameKo": "au Wi-Fi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "au_Wi-Fi",
      "au_Wi-Fi2"
    ],
    "portalType": "registration",
    "tier": "premium",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Requires au ID. Available at cafes, stations, shopping centers."
  },
  {
    "spotId": "jp-softbank-wifi",
    "name": "SoftBank Wi-Fi Spot",
    "nameJa": "ソフトバンクWi-Fi",
    "nameZh": "软银Wi-Fi",
    "nameKo": "소프트뱅크 Wi-Fi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "0002softbank",
      "mobilepoint"
    ],
    "portalType": "registration",
    "tier": "premium",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Requires SoftBank/Y!mobile account. Available at cafes, stations, airports."
  },
  {
    "spotId": "jp-cts-wifi",
    "name": "New Chitose Airport",
    "nameJa": "新千歳空港",
    "nameZh": "新千岁机场",
    "nameKo": "신치토세공항",
    "airportCode": "CTS",
    "country": "JP",
    "ssids": [
      "New_Chitose_Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at New Chitose Airport, Hokkaido. No registration required."
  },
  {
    "spotId": "jp-sdj-wifi",
    "name": "Sendai Airport",
    "nameJa": "仙台空港",
    "nameZh": "仙台机场",
    "nameKo": "센다이공항",
    "airportCode": "SDJ",
    "country": "JP",
    "ssids": [
      "Sendai-Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Sendai Airport."
  },
  {
    "spotId": "jp-nrt-t3-wifi",
    "name": "Narita Airport Terminal 3",
    "nameJa": "成田空港 第3ターミナル",
    "nameZh": "成田机场第3航站楼",
    "nameKo": "나리타공항 제3터미널",
    "airportCode": "NRT",
    "country": "JP",
    "ssids": [
      "FreeWiFi-NARITA_T3"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "LCC terminal at Narita. Same NTT-BP system."
  },
  {
    "spotId": "jp-itm-wifi",
    "name": "Osaka Itami Airport",
    "nameJa": "大阪伊丹空港",
    "nameZh": "大阪伊丹机场",
    "nameKo": "오사카 이타미공항",
    "airportCode": "ITM",
    "country": "JP",
    "ssids": [
      "Osaka-Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Domestic flights terminal. Osaka Itami Airport free WiFi."
  },
  {
    "spotId": "jp-oka-wifi",
    "name": "Naha Airport",
    "nameJa": "那覇空港",
    "nameZh": "那霸机场",
    "nameKo": "나하공항",
    "airportCode": "OKA",
    "country": "JP",
    "ssids": [
      "NAHA_AIRPORT_FREE_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Naha Airport, Okinawa. Free WiFi."
  },
  {
    "spotId": "jp-kmj-wifi",
    "name": "Kumamoto Airport",
    "nameJa": "熊本空港",
    "nameZh": "熊本机场",
    "nameKo": "구마모토공항",
    "airportCode": "KMJ",
    "country": "JP",
    "ssids": [
      "Kumamoto-Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kumamoto Airport free WiFi."
  },
  {
    "spotId": "jp-hij-wifi",
    "name": "Hiroshima Airport",
    "nameJa": "広島空港",
    "nameZh": "广岛机场",
    "nameKo": "히로시마공항",
    "airportCode": "HIJ",
    "country": "JP",
    "ssids": [
      "Hiroshima-Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Hiroshima Airport free WiFi."
  },
  {
    "spotId": "jp-kmq-wifi",
    "name": "Komatsu Airport",
    "nameJa": "小松空港",
    "nameZh": "小松机场",
    "nameKo": "고마쓰공항",
    "airportCode": "KMQ",
    "country": "JP",
    "ssids": [
      "Komatsu-Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Komatsu Airport (Kanazawa area) free WiFi."
  },
  {
    "spotId": "jp-kag-wifi",
    "name": "Kagoshima Airport",
    "nameJa": "鹿児島空港",
    "nameZh": "鹿儿岛机场",
    "nameKo": "가고시마공항",
    "airportCode": "KOJ",
    "country": "JP",
    "ssids": [
      "Kagoshima-Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kagoshima Airport free WiFi."
  },
  {
    "spotId": "jp-matsuyama-wifi",
    "name": "Matsuyama Airport",
    "nameJa": "松山空港",
    "nameZh": "松山机场",
    "nameKo": "마쓰야마공항",
    "airportCode": "MYJ",
    "country": "JP",
    "ssids": [
      "Matsuyama-Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Matsuyama Airport, Ehime free WiFi."
  },
  {
    "spotId": "jp-shinkansen-wifi",
    "name": "Shinkansen Free WiFi",
    "nameJa": "新幹線 Free Wi-Fi",
    "nameZh": "新干线免费WiFi",
    "nameKo": "신칸센 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Shinkansen_Free_Wi-Fi",
      "Shinkansen Free Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Available on Tokaido/Sanyo/Tohoku Shinkansen. Email registration required."
  },
  {
    "spotId": "jp-jr-west-wifi",
    "name": "JR-WEST FREE Wi-Fi",
    "nameJa": "JR西日本 Free Wi-Fi",
    "nameZh": "JR西日本免费WiFi",
    "nameKo": "JR서일본 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "JR-WEST_FREE_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Available at major JR West stations (Osaka, Kyoto, Hiroshima, etc.). 30 min sessions."
  },
  {
    "spotId": "jp-osaka-metro-wifi",
    "name": "Osaka Metro Free Wi-Fi",
    "nameJa": "大阪メトロ Free Wi-Fi",
    "nameZh": "大阪地铁免费WiFi",
    "nameKo": "오사카 메트로 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Osaka_Metro_Free_Wi-Fi",
      "OSAKA_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "All Osaka Metro stations. 30 min sessions."
  },
  {
    "spotId": "jp-kyoto-wifi",
    "name": "KYOTO Wi-Fi",
    "nameJa": "KYOTO Wi-Fi",
    "nameZh": "京都WiFi",
    "nameKo": "교토 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "KYOTO_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Kyoto city free WiFi. Available at bus stops, tourist spots, subway stations."
  },
  {
    "spotId": "jp-tokyo-wifi",
    "name": "FREE Wi-Fi & TOKYO",
    "nameJa": "FREE Wi-Fi & TOKYO",
    "nameZh": "东京免费WiFi",
    "nameKo": "도쿄 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "FREE_Wi-Fi_and_TOKYO"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Tokyo Metropolitan Government free WiFi. Tourist spots, parks, government buildings."
  },
  {
    "spotId": "jp-yokohama-wifi",
    "name": "YOKOHAMA Free Wi-Fi",
    "nameJa": "よこはまFree Wi-Fi",
    "nameZh": "横滨免费WiFi",
    "nameKo": "요코하마 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "YOKOHAMA_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Yokohama city free WiFi. Stations, tourist areas, Chinatown."
  },
  {
    "spotId": "jp-nagoya-wifi",
    "name": "Nagoya Free Wi-Fi",
    "nameJa": "なごや Free Wi-Fi",
    "nameZh": "名古屋免费WiFi",
    "nameKo": "나고야 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Nagoya_Free_Wi-Fi",
      "NAGOYA-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Nagoya city free WiFi. Subway stations, tourist spots."
  },
  {
    "spotId": "jp-sapporo-wifi",
    "name": "Sapporo City Wi-Fi",
    "nameJa": "Sapporo City Wi-Fi",
    "nameZh": "札幌市WiFi",
    "nameKo": "삿포로 시티 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Sapporo_City_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Sapporo city free WiFi. Subway stations, tourist spots."
  },
  {
    "spotId": "jp-fukuoka-wifi",
    "name": "Fukuoka City Wi-Fi",
    "nameJa": "Fukuoka City Wi-Fi",
    "nameZh": "福冈市WiFi",
    "nameKo": "후쿠오카 시티 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Fukuoka_City_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Fukuoka city free WiFi. Bus stops, tourist areas, subway stations."
  },
  {
    "spotId": "jp-kobe-wifi",
    "name": "KOBE Free Wi-Fi",
    "nameJa": "KOBE Free Wi-Fi",
    "nameZh": "神户免费WiFi",
    "nameKo": "고베 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "KOBE_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Kobe city free WiFi. Port area, Sannomiya, tourist spots."
  },
  {
    "spotId": "jp-okinawa-wifi",
    "name": "Okinawa Free Wi-Fi",
    "nameJa": "沖縄 Free Wi-Fi",
    "nameZh": "冲绳免费WiFi",
    "nameKo": "오키나와 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Okinawa_Free_Wi-Fi",
      "Be.Okinawa Free Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Okinawa Prefecture free WiFi. Hotels, tourist spots, monorail stations."
  },
  {
    "spotId": "jp-aeon-wifi",
    "name": "AEON Free Wi-Fi",
    "nameJa": "イオン Free Wi-Fi",
    "nameZh": "永旺免费WiFi",
    "nameKo": "이온 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "AEON_MALL",
      "AEON_SC",
      "AEON",
      "AEON_Free_Wi-Fi",
      "AEON_MALL_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "AEON / AEON Mall free WiFi. 600+ shopping malls nationwide."
  },
  {
    "spotId": "jp-uniqlo-wifi",
    "name": "UNIQLO Free Wi-Fi",
    "nameJa": "ユニクロ Free Wi-Fi",
    "nameZh": "优衣库免费WiFi",
    "nameKo": "유니클로 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "UNIQLO_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "UNIQLO flagship stores. Agree-only portal."
  },
  {
    "spotId": "jp-komeda-wifi",
    "name": "Komeda Coffee Wi-Fi",
    "nameJa": "コメダ珈琲 Wi-Fi",
    "nameZh": "Komeda咖啡WiFi",
    "nameKo": "코메다 커피 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Komeda_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Komeda Coffee shops. 900+ locations. 60 min sessions."
  },
  {
    "spotId": "jp-mos-wifi",
    "name": "MOS BURGER Free Wi-Fi",
    "nameJa": "モスバーガー Free Wi-Fi",
    "nameZh": "摩斯汉堡免费WiFi",
    "nameKo": "모스버거 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "MOS_BURGER_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "MOS BURGER free WiFi. 1300+ locations."
  },
  {
    "spotId": "jp-ministop-wifi",
    "name": "MINISTOP Free Wi-Fi",
    "nameJa": "ミニストップ Free Wi-Fi",
    "nameZh": "迷你岛免费WiFi",
    "nameKo": "미니스톱 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "MINISTOP_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "MINISTOP convenience store free WiFi."
  },
  {
    "spotId": "jp-gusto-wifi",
    "name": "Gusto Free Wi-Fi",
    "nameJa": "ガスト Free Wi-Fi",
    "nameZh": "Gusto免费WiFi",
    "nameKo": "가스토 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "skylark_free_wifi",
      ".Wi-Fi(skylark)"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Gusto / Skylark group restaurants. Bamiyan, Jonathan's, etc. also use this SSID."
  },
  {
    "spotId": "jp-japan-wifi",
    "name": "Japan Connected Free Wi-Fi",
    "nameJa": "Japan Connected Free Wi-Fi",
    "nameZh": "日本连接免费WiFi",
    "nameKo": "재팬 커넥티드 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Japan_Free_Wi-Fi",
      "FREE_Wi-Fi_JAPAN"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "NTT-BP operated. Available at 200,000+ spots nationwide. Airports, stations, convenience stores, tourist spots."
  },
  {
    "spotId": "us-lax-wifi",
    "name": "Los Angeles International Airport",
    "nameJa": "ロサンゼルス国際空港",
    "nameZh": "洛杉矶国际机场",
    "nameKo": "로스앤젤레스 국제공항",
    "airportCode": "LAX",
    "country": "US",
    "ssids": [
      "_Free LAX WiFi",
      "LAX Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "LAX free WiFi. All terminals."
  },
  {
    "spotId": "us-jfk-wifi",
    "name": "John F. Kennedy International Airport",
    "nameJa": "ジョン・F・ケネディ国際空港",
    "nameZh": "肯尼迪国际机场",
    "nameKo": "JFK 국제공항",
    "airportCode": "JFK",
    "country": "US",
    "ssids": [
      "_Free JFK WiFi",
      "FreeJFKWiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "JFK free WiFi. All terminals."
  },
  {
    "spotId": "us-sfo-wifi",
    "name": "San Francisco International Airport",
    "nameJa": "サンフランシスコ国際空港",
    "nameZh": "旧金山国际机场",
    "nameKo": "샌프란시스코 국제공항",
    "airportCode": "SFO",
    "country": "US",
    "ssids": [
      "SFO FREE WIFI",
      "#SFO FREE WIFI"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "SFO free WiFi. All terminals."
  },
  {
    "spotId": "us-ord-wifi",
    "name": "O'Hare International Airport",
    "nameJa": "オヘア国際空港",
    "nameZh": "奥黑尔国际机场",
    "nameKo": "오헤어 국제공항",
    "airportCode": "ORD",
    "country": "US",
    "ssids": [
      "_Free ORD WiFi",
      "ohare free wifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Chicago O'Hare free WiFi."
  },
  {
    "spotId": "us-atl-wifi",
    "name": "Hartsfield-Jackson Atlanta Airport",
    "nameJa": "アトランタ国際空港",
    "nameZh": "亚特兰大机场",
    "nameKo": "애틀랜타 국제공항",
    "airportCode": "ATL",
    "country": "US",
    "ssids": [
      "ATL WiFi",
      "ATL FREE WIFI"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Atlanta airport free WiFi."
  },
  {
    "spotId": "us-dfw-wifi",
    "name": "Dallas/Fort Worth International Airport",
    "nameJa": "ダラス国際空港",
    "nameZh": "达拉斯机场",
    "nameKo": "댈러스 국제공항",
    "airportCode": "DFW",
    "country": "US",
    "ssids": [
      "DFW Free WiFi",
      "DFW WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "DFW free WiFi."
  },
  {
    "spotId": "us-sea-wifi",
    "name": "Seattle-Tacoma International Airport",
    "nameJa": "シアトル国際空港",
    "nameZh": "西雅图机场",
    "nameKo": "시애틀 국제공항",
    "airportCode": "SEA",
    "country": "US",
    "ssids": [
      "SEA Free WiFi",
      "Free SEA WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Sea-Tac free WiFi."
  },
  {
    "spotId": "us-mia-wifi",
    "name": "Miami International Airport",
    "nameJa": "マイアミ国際空港",
    "nameZh": "迈阿密国际机场",
    "nameKo": "마이애미 국제공항",
    "airportCode": "MIA",
    "country": "US",
    "ssids": [
      "MIA Free WiFi",
      "_Free MIA WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Miami airport free WiFi."
  },
  {
    "spotId": "th-dmk-wifi",
    "name": "Don Mueang International Airport",
    "nameJa": "ドンムアン国際空港",
    "nameZh": "廊曼国际机场",
    "nameKo": "돈무앙 국제공항",
    "airportCode": "DMK",
    "country": "TH",
    "ssids": [
      ".TrueAirport Free WiFi",
      "Airport Free WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Don Mueang (LCC terminal). True Corp operated."
  },
  {
    "spotId": "th-cnx-wifi",
    "name": "Chiang Mai International Airport",
    "nameJa": "チェンマイ国際空港",
    "nameZh": "清迈国际机场",
    "nameKo": "치앙마이 국제공항",
    "airportCode": "CNX",
    "country": "TH",
    "ssids": [
      "Airport Free WiFi",
      ".TrueAirport Free WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Chiang Mai airport."
  },
  {
    "spotId": "th-hkt-wifi",
    "name": "Phuket International Airport",
    "nameJa": "プーケット国際空港",
    "nameZh": "普吉国际机场",
    "nameKo": "푸켓 국제공항",
    "airportCode": "HKT",
    "country": "TH",
    "ssids": [
      "Airport Free WiFi",
      "HKT-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Phuket airport."
  },
  {
    "spotId": "th-bts-wifi",
    "name": "BTS SkyTrain Free WiFi",
    "nameJa": "BTSスカイトレイン Wi-Fi",
    "nameZh": "BTS轻轨免费WiFi",
    "nameKo": "BTS 스카이트레인 WiFi",
    "airportCode": null,
    "country": "TH",
    "ssids": [
      ".BTS-SkyTrain",
      "BTS Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Bangkok BTS SkyTrain stations."
  },
  {
    "spotId": "th-mrt-wifi",
    "name": "MRT Bangkok Free WiFi",
    "nameJa": "MRTバンコク Wi-Fi",
    "nameZh": "MRT曼谷免费WiFi",
    "nameKo": "MRT 방콕 WiFi",
    "airportCode": null,
    "country": "TH",
    "ssids": [
      ".MRT Free WiFi",
      "MRT-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Bangkok MRT subway stations."
  },
  {
    "spotId": "vn-han-wifi",
    "name": "Noi Bai International Airport",
    "nameJa": "ノイバイ国際空港",
    "nameZh": "内排国际机场",
    "nameKo": "노이바이 국제공항",
    "airportCode": "HAN",
    "country": "VN",
    "ssids": [
      "Noibai-Airport-Free-Wifi",
      "Airport-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Hanoi Noi Bai airport."
  },
  {
    "spotId": "vn-dad-wifi",
    "name": "Da Nang International Airport",
    "nameJa": "ダナン国際空港",
    "nameZh": "岘港国际机场",
    "nameKo": "다낭 국제공항",
    "airportCode": "DAD",
    "country": "VN",
    "ssids": [
      "DAD-Airport-Free-Wifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Da Nang airport."
  },
  {
    "spotId": "vn-cxr-wifi",
    "name": "Cam Ranh International Airport",
    "nameJa": "カムラン国際空港",
    "nameZh": "金兰国际机场",
    "nameKo": "캄란 국제공항",
    "airportCode": "CXR",
    "country": "VN",
    "ssids": [
      "CXR-Airport-Free-Wifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Nha Trang / Cam Ranh airport."
  },
  {
    "spotId": "id-dps-wifi",
    "name": "Ngurah Rai International Airport (Bali)",
    "nameJa": "ングラライ国際空港（バリ）",
    "nameZh": "巴厘岛机场",
    "nameKo": "발리 국제공항",
    "airportCode": "DPS",
    "country": "ID",
    "ssids": [
      "@wifi.id",
      "Free-WiFi-Airport"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Bali Denpasar airport. Telkom WiFi."
  },
  {
    "spotId": "id-sub-wifi",
    "name": "Juanda International Airport",
    "nameJa": "ジュアンダ国際空港",
    "nameZh": "泗水机场",
    "nameKo": "수라바야 국제공항",
    "airportCode": "SUB",
    "country": "ID",
    "ssids": [
      "@wifi.id",
      "SUB-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Surabaya airport."
  },
  {
    "spotId": "id-jog-wifi",
    "name": "Yogyakarta International Airport",
    "nameJa": "ジョグジャカルタ国際空港",
    "nameZh": "日惹国际机场",
    "nameKo": "족자카르타 국제공항",
    "airportCode": "YIA",
    "country": "ID",
    "ssids": [
      "@wifi.id",
      "YIA-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Yogyakarta airport."
  },
  {
    "spotId": "ph-ceb-wifi",
    "name": "Mactan-Cebu International Airport",
    "nameJa": "マクタン・セブ国際空港",
    "nameZh": "宿务机场",
    "nameKo": "세부 국제공항",
    "airportCode": "CEB",
    "country": "PH",
    "ssids": [
      "MCIA Free WiFi",
      "CEB-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Cebu airport."
  },
  {
    "spotId": "ph-crk-wifi",
    "name": "Clark International Airport",
    "nameJa": "クラーク国際空港",
    "nameZh": "克拉克机场",
    "nameKo": "클라크 국제공항",
    "airportCode": "CRK",
    "country": "PH",
    "ssids": [
      "CRK Free WiFi",
      "Clark-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Clark airport."
  },
  {
    "spotId": "my-pen-wifi",
    "name": "Penang International Airport",
    "nameJa": "ペナン国際空港",
    "nameZh": "槟城国际机场",
    "nameKo": "페낭 국제공항",
    "airportCode": "PEN",
    "country": "MY",
    "ssids": [
      "KLIA Free WiFi",
      "PEN-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Penang airport."
  },
  {
    "spotId": "my-bki-wifi",
    "name": "Kota Kinabalu International Airport",
    "nameJa": "コタキナバル国際空港",
    "nameZh": "亚庇国际机场",
    "nameKo": "코타키나발루 국제공항",
    "airportCode": "BKI",
    "country": "MY",
    "ssids": [
      "KLIA Free WiFi",
      "BKI-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Kota Kinabalu airport."
  },
  {
    "spotId": "my-lrt-wifi",
    "name": "KL Rapid Transit WiFi",
    "nameJa": "KL高速鉄道 Wi-Fi",
    "nameZh": "吉隆坡轻轨WiFi",
    "nameKo": "KL 경전철 WiFi",
    "airportCode": null,
    "country": "MY",
    "ssids": [
      "RapidKL-Free-WiFi",
      "RapidKL Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kuala Lumpur LRT/MRT/Monorail."
  },
  {
    "spotId": "sg-wireless-sg",
    "name": "Wireless@SG (MRT/Public)",
    "nameJa": "Wireless@SG (MRT/公共)",
    "nameZh": "Wireless@SG (地铁/公共)",
    "nameKo": "Wireless@SG (MRT/공공)",
    "airportCode": null,
    "country": "SG",
    "ssids": [
      "Wireless@SG",
      "Wireless@SGx"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Singapore nationwide free WiFi. MRT stations, libraries, malls."
  },
  {
    "spotId": "hk-mtr-wifi",
    "name": "MTR Free Wi-Fi",
    "nameJa": "MTR フリーWi-Fi",
    "nameZh": "MTR免费WiFi",
    "nameKo": "MTR 무료 WiFi",
    "airportCode": null,
    "country": "HK",
    "ssids": [
      "MTR Free Wi-Fi",
      "MTR-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Hong Kong MTR subway stations."
  },
  {
    "spotId": "hk-govt-wifi",
    "name": "Wi-Fi.HK (Government)",
    "nameJa": "Wi-Fi.HK（政府）",
    "nameZh": "Wi-Fi.HK（政府）",
    "nameKo": "Wi-Fi.HK (정부)",
    "airportCode": null,
    "country": "HK",
    "ssids": [
      "Wi-Fi.HK via PCCW",
      "Wi-Fi.HK via HKT",
      "freegovwifi-e"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Hong Kong government free WiFi. Parks, libraries, govt buildings."
  },
  {
    "spotId": "tw-khh-wifi",
    "name": "Kaohsiung International Airport",
    "nameJa": "高雄国際空港",
    "nameZh": "高雄国际机场",
    "nameKo": "가오슝 국제공항",
    "airportCode": "KHH",
    "country": "TW",
    "ssids": [
      "KHH Airport Free WiFi",
      "KHH-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kaohsiung airport."
  },
  {
    "spotId": "tw-itaiwan-wifi",
    "name": "iTaiwan Free WiFi",
    "nameJa": "iTaiwan 無料WiFi",
    "nameZh": "iTaiwan免费WiFi",
    "nameKo": "iTaiwan 무료 WiFi",
    "airportCode": null,
    "country": "TW",
    "ssids": [
      "iTaiwan",
      "iTaiwan-TP"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Taiwan government free WiFi. Available at 30,000+ hotspots."
  },
  {
    "spotId": "tw-kaohsiung-metro",
    "name": "Kaohsiung Metro Free WiFi",
    "nameJa": "高雄メトロ Wi-Fi",
    "nameZh": "高雄地铁WiFi",
    "nameKo": "가오슝 메트로 WiFi",
    "airportCode": null,
    "country": "TW",
    "ssids": [
      "KRTC Free WiFi",
      "KRTC-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kaohsiung Metro/MRT stations."
  },
  {
    "spotId": "kr-pus-wifi",
    "name": "Gimhae International Airport",
    "nameJa": "金海国際空港（釜山）",
    "nameZh": "金海国际机场（釜山）",
    "nameKo": "김해국제공항 (부산)",
    "airportCode": "PUS",
    "country": "KR",
    "ssids": [
      "AirportWiFi",
      "PUS Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Busan Gimhae airport."
  },
  {
    "spotId": "kr-cju-wifi",
    "name": "Jeju International Airport",
    "nameJa": "済州国際空港",
    "nameZh": "济州国际机场",
    "nameKo": "제주국제공항",
    "airportCode": "CJU",
    "country": "KR",
    "ssids": [
      "AirportWiFi",
      "CJU Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Jeju Island airport."
  },
  {
    "spotId": "kr-busan-metro",
    "name": "Busan Metro Free WiFi",
    "nameJa": "釜山メトロ Wi-Fi",
    "nameZh": "釜山地铁WiFi",
    "nameKo": "부산 지하철 WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "Busan Metro WiFi",
      "BusanMetro-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Busan subway stations."
  },
  {
    "spotId": "kr-public-wifi",
    "name": "Korea Public WiFi",
    "nameJa": "韓国公共WiFi",
    "nameZh": "韩国公共WiFi",
    "nameKo": "공공와이파이",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "Public WiFi Free",
      "PublicWiFi@KR"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Korean government free WiFi. Libraries, parks, subway areas."
  },
  {
    "spotId": "cn-szx-wifi",
    "name": "Shenzhen Bao'an Airport",
    "nameJa": "深セン宝安空港",
    "nameZh": "深圳宝安机场",
    "nameKo": "선전 바오안 공항",
    "airportCode": "SZX",
    "country": "CN",
    "ssids": [
      "AirportWiFi",
      "SZX-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Shenzhen airport."
  },
  {
    "spotId": "cn-ctu-wifi",
    "name": "Chengdu Tianfu Airport",
    "nameJa": "成都天府空港",
    "nameZh": "成都天府机场",
    "nameKo": "청두 톈푸 공항",
    "airportCode": "TFU",
    "country": "CN",
    "ssids": [
      "AirportWiFi",
      "CTU-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Chengdu Tianfu new airport."
  },
  {
    "spotId": "cn-ckg-wifi",
    "name": "Chongqing Jiangbei Airport",
    "nameJa": "重慶江北空港",
    "nameZh": "重庆江北机场",
    "nameKo": "충칭 장베이 공항",
    "airportCode": "CKG",
    "country": "CN",
    "ssids": [
      "AirportWiFi",
      "CKG-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Chongqing airport."
  },
  {
    "spotId": "cn-xmn-wifi",
    "name": "Xiamen Gaoqi Airport",
    "nameJa": "厦門高崎空港",
    "nameZh": "厦门高崎机场",
    "nameKo": "샤먼 가오치 공항",
    "airportCode": "XMN",
    "country": "CN",
    "ssids": [
      "AirportWiFi",
      "XMN-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Xiamen airport."
  },
  {
    "spotId": "cn-highspeed-wifi",
    "name": "China High-Speed Rail WiFi",
    "nameJa": "中国高速鉄道 Wi-Fi",
    "nameZh": "中国高铁WiFi",
    "nameKo": "중국 고속철도 WiFi",
    "airportCode": null,
    "country": "CN",
    "ssids": [
      "CRNet-CRH",
      "highspeed-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "China Railway high-speed trains (G/D trains)."
  },
  {
    "spotId": "jp-donki-wifi",
    "name": "Don Quijote Free WiFi",
    "nameJa": "ドン・キホーテ Free WiFi",
    "nameZh": "唐吉诃德免费WiFi",
    "nameKo": "돈키호테 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "DONKI_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Available at all Don Quijote stores nationwide. No time limit."
  },
  {
    "spotId": "jp-mitsui-wifi",
    "name": "Mitsui Shopping Park Free WiFi",
    "nameJa": "三井ショッピングパーク Free WiFi",
    "nameZh": "三井购物公园免费WiFi",
    "nameKo": "미츠이 쇼핑파크 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "MSP_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "LaLaport, Mitsui Outlet Park, etc. 120 min session. Email or SNS login."
  },
  {
    "spotId": "jp-premium-outlets-wifi",
    "name": "Premium Outlets Free WiFi",
    "nameJa": "プレミアム・アウトレット Free WiFi",
    "nameZh": "奥特莱斯免费WiFi",
    "nameKo": "프리미엄 아울렛 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "PO_Free_Wi-Fi",
      "PO Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Gotemba, Rinku, Sano, Tosu, Kobe-Sanda, etc. 1h session. Email or social login."
  },
  {
    "spotId": "jp-lumine-wifi",
    "name": "LUMINE Free WiFi",
    "nameJa": "ルミネ Free WiFi",
    "nameZh": "LUMINE免费WiFi",
    "nameKo": "루미네 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "LUMINE_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Available at select LUMINE stores. 60 min session."
  },
  {
    "spotId": "jp-free-wifi-passport",
    "name": "FREE Wi-Fi PASSPORT",
    "nameJa": "FREE Wi-Fi PASSPORT (SoftBank)",
    "nameZh": "FREE Wi-Fi PASSPORT (旅客用)",
    "nameKo": "FREE Wi-Fi PASSPORT (여행자용)",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      ".FREE_Wi-Fi_PASSPORT"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "SoftBank traveler WiFi. Available at airports, stations, tourist spots. Agree to terms only."
  },
  {
    "spotId": "jp-freespot",
    "name": "FREESPOT",
    "nameJa": "FREESPOT",
    "nameZh": "FREESPOT",
    "nameKo": "FREESPOT",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "FREESPOT",
      "freespot"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Community free WiFi at hotels, cafes, public facilities across Japan."
  },
  {
    "spotId": "jp-wi2-free",
    "name": "Wi2 Free WiFi",
    "nameJa": "Wi2 フリーWiFi",
    "nameZh": "Wi2免费WiFi",
    "nameKo": "Wi2 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Wi2_free",
      "wifi_square"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Wire and Wireless free tier. Available at cafes, stations, tourist spots."
  },
  {
    "spotId": "jp-jr-central-wifi",
    "name": "JR Central FREE Wi-Fi",
    "nameJa": "JR東海 Free WiFi",
    "nameZh": "JR东海免费WiFi",
    "nameKo": "JR도카이 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "JR-Central_FREE",
      "JR-Central_FREE_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Nagoya Station, major Tokaido stations. Email registration."
  },
  {
    "spotId": "jp-tobu-wifi",
    "name": "Tobu Railway Free WiFi",
    "nameJa": "東武鉄道 Free WiFi",
    "nameZh": "东武铁路免费WiFi",
    "nameKo": "도부 철도 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "TOBU_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Tobu Skytree Line, Asakusa, Nikko area stations."
  },
  {
    "spotId": "jp-tokyu-wifi",
    "name": "Tokyu Free WiFi",
    "nameJa": "東急 Free WiFi",
    "nameZh": "东急免费WiFi",
    "nameKo": "도큐 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "tokyu_free_wifi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Tokyu Line stations: Shibuya, Futako-Tamagawa, etc."
  },
  {
    "spotId": "jp-keio-wifi",
    "name": "Keio Free WiFi",
    "nameJa": "京王 Free WiFi",
    "nameZh": "京王免费WiFi",
    "nameKo": "게이오 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "keio_free_wifi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Keio Line: Shinjuku, Chofu, Hashimoto, Takaosanguchi."
  },
  {
    "spotId": "jp-odakyu-wifi",
    "name": "Odakyu Free WiFi",
    "nameJa": "小田急 Free WiFi",
    "nameZh": "小田急免费WiFi",
    "nameKo": "오다큐 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "odakyu_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Odakyu Line: Shinjuku, Machida, Hakone area."
  },
  {
    "spotId": "jp-nara-wifi",
    "name": "Nara Free WiFi",
    "nameJa": "奈良 Free WiFi",
    "nameZh": "奈良免费WiFi",
    "nameKo": "나라 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "NARA_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Nara Park, Todaiji area, Nara Station."
  },
  {
    "spotId": "jp-hiroshima-city-wifi",
    "name": "Hiroshima FREE Wi-Fi",
    "nameJa": "広島 Free WiFi",
    "nameZh": "广岛免费WiFi",
    "nameKo": "히로시마 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "HIROSHIMA_FREE_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Hiroshima Peace Park, Hiroshima Station area, Miyajima."
  },
  {
    "spotId": "jp-kanazawa-wifi",
    "name": "Kanazawa Free WiFi",
    "nameJa": "金沢 Free WiFi",
    "nameZh": "金泽免费WiFi",
    "nameKo": "가나자와 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "KANAZAWA_FREE_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kanazawa Station, Kenrokuen, Higashi Chaya district."
  },
  {
    "spotId": "jp-sendai-city-wifi",
    "name": "Sendai Free WiFi",
    "nameJa": "仙台 Free WiFi",
    "nameZh": "仙台免费WiFi",
    "nameKo": "센다이 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "SENDAI_free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Sendai Station, Aoba-dori, Zuihoden area."
  },
  {
    "spotId": "gb-lhr-wifi",
    "name": "London Heathrow Airport",
    "nameJa": "ロンドン・ヒースロー空港",
    "nameZh": "伦敦希思罗机场",
    "nameKo": "런던 히드로 공항",
    "airportCode": "LHR",
    "country": "GB",
    "ssids": [
      "_Heathrow Wi-Fi",
      "Heathrow Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with email registration. All terminals."
  },
  {
    "spotId": "gb-lgw-wifi",
    "name": "London Gatwick Airport",
    "nameJa": "ロンドン・ガトウィック空港",
    "nameZh": "伦敦盖特威克机场",
    "nameKo": "런던 개트윅 공항",
    "airportCode": "LGW",
    "country": "GB",
    "ssids": [
      "Gatwick-WiFi",
      "_Gatwick Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with email. Both terminals."
  },
  {
    "spotId": "fr-cdg-wifi",
    "name": "Paris Charles de Gaulle Airport",
    "nameJa": "パリ・シャルル・ド・ゴール空港",
    "nameZh": "巴黎戴高乐机场",
    "nameKo": "파리 샤를 드 골 공항",
    "airportCode": "CDG",
    "country": "FR",
    "ssids": [
      "WIFI-AIRPORT",
      "WIFI-ADP"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free unlimited WiFi. Operated by Hub One / Aeroports de Paris."
  },
  {
    "spotId": "fr-ory-wifi",
    "name": "Paris Orly Airport",
    "nameJa": "パリ・オルリー空港",
    "nameZh": "巴黎奥利机场",
    "nameKo": "파리 오를리 공항",
    "airportCode": "ORY",
    "country": "FR",
    "ssids": [
      "WIFI-AIRPORT",
      "WIFI-ADP"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Same provider as CDG (Aeroports de Paris)."
  },
  {
    "spotId": "de-fra-wifi",
    "name": "Frankfurt Airport",
    "nameJa": "フランクフルト空港",
    "nameZh": "法兰克福机场",
    "nameKo": "프랑크푸르트 공항",
    "airportCode": "FRA",
    "country": "DE",
    "ssids": [
      "Telekom_FlyNet",
      "Airport-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by Telekom. 24h unlimited."
  },
  {
    "spotId": "de-muc-wifi",
    "name": "Munich Airport",
    "nameJa": "ミュンヘン空港",
    "nameZh": "慕尼黑机场",
    "nameKo": "뮌헨 공항",
    "airportCode": "MUC",
    "country": "DE",
    "ssids": [
      "Munich Airport Free WiFi",
      ".MUC-Airport-Free"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free unlimited WiFi."
  },
  {
    "spotId": "nl-ams-wifi",
    "name": "Amsterdam Schiphol Airport",
    "nameJa": "アムステルダム・スキポール空港",
    "nameZh": "阿姆斯特丹史基浦机场",
    "nameKo": "암스테르담 스히폴 공항",
    "airportCode": "AMS",
    "country": "NL",
    "ssids": [
      "Schiphol-Wifi",
      "KPN"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi. Accept terms to connect."
  },
  {
    "spotId": "es-mad-wifi",
    "name": "Madrid Barajas Airport",
    "nameJa": "マドリード・バラハス空港",
    "nameZh": "马德里巴拉哈斯机场",
    "nameKo": "마드리드 바라하스 공항",
    "airportCode": "MAD",
    "country": "ES",
    "ssids": [
      "Airport Free WiFi AENA",
      "WiFi-AENA"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free 30-min WiFi by AENA. Renewable."
  },
  {
    "spotId": "es-bcn-wifi",
    "name": "Barcelona El Prat Airport",
    "nameJa": "バルセロナ・エル・プラット空港",
    "nameZh": "巴塞罗那普拉特机场",
    "nameKo": "바르셀로나 엘프라트 공항",
    "airportCode": "BCN",
    "country": "ES",
    "ssids": [
      "Airport Free WiFi AENA",
      "WiFi-AENA"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Same AENA provider as Madrid."
  },
  {
    "spotId": "it-fco-wifi",
    "name": "Rome Fiumicino Airport",
    "nameJa": "ローマ・フィウミチーノ空港",
    "nameZh": "罗马菲乌米奇诺机场",
    "nameKo": "로마 피우미치노 공항",
    "airportCode": "FCO",
    "country": "IT",
    "ssids": [
      "Airport Free WiFi",
      "ADR Free WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with email registration."
  },
  {
    "spotId": "it-mxp-wifi",
    "name": "Milan Malpensa Airport",
    "nameJa": "ミラノ・マルペンサ空港",
    "nameZh": "米兰马尔彭萨机场",
    "nameKo": "밀라노 말펜사 공항",
    "airportCode": "MXP",
    "country": "IT",
    "ssids": [
      "Airport Free WiFi",
      "SEA-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Operated by SEA Aeroporti di Milano."
  },
  {
    "spotId": "ch-zrh-wifi",
    "name": "Zurich Airport",
    "nameJa": "チューリッヒ空港",
    "nameZh": "苏黎世机场",
    "nameKo": "취리히 공항",
    "airportCode": "ZRH",
    "country": "CH",
    "ssids": [
      "Zurich Airport Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Unlimited free WiFi."
  },
  {
    "spotId": "at-vie-wifi",
    "name": "Vienna Airport",
    "nameJa": "ウィーン空港",
    "nameZh": "维也纳机场",
    "nameKo": "비엔나 공항",
    "airportCode": "VIE",
    "country": "AT",
    "ssids": [
      "viennaairport",
      "VIE Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free unlimited WiFi."
  },
  {
    "spotId": "se-arn-wifi",
    "name": "Stockholm Arlanda Airport",
    "nameJa": "ストックホルム・アーランダ空港",
    "nameZh": "斯德哥尔摩阿兰达机场",
    "nameKo": "스톡홀름 알란다 공항",
    "airportCode": "ARN",
    "country": "SE",
    "ssids": [
      "Swedavia Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by Swedavia."
  },
  {
    "spotId": "dk-cph-wifi",
    "name": "Copenhagen Airport",
    "nameJa": "コペンハーゲン空港",
    "nameZh": "哥本哈根机场",
    "nameKo": "코펜하겐 공항",
    "airportCode": "CPH",
    "country": "DK",
    "ssids": [
      "CPH Airport Free WiFi",
      "CPH-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Unlimited free WiFi."
  },
  {
    "spotId": "fi-hel-wifi",
    "name": "Helsinki-Vantaa Airport",
    "nameJa": "ヘルシンキ・ヴァンター空港",
    "nameZh": "赫尔辛基万塔机场",
    "nameKo": "헬싱키 반타 공항",
    "airportCode": "HEL",
    "country": "FI",
    "ssids": [
      "HEL Airport Free WiFi",
      "Helsinki Airport"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free unlimited WiFi by Finavia."
  },
  {
    "spotId": "pt-lis-wifi",
    "name": "Lisbon Airport",
    "nameJa": "リスボン空港",
    "nameZh": "里斯本机场",
    "nameKo": "리스본 공항",
    "airportCode": "LIS",
    "country": "PT",
    "ssids": [
      "ANA Free WiFi",
      "ANA-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by ANA Aeroportos."
  },
  {
    "spotId": "ie-dub-wifi",
    "name": "Dublin Airport",
    "nameJa": "ダブリン空港",
    "nameZh": "都柏林机场",
    "nameKo": "더블린 공항",
    "airportCode": "DUB",
    "country": "IE",
    "ssids": [
      "daa Free WiFi",
      "dublinairport"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by daa."
  },
  {
    "spotId": "gr-ath-wifi",
    "name": "Athens International Airport",
    "nameJa": "アテネ国際空港",
    "nameZh": "雅典国际机场",
    "nameKo": "아테네 국제공항",
    "airportCode": "ATH",
    "country": "GR",
    "ssids": [
      "AIA Free WiFi",
      "ATH-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Athens International."
  },
  {
    "spotId": "cz-prg-wifi",
    "name": "Prague Airport",
    "nameJa": "プラハ空港",
    "nameZh": "布拉格机场",
    "nameKo": "프라하 공항",
    "airportCode": "PRG",
    "country": "CZ",
    "ssids": [
      "PRG Free WiFi",
      "Prague Airport WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free unlimited WiFi."
  },
  {
    "spotId": "pl-waw-wifi",
    "name": "Warsaw Chopin Airport",
    "nameJa": "ワルシャワ・ショパン空港",
    "nameZh": "华沙肖邦机场",
    "nameKo": "바르샤바 쇼팽 공항",
    "airportCode": "WAW",
    "country": "PL",
    "ssids": [
      "FreeWiFi@WAW",
      "Lotnisko-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Chopin Airport."
  },
  {
    "spotId": "tr-ist-wifi",
    "name": "Istanbul Airport",
    "nameJa": "イスタンブール空港",
    "nameZh": "伊斯坦布尔机场",
    "nameKo": "이스탄불 공항",
    "airportCode": "IST",
    "country": "TR",
    "ssids": [
      "Free-WiFi_iGA",
      "iGA WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with registration. Unlimited duration."
  },
  {
    "spotId": "no-osl-wifi",
    "name": "Oslo Gardermoen Airport",
    "nameJa": "オスロ・ガーデモエン空港",
    "nameZh": "奥斯陆加勒穆恩机场",
    "nameKo": "오슬로 가르데르모엔 공항",
    "airportCode": "OSL",
    "country": "NO",
    "ssids": [
      "Avinor Free WiFi",
      "OSL-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by Avinor."
  },
  {
    "spotId": "gb-network-rail-wifi",
    "name": "UK Network Rail Station WiFi",
    "nameJa": "イギリス鉄道駅 WiFi",
    "nameZh": "英国火车站WiFi",
    "nameKo": "영국 기차역 WiFi",
    "airportCode": null,
    "country": "GB",
    "ssids": [
      "_Free Station WiFi",
      "Network Rail WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Major UK rail stations: Kings Cross, Paddington, Edinburgh Waverley, etc."
  },
  {
    "spotId": "gb-tube-wifi",
    "name": "London Underground WiFi",
    "nameJa": "ロンドン地下鉄 WiFi",
    "nameZh": "伦敦地铁WiFi",
    "nameKo": "런던 지하철 WiFi",
    "airportCode": null,
    "country": "GB",
    "ssids": [
      "Virgin Media WiFi",
      "WiFi on the Tube"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Available at Tube stations (not in tunnels). By Virgin Media."
  },
  {
    "spotId": "de-db-wifi",
    "name": "Deutsche Bahn (DB) WiFi",
    "nameJa": "ドイツ鉄道 WiFi",
    "nameZh": "德国铁路WiFi",
    "nameKo": "독일 철도 WiFi",
    "airportCode": null,
    "country": "DE",
    "ssids": [
      "WIFIonICE",
      "WIFI@DB",
      "Telekom"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi on ICE trains and major DB stations."
  },
  {
    "spotId": "fr-sncf-wifi",
    "name": "SNCF / TGV WiFi",
    "nameJa": "フランス国鉄 WiFi",
    "nameZh": "法国铁路WiFi",
    "nameKo": "프랑스 국철 WiFi",
    "airportCode": null,
    "country": "FR",
    "ssids": [
      "_WiFi_SNCF",
      "TGV_WiFi",
      "WiFi_INOUI"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi on TGV INOUI trains and major stations."
  },
  {
    "spotId": "nl-ns-wifi",
    "name": "NS Dutch Railways WiFi",
    "nameJa": "オランダ鉄道 WiFi",
    "nameZh": "荷兰铁路WiFi",
    "nameKo": "네덜란드 철도 WiFi",
    "airportCode": null,
    "country": "NL",
    "ssids": [
      "WiFi in de trein",
      "NS-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi on Intercity and Sprinter trains."
  },
  {
    "spotId": "it-trenitalia-wifi",
    "name": "Trenitalia / Italo WiFi",
    "nameJa": "イタリア鉄道 WiFi",
    "nameZh": "意大利铁路WiFi",
    "nameKo": "이탈리아 철도 WiFi",
    "airportCode": null,
    "country": "IT",
    "ssids": [
      "Frecciarossa WiFi",
      "Italo WiFi",
      "WiFi Trenitalia"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "WiFi on Frecciarossa and Italo high-speed trains."
  },
  {
    "spotId": "es-renfe-wifi",
    "name": "Renfe AVE WiFi",
    "nameJa": "スペイン高速鉄道 WiFi",
    "nameZh": "西班牙高铁WiFi",
    "nameKo": "스페인 고속철도 WiFi",
    "airportCode": null,
    "country": "ES",
    "ssids": [
      "PlayRenfe",
      "Renfe_Viajeros"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi on AVE high-speed trains."
  },
  {
    "spotId": "ch-sbb-wifi",
    "name": "SBB Swiss Railways WiFi",
    "nameJa": "スイス鉄道 WiFi",
    "nameZh": "瑞士铁路WiFi",
    "nameKo": "스위스 철도 WiFi",
    "airportCode": null,
    "country": "CH",
    "ssids": [
      "SBB-FREE",
      "SBB-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi on IC trains and major stations."
  },
  {
    "spotId": "fr-paris-wifi",
    "name": "Paris WiFi",
    "nameJa": "パリ市 WiFi",
    "nameZh": "巴黎市WiFi",
    "nameKo": "파리시 WiFi",
    "airportCode": null,
    "country": "FR",
    "ssids": [
      "PARIS_WI-FI_",
      "Paris Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free city WiFi in parks, libraries, public buildings."
  },
  {
    "spotId": "gb-sky-wifi",
    "name": "Sky WiFi (UK)",
    "nameJa": "Sky WiFi（イギリス）",
    "nameZh": "Sky WiFi（英国）",
    "nameKo": "Sky WiFi (영국)",
    "airportCode": null,
    "country": "GB",
    "ssids": [
      "_Free Wi-Fi",
      "Sky WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi at cafes, shops, and public spaces across the UK."
  },
  {
    "spotId": "de-berlin-wifi",
    "name": "Free WiFi Berlin",
    "nameJa": "ベルリン市 WiFi",
    "nameZh": "柏林市WiFi",
    "nameKo": "베를린시 WiFi",
    "airportCode": null,
    "country": "DE",
    "ssids": [
      "Free WiFi Berlin",
      "berlin.freifunk.net"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "City of Berlin public WiFi hotspots."
  },
  {
    "spotId": "ae-dxb-wifi",
    "name": "Dubai International Airport",
    "nameJa": "ドバイ国際空港",
    "nameZh": "迪拜国际机场",
    "nameKo": "두바이 국제공항",
    "airportCode": "DXB",
    "country": "AE",
    "ssids": [
      "DXB Free WiFi",
      "DXB-Free-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with email registration. Unlimited."
  },
  {
    "spotId": "ae-auh-wifi",
    "name": "Abu Dhabi Airport",
    "nameJa": "アブダビ空港",
    "nameZh": "阿布扎比机场",
    "nameKo": "아부다비 공항",
    "airportCode": "AUH",
    "country": "AE",
    "ssids": [
      "AUH Free WiFi",
      "AUH-Free-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free unlimited WiFi."
  },
  {
    "spotId": "qa-doh-wifi",
    "name": "Doha Hamad International Airport",
    "nameJa": "ドーハ・ハマド国際空港",
    "nameZh": "多哈哈马德国际机场",
    "nameKo": "도하 하마드 국제공항",
    "airportCode": "DOH",
    "country": "QA",
    "ssids": [
      "HIA Free WiFi",
      "HIA-Qatar"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Unlimited free WiFi at Hamad International."
  },
  {
    "spotId": "il-tlv-wifi",
    "name": "Tel Aviv Ben Gurion Airport",
    "nameJa": "テルアビブ・ベン・グリオン空港",
    "nameZh": "特拉维夫本古里安机场",
    "nameKo": "텔아비브 벤구리온 공항",
    "airportCode": "TLV",
    "country": "IL",
    "ssids": [
      "Ben Gurion FREE WiFi",
      "IAAFREEWIFI"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at all terminals."
  },
  {
    "spotId": "sa-ruh-wifi",
    "name": "Riyadh King Khalid Airport",
    "nameJa": "リヤド・キング・ハーリド空港",
    "nameZh": "利雅得哈立德国王机场",
    "nameKo": "리야드 킹할리드 공항",
    "airportCode": "RUH",
    "country": "SA",
    "ssids": [
      "KKIA Free WiFi",
      "KKIA-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at King Khalid International."
  },
  {
    "spotId": "sa-jed-wifi",
    "name": "Jeddah King Abdulaziz Airport",
    "nameJa": "ジェッダ空港",
    "nameZh": "吉达阿卜杜勒阿齐兹国王机场",
    "nameKo": "제다 킹 압둘아지즈 공항",
    "airportCode": "JED",
    "country": "SA",
    "ssids": [
      "KAIA Free WiFi",
      "KAIA-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at King Abdulaziz International."
  },
  {
    "spotId": "au-syd-wifi",
    "name": "Sydney Airport",
    "nameJa": "シドニー空港",
    "nameZh": "悉尼机场",
    "nameKo": "시드니 공항",
    "airportCode": "SYD",
    "country": "AU",
    "ssids": [
      "SydneyAirport_Free_WiFi",
      "SYD Free WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with email. Both domestic and international terminals."
  },
  {
    "spotId": "au-mel-wifi",
    "name": "Melbourne Airport",
    "nameJa": "メルボルン空港",
    "nameZh": "墨尔本机场",
    "nameKo": "멜버른 공항",
    "airportCode": "MEL",
    "country": "AU",
    "ssids": [
      "Melbourne Airport Free WiFi",
      "MEL-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with email registration."
  },
  {
    "spotId": "au-bne-wifi",
    "name": "Brisbane Airport",
    "nameJa": "ブリスベン空港",
    "nameZh": "布里斯班机场",
    "nameKo": "브리즈번 공항",
    "airportCode": "BNE",
    "country": "AU",
    "ssids": [
      "BNE Free WiFi",
      "Brisbane Airport WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi at Brisbane Airport."
  },
  {
    "spotId": "nz-akl-wifi",
    "name": "Auckland Airport",
    "nameJa": "オークランド空港",
    "nameZh": "奥克兰机场",
    "nameKo": "오클랜드 공항",
    "airportCode": "AKL",
    "country": "NZ",
    "ssids": [
      "AucklandAirport Free WiFi",
      "AKL-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Unlimited free WiFi."
  },
  {
    "spotId": "nz-wlg-wifi",
    "name": "Wellington Airport",
    "nameJa": "ウェリントン空港",
    "nameZh": "惠灵顿机场",
    "nameKo": "웰링턴 공항",
    "airportCode": "WLG",
    "country": "NZ",
    "ssids": [
      "Wellington Airport Free WiFi",
      "WLG-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi."
  },
  {
    "spotId": "in-del-wifi",
    "name": "Delhi Indira Gandhi Airport",
    "nameJa": "デリー・インディラ・ガンディー空港",
    "nameZh": "德里甘地机场",
    "nameKo": "델리 인디라 간디 공항",
    "airportCode": "DEL",
    "country": "IN",
    "ssids": [
      "DIAL Free WiFi",
      "DEL-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with mobile number or email. T1 and T3."
  },
  {
    "spotId": "in-bom-wifi",
    "name": "Mumbai Chhatrapati Shivaji Airport",
    "nameJa": "ムンバイ空港",
    "nameZh": "孟买贾特拉帕蒂·希瓦吉机场",
    "nameKo": "뭄바이 공항",
    "airportCode": "BOM",
    "country": "IN",
    "ssids": [
      "MIAL Free WiFi",
      "BOM-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with OTP verification. T1 and T2."
  },
  {
    "spotId": "in-blr-wifi",
    "name": "Bangalore Kempegowda Airport",
    "nameJa": "バンガロール空港",
    "nameZh": "班加罗尔机场",
    "nameKo": "방갈로르 공항",
    "airportCode": "BLR",
    "country": "IN",
    "ssids": [
      "BIAL Free WiFi",
      "BLR-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi at Kempegowda International."
  },
  {
    "spotId": "in-maa-wifi",
    "name": "Chennai Airport",
    "nameJa": "チェンナイ空港",
    "nameZh": "金奈机场",
    "nameKo": "첸나이 공항",
    "airportCode": "MAA",
    "country": "IN",
    "ssids": [
      "AAI Free WiFi",
      "MAA-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi by Airports Authority of India."
  },
  {
    "spotId": "in-delhi-metro-wifi",
    "name": "Delhi Metro WiFi",
    "nameJa": "デリー地下鉄 WiFi",
    "nameZh": "德里地铁WiFi",
    "nameKo": "델리 메트로 WiFi",
    "airportCode": null,
    "country": "IN",
    "ssids": [
      "DMRC_Free_WiFi",
      "Delhi_Metro_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "WiFi at select Delhi Metro stations."
  },
  {
    "spotId": "lk-cmb-wifi",
    "name": "Colombo Bandaranaike Airport",
    "nameJa": "コロンボ空港",
    "nameZh": "科伦坡班达拉奈克机场",
    "nameKo": "콜롬보 공항",
    "airportCode": "CMB",
    "country": "LK",
    "ssids": [
      "BIA Free WiFi",
      "CMB-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Bandaranaike International."
  },
  {
    "spotId": "us-den-wifi",
    "name": "Denver International Airport",
    "nameJa": "デンバー国際空港",
    "nameZh": "丹佛国际机场",
    "nameKo": "덴버 국제공항",
    "airportCode": "DEN",
    "country": "US",
    "ssids": [
      "DEN Free WiFi",
      "DENAirport"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Denver International."
  },
  {
    "spotId": "us-iah-wifi",
    "name": "Houston George Bush Airport",
    "nameJa": "ヒューストン空港",
    "nameZh": "休斯敦乔治·布什机场",
    "nameKo": "휴스턴 공항",
    "airportCode": "IAH",
    "country": "US",
    "ssids": [
      "HAS Free WiFi",
      "IAH-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by Houston Airport System."
  },
  {
    "spotId": "us-bos-wifi",
    "name": "Boston Logan Airport",
    "nameJa": "ボストン・ローガン空港",
    "nameZh": "波士顿洛根机场",
    "nameKo": "보스턴 로건 공항",
    "airportCode": "BOS",
    "country": "US",
    "ssids": [
      "Logan Free WiFi",
      "BOS-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at all terminals."
  },
  {
    "spotId": "us-ewr-wifi",
    "name": "Newark Liberty Airport",
    "nameJa": "ニューアーク・リバティ空港",
    "nameZh": "纽瓦克自由机场",
    "nameKo": "뉴어크 리버티 공항",
    "airportCode": "EWR",
    "country": "US",
    "ssids": [
      "EWR Free WiFi",
      "_Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Newark Liberty International."
  },
  {
    "spotId": "ca-yyz-wifi",
    "name": "Toronto Pearson Airport",
    "nameJa": "トロント・ピアソン空港",
    "nameZh": "多伦多皮尔逊机场",
    "nameKo": "토론토 피어슨 공항",
    "airportCode": "YYZ",
    "country": "CA",
    "ssids": [
      "TorontoPearson Free WiFi",
      "YYZ-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at all terminals."
  },
  {
    "spotId": "ca-yvr-wifi",
    "name": "Vancouver International Airport",
    "nameJa": "バンクーバー国際空港",
    "nameZh": "温哥华国际机场",
    "nameKo": "밴쿠버 국제공항",
    "airportCode": "YVR",
    "country": "CA",
    "ssids": [
      "YVR Free WiFi",
      "#YVR Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at YVR."
  },
  {
    "spotId": "ca-yul-wifi",
    "name": "Montreal Trudeau Airport",
    "nameJa": "モントリオール空港",
    "nameZh": "蒙特利尔特鲁多机场",
    "nameKo": "몬트리올 공항",
    "airportCode": "YUL",
    "country": "CA",
    "ssids": [
      "YUL Free WiFi",
      "ADM-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Montreal-Trudeau."
  },
  {
    "spotId": "mx-mex-wifi",
    "name": "Mexico City Airport",
    "nameJa": "メキシコシティ空港",
    "nameZh": "墨西哥城机场",
    "nameKo": "멕시코시티 공항",
    "airportCode": "MEX",
    "country": "MX",
    "ssids": [
      "AICM Free WiFi",
      "Internet Gratis AICM"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at AICM. T1 and T2."
  },
  {
    "spotId": "mx-cun-wifi",
    "name": "Cancun Airport",
    "nameJa": "カンクン空港",
    "nameZh": "坎昆机场",
    "nameKo": "칸쿤 공항",
    "airportCode": "CUN",
    "country": "MX",
    "ssids": [
      "Cancun Airport Free WiFi",
      "CUN-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Cancun International."
  },
  {
    "spotId": "br-gru-wifi",
    "name": "Sao Paulo Guarulhos Airport",
    "nameJa": "サンパウロ・グアルーリョス空港",
    "nameZh": "圣保罗瓜鲁柳斯机场",
    "nameKo": "상파울루 과룰류스 공항",
    "airportCode": "GRU",
    "country": "BR",
    "ssids": [
      "GRU Airport Free WiFi",
      "GRU-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with email. All terminals."
  },
  {
    "spotId": "br-gig-wifi",
    "name": "Rio de Janeiro Galeao Airport",
    "nameJa": "リオデジャネイロ空港",
    "nameZh": "里约热内卢加利昂机场",
    "nameKo": "리우데자네이루 공항",
    "airportCode": "GIG",
    "country": "BR",
    "ssids": [
      "GIG Free WiFi",
      "Galeao-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi at Galeao International."
  },
  {
    "spotId": "ar-eze-wifi",
    "name": "Buenos Aires Ezeiza Airport",
    "nameJa": "ブエノスアイレス空港",
    "nameZh": "布宜诺斯艾利斯机场",
    "nameKo": "부에노스아이레스 공항",
    "airportCode": "EZE",
    "country": "AR",
    "ssids": [
      "AA2000 Free WiFi",
      "EZE-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by Aeropuertos Argentina 2000."
  },
  {
    "spotId": "cl-scl-wifi",
    "name": "Santiago Airport",
    "nameJa": "サンティアゴ空港",
    "nameZh": "圣地亚哥机场",
    "nameKo": "산티아고 공항",
    "airportCode": "SCL",
    "country": "CL",
    "ssids": [
      "SCL Free WiFi",
      "SCL-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Arturo Merino Benitez International."
  },
  {
    "spotId": "co-bog-wifi",
    "name": "Bogota El Dorado Airport",
    "nameJa": "ボゴタ空港",
    "nameZh": "波哥大埃尔多拉多机场",
    "nameKo": "보고타 엘도라도 공항",
    "airportCode": "BOG",
    "country": "CO",
    "ssids": [
      "ELDORADO Free WiFi",
      "BOG-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at El Dorado International."
  },
  {
    "spotId": "pe-lim-wifi",
    "name": "Lima Jorge Chavez Airport",
    "nameJa": "リマ空港",
    "nameZh": "利马豪尔赫·查韦斯机场",
    "nameKo": "리마 호르헤 차베스 공항",
    "airportCode": "LIM",
    "country": "PE",
    "ssids": [
      "LAP Free WiFi",
      "LIM-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Jorge Chavez International."
  },
  {
    "spotId": "za-jnb-wifi",
    "name": "Johannesburg O.R. Tambo Airport",
    "nameJa": "ヨハネスブルグ空港",
    "nameZh": "约翰内斯堡奥利弗·坦博机场",
    "nameKo": "요하네스버그 공항",
    "airportCode": "JNB",
    "country": "ZA",
    "ssids": [
      "ACSA Free WiFi",
      "JNB-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by Airports Company South Africa."
  },
  {
    "spotId": "za-cpt-wifi",
    "name": "Cape Town Airport",
    "nameJa": "ケープタウン空港",
    "nameZh": "开普敦机场",
    "nameKo": "케이프타운 공항",
    "airportCode": "CPT",
    "country": "ZA",
    "ssids": [
      "ACSA Free WiFi",
      "CPT-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by ACSA."
  },
  {
    "spotId": "eg-cai-wifi",
    "name": "Cairo International Airport",
    "nameJa": "カイロ国際空港",
    "nameZh": "开罗国际机场",
    "nameKo": "카이로 국제공항",
    "airportCode": "CAI",
    "country": "EG",
    "ssids": [
      "CAI Free WiFi",
      "Cairo Airport WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Free WiFi with email. Terminals 2 and 3."
  },
  {
    "spotId": "ma-cmn-wifi",
    "name": "Casablanca Mohammed V Airport",
    "nameJa": "カサブランカ空港",
    "nameZh": "卡萨布兰卡机场",
    "nameKo": "카사블랑카 공항",
    "airportCode": "CMN",
    "country": "MA",
    "ssids": [
      "ONDA Free WiFi",
      "CMN-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi by ONDA."
  },
  {
    "spotId": "ke-nbo-wifi",
    "name": "Nairobi Jomo Kenyatta Airport",
    "nameJa": "ナイロビ空港",
    "nameZh": "内罗毕乔莫·肯雅塔机场",
    "nameKo": "나이로비 공항",
    "airportCode": "NBO",
    "country": "KE",
    "ssids": [
      "JKIA Free WiFi",
      "NBO-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at JKIA."
  },
  {
    "spotId": "et-add-wifi",
    "name": "Addis Ababa Bole Airport",
    "nameJa": "アディスアベバ空港",
    "nameZh": "亚的斯亚贝巴博莱机场",
    "nameKo": "아디스아바바 공항",
    "airportCode": "ADD",
    "country": "ET",
    "ssids": [
      "Bole Free WiFi",
      "ADD-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Bole International. Major African hub."
  },
  {
    "spotId": "in-railwire-wifi",
    "name": "Indian Railways RailWire WiFi",
    "nameJa": "インド鉄道 RailWire WiFi",
    "nameZh": "印度铁路RailWire WiFi",
    "nameKo": "인도 철도 RailWire WiFi",
    "airportCode": null,
    "country": "IN",
    "ssids": [
      "RailWire",
      "RailWire Free WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Available at 6000+ Indian railway stations. Phone number registration."
  },
  {
    "spotId": "th-true-wifi",
    "name": "TrueMove H WiFi (Thailand)",
    "nameJa": "TrueMove H WiFi（タイ）",
    "nameZh": "TrueMove H WiFi（泰国）",
    "nameKo": "TrueMove H WiFi (태국)",
    "airportCode": null,
    "country": "TH",
    "ssids": [
      ".@TRUEWIFI",
      "TrueWiFi",
      "@TRUEWIFI"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Thailand-wide WiFi at malls, cafes, transit. Registration with phone/email."
  },
  {
    "spotId": "my-wifi-malaysia",
    "name": "WiFi Malaysia (Government)",
    "nameJa": "WiFi Malaysia（政府）",
    "nameZh": "WiFi Malaysia（政府）",
    "nameKo": "WiFi Malaysia (정부)",
    "airportCode": null,
    "country": "MY",
    "ssids": [
      "Wireless@Unifi",
      "@Unifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Government-supported public WiFi in Malaysia."
  },
  {
    "spotId": "jp-bamiyan-wifi",
    "name": "Bamiyan Free WiFi",
    "nameJa": "バーミヤン Free WiFi",
    "nameZh": "巴米扬免费WiFi",
    "nameKo": "바미얀 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      ".FREE_Wi-Fi_PASSPORT",
      "Skylark_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Skylark group (same as Gusto). Chinese family restaurant."
  },
  {
    "spotId": "jp-jonathan-wifi",
    "name": "Jonathan's Free WiFi",
    "nameJa": "ジョナサン Free WiFi",
    "nameZh": "Jonathan's免费WiFi",
    "nameKo": "조나단 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      ".FREE_Wi-Fi_PASSPORT",
      "Skylark_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Skylark group. Family restaurant mainly in Kanto area."
  },
  {
    "spotId": "jp-saizeriya-wifi",
    "name": "Saizeriya Free WiFi",
    "nameJa": "サイゼリヤ Free WiFi",
    "nameZh": "萨莉亚免费WiFi",
    "nameKo": "사이제리야 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Saizeriya_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Italian family restaurant. Available at most locations."
  },
  {
    "spotId": "jp-dennys-wifi",
    "name": "Denny's Japan Free WiFi",
    "nameJa": "デニーズ Free WiFi",
    "nameZh": "丹尼斯免费WiFi",
    "nameKo": "데니스 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "7SPOT",
      "Dennys_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Seven & i group family restaurant."
  },
  {
    "spotId": "jp-royalhost-wifi",
    "name": "Royal Host Free WiFi",
    "nameJa": "ロイヤルホスト Free WiFi",
    "nameZh": "Royal Host免费WiFi",
    "nameKo": "로얄 호스트 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "RoyalHost_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Premium family restaurant. WiFi at most locations."
  },
  {
    "spotId": "jp-sukiya-wifi",
    "name": "Sukiya Free WiFi",
    "nameJa": "すき家 Free WiFi",
    "nameZh": "Sukiya免费WiFi",
    "nameKo": "스키야 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "sukiya_free_wifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Largest gyudon chain. WiFi at major locations."
  },
  {
    "spotId": "jp-yoshinoya-wifi",
    "name": "Yoshinoya Free WiFi",
    "nameJa": "吉野家 Free WiFi",
    "nameZh": "吉野家免费WiFi",
    "nameKo": "요시노야 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "yoshinoya_free_wifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Gyudon chain. WiFi at select locations."
  },
  {
    "spotId": "jp-matsuya-wifi",
    "name": "Matsuya Free WiFi",
    "nameJa": "松屋 Free WiFi",
    "nameZh": "松屋免费WiFi",
    "nameKo": "마츠야 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "matsuya_free_wifi",
      "Matsuya_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Gyudon chain. WiFi at major locations."
  },
  {
    "spotId": "jp-cocoichi-wifi",
    "name": "CoCo Ichibanya Free WiFi",
    "nameJa": "ココイチ Free WiFi",
    "nameZh": "CoCo壹番屋免费WiFi",
    "nameKo": "코코이치방야 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "CoCo_ICHIBANYA_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Curry chain. WiFi at select locations."
  },
  {
    "spotId": "jp-sanmaruku-wifi",
    "name": "Saint Marc Cafe Free WiFi",
    "nameJa": "サンマルクカフェ Free WiFi",
    "nameZh": "圣马克咖啡免费WiFi",
    "nameKo": "상마르크 카페 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "SAINT_MARC_CAFE_Free_Wi-Fi",
      "Wi2premium"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Bakery cafe chain. WiFi via Wi2."
  },
  {
    "spotId": "jp-pronto-wifi",
    "name": "PRONTO Free WiFi",
    "nameJa": "プロント Free WiFi",
    "nameZh": "PRONTO免费WiFi",
    "nameKo": "프론토 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "PRONTO_FREE_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Cafe/bar chain. Daytime cafe, nighttime bar."
  },
  {
    "spotId": "jp-veloce-wifi",
    "name": "Cafe Veloce Free WiFi",
    "nameJa": "カフェ・ベローチェ Free WiFi",
    "nameZh": "Veloce咖啡免费WiFi",
    "nameKo": "카페 벨로체 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "veloce_free_wifi",
      "VELOCE_FREE_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Budget cafe chain. WiFi at most locations."
  },
  {
    "spotId": "jp-excelsior-wifi",
    "name": "Excelsior Caffe Free WiFi",
    "nameJa": "エクセルシオール カフェ Free WiFi",
    "nameZh": "Excelsior Caffe免费WiFi",
    "nameKo": "엑셀시오르 카페 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "EXCELSIOR_CAFFE_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Doutor group premium cafe."
  },
  {
    "spotId": "jp-yodobashi-wifi",
    "name": "Yodobashi Camera Free WiFi",
    "nameJa": "ヨドバシカメラ Free WiFi",
    "nameZh": "友都八喜免费WiFi",
    "nameKo": "요도바시 카메라 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Yodobashi_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Major electronics retailer. WiFi at all stores."
  },
  {
    "spotId": "jp-biccamera-wifi",
    "name": "Bic Camera Free WiFi",
    "nameJa": "ビックカメラ Free WiFi",
    "nameZh": "Bic Camera免费WiFi",
    "nameKo": "빅 카메라 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "BicCamera_Free_Wi-Fi",
      "Bic_Camera_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Electronics retailer. WiFi at most stores."
  },
  {
    "spotId": "jp-itoyokado-wifi",
    "name": "Ito-Yokado Free WiFi",
    "nameJa": "イトーヨーカドー Free WiFi",
    "nameZh": "伊藤洋华堂免费WiFi",
    "nameKo": "이토요카도 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "7SPOT",
      "IY_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Seven & i group supermarket. Via 7SPOT."
  },
  {
    "spotId": "jp-parco-wifi",
    "name": "PARCO Free WiFi",
    "nameJa": "パルコ Free WiFi",
    "nameZh": "PARCO免费WiFi",
    "nameKo": "파르코 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "PARCO_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Fashion mall. Shibuya, Ikebukuro, Nagoya, etc."
  },
  {
    "spotId": "jp-loft-wifi",
    "name": "Loft Free WiFi",
    "nameJa": "ロフト Free WiFi",
    "nameZh": "Loft免费WiFi",
    "nameKo": "로프트 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Loft_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Lifestyle goods store. WiFi at major locations."
  },
  {
    "spotId": "jp-seven-wifi",
    "name": "Seven-Eleven 7SPOT WiFi",
    "nameJa": "セブンイレブン 7SPOT WiFi",
    "nameZh": "7-11 7SPOT WiFi",
    "nameKo": "세븐일레븐 7SPOT WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "7SPOT"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "7SPOT requires email registration. Available at all 7-Eleven stores."
  },
  {
    "spotId": "jp-hankyu-wifi",
    "name": "Hankyu Railway Free WiFi",
    "nameJa": "阪急電鉄 Free WiFi",
    "nameZh": "阪急电铁免费WiFi",
    "nameKo": "한큐 전철 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Hankyu_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Hankyu stations: Umeda, Kawaramachi, Kobe-Sannomiya, Takarazuka."
  },
  {
    "spotId": "jp-hanshin-wifi",
    "name": "Hanshin Railway Free WiFi",
    "nameJa": "阪神電鉄 Free WiFi",
    "nameZh": "阪神电铁免费WiFi",
    "nameKo": "한신 전철 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Hanshin_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Hanshin stations: Umeda, Amagasaki, Koshien, Kobe."
  },
  {
    "spotId": "jp-nankai-wifi",
    "name": "Nankai Railway Free WiFi",
    "nameJa": "南海電鉄 Free WiFi",
    "nameZh": "南海电铁免费WiFi",
    "nameKo": "난카이 전철 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Nankai_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Namba to Kansai Airport (Rapi:t). Major stations."
  },
  {
    "spotId": "jp-kintetsu-wifi",
    "name": "Kintetsu Railway Free WiFi",
    "nameJa": "近鉄 Free WiFi",
    "nameZh": "近铁免费WiFi",
    "nameKo": "긴테츠 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Kintetsu_Free_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Osaka-Namba to Nagoya/Nara/Ise. Major stations."
  },
  {
    "spotId": "jp-keihan-wifi",
    "name": "Keihan Railway Free WiFi",
    "nameJa": "京阪電鉄 Free WiFi",
    "nameZh": "京阪电铁免费WiFi",
    "nameKo": "게이한 전철 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "KEIHAN_FREE_Wi-Fi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Osaka (Yodoyabashi) to Kyoto (Demachiyanagi). Major stations."
  },
  {
    "spotId": "jp-yurikamome-wifi",
    "name": "Yurikamome Free WiFi",
    "nameJa": "ゆりかもめ Free WiFi",
    "nameZh": "百合海鸥号免费WiFi",
    "nameKo": "유리카모메 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "yurikamome_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Tokyo waterfront line: Shimbashi to Toyosu. Odaiba access."
  },
  {
    "spotId": "jp-rinkai-wifi",
    "name": "Rinkai Line Free WiFi",
    "nameJa": "りんかい線 Free WiFi",
    "nameZh": "临海线免费WiFi",
    "nameKo": "린카이선 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Rinkai_Free_Wi-Fi",
      "TWR_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Tokyo Waterfront Railway. Osaki to Shin-Kiba."
  },
  {
    "spotId": "jp-tx-wifi",
    "name": "Tsukuba Express Free WiFi",
    "nameJa": "つくばエクスプレス Free WiFi",
    "nameZh": "筑波快线免费WiFi",
    "nameKo": "츠쿠바 익스프레스 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "TX_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Akihabara to Tsukuba. All stations."
  },
  {
    "spotId": "jp-nagoya-metro-wifi",
    "name": "Nagoya Municipal Subway Free WiFi",
    "nameJa": "名古屋市営地下鉄 Free WiFi",
    "nameZh": "名古屋地铁免费WiFi",
    "nameKo": "나고야 시영 지하철 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Nagoya_Subway_Free_Wi-Fi",
      "NAGOYA-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Nagoya subway stations."
  },
  {
    "spotId": "jp-fukuoka-metro-wifi",
    "name": "Fukuoka City Subway Free WiFi",
    "nameJa": "福岡市地下鉄 Free WiFi",
    "nameZh": "福冈地铁免费WiFi",
    "nameKo": "후쿠오카 지하철 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "Fukuoka_City_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Fukuoka subway: Kuko (Airport), Hakozaki, Nanakuma lines."
  },
  {
    "spotId": "jp-toyoko-inn-wifi",
    "name": "Toyoko Inn Free WiFi",
    "nameJa": "東横イン Free WiFi",
    "nameZh": "东横INN免费WiFi",
    "nameKo": "도요코인 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "TOYOKO-INN",
      "toyoko-inn-wifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Budget hotel chain. 330+ locations nationwide. No portal on most."
  },
  {
    "spotId": "jp-apa-hotel-wifi",
    "name": "APA Hotel Free WiFi",
    "nameJa": "アパホテル Free WiFi",
    "nameZh": "APA酒店免费WiFi",
    "nameKo": "APA 호텔 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "APA_HOTEL",
      "APA-HOTEL-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Business hotel chain. 700+ locations. Room key auth on some."
  },
  {
    "spotId": "jp-route-inn-wifi",
    "name": "Route Inn Free WiFi",
    "nameJa": "ルートイン Free WiFi",
    "nameZh": "Route Inn免费WiFi",
    "nameKo": "루트인 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "ROUTE-INN",
      "route-inn-wifi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Business hotel chain. 300+ locations."
  },
  {
    "spotId": "jp-super-hotel-wifi",
    "name": "Super Hotel Free WiFi",
    "nameJa": "スーパーホテル Free WiFi",
    "nameZh": "Super Hotel免费WiFi",
    "nameKo": "슈퍼 호텔 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "SuperHotel_Free_Wi-Fi",
      "SUPER_HOTEL"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Budget hotel chain. Natural hot springs at many locations."
  },
  {
    "spotId": "jp-kawasaki-wifi",
    "name": "Kawasaki Free WiFi",
    "nameJa": "川崎 Free WiFi",
    "nameZh": "川崎免费WiFi",
    "nameKo": "가와사키 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "KAWASAKI_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kawasaki Station area and Lazona."
  },
  {
    "spotId": "jp-chiba-wifi",
    "name": "Chiba Free WiFi",
    "nameJa": "千葉 Free WiFi",
    "nameZh": "千叶免费WiFi",
    "nameKo": "치바 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "CHIBA_Free_Wi-Fi",
      "Chiba_City_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Chiba Station area, Makuhari Messe."
  },
  {
    "spotId": "jp-niigata-wifi",
    "name": "Niigata Free WiFi",
    "nameJa": "新潟 Free WiFi",
    "nameZh": "新潟免费WiFi",
    "nameKo": "니가타 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "NIIGATA_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Niigata Station, Bandai area."
  },
  {
    "spotId": "jp-shizuoka-wifi",
    "name": "Shizuoka Free WiFi",
    "nameJa": "静岡 Free WiFi",
    "nameZh": "静冈免费WiFi",
    "nameKo": "시즈오카 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "SHIZUOKA_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Shizuoka Station, Mt. Fuji area."
  },
  {
    "spotId": "jp-matsumoto-wifi",
    "name": "Matsumoto Free WiFi",
    "nameJa": "松本 Free WiFi",
    "nameZh": "松本免费WiFi",
    "nameKo": "마츠모토 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "MATSUMOTO_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Matsumoto Castle area, Kamikochi gateway."
  },
  {
    "spotId": "jp-takayama-wifi",
    "name": "Takayama Free WiFi",
    "nameJa": "高山 Free WiFi",
    "nameZh": "高山免费WiFi",
    "nameKo": "다카야마 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "TAKAYAMA_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Historic old town, Takayama Jinya area."
  },
  {
    "spotId": "jp-hakodate-wifi",
    "name": "Hakodate Free WiFi",
    "nameJa": "函館 Free WiFi",
    "nameZh": "函馆免费WiFi",
    "nameKo": "하코다테 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "HAKODATE_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Hakodate Station, Mt. Hakodate ropeway, Motomachi."
  },
  {
    "spotId": "jp-kumamoto-wifi",
    "name": "Kumamoto Free WiFi",
    "nameJa": "熊本 Free WiFi",
    "nameZh": "熊本免费WiFi",
    "nameKo": "구마모토 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "KUMAMOTO_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kumamoto Castle area, Kumamoto Station."
  },
  {
    "spotId": "jp-nagasaki-wifi",
    "name": "Nagasaki Free WiFi",
    "nameJa": "長崎 Free WiFi",
    "nameZh": "长崎免费WiFi",
    "nameKo": "나가사키 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "NAGASAKI_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Nagasaki Station, Glover Garden, Peace Park."
  },
  {
    "spotId": "jp-kagoshima-wifi",
    "name": "Kagoshima Free WiFi",
    "nameJa": "鹿児島 Free WiFi",
    "nameZh": "鹿儿岛免费WiFi",
    "nameKo": "가고시마 무료 WiFi",
    "airportCode": null,
    "country": "JP",
    "ssids": [
      "KAGOSHIMA_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kagoshima-Chuo Station, Sakurajima ferry terminal."
  },
  {
    "spotId": "jp-ngs-wifi",
    "name": "Nagasaki Airport Free WiFi",
    "nameJa": "長崎空港 Free WiFi",
    "nameZh": "长崎机场免费WiFi",
    "nameKo": "나가사키 공항 무료 WiFi",
    "airportCode": "NGS",
    "country": "JP",
    "ssids": [
      "NAGASAKI-AIRPORT_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Nagasaki Airport terminal."
  },
  {
    "spotId": "jp-okj-wifi",
    "name": "Okayama Airport Free WiFi",
    "nameJa": "岡山空港 Free WiFi",
    "nameZh": "冈山机场免费WiFi",
    "nameKo": "오카야마 공항 무료 WiFi",
    "airportCode": "OKJ",
    "country": "JP",
    "ssids": [
      "OKJ_Free_Wi-Fi",
      "Okayama_Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Gateway to Kurashiki and Setouchi area."
  },
  {
    "spotId": "jp-asj-wifi",
    "name": "Amami Oshima Airport Free WiFi",
    "nameJa": "奄美空港 Free WiFi",
    "nameZh": "奄美大岛机场免费WiFi",
    "nameKo": "아마미 공항 무료 WiFi",
    "airportCode": "ASJ",
    "country": "JP",
    "ssids": [
      "Amami_Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Amami Oshima island airport."
  },
  {
    "spotId": "jp-ish-wifi",
    "name": "Ishigaki Airport Free WiFi",
    "nameJa": "石垣空港 Free WiFi",
    "nameZh": "石垣机场免费WiFi",
    "nameKo": "이시가키 공항 무료 WiFi",
    "airportCode": "ISG",
    "country": "JP",
    "ssids": [
      "ISG_Free_Wi-Fi",
      "Ishigaki_Airport_Free_Wi-Fi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Okinawa Ishigaki island airport."
  },
  {
    "spotId": "global-marriott-wifi",
    "name": "Marriott Bonvoy WiFi",
    "nameJa": "マリオット WiFi",
    "nameZh": "万豪酒店WiFi",
    "nameKo": "메리어트 WiFi",
    "airportCode": null,
    "country": "GLOBAL",
    "ssids": [
      "Marriott_GUEST",
      "MarriottBonvoy_Guest",
      "Marriott_Conference"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Marriott, Sheraton, W, Westin, Ritz-Carlton. Room number + last name auth at some properties."
  },
  {
    "spotId": "global-hilton-wifi",
    "name": "Hilton WiFi",
    "nameJa": "ヒルトン WiFi",
    "nameZh": "希尔顿酒店WiFi",
    "nameKo": "힐튼 WiFi",
    "airportCode": null,
    "country": "GLOBAL",
    "ssids": [
      "hhonors",
      "HiltonGuest",
      "Hilton_Guest"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Hilton, DoubleTree, Hampton, Conrad. Honors member or room auth."
  },
  {
    "spotId": "global-ihg-wifi",
    "name": "IHG Hotels WiFi",
    "nameJa": "IHG WiFi",
    "nameZh": "IHG酒店WiFi",
    "nameKo": "IHG WiFi",
    "airportCode": null,
    "country": "GLOBAL",
    "ssids": [
      "IHG Connect",
      "IHG-Guest",
      "Holiday Inn WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Holiday Inn, Crowne Plaza, InterContinental, Kimpton."
  },
  {
    "spotId": "global-hyatt-wifi",
    "name": "Hyatt WiFi",
    "nameJa": "ハイアット WiFi",
    "nameZh": "凯悦酒店WiFi",
    "nameKo": "하얏트 WiFi",
    "airportCode": null,
    "country": "GLOBAL",
    "ssids": [
      "Hyatt_Guest",
      "HyattWiFi",
      "Hyatt"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Grand Hyatt, Park Hyatt, Andaz, Alila."
  },
  {
    "spotId": "global-accor-wifi",
    "name": "Accor Hotels WiFi",
    "nameJa": "アコーホテル WiFi",
    "nameZh": "雅高酒店WiFi",
    "nameKo": "아코르 호텔 WiFi",
    "airportCode": null,
    "country": "GLOBAL",
    "ssids": [
      "Accor_Guest",
      "AccorWiFi",
      "Novotel_Guest",
      "ibis_Guest"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Sofitel, Novotel, ibis, Mercure, Pullman. Strong in Europe & Asia."
  },
  {
    "spotId": "us-starbucks-wifi",
    "name": "Starbucks WiFi (US)",
    "nameJa": "スターバックス WiFi（米国）",
    "nameZh": "星巴克WiFi（美国）",
    "nameKo": "스타벅스 WiFi (미국)",
    "airportCode": null,
    "country": "US",
    "ssids": [
      "Google Starbucks",
      "Starbucks WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free unlimited WiFi via Google at all US Starbucks."
  },
  {
    "spotId": "kr-starbucks-wifi",
    "name": "Starbucks WiFi (Korea)",
    "nameJa": "スターバックス WiFi（韓国）",
    "nameZh": "星巴克WiFi（韩国）",
    "nameKo": "스타벅스 WiFi (한국)",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "KT_starbucks"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Starbucks Korea via KT. All stores."
  },
  {
    "spotId": "cn-starbucks-wifi",
    "name": "Starbucks WiFi (China)",
    "nameJa": "スターバックス WiFi（中国）",
    "nameZh": "星巴克WiFi（中国）",
    "nameKo": "스타벅스 WiFi (중국)",
    "airportCode": null,
    "country": "CN",
    "ssids": [
      "Starbucks",
      "STARBUCKS"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Phone number registration required at China stores."
  },
  {
    "spotId": "gb-starbucks-wifi",
    "name": "Starbucks WiFi (UK)",
    "nameJa": "スターバックス WiFi（イギリス）",
    "nameZh": "星巴克WiFi（英国）",
    "nameKo": "스타벅스 WiFi (영국)",
    "airportCode": null,
    "country": "GB",
    "ssids": [
      "Starbucks WiFi",
      "BT Wi-fi Starbucks"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi via BT at all UK Starbucks."
  },
  {
    "spotId": "us-mcdonalds-wifi",
    "name": "McDonald's WiFi (US)",
    "nameJa": "マクドナルド WiFi（米国）",
    "nameZh": "麦当劳WiFi（美国）",
    "nameKo": "맥도날드 WiFi (미국)",
    "airportCode": null,
    "country": "US",
    "ssids": [
      "McDonald's Free WiFi",
      "McDonalds Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at most US McDonald's locations."
  },
  {
    "spotId": "kr-mcdonalds-wifi",
    "name": "McDonald's WiFi (Korea)",
    "nameJa": "マクドナルド WiFi（韓国）",
    "nameZh": "麦当劳WiFi（韩国）",
    "nameKo": "맥도날드 WiFi (한국)",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "McDonald's_Free_WiFi",
      "McDonalds_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Korea McDonald's."
  },
  {
    "spotId": "us-linknyc-wifi",
    "name": "LinkNYC Free WiFi",
    "nameJa": "LinkNYC 無料WiFi",
    "nameZh": "LinkNYC免费WiFi",
    "nameKo": "LinkNYC 무료 WiFi",
    "airportCode": null,
    "country": "US",
    "ssids": [
      "LinkNYC Free Wi-Fi",
      "LinkNYC"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "NYC street kiosks. High-speed free WiFi across Manhattan and boroughs."
  },
  {
    "spotId": "us-nyc-subway-wifi",
    "name": "NYC Subway WiFi",
    "nameJa": "ニューヨーク地下鉄 WiFi",
    "nameZh": "纽约地铁WiFi",
    "nameKo": "뉴욕 지하철 WiFi",
    "airportCode": null,
    "country": "US",
    "ssids": [
      "TransitWirelessWiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at all NYC subway stations (not in tunnels)."
  },
  {
    "spotId": "us-bart-wifi",
    "name": "BART WiFi (San Francisco)",
    "nameJa": "BART WiFi（サンフランシスコ）",
    "nameZh": "BART WiFi（旧金山）",
    "nameKo": "BART WiFi (샌프란시스코)",
    "airportCode": null,
    "country": "US",
    "ssids": [
      "BART_WiFi",
      "BART Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Bay Area Rapid Transit stations."
  },
  {
    "spotId": "us-wmata-wifi",
    "name": "DC Metro WiFi",
    "nameJa": "ワシントンDC メトロ WiFi",
    "nameZh": "华盛顿地铁WiFi",
    "nameKo": "워싱턴 DC 메트로 WiFi",
    "airportCode": null,
    "country": "US",
    "ssids": [
      "Metro_WiFi",
      "WMATA_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Washington Metro stations."
  },
  {
    "spotId": "us-iad-wifi",
    "name": "Washington Dulles Airport",
    "nameJa": "ワシントン・ダレス空港",
    "nameZh": "华盛顿杜勒斯机场",
    "nameKo": "워싱턴 덜레스 공항",
    "airportCode": "IAD",
    "country": "US",
    "ssids": [
      "IAD Free WiFi",
      "USAirportWiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Dulles International."
  },
  {
    "spotId": "us-las-wifi",
    "name": "Las Vegas Harry Reid Airport",
    "nameJa": "ラスベガス空港",
    "nameZh": "拉斯维加斯机场",
    "nameKo": "라스베이거스 공항",
    "airportCode": "LAS",
    "country": "US",
    "ssids": [
      "LAS Free WiFi",
      "_Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Harry Reid International."
  },
  {
    "spotId": "us-msp-wifi",
    "name": "Minneapolis-Saint Paul Airport",
    "nameJa": "ミネアポリス空港",
    "nameZh": "明尼阿波利斯机场",
    "nameKo": "미니애폴리스 공항",
    "airportCode": "MSP",
    "country": "US",
    "ssids": [
      "MSP Free WiFi",
      "MSP-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at MSP."
  },
  {
    "spotId": "us-phx-wifi",
    "name": "Phoenix Sky Harbor Airport",
    "nameJa": "フェニックス空港",
    "nameZh": "凤凰城机场",
    "nameKo": "피닉스 공항",
    "airportCode": "PHX",
    "country": "US",
    "ssids": [
      "PHX Free WiFi",
      "PHX-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Free WiFi at Sky Harbor."
  },
  {
    "spotId": "kr-kt-wifi",
    "name": "KT Free WiFi Zone",
    "nameJa": "KT Free WiFi（韓国）",
    "nameZh": "KT免费WiFi（韩国）",
    "nameKo": "KT 무료 WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "KT-Free-WiFi",
      "olleh_WiFi",
      "KT_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "KT public WiFi zones across Korea. Cafes, malls, public areas."
  },
  {
    "spotId": "kr-skt-wifi",
    "name": "SK Telecom T WiFi Zone",
    "nameJa": "SKテレコム WiFi（韓国）",
    "nameZh": "SKT WiFi（韩国）",
    "nameKo": "SKT WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "T wifi zone",
      "SKT-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "SK Telecom public WiFi. Available at malls, restaurants."
  },
  {
    "spotId": "kr-lotte-wifi",
    "name": "Lotte Department Store WiFi",
    "nameJa": "ロッテ百貨店 WiFi",
    "nameZh": "乐天百货WiFi",
    "nameKo": "롯데백화점 WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "LOTTE_DEPT_Free_WiFi",
      "Lotte_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Lotte Department Store and Lotte Mall locations."
  },
  {
    "spotId": "kr-shinsegae-wifi",
    "name": "Shinsegae Department Store WiFi",
    "nameJa": "新世界百貨店 WiFi",
    "nameZh": "新世界百货WiFi",
    "nameKo": "신세계백화점 WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "SHINSEGAE_Free_WiFi",
      "Shinsegae_Guest"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Shinsegae Dept Store and Starfield Mall."
  },
  {
    "spotId": "kr-coex-wifi",
    "name": "COEX Mall WiFi",
    "nameJa": "COEX WiFi",
    "nameZh": "COEX WiFi",
    "nameKo": "COEX WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "COEX_Free_WiFi",
      "COEX_Guest"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "COEX Mall and Convention Center, Gangnam."
  },
  {
    "spotId": "kr-ediya-wifi",
    "name": "Ediya Coffee WiFi",
    "nameJa": "イディヤコーヒー WiFi",
    "nameZh": "易迪雅咖啡WiFi",
    "nameKo": "이디야 커피 WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "EDIYA_Free_WiFi",
      "ediya"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Korea's largest coffee chain by store count."
  },
  {
    "spotId": "kr-twosome-wifi",
    "name": "A Twosome Place WiFi",
    "nameJa": "ツーサムプレイス WiFi",
    "nameZh": "A Twosome Place WiFi",
    "nameKo": "투썸플레이스 WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "TWOSOME_Free_WiFi",
      "ATwosome"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Major Korean cafe chain."
  },
  {
    "spotId": "kr-daegu-metro",
    "name": "Daegu Metro WiFi",
    "nameJa": "大邱地下鉄 WiFi",
    "nameZh": "大邱地铁WiFi",
    "nameKo": "대구 지하철 WiFi",
    "airportCode": null,
    "country": "KR",
    "ssids": [
      "Daegu_Metro_WiFi",
      "DGMRT_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Daegu Metropolitan Transit."
  },
  {
    "spotId": "tw-tpe-metro-wifi",
    "name": "Taipei MRT WiFi",
    "nameJa": "台北MRT WiFi",
    "nameZh": "台北捷运WiFi",
    "nameKo": "타이베이 MRT WiFi",
    "airportCode": null,
    "country": "TW",
    "ssids": [
      "TPE-Free",
      "Taipei Free"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Taipei Free WiFi available at all MRT stations."
  },
  {
    "spotId": "tw-7eleven-wifi",
    "name": "7-ELEVEN WiFi (Taiwan)",
    "nameJa": "セブンイレブン WiFi（台湾）",
    "nameZh": "7-11 WiFi（台湾）",
    "nameKo": "세븐일레븐 WiFi (대만)",
    "airportCode": null,
    "country": "TW",
    "ssids": [
      "7-ELEVEN",
      "7-11_Free_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "7-ELEVEN is everywhere in Taiwan. Phone/email registration."
  },
  {
    "spotId": "tw-familymart-wifi",
    "name": "FamilyMart WiFi (Taiwan)",
    "nameJa": "ファミリーマート WiFi（台湾）",
    "nameZh": "全家WiFi（台湾）",
    "nameKo": "패밀리마트 WiFi (대만)",
    "airportCode": null,
    "country": "TW",
    "ssids": [
      "FamilyMart_WiFi",
      "Fami_Free_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "FamilyMart Taiwan. Phone/email registration."
  },
  {
    "spotId": "tw-taichung-wifi",
    "name": "Taichung Free WiFi",
    "nameJa": "台中市 WiFi",
    "nameZh": "台中免费WiFi",
    "nameKo": "타이중시 WiFi",
    "airportCode": null,
    "country": "TW",
    "ssids": [
      "Taichung Free",
      "iTaichung"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Taichung city public WiFi."
  },
  {
    "spotId": "cn-shanghai-metro-wifi",
    "name": "Shanghai Metro WiFi",
    "nameJa": "上海地下鉄 WiFi",
    "nameZh": "上海地铁WiFi",
    "nameKo": "상하이 지하철 WiFi",
    "airportCode": null,
    "country": "CN",
    "ssids": [
      "SH-Metro-Free",
      "Metro_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Shanghai Metro stations. Phone number registration."
  },
  {
    "spotId": "cn-beijing-metro-wifi",
    "name": "Beijing Metro WiFi",
    "nameJa": "北京地下鉄 WiFi",
    "nameZh": "北京地铁WiFi",
    "nameKo": "베이징 지하철 WiFi",
    "airportCode": null,
    "country": "CN",
    "ssids": [
      "MyWiFi",
      "Beijing_Metro_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Beijing Metro WiFi. Chinese phone number may be required."
  },
  {
    "spotId": "cn-hangzhou-wifi",
    "name": "Hangzhou Public WiFi",
    "nameJa": "杭州市 WiFi",
    "nameZh": "杭州公共WiFi",
    "nameKo": "항저우 WiFi",
    "airportCode": null,
    "country": "CN",
    "ssids": [
      "i-Hangzhou",
      "Hangzhou_Free_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Hangzhou city WiFi. West Lake area, stations."
  },
  {
    "spotId": "cn-nanjing-wifi",
    "name": "Nanjing Airport",
    "nameJa": "南京空港",
    "nameZh": "南京禄口机场",
    "nameKo": "난징 공항",
    "airportCode": "NKG",
    "country": "CN",
    "ssids": [
      "NKG_Free_WiFi",
      "Airport-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Nanjing Lukou International Airport."
  },
  {
    "spotId": "cn-haikou-wifi",
    "name": "Haikou Meilan Airport",
    "nameJa": "海口空港",
    "nameZh": "海口美兰机场",
    "nameKo": "하이커우 공항",
    "airportCode": "HAK",
    "country": "CN",
    "ssids": [
      "HAK_Free_WiFi",
      "MeilanAirport"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Hainan island gateway."
  },
  {
    "spotId": "eu-eurostar-wifi",
    "name": "Eurostar WiFi",
    "nameJa": "ユーロスター WiFi",
    "nameZh": "欧洲之星WiFi",
    "nameKo": "유로스타 WiFi",
    "airportCode": null,
    "country": "EU",
    "ssids": [
      "Eurostar_WiFi",
      "_Eurostar"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "London-Paris-Brussels-Amsterdam high-speed train."
  },
  {
    "spotId": "eu-flixbus-wifi",
    "name": "FlixBus WiFi",
    "nameJa": "FlixBus WiFi",
    "nameZh": "FlixBus WiFi",
    "nameKo": "FlixBus WiFi",
    "airportCode": null,
    "country": "EU",
    "ssids": [
      "FlixBus",
      "FlixBus WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Europe-wide bus service. Free WiFi on all buses."
  },
  {
    "spotId": "it-roma-wifi",
    "name": "Roma WiFi",
    "nameJa": "ローマ市 WiFi",
    "nameZh": "罗马市WiFi",
    "nameKo": "로마시 WiFi",
    "airportCode": null,
    "country": "IT",
    "ssids": [
      "Roma WiFi",
      "RM_free_wifi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "Rome city WiFi at major tourist areas."
  },
  {
    "spotId": "es-barcelona-wifi",
    "name": "Barcelona WiFi",
    "nameJa": "バルセロナ市 WiFi",
    "nameZh": "巴塞罗那市WiFi",
    "nameKo": "바르셀로나시 WiFi",
    "airportCode": null,
    "country": "ES",
    "ssids": [
      "Barcelona WiFi",
      "BCN_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Barcelona city WiFi. Ramblas, Placa Catalunya, beaches."
  },
  {
    "spotId": "nl-amsterdam-wifi",
    "name": "Amsterdam Free WiFi",
    "nameJa": "アムステルダム市 WiFi",
    "nameZh": "阿姆斯特丹市WiFi",
    "nameKo": "암스테르담시 WiFi",
    "airportCode": null,
    "country": "NL",
    "ssids": [
      "Amsterdam Free WiFi",
      "iAmsterdam"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Amsterdam city WiFi. Central Station, Museumplein area."
  },
  {
    "spotId": "at-vienna-wifi",
    "name": "Wien (Vienna) Free WiFi",
    "nameJa": "ウィーン市 WiFi",
    "nameZh": "维也纳市WiFi",
    "nameKo": "비엔나시 WiFi",
    "airportCode": null,
    "country": "AT",
    "ssids": [
      "freewave@vienna",
      "wien.at Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Vienna city WiFi. Parks, public buildings, tourist spots."
  },
  {
    "spotId": "cz-prague-wifi",
    "name": "Prague Free WiFi",
    "nameJa": "プラハ市 WiFi",
    "nameZh": "布拉格市WiFi",
    "nameKo": "프라하시 WiFi",
    "airportCode": null,
    "country": "CZ",
    "ssids": [
      "PraguePublicWifi",
      "Prague Free WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Prague city WiFi. Old Town, Wenceslas Square."
  },
  {
    "spotId": "hu-bud-wifi",
    "name": "Budapest Airport",
    "nameJa": "ブダペスト空港",
    "nameZh": "布达佩斯机场",
    "nameKo": "부다페스트 공항",
    "airportCode": "BUD",
    "country": "HU",
    "ssids": [
      "BUD Free WiFi",
      "Budapest Airport WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Budapest Ferenc Liszt International Airport."
  },
  {
    "spotId": "hr-zag-wifi",
    "name": "Zagreb Airport",
    "nameJa": "ザグレブ空港",
    "nameZh": "萨格勒布机场",
    "nameKo": "자그레브 공항",
    "airportCode": "ZAG",
    "country": "HR",
    "ssids": [
      "ZAG Free WiFi",
      "Zagreb Airport WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Zagreb Franjo Tudman Airport."
  },
  {
    "spotId": "bg-sof-wifi",
    "name": "Sofia Airport",
    "nameJa": "ソフィア空港",
    "nameZh": "索非亚机场",
    "nameKo": "소피아 공항",
    "airportCode": "SOF",
    "country": "BG",
    "ssids": [
      "SOF Free WiFi",
      "Sofia Airport WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Sofia Airport."
  },
  {
    "spotId": "ro-otp-wifi",
    "name": "Bucharest Henri Coanda Airport",
    "nameJa": "ブカレスト空港",
    "nameZh": "布加勒斯特机场",
    "nameKo": "부쿠레슈티 공항",
    "airportCode": "OTP",
    "country": "RO",
    "ssids": [
      "OTP Free WiFi",
      "Bucharest Airport WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Bucharest Otopeni Airport."
  },
  {
    "spotId": "th-centralworld-wifi",
    "name": "CentralWorld WiFi (Bangkok)",
    "nameJa": "セントラルワールド WiFi",
    "nameZh": "尚泰世界WiFi",
    "nameKo": "센트럴월드 WiFi",
    "airportCode": null,
    "country": "TH",
    "ssids": [
      "CentralWorld_WiFi",
      "Central_Free_WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "CentralWorld and Central Group malls in Thailand."
  },
  {
    "spotId": "vn-lotte-wifi",
    "name": "Lotte Mart WiFi (Vietnam)",
    "nameJa": "ロッテマート WiFi（ベトナム）",
    "nameZh": "乐天玛特WiFi（越南）",
    "nameKo": "롯데마트 WiFi (베트남)",
    "airportCode": null,
    "country": "VN",
    "ssids": [
      "LOTTE_MART_Free_WiFi",
      "LotteMart"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Lotte Mart stores in Ho Chi Minh, Hanoi, Da Nang."
  },
  {
    "spotId": "id-jakartamrt-wifi",
    "name": "Jakarta MRT WiFi",
    "nameJa": "ジャカルタMRT WiFi",
    "nameZh": "雅加达地铁WiFi",
    "nameKo": "자카르타 MRT WiFi",
    "airportCode": null,
    "country": "ID",
    "ssids": [
      "MRT_Jakarta_WiFi",
      "MRTJ_Free_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Jakarta MRT stations. Bundaran HI, Dukuh Atas, etc."
  },
  {
    "spotId": "ph-sm-wifi",
    "name": "SM Mall WiFi (Philippines)",
    "nameJa": "SMモール WiFi（フィリピン）",
    "nameZh": "SM商场WiFi（菲律宾）",
    "nameKo": "SM 몰 WiFi (필리핀)",
    "airportCode": null,
    "country": "PH",
    "ssids": [
      "SM_Free_WiFi",
      "SM-WiFi"
    ],
    "portalType": "registration",
    "tier": "free",
    "patternData": {
      "registration": {
        "emailSelector": "input[type=\"email\"], input[name*=\"mail\"]",
        "submitSelector": "input[type=\"submit\"], button[type=\"submit\"]"
      }
    },
    "notes": "SM Supermalls - largest mall chain in Philippines."
  },
  {
    "spotId": "sg-jewel-wifi",
    "name": "Jewel Changi Airport WiFi",
    "nameJa": "ジュエル・チャンギ WiFi",
    "nameZh": "星耀樟宜WiFi",
    "nameKo": "주얼 창이 WiFi",
    "airportCode": null,
    "country": "SG",
    "ssids": [
      "Jewel_Free_WiFi",
      "#WiFi@Changi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Jewel Changi Airport shopping complex."
  },
  {
    "spotId": "kh-pnh-wifi",
    "name": "Phnom Penh Airport",
    "nameJa": "プノンペン空港",
    "nameZh": "金边机场",
    "nameKo": "프놈펜 공항",
    "airportCode": "PNH",
    "country": "KH",
    "ssids": [
      "PNH Free WiFi",
      "PNH-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Phnom Penh International Airport."
  },
  {
    "spotId": "kh-rep-wifi",
    "name": "Siem Reap Airport",
    "nameJa": "シェムリアップ空港",
    "nameZh": "暹粒机场",
    "nameKo": "시엠립 공항",
    "airportCode": "REP",
    "country": "KH",
    "ssids": [
      "REP Free WiFi",
      "SiemReap_Airport_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Siem Reap-Angkor International. Gateway to Angkor Wat."
  },
  {
    "spotId": "la-vte-wifi",
    "name": "Vientiane Wattay Airport",
    "nameJa": "ビエンチャン空港",
    "nameZh": "万象瓦岱机场",
    "nameKo": "비엔티안 공항",
    "airportCode": "VTE",
    "country": "LA",
    "ssids": [
      "VTE Free WiFi",
      "Wattay_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Wattay International Airport, Vientiane."
  },
  {
    "spotId": "mm-rgn-wifi",
    "name": "Yangon Airport",
    "nameJa": "ヤンゴン空港",
    "nameZh": "仰光机场",
    "nameKo": "양곤 공항",
    "airportCode": "RGN",
    "country": "MM",
    "ssids": [
      "RGN Free WiFi",
      "YangonAirport_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Yangon International Airport."
  },
  {
    "spotId": "np-ktm-wifi",
    "name": "Kathmandu Airport",
    "nameJa": "カトマンズ空港",
    "nameZh": "加德满都机场",
    "nameKo": "카트만두 공항",
    "airportCode": "KTM",
    "country": "NP",
    "ssids": [
      "TIA Free WiFi",
      "KTM-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Tribhuvan International Airport."
  },
  {
    "spotId": "bd-dac-wifi",
    "name": "Dhaka Hazrat Shahjalal Airport",
    "nameJa": "ダッカ空港",
    "nameZh": "达卡机场",
    "nameKo": "다카 공항",
    "airportCode": "DAC",
    "country": "BD",
    "ssids": [
      "HSIA Free WiFi",
      "DAC-WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Hazrat Shahjalal International Airport."
  },
  {
    "spotId": "pk-isb-wifi",
    "name": "Islamabad Airport",
    "nameJa": "イスラマバード空港",
    "nameZh": "伊斯兰堡机场",
    "nameKo": "이슬라마바드 공항",
    "airportCode": "ISB",
    "country": "PK",
    "ssids": [
      "ISB Free WiFi",
      "NewIslamabadAirport_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "New Islamabad International Airport."
  },
  {
    "spotId": "ng-los-wifi",
    "name": "Lagos Murtala Muhammed Airport",
    "nameJa": "ラゴス空港",
    "nameZh": "拉各斯机场",
    "nameKo": "라고스 공항",
    "airportCode": "LOS",
    "country": "NG",
    "ssids": [
      "LOS Free WiFi",
      "MMIA_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Lagos Murtala Muhammed International."
  },
  {
    "spotId": "tn-tun-wifi",
    "name": "Tunis-Carthage Airport",
    "nameJa": "チュニス空港",
    "nameZh": "突尼斯机场",
    "nameKo": "튀니스 공항",
    "airportCode": "TUN",
    "country": "TN",
    "ssids": [
      "TUN Free WiFi",
      "Tunis_Airport_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Tunis-Carthage International Airport."
  },
  {
    "spotId": "om-mct-wifi",
    "name": "Muscat Airport",
    "nameJa": "マスカット空港",
    "nameZh": "马斯喀特机场",
    "nameKo": "무스카트 공항",
    "airportCode": "MCT",
    "country": "OM",
    "ssids": [
      "MCT Free WiFi",
      "Muscat_Airport_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Muscat International Airport."
  },
  {
    "spotId": "bh-bah-wifi",
    "name": "Bahrain Airport",
    "nameJa": "バーレーン空港",
    "nameZh": "巴林机场",
    "nameKo": "바레인 공항",
    "airportCode": "BAH",
    "country": "BH",
    "ssids": [
      "BAH Free WiFi",
      "Bahrain_Airport_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Bahrain International Airport."
  },
  {
    "spotId": "kw-kwi-wifi",
    "name": "Kuwait Airport",
    "nameJa": "クウェート空港",
    "nameZh": "科威特机场",
    "nameKo": "쿠웨이트 공항",
    "airportCode": "KWI",
    "country": "KW",
    "ssids": [
      "KWI Free WiFi",
      "Kuwait_Airport_WiFi"
    ],
    "portalType": "agree_only",
    "tier": "free",
    "patternData": {
      "agreeOnly": {
        "agreeButtonSelector": "input[type=\"submit\"], button[type=\"submit\"], .btn-primary, a.btn"
      }
    },
    "notes": "Kuwait International Airport."
  }
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
      version: 11,
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
