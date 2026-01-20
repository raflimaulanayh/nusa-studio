import { ARTICLES_DATA } from '@/constants/article-data'
import { notFound } from 'next/navigation'

import { ArticleDetail } from '@/components/organisms/article'

export const metadata = {
  title: 'Detail Article',
  description: 'Detail Article'
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const article = ARTICLES_DATA.find((a) => a.slug === resolvedParams.slug)

  if (!article) {
    notFound()
  }

  return <ArticleDetail article={article} />
}

export async function generateStaticParams() {
  return ARTICLES_DATA.map((article) => ({
    slug: article.slug
  }))
}
