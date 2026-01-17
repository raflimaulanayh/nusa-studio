import { NextRequest, NextResponse } from 'next/server'

const APPSCRIPT_URL = process.env.APPSCRIPT_URL!

export async function POST(request: NextRequest) {
  try {
    const { name, email, service, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    const formData = new URLSearchParams()
    formData.append('action', 'saveMessage')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('service', service || 'General Inquiry')
    formData.append('message', message)

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

      if (data.success) {
        return NextResponse.json({
          success: true,
          message: 'Message sent successfully'
        })
      }

      return NextResponse.json({ error: data.error || 'Failed to send message' }, { status: 400 })
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('AppScript timeout')

        return NextResponse.json({ error: 'Request timeout - please try again' }, { status: 504 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Send message error:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
