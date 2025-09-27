"use client"

import { DemoHero } from "@/components/demo-portfolio/hero"
import { DemoAbout } from "@/components/demo-portfolio/about"
import { DemoProjects } from "@/components/demo-portfolio/projects"
import { DemoSkills } from "@/components/demo-portfolio/skills"
import { DemoContact } from "@/components/demo-portfolio/contact"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { DemoNavigation } from "./demo-nav"

export function DemoPortfolio() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      

      {/* Original Portfolio Content */}
      <DemoNavigation />
      <br />
      <br />
      <DemoHero />
      <DemoAbout />
      <DemoProjects />
      <DemoSkills />
      <DemoContact />

   {/* Demo Footer */}
   <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="text-white hover:bg-white/20 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden xs:inline">Back to FlexFolio</span>
              <span className="inline xs:hidden">Back</span>
            </Button>
            <div className="text-white flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-base sm:text-lg">Demo Portfolio</span>
              <span className="text-white/80 ml-0 sm:ml-2 text-sm sm:text-base">- See what you can build</span>
            </div>
          </div>
          <Button 
            onClick={() => router.push('/register')}
            className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto mt-2 sm:mt-0"
          >
            <span className="text-base sm:text-lg">Create Your Own</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
