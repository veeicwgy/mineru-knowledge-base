# MinerU 名词表与实体关系

## 为什么这个文档很重要

MinerU 相关内容现在已经横跨产品、开源代码、模型、生态、SaaS、运营内容多个层面。

如果不先把名词关系讲清楚，团队最容易出现这些问题：

- 把 `magic-pdf` 当成对外产品名
- 把 `OpenDataLab`、`MinerU`、`MinerU-Ecosystem` 混成一个实体
- 把产品能力和底层模型能力写成同一层
- 把代码仓库许可证和模型许可证混在一起

## 最核心的 4 个名字

### 1. `OpenDataLab`

它是什么：

- 开发和维护 `MinerU` 的机构 / 团队主体口径
- 在对外介绍中，更适合写成开发方或维护方

适合怎么写：

- `MinerU 由 OpenDataLab 开发和维护`

不适合怎么写：

- `OpenDataLab 就是 MinerU`

### 2. `MinerU`

它是什么：

- 产品品牌名
- 也是官方主仓库名：`opendatalab/MinerU`
- 对外介绍时应该优先使用的名称

适合怎么写：

- `MinerU 是一个文档解析平台`
- `MinerU 支持开源部署、在线 API、客户端和生态工具`

不适合怎么写：

- `magic-pdf 是主要品牌名`

### 3. `magic-pdf`

它是什么：

- 历史和技术上下文中常见的 Python 包 / 导入名
- 更适合出现在安装、代码、兼容性说明里

当前建议理解：

- 对外品牌：优先使用 `MinerU`
- 技术上下文：可以说明 `magic-pdf` 是历史包名或底层 Python 包名语境

适合怎么写：

- `在代码或历史资料中，你可能仍会看到 magic-pdf 这一包名语境，但对外产品名称建议统一写 MinerU。`

### 4. `MinerU-Ecosystem`

它是什么：

- 官方生态仓库
- 主要承载 CLI、SDK、MCP、LangChain、LlamaIndex、skills 等接入层工具

更准确的理解：

- `MinerU` 主仓库偏开源引擎与部署
- `MinerU-Ecosystem` 偏 Open API 生态与接入工具

## 其他重要实体

### `MinerU-HTML`

- 不是普通 PDF 解析的别名
- 是面向网页正文提取的专门分支 / 模型方向
- 更适合网页语料清洗、HTML 主体提取

### `MinerU-Diffusion`

- 不是整个 MinerU 的同义词
- 更偏 OCR / 解码效率和研究创新方向
- 适合写研究突破、方法升级，不适合直接当产品总称

### `MinerU2.5` / `MinerU2.5-Pro-2604-1.2B`

- 属于底层主模型语境
- 更适合写成文档解析核心模型之一或当前主线 VLM
- 不等同于 MinerU 的全部能力

## 三层关系图

可以把 MinerU 相关概念粗分成三层：

### 第一层：品牌与产品层

- `OpenDataLab`
- `MinerU`
- 在线 API
- 桌面客户端
- 在线体验页

### 第二层：开源与生态层

- `opendatalab/MinerU`
- `opendatalab/MinerU-Ecosystem`
- CLI
- SDK
- MCP
- LangChain / LlamaIndex / Dify / FastGPT / RagFlow 等

### 第三层：底层模型与专项能力层

- `MinerU2.5`
- `MinerU2.5-Pro-2604-1.2B`
- `MinerU-Diffusion`
- `MinerU-HTML`
- KIE

## 最容易写混的几个点

### 1. `MinerU` 和 `magic-pdf`

推荐写法：

- 对外品牌统一写 `MinerU`
- 技术说明里可补一句 `magic-pdf` 为历史包名 / 代码语境

### 2. `MinerU` 和 `MinerU-Ecosystem`

推荐写法：

- 主仓库承担解析引擎、部署、服务能力
- 生态仓库承担 CLI、SDK、MCP、RAG 集成等接入层

### 3. 产品许可证和模型许可证

推荐写法：

- 代码仓库当前许可证以官方 `LICENSE.md` 为准
- 单独模型页上的许可说明不一定与代码仓库完全相同
- 写许可证时必须明确你说的是“主仓库代码”还是“某个模型”

### 4. 开源能力和 SaaS 表现

推荐写法：

- 开源支持某项能力，不代表 SaaS 页面展示方式完全一样
- SaaS 还会受产品交互、结果页、Beta 策略、可视化能力影响

## 推荐的对外英文写法

| 中文语境 | 推荐英文写法 |
|---|---|
| MinerU 产品 | `MinerU` |
| 开发机构 | `OpenDataLab` |
| 生态仓库 | `MinerU-Ecosystem` |
| 文档解析平台 | `document parsing platform` |
| 文档预处理层 | `document preprocessing layer` |
| 开源主仓库 | `the MinerU open-source repository` |
| 底层模型 | `underlying model` / `backbone model` |

## 对外写作时的建议

### 推荐

- `MinerU 是 OpenDataLab 推出的文档解析平台。`
- `magic-pdf 更多是历史或技术包名语境，对外品牌建议统一为 MinerU。`
- `MinerU-Ecosystem 主要承担 Open API 生态接入工具。`

### 不推荐

- `magic-pdf 就是官方对外主品牌`
- `MinerU-Ecosystem 就是主引擎本体`
- `MinerU-Diffusion 就是 MinerU 全部能力`

## 参考来源

- 内部材料：`MinerU 生态全接入：LangChain、Dify、RAGFlow、LlamaIndex 六大框架完整集成指南（2026）`
- 官方仓库：`https://github.com/opendatalab/MinerU`
- 官方生态仓库：`https://github.com/opendatalab/MinerU-Ecosystem`
- 模型层说明：[`07-model-stack-and-readmes.md`](07-model-stack-and-readmes.md)

核对时间：`2026-04-22`
