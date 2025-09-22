import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { userId, projectId } = await request.json()

    if (!userId || !projectId) {
      return NextResponse.json(
        { error: 'User ID and project ID are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $pull: {
          'portfolioData.projects': { id: projectId }
        },
        $set: {
          updatedAt: new Date().toISOString()
        }
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json(
        { error: 'User or project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Project deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
