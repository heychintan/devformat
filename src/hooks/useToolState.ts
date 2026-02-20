"use client";

import { useState, useCallback } from "react";
import type { ToolDefinition, ToolResult, ToolOptions } from "@/lib/tools/types";

interface ToolState {
  input: string;
  output: string;
  result: ToolResult | null;
  processing: boolean;
  indentSize: number;
  setInput: (value: string) => void;
  setIndentSize: (size: number) => void;
  execute: () => Promise<void>;
  loadSample: () => void;
  clear: () => void;
}

export function useToolState(tool: ToolDefinition): ToolState {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const execute = useCallback(async () => {
    // For generators, allow empty input
    if (tool.mode !== "generate" && !input.trim()) return;
    setProcessing(true);
    try {
      const options: ToolOptions = { indentSize };
      const execInput = tool.mode === "generate" && !input.trim() ? (tool.sampleInput || "") : input;
      const res = await tool.execute(execInput, options);
      setResult(res);
      setOutput(res.success ? res.output : res.error || "Error");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error";
      setResult({ success: false, output: "", error: msg });
      setOutput(msg);
    } finally {
      setProcessing(false);
    }
  }, [input, tool, indentSize]);

  const loadSample = useCallback(() => {
    setInput(tool.sampleInput);
    setOutput("");
    setResult(null);
  }, [tool]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setResult(null);
  }, []);

  return { input, output, result, processing, indentSize, setInput, setIndentSize, execute, loadSample, clear };
}
