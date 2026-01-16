'use client'

import type { Article } from '@/data/articles'
import Image from 'next/image'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'

interface ArticleDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  article: Article | null
}

export function ArticleDetailDialog({ open, onOpenChange, article }: ArticleDetailDialogProps) {
  if (!article) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <DialogTitle>{article.title}</DialogTitle>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
              {article.category}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={article.author.image} alt={article.author.name} fill className="object-cover" unoptimized />
              </div>
              <div>
                <div className="font-medium text-gray-900">{article.author.name}</div>
                <div className="text-xs text-gray-500">{article.author.role}</div>
              </div>
            </div>
            <div>•</div>
            <div>{article.date}</div>
            <div>•</div>
            <div>{article.readTime}</div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Excerpt</h3>
            <p className="text-sm text-gray-600">{article.excerpt}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Content</h3>
            <div className="prose prose-sm max-w-none rounded-lg bg-gray-50 p-4">
              <pre className="font-sans text-sm whitespace-pre-wrap text-gray-700">{article.content}</pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
