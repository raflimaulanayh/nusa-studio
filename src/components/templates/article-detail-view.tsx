'use client'

import { Article } from '@/data/articles'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import { Text } from '@/components/atoms/typography'
import { CtaSection } from '@/components/organisms/home'
import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

interface ArticleDetailViewProps {
  article: Article
}

export const ArticleDetailView = ({ article }: ArticleDetailViewProps) => {
  return (
    <GeneralLayout>
      <article className="min-h-screen bg-background pt-32 pb-20">
        <header className="relative mb-16">
          <Container>
            <Link
              href="/articles"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Insights
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="mb-6 flex items-center gap-4 text-sm font-medium text-primary">
                <span className="rounded-full bg-primary/5 px-3 py-1 text-xs tracking-wider uppercase">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 font-normal text-muted-foreground">
                  <Clock className="h-4 w-4" /> {article.readTime}
                </span>
              </div>

              <h1 className="mb-8 max-w-4xl text-4xl leading-tight font-semibold text-primary md:text-5xl lg:text-6xl">
                {article.title}
              </h1>

              <div className="mb-12 flex items-center gap-6 border-y border-primary/10 py-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={article.author.image} alt={article.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary">{article.author.name}</div>
                    <div className="text-xs text-muted-foreground">{article.author.role}</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-primary/10" />
                <div className="flex flex-col text-sm">
                  <span className="text-muted-foreground">Published</span>
                  <span className="font-medium text-primary">{article.date}</span>
                </div>
              </div>
            </motion.div>
          </Container>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[50vh] w-full overflow-hidden md:h-[70vh]"
          >
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-primary/10" />
          </motion.div>
        </header>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl"
          >
            <div className="prose prose-lg md:prose-xl prose-headings:font-semibold prose-headings:text-primary prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-primary prose-a:text-primary prose-a:underline-offset-4 prose-img:rounded-2xl prose-blockquote:border-l-primary prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-lg prose-blockquote:font-medium prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-hr:border-primary/10">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </motion.div>

          <footer className="mx-auto mt-20 max-w-3xl border-t border-primary/10 pt-10 text-center">
            <Text className="text-muted-foreground italic">Thanks for reading. Check out more insights below.</Text>
            <div className="mt-8">
              <Link href="/articles">
                <button className="rounded-full border border-primary/20 px-8 py-3 font-medium text-primary transition-all hover:bg-primary hover:text-white">
                  Read More Articles
                </button>
              </Link>
            </div>
          </footer>
        </Container>
      </article>
      <CtaSection />
    </GeneralLayout>
  )
}
