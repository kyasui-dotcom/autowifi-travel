"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import type { GuideXEmbed } from "@/lib/guides/priorityGuideContent";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        createTweet: (
          tweetId: string,
          target: Element,
          options?: Record<string, string | boolean>,
        ) => Promise<Element>;
      };
    };
  }
}

function getTweetId(url: string) {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
}

export default function XEmbeddedPosts({ embeds }: { embeds: GuideXEmbed[] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.twttr?.widgets) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    const widgets = window.twttr?.widgets;
    if (!ready || !widgets) return;

    const controllers = embeds.map((embed, index) => {
      const tweetId = getTweetId(embed.url);
      const container = document.getElementById(`x-embed-${index}`);
      if (!tweetId || !container) return null;

      container.replaceChildren();

      void widgets
        .createTweet(tweetId, container, {
          align: "center",
          dnt: true,
        })
        .catch(() => {
          const fallback = document.createElement("a");
          fallback.href = embed.url;
          fallback.textContent = embed.url;
          fallback.target = "_blank";
          fallback.rel = "noopener noreferrer";
          fallback.style.color = "#0f766e";
          fallback.style.wordBreak = "break-all";
          container.replaceChildren(fallback);
        });

      return container;
    });

    return () => {
      controllers.forEach((container) => container?.replaceChildren());
    };
  }, [embeds, ready]);

  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div style={{ display: "grid", gap: "1rem" }}>
        {embeds.map((embed, index) => (
          <div
            key={embed.url}
            style={{
              background: "#fff",
              borderRadius: "0.85rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
            }}
          >
            {embed.label ? (
              <p style={{ marginBottom: "0.85rem", fontSize: "0.95rem", color: "#374151" }}>
                {embed.label}
              </p>
            ) : null}
            <div id={`x-embed-${index}`} />
          </div>
        ))}
      </div>
    </>
  );
}
