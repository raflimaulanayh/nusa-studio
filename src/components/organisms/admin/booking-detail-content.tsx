'use client'

import {
  EnvelopeSimple,
  Phone,
  CalendarBlank,
  Briefcase,
  CurrencyDollar,
  ChatCircleText,
  WhatsappLogo,
  IdentificationCard
} from '@phosphor-icons/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import type { Booking } from '@/hooks/useBookings'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'
import { StatusCard } from '@/components/organisms/admin/status-card'

export function BookingDetailContent({ booking, onUpdate }: { booking: Booking; onUpdate?: () => void }) {
  const [currentStatus, setCurrentStatus] = useState(booking.status || 'New')
  const cleanPhone = booking.phone?.replace(/\D/g, '') || ''
  const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone

  const waMessage = encodeURIComponent(
    `Halo ${booking.name},

Terima kasih telah menghubungi Nusa Creative Studio!

*Detail Booking Anda:*
 - Order Number: *${booking.order_number || 'N/A'}*
 - Tanggal Order: ${new Date(booking.timestamp || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
 - Layanan: ${booking.service}
 - Budget: ${booking.budget || 'To be discussed'}

Kami telah menerima permintaan Anda dan tim kami akan segera menghubungi Anda untuk membahas detail project lebih lanjut.

Apakah ada yang bisa kami bantu?`
  )
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  // Email with pre-filled subject and body
  const emailSubject = encodeURIComponent(`Follow Up - Booking ${booking.order_number || 'Order'} - ${booking.service}`)
  const emailBody = encodeURIComponent(
    `Halo ${booking.name},

Terima kasih telah menghubungi Nusa Creative Studio!

Detail Booking Anda:
━━━━━━━━━━━━━━━━━━━━
Order Number: ${booking.order_number || 'N/A'}
Tanggal Order: ${new Date(booking.timestamp || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
Layanan: ${booking.service}
Budget: ${booking.budget || 'To be discussed'}

━━━━━━━━━━━━━━━━━━━━

Kami telah menerima permintaan Anda dan tim kami akan segera menghubungi Anda untuk membahas detail project lebih lanjut.

Salam,
Nusa Creative Studio Team`
  )
  const emailLink = `mailto:${booking.email}?subject=${emailSubject}&body=${emailBody}`

  // Auto-update status to Contacted when clicking contact buttons
  const handleContact = async () => {
    if (currentStatus === 'New' || currentStatus === 'Read') {
      // Optimistic update - update UI immediately
      setCurrentStatus('Contacted')

      try {
        // Then make API call in background
        await fetch('/api/bookings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rowIndex: booking.rowIndex,
            status: 'Contacted'
          })
        })

        // Trigger background revalidation (optional)
        if (onUpdate) {
          onUpdate()
        }
      } catch (error) {
        console.error('Failed to update status:', error)
        // Revert on error
        setCurrentStatus(booking.status || 'New')
      }
    }
  }

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
              {new Date(booking.timestamp).toLocaleDateString('id-ID', {
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
            <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={handleContact}>
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
          <a href={emailLink} onClick={handleContact}>
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
              {/* Order Number */}
              {booking.order_number && (
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                    <IdentificationCard className="size-5" weight="duotone" />
                    Order Number
                  </div>
                  <div className="text-base font-medium text-slate-900">{booking.order_number}</div>
                </div>
              )}

              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  <Briefcase className="size-5" weight="duotone" />
                  Service
                </div>
                <div className="text-base font-medium text-slate-900">{booking.service}</div>
              </div>

              {booking.budget && (
                <div className="border-t border-slate-100 pt-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                    <CurrencyDollar className="size-5" weight="duotone" />
                    Budget
                  </div>
                  <div className="text-base font-medium text-slate-900">{booking.budget}</div>
                </div>
              )}
            </div>
          </Card>

          {/* Status Card */}
          <StatusCard key={currentStatus} initialStatus={currentStatus} rowIndex={booking.rowIndex} />
        </div>
      </div>
    </div>
  )
}
