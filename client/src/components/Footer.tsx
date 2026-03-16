/*
 * MinerU 生态与社区 — 页脚 (支持暗黑模式)
 */
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`border-t backdrop-blur-sm ${
      isDark
        ? "border-slate-700/50 bg-[#151827]/60"
        : "border-slate-200/50 bg-white/60"
    }`}>
      <div className="px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-[9px]">M</span>
          </div>
          <span className={`text-[12px] font-semibold ${isDark ? "text-slate-300" : "text-gray-700"}`} style={{ fontFamily: "var(--font-display)" }}>
            MinerU Ecosystem
          </span>
        </div>
        <p className={`text-[11px] ${isDark ? "text-slate-500" : "text-gray-400"}`}>
          &copy; {new Date().getFullYear()} OpenDataLab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
