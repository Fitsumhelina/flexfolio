"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

interface AboutData {
  name: string
  title: string
  bio: string
  email: string
  github?: string
  linkedin?: string
}

export function Hero() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        console.log("[v0] Hero: Fetching about data")
        const response = await fetch("/api/about")
        console.log("[v0] Hero: API response status:", response.status)
        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Hero: Received about data:", data.name)
          setAboutData(data)
        } else {
          console.error("[v0] Hero: API response not ok:", response.status)
        }
      } catch (error) {
        console.error("[v0] Hero: Error fetching about data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="h-16 bg-gray-800 rounded animate-pulse mb-6" />
          <div className="h-8 bg-gray-800 rounded animate-pulse mb-8 max-w-2xl mx-auto" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="h-12 w-32 bg-gray-800 rounded animate-pulse" />
            <div className="h-12 w-32 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg rotate-12 animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg -rotate-12 animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">Hi, I'm {aboutData?.name || "Developer"}</h2>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          {aboutData?.title || "Full Stack Developer"}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {aboutData?.bio || "Crafting digital experiences with modern technologies and innovative solutions"}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToContact}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          {aboutData?.github && (
            <a
              href={aboutData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          )}
          {aboutData?.linkedin && (
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {aboutData?.email && (
            <a href={`mailto:${aboutData.email}`} className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-gray-400" />
      </div>
    </section>
  )
}
