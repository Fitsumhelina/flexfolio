"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Mail, Zap } from "lucide-react"
import { ROUTES, userDashboard, userDashboardMail, userDashboardProjects, userDashboardSkills } from "@/lib/routes"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useAuth } from "@/components/auth/convex-auth-provider"

interface DashboardStatsProps {
  messageCount: number
  unreadCount: number
  username?: string
}

export function DashboardStats({ messageCount, unreadCount, username }: DashboardStatsProps) {
  const router = useRouter()
  const { user: sessionUser } = useAuth()
  
  // Convex queries
  const projects = useQuery(api.projects.getProjects, sessionUser ? { userId: sessionUser.userId } : "skip")
  const skills = useQuery(api.skills.getSkills, sessionUser ? { userId: sessionUser.userId } : "skip")

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between cursor-pointer"
          onClick={() => router.push(username ? userDashboardProjects(username) : ROUTES.DASHBOARD_PROJECTS)}
          >
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-blue-400">{projects?.length || 0}</p>
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
          <div className="flex items-center justify-between cursor-pointer">
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
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => router.push(username ? userDashboardMail(username) : ROUTES.DASHBOARD_MAIL)}
          >
            <div>
              <p className="text-gray-400 text-sm font-medium">Contact Messages</p>
              <p className="text-3xl font-bold text-purple-400">{messageCount}</p>
              <p className="text-xs text-gray-500">+{unreadCount} new</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-700 hover:border-orange-500/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between cursor-pointer"
          onClick={() => router.push(username ? userDashboardSkills(username) : ROUTES.DASHBOARD_SKILLS)}
          >
            <div>
              <p className="text-gray-400 text-sm font-medium">Skills Listed</p>
              <p className="text-3xl font-bold text-orange-400">{skills?.length || 0}</p>
              <p className="text-xs text-gray-500">Updated recently</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
