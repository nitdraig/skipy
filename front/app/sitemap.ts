import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { TOOL_IDS } from "@/data/toolIds";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/app`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = TOOL_IDS.map((id) => ({
    url: `${SITE_URL}/app?tool=${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...toolRoutes];
}
