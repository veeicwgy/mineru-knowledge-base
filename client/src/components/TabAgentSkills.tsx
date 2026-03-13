/*
 * Tab 1: Agent Skills 技能中心
 * White background, clean card design matching mineru.net
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ExternalLink, ChevronDown, Zap, Settings, Globe } from "lucide-react";

/* ─── Copy Button ─── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex-shrink-0 p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600" title="复制">
      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

/* ─── Features ─── */
const features = [
  { icon: <Zap className="w-5 h-5" />, color: "text-amber-500 bg-amber-50", title: "标准生态分发", desc: "支持 ClawHub、PyPI 等市场，搜索-安装-使用无缝即插即用。" },
  { icon: <Settings className="w-5 h-5" />, color: "text-blue-500 bg-blue-50", title: "双模智能切换", desc: "内置 fast 与 precise 参数。一键在极速提取与高保真图表/公式还原间切换。" },
  { icon: <Globe className="w-5 h-5" />, color: "text-emerald-500 bg-emerald-50", title: "边缘与多语言", desc: "覆盖 Node.js、Python、Go 甚至 Rust（资源极低，适配树莓派），统一 OpenAPI 维护。" },
];

/* ─── Frameworks ─── */
interface Framework {
  lang: string;
  tags: string[];
  title: string;
  description: string;
  badges: string[];
  command: string;
  link: string;
}

const frameworks: Framework[] = [
  { lang: "Node.js", tags: ["官方支持", "npm + ClawHub"], title: "OpenClaw", description: "主流 Node.js Agent 框架的官方推荐解析插件，提交至 openclaw SDK。", badges: ["极速版", "高精度版", "文件/URL"], command: "npm install mineru-parse", link: "#" },
  { lang: "Rust", tags: ["官方支持", "crates.io + ClawHub"], title: "ZeroClaw", description: "Rust 原生实现，极低的内存与资源占用开销，完美适配边缘设备。", badges: ["极速版", "高精度版", "极致轻量"], command: "cargo add mineru-parse-rs", link: "#" },
  { lang: "Python", tags: ["官方支持", "PyPI"], title: "Nanobot & LangChain", description: "专为 Python 生态 Agent 打造，原生支持主流的智能体编排工作流。", badges: ["极速版", "高精度版", "文件/URL"], command: "pip install mineru-parse-py", link: "#" },
  { lang: "TypeScript", tags: ["官方支持", "npm + ClawHub"], title: "NanoClaw", description: "轻量级 TypeScript 框架，导出符合 NanoClaw Skill 规范的工具函数。", badges: ["极速版", "高精度版", "Tool Calling"], command: "npm install mineru-parse-nano", link: "#" },
  { lang: "Go", tags: ["官方支持", "GitHub + ClawHub"], title: "PicoClaw", description: "专为 Go 语言轻量级 Agent 提供的解析模块，支持高并发数据流转。", badges: ["极速版", "高精度版", "文件/URL"], command: "go get github.com/opendatalab/mineru-parse-go", link: "#" },
];

/* ─── Code Tabs ─── */
const codeTabs = [
  {
    id: "python",
    label: "Python (Nanobot)",
    code: `from nanobot import Agent
from mineru_parse_py import MineruSkill

# 极简接入：免登录快速版，每日 50W 页免费额度
agent = Agent(tools=[MineruSkill(mode="fast")])

response = agent.run("帮我提取这份 PDF 里的所有文本：sample.pdf")
print(response)`,
  },
  {
    id: "typescript",
    label: "TypeScript (NanoClaw)",
    code: `import { NanoClaw } from 'nanoclaw';
import { mineruParseTool } from 'mineru-parse-nano';

// 注入技能，可选配置 API Key 使用高精度模式
const agent = new NanoClaw({
  skills: [mineruParseTool({
    mode: "precise",
    apiKey: "YOUR_KEY"
  })]
});

await agent.execute("解析这篇科研论文，并把公式转换为标准 LaTeX 代码。");`,
  },
];

/* ─── FAQ ─── */
const faqs = [
  { q: "需要注册账号才能让 Agent 使用吗？", a: "不需要。默认支持\u201c免登录极速版\u201d，每天提供 50 万页免费额度，仅提取基础文本，速度极快。" },
  { q: "如何切换为支持复杂公式和表格的完整版？", a: "将 Skill 的 mode 参数设为 precise 并传入 API Key，即可结构化输出纯净 Markdown/LaTeX。" },
  { q: "文件超限时 Agent 会怎样处理？", a: "接口内置面向 Agent 友好的异常处理。文件超限时不会崩溃，而是返回指令引导 Agent 在本地切割 (Chunking) 后重试。" },
  { q: "如何将自己开发的框架接入 MinerU？", a: "我们的核心库和适配器架构完全开源。您可以在 GitHub 获取 MinerU OpenAPI 规范，快速将其封装到您自己的项目中，并提交到生态市场。" },
];

function FAQItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="border border-gray-200 rounded-xl overflow-hidden"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
        <span className="text-sm font-semibold text-gray-900 pr-4">{item.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function TabAgentSkills() {
  const [codeTab, setCodeTab] = useState(0);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(codeTabs[codeTab].code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="bg-white">
      {/* Section intro */}
      <section className="py-12">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              为智能体赋予"阅读"复杂文档的超能力
            </h2>
          </motion.div>

          {/* 3 feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${f.color}`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework cards */}
      <section className="py-12 bg-gray-50/50">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-xs font-medium text-gray-400 tracking-wider uppercase mb-2">Multi-Framework Support</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              多框架适配清单
            </h2>
            <p className="text-sm text-gray-500 mt-2">一键安装，开箱即用。覆盖 Python、Node.js、TypeScript、Rust、Go 五大语言生态。</p>
          </motion.div>

          {/* First row: 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {frameworks.slice(0, 3).map((fw, i) => (
              <FrameworkCard key={i} fw={fw} index={i} />
            ))}
          </div>
          {/* Second row: 2 centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:max-w-[66.666%] lg:mx-auto">
            {frameworks.slice(3).map((fw, i) => (
              <FrameworkCard key={i + 3} fw={fw} index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* Code showcase */}
      <section className="py-12">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              只需几行代码，让您的 Agent 读懂世界
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              {/* Terminal header */}
              <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex gap-1 ml-4">
                    {codeTabs.map((tab, i) => (
                      <button
                        key={tab.id}
                        onClick={() => setCodeTab(i)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          codeTab === i ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-300"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                  {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {codeCopied ? "已复制" : "复制代码"}
                </button>
              </div>
              {/* Code body */}
              <div className="bg-gray-950 p-5 overflow-x-auto">
                <pre className="text-sm font-mono leading-7 text-gray-300" style={{ fontFamily: "var(--font-mono)" }}>
                  <code>{codeTabs[codeTab].code}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50/50">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              开发者常见问题
            </h2>
            <p className="text-sm text-gray-500 mt-2">面向人类开发者与 AI Agent 的双重解答</p>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Framework Card Sub-component ─── */
function FrameworkCard({ fw, index }: { fw: Framework; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="eco-card p-5 flex flex-col"
    >
      {/* Tags */}
      <div className="flex items-center gap-2 mb-3">
        {fw.tags.map((tag, j) => (
          <span key={j} className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            tag === "官方支持" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-gray-100 text-gray-500"
          }`}>
            {tag}
          </span>
        ))}
        <span className="ml-auto text-xs text-gray-400">{fw.lang}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
        {fw.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-grow">{fw.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {fw.badges.map((badge, j) => (
          <span key={j} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {badge}
          </span>
        ))}
      </div>

      {/* Terminal */}
      <div className="bg-gray-900 rounded-lg p-3 flex items-center gap-3 mb-3">
        <span className="text-emerald-400 text-xs font-mono select-none">$</span>
        <code className="text-xs font-mono text-gray-300 flex-grow overflow-x-auto whitespace-nowrap">{fw.command}</code>
        <CopyBtn text={fw.command} />
      </div>

      {/* Link */}
      <a href={fw.link} className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
        查看 ClawHub 示例 <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}
