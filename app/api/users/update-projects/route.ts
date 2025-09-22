import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { userId, project, isEdit } = await request.json()

    if (!userId || !project) {
      return NextResponse.json(
        { error: 'User ID and project data are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    if (isEdit) {
      // Update existing project
      const result = await db.collection('users').findOneAndUpdate(
        { 
          _id: new ObjectId(userId),
          'portfolioData.projects.id': project.id
        },
        {
          $set: {
            'portfolioData.projects.$': project,
            updatedAt: new Date().toISOString()
          }
        },
        { returnDocument: 'after' }
      )

      if (!result) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        )
      }
    } else {
      // Add new project
      const result = await db.collection('users').findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $push: {
            'portfolioData.projects': project
          },
          $set: {
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
    }

    return NextResponse.json({
      message: isEdit ? 'Project updated successfully' : 'Project added successfully'
    })

  } catch (error) {
    console.error('Error updating projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
