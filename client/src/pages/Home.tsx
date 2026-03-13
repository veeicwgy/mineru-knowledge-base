/*
 * MinerU 生态与社区 — 主页面
 * 左侧边栏导航 + 右侧内容展示（SaaS 控制台风格）
 */
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  agentSkills,
  ragFrameworks,
  appWorkflows,
  type SkillItem,
  type RAGItem,
  type AppItem,
} from "@/data/ecosystem";
import { Bot, Wrench, LayoutGrid, Search, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

/* ─── Sidebar Modules ─── */
const modules = [
  { id: "skills", label: "Agent Skills", icon: Bot },
  { id: "rag", label: "RAG 框架", icon: Wrench },
  { id: "apps", label: "应用与工作流", icon: LayoutGrid },
] as const;

type ModuleId = (typeof modules)[number]["id"];

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

/* ─── Card Component ─── */
function EcoCard({ item, type }: { item: SkillItem | RAGItem | AppItem; type: ModuleId }) {
  const [copied, setCopied] = useState(false);
  const tags = "tags" in item ? (item as SkillItem).tags : undefined;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.name);
    setCopied(true);
    toast.success(`已复制 ${item.name}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white border border-gray-200/80 rounded-2xl p-5 hover:border-gray-300 hover:shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-200"
    >
      <div className="flex items-start gap-3.5">
        <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[15px] font-semibold text-gray-900 truncate">{item.name}</h3>
            {type === "skills" && (
              <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                官方
              </span>
            )}
          </div>
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover action */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
        title="复制名称"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleId>("skills");
  const [searchQuery, setSearchQuery] = useState("");

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
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filterFn = (item: { name: string; description: string }) =>
      !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);

    if (activeModule === "skills") return agentSkills.filter(filterFn);
    if (activeModule === "rag") return ragFrameworks.filter(filterFn);
    return appWorkflows.filter(filterFn);
  }, [activeModule, searchQuery]);

  const moduleInfo = {
    skills: {
      title: "Agent Skills 技能中心",
      subtitle: "MinerU 官方支持的 5 大 Agent 框架解析技能，覆盖 Node.js / Python / TypeScript / Rust / Go 全语言生态。",
      count: agentSkills.length,
    },
    rag: {
      title: "RAG 框架集成",
      subtitle: "深度适配主流 RAG 与数据编排框架，在最前置的数据清洗阶段完成高保真文本转换。",
      count: ragFrameworks.length,
    },
    apps: {
      title: "应用与工作流",
      subtitle: "与知名平台深度集成，通过插件、节点或内置引擎的方式，让 MinerU 融入您的生产力工具链。",
      count: appWorkflows.length,
    },
  };

  const info = moduleInfo[activeModule];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />

      {/* Main layout: sidebar + content */}
      <div className="flex-grow pt-16">
        <div className="flex">
          {/* ─── Left Sidebar ─── */}
          <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r border-gray-200/70 bg-white min-h-[calc(100vh-64px)] sticky top-16">
            <div className="p-4">
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
                      onClick={() => {
                        setActiveModule(mod.id);
                        setSearchQuery("");
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 text-left ${
                        isActive
                          ? "bg-gray-900 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{mod.label}</span>
                      <span
                        className={`ml-auto text-[11px] font-semibold ${
                          isActive ? "text-gray-300" : "text-gray-400"
                        }`}
                      >
                        {moduleInfo[mod.id].count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar bottom: links */}
            <div className="mt-auto p-4 border-t border-gray-100">
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
                href="#"
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
          <main className="flex-1 min-w-0">
            {/* Mobile module switcher */}
            <div className="md:hidden flex items-center gap-1 p-3 border-b border-gray-200 bg-white overflow-x-auto">
              {modules.map((mod) => {
                const Icon = mod.icon;
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setActiveModule(mod.id);
                      setSearchQuery("");
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {mod.label}
                  </button>
                );
              })}
            </div>

            {/* Content area */}
            <div className="p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeModule}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h1
                      className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {info.title}
                    </h1>
                    <p className="text-[14px] text-gray-500 leading-relaxed max-w-2xl">
                      {info.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

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

              {/* Cards grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeModule}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <EcoCard key={item.id} item={item} type={activeModule} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <div className="text-gray-300 mb-3">
                        <Search className="w-10 h-10 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-400">
                        未找到匹配的结果，请尝试其他关键词。
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Agent / Developer prompt card */}
              {activeModule === "skills" && !searchQuery && <PromptCard />}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ─── Agent/Developer Prompt Card ─── */
function PromptCard() {
  const [mode, setMode] = useState<"agent" | "human">("agent");
  const [copied, setCopied] = useState(false);

  const prompts = {
    agent: "Read https://mineru.net/ecosystem/skills.txt and install the MinerU parse skill for document extraction.",
    human: "pip install mineru-parse-py",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompts[mode]);
    setCopied(true);
    toast.success("已复制到剪贴板");
    setTimeout(() => setCopied(false), 2000);
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
              mode === "agent"
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> 我是 Agent
          </button>
          <button
            onClick={() => setMode("human")}
            className={`flex items-center gap-1.5 flex-1 justify-center py-2 rounded-lg text-[13px] font-medium transition-all ${
              mode === "human"
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
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
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
