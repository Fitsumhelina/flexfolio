"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Trash2, Eye, EyeOff } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
  username: string
}

interface Message {
  id: string
  fromName: string
  fromEmail: string
  subject: string
  body: string
  isRead: boolean
  createdAt: string
}

export default function MailPage() {
  const [user, setUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const selected = messages.find(m => m.id === selectedId) || null

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')

    if (!isAuthenticated || !userData) {
      router.push(ROUTES.LOGIN)
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      loadMessages(parsedUser.username)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push(ROUTES.LOGIN)
    }
  }, [router])

  const loadMessages = async (username: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages?username=${username}`)
      const data = await res.json()
      if (Array.isArray(data)) setMessages(data)
    } catch (e) {
      console.error('Failed to load messages:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' })
      if (selectedId === id) setSelectedId(null)
      if (user) loadMessages(user.username)
    } catch (e) {
      console.error('Failed to delete message:', e)
    }
  }

  const markRead = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ isRead: true }) 
      })
      if (user) loadMessages(user.username)
    } catch (e) {
      console.error('Failed to mark as read:', e)
    }
  }

  const markUnread = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ isRead: false }) 
      })
      if (user) loadMessages(user.username)
    } catch (e) {
      console.error('Failed to mark as unread:', e)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(ROUTES.DASHBOARD)}
                className="text-blue-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold">Messages</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-400">
                {messages.filter(m => !m.isRead).length} unread
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-400" />
              Inbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Message List */}
              <div className="md:col-span-1 border border-gray-700 rounded-lg overflow-hidden">
                <div className="px-3 py-2 bg-gray-800/60 text-gray-200 border-b border-gray-700">
                  Messages ({messages.length})
                </div>
                <div className="max-h-96 overflow-auto divide-y divide-gray-800">
                  {loading ? (
                    <div className="p-4 text-gray-400">Loading...</div>
                  ) : messages.length === 0 ? (
                    <div className="p-4 text-gray-400">No messages</div>
                  ) : (
                    messages.map(m => (
                      <button 
                        key={m.id} 
                        onClick={() => { 
                          setSelectedId(m.id)
                          if (!m.isRead) markRead(m.id)
                        }} 
                        className={`w-full text-left p-3 hover:bg-gray-800/50 transition-colors ${
                          selectedId === m.id ? 'bg-gray-800/70' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium truncate">{m.fromName}</span>
                              {!m.isRead && <span className="text-xs text-blue-400 bg-blue-400/20 px-1 rounded">New</span>}
                            </div>
                            <div className="text-xs text-gray-400 truncate">{m.fromEmail}</div>
                            <div className="text-sm text-gray-300 truncate mt-1">{m.subject || '(no subject)'}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(m.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Message Preview */}
              <div className="md:col-span-2 border border-gray-700 rounded-lg p-4 min-h-96">
                {selected ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-white text-xl font-semibold mb-2">
                          {selected.subject || '(no subject)'}
                        </div>
                        <div className="text-sm text-gray-400 mb-1">
                          Name: {selected.fromName}
                        </div>
                        <div className="text-sm text-gray-400 mb-1">
                          Email: {selected.fromEmail}
                        </div>
                        <div className="text-xs text-gray-500">
                          Date :  {new Date(selected.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => selected.isRead ? markUnread(selected.id) : markRead(selected.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {selected.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(selected.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="h-px bg-gray-700" />
                    <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                      {selected.body}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a message to preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
