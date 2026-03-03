"use client";

import dynamic from "next/dynamic";
import type { Monaco } from "@monaco-editor/react";
import CopyButton from "./CopyButton";
import { useTheme } from "@/lib/theme";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// Map tool language IDs → Monaco language IDs
const LANG_MAP: Record<string, string> = {
  json:      "json",
  xml:       "xml",
  html:      "html",
  sql:       "sql",
  yaml:      "yaml",
  css:       "css",
  text:      "plaintext",
};

// Define custom themes once per Monaco instance
function defineThemes(monaco: Monaco) {
  monaco.editor.defineTheme("app-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background":                  "#1e1e2e",
      "editor.foreground":                  "#cdd6f4",
      "editorLineNumber.foreground":        "#585b70",
      "editorLineNumber.activeForeground":  "#cdd6f4",
      "editor.selectionBackground":         "#313244",
      "editor.inactiveSelectionBackground": "#31324488",
      "editor.lineHighlightBackground":     "#252538",
      "editorCursor.foreground":            "#f5c2e7",
      "editorGutter.background":            "#181825",
      "editorIndentGuide.background1":      "#313244",
      "editorIndentGuide.activeBackground1":"#6c7086",
      "editorBracketMatch.background":      "#45475a88",
      "editorBracketMatch.border":          "#89b4fa",
      "editorWidget.background":            "#1e1e2e",
      "editorWidget.border":                "#313244",
      "input.background":                   "#313244",
      "input.foreground":                   "#cdd6f4",
      "input.border":                       "#45475a",
      "inputOption.activeBorder":           "#89b4fa",
      "focusBorder":                        "#89b4fa",
      "editorFindMatch.background":         "#f9e2af55",
      "editorFindMatchHighlight.background":"#f9e2af28",
      "editorFindMatchBorder":              "#f9e2afaa",
      "scrollbarSlider.background":         "#45475a55",
      "scrollbarSlider.hoverBackground":    "#585b7099",
      "scrollbarSlider.activeBackground":   "#6c708699",
    },
  });

  monaco.editor.defineTheme("app-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background":                  "#f6f8fa",
      "editor.foreground":                  "#1f2328",
      "editorLineNumber.foreground":        "#9ea3a8",
      "editorLineNumber.activeForeground":  "#1f2328",
      "editor.selectionBackground":         "#b6d6fd",
      "editor.inactiveSelectionBackground": "#b6d6fd88",
      "editor.lineHighlightBackground":     "#eaeef2",
      "editorCursor.foreground":            "#0969da",
      "editorGutter.background":            "#f0f2f4",
      "editorIndentGuide.background1":      "#d0d7de",
      "editorIndentGuide.activeBackground1":"#8c959f",
      "editorBracketMatch.background":      "#b6d6fd88",
      "editorBracketMatch.border":          "#0969da",
      "editorWidget.background":            "#ffffff",
      "editorWidget.border":                "#d0d7de",
      "input.background":                   "#ffffff",
      "input.foreground":                   "#1f2328",
      "input.border":                       "#d0d7de",
      "inputOption.activeBorder":           "#0969da",
      "focusBorder":                        "#0969da",
      "editorFindMatch.background":         "#ffd60066",
      "editorFindMatchHighlight.background":"#ffd60033",
      "editorFindMatchBorder":              "#c8a000aa",
      "scrollbarSlider.background":         "#8c959f44",
      "scrollbarSlider.hoverBackground":    "#8c959f88",
      "scrollbarSlider.activeBackground":   "#8c959faa",
    },
  });
}

interface EditorPanelProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: string;
}

export default function EditorPanel({
  label,
  value,
  onChange,
  readOnly,
  language,
}: EditorPanelProps) {
  const { theme } = useTheme();
  const monacoTheme = theme === "dark" ? "app-dark" : "app-light";
  const monacoLang  = LANG_MAP[language ?? ""] ?? "plaintext";

  return (
    <div className="flex flex-col flex-1 min-h-0 rounded-lg border border-editor-border overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-editor-border bg-bg-tertiary flex-shrink-0">
        <span className="text-xs font-medium text-fg-secondary">{label}</span>
        <CopyButton text={value} />
      </div>

      {/* Monaco editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language={monacoLang}
          value={value}
          theme={monacoTheme}
          onChange={readOnly ? undefined : (v) => onChange?.(v ?? "")}
          beforeMount={defineThemes}
          options={{
            readOnly,
            minimap:              { enabled: false },
            fontSize:             14,
            lineHeight:           22,
            fontFamily:           "var(--font-geist-mono), 'Geist Mono', monospace",
            scrollBeyondLastLine: false,
            wordWrap:             "off",
            automaticLayout:      true,
            padding:              { top: 10, bottom: 10 },
            renderLineHighlight:  readOnly ? "none" : "line",
            cursorBlinking:       "smooth",
            smoothScrolling:      true,
            contextmenu:          true,
            // IDE indent + bracket features
            guides: {
              bracketPairs:  "active",
              indentation:   true,
            },
            bracketPairColorization: { enabled: true },
            // Built-in find widget (Ctrl+F / Ctrl+H)
            find: {
              addExtraSpaceOnTop: false,
              seedSearchStringFromSelection: "selection",
            },
            folding:                    true,
            foldingHighlight:           true,
            showFoldingControls:        "mouseover",
            renderWhitespace:           "none",
            occurrencesHighlight:       "singleFile",
            selectionHighlight:         true,
            links:                      true,
            colorDecorators:            true,
            scrollbar: {
              verticalScrollbarSize:   8,
              horizontalScrollbarSize: 8,
              useShadows:              false,
            },
          }}
        />
      </div>
    </div>
  );
}
