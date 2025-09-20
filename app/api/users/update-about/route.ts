import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { userId, aboutData } = await request.json()

    if (!userId || !aboutData) {
      return NextResponse.json(
        { error: 'User ID and about data are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    // Update user's about data
    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'portfolioData.about': aboutData,
          updatedAt: new Date().toISOString()
        }
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return updated user without password
    const { password: _, ...userWithoutPassword } = result

    return NextResponse.json({
      message: 'About section updated successfully',
      user: {
        ...userWithoutPassword,
        _id: result._id.toString()
      }
    })

  } catch (error) {
    console.error('Error updating about section:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
