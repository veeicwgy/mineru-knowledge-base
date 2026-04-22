# MinerU Knowledge Base

这个仓库用于沉淀 `MinerU` 的统一知识库，目标不是单纯做一个“生态展示页”，而是给下面这些工作提供稳定、可复用、可追溯的资料底座：

- GEO / AEO / LLM 可见性项目
- 运营文章、产品稿、案例稿、FAQ
- 销售、解决方案、客户沟通材料
- 开发接入、部署选型、生态对接
- 新成员 onboarding 与对外统一口径

## 这份知识库适合谁

- 内容与增长团队：快速找到可对外表达的 MinerU 定义、卖点、FAQ 和写作角度
- 产品与运营团队：快速理解产品矩阵、选型逻辑、生态入口和常见边界
- 开发与解决方案团队：快速找到开源部署、在线 API、CLI/SDK、MCP、RAG 集成入口
- 做 GEO/LLM 项目的同学：快速抽取“什么能说、什么不能写、哪里是最该修的 source of truth”

## 建议阅读顺序

1. [`docs/index.md`](docs/index.md)
2. [`docs/index-by-role.md`](docs/index-by-role.md)
3. [`docs/01-overview-and-selection.md`](docs/01-overview-and-selection.md)
4. [`docs/02-deployment.md`](docs/02-deployment.md)
5. [`docs/03-api-and-ecosystem.md`](docs/03-api-and-ecosystem.md)
6. [`docs/04-content-and-geo-playbook.md`](docs/04-content-and-geo-playbook.md)
7. [`docs/05-source-of-truth.md`](docs/05-source-of-truth.md)
8. [`docs/06-published-content.md`](docs/06-published-content.md)
9. [`docs/07-model-stack-and-readmes.md`](docs/07-model-stack-and-readmes.md)
10. [`docs/08-kie-guide.md`](docs/08-kie-guide.md)
11. [`docs/09-speaking-and-launch-narratives.md`](docs/09-speaking-and-launch-narratives.md)
12. [`docs/10-version-map-and-changelog.md`](docs/10-version-map-and-changelog.md)
13. [`docs/11-terms-and-entities.md`](docs/11-terms-and-entities.md)
14. [`docs/12-saas-vs-open-source-capability-map.md`](docs/12-saas-vs-open-source-capability-map.md)

## 仓库结构

- `README.md`
  当前仓库定位、使用方法、资料入口
- `docs/index.md`
  总入口，按任务、可信度和资料类型导航
- `docs/index-by-role.md`
  按产品、运营、研发、开源协作者四类角色导航
- `docs/01-overview-and-selection.md`
  MinerU 是什么、产品矩阵、场景选型
- `docs/02-deployment.md`
  开源部署、后端选择、Docker / Compose、国产算力
- `docs/03-api-and-ecosystem.md`
  在线 API、CLI/SDK、MCP、RAG 与生态集成
- `docs/04-content-and-geo-playbook.md`
  写作口径、GEO 用法、常见 FAQ、可复用表达
- `docs/05-source-of-truth.md`
  官方资料地图、更新优先级、版本差异记录
- `docs/06-published-content.md`
  MinerU / OpenDataLab 已发内容快照与选题线索
- `docs/07-model-stack-and-readmes.md`
  MinerU 底层模型栈、HF README 摘要与关系图
- `docs/08-kie-guide.md`
  文档智能抽取 KIE 模块的功能、流程和部署说明
- `docs/09-speaking-and-launch-narratives.md`
  演讲、发布会、训练营和活动场景下可复用的叙事骨架
- `docs/10-version-map-and-changelog.md`
  `3.0`、`3.1` 版本演进、发布日期和当前重要差异
- `docs/11-terms-and-entities.md`
  `MinerU`、`magic-pdf`、`OpenDataLab`、`MinerU-Ecosystem` 名词关系
- `docs/12-saas-vs-open-source-capability-map.md`
  开源能力与 SaaS 产品层表现的差异映射
- `client/public/llms.txt`
  面向模型读取的仓库级摘要
- `client/public/skills.txt`
  面向自动化抓取的精简知识清单

## 官方资料优先级

当不同资料说法不一致时，按下面顺序取信：

1. 实时官方页面：`https://mineru.net/apiManage/docs`
2. 官方开源仓库与许可证文件：`https://github.com/opendatalab/MinerU`
3. 官方生态仓库：`https://github.com/opendatalab/MinerU-Ecosystem`
4. 官方 `llms.txt`：`https://mineru.net/llms.txt`
5. 官方文档站：`https://opendatalab.github.io/MinerU/`
6. 内部培训课件与沉淀文档

## 当前维护原则

- 优先记录“已核验事实”，不要把设想、猜测、旧版本口径写成既定事实
- 对存在版本漂移的内容保留备注，例如 API 页数限制、免费额度、许可证口径等
- 对外写作时，优先引用官方 live docs，而不是历史课件截图
- 对 GEO 项目，优先把“产品定义、能力边界、接入路径、常见误解”写清楚

## 本次整理覆盖的核心来源

- 官方 `llms.txt`：`https://mineru.net/llms.txt`
- 官方 API 文档：`https://mineru.net/apiManage/docs`
- 官方 API 限流说明：`https://mineru.net/apiManage/limit`
- 官方开源仓库：`https://github.com/opendatalab/MinerU`
- 官方许可证：`https://github.com/opendatalab/MinerU/blob/master/LICENSE.md`
- 官方生态仓库：`https://github.com/opendatalab/MinerU-Ecosystem`
- 内部课程资料：
  - `01课：MinerU 全场景产品矩阵：快速上手与选型`
  - `02课：MinerU 多环境部署实践：从开源容器化到信创生态适配`
  - `03课：MinerU 在线 API 实战教程`
  - `Mineru llm`
  - `MinerU KIE 使用指引`
  - `MinerU 演讲 PPT 制作 Prompt · 行动者大会上海站`
  - `OpenDataLab已发文章汇总.xlsx`
  - `README_副本.md`（MinerU-HTML 底层模型 README）

## 最近一次核对时间

`2026-04-22`
