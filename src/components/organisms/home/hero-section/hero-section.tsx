'use client'

import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { useRef, useEffect } from 'react'

import { Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headlineRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-32 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-secondary/5 blur-[150px]" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <Text size="sm" className="font-medium tracking-[0.2em] text-primary uppercase opacity-60">
            Digital Experience Platform
          </Text>
        </motion.div>

        <div ref={headlineRef} className="relative mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-serif text-5xl leading-[0.9] font-medium tracking-tighter text-primary md:text-7xl lg:text-8xl"
          >
            Make Your Brand <br className="hidden md:block" />
            <span className="italic">Unforgettable</span>
          </motion.h1>
        </div>

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mb-12 max-w-2xl"
          >
            <Text size="lg" className="text-lg leading-relaxed font-light text-foreground opacity-70 md:text-xl">
              Transform your digital presence with creative solutions that captivate. We craft experiences that leave lasting
              impressions.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center gap-3 lg:gap-4"
          >
            <Button size="lg" variant="default" rounded="full">
              Start Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" rounded="full">
              View Our Work
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
