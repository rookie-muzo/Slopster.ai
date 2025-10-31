import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export interface VideoProcessingJob {
  jobId: string
  inputKey: string
  outputKey: string
  operations: {
    trim?: { start: number; end: number }
    captions?: boolean
    transitions?: string[]
    format?: string
  }
}

export async function enqueueVideoJob(job: VideoProcessingJob) {
  const command = new SendMessageCommand({
    QueueUrl: process.env.AWS_SQS_QUEUE_URL!,
    MessageBody: JSON.stringify(job),
  })

  return sqsClient.send(command)
}

export { sqsClient }

