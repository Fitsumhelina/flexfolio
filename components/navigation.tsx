"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings } from "lucide-react"
import Link from "next/link"

interface AboutData {
  name: string
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about")
        if (response.ok) {
          const data = await response.json()
          setAboutData(data)
        }
      } catch (error) {
        console.error("Error fetching about data for navigation:", error)
      }
    }

    fetchAboutData()
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {aboutData?.name || "Portfolio"}
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-white hover:text-blue-400 transition-colors">
                Home
              </a>
              <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="#projects" className="text-gray-300 hover:text-blue-400 transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-gray-300 hover:text-blue-400 transition-colors">
                Skills
              </a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                Contact
              </a>
              <Link href="/admin" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 text-white hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#projects" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
              Projects
            </a>
            <a href="#skills" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
              Skills
            </a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
              Contact
            </a>
            <Link href="/admin" className="block px-3 py-2 text-gray-400 hover:text-blue-400 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
