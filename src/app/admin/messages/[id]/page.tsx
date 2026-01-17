'use client'

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

import { fetcher } from '@/services/fetcher'

import type { Message } from '@/hooks/useMessages'

import { MessageDetailContent } from '@/components/organisms/admin/message-detail-content'

export default function MessageDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Use new single message endpoint (auto-marks as Read)
  const {
    data: message,
    isLoading,
    error,
    mutate
  } = useSWR<Message>(`/api/messages/${id}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  })

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

  if (error || !message) {
    return notFound()
  }

  return <MessageDetailContent message={message} onUpdate={mutate} />
}
