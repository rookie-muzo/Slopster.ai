import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function PricingPage() {
  return (
    <Container>
      <div className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-medium">Pricing that respects your time</h1>
          <p className="mt-3 text-muted">Start free. Scale when your audience does.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted">
                <li>• 3 projects</li>
                <li>• Script generation</li>
                <li>• Basic uploads</li>
              </ul>
              <Button className="mt-6 w-full" variant="subtle">Start free</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Unlimited projects</li>
                <li>• Auto edit + captions</li>
                <li>• Optimizer</li>
              </ul>
              <Button className="mt-6 w-full">Get started</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Collaboration</li>
                <li>• Priority processing</li>
                <li>• Admin tools</li>
              </ul>
              <Button className="mt-6 w-full" variant="subtle">Contact us</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}


