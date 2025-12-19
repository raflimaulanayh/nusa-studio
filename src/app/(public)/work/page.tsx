'use client'

import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useEffect } from 'react'

import { Text } from '@/components/atoms/typography'
import { CtaSection } from '@/components/organisms/home'
import { WorkList } from '@/components/organisms/work/work-list'
import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: -50,
        opacity: 0.5,
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
    <GeneralLayout>
      <div ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-20">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }}
          />
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[150px]" />
        </div>

        <Container className="relative z-10 text-center">
          {/* Header */}
          <header ref={headerRef} className="mb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="mb-4 inline-block rounded-full border border-primary/10 bg-primary/5 px-4 py-1">
                <Text size="sm" className="font-medium tracking-widest text-primary uppercase opacity-70">
                  Portfolio
                </Text>
              </span>
              <h1 className="mb-6 text-5xl font-semibold tracking-tight text-primary md:text-7xl">Selected Work</h1>
              <Text size="lg" className="mx-auto max-w-2xl text-foreground opacity-70">
                A collection of projects where strategy meets creativity. We build brands that stand out in the digital
                landscape.
              </Text>
            </motion.div>
          </header>

          {/* Work List */}
          <div className="text-left">
            <WorkList />
          </div>
        </Container>
      </div>
      <CtaSection />
    </GeneralLayout>
  )
}
