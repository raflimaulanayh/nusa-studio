'use client'

import { ARTICLES_DATA } from '@/constants/article-data'
import { Eye, FileEdit, MoreVertical, Plus, Search, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/atoms/ui/dropdown-menu'
import { ArticleCreateDialog } from '@/components/organisms/admin/dialogs/article-create-dialog'
import { ArticleDetailDialog } from '@/components/organisms/admin/dialogs/article-detail-dialog'
import { ArticleEditDialog } from '@/components/organisms/admin/dialogs/article-edit-dialog'
import { DeleteArticleDialog } from '@/components/organisms/admin/dialogs/delete-article-dialog'

import { cn } from '@/utils/cn'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(ARTICLES_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const categories = Array.from(new Set(articles.map((article) => article.category)))

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleCreateArticle = (newArticle: Omit<Article, 'id'>) => {
    const id = String(articles.length + 1)
    setArticles([...articles, { ...newArticle, id }])
    toast.success('Article created successfully')
  }

  const handleEditArticle = (updatedArticle: Article) => {
    setArticles(articles.map((a) => (a.id === updatedArticle.id ? updatedArticle : a)))
    toast.success('Article updated successfully')
  }

  const handleDeleteArticle = () => {
    if (selectedArticle) {
      setArticles(articles.filter((a) => a.id !== selectedArticle.id))
      toast.success('Article deleted successfully')
    }
  }

  const openDetailDialog = (article: Article) => {
    setSelectedArticle(article)
    setDetailDialogOpen(true)
  }

  const openEditDialog = (article: Article) => {
    setSelectedArticle(article)
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (article: Article) => {
    setSelectedArticle(article)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary sm:text-3xl">Articles Management</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:mt-2">Kelola artikel yang ditampilkan di website</p>
        </div>
        <Button className="w-full gap-2 sm:w-fit" onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add New Article
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-10 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
              !selectedCategory
                ? 'border-primary bg-primary text-white shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-primary/30 hover:bg-gray-50'
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                selectedCategory === category
                  ? 'border-primary bg-primary text-white shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary/30 hover:bg-gray-50'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Total Articles</div>
          <div className="mt-1 text-2xl font-semibold text-primary">{articles.length}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Categories</div>
          <div className="mt-1 text-2xl font-semibold text-primary">{categories.length}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Filtered Results</div>
          <div className="mt-1 text-2xl font-semibold text-primary">{filteredArticles.length}</div>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {filteredArticles.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
            <p className="text-gray-500">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="relative flex flex-col rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md max-sm:pb-12 sm:flex-row"
              >
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-lg sm:w-40 sm:rounded-l-lg sm:rounded-tr-none lg:h-full">
                  <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                      {article.category}
                    </span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Published</span>
                  </div>

                  <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">{article.title}</h3>
                  <p className="mb-3 line-clamp-2 flex-1 text-sm text-gray-600">{article.excerpt}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-2 max-sm:hidden">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <Image
                          src={article.author.image}
                          alt={article.author.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span>{article.author.name}</span>
                    </div>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute right-3 bottom-3 rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900">
                      <MoreVertical className="h-5 w-5" />
                      <span className="sr-only">Actions</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openDetailDialog(article)}>
                      <Eye className="h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEditDialog(article)}>
                      <FileEdit className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteDialog(article)}
                      className="text-red-600 focus:bg-red-50 focus:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>

      <ArticleCreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} onSave={handleCreateArticle} />

      <DeleteArticleDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        articleTitle={selectedArticle?.title || ''}
        onConfirm={handleDeleteArticle}
      />

      <ArticleDetailDialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen} article={selectedArticle} />

      <ArticleEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        article={selectedArticle}
        onSave={handleEditArticle}
      />
    </div>
  )
}
