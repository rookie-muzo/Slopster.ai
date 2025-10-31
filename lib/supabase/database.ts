'use server'

import { createClient as createServerClient } from './server'
import { createClient as createBrowserClient } from './client'

// Projects
export async function getProjects(userId: string) {
  const supabase = await createServerClient()
  return supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export async function getProject(id: string) {
  const supabase = await createServerClient()
  return supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
}

export async function createProject(data: {
  user_id: string
  title: string
  description?: string
}) {
  const supabase = await createServerClient()
  return supabase
    .from('projects')
    .insert(data)
    .select()
    .single()
}

export async function updateProject(
  id: string,
  data: { title?: string; description?: string }
) {
  const supabase = await createServerClient()
  return supabase
    .from('projects')
    .update(data)
    .eq('id', id)
    .select()
    .single()
}

export async function deleteProject(id: string) {
  const supabase = await createServerClient()
  return supabase.from('projects').delete().eq('id', id)
}

// Scripts
export async function getScripts(projectId: string) {
  const supabase = await createServerClient()
  return supabase
    .from('scripts')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
}

export async function getScript(id: string) {
  const supabase = await createServerClient()
  return supabase
    .from('scripts')
    .select('*')
    .eq('id', id)
    .single()
}

export async function createScript(data: {
  project_id: string
  content: any
  platform: 'tiktok' | 'youtube-shorts' | 'instagram-reels'
  duration: number
  tone: 'casual' | 'professional' | 'humorous' | 'inspirational'
  cost?: number
}) {
  const supabase = await createServerClient()
  return supabase
    .from('scripts')
    .insert(data)
    .select()
    .single()
}

export async function deleteScript(id: string) {
  const supabase = await createServerClient()
  return supabase.from('scripts').delete().eq('id', id)
}

// Videos
export async function getVideos(projectId: string) {
  const supabase = await createServerClient()
  return supabase
    .from('videos')
    .select('*, jobs(*)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
}

export async function getVideo(id: string) {
  const supabase = await createServerClient()
  return supabase
    .from('videos')
    .select('*, jobs(*)')
    .eq('id', id)
    .single()
}

export async function createVideo(data: {
  project_id: string
  original_url: string
  metadata?: any
}) {
  const supabase = await createServerClient()
  return supabase
    .from('videos')
    .insert(data)
    .select()
    .single()
}

export async function updateVideo(
  id: string,
  data: {
    processed_url?: string
    status?: 'uploaded' | 'processing' | 'completed' | 'failed'
    metadata?: any
  }
) {
  const supabase = await createServerClient()
  return supabase
    .from('videos')
    .update(data)
    .eq('id', id)
    .select()
    .single()
}

export async function deleteVideo(id: string) {
  const supabase = await createServerClient()
  return supabase.from('videos').delete().eq('id', id)
}

// Jobs
export async function getJobs(videoId: string) {
  const supabase = await createServerClient()
  return supabase
    .from('jobs')
    .select('*')
    .eq('video_id', videoId)
    .order('created_at', { ascending: false })
}

export async function getJob(id: string) {
  const supabase = await createServerClient()
  return supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()
}

export async function createJob(data: { video_id: string }) {
  const supabase = await createServerClient()
  return supabase
    .from('jobs')
    .insert(data)
    .select()
    .single()
}

export async function updateJob(
  id: string,
  data: {
    status?: 'queued' | 'processing' | 'completed' | 'failed'
    progress?: number
    error?: string
    output_url?: string
  }
) {
  const supabase = await createServerClient()
  return supabase
    .from('jobs')
    .update(data)
    .eq('id', id)
    .select()
    .single()
}



