'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

import { Heading, Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

const STATS = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '', label: 'Team Members' }
]

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
}

export const AboutSection = () => {
  return (
    <section className="overflow-hidden bg-white py-20 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants}>
              <Text size="sm" weight="semibold" variant="secondary" className="mb-4 tracking-widest uppercase">
                About Us
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Heading as="h2" variant="primary" className="mb-6">
                Crafting Digital Excellence Since 2016
              </Heading>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text variant="muted" className="mb-6 leading-relaxed">
                Nusacaraka Studio adalah creative agency yang berfokus pada transformasi digital untuk brand-brand terkemuka
                di Indonesia. Kami menggabungkan kreativitas, strategi, dan teknologi untuk menciptakan pengalaman brand yang
                tak terlupakan.
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text variant="muted" className="mb-8 leading-relaxed">
                Dengan tim profesional berpengalaman dan passion yang tinggi, kami telah membantu lebih dari 50+ klien
                mencapai tujuan bisnis mereka melalui solusi kreatif yang inovatif.
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button url="/services" variant="default" size="lg" rounded="full">
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative grid grid-cols-2 gap-6">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-2xl bg-slate-50 p-6 text-center transition-all duration-300 hover:bg-primary hover:shadow-xl lg:p-8"
                >
                  <div className="mb-2 font-serif text-4xl font-semibold text-primary transition-colors group-hover:text-white lg:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <Text size="sm" variant="muted" className="transition-colors group-hover:text-white/80">
                    {stat.label}
                  </Text>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
