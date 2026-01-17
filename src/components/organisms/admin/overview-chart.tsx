'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/atoms/ui/chart'

interface Booking {
  timestamp: string
  [key: string]: unknown
}

interface OverviewChartProps {
  bookings?: Booking[]
}

const chartConfig = {
  bookings: {
    label: 'Bookings',
    color: '#113561'
  }
} satisfies ChartConfig

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function OverviewChart({ bookings = [] }: OverviewChartProps) {
  const monthlyData = MONTHS.map((month, index) => {
    const monthNum = index + 1

    const count = bookings.filter((booking) => {
      const bookingDate = new Date(booking.timestamp)

      return bookingDate.getMonth() + 1 === monthNum
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
