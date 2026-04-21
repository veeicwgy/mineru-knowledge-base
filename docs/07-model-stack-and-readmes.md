# MinerU 底层模型栈与 README 摘要

## 为什么要单独整理模型层

如果知识库只写到产品层，很容易出现两个问题：

- 对外写作时无法解释 `MinerU`、`MinerU-Diffusion`、`MinerU-HTML` 之间是什么关系
- 团队在写技术稿、研究稿、GEO 材料时，容易把“产品能力”和“底层模型能力”混在一起

这份文档专门补模型层。

## 当前建议纳入知识库的模型栈

| 名称 | 角色 | 主要任务 | 参数量 | 架构/基座 | 许可 | 主要来源 |
|---|---|---|---|---|---|---|
| `MinerU2.5-2509-1.2B` | 核心文档解析模型 | 高分辨率文档解析 | 约 `1.2B` | `qwen2_vl` | `AGPL-3.0` | HF README + 模型页 |
| `MinerU-Diffusion-V1-0320-2.5B` | OCR / 解码效率增强模型 | 文档 OCR | 约 `2.7B` | `mineru_diffusion` | `MIT` | HF README + 模型页 |
| `MinerU-HTML-v1.1-hunyuan0.5B-compact` | 网页正文提取模型 | HTML 主体内容抽取 | 约 `0.5B` | 腾讯混元 `0.5B` 衍生 | 以模型页与 README 为准 | HF README + 模型页 |

## 1. MinerU2.5-2509-1.2B

### 它是什么

`MinerU2.5` 是当前 MinerU 系列里最重要的文档解析底层模型之一，定位是：

- 高分辨率文档解析
- 兼顾精度与效率
- 用两阶段方案处理复杂文档页面

### 官方 README 中值得沉淀的关键信息

- 它是一个 `1.2B` 参数的视觉语言模型
- 采用“两阶段”解析策略
  - 先做低分辨率全局版面分析
  - 再对原始分辨率局部内容做精细识别
- 官方推荐使用 `vllm`
- README 明确给出了两种部署路径
  - 自托管 GPU 推理
  - 通过 MinerU Open API 云端使用

### 适合怎样对外描述

可以写：

- `MinerU2.5 是 MinerU 在复杂文档解析上的核心底层模型之一`
- `它强调高分辨率文档解析的效率和保真度平衡`

不建议写：

- `MinerU2.5 = MinerU 全部能力`
- `所有 MinerU 输出都直接等于这个单一模型完成`

### 参考链接

- HF 模型页：`https://huggingface.co/opendatalab/MinerU2.5-2509-1.2B`
- 技术报告：`https://arxiv.org/abs/2509.22186`

## 2. MinerU-Diffusion-V1-0320-2.5B

### 它是什么

`MinerU-Diffusion` 不是整个 MinerU 的替代品，而是 OCR / 文档字符识别层的重要创新方向。

官方 README 的核心说法是：

- 把文档 OCR 重构为 inverse rendering 问题
- 用并行 diffusion decoding 替代慢速 autoregressive decoding

### 这个模型最值得写进知识库的点

- 对外传播价值非常强，因为它对应清晰的研究突破
- README 和已发文章都强调了速度提升
  - 已发文章口径：`3.2 倍提速`
  - README 里写了多组 trade-off 数据，例如 `2.12x` 和 `3.01x`
- 它更适合被写成“底层 OCR 创新”，而不是“MinerU 全产品线唯一模型”

### 它和 MinerU2.5 的关系

可以理解为：

- `MinerU2.5` 更偏完整文档解析主干
- `MinerU-Diffusion` 更偏 OCR / 解码效率与鲁棒性创新

### 参考链接

- HF 模型页：`https://huggingface.co/opendatalab/MinerU-Diffusion-V1-0320-2.5B`
- 技术报告：`https://arxiv.org/pdf/2603.22458`
- GitHub：`https://github.com/opendatalab/MinerU-Diffusion`

## 3. MinerU-HTML-v1.1-hunyuan0.5B-compact

### 它是什么

这是 `MinerU-HTML` 对应的网页正文提取模型，和 PDF / Office 文档解析不是同一层任务。

它的任务是：

- 从网页 HTML 中识别正文区域
- 去除导航、广告、元数据等干扰内容
- 输出更适合训练、检索和后续处理的主内容

### README 中最值得保留的信息

- 基于 `Tencent Hunyuan 0.5B` 衍生
- 支持 `256k` 上下文
- 使用更紧凑的输出格式以降低延迟
- 支持 `VLLM`、`Transformers`、`OpenAI API` 三种推理后端
- 在 `WebMainBench v1.1` 上给出了对比结果

### 它和主线 MinerU 的关系

不要把它写成“又一个 PDF 模型”。

更准确的说法是：

- `MinerU-HTML 是 MinerU 面向网页语料抽取的专门分支`
- `它更适合 Common Crawl、网页语料清洗、HTML 转主内容等场景`

### 参考链接

- HF 模型页：`https://huggingface.co/opendatalab/MinerU-HTML-v1.1-hunyuan0.5B-compact`
- GitHub：`https://github.com/opendatalab/MinerU-HTML`
- 技术报告：`https://arxiv.org/pdf/2511.16397v1`

## 写技术稿时的推荐说法

### 推荐

- `MinerU 产品层之下，至少可以拆成文档解析主干模型、OCR 研究方向模型、网页正文提取模型三个层次`
- `MinerU2.5、MinerU-Diffusion、MinerU-HTML 分别对应不同任务重点`

### 不推荐

- `MinerU 只有一个底层模型`
- `MinerU-Diffusion 就是 MinerU2.5`
- `MinerU-HTML 只是 MinerU 的另一个命名`

## 模型层对 GEO / 内容建设的价值

补齐模型层之后，可以支持这些写作任务：

- 技术路线解读
- 论文 / 技术报告转译稿
- “MinerU 为什么强” 的更深层解释
- 面向开发者和研究者的 FAQ

## 资料来源

- 本地文件：`README.md`
- 本地文件：`README_副本.md`
- 官方 HF 模型页与 README：
  - `opendatalab/MinerU2.5-2509-1.2B`
  - `opendatalab/MinerU-Diffusion-V1-0320-2.5B`
  - `opendatalab/MinerU-HTML-v1.1-hunyuan0.5B-compact`

核对时间：`2026-04-21`
