import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toUsername, fromName, fromEmail, subject, body: msgBody } = body || {}
    if (!toUsername || !fromName || !fromEmail || !msgBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const db = await getDatabase()
    const users = db.collection('users')
    const user = await users.findOne({ username: toUsername })
    if (!user) return NextResponse.json({ error: 'Recipient not found' }, { status: 404 })

    const message = {
      userId: user._id,
      toUsername,
      fromName,
      fromEmail,
      subject: subject || '',
      body: msgBody,
      isRead: false,
      createdAt: new Date().toISOString(),
    }
    const result = await db.collection('messages').insertOne(message)
    return NextResponse.json({ id: result.insertedId.toString(), message: 'Message sent' })
  } catch (e) {
    console.error('POST /api/messages error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')
    if (!username) return NextResponse.json({ error: 'username required' }, { status: 400 })
    const db = await getDatabase()
    const user = await db.collection('users').findOne({ username })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const messages = await db
      .collection('messages')
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray()
    return NextResponse.json(
      messages.map((m: any) => ({
        id: m._id.toString(),
        fromName: m.fromName,
        fromEmail: m.fromEmail,
        subject: m.subject,
        body: m.body,
        isRead: !!m.isRead,
        createdAt: m.createdAt,
      }))
    )
  } catch (e) {
    console.error('GET /api/messages error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


