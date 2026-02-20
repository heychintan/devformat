import type { ToolDefinition } from "../types";

const xmlEscapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

const xmlUnescapeMap: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
};

function escapeXml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => xmlEscapeMap[c] || c);
}

function unescapeXml(str: string): string {
  return str.replace(/&(amp|lt|gt|quot|apos);/g, (match) => xmlUnescapeMap[match] || match);
}

export const xmlEscaper: ToolDefinition = {
  id: "xml-escaper",
  name: "XML Escape/Unescape",
  category: "escapers",
  route: "/escapers/xml",
  language: "xml",
  description: "Escape special characters for safe use in XML documents, or unescape XML entities.",
  keywords: ["xml", "escape", "unescape", "entities", "amp", "lt", "gt", "special characters"],
  mode: "transform",
  sampleInput: `<user name="O'Brien">Tom & Jerry's "Adventure"</user>`,
  execute: async (input) => {
    try {
      const escaped = escapeXml(input);
      const unescaped = unescapeXml(input);
      return {
        success: true,
        output: `--- Escaped ---\n${escaped}\n\n--- Unescaped ---\n${unescaped}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "XML escape failed";
      return { success: false, output: "", error: msg };
    }
  },
};
