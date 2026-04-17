import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIM対応スマートフォン一覧【2026年最新版】",
    subtitle: "iPhone・Samsung・Google Pixel・その他メーカーの対応機種を網羅",
    intro: "eSIMを使うには対応スマートフォンが必要です。この記事では、主要メーカー別にeSIM対応機種を完全リストアップしました。お使いのスマートフォンが対応しているか、すぐに確認できます。2018年以降に発売されたスマートフォンの多くが対応しており、対応機種は年々増加しています。本記事ではiPhone・Samsung・Google Pixel・その他メーカーの対応機種を網羅・iPhone（Apple）のeSIM対応機種・Samsung GalaxyのeSIM対応機種などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "iPhone（Apple）のeSIM対応機種",
        body: "AppleはeSIM技術の普及を積極的にリードしてきたメーカーの一つです。iPhone XS、iPhone XS Max、iPhone XR（2018年発売）以降のすべてのiPhoneがeSIMに対応しています。具体的には、iPhone XS/XS Max/XR、iPhone 11シリーズ、iPhone 12シリーズ、iPhone SE（第2世代・第3世代）、iPhone 13シリーズ、iPhone 14シリーズ、iPhone 15シリーズ、iPhone 16シリーズが対応しています。\n\n特にiPhone 13以降のモデルはデュアルeSIMに対応しており、2つのeSIMを同時に使用できます。また、米国版のiPhone 14以降は物理SIMスロットがなく、eSIMのみの仕様となっています。日本版は引き続きnano-SIMスロットとeSIMの両方を搭載しています。\n\neSIMの対応状況は、設定→一般→情報でEIDの項目があるか、または設定→モバイル通信→モバイル通信プランを追加の項目があるかで確認できます。"
      },
      {
        title: "Samsung GalaxyのeSIM対応機種",
        body: "SamsungはGalaxy S20シリーズ（2020年発売）からeSIMのサポートを本格的に開始しました。Galaxy S20、S21、S22、S23、S24、S25の各シリーズ（通常モデル、+モデル、Ultraモデル）がeSIMに対応しています。ただし、一部の国や通信キャリア向けモデルではeSIM機能が無効化されている場合があるため、購入元のキャリアに確認することをおすすめします。\n\n折りたたみスマートフォンでは、Galaxy Z Flip3以降、Galaxy Z Fold3以降の各モデルがeSIMに対応しています。Galaxy Noteシリーズでは、Note 20以降が対応しています。GalaxyのAシリーズなどミッドレンジモデルでも、Galaxy A54やA55などの比較的新しいモデルではeSIMに対応しているものがあります。\n\nSamsungの場合、\"設定→接続\"→\"SIMカードマネージャー\"でeSIMの追加オプションが表示されれば対応しています。表示されない場合は、ソフトウェアアップデートを確認してみてください。"
      },
      {
        title: "Google PixelのeSIM対応機種",
        body: "Google Pixelは、eSIM対応を最も早くから推進したスマートフォンブランドの一つです。Pixel 2（2017年発売）から一部のキャリアでeSIMをサポートしていますが、本格的な対応はPixel 3（2018年）以降です。Pixel 3、3a、4、4a、5、5a、6、6a、6 Pro、7、7a、7 Pro、8、8a、8 Pro、9、9 Pro、9 Pro Foldなど、幅広いモデルがeSIMに対応しています。\n\nPixelシリーズの特徴は、GoogleがAndroidの開発元であるため、eSIMの設定インターフェースが最もスムーズで直感的な点です。また、Pixel 7以降はデュアルeSIMにも対応しており、物理SIMなしで2つのeSIMを同時に利用できます。\n\nPixelは日本市場でも広く販売されており、SIMフリーモデルであればすぐにeSIMを利用開始できます。キャリア販売モデルの場合は、SIMロック解除が必要な場合があります。"
      },
      {
        title: "その他のメーカーのeSIM対応機種",
        body: "eSIM対応はApple、Samsung、Google以外のメーカーにも広がっています。Huaweiでは、P40シリーズ以降やMate 40シリーズ以降が対応しています。OPPOでは、Find X3 Pro以降やReno シリーズの一部モデルが対応しています。Xiaomiでは、12T Pro以降や13シリーズ以降の一部モデルがeSIMに対応しています。\n\nSony Xperiaでは、Xperia 10 III以降やXperia 1 III以降の一部モデルが対応しています。Motorolaでは、razr 2022以降やedgeシリーズの一部モデルがeSIMをサポートしています。また、Microsoft Surface DuoシリーズもeSIMに対応しています。\n\nなお、同じ機種でも販売国やキャリアによってeSIM機能の有無が異なる場合があります。購入前に必ずスペック表やキャリアのサポートページで確認することをおすすめします。また、タブレット端末でもiPad（第7世代以降）やSamsung Galaxy Tabの一部モデルがeSIMに対応しています。"
      },
      {
        title: "eSIM対応の確認方法",
        body: "お使いのスマートフォンがeSIMに対応しているかどうかを確認する方法をまとめます。iPhoneの場合、設定→一般→情報を開き、利用可能なSIMやEIDの項目があれば対応しています。もしくは\"設定→モバイル通信にモバイル通信プランを追加のボタンがあるかを確認してください。\n\nAndroidの場合、端末の設定→ネットワークとインターネット\"→\"SIM\"でSIMをダウンロードやeSIMを追加のオプションがあれば対応しています。機種によって表示名が異なるため、\"SIMカードマネージャー\"\"SIM管理\"\"モバイルネットワーク\"なども確認してみてください。\n\nどの方法でも確認できない場合は、端末のIMEI番号をメーカーの公式サイトで入力して確認する方法もあります。また、端末がSIMロックされている場合は、eSIM対応であってもeSIMが追加できないことがあるため、先にSIMロック解除を行ってください。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "古いスマートフォンでもeSIMは使えますか？", a: "一般的に2018年より前に発売されたスマートフォンはeSIMに対応していません。eSIMを利用するには、対応機種に買い替えるか、従来の物理SIMカードを利用する必要があります。" },
      { q: "SIMロック端末でもeSIMは使えますか？", a: "SIMロックがかかっている端末では、eSIMが使えない場合があります。まず通信キャリアでSIMロック解除の手続きを行ってからeSIMを設定してください。日本の主要キャリアではオンラインで無料解除が可能です。" },
      { q: "デュアルeSIMとは何ですか？", a: "デュアルeSIMとは、2つのeSIMプロファイルを同時に使用できる機能です。iPhone 13以降やPixel 7以降が対応しており、物理SIMカードを使わずに2つの回線を利用できます。旅行先と自国の回線を同時に持つのに便利です。" }
    ],
    ctaTitle: "対応機種をお持ちなら今すぐeSIMを",
    ctaDesc: "お使いのスマートフォンがeSIM対応なら、すぐに設定を始めましょう。AutoWiFi eSIMは200以上の国と地域で使えるプランを提供しています。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIM対応スマートフォン一覧"
  },
  en: {
    title: "eSIM Compatible Phones List [2026 Updated]",
    subtitle: "Complete list: iPhone, Samsung, Google Pixel, and more",
    intro: "To use an eSIM, you need a compatible smartphone. This article provides a comprehensive list of eSIM-supported devices from all major manufacturers. Most smartphones released since 2018 support eSIM, and the list of compatible devices continues to grow every year.",
    sections: [
      {
        title: "iPhone (Apple) eSIM Compatible Models",
        body: "Apple has been one of the leading champions of eSIM technology. Every iPhone released since the iPhone XS, XS Max, and XR (2018) supports eSIM. This includes the iPhone 11 series, iPhone 12 series, iPhone SE (2nd and 3rd generation), iPhone 13 series, iPhone 14 series, iPhone 15 series, and iPhone 16 series.\n\nStarting with the iPhone 13, Apple introduced dual eSIM support, allowing two eSIM profiles to be active simultaneously. US models of iPhone 14 and later have no physical SIM tray at all, relying entirely on eSIM. International models continue to include both a nano-SIM slot and eSIM.\n\nTo verify eSIM support on your iPhone, go to Settings, then General, then About, and look for an EID entry. Alternatively, check if Add Cellular Plan appears under Settings then Cellular."
      },
      {
        title: "Samsung Galaxy eSIM Compatible Models",
        body: "Samsung began full eSIM support with the Galaxy S20 series in 2020. All models in the Galaxy S20, S21, S22, S23, S24, and S25 series — including standard, Plus, and Ultra variants — support eSIM. However, some carrier-specific or regional variants may have eSIM functionality disabled, so it is worth confirming with your carrier.\n\nFor foldable devices, the Galaxy Z Flip3 and later, as well as the Galaxy Z Fold3 and later, all support eSIM. The Galaxy Note 20 and later also have eSIM capability. In Samsung's mid-range A-series, newer models like the Galaxy A54 and A55 have added eSIM support as well.\n\nTo check eSIM support on Samsung, go to Settings, then Connections, then SIM card manager. If you see an option to add an eSIM, your device is compatible. If the option does not appear, try checking for software updates first."
      },
      {
        title: "Google Pixel eSIM Compatible Models",
        body: "Google Pixel was one of the earliest smartphone brands to adopt eSIM. While the Pixel 2 (2017) offered limited eSIM support with certain carriers, full eSIM compatibility began with the Pixel 3 in 2018. Compatible models include the Pixel 3, 3a, 4, 4a, 5, 5a, 6, 6a, 6 Pro, 7, 7a, 7 Pro, 8, 8a, 8 Pro, 9, 9 Pro, and 9 Pro Fold.\n\nBecause Google develops Android, Pixel phones offer the smoothest and most intuitive eSIM setup experience. Starting with the Pixel 7, dual eSIM is also supported, enabling two eSIM profiles without any physical SIM card.\n\nPixel phones purchased unlocked can start using eSIM immediately. Carrier-purchased models may require SIM unlocking first, but this is typically free and can be done online or through the carrier's app."
      },
      {
        title: "Other Manufacturers with eSIM Support",
        body: "eSIM support extends well beyond Apple, Samsung, and Google. Huawei offers eSIM on the P40 series and later, as well as the Mate 40 series and later. OPPO supports eSIM on the Find X3 Pro and later, along with select Reno series models. Xiaomi has added eSIM to the 12T Pro and later, and select models in the 13 series and beyond.\n\nSony Xperia supports eSIM on the Xperia 10 III and later, as well as the Xperia 1 III and later for select variants. Motorola offers eSIM on the razr 2022 and later, along with some edge series models. The Microsoft Surface Duo series also includes eSIM support.\n\nKeep in mind that eSIM availability can vary by country and carrier, even for the same phone model. Always verify the specifications for your particular variant before purchasing. Tablets like iPad (7th generation and later) and some Samsung Galaxy Tab models also support eSIM."
      },
      {
        title: "How to Check if Your Phone Supports eSIM",
        body: "Here is how to verify eSIM compatibility on your device. On iPhone, go to Settings, then General, then About, and look for Available SIM or EID. If either entry exists, your iPhone supports eSIM. You can also check for an Add Cellular Plan button under Settings then Cellular.\n\nOn Android, navigate to Settings, then Network & internet, then SIMs. Look for a Download a SIM or Add eSIM option. The exact menu names may differ by manufacturer — try checking under SIM card manager, SIM management, or Mobile network as well.\n\nIf none of these methods work, you can enter your phone's IMEI number on the manufacturer's official website to check compatibility. Also remember that a SIM-locked phone may not allow eSIM setup even if the hardware supports it, so unlock your device with your carrier first."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use eSIM on an older smartphone?", a: "Generally, phones released before 2018 do not support eSIM. To use eSIM, you would need to upgrade to a compatible device or use a traditional physical SIM card instead." },
      { q: "Can I use eSIM on a carrier-locked phone?", a: "Carrier-locked phones may not allow eSIM setup. Contact your carrier to unlock your device first. Most carriers offer free unlocking online or through their app." },
      { q: "What is dual eSIM?", a: "Dual eSIM allows two eSIM profiles to be active at the same time. Supported by iPhone 13 and later, Pixel 7 and later, and other recent models. It lets you maintain two separate lines without any physical SIM card." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "If your phone supports eSIM, you are ready to get started. AutoWiFi eSIM offers plans covering 200+ countries and regions.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "eSIM Compatible Phones"
  },
  ko: {
    title: "eSIM 대응 스마트폰 목록 【2026년 최신판】",
    subtitle: "iPhone·Samsung·Google Pixel 등 전 기종 완전 정리",
    intro: "eSIM을 사용하려면 대응 스마트폰이 필요합니다. 이 기사에서는 주요 제조사별 eSIM 대응 기종을 완전히 정리했습니다. 2018년 이후 출시된 스마트폰의 대부분이 대응하며, 대응 기종은 해마다 증가하고 있습니다.",
    sections: [
      {
        title: "iPhone(Apple) eSIM 대응 기종",
        body: "Apple은 eSIM 기술 보급을 적극적으로 주도해 온 제조사입니다. iPhone XS, XS Max, XR(2018년 출시) 이후의 모든 iPhone이 eSIM에 대응합니다. iPhone 11 시리즈, 12 시리즈, SE(2세대·3세대), 13 시리즈, 14 시리즈, 15 시리즈, 16 시리즈가 모두 포함됩니다.\n\n특히 iPhone 13 이후 모델은 듀얼 eSIM을 지원하여 2개의 eSIM을 동시에 사용할 수 있습니다. 미국 모델 iPhone 14 이후는 물리 SIM 슬롯이 없는 eSIM 전용 사양이며, 한국 판매 모델은 nano-SIM과 eSIM 모두 탑재하고 있습니다.\n\neSIM 지원 여부 확인은 '설정' → '일반' → '정보'에서 EID 항목이 있는지, 또는 '설정' → '셀룰러'에서 '셀룰러 플랜 추가' 옵션이 있는지 확인하면 됩니다."
      },
      {
        title: "Samsung Galaxy eSIM 대응 기종",
        body: "Samsung은 Galaxy S20 시리즈(2020년 출시)부터 eSIM 지원을 본격 시작했습니다. Galaxy S20, S21, S22, S23, S24, S25 각 시리즈(일반, +, Ultra 모델)가 eSIM에 대응합니다. 단, 일부 국가나 통신사 전용 모델은 eSIM 기능이 비활성화된 경우가 있으므로 확인이 필요합니다.\n\n폴더블 스마트폰으로는 Galaxy Z Flip3 이후, Galaxy Z Fold3 이후 각 모델이 대응합니다. Galaxy Note 시리즈는 Note 20 이후가 대응합니다. 미드레인지 A 시리즈에서도 Galaxy A54, A55 등 비교적 최신 모델은 eSIM을 지원합니다.\n\n확인 방법은 '설정' → '연결' → 'SIM 카드 관리자'에서 eSIM 추가 옵션이 표시되면 대응합니다. 표시되지 않으면 소프트웨어 업데이트를 확인해 보세요."
      },
      {
        title: "Google Pixel eSIM 대응 기종",
        body: "Google Pixel은 eSIM 지원을 가장 먼저 추진한 브랜드 중 하나입니다. Pixel 2(2017년)에서 일부 통신사 eSIM을 지원했으며, 본격적인 대응은 Pixel 3(2018년) 이후입니다. Pixel 3, 3a, 4, 4a, 5, 5a, 6, 6a, 6 Pro, 7, 7a, 7 Pro, 8, 8a, 8 Pro, 9, 9 Pro 등 폭넓은 모델이 대응합니다.\n\nPixel 시리즈는 Google이 Android 개발사이기 때문에 eSIM 설정 인터페이스가 가장 매끄럽고 직관적입니다. Pixel 7 이후는 듀얼 eSIM도 지원하여 물리 SIM 없이 2개의 eSIM을 동시에 사용할 수 있습니다.\n\n언락 모델이라면 바로 eSIM을 사용할 수 있으며, 통신사 모델은 SIM 잠금 해제가 필요한 경우가 있습니다."
      },
      {
        title: "기타 제조사 eSIM 대응 기종",
        body: "eSIM 지원은 Apple, Samsung, Google 이외의 제조사로도 확대되고 있습니다. Huawei는 P40 시리즈 이후, Mate 40 시리즈 이후가 대응합니다. OPPO는 Find X3 Pro 이후, Reno 시리즈 일부 모델이 대응합니다. Xiaomi는 12T Pro 이후, 13 시리즈 이후 일부 모델이 대응합니다.\n\nSony Xperia는 Xperia 10 III 이후, Xperia 1 III 이후 일부 모델이 대응합니다. Motorola는 razr 2022 이후, edge 시리즈 일부 모델이 대응합니다.\n\n같은 기종이라도 판매 국가나 통신사에 따라 eSIM 기능 유무가 다를 수 있으므로 구매 전 반드시 스펙을 확인하세요. 태블릿도 iPad(7세대 이후)나 Samsung Galaxy Tab 일부 모델이 eSIM에 대응합니다."
      },
      {
        title: "eSIM 대응 확인 방법",
        body: "사용 중인 스마트폰의 eSIM 대응 여부 확인 방법을 정리합니다. iPhone은 '설정' → '일반' → '정보'에서 'EID' 항목이 있으면 대응합니다. '설정' → '셀룰러'에 '셀룰러 플랜 추가' 버튼이 있는지도 확인하세요.\n\nAndroid는 '설정' → '네트워크 및 인터넷' → 'SIM'에서 'SIM 다운로드' 또는 'eSIM 추가' 옵션이 있으면 대응합니다. 기종에 따라 메뉴명이 다를 수 있으므로 'SIM 카드 관리자', 'SIM 관리', '모바일 네트워크' 등도 확인하세요.\n\n확인이 어려운 경우 단말기의 IMEI 번호를 제조사 공식 사이트에서 입력하여 확인할 수도 있습니다. SIM 잠금 단말기는 eSIM 대응이라도 추가가 안 될 수 있으므로 먼저 SIM 잠금 해제를 진행하세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "오래된 스마트폰에서도 eSIM을 사용할 수 있나요?", a: "일반적으로 2018년 이전에 출시된 스마트폰은 eSIM에 대응하지 않습니다. eSIM을 이용하려면 대응 기종으로 교체하거나 기존의 물리 SIM 카드를 이용해야 합니다." },
      { q: "SIM 잠금 단말기에서도 eSIM을 사용할 수 있나요?", a: "SIM 잠금이 걸려 있으면 eSIM을 사용할 수 없는 경우가 있습니다. 먼저 통신사에서 SIM 잠금 해제 절차를 진행한 후 eSIM을 설정하세요." },
      { q: "듀얼 eSIM이란 무엇인가요?", a: "듀얼 eSIM은 2개의 eSIM 프로필을 동시에 사용할 수 있는 기능입니다. iPhone 13 이후, Pixel 7 이후 등이 지원하며, 물리 SIM 없이 2개의 회선을 이용할 수 있습니다." }
    ],
    ctaTitle: "대응 기종이라면 지금 바로 eSIM을",
    ctaDesc: "사용 중인 스마트폰이 eSIM 대응이라면 바로 시작하세요. AutoWiFi eSIM은 200개 이상의 국가와 지역에서 사용 가능한 플랜을 제공합니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM 대응 스마트폰 목록"
  },
  zh: {
    title: "eSIM兼容手机列表【2026年最新版】",
    subtitle: "iPhone·Samsung·Google Pixel等全品牌机型汇总",
    intro: "使用eSIM需要兼容的智能手机。本文按主要品牌完整列出了所有支持eSIM的机型。2018年以后发布的大多数智能手机都支持eSIM，兼容机型还在逐年增加。",
    sections: [
      {
        title: "iPhone（Apple）eSIM兼容机型",
        body: "Apple是积极推动eSIM技术普及的领先厂商之一。自iPhone XS、XS Max、XR（2018年发布）起，所有iPhone机型都支持eSIM。包括iPhone 11系列、12系列、SE（第2代·第3代）、13系列、14系列、15系列、16系列。\n\n从iPhone 13开始支持双eSIM，可以同时使用两个eSIM配置。美国版iPhone 14及之后的机型没有实体SIM卡槽，完全依赖eSIM。其他地区的版本仍然同时搭载nano-SIM卡槽和eSIM。\n\n确认eSIM支持：进入设置→通用→关于本机，查看是否有EID项目；或者在设置→蜂窝网络中查看是否有添加蜂窝号码方案选项。"
      },
      {
        title: "Samsung Galaxy eSIM兼容机型",
        body: "Samsung从Galaxy S20系列（2020年发布）开始正式支持eSIM。Galaxy S20、S21、S22、S23、S24、S25各系列（标准版、+版、Ultra版）均支持eSIM。但部分国家或运营商定制版可能禁用了eSIM功能，建议向购买渠道确认。\n\n折叠屏方面，Galaxy Z Flip3及之后、Galaxy Z Fold3及之后均支持eSIM。Galaxy Note系列中，Note 20及之后支持eSIM。中端A系列中，Galaxy A54、A55等较新机型也已支持eSIM。\n\n确认方法：进入\"设置→连接\"→\"SIM卡管理器\"，如果显示添加eSIM的选项即表示支持。如未显示，请检查是否有软件更新。"
      },
      {
        title: "Google Pixel eSIM兼容机型",
        body: "Google Pixel是最早推进eSIM支持的智能手机品牌之一。Pixel 2（2017年）在部分运营商支持eSIM，全面支持从Pixel 3（2018年）开始。兼容机型包括Pixel 3、3a、4、4a、5、5a、6、6a、6 Pro、7、7a、7 Pro、8、8a、8 Pro、9、9 Pro、9 Pro Fold等。\n\nPixel系列的优势在于Google是Android的开发方，因此eSIM设置界面最为流畅直观。Pixel 7及之后还支持双eSIM，可以在不使用实体SIM的情况下同时使用两个eSIM。\n\n解锁版Pixel可以直接使用eSIM。运营商版本可能需要先进行SIM解锁。"
      },
      {
        title: "其他品牌eSIM兼容机型",
        body: "eSIM支持已扩展到Apple、Samsung、Google以外的品牌。华为P40系列及之后、Mate 40系列及之后支持eSIM。OPPO的Find X3 Pro及之后、部分Reno系列支持eSIM。小米12T Pro及之后、13系列及之后的部分机型支持eSIM。\n\nSony Xperia 10 III及之后、Xperia 1 III及之后的部分机型支持eSIM。Motorola的razr 2022及之后、部分edge系列支持eSIM。\n\n同一机型在不同国家或运营商可能存在eSIM功能差异，购买前务必确认规格。平板方面，iPad（第7代及之后）和部分Samsung Galaxy Tab也支持eSIM。"
      },
      {
        title: "如何确认手机是否支持eSIM",
        body: "以下是确认手机eSIM兼容性的方法。iPhone用户进入设置→通用→关于本机，查看是否有EID项。也可以在\"设置→蜂窝网络中查看是否有添加蜂窝号码方案按钮。\n\nAndroid用户进入设置→网络和互联网\"→\"SIM\"，查看是否有下载SIM或添加eSIM选项。不同品牌的菜单名称可能不同，还可以检查\"SIM卡管理器\"\"SIM管理\"\"移动网络\"等选项。\n\n如果以上方法都无法确认，可以在制造商官网输入手机的IMEI号码进行查询。SIM锁定的手机即使硬件支持eSIM也可能无法添加，请先联系运营商解锁。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "旧手机可以使用eSIM吗？", a: "一般来说，2018年之前发布的手机不支持eSIM。要使用eSIM需要更换为兼容机型，或者使用传统的实体SIM卡。" },
      { q: "运营商锁定的手机可以使用eSIM吗？", a: "SIM锁定的手机可能无法使用eSIM。请先联系运营商进行解锁，大多数运营商支持在线免费解锁。" },
      { q: "什么是双eSIM？", a: "双eSIM是指可以同时使用两个eSIM配置文件的功能。iPhone 13及之后、Pixel 7及之后等支持此功能，无需实体SIM卡即可使用两条线路。" }
    ],
    ctaTitle: "手机兼容就立即购买eSIM",
    ctaDesc: "如果您的手机支持eSIM，马上开始吧。AutoWiFi eSIM提供覆盖200多个国家和地区的套餐。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM兼容手机列表"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-compatible-phones", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="esim-compatible-phones" content={CONTENT[loc]} />;
}
