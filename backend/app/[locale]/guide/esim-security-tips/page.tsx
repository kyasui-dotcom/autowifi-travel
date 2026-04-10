import type { Metadata } from "next";
import ArticleLayout, { type Locale, type ArticleContent, type RelatedArticle } from "@/lib/components/ArticleLayout";
import { generatePageMetadata } from "@/lib/seo";

const RELATED: Record<Locale, { title: string; articles: RelatedArticle[] }> = {
  ja: {
    title: "安全に使う前に見たい関連ガイド",
    articles: [
      { slug: "first-time-esim", title: "eSIM初心者ガイド" },
      { slug: "esim-troubleshooting", title: "eSIMトラブルシューティング" },
      { slug: "esim-activation-timing", title: "eSIM有効化タイミング" },
      { slug: "esim-for-students", title: "留学生のためのeSIM" },
      { slug: "airport-connectivity-guide", title: "空港WiFi・通信ガイド" },
    ],
  },
  en: {
    title: "Compare More Before You Travel Securely",
    articles: [
      { slug: "first-time-esim", title: "First-Time eSIM Guide" },
      { slug: "esim-troubleshooting", title: "eSIM Troubleshooting" },
      { slug: "esim-activation-timing", title: "When to Activate Your eSIM" },
      { slug: "esim-for-students", title: "eSIM for Students" },
      { slug: "airport-connectivity-guide", title: "Airport Connectivity Guide" },
    ],
  },
  ko: {
    title: "안전하게 쓰기 전에 더 비교할 가이드",
    articles: [
      { slug: "first-time-esim", title: "eSIM 초보자 가이드" },
      { slug: "esim-troubleshooting", title: "eSIM 문제 해결" },
      { slug: "esim-activation-timing", title: "eSIM 활성화 타이밍" },
      { slug: "esim-for-students", title: "유학생을 위한 eSIM" },
      { slug: "airport-connectivity-guide", title: "공항 WiFi 가이드" },
    ],
  },
  zh: {
    title: "安全使用前值得继续比较的指南",
    articles: [
      { slug: "first-time-esim", title: "eSIM新手指南" },
      { slug: "esim-troubleshooting", title: "eSIM故障排除" },
      { slug: "esim-activation-timing", title: "eSIM激活时机" },
      { slug: "esim-for-students", title: "留学生eSIM指南" },
      { slug: "airport-connectivity-guide", title: "机场通信指南" },
    ],
  },
};

const CONTENT: Record<Locale, ArticleContent> = {
  ja: {
    title: "eSIMのセキュリティとプライバシー対策 - 安全に使うためのヒント",
    subtitle: "海外でeSIMを安全に使うためのセキュリティ設定と注意点を解説",
    intro: "eSIMはデジタルSIMとして物理カードより安全性が高いとされていますが、海外旅行では公共WiFiの利用やフィッシング攻撃など、さまざまなセキュリティリスクが存在します。本ガイドでは、eSIM利用時のセキュリティ対策とプライバシー保護の方法を解説します。本記事では海外でeSIMを安全に使うためのセキュリティ設定と注意点を解説・eSIMのセキュリティ上のメリット・海外での公共WiFi利用時の注意点などを2026年時点の情報に基づき、旅行者目線で具体的に解説しています。",
    sections: [
      {
        title: "eSIMのセキュリティ上のメリット",
        body: "eSIMは物理SIMカードと比べて、いくつかのセキュリティ上のメリットがあります。まず、物理的な盗難リスクがありません。SIMカードは端末から抜き取られて別のデバイスで使用される可能性がありますが、eSIMはスマートフォンに内蔵されているため、端末自体を盗まない限りSIM情報にアクセスできません。\n\nまた、eSIMプロファイルはリモートで管理できるため、万が一スマートフォンを紛失した場合でも、プロバイダーに連絡してeSIMを無効化することが可能です。これにより、不正利用のリスクを迅速に排除できます。\n\neSIMの暗号化プロトコルも物理SIMと同等かそれ以上のセキュリティレベルを提供しています。通信データは暗号化されて送受信されるため、基本的な通信の安全性は確保されています。"
      },
      {
        title: "海外での公共WiFi利用時の注意点",
        body: "海外旅行中、ホテルやカフェの無料WiFiを利用する機会は多いですが、公共WiFiにはセキュリティリスクが伴います。中間者攻撃（Man-in-the-Middle Attack）により通信内容が傍受される可能性があり、特に暗号化されていないウェブサイトでの情報入力は危険です。\n\neSIMのモバイルデータ通信は、公共WiFiよりも安全性が高いです。携帯電話のネットワークは暗号化されており、WiFiのような傍受リスクが低いためです。銀行アプリやオンラインショッピングなど、個人情報を扱う操作はeSIMのモバイルデータ接続で行うことをおすすめします。\n\n公共WiFiを使用する場合は、VPN（Virtual Private Network）の利用が必須です。VPNは通信を暗号化し、第三者による傍受を防ぎます。NordVPNやExpressVPNなどの有料サービスが信頼性で優れています。無料VPNはデータを第三者に売却するリスクがあるため避けましょう。"
      },
      {
        title: "SIMスワップ攻撃とeSIMの防御策",
        body: "SIMスワップ攻撃とは、攻撃者が通信キャリアに成りすまして被害者のSIM情報を別のSIMに移行させる手法です。これにより、SMSベースの二段階認証を突破され、銀行口座やSNSアカウントが乗っ取られるリスクがあります。\n\neSIMは物理SIMと比べてSIMスワップ攻撃に対する耐性が高いとされています。eSIMプロファイルの変更にはデバイス上での認証が必要なため、リモートでの不正な切り替えが困難です。ただし、完全に安全というわけではありません。\n\n追加の防御策として、二段階認証にはSMSではなく、Google AuthenticatorやAuthyなどの認証アプリを使用することをおすすめします。また、通信キャリアのアカウントに強力なPINコードを設定し、eSIMプロファイルの変更に追加認証を要求するよう設定しましょう。"
      },
      {
        title: "海外旅行中のプライバシー保護",
        body: "海外旅行中は、自国にいるとき以上にプライバシーに注意する必要があります。まず、スマートフォンのロック画面に表示される通知の内容を制限しましょう。メッセージのプレビュー表示をオフにすることで、画面を見られてもプライベートな内容が漏れません。\n\n位置情報の共有設定も確認しましょう。旅行中に全てのアプリに位置情報を許可する必要はありません。地図やライドシェアなど必要なアプリのみに位置情報を許可し、それ以外はオフにしておきましょう。\n\nAutoWiFiのeSIMはユーザーのプライバシーを重視した設計になっています。通信データのログを保持せず、個人情報の第三者提供も行いません。安心して海外でのデータ通信をお楽しみいただけます。旅行先での不要なアプリのインストールも避け、信頼できるアプリストアからのみダウンロードするようにしましょう。"
      }
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: "eSIMは物理SIMより安全ですか？", a: "一般的にeSIMは物理的な盗難リスクがなく、リモート管理が可能なため、物理SIMより安全とされています。ただし、ソフトウェアの脆弱性やフィッシング攻撃には同様の注意が必要です。" },
      { q: "海外で公共WiFiを使っても大丈夫ですか？", a: "基本的な閲覧は問題ありませんが、個人情報の入力や銀行取引はeSIMのモバイルデータで行うことをおすすめします。公共WiFiを使う場合はVPNを併用してください。" },
      { q: "VPNは必ず必要ですか？", a: "必須ではありませんが、強く推奨します。特に公共WiFi利用時やプライバシーが気になる国では、VPNで通信を暗号化することでセキュリティが大幅に向上します。" },
      { q: "スマートフォンを紛失した場合、eSIMはどうなりますか？", a: "スマートフォンの遠隔ロック機能でデバイスをロックし、eSIMプロバイダーに連絡してeSIMを無効化してもらいましょう。Apple IDやGoogleアカウントのデバイスを探す機能も活用してください。" }
    ],
    ctaTitle: "今すぐeSIMを購入",
    ctaDesc: "AutoWiFiのeSIMは、プライバシーを重視した安全な通信を提供。通信ログを保持せず、安心して海外旅行を楽しめます。",
    ctaButton: "eSIMプランを見る",
    breadcrumbHome: "ホーム",
    breadcrumbGuide: "ガイド",
    breadcrumbCurrent: "eSIMセキュリティ"
  },
  en: {
    title: "eSIM Security and Privacy Tips - Stay Safe While Traveling",
    subtitle: "Protect your data and privacy when using eSIM abroad",
    intro: "While eSIM technology offers inherent security advantages over physical SIM cards, international travel brings risks like public WiFi exposure and phishing attacks. This guide covers essential security practices and privacy protection measures for eSIM users traveling abroad.",
    sections: [
      {
        title: "Security Advantages of eSIM",
        body: "eSIM offers several security benefits compared to physical SIM cards. First, there is no risk of physical SIM theft. A physical SIM can be removed from a device and used in another, but eSIM is embedded in the phone and cannot be extracted without stealing the entire device.\n\neSIM profiles can be managed remotely. If your phone is lost or stolen, you can contact your provider to deactivate the eSIM, quickly eliminating the risk of unauthorized use.\n\neSIM encryption protocols provide security equal to or better than physical SIM. Communication data is encrypted during transmission, ensuring baseline communication security for all your travel activities."
      },
      {
        title: "Public WiFi Risks and eSIM Safety",
        body: "Free WiFi at hotels and cafes is convenient but carries security risks. Man-in-the-Middle attacks can intercept your communications, and entering personal information on unencrypted websites is particularly dangerous on public networks.\n\neSIM mobile data is significantly safer than public WiFi. Cellular networks are encrypted and have much lower interception risk. For banking, online shopping, and any activity involving personal information, always use your eSIM's mobile data connection rather than public WiFi.\n\nWhen you do use public WiFi, a VPN is essential. VPNs encrypt your entire connection, preventing third-party interception. Reputable paid services like NordVPN and ExpressVPN are recommended. Avoid free VPNs, which may sell your browsing data to third parties."
      },
      {
        title: "SIM Swap Protection with eSIM",
        body: "SIM swap attacks involve criminals convincing a carrier to transfer a victim's SIM information to a different SIM. This lets them intercept SMS-based two-factor authentication and potentially take over bank accounts and social media profiles.\n\neSIM is more resistant to SIM swap attacks than physical SIM because profile changes require on-device authentication, making remote unauthorized transfers more difficult. However, no technology is completely immune.\n\nFor additional protection, use authenticator apps like Google Authenticator or Authy instead of SMS for two-factor authentication. Set a strong PIN on your carrier account and require additional verification for any eSIM profile changes."
      },
      {
        title: "Privacy Protection While Traveling",
        body: "Travel abroad demands extra privacy awareness. Start by limiting the information displayed on your phone's lock screen. Disable message previews in notifications so that someone glancing at your screen cannot read private messages.\n\nReview location sharing settings. Not every app needs location access while traveling. Grant location permission only to essential apps like maps and ride-hailing, and disable it for everything else.\n\nAutoWiFi's eSIM is designed with user privacy in mind. We do not retain communication logs or share personal information with third parties. You can enjoy secure data connectivity abroad with confidence. Additionally, avoid installing unnecessary apps at your destination and only download from trusted app stores."
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Is eSIM safer than physical SIM?", a: "Generally yes. eSIM eliminates physical theft risk and supports remote deactivation. However, software vulnerabilities and phishing attacks require the same vigilance as with physical SIM." },
      { q: "Is it safe to use public WiFi abroad?", a: "Basic browsing is acceptable, but use eSIM mobile data for anything involving personal information or financial transactions. Always use a VPN when connecting to public WiFi." },
      { q: "Do I need a VPN with eSIM?", a: "It is not mandatory but strongly recommended, especially on public WiFi or in countries with privacy concerns. A VPN encrypts your traffic and significantly improves your security posture." },
      { q: "What happens to my eSIM if I lose my phone?", a: "Use your phone's remote lock feature to secure the device, then contact your eSIM provider to deactivate the profile. Apple's Find My or Google's Find My Device can help locate or remotely wipe your phone." }
    ],
    ctaTitle: "Get Your eSIM Now",
    ctaDesc: "AutoWiFi's eSIM delivers secure, privacy-focused connectivity. No communication logs retained. Travel with confidence.",
    ctaButton: "View eSIM Plans",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guides",
    breadcrumbCurrent: "eSIM Security Tips"
  },
  ko: {
    title: "eSIM 보안과 프라이버시 팁 - 안전하게 사용하는 방법",
    subtitle: "해외에서 eSIM을 안전하게 사용하기 위한 보안 설정과 주의사항",
    intro: "eSIM은 디지털 SIM으로서 물리적 SIM보다 보안성이 높다고 알려져 있지만, 해외 여행에서는 공공 WiFi 이용이나 피싱 공격 등 다양한 보안 위험이 존재합니다. 이 가이드에서는 eSIM 사용 시의 보안 대책과 프라이버시 보호 방법을 알아봅니다.",
    sections: [
      {
        title: "eSIM의 보안상 장점",
        body: "eSIM은 물리적 SIM 카드에 비해 몇 가지 보안상의 장점이 있습니다. 먼저 물리적 도난 위험이 없습니다. SIM 카드는 단말에서 빼내어 다른 기기에서 사용될 수 있지만, eSIM은 스마트폰에 내장되어 있어 단말 자체를 도난당하지 않는 한 SIM 정보에 접근할 수 없습니다.\n\neSIM 프로필은 원격으로 관리할 수 있어, 스마트폰을 분실한 경우에도 프로바이더에 연락하여 eSIM을 비활성화할 수 있습니다.\n\neSIM의 암호화 프로토콜도 물리적 SIM과 동등하거나 그 이상의 보안 수준을 제공합니다. 통신 데이터는 암호화되어 송수신되므로 기본적인 통신 안전성이 확보됩니다."
      },
      {
        title: "공공 WiFi 이용 시 주의사항",
        body: "해외 여행 중 호텔이나 카페의 무료 WiFi를 이용할 기회가 많지만, 공공 WiFi에는 보안 위험이 따릅니다. 중간자 공격(Man-in-the-Middle Attack)으로 통신 내용이 도청될 수 있으며, 특히 암호화되지 않은 웹사이트에서의 정보 입력은 위험합니다.\n\neSIM의 모바일 데이터 통신은 공공 WiFi보다 안전성이 높습니다. 이동통신 네트워크는 암호화되어 있어 WiFi와 같은 도청 위험이 낮기 때문입니다. 은행 앱이나 온라인 쇼핑 등 개인 정보를 다루는 작업은 eSIM 모바일 데이터로 하세요.\n\n공공 WiFi를 사용할 경우 VPN 사용이 필수입니다. VPN은 통신을 암호화하여 제3자의 도청을 방지합니다. NordVPN이나 ExpressVPN 등의 유료 서비스가 신뢰성에서 우수합니다."
      },
      {
        title: "SIM 스왑 공격과 eSIM의 방어",
        body: "SIM 스왑 공격이란 공격자가 통신사에 사칭하여 피해자의 SIM 정보를 다른 SIM으로 이전시키는 수법입니다. 이를 통해 SMS 기반 2단계 인증을 돌파하고, 은행 계좌나 SNS 계정이 탈취될 위험이 있습니다.\n\neSIM은 물리적 SIM에 비해 SIM 스왑 공격에 대한 내성이 높습니다. eSIM 프로필 변경에는 기기상의 인증이 필요하여 원격에서의 무단 전환이 어렵습니다.\n\n추가 방어책으로 2단계 인증에는 SMS 대신 Google Authenticator나 Authy 등의 인증 앱을 사용하세요. 통신사 계정에 강력한 PIN 코드를 설정하고, eSIM 프로필 변경에 추가 인증을 요구하도록 설정하세요."
      },
      {
        title: "해외 여행 중 프라이버시 보호",
        body: "해외 여행 중에는 평소보다 프라이버시에 주의해야 합니다. 먼저 스마트폰 잠금 화면에 표시되는 알림 내용을 제한하세요. 메시지 미리보기를 끄면 화면을 보더라도 개인적인 내용이 노출되지 않습니다.\n\n위치 정보 공유 설정도 확인하세요. 여행 중 모든 앱에 위치 정보를 허용할 필요는 없습니다. 지도나 차량 호출 등 필요한 앱에만 위치 정보를 허용하세요.\n\nAutoWiFi의 eSIM은 사용자의 프라이버시를 중시한 설계로, 통신 데이터 로그를 보관하지 않으며 개인 정보의 제3자 제공도 하지 않습니다. 여행지에서 불필요한 앱 설치를 피하고, 신뢰할 수 있는 앱 스토어에서만 다운로드하세요."
      }
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "eSIM이 물리적 SIM보다 안전한가요?", a: "일반적으로 eSIM은 물리적 도난 위험이 없고 원격 관리가 가능하여 물리적 SIM보다 안전합니다. 다만 소프트웨어 취약점이나 피싱 공격에는 동일한 주의가 필요합니다." },
      { q: "해외에서 공공 WiFi를 사용해도 괜찮나요?", a: "기본적인 브라우징은 괜찮지만, 개인 정보 입력이나 금융 거래는 eSIM 모바일 데이터로 하세요. 공공 WiFi 사용 시에는 VPN을 병용하세요." },
      { q: "VPN은 반드시 필요한가요?", a: "필수는 아니지만 강력히 권장합니다. 특히 공공 WiFi 이용 시나 프라이버시가 우려되는 국가에서는 VPN으로 통신을 암호화하면 보안이 크게 향상됩니다." },
      { q: "스마트폰을 분실하면 eSIM은 어떻게 되나요?", a: "스마트폰의 '원격 잠금' 기능으로 기기를 잠그고, eSIM 프로바이더에 연락하여 eSIM을 비활성화하세요. Apple의 'iPhone 찾기'나 Google의 '기기 찾기' 기능도 활용하세요." }
    ],
    ctaTitle: "지금 eSIM 구매하기",
    ctaDesc: "AutoWiFi의 eSIM은 프라이버시를 중시한 안전한 통신을 제공. 통신 로그를 보관하지 않아 안심하고 여행을 즐길 수 있습니다.",
    ctaButton: "eSIM 플랜 보기",
    breadcrumbHome: "홈",
    breadcrumbGuide: "가이드",
    breadcrumbCurrent: "eSIM 보안 팁"
  },
  zh: {
    title: "eSIM安全与隐私保护指南 - 旅行中安全使用的技巧",
    subtitle: "海外使用eSIM时的安全设置和注意事项",
    intro: "eSIM作为数字SIM，在安全性方面优于物理SIM卡，但海外旅行中公共WiFi使用和钓鱼攻击等安全风险依然存在。本指南介绍eSIM使用中的安全措施和隐私保护方法。",
    sections: [
      {
        title: "eSIM的安全优势",
        body: "与物理SIM卡相比，eSIM有几个安全优势。首先没有物理被盗风险。物理SIM卡可以从设备中取出在其他设备上使用，但eSIM内嵌在手机中，不偷走整台设备就无法获取SIM信息。\n\neSIM配置文件可以远程管理。万一手机丢失，可以联系服务商停用eSIM，迅速消除被盗用的风险。\n\neSIM的加密协议提供与物理SIM同等甚至更高的安全级别。通信数据在传输过程中经过加密，基本通信安全得到保障。"
      },
      {
        title: "使用公共WiFi的安全注意事项",
        body: "海外旅行中经常会使用酒店和咖啡馆的免费WiFi，但公共WiFi存在安全风险。中间人攻击可能截获通信内容，在未加密网站上输入信息尤其危险。\n\neSIM移动数据比公共WiFi安全得多。蜂窝网络经过加密，被截获的风险比WiFi低得多。银行应用、网购等涉及个人信息的操作，请使用eSIM移动数据连接。\n\n使用公共WiFi时必须使用VPN。VPN加密所有通信，防止第三方截获。NordVPN和ExpressVPN等付费服务在可靠性方面表现优秀。避免使用免费VPN，它们可能将你的浏览数据出售给第三方。"
      },
      {
        title: "SIM交换攻击与eSIM的防御",
        body: "SIM交换攻击是指攻击者冒充运营商将受害者的SIM信息转移到另一张SIM上。这可能导致SMS双因素验证被突破，银行账户和社交媒体账号被盗。\n\neSIM比物理SIM更能抵御SIM交换攻击，因为更改eSIM配置文件需要在设备上进行认证，远程未授权切换更加困难。但没有任何技术是绝对安全的。\n\n额外的防御措施：双因素验证使用Google Authenticator或Authy等认证应用代替SMS。为运营商账户设置强PIN码，要求eSIM配置文件变更时进行额外验证。"
      },
      {
        title: "旅行中的隐私保护",
        body: "海外旅行中需要比在国内更加注意隐私。首先限制手机锁屏上显示的通知内容。关闭消息预览，即使别人看到你的屏幕也不会泄露私人内容。\n\n检查位置信息共享设置。旅行中不是每个应用都需要位置权限。只给地图和打车等必需应用开放位置权限，其他全部关闭。\n\nAutoWiFi的eSIM注重用户隐私，不保留通信数据日志，不向第三方提供个人信息。让您安心享受海外数据通信。在旅行地避免安装不必要的应用，只从可信应用商店下载。"
      }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "eSIM比物理SIM更安全吗？", a: "一般来说是的。eSIM没有物理被盗风险，支持远程停用。但软件漏洞和钓鱼攻击同样需要警惕。" },
      { q: "在国外用公共WiFi安全吗？", a: "基本浏览没问题，但涉及个人信息和金融交易请用eSIM移动数据。使用公共WiFi时请配合VPN使用。" },
      { q: "一定需要VPN吗？", a: "不是必须的但强烈推荐。特别是在使用公共WiFi或隐私敏感的国家，VPN加密通信能大幅提升安全性。" },
      { q: "手机丢了eSIM怎么办？", a: "用手机的'远程锁定'功能锁定设备，联系eSIM服务商停用eSIM。同时利用Apple的'查找我的'或Google的'查找设备'功能。" }
    ],
    ctaTitle: "立即购买eSIM",
    ctaDesc: "AutoWiFi的eSIM提供注重隐私的安全通信。不保留通信日志，让您安心享受海外旅行。",
    ctaButton: "查看eSIM套餐",
    breadcrumbHome: "首页",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "eSIM安全提示"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) || "en"];
  return generatePageMetadata({ locale: locale as Locale, path: "/guide/esim-security-tips", title: c.title, description: c.intro.slice(0, 160) });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale as Locale) || "en";
  return (
    <ArticleLayout
      locale={loc}
      slug="esim-security-tips"
      content={CONTENT[loc]}
      relatedArticles={RELATED[loc].articles}
      relatedTitle={RELATED[loc].title}
    />
  );
}
