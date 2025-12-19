'use client'

import { motion } from 'framer-motion'
import { Camera, Palette, Globe, Megaphone, ArrowUpRight } from 'lucide-react'

import { Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

const SERVICES = [
  {
    icon: Camera,
    title: 'Product Photography',
    description: 'Stunning product visuals that captivate your audience and drive conversions.',
    index: '01'
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Complete branding solutions from logo design to brand guidelines.',
    index: '02'
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies.',
    index: '03'
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic campaigns that amplify your brand reach and engage effectively.',
    index: '04'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
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

export const ServicesSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-[100px]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <Container className="relative z-10">
        <header className="mb-20 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants}>
              <Text size="sm" weight="semibold" className="mb-6 tracking-widest text-secondary uppercase">
                Our Expertise
              </Text>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h2 className="mb-6 font-serif text-5xl font-medium tracking-tight text-primary md:text-6xl">
                What We Do Best
              </h2>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text variant="muted" className="mx-auto max-w-2xl text-lg opacity-70">
                Comprehensive creative solutions designed to elevate your brand in the digital landscape.
              </Text>
            </motion.div>
          </motion.div>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={itemVariants} className="group h-full">
              <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 hover:border-primary hover:bg-primary">
                <div className="absolute top-0 right-0 translate-x-4 transform p-8 opacity-0 transition-opacity duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-8 w-8 text-secondary" />
                </div>

                <div className="mb-8">
                  <span className="mb-6 block font-serif text-4xl font-medium text-slate-300 transition-colors duration-500 group-hover:text-white/60">
                    {service.index}
                  </span>

                  <div className="mb-6">
                    <service.icon
                      strokeWidth={1.5}
                      className="h-10 w-10 text-primary transition-colors duration-500 group-hover:text-secondary"
                    />
                  </div>

                  <h3 className="mb-4 font-serif text-2xl font-medium text-primary transition-colors duration-500 group-hover:text-white">
                    {service.title}
                  </h3>

                  <p className="leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/70">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto h-px w-full bg-slate-100 transition-colors duration-500 group-hover:bg-white/10" />
              </article>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            url="/services"
            variant="outline"
            size="lg"
            rounded="full"
            className="h-14 border-primary/20 px-8 text-base text-primary hover:bg-primary hover:text-white"
          >
            Explore All Services
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
