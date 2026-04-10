import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "留学前に比較したい関連ガイド",
    articles: [
      { slug: "first-time-esim", title: "eSIM初心者ガイド" },
      { slug: "esim-activation-timing", title: "eSIM有効化タイミング" },
      { slug: "esim-security-tips", title: "eSIMセキュリティ" },
      { slug: "travel-data-usage-tips", title: "旅行中のデータ節約術" },
      { slug: "esim-long-term-travel", title: "長期旅行のeSIM" },
    ],
  },
  en: {
    title: "Compare More Before Study Abroad",
    articles: [
      { slug: "first-time-esim", title: "First-Time eSIM Guide" },
      { slug: "esim-activation-timing", title: "When to Activate Your eSIM" },
      { slug: "esim-security-tips", title: "eSIM Security Tips" },
      { slug: "travel-data-usage-tips", title: "How to Save Mobile Data While Traveling" },
      { slug: "esim-long-term-travel", title: "eSIM for Long-Term Travel" },
    ],
  },
  ko: {
    title: "유학 전에 더 비교할 가이드",
    articles: [
      { slug: "first-time-esim", title: "eSIM 초보자 가이드" },
      { slug: "esim-activation-timing", title: "eSIM 활성화 타이밍" },
      { slug: "esim-security-tips", title: "eSIM 보안 팁" },
      { slug: "travel-data-usage-tips", title: "여행 중 데이터 절약법" },
      { slug: "esim-long-term-travel", title: "장기 여행 eSIM" },
    ],
  },
  zh: {
    title: "留学前值得继续比较的指南",
    articles: [
      { slug: "first-time-esim", title: "eSIM新手指南" },
      { slug: "esim-activation-timing", title: "eSIM激活时机" },
      { slug: "esim-security-tips", title: "eSIM安全提示" },
      { slug: "travel-data-usage-tips", title: "旅行省流量技巧" },
      { slug: "esim-long-term-travel", title: "长期旅行eSIM指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "留学生のためのeSIMガイド：海外留学で賢く通信を確保",
    subtitle: "留学準備から現地生活まで、学生のためのeSIM活用術",
    intro: "海外留学中の通信環境は、学業や日常生活に直結する重要な問題です。eSIMを活用すれば、渡航前から通信を確保し、到着後もスムーズにインターネットを利用できます。この記事では、留学生に特化したeSIMの選び方と活用法を解説します。予算を抑えながら快適な通信環境を整えましょう。本記事では留学準備から現地生活まで、学生のためのeSIM活用術・留学生にeSIMが最適な理由・留学期間に合わせたプランの選び方などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "留学生にeSIMが最適な理由",
        body: "留学生活では、授業の資料確認、友人や家族との連絡、地図での移動、銀行や行政手続きなど、インターネットが欠かせません。eSIMなら出発前に日本で通信環境を整えておけるため、到着直後の不安な時間帯でもすぐにインターネットが使えます。空港から滞在先への移動、緊急連絡先への電話など、到着初日から安心です。\n\n現地のSIMカードを購入する方法もありますが、到着直後の疲れた状態でキャリアショップを探し、英語や現地語で手続きするのはハードルが高いです。また、住所証明や銀行口座が必要な場合もあり、到着初日に契約できないケースも少なくありません。eSIMなら、これらの手間を全て省けます。\n\n費用面でも、eSIMは学生にとって魅力的です。日本のキャリアの国際ローミングは1日2,000〜3,000円かかることがありますが、eSIMなら月額3,000〜5,000円程度から利用でき、長期間の留学では大きな節約になります。"
      },
      {
        title: "留学期間に合わせたプランの選び方",
        body: "留学期間によって最適なプランは異なります。短期留学（1〜4週間）の場合は、7日間や30日間のトラベルeSIMプランが最もシンプルです。データ容量は、学校のWiFiがある前提で5〜10GBあれば十分でしょう。WiFi環境が限られる場合は、無制限プランも検討してください。\n\n中長期留学（1〜6ヶ月）の場合は、30日間プランを毎月更新するか、長期向けのサブスクリプションプランを利用するのがおすすめです。月々のデータ使用量が安定してきたら、必要十分な容量のプランに最適化できます。\n\n長期留学（6ヶ月以上）の場合は、現地のキャリアとの契約を検討する時期が来るかもしれません。ただし、最初の数ヶ月はeSIMで様子を見て、現地の生活に慣れてから契約するのが安全です。住所が確定し、銀行口座を開設した後に、現地キャリアの長期プランに移行するのがスムーズです。"
      },
      {
        title: "留学生活でのeSIM活用テクニック",
        body: "データ容量を効率的に使うためのテクニックを紹介します。まず、学校やカフェのWiFiを積極的に活用しましょう。大学のキャンパスでは通常、学生用の高速WiFiが利用できます。eSIMのデータは移動中や外出先での使用に温存し、WiFiが使える場所ではWiFiに切り替えることで、データ消費を大幅に抑えられます。\n\n動画のダウンロードやアプリの更新は、WiFi環境で行うように設定しましょう。iPhoneでは\"設定\"→\"App Store\"→\"アプリのダウンロード\"でWiFiのみに、Androidでも同様の設定が可能です。これだけでもデータの節約効果は大きいです。\n\nデュアルSIM設定も活用しましょう。日本のSIMカードを物理SIMに入れたまま、eSIMで現地データを使用すれば、日本の家族からの電話やSMSも受信できます。LINEやWhatsAppなどのアプリは、eSIMのデータ通信で利用するように設定します。"
      },
      {
        title: "留学先で困った時の対処法",
        body: "eSIMのデータ容量が不足した場合は、多くのプロバイダーでデータの追加購入（トップアップ）が可能です。プロバイダーのアプリやウェブサイトから簡単に購入できます。月末にデータが足りなくなることがわかったら、早めにトップアップするか、翌月分のプランを余裕のある容量にグレードアップしましょう。\n\n通信速度が遅い場合は、まず場所を変えてみてください。キャンパスや市街地では問題なくても、郊外や地下では速度が落ちることがあります。それでも改善しない場合は、eSIMの再起動（機内モードのオン・オフ）を試してみましょう。\n\n緊急時の備えとして、現地の緊急通報番号を事前にメモしておくことも大切です。多くのeSIMプランはデータ専用ですが、緊急通話は物理SIMの回線経由で可能な場合が多いです。また、大学の留学生サポートオフィスの連絡先も保存しておきましょう。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "留学中、日本の電話番号は維持できますか？", a: "はい、デュアルSIMで日本のSIMカードを入れたまま、eSIMを追加すれば日本の番号を維持できます。ただし、日本のキャリアの基本料金は発生し続けるため、留学が長期の場合は一時休止サービスの利用も検討してください。" },
      { q: "学生割引のあるeSIMプランはありますか？", a: "一部のeSIMプロバイダーは学生割引や長期利用割引を提供しています。また、長期プランは短期プランの繰り返し購入よりも単価が安くなる傾向があります。購入前に複数のプロバイダーを比較することをおすすめします。" },
      { q: "友人とデータをシェアできますか？", a: "直接的なデータシェアはできませんが、eSIMのテザリング機能を使えば、友人のスマートフォンやノートパソコンとインターネットを共有できます。ただし、データ消費は早くなるため、容量に注意してください。" }
    ],
    ctaTitle: "留学準備にeSIMを追加しよう",
    ctaDesc: "AutoWiFi eSIMなら、渡航先に合わせた最適なプランが見つかります。出発前に設定して、到着初日から安心のインターネット環境を。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "留学生のためのeSIM"
  },
  en: {
    title: "eSIM for Study Abroad Students: Your Complete Connectivity Guide",
    subtitle: "From pre-departure planning to campus life — smart eSIM strategies for students",
    intro: "Reliable internet is essential for study abroad students — from accessing course materials and staying in touch with family to navigating a new city. eSIM lets you secure connectivity before you even leave home, ensuring you are online the moment you land. This guide covers eSIM plan selection and usage tips tailored specifically for students on a budget.",
    sections: [
      {
        title: "Why eSIM Is Ideal for Students Abroad",
        body: "Student life abroad depends heavily on internet access — checking class materials, messaging friends and family, using maps to navigate, handling banking and administrative tasks. With eSIM, you can set up connectivity at home before departure, so you are online from the moment you step off the plane. Getting from the airport to your accommodation, contacting your school, and finding your bearings are all easier with immediate internet access.\n\nThe alternative — buying a local SIM card on arrival — means searching for a carrier store while jet-lagged and navigating the process in English or the local language. Some carriers require proof of address or a local bank account, which you may not have on day one. eSIM eliminates all these hurdles.\n\nCost is another major factor for students. International roaming from your home carrier can cost $10-20 per day, while eSIM plans start at $15-30 per month. Over a semester or year abroad, the savings are substantial."
      },
      {
        title: "Choosing a Plan Based on Your Study Duration",
        body: "The ideal plan depends on how long you will be abroad. For short programs (1-4 weeks), a 7-day or 30-day travel eSIM plan is simplest. With campus WiFi available, 5-10GB should suffice. If WiFi access is limited, consider an unlimited plan.\n\nFor medium-term study (1-6 months), either renew a 30-day plan monthly or subscribe to a longer-term plan. Once your monthly data usage stabilizes, optimize by selecting a plan that matches your actual consumption.\n\nFor long-term study (6+ months), you may eventually want a local carrier contract. However, we recommend starting with eSIM for the first few months while you settle in. Once you have a confirmed address and local bank account, transitioning to a local carrier's long-term plan becomes much smoother."
      },
      {
        title: "Smart Data Usage Tips for Students",
        body: "Here are techniques to stretch your data budget. First, take full advantage of campus and cafe WiFi. Most universities provide high-speed WiFi for students. Reserve your eSIM data for commuting and outings, and switch to WiFi whenever it is available. This dramatically reduces your data consumption.\n\nSet video downloads and app updates to WiFi-only. On iPhone, go to Settings then App Store and select WiFi Only for downloads. Android offers similar options. This single change can save gigabytes of data each month.\n\nUse dual SIM to your advantage. Keep your home country SIM in the physical slot while using the eSIM for local data. This way, you can still receive calls and texts from family on your home number. Use messaging apps like WhatsApp or LINE over the eSIM data connection for daily communication."
      },
      {
        title: "Handling Common Issues Abroad",
        body: "If you run low on data, most providers offer easy top-ups through their app or website. If you notice your data running out toward the end of the month, top up early or upgrade your plan for the following month to avoid interruptions.\n\nSlow speeds are usually location-dependent. Campus and urban areas typically have good coverage, while suburban or underground areas may be slower. If speeds remain poor, try toggling Airplane Mode on and off to reconnect to a better tower.\n\nFor emergency preparedness, save local emergency numbers before you arrive. Most eSIM plans are data-only, but emergency calls can often be placed through the physical SIM line. Also save contact information for your university's international student support office — they are an invaluable resource when you need help."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I keep my home phone number while studying abroad?", a: "Yes, use dual SIM — keep your home SIM in the physical slot and add the travel eSIM. Your home number stays active for calls and texts. For long stays, check with your home carrier about suspension plans to reduce monthly fees." },
      { q: "Are there student discounts for eSIM plans?", a: "Some eSIM providers offer student or long-term discounts. Additionally, longer-term plans generally have lower per-month costs than repeatedly buying short-term plans. Compare multiple providers before purchasing." },
      { q: "Can I share my data with friends?", a: "Direct data sharing is not possible, but you can use tethering (personal hotspot) to share your eSIM connection with friends' phones or laptops. Keep in mind this will consume your data more quickly." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM helps you find the perfect plan for your study destination. Set up before departure and stay connected from day one.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "eSIM for Students"
  },
  ko: {
    title: "유학생을 위한 eSIM 가이드: 해외 유학에서 현명하게 통신 확보",
    subtitle: "유학 준비부터 현지 생활까지, 학생을 위한 eSIM 활용법",
    intro: "해외 유학 중 통신 환경은 학업과 일상생활에 직결되는 중요한 문제입니다. eSIM을 활용하면 출국 전부터 통신을 확보하고 도착 후에도 원활하게 인터넷을 사용할 수 있습니다. 예산을 절약하면서 편안한 통신 환경을 만드는 방법을 설명합니다.",
    sections: [
      {
        title: "유학생에게 eSIM이 최적인 이유",
        body: "유학 생활에서는 수업 자료 확인, 친구·가족과의 연락, 지도로 이동, 은행·행정 절차 등 인터넷이 필수입니다. eSIM이라면 출발 전에 통신 환경을 준비할 수 있어 도착 직후의 불안한 시간에도 바로 인터넷을 사용할 수 있습니다.\n\n현지 SIM 카드를 구매하는 방법도 있지만, 도착 직후 피곤한 상태에서 매장을 찾아 외국어로 절차를 밟는 것은 쉽지 않습니다. 주소 증명이나 은행 계좌가 필요한 경우도 있어 도착 당일 계약이 안 되는 경우도 있습니다.\n\n비용 면에서도 eSIM은 학생에게 매력적입니다. 한국 통신사의 국제 로밍은 하루 만 원 이상 들 수 있지만, eSIM은 월 2만~5만 원 정도부터 이용 가능하여 장기 유학에서 크게 절약됩니다."
      },
      {
        title: "유학 기간에 맞는 플랜 선택법",
        body: "유학 기간에 따라 최적의 플랜이 다릅니다. 단기 유학(1~4주)은 7일 또는 30일 트래블 eSIM 플랜이 가장 간단합니다. 학교 WiFi가 있다면 5~10GB로 충분합니다.\n\n중장기 유학(1~6개월)은 30일 플랜을 매월 갱신하거나 장기 구독 플랜을 이용하는 것이 좋습니다. 월별 데이터 사용량이 안정되면 필요 충분한 용량의 플랜으로 최적화하세요.\n\n장기 유학(6개월 이상)은 현지 통신사 계약을 검토할 시기가 올 수 있습니다. 다만 처음 몇 개월은 eSIM으로 생활하면서 현지에 익숙해진 후 계약하는 것이 안전합니다."
      },
      {
        title: "유학 생활에서의 eSIM 활용 테크닉",
        body: "데이터를 효율적으로 사용하는 테크닉을 소개합니다. 먼저 학교나 카페의 WiFi를 적극 활용하세요. 대학 캠퍼스에서는 보통 학생용 고속 WiFi가 제공됩니다. eSIM 데이터는 이동 중이나 외출 시 사용하고, WiFi가 되는 곳에서는 WiFi로 전환하면 데이터 소비를 크게 줄일 수 있습니다.\n\n동영상 다운로드나 앱 업데이트는 WiFi 환경에서 하도록 설정하세요. iPhone은 '설정' → 'App Store'에서 WiFi 전용으로 설정 가능합니다. 이것만으로도 데이터 절약 효과가 큽니다.\n\n듀얼 SIM 설정도 활용하세요. 한국 SIM을 물리 SIM에 넣은 채로 eSIM으로 현지 데이터를 사용하면 한국 가족의 전화와 SMS도 수신할 수 있습니다."
      },
      {
        title: "유학지에서 곤란할 때의 대처법",
        body: "eSIM 데이터가 부족하면 대부분의 제공업체에서 데이터 추가 구매(톱업)가 가능합니다. 앱이나 웹사이트에서 간단히 구매할 수 있습니다. 월말에 데이터가 부족해질 것 같으면 일찍 톱업하거나 다음 달 플랜을 업그레이드하세요.\n\n속도가 느리면 먼저 장소를 바꿔보세요. 캠퍼스나 시내에서는 괜찮아도 교외나 지하에서는 느려질 수 있습니다. 개선되지 않으면 비행기 모드를 켰다 끄는 것을 시도하세요.\n\n긴급 상황 대비로 현지 긴급 전화번호를 미리 메모해 두세요. 대부분의 eSIM 플랜은 데이터 전용이지만 긴급 통화는 물리 SIM 회선으로 가능한 경우가 많습니다. 대학의 유학생 지원 사무실 연락처도 저장해 두세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "유학 중 한국 전화번호를 유지할 수 있나요?", a: "네, 듀얼 SIM으로 한국 SIM을 넣은 채 eSIM을 추가하면 한국 번호를 유지할 수 있습니다. 장기 유학의 경우 한국 통신사의 일시 정지 서비스 이용도 검토하세요." },
      { q: "학생 할인이 있는 eSIM 플랜이 있나요?", a: "일부 eSIM 제공업체는 학생 할인이나 장기 이용 할인을 제공합니다. 장기 플랜은 단기 플랜 반복 구매보다 단가가 저렴한 경향이 있습니다." },
      { q: "친구와 데이터를 공유할 수 있나요?", a: "직접적인 데이터 공유는 안 되지만 eSIM의 테더링 기능으로 친구의 스마트폰이나 노트북과 인터넷을 공유할 수 있습니다. 데이터 소비가 빨라지므로 용량에 주의하세요." }
    ],
    ctaTitle: "유학 준비에 eSIM을 추가하세요",
    ctaDesc: "AutoWiFi eSIM이라면 유학지에 맞는 최적의 플랜을 찾을 수 있습니다. 출발 전에 설정하여 도착 첫날부터 안심.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "유학생을 위한 eSIM"
  },
  zh: {
    title: "留学生eSIM指南：海外留学智慧通信方案",
    subtitle: "从出发准备到校园生活，学生专属eSIM攻略",
    intro: "留学期间的网络环境直接关系到学业和日常生活。利用eSIM，出发前就能确保通信，到达后也能顺畅上网。本文专门为留学生介绍eSIM的选择方法和使用技巧，帮你在控制预算的同时搭建舒适的通信环境。",
    sections: [
      {
        title: "eSIM最适合留学生的原因",
        body: "留学生活中，查看课程资料、联系家人朋友、导航出行、办理银行和行政手续等都离不开网络。用eSIM可以在国内提前准备好通信环境，到达后的紧张时刻也能立即上网。从机场到住处的交通、紧急联络等，从第一天起就安心。\n\n虽然也可以在当地购买SIM卡，但刚到达时在疲劳状态下找运营商门店、用外语办理手续难度不小。有些运营商还需要地址证明或银行账户，第一天可能无法签约。eSIM完全省去了这些麻烦。\n\n费用方面，eSIM对学生很有吸引力。国内运营商的国际漫游每天可能几十元，而eSIM月费约100-300元起，长期留学可以省下不少钱。"
      },
      {
        title: "根据留学时长选择套餐",
        body: "不同留学时长适合不同的套餐。短期留学（1-4周）选7天或30天旅行eSIM套餐最简单。有学校WiFi的话5-10GB足够。WiFi有限的话可以考虑无限流量套餐。\n\n中长期留学（1-6个月）建议每月续费30天套餐，或选择长期订阅套餐。月度数据使用量稳定后，可以优化为刚好够用的套餐。\n\n长期留学（6个月以上）可能需要考虑签约当地运营商。但建议先用eSIM过渡几个月，适应当地生活后再签约。等确定了地址并开了银行账户，再转到当地运营商的长期套餐更顺利。"
      },
      {
        title: "留学生活中的eSIM使用技巧",
        body: "介绍高效使用数据的技巧。首先充分利用学校和咖啡厅的WiFi。大学校园通常为学生提供高速WiFi。eSIM数据留给出行和外出时使用，有WiFi的地方切换到WiFi，可以大幅减少数据消耗。\n\n将视频下载和应用更新设置为仅WiFi。iPhone在\"设置\"→\"App Store\"中可设为WiFi专用。仅此一项就能大幅节省流量。\n\n善用双SIM设置。国内SIM卡放在实体SIM槽中，eSIM用于当地数据。这样家人的电话和短信也能收到。微信、WhatsApp等应用通过eSIM数据通信使用。"
      },
      {
        title: "在留学地遇到问题时的应对",
        body: "eSIM数据不够时，大多数提供商支持追加购买。通过应用或网站即可轻松购买。如果月底感觉流量不够，尽早充值或升级下月套餐。\n\n网速慢的话先换个地方试试。校园和市区通常没问题，但郊区或地下可能较慢。如果仍不改善，试试开关飞行模式。\n\n做好紧急准备，提前记下当地紧急电话号码。大多数eSIM套餐是纯数据的，但紧急电话通常可以通过实体SIM线路拨打。也保存好学校国际学生支持办公室的联系方式。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "留学期间可以保留国内手机号吗？", a: "可以，用双SIM保留国内SIM卡同时添加eSIM，国内号码可以继续使用。长期留学可以向运营商咨询暂停服务以减少月费。" },
      { q: "有学生优惠的eSIM套餐吗？", a: "部分eSIM提供商提供学生优惠或长期使用折扣。长期套餐的单月价格通常比反复购买短期套餐更划算。购买前建议比较多个提供商。" },
      { q: "可以和朋友共享数据吗？", a: "无法直接共享数据，但可以用eSIM的热点功能与朋友的手机或电脑共享网络。注意这样会更快消耗流量。" }
    ],
    ctaTitle: "为留学准备添上eSIM",
    ctaDesc: "AutoWiFi eSIM帮你找到适合留学目的地的最佳套餐。出发前设置好，第一天起就安心上网。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "留学生eSIM指南"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-for-students", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="esim-for-students"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
