import type { ToolDefinition } from "../types";
import * as prettier from "prettier/standalone";
import htmlPlugin from "prettier/plugins/html";

export const htmlFormatter: ToolDefinition = {
  id: "html-formatter",
  name: "HTML Formatter",
  category: "formatters",
  route: "/formatters/html",
  language: "html",
  description: "Format and beautify HTML markup with proper indentation.",
  keywords: ["html", "format", "beautify", "pretty print", "indent", "markup"],
  mode: "transform",
  sampleInput: `<!DOCTYPE html><html><head><title>Hello</title></head><body><div class="container"><h1>Hello World</h1><p>This is a <strong>sample</strong> HTML document.</p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul></div></body></html>`,
  execute: async (input, options) => {
    try {
      const indent = options?.indentSize ?? 2;
      const result = await prettier.format(input, {
        parser: "html",
        plugins: [htmlPlugin],
        tabWidth: indent,
        printWidth: 120,
      });
      return { success: true, output: result };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to format HTML";
      return { success: false, output: "", error: msg };
    }
  },
};
