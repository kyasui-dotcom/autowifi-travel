import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "比較を深める関連ガイド",
    articles: [
      { slug: "global-esim", title: "Global eSIM ガイド" },
      { slug: "esim-vs-roaming", title: "eSIM vs roaming 比較" },
      { slug: "japan-esim", title: "日本のeSIMガイド" },
      { slug: "usa-esim", title: "アメリカのeSIMガイド" },
      { slug: "best-esim-for-europe", title: "ヨーロッパ向けeSIM比較" },
      { slug: "best-esim-for-north-america", title: "北米向けeSIM比較" },
    ],
  },
  en: {
    title: "Keep Comparing by Trip Type",
    articles: [
      { slug: "global-esim", title: "Global eSIM Guide" },
      { slug: "esim-vs-roaming", title: "eSIM vs Roaming" },
      { slug: "japan-esim", title: "Best eSIM for Japan Travel" },
      { slug: "usa-esim", title: "Best eSIM for USA Travel" },
      { slug: "best-esim-for-europe", title: "Best eSIM for Europe" },
      { slug: "best-esim-for-north-america", title: "Best eSIM for North America" },
    ],
  },
  ko: {
    title: "계속 비교해 보기 좋은 가이드",
    articles: [
      { slug: "global-esim", title: "Global eSIM 가이드" },
      { slug: "esim-vs-roaming", title: "eSIM vs roaming 비교" },
      { slug: "japan-esim", title: "일본 eSIM 가이드" },
      { slug: "usa-esim", title: "미국 eSIM 가이드" },
      { slug: "best-esim-for-europe", title: "유럽 eSIM 비교" },
      { slug: "best-esim-for-north-america", title: "북미 eSIM 비교" },
    ],
  },
  zh: {
    title: "继续深入比较的指南",
    articles: [
      { slug: "global-esim", title: "Global eSIM 指南" },
      { slug: "esim-vs-roaming", title: "eSIM vs roaming 对比" },
      { slug: "japan-esim", title: "日本eSIM指南" },
      { slug: "usa-esim", title: "美国eSIM指南" },
      { slug: "best-esim-for-europe", title: "欧洲eSIM推荐对比" },
      { slug: "best-esim-for-north-america", title: "北美eSIM推荐对比" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "海外eSIMおすすめ比較 2026 - 失敗しない選び方",
    subtitle: "主要eSIMサービスを比較して、旅行に合うおすすめプランを見つけるためのガイド",
    intro: "海外eSIMをおすすめ基準で比較したい人向けに、Airalo、Holafly、AutoWiFiなど主要サービスを料金、対応国数、データ品質、使いやすさ、サポート体制の観点から整理しました。短期旅行、周遊旅行、出張など用途別の選び方も分かります。",
    sections: [
      {
        title: "eSIMプロバイダー選びのポイント",
        body: "eSIMプロバイダーを選ぶ際に重要な評価ポイントは5つあります。まず対応国数とエリアです。旅行先がカバーされていることはもちろん、複数国を周遊する場合はリージョナルプランの有無が重要です。次に料金体系として、データ容量あたりの単価、有効期間、追加データ購入の可否を確認しましょう。\n\n\"通信品質\"も見逃せないポイントです。現地の大手キャリアに直接接続するプロバイダーは、MVNOを経由するサービスより安定した速度が期待できます。アプリの使いやすさは、購入からインストール、データ残量の確認まで直感的に操作できるかが重要です。\n\n最後にカスタマーサポートです。海外旅行中にトラブルが発生した場合、24時間対応のチャットサポートがあるかどうかは安心感に大きく影響します。日本語サポートの有無も日本人旅行者にとっては重要な判断材料です。"
      },
      {
        title: "主要プロバイダーの特徴",
        body: "Airaloは対応国数が200以上と業界最大級で、個別国プランとリージョナルプランの両方を提供しています。料金は比較的リーズナブルですが、一部の国ではMVNO経由のため速度が安定しないことがあります。アプリの評価は高く、世界中で広く利用されています。\n\nHolaflyは無制限データプランに強みがあり、データ容量を気にせず使いたい旅行者に人気です。ただし、対応国数はAiraloより少なく、一部の国ではテザリングが制限される場合があります。料金は無制限プランとしてはリーズナブルな部類です。\n\nAutoWiFiは対応国数の広さと通信品質のバランスに優れたプロバイダーです。現地大手キャリアに直接接続するプランが多く、安定した高速通信が特徴です。日本語を含む多言語サポートに対応しており、アジア圏の旅行者に特に強い支持を得ています。料金プランも柔軟で、短期旅行から長期滞在まで幅広いニーズに対応しています。"
      },
      {
        title: "用途別おすすめプロバイダー",
        body: "短期旅行（1〜7日）でコストを重視するなら、各プロバイダーの小容量プランを比較しましょう。AutoWiFiは短期プランでもコストパフォーマンスが高く、設定も簡単なため初めてeSIMを使う方にもおすすめです。\n\n2週間以上の長期旅行や複数国の周遊には、リージョナルプランが最適です。AutoWiFiのアジア・ヨーロッパ周遊プランは、対象国の多さと通信品質で高い評価を得ています。データ容量に余裕のあるプランを選べば、国をまたいでも安心して使えます。\n\nデジタルノマドやリモートワーカーには、安定した高速通信と大容量データが必要です。ビデオ会議やクラウドツールを頻繁に使う場合は、AutoWiFiの無制限プランが現地キャリア直接接続による安定性で最も適しています。"
      },
      {
        title: "eSIMプロバイダーの料金比較",
        body: "料金を比較する際は、単純な価格だけでなく、1GBあたりの単価、有効期間、通信速度を総合的に判断することが重要です。最安プランを選んでも、MVNOを経由するため速度が遅ければ結果的に満足度は低くなります。\n\n一般的な料金レンジとして、1GB/7日間のプランは300〜800円、5GB/15日間は1,500〜3,000円、無制限/30日間は3,000〜8,000円程度です。AutoWiFiはこのレンジの中でも中〜上位の品質を中〜下位の価格帯で提供しており、コストパフォーマンスに優れています。\n\nまた、追加データの購入方法も重要です。旅行中にデータが足りなくなった場合、アプリから簡単にデータを追加購入できるプロバイダーを選んでおくと安心です。AutoWiFiではアプリ内でワンタップでデータ追加が可能です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMプロバイダーによって通信速度は違いますか？", a: "はい、大きく異なります。現地キャリアに直接接続するプロバイダー（AutoWiFiなど）は安定した高速通信が可能ですが、MVNO経由のサービスでは混雑時に速度が低下することがあります。" },
      { q: "複数のeSIMプロバイダーを同時に使えますか？", a: "端末がデュアルeSIMに対応していれば、2つのeSIMプロファイルを同時にインストールすることは可能です。ただし、同時に通信できるのは1つのプランのみです。" },
      { q: "旅行中にプロバイダーを変更できますか？", a: "はい、別のプロバイダーのeSIMを新たにインストールして切り替えることができます。ただし、以前のプランの未使用データは返金されない場合が多いので、事前に適切なプランを選ぶことが重要です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiなら、200以上の国と地域に対応した高品質eSIMを手頃な価格で。多言語サポートで安心の旅行を。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "海外eSIMおすすめ比較"
  },
  en: {
    title: "Best Travel eSIM Providers 2026 - International eSIM Comparison Guide",
    subtitle: "Compare top international eSIM providers by price, coverage, quality, hotspot support, and support",
    intro: "Looking for the best travel eSIM or the best international eSIM provider? This guide compares leading brands including Airalo, Holafly, and AutoWiFi across pricing, coverage, setup experience, hotspot support, and support quality so you can choose the right service for your trip.",
    sections: [
      {
        title: "Key Factors When Choosing an eSIM Provider",
        body: "Five factors matter most when evaluating eSIM providers. First is country coverage and regional plans. Your destination must be supported, and multi-country travelers need providers with regional or global plans. Second is the pricing structure: check per-GB costs, validity periods, and whether you can purchase additional data mid-trip.\n\nNetwork quality is equally important. Providers that connect directly to major local carriers deliver more consistent speeds than those routing through MVNOs. App usability affects your daily experience, covering everything from purchasing to installation to monitoring remaining data.\n\nFinally, customer support can make or break your travel experience. When connectivity issues arise abroad, having 24/7 live chat support is invaluable. Multi-language support is a bonus for non-English-speaking travelers."
      },
      {
        title: "Provider Overview",
        body: "Airalo covers 200+ countries and offers both local and regional plans. Pricing is competitive, though some destinations route through MVNOs, which can result in inconsistent speeds. The app is well-designed and widely used by travelers worldwide.\n\nHolafly specializes in unlimited data plans, making it popular with heavy data users who want to avoid tracking their usage. However, country coverage is narrower than Airalo, and tethering may be restricted on some plans. Pricing is reasonable for an unlimited offering.\n\nAutoWiFi combines broad coverage with strong network quality. Many of its plans connect directly to major local carriers, resulting in stable high-speed connections. It offers multi-language support including Japanese, Korean, and Chinese, making it particularly popular with Asian travelers. Flexible pricing covers everything from short trips to extended stays, and the straightforward app makes setup effortless even for first-time eSIM users."
      },
      {
        title: "Best Provider by Use Case",
        body: "For short trips (1-7 days) where cost is the priority, compare small data packages across providers. AutoWiFi offers strong value even on short-term plans, with a simple setup process that is ideal for eSIM newcomers.\n\nFor longer trips (2+ weeks) or multi-country itineraries, regional plans are essential. AutoWiFi's Asia and Europe regional plans consistently receive positive reviews for both coverage breadth and connection reliability. Choosing a plan with generous data allowance ensures seamless connectivity across borders.\n\nDigital nomads and remote workers need reliable high-speed data for video calls and cloud tools. AutoWiFi's unlimited plans stand out here because direct local carrier connections provide the stability that virtual meetings demand."
      },
      {
        title: "Pricing Comparison",
        body: "When comparing prices, look beyond the headline figure. Consider per-GB cost, validity period, and connection quality together. The cheapest plan may route through MVNOs with slower speeds, leading to frustration despite the savings.\n\nTypical price ranges are roughly $3-8 for 1GB/7 days, $10-25 for 5GB/15 days, and $25-60 for unlimited/30 days. AutoWiFi positions itself in the mid-range on price while delivering upper-tier quality through direct carrier connections, making it one of the best value propositions in the market.\n\nAlso consider how easy it is to add data during your trip. Running out of data abroad is stressful, so choose a provider whose app lets you top up instantly. AutoWiFi supports one-tap data top-ups directly within its app."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Do eSIM providers differ in connection speed?", a: "Yes, significantly. Providers like AutoWiFi that connect directly to local carriers offer stable high speeds, while MVNO-based services may experience slower speeds during peak hours." },
      { q: "Can I use multiple eSIM providers at once?", a: "If your phone supports dual eSIM, you can install two eSIM profiles simultaneously. However, only one data plan can be active at a time. This is useful for having a backup plan ready." },
      { q: "Can I switch providers mid-trip?", a: "Yes, you can install a new eSIM from a different provider and switch. However, unused data from your previous plan is generally non-refundable, so choosing the right plan upfront is important." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi delivers premium eSIM quality across 200+ countries at competitive prices. Multi-language support for worry-free travel.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Best Travel eSIM Providers"
  },
  ko: {
    title: "추천 여행 eSIM 비교 2026 - 실패하지 않는 선택법",
    subtitle: "주요 여행 eSIM 서비스를 가격, 커버리지, 품질, 지원 기준으로 비교",
    intro: "여행용 eSIM을 추천 기준으로 비교하고 싶은 분을 위해 Airalo, Holafly, AutoWiFi 등 주요 서비스를 요금, 대응 국가, 데이터 품질, 사용 편의성, 지원 체계 관점에서 정리했습니다.",
    sections: [
      {
        title: "eSIM 프로바이더 선택 시 핵심 포인트",
        body: "eSIM 프로바이더 선택 시 중요한 평가 포인트는 5가지입니다. 첫째 '대응 국가와 지역'으로, 여행지가 커버되는지는 물론 여러 나라를 여행하는 경우 리전 플랜의 유무가 중요합니다. 둘째 '요금 체계'로 데이터 용량당 단가, 유효 기간, 추가 데이터 구매 가능 여부를 확인하세요.\n\n'통신 품질'도 중요한 포인트입니다. 현지 대형 통신사에 직접 연결하는 프로바이더는 MVNO를 경유하는 서비스보다 안정적인 속도를 기대할 수 있습니다. '앱 사용 편의성'은 구매부터 설치, 잔여 데이터 확인까지 직관적으로 조작할 수 있는지가 핵심입니다.\n\n마지막으로 '고객 지원'입니다. 해외 여행 중 문제가 발생했을 때 24시간 대응 채팅 지원이 있는지 여부는 안심감에 큰 영향을 미칩니다."
      },
      {
        title: "주요 프로바이더 특징",
        body: "Airalo는 대응 국가가 200개 이상으로 업계 최대 규모이며, 개별 국가 플랜과 리전 플랜을 모두 제공합니다. 요금은 비교적 합리적이지만, 일부 국가에서는 MVNO를 경유하여 속도가 불안정할 수 있습니다.\n\nHolafly는 무제한 데이터 플랜에 강점이 있어, 데이터 용량을 신경 쓰지 않고 사용하고 싶은 여행자에게 인기입니다. 다만 대응 국가 수는 Airalo보다 적고, 일부 국가에서는 테더링이 제한될 수 있습니다.\n\nAutoWiFi는 대응 국가의 폭과 통신 품질의 균형이 우수한 프로바이더입니다. 현지 대형 통신사에 직접 연결하는 플랜이 많아 안정적인 고속 통신이 특징입니다. 한국어를 포함한 다국어 지원에 대응하며, 아시아권 여행자에게 특히 높은 지지를 받고 있습니다."
      },
      {
        title: "용도별 추천 프로바이더",
        body: "단기 여행(1~7일)에서 비용을 중시한다면 각 프로바이더의 소용량 플랜을 비교하세요. AutoWiFi는 단기 플랜에서도 가성비가 높고 설정도 간편하여 처음 eSIM을 사용하는 분에게도 추천합니다.\n\n2주 이상의 장기 여행이나 여러 국가 여행에는 리전 플랜이 최적입니다. AutoWiFi의 아시아·유럽 로밍 플랜은 대상 국가의 다양성과 통신 품질에서 높은 평가를 받고 있습니다.\n\n디지털 노마드나 원격 근무자에게는 안정적인 고속 통신과 대용량 데이터가 필요합니다. AutoWiFi의 무제한 플랜은 현지 통신사 직접 연결로 인한 안정성에서 화상 회의에 가장 적합합니다."
      },
      {
        title: "요금 비교",
        body: "요금을 비교할 때는 단순한 가격뿐 아니라 1GB당 단가, 유효 기간, 통신 속도를 종합적으로 판단하는 것이 중요합니다. 최저가 플랜을 선택해도 MVNO 경유로 속도가 느리면 만족도가 떨어집니다.\n\n일반적인 요금대로 1GB/7일 플랜은 3,000~8,000원, 5GB/15일은 10,000~25,000원, 무제한/30일은 25,000~60,000원 정도입니다. AutoWiFi는 중간 가격대에서 상위 품질을 제공하여 가성비가 뛰어납니다.\n\n여행 중 데이터 추가 구매 방법도 중요합니다. 해외에서 데이터가 부족해지면 스트레스이므로, 앱에서 간편하게 데이터를 추가할 수 있는 프로바이더를 선택하세요. AutoWiFi는 앱 내에서 원탭으로 데이터 추가가 가능합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "eSIM 프로바이더에 따라 통신 속도가 다른가요?", a: "네, 크게 다릅니다. AutoWiFi처럼 현지 통신사에 직접 연결하는 프로바이더는 안정적인 고속 통신이 가능하지만, MVNO 경유 서비스는 혼잡 시간대에 속도가 저하될 수 있습니다." },
      { q: "여러 eSIM 프로바이더를 동시에 사용할 수 있나요?", a: "듀얼 eSIM을 지원하는 단말이라면 2개의 eSIM 프로필을 동시에 설치할 수 있습니다. 다만 동시에 데이터 통신이 가능한 것은 하나의 플랜뿐입니다." },
      { q: "여행 중에 프로바이더를 변경할 수 있나요?", a: "네, 다른 프로바이더의 eSIM을 새로 설치하여 전환할 수 있습니다. 다만 이전 플랜의 미사용 데이터는 환불되지 않는 경우가 많으므로 사전에 적절한 플랜을 선택하는 것이 중요합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi는 200개 이상의 국가에서 고품질 eSIM을 합리적인 가격에 제공합니다. 다국어 지원으로 안심 여행을.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "추천 여행 eSIM 비교"
  },
  zh: {
    title: "旅行eSIM推荐对比 2026 - 如何选到更适合的方案",
    subtitle: "从价格、覆盖范围、品质与支持全面比较主流旅行eSIM服务",
    intro: "如果您想比较值得推荐的旅行eSIM，这篇文章会从资费、覆盖国家、数据质量、易用性和支持体验等角度，对Airalo、Holafly、AutoWiFi等主流服务进行整理。",
    sections: [
      {
        title: "选择eSIM服务商的关键要素",
        body: "选择eSIM服务商时有五个重要评估要素。首先是'覆盖国家和区域'，确保旅行目的地在覆盖范围内，多国旅行者还需关注是否有区域套餐。其次是'资费体系'，包括每GB单价、有效期和是否支持中途加购数据。\n\n'网络质量'同样不可忽视。直连当地主要运营商的服务商比通过MVNO转接的服务商通常能提供更稳定的速度。'应用易用性'涵盖从购买到安装、查看剩余流量的整个体验是否直观便捷。\n\n最后是'客户支持'。在海外旅行中遇到问题时，是否有24小时在线客服会极大影响使用体验。多语言支持对非英语旅行者尤为重要。"
      },
      {
        title: "主要服务商特点",
        body: "Airalo覆盖200多个国家，是业内规模最大的之一，提供单国和区域套餐。价格比较实惠，但部分国家通过MVNO转接，速度可能不太稳定。应用设计良好，在全球旅行者中广泛使用。\n\nHolafly以无限流量套餐见长，受到不想操心流量的旅行者欢迎。但覆盖国家比Airalo少，部分国家可能限制热点共享。作为无限流量产品，价格较为合理。\n\nAutoWiFi在覆盖广度和网络质量之间取得了出色的平衡。许多套餐直连当地主要运营商，提供稳定的高速连接。支持包括中文在内的多语言服务，在亚洲旅行者中特别受欢迎。灵活的价格方案覆盖短途到长期需求，简洁的应用让eSIM新手也能轻松上手。"
      },
      {
        title: "按使用场景推荐",
        body: "短途旅行（1-7天）且注重成本的话，比较各服务商的小流量套餐。AutoWiFi即使在短期套餐上也有很高的性价比，设置简单，非常适合首次使用eSIM的用户。\n\n两周以上的长途旅行或多国行程，区域套餐是最佳选择。AutoWiFi的亚洲和欧洲漫游套餐在覆盖广度和连接可靠性方面获得一致好评。选择流量充裕的套餐可确保跨境无忧。\n\n数字游民和远程工作者需要稳定的高速数据来支持视频会议和云端工具。AutoWiFi的无限流量套餐因直连本地运营商带来的稳定性，最适合需要进行视频会议的用户。"
      },
      {
        title: "价格对比",
        body: "比较价格时，不要只看标价。需要综合考虑每GB成本、有效期和连接质量。最便宜的套餐可能通过MVNO转接导致速度较慢，虽然省了钱但体验可能不佳。\n\n一般价格范围：1GB/7天约20-50元，5GB/15天约70-180元，无限流量/30天约180-450元。AutoWiFi在中等价位提供高端品质，通过直连运营商实现了出色的性价比。\n\n旅途中追加数据的便捷性也很重要。在国外流量用完很头疼，所以要选择能在应用内便捷充值的服务商。AutoWiFi支持在应用内一键追加流量。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "不同eSIM服务商的网速有差异吗？", a: "有，差异很大。像AutoWiFi这样直连本地运营商的服务商能提供稳定的高速网络，而通过MVNO的服务在高峰时段速度可能下降。" },
      { q: "可以同时使用多个eSIM服务商吗？", a: "如果手机支持双eSIM，可以同时安装两个eSIM配置文件。但同时只能有一个数据套餐处于活跃状态。这可以用来准备备用方案。" },
      { q: "旅途中能更换服务商吗？", a: "可以，安装新服务商的eSIM即可切换。但之前套餐的未用流量一般不退款，所以提前选择合适的套餐很重要。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi在200多个国家提供优质eSIM服务，价格合理。多语言支持让您旅行无忧。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "旅行eSIM推荐对比"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/best-esim-providers", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="best-esim-providers" content={CONTENT[loc]} relatedArticles={RELATED[loc].articles} relatedTitle={RELATED[loc].title} />;
}
