"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Inbyo Tech", href: "#inbyo" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [imageError, setImageError] = useState(false)
  const [avatarHovered, setAvatarHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = navLinks.map(link => link.href.substring(1))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500",
        isScrolled ? "pt-3" : "pt-5"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between w-full max-w-6xl mx-4 sm:mx-6 px-4 py-2.5 rounded-full transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border border-border/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        {/* Logo / Avatar */}
        <Link
          href="#home"
          className="flex items-center gap-3 group"
          onMouseEnter={() => setAvatarHovered(true)}
          onMouseLeave={() => setAvatarHovered(false)}
        >
          {/* Avatar with animated ring */}
          <div className="relative flex-shrink-0">
            {/* Outer glow ring */}
            <motion.div
              animate={avatarHovered
                ? { scale: 1.15, opacity: 1 }
                : { scale: 1, opacity: 0.6 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-violet-500 to-pink-500 blur-[3px]"
              style={{ margin: "-2px" }}
            />
            {/* Spinning conic gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                margin: "-2px",
                background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                opacity: avatarHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
            {/* Avatar image */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-background z-10">
              {!imageError ? (
                <Image
                  src="/images/profile/profile.jpg"
                  alt={siteConfig.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm">
                  {siteConfig.name.split(" ").map(n => n[0]).join("")}
                </div>
              )}
            </div>
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 z-20 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-background" />
            </span>
          </div>

          {/* Name */}
          <motion.span
            animate={avatarHovered
              ? { x: 2, opacity: 1 }
              : { x: 0, opacity: 1 }
            }
            className="font-display text-xl font-semibold tracking-wide bg-clip-text"
          >
            {siteConfig.name}
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                activeSection === link.href.substring(1)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-accent/10 rounded-full border border-accent/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
          <div className="ml-2 pl-3 border-l border-border h-5 flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-full bg-muted/60 text-foreground border border-border/50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-4 right-4 mt-2 p-3 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl md:hidden flex flex-col gap-1"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    activeSection === link.href.substring(1)
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
