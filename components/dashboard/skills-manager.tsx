"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES, userDashboard } from "@/lib/routes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/convex-auth-provider"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Zap
} from "lucide-react"

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
}

interface User {
  _id: string
  name: string
  email: string
  username: string
  portfolioData?: {
    skills?: Skill[]
  }
}

interface SkillsManagerProps {
  username?: string
}

export function SkillsManager({ username }: SkillsManagerProps) {
  const { user: sessionUser, isLoading: sessionLoading } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const router = useRouter()

  // Convex queries and mutations
  const user = useQuery(api.users.getUser, sessionUser ? { userId: sessionUser.userId } : "skip")
  const skills = useQuery(api.skills.getSkills, sessionUser ? { userId: sessionUser.userId } : "skip")
  const createSkillMutation = useMutation(api.skills.createSkill)
  const updateSkillMutation = useMutation(api.skills.updateSkill)
  const deleteSkillMutation = useMutation(api.skills.deleteSkill)

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: 50
  })

  const categories = [
    "Frontend",
    "Backend", 
    "DevOps",
  ]

  useEffect(() => {
    if (sessionLoading) return

    if (!sessionUser) {
      router.push(ROUTES.LOGIN)
      return
    }
  }, [sessionUser, sessionLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'proficiency' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !sessionUser) return

    setIsSaving(true)
    setMessage(null)

    try {
      const skillData = {
        name: formData.name,
        category: formData.category,
        proficiency: formData.proficiency
      }

      if (editingSkill) {
        // Update existing skill
        await updateSkillMutation({
          skillId: editingSkill.id as any, // Cast to Convex ID type
          ...skillData
        })
        setMessage({ type: 'success', text: 'Skill updated successfully!' })
      } else {
        // Create new skill
        await createSkillMutation({
          userId: sessionUser.userId,
          ...skillData
        })
        setMessage({ type: 'success', text: 'Skill added successfully!' })
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving skill:', error)
      setMessage({ type: 'error', text: 'Failed to save skill. Please try again.' })
    }

    setIsSaving(false)
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency
    })
    setShowForm(true)
  }

  const handleDelete = async (skillId: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      await deleteSkillMutation({ skillId: skillId as any })
      setMessage({ type: 'success', text: 'Skill deleted successfully!' })
    } catch (error) {
      console.error('Error deleting skill:', error)
      setMessage({ type: 'error', text: 'Failed to delete skill' })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      proficiency: 50
    })
    setEditingSkill(null)
    setShowForm(false)
  }

  if (sessionLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const skillsList = skills || []
  const skillsByCategory = skillsList.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

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
              <h1 className="text-xl font-semibold">Manage Skills</h1>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
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

        {/* Skills by Category */}
        {Object.keys(skillsByCategory).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Zap className="h-6 w-6 mr-2 text-purple-400" />
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill) => (
                    <Card key={skill.id} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(skill)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(skill.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Proficiency</span>
                            <span className="text-white font-medium">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Skills Yet</h3>
              <p className="text-gray-400 mb-6">Start building your skills profile by adding your first skill.</p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Skill
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Skill Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="bg-gray-900 border-gray-700 w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {editingSkill ? 'Edit Skill' : 'Add New Skill'}
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
                    <Label htmlFor="name" className="text-gray-300">Skill Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="React, JavaScript, Python..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-gray-300">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="proficiency" className="text-gray-300">
                      Proficiency: {formData.proficiency}%
                    </Label>
                    <input
                      type="range"
                      id="proficiency"
                      name="proficiency"
                      min="0"
                      max="100"
                      value={formData.proficiency}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button 
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Saving...' : (editingSkill ? 'Update Skill' : 'Add Skill')}
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
