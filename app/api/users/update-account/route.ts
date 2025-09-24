import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { userId, account } = await request.json()

    if (!userId || !account) {
      return NextResponse.json(
        { error: 'User ID and account payload are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    const allowed: Record<string, any> = {}
    if (typeof account.name === 'string') allowed['name'] = account.name
    if (typeof account.username === 'string') allowed['username'] = account.username
    if (typeof account.email === 'string') allowed['email'] = account.email

    if (Object.keys(allowed).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...allowed,
          updatedAt: new Date().toISOString(),
        },
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { password: _pw, ...userWithoutPassword } = result

    return NextResponse.json({
      message: 'Account updated successfully',
      user: { ...userWithoutPassword, _id: result._id.toString() },
    })
  } catch (error) {
    console.error('Error updating account:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


