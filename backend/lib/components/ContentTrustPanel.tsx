import type { Locale } from "@/lib/i18n/config";

// Lightweight local stub for the editorial trust panel that is defined in the
// full content package outside this working tree. It renders a minimal updated
// / reviewed block so guide pages compile and display correctly during local
// development and type-checking. The real component has richer layout.

interface ContentTrustPanelProps {
  locale: Locale;
  updatedAt?: string;
}

const LABELS: Record<Locale, { updated: string; reviewed: string; disclaimer: string }> = {
  en: {
    updated: "Last updated",
    reviewed: "Reviewed by AutoWiFi Travel Editorial Team",
    disclaimer:
      "Pricing, coverage, and speed figures reflect publicly available information as of the last-updated date and may change; always verify with the provider before purchase.",
  },
  ja: {
    updated: "最終更新",
    reviewed: "監修: AutoWiFi Travel 編集部",
    disclaimer:
      "本記事の料金・カバレッジ・速度などの情報は最終更新日時点のものであり、変更される場合があります。購入前に必ず各サービス提供元の最新情報をご確認ください。",
  },
  ko: {
    updated: "최종 업데이트",
    reviewed: "감수: AutoWiFi Travel 편집부",
    disclaimer:
      "요금·커버리지·속도 정보는 최종 업데이트 시점 기준이며 변경될 수 있습니다. 구매 전에 반드시 해당 서비스 제공업체의 최신 정보를 확인하세요.",
  },
  zh: {
    updated: "最后更新",
    reviewed: "审核: AutoWiFi Travel 编辑部",
    disclaimer:
      "本文所述价格、覆盖范围与速度信息以最后更新日期为准，可能随时变更。购买前请务必向服务提供商确认最新信息。",
  },
};

export default function ContentTrustPanel({ locale, updatedAt }: ContentTrustPanelProps) {
  const labels = LABELS[locale] ?? LABELS.en;

  return (
    <aside
      style={{
        margin: "1.5rem 0",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
        background: "#f9fafb",
        fontSize: "0.875rem",
        color: "#4b5563",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem 1rem",
      }}
    >
      {updatedAt ? (
        <span>
          <strong>{labels.updated}:</strong> {updatedAt}
        </span>
      ) : null}
      <span>{labels.reviewed}</span>
      <span style={{ flexBasis: "100%", fontSize: "0.8125rem", color: "#6b7280" }}>
        {labels.disclaimer}
      </span>
    </aside>
  );
}
