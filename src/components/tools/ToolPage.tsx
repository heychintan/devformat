"use client";

import { useEffect, useCallback } from "react";
import EditorPanel from "./EditorPanel";
import ResultBadge from "./ResultBadge";
import { useToolState } from "@/hooks/useToolState";
import { getToolById } from "@/lib/tools/registry";
import type { ToolDefinition } from "@/lib/tools/types";

interface ToolPageProps {
  toolId: string;
}

export default function ToolPage({ toolId }: ToolPageProps) {
  const tool = getToolById(toolId)!;
  const state = useToolState(tool);
  const isFormatter = tool.category === "formatters";
  const isGenerator = tool.mode === "generate";

  const actionLabel = isFormatter
    ? "Format"
    : tool.category === "validators"
      ? "Validate"
      : isGenerator
        ? "Generate"
        : "Convert";

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        state.execute();
      }
    },
    [state]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto-execute for generators with no input required
  useEffect(() => {
    if (isGenerator && !tool.sampleInput && !state.output) {
      state.execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-fg-primary">{tool.name}</h1>
          <p className="text-sm text-fg-muted">{tool.description}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={state.execute}
          disabled={state.processing || (!isGenerator && !state.input.trim())}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {state.processing ? (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          ) : null}
          {actionLabel}
        </button>

        {tool.sampleInput && (
          <button
            onClick={state.loadSample}
            className="rounded-md px-3 py-2 text-sm font-medium border border-border text-fg-secondary hover:bg-bg-tertiary transition-colors"
          >
            Load Sample
          </button>
        )}

        <button
          onClick={state.clear}
          className="rounded-md px-3 py-2 text-sm font-medium border border-border text-fg-secondary hover:bg-bg-tertiary transition-colors"
        >
          Clear
        </button>

        {isFormatter && (
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-xs text-fg-muted">Indent:</label>
            <select
              value={state.indentSize}
              onChange={(e) => state.setIndentSize(Number(e.target.value))}
              className="rounded-md border border-border bg-bg-primary px-2 py-1.5 text-xs text-fg-primary"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
        )}

        <span className="text-xs text-fg-muted hidden sm:inline ml-auto">
          Ctrl/Cmd + Enter to {actionLabel.toLowerCase()}
        </span>
      </div>

      {/* Result Badge */}
      {state.result && (
        <ResultBadge success={state.result.success} error={state.result.error} />
      )}

      {/* Editor Panels */}
      {isGenerator ? (
        /* Single-panel layout for generators */
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {tool.sampleInput && (
            <div className="flex-shrink-0">
              <EditorPanel
                label="Options"
                value={state.input}
                onChange={state.setInput}
                language="text"
              />
            </div>
          )}
          <div className="flex-1 min-h-0">
            <EditorPanel
              label="Output"
              value={state.output}
              readOnly
              language={tool.language}
            />
          </div>
        </div>
      ) : (
        /* Dual-panel layout for transform tools */
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <EditorPanel
            label="Input"
            value={state.input}
            onChange={state.setInput}
            language={tool.language}
          />
          <EditorPanel
            label="Output"
            value={state.output}
            readOnly
            language={tool.language}
          />
        </div>
      )}
    </div>
  );
}
