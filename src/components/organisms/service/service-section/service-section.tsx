'use client'

import { SERVICES_MORE_DATA } from '@/constants/service-data'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

export const ServiceSection = () => {
  return (
    <section className="min-h-screen bg-background pt-32 pb-20">
      <Container>
        <header className="mb-20 md:mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="mb-8 text-5xl font-semibold tracking-tight text-primary md:text-8xl">Our Services</h1>
            <div className="flex flex-col justify-between gap-8 border-t border-primary/20 pt-8 md:flex-row md:items-end">
              <Text size="lg" className="max-w-xl text-foreground opacity-70">
                Comprehensive digital solutions tailored to your unique challenges. We combine creativity with technology to
                deliver results.
              </Text>
              <div className="hidden text-sm font-medium tracking-widest text-muted-foreground uppercase md:block">
                Scroll Down
              </div>
            </div>
          </motion.div>
        </header>

        <div className="flex flex-col gap-8 md:gap-0">
          {SERVICES_MORE_DATA.map((service, index) => (
            <Link key={service.id} href={`/services/${service.slug}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(var(--foreground), 0.02)' }}
                className="group relative rounded-2xl border-t border-primary/10 px-4 py-12 transition-all duration-300 hover:border-transparent hover:shadow-2xl hover:shadow-primary/5 md:px-8 md:py-16"
              >
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 grid grid-cols-1 items-start gap-8 md:grid-cols-12">
                  <div className="md:col-span-2">
                    <span className="font-mono text-xl text-muted-foreground transition-colors duration-300 group-hover:text-secondary md:text-2xl">
                      {service.id}
                    </span>
                  </div>
                  <div className="md:col-span-6">
                    <h2 className="mb-6 text-3xl font-semibold text-primary transition-transform duration-300 ease-out group-hover:translate-x-4 md:text-5xl">
                      {service.title}
                    </h2>
                    <p className="max-w-md text-lg leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                      {service.shortDescription}
                    </p>
                  </div>{' '}
                  <div className="flex h-full flex-col justify-between gap-8 md:col-span-4 md:items-end">
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/10 bg-white/50 px-3 py-1 text-sm text-muted-foreground transition-all duration-300 group-hover:border-primary/20 group-hover:bg-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button variant="outline" rounded="full" className="w-fit">
                      Learn More
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
