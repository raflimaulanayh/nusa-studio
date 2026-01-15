'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/atoms/ui/chart'

const chartData = [
  { month: 'Jan', revenue: 12000000 },
  { month: 'Feb', revenue: 18000000 },
  { month: 'Mar', revenue: 25000000 },
  { month: 'Apr', revenue: 22000000 },
  { month: 'May', revenue: 45231899 },
  { month: 'Jun', revenue: 32000000 },
  { month: 'Jul', revenue: 38000000 },
  { month: 'Aug', revenue: 42000000 },
  { month: 'Sep', revenue: 35000000 },
  { month: 'Oct', revenue: 50000000 },
  { month: 'Nov', revenue: 48000000 },
  { month: 'Dec', revenue: 60000000 }
]

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#113561' // Using primary hex or var(--primary) if supported
  }
} satisfies ChartConfig

export function OverviewChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          className="text-xs text-muted-foreground"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `Rp${(value / 1000000).toFixed(0)}jt`}
          className="text-xs text-muted-foreground"
          width={80}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
