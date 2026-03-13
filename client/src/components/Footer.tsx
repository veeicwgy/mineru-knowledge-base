/*
 * MinerU 生态与社区 — 页脚
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-200/70 bg-white">
      <div className="px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-[9px]">M</span>
          </div>
          <span className="text-[12px] font-semibold text-gray-700" style={{ fontFamily: "var(--font-display)" }}>
            MinerU Ecosystem
          </span>
        </div>
        <p className="text-[11px] text-gray-400">
          &copy; {new Date().getFullYear()} OpenDataLab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
