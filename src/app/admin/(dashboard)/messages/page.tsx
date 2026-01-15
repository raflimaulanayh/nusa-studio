'use client'

import { MOCK_CONTACTS, type ContactMessage } from '@/data/mock-contacts'
import { EnvelopeSimple, CalendarBlank, Briefcase } from '@phosphor-icons/react'
import { Download, Search, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'

import { cn } from '@/utils/cn'

const StatusBadge = ({ status }: { status: ContactMessage['status'] }) => {
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

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')

  // Filter messages based on search, status, and date
  const filteredMessages = MOCK_CONTACTS.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.service.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || message.status === statusFilter

    // Date filtering logic
    let matchesDate = true
    if (dateFilter !== 'all') {
      const messageDate = new Date(message.createdAt)
      const now = new Date()

      if (dateFilter === 'today') {
        matchesDate = messageDate.toDateString() === now.toDateString()
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        matchesDate = messageDate >= weekAgo
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        matchesDate = messageDate >= monthAgo
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const statusTabs: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: MOCK_CONTACTS.length },
    { value: 'New', label: 'New', count: MOCK_CONTACTS.filter((m) => m.status === 'New').length },
    { value: 'Read', label: 'Read', count: MOCK_CONTACTS.filter((m) => m.status === 'Read').length },
    { value: 'Replied', label: 'Replied', count: MOCK_CONTACTS.filter((m) => m.status === 'Replied').length }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 lg:text-3xl">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">{filteredMessages.length} total messages</p>
        </div>
        <Button>
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Search and Date Filter Bar */}
      <Card className="border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
              statusFilter === tab.value
                ? 'bg-primary text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold',
                statusFilter === tab.value ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Messages Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {filteredMessages.map((message) => (
          <Link key={message.id} href={`/admin/messages/${message.id}`}>
            <Card className="group hover:shadow-modern-lg cursor-pointer border-slate-200 shadow-sm transition-all hover:border-secondary">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left Section - Info */}
                  <div className="flex flex-1 gap-4">
                    {/* Info */}
                    <div className="flex-1 space-y-3">
                      {/* Name & Status */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-slate-900">{message.name}</h3>
                        <StatusBadge status={message.status} />
                      </div>

                      {/* Details Grid */}
                      <div className="grid gap-2.5 text-sm sm:grid-cols-2">
                        {/* Email */}
                        <div className="flex items-center gap-2.5 text-slate-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                            <EnvelopeSimple className="h-4 w-4 text-slate-500" weight="duotone" />
                          </div>
                          <span className="truncate">{message.email}</span>
                        </div>

                        {/* Service */}
                        <div className="flex items-center gap-2.5 text-slate-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                            <Briefcase className="h-4 w-4 text-blue-600" weight="duotone" />
                          </div>
                          <span>{message.service}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2.5 text-slate-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                            <CalendarBlank className="h-4 w-4 text-purple-600" weight="duotone" />
                          </div>
                          <span>{new Date(message.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <Card className="border-slate-200 p-12 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No messages found</h3>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        </Card>
      )}
    </div>
  )
}
