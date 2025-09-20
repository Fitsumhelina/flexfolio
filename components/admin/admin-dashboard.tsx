import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye, Edit, Trash2, BarChart3, Settings } from "lucide-react"

const stats = [
  { title: "Total Projects", value: "12", change: "+2 this month", color: "text-blue-400" },
  { title: "Page Views", value: "2,847", change: "+12% this week", color: "text-green-400" },
  { title: "Contact Messages", value: "23", change: "+5 new", color: "text-purple-400" },
  { title: "Skills Listed", value: "18", change: "Updated recently", color: "text-orange-400" },
]

const recentProjects = [
  { name: "E-Commerce Platform", status: "Published", lastModified: "2 days ago" },
  { name: "Task Management App", status: "Draft", lastModified: "1 week ago" },
  { name: "AI Chat Application", status: "Published", lastModified: "3 days ago" },
]

export function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Manage your portfolio content and settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.change}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Projects</CardTitle>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">{project.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {project.status} • {project.lastModified}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex-col">
                <Plus className="h-6 w-6 mb-2" />
                New Project
              </Button>
              <Button className="h-20 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 flex-col">
                <Edit className="h-6 w-6 mb-2" />
                Edit About
              </Button>
              <Button className="h-20 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                Analytics
              </Button>
              <Button className="h-20 bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 flex-col">
                <Settings className="h-6 w-6 mb-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
