"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, MapPin, ExternalLink, Send } from "lucide-react"

interface UserData {
  _id: string
  name: string
  email: string
  username: string
  portfolioData?: {
    about?: {
      name: string
      title: string
      bio: string
      experience: string
      projectsCompleted: string
      email: string
      phone: string
      location: string
      profileImage?: string
    }
    projects?: Array<{
      id: string
      title: string
      description: string
      tech: string[]
      image?: string
      github?: string
      live?: string
      status: string
    }>
    skills?: Array<{
      id: string
      name: string
      category: string
      proficiency: number
    }>
  }
}

interface UserPortfolioProps {
  username: string
}

export function UserPortfolio({ username }: UserPortfolioProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${username}`)
        const data = await response.json()

        if (response.ok) {
          setUser(data.user)
        } else {
          setError(data.error || 'User not found')
        }
      } catch (error) {
        setError('Failed to load portfolio')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [username])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading portfolio...</div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gray-900/50 border-gray-700 max-w-md">
          <CardContent className="p-8 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
            <p className="text-gray-400 mb-6">
              The portfolio you're looking for doesn't exist or has been removed.
            </p>
            <Button 
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const portfolioData = user.portfolioData || {}
  const aboutData = portfolioData.about || {
    name: user.name,
    title: "Full Stack Developer",
    bio: "I'm a passionate developer who loves creating amazing digital experiences.",
    experience: "1+",
    projectsCompleted: "5+",
    email: user.email,
    phone: "",
    location: "",
    profileImage: ""
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section with User Data */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {aboutData.profileImage ? (
              <img 
                src={aboutData.profileImage} 
                alt={aboutData.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {aboutData.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {aboutData.name}
          </h1>
          
          <p className="text-2xl md:text-3xl text-blue-400 mb-8 font-light">
            {aboutData.title}
          </p>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {aboutData.bio}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View Projects
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {aboutData.experience}
              </div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {aboutData.projectsCompleted}
              </div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {portfolioData.skills?.length || 0}
              </div>
              <div className="text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {portfolioData.projects?.length || 0}
              </div>
              <div className="text-gray-400">Portfolio Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {aboutData.bio}
              </p>
              <div className="space-y-4">
                {aboutData.email && (
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-5 w-5 mr-3 text-blue-400" />
                    <span>{aboutData.email}</span>
                  </div>
                )}
                {aboutData.phone && (
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-5 w-5 mr-3 text-blue-400" />
                    <span>{aboutData.phone}</span>
                  </div>
                )}
                {aboutData.location && (
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                    <span>{aboutData.location}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-white font-semibold">{aboutData.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Projects</span>
                  <span className="text-white font-semibold">{aboutData.projectsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Skills</span>
                  <span className="text-white font-semibold">{portfolioData.skills?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {portfolioData.projects && portfolioData.projects.length > 0 && (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.image || "/placeholder.svg?height=200&width=400"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-3 text-white">{project.title}</CardTitle>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {project.github && project.github !== "#" && (
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                          onClick={() => window.open(project.github as string, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                      {project.live && project.live !== "#" && (
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() => window.open(project.live as string, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolioData.skills && portfolioData.skills.length > 0 && (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.skills.map((skill) => (
                <div key={skill.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <span className="text-sm text-gray-400">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400">{skill.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section - matches demo */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Let's Work Together</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                  want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              <div className="space-y-4">
                {aboutData.email && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-300">{aboutData.email}</p>
                    </div>
                  </div>
                )}

                {aboutData.phone && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-gray-300">{aboutData.phone}</p>
                    </div>
                  </div>
                )}

                {aboutData.location && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-gray-300">{aboutData.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Send Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Input
                  placeholder="Subject"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
          </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
