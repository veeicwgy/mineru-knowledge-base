/*
 * Design: Obsidian Gradient — 多框架适配清单
 * 卡片式阵列，每张卡片包含：标签、标题、描述、能力徽章、安装命令（一键复制）
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ExternalLink } from "lucide-react";

interface Framework {
  name: string;
  lang: string;
  tags: string[];
  title: string;
  description: string;
  badges: string[];
  command: string;
  link: string;
}

const frameworks: Framework[] = [
  {
    name: "Nanobot",
    lang: "Python",
    tags: ["官方支持", "PyPI"],
    title: "Nanobot & LangChain",
    description: "专为 Python 生态 Agent 打造，原生支持主流的智能体编排工作流。",
    badges: ["极速版", "高精度版", "文件/URL 解析"],
    command: "pip install mineru-parse-py",
    link: "#",
  },
  {
    name: "OpenClaw",
    lang: "Node.js",
    tags: ["官方支持", "npm"],
    title: "OpenClaw",
    description: "主流 Node.js Agent 框架的官方推荐解析插件，已包含完整 OpenAPI 定义。",
    badges: ["极速版", "高精度版", "文件/URL 解析"],
    command: "npm install mineru-parse",
    link: "#",
  },
  {
    name: "NanoClaw",
    lang: "TypeScript",
    tags: ["官方支持", "npm"],
    title: "NanoClaw",
    description: "轻量级 TypeScript 智能体框架，直接导出符合 NanoClaw Skill 规范的工具函数。",
    badges: ["极速版", "高精度版", "工具调用 (Tool Calling)"],
    command: "npm install mineru-parse-nano",
    link: "#",
  },
  {
    name: "ZeroClaw",
    lang: "Rust",
    tags: ["官方支持", "crates.io"],
    title: "ZeroClaw",
    description: "Rust 原生实现，极低的内存与资源占用开销，完美适配树莓派等边缘设备。",
    badges: ["极速版", "高精度版", "极致轻量"],
    command: "cargo add mineru-parse-rs",
    link: "#",
  },
  {
    name: "PicoClaw",
    lang: "Go",
    tags: ["官方支持", "GitHub"],
    title: "PicoClaw",
    description: "专为 Go 语言轻量级 Agent 提供的解析模块，支持高并发的高效数据流转。",
    badges: ["极速版", "高精度版", "文件/URL 解析"],
    command: "go get github.com/opendatalab/mineru-parse-go",
    link: "#",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 p-1.5 rounded-md hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
      title="复制安装命令"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function FrameworkCard({ fw }: { fw: Framework }) {
  return (
    <motion.div
      variants={cardVariants}
      className="gradient-border-card p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Header: tags */}
      <div className="flex items-center gap-2 mb-4">
        {fw.tags.map((tag, j) => (
          <span
            key={j}
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              tag === "官方支持"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-white/5 text-slate-400 border border-white/10"
            }`}
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto text-xs text-slate-500">{fw.lang}</span>
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold text-white mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {fw.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">
        {fw.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        {fw.badges.map((badge, j) => (
          <span
            key={j}
            className="inline-flex items-center gap-1 text-xs text-slate-300 bg-white/5 px-2 py-1 rounded-md"
          >
            <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {badge}
          </span>
        ))}
      </div>

      {/* Terminal command */}
      <div className="bg-[#0A0A14] rounded-lg p-3 flex items-center gap-3 mb-4 border border-white/5">
        <span className="text-emerald-400 text-xs font-mono select-none">$</span>
        <code className="text-xs font-mono text-slate-300 flex-grow overflow-x-auto whitespace-nowrap">
          {fw.command}
        </code>
        <CopyButton text={fw.command} />
      </div>

      {/* Action link */}
      <a
        href={fw.link}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-cyan-400 transition-colors"
      >
        查看 ClawHub 示例
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

export default function FrameworkCards() {
  return (
    <section id="frameworks" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#0C1222] to-[#0F172A]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/4 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/3 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase">
            Multi-Framework Support
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            多框架适配清单
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base">
            一键安装，开箱即用。覆盖 Python、Node.js、TypeScript、Rust、Go 五大语言生态。
          </p>
        </motion.div>

        {/* First row: 3 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {frameworks.slice(0, 3).map((fw, i) => (
            <FrameworkCard key={i} fw={fw} />
          ))}
        </motion.div>

        {/* Second row: 2 cards centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 lg:max-w-[66.666%] lg:mx-auto"
        >
          {frameworks.slice(3).map((fw, i) => (
            <FrameworkCard key={i + 3} fw={fw} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
