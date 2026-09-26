"use client"

import { useState, useEffect } from "react"
import { AudioLines } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface NowPlayingData {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/now-playing")
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch (error) {
        console.error("Failed to load Spotify data", error)
      }
    }
    
    // Initial fetch
    fetchData()

    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bento-card col-span-1 md:col-span-2 row-span-1 p-6 relative group overflow-hidden flex flex-col justify-between">
      <div className={`absolute inset-0 bg-gradient-to-r ${data?.isPlaying ? 'from-emerald-500/10' : 'from-muted/20'} to-transparent z-0 transition-colors duration-500`} />
      
      <div className="relative z-10 flex items-center gap-2 mb-4">
        <AudioLines size={16} className={data?.isPlaying ? "text-emerald-500" : "text-muted-foreground"} />
        <span className="text-sm font-medium">
          {data?.isPlaying ? "Now Playing" : "Not Playing"}
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-4">
        {/* Album Art */}
        <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0 overflow-hidden shadow-md relative">
          {data?.albumImageUrl ? (
            <Image src={data.albumImageUrl} alt={data.album || "Album Art"} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-800 dark:from-slate-700 dark:to-slate-900" />
          )}
        </div>
        
        <div className="flex flex-col overflow-hidden min-w-0">
          {data?.songUrl ? (
            <Link href={data.songUrl} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
              <h4 className="text-lg font-bold truncate">{data.title}</h4>
            </Link>
          ) : (
            <h4 className="text-lg font-bold truncate">{data?.title || "Offline"}</h4>
          )}
          <p className="text-sm text-muted-foreground truncate">{data?.artist || "Spotify disconnected"}</p>
        </div>

        {/* Equalizer animation */}
        {data?.isPlaying && (
          <div className="ml-auto flex items-end gap-1 h-8 flex-shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-emerald-500 rounded-t-sm"
                animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
