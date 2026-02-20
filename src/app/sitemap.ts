import type { MetadataRoute } from "next";
import { toolRegistry } from "@/lib/tools/registry";

const BASE_URL = "https://devformat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes = toolRegistry.map((tool) => ({
    url: `${BASE_URL}${tool.route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolRoutes,
  ];
}
