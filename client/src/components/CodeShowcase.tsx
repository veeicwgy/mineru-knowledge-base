/*
 * Design: Obsidian Gradient — 沉浸式代码示例
 * 深色代码块 + Tab 切换 + 语法高亮（手动着色）
 */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

const CODE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/code-section-bg-kbgGBqpudbxLo4RHCVRX3R.webp";

interface CodeTab {
  id: string;
  label: string;
  lang: string;
  code: string;
  highlighted: React.ReactNode;
}

const pythonHighlighted = (
  <pre className="text-sm font-mono leading-7 overflow-x-auto">
    <code>
      <span className="text-blue-400">from</span>{" "}
      <span className="text-cyan-300">nanobot</span>{" "}
      <span className="text-blue-400">import</span>{" "}
      <span className="text-white">Agent</span>{"\n"}
      <span className="text-blue-400">from</span>{" "}
      <span className="text-cyan-300">mineru_parse_py</span>{" "}
      <span className="text-blue-400">import</span>{" "}
      <span className="text-white">MineruSkill</span>{"\n"}
      {"\n"}
      <span className="text-slate-500"># 极简接入：免登录快速版，每日 50W 页免费额度</span>{"\n"}
      <span className="text-white">agent</span>{" "}
      <span className="text-blue-400">=</span>{" "}
      <span className="text-cyan-300">Agent</span>
      <span className="text-slate-300">(</span>
      <span className="text-orange-300">tools</span>
      <span className="text-blue-400">=</span>
      <span className="text-slate-300">[</span>
      <span className="text-cyan-300">MineruSkill</span>
      <span className="text-slate-300">(</span>
      <span className="text-orange-300">mode</span>
      <span className="text-blue-400">=</span>
      <span className="text-emerald-400">"fast"</span>
      <span className="text-slate-300">)])</span>{"\n"}
      {"\n"}
      <span className="text-white">response</span>{" "}
      <span className="text-blue-400">=</span>{" "}
      <span className="text-white">agent</span>
      <span className="text-slate-300">.</span>
      <span className="text-cyan-300">run</span>
      <span className="text-slate-300">(</span>
      <span className="text-emerald-400">"帮我提取这份 PDF 里的所有文本：sample.pdf"</span>
      <span className="text-slate-300">)</span>{"\n"}
      <span className="text-cyan-300">print</span>
      <span className="text-slate-300">(</span>
      <span className="text-white">response</span>
      <span className="text-slate-300">)</span>
    </code>
  </pre>
);

const tsHighlighted = (
  <pre className="text-sm font-mono leading-7 overflow-x-auto">
    <code>
      <span className="text-blue-400">import</span>{" "}
      <span className="text-slate-300">{"{ "}</span>
      <span className="text-white">NanoClaw</span>
      <span className="text-slate-300">{" }"}</span>{" "}
      <span className="text-blue-400">from</span>{" "}
      <span className="text-emerald-400">'nanoclaw'</span>
      <span className="text-slate-300">;</span>{"\n"}
      <span className="text-blue-400">import</span>{" "}
      <span className="text-slate-300">{"{ "}</span>
      <span className="text-white">mineruParseTool</span>
      <span className="text-slate-300">{" }"}</span>{" "}
      <span className="text-blue-400">from</span>{" "}
      <span className="text-emerald-400">'mineru-parse-nano'</span>
      <span className="text-slate-300">;</span>{"\n"}
      {"\n"}
      <span className="text-slate-500">// 注入技能，可选配置 API Key 使用高精度模式</span>{"\n"}
      <span className="text-blue-400">const</span>{" "}
      <span className="text-white">agent</span>{" "}
      <span className="text-blue-400">=</span>{" "}
      <span className="text-blue-400">new</span>{" "}
      <span className="text-cyan-300">NanoClaw</span>
      <span className="text-slate-300">({"{"}</span>{"\n"}
      {"  "}
      <span className="text-orange-300">skills</span>
      <span className="text-slate-300">: [</span>
      <span className="text-cyan-300">mineruParseTool</span>
      <span className="text-slate-300">({"{"}</span>{"\n"}
      {"    "}
      <span className="text-orange-300">mode</span>
      <span className="text-slate-300">:</span>{" "}
      <span className="text-emerald-400">"precise"</span>
      <span className="text-slate-300">,</span>{"\n"}
      {"    "}
      <span className="text-orange-300">apiKey</span>
      <span className="text-slate-300">:</span>{" "}
      <span className="text-emerald-400">"YOUR_KEY"</span>{"\n"}
      {"  "}
      <span className="text-slate-300">{"})}]"}</span>{"\n"}
      <span className="text-slate-300">{"})"}</span>
      <span className="text-slate-300">;</span>{"\n"}
      {"\n"}
      <span className="text-blue-400">await</span>{" "}
      <span className="text-white">agent</span>
      <span className="text-slate-300">.</span>
      <span className="text-cyan-300">execute</span>
      <span className="text-slate-300">(</span>
      <span className="text-emerald-400">"解析这篇科研论文，并把公式转换为标准 LaTeX 代码。"</span>
      <span className="text-slate-300">);</span>
    </code>
  </pre>
);

const pythonRaw = `from nanobot import Agent
from mineru_parse_py import MineruSkill

# 极简接入：免登录快速版，每日 50W 页免费额度
agent = Agent(tools=[MineruSkill(mode="fast")])

response = agent.run("帮我提取这份 PDF 里的所有文本：sample.pdf")
print(response)`;

const tsRaw = `import { NanoClaw } from 'nanoclaw';
import { mineruParseTool } from 'mineru-parse-nano';

// 注入技能，可选配置 API Key 使用高精度模式
const agent = new NanoClaw({
  skills: [mineruParseTool({
    mode: "precise",
    apiKey: "YOUR_KEY"
  })]
});

await agent.execute("解析这篇科研论文，并把公式转换为标准 LaTeX 代码。");`;

const tabs: CodeTab[] = [
  { id: "python", label: "Python (Nanobot)", lang: "python", code: pythonRaw, highlighted: pythonHighlighted },
  { id: "typescript", label: "TypeScript (NanoClaw)", lang: "typescript", code: tsRaw, highlighted: tsHighlighted },
];

function CopyCodeButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "已复制" : "复制代码"}
    </button>
  );
}

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState("python");
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="code" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#080D18] to-[#0F172A]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${CODE_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

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
            Code Examples
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            只需几行代码，让您的 Agent{" "}
            <span className="gradient-text">读懂世界</span>
          </h2>
        </motion.div>

        {/* Code editor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#0A0A14]/90 backdrop-blur-sm shadow-2xl shadow-blue-500/5">
            {/* Tab bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0A0A14]">
              <div className="flex items-center gap-1">
                {/* Window dots */}
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                {/* Tabs */}
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "text-white bg-white/10"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeCodeTab"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
              <CopyCodeButton text={currentTab.code} />
            </div>

            {/* Code content */}
            <div className="p-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentTab.highlighted}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
