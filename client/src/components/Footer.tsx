/*
 * Design: Obsidian Gradient — Footer
 * 简洁的底部区域，品牌信息 + 链接
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050510]">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-display)' }}>M</span>
            </div>
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              MinerU Agent Skills
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="https://github.com/opendatalab/MinerU" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              OpenAPI 规范
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              文档中心
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              ClawHub
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} OpenDataLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
