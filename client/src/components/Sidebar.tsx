/*
 * LobeHub-style left sidebar category navigation
 * Sticky, scrollable, with icons and counts
 */
import { Grid3X3, Code, FileText, Database, Layers, Filter, Building, Workflow, Package } from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon: string;
  count: string;
}

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  grid: <Grid3X3 className="w-4 h-4" />,
  nodejs: <Package className="w-4 h-4" />,
  python: <Code className="w-4 h-4" />,
  typescript: <Code className="w-4 h-4" />,
  rust: <Code className="w-4 h-4" />,
  go: <Code className="w-4 h-4" />,
  file: <FileText className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  filter: <Filter className="w-4 h-4" />,
  layers: <Layers className="w-4 h-4" />,
  workflow: <Workflow className="w-4 h-4" />,
  building: <Building className="w-4 h-4" />,
};

export default function Sidebar({ categories, activeCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside className="w-52 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <nav className="space-y-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`sidebar-item w-full text-left ${activeCategory === cat.id ? "active" : ""}`}
            >
              <span className="opacity-60">{iconMap[cat.icon] || <Grid3X3 className="w-4 h-4" />}</span>
              <span className="flex-grow truncate">{cat.label}</span>
              <span className="text-[11px] text-gray-400 tabular-nums">{cat.count}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
