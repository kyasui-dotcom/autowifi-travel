import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "比較を深める関連ガイド",
    articles: [
      { slug: "wifi-vs-esim", title: "モバイルWiFi vs eSIM" },
      { slug: "first-time-esim", title: "初めてのeSIM完全ガイド" },
      { slug: "esim-prepaid-vs-postpaid", title: "プリペイド vs ポストペイドeSIM" },
      { slug: "international-calling-esim", title: "eSIMでの国際通話" },
    ],
  },
  en: {
    title: "Compare More Before You Replace Your SIM",
    articles: [
      { slug: "wifi-vs-esim", title: "Mobile WiFi vs eSIM" },
      { slug: "first-time-esim", title: "First-Time eSIM Guide" },
      { slug: "esim-prepaid-vs-postpaid", title: "Prepaid vs Postpaid eSIM" },
      { slug: "international-calling-esim", title: "International Calls with eSIM" },
    ],
  },
  ko: {
    title: "계속 비교해 보기 좋은 가이드",
    articles: [
      { slug: "wifi-vs-esim", title: "포켓 WiFi vs eSIM" },
      { slug: "first-time-esim", title: "처음 쓰는 eSIM 가이드" },
      { slug: "esim-prepaid-vs-postpaid", title: "선불 vs 후불 eSIM" },
      { slug: "international-calling-esim", title: "eSIM 국제 전화" },
    ],
  },
  zh: {
    title: "继续深入比较的指南",
    articles: [
      { slug: "wifi-vs-esim", title: "随身WiFi vs eSIM" },
      { slug: "first-time-esim", title: "第一次使用eSIM指南" },
      { slug: "esim-prepaid-vs-postpaid", title: "预付vs后付eSIM" },
      { slug: "international-calling-esim", title: "eSIM国际通话" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIM vs 物理SIMカード：違いと選び方を徹底比較",
    subtitle: "技術・利便性・コスト面からeSIMとSIMカードの違いを解説",
    intro: "海外旅行や日常利用でeSIMと物理SIMカードの違いは何？と疑問に思う方が増えています。この記事では、技術的な仕組みから、使い勝手、料金、セキュリティまで両者を徹底比較し、あなたに最適な選択肢を見つけるお手伝いをします。本記事では技術・利便性・コスト面からeSIMとSIMカードの違いを解説・基本的な仕組みの違い・利便性の比較などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "基本的な仕組みの違い",
        body: "物理SIMカードは、端末に挿入する小さなICチップです。nano-SIM、micro-SIMなどのサイズがあり、キャリアの情報が書き込まれています。端末を変更する場合はSIMカードを差し替えるだけで回線を移行できます。世界中のほぼすべてのスマートフォンが物理SIMに対応しているため、互換性の心配がほとんどありません。\n\neSIM（Embedded SIM）は、端末のマザーボードに直接組み込まれたチップです。物理的な交換は不要で、ソフトウェアを通じてキャリアのプロファイルをダウンロードして使用します。QRコードを読み取るか、キャリアのアプリから設定するだけで回線を有効化できます。\n\n最大の違いは物理的な取り扱いが必要かどうかです。SIMカードは紛失や破損のリスクがありますが、eSIMは端末に内蔵されているため、そのようなリスクがありません。一方で、eSIMは対応端末が必要という制約があります。"
      },
      {
        title: "利便性の比較",
        body: "eSIMの最大の利点は、手続きのスピードと手軽さです。オンラインで購入してQRコードをスキャンするだけで、数分以内に設定が完了します。旅行の出発直前でもすぐに準備でき、現地のショップに行く必要もありません。また、複数のプロファイルを保存できるため、旅行先ごとに異なるプランを切り替えて使えます。\n\n物理SIMカードは、購入場所に行く手間がかかります。空港の販売カウンターや現地のキャリアショップで購入するのが一般的ですが、言語の壁やショップの営業時間に制約されることがあります。また、SIMカードを入れ替える際にピンが必要で、小さなカードを紛失するリスクもあります。\n\nただし、物理SIMカードにも利点があります。eSIM非対応の端末でも使えること、友人に貸したり別の端末に移したりが簡単なこと、そして設定の手順がシンプルで技術に不慣れな方でも扱いやすい点です。"
      },
      {
        title: "料金とコストの比較",
        body: "eSIMと物理SIMカードの料金はプロバイダーによって異なりますが、一般的にeSIMの方がやや安い傾向にあります。eSIMは物理カードの製造・流通コストがかからないため、その分がプラン価格に反映されることが多いです。また、オンライン専売のため、実店舗の運営コストも削減されています。\n\n物理SIMカードは、空港での購入時にプレミアム価格が上乗せされることがあります。一方で、現地のキャリアショップで直接購入すれば、地元向けの格安プランが見つかることもあります。ただし、現地ショップでの購入は言語の問題やパスポートの提示が求められるなど、手間がかかる場合があります。\n\n長期的に見ると、eSIMは複数のプランを手軽に比較・切り替えられるため、最もコストパフォーマンスの良いプランを選びやすいメリットがあります。物理SIMの場合、一度購入すると別のプランへの切り替えには新しいSIMの購入が必要です。"
      },
      {
        title: "セキュリティとプライバシー",
        body: "セキュリティ面ではeSIMに明確な優位性があります。物理SIMカードは盗難や不正コピー（SIMスワップ攻撃）のリスクがありますが、eSIMは端末に内蔵されているため、物理的に取り出すことができません。紛失した場合でも、リモートでプロファイルを無効化できます。\n\neSIMはプロファイルの暗号化により、不正な複製が極めて困難です。従来のSIMカードよりも高度なセキュリティプロトコルが適用されており、キャリアとの通信も暗号化されています。企業のセキュリティポリシーが厳格な場合、eSIMの方が推奨されるケースが増えています。\n\nプライバシーの観点では、どちらも同等のレベルで通信内容が保護されます。ただし、eSIMは物理的な差し替えができないため、端末を処分する際にはプロファイルの完全削除を忘れないようにしましょう。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMと物理SIMカードを同時に使えますか？", a: "はい、多くの最新スマートフォンはデュアルSIM対応で、eSIMと物理SIMカードを同時に使用できます。例えば、普段の電話番号は物理SIMで維持しながら、旅行用のデータ通信はeSIMで利用するといった使い分けが可能です。" },
      { q: "eSIMに切り替えたら物理SIMは不要になりますか？", a: "必ずしもそうとは限りません。eSIMをメインで使いつつ、バックアップとして物理SIMを保持する方も多いです。また、eSIM非対応の端末に一時的に回線を移す場合には物理SIMが必要です。" },
      { q: "eSIMの方が通信品質は良いですか？", a: "通信品質自体はeSIMと物理SIMで違いはありません。どちらも同じキャリアのネットワークに接続するため、通信速度や安定性は同等です。違いは主に利便性とセキュリティ面にあります。" }
    ],
    ctaTitle: "eSIMで快適な旅を始めよう",
    ctaDesc: "物理SIMの面倒な手続きは不要。AutoWiFi eSIMなら、オンラインで即購入・即設定。200以上の国と地域に対応しています。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIM vs 物理SIMカード"
  },
  en: {
    title: "eSIM vs Physical SIM Card: Complete Comparison Guide",
    subtitle: "Technology, convenience, cost, and security compared side by side",
    intro: "More people are asking: what is the difference between an eSIM and a traditional SIM card? This article provides a thorough comparison covering the technology, ease of use, pricing, and security of both options to help you make the best choice for your needs.",
    sections: [
      {
        title: "How They Work: The Technical Difference",
        body: "A physical SIM card is a small IC chip that you insert into your phone. It comes in sizes like nano-SIM and micro-SIM, with carrier information written on the chip. To switch carriers or devices, you simply swap the card. Almost every smartphone in the world supports physical SIM, so compatibility is rarely an issue.\n\nAn eSIM (Embedded SIM) is a chip built directly into the phone's motherboard. No physical swapping is needed — you download a carrier profile through software by scanning a QR code or using a carrier app. Activation takes just minutes and can be done entirely online.\n\nThe fundamental difference comes down to physical handling. SIM cards can be lost, damaged, or stolen, while eSIMs are built into the device and face none of these risks. However, eSIMs require a compatible device, which limits their use on older phones."
      },
      {
        title: "Convenience Comparison",
        body: "The biggest advantage of eSIM is speed and simplicity. Purchase online, scan a QR code, and you are connected within minutes. You can set up right before departure with no need to visit a local shop, and you can store multiple profiles to switch between plans for different destinations.\n\nPhysical SIM cards require a trip to a sales counter — at the airport or a local carrier store. Language barriers, store hours, and the need for a SIM ejector tool can all create friction. Small SIM cards are also easy to misplace during travel.\n\nThat said, physical SIMs have their own advantages. They work in any phone regardless of age, they are easy to lend to a friend or move to another device, and the setup is straightforward even for people who are not comfortable with phone settings."
      },
      {
        title: "Pricing and Cost Comparison",
        body: "While prices vary by provider, eSIMs tend to be slightly cheaper overall. Without the cost of manufacturing and distributing physical cards, providers can pass savings on to customers. eSIM plans are also sold exclusively online, eliminating retail overhead.\n\nPhysical SIM cards purchased at airports often carry a premium markup. Buying from a local carrier shop can sometimes yield better local deals, but this comes with language challenges and potential ID requirements.\n\nOver the long term, eSIM makes it easier to compare plans across providers and switch on the fly, helping you consistently find the best value. With physical SIMs, switching means buying a completely new card each time."
      },
      {
        title: "Security and Privacy",
        body: "eSIM has a clear security advantage. Physical SIM cards are vulnerable to theft and SIM swap attacks, but eSIMs cannot be physically removed from the device. If your phone is lost, you can remotely disable the eSIM profile.\n\neSIM profiles are encrypted, making unauthorized duplication extremely difficult. Advanced security protocols protect communication between the device and carrier. For organizations with strict security policies, eSIM is increasingly the recommended option.\n\nBoth eSIM and physical SIM provide the same level of communication privacy. However, when disposing of a device, remember to completely delete the eSIM profile to prevent any residual data access."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use eSIM and physical SIM at the same time?", a: "Yes, most modern smartphones support dual SIM, allowing you to use both an eSIM and a physical SIM card simultaneously. For example, keep your home number on the physical SIM for calls and use the eSIM for travel data." },
      { q: "If I switch to eSIM, do I still need a physical SIM?", a: "Not necessarily, but many people keep a physical SIM as backup. It can be useful if you need to temporarily move your line to a device that does not support eSIM." },
      { q: "Is eSIM connection quality better than physical SIM?", a: "Connection quality is the same for both. They connect to the same carrier network, so speed and reliability are identical. The differences lie in convenience and security." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Skip the hassle of physical SIM cards. AutoWiFi eSIM lets you purchase and set up instantly online, covering 200+ countries and regions.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "eSIM vs SIM Card"
  },
  ko: {
    title: "eSIM vs 물리 SIM 카드: 차이점과 선택 가이드",
    subtitle: "기술·편의성·비용·보안 관점에서 완벽 비교",
    intro: "해외여행이나 일상에서 'eSIM과 물리 SIM 카드의 차이는 무엇인가?'라는 의문을 가지는 분이 늘고 있습니다. 이 기사에서는 기술적 구조부터 사용 편의성, 요금, 보안까지 양쪽을 철저히 비교합니다.",
    sections: [
      {
        title: "기본 구조의 차이",
        body: "물리 SIM 카드는 단말기에 삽입하는 작은 IC 칩입니다. nano-SIM, micro-SIM 등의 크기가 있으며 통신사 정보가 기록되어 있습니다. 단말기를 변경할 때 SIM 카드를 교체하면 회선을 이전할 수 있습니다. 전 세계 거의 모든 스마트폰이 물리 SIM에 대응합니다.\n\neSIM(Embedded SIM)은 단말기의 메인보드에 직접 내장된 칩입니다. 물리적 교환 없이 소프트웨어를 통해 통신사 프로필을 다운로드하여 사용합니다. QR 코드를 읽거나 통신사 앱에서 설정하면 됩니다.\n\n가장 큰 차이는 '물리적 취급'의 필요 여부입니다. SIM 카드는 분실이나 파손 위험이 있지만 eSIM은 내장되어 있어 그런 위험이 없습니다. 다만 eSIM은 대응 단말기가 필요합니다."
      },
      {
        title: "편의성 비교",
        body: "eSIM의 최대 장점은 빠르고 간편한 절차입니다. 온라인으로 구매하고 QR 코드를 스캔하면 몇 분 안에 설정이 완료됩니다. 출발 직전에도 바로 준비할 수 있고 현지 매장을 방문할 필요가 없습니다. 여러 프로필을 저장하여 여행지별로 다른 플랜을 전환할 수 있습니다.\n\n물리 SIM 카드는 구매 장소에 가야 하는 수고가 있습니다. 공항 판매 카운터나 현지 매장에서 구매하는 것이 일반적이지만 언어 장벽이나 영업시간 제약이 있을 수 있습니다. SIM 교체 시 핀이 필요하고 작은 카드를 분실할 위험도 있습니다.\n\n다만 물리 SIM도 장점이 있습니다. eSIM 미대응 단말기에서도 사용 가능하고, 친구에게 빌려주거나 다른 기기로 옮기기 쉽고, 기술에 익숙하지 않은 분도 쉽게 다룰 수 있습니다."
      },
      {
        title: "요금과 비용 비교",
        body: "eSIM과 물리 SIM의 요금은 제공업체에 따라 다르지만, 일반적으로 eSIM이 약간 저렴한 경향이 있습니다. eSIM은 물리 카드의 제조·유통 비용이 들지 않아 플랜 가격에 반영되는 경우가 많습니다.\n\n물리 SIM은 공항에서 구매 시 프리미엄 가격이 붙는 경우가 있습니다. 현지 매장에서 직접 구매하면 저렴한 현지 플랜을 찾을 수도 있지만 언어 문제나 신분증 제시가 필요할 수 있습니다.\n\n장기적으로 보면 eSIM은 여러 플랜을 쉽게 비교·전환할 수 있어 가성비 좋은 플랜을 선택하기 쉽습니다. 물리 SIM은 플랜을 바꾸려면 새 SIM을 구매해야 합니다."
      },
      {
        title: "보안과 프라이버시",
        body: "보안 면에서 eSIM이 확실히 우위입니다. 물리 SIM은 도난이나 SIM 스왑 공격 위험이 있지만 eSIM은 단말기에 내장되어 물리적으로 꺼낼 수 없습니다. 분실해도 원격으로 프로필을 비활성화할 수 있습니다.\n\neSIM 프로필은 암호화되어 무단 복제가 매우 어렵습니다. 기존 SIM보다 고급 보안 프로토콜이 적용되어 있어 기업의 엄격한 보안 정책에서도 eSIM이 권장되는 추세입니다.\n\n프라이버시 측면에서는 양쪽 모두 동등한 수준으로 통신 내용이 보호됩니다. 다만 단말기를 처분할 때 eSIM 프로필의 완전 삭제를 잊지 마세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "eSIM과 물리 SIM을 동시에 사용할 수 있나요?", a: "네, 대부분의 최신 스마트폰은 듀얼 SIM을 지원하여 eSIM과 물리 SIM을 동시에 사용할 수 있습니다. 예를 들어 기존 번호는 물리 SIM으로, 여행 데이터는 eSIM으로 사용할 수 있습니다." },
      { q: "eSIM으로 전환하면 물리 SIM은 필요 없나요?", a: "반드시 그렇지는 않습니다. eSIM을 주로 사용하면서 백업으로 물리 SIM을 보관하는 분도 많습니다. eSIM 미대응 기기에 임시로 회선을 옮길 때 물리 SIM이 필요합니다." },
      { q: "eSIM이 통신 품질이 더 좋나요?", a: "통신 품질 자체는 eSIM과 물리 SIM에 차이가 없습니다. 같은 통신사 네트워크에 연결되므로 속도와 안정성은 동일합니다. 차이는 주로 편의성과 보안에 있습니다." }
    ],
    ctaTitle: "eSIM으로 편안한 여행을 시작하세요",
    ctaDesc: "물리 SIM의 번거로운 절차는 필요 없습니다. AutoWiFi eSIM이라면 온라인 즉시 구매·설정. 200개 이상의 국가에 대응합니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM vs 물리 SIM"
  },
  zh: {
    title: "eSIM vs 实体SIM卡：全面对比与选择指南",
    subtitle: "从技术·便利性·成本·安全性四个维度深度比较",
    intro: "越来越多的人在问：eSIM和传统SIM卡到底有什么区别？本文从技术原理、使用便利性、价格和安全性等方面进行全面对比，帮助您做出最适合自己的选择。",
    sections: [
      {
        title: "基本原理的区别",
        body: "实体SIM卡是一个插入手机的小型IC芯片，有nano-SIM、micro-SIM等不同尺寸，芯片上写入了运营商信息。更换手机时只需插拔SIM卡即可转移线路。全球几乎所有智能手机都支持实体SIM，兼容性基本不成问题。\n\neSIM（嵌入式SIM）是直接集成在手机主板上的芯片。无需物理更换，通过软件下载运营商配置文件即可使用。扫描QR码或通过运营商应用设置即可激活线路。\n\n最大的区别在于是否需要物理操作。SIM卡有丢失或损坏的风险，而eSIM内置于设备中，不存在这些问题。但eSIM需要兼容设备这一限制条件。"
      },
      {
        title: "便利性对比",
        body: "eSIM最大的优势是速度快、操作简便。在线购买后扫描QR码，几分钟内即可完成设置。即使出发前最后一刻也能立即准备，无需前往实体店。还可以保存多个配置文件，在不同目的地间切换不同套餐。\n\n实体SIM卡需要前往销售点购买。通常在机场柜台或当地运营商门店购买，但可能受语言障碍和营业时间限制。更换SIM时需要取卡针，小卡片也容易丢失。\n\n不过实体SIM也有其优势：不限设备型号，可以借给朋友或转移到其他设备，设置步骤简单，技术不熟练的人也容易操作。"
      },
      {
        title: "价格与成本对比",
        body: "eSIM和实体SIM的价格因提供商而异，但总体来说eSIM略微便宜。eSIM没有实体卡的制造和分销成本，这部分节省通常会反映在套餐价格中。同时线上专售也节省了实体店运营成本。\n\n实体SIM在机场购买时往往有溢价。在当地运营商门店直接购买有时能找到更便宜的本地套餐，但会遇到语言问题和身份证明要求。\n\n从长期来看，eSIM更容易在不同提供商间比较和切换套餐，帮助您持续找到性价比最高的方案。实体SIM换套餐就意味着要重新购买。"
      },
      {
        title: "安全性与隐私",
        body: "在安全性方面，eSIM有明显优势。实体SIM卡存在被盗和SIM交换攻击的风险，但eSIM内置于设备中无法物理取出。手机丢失时可以远程禁用eSIM配置文件。\n\neSIM配置文件经过加密，未经授权的复制极其困难。采用比传统SIM更高级的安全协议，设备与运营商之间的通信也是加密的。对于安全政策严格的企业，eSIM正在成为推荐选择。\n\n在隐私方面，两者对通信内容的保护水平相同。不过处置设备时，请务必完全删除eSIM配置文件。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM和实体SIM可以同时使用吗？", a: "可以，大多数现代智能手机支持双SIM，允许同时使用eSIM和实体SIM卡。例如用实体SIM保持日常号码通话，用eSIM进行旅行数据通信。" },
      { q: "改用eSIM后还需要实体SIM吗？", a: "不一定。很多人在主要使用eSIM的同时保留实体SIM作为备份。当需要临时将线路转移到不支持eSIM的设备时，实体SIM仍然有用。" },
      { q: "eSIM的通信质量比实体SIM好吗？", a: "通信质量本身没有差别。两者连接的是同一运营商网络，速度和稳定性相同。差异主要体现在便利性和安全性方面。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "告别实体SIM的繁琐手续。AutoWiFi eSIM支持在线即时购买和设置，覆盖200多个国家和地区。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM vs 实体SIM卡"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-vs-sim-card", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="esim-vs-sim-card" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
