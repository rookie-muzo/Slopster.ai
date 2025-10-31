'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Job {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  progress: number
  error: string | null
  output_url: string | null
}

interface JobProgressProps {
  jobId: string
  onComplete?: (outputUrl: string) => void
}

export default function JobProgress({ jobId, onComplete }: JobProgressProps) {
  const [job, setJob] = useState<Job | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // Fetch initial job status
    const fetchJob = async () => {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single()
      
      if (data) {
        setJob(data)
        if (data.status === 'completed' && data.output_url && onComplete) {
          onComplete(data.output_url)
        }
      }
    }

    fetchJob()

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`job-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'jobs',
          filter: `id=eq.${jobId}`,
        },
        (payload) => {
          const updatedJob = payload.new as Job
          setJob(updatedJob)
          
          if (updatedJob.status === 'completed' && updatedJob.output_url && onComplete) {
            onComplete(updatedJob.output_url)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [jobId, supabase, onComplete])

  if (!job) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {job.status === 'queued' && 'Queued'}
          {job.status === 'processing' && 'Processing'}
          {job.status === 'completed' && 'Completed'}
          {job.status === 'failed' && 'Failed'}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {job.progress}%
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            job.status === 'failed'
              ? 'bg-red-600'
              : job.status === 'completed'
              ? 'bg-green-600'
              : 'bg-blue-600'
          }`}
          style={{ width: `${job.progress}%` }}
        />
      </div>

      {job.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{job.error}</p>
      )}

      {job.status === 'completed' && job.output_url && (
        <a
          href={job.output_url}
          download
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Download video
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </a>
      )}
    </div>
  )
}

