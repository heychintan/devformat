import type { ToolDefinition } from "../types";

export const xmlValidator: ToolDefinition = {
  id: "xml-validator",
  name: "XML Validator",
  category: "validators",
  route: "/validators/xml",
  language: "xml",
  description: "Validate XML syntax and check for well-formedness.",
  keywords: ["xml", "validate", "check", "syntax", "well-formed", "parse"],
  mode: "transform",
  sampleInput: `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1">
    <title>JavaScript: The Good Parts</title>
    <author>Douglas Crockford</author>
  </book>
</catalog>`,
  execute: async (input) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "application/xml");
      const errorNode = doc.querySelector("parsererror");
      if (errorNode) {
        const errorText = errorNode.textContent || "XML parsing error";
        return { success: false, output: "", error: errorText };
      }
      return { success: true, output: "Valid XML\n\nThe document is well-formed." };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid XML";
      return { success: false, output: "", error: msg };
    }
  },
};
