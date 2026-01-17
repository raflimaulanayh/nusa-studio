'use client'

import { LayoutDashboard, MessageSquare, LogOut, Mail, FileText, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Bookings', href: '/admin/bookings', icon: MessageSquare },
  { label: 'Messages', href: '/admin/messages', icon: Mail }
]

const CMS_ITEMS = [
  { label: 'Services', href: '/admin/cms/services' },
  { label: 'Articles', href: '/admin/cms/articles' },
  { label: 'Knowledge Base', href: '/admin/cms/knowledge' }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [isCmsOpen, setIsCmsOpen] = useState(pathname.startsWith('/admin/cms'))

  const isCmsActive = pathname.startsWith('/admin/cms')

  const handleLogout = async () => {
    await logout()
  }

  return (
    <aside className="sticky top-0 z-30 flex h-screen w-72 shrink-0 flex-col bg-primary text-white">
      <div className="flex h-16 shrink-0 items-center gap-3 bg-white/10 px-6">
        <Image src="/logo-admin-white.png" alt="Nusa Studio" width={32} height={32} className="h-8 w-auto" unoptimized />
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-y-2 px-5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'relative overflow-hidden bg-secondary text-white shadow-md'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon
                className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : 'text-blue-200 group-hover:text-white')}
              />
              {item.label}
            </Link>
          )
        })}

        {/* CMS Dropdown Menu */}
        <div className="flex flex-col gap-y-1">
          <button
            onClick={() => setIsCmsOpen(!isCmsOpen)}
            className={cn(
              'group flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
              isCmsActive
                ? 'relative overflow-hidden bg-secondary text-white shadow-md'
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <FileText
                className={cn('h-5 w-5 shrink-0', isCmsActive ? 'text-white' : 'text-blue-200 group-hover:text-white')}
              />
              CMS
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isCmsOpen && 'rotate-180',
                isCmsActive ? 'text-white' : 'text-blue-200 group-hover:text-white'
              )}
            />
          </button>

          {/* Submenu */}
          {isCmsOpen && (
            <div className="ml-4 flex flex-col gap-y-1 border-l border-white/10 pl-3">
              {CMS_ITEMS.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm transition-all duration-200',
                      isActive ? 'bg-white/20 font-semibold text-white' : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-auto space-y-4 py-8">
          {/* User Info Card */}
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-sm font-semibold text-white">
                AD
              </div>
              {/* User Details */}
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold text-white">{user?.name || 'Administrator'}</p>
                <p className="truncate text-xs text-blue-200">{user?.role?.toUpperCase() || 'ADMIN'}</p>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-white/10 pt-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-5 w-5 text-blue-200" />
              Keluar
            </button>
          </div>
        </div>
      </nav>
    </aside>
  )
}
