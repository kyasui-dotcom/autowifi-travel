import { ImageResponse } from "next/og";

export const alt = "AutoWiFi Travel eSIM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #082f49 0%, #0f766e 45%, #38bdf8 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.16)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              AW
            </div>
            AutoWiFi Travel
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: 820,
            }}
          >
            <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 800 }}>
              Travel eSIM for 200+ Countries
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.4, color: "rgba(248,250,252,0.88)" }}>
              Instant QR setup, fast mobile data, and simple activation for international trips.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          {["Instant activation", "Keep your main SIM", "Travel-ready data plans"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.24)",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
