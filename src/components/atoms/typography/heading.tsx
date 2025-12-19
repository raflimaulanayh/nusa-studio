'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/index'

const headingVariants = cva('font-serif tracking-tight text-foreground', {
  variants: {
    as: {
      h1: 'text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1]',
      h2: 'text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15]',
      h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.2]',
      h4: 'text-xl md:text-2xl lg:text-3xl font-semibold leading-[1.25]',
      h5: 'text-lg md:text-xl lg:text-2xl font-medium leading-[1.3]',
      h6: 'text-base md:text-lg lg:text-xl font-medium leading-[1.35]'
    },
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
      gradient: 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
      white: 'text-white'
    }
  },
  defaultVariants: {
    as: 'h1',
    variant: 'default'
  }
})

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: HeadingTag
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = 'h1', variant, children, ...props }, ref) => {
    const Comp = as

    return (
      <Comp ref={ref} className={cn(headingVariants({ as, variant, className }))} {...props}>
        {children}
      </Comp>
    )
  }
)

Heading.displayName = 'Heading'

export { Heading, headingVariants }
export type { HeadingProps }
