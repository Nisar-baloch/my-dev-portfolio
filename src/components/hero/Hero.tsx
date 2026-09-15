"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/icons"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/config/site"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

export function Hero() {
  const [imageError, setImageError] = useState(false)

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] opacity-50 dark:opacity-30" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Profile Image & Availability */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border/50 p-1 bg-background shadow-sm">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {!imageError ? (
                  <Image 
                    src="/images/profile/profile.jpg"
                    alt={siteConfig.name}
                    fill
                    onError={() => setImageError(true)}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground font-medium text-lg">
                    {siteConfig.name.split(" ").map(n => n[0]).join("")}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium">Available for work</span>
            </div>
          </motion.div>

          {/* Headings */}
          <motion.div variants={itemVariants} className="space-y-4 mb-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hi, I&apos;m <span className="font-display font-normal text-accent">{siteConfig.name.split(" ")[0]}</span>.
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xl md:text-2xl font-medium text-muted-foreground">
              <span>{siteConfig.role}</span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-border" />
              <span>{siteConfig.secondaryRole}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="max-w-2xl text-lg text-muted-foreground/80 mb-10">
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link 
              href="#projects" 
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-transform"
            >
              View My Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#contact"
              className="px-6 py-3 rounded-full bg-card border border-border font-medium hover:bg-muted transition-colors"
            >
              Let&apos;s Connect
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <SocialLink href={siteConfig.social.github} icon={<Github size={20} />} label="GitHub" />
            <SocialLink href={`mailto:${siteConfig.email}`} icon={<Mail size={20} />} label="Email" />
            <SocialLink href={siteConfig.social.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-110 shadow-sm"
    >
      {icon}
    </Link>
  )
}
