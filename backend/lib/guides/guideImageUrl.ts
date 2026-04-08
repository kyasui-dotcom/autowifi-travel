import { getBaseUrl } from "@/lib/seo";

const GUIDE_IMAGE_PROXY_PATH = "/api/guide-image";
const WIKIMEDIA_HOSTNAME = "upload.wikimedia.org";

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//.test(value);
}

function toAbsolutePath(value: string, baseUrl: string): string {
  if (value.startsWith("/")) {
    return `${baseUrl}${value}`;
  }

  return `${baseUrl}/${value.replace(/^\/+/, "")}`;
}

export function shouldProxyGuideImage(src: string): boolean {
  if (!isAbsoluteUrl(src)) {
    return false;
  }

  try {
    const url = new URL(src);
    return url.protocol === "https:" && url.hostname === WIKIMEDIA_HOSTNAME;
  } catch {
    return false;
  }
}

export function getGuideImageUrl(
  src: string,
  options?: {
    absolute?: boolean;
    baseUrl?: string;
  },
): string {
  const baseUrl = options?.baseUrl ?? getBaseUrl();

  if (src.startsWith(GUIDE_IMAGE_PROXY_PATH)) {
    return options?.absolute ? toAbsolutePath(src, baseUrl) : src;
  }

  if (shouldProxyGuideImage(src)) {
    const proxiedPath = `${GUIDE_IMAGE_PROXY_PATH}?src=${encodeURIComponent(src)}`;
    return options?.absolute ? toAbsolutePath(proxiedPath, baseUrl) : proxiedPath;
  }

  if (isAbsoluteUrl(src)) {
    return src;
  }

  return options?.absolute ? toAbsolutePath(src, baseUrl) : src;
}

