/*
 * Tab 2: 核心数据编排框架 (Code-first Frameworks)
 * LangChain, LlamaIndex, DSPy, LightRAG, Haystack/LLMWare
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, Database, FileText, FlaskConical, Network, Layers } from "lucide-react";

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex-shrink-0 p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-500 hover:text-gray-300" title="复制">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

interface FrameworkItem {
  name: string;
  role: string;
  description: string;
  code?: string;
  link?: string;
  linkText?: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

const items: FrameworkItem[] = [
  {
    name: "LangChain",
    role: "Document Loader",
    description: "解决默认 Loader 遇到图表即乱码的痛点。配合 MarkdownHeaderTextSplitter 彻底消除按字数切片导致的语义割裂。",
    code: "from langchain_community.document_loaders import MineruLoader",
    link: "#",
    linkText: "查看指南",
    iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
    icon: <Database className="w-5 h-5" />,
  },
  {
    name: "LlamaIndex",
    role: "PDF Reader",
    description: "完美的 PDFReader 替代方案。将双栏论文转化为结构化 Document，精准执行基于 Node 的分层索引。",
    code: 'loader = MineruPDFReader(api_key="KEY", mode="precise")',
    link: "#",
    linkText: "查看指南",
    iconBg: "bg-violet-50", iconColor: "text-violet-600",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "DSPy",
    role: "Data Source",
    description: "在基于程序的 Prompt 优化中，提供标准化的 LaTeX 与 Markdown 输出，提供最稳定的 Ground Truth 数据源。",
    link: "#",
    linkText: "获取集成代码片段",
    iconBg: "bg-blue-50", iconColor: "text-blue-600",
    icon: <FlaskConical className="w-5 h-5" />,
  },
  {
    name: "LightRAG",
    role: "Text Preprocessor",
    description: "提供高纯净文本与精准上下文边界，极大降低大规模文档场景下图增强检索（实体关系抽取）的错误率。",
    iconBg: "bg-amber-50", iconColor: "text-amber-600",
    icon: <Network className="w-5 h-5" />,
  },
  {
    name: "Haystack / LLMWare",
    role: "Converter Component",
    description: "在模块化 Pipeline 中充当核心 Converter 组件，支持本地与企业级合规数据管道。",
    iconBg: "bg-rose-50", iconColor: "text-rose-600",
    icon: <Layers className="w-5 h-5" />,
  },
];

export default function TabFrameworks() {
  return (
    <div className="bg-white">
      <section className="py-12">
        <div className="container">
          {/* Intro */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              攻克 RAG 切片难题的底层预处理基建
            </h2>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              作为核心的 Document Loader，为您的向量数据库提供具备完美 Markdown 层级（H1/H2）、标准 LaTeX 公式与纯净表格的优质上下文。
            </p>
          </motion.div>

          {/* Framework list */}
          <div className="max-w-3xl mx-auto space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="eco-card p-5"
              >
                {/* Header row */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                    {item.name}
                  </h3>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {item.role}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.description}</p>

                {/* Code block */}
                {item.code && (
                  <div className="bg-gray-900 rounded-lg px-3 py-2.5 flex items-center gap-2 mb-3">
                    <code className="text-xs font-mono text-gray-300 flex-grow overflow-x-auto whitespace-nowrap" style={{ fontFamily: "var(--font-mono)" }}>
                      {item.code}
                    </code>
                    <CopyBtn text={item.code} />
                  </div>
                )}

                {/* Link */}
                {item.link && (
                  <a href={item.link} className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    {item.linkText} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
