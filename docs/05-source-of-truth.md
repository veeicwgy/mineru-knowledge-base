# MinerU Source of Truth

## 目的

这个文件记录当前知识库依赖的官方资料、内部资料以及它们之间的版本差异，避免后续维护时出现“旧文档覆盖新事实”的问题。

## 资料优先级

| 优先级 | 来源 | 用途 |
|---|---|---|
| 1 | `https://mineru.net/apiManage/docs` | 在线 API、参数、限制、状态、MCP 口径 |
| 2 | `https://mineru.net/llms.txt` | 面向模型的官方摘要、产品描述、生态入口 |
| 3 | `https://github.com/opendatalab/MinerU` | 开源部署、后端、Docker、Compose |
| 4 | `https://github.com/opendatalab/MinerU-Ecosystem` | CLI / SDK / MCP / LangChain / LlamaIndex / Skills |
| 5 | `https://opendatalab.github.io/MinerU/` | 使用文档、插件与集成说明 |
| 6 | 内部训练营课件 | 中文解释、案例、选型、业务话术补充 |

## 当前已核对的外部来源

- 官方 `llms.txt`
- 官方 API docs
- 官方 API rate limit 页面
- `MinerU` 仓库 README
- `MinerU-Ecosystem` 仓库 README / README.zh-CN
- Hugging Face 模型页与 README：
  - `MinerU2.5-2509-1.2B`
  - `MinerU-Diffusion-V1-0320-2.5B`
  - `MinerU-HTML-v1.1-hunyuan0.5B-compact`

核对时间：`2026-04-21`

## 已记录的版本差异

### 1. 精准解析 API 页数上限

| 来源 | 说法 |
|---|---|
| `mineru.net/apiManage/docs` | `<= 200 页` |
| `mineru.net/llms.txt` | `<= 600 页` |
| 内部课件 `03课` | `<= 600 页` |

当前处理原则：

- 面向外部发布、接入说明、FAQ：使用 live docs 的 `200 页`
- 内部知识库：保留差异记录，提醒二次核验

### 2. 每日高优先级免费额度

| 来源 | 说法 |
|---|---|
| `mineru.net/apiManage/docs` | `1000 页 / 天` |
| 内部课件 `03课` | `2000 页 / 天` |

当前处理原则：

- 对外稿件和方案：优先写 live docs 当前数值
- 对“历史课件/培训材料”保留原话，但要加日期和版本注释

## 维护动作建议

每次准备更新知识库或对外出稿前，优先检查：

1. API docs 的限制项是否变化
2. `llms.txt` 的产品描述是否变化
3. `MinerU-Ecosystem` README 的 CLI / SDK / MCP 命令是否变化
4. `MinerU` README 的部署方式、后端、国产算力适配名单是否变化

## 适合继续补充的资料位

- 真实客户案例
- 典型失败样例与排障说明
- 不同行业文档样本的最佳实践
- GEO 问答库与文章素材库
- 更完整的 OpenDataLab / MinerU 已发文章档案
- KIE 的真实业务案例

## 当前已纳入但属于内部资料的来源

- `OpenDataLab已发文章汇总.xlsx`
- `mineru kie 使用指引.md`
- `MinerU 演讲 PPT 制作 Prompt · 行动者大会上海站.docx`
- `README_副本.md`

## 备注

如果某一条信息不能在官方 live docs 或官方仓库中找到最新依据，就不要把它写成“确定事实”。
