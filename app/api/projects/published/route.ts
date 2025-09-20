import { NextResponse } from "next/server"
import { getPublishedProjects } from "@/lib/db-operations"

export async function GET() {
  try {
    const projects = await getPublishedProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching published projects:", error)
    return NextResponse.json({ error: "Failed to fetch published projects" }, { status: 500 })
  }
}
