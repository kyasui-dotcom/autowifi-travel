import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { getBaseUrl } from "@/lib/seo";
import "./globals.css";

const SUPPORTED_LOCALES = ["en", "ja", "ko", "zh"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

async function detectLocale(): Promise<SupportedLocale> {
  const h = await headers();
  const fromMiddleware = h.get("x-locale");
  if (
    fromMiddleware &&
    (SUPPORTED_LOCALES as readonly string[]).includes(fromMiddleware)
  ) {
    return fromMiddleware as SupportedLocale;
  }
  return "en";
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "AutoWiFi eSIM - Travel eSIM for 200+ Countries",
    template: "%s | AutoWiFi eSIM",
  },
  description:
    "Affordable travel eSIM for 200+ countries. Instant activation, no physical SIM needed.",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await detectLocale();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
