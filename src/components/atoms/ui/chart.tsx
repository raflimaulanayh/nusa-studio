'use client'

import * as React from 'react'
import { ResponsiveContainer, Tooltip, Legend, TooltipProps } from 'recharts'

import { cn } from '@/utils/cn'

// Config interface
export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

// Context
const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a ChartContainer')
  }

  return context
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig
    children: React.ComponentProps<typeof ResponsiveContainer>['children']
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-none [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <Style id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = 'ChartContainer'

const Style = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorStyles = Object.entries(config)
    .filter(([_, value]) => value.color)
    .map(([key, value]) => {
      return `[data-chart=${id}] { --color-${key}: ${value.color}; }`
    })
    .join('\n')

  return <style dangerouslySetInnerHTML={{ __html: colorStyles }} />
}

export const ChartTooltip = Tooltip

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    TooltipProps<number, string> & {
      hideLabel?: boolean
      indicator?: 'line' | 'dot' | 'dashed'
    }
>(({ active, payload, className, hideLabel = false, label }, ref) => {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-slate-200/50 bg-white/95 px-2.5 py-1.5 text-xs shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95',
        className
      )}
    >
      {!hideLabel && <div className="mb-1 font-medium text-slate-500">{label}</div>}
      <div className="grid gap-1.5 align-middle">
        {payload.map((item, index: number) => {
          const key = item.dataKey || item.name
          const conf = config[key] || { label: key, color: item.fill || item.color }

          return (
            <div key={index} className="flex w-full items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: conf.color }} />
              <div className="flex flex-1 items-center justify-between gap-4 leading-none">
                <span className="text-slate-500">{conf.label}</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums dark:text-slate-50">
                  {typeof item.value === 'number' ? `Rp${(item.value / 1000000).toFixed(1)}jt` : item.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = 'ChartTooltipContent'

export const ChartLegend = Legend
export const ChartLegendContent = () => <div />
