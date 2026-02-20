"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toolRegistry, type ToolCategory, allCategories, categoryLabels } from "@/lib/tools/registry";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const categoryIcons: Record<ToolCategory, React.ReactNode> = {
  formatters: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  validators: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  encoders: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  escapers: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  generators: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  converters: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
};

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  const grouped = toolRegistry.reduce<Record<ToolCategory, typeof toolRegistry>>((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<ToolCategory, typeof toolRegistry>);

  const nav = (
    <nav className="flex flex-col h-full bg-sidebar-bg text-sidebar-fg">
      <div className={`flex items-center gap-2 h-14 border-b border-white/10 ${collapsed ? "justify-center px-2" : "px-4"}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        {!collapsed && <span className="font-semibold text-white text-sm">DevFormat</span>}
      </div>

      <div className={`flex-1 overflow-y-auto py-4 space-y-6 ${collapsed ? "px-1.5" : "px-3"}`}>
        {allCategories.filter((c) => grouped[c]).map((category) => (
          <div key={category}>
            <div className={`flex items-center gap-2 mb-2 text-xs font-medium uppercase tracking-wider text-sidebar-fg/60 ${collapsed ? "justify-center px-0" : "px-2"}`}>
              {categoryIcons[category]}
              {!collapsed && categoryLabels[category]}
            </div>
            <div className="space-y-0.5">
              {grouped[category].map((tool) => {
                const isActive = pathname === tool.route;
                return (
                  <Link
                    key={tool.id}
                    href={tool.route}
                    onClick={onClose}
                    title={collapsed ? tool.name : undefined}
                    className={`flex items-center gap-2 rounded-md text-sm transition-colors ${
                      collapsed ? "justify-center px-1 py-2" : "px-3 py-2"
                    } ${
                      isActive
                        ? "bg-sidebar-active text-white font-medium"
                        : "hover:bg-sidebar-hover text-sidebar-fg hover:text-white"
                    }`}
                  >
                    {collapsed ? (
                      <span className="text-xs font-medium w-6 text-center">
                        {tool.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                    ) : (
                      tool.name
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Collapse toggle — desktop only */}
      <button
        onClick={onToggleCollapse}
        className="hidden lg:flex items-center justify-center h-10 border-t border-white/10 hover:bg-sidebar-hover text-sidebar-fg hover:text-white transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
        >
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>
      </button>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block flex-shrink-0 h-screen sticky top-0 transition-all duration-200 ${
          collapsed ? "w-14" : "w-60"
        }`}
      >
        {nav}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 w-60 z-50 lg:hidden">
            {nav}
          </aside>
        </>
      )}
    </>
  );
}
