'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import type { Booking } from '@/hooks/useBookings'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/atoms/ui/chart'

interface OverviewChartProps {
  bookings?: Booking[]
  isLoading?: boolean
}

// Skeleton loading component
export function OverviewChartSkeleton() {
  return (
    <div className="h-[350px] w-full animate-pulse">
      {/* Y-axis labels */}
      <div className="flex h-full gap-2">
        <div className="flex w-10 flex-col justify-between py-3">
          <div className="h-3 w-6 rounded bg-slate-200" />
          <div className="h-3 w-6 rounded bg-slate-200" />
          <div className="h-3 w-6 rounded bg-slate-200" />
          <div className="h-3 w-6 rounded bg-slate-200" />
          <div className="h-3 w-6 rounded bg-slate-200" />
        </div>

        {/* Chart area */}
        <div className="flex flex-1 flex-col">
          {/* Bars */}
          <div className="flex h-full items-end justify-around gap-1 px-2">
            {[40, 60, 30, 80, 50, 70, 45, 65, 55, 75, 35, 50].map((height, i) => (
              <div key={i} className="w-full rounded-t bg-slate-200" style={{ height: `${height}%`, minWidth: '8px' }} />
            ))}
          </div>

          {/* X-axis labels */}
          <div className="mt-2 flex justify-around gap-1 px-2">
            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, i) => (
              <div key={i} className="h-3 w-full rounded bg-slate-200" style={{ minWidth: '8px' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const chartConfig = {
  bookings: {
    label: 'Bookings',
    color: '#113561'
  }
} satisfies ChartConfig

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function OverviewChart({ bookings = [] }: OverviewChartProps) {
  // Get current year
  const currentYear = new Date().getFullYear()

  const monthlyData = MONTHS.map((month, index) => {
    const monthNum = index + 1

    const count = bookings.filter((booking) => {
      const bookingDate = new Date(booking.timestamp)

      // Filter by current year AND month
      return bookingDate.getFullYear() === currentYear && bookingDate.getMonth() + 1 === monthNum
    }).length

    return {
      month,
      bookings: count
    }
  })

  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart accessibilityLayer data={monthlyData} margin={{ left: -20, right: 10, top: 10, bottom: 10 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            className="text-xs text-muted-foreground"
          />
          <YAxis tickLine={false} axisLine={false} className="text-xs text-slate-600" width={40} allowDecimals={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="bookings" fill="var(--color-bookings)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
