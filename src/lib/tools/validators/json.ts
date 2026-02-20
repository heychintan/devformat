import type { ToolDefinition } from "../types";

export const jsonValidator: ToolDefinition = {
  id: "json-validator",
  name: "JSON Validator",
  category: "validators",
  route: "/validators/json",
  language: "json",
  description: "Validate JSON syntax and display detailed error information.",
  keywords: ["json", "validate", "check", "syntax", "lint", "parse"],
  mode: "transform",
  sampleInput: `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "tags": ["developer", "designer"]
}`,
  execute: async (input) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      return { success: true, output: `Valid JSON\n\n${formatted}` };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      return { success: false, output: "", error: msg };
    }
  },
};
