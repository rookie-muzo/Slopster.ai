'use client'

import { useState } from 'react'

interface ExportModalProps {
  videoUrl: string
  metadata?: {
    title?: string
    description?: string
    hashtags?: string[]
    postingTimes?: string[]
  }
  onClose: () => void
}

export default function ExportModal({ videoUrl, metadata, onClose }: ExportModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyMetadata = () => {
    const text = `
Title: ${metadata?.title || 'Untitled'}
Description: ${metadata?.description || ''}
Hashtags: ${metadata?.hashtags?.join(' ') || ''}
Best Posting Times: ${metadata?.postingTimes?.join(', ') || ''}
    `.trim()

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    window.open(videoUrl, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Export Video
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <button
              onClick={handleDownload}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download MP4
            </button>
          </div>

          {metadata && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Metadata
              </h3>
              
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                {metadata.title && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</p>
                    <p className="text-sm text-gray-900 dark:text-white">{metadata.title}</p>
                  </div>
                )}

                {metadata.description && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</p>
                    <p className="text-sm text-gray-900 dark:text-white">{metadata.description}</p>
                  </div>
                )}

                {metadata.hashtags && metadata.hashtags.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Hashtags</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {metadata.hashtags.join(' ')}
                    </p>
                  </div>
                )}

                {metadata.postingTimes && metadata.postingTimes.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Best Posting Times</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {metadata.postingTimes.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleCopyMetadata}
                className="mt-3 w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {copied ? (
                  <>
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Metadata
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

