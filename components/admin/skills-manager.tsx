"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Edit, Trash2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Skill {
  _id?: string
  id: string
  name: string
  category: string
  proficiency: number
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: 50,
  })
  const { toast } = useToast()

  const categories = ["Frontend", "Backend", "Cloud & DevOps", "Tools & Others"]

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills")
      if (response.ok) {
        const data = await response.json()
        setSkills(data)
      }
    } catch (error) {
      console.error("Error fetching skills:", error)
      toast({
        title: "Error",
        description: "Failed to fetch skills",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSkills = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skills),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Skills saved successfully",
        })
      }
    } catch (error) {
      console.error("Error saving skills:", error)
      toast({
        title: "Error",
        description: "Failed to save skills",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddSkill = () => {
    if (!formData.name || !formData.category) return

    const newSkill: Skill = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      proficiency: formData.proficiency,
    }

    if (editingSkill) {
      setSkills((prev) =>
        prev.map((skill) => (skill.id === editingSkill.id ? { ...newSkill, id: editingSkill.id } : skill)),
      )
    } else {
      setSkills((prev) => [...prev, newSkill])
    }

    setFormData({ name: "", category: "", proficiency: 50 })
    setShowForm(false)
    setEditingSkill(null)
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
    })
    setShowForm(true)
  }

  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
            <p className="text-gray-400">Manage your technical skills</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
          <p className="text-gray-400">Manage your technical skills</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
          <Button onClick={handleSaveSkills} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save All"}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowForm(false)
                  setEditingSkill(null)
                  setFormData({ name: "", category: "", proficiency: 50 })
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="skillName" className="text-gray-300">
                  Skill Name
                </Label>
                <Input
                  id="skillName"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="e.g., React"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-gray-300">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="proficiency" className="text-gray-300">
                  Proficiency (%)
                </Label>
                <Input
                  id="proficiency"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, proficiency: Number.parseInt(e.target.value) || 0 }))
                  }
                  className="bg-gray-700/50 border-gray-600 text-white"
                />
              </div>
            </div>
            <Button onClick={handleAddSkill} className="bg-blue-600 hover:bg-blue-700">
              {editingSkill ? "Update Skill" : "Add Skill"}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <Card key={category} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-sm">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.proficiency}%
                      </Badge>
                    </div>
                    <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditSkill(skill)}
                      className="text-gray-400 hover:text-white h-6 w-6 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No skills added yet</p>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Skill
          </Button>
        </div>
      )}
    </div>
  )
}
