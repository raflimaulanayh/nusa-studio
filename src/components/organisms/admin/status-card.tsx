'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { useBookings } from '@/hooks/useBookings'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'

import { cn } from '@/utils/cn'

type Status = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled'

const StatusBadge = ({ status }: { status: string }) => {
  let classes = 'bg-slate-100 text-slate-700 border-slate-200'
  if (status === 'New') classes = 'bg-blue-50 text-blue-700 border-blue-200'
  if (status === 'Contacted') classes = 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === 'In Progress') classes = 'bg-purple-50 text-purple-700 border-purple-200'
  if (status === 'Completed') classes = 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (status === 'Cancelled') classes = 'bg-red-50 text-red-700 border-red-200'

  return (
    <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold', classes)}>
      {status}
    </span>
  )
}

export const StatusCard = ({ initialStatus, rowIndex }: { initialStatus: string; rowIndex: number }) => {
  const [status, setStatus] = useState<Status>(initialStatus as Status)
  const [isSaving, setIsSaving] = useState(false)
  const { updateStatus } = useBookings()

  const statuses: Status[] = ['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled']

  const handleSave = async () => {
    if (status === initialStatus) return

    setIsSaving(true)

    try {
      await updateStatus(rowIndex, status)
      toast.success('Status updated successfully')
    } catch {
      toast.error('Failed to update status')
      setStatus(initialStatus as Status)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="border-slate-200 p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Status</div>
          <StatusBadge status={status} />
        </div>

        <div>
          <label htmlFor="status-select" className="mb-2 block text-sm font-medium text-slate-700">
            Update Status
          </label>
          <select
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            disabled={isSaving}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <Button loading={isSaving} onClick={handleSave} disabled={isSaving || status === initialStatus} className="w-full">
          {isSaving ? 'Updating...' : 'Update Status'}
        </Button>
      </div>
    </Card>
  )
}
