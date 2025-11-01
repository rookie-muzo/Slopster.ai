import { Container } from '@/components/ui/Container'

export default function AboutPage() {
  return (
    <Container>
      <div className="py-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-medium mb-6">About Slopster</h1>
        <p className="text-lg text-muted mb-6">
          We make creative tools for the beautiful mess of the internet. Slopster turns raw takes
          into watchable shorts — fast, clean, and a tiny bit irreverent.
        </p>
        <p className="text-muted">
          Built by a small team that loves shipping, not polishing. Expect speed, clarity, and the
          occasional wink. If that sounds like you, you’re in the right place.
        </p>
      </div>
    </Container>
  )
}


