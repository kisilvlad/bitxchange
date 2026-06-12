const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const basePath =
  rawBasePath && rawBasePath !== "/"
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
    : "";

export function publicAssetPath(src: string) {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;

  return `${basePath}${normalizedSrc}`;
}
