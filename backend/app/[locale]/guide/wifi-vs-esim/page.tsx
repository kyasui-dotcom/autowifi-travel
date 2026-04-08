import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/lib/components/JsonLd";
import { generatePageMetadata, getBaseUrl, getDefaultOgImageUrl } from "@/lib/seo";
import styles from "./page.module.css";

type Locale = "en" | "ja" | "ko" | "zh";

interface ComparisonRow {
  category: string;
  wifi: string;
  esim: string;
  winner: "wifi" | "esim" | "tie";
}

interface FaqItem {
  q: string;
  a: string;
}

interface PageContent {
  title: string;
  subtitle: string;
  intro: string;
  whatIsWifiTitle: string;
  whatIsWifiDesc: string;
  whatIsEsimTitle: string;
  whatIsEsimDesc: string;
  comparisonTitle: string;
  comparisonHeaders: [string, string, string];
  rows: ComparisonRow[];
  prosConsTitle: string;
  wifiProsTitle: string;
  wifiPros: string[];
  wifiConsTitle: string;
  wifiCons: string[];
  esimProsTitle: string;
  esimPros: string[];
  esimConsTitle: string;
  esimCons: string[];
  recommendTitle: string;
  recommendWifiTitle: string;
  recommendWifiItems: string[];
  recommendEsimTitle: string;
  recommendEsimItems: string[];
  faqTitle: string;
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  breadcrumbHome: string;
  breadcrumbGuide: string;
  breadcrumbCurrent: string;
}

const CONTENT: Record<Locale, PageContent> = {
  ja: {
    title: "モバイルWiFi vs eSIM - 海外旅行のネット接続を徹底比較",
    subtitle: "どっちがお得？あなたに合った海外通信手段がわかる",
    intro: "海外旅行でインターネットに接続する方法として、従来のモバイルWiFi（ポケットWiFi）とeSIMが人気です。それぞれの特徴、料金、使いやすさを比較して、あなたに最適な方法を見つけましょう。",
    whatIsWifiTitle: "モバイルWiFi（ポケットWiFi）とは？",
    whatIsWifiDesc: "モバイルWiFiは、小型のルーター端末を持ち歩き、そのWiFi電波を通じてスマートフォンやパソコンをインターネットに接続するサービスです。空港でレンタルして、帰国時に返却するのが一般的な利用方法です。複数台同時接続が可能で、グループ旅行では1台で全員が使えるメリットがあります。",
    whatIsEsimTitle: "eSIMとは？",
    whatIsEsimDesc: "eSIM（Embedded SIM）は、スマートフォンに内蔵されたデジタルSIMです。物理的なSIMカードの交換なしに、QRコードを読み取るだけで海外の通信プランを有効化できます。iPhone XS以降、Google Pixel 3以降など、近年のスマートフォンの多くが対応しています。出発前にオンラインで購入・設定でき、到着後すぐに使えるのが特徴です。",
    comparisonTitle: "モバイルWiFi vs eSIM 比較表",
    comparisonHeaders: ["比較項目", "モバイルWiFi", "eSIM"],
    rows: [
      { category: "料金（1週間）", wifi: "800〜1,500円/日（5,600〜10,500円）", esim: "1,000〜3,000円（定額）", winner: "esim" },
      { category: "受け取り", wifi: "空港カウンター or 自宅配送", esim: "オンライン購入（即時）", winner: "esim" },
      { category: "返却", wifi: "空港カウンター or 郵送", esim: "不要", winner: "esim" },
      { category: "荷物", wifi: "ルーター + 充電器が必要", esim: "追加なし", winner: "esim" },
      { category: "バッテリー", wifi: "別途充電が必要（4〜8時間）", esim: "スマホの電池のみ", winner: "esim" },
      { category: "同時接続台数", wifi: "5〜10台", esim: "1台（テザリング可）", winner: "wifi" },
      { category: "通信速度", wifi: "端末性能に依存", esim: "現地キャリア直接接続", winner: "esim" },
      { category: "設定の簡単さ", wifi: "電源ONですぐ使える", esim: "QRコード読み取り（初回のみ）", winner: "tie" },
      { category: "対応端末", wifi: "どんな端末でもOK", esim: "eSIM対応端末のみ", winner: "wifi" },
      { category: "紛失リスク", wifi: "ルーター紛失で弁償金あり", esim: "なし", winner: "esim" },
      { category: "電話番号", wifi: "なし", esim: "一部プランで付与", winner: "esim" },
    ],
    prosConsTitle: "メリット・デメリット比較",
    wifiProsTitle: "モバイルWiFiのメリット",
    wifiPros: [
      "複数人でシェアできるのでグループ旅行に便利",
      "端末を選ばない — 古いスマホやノートPCも接続OK",
      "電源を入れるだけの簡単操作",
    ],
    wifiConsTitle: "モバイルWiFiのデメリット",
    wifiCons: [
      "レンタル・返却の手間がある",
      "荷物が増える（ルーター + モバイルバッテリー）",
      "1日単位の料金なので長期旅行は高額になりがち",
      "ルーター紛失時に弁償金（2〜4万円）がかかる",
      "ルーターのバッテリー切れで使えなくなる",
    ],
    esimProsTitle: "eSIMのメリット",
    esimPros: [
      "オンラインで即購入・即設定 — 出発直前でもOK",
      "荷物ゼロ — スマホだけで完結",
      "定額プランが多く、料金がわかりやすい",
      "返却不要 — 帰国後の手間なし",
      "現地キャリアに直接接続するので通信が安定",
    ],
    esimConsTitle: "eSIMのデメリット",
    esimCons: [
      "eSIM対応端末が必要（2018年以降のモデルが中心）",
      "基本1台のみ — 複数端末は別プランが必要",
      "初回のQRコード設定がやや不慣れな人には難しい",
    ],
    recommendTitle: "こんな人におすすめ",
    recommendWifiTitle: "モバイルWiFiがおすすめな人",
    recommendWifiItems: [
      "グループ旅行で複数人でシェアしたい",
      "eSIM非対応の古いスマートフォンを使っている",
      "ノートパソコンも頻繁に使いたい",
      "スマホの設定に不安がある",
    ],
    recommendEsimTitle: "eSIMがおすすめな人",
    recommendEsimItems: [
      "身軽に旅行したい",
      "コストを抑えたい",
      "出発直前にサッと準備したい",
      "レンタル・返却の手間が面倒",
      "一人旅・カップル旅行",
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMとSIMカードの違いは？", a: "SIMカードは物理的なチップで端末に挿入しますが、eSIMはスマートフォンに内蔵されたデジタルSIMです。QRコードで情報をダウンロードするだけで設定でき、複数のプランを切り替えることもできます。" },
      { q: "eSIMはどのスマートフォンで使えますか？", a: "iPhone XS以降、Google Pixel 3以降、Samsung Galaxy S20以降など、2018年以降に発売された多くのスマートフォンが対応しています。お使いの端末の「設定」→「モバイル通信」でeSIMの項目があれば対応しています。" },
      { q: "モバイルWiFiとeSIMを両方使うことはできますか？", a: "はい、可能です。例えばeSIMをメインの通信手段にしつつ、PCでの作業時のみモバイルWiFiを使うといった併用もできます。ただし、多くの場合eSIMのテザリング機能でPCも接続できるので、eSIMだけで十分なケースがほとんどです。" },
      { q: "eSIMの料金はどれくらいですか？", a: "渡航先や通信量によりますが、1GB/7日間で500円程度から、無制限/30日間で5,000円程度まで、幅広いプランがあります。モバイルWiFiの日額料金と比べると、多くの場合eSIMの方が割安です。" },
    ],
    ctaTitle: "eSIMで身軽な旅を始めよう",
    ctaDesc: "AutoWiFi eSIMなら、200以上の国と地域に対応したプランを数秒で設定。面倒なレンタル・返却は不要です。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "モバイルWiFi vs eSIM",
  },
  en: {
    title: "Mobile WiFi vs eSIM - Complete Guide for Travelers",
    subtitle: "Which is better for your trip? Find the best connectivity option",
    intro: "When traveling abroad, two popular options for staying connected are portable WiFi (pocket WiFi) and eSIM. Let's compare their features, costs, and convenience to help you choose the right option.",
    whatIsWifiTitle: "What is Mobile WiFi (Pocket WiFi)?",
    whatIsWifiDesc: "Mobile WiFi is a portable router device that creates a WiFi hotspot for your smartphones and laptops. You typically rent one at the airport and return it when you come back. It supports multiple simultaneous connections, making it convenient for group travel.",
    whatIsEsimTitle: "What is eSIM?",
    whatIsEsimDesc: "eSIM (Embedded SIM) is a digital SIM built into your smartphone. Instead of swapping physical SIM cards, you simply scan a QR code to activate a data plan. Most modern smartphones since 2018 support eSIM, including iPhone XS+, Google Pixel 3+, and Samsung Galaxy S20+. You can purchase and set it up online before departure.",
    comparisonTitle: "Mobile WiFi vs eSIM Comparison",
    comparisonHeaders: ["Category", "Mobile WiFi", "eSIM"],
    rows: [
      { category: "Cost (1 week)", wifi: "$7-15/day ($49-105 total)", esim: "$5-25 (flat rate)", winner: "esim" },
      { category: "Pickup", wifi: "Airport counter or delivery", esim: "Online purchase (instant)", winner: "esim" },
      { category: "Return", wifi: "Airport counter or mail", esim: "Not needed", winner: "esim" },
      { category: "Luggage", wifi: "Router + charger required", esim: "Nothing extra", winner: "esim" },
      { category: "Battery", wifi: "Separate charging (4-8hrs)", esim: "Phone battery only", winner: "esim" },
      { category: "Simultaneous devices", wifi: "5-10 devices", esim: "1 device (tethering possible)", winner: "wifi" },
      { category: "Speed", wifi: "Depends on router quality", esim: "Direct local carrier connection", winner: "esim" },
      { category: "Ease of setup", wifi: "Power on and connect", esim: "QR code scan (one-time)", winner: "tie" },
      { category: "Device compatibility", wifi: "Any device works", esim: "eSIM-capable phones only", winner: "wifi" },
      { category: "Loss risk", wifi: "Replacement fee if lost", esim: "None", winner: "esim" },
      { category: "Phone number", wifi: "None", esim: "Some plans include one", winner: "esim" },
    ],
    prosConsTitle: "Pros & Cons",
    wifiProsTitle: "Mobile WiFi Pros",
    wifiPros: [
      "Share with multiple people — great for group travel",
      "Works with any device — old phones, laptops included",
      "Simple operation — just turn it on",
    ],
    wifiConsTitle: "Mobile WiFi Cons",
    wifiCons: [
      "Rental and return hassle",
      "Extra luggage (router + power bank)",
      "Per-day pricing adds up for longer trips",
      "Replacement fees ($200-400) if lost",
      "Unusable when router battery dies",
    ],
    esimProsTitle: "eSIM Pros",
    esimPros: [
      "Instant online purchase — even last minute",
      "Zero extra luggage — just your phone",
      "Flat-rate plans with transparent pricing",
      "No return needed — hassle-free",
      "Direct local carrier connection for stable speeds",
    ],
    esimConsTitle: "eSIM Cons",
    esimCons: [
      "Requires eSIM-compatible phone (mostly 2018+)",
      "One device only — separate plans needed for multiple",
      "Initial QR setup may be unfamiliar to some",
    ],
    recommendTitle: "Which One is Right for You?",
    recommendWifiTitle: "Choose Mobile WiFi if you:",
    recommendWifiItems: [
      "Travel in groups and want to share one device",
      "Use an older phone without eSIM support",
      "Need frequent laptop connectivity",
      "Prefer zero phone configuration",
    ],
    recommendEsimTitle: "Choose eSIM if you:",
    recommendEsimItems: [
      "Want to travel light",
      "Want to save money",
      "Need last-minute setup",
      "Don't want rental/return hassle",
      "Travel solo or as a couple",
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "What's the difference between eSIM and SIM card?", a: "A SIM card is a physical chip you insert into your phone, while eSIM is a digital SIM built into your device. You download the profile via QR code, and can switch between multiple plans without swapping cards." },
      { q: "Which phones support eSIM?", a: "iPhone XS and later, Google Pixel 3 and later, Samsung Galaxy S20 and later, and many other phones released since 2018. Check Settings > Cellular on your phone to see if eSIM is available." },
      { q: "Can I use both mobile WiFi and eSIM?", a: "Yes, you can use both simultaneously. However, in most cases eSIM with tethering is sufficient for all your devices, making a separate WiFi router unnecessary." },
      { q: "How much does eSIM cost?", a: "Prices vary by destination and data amount, ranging from about $5 for 1GB/7days to $50 for unlimited/30days. In most cases, eSIM is more affordable than daily mobile WiFi rental." },
    ],
    ctaTitle: "Travel Light with eSIM",
    ctaDesc: "AutoWiFi eSIM covers 200+ countries and regions. Set up in seconds — no rental or return needed.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Mobile WiFi vs eSIM",
  },
  ko: {
    title: "포켓 WiFi vs eSIM - 해외여행 인터넷 완벽 비교",
    subtitle: "어떤 게 더 좋을까? 나에게 맞는 해외 통신 수단 찾기",
    intro: "해외여행에서 인터넷에 연결하는 방법으로 포켓 WiFi(모바일 라우터)와 eSIM이 인기입니다. 각각의 특징, 요금, 편의성을 비교하여 최적의 방법을 찾아보세요.",
    whatIsWifiTitle: "포켓 WiFi(모바일 라우터)란?",
    whatIsWifiDesc: "포켓 WiFi는 소형 라우터 단말기를 휴대하면서 WiFi를 통해 스마트폰이나 노트북을 인터넷에 연결하는 서비스입니다. 공항에서 대여하고 귀국 시 반납하는 것이 일반적입니다. 여러 대 동시 연결이 가능하여 단체 여행에 편리합니다.",
    whatIsEsimTitle: "eSIM이란?",
    whatIsEsimDesc: "eSIM(Embedded SIM)은 스마트폰에 내장된 디지털 SIM입니다. 물리적 SIM 카드 교체 없이 QR 코드를 스캔하는 것만으로 해외 데이터 플랜을 활성화할 수 있습니다. iPhone XS 이후, Google Pixel 3 이후 등 2018년 이후 출시된 대부분의 스마트폰이 지원합니다.",
    comparisonTitle: "포켓 WiFi vs eSIM 비교표",
    comparisonHeaders: ["비교 항목", "포켓 WiFi", "eSIM"],
    rows: [
      { category: "요금 (1주일)", wifi: "5,000~15,000원/일 (35,000~105,000원)", esim: "5,000~30,000원 (정액)", winner: "esim" },
      { category: "수령", wifi: "공항 카운터 or 택배", esim: "온라인 구매 (즉시)", winner: "esim" },
      { category: "반납", wifi: "공항 카운터 or 우편", esim: "불필요", winner: "esim" },
      { category: "짐", wifi: "라우터 + 충전기 필요", esim: "추가 없음", winner: "esim" },
      { category: "배터리", wifi: "별도 충전 필요 (4~8시간)", esim: "스마트폰 배터리만", winner: "esim" },
      { category: "동시 접속", wifi: "5~10대", esim: "1대 (테더링 가능)", winner: "wifi" },
      { category: "통신 속도", wifi: "단말기 성능에 의존", esim: "현지 통신사 직접 연결", winner: "esim" },
      { category: "설정 난이도", wifi: "전원 ON으로 바로 사용", esim: "QR 코드 스캔 (최초 1회)", winner: "tie" },
      { category: "지원 단말기", wifi: "모든 단말기 OK", esim: "eSIM 대응 단말기만", winner: "wifi" },
      { category: "분실 위험", wifi: "라우터 분실 시 배상금", esim: "없음", winner: "esim" },
      { category: "전화번호", wifi: "없음", esim: "일부 플랜에서 제공", winner: "esim" },
    ],
    prosConsTitle: "장단점 비교",
    wifiProsTitle: "포켓 WiFi 장점",
    wifiPros: [
      "여러 명이 공유할 수 있어 단체 여행에 편리",
      "단말기를 가리지 않음 — 구형 스마트폰이나 노트북도 OK",
      "전원만 켜면 바로 사용 가능",
    ],
    wifiConsTitle: "포켓 WiFi 단점",
    wifiCons: [
      "대여·반납의 번거로움",
      "짐이 늘어남 (라우터 + 보조 배터리)",
      "일 단위 요금으로 장기 여행 시 비용이 높아짐",
      "라우터 분실 시 배상금 (20~40만원) 발생",
      "라우터 배터리 소진 시 사용 불가",
    ],
    esimProsTitle: "eSIM 장점",
    esimPros: [
      "온라인으로 즉시 구매·설정 — 출발 직전에도 OK",
      "짐 제로 — 스마트폰만으로 완결",
      "정액 플랜이 많아 요금이 명확",
      "반납 불필요 — 귀국 후 번거로움 없음",
      "현지 통신사에 직접 연결되어 안정적",
    ],
    esimConsTitle: "eSIM 단점",
    esimCons: [
      "eSIM 대응 단말기 필요 (2018년 이후 모델 중심)",
      "기본 1대만 — 여러 단말기는 별도 플랜 필요",
      "초기 QR 코드 설정이 익숙하지 않을 수 있음",
    ],
    recommendTitle: "이런 분에게 추천",
    recommendWifiTitle: "포켓 WiFi를 추천하는 분",
    recommendWifiItems: [
      "단체 여행으로 여러 명이 공유하고 싶은 분",
      "eSIM 미지원 구형 스마트폰을 사용하는 분",
      "노트북도 자주 사용하는 분",
      "스마트폰 설정에 자신 없는 분",
    ],
    recommendEsimTitle: "eSIM을 추천하는 분",
    recommendEsimItems: [
      "가볍게 여행하고 싶은 분",
      "비용을 절약하고 싶은 분",
      "출발 직전에 빠르게 준비하고 싶은 분",
      "대여·반납이 귀찮은 분",
      "혼자 여행·커플 여행",
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "eSIM과 SIM 카드의 차이는?", a: "SIM 카드는 물리적 칩을 단말기에 삽입하지만, eSIM은 스마트폰에 내장된 디지털 SIM입니다. QR 코드로 정보를 다운로드하여 설정하며, 여러 플랜을 전환할 수도 있습니다." },
      { q: "eSIM은 어떤 스마트폰에서 사용할 수 있나요?", a: "iPhone XS 이후, Google Pixel 3 이후, Samsung Galaxy S20 이후 등 2018년 이후 출시된 대부분의 스마트폰이 지원합니다. 설정 > 셀룰러에서 eSIM 항목이 있으면 사용 가능합니다." },
      { q: "포켓 WiFi와 eSIM을 동시에 사용할 수 있나요?", a: "네, 가능합니다. 하지만 대부분의 경우 eSIM의 테더링 기능으로 PC도 연결할 수 있어, eSIM만으로 충분한 경우가 많습니다." },
      { q: "eSIM 요금은 얼마인가요?", a: "여행지와 데이터 용량에 따라 1GB/7일 약 5,000원부터 무제한/30일 약 50,000원까지 다양한 플랜이 있습니다. 대부분의 경우 포켓 WiFi 일일 대여보다 저렴합니다." },
    ],
    ctaTitle: "eSIM으로 가벼운 여행을 시작하세요",
    ctaDesc: "AutoWiFi eSIM은 200개 이상의 국가와 지역에 대응. 몇 초만에 설정 완료 — 대여·반납 불필요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "포켓 WiFi vs eSIM",
  },
  zh: {
    title: "随身WiFi vs eSIM - 出境旅行上网方式全面对比",
    subtitle: "哪个更划算？找到最适合你的海外上网方式",
    intro: "出境旅行时，随身WiFi（移动热点）和eSIM是最受欢迎的两种上网方式。让我们从功能、价格、便利性三个维度进行全面对比，帮你找到最合适的选择。",
    whatIsWifiTitle: "什么是随身WiFi？",
    whatIsWifiDesc: "随身WiFi是一种便携式路由器设备，通过创建WiFi热点让你的手机和电脑连接网络。通常在机场租借，回国时归还。支持多台设备同时连接，适合团队出行时共享使用。",
    whatIsEsimTitle: "什么是eSIM？",
    whatIsEsimDesc: "eSIM（嵌入式SIM）是内置在智能手机中的数字SIM卡。无需更换物理SIM卡，只需扫描QR码即可激活境外数据套餐。iPhone XS及以后、Google Pixel 3及以后等2018年后发布的大多数智能手机都支持eSIM。可以在出发前在线购买并设置。",
    comparisonTitle: "随身WiFi vs eSIM 对比表",
    comparisonHeaders: ["对比项目", "随身WiFi", "eSIM"],
    rows: [
      { category: "费用（1周）", wifi: "30-80元/天（210-560元）", esim: "30-150元（固定价格）", winner: "esim" },
      { category: "领取", wifi: "机场柜台或快递", esim: "在线购买（即时）", winner: "esim" },
      { category: "归还", wifi: "机场柜台或邮寄", esim: "无需归还", winner: "esim" },
      { category: "行李", wifi: "需携带路由器+充电器", esim: "无额外物品", winner: "esim" },
      { category: "电池", wifi: "需单独充电（4-8小时）", esim: "仅手机电池", winner: "esim" },
      { category: "同时连接", wifi: "5-10台设备", esim: "1台（可开热点）", winner: "wifi" },
      { category: "网速", wifi: "取决于设备性能", esim: "直连当地运营商", winner: "esim" },
      { category: "设置难度", wifi: "开机即用", esim: "扫描QR码（仅首次）", winner: "tie" },
      { category: "兼容性", wifi: "任何设备均可", esim: "仅支持eSIM的手机", winner: "wifi" },
      { category: "丢失风险", wifi: "丢失需赔偿", esim: "无", winner: "esim" },
      { category: "电话号码", wifi: "无", esim: "部分套餐含号码", winner: "esim" },
    ],
    prosConsTitle: "优缺点对比",
    wifiProsTitle: "随身WiFi优点",
    wifiPros: [
      "多人共享 — 团队出行只需一台",
      "不挑设备 — 旧手机、笔记本都能连",
      "操作简单 — 开机就能用",
    ],
    wifiConsTitle: "随身WiFi缺点",
    wifiCons: [
      "租借和归还手续繁琐",
      "增加行李负担（路由器+充电宝）",
      "按天计费，长途旅行费用较高",
      "设备丢失需赔偿（500-1000元）",
      "路由器没电就无法使用",
    ],
    esimProsTitle: "eSIM优点",
    esimPros: [
      "在线即买即用 — 出发前一刻也来得及",
      "零行李 — 手机搞定一切",
      "固定价格套餐，费用透明",
      "无需归还 — 回国后零负担",
      "直连当地运营商，信号稳定",
    ],
    esimConsTitle: "eSIM缺点",
    esimCons: [
      "需要支持eSIM的手机（主要是2018年后的机型）",
      "基本仅限1台设备 — 多台需另购",
      "首次QR码设置对部分用户可能不太熟悉",
    ],
    recommendTitle: "适合人群推荐",
    recommendWifiTitle: "随身WiFi适合这些人",
    recommendWifiItems: [
      "团队出行想多人共享",
      "使用不支持eSIM的旧手机",
      "经常使用笔记本电脑",
      "对手机设置不太熟悉",
    ],
    recommendEsimTitle: "eSIM适合这些人",
    recommendEsimItems: [
      "想轻装出行",
      "想节省费用",
      "需要临时快速准备",
      "嫌麻烦不想租借归还",
      "独自旅行或情侣出行",
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM和SIM卡有什么区别？", a: "SIM卡是需要插入手机的物理芯片，而eSIM是内置在手机中的数字SIM。通过QR码下载配置信息即可使用，还能在多个套餐间切换。" },
      { q: "哪些手机支持eSIM？", a: "iPhone XS及以后、Google Pixel 3及以后、Samsung Galaxy S20及以后等2018年后发布的大多数智能手机都支持。可以在手机的「设置 > 蜂窝网络」中查看是否有eSIM选项。" },
      { q: "可以同时使用随身WiFi和eSIM吗？", a: "可以。但大多数情况下，eSIM的热点功能即可满足电脑等其他设备的上网需求，通常只需eSIM就够了。" },
      { q: "eSIM多少钱？", a: "根据目的地和流量不同，从1GB/7天约30元到无限流量/30天约300元不等。大多数情况下，eSIM比随身WiFi的日租更实惠。" },
    ],
    ctaTitle: "用eSIM开启轻松旅行",
    ctaDesc: "AutoWiFi eSIM覆盖200多个国家和地区。几秒即可设置完成 — 无需租借归还。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "随身WiFi vs eSIM",
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
    path: "/guide/wifi-vs-esim",
    title: c.title,
    description: c.intro.slice(0, 160),
  });
}

function WinnerBadge({ winner, locale }: { winner: "wifi" | "esim" | "tie"; locale: Locale }) {
  const labels: Record<Locale, Record<string, string>> = {
    ja: { wifi: "WiFi", esim: "eSIM", tie: "引き分け" },
    en: { wifi: "WiFi", esim: "eSIM", tie: "Tie" },
    ko: { wifi: "WiFi", esim: "eSIM", tie: "무승부" },
    zh: { wifi: "WiFi", esim: "eSIM", tie: "平局" },
  };
  return (
    <span className={`${styles.badge} ${styles[`badge_${winner}`]}`}>
      {labels[locale][winner]}
    </span>
  );
}

export default async function WifiVsEsimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const c = CONTENT[loc];
  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}/${loc}/guide/wifi-vs-esim`;
  const articleImageUrl = getDefaultOgImageUrl(baseUrl);

  return (
    <div className={styles.container}>
      <ArticleJsonLd
        title={c.title}
        description={c.intro}
        url={articleUrl}
        image={articleImageUrl}
        locale={loc}
        datePublished="2026-03-13"
        dateModified="2026-03-13"
      />
      <FaqJsonLd items={c.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <BreadcrumbJsonLd
        items={[
          { name: c.breadcrumbHome, url: `${baseUrl}/${loc}` },
          { name: c.breadcrumbGuide, url: `${baseUrl}/${loc}/guide` },
          { name: c.breadcrumbCurrent, url: articleUrl },
        ]}
      />

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href={`/${loc}`}>{c.breadcrumbHome}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href={`/${loc}/guide`}>{c.breadcrumbGuide}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{c.breadcrumbCurrent}</span>
      </nav>

      {/* Hero */}
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{c.title}</h1>
        <p className={styles.heroSubtitle}>{c.subtitle}</p>
      </header>

      {/* Intro */}
      <section className={styles.section}>
        <p className={styles.introText}>{c.intro}</p>
      </section>

      {/* What is WiFi */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.whatIsWifiTitle}</h2>
        <p>{c.whatIsWifiDesc}</p>
      </section>

      {/* What is eSIM */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.whatIsEsimTitle}</h2>
        <p>{c.whatIsEsimDesc}</p>
      </section>

      {/* Comparison Table */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.comparisonTitle}</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>{c.comparisonHeaders[0]}</th>
                <th>{c.comparisonHeaders[1]}</th>
                <th>{c.comparisonHeaders[2]}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr key={i}>
                  <td className={styles.categoryCell}>{row.category}</td>
                  <td className={row.winner === "wifi" ? styles.winnerCell : ""}>{row.wifi}</td>
                  <td className={row.winner === "esim" ? styles.winnerCell : ""}>{row.esim}</td>
                  <td><WinnerBadge winner={row.winner} locale={loc} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.prosConsTitle}</h2>
        <div className={styles.prosConsGrid}>
          <div className={styles.prosConsCard}>
            <h3 className={styles.prosTitle}>{c.wifiProsTitle}</h3>
            <ul className={styles.prosList}>
              {c.wifiPros.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <h3 className={styles.consTitle}>{c.wifiConsTitle}</h3>
            <ul className={styles.consList}>
              {c.wifiCons.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div className={styles.prosConsCard}>
            <h3 className={styles.prosTitle}>{c.esimProsTitle}</h3>
            <ul className={styles.prosList}>
              {c.esimPros.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <h3 className={styles.consTitle}>{c.esimConsTitle}</h3>
            <ul className={styles.consList}>
              {c.esimCons.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.recommendTitle}</h2>
        <div className={styles.recommendGrid}>
          <div className={styles.recommendCard}>
            <div className={styles.recommendIcon}>📶</div>
            <h3>{c.recommendWifiTitle}</h3>
            <ul>
              {c.recommendWifiItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className={`${styles.recommendCard} ${styles.recommendCardHighlight}`}>
            <div className={styles.recommendIcon}>📱</div>
            <h3>{c.recommendEsimTitle}</h3>
            <ul>
              {c.recommendEsimItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.faqTitle}</h2>
        <div className={styles.faqList}>
          {c.faqs.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
        <p className={styles.ctaDesc}>{c.ctaDesc}</p>
        <Link href={`/${loc}/esim`} className={styles.ctaButton}>
          {c.ctaButton} →
        </Link>
      </section>
    </div>
  );
}
