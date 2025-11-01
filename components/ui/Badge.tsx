import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const badgeVariants = cva('inline-flex items-center rounded-full px-2 py-0.5 text-xs', {
  variants: {
    variant: {
      subtle: 'hairline text-foreground',
      muted: 'bg-[#0f1012] text-muted',
    },
  },
  defaultVariants: { variant: 'subtle' },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={clsx(badgeVariants({ variant }), className)} {...props} />
}


