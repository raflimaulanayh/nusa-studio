import useSWR from 'swr'

import { fetcher } from '@/services/fetcher'

interface Booking {
  id: number
  rowIndex: number
  order_number?: string
  timestamp: string
  name: string
  email: string
  phone: string
  company?: string
  service: string
  budget: string
  message: string
  status?: string
}

interface BookingsResponse {
  bookings: Booking[]
  total: number
}

interface BookingStats {
  total: number
  new: number
  contacted: number
  inProgress: number
  completed: number
  thisWeek: number
  thisMonth: number
}

export function useBookings() {
  const { data, error, mutate, isLoading } = useSWR<BookingsResponse>('/api/bookings', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5000
  })

  const updateStatus = async (rowIndex: number, status: string) => {
    if (!data) return

    const optimisticData = {
      ...data,
      bookings: data.bookings.map((b) => (b.rowIndex === rowIndex ? { ...b, status } : b))
    }

    mutate(optimisticData, false)

    try {
      const response = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rowIndex, status })
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      mutate()
    } catch (error) {
      mutate(data)
      throw error
    }
  }

  return {
    bookings: data?.bookings,
    total: data?.total,
    isLoading,
    isError: error,
    mutate,
    updateStatus,
    error
  }
}

export function useBookingStatistics() {
  const { data, error, isLoading } = useSWR<BookingStats>('/api/bookings/stats', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 30000
  })

  return {
    stats: data,
    isLoading,
    isError: error
  }
}

export type { Booking, BookingsResponse, BookingStats }
