'use client'

import { PROJECTS } from '@/data/projects'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { ProjectCard } from '@/components/molecules/project-card/project-card'

// Derive unique categories from PROJECTS
const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))]

export const WorkList = () => {
  const [filter, setFilter] = useState('All')

  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <div className="space-y-12">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
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
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
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
              <ProjectCard
                {...project}
                featured={false} // Force consistent aspect ratio for grid
                className="h-full w-full"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
