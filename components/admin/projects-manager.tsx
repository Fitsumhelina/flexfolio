"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { ProjectForm } from "./project-form"
import { useToast } from "@/hooks/use-toast"

interface Project {
  _id?: string
  id: string
  title: string
  description: string
  tech: string[]
  image?: string
  github?: string
  live?: string
  status: "Published" | "Draft"
  createdAt: string
  updatedAt: string
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch projects",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSaveProject = async (projectData: Omit<Project, "id" | "createdAt" | "updatedAt" | "_id">) => {
    try {
      if (editingProject) {
        const response = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        })

        if (response.ok) {
          const updated = await response.json()
          setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? updated : p)))
          toast({
            title: "Success",
            description: "Project updated successfully",
          })
        }
      } else {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        })

        if (response.ok) {
          const newProject = await response.json()
          setProjects((prev) => [...prev, newProject])
          toast({
            title: "Success",
            description: "Project created successfully",
          })
        }
      }
      setShowForm(false)
      setEditingProject(null)
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setProjects((prev) => prev.filter((p) => p.id !== id))
          toast({
            title: "Success",
            description: "Project deleted successfully",
          })
        }
      } catch (error) {
        console.error("Error deleting project:", error)
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        })
      }
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  if (showForm) {
    return (
      <ProjectForm
        project={editingProject || undefined}
        onSave={handleSaveProject}
        onCancel={() => {
          setShowForm(false)
          setEditingProject(null)
        }}
      />
    )
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-400">Manage your portfolio projects</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("All")}
            className={statusFilter === "All" ? "bg-blue-600" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "Published" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Published")}
            className={statusFilter === "Published" ? "bg-blue-600" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
          >
            Published
          </Button>
          <Button
            variant={statusFilter === "Draft" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Draft")}
            className={statusFilter === "Draft" ? "bg-blue-600" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
          >
            Draft
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg?height=200&width=400"}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    project.status === "Published"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }`}
                >
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-white mb-2">{project.title}</CardTitle>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-500/20 text-gray-400">
                    +{project.tech.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">{new Date(project.updatedAt).toLocaleDateString()}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditProject(project)}
                    className="text-gray-400 hover:text-white h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No projects found</p>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Project
          </Button>
        </div>
      )}
    </div>
  )
}
