import type { ToolDefinition } from "../types";
import { format as formatSQL } from "sql-formatter";

export const sqlValidator: ToolDefinition = {
  id: "sql-validator",
  name: "SQL Validator",
  category: "validators",
  route: "/validators/sql",
  language: "sql",
  description: "Validate SQL syntax by attempting to parse the query.",
  keywords: ["sql", "validate", "check", "syntax", "query", "database"],
  mode: "transform",
  sampleInput: `SELECT u.id, u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.active = 1
ORDER BY o.total DESC;`,
  execute: async (input) => {
    try {
      const formatted = formatSQL(input, { keywordCase: "upper" });
      return {
        success: true,
        output: `Valid SQL\n\nFormatted output:\n\n${formatted}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid SQL syntax";
      return { success: false, output: "", error: msg };
    }
  },
};
