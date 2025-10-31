'use client'

import { createClient } from './client'

/**
 * Subscribe to real-time job updates
 * Use this in client components to listen for job progress changes
 * 
 * @example
 * ```tsx
 * 'use client'
 * 
 * import { subscribeToJob } from '@/lib/supabase/realtime'
 * 
 * function JobProgress({ jobId }: { jobId: string }) {
 *   const [job, setJob] = useState(null)
 * 
 *   useEffect(() => {
 *     const unsubscribe = subscribeToJob(jobId, (updatedJob) => {
 *       setJob(updatedJob)
 *     })
 *     return unsubscribe
 *   }, [jobId])
 * 
 *   return <div>Progress: {job?.progress}%</div>
 * }
 * ```
 */
export function subscribeToJob(jobId: string, callback: (job: any) => void) {
  const supabase = createClient()
  
  const channel = supabase
    .channel(`job:${jobId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'jobs',
        filter: `id=eq.${jobId}`,
      },
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

/**
 * Subscribe to all jobs for a specific video
 */
export function subscribeToVideoJobs(videoId: string, callback: (job: any) => void) {
  const supabase = createClient()
  
  const channel = supabase
    .channel(`video-jobs:${videoId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'jobs',
        filter: `video_id=eq.${videoId}`,
      },
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

