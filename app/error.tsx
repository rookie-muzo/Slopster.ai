"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container>
      <div className="py-24 text-center">
        <h1 className="text-4xl font-medium">Something broke</h1>
        <p className="mt-3 text-muted">We spilled some slop. Refresh or head home.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => reset()} className="rounded-xl bg-foreground px-4 py-2 text-background">Try again</button>
          <Link href="/" className="rounded-xl px-4 py-2 hairline">Home</Link>
        </div>
      </div>
    </Container>
  )
}


