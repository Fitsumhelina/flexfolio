"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileText, Mail, Palette, Settings } from "lucide-react"
import { DashboardHeader } from "./header"
import { DashboardStats } from "./stats" 
import { PortfolioUrl } from "./portfolio-url"
import { DashboardWelcome } from "./welcome"
import { DashboardOverview } from "./tabs/overview"
import { DashboardContent } from "./tabs/content"
import { DashboardInbox } from "./tabs/inbox"
import { DashboardDesign } from "./tabs/design"
import { DashboardSettings } from "./tabs/settings"
import { DashboardFooter } from "./footer"
import { DashboardLoading } from "./loading"
import { useAuth } from "@/components/auth/convex-auth-provider"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"

interface User {
  _id: string
  name: string
  email: string
  username: string
  isActive?: boolean
  portfolioData?: {
    about?: any
    projects?: any[]
    skills?: any[]
  }
  createdAt?: string
  updatedAt?: string
}

interface DashboardProps {
  username?: string
}

export function Dashboard({ username }: DashboardProps) {
  const { user: sessionUser, isLoading: sessionLoading, logout } = useAuth()
  const [messageCount, setMessageCount] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const router = useRouter()

  // Convex queries - use real-time data from Convex
  const user = useQuery(api.users.getUser, sessionUser ? { userId: sessionUser.userId } : "skip")
  const projects = useQuery(api.projects.getProjects, sessionUser ? { userId: sessionUser.userId } : "skip")
  const skills = useQuery(api.skills.getSkills, sessionUser ? { userId: sessionUser.userId } : "skip")
  const about = useQuery(api.about.getAbout, sessionUser ? { userId: sessionUser.userId } : "skip")
  const messages = useQuery(api.messages.getMessages, sessionUser ? { userId: sessionUser.userId } : "skip")

  // Convex mutations
  const updateAboutMutation = useMutation(api.about.updateAbout)
  const createProjectMutation = useMutation(api.projects.createProject)
  const updateProjectMutation = useMutation(api.projects.updateProject)
  const deleteProjectMutation = useMutation(api.projects.deleteProject)
  const createSkillMutation = useMutation(api.skills.createSkill)
  const updateSkillMutation = useMutation(api.skills.updateSkill)
  const deleteSkillMutation = useMutation(api.skills.deleteSkill)
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
    heroBackgroundMode: "gradient" as "gradient" | "image" | "pattern",
    heroGradientPreset: 1 as 1 | 2 | 3 | 4,
    heroBackgroundImageUrl: "",
    heroBackgroundBlurLevel: 0 as 0 | 1 | 2 | 3 | 4,
    heroPatternId: "liquid-ether" as string,
    heroPatternProps: {} as Record<string, any>,
    // About section fields
    name: "",
    title: "",
    bio: "",
    experience: "",
    projectsCompleted: "",
    profileImage: "",
    profileImageBorderColor: "#3B82F6" // Default blue border color
  })
  // Separate saving and message state for hero, social, and about
  const [isSavingHero, setIsSavingHero] = useState(false)
  const [isSavingSocial, setIsSavingSocial] = useState(false)
  const [isSavingAbout, setIsSavingAbout] = useState(false)
  const [heroMessage, setHeroMessage] = useState<string | null>(null)
  const [socialMessage, setSocialMessage] = useState<string | null>(null)
  const [aboutMessage, setAboutMessage] = useState<string | null>(null)

  // Check if we're still loading
  const isLoading = sessionLoading || !user

  useEffect(() => {
    console.log('Dashboard: Session check', { sessionLoading, sessionUser: sessionUser ? 'exists' : 'null' })
    
    if (sessionLoading) {
      console.log('Dashboard: Still loading session')
      return
    }

    if (!sessionUser) {
      console.log('Dashboard: No session user, redirecting to home')
      router.push('/')
      return
    }

    console.log('Dashboard: Session user found:', sessionUser.username)

    // If username is provided, verify the user is accessing their own dashboard
    if (username && sessionUser.username !== username) {
      console.log('Dashboard: Username mismatch, redirecting to correct dashboard')
      router.push(`/${sessionUser.username}/dashboard`)
      return
    }
  }, [sessionUser, sessionLoading, router, username])

  // Update message counts from Convex data
  useEffect(() => {
    if (messages) {
      setMessageCount(messages.length)
      setUnreadCount(messages.filter((m: any) => !m.isRead).length)
    }
  }, [messages])
  
  // Update about form with Convex data
  useEffect(() => {
    if (about) {
      setAboutForm({
        email: about.email || "",
        phone: about.phone || "",
        location: about.location || "",
        github: about.github || "",
        x: about.x || "",
        telegram: about.telegram || "",
        linkedin: about.linkedin || "",
        heroTitle: about.heroTitle || about.title || "Full Stack Developer",
        heroDescription: about.heroDescription || about.bio || "",
        heroBackgroundMode: (about as any).heroBackgroundMode || "gradient",
        heroGradientPreset: (about.heroGradientPreset as 1|2|3|4) || 1,
        heroBackgroundImageUrl: about.heroBackgroundImageUrl || "",
        heroBackgroundBlurLevel: (about.heroBackgroundBlurLevel as 0|1|2|3|4) || 0,
        heroPatternId: (about as any).heroPatternId || "liquid-ether",
        heroPatternProps: (about as any).heroPatternProps || {},
        // About section fields
        name: about.name || "",
        title: about.title || "Full Stack Developer",
        bio: about.bio || "I'm a passionate developer who loves creating amazing digital experiences.",
        experience: about.experience || "1+",
        projectsCompleted: about.projectsCompleted || "5+",
        profileImage: about.profileImage || "",
        profileImageBorderColor: about.profileImageBorderColor || "#3B82F6"
      })
    }
  }, [about])

  const handleAboutInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAboutForm((prev: typeof aboutForm) => ({ ...prev, [name]: value }))
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
      // Use Convex mutation to update about data
      await updateAboutMutation({
        userId: user._id,
        ...updates,
      })
      
      setMessage('Content updated successfully')
    } catch (err: any) {
      setMessage(err?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveHero = async () => {
    await saveAboutPartial(
      {
        name: aboutForm.name,
        heroTitle: aboutForm.heroTitle,
        heroDescription: aboutForm.heroDescription,
        heroBackgroundMode: aboutForm.heroBackgroundMode,
        heroGradientPreset: aboutForm.heroGradientPreset,
        heroBackgroundImageUrl: aboutForm.heroBackgroundImageUrl,
        heroBackgroundBlurLevel: aboutForm.heroBackgroundBlurLevel,
        heroPatternId: aboutForm.heroPatternId,
        heroPatternProps: aboutForm.heroPatternProps,
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

  const handleSaveAbout = async () => {
    await saveAboutPartial(
      {
        name: aboutForm.name,
        title: aboutForm.title,
        bio: aboutForm.bio,
        experience: aboutForm.experience,
        projectsCompleted: aboutForm.projectsCompleted,
        profileImage: aboutForm.profileImage,
        profileImageBorderColor: aboutForm.profileImageBorderColor,
      },
      setIsSavingAbout,
      setAboutMessage
    )
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleViewPortfolio = () => {
    if (user?.username) {
      window.open(`/${user.username}`, '_blank')
    }
  }

  if (isLoading) {
    return <DashboardLoading />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      <DashboardHeader user={user} onLogout={handleLogout} onViewPortfolio={handleViewPortfolio} />

      <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 flex-1 flex flex-col">
        <DashboardWelcome user={user} />
        <DashboardStats user={user} messageCount={messageCount} unreadCount={unreadCount} username={user.username} />
        <PortfolioUrl user={user} onViewPortfolio={handleViewPortfolio} />

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList
            className="
              bg-gray-900/50 border-gray-700/50 backdrop-blur-sm p-1
              flex flex-row sm:flex-row md:flex-row lg:flex-row
              w-full overflow-x-auto
              gap-1
              rounded-lg
              mb-2 sm:mb-4
              scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
            "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <TabsTrigger
              value="overview"
              className="
                flex-1 min-w-[80px] sm:min-w-[120px] md:min-w-[120px] 
                flex items-center justify-center
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white
                px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm
                rounded-md
                whitespace-nowrap
              "
            >
              <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline sm:inline">Overview</span>
              <span className="inline xs:hidden sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="
                flex-1 min-w-[80px] sm:min-w-[120px] md:min-w-[120px] 
                flex items-center justify-center
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white
                px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm
                rounded-md
                whitespace-nowrap
              "
            >
              <FileText className="h-4 w-4 mr-1 sm:mr-2" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger
              value="inbox"
              className="
                flex-1 min-w-[80px] sm:min-w-[120px] md:min-w-[120px] 
                flex items-center justify-center
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white
                px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm
                rounded-md
                whitespace-nowrap
              "
            >
              <Mail className="h-4 w-4 mr-1 sm:mr-2" />
              <span>Inbox</span>
            </TabsTrigger>
            <TabsTrigger
              value="design"
              className="
                flex-1 min-w-[80px] sm:min-w-[120px] md:min-w-[120px] 
                flex items-center justify-center
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white
                px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm
                rounded-md
                whitespace-nowrap
              "
            >
              <Palette className="h-4 w-4 mr-1 sm:mr-2" />
              <span>Design</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="
                flex-1 min-w-[80px] sm:min-w-[120px] md:min-w-[120px] 
                flex items-center justify-center
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white
                px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm
                rounded-md
                whitespace-nowrap
              "
            >
              <Settings className="h-4 w-4 mr-1 sm:mr-2" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <DashboardOverview user={user} username={user.username} />
          </TabsContent>

          <TabsContent value="inbox" className="space-y-4 sm:space-y-6">
            <DashboardInbox user={user} messages={messages || []} />
          </TabsContent>

          <TabsContent value="content" className="space-y-4 sm:space-y-6">
            <DashboardContent 
              aboutForm={aboutForm}
              handleAboutInput={handleAboutInput}
              setAboutForm={setAboutForm}
              handleSaveHero={handleSaveHero}
              handleSaveSocial={handleSaveSocial}
              handleSaveAbout={handleSaveAbout}
              isSavingHero={isSavingHero}
              isSavingSocial={isSavingSocial}
              isSavingAbout={isSavingAbout}
              heroMessage={heroMessage}
              socialMessage={socialMessage}
              aboutMessage={aboutMessage}
            />
          </TabsContent>

          <TabsContent value="design" className="space-y-4 sm:space-y-6">
            <DashboardDesign />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 sm:space-y-6">
            <DashboardSettings userId={user?._id} onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </main>
      
      <DashboardFooter />
    </div>
  )
}
