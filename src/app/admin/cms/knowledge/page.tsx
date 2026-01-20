'use client'

import { KNOWLEDGE_DOCUMENTS } from '@/constants/chatbot-data'
import { Eye, FileEdit, MoreVertical, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/atoms/ui/dropdown-menu'
import { DeleteKnowledgeDialog } from '@/components/organisms/admin/dialogs/delete-knowledge-dialog'
import { KnowledgeCreateDialog } from '@/components/organisms/admin/dialogs/knowledge-create-dialog'
import { KnowledgeDetailDialog } from '@/components/organisms/admin/dialogs/knowledge-detail-dialog'
import { KnowledgeEditDialog } from '@/components/organisms/admin/dialogs/knowledge-edit-dialog'

import { cn } from '@/utils/cn'

export default function KnowledgeBasePage() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(KNOWLEDGE_DOCUMENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const [selectedDocument, setSelectedDocument] = useState<KnowledgeDocument | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const categories = Array.from(new Set(documents.map((doc) => doc.category)))

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = !selectedCategory || doc.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const stats = {
    total: documents.length,
    active: documents.filter((d) => d.status === 'active').length,
    inactive: documents.filter((d) => d.status === 'inactive').length
  }

  const handleCreateDocument = (newDoc: Omit<KnowledgeDocument, 'id'>) => {
    const id = String(documents.length + 1)
    setDocuments([...documents, { ...newDoc, id }])
    toast.success('Knowledge document created successfully')
  }

  const handleEditDocument = (updatedDoc: KnowledgeDocument) => {
    setDocuments(documents.map((d) => (d.id === updatedDoc.id ? updatedDoc : d)))
    toast.success('Knowledge document updated successfully')
  }

  const handleDeleteDocument = () => {
    if (selectedDocument) {
      setDocuments(documents.filter((d) => d.id !== selectedDocument.id))
      toast.success('Knowledge document deleted successfully')
    }
  }

  const handleToggleStatus = (doc: KnowledgeDocument) => {
    const newStatus: 'active' | 'inactive' = doc.status === 'active' ? 'inactive' : 'active'
    const updatedDoc = { ...doc, status: newStatus }
    handleEditDocument(updatedDoc)
    toast.success(`Document ${newStatus === 'active' ? 'activated' : 'deactivated'}`)
  }

  const openDetailDialog = (doc: KnowledgeDocument) => {
    setSelectedDocument(doc)
    setDetailDialogOpen(true)
  }

  const openEditDialog = (doc: KnowledgeDocument) => {
    setSelectedDocument(doc)
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (doc: KnowledgeDocument) => {
    setSelectedDocument(doc)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary sm:text-3xl">Knowledge Base</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:mt-2">Kelola knowledge base untuk chatbot AI</p>
        </div>
        <Button className="w-full gap-2 sm:w-fit" onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add New Document
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, content, or tags..."
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

      <div className="mb-6 flex gap-2">
        {(['all', 'active', 'inactive'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-all',
              selectedStatus === status
                ? 'border-secondary bg-secondary text-white shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-secondary/30 hover:bg-gray-50'
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Total Documents</div>
          <div className="mt-1 text-2xl font-semibold text-primary">{stats.total}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Active</div>
          <div className="mt-1 text-2xl font-semibold text-green-600">{stats.active}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Inactive</div>
          <div className="mt-1 text-2xl font-semibold text-gray-600">{stats.inactive}</div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {filteredDocuments.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
            <p className="text-gray-500">No documents found</p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="relative flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      doc.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {doc.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">{doc.category}</span>
                  {doc.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-primary">
                            #{tag}
                          </span>
                        ))}
                        {doc.tags.length > 3 && <span className="text-gray-400">+{doc.tags.length - 3}</span>}
                      </div>
                    </>
                  )}
                </div>

                <p className="mb-3 line-clamp-2 text-sm text-gray-600">{doc.content}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>Updated: {doc.updatedAt}</span>
                  <span>•</span>
                  <span>Views: {doc.views.toLocaleString()}</span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="absolute top-3 right-3 rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 sm:static">
                    <MoreVertical className="h-5 w-5" />
                    <span className="sr-only">Actions</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openDetailDialog(doc)}>
                    <Eye className="h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openEditDialog(doc)}>
                    <FileEdit className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleStatus(doc)}>
                    <FileEdit className="h-4 w-4" />
                    {doc.status === 'active' ? 'Deactivate' : 'Activate'}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openDeleteDialog(doc)}
                    className="text-red-600 focus:bg-red-50 focus:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>

      <KnowledgeCreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} onSave={handleCreateDocument} />

      <DeleteKnowledgeDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        documentTitle={selectedDocument?.title || ''}
        onConfirm={handleDeleteDocument}
      />

      <KnowledgeDetailDialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen} document={selectedDocument} />

      <KnowledgeEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        document={selectedDocument}
        onSave={handleEditDocument}
      />
    </div>
  )
}
