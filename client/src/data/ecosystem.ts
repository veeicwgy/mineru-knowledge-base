/*
 * MinerU 生态与社区 — 数据定义
 * 三大模块：Agent Skills / RAG 框架 / 应用与工作流
 * Logo 使用 LobeHub Icons CDN + 官方 Logo URL
 */

/* ─── Types ─── */
export interface SkillItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoFallback?: string; // color for fallback icon
  tags?: string[];
}

export interface RAGItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoFallback?: string;
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoFallback?: string;
}

/* ─── Logo CDN URLs ─── */
// LobeHub Icons CDN (light mode PNG)
const lobe = (slug: string) =>
  `https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/${slug}.png`;

/* ─── Module 1: Agent Skills ─── */
export const agentSkills: SkillItem[] = [
  {
    id: "openclaw",
    name: "OpenClaw",
    description: "主流 Node.js Agent 框架的官方推荐解析 Skill，已包含完整 OpenAPI 定义，提交至 ClawHub 市场即装即用。",
    logo: lobe("openclaw"),
    tags: ["Node.js", "OpenAPI"],
  },
  {
    id: "zeroclaw",
    name: "ZeroClaw",
    description: "Rust 原生实现的零依赖解析 Skill，极低内存占用，完美适配树莓派等边缘设备与嵌入式 Agent。",
    logo: "",
    logoFallback: "#E44D26",
    tags: ["Rust", "Edge"],
  },
  {
    id: "picoclaw",
    name: "PicoClaw",
    description: "专为 Go 语言轻量级 Agent 提供的解析模块，支持高并发场景下的高效数据流转与批量处理。",
    logo: "",
    logoFallback: "#00ADD8",
    tags: ["Go", "高并发"],
  },
  {
    id: "nanobot",
    name: "Nanobot",
    description: "专为 Python 生态 Agent 打造，原生支持 Nanobot 与 LangChain 等主流智能体编排工作流。",
    logo: "",
    logoFallback: "#3776AB",
    tags: ["Python", "LangChain"],
  },
  {
    id: "nanoclaw",
    name: "NanoClaw",
    description: "轻量级 TypeScript 智能体框架适配，直接导出符合 NanoClaw Skill 规范的标准工具函数。",
    logo: "",
    logoFallback: "#3178C6",
    tags: ["TypeScript", "Tool Calling"],
  },
];

/* ─── Module 2: RAG 框架 ─── */
export const ragFrameworks: RAGItem[] = [
  {
    id: "dify",
    name: "Dify",
    description: "作为核心预处理节点或官方插件，将图文混排文档一站式转化为高质量问答知识库。",
    logo: lobe("dify"),
  },
  {
    id: "langchain",
    name: "LangChain",
    description: "完美替代默认 Loader，解决复杂图表乱码痛点，配合切分器彻底消除语义割裂。",
    logo: lobe("langchain"),
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
  {
    id: "llamaindex",
    name: "LlamaIndex",
    description: "极佳的 PDFReader 替代方案，将双栏论文转化为带有层级的结构化 Node，提升分层检索精度。",
    logo: lobe("llamaindex"),
  },
  {
    id: "dspy",
    name: "DSPy",
    description: "在基于程序的 Prompt 优化机制中，提供标准化的 LaTeX 与纯净 Markdown，保障 Ground Truth 数据的稳定性。",
    logo: "",
    logoFallback: "#FF6B35",
  },
  {
    id: "lightrag",
    name: "LightRAG",
    description: "提供高纯净度文本与精准的上下文边界，大幅降低图增强检索（实体关系抽取）场景下的错误率。",
    logo: "",
    logoFallback: "#10B981",
  },
  {
    id: "haystack",
    name: "Haystack",
    description: "在企业级 Pipeline 中充当核心 Converter 组件，在数据清洗最前置阶段完成高保真文本转换。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/haystack-logo_e76a3214.jpg",
  },
  {
    id: "llmware",
    name: "LLMWare",
    description: "面向企业场景的合规数据管道，无缝接入复杂的 PDF/Office 文档，赋能本地小模型。",
    logo: "",
    logoFallback: "#7C3AED",
  },
];

/* ─── Module 3: 应用与工作流 ─── */
export const appWorkflows: AppItem[] = [
  {
    id: "coze",
    name: "Coze",
    description: "以官方插件无缝接入智能体，赋予大模型直接「阅读」复杂排版文档的能力。",
    logo: lobe("coze"),
  },
  {
    id: "n8n",
    name: "n8n",
    description: "提供自动化专属节点，融入无人值守的高频工作流，支持批量与免登录调用。",
    logo: lobe("n8n"),
  },
  {
    id: "fastgpt",
    name: "FastGPT",
    description: "原生集成至平台工具链，为知识库提供纯净 Markdown 文本，提升检索精度。",
    logo: lobe("fastgpt"),
  },
  {
    id: "cherrystudio",
    name: "Cherry Studio",
    description: "深度对接大模型对话交互，精准提取图表与公式，消除 AI 对复杂数据的幻觉。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/cherry-studio-logo_32366999.jpg",
  },
  {
    id: "sider",
    name: "Sider",
    description: "深度集成至 Wisebase 知识库，为多模态智能问答提供极速、无损的文档结构化转换。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/sider-logo_d51d9ab0.jpg",
  },
  {
    id: "hejing",
    name: "和鲸科学平台",
    description: "接入平台智能工具模块，为科研模型与 Agent 提供高精度的论文与公式解析支持。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/heywhale-logo_835dc2d9.png",
  },
  {
    id: "dingtalk",
    name: "钉钉",
    description: "基于 MinerU 打造企业级解析工具，提供高精度的多模态文档数字化与结构化方案。",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/dingtalk-logo_f83f9ed8.jpg",
  },
  {
    id: "smartdata",
    name: "智能数据平台",
    description: "原生集成至核心知识库，自动化处理海量多模态文档，输出标准机器可读数据。",
    logo: "",
    logoFallback: "#8B5CF6",
  },
];
