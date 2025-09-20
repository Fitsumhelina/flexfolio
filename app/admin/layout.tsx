import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-black text-white">
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 ml-64">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
