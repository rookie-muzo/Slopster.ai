import * as React from 'react'
import { clsx } from 'clsx'

export function Progress({ value, className }: { value: number; className?: string }) {
  const width = Math.max(0, Math.min(100, value))
  return (
    <div className={clsx('h-2 w-full rounded-full bg-[#1a1b1e]', className)}>
      <div className="h-2 rounded-full bg-foreground transition-all" style={{ width: `${width}%` }} />
    </div>
  )
}


