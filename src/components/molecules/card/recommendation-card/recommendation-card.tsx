'use client'

import { SERVICES_MORE_DATA } from '@/constants/service-data'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'

const getBookingServiceTitle = (slug: string): string => {
  const mapping: Record<string, string> = {
    'product-photography': 'Product Photography',
    'brand-identity': 'Brand Identity',
    'web-development': 'Web Development',
    'digital-marketing': 'Digital Marketing',
    'ui-ux-design': 'Content Creation'
  }

  return mapping[slug] || 'Other'
}

interface Props {
  serviceIds: string[]
  reasoning: string
}

export function RecommendationCard({ serviceIds, reasoning }: Props) {
  const recommendedServices = SERVICES_MORE_DATA.filter((service) => serviceIds.includes(service.slug))

  if (recommendedServices.length === 0) return null

  return (
    <div className="my-4 space-y-3 sm:my-6 sm:space-y-4">
      {reasoning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 rounded-xl border border-primary/20 bg-linear-to-r from-primary/5 to-purple-50/30 p-3 sm:p-4"
        >
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
          <div>
            <p className="text-xs font-medium text-gray-900 sm:text-sm">Rekomendasi untuk Anda</p>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm">{reasoning}</p>
          </div>
        </motion.div>
      )}

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {recommendedServices.map((service, idx) => {
          const Icon = service.icon

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute top-0 right-0 h-16 w-16 bg-linear-to-br from-primary/10 to-transparent blur-2xl sm:h-20 sm:w-20" />

              <div className="relative p-4 sm:p-6">
                <div className="mb-3 flex items-start justify-between sm:mb-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-white transition-all sm:h-14 sm:w-14"
                    >
                      <Icon size={24} className="sm:hidden" />
                      <Icon size={28} className="hidden sm:block" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{service.title}</h3>
                      <p className="mt-0.5 text-xs font-medium text-primary">Service #{service.id}</p>
                    </div>
                  </div>
                </div>

                <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600 sm:mb-4">{service.shortDescription}</p>

                <div className="mb-4 space-y-1.5 sm:mb-5 sm:space-y-2">
                  {service.features.slice(0, 3).map((feature, featureIdx) => (
                    <motion.div
                      key={featureIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + featureIdx * 0.05 }}
                      className="flex items-start gap-2 text-xs text-gray-700 sm:gap-2.5 sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600 sm:h-4 sm:w-4" />
                      <span className="leading-snug">{feature.title}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4">
                  {service.tags.slice(0, 3).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 sm:px-2.5 sm:py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="my-3 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent sm:my-4" />

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href={`/services/${service.slug}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="group/btn w-full text-xs transition-all hover:border-primary/50 sm:text-sm"
                    >
                      <span>Detail Layanan</span>
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1 sm:h-3.5 sm:w-3.5" />
                    </Button>
                  </Link>
                  <Link
                    href={`/book?service=${encodeURIComponent(getBookingServiceTitle(service.slug))}`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-linear-to-r from-primary to-primary/90 text-xs transition-all sm:text-sm">
                      Book a Call
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
