import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "プラン選びの前後で見たい関連ガイド",
    articles: [
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行に必要なデータ量の目安" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM ガイド" },
      { slug: "travel-data-usage-tips", title: "旅行中のデータ節約術" },
      { slug: "international-esim", title: "International eSIM ガイド" },
      { slug: "best-esim-providers", title: "海外eSIMおすすめ比較" },
    ],
  },
  en: {
    title: "Compare More Before You Buy an eSIM Plan",
    articles: [
      { slug: "how-much-data-do-i-need-for-travel", title: "How Much Data Do I Need for Travel?" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM Guide" },
      { slug: "travel-data-usage-tips", title: "How to Save Mobile Data While Traveling" },
      { slug: "international-esim", title: "International eSIM Guide" },
      { slug: "best-esim-providers", title: "Best Travel eSIM Providers" },
    ],
  },
  ko: {
    title: "플랜 구매 전에 더 비교할 가이드",
    articles: [
      { slug: "how-much-data-do-i-need-for-travel", title: "여행에 필요한 데이터 용량" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM 가이드" },
      { slug: "travel-data-usage-tips", title: "여행 중 데이터 절약법" },
      { slug: "international-esim", title: "International eSIM 가이드" },
      { slug: "best-esim-providers", title: "추천 여행 eSIM 비교" },
    ],
  },
  zh: {
    title: "购买套餐前值得继续比较的指南",
    articles: [
      { slug: "how-much-data-do-i-need-for-travel", title: "旅行需要多少流量" },
      { slug: "esim-unlimited-data", title: "Unlimited Data eSIM 指南" },
      { slug: "travel-data-usage-tips", title: "旅行省流量技巧" },
      { slug: "international-esim", title: "International eSIM 指南" },
      { slug: "best-esim-providers", title: "旅行eSIM推荐对比" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIMデータプラン完全解説：GB・有効期間・カバレッジの選び方",
    subtitle: "自分にぴったりのプランを見つけるためのポイント",
    intro: "eSIMのデータプランには、データ容量、有効期間、対応エリアなど、さまざまな要素があります。適切なプランを選ぶことで、旅行中のインターネット環境を快適にしながら、無駄な出費を抑えることができます。この記事では、eSIMのデータプランの仕組みと選び方を詳しく解説します。本記事では自分にぴったりのプランを見つけるためのポイント・データ容量（GB）の目安と選び方・有効期間の種類と選び方などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "データ容量（GB）の目安と選び方",
        body: "eSIMプランを選ぶ際に最も重要な要素がデータ容量です。日常的なスマートフォンの使い方によって必要な容量は大きく異なります。メールやSNSの閲覧、地図アプリの利用程度であれば、1日あたり約500MB〜1GBで十分です。1週間の旅行なら3〜5GBのプランがおすすめです。\n\n一方、動画視聴やビデオ通話を頻繁に利用する場合は、1日あたり2〜3GBを見積もる必要があります。YouTubeやNetflixの標準画質での視聴は1時間あたり約1GB、高画質では3GB以上を消費します。ビジネス出張でビデオ会議を毎日行う場合は、1週間で10〜20GBが目安です。\n\nデータ容量に不安がある場合は、無制限プランを選ぶのも一つの方法です。無制限プランは容量を気にせず使えますが、一定量を超えると速度制限がかかるプランもあるため、完全無制限なのか速度制限付き無制限なのかを確認しましょう。"
      },
      {
        title: "有効期間の種類と選び方",
        body: "eSIMプランの有効期間は、一般的に7日間、15日間、30日間の3パターンが主流です。有効期間はプランをアクティベート（初めてデータ通信を開始）した時点からカウントされるのが一般的で、購入した日からではありません。\n\n短期旅行（1週間以内）であれば7日間プランが最もコスパが良いです。2週間程度の旅行には15日間プラン、1ヶ月以上の長期滞在には30日間プランを選びましょう。旅行期間が有効期間を少し超える場合は、余裕を持って1つ上のプランを選ぶことをおすすめします。\n\n注意すべきは、有効期間内にデータ容量を使い切ると、期間が残っていても通信ができなくなる（または速度制限がかかる）点です。逆に、データ容量が余っていても有効期間が終了するとプランは失効します。旅行期間とデータ使用量の両方を考慮してプランを選びましょう。"
      },
      {
        title: "カバレッジ（対応エリア）の確認",
        body: "eSIMプランには、特定の1カ国のみで使えるシングルカントリープランと、複数の国で使えるリージョナルプランやグローバルプランがあります。1カ国だけの旅行であればシングルカントリープランが最も安くてシンプルです。\n\n複数国を周遊する場合は、リージョナルプランが便利です。例えば\"アジア15カ国対応\"\"ヨーロッパ30カ国対応\"といったプランであれば、国境を越えるたびに新しいeSIMを購入する手間が省けます。データ容量は全ての対応国で共有されます。\n\nグローバルプランは100カ国以上をカバーする幅広いプランです。頻繁に海外に行く方や、旅行先が決まっていない段階でも準備しておきたい方に向いています。ただし、カバレッジが広い分、シングルカントリープランより割高になる傾向があります。また、対応国であっても地域によって接続するキャリアが異なり、通信品質に差が出ることがあります。"
      },
      {
        title: "プラン選びの実践的なアドバイス",
        body: "最適なプランを選ぶための実践的なアドバイスをまとめます。まず、旅行前にスマートフォンのデータ使用量を確認し、自分の日常的なデータ消費量を把握しましょう。iPhoneでは設定→モバイル通信→現在までの合算で確認でき、Androidでは設定→ネットワーク→データ使用量で確認できます。\n\n次に、旅行先でのインターネット利用方法を考えましょう。ホテルにWiFiがあれば、外出時だけeSIMのデータを使うことになるため、少なめのプランでも足ります。逆に、WiFi環境がない場所を多く訪れる場合は、余裕を持ったプランが安心です。\n\n初めてeSIMを使う方には、少し余裕のあるプランを選ぶことをおすすめします。データ不足で追加購入するよりも、最初から十分な容量を確保しておく方がコスト面でもストレス面でも有利です。多くのプロバイダーでは、データ容量の追加（トップアップ）も可能ですが、追加購入は割高になりがちです。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "データ容量を使い切ったらどうなりますか？", a: "プロバイダーによって異なりますが、通信が完全に停止するか、低速（128kbps程度）に制限されます。多くのプロバイダーでは追加データの購入（トップアップ）が可能です。" },
      { q: "有効期間はいつからカウントされますか？", a: "一般的に、eSIMプロファイルをインストールした日ではなく、初めてデータ通信を開始した日からカウントされます。ただし、プロバイダーによって異なるため、購入時に確認してください。" },
      { q: "未使用のデータは繰り越せますか？", a: "ほとんどのeSIMプランでは、データの繰り越しはできません。有効期間が終了すると未使用分も失効します。ただし、一部のプロバイダーでは繰り越し対応のプランも提供しています。" },
      { q: "無制限プランは本当に使い放題ですか？", a: "プランによって異なります。完全無制限のプランもありますが、一定量（例：1日2GB）を超えると速度制限がかかる実質無制限プランもあります。購入前に速度制限の条件を確認しましょう。" }
    ],
    ctaTitle: "あなたにぴったりのプランを見つけよう",
    ctaDesc: "AutoWiFi eSIMなら、渡航先・日数・データ容量に合わせた最適なプランが見つかります。200以上の国と地域に対応。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIMデータプラン解説"
  },
  en: {
    title: "Understanding eSIM Data Plans: GB, Validity, and Coverage Explained",
    subtitle: "How to choose the perfect plan for your travel needs",
    intro: "eSIM data plans come with various options — data allowance, validity period, and coverage area. Choosing the right plan ensures a comfortable internet experience while avoiding unnecessary spending. This guide explains how eSIM data plans work and how to pick the best one for your trip.",
    sections: [
      {
        title: "How Much Data Do You Need? A Practical Guide",
        body: "Data allowance is the most critical factor when choosing an eSIM plan. Your needs depend heavily on how you use your phone. For basic usage like email, social media browsing, and maps, approximately 500MB to 1GB per day is sufficient. A 3-5GB plan works well for a one-week trip with moderate usage.\n\nHeavy users who stream video or make frequent video calls should estimate 2-3GB per day. YouTube and Netflix consume about 1GB per hour at standard quality and 3GB or more at HD quality. For business trips with daily video conferences, plan for 10-20GB per week.\n\nIf data anxiety is a concern, consider an unlimited plan. However, be aware that some unlimited plans throttle speeds after reaching a certain threshold. Check whether a plan is truly unlimited or \"unlimited with speed caps\" before purchasing.",
      },
      {
        title: "Understanding Validity Periods",
        body: "eSIM plans typically come in 7-day, 15-day, and 30-day validity periods. Importantly, the countdown usually starts when you first use data on the eSIM — not from the purchase date. This means you can buy and install the eSIM days before your trip.\n\nFor short trips of a week or less, a 7-day plan offers the best value. For two-week vacations, choose a 15-day plan. For stays of a month or longer, a 30-day plan is the way to go. If your trip slightly exceeds the validity period, it is better to choose the next tier up rather than risk running out.\n\nOne key consideration: if you exhaust your data allowance before the validity period ends, your connection will either stop or be throttled. Conversely, if the validity period expires with data remaining, that data is forfeited. Always consider both your trip duration and expected data usage when selecting a plan."
      },
      {
        title: "Coverage: Single Country, Regional, and Global Plans",
        body: "eSIM plans fall into three coverage categories. Single-country plans work in one specific country and are typically the cheapest and simplest option for a single-destination trip.\n\nRegional plans cover multiple countries and are ideal for multi-country travel. For example, an Asia plan covering 15 countries or a Europe plan covering 30 countries lets you cross borders without buying a new eSIM each time. Data allowance is shared across all covered countries.\n\nGlobal plans cover 100 or more countries and suit frequent travelers or those whose plans are not yet finalized. While convenient, they tend to cost more than single-country plans per GB. Additionally, the carrier you connect to may vary by country, leading to some variation in connection quality."
      },
      {
        title: "Practical Tips for Choosing the Right Plan",
        body: "Here are practical tips for selecting the ideal plan. First, check your current data consumption on your phone before traveling. On iPhone, go to Settings then Cellular and review your usage statistics. On Android, check Settings then Network then Data usage. This gives you a realistic baseline.\n\nNext, consider your WiFi availability at your destination. If your hotel has reliable WiFi, you only need eSIM data when you are out and about, so a smaller plan may suffice. If you will be in areas without WiFi frequently, choose a larger plan for peace of mind.\n\nFor first-time eSIM users, we recommend choosing a plan with a bit more data than you think you need. Running out and purchasing a top-up is typically more expensive than buying adequate data upfront. Most providers offer data top-ups, but these usually come at a premium per GB."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "What happens when I run out of data?", a: "This varies by provider. Your connection may stop entirely or be throttled to a low speed (around 128kbps). Most providers offer top-up options to purchase additional data." },
      { q: "When does the validity period start?", a: "Typically, it begins when you first use data on the eSIM, not when you purchase or install it. However, this can vary by provider, so confirm at the time of purchase." },
      { q: "Can unused data be rolled over?", a: "Most eSIM plans do not support data rollover. Unused data expires when the validity period ends. Some providers offer rollover-capable plans, but these are less common." },
      { q: "Are unlimited plans truly unlimited?", a: "It depends on the plan. Some are genuinely unlimited, while others throttle speeds after a daily or total threshold (e.g., 2GB per day). Always check the fair usage policy before purchasing." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM offers plans tailored to your destination, trip length, and data needs. Covering 200+ countries and regions.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "eSIM Data Plans Explained"
  },
  ko: {
    title: "eSIM 데이터 플랜 완전 해설: GB·유효기간·커버리지 선택법",
    subtitle: "나에게 딱 맞는 플랜을 찾기 위한 핵심 포인트",
    intro: "eSIM 데이터 플랜에는 데이터 용량, 유효기간, 대응 지역 등 다양한 요소가 있습니다. 적절한 플랜을 선택하면 여행 중 인터넷 환경을 쾌적하게 유지하면서 불필요한 지출을 줄일 수 있습니다. 이 기사에서는 eSIM 데이터 플랜의 구조와 선택법을 상세히 설명합니다.",
    sections: [
      {
        title: "데이터 용량(GB) 기준과 선택법",
        body: "eSIM 플랜 선택 시 가장 중요한 요소가 데이터 용량입니다. 일상적인 스마트폰 사용 방식에 따라 필요한 용량이 크게 달라집니다. 이메일이나 SNS 확인, 지도 앱 사용 정도라면 하루 약 500MB~1GB로 충분합니다. 1주일 여행이라면 3~5GB 플랜을 추천합니다.\n\n동영상 시청이나 영상 통화를 자주 이용한다면 하루 2~3GB를 예상해야 합니다. YouTube나 Netflix 표준 화질은 시간당 약 1GB, 고화질은 3GB 이상을 소비합니다. 비즈니스 출장으로 매일 화상 회의를 한다면 1주일에 10~20GB가 기준입니다.\n\n데이터 용량이 걱정된다면 무제한 플랜도 하나의 방법입니다. 무제한 플랜이라도 일정량을 초과하면 속도 제한이 걸리는 플랜이 있으므로 '완전 무제한'인지 '속도 제한 있는 무제한'인지 확인하세요."
      },
      {
        title: "유효기간의 종류와 선택법",
        body: "eSIM 플랜의 유효기간은 일반적으로 7일, 15일, 30일이 주류입니다. 유효기간은 플랜을 활성화(처음 데이터 통신을 시작)한 시점부터 카운트되며, 구매한 날부터가 아닙니다.\n\n단기 여행(1주일 이내)이라면 7일 플랜이 가장 가성비가 좋습니다. 2주 정도의 여행에는 15일 플랜, 1개월 이상의 장기 체류에는 30일 플랜을 선택하세요. 여행 기간이 유효기간을 약간 넘는 경우 여유 있게 한 단계 위 플랜을 선택하는 것을 추천합니다.\n\n주의할 점은 유효기간 내에 데이터를 다 사용하면 기간이 남아 있어도 통신이 안 되거나 속도가 제한된다는 것입니다. 반대로 데이터가 남아 있어도 유효기간이 끝나면 플랜은 만료됩니다."
      },
      {
        title: "커버리지(대응 지역) 확인",
        body: "eSIM 플랜에는 특정 1개국에서만 사용할 수 있는 '싱글 컨트리 플랜'과 여러 국가에서 사용 가능한 '리전별 플랜' 및 '글로벌 플랜'이 있습니다. 1개국만 여행한다면 싱글 컨트리 플랜이 가장 저렴하고 간단합니다.\n\n여러 국가를 순방할 경우 리전별 플랜이 편리합니다. '아시아 15개국 대응', '유럽 30개국 대응' 등의 플랜이라면 국경을 넘을 때마다 새 eSIM을 구매할 필요가 없습니다.\n\n글로벌 플랜은 100개국 이상을 커버하는 광범위한 플랜입니다. 해외 출장이 잦거나 여행지가 미정인 단계에서도 준비해 두고 싶은 분에게 적합합니다. 다만 커버리지가 넓은 만큼 싱글 컨트리 플랜보다 비싼 경향이 있습니다."
      },
      {
        title: "플랜 선택을 위한 실전 조언",
        body: "최적의 플랜을 선택하기 위한 실전 조언을 정리합니다. 먼저 여행 전에 스마트폰의 '데이터 사용량'을 확인하여 일상적인 데이터 소비량을 파악하세요. iPhone은 '설정' → '셀룰러'에서, Android는 '설정' → '네트워크' → '데이터 사용량'에서 확인할 수 있습니다.\n\n다음으로 여행지에서의 인터넷 사용 방식을 생각하세요. 호텔에 WiFi가 있다면 외출 시에만 eSIM 데이터를 사용하므로 적은 플랜으로도 충분합니다. WiFi가 없는 곳을 많이 방문한다면 넉넉한 플랜이 안심입니다.\n\n처음 eSIM을 사용하는 분에게는 조금 여유 있는 플랜을 선택하는 것을 추천합니다. 데이터 부족으로 추가 구매하는 것보다 처음부터 충분한 용량을 확보하는 것이 비용면에서도 스트레스면에서도 유리합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "데이터를 다 사용하면 어떻게 되나요?", a: "제공업체에 따라 다르지만 통신이 완전히 중단되거나 저속(128kbps 정도)으로 제한됩니다. 대부분의 제공업체에서 추가 데이터 구매(톱업)가 가능합니다." },
      { q: "유효기간은 언제부터 카운트되나요?", a: "일반적으로 eSIM을 설치한 날이 아니라 처음 데이터 통신을 시작한 날부터 카운트됩니다. 제공업체에 따라 다를 수 있으니 구매 시 확인하세요." },
      { q: "미사용 데이터는 이월되나요?", a: "대부분의 eSIM 플랜에서 데이터 이월은 지원되지 않습니다. 유효기간 종료 시 미사용분도 소멸합니다." },
      { q: "무제한 플랜은 정말 무제한인가요?", a: "플랜에 따라 다릅니다. 완전 무제한 플랜도 있지만 일정량을 초과하면 속도가 제한되는 플랜도 있습니다. 구매 전에 속도 제한 조건을 확인하세요." }
    ],
    ctaTitle: "나에게 딱 맞는 플랜을 찾아보세요",
    ctaDesc: "AutoWiFi eSIM이라면 여행지·기간·데이터 용량에 맞는 최적의 플랜을 찾을 수 있습니다. 200개 이상의 국가에 대응.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM 데이터 플랜 해설"
  },
  zh: {
    title: "eSIM数据套餐完全解析：流量·有效期·覆盖范围选择指南",
    subtitle: "找到最适合自己的套餐，不花冤枉钱",
    intro: "eSIM数据套餐包含流量、有效期、覆盖区域等多种要素。选择合适的套餐既能保证旅途中的上网体验，又能避免不必要的支出。本文详细解析eSIM数据套餐的运作方式和选择技巧。",
    sections: [
      {
        title: "数据流量（GB）参考标准与选择",
        body: "选择eSIM套餐时，数据流量是最关键的因素。根据日常使用习惯，所需流量差异很大。如果只是收邮件、刷社交媒体、用地图导航，每天约500MB-1GB就够了。一周旅行推荐3-5GB的套餐。\n\n如果经常看视频或视频通话，每天需要预估2-3GB。YouTube和Netflix标准画质每小时约消耗1GB，高清则超过3GB。商务出差每天开视频会议的话，一周需要10-20GB。\n\n如果担心流量不够，可以选择无限流量套餐。但要注意有些无限套餐达到一定用量后会限速，购买前确认是完全无限还是限速无限。"
      },
      {
        title: "有效期的种类与选择",
        body: "eSIM套餐的有效期通常分为7天、15天、30天三种。有效期一般从激活（首次使用数据）时开始计算，而非购买日。\n\n短期旅行（一周以内）选7天套餐性价比最高。两周左右选15天，一个月以上选30天。如果旅行时间略超过有效期，建议选上一档以留出余量。\n\n需要注意的是，有效期内流量用完，即使还在有效期内也无法上网（或被限速）。反过来，流量没用完但有效期到了，套餐也会失效。选套餐时要同时考虑旅行天数和数据使用量。"
      },
      {
        title: "覆盖范围确认",
        body: "eSIM套餐分为三类：仅限单一国家使用的单国套餐、覆盖多国的区域套餐和\"全球套餐。如果只去一个国家，单国套餐最便宜也最简单。\n\n多国旅行推荐区域套餐。比如亚洲15国通用、欧洲30国通用\"的套餐，跨境时不用重新购买eSIM。流量在所有覆盖国家共享使用。\n\n全球套餐覆盖100个以上国家，适合经常出国或目的地尚未确定的人。不过覆盖面广意味着价格通常高于单国套餐。另外，不同国家连接的运营商可能不同，网络质量会有差异。"
      },
      {
        title: "选套餐的实用建议",
        body: "整理一些选择最佳套餐的实用建议。首先，旅行前查看手机的数据使用量，了解自己日常的数据消耗。iPhone在设置→蜂窝网络中查看，Android在设置→网络→数据使用量中查看。\n\n然后考虑目的地的网络使用情况。如果酒店有WiFi，外出时才用eSIM数据，那少一点的套餐就够了。如果经常去没有WiFi的地方，选大一点的套餐更安心。\n\n对于首次使用eSIM的用户，建议选择比预想稍多的套餐。流量不够时追加购买通常更贵，不如一开始就买够。大多数提供商支持流量充值，但单价通常更高。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "流量用完了会怎样？", a: "因提供商而异，可能完全断网或限速到128kbps左右。大多数提供商支持追加购买流量。" },
      { q: "有效期从什么时候开始算？", a: "通常从首次使用数据时开始计算，而非购买或安装日期。但不同提供商可能有差异，购买时请确认。" },
      { q: "未使用的流量可以结转吗？", a: "大多数eSIM套餐不支持流量结转。有效期结束后未使用的流量也会失效。" },
      { q: "无限流量套餐真的无限吗？", a: "视套餐而定。有些确实完全无限，有些在达到日限额后会限速。购买前务必确认公平使用政策。" }
    ],
    ctaTitle: "找到最适合您的套餐",
    ctaDesc: "AutoWiFi eSIM根据目的地、行程天数和数据需求提供最优套餐选择。覆盖200多个国家和地区。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM数据套餐解析"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-data-plans-explained", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="esim-data-plans-explained"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
