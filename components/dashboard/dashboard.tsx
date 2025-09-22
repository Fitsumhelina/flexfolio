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
  Globe,
  Home,
  BarChart3,
  FileText,
  Image,
  Link,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  Clock,
  Zap,
  Download,
  Trash2
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Enhanced Header */}
      <header className="border-b border-gray-800/50 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">FlexFolio</span>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/')}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleViewPortfolio}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Portfolio
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => router.push('/demo')}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <Star className="h-4 w-4 mr-2" />
                Demo
              </Button>
            </nav>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live</span>
              </div>
              <Button 
                variant="outline" 
                onClick={handleViewPortfolio}
                className=" text-white/80  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Portfolio
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your portfolio and customize your online presence
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Last updated</p>
                <p className="text-sm text-white">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Projects</p>
                  <p className="text-3xl font-bold text-blue-400">{user.portfolioData?.projects?.length || 0}</p>
                  <p className="text-xs text-gray-500">+{Math.floor(Math.random() * 5)} this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 hover:border-green-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Page Views</p>
                  <p className="text-3xl font-bold text-green-400">2,847</p>
                  <p className="text-xs text-gray-500">+12% this week</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Contact Messages</p>
                  <p className="text-3xl font-bold text-purple-400">23</p>
                  <p className="text-xs text-gray-500">+5 new</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 hover:border-orange-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Skills Listed</p>
                  <p className="text-3xl font-bold text-orange-400">{user.portfolioData?.skills?.length || 0}</p>
                  <p className="text-xs text-gray-500">Updated recently</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio URL */}
        <Card className="bg-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 mb-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-400" />
                  Your Portfolio URL
                </h3>
                <p className="text-gray-400 mb-3">
                  Your portfolio is live and accessible at:
                </p>
                <div className="flex items-center space-x-3">
                  <code className="bg-gray-800/80 px-4 py-2 rounded-lg text-blue-300 border border-gray-600 font-mono">
                    {typeof window !== 'undefined' ? window.location.origin : 'localhost:3000'}/{user.username}
                  </code>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const url = `${typeof window !== 'undefined' ? window.location.origin : 'localhost:3000'}/${user.username}`
                      navigator.clipboard.writeText(url)
                    }}
                    className="text-white/80 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:text-white"
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleViewPortfolio}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Palette className="h-4 w-4 mr-2" />
              Design
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                className="transition-all duration-300 group border-0 rounded-xl shadow-lg bg-[linear-gradient(90deg,_rgba(0,178,255,1)_0%,_rgba(87,100,199,1)_50%,_rgba(237,83,234,1)_100%)]"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-white group-hover:text-blue-100 transition-colors">
                    <User className="h-5 w-5 mr-2 text-white/80" />
                    About Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4 text-sm">
                    {user.portfolioData?.about?.bio
                      ? `${user.portfolioData.about.bio.substring(0, 100)}...`
                      : "No bio added yet"}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-white/30 text-white/90 bg-white/10"
                    >
                      {user.portfolioData?.about?.bio ? "Complete" : "Incomplete"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/dashboard/about")}
                      className="text-black border-white/40 hover:bg-white/10 hover:border-white/60 hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-[linear-gradient(90deg,_rgba(42,123,155,1)_0%,_rgba(87,199,133,1)_50%,_rgba(204,237,83,1)_100%)] border-0 transition-all duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-white  transition-colors">
                    <Code className="h-5 w-5 mr-2 text-[#57C785]" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 mb-4 text-sm">
                    {user.portfolioData?.projects?.length || 0} projects added
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-[#57C785]/30 text-[#57C785] bg-white/10">
                      {user.portfolioData?.projects?.length || 0} Active
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push('/dashboard/projects')}
                      className="border-white/40 text-black hover:bg-white/10 hover:border-white/60 hover:text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-[linear-gradient(90deg,_rgba(237,0,194,1)_0%,_rgba(199,87,188,1)_50%,_rgba(168,83,237,1)_100%)] border-0 transition-all duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-white group-hover:text-pink-200 transition-colors">
                    <Zap className="h-5 w-5 mr-2 text-pink-300" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 mb-4 text-sm">
                    {user.portfolioData?.skills?.length || 0} skills added
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-pink-400/30 text-pink-200 bg-white/10">
                      {user.portfolioData?.skills?.length || 0} Skills
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push('/dashboard/skills')}
                      className="border-white/40 text-black hover:bg-white/10 hover:border-white/60 hover:text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Projects and Quick Actions Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Recent Projects</CardTitle>
                    <Button 
                      onClick={() => router.push('/dashboard/projects')}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.portfolioData?.projects?.slice(0, 3).map((project, index) => (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{project.title}</h4>
                          <p className="text-gray-400 text-sm">
                            {project.status} • {index === 0 ? '2 days ago' : index === 1 ? '1 week ago' : '3 days ago'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => router.push('/dashboard/projects')}
                            className="text-gray-400 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <h4 className="text-white font-medium mb-2">No Projects Yet</h4>
                        <p className="text-gray-400 text-sm mb-4">Start building your portfolio by adding your first project.</p>
                        <Button 
                          onClick={() => router.push('/dashboard/projects')}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Project
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => router.push('/dashboard/projects')}
                      className="bg-blue-500 hover:bg-blue-600 text-white h-auto p-6 flex flex-col items-center space-y-3 group"
                    >
                      <Plus className="h-6 w-6" />
                      <span className="font-medium">New Project</span>
                    </Button>
                    <Button 
                      onClick={() => router.push('/dashboard/about')}
                      className="bg-purple-500 hover:bg-purple-600 text-white h-auto p-6 flex flex-col items-center space-y-3 group"
                    >
                      <Edit className="h-6 w-6" />
                      <span className="font-medium">Edit About</span>
                    </Button>
                    <Button 
                      className="bg-green-500 hover:bg-green-600 text-white h-auto p-6 flex flex-col items-center space-y-3 group"
                    >
                      <BarChart3 className="h-6 w-6" />
                      <span className="font-medium">Analytics</span>
                    </Button>
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white h-auto p-6 flex flex-col items-center space-y-3 group"
                    >
                      <Settings className="h-6 w-6" />
                      <span className="font-medium">Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-400" />
                    About Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Manage your personal information, bio, and contact details.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">Email</span>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        {user.portfolioData?.about?.email ? 'Set' : 'Not Set'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">Phone</span>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        {user.portfolioData?.about?.phone ? 'Set' : 'Not Set'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">Location</span>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        {user.portfolioData?.about?.location ? 'Set' : 'Not Set'}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/dashboard/about')}
                    className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-800/50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit About Section
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Code className="h-5 w-5 mr-2 text-green-400" />
                    Projects & Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Showcase your work and highlight your technical skills.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">Projects</span>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        {user.portfolioData?.projects?.length || 0} Added
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">Skills</span>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        {user.portfolioData?.skills?.length || 0} Added
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => router.push('/dashboard/projects')}
                      className="border-gray-500 text-white hover:bg-gray-700 hover:border-gray-400"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => router.push('/dashboard/skills')}
                      className="border-gray-500 text-white hover:bg-gray-700 hover:border-gray-400"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-purple-400" />
                  Design & Themes
                </CardTitle>
                <p className="text-gray-400">
                  Customize the look and feel of your portfolio with beautiful themes.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border-2 border-blue-500/50 rounded-xl p-4 hover:border-blue-500 cursor-pointer transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                    <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-3 relative">
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-500 text-white">Active</Badge>
                      </div>
                    </div>
                    <h4 className="font-semibold text-white mb-1">Dark Theme</h4>
                    <p className="text-sm text-gray-400">Professional and modern</p>
                  </div>
                  <div className="border border-gray-600 rounded-xl p-4 hover:border-gray-500 cursor-pointer transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50 opacity-60">
                    <div className="w-full h-32 bg-gradient-to-br from-white to-gray-100 rounded-lg mb-3 relative">
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="border-gray-500 text-gray-400">Soon</Badge>
                      </div>
                    </div>
                    <h4 className="font-semibold text-white mb-1">Light Theme</h4>
                    <p className="text-sm text-gray-400">Clean and minimal</p>
                  </div>
                  <div className="border border-gray-600 rounded-xl p-4 hover:border-gray-500 cursor-pointer transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50 opacity-60">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg mb-3 relative">
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="border-gray-500 text-gray-400">Soon</Badge>
                      </div>
                    </div>
                    <h4 className="font-semibold text-white mb-1">Blue Theme</h4>
                    <p className="text-sm text-gray-400">Vibrant and energetic</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium text-white mb-2">Customization Options</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Primary Color</span>
                      <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-gray-600"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Font Size</span>
                      <Badge variant="outline" className="border-gray-500 text-gray-400">Medium</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2 text-orange-400" />
                    Account Information
                  </CardTitle>
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
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        value={user.email}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
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
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                        readOnly
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-orange-500"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Update Account Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LogOut className="h-5 w-5 mr-2 text-red-400" />
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h5 className="font-medium text-white mb-2">Portfolio Statistics</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Member since</span>
                          <span className="text-white">{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Last updated</span>
                          <span className="text-white">{new Date(user.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Portfolio URL</span>
                          <span className="text-blue-400">/{user.username}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Portfolio Data
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50"
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Share Portfolio
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleLogout}
                        className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
