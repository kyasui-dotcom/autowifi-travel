import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata, getGuideOgImageUrl } from "@/lib/seo";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/lib/components/JsonLd";
import {
  getAboutPageUrl,
  getAuthorProfileUrl,
  getEditorialPolicyUrl,
  getReviewMethodologyUrl,
} from "@/lib/content/eeat";
import { getExtraGuideItems } from "@/lib/guides/extraGuides";
import styles from "./page.module.css";

type Locale = "en" | "ja" | "ko" | "zh";

interface GuideItem {
  slug: string;
  title: string;
  desc: string;
  category: string;
}

interface PageContent {
  title: string;
  subtitle: string;
  featuredTitle: string;
  featuredSubtitle: string;
  categoryCountry: string;
  categoryHowto: string;
  categoryTopic: string;
  guides: GuideItem[];
}

const FEATURED_GUIDE_SLUGS = [
  "international-esim",
  "global-esim",
  "esim-vs-roaming",
  "esim-unlimited-data",
  "esim-for-honeymoon",
  "esim-for-backpackers",
  "esim-for-solo-travel",
  "airport-connectivity-guide",
  "esim-for-layovers",
  "esim-vs-airport-sim",
  "esim-for-road-trips",
  "travel-internet-options",
  "dual-sim-esim",
  "save-money-roaming",
  "how-much-data-do-i-need-for-travel",
  "esim-compatible-phones",
  "esim-vs-sim-card",
  "esim-prepaid-vs-postpaid",
  "international-calling-esim",
  "esim-speed-test",
  "best-esim-providers",
  "cheapest-esim-plans",
  "best-esim-for-europe",
  "best-esim-for-southeast-asia",
  "best-esim-for-north-america",
  "regional-esim-vs-country-esim",
  "esim-fair-use-policy",
  "travel-esim-with-phone-number",
] as const;

const CONTENT: Record<Locale, PageContent> = {
  ja: {
    title: "eSIM旅行ガイド",
    subtitle: "海外旅行のインターネット接続に関する完全ガイド集",
    featuredTitle: "優先的に読みたい比較ガイド",
    featuredSubtitle: "購入直前の検索意図が強いテーマを先にまとめています。",
    categoryCountry: "国別eSIMガイド",
    categoryHowto: "使い方・設定ガイド",
    categoryTopic: "お役立ち情報",
    guides: [
      // Country guides
      { slug: "japan-esim", title: "日本のeSIMガイド", desc: "日本旅行のeSIM活用法と通信事情", category: "country" },
      { slug: "korea-esim", title: "韓国のeSIMガイド", desc: "韓国の高速5GとeSIM活用法", category: "country" },
      { slug: "thailand-esim", title: "タイのeSIMガイド", desc: "タイ旅行のeSIMとコスパ最強プラン", category: "country" },
      { slug: "usa-esim", title: "アメリカのeSIMガイド", desc: "アメリカ旅行のeSIMとカバレッジ情報", category: "country" },
      { slug: "uk-esim", title: "イギリスのeSIMガイド", desc: "イギリス旅行のeSIMと通信事情", category: "country" },
      { slug: "france-esim", title: "フランスのeSIMガイド", desc: "フランス旅行のeSIMとEUローミング", category: "country" },
      { slug: "italy-esim", title: "イタリアのeSIMガイド", desc: "イタリア旅行のeSIMと観光地カバレッジ", category: "country" },
      { slug: "spain-esim", title: "スペインのeSIMガイド", desc: "スペイン旅行のeSIMと都市別ガイド", category: "country" },
      { slug: "germany-esim", title: "ドイツのeSIMガイド", desc: "ドイツ旅行のeSIMと通信インフラ", category: "country" },
      { slug: "australia-esim", title: "オーストラリアのeSIMガイド", desc: "オーストラリア旅行のeSIMと広大なカバレッジ", category: "country" },
      { slug: "singapore-esim", title: "シンガポールのeSIMガイド", desc: "シンガポール旅行のeSIMと高速通信", category: "country" },
      { slug: "taiwan-esim", title: "台湾のeSIMガイド", desc: "台湾旅行のeSIMと通信事情", category: "country" },
      { slug: "vietnam-esim", title: "ベトナムのeSIMガイド", desc: "ベトナム旅行のeSIMとコスパ情報", category: "country" },
      { slug: "indonesia-esim", title: "インドネシアのeSIMガイド", desc: "バリ島・ジャカルタのeSIM活用法", category: "country" },
      { slug: "malaysia-esim", title: "マレーシアのeSIMガイド", desc: "マレーシア旅行のeSIMとカバレッジ", category: "country" },
      { slug: "philippines-esim", title: "フィリピンのeSIMガイド", desc: "フィリピン旅行のeSIMと島嶼カバレッジ", category: "country" },
      { slug: "china-esim", title: "中国のeSIMガイド", desc: "中国旅行のeSIMとVPN・通信規制情報", category: "country" },
      { slug: "canada-esim", title: "カナダのeSIMガイド", desc: "カナダ旅行のeSIMと広大な国土カバレッジ", category: "country" },
      { slug: "turkey-esim", title: "トルコのeSIMガイド", desc: "トルコ旅行のeSIMと観光地カバレッジ", category: "country" },
      { slug: "india-esim", title: "インドのeSIMガイド", desc: "インド旅行のeSIMと通信事情", category: "country" },
      { slug: "hawaii-esim", title: "ハワイのeSIMガイド", desc: "ハワイ旅行のeSIMと島別カバレッジ", category: "country" },
      { slug: "guam-esim", title: "グアムのeSIMガイド", desc: "グアム旅行のeSIMとリゾートエリア", category: "country" },
      { slug: "hong-kong-esim", title: "香港のeSIMガイド", desc: "香港旅行のeSIMと高速5G通信", category: "country" },
      { slug: "dubai-esim", title: "ドバイのeSIMガイド", desc: "ドバイ・UAE旅行のeSIM活用法", category: "country" },
      { slug: "europe-esim", title: "ヨーロッパ周遊eSIMガイド", desc: "1枚のeSIMでヨーロッパ複数国を周遊", category: "country" },
      { slug: "cambodia-esim", title: "カンボジアのeSIMガイド", desc: "アンコールワット・プノンペンのeSIM活用法", category: "country" },
      { slug: "greece-esim", title: "ギリシャのeSIMガイド", desc: "ギリシャの島巡りとeSIM通信事情", category: "country" },
      { slug: "mexico-esim", title: "メキシコのeSIMガイド", desc: "カンクン・メキシコシティのeSIM活用法", category: "country" },
      { slug: "new-zealand-esim", title: "ニュージーランドのeSIMガイド", desc: "NZ旅行のeSIMとドライブ旅行", category: "country" },
      { slug: "norway-esim", title: "ノルウェーのeSIMガイド", desc: "フィヨルド・オーロラ観光のeSIM", category: "country" },
      { slug: "portugal-esim", title: "ポルトガルのeSIMガイド", desc: "リスボン・ポルトのeSIMとEUローミング", category: "country" },
      { slug: "switzerland-esim", title: "スイスのeSIMガイド", desc: "スイス旅行のeSIMとアルプス通信事情", category: "country" },
      { slug: "morocco-esim", title: "モロッコのeSIMガイド", desc: "マラケシュ・サハラ砂漠のeSIM活用法", category: "country" },
      { slug: "iceland-esim", title: "アイスランドのeSIMガイド", desc: "レイキャビク・リングロードのeSIMとオーロラ旅の通信事情", category: "country" },
      { slug: "sri-lanka-esim", title: "スリランカのeSIMガイド", desc: "コロンボ・キャンディ・南海岸を回る旅のeSIM活用法", category: "country" },
      // How-to guides
      { slug: "how-to-setup-esim", title: "eSIMの設定方法", desc: "iPhone・AndroidでのeSIM設定手順", category: "howto" },
      { slug: "esim-compatible-phones", title: "eSIM対応スマホ一覧", desc: "eSIMが使えるスマートフォン完全リスト", category: "howto" },
      { slug: "esim-troubleshooting", title: "eSIMトラブルシューティング", desc: "よくある問題と解決方法", category: "howto" },
      { slug: "esim-vs-sim-card", title: "eSIM vs 物理SIMカード", desc: "eSIMと従来のSIMカードの違いを徹底比較", category: "howto" },
      { slug: "esim-for-business-travel", title: "ビジネス旅行のeSIM", desc: "出張者向けeSIM活用ガイド", category: "howto" },
      { slug: "first-time-esim", title: "初めてのeSIM完全ガイド", desc: "eSIM初心者のための入門ガイド", category: "howto" },
      { slug: "esim-data-plans-explained", title: "eSIMデータプラン解説", desc: "データ容量・有効期限・カバレッジの選び方", category: "howto" },
      { slug: "travel-internet-options", title: "海外旅行のネット接続方法", desc: "eSIM・WiFi・ローミング・SIMを比較", category: "howto" },
      { slug: "dual-sim-esim", title: "デュアルSIM活用ガイド", desc: "自分の番号を残しつつ海外データを使う方法", category: "howto" },
      { slug: "esim-for-students", title: "留学生のためのeSIM", desc: "長期留学でのeSIM活用術", category: "howto" },
      { slug: "esim-long-term-travel", title: "長期旅行のeSIM", desc: "長期旅行者・ノマド向けeSIMプラン", category: "howto" },
      { slug: "save-money-roaming", title: "ローミング料金節約術", desc: "高額な海外ローミングを避ける方法", category: "howto" },
      { slug: "wifi-vs-esim", title: "モバイルWiFi vs eSIM", desc: "海外旅行のネット接続を徹底比較", category: "howto" },
      // Topic guides
      { slug: "asia-travel-connectivity", title: "アジア旅行の通信ガイド", desc: "アジア各国の通信インフラとeSIM事情", category: "topic" },
      { slug: "europe-travel-connectivity", title: "ヨーロッパ旅行の通信ガイド", desc: "EU圏の通信ルールとeSIM活用法", category: "topic" },
      { slug: "best-esim-providers", title: "海外eSIMおすすめ比較", desc: "主要eSIMサービスの比較と選び方", category: "topic" },
      { slug: "international-esim", title: "international eSIM比較", desc: "海外旅行向けの global・regional・local eSIM を比較", category: "topic" },
      { slug: "travel-data-usage-tips", title: "旅行中のデータ節約術", desc: "モバイルデータを賢く使うテクニック", category: "topic" },
      { slug: "international-calling-esim", title: "eSIMでの国際通話", desc: "eSIMを使った海外通話の方法と料金", category: "topic" },
      { slug: "cruise-travel-esim", title: "クルーズ旅行のeSIM", desc: "クルーズ旅行での通信手段ガイド", category: "topic" },
      { slug: "digital-nomad-esim", title: "デジタルノマドのeSIM", desc: "ノマドワーカー向けeSIM活用ガイド", category: "topic" },
      { slug: "family-travel-esim", title: "家族旅行のeSIM", desc: "家族全員分のeSIM管理と設定", category: "topic" },
      { slug: "esim-prepaid-vs-postpaid", title: "プリペイド vs ポストペイドeSIM", desc: "eSIMの料金体系を比較", category: "topic" },
      { slug: "esim-security-tips", title: "eSIMのセキュリティ", desc: "eSIMの安全性とプライバシー保護", category: "topic" },
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド", desc: "世界の主要空港のWiFi・通信事情", category: "topic" },
      { slug: "esim-activation-timing", title: "eSIMの有効化タイミング", desc: "出発前と到着後、いつ有効化すべきか", category: "topic" },
      { slug: "travel-apps-esim", title: "eSIMと使える旅行アプリ", desc: "eSIMと一緒に使いたいおすすめアプリ", category: "topic" },
      { slug: "esim-iphone-setup", title: "iPhone eSIM設定ガイド", desc: "iPhoneでのeSIM設定を完全解説", category: "howto" },
      { slug: "esim-android-setup", title: "Android eSIM設定ガイド", desc: "AndroidスマホのeSIM設定手順", category: "howto" },
      { slug: "airalo-review", title: "Airaloレビュー・評判", desc: "Airaloの料金・品質・使い勝手を徹底検証", category: "topic" },
      { slug: "holafly-review", title: "Holaflyレビュー・評判", desc: "Holaflyの無制限プランを徹底検証", category: "topic" },
      { slug: "esim-speed-test", title: "eSIM速度テスト比較", desc: "主要eSIMサービスの通信速度を実測比較", category: "topic" },
      { slug: "esim-for-remote-workers", title: "リモートワーカーのeSIM", desc: "海外ノマドワーカー向けeSIM選び", category: "topic" },
      { slug: "pocket-wifi-vs-esim-japan", title: "ポケットWiFi vs eSIM 日本", desc: "日本旅行でポケットWiFiとeSIMを比較", category: "topic" },
      { slug: "esim-unlimited-data", title: "無制限データeSIM比較", desc: "データ無制限のeSIMプランを徹底比較", category: "topic" },
    ],
  },
  en: {
    title: "eSIM Travel Guides",
    subtitle: "Complete guide collection for staying connected while traveling abroad",
    featuredTitle: "Featured comparison guides",
    featuredSubtitle: "Start with the high-intent topics travelers read right before buying.",
    categoryCountry: "Country eSIM Guides",
    categoryHowto: "How-to & Setup Guides",
    categoryTopic: "Tips & Resources",
    guides: [
      { slug: "japan-esim", title: "Japan eSIM Guide", desc: "Tokyo arrivals, airport rail, hotel Wi-Fi backup, and eSIM setup for Japan travel", category: "country" },
      { slug: "korea-esim", title: "South Korea eSIM Guide", desc: "Seoul arrivals, AREX transfers, hotel Wi-Fi backup, and high-speed 5G eSIM tips", category: "country" },
      { slug: "thailand-esim", title: "Thailand eSIM Guide", desc: "Best value eSIM plans for Thailand travel", category: "country" },
      { slug: "usa-esim", title: "USA eSIM Guide", desc: "eSIM coverage and plans for the United States", category: "country" },
      { slug: "uk-esim", title: "UK eSIM Guide", desc: "eSIM guide for traveling in the United Kingdom", category: "country" },
      { slug: "france-esim", title: "France eSIM Guide", desc: "eSIM and EU roaming for France travel", category: "country" },
      { slug: "italy-esim", title: "Italy eSIM Guide", desc: "eSIM coverage across Italian cities and attractions", category: "country" },
      { slug: "spain-esim", title: "Spain eSIM Guide", desc: "eSIM guide for traveling across Spain", category: "country" },
      { slug: "germany-esim", title: "Germany eSIM Guide", desc: "eSIM and connectivity in Germany", category: "country" },
      { slug: "australia-esim", title: "Australia eSIM Guide", desc: "eSIM coverage across Australia's vast territory", category: "country" },
      { slug: "singapore-esim", title: "Singapore eSIM Guide", desc: "High-speed eSIM for Changi arrivals, stopovers, and city travel", category: "country" },
      { slug: "taiwan-esim", title: "Taiwan eSIM Guide", desc: "eSIM guide for Taiwan travel", category: "country" },
      { slug: "vietnam-esim", title: "Vietnam eSIM Guide", desc: "Affordable eSIM plans for Vietnam", category: "country" },
      { slug: "indonesia-esim", title: "Indonesia eSIM Guide", desc: "eSIM for Bali, Jakarta and beyond", category: "country" },
      { slug: "malaysia-esim", title: "Malaysia eSIM Guide", desc: "eSIM coverage across Malaysia", category: "country" },
      { slug: "philippines-esim", title: "Philippines eSIM Guide", desc: "eSIM for the Philippine islands", category: "country" },
      { slug: "china-esim", title: "China eSIM Guide", desc: "eSIM, VPN and connectivity in China", category: "country" },
      { slug: "canada-esim", title: "Canada eSIM Guide", desc: "eSIM coverage across Canada", category: "country" },
      { slug: "turkey-esim", title: "Turkey eSIM Guide", desc: "eSIM for traveling in Turkey", category: "country" },
      { slug: "india-esim", title: "India eSIM Guide", desc: "eSIM and connectivity in India", category: "country" },
      { slug: "hawaii-esim", title: "Hawaii eSIM Guide", desc: "eSIM for Hawaiian island hopping", category: "country" },
      { slug: "guam-esim", title: "Guam eSIM Guide", desc: "eSIM for Guam resort travel", category: "country" },
      { slug: "hong-kong-esim", title: "Hong Kong eSIM Guide", desc: "5G eSIM for airport arrivals, Airport Express transfers, and Macau day trips", category: "country" },
      { slug: "dubai-esim", title: "Dubai & UAE eSIM Guide", desc: "eSIM for Dubai red-eye arrivals, UAE stopovers, and hotel transfers", category: "country" },
      { slug: "europe-esim", title: "Europe Multi-Country eSIM", desc: "One eSIM for traveling across Europe", category: "country" },
      { slug: "cambodia-esim", title: "Cambodia eSIM Guide", desc: "eSIM for Angkor Wat and Phnom Penh travel", category: "country" },
      { slug: "greece-esim", title: "Greece eSIM Guide", desc: "eSIM for Greek islands and Athens", category: "country" },
      { slug: "mexico-esim", title: "Mexico eSIM Guide", desc: "eSIM for Cancun, Mexico City and beyond", category: "country" },
      { slug: "new-zealand-esim", title: "New Zealand eSIM Guide", desc: "eSIM for NZ road trips and adventures", category: "country" },
      { slug: "norway-esim", title: "Norway eSIM Guide", desc: "eSIM for fjords and Northern Lights", category: "country" },
      { slug: "portugal-esim", title: "Portugal eSIM Guide", desc: "eSIM for Lisbon, Porto and EU roaming", category: "country" },
      { slug: "switzerland-esim", title: "Switzerland eSIM Guide", desc: "eSIM for Swiss Alps and cities", category: "country" },
      { slug: "morocco-esim", title: "Morocco eSIM Guide", desc: "eSIM for Marrakech and Sahara travel", category: "country" },
      { slug: "iceland-esim", title: "Iceland eSIM Guide", desc: "eSIM for Reykjavik, the Ring Road and Northern Lights trips", category: "country" },
      { slug: "sri-lanka-esim", title: "Sri Lanka eSIM Guide", desc: "eSIM for Colombo, Kandy and south coast travel", category: "country" },
      { slug: "how-to-setup-esim", title: "How to Set Up eSIM", desc: "Step-by-step eSIM setup for iPhone & Android", category: "howto" },
      { slug: "esim-compatible-phones", title: "eSIM Compatible Phones", desc: "Complete list of eSIM-supported devices", category: "howto" },
      { slug: "esim-troubleshooting", title: "eSIM Troubleshooting", desc: "Common problems and how to fix them", category: "howto" },
      { slug: "esim-vs-sim-card", title: "eSIM vs Physical SIM Card", desc: "Detailed comparison of eSIM and traditional SIM", category: "howto" },
      { slug: "esim-for-business-travel", title: "eSIM for Business Travel", desc: "Secure mobile data for business arrivals, airport rail, hotel Wi-Fi backup, and transit days", category: "howto" },
      { slug: "first-time-esim", title: "First-Time eSIM Guide", desc: "Complete beginner's guide to eSIM", category: "howto" },
      { slug: "esim-data-plans-explained", title: "eSIM Data Plans Explained", desc: "Understanding data, validity and coverage", category: "howto" },
      { slug: "travel-internet-options", title: "Travel Internet Options", desc: "Compare eSIM, WiFi, roaming, and SIM cards", category: "howto" },
      { slug: "dual-sim-esim", title: "Dual SIM with eSIM", desc: "Keep your number while using data abroad", category: "howto" },
      { slug: "esim-for-students", title: "eSIM for Students Abroad", desc: "eSIM tips for study abroad students", category: "howto" },
      { slug: "esim-long-term-travel", title: "eSIM for Long-Term Travel", desc: "eSIM plans for extended trips", category: "howto" },
      { slug: "save-money-roaming", title: "Avoid Roaming Charges", desc: "How to save on international roaming", category: "howto" },
      { slug: "wifi-vs-esim", title: "Mobile WiFi vs eSIM", desc: "Complete comparison for travelers", category: "howto" },
      { slug: "asia-travel-connectivity", title: "Asia Travel Connectivity", desc: "Internet infrastructure across Asia", category: "topic" },
      { slug: "europe-travel-connectivity", title: "Europe Travel Connectivity", desc: "EU roaming rules and eSIM tips", category: "topic" },
      { slug: "best-esim-providers", title: "Best Travel eSIM Providers", desc: "Compare leading travel eSIM services", category: "topic" },
      { slug: "international-esim", title: "International eSIM Guide", desc: "Compare local, regional, and global eSIM options for travel", category: "topic" },
      { slug: "global-esim", title: "Global eSIM Guide", desc: "Understand when a worldwide eSIM beats local and regional travel plans", category: "topic" },
      { slug: "esim-vs-roaming", title: "eSIM vs Roaming", desc: "Compare roaming convenience with travel eSIM price control before you buy", category: "topic" },
      { slug: "best-esim-for-north-america", title: "Best eSIM for North America", desc: "Compare USA, Canada, and cross-border eSIM options for North America trips", category: "topic" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM Guide", desc: "Learn when unlimited travel eSIM plans are actually worth it and what limits to check first", category: "topic" },
      { slug: "travel-data-usage-tips", title: "Save Data While Traveling", desc: "Tips to reduce mobile data usage", category: "topic" },
      { slug: "international-calling-esim", title: "International Calls with eSIM", desc: "Making calls abroad with eSIM", category: "topic" },
      { slug: "cruise-travel-esim", title: "eSIM for Cruise Travel", desc: "Staying connected on cruise ships", category: "topic" },
      { slug: "digital-nomad-esim", title: "Digital Nomad eSIM Guide", desc: "eSIM for remote workers worldwide", category: "topic" },
      { slug: "family-travel-esim", title: "eSIM for Family Travel", desc: "Managing eSIM for the whole family", category: "topic" },
      { slug: "esim-prepaid-vs-postpaid", title: "Prepaid vs Postpaid eSIM", desc: "Understanding eSIM pricing models", category: "topic" },
      { slug: "esim-security-tips", title: "eSIM Security Tips", desc: "eSIM safety and privacy protection", category: "topic" },
      { slug: "airport-connectivity-guide", title: "Airport Connectivity Guide", desc: "Compare airport WiFi, airport rail, hotel transfers, and first-hour arrival connectivity in major hub cities", category: "topic" },
      { slug: "esim-for-layovers", title: "Best eSIM for Layovers", desc: "Compare Tokyo, Seoul, Hong Kong, Singapore, and Dubai for stopovers, overnight arrivals, airport rail, and hotel transfers", category: "topic" },
      { slug: "esim-activation-timing", title: "When to Activate eSIM", desc: "Before departure vs after arrival", category: "topic" },
      { slug: "travel-apps-esim", title: "Best Travel Apps for eSIM", desc: "Must-have apps for eSIM travelers", category: "topic" },
      { slug: "esim-iphone-setup", title: "iPhone eSIM Setup Guide", desc: "Complete step-by-step iPhone eSIM activation", category: "howto" },
      { slug: "esim-android-setup", title: "Android eSIM Setup Guide", desc: "How to set up eSIM on Android phones", category: "howto" },
      { slug: "airalo-review", title: "Airalo Review & Ratings", desc: "In-depth review of Airalo eSIM service", category: "topic" },
      { slug: "holafly-review", title: "Holafly Review & Ratings", desc: "Honest review of Holafly unlimited plans", category: "topic" },
      { slug: "esim-speed-test", title: "eSIM Speed Test Comparison", desc: "Real-world speed tests of top eSIM providers", category: "topic" },
      { slug: "esim-for-remote-workers", title: "eSIM for Remote Workers", desc: "Best eSIM options for digital nomads", category: "topic" },
      { slug: "pocket-wifi-vs-esim-japan", title: "Pocket WiFi vs eSIM in Japan", desc: "Which is better for Japan travel?", category: "topic" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM Plans", desc: "Compare unlimited eSIM data plans", category: "topic" },
    ],
  },
  ko: {
    title: "eSIM 여행 가이드",
    subtitle: "해외여행 인터넷 연결에 관한 완벽 가이드 모음",
    featuredTitle: "우선 읽어야 할 비교 가이드",
    featuredSubtitle: "구매 직전 검색 의도가 강한 핵심 주제를 먼저 모았습니다.",
    categoryCountry: "국가별 eSIM 가이드",
    categoryHowto: "사용법·설정 가이드",
    categoryTopic: "유용한 정보",
    guides: [
      { slug: "japan-esim", title: "일본 eSIM 가이드", desc: "일본 여행을 위한 eSIM 활용법", category: "country" },
      { slug: "korea-esim", title: "한국 eSIM 가이드", desc: "한국의 고속 5G와 eSIM 팁", category: "country" },
      { slug: "thailand-esim", title: "태국 eSIM 가이드", desc: "태국 여행 최고의 eSIM 플랜", category: "country" },
      { slug: "usa-esim", title: "미국 eSIM 가이드", desc: "미국 여행을 위한 eSIM 커버리지", category: "country" },
      { slug: "uk-esim", title: "영국 eSIM 가이드", desc: "영국 여행을 위한 eSIM 가이드", category: "country" },
      { slug: "france-esim", title: "프랑스 eSIM 가이드", desc: "프랑스 여행과 EU 로밍", category: "country" },
      { slug: "italy-esim", title: "이탈리아 eSIM 가이드", desc: "이탈리아 주요 도시 eSIM 커버리지", category: "country" },
      { slug: "spain-esim", title: "스페인 eSIM 가이드", desc: "스페인 여행을 위한 eSIM", category: "country" },
      { slug: "germany-esim", title: "독일 eSIM 가이드", desc: "독일의 통신 인프라와 eSIM", category: "country" },
      { slug: "australia-esim", title: "호주 eSIM 가이드", desc: "호주 광활한 대륙의 eSIM 커버리지", category: "country" },
      { slug: "singapore-esim", title: "싱가포르 eSIM 가이드", desc: "싱가포르 고속 eSIM 통신", category: "country" },
      { slug: "taiwan-esim", title: "대만 eSIM 가이드", desc: "대만 여행을 위한 eSIM", category: "country" },
      { slug: "vietnam-esim", title: "베트남 eSIM 가이드", desc: "베트남의 저렴한 eSIM 플랜", category: "country" },
      { slug: "indonesia-esim", title: "인도네시아 eSIM 가이드", desc: "발리·자카르타 eSIM 활용법", category: "country" },
      { slug: "malaysia-esim", title: "말레이시아 eSIM 가이드", desc: "말레이시아 여행 eSIM 커버리지", category: "country" },
      { slug: "philippines-esim", title: "필리핀 eSIM 가이드", desc: "필리핀 섬 지역 eSIM 커버리지", category: "country" },
      { slug: "china-esim", title: "중국 eSIM 가이드", desc: "중국의 eSIM과 VPN·통신 규제", category: "country" },
      { slug: "canada-esim", title: "캐나다 eSIM 가이드", desc: "캐나다 광활한 국토의 eSIM", category: "country" },
      { slug: "turkey-esim", title: "터키 eSIM 가이드", desc: "터키 여행을 위한 eSIM", category: "country" },
      { slug: "india-esim", title: "인도 eSIM 가이드", desc: "인도의 통신 사정과 eSIM", category: "country" },
      { slug: "hawaii-esim", title: "하와이 eSIM 가이드", desc: "하와이 섬별 eSIM 커버리지", category: "country" },
      { slug: "guam-esim", title: "괌 eSIM 가이드", desc: "괌 리조트 여행 eSIM", category: "country" },
      { slug: "hong-kong-esim", title: "홍콩 eSIM 가이드", desc: "홍콩 고속 5G eSIM 통신", category: "country" },
      { slug: "dubai-esim", title: "두바이 eSIM 가이드", desc: "두바이·UAE 여행 eSIM", category: "country" },
      { slug: "europe-esim", title: "유럽 다국가 eSIM 가이드", desc: "하나의 eSIM으로 유럽 여행", category: "country" },
      { slug: "cambodia-esim", title: "캄보디아 eSIM 가이드", desc: "앙코르와트·프놈펜 eSIM 활용법", category: "country" },
      { slug: "greece-esim", title: "그리스 eSIM 가이드", desc: "그리스 섬 여행과 eSIM 통신", category: "country" },
      { slug: "mexico-esim", title: "멕시코 eSIM 가이드", desc: "칸쿤·멕시코시티 eSIM 활용법", category: "country" },
      { slug: "new-zealand-esim", title: "뉴질랜드 eSIM 가이드", desc: "뉴질랜드 로드트립과 eSIM", category: "country" },
      { slug: "norway-esim", title: "노르웨이 eSIM 가이드", desc: "피오르드·오로라 여행 eSIM", category: "country" },
      { slug: "portugal-esim", title: "포르투갈 eSIM 가이드", desc: "리스본·포르투 eSIM과 EU 로밍", category: "country" },
      { slug: "switzerland-esim", title: "스위스 eSIM 가이드", desc: "스위스 알프스와 도시 eSIM", category: "country" },
      { slug: "morocco-esim", title: "모로코 eSIM 가이드", desc: "마라케시·사하라 사막 eSIM", category: "country" },
      { slug: "iceland-esim", title: "아이슬란드 eSIM 가이드", desc: "레이캬비크·링로드·오로라 여행용 eSIM", category: "country" },
      { slug: "sri-lanka-esim", title: "스리랑카 eSIM 가이드", desc: "콜롬보·캔디·남해안 여행용 eSIM", category: "country" },
      { slug: "how-to-setup-esim", title: "eSIM 설정 방법", desc: "iPhone·Android eSIM 설정 안내", category: "howto" },
      { slug: "esim-compatible-phones", title: "eSIM 호환 스마트폰", desc: "eSIM 지원 기기 전체 목록", category: "howto" },
      { slug: "esim-troubleshooting", title: "eSIM 문제 해결", desc: "자주 발생하는 문제와 해결 방법", category: "howto" },
      { slug: "esim-vs-sim-card", title: "eSIM vs 물리 SIM", desc: "eSIM과 기존 SIM 카드 비교", category: "howto" },
      { slug: "esim-for-business-travel", title: "출장용 eSIM", desc: "비즈니스 여행자를 위한 eSIM", category: "howto" },
      { slug: "first-time-esim", title: "처음 사용하는 eSIM", desc: "eSIM 초보자를 위한 완벽 가이드", category: "howto" },
      { slug: "esim-data-plans-explained", title: "eSIM 데이터 플랜 설명", desc: "데이터·유효기간·커버리지 이해하기", category: "howto" },
      { slug: "travel-internet-options", title: "여행 인터넷 옵션", desc: "eSIM·WiFi·로밍·SIM 비교", category: "howto" },
      { slug: "dual-sim-esim", title: "듀얼 SIM 활용법", desc: "내 번호를 유지하면서 해외 데이터 사용", category: "howto" },
      { slug: "esim-for-students", title: "유학생 eSIM", desc: "유학 시 eSIM 활용 팁", category: "howto" },
      { slug: "esim-long-term-travel", title: "장기 여행 eSIM", desc: "장기 여행자를 위한 eSIM 플랜", category: "howto" },
      { slug: "save-money-roaming", title: "로밍 요금 절약법", desc: "비싼 해외 로밍을 피하는 방법", category: "howto" },
      { slug: "wifi-vs-esim", title: "포켓 WiFi vs eSIM", desc: "해외 여행 인터넷 완벽 비교", category: "howto" },
      { slug: "asia-travel-connectivity", title: "아시아 여행 통신 가이드", desc: "아시아 각국의 통신 인프라", category: "topic" },
      { slug: "europe-travel-connectivity", title: "유럽 여행 통신 가이드", desc: "EU 로밍 규정과 eSIM 팁", category: "topic" },
      { slug: "best-esim-providers", title: "추천 여행 eSIM 비교", desc: "주요 여행 eSIM 서비스 비교", category: "topic" },
      { slug: "international-esim", title: "international eSIM 가이드", desc: "여행용 local·regional·global eSIM 비교", category: "topic" },
      { slug: "travel-data-usage-tips", title: "여행 중 데이터 절약법", desc: "모바일 데이터 절약 팁", category: "topic" },
      { slug: "international-calling-esim", title: "eSIM 국제 전화", desc: "eSIM으로 해외 통화하기", category: "topic" },
      { slug: "cruise-travel-esim", title: "크루즈 여행 eSIM", desc: "크루즈에서의 통신 수단", category: "topic" },
      { slug: "digital-nomad-esim", title: "디지털 노마드 eSIM", desc: "원격 근무자를 위한 eSIM", category: "topic" },
      { slug: "family-travel-esim", title: "가족 여행 eSIM", desc: "온 가족의 eSIM 관리", category: "topic" },
      { slug: "esim-prepaid-vs-postpaid", title: "선불 vs 후불 eSIM", desc: "eSIM 요금 체계 비교", category: "topic" },
      { slug: "esim-security-tips", title: "eSIM 보안 팁", desc: "eSIM 안전과 개인정보 보호", category: "topic" },
      { slug: "airport-connectivity-guide", title: "공항 WiFi 가이드", desc: "전 세계 주요 공항 통신 사정", category: "topic" },
      { slug: "esim-activation-timing", title: "eSIM 활성화 타이밍", desc: "출발 전 vs 도착 후 활성화", category: "topic" },
      { slug: "travel-apps-esim", title: "eSIM 여행 앱 추천", desc: "eSIM과 함께 쓸 필수 앱", category: "topic" },
      { slug: "esim-iphone-setup", title: "iPhone eSIM 설정 가이드", desc: "iPhone eSIM 활성화 완전 가이드", category: "howto" },
      { slug: "esim-android-setup", title: "Android eSIM 설정 가이드", desc: "Android 스마트폰 eSIM 설정 방법", category: "howto" },
      { slug: "airalo-review", title: "Airalo 리뷰·평판", desc: "Airalo eSIM 서비스 심층 리뷰", category: "topic" },
      { slug: "holafly-review", title: "Holafly 리뷰·평판", desc: "Holafly 무제한 플랜 솔직 리뷰", category: "topic" },
      { slug: "esim-speed-test", title: "eSIM 속도 테스트 비교", desc: "주요 eSIM 서비스 실측 속도 비교", category: "topic" },
      { slug: "esim-for-remote-workers", title: "원격 근무자를 위한 eSIM", desc: "디지털 노마드 최적 eSIM 선택법", category: "topic" },
      { slug: "pocket-wifi-vs-esim-japan", title: "포켓 WiFi vs eSIM 일본", desc: "일본 여행 시 어떤 것이 더 좋을까?", category: "topic" },
      { slug: "esim-unlimited-data", title: "무제한 데이터 eSIM 비교", desc: "데이터 무제한 eSIM 플랜 비교", category: "topic" },
    ],
  },
  zh: {
    title: "eSIM旅行指南",
    subtitle: "海外旅行网络连接完全指南合集",
    featuredTitle: "优先阅读的对比指南",
    featuredSubtitle: "先看这些购买前搜索意图最强的主题文章。",
    categoryCountry: "国家eSIM指南",
    categoryHowto: "使用方法·设置指南",
    categoryTopic: "实用资讯",
    guides: [
      { slug: "japan-esim", title: "日本eSIM指南", desc: "日本旅行eSIM使用全攻略", category: "country" },
      { slug: "korea-esim", title: "韩国eSIM指南", desc: "韩国高速5G和eSIM攻略", category: "country" },
      { slug: "thailand-esim", title: "泰国eSIM指南", desc: "泰国旅行超值eSIM方案", category: "country" },
      { slug: "usa-esim", title: "美国eSIM指南", desc: "美国旅行eSIM覆盖和方案", category: "country" },
      { slug: "uk-esim", title: "英国eSIM指南", desc: "英国旅行eSIM使用指南", category: "country" },
      { slug: "france-esim", title: "法国eSIM指南", desc: "法国旅行和EU漫游", category: "country" },
      { slug: "italy-esim", title: "意大利eSIM指南", desc: "意大利各城市eSIM覆盖", category: "country" },
      { slug: "spain-esim", title: "西班牙eSIM指南", desc: "西班牙旅行eSIM指南", category: "country" },
      { slug: "germany-esim", title: "德国eSIM指南", desc: "德国通信基础设施和eSIM", category: "country" },
      { slug: "australia-esim", title: "澳大利亚eSIM指南", desc: "澳洲广袤大陆的eSIM覆盖", category: "country" },
      { slug: "singapore-esim", title: "新加坡eSIM指南", desc: "新加坡高速eSIM通信", category: "country" },
      { slug: "taiwan-esim", title: "台湾eSIM指南", desc: "台湾旅行eSIM攻略", category: "country" },
      { slug: "vietnam-esim", title: "越南eSIM指南", desc: "越南超值eSIM方案", category: "country" },
      { slug: "indonesia-esim", title: "印度尼西亚eSIM指南", desc: "巴厘岛·雅加达eSIM使用", category: "country" },
      { slug: "malaysia-esim", title: "马来西亚eSIM指南", desc: "马来西亚旅行eSIM覆盖", category: "country" },
      { slug: "philippines-esim", title: "菲律宾eSIM指南", desc: "菲律宾岛屿eSIM覆盖", category: "country" },
      { slug: "china-esim", title: "中国eSIM指南", desc: "中国eSIM和VPN·通信限制", category: "country" },
      { slug: "canada-esim", title: "加拿大eSIM指南", desc: "加拿大广阔国土的eSIM", category: "country" },
      { slug: "turkey-esim", title: "土耳其eSIM指南", desc: "土耳其旅行eSIM指南", category: "country" },
      { slug: "india-esim", title: "印度eSIM指南", desc: "印度通信状况和eSIM", category: "country" },
      { slug: "hawaii-esim", title: "夏威夷eSIM指南", desc: "夏威夷各岛eSIM覆盖", category: "country" },
      { slug: "guam-esim", title: "关岛eSIM指南", desc: "关岛度假eSIM使用", category: "country" },
      { slug: "hong-kong-esim", title: "香港eSIM指南", desc: "香港高速5G eSIM", category: "country" },
      { slug: "dubai-esim", title: "迪拜eSIM指南", desc: "迪拜·阿联酋旅行eSIM", category: "country" },
      { slug: "europe-esim", title: "欧洲多国eSIM指南", desc: "一张eSIM游遍欧洲", category: "country" },
      { slug: "cambodia-esim", title: "柬埔寨eSIM指南", desc: "吴哥窟·金边旅行eSIM攻略", category: "country" },
      { slug: "greece-esim", title: "希腊eSIM指南", desc: "希腊海岛和雅典eSIM通信", category: "country" },
      { slug: "mexico-esim", title: "墨西哥eSIM指南", desc: "坎昆·墨西哥城eSIM使用", category: "country" },
      { slug: "new-zealand-esim", title: "新西兰eSIM指南", desc: "新西兰自驾旅行eSIM", category: "country" },
      { slug: "norway-esim", title: "挪威eSIM指南", desc: "峡湾·北极光旅行eSIM", category: "country" },
      { slug: "portugal-esim", title: "葡萄牙eSIM指南", desc: "里斯本·波尔图eSIM和EU漫游", category: "country" },
      { slug: "switzerland-esim", title: "瑞士eSIM指南", desc: "瑞士阿尔卑斯和城市eSIM", category: "country" },
      { slug: "morocco-esim", title: "摩洛哥eSIM指南", desc: "马拉喀什·撒哈拉沙漠eSIM", category: "country" },
      { slug: "iceland-esim", title: "冰岛eSIM指南", desc: "雷克雅未克、环岛公路与极光旅行eSIM", category: "country" },
      { slug: "sri-lanka-esim", title: "斯里兰卡eSIM指南", desc: "科伦坡、康提与南海岸旅行eSIM", category: "country" },
      { slug: "how-to-setup-esim", title: "eSIM设置方法", desc: "iPhone·Android eSIM设置步骤", category: "howto" },
      { slug: "esim-compatible-phones", title: "eSIM兼容手机", desc: "支持eSIM的设备完整列表", category: "howto" },
      { slug: "esim-troubleshooting", title: "eSIM故障排除", desc: "常见问题和解决方法", category: "howto" },
      { slug: "esim-vs-sim-card", title: "eSIM vs 实体SIM卡", desc: "eSIM和传统SIM卡对比", category: "howto" },
      { slug: "esim-for-business-travel", title: "商务出差eSIM", desc: "商务旅行者的eSIM指南", category: "howto" },
      { slug: "first-time-esim", title: "eSIM入门指南", desc: "eSIM新手完全指南", category: "howto" },
      { slug: "esim-data-plans-explained", title: "eSIM流量套餐详解", desc: "了解流量·有效期·覆盖范围", category: "howto" },
      { slug: "travel-internet-options", title: "旅行上网方式", desc: "eSIM·WiFi·漫游·SIM卡对比", category: "howto" },
      { slug: "dual-sim-esim", title: "双卡eSIM使用指南", desc: "保留原号码同时使用海外数据", category: "howto" },
      { slug: "esim-for-students", title: "留学生eSIM", desc: "留学时的eSIM使用技巧", category: "howto" },
      { slug: "esim-long-term-travel", title: "长期旅行eSIM", desc: "长期旅行者的eSIM方案", category: "howto" },
      { slug: "save-money-roaming", title: "节省漫游费用", desc: "如何避免高额海外漫游费", category: "howto" },
      { slug: "wifi-vs-esim", title: "随身WiFi vs eSIM", desc: "出境上网方式全面对比", category: "howto" },
      { slug: "asia-travel-connectivity", title: "亚洲旅行通信指南", desc: "亚洲各国通信基础设施", category: "topic" },
      { slug: "europe-travel-connectivity", title: "欧洲旅行通信指南", desc: "EU漫游规则和eSIM技巧", category: "topic" },
      { slug: "best-esim-providers", title: "旅行eSIM推荐对比", desc: "主流旅行eSIM服务比较", category: "topic" },
      { slug: "international-esim", title: "international eSIM 指南", desc: "比较旅行中的 local、regional 和 global eSIM", category: "topic" },
      { slug: "travel-data-usage-tips", title: "旅行省流量技巧", desc: "移动数据节省小贴士", category: "topic" },
      { slug: "international-calling-esim", title: "eSIM国际通话", desc: "用eSIM在海外打电话", category: "topic" },
      { slug: "cruise-travel-esim", title: "邮轮旅行eSIM", desc: "邮轮上的通信方案", category: "topic" },
      { slug: "digital-nomad-esim", title: "数字游民eSIM", desc: "远程工作者的eSIM指南", category: "topic" },
      { slug: "family-travel-esim", title: "家庭旅行eSIM", desc: "全家人的eSIM管理", category: "topic" },
      { slug: "esim-prepaid-vs-postpaid", title: "预付vs后付eSIM", desc: "eSIM计费方式对比", category: "topic" },
      { slug: "esim-security-tips", title: "eSIM安全提示", desc: "eSIM安全和隐私保护", category: "topic" },
      { slug: "airport-connectivity-guide", title: "机场WiFi指南", desc: "全球主要机场通信情况", category: "topic" },
      { slug: "esim-activation-timing", title: "eSIM激活时机", desc: "出发前还是到达后激活", category: "topic" },
      { slug: "travel-apps-esim", title: "eSIM旅行App推荐", desc: "配合eSIM使用的必备App", category: "topic" },
      { slug: "esim-iphone-setup", title: "iPhone eSIM设置指南", desc: "iPhone eSIM激活完全教程", category: "howto" },
      { slug: "esim-android-setup", title: "Android eSIM设置指南", desc: "Android手机eSIM设置步骤详解", category: "howto" },
      { slug: "airalo-review", title: "Airalo评测", desc: "Airalo eSIM服务深度评测", category: "topic" },
      { slug: "holafly-review", title: "Holafly评测", desc: "Holafly无限流量套餐评测", category: "topic" },
      { slug: "esim-speed-test", title: "eSIM速度测试对比", desc: "主流eSIM服务实测速度对比", category: "topic" },
      { slug: "esim-for-remote-workers", title: "远程工作者eSIM指南", desc: "数字游民最佳eSIM选择", category: "topic" },
      { slug: "pocket-wifi-vs-esim-japan", title: "随身WiFi vs eSIM 日本", desc: "日本旅行选哪个更好?", category: "topic" },
      { slug: "esim-unlimited-data", title: "无限流量eSIM对比", desc: "数据无限量eSIM套餐对比", category: "topic" },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({
    locale: locale as Locale,
    path: "/guide",
    title: c.title,
    description: c.subtitle,
    ogImage: getGuideOgImageUrl({
      locale: locale as Locale,
      path: "/guide",
      title: c.title,
      description: c.subtitle,
      kindLabel:
        locale === "ja"
          ? "Guide Index"
          : locale === "ko"
            ? "Guide Index"
            : locale === "zh"
              ? "Guide Index"
              : "Guide Index",
      footerLabel:
        locale === "ja"
          ? "eSIM Travel Guides"
          : locale === "ko"
            ? "eSIM Travel Guides"
            : locale === "zh"
              ? "eSIM Travel Guides"
              : "eSIM Travel Guides",
    }),
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const c = CONTENT[loc];
  const extraGuides = getExtraGuideItems(loc).filter(
    (guide) => !c.guides.some((existing) => existing.slug === guide.slug)
  );
  const guides = [...c.guides, ...extraGuides];
  const featuredGuides = FEATURED_GUIDE_SLUGS.map((slug) =>
    guides.find((guide) => guide.slug === slug)
  ).filter((guide): guide is GuideItem => Boolean(guide));

  const categories = [
    { key: "country", label: c.categoryCountry },
    { key: "howto", label: c.categoryHowto },
    { key: "topic", label: c.categoryTopic },
  ];

  const baseUrl = "https://autowifi-travel.com";

  return (
    <div className={styles.container}>
      <BreadcrumbJsonLd
        items={[
          { name: loc === "ja" ? "ホーム" : loc === "ko" ? "홈" : loc === "zh" ? "首页" : "Home", url: `${baseUrl}/${loc}` },
          { name: loc === "ja" ? "ガイド" : loc === "ko" ? "가이드" : loc === "zh" ? "指南" : "Guides", url: `${baseUrl}/${loc}/guide` },
        ]}
      />
      <ItemListJsonLd
        items={guides.map((g, i) => ({
          name: g.title,
          url: `${baseUrl}/${loc}/guide/${g.slug}`,
          position: i + 1,
        }))}
      />
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{c.title}</h1>
        <p className={styles.heroSubtitle}>{c.subtitle}</p>
        <p className={styles.featuredSubtitle}>
          {loc === "ja"
            ? "執筆主体と更新方針は編集チームプロフィールと編集方針ページで確認できます。"
            : loc === "ko"
            ? "작성 주체와 업데이트 기준은 편집팀 프로필과 편집 정책 페이지에서 확인할 수 있습니다."
            : loc === "zh"
            ? "内容作者和更新规则可在编辑团队简介与编辑政策页面中查看。"
            : "Authorship and update standards are disclosed on our editorial team profile and editorial policy pages."}
        </p>
        <div className={styles.heroActions}>
          <Link href={getAboutPageUrl(loc)} className={styles.guideCard} prefetch={false}>
            <h3 className={styles.guideTitle}>
              {loc === "ja"
                ? "AutoWiFi Travelについて"
                : loc === "ko"
                ? "AutoWiFi Travel 소개"
                : loc === "zh"
                ? "关于 AutoWiFi Travel"
                : "About AutoWiFi Travel"}
            </h3>
            <p className={styles.guideDesc}>
              {loc === "ja"
                ? "このサイトが何を公開し、誰のために運営しているかを確認できます。"
                : loc === "ko"
                ? "이 사이트가 누구를 위해 어떤 정보를 제공하는지 확인할 수 있습니다."
                : loc === "zh"
                ? "了解本站为谁服务，以及提供哪些信息。"
                : "See what this site publishes and who it is built to help."}
            </p>
          </Link>
          <Link href={getReviewMethodologyUrl(loc)} className={styles.guideCard} prefetch={false}>
            <h3 className={styles.guideTitle}>
              {loc === "ja"
                ? "eSIM比較・更新方法を見る"
                : loc === "ko"
                ? "eSIM 검토 방식 보기"
                : loc === "zh"
                ? "查看 eSIM 评估方式"
                : "How we review eSIMs"}
            </h3>
            <p className={styles.guideDesc}>
              {loc === "ja"
                ? "比較基準、更新方針、確認しているポイントを公開しています。"
                : loc === "ko"
                ? "비교 기준, 업데이트 원칙, 점검 항목을 공개합니다."
                : loc === "zh"
                ? "公开比较标准、更新规则和检查项目。"
                : "Review our criteria, update rules, and what we check before publishing."}
            </p>
          </Link>
          <Link href={getAuthorProfileUrl(loc)} className={styles.guideCard} prefetch={false}>
            <h3 className={styles.guideTitle}>
              {loc === "ja"
                ? "編集チームを見る"
                : loc === "ko"
                ? "편집팀 보기"
                : loc === "zh"
                ? "查看编辑团队"
                : "Meet the editorial team"}
            </h3>
            <p className={styles.guideDesc}>
              {loc === "ja"
                ? "執筆主体と担当領域を公開しています。"
                : loc === "ko"
                ? "작성 주체와 담당 영역을 공개합니다."
                : loc === "zh"
                ? "公开作者主体和负责范围。"
                : "See who maintains our guides and what they cover."}
            </p>
          </Link>
          <Link href={getEditorialPolicyUrl(loc)} className={styles.guideCard} prefetch={false}>
            <h3 className={styles.guideTitle}>
              {loc === "ja"
                ? "編集方針を見る"
                : loc === "ko"
                ? "편집 정책 보기"
                : loc === "zh"
                ? "查看编辑政策"
                : "Read the editorial policy"}
            </h3>
            <p className={styles.guideDesc}>
              {loc === "ja"
                ? "更新基準と開示方針を確認できます。"
                : loc === "ko"
                ? "업데이트 기준과 고지 원칙을 확인할 수 있습니다."
                : loc === "zh"
                ? "了解更新标准和披露原则。"
                : "Understand how content is reviewed, updated, and disclosed."}
            </p>
          </Link>
        </div>
      </header>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{c.featuredTitle}</h2>
        <p className={styles.featuredSubtitle}>{c.featuredSubtitle}</p>
        <div className={styles.guideGrid}>
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${loc}/guide/${guide.slug}`}
              className={styles.guideCard}
            >
              <h3 className={styles.guideTitle}>{guide.title}</h3>
              <p className={styles.guideDesc}>{guide.desc}</p>
              <span className={styles.readMore}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>
          {loc === "ja"
            ? "マイナー観光ガイド"
            : loc === "ko"
            ? "마이너 여행 가이드"
            : loc === "zh"
            ? "小众旅行指南"
            : "Minor travel guides"}
        </h2>
        <p className={styles.featuredSubtitle}>
          {loc === "ja"
            ? "静かな街歩きや少しマイナーな半日ルートを都市横断でまとめた観光ハブです。外国人旅行者向けに実用性を重視しています。"
            : loc === "ko"
            ? "조용한 산책과 조금 덜 알려진 반나절 루트를 도시별로 모은 여행 허브입니다. 외국인 여행자를 기준으로 구성했습니다."
            : loc === "zh"
            ? "集中整理更安静的街区散步和稍微小众的半日路线，重点面向外国游客。"
            : "A tourism-first hub for quieter neighborhood walks and low-key half-day routes built for foreign travelers."}
        </p>
        <div className={styles.guideGrid}>
          <Link href={`/${loc}/guide/minor-travel-guides`} className={styles.guideCard}>
            <h3 className={styles.guideTitle}>
              {loc === "ja"
                ? "マイナー観光ガイドを見る"
                : loc === "ko"
                ? "소규모 여행 가이드 보기"
                : loc === "zh"
                ? "查看小众旅行指南"
                : "Explore minor travel guides"}
            </h3>
            <p className={styles.guideDesc}>
              {loc === "ja"
                ? "東京の静かな街歩きに加えて、ソウル、京都、大阪などの低圧な半日ルートも、写真とX引用付きで見られます。"
                : loc === "ko"
                ? "도쿄의 조용한 산책뿐 아니라 서울, 교토, 오사카의 반나절 루트도 사진과 X 인용과 함께 볼 수 있습니다."
                : loc === "zh"
                ? "从一个入口查看东京、首尔、京都、大阪等地更安静的半日路线，并配有图片和 X 引用。"
                : "Browse quieter Tokyo routes plus newer Seoul, Kyoto, and Osaka half-day guides with photos and official X references."}
            </p>
            <span className={styles.readMore}>→</span>
          </Link>
        </div>
      </section>

      {categories.map((cat) => {
        const items = guides.filter((g) => g.category === cat.key);
        return (
          <section key={cat.key} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{cat.label}</h2>
            <div className={styles.guideGrid}>
              {items.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${loc}/guide/${guide.slug}`}
                  className={styles.guideCard}
                >
                  <h3 className={styles.guideTitle}>{guide.title}</h3>
                  <p className={styles.guideDesc}>{guide.desc}</p>
                  <span className={styles.readMore}>→</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
