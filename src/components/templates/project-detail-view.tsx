'use client'

import { Project } from '@/data/projects'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

interface ProjectDetailViewProps {
  project: Project
  nextProject: Project
}

export const ProjectDetailView = ({ project, nextProject }: ProjectDetailViewProps) => {
  return (
    <article className="min-h-screen bg-background">
      <header className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
        <Image src={project.image} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <Container className="relative flex h-full flex-col justify-end pb-12 md:pb-24">
          <motion.div initial="initial" animate="animate" variants={fadeIn} className="max-w-4xl">
            <Link
              href="/work"
              className="mb-6 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium tracking-wide uppercase">Back to Work</span>
            </Link>

            <h1 className="mb-4 text-4xl leading-tight font-semibold text-white md:text-6xl lg:text-7xl">{project.title}</h1>

            <div className="flex flex-wrap gap-4 text-lg font-medium text-white/90">
              <span>{project.category}</span>
              <span className="opacity-50">•</span>
              <span>{project.year}</span>
              <span className="opacity-50">•</span>
              <span>{project.client}</span>
            </div>
          </motion.div>
        </Container>
      </header>

      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-16 lg:col-span-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-primary">Overview</h2>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{project.description}</p>
            </motion.section>

            <div className="grid gap-12 md:grid-cols-2">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-foreground">The Challenge</h3>
                <p className="leading-relaxed text-muted-foreground">{project.challenge}</p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-foreground">The Solution</h3>
                <p className="leading-relaxed text-muted-foreground">{project.solution}</p>
              </motion.section>
            </div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-xl font-semibold text-foreground">Project Gallery</h3>
              <div className="grid gap-8">
                {project.gallery?.map((img, idx) => (
                  <div key={idx} className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
                    <Image
                      src={img}
                      alt={`${project.title} gallery image ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <aside className="h-fit space-y-12 lg:sticky lg:top-24 lg:col-span-4">
            <div className="space-y-8 rounded-2xl border border-secondary/10 bg-secondary/5 p-8">
              <div>
                <h4 className="mb-4 text-sm font-semibold tracking-widest text-foreground uppercase">Client</h4>
                <p className="text-lg text-muted-foreground">{project.client}</p>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold tracking-widest text-foreground uppercase">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border bg-white px-3 py-1 text-sm text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold tracking-widest text-foreground uppercase">Year</h4>
                <p className="text-lg text-muted-foreground">{project.year}</p>
              </div>
            </div>

            <div className="space-y-6 rounded-2xl bg-primary p-8 text-center text-white">
              <h3 className="text-2xl font-semibold">Ready to start your project?</h3>
              <p className="text-white/80">Let&apos;s create something amazing together.</p>
              <Button className="w-full bg-white text-primary hover:bg-gray-100" url="/contact">
                Start a Project
              </Button>
            </div>
          </aside>
        </div>
      </Container>

      <section className="mt-24 border-t border-border">
        <Container>
          <div className="py-24 text-center">
            <p className="mb-4 text-sm tracking-widest text-muted-foreground uppercase">Next Project</p>
            <Link href={`/work/${nextProject.slug}`} className="group inline-flex flex-col items-center">
              <h2 className="mb-4 text-4xl font-semibold transition-colors group-hover:text-primary md:text-6xl">
                {nextProject.title}
              </h2>
              <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground transition-transform group-hover:translate-x-2">
                View Case Study <ArrowUpRight size={20} />
              </div>
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
