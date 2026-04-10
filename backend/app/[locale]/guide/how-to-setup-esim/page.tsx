import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIMの設定方法 完全ガイド（iPhone・Android対応）",
    subtitle: "初めてでも安心！写真付きステップバイステップ解説",
    intro: "eSIMの設定は思っているより簡単です。このガイドでは、iPhone・Androidそれぞれの設定方法を、初めての方にもわかりやすくステップバイステップで解説します。出発前に設定を済ませておけば、渡航先に到着してすぐにインターネットを利用できます。所要時間はわずか5分程度です。本記事では初めてでも安心！写真付きステップバイステップ解説・設定前の準備・iPhoneでのeSIM設定方法などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "設定前の準備",
        body: "eSIMを設定する前に、いくつかの確認事項があります。まず、お使いのスマートフォンがeSIMに対応しているか確認しましょう。iPhoneの場合はXS以降、AndroidはGoogle Pixel 3以降やSamsung Galaxy S20以降などが対応しています。設定アプリのモバイル通信またはSIMカードの項目で確認できます。\n\n次に、安定したWiFi環境を用意してください。eSIMプロファイルのダウンロードにはインターネット接続が必要です。自宅のWiFiや空港のフリーWiFiなどで問題ありません。また、eSIM購入時に届いたQRコードまたはアクティベーションコードを手元に準備しておきましょう。\n\nSIMロックがかかっている端末ではeSIMが使えない場合があります。キャリアで購入した端末は、事前にSIMロック解除の手続きを済ませておくことをおすすめします。日本の主要キャリアではオンラインで無料解除が可能です。"
      },
      {
        title: "iPhoneでのeSIM設定方法",
        body: "iPhoneでeSIMを設定する手順は非常にシンプルです。まず設定アプリを開き、モバイル通信をタップします。次にモバイル通信プランを追加を選択し、購入時に届いたQRコードをカメラでスキャンします。QRコードが読み取れない場合は、詳細情報を手動で入力を選んでアクティベーションコードを入力することもできます。\n\nプロファイルがダウンロードされたら、そのプランにわかりやすい名前（例：旅行用データ）をつけることができます。デフォルト回線の設定では、普段の電話番号をメイン回線に、旅行用eSIMをデータ通信専用に設定するのがおすすめです。モバイルデータ通信の項目で旅行用eSIMを選択しましょう。\n\niOS 17以降では、eSIMクイック転送機能により、対応キャリアであればQRコード不要で直接eSIMを追加できる場合もあります。設定完了後、画面上部のステータスバーに2つの回線が表示されれば成功です。"
      },
      {
        title: "AndroidでのeSIM設定方法",
        body: "Androidの場合、メーカーや機種によって手順が若干異なりますが、基本的な流れは同じです。Google Pixelの場合は\"設定→ネットワークとインターネット\"→\"SIM\"→\"SIMを追加の順に進みます。Samsungの場合は設定→接続\"→\"SIMカードマネージャー\"→\"eSIMを追加\"から設定できます。\n\nQRコードのスキャン画面が表示されたら、購入時に届いたQRコードを読み取ります。手動入力の場合は、SMDPアドレスとアクティベーションコードを入力します。ダウンロードが完了したら、新しいプランが有効になっていることを確認し、モバイルデータに使用する回線として選択します。\n\nAndroidでは、機種によってeSIMの管理画面のデザインが異なることがありますが、どの端末でも設定アプリ内のネットワーク関連の項目からアクセスできます。設定後、通知バーを下にスワイプして接続状態を確認しましょう。"
      },
      {
        title: "渡航先での接続確認と最適化",
        body: "渡航先に到着したら、まずeSIMが正しく接続されているか確認しましょう。データローミングをオンにする必要がある場合があります。iPhoneでは設定→モバイル通信→旅行用プランを選択→データローミングをオンにします。Androidでも同様に、該当するSIMの設定からデータローミングを有効にしてください。\n\nバッテリー消費を抑えるため、普段使っているメイン回線のデータ通信はオフにしておくことをおすすめします。これにより、バックグラウンドでのデータ消費を防ぎ、旅行用eSIMのデータ量を節約できます。また、不要なアプリの自動更新もWiFi接続時のみに設定しておくと安心です。\n\n通信速度が遅いと感じたら、端末を一度機内モードにしてから解除してみてください。これにより、より良い電波の基地局に再接続される場合があります。それでも改善しない場合は、APN設定が正しいか確認するか、eSIMプロバイダーのサポートに問い合わせましょう。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMの設定にどのくらい時間がかかりますか？", a: "通常5分程度で設定完了します。QRコードを読み取ってプロファイルをダウンロードするだけなので、初めての方でも10分あれば十分です。事前にWiFi環境を用意しておくとスムーズです。" },
      { q: "eSIMを設定したら、元のSIMカードはどうなりますか？", a: "元のSIMカードはそのまま使えます。eSIMと物理SIMを同時に利用するデュアルSIM状態になり、電話は元の番号で、データ通信は旅行用eSIMでという使い分けが可能です。" },
      { q: "eSIMの設定は出発前にすべきですか？現地でもできますか？", a: "出発前にWiFi環境でeSIMプロファイルをダウンロードしておくことを強くおすすめします。現地でもWiFiがあれば設定できますが、空港に到着してすぐ使えるようにしておく方が安心です。" },
      { q: "設定したeSIMを削除したら再利用できますか？", a: "一般的に、一度削除したeSIMプロファイルは再ダウンロードが必要です。プロバイダーによっては再発行が有料になる場合があるため、旅行が終わるまでプロファイルは削除しないことをおすすめします。" }
    ],
    ctaTitle: "今すぐeSIMを設定しよう",
    ctaDesc: "AutoWiFi eSIMなら、200以上の国と地域で使えるプランをオンラインで即購入。QRコードで簡単設定、5分で準備完了です。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIMの設定方法"
  },
  en: {
    title: "Complete eSIM Setup Guide (iPhone & Android Step-by-Step)",
    subtitle: "Easy setup in under 5 minutes — even for first-timers",
    intro: "Setting up an eSIM is easier than you might think. This guide walks you through the entire process on both iPhone and Android, step by step. Complete the setup before your trip, and you will have internet access the moment you land at your destination. The whole process takes about 5 minutes.",
    sections: [
      {
        title: "Before You Start: Preparation Checklist",
        body: "Before setting up your eSIM, there are a few things to verify. First, confirm your smartphone supports eSIM. For iPhones, models XS and later are compatible. For Android, Google Pixel 3 and later, Samsung Galaxy S20 and later, and many other devices from 2018 onward support eSIM. You can check in your phone's Settings under Cellular or SIM Cards.\n\nNext, make sure you have a stable WiFi connection. Downloading the eSIM profile requires internet access, so your home WiFi or airport WiFi will work fine. Also have your QR code or activation code ready — this was provided when you purchased your eSIM plan.\n\nIf your phone was purchased through a carrier, it may be SIM-locked. Contact your carrier to unlock it before attempting eSIM setup. Most carriers offer free unlocking online or through their app. An unlocked phone ensures your eSIM will work without any issues."
      },
      {
        title: "How to Set Up eSIM on iPhone",
        body: "Setting up an eSIM on iPhone is straightforward. Open the Settings app and tap Cellular. Then tap Add Cellular Plan (or Add eSIM on newer iOS versions). Your camera will activate — point it at the QR code you received when purchasing your eSIM. If the QR code does not scan, tap Enter Details Manually and type in the activation code.\n\nOnce the profile downloads, you can assign a label to the plan (such as \"Travel Data\") for easy identification. When prompted about default lines, set your regular phone number as the primary line for calls and messages, and select the travel eSIM for mobile data only. Under Cellular Data, choose the travel eSIM.\n\nOn iOS 17 and later, eSIM Quick Transfer lets you add eSIMs from supported carriers without scanning a QR code. After setup, you should see two signal indicators in your status bar, confirming both lines are active. Your eSIM is now ready to use when you arrive at your destination."
      },
      {
        title: "How to Set Up eSIM on Android",
        body: "The process varies slightly across Android manufacturers, but the core steps are similar. On Google Pixel, go to Settings, then Network & internet, then SIMs, and tap the plus icon to add a SIM. On Samsung Galaxy, navigate to Settings, then Connections, then SIM card manager, and tap Add eSIM.\n\nWhen the QR scanner appears, scan the QR code from your eSIM purchase. For manual setup, enter the SM-DP+ address and activation code provided by your eSIM provider. Once the download completes, verify the new plan appears in your SIM list and select it for mobile data use.\n\nDifferent Android brands may have slightly different menu layouts, but you can always find eSIM settings within the network or connectivity section of the Settings app. After setup, pull down the notification shade to verify your connection status. You should see the new carrier name or signal indicator."
      },
      {
        title: "Connecting at Your Destination",
        body: "When you arrive at your destination, check that your eSIM is connected properly. You may need to enable data roaming for the travel eSIM to work. On iPhone, go to Settings, then Cellular, select your travel plan, and toggle Data Roaming on. On Android, find the corresponding SIM in your settings and enable data roaming there.\n\nTo conserve battery and data, consider disabling cellular data on your primary home SIM while abroad. This prevents background data usage on your main line and helps your travel eSIM data last longer. Also set app updates to WiFi-only in your app store settings to avoid unnecessary data consumption.\n\nIf you experience slow speeds, try toggling Airplane Mode on and off. This forces your phone to reconnect to local cell towers and often resolves connectivity issues. If problems persist, verify your APN settings are correct or contact your eSIM provider's support team for assistance."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "How long does eSIM setup take?", a: "Setup typically takes about 5 minutes. You simply scan a QR code and download the profile. Even first-time users can complete it in under 10 minutes. Make sure you have a WiFi connection for a smooth experience." },
      { q: "What happens to my regular SIM card after adding an eSIM?", a: "Your regular SIM card continues to work normally. Your phone operates in dual-SIM mode, allowing you to receive calls on your home number while using the travel eSIM for data. Both lines work simultaneously." },
      { q: "Should I set up the eSIM before departure or at my destination?", a: "We strongly recommend setting up before departure while you have WiFi access. While you can set up at your destination if WiFi is available, pre-setup ensures you have connectivity the moment you land." },
      { q: "Can I reuse a deleted eSIM profile?", a: "Generally, a deleted eSIM profile needs to be re-downloaded. Some providers may charge for re-issuing the profile, so we recommend keeping it installed until your trip is over." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM covers 200+ countries and regions. Purchase online instantly and set up in 5 minutes with a simple QR code scan.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "eSIM Setup Guide"
  },
  ko: {
    title: "eSIM 설정 방법 완전 가이드 (iPhone·Android 대응)",
    subtitle: "처음이어도 안심! 단계별로 쉽게 따라하기",
    intro: "eSIM 설정은 생각보다 간단합니다. 이 가이드에서는 iPhone과 Android 각각의 설정 방법을 초보자도 알기 쉽게 단계별로 설명합니다. 출발 전에 설정을 완료해두면 도착 즉시 인터넷을 사용할 수 있습니다. 소요 시간은 약 5분 정도입니다.",
    sections: [
      {
        title: "설정 전 준비사항",
        body: "eSIM을 설정하기 전에 몇 가지 확인 사항이 있습니다. 먼저 사용 중인 스마트폰이 eSIM을 지원하는지 확인하세요. iPhone의 경우 XS 이후, Android는 Google Pixel 3 이후, Samsung Galaxy S20 이후 등이 대응합니다. 설정 앱의 '셀룰러' 또는 'SIM 카드' 항목에서 확인할 수 있습니다.\n\n다음으로 안정적인 WiFi 환경을 준비하세요. eSIM 프로필 다운로드에는 인터넷 연결이 필요합니다. 집의 WiFi나 공항 무료 WiFi 등으로 충분합니다. 또한 eSIM 구매 시 받은 QR 코드 또는 활성화 코드를 준비해 두세요.\n\nSIM 잠금이 걸린 단말기에서는 eSIM을 사용할 수 없는 경우가 있습니다. 통신사에서 구매한 단말기는 사전에 SIM 잠금 해제 절차를 완료해 두는 것을 권장합니다. 대부분의 통신사에서 온라인으로 무료 해제가 가능합니다."
      },
      {
        title: "iPhone에서의 eSIM 설정 방법",
        body: "iPhone에서 eSIM을 설정하는 절차는 매우 간단합니다. '설정' 앱을 열고 '셀룰러'를 탭합니다. 그런 다음 '셀룰러 플랜 추가'를 선택하고 구매 시 받은 QR 코드를 카메라로 스캔합니다. QR 코드가 인식되지 않으면 '세부 정보를 수동으로 입력'을 선택하여 활성화 코드를 직접 입력할 수도 있습니다.\n\n프로필이 다운로드되면 해당 플랜에 알기 쉬운 이름(예: '여행용 데이터')을 지정할 수 있습니다. 기본 회선 설정에서는 평소 전화번호를 기본 회선으로, 여행용 eSIM을 데이터 통신 전용으로 설정하는 것을 추천합니다.\n\niOS 17 이후에서는 eSIM 빠른 전송 기능을 통해 지원 통신사라면 QR 코드 없이 직접 eSIM을 추가할 수도 있습니다. 설정 완료 후 화면 상단 상태바에 두 개의 회선이 표시되면 성공입니다."
      },
      {
        title: "Android에서의 eSIM 설정 방법",
        body: "Android의 경우 제조사나 기종에 따라 절차가 약간 다르지만 기본 흐름은 동일합니다. Google Pixel은 '설정' → '네트워크 및 인터넷' → 'SIM' → 'SIM 추가' 순서로 진행합니다. Samsung은 '설정' → '연결' → 'SIM 카드 관리자' → 'eSIM 추가'에서 설정할 수 있습니다.\n\nQR 코드 스캔 화면이 표시되면 구매 시 받은 QR 코드를 읽어들입니다. 수동 입력의 경우 SM-DP+ 주소와 활성화 코드를 입력합니다. 다운로드가 완료되면 새 플랜이 활성화되었는지 확인하고 모바일 데이터에 사용할 회선으로 선택합니다.\n\nAndroid에서는 기종에 따라 eSIM 관리 화면의 디자인이 다를 수 있지만 어떤 단말기든 '설정' 앱 내의 네트워크 관련 항목에서 접근할 수 있습니다. 설정 후 알림 바를 내려 연결 상태를 확인하세요."
      },
      {
        title: "도착지에서의 연결 확인 및 최적화",
        body: "목적지에 도착하면 먼저 eSIM이 올바르게 연결되었는지 확인하세요. 데이터 로밍을 켜야 할 수 있습니다. iPhone에서는 '설정' → '셀룰러' → 여행용 플랜 선택 → '데이터 로밍'을 켭니다. Android에서도 마찬가지로 해당 SIM 설정에서 데이터 로밍을 활성화하세요.\n\n배터리 소모를 줄이기 위해 평소 사용하는 메인 회선의 데이터 통신을 끄는 것을 권장합니다. 이를 통해 백그라운드 데이터 소비를 방지하고 여행용 eSIM의 데이터 용량을 절약할 수 있습니다. 또한 불필요한 앱의 자동 업데이트를 WiFi 연결 시에만 하도록 설정하면 안심입니다.\n\n통신 속도가 느리다고 느껴지면 단말기를 한 번 비행기 모드로 전환했다가 해제해 보세요. 이를 통해 더 나은 전파의 기지국에 재연결되는 경우가 있습니다. 그래도 개선되지 않으면 APN 설정이 올바른지 확인하거나 eSIM 제공업체의 고객 지원에 문의하세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "eSIM 설정에 시간이 얼마나 걸리나요?", a: "보통 5분 정도면 설정이 완료됩니다. QR 코드를 읽어 프로필을 다운로드하기만 하면 되므로 처음이라도 10분이면 충분합니다. 사전에 WiFi 환경을 준비해 두면 원활하게 진행됩니다." },
      { q: "eSIM을 설정하면 기존 SIM 카드는 어떻게 되나요?", a: "기존 SIM 카드는 그대로 사용할 수 있습니다. eSIM과 물리 SIM을 동시에 사용하는 듀얼 SIM 상태가 되어 전화는 기존 번호로, 데이터 통신은 여행용 eSIM으로 구분하여 사용할 수 있습니다." },
      { q: "eSIM 설정은 출발 전에 해야 하나요?", a: "출발 전에 WiFi 환경에서 eSIM 프로필을 다운로드해 두는 것을 강력히 권장합니다. 현지에서도 WiFi가 있으면 설정 가능하지만 공항 도착 후 바로 사용할 수 있도록 준비하는 것이 안심입니다." },
      { q: "설정한 eSIM을 삭제하면 재사용할 수 있나요?", a: "일반적으로 한 번 삭제한 eSIM 프로필은 재다운로드가 필요합니다. 제공업체에 따라 재발급이 유료인 경우가 있으므로 여행이 끝날 때까지 프로필을 삭제하지 않는 것을 권장합니다." }
    ],
    ctaTitle: "지금 eSIM을 설정하세요",
    ctaDesc: "AutoWiFi eSIM이라면 200개 이상의 국가와 지역에서 사용 가능한 플랜을 온라인으로 즉시 구매. QR 코드로 간단 설정, 5분이면 준비 완료.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM 설정 방법"
  },
  zh: {
    title: "eSIM设置方法完全指南（iPhone·Android通用）",
    subtitle: "新手也能轻松上手！分步骤详细教程",
    intro: "eSIM的设置比你想象的要简单得多。本指南将分别介绍iPhone和Android的设置方法，即使是第一次使用也能轻松完成。出发前完成设置，到达目的地后即可立即使用网络。整个过程只需约5分钟。",
    sections: [
      {
        title: "设置前的准备工作",
        body: "在设置eSIM之前，需要确认几件事。首先，确认您的手机是否支持eSIM。iPhone方面，XS及之后的机型均支持。Android方面，Google Pixel 3及之后、Samsung Galaxy S20及之后等2018年后发布的大多数机型都支持。可以在设置应用的蜂窝网络或SIM卡选项中查看。\n\n接下来，请准备稳定的WiFi环境。下载eSIM配置文件需要网络连接，家中的WiFi或机场免费WiFi都可以。同时准备好购买eSIM时收到的QR码或激活码。\n\n如果手机存在SIM锁定，可能无法使用eSIM。通过运营商购买的手机，建议提前完成SIM解锁手续。大多数运营商都支持在线免费解锁。"
      },
      {
        title: "iPhone上的eSIM设置方法",
        body: "在iPhone上设置eSIM的步骤非常简单。打开设置应用，点击蜂窝网络，然后选择添加蜂窝号码方案，用摄像头扫描购买时收到的QR码。如果QR码无法扫描，可以选择手动输入详细信息来输入激活码。\n\n配置文件下载完成后，可以为该方案设置一个容易识别的名称（如旅行数据）。在默认线路设置中，建议将日常电话号码设为主线路，将旅行用eSIM设为仅用于数据通信。在蜂窝数据选项中选择旅行用eSIM。\n\n在iOS 17及之后的版本中，eSIM快速转移功能可以让支持的运营商无需QR码即可直接添加eSIM。设置完成后，如果屏幕顶部状态栏显示两条线路，即表示设置成功。"
      },
      {
        title: "Android上的eSIM设置方法",
        body: "Android的设置步骤因制造商和机型略有不同，但基本流程相同。Google Pixel的路径是\"设置→网络和互联网\"→\"SIM\"→\"添加SIM\"。Samsung的路径是\"设置→连接\"→\"SIM卡管理器→添加eSIM\"。\n\n出现QR码扫描界面后，扫描购买时收到的QR码。如果需要手动输入，请输入SM-DP+地址和激活码。下载完成后，确认新方案已激活，并将其选择为移动数据使用的线路。\n\n不同品牌的Android手机eSIM管理界面的设计可能有所不同，但无论哪种设备，都可以从设置应用中的网络相关选项进入。设置完成后，下拉通知栏确认连接状态。"
      },
      {
        title: "到达目的地后的连接确认与优化",
        body: "到达目的地后，首先确认eSIM是否正确连接。可能需要开启数据漫游。在iPhone上，进入设置→蜂窝网络→选择旅行方案→开启数据漫游。Android上也同样，在相应SIM的设置中启用数据漫游。\n\n为了节省电量，建议关闭日常主线路的数据通信。这样可以防止后台数据消耗，节省旅行用eSIM的流量。同时将不必要的应用自动更新设置为仅在WiFi连接时进行。\n\n如果感觉网速较慢，尝试将手机切换到飞行模式再关闭。这样可以让手机重新连接到信号更好的基站。如果仍然没有改善，请检查APN设置是否正确，或联系eSIM提供商的客服。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM设置需要多长时间？", a: "通常约5分钟即可完成设置。只需扫描QR码下载配置文件，即使是第一次操作，10分钟也足够了。提前准备好WiFi环境可以更顺利地完成。" },
      { q: "设置eSIM后，原来的SIM卡会怎样？", a: "原来的SIM卡可以继续正常使用。手机会进入双SIM模式，可以用原号码接听电话，用旅行eSIM进行数据通信，两条线路同时工作。" },
      { q: "应该在出发前设置还是到达后设置？", a: "强烈建议在出发前有WiFi的环境下完成eSIM配置文件的下载。虽然在目的地有WiFi也可以设置，但提前准备好可以确保落地即可使用。" },
      { q: "删除已设置的eSIM后还能重新使用吗？", a: "通常删除后需要重新下载eSIM配置文件。部分提供商可能会收取重新发行费用，因此建议在旅行结束前不要删除配置文件。" }
    ],
    ctaTitle: "立即设置您的eSIM",
    ctaDesc: "AutoWiFi eSIM覆盖200多个国家和地区。在线即时购买，QR码扫描即可完成设置，5分钟搞定。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM设置方法"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/how-to-setup-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="how-to-setup-esim" content={CONTENT[loc]} />;
}
