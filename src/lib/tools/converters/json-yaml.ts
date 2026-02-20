import type { ToolDefinition } from "../types";
import yaml from "js-yaml";

export const jsonYamlConverter: ToolDefinition = {
  id: "json-yaml-converter",
  name: "JSON to YAML Converter",
  category: "converters",
  route: "/converters/json-yaml",
  language: "json",
  description: "Convert between JSON and YAML formats. Paste JSON to get YAML, or YAML to get JSON.",
  keywords: ["json", "yaml", "yml", "convert", "transform", "serialize", "deserialize"],
  mode: "transform",
  sampleInput: `{
  "name": "DevFormat",
  "version": "1.0.0",
  "features": ["formatters", "validators", "converters"],
  "config": {
    "theme": "dark",
    "indent": 2
  }
}`,
  execute: async (input) => {
    try {
      // Try parsing as JSON first
      try {
        const parsed = JSON.parse(input);
        const yamlOutput = yaml.dump(parsed, { indent: 2, lineWidth: 120 });
        return {
          success: true,
          output: `--- YAML Output ---\n${yamlOutput}`,
        };
      } catch {
        // Not JSON, try YAML
      }

      // Try parsing as YAML
      const parsed = yaml.load(input);
      const jsonOutput = JSON.stringify(parsed, null, 2);
      return {
        success: true,
        output: `--- JSON Output ---\n${jsonOutput}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Conversion failed";
      return { success: false, output: "", error: `Could not parse input as JSON or YAML: ${msg}` };
    }
  },
};
