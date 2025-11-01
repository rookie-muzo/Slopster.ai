import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container>
      <div className="py-24 text-center">
        <h1 className="text-6xl font-medium">404</h1>
        <p className="mt-3 text-muted">This page took a wrong turn. Happens to the best of us.</p>
        <Link href="/" className="inline-block mt-6 rounded-xl bg-foreground px-4 py-2 text-background">Back home</Link>
      </div>
    </Container>
  )
}


