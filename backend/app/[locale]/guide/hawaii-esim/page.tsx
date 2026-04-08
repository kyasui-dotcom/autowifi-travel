import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "ハワイeSIMガイド - ワイキキ・マウイ・ビッグアイランドで快適通信",
    subtitle: "USキャリアの高品質ネットワークで、ハワイ全島をカバー",
    intro: "ハワイはアメリカ合衆国の一部であるため、USキャリア（T-Mobile、AT&T、Verizonなど）の高品質ネットワークを利用できます。eSIMを使えば、ホノルル空港に到着した瞬間から高速データ通信が可能。ワイキキビーチでのSNS投稿、マウイ島のハナロードでのナビ利用、ビッグアイランドの火山国立公園での情報検索まで、ハワイ旅行をスマートに楽しむためのeSIMガイドをお届けします。",
    sections: [
      {
        title: "ハワイでのeSIM通信環境",
        body: "ハワイはアメリカ本土と同じ通信インフラを使用しており、主要キャリアであるT-Mobile、AT&T、Verizonの4G LTE/5Gネットワークが全島をカバーしています。eSIMプランの多くはこれらのUSキャリアに接続するため、通信品質は非常に高く安定しています。\n\nオアフ島のホノルルやワイキキエリアでは5G通信も利用可能で、動画のストリーミングやビデオ通話もストレスなく行えます。マウイ島やビッグアイランドのリゾートエリアでも4G LTEが広くカバーされており、旅行中の通信に困ることはほとんどありません。\n\nただし、ハレアカラ山頂やワイピオ渓谷の奥地、ナ・パリ・コースト（カウアイ島）のトレイル中など、人里離れた自然エリアでは電波が届きにくい場所もあります。こうしたエリアに行く場合は、事前にオフラインマップをダウンロードしておくと安心です。"
      },
      {
        title: "島ごとの通信事情",
        body: "オアフ島はハワイで最も通信インフラが充実しています。ワイキキ、アラモアナ、カイルアなどの主要エリアでは5G通信も利用でき、ホテルやレストランのWiFiと合わせて快適なネット環境が整っています。ノースショアのハレイワ周辺も4G LTEがカバーしています。\n\nマウイ島では、カアナパリ、ラハイナ（復興中）、キヘイ、ワイレアなどのリゾートエリアで安定した4G通信が可能です。有名なハナロードのドライブ中も、多くの区間で通信が利用できますが、一部トンネル周辺や渓谷部では途切れることがあります。ハレアカラ山頂へ向かう途中は標高が上がるにつれて電波が弱くなるため注意が必要です。\n\nビッグアイランド（ハワイ島）では、コナ、ヒロ、ワイコロアリゾートエリアで良好な通信が可能です。ハワイ火山国立公園のビジターセンター周辺では通信できますが、チェーン・オブ・クレーターズ・ロードの先端付近では電波が弱くなります。マウナケア山頂付近も電波が届きにくいエリアです。"
      },
      {
        title: "ハワイeSIMの料金プラン",
        body: "ハワイで使えるeSIMプランは、アメリカ全土対応のUSプランとなります。一般的な料金の目安は、3GB/7日間で約1,500〜2,500円、5GB/15日間で約2,500〜4,000円、10GB/30日間で約4,000〜6,000円程度です。無制限データプランも5,000〜8,000円程度で利用できます。\n\nハワイ旅行は4泊6日や5泊7日が一般的なので、7日間プランが最もコスパが良いでしょう。ワイキキでのショッピングやレストラン検索、Googleマップでのナビ利用、SNSへの写真投稿程度であれば、3GBプランで十分です。動画視聴やビデオ通話を頻繁にする場合は、5GB以上のプランがおすすめです。\n\nAutoWiFiのeSIMプランはUSキャリアに直接接続するため、通信速度・安定性ともに高品質です。プランは出発前にオンラインで購入でき、QRコードをスキャンするだけで設定完了。ハワイ到着後すぐに使い始められます。"
      },
      {
        title: "eSIMの設定方法と注意点",
        body: "ハワイ向けeSIMの設定はとても簡単です。まず、お使いのスマートフォンがeSIM対応であることを確認してください（iPhone XS以降、Google Pixel 3以降、Samsung Galaxy S20以降など）。次に、AutoWiFiでプランを購入するとQRコードがメールで届きます。このQRコードをスマートフォンの設定画面からスキャンするだけで、eSIMプロファイルがインストールされます。\n\n設定は日本出発前に行うことをおすすめします。WiFi環境でQRコードをスキャンし、eSIMプロファイルをダウンロードしておきましょう。ハワイ到着後は、設定画面でeSIMの回線をオンにするだけで通信が開始されます。日本のSIMはそのまま残せるので、帰国後はeSIMをオフにして元のSIMに戻すだけです。\n\n注意点として、eSIMのデータローミング設定をオンにする必要がある場合があります。また、ハワイはアメリカのタイムゾーン（HST、UTC-10）なので、プランの有効期限は現地時間で計算されます。時差の関係で日本出発日に有効化すると、実質的な利用日数が1日少なくなる場合があるため、現地到着後に有効化するのがベストです。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "ハワイのeSIMはアメリカ本土でも使えますか？", a: "はい、ハワイ向けeSIMプランはアメリカ全土対応のUSプランなので、ハワイだけでなくアメリカ本土でもそのまま使えます。ロサンゼルスやサンフランシスコでのストップオーバーがある場合も追加料金なしで利用可能です。" },
      { q: "ワイキキビーチでも通信できますか？", a: "はい、ワイキキビーチエリアは通信環境が非常に良好です。ビーチでもSNSの投稿やメッセージの送受信、動画のストリーミングが快適に行えます。5Gエリアにも含まれているため、高速通信が期待できます。" },
      { q: "ハワイ旅行に必要なデータ量の目安は？", a: "一般的な観光利用（地図ナビ、SNS、メール、ウェブ検索）で1日あたり約300〜500MB程度です。4泊6日の旅行なら3GBプランで余裕があります。動画視聴やビデオ通話をよく使う場合は5GB以上がおすすめです。" },
      { q: "離島（ラナイ島、モロカイ島）でも使えますか？", a: "ラナイ島ではフォーシーズンズリゾート周辺で通信可能です。モロカイ島はカウナカカイ周辺で4G LTEが利用できますが、島の東部は電波が弱いエリアがあります。いずれもUSキャリアのカバレッジ内ですが、リゾートエリア以外では事前確認をおすすめします。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMなら、ハワイ全島で使える高品質USネットワークプランを数秒で設定。空港でのSIMカード購入やWiFiレンタルの手間は不要です。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "ハワイeSIM",
  },
  en: {
    title: "Hawaii eSIM Guide - Stay Connected in Waikiki, Maui & Big Island",
    subtitle: "Premium US carrier networks covering all Hawaiian islands",
    intro: "Hawaii is part of the United States, which means you get access to top-tier US carrier networks like T-Mobile, AT&T, and Verizon. With an eSIM, you can start using high-speed data the moment you land at Honolulu Airport. From posting beach photos in Waikiki to navigating the Road to Hana in Maui and exploring Volcanoes National Park on the Big Island, this guide covers everything you need to stay connected during your Hawaiian vacation.",
    sections: [
      {
        title: "eSIM Coverage in Hawaii",
        body: "Hawaii uses the same telecommunications infrastructure as the US mainland, with major carriers T-Mobile, AT&T, and Verizon providing 4G LTE and 5G coverage across all islands. Most eSIM plans connect to these US carriers, ensuring high-quality and reliable connectivity throughout your trip.\n\nIn Honolulu and the Waikiki area on Oahu, 5G coverage is available, allowing seamless video streaming and video calls. Resort areas on Maui and the Big Island also have extensive 4G LTE coverage, so you will rarely experience connectivity issues during your travels.\n\nHowever, remote natural areas such as the summit of Haleakala, deep Waipio Valley, and trails along the Na Pali Coast on Kauai may have limited or no cell signal. If you plan to visit these areas, downloading offline maps beforehand is recommended."
      },
      {
        title: "Island-by-Island Coverage Details",
        body: "Oahu has the best telecommunications infrastructure in Hawaii. Key areas like Waikiki, Ala Moana, and Kailua have 5G coverage, and combined with hotel and restaurant WiFi, you will enjoy excellent connectivity. Even the North Shore around Haleiwa has solid 4G LTE coverage.\n\nOn Maui, resort areas including Kaanapali, Kihei, and Wailea offer reliable 4G coverage. During the famous Road to Hana drive, most stretches have cell service, though some tunnel areas and deep valleys may experience brief dropouts. Signal weakens as you ascend toward the Haleakala summit.\n\nThe Big Island (Hawaii Island) has good coverage in Kona, Hilo, and the Waikoloa resort area. Hawaii Volcanoes National Park has service near the visitor center, but signal weakens along the far end of Chain of Craters Road. The Mauna Kea summit area also has limited coverage."
      },
      {
        title: "Hawaii eSIM Plans and Pricing",
        body: "eSIM plans for Hawaii are US-wide plans that work across all 50 states. Typical pricing ranges from $10-18 for 3GB/7 days, $18-30 for 5GB/15 days, and $30-45 for 10GB/30 days. Unlimited data plans are also available for $35-60.\n\nSince most Hawaii trips last 5-7 days, the 7-day plan offers the best value. For typical tourist usage including Google Maps navigation, social media, restaurant searches, and email, a 3GB plan is usually sufficient. If you plan to stream videos or make frequent video calls, consider a 5GB or higher plan.\n\nAutoWiFi eSIM plans connect directly to US carriers for premium speed and reliability. Plans can be purchased online before departure, and setup takes just minutes with a QR code scan. You will be connected the moment you arrive in Hawaii."
      },
      {
        title: "Setup Instructions and Tips",
        body: "Setting up your Hawaii eSIM is straightforward. First, verify that your phone supports eSIM (iPhone XS or later, Google Pixel 3 or later, Samsung Galaxy S20 or later). After purchasing your plan from AutoWiFi, you will receive a QR code via email. Simply scan this code in your phone's settings to install the eSIM profile.\n\nWe recommend completing the setup before departing. Scan the QR code and download the eSIM profile while connected to WiFi. Once you arrive in Hawaii, just enable the eSIM line in your settings and you are ready to go. Your original SIM stays active, so switching back when you return home is simple.\n\nOne important tip: you may need to enable data roaming in your eSIM settings. Also note that Hawaii is in the HST timezone (UTC-10), and plan validity periods are calculated in local time. To maximize your usage days, it is best to activate your plan after arriving in Hawaii rather than before departure."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use a Hawaii eSIM on the US mainland too?", a: "Yes, Hawaii eSIM plans are US-wide plans that work across all 50 states. If you have a layover in Los Angeles or San Francisco, you can use the same plan at no extra cost." },
      { q: "Will I have coverage on Waikiki Beach?", a: "Absolutely. Waikiki Beach has excellent coverage including 5G. You can comfortably post to social media, stream videos, and make video calls right from the beach." },
      { q: "How much data do I need for a Hawaii trip?", a: "For typical tourist use (maps, social media, email, web browsing), you will use about 300-500MB per day. A 3GB plan is sufficient for a 5-7 day trip. Choose 5GB or more if you plan to stream videos or make frequent video calls." },
      { q: "Does eSIM work on smaller islands like Lanai and Molokai?", a: "Lanai has coverage around the Four Seasons resort area. Molokai has 4G LTE near Kaunakakai, though the eastern part of the island has weaker signal. Both islands are within US carrier coverage, but we recommend checking specific coverage maps for remote areas." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM gives you premium US network coverage across all Hawaiian islands. Set up in seconds — no SIM card swaps or WiFi rental needed.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Hawaii eSIM",
  },
  ko: {
    title: "하와이 eSIM 가이드 - 와이키키·마우이·빅아일랜드에서 쾌적한 통신",
    subtitle: "US 캐리어의 고품질 네트워크로 하와이 전 섬 커버",
    intro: "하와이는 미국의 일부이므로 T-Mobile, AT&T, Verizon 등 US 캐리어의 고품질 네트워크를 이용할 수 있습니다. eSIM을 사용하면 호놀룰루 공항에 도착하는 순간부터 고속 데이터 통신이 가능합니다. 와이키키 비치에서의 SNS 포스팅, 마우이 섬 하나 로드에서의 내비게이션, 빅아일랜드 화산 국립공원에서의 정보 검색까지, 하와이 여행을 스마트하게 즐기기 위한 eSIM 가이드를 소개합니다.",
    sections: [
      {
        title: "하와이 eSIM 통신 환경",
        body: "하와이는 미국 본토와 동일한 통신 인프라를 사용하며, 주요 캐리어인 T-Mobile, AT&T, Verizon의 4G LTE/5G 네트워크가 전 섬을 커버합니다. 대부분의 eSIM 플랜은 이러한 US 캐리어에 연결되므로 통신 품질이 매우 높고 안정적입니다.\n\n오아후 섬의 호놀룰루와 와이키키 지역에서는 5G 통신도 이용 가능하며, 동영상 스트리밍이나 화상 통화도 원활하게 할 수 있습니다. 마우이 섬과 빅아일랜드의 리조트 지역에서도 4G LTE가 폭넓게 커버되어 여행 중 통신에 어려움을 겪는 일은 거의 없습니다.\n\n다만 할레아칼라 산정상, 와이피오 계곡 깊숙한 곳, 나팔리 코스트(카우아이 섬)의 트레일 중에는 전파가 닿기 어려운 지역도 있습니다. 이런 지역을 방문할 예정이라면 오프라인 지도를 미리 다운로드해 두는 것이 좋습니다."
      },
      {
        title: "섬별 통신 사정",
        body: "오아후 섬은 하와이에서 가장 통신 인프라가 잘 갖춰져 있습니다. 와이키키, 알라모아나, 카일루아 등 주요 지역에서는 5G 통신도 이용 가능하며, 호텔이나 레스토랑의 WiFi와 함께 쾌적한 인터넷 환경이 조성되어 있습니다. 노스쇼어의 할레이와 주변도 4G LTE가 커버됩니다.\n\n마우이 섬에서는 카아나팔리, 키헤이, 와일레아 등 리조트 지역에서 안정적인 4G 통신이 가능합니다. 유명한 하나 로드 드라이브 중에도 대부분의 구간에서 통신을 이용할 수 있지만, 일부 터널 주변이나 계곡 부분에서는 끊길 수 있습니다.\n\n빅아일랜드(하와이 섬)에서는 코나, 힐로, 와이콜로아 리조트 지역에서 양호한 통신이 가능합니다. 하와이 화산 국립공원의 방문자 센터 주변에서는 통신할 수 있지만, 체인 오브 크레이터즈 로드 끝부분에서는 전파가 약해집니다."
      },
      {
        title: "하와이 eSIM 요금 플랜",
        body: "하와이에서 사용할 수 있는 eSIM 플랜은 미국 전역에서 사용 가능한 US 플랜입니다. 일반적인 요금은 3GB/7일 약 15,000~25,000원, 5GB/15일 약 25,000~40,000원, 10GB/30일 약 40,000~60,000원 정도입니다. 무제한 데이터 플랜도 50,000~80,000원 정도에 이용 가능합니다.\n\n하와이 여행은 보통 5~7일 정도이므로 7일 플랜이 가장 가성비가 좋습니다. 와이키키에서의 쇼핑이나 레스토랑 검색, 구글맵 내비게이션, SNS 사진 포스팅 정도라면 3GB 플랜으로 충분합니다.\n\nAutoWiFi의 eSIM 플랜은 US 캐리어에 직접 연결되어 통신 속도와 안정성 모두 고품질입니다. 출발 전 온라인으로 구매할 수 있으며, QR 코드를 스캔하기만 하면 설정 완료됩니다."
      },
      {
        title: "eSIM 설정 방법 및 주의사항",
        body: "하와이용 eSIM 설정은 매우 간단합니다. 먼저 스마트폰이 eSIM을 지원하는지 확인하세요(iPhone XS 이후, Google Pixel 3 이후, Samsung Galaxy S20 이후 등). AutoWiFi에서 플랜을 구매하면 QR 코드가 이메일로 전송됩니다. 이 QR 코드를 스마트폰 설정 화면에서 스캔하면 eSIM 프로필이 설치됩니다.\n\n설정은 한국 출발 전에 하는 것을 권장합니다. WiFi 환경에서 QR 코드를 스캔하고 eSIM 프로필을 다운로드해 두세요. 하와이 도착 후에는 설정 화면에서 eSIM 회선을 켜기만 하면 통신이 시작됩니다.\n\n주의할 점으로, 하와이는 미국 시간대(HST, UTC-10)를 사용하므로 플랜의 유효기간은 현지 시간으로 계산됩니다. 시차 관계로 한국 출발일에 활성화하면 실질적인 이용 일수가 하루 줄어들 수 있으므로, 현지 도착 후에 활성화하는 것이 좋습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "하와이 eSIM은 미국 본토에서도 사용할 수 있나요?", a: "네, 하와이용 eSIM 플랜은 미국 전역에서 사용 가능한 US 플랜이므로 미국 본토에서도 그대로 사용할 수 있습니다. 로스앤젤레스나 샌프란시스코에서의 경유 시에도 추가 요금 없이 이용 가능합니다." },
      { q: "와이키키 비치에서도 통신이 되나요?", a: "네, 와이키키 비치 지역은 통신 환경이 매우 양호합니다. 비치에서도 SNS 포스팅, 메시지 송수신, 동영상 스트리밍이 원활하게 됩니다. 5G 커버 지역에 포함되어 있어 고속 통신을 기대할 수 있습니다." },
      { q: "하와이 여행에 필요한 데이터양은 얼마인가요?", a: "일반적인 관광 이용(지도 내비, SNS, 이메일, 웹 검색)으로 하루 약 300~500MB 정도입니다. 5~7일 여행이면 3GB 플랜으로 여유가 있습니다. 동영상 시청이나 화상 통화를 자주 하면 5GB 이상을 추천합니다." },
      { q: "라나이 섬, 몰로카이 섬 등 작은 섬에서도 사용 가능한가요?", a: "라나이 섬은 포시즌스 리조트 주변에서 통신 가능합니다. 몰로카이 섬은 카우나카카이 주변에서 4G LTE가 이용 가능하지만, 섬 동부는 전파가 약한 지역이 있습니다. US 캐리어 커버리지 내이지만 리조트 지역 외에서는 사전 확인을 권장합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM이면 하와이 전 섬에서 사용 가능한 고품질 US 네트워크 플랜을 몇 초 만에 설정 완료. 공항에서의 SIM 카드 구매나 WiFi 렌탈은 불필요합니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "하와이 eSIM",
  },
  zh: {
    title: "夏威夷eSIM指南 - 在威基基、毛伊岛和大岛畅享网络",
    subtitle: "使用美国运营商高品质网络，覆盖夏威夷全部岛屿",
    intro: "夏威夷是美国的一部分，因此可以使用T-Mobile、AT&T、Verizon等美国运营商的高品质网络。使用eSIM，您一降落檀香山机场就能开始使用高速数据通信。从在威基基海滩发社交媒体、在毛伊岛哈纳公路上导航，到在大岛火山国家公园查询信息，本指南将帮助您在夏威夷旅行中保持畅通连接。",
    sections: [
      {
        title: "夏威夷的eSIM通信环境",
        body: "夏威夷使用与美国本土相同的通信基础设施，主要运营商T-Mobile、AT&T、Verizon的4G LTE/5G网络覆盖所有岛屿。大多数eSIM套餐连接这些美国运营商，因此通信质量非常高且稳定。\n\n在瓦胡岛的檀香山和威基基地区，5G通信也可使用，视频流媒体和视频通话都能流畅进行。毛伊岛和大岛的度假区也有广泛的4G LTE覆盖，旅行中几乎不会遇到通信问题。\n\n不过，哈雷阿卡拉山顶、威皮奥谷深处、纳帕利海岸（可爱岛）的徒步途中等偏远自然区域可能信号不佳。如果计划前往这些区域，建议提前下载离线地图。"
      },
      {
        title: "各岛通信详情",
        body: "瓦胡岛拥有夏威夷最完善的通信基础设施。威基基、阿拉莫阿纳、凯卢阿等主要区域可使用5G通信，加上酒店和餐厅WiFi，网络环境非常舒适。北岸的哈雷伊瓦周边也有4G LTE覆盖。\n\n毛伊岛的卡阿纳帕利、基黑、怀雷亚等度假区提供稳定的4G通信。著名的哈纳公路自驾途中，大部分路段都有信号，但部分隧道周边和峡谷区域可能会中断。前往哈雷阿卡拉山顶途中，随着海拔升高信号会减弱。\n\n大岛（夏威夷岛）的科纳、希洛和威科洛亚度假区通信良好。夏威夷火山国家公园游客中心附近可以通信，但火山口链路尽头附近信号较弱。茂纳凯亚山顶附近也是信号难以覆盖的区域。"
      },
      {
        title: "夏威夷eSIM资费方案",
        body: "可在夏威夷使用的eSIM套餐为美国全境通用套餐。一般价格为3GB/7天约60-100元人民币，5GB/15天约100-180元，10GB/30天约180-280元。无限流量套餐约250-400元也可使用。\n\n夏威夷旅行通常为5-7天，所以7天套餐性价比最高。在威基基购物搜索餐厅、使用谷歌地图导航、在社交媒体发布照片等一般用途，3GB套餐就足够了。如果经常看视频或视频通话，建议选择5GB以上的套餐。\n\nAutoWiFi的eSIM套餐直接连接美国运营商，通信速度和稳定性都是高品质的。套餐可以在出发前在线购买，扫描QR码即可完成设置。到达夏威夷后立即可以开始使用。"
      },
      {
        title: "eSIM设置方法和注意事项",
        body: "夏威夷eSIM的设置非常简单。首先确认您的手机支持eSIM（iPhone XS及以后、Google Pixel 3及以后、Samsung Galaxy S20及以后等）。在AutoWiFi购买套餐后，QR码会通过邮件发送。在手机设置页面扫描此QR码即可安装eSIM配置文件。\n\n建议在出发前完成设置。在有WiFi的环境下扫描QR码并下载eSIM配置文件。到达夏威夷后，只需在设置页面开启eSIM线路即可开始通信。原来的SIM卡保留不变，回国后关闭eSIM切回原SIM即可。\n\n需要注意的是，夏威夷使用美国时区（HST，UTC-10），套餐有效期按当地时间计算。由于时差关系，如果在中国出发日激活，实际可用天数可能减少一天，因此建议到达当地后再激活。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "夏威夷eSIM在美国本土也能用吗？", a: "是的，夏威夷eSIM套餐是美国全境通用套餐，在美国本土也可以直接使用。如果在洛杉矶或旧金山转机，也可以无额外费用使用。" },
      { q: "在威基基海滩也能通信吗？", a: "是的，威基基海滩区域的通信环境非常好。在海滩上也能流畅地发社交媒体、收发消息、观看流媒体视频。该区域属于5G覆盖范围，可以期待高速通信。" },
      { q: "夏威夷旅行需要多少数据流量？", a: "一般观光用途（地图导航、社交媒体、邮件、网页浏览）每天约需300-500MB。5-7天的旅行用3GB套餐就足够了。如果经常看视频或视频通话，建议5GB以上。" },
      { q: "在拉奈岛、莫洛凯岛等小岛也能用吗？", a: "拉奈岛在四季酒店度假村周边可以通信。莫洛凯岛在考纳卡凯附近可使用4G LTE，但岛屿东部信号较弱。两个岛都在美国运营商覆盖范围内，但度假区以外的区域建议事先确认。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi eSIM提供覆盖夏威夷全部岛屿的高品质美国网络套餐，几秒即可设置完成。无需在机场购买SIM卡或租借WiFi。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "夏威夷eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/hawaii-esim", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return <ArticleLayout locale={loc} slug="hawaii-esim" content={CONTENT[loc]} />;
}
