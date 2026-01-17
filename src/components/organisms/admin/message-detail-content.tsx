'use client'

import { EnvelopeSimple, CalendarBlank, Briefcase, ChatCircleText, Ticket } from '@phosphor-icons/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import type { Message } from '@/hooks/useMessages'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { MessageStatusCard } from '@/components/organisms/admin/message-status-card'

export function MessageDetailContent({ message }: { message: Message }) {
  // Email reply template
  const emailSubject = encodeURIComponent(`Re: ${message.ticketNumber || 'Your Message'} - ${message.service}`)
  const emailBody = encodeURIComponent(
    `Halo ${message.name},

Terima kasih telah menghubungi Nusa Creative Studio!

Ticket: ${message.ticketNumber || 'N/A'}
Topik: ${message.service}

Kami merespons pesan Anda:
"${message.message.substring(0, 100)}${message.message.length > 100 ? '...' : ''}"

━━━━━━━━━━━━━━━━━━━━

[Tulis balasan Anda di sini]

━━━━━━━━━━━━━━━━━━━━

Terima kasih atas perhatian Anda.

Best regards,
Nusa Creative Studio Team`
  )
  const emailLink = `mailto:${message.email}?subject=${emailSubject}&body=${emailBody}`

  return (
    <div className="space-y-6">
      <Link
        href="/admin/messages"
        className="group inline-flex items-center text-sm text-slate-600 transition-colors hover:text-primary"
      >
        <ArrowLeft className="mr-1 size-5 transition-transform group-hover:-translate-x-1" />
        Back to Messages
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 lg:text-3xl">{message.name}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <EnvelopeSimple className="size-5 text-primary" weight="duotone" />
              {message.email}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="size-5 text-primary" weight="duotone" />
              {message.service}
            </div>
            <div className="flex items-center gap-2">
              <CalendarBlank className="size-5 text-primary" weight="duotone" />
              {new Date(message.timestamp).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-3">
          <a href={emailLink}>
            <Button variant="outline">
              <EnvelopeSimple className="size-5" weight="duotone" />
              Reply via Email
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

        <div className="space-y-6">
          {/* Info Card */}
          <Card className="border-slate-200 p-6 shadow-sm">
            <div className="space-y-5">
              {/* Ticket Number */}
              {message.ticketNumber && (
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                    <Ticket className="size-5" weight="duotone" />
                    Ticket Number
                  </div>
                  <div className="text-base font-medium text-slate-900">{message.ticketNumber}</div>
                </div>
              )}

              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  <Briefcase className="size-5" weight="duotone" />
                  Service
                </div>
                <div className="text-base font-medium text-slate-900">{message.service}</div>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <MessageStatusCard initialStatus={message.status || 'New'} rowIndex={message.rowIndex} />
        </div>
      </div>
    </div>
  )
}
