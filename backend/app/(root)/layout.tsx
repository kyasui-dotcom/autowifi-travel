import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { OrganizationJsonLd } from "@/lib/components/JsonLd";
import WebVitals from "@/lib/components/WebVitals";
import { getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0ea5e9",
};

const GA_MEASUREMENT_ID = "G-9QDD3E917Y";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export default function RootLandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GSC_VERIFICATION && (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        )}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <OrganizationJsonLd />
        <WebVitals />
        {children}

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init-root" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
