"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { toolRegistry, categoryLabels, type ToolCategory } from "@/lib/tools/registry";
import type { ToolDefinition } from "@/lib/tools/types";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function fuzzyMatch(text: string, query: string): boolean {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  return lower.includes(q);
}

function searchTools(query: string): ToolDefinition[] {
  if (!query.trim()) return toolRegistry;
  const q = query.toLowerCase().trim();
  return toolRegistry.filter(
    (tool) =>
      fuzzyMatch(tool.name, q) ||
      fuzzyMatch(tool.description, q) ||
      fuzzyMatch(tool.category, q) ||
      tool.keywords.some((k) => fuzzyMatch(k, q))
  );
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent/20 text-fg-primary rounded-sm">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = searchTools(query);

  // Group results by category
  const grouped = results.reduce<Record<ToolCategory, ToolDefinition[]>>((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<ToolCategory, ToolDefinition[]>);

  // Flat list for keyboard navigation
  const flatResults = results;

  // Cmd+K global shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          // Parent will open via state
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-search-item]");
    items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleSelect = useCallback(
    (tool: ToolDefinition) => {
      onClose();
      router.push(tool.route);
    },
    [onClose, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatResults[selectedIndex]) {
        e.preventDefault();
        handleSelect(flatResults[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [flatResults, selectedIndex, handleSelect, onClose]
  );

  if (!open) return null;

  let itemIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50" />
      <div
        className="relative w-full max-w-lg rounded-xl border border-border bg-bg-primary shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-fg-muted flex-shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tools..."
            className="flex-1 py-3 bg-transparent text-sm text-fg-primary placeholder-fg-muted outline-none"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] font-mono text-fg-muted">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
          {flatResults.length === 0 ? (
            <div className="py-8 text-center text-sm text-fg-muted">
              No tools found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            (Object.keys(grouped) as ToolCategory[]).map((category) => (
              <div key={category}>
                <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
                  {categoryLabels[category]}
                </div>
                {grouped[category].map((tool) => {
                  itemIndex++;
                  const idx = itemIndex;
                  return (
                    <button
                      key={tool.id}
                      data-search-item
                      onClick={() => handleSelect(tool)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        selectedIndex === idx
                          ? "bg-accent text-white"
                          : "text-fg-primary hover:bg-bg-tertiary"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {selectedIndex === idx ? tool.name : highlightMatch(tool.name, query)}
                        </div>
                        <div className={`text-xs truncate ${selectedIndex === idx ? "text-white/70" : "text-fg-muted"}`}>
                          {tool.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[10px] text-fg-muted">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> select</span>
          <span><kbd className="font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
