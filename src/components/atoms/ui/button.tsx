'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import * as React from 'react'

import { useIsHydrated } from '@/hooks/useIsHydrated'

import { Loader } from '@/components/atoms/ui/loader'

import { cn } from '@/utils/index'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap max-sm:text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow hover:shadow-primary/25 active:translate-y-0 disabled:bg-slate-600',
        secondary:
          'bg-secondary text-white shadow-sm hover:bg-secondary/90 hover:shadow hover:shadow-secondary/25 active:translate-y-0 disabled:bg-slate-600',
        destructive:
          'bg-red-500 text-white shadow-sm hover:bg-red-500/90 hover:shadow hover:shadow-red-500/25 focus-visible:ring-red-500/20',
        outline: 'border shadow-sm border-primary/20 text-primary hover:border-primary/80 hover:shadow backdrop-blur-sm',
        'outline-primary':
          'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:shadow hover:shadow-primary/25',
        'outline-secondary':
          'border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white hover:shadow hover:shadow-secondary/25',
        'outline-red':
          'border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white hover:shadow hover:shadow-red-500/25',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'accent-orange':
          'bg-accent-orange text-white shadow-sm hover:bg-accent-orange/90 hover:shadow hover:shadow-accent-orange/25 disabled:bg-slate-600',
        'outline-slate': 'bg-transparent text-slate-500 shadow-xs hover:bg-slate-300/80 border border-slate-300',
        'outline-blue': 'bg-transparent text-primary shadow-xs hover:bg-primary/10 border border-primary',
        'outline-green': 'bg-transparent text-secondary shadow-xs hover:bg-secondary/10 border border-secondary',
        'outline-orange':
          'bg-transparent text-accent-orange shadow-xs hover:bg-accent-orange/10 border border-accent-orange',
        none: 'bg-none border-none'
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-3',
        xs: 'h-7 w-7 px-0 rounded-sm',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 px-6 has-[>svg]:px-4',
        icon: 'size-9'
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        '4xl': 'rounded-4xl',
        default: 'rounded-lg',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'default',
      rounded: 'full'
    }
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  url?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  loadingMsg?: string
  external?: boolean
  disabledHref?: boolean
  ordinaryHref?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      url,
      leftIcon,
      rightIcon,
      loading,
      external = false,
      disabledHref = false,
      ordinaryHref = false,
      loadingMsg = 'Loading...',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isHydrated = useIsHydrated()
    if (!isHydrated) return null

    if (url && !disabledHref && !ordinaryHref) {
      return (
        <Link
          href={url}
          className={cn(buttonVariants({ variant, size, className }))}
          target={external ? '_blank' : undefined}
        >
          {!loading && leftIcon && leftIcon}
          {!loading && props.children}
          {!loading && rightIcon && rightIcon}
          {loading && (
            <React.Fragment>
              <Loader className={loadingMsg && 'mr-2 w-fit'} />
              {loadingMsg && <span>{loadingMsg}</span>}
            </React.Fragment>
          )}
        </Link>
      )
    }

    if (url && ordinaryHref) {
      return (
        <a
          href={url}
          className={cn(buttonVariants({ variant, size, rounded, className }))}
          target={external ? '_blank' : undefined}
          rel="noreferrer"
        >
          {!loading && leftIcon && leftIcon}
          {!loading && props.children}
          {!loading && rightIcon && rightIcon}
          {loading && (
            <React.Fragment>
              <Loader className={loadingMsg && 'mr-2 w-fit'} />
              {loadingMsg && <span>{loadingMsg}</span>}
            </React.Fragment>
          )}
        </a>
      )
    }

    return (
      <Comp className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props}>
        {!loading && leftIcon && leftIcon}
        {!loading && props.children}
        {!loading && rightIcon && rightIcon}
        {loading && (
          <React.Fragment>
            <Loader className={loadingMsg && 'mr-2 w-fit'} />
            {loadingMsg && <span>{loadingMsg}</span>}
          </React.Fragment>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
