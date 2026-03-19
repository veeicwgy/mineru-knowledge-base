/*
 * MinerU 开发者生态与集成 — 数据定义
 * 三大模块：Agent Skills / RAG 框架 / 应用与工作流
 */

/* ─── Types ─── */
export interface SkillItem {
  id: string;
  name: string;
  description: string;
  highlight?: string;
  logo: string;
  logoFallback?: string;
  tags?: string[];
  installCmd: string;
  registry?: string;
}

export interface RAGItem {
  id: string;
  name: string;
  description: string;
  highlight?: string;
  logo: string;
  logoFallback?: string;
  code?: string;
  guideLabel?: string;
  guideUrl?: string;
  tags?: string[];
  links?: { label: string; url: string }[];
  features?: string[];
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  highlight?: string;
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

/* MCP Client Types */
export interface MCPIntegrationTab {
  label: string;
  description: string;
  code: string;
  lang: string;
}

export interface MCPClientData {
  title: string;
  description: string;
  subtitle: string;
  workflowSteps: { step: string; detail: string; icon: string }[];
  integrations: MCPIntegrationTab[];
}

/* CLI/SDK Command Types */
export interface CLICommandGroup {
  id: string;
  title: string;
  description: string;
  tabs: { label: string; commands: { description: string; code: string }[] }[];
}

/* ─── Logo CDN URLs ─── */
const lobe = (slug: string) =>
  `https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/${slug}.png`;

/* ─── Module 1: Agent Skills ─── */
export const agentSkills: SkillItem[] = [
  {
    id: "openclaw",
    name: "OpenClaw",
    description: "Node.js Agent 框架官方推荐插件，支持 PDF/DOCX/PPT 结构化提取，输出 Markdown 与 JSON。",
    highlight: "Node.js 生态首选",
    logo: lobe("openclaw"),
    tags: ["Node.js", "OpenAPI"],
    installCmd: "npm install mineru-parse",
    registry: "npm + ClawHub",
  },
  {
    id: "zeroclaw",
    name: "ZeroClaw",
    description: "Rust 原生实现，极低内存占用，适配边缘设备。支持 WASM 编译，可在浏览器端运行。",
    highlight: "边缘计算首选",
    logo: "",
    logoFallback: "#E44D26",
    tags: ["Rust", "Edge"],
    installCmd: "cargo add mineru-parse-rs",
    registry: "crates.io + ClawHub",
  },
  {
    id: "nanobot",
    name: "Nanobot",
    description: "Python 生态 Agent 首选，原生支持 LangChain、AutoGen 编排工作流，内置双模式解析。",
    highlight: "Python 生态首选",
    logo: "",
    logoFallback: "#3776AB",
    tags: ["Python", "LangChain"],
    installCmd: "pip install mineru-parse-py",
    registry: "PyPI",
  },
  {
    id: "nanoclaw",
    name: "NanoClaw",
    description: "轻量级 TypeScript 框架，适配 Vercel AI SDK 与 Tool Calling 标准协议。",
    highlight: "TypeScript 生态首选",
    logo: "",
    logoFallback: "#3178C6",
    tags: ["TypeScript", "Tool Calling"],
    installCmd: "npm install mineru-parse-nano",
    registry: "npm + ClawHub",
  },
  {
    id: "picoclaw",
    name: "PicoClaw",
    description: "Go 语言解析模块，支持高并发与 goroutine 安全调用，适合微服务批量处理。",
    highlight: "Go 生态首选",
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

# 极简接入：免登录快速版，每日 1 万页免费额度
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
        a: "不需要。我们默认提供“免登录极速版”，只需 Agent 携带端侧生成的唯一 Device-ID，每日即可获得 1 万页的免费解析额度，速度极快，开箱即用。",
      },
      {
        q: "如何切换为支持复杂公式和表格的完整版？",
        a: "在接入 Skill 时，选择高精度通道解析 并传入您的 API Key（需在控制台获取），即可无缝切换为高精度模式，结构化输出纯净的 Markdown 与 LaTeX 公式。",
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
        q: "如果当天的 1 万页免费额度耗尽怎么办？",
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
    description: "作为 Loader 深度集成至 LangChain 生态，将各种外部数据源（如 PDF）统一转换为 LangChain 可处理的 Document 格式。配合 MarkdownHeaderTextSplitter 按标题层级智能切片，彻底消除按字数硬切导致的语义割裂问题。",
    highlight: "官方推荐 Loader",
    logo: lobe("langchain"),
    code: "from langchain_community.document_loaders import MineruLoader",
    guideLabel: "查看指南",
    guideUrl: "https://github.com/opendatalab/MinerU",
    tags: ["Python", "Document Loader", "RAG Pipeline"],
    features: ["支持 PDF/DOCX/PPT 等多格式解析", "按标题层级智能切片", "输出纯净 Markdown 与 JSON"],
    links: [
      { label: "MinerU 主仓库", url: "https://github.com/opendatalab/MinerU" },
    ],
  },
  {
    id: "dify",
    name: "Dify",
    description: "官方推荐插件，助力开发者快速构建基于高保真结构化文档的 RAG 应用。支持 MinerU 官方 API 与本地部署双模式，可解析 PDF、DOC、PPT、图片等多种格式，输出 Markdown、JSON、HTML、LaTeX 等多种格式。",
    highlight: "官方插件集成",
    logo: lobe("dify"),
    tags: ["Dify Plugin", "API + 本地部署", "多格式导出"],
    features: ["支持 MinerU 官方 API 与本地部署", "解析 PDF/DOC/PPT/图片等 8 种格式", "导出 Markdown、HTML、LaTeX 等格式"],
    links: [
      { label: "MinerU 官方插件", url: "https://github.com/langgenius/dify-official-plugins/tree/main/tools/mineru" },
    ],
    guideLabel: "GitHub",
    guideUrl: "https://github.com/langgenius/dify-official-plugins/tree/main/tools/mineru",
  },
  {
    id: "ragflow",
    name: "RAGFlow",
    description: "平台内置预处理引擎，攻克多模态文档切片（Chunking）难题，保障 RAG 效果。从 v0.22.0 起内置 MinerU 作为可选 PDF 解析器，支持 pipeline、VLM 等多种后端模式。",
    highlight: "平台内置引擎",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/ragflow-logo_47220700.jpg",
    tags: ["内置解析器", "v0.22.0+", "多后端模式"],
    features: ["内置 MinerU 作为可选 PDF 解析器", "支持 pipeline / VLM 多种后端", "精准物理与逻辑版面分析"],
    links: [
      { label: "RAGFlow 仓库", url: "https://github.com/infiniflow/ragflow" },
      { label: "解析器配置文档", url: "https://ragflow.io/docs/select_pdf_parser" },
    ],
    guideLabel: "配置文档",
    guideUrl: "https://ragflow.io/docs/select_pdf_parser",
  },
  {
    id: "flowise",
    name: "Flowise",
    description: "提供开箱即用的拖拽式 Document Loader 节点，极速赋予 Agent 阅读复杂文档的能力。零代码即可完成文档解析工作流搭建，适合非技术背景用户快速上手。",
    highlight: "零代码拖拽接入",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/flowise-logo_c7ff8541.jpg",
    tags: ["拖拽式工作流", "零代码", "Document Loader"],
    features: ["拖拽式可视化工作流搭建", "内置 Document Loader 节点", "支持与向量数据库无缝对接"],
    links: [
      { label: "Flowise 仓库", url: "https://github.com/FlowiseAI/Flowise" },
    ],
    guideLabel: "GitHub",
    guideUrl: "https://github.com/FlowiseAI/Flowise",
  },
];

/* ─── Module: CLI/SDK ─── */
export const cliSdkGroups: CLICommandGroup[] = [
  {
    id: "mineru-cli",
    title: "Open API CLI",
    description: "通过命令行快速调用 MinerU Open API，支持文件解析、格式转换等核心功能。",
    tabs: [
      {
        label: "Mac & Linux",
        commands: [
          {
            description: "安装 MinerU CLI",
            code: "pip install mineru-cli"
          },
          {
            description: "解析 PDF 文件为 Markdown",
            code: "mineru parse --input sample.pdf --output result.md"
          },
          {
            description: "批量解析目录下所有文档",
            code: "mineru parse --input ./docs/ --output ./results/ --format markdown"
          },
          {
            description: "使用 VLM 模型解析（高精度模式）",
            code: "mineru parse --input sample.pdf --model vlm --output result.md"
          }
        ]
      },
      {
        label: "Windows",
        commands: [
          {
            description: "安装 MinerU CLI",
            code: "pip install mineru-cli"
          },
          {
            description: "解析 PDF 文件为 Markdown",
            code: "mineru parse --input sample.pdf --output result.md"
          },
          {
            description: "批量解析目录下所有文档",
            code: "mineru parse --input .\\docs\\ --output .\\results\\ --format markdown"
          },
          {
            description: "使用 VLM 模型解析（高精度模式）",
            code: "mineru parse --input sample.pdf --model vlm --output result.md"
          }
        ]
      }
    ]
  },
  {
    id: "mineru-api",
    title: "Open API",
    description: "通过 HTTP API 直接调用 MinerU 解析服务，适用于集成到自有系统或工作流中。",
    tabs: [
      {
        label: "Python",
        commands: [
          {
            description: "创建解析任务",
            code: `import requests\n\ntoken = "YOUR_TOKEN"\nurl = "https://mineru.net/api/v4/extract/task"\nheader = {\n    "Content-Type": "application/json",\n    "Authorization": f"Bearer {token}"\n}\ndata = {\n    "url": "https://example.com/sample.pdf",\n    "model_version": "vlm"\n}\nres = requests.post(url, headers=header, json=data)\nprint(res.json())`
          },
          {
            description: "查询任务结果",
            code: `import requests\n\ntoken = "YOUR_TOKEN"\ntask_id = "YOUR_TASK_ID"\nurl = f"https://mineru.net/api/v4/extract/task/{task_id}"\nheader = {\n    "Content-Type": "application/json",\n    "Authorization": f"Bearer {token}"\n}\nres = requests.get(url, headers=header)\nprint(res.json())`
          },
          {
            description: "批量文件解析",
            code: `import requests\n\ntoken = "YOUR_TOKEN"\nurl = "https://mineru.net/api/v4/extract/task/batch"\nheader = {\n    "Content-Type": "application/json",\n    "Authorization": f"Bearer {token}"\n}\ndata = {\n    "files": [\n        {"url": "https://example.com/doc1.pdf"},\n        {"url": "https://example.com/doc2.pdf"}\n    ],\n    "model_version": "vlm"\n}\nres = requests.post(url, headers=header, json=data)\nprint(res.json())`
          }
        ]
      },
      {
        label: "GO",
        commands: [
          {
            description: "创建解析任务",
            code: `package main\n\nimport (\n    "bytes"\n    "encoding/json"\n    "fmt"\n    "net/http"\n    "io"\n)\n\nfunc main() {\n    url := "https://mineru.net/api/v4/extract/task"\n    data := map[string]string{\n        "url": "https://example.com/sample.pdf",\n        "model_version": "vlm",\n    }\n    body, _ := json.Marshal(data)\n    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(body))\n    req.Header.Set("Authorization", "Bearer YOUR_TOKEN")\n    req.Header.Set("Content-Type", "application/json")\n    client := &http.Client{}\n    resp, _ := client.Do(req)\n    defer resp.Body.Close()\n    result, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(result))\n}`
          },
          {
            description: "查询任务结果",
            code: `package main\n\nimport (\n    "fmt"\n    "net/http"\n    "io"\n)\n\nfunc main() {\n    taskID := "YOUR_TASK_ID"\n    url := fmt.Sprintf("https://mineru.net/api/v4/extract/task/%s", taskID)\n    req, _ := http.NewRequest("GET", url, nil)\n    req.Header.Set("Authorization", "Bearer YOUR_TOKEN")\n    client := &http.Client{}\n    resp, _ := client.Do(req)\n    defer resp.Body.Close()\n    result, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(result))\n}`
          }
        ]
      },
      {
        label: "JavaScript / TypeScript",
        commands: [
          {
            description: "创建解析任务",
            code: `const res = await fetch("https://mineru.net/api/v4/extract/task", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer YOUR_TOKEN",\n    "Content-Type": "application/json",\n  },\n  body: JSON.stringify({\n    url: "https://example.com/sample.pdf",\n    model_version: "vlm",\n  }),\n});\nconst data = await res.json();\nconsole.log(data);`
          },
          {
            description: "查询任务结果",
            code: `const taskId = "YOUR_TASK_ID";\nconst res = await fetch(\n  \`https://mineru.net/api/v4/extract/task/\${taskId}\`,\n  {\n    headers: { "Authorization": "Bearer YOUR_TOKEN" },\n  }\n);\nconst data = await res.json();\nconsole.log(data);`
          },
          {
            description: "批量文件解析",
            code: `const res = await fetch("https://mineru.net/api/v4/extract/task/batch", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer YOUR_TOKEN",\n    "Content-Type": "application/json",\n  },\n  body: JSON.stringify({\n    files: [\n      { url: "https://example.com/doc1.pdf" },\n      { url: "https://example.com/doc2.pdf" },\n    ],\n    model_version: "vlm",\n  }),\n});\nconst data = await res.json();\nconsole.log(data);`
          }
        ]
      }
    ]
  }
];

/* ─── MCP Client Data ─── */
export const mcpClientData: MCPClientData = {
  title: "MCP Server",
  description: "MinerU Model Context Protocol (MCP) Server：大模型客户端与 MinerU 的桥梁，实现参数化、结构化文档解析。",
  subtitle: "支持 Cursor、Claude Desktop、Windsurf 等主流大模型客户端，通过标准 MCP 协议无缝调用 MinerU 解析服务。",
  workflowSteps: [
    { step: "用户指令", detail: "在大模型客户端输入自然语言，如'解析这份 PDF 的第 3-5 页'", icon: "message" },
    { step: "参数解析", detail: "大模型将指令拆解为结构化参数：路径、页码、格式等", icon: "cpu" },
    { step: "MCP 调用", detail: "参数通过 MCP 协议传递给 MinerU Server 执行解析", icon: "server" },
    { step: "结果返回", detail: "结构化 Markdown / JSON 结果返回至大模型客户端", icon: "check" },
  ],
  integrations: [
    {
      label: "Cursor 集成",
      description: "在 Cursor 的 MCP 配置文件中添加 MinerU MCP Server：",
      lang: "json",
      code: `{\n  "mcpServers": {\n    "mineru": {\n      "command": "uvx",\n      "args": [\n        "mineru-mcp"\n      ],\n      "env": {\n        "MINERU_API_KEY": "YOUR_API_KEY"\n      }\n    }\n  }\n}`,
    },
    {
      label: "通用集成",
      description: "适用于任何支持 MCP 协议的大模型客户端（Claude Desktop、Windsurf 等）：",
      lang: "bash",
      code: `# 安装 MinerU MCP Server\npip install mineru-mcp\n\n# 启动 MCP Server（stdio 模式）\nmineru-mcp --api-key YOUR_API_KEY\n\n# 或通过环境变量配置\nexport MINERU_API_KEY="YOUR_API_KEY"\nmineru-mcp`,
    },
  ],
};

/* ─── Module 3: 应用与工作流 ─── */
export const appWorkflows: AppItem[] = [
  {
    id: "coze",
    name: "Coze",
    description: "以官方插件无缝接入智能体，赋予大模型直接阅读复杂排版文档的能力。支持 PDF、图片、网页等多格式解析，一键生成结构化知识。",
    highlight: "官方插件 + 智能体",
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
    description: "提供自动化专属节点，融入无人值守的高频工作流。支持批量文档处理与免登录调用，适合企业级文档数字化自动化流水线。",
    highlight: "自动化工作流节点",
    logo: lobe("n8n"),
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/n8n/",
    links: [
      { label: "MinerU 官方插件", url: "https://www.npmjs.com/package/n8n-nodes-mineru" },
    ],
  },
  {
    id: "fastgpt",
    name: "FastGPT",
    description: "原生集成至平台工具链，为知识库提供纯净 Markdown 文本，显著提升检索精度与问答质量。支持自动文档分块与索引构建。",
    highlight: "知识库原生集成",
    logo: lobe("fastgpt"),
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/FastGPT/",
    links: [
      { label: "MinerU 官方插件", url: "https://cloud.fastgpt.io/dashboard/systemPlugin?type=tools" },
    ],
  },
  {
    id: "dingtalk",
    name: "钉钉",
    description: "基于 MinerU 打造企业级解析工具，提供高精度的多模态文档数字化与结构化方案。支持合同、发票、报告等企业文档的智能提取。",
    highlight: "企业级文档数字化",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/dingtalk-logo_f83f9ed8.jpg",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/DingTalk/",
  },
  {
    id: "cherrystudio",
    name: "Cherry Studio",
    description: "深度对接大模型对话交互，精准提取图表与公式，消除 AI 对复杂数据的幻觉。支持论文、技术文档的结构化解析与知识问答。",
    highlight: "大模型对话增强",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/cherry-studio-logo_32366999.jpg",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/Cherry_Studio/",
  },
  {
    id: "hejing",
    name: "和鲸科学平台",
    description: "接入平台智能工具模块，为科研模型与 Agent 提供高精度的论文与公式解析支持。助力学术研究中的文献综述与数据提取自动化。",
    highlight: "科研论文解析",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/heywhale-logo_835dc2d9.png",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/ModelWhale/",
  },
  {
    id: "sider",
    name: "Sider",
    description: "深度集成至 Wisebase 知识库，为多模态智能问答提供极速、无损的文档结构化转换。支持浏览器侧边栏一键解析网页与文档。",
    highlight: "浏览器侧边栏集成",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/sider-logo_d51d9ab0.jpg",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/Sider/",
  },
  {
    id: "smartdata",
    name: "智能数据平台",
    description: "原生集成至核心知识库，自动化处理海量多模态文档，输出标准机器可读数据。支持批量文档的结构化转换与数据治理流程。",
    highlight: "数据治理自动化",
    logo: "",
    logoFallback: "#8B5CF6",
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/DataFlow/",
  },

];
