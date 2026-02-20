import type { ToolDefinition } from "../types";

function jsonToCsv(data: unknown[]): string {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Input must be a non-empty JSON array of objects");
  }
  const headers = new Set<string>();
  for (const item of data) {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      throw new Error("Each array element must be a flat object");
    }
    Object.keys(item).forEach((k) => headers.add(k));
  }
  const headerArr = Array.from(headers);
  const escapeCsv = (val: unknown): string => {
    const str = val === null || val === undefined ? "" : String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const rows = [headerArr.map(escapeCsv).join(",")];
  for (const item of data) {
    const obj = item as Record<string, unknown>;
    rows.push(headerArr.map((h) => escapeCsv(obj[h])).join(","));
  }
  return rows.join("\n");
}

function csvToJson(csv: string): string {
  const lines = csv.split("\n").filter((l) => l.trim());
  if (lines.length < 2) throw new Error("CSV must have a header row and at least one data row");

  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') {
          current += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ",") {
          result.push(current);
          current = "";
        } else {
          current += ch;
        }
      }
    }
    result.push(current);
    return result;
  };

  const headers = parseRow(lines[0]);
  const objects = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseRow(lines[i]);
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = (values[idx] || "").trim();
    });
    objects.push(obj);
  }
  return JSON.stringify(objects, null, 2);
}

export const jsonCsvConverter: ToolDefinition = {
  id: "json-csv-converter",
  name: "JSON to CSV Converter",
  category: "converters",
  route: "/converters/json-csv",
  language: "json",
  description: "Convert between JSON arrays and CSV format. Paste a JSON array to get CSV, or CSV to get JSON.",
  keywords: ["json", "csv", "convert", "spreadsheet", "table", "export", "import", "data"],
  mode: "transform",
  sampleInput: `[
  { "name": "Alice", "age": 30, "city": "New York" },
  { "name": "Bob", "age": 25, "city": "San Francisco" },
  { "name": "Charlie", "age": 35, "city": "Chicago" }
]`,
  execute: async (input) => {
    try {
      // Try JSON first
      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) {
          return { success: true, output: `--- CSV Output ---\n${jsonToCsv(parsed)}` };
        }
      } catch {
        // Not JSON, try CSV
      }

      // Try CSV
      if (input.includes(",")) {
        return { success: true, output: `--- JSON Output ---\n${csvToJson(input)}` };
      }

      return { success: false, output: "", error: "Input must be a JSON array or CSV data" };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Conversion failed";
      return { success: false, output: "", error: msg };
    }
  },
};
