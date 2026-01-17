import { NextRequest, NextResponse } from 'next/server'

const APPSCRIPT_URL = process.env.APPSCRIPT_URL!

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, service, budget, message } = await request.json()

    if (!name || !email || !phone || !service || !budget || !message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const formData = new URLSearchParams()
    formData.append('action', 'saveBooking')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('company', company || '')
    formData.append('service', service)
    formData.append('budget', budget)
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

      const text = await response.text()
      console.info('AppScript response:', text.substring(0, 200))

      let data
      try {
        data = JSON.parse(text)
      } catch {
        console.error('Failed to parse JSON. Response:', text.substring(0, 500))

        return NextResponse.json({ error: 'Invalid AppScript response - check AppScript logs' }, { status: 500 })
      }

      if (data.success) {
        return NextResponse.json({
          success: true,
          message: 'Booking submitted successfully'
        })
      }

      return NextResponse.json({ error: data.error || 'Failed to submit booking' }, { status: 400 })
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('AppScript timeout')

        return NextResponse.json({ error: 'Request timeout - please try again' }, { status: 504 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Submit booking error:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
