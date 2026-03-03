"use client";

import { useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import EditorPanel from "./EditorPanel";
import { useToolState } from "@/hooks/useToolState";
import { getToolById } from "@/lib/tools/registry";
import type { ToolResult } from "@/lib/tools/types";

interface ToolPageProps {
  toolId: string;
}

export default function ToolPage({ toolId }: ToolPageProps) {
  const tool        = getToolById(toolId)!;
  const state       = useToolState(tool);
  const isFormatter = tool.category === "formatters";
  const isGenerator = tool.mode === "generate";

  // ── Keyboard shortcut (Ctrl/Cmd + Enter still works as manual trigger) ──
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        state.execute();
      }
    },
    [state],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ── Auto-execute on input/indentSize change (debounced) ────────────────
  useEffect(() => {
    if (isGenerator || !state.input.trim()) return;
    const id = setTimeout(() => state.execute(), 600);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.input, state.indentSize, isGenerator]);

  // ── Auto-execute for generators with no input ──────────────────────────
  useEffect(() => {
    if (isGenerator && !tool.sampleInput && !state.output) {
      state.execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Toast on error (success is silent — the output updating is feedback) ─
  const prevResult = useRef<ToolResult | null>(null);
  useEffect(() => {
    if (!state.result || state.result === prevResult.current) return;
    prevResult.current = state.result;
    if (!state.result.success) {
      toast.error(state.result.error ?? "Something went wrong", {
        duration: 5000,
      });
    }
  }, [state.result]);

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-fg-primary">{tool.name}</h1>
          <p className="text-sm text-fg-muted">{tool.description}</p>
        </div>
      </div>

      {/* Action Bar — no execute button, just helpers */}
      <div className="flex flex-wrap items-center gap-3">
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
      </div>

      {/* Editor Panels */}
      {isGenerator ? (
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
