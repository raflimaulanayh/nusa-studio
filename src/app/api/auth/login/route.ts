import { NextRequest, NextResponse } from 'next/server'

const APPSCRIPT_URL = process.env.APPSCRIPT_URL!

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const formData = new FormData()
    formData.append('action', 'login')
    formData.append('email', email)
    formData.append('password', password)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(APPSCRIPT_URL, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.error('AppScript returned:', response.status)

        return NextResponse.json({ error: 'AppScript error', success: false }, { status: response.status })
      }

      const data = await response.json()

      if (data.success && data.user) {
        return NextResponse.json({
          success: true,
          user: data.user,
          token: data.token
        })
      }

      return NextResponse.json({ error: data.error || 'Authentication failed', success: false }, { status: 401 })
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('AppScript timeout')

        return NextResponse.json({ error: 'AppScript timeout - please try again', success: false }, { status: 504 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Login error:', error)

    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 })
  }
}
