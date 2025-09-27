"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, LogOut, Download, Link, Lock, CheckCircle } from "lucide-react"

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
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [accountMessage, setAccountMessage] = useState<string | null>(null)
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null)

  const updateUserMutation = useMutation(api.users.updateUser)
  const changePasswordMutation = useMutation(api.users.changePassword)
  
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-black border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2 text-orange-400" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input 
                  id="name"
                  type="text" 
                  value={user.name}
                  onChange={(e) => setUser(prev => prev ? ({ ...prev, name: e.target.value }) : prev)}
                  className="w-full bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input 
                  id="email"
                  type="email" 
                  value={user.email}
                  onChange={(e) => setUser(prev => prev ? ({ ...prev, email: e.target.value }) : prev)}
                  className="w-full bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                />
              </div>
              <div>
                <Label htmlFor="username" className="text-gray-300">Username</Label>
                <Input 
                  id="username"
                  type="text" 
                  value={user.username}
                  onChange={(e) => setUser(prev => prev ? ({ ...prev, username: e.target.value }) : prev)}
                  className="w-full bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
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
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="text-white bg-green-500 hover:bg-green-600"
                  disabled={isUpdatingAccount}
                  onClick={async () => {
                    if (!user) return
                    setIsUpdatingAccount(true)
                    setAccountMessage(null)
                    try {
                      const updatedUser = await updateUserMutation({
                        userId: user._id as any,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        isActive: user.isActive !== false
                      })
                      setUser(updatedUser as any)
                      setAccountMessage('Account updated successfully')
                    } catch (error: any) {
                      setAccountMessage(error.message || 'Failed to update account')
                    } finally {
                      setIsUpdatingAccount(false)
                    }
                  }}
                >
                  {isUpdatingAccount ? 'Updating...' : 'Update'}
                </Button>
                {accountMessage && (
                  <span className={`text-sm flex items-center gap-1 ${
                    accountMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <CheckCircle className="h-4 w-4" />
                    {accountMessage}
                  </span>
                )}
              </div>
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

      <Card className="bg-black border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Lock className="h-5 w-5 mr-2 text-blue-400" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="oldPassword" className="text-gray-300">Current Password</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                  placeholder="Enter current password"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-gray-300">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="text-white bg-blue-500 hover:bg-blue-600"
                disabled={isUpdatingPassword || !passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                onClick={async () => {
                  if (!user) return
                  
                  if (passwordData.newPassword !== passwordData.confirmPassword) {
                    setPasswordMessage('New passwords do not match')
                    return
                  }
                  
                  if (passwordData.newPassword.length < 6) {
                    setPasswordMessage('New password must be at least 6 characters')
                    return
                  }
                  
                  setIsUpdatingPassword(true)
                  setPasswordMessage(null)
                  
                  try {
                    await changePasswordMutation({
                      userId: user._id as any,
                      oldPassword: passwordData.oldPassword,
                      newPassword: passwordData.newPassword
                    })
                    
                    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" })
                    setPasswordMessage('Password changed successfully')
                  } catch (error: any) {
                    setPasswordMessage(error.message || 'Failed to change password')
                  } finally {
                    setIsUpdatingPassword(false)
                  }
                }}
              >
                {isUpdatingPassword ? 'Changing...' : 'Change Password'}
              </Button>
              {passwordMessage && (
                <span className={`text-sm flex items-center gap-1 ${
                  passwordMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'
                }`}>
                  <CheckCircle className="h-4 w-4" />
                  {passwordMessage}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
