"use client"

import { Code2, Terminal } from "lucide-react"
import { motion } from "framer-motion"

const codeLines = [
  { indent: 0, tokens: [
    { text: "import", color: "#c586c0" }, { text: " { useState } ", color: "#4fc1ff" },
    { text: "from", color: "#c586c0" }, { text: " 'react'", color: "#ce9178" },
  ]},
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [
    { text: "interface", color: "#c586c0" }, { text: " Developer ", color: "#4ec9b0" },
    { text: "{", color: "#d4d4d4" },
  ]},
  { indent: 2, tokens: [
    { text: "name", color: "#9cdcfe" }, { text: ": ", color: "#d4d4d4" },
    { text: "string", color: "#4ec9b0" }, { text: ";", color: "#d4d4d4" },
  ]},
  { indent: 2, tokens: [
    { text: "skills", color: "#9cdcfe" }, { text: ": ", color: "#d4d4d4" },
    { text: "string", color: "#4ec9b0" }, { text: "[];", color: "#d4d4d4" },
  ]},
  { indent: 0, tokens: [{ text: "}", color: "#d4d4d4" }]},
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [
    { text: "export default function", color: "#c586c0" },
    { text: " Portfolio", color: "#dcdcaa" },
    { text: "() {", color: "#d4d4d4" },
  ]},
  { indent: 2, tokens: [
    { text: "const", color: "#c586c0" }, { text: " me", color: "#9cdcfe" },
    { text: ": ", color: "#d4d4d4" }, { text: "Developer", color: "#4ec9b0" },
    { text: " = {", color: "#d4d4d4" },
  ]},
  { indent: 4, tokens: [
    { text: "name", color: "#9cdcfe" }, { text: ": ", color: "#d4d4d4" },
    { text: '"Nisar Ahmed"', color: "#ce9178" }, { text: ",", color: "#d4d4d4" },
  ]},
]

export function VSCodeCard() {
  return (
    <div className="bento-card col-span-1 md:col-span-2 row-span-2 flex flex-col overflow-hidden group bg-[#1e1e1e] border-[#333]/50 text-[#d4d4d4]">
      {/* Tab Bar */}
      <div className="flex items-center bg-[#2d2d2d] border-b border-[#1e1e1e]/80 px-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e1e] border-t border-t-[#0078d4] text-[11px] font-mono text-[#d4d4d4]">
          <Code2 size={12} className="text-[#569cd6]" />
          <span>portfolio.tsx</span>
        </div>
        {/* macOS dots */}
        <div className="flex gap-1.5 ml-auto mr-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Line Numbers */}
        <div className="flex flex-col text-[#4e4e4e] text-right text-[10px] sm:text-xs font-mono leading-relaxed pt-3 pl-2 pr-3 select-none bg-[#1e1e1e] shrink-0">
          {codeLines.map((_, i) => (
            <span key={i} className="leading-[1.8]">{i + 1}</span>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 pt-3 pb-3 pr-3 font-mono text-[10px] sm:text-xs leading-[1.8] overflow-hidden">
          {codeLines.map((line, i) => (
            <div key={i} style={{ paddingLeft: `${line.indent * 8}px` }}>
              {line.tokens.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                line.tokens.map((token, j) => (
                  <span key={j} style={{ color: token.color }}>{token.text}</span>
                ))
              )}
            </div>
          ))}

          {/* Blinking cursor on last visible line */}
          <div style={{ paddingLeft: `${4 * 8}px` }}>
            <span style={{ color: "#9cdcfe" }}>skills</span>
            <span style={{ color: "#d4d4d4" }}>: [</span>
            <span style={{ color: "#ce9178" }}>&quot;React&quot;</span>
            <span style={{ color: "#d4d4d4" }}>, </span>
            <span style={{ color: "#ce9178" }}>&quot;Next.js&quot;</span>
            <span style={{ color: "#d4d4d4" }}>]</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-[2px] h-3 bg-[#aeafad] ml-0.5 align-middle"
            />
          </div>
        </div>
      </div>

      {/* Terminal Overlay — slides up on hover */}
      <div className="border-t border-[#333]/60 bg-[#181818]/95 p-3 font-mono text-[10px] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <div className="flex items-center gap-2 text-[#cccccc] mb-2">
          <Terminal size={11} className="text-[#4ec9b0]" />
          <span className="text-[11px]">TERMINAL</span>
        </div>
        <div className="space-y-0.5">
          <div>
            <span className="text-[#569cd6]">~/portfolio</span>
            <span className="text-[#d4d4d4]"> $ npm run dev</span>
          </div>
          <div className="text-[#4ec9b0]">▲ Next.js 16.3.5</div>
          <div>
            <span className="text-[#4ec9b0]">✓ </span>
            <span className="text-[#d4d4d4]">Ready in 342ms — localhost:</span>
            <span className="text-[#ce9178]">3000</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-[#d4d4d4]"
            >_</motion.span>
          </div>
        </div>
      </div>
    </div>
  )
}
