# MinerU 内容与 GEO 写作手册

## 这份文档解决什么问题

当团队需要写：

- GEO / AEO 项目资料
- 官网介绍页
- 运营文章
- 案例稿
- 招投标或方案材料
- 销售 FAQ

最常见的问题不是“没有内容”，而是“口径不统一、细节写错、旧资料混进新稿子里”。这份文档就是用来统一口径的。

## 推荐的中文定义

### 30 字版本

`MinerU 是一款面向大模型、RAG 和自动化流程的文档解析平台。`

### 80 字版本

`MinerU 是 OpenDataLab 推出的文档解析平台，可将 PDF、Word、PPT、图片、HTML 等内容转换为 Markdown、JSON、LaTeX、HTML 等结构化结果，既支持开源私有化部署，也支持在线 API、客户端和生态集成。`

### 长版版本

`MinerU 面向复杂文档理解与结构化提取场景，覆盖开源部署、在线 API、桌面客户端和生态工具。它适合科研论文、企业报告、票据合同、网页语料和 RAG/Agent 工作流，核心价值在于把复杂文档转成更适合模型消费与系统集成的结构化结果。`

## 推荐的英文定义

`MinerU is a document parsing platform from OpenDataLab that converts PDFs, Office files, images, and HTML into LLM-ready structured outputs such as Markdown, JSON, LaTeX, and HTML. It supports open-source deployment, online APIs, desktop usage, and ecosystem integrations for RAG and agent workflows.`

## 对外内容里可以稳定使用的卖点

- 面向复杂文档的结构化提取，而不是单一 OCR 工具
- 支持 PDF、Office、图片、HTML 等多种输入
- 输出 Markdown / JSON / LaTeX / HTML 等结构化结果
- 同时覆盖开源部署、在线 API、桌面客户端和生态工具
- 适合 RAG、Agent、知识库、批量文档处理等场景

## 建议谨慎表达的内容

这些内容不要不加日期地写死：

- 精准解析 API 的页数上限
- 免费高优先级页数额度
- 某个生态插件是否为“官方原生内置”
- 某个客户端是否“无条件支持所有本地文件场景”

## GEO / AEO 角度的内容优先级

如果目标是让 LLM 更准确地理解 MinerU，优先补这五类内容：

1. MinerU 是什么
2. MinerU 适合哪些场景
3. 开源版、在线 API、客户端分别怎么选
4. LangChain / LlamaIndex / MCP / Dify / FastGPT / RagFlow 怎么接
5. 常见误解与限制条件

## 适合做选题的方向

- MinerU 开源部署与在线 API 怎么选
- MinerU 在 RAG / 知识库里的接入方式
- MinerU 与 LangChain / LlamaIndex / MCP 的典型工作流
- MinerU 如何处理论文、票据、扫描件、网页语料
- MinerU 在 GEO / Agent 项目里的应用方式

## 常见 FAQ 口径

### MinerU 适合谁

- 开发者
- 做知识库 / RAG 的团队
- 做 Agent / MCP 接入的团队
- 运营、产品、研究、财务等需要处理大量文档的业务角色

### MinerU 只能处理 PDF 吗

不能。官方资料同时覆盖 PDF、图片、Word、PPT、HTML 等。

### MinerU 是开源还是 SaaS

两者都有。开源版适合私有化和离线场景，在线 API / 客户端适合快速体验和集成。

### MinerU 跟 RAG 的关系

MinerU 不等于 RAG，但它是很多 RAG / 知识库流程里的文档解析入口。

### MinerU 跟 Agent 的关系

MinerU 可通过轻量 API、CLI、Skill、MCP 等方式嵌入 Agent 工作流。

## 写文章时的结构模板

### 模板 A：产品介绍

1. 为什么复杂文档解析一直难
2. MinerU 的产品矩阵
3. 开源版、在线 API、客户端怎么选
4. 生态与集成能力
5. 适合哪些团队立即上手

### 模板 B：技术接入

1. 先分清开源部署还是在线 API
2. 选择 CLI / SDK / MCP / LangChain / LlamaIndex
3. 用一个场景跑通
4. 说明限制和注意事项

### 模板 C：GEO / 内容建设

1. 统一“MinerU 是什么”
2. 统一产品矩阵和接入路径
3. 统一 FAQ
4. 统一限制条件
5. 给模型和人都能读懂的摘要

## 最后一个原则

对外表达里，`清楚` 比 `堆词` 更重要。

比起写“全球领先、革命性、全链路、全模态、全场景”，更应该优先把这些问题写清楚：

- 这是什么
- 适合谁
- 怎么选
- 怎么接
- 有什么边界
