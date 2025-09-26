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
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to FlexFolio
            </Button>
            <div className="text-white">
              <span className="font-semibold">Demo Portfolio</span>
              <span className="text-white/80 ml-2">- See what you can build</span>
            </div>
          </div>
          <Button 
            onClick={() => router.push('/register')}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Create Your Own
          </Button>
        </div>
      </div>

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
      <div className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Create Your Own Portfolio?</h3>
          <p className="text-gray-400 mb-6">
            Join thousands of developers who have already created their perfect portfolio with FlexFolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
    
            <Button 
              variant="outline"
              onClick={() => window.open('/register', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Start Here
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
