import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "接続方法の比較を深める関連ガイド",
    articles: [
      { slug: "dual-sim-esim", title: "デュアルSIM活用ガイド" },
      { slug: "save-money-roaming", title: "ローミング料金節約術" },
      { slug: "wifi-vs-esim", title: "モバイルWiFi vs eSIM" },
      { slug: "international-calling-esim", title: "eSIMでの国際通話" },
    ],
  },
  en: {
    title: "Compare More Before You Pick Your Connection Method",
    articles: [
      { slug: "dual-sim-esim", title: "Dual SIM with eSIM" },
      { slug: "save-money-roaming", title: "How to Avoid Expensive Roaming Charges" },
      { slug: "wifi-vs-esim", title: "Mobile WiFi vs eSIM" },
      { slug: "international-calling-esim", title: "International Calls with eSIM" },
    ],
  },
  ko: {
    title: "연결 방식을 고르기 전에 함께 볼 가이드",
    articles: [
      { slug: "dual-sim-esim", title: "듀얼 SIM 활용법" },
      { slug: "save-money-roaming", title: "로밍 요금 절약법" },
      { slug: "wifi-vs-esim", title: "포켓 WiFi vs eSIM" },
      { slug: "international-calling-esim", title: "eSIM 국제 전화" },
    ],
  },
  zh: {
    title: "选择上网方式前可继续比较的指南",
    articles: [
      { slug: "dual-sim-esim", title: "双卡eSIM使用指南" },
      { slug: "save-money-roaming", title: "节省漫游费用" },
      { slug: "wifi-vs-esim", title: "随身WiFi vs eSIM" },
      { slug: "international-calling-esim", title: "eSIM国际通话" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "海外旅行のインターネット接続方法を完全比較",
    subtitle: "eSIM・WiFi・ローミング・SIMカード — あなたに合う方法は？",
    intro: "海外旅行中のインターネット接続にはいくつかの選択肢があります。eSIM、モバイルWiFi（ポケットWiFi）、国際ローミング、現地SIMカード、そして無料WiFiスポット。それぞれの特徴、料金、利便性を比較して、あなたの旅行スタイルに最適な方法を見つけましょう。",
    sections: [
      {
        title: "eSIM（トラベルeSIM）",
        body: "eSIMはスマートフォンに内蔵されたデジタルSIMで、オンラインで購入してQRコードで設定するだけで海外の通信回線を利用できます。物理的なカードの差し替えや機器のレンタルが不要で、出発前に設定を済ませれば到着直後から使えます。\n\n料金面では、定額制のプランが多く、1週間で1,000〜3,000円程度から利用可能です。データ容量に応じた明確な料金設定で、予想外の高額請求の心配がありません。現地キャリアに直接接続するため通信速度も安定しています。\n\nデメリットとしては、eSIM対応端末が必要なこと（2018年以降の多くの端末が対応）、基本的に1台のみの利用であること（テザリングで他機器の接続は可能）が挙げられます。総合的に見て、個人旅行や少人数での旅行には最もコスパが良い選択肢です。"
      },
      {
        title: "モバイルWiFi（ポケットWiFi）",
        body: "モバイルWiFiは小型のルーター端末をレンタルして持ち歩く方式です。ルーターが作るWiFiに端末を接続するため、スマートフォン、タブレット、ノートPCなど複数台を同時に接続できます。家族やグループ旅行では1台で全員が使えるのが最大のメリットです。\n\n料金は1日800〜1,500円程度で、1週間では5,600〜10,500円になります。レンタルと返却の手間があり、空港カウンターでの受け取りまたは事前の宅配が必要です。端末の充電も別途必要で、バッテリーは通常4〜8時間持ちます。\n\nデメリットは、持ち歩く荷物が増えること、ルーター紛失時に弁償金（2〜4万円）がかかるリスク、そしてバッテリー管理が必要なことです。古い端末やeSIM非対応の端末を使っている場合、またはグループでの利用には依然として有力な選択肢です。"
      },
      {
        title: "国際ローミング",
        body: "国際ローミングは、普段使っている日本のキャリア（docomo、au、SoftBankなど）の回線をそのまま海外で使う方法です。特別な設定や追加機器は不要で、データローミングをオンにするだけで使えるため、最も手軽な方法と言えます。\n\nしかし、料金面では最も高額になるリスクがあります。従来のローミングでは1日1,980〜2,980円程度の定額プランが用意されていますが、定額プランに加入していない場合、従量課金で1日数万円の請求が発生するケースもあります。短期間の旅行で手軽さを優先する場合には選択肢になります。\n\n近年はahamoやpovoなど、海外での利用が一部含まれるプランも登場しています。ただし、データ量や対応国に制限がある場合が多いため、事前に自分のプランの海外利用条件を確認しておくことが重要です。"
      },
      {
        title: "現地SIMカードと無料WiFiスポット",
        body: "現地SIMカードは、旅行先の空港やキャリアショップで購入する物理的なSIMカードです。現地の料金体系で購入できるため、長期滞在では最もコストが安くなる場合があります。ただし、購入場所を見つける手間、言語の壁、パスポート提示の必要性などのハードルがあります。\n\nまた、SIMカードを差し替えると日本の電話番号で通話やSMSを受けられなくなります（デュアルSIM対応端末を除く）。SIMサイズが合わない場合もあり、古い端末ではカッターで加工が必要になることもあります。\n\n無料WiFiスポット（ホテル、カフェ、空港など）は費用がかからない反面、利用場所が限られ、速度も不安定です。セキュリティリスクも高く、個人情報やパスワードの入力は避けるべきです。無料WiFiだけに頼る旅行は現実的ではなく、あくまで補助的な接続手段として考えましょう。"
      },
      {
        title: "総合比較：最適な方法の選び方",
        body: "各方法の特徴をまとめると、一人旅やカップル旅行で手軽さとコスパを重視するならeSIMが最適です。グループや家族旅行で複数端末を接続したいならモバイルWiFi、とにかく手軽に使いたいなら国際ローミング、長期滞在で現地に溶け込みたいなら現地SIMカードという選択になります。\n\nコスト面では、eSIM（定額1,000〜5,000円）が最も安く、次に現地SIM（500〜3,000円程度）、モバイルWiFi（5,000〜15,000円/週）、国際ローミング（14,000〜21,000円/週）の順です。ただし、これは一般的な目安であり、旅行先やプランによって異なります。\n\n最近のトレンドとしては、eSIMの利用が急速に増えています。対応端末の普及、プランの多様化、料金の低価格化が進み、海外旅行のインターネット接続方法として最も合理的な選択肢になりつつあります。迷ったら、まずはeSIMを試してみることをおすすめします。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "初めての海外旅行にはどの方法がおすすめですか？", a: "eSIM対応スマートフォンをお持ちなら、eSIMが最もおすすめです。事前にオンラインで購入・設定でき、到着後すぐに使えます。eSIM非対応の場合は、モバイルWiFiが安心です。" },
      { q: "複数の方法を併用できますか？", a: "はい、例えばeSIMをメインに使いつつ、ホテルでは無料WiFiを利用するという使い方が一般的です。eSIMのデータ容量を節約しながら快適に過ごせます。" },
      { q: "セキュリティが最も安全なのはどの方法ですか？", a: "eSIMとモバイルWiFi（自分専用の接続）が最も安全です。公共WiFiスポットはセキュリティリスクが高いため、重要な操作は避けることをおすすめします。" }
    ],
    ctaTitle: "eSIMで快適な海外旅行を",
    ctaDesc: "AutoWiFi eSIMなら、200以上の国と地域で使えるプランを即購入。設定は5分で完了します。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "海外旅行のインターネット接続方法"
  },
  en: {
    title: "All Internet Options for Travel Compared",
    subtitle: "eSIM, WiFi, roaming, SIM cards — which one is right for you?",
    intro: "There are several ways to stay connected while traveling internationally: eSIM, portable WiFi, international roaming, local SIM cards, and free WiFi hotspots. This guide compares each option's features, costs, and convenience to help you find the best fit for your travel style.",
    sections: [
      {
        title: "eSIM (Travel eSIM)",
        body: "An eSIM is a digital SIM embedded in your smartphone. Purchase a plan online, scan a QR code, and you are connected to a local carrier abroad. No physical card swapping or device rental needed. Set it up before departure, and it works the moment you land.\n\nPricing is transparent with flat-rate plans, typically ranging from $5-25 for a week. Since you connect directly to a local carrier, speeds are stable and reliable. There are no surprise bills or hidden fees.\n\nThe main limitations are that you need an eSIM-compatible phone (most devices from 2018 onward) and the connection serves one device at a time (though tethering is possible). Overall, eSIM offers the best value for solo travelers and couples.",
      },
      {
        title: "Portable WiFi (Pocket WiFi)",
        body: "Portable WiFi involves renting a small router that creates a personal hotspot. Multiple devices — phones, tablets, laptops — can connect simultaneously, making it ideal for families and groups traveling together.\n\nRental costs typically run $7-15 per day, totaling $49-105 for a week. You pick up the device at the airport and return it at the end of your trip. The router needs its own charging (4-8 hour battery life) and adds to your luggage.\n\nDownsides include the hassle of pickup and return, the extra weight to carry, replacement fees ($200-400) if lost, and battery management. Portable WiFi remains a strong choice for groups or for travelers using devices without eSIM support."
      },
      {
        title: "International Roaming",
        body: "International roaming lets you use your home carrier's network abroad. Simply turn on data roaming in your settings — no extra devices or SIM cards needed. It is the most convenient option with zero preparation required.\n\nHowever, it carries the highest cost risk. Daily flat-rate plans from carriers typically range from $5-15 per day, but without a plan, pay-per-use charges can reach hundreds of dollars per day. It is suitable for short trips where convenience is the top priority.\n\nSome newer plans include limited international data, but restrictions on data volume and supported countries apply. Always verify your plan's international terms before traveling to avoid bill shock."
      },
      {
        title: "Local SIM Cards and Free WiFi",
        body: "Local SIM cards are physical SIM cards purchased at your destination's airport or carrier shops. They use local pricing, which can be the cheapest option for extended stays. However, you face challenges like finding a shop, language barriers, and passport requirements.\n\nSwapping SIM cards means losing access to your home phone number for calls and texts (unless your phone supports dual SIM). SIM size compatibility can also be an issue with older devices.\n\nFree WiFi spots at hotels, cafes, and airports cost nothing but are limited in availability and often slow. Security risks are significant — avoid entering personal information or passwords on public networks. Free WiFi should be treated as a supplement, not a primary connection method."
      },
      {
        title: "Overall Comparison: How to Choose",
        body: "To summarize: for solo or couple travel prioritizing convenience and value, eSIM is the best choice. For groups needing multiple device connections, portable WiFi works well. For maximum convenience with no setup, international roaming fits (at a higher cost). For long stays seeking the cheapest local rates, a local SIM card makes sense.\n\nBy cost, eSIM ($5-25 flat) is typically cheapest, followed by local SIM ($3-20), portable WiFi ($49-105/week), and international roaming ($35-105/week with a plan). Actual prices vary by destination and provider.\n\nThe trend is clear — eSIM adoption is growing rapidly. As compatible devices become standard and prices continue to drop, eSIM is becoming the most practical way to stay connected abroad. If you are undecided, trying eSIM first is the recommendation."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "What do you recommend for a first-time international traveler?", a: "If your phone supports eSIM, that is the top recommendation. You can buy and set up online before departure, and it works the moment you land. If your phone does not support eSIM, portable WiFi is the safest option." },
      { q: "Can I combine multiple methods?", a: "Absolutely. A common approach is using eSIM as your primary connection while relying on hotel WiFi when available. This helps conserve your eSIM data allowance." },
      { q: "Which option is most secure?", a: "eSIM and portable WiFi (your own private connection) are the most secure. Public WiFi hotspots carry significant security risks — avoid sensitive operations like banking on public networks." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM covers 200+ countries and regions. Purchase instantly online and set up in 5 minutes.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Travel Internet Options"
  },
  ko: {
    title: "해외여행 인터넷 연결 방법 완전 비교",
    subtitle: "eSIM·WiFi·로밍·SIM 카드 — 나에게 맞는 방법은?",
    intro: "해외여행 중 인터넷 연결에는 여러 선택지가 있습니다. eSIM, 포켓 WiFi, 국제 로밍, 현지 SIM 카드, 무료 WiFi 스팟. 각각의 특징, 요금, 편의성을 비교하여 여행 스타일에 맞는 최적의 방법을 찾아보세요.",
    sections: [
      {
        title: "eSIM(트래블 eSIM)",
        body: "eSIM은 스마트폰에 내장된 디지털 SIM으로, 온라인으로 구매하고 QR 코드로 설정하면 해외 통신 회선을 이용할 수 있습니다. 물리적 카드 교체나 기기 대여가 필요 없으며, 출발 전에 설정하면 도착 즉시 사용 가능합니다.\n\n요금은 정액제 플랜이 많아 1주일에 5,000~30,000원 정도부터 이용 가능합니다. 현지 통신사에 직접 연결되어 통신 속도도 안정적이며, 예상 밖의 고액 청구 걱정이 없습니다.\n\n단점으로는 eSIM 대응 단말기가 필요하다는 것(2018년 이후 대부분 대응)과 기본 1대만 사용 가능하다는 점입니다. 개인 여행이나 소규모 여행에 가성비가 가장 좋은 선택지입니다."
      },
      {
        title: "포켓 WiFi(모바일 라우터)",
        body: "포켓 WiFi는 소형 라우터를 대여하여 휴대하는 방식입니다. 여러 대의 기기를 동시에 연결할 수 있어 가족이나 단체 여행에서 1대로 모두가 사용할 수 있는 것이 최대 장점입니다.\n\n요금은 하루 5,000~15,000원 정도이며, 1주일에 35,000~105,000원이 됩니다. 대여와 반납의 수고가 있고 라우터 충전도 별도로 필요합니다(배터리 4~8시간).\n\n단점은 짐이 늘어나는 것, 분실 시 배상금(20~40만원) 위험, 배터리 관리가 필요한 것입니다. 구형 단말기 사용자나 단체 이용에는 여전히 유력한 선택지입니다."
      },
      {
        title: "국제 로밍",
        body: "국제 로밍은 평소 사용하는 통신사(SKT, KT, LG U+ 등)의 회선을 그대로 해외에서 사용하는 방법입니다. 특별한 설정이나 추가 기기 없이 데이터 로밍을 켜기만 하면 되므로 가장 간편합니다.\n\n하지만 요금이 가장 비쌀 수 있습니다. 하루 정액 플랜이 있지만, 미가입 시 종량제로 하루에 수만 원이 청구될 수 있습니다. 단기간 여행에서 편리함을 우선시하는 경우에 적합합니다.\n\n최근에는 일부 해외 데이터가 포함된 요금제도 등장했지만, 데이터량이나 대응 국가에 제한이 있는 경우가 많으므로 출발 전에 자신의 요금제 조건을 확인하세요."
      },
      {
        title: "현지 SIM 카드와 무료 WiFi",
        body: "현지 SIM 카드는 여행지 공항이나 매장에서 구매하는 물리 SIM 카드입니다. 현지 요금으로 구매할 수 있어 장기 체류 시 가장 저렴할 수 있습니다. 다만 구매처 찾기, 언어 장벽, 여권 제시 필요성 등의 어려움이 있습니다.\n\nSIM 카드를 교체하면 한국 전화번호로 통화나 SMS를 받을 수 없게 됩니다(듀얼 SIM 단말기 제외). SIM 크기가 맞지 않는 경우도 있습니다.\n\n무료 WiFi 스팟(호텔, 카페, 공항 등)은 비용이 들지 않지만 이용 장소가 제한되고 속도도 불안정합니다. 보안 위험도 높으므로 개인정보 입력은 피해야 합니다. 무료 WiFi만으로 여행하는 것은 현실적이지 않으며 보조 수단으로 생각하세요."
      },
      {
        title: "종합 비교: 최적의 방법 선택하기",
        body: "정리하면, 혼자 또는 커플 여행에서 편리함과 가성비를 중시한다면 eSIM이 최적입니다. 단체 여행으로 여러 기기를 연결하고 싶다면 포켓 WiFi, 편리함만 추구한다면 국제 로밍, 장기 체류 시 현지 요금을 원한다면 현지 SIM이 적합합니다.\n\n비용 기준으로 eSIM(정액 5,000~30,000원)이 가장 저렴하고, 현지 SIM, 포켓 WiFi, 국제 로밍 순입니다.\n\n최근 트렌드로 eSIM 이용이 급증하고 있습니다. 대응 단말기 보급, 플랜 다양화, 가격 하락이 진행되어 해외여행 인터넷 연결 방법으로 가장 합리적인 선택지가 되고 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "처음 해외여행에는 어떤 방법이 좋나요?", a: "eSIM 대응 스마트폰이라면 eSIM을 가장 추천합니다. 출발 전 온라인으로 구매·설정하면 도착 후 바로 사용 가능합니다. eSIM 미대응이라면 포켓 WiFi가 안심입니다." },
      { q: "여러 방법을 동시에 사용할 수 있나요?", a: "네, eSIM을 메인으로 사용하면서 호텔에서는 무료 WiFi를 이용하는 것이 일반적입니다. eSIM 데이터를 절약하면서 편안하게 지낼 수 있습니다." },
      { q: "보안이 가장 안전한 방법은?", a: "eSIM과 포켓 WiFi(자신만의 전용 연결)가 가장 안전합니다. 공공 WiFi는 보안 위험이 높으므로 중요한 작업은 피하세요." }
    ],
    ctaTitle: "eSIM으로 편안한 해외여행을",
    ctaDesc: "AutoWiFi eSIM이라면 200개 이상의 국가와 지역에서 사용 가능한 플랜을 즉시 구매. 5분이면 설정 완료.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "해외여행 인터넷 연결 방법"
  },
  zh: {
    title: "出境旅行上网方式全面对比",
    subtitle: "eSIM·WiFi·漫游·SIM卡——哪种最适合你？",
    intro: "出境旅行时有多种上网方式可选：eSIM、随身WiFi、国际漫游、当地SIM卡和免费WiFi热点。本文从功能、价格、便利性等方面全面对比，帮你找到最适合自己旅行方式的上网方案。",
    sections: [
      {
        title: "eSIM（旅行eSIM）",
        body: "eSIM是手机内置的数字SIM，在线购买后扫描QR码即可连接当地运营商网络。无需更换实体卡或租借设备，出发前设置好，落地即可使用。\n\n价格透明，多为定额套餐，一周约30-150元。直连当地运营商，网速稳定可靠，没有意外高额账单。\n\n主要限制是需要eSIM兼容手机（2018年后大部分机型支持）和基本只能一台设备使用（可开热点共享）。综合来看，个人旅行和情侣出行性价比最高。"
      },
      {
        title: "随身WiFi（移动热点）",
        body: "随身WiFi是租借一个小型路由器随身携带。多台设备可同时连接，家庭或团队旅行时一台就够大家用，这是最大优势。\n\n租金约每天30-80元，一周210-560元。需要取还设备，路由器需单独充电（续航4-8小时），增加行李负担。\n\n缺点包括增加行李、设备丢失需赔偿（500-1000元）、需要管理电池。使用旧设备或团队出行时仍是不错的选择。"
      },
      {
        title: "国际漫游",
        body: "国际漫游是直接用国内运营商的网络在海外使用。只需开启数据漫游，无需额外设备或SIM卡，是最方便的方式。\n\n但费用风险最高。运营商通常提供日套餐，但未开通的话可能产生天价账单。适合短期旅行且追求便利的情况。\n\n近年部分套餐包含一定的海外流量，但通常有数据量和国家限制。出发前务必确认自己套餐的海外使用条款。"
      },
      {
        title: "当地SIM卡和免费WiFi",
        body: "当地SIM卡在目的地机场或运营商门店购买。使用当地价格，长期停留时可能最便宜。但面临找店铺、语言障碍、需出示护照等问题。\n\n更换SIM卡后无法用国内号码接电话和短信（双SIM手机除外）。SIM卡尺寸不匹配也可能是个问题。\n\n免费WiFi热点（酒店、咖啡厅、机场等）不花钱但场所有限、速度不稳定。安全风险较高，避免输入个人信息和密码。免费WiFi只能作为辅助手段。"
      },
      {
        title: "综合对比：如何选择",
        body: "总结：独自或情侣旅行追求便利和性价比选eSIM；团队旅行需要多设备连接选随身WiFi；追求最大便利选国际漫游（费用较高）；长期停留想要最便宜的本地资费选当地SIM卡。\n\n费用方面，eSIM（定额30-150元）通常最便宜，其次是当地SIM、随身WiFi、国际漫游。具体价格因目的地和提供商而异。\n\n趋势很明显——eSIM使用正在快速增长。随着兼容设备普及和价格持续下降，eSIM正在成为出境旅行上网最实用的方式。如果犹豫不决，建议先试试eSIM。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "第一次出国旅行推荐哪种方式？", a: "如果手机支持eSIM，最推荐eSIM。出发前在线购买设置，落地即可使用。不支持eSIM的话，随身WiFi最稳妥。" },
      { q: "可以同时使用多种方式吗？", a: "当然可以。常见做法是eSIM作为主要连接，在酒店时使用免费WiFi，这样可以节省eSIM流量。" },
      { q: "哪种方式最安全？", a: "eSIM和随身WiFi（自己的专用连接）最安全。公共WiFi安全风险较高，避免进行银行操作等敏感操作。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi eSIM覆盖200多个国家和地区。在线即时购买，5分钟完成设置。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "旅行上网方式对比"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/travel-internet-options", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="travel-internet-options" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
