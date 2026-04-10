"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function WebVitals() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      const sendToGA = ({ name, value, id }: { name: string; value: number; id: string }) => {
        window.gtag?.("event", name, {
          event_category: "Web Vitals",
          event_label: id,
          value: Math.round(name === "CLS" ? value * 1000 : value),
          non_interaction: true,
        });
      };
      onCLS(sendToGA);
      onINP(sendToGA);
      onLCP(sendToGA);
      onFCP(sendToGA);
      onTTFB(sendToGA);
    }).catch(() => {
      // web-vitals not available
    });
  }, []);

  return null;
}
