"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Eye, 
  Edit, 
  Settings, 
  Plus, 
  ExternalLink, 
  User, 
  Palette, 
  Code,
  LogOut,
  Globe
} from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
  username: string
  portfolioData?: {
    about?: any
    projects?: any[]
    skills?: any[]
  }
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')

    if (!isAuthenticated || !userData) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleViewPortfolio = () => {
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold">FlexFolio</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={handleViewPortfolio}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Portfolio
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-400">
            Manage your portfolio and customize your online presence
          </p>
        </div>

        {/* Portfolio URL */}
        <Card className="bg-gray-900/50 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Your Portfolio URL</h3>
                <p className="text-gray-400 mb-2">
                  Your portfolio is live at:
                </p>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <code className="bg-gray-800 px-3 py-1 rounded text-blue-400">
                    {typeof window !== 'undefined' ? window.location.origin : 'localhost:3000'}/{user.username}
                  </code>
                </div>
              </div>
              <Button 
                onClick={handleViewPortfolio}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800">
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gray-800">
              Content
            </TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-gray-800">
              Design
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-800">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <User className="h-5 w-5 mr-2 text-blue-400" />
                    About Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    {user.portfolioData?.about?.bio || "No bio added yet"}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push('/dashboard/about')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit About
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Code className="h-5 w-5 mr-2 text-green-400" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    {user.portfolioData?.projects?.length || 0} projects added
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Palette className="h-5 w-5 mr-2 text-purple-400" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    {user.portfolioData?.skills?.length || 0} skills added
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/dashboard/about')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <Edit className="h-6 w-6" />
                    <span>Edit Profile</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <Plus className="h-6 w-6" />
                    <span>Add Project</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <Palette className="h-6 w-6" />
                    <span>Change Theme</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <Settings className="h-6 w-6" />
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Manage your portfolio content including about section, projects, and skills.
                </p>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/dashboard/about')}
                    className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit About Section
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Manage Projects
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Manage Skills
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Design & Themes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Customize the look and feel of your portfolio.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 cursor-pointer">
                    <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                    <h4 className="font-medium">Dark Theme</h4>
                    <p className="text-sm text-gray-400">Current</p>
                  </div>
                  <div className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 cursor-pointer">
                    <div className="w-full h-32 bg-gradient-to-br from-white to-gray-100 rounded mb-2"></div>
                    <h4 className="font-medium">Light Theme</h4>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                  <div className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 cursor-pointer">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-900 to-purple-900 rounded mb-2"></div>
                    <h4 className="font-medium">Blue Theme</h4>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      value={user.name}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      value={user.email}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <input 
                      type="text" 
                      value={user.username}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Update Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
