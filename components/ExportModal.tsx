'use client'

import { useState } from 'react'
import { Button } from './ui/Button'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="surface hairline rounded-2xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-medium">Export video</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <Button onClick={handleDownload} className="w-full">Download MP4</Button>
          </div>

          {metadata && (
            <div className="pt-4 border-t border-[#1f1f22]">
              <h3 className="text-lg font-medium mb-3">Metadata</h3>
              <div className="space-y-3 p-4 rounded-xl hairline">
                {metadata.title && (
                  <div>
                    <p className="text-xs text-muted uppercase">Title</p>
                    <p className="text-sm">{metadata.title}</p>
                  </div>
                )}
                {metadata.description && (
                  <div>
                    <p className="text-xs text-muted uppercase">Description</p>
                    <p className="text-sm">{metadata.description}</p>
                  </div>
                )}
                {metadata.hashtags && metadata.hashtags.length > 0 && (
                  <div>
                    <p className="text-xs text-muted uppercase">Hashtags</p>
                    <p className="text-sm">{metadata.hashtags.join(' ')}</p>
                  </div>
                )}
                {metadata.postingTimes && metadata.postingTimes.length > 0 && (
                  <div>
                    <p className="text-xs text-muted uppercase">Best Posting Times</p>
                    <p className="text-sm">{metadata.postingTimes.join(', ')}</p>
                  </div>
                )}
              </div>

              <Button onClick={handleCopyMetadata} className="mt-3 w-full" variant="subtle">
                {copied ? 'Copied' : 'Copy metadata'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

