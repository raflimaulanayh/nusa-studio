import React from 'react'

export const Badge = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-white/90">
      <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm"></span>
      {label}
    </div>
  )
}
