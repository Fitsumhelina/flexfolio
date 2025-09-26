import { ProjectsManager } from "@/components/dashboard/projects-manager"

interface ProjectsPageProps {
  params: {
    username: string
  }
}

export default function ProjectsPage({ params }: ProjectsPageProps) {
  return <ProjectsManager username={params.username} />
}
