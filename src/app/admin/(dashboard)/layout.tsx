'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { NotificationBell } from '@/components/organisms/admin/notification-bell'
import { AdminSidebar } from '@/components/organisms/admin/sidebar'
import { Container } from '@/components/templates/container'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
          <Container className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <h1 className="text-lg font-semibold text-slate-900">Nusa Creative Studio</h1>
            </div>
            <NotificationBell />
          </Container>
        </header>

        {/* Page Content */}
        <Container className="flex-1 py-6 pb-20">{children}</Container>
      </div>
    </div>
  )
}
