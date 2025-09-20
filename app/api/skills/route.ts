import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri)

export async function GET() {
  try {
    await client.connect()
    const db = client.db("portfolio")
    const skills = await db.collection("skills").find({}).toArray()

    return NextResponse.json(
      skills.map((skill) => ({
        id: skill._id.toString(),
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
      })),
    )
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function POST(request: NextRequest) {
  try {
    const skills = await request.json()

    await client.connect()
    const db = client.db("portfolio")

    // Clear existing skills and insert new ones
    await db.collection("skills").deleteMany({})

    if (skills.length > 0) {
      const skillsToInsert = skills.map((skill: any) => ({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))

      await db.collection("skills").insertMany(skillsToInsert)
    }

    return NextResponse.json({ message: "Skills saved successfully" })
  } catch (error) {
    console.error("Error saving skills:", error)
    return NextResponse.json({ error: "Failed to save skills" }, { status: 500 })
  } finally {
    await client.close()
  }
}
