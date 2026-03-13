/*
 * LobeHub-inspired Hero Section
 * Left: breadcrumb + large title + subtitle
 * Right: Agent/Human prompt card
 * Below: Global tab switcher + search bar
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bot, User } from "lucide-react";

interface HeroProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const tabs = [
  { icon: <Bot className="w-4 h-4" />, label: "Agent Skills 技能中心", shortLabel: "Agent Skills" },
  { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, label: "核心数据编排框架", shortLabel: "编排框架" },
  { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>, label: "平台、应用与自动化", shortLabel: "平台应用" },
];

export default function HeroSection({ activeTab, onTabChange, searchQuery, onSearchChange }: HeroProps) {
  const [promptMode, setPromptMode] = useState<"agent" | "human">("agent");

  return (
    <section className="pt-20 pb-4 bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl"
          >
            <p className="text-[13px] text-gray-400 mb-3">Agent-First · 开放生态</p>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Skills Marketplace
              <br />
              <span className="text-gray-400">for Every Agent</span>
            </h1>
            <p className="text-[15px] text-gray-500 mt-4 leading-relaxed max-w-md">
              浏览 MinerU 官方生态中的 Agent Skills、数据编排框架与平台集成。发布 SKILL.md 包，帮助任何 Agent 快速发现并接入。
            </p>
          </motion.div>

          {/* Right: Prompt card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-full lg:w-[340px] flex-shrink-0"
          >
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
              {/* Toggle */}
              <div className="flex items-center gap-1 mb-3 bg-white rounded-lg p-0.5 border border-gray-200">
                <button
                  onClick={() => setPromptMode("agent")}
                  className={`flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-md text-xs font-medium transition-all ${
                    promptMode === "agent" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" /> 我是 Agent
                </button>
                <button
                  onClick={() => setPromptMode("human")}
                  className={`flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-md text-xs font-medium transition-all ${
                    promptMode === "human" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> 我是开发者
                </button>
              </div>
              {/* Prompt content */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                {promptMode === "agent" ? (
                  <div className="text-xs text-gray-500 leading-relaxed">
                    <p className="mb-2 text-gray-700 font-medium">将此 prompt 发送给您的 Agent：</p>
                    <code className="block bg-gray-50 rounded-md p-2 text-[11px] font-mono text-gray-600 leading-relaxed">
                      Read https://mineru.net/ecosystem/skills.txt and install the MinerU parse skill for document extraction.
                    </code>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 leading-relaxed">
                    <p className="mb-2 text-gray-700 font-medium">快速开始：</p>
                    <code className="block bg-gray-50 rounded-md p-2 text-[11px] font-mono text-gray-600 leading-relaxed">
                      pip install mineru-parse-py
                    </code>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-200">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => onTabChange(i)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-all border-b-2 -mb-px ${
                  activeTab === i
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="搜索名称、描述或关键词..."
                className="w-full pl-9 pr-16 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                Ctrl K
              </kbd>
            </div>
            <button className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              提交 Skill
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
