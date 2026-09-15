"use client"

import { Clock } from "lucide-react"

import { siteConfig } from "@/config/site"

export function CodingHours() {
  return (
    <div className="bento-card col-span-1 row-span-1 p-6 flex flex-col justify-between group">
      <div className="flex items-center gap-2 mb-2">
        <Clock size={16} className="text-muted-foreground" />
        <span className="text-sm font-medium">Hours Coding</span>
      </div>
      <div>
        <span className="text-4xl font-bold font-mono tracking-tighter">
          {siteConfig.stats.codingHours.toLocaleString()}
        </span>
      </div>
    </div>
  )
}
