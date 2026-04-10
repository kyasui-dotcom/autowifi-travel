import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "esim-iphone-setup", title: "iPhoneでのeSIM設定ガイド" },
      { slug: "first-time-esim", title: "初めてのeSIMガイド" },
      { slug: "esim-compatible-phones", title: "eSIM対応スマホ一覧" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "esim-iphone-setup", title: "How to Set Up eSIM on iPhone" },
      { slug: "first-time-esim", title: "First-Time eSIM Guide" },
      { slug: "esim-compatible-phones", title: "eSIM Compatible Phones" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "esim-iphone-setup", title: "iPhone eSIM 설정 가이드" },
      { slug: "first-time-esim", title: "처음 사용하는 eSIM 가이드" },
      { slug: "esim-compatible-phones", title: "eSIM 호환 스마트폰 목록" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "esim-iphone-setup", title: "iPhone eSIM设置指南" },
      { slug: "first-time-esim", title: "eSIM入门指南" },
      { slug: "esim-compatible-phones", title: "eSIM兼容手机列表" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "AndroidでeSIMを設定する方法 - Samsung Galaxy・Google Pixel対応ガイド",
    subtitle: "Android端末でのeSIM設定手順をメーカー別に徹底解説",
    intro: "AndroidスマートフォンでeSIMを設定する方法を、Samsung Galaxy、Google Pixel、その他メーカー別にわかりやすく解説します。Android端末はメーカーごとにUIが異なるため、初めてeSIMを設定する方は戸惑うことがあります。このガイドでは、主要メーカーごとの設定手順、対応機種、デュアルSIM管理のコツ、よくあるトラブルの解決法までを網羅しています。AutoWiFi eSIMのQRコードを使えば、数分で設定が完了します。",
    sections: [
      {
        title: "eSIM対応Androidモデル一覧",
        body: "eSIMに対応しているAndroid端末は年々増加しています。以下は主な対応機種です。\n\nSamsung Galaxy: Galaxy S20以降（S20、S21、S22、S23、S24、S25シリーズ）、Galaxy Z Flip / Z Foldシリーズ全機種、Galaxy Note 20以降、Galaxy A54 5G以降の一部Aシリーズ。なお、キャリア販売モデルではeSIM機能が無効化されている場合があります。\n\nGoogle Pixel: Pixel 3a以降のすべてのPixelシリーズ（Pixel 3a、4、4a、5、5a、6、6a、6 Pro、7、7a、7 Pro、8、8a、8 Pro、9、9 Pro）。Pixel端末はeSIM対応の先駆けであり、最もスムーズに設定できます。\n\nその他メーカー: OPPO Find X3 Pro以降、Xiaomi 12T Pro以降、Sony Xperia 1 IV以降、HUAWEI P40 Pro以降（Google非対応）、motorola razr 2022以降。対応状況はモデルや地域により異なるため、購入前に確認することをおすすめします。"
      },
      {
        title: "Samsung Galaxy（OneUI）でのeSIM設定手順",
        body: "Samsung GalaxyのOneUI環境でのeSIM設定手順は以下の通りです。\n\n1. 「設定」アプリを開きます。\n2. 「接続」→「SIMカードマネージャー」（または「SIMマネージャー」）をタップします。\n3. 「eSIMを追加」をタップします。\n4. 「QRコードでスキャン」を選択し、AutoWiFi eSIMから届いたQRコードをカメラでスキャンします。\n5. eSIMプロファイルのダウンロードが始まります。Wi-Fiまたはモバイルデータに接続している必要があります。\n6. ダウンロード完了後、eSIMが有効化されます。モバイルデータ用のSIMとしてeSIMを選択してください。\n\nOneUI 5以降では、UIが若干変更されています。「設定」→「接続」→「SIMマネージャー」→「eSIMを追加」という流れになります。GalaxyのSIMマネージャーではeSIMにわかりやすい名前（例：「旅行用eSIM」）を付けることもできます。"
      },
      {
        title: "Google Pixel（Stock Android）でのeSIM設定手順",
        body: "Google PixelのStock Android環境でのeSIM設定手順は以下の通りです。\n\n1. 「設定」アプリを開きます。\n2. 「ネットワークとインターネット」をタップします。\n3. 「SIM」をタップし、「SIMを追加」（または「+」ボタン）を選択します。\n4. 「SIMをダウンロードしますか？」の画面で「次へ」をタップします。\n5. QRコードスキャン画面が表示されるので、AutoWiFi eSIMのQRコードをスキャンします。\n6. eSIMプロファイルのダウンロードが完了したら、「設定」をタップして有効化します。\n7. モバイルデータに使用するSIMとしてeSIMを選択します。\n\nPixel端末はStock Androidを搭載しているため、設定手順が最もシンプルです。Android 13以降ではeSIM転送機能にも対応しており、旧端末から新端末へeSIMを移行することも可能です。"
      },
      {
        title: "その他メーカー（OPPO・Xiaomi・Sony）での設定手順",
        body: "OPPO、Xiaomi、Sonyなど、その他のメーカーでも基本的な設定の流れは同じです。\n\nOPPO（ColorOS）: 「設定」→「SIMカードおよびモバイルデータ」→「SIMを追加」→「QRコードをスキャン」。ColorOS 13以降では、eSIM設定画面へのアクセスがより直感的になっています。\n\nXiaomi（MIUI / HyperOS）: 「設定」→「SIMカードとモバイルネットワーク」→「SIMカードを追加」→「eSIMを追加」。MIUI 14以降でeSIM対応が本格化しました。\n\nSony Xperia: 「設定」→「ネットワークとインターネット」→「SIM」→「SIMを追加」→「QRコードをスキャン」。XperiaはStock Androidに近いUIを採用しており、Pixelと似た手順で設定できます。\n\nいずれのメーカーでも、QRコードをスキャンしてeSIMプロファイルをダウンロードする点は共通です。設定中はWi-Fiまたはモバイルデータへの接続が必要です。"
      },
      {
        title: "AndroidでのデュアルSIM管理のコツ",
        body: "Android端末でeSIMと物理SIMを併用する場合、デュアルSIM管理が重要です。以下のコツを押さえておくと便利です。\n\nデータ通信用SIMの切り替え: 「設定」→「SIMカードマネージャー」（または「SIM」）から、モバイルデータに使用するSIMを選択できます。海外旅行中はeSIMをデータ通信用に、物理SIMを電話・SMS用に設定するのがおすすめです。\n\nデータローミングの有効化: eSIMでの通信を開始するには、「モバイルデータ」と「データローミング」の両方をONにする必要があります。「設定」→「接続」→「モバイルネットワーク」→eSIMを選択→「データローミング」をONにしてください。\n\nバッテリー節約のコツ: 使用しないSIMはOFFにすることでバッテリー消費を抑えられます。帰国後は旅行用eSIMをOFFにするか削除してください。\n\n通知の管理: デュアルSIM利用時は、どちらのSIMで通知を受け取るか設定できます。旅行中はeSIMでデータ通知、物理SIMで電話通知と分けると便利です。"
      },
      {
        title: "トラブルシューティング",
        body: "eSIM設定でよくあるトラブルとその解決法を紹介します。\n\nQRコードが読み取れない: 画面の明るさを上げ、QRコードを画面いっぱいに表示してください。スクリーンショットからのスキャンがうまくいかない場合は、別のデバイスでQRコードを表示してスキャンしてみてください。\n\neSIMのダウンロードに失敗する: Wi-Fi接続が安定しているか確認してください。VPN接続中は失敗する場合があるため、一時的にVPNをOFFにしてからリトライしてください。\n\n「eSIMを追加」メニューが表示されない: お使いの端末がeSIMに対応しているか確認してください。キャリアモデルではeSIM機能がロックされている場合があります。端末のソフトウェアを最新バージョンにアップデートしてみてください。\n\neSIMでデータ通信ができない: APN設定が正しく構成されているか確認してください。AutoWiFi eSIMではAPNは自動設定されますが、手動設定が必要な場合はサポートにお問い合わせください。また、「モバイルデータ」と「データローミング」がONになっているか再確認してください。\n\n端末を再起動すると解決する場合も多いため、設定後に通信できない場合はまず再起動をお試しください。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "AndroidでeSIMを設定するにはWi-Fiが必要ですか？", a: "はい、eSIMプロファイルのダウンロードにはインターネット接続が必要です。Wi-Fiまたは既存のモバイルデータ接続を利用してください。出発前にWi-Fi環境でダウンロードしておくことをおすすめします。" },
      { q: "eSIMは何個までインストールできますか？", a: "端末によって異なりますが、多くのAndroid端末で5個以上のeSIMプロファイルを保存できます。ただし、同時にアクティブにできるeSIMは通常1つです（デュアルSIM対応機種の場合はeSIM1つ+物理SIM1つ）。" },
      { q: "キャリアで購入したAndroidでもeSIMを使えますか？", a: "キャリアモデルではeSIM機能が制限されている場合があります。特にSIMロックがかかっている端末ではeSIMが利用できないことがあります。SIMロック解除済みか、端末がeSIMに対応しているかをキャリアに確認してください。" },
      { q: "eSIMを削除して再インストールできますか？", a: "eSIMプロファイルを削除すると、同じQRコードでは再インストールできない場合があります。削除する前にAutoWiFi eSIMサポートにご連絡ください。新しいQRコードを発行いたします。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでAndroid端末をすぐにセットアップ。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "Android eSIM設定ガイド",
  },
  en: {
    title: "How to Set Up eSIM on Android - Samsung Galaxy & Google Pixel Guide",
    subtitle: "Step-by-step eSIM setup instructions for every major Android manufacturer",
    intro: "Setting up an eSIM on Android varies depending on your device manufacturer. Whether you have a Samsung Galaxy, Google Pixel, or another Android phone, this guide walks you through the exact steps for each UI. Android devices use different settings interfaces like Samsung OneUI, Stock Android, ColorOS, and MIUI, which can make the process confusing for first-time users. We cover supported models, manufacturer-specific setup steps, dual SIM management tips, and common troubleshooting solutions. With AutoWiFi eSIM, setup takes just a few minutes.",
    sections: [
      {
        title: "Supported Android Models for eSIM",
        body: "The number of Android devices supporting eSIM grows every year. Here are the major supported models.\n\nSamsung Galaxy: Galaxy S20 and later (S20, S21, S22, S23, S24, S25 series), all Galaxy Z Flip and Z Fold models, Galaxy Note 20 and later, and select A-series models starting with the A54 5G. Note that carrier-locked models may have eSIM functionality disabled.\n\nGoogle Pixel: All Pixel models from Pixel 3a onward (Pixel 3a, 4, 4a, 5, 5a, 6, 6a, 6 Pro, 7, 7a, 7 Pro, 8, 8a, 8 Pro, 9, 9 Pro). Pixel devices were among the first to support eSIM and offer the smoothest setup experience.\n\nOther manufacturers: OPPO Find X3 Pro and later, Xiaomi 12T Pro and later, Sony Xperia 1 IV and later, HUAWEI P40 Pro and later (without Google services), and motorola razr 2022 and later. Availability varies by model and region, so check before purchasing."
      },
      {
        title: "eSIM Setup on Samsung Galaxy (OneUI)",
        body: "Follow these steps to set up an eSIM on Samsung Galaxy devices running OneUI.\n\n1. Open the Settings app.\n2. Tap Connections, then tap SIM Card Manager (or SIM Manager).\n3. Tap Add eSIM.\n4. Select Scan QR Code, then scan the QR code provided by AutoWiFi eSIM.\n5. The eSIM profile will begin downloading. You need an active Wi-Fi or mobile data connection.\n6. Once the download is complete, the eSIM will be activated. Select the eSIM as your mobile data SIM.\n\nOn OneUI 5 and later, the path is slightly different: Settings > Connections > SIM Manager > Add eSIM. Samsung's SIM Manager also lets you assign a custom label to your eSIM (for example, Travel eSIM) so you can easily identify it."
      },
      {
        title: "eSIM Setup on Google Pixel (Stock Android)",
        body: "Follow these steps to set up an eSIM on Google Pixel devices running Stock Android.\n\n1. Open the Settings app.\n2. Tap Network & Internet.\n3. Tap SIMs, then select Add SIM (or the + button).\n4. On the Download a SIM screen, tap Next.\n5. The QR code scanner will appear. Scan the QR code from AutoWiFi eSIM.\n6. After the eSIM profile finishes downloading, tap Settings to activate it.\n7. Select the eSIM as your mobile data SIM.\n\nPixel devices run Stock Android, making the setup process the most straightforward. On Android 13 and later, Pixel also supports eSIM transfer, allowing you to move an eSIM from an old device to a new one."
      },
      {
        title: "eSIM Setup on Other Manufacturers (OPPO, Xiaomi, Sony)",
        body: "Other Android manufacturers follow a similar overall flow for eSIM setup.\n\nOPPO (ColorOS): Settings > SIM Card & Mobile Data > Add SIM > Scan QR Code. ColorOS 13 and later offers a more intuitive path to the eSIM settings.\n\nXiaomi (MIUI / HyperOS): Settings > SIM Cards & Mobile Networks > Add SIM Card > Add eSIM. eSIM support became widely available starting with MIUI 14.\n\nSony Xperia: Settings > Network & Internet > SIMs > Add SIM > Scan QR Code. Xperia uses a near-stock Android interface, so the process is similar to Pixel.\n\nRegardless of manufacturer, the core process is the same: scan the QR code and download the eSIM profile. You need a Wi-Fi or mobile data connection during setup."
      },
      {
        title: "Tips for Managing Dual SIM on Android",
        body: "When using an eSIM alongside a physical SIM, effective dual SIM management is key. Here are the essentials.\n\nSwitching the data SIM: Go to Settings > SIM Card Manager (or SIMs) to select which SIM handles mobile data. When traveling abroad, set the eSIM for data and keep the physical SIM for calls and SMS.\n\nEnabling data roaming: To use your eSIM abroad, you must turn on both Mobile Data and Data Roaming. Go to Settings > Connections > Mobile Networks, select your eSIM, and enable Data Roaming.\n\nBattery optimization: Disable any SIM you are not actively using to reduce battery drain. After returning home, turn off or delete the travel eSIM.\n\nNotification management: With dual SIM, you can configure which SIM receives notifications. While traveling, use the eSIM for data notifications and the physical SIM for call alerts."
      },
      {
        title: "Troubleshooting Common Issues",
        body: "Here are the most common eSIM setup issues on Android and how to fix them.\n\nQR code won't scan: Increase your screen brightness and display the QR code at full size. If scanning a screenshot does not work, display the QR code on a separate device and scan it from there.\n\neSIM download fails: Ensure your Wi-Fi connection is stable. If you are using a VPN, turn it off temporarily and retry the download.\n\nAdd eSIM option is missing: Verify that your device supports eSIM. Carrier-locked models may have the eSIM feature disabled. Update your device software to the latest version.\n\nNo data connection after setup: Check that the APN settings are configured correctly. AutoWiFi eSIM sets the APN automatically, but if manual configuration is needed, contact support. Also confirm that both Mobile Data and Data Roaming are turned on.\n\nA simple restart often resolves connectivity issues after setup, so try rebooting your device if you cannot connect."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Do I need Wi-Fi to set up an eSIM on Android?", a: "Yes, downloading the eSIM profile requires an internet connection. Use Wi-Fi or an existing mobile data connection. We recommend downloading before your trip while on a stable Wi-Fi network." },
      { q: "How many eSIMs can I install on my Android phone?", a: "This varies by device, but most Android phones can store 5 or more eSIM profiles. However, only one eSIM is typically active at a time (plus one physical SIM on dual-SIM devices)." },
      { q: "Can I use eSIM on a carrier-locked Android phone?", a: "Carrier-locked devices may have restricted eSIM functionality. Phones with an active SIM lock may not support eSIM at all. Contact your carrier to confirm whether your device is unlocked and eSIM-capable." },
      { q: "Can I delete and reinstall an eSIM?", a: "Once you delete an eSIM profile, you may not be able to reinstall it using the same QR code. Contact AutoWiFi eSIM support before deleting, and we will issue a new QR code if needed." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Set up your Android device with AutoWiFi eSIM in minutes.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Android eSIM Setup Guide",
  },
  ko: {
    title: "Android에서 eSIM 설정하는 방법 - Samsung Galaxy・Google Pixel 가이드",
    subtitle: "제조사별 Android eSIM 설정 방법을 상세히 안내합니다",
    intro: "Android 스마트폰에서 eSIM을 설정하는 방법을 Samsung Galaxy, Google Pixel 등 제조사별로 알기 쉽게 설명합니다. Android 기기는 제조사마다 UI가 다르기 때문에 처음 eSIM을 설정하는 분은 어려움을 겪을 수 있습니다. 이 가이드에서는 주요 제조사별 설정 절차, 지원 기종, 듀얼 SIM 관리 팁, 자주 발생하는 문제 해결법까지 종합적으로 안내합니다. AutoWiFi eSIM QR 코드를 사용하면 몇 분 안에 설정이 완료됩니다.",
    sections: [
      {
        title: "eSIM 지원 Android 모델 목록",
        body: "eSIM을 지원하는 Android 기기는 매년 증가하고 있습니다. 주요 지원 기종은 다음과 같습니다.\n\nSamsung Galaxy: Galaxy S20 이후(S20, S21, S22, S23, S24, S25 시리즈), Galaxy Z Flip / Z Fold 전 기종, Galaxy Note 20 이후, Galaxy A54 5G 이후 일부 A 시리즈. 통신사 모델은 eSIM 기능이 비활성화되어 있을 수 있습니다.\n\nGoogle Pixel: Pixel 3a 이후 모든 Pixel 시리즈(Pixel 3a, 4, 4a, 5, 5a, 6, 6a, 6 Pro, 7, 7a, 7 Pro, 8, 8a, 8 Pro, 9, 9 Pro). Pixel은 eSIM 지원의 선구자로 가장 원활한 설정 환경을 제공합니다.\n\n기타 제조사: OPPO Find X3 Pro 이후, Xiaomi 12T Pro 이후, Sony Xperia 1 IV 이후, HUAWEI P40 Pro 이후(Google 미지원), motorola razr 2022 이후. 지원 여부는 모델과 지역에 따라 다르므로 구매 전 확인을 권장합니다."
      },
      {
        title: "Samsung Galaxy(OneUI)에서의 eSIM 설정 절차",
        body: "Samsung Galaxy의 OneUI에서 eSIM을 설정하는 방법은 다음과 같습니다.\n\n1. 설정 앱을 엽니다.\n2. '연결' → 'SIM 카드 매니저'(또는 'SIM 매니저')를 탭합니다.\n3. 'eSIM 추가'를 탭합니다.\n4. 'QR 코드로 스캔'을 선택하고, AutoWiFi eSIM에서 받은 QR 코드를 카메라로 스캔합니다.\n5. eSIM 프로필 다운로드가 시작됩니다. Wi-Fi 또는 모바일 데이터에 연결되어 있어야 합니다.\n6. 다운로드 완료 후 eSIM이 활성화됩니다. 모바일 데이터용 SIM으로 eSIM을 선택하세요.\n\nOneUI 5 이상에서는 UI가 약간 변경되었습니다. '설정' → '연결' → 'SIM 매니저' → 'eSIM 추가'의 흐름입니다. Galaxy SIM 매니저에서는 eSIM에 알기 쉬운 이름(예: '여행용 eSIM')을 지정할 수도 있습니다."
      },
      {
        title: "Google Pixel(Stock Android)에서의 eSIM 설정 절차",
        body: "Google Pixel의 Stock Android에서 eSIM을 설정하는 방법은 다음과 같습니다.\n\n1. 설정 앱을 엽니다.\n2. '네트워크 및 인터넷'을 탭합니다.\n3. 'SIM'을 탭하고 'SIM 추가'(또는 '+' 버튼)를 선택합니다.\n4. 'SIM을 다운로드하시겠습니까?' 화면에서 '다음'을 탭합니다.\n5. QR 코드 스캔 화면이 나타나면 AutoWiFi eSIM의 QR 코드를 스캔합니다.\n6. eSIM 프로필 다운로드가 완료되면 '설정'을 탭하여 활성화합니다.\n7. 모바일 데이터에 사용할 SIM으로 eSIM을 선택합니다.\n\nPixel은 Stock Android를 탑재하고 있어 설정 절차가 가장 간단합니다. Android 13 이상에서는 eSIM 전송 기능도 지원되어 기존 기기에서 새 기기로 eSIM을 이전할 수 있습니다."
      },
      {
        title: "기타 제조사(OPPO·Xiaomi·Sony) 설정 절차",
        body: "OPPO, Xiaomi, Sony 등 기타 제조사에서도 기본적인 설정 흐름은 동일합니다.\n\nOPPO(ColorOS): '설정' → 'SIM 카드 및 모바일 데이터' → 'SIM 추가' → 'QR 코드 스캔'. ColorOS 13 이상에서는 eSIM 설정 화면에 더 직관적으로 접근할 수 있습니다.\n\nXiaomi(MIUI / HyperOS): '설정' → 'SIM 카드 및 모바일 네트워크' → 'SIM 카드 추가' → 'eSIM 추가'. MIUI 14 이후부터 eSIM 지원이 본격화되었습니다.\n\nSony Xperia: '설정' → '네트워크 및 인터넷' → 'SIM' → 'SIM 추가' → 'QR 코드 스캔'. Xperia는 Stock Android에 가까운 UI를 사용하여 Pixel과 비슷한 절차로 설정할 수 있습니다.\n\n어떤 제조사든 QR 코드를 스캔하여 eSIM 프로필을 다운로드하는 점은 공통입니다. 설정 중에는 Wi-Fi 또는 모바일 데이터 연결이 필요합니다."
      },
      {
        title: "Android에서의 듀얼 SIM 관리 팁",
        body: "Android 기기에서 eSIM과 물리 SIM을 함께 사용할 때 듀얼 SIM 관리가 중요합니다. 알아두면 편리한 팁을 소개합니다.\n\n데이터 통신용 SIM 전환: '설정' → 'SIM 카드 매니저'(또는 'SIM')에서 모바일 데이터에 사용할 SIM을 선택할 수 있습니다. 해외여행 중에는 eSIM을 데이터 통신용으로, 물리 SIM을 전화·문자용으로 설정하는 것이 좋습니다.\n\n데이터 로밍 활성화: eSIM으로 통신을 시작하려면 '모바일 데이터'와 '데이터 로밍'을 모두 켜야 합니다. '설정' → '연결' → '모바일 네트워크' → eSIM 선택 → '데이터 로밍'을 켜세요.\n\n배터리 절약 팁: 사용하지 않는 SIM은 꺼두면 배터리 소모를 줄일 수 있습니다. 귀국 후에는 여행용 eSIM을 끄거나 삭제하세요.\n\n알림 관리: 듀얼 SIM 사용 시 어느 SIM으로 알림을 받을지 설정할 수 있습니다. 여행 중에는 eSIM으로 데이터 알림, 물리 SIM으로 전화 알림을 받도록 나누면 편리합니다."
      },
      {
        title: "문제 해결 가이드",
        body: "eSIM 설정에서 자주 발생하는 문제와 해결법을 안내합니다.\n\nQR 코드가 스캔되지 않을 때: 화면 밝기를 높이고 QR 코드를 화면 가득 표시하세요. 스크린샷 스캔이 안 되면 다른 기기에 QR 코드를 표시하고 스캔해 보세요.\n\neSIM 다운로드에 실패할 때: Wi-Fi 연결이 안정적인지 확인하세요. VPN 연결 중에는 실패할 수 있으므로 일시적으로 VPN을 끄고 다시 시도하세요.\n\n'eSIM 추가' 메뉴가 보이지 않을 때: 기기가 eSIM을 지원하는지 확인하세요. 통신사 모델은 eSIM 기능이 잠겨 있을 수 있습니다. 기기 소프트웨어를 최신 버전으로 업데이트해 보세요.\n\neSIM으로 데이터 통신이 안 될 때: APN 설정이 올바르게 구성되어 있는지 확인하세요. AutoWiFi eSIM은 APN을 자동 설정하지만, 수동 설정이 필요한 경우 고객 지원에 문의하세요. 또한 '모바일 데이터'와 '데이터 로밍'이 켜져 있는지 다시 확인하세요.\n\n설정 후 통신이 안 되면 기기를 재시작하면 해결되는 경우가 많습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "Android에서 eSIM을 설정하려면 Wi-Fi가 필요한가요?", a: "네, eSIM 프로필을 다운로드하려면 인터넷 연결이 필요합니다. Wi-Fi 또는 기존 모바일 데이터 연결을 사용하세요. 출발 전 Wi-Fi 환경에서 다운로드해 두는 것을 권장합니다." },
      { q: "eSIM은 몇 개까지 설치할 수 있나요?", a: "기기에 따라 다르지만 대부분의 Android 기기에서 5개 이상의 eSIM 프로필을 저장할 수 있습니다. 다만 동시에 활성화할 수 있는 eSIM은 보통 1개입니다(듀얼 SIM 기기의 경우 eSIM 1개 + 물리 SIM 1개)." },
      { q: "통신사에서 구매한 Android에서도 eSIM을 사용할 수 있나요?", a: "통신사 모델은 eSIM 기능이 제한되어 있을 수 있습니다. 특히 SIM 잠금이 걸려 있는 기기에서는 eSIM을 이용할 수 없는 경우가 있습니다. 기기의 잠금 해제 여부와 eSIM 지원 여부를 통신사에 확인하세요." },
      { q: "eSIM을 삭제하고 다시 설치할 수 있나요?", a: "eSIM 프로필을 삭제하면 동일한 QR 코드로 재설치할 수 없는 경우가 있습니다. 삭제 전에 AutoWiFi eSIM 고객 지원에 연락해 주세요. 새 QR 코드를 발급해 드립니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 Android 기기를 빠르게 설정하세요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "Android eSIM 설정 가이드",
  },
  zh: {
    title: "Android eSIM设置方法 - Samsung Galaxy与Google Pixel设置指南",
    subtitle: "按制造商详解Android设备的eSIM设置步骤",
    intro: "本指南按Samsung Galaxy、Google Pixel等制造商分别介绍Android手机的eSIM设置方法。由于Android设备的UI因制造商而异，首次设置eSIM的用户可能会感到困惑。本文涵盖主要制造商的设置步骤、支持机型、双卡管理技巧以及常见问题的解决方案。使用AutoWiFi eSIM的QR码，几分钟即可完成设置。",
    sections: [
      {
        title: "支持eSIM的Android机型列表",
        body: "支持eSIM的Android设备逐年增加。以下是主要支持机型。\n\nSamsung Galaxy: Galaxy S20及之后的型号（S20、S21、S22、S23、S24、S25系列）、Galaxy Z Flip / Z Fold全系列、Galaxy Note 20及之后的型号、Galaxy A54 5G及之后的部分A系列。运营商定制机型可能禁用了eSIM功能。\n\nGoogle Pixel: Pixel 3a及之后的所有Pixel系列（Pixel 3a、4、4a、5、5a、6、6a、6 Pro、7、7a、7 Pro、8、8a、8 Pro、9、9 Pro）。Pixel是最早支持eSIM的设备之一，设置体验最为流畅。\n\n其他制造商: OPPO Find X3 Pro及之后、Xiaomi 12T Pro及之后、Sony Xperia 1 IV及之后、HUAWEI P40 Pro及之后（不支持Google服务）、motorola razr 2022及之后。支持情况因型号和地区而异，建议购买前确认。"
      },
      {
        title: "Samsung Galaxy（OneUI）eSIM设置步骤",
        body: "以下是Samsung Galaxy OneUI环境下的eSIM设置步骤。\n\n1. 打开「设置」应用。\n2. 点击「连接」→「SIM卡管理器」（或「SIM管理器」）。\n3. 点击「添加eSIM」。\n4. 选择「扫描QR码」，用摄像头扫描AutoWiFi eSIM提供的QR码。\n5. eSIM配置文件开始下载。需要连接Wi-Fi或移动数据。\n6. 下载完成后eSIM将被激活。请将eSIM选为移动数据用SIM卡。\n\nOneUI 5及更高版本的路径略有不同：「设置」→「连接」→「SIM管理器」→「添加eSIM」。Galaxy的SIM管理器还允许您为eSIM设置自定义名称（例如「旅行eSIM」），方便识别。"
      },
      {
        title: "Google Pixel（Stock Android）eSIM设置步骤",
        body: "以下是Google Pixel Stock Android环境下的eSIM设置步骤。\n\n1. 打开「设置」应用。\n2. 点击「网络和互联网」。\n3. 点击「SIM卡」，然后选择「添加SIM卡」（或「+」按钮）。\n4. 在「要下载SIM卡吗？」界面点击「下一步」。\n5. 出现QR码扫描界面后，扫描AutoWiFi eSIM的QR码。\n6. eSIM配置文件下载完成后，点击「设置」进行激活。\n7. 将eSIM选为移动数据用SIM卡。\n\nPixel设备搭载Stock Android，设置过程最为简单。Android 13及更高版本还支持eSIM转移功能，可以将eSIM从旧设备迁移到新设备。"
      },
      {
        title: "其他制造商（OPPO、Xiaomi、Sony）设置步骤",
        body: "OPPO、Xiaomi、Sony等其他制造商的基本设置流程相同。\n\nOPPO（ColorOS）：「设置」→「SIM卡与移动数据」→「添加SIM卡」→「扫描QR码」。ColorOS 13及更高版本提供了更直观的eSIM设置入口。\n\nXiaomi（MIUI / HyperOS）：「设置」→「SIM卡和移动网络」→「添加SIM卡」→「添加eSIM」。从MIUI 14开始全面支持eSIM。\n\nSony Xperia：「设置」→「网络和互联网」→「SIM卡」→「添加SIM卡」→「扫描QR码」。Xperia采用接近Stock Android的UI，设置步骤与Pixel类似。\n\n无论哪个制造商，扫描QR码下载eSIM配置文件的核心步骤是相同的。设置过程中需要Wi-Fi或移动数据连接。"
      },
      {
        title: "Android双卡管理技巧",
        body: "在Android设备上同时使用eSIM和实体SIM卡时，双卡管理非常重要。以下是实用技巧。\n\n切换数据SIM卡：在「设置」→「SIM卡管理器」（或「SIM卡」）中选择用于移动数据的SIM卡。出国旅行时，建议将eSIM设为数据用，实体SIM卡设为电话和短信用。\n\n启用数据漫游：使用eSIM通信需要同时开启「移动数据」和「数据漫游」。前往「设置」→「连接」→「移动网络」→选择eSIM→开启「数据漫游」。\n\n节省电量：不使用的SIM卡可以关闭以减少电量消耗。回国后请关闭或删除旅行用eSIM。\n\n通知管理：使用双卡时可以设置由哪张SIM卡接收通知。旅行期间可以设置eSIM接收数据通知、实体SIM卡接收电话通知，方便管理。"
      },
      {
        title: "常见问题排查",
        body: "以下是Android eSIM设置中常见的问题及解决方法。\n\nQR码无法扫描：提高屏幕亮度，将QR码放大到全屏显示。如果截图扫描不成功，请在另一台设备上显示QR码后进行扫描。\n\neSIM下载失败：确认Wi-Fi连接是否稳定。使用VPN时可能导致下载失败，请暂时关闭VPN后重试。\n\n找不到「添加eSIM」选项：确认您的设备是否支持eSIM。运营商定制机型可能锁定了eSIM功能。请将设备软件更新到最新版本。\n\n设置后无法使用数据：检查APN设置是否正确。AutoWiFi eSIM会自动配置APN，但如需手动设置请联系客服。同时确认「移动数据」和「数据漫游」是否已开启。\n\n设置完成后无法连接时，重启设备往往能解决问题，请先尝试重启。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "Android设置eSIM需要Wi-Fi吗？", a: "需要，下载eSIM配置文件需要互联网连接。请使用Wi-Fi或现有的移动数据连接。建议出发前在稳定的Wi-Fi环境下完成下载。" },
      { q: "可以安装多少个eSIM？", a: "因设备而异，大多数Android设备可以存储5个以上的eSIM配置文件。但同时激活的eSIM通常只有1个（双卡设备为1个eSIM加1个实体SIM卡）。" },
      { q: "运营商购买的Android手机能用eSIM吗？", a: "运营商定制机型可能限制了eSIM功能。特别是有SIM锁的设备可能无法使用eSIM。请向运营商确认设备是否已解锁以及是否支持eSIM。" },
      { q: "eSIM删除后能重新安装吗？", a: "删除eSIM配置文件后，可能无法使用同一QR码重新安装。删除前请联系AutoWiFi eSIM客服，我们将为您发行新的QR码。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM快速设置您的Android设备。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "Android eSIM设置指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-android-setup", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="esim-android-setup" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
