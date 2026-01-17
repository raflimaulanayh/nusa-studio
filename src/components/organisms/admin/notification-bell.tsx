'use client'

import { Bell, MessageSquare, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { useBookings } from '@/hooks/useBookings'
import { useMessages } from '@/hooks/useMessages'

import { cn } from '@/utils/cn'

type NotificationTab = 'bookings' | 'messages'

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<NotificationTab>('bookings')

  // Get real data from hooks
  const { bookings } = useBookings()
  const { messages } = useMessages()

  // Filter for new items only
  const newBookings = (bookings || []).filter((b) => b.status === 'New' || !b.status).slice(0, 5)
  const newMessages = (messages || []).filter((m) => m.status === 'New' || !m.status).slice(0, 5)
  const totalUnread = newBookings.length + newMessages.length

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
      >
        <Bell className="h-5 w-5" />
        {totalUnread > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            {totalUnread > 9 ? '9+' : totalUnread}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown Panel */}
          <div className="absolute top-12 right-0 z-50 w-96 animate-in duration-200 fade-in slide-in-from-top-2">
            <div className="shadow-modern-lg rounded-lg border border-slate-200 bg-white">
              {/* Header with Tabs */}
              <div className="border-b border-slate-200">
                <div className="flex">
                  {/* Bookings Tab */}
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                      activeTab === 'bookings'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Booking</span>
                    {newBookings.length > 0 && (
                      <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-600">
                        {newBookings.length}
                      </span>
                    )}
                  </button>

                  {/* Messages Tab */}
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                      activeTab === 'messages'
                        ? 'border-b-2 border-teal-600 text-teal-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                    {newMessages.length > 0 && (
                      <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-[10px] font-semibold text-teal-600">
                        {newMessages.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-96 overflow-y-auto py-2">
                {/* Bookings Tab Content */}
                {activeTab === 'bookings' && (
                  <>
                    {newBookings.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {newBookings.map((booking) => (
                          <Link
                            key={booking.rowIndex}
                            href={`/admin/bookings/${booking.rowIndex}`}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 transition-colors hover:bg-slate-50"
                          >
                            <div className="flex items-start gap-3">
                              {/* Avatar */}
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                                {booking.name.charAt(0)}
                              </div>

                              {/* Content */}
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium text-slate-900">{booking.name}</p>
                                <p className="text-xs text-slate-500">{booking.email}</p>
                                <p className="text-xs text-slate-600">
                                  {booking.service} • {booking.budget || 'Budget not specified'}
                                </p>
                              </div>

                              {/* Badge */}
                              <span className="shrink-0 rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-600">
                                NEW
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <p className="text-sm text-slate-500">Tidak ada booking baru</p>
                      </div>
                    )}
                  </>
                )}

                {/* Messages Tab Content */}
                {activeTab === 'messages' && (
                  <>
                    {newMessages.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {newMessages.map((message) => (
                          <Link
                            key={message.rowIndex}
                            href={`/admin/messages/${message.rowIndex}`}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 transition-colors hover:bg-slate-50"
                          >
                            <div className="flex items-start gap-3">
                              {/* Avatar */}
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-600">
                                {message.name.charAt(0)}
                              </div>

                              {/* Content */}
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium text-slate-900">{message.name}</p>
                                <p className="text-xs text-slate-500">{message.email}</p>
                                <p className="text-xs text-slate-600">{message.service}</p>
                                <p className="line-clamp-2 text-xs text-slate-500">{message.message}</p>
                              </div>

                              {/* Badge */}
                              <span className="shrink-0 rounded-full bg-teal-100 px-2 py-1 text-[10px] font-semibold text-teal-600">
                                NEW
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <p className="text-sm text-slate-500">Tidak ada pesan baru</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 px-4 py-2">
                <Link
                  href={activeTab === 'bookings' ? '/admin/bookings' : '/admin/messages'}
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-md py-2 text-center text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
                >
                  {activeTab === 'bookings' ? 'Lihat Semua Booking' : 'Lihat Semua Pesan'}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
