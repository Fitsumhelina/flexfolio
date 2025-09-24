"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Eye } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
  username: string
  portfolioData?: {
    about?: {
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
  }
}

export function AboutEditor() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    experience: "",
    projectsCompleted: "",
    email: "",
    phone: "",
    location: "",
    profileImage: ""
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
      
      // Populate form with existing data
      const aboutData = parsedUser.portfolioData?.about || {}
      setFormData({
        name: aboutData.name || parsedUser.name || "",
        title: aboutData.title || "Full Stack Developer",
        bio: aboutData.bio || "I'm a passionate developer who loves creating amazing digital experiences.",
        experience: aboutData.experience || "1+",
        projectsCompleted: aboutData.projectsCompleted || "5+",
        email: aboutData.email || parsedUser.email || "",
        phone: aboutData.phone || "",
        location: aboutData.location || "",
        profileImage: aboutData.profileImage || ""
      })
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push(ROUTES.LOGIN)
    }

    setIsLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/users/update-about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          aboutData: formData
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update local storage
        const updatedUser = {
          ...user,
          portfolioData: {
            ...user.portfolioData,
            about: formData
          }
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        setMessage({ type: 'success', text: 'About section updated successfully!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update about section' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    }

    setIsSaving(false)
  }

  const handlePreview = () => {
    if (user?.username) {
      window.open(`/${user.username}`, '_blank')
    }
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(ROUTES.DASHBOARD)}
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold">Edit About Section</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={handlePreview}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-900/20 border-green-500/30 text-green-400' : 'bg-red-900/20 border-red-500/30 text-red-400'}`}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="title" className="text-gray-300">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="Full Stack Developer"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white min-h-32"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Experience & Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="experience" className="text-gray-300">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="5+"
                  />
                </div>

                <div>
                  <Label htmlFor="projectsCompleted" className="text-gray-300">Projects Completed</Label>
                  <Input
                    id="projectsCompleted"
                    name="projectsCompleted"
                    value={formData.projectsCompleted}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="50+"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-gray-300">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div>
                  <Label htmlFor="profileImage" className="text-gray-300">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Profile Image */}
                  <div className="text-center">
                    {formData.profileImage ? (
                      <img 
                        src={formData.profileImage} 
                        alt={formData.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {formData.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name and Title */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">{formData.name || "Your Name"}</h2>
                    <p className="text-blue-400 text-lg">{formData.title || "Your Title"}</p>
                  </div>

                  {/* Bio */}
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                      {formData.bio || "Your bio will appear here..."}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {formData.experience || "0+"}
                      </div>
                      <div className="text-gray-400 text-sm">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {formData.projectsCompleted || "0+"}
                      </div>
                      <div className="text-gray-400 text-sm">Projects Completed</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    {formData.email && (
                      <div className="flex items-center text-gray-300">
                        <span className="text-sm">{formData.email}</span>
                      </div>
                    )}
                    {formData.phone && (
                      <div className="flex items-center text-gray-300">
                        <span className="text-sm">{formData.phone}</span>
                      </div>
                    )}
                    {formData.location && (
                      <div className="flex items-center text-gray-300">
                        <span className="text-sm">{formData.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
