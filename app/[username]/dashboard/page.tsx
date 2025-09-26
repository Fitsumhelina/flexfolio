import { Dashboard } from "@/components/dashboard/dashboard"

interface DashboardPageProps {
  params: {
    username: string
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  return <Dashboard username={params.username} />
}
