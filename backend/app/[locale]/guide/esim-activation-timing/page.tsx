import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "出発前に見たい関連ガイド",
    articles: [
      { slug: "first-time-esim", title: "eSIM初心者ガイド" },
      { slug: "how-to-setup-esim", title: "eSIMの設定方法" },
      { slug: "esim-troubleshooting", title: "eSIMトラブルシューティング" },
      { slug: "esim-for-students", title: "留学生のためのeSIM" },
      { slug: "esim-compatible-phones", title: "eSIM対応スマホ一覧" },
    ],
  },
  en: {
    title: "Compare More Before Departure",
    articles: [
      { slug: "first-time-esim", title: "First-Time eSIM Guide" },
      { slug: "how-to-setup-esim", title: "How to Set Up eSIM" },
      { slug: "esim-troubleshooting", title: "eSIM Troubleshooting" },
      { slug: "esim-for-students", title: "eSIM for Students" },
      { slug: "esim-compatible-phones", title: "eSIM Compatible Phones" },
    ],
  },
  ko: {
    title: "출발 전에 더 비교할 가이드",
    articles: [
      { slug: "first-time-esim", title: "eSIM 초보자 가이드" },
      { slug: "how-to-setup-esim", title: "eSIM 설정 방법" },
      { slug: "esim-troubleshooting", title: "eSIM 문제 해결" },
      { slug: "esim-for-students", title: "유학생을 위한 eSIM" },
      { slug: "esim-compatible-phones", title: "eSIM 지원 기기" },
    ],
  },
  zh: {
    title: "出发前值得继续比较的指南",
    articles: [
      { slug: "first-time-esim", title: "eSIM新手指南" },
      { slug: "how-to-setup-esim", title: "eSIM设置方法" },
      { slug: "esim-troubleshooting", title: "eSIM故障排除" },
      { slug: "esim-for-students", title: "留学生eSIM指南" },
      { slug: "esim-compatible-phones", title: "eSIM兼容手机" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIMの有効化タイミング - 出発前と到着後どちらがベスト？",
    subtitle: "eSIMのインストールと有効化の最適なタイミングを徹底解説",
    intro: "eSIMを購入したあと、いつインストールして有効化すべきか迷う方は多いです。出発前にセットアップしておくべきか、現地到着後に有効化すべきか、プランの種類や有効期限を考慮した最適なタイミングを解説します。本記事ではeSIMのインストールと有効化の最適なタイミングを徹底解説・インストールと有効化の違い・出発前にインストールすべき理由などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "インストールと有効化の違い",
        body: "まず重要な点として、eSIMのインストールと有効化は別の操作です。インストールとは、QRコードを読み取ってeSIMプロファイルをスマートフォンにダウンロードすることです。この段階ではまだデータ通信は開始されず、有効期間のカウントダウンも始まりません。\n\n有効化（アクティベーション）は、インストールしたeSIMプロファイルのデータ通信をオンにすることです。多くのeSIMプランでは、有効化した時点またはネットワークに最初に接続した時点から有効期間がスタートします。\n\nこの違いを理解しておくことが、eSIMを最大限活用するカギです。インストールは出発前に済ませておき、有効化のタイミングを旅行の開始に合わせることで、有効期間を無駄なく使えます。"
      },
      {
        title: "出発前にインストールすべき理由",
        body: "eSIMのインストール（QRコードの読み取り）は、必ず出発前に行うことを強くおすすめします。理由は3つあります。まず、QRコードの読み取りにはWiFi接続が必要な場合が多く、自宅の安定したWiFi環境で行うのが最も確実です。空港のWiFiは混雑していることがあり、スムーズにインストールできない可能性があります。\n\n次に、万が一インストールに問題が発生した場合、自宅なら落ち着いてトラブルシューティングできます。カスタマーサポートに連絡する時間的余裕もあります。空港や機内ではこの余裕がありません。\n\nまた、一部のeSIMプロバイダーでは、インストール時にアプリのアップデートや追加データのダウンロードが必要な場合があります。出発前に完了しておけば、到着後すぐに使い始められます。AutoWiFiのeSIMは出発の24時間前までにインストールしておくことを推奨しています。"
      },
      {
        title: "有効化の最適なタイミング",
        body: "有効化のタイミングはeSIMプランの種類によって異なります。初回接続時に有効化タイプのプランでは、eSIMをインストールしておき、渡航先の空港で機内モードを解除した時点で自動的に有効化されます。このタイプが最も便利で、有効期間を最大限に活用できます。\n\n\"インストール時に有効化\"タイプのプランでは、QRコードを読み取った時点から有効期間がスタートします。このタイプの場合は、出発日の前日〜当日にインストールすることで、有効期間の無駄を最小限にできます。\n\nAutoWiFiのeSIMプランは初回接続時に有効化方式を採用しているため、出発の何日前にインストールしても有効期間は渡航先での最初の接続から始まります。安心して余裕を持ったセットアップが可能です。"
      },
      {
        title: "有効化後の確認事項とトラブル対策",
        body: "eSIMを有効化した後、正常に動作しているか確認するポイントがあります。まず、画面上部のステータスバーにキャリア名と電波強度が表示されているか確認しましょう。圏外やNo Serviceと表示される場合は、データローミングがオフになっている可能性があります。\n\nWebブラウザを開いて適当なウェブサイトにアクセスし、ページが表示されれば正常に接続されています。読み込みが遅い場合は、場所を変えて再度試してみてください。空港の建物内は電波が弱いことがあるため、屋外に出ると改善する場合があります。\n\nそれでも接続できない場合は、以下の手順を試してください。機内モードのオンオフ、端末の再起動、APNの手動設定、キャリアの手動選択です。これらで解決しない場合は、AutoWiFiの24時間カスタマーサポートにお問い合わせください。スタッフがリアルタイムで対応いたします。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMは出発のどれくらい前にインストールすべきですか？", a: "1〜2日前のインストールがおすすめです。AutoWiFiのeSIMは初回接続時に有効化されるため、何日前にインストールしても有効期間は渡航先での接続開始から始まります。" },
      { q: "インストール後に有効化せずに放置しても大丈夫ですか？", a: "はい、多くのeSIMプランでは、インストール後に有効化しなければ有効期間は始まりません。ただし、プロファイルの有効保持期限がある場合があるため、購入後はなるべく早くインストールしてください。" },
      { q: "有効化したら有効期間が始まってしまいますか？", a: "プランの種類によります。AutoWiFiのeSIMは現地でネットワークに最初に接続した時点から有効期間がスタートするため、出発前にインストールしても安心です。" },
      { q: "2枚目のeSIMを追加でインストールできますか？", a: "はい、ほとんどのスマートフォンは複数のeSIMプロファイルを保存できます。必要に応じてデータ通信に使用するeSIMを切り替えることが可能です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiのeSIMは初回接続時に有効化。出発前に安心してインストールしておけば、到着後すぐに使えます。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIM有効化タイミング"
  },
  en: {
    title: "When to Activate Your eSIM - Before or After Arrival?",
    subtitle: "Optimal timing for eSIM installation and activation explained",
    intro: "After purchasing an eSIM, many travelers wonder when to install and activate it. Should you set it up before departure or wait until you arrive? This guide explains the optimal timing based on plan types and validity periods.",
    sections: [
      {
        title: "Installation vs Activation: Key Difference",
        body: "Understanding the difference between installation and activation is essential. Installation means scanning the QR code to download the eSIM profile to your phone. At this stage, data connectivity has not started and the validity countdown has not begun.\n\nActivation is when you turn on data for the installed eSIM profile. Most eSIM plans start their validity period either when activated or when the eSIM first connects to a network in the destination country.\n\nGrasping this distinction is the key to maximizing your eSIM value. Install before departure, and time activation to coincide with the start of your trip to use every day of your validity period."
      },
      {
        title: "Why You Should Install Before Departure",
        body: "We strongly recommend installing your eSIM (scanning the QR code) before you leave home, for three reasons. First, QR code scanning often requires WiFi, and your home WiFi provides the most reliable connection. Airport WiFi can be congested and may not work smoothly.\n\nSecond, if installation issues arise, you have time to troubleshoot calmly at home and contact customer support if needed. At the airport or in flight, you will not have this luxury.\n\nThird, some eSIM providers require app updates or additional data downloads during installation. Completing these at home means you are ready to connect immediately upon arrival. AutoWiFi recommends installing your eSIM at least 24 hours before departure."
      },
      {
        title: "Optimal Activation Timing",
        body: "The best activation timing depends on your plan type. Plans that activate on first connection are the most traveler-friendly. Install the eSIM at home, and it automatically activates when you turn off airplane mode at your destination. This approach maximizes your validity period.\n\nPlans that activate upon installation start the validity clock when you scan the QR code. For these plans, install on the day before or day of departure to minimize wasted validity days.\n\nAutoWiFi's eSIM plans use the first-connection activation model. No matter how many days before departure you install, the validity period begins only when you first connect at your destination. This allows stress-free advance setup."
      },
      {
        title: "Post-Activation Checks and Troubleshooting",
        body: "After activating your eSIM, verify it is working correctly. Check the status bar at the top of your screen for a carrier name and signal strength indicator. If it shows 'No Service,' data roaming may be disabled in your settings.\n\nOpen a web browser and visit any website. If the page loads, your connection is working. Slow loading may improve if you move to a different spot, as signal inside airport buildings can be weak. Stepping outdoors often improves reception.\n\nIf you still cannot connect, try these steps in order: toggle airplane mode, restart your phone, manually configure APN settings, and manually select a carrier. If none of these work, contact AutoWiFi's 24/7 customer support for real-time assistance."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "How far in advance should I install my eSIM?", a: "We recommend 1-2 days before departure. AutoWiFi's eSIM activates on first connection, so installing early does not waste validity time. Your plan starts counting only when you connect at your destination." },
      { q: "Is it okay to leave an installed eSIM without activating it?", a: "Yes, most eSIM plans do not start the validity period until activation or first connection. However, some profiles have a maximum hold period, so install reasonably soon after purchase." },
      { q: "Does activation immediately start the validity period?", a: "This varies by plan type. AutoWiFi's eSIM starts the validity period upon first network connection at your destination, not upon installation. So pre-departure installation is perfectly safe." },
      { q: "Can I install a second eSIM alongside my current one?", a: "Yes, most smartphones can store multiple eSIM profiles. You can switch which eSIM is used for data as needed." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi's eSIM activates on first connection. Install before departure with confidence and connect instantly upon arrival.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "eSIM Activation Timing"
  },
  ko: {
    title: "eSIM 활성화 타이밍 - 출발 전과 도착 후 언제가 최적?",
    subtitle: "eSIM 설치와 활성화의 최적 타이밍을 철저하게 해설",
    intro: "eSIM을 구매한 후 언제 설치하고 활성화해야 할지 고민하는 분이 많습니다. 출발 전에 설정해야 할지, 현지 도착 후에 활성화해야 할지, 플랜 종류와 유효 기간을 고려한 최적의 타이밍을 알아봅니다.",
    sections: [
      {
        title: "설치와 활성화의 차이",
        body: "먼저 중요한 점으로 eSIM의 '설치'와 '활성화'는 다른 작업입니다. 설치란 QR 코드를 스캔하여 eSIM 프로필을 스마트폰에 다운로드하는 것입니다. 이 단계에서는 아직 데이터 통신이 시작되지 않으며, 유효 기간 카운트다운도 시작되지 않습니다.\n\n활성화(액티베이션)는 설치한 eSIM 프로필의 데이터 통신을 켜는 것입니다. 많은 eSIM 플랜에서는 활성화한 시점 또는 네트워크에 처음 연결한 시점부터 유효 기간이 시작됩니다.\n\n이 차이를 이해해 두는 것이 eSIM을 최대한 활용하는 핵심입니다. 설치는 출발 전에 마치고, 활성화 타이밍을 여행 시작에 맞추면 유효 기간을 낭비 없이 사용할 수 있습니다."
      },
      {
        title: "출발 전에 설치해야 하는 이유",
        body: "eSIM 설치(QR 코드 스캔)는 반드시 출발 전에 하시길 강력히 추천합니다. 이유는 3가지입니다. 먼저 QR 코드 스캔에는 WiFi 연결이 필요한 경우가 많으며, 집의 안정적인 WiFi 환경에서 하는 것이 가장 확실합니다.\n\n다음으로, 설치에 문제가 발생한 경우 집에서라면 여유를 가지고 트러블슈팅할 수 있습니다. 고객 지원에 연락할 시간적 여유도 있습니다. 공항이나 기내에서는 이런 여유가 없습니다.\n\n또한 일부 eSIM 프로바이더에서는 설치 시 앱 업데이트나 추가 데이터 다운로드가 필요한 경우가 있습니다. 출발 전에 완료해 두면 도착 후 바로 사용할 수 있습니다. AutoWiFi의 eSIM은 출발 24시간 전까지 설치를 권장합니다."
      },
      {
        title: "활성화의 최적 타이밍",
        body: "활성화 타이밍은 eSIM 플랜 종류에 따라 다릅니다. '최초 접속 시 활성화' 타입의 플랜에서는 eSIM을 설치해 두고, 여행지 공항에서 비행기 모드를 해제한 시점에 자동 활성화됩니다. 이 타입이 가장 편리하며 유효 기간을 최대한 활용할 수 있습니다.\n\n'설치 시 활성화' 타입의 플랜에서는 QR 코드를 스캔한 시점부터 유효 기간이 시작됩니다. 이 타입은 출발 전날~당일에 설치하면 유효 기간 낭비를 최소화할 수 있습니다.\n\nAutoWiFi의 eSIM 플랜은 '최초 접속 시 활성화' 방식을 채택하고 있어 출발 며칠 전에 설치해도 유효 기간은 여행지에서 첫 접속부터 시작됩니다."
      },
      {
        title: "활성화 후 확인 사항과 문제 해결",
        body: "eSIM을 활성화한 후 정상 작동을 확인하는 포인트입니다. 먼저 화면 상단 상태바에 통신사 이름과 전파 강도가 표시되는지 확인하세요. '서비스 없음'으로 표시되면 데이터 로밍이 꺼져 있을 가능성이 있습니다.\n\n웹 브라우저를 열어 아무 웹사이트에 접속하여 페이지가 표시되면 정상 연결된 것입니다. 로딩이 느린 경우 장소를 옮겨 다시 시도해 보세요. 공항 건물 안은 전파가 약할 수 있어 실외로 나가면 개선되는 경우가 있습니다.\n\n그래도 연결되지 않으면 비행기 모드 온/오프, 단말 재시작, APN 수동 설정, 통신사 수동 선택을 시도해 보세요. 이것으로도 해결되지 않으면 AutoWiFi의 24시간 고객 지원에 문의하세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "eSIM은 출발 며칠 전에 설치해야 하나요?", a: "1~2일 전 설치를 추천합니다. AutoWiFi의 eSIM은 최초 접속 시 활성화되므로 며칠 전에 설치해도 유효 기간은 여행지 접속 시작부터 카운트됩니다." },
      { q: "설치 후 활성화하지 않고 두어도 괜찮나요?", a: "네, 대부분의 eSIM 플랜은 활성화하지 않으면 유효 기간이 시작되지 않습니다. 다만 프로필 유효 보관 기한이 있을 수 있으니 구입 후 가급적 빨리 설치하세요." },
      { q: "활성화하면 바로 유효 기간이 시작되나요?", a: "플랜 종류에 따라 다릅니다. AutoWiFi의 eSIM은 현지에서 네트워크에 최초 접속한 시점부터 유효 기간이 시작되므로 출발 전 설치해도 안심입니다." },
      { q: "두 번째 eSIM을 추가로 설치할 수 있나요?", a: "네, 대부분의 스마트폰은 여러 eSIM 프로필을 저장할 수 있습니다. 필요에 따라 데이터 통신에 사용하는 eSIM을 전환할 수 있습니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi의 eSIM은 최초 접속 시 활성화. 출발 전에 안심하고 설치해 두면 도착 후 바로 사용할 수 있습니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM 활성화 타이밍"
  },
  zh: {
    title: "eSIM何时激活最好 - 出发前还是到达后？",
    subtitle: "详解eSIM安装和激活的最佳时机",
    intro: "购买eSIM后，很多人会犹豫什么时候安装和激活。应该在出发前设置好，还是等到达目的地后再激活？本指南根据套餐类型和有效期，解释最佳的操作时机。",
    sections: [
      {
        title: "安装与激活的区别",
        body: "首先要理解eSIM的'安装'和'激活'是两个不同的操作。安装是扫描QR码将eSIM配置文件下载到手机上。此时数据通信尚未开始，有效期倒计时也不会启动。\n\n激活是打开已安装eSIM配置文件的数据连接。大多数eSIM套餐在激活时或首次连接网络时才开始计算有效期。\n\n理解这个区别是充分利用eSIM的关键。出发前完成安装，将激活时间对准旅行开始，就能充分利用每一天的有效期。"
      },
      {
        title: "为什么要在出发前安装",
        body: "强烈建议在出发前完成eSIM安装（扫描QR码），原因有三。首先，QR码扫描通常需要WiFi连接，在家中稳定的WiFi环境下操作最为可靠。机场WiFi可能拥挤，安装可能不顺利。\n\n其次，万一安装出现问题，在家可以从容排查。有时间联系客服。在机场或飞机上就没有这种余裕了。\n\n另外，部分eSIM服务商在安装时可能需要更新应用或下载额外数据。出发前完成这些，到达后就能立即使用。AutoWiFi建议在出发前至少24小时完成安装。"
      },
      {
        title: "激活的最佳时机",
        body: "激活时机取决于eSIM套餐类型。'首次连接时激活'类型的套餐最适合旅行者：提前安装eSIM，在目的地机场关闭飞行模式后自动激活。这种方式最大化利用有效期。\n\n'安装时激活'类型的套餐在扫描QR码时就开始计算有效期。这类套餐建议在出发前一天或当天安装，减少有效期浪费。\n\nAutoWiFi的eSIM套餐采用'首次连接时激活'模式，无论出发前几天安装，有效期都从目的地首次连接网络时开始。可以安心提前设置。"
      },
      {
        title: "激活后的检查与故障排除",
        body: "eSIM激活后需要确认是否正常工作。首先检查屏幕顶部状态栏是否显示运营商名称和信号强度。如果显示'无服务'，可能是数据漫游未开启。\n\n打开浏览器访问任意网站，如果页面能加载就说明连接正常。加载慢的话换个位置再试，机场建筑内信号可能较弱，到室外可能会改善。\n\n仍然无法连接时，依次尝试：开关飞行模式、重启手机、手动配置APN、手动选择运营商。如果都不行，联系AutoWiFi的24小时客服获取实时帮助。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM应该提前多久安装？", a: "建议出发前1-2天安装。AutoWiFi的eSIM在首次连接时激活，提前安装不会浪费有效期。有效期从目的地首次连接开始计算。" },
      { q: "安装后不激活放着可以吗？", a: "可以，大多数eSIM套餐不激活就不会开始计算有效期。但配置文件可能有最长保留期限，购买后请尽快安装。" },
      { q: "激活后有效期立即开始吗？", a: "取决于套餐类型。AutoWiFi的eSIM从目的地首次连接网络时才开始计算有效期，出发前安装完全没问题。" },
      { q: "可以安装第二张eSIM吗？", a: "可以，大多数手机能存储多个eSIM配置文件。可以根据需要切换使用哪个eSIM进行数据通信。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi的eSIM首次连接时激活。出发前安心安装，到达后即刻使用。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM激活时机"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-activation-timing", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="esim-activation-timing"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
