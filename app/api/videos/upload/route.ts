import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/supabase/auth'
import { generateUploadUrl } from '@/lib/aws/s3'
import { z } from 'zod'

const uploadSchema = z.object({
  projectId: z.string().uuid(),
  fileName: z.string(),
  contentType: z.string(),
  fileSize: z.number(),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { projectId, fileName, contentType, fileSize } = uploadSchema.parse(body)

    // Validate file size (max 2GB for MVP)
    if (fileSize > 2 * 1024 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 2GB.' },
        { status: 400 }
      )
    }

    // Generate S3 key
    const timestamp = Date.now()
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const key = `uploads/${user.id}/${projectId}/${timestamp}-${sanitizedFileName}`

    // Generate pre-signed URL
    const uploadUrl = await generateUploadUrl(key, contentType)

    return NextResponse.json({
      uploadUrl,
      key,
    })
  } catch (error: any) {
    console.error('Upload URL generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

