/*
 * Design: Obsidian Gradient — 开发者 FAQ
 * 手风琴展开/收起，面向人类与 AI 的双重解答
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "我需要注册账号才能让 Agent 使用这些 Skill 吗？",
    answer:
      "不需要。所有官方 Skill 默认支持\u201c免登录极速版\u201d。该通道每天为每个虚拟设备提供 50 万页的免费解析额度，仅提取基础文本，速度极快，是 Agent 试用和日常工作流的绝佳选择。",
  },
  {
    question: "如何切换为支持复杂公式和表格的完整版？",
    answer:
      '我们的 Skill 采用统一维护设计。您只需在初始化参数中传入 API Key，并将 mode 设为 precise，技能会自动切换至完整版，为您结构化输出纯净的 Markdown 和 LaTeX 数据。',
  },
  {
    question: "如果遇到超大文件（页数超限）Agent 会怎样处理？",
    answer:
      "MinerU 的 API 和 Skill 均内置了面向 Agent 友好的异常处理 (agent_instruction)。当文件超限时，不会导致崩溃，而是会以自然语言引导 Agent 在本地进行切割 (Chunking) 后循环重试。",
  },
  {
    question: "如何将我自己开发的框架接入 MinerU？",
    answer:
      "我们的核心库和适配器架构完全开源。您可以在 GitHub 获取 MinerU OpenAPI 规范，快速将其封装到您自己的项目中，并提交到生态市场。",
  },
];

function FAQItemCard({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="gradient-border-card"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-base font-semibold text-white pr-4" style={{ fontFamily: "var(--font-display)" }}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#0C1222] to-[#050510]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/3 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase">
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            开发者常见问题
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-base">
            面向人类开发者与 AI Agent 的双重解答
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FAQItemCard key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
