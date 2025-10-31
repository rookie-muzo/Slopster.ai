# Video Processor Lambda Function

AWS Lambda function that processes videos using FFmpeg.

## Setup

1. Install dependencies:
```bash
cd aws/lambda/video-processor
npm install
```

2. Create FFmpeg layer:
   - Download FFmpeg binary for Amazon Linux 2
   - Create layer zip: `layers/ffmpeg-layer.zip` with structure:
     ```
     bin/
       ffmpeg
       ffprobe
     ```

3. Deploy to AWS Lambda:
   - Runtime: Node.js 20.x
   - Memory: 3GB (for 1080p video processing)
   - Timeout: 15 minutes (900 seconds)
   - Attach FFmpeg layer
   - Configure environment variables:
     - `AWS_REGION`
     - `S3_BUCKET`
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_KEY`

4. Add SQS trigger:
   - Connect to your `video-processing-queue`
   - Batch size: 1
   - Maximum batching window: 0 seconds

## Environment Variables

- `AWS_REGION`: AWS region (e.g., us-east-1)
- `S3_BUCKET`: S3 bucket name for video storage
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_SERVICE_KEY`: Supabase service role key (for updating job status)

## Operations Supported

- **Trim**: Cut video to specific start/end timestamps
- **Captions**: Add hardcoded text overlays (Whisper integration post-MVP)
- **Transitions**: Fade in/out effects
- **Format**: Convert to 9:16 aspect ratio for social media
- **Audio normalization**: Normalize audio levels

## Testing Locally

Use AWS SAM or Docker to test locally:

```bash
# With SAM
sam local invoke VideoProcessor -e event.json

# With Docker
docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs20.x index.handler < event.json
```

