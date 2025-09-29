"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES, userDashboard } from "@/lib/routes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/convex-auth-provider"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Github, 
  Eye,
  Save,
  X
} from "lucide-react"

interface Project {
  _id: string
  title: string
  description: string
  tech: string[]
  image?: string
  github?: string
  live?: string
  status: "Published" | "Draft"
}

interface User {
  _id: string
  name: string
  email: string
  username: string
  portfolioData?: {
    projects?: Project[]
  }
}

interface ProjectsManagerProps {
  username?: string
}

export function ProjectsManager({ username }: ProjectsManagerProps) {
  const { user: sessionUser, isLoading: sessionLoading } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const router = useRouter()

  // Convex queries and mutations
  const user = useQuery(api.users.getUser, sessionUser ? { userId: sessionUser.userId } : "skip")
  const projects = useQuery(api.projects.getProjects, sessionUser ? { userId: sessionUser.userId } : "skip")
  const createProjectMutation = useMutation(api.projects.createProject)
  const updateProjectMutation = useMutation(api.projects.updateProject)
  const deleteProjectMutation = useMutation(api.projects.deleteProject)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    image: "",
    github: "",
    live: "",
    status: "Draft" as "Published" | "Draft"
  })

  useEffect(() => {
    if (sessionLoading) return

    if (!sessionUser) {
      router.push(ROUTES.LOGIN)
      return
    }
  }, [sessionUser, sessionLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !sessionUser) return

    setIsSaving(true)
    setMessage(null)

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        tech: formData.tech.split(',').map(t => t.trim()).filter(t => t),
        image: formData.image || undefined,
        github: formData.github || undefined,
        live: formData.live || undefined,
        status: formData.status
      }

      if (editingProject) {
        // Update existing project
        await updateProjectMutation({
          projectId: editingProject._id as any, // Cast to Convex ID type
          ...projectData
        })
        setMessage({ type: 'success', text: 'Project updated successfully!' })
      } else {
        // Create new project
        await createProjectMutation({
          userId: sessionUser.userId,
          ...projectData
        })
        setMessage({ type: 'success', text: 'Project added successfully!' })
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving project:', error)
      setMessage({ type: 'error', text: 'Failed to save project. Please try again.' })
    }

    setIsSaving(false)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      image: project.image || "",
      github: project.github || "",
      live: project.live || "",
      status: project.status
    })
    setShowForm(true)
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await deleteProjectMutation({ projectId: projectId as any })
      setMessage({ type: 'success', text: 'Project deleted successfully!' })
    } catch (error) {
      console.error('Error deleting project:', error)
      setMessage({ type: 'error', text: 'Failed to delete project' })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tech: "",
      image: "",
      github: "",
      live: "",
      status: "Draft"
    })
    setEditingProject(null)
    setShowForm(false)
  }

  if (sessionLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const projectsList = projects || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(username ? userDashboard(username) : ROUTES.DASHBOARD)}
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold">Manage Projects</h1>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-900/20 border-green-500/30 text-green-400' : 'bg-red-900/20 border-red-500/30 text-red-400'}`}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projectsList.map((project) => (
            <Card key={project._id} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                  <Badge variant={project.status === 'Published' ? 'default' : 'outline'} 
                         className={project.status === 'Published' ? 'bg-green-500' : 'border-gray-500 text-gray-400'}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 text-sm line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <Badge key={index} variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(project)}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800/50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(project._id)}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projectsList.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
              <p className="text-gray-400 mb-6">Start building your portfolio by adding your first project.</p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={resetForm}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-300">Project Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="My Awesome Project"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white min-h-24"
                      placeholder="Describe your project..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tech" className="text-gray-300">Technologies (comma-separated)</Label>
                    <Input
                      id="tech"
                      name="tech"
                      value={formData.tech}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image" className="text-gray-300">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="https://example.com/project-image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="github" className="text-gray-300">GitHub URL</Label>
                    <Input
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="https://github.com/username/project"
                    />
                  </div>

                  <div>
                    <Label htmlFor="live" className="text-gray-300">Live Demo URL</Label>
                    <Input
                      id="live"
                      name="live"
                      value={formData.live}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="https://myproject.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-gray-300">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button 
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
