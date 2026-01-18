import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import { authOptions } from '@/services/auth'

const APPSCRIPT_URL = process.env.APPSCRIPT_URL!

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.jwt) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = new URLSearchParams()
    formData.append('action', 'getMessages')
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
        console.error('AppScript returned:', response.status)

        return NextResponse.json({ error: 'AppScript error' }, { status: response.status })
      }

      const data = await response.json()

      if (data.success || Array.isArray(data.messages)) {
        return NextResponse.json({
          messages: data.messages || [],
          total: data.messages?.length || 0
        })
      }

      return NextResponse.json({ error: data.error || 'Failed to fetch messages' }, { status: 400 })
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('AppScript timeout')

        return NextResponse.json({ error: 'AppScript timeout - please try again' }, { status: 504 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Get messages error:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.jwt) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { rowIndex, status } = await request.json()

    if (!rowIndex || !status) {
      return NextResponse.json({ error: 'rowIndex and status required' }, { status: 400 })
    }

    const formData = new URLSearchParams()
    formData.append('action', 'updateMessageStatus')
    formData.append('token', session.jwt)
    formData.append('rowIndex', rowIndex.toString())
    formData.append('status', status)

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

      if (data.success) {
        return NextResponse.json({ success: true, message: 'Status updated' })
      }

      return NextResponse.json({ error: data.error || 'Failed to update status' }, { status: 400 })
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({ error: 'Request timeout' }, { status: 504 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Update message error:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.jwt) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { rowIndex } = await request.json()

    if (!rowIndex) {
      return NextResponse.json({ error: 'rowIndex required' }, { status: 400 })
    }

    const formData = new URLSearchParams()
    formData.append('action', 'deleteMessage')
    formData.append('token', session.jwt)
    formData.append('rowIndex', rowIndex.toString())

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

      if (data.success) {
        return NextResponse.json({ success: true, message: 'Message deleted' })
      }

      return NextResponse.json({ error: data.error || 'Failed to delete message' }, { status: 400 })
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({ error: 'Request timeout' }, { status: 504 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Delete message error:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
