/*
 * MinerU 生态与知识库 — 顶部导航栏
 */
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const MINERU_ICON =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663059542092/nMHgDdS4MtnzdkKrwaYG8X/EjrS6V4Yvl4f_743d5ccc.png";

const navLinks = [
  { label: "首页", href: "https://mineru.net", active: false },
  { label: "API", href: "https://mineru.net/apiManage/docs", active: false },
  { label: "客户端", href: "https://mineru.net/client", active: false },
  { label: "生态与知识库", href: "#", active: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 h-16 ${
        scrolled
          ? isDark
            ? "bg-[#1a1d2e]/90 backdrop-blur-xl border-b border-slate-700/60 shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            : "bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="h-full max-w-[1440px] mx-auto px-5 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <a
          href="https://mineru.net"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0"
        >
          <img src={MINERU_ICON} alt="MinerU" className="w-7 h-7 object-contain" />
          <span className={`text-[17px] font-extrabold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            MinerU
          </span>
        </a>

        {/* Center: Capsule Menu */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <div className={`flex items-center gap-0.5 backdrop-blur-md border rounded-full px-1.5 py-1 shadow-[0_1px_4px_rgba(0,0,0,0.04)] ${
            isDark
              ? "bg-slate-800/80 border-slate-700/70"
              : "bg-white/80 border-slate-200/70"
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-[13.5px] transition-all duration-150 whitespace-nowrap ${
                  link.active
                    ? isDark ? "font-bold text-slate-100" : "font-bold text-slate-900"
                    : isDark
                      ? "font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                      : "font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50/80"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              isDark
                ? "text-amber-400 hover:text-amber-300 hover:bg-slate-700/60"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
            }`}
            title={isDark ? "切换亮色模式" : "切换深色模式"}
            onClick={toggleTheme}
          >
            {isDark ? (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Language switch */}
          <button
            className={`hidden sm:flex items-center justify-center px-2 h-8 rounded-full text-[13px] font-semibold transition-colors ${
              isDark
                ? "text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
            }`}
            title="Switch Language"
            onClick={() => {}}
          >
            EN
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/veeicwgy/wss-prd-1"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              isDark
                ? "text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
            }`}
            title="GitHub"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* 在线使用 button */}
          <a
            href="https://mineru.net"
            className={`hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[13px] font-medium transition-all ${
              isDark
                ? "border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            在线使用
            <svg className={`w-3 h-3 ${isDark ? "text-slate-500" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* User avatar */}
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              isDark
                ? "text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
            }`}
            title="用户"
            onClick={() => {}}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile: Bottom capsule menu */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className={`flex items-center gap-0.5 backdrop-blur-xl border rounded-full px-2 py-1 shadow-lg ${
          isDark
            ? "bg-slate-800/95 border-slate-700/70"
            : "bg-white/95 border-slate-200/70"
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 rounded-full text-[12px] transition-all ${
                link.active
                  ? isDark ? "font-bold text-slate-100 bg-slate-700/80" : "font-bold text-slate-900 bg-slate-100/80"
                  : isDark ? "font-medium text-slate-400" : "font-medium text-slate-500"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
