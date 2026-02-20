import type { ToolDefinition } from "../types";

export const urlEncoder: ToolDefinition = {
  id: "url-encoder",
  name: "URL Encode/Decode",
  category: "encoders",
  route: "/encoders/url",
  language: "text",
  description: "Encode or decode URL components. Automatically detects whether to encode or decode.",
  keywords: ["url", "encode", "decode", "percent", "uri", "encodeURIComponent", "query string"],
  mode: "transform",
  sampleInput: "https://example.com/search?q=hello world&lang=en&tag=café",
  execute: async (input) => {
    try {
      const encoded = encodeURIComponent(input);
      let decoded: string;
      try {
        decoded = decodeURIComponent(input);
      } catch {
        decoded = input;
      }
      return {
        success: true,
        output: `--- URL Encoded ---\n${encoded}\n\n--- URL Decoded ---\n${decoded}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "URL encoding failed";
      return { success: false, output: "", error: msg };
    }
  },
};
