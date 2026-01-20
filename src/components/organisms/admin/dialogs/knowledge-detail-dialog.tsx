'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'

interface KnowledgeDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: KnowledgeDocument | null
}

export function KnowledgeDetailDialog({ open, onOpenChange, document }: KnowledgeDetailDialogProps) {
  if (!document) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <DialogTitle>{document.title}</DialogTitle>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                document.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {document.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 text-sm">
            <div>
              <div className="font-medium text-gray-700">Category</div>
              <div className="mt-1 text-gray-900">{document.category}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Views</div>
              <div className="mt-1 text-gray-900">{document.views.toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Created</div>
              <div className="mt-1 text-gray-900">{document.createdAt}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Last Updated</div>
              <div className="mt-1 text-gray-900">{document.updatedAt}</div>
            </div>
          </div>

          {document.tags.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-700">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {document.tags.map((tag, index) => (
                  <span key={index} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Content</h3>
            <div className="rounded-lg bg-gray-50 p-4">
              <pre className="font-sans text-sm whitespace-pre-wrap text-gray-700">{document.content}</pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
