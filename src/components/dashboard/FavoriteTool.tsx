"use client"

import { Heart } from "lucide-react"

import { siteConfig } from "@/config/site"

export function FavoriteTool() {
  return (
    <div className="bento-card col-span-1 row-span-1 p-6 flex flex-col justify-center items-center group relative overflow-hidden">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Heart size={14} className="text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Fav Tool</span>
      </div>

      <div className="mt-4 flex flex-col items-center gap-3">
        {/* Next.js Icon Logo */}
        <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 128 128" width="24" height="24" className="fill-current">
            <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"/>
          </svg>
        </div>
        <span className="font-semibold">{siteConfig.favoriteTool.name}</span>
      </div>
    </div>
  )
}
