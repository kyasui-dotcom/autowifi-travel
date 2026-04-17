import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "設定でつまずく前後に見たい関連ガイド",
    articles: [
      { slug: "first-time-esim", title: "eSIM初心者ガイド" },
      { slug: "how-to-setup-esim", title: "eSIMの設定方法" },
      { slug: "esim-activation-timing", title: "eSIM有効化タイミング" },
      { slug: "esim-compatible-phones", title: "eSIM対応スマホ一覧" },
      { slug: "esim-security-tips", title: "eSIMセキュリティ" },
    ],
  },
  en: {
    title: "Compare More Before You Ask Support",
    articles: [
      { slug: "first-time-esim", title: "First-Time eSIM Guide" },
      { slug: "how-to-setup-esim", title: "How to Set Up eSIM" },
      { slug: "esim-activation-timing", title: "When to Activate Your eSIM" },
      { slug: "esim-compatible-phones", title: "eSIM Compatible Phones" },
      { slug: "esim-security-tips", title: "eSIM Security Tips" },
    ],
  },
  ko: {
    title: "고객지원 전에 더 비교할 가이드",
    articles: [
      { slug: "first-time-esim", title: "eSIM 초보자 가이드" },
      { slug: "how-to-setup-esim", title: "eSIM 설정 방법" },
      { slug: "esim-activation-timing", title: "eSIM 활성화 타이밍" },
      { slug: "esim-compatible-phones", title: "eSIM 지원 기기" },
      { slug: "esim-security-tips", title: "eSIM 보안 팁" },
    ],
  },
  zh: {
    title: "联系客服前值得继续比较的指南",
    articles: [
      { slug: "first-time-esim", title: "eSIM新手指南" },
      { slug: "how-to-setup-esim", title: "eSIM设置方法" },
      { slug: "esim-activation-timing", title: "eSIM激活时机" },
      { slug: "esim-compatible-phones", title: "eSIM兼容手机" },
      { slug: "esim-security-tips", title: "eSIM安全提示" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIMトラブルシューティング：よくある問題と解決方法",
    subtitle: "接続できない・遅い・設定エラーなど、困った時の対処法",
    intro: "eSIMの設定や利用中にトラブルが発生することがあります。この記事では、最もよくあるeSIMの問題とその解決方法をまとめました。QRコードが読み取れない、データ通信ができない、通信速度が遅いなど、状況別に対処法を解説します。ほとんどの問題は数分で解決できます。本記事では接続できない・遅い・設定エラーなど、困った時の対処法・QRコードが読み取れない・インストールエラー・eSIMをインストールしたがデータ通信ができないなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "QRコードが読み取れない・インストールエラー",
        body: "QRコードが読み取れない場合、まずカメラのレンズが汚れていないか確認してください。QRコードが小さすぎる場合は、画面を拡大するか、別のデバイスで表示してみましょう。それでも読み取れない場合は、手動入力でアクティベーションコード（SM-DP+アドレス）を入力する方法があります。\n\nインストール中にエラーが発生する場合は、インターネット接続を確認してください。eSIMプロファイルのダウンロードにはWiFi接続が必要です。モバイルデータだけでは正常にダウンロードできないケースがあります。WiFiの電波が弱い場合は、より安定した環境に移動してから再試行してください。\n\n\"このQRコードは既に使用済みです\"というエラーが表示される場合は、同じQRコードが別の端末で既にアクティベートされている可能性があります。eSIMのQRコードは通常1回限り有効です。誤って削除した場合は、eSIMプロバイダーに連絡して再発行を依頼しましょう。"
      },
      {
        title: "eSIMをインストールしたがデータ通信ができない",
        body: "eSIMが正常にインストールされてもデータ通信ができない場合、最初に確認すべきはデータローミングの設定です。多くのトラベルeSIMでは、データローミングをオンにする必要があります。iPhoneでは設定→モバイル通信→該当プラン→データローミングをオンにします。Androidでも同様に該当SIMのローミング設定を確認してください。\n\n次に、モバイルデータ通信に使用する回線が正しく設定されているか確認します。設定→モバイル通信→モバイルデータ通信で、旅行用eSIMが選択されていることを確認してください。メイン回線のまま変更し忘れているケースが多いです。\n\nそれでも接続できない場合は、機内モードを10秒間オンにしてからオフに切り替えてみてください。これにより、ネットワーク接続がリセットされ、現地のキャリアに再接続されます。端末の再起動も効果的です。APN設定が必要なプロバイダーもあるため、購入時の案内メールを再確認することもおすすめします。"
      },
      {
        title: "通信速度が遅い場合の対処法",
        body: "eSIMの通信速度が遅いと感じる場合、いくつかの対処法があります。まず、現在の場所の電波状況を確認してください。建物の地下や山間部など、電波の届きにくい場所では速度が低下するのは自然なことです。窓際や屋外に移動すると改善することがあります。\n\n速度改善のためにネットワーク設定をリセットすることも有効です。iPhoneでは設定→一般→転送またはiPhoneをリセット→リセット→ネットワーク設定をリセットを選択します。ただし、この操作を行うとWiFiパスワードなども消去されるため注意してください。\n\nデータ使用量が上限に近づいている場合、通信速度が制限されることがあります。eSIMプロバイダーのアプリやウェブサイトで残りのデータ量を確認しましょう。データを使い切った場合は、追加チャージやプラン変更を検討してください。バックグラウンドでのアプリ更新やクラウドバックアップを一時的にオフにすることで、必要な通信にデータ量を集中させることもできます。"
      },
      {
        title: "デュアルSIM関連のトラブル",
        body: "物理SIMとeSIMの両方を使っている場合、回線の設定が正しくないと通信ができないことがあります。よくあるトラブルは、モバイルデータ通信に使う回線の選択ミスです。旅行先ではeSIM側をデータ通信用に、物理SIM側を音声通話用に設定するのが一般的です。\n\nまた、一部の端末では両方のSIMを同時にアクティブにすると、バッテリーの消耗が早くなることがあります。使わない回線は一時的にオフにしておくとバッテリーを節約できます。ただし、日本からの着信を受けたい場合は、メイン回線はオンのまま、データ通信のみeSIMに切り替える設定にしましょう。\n\neSIMプランに電話番号が含まれていない場合（データ専用プラン）、その回線から電話やSMSは使えません。電話やSMSは物理SIM側で行うように設定してください。iMessageやFaceTimeなどのAppleサービスも、正しい回線で設定されているか確認が必要です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMが信号なしと表示される場合は？", a: "まずデータローミングがオンになっているか確認してください。次にモバイルデータ通信の回線が正しく設定されているか確認します。機内モードのオン・オフやスマートフォンの再起動も試してください。それでも解決しない場合は、eSIMプロバイダーのサポートに連絡しましょう。" },
      { q: "eSIMプロファイルを誤って削除してしまいました。どうすればいいですか？", a: "eSIMプロバイダーに連絡して再発行を依頼してください。多くのプロバイダーでは、新しいQRコードを再発行してもらえます。ただし、再発行には手数料がかかる場合があります。" },
      { q: "海外でeSIMが急に使えなくなったのはなぜ？", a: "データ容量を使い切った可能性があります。プロバイダーのアプリで残量を確認してください。また、プランの有効期限が切れていないかも確認しましょう。一時的な回線障害の可能性もあるため、しばらく待ってから再試行してみてください。" },
      { q: "APN設定はどうすれば確認できますか？", a: "iPhoneでは\"設定→モバイル通信→該当プラン→モバイルデータ通信ネットワークで確認できます。Androidでは設定→ネットワーク\"→\"SIM\"→該当SIM→\"アクセスポイント名\"から確認できます。正しいAPN設定はeSIMプロバイダーから提供されます。" }
    ],
    ctaTitle: "快適なeSIM体験を始めよう",
    ctaDesc: "AutoWiFi eSIMなら、24時間対応のカスタマーサポート付き。安心して海外旅行をお楽しみいただけます。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIMトラブルシューティング"
  },
  en: {
    title: "eSIM Troubleshooting: Common Problems and How to Fix Them",
    subtitle: "Quick fixes for connection issues, setup errors, and slow speeds",
    intro: "eSIM setup and usage can occasionally run into problems. This guide covers the most common eSIM issues and their solutions — from QR code scanning failures and no data connection to slow speeds. Most problems can be resolved in just a few minutes with the right steps.",
    sections: [
      {
        title: "QR Code Won't Scan or Installation Error",
        body: "If the QR code won't scan, first check that your camera lens is clean. If the QR code appears too small, zoom in or display it on a different device. If scanning still fails, you can enter the activation code (SM-DP+ address) manually instead of scanning.\n\nInstallation errors are often caused by unstable internet. eSIM profile downloads require a WiFi connection — mobile data alone may not work reliably. If your WiFi signal is weak, move to a location with a stronger connection and try again.\n\nAn error message saying the QR code has already been used means it was activated on another device. eSIM QR codes are typically single-use. If you accidentally deleted the profile, contact your eSIM provider to request a replacement code."
      },
      {
        title: "eSIM Installed but No Data Connection",
        body: "If your eSIM is installed but you have no data, the most common cause is data roaming being turned off. Most travel eSIMs require data roaming to be enabled. On iPhone, go to Settings, then Cellular, select your travel plan, and toggle Data Roaming on. On Android, find the corresponding SIM settings and enable roaming.\n\nNext, verify that your phone is using the correct line for mobile data. Go to Settings, then Cellular, then Cellular Data, and make sure the travel eSIM is selected. A common mistake is forgetting to switch from the primary line.\n\nIf you still cannot connect, toggle Airplane Mode on for 10 seconds, then turn it off. This resets the network connection and forces your phone to reconnect to local carriers. Restarting the device can also help. Some providers require specific APN settings, so check the setup email from your eSIM purchase."
      },
      {
        title: "How to Fix Slow eSIM Speeds",
        body: "If your eSIM connection feels slow, start by checking the signal strength at your location. Underground areas, rural regions, and heavily crowded areas naturally have weaker signals. Moving near a window or going outside often improves speed significantly.\n\nResetting network settings can also help. On iPhone, go to Settings, then General, then Transfer or Reset iPhone, then Reset, then Reset Network Settings. Note that this will erase saved WiFi passwords, so use it as a last resort.\n\nYour data plan may have reached its limit, triggering speed throttling. Check your remaining data through your eSIM provider's app or website. If data is exhausted, consider purchasing a top-up or upgrading your plan. Turning off background app refresh, automatic updates, and cloud backups can also help conserve data for essential use."
      },
      {
        title: "Dual SIM Configuration Issues",
        body: "When using both a physical SIM and eSIM, incorrect line assignment is a common source of problems. The typical setup for travel is to use the eSIM for data and the physical SIM for voice calls. Make sure your Cellular Data setting points to the travel eSIM.\n\nHaving both SIMs active simultaneously can increase battery drain on some devices. If you do not need to receive calls on your home number, consider temporarily disabling the physical SIM line. If you do want incoming calls, keep the physical SIM active but switch data to the eSIM only.\n\nIf your eSIM plan is data-only (no phone number included), calls and SMS will not work on that line. Make sure voice and messaging are routed through your physical SIM. Apple services like iMessage and FaceTime should also be checked to ensure they are using the correct line."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "What should I do if my eSIM shows 'No Signal'?", a: "First verify data roaming is enabled. Then check that mobile data is set to the correct line. Try toggling Airplane Mode on and off, or restart your phone. If the issue persists, contact your eSIM provider's support team." },
      { q: "I accidentally deleted my eSIM profile. What now?", a: "Contact your eSIM provider to request a replacement. Most providers can reissue a new QR code, though some may charge a small fee for reissuance." },
      { q: "Why did my eSIM suddenly stop working abroad?", a: "You may have used up your data allowance. Check your remaining balance through the provider's app. Also verify your plan hasn't expired. Temporary network outages can also occur, so wait a few minutes and try again." },
      { q: "How do I check or change APN settings?", a: "On iPhone, go to Settings then Cellular, select your plan, then Cellular Data Network. On Android, go to Settings then Network then SIMs, select the relevant SIM, then Access Point Names. Your eSIM provider will supply the correct APN configuration." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM comes with 24/7 customer support, so you can travel with confidence knowing help is always available.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "eSIM Troubleshooting"
  },
  ko: {
    title: "eSIM 문제 해결: 자주 발생하는 문제와 해결 방법",
    subtitle: "연결 안 됨·속도 저하·설정 오류 등 문제별 해결법",
    intro: "eSIM 설정이나 사용 중에 문제가 발생할 수 있습니다. 이 가이드에서는 가장 흔한 eSIM 문제와 해결 방법을 정리했습니다. QR 코드 인식 실패, 데이터 연결 불가, 속도 저하 등 상황별 대처법을 설명합니다. 대부분의 문제는 몇 분 안에 해결됩니다.",
    sections: [
      {
        title: "QR 코드 인식 실패·설치 오류",
        body: "QR 코드가 인식되지 않을 때는 먼저 카메라 렌즈가 깨끗한지 확인하세요. QR 코드가 너무 작으면 화면을 확대하거나 다른 기기에서 표시해 보세요. 그래도 인식되지 않으면 활성화 코드(SM-DP+ 주소)를 수동으로 입력할 수 있습니다.\n\n설치 중 오류가 발생하면 인터넷 연결을 확인하세요. eSIM 프로필 다운로드에는 WiFi 연결이 필요합니다. 모바일 데이터만으로는 정상적으로 다운로드되지 않을 수 있습니다. WiFi 신호가 약하면 더 안정적인 환경으로 이동하여 재시도하세요.\n\n'이 QR 코드는 이미 사용되었습니다'라는 오류가 표시되면 같은 QR 코드가 다른 기기에서 이미 활성화된 것입니다. eSIM QR 코드는 보통 1회만 유효합니다. 실수로 삭제한 경우 eSIM 제공업체에 연락하여 재발급을 요청하세요."
      },
      {
        title: "eSIM 설치 후 데이터 연결이 안 되는 경우",
        body: "eSIM이 정상 설치되었지만 데이터가 안 되는 경우, 가장 먼저 확인할 것은 데이터 로밍 설정입니다. 대부분의 여행용 eSIM은 데이터 로밍을 켜야 합니다. iPhone에서는 '설정' → '셀룰러' → 해당 플랜 → '데이터 로밍'을 켭니다.\n\n다음으로 모바일 데이터에 사용하는 회선이 올바르게 설정되었는지 확인합니다. '설정' → '셀룰러' → '셀룰러 데이터'에서 여행용 eSIM이 선택되어 있는지 확인하세요. 메인 회선에서 변경하지 않은 경우가 많습니다.\n\n그래도 연결되지 않으면 비행기 모드를 10초간 켰다가 끄세요. 네트워크 연결이 리셋되어 현지 통신사에 재연결됩니다. 단말기 재부팅도 효과적입니다. APN 설정이 필요한 제공업체도 있으니 구매 시 안내 이메일을 다시 확인하세요."
      },
      {
        title: "속도가 느린 경우의 대처법",
        body: "eSIM 통신 속도가 느리다고 느껴지면 먼저 현재 위치의 전파 상태를 확인하세요. 건물 지하나 산간 지역 등 전파가 약한 곳에서는 속도 저하가 자연스럽습니다. 창가나 야외로 이동하면 개선될 수 있습니다.\n\n네트워크 설정 리셋도 효과적입니다. iPhone에서는 '설정' → '일반' → 'iPhone 전송 또는 재설정' → '재설정' → '네트워크 설정 재설정'을 선택합니다. 단, 이 작업을 하면 WiFi 비밀번호도 삭제되니 주의하세요.\n\n데이터 사용량이 상한에 근접하면 통신 속도가 제한될 수 있습니다. eSIM 제공업체 앱이나 웹사이트에서 잔여 데이터를 확인하세요. 데이터를 다 사용한 경우 추가 충전이나 플랜 변경을 검토하세요."
      },
      {
        title: "듀얼 SIM 관련 문제",
        body: "물리 SIM과 eSIM을 함께 사용할 때 회선 설정이 올바르지 않으면 통신이 되지 않을 수 있습니다. 흔한 실수는 모바일 데이터에 사용할 회선 선택 오류입니다. 여행지에서는 eSIM을 데이터용으로, 물리 SIM을 음성 통화용으로 설정하는 것이 일반적입니다.\n\n두 SIM을 동시에 활성화하면 배터리 소모가 빨라질 수 있습니다. 사용하지 않는 회선은 임시로 비활성화하면 배터리를 절약할 수 있습니다. 한국에서 걸려오는 전화를 받고 싶다면 메인 회선은 켜둔 채 데이터만 eSIM으로 전환하세요.\n\neSIM 플랜에 전화번호가 포함되지 않은 경우(데이터 전용) 해당 회선으로 전화나 SMS를 사용할 수 없습니다. 통화와 메시지는 물리 SIM으로 설정하세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "eSIM에 '신호 없음'이 표시되면?", a: "데이터 로밍이 켜져 있는지 확인하세요. 모바일 데이터 회선이 올바르게 설정되었는지도 확인합니다. 비행기 모드 전환이나 재부팅을 시도하세요. 해결되지 않으면 제공업체 고객지원에 문의하세요." },
      { q: "eSIM 프로필을 실수로 삭제했습니다. 어떻게 하나요?", a: "eSIM 제공업체에 연락하여 재발급을 요청하세요. 대부분의 제공업체에서 새 QR 코드를 재발급해 줍니다. 재발급 수수료가 발생할 수 있습니다." },
      { q: "해외에서 eSIM이 갑자기 안 되는 이유는?", a: "데이터 용량을 모두 사용했을 가능성이 있습니다. 제공업체 앱에서 잔여량을 확인하세요. 플랜 유효기간이 만료되지 않았는지도 확인하세요." },
      { q: "APN 설정은 어떻게 확인하나요?", a: "iPhone은 '설정' → '셀룰러' → 해당 플랜 → '셀룰러 데이터 네트워크'에서, Android는 '설정' → '네트워크' → 'SIM' → 해당 SIM → '액세스 포인트 이름'에서 확인할 수 있습니다." }
    ],
    ctaTitle: "편안한 eSIM 경험을 시작하세요",
    ctaDesc: "AutoWiFi eSIM은 24시간 고객 지원 포함. 안심하고 해외여행을 즐기세요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM 문제 해결"
  },
  zh: {
    title: "eSIM故障排除：常见问题与解决方法",
    subtitle: "连接失败·速度慢·设置出错等问题的快速解决方案",
    intro: "eSIM在设置和使用过程中偶尔会出现问题。本指南汇总了最常见的eSIM问题及其解决方法，包括QR码扫描失败、无法连接数据、网速慢等情况。大多数问题只需几分钟即可解决。",
    sections: [
      {
        title: "QR码无法扫描·安装出错",
        body: "如果QR码无法扫描，首先检查摄像头镜片是否干净。如果QR码太小，可以放大显示或在其他设备上打开。如果仍然无法扫描，可以选择手动输入激活码（SM-DP+地址）。\n\n安装过程中出现错误，通常是网络连接不稳定造成的。下载eSIM配置文件需要WiFi连接，仅靠移动数据可能无法正常完成。如果WiFi信号弱，请移至信号更好的位置重试。\n\n如果提示此QR码已被使用，说明该QR码已在另一台设备上激活。eSIM QR码通常只能使用一次。如果误删了配置文件，请联系eSIM提供商申请重新发行。"
      },
      {
        title: "eSIM已安装但无法上网",
        body: "eSIM安装成功但无法使用数据，最常见的原因是数据漫游未开启。大多数旅行eSIM需要开启数据漫游。在iPhone上，进入设置→蜂窝网络→选择旅行方案→开启数据漫游。Android上也在相应SIM设置中启用漫游。\n\n然后确认手机正在使用正确的线路进行数据通信。在设置→蜂窝网络→蜂窝数据中，确保选择了旅行用eSIM。很多人忘记从主线路切换过来。\n\n如果仍然无法连接，将飞行模式开启10秒后关闭。这会重置网络连接，迫使手机重新连接当地运营商。重启设备也有帮助。部分提供商需要特定的APN设置，请查看购买时的设置邮件。"
      },
      {
        title: "网速慢的解决方法",
        body: "如果eSIM网速慢，首先检查当前位置的信号强度。地下室、山区等信号弱的地方速度下降是正常的。移到窗边或室外通常能改善。\n\n重置网络设置也有效。在iPhone上，进入\"设置→通用→传输或还原iPhone\"→\"还原→还原网络设置\"。注意这会清除保存的WiFi密码。\n\n如果数据用量接近上限，网速可能会被限制。在eSIM提供商的应用或网站上查看剩余流量。如果流量已用完，可以考虑充值或更换套餐。关闭后台应用刷新、自动更新和云备份也能帮助节省流量。"
      },
      {
        title: "双SIM配置问题",
        body: "同时使用实体SIM和eSIM时，线路设置不正确会导致无法通信。常见错误是移动数据使用的线路选择有误。旅行时通常将eSIM设为数据用，实体SIM设为语音通话用。\n\n两个SIM同时激活可能加快电池消耗。不使用的线路可以临时关闭以节省电量。如果想接听国内来电，保持主线路开启但将数据切换到eSIM。\n\n如果eSIM套餐是纯数据（不含电话号码），该线路无法拨打电话或发送短信。请确保语音和短信通过实体SIM进行。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM显示'无信号'怎么办？", a: "首先确认数据漫游已开启。然后检查移动数据线路设置是否正确。尝试开关飞行模式或重启手机。如果问题持续，请联系eSIM提供商客服。" },
      { q: "误删了eSIM配置文件怎么办？", a: "联系eSIM提供商申请重新发行。大多数提供商可以重新发送QR码，但可能收取少量费用。" },
      { q: "在国外eSIM突然不能用了是为什么？", a: "可能是流量已用完。在提供商应用中查看余量。同时检查套餐是否已过期。也可能是临时网络故障，等几分钟后重试。" },
      { q: "如何检查APN设置？", a: "iPhone上进入\"设置→蜂窝网络→选择方案→蜂窝数据网络。Android上进入设置→网络\"→\"SIM\"→选择SIM→\"接入点名称\"。正确的APN设置由eSIM提供商提供。" }
    ],
    ctaTitle: "开始舒适的eSIM体验",
    ctaDesc: "AutoWiFi eSIM提供24小时客户支持，让您安心享受海外旅行。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM故障排除"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-troubleshooting", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="esim-troubleshooting"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
