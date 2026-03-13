/*
 * LobeHub-style Skill Card
 * Icon + name + rating + author + description + tags + stats + copy command
 */
import { useState } from "react";
import { Star, Copy, Check, ExternalLink, Download, Eye } from "lucide-react";
import type { SkillItem } from "@/data/ecosystem";

const langColors: Record<string, string> = {
  "Node.js": "bg-green-100 text-green-700",
  Python: "bg-blue-100 text-blue-700",
  TypeScript: "bg-sky-100 text-sky-700",
  Rust: "bg-orange-100 text-orange-700",
  Go: "bg-cyan-100 text-cyan-700",
};

const langIcons: Record<string, string> = {
  "Node.js": "N",
  Python: "Py",
  TypeScript: "TS",
  Rust: "Rs",
  Go: "Go",
};

export default function SkillCard({ skill }: { skill: SkillItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (skill.command) {
      await navigator.clipboard.writeText(skill.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const colorClass = langColors[skill.lang || ""] || "bg-gray-100 text-gray-700";
  const iconText = langIcons[skill.lang || ""] || "?";

  return (
    <div className="skill-card group">
      {/* Header: icon + name + rating */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
          {iconText}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-gray-900 truncate" style={{ fontFamily: "var(--font-mono)" }}>
              {skill.name}
            </h4>
            {skill.official && (
              <span className="flex-shrink-0 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                官方
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-gray-500 tabular-nums">{skill.rating}</span>
            </div>
            <span className="text-xs text-gray-400">{skill.author}</span>
          </div>
        </div>
        {/* GitHub link */}
        <a
          href={skill.link || "#"}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          title="查看 ClawHub 示例"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Description */}
      <p className="text-[13px] text-gray-500 leading-relaxed mb-3 line-clamp-2">{skill.description}</p>

      {/* Badges */}
      {skill.badges && (
        <div className="flex flex-wrap gap-1 mb-3">
          {skill.badges.map((badge, j) => (
            <span key={j} className="text-[11px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Install command */}
      {skill.command && (
        <div className="code-block px-3 py-2 flex items-center gap-2 mb-3">
          <span className="text-emerald-400 text-xs select-none">$</span>
          <code className="text-[11px] text-gray-300 flex-grow overflow-x-auto whitespace-nowrap">
            {skill.command}
          </code>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors text-gray-500 hover:text-gray-300"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-auto pt-2 border-t border-gray-50">
        <span className="text-gray-500">{skill.lang}</span>
        <span className="flex-grow" />
        {skill.date && <span>{skill.date}</span>}
        {skill.downloads && (
          <span className="flex items-center gap-0.5">
            <Download className="w-3 h-3" />
            {skill.downloads}
          </span>
        )}
        {skill.views && (
          <span className="flex items-center gap-0.5">
            <Eye className="w-3 h-3" />
            {skill.views}
          </span>
        )}
      </div>
    </div>
  );
}
