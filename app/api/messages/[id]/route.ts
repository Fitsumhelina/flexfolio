import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const { id } = params
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await db.collection('messages').deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ message: 'Deleted' })
  } catch (e) {
    console.error('DELETE /api/messages/[id] error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const { id } = params
    const { isRead } = await request.json()
    await db.collection('messages').updateOne({ _id: new ObjectId(id) }, { $set: { isRead: !!isRead } })
    return NextResponse.json({ message: 'Updated' })
  } catch (e) {
    console.error('PUT /api/messages/[id] error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


