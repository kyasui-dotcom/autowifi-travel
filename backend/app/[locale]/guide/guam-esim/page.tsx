import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { articles: RelatedArticle[]; title: string }> = {
  ja: {
    title: "関連ガイド",
    articles: [
      { slug: "hawaii-esim", title: "ハワイeSIMガイド" },
      { slug: "esim-for-honeymoon", title: "ハネムーン向けeSIMガイド" },
      { slug: "esim-for-solo-travel", title: "一人旅向けeSIMガイド" },
    ],
  },
  en: {
    title: "Related Guides",
    articles: [
      { slug: "hawaii-esim", title: "Hawaii eSIM Guide 2026" },
      { slug: "esim-for-honeymoon", title: "Best eSIM for Honeymoon Travel 2026" },
      { slug: "esim-for-solo-travel", title: "Best eSIM for Solo Travel 2026" },
    ],
  },
  ko: {
    title: "관련 가이드",
    articles: [
      { slug: "hawaii-esim", title: "하와이 eSIM 가이드" },
      { slug: "esim-for-honeymoon", title: "허니문용 eSIM 가이드" },
      { slug: "esim-for-solo-travel", title: "혼자 여행용 eSIM 가이드" },
    ],
  },
  zh: {
    title: "相关指南",
    articles: [
      { slug: "hawaii-esim", title: "夏威夷eSIM指南" },
      { slug: "esim-for-honeymoon", title: "蜜月旅行eSIM指南" },
      { slug: "esim-for-solo-travel", title: "独自旅行eSIM指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "グアムeSIMガイド - 日本から3時間半のリゾートで快適通信",
    subtitle: "US territoryだからUSキャリアの高速ネットワークが使える",
    intro: "グアムは日本から約3時間半で行けるアメリカ準州（US territory）です。USキャリアのネットワークが整備されているため、eSIMを使えばタモン湾のリゾートエリアからグアム南部の歴史的スポットまで、快適なモバイル通信が楽しめます。短い飛行時間と時差わずか1時間という利便性から、週末旅行にも人気のグアムでの通信事情を詳しく解説します。本記事ではUS territoryだからUSキャリアの高速ネットワークが使える・グアムの通信環境・リゾートエリアでの通信などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "グアムの通信環境",
        body: "グアムはアメリカの準州として、T-MobileやIT&Eなどのキャリアが4G LTEネットワークを提供しています。島全体のサイズがコンパクト（南北約50km、東西約15km）なため、主要エリアのカバレッジは非常に良好です。タモン湾周辺のホテルゾーンでは高速4G LTE通信が安定して利用できます。\n\neSIMプランはUSキャリアに接続するため、通信品質はアメリカ本土と同等レベルです。ビーチでの写真投稿、ショッピングモールでの価格比較、レンタカーでのナビゲーションなど、旅行中に必要な通信は問題なく行えます。\n\nグアム南部のリティディアンポイントや、東部のタロフォフォの滝周辺など、観光客が少ないエリアでも基本的に4G LTE通信が可能です。ただし、島の内陸部のジャングルエリアや一部の山間部では電波が弱くなることがあります。"
      },
      {
        title: "リゾートエリアでの通信",
        body: "グアムの観光の中心地であるタモン地区は、通信インフラが最も充実しています。タモン湾沿いのホテル群（ヒルトン、ハイアット、ウェスティン、シェラトンなど）周辺では安定した4G LTE通信が利用でき、ビーチアクティビティ中もスマートフォンが問題なく使えます。\n\nDFS ギャラリアやマイクロネシアモール、グアム・プレミア・アウトレットなどのショッピングエリアも通信環境が良好です。レストラン検索やクーポン利用、免税品の価格チェックなどもスムーズに行えます。施設内ではフリーWiFiも利用できますが、eSIMがあれば移動中も途切れることなく通信できるのが大きなメリットです。\n\n恋人岬（Two Lovers Point）やデデドの朝市、チャモロビレッジのナイトマーケットなどの人気観光スポットでも、4G LTEがしっかりカバーされています。写真や動画をリアルタイムでSNSにアップロードしたい方にも安心の通信環境です。"
      },
      {
        title: "グアムeSIMの料金と選び方",
        body: "グアムで使えるeSIMプランは、アメリカ全土対応のUSプランが一般的です。料金の目安は、1GB/3日間で約800〜1,500円、3GB/7日間で約1,500〜2,500円、5GB/15日間で約2,500〜4,000円程度です。グアム旅行は2泊3日〜4泊5日が多いため、3日間または7日間プランが適しています。\n\nグアムでの一般的な通信使用量は、地図ナビゲーション、SNS投稿、メッセージのやり取り、ウェブ検索で1日あたり約200〜400MB程度です。3泊4日の旅行なら1〜2GBプランで十分ですが、動画撮影をSNSにアップロードする場合は3GB以上をおすすめします。\n\nAutoWiFiのeSIMなら、購入からアクティベーションまでオンラインで完結。成田や関西からのフライト中に設定を済ませておけば、グアム到着後すぐに通信を開始できます。USプランなのでグアムだけでなく、トランジットでハワイやアメリカ本土に立ち寄る際もそのまま使えて便利です。"
      },
      {
        title: "グアム旅行でのeSIM活用シーン",
        body: "グアムでのeSIM活用は多岐にわたります。レンタカーを借りて島内をドライブする際は、Googleマップでのリアルタイムナビゲーションが欠かせません。タモンからグアム南部のイナラハンやウマタックへのドライブ中も、eSIMがあれば道に迷う心配がありません。\n\nマリンアクティビティ（シュノーケリング、パラセーリング、ジェットスキーなど）の予約や変更も、eSIMがあれば現地で柔軟に対応できます。天候によるスケジュール変更時も、すぐにアクティビティ会社に連絡したり、代替プランを検索したりできます。\n\nまた、グアムは日本語が通じる場面も多いですが、現地のレストランやショップの口コミをチェックしたり、リアルタイムで翻訳アプリを使ったりする場面でもeSIMは重宝します。免税ショッピングの際に日本の価格と比較するのにも、安定したデータ通信は不可欠です。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "グアムは日本のスマートフォンでeSIMが使えますか？", a: "はい、eSIM対応のスマートフォン（iPhone XS以降、Google Pixel 3以降など）であればグアムでも問題なく使えます。グアムはアメリカの準州なので、USキャリアのネットワークに接続され、日本のSIMロック解除済み端末でご利用いただけます。" },
      { q: "グアムでの通信速度はどれくらいですか？", a: "タモン地区を中心に4G LTE通信が利用でき、下り速度は一般的に10〜50Mbps程度です。SNS投稿、動画視聴、ビデオ通話など、旅行中の通信には十分な速度です。" },
      { q: "短期旅行（2泊3日）に最適なプランは？", a: "2泊3日のグアム旅行なら、1〜2GB/3日間プランがおすすめです。地図ナビ、SNS、メッセージ利用程度なら1GBで十分。動画アップロードが多い場合は2GB以上を選びましょう。料金は約800〜1,500円程度です。" },
      { q: "グアムのeSIMプランはサイパンでも使えますか？", a: "グアム向けeSIMプランがサイパン（北マリアナ諸島）でも使えるかはプランの種類によります。USプランの場合、北マリアナ諸島もカバーされていることが多いですが、事前に対応エリアをご確認ください。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMなら、グアムのリゾートエリアで高品質な通信を数秒で設定。レンタルWiFiの受け取り・返却の手間なく、身軽にグアム旅行を楽しめます。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "グアムeSIM",
  },
  en: {
    title: "Guam eSIM Guide - Stay Connected at This Pacific Island Paradise",
    subtitle: "US territory with reliable American carrier networks",
    intro: "Guam is a US territory in the Western Pacific, just 3.5 hours from Japan and a popular resort destination. As part of the United States, Guam benefits from US carrier infrastructure, making eSIM connectivity reliable and fast. Whether you are relaxing on Tumon Bay, shopping at duty-free outlets, or exploring southern Guam's historical sites, this guide covers everything you need for seamless mobile connectivity on the island.",
    sections: [
      {
        title: "Connectivity in Guam",
        body: "As a US territory, Guam has telecommunications infrastructure provided by carriers like T-Mobile and IT&E, offering 4G LTE networks across the island. Since Guam is compact (approximately 50km long and 15km wide), coverage in major areas is excellent. The Tumon Bay hotel zone enjoys stable high-speed 4G LTE connectivity.\n\neSIM plans connect to US carriers, delivering connectivity quality comparable to the US mainland. Whether you need to post beach photos, compare prices while shopping, or navigate by car, all your travel communication needs are well covered.\n\nEven less-visited areas like Ritidian Point in northern Guam and Talofofo Falls in the east generally have 4G LTE coverage. However, interior jungle areas and some mountainous regions may have weaker signals."
      },
      {
        title: "Resort Area Coverage",
        body: "Tumon, the main tourist district, has the best communications infrastructure on Guam. The hotel strip along Tumon Bay (Hilton, Hyatt, Westin, Sheraton, and others) has reliable 4G LTE coverage, and you can use your smartphone without issues during beach activities.\n\nShopping areas like DFS Galleria, Micronesia Mall, and Guam Premier Outlets also have excellent connectivity. You can easily search for restaurants, use digital coupons, and check duty-free prices. While these venues offer free WiFi, having an eSIM means uninterrupted connectivity as you move between locations.\n\nPopular attractions including Two Lovers Point, the Dededo Flea Market, and Chamorro Village Night Market all have solid 4G LTE coverage. You can upload photos and videos to social media in real time from any of these spots."
      },
      {
        title: "Guam eSIM Plans and Pricing",
        body: "eSIM plans for Guam are typically US-wide plans. Expected pricing is around $5-10 for 1GB/3 days, $10-18 for 3GB/7 days, and $18-30 for 5GB/15 days. Since most Guam trips range from 3 to 5 days, the 3-day or 7-day plans are the best fit.\n\nTypical data usage in Guam for map navigation, social media, messaging, and web browsing is about 200-400MB per day. A 1-2GB plan is sufficient for a 3-night trip, but if you plan to upload lots of video content, choose 3GB or more.\n\nWith AutoWiFi eSIM, the entire process from purchase to activation is completed online. You can set up during your flight and start using data the moment you land in Guam. Since these are US plans, they also work if you transit through Hawaii or the US mainland."
      },
      {
        title: "How to Use eSIM During Your Guam Trip",
        body: "eSIM proves invaluable throughout your Guam experience. When renting a car to explore the island, real-time Google Maps navigation is essential. Whether driving from Tumon to southern Guam's villages of Inarajan or Umatac, your eSIM keeps you on track.\n\nFor marine activities like snorkeling, parasailing, and jet skiing, having mobile data lets you make bookings and changes on the go. When weather disrupts your schedule, you can quickly contact activity providers or search for alternative plans.\n\nWhile Guam has some Japanese-speaking staff at tourist venues, an eSIM is still helpful for checking local restaurant reviews, using translation apps, and comparing duty-free prices with home country prices. Stable data connectivity makes your shopping and dining decisions much easier."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Will my eSIM-capable phone work in Guam?", a: "Yes, any eSIM-compatible phone (iPhone XS or later, Google Pixel 3 or later, etc.) works in Guam. As a US territory, Guam uses US carrier networks, so your unlocked eSIM phone will connect seamlessly." },
      { q: "What speeds can I expect in Guam?", a: "In the Tumon district and main areas, 4G LTE provides typical download speeds of 10-50 Mbps. This is more than sufficient for social media, video streaming, video calls, and all standard travel communication needs." },
      { q: "What plan is best for a short 3-day trip?", a: "For a 2-3 night Guam trip, a 1-2GB/3-day plan is ideal. Basic usage like maps, social media, and messaging requires about 1GB. If you plan to upload lots of videos, choose 2GB or more. Pricing is around $5-10." },
      { q: "Does a Guam eSIM plan work in Saipan?", a: "Whether a Guam eSIM plan covers Saipan (Northern Mariana Islands) depends on the specific plan. US-wide plans often include the Northern Mariana Islands, but we recommend checking the coverage area before purchase." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi eSIM provides premium connectivity across Guam's resort areas. Set up in seconds with no WiFi rental pickup or return hassle.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Guam eSIM",
  },
  ko: {
    title: "괌 eSIM 가이드 - 일본에서 3시간 반, 리조트에서 쾌적한 통신",
    subtitle: "US territory이기 때문에 미국 캐리어의 고속 네트워크 이용 가능",
    intro: "괌은 서태평양에 위치한 미국 준주(US territory)로, 한국에서 약 4시간이면 도착하는 인기 리조트 여행지입니다. 미국의 일부로서 US 캐리어의 네트워크가 정비되어 있어 eSIM을 사용하면 투몬 베이의 리조트 지역부터 괌 남부의 역사적 명소까지 쾌적한 모바일 통신을 즐길 수 있습니다. 짧은 비행 시간과 적은 시차 덕분에 주말 여행으로도 인기인 괌에서의 통신 사정을 상세히 안내합니다.",
    sections: [
      {
        title: "괌의 통신 환경",
        body: "괌은 미국의 준주로서 T-Mobile, IT&E 등의 캐리어가 4G LTE 네트워크를 제공합니다. 섬 전체 크기가 컴팩트(남북 약 50km, 동서 약 15km)하여 주요 지역의 커버리지가 매우 양호합니다. 투몬 베이 주변의 호텔 존에서는 안정적인 고속 4G LTE 통신을 이용할 수 있습니다.\n\neSIM 플랜은 US 캐리어에 연결되므로 통신 품질은 미국 본토와 동등한 수준입니다. 해변에서의 사진 포스팅, 쇼핑몰에서의 가격 비교, 렌터카 내비게이션 등 여행 중 필요한 통신이 문제없이 가능합니다.\n\n괌 남부의 리티디안 포인트나 동부의 탈로포포 폭포 주변 등 관광객이 적은 지역에서도 기본적으로 4G LTE 통신이 가능합니다. 다만, 섬 내륙의 정글 지역이나 일부 산간 지역에서는 전파가 약해질 수 있습니다."
      },
      {
        title: "리조트 지역 통신 현황",
        body: "괌 관광의 중심지인 투몬 지구는 통신 인프라가 가장 잘 갖춰져 있습니다. 투몬 베이 연안의 호텔군(힐튼, 하얏트, 웨스틴, 쉐라톤 등) 주변에서는 안정적인 4G LTE 통신이 가능하며, 해변 액티비티 중에도 스마트폰을 문제없이 사용할 수 있습니다.\n\nDFS 갤러리아, 마이크로네시아 몰, 괌 프리미어 아울렛 등 쇼핑 지역도 통신 환경이 양호합니다. 레스토랑 검색이나 쿠폰 이용, 면세품 가격 체크도 원활하게 할 수 있습니다.\n\n연인의 곶(Two Lovers Point), 데데도 벼룩시장, 차모로 빌리지 나이트 마켓 등 인기 관광 명소에서도 4G LTE가 확실하게 커버되어 있어 사진이나 동영상을 실시간으로 SNS에 올릴 수 있습니다."
      },
      {
        title: "괌 eSIM 요금과 선택 방법",
        body: "괌에서 사용할 수 있는 eSIM 플랜은 미국 전역에서 사용 가능한 US 플랜이 일반적입니다. 요금은 1GB/3일 약 7,000~15,000원, 3GB/7일 약 15,000~25,000원, 5GB/15일 약 25,000~40,000원 정도입니다. 괌 여행은 2박 3일~4박 5일이 많으므로 3일 또는 7일 플랜이 적합합니다.\n\n괌에서의 일반적인 통신 사용량은 지도 내비, SNS 포스팅, 메시지, 웹 검색으로 하루 약 200~400MB 정도입니다. 3박 4일 여행이면 1~2GB 플랜으로 충분합니다.\n\nAutoWiFi eSIM이면 구매부터 활성화까지 온라인으로 완결됩니다. 비행 중에 설정을 마쳐 두면 괌 도착 후 바로 통신을 시작할 수 있습니다. US 플랜이므로 하와이나 미국 본토를 경유할 때도 그대로 사용 가능합니다."
      },
      {
        title: "괌 여행에서의 eSIM 활용",
        body: "괌에서의 eSIM 활용은 다양합니다. 렌터카를 빌려 섬을 드라이브할 때 구글맵 실시간 내비게이션은 필수입니다. 투몬에서 괌 남부의 이나라한이나 우마탁으로 드라이브할 때도 eSIM이 있으면 길을 잃을 걱정이 없습니다.\n\n스노클링, 패러세일링, 제트스키 등 해양 액티비티의 예약이나 변경도 eSIM이 있으면 현지에서 유연하게 대응할 수 있습니다. 날씨에 의한 일정 변경 시에도 바로 액티비티 업체에 연락하거나 대안을 검색할 수 있습니다.\n\n또한 면세 쇼핑 시 한국 가격과 비교하거나 현지 레스토랑 리뷰를 확인하는 데에도 안정적인 데이터 통신이 필수적입니다. eSIM이 있으면 이 모든 것이 이동 중에도 끊김 없이 가능합니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "괌에서 한국 스마트폰으로 eSIM을 사용할 수 있나요?", a: "네, eSIM 대응 스마트폰(iPhone XS 이후, Google Pixel 3 이후 등)이면 괌에서도 문제없이 사용할 수 있습니다. 괌은 미국 준주이므로 US 캐리어 네트워크에 연결되며, 잠금 해제된 단말기에서 이용 가능합니다." },
      { q: "괌에서의 통신 속도는 어느 정도인가요?", a: "투몬 지구를 중심으로 4G LTE 통신이 가능하며, 다운로드 속도는 일반적으로 10~50Mbps 정도입니다. SNS 포스팅, 동영상 시청, 화상 통화 등 여행 중 통신에 충분한 속도입니다." },
      { q: "단기 여행(2박 3일)에 최적의 플랜은?", a: "2박 3일 괌 여행이면 1~2GB/3일 플랜을 추천합니다. 지도, SNS, 메시지 정도라면 1GB로 충분합니다. 동영상 업로드가 많으면 2GB 이상을 선택하세요. 요금은 약 7,000~15,000원 정도입니다." },
      { q: "괌 eSIM 플랜은 사이판에서도 사용할 수 있나요?", a: "괌용 eSIM 플랜이 사이판(북마리아나 제도)에서도 사용 가능한지는 플랜에 따라 다릅니다. US 플랜의 경우 북마리아나 제도도 커버되는 경우가 많지만, 구매 전 대응 지역을 확인하시기 바랍니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM이면 괌 리조트 지역에서 고품질 통신을 몇 초 만에 설정 완료. 렌탈 WiFi 수령·반납 없이 가볍게 괌 여행을 즐기세요.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "괌 eSIM",
  },
  zh: {
    title: "关岛eSIM指南 - 在太平洋岛屿度假天堂畅享网络",
    subtitle: "美国属地，使用美国运营商的可靠高速网络",
    intro: "关岛是西太平洋上的美国属地(US territory)，从中国出发约5小时即可到达，是热门的度假胜地。作为美国的一部分，关岛拥有完善的美国运营商网络基础设施，使用eSIM即可从杜梦湾的度假区到关岛南部的历史景点，享受舒适的移动通信。本指南将详细介绍在关岛旅行中如何保持畅通连接。",
    sections: [
      {
        title: "关岛的通信环境",
        body: "关岛作为美国属地，由T-Mobile和IT&E等运营商提供4G LTE网络服务。由于岛屿面积紧凑（南北约50公里，东西约15公里），主要区域的覆盖非常好。杜梦湾周围的酒店区可以使用稳定的高速4G LTE通信。\n\neSIM套餐连接美国运营商，通信质量与美国本土相当。无论是在海滩发照片、在购物中心比价，还是使用租车导航，旅行中所需的通信都没有问题。\n\n关岛北部的瑞提迪安角和东部的塔洛福福瀑布周边等游客较少的区域，基本上也能使用4G LTE通信。不过，岛屿内陆的丛林区域和部分山区可能信号较弱。"
      },
      {
        title: "度假区通信状况",
        body: "关岛旅游中心杜梦地区的通信基础设施最为完善。杜梦湾沿岸的酒店群（希尔顿、凯悦、威斯汀、喜来登等）周边可以使用稳定的4G LTE通信，在海滩活动中也能正常使用手机。\n\nDFS免税店、密克罗尼西亚购物中心、关岛名牌折扣中心等购物区通信环境同样良好。搜索餐厅、使用优惠券、查看免税品价格都很流畅。虽然这些场所提供免费WiFi，但有了eSIM，在移动过程中也能保持不间断的连接。\n\n情人崖(Two Lovers Point)、德德多跳蚤市场、查莫洛村夜市等热门景点也有完善的4G LTE覆盖，可以实时将照片和视频上传到社交媒体。"
      },
      {
        title: "关岛eSIM资费与选择",
        body: "适用于关岛的eSIM套餐通常是美国全境通用的US套餐。价格大约为1GB/3天30-60元人民币，3GB/7天60-100元，5GB/15天100-180元。关岛旅行通常为2-5天，因此3天或7天套餐最为合适。\n\n在关岛的一般通信使用量，包括地图导航、社交媒体、消息和网页浏览，每天约200-400MB。3晚4天的旅行用1-2GB套餐就足够了，如果要上传大量视频则建议选择3GB以上。\n\nAutoWiFi eSIM从购买到激活全部在线完成。在飞行途中设置好，到达关岛后立即可以开始使用。由于是US套餐，经由夏威夷或美国本土转机时也可以直接使用，非常方便。"
      },
      {
        title: "关岛旅行中的eSIM活用",
        body: "eSIM在关岛的用途非常广泛。租车环岛自驾时，谷歌地图的实时导航不可或缺。从杜梦到关岛南部的伊纳拉汉或乌马塔克自驾时，有了eSIM就不用担心迷路。\n\n浮潜、帆伞运动、水上摩托等海上活动的预约和变更，有了eSIM可以在当地灵活处理。天气导致行程变更时，可以立即联系活动公司或搜索替代方案。\n\n此外，在免税购物时比较国内价格、查看当地餐厅评价等，稳定的数据通信都是必不可少的。有了eSIM，这一切在移动中也能无缝完成。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "中国的手机在关岛能用eSIM吗？", a: "是的，支持eSIM的手机（iPhone XS及以后、Google Pixel 3及以后等）在关岛可以正常使用。关岛是美国属地，连接美国运营商网络，解锁的手机即可使用。" },
      { q: "关岛的通信速度如何？", a: "以杜梦地区为中心可使用4G LTE通信，下载速度一般为10-50Mbps。对于社交媒体、视频观看、视频通话等旅行通信需求来说，这个速度完全足够。" },
      { q: "短途旅行（3天）最佳套餐是什么？", a: "3天的关岛旅行推荐1-2GB/3天套餐。地图、社交媒体、消息等基本使用1GB就够了。如果要上传大量视频，选择2GB以上。价格约30-60元人民币。" },
      { q: "关岛eSIM套餐在塞班岛也能用吗？", a: "关岛eSIM套餐是否在塞班岛（北马里亚纳群岛）可用取决于具体套餐。US套餐通常覆盖北马里亚纳群岛，但建议购买前确认覆盖区域。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi eSIM让您在关岛度假区享受高品质通信，几秒即可设置完成。无需租借WiFi的取还手续，轻松享受关岛之旅。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "关岛eSIM",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/guam-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  const rel = RELATED_ARTICLES[loc];
  return <ArticleLayout locale={loc} slug="guam-esim" content={CONTENT[loc]} relatedArticles={rel.articles} relatedTitle={rel.title} />;
}
