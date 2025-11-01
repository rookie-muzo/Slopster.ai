import { getUser, signOut } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen">
      {/* Global NavBar already present in RootLayout; keep dashboard simple */}
      <main>{children}</main>
    </div>
  )
}

