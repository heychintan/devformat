import type { ToolDefinition } from "../types";

export const timestampConverter: ToolDefinition = {
  id: "timestamp-converter",
  name: "Unix Timestamp Converter",
  category: "generators",
  route: "/generators/timestamp",
  language: "text",
  description: "Convert between Unix timestamps and human-readable dates. Enter a timestamp, date string, or leave empty for current time.",
  keywords: ["timestamp", "unix", "epoch", "date", "time", "convert", "utc", "iso"],
  mode: "generate",
  sampleInput: "",
  execute: async (input) => {
    try {
      const trimmed = input.trim();
      let date: Date;

      if (!trimmed) {
        date = new Date();
      } else if (/^\d{10}$/.test(trimmed)) {
        date = new Date(parseInt(trimmed) * 1000);
      } else if (/^\d{13}$/.test(trimmed)) {
        date = new Date(parseInt(trimmed));
      } else {
        date = new Date(trimmed);
        if (isNaN(date.getTime())) {
          return { success: false, output: "", error: "Invalid date or timestamp. Enter a Unix timestamp (seconds or milliseconds) or a date string." };
        }
      }

      const unixSeconds = Math.floor(date.getTime() / 1000);
      const unixMilliseconds = date.getTime();

      const output = [
        `--- Current Conversion ---`,
        ``,
        `Unix Timestamp (seconds):      ${unixSeconds}`,
        `Unix Timestamp (milliseconds): ${unixMilliseconds}`,
        ``,
        `ISO 8601:      ${date.toISOString()}`,
        `UTC String:    ${date.toUTCString()}`,
        `Local String:  ${date.toLocaleString()}`,
        ``,
        `Year:   ${date.getFullYear()}`,
        `Month:  ${date.getMonth() + 1} (${date.toLocaleString("en", { month: "long" })})`,
        `Day:    ${date.getDate()} (${date.toLocaleString("en", { weekday: "long" })})`,
        `Hour:   ${date.getHours().toString().padStart(2, "0")}`,
        `Minute: ${date.getMinutes().toString().padStart(2, "0")}`,
        `Second: ${date.getSeconds().toString().padStart(2, "0")}`,
      ].join("\n");

      return { success: true, output };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Timestamp conversion failed";
      return { success: false, output: "", error: msg };
    }
  },
};
