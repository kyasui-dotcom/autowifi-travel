export const alt = "AutoWiFi Travel eSIM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/svg+xml";

export default function OpenGraphImage() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#082f49"/>
      <stop offset="0.45" stop-color="#0f766e"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="100" r="180" fill="#38bdf8" opacity="0.18"/>
  <circle cx="150" cy="550" r="200" fill="#0ea5e9" opacity="0.14"/>
  <rect x="64" y="64" width="56" height="56" rx="18" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.25)"/>
  <text x="76" y="100" fill="#f8fafc" font-size="22" font-family="Arial, Helvetica, sans-serif" font-weight="700">AW</text>
  <text x="136" y="100" fill="#f8fafc" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="2">AUTOWIFI TRAVEL</text>
  <text x="64" y="220" fill="#f8fafc" font-size="68" font-family="Arial, Helvetica, sans-serif" font-weight="800">
    <tspan x="64" y="220">Travel eSIM for</tspan>
    <tspan x="64" y="296">200+ Countries</tspan>
  </text>
  <text x="64" y="360" fill="rgba(248,250,252,0.88)" font-size="30" font-family="Arial, Helvetica, sans-serif" font-weight="500">
    <tspan x="64" y="360">Instant QR setup, fast mobile data, and simple</tspan>
    <tspan x="64" y="398">activation for international trips.</tspan>
  </text>
  <rect x="64" y="460" width="240" height="52" rx="26" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.24)"/>
  <text x="98" y="493" fill="#f8fafc" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="600">Instant activation</text>
  <rect x="324" y="460" width="280" height="52" rx="26" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.24)"/>
  <text x="358" y="493" fill="#f8fafc" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="600">Keep your main SIM</text>
  <rect x="624" y="460" width="310" height="52" rx="26" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.24)"/>
  <text x="658" y="493" fill="#f8fafc" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="600">Travel-ready data plans</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
