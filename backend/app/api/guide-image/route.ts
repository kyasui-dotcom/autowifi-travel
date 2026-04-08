const ALLOWED_REMOTE_HOSTS = new Set(["upload.wikimedia.org"]);
const CACHE_CONTROL = "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000";

function getRemoteImageUrl(request: Request): URL | null {
  const requestUrl = new URL(request.url);
  const src = requestUrl.searchParams.get("src");

  if (!src) {
    return null;
  }

  try {
    const remoteUrl = new URL(src);
    if (remoteUrl.protocol !== "https:") {
      return null;
    }

    if (!ALLOWED_REMOTE_HOSTS.has(remoteUrl.hostname)) {
      return null;
    }

    return remoteUrl;
  } catch {
    return null;
  }
}

function buildImageResponse(upstream: Response, includeBody: boolean): Response {
  const contentType = upstream.headers.get("content-type");

  if (!contentType || !contentType.startsWith("image/")) {
    return new Response("Unsupported image response.", {
      status: 502,
      headers: {
        "cache-control": "no-store",
      },
    });
  }

  const headers = new Headers();
  headers.set("content-type", contentType);
  headers.set("cache-control", CACHE_CONTROL);
  headers.set("x-robots-tag", "noindex");

  for (const headerName of ["etag", "last-modified", "content-length"]) {
    const headerValue = upstream.headers.get(headerName);
    if (headerValue) {
      headers.set(headerName, headerValue);
    }
  }

  return new Response(includeBody ? upstream.body : null, {
    status: 200,
    headers,
  });
}

async function proxyGuideImage(request: Request, includeBody: boolean): Promise<Response> {
  const remoteUrl = getRemoteImageUrl(request);

  if (!remoteUrl) {
    return new Response("Invalid guide image URL.", {
      status: 400,
      headers: {
        "cache-control": "no-store",
      },
    });
  }

  const upstream = await fetch(remoteUrl.toString(), {
    headers: {
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "user-agent": "AutoWiFiTravelGuideImageProxy/1.0",
    },
  });

  if (!upstream.ok) {
    return new Response("Unable to fetch guide image.", {
      status: upstream.status,
      headers: {
        "cache-control": "no-store",
      },
    });
  }

  return buildImageResponse(upstream, includeBody);
}

export async function GET(request: Request) {
  return proxyGuideImage(request, true);
}

export async function HEAD(request: Request) {
  return proxyGuideImage(request, false);
}
