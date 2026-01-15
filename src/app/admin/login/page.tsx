'use client'

import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/ui/card'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    router.push('/admin/dashboard')
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="admin@nusacaraka.com" className="bg-white/50" required />
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
          </form>
        </CardContent>
        <CardFooter className="pt-2 pb-8">
          <Button loading={loading} className="w-full" onClick={handleSubmit} disabled={loading}>
            Sign In
          </Button>
        </CardFooter>
      </Card>

      <div className="absolute bottom-8 w-full text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Nusacaraka Studio. classic admin.
      </div>
    </div>
  )
}
