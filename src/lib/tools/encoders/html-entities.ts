import type { ToolDefinition } from "../types";

const entityMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

const reverseEntityMap: Record<string, string> = {};
for (const [char, entity] of Object.entries(entityMap)) {
  reverseEntityMap[entity] = char;
}

function encodeEntities(str: string): string {
  return str.replace(/[&<>"'/]/g, (char) => entityMap[char] || char);
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;/g, (entity) => reverseEntityMap[entity] || entity)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

export const htmlEntitiesEncoder: ToolDefinition = {
  id: "html-entities-encoder",
  name: "HTML Entities Encode/Decode",
  category: "encoders",
  route: "/encoders/html-entities",
  language: "html",
  description: "Encode special characters to HTML entities or decode HTML entities back to characters.",
  keywords: ["html", "entities", "encode", "decode", "amp", "lt", "gt", "special characters"],
  mode: "transform",
  sampleInput: `<div class="hello">Tom & Jerry's "Adventure" < 5/10</div>`,
  execute: async (input) => {
    try {
      const encoded = encodeEntities(input);
      const decoded = decodeEntities(input);
      return {
        success: true,
        output: `--- Encoded ---\n${encoded}\n\n--- Decoded ---\n${decoded}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "HTML entity encoding failed";
      return { success: false, output: "", error: msg };
    }
  },
};
