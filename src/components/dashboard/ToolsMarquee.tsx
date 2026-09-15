"use client"

import { Wrench } from "lucide-react"

const tools = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", 
  "Express", "MongoDB", "Mongoose", "Python", "Django", 
  "Tailwind CSS", "Bootstrap", "Git", "GitHub", "VS Code", 
  "Postman", "Vercel"
]

export function ToolsMarquee() {
  return (
    <div className="bento-card col-span-1 md:col-span-2 lg:col-span-4 row-span-1 p-6 relative overflow-hidden group">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/50 backdrop-blur-md px-2 py-1 rounded-full">
        <Wrench size={14} className="text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Tools</span>
      </div>

      <div className="mt-6 md:mt-2 relative flex overflow-x-hidden group-hover:[&>div]:[animation-play-state:paused]">
        {/* We need two identical containers for the seamless marquee effect */}
        {[1, 2].map((key) => (
          <div key={key} className="flex animate-marquee whitespace-nowrap">
            {tools.map((tool, index) => (
              <span
                key={`${key}-${index}`}
                className="mx-4 text-xl md:text-3xl font-bold text-muted-foreground/30 hover:text-foreground transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
