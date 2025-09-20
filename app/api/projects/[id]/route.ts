import { type NextRequest, NextResponse } from "next/server"
import { updateProject, deleteProject } from "@/lib/db-operations"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const updatedProject = await updateProject(params.id, updates)

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteProject(params.id)

    if (!success) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
