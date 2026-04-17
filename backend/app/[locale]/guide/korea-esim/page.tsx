import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata, truncateAtSentence } from "@/lib/seo";

const RELATED_ARTICLES: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "韓国旅行前に比較したいページ",
    articles: [
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド" },
      { slug: "japan-esim", title: "日本のeSIMガイド" },
      { slug: "hong-kong-esim", title: "香港のeSIMガイド" },
    ],
  },
  en: {
    title: "Compare More Before You Land in Seoul",
    articles: [
      { slug: "esim-for-layovers", title: "Best eSIM for Layovers 2026" },
      { slug: "airport-connectivity-guide", title: "Airport WiFi and Connectivity Guide Worldwide" },
      { slug: "esim-for-business-travel", title: "eSIM for Business Travel: Airport Arrivals, Transit Days, and Hotel WiFi Backup" },
      { slug: "japan-esim", title: "Best eSIM for Japan Travel 2026" },
      { slug: "singapore-esim", title: "Best eSIM for Singapore Travel 2026" },
    ],
  },
  ko: {
    title: "한국 여행 전 함께 비교할 가이드",
    articles: [
      { slug: "airport-connectivity-guide", title: "공항 WiFi·연결 가이드" },
      { slug: "japan-esim", title: "일본 eSIM 가이드" },
      { slug: "hong-kong-esim", title: "홍콩 eSIM 가이드" },
    ],
  },
  zh: {
    title: "购买韩国eSIM前可继续比较",
    articles: [
      { slug: "airport-connectivity-guide", title: "机场 WiFi 与连接指南" },
      { slug: "japan-esim", title: "日本eSIM指南" },
      { slug: "hong-kong-esim", title: "香港eSIM指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "韓国eSIMガイド - 世界最速5Gと旅行者向けプラン",
    subtitle: "ソウル・釜山で超高速モバイル通信を体験しよう",
    intro: "韓国は世界で初めて5Gサービスを商用化した国であり、モバイル通信の速度と品質は世界トップクラスです。eSIMを利用すれば、到着後すぐに韓国の超高速ネットワークに接続でき、KakaoMapやNaver等の現地アプリもスムーズに利用できます。本記事ではソウル・釜山で超高速モバイル通信を体験しよう・韓国のモバイル通信事情・おすすめのeSIMプランなどを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "韓国のモバイル通信事情",
        body: "韓国の通信キャリアはSKテレコム、KT、LG U+の3社が中心です。いずれも全国的に広い5Gおよび4G LTEカバレッジを提供しており、特にソウル首都圏では5Gの人口カバー率が非常に高くなっています。都市部での通信速度は下り200Mbps以上が一般的で、世界最速クラスです。\n\n韓国の国土は比較的コンパクトなため、地方都市や観光地でも通信環境は非常に良好です。済州島やソウル近郊の山岳地帯でも安定した4G通信が利用可能です。地下鉄車内でも高速通信が利用でき、移動中のストリーミングも問題ありません。\n\n旅行者向けeSIMプランはSKテレコムまたはKTの回線を利用するものが多く、どちらも優れた通信品質を提供しています。"
      },
      {
        title: "おすすめのeSIMプラン",
        body: "韓国向けeSIMプランは、1日プランから30日間の長期プランまで用意されています。3〜5日の短期旅行なら3GBプラン、1週間以上の滞在なら5〜10GBまたは無制限プランがおすすめです。韓国はデータ消費が多い国なので、動画視聴やSNS利用が多い方は余裕のあるプランを選びましょう。\n\nAutoWiFi eSIMでは、韓国専用の高速データプランを提供しています。5G対応プランでは、対応端末であれば5Gの超高速通信を体験できます。テザリングも対応しているため、複数デバイスでの利用も可能です。\n\n韓国のeSIMプランは他のアジア諸国と比較しても手頃な価格帯で、コストパフォーマンスに優れています。"
      },
      {
        title: "eSIMの設定方法",
        body: "eSIMの設定は非常に簡単です。AutoWiFi eSIMで韓国プランを購入後、メールでQRコードが届きます。iPhoneは\"設定→モバイル通信\"→\"eSIMを追加、Androidは設定→ネットワークとインターネット\"→\"SIM\"→\"eSIMを追加\"からQRコードをスキャンして設定します。\n\n韓国への出発前にeSIMをインストールしておくことを強くおすすめします。仁川国際空港や金海国際空港に到着後、機内モードを解除するだけですぐに通信を開始できます。\n\neSIMのインストールにはWiFi接続が必要です。出発前に設定が間に合わない場合は、仁川空港の無料WiFiを利用して設定できます。仁川空港のWiFiは非常に高速で安定しています。"
      },
      {
        title: "主要都市でのカバレッジ",
        body: "ソウルは世界で最も通信環境が整った都市の一つです。江南、明洞、弘大、東大門など全てのエリアで5Gを含む超高速通信が利用可能です。ソウルの地下鉄は全路線で高速モバイル通信に対応しており、通勤時間帯でも安定した速度を維持しています。\n\n釜山も通信環境は非常に良好で、海雲台ビーチ、甘川文化村、南浦洞など主要観光スポットでストレスなくインターネットを利用できます。済州島でも主要観光ルート沿いは4G/5Gカバレッジが確保されています。\n\n仁川、大邱、光州、大田などの地方都市でも高品質な通信が利用可能です。韓国は国土が比較的小さいため、ほぼ全国どこでも安定した通信環境が整っています。"
      },
      {
        title: "韓国旅行でのeSIM活用のコツ",
        body: "韓国ではKakaoMapが最も正確な地図アプリです。Googleマップは韓国では詳細な徒歩・車ナビに対応していないため、KakaoMapまたはNaver Mapのダウンロードをおすすめします。eSIMがあれば、これらのアプリをリアルタイムで活用できます。\n\nKakaoTalk（カカオトーク）は韓国の国民的メッセンジャーアプリで、現地の人とのコミュニケーションに必須です。また、韓国のカフェやレストランではKakaoPayやNaver Payなどのモバイル決済が広く普及しており、通信環境があればこれらも活用できます。\n\n韓国の公共WiFiは充実していますが、セキュリティ面では不安があるものもあります。eSIMを利用すれば、安全かつ高速な通信を常時維持でき、個人情報の保護にもつながります。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "韓国のeSIMで5Gは使えますか？", a: "5G対応のeSIMプランを選択し、お使いのスマートフォンが5Gに対応していれば、ソウルをはじめとする主要都市で5G通信を利用できます。5G非対応の端末でも4G LTEで十分高速な通信が可能です。" },
      { q: "KakaoTalkはeSIMで使えますか？", a: "はい、データ通信が可能なeSIMプランであればKakaoTalkを問題なく利用できます。音声通話、ビデオ通話、メッセージの送受信すべてに対応しています。" },
      { q: "済州島でもeSIMは使えますか？", a: "はい、済州島でも4G LTEおよび主要エリアでの5G通信が利用可能です。観光ルート沿いや市街地では安定した通信が利用できます。" },
      { q: "韓国でのデータ使用量の目安は？", a: "韓国は高速通信のためデータ消費が多くなりがちです。1日あたり1〜2GBが一般的で、7日間の旅行なら5〜10GBまたは無制限プランをおすすめします。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFi eSIMで韓国旅行をもっと快適に。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "韓国eSIMガイド",
  },
  en: {
    title: "Best eSIM for South Korea 2026 - Seoul, AREX & Hotel Backup",
    subtitle: "Plan Incheon arrivals, airport rail, late-night Seoul transfers, and secure 5G from the first hour",
    intro: "Looking for the best eSIM for South Korea travel? A travel eSIM is usually the easiest way to get online the moment you land at Incheon, especially if you need AREX directions, late-night hotel transfers, taxi apps, or reliable backup before hotel WiFi is working. Korea's ultra-fast 5G networks make eSIM especially useful for Seoul arrivals, business trips, and short urban stays where every first-hour task depends on mobile data.",
    sections: [
      {
        title: "Korea's Mobile Network Overview",
        body: "South Korea's telecommunications market is served by three carriers: SK Telecom, KT, and LG U+. All three offer extensive 5G and 4G LTE coverage nationwide, with particularly high 5G population coverage in the Seoul metropolitan area. Urban download speeds regularly exceed 200 Mbps, placing Korea among the fastest mobile networks in the world.\n\nKorea's relatively compact geography means that even rural areas and tourist destinations enjoy excellent connectivity. Jeju Island and mountainous areas near Seoul maintain stable 4G service. The Seoul Metro supports high-speed data on all lines, enabling seamless streaming even during rush hours.\n\nTravel eSIM plans for Korea typically use SK Telecom or KT networks, both delivering outstanding performance."
      },
      {
        title: "Recommended eSIM Plans",
        body: "Korea eSIM plans range from single-day options to 30-day packages. For a short 3-5 day trip, a 3GB plan works well. For stays of a week or longer, consider 5-10GB or unlimited plans. Korea's fast network tends to encourage higher data consumption, so plan accordingly if you enjoy video streaming or heavy social media use.\n\nAutoWiFi eSIM offers dedicated high-speed data plans for Korea. With 5G-capable plans, you can experience ultra-fast speeds on compatible devices. Tethering is supported, allowing you to share your connection across multiple devices.\n\nKorea eSIM plans are competitively priced compared to other Asian destinations, offering excellent value for the speed and coverage provided."
      },
      {
        title: "How to Set Up Your eSIM",
        body: "Setting up is quick and easy. After purchasing a Korea plan from AutoWiFi eSIM, you receive a QR code by email. On iPhone, go to Settings > Cellular > Add eSIM and scan the code. On Android, navigate to Settings > Network & Internet > SIMs > Add eSIM.\n\nWe strongly recommend installing the eSIM before departure. Upon arrival at Incheon International Airport or Gimhae International Airport, simply turn off airplane mode to start your connection instantly.\n\neSIM installation requires a WiFi connection. If you cannot set it up before leaving, Incheon Airport offers fast and reliable free WiFi that you can use to complete the process."
      },
      {
        title: "Coverage in Major Cities",
        body: "Seoul is one of the best-connected cities on earth. Every district from Gangnam to Myeongdong, Hongdae, and Dongdaemun offers ultra-fast connectivity including 5G. Seoul's subway system supports high-speed data on all lines, maintaining stable speeds even during peak hours.\n\nBusan also has excellent coverage. Popular spots like Haeundae Beach, Gamcheon Culture Village, and Nampodong all provide reliable, fast internet. Jeju Island offers solid 4G and 5G coverage along major tourist routes and in urban areas.\n\nOther major cities including Incheon, Daegu, Gwangju, and Daejeon all deliver high-quality connectivity. Korea's compact size means you can expect consistent coverage virtually anywhere in the country."
      },
      {
        title: "Tips for Using eSIM in Korea",
        body: "KakaoMap is the most accurate navigation app in Korea. Google Maps lacks detailed walking and driving navigation for Korea, so downloading KakaoMap or Naver Map is highly recommended. With an eSIM, you can use these apps in real time for seamless navigation.\n\nKakaoTalk is Korea's dominant messaging platform and is essential for communicating with locals. Korean cafes and restaurants also widely accept mobile payments like KakaoPay and Naver Pay, which require a data connection to function.\n\nWhile Korea has extensive public WiFi, some networks may have security concerns. Using an eSIM provides a secure, fast, and always-on connection that also helps protect your personal information."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use 5G with a Korea eSIM?", a: "Yes, if you select a 5G-capable plan and your phone supports 5G, you can access 5G networks in Seoul and other major cities. Even without 5G, 4G LTE speeds in Korea are exceptionally fast." },
      { q: "Does KakaoTalk work with an eSIM?", a: "Absolutely. Any data-enabled eSIM plan supports KakaoTalk for messaging, voice calls, and video calls without any issues." },
      { q: "Does the eSIM work on Jeju Island?", a: "Yes, Jeju Island has 4G LTE coverage and 5G in key areas. Tourist routes and urban zones offer stable connectivity." },
      { q: "How much data will I use in Korea?", a: "Korea's fast network tends to increase data consumption. Plan for 1-2GB per day. For a 7-day trip, a 5-10GB or unlimited plan is recommended." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "Travel to Korea with AutoWiFi eSIM.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "Korea eSIM Guide",
  },
  ko: {
    title: "한국 eSIM 가이드 - 초고속 5G와 여행자 플랜",
    subtitle: "서울과 부산에서 세계 최고의 모바일 네트워크를 경험하세요",
    intro: "한국은 세계 최초로 5G 상용 서비스를 시작한 나라로, 모바일 통신 속도와 품질이 세계 최고 수준입니다. eSIM을 이용하면 도착 즉시 한국의 초고속 네트워크에 연결할 수 있으며, 카카오맵, 네이버 등 현지 앱도 원활하게 사용할 수 있습니다.",
    sections: [
      {
        title: "한국의 모바일 통신 환경",
        body: "한국의 이동통신 시장은 SK텔레콤, KT, LG U+ 3사가 서비스를 제공합니다. 세 통신사 모두 전국적으로 광범위한 5G 및 4G LTE 커버리지를 제공하며, 특히 수도권에서는 5G 인구 커버율이 매우 높습니다. 도시 지역의 다운로드 속도는 200Mbps 이상이 일반적으로 세계 최고 수준입니다.\n\n한국은 국토가 비교적 작아 지방 도시나 관광지에서도 통신 환경이 매우 양호합니다. 제주도와 서울 근교 산악 지역에서도 안정적인 4G 서비스를 이용할 수 있습니다. 서울 지하철은 전 노선에서 고속 데이터를 지원합니다.\n\n여행자용 eSIM 플랜은 주로 SK텔레콤 또는 KT 네트워크를 사용하며, 모두 우수한 성능을 제공합니다."
      },
      {
        title: "추천 eSIM 플랜",
        body: "한국 eSIM 플랜은 1일 플랜부터 30일 패키지까지 다양합니다. 3~5일 단기 여행이라면 3GB 플랜이 적당하고, 1주일 이상 체류한다면 5~10GB 또는 무제한 플랜을 추천합니다. 한국의 빠른 네트워크는 데이터 소비가 많아지는 경향이 있으므로 여유 있게 선택하세요.\n\nAutoWiFi eSIM에서는 한국 전용 고속 데이터 플랜을 제공합니다. 5G 대응 플랜의 경우 호환 단말기에서 초고속 통신을 체험할 수 있습니다. 테더링도 지원되어 여러 기기에서 데이터를 공유할 수 있습니다.\n\n한국 eSIM 플랜은 다른 아시아 국가와 비교해도 가격 대비 성능이 뛰어납니다."
      },
      {
        title: "eSIM 설정 방법",
        body: "설정은 빠르고 간단합니다. AutoWiFi eSIM에서 한국 플랜을 구매하면 이메일로 QR 코드가 전송됩니다. iPhone은 '설정' → '셀룰러' → 'eSIM 추가'에서 코드를 스캔합니다. Android는 '설정' → '네트워크 및 인터넷' → 'SIM' → 'eSIM 추가'에서 설정합니다.\n\n출발 전 eSIM을 미리 설치해 두는 것을 강력히 권장합니다. 인천국제공항이나 김해국제공항에 도착하면 비행기 모드만 해제하면 바로 연결됩니다.\n\neSIM 설치에는 WiFi 연결이 필요합니다. 사전 설정이 어려운 경우 인천공항의 빠르고 안정적인 무료 WiFi를 이용할 수 있습니다."
      },
      {
        title: "주요 도시 커버리지",
        body: "서울은 세계에서 가장 연결성이 좋은 도시 중 하나입니다. 강남, 명동, 홍대, 동대문 등 모든 지역에서 5G를 포함한 초고속 통신이 가능합니다. 서울 지하철은 전 노선에서 고속 데이터를 지원하며 출퇴근 시간대에도 안정적인 속도를 유지합니다.\n\n부산도 통신 환경이 매우 양호합니다. 해운대 비치, 감천문화마을, 남포동 등 인기 관광지에서 빠르고 안정적인 인터넷을 이용할 수 있습니다. 제주도도 주요 관광 루트와 시가지에서 4G/5G 커버리지를 제공합니다.\n\n인천, 대구, 광주, 대전 등 기타 주요 도시에서도 고품질 통신을 이용할 수 있습니다."
      },
      {
        title: "한국 여행에서의 eSIM 활용 팁",
        body: "한국에서는 카카오맵이 가장 정확한 내비게이션 앱입니다. Google Maps는 한국에서 상세한 도보/차량 내비게이션을 지원하지 않으므로 카카오맵이나 네이버 지도를 다운로드하는 것이 좋습니다. eSIM이 있으면 실시간으로 활용할 수 있습니다.\n\n카카오톡은 한국의 국민 메신저 앱으로 현지인과의 소통에 필수입니다. 한국의 카페와 레스토랑에서는 카카오페이, 네이버페이 등 모바일 결제도 널리 사용되며, 데이터 연결이 있으면 활용 가능합니다.\n\n한국의 공공 WiFi는 충실하지만 보안상 우려가 있는 네트워크도 있습니다. eSIM을 사용하면 안전하고 빠른 상시 연결을 유지할 수 있습니다."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "한국 eSIM으로 5G를 사용할 수 있나요?", a: "5G 대응 플랜을 선택하고 스마트폰이 5G를 지원하면 서울 등 주요 도시에서 5G를 이용할 수 있습니다. 5G 비대응 단말기라도 한국의 4G LTE는 매우 빠릅니다." },
      { q: "카카오톡을 eSIM으로 사용할 수 있나요?", a: "네, 데이터 통신이 가능한 eSIM 플랜이면 카카오톡의 메시지, 음성 통화, 영상 통화를 모두 이용할 수 있습니다." },
      { q: "제주도에서도 eSIM을 사용할 수 있나요?", a: "네, 제주도에서도 4G LTE 및 주요 지역의 5G 통신을 이용할 수 있습니다. 관광 루트와 시가지에서 안정적인 통신이 가능합니다." },
      { q: "한국에서 데이터 사용량은 어느 정도인가요?", a: "한국의 빠른 네트워크 때문에 데이터 소비가 많아지는 경향이 있습니다. 하루 1~2GB 정도로 예상하고, 7일 여행이라면 5~10GB 또는 무제한 플랜을 추천합니다." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi eSIM으로 한국 여행을 더 편리하게.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "한국 eSIM 가이드",
  },
  zh: {
    title: "韩国eSIM指南 - 超高速5G与旅行者套餐",
    subtitle: "在首尔和釜山体验全球最快的移动网络",
    intro: "韩国是全球首个推出商用5G服务的国家，移动网络速度和质量位居世界前列。使用eSIM，您可以在抵达后立即连接韩国的超高速网络，流畅使用KakaoMap、Naver等本地应用。",
    sections: [
      {
        title: "韩国移动通信概况",
        body: "韩国电信市场由SK电讯、KT和LG U+三大运营商服务。三家均在全国提供广泛的5G和4G LTE覆盖，首尔都市圈的5G人口覆盖率尤其高。城市地区下载速度通常超过200Mbps，位居全球最快行列。\n\n韩国国土面积相对较小，因此即使在农村地区和旅游景点，通信环境也非常好。济州岛和首尔近郊山区也能享受稳定的4G服务。首尔地铁全线支持高速数据传输，即使在高峰时段也能流畅上网。\n\n旅行者eSIM套餐通常使用SK电讯或KT的网络，两者都能提供出色的性能。"
      },
      {
        title: "推荐eSIM套餐",
        body: "韩国eSIM套餐从1天套餐到30天套餐应有尽有。3-5天短途旅行选择3GB套餐即可，一周以上建议选择5-10GB或无限流量套餐。韩国的高速网络容易导致流量消耗增加，建议预留充足流量。\n\nAutoWiFi eSIM提供韩国专属高速数据套餐。5G套餐在兼容设备上可体验超高速通信。支持热点共享，可以将网络分享给多台设备使用。\n\n韩国eSIM套餐价格与其他亚洲目的地相比极具竞争力，性价比出色。"
      },
      {
        title: "eSIM设置方法",
        body: "设置快捷简单。在AutoWiFi eSIM购买韩国套餐后，QR码会发送到您的邮箱。iPhone用户前往设置→蜂窝网络→添加eSIM扫描QR码。Android用户前往\"设置→网络和互联网\"→\"SIM卡→添加eSIM\"。\n\n强烈建议出发前预先安装eSIM。抵达仁川国际机场或金海国际机场后，只需关闭飞行模式即可立即连网。\n\neSIM安装需要WiFi连接。如果出发前无法完成设置，可以使用仁川机场快速稳定的免费WiFi进行安装。"
      },
      {
        title: "主要城市覆盖情况",
        body: "首尔是全球连接性最好的城市之一。从江南到明洞、弘大、东大门，所有地区都提供包括5G在内的超高速网络。首尔地铁全线支持高速数据，即使在高峰时段也能保持稳定速度。\n\n釜山的通信环境同样出色。海云台海滩、甘川文化村、南浦洞等热门景点均可享受快速稳定的网络。济州岛的主要旅游路线和市区也提供4G/5G覆盖。\n\n仁川、大邱、光州、大田等其他主要城市也提供高质量的网络连接。韩国国土紧凑，几乎全国都能享受稳定的通信环境。"
      },
      {
        title: "韩国旅行eSIM使用技巧",
        body: "在韩国，KakaoMap是最准确的导航应用。Google Maps在韩国不支持详细的步行和驾车导航，建议下载KakaoMap或Naver地图。有了eSIM就能实时使用这些应用进行导航。\n\nKakaoTalk是韩国的国民级通讯应用，与当地人交流必不可少。韩国的咖啡馆和餐厅广泛支持KakaoPay、Naver Pay等移动支付，有网络连接即可使用。\n\n虽然韩国公共WiFi覆盖广泛，但部分网络可能存在安全隐患。使用eSIM可以保持安全、快速的持续连接，同时保护个人信息安全。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "韩国eSIM能用5G吗？", a: "选择5G套餐且手机支持5G的情况下，可以在首尔等主要城市使用5G网络。即使手机不支持5G，韩国的4G LTE速度也非常快。" },
      { q: "eSIM能用KakaoTalk吗？", a: "当然可以。只要是支持数据通信的eSIM套餐，就能正常使用KakaoTalk的消息、语音通话和视频通话功能。" },
      { q: "济州岛能用eSIM吗？", a: "可以，济州岛提供4G LTE覆盖，主要区域也有5G信号。旅游路线和市区均可稳定上网。" },
      { q: "在韩国大概需要多少流量？", a: "韩国的高速网络容易增加流量消耗，每天约1-2GB。7天行程建议选择5-10GB或无限流量套餐。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "使用AutoWiFi eSIM畅游韩国。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "韩国eSIM指南",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/korea-esim", title: c.title, description: truncateAtSentence(c.intro) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="korea-esim"
      content={CONTENT[loc]}
      relatedArticles={RELATED_ARTICLES[loc].articles}
      relatedTitle={RELATED_ARTICLES[loc].title}
    />
  );
}
