import type { Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/seo";

// E-E-A-T author/editorial URL helpers. Returned paths are relative so they
// work in <Link href> and UI anchors; the `*Absolute` variants prepend the
// canonical base URL for JSON-LD (schema.org) where Google expects absolute URLs.
export function getAuthorProfileUrl(locale: Locale): string {
  return `/${locale}/authors/autowifi-editorial-team`;
}

export function getAuthorProfileUrlAbsolute(locale: Locale, baseUrl: string = getBaseUrl()): string {
  return `${baseUrl}${getAuthorProfileUrl(locale)}`;
}

export const EDITORIAL_TEAM_NAME = "AutoWiFi Travel Editorial Team";

export function getAboutPageUrl(locale: Locale): string {
  return `/${locale}/about`;
}

export function getEditorialPolicyUrl(locale: Locale): string {
  return `/${locale}/editorial-policy`;
}

export function getReviewMethodologyUrl(locale: Locale): string {
  return `/${locale}/how-we-review-esims`;
}
