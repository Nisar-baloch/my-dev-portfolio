"use client"

import { useState, useEffect } from "react"
import { Activity } from "lucide-react"

interface WakaTimeData {
  text: string;
  progress: number;
  error?: string;
}

export function WakaTimeStats() {
  const [data, setData] = useState<WakaTimeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/wakatime")
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error("Failed to load WakaTime stats", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  return (
    <div className="bento-card col-span-1 row-span-1 p-6 flex flex-col group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Coding Daily Avg</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 w-24 bg-muted rounded mb-4"></div>
            <div className="w-full h-1.5 bg-muted rounded-full"></div>
          </div>
        ) : (
          <>
            <span className="text-3xl font-bold font-mono tracking-tighter mb-1">
              {data?.text || "0h 0m"}
            </span>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-1000" 
                style={{ width: `${data?.progress || 0}%` }} 
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium">
              <span>Goal: 8h</span>
              <span>{data?.progress || 0}%</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
