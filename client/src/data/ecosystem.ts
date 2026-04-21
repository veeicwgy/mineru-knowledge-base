/*
 * MinerU 知识库站点数据
 * 目标：只保留可核验的官方信息，或明确标注来自训练营课件的补充信息。
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
  fullCode?: string;
  guideLabel?: string;
  guideUrl?: string;
  tags?: string[];
  links?: { label: string; url: string }[];
  features?: string[];
  comingSoon?: boolean;
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

export interface CLICommandGroup {
  id: string;
  title: string;
  description: string;
  tabs: { label: string; commands: { description: string; code: string }[] }[];
}

/* ─── Constants ─── */
const lobe = (slug: string) =>
  `https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/${slug}.png`;

const repoDocs = "https://github.com/veeicwgy/wss-prd-1/blob/main/docs";

/* ─── Module 1: Agent Skills ─── */
export const agentSkills: SkillItem[] = [
  {
    id: "openclaw",
    name: "OpenClaw / ClawHub",
    description:
      "MinerU 当前最明确的 Skill 入口。可通过官方 Skill 页面把文档解析能力接入支持 Skill 的 Agent 工作流，适合自然语言调用文档解析。",
    highlight: "官方 Skill 页面",
    logo: lobe("openclaw"),
    tags: ["Skill", "自然语言调用", "官方页面"],
    installCmd: "https://clawhub.ai/MinerU-Extract/mineru-ai",
    registry: "ClawHub",
  },
  {
    id: "zeroclaw",
    name: "ZeroClaw",
    description:
      "MinerU-Ecosystem README 与训练营课件都提到 ZeroClaw 等支持技能接口的 AI Agent 可复用同一 MinerU Skill 资源包。",
    highlight: "兼容 Skill 接口",
    logo: "",
    logoFallback: "#E44D26",
    tags: ["Agent", "Skill", "兼容平台"],
    installCmd: "https://cdn-mineru.openxlab.org.cn/open-api-cli/skill.zip",
    registry: "技能资源包",
  },
  {
    id: "nanobot",
    name: "Nanobot",
    description:
      "训练营资料中提到的支持平台之一，适合把 MinerU 解析能力接入到对话式 Agent 和自动化工作流中。",
    highlight: "课件补充信息",
    logo: "",
    logoFallback: "#3776AB",
    tags: ["Agent", "工作流", "训练营资料"],
    installCmd: "https://clawhub.ai/MinerU-Extract/mineru-ai",
    registry: "训练营课件",
  },
  {
    id: "nanoclaw",
    name: "NanoClaw",
    description:
      "训练营资料提到的 TypeScript / Agent 场景入口，可视为 MinerU Skill 在轻量 Agent 框架中的复用面。",
    highlight: "TypeScript 场景",
    logo: "",
    logoFallback: "#3178C6",
    tags: ["TypeScript", "Agent", "训练营资料"],
    installCmd: "https://clawhub.ai/MinerU-Extract/mineru-ai",
    registry: "训练营课件",
  },
  {
    id: "picoclaw",
    name: "PicoClaw",
    description:
      "训练营资料提到的 Go / 服务编排场景入口，适合补充理解 MinerU Skill 在多种 Agent 平台中的可迁移性。",
    highlight: "Go 场景",
    logo: "",
    logoFallback: "#00ADD8",
    tags: ["Go", "Agent", "训练营资料"],
    installCmd: "https://clawhub.ai/MinerU-Extract/mineru-ai",
    registry: "训练营课件",
  },
];

/* ─── Examples ─── */
export const codeExamples: CodeExample[] = [
  {
    label: "Python SDK",
    lang: "python",
    code: `from mineru import MinerU

client = MinerU()
result = client.flash_extract("https://cdn-mineru.openxlab.org.cn/demo/example.pdf")
print(result.markdown)`,
  },
  {
    label: "TypeScript SDK",
    lang: "typescript",
    code: `import { MinerU } from "mineru-open-sdk";

const client = new MinerU();
const result = await client.flashExtract(
  "https://cdn-mineru.openxlab.org.cn/demo/example.pdf"
);
console.log(result.markdown);`,
  },
];

/* ─── FAQ ─── */
export const faqCategories: FAQCategory[] = [
  {
    title: "模式与额度",
    items: [
      {
        q: "在线 API 的轻量模式和精准模式怎么区分？",
        a: "轻量模式无需 Token，按 IP 限频，适合 Agent 即调即用；精准模式需要 Token，支持更完整的输出和批量处理。当前官方 live docs 显示：精准模式上限为 200MB / 200 页，轻量模式上限为 10MB / 20 页。",
      },
      {
        q: "为什么有的资料写 200 页，有的资料写 600 页？",
        a: "这是版本漂移。官方 llms.txt 和部分历史课件曾写过 600 页，但 2026-04-21 核对 live docs 时，官方 API 文档页面显示当前上限为 200 页。对外发布时建议以 live docs 为准。",
      },
      {
        q: "免费额度到底该看哪个数？",
        a: "当前官方 API 文档页面写的是“每个账号每天享有 1000 页高优先级解析额度”。历史课件里出现过 2000 页说法，因此知识库里保留了差异记录，但对外使用建议优先引用官方实时页面。",
      },
    ],
  },
  {
    title: "部署与接入",
    items: [
      {
        q: "什么时候该选开源版，什么时候该选在线 API？",
        a: "数据不能上云、需要私有化或想做深度二开时优先开源版；想快速验证、批量集成或给业务系统调用时优先在线 API / CLI / SDK。",
      },
      {
        q: "CLI、SDK、MCP 三者怎么选？",
        a: "CLI 适合命令行和脚本；SDK 适合集成进服务或业务代码；MCP 适合 Cursor、Claude Desktop、Windsurf 等 AI 客户端直接调用。",
      },
      {
        q: "MCP 一定要配置 Token 吗？",
        a: "不一定。官方 `mineru-open-mcp` 支持不带 Token 的轻量模式；如果需要精准解析、长文档或更完整能力，再配置 `MINERU_API_TOKEN`。",
      },
    ],
  },
  {
    title: "结果与工作流",
    items: [
      {
        q: "为什么任务状态里会看到 pending、running、converting？",
        a: "这是正常异步流程。课件和文档中常见状态包括 waiting-file、uploading、pending、running、converting、done、failed，适合直接写进排障手册或集成文档。",
      },
      {
        q: "MinerU 适合做 RAG 吗？",
        a: "适合。官方生态仓库明确提供 LangChain 和 LlamaIndex 入口，同时文档与 llms.txt 也列出了 Dify、FastGPT、RAGFlow 等知识库或工作流集成。",
      },
      {
        q: "MinerU 只能处理 PDF 吗？",
        a: "不是。当前官方资料覆盖 PDF、图片、Word、PPT、HTML 等输入类型；其中 MinerU-HTML 专门面向网页正文提取。",
      },
    ],
  },
];

/* ─── Module 2: RAG / Knowledge Base ─── */
export const ragFrameworks: RAGItem[] = [
  {
    id: "langchain",
    name: "LangChain",
    description:
      "官方生态仓库提供 `langchain-mineru`，可把文档直接转成 LangChain `Document`，适合 RAG、检索和切分工作流。",
    highlight: "官方 LangChain Loader",
    logo: lobe("langchain"),
    code: "pip install langchain-mineru",
    fullCode: `from langchain_mineru import MinerULoader

loader = MinerULoader(source="demo.pdf")
docs = loader.load()
print(docs[0].page_content[:500])
print(docs[0].metadata)`,
    links: [
      { label: "Ecosystem 仓库", url: "https://github.com/opendatalab/MinerU-Ecosystem/tree/main/langchain_mineru" },
      { label: "官方 README", url: "https://github.com/opendatalab/MinerU-Ecosystem" },
    ],
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    description:
      "社区 Reader 入口 `llama-index-readers-mineru`，适合把 PDF、Word、PPT、图片、Excel 等直接转成 LlamaIndex `Document`。",
    highlight: "LlamaIndex Reader",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/OIAuZUevLz4P_a7495a83.png",
    code: "pip install llama-index-readers-mineru",
    fullCode: `from llama_index.readers.mineru import MinerUReader

reader = MinerUReader(split_pages=True)
documents = reader.load_data("/path/to/paper.pdf")

print(documents[0].text[:500])
print(documents[0].metadata)`,
    links: [
      { label: "Reader 仓库", url: "https://github.com/opendatalab/MinerU-Ecosystem/tree/main/llama-index-readers-mineru" },
      { label: "官方 README", url: "https://github.com/opendatalab/MinerU-Ecosystem" },
    ],
  },
  {
    id: "dify",
    name: "Dify",
    description:
      "官方 llms.txt 明确列出的 Dify 插件入口，适合把 MinerU 作为文档解析步骤接入知识库和工作流编排。",
    highlight: "官方插件",
    logo: lobe("dify"),
    links: [
      { label: "插件市场", url: "https://marketplace.dify.ai/plugins/langgenius/mineru" },
      { label: "官方资料", url: "https://mineru.net/llms.txt" },
    ],
  },
  {
    id: "fastgpt",
    name: "FastGPT",
    description:
      "官方资料明确列出的知识库集成入口，适合把 MinerU 作为复杂文档解析层，为 FastGPT 提供更干净的 Markdown / 结构化结果。",
    highlight: "知识库集成",
    logo: lobe("fastgpt"),
    links: [
      { label: "官方文档", url: "https://opendatalab.github.io/MinerU/zh/usage/plugin/FastGPT/" },
      { label: "llms.txt", url: "https://mineru.net/llms.txt" },
    ],
  },
  {
    id: "ragflow",
    name: "RAGFlow",
    description:
      "官方资料明确列出的文档解析集成入口，适合在多文档知识库和企业问答场景中复用 MinerU 的结构化输出。",
    highlight: "RAG 工作流",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/ragflow-logo_47220700.jpg",
    links: [
      { label: "官方文档", url: "https://opendatalab.github.io/MinerU/zh/usage/plugin/RagFlow/" },
      { label: "llms.txt", url: "https://mineru.net/llms.txt" },
    ],
  },
];

/* ─── Module 3: CLI / SDK / HTTP API ─── */
export const cliSdkGroups: CLICommandGroup[] = [
  {
    id: "open-api-cli",
    title: "Open API CLI",
    description: "官方命令行入口，适合快速体验、脚本批处理和轻量自动化。",
    tabs: [
      {
        label: "Mac & Linux",
        commands: [
          {
            description: "安装 CLI",
            code: "curl -fsSL https://cdn-mineru.openxlab.org.cn/open-api-cli/install.sh | sh",
          },
          {
            description: "免登录轻量解析",
            code: "mineru-open-api flash-extract report.pdf",
          },
          {
            description: "登录后精准解析",
            code: "mineru-open-api auth && mineru-open-api extract report.pdf",
          },
          {
            description: "导出多格式结果",
            code: "mineru-open-api extract report.pdf -f docx,latex,html -o ./results/",
          },
        ],
      },
      {
        label: "Windows",
        commands: [
          {
            description: "安装 CLI",
            code: "irm https://cdn-mineru.openxlab.org.cn/open-api-cli/install.ps1 | iex",
          },
          {
            description: "免登录轻量解析",
            code: "mineru-open-api flash-extract report.pdf",
          },
          {
            description: "网页抽取",
            code: "mineru-open-api crawl https://mineru.net -o ./results/",
          },
          {
            description: "批量解析",
            code: "mineru-open-api extract *.pdf -o ./results/",
          },
        ],
      },
    ],
  },
  {
    id: "sdk",
    title: "SDK",
    description: "官方生态仓库提供 Python、Go、TypeScript 三种常用语言 SDK。",
    tabs: [
      {
        label: "Python",
        commands: [
          {
            description: "安装 Python SDK",
            code: "pip install mineru-open-sdk",
          },
          {
            description: "免 Token 轻量解析",
            code: 'from mineru import MinerU\\n\\nclient = MinerU()\\nresult = client.flash_extract("https://cdn-mineru.openxlab.org.cn/demo/example.pdf")\\nprint(result.markdown)',
          },
          {
            description: "Token 精准解析",
            code: 'from mineru import MinerU\\n\\nclient = MinerU("your-api-token")\\nresult = client.extract("https://cdn-mineru.openxlab.org.cn/demo/example.pdf")\\nprint(result.markdown)',
          },
        ],
      },
      {
        label: "Go",
        commands: [
          {
            description: "安装 Go SDK",
            code: "go get github.com/opendatalab/MinerU-Ecosystem/sdk/go@latest",
          },
          {
            description: "创建轻量解析客户端",
            code: 'client := mineru.NewFlash()',
          },
          {
            description: "创建精准解析客户端",
            code: 'client, err := mineru.New("your-api-token")',
          },
        ],
      },
      {
        label: "TypeScript",
        commands: [
          {
            description: "安装 TypeScript SDK",
            code: "npm install mineru-open-sdk",
          },
          {
            description: "轻量解析",
            code: 'const client = new MinerU();\\nconst result = await client.flashExtract("https://cdn-mineru.openxlab.org.cn/demo/example.pdf");',
          },
          {
            description: "精准解析",
            code: 'const client = new MinerU("your-api-token");\\nconst result = await client.extract("./paper.pdf", { model: "vlm", extraFormats: ["docx"] });',
          },
        ],
      },
    ],
  },
  {
    id: "http-api",
    title: "HTTP API",
    description: "适合直接接入业务系统、工作流平台和自有服务。",
    tabs: [
      {
        label: "Precision API",
        commands: [
          {
            description: "提交精准解析任务",
            code: "curl -X POST https://mineru.net/api/v4/extract/task \\\n  -H 'Authorization: Bearer YOUR_TOKEN' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"url\":\"https://example.com/sample.pdf\",\"model_version\":\"vlm\"}'",
          },
          {
            description: "查询任务结果",
            code: "curl -H 'Authorization: Bearer YOUR_TOKEN' \\\n  https://mineru.net/api/v4/extract/task/YOUR_TASK_ID",
          },
        ],
      },
      {
        label: "Agent API",
        commands: [
          {
            description: "URL 轻量解析",
            code: "curl -X POST https://mineru.net/api/v1/agent/parse/url \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"url\":\"https://cdn-mineru.openxlab.org.cn/demo/example.pdf\"}'",
          },
          {
            description: "提醒：当前 live docs 限制",
            code: "轻量模式 <= 10MB / 20 页；精准模式 <= 200MB / 200 页",
          },
        ],
      },
    ],
  },
];

/* ─── MCP ─── */
export const mcpClientData: MCPClientData = {
  title: "MCP Server",
  description:
    "官方 `mineru-open-mcp` 让 Cursor、Claude Desktop、Windsurf 等 MCP 兼容客户端直接调用 MinerU。",
  subtitle:
    "默认可走免登录轻量模式；需要更高精度、长文档或更完整输出时，再配置 `MINERU_API_TOKEN`。",
  workflowSteps: [
    { step: "用户提问", detail: "在 AI 客户端里直接描述要解析的文档任务，例如“提取这份 PDF 的表格”。", icon: "message" },
    { step: "工具选择", detail: "客户端通过 MCP 调用 MinerU 的解析工具，而不是把文件内容硬塞进对话上下文。", icon: "cpu" },
    { step: "执行解析", detail: "MinerU 负责文档解析、OCR、结构化输出和结果文件落盘。", icon: "server" },
    { step: "结果回流", detail: "Markdown / JSON / 下载路径等结果返回到 AI 客户端，继续完成后续任务。", icon: "check" },
  ],
  integrations: [
    {
      label: "Cursor / Claude Desktop",
      description: "官方推荐的本地 `uvx` 启动方式：",
      lang: "json",
      code: `{
  "mcpServers": {
    "mineru": {
      "command": "uvx",
      "args": ["mineru-open-mcp"],
      "env": {
        "MINERU_API_TOKEN": "your token"
      }
    }
  }
}`,
    },
    {
      label: "Streamable HTTP",
      description: "适合 Web MCP 客户端，或先在本地起一个 HTTP MCP 服务：",
      lang: "bash",
      code: `MINERU_API_TOKEN=your-token mineru-open-mcp --transport streamable-http --port 8001

# 远端 SaaS MCP
https://mcp.mineru.net/mcp`,
    },
  ],
};

/* ─── Module 4: 应用与工作流 ─── */
export const appWorkflows: AppItem[] = [
  {
    id: "web",
    name: "在线体验页",
    description:
      "最适合第一次感受解析效果。上传一份真实 PDF，快速建立对版面解析、表格、公式和结构化输出的直觉。",
    highlight: "零安装起步",
    logo: "",
    logoFallback: "#2563EB",
    guideUrl: "https://mineru.net/OpenSourceTools/Extractor",
    links: [{ label: "立即体验", url: "https://mineru.net/OpenSourceTools/Extractor" }],
  },
  {
    id: "client",
    name: "桌面客户端",
    description:
      "适合非技术同学、产品经理、运营或老师等角色，用拖拽方式完成本地文档解析与导出。",
    highlight: "图形界面",
    logo: "",
    logoFallback: "#0F766E",
    guideUrl: "https://mineru.net/client",
    links: [{ label: "客户端下载", url: "https://mineru.net/client" }],
  },
  {
    id: "kie",
    name: "KIE 文档智能抽取",
    description:
      "你提供的内部使用指引显示，MinerU 已经延伸到文档智能抽取流程，支持解析、分割、抽取三段式组合，适合发票、票据、表单和合同字段提取。",
    highlight: "结构化抽取",
    logo: "",
    logoFallback: "#7C3AED",
    guideUrl: `${repoDocs}/08-kie-guide.md`,
    links: [{ label: "整理版指引", url: `${repoDocs}/08-kie-guide.md` }],
  },
  {
    id: "coze",
    name: "Coze",
    description:
      "官方资料明确列出的插件入口，适合把 MinerU 文档解析能力接入智能体工作流。",
    highlight: "官方插件",
    logo: lobe("coze"),
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/Coze/",
    links: [
      { label: "官方文档", url: "https://opendatalab.github.io/MinerU/zh/usage/plugin/Coze/" },
      { label: "插件页", url: "https://www.coze.cn/store/plugin/7527957359730360354" },
    ],
  },
  {
    id: "n8n",
    name: "n8n",
    description:
      "适合自动化场景，把文档解析放进无人值守流程，如收件箱处理、归档、知识库更新和报表生成。",
    highlight: "自动化节点",
    logo: lobe("n8n"),
    guideUrl: "https://opendatalab.github.io/MinerU/zh/usage/plugin/n8n/",
    links: [
      { label: "官方文档", url: "https://opendatalab.github.io/MinerU/zh/usage/plugin/n8n/" },
      { label: "npm 包", url: "https://www.npmjs.com/package/n8n-nodes-mineru" },
    ],
  },
  {
    id: "feishu-kb",
    name: "飞书知识库沉淀",
    description:
      "训练营课件中的典型工作流：把值得保存的网页或文档通过 MinerU 解析后沉淀到飞书知识库，适合内容运营和研究资料管理。",
    highlight: "业务工作流",
    logo: "",
    logoFallback: "#3B82F6",
    guideUrl: `${repoDocs}/03-api-and-ecosystem.md`,
    links: [{ label: "知识库说明", url: `${repoDocs}/03-api-and-ecosystem.md` }],
  },
  {
    id: "invoice",
    name: "发票批量提取",
    description:
      "训练营课件中的第二个典型工作流：MinerU SDK 先提取发票内容，再交给 LLM 做字段结构化，最终写入 Excel。",
    highlight: "票据结构化",
    logo: "",
    logoFallback: "#F59E0B",
    guideUrl: `${repoDocs}/03-api-and-ecosystem.md`,
    links: [{ label: "工作流说明", url: `${repoDocs}/03-api-and-ecosystem.md` }],
  },
];
