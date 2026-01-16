'use client'

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/atoms/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/atoms/ui/dialog'

interface DeleteArticleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  articleTitle: string
  onConfirm: () => void
}

export function DeleteArticleDialog({ open, onOpenChange, articleTitle, onConfirm }: DeleteArticleDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center">Delete Article?</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete <span className="font-medium text-gray-900">{articleTitle}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="outline-red" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
