import { MOCK_CONTACTS } from '@/data/mock-contacts'
import { notFound } from 'next/navigation'

import { MessageDetailContent } from '@/components/organisms/admin/message-detail-content'

// Mock Data Fetching
const getMessage = (id: string) => {
  return MOCK_CONTACTS.find((m) => m.id === id)
}

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const message = getMessage(id)

  if (!message) {
    return notFound()
  }

  return <MessageDetailContent message={message} />
}
