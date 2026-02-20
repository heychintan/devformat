import type { ToolDefinition } from "../types";
import vkbeautify from "vkbeautify";

export const xmlFormatter: ToolDefinition = {
  id: "xml-formatter",
  name: "XML Formatter",
  category: "formatters",
  route: "/formatters/xml",
  language: "xml",
  description: "Format and beautify XML documents with proper indentation.",
  keywords: ["xml", "format", "beautify", "pretty print", "indent"],
  mode: "transform",
  sampleInput: `<?xml version="1.0" encoding="UTF-8"?><catalog><book id="1"><title>JavaScript: The Good Parts</title><author>Douglas Crockford</author><year>2008</year></book><book id="2"><title>Clean Code</title><author>Robert C. Martin</author><year>2008</year></book></catalog>`,
  execute: async (input, options) => {
    try {
      const indent = options?.indentSize ?? 2;
      const result = vkbeautify.xml(input, indent);
      return { success: true, output: result };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to format XML";
      return { success: false, output: "", error: msg };
    }
  },
};
