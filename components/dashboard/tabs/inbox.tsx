"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

interface User {
  username: string
}

interface DashboardInboxProps {
  user: User
}

export function DashboardInbox({ user }: DashboardInboxProps) {
  const [messages, setMessages] = useState<Array<any>>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const selected = messages.find(m => m.id === selectedId) || null

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages?username=${user.username}`)
      const data = await res.json()
      if (Array.isArray(data)) setMessages(data)
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`/api/messages/${id}`, { method: 'DELETE' })
    if (selectedId === id) setSelectedId(null)
    load()
  }

  const markRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead: true }) })
    load()
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
              {loading ? (
                <div className="p-4 text-gray-400">Loading...</div>
              ) : messages.length === 0 ? (
                <div className="p-4 text-gray-400">No messages</div>
              ) : (
                messages.map(m => (
                  <button key={m.id} onClick={() => { setSelectedId(m.id); markRead(m.id) }} className={`w-full text-left p-3 hover:bg-gray-800/50 ${selectedId===m.id ? 'bg-gray-800/70' : ''}`}>
                    <div className="flex justify-between">
                      <span className="text-white">{m.fromName}</span>
                      {!m.isRead && <span className="text-xs text-blue-400">New</span>}
                    </div>
                    <div className="text-xs text-gray-400">{m.fromEmail}</div>
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
                    <div className="text-sm text-gray-400">From {selected.fromName} &lt;{selected.fromEmail}&gt;</div>
                  </div>
                  <button onClick={() => handleDelete(selected.id)} className="text-red-400 hover:text-red-300">Delete</button>
                </div>
                <div className="h-px bg-gray-700 my-2" />
                <div className="whitespace-pre-wrap text-gray-200">{selected.body}</div>
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
