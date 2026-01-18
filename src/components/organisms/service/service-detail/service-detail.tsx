'use client'

import { SERVICES_MORE_DATA } from '@/constants/service-data'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

interface Props {
  slug: string
}

export const ServiceDetail = ({ slug }: Props) => {
  const service = SERVICES_MORE_DATA.find((s) => s.slug === slug)

  if (!service) {
    return notFound()
  }

  return (
    <Container>
      <header className="mx-auto mb-20 max-w-4xl text-center md:mb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link href="/services" className="mb-8 inline-block">
            <Text
              size="sm"
              weight="semibold"
              className="tracking-widest text-secondary uppercase underline-offset-4 hover:underline"
            >
              ← Back to Services
            </Text>
          </Link>

          <h1 className="mb-8 font-serif text-5xl leading-[1.1] font-medium tracking-tight text-primary md:text-6xl lg:text-7xl">
            {service.title}
          </h1>

          <Text size="lg" className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground/80 md:text-2xl">
            {service.shortDescription}
          </Text>
        </motion.div>
      </header>

      {/* Overview & Description */}
      <section className="mb-24 md:mb-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-secondary/5 p-12 md:p-16">
              <div className="absolute inset-0 bg-linear-to-br from-secondary/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <service.icon
                strokeWidth={1}
                className="h-40 w-40 text-primary opacity-80 transition-transform duration-700 ease-out group-hover:scale-110 md:h-64 md:w-64"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-serif text-3xl font-medium text-primary md:text-4xl">Overview</h2>
            <Text className="text-lg leading-relaxed text-muted-foreground">{service.fullDescription}</Text>

            <div className="pt-8">
              <Button
                url={`/book?service=${encodeURIComponent(service.title)}`}
                variant="default"
                size="lg"
                className="px-8"
              >
                Book this Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mb-24 md:mb-32">
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-serif text-3xl font-medium text-primary md:text-5xl">Key Capabilities</h2>
          <Text variant="muted" className="mx-auto max-w-2xl">
            Comprehensive solutions designed to tackle your specific challenges.
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {service.features.map((feature, idx) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group rounded-3xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:border-primary/10 hover:shadow-xl hover:shadow-slate-200/50 md:p-10"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <feature.icon size={24} />
              </div>
              <h3 className="mb-3 font-serif text-xl font-medium text-primary md:text-2xl">{feature.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 md:p-16">
          <div className="pointer-events-none absolute top-0 right-0 -mt-32 -mr-32 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />

          <div className="relative z-10">
            <div className="mb-16 max-w-3xl">
              <Text size="sm" weight="semibold" className="mb-4 tracking-widest text-secondary uppercase">
                Our Process
              </Text>
              <h2 className="mb-6 font-serif text-3xl text-primary md:text-5xl">How We Make It Happen</h2>
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                A structured approach ensuring transparency, quality, and timely delivery for every project.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {service.process.map((step, idx) => (
                <div key={step.title} className="relative">
                  {/* Line for desktop */}
                  {idx < service.process.length - 1 && (
                    <div className="absolute top-6 -right-8 left-12 hidden h-px bg-slate-200 md:block" />
                  )}

                  <div className="relative z-10 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-lg text-primary shadow-sm">
                    0{idx + 1}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-primary">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
