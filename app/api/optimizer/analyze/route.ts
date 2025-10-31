import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/supabase/auth'
import { analyzeVirality } from '@/lib/openai'
import { z } from 'zod'

const analyzeSchema = z.object({
  script: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { script } = analyzeSchema.parse(body)

    // Analyze script with OpenAI
    const analysis = await analyzeVirality(script)

    if (!analysis) {
      return NextResponse.json(
        { error: 'Failed to analyze script' },
        { status: 500 }
      )
    }

    return NextResponse.json(analysis)
  } catch (error: any) {
    console.error('Virality analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

