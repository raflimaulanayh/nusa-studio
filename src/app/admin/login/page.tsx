'use client'

import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { useAuth } from '@/hooks/useAuth'

import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await login(email, password)

    if (!result.success) {
      const errorMsg = result.error || 'Login failed'
      setError(errorMsg)

      if (errorMsg.includes('timeout')) {
        toast.error('Server timeout - please try again in a moment')
      } else {
        toast.error(errorMsg)
      }
    } else {
      toast.success('Login successful! Welcome back.')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <Card className="relative z-10 mx-4 w-full max-w-md border-slate-100 bg-white/80 shadow-xl backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center py-8 text-center">
          <Image
            src="/logo.png"
            alt="Nusa Studio"
            width={100}
            height={100}
            quality={100}
            className="mb-6 w-28 object-contain"
          />
          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">Welcome Back</CardTitle>
          <CardDescription className="text-slate-500">Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
          <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@nusacaraka.com"
                className="bg-white/50"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="bg-white/50 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" loading={isLoading} className="my-2! w-full" disabled={isLoading}>
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="absolute bottom-8 w-full text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Nusacaraka Studio. classic admin.
      </div>
    </div>
  )
}
