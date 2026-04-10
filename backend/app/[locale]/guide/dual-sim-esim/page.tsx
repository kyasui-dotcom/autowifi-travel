import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "設定前に見ておきたい関連ガイド",
    articles: [
      { slug: "save-money-roaming", title: "ローミング料金節約術" },
      { slug: "travel-internet-options", title: "海外旅行のネット接続方法" },
      { slug: "international-calling-esim", title: "eSIMでの国際通話" },
      { slug: "esim-activation-timing", title: "eSIMの有効化タイミング" },
    ],
  },
  en: {
    title: "Compare More Before You Set Up Dual SIM",
    articles: [
      { slug: "save-money-roaming", title: "How to Avoid Expensive Roaming Charges" },
      { slug: "travel-internet-options", title: "Travel Internet Options" },
      { slug: "international-calling-esim", title: "International Calls with eSIM" },
      { slug: "esim-activation-timing", title: "When to Activate eSIM" },
    ],
  },
  ko: {
    title: "설정 전에 함께 볼 가이드",
    articles: [
      { slug: "save-money-roaming", title: "로밍 요금 절약법" },
      { slug: "travel-internet-options", title: "여행 인터넷 옵션" },
      { slug: "international-calling-esim", title: "eSIM 국제 전화" },
      { slug: "esim-activation-timing", title: "eSIM 활성화 타이밍" },
    ],
  },
  zh: {
    title: "设置双卡前可继续比较的指南",
    articles: [
      { slug: "save-money-roaming", title: "节省漫游费用" },
      { slug: "travel-internet-options", title: "旅行上网方式" },
      { slug: "international-calling-esim", title: "eSIM国际通话" },
      { slug: "esim-activation-timing", title: "eSIM激活时机" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "デュアルSIMとeSIMの使い方：自分の番号を保持したまま海外データを利用",
    subtitle: "物理SIM＋eSIMで、通話もデータもスマートに管理",
    intro: "デュアルSIM機能を活用すれば、日本の電話番号を維持したまま、海外旅行用のeSIMデータプランを同時に利用できます。家族や仕事先からの電話を逃さず、かつ海外データ通信はリーズナブルなeSIMで行う — この便利な使い方を詳しく解説します。本記事では物理SIM＋eSIMで、通話もデータもスマートに管理・デュアルSIMとは？・海外旅行でのデュアルSIM設定方法などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "デュアルSIMとは？",
        body: "デュアルSIMとは、1台のスマートフォンで2つの回線を同時に使える機能です。従来は2枚の物理SIMカードを挿入するタイプが主流でしたが、現在は物理SIM＋eSIMの組み合わせが一般的です。iPhone XS以降やSamsung Galaxy S20以降など、最近のスマートフォンの多くがこの方式に対応しています。\n\n2つの回線はそれぞれ別の役割を持たせることができます。例えば、1回線目（物理SIM）は日本のキャリアで音声通話とSMS、2回線目（eSIM）は海外旅行用のデータ通信、という使い分けが可能です。これにより、SIMカードを差し替えることなく、シームレスに2つの回線を管理できます。\n\niPhone 13以降ではデュアルeSIMにも対応しており、物理SIMなしで2つのeSIMを同時に利用することも可能です。この場合、日本のキャリアのeSIMと旅行用eSIMの2つを設定できます。"
      },
      {
        title: "海外旅行でのデュアルSIM設定方法",
        body: "海外旅行でデュアルSIMを活用する手順を説明します。まず、旅行用のeSIMプランを購入し、QRコードでプロファイルをインストールします。この時点ではまだデータ通信には使いません。インストール時に回線にわかりやすい名前（旅行用データなど）をつけておくと管理しやすくなります。\n\niPhoneの場合、\"設定→モバイル通信で2つの回線が表示されます。デフォルトの音声回線は日本のキャリア（物理SIM）に設定し、モバイルデータ通信\"は旅行用eSIMに設定します。これにより、電話は日本の番号で発着信し、インターネットは旅行用eSIMのデータを使います。\n\nAndroidの場合は、\"設定→ネットワークとインターネット\"→\"SIM\"で同様の設定ができます。データ通信に使うSIMを旅行用eSIMに切り替え、通話用のSIMは日本のキャリアのままにしておきます。出発前にこの設定を済ませ、現地到着後に旅行用eSIMのデータローミングをオンにすれば完了です。"
      },
      {
        title: "注意点とコスト最適化",
        body: "デュアルSIMで最も注意すべきは、日本のキャリア回線での意図しないデータ消費です。モバイルデータ通信を旅行用eSIMに設定していても、一部のアプリや機能がメイン回線のデータを使う場合があります。確実に防ぐには、日本のキャリア側のモバイルデータ通信を完全にオフにすることをおすすめします。\n\nまた、日本のキャリアの国際通話料金にも注意が必要です。海外で日本の番号から発信すると国際通話料金がかかります。可能であればLINEやWhatsAppなどのインターネット通話アプリを使い、eSIMのデータ通信経由で通話することで通話料を節約できます。\n\nバッテリー消費にも影響があります。2つの回線を同時にアクティブにすると、1回線の場合よりバッテリーの消耗が早くなります。日本からの電話を受ける必要がない時間帯は、日本のキャリア回線を一時的にオフにすることで、バッテリーを節約できます。"
      },
      {
        title: "帰国後の設定戻し",
        body: "旅行から帰国したら、設定を元に戻しましょう。モバイルデータ通信を日本のキャリア（物理SIM）に切り替え、旅行用eSIMのデータローミングをオフにします。旅行用eSIMの回線自体をオフにするか、不要であればプロファイルを削除しても構いません。\n\nただし、同じ国に再度旅行する予定がある場合は、eSIMプロファイルを削除せずに残しておくことをおすすめします。一部のプロバイダーでは、プロファイルを再利用して追加データを購入できる場合があります。残しておいても通信は発生しないため、余分な費用がかかることはありません。\n\nデュアルSIMの使い方に慣れると、海外旅行のたびにスムーズに回線を切り替えられるようになります。日本の番号を維持しながら海外データを使うこのスタイルは、一度体験すると手放せなくなる便利さです。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "デュアルSIM中、日本の番号でSMSを受信できますか？", a: "はい、デュアルSIM状態であれば日本のキャリアの回線がアクティブなので、SMSも受信できます。ただし、海外でのSMS受信には追加料金がかかる場合がキャリアによって異なるため、事前に確認してください。" },
      { q: "デュアルSIMで同時に通話とデータ通信はできますか？", a: "はい、通話中でもデータ通信は可能です。ただし、通話中のデータ通信は通常WiFiまたはVoLTE対応の場合に限られます。一般的な使用では問題なく両方を使えます。" },
      { q: "旅行用eSIMに電話番号は必要ですか？", a: "いいえ、データ通信のみのeSIMプランで十分です。電話やSMSは日本のキャリアの回線で行い、インターネットだけeSIMを使う設定にすれば、電話番号付きのプランは不要です。" }
    ],
    ctaTitle: "自分の番号をキープしたままeSIMを使おう",
    ctaDesc: "AutoWiFi eSIMなら、デュアルSIM設定で日本の番号を維持しながら、海外の安定した通信を利用できます。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "デュアルSIMとeSIM"
  },
  en: {
    title: "How to Use Dual SIM with eSIM: Keep Your Number and Get Data Abroad",
    subtitle: "Physical SIM + eSIM for seamless calls and data management",
    intro: "Dual SIM functionality lets you keep your home phone number active while simultaneously using an eSIM data plan abroad. Never miss calls from family or work, while enjoying affordable travel data through eSIM. This guide walks you through exactly how to set it up.",
    sections: [
      {
        title: "What Is Dual SIM?",
        body: "Dual SIM means your smartphone can use two separate lines at the same time. While older phones used two physical SIM card slots, the modern standard is a physical SIM plus eSIM combination. Phones like iPhone XS and later, Samsung Galaxy S20 and later, and many others support this setup.\n\nEach line can serve a different purpose. For example, Line 1 (physical SIM) handles calls and texts on your home number, while Line 2 (eSIM) provides affordable data abroad. You manage both lines without ever swapping SIM cards.\n\niPhone 13 and later models also support dual eSIM — two eSIM profiles active simultaneously with no physical SIM needed at all. This lets you set up both your home carrier eSIM and a travel eSIM on the same device."
      },
      {
        title: "Setting Up Dual SIM for International Travel",
        body: "Here is how to configure dual SIM for travel. First, purchase a travel eSIM plan and install the profile by scanning the QR code. Give the new line a clear label like \"Travel Data\" for easy identification. The profile installs without activating data immediately.\n\nOn iPhone, go to Settings then Cellular. You will see both lines listed. Set Default Voice Line to your home carrier (physical SIM) and Cellular Data to the travel eSIM. This routes phone calls through your home number while internet traffic uses the travel eSIM.\n\nOn Android, navigate to Settings then Network & internet then SIMs. Switch the data SIM to the travel eSIM and keep the voice SIM on your home carrier. Complete this configuration before departure. When you arrive at your destination, simply enable data roaming on the travel eSIM and you are connected."
      },
      {
        title: "Important Considerations and Cost Optimization",
        body: "The biggest risk with dual SIM is unintended data consumption on your home carrier line. Even with cellular data set to the travel eSIM, certain apps or system functions may occasionally use your primary line's data. To be safe, completely disable mobile data on your home carrier line.\n\nAlso be mindful of international calling rates. Making calls from your home number while abroad incurs international charges. Whenever possible, use internet calling apps like WhatsApp or FaceTime through your eSIM data connection to avoid per-minute voice charges.\n\nBattery life is affected too. Having two active lines drains the battery faster than a single line. During times when you do not need to receive calls on your home number, temporarily disable that line to conserve battery power."
      },
      {
        title: "Returning Home: Restoring Settings",
        body: "When you return from your trip, switch your settings back. Change Cellular Data back to your home carrier (physical SIM) and turn off data roaming on the travel eSIM. You can disable the travel eSIM line or delete the profile entirely if you no longer need it.\n\nHowever, if you plan to visit the same destination again, we recommend keeping the eSIM profile installed. Some providers allow you to reuse profiles and purchase additional data for future trips. An inactive eSIM profile does not generate any data or charges, so there is no cost to keeping it.\n\nOnce you are comfortable with dual SIM management, switching between home and travel lines becomes second nature. The ability to keep your number while using affordable travel data is a convenience that is hard to give up once you have experienced it."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I receive SMS on my home number while using dual SIM?", a: "Yes, as long as your home carrier line is active in dual SIM mode, you can receive SMS. However, SMS reception abroad may incur additional charges depending on your carrier, so check with them beforehand." },
      { q: "Can I make calls and use data simultaneously with dual SIM?", a: "Yes, you can use data while on a call. Data during calls typically works over WiFi or when VoLTE is supported. In normal usage, both functions work together without issues." },
      { q: "Do I need a phone number on my travel eSIM?", a: "No, a data-only eSIM plan is sufficient. Route calls and texts through your home carrier line and use the eSIM exclusively for internet. A phone number on the travel eSIM is unnecessary." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM works perfectly with dual SIM setups. Keep your home number active while enjoying stable travel connectivity.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Dual SIM with eSIM"
  },
  ko: {
    title: "듀얼 SIM과 eSIM 활용법: 내 번호 유지하면서 해외 데이터 사용하기",
    subtitle: "물리 SIM + eSIM으로 통화도 데이터도 스마트하게 관리",
    intro: "듀얼 SIM 기능을 활용하면 한국 전화번호를 유지하면서 해외 여행용 eSIM 데이터 플랜을 동시에 사용할 수 있습니다. 가족이나 직장의 전화를 놓치지 않으면서 합리적인 eSIM 데이터를 사용하는 방법을 상세히 설명합니다.",
    sections: [
      {
        title: "듀얼 SIM이란?",
        body: "듀얼 SIM이란 1대의 스마트폰에서 2개의 회선을 동시에 사용할 수 있는 기능입니다. 현재는 '물리 SIM + eSIM' 조합이 일반적입니다. iPhone XS 이후, Samsung Galaxy S20 이후 등 최근 스마트폰의 대부분이 이 방식을 지원합니다.\n\n2개의 회선에 각각 다른 역할을 부여할 수 있습니다. 예를 들어 1회선(물리 SIM)은 한국 통신사로 음성 통화와 SMS, 2회선(eSIM)은 해외 여행용 데이터 통신으로 구분할 수 있습니다.\n\niPhone 13 이후는 '듀얼 eSIM'도 지원하여 물리 SIM 없이 2개의 eSIM을 동시에 사용할 수 있습니다."
      },
      {
        title: "해외여행에서의 듀얼 SIM 설정 방법",
        body: "해외여행에서 듀얼 SIM을 활용하는 절차를 설명합니다. 먼저 여행용 eSIM 플랜을 구매하고 QR 코드로 프로필을 설치합니다. 설치 시 알기 쉬운 이름('여행용 데이터' 등)을 붙여두면 관리하기 편합니다.\n\niPhone의 경우 '설정' → '셀룰러'에서 2개의 회선이 표시됩니다. '기본 음성 회선'은 한국 통신사(물리 SIM)로, '셀룰러 데이터'는 여행용 eSIM으로 설정합니다. 이렇게 하면 전화는 한국 번호로, 인터넷은 여행용 eSIM 데이터를 사용합니다.\n\nAndroid는 '설정' → '네트워크 및 인터넷' → 'SIM'에서 동일한 설정이 가능합니다. 출발 전에 설정을 완료하고 현지 도착 후 여행용 eSIM의 데이터 로밍을 켜면 됩니다."
      },
      {
        title: "주의점과 비용 최적화",
        body: "듀얼 SIM에서 가장 주의할 점은 한국 통신사 회선에서의 의도치 않은 데이터 소비입니다. 셀룰러 데이터를 여행용 eSIM으로 설정해도 일부 앱이나 기능이 메인 회선의 데이터를 사용할 수 있습니다. 확실히 방지하려면 한국 통신사 쪽의 모바일 데이터를 완전히 끄는 것을 추천합니다.\n\n한국 통신사의 국제 통화 요금에도 주의하세요. 해외에서 한국 번호로 발신하면 국제 통화 요금이 부과됩니다. 가능하면 카카오톡이나 WhatsApp 등의 인터넷 통화 앱을 사용하여 eSIM 데이터로 통화하면 통화료를 절약할 수 있습니다.\n\n배터리 소모에도 영향이 있습니다. 2개 회선을 동시에 활성화하면 1회선보다 배터리가 빨리 줄어듭니다. 한국 전화를 받을 필요 없는 시간대에는 한국 회선을 임시로 꺼두면 배터리를 절약할 수 있습니다."
      },
      {
        title: "귀국 후 설정 되돌리기",
        body: "귀국 후에는 설정을 원래대로 되돌립니다. '셀룰러 데이터'를 한국 통신사(물리 SIM)로 전환하고 여행용 eSIM의 데이터 로밍을 끕니다. 여행용 eSIM 회선을 비활성화하거나 불필요하면 프로필을 삭제해도 됩니다.\n\n같은 나라에 다시 여행할 예정이라면 eSIM 프로필을 삭제하지 않고 남겨두는 것을 추천합니다. 일부 제공업체에서는 프로필을 재사용하여 추가 데이터를 구매할 수 있습니다. 비활성 상태의 eSIM은 데이터나 요금이 발생하지 않습니다.\n\n듀얼 SIM 사용에 익숙해지면 해외여행 때마다 원활하게 회선을 전환할 수 있게 됩니다. 한국 번호를 유지하면서 해외 데이터를 사용하는 이 스타일은 한 번 체험하면 놓을 수 없는 편리함입니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "듀얼 SIM 중 한국 번호로 SMS를 수신할 수 있나요?", a: "네, 듀얼 SIM 상태에서 한국 통신사 회선이 활성화되어 있으면 SMS도 수신할 수 있습니다. 단, 해외에서의 SMS 수신에 추가 요금이 발생할 수 있으므로 사전에 확인하세요." },
      { q: "듀얼 SIM으로 통화와 데이터를 동시에 사용할 수 있나요?", a: "네, 통화 중에도 데이터 사용이 가능합니다. 통화 중 데이터는 WiFi 또는 VoLTE 지원 시 정상 작동합니다." },
      { q: "여행용 eSIM에 전화번호가 필요한가요?", a: "아니요, 데이터 전용 eSIM 플랜이면 충분합니다. 전화와 SMS는 한국 통신사 회선으로, 인터넷만 eSIM으로 사용하면 전화번호 포함 플랜은 불필요합니다." }
    ],
    ctaTitle: "내 번호를 유지하면서 eSIM을 사용하세요",
    ctaDesc: "AutoWiFi eSIM이라면 듀얼 SIM 설정으로 한국 번호를 유지하면서 해외의 안정적인 통신을 이용할 수 있습니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "듀얼 SIM과 eSIM"
  },
  zh: {
    title: "如何使用双SIM与eSIM：保留号码的同时使用海外数据",
    subtitle: "实体SIM + eSIM，通话和数据两不误",
    intro: "利用双SIM功能，可以在保持国内手机号码的同时使用eSIM海外数据套餐。不错过家人和工作的来电，又能用实惠的eSIM上网。本文详细介绍具体设置方法。",
    sections: [
      {
        title: "什么是双SIM？",
        body: "双SIM是指一台手机同时使用两条线路的功能。现在主流的方式是实体SIM + eSIM的组合。iPhone XS及之后、Samsung Galaxy S20及之后等大多数现代手机都支持。\n\n两条线路可以分别承担不同角色。例如线路1（实体SIM）用国内运营商接打电话和短信，线路2（eSIM）用旅行数据套餐上网。无需换卡即可管理两条线路。\n\niPhone 13及之后还支持双eSIM，不用实体SIM就能同时使用两个eSIM配置文件。"
      },
      {
        title: "出境旅行的双SIM设置方法",
        body: "介绍出境旅行时的双SIM设置步骤。首先购买旅行用eSIM套餐，扫描QR码安装配置文件。安装时给线路取个容易识别的名字（如旅行数据）。\n\niPhone上进入\"设置→蜂窝网络，可以看到两条线路。将默认语音线路设为国内运营商（实体SIM），蜂窝数据设为旅行用eSIM。这样电话走国内号码，上网用旅行eSIM。\n\nAndroid上在设置→网络和互联网\"→\"SIM\"中进行同样设置。出发前完成配置，到达后开启旅行eSIM的数据漫游即可。"
      },
      {
        title: "注意事项与费用优化",
        body: "双SIM最需要注意的是国内运营商线路上的意外数据消耗。即使蜂窝数据设为旅行eSIM，部分应用可能仍会使用主线路的数据。为确保万无一失，建议完全关闭国内运营商线路的移动数据。\n\n还要注意国际通话费用。在海外用国内号码拨打电话会产生国际话费。尽量使用微信、WhatsApp等网络通话应用，通过eSIM数据连接进行通话，可以节省话费。\n\n电池续航也会受影响。两条线路同时激活比单线路更耗电。不需要接听国内电话的时段，可以临时关闭国内线路以节省电量。"
      },
      {
        title: "回国后恢复设置",
        body: "旅行归来后恢复原来的设置。将蜂窝数据切回国内运营商（实体SIM），关闭旅行eSIM的数据漫游。可以禁用旅行eSIM线路，不需要的话也可以删除配置文件。\n\n如果计划再次前往同一目的地，建议保留eSIM配置文件。部分提供商允许复用配置文件购买追加流量。未激活的eSIM不产生任何流量或费用。\n\n熟悉双SIM操作后，每次出境旅行都能顺畅地切换线路。保留号码的同时使用实惠的旅行数据，这种便利一旦体验就离不开了。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "双SIM状态下能用国内号码收短信吗？", a: "可以，只要国内运营商线路在双SIM模式下保持激活，就能收短信。但在海外收短信可能产生额外费用，请提前向运营商确认。" },
      { q: "双SIM可以同时通话和上网吗？", a: "可以，通话时也能使用数据。通话中的数据通信通常在WiFi或支持VoLTE时正常工作。" },
      { q: "旅行eSIM需要电话号码吗？", a: "不需要，纯数据eSIM套餐就够了。电话和短信走国内运营商线路，eSIM只用于上网，不需要带号码的套餐。" }
    ],
    ctaTitle: "保留号码，使用eSIM出行",
    ctaDesc: "AutoWiFi eSIM完美配合双SIM设置。保持国内号码的同时享受稳定的旅行网络。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "双SIM与eSIM"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/dual-sim-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="dual-sim-esim" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
