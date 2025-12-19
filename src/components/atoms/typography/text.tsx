'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/index'

const textVariants = cva('font-sans', {
  variants: {
    size: {
      xs: 'text-xs leading-relaxed',
      sm: 'text-sm leading-relaxed',
      base: 'text-base leading-relaxed',
      lg: 'text-lg leading-relaxed',
      xl: 'text-xl leading-relaxed'
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-semibold'
    },
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
      white: 'text-white',
      inherit: 'text-inherit'
    }
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    variant: 'default'
  }
})

type TextElement = 'p' | 'span' | 'div' | 'label'

interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: TextElement
}

function Text({ className, as: Comp = 'p', size, weight, variant, children, ...props }: TextProps) {
  return (
    <Comp className={cn(textVariants({ size, weight, variant, className }))} {...props}>
      {children}
    </Comp>
  )
}

Text.displayName = 'Text'

export { Text, textVariants }
export type { TextProps }
