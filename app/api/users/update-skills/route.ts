import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PUT(request: NextRequest) {
  try {
    const { userId, skill, isEdit } = await request.json()

    // Enforce allowed categories
    const allowed = new Map([
      ['frontend', 'Frontend'],
      ['backend', 'Backend'],
      ['devops', 'DevOps'],
    ])
    if (!skill?.category) {
      return NextResponse.json(
        { error: 'Skill category is required' },
        { status: 400 }
      )
    }
    const normalizedKey = String(skill.category).toLowerCase().replace(/[^a-z]/g, '')
    const normalizedCategory = allowed.get(normalizedKey)
    if (!normalizedCategory) {
      return NextResponse.json(
        { error: 'Invalid category. Use Frontend, Backend, or DevOps' },
        { status: 400 }
      )
    }
    skill.category = normalizedCategory

    if (!userId || !skill) {
      return NextResponse.json(
        { error: 'User ID and skill data are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    if (isEdit) {
      // Update existing skill
      const result = await db.collection('users').findOneAndUpdate(
        { 
          _id: new ObjectId(userId),
          'portfolioData.skills.id': skill.id
        },
        {
          $set: {
            'portfolioData.skills.$': skill,
            updatedAt: new Date().toISOString()
          }
        },
        { returnDocument: 'after' }
      )

      if (!result) {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        )
      }
    } else {
      // Add new skill
      const result = await db.collection('users').findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $push: {
            'portfolioData.skills': skill
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
      message: isEdit ? 'Skill updated successfully' : 'Skill added successfully'
    })

  } catch (error) {
    console.error('Error updating skills:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
