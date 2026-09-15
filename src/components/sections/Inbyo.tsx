"use client"

import { motion } from "framer-motion"
import { Globe, Code2, Smartphone, ShieldCheck, Database, Cloud, ArrowRight } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"

const services = [
  { name: "Web Development", description: "Modern, fast, and scalable web applications.", icon: Code2 },
  { name: "Mobile Applications", description: "Cross-platform mobile experiences.", icon: Smartphone },
  { name: "Data Analytics", description: "Data-driven insights and reporting.", icon: Database },
  { name: "DevOps & Cloud", description: "Deployment pipelines and cloud infrastructure.", icon: Cloud },
  { name: "Security & Compliance", description: "Secure systems and best-practice implementations.", icon: ShieldCheck },
  { name: "Global Reach", description: "Serving clients across 6+ countries.", icon: Globe },
]

const markets = ["Pakistan", "UAE", "USA", "UK", "Canada", "Australia"]

export function Inbyo() {
  return (
    <section id="inbyo" className="py-24 relative max-w-6xl mx-auto px-6 border-t border-border/50">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start gap-16">
        {/* Left: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            My Company
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {siteConfig.company}
          </h2>
          
          <h3 className="text-xl font-medium text-muted-foreground mb-6">
            Co-Founder & Lead Developer
          </h3>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            At Inbyo Tech, we provide premium digital technology and software services.
            From custom web and mobile applications to cloud solutions and AI strategy,
            we partner with businesses to turn complex problems into elegant digital products.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {markets.map(m => (
              <span key={m} className="px-3 py-1 rounded-full border border-border text-sm text-muted-foreground font-medium">
                {m}
              </span>
            ))}
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors group"
          >
            Work With Us
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Right: Services Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 grid grid-cols-2 gap-4 w-full"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.07 }}
                className="p-5 rounded-2xl bg-card border border-border shadow-sm flex flex-col gap-3 hover:border-accent/40 hover:bg-accent/5 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
