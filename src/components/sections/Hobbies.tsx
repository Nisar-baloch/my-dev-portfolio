"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { siteConfig } from "@/config/site"

export function Hobbies() {
  return (
    <section id="hobbies" className="py-24 relative max-w-6xl mx-auto px-6 border-t border-border/50">
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Beyond the Code
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          What I do when I&apos;m not staring at a screen.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {siteConfig.hobbies.map((hobby, index) => (
          <HobbyCard key={hobby.id} hobby={hobby} index={index} />
        ))}
      </div>
    </section>
  )
}

interface Hobby {
  id: string;
  title: string;
  description: string;
  image: string;
  fallbackColor: string;
}

function HobbyCard({ hobby, index }: { hobby: Hobby, index: number }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group cursor-default flex flex-col gap-4"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
        {/* Styled Fallback */}
        <div className={`absolute inset-0 bg-gradient-to-br ${hobby.fallbackColor} flex items-center justify-center text-muted-foreground/50 font-medium`}>
           <span className="text-xl font-display opacity-50">{hobby.title}</span>
        </div>
        
        {!imageError && (
          <Image 
            src={hobby.image} 
            alt={hobby.title} 
            fill 
            onError={() => setImageError(true)}
            className="object-cover transition-[transform,opacity] duration-700 group-hover:scale-105 z-10 opacity-0 group-hover:opacity-100" 
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.remove("opacity-0")
            }}
          />
        )}
        <div className="absolute inset-0 border border-border/10 rounded-2xl z-20 pointer-events-none" />
      </div>
      
      <div className="flex items-start gap-4">
        <span className="text-sm font-mono text-accent">{hobby.id}</span>
        <div>
          <h3 className="text-xl font-semibold mb-2">{hobby.title}</h3>
          <p className="text-muted-foreground text-sm">{hobby.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
