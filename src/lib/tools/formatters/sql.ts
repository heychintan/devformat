import type { ToolDefinition } from "../types";
import { format as formatSQL } from "sql-formatter";

export const sqlFormatter: ToolDefinition = {
  id: "sql-formatter",
  name: "SQL Formatter",
  category: "formatters",
  route: "/formatters/sql",
  language: "sql",
  description: "Format and beautify SQL queries with proper indentation and keyword casing.",
  keywords: ["sql", "format", "beautify", "query", "database", "indent"],
  mode: "transform",
  sampleInput: `SELECT u.id, u.name, u.email, o.order_id, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE u.active = 1 AND o.total > 100 ORDER BY o.total DESC LIMIT 10;`,
  execute: async (input, options) => {
    try {
      const indent = options?.indentSize ?? 2;
      const result = formatSQL(input, {
        tabWidth: indent,
        keywordCase: "upper",
      });
      return { success: true, output: result };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to format SQL";
      return { success: false, output: "", error: msg };
    }
  },
};
