import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const login = async (email: string, password: string) => {
    setIsPending(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.ok) {
        router.push('/admin/dashboard')

        return { success: true }
      }

      setIsPending(false)

      return {
        success: false,
        error: result?.error || 'Login failed'
      }
    } catch {
      setIsPending(false)

      return {
        success: false,
        error: 'Network error'
      }
    }
  }

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' })
  }

  return {
    session,
    user: session?.user,
    token: session?.jwt,
    isAuthenticated: status === 'authenticated',
    isLoading: isPending,
    isSessionLoading: status === 'loading',
    login,
    logout
  }
}
