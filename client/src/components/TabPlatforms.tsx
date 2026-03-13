/*
 * Tab 3: 平台、应用与自动化 (Platforms & Workflows)
 * Card grid matching mineru.net/ecosystem style
 */
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface PlatformItem {
  name: string;
  category: string;
  description: string;
  links?: { label: string; url: string }[];
  comingSoon?: boolean;
  iconBg: string;
  iconColor: string;
  initial: string;
}

const categories: { title: string; items: PlatformItem[] }[] = [
  {
    title: "知识库与 RAG 平台",
    items: [
      {
        name: "Dify",
        category: "插件",
        description: "以官方插件上架 Dify 市场。在可视化工作流中拖拽节点，一站式将图文混排文档转化为高质量问答知识库。",
        links: [{ label: "获取官方插件", url: "#" }],
        iconBg: "bg-blue-50", iconColor: "text-blue-600", initial: "D",
      },
      {
        name: "RAGFlow",
        category: "内置引擎",
        description: "作为平台内置的深度文档解析引擎。结合 GraphRAG，提供物理与逻辑版面分析，支持复杂结构处理。",
        links: [{ label: "查看引擎切换指南", url: "#" }],
        iconBg: "bg-purple-50", iconColor: "text-purple-600", initial: "R",
      },
      {
        name: "Flowise",
        category: "节点",
        description: "拖拽式构建 AI 流程，提供开箱即用的 MinerU Document Loader 节点，极大缩短 PoC 验证周期。",
        iconBg: "bg-cyan-50", iconColor: "text-cyan-600", initial: "F",
      },
      {
        name: "FastGPT",
        category: "工具",
        description: "原生集成至平台工具模块，赋能精准解析复杂文档能力。",
        links: [{ label: "MinerU 官方插件", url: "#" }],
        iconBg: "bg-indigo-50", iconColor: "text-indigo-600", initial: "F",
      },
    ],
  },
  {
    title: "智能体与工作流",
    items: [
      {
        name: "Coze",
        category: "插件",
        description: "以插件形式接入，为智能体开发提供便捷的文档阅读与结构化提取能力。",
        links: [{ label: "MinerU 官方插件", url: "#" }, { label: "官方 Agents", url: "#" }],
        iconBg: "bg-violet-50", iconColor: "text-violet-600", initial: "C",
      },
      {
        name: "n8n",
        category: "节点",
        description: "提供自动化专属节点，融入无人值守的高频工作流任务，支持免登录与批量处理。",
        links: [{ label: "MinerU 官方插件", url: "#" }],
        iconBg: "bg-orange-50", iconColor: "text-orange-600", initial: "n",
      },
    ],
  },
  {
    title: "办公应用与企业工具",
    items: [
      {
        name: "钉钉 (DingTalk)",
        category: "企业",
        description: "基于 MinerU 即将推出面向企业用户的文档解析工具 DLU。",
        comingSoon: true,
        iconBg: "bg-sky-50", iconColor: "text-sky-600", initial: "钉",
      },
      {
        name: "Cherry Studio",
        category: "应用",
        description: "集成于对话交互中，消除大模型处理图表数据时的幻觉。",
        iconBg: "bg-rose-50", iconColor: "text-rose-600", initial: "C",
      },
      {
        name: "和鲸科学平台",
        category: "科研",
        description: "为科研数据、智库管理提供强力结构化解析支持。",
        iconBg: "bg-teal-50", iconColor: "text-teal-600", initial: "鲸",
      },
      {
        name: "Sider",
        category: "知识库",
        description: "在 Wisebase 知识库中解析和管理文件。",
        iconBg: "bg-amber-50", iconColor: "text-amber-600", initial: "S",
      },
    ],
  },
];

export default function TabPlatforms() {
  return (
    <div className="bg-white">
      <section className="py-12">
        <div className="container">
          {/* Intro */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              无需编写代码，即刻释放文档价值
            </h2>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              以官方插件、内置引擎和专属节点的形式，无缝嵌入主流的知识库平台与自动化工作流。
            </p>
          </motion.div>

          {/* Category sections */}
          {categories.map((cat, ci) => (
            <div key={ci} className="mb-10 last:mb-0">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2"
              >
                <span className="w-5 h-px bg-gray-300" />
                {cat.title}
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="eco-card p-5 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center text-sm font-bold ${item.iconColor}`}>
                        {item.initial}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                          {item.comingSoon && (
                            <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                              即将推出
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{item.category}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed flex-grow">{item.description}</p>
                    {item.links && item.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gray-100">
                        {item.links.map((link, li) => (
                          <a
                            key={li}
                            href={link.url}
                            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
