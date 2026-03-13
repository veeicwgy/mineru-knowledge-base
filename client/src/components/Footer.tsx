/*
 * Design: MinerU Ecosystem — Clean Footer
 * White background, minimal, matching mineru.net style
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
    <footer className="border-t border-gray-200 bg-white">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-white font-bold text-xs">U</span>
            </div>
            <span className="text-sm font-semibold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              MinerU Agent Skills
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
              >
                {link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} OpenDataLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
