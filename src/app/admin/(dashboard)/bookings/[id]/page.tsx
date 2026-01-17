'use client'

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'

import { useBookings } from '@/hooks/useBookings'

import { BookingDetailContent } from '@/components/organisms/admin/booking-detail-content'

export default function BookingDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { bookings, isLoading, isError } = useBookings()

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
            <div className="h-32 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-48 animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !bookings) {
    return notFound()
  }

  const booking = bookings.find((b) => b.rowIndex.toString() === id)

  if (!booking) {
    return notFound()
  }

  return <BookingDetailContent booking={booking} />
}
