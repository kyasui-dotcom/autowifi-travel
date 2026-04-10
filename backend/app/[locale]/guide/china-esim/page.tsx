import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "中国eSIMガイド - VPN問題・WeChat対策・上海/北京の通信事情",
    subtitle: "グレートファイアウォールの国でもスマートに接続する方法",
    intro: "中国旅行で最も注意すべきポイントの一つがインターネット接続環境です。中国ではグレートファイアウォール（金盾）により、Google、YouTube、Instagram、LINE、WhatsAppなど多くの海外サービスがブロックされています。eSIMプランの選び方次第でこの制限を回避できる場合があります。上海や北京の最新通信事情と、中国旅行で快適にインターネットを使うためのポイントを解説します。",
    sections: [
      {
        title: "中国のインターネット規制（グレートファイアウォール）",
        body: "中国では政府によるインターネット検閲システムグレートファイアウォール（金盾）が運用されており、Google検索、Gmail、Google Maps、YouTube、Facebook、Instagram、X（Twitter）、LINE、WhatsApp、Telegramなどの主要な海外サービスにアクセスできません。\n\n中国国内のキャリア（China Mobile、China Unicom、China Telecom）の回線を使用する場合、これらの制限が適用されます。そのため、中国旅行では一般的なeSIMプランを選ぶだけでなく、VPN対応やローミング経由でのアクセスが可能なプランを選ぶことが非常に重要です。AutoWiFi eSIMの中国プランは、香港ローミングを経由するため、Google、LINE、Instagramなどのサービスに制限なくアクセスできます。"
      },
      {
        title: "WeChatと中国デジタル生活",
        body: "中国ではWeChat（微信）があらゆる場面で使われています。メッセージング、SNS、モバイル決済（WeChat Pay）、ミニプログラム（アプリ内アプリ）など、中国でのデジタル生活はWeChatを中心に回っています。外国人旅行者もWeChatをインストールしておくと、ホテルや店舗とのコミュニケーションがスムーズになります。\n\nWeChat Payは外国人のクレジットカードでもリンクが可能になり、以前より利用しやすくなっています。また、Alipay（支付宝）も外国人向けの利用が拡大しています。これらのモバイル決済を利用するには安定したデータ通信が必要です。中国では現金やクレジットカードが使えない場面も増えているため、モバイル決済の準備は重要です。"
      },
      {
        title: "上海・北京の通信環境",
        body: "上海と北京は中国の中でも最も通信インフラが発達した都市です。5Gネットワークの展開が進んでおり、都市部では非常に高速な通信が可能です。地下鉄構内でも4G/5G通信が利用可能で、移動中のネット接続に困ることはありません。\n\n上海では外灘（バンド）、南京路、豫園、新天地などの観光エリアで安定した通信が利用できます。北京では故宮（紫禁城）、天安門広場、万里の長城（八達嶺）、798芸術区などでもカバレッジは良好です。万里の長城は山間部にありますが、八達嶺や慕田峪などの主要セクションでは4G通信が可能です。\n\n広州、深セン、成都、西安などの地方都市でも4G/5Gカバレッジは充実しています。ただし、チベットや新疆ウイグル自治区など西部の辺境地域では通信が不安定になることがあります。"
      },
      {
        title: "中国向けeSIMプランの選び方",
        body: "中国向けeSIMプランを選ぶ際は、グレートファイアウォールの制限を回避できるかどうかが最重要ポイントです。中国国内キャリアの直接回線を使うプランでは、Google、LINE、Instagramなどの海外サービスが使えません。香港やその他の地域のローミング経由で接続するプランを選ぶことで、これらの制限を回避できます。\n\nAutoWiFi eSIMの中国プランは香港ローミングを経由するため、日本で普段使っているアプリやサービスをそのまま利用可能です。データ容量は、地図アプリやSNSの利用程度であれば1日1GB、動画視聴も含めるなら無制限プランがおすすめです。上海・北京の短期旅行なら5〜7日プラン、中国周遊なら14日以上のプランを検討しましょう。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "中国でGoogleやLINEは使えますか？", a: "通常の中国国内回線ではブロックされていますが、AutoWiFi eSIMの中国プランは香港ローミング経由で接続するため、Google、LINE、Instagram、YouTubeなどを制限なく利用できます。" },
      { q: "中国でVPNは必要ですか？", a: "AutoWiFi eSIMの中国プランを利用する場合、香港ローミング経由で接続するため、別途VPNを用意する必要はありません。中国国内キャリアの直接回線を使う場合はVPNが必要ですが、VPNも規制対象のため接続が不安定になることがあります。" },
      { q: "中国でWeChat Payは使えますか？", a: "はい、外国人のクレジットカードでもWeChat PayやAlipayにリンクして利用可能になっています。安定したデータ通信が必要ですので、eSIMの準備をおすすめします。" },
      { q: "万里の長城でeSIMは使えますか？", a: "八達嶺や慕田峪などの主要な観光セクションでは4G通信が利用可能です。ただし、混雑時や天候によっては速度が低下することがあります。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMで中国旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "中国eSIM",
  },
  en: {
    title: "China eSIM Guide - VPN Issues, WeChat & Connectivity in Shanghai/Beijing",
    subtitle: "Navigate the Great Firewall and stay connected to your favorite apps",
    intro: "Internet access is one of the most critical considerations for China travel. China's Great Firewall blocks many popular international services including Google, YouTube, Instagram, LINE, and WhatsApp. The right eSIM plan can help you bypass these restrictions. This guide covers the latest connectivity information for Shanghai and Beijing, plus essential tips for staying connected in China.",
    sections: [
      {
        title: "Understanding China's Great Firewall",
        body: "China operates the Great Firewall, a government internet censorship system that blocks access to Google Search, Gmail, Google Maps, YouTube, Facebook, Instagram, X (Twitter), LINE, WhatsApp, Telegram, and many other international services.\n\nThese restrictions apply when using Chinese carrier networks (China Mobile, China Unicom, China Telecom) directly. This makes choosing the right eSIM plan crucial for China travel — you need a plan that routes through a VPN or international roaming to access your regular apps. AutoWiFi eSIM's China plans route through Hong Kong roaming, providing unrestricted access to Google, LINE, Instagram, and all other international services."
      },
      {
        title: "WeChat and China's Digital Ecosystem",
        body: "WeChat (Weixin) is used for virtually everything in China — messaging, social media, mobile payments (WeChat Pay), and mini-programs (apps within the app). China's digital life revolves around WeChat. Foreign travelers should install WeChat before visiting, as it greatly facilitates communication with hotels and shops.\n\nWeChat Pay now accepts foreign credit cards, making it more accessible to international visitors. Alipay has also expanded its support for foreign users. Stable data connectivity is essential for these mobile payment services. In China, an increasing number of businesses no longer accept cash or international credit cards, making mobile payment preparation important."
      },
      {
        title: "Connectivity in Shanghai and Beijing",
        body: "Shanghai and Beijing have China's most advanced telecom infrastructure. 5G networks are extensively deployed, delivering very high speeds in urban areas. 4G/5G connectivity is available inside subway stations, ensuring seamless connectivity during transit.\n\nIn Shanghai, stable connectivity covers tourist areas including the Bund, Nanjing Road, Yu Garden, and Xintiandi. In Beijing, the Forbidden City, Tiananmen Square, the Great Wall (Badaling), and 798 Art District all have good coverage. While the Great Wall is in mountainous terrain, major sections like Badaling and Mutianyu have 4G service.\n\nProvincial cities like Guangzhou, Shenzhen, Chengdu, and Xi'an also have extensive 4G/5G coverage. However, remote western regions like Tibet and Xinjiang may have unstable connectivity."
      },
      {
        title: "Choosing a China eSIM Plan",
        body: "The most important factor when selecting a China eSIM plan is whether it bypasses the Great Firewall. Plans using Chinese carrier networks directly will block Google, LINE, Instagram, and other international services. Plans that route through Hong Kong or other international roaming avoid these restrictions.\n\nAutoWiFi eSIM China plans route through Hong Kong roaming, allowing you to use all your regular apps and services without restrictions. For data usage, 1GB per day covers maps and social media. For video streaming, unlimited plans are recommended. For short trips to Shanghai or Beijing, consider 5-7 day plans. For broader China travel, look at 14+ day plans."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use Google and LINE in China?", a: "These are normally blocked on Chinese carrier networks. However, AutoWiFi eSIM's China plans route through Hong Kong roaming, providing unrestricted access to Google, LINE, Instagram, YouTube, and all other international services." },
      { q: "Do I need a VPN for China?", a: "With AutoWiFi eSIM's China plan, you don't need a separate VPN since data routes through Hong Kong roaming. If using a Chinese carrier directly, VPNs are needed but are themselves subject to blocking, making connections unreliable." },
      { q: "Can I use WeChat Pay as a foreigner?", a: "Yes, foreign credit cards can now be linked to WeChat Pay and Alipay. Stable data connectivity is required, so having an eSIM set up is recommended." },
      { q: "Does eSIM work at the Great Wall?", a: "Yes, 4G coverage is available at major tourist sections like Badaling and Mutianyu. Speeds may decrease during peak times or bad weather conditions." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to China with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "China eSIM",
  },
  ko: {
    title: "중국 eSIM 가이드 - VPN 문제·WeChat 대응·상하이/베이징 통신 사정",
    subtitle: "만리방화벽이 있는 나라에서도 스마트하게 연결하는 방법",
    intro: "중국 여행에서 가장 주의해야 할 포인트 중 하나가 인터넷 접속 환경입니다. 중국에서는 만리방화벽(금순)으로 인해 Google, YouTube, Instagram, LINE, WhatsApp 등 많은 해외 서비스가 차단되어 있습니다. eSIM 플랜 선택에 따라 이 제한을 우회할 수 있습니다. 상하이와 베이징의 최신 통신 사정과 중국 여행에서 쾌적하게 인터넷을 사용하기 위한 포인트를 안내합니다.",
    sections: [
      {
        title: "중국의 인터넷 규제 (만리방화벽)",
        body: "중국에서는 정부의 인터넷 검열 시스템인 '만리방화벽(금순)'이 운용되고 있으며, Google 검색, Gmail, Google Maps, YouTube, Facebook, Instagram, X(Twitter), LINE, WhatsApp, Telegram 등 주요 해외 서비스에 접속할 수 없습니다.\n\n중국 국내 통신사(China Mobile, China Unicom, China Telecom) 회선을 사용하면 이러한 제한이 적용됩니다. 따라서 중국 여행에서는 일반 eSIM 플랜뿐 아니라, VPN 대응이나 로밍 경유 접속이 가능한 플랜을 선택하는 것이 매우 중요합니다. AutoWiFi eSIM의 중국 플랜은 홍콩 로밍을 경유하기 때문에 Google, LINE, Instagram 등의 서비스에 제한 없이 접속할 수 있습니다."
      },
      {
        title: "WeChat과 중국 디지털 생활",
        body: "중국에서는 WeChat(微信)이 모든 장면에서 사용됩니다. 메시징, SNS, 모바일 결제(WeChat Pay), 미니프로그램(앱 내 앱) 등 중국의 디지털 생활은 WeChat을 중심으로 돌아갑니다. 외국인 여행자도 WeChat을 설치해 두면 호텔이나 상점과의 소통이 원활해집니다.\n\nWeChat Pay는 외국인 신용카드로도 연동이 가능해져 이전보다 이용이 편리해졌습니다. Alipay(支付宝)도 외국인 대상 이용이 확대되고 있습니다. 이러한 모바일 결제를 사용하려면 안정적인 데이터 통신이 필요합니다. 중국에서는 현금이나 해외 신용카드를 받지 않는 곳이 늘고 있어 모바일 결제 준비가 중요합니다."
      },
      {
        title: "상하이·베이징 통신 환경",
        body: "상하이와 베이징은 중국에서 통신 인프라가 가장 발달한 도시입니다. 5G 네트워크가 광범위하게 배치되어 도시 지역에서는 매우 빠른 통신이 가능합니다. 지하철 역사 내에서도 4G/5G 통신을 이용할 수 있어 이동 중 인터넷 접속에 어려움이 없습니다.\n\n상하이에서는 와이탄(번드), 난징루, 위위안, 신톈디 등 관광 지역에서 안정적인 통신을 이용할 수 있습니다. 베이징에서는 자금성, 천안문 광장, 만리장성(팔달령), 798 예술구 등에서도 커버리지가 양호합니다. 만리장성은 산간에 위치하지만 팔달령이나 무톈위 등 주요 구간에서는 4G 통신이 가능합니다.\n\n광저우, 선전, 청두, 시안 등 지방 도시에서도 4G/5G 커버리지가 충실합니다. 다만 티베트나 신장 위구르 자치구 등 서부 변경 지역에서는 통신이 불안정할 수 있습니다."
      },
      {
        title: "중국 eSIM 플랜 선택 방법",
        body: "중국 eSIM 플랜을 선택할 때 가장 중요한 포인트는 만리방화벽의 제한을 우회할 수 있는지 여부입니다. 중국 국내 통신사의 직접 회선을 사용하는 플랜에서는 Google, LINE, Instagram 등의 해외 서비스를 사용할 수 없습니다. 홍콩이나 기타 지역의 로밍을 경유하는 플랜을 선택하면 이러한 제한을 우회할 수 있습니다.\n\nAutoWiFi eSIM의 중국 플랜은 홍콩 로밍을 경유하므로 평소 사용하는 앱과 서비스를 그대로 이용할 수 있습니다. 데이터 용량은 지도 앱이나 SNS 이용 정도라면 하루 1GB, 동영상 시청도 포함하면 무제한 플랜을 추천합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "중국에서 Google이나 LINE을 사용할 수 있나요?", a: "일반 중국 국내 회선에서는 차단되어 있지만, AutoWiFi eSIM의 중국 플랜은 홍콩 로밍 경유로 접속하므로 Google, LINE, Instagram, YouTube 등을 제한 없이 이용할 수 있습니다." },
      { q: "중국에서 VPN이 필요한가요?", a: "AutoWiFi eSIM의 중국 플랜을 이용하면 홍콩 로밍 경유로 접속하므로 별도 VPN이 필요 없습니다. 중국 국내 통신사 직접 회선을 사용하는 경우 VPN이 필요하지만, VPN 자체도 규제 대상이라 접속이 불안정할 수 있습니다." },
      { q: "외국인도 WeChat Pay를 사용할 수 있나요?", a: "네, 외국인 신용카드로도 WeChat Pay나 Alipay에 연동하여 이용 가능합니다. 안정적인 데이터 통신이 필요하므로 eSIM 준비를 권장합니다." },
      { q: "만리장성에서 eSIM을 사용할 수 있나요?", a: "팔달령이나 무톈위 등 주요 관광 구간에서는 4G 통신이 가능합니다. 다만 혼잡 시나 기상 조건에 따라 속도가 저하될 수 있습니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 중국 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "중국 eSIM",
  },
  zh: {
    title: "中国eSIM指南 - VPN问题·微信使用·上海/北京通信攻略",
    subtitle: "在防火墙环境下也能智能上网的方法",
    intro: "中国旅行最需要注意的问题之一就是互联网接入环境。中国的防火长城（GFW）屏蔽了Google、YouTube、Instagram、LINE、WhatsApp等众多海外服务。选择合适的eSIM套餐可以帮助绕过这些限制。本指南介绍上海和北京的最新通信情况，以及在中国旅行时畅快上网的要点。",
    sections: [
      {
        title: "中国互联网管制（防火长城）",
        body: "中国运行着被称为防火长城（GFW）的互联网审查系统，Google搜索、Gmail、Google Maps、YouTube、Facebook、Instagram、X（Twitter）、LINE、WhatsApp、Telegram等众多海外服务均无法访问。\n\n使用中国国内运营商（中国移动、中国联通、中国电信）的网络时，这些限制均会生效。因此，中国旅行不仅要选择eSIM套餐，更重要的是要选择能够通过VPN或国际漫游方式绕过限制的套餐。AutoWiFi eSIM的中国套餐通过香港漫游接入，可以无限制地访问Google、LINE、Instagram等服务。"
      },
      {
        title: "微信与中国数字生活",
        body: "在中国，微信几乎无处不在。即时通讯、社交媒体、移动支付（微信支付）、小程序（应用内应用）——中国的数字生活以微信为中心运转。外国游客在旅行前安装微信，可以更方便地与酒店和商店沟通。\n\n微信支付现在已支持外国信用卡绑定，比以前更加方便。支付宝也在扩大对外国用户的支持。使用这些移动支付需要稳定的数据连接。在中国，越来越多的场所不再接受现金或国际信用卡，因此准备好移动支付非常重要。"
      },
      {
        title: "上海·北京通信环境",
        body: "上海和北京是中国通信基础设施最发达的城市。5G网络已广泛部署，城市地区可享受极高速通信。地铁站内也有4G/5G覆盖，出行中不用担心断网。\n\n在上海，外滩、南京路、豫园、新天地等旅游区域通信稳定。在北京，故宫、天安门广场、长城（八达岭）、798艺术区等景点覆盖良好。虽然长城位于山区，但八达岭和慕田峪等主要游览段都有4G信号。\n\n广州、深圳、成都、西安等其他大城市的4G/5G覆盖也很充实。不过西藏和新疆等西部偏远地区通信可能不稳定。"
      },
      {
        title: "中国eSIM套餐选择要点",
        body: "选择中国eSIM套餐时，最关键的因素是能否绕过防火长城的限制。使用中国国内运营商直连网络的套餐无法访问Google、LINE、Instagram等海外服务。选择通过香港或其他地区漫游接入的套餐可以绕过这些限制。\n\nAutoWiFi eSIM的中国套餐通过香港漫游接入，让你可以无限制地使用平时习惯的所有应用和服务。数据用量方面，使用地图和社交媒体每天1GB即可，如果还要看视频则推荐无限流量套餐。上海或北京短期旅行选5-7天套餐，中国深度游则考虑14天以上的套餐。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "在中国能用Google和LINE吗？", a: "在普通中国国内网络上是被屏蔽的，但AutoWiFi eSIM的中国套餐通过香港漫游接入，可以无限制地使用Google、LINE、Instagram、YouTube等所有海外服务。" },
      { q: "去中国需要VPN吗？", a: "使用AutoWiFi eSIM的中国套餐不需要额外VPN，因为数据通过香港漫游路由。如果使用中国国内运营商直连网络则需要VPN，但VPN本身也受到封锁，连接可能不稳定。" },
      { q: "外国人能用微信支付吗？", a: "可以，外国信用卡现在可以绑定微信支付和支付宝。使用这些服务需要稳定的数据连接，建议提前准备好eSIM。" },
      { q: "长城上能用eSIM吗？", a: "在八达岭和慕田峪等主要游览段有4G覆盖。高峰期或天气不好时网速可能下降。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游中国。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "中国eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/china-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="china-esim" content={CONTENT[loc]} />;
}
