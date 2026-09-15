"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { GithubIcon as Github } from "@/components/icons"
import { siteConfig } from "@/config/site"

export function Projects() {
  return (
    <section id="projects" className="py-24 relative max-w-6xl mx-auto px-6 border-t border-border/50">
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          A selection of things I&apos;ve built, from full-stack applications to digital products.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteConfig.projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
  fallbackColor: string;
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group flex flex-col rounded-3xl bg-card border border-border overflow-hidden hover:border-accent/50 transition-colors"
    >
      <div className="relative aspect-video w-full bg-muted overflow-hidden">
        {/* Fallback styling if image fails to load or doesn't exist */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.fallbackColor} flex items-center justify-center text-muted-foreground/50 font-medium z-0`}>
          <span className="text-xl font-display opacity-50">{project.title}</span>
        </div>
        
        {!imageError && (
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            onError={() => setImageError(true)}
            className="object-cover z-10 transition-[transform,opacity] duration-700 group-hover:scale-105 opacity-0 group-hover:opacity-100"
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.remove("opacity-0")
            }}
          />
        )}
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="text-muted-foreground mb-6 flex-1">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech: string) => (
            <span key={tech} className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {project.github !== "#" && (
            <Link 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              <Github size={16} />
              Code
            </Link>
          )}
          {project.live !== "#" && (
            <Link 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
