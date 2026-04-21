# MinerU 部署与后端选择

## 先判断你走哪条路

| 你的目标 | 推荐路径 |
|---|---|
| 没有 GPU，只想本地体验 | `uv` + `mineru[core]` + `-b pipeline` |
| 有 NVIDIA GPU 或 Apple Silicon，希望高精度 | `uv` + `mineru[all]` |
| 想减少依赖冲突，方便交付 | Docker |
| 想跑 API / WebUI / OpenAI-compatible 服务 | Docker Compose |
| 想读源码、调试、提 PR | 源码可编辑安装 |
| 使用国产算力平台 | 参考官方国产算力适配文档 |

## 本地安装

### `uv` + PyPI

```bash
pip install --upgrade pip -i https://mirrors.aliyun.com/pypi/simple
pip install uv -i https://mirrors.aliyun.com/pypi/simple
uv venv .venv312 --python 3.12
source .venv312/bin/activate
uv pip install -U "mineru[all]" -i https://mirrors.aliyun.com/pypi/simple
```

### 源码安装

```bash
git clone https://github.com/opendatalab/MinerU.git
cd MinerU
uv pip install -e .[all] -i https://mirrors.aliyun.com/pypi/simple
```

适合：

- 读源码
- 改本地逻辑
- 做 demo / 培训
- 调试问题或提 PR

## 模型源与缓存

大陆网络环境常见做法：

```bash
export MINERU_MODEL_SOURCE=modelscope
mineru-models-download
export MINERU_MODEL_SOURCE=local
```

## 后端选择

| 后端 | 特点 | 适合谁 |
|---|---|---|
| `pipeline` | 兼容性最好，可纯 CPU 跑 | 没 GPU 或先求稳 |
| `hybrid-auto-engine` | 默认高精度方案，可自动切换 | 有较好显卡，想兼顾效果与易用性 |
| `vlm-auto-engine` | 纯视觉大模型路线，精度更高 | 高配 GPU，追求极致效果 |
| `hybrid-http-client` | 远端高精度 + 少量本地计算 | 本地算力有限，但能连远端服务 |
| `vlm-http-client` | 完全依赖远端 OpenAI-compatible 服务 | 本地几乎无算力 |

## 最常见的本地验证

```bash
mineru -p <input_path> -o <output_path>
mineru -p <input_path> -o <output_path> -b pipeline
```

建议第一次重点看这些输出：

- `full.md`
- `*_content_list.json`
- `content_list_v2.json`
- `layout.pdf`
- `middle.json`

## Docker / Compose

### Dockerfile

```bash
wget https://gcore.jsdelivr.net/gh/opendatalab/MinerU@master/docker/china/Dockerfile
docker build -t mineru:latest -f Dockerfile .
```

### 进入容器验证

```bash
docker run --gpus all \
  --shm-size 32g \
  -p 30000:30000 -p 7860:7860 -p 8000:8000 -p 8002:8002 \
  -it mineru:latest \
  /bin/bash
```

### Compose 常见 profile

- `openai-server`
  给 `vlm-http-client` / `hybrid-http-client` 提供上游
- `api`
  提供 `mineru-api`
- `router`
  聚合多个 `mineru-api` 或多个 GPU worker
- `gradio`
  提供浏览器端 WebUI

## 开源服务端能力

开源部署不仅能跑命令行，还能起服务：

- `mineru-api`
- `mineru-router`
- `mineru-gradio`
- `mineru-openai-server`

## 国产算力

官方或社区适配资料覆盖了多家国产算力平台，课件中明确提到：

- 昇腾
- 平头哥
- 沐曦
- 海光
- 燧原
- 摩尔线程
- 天数智芯
- 寒武纪
- 昆仑芯
- 太初元碁
- 壁仞
- 瀚博

对外写作时建议用“已适配 10 余家主流国产算力平台”这种稳妥口径，不建议自行扩写到没有核验的平台。

## 写给非技术同学的部署选择结论

- 要求数据合规：开源私有化
- 要求最快上手：网页 / 客户端 / 在线 API
- 要求研发集成：CLI / SDK / MCP / API
- 要求统一交付：Docker / Compose

## 参考资料

- 官方开源仓库：`https://github.com/opendatalab/MinerU`
- 官方文档站：`https://opendatalab.github.io/MinerU/`
- 内部课件：`02课：MinerU 多环境部署实践：从开源容器化到信创生态适配`
