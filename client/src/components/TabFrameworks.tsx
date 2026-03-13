/*
 * Tab 2: 核心数据编排框架 (Code-first Frameworks)
 * LobeHub-style: Left sidebar + Right framework cards
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, ChevronRight } from "lucide-react";
import Sidebar from "./Sidebar";
import { frameworks, frameworkCategories } from "@/data/ecosystem";

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors text-gray-500 hover:text-gray-300">
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

const roleColors: Record<string, string> = {
  "Document Loader": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "PDF Reader": "bg-violet-50 text-violet-700 border-violet-100",
  "Data Source": "bg-blue-50 text-blue-700 border-blue-100",
  "Text Preprocessor": "bg-amber-50 text-amber-700 border-amber-100",
  "Converter Component": "bg-rose-50 text-rose-700 border-rose-100",
};

const nameInitials: Record<string, string> = {
  LangChain: "LC",
  LlamaIndex: "LI",
  DSPy: "DS",
  LightRAG: "LR",
  "Haystack / LLMWare": "HS",
};

export default function TabFrameworks({ searchQuery }: { searchQuery: string }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = frameworks.filter((fw) => {
    const matchCat = activeCategory === "all" || fw.category === activeCategory;
    const matchSearch = !searchQuery || fw.name.toLowerCase().includes(searchQuery.toLowerCase()) || fw.description.includes(searchQuery);
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white">
      <div className="container py-6">
        <div className="flex gap-6">
          {/* Left sidebar */}
          <Sidebar categories={frameworkCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {/* Right content */}
          <div className="flex-grow min-w-0">
            {/* Intro */}
            <div className="mb-8 max-w-2xl">
              <h2 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                攻克 RAG 切片难题的底层预处理基建
              </h2>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                作为核心的 Document Loader，为您的向量数据库提供具备完美 Markdown 层级（H1/H2）、标准 LaTeX 公式与纯净表格的优质上下文。
              </p>
            </div>

            {/* Section header */}
            <div className="section-header">
              <h3>
                {activeCategory === "all" ? "全部框架" : frameworkCategories.find(c => c.id === activeCategory)?.label}
                <span className="text-gray-400 font-normal ml-2">{filtered.length}</span>
              </h3>
              <a href="#" className="flex items-center gap-1">
                查看全部 <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Framework cards */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((fw, i) => (
                  <motion.div
                    key={fw.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="skill-card"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${roleColors[fw.role] || "bg-gray-50 text-gray-700"} border`}>
                        {nameInitials[fw.name] || fw.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                          {fw.name}
                        </h4>
                        <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full border mt-0.5 ${roleColors[fw.role] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                          {fw.role}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-3 line-clamp-3">{fw.description}</p>

                    {/* Code block */}
                    {fw.code && (
                      <div className="code-block px-3 py-2 flex items-center gap-2 mb-3">
                        <code className="text-[11px] text-gray-300 flex-grow overflow-x-auto whitespace-nowrap">
                          {fw.code}
                        </code>
                        <CopyBtn text={fw.code} />
                      </div>
                    )}

                    {/* Link */}
                    {fw.link && (
                      <a href={fw.link} className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors mt-auto">
                        {fw.linkText} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 text-sm">
                未找到匹配的框架
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
