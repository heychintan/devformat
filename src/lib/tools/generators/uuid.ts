import type { ToolDefinition } from "../types";
import { v4 as uuidv4 } from "uuid";

export const uuidGenerator: ToolDefinition = {
  id: "uuid-generator",
  name: "UUID Generator",
  category: "generators",
  route: "/generators/uuid",
  language: "text",
  description: "Generate random UUID v4 identifiers. Enter a number to generate multiple UUIDs (default: 5).",
  keywords: ["uuid", "guid", "v4", "random", "unique", "identifier", "generate"],
  mode: "generate",
  sampleInput: "5",
  execute: async (input) => {
    try {
      const count = Math.min(Math.max(parseInt(input.trim()) || 5, 1), 100);
      const uuids: string[] = [];
      for (let i = 0; i < count; i++) {
        uuids.push(uuidv4());
      }
      return { success: true, output: uuids.join("\n") };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "UUID generation failed";
      return { success: false, output: "", error: msg };
    }
  },
};
