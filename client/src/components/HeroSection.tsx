/*
 * Design: Obsidian Gradient — Hero Section
 * 核心价值定调：大标题 + 副标题 + 3个核心特性卡片
 * 背景使用生成的 hero-bg 图片 + 渐变叠加
 */
import { motion } from "framer-motion";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/hero-bg-fGpCiJrPpy3nWUELoxivNn.webp";
const ICON_PROTOCOL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/feature-icon-protocol-7Kp5XnX4DwnA8K9ACA7sre.webp";
const ICON_DUAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/feature-icon-dual-mode-DHSUYwG5kpzeBW7ctyRBDh.webp";
const ICON_MULTILANG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/feature-icon-multilang-atWPDZjEc68YKaH5RBarTL.webp";

const features = [
  {
    icon: ICON_PROTOCOL,
    title: "标准协议，无缝即插即用",
    desc: "基于核心库+适配器架构，全面支持 Tool Calling 规范，并通过 ClawHub、PyPI 等生态市场一键分发。",
  },
  {
    icon: ICON_DUAL,
    title: "统一维护，双模智能切换",
    desc: "内置 fast 与 precise 参数。一键在极速提取与高保真图表/公式还原之间切换。",
  },
  {
    icon: ICON_MULTILANG,
    title: "多语言与边缘设备覆盖",
    desc: "覆盖 Node.js、Python、Go 甚至 Rust（支持边缘与低功耗设备），提供标准 OpenAPI 规范。",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0C1222] to-[#0F172A]" />
        {/* Hero image overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/6 rounded-full blur-[100px]" />
        {/* Top fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        className="container relative z-10 pt-28 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Agent Skills 技能中心
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-center text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight max-w-5xl mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-white">为智能体赋予</span>
          <br className="hidden sm:block" />
          <span className="gradient-text">"阅读"复杂文档</span>
          <span className="text-white">的超能力</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-center text-base sm:text-lg text-slate-400 max-w-3xl mx-auto mt-6 leading-relaxed"
        >
          已原生适配主流 Agent 框架，开箱即用。将
          <span className="text-cyan-400 font-medium">"免登录快速通道（每日 50 万页免费额度）"</span>
          与<span className="text-blue-400 font-medium">"高精度解析"</span>
          整合为单一 Skill，仅需切换一个参数，即可适配各种工作流。
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 mt-10">
          <a
            href="#frameworks"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            浏览全部 Skills
          </a>
          <a
            href="#code"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
          >
            查看代码示例
          </a>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="gradient-border-card p-6 group"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden mb-5 bg-slate-800/50">
                <img src={f.icon} alt={f.title} className="w-full h-full object-cover" />
              </div>
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
