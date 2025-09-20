import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { userId, skillId } = await request.json()

    if (!userId || !skillId) {
      return NextResponse.json(
        { error: 'User ID and skill ID are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $pull: {
          'portfolioData.skills': { id: skillId }
        },
        $set: {
          updatedAt: new Date().toISOString()
        }
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json(
        { error: 'User or skill not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Skill deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
