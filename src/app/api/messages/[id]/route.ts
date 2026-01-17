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
      return NextResponse.json({ error: 'Message ID required' }, { status: 400 })
    }

    // Call AppScript
    const formData = new FormData()
    formData.append('action', 'getMessageById')
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

    if (!data.success || !data.message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    return NextResponse.json(data.message)
  } catch (error) {
    console.error('Get message error:', error)

    return NextResponse.json({ error: 'Failed to fetch message' }, { status: 500 })
  }
}
