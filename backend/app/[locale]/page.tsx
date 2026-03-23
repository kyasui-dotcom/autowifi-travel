import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import {
  WebSiteJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
  ItemListJsonLd,
} from "@/lib/components/JsonLd";
import type { Locale } from "@/lib/i18n/config";
import styles from "./page.module.css";

const BASE_URL = "https://autowifi-travel.com";

const POPULAR_DESTINATIONS = [
  { slug: "japan", flag: "\u{1F1EF}\u{1F1F5}", nameKey: "japan" },
  { slug: "south-korea", flag: "\u{1F1F0}\u{1F1F7}", nameKey: "southKorea" },
  { slug: "united-states", flag: "\u{1F1FA}\u{1F1F8}", nameKey: "unitedStates" },
  { slug: "thailand", flag: "\u{1F1F9}\u{1F1ED}", nameKey: "thailand" },
  { slug: "taiwan", flag: "\u{1F1F9}\u{1F1FC}", nameKey: "taiwan" },
  { slug: "singapore", flag: "\u{1F1F8}\u{1F1EC}", nameKey: "singapore" },
] as const;

const GUIDE_LINKS: Record<
  string,
  Array<{ path: string; title: string; desc: string }>
> = {
  en: [
    {
      path: "/guide/how-to-setup-esim",
      title: "How to set up eSIM",
      desc: "Step-by-step installation on iPhone and Android.",
    },
    {
      path: "/guide/esim-compatible-phones",
      title: "eSIM compatible phones",
      desc: "Check whether your device supports eSIM.",
    },
    {
      path: "/guide/travel-internet-options",
      title: "Travel internet options",
      desc: "Compare eSIM, roaming, local SIM, and pocket WiFi.",
    },
    {
      path: "/guide/esim-troubleshooting",
      title: "eSIM troubleshooting",
      desc: "Fix common activation and connectivity issues.",
    },
    {
      path: "/guide/best-esim-providers",
      title: "Best travel eSIM providers",
      desc: "Compare popular eSIM services before you buy.",
    },
    {
      path: "/guide/cheapest-esim-plans",
      title: "Cheapest eSIM plans",
      desc: "Learn how to find low-cost plans without sacrificing reliability.",
    },
  ],
  ja: [
    {
      path: "/guide/how-to-setup-esim",
      title: "eSIMの設定方法",
      desc: "iPhone・Androidでの導入手順を解説します。",
    },
    {
      path: "/guide/esim-compatible-phones",
      title: "eSIM対応スマホ一覧",
      desc: "お使いの端末がeSIM対応か確認できます。",
    },
    {
      path: "/guide/travel-internet-options",
      title: "海外旅行のネット接続方法",
      desc: "eSIM、ローミング、現地SIM、ポケットWiFiを比較します。",
    },
    {
      path: "/guide/esim-troubleshooting",
      title: "eSIMトラブルシューティング",
      desc: "開通しない時の確認ポイントをまとめています。",
    },
    {
      path: "/guide/best-esim-providers",
      title: "海外eSIMおすすめ比較",
      desc: "主要サービスの違いと選び方を整理しています。",
    },
    {
      path: "/guide/cheapest-esim-plans",
      title: "格安eSIMプラン比較",
      desc: "安いだけで失敗しないeSIMの選び方を解説します。",
    },
  ],
  ko: [
    {
      path: "/guide/how-to-setup-esim",
      title: "eSIM 설정 방법",
      desc: "iPhone과 Android에서 설치하는 방법을 안내합니다.",
    },
    {
      path: "/guide/esim-compatible-phones",
      title: "eSIM 지원 스마트폰",
      desc: "사용 중인 기기가 eSIM을 지원하는지 확인하세요.",
    },
    {
      path: "/guide/travel-internet-options",
      title: "여행 인터넷 옵션 비교",
      desc: "eSIM, 로밍, 현지 SIM, 포켓 와이파이를 비교합니다.",
    },
    {
      path: "/guide/esim-troubleshooting",
      title: "eSIM 문제 해결",
      desc: "개통과 연결 문제를 해결하는 방법을 모았습니다.",
    },
    {
      path: "/guide/best-esim-providers",
      title: "추천 여행 eSIM 비교",
      desc: "구매 전에 주요 서비스를 비교해 보세요.",
    },
    {
      path: "/guide/cheapest-esim-plans",
      title: "가성비 eSIM 플랜 비교",
      desc: "가격과 품질을 함께 보는 선택 기준을 정리했습니다.",
    },
  ],
  zh: [
    {
      path: "/guide/how-to-setup-esim",
      title: "eSIM设置方法",
      desc: "了解iPhone和Android上的安装步骤。",
    },
    {
      path: "/guide/esim-compatible-phones",
      title: "eSIM兼容手机",
      desc: "检查您的设备是否支持eSIM。",
    },
    {
      path: "/guide/travel-internet-options",
      title: "旅行上网方式对比",
      desc: "比较eSIM、漫游、当地SIM和随身WiFi。",
    },
    {
      path: "/guide/esim-troubleshooting",
      title: "eSIM故障排除",
      desc: "整理了常见激活和连接问题的解决方法。",
    },
    {
      path: "/guide/best-esim-providers",
      title: "旅行eSIM推荐对比",
      desc: "购买前先比较主流eSIM服务。",
    },
    {
      path: "/guide/cheapest-esim-plans",
      title: "便宜eSIM套餐对比",
      desc: "了解如何兼顾价格、稳定性与使用体验。",
    },
  ],
};

type DestinationNames = Record<string, string>;

const DESTINATION_NAMES: Record<string, DestinationNames> = {
  en: {
    japan: "Japan",
    southKorea: "South Korea",
    unitedStates: "United States",
    thailand: "Thailand",
    taiwan: "Taiwan",
    singapore: "Singapore",
  },
  ja: {
    japan: "日本",
    southKorea: "韓国",
    unitedStates: "アメリカ",
    thailand: "タイ",
    taiwan: "台湾",
    singapore: "シンガポール",
  },
  ko: {
    japan: "일본",
    southKorea: "한국",
    unitedStates: "미국",
    thailand: "태국",
    taiwan: "대만",
    singapore: "싱가포르",
  },
  zh: {
    japan: "日本",
    southKorea: "韩国",
    unitedStates: "美国",
    thailand: "泰国",
    taiwan: "台湾",
    singapore: "新加坡",
  },
};

const FAQ_CONTENT: Record<string, Array<{ question: string; answer: string }>> = {
  en: [
    {
      question: "What is an eSIM?",
      answer:
        "An eSIM is a digital SIM that allows you to activate a mobile data plan without a physical SIM card. It's built into most modern smartphones and can be activated instantly by scanning a QR code.",
    },
    {
      question: "Which devices support eSIM?",
      answer:
        "Most iPhones from iPhone XS and later, Samsung Galaxy S20 and later, Google Pixel 3 and later, and many other modern smartphones support eSIM. Check your device settings for eSIM compatibility.",
    },
    {
      question: "How do I activate my eSIM?",
      answer:
        "After purchase, you'll receive a QR code via email. Go to your phone's Settings > Mobile Data > Add eSIM, then scan the QR code. Your eSIM will be ready to use within minutes.",
    },
    {
      question: "Can I use eSIM alongside my physical SIM?",
      answer:
        "Yes. Most eSIM-compatible devices support dual SIM, allowing you to keep your regular phone number on your physical SIM while using the eSIM for data abroad.",
    },
  ],
  ja: [
    {
      question: "eSIMとは何ですか？",
      answer:
        "eSIMはデジタルSIMで、物理的なSIMカードなしでモバイルデータプランを有効化できます。最新のスマートフォンに内蔵されており、QRコードをスキャンするだけで即座にアクティベートできます。",
    },
    {
      question: "どのデバイスがeSIMに対応していますか？",
      answer:
        "iPhone XS以降、Samsung Galaxy S20以降、Google Pixel 3以降、その他多くの最新スマートフォンがeSIMに対応しています。デバイスの設定でeSIM対応をご確認ください。",
    },
    {
      question: "eSIMのアクティベート方法は？",
      answer:
        "購入後、QRコードがメールで届きます。スマートフォンの設定 > モバイルデータ > eSIM追加からQRコードをスキャンしてください。数分で利用可能になります。",
    },
    {
      question: "物理SIMと併用できますか？",
      answer:
        "はい。eSIM対応デバイスのほとんどはデュアルSIMに対応しており、物理SIMで通常の電話番号を維持しながら、eSIMで海外データ通信が利用できます。",
    },
  ],
  ko: [
    {
      question: "eSIM이란 무엇인가요?",
      answer:
        "eSIM은 물리적 SIM 카드 없이 모바일 데이터 플랜을 활성화할 수 있는 디지털 SIM입니다. 대부분의 최신 스마트폰에 내장되어 있으며 QR 코드를 스캔하여 즉시 활성화할 수 있습니다.",
    },
    {
      question: "어떤 기기가 eSIM을 지원하나요?",
      answer:
        "iPhone XS 이후, Samsung Galaxy S20 이후, Google Pixel 3 이후 및 기타 최신 스마트폰이 eSIM을 지원합니다. 기기 설정에서 eSIM 호환성을 확인하세요.",
    },
    {
      question: "eSIM은 어떻게 활성화하나요?",
      answer:
        "구매 후 이메일로 QR 코드를 받게 됩니다. 휴대폰 설정 > 모바일 데이터 > eSIM 추가에서 QR 코드를 스캔하세요. 몇 분 내에 사용할 수 있습니다.",
    },
    {
      question: "기존 SIM과 함께 사용할 수 있나요?",
      answer:
        "네. 대부분의 eSIM 호환 기기는 듀얼 SIM을 지원하여 기존 전화번호는 물리적 SIM에 유지하면서 해외에서 eSIM으로 데이터를 사용할 수 있습니다.",
    },
  ],
  zh: [
    {
      question: "什么是eSIM？",
      answer:
        "eSIM是一种数字SIM，无需实体SIM卡即可激活移动数据套餐。它内置于大多数现代智能手机中，扫描二维码即可即时激活。",
    },
    {
      question: "哪些设备支持eSIM？",
      answer:
        "iPhone XS及之后的机型、Samsung Galaxy S20及之后的机型、Google Pixel 3及之后的机型以及许多其他现代智能手机均支持eSIM。请在设备设置中检查eSIM兼容性。",
    },
    {
      question: "如何激活eSIM？",
      answer:
        "购买后，您将通过电子邮件收到二维码。前往手机设置 > 移动数据 > 添加eSIM，然后扫描二维码。几分钟内即可使用。",
    },
    {
      question: "eSIM可以和实体SIM同时使用吗？",
      answer:
        "可以。大多数支持eSIM的设备都支持双卡双待，您可以在实体SIM上保留常规电话号码，同时使用eSIM在海外上网。",
    },
  ],
};

const PAGE_CONTENT: Record<
  string,
  {
    metaTitle: string;
    metaDescription: string;
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    heroGuideCta: string;
    heroStats: Array<{ value: string; label: string }>;
    seoTitle: string;
    seoBody1: string;
    seoBody2: string;
    planningTitle: string;
    planningLead: string;
    whyTitle: string;
    instant: string;
    instantDesc: string;
    global: string;
    globalDesc: string;
    affordable: string;
    affordableDesc: string;
    stepsTitle: string;
    steps: { num: string; icon: string; title: string; desc: string }[];
    popularTitle: string;
    popularLead: string;
    resourcesCta: string;
    viewPlans: string;
    faqTitle: string;
  }
> = {
  en: {
    metaTitle: "Travel eSIM Plans for 200+ Countries | AutoWiFi eSIM",
    metaDescription:
      "Compare international travel eSIM plans for Japan, Korea, USA, Thailand, Taiwan, Singapore, and more with instant activation.",
    heroEyebrow: "Travel eSIM, simplified",
    heroTitle: "Travel eSIM Plans for 200+ Countries",
    heroSubtitle:
      "Get instant mobile data for international travel without swapping SIM cards. Compare destination-specific eSIM plans and activate in minutes.",
    heroCta: "Browse eSIM Plans",
    heroGuideCta: "Read eSIM Guides",
    heroStats: [
      { value: "200+", label: "countries and regions" },
      { value: "3 min", label: "from purchase to setup" },
      { value: "QR", label: "instant digital delivery" },
    ],
    seoTitle: "Travel eSIM for international trips",
    seoBody1:
      "A travel eSIM is one of the easiest ways to get online abroad. You can prepare before departure, scan a QR code, and use maps, ride apps, messaging, and work tools as soon as you arrive.",
    seoBody2:
      "AutoWiFi Travel helps you compare eSIM options by destination, trip length, and data needs. It is useful for vacations, business trips, study abroad, remote work, and multi-country travel.",
    planningTitle: "What to check before you buy an eSIM",
    planningLead:
      "Most travelers compare device compatibility, setup steps, and eSIM vs roaming or pocket WiFi before purchasing.",
    whyTitle: "Why Choose AutoWiFi eSIM?",
    instant: "Instant Activation",
    instantDesc:
      "Download and activate your eSIM in seconds. No waiting for shipping, no store visits needed.",
    global: "200+ Countries",
    globalDesc:
      "Coverage across every continent. One solution for all your international travel data needs.",
    affordable: "Affordable Plans",
    affordableDesc:
      "Competitive pricing with flexible data packages. Pay only for what you need, when you need it.",
    stepsTitle: "Get Started in 3 Simple Steps",
    steps: [
      {
        num: "1",
        icon: "\u{1F6D2}",
        title: "Buy a Plan",
        desc: "Choose your destination and purchase an eSIM data plan for your trip.",
      },
      {
        num: "2",
        icon: "\u{1F4F2}",
        title: "Scan the QR Code",
        desc: "Install the eSIM from your phone's settings using the QR code you receive.",
      },
      {
        num: "3",
        icon: "\u{2708}\u{FE0F}",
        title: "Travel & Connect",
        desc: "Turn on data when you arrive and get online without changing your main SIM.",
      },
    ],
    popularTitle: "Popular Destinations",
    popularLead:
      "Popular searches include Japan eSIM, South Korea eSIM, USA eSIM, Thailand eSIM, Taiwan eSIM, and Singapore eSIM.",
    resourcesCta: "See all guides",
    viewPlans: "View plans",
    faqTitle: "Frequently Asked Questions",
  },
  ja: {
    metaTitle: "海外旅行eSIM・200以上の国と地域のデータ通信 | AutoWiFi eSIM",
    metaDescription:
      "海外旅行向けeSIMを比較。日本、韓国、アメリカ、タイ、台湾、シンガポールなど200以上の国と地域で使えるデータ通信。",
    heroEyebrow: "海外旅行eSIMをわかりやすく",
    heroTitle: "海外旅行eSIMを200以上の国と地域で",
    heroSubtitle:
      "海外旅行向けのモバイルデータを、SIM差し替えなしですぐ利用開始。渡航先ごとのeSIMプランを比較して、数分でアクティベートできます。",
    heroCta: "eSIMプランを見る",
    heroGuideCta: "eSIMガイドを読む",
    heroStats: [
      { value: "200+", label: "国と地域を掲載" },
      { value: "数分", label: "購入から設定まで" },
      { value: "QR", label: "即時デジタル納品" },
    ],
    seoTitle: "海外旅行でeSIMを使うメリット",
    seoBody1:
      "海外旅行eSIMは、出発前に準備できて、現地到着後すぐにネットを使い始められるのが強みです。地図、配車、連絡、翻訳、仕事用アプリまで、現地で必要な通信をスマホだけで完結できます。",
    seoBody2:
      "AutoWiFi Travel では、渡航先、滞在日数、データ容量ごとにeSIMプランを比較しやすく整理しています。短期旅行、出張、留学、周遊旅行、ワーケーションなど幅広い用途に対応しやすい構成です。",
    planningTitle: "購入前に確認したいポイント",
    planningLead:
      "eSIM購入前は、端末対応状況、設定方法、ローミングやポケットWiFiとの違いを確認しておくと選びやすくなります。",
    whyTitle: "AutoWiFi eSIMが選ばれる理由",
    instant: "即時アクティベーション",
    instantDesc:
      "eSIMを数秒でダウンロード＆アクティベート。配送待ちも店舗訪問も不要です。",
    global: "200以上の国と地域",
    globalDesc: "全大陸をカバー。海外旅行のデータ通信はこれ一つで解決。",
    affordable: "お手頃な料金",
    affordableDesc:
      "柔軟なデータパッケージで競争力のある価格設定。必要な分だけお支払い。",
    stepsTitle: "かんたん3ステップで利用開始",
    steps: [
      {
        num: "1",
        icon: "\u{1F6D2}",
        title: "プランを購入",
        desc: "渡航先を選んで、旅行に合ったeSIMデータプランを購入します。",
      },
      {
        num: "2",
        icon: "\u{1F4F2}",
        title: "QRコードをスキャン",
        desc: "購入後、スマホの設定からQRコードをスキャンしてeSIMをインストールします。",
      },
      {
        num: "3",
        icon: "\u{2708}\u{FE0F}",
        title: "渡航先で即接続",
        desc: "現地に着いたらデータをONにするだけで、すぐにネットが使えます。",
      },
    ],
    popularTitle: "人気の渡航先",
    popularLead:
      "日本eSIM、韓国eSIM、アメリカeSIM、タイeSIM、台湾eSIM、シンガポールeSIMなど、人気の渡航先ページから比較できます。",
    resourcesCta: "ガイド一覧を見る",
    viewPlans: "プランを見る",
    faqTitle: "よくある質問",
  },
  ko: {
    metaTitle: "해외여행 eSIM·200개 이상 국가 데이터 플랜 | AutoWiFi eSIM",
    metaDescription:
      "일본, 한국, 미국, 태국, 대만, 싱가포르 등 200개 이상 국가에서 사용할 수 있는 여행 eSIM을 비교하세요.",
    heroEyebrow: "여행 eSIM을 더 쉽게",
    heroTitle: "200개 이상 국가를 위한 여행 eSIM",
    heroSubtitle:
      "물리 SIM 교체 없이 해외 모바일 데이터를 바로 시작하세요. 목적지별 eSIM 플랜을 비교하고 몇 분 안에 활성화할 수 있습니다.",
    heroCta: "eSIM 플랜 보기",
    heroGuideCta: "eSIM 가이드 보기",
    heroStats: [
      { value: "200+", label: "국가 및 지역 지원" },
      { value: "몇 분", label: "구매 후 설치까지" },
      { value: "QR", label: "즉시 디지털 발송" },
    ],
    seoTitle: "해외여행에서 eSIM이 편한 이유",
    seoBody1:
      "여행 eSIM은 출발 전에 준비하고 도착 후 바로 사용할 수 있어 매우 편리합니다. 지도, 호출 앱, 메신저, 번역, 업무용 앱까지 스마트폰 하나로 해결할 수 있습니다.",
    seoBody2:
      "AutoWiFi Travel은 목적지, 체류 기간, 데이터 용량별로 eSIM 플랜을 비교하기 쉽게 정리합니다. 짧은 여행, 출장, 유학, 장기 체류, 여러 나라를 도는 일정에도 잘 맞습니다.",
    planningTitle: "구매 전에 확인할 점",
    planningLead:
      "eSIM을 구매하기 전에는 기기 호환성, 설치 방법, 로밍이나 포켓 와이파이와의 차이를 먼저 확인하면 선택이 쉬워집니다.",
    whyTitle: "AutoWiFi eSIM을 선택하는 이유",
    instant: "즉시 활성화",
    instantDesc:
      "몇 초 만에 eSIM을 다운로드하고 활성화하세요. 배송 대기나 매장 방문이 필요 없습니다.",
    global: "200개 이상의 국가",
    globalDesc: "모든 대륙을 커버합니다. 해외 여행 데이터 솔루션 하나로 해결.",
    affordable: "합리적인 요금",
    affordableDesc:
      "유연한 데이터 패키지로 경쟁력 있는 가격. 필요한 만큼만 결제하세요.",
    stepsTitle: "간단 3단계로 시작하기",
    steps: [
      {
        num: "1",
        icon: "\u{1F6D2}",
        title: "플랜 구매",
        desc: "여행지와 일정에 맞는 eSIM 데이터 플랜을 선택해 구매하세요.",
      },
      {
        num: "2",
        icon: "\u{1F4F2}",
        title: "QR 코드 스캔",
        desc: "구매 후 받은 QR 코드를 휴대폰 설정에서 스캔해 eSIM을 설치합니다.",
      },
      {
        num: "3",
        icon: "\u{2708}\u{FE0F}",
        title: "도착 후 연결",
        desc: "현지에 도착하면 데이터를 켜고 기존 SIM 교체 없이 바로 연결됩니다.",
      },
    ],
    popularTitle: "인기 여행지",
    popularLead:
      "일본 eSIM, 한국 eSIM, 미국 eSIM, 태국 eSIM, 대만 eSIM, 싱가포르 eSIM처럼 수요가 높은 목적지를 쉽게 비교할 수 있습니다.",
    resourcesCta: "가이드 전체 보기",
    viewPlans: "플랜 보기",
    faqTitle: "자주 묻는 질문",
  },
  zh: {
    metaTitle: "海外旅行eSIM·覆盖200多个国家和地区 | AutoWiFi eSIM",
    metaDescription:
      "比较日本、韩国、美国、泰国、台湾、新加坡等目的地的旅行eSIM套餐，适用于200多个国家和地区。",
    heroEyebrow: "更省心的旅行 eSIM",
    heroTitle: "覆盖200多个国家和地区的旅行eSIM",
    heroSubtitle:
      "无需更换实体SIM卡即可快速使用海外移动数据。比较不同目的地的eSIM套餐，并在几分钟内完成激活。",
    heroCta: "浏览eSIM套餐",
    heroGuideCta: "查看eSIM指南",
    heroStats: [
      { value: "200+", label: "国家和地区可用" },
      { value: "几分钟", label: "从购买到安装" },
      { value: "QR", label: "即时数字交付" },
    ],
    seoTitle: "旅行时使用eSIM有什么优势",
    seoBody1:
      "旅行eSIM的优势在于可以提前准备，并在抵达后迅速上网。地图、打车、聊天、翻译、工作工具都可以直接在手机上使用。",
    seoBody2:
      "AutoWiFi Travel 按目的地、停留时间和流量容量整理eSIM套餐，方便旅行者比较。无论是短途旅行、商务出差、留学、长期停留还是多国行程，都更容易选择。",
    planningTitle: "购买前建议先确认",
    planningLead:
      "在购买eSIM之前，先确认设备兼容性、安装步骤，以及它与漫游或随身WiFi的差异，会更容易做出选择。",
    whyTitle: "为什么选择AutoWiFi eSIM？",
    instant: "即时激活",
    instantDesc: "几秒内下载并激活eSIM。无需等待快递，无需前往门店。",
    global: "200+国家覆盖",
    globalDesc: "覆盖全球各大洲。一个方案满足您所有的国际旅行数据需求。",
    affordable: "实惠的价格",
    affordableDesc: "灵活的数据套餐，具有竞争力的定价。按需付费。",
    stepsTitle: "简单3步开始使用",
    steps: [
      {
        num: "1",
        icon: "\u{1F6D2}",
        title: "购买套餐",
        desc: "选择符合目的地和行程的eSIM流量套餐。",
      },
      {
        num: "2",
        icon: "\u{1F4F2}",
        title: "扫描二维码",
        desc: "在手机设置中扫描购买后收到的二维码，完成安装。",
      },
      {
        num: "3",
        icon: "\u{2708}\u{FE0F}",
        title: "到达后连接",
        desc: "抵达后打开数据即可，无需更换主SIM卡。",
      },
    ],
    popularTitle: "热门目的地",
    popularLead:
      "日本eSIM、韩国eSIM、美国eSIM、泰国eSIM、台湾eSIM、新加坡eSIM等热门搜索目的地都可以直接查看。",
    resourcesCta: "查看全部指南",
    viewPlans: "查看套餐",
    faqTitle: "常见问题",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = PAGE_CONTENT[locale] ?? PAGE_CONTENT.en;

  return generatePageMetadata({
    locale: locale as Locale,
    path: "",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = PAGE_CONTENT[locale] ?? PAGE_CONTENT.en;
  const names = DESTINATION_NAMES[locale] ?? DESTINATION_NAMES.en;
  const faq = FAQ_CONTENT[locale] ?? FAQ_CONTENT.en;
  const guideLinks = GUIDE_LINKS[locale] ?? GUIDE_LINKS.en;

  return (
    <>
      <WebSiteJsonLd
        name="AutoWiFi eSIM"
        url={BASE_URL}
        description={content.heroSubtitle}
        searchUrl={`${BASE_URL}/${locale}/esim?q={search_term_string}`}
      />
      <FaqJsonLd items={faq} />
      <ServiceJsonLd />
      <ItemListJsonLd
        items={POPULAR_DESTINATIONS.map((dest, index) => ({
          name: names[dest.nameKey],
          url: `${BASE_URL}/${locale}/esim/${dest.slug}`,
          position: index + 1,
        }))}
      />
      <ItemListJsonLd
        items={guideLinks.map((guide, index) => ({
          name: guide.title,
          url: `${BASE_URL}/${locale}${guide.path}`,
          position: index + 1,
        }))}
      />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>{content.heroEyebrow}</span>
          <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{content.heroSubtitle}</p>
          <div className={styles.heroActions}>
            <Link href={`/${locale}/esim`} className={styles.heroCta}>
              {content.heroCta} &rarr;
            </Link>
            <Link href={`/${locale}/guide`} className={styles.heroSecondaryCta}>
              {content.heroGuideCta} &rarr;
            </Link>
          </div>
          <div className={styles.heroStats}>
            {content.heroStats.map((stat) => (
              <div key={stat.label} className={styles.heroStatCard}>
                <strong className={styles.heroStatValue}>{stat.value}</strong>
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.seoSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{content.seoTitle}</h2>
          <p className={styles.seoParagraph}>{content.seoBody1}</p>
          <p className={styles.seoParagraph}>{content.seoBody2}</p>
        </div>
      </section>

      <section className={styles.valueProps}>
        <div className={styles.sectionInner}>
          <h2 className={styles.valuePropsSectionTitle}>{content.whyTitle}</h2>
          <div className={styles.valuePropsGrid}>
            <div className={styles.valuePropCard}>
              <span className={styles.valuePropIcon}>&#x26A1;</span>
              <h3 className={styles.valuePropTitle}>{content.instant}</h3>
              <p className={styles.valuePropDescription}>{content.instantDesc}</p>
            </div>
            <div className={styles.valuePropCard}>
              <span className={styles.valuePropIcon}>&#x1F30D;</span>
              <h3 className={styles.valuePropTitle}>{content.global}</h3>
              <p className={styles.valuePropDescription}>{content.globalDesc}</p>
            </div>
            <div className={styles.valuePropCard}>
              <span className={styles.valuePropIcon}>&#x1F4B0;</span>
              <h3 className={styles.valuePropTitle}>{content.affordable}</h3>
              <p className={styles.valuePropDescription}>{content.affordableDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.steps}>
        <div className={styles.stepsInner}>
          <h2 className={styles.stepsSectionTitle}>{content.stepsTitle}</h2>
          <div className={styles.stepsGrid}>
            {content.steps.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.resourcesSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{content.planningTitle}</h2>
          <p className={styles.sectionLead}>{content.planningLead}</p>
          <div className={styles.resourcesGrid}>
            {guideLinks.map((guide) => (
              <Link
                key={guide.path}
                href={`/${locale}${guide.path}`}
                className={styles.resourceCard}
              >
                <h3 className={styles.resourceTitle}>{guide.title}</h3>
                <p className={styles.resourceDesc}>{guide.desc}</p>
              </Link>
            ))}
          </div>
          <div className={styles.resourcesCtaRow}>
            <Link href={`/${locale}/guide`} className={styles.resourcesCta}>
              {content.resourcesCta} &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.destinations}>
        <div className={styles.destinationsInner}>
          <h2 className={styles.destinationsSectionTitle}>{content.popularTitle}</h2>
          <p className={styles.destinationsLead}>{content.popularLead}</p>
          <div className={styles.destinationsGrid}>
            {POPULAR_DESTINATIONS.map((dest) => (
              <Link
                key={dest.slug}
                href={`/${locale}/esim/${dest.slug}`}
                className={styles.destinationCard}
              >
                <span className={styles.destinationFlag}>{dest.flag}</span>
                <div className={styles.destinationInfo}>
                  <span className={styles.destinationName}>{names[dest.nameKey]}</span>
                  <span className={styles.destinationCta}>{content.viewPlans} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <h2 className={styles.faqTitle}>{content.faqTitle}</h2>
          <div className={styles.faqList}>
            {faq.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
