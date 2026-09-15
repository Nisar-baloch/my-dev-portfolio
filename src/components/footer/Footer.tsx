"use client"

import Link from "next/link"
import { Mail, ArrowUp } from "lucide-react"
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/icons"

import { siteConfig } from "@/config/site"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border/50 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display text-3xl font-bold mb-2">{siteConfig.name}</span>
            <span className="text-muted-foreground text-sm font-medium">{siteConfig.role}</span>
            <span className="text-muted-foreground text-sm font-medium">{siteConfig.secondaryRole}</span>
            <span className="text-muted-foreground text-sm font-medium">Co-Founder — {siteConfig.company}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href={siteConfig.social.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </Link>
            <Link href={`mailto:${siteConfig.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={20} />
            </Link>
            <Link href={siteConfig.social.linkedin} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </Link>
          </div>

          <button 
            onClick={scrollToTop}
            className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nisar Ahmed. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#home" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="#projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link href="#inbyo" className="hover:text-foreground transition-colors">Inbyo Tech</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
