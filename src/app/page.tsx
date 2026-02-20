import ToolCard from "@/components/home/ToolCard";
import { getToolsByCategory, allCategories, categoryLabels } from "@/lib/tools/registry";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-fg-primary mb-3">
          Free Online Developer Tools
        </h1>
        <p className="text-fg-secondary max-w-xl mx-auto">
          Format, validate, encode, escape, generate, and convert — all in your browser.
          No ads, no tracking, completely free.
        </p>
      </div>

      {/* Tool categories */}
      {allCategories.map((category) => {
        const tools = getToolsByCategory(category);
        if (tools.length === 0) return null;
        return (
          <section key={category} className="mb-10">
            <h2 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-4">
              {categoryLabels[category]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
