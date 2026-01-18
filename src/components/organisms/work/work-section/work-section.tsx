'use client'

import { PROJECTS_DATA } from '@/constants/project-data'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useEffect, useState } from 'react'

import { Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { ProjectCard } from '@/components/molecules/project-card'
import { Container } from '@/components/templates/container'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS_DATA.map((p) => p.category)))]
  const [filter, setFilter] = useState('All')

  const filteredProjects = filter === 'All' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.category === filter)

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
    <section ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-20">
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
        <header ref={headerRef} className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="mb-4 inline-block rounded-full border border-primary/10 bg-primary/5 px-4 py-1">
              <Text size="sm" className="font-medium tracking-widest text-primary uppercase opacity-70">
                Portfolio
              </Text>
            </h1>
            <h2 className="mb-6 text-5xl font-semibold tracking-tight text-primary md:text-7xl">Selected Work</h2>
            <Text size="lg" className="mx-auto max-w-2xl text-foreground opacity-70">
              A collection of projects where strategy meets creativity. We build brands that stand out in the digital
              landscape.
            </Text>
          </motion.div>
        </header>

        <section className="space-y-12 text-left">
          <nav className="flex flex-wrap justify-center gap-3 md:gap-4">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? 'default' : 'outline'}
                onClick={() => setFilter(cat)}
                rounded="full"
                className="px-6 text-sm"
              >
                {cat}
              </Button>
            ))}
          </nav>

          <article className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    layout: { duration: 0.3 }
                  }}
                >
                  <ProjectCard {...project} featured={false} className="h-full w-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </article>
        </section>
      </Container>
    </section>
  )
}
