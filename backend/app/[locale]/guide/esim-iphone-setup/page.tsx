import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "esim-android-setup", title: "AndroidでのeSIM設定方法" },
      { slug: "first-time-esim", title: "eSIM初心者ガイド" },
      { slug: "esim-compatible-phones", title: "eSIM対応スマートフォン一覧" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "esim-android-setup", title: "How to Set Up eSIM on Android" },
      { slug: "first-time-esim", title: "First-Time eSIM Guide" },
      { slug: "esim-compatible-phones", title: "eSIM Compatible Phones" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "esim-android-setup", title: "Android eSIM 설정 방법" },
      { slug: "first-time-esim", title: "eSIM 초보자 가이드" },
      { slug: "esim-compatible-phones", title: "eSIM 호환 스마트폰 목록" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "esim-android-setup", title: "Android eSIM设置方法" },
      { slug: "first-time-esim", title: "eSIM新手指南" },
      { slug: "esim-compatible-phones", title: "eSIM兼容手机列表" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "iPhoneでeSIMを設定する方法 - 完全ガイド",
    subtitle: "iPhone XR以降のモデルで使えるeSIMの設定手順を徹底解説",
    intro: "iPhoneはeSIM機能をいち早く採用したスマートフォンの一つで、iPhone XR・XS（2018年発売）以降のすべてのモデルがeSIMに対応しています。米国版iPhone 14以降は物理SIMトレイが廃止され、eSIM専用モデルとなっています。このガイドでは、iPhoneでのeSIM設定手順をステップごとに解説し、よくあるトラブルの対処法やデュアルSIM管理のコツもご紹介します。",
    sections: [
      {
        title: "eSIM対応iPhoneモデル一覧",
        body: "eSIMに対応しているiPhoneは以下のモデルです。iPhone XR、iPhone XS、iPhone XS Max、iPhone 11シリーズ（11、11 Pro、11 Pro Max）、iPhone SE（第2世代・第3世代）、iPhone 12シリーズ（12 mini、12、12 Pro、12 Pro Max）、iPhone 13シリーズ、iPhone 14シリーズ、iPhone 15シリーズ、iPhone 16シリーズが対応しています。\n\n米国版iPhone 14以降のモデルは物理SIMトレイが搭載されておらず、eSIMのみで通信します。これらのモデルでは最大8つのeSIMをインストールでき、同時に2回線を有効にできます。その他の地域で販売されたiPhone 14以降は、nano-SIMスロット1つとeSIMの組み合わせで利用可能です。\n\niPhoneがeSIMに対応しているか確認するには、「設定」→「一般」→「情報」を開き、「利用可能なSIM」の項目を確認してください。eSIM対応端末であれば、ここにeSIMの情報が表示されます。"
      },
      {
        title: "eSIMの設定手順（ステップバイステップ）",
        body: "手順1：「設定」アプリを開き、「モバイル通信」をタップします。\n\n手順2：「eSIMを追加」または「モバイル通信プランを追加」をタップします（iOSバージョンにより表示が異なります）。\n\n手順3：「QRコードを使用」を選択します。カメラが起動するので、購入時に届いたQRコードをスキャンしてください。QRコードが手元にない場合は、「詳細情報を手動で入力」を選択し、SM-DP+アドレスとアクティベーションコードを入力します。\n\n手順4：「モバイル通信プランを追加」の確認画面が表示されたら、「続ける」をタップします。\n\n手順5：プランにラベルを付けます。「旅行」「仕事」など分かりやすい名前を設定すると、複数のeSIMを管理する際に便利です。\n\n手順6：デフォルト回線の設定を行います。通話やメッセージに使用する回線と、モバイルデータ通信に使用する回線を選択します。旅行用eSIMの場合、モバイルデータ通信を新しいeSIMに設定しましょう。"
      },
      {
        title: "トラブルシューティング",
        body: "QRコードがスキャンできない場合：カメラのレンズが汚れていないか確認してください。QRコードを明るい場所で表示し、画面との距離を調整してみてください。それでもスキャンできない場合は、手動入力を試してください。SM-DP+アドレスとアクティベーションコードは購入確認メールに記載されています。\n\neSIMがアクティベートされない場合：安定したWiFiまたはモバイルデータ接続が必要です。インターネット接続を確認してください。iPhoneを再起動してから再度試してみてください。また、iOSが最新バージョンであることを確認してください。\n\n「このコードは有効ではありません」と表示される場合：QRコードがすでに使用されていないか確認してください。eSIMのQRコードは通常1回限り有効です。購入先に問い合わせて新しいQRコードの再発行を依頼してください。\n\neSIMインストール後にデータ通信ができない場合：「設定」→「モバイル通信」で該当のeSIMプランを選択し、「この回線をオンにする」がオンになっていることを確認します。「データローミング」もオンにしてください。APN設定が必要な場合は、購入先から提供された情報を入力してください。"
      },
      {
        title: "デュアルSIM管理のコツ",
        body: "iPhoneのデュアルSIM機能を使えば、普段の電話番号を保持しながら旅行先のeSIMでデータ通信を利用できます。「設定」→「モバイル通信」で各回線の用途を細かく設定可能です。\n\nモバイルデータ通信の切り替えは簡単です。「設定」→「モバイル通信」→「モバイルデータ通信」で、データ通信に使用する回線を選択します。「モバイルデータ通信の切り替えを許可」をオンにすると、主回線の電波が弱いときに自動的に副回線に切り替わります。\n\n連絡先ごとに使用する回線を設定することもできます。連絡先アプリで特定の相手を開き、「優先する回線」を選択してください。\n\n不要になったeSIMは「設定」→「モバイル通信」→該当プランを選択→「eSIMを削除」で削除できます。削除したeSIMは再インストールに新しいQRコードが必要になる場合があるため、旅行終了まで削除しないことをおすすめします。"
      },
      {
        title: "eSIMを使う前に知っておくべきこと",
        body: "eSIMのインストールにはインターネット接続が必要です。出発前にWiFi環境でeSIMをインストールしておくことを強くおすすめします。空港到着後に慌ててインストールする必要がなくなります。\n\neSIMは端末にデジタル情報として保存されるため、物理SIMカードのように紛失するリスクがありません。また、複数の国を訪問する場合、渡航先ごとにeSIMをインストールして切り替えることが可能です。\n\nAutoWiFi eSIMでは、購入後すぐにQRコードがメールで届きます。設定にかかる時間はわずか数分です。対応するiPhoneモデルをお持ちなら、今すぐeSIMを購入して旅行の準備を始めましょう。\n\niPhone上のeSIMは最大8つまでインストールでき、同時に2回線まで有効にできます。頻繁に海外旅行する方は、各国のeSIMをインストールしたまま保持し、渡航時に有効化するという使い方も便利です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "iPhoneでeSIMを設定するにはWiFiが必要ですか？", a: "はい、eSIMのダウンロードとアクティベーションにはインターネット接続が必要です。WiFiまたは既存のモバイルデータ接続をご利用ください。出発前にWiFi環境で設定しておくのがおすすめです。" },
      { q: "iPhoneに複数のeSIMをインストールできますか？", a: "はい、iPhone XR/XS以降のモデルでは複数のeSIMをインストールできます。iPhone 13以降では最大8つのeSIMを保存でき、同時に2回線を有効にできます。" },
      { q: "eSIMを削除して再インストールできますか？", a: "eSIMを削除することは可能ですが、再インストールには新しいQRコードが必要になる場合があります。旅行が終わるまでeSIMを削除せず、回線をオフにしておくことをおすすめします。" },
      { q: "iPhone SEはeSIMに対応していますか？", a: "iPhone SE（第2世代、2020年発売）以降がeSIMに対応しています。第1世代のiPhone SE（2016年発売）はeSIM非対応です。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMでiPhoneの設定はわずか数分。旅行前に準備しましょう。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "iPhoneのeSIM設定方法",
  },
  en: {
    title: "How to Set Up eSIM on iPhone - Complete Guide",
    subtitle: "Step-by-step eSIM setup instructions for iPhone XR and later",
    intro: "iPhone was one of the first smartphones to adopt eSIM technology, and every model from iPhone XR and XS (released in 2018) onward supports eSIM. US models of iPhone 14 and later have removed the physical SIM tray entirely, making them eSIM-only devices. This guide walks you through setting up an eSIM on your iPhone step by step, with troubleshooting tips and advice for managing dual SIM configurations.",
    sections: [
      {
        title: "Supported iPhone Models",
        body: "The following iPhone models support eSIM: iPhone XR, iPhone XS, iPhone XS Max, iPhone 11 series (11, 11 Pro, 11 Pro Max), iPhone SE (2nd and 3rd generation), iPhone 12 series (12 mini, 12, 12 Pro, 12 Pro Max), iPhone 13 series, iPhone 14 series, iPhone 15 series, and iPhone 16 series.\n\nUS models of iPhone 14 and later do not have a physical SIM tray and operate exclusively on eSIM. These models can store up to 8 eSIMs and have 2 active lines simultaneously. iPhone 14 and later sold outside the US include one nano-SIM slot alongside eSIM support.\n\nTo check if your iPhone supports eSIM, go to Settings > General > About and look for the Available SIMs section. If your device supports eSIM, the information will be displayed there."
      },
      {
        title: "Step-by-Step eSIM Setup",
        body: "Step 1: Open the Settings app and tap Cellular (or Mobile Data in some regions).\n\nStep 2: Tap Add eSIM or Add Cellular Plan (the wording varies by iOS version).\n\nStep 3: Select Use QR Code. Your camera will activate, so scan the QR code you received when purchasing your eSIM plan. If you do not have the QR code available, select Enter Details Manually and input the SM-DP+ address and activation code.\n\nStep 4: When the confirmation screen appears showing your new cellular plan, tap Continue.\n\nStep 5: Label your plan. Choose a descriptive name such as Travel or Work to make managing multiple eSIMs easier.\n\nStep 6: Configure your default line settings. Choose which line to use for calls and messages and which to use for cellular data. For a travel eSIM, set your new eSIM as the cellular data line."
      },
      {
        title: "Troubleshooting",
        body: "QR code not scanning: Make sure your camera lens is clean. Display the QR code in a well-lit area and adjust the distance between your phone and the code. If scanning still fails, try manual entry. The SM-DP+ address and activation code can be found in your purchase confirmation email.\n\neSIM not activating: A stable WiFi or mobile data connection is required. Check your internet connectivity and restart your iPhone, then try again. Also ensure your iOS is updated to the latest version.\n\nThis code is not valid error: Verify that the QR code has not already been used. eSIM QR codes are typically single-use. Contact your eSIM provider to request a new QR code.\n\nNo data connection after installing eSIM: Go to Settings > Cellular, select your eSIM plan, and confirm that Turn On This Line is enabled. Also enable Data Roaming. If an APN is required, enter the information provided by your eSIM provider."
      },
      {
        title: "Managing Dual SIM on iPhone",
        body: "iPhone's dual SIM feature lets you keep your regular phone number active while using a travel eSIM for data. You can configure each line's purpose in Settings > Cellular.\n\nSwitching cellular data between lines is simple. Go to Settings > Cellular > Cellular Data and select which line to use for data. Enabling Allow Cellular Data Switching lets your iPhone automatically switch to the other line when your primary line has weak signal.\n\nYou can also assign a preferred line for individual contacts. Open a contact in the Contacts app and select the Preferred Cellular Plan.\n\nTo remove an eSIM you no longer need, go to Settings > Cellular, select the plan, and tap Delete eSIM. Note that re-installing a deleted eSIM may require a new QR code, so keep your eSIM installed until your trip is over."
      },
      {
        title: "What to Know Before Using eSIM",
        body: "An internet connection is required to install an eSIM. We strongly recommend installing your eSIM over WiFi before departure so you do not have to set it up in a rush at the airport.\n\neSIMs are stored digitally on your device, so there is no risk of losing a physical SIM card. If you are visiting multiple countries, you can install a separate eSIM for each destination and switch between them as needed.\n\nWith AutoWiFi eSIM, your QR code is delivered by email immediately after purchase. Setup takes just a few minutes. If you have a compatible iPhone, purchase your eSIM now and get ready for your trip.\n\niPhone can store up to 8 eSIMs with 2 lines active simultaneously. Frequent travelers can keep eSIMs from various countries installed and simply activate the right one when traveling."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Do I need WiFi to set up eSIM on iPhone?", a: "Yes, downloading and activating an eSIM requires an internet connection. Use WiFi or an existing mobile data connection. We recommend setting up over WiFi before your departure." },
      { q: "Can I install multiple eSIMs on my iPhone?", a: "Yes, iPhone XR/XS and later can store multiple eSIMs. iPhone 13 and later can store up to 8 eSIMs with 2 lines active at the same time." },
      { q: "Can I delete and reinstall an eSIM?", a: "You can delete an eSIM, but reinstalling it may require a new QR code. We recommend keeping the eSIM installed and simply turning off the line until your trip ends." },
      { q: "Does iPhone SE support eSIM?", a: "iPhone SE 2nd generation (released 2020) and later support eSIM. The original iPhone SE (2016) does not support eSIM." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Set up your iPhone eSIM in minutes with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "iPhone eSIM Setup Guide",
  },
  ko: {
    title: "iPhone eSIM 설정 방법 - 완전 가이드",
    subtitle: "iPhone XR 이후 모든 모델의 eSIM 설정을 단계별로 안내합니다",
    intro: "iPhone은 eSIM 기능을 가장 먼저 채택한 스마트폰 중 하나로, iPhone XR/XS(2018년 출시) 이후 모든 모델이 eSIM을 지원합니다. 미국판 iPhone 14부터는 물리적 SIM 트레이가 제거되어 eSIM 전용 모델이 되었습니다. 이 가이드에서는 iPhone에서 eSIM을 설정하는 방법을 단계별로 안내하고, 자주 발생하는 문제의 해결 방법과 듀얼 SIM 관리 팁도 소개합니다.",
    sections: [
      {
        title: "eSIM 지원 iPhone 모델 목록",
        body: "eSIM을 지원하는 iPhone 모델은 다음과 같습니다. iPhone XR, iPhone XS, iPhone XS Max, iPhone 11 시리즈(11, 11 Pro, 11 Pro Max), iPhone SE(2세대, 3세대), iPhone 12 시리즈(12 mini, 12, 12 Pro, 12 Pro Max), iPhone 13 시리즈, iPhone 14 시리즈, iPhone 15 시리즈, iPhone 16 시리즈가 지원됩니다.\n\n미국판 iPhone 14 이후 모델은 물리적 SIM 트레이가 없으며 eSIM만으로 통신합니다. 이 모델들은 최대 8개의 eSIM을 설치할 수 있고 동시에 2회선을 활성화할 수 있습니다. 미국 외 지역에서 판매된 iPhone 14 이후 모델은 nano-SIM 슬롯 1개와 eSIM을 함께 사용할 수 있습니다.\n\niPhone이 eSIM을 지원하는지 확인하려면 '설정' → '일반' → '정보'를 열고 '사용 가능한 SIM' 항목을 확인하세요. eSIM 지원 기기라면 여기에 eSIM 정보가 표시됩니다."
      },
      {
        title: "eSIM 설정 단계별 안내",
        body: "1단계: '설정' 앱을 열고 '셀룰러'를 탭합니다.\n\n2단계: 'eSIM 추가' 또는 '셀룰러 요금제 추가'를 탭합니다(iOS 버전에 따라 표시가 다를 수 있습니다).\n\n3단계: 'QR 코드 사용'을 선택합니다. 카메라가 실행되면 구매 시 받은 QR 코드를 스캔하세요. QR 코드가 없는 경우 '세부 사항 수동 입력'을 선택하고 SM-DP+ 주소와 활성화 코드를 입력합니다.\n\n4단계: 새 셀룰러 요금제 확인 화면이 나타나면 '계속'을 탭합니다.\n\n5단계: 요금제에 레이블을 지정합니다. '여행', '업무' 등 알기 쉬운 이름을 설정하면 여러 eSIM을 관리할 때 편리합니다.\n\n6단계: 기본 회선 설정을 합니다. 전화와 메시지에 사용할 회선과 모바일 데이터에 사용할 회선을 선택합니다. 여행용 eSIM의 경우 모바일 데이터를 새 eSIM으로 설정하세요."
      },
      {
        title: "문제 해결",
        body: "QR 코드가 스캔되지 않는 경우: 카메라 렌즈가 깨끗한지 확인하세요. QR 코드를 밝은 곳에서 표시하고 화면과의 거리를 조절해 보세요. 그래도 스캔이 안 되면 수동 입력을 시도하세요. SM-DP+ 주소와 활성화 코드는 구매 확인 이메일에 기재되어 있습니다.\n\neSIM이 활성화되지 않는 경우: 안정적인 WiFi 또는 모바일 데이터 연결이 필요합니다. 인터넷 연결을 확인하고 iPhone을 재시작한 후 다시 시도하세요. iOS가 최신 버전인지도 확인하세요.\n\n'이 코드는 유효하지 않습니다' 오류: QR 코드가 이미 사용되지 않았는지 확인하세요. eSIM QR 코드는 일반적으로 1회만 사용 가능합니다. 구매처에 문의하여 새 QR 코드 재발급을 요청하세요.\n\neSIM 설치 후 데이터 통신이 안 되는 경우: '설정' → '셀룰러'에서 해당 eSIM 요금제를 선택하고 '이 회선 켜기'가 활성화되어 있는지 확인합니다. '데이터 로밍'도 켜 주세요. APN 설정이 필요한 경우 구매처에서 제공한 정보를 입력하세요."
      },
      {
        title: "듀얼 SIM 관리 팁",
        body: "iPhone의 듀얼 SIM 기능을 사용하면 기존 전화번호를 유지하면서 여행지의 eSIM으로 데이터 통신을 이용할 수 있습니다. '설정' → '셀룰러'에서 각 회선의 용도를 세부적으로 설정할 수 있습니다.\n\n모바일 데이터 회선 전환은 간단합니다. '설정' → '셀룰러' → '셀룰러 데이터'에서 데이터 통신에 사용할 회선을 선택합니다. '셀룰러 데이터 전환 허용'을 켜면 주 회선의 신호가 약할 때 자동으로 부 회선으로 전환됩니다.\n\n연락처별로 사용할 회선을 설정할 수도 있습니다. 연락처 앱에서 특정 연락처를 열고 '기본 셀룰러 요금제'를 선택하세요.\n\n필요 없어진 eSIM은 '설정' → '셀룰러' → 해당 요금제 선택 → 'eSIM 삭제'로 삭제할 수 있습니다. 삭제한 eSIM을 재설치하려면 새 QR 코드가 필요할 수 있으므로 여행이 끝날 때까지 삭제하지 않는 것을 권장합니다."
      },
      {
        title: "eSIM 사용 전 알아두어야 할 점",
        body: "eSIM 설치에는 인터넷 연결이 필요합니다. 출발 전 WiFi 환경에서 eSIM을 설치해 두는 것을 강력히 권장합니다. 공항 도착 후 서둘러 설치할 필요가 없어집니다.\n\neSIM은 기기에 디지털 정보로 저장되므로 물리적 SIM 카드처럼 분실할 위험이 없습니다. 여러 나라를 방문하는 경우 각 목적지별로 eSIM을 설치하고 전환하며 사용할 수 있습니다.\n\nAutoWiFi eSIM에서는 구매 후 즉시 QR 코드가 이메일로 전달됩니다. 설정에 걸리는 시간은 단 몇 분입니다. 호환되는 iPhone 모델을 가지고 있다면 지금 바로 eSIM을 구매하고 여행 준비를 시작하세요.\n\niPhone에는 최대 8개의 eSIM을 설치할 수 있고 동시에 2회선까지 활성화할 수 있습니다. 해외 여행을 자주 하는 분은 각국의 eSIM을 설치한 채로 유지하고 여행 시 활성화하는 방법도 편리합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "iPhone eSIM 설정에 WiFi가 필요한가요?", a: "네, eSIM 다운로드와 활성화에는 인터넷 연결이 필요합니다. WiFi 또는 기존 모바일 데이터 연결을 이용하세요. 출발 전 WiFi 환경에서 설정하는 것을 권장합니다." },
      { q: "iPhone에 여러 개의 eSIM을 설치할 수 있나요?", a: "네, iPhone XR/XS 이후 모델은 여러 eSIM을 설치할 수 있습니다. iPhone 13 이후는 최대 8개의 eSIM을 저장하고 동시에 2회선을 활성화할 수 있습니다." },
      { q: "eSIM을 삭제 후 재설치할 수 있나요?", a: "eSIM 삭제는 가능하지만 재설치에는 새 QR 코드가 필요할 수 있습니다. 여행이 끝날 때까지 eSIM을 삭제하지 말고 회선만 꺼 두는 것을 권장합니다." },
      { q: "iPhone SE는 eSIM을 지원하나요?", a: "iPhone SE 2세대(2020년 출시) 이후가 eSIM을 지원합니다. 1세대 iPhone SE(2016년 출시)는 eSIM을 지원하지 않습니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 iPhone 설정은 단 몇 분. 여행 전 미리 준비하세요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "iPhone eSIM 설정 방법",
  },
  zh: {
    title: "iPhone eSIM设置方法 - 完整指南",
    subtitle: "iPhone XR及更新机型的eSIM设置步骤详解",
    intro: "iPhone是最早支持eSIM功能的智能手机之一，从iPhone XR和XS（2018年发布）起，所有后续机型均支持eSIM。美国版iPhone 14及更新机型已取消物理SIM卡槽，成为纯eSIM设备。本指南将逐步讲解iPhone上的eSIM设置方法，并提供常见问题的解决方案和双卡管理技巧。",
    sections: [
      {
        title: "支持eSIM的iPhone机型列表",
        body: "以下iPhone机型支持eSIM：iPhone XR、iPhone XS、iPhone XS Max、iPhone 11系列（11、11 Pro、11 Pro Max）、iPhone SE（第2代和第3代）、iPhone 12系列（12 mini、12、12 Pro、12 Pro Max）、iPhone 13系列、iPhone 14系列、iPhone 15系列、iPhone 16系列。\n\n美国版iPhone 14及更新机型没有物理SIM卡槽，完全通过eSIM通信。这些机型最多可安装8个eSIM，同时激活2条线路。美国以外地区销售的iPhone 14及更新机型保留了1个nano-SIM卡槽，可与eSIM配合使用。\n\n要确认您的iPhone是否支持eSIM，请前往「设置」→「通用」→「关于本机」，查看「可用SIM」部分。如果设备支持eSIM，相关信息会显示在这里。"
      },
      {
        title: "eSIM设置步骤详解",
        body: "第1步：打开「设置」应用，点击「蜂窝网络」。\n\n第2步：点击「添加eSIM」或「添加蜂窝号码方案」（显示文字因iOS版本而异）。\n\n第3步：选择「使用二维码」。相机会启动，请扫描购买时收到的QR码。如果没有QR码，请选择「手动输入详细信息」，输入SM-DP+地址和激活码。\n\n第4步：当显示新蜂窝号码方案的确认界面时，点击「继续」。\n\n第5步：为方案添加标签。设置一个易于识别的名称，如「旅行」或「工作」，方便管理多个eSIM。\n\n第6步：配置默认线路设置。选择用于通话和短信的线路，以及用于蜂窝数据的线路。对于旅行eSIM，建议将蜂窝数据设置为新的eSIM线路。"
      },
      {
        title: "故障排除",
        body: "QR码无法扫描：请确认相机镜头是否干净。在光线充足的地方显示QR码，并调整手机与QR码之间的距离。如果仍然无法扫描，请尝试手动输入。SM-DP+地址和激活码可在购买确认邮件中找到。\n\neSIM无法激活：需要稳定的WiFi或移动数据连接。请检查网络连接，重启iPhone后再试。同时确认iOS已更新到最新版本。\n\n显示「此代码无效」错误：请确认QR码是否已被使用。eSIM的QR码通常只能使用一次。请联系购买方申请重新发放新的QR码。\n\n安装eSIM后无法使用数据：前往「设置」→「蜂窝网络」，选择对应的eSIM方案，确认「开启此线路」已打开。同时开启「数据漫游」。如果需要APN设置，请输入购买方提供的信息。"
      },
      {
        title: "双卡管理技巧",
        body: "利用iPhone的双卡功能，您可以在保留日常电话号码的同时，使用旅行eSIM进行数据通信。在「设置」→「蜂窝网络」中可以详细设置每条线路的用途。\n\n切换移动数据线路非常简单。前往「设置」→「蜂窝网络」→「蜂窝数据」，选择用于数据通信的线路。开启「允许蜂窝数据切换」后，当主线路信号较弱时会自动切换到副线路。\n\n您还可以为每个联系人设置首选线路。在通讯录中打开某个联系人，选择「首选蜂窝号码方案」即可。\n\n不再需要的eSIM可以通过「设置」→「蜂窝网络」→选择对应方案→「删除eSIM」来删除。请注意，重新安装已删除的eSIM可能需要新的QR码，因此建议在旅行结束前不要删除。"
      },
      {
        title: "使用eSIM前须知",
        body: "安装eSIM需要互联网连接。我们强烈建议在出发前通过WiFi安装eSIM，这样就不必在机场匆忙设置。\n\neSIM以数字信息形式存储在设备中，不存在丢失物理SIM卡的风险。如果您要访问多个国家，可以为每个目的地安装单独的eSIM并按需切换。\n\n使用AutoWiFi eSIM，购买后QR码会立即通过邮件发送。设置只需几分钟。如果您拥有兼容的iPhone机型，现在就购买eSIM，为旅行做好准备吧。\n\niPhone最多可安装8个eSIM，同时激活2条线路。经常出国旅行的用户可以将各国的eSIM保留在设备上，出行时直接激活即可。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "iPhone设置eSIM需要WiFi吗？", a: "需要，eSIM的下载和激活需要互联网连接。请使用WiFi或现有的移动数据连接。建议在出发前通过WiFi完成设置。" },
      { q: "iPhone可以安装多个eSIM吗？", a: "可以，iPhone XR/XS及更新机型支持安装多个eSIM。iPhone 13及更新机型最多可存储8个eSIM，同时激活2条线路。" },
      { q: "eSIM删除后可以重新安装吗？", a: "可以删除eSIM，但重新安装可能需要新的QR码。建议在旅行结束前不要删除eSIM，只需关闭线路即可。" },
      { q: "iPhone SE支持eSIM吗？", a: "iPhone SE第2代（2020年发布）及之后的机型支持eSIM。初代iPhone SE（2016年发布）不支持eSIM。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM，iPhone设置只需几分钟。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "iPhone eSIM设置指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-iphone-setup", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="esim-iphone-setup" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
