'use client'

import type { Booking } from '@/data/mock-bookings'
import {
  EnvelopeSimple,
  Phone,
  CalendarBlank,
  Briefcase,
  CurrencyDollar,
  ChatCircleText,
  WhatsappLogo
} from '@phosphor-icons/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { StatusCard } from '@/components/organisms/admin/status-card'

export function BookingDetailContent({ booking }: { booking: Booking }) {
  const waNumber = booking.phone?.replace(/\D/g, '') || ''
  const waMessage = encodeURIComponent(
    `Hi ${booking.name}, thank you for contacting Nusa Creative Studio regarding your interest in ${booking.service}.`
  )
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/bookings"
        className="group inline-flex items-center text-sm text-slate-600 transition-colors hover:text-primary"
      >
        <ArrowLeft className="mr-1 size-5 transition-transform group-hover:-translate-x-1" />
        Back to Bookings
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 lg:text-3xl">
            {booking.name}
            {booking.company && <span className="ml-2 font-normal text-slate-600">({booking.company})</span>}
          </h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <EnvelopeSimple className="size-5 text-primary" weight="duotone" />
              {booking.email}
            </div>
            {booking.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-5 text-primary" weight="duotone" />
                {booking.phone}
              </div>
            )}
            <div className="flex items-center gap-2">
              <CalendarBlank className="size-5 text-primary" weight="duotone" />
              {new Date(booking.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex shrink-0 gap-3">
          {booking.phone ? (
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 text-white hover:bg-green-600">
                <WhatsappLogo className="size-5" weight="fill" />
                WhatsApp
              </Button>
            </a>
          ) : (
            <Button disabled variant="outline">
              <WhatsappLogo className="size-5" />
              No Phone
            </Button>
          )}
          <a href={`mailto:${booking.email}`}>
            <Button variant="outline">
              <EnvelopeSimple className="size-5" weight="duotone" />
              Email
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
              <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-700">{booking.message}</p>
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
                  Service
                </div>
                <div className="text-base font-medium text-slate-900">{booking.service}</div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  <CurrencyDollar className="size-5" weight="duotone" />
                  Budget
                </div>
                <div className="text-base font-medium text-slate-900">{booking.budget}</div>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <StatusCard initialStatus={booking.status} bookingId={booking.id} />
        </div>
      </div>
    </div>
  )
}
