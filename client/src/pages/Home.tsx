/*
 * MinerU 开发者生态与集成 — 主页面
 * 左侧固定导航 + 右侧内容滚动
 * 模块：Agent Skills / CLI/SDK / RAG 框架 / 应用与工作流
 * 侧边栏底部：开发者 FAQ + API 文档
 * 支持亮色/暗黑模式切换
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  agentSkills,
  ragFrameworks,
  appWorkflows,
  cliSdkGroups,
  faqCategories,
  mcpClientData,
  type SkillItem,
  type RAGItem,
  type AppItem,
} from "@/data/ecosystem";
import {
  Bot,
  Wrench,
  LayoutGrid,
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

/* ─── CDN Icon URLs for Agent Skills ─── */
const ICON_OPENCLAW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/v0DBRLoXnXp4_cecf1c2f.webp";
const ICON_ZEROCLAW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/XCkccFnGyxsV_2e1821b7.webp";
const ICON_NANOCLAW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/UPz9iUyrv50D_94226b7d.png";
const ICON_NANOBOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/fLctxhUnNgWT_c334d931.png";
const ICON_PICOCLAW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/eRKZD6sqUZrF_f97608ed.jpg";

const skillIconMap: Record<string, string> = {
  openclaw: ICON_OPENCLAW,
  zeroclaw: ICON_ZEROCLAW,
  nanoclaw: ICON_NANOCLAW,
  nanobot: ICON_NANOBOT,
  picoclaw: ICON_PICOCLAW,
};

/* ─── Sidebar Modules ─── */
const modules = [
  { id: "skills", label: "Skills & MCP", icon: Bot, count: agentSkills.length },
  { id: "cli", label: "CLI/SDK", icon: Terminal, count: null },
  { id: "rag", label: "RAG 框架", icon: Wrench, count: ragFrameworks.length },
  { id: "apps", label: "应用与工作流", icon: LayoutGrid, count: appWorkflows.length },
] as const;

type ModuleId = (typeof modules)[number]["id"] | "faq";

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
function LogoIcon({ src, fallback, name, size = 40, isDark }: { src: string; fallback?: string; name: string; size?: number; isDark?: boolean }) {
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
      className={`rounded-xl shrink-0 object-contain ${isDark ? "bg-slate-700" : "bg-white"}`}
      onError={() => setError(true)}
    />
  );
}

/* ─── CopyButton ─── */
function CopyButton({ text, id, copiedId, onCopy, isDark }: {
  text: string; id: string; copiedId: string | null; onCopy: (text: string, id: string) => void; isDark?: boolean;
}) {
  const isCopied = copiedId === id;
  return (
    <button
      onClick={() => onCopy(text, id)}
      className={`p-1.5 rounded-md transition-colors ${
        isDark
          ? "hover:bg-slate-600/60 text-slate-500 hover:text-slate-300"
          : "hover:bg-slate-200/60 text-slate-400 hover:text-slate-600"
      }`}
      title="复制"
    >
      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   Module 1: Agent Skills (no installCmd / code)
   ═══════════════════════════════════════════════════════ */
function SkillCard({ item, isDark }: { item: SkillItem; isDark: boolean }) {
  const iconUrl = skillIconMap[item.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`group rounded-xl p-4 border hover:-translate-y-0.5 transition-all duration-200 flex flex-col ${
        isDark
          ? "bg-slate-800/80 border-slate-700/60 hover:border-slate-600 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-white/95 border-slate-200/60 hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="flex items-center gap-3 mb-2.5">
        {iconUrl ? (
          <img src={iconUrl} alt={`${item.name} logo`} className="w-9 h-9 rounded-lg shrink-0 object-contain" />
        ) : (
          <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} size={36} isDark={isDark} />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`text-[15px] font-bold truncate ${isDark ? "text-slate-100" : "text-slate-900"}`}>{item.name}</h3>
            <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${
              isDark
                ? "bg-emerald-900/40 text-emerald-400 border-emerald-700/60"
                : "bg-emerald-50 text-emerald-600 border-emerald-200/60"
            }`}>
              官方支持
            </span>
          </div>
          {item.registry && (
            <p className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.registry}</p>
          )}
        </div>
      </div>

      {item.highlight && (
        <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border mb-2 w-fit ${
          isDark
            ? "bg-blue-900/30 text-blue-400 border-blue-700/50"
            : "bg-blue-50 text-blue-600 border-blue-100"
        }`}>
          {item.highlight}
        </span>
      )}

      <p className={`text-[13px] leading-relaxed mb-2.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{item.description}</p>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto">
          {item.tags.map((tag) => (
            <span key={tag} className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
              isDark
                ? "bg-slate-700/60 text-slate-400"
                : "bg-slate-100 text-slate-500"
            }`}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Resource Links Bar ─── */
const resourceLinks = [
  { label: "ClawHub 托管平台", url: "https://clawhub.com/opendatalab/mineru-skills", icon: "hub" },
  { label: "腾讯云国内镜像", url: "https://mirrors.cloud.tencent.com/opendatalab/mineru-skills", icon: "cloud" },
  { label: "GitHub 源码下载", url: "https://github.com/opendatalab/MinerU/tree/master/skills", icon: "github" },
];

function ResourceBar({ copiedId, onCopy, isDark }: { copiedId: string | null; onCopy: (t: string, id: string) => void; isDark: boolean }) {
  return (
    <div className={`rounded-xl border p-4 mb-5 ${
      isDark
        ? "bg-slate-800/60 border-slate-700/50"
        : "bg-white/80 border-slate-200/50"
    }`}>
      <h3 className={`text-[12px] font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${
        isDark ? "text-slate-500" : "text-slate-400"
      }`}>
        <FileCode2 className="w-3.5 h-3.5" />
        资源与部署
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {resourceLinks.map((link) => (
          <div
            key={link.label}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 border transition-colors ${
              isDark
                ? "bg-slate-900/50 border-slate-700/60 hover:border-slate-600"
                : "bg-slate-50/80 border-slate-200/60 hover:border-slate-300"
            }`}
          >
            {link.icon === "github" ? (
              <Github className={`w-4 h-4 shrink-0 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
            ) : link.icon === "cloud" ? (
              <svg className={`w-4 h-4 shrink-0 ${isDark ? "text-slate-400" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            ) : (
              <svg className={`w-4 h-4 shrink-0 ${isDark ? "text-slate-400" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              </svg>
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-[12px] font-medium truncate ${isDark ? "text-slate-300" : "text-slate-700"}`}>{link.label}</p>
              <p className={`text-[10px] truncate ${isDark ? "text-slate-500" : "text-slate-400"}`}>{link.url.replace(/^https?:\/\//, '')}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <CopyButton text={link.url} id={`res-${link.icon}`} copiedId={copiedId} onCopy={onCopy} isDark={isDark} />
              <a href={link.url} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-md transition-colors ${
                isDark ? "hover:bg-slate-600/60 text-slate-500 hover:text-slate-300" : "hover:bg-slate-200/60 text-slate-400 hover:text-slate-600"
              }`}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Module: CLI/SDK
   ═══════════════════════════════════════════════════════ */
function CLISection({ copiedId, onCopy, isDark }: { copiedId: string | null; onCopy: (t: string, id: string) => void; isDark: boolean }) {
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
            <div key={group.id} className={`rounded-2xl overflow-hidden border ${
              isDark
                ? "bg-slate-800/80 border-slate-700/60"
                : "bg-white/95 border-slate-200/60"
            }`}>
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <FileCode2 className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-500"}`} />
                  <h2 className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{group.title}</h2>
                </div>
                <p className={`text-[14px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>{group.description}</p>
              </div>

              <div className={`flex items-center border-y px-6 ${
                isDark ? "border-slate-700/80 bg-slate-800/50" : "border-slate-200/80 bg-slate-50/50"
              }`}>
                {group.tabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(group.id, i)}
                    className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-all ${
                      i === activeIdx
                        ? isDark ? "border-indigo-400 text-indigo-400" : "border-indigo-500 text-indigo-600"
                        : isDark ? "border-transparent text-slate-500 hover:text-slate-300" : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

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
                    <div key={cmdIdx}>
                      <p className={`text-[12px] font-medium mb-1.5 flex items-center gap-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full inline-block ${isDark ? "bg-indigo-400" : "bg-indigo-400"}`} />
                        {cmd.description}
                      </p>
                      <div className={`flex items-start gap-2 rounded-lg px-4 py-3 border ${
                        isDark
                          ? "bg-slate-900/60 border-slate-700/80"
                          : "bg-slate-50 border-slate-200/80"
                      }`}>
                        <Terminal className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                        <pre className={`text-[13px] font-mono flex-1 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}>
                          {cmd.code}
                        </pre>
                        <CopyButton text={cmd.code} id={`cli-${group.id}-${activeIdx}-${cmdIdx}`} copiedId={copiedId} onCopy={onCopy} isDark={isDark} />
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

/* ═══════════════════════════════════════════════════════
   MCP Client Section
   ═══════════════════════════════════════════════════════ */
function MCPSection({ copiedId, onCopy, isDark }: { copiedId: string | null; onCopy: (t: string, id: string) => void; isDark: boolean }) {
  const [activeTab, setActiveTab] = useState(0);
  const activeIntegration = mcpClientData.integrations[activeTab];

  const stepIcons: Record<string, React.ReactNode> = {
    message: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    cpu: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
      </svg>
    ),
    server: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    check: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  };

  const stepColors = [
    { bg: isDark ? "bg-blue-900/30" : "bg-blue-50", border: isDark ? "border-blue-700/40" : "border-blue-200", text: isDark ? "text-blue-400" : "text-blue-600", num: isDark ? "bg-blue-800/50 text-blue-300" : "bg-blue-100 text-blue-700" },
    { bg: isDark ? "bg-violet-900/30" : "bg-violet-50", border: isDark ? "border-violet-700/40" : "border-violet-200", text: isDark ? "text-violet-400" : "text-violet-600", num: isDark ? "bg-violet-800/50 text-violet-300" : "bg-violet-100 text-violet-700" },
    { bg: isDark ? "bg-indigo-900/30" : "bg-indigo-50", border: isDark ? "border-indigo-700/40" : "border-indigo-200", text: isDark ? "text-indigo-400" : "text-indigo-600", num: isDark ? "bg-indigo-800/50 text-indigo-300" : "bg-indigo-100 text-indigo-700" },
    { bg: isDark ? "bg-emerald-900/30" : "bg-emerald-50", border: isDark ? "border-emerald-700/40" : "border-emerald-200", text: isDark ? "text-emerald-400" : "text-emerald-600", num: isDark ? "bg-emerald-800/50 text-emerald-300" : "bg-emerald-100 text-emerald-700" },
  ];

  return (
    <div className="mt-10">
      {/* Section Header */}
      <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${
        isDark ? "border-slate-700/70" : "border-slate-200/70"
      }`}>
        <div className={`w-1 h-7 rounded-full bg-gradient-to-b from-purple-500 to-indigo-400 shrink-0`} />
        <div>
          <h2 className={`text-xl font-extrabold tracking-tight ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}>
            {mcpClientData.title}
          </h2>
          <p className={`text-[14px] leading-relaxed mt-1 font-medium ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}>
            {mcpClientData.description}
          </p>
          <p className={`text-[13px] leading-relaxed mt-0.5 ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}>
            {mcpClientData.subtitle}
          </p>
        </div>
      </div>

      {/* Workflow Steps - Enhanced with icons and colors */}
      <div className={`rounded-2xl border p-6 mb-6 ${
        isDark
          ? "bg-slate-800/80 border-slate-700/60"
          : "bg-white/95 border-slate-200/60"
      }`}>
        <h3 className={`text-[13px] font-semibold uppercase tracking-wider mb-5 flex items-center gap-2 ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}>
          <Sparkles className="w-3.5 h-3.5" />
          工作流程
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mcpClientData.workflowSteps.map((ws, i) => {
            const color = stepColors[i];
            return (
              <div key={i} className="relative">
                <div className={`rounded-xl border p-4 h-full transition-all hover:shadow-md ${
                  color.bg
                } ${color.border}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color.num}`}>
                      {stepIcons[ws.icon] || <span className="text-[12px] font-bold">{i + 1}</span>}
                    </div>
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${color.text}`}>
                      Step {i + 1}
                    </div>
                  </div>
                  <p className={`text-[14px] font-semibold mb-1 ${
                    isDark ? "text-slate-200" : "text-slate-800"
                  }`}>{ws.step}</p>
                  <p className={`text-[12px] leading-relaxed ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}>{ws.detail}</p>
                </div>
                {i < 3 && (
                  <div className={`hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 ${
                    isDark ? "text-slate-600" : "text-slate-300"
                  }`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Integration Tabs */}
      <div className={`rounded-2xl overflow-hidden border ${
        isDark
          ? "bg-slate-800/80 border-slate-700/60"
          : "bg-white/95 border-slate-200/60"
      }`}>
        <div className="px-6 pt-5 pb-3">
          <h3 className={`text-[15px] font-bold ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}>集成示例</h3>
        </div>

        <div className={`flex items-center border-y px-6 ${
          isDark ? "border-slate-700/80 bg-slate-800/50" : "border-slate-200/80 bg-slate-50/50"
        }`}>
          {mcpClientData.integrations.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-all ${
                i === activeTab
                  ? isDark ? "border-indigo-400 text-indigo-400" : "border-indigo-500 text-indigo-600"
                  : isDark ? "border-transparent text-slate-500 hover:text-slate-300" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-6"
          >
            <p className={`text-[13px] mb-4 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}>{activeIntegration.description}</p>
            <div className={`relative rounded-lg border overflow-hidden ${
              isDark
                ? "bg-slate-900/60 border-slate-700/80"
                : "bg-slate-50 border-slate-200/80"
            }`}>
              <div className={`flex items-center justify-between px-4 py-2 border-b ${
                isDark ? "border-slate-700/80" : "border-slate-200/80"
              }`}>
                <span className={`text-[11px] font-mono uppercase tracking-wider ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}>{activeIntegration.lang}</span>
                <CopyButton
                  text={activeIntegration.code}
                  id={`mcp-${activeTab}`}
                  copiedId={copiedId}
                  onCopy={onCopy}
                  isDark={isDark}
                />
              </div>
              <pre className={`px-4 py-4 text-[13px] font-mono leading-relaxed overflow-x-auto ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}>
                {activeIntegration.code}
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ─── */
function FAQSection({ isDark }: { isDark: boolean }) {
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
            <h3 className={`text-[13px] font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}>
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
                    className={`border rounded-xl overflow-hidden transition-colors ${
                      isDark
                        ? "border-slate-700/60 bg-slate-800/80 hover:border-slate-600"
                        : "border-slate-200/60 bg-white/95 hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    >
                      <span className={`text-[14px] font-medium leading-snug ${isDark ? "text-slate-200" : "text-slate-800"}`}>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        } ${isOpen ? "rotate-180" : ""}`}
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
                          <div className={`px-5 pb-4 text-[13px] leading-relaxed border-t pt-3 ${
                            isDark ? "text-slate-400 border-slate-700" : "text-slate-500 border-slate-100"
                          }`}>
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
   Module 2: RAG 框架 (卡片尺寸对齐 AppCard)
   ═══════════════════════════════════════════════════════ */
function RAGCard({ item, copiedId, onCopy, isDark }: { item: RAGItem; copiedId: string | null; onCopy: (t: string, id: string) => void; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group rounded-2xl p-6 border hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full ${
        isDark
          ? "bg-slate-800/80 border-slate-700/60 hover:border-slate-600 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-white/95 border-slate-200/60 hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      }`}
    >
      {/* Header: logo + name + highlight - same as AppCard */}
      <div className="flex items-start gap-4 mb-3">
        <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} size={44} isDark={isDark} />
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-slate-100" : "text-slate-900"}`}>{item.name}</h3>
          {item.highlight && (
            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
              isDark
                ? "bg-violet-900/30 text-violet-400 border-violet-700/50"
                : "bg-violet-50 text-violet-600 border-violet-100"
            }`}>
              {item.highlight}
            </span>
          )}
        </div>
      </div>

      {/* Description - same font size as AppCard */}
      <p className={`text-[15px] leading-relaxed mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{item.description}</p>

      {/* Features */}
      {item.features && item.features.length > 0 && (
        <div className="space-y-1.5 mb-4">
          {item.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className={`text-[13px] leading-snug ${isDark ? "text-slate-400" : "text-slate-500"}`}>{feat}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span key={tag} className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
              isDark
                ? "bg-slate-700/60 text-slate-400 border-slate-600/60"
                : "bg-slate-100 text-slate-500 border-slate-200/60"
            }`}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Code snippet */}
      {item.code && (
        <div className="mb-4">
          <div className={`flex items-center gap-2 rounded-lg px-3 py-2.5 border ${
            isDark
              ? "bg-slate-900/60 border-slate-700/80"
              : "bg-slate-50 border-slate-200/80"
          }`}>
            <Terminal className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
            <code className={`text-[12px] font-mono flex-1 truncate ${isDark ? "text-slate-300" : "text-slate-600"}`}>{item.code}</code>
            <CopyButton text={item.code} id={`rag-${item.id}`} copiedId={copiedId} onCopy={onCopy} isDark={isDark} />
          </div>
        </div>
      )}

      {/* Footer: links or coming soon - same spacing as AppCard */}
      <div className={`mt-auto pt-4 border-t space-y-3 ${isDark ? "border-slate-700" : "border-slate-100"}`}>
        {item.comingSoon ? (
          <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-lg border ${
            isDark
              ? "bg-slate-700/40 text-slate-500 border-slate-600/60"
              : "bg-slate-100 text-slate-400 border-slate-200/60"
          }`}>
            敬请期待
          </span>
        ) : (
          <>
            {item.links && item.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                      isDark
                        ? "bg-blue-900/20 text-blue-400 border-blue-700/40 hover:bg-blue-900/40"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100"
                    }`}
                  >
                    <Github className="w-3 h-3" />
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Module 3: 应用与工作流
   ═══════════════════════════════════════════════════════ */
function AppCard({ item, isDark }: { item: AppItem; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group rounded-2xl p-6 border hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full ${
        isDark
          ? "bg-slate-800/80 border-slate-700/60 hover:border-slate-600 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-white/95 border-slate-200/60 hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div className="flex items-start gap-4 mb-3">
        <LogoIcon src={item.logo} fallback={item.logoFallback} name={item.name} size={44} isDark={isDark} />
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-slate-100" : "text-slate-900"}`}>{item.name}</h3>
          {item.highlight && (
            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
              isDark
                ? "bg-emerald-900/30 text-emerald-400 border-emerald-700/50"
                : "bg-emerald-50 text-emerald-600 border-emerald-100"
            }`}>
              {item.highlight}
            </span>
          )}
        </div>
      </div>

      <p className={`text-[15px] leading-relaxed mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{item.description}</p>

      <div className={`mt-auto pt-4 border-t space-y-3 ${isDark ? "border-slate-700" : "border-slate-100"}`}>
        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-blue-900/20 text-blue-400 border-blue-700/40 hover:bg-blue-900/40"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100"
                }`}
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
          className={`inline-flex items-center gap-1.5 text-[14px] font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
          }`}
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
  const { copiedId, copy } = useCopy();
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const moduleInfo: Record<ModuleId, { title: string; subtitle: string; accent: string }> = {
    skills: {
      title: "Skills & MCP",
      subtitle: "MinerU 官方支持的 Agent 框架技能与 MCP Client 集成，覆盖全语言生态与主流大模型客户端。",
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
    faq: {
      title: "开发者 FAQ",
      subtitle: "常见问题解答，帮助您快速了解 MinerU 的接入方式、计费规则与技术能力。",
      accent: "from-amber-500 to-orange-400",
    },
  };

  const info = moduleInfo[activeModule];

  const switchModule = (id: ModuleId) => {
    setActiveModule(id);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      isDark
        ? "bg-gradient-to-br from-[#0f1219] via-[#131825] to-[#0e1420]"
        : "bg-gradient-to-br from-[#f0f4f9] via-[#f4f7fb] to-[#edf1f8]"
    }`}>
      <Navbar />

      <div className="flex-grow pt-16">
        <div className="flex h-[calc(100vh-64px)]">
          {/* ─── Left Sidebar ─── */}
          <aside className={`hidden md:flex flex-col w-[220px] shrink-0 border-r backdrop-blur-sm ${
            isDark
              ? "border-slate-700/50 bg-[#151827]/70"
              : "border-slate-200/50 bg-white/70"
          }`}>
            <div className="p-4 flex-1">
              <p className={`text-[11px] font-semibold uppercase tracking-wider mb-3 px-2 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}>
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
                          ? isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-700"
                          : isDark ? "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full ${isDark ? "bg-blue-400" : "bg-blue-500"}`}
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? (isDark ? "text-blue-400" : "text-blue-500") : ""}`} />
                      <span>{mod.label}</span>
                      {mod.count !== null && (
                        <span className={`ml-auto text-[11px] font-semibold ${
                          isActive ? (isDark ? "text-blue-500" : "text-blue-400") : (isDark ? "text-slate-600" : "text-slate-300")
                        }`}>
                          {mod.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar bottom: FAQ + API 文档 */}
            <div className={`p-4 border-t ${isDark ? "border-slate-700/50" : "border-slate-100"}`}>
              <button
                onClick={() => switchModule("faq")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] w-full text-left transition-colors ${
                  activeModule === "faq"
                    ? isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-700"
                    : isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                开发者 FAQ
              </button>
              <a
                href="https://mineru.net/docs"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-colors ${
                  isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
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
            <div className={`md:hidden flex items-center gap-1 p-3 border-b overflow-x-auto sticky top-0 z-10 ${
              isDark ? "border-slate-700 bg-[#151827]" : "border-slate-200 bg-white"
            }`}>
              {modules.map((mod) => {
                const Icon = mod.icon;
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => switchModule(mod.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-700"
                        : isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {mod.label}
                  </button>
                );
              })}
              <button
                onClick={() => switchModule("faq")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                  activeModule === "faq"
                    ? isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-700"
                    : isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-50"
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
                  className={`mb-6 pb-6 border-b ${isDark ? "border-slate-700/70" : "border-slate-200/70"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${info.accent} shrink-0 mt-1`} />
                    <div>
                      <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        {info.title}
                      </h1>
                      <p className={`text-[14px] leading-relaxed max-w-2xl ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {info.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ─── Skills & MCP Content ─── */}
              {activeModule === "skills" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  {/* Resource Links */}
                  <ResourceBar copiedId={copiedId} onCopy={copy} isDark={isDark} />

                  {/* Agent Skills Cards - compact grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {agentSkills.map((item) => (
                      <SkillCard key={item.id} item={item} isDark={isDark} />
                    ))}
                  </div>

                  {/* MCP Client Section */}
                  <MCPSection copiedId={copiedId} onCopy={copy} isDark={isDark} />
                </motion.div>
              )}

              {/* ─── CLI/SDK Content ─── */}
              {activeModule === "cli" && (
                <CLISection copiedId={copiedId} onCopy={copy} isDark={isDark} />
              )}

              {/* ─── RAG Content ─── */}
              {activeModule === "rag" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {ragFrameworks.map((item) => (
                      <RAGCard key={item.id} item={item} copiedId={copiedId} onCopy={copy} isDark={isDark} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ─── Apps Content ─── */}
              {activeModule === "apps" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {appWorkflows.map((item) => (
                      <AppCard key={item.id} item={item} isDark={isDark} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ─── FAQ Content ─── */}
              {activeModule === "faq" && (
                <FAQSection isDark={isDark} />
              )}
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
