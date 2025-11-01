"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FullLogo from '../slopsterlogo.webp'
import IconLogo from '../slopOtransparent.webp'

// Simple top navigation with generous spacing and minimal chrome.
export default function NavBar() {
  const pathname = usePathname()
  const linkBase = 'text-sm text-muted hover:text-foreground transition-colors'

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      {/* Full-bleed header; nav is absolutely centered to viewport */}
      <div className="relative flex h-16 w-full items-center justify-between px-3 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Slopster home">
          {/* Full wordmark on md+, icon on small screens */}
          <Image src={IconLogo} alt="Slopster icon" className="h-6 w-auto md:hidden" priority />
          <Image src={FullLogo} alt="Slopster" className="h-6 w-auto hidden md:block" priority />
          <span className="sr-only">Slopster</span>
        </Link>

        <nav className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex items-center gap-8">
          <Link href="/" className={linkBase + (pathname === '/' ? ' text-foreground' : '')}>Home</Link>
          <Link href="/dashboard" className={linkBase}>Tools</Link>
          <Link href="/pricing" className={linkBase}>Pricing</Link>
          <Link href="/about" className={linkBase}>About</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden md:inline-flex h-10 items-center rounded-xl px-4 text-sm text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-10 items-center rounded-xl bg-foreground px-4 text-sm text-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}


