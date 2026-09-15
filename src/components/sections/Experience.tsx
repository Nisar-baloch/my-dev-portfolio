"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    role: "Co-Founder & Full-Stack Developer",
    company: "Inbyo Tech",
    date: "Present",
    description: "Leading technical architecture and development of digital technology solutions, web applications, and custom software. Serving clients across Pakistan, UAE, USA, UK, Canada, and Australia with services spanning web development, mobile applications, data analytics, DevOps, cloud solutions, and AI strategy.",
    stack: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB"],
  },
  {
    role: "Full-Stack / MERN Stack Developer",
    company: "Freelance & Independent",
    date: "2022 — Present",
    description: "Built scalable web applications, REST APIs, and interactive frontends for various clients. Transitioned from a Python/Django backend focus to mastering the complete MERN ecosystem, specializing in full-stack architecture.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
  },
  {
    role: "Backend Developer — Python & Django",
    company: "Early Career",
    date: "2021 — 2022",
    description: "Developed robust backend systems, CRUD applications, and inventory management systems using Python and Django. Built EarthShop, a Django-based shop management system with invoicing, stock tracking, and reporting features.",
    stack: ["Python", "Django", "SQLite", "Bootstrap"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 relative max-w-4xl mx-auto px-6 border-t border-border/50">
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Experience
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          My development journey — from Python backends to building a full-stack company.
        </motion.p>
      </div>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex items-start gap-8 md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-background bg-accent shadow-sm z-10 group-hover:scale-125 transition-transform" />

              {/* Spacer on mobile to push content right of the line */}
              <div className="w-8 shrink-0 md:hidden" />

              {/* Content Card */}
              <div className="flex-1 md:max-w-[calc(50%-2rem)] p-6 rounded-2xl bg-card border border-border shadow-sm group-hover:border-accent/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="font-bold text-lg leading-tight">{exp.role}</h3>
                  <span className="text-sm font-mono text-accent px-3 py-1 rounded-full bg-accent/10 whitespace-nowrap shrink-0">
                    {exp.date}
                  </span>
                </div>
                <div className="text-foreground font-medium mb-3">{exp.company}</div>
                <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map(tech => (
                    <span key={tech} className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
