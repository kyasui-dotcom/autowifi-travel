const OG_SIZE = {
  width: 1200,
  height: 630,
};

const PALETTES = [
  { bg: "#082f49", accent: "#38bdf8", glow: "#0ea5e9" },
  { bg: "#172554", accent: "#818cf8", glow: "#4f46e5" },
  { bg: "#3f0d12", accent: "#fb7185", glow: "#e11d48" },
  { bg: "#052e16", accent: "#4ade80", glow: "#16a34a" },
  { bg: "#3b0764", accent: "#c084fc", glow: "#9333ea" },
  { bg: "#431407", accent: "#fb923c", glow: "#ea580c" },
];

const THEME_PALETTES: Record<string, { bg: string; accent: string; glow: string }> = {
  country: { bg: "#082f49", accent: "#38bdf8", glow: "#0ea5e9" },
  comparison: { bg: "#312e81", accent: "#a78bfa", glow: "#7c3aed" },
  howto: { bg: "#14532d", accent: "#4ade80", glow: "#16a34a" },
  review: { bg: "#4c0519", accent: "#fb7185", glow: "#e11d48" },
  travel: { bg: "#431407", accent: "#fb923c", glow: "#ea580c" },
};

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }

  return `${input.slice(0, maxLength - 1).trimEnd()}...`;
}

function escapeXml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatLocale(locale: string): string {
  return locale.toUpperCase();
}

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function wrapText(input: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = input.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;

    if (lines.length === maxLines) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  if (lines.length === 0) {
    lines.push(input);
  }

  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    const lastIndex = lines.length - 1;
    lines[lastIndex] = truncate(lines[lastIndex], Math.max(10, maxCharsPerLine - 3));
  }

  return lines;
}

function buildTspans(lines: string[], x: number, startY: number, lineHeight: number): string {
  return lines
    .map(
      (line, index) =>
        `<tspan x="${x}" y="${startY + index * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";
  const slug = searchParams.get("slug") || "guide";
  const title = searchParams.get("title") || formatSlug(slug);
  const description =
    searchParams.get("description") || "Travel planning guide from AutoWiFi Travel.";
  const kindLabel = searchParams.get("kindLabel") || "Travel Article";
  const footerLabel = searchParams.get("footerLabel") || formatSlug(slug);
  const theme = searchParams.get("theme");

  const palette = theme && THEME_PALETTES[theme]
    ? THEME_PALETTES[theme]
    : PALETTES[hashString(slug) % PALETTES.length];
  const titleLines = wrapText(truncate(title, 90), 28, 3);
  const descriptionLines = wrapText(truncate(description, 180), 60, 3);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${OG_SIZE.width}" height="${OG_SIZE.height}" viewBox="0 0 ${OG_SIZE.width} ${OG_SIZE.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="${palette.bg}"/>
      <stop offset="1" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="line" x1="60" y1="0" x2="920" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="${palette.accent}"/>
      <stop offset="1" stop-color="rgba(255,255,255,0.15)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1090" cy="90" r="210" fill="${palette.glow}" opacity="0.22"/>
  <circle cx="120" cy="590" r="220" fill="${palette.accent}" opacity="0.16"/>
  <rect x="60" y="54" width="330" height="52" rx="26" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)"/>
  <text x="88" y="87" fill="${palette.accent}" font-size="20" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="1.4">AUTOWIFI TRAVEL</text>
  <rect x="950" y="54" width="190" height="52" rx="26" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)"/>
  <text x="982" y="87" fill="#F8FAFC" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="1.2">${escapeXml(formatLocale(locale))}</text>
  <text x="1042" y="87" fill="${palette.accent}" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="1.2">GUIDE</text>
  <text x="60" y="220" fill="#F8FAFC" font-size="68" font-family="Arial, Helvetica, sans-serif" font-weight="800">
    ${buildTspans(titleLines, 60, 220, 76)}
  </text>
  <rect x="60" y="378" width="860" height="6" rx="3" fill="${palette.accent}" opacity="0.95"/>
  <text x="60" y="438" fill="rgba(248,250,252,0.88)" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="500">
    ${buildTspans(descriptionLines, 60, 438, 38)}
  </text>
  <text x="60" y="572" fill="rgba(248,250,252,0.68)" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="1.8">${escapeXml(kindLabel.toUpperCase())}</text>
  <text x="60" y="604" fill="#F8FAFC" font-size="26" font-family="Arial, Helvetica, sans-serif" font-weight="700">${escapeXml(footerLabel)}</text>
  <text x="952" y="604" fill="rgba(248,250,252,0.82)" font-size="22" font-family="Arial, Helvetica, sans-serif" font-weight="600">autowifi-travel.com</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
