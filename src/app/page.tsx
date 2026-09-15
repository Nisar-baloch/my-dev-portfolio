import { Navbar } from "@/components/navbar/Navbar"
import { Hero } from "@/components/hero/Hero"
import { DeveloperDashboard } from "@/components/dashboard/DeveloperDashboard"
import { About } from "@/components/sections/About"
import { Hobbies } from "@/components/sections/Hobbies"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Experience } from "@/components/sections/Experience"
import { Inbyo } from "@/components/sections/Inbyo"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/footer/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <DeveloperDashboard />
        <About />
        <Hobbies />
        <Skills />
        <Projects />
        <Experience />
        <Inbyo />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
