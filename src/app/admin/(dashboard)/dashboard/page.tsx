'use client'

import { Activity, DollarSign, Users, Briefcase } from 'lucide-react'
import Link from 'next/link'

import { useBookings, useBookingStatistics } from '@/hooks/useBookings'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/ui/card'
import { OverviewChart } from '@/components/organisms/admin/overview-chart'

const StatCardSkeleton = () => (
  <Card className="shadow-modern">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />
    </CardHeader>
    <CardContent>
      <div className="h-8 w-20 animate-pulse rounded bg-slate-200" />
      <div className="mt-1 h-3 w-32 animate-pulse rounded bg-slate-200" />
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const { stats, isLoading: statsLoading } = useBookingStatistics()
  const { bookings, isLoading: bookingsLoading } = useBookings()

  // Recent bookings - latest 5
  const recentBookings = bookings
    ? [...bookings].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5)
    : []

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-3xl">Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            {/* Total Bookings - Blue */}
            <Card className="stat-card-blue shadow-modern hover:shadow-modern-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Total Bookings</CardTitle>
                <div className="gradient-icon-blue rounded-lg p-2">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-slate-900">+{stats?.total || 0}</div>
                <p className="text-xs font-medium text-slate-600">All time bookings</p>
              </CardContent>
            </Card>

            {/* New Inquiries - Teal */}
            <Card className="stat-card-teal shadow-modern hover:shadow-modern-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">New Inquiries</CardTitle>
                <div className="gradient-icon-teal rounded-lg p-2">
                  <Activity className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-slate-900">+{stats?.new || 0}</div>
                <p className="text-xs font-medium text-slate-600">Awaiting response</p>
              </CardContent>
            </Card>

            {/* Active Projects - Orange */}
            <Card className="stat-card-orange shadow-modern hover:shadow-modern-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Active Projects</CardTitle>
                <div className="gradient-icon-orange rounded-lg p-2">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-slate-900">+{stats?.inProgress || 0}</div>
                <p className="text-xs font-medium text-slate-600">In progress</p>
              </CardContent>
            </Card>

            {/* Completed - Purple */}
            <Card className="stat-card-purple shadow-modern hover:shadow-modern-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Completed</CardTitle>
                <div className="gradient-icon-purple rounded-lg p-2">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-slate-900">+{stats?.completed || 0}</div>
                <p className="text-xs font-medium text-emerald-600">Successful projects</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Split View */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Chart Section */}
        <Card className="shadow-modern overflow-hidden lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-slate-900">Overview</CardTitle>
            <CardDescription>Monthly booking trends</CardDescription>
          </CardHeader>
          <CardContent className="px-2 pb-6 sm:px-6">
            <OverviewChart />
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="shadow-modern lg:col-span-3">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
            <div className="space-y-1.5">
              <CardTitle className="text-slate-900">Recent Bookings</CardTitle>
              <CardDescription>Latest {recentBookings.length} inquiries</CardDescription>
            </div>
            <Link href="/admin/bookings">
              <button className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline">
                View All
              </button>
            </Link>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-24 animate-pulse rounded-lg bg-slate-200" />
                ))}
              </div>
            ) : recentBookings.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500">No bookings yet</div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <Link
                    key={booking.rowIndex}
                    href={`/admin/bookings/${booking.rowIndex}`}
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
                        {booking.budget && <div className="text-xs font-medium text-slate-700">{booking.budget}</div>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
