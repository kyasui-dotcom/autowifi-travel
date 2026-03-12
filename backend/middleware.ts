import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "ja", "ko", "zh"] as const;
const DEFAULT_LOCALE = "en";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const preferred = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";q=");
      return { code: code.trim().split("-")[0].toLowerCase(), q: qValue ? parseFloat(qValue) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of preferred) {
    if (SUPPORTED_LOCALES.includes(code as (typeof SUPPORTED_LOCALES)[number])) {
      return code;
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through API routes, Next.js internals, and static files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to the preferred locale
  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\.).*)"],
};
