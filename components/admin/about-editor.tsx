"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AboutData {
  _id?: string
  name: string
  title: string
  bio: string
  experience: string
  projectsCompleted: string
  email: string
  phone: string
  location: string
  profileImage?: string
  github?: string
  linkedin?: string
}

export function AboutEditor() {
  const [formData, setFormData] = useState<AboutData>({
    name: "",
    title: "",
    bio: "",
    experience: "",
    projectsCompleted: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const response = await fetch("/api/about")
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
      }
    } catch (error) {
      console.error("Error fetching about data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch about data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof AboutData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "About information saved successfully",
        })
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      console.error("Error saving about data:", error)
      toast({
        title: "Error",
        description: "Failed to save about information",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">About Section</h1>
            <p className="text-gray-400">Edit your personal information and bio</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
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
          <h1 className="text-3xl font-bold text-white mb-2">About Section</h1>
          <p className="text-gray-400">Edit your personal information and bio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="title" className="text-gray-300">
                Professional Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="e.g., Full Stack Developer"
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-gray-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="Tell visitors about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="experience" className="text-gray-300">
                Years of Experience
              </Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="e.g., 5+"
              />
            </div>
            <div>
              <Label htmlFor="projects" className="text-gray-300">
                Projects Completed
              </Label>
              <Input
                id="projects"
                value={formData.projectsCompleted}
                onChange={(e) => handleInputChange("projectsCompleted", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="e.g., 50+"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-300">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-gray-300">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media & Profile */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Social Media & Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="github" className="text-gray-300">
                GitHub URL
              </Label>
              <Input
                id="github"
                value={formData.github || ""}
                onChange={(e) => handleInputChange("github", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="text-gray-300">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                value={formData.linkedin || ""}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <Label htmlFor="profileImage" className="text-gray-300">
                Profile Image URL
              </Label>
              <Input
                id="profileImage"
                value={formData.profileImage || ""}
                onChange={(e) => handleInputChange("profileImage", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
