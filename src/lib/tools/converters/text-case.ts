import type { ToolDefinition } from "../types";

function toWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[-_./\\]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toCamelCase(words: string[]): string {
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
}

function toPascalCase(words: string[]): string {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
}

function toSnakeCase(words: string[]): string {
  return words.map((w) => w.toLowerCase()).join("_");
}

function toKebabCase(words: string[]): string {
  return words.map((w) => w.toLowerCase()).join("-");
}

function toTitleCase(words: string[]): string {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

function toConstantCase(words: string[]): string {
  return words.map((w) => w.toUpperCase()).join("_");
}

export const textCaseConverter: ToolDefinition = {
  id: "text-case-converter",
  name: "Text Case Converter",
  category: "converters",
  route: "/converters/text-case",
  language: "text",
  description: "Convert text between camelCase, PascalCase, snake_case, kebab-case, Title Case, UPPER_CASE, and more.",
  keywords: ["case", "camel", "pascal", "snake", "kebab", "title", "upper", "lower", "convert", "text"],
  mode: "transform",
  sampleInput: "hello world example text",
  execute: async (input) => {
    try {
      const words = toWords(input.trim());
      if (words.length === 0) {
        return { success: false, output: "", error: "Please enter some text to convert" };
      }

      const output = [
        `camelCase:    ${toCamelCase(words)}`,
        `PascalCase:   ${toPascalCase(words)}`,
        `snake_case:   ${toSnakeCase(words)}`,
        `kebab-case:   ${toKebabCase(words)}`,
        `Title Case:   ${toTitleCase(words)}`,
        `CONSTANT:     ${toConstantCase(words)}`,
        `lowercase:    ${words.map((w) => w.toLowerCase()).join(" ")}`,
        `UPPERCASE:    ${words.map((w) => w.toUpperCase()).join(" ")}`,
      ].join("\n");

      return { success: true, output };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Case conversion failed";
      return { success: false, output: "", error: msg };
    }
  },
};
