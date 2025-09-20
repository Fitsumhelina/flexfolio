import { type NextRequest, NextResponse } from "next/server"
import { getAboutData, saveAboutData } from "@/lib/db-operations"

export async function GET() {
  try {
    console.log("[v0] API: GET /api/about called")
    const about = await getAboutData()
    console.log("[v0] API: Returning about data:", about.name)
    return NextResponse.json(about)
  } catch (error) {
    console.error("[v0] API: Error fetching about data:", error)
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API: POST /api/about called")
    const aboutData = await request.json()
    console.log("[v0] API: Received about data:", aboutData.name)
    await saveAboutData(aboutData)
    console.log("[v0] API: About data saved successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] API: Error saving about data:", error)
    return NextResponse.json({ error: "Failed to save about data" }, { status: 500 })
  }
}
