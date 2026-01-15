import { MOCK_BOOKINGS } from '@/data/mock-bookings'
import { notFound } from 'next/navigation'

import { BookingDetailContent } from '@/components/organisms/admin/booking-detail-content'

// Mock Data Fetching
const getBooking = (id: string) => {
  return MOCK_BOOKINGS.find((b) => b.id === id)
}

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = getBooking(id)

  if (!booking) {
    return notFound()
  }

  return <BookingDetailContent booking={booking} />
}
