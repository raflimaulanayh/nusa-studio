'use client'

import { Check } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'

import { cn } from '@/utils/cn'

interface ServiceDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: ServicePackage | null
}

export function ServiceDetailDialog({ open, onOpenChange, service }: ServiceDetailDialogProps) {
  if (!service) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <DialogTitle>{service.title}</DialogTitle>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
              {service.id?.replaceAll('-', ' ')}
            </span>
          </div>
          <p className="text-left text-sm text-gray-600">{service.description}</p>
        </DialogHeader>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-700 uppercase">Pricing Tiers</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.tiers.map((tier, index) => (
              <div
                key={index}
                className={cn(
                  'relative rounded-lg border p-4',
                  tier.highlight ? 'border-secondary bg-secondary/5' : 'border-gray-200 bg-white'
                )}
              >
                {tier.highlight && (
                  <div className="absolute -top-2 left-4 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-white">
                    Recommended
                  </div>
                )}
                <h4 className="mb-2 font-semibold text-gray-900">{tier.name}</h4>
                <p className="mb-4 text-xl font-semibold text-primary">{tier.price}</p>
                <div className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn('mt-0.5 h-4 w-4 shrink-0', tier.highlight ? 'text-secondary' : 'text-green-500')}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
