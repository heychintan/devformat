import type { ToolDefinition } from "../types";

export const jsonFormatter: ToolDefinition = {
  id: "json-formatter",
  name: "JSON Formatter",
  category: "formatters",
  route: "/formatters/json",
  language: "json",
  description: "Format and beautify JSON data with customizable indentation.",
  keywords: ["json", "format", "beautify", "pretty print", "indent", "minify"],
  mode: "transform",
  sampleInput: `{"name":"John Doe","age":30,"address":{"street":"123 Main St","city":"Springfield"},"hobbies":["reading","coding","hiking"]}`,
  execute: async (input, options) => {
    try {
      const parsed = JSON.parse(input);
      const indent = options?.indentSize ?? 2;
      return { success: true, output: JSON.stringify(parsed, null, indent) };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      return { success: false, output: "", error: msg };
    }
  },
};
