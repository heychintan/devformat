"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Extension } from "@codemirror/state";
import CopyButton from "./CopyButton";
import { useTheme } from "@/lib/theme";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

interface EditorPanelProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: string;
}

function useLanguageExtension(language: string | undefined): Extension | null {
  const [ext, setExt] = useState<Extension | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      let extension: Extension | undefined;
      switch (language) {
        case "json": {
          const { json } = await import("@codemirror/lang-json");
          extension = json();
          break;
        }
        case "xml": {
          const { xml } = await import("@codemirror/lang-xml");
          extension = xml();
          break;
        }
        case "html": {
          const { html } = await import("@codemirror/lang-html");
          extension = html();
          break;
        }
        case "sql": {
          const { sql } = await import("@codemirror/lang-sql");
          extension = sql();
          break;
        }
      }
      if (!cancelled && extension) setExt(extension);
    }
    load();
    return () => { cancelled = true; };
  }, [language]);

  return ext;
}

export default function EditorPanel({ label, value, onChange, readOnly, language }: EditorPanelProps) {
  const { theme } = useTheme();
  const langExt = useLanguageExtension(language);

  const extensions: Extension[] = langExt ? [langExt] : [];

  return (
    <div className="flex flex-col flex-1 min-h-0 rounded-lg border border-editor-border bg-editor-bg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-editor-border bg-bg-tertiary">
        <span className="text-xs font-medium text-fg-secondary">{label}</span>
        <CopyButton text={value} />
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <CodeMirror
          value={value}
          onChange={readOnly ? undefined : onChange}
          readOnly={readOnly}
          theme={theme === "dark" ? "dark" : "light"}
          extensions={extensions}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: !readOnly,
          }}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
