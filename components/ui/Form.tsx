import * as React from 'react'
import { clsx } from 'clsx'

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={clsx('block text-sm text-muted', className)} {...props} />
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'w-full rounded-xl bg-[#0e0f11] text-foreground placeholder-muted hairline px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring',
        className
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        'w-full rounded-xl bg-[#0e0f11] text-foreground placeholder-muted hairline px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring',
        className
      )}
      {...props}
    />
  )
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={clsx(
        'w-full rounded-xl bg-[#0e0f11] text-foreground hairline px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}


