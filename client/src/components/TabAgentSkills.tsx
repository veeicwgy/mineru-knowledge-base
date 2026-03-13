/*
 * Tab 1: Agent Skills 技能中心
 * LobeHub-style: Left sidebar categories + Right card grid
 * Sections: Featured / All Skills / Code Example / FAQ
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ChevronDown, ChevronRight, Zap, Settings, Globe } from "lucide-react";
import Sidebar from "./Sidebar";
import SkillCard from "./SkillCard";
import { skills, skillCategories, codeExamples, faqs } from "@/data/ecosystem";

/* ─── Features ─── */
const features = [
  { icon: <Zap className="w-4 h-4" />, color: "text-amber-600 bg-amber-50", title: "标准生态分发", desc: "支持 ClawHub、PyPI 等市场，搜索-安装-使用无缝即插即用。" },
  { icon: <Settings className="w-4 h-4" />, color: "text-blue-600 bg-blue-50", title: "双模智能切换", desc: "内置 fast 与 precise 参数。一键在极速提取与高保真图表/公式还原间切换。" },
  { icon: <Globe className="w-4 h-4" />, color: "text-emerald-600 bg-emerald-50", title: "边缘与多语言", desc: "覆盖 Node.js、Python、Go 甚至 Rust，统一 OpenAPI 维护。" },
];

/* ─── FAQ Item ─── */
function FAQItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 transition-colors">
        <span className="text-[13px] font-semibold text-gray-900 pr-4">{item.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 text-[13px] text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */
export default function TabAgentSkills({ searchQuery }: { searchQuery: string }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [codeTab, setCodeTab] = useState(0);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(codeExamples[codeTab].code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const filteredSkills = skills.filter((s) => {
    const matchCategory = activeCategory === "all" || s.category === activeCategory;
    const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-white">
      <div className="container py-6">
        <div className="flex gap-6">
          {/* Left sidebar */}
          <Sidebar categories={skillCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {/* Right content */}
          <div className="flex-grow min-w-0">
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-2.5 p-3.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-all"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${f.color}`}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-gray-900 mb-0.5">{f.title}</h3>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills grid */}
            <div className="section-header">
              <h3>
                {activeCategory === "all" ? "全部 Agent Skills" : skillCategories.find(c => c.id === activeCategory)?.label}
                <span className="text-gray-400 font-normal ml-2">{filteredSkills.length}</span>
              </h3>
              <a href="#" className="flex items-center gap-1">
                查看全部 <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {filteredSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    layout
                  >
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 text-sm">
                未找到匹配的 Skill
              </div>
            )}

            {/* Code showcase */}
            <div className="mb-10">
              <div className="section-header">
                <h3>只需几行代码，让您的 Agent 读懂世界</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                {/* Terminal header */}
                <div className="bg-gray-900 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex gap-0.5 ml-3">
                      {codeExamples.map((tab, i) => (
                        <button
                          key={tab.id}
                          onClick={() => setCodeTab(i)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                            codeTab === i ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleCopyCode} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-white transition-colors">
                    {codeCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {codeCopied ? "已复制" : "复制"}
                  </button>
                </div>
                {/* Code body */}
                <div className="bg-[#0d1117] p-4 overflow-x-auto">
                  <pre className="text-[12px] font-mono leading-6 text-gray-300" style={{ fontFamily: "var(--font-mono)" }}>
                    <code>{codeExamples[codeTab].code}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="section-header">
                <h3>开发者常见问题</h3>
              </div>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} item={faq} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
