import type { Metadata } from "next";
import { getToolById } from "./registry";

export function getToolMetadata(toolId: string): Metadata {
  const tool = getToolById(toolId)!;
  return {
    title: `${tool.name} - Free Online Tool`,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: { title: tool.name, description: tool.description },
  };
}
