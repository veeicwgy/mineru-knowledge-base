# MinerU 概览与选型

## 一句话定义

`MinerU` 是 OpenDataLab 推出的文档解析平台，核心能力是把 PDF、Word、PPT、图片、HTML 等非结构化内容转换成更适合大模型、RAG 和自动化流程消费的结构化结果，例如 Markdown、JSON、LaTeX 和 HTML。

## 核心价值

- 复杂版面解析：多栏论文、表格、公式、扫描件、图文混排
- 面向 LLM：输出结果更适合检索、切分、RAG 和 Agent 工作流
- 同时覆盖开源部署与在线服务：既能本地私有化，也能快速云端调用
- 生态完整：CLI、SDK、MCP、LangChain、LlamaIndex、Dify、FastGPT、RAGFlow 等

## 产品矩阵

### 1. 本地部署

- `MinerU` 开源版
  适合私有化、离线、合规场景，也适合技术团队二次开发
- `MinerU-HTML`
  面向网页正文提取，适合网页语料清洗、训练数据构建、HTML 转结构化文本

### 2. 在线服务

- 在线体验页
  适合首次体验解析效果、给非技术同学建立直觉
- 桌面客户端
  适合零代码拖拽解析、办公和轻量生产
- 在线 API
  适合系统集成、批量处理、Agent 调用和自动化工作流

### 3. 生态工具

- CLI
- Python / Go / TypeScript SDK
- MCP Server
- LangChain / LlamaIndex
- Dify / FastGPT / RAGFlow / Coze / n8n 等生态集成

## 典型使用场景

| 场景 | 推荐入口 | 说明 |
|---|---|---|
| 我只想先看效果 | 在线体验页 / 桌面客户端 | 最快建立认知 |
| 我需要私有化部署 | 开源版 MinerU | 数据不出本地 |
| 我需要批量解析论文、报告、票据 | 在线 API 精准模式 / 开源版 | 更适合批处理与结构化输出 |
| 我需要在 Agent 里即调即用 | Agent 轻量解析 API / Skill / MCP | 上手快 |
| 我做 RAG / 知识库 | LangChain / LlamaIndex / Dify / FastGPT / RAGFlow | 直接接入上下游 |
| 我处理网页语料 | MinerU-HTML | 专门针对 HTML 正文抽取 |

## 快速选型

| 你的约束 | 优先选择 |
|---|---|
| 数据不能上云 | 本地开源部署 |
| 不想配环境，也不想写代码 | 在线体验页 / 桌面客户端 |
| 想在业务系统里调用 | 在线 API / SDK |
| 想在 Cursor、Claude Desktop 里直接用 | MCP Server |
| 想做 RAG 知识库 | LangChain / LlamaIndex / Dify / FastGPT / RAGFlow |
| 想做网页语料清洗 | MinerU-HTML |

## 面向外部写作时可以稳定使用的表述

- MinerU 是一个文档解析平台，不只是 PDF 转 Markdown 小工具
- 它同时覆盖开源部署、在线 API、桌面客户端和生态工具
- 其主要价值是把复杂文档转换成更适合大模型和自动化流程使用的结构化结果
- 对 RAG、Agent、知识库、批量文档处理和科研/企业文档场景都比较友好

## 容易写错的点

- 不要把 `MinerU` 只写成“PDF 转 Markdown”工具
- 不要把在线 API 和开源版混成一个产品
- 不要把所有生态集成都说成“官方原生内置”，有些是官方仓库提供，有些是文档支持或社区集成
- 不要把历史课件中的额度和页数限制直接写死为最新事实，先看 live docs

## 关键链接

- 官网：`https://mineru.net/`
- 开源仓库：`https://github.com/opendatalab/MinerU`
- 生态仓库：`https://github.com/opendatalab/MinerU-Ecosystem`
- API 文档：`https://mineru.net/apiManage/docs`
- 官方 `llms.txt`：`https://mineru.net/llms.txt`
