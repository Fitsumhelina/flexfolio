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
  id: string
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
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const router = useRouter()

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
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')

    if (!isAuthenticated || !userData) {
    router.push(ROUTES.LOGIN)
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error('Error parsing user data:', error)
    router.push(ROUTES.LOGIN)
    }

    setIsLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    setMessage(null)

    try {
      const projectData = {
        ...formData,
        tech: formData.tech.split(',').map(t => t.trim()).filter(t => t),
        id: editingProject?.id || Date.now().toString()
      }

      const response = await fetch('/api/users/update-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          project: projectData,
          isEdit: !!editingProject
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update local storage
        const updatedProjects = editingProject 
          ? (user.portfolioData?.projects || []).map(p => p.id === editingProject.id ? projectData : p)
          : [...(user.portfolioData?.projects || []), projectData]
        
        const updatedUser = {
          ...user,
          portfolioData: {
            ...user.portfolioData,
            projects: updatedProjects
          }
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        
        setMessage({ type: 'success', text: editingProject ? 'Project updated successfully!' : 'Project added successfully!' })
        resetForm()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save project' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
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
    if (!user || !confirm('Are you sure you want to delete this project?')) return

    try {
      const response = await fetch('/api/users/delete-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          projectId
        }),
      })

      if (response.ok) {
        const updatedProjects = (user.portfolioData?.projects || []).filter(p => p.id !== projectId)
        const updatedUser = {
          ...user,
          portfolioData: {
            ...user.portfolioData,
            projects: updatedProjects
          }
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        setMessage({ type: 'success', text: 'Project deleted successfully!' })
      }
    } catch (error) {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const projects = user.portfolioData?.projects || []

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
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-colors">
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
                    onClick={() => handleDelete(project.id)}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
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
