"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Code, 
  Zap, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  BarChart3,
  Settings
} from "lucide-react"
import { ROUTES } from "@/lib/routes"

interface User {
  portfolioData?: {
    about?: any
    projects?: any[]
    skills?: any[]
  }
}

interface DashboardOverviewProps {
  user: User
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          className="transition-all duration-300 group rounded-xl shadow-lg bg-black border-2 border-gradient-to-r from-cyan-400 via-indigo-500 to-pink-400"
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
                className="border-[#57C785]/30 text-[#57C785] bg-white/10"
              >
                {user.portfolioData?.about?.bio ? "Complete" : "Incomplete"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card
          className="transition-all duration-300 group rounded-xl shadow-lg bg-black border-2 border-gradient-to-r from-cyan-400 via-indigo-500 to-pink-400"
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
                onClick={() => router.push(ROUTES.DASHBOARD_PROJECTS)}
                className="border-white/40 text-black hover:bg-white/10 hover:border-white/60 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card
          className="transition-all duration-300 group rounded-xl shadow-lg bg-black border-2 border-gradient-to-r from-cyan-400 via-indigo-500 to-pink-400"
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
                onClick={() => router.push(ROUTES.DASHBOARD_SKILLS)}
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
                onClick={() => router.push(ROUTES.DASHBOARD_PROJECTS)}
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
                      onClick={() => router.push(ROUTES.DASHBOARD_PROJECTS)}
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
                    onClick={() => router.push(ROUTES.DASHBOARD_PROJECTS)}
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
                onClick={() => router.push(ROUTES.DASHBOARD_PROJECTS)}
                className="bg-blue-500 hover:bg-blue-600 text-white h-auto p-6 flex flex-col items-center space-y-3 group"
              >
                <Plus className="h-6 w-6" />
                <span className="font-medium">New Project</span>
              </Button>
              <Button 
                onClick={() => {
                  // Switch to content tab and scroll to about section
                  const contentTab = document.querySelector('[data-state="inactive"][value="content"]') as HTMLElement
                  if (contentTab) {
                    contentTab.click()
                    setTimeout(() => {
                      const aboutSection = document.querySelector('[data-card="about-section"]')
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }, 100)
                  }
                }}
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
    </div>
  )
}
