'use client'

import type { ContactMessage } from '@/data/mock-contacts'
import { EnvelopeSimple, CalendarBlank, Briefcase, ChatCircleText } from '@phosphor-icons/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { MessageStatusCard } from '@/components/organisms/admin/message-status-card'

export function MessageDetailContent({ message }: { message: ContactMessage }) {
  const emailSubject = encodeURIComponent(`Re: ${message.service} Inquiry`)
  const emailBody = encodeURIComponent(
    `Hi ${message.name},\n\nThank you for contacting Nusa Creative Studio regarding ${message.service}.\n\n`
  )
  const emailLink = `mailto:${message.email}?subject=${emailSubject}&body=${emailBody}`

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/messages"
        className="group inline-flex items-center text-sm text-slate-600 transition-colors hover:text-primary"
      >
        <ArrowLeft className="mr-1 size-5 transition-transform group-hover:-translate-x-1" />
        Back to Messages
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 lg:text-3xl">{message.name}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <EnvelopeSimple className="size-5 text-primary" weight="duotone" />
              {message.email}
            </div>
            <div className="flex items-center gap-2">
              <CalendarBlank className="size-5 text-primary" weight="duotone" />
              {new Date(message.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex shrink-0">
          <a href={emailLink}>
            <Button variant="outline">
              <EnvelopeSimple className="size-5" weight="duotone" />
              Reply via Email
            </Button>
          </a>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Message */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-700 uppercase">
              <ChatCircleText className="h-5 w-5 text-primary" />
              Message
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-700">{message.message}</p>
            </div>
          </Card>
        </div>

        {/* Right Column - Info & Status */}
        <div className="space-y-6">
          {/* Info Card */}
          <Card className="border-slate-200 p-6 shadow-sm">
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  <Briefcase className="size-5" weight="duotone" />
                  Service Interest
                </div>
                <div className="text-base font-medium text-slate-900">{message.service}</div>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <MessageStatusCard initialStatus={message.status} messageId={message.id} />
        </div>
      </div>
    </div>
  )
}
