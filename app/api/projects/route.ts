import { type NextRequest, NextResponse } from "next/server"
import { getProjects, saveProject } from "@/lib/db-operations"

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()
    const newProject = await saveProject(projectData)
    return NextResponse.json(newProject)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
