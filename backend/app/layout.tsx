import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoWiFi Travel API",
  description: "Backend API for AutoWiFi Travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
