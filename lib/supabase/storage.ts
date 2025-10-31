import { createClient } from './client'

export async function uploadFile(bucket: string, path: string, file: File) {
  const supabase = createClient()
  return supabase.storage.from(bucket).upload(path, file)
}

export function getPublicUrl(bucket: string, path: string) {
  const supabase = createClient()
  return supabase.storage.from(bucket).getPublicUrl(path)
}

export async function deleteFile(bucket: string, path: string) {
  const supabase = createClient()
  return supabase.storage.from(bucket).remove([path])
}

