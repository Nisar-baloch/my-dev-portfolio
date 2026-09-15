"use client"

import { useState, useEffect } from "react"
import { Coffee } from "lucide-react"
import { siteConfig } from "@/config/site"

export function CoffeeCounter() {
  const [count, setCount] = useState(siteConfig.stats.coffeeCups)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedCount = localStorage.getItem("coffeeCount")
    if (storedCount) {
      // eslint-disable-next-line
      setCount(parseInt(storedCount, 10))
    }
    setMounted(true)
  }, [])

  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    localStorage.setItem("coffeeCount", newCount.toString())
  }

  return (
    <div 
      className="bento-card col-span-1 row-span-1 p-6 flex flex-col justify-between group cursor-pointer active:scale-95 transition-transform"
      onClick={handleIncrement}
      title="Click to add a coffee!"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleIncrement();
        }
      }}
    >
      <div className="flex items-center gap-2 mb-2 relative z-10">
        <Coffee size={16} className="text-muted-foreground" />
        <span className="text-sm font-medium">Coffees Drank</span>
      </div>
      <div className="relative z-10">
        <span className="text-4xl font-bold font-mono tracking-tighter">
          {mounted ? count.toLocaleString() : siteConfig.stats.coffeeCups.toLocaleString()}
        </span>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute -bottom-6 -right-6 text-muted/20 transition-transform group-hover:scale-110 group-hover:-rotate-12 group-active:scale-90 duration-500 z-0 pointer-events-none">
        <Coffee size={100} />
      </div>
    </div>
  )
}
