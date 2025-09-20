import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}
