'use client'

import { MOCK_CONTACTS } from '@/data/mock-contacts'
import { ArrowLeft, Mail, Calendar, User, Briefcase, Reply as ReplyIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/atoms/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/ui/card'

export default function MessageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const message = MOCK_CONTACTS.find((m) => m.id === id)

  if (!message) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Message Not Found</h2>
        <p className="text-slate-500">The message you are looking for does not exist.</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl flex-1 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back to Messages
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-3xl">{message.name}</h2>
          <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {message.email}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary text-white hover:bg-primary/90">
            <ReplyIcon className="mr-2 h-4 w-4" />
            Reply via Email
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">Message Content</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="leading-relaxed whitespace-pre-wrap text-slate-700">{message.message}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium tracking-wider text-muted-foreground uppercase">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-900">
                  <Briefcase className="h-4 w-4 text-secondary" />
                  Service Interest
                </div>
                <div className="pl-6 text-sm text-slate-500">{message.service}</div>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-900">
                  <User className="h-4 w-4 text-secondary" />
                  Status
                </div>
                <div className="pl-6">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {message.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
