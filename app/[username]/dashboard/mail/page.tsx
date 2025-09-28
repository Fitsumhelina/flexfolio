import { MessagePage } from "@/components/dashboard/message-page"

interface MessagePageProps {
  params: {
    username: string
  }
}

export default function MessagePageRoute({ params }: MessagePageProps) {
  return <MessagePage username={params.username} />
}