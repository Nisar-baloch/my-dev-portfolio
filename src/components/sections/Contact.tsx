"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, ExternalLink, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/icons"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "unconfigured">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.status === 501) {
        setStatus("unconfigured")
        setErrorMessage(data.details || data.error)
      } else if (!res.ok) {
        setStatus("error")
        setErrorMessage(data.error || "An error occurred. Please try again.")
      } else {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error. Please try again later.")
    }
  }

  return (
    <section id="contact" className="py-24 relative max-w-6xl mx-auto px-6 border-t border-border/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s build something <span className="text-accent">great</span>.
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Have an idea, product, or business problem? Let&apos;s turn it into a modern digital experience.
          </p>

          <div className="flex flex-col gap-6">
            <ContactLink href={`mailto:${siteConfig.email}`} icon={<Mail />} label={siteConfig.email} />
            <ContactLink href={siteConfig.social.github} icon={<Github />} label={`github.com/${siteConfig.social.github.split("/").pop()}`} />
            <ContactLink href={siteConfig.social.linkedin} icon={<Linkedin />} label="LinkedIn Profile" />
            <ContactLink href="#inbyo" icon={<ExternalLink />} label={siteConfig.company} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-3xl bg-card border border-border shadow-sm">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading" || status === "success"}
                placeholder="John Doe"
                className="px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all disabled:opacity-50"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading" || status === "success"}
                placeholder="john@example.com"
                className="px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <input 
                type="text" 
                id="subject" 
                value={formData.subject}
                onChange={handleChange}
                disabled={status === "loading" || status === "success"}
                placeholder="Project Inquiry"
                className="px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all disabled:opacity-50"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading" || status === "success"}
                placeholder="Tell me about your project..."
                className="px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none disabled:opacity-50"
              />
            </div>

            {status === "unconfigured" && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm flex items-start gap-3">
                <AlertCircle className="shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-medium mb-1">Email integration not configured</p>
                  <p className="opacity-80">{errorMessage}</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {status === "success" && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Your message has been sent successfully!</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  Sending...
                  <Loader2 size={18} className="animate-spin" />
                </>
              ) : status === "success" ? (
                <>
                  Sent
                  <CheckCircle2 size={18} />
                </>
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
    >
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        {icon}
      </div>
      <span className="font-medium text-lg">{label}</span>
    </Link>
  )
}
