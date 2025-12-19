'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Heading, Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

export const CtaSection = () => {
  return (
    <section className="bg-transparent py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-20 lg:px-24"
        >
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[100px]" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[80px]" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-8">
            <Heading as="h2" variant="white" className="text-3xl leading-tight font-semibold md:text-4xl">
              Ready to Transform Your Digital Presence?
            </Heading>

            <Text variant="white" className="text-lg leading-relaxed opacity-80 md:text-xl">
              Let&apos;s collaborate to build something extraordinary. Our team is ready to bring your vision to life with
              precision and creativity.
            </Text>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button url="/contact" variant="secondary" size="lg" rounded="full" className="w-full px-8 text-lg sm:w-auto">
                Start a Project
              </Button>
              <Button
                url="/work"
                variant="outline"
                size="lg"
                rounded="full"
                className="w-full border-white/20 px-8 text-lg text-white hover:bg-white/10 sm:w-auto"
              >
                View Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
