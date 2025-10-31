import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Slopster.ai - AI-Powered Video Editor',
  description: 'Turn raw ideas into viral social videos with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

