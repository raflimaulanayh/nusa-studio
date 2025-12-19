'use client'

import { PROJECTS } from '@/data/projects'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Heading } from '@/components/atoms/typography'
import { Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { ProjectCard } from '@/components/molecules/project-card'
import { Container } from '@/components/templates/container'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const
    }
  }
}

export const FeaturedWorks = () => {
  const displayedProjects = PROJECTS.filter((p) => p.featured).slice(0, 3)

  return (
    <section className="bg-slate-50/50 py-20 lg:py-32">
      <Container>
        <header className="mb-16 text-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants}>
              <Text size="sm" weight="semibold" variant="secondary" className="mb-4 tracking-widest uppercase">
                Featured Works
              </Text>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Heading as="h2" variant="primary" className="mb-6">
                Our Latest Projects
              </Heading>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text variant="muted" className="mx-auto max-w-2xl">
                Explore our portfolio of creative solutions that have helped brands stand out and achieve their goals.
              </Text>
            </motion.div>
          </motion.div>
        </header>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
        >
          <motion.div variants={itemVariants} className="md:col-span-2">
            <ProjectCard {...displayedProjects[0]} featured />
          </motion.div>

          {displayedProjects.slice(1, 3).map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard {...project} />
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
            url="/work"
            variant="outline"
            size="lg"
            rounded="full"
            rightIcon={<ArrowRight size={20} />}
            className="border-primary/20 text-primary hover:bg-primary hover:text-white"
          >
            View All Works
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
