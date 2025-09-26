import { SkillsManager } from "@/components/dashboard/skills-manager"

interface SkillsPageProps {
  params: {
    username: string
  }
}

export default function SkillsPage({ params }: SkillsPageProps) {
  return <SkillsManager username={params.username} />
}
