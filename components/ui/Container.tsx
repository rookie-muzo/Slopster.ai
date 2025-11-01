import * as React from 'react'
import { clsx } from 'clsx'

// Shared container to keep gutters/width consistent across header and sections.
export function Container({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx('mx-auto w-full max-w-[1280px] md:max-w-[1440px] px-4 md:px-8 lg:px-12', className)}>
      {children}
    </div>
  )
}


