import { ARTICLES } from '@/data/articles'
import { notFound } from 'next/navigation'
import React from 'react'

import { ArticleDetailView } from '@/components/templates/article-detail-view'

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const article = ARTICLES.find((a) => a.slug === resolvedParams.slug)

  if (!article) {
    notFound()
  }

  return <ArticleDetailView article={article} />
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug
  }))
}
