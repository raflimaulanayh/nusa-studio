'use client'

import type { ContactMessage } from '@/data/mock-contacts'
import { useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { Card } from '@/components/atoms/ui/card'

import { cn } from '@/utils/cn'

const StatusBadge = ({ status }: { status: ContactMessage['status'] }) => {
  let classes = 'bg-slate-100 text-slate-700 border-slate-200'
  if (status === 'New') classes = 'bg-blue-50 text-blue-700 border-blue-200'
  if (status === 'Read') classes = 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === 'Replied') classes = 'bg-emerald-50 text-emerald-700 border-emerald-200'

  return (
    <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold', classes)}>
      {status}
    </span>
  )
}

export function MessageStatusCard({
  initialStatus,
  messageId
}: {
  initialStatus: ContactMessage['status']
  messageId: string
}) {
  const [status, setStatus] = useState<ContactMessage['status']>(initialStatus)
  const [isSaving, setIsSaving] = useState(false)

  const statuses: ContactMessage['status'][] = ['New', 'Read', 'Replied']

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSaving(false)
    // TODO: Implement actual API call to update status
    console.log('Updating message', messageId, 'to status:', status)
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
            onChange={(e) => setStatus(e.target.value as ContactMessage['status'])}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <Button loading={isSaving} onClick={handleSave} disabled={isSaving || status === initialStatus} className="w-full">
          Update Status
        </Button>
      </div>
    </Card>
  )
}
