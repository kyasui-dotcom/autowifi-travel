import type { Locale } from "@/lib/i18n/config";

// Local stub for author profile URLs used across guide and article layouts.
// The real E-E-A-T profile pages live outside this working tree; we return a
// stable per-locale slug so JSON-LD and UI anchors still resolve during local
// development and type-checking without requiring the full content tree.
export function getAuthorProfileUrl(locale: Locale): string {
  return `/${locale}/about/editorial`;
}

export const EDITORIAL_TEAM_NAME = "AutoWiFi Travel Editorial Team";

export function getAboutPageUrl(locale: Locale): string {
  return `/${locale}/about`;
}

export function getEditorialPolicyUrl(locale: Locale): string {
  return `/${locale}/about/editorial`;
}

export function getReviewMethodologyUrl(locale: Locale): string {
  return `/${locale}/about/review-methodology`;
}
