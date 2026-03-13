/*
 * Design: MinerU Ecosystem — Hero + Global Tab Switcher
 * White background, centered text, three tab buttons
 */
import { motion } from "framer-motion";

interface HeroProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const tabs = [
  { icon: "🤖", label: "Agent Skills 技能中心", shortLabel: "Agent Skills" },
  { icon: "🛠️", label: "核心数据编排框架", shortLabel: "编排框架" },
  { icon: "🧩", label: "平台、应用与自动化", shortLabel: "平台应用" },
];

export default function HeroSection({ activeTab, onTabChange }: HeroProps) {
  return (
    <section className="pt-28 pb-8 bg-white">
      <div className="container">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MinerU AI 数据与生态引擎
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mt-4 leading-relaxed">
            从 Agent 智能体技能，到核心数据流框架，再到无代码自动化工作流。
            <br className="hidden sm:block" />
            MinerU 与全球开发者共建，赋能多模态文档结构化解析。
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <div className="inline-flex items-center bg-gray-50 rounded-xl p-1.5 border border-gray-200/80">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => onTabChange(i)}
                className={`relative px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === i
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200/60"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
