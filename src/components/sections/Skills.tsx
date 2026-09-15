"use client"

import { motion } from "framer-motion"

const skillCategories = [
  {
    title: "Frontend",
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend",
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    skills: ["Node.js", "Express.js", "Python", "Django", "REST APIs", "JWT"],
  },
  {
    title: "Database",
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10",
    skills: ["MongoDB", "Mongoose", "SQLite", "PostgreSQL"],
  },
  {
    title: "Tools & DevOps",
    color: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-500/10",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Skills() {
  return (
    <section id="skills" className="py-24 relative max-w-6xl mx-auto px-6 border-t border-border/50">
      <div className="mb-16 max-w-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Technical Skills
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          My technical ecosystem centers around the MERN stack and modern full-stack development — from crafting pixel-perfect UIs to architecting robust APIs and databases.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={cardVariants}
            className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:border-accent/30 group"
          >
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-5 ${category.bg} ${category.color}`}>
              {category.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
