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
import { useSession } from "@/components/auth/session-provider"


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
  const { user: sessionUser, isLoading: sessionLoading, signOut } = useSession()
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

  useEffect(() => {
    if (sessionLoading) return

    if (!sessionUser) {
      router.push('/login')
      return
    }

    // If username is provided, verify the user is accessing their own dashboard
    if (username && sessionUser.username !== username) {
      router.push(`/${sessionUser.username}/dashboard`)
      return
    }

    setUser(sessionUser)
    // Load message counts
    fetch(`/api/messages?username=${sessionUser.username}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            setMessageCount(data.length)
            setUnreadCount(data.filter((m: any) => !m.isRead).length)
          }
        })
        .catch(() => {})
    
    const about = sessionUser?.portfolioData?.about || {}
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
      heroBackgroundMode: (about as any).heroBackgroundMode || "gradient",
      heroGradientPreset: (about.heroGradientPreset as 1|2|3|4) || 1,
      heroBackgroundImageUrl: about.heroBackgroundImageUrl || "",
      heroBackgroundBlurLevel: (about.heroBackgroundBlurLevel as 0|1|2|3|4) || 0,
      heroPatternId: (about as any).heroPatternId || "liquid-ether",
      heroPatternProps: (about as any).heroPatternProps || {},
      // About section fields
      name: about.name || sessionUser.name || "",
      title: about.title || "Full Stack Developer",
      bio: about.bio || "I'm a passionate developer who loves creating amazing digital experiences.",
      experience: about.experience || "1+",
      projectsCompleted: about.projectsCompleted || "5+",
      profileImage: about.profileImage || "",
      profileImageBorderColor: about.profileImageBorderColor || "#3B82F6"
    })

    setIsLoading(false)
  }, [sessionUser, sessionLoading, router, username])

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
      const currentAbout = user.portfolioData?.about || {}
      const mergedAbout = {
        // preserve existing about fields
        name: currentAbout.name || user.name,
        title: currentAbout.title || "Full Stack Developer",
        bio: currentAbout.bio || "",
        experience: currentAbout.experience || "",
        projectsCompleted: currentAbout.projectsCompleted || "",
        profileImage: currentAbout.profileImage || "",
        profileImageBorderColor: currentAbout.profileImageBorderColor || "#3B82F6",
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
        heroPatternId: (currentAbout as any).heroPatternId ?? aboutForm.heroPatternId,
        heroPatternProps: (currentAbout as any).heroPatternProps ?? aboutForm.heroPatternProps,
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
    await signOut()
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <DashboardHeader user={user} onLogout={handleLogout} onViewPortfolio={handleViewPortfolio} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardWelcome user={user} />
        <DashboardStats user={user} messageCount={messageCount} unreadCount={unreadCount} username={user.username} />
        <PortfolioUrl user={user} onViewPortfolio={handleViewPortfolio} />

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
            <DashboardOverview user={user} username={user.username} />
          </TabsContent>

          <TabsContent value="inbox" className="space-y-6">
            <DashboardInbox user={user} />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
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

          <TabsContent value="design" className="space-y-6">
            <DashboardDesign />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <DashboardSettings user={user} setUser={setUser} onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </main>
      
      <DashboardFooter />
    </div>
  )
}
