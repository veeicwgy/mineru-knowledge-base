# MinerU Knowledge Base Index

## 这份索引解决什么问题

当团队里同时有产品、运营、研发、解决方案、开源协作者一起使用知识库时，最常见的问题不是“没有资料”，而是：

- 不知道先看哪份
- 不知道哪份适合当前任务
- 不知道哪份是官方实时口径，哪份是内部补充
- 不知道版本变动会影响哪些表达和接入判断

这份 `index` 就是知识库总入口。

## 先看这里

如果你第一次进入这个仓库，建议按这个顺序建立认知：

1. [`../README.md`](../README.md)
2. [`index-by-role.md`](index-by-role.md)
3. [`01-overview-and-selection.md`](01-overview-and-selection.md)
4. [`05-source-of-truth.md`](05-source-of-truth.md)
5. 根据任务再进入专题文档

## 按任务找资料

| 我现在要做什么 | 优先看什么 |
|---|---|
| 快速理解 MinerU 是什么 | [`01-overview-and-selection.md`](01-overview-and-selection.md) |
| 判断开源、SaaS、API、客户端怎么选 | [`01-overview-and-selection.md`](01-overview-and-selection.md)、[`12-saas-vs-open-source-capability-map.md`](12-saas-vs-open-source-capability-map.md) |
| 看部署方式和后端选择 | [`02-deployment.md`](02-deployment.md) |
| 看 API、CLI、SDK、MCP、RAG 接入 | [`03-api-and-ecosystem.md`](03-api-and-ecosystem.md) |
| 写官网稿、运营稿、FAQ、GEO 文案 | [`04-content-and-geo-playbook.md`](04-content-and-geo-playbook.md) |
| 判断哪条说法能不能对外写 | [`05-source-of-truth.md`](05-source-of-truth.md) |
| 了解已发文章、可复用选题 | [`06-published-content.md`](06-published-content.md) |
| 解释底层模型关系 | [`07-model-stack-and-readmes.md`](07-model-stack-and-readmes.md) |
| 做 KIE 场景说明或抽取方案 | [`08-kie-guide.md`](08-kie-guide.md) |
| 做演讲、发布、训练营叙事 | [`09-speaking-and-launch-narratives.md`](09-speaking-and-launch-narratives.md) |
| 查版本升级带来的变化 | [`10-version-map-and-changelog.md`](10-version-map-and-changelog.md) |
| 查名词关系和写法边界 | [`11-terms-and-entities.md`](11-terms-and-entities.md) |
| 查开源版和 SaaS 的差异 | [`12-saas-vs-open-source-capability-map.md`](12-saas-vs-open-source-capability-map.md) |

## 按资料可信度找资料

当不同资料有冲突时，按这个顺序取信：

1. 官方 live docs：`https://mineru.net/apiManage/docs`
2. 官方代码仓库与许可证文件：`https://github.com/opendatalab/MinerU`
3. 官方生态仓库：`https://github.com/opendatalab/MinerU-Ecosystem`
4. 官方 `llms.txt`：`https://mineru.net/llms.txt`
5. 官方文档站：`https://opendatalab.github.io/MinerU/`
6. 内部培训课件、运营材料、需求文档

说明：

- `llms.txt` 很重要，但它不是所有实时限制项的最终准绳
- 版本、页数、额度、许可证这类信息优先看 live docs 和官方仓库
- 内部材料很适合补中文解释、用户路径、产品文案和案例，但要标注版本时间

## 当前最值得重点关注的差异

截至 `2026-04-22`，知识库里需要明确记录这些“版本漂移”：

- API live docs 当前显示精准解析上限为 `200MB / 200 页`
- 官方 `llms.txt` 仍写有 `200MB / 600 页`
- 官方 `MinerU` 仓库 README 已记录 `2026-04-18` 发布 `3.1.0`
- 官方 `MinerU` 仓库 LICENSE 已切换为 `MinerU Open Source License`
- 部分旧课件和旧对外资料仍保留 `AGPL-3.0` 或旧额度口径

这些差异已在 [`05-source-of-truth.md`](05-source-of-truth.md) 和 [`10-version-map-and-changelog.md`](10-version-map-and-changelog.md) 中展开记录。

## 这套知识库适合的角色

- 产品：看产品矩阵、版本变化、SaaS 与开源能力边界
- 运营：看对外口径、已发文章、选题、FAQ、演讲叙事
- 研发：看部署、API、CLI、SDK、MCP、版本升级影响
- 开源协作者：看术语边界、版本演进、官方 source of truth

如果你更偏角色式浏览，直接进入 [`index-by-role.md`](index-by-role.md)。

## 建议继续补的资料

当前知识库已经有骨架，但后续如果要进一步提升“全团队可用性”，最值得继续补的是：

- 真实文档输入样例与输出样例
- 更完整的历史已发内容归档
- 常见失败案例与排障手册
- 六大框架接入的更细分落地文档
- 对外 FAQ 与客服问答库

## 最近一次核对时间

`2026-04-22`
