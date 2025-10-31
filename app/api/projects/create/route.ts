import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/supabase/auth'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function POST() {
  const user = await getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      title: `New Project ${new Date().toLocaleDateString()}`,
      description: null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  redirect(`/projects/${project.id}`)
}

