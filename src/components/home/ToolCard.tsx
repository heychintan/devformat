import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools/types";

interface ToolCardProps {
  tool: ToolDefinition;
}

const categoryColors: Record<string, string> = {
  formatters: "bg-accent/10 text-accent",
  validators: "bg-success/10 text-success",
  encoders: "bg-cat-encoders-bg text-cat-encoders",
  escapers: "bg-cat-escapers-bg text-cat-escapers",
  generators: "bg-cat-generators-bg text-cat-generators",
  converters: "bg-cat-converters-bg text-cat-converters",
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.route}
      className="group flex flex-col rounded-lg border border-border bg-bg-primary p-5 transition-all hover:border-accent hover:shadow-md"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${categoryColors[tool.category] || ""}`}>
          {tool.category.slice(0, -1)}
        </span>
        <span className="text-xs font-mono text-fg-muted uppercase">{tool.language}</span>
      </div>
      <h3 className="text-sm font-semibold text-fg-primary group-hover:text-accent transition-colors">
        {tool.name}
      </h3>
      <p className="mt-1.5 text-xs text-fg-muted leading-relaxed">
        {tool.description}
      </p>
    </Link>
  );
}
