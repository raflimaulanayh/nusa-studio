'use client'

import { ARTICLES } from '@/data/articles'
import { motion } from 'framer-motion'

import { Text } from '@/components/atoms/typography'
import { ArticleCard } from '@/components/molecules/article-card'
import { CtaSection } from '@/components/organisms/home'
import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

export default function ArticlesPage() {
  return (
    <GeneralLayout>
      <div className="min-h-screen bg-background pt-32 pb-20">
        <Container>
          {/* Header */}
          <div className="mb-20 md:mb-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="mb-8 text-5xl font-semibold tracking-tight text-primary md:text-8xl">Insights</h1>
              <Text size="lg" className="max-w-xl text-foreground opacity-70">
                Thoughts, trends, and strategies from our team. We share what we learn as we build the future.
              </Text>
            </motion.div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </Container>
      </div>
      <CtaSection />
    </GeneralLayout>
  )
}
