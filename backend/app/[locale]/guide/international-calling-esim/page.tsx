import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "通話前に見ておきたい関連ガイド",
    articles: [
      { slug: "esim-vs-sim-card", title: "eSIM vs 物理SIMカード" },
      { slug: "esim-prepaid-vs-postpaid", title: "プリペイド vs ポストペイドeSIM" },
      { slug: "esim-speed-test", title: "eSIM速度テスト比較" },
      { slug: "esim-security-tips", title: "eSIMのセキュリティ" },
    ],
  },
  en: {
    title: "Compare More Before You Depend on Calls Abroad",
    articles: [
      { slug: "esim-vs-sim-card", title: "eSIM vs Physical SIM Card" },
      { slug: "esim-prepaid-vs-postpaid", title: "Prepaid vs Postpaid eSIM" },
      { slug: "esim-speed-test", title: "eSIM Speed Test Comparison" },
      { slug: "esim-security-tips", title: "eSIM Security Tips" },
    ],
  },
  ko: {
    title: "해외 통화 전에 함께 볼 가이드",
    articles: [
      { slug: "esim-vs-sim-card", title: "eSIM vs 물리 SIM" },
      { slug: "esim-prepaid-vs-postpaid", title: "선불 vs 후불 eSIM" },
      { slug: "esim-speed-test", title: "eSIM 속도 테스트 비교" },
      { slug: "esim-security-tips", title: "eSIM 보안 팁" },
    ],
  },
  zh: {
    title: "在海外依赖通话前可继续比较的指南",
    articles: [
      { slug: "esim-vs-sim-card", title: "eSIM vs 实体SIM卡" },
      { slug: "esim-prepaid-vs-postpaid", title: "预付vs后付eSIM" },
      { slug: "esim-speed-test", title: "eSIM速度测试对比" },
      { slug: "esim-security-tips", title: "eSIM安全提示" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIMで国際電話 - VoIP・WhatsApp・通話オプション完全ガイド",
    subtitle: "海外旅行中の通話方法を徹底解説。eSIMとVoIPアプリで通話料を節約",
    intro: "海外旅行中に電話をかける必要がある場面は意外と多いものです。ホテルの予約確認、レストランの問い合わせ、緊急連絡など、eSIMのデータ通信を活用すれば、高額な国際通話料を避けながらスマートに通話ができます。本ガイドではeSIMを使った各種通話方法を解説します。本記事では海外旅行中の通話方法を徹底解説。eSIMとVoIPアプリで通話料を節約・eSIMでの通話方法の種類・おすすめVoIPアプリと使い方などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "eSIMでの通話方法の種類",
        body: "eSIMを使った通話には大きく3つの方法があります。まずVoIPアプリ通話は、WhatsApp、LINE、FaceTime、Skypeなどのアプリを使い、データ通信経由で音声通話やビデオ通話を行う方法です。相手も同じアプリを使っていれば無料で通話できるため、最もコストパフォーマンスの高い選択肢です。\n\n次にVoIPの電話番号発信として、Skype OutやLINE Outなどのサービスを利用すれば、通常の電話番号に対してデータ通信経由で発信できます。ホテルやレストランなどアプリを使っていない相手への連絡に便利で、国際電話の数分の一の料金で通話可能です。\n\n最後に電話番号付きeSIMプランです。一部のeSIMプランには現地の電話番号が付与されるものがあり、データ通信だけでなく通常の音声通話も利用できます。現地の番号で発着信できるため、ビジネス出張や長期滞在に適しています。"
      },
      {
        title: "おすすめVoIPアプリと使い方",
        body: "WhatsAppは世界で最も利用者が多いメッセージングアプリで、音声通話とビデオ通話の品質も高いです。ヨーロッパ、南米、東南アジアでは特に普及率が高く、現地の人とのコミュニケーションにも使えます。通話品質は安定しており、1時間あたり約30MBのデータを消費します。\n\nLINEは日本、タイ、台湾、インドネシアで広く使われています。LINE Out機能を使えば、アプリを持っていない相手にも低料金で電話をかけることができます。日本の固定電話への通話は1分あたり約3円と非常に安価です。\n\nFaceTimeはiPhoneユーザー同士なら最も手軽な選択肢です。Audio通話は高音質で、1時間あたり約40MBのデータ消費です。SkypeはSkype Out機能で世界中の電話番号に低料金で発信でき、ビジネスユーザーに人気です。"
      },
      {
        title: "通話品質を確保するためのヒント",
        body: "VoIPアプリでの通話品質は、データ通信の速度と安定性に大きく依存します。安定した通話を行うためには、最低でも下り500kbps以上の速度が必要です。ビデオ通話の場合は1.5Mbps以上が推奨されます。AutoWiFiのeSIMは現地キャリアに直接接続するため、安定した通話品質を確保しやすいのが特徴です。\n\nWiFi環境での通話が最も安定しますが、移動中はeSIMのデータ通信を使うことになります。建物の中や地下では電波が弱くなる場合があるので、重要な通話は電波状態の良い場所で行いましょう。\n\nまた、通話前にVoIPアプリのマイクとスピーカーの設定を確認しておくことも重要です。ヘッドフォンやイヤホンを使用すると、周囲の騒音を遮断してクリアな通話が可能になります。"
      },
      {
        title: "緊急通話と注意事項",
        body: "重要な注意点として、データ専用のeSIMプランでは緊急通報（110番、119番、911など）ができない場合があります。緊急時に備えて、元のSIMカードの通話機能を維持しておくか、電話番号付きのeSIMプランを選ぶことをおすすめします。\n\nまた、旅行先の緊急電話番号を事前に確認しておきましょう。ヨーロッパ全域では112、アメリカは911、オーストラリアは000など、国によって番号が異なります。デュアルSIM端末であれば、データ通信用のeSIMと緊急通話用のSIMを同時に設定できます。\n\nホテルやレストランへの連絡が必要な場合は、電話の代わりにGoogle Mapsから直接メッセージを送ったり、公式サイトのチャット機能を利用する方法も検討してください。通話が不要なケースも意外と多いものです。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMのデータプランだけで電話はできますか？", a: "VoIPアプリ（WhatsApp、LINE、Skypeなど）を使えば、データ通信経由で音声通話やビデオ通話が可能です。ただし、通常の電話番号への発信にはSkype OutやLINE Outなどの追加サービスが必要です。" },
      { q: "VoIP通話のデータ消費量はどれくらいですか？", a: "音声通話は1時間あたり約30〜50MB、ビデオ通話は1時間あたり約300MB〜1GBです。テキストメッセージと比べると多いですが、動画視聴などに比べれば少ない消費量です。" },
      { q: "海外で緊急電話はかけられますか？", a: "データ専用eSIMプランでは緊急通報ができない場合があります。緊急時に備えて、元のSIMの通話機能を維持するか、電話番号付きeSIMプランの利用をおすすめします。" },
      { q: "国際電話の料金はどれくらい節約できますか？", a: "VoIPアプリ同士の通話は無料です。Skype OutやLINE Outを使った電話番号への発信も、通常の国際電話の10分の1以下の料金で利用できます。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiのeSIMで安定したデータ通信を確保し、VoIPアプリで賢く通話。高額な国際電話料金とはお別れです。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIMで国際通話"
  },
  en: {
    title: "International Calls with eSIM - VoIP & WhatsApp Options",
    subtitle: "Save on international calling costs using eSIM data and VoIP apps",
    intro: "Phone calls during international travel are more common than you might expect. From confirming hotel reservations to contacting restaurants and handling emergencies, your eSIM data connection enables affordable voice communication without expensive international calling rates. This guide covers all the ways to make calls using eSIM.",
    sections: [
      {
        title: "Types of Calling Options with eSIM",
        body: "There are three main ways to make calls with an eSIM. First, VoIP app calls use apps like WhatsApp, LINE, FaceTime, and Skype to make voice or video calls over your data connection. When both parties use the same app, calls are completely free, making this the most cost-effective option.\n\nSecond, VoIP-to-phone services like Skype Out and LINE Out let you call regular phone numbers over your data connection. This is useful for reaching hotels, restaurants, and other businesses that do not use messaging apps, at a fraction of traditional international calling rates.\n\nThird, some eSIM plans include a local phone number with voice calling capability. These plans allow you to make and receive standard phone calls using a local number, which is particularly useful for business travelers and long-term visitors who need a reachable phone number."
      },
      {
        title: "Best VoIP Apps for Travelers",
        body: "WhatsApp is the most widely used messaging app globally, with excellent voice and video call quality. It is especially popular in Europe, South America, and Southeast Asia, making it useful for communicating with locals as well. Calls consume about 30MB of data per hour and maintain good quality even on moderate connections.\n\nLINE is widely used in Japan, Thailand, Taiwan, and Indonesia. Its LINE Out feature lets you call non-app users at low rates. Calls to Japanese landlines cost roughly 3 cents per minute. FaceTime is the easiest option between iPhone users, offering high-quality audio calls that use about 40MB per hour.\n\nSkype remains popular with business travelers thanks to Skype Out, which lets you call any phone number worldwide at competitive rates. Monthly subscription plans are available for frequent callers to specific countries."
      },
      {
        title: "Tips for Reliable Call Quality",
        body: "VoIP call quality depends heavily on your data connection speed and stability. You need at least 500kbps download speed for clear voice calls, and 1.5Mbps or higher for video calls. AutoWiFi's eSIM connects directly to local carriers, which helps maintain the consistent speeds needed for reliable calls.\n\nWiFi connections generally provide the most stable calling experience, but when you are on the move, your eSIM data connection takes over. Signal strength may be weaker inside buildings or underground, so try to make important calls from locations with good reception.\n\nBefore making calls, verify your VoIP app's microphone and speaker settings. Using headphones or earbuds blocks ambient noise and provides a much clearer conversation for both parties."
      },
      {
        title: "Emergency Calls and Important Notes",
        body: "A critical point to remember is that data-only eSIM plans may not support emergency calls to numbers like 911, 112, or local equivalents. To ensure emergency access, keep your original SIM's voice capability active or choose an eSIM plan that includes a phone number.\n\nResearch emergency numbers for your destination before traveling. Europe uses 112 universally, the US uses 911, Australia uses 000, and numbers vary by country. With a dual-SIM phone, you can configure one SIM for data and another for emergency voice capability.\n\nFor non-emergency contacts like hotels and restaurants, consider alternatives to phone calls. Google Maps lets you message businesses directly, and many establishments offer chat on their websites. You may find that fewer situations actually require a phone call than you initially expected."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I make phone calls with a data-only eSIM?", a: "Yes, using VoIP apps like WhatsApp, LINE, or Skype over your data connection. To call regular phone numbers, use services like Skype Out or LINE Out which route calls over data at low rates." },
      { q: "How much data do VoIP calls use?", a: "Voice calls use about 30-50MB per hour. Video calls consume 300MB-1GB per hour. This is modest compared to video streaming but higher than text messaging." },
      { q: "Can I make emergency calls with eSIM abroad?", a: "Data-only eSIM plans may not support emergency calls. Keep your original SIM's voice capability active or use an eSIM plan with a phone number for emergency access." },
      { q: "How much can I save on international calls?", a: "VoIP app-to-app calls are free. Calling phone numbers through Skype Out or LINE Out costs a fraction of traditional international rates, often saving 90% or more." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi's eSIM provides stable data for crystal-clear VoIP calls. Say goodbye to expensive international calling charges.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "International Calling with eSIM"
  },
  ko: {
    title: "eSIM으로 국제 전화하기 - VoIP·WhatsApp·통화 옵션 완전 가이드",
    subtitle: "eSIM 데이터와 VoIP 앱으로 국제 통화료를 절약하는 방법",
    intro: "해외 여행 중 전화가 필요한 상황은 의외로 많습니다. 호텔 예약 확인, 레스토랑 문의, 긴급 연락 등 eSIM의 데이터 통신을 활용하면 비싼 국제 통화료를 피하면서 스마트하게 전화할 수 있습니다.",
    sections: [
      {
        title: "eSIM 통화 방법의 종류",
        body: "eSIM을 이용한 통화에는 크게 3가지 방법이 있습니다. 첫째 'VoIP 앱 통화'로 WhatsApp, 카카오톡, FaceTime, Skype 등의 앱을 사용하여 데이터 통신으로 음성 및 영상 통화를 합니다. 상대방도 같은 앱을 사용하면 무료로 통화할 수 있어 가장 경제적입니다.\n\n둘째 'VoIP 전화번호 발신'으로 Skype Out이나 LINE Out 등의 서비스를 이용하면 일반 전화번호로 데이터 통신을 통해 발신할 수 있습니다. 앱을 사용하지 않는 호텔이나 레스토랑에 연락할 때 편리하며, 국제 전화의 몇 분의 일 요금으로 통화 가능합니다.\n\n셋째 '전화번호 포함 eSIM 플랜'으로 일부 eSIM 플랜에는 현지 전화번호가 부여되어 일반 음성 통화도 이용할 수 있습니다. 비즈니스 출장이나 장기 체류에 적합합니다."
      },
      {
        title: "추천 VoIP 앱과 사용법",
        body: "WhatsApp은 전 세계에서 가장 많이 사용되는 메시징 앱으로, 음성 및 영상 통화 품질도 우수합니다. 유럽, 남미, 동남아시아에서 특히 보급률이 높아 현지인과의 소통에도 활용할 수 있습니다. 시간당 약 30MB의 데이터를 소비합니다.\n\n카카오톡은 한국에서 가장 널리 사용되는 메시징 앱이며, 보이스톡 기능으로 고품질 무료 통화가 가능합니다. LINE은 일본, 태국, 대만에서 널리 사용되며, LINE Out 기능으로 앱이 없는 상대에게도 저렴하게 전화할 수 있습니다.\n\nFaceTime은 iPhone 사용자끼리 가장 간편한 선택지입니다. 오디오 통화는 고음질이며 시간당 약 40MB의 데이터를 소비합니다. Skype는 Skype Out 기능으로 전 세계 전화번호에 저렴하게 발신할 수 있어 비즈니스 사용자에게 인기입니다."
      },
      {
        title: "통화 품질 확보를 위한 팁",
        body: "VoIP 앱의 통화 품질은 데이터 통신의 속도와 안정성에 크게 의존합니다. 안정적인 통화를 위해서는 최소 500kbps 이상의 다운로드 속도가 필요합니다. 영상 통화의 경우 1.5Mbps 이상을 권장합니다. AutoWiFi의 eSIM은 현지 통신사에 직접 연결되어 안정적인 통화 품질을 확보하기 쉽습니다.\n\nWiFi 환경에서의 통화가 가장 안정적이지만, 이동 중에는 eSIM 데이터 통신을 사용하게 됩니다. 건물 안이나 지하에서는 전파가 약해질 수 있으므로 중요한 통화는 수신 상태가 좋은 곳에서 하세요.\n\n통화 전에 VoIP 앱의 마이크와 스피커 설정을 확인하는 것도 중요합니다. 이어폰을 사용하면 주변 소음을 차단하여 더 선명한 통화가 가능합니다."
      },
      {
        title: "긴급 전화와 주의사항",
        body: "중요한 주의사항으로, 데이터 전용 eSIM 플랜에서는 긴급 전화(112, 911 등)를 할 수 없는 경우가 있습니다. 긴급 시를 대비하여 기존 SIM의 통화 기능을 유지하거나 전화번호가 포함된 eSIM 플랜을 선택하세요.\n\n여행지의 긴급 전화번호를 사전에 확인해 두세요. 유럽 전역은 112, 미국은 911, 호주는 000 등 국가마다 번호가 다릅니다. 듀얼 SIM 단말이면 데이터용 eSIM과 긴급 통화용 SIM을 동시에 설정할 수 있습니다.\n\n호텔이나 레스토랑 연락이 필요한 경우, 전화 대신 Google Maps에서 직접 메시지를 보내거나 공식 사이트의 채팅 기능을 이용하는 방법도 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "데이터 전용 eSIM으로 전화할 수 있나요?", a: "WhatsApp, 카카오톡, Skype 등 VoIP 앱을 사용하면 데이터 통신으로 음성 및 영상 통화가 가능합니다. 일반 전화번호로 발신하려면 Skype Out이나 LINE Out 등의 서비스가 필요합니다." },
      { q: "VoIP 통화의 데이터 소비량은 얼마인가요?", a: "음성 통화는 시간당 약 30~50MB, 영상 통화는 시간당 약 300MB~1GB입니다. 동영상 시청에 비하면 적지만 텍스트 메시지보다는 많습니다." },
      { q: "해외에서 긴급 전화를 걸 수 있나요?", a: "데이터 전용 eSIM 플랜에서는 긴급 전화가 안 될 수 있습니다. 기존 SIM의 통화 기능을 유지하거나 전화번호 포함 eSIM 플랜을 이용하세요." },
      { q: "국제 전화 요금을 얼마나 절약할 수 있나요?", a: "VoIP 앱 간 통화는 무료입니다. Skype Out이나 LINE Out을 이용한 전화번호 발신도 일반 국제 전화의 10분의 1 이하 요금입니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi의 eSIM으로 안정적인 데이터 통신을 확보하고, VoIP 앱으로 현명하게 통화하세요. 비싼 국제 전화 요금은 이제 안녕.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM 국제 통화"
  },
  zh: {
    title: "用eSIM打国际电话 - VoIP、WhatsApp与通话方案完全指南",
    subtitle: "利用eSIM数据和VoIP应用节省国际通话费用",
    intro: "海外旅行中需要打电话的情况比想象的多。确认酒店预订、咨询餐厅、紧急联络等，利用eSIM的数据连接可以避免昂贵的国际通话费，智能地进行通话。本指南详解使用eSIM的各种通话方式。",
    sections: [
      {
        title: "eSIM的通话方式类型",
        body: "使用eSIM通话主要有三种方式。第一种是'VoIP应用通话'，使用WhatsApp、微信、FaceTime、Skype等应用通过数据网络进行语音或视频通话。双方使用同一应用即可免费通话，是性价比最高的选择。\n\n第二种是'VoIP拨打电话号码'，通过Skype Out等服务可以用数据网络拨打普通电话号码。联系酒店、餐厅等不使用即时通讯应用的场所时非常方便，费用仅为国际长途的几分之一。\n\n第三种是'含电话号码的eSIM套餐'。部分eSIM套餐附带当地电话号码，不仅可以使用数据，还能进行普通语音通话。适合商务出差和长期停留。"
      },
      {
        title: "推荐VoIP应用及使用方法",
        body: "WhatsApp是全球使用人数最多的即时通讯应用，语音和视频通话质量优秀。在欧洲、南美、东南亚特别普及，与当地人交流时也很实用。每小时约消耗30MB数据。\n\n微信是中国用户的首选通讯工具，语音通话和视频通话功能完善。LINE在日本、泰国、台湾广泛使用，LINE Out功能可以低价拨打非应用用户的电话。\n\nFaceTime是iPhone用户之间最便捷的选择，音频通话高质量，每小时约40MB数据消耗。Skype的Skype Out功能可以低价拨打全球电话号码，受商务用户欢迎。"
      },
      {
        title: "确保通话质量的技巧",
        body: "VoIP应用的通话质量很大程度上取决于数据连接的速度和稳定性。稳定通话至少需要500kbps的下载速度，视频通话建议1.5Mbps以上。AutoWiFi的eSIM直连当地运营商，有助于保持通话所需的稳定速度。\n\nWiFi环境下通话最为稳定，但移动中需要使用eSIM数据连接。建筑物内或地下信号可能较弱，重要通话请在信号好的地方进行。\n\n通话前确认VoIP应用的麦克风和扬声器设置也很重要。使用耳机可以隔绝环境噪音，实现更清晰的通话。"
      },
      {
        title: "紧急电话与注意事项",
        body: "需要注意的是，纯数据eSIM套餐可能无法拨打紧急电话（如110、120、911等）。为应对紧急情况，建议保持原SIM卡的通话功能，或选择含电话号码的eSIM套餐。\n\n出发前了解目的地的紧急电话号码。欧洲统一使用112，美国是911，澳大利亚是000，各国号码不同。双SIM手机可以同时设置数据eSIM和紧急通话SIM。\n\n需要联系酒店或餐厅时，可以考虑通过Google Maps直接发消息或使用官网的在线客服等替代方式。实际上很多情况不一定需要打电话。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "纯数据eSIM能打电话吗？", a: "可以通过WhatsApp、微信、Skype等VoIP应用使用数据网络进行语音和视频通话。拨打普通电话号码需要使用Skype Out等付费服务。" },
      { q: "VoIP通话消耗多少流量？", a: "语音通话每小时约30-50MB，视频通话每小时约300MB-1GB。与视频流媒体相比消耗较少，但比文字消息多。" },
      { q: "在国外能拨打紧急电话吗？", a: "纯数据eSIM套餐可能无法拨打紧急电话。建议保持原SIM的通话功能或使用含电话号码的eSIM套餐以备紧急情况。" },
      { q: "能节省多少国际通话费？", a: "VoIP应用间通话免费。通过Skype Out拨打电话号码的费用也不到传统国际长途的十分之一，节省90%以上。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi的eSIM提供稳定数据连接，配合VoIP应用实现清晰通话。告别昂贵的国际通话费。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM国际通话"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/international-calling-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="international-calling-esim" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
