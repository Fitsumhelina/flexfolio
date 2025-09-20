import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDatabase()

    // Test the connection by listing collections
    const collections = await db.listCollections().toArray()

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      database: "portfolio-cms",
      collections: collections.map((c) => c.name),
    })
  } catch (error) {
    console.error("Database connection test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
