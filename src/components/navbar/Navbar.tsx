"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 transition-all duration-300",
        isScrolled ? "pt-4" : "pt-6"
      )}
    >
      <div 
        className={cn(
          "flex items-center justify-between w-full max-w-6xl mx-auto px-6 py-3 rounded-full transition-all duration-300",
          isScrolled 
            ? "bg-background/70 backdrop-blur-md border border-border shadow-sm mx-4 sm:mx-6" 
            : "bg-transparent mx-4 sm:mx-6"
        )}
      >
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border/50 group-hover:border-accent transition-colors">
            {/* Placeholder until image is added */}
            <div className="w-full h-full bg-accent/20 flex items-center justify-center text-accent font-medium text-xs">
              {siteConfig.name.split(" ").map(n => n[0]).join("")}
            </div>
          </div>
          <span className="font-display text-2xl font-semibold tracking-wide">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
            >
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-accent/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-border h-6 flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 p-4 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg md:hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
