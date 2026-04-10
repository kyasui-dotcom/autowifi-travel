import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "初めて買う前に見たい関連ガイド",
    articles: [
      { slug: "esim-compatible-phones", title: "eSIM対応スマホ一覧" },
      { slug: "how-to-setup-esim", title: "eSIMの設定方法" },
      { slug: "esim-activation-timing", title: "eSIM有効化タイミング" },
      { slug: "esim-troubleshooting", title: "eSIMトラブルシューティング" },
      { slug: "esim-security-tips", title: "eSIMセキュリティ" },
    ],
  },
  en: {
    title: "Compare More Before Your First eSIM Purchase",
    articles: [
      { slug: "esim-compatible-phones", title: "eSIM Compatible Phones" },
      { slug: "how-to-setup-esim", title: "How to Set Up eSIM" },
      { slug: "esim-activation-timing", title: "When to Activate Your eSIM" },
      { slug: "esim-troubleshooting", title: "eSIM Troubleshooting" },
      { slug: "esim-security-tips", title: "eSIM Security Tips" },
    ],
  },
  ko: {
    title: "첫 구매 전에 더 비교할 가이드",
    articles: [
      { slug: "esim-compatible-phones", title: "eSIM 지원 기기" },
      { slug: "how-to-setup-esim", title: "eSIM 설정 방법" },
      { slug: "esim-activation-timing", title: "eSIM 활성화 타이밍" },
      { slug: "esim-troubleshooting", title: "eSIM 문제 해결" },
      { slug: "esim-security-tips", title: "eSIM 보안 팁" },
    ],
  },
  zh: {
    title: "第一次购买前值得继续比较的指南",
    articles: [
      { slug: "esim-compatible-phones", title: "eSIM兼容手机" },
      { slug: "how-to-setup-esim", title: "eSIM设置方法" },
      { slug: "esim-activation-timing", title: "eSIM激活时机" },
      { slug: "esim-troubleshooting", title: "eSIM故障排除" },
      { slug: "esim-security-tips", title: "eSIM安全提示" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIM初心者ガイド：初めてでもわかる完全入門",
    subtitle: "eSIMって何？仕組みから使い方まで、ゼロからやさしく解説",
    intro: "eSIMという言葉を聞いたことがあるけれど、何なのかよくわからない。そんな方のための完全入門ガイドです。eSIMの基本的な仕組み、メリット、そして実際の使い方まで、専門用語をできるだけ避けてわかりやすく解説します。初めてeSIMを使う方でも、この記事を読めば安心して利用開始できます。本記事ではeSIMって何？仕組みから使い方まで、ゼロからやさしく解説・eSIMとは？わかりやすく解説・eSIMを使うために必要なものなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "eSIMとは？わかりやすく解説",
        body: "スマートフォンでインターネットや電話を使うには、SIMカードというものが必要です。従来は小さなカード型のチップを端末に差し込んで使っていました。eSIM（イーシム）は、このSIMカードの機能をスマートフォンの中に最初から組み込んだものです。eはembedded（組み込み）の略です。\n\n物理的なカードを差し替える必要がないため、オンラインで通信プランを購入し、QRコードを読み取るだけで設定が完了します。お店に行ったりカードを郵送してもらう必要がありません。すべてスマートフォンの画面上で完結する、デジタル時代のSIMカードと考えてください。\n\neSIMは特に海外旅行で便利です。以前は渡航先で現地のSIMカードを購入するために、空港のショップに並んだり、言葉の通じない店員とやり取りしたりする必要がありました。eSIMなら、日本にいるうちに旅行先の通信プランを購入・設定できます。飛行機を降りた瞬間からインターネットが使えるのです。"
      },
      {
        title: "eSIMを使うために必要なもの",
        body: "eSIMを使い始めるために必要なものは3つだけです。まず、eSIM対応のスマートフォン。iPhone XS（2018年発売）以降のiPhoneや、Samsung Galaxy S20以降、Google Pixel 3以降などが対応しています。自分のスマートフォンが対応しているかわからない場合は、設定アプリで確認できます。\n\n次に必要なのが、WiFi接続環境です。eSIMのプロファイル（設定データ）をダウンロードするためにインターネットが必要です。自宅のWiFiで問題ありません。最後に、eSIMプラン自体です。AutoWiFiなどのプロバイダーのウェブサイトで、渡航先と日数に合わせたプランを選んで購入します。\n\n購入が完了すると、QRコードがメールで届きます。このQRコードをスマートフォンのカメラで読み取れば、自動的にeSIMの設定が始まります。難しい操作は一切ありません。画面の指示に従ってタップしていくだけで、数分で設定完了です。"
      },
      {
        title: "初めてのeSIM設定：失敗しないコツ",
        body: "初めてeSIMを設定する際に、いくつかのポイントを押さえておくと安心です。まず、設定は出発前に自宅のWiFi環境で行いましょう。空港や機内で慌てて設定するよりも、落ち着いた環境の方がスムーズです。QRコードは別のデバイス（パソコンや別のスマートフォン）に表示するか、印刷しておくと読み取りやすくなります。\n\neSIMをインストールした後の重要なポイントはデータ通信の設定です。日本で使っている通常の回線と旅行用のeSIMの2つがスマートフォンに入ることになります。旅行先ではモバイルデータ通信を旅行用eSIMに切り替えましょう。これを忘れると、日本の回線で海外ローミングしてしまい、高額な料金がかかる可能性があります。\n\nもう一つ大切なのがデータローミングの設定です。旅行用eSIMのデータローミングはオンにする必要があることが多いです。一方、日本の回線のデータローミングはオフのままにしておきましょう。この2つの設定を正しく行えば、安心して海外でインターネットを使えます。"
      },
      {
        title: "eSIMに関する不安を解消",
        body: "初めてeSIMを使う方が不安に感じるポイントとその回答をまとめます。まず日本の電話番号はどうなるの？という疑問。eSIMを追加しても、日本の電話番号はそのまま使えます。デュアルSIM状態になるため、日本からの電話やSMSを受け取りながら、旅行用eSIMでインターネットを使えます。\n\n\"eSIMは難しそう\"と感じる方も多いですが、実際の作業はQRコードを読み取って、数回タップするだけです。スマートフォンの操作に不安がある方でも、画面の指示通りに進めれば問題ありません。困ったときはプロバイダーのカスタマーサポートに問い合わせることもできます。\n\n\"旅行後にeSIMはどうすればいい？\"という疑問もよくあります。旅行が終わったら、eSIMプロファイルをそのまま残しておいても問題ありません。次の旅行でも同じ国に行く場合は再利用できるプランもあります。不要になったら設定から削除するだけです。削除しても、日本の回線には一切影響しません。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMを使うのにお金はかかりますか？", a: "eSIMの設定自体は無料です。費用がかかるのは通信プランの購入だけです。プランの料金は渡航先やデータ量によって異なりますが、1GB/7日間で500円程度からあります。" },
      { q: "eSIMは何回でも使えますか？", a: "はい、スマートフォンがeSIMに対応している限り、何度でも新しいeSIMプランを追加・削除できます。旅行のたびに新しいプランを購入して使えます。" },
      { q: "eSIMを使ったら通常のSIMカードは使えなくなりますか？", a: "いいえ、eSIMを追加しても通常のSIMカードはそのまま使えます。両方を同時に使えるデュアルSIMの状態になります。" },
      { q: "子どもでもeSIMを使えますか？", a: "はい、eSIM対応スマートフォンをお持ちであれば、年齢に関係なく使えます。保護者の方がeSIMの購入と設定を行い、お子さんのスマートフォンで利用することも可能です。" }
    ],
    ctaTitle: "今すぐeSIMを体験しよう",
    ctaDesc: "AutoWiFi eSIMなら、初めてでも簡単。5分で設定完了、200以上の国と地域で使えるプランをご用意しています。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIM初心者ガイド"
  },
  en: {
    title: "First-Time eSIM Guide: Everything Beginners Need to Know",
    subtitle: "What is eSIM? A gentle introduction from basics to first setup",
    intro: "You have heard of eSIM but are not quite sure what it is? This beginner-friendly guide explains everything from scratch — what eSIM is, how it works, why it is useful, and how to set it up. No technical jargon, just clear and simple explanations so you can confidently use eSIM for the first time.",
    sections: [
      {
        title: "What Is eSIM? A Simple Explanation",
        body: "To use internet and phone services on your smartphone, you need something called a SIM card. Traditionally, this was a small physical chip that you inserted into your phone. An eSIM (embedded SIM) does the same job but is built right into your phone from the factory. The \"e\" stands for \"embedded.\"\n\nSince there is no physical card to swap, you can purchase a data plan online and set it up by scanning a QR code. No need to visit a store or wait for a card to arrive by mail. Everything happens on your phone screen — think of it as a digital-age SIM card.\n\neSIM is especially useful for international travel. Previously, you had to find a shop at the airport, wait in line, and communicate with staff who might not speak your language — all just to get a local SIM card. With eSIM, you can buy and set up a travel data plan from home before you even leave. The moment your plane lands, you are already connected."
      },
      {
        title: "What You Need to Get Started",
        body: "You only need three things to start using eSIM. First, an eSIM-compatible smartphone. This includes iPhone XS (2018) and later, Samsung Galaxy S20 and later, Google Pixel 3 and later, and many other modern phones. If you are unsure, check your phone's Settings app for eSIM options.\n\nSecond, you need a WiFi connection. Downloading the eSIM profile (configuration data) requires internet access. Your home WiFi works perfectly. Third, you need an eSIM plan itself. Visit a provider like AutoWiFi, choose a plan that matches your destination and trip length, and purchase it online.\n\nAfter purchase, you will receive a QR code by email. Scan this QR code with your phone camera, and the eSIM setup begins automatically. There are no complicated steps — just follow the on-screen prompts and tap through a few confirmations. Setup takes about 5 minutes."
      },
      {
        title: "First-Time Setup: Tips for Success",
        body: "A few tips will make your first eSIM setup smooth and worry-free. Set up at home on your WiFi before your trip, not at the airport in a rush. Display the QR code on another device (computer or another phone) or print it out for easier scanning.\n\nThe most important post-installation step is configuring your data line. Your phone will now have two lines — your regular home line and the travel eSIM. When abroad, switch your Cellular Data to the travel eSIM. If you forget this step, your phone may use international roaming on your home line, which can result in expensive charges.\n\nAnother critical setting is Data Roaming. You typically need to turn Data Roaming ON for the travel eSIM. At the same time, keep Data Roaming OFF for your home line. Getting these two settings right ensures you stay connected abroad without surprise bills."
      },
      {
        title: "Addressing Common Concerns",
        body: "Let us address the most common worries first-time eSIM users have. First: \"What happens to my phone number?\" Adding an eSIM does not affect your existing phone number at all. Your phone enters dual-SIM mode, so you can receive calls and texts on your home number while using the travel eSIM for internet.\n\nMany people think eSIM setup is complicated, but the actual process is just scanning a QR code and tapping through a few screens. Even if you are not comfortable with phone settings, the on-screen instructions guide you through every step. And if you do get stuck, customer support from your eSIM provider is always available.\n\n\"What do I do with the eSIM after my trip?\" is another common question. You can leave the eSIM profile on your phone — it does not use data or cost anything when inactive. Some plans can be reused for future trips to the same destination. When you no longer need it, simply delete it from Settings. Deleting the travel eSIM has zero effect on your home line."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Does using eSIM cost money?", a: "Setting up eSIM itself is free. You only pay for the data plan you purchase. Prices vary by destination and data amount, starting from around $3-5 for 1GB over 7 days." },
      { q: "Can I use eSIM multiple times?", a: "Yes, as long as your phone supports eSIM, you can add and delete eSIM plans as many times as you like. Simply purchase a new plan for each trip." },
      { q: "Will adding an eSIM disable my regular SIM card?", a: "No, your regular SIM card continues to work normally. Your phone enters dual-SIM mode, allowing both lines to be active simultaneously." },
      { q: "Can children use eSIM?", a: "Yes, anyone with an eSIM-compatible phone can use it regardless of age. A parent or guardian can handle the purchase and setup on the child's device." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM makes it easy for first-timers. Set up in 5 minutes, with plans covering 200+ countries and regions.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "First-Time eSIM Guide"
  },
  ko: {
    title: "eSIM 초보자 가이드: 처음이라도 알기 쉬운 완전 입문",
    subtitle: "eSIM이란? 구조부터 사용법까지 처음부터 친절하게 설명",
    intro: "eSIM이라는 말은 들어봤지만 정확히 무엇인지 모르겠다면, 이 완전 입문 가이드가 도움이 될 것입니다. eSIM의 기본 구조, 장점, 실제 사용법까지 전문 용어 없이 쉽게 설명합니다. 처음 eSIM을 사용하는 분도 안심하고 시작할 수 있습니다.",
    sections: [
      {
        title: "eSIM이란? 쉽게 알아보기",
        body: "스마트폰으로 인터넷이나 전화를 사용하려면 'SIM 카드'가 필요합니다. 기존에는 작은 카드형 칩을 단말기에 넣어 사용했습니다. eSIM(이심)은 이 SIM 카드 기능을 스마트폰 안에 처음부터 내장한 것입니다. 'e'는 'embedded(내장)'의 약자입니다.\n\n물리적 카드를 교체할 필요가 없으므로 온라인으로 통신 플랜을 구매하고 QR 코드를 읽기만 하면 설정이 완료됩니다. 매장에 가거나 카드를 배송받을 필요가 없습니다.\n\neSIM은 특히 해외여행에서 편리합니다. 이전에는 현지 SIM 카드를 구매하기 위해 공항 매장에서 줄을 서야 했지만, eSIM이라면 한국에서 미리 여행지의 통신 플랜을 구매·설정할 수 있습니다. 비행기에서 내리는 순간부터 인터넷을 사용할 수 있습니다."
      },
      {
        title: "eSIM 사용에 필요한 것",
        body: "eSIM을 시작하는 데 필요한 것은 3가지뿐입니다. 먼저 eSIM 대응 스마트폰. iPhone XS(2018년) 이후, Samsung Galaxy S20 이후, Google Pixel 3 이후 등이 대응합니다. 대응 여부는 '설정' 앱에서 확인할 수 있습니다.\n\n다음으로 WiFi 연결 환경이 필요합니다. eSIM 프로필을 다운로드하려면 인터넷이 필요합니다. 집 WiFi면 충분합니다. 마지막으로 eSIM 플랜 자체입니다. AutoWiFi 등의 웹사이트에서 여행지와 기간에 맞는 플랜을 선택하여 구매합니다.\n\n구매가 완료되면 이메일로 QR 코드가 도착합니다. 이 QR 코드를 스마트폰 카메라로 읽으면 자동으로 eSIM 설정이 시작됩니다. 어려운 조작은 전혀 없으며 화면 안내에 따라 탭하면 몇 분이면 설정이 완료됩니다."
      },
      {
        title: "첫 eSIM 설정: 실패하지 않는 요령",
        body: "처음 eSIM을 설정할 때 몇 가지 포인트를 알아두면 안심입니다. 설정은 출발 전에 집 WiFi 환경에서 하세요. 공항이나 기내에서 서둘러 설정하는 것보다 편안한 환경에서 하는 것이 원활합니다. QR 코드는 다른 기기에 표시하거나 인쇄해 두면 읽기 쉽습니다.\n\neSIM 설치 후 가장 중요한 포인트는 '데이터 통신' 설정입니다. 한국에서 쓰던 기존 회선과 여행용 eSIM 2개가 스마트폰에 들어갑니다. 여행지에서는 '모바일 데이터'를 여행용 eSIM으로 전환하세요. 이걸 잊으면 한국 회선으로 해외 로밍되어 고액 요금이 발생할 수 있습니다.\n\n또 중요한 것이 '데이터 로밍' 설정입니다. 여행용 eSIM의 데이터 로밍은 켜야 하는 경우가 많습니다. 반면 한국 회선의 데이터 로밍은 꺼둔 상태로 유지하세요. 이 두 설정을 올바르게 하면 안심하고 해외에서 인터넷을 사용할 수 있습니다."
      },
      {
        title: "eSIM에 대한 불안 해소",
        body: "처음 eSIM을 사용하는 분들이 걱정하는 포인트에 답변합니다. '한국 전화번호는 어떻게 되나요?' eSIM을 추가해도 기존 전화번호는 그대로 사용할 수 있습니다. 듀얼 SIM 상태가 되어 한국에서 오는 전화와 SMS를 받으면서 여행용 eSIM으로 인터넷을 사용할 수 있습니다.\n\n'eSIM은 어려울 것 같다'고 느끼는 분도 많지만 실제로는 QR 코드를 읽고 몇 번 탭하는 것이 전부입니다. 스마트폰 조작에 불안한 분도 화면 안내대로 진행하면 문제없습니다. 막히면 제공업체 고객 지원에 문의할 수도 있습니다.\n\n'여행 후 eSIM은 어떻게 하면 되나요?' 여행이 끝나면 eSIM 프로필을 그대로 두어도 괜찮습니다. 같은 나라에 다시 갈 때 재사용할 수 있는 플랜도 있습니다. 불필요해지면 '설정'에서 삭제하면 됩니다. 삭제해도 한국 회선에는 전혀 영향이 없습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "eSIM 사용에 비용이 드나요?", a: "eSIM 설정 자체는 무료입니다. 비용이 드는 것은 통신 플랜 구매뿐입니다. 여행지와 데이터량에 따라 다르지만 1GB/7일 약 5,000원부터 있습니다." },
      { q: "eSIM은 몇 번이나 사용할 수 있나요?", a: "네, 스마트폰이 eSIM에 대응하는 한 몇 번이든 새 플랜을 추가·삭제할 수 있습니다. 여행할 때마다 새 플랜을 구매하여 사용하면 됩니다." },
      { q: "eSIM을 추가하면 기존 SIM 카드는 사용 못 하나요?", a: "아닙니다. eSIM을 추가해도 기존 SIM 카드는 그대로 사용 가능합니다. 양쪽을 동시에 사용하는 듀얼 SIM 상태가 됩니다." },
      { q: "아이들도 eSIM을 사용할 수 있나요?", a: "네, eSIM 대응 스마트폰이 있다면 나이에 관계없이 사용할 수 있습니다. 보호자가 구매와 설정을 하고 아이의 스마트폰에서 사용하는 것도 가능합니다." }
    ],
    ctaTitle: "지금 바로 eSIM을 체험하세요",
    ctaDesc: "AutoWiFi eSIM이라면 처음이어도 간단. 5분이면 설정 완료, 200개 이상의 국가와 지역에서 사용 가능합니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM 초보자 가이드"
  },
  zh: {
    title: "eSIM新手指南：零基础完全入门",
    subtitle: "eSIM是什么？从原理到使用方法，轻松易懂全解析",
    intro: "听说过eSIM但不太了解是什么？这篇入门指南从零开始讲解eSIM的基本原理、优势和使用方法，尽量避免专业术语，让您轻松理解。即使是第一次使用eSIM，读完本文也能安心上手。",
    sections: [
      {
        title: "eSIM是什么？通俗解释",
        body: "要在手机上使用网络和通话，需要一种叫SIM卡的东西。传统方式是将一个小卡片芯片插入手机中。eSIM就是把SIM卡的功能从出厂时就内置在手机里，e代表embedded（嵌入式）。\n\n由于不需要更换实体卡片，只需在线购买通信套餐，扫描QR码即可完成设置。不用去店铺，也不用等快递。一切在手机屏幕上完成，可以理解为数字时代的SIM卡。\n\neSIM在出境旅行中特别实用。以前需要在机场排队购买当地SIM卡，还可能遇到语言不通的问题。有了eSIM，在国内就能提前购买和设置目的地的通信套餐，下飞机的一瞬间就能上网。"
      },
      {
        title: "使用eSIM需要什么",
        body: "开始使用eSIM只需要3样东西。首先是支持eSIM的手机：iPhone XS（2018年）及之后、Samsung Galaxy S20及之后、Google Pixel 3及之后等。不确定的话可以在设置应用中查看。\n\n其次需要WiFi连接环境。下载eSIM配置文件需要网络，家里的WiFi就行。最后是eSIM套餐本身。在AutoWiFi等提供商网站上，根据目的地和天数选择合适的套餐购买即可。\n\n购买完成后会收到一个QR码邮件。用手机摄像头扫描这个QR码，eSIM设置就会自动开始。没有任何复杂操作，按照屏幕提示点几下，几分钟就设置好了。"
      },
      {
        title: "首次设置eSIM：不出错的技巧",
        body: "首次设置eSIM时，记住几个要点就能安心。设置最好在出发前用家里的WiFi完成，比在机场匆忙设置要顺利得多。QR码可以显示在另一台设备（电脑或其他手机）上或打印出来，这样更容易扫描。\n\n安装eSIM后最重要的是数据通信设置。手机里会有原来的线路和旅行用eSIM两条线路。在旅行地要把蜂窝数据切换到旅行用eSIM。忘记切换的话，可能会用国内线路进行国际漫游，产生高额费用。\n\n另一个重要设置是数据漫游。旅行用eSIM的数据漫游通常需要开启，而国内线路的数据漫游要保持关闭。正确设置这两项，就可以安心在海外使用网络了。"
      },
      {
        title: "消除对eSIM的顾虑",
        body: "解答首次使用eSIM的常见顾虑。首先，我的手机号会怎样？添加eSIM不影响现有手机号。手机进入双SIM模式，可以用原号码接电话和短信，同时用旅行eSIM上网。\n\n很多人觉得eSIM很复杂，但实际操作只是扫描QR码然后点几下。即使不太擅长手机操作，按照屏幕指引操作也没问题。遇到困难还可以联系提供商的客服。\n\n\"旅行结束后eSIM怎么处理？\"也是常见问题。旅行结束后eSIM配置文件留着也没关系，不激活就不会产生费用。部分套餐再次去同一国家时可以重复使用。不需要时从设置里删除即可，删除旅行eSIM对国内线路完全没有影响。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "使用eSIM需要额外费用吗？", a: "eSIM设置本身免费，只需支付通信套餐的费用。价格因目的地和数据量而异，1GB/7天约30元起。" },
      { q: "eSIM可以反复使用吗？", a: "可以，只要手机支持eSIM，就可以随时添加和删除eSIM套餐。每次旅行购买新套餐即可。" },
      { q: "添加eSIM后原来的SIM卡还能用吗？", a: "当然可以。添加eSIM后原来的SIM卡照常使用，手机变成双SIM模式，两条线路同时工作。" },
      { q: "孩子也可以使用eSIM吗？", a: "可以，只要有支持eSIM的手机，不限年龄。家长可以负责购买和设置，让孩子的手机使用。" }
    ],
    ctaTitle: "立即体验eSIM",
    ctaDesc: "AutoWiFi eSIM让新手也能轻松上手。5分钟完成设置，覆盖200多个国家和地区。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM新手指南"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/first-time-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="first-time-esim"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
