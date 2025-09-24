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
import { useEffect as ReactUseEffect, useState as ReactUseState } from 'react'
import { ROUTES } from '@/lib/routes'

function Inbox({ user }: { user: User }) {
  const [messages, setMessages] = ReactUseState<Array<any>>([])
  const [selectedId, setSelectedId] = ReactUseState<string | null>(null)
  const [loading, setLoading] = ReactUseState(true)
  const selected = messages.find(m => m.id === selectedId) || null

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages?username=${user.username}`)
      const data = await res.json()
      if (Array.isArray(data)) setMessages(data)
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  ReactUseEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`/api/messages/${id}`, { method: 'DELETE' })
    if (selectedId === id) setSelectedId(null)
    load()
  }

  const markRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead: true }) })
    load()
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 border border-gray-700 rounded-lg overflow-hidden">
        <div className="px-3 py-2 bg-gray-800/60 text-gray-200">Inbox</div>
        <div className="max-h-96 overflow-auto divide-y divide-gray-800">
          {loading ? (
            <div className="p-4 text-gray-400">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="p-4 text-gray-400">No messages</div>
          ) : (
            messages.map(m => (
              <button key={m.id} onClick={() => { setSelectedId(m.id); markRead(m.id) }} className={`w-full text-left p-3 hover:bg-gray-800/50 ${selectedId===m.id ? 'bg-gray-800/70' : ''}`}>
                <div className="flex justify-between">
                  <span className="text-white">{m.fromName}</span>
                  {!m.isRead && <span className="text-xs text-blue-400">New</span>}
                </div>
                <div className="text-xs text-gray-400">{m.fromEmail}</div>
                <div className="text-sm text-gray-300 truncate">{m.subject || '(no subject)'}</div>
              </button>
            ))
          )}
        </div>
      </div>
      <div className="md:col-span-2 border border-gray-700 rounded-lg p-4 min-h-64">
        {selected ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white text-lg">{selected.subject || '(no subject)'}</div>
                <div className="text-sm text-gray-400">From {selected.fromName} &lt;{selected.fromEmail}&gt;</div>
              </div>
              <button onClick={() => handleDelete(selected.id)} className="text-red-400 hover:text-red-300">Delete</button>
            </div>
            <div className="h-px bg-gray-700 my-2" />
            <div className="whitespace-pre-wrap text-gray-200">{selected.body}</div>
          </div>
        ) : (
          <div className="text-gray-400">Select a message to preview</div>
        )}
      </div>
    </div>
  )
}

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
  createdAt?: string
  updatedAt?: string
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messageCount, setMessageCount] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const router = useRouter()
  const [aboutForm, setAboutForm] = useState({
    email: "",
    phone: "",
    location: "",
    github: "",
    x: "",
    telegram: "",
    linkedin: "",
    heroTitle: "",
    heroDescription: "",
    heroBackgroundMode: "gradient" as "gradient" | "image",
    heroGradientPreset: 1 as 1 | 2 | 3 | 4,
    heroBackgroundImageUrl: "",
    heroBackgroundBlurLevel: 0 as 0 | 1 | 2 | 3 | 4,
  })
  // Separate saving and message state for hero and social
  const [isSavingHero, setIsSavingHero] = useState(false)
  const [isSavingSocial, setIsSavingSocial] = useState(false)
  const [heroMessage, setHeroMessage] = useState<string | null>(null)
  const [socialMessage, setSocialMessage] = useState<string | null>(null)

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
      // Load message counts
      fetch(`/api/messages?username=${parsedUser.username}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setMessageCount(data.length)
            setUnreadCount(data.filter((m: any) => !m.isRead).length)
          }
        })
        .catch(() => {})
      const about = parsedUser?.portfolioData?.about || {}
      setAboutForm({
        email: about.email || "",
        phone: about.phone || "",
        location: about.location || "",
        github: about.github || "",
        x: about.x || about.twitter || "",
        telegram: about.telegram || "",
        linkedin: about.linkedin || "",
        heroTitle: about.heroTitle || about.title || "Full Stack Developer",
        heroDescription: about.heroDescription || about.bio || "",
        heroBackgroundMode: about.heroBackgroundMode || "gradient",
        heroGradientPreset: (about.heroGradientPreset as 1|2|3|4) || 1,
        heroBackgroundImageUrl: about.heroBackgroundImageUrl || "",
        heroBackgroundBlurLevel: (about.heroBackgroundBlurLevel as 0|1|2|3|4) || 0,
      })
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    }

    setIsLoading(false)
  }, [router])

  const handleAboutInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAboutForm(prev => ({ ...prev, [name]: value }))
  }

  // Accepts a callback for setting saving/message state
  const saveAboutPartial = async (
    updates: Partial<any>,
    setSaving: (v: boolean) => void,
    setMessage: (v: string | null) => void
  ) => {
    if (!user) return
    setSaving(true)
    setMessage(null)
    try {
      const currentAbout = user.portfolioData?.about || {}
      const mergedAbout = {
        // preserve existing about fields
        name: currentAbout.name || user.name,
        title: currentAbout.title || "Full Stack Developer",
        bio: currentAbout.bio || "",
        experience: currentAbout.experience || "",
        projectsCompleted: currentAbout.projectsCompleted || "",
        profileImage: currentAbout.profileImage || "",
        // contact
        email: currentAbout.email ?? aboutForm.email,
        phone: currentAbout.phone ?? aboutForm.phone,
        location: currentAbout.location ?? aboutForm.location,
        // socials
        github: currentAbout.github ?? aboutForm.github,
        x: currentAbout.x ?? aboutForm.x,
        telegram: currentAbout.telegram ?? aboutForm.telegram,
        linkedin: currentAbout.linkedin ?? aboutForm.linkedin,
        // hero settings (defaults preserved; will be overridden by updates)
        heroTitle: currentAbout.heroTitle ?? aboutForm.heroTitle,
        heroDescription: currentAbout.heroDescription ?? aboutForm.heroDescription,
        heroBackgroundMode: currentAbout.heroBackgroundMode ?? aboutForm.heroBackgroundMode,
        heroGradientPreset: currentAbout.heroGradientPreset ?? aboutForm.heroGradientPreset,
        heroBackgroundImageUrl: currentAbout.heroBackgroundImageUrl ?? aboutForm.heroBackgroundImageUrl,
        heroBackgroundBlurLevel: currentAbout.heroBackgroundBlurLevel ?? aboutForm.heroBackgroundBlurLevel,
        // apply incoming updates last
        ...updates,
      }

      const res = await fetch('/api/users/update-about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, aboutData: mergedAbout }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to save')
      }

      const updatedUser = {
        ...user,
        portfolioData: { ...(user.portfolioData || {}), about: mergedAbout },
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setMessage('Saved')
    } catch (err: any) {
      setMessage(err?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveHero = async () => {
    await saveAboutPartial(
      {
        heroTitle: aboutForm.heroTitle,
        heroDescription: aboutForm.heroDescription,
        heroBackgroundMode: aboutForm.heroBackgroundMode,
        heroGradientPreset: aboutForm.heroGradientPreset,
        heroBackgroundImageUrl: aboutForm.heroBackgroundImageUrl,
        heroBackgroundBlurLevel: aboutForm.heroBackgroundBlurLevel,
      },
      setIsSavingHero,
      setHeroMessage
    )
  }

  const handleSaveSocial = async () => {
    await saveAboutPartial(
      {
        github: aboutForm.github,
        x: aboutForm.x,
        telegram: aboutForm.telegram,
        linkedin: aboutForm.linkedin,
      },
      setIsSavingSocial,
      setSocialMessage
    )
  }

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
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse flex items-center justify-center">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
          <div className="w-64 h-6 bg-gray-800 rounded mb-2 animate-pulse" />
          <div className="w-48 h-4 bg-gray-800 rounded animate-pulse" />
          <div className="w-40 h-4 bg-gray-800 rounded animate-pulse" />
        </div>
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
            <div className="flex-shrink-0 flex items-center space-x-3">
            {/* Logo */}
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="flexfolio logo"
                className="w-8 h-10 object-contain"
              />
            </div>
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
                onClick={() => router.push(ROUTES.HOME)}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => router.push(ROUTES.DEMO)}
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
              <div className="flex items-center justify-between cursor-pointer"
              onClick={() => router.push(ROUTES.DASHBOARD_PROJECTS)}
              >
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
                onClick={() => router.push(ROUTES.DASHBOARD_MAIL)}
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
              onClick={() => router.push(ROUTES.DASHBOARD_SKILLS)}
              >
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
            <TabsTrigger value="inbox" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Mail className="h-4 w-4 mr-2" />
              Inbox
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(ROUTES.DASHBOARD_ABOUT)}
                      className="text-black border-white/40 hover:bg-white/10 hover:border-white/60 hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
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
                      onClick={() => router.push(ROUTES.DASHBOARD_ABOUT)}
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

        <TabsContent value="inbox" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Inbox user={user} />
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card
                className="bg-card-gradient-content-about border-0 shadow-lg" >
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2 text-white/80" />
                    Hero Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">Customize your hero section.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-white/80 mb-1">Hero Title</label>
                      <input
                        name="heroTitle"
                        value={aboutForm.heroTitle}
                        onChange={handleAboutInput}
                        placeholder="e.g. Full Stack Developer"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-white/80 mb-1">Hero Description</label>
                      <input
                        name="heroDescription"
                        value={aboutForm.heroDescription}
                        onChange={handleAboutInput}
                        placeholder="Short intro shown under the title"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Background Mode</label>
                      <select
                        name="heroBackgroundMode"
                        value={aboutForm.heroBackgroundMode}
                        onChange={handleAboutInput as any}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="gradient">Gradient</option>
                        <option value="image">Image</option>
                      </select>
                    </div>
                    {aboutForm.heroBackgroundMode === 'gradient' ? (
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Gradient Preset</label>
                        <select
                          name="heroGradientPreset"
                          value={aboutForm.heroGradientPreset}
                          onChange={(e) => setAboutForm(prev => ({ ...prev, heroGradientPreset: Number(e.target.value) as 1|2|3|4 }))}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        >
                          <option value={1}>Preset 1</option>
                          <option value={2}>Preset 2</option>
                          <option value={3}>Preset 3</option>
                          <option value={4}>Preset 4</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Background Image URL</label>
                      <input
                          name="heroBackgroundImageUrl"
                          value={aboutForm.heroBackgroundImageUrl}
                        onChange={handleAboutInput}
                          placeholder="https://example.com/hero.jpg"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                      />
                    </div>
                    )}
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Background Blur Level</label>
                      <select
                        name="heroBackgroundBlurLevel"
                        value={aboutForm.heroBackgroundBlurLevel}
                        onChange={(e) => setAboutForm(prev => ({ ...prev, heroBackgroundBlurLevel: Number(e.target.value) as 0|1|2|3|4 }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        <option value={0}>None</option>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        <option value={4}>Ultra</option>
                      </select>
                    </div>
                  </div>
                  {/* Gradient Preview & Picker */}
                  <div className="mt-6 space-y-3">
                    <div className="text-sm text-white/80">Preview</div>
                    <div className="relative h-24 rounded-lg overflow-hidden border border-white/20">
                      {aboutForm.heroBackgroundMode === 'image' && aboutForm.heroBackgroundImageUrl ? (
                        <img src={aboutForm.heroBackgroundImageUrl} alt="preview" className={`w-full h-full object-cover opacity-50 ${`hero-blur-${aboutForm.heroBackgroundBlurLevel}`}`} />
                      ) : (
                        <div className={`hero-animated-bg ${aboutForm.heroGradientPreset===2?'hero-bg-2':aboutForm.heroGradientPreset===3?'hero-bg-3':aboutForm.heroGradientPreset===4?'hero-bg-4':'hero-bg-1'} ${`hero-blur-${aboutForm.heroBackgroundBlurLevel}`}`} />
                      )}
                    </div>
                    {aboutForm.heroBackgroundMode === 'gradient' && (
                      <div className="grid grid-cols-4 gap-2">
                        {[1,2,3,4].map(p => (
                          <button key={p} type="button" onClick={() => setAboutForm(prev => ({ ...prev, heroGradientPreset: p as 1|2|3|4 }))} className={`h-10 rounded border ${aboutForm.heroGradientPreset===p?'border-white':'border-white/20'} relative overflow-hidden`}>
                            <div className={`absolute inset-0 hero-animated-bg ${p===2?'hero-bg-2':p===3?'hero-bg-3':p===4?'hero-bg-4':'hero-bg-1'}`} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <Button onClick={handleSaveHero} disabled={isSavingHero} className="bg-green-500 hover:bg-green-600 text-white">
                      {isSavingHero ? "Saving..." : "Save Hero"}
                    </Button>
                    {heroMessage && (<span className="text-sm text-white/80">{heroMessage}</span>)}
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-card-gradient-content-about border-0 shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2 text-white/80" />
                    Social media Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">
                    Manage your contact details and social links. These appear on your public portfolio.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/80 mb-1">GitHub URL</label>
                      <input
                        name="github"
                        value={aboutForm.github}
                        onChange={handleAboutInput}
                        placeholder="https://github.com/username"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1">X (Twitter) URL</label>
                      <input
                        name="x"
                        value={aboutForm.x}
                        onChange={handleAboutInput}
                        placeholder="https://x.com/username"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Telegram URL</label>
                      <input
                        name="telegram"
                        value={aboutForm.telegram}
                        onChange={handleAboutInput}
                        placeholder="https://t.me/username"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1">LinkedIn URL</label>
                      <input
                        name="linkedin"
                        value={aboutForm.linkedin}
                        onChange={handleAboutInput}
                        placeholder="https://www.linkedin.com/in/username"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      onClick={handleSaveSocial}
                      disabled={isSavingSocial}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      {isSavingSocial ? "Saving..." : "Save Social"}
                    </Button>
                    {socialMessage && (
                      <span className="text-sm text-white/80">{socialMessage}</span>
                    )}
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
      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-shrink-0 flex items-center space-x-3">
            {/* Logo */}
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="flexfolio logo"
                className="w-8 h-10 object-contain"
              />
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              <a href="https://flexfolio.com" target="_blank" rel="noopener noreferrer">flexfolio.</a>
            </h1>
          </div>
            <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} made via <a href="https://flexfolio.com" target="_blank" rel="noopener noreferrer">FlexFolio</a>.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
