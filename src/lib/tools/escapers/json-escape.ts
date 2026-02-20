import type { ToolDefinition } from "../types";

export const jsonEscaper: ToolDefinition = {
  id: "json-escaper",
  name: "JSON String Escape/Unescape",
  category: "escapers",
  route: "/escapers/json",
  language: "json",
  description: "Escape special characters in strings for use in JSON, or unescape JSON-encoded strings.",
  keywords: ["json", "escape", "unescape", "string", "quotes", "backslash", "newline"],
  mode: "transform",
  sampleInput: `Hello "World"\nThis has a\ttab and a backslash: \\ and unicode: ©`,
  execute: async (input) => {
    try {
      // Escape: wrap in JSON.stringify to get escaped version, then strip outer quotes
      const escaped = JSON.stringify(input);

      // Unescape: try parsing as a JSON string
      let unescaped: string;
      try {
        unescaped = JSON.parse(
          input.startsWith('"') && input.endsWith('"') ? input : `"${input}"`
        );
      } catch {
        unescaped = input;
      }

      return {
        success: true,
        output: `--- Escaped ---\n${escaped}\n\n--- Unescaped ---\n${unescaped}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "JSON escape failed";
      return { success: false, output: "", error: msg };
    }
  },
};
