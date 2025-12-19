'use client'

import { type Article } from '@/data/articles'
import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar } from 'lucide-react'
import Link from 'next/link'

import { Text } from '@/components/atoms/typography'

interface ArticleCardProps {
  article: Article
  index: number
}

export const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex h-full flex-col"
    >
      {/* Image */}
      <Link href={`/articles/${article.slug}`} className="mb-6 block overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur-sm">
            {article.category}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-grow flex-col">
        <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {article.date}
          </span>
          <span className="h-1 w-1 rounded-full bg-primary/20" />
          <span>{article.readTime}</span>
        </div>

        <Link href={`/articles/${article.slug}`} className="mb-3 block">
          <h3 className="text-xl leading-tight font-semibold text-primary transition-colors group-hover:text-secondary md:text-2xl">
            {article.title}
          </h3>
        </Link>

        <Text className="mb-6 line-clamp-3 flex-grow text-muted-foreground">{article.excerpt}</Text>

        <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-6">
          <div className="flex items-center gap-2">
            <img src={article.author.image} alt={article.author.name} className="h-8 w-8 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-primary">{article.author.name}</span>
              <span className="text-[10px] text-muted-foreground">{article.author.role}</span>
            </div>
          </div>

          <Link
            href={`/articles/${article.slug}`}
            className="flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-secondary"
          >
            Read <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
