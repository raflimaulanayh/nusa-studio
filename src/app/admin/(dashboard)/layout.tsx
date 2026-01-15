import { NotificationBell } from '@/components/organisms/admin/notification-bell'
import { AdminSidebar } from '@/components/organisms/admin/sidebar'
import { Container } from '@/components/templates/container'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <div className="sticky top-0 z-30 flex flex-1 flex-col border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
          <Container className="flex h-16 items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-900">Nusa Creative Studio</h1>
            <NotificationBell />
          </Container>
        </header>

        <Container className="flex-1 py-6 pb-20">{children}</Container>
      </div>
    </div>
  )
}
