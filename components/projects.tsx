"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image?: string
  github?: string
  live?: string
  status: "Published" | "Draft"
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects/published")
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg?height=200&width=400"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3 text-white">{project.title}</CardTitle>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.github && project.github !== "#" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  )}
                  {project.live && project.live !== "#" && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.open(project.live, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
