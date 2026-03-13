/*
 * MinerU Ecosystem Data — All skills, frameworks, and platforms
 * Organized by the three tabs and their sub-categories
 */

/* ─── Types ─── */
export interface SkillItem {
  id: string;
  name: string;
  author: string;
  rating: number;
  description: string;
  category: string;
  tags: string[];
  command?: string;
  lang?: string;
  badges?: string[];
  link?: string;
  downloads?: string;
  views?: string;
  date?: string;
  official?: boolean;
}

export interface FrameworkItem {
  id: string;
  name: string;
  role: string;
  description: string;
  code?: string;
  link?: string;
  linkText?: string;
  category: string;
}

export interface PlatformItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  links?: { label: string; url: string }[];
  comingSoon?: boolean;
}

/* ─── Tab 1: Agent Skills ─── */
export const skillCategories = [
  { id: "all", label: "全部 Skills", icon: "grid", count: "5" },
  { id: "nodejs", label: "Node.js", icon: "nodejs", count: "2" },
  { id: "python", label: "Python", icon: "python", count: "1" },
  { id: "typescript", label: "TypeScript", icon: "typescript", count: "1" },
  { id: "rust", label: "Rust", icon: "rust", count: "1" },
  { id: "go", label: "Go", icon: "go", count: "1" },
];

export const skills: SkillItem[] = [
  {
    id: "openclaw",
    name: "mineru-parse",
    author: "OpenDataLab",
    rating: 5.0,
    description: "主流 Node.js Agent 框架的官方推荐解析插件，已包含完整 OpenAPI 定义。提交至 openclaw SDK。",
    category: "nodejs",
    tags: ["官方支持", "npm + ClawHub"],
    command: "npm install mineru-parse",
    lang: "Node.js",
    badges: ["极速版", "高精度版", "文件/URL"],
    link: "#",
    downloads: "12.8k",
    views: "45.2k",
    date: "Mar 13, 2026",
    official: true,
  },
  {
    id: "zeroclaw",
    name: "mineru-parse-rs",
    author: "OpenDataLab",
    rating: 4.9,
    description: "Rust 原生实现，极低的内存与资源占用开销，完美适配树莓派等边缘设备。",
    category: "rust",
    tags: ["官方支持", "crates.io + ClawHub"],
    command: "cargo add mineru-parse-rs",
    lang: "Rust",
    badges: ["极速版", "高精度版", "极致轻量"],
    link: "#",
    downloads: "3.2k",
    views: "18.6k",
    date: "Mar 10, 2026",
    official: true,
  },
  {
    id: "nanobot",
    name: "mineru-parse-py",
    author: "OpenDataLab",
    rating: 5.0,
    description: "专为 Python 生态 Agent 打造，原生支持主流的智能体编排工作流。Nanobot & LangChain 适配。",
    category: "python",
    tags: ["官方支持", "PyPI"],
    command: "pip install mineru-parse-py",
    lang: "Python",
    badges: ["极速版", "高精度版", "文件/URL"],
    link: "#",
    downloads: "28.5k",
    views: "89.3k",
    date: "Mar 12, 2026",
    official: true,
  },
  {
    id: "nanoclaw",
    name: "mineru-parse-nano",
    author: "OpenDataLab",
    rating: 4.8,
    description: "轻量级 TypeScript 智能体框架，直接导出符合 NanoClaw Skill 规范的工具函数。",
    category: "typescript",
    tags: ["官方支持", "npm + ClawHub"],
    command: "npm install mineru-parse-nano",
    lang: "TypeScript",
    badges: ["极速版", "高精度版", "Tool Calling"],
    link: "#",
    downloads: "8.1k",
    views: "32.7k",
    date: "Mar 11, 2026",
    official: true,
  },
  {
    id: "picoclaw",
    name: "mineru-parse-go",
    author: "OpenDataLab",
    rating: 4.7,
    description: "专为 Go 语言轻量级 Agent 提供的解析模块，支持高并发的高效数据流转。",
    category: "go",
    tags: ["官方支持", "GitHub + ClawHub"],
    command: "go get github.com/opendatalab/mineru-parse-go",
    lang: "Go",
    badges: ["极速版", "高精度版", "文件/URL"],
    link: "#",
    downloads: "2.1k",
    views: "11.4k",
    date: "Mar 8, 2026",
    official: true,
  },
];

/* ─── Tab 2: Code-first Frameworks ─── */
export const frameworkCategories = [
  { id: "all", label: "全部框架", icon: "grid", count: "5" },
  { id: "loader", label: "Document Loader", icon: "file", count: "2" },
  { id: "datasource", label: "Data Source", icon: "database", count: "1" },
  { id: "preprocessor", label: "Preprocessor", icon: "filter", count: "1" },
  { id: "converter", label: "Converter", icon: "layers", count: "1" },
];

export const frameworks: FrameworkItem[] = [
  {
    id: "langchain",
    name: "LangChain",
    role: "Document Loader",
    description: "解决默认 Loader 遇到图表即乱码的痛点。配合 MarkdownHeaderTextSplitter 彻底消除按字数切片导致的语义割裂。",
    code: "from langchain_community.document_loaders import MineruLoader",
    link: "#",
    linkText: "查看指南",
    category: "loader",
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    role: "PDF Reader",
    description: "完美的 PDFReader 替代方案。将双栏论文转化为结构化 Document，精准执行基于 Node 的分层索引。",
    code: 'loader = MineruPDFReader(api_key="KEY", mode="precise")',
    link: "#",
    linkText: "查看指南",
    category: "loader",
  },
  {
    id: "dspy",
    name: "DSPy",
    role: "Data Source",
    description: "在基于程序的 Prompt 优化中，提供标准化的 LaTeX 与 Markdown 输出，提供最稳定的 Ground Truth 数据源。",
    link: "#",
    linkText: "获取集成代码片段",
    category: "datasource",
  },
  {
    id: "lightrag",
    name: "LightRAG",
    role: "Text Preprocessor",
    description: "提供高纯净文本与精准上下文边界，极大降低大规模文档场景下图增强检索（实体关系抽取）的错误率。",
    category: "preprocessor",
  },
  {
    id: "haystack",
    name: "Haystack / LLMWare",
    role: "Converter Component",
    description: "在模块化 Pipeline 中充当核心 Converter 组件，支持本地与企业级合规数据管道。",
    category: "converter",
  },
];

/* ─── Tab 3: Platforms & Workflows ─── */
export const platformCategories = [
  { id: "all", label: "全部平台", icon: "grid", count: "10" },
  { id: "knowledge", label: "知识库与 RAG", icon: "database", count: "4" },
  { id: "agent", label: "智能体与工作流", icon: "workflow", count: "2" },
  { id: "enterprise", label: "办公与企业工具", icon: "building", count: "4" },
];

export const platforms: PlatformItem[] = [
  {
    id: "dify",
    name: "Dify",
    category: "knowledge",
    subcategory: "插件",
    description: "以官方插件上架 Dify 市场。在可视化工作流中拖拽节点，一站式将图文混排文档转化为高质量问答知识库。",
    links: [{ label: "获取官方插件", url: "#" }],
  },
  {
    id: "ragflow",
    name: "RAGFlow",
    category: "knowledge",
    subcategory: "内置引擎",
    description: "作为平台内置的深度文档解析引擎。结合 GraphRAG，提供物理与逻辑版面分析，支持复杂结构处理。",
    links: [{ label: "查看引擎切换指南", url: "#" }],
  },
  {
    id: "flowise",
    name: "Flowise",
    category: "knowledge",
    subcategory: "节点",
    description: "拖拽式构建 AI 流程，提供开箱即用的 MinerU Document Loader 节点，极大缩短 PoC 验证周期。",
  },
  {
    id: "fastgpt",
    name: "FastGPT",
    category: "knowledge",
    subcategory: "工具",
    description: "原生集成至平台工具模块，赋能精准解析复杂文档能力。",
    links: [{ label: "MinerU 官方插件", url: "#" }],
  },
  {
    id: "coze",
    name: "Coze",
    category: "agent",
    subcategory: "插件",
    description: "以插件形式接入，为智能体开发提供便捷的文档阅读与结构化提取能力。",
    links: [{ label: "MinerU 官方插件", url: "#" }, { label: "官方 Agents", url: "#" }],
  },
  {
    id: "n8n",
    name: "n8n",
    category: "agent",
    subcategory: "节点",
    description: "提供自动化专属节点，融入无人值守的高频工作流任务，支持免登录与批量处理。",
    links: [{ label: "MinerU 官方插件", url: "#" }],
  },
  {
    id: "dingtalk",
    name: "钉钉 (DingTalk)",
    category: "enterprise",
    subcategory: "企业",
    description: "基于 MinerU 即将推出面向企业用户的文档解析工具 DLU。",
    comingSoon: true,
  },
  {
    id: "cherrystudio",
    name: "Cherry Studio",
    category: "enterprise",
    subcategory: "应用",
    description: "集成于对话交互中，消除大模型处理图表数据时的幻觉。",
  },
  {
    id: "hejing",
    name: "和鲸科学平台",
    category: "enterprise",
    subcategory: "科研",
    description: "为科研数据、智库管理提供强力结构化解析支持。",
  },
  {
    id: "sider",
    name: "Sider",
    category: "enterprise",
    subcategory: "知识库",
    description: "在 Wisebase 知识库中解析和管理文件。",
  },
];

/* ─── Code Examples ─── */
export const codeExamples = [
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
export const faqs = [
  {
    q: "需要注册账号才能让 Agent 使用吗？",
    a: "不需要。默认支持\u201c免登录极速版\u201d，每天提供 50 万页免费额度，仅提取基础文本，速度极快。",
  },
  {
    q: "如何切换为支持复杂公式和表格的完整版？",
    a: "将 Skill 的 mode 参数设为 precise 并传入 API Key，即可结构化输出纯净 Markdown/LaTeX。",
  },
  {
    q: "文件超限时 Agent 会怎样处理？",
    a: "接口内置面向 Agent 友好的异常处理。文件超限时不会崩溃，而是返回指令引导 Agent 在本地切割 (Chunking) 后重试。",
  },
  {
    q: "如何将自己开发的框架接入 MinerU？",
    a: "我们的核心库和适配器架构完全开源。您可以在 GitHub 获取 MinerU OpenAPI 规范，快速将其封装到您自己的项目中，并提交到生态市场。",
  },
];
