# MinerU API 与生态接入

## API 两种主模式

官方 live docs 当前把在线接口分成两类：

| 对比维度 | 精准解析 API | Agent 轻量解析 API |
|---|---|---|
| 是否需要 Token | 需要 | 不需要，按 IP 限频 |
| 典型接口 | `/api/v4/extract/task` | `/api/v1/agent/parse/url` / `/api/v1/agent/parse/file` |
| 模型 | `pipeline` / `vlm` / `MinerU-HTML` | 固定轻量模型 |
| 文件大小上限 | `<= 200MB` | `<= 10MB` |
| 页数上限 | `<= 200 页` | `<= 20 页` |
| 批量 | 支持，最多 `200` 个 | 不支持 |
| 输出 | Markdown、JSON、Zip，可额外导出 `docx/html/latex` | 仅 Markdown |

## 一个必须记录的版本差异

历史课件和官方 `llms.txt` 中曾出现“精准解析支持 `<= 600 页`”以及“每日 `2000` 页高优先级额度”的说法。

但在 `2026-04-22` 核对 live docs 时，官方页面显示：

- 单文件页数上限：`200 页`
- 每账号每天高优先级解析额度：`1000 页`

对外发布和项目方案文档，应以 live docs 为准。

## 接口状态

课件与文档中常见的任务状态包括：

- `waiting-file`
- `uploading`
- `pending`
- `running`
- `converting`
- `done`
- `failed`

这部分很适合直接写进接入 FAQ、工单排障文档和客户成功手册。

## 当前可稳定使用的参数认知

### 精准解析

- `model_version`
  `pipeline` / `vlm` / `MinerU-HTML`
- `language`
  会影响 OCR 效果，小语种建议显式设置
- `is_ocr`
  默认不强制；如果扫描件效果不好可显式开启
- `extra_formats`
  常见为 `docx` / `html` / `latex`

### URL 任务

- URL 必须公网可访问
- 源站可能有频控，例如论文站点
- 批量 URL 任务要注意源站限频

## CLI

### 安装

```bash
curl -fsSL https://cdn-mineru.openxlab.org.cn/open-api-cli/install.sh | sh
```

Windows PowerShell:

```powershell
irm https://cdn-mineru.openxlab.org.cn/open-api-cli/install.ps1 | iex
```

### 常用命令

```bash
mineru-open-api flash-extract report.pdf
mineru-open-api auth
mineru-open-api extract report.pdf
mineru-open-api extract report.pdf -f md,docx -o ./results/
mineru-open-api crawl https://mineru.net -o ./results/
mineru-open-api extract *.pdf -o ./results/
```

## SDK

### Python

```bash
pip install mineru-open-sdk
```

```python
from mineru import MinerU

client = MinerU()
flash = client.flash_extract("https://cdn-mineru.openxlab.org.cn/demo/example.pdf")
print(flash.markdown)

client = MinerU("your-api-token")
result = client.extract("https://cdn-mineru.openxlab.org.cn/demo/example.pdf")
print(result.markdown)
print(result.images)
```

### Go

```bash
go get github.com/opendatalab/MinerU-Ecosystem/sdk/go@latest
```

### TypeScript

```bash
npm install mineru-open-sdk
```

## MCP Server

官方推荐配置：

```json
{
  "mcpServers": {
    "mineru": {
      "command": "uvx",
      "args": ["mineru-open-mcp"],
      "env": {
        "MINERU_API_TOKEN": "your token"
      }
    }
  }
}
```

如果不配置 `MINERU_API_TOKEN`，可走无需登录的轻量模式。

适合：

- Cursor
- Claude Desktop
- Windsurf
- 其他 MCP 兼容客户端

## RAG / 知识库生态

当前可明确写入知识库的官方或官方仓库生态包括：

- LangChain：`langchain-mineru`
- LlamaIndex：`llama-index-readers-mineru`
- Dify 插件
- FastGPT 集成
- RagFlow 集成
- Coze 插件
- n8n 节点
- Cherry Studio 集成

## 两个典型工作流

### 1. 飞书知识库沉淀

路径：

`有价值的网页 / 文档 -> MinerU 解析 -> 飞书知识库`

这条路径适合运营、研究、产品资料沉淀。

### 2. 发票/票据批量结构化

路径：

`PDF 发票 -> MinerU SDK 批量提取 -> LLM 结构化抽取 -> Excel`

这条路径适合财务、行政、报销整理和批量数据录入。

## 参考资料

- 官方 API 文档：`https://mineru.net/apiManage/docs`
- 官方限流说明：`https://mineru.net/apiManage/limit`
- 官方生态仓库：`https://github.com/opendatalab/MinerU-Ecosystem`
- 内部课件：`03课：MinerU 在线 API 实战教程`
