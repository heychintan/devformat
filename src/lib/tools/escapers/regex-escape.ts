import type { ToolDefinition } from "../types";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function unescapeRegex(str: string): string {
  return str.replace(/\\([.*+?^${}()|[\]\\])/g, "$1");
}

export const regexEscaper: ToolDefinition = {
  id: "regex-escaper",
  name: "Regex Escape/Unescape",
  category: "escapers",
  route: "/escapers/regex",
  language: "text",
  description: "Escape special regex metacharacters for literal use in regular expressions, or unescape them.",
  keywords: ["regex", "regexp", "escape", "unescape", "regular expression", "metacharacters", "pattern"],
  mode: "transform",
  sampleInput: `price is $9.99 (USD) [sale] {today} hello.world+test`,
  execute: async (input) => {
    try {
      const escaped = escapeRegex(input);
      const unescaped = unescapeRegex(input);
      return {
        success: true,
        output: `--- Escaped ---\n${escaped}\n\n--- Unescaped ---\n${unescaped}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Regex escape failed";
      return { success: false, output: "", error: msg };
    }
  },
};
