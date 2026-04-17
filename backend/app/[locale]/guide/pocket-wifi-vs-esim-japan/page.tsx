import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "japan-esim", title: "日本eSIMガイド" },
      { slug: "wifi-vs-esim", title: "WiFi vs eSIM比較ガイド" },
      { slug: "travel-internet-options", title: "旅行のインターネット接続方法" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "japan-esim", title: "Japan eSIM Guide" },
      { slug: "wifi-vs-esim", title: "WiFi vs eSIM Comparison" },
      { slug: "travel-internet-options", title: "Travel Internet Options" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "japan-esim", title: "일본 eSIM 가이드" },
      { slug: "wifi-vs-esim", title: "WiFi vs eSIM 비교" },
      { slug: "travel-internet-options", title: "여행 인터넷 옵션" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "japan-esim", title: "日本eSIM指南" },
      { slug: "wifi-vs-esim", title: "WiFi与eSIM对比" },
      { slug: "travel-internet-options", title: "旅行上网方式汇总" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "ポケットWiFi vs eSIM徹底比較 - 日本旅行のベストな通信手段は？",
    subtitle: "レンタルWiFiとeSIMのメリット・デメリットを料金・利便性・速度で比較",
    intro: "日本旅行の通信手段として人気のポケットWiFi（モバイルWiFiルーター）とeSIM。どちらも日本国内の大手キャリア回線（NTTドコモ、au、ソフトバンク）を利用しますが、料金体系・受け取り方法・使い勝手に大きな違いがあります。この記事では、ポケットWiFiとeSIMを徹底比較し、あなたの旅行スタイルに最適な通信手段を解説します。一人旅・グループ旅行・短期滞在・長期滞在など、シーン別のおすすめも紹介します。",
    sections: [
      {
        title: "料金比較：eSIMはポケットWiFiより最大50%お得",
        body: "ポケットWiFiのレンタル料金は1日あたり500〜1,000円が一般的です。これに加えて、補償オプション（1日200〜300円）、受取・返却の手間やモバイルバッテリーの追加レンタルを考慮すると、実質的なコストはさらに上がります。7日間のレンタルでは5,000〜10,000円程度になることが多いです。\n\neSIMの場合、1日あたり300〜500円程度で利用可能です。7日間プランで2,000〜3,500円と、ポケットWiFiの半額以下で済むケースもあります。補償オプションも不要で、受取・返却の手数料もかかりません。\n\nAutoWiFi eSIMでは、日本国内で使えるeSIMプランを幅広く取り揃えています。NTTドコモ・au・ソフトバンクの高品質回線を利用しながら、ポケットWiFiよりもリーズナブルな料金で利用できます。"
      },
      {
        title: "利便性：eSIMは受け取り・返却不要で圧倒的に手軽",
        body: "ポケットWiFiは空港カウンターや宅配での受け取りが必要です。成田空港や羽田空港のカウンターでは、到着便が集中する時間帯に30分以上並ぶこともあります。さらに、出発日にカウンターへ返却するか、返却用封筒で郵送する手間があります。返却忘れや紛失時の違約金（1〜3万円）もリスクです。\n\neSIMはオンラインで購入してQRコードをスキャンするだけ。日本出発前に自宅で設定完了でき、成田空港に到着した瞬間からすぐにインターネットが使えます。空港のカウンターに並ぶ必要もなく、出発時の返却も不要です。\n\neSIMは物理的なデバイスがないため、紛失・破損・盗難のリスクもゼロです。ポケットWiFiの端末を常にカバンに入れて持ち歩く煩わしさがありません。"
      },
      {
        title: "通信エリアと速度：どちらも日本の大手回線を使用",
        body: "ポケットWiFiもeSIMも、NTTドコモ・au・ソフトバンクの回線を利用しています。そのため、通信エリアや速度に大きな差はありません。東京、大阪、京都、北海道、沖縄など、日本全国の主要観光地で4G LTE・5Gが利用可能です。\n\n新幹線車内でも両方とも利用可能ですが、トンネル区間では一時的に接続が途切れることがあります。地方の山間部や離島では、キャリアによってカバレッジに差が出る場合があります。\n\neSIMの場合、スマートフォン本体のアンテナを使用するため、最新のiPhoneやAndroidスマートフォンでは、古いポケットWiFi端末よりも高い通信品質を得られることがあります。特に5G対応スマートフォンでは、eSIMの方が高速通信を体験できる場合があります。"
      },
      {
        title: "バッテリー問題：eSIMなら荷物も充電も不要",
        body: "ポケットWiFi最大のデメリットの一つがバッテリー問題です。多くのレンタルポケットWiFiのバッテリー持続時間は6〜10時間程度。1日中外出する観光旅行では途中で充電が必要になります。モバイルバッテリーの追加レンタルや購入が必要になることも。\n\nポケットWiFiを充電するためにカフェに寄ったり、充電スポットを探したりする時間は、貴重な旅行時間のロスです。ポケットWiFi本体の重量（約150〜200g）も荷物が増える要因になります。\n\neSIMはスマートフォンの内蔵機能を使うため、追加のデバイスやバッテリーは不要です。スマートフォン自体のバッテリー消費が若干増える程度で、通常の旅行利用では気にならないレベルです。身軽に観光したい方にはeSIMが断然おすすめです。"
      },
      {
        title: "グループ旅行 vs 一人旅：シーン別おすすめ",
        body: "ポケットWiFiの最大のメリットは、1台で複数人がWiFi接続できることです。4〜5人のグループ旅行なら、ポケットWiFi1台をシェアすることで一人あたりのコストを大幅に抑えられます。ただし、グループが別行動する場合は通信できなくなる点に注意が必要です。\n\neSIMは基本的に1台のスマートフォンに1つですが、テザリング（インターネット共有）機能を使えば他のデバイスにも共有できます。2〜3人のグループであれば、eSIMのテザリングでも十分対応可能です。\n\n一人旅や少人数旅行にはeSIMが最適です。コストが安く、荷物が増えず、受け取り・返却の手間もありません。4人以上のグループで常に一緒に行動する場合は、ポケットWiFiのシェアがコスト面で有利になることがあります。\n\n短期滞在（1〜3日）でもeSIMのコスパが優れています。長期滞在（2週間以上）の場合は、大容量のeSIMプランを選ぶとさらにお得です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMとポケットWiFi、日本旅行ではどちらがおすすめですか？", a: "一人旅やカップル旅行にはeSIMがおすすめです。料金が安く、受取・返却不要で、荷物も増えません。5人以上の大人数で常に一緒に行動するグループ旅行の場合のみ、ポケットWiFiのコストメリットが出ることがあります。" },
      { q: "eSIMのテザリングでグループ旅行に対応できますか？", a: "はい、eSIMでもテザリング機能で他のスマートフォンやタブレットにWiFiを共有できます。2〜3人のグループなら問題なく利用できます。ただし、テザリング時はバッテリー消費が早くなります。" },
      { q: "ポケットWiFiの空港受け取りは混みますか？", a: "成田空港・羽田空港では、特に午後の到着便が集中する時間帯に30分以上待つことがあります。事前にWebで予約していても受け取りカウンターでの手続きが必要です。eSIMなら空港での待ち時間はゼロです。" },
      { q: "eSIMに対応していないスマートフォンの場合はどうすればいいですか？", a: "eSIM非対応の古いスマートフォンをお使いの場合は、ポケットWiFiが唯一の選択肢となります。ただし、2020年以降に発売された主要スマートフォンのほとんどはeSIMに対応しています。iPhoneはXS以降、Androidも多くの機種が対応しています。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMで日本旅行をもっと快適に。ポケットWiFiよりお得で手軽。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ポケットWiFi vs eSIM比較",
  },
  en: {
    title: "Pocket WiFi vs eSIM for Japan Travel - Which Should You Choose?",
    subtitle: "A complete side-by-side comparison of rental WiFi and eSIM for visiting Japan",
    intro: "Pocket WiFi (mobile WiFi routers) and eSIM are the two most popular ways to stay connected during a trip to Japan. Both use Japan's major carrier networks (NTT Docomo, au, SoftBank), but they differ significantly in cost, convenience, and usability. This guide provides a detailed comparison to help you pick the best option for your travel style, whether you are a solo traveler, a couple, or a group.",
    sections: [
      {
        title: "Cost Comparison: eSIM Can Save You Up to 50%",
        body: "Pocket WiFi rental in Japan typically costs 500-1,000 yen (about $3.50-$7) per day. Add damage insurance (200-300 yen/day), and total costs for a 7-day trip can reach 5,000-10,000 yen ($35-$70). You may also need a portable charger rental.\n\neSIM plans for Japan start at around 300-500 yen ($2-$3.50) per day. A 7-day plan costs roughly 2,000-3,500 yen ($14-$25), often less than half the price of pocket WiFi. No insurance fees, no pickup or return surcharges.\n\nAutoWiFi eSIM offers a range of Japan plans on NTT Docomo, au, and SoftBank networks at prices well below typical pocket WiFi rentals."
      },
      {
        title: "Convenience: eSIM Requires No Pickup or Return",
        body: "Pocket WiFi requires pickup at an airport counter or hotel delivery. At Narita and Haneda airports, wait times of 30 minutes or more are common during peak arrival hours. You also need to return the device at a counter or mail it back before departure. Lost or damaged devices can incur penalties of 10,000-30,000 yen.\n\neSIM is purchased online and activated by scanning a QR code. You can set it up at home before your flight and start using data the moment you land at Narita, Haneda, or Kansai Airport. No counter lines, no return logistics.\n\nBecause eSIM has no physical device, there is zero risk of loss, theft, or damage. You do not need to carry an extra gadget in your bag throughout the trip."
      },
      {
        title: "Coverage and Speed: Both Use Japan's Top Networks",
        body: "Both pocket WiFi and eSIM connect through NTT Docomo, au, or SoftBank. Coverage and speed are essentially the same. Tokyo, Osaka, Kyoto, Hokkaido, and Okinawa all have strong 4G LTE and growing 5G availability.\n\nBoth work on the Shinkansen (bullet train), though tunnels may cause brief disconnections. Remote mountain areas and small islands may have variable coverage depending on the carrier.\n\nWith eSIM, your smartphone's own antenna handles the connection. Newer iPhones and Android devices often achieve better signal quality than older pocket WiFi hardware, especially on 5G bands."
      },
      {
        title: "Battery: eSIM Means No Extra Device to Charge",
        body: "One of the biggest downsides of pocket WiFi is battery life. Most rental units last 6-10 hours, which may not cover a full day of sightseeing. Carrying an extra power bank adds weight and another device to manage.\n\nHaving to find a cafe or charging spot to recharge your pocket WiFi costs precious travel time. The pocket WiFi unit itself weighs 150-200 grams, adding to your load.\n\neSIM uses your smartphone's built-in hardware, so there is no additional device or battery to worry about. The slight increase in phone battery consumption is negligible for normal tourist usage. If you want to travel light, eSIM is the clear winner."
      },
      {
        title: "Group Travel vs Solo: When to Choose Which",
        body: "Pocket WiFi's main advantage is that one device can connect 4-5 people via WiFi. For larger groups traveling together, sharing a single pocket WiFi can lower the per-person cost. However, if the group splits up, only the person carrying the device stays connected.\n\neSIM is one per device, but tethering (personal hotspot) lets you share your connection with 2-3 others. For couples or small groups, eSIM tethering works well.\n\nSolo travelers and couples should choose eSIM for its lower cost, lighter weight, and zero logistics. Groups of 5 or more who stay together may find pocket WiFi cheaper on a per-person basis.\n\nFor short trips (1-3 days), eSIM is almost always more cost-effective. For longer stays (2+ weeks), large-capacity eSIM plans offer even greater savings compared to daily pocket WiFi rental."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Which is better for Japan, eSIM or pocket WiFi?", a: "For solo travelers and couples, eSIM is the better choice. It is cheaper, requires no pickup or return, and adds no extra weight. Pocket WiFi may be more cost-effective only for groups of 5+ who stay together at all times." },
      { q: "Can I share eSIM data with my travel companions?", a: "Yes, you can use tethering (personal hotspot) to share your eSIM connection with other phones and tablets. This works well for groups of 2-3 people, though it does consume more battery." },
      { q: "Are airport pocket WiFi counters crowded?", a: "At Narita and Haneda, wait times of 30+ minutes are common during afternoon arrival peaks. Even with a reservation, you still need to visit the counter. eSIM eliminates this wait entirely." },
      { q: "What if my phone does not support eSIM?", a: "If your phone is not eSIM-compatible, pocket WiFi is your best option. However, most smartphones released since 2020 support eSIM, including iPhone XS and later and many Android models." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel Japan with AutoWiFi eSIM. Cheaper and easier than pocket WiFi.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Pocket WiFi vs eSIM Japan",
  },
  ko: {
    title: "포켓 WiFi vs eSIM - 일본 여행 최적의 통신 수단은?",
    subtitle: "렌탈 WiFi와 eSIM의 요금, 편의성, 속도를 철저 비교",
    intro: "일본 여행의 통신 수단으로 인기 있는 포켓 WiFi(모바일 WiFi 라우터)와 eSIM. 둘 다 일본의 주요 통신사 회선(NTT 도코모, au, 소프트뱅크)을 사용하지만, 요금 체계, 수령 방법, 사용 편의성에 큰 차이가 있습니다. 이 가이드에서 두 옵션을 철저히 비교하여 여행 스타일에 맞는 최적의 통신 수단을 찾아보세요.",
    sections: [
      {
        title: "요금 비교: eSIM이 포켓 WiFi보다 최대 50% 저렴",
        body: "포켓 WiFi 렌탈 요금은 하루 500~1,000엔(약 5,000~10,000원) 정도입니다. 여기에 보험 옵션(하루 200~300엔), 수령/반납 수수료, 보조 배터리 추가 렌탈 비용까지 고려하면 실질적인 비용은 더 높아집니다. 7일간 렌탈 시 5,000~10,000엔 정도입니다.\n\neSIM은 하루 300~500엔(약 3,000~5,000원) 정도로 이용 가능합니다. 7일 플랜 기준 2,000~3,500엔으로, 포켓 WiFi의 절반 이하인 경우도 많습니다. 보험 옵션이나 수령/반납 수수료도 필요 없습니다.\n\nAutoWiFi eSIM에서는 NTT 도코모, au, 소프트뱅크의 고품질 회선을 포켓 WiFi보다 저렴한 가격으로 이용할 수 있습니다."
      },
      {
        title: "편의성: eSIM은 수령·반납 불필요로 압도적으로 간편",
        body: "포켓 WiFi는 공항 카운터 또는 택배로 수령해야 합니다. 나리타 공항이나 하네다 공항 카운터에서는 도착편이 집중되는 시간대에 30분 이상 대기하는 경우도 있습니다. 출발일에는 카운터에 반납하거나 반납용 봉투로 우편 발송해야 합니다. 분실 시 위약금(1~3만 엔)도 리스크입니다.\n\neSIM은 온라인으로 구매하여 QR 코드를 스캔하기만 하면 됩니다. 출발 전 집에서 설정을 완료할 수 있으며, 나리타 공항에 도착하는 순간부터 바로 인터넷을 사용할 수 있습니다. 공항 카운터 대기도, 출발 시 반납도 필요 없습니다.\n\neSIM은 물리적 기기가 없으므로 분실, 파손, 도난 리스크가 제로입니다."
      },
      {
        title: "통신 범위와 속도: 둘 다 일본 대형 통신사 회선 사용",
        body: "포켓 WiFi도 eSIM도 NTT 도코모, au, 소프트뱅크 회선을 사용합니다. 따라서 통신 범위나 속도에 큰 차이는 없습니다. 도쿄, 오사카, 교토, 홋카이도, 오키나와 등 일본 전국 주요 관광지에서 4G LTE 및 5G를 이용할 수 있습니다.\n\n신칸센 차내에서도 양쪽 모두 이용 가능하지만, 터널 구간에서는 일시적으로 접속이 끊길 수 있습니다. 지방 산간 지역이나 작은 섬에서는 통신사에 따라 커버리지 차이가 있을 수 있습니다.\n\neSIM의 경우 스마트폰 자체 안테나를 사용하므로, 최신 iPhone이나 Android 스마트폰에서는 오래된 포켓 WiFi 단말보다 높은 통신 품질을 얻을 수 있습니다."
      },
      {
        title: "배터리 문제: eSIM이라면 추가 충전 불필요",
        body: "포켓 WiFi의 가장 큰 단점 중 하나가 배터리 문제입니다. 대부분의 렌탈 포켓 WiFi 배터리 지속 시간은 6~10시간 정도. 하루 종일 관광하는 여행에서는 도중에 충전이 필요합니다. 보조 배터리 추가 렌탈이나 구매가 필요할 수도 있습니다.\n\n포켓 WiFi를 충전하기 위해 카페에 들르거나 충전 스팟을 찾는 시간은 소중한 여행 시간 낭비입니다. 포켓 WiFi 본체 무게(약 150~200g)도 짐이 늘어나는 요인입니다.\n\neSIM은 스마트폰 내장 기능을 사용하므로 추가 기기나 배터리가 필요 없습니다. 가볍게 여행하고 싶은 분에게는 eSIM이 최적입니다."
      },
      {
        title: "그룹 여행 vs 혼자 여행: 상황별 추천",
        body: "포켓 WiFi의 가장 큰 장점은 1대로 여러 명이 WiFi 접속할 수 있다는 것입니다. 4~5명의 그룹 여행이라면 포켓 WiFi 1대를 공유하여 1인당 비용을 크게 줄일 수 있습니다. 다만 그룹이 따로 행동할 경우 통신이 안 되는 점에 주의해야 합니다.\n\neSIM은 기본적으로 스마트폰 1대에 1개이지만, 테더링(인터넷 공유) 기능으로 다른 기기에도 공유할 수 있습니다. 2~3명의 그룹이라면 eSIM 테더링으로도 충분히 대응 가능합니다.\n\n혼자 여행이나 소규모 여행에는 eSIM이 최적입니다. 비용이 저렴하고 짐이 늘지 않으며 수령/반납 번거로움도 없습니다. 5인 이상의 대규모 그룹으로 항상 함께 행동하는 경우에만 포켓 WiFi가 비용 면에서 유리합니다.\n\n단기 체류(1~3일)에도 eSIM의 가성비가 뛰어나며, 장기 체류(2주 이상)에는 대용량 eSIM 플랜을 선택하면 더욱 절약할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "일본 여행에서 eSIM과 포켓 WiFi 중 어느 것이 좋나요?", a: "혼자 여행이나 커플 여행에는 eSIM이 추천입니다. 요금이 저렴하고 수령/반납이 불필요하며 짐도 늘지 않습니다. 5인 이상의 대규모 그룹으로 항상 함께 행동하는 경우에만 포켓 WiFi의 비용 메리트가 있습니다." },
      { q: "eSIM 테더링으로 그룹 여행에 대응할 수 있나요?", a: "네, eSIM의 테더링 기능으로 다른 스마트폰이나 태블릿에 WiFi를 공유할 수 있습니다. 2~3명의 그룹이면 문제없이 이용 가능합니다. 다만 테더링 시 배터리 소모가 빨라집니다." },
      { q: "포켓 WiFi 공항 수령은 혼잡한가요?", a: "나리타 공항과 하네다 공항에서는 특히 오후 도착편이 집중되는 시간대에 30분 이상 대기하는 경우가 있습니다. 사전 웹 예약이 있어도 수령 카운터에서의 절차가 필요합니다. eSIM이라면 공항 대기 시간 제로입니다." },
      { q: "eSIM을 지원하지 않는 스마트폰은 어떻게 하나요?", a: "eSIM 비대응 구형 스마트폰을 사용하는 경우 포켓 WiFi가 유일한 선택지입니다. 다만 2020년 이후 출시된 대부분의 스마트폰은 eSIM을 지원합니다. iPhone은 XS 이후, Android도 많은 기종이 대응합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 일본 여행을 더 편리하게. 포켓 WiFi보다 저렴하고 간편.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "포켓 WiFi vs eSIM 일본",
  },
  zh: {
    title: "随身WiFi vs eSIM日本旅行对比 - 哪种上网方式更适合你？",
    subtitle: "从费用、便利性、速度全面比较租赁WiFi和eSIM",
    intro: "随身WiFi（移动WiFi路由器）和eSIM是去日本旅行最热门的两种上网方式。两者都使用日本主要运营商的网络（NTT Docomo、au、SoftBank），但在费用结构、领取方式和使用体验上有很大不同。本文将对随身WiFi和eSIM进行全面对比，帮助你根据自己的旅行风格选择最佳上网方案。",
    sections: [
      {
        title: "费用对比：eSIM最多可省50%",
        body: "随身WiFi租赁费用通常为每天500-1,000日元（约25-50元人民币）。加上保险选项（每天200-300日元）、领取和归还的手续费以及移动电源的额外租赁费用，实际成本更高。7天租赁费用通常在5,000-10,000日元左右。\n\neSIM的费用大约在每天300-500日元（约15-25元人民币）。7天套餐约2,000-3,500日元，很多情况下不到随身WiFi的一半。无需保险费用，也没有领取和归还的手续费。\n\nAutoWiFi eSIM提供多种日本套餐，使用NTT Docomo、au、SoftBank的高质量网络，价格比随身WiFi更实惠。"
      },
      {
        title: "便利性：eSIM无需领取和归还，省心省力",
        body: "随身WiFi需要在机场柜台或通过快递领取。在成田机场和羽田机场的柜台，到达航班集中的时段可能需要排队30分钟以上。出发时还需要到柜台归还或邮寄归还。丢失或损坏的违约金高达1-3万日元。\n\neSIM在线购买后扫描QR码即可激活。出发前在家就能完成设置，到达成田机场的那一刻就能立即上网。无需在机场柜台排队，出发时也无需归还。\n\neSIM没有实体设备，因此完全没有丢失、损坏、被盗的风险。不用一直把额外的设备放在包里携带。"
      },
      {
        title: "覆盖范围和速度：两者都使用日本主流网络",
        body: "随身WiFi和eSIM都使用NTT Docomo、au或SoftBank的网络。因此在覆盖范围和速度上没有明显差异。东京、大阪、京都、北海道、冲绳等日本全国主要旅游景点都有4G LTE和5G覆盖。\n\n两者在新干线车厢内都可使用，但隧道区间可能会暂时断开连接。偏远山区和小岛的覆盖情况可能因运营商而异。\n\neSIM使用智能手机本身的天线，因此最新的iPhone和Android手机可能比老旧的随身WiFi设备获得更好的信号质量，特别是在5G频段上。"
      },
      {
        title: "电池问题：eSIM无需额外充电",
        body: "随身WiFi最大的缺点之一就是电池问题。大多数租赁随身WiFi的电池续航时间只有6-10小时。全天外出观光的旅行中途需要充电。可能还需要额外租赁或购买移动电源。\n\n为了给随身WiFi充电而去咖啡馆或寻找充电点，浪费宝贵的旅行时间。随身WiFi本身的重量（约150-200克）也增加了行李负担。\n\neSIM使用智能手机的内置功能，无需额外设备或电池。想要轻装旅行的人，eSIM是最佳选择。"
      },
      {
        title: "团体旅行 vs 独自旅行：不同场景的推荐",
        body: "随身WiFi的最大优势是一台设备可以让4-5人同时连接WiFi。大型团体旅行共享一台随身WiFi可以大幅降低人均成本。但如果团队分开行动，只有携带设备的人能上网。\n\neSIM基本上是一台手机一个，但通过热点共享功能可以与其他设备共享网络。2-3人的小团体用eSIM的热点共享完全可以应对。\n\n独自旅行或小团体旅行推荐eSIM。费用低、不增加行李、无需领取和归还。只有5人以上的大团体且始终一起行动时，随身WiFi在费用上才有优势。\n\n短期停留（1-3天）eSIM的性价比也更出色。长期停留（2周以上）选择大容量eSIM套餐可以节省更多。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "日本旅行选eSIM还是随身WiFi？", a: "独自旅行或情侣旅行推荐eSIM。费用更低，无需领取和归还，也不增加行李。只有5人以上的大团体且始终一起行动时，随身WiFi才有费用优势。" },
      { q: "eSIM的热点共享能满足团体旅行吗？", a: "可以，eSIM的热点共享功能可以将网络分享给其他手机和平板。2-3人的团体完全没有问题。不过热点共享时电池消耗会加快。" },
      { q: "机场领取随身WiFi排队久吗？", a: "在成田机场和羽田机场，特别是下午到达航班集中的时段，可能需要等待30分钟以上。即使提前网上预约也需要到柜台办理手续。用eSIM的话机场等待时间为零。" },
      { q: "手机不支持eSIM怎么办？", a: "如果手机不支持eSIM，随身WiFi是唯一的选择。不过2020年以后发布的大多数智能手机都支持eSIM，包括iPhone XS及之后的机型和许多Android机型。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游日本。比随身WiFi更便宜、更方便。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "随身WiFi vs eSIM日本",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/pocket-wifi-vs-esim-japan", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const related = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="pocket-wifi-vs-esim-japan" content={CONTENT[loc]} relatedArticles={related.articles} relatedTitle={related.title} />;
}
