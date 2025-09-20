"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface AboutData {
  name: string
  title: string
  bio: string
  experience: string
  projectsCompleted: string
  email: string
  phone: string
  location: string
  profileImage?: string
}

export function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about")
        if (response.ok) {
          const data = await response.json()
          setAboutData(data)
        }
      } catch (error) {
        console.error("Error fetching about data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  if (loading) {
    return (
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-6 bg-gray-800 rounded animate-pulse" />
              <div className="h-6 bg-gray-800 rounded animate-pulse" />
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="h-24 bg-gray-800 rounded animate-pulse" />
                <div className="h-24 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-96 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  if (!aboutData) return null

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">{aboutData.bio}</p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{aboutData.projectsCompleted}</div>
                  <div className="text-gray-300">Projects Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{aboutData.experience}</div>
                  <div className="text-gray-300">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
              {aboutData.profileImage ? (
                <img
                  src={aboutData.profileImage || "/placeholder.svg"}
                  alt={aboutData.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-500 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mx-auto mb-4" />
                  <p>Profile Image</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
