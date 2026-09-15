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
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 24 },
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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-pink-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* ── Profile Avatar ── */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-5 mb-10">

            {/* Portrait card — shows full image, no colorful ring */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative group select-none"
            >
              {/* Soft ambient glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" style={{ margin: "-12px" }} />

              {/* Card shell — clean border, no rainbow */}
              <div className="relative w-44 h-56 rounded-3xl overflow-hidden border border-border/60 shadow-2xl ring-1 ring-white/5 z-10">
                {!imageError ? (
                  <Image
                    src="/images/profile/profile.jpg"
                    alt={siteConfig.name}
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-4xl">
                    {siteConfig.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}

                {/* Subtle inner vignette at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Online dot — bottom-right of card */}
              <span className="absolute bottom-3 right-3 z-20 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 ring-2 ring-background" />
              </span>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, type: "spring", stiffness: 280, damping: 22 }}
              whileHover={{ scale: 1.04, y: -1 }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 backdrop-blur-sm shadow-[0_0_24px_-10px_rgba(16,185,129,0.6)] cursor-default select-none"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                Available for work
              </span>
            </motion.div>
          </motion.div>

          {/* Headings */}
          <motion.div variants={itemVariants} className="space-y-4 mb-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hi, I&apos;m{" "}
              <span className="font-display font-normal text-accent">
                {siteConfig.name.split(" ")[0]}
              </span>
              .
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
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              View My Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="px-7 py-3.5 rounded-full bg-card border border-border font-semibold hover:bg-muted hover:scale-105 transition-all shadow-sm"
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
    <motion.div whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="flex items-center justify-center p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-colors shadow-sm"
      >
        {icon}
      </Link>
    </motion.div>
  )
}
