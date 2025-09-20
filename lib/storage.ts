// Simple localStorage-based storage for demo purposes
// In production, replace with database operations

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image?: string
  github?: string
  live?: string
  status: "Published" | "Draft"
  createdAt: string
  updatedAt: string
}

export interface AboutData {
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

export interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
}

// Projects
export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return []
  const projects = localStorage.getItem("portfolio_projects")
  return projects ? JSON.parse(projects) : []
}

export const saveProject = (project: Omit<Project, "id" | "createdAt" | "updatedAt">): Project => {
  const projects = getProjects()
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  projects.push(newProject)
  localStorage.setItem("portfolio_projects", JSON.stringify(projects))
  return newProject
}

export const updateProject = (id: string, updates: Partial<Project>): Project | null => {
  const projects = getProjects()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return null

  projects[index] = { ...projects[index], ...updates, updatedAt: new Date().toISOString() }
  localStorage.setItem("portfolio_projects", JSON.stringify(projects))
  return projects[index]
}

export const deleteProject = (id: string): boolean => {
  const projects = getProjects()
  const filtered = projects.filter((p) => p.id !== id)
  localStorage.setItem("portfolio_projects", JSON.stringify(filtered))
  return filtered.length < projects.length
}

// About
export const getAboutData = (): AboutData => {
  if (typeof window === "undefined") return getDefaultAboutData()
  const about = localStorage.getItem("portfolio_about")
  return about ? JSON.parse(about) : getDefaultAboutData()
}

export const saveAboutData = (data: AboutData): void => {
  localStorage.setItem("portfolio_about", JSON.stringify(data))
}

const getDefaultAboutData = (): AboutData => ({
  name: "John Developer",
  title: "Full Stack Developer",
  bio: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions. I specialize in modern JavaScript frameworks and cloud technologies.",
  experience: "5+",
  projectsCompleted: "50+",
  email: "hello@developer.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
})

// Skills
export const getSkills = (): Skill[] => {
  if (typeof window === "undefined") return []
  const skills = localStorage.getItem("portfolio_skills")
  return skills ? JSON.parse(skills) : getDefaultSkills()
}

export const saveSkills = (skills: Skill[]): void => {
  localStorage.setItem("portfolio_skills", JSON.stringify(skills))
}

const getDefaultSkills = (): Skill[] => [
  { id: "1", name: "React", category: "Frontend", proficiency: 90 },
  { id: "2", name: "Next.js", category: "Frontend", proficiency: 85 },
  { id: "3", name: "TypeScript", category: "Frontend", proficiency: 88 },
  { id: "4", name: "Node.js", category: "Backend", proficiency: 82 },
  { id: "5", name: "PostgreSQL", category: "Backend", proficiency: 78 },
  { id: "6", name: "AWS", category: "Cloud & DevOps", proficiency: 75 },
]
