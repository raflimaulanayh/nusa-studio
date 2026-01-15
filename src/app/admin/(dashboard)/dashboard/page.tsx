import { MOCK_BOOKINGS } from '@/data/mock-bookings'
import { Activity, CreditCard, DollarSign, Users, Briefcase } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/ui/card'
import { OverviewChart } from '@/components/organisms/admin/overview-chart'

export default function DashboardPage() {
  const totalBookings = MOCK_BOOKINGS.length
  const newBookings = MOCK_BOOKINGS.filter((b) => b.status === 'New').length
  const activeClients = MOCK_BOOKINGS.filter((b) => b.status === 'In Progress').length

  // Mocking some financial data since we don't have it
  const totalRevenue = 'Rp 45.231.899'

  // Sort bookings by date for "Recent"
  // (Assuming MOCK_BOOKINGS is sorted or we sort it)
  const recentBookings = [...MOCK_BOOKINGS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-3xl">Dashboard</h2>
        <div className="flex items-center space-x-2">{/* Date picker would go here */}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue - Blue */}
        <Card className="stat-card-blue shadow-modern hover:shadow-modern-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total Revenue</CardTitle>
            <div className="gradient-icon-blue rounded-lg p-2">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalRevenue}</div>
            <p className="text-xs font-medium text-emerald-600">+20.1% from last month</p>
          </CardContent>
        </Card>

        {/* Total Bookings - Teal */}
        <Card className="stat-card-teal shadow-modern hover:shadow-modern-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total Bookings</CardTitle>
            <div className="gradient-icon-teal rounded-lg p-2">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+{totalBookings}</div>
            <p className="text-xs font-medium text-emerald-600">+180.1% from last month</p>
          </CardContent>
        </Card>

        {/* Active Projects - Orange */}
        <Card className="stat-card-orange shadow-modern hover:shadow-modern-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Active Projects</CardTitle>
            <div className="gradient-icon-orange rounded-lg p-2">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+{activeClients}</div>
            <p className="text-xs font-medium text-emerald-600">+19% from last month</p>
          </CardContent>
        </Card>

        {/* New Inquiries - Purple */}
        <Card className="stat-card-purple shadow-modern hover:shadow-modern-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">New Inquiries</CardTitle>
            <div className="gradient-icon-purple rounded-lg p-2">
              <Activity className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+{newBookings}</div>
            <p className="text-xs font-medium text-emerald-600">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Split View */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Section */}
        <Card className="shadow-modern col-span-4">
          <CardHeader>
            <CardTitle className="text-slate-900">Overview</CardTitle>
            <CardDescription>Monthly revenue trajectory (Estimations).</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>

        {/* Recent Sales/Bookings */}
        <Card className="shadow-modern col-span-3">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
            <div className="space-y-1.5">
              <CardTitle className="text-slate-900">Recent Bookings</CardTitle>
              <CardDescription>You have {newBookings} new inquiries this week.</CardDescription>
            </div>
            <Link href="/admin/bookings">
              <button className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline">
                View All
              </button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/admin/bookings/${booking.id}`}
                  className="group block rounded-lg border border-slate-200 p-4 transition-all hover:border-secondary hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900">{booking.name}</p>
                        {booking.status === 'New' && (
                          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                            New
                          </span>
                        )}
                      </div>

                      {/* Email & Service */}
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500">{booking.email}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                          <span>{booking.service}</span>
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="text-xs font-medium text-slate-700">{booking.budget}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
