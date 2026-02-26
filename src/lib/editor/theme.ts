import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import type { Extension } from "@codemirror/state";

// ── Dark theme ─────────────────────────────────────────────────────────────
// Catppuccin Mocha palette — matches the app's blue/purple dark mode

const darkSyntax = HighlightStyle.define([
  { tag: t.keyword,                     color: "#cba6f7" },               // mauve
  { tag: [t.operator, t.operatorKeyword], color: "#89dceb" },             // sky
  { tag: t.number,                      color: "#fab387" },               // peach
  { tag: [t.string, t.regexp],          color: "#a6e3a1" },               // green
  { tag: t.comment,                     color: "#6c7086", fontStyle: "italic" }, // overlay1
  { tag: t.punctuation,                 color: "#9399b2" },               // overlay2
  { tag: [t.bracket, t.paren],          color: "#cdd6f4" },               // text
  // XML / HTML
  { tag: t.tagName,                     color: "#89b4fa" },               // blue
  { tag: t.angleBracket,                color: "#9399b2" },               // overlay2
  { tag: t.attributeName,               color: "#74c7ec" },               // sapphire
  { tag: t.attributeValue,              color: "#a6e3a1" },               // green
  // JSON / Object
  { tag: t.propertyName,                color: "#89dceb" },               // sky
  { tag: t.bool,                        color: "#fab387" },               // peach
  { tag: t.null,                        color: "#f38ba8" },               // red
  // General identifiers
  { tag: t.variableName,                color: "#cdd6f4" },               // text
  { tag: t.definition(t.variableName),  color: "#cdd6f4" },
  { tag: t.function(t.variableName),    color: "#89b4fa" },               // blue
  { tag: [t.typeName, t.className],     color: "#f9e2af" },               // yellow
  { tag: t.meta,                        color: "#f9e2af" },
  { tag: t.invalid,                     color: "#f38ba8", textDecoration: "underline wavy" },
]);

const darkBase = EditorView.theme(
  {
    "&": { backgroundColor: "#1e1e2e", color: "#cdd6f4" },
    ".cm-content": { caretColor: "#f5c2e7" },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#f5c2e7",
      borderLeftWidth: "2px",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#313244",
    },
    ".cm-selectionBackground": { backgroundColor: "#313244 !important" },
    ".cm-activeLine": { backgroundColor: "rgba(49,50,68,0.45)" },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(49,50,68,0.45)",
      color: "#cdd6f4",
    },
    ".cm-gutters": {
      backgroundColor: "#181825",
      color: "#585b70",
      borderRight: "1px solid #313244",
    },
    ".cm-lineNumbers .cm-gutterElement": { padding: "0 8px 0 4px" },
    ".cm-foldGutter .cm-gutterElement": { padding: "0 4px" },
    ".cm-foldPlaceholder": {
      backgroundColor: "#45475a",
      border: "none",
      color: "#cba6f7",
      borderRadius: "3px",
      padding: "0 4px",
    },
    // Indent guide lines
    ".cm-indent-markers": { "--indent-marker-bg-part": "#313244" },
    ".cm-indent-markers::before": {
      borderLeft: "1px solid rgba(69,71,90,0.55)",
    },
    // Search / Replace panel
    ".cm-searchMatch": {
      backgroundColor: "rgba(249,226,175,0.15)",
      outline: "1px solid rgba(249,226,175,0.5)",
      borderRadius: "2px",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "rgba(249,226,175,0.35)",
      outline: "1px solid #f9e2af",
    },
    ".cm-panels": { backgroundColor: "#181825", color: "#cdd6f4" },
    ".cm-panels.cm-panels-bottom": { borderTop: "1px solid #313244" },
    ".cm-panels.cm-panels-top": { borderBottom: "1px solid #313244" },
    ".cm-search": {
      padding: "8px 10px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "6px",
    },
    ".cm-textfield": {
      backgroundColor: "#313244",
      color: "#cdd6f4",
      border: "1px solid #45475a",
      borderRadius: "5px",
      padding: "4px 8px",
      fontSize: "12px",
      outline: "none",
    },
    ".cm-textfield:focus": {
      borderColor: "#89b4fa",
      boxShadow: "0 0 0 2px rgba(137,180,250,0.2)",
    },
    ".cm-button": {
      backgroundImage: "none",
      backgroundColor: "#313244",
      color: "#cdd6f4",
      border: "1px solid #45475a",
      borderRadius: "5px",
      padding: "4px 10px",
      fontSize: "12px",
      cursor: "pointer",
    },
    ".cm-button:hover": { backgroundColor: "#45475a" },
    ".cm-search label": {
      fontSize: "12px",
      color: "#a6adc8",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    ".cm-tooltip": {
      backgroundColor: "#313244",
      border: "1px solid #45475a",
      borderRadius: "6px",
    },
    ".cm-tooltip-autocomplete ul li[aria-selected]": {
      backgroundColor: "#45475a",
    },
  },
  { dark: true },
);

// ── Light theme ────────────────────────────────────────────────────────────
// GitHub Light palette — clean, professional, readable

const lightSyntax = HighlightStyle.define([
  { tag: t.keyword,                     color: "#cf222e" },
  { tag: [t.operator, t.operatorKeyword], color: "#0550ae" },
  { tag: t.number,                      color: "#0550ae" },
  { tag: [t.string, t.regexp],          color: "#0a3069" },
  { tag: t.comment,                     color: "#6e7781", fontStyle: "italic" },
  { tag: t.punctuation,                 color: "#57606a" },
  { tag: [t.bracket, t.paren],          color: "#1f2328" },
  // XML / HTML
  { tag: t.tagName,                     color: "#116329" },
  { tag: t.angleBracket,                color: "#57606a" },
  { tag: t.attributeName,               color: "#953800" },
  { tag: t.attributeValue,              color: "#0a3069" },
  // JSON / Object
  { tag: t.propertyName,                color: "#953800" },
  { tag: t.bool,                        color: "#cf222e" },
  { tag: t.null,                        color: "#cf222e" },
  // General identifiers
  { tag: t.variableName,                color: "#1f2328" },
  { tag: t.definition(t.variableName),  color: "#0550ae" },
  { tag: t.function(t.variableName),    color: "#6639ba" },
  { tag: [t.typeName, t.className],     color: "#6639ba" },
  { tag: t.meta,                        color: "#6639ba" },
  { tag: t.invalid,                     color: "#cf222e", textDecoration: "underline wavy" },
]);

const lightBase = EditorView.theme({
  "&": { backgroundColor: "#f6f8fa", color: "#1f2328" },
  ".cm-content": { caretColor: "#0969da" },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#0969da",
    borderLeftWidth: "2px",
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#b6d6fd",
  },
  ".cm-selectionBackground": { backgroundColor: "#b6d6fd !important" },
  ".cm-activeLine": { backgroundColor: "rgba(234,238,242,0.6)" },
  ".cm-activeLineGutter": { backgroundColor: "#eaeef2", color: "#1f2328" },
  ".cm-gutters": {
    backgroundColor: "#f0f2f4",
    color: "#9ea3a8",
    borderRight: "1px solid #d0d7de",
  },
  ".cm-lineNumbers .cm-gutterElement": { padding: "0 8px 0 4px" },
  ".cm-foldGutter .cm-gutterElement": { padding: "0 4px" },
  ".cm-foldPlaceholder": {
    backgroundColor: "#e0e7ef",
    border: "none",
    color: "#4361ee",
    borderRadius: "3px",
    padding: "0 4px",
  },
  // Indent guide lines
  ".cm-indent-markers": { "--indent-marker-bg-part": "#d0d7de" },
  ".cm-indent-markers::before": {
    borderLeft: "1px solid rgba(200,207,216,0.7)",
  },
  // Search / Replace panel
  ".cm-searchMatch": {
    backgroundColor: "rgba(255,214,0,0.4)",
    outline: "1px solid rgba(200,160,0,0.5)",
    borderRadius: "2px",
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "rgba(255,140,0,0.4)",
    outline: "1px solid rgba(200,100,0,0.7)",
  },
  ".cm-panels": { backgroundColor: "#f0f2f4", color: "#1f2328" },
  ".cm-panels.cm-panels-bottom": { borderTop: "1px solid #d0d7de" },
  ".cm-panels.cm-panels-top": { borderBottom: "1px solid #d0d7de" },
  ".cm-search": {
    padding: "8px 10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "6px",
  },
  ".cm-textfield": {
    backgroundColor: "#ffffff",
    color: "#1f2328",
    border: "1px solid #d0d7de",
    borderRadius: "5px",
    padding: "4px 8px",
    fontSize: "12px",
    outline: "none",
  },
  ".cm-textfield:focus": {
    borderColor: "#0969da",
    boxShadow: "0 0 0 2px rgba(9,105,218,0.15)",
  },
  ".cm-button": {
    backgroundImage: "none",
    backgroundColor: "#f3f4f6",
    color: "#1f2328",
    border: "1px solid #d0d7de",
    borderRadius: "5px",
    padding: "4px 10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  ".cm-button:hover": { backgroundColor: "#e5e7eb" },
  ".cm-search label": {
    fontSize: "12px",
    color: "#57606a",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  ".cm-tooltip": {
    backgroundColor: "#ffffff",
    border: "1px solid #d0d7de",
    borderRadius: "6px",
  },
});

export function createEditorTheme(isDark: boolean): Extension[] {
  return isDark
    ? [darkBase, syntaxHighlighting(darkSyntax)]
    : [lightBase, syntaxHighlighting(lightSyntax)];
}
