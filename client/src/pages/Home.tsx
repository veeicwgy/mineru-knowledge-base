/*
 * MinerU 开发者生态与集成 — 主页面
 * 左侧固定导航 + 右侧内容滚动
 * 模块：Agent Skills / CLI/SDK / RAG 框架 / 应用与工作流
 * 侧边栏底部：开发者 FAQ + API 文档
 */
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  agentSkills,
  ragFrameworks,
  appWorkflows,
  cliSdkGroups,
  faqCategories,
  type SkillItem,
  type RAGItem,
  type AppItem,
  type CLICommandGroup,
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
  BookOpen,
  Sparkles,
  Github,
  CheckCircle2,
  FileCode2,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

/* ─── Sidebar Modules ─── */
const modules = [
  { id: "skills", label: "Agent Skills", icon: Bot, count: agentSkills.length },
  { id: "cli", label: "CLI/SDK", icon: Terminal, count: null },
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

/* ─── SVG Logos for Agent Skills ─── */
function OpenClawLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#0F172A"/>
      <path d="M12 14h16v2H12zM12 19h12v2H12zM12 24h14v2H12z" fill="#38BDF8"/>
      <circle cx="30" cy="15" r="3" fill="#22D3EE"/>
      <path d="M27 22l4 4-4 4" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ZeroClawLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#7C2D12"/>
      <path d="M13 13h14l-14 14h14" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="28" cy="13" r="2" fill="#FDBA74"/>
      <circle cx="13" cy="27" r="2" fill="#FDBA74"/>
    </svg>
  );
}

function NanobotLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#1E3A5F"/>
      <circle cx="20" cy="18" r="6" stroke="#60A5FA" strokeWidth="2"/>
      <path d="M16 26c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="18" cy="17" r="1.5" fill="#93C5FD"/>
      <circle cx="22" cy="17" r="1.5" fill="#93C5FD"/>
      <path d="M20 10v-2M14 12l-1.5-1.5M26 12l1.5-1.5" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="14" y="29" width="12" height="2" rx="1" fill="#3B82F6"/>
    </svg>
  );
}

function NanoClawLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#1E3A8A"/>
      <path d="M14 28V12l6 16 6-16v16" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="11" y="10" width="18" height="2" rx="1" fill="#93C5FD"/>
    </svg>
  );
}

function PicoClawLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#065F46"/>
      <path d="M20 10l8 5v10l-8 5-8-5V15l8-5z" stroke="#34D399" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M20 15l4 2.5v5L20 25l-4-2.5v-5L20 15z" fill="#6EE7B7" fillOpacity="0.4"/>
      <circle cx="20" cy="20" r="2" fill="#34D399"/>
    </svg>
  );
}

const skillLogos: Record<string, React.FC<{ size?: number }>> = {
  openclaw: OpenClawLogo,
  zeroclaw: ZeroClawLogo,
  nanobot: NanobotLogo,
  nanoclaw: NanoClawLogo,
  picoclaw: PicoClawLogo,
};

/* ─── Logo Component for RAG & Apps ─── */
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
function CopyButton({ text, id, copiedId, onCopy }: {
  text: string; id: string; copiedId: string | null; onCopy: (text: string, id: string) => void;
}) {
  const isCopied = copiedId === id;
  return (
    <button
      onClick={() => onCopy(text, id)}
      className="p-1.5 rounded-md hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
      title="复制"
    >
      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   Module 1: Agent Skills
   ═══════════════════════════════════════════════════════ */
function SkillCard({ item, copiedId, onCopy }: { item: SkillItem; copiedId: string | null; onCopy: (t: string, id: string) => void }) {
  const LogoComponent = skillLogos[item.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white/95 border border-slate-200/60 rounded-2xl p-6 hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-4">
        {LogoComponent ? (
          <div className="shrink-0"><LogoComponent size={44} /></div>
        ) : (
          <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} size={44} />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-900 truncate">{item.name}</h3>
            <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              官方支持
            </span>
          </div>
          {item.registry && (
            <p className="text-sm text-slate-400 mb-1">{item.registry}</p>
          )}
        </div>
      </div>

      {item.highlight && (
        <div className="mb-3">
          <span className="text-[12px] font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
            {item.highlight}
          </span>
        </div>
      )}

      <p className="text-[15px] text-slate-600 leading-relaxed mb-4">{item.description}</p>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[13px] font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-lg px-3.5 py-3">
          <Terminal className="w-4 h-4 text-slate-400 shrink-0" />
          <code className="text-[13px] font-mono text-slate-700 flex-1 truncate">{item.installCmd}</code>
          <CopyButton text={item.installCmd} id={`install-${item.id}`} copiedId={copiedId} onCopy={onCopy} />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Module: CLI/SDK
   ═══════════════════════════════════════════════════════ */
function CLISection({ copiedId, onCopy }: { copiedId: string | null; onCopy: (t: string, id: string) => void }) {
  const [activeTabs, setActiveTabs] = useState<Record<string, number>>({});

  const getActiveTab = (groupId: string) => activeTabs[groupId] || 0;
  const setActiveTab = (groupId: string, idx: number) => {
    setActiveTabs((prev) => ({ ...prev, [groupId]: idx }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      <div className="space-y-8">
        {cliSdkGroups.map((group) => {
          const activeIdx = getActiveTab(group.id);
          const activeTab = group.tabs[activeIdx];

          return (
            <div key={group.id} className="bg-white/95 border border-slate-200/60 rounded-2xl overflow-hidden">
              {/* Group Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <FileCode2 className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-bold text-slate-900">{group.title}</h2>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">{group.description}</p>
              </div>

              {/* Tab bar */}
              <div className="flex items-center border-y border-slate-200/80 px-6 bg-slate-50/50">
                {group.tabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(group.id, i)}
                    className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-all ${
                      i === activeIdx
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Commands */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${group.id}-${activeIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="p-6 space-y-3"
                >
                  {activeTab.commands.map((cmd, cmdIdx) => (
                    <div key={cmdIdx} className="group/cmd">
                      <p className="text-[12px] text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
                        {cmd.description}
                      </p>
                      <div className="flex items-start gap-2 bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-3">
                        <Terminal className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <pre className="text-[13px] font-mono text-slate-700 flex-1 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                          {cmd.code}
                        </pre>
                        <CopyButton text={cmd.code} id={`cli-${group.id}-${activeIdx}-${cmdIdx}`} copiedId={copiedId} onCopy={onCopy} />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── FAQ Accordion (Sidebar Bottom) ─── */
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      <div className="space-y-6">
        {faqCategories.map((cat) => (
          <div key={cat.title}>
            <h3 className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
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
                    className="border border-slate-200/60 rounded-xl bg-white/95 overflow-hidden hover:border-slate-300 transition-colors"
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    >
                      <span className="text-[14px] font-medium text-slate-800 leading-snug">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
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
                          <div className="px-5 pb-4 text-[13px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
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
    </motion.div>
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
      className="group bg-white/95 border border-slate-200/60 rounded-2xl p-6 hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-start gap-3.5 mb-3">
        <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} size={44} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 truncate">{item.name}</h3>
          {item.highlight && (
            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md bg-violet-50 text-violet-600 border border-violet-100 mt-1">
              {item.highlight}
            </span>
          )}
        </div>
      </div>

      <p className="text-[14px] text-slate-600 leading-relaxed mb-3">{item.description}</p>

      {item.features && item.features.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {item.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-[13px] text-slate-500 leading-snug">{feat}</span>
            </div>
          ))}
        </div>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200/60">
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.code && (
        <div className="mb-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2.5">
            <Terminal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <code className="text-[12px] font-mono text-slate-600 flex-1 truncate">{item.code}</code>
            <CopyButton text={item.code} id={`rag-${item.id}`} copiedId={copiedId} onCopy={onCopy} />
          </div>
        </div>
      )}

      <div className="mt-auto pt-3 border-t border-slate-100 space-y-2.5">
        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 transition-colors"
              >
                <Github className="w-3 h-3" />
                {link.label}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        )}
        {item.guideLabel && item.guideUrl && (
          <a
            href={item.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            {item.guideLabel}
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
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
      className="group bg-white/95 border border-slate-200/60 rounded-2xl p-6 hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-3">
        <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} size={44} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
          {item.highlight && (
            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">
              {item.highlight}
            </span>
          )}
        </div>
      </div>

      <p className="text-[15px] text-slate-600 leading-relaxed mb-4">{item.description}</p>

      <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 transition-colors"
              >
                {link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
        <a
          href={item.guideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          查看使用指引
          <ExternalLink className="w-3.5 h-3.5" />
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

  const moduleInfo: Record<ModuleId, { title: string; subtitle: string; accent: string }> = {
    skills: {
      title: "Agent Skills 技能中心",
      subtitle: "MinerU 官方支持的 5 大 Agent 框架解析技能，覆盖 Node.js / Python / TypeScript / Rust / Go 全语言生态。",
      accent: "from-blue-500 to-cyan-400",
    },
    cli: {
      title: "CLI/SDK 命令中心",
      subtitle: "提供可直接复制运行的命令，快速集成 MinerU 文档解析能力到您的开发环境中。",
      accent: "from-indigo-500 to-blue-400",
    },
    rag: {
      title: "RAG 框架集成",
      subtitle: "无缝接入 LangChain、Dify、RAGFlow、Flowise 等主流框架，从文档解析到知识库构建一站式打通。",
      accent: "from-violet-500 to-purple-400",
    },
    apps: {
      title: "应用与工作流",
      subtitle: "与知名平台深度集成，通过插件、节点或内置引擎的方式，让 MinerU 融入您的生产力工具链。",
      accent: "from-emerald-500 to-teal-400",
    },
  };

  const info = moduleInfo[activeModule];

  const switchModule = (id: ModuleId) => {
    setActiveModule(id);
    setSearchQuery("");
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0f4f9] via-[#f4f7fb] to-[#edf1f8]">
      <Navbar />

      <div className="flex-grow pt-16">
        <div className="flex h-[calc(100vh-64px)]">
          {/* ─── Left Sidebar ─── */}
          <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r border-slate-200/50 bg-white/70 backdrop-blur-sm">
            <div className="p-4 flex-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
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
                      className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 text-left ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-blue-500"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-500" : ""}`} />
                      <span>{mod.label}</span>
                      {mod.count !== null && (
                        <span className={`ml-auto text-[11px] font-semibold ${isActive ? "text-blue-400" : "text-slate-300"}`}>
                          {mod.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar bottom: FAQ + API 文档 */}
            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => switchModule("faq" as ModuleId)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] w-full text-left transition-colors ${
                  activeModule === ("faq" as ModuleId)
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                开发者 FAQ
              </button>
              <a
                href="https://mineru.net/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                API 文档
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </div>
          </aside>

          {/* ─── Right Content ─── */}
          <main ref={contentRef} className="flex-1 min-w-0 overflow-y-auto">
            {/* Mobile module switcher */}
            <div className="md:hidden flex items-center gap-1 p-3 border-b border-slate-200 bg-white overflow-x-auto sticky top-0 z-10">
              {modules.map((mod) => {
                const Icon = mod.icon;
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => switchModule(mod.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                      isActive ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {mod.label}
                  </button>
                );
              })}
              <button
                onClick={() => switchModule("faq" as ModuleId)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                  activeModule === ("faq" as ModuleId) ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                FAQ
              </button>
            </div>

            {/* Content area */}
            <div className="p-6 lg:p-8 max-w-6xl">
              {/* Section Header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6 pb-6 border-b border-slate-200/70"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${info?.accent || "from-blue-500 to-cyan-400"} shrink-0 mt-1`} />
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                        {info?.title || "开发者 FAQ"}
                      </h1>
                      <p className="text-[14px] text-slate-500 leading-relaxed max-w-2xl">
                        {info?.subtitle || "常见问题解答，帮助您快速了解 MinerU 的接入方式、计费规则与技术能力。"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Search bar (hide for FAQ) */}
              {activeModule !== ("faq" as ModuleId) && (
                <div className="relative mb-6 max-w-xl">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索名称、描述或关键词..."
                    className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                  />
                  <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
                    Ctrl K
                  </kbd>
                </div>
              )}

              {/* ─── Agent Skills Content ─── */}
              {activeModule === "skills" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((item) => (
                        <SkillCard key={item.id} item={item} copiedId={copiedId} onCopy={copy} />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </motion.div>
              )}

              {/* ─── CLI/SDK Content ─── */}
              {activeModule === "cli" && (
                <CLISection copiedId={copiedId} onCopy={copy} />
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

              {/* ─── FAQ Content ─── */}
              {activeModule === ("faq" as ModuleId) && (
                <FAQSection />
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
      <Search className="w-10 h-10 mx-auto text-slate-300 mb-3" />
      <p className="text-sm text-slate-400">未找到匹配的结果，请尝试其他关键词。</p>
    </div>
  );
}
