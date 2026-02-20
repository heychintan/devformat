import type { ToolDefinition } from "../types";

export const htmlValidator: ToolDefinition = {
  id: "html-validator",
  name: "HTML Validator",
  category: "validators",
  route: "/validators/html",
  language: "html",
  description: "Validate HTML structure and check for common issues.",
  keywords: ["html", "validate", "check", "structure", "lint", "accessibility"],
  mode: "transform",
  sampleInput: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Page</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a valid HTML document.</p>
</body>
</html>`,
  execute: async (input) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/html");
      const issues: string[] = [];

      const errorNodes = doc.querySelectorAll("parsererror");
      if (errorNodes.length > 0) {
        issues.push("HTML parsing errors detected");
      }

      if (!input.toLowerCase().includes("<!doctype")) {
        issues.push("Missing DOCTYPE declaration");
      }

      if (!doc.querySelector("html")) {
        issues.push("Missing <html> element");
      }

      if (!doc.querySelector("head")) {
        issues.push("Missing <head> element");
      }

      if (!doc.querySelector("body")) {
        issues.push("Missing <body> element");
      }

      if (!doc.querySelector("title")) {
        issues.push("Missing <title> element");
      }

      const imgs = doc.querySelectorAll("img");
      imgs.forEach((img, i) => {
        if (!img.getAttribute("alt")) {
          issues.push(`<img> element ${i + 1} is missing alt attribute`);
        }
      });

      if (issues.length === 0) {
        return { success: true, output: "Valid HTML\n\nNo structural issues found." };
      }

      return {
        success: false,
        output: "",
        error: `Found ${issues.length} issue(s):\n\n${issues.map((i) => `- ${i}`).join("\n")}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to validate HTML";
      return { success: false, output: "", error: msg };
    }
  },
};
