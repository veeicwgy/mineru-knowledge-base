/*
 * LobeHub-inspired minimal footer
 * Clean, simple, professional
 */
import { ExternalLink } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com/opendatalab/MinerU" },
  { label: "OpenAPI 规范", href: "#" },
  { label: "文档中心", href: "#" },
  { label: "ClawHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-[9px]">M</span>
            </div>
            <span className="text-[13px] font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              MinerU Ecosystem
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center gap-1"
              >
                {link.label}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-gray-400">
            &copy; {new Date().getFullYear()} OpenDataLab
          </p>
        </div>
      </div>
    </footer>
  );
}
