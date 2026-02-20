import type { ToolDefinition } from "../types";

function escapeSql(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "''")
    .replace(/"/g, '\\"')
    .replace(/\x00/g, "\\0")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\x1a/g, "\\Z");
}

function unescapeSql(str: string): string {
  return str
    .replace(/''/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\0/g, "\x00")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\Z/g, "\x1a");
}

export const sqlEscaper: ToolDefinition = {
  id: "sql-escaper",
  name: "SQL String Escape/Unescape",
  category: "escapers",
  route: "/escapers/sql",
  language: "sql",
  description: "Escape strings for safe use in SQL queries to prevent SQL injection, or unescape SQL strings.",
  keywords: ["sql", "escape", "unescape", "injection", "sanitize", "query", "string"],
  mode: "transform",
  sampleInput: `O'Brien said "Hello"\nLine 2\\Path`,
  execute: async (input) => {
    try {
      const escaped = escapeSql(input);
      const unescaped = unescapeSql(input);
      return {
        success: true,
        output: `--- Escaped ---\n'${escaped}'\n\n--- Unescaped ---\n${unescaped}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "SQL escape failed";
      return { success: false, output: "", error: msg };
    }
  },
};
