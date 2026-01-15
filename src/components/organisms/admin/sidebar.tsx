'use client'

import { LayoutDashboard, MessageSquare, LogOut, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Bookings', href: '/admin/bookings', icon: MessageSquare },
  { label: 'Messages', href: '/admin/messages', icon: Mail }
]

export function AdminSidebar() {
  const pathname = usePathname()

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

        <div className="mt-auto space-y-4 py-8">
          {/* User Info Card */}
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-sm font-bold text-white">
                AD
              </div>
              {/* User Details */}
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold text-white">Administrator</p>
                <p className="truncate text-xs text-blue-200">ADMIN</p>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-white/10 pt-2">
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-blue-100 transition-colors hover:bg-white/10 hover:text-white">
              <LogOut className="h-5 w-5 text-blue-200" />
              Keluar
            </button>
          </div>
        </div>
      </nav>
    </aside>
  )
}
