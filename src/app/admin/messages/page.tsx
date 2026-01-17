'use client'

import { EnvelopeSimple, CalendarBlank, Briefcase } from '@phosphor-icons/react'
import { Download, Search, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { useMessages } from '@/hooks/useMessages'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'

import { cn } from '@/utils/cn'

const StatusBadge = ({ status }: { status: string }) => {
  let classes = 'bg-slate-100 text-slate-700 border-slate-200'
  if (status === 'New') classes = 'bg-blue-50 text-blue-700 border-blue-200'
  if (status === 'Read') classes = 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === 'Replied') classes = 'bg-emerald-50 text-emerald-700 border-emerald-200'

  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', classes)}>
      {status}
    </span>
  )
}

type StatusFilter = 'all' | 'New' | 'Read' | 'Replied'

const MessagesSkeleton = () => (
  <div className="space-y-6">
    <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
    <div className="h-14 animate-pulse rounded-lg bg-slate-200" />
    <div className="flex gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
      ))}
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-32 animate-pulse rounded-lg bg-slate-200" />
    ))}
  </div>
)

export default function MessagesPage() {
  const { messages, total, isLoading, isError, mutate } = useMessages()
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemsToShow, setItemsToShow] = useState(10)

  const filteredMessages = messages
    ?.filter((msg) =>
      statusFilter === 'all' ? true : msg.status === statusFilter || (!msg.status && statusFilter === 'New')
    )
    .filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.service.toLowerCase().includes(searchQuery.toLowerCase())
    )

  // Paginate results
  const displayedMessages = filteredMessages?.slice(0, itemsToShow) || []
  const hasMore = itemsToShow < (filteredMessages?.length || 0)

  // Reset pagination when filter changes
  const handleFilterChange = (newFilter: StatusFilter) => {
    setStatusFilter(newFilter)
    setItemsToShow(10)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setItemsToShow(10)
  }

  const statusTabs: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: messages?.length || 0 },
    { value: 'New', label: 'New', count: messages?.filter((m) => m.status === 'New' || !m.status).length || 0 },
    { value: 'Read', label: 'Read', count: messages?.filter((m) => m.status === 'Read').length || 0 },
    { value: 'Replied', label: 'Replied', count: messages?.filter((m) => m.status === 'Replied').length || 0 }
  ]

  const handleDownload = () => {
    if (!filteredMessages || filteredMessages.length === 0) {
      toast.error('No messages to download')

      return
    }

    const headers = ['Timestamp', 'Name', 'Email', 'Service', 'Message', 'Status']
    const rows = filteredMessages.map((msg) => [
      new Date(msg.timestamp).toLocaleString(),
      msg.name,
      msg.email,
      msg.service,
      msg.message.replace(/\n/g, ' '),
      msg.status || 'New'
    ])

    const csv = [headers.join(','), ...rows.map((r) => r.map((cell) => `"${cell}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `messages-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    toast.success('Downloaded successfully!')
  }

  if (isLoading) {
    return <MessagesSkeleton />
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="mb-4 text-muted-foreground">Failed to load messages</p>
        <Button onClick={() => mutate()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 lg:text-3xl">Messages</h1>
          <p className="text-sm text-muted-foreground">{total || 0} total messages</p>
        </div>
        <Button onClick={handleDownload}>
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleFilterChange(tab.value)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all',
              statusFilter === tab.value
                ? 'border-primary bg-primary text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            )}
          >
            {tab.label}
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs',
                statusFilter === tab.value ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {!filteredMessages || filteredMessages.length === 0 ? (
        <Card className="flex min-h-[300px] items-center justify-center border-slate-200 p-12">
          <div className="text-center">
            <EnvelopeSimple className="mx-auto mb-4 h-12 w-12 text-slate-300" weight="duotone" />
            <h3 className="mb-2 font-semibold text-slate-900">No messages found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4">
            {displayedMessages.map((message) => (
              <Link key={message.rowIndex} href={`/admin/messages/${message.rowIndex}`}>
                <Card className="group cursor-pointer border-slate-200 p-6 transition-all hover:border-secondary hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-primary">{message.name}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <EnvelopeSimple className="h-4 w-4" weight="duotone" />
                              {message.email}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4" weight="duotone" />
                              {message.service}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CalendarBlank className="h-4 w-4" weight="duotone" />
                              {new Date(message.timestamp).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={message.status || 'New'} />
                      </div>

                      <p className="line-clamp-2 text-sm text-slate-600">{message.message}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && filteredMessages && filteredMessages.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setItemsToShow((prev) => prev + 10)}
                className="min-w-[200px]"
              >
                Load More ({(filteredMessages?.length || 0) - itemsToShow} remaining)
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
