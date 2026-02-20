export type ToolCategory = "formatters" | "validators" | "encoders" | "escapers" | "generators" | "converters";

export type ToolMode = "transform" | "generate";

export interface ToolResult {
  success: boolean;
  output: string;
  error?: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  category: ToolCategory;
  route: string;
  language: string;
  description: string;
  sampleInput: string;
  keywords: string[];
  mode: ToolMode;
  execute: (input: string, options?: ToolOptions) => Promise<ToolResult>;
}

export interface ToolOptions {
  indentSize?: number;
}
