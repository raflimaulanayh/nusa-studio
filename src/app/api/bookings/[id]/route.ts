import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { authOptions } from '@/services/auth'

const APPSCRIPT_URL = process.env.APPSCRIPT_URL

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.jwt) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
    }

    // Call AppScript
    const formData = new FormData()
    formData.append('action', 'getBookingById')
    formData.append('token', session.jwt)
    formData.append('rowIndex', id)

    const response = await fetch(APPSCRIPT_URL!, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error(`AppScript returned ${response.status}`)
    }

    const data = await response.json()

    if (!data.success || !data.booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json(data.booking)
  } catch (error) {
    console.error('Get booking error:', error)

    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 })
  }
}
