/*
 * Design: Obsidian Gradient — 深邃渐变 + 高端品牌感
 * Navbar: 固定顶部，毛玻璃效果，品牌标识 + 导航链接
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050510]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>M</span>
          </div>
          <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            MinerU
          </span>
          <span className="text-xs font-medium text-cyan-400/80 bg-cyan-400/10 px-2 py-0.5 rounded-full">
            Skills
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#frameworks" className="text-sm text-slate-400 hover:text-white transition-colors">
            框架适配
          </a>
          <a href="#code" className="text-sm text-slate-400 hover:text-white transition-colors">
            代码示例
          </a>
          <a href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">
            FAQ
          </a>
          <a
            href="https://github.com/opendatalab/MinerU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0A0A14]/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="container py-4 flex flex-col gap-3">
            <a href="#frameworks" onClick={() => setMobileOpen(false)} className="text-sm text-slate-400 hover:text-white transition-colors py-2">框架适配</a>
            <a href="#code" onClick={() => setMobileOpen(false)} className="text-sm text-slate-400 hover:text-white transition-colors py-2">代码示例</a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="text-sm text-slate-400 hover:text-white transition-colors py-2">FAQ</a>
            <a href="https://github.com/opendatalab/MinerU" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 w-fit">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
