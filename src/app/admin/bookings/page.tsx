'use client'

import { EnvelopeSimple, CalendarBlank, CurrencyDollar, Briefcase } from '@phosphor-icons/react'
import { Download, Search, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { useBookings } from '@/hooks/useBookings'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'

import { cn } from '@/utils/cn'

const StatusBadge = ({ status }: { status: string }) => {
  let classes = 'bg-slate-100 text-slate-700 border-slate-200'
  if (status === 'New') classes = 'bg-blue-50 text-blue-700 border-blue-200'
  if (status === 'Read') classes = 'bg-cyan-50 text-cyan-700 border-cyan-200'
  if (status === 'Contacted') classes = 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === 'In Progress') classes = 'bg-purple-50 text-purple-700 border-purple-200'
  if (status === 'Completed') classes = 'bg-emerald-50 text-emerald-700 border-emerald-200'

  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', classes)}>
      {status}
    </span>
  )
}

type StatusFilter = 'all' | 'New' | 'Read' | 'Contacted' | 'In Progress' | 'Completed'

// Loading Skeleton
const BookingsSkeleton = () => (
  <div className="space-y-6">
    <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
    <div className="h-14 animate-pulse rounded-lg bg-slate-200" />
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
      ))}
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-40 animate-pulse rounded-lg bg-slate-200" />
      ))}
    </div>
  </div>
)

// Error State
const ErrorState = ({ onRetry, isLoading }: { onRetry: () => void; isLoading: boolean }) => (
  <Card className="border-slate-200 p-12 shadow-sm">
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">Failed to load bookings</h3>
      <p className="mt-1 text-sm text-slate-500">There was an error loading the data</p>
      <Button loading={isLoading} onClick={onRetry} disabled={isLoading} className="mt-4">
        <RefreshCw className="h-4 w-4" />
        Retry
      </Button>
    </div>
  </Card>
)

export default function BookingsPage() {
  const { bookings, total, isLoading, isError, mutate } = useBookings()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [itemsToShow, setItemsToShow] = useState(10)

  // Filter bookings based on search and status
  const filteredBookings = (bookings || []).filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginate results
  const displayedBookings = filteredBookings.slice(0, itemsToShow)
  const hasMore = itemsToShow < filteredBookings.length

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
    { value: 'all', label: 'All', count: bookings?.length || 0 },
    { value: 'New', label: 'New', count: bookings?.filter((b) => b.status === 'New' || !b.status).length || 0 },
    {
      value: 'Read',
      label: 'Read',
      count: bookings?.filter((b) => b.status === 'Read').length || 0
    },
    {
      value: 'Contacted',
      label: 'Contacted',
      count: bookings?.filter((b) => b.status === 'Contacted').length || 0
    },
    {
      value: 'In Progress',
      label: 'In Progress',
      count: bookings?.filter((b) => b.status === 'In Progress').length || 0
    },
    { value: 'Completed', label: 'Completed', count: bookings?.filter((b) => b.status === 'Completed').length || 0 }
  ]

  const handleDownload = () => {
    if (!bookings || bookings.length === 0) {
      toast.error('No bookings to download')

      return
    }

    // Create CSV
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Date']
    const rows = filteredBookings.map((b) => [
      b.name,
      b.email,
      b.phone || '',
      b.company || '',
      b.service,
      b.budget || '',
      b.status || 'New',
      new Date(b.timestamp || '').toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })
    ])

    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n')

    // Download
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    toast.success('Downloaded successfully')
  }

  // Loading state
  if (isLoading) {
    return <BookingsSkeleton />
  }

  // Error state
  if (isError) {
    return <ErrorState onRetry={() => mutate()} isLoading={isLoading} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 lg:text-3xl">Bookings</h1>
          <p className="mt-1 text-sm text-slate-500">{total || 0} total bookings</p>
        </div>
        <Button onClick={handleDownload} disabled={!bookings || bookings.length === 0}>
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Search Bar */}
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

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleFilterChange(tab.value)}
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

      {/* Bookings Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {displayedBookings.map((booking) => (
          <Link key={booking.rowIndex} href={`/admin/bookings/${booking.rowIndex}`}>
            <Card className="group hover:shadow-modern-lg cursor-pointer border-slate-200 shadow-sm transition-all hover:border-secondary">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left Section - Avatar & Info */}
                  <div className="flex flex-1 gap-4">
                    {/* Info */}
                    <div className="flex-1 space-y-3">
                      {/* Name & Status */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-slate-900">
                          {booking.name}
                          {booking.company && <span className="ml-1 font-normal text-slate-600">({booking.company})</span>}
                        </h3>
                        <StatusBadge status={booking.status || 'New'} />
                      </div>

                      {/* Details Grid */}
                      <div className="grid gap-2.5 text-sm sm:grid-cols-2">
                        {/* Email */}
                        <div className="flex items-center gap-2.5 text-slate-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                            <EnvelopeSimple className="h-4 w-4 text-slate-500" weight="duotone" />
                          </div>
                          <span className="truncate">{booking.email}</span>
                        </div>

                        {/* Service */}
                        <div className="flex items-center gap-2.5 text-slate-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                            <Briefcase className="h-4 w-4 text-blue-600" weight="duotone" />
                          </div>
                          <span>{booking.service}</span>
                        </div>

                        {/* Budget */}
                        {booking.budget && (
                          <div className="flex items-center gap-2.5 text-slate-600">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                              <CurrencyDollar className="h-4 w-4 text-emerald-600" weight="duotone" />
                            </div>
                            <span>{booking.budget}</span>
                          </div>
                        )}

                        {/* Date */}
                        <div className="flex items-center gap-2.5 text-slate-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                            <CalendarBlank className="h-4 w-4 text-purple-600" weight="duotone" />
                          </div>
                          <span>
                            {new Date(booking.timestamp || '').toLocaleString('id-ID', {
                              dateStyle: 'short',
                              timeStyle: 'short'
                            })}
                          </span>
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

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setItemsToShow((prev) => prev + 10)}
            className="min-w-[200px]"
          >
            Load More ({filteredBookings.length - itemsToShow} remaining)
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <Card className="border-slate-200 p-12 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No bookings found</h3>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        </Card>
      )}
    </div>
  )
}
