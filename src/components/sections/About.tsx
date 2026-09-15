"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section id="about" className="py-24 relative max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Building <span className="text-accent">digital</span> experiences that matter.
        </h2>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I&apos;m <span className="text-foreground font-medium">Nisar Ahmed</span>, a Full-Stack and MERN Stack Developer based in Pakistan.
            My journey in software started with a curiosity about how things work on the internet — 
            which quickly turned into a passion for building scalable, interactive, and fast web applications.
          </p>
          
          <p>
            As Co-Founder of <span className="text-foreground font-medium">Inbyo Tech</span>, I don&apos;t just write code — I solve problems.
            I bridge complex backend architectures with beautiful, user-centric interfaces.
            Whether it&apos;s designing a MongoDB schema, crafting a clean REST API with Node.js and Express,
            or building an animated React interface, I take pride in delivering quality at every layer.
          </p>

          <p>
            Before MERN, I built my technical foundations in <span className="text-foreground font-medium">Python and Django</span> —
            working on inventory systems, CRUD apps, and backend services. That experience gave me a deep
            appreciation for clean architecture and data integrity that I carry into every project today.
          </p>

          <p>
            My development philosophy:{" "}
            <strong className="text-foreground">Performance, Accessibility, and Design are non-negotiable.</strong>{" "}
            Great software should feel invisible to the user while empowering them to do more.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
