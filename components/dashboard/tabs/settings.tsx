"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, LogOut, Download, Link } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
  username: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

interface DashboardSettingsProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  onLogout: () => void
}

export function DashboardSettings({ user, setUser, onLogout }: DashboardSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-black  border-green-500/20">
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
                onChange={(e) => setUser(prev => prev ? ({ ...prev, name: e.target.value }) : prev)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
              />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
              <input 
                type="email" 
                value={user.email}
                onChange={(e) => setUser(prev => prev ? ({ ...prev, email: e.target.value }) : prev)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
              />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
              <input 
                type="text" 
                value={user.username}
                onChange={(e) => setUser(prev => prev ? ({ ...prev, username: e.target.value }) : prev)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
              />
              <div className="mt-3 flex items-center gap-3">
                <label className="text-sm text-gray-300">Portfolio Status</label>
                <select
                  value={user.isActive !== false ? 'active' : 'inactive'}
                  onChange={(e) => setUser(prev => prev ? ({ ...prev, isActive: e.target.value === 'active' }) : prev)}
                  className="bg-gray-800/50 border border-gray-600 rounded-lg px-2 py-1 text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              </div>
              <Button 
                variant="outline" 
                className="text-white bg-green-500 hover:bg-green-600"
                onClick={async () => {
                  if (!user) return
                  const res = await fetch('/api/users/update-account', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user._id, account: { name: user.name, email: user.email, username: user.username, isActive: user.isActive !== false } })
                  })
                  const data = await res.json()
                  if (res.ok && data?.user) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    setUser(data.user)
                    alert('Account updated')
                  } else {
                    alert(data?.error || 'Failed to update')
                  }
                }}
              >
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-red-500/20">
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
                    <span className="text-white">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last updated</span>
                    <span className="text-white">{user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : '-'}</span>
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
                  className="w-full border-gray-600 text-black-300 hover:bg-white/50"
                  onClick={() => {
                    if (!user) return
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2))
                    const a = document.createElement('a')
                    a.href = dataStr
                    a.download = `flexfolio-${user.username}.json`
                    a.click()
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Portfolio Data
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-black-300 hover:bg-white/50"
                  onClick={() => {
                    if (!user) return
                    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${user.username}`
                    navigator.clipboard.writeText(url)
                    alert('Portfolio URL copied to clipboard')
                  }}
                >
                  <Link className="h-4 w-4 mr-2" />
                  Share Portfolio
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-white/50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
