import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { authOptions } from '@/services/auth'

const APPSCRIPT_URL = process.env.APPSCRIPT_URL!

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.jwt) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = new URLSearchParams()
    formData.append('action', 'getBookings')
    formData.append('token', session.jwt)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(APPSCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        return NextResponse.json({ error: 'AppScript error' }, { status: response.status })
      }

      const data = await response.json()

      if (data.success || Array.isArray(data.bookings)) {
        const bookings = data.bookings || []

        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

        const stats = {
          total: bookings.length,
          new: bookings.filter((b: { status?: string }) => b.status === 'New' || !b.status).length,
          contacted: bookings.filter((b: { status?: string }) => b.status === 'Contacted').length,
          inProgress: bookings.filter((b: { status?: string }) => b.status === 'In Progress').length,
          completed: bookings.filter((b: { status?: string }) => b.status === 'Completed').length,
          thisWeek: bookings.filter((b: { timestamp: string }) => {
            const date = new Date(b.timestamp)

            return date >= weekAgo
          }).length,
          thisMonth: bookings.filter((b: { timestamp: string }) => {
            const date = new Date(b.timestamp)

            return date >= monthAgo
          }).length
        }

        return NextResponse.json(stats)
      }

      return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 400 })
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({ error: 'Request timeout' }, { status: 504 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Get stats error:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
