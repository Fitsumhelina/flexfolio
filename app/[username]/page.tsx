import { UserPortfolio } from "@/components/user-portfolio/user-portfolio"

interface UserPortfolioPageProps {
  params: {
    username: string
  }
}

export default function UserPortfolioPage({ params }: UserPortfolioPageProps) {
  return <UserPortfolio username={params.username} />
}
