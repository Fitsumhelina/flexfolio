"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, User, FolderOpen, Settings, LogOut, ChevronLeft, ChevronRight, Zap } from "lucide-react"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: User, label: "About", href: "/admin/about" },
  { icon: FolderOpen, label: "Projects", href: "/admin/projects" },
  { icon: Zap, label: "Skills", href: "/admin/skills" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-700 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => router.push(item.href)}
              className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 ${
                isCollapsed ? "px-2" : "px-4"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20 ${
              isCollapsed ? "px-2" : "px-4"
            }`}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
