import type { ToolDefinition } from "../types";

export const numberBaseConverter: ToolDefinition = {
  id: "number-base-converter",
  name: "Number Base Converter",
  category: "converters",
  route: "/converters/number-base",
  language: "text",
  description: "Convert numbers between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16).",
  keywords: ["number", "base", "binary", "octal", "decimal", "hex", "hexadecimal", "convert", "radix"],
  mode: "transform",
  sampleInput: "255",
  execute: async (input) => {
    try {
      const trimmed = input.trim().toLowerCase();
      let decimal: number;

      if (trimmed.startsWith("0b")) {
        decimal = parseInt(trimmed.slice(2), 2);
      } else if (trimmed.startsWith("0o")) {
        decimal = parseInt(trimmed.slice(2), 8);
      } else if (trimmed.startsWith("0x")) {
        decimal = parseInt(trimmed.slice(2), 16);
      } else if (/^[01]+b$/.test(trimmed)) {
        decimal = parseInt(trimmed.slice(0, -1), 2);
      } else if (/^[0-9a-f]+h$/.test(trimmed)) {
        decimal = parseInt(trimmed.slice(0, -1), 16);
      } else {
        decimal = parseInt(trimmed, 10);
      }

      if (isNaN(decimal)) {
        return { success: false, output: "", error: "Invalid number. Supports: decimal, 0b (binary), 0o (octal), 0x (hex)" };
      }

      const output = [
        `Input:       ${trimmed}`,
        ``,
        `Binary:      0b${(decimal >>> 0).toString(2)}`,
        `Octal:       0o${(decimal >>> 0).toString(8)}`,
        `Decimal:     ${decimal}`,
        `Hexadecimal: 0x${(decimal >>> 0).toString(16).toUpperCase()}`,
      ].join("\n");

      return { success: true, output };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Conversion failed";
      return { success: false, output: "", error: msg };
    }
  },
};
