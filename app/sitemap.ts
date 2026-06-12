import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4
    },
    {
      url: `${siteConfig.url}/disclaimer`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4
    }
  ];
}
