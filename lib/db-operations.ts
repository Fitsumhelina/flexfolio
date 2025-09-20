import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

export interface Project {
  _id?: string
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
  _id?: string
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
  _id?: string
  id: string
  name: string
  category: string
  proficiency: number
}

// Projects operations
export async function getProjects(): Promise<Project[]> {
  try {
    console.log("[v0] Fetching projects from database")
    const db = await getDatabase()
    const projects = await db.collection("projects").find({}).toArray()
    console.log("[v0] Found", projects.length, "projects")

    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      id: project.id || project._id.toString(),
    }))
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    throw error
  }
}

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    console.log("[v0] Fetching published projects from database")
    const db = await getDatabase()
    const projects = await db.collection("projects").find({ status: "Published" }).toArray()
    console.log("[v0] Found", projects.length, "published projects")

    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      id: project.id || project._id.toString(),
    }))
  } catch (error) {
    console.error("[v0] Error fetching published projects:", error)
    throw error
  }
}

export async function saveProject(project: Omit<Project, "id" | "createdAt" | "updatedAt" | "_id">): Promise<Project> {
  try {
    console.log("[v0] Saving new project:", project.title)
    const db = await getDatabase()
    const newProject = {
      ...project,
      id: new ObjectId().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection("projects").insertOne(newProject)
    console.log("[v0] Project saved with ID:", result.insertedId)

    return {
      ...newProject,
      _id: result.insertedId.toString(),
    }
  } catch (error) {
    console.error("[v0] Error saving project:", error)
    throw error
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  try {
    console.log("[v0] Updating project:", id)
    const db = await getDatabase()
    const result = await db.collection("projects").findOneAndUpdate(
      { $or: [{ id }, { _id: new ObjectId(id) }] },
      {
        $set: {
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      },
      { returnDocument: "after" },
    )

    if (!result) {
      console.log("[v0] Project not found for update:", id)
      return null
    }

    console.log("[v0] Project updated successfully")
    return {
      ...result,
      _id: result._id.toString(),
      id: result.id || result._id.toString(),
    }
  } catch (error) {
    console.error("[v0] Error updating project:", error)
    throw error
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    console.log("[v0] Deleting project:", id)
    const db = await getDatabase()
    const result = await db.collection("projects").deleteOne({ $or: [{ id }, { _id: new ObjectId(id) }] })
    console.log("[v0] Project deletion result:", result.deletedCount > 0)
    return result.deletedCount > 0
  } catch (error) {
    console.error("[v0] Error deleting project:", error)
    throw error
  }
}

// About operations
export async function getAboutData(): Promise<AboutData> {
  try {
    console.log("[v0] Fetching about data from database")
    const db = await getDatabase()
    const about = await db.collection("about").findOne({})
    console.log("[v0] Raw about data from DB:", about)

    if (!about) {
      console.log("[v0] No about data found, creating default")
      // Return default data if none exists
      const defaultData = {
        name: "John Developer",
        title: "Full Stack Developer",
        bio: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions. I specialize in modern JavaScript frameworks and cloud technologies.",
        experience: "5+",
        projectsCompleted: "50+",
        email: "hello@developer.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
      }

      // Save default data to database
      const insertResult = await db.collection("about").insertOne(defaultData)
      console.log("[v0] Default about data created with ID:", insertResult.insertedId)
      return defaultData
    }

    console.log("[v0] About data found, returning:", about.name)
    return {
      ...about,
      _id: about._id.toString(),
    }
  } catch (error) {
    console.error("[v0] Error fetching about data:", error)
    throw error
  }
}

export async function saveAboutData(data: AboutData): Promise<void> {
  try {
    console.log("[v0] Saving about data:", data.name)
    const db = await getDatabase()

    const { _id, ...dataToSave } = data

    const result = await db.collection("about").replaceOne({}, dataToSave, { upsert: true })
    console.log("[v0] About data save result:", result.modifiedCount, "modified,", result.upsertedCount, "upserted")
    console.log("[v0] About data saved successfully")
  } catch (error) {
    console.error("[v0] Error saving about data:", error)
    throw error
  }
}

// Skills operations
export async function getSkills(): Promise<Skill[]> {
  try {
    console.log("[v0] Fetching skills from database")
    const db = await getDatabase()
    const skills = await db.collection("skills").find({}).toArray()

    if (skills.length === 0) {
      console.log("[v0] No skills found, creating default skills")
      // Insert default skills if none exist
      const defaultSkills = [
        { id: "1", name: "React", category: "Frontend", proficiency: 90 },
        { id: "2", name: "Next.js", category: "Frontend", proficiency: 85 },
        { id: "3", name: "TypeScript", category: "Frontend", proficiency: 88 },
        { id: "4", name: "Node.js", category: "Backend", proficiency: 82 },
        { id: "5", name: "PostgreSQL", category: "Backend", proficiency: 78 },
        { id: "6", name: "AWS", category: "Cloud & DevOps", proficiency: 75 },
      ]

      await db.collection("skills").insertMany(defaultSkills)
      console.log("[v0] Default skills created")
      return defaultSkills
    }

    console.log("[v0] Found", skills.length, "skills")
    return skills.map((skill) => ({
      ...skill,
      _id: skill._id.toString(),
      id: skill.id || skill._id.toString(),
    }))
  } catch (error) {
    console.error("[v0] Error fetching skills:", error)
    throw error
  }
}

export async function saveSkills(skills: Skill[]): Promise<void> {
  try {
    console.log("[v0] Saving", skills.length, "skills")
    const db = await getDatabase()
    await db.collection("skills").deleteMany({})
    await db.collection("skills").insertMany(skills)
    console.log("[v0] Skills saved successfully")
  } catch (error) {
    console.error("[v0] Error saving skills:", error)
    throw error
  }
}
