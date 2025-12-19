'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/utils/cn'

interface ProjectCardProps {
  image: string
  title: string
  category: string
  slug: string
  client?: string
  year?: string
  featured?: boolean
  className?: string
}

export const ProjectCard = ({
  image,
  title,
  category,
  slug,
  client,
  year,
  featured = false,
  className
}: ProjectCardProps) => {
  return (
    <Link href={`/work/${slug}`} className={cn('group block select-none', className)}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full"
      >
        <div
          className={cn(
            'relative mb-4 overflow-hidden rounded-xl bg-gray-100',
            featured ? 'aspect-[16/9] md:aspect-[2/1]' : 'aspect-[4/3]'
          )}
        >
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
          <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="rounded-full bg-white/90 p-2 text-black shadow-lg backdrop-blur-sm">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {category} {year && `— ${year}`}
            </span>
          </div>

          <h3 className="line-clamp-1 font-serif text-xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
            {title}
          </h3>

          {client && <p className="line-clamp-1 text-sm text-muted-foreground">{client}</p>}
        </div>
      </motion.article>
    </Link>
  )
}
