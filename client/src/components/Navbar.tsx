/*
 * MinerU 生态与社区 — 顶部导航栏
 * 简洁品牌导航，与侧边栏布局配合
 */
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 h-16 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="h-full px-5 flex items-center justify-between">
        {/* Left: Logo + breadcrumb */}
        <div className="flex items-center gap-3">
          <a href="https://mineru.net" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span
              className="text-[15px] font-bold text-gray-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MinerU
            </span>
          </a>
          <span className="text-gray-300 text-sm">/</span>
          <span className="text-[14px] font-medium text-gray-600">生态与社区</span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-1">
          <a
            href="https://mineru.net"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            产品
          </a>
          <a
            href="#"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            文档
          </a>
          <a
            href="https://github.com/opendatalab/MinerU"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </nav>
  );
}
