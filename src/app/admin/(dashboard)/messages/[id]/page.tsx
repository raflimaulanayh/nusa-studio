'use client'

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'

import { useMessages } from '@/hooks/useMessages'

import { MessageDetailContent } from '@/components/organisms/admin/message-detail-content'

export default function MessageDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { messages, isLoading, isError } = useMessages()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-12 w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-64 animate-pulse rounded-lg bg-slate-200" />
          </div>
          <div className="space-y-6">
            <div className="h-48 animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !messages) {
    return notFound()
  }

  const message = messages.find((m) => m.rowIndex.toString() === id)

  if (!message) {
    return notFound()
  }

  return <MessageDetailContent message={message} />
}
