import type { ToolDefinition } from "../types";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

export const htmlEscaper: ToolDefinition = {
  id: "html-escaper",
  name: "HTML Escape/Unescape",
  category: "escapers",
  route: "/escapers/html",
  language: "html",
  description: "Escape HTML special characters to prevent XSS, or unescape HTML entities back to text.",
  keywords: ["html", "escape", "unescape", "xss", "sanitize", "entities", "special characters"],
  mode: "transform",
  sampleInput: `<script>alert("XSS")</script> & <img src="x" onerror="alert('hack')">`,
  execute: async (input) => {
    try {
      const escaped = escapeHtml(input);
      const unescaped = unescapeHtml(input);
      return {
        success: true,
        output: `--- Escaped ---\n${escaped}\n\n--- Unescaped ---\n${unescaped}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "HTML escape failed";
      return { success: false, output: "", error: msg };
    }
  },
};
