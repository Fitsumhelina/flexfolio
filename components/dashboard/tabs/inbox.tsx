"use client"

import { useState, useEffect } from 'react'
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  username: string
}

interface DashboardInboxProps {
  user: User
  messages: Array<any>
}

export function DashboardInbox({ user, messages }: DashboardInboxProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const router = useRouter()
  const selected = messages?.find(m => m._id === selectedId) || null

  const deleteMessage = useMutation(api.messages.deleteMessage)
  const markAsRead = useMutation(api.messages.markAsRead)

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

  const handleMessageClick = (messageId: string) => {
    // Redirect to the dedicated message page
    router.push(`/${user.username}/dashboard/mail`)
  }

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Mail className="h-5 w-5 mr-2 text-blue-400" />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1 border border-gray-700 rounded-lg overflow-hidden">
            <div className="px-3 py-2 bg-gray-800/60 text-gray-200">Inbox</div>
            <div className="max-h-96 overflow-auto divide-y divide-gray-800">
              {!messages || messages.length === 0 ? (
                <div className="p-4 text-gray-400">No messages</div>
              ) : (
                messages.map(m => (
                  <button 
                    key={m._id} 
                    onClick={() => handleMessageClick(m._id)} 
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
                  </div>
                  <button onClick={() => handleDelete(selected._id)} className="text-red-400 hover:text-red-300">Delete</button>
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
  )
}
