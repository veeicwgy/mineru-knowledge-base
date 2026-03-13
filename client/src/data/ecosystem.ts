/*
 * MinerU 开发者生态与集成 — 数据定义
 * 三大模块：Agent Skills / RAG 框架 / 应用与工作流
 */

/* ─── Types ─── */
export interface SkillItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoFallback?: string;
  tags?: string[];
  badges?: string[];
  installCmd: string;
  registry?: string;
}

export interface RAGItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoFallback?: string;
  code?: string;
  guideLabel?: string;
  guideUrl?: string;
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoFallback?: string;
  guideUrl: string;
  links?: { label: string; url: string }[];
}

export interface FAQCategory {
  title: string;
  items: { q: string; a: string }[];
}

export interface CodeExample {
  label: string;
  lang: string;
  code: string;
}

/* ─── Logo CDN URLs ─── */
const lobe = (slug: string) =>
  `https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/${slug}.png`;

/* ─── Module 1: Agent Skills ─── */
export const agentSkills: SkillItem[] = [
  {
    id: "openclaw",
    name: "OpenClaw",
    description: "主流 Node.js Agent 框架的官方推荐解析插件，提交至 openclaw SDK。",
    logo: lobe("openclaw"),
    tags: ["Node.js", "OpenAPI"],
    installCmd: "npm install mineru-parse",
    registry: "npm + ClawHub",
  },
  {
    id: "zeroclaw",
    name: "ZeroClaw",
    description: "Rust 原生实现，极低的内存与资源占用开销，完美适配边缘设备。",
    logo: "",
    logoFallback: "#E44D26",
    tags: ["Rust", "Edge"],
    installCmd: "cargo add mineru-parse-rs",
    registry: "crates.io + ClawHub",
  },
  {
    id: "nanobot",
    name: "Nanobot",
    description: "专为 Python 生态 Agent 打造，原生支持主流的智能体编排工作流。",
    logo: "",
    logoFallback: "#3776AB",
    tags: ["Python", "LangChain"],
    installCmd: "pip install mineru-parse-py",
    registry: "PyPI",
  },
  {
    id: "nanoclaw",
    name: "NanoClaw",
    description: "轻量级 TypeScript 框架，导出符合 NanoClaw Skill 规范的工具函数。",
    logo: "",
    logoFallback: "#3178C6",
    tags: ["TypeScript", "Tool Calling"],
    installCmd: "npm install mineru-parse-nano",
    registry: "npm + ClawHub",
  },
  {
    id: "picoclaw",
    name: "PicoClaw",
    description: "专为 Go 语言轻量级 Agent 提供的解析模块，支持高并发数据流转。",
    logo: "",
    logoFallback: "#00ADD8",
    tags: ["Go", "高并发"],
    installCmd: "go get github.com/opendatalab/mineru-parse-go",
    registry: "GitHub + ClawHub",
  }
];

/* ─── Code Examples ─── */
export const codeExamples: CodeExample[] = [
  {
    label: "Python (Nanobot)",
    lang: "python",
    code: `from nanobot import Agent
from mineru_parse_py import MineruSkill

# 极简接入：免登录快速版，每日 50W 页免费额度
agent = Agent(tools=[MineruSkill(mode="fast")])
response = agent.run("帮我提取这份 PDF 里的所有文本：sample.pdf")`,
  },
  {
    label: "TypeScript (NanoClaw)",
    lang: "typescript",
    code: `import { NanoClaw } from 'nanoclaw';
import { mineruParseTool } from 'mineru-parse-nano';

// 注入技能，使用 API Key 开启高精度公式与表格还原
const agent = new NanoClaw({
  skills: [mineruParseTool({ mode: "precise", apiKey: "KEY" })]
});
await agent.execute("解析科研论文并把公式转为 LaTeX。");`,
  },
];

/* ─── FAQ Data ─── */
export const faqCategories: FAQCategory[] = [
  {
    title: "Agent 接入与计费额度",
    items: [
      {
        q: "需要注册账号才能让 Agent 使用吗？",
        a: "不需要。我们默认提供“免登录极速版”，只需 Agent 携带端侧生成的唯一 Device-ID，每日即可获得 50 万页的免费解析额度，速度极快，开箱即用。",
      },
      {
        q: "如何切换为支持复杂公式和表格的完整版？",
        a: "在接入 Skill 时，将 mode 参数设为 precise 并传入您的 API Key（需在控制台获取），即可无缝切换为高精度模式，结构化输出纯净的 Markdown 与 LaTeX 公式。",
      },
      {
        q: "网页 (URL) 解析和文件解析的额度是怎么扣减的？",
        a: "额度按页计数，不足一页按一页算。对于网页链接（URL）的提取，成功解析一次即算作消耗 1 页免费额度，UTC 0 点自动重置。",
      },
    ],
  },
  {
    title: "解析能力与文件支持",
    items: [
      {
        q: "免登录快速版和 API Key 完整版在解析效果上有什么区别？",
        a: "快速版专为 Agent 试用与快速预览打造，侧重基础文本与标题的极速提取；完整版（需 API Key）则保留全量结构化信息，支持跨页合并、双栏排版还原、复杂表格转化为 Markdown 以及高精度多模态图片提取。",
      },
      {
        q: "MinerU 当前支持哪些文档格式？",
        a: "我们全面支持 PDF、PPT、图片（JPG/PNG）、HTML 网页以及 Office 文档（DOCX/PPTX）。注意快速版单文件限制 ≤10MB 且 ≤20页，完整版则无此限制。",
      },
    ],
  },
  {
    title: "异常处理与稳定性",
    items: [
      {
        q: "文件大小或页数超限时，Agent 会直接报错崩溃吗？",
        a: "不会。我们的 API 专为 Agent 设计了自然语言异常引导。当遇到超限（400 错误）时，会返回一段 agent_instruction 指令，引导 Agent 在本地调用 Python（如 PyMuPDF）切分文件或压缩后再循环重试，实现完全的自动闭环。",
      },
      {
        q: "如果当天的 50 万页免费额度耗尽怎么办？",
        a: "接口会返回标准的 HTTP 429 状态码，并附带 retry_after 秒数提示。响应体中会明确指示 Agent 进入休眠等待（SLEEP and WAIT）状态，直到次日额度重置。",
      },
    ],
  },
  {
    title: "生态集成与框架适配",
    items: [
      {
        q: "我使用的是 LangChain，默认 Loader 遇到论文图表经常乱码，MinerU 能解决吗？",
        a: "完美解决。MinerU 提供了专属的 MineruLoader，配合 MarkdownHeaderTextSplitter，不仅彻底解决图表乱码痛点，还能依据标题层级进行切片，消除按字数硬切导致的语义割裂。",
      },
      {
        q: "能否在本地私有化部署的系统中使用 MinerU 的 Agent 能力？",
        a: "可以。我们提供了双版本的 MCP Server。除了 SaaS 版外，开源版 MCP Server 完全托管在 GitHub 上，专供开发者在自建 MinerU 引擎时配套使用。",
      },
    ],
  },
];

/* ─── Module 2: RAG 框架 ─── */
export const ragFrameworks: RAGItem[] = [
  {
    id: "langchain",
    name: "LangChain",
    description: "解决默认 Loader 遇到图表即乱码的痛点。配合 MarkdownHeaderTextSplitter 彻底消除按字数切片导致的语义割裂。",
    logo: lobe("langchain"),
    code: "from langchain_community.document_loaders import MineruLoader",
    guideLabel: "查看指南",
    guideUrl: "#",
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    description: "完美的 PDFReader 替代方案。将双栏论文转化为结构化 Document，精准执行基于 Node 的分层索引。",
    logo: lobe("llamaindex"),
    code: 'loader = MineruPDFReader(api_key="KEY", mode="precise")',
    guideLabel: "查看指南",
    guideUrl: "#",
  },
  {
    id: "dspy",
    name: "DSPy",
    description: "在基于程序的 Prompt 优化中，提供标准化的 LaTeX 与 Markdown 输出，提供最稳定的 Ground Truth 数据源。",
    logo: "",
    logoFallback: "#FF6B35",
    guideLabel: "获取 DSPy 集成代码片段",
    guideUrl: "#",
  },
  {
    id: "lightrag",
    name: "LightRAG",
    description: "提供高纯净文本与精准上下文边界，极大降低大规模文档场景下图增强检索（实体关系抽取）的错误率。",
    logo: "",
    logoFallback: "#10B981",
  },
  {
    id: "haystack",
    name: "Haystack",
    description: "在模块化 Pipeline 中充当核心 Converter 组件，支持本地与企业级合规数据管道。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/haystack-logo_e76a3214.jpg",
  },
  {
    id: "llmware",
    name: "LLMWare",
    description: "专为企业级 RAG 场景设计的端到端框架，内置高效文档解析与向量化流水线，支持完全私有化部署。",
    logo: "",
    logoFallback: "#7C3AED",
  },
  {
    id: "dify",
    name: "Dify",
    description: "作为核心预处理节点或官方插件，将图文混排文档一站式转化为高质量问答知识库。",
    logo: lobe("dify"),
  },
  {
    id: "ragflow",
    name: "RAGFlow",
    description: "作为平台内置的深度文档解析引擎，结合 GraphRAG 提供精准的物理与逻辑版面分析。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/ragflow-logo_47220700.jpg",
  },
  {
    id: "flowise",
    name: "Flowise",
    description: "提供开箱即用的拖拽式 Document Loader 节点，极速赋予 Agent 阅读复杂文档的能力。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/flowise-logo_c7ff8541.jpg",
  },
];

/* ─── Module 3: 应用与工作流 ─── */
export const appWorkflows: AppItem[] = [
  {
    id: "coze",
    name: "Coze",
    description: "以官方插件无缝接入智能体，赋予大模型直接阅读复杂排版文档的能力。",
    logo: lobe("coze"),
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/Coze/",
    links: [
      { label: "MinerU 官方插件", url: "https://www.coze.cn/store/plugin/7527957359730360354" },
      { label: "智能体", url: "https://www.coze.cn/store/agent/7530945296076062746" },
    ],
  },
  {
    id: "n8n",
    name: "n8n",
    description: "提供自动化专属节点，融入无人值守的高频工作流，支持批量与免登录调用。",
    logo: lobe("n8n"),
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/n8n/",
    links: [
      { label: "MinerU 官方插件", url: "https://www.npmjs.com/package/n8n-nodes-mineru" },
    ],
  },
  {
    id: "fastgpt",
    name: "FastGPT",
    description: "原生集成至平台工具链，为知识库提供纯净 Markdown 文本，提升检索精度。",
    logo: lobe("fastgpt"),
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/FastGPT/",
    links: [
      { label: "MinerU 官方插件", url: "https://cloud.fastgpt.io/dashboard/systemPlugin?type=tools" },
    ],
  },
  {
    id: "dingtalk",
    name: "钉钉",
    description: "基于 MinerU 打造企业级解析工具，提供高精度的多模态文档数字化与结构化方案。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/dingtalk-logo_f83f9ed8.jpg",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/DingTalk/",
  },
  {
    id: "cherrystudio",
    name: "Cherry Studio",
    description: "深度对接大模型对话交互，精准提取图表与公式，消除 AI 对复杂数据的幻觉。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/cherry-studio-logo_32366999.jpg",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/Cherry_Studio/",
  },
  {
    id: "hejing",
    name: "和鲸科学平台",
    description: "接入平台智能工具模块，为科研模型与 Agent 提供高精度的论文与公式解析支持。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/heywhale-logo_835dc2d9.png",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/ModelWhale/",
  },
  {
    id: "sider",
    name: "Sider",
    description: "深度集成至 Wisebase 知识库，为多模态智能问答提供极速、无损的文档结构化转换。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/sider-logo_d51d9ab0.jpg",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/Sider/",
  },
  {
    id: "smartdata",
    name: "智能数据平台",
    description: "原生集成至核心知识库，自动化处理海量多模态文档，输出标准机器可读数据。",
    logo: "",
    logoFallback: "#8B5CF6",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/DataFlow/",
  },
  {
    id: "ragflow-app",
    name: "RAGFlow",
    description: "作为平台内置的深度文档解析引擎，结合 GraphRAG 提供精准的物理与逻辑版面分析。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/ragflow-logo_47220700.jpg",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/RagFlow/",
  },
];
