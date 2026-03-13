/*
 * MinerU 开发者生态与集成 — 主页面
 * 左侧固定导航 + 右侧内容滚动
 * 三大模块：Agent Skills / RAG 框架 / 应用与工作流
 */
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  agentSkills,
  ragFrameworks,
  appWorkflows,
  codeExamples,
  faqCategories,
  type SkillItem,
  type RAGItem,
  type AppItem,
} from "@/data/ecosystem";
import {
  Bot,
  Wrench,
  LayoutGrid,
  Search,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  ChevronDown,
  Code2,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

/* ─── Sidebar Modules ─── */
const modules = [
  { id: "skills", label: "Agent Skills", icon: Bot, count: agentSkills.length },
  { id: "rag", label: "RAG 框架", icon: Wrench, count: ragFrameworks.length },
  { id: "apps", label: "应用与工作流", icon: LayoutGrid, count: appWorkflows.length },
] as const;

type ModuleId = (typeof modules)[number]["id"];

/* ─── Copy Helper ─── */
function useCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("已复制到剪贴板");
    setTimeout(() => setCopiedId(null), 2000);
  };
  return { copiedId, copy };
}

/* ─── Logo Component ─── */
function LogoIcon({ src, fallback, name, size = 40 }: { src: string; fallback?: string; name: string; size?: number }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    return (
      <div
        className="rounded-xl flex items-center justify-center font-bold text-white shrink-0"
        style={{ width: size, height: size, backgroundColor: fallback || "#6B7280", fontSize: size * 0.35 }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="rounded-xl shrink-0 object-contain bg-white"
      onError={() => setError(true)}
    />
  );
}

/* ─── CopyButton ─── */
function CopyButton({ text, id, copiedId, onCopy, size = "sm" }: {
  text: string; id: string; copiedId: string | null; onCopy: (text: string, id: string) => void; size?: "sm" | "md";
}) {
  const isCopied = copiedId === id;
  const cls = size === "sm"
    ? "p-1.5 rounded-md hover:bg-gray-100"
    : "p-2 rounded-lg hover:bg-white/10";
  return (
    <button onClick={() => onCopy(text, id)} className={`${cls} text-gray-400 hover:text-gray-600 transition-colors`} title="复制">
      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   Module 1: Agent Skills
   ═══════════════════════════════════════════════════════ */

/* ─── Skill Card ─── */
function SkillCard({ item, copiedId, onCopy }: { item: SkillItem; copiedId: string | null; onCopy: (t: string, id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white border border-gray-200/80 rounded-2xl p-5 hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-start gap-3.5 mb-3">
        <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[15px] font-semibold text-gray-900 truncate">{item.name}</h3>
            <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              官方支持
            </span>
          </div>
          {item.registry && (
            <p className="text-[11px] text-gray-400 mb-1">{item.registry}</p>
          )}
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
        </div>
      </div>

      {/* Badges */}
      {item.badges && item.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.badges.map((b) => (
            <span key={b} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
              ✅ {b}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Install command */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2">
          <Terminal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <code className="text-[12px] font-mono text-gray-300 flex-1 truncate">{item.installCmd}</code>
          <CopyButton text={item.installCmd} id={`install-${item.id}`} copiedId={copiedId} onCopy={onCopy} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Code Showcase ─── */
function CodeShowcase({ copiedId, onCopy }: { copiedId: string | null; onCopy: (t: string, id: string) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const example = codeExamples[activeTab];

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-bold text-gray-900">只需几行代码，让您的 Agent 读懂世界</h2>
      </div>

      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
        {/* Tab bar */}
        <div className="flex items-center border-b border-gray-700/50 px-4">
          {codeExamples.map((ex, i) => (
            <button
              key={ex.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-all ${
                i === activeTab
                  ? "border-cyan-400 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {ex.label}
            </button>
          ))}
          <div className="ml-auto">
            <CopyButton text={example.code} id={`code-${activeTab}`} copiedId={copiedId} onCopy={onCopy} size="md" />
          </div>
        </div>

        {/* Code content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <pre className="p-5 overflow-x-auto">
              <code className="text-[13px] font-mono text-gray-300 leading-relaxed whitespace-pre">
                {example.code}
              </code>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ─── */
function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-bold text-gray-900">开发者 FAQ</h2>
      </div>

      <div className="space-y-6">
        {faqCategories.map((cat) => (
          <div key={cat.title}>
            <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {cat.title}
            </h3>
            <div className="space-y-2">
              {cat.items.map((faq) => {
                const key = `${cat.title}-${faq.q}`;
                const isOpen = openItems.has(key);
                return (
                  <div
                    key={key}
                    className="border border-gray-200/80 rounded-xl bg-white overflow-hidden hover:border-gray-300 transition-colors"
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    >
                      <span className="text-[14px] font-medium text-gray-800 leading-snug">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 text-[13px] text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Module 2: RAG 框架
   ═══════════════════════════════════════════════════════ */
function RAGCard({ item, copiedId, onCopy }: { item: RAGItem; copiedId: string | null; onCopy: (t: string, id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white border border-gray-200/80 rounded-2xl p-5 hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-start gap-3.5 mb-3">
        <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">{item.description}</p>
        </div>
      </div>

      {/* Code snippet */}
      {item.code && (
        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2">
            <Terminal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <code className="text-[11px] font-mono text-gray-300 flex-1 truncate">{item.code}</code>
            <CopyButton text={item.code} id={`rag-${item.id}`} copiedId={copiedId} onCopy={onCopy} />
          </div>
        </div>
      )}

      {/* Guide button */}
      {item.guideLabel && item.guideUrl && (
        <div className={`${item.code ? "mt-3" : "mt-auto pt-3"}`}>
          <a
            href={item.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {item.guideLabel}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Module 3: 应用与工作流
   ═══════════════════════════════════════════════════════ */
function AppCard({ item }: { item: AppItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white border border-gray-200/80 rounded-2xl p-5 hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-start gap-3.5 mb-3">
        <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
        </div>
      </div>

      {/* Links */}
      <div className="mt-auto pt-3 space-y-2">
        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200/60 transition-colors"
              >
                {link.label}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        )}
        <a
          href={item.guideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          查看使用指引
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleId>("skills");
  const [searchQuery, setSearchQuery] = useState("");
  const { copiedId, copy } = useCopy();
  const contentRef = useRef<HTMLDivElement>(null);

  // Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Filter items based on search
  const filteredSkills = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return agentSkills;
    return agentSkills.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredRAG = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ragFrameworks;
    return ragFrameworks.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredApps = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return appWorkflows;
    return appWorkflows.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }, [searchQuery]);

  const moduleInfo: Record<ModuleId, { title: string; subtitle: string }> = {
    skills: {
      title: "Agent Skills 技能中心",
      subtitle: "MinerU 官方支持的 5 大 Agent 框架解析技能，覆盖 Node.js / Python / TypeScript / Rust / Go 全语言生态。",
    },
    rag: {
      title: "RAG 框架集成",
      subtitle: "深度适配主流 RAG 与数据编排框架，在最前置的数据清洗阶段完成高保真文本转换。",
    },
    apps: {
      title: "应用与工作流",
      subtitle: "与知名平台深度集成，通过插件、节点或内置引擎的方式，让 MinerU 融入您的生产力工具链。",
    },
  };

  const info = moduleInfo[activeModule];

  const switchModule = (id: ModuleId) => {
    setActiveModule(id);
    setSearchQuery("");
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />

      <div className="flex-grow pt-16">
        <div className="flex h-[calc(100vh-64px)]">
          {/* ─── Left Sidebar ─── */}
          <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r border-gray-200/70 bg-white">
            <div className="p-4 flex-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                生态模块
              </p>
              <nav className="flex flex-col gap-0.5">
                {modules.map((mod) => {
                  const Icon = mod.icon;
                  const isActive = activeModule === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => switchModule(mod.id)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 text-left ${
                        isActive
                          ? "bg-gray-900 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{mod.label}</span>
                      <span className={`ml-auto text-[11px] font-semibold ${isActive ? "text-gray-300" : "text-gray-400"}`}>
                        {mod.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar bottom */}
            <div className="p-4 border-t border-gray-100">
              <a
                href="https://github.com/opendatalab/MinerU"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a
                href="https://mineru.net/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                API 文档
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </div>
          </aside>

          {/* ─── Right Content ─── */}
          <main ref={contentRef} className="flex-1 min-w-0 overflow-y-auto">
            {/* Mobile module switcher */}
            <div className="md:hidden flex items-center gap-1 p-3 border-b border-gray-200 bg-white overflow-x-auto sticky top-0 z-10">
              {modules.map((mod) => {
                const Icon = mod.icon;
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => switchModule(mod.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                      isActive ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {mod.label}
                  </button>
                );
              })}
            </div>

            {/* Content area */}
            <div className="p-6 lg:p-8 max-w-6xl">
              {/* Header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                    {info.title}
                  </h1>
                  <p className="text-[14px] text-gray-500 leading-relaxed max-w-2xl">
                    {info.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Search bar */}
              <div className="relative mb-6 max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索名称、描述或关键词..."
                  className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                />
                <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 font-mono">
                  Ctrl K
                </kbd>
              </div>

              {/* ─── Agent Skills Content ─── */}
              {activeModule === "skills" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  {/* Cards grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((item) => (
                        <SkillCard key={item.id} item={item} copiedId={copiedId} onCopy={copy} />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>

                  {/* Code showcase */}
                  {!searchQuery && <CodeShowcase copiedId={copiedId} onCopy={copy} />}

                  {/* FAQ */}
                  {!searchQuery && <FAQSection />}
                </motion.div>
              )}

              {/* ─── RAG Content ─── */}
              {activeModule === "rag" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredRAG.length > 0 ? (
                      filteredRAG.map((item) => (
                        <RAGCard key={item.id} item={item} copiedId={copiedId} onCopy={copy} />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </motion.div>
              )}

              {/* ─── Apps Content ─── */}
              {activeModule === "apps" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredApps.length > 0 ? (
                      filteredApps.map((item) => (
                        <AppCard key={item.id} item={item} />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <div className="col-span-full py-20 text-center">
      <Search className="w-10 h-10 mx-auto text-gray-300 mb-3" />
      <p className="text-sm text-gray-400">未找到匹配的结果，请尝试其他关键词。</p>
    </div>
  );
}

/* ─── Agent/Developer Prompt Card ─── */
function PromptCard({ copiedId, onCopy }: { copiedId: string | null; onCopy: (t: string, id: string) => void }) {
  const [mode, setMode] = useState<"agent" | "human">("agent");

  const prompts = {
    agent: "Read https://mineru.net/ecosystem/skills.txt and install the MinerU parse skill for document extraction.",
    human: "pip install mineru-parse-py",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="mt-8 max-w-lg"
    >
      <div className="border border-gray-200 rounded-2xl p-5 bg-white">
        {/* Toggle */}
        <div className="flex items-center gap-1 mb-4 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setMode("agent")}
            className={`flex items-center gap-1.5 flex-1 justify-center py-2 rounded-lg text-[13px] font-medium transition-all ${
              mode === "agent" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> 我是 Agent
          </button>
          <button
            onClick={() => setMode("human")}
            className={`flex items-center gap-1.5 flex-1 justify-center py-2 rounded-lg text-[13px] font-medium transition-all ${
              mode === "human" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            我是开发者
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-xl border border-gray-200/80 p-4">
          <p className="text-[12px] text-gray-500 mb-2 font-medium">
            {mode === "agent" ? "将此 prompt 发送给您的 Agent：" : "快速开始："}
          </p>
          <div className="relative">
            <code className="block bg-white rounded-lg p-3 text-[12px] font-mono text-gray-700 leading-relaxed border border-gray-100">
              {prompts[mode]}
            </code>
            <div className="absolute top-2 right-2">
              <CopyButton text={prompts[mode]} id={`prompt-${mode}`} copiedId={copiedId} onCopy={onCopy} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
