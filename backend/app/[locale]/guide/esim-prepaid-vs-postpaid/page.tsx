import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "料金比較を深める関連ガイド",
    articles: [
      { slug: "esim-vs-sim-card", title: "eSIM vs 物理SIMカード" },
      { slug: "international-calling-esim", title: "eSIMでの国際通話" },
      { slug: "esim-speed-test", title: "eSIM速度テスト比較" },
      { slug: "esim-data-plans-explained", title: "eSIMデータプラン解説" },
    ],
  },
  en: {
    title: "Compare More Before You Choose a Billing Model",
    articles: [
      { slug: "esim-vs-sim-card", title: "eSIM vs Physical SIM Card" },
      { slug: "international-calling-esim", title: "International Calls with eSIM" },
      { slug: "esim-speed-test", title: "eSIM Speed Test Comparison" },
      { slug: "esim-data-plans-explained", title: "eSIM Data Plans Explained" },
    ],
  },
  ko: {
    title: "요금 선택 전에 함께 볼 가이드",
    articles: [
      { slug: "esim-vs-sim-card", title: "eSIM vs 물리 SIM" },
      { slug: "international-calling-esim", title: "eSIM 국제 전화" },
      { slug: "esim-speed-test", title: "eSIM 속도 테스트 비교" },
      { slug: "esim-data-plans-explained", title: "eSIM 데이터 플랜 해설" },
    ],
  },
  zh: {
    title: "选择计费方式前可继续比较的指南",
    articles: [
      { slug: "esim-vs-sim-card", title: "eSIM vs 实体SIM卡" },
      { slug: "international-calling-esim", title: "eSIM国际通话" },
      { slug: "esim-speed-test", title: "eSIM速度测试对比" },
      { slug: "esim-data-plans-explained", title: "eSIM数据套餐详解" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "プリペイドeSIM vs ポストペイドeSIM - 旅行者に最適なのは？",
    subtitle: "前払いと後払い、2つのeSIM料金体系の違いと選び方を徹底解説",
    intro: "eSIMプランには大きく分けてプリペイド（前払い）とポストペイド（後払い）の2種類があります。旅行者にとってどちらが最適なのか、それぞれのメリット・デメリットを比較して、あなたのスタイルに合ったプランの選び方を解説します。本記事では前払いと後払い、2つのeSIM料金体系の違いと選び方を徹底解説・プリペイドeSIMとは・ポストペイドeSIMとはなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "プリペイドeSIMとは",
        body: "プリペイドeSIMは、使用前にデータ容量と利用期間を決めて料金を前払いするタイプです。例えば5GB/7日間で2,000円のように、購入時点で料金が確定するため、予想外の請求が発生しません。旅行者向けeSIMの大半はこのプリペイド方式を採用しています。\n\nプリペイドの最大のメリットは料金の透明性です。旅行前に必要な金額がわかるため、予算管理が容易です。また、契約の縛りがなく、使い切ったらそれで終わりというシンプルさも魅力です。追加データが必要になった場合は、新しいプランを購入するだけです。\n\nAutoWiFiのeSIMプランはすべてプリペイド方式を採用しています。購入時に表示される金額以上の請求は一切ありません。データ残量はアプリでリアルタイムに確認でき、残量が少なくなったらワンタップで追加購入も可能です。"
      },
      {
        title: "ポストペイドeSIMとは",
        body: "ポストペイドeSIMは、利用した分だけ後から請求される方式です。国内の携帯電話契約の多くがこの方式で、毎月の使用量に応じた料金が翌月に請求されます。一部の海外キャリアや法人向けプランでポストペイド方式のeSIMが提供されています。\n\nポストペイドのメリットは、データ容量を事前に決める必要がないことです。使いたい分だけ使えるため、データ不足を心配する必要がありません。長期滞在者やビジネス出張が多い方にとっては、毎回プランを購入する手間が省けます。\n\nただし、デメリットも明確です。使いすぎた場合に高額な請求が届くリスクがあり、海外でのデータローミングは特に料金が膨らみやすいです。また、多くの場合、信用審査や住所証明が必要で、短期旅行者には不向きです。"
      },
      {
        title: "旅行者にはプリペイドがおすすめな理由",
        body: "短期〜中期の海外旅行者には、圧倒的にプリペイドeSIMがおすすめです。理由は3つあります。まず、料金が事前に確定するため、旅行の予算に通信費を確実に組み込めます。ポストペイドのように帰国後に想定外の請求が届く心配がありません。\n\n次に、契約手続きが不要です。ポストペイドは通常、現地での契約や身分証明書の提出が必要ですが、プリペイドはオンラインで即購入・即利用が可能です。空港に着いてから契約手続きに時間を取られることもありません。\n\n最後に、解約の手間がないことです。プリペイドは有効期限が過ぎれば自動的に終了するため、解約手続きを忘れて課金され続けるリスクがゼロです。AutoWiFiのプリペイドeSIMなら、購入から利用開始、終了まですべてアプリで完結します。"
      },
      {
        title: "プリペイドeSIMの賢い選び方",
        body: "プリペイドeSIMを選ぶ際のポイントをご紹介します。まず、必要なデータ容量を見積もりましょう。SNSやメッセージ中心なら1日300〜500MB、地図やライドシェアも使うなら1日1GB、動画視聴やリモートワークなら1日2GB以上が目安です。余裕を持って少し多めのプランを選ぶのがコツです。\n\n次に、有効期間と旅行日数を合わせましょう。7日間のプランで10日間の旅行に出ると、後半3日はデータ通信ができなくなります。旅行日数より1〜2日長いプランを選ぶか、延長購入が可能なプロバイダーを選びましょう。\n\nAutoWiFiでは3日間から30日間まで幅広い有効期間のプランを用意しています。また、有効期限内にデータを使い切った場合も、アプリからすぐに追加データを購入できます。旅行中のデータ切れによるストレスを最小限に抑えられる設計です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "プリペイドeSIMでデータを使い切ったらどうなりますか？", a: "データを使い切ると通信ができなくなります。WiFi環境で追加データを購入するか、新しいプランをアプリから購入してください。AutoWiFiではワンタップで追加購入が可能です。" },
      { q: "プリペイドeSIMに有効期限はありますか？", a: "はい、すべてのプリペイドeSIMには有効期限があります。3日間、7日間、15日間、30日間など、プランによって異なります。有効期限が過ぎるとデータ残量に関係なく使用できなくなります。" },
      { q: "ポストペイドeSIMを海外旅行で使うのは危険ですか？", a: "危険ではありませんが、料金が予測しにくいのが難点です。データローミング料金は高額になりがちなため、使用量の上限を設定するか、プリペイドeSIMの利用をおすすめします。" },
      { q: "プリペイドeSIMの未使用データは返金されますか？", a: "一般的に、未使用データの返金はありません。そのため、必要な分だけのプランを選ぶことが重要です。データが足りなくなった場合は追加購入で対応できます。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiのプリペイドeSIMなら、料金は事前に確定。使い切ったらワンタップで追加購入も。シンプルで安心な海外通信を。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "プリペイド vs ポストペイド"
  },
  en: {
    title: "Prepaid vs Postpaid eSIM - Which Is Best for Travelers?",
    subtitle: "Compare pay-in-advance and pay-after-use eSIM billing models",
    intro: "eSIM plans come in two main billing types: prepaid (pay before use) and postpaid (pay after use). This guide compares both models so you can choose the approach that best fits your travel style and budget.",
    sections: [
      {
        title: "What Is Prepaid eSIM?",
        body: "Prepaid eSIM requires you to select your data allowance and validity period upfront, paying before you use it. For example, a plan might be 5GB for 7 days at $15. The cost is fixed at purchase, so there are no surprise charges. The vast majority of travel eSIM plans use this model.\n\nThe biggest advantage of prepaid is pricing transparency. You know exactly what you will spend before your trip, making budget planning straightforward. There are no contracts to sign and no cancellation needed. When the plan expires or data runs out, it simply stops working. If you need more data, just buy another top-up.\n\nAutoWiFi's eSIM plans are all prepaid. The price shown at purchase is the only amount you will ever be charged. Data remaining is visible in real time through the app, and one-tap top-ups are available when you run low."
      },
      {
        title: "What Is Postpaid eSIM?",
        body: "Postpaid eSIM bills you after the fact based on actual usage. Most domestic phone contracts work this way, with monthly bills calculated from usage data. Some international carriers and business-oriented plans offer postpaid eSIM options.\n\nThe advantage of postpaid is flexibility. You do not need to predict your data needs in advance, and you can use as much as you want without worrying about running out. For long-term residents and frequent business travelers, it eliminates the hassle of purchasing new plans repeatedly.\n\nHowever, the downsides are significant. There is a real risk of unexpectedly high bills, especially with international data roaming where costs can escalate quickly. Most postpaid plans require credit checks and proof of local address, making them impractical for short-term visitors."
      },
      {
        title: "Why Prepaid Is Better for Travelers",
        body: "For short to medium-term international travelers, prepaid eSIM is overwhelmingly the better choice for three reasons. First, fixed pricing lets you build communication costs into your travel budget with certainty. There is no risk of returning home to an unexpectedly large bill.\n\nSecond, no contract process is required. Postpaid typically demands in-person registration and identification documents, while prepaid can be purchased and activated online instantly. You will not waste precious vacation time on paperwork at airport counters.\n\nThird, there is zero cancellation risk. Prepaid plans automatically expire at the end of the validity period, so you cannot accidentally keep paying for a plan you no longer need. AutoWiFi's prepaid eSIM handles everything from purchase to activation to expiry within the app."
      },
      {
        title: "How to Choose the Right Prepaid eSIM Plan",
        body: "When selecting a prepaid eSIM, start by estimating your data needs. For social media and messaging, budget 300-500MB per day. Add maps and ride-hailing, and you need about 1GB daily. Video streaming or remote work requires 2GB or more per day. Choosing a slightly larger plan than your estimate provides a comfortable buffer.\n\nMatch the validity period to your trip length. A 7-day plan will not cover a 10-day trip, leaving you without data for the final 3 days. Select a plan that is 1-2 days longer than your trip, or choose a provider that allows easy extensions.\n\nAutoWiFi offers validity periods from 3 days to 30 days. If you exhaust your data before the plan expires, additional data can be purchased instantly through the app. This design minimizes the stress of running out of data during your travels."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "What happens when my prepaid eSIM data runs out?", a: "Data connectivity stops when your allowance is exhausted. You can purchase additional data or a new plan through the app. On WiFi, use AutoWiFi's one-tap top-up feature to restore connectivity immediately." },
      { q: "Do prepaid eSIMs have expiry dates?", a: "Yes, all prepaid eSIMs have validity periods ranging from 3 to 30 days depending on the plan. Once expired, the eSIM stops working regardless of remaining data." },
      { q: "Is postpaid eSIM risky for international travel?", a: "It is not dangerous but costs are unpredictable. International data roaming charges can be substantial. We recommend setting usage caps if you use postpaid, or switching to prepaid for travel." },
      { q: "Can I get a refund for unused prepaid data?", a: "Generally, unused data is non-refundable. This is why choosing the right plan size matters. If you need more data mid-trip, top-ups are available at any time." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi's prepaid eSIM means fixed costs with no surprises. One-tap top-ups when you need more. Simple, transparent travel connectivity.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Prepaid vs Postpaid eSIM"
  },
  ko: {
    title: "선불 eSIM vs 후불 eSIM - 여행자에게 최적인 것은?",
    subtitle: "선불과 후불, 두 가지 eSIM 요금 체계의 차이와 선택법",
    intro: "eSIM 플랜은 크게 선불(프리페이드)과 후불(포스트페이드)로 나뉩니다. 여행자에게 어느 쪽이 최적인지, 각각의 장단점을 비교하여 자신에게 맞는 플랜 선택법을 알아봅니다.",
    sections: [
      {
        title: "선불 eSIM이란",
        body: "선불 eSIM은 사용 전에 데이터 용량과 이용 기간을 정하고 요금을 미리 지불하는 방식입니다. 예를 들어 '5GB/7일 15,000원'처럼 구입 시점에 요금이 확정되어 예상치 못한 청구가 발생하지 않습니다. 여행자용 eSIM의 대부분이 이 선불 방식입니다.\n\n선불의 최대 장점은 요금의 투명성입니다. 여행 전에 필요한 금액을 알 수 있어 예산 관리가 쉽습니다. 계약의 구속이 없고, 다 쓰면 그것으로 끝이라는 심플함도 매력입니다.\n\nAutoWiFi의 eSIM 플랜은 모두 선불 방식입니다. 구입 시 표시된 금액 이상의 청구는 일절 없습니다. 데이터 잔량은 앱에서 실시간으로 확인할 수 있으며, 부족해지면 원탭으로 추가 구매도 가능합니다."
      },
      {
        title: "후불 eSIM이란",
        body: "후불 eSIM은 사용한 만큼 나중에 청구되는 방식입니다. 국내 휴대전화 계약의 대부분이 이 방식으로, 매월 사용량에 따른 요금이 다음 달에 청구됩니다. 일부 해외 통신사나 법인용 플랜에서 후불 방식의 eSIM이 제공됩니다.\n\n후불의 장점은 데이터 용량을 사전에 정할 필요가 없다는 것입니다. 원하는 만큼 사용할 수 있어 데이터 부족 걱정이 없습니다. 장기 체류자나 출장이 잦은 분에게는 매번 플랜을 구입하는 수고를 줄일 수 있습니다.\n\n다만 단점도 분명합니다. 과다 사용 시 고액 청구의 위험이 있으며, 해외 데이터 로밍은 특히 요금이 불어나기 쉽습니다. 대부분 신용 심사나 주소 증명이 필요하여 단기 여행자에게는 부적합합니다."
      },
      {
        title: "여행자에게 선불을 추천하는 이유",
        body: "단기~중기 해외 여행자에게는 압도적으로 선불 eSIM을 추천합니다. 이유는 3가지입니다. 첫째, 요금이 사전에 확정되어 여행 예산에 통신비를 확실히 포함할 수 있습니다.\n\n둘째, 계약 절차가 불필요합니다. 후불은 보통 현지에서의 계약이나 신분증 제출이 필요하지만, 선불은 온라인에서 즉시 구매·이용이 가능합니다.\n\n셋째, 해지 수고가 없습니다. 선불은 유효 기간이 지나면 자동으로 종료되므로, 해지를 잊어 계속 과금되는 위험이 제로입니다. AutoWiFi의 선불 eSIM이면 구매부터 이용 개시, 종료까지 모두 앱에서 완결됩니다."
      },
      {
        title: "선불 eSIM의 현명한 선택법",
        body: "선불 eSIM 선택 시의 포인트를 소개합니다. 먼저 필요한 데이터 용량을 추정하세요. SNS나 메시지 위주라면 하루 300~500MB, 지도나 차량 호출도 사용하면 하루 1GB, 동영상이나 원격 근무라면 하루 2GB 이상이 기준입니다.\n\n유효 기간과 여행 일수를 맞추세요. 7일 플랜으로 10일 여행을 가면 후반 3일은 데이터 통신을 할 수 없습니다. 여행 일수보다 1~2일 긴 플랜을 선택하세요.\n\nAutoWiFi에서는 3일부터 30일까지 다양한 유효 기간의 플랜을 제공합니다. 유효 기간 내에 데이터를 다 사용해도 앱에서 바로 추가 데이터를 구매할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "선불 eSIM 데이터를 다 사용하면 어떻게 되나요?", a: "데이터를 다 사용하면 통신이 중단됩니다. WiFi 환경에서 추가 데이터를 구매하거나 앱에서 새 플랜을 구입하세요. AutoWiFi에서는 원탭으로 추가 구매가 가능합니다." },
      { q: "선불 eSIM에 유효 기간이 있나요?", a: "네, 모든 선불 eSIM에는 유효 기간이 있습니다. 3일, 7일, 15일, 30일 등 플랜에 따라 다릅니다. 유효 기간이 지나면 잔여 데이터와 관계없이 사용할 수 없게 됩니다." },
      { q: "후불 eSIM을 해외 여행에서 사용하는 것은 위험한가요?", a: "위험하지는 않지만 요금이 예측하기 어렵습니다. 데이터 로밍 요금이 높아질 수 있으므로 사용 상한을 설정하거나 선불 eSIM을 이용하세요." },
      { q: "선불 eSIM의 미사용 데이터는 환불되나요?", a: "일반적으로 미사용 데이터의 환불은 없습니다. 필요한 만큼의 플랜을 선택하는 것이 중요합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi의 선불 eSIM이면 요금은 사전 확정. 다 쓰면 원탭으로 추가 구매도. 심플하고 안심인 해외 통신을.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "선불 vs 후불 eSIM"
  },
  zh: {
    title: "预付eSIM vs 后付eSIM - 旅行者该选哪种？",
    subtitle: "全面对比先付费和后付费两种eSIM计费方式",
    intro: "eSIM套餐主要分为预付（先付费）和后付（先用后付）两种计费方式。本指南对比两种模式的优缺点，帮您选择最适合旅行风格和预算的方案。",
    sections: [
      {
        title: "什么是预付eSIM",
        body: "预付eSIM需要在使用前确定数据量和有效期并预先付费。例如'5GB/7天，100元'，购买时费用就已确定，不会产生意外账单。绝大多数旅行eSIM套餐都采用预付方式。\n\n预付的最大优势是价格透明。出发前就知道要花多少钱，预算管理简单。没有合约约束，用完就结束，简单明了。需要更多数据时，再购买新的即可。\n\nAutoWiFi的eSIM套餐全部采用预付方式。购买时显示的价格就是全部费用，不会有额外收费。应用内可实时查看剩余流量，不够时一键追加购买。"
      },
      {
        title: "什么是后付eSIM",
        body: "后付eSIM根据实际使用量在使用后计费。国内大多数手机合约都是这种方式，根据每月使用量在下月出账。部分海外运营商和企业套餐提供后付eSIM。\n\n后付的优势是不需要预先确定数据量，用多少算多少，不用担心流量不够。对长期居住者和频繁出差的商务人士来说，省去了每次购买套餐的麻烦。\n\n但缺点也很明显。过度使用可能收到高额账单，尤其是国际数据漫游费用很容易飙升。而且大多需要信用审核和地址证明，不适合短期旅行者。"
      },
      {
        title: "为什么旅行者应该选预付",
        body: "对短中期海外旅行者来说，预付eSIM绝对是更好的选择，原因有三。第一，费用提前确定，可以把通信费准确纳入旅行预算，不会回国后收到意外高额账单。\n\n第二，无需签约手续。后付通常需要现场签约和提交证件，而预付可以在线即买即用，不会在机场浪费宝贵的假期时间。\n\n第三，无需担心取消。预付套餐到期自动失效，不存在忘记取消而持续扣费的风险。AutoWiFi的预付eSIM从购买到使用到结束，全部在应用内完成。"
      },
      {
        title: "如何选择合适的预付eSIM套餐",
        body: "选择预付eSIM时需注意以下几点。首先评估数据需求：社交媒体和消息为主每天300-500MB，加上地图和打车约1GB，看视频或远程办公2GB以上。建议选择比估计稍大的套餐留有余地。\n\n有效期要匹配旅行天数。7天套餐覆盖不了10天旅行，后3天就没有数据了。选择比旅行天数多1-2天的套餐，或选择支持延期的服务商。\n\nAutoWiFi提供3天到30天的多种有效期套餐。如果在有效期内用完数据，可以通过应用立即购买追加流量，最大限度减少旅途中断网的烦恼。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "预付eSIM流量用完了怎么办？", a: "流量用完后数据连接会停止。可以在WiFi环境下购买追加流量或新套餐。AutoWiFi支持一键追加购买。" },
      { q: "预付eSIM有有效期吗？", a: "有，所有预付eSIM都有有效期，根据套餐不同从3天到30天不等。到期后无论剩余多少流量都无法使用。" },
      { q: "后付eSIM在海外旅行中使用有风险吗？", a: "不算有风险，但费用难以预测。国际数据漫游费用容易飙升，建议设置使用上限或改用预付eSIM。" },
      { q: "预付eSIM未使用的流量能退款吗？", a: "一般不支持退款。因此选择合适大小的套餐很重要。旅途中流量不够可以追加购买。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi预付eSIM费用提前确定，无意外收费。流量用完一键追加。简单透明的海外通信体验。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "预付vs后付eSIM"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-prepaid-vs-postpaid", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="esim-prepaid-vs-postpaid" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
