import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "ローミング回避を深める関連ガイド",
    articles: [
      { slug: "travel-internet-options", title: "海外旅行のネット接続方法" },
      { slug: "dual-sim-esim", title: "デュアルSIM活用ガイド" },
      { slug: "international-calling-esim", title: "eSIMでの国際通話" },
      { slug: "esim-troubleshooting", title: "eSIMトラブルシューティング" },
    ],
  },
  en: {
    title: "Compare More Before You Trust Roaming",
    articles: [
      { slug: "travel-internet-options", title: "Travel Internet Options" },
      { slug: "dual-sim-esim", title: "Dual SIM with eSIM" },
      { slug: "international-calling-esim", title: "International Calls with eSIM" },
      { slug: "esim-troubleshooting", title: "eSIM Troubleshooting" },
    ],
  },
  ko: {
    title: "로밍 회피 전에 함께 볼 가이드",
    articles: [
      { slug: "travel-internet-options", title: "여행 인터넷 옵션" },
      { slug: "dual-sim-esim", title: "듀얼 SIM 활용법" },
      { slug: "international-calling-esim", title: "eSIM 국제 전화" },
      { slug: "esim-troubleshooting", title: "eSIM 문제 해결" },
    ],
  },
  zh: {
    title: "避免漫游费前可继续比较的指南",
    articles: [
      { slug: "travel-internet-options", title: "旅行上网方式" },
      { slug: "dual-sim-esim", title: "双卡eSIM使用指南" },
      { slug: "international-calling-esim", title: "eSIM国际通话" },
      { slug: "esim-troubleshooting", title: "eSIM故障排除" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "海外ローミング料金を避ける方法：高額請求を防ぐ完全ガイド",
    subtitle: "知らないうちに発生する高額な通信費を事前に防ぐ",
    intro: "海外旅行から帰国して、携帯電話の請求書を見て驚いた経験はありませんか？国際ローミングによる高額請求は、多くの旅行者が直面する問題です。この記事では、海外での通信費を大幅に節約する方法を具体的に解説します。eSIMをはじめとする代替手段を活用して、安心して旅行を楽しみましょう。本記事では知らないうちに発生する高額な通信費を事前に防ぐ・なぜ海外ローミングは高額になるのか・出発前にできる対策などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "なぜ海外ローミングは高額になるのか",
        body: "国際ローミングとは、自国の携帯キャリアが海外のキャリアのネットワークを借りて通信サービスを提供する仕組みです。この借りるコストが高いため、利用者への請求も高額になります。日本の大手キャリアの場合、ローミングのデータ通信料は1MBあたり数十円〜数百円に設定されていることがあり、何も対策をしないとたった1日で数万円の請求が発生するケースも珍しくありません。\n\nメールの添付ファイルのダウンロード、地図アプリの利用、SNSの画像表示など、普段何気なく行っている操作がすべてデータ通信として課金されます。特にアプリのバックグラウンド更新や、写真のクラウド同期は大量のデータを消費し、気づかないうちに請求額が膨らみます。\n\n日本のキャリアは海外パケット定額などのオプションを提供していますが、1日1,980〜2,980円が一般的です。1週間の旅行では14,000〜21,000円になり、eSIMなどの代替手段と比べると割高です。また、定額サービスに加入し忘れた場合のリスクが大きいのも問題です。"
      },
      {
        title: "出発前にできる対策",
        body: "最も効果的な対策は、出発前にデータローミングをオフにすることです。iPhoneでは\"設定→モバイル通信→通信のオプション→データローミングをオフ、Androidでは設定→ネットワーク→モバイルネットワーク→データローミング\"をオフにします。これにより、海外でうっかりローミング接続することを防げます。\n\n次に、旅行用のeSIMプランを事前に購入しましょう。eSIMなら1週間のデータプランが1,000〜3,000円程度で購入でき、ローミング料金の数分の一で済みます。出発前にプロファイルをインストールし、渡航先ではeSIMのデータ通信のみを使用する設定にすれば、高額請求の心配はゼロです。\n\nアプリのバックグラウンド更新もオフにしておきましょう。iPhoneでは\"設定→一般\"→\"Appのバックグラウンド更新\"でオフに、またはWiFi接続時のみに設定します。写真のiCloudバックアップやGoogleフォトの同期もWiFi接続時のみに設定しておくことで、意図しないデータ消費を防げます。"
      },
      {
        title: "eSIMで節約できる金額の具体例",
        body: "eSIMを使うことで、どのくらいの節約になるのかを具体的に見てみましょう。例えば、1週間のハワイ旅行の場合、日本のキャリアのローミング定額を使うと1日2,980円×7日＝20,860円かかります。一方、eSIMの場合はアメリカ対応5GBプランが約1,500〜3,000円で購入でき、最大18,000円以上の節約が可能です。\n\n2週間のヨーロッパ周遊旅行では、ローミング定額で約42,000円（1日2,980円×14日）に対し、ヨーロッパ対応のリージョナルeSIMプランなら10GBで約3,000〜5,000円です。eSIMに切り替えるだけで約37,000円以上節約できます。\n\nさらに、eSIMは定額制なので予想外の請求が発生しません。ローミングの場合、定額サービスの対象外エリアでの通信や、テザリング利用が別料金になるケースがありますが、eSIMではそのような複雑な料金体系を気にする必要がありません。"
      },
      {
        title: "その他の節約テクニック",
        body: "eSIMの導入に加えて、さらに通信費を節約するテクニックがあります。まず、WiFi環境を積極的に活用しましょう。ホテル、カフェ、空港、ショッピングモールなど、多くの場所で無料WiFiが利用できます。大容量のダウンロードやアプリの更新は、WiFi接続時に行うようにしましょう。\n\n通話料金の節約には、インターネット通話アプリの活用が効果的です。LINE、WhatsApp、FaceTime、Skypeなどのアプリを使えば、eSIMのデータ通信やWiFi経由で無料通話ができます。国際電話料金を完全に回避できるため、特に長時間の通話では大きな節約になります。\n\nデータ使用量をこまめにチェックすることも重要です。iPhoneでは設定→モバイル通信で各アプリのデータ使用量を確認でき、不要なアプリのモバイルデータ使用をオフにできます。地図アプリはオフラインマップをダウンロードしておくことで、データ消費なしでナビゲーションが利用できます。Google MapsやApple Mapsのオフラインマップ機能をぜひ活用してください。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "データローミングをオフにしても電話は受けられますか？", a: "はい、データローミングをオフにしても音声通話の着信は可能です。ただし、海外での着信にも通話料がかかる場合があるため、キャリアの料金プランを確認してください。データ通信のみがオフになります。" },
      { q: "eSIMを使えばローミング料金は完全にゼロですか？", a: "はい、日本のキャリアのデータローミングをオフにし、eSIMのデータ通信のみを使用する設定にすれば、キャリアからのローミング料金は発生しません。eSIMプランの購入費用のみがかかります。" },
      { q: "帰国後にローミングの高額請求に気づいた場合、どうすればいいですか？", a: "まず、キャリアのカスタマーサポートに連絡してください。事情を説明すれば、一部減額や分割払いに対応してもらえるケースがあります。今後は出発前にデータローミングのオフとeSIMの設定を忘れないようにしましょう。" },
      { q: "家族全員のローミング料金を節約する方法は？", a: "家族全員がeSIM対応端末をお持ちなら、それぞれにeSIMプランを購入するのが最もコスパが良いです。eSIM非対応の端末がある場合は、eSIM対応端末のテザリングで共有するか、モバイルWiFiの利用も検討してください。" }
    ],
    ctaTitle: "ローミング料金にサヨナラ",
    ctaDesc: "AutoWiFi eSIMなら、高額なローミング料金の心配はゼロ。定額プランで安心して海外旅行を楽しめます。",
    ctaButton: "今すぐeSIMを購入",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ローミング料金を避ける方法"
  },
  en: {
    title: "How to Avoid Expensive Roaming Charges: A Complete Money-Saving Guide",
    subtitle: "Prevent surprise bills and save hundreds on international data",
    intro: "Have you ever returned from a trip abroad only to find a shockingly high phone bill? International roaming charges catch many travelers off guard. This guide explains practical ways to dramatically reduce your overseas communication costs. By using alternatives like eSIM, you can travel with complete peace of mind.",
    sections: [
      {
        title: "Why International Roaming Is So Expensive",
        body: "International roaming works by having your home carrier borrow network access from a carrier in the country you are visiting. This borrowing cost is high, and it gets passed on to you. Without a special roaming plan, data charges can reach several dollars per megabyte, resulting in bills of hundreds or even thousands of dollars for just a few days of normal phone use.\n\nEveryday activities like downloading email attachments, using maps, and loading social media images all consume data. Background app updates and photo cloud sync are particularly dangerous — they consume large amounts of data without you even realizing it.\n\nMost carriers offer daily roaming packages at $5-15 per day, which totals $35-105 for a week-long trip. While safer than pay-per-use, this is still significantly more expensive than alternatives like eSIM. And forgetting to activate the daily package before traveling can result in catastrophic bills."
      },
      {
        title: "Pre-Departure Precautions",
        body: "The single most effective step is turning off Data Roaming before departure. On iPhone, go to Settings, then Cellular, then Cellular Data Options, then toggle Data Roaming off. On Android, go to Settings, then Network, then Mobile network, and disable Data Roaming. This prevents accidental roaming connections abroad.\n\nNext, purchase a travel eSIM plan before you leave. An eSIM data plan for a week typically costs $5-25 — a fraction of roaming charges. Install the profile before departure and configure your phone to use only the eSIM for data. With this setup, the risk of surprise roaming bills drops to zero.\n\nAlso disable background app refresh. On iPhone, go to Settings, then General, then Background App Refresh, and turn it off or set it to WiFi only. Set photo backup services (iCloud Photos, Google Photos) to sync over WiFi only as well. These precautions prevent unintended data consumption."
      },
      {
        title: "How Much You Can Save with eSIM",
        body: "Let us look at concrete savings. For a one-week trip to Japan, carrier roaming at $10 per day totals $70. An eSIM Japan plan with 5GB costs approximately $8-15, saving you $55-62. That is up to an 85% reduction in communication costs.\n\nFor a two-week European tour, carrier roaming at $10 per day totals $140. A European regional eSIM plan with 10GB costs approximately $15-30. Switching to eSIM saves over $100 — enough for several nice meals or a museum pass.\n\nBeyond the direct savings, eSIM plans are flat-rate, eliminating surprise charges entirely. With roaming, communications outside the covered area or tethering can incur extra fees. eSIM plans have straightforward pricing with no hidden costs."
      },
      {
        title: "Additional Money-Saving Techniques",
        body: "Beyond switching to eSIM, there are more ways to cut costs. Actively seek out WiFi hotspots at hotels, cafes, airports, and shopping malls. Save large downloads and app updates for WiFi connections to conserve your eSIM data.\n\nFor voice calls, use internet-based calling apps. WhatsApp, FaceTime, Skype, and LINE all support free voice and video calls over data or WiFi. This completely eliminates international calling charges, which can save significant amounts on longer calls.\n\nMonitor your data usage regularly. On iPhone, Settings then Cellular shows per-app data consumption — disable mobile data for apps that do not need it. Download offline maps in Google Maps or Apple Maps before your trip so navigation works without any data consumption at all. These small steps add up to substantial savings."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I still receive phone calls with data roaming turned off?", a: "Yes, turning off data roaming only affects data connections. Voice calls can still be received. However, receiving calls abroad may incur charges depending on your carrier plan, so check your terms beforehand." },
      { q: "Will using eSIM completely eliminate roaming charges?", a: "Yes, if you turn off data roaming on your home carrier line and use only the eSIM for data, your home carrier will not charge any roaming fees. You only pay for the eSIM plan itself." },
      { q: "What if I discover a high roaming bill after returning home?", a: "Contact your carrier's customer support immediately. Explain the situation — many carriers will negotiate a partial reduction or offer a payment plan. For future trips, always disable data roaming and set up an eSIM before departure." },
      { q: "How can I save on roaming for my entire family?", a: "If everyone has an eSIM-compatible phone, purchasing individual eSIM plans for each person offers the best value. For devices without eSIM support, consider sharing one eSIM connection via tethering or renting a portable WiFi device." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM eliminates the worry of expensive roaming charges. Flat-rate plans let you travel with complete peace of mind.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Avoid Roaming Charges"
  },
  ko: {
    title: "비싼 로밍 요금 피하는 방법: 고액 청구 방지 완전 가이드",
    subtitle: "모르는 사이에 발생하는 고액 통신비를 사전에 방지",
    intro: "해외여행에서 돌아와 휴대폰 청구서를 보고 놀란 경험이 있으신가요? 국제 로밍으로 인한 고액 청구는 많은 여행자가 직면하는 문제입니다. 이 가이드에서는 해외 통신비를 대폭 절약하는 방법을 구체적으로 설명합니다. eSIM 등의 대안을 활용하여 안심하고 여행을 즐기세요.",
    sections: [
      {
        title: "해외 로밍이 비싼 이유",
        body: "국제 로밍이란 자국 통신사가 해외 통신사의 네트워크를 빌려 통신 서비스를 제공하는 구조입니다. 이 '빌리는' 비용이 높아 이용자에게도 고액이 청구됩니다. 한국 대형 통신사의 경우, 아무 대책 없이 사용하면 하루에 수만 원의 청구가 발생하는 경우도 드물지 않습니다.\n\n이메일 첨부파일 다운로드, 지도 앱 사용, SNS 이미지 표시 등 평소 아무렇지 않게 하는 조작이 모두 데이터 통신으로 과금됩니다. 특히 앱의 백그라운드 업데이트나 사진의 클라우드 동기화는 대량의 데이터를 소비합니다.\n\n한국 통신사들은 '해외 데이터 정액' 같은 옵션을 제공하지만, 하루 만 원 이상이 일반적입니다. 1주일 여행이면 7만 원 이상이 되어 eSIM 등의 대안보다 비쌉니다."
      },
      {
        title: "출발 전에 할 수 있는 대책",
        body: "가장 효과적인 대책은 출발 전에 '데이터 로밍'을 끄는 것입니다. iPhone은 '설정' → '셀룰러' → '셀룰러 데이터 옵션' → '데이터 로밍'을 끄고, Android는 '설정' → '네트워크' → '모바일 네트워크' → '데이터 로밍'을 끕니다.\n\n다음으로 여행용 eSIM 플랜을 사전에 구매하세요. eSIM이라면 1주일 데이터 플랜이 5,000~30,000원 정도로 로밍 요금의 몇 분의 일입니다. 출발 전에 프로필을 설치하고 여행지에서는 eSIM 데이터만 사용하는 설정으로 하면 고액 청구 걱정이 없습니다.\n\n앱의 백그라운드 업데이트도 끄세요. iPhone은 '설정' → '일반' → '백그라운드 앱 새로 고침'에서 끄거나 WiFi 전용으로 설정합니다. 사진 백업도 WiFi 전용으로 설정하여 의도치 않은 데이터 소비를 방지하세요."
      },
      {
        title: "eSIM으로 절약할 수 있는 금액",
        body: "eSIM을 사용하면 얼마나 절약할 수 있는지 구체적으로 살펴봅니다. 1주일 일본 여행의 경우, 한국 통신사 로밍 정액이 하루 만 원씩 7일 = 7만 원입니다. eSIM은 일본 대응 5GB 플랜이 약 1만~2만 원으로, 최대 5만 원 이상 절약 가능합니다.\n\n2주간 유럽 여행에서는 로밍 정액 약 14만 원 대비, 유럽 리전 eSIM 10GB 플랜이 약 2만~4만 원입니다. eSIM으로 바꾸기만 해도 약 10만 원 이상 절약됩니다.\n\neSIM은 정액제이므로 '예상 밖의 청구'가 발생하지 않습니다. 로밍은 정액 대상 외 지역에서의 통신이나 테더링이 별도 요금인 경우가 있지만, eSIM에는 그런 복잡한 요금 체계가 없습니다."
      },
      {
        title: "기타 절약 테크닉",
        body: "eSIM 도입에 더해 통신비를 절약하는 테크닉이 있습니다. 먼저 WiFi를 적극 활용하세요. 호텔, 카페, 공항, 쇼핑몰 등 많은 곳에서 무료 WiFi를 이용할 수 있습니다. 대용량 다운로드나 앱 업데이트는 WiFi에서 하세요.\n\n통화료 절약에는 인터넷 통화 앱이 효과적입니다. 카카오톡, WhatsApp, FaceTime, Skype 등을 사용하면 eSIM 데이터나 WiFi로 무료 통화가 가능합니다. 국제 전화 요금을 완전히 회피할 수 있어 특히 장시간 통화에서 크게 절약됩니다.\n\n데이터 사용량을 수시로 확인하세요. 지도 앱은 오프라인 지도를 미리 다운로드해 두면 데이터 소비 없이 내비게이션을 사용할 수 있습니다. Google Maps나 Apple Maps의 오프라인 지도 기능을 꼭 활용하세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "데이터 로밍을 끄면 전화도 안 되나요?", a: "아닙니다. 데이터 로밍을 끄면 데이터 통신만 차단됩니다. 음성 통화 수신은 가능합니다. 다만 해외에서의 수신에도 통화료가 발생할 수 있으니 통신사 요금제를 확인하세요." },
      { q: "eSIM을 사용하면 로밍 요금이 완전히 없어지나요?", a: "네, 한국 통신사의 데이터 로밍을 끄고 eSIM 데이터만 사용하는 설정으로 하면 통신사의 로밍 요금은 발생하지 않습니다. eSIM 플랜 구매 비용만 듭니다." },
      { q: "귀국 후 고액 로밍 청구를 발견하면 어떻게 하나요?", a: "즉시 통신사 고객센터에 연락하세요. 사정을 설명하면 일부 감면이나 분할 납부에 응해주는 경우가 있습니다. 앞으로는 출발 전에 데이터 로밍 끄기와 eSIM 설정을 잊지 마세요." },
      { q: "가족 전원의 로밍 비용을 절약하는 방법은?", a: "가족 모두 eSIM 대응 기기라면 각각 eSIM 플랜을 구매하는 것이 가성비가 좋습니다. eSIM 미대응 기기가 있으면 eSIM 기기의 테더링으로 공유하거나 포켓 WiFi도 검토하세요." }
    ],
    ctaTitle: "로밍 요금과 작별하세요",
    ctaDesc: "AutoWiFi eSIM이라면 고액 로밍 요금 걱정 제로. 정액 플랜으로 안심하고 해외여행을 즐기세요.",
    ctaButton: "지금 eSIM 구매하기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "로밍 요금 피하기"
  },
  zh: {
    title: "如何避免高额漫游费：省钱完全指南",
    subtitle: "防止不知不觉产生的天价通信费",
    intro: "出国旅行回来后看到手机账单被吓到过吗？国际漫游产生的高额费用是很多旅行者都会遇到的问题。本文具体介绍如何大幅节省海外通信费用。善用eSIM等替代方案，安心享受旅行。",
    sections: [
      {
        title: "为什么国际漫游这么贵",
        body: "国际漫游是您的国内运营商借用海外运营商的网络提供通信服务。这个借用成本很高，所以转嫁给用户。如果不做任何准备，一天产生几百甚至上千元的账单并不罕见。\n\n下载邮件附件、使用地图、加载社交媒体图片等日常操作都会产生数据费用。特别是应用后台更新和照片云同步会消耗大量数据，不知不觉中账单就涨上去了。\n\n大多数运营商提供每日漫游套餐，但通常每天几十元。一周旅行就要几百元，比eSIM等替代方案贵得多。而且忘记开通日套餐的风险很大。"
      },
      {
        title: "出发前的预防措施",
        body: "最有效的措施是出发前关闭数据漫游。iPhone上进入设置→蜂窝网络→蜂窝数据选项→关闭数据漫游。Android上在设置→网络→移动网络中关闭数据漫游。这能防止在海外不小心连接漫游。\n\n然后提前购买旅行用eSIM套餐。eSIM一周数据套餐大约30-150元，只是漫游费的零头。出发前安装配置文件，在旅行地只使用eSIM数据，高额账单的风险为零。\n\n关闭应用后台刷新。iPhone在设置→通用→后台App刷新中关闭或设为仅WiFi。照片备份也设为仅WiFi同步，防止意外的数据消耗。"
      },
      {
        title: "用eSIM能省多少钱",
        body: "来看看使用eSIM能节省多少。一周日本旅行，运营商漫游日套餐每天约30元×7天=210元。eSIM日本5GB套餐约50-100元，最多可以省150元以上。\n\n两周欧洲旅行，漫游日套餐约420元（每天30元×14天），而欧洲区域eSIM 10GB套餐约100-200元。仅切换到eSIM就能省下200元以上。\n\neSIM是定额制，不会出现意外账单。漫游可能存在定额范围外区域的通信或热点共享额外收费，而eSIM没有这些复杂的收费结构。"
      },
      {
        title: "其他省钱技巧",
        body: "除了使用eSIM，还有更多省钱方法。积极利用WiFi——酒店、咖啡厅、机场、商场等很多地方都有免费WiFi。大文件下载和应用更新留到WiFi环境下进行。\n\n节省通话费用可以用网络通话应用。微信、WhatsApp、FaceTime、Skype等应用可以通过eSIM数据或WiFi免费通话。完全避免国际通话费用，长时间通话尤其划算。\n\n定期检查数据使用量。地图应用提前下载离线地图，就能在不消耗数据的情况下使用导航。Google Maps和Apple Maps的离线地图功能一定要善用。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "关闭数据漫游后还能接电话吗？", a: "可以。关闭数据漫游只影响数据连接，语音通话仍可接听。但在海外接听电话可能产生费用，请提前确认运营商资费。" },
      { q: "用eSIM就完全没有漫游费了吗？", a: "是的。关闭国内运营商的数据漫游，只使用eSIM数据，运营商就不会收取任何漫游费。只需支付eSIM套餐费用。" },
      { q: "回国后发现高额漫游账单怎么办？", a: "立即联系运营商客服。说明情况后，很多运营商会协商部分减免或分期付款。以后出发前务必关闭数据漫游并设置好eSIM。" },
      { q: "怎样为全家节省漫游费？", a: "如果全家都有eSIM兼容手机，每人购买eSIM套餐性价比最高。有不兼容的设备可以通过eSIM手机的热点共享，或考虑租用随身WiFi。" }
    ],
    ctaTitle: "告别高额漫游费",
    ctaDesc: "AutoWiFi eSIM让您彻底摆脱漫游费烦恼。定额套餐，安心出行。",
    ctaButton: "立即购买eSIM",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "避免漫游费"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/save-money-roaming", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="save-money-roaming" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
