"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const demoProjects = [
  {
    id: "p1",
    title: "Modern Dashboard",
    description:
      "A responsive analytics dashboard with charts, theming, and realtime data.",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    image: "/project-placeholder.png",
    github: "#",
    live: "#",
  },
  {
    id: "p2",
    title: "E‑commerce Storefront",
    description:
      "Product listings, cart, and checkout flows with clean UI and state mgmt.",
    tech: ["React", "Zustand", "Stripe"],
    image: "/project-placeholder.png",
    github: "#",
    live: "#",
  },
  {
    id: "p3",
    title: "Team Tasks App",
    description:
      "Collaborative task management with roles, comments, and activity feed.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    image: "/project-placeholder.png",
    github: "#",
    live: "#",
  },
];

export function Projects() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
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
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
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
                      onClick={() => window.open(project.github as string, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  )}
                  {project.live && project.live !== "#" && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.open(project.live as string, "_blank")}
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
      </div>
    </section>
  );
}
