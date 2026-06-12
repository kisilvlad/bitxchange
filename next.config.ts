import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "bitxchange";
const githubPagesBasePath = isGithubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  trailingSlash: isGithubPages ? true : undefined,
  basePath: isGithubPages ? githubPagesBasePath : undefined,
  assetPrefix: isGithubPages ? `${githubPagesBasePath}/` : undefined,
  images: {
    unoptimized: true
  },
  poweredByHeader: false,
  reactStrictMode: true,
  ...(isGithubPages
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                {
                  key: "X-Content-Type-Options",
                  value: "nosniff"
                },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin"
                },
                {
                  key: "X-Frame-Options",
                  value: "DENY"
                },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=()"
                }
              ]
            }
          ];
        }
      })
};

export default nextConfig;
