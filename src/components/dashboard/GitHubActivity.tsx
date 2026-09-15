"use client"

import { useState, useEffect } from "react"
import { GithubIcon as Github } from "@/components/icons"
import Link from "next/link"

interface GitHubData {
  contributions: number[];
  total: number;
  username: string;
  error?: string;
}

export function GitHubActivity() {
  const weeks = 12
  const days = 7
  
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github")
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error("Failed to load GitHub activity", error)
        // Fallback is handled by API route usually, but just in case
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  return (
    <div className="bento-card col-span-1 row-span-1 md:row-span-2 p-6 flex flex-col group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Github size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Activity</span>
        </div>
        {!loading && data && (
          <Link 
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            @{data.username}
          </Link>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-3 w-3/4 bg-muted rounded"></div>
            <div className="flex gap-1 overflow-hidden mt-2">
              {Array.from({ length: weeks }).map((_, w) => (
                <div key={w} className="flex flex-col gap-1">
                  {Array.from({ length: days }).map((_, d) => (
                    <div key={d} className="w-3 h-3 rounded-sm bg-muted/50" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              {data?.total ? `${data.total.toLocaleString()} contributions in the last year.` : "Continuously evolving with new features and case studies."}
            </p>
            
            <div className="flex gap-1 overflow-hidden">
              {Array.from({ length: weeks }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: days }).map((_, dayIndex) => {
                    const index = weekIndex * days + dayIndex
                    const level = data?.contributions?.[index] || 0
                    return (
                      <div 
                        key={dayIndex} 
                        className={`w-3 h-3 rounded-sm ${
                          level === 0 ? "bg-muted" :
                          level === 1 ? "bg-emerald-900/30 dark:bg-emerald-950" :
                          level === 2 ? "bg-emerald-700/50 dark:bg-emerald-800" :
                          level === 3 ? "bg-emerald-500/70 dark:bg-emerald-600" :
                          "bg-emerald-500 dark:bg-emerald-400"
                        }`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
