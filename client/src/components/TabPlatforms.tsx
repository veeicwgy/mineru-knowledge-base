/*
 * Tab 3: 平台、应用与自动化 (Platforms & Workflows)
 * LobeHub-style: Left sidebar + Right platform cards
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import Sidebar from "./Sidebar";
import { platforms, platformCategories } from "@/data/ecosystem";

const nameColors: Record<string, string> = {
  Dify: "bg-blue-50 text-blue-700",
  RAGFlow: "bg-purple-50 text-purple-700",
  Flowise: "bg-cyan-50 text-cyan-700",
  FastGPT: "bg-indigo-50 text-indigo-700",
  Coze: "bg-violet-50 text-violet-700",
  n8n: "bg-orange-50 text-orange-700",
  "钉钉 (DingTalk)": "bg-sky-50 text-sky-700",
  "Cherry Studio": "bg-rose-50 text-rose-700",
  "和鲸科学平台": "bg-teal-50 text-teal-700",
  Sider: "bg-amber-50 text-amber-700",
};

const nameInitials: Record<string, string> = {
  Dify: "Di",
  RAGFlow: "RF",
  Flowise: "Fl",
  FastGPT: "FG",
  Coze: "Cz",
  n8n: "n8",
  "钉钉 (DingTalk)": "钉",
  "Cherry Studio": "CS",
  "和鲸科学平台": "鲸",
  Sider: "Si",
};

export default function TabPlatforms({ searchQuery }: { searchQuery: string }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = platforms.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.includes(searchQuery);
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white">
      <div className="container py-6">
        <div className="flex gap-6">
          {/* Left sidebar */}
          <Sidebar categories={platformCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {/* Right content */}
          <div className="flex-grow min-w-0">
            {/* Intro */}
            <div className="mb-8 max-w-2xl">
              <h2 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                无需编写代码，即刻释放文档价值
              </h2>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                以官方插件、内置引擎和专属节点的形式，无缝嵌入主流的知识库平台与自动化工作流。
              </p>
            </div>

            {/* Section header */}
            <div className="section-header">
              <h3>
                {activeCategory === "all" ? "全部平台" : platformCategories.find(c => c.id === activeCategory)?.label}
                <span className="text-gray-400 font-normal ml-2">{filtered.length}</span>
              </h3>
              <a href="#" className="flex items-center gap-1">
                查看全部 <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Platform cards */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="skill-card"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${nameColors[item.name] || "bg-gray-50 text-gray-700"}`}>
                        {nameInitials[item.name] || item.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                          {item.comingSoon && (
                            <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                              即将推出
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{item.subcategory}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-3 line-clamp-3">{item.description}</p>

                    {/* Links */}
                    {item.links && item.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-auto pt-2 border-t border-gray-50">
                        {item.links.map((link, li) => (
                          <a
                            key={li}
                            href={link.url}
                            className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 text-sm">
                未找到匹配的平台
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
