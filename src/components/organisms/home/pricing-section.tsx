'use client'

import { SERVICE_PACKAGES } from '@/data/pricing'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Camera, Smartphone, PenTool, Monitor } from 'lucide-react'
import { useState } from 'react'

import { Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

import { cn } from '@/utils/cn'

const ICONS = {
  Camera: Camera,
  Smartphone: Smartphone,
  PenTool: PenTool,
  Monitor: Monitor
}

interface PricingSectionProps {
  filterId?: string
  title?: string
  subtitle?: string
}

export const PricingSection = ({
  filterId,
  title = 'Investment Plans',
  subtitle = 'Clear, transparent pricing for creative solutions that drive results.'
}: PricingSectionProps) => {
  const [activeTab, setActiveTab] = useState(filterId || SERVICE_PACKAGES[0].id)

  const activePackage = SERVICE_PACKAGES.find((pkg) => pkg.id === activeTab) || SERVICE_PACKAGES[0]

  // If filterId is provided but invalid, we might want to default or hide.
  // currently defaults to [0].

  const showTabs = !filterId

  return (
    <section className="relative overflow-hidden bg-background py-24" id="pricing">
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-primary/5 opacity-50 blur-3xl" />
        <div className="absolute top-[60%] -left-[10%] h-[40%] w-[40%] rounded-full bg-secondary/5 opacity-50 blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-semibold text-primary md:text-5xl">{title}</h2>
            <Text className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">{subtitle}</Text>

            {showTabs && (
              <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                {SERVICE_PACKAGES.map((pkg) => {
                  const Icon = ICONS[pkg.icon as keyof typeof ICONS]
                  const isActive = activeTab === pkg.id

                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setActiveTab(pkg.id)}
                      className={cn(
                        'relative flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 sm:px-6 sm:py-3',
                        isActive
                          ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                          : 'border-primary/10 bg-white text-muted-foreground hover:border-primary/30 hover:bg-primary/5'
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="text-sm font-medium sm:text-base">{pkg.title}</span>
                    </button>
                  )
                })}
              </div>
            )}

            <motion.div
              key={activePackage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-lg leading-relaxed font-medium text-primary/80">&quot;{activePackage.description}&quot;</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-10 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 place-items-start justify-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {activePackage.tiers.map((tier, index) => (
                <article
                  key={index}
                  className={cn(
                    'relative flex h-full w-full flex-col rounded-2xl p-6 transition-all duration-300 md:p-8',
                    tier.highlight
                      ? 'z-10 scale-105 border-2 border-secondary bg-white shadow-xl'
                      : 'border border-primary/10 bg-white/50 hover:border-primary/30 hover:shadow-lg'
                  )}
                >
                  {tier.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold tracking-wider text-white uppercase shadow-md">
                      RECOMMENDED
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="mb-2 line-clamp-1 text-xl font-semibold text-primary" title={tier.name}>
                      {tier.name}
                    </h3>
                    <div className="mb-1 text-2xl font-semibold text-primary">{tier.price}</div>
                  </div>

                  <div className="mb-6 h-px w-full bg-primary/10" />

                  <div className="mb-8 flex flex-grow flex-col gap-3">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <Check
                          className={cn('mt-0.5 h-4 w-4 shrink-0', tier.highlight ? 'text-secondary' : 'text-green-500')}
                        />
                        <span className="leading-tight text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    url={`/book?service=${encodeURIComponent(activePackage.title)}&plan=${encodeURIComponent(tier.name)}`}
                    variant={tier.highlight ? 'default' : 'outline'}
                    className={cn(
                      'mt-auto w-full',
                      !tier.highlight && 'border-primary/20 text-primary hover:bg-primary hover:text-white'
                    )}
                  >
                    Choose Plan
                  </Button>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
