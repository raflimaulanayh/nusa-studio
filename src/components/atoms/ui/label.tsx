import * as React from 'react'

import { cn } from '@/utils/cn'

// Since we might not have radix-ui/react-label installed, I'll create a standard label first.
// Checking package.json... user provided package.json earlier.
// "@radix-ui/react-accordion": "^1.2.12", "@radix-ui/react-slot": "^1.2.3".
// Label is likely NOT installed. I'll use a simple HTML label with class names to avoid install step.

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
      {...props}
    />
  )
)
Label.displayName = 'Label'

export { Label }
