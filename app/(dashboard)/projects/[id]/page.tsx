import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import ScriptGenerator from '@/components/ScriptGenerator'
import VideoUploader from '@/components/VideoUploader'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const user = await getUser()
  if (!user) redirect('/login')

  const supabase = await createClient()

  // Fetch project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!project) {
    notFound()
  }

  // Fetch scripts
  const { data: scripts } = await supabase
    .from('scripts')
    .select('*')
    .eq('project_id', params.id)
    .order('created_at', { ascending: false })

  // Fetch videos
  const { data: videos } = await supabase
    .from('videos')
    .select('*, jobs(*)')
    .eq('project_id', params.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {project.title}
        </h1>
        {project.description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Script Generator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Generate Script
          </h2>
          <ScriptGenerator projectId={params.id} />

          {scripts && scripts.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Generated Scripts
              </h3>
              {scripts.map((script) => (
                <div
                  key={script.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {script.platform} • {script.duration}s • {script.tone}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ${script.cost.toFixed(4)}
                    </span>
                  </div>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(script.content, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Uploader */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Upload Video
          </h2>
          <VideoUploader projectId={params.id} />

          {videos && videos.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Uploaded Videos
              </h3>
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Video {video.id.slice(0, 8)}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        video.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : video.status === 'processing'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : video.status === 'failed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                      }`}
                    >
                      {video.status}
                    </span>
                  </div>
                  {video.jobs && video.jobs.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Progress: {video.jobs[0].progress}%
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${video.jobs[0].progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

