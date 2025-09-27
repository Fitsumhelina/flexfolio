"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface MessagePageProps {
  username: string
}

export function MessagePage({ username }: MessagePageProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const router = useRouter()

  // Get user by username
  const user = useQuery(api.users.getUserByUsername, { username })
  
  // Get messages for the user
  const messages = useQuery(
    api.messages.getMessages, 
    user ? { userId: user._id } : "skip"
  )

  const deleteMessage = useMutation(api.messages.deleteMessage)
  const markAsRead = useMutation(api.messages.markAsRead)

  const selected = messages?.find(m => m._id === selectedId) || null

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      await deleteMessage({ messageId: id as any })
      if (selectedId === id) setSelectedId(null)
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  const markRead = async (id: string) => {
    try {
      await markAsRead({ messageId: id as any })
    } catch (error) {
      console.error('Failed to mark message as read:', error)
    }
  }

  if (user === undefined || messages === undefined) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading messages...</p>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="text-gray-400 mb-4">The user "{username}" does not exist.</p>
          <Button onClick={() => router.push('/')} variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push(`/${username}/dashboard`)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-400" />
              Inbox ({messages?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1 border border-gray-700 rounded-lg overflow-hidden">
                <div className="px-3 py-2 bg-gray-800/60 text-gray-200">Messages</div>
                <div className="max-h-96 overflow-auto divide-y divide-gray-800">
                  {!messages || messages.length === 0 ? (
                    <div className="p-4 text-gray-400">No messages</div>
                  ) : (
                    messages.map(m => (
                      <button 
                        key={m._id} 
                        onClick={() => { 
                          setSelectedId(m._id)
                          if (!m.isRead) markRead(m._id)
                        }} 
                        className={`w-full text-left p-3 hover:bg-gray-800/50 ${
                          selectedId === m._id ? 'bg-gray-800/70' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="text-white">{m.senderEmail}</span>
                          {!m.isRead && <span className="text-xs text-blue-400">New</span>}
                        </div>
                        <div className="text-xs text-gray-400">{m.senderEmail}</div>
                        <div className="text-sm text-gray-300 truncate">{m.subject || '(no subject)'}</div>
                      </button>
                    ))
                  )}
                </div>
              </div>
              <div className="md:col-span-2 border border-gray-700 rounded-lg p-4 min-h-64">
                {selected ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white text-lg">{selected.subject || '(no subject)'}</div>
                        <div className="text-sm text-gray-400">From {selected.senderEmail}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(selected.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(selected._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    <div className="h-px bg-gray-700 my-2" />
                    <div className="whitespace-pre-wrap text-gray-200">{selected.message}</div>
                  </div>
                ) : (
                  <div className="text-gray-400">Select a message to preview</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
