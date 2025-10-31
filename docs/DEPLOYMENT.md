# Deployment Guide

Complete deployment guide for Slopster.ai to production.

## Prerequisites

- [ ] Supabase project created
- [ ] AWS infrastructure set up (see AWS_SETUP.md)
- [ ] OpenAI API key obtained
- [ ] Vercel account created
- [ ] GitHub repository

## Step 1: Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Run the database migration:
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

Or manually run the SQL in `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor.

3. Enable Google OAuth:
   - Go to Authentication → Providers
   - Enable Google
   - Add your Google OAuth credentials
   - Add authorized redirect URLs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://your-domain.vercel.app/auth/callback` (production)

4. Enable Realtime for the `jobs` table:
   - Go to Database → Replication
   - Enable replication for `jobs` table

5. Get your credentials:
   - Project URL: `https://your-project.supabase.co`
   - Anon/Public Key: In Settings → API
   - Service Role Key: In Settings → API (keep secret!)

## Step 2: Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=slopster-videos-dev
AWS_SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/your-account/video-processing-queue
```

## Step 3: Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

4. Test the flow:
   - Sign up with email or Google
   - Create a project
   - Generate a script
   - Upload a video (for MVP, use small test videos <100MB)
   - Monitor processing in the UI

## Step 4: Deploy to Vercel

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/slopster-ai.git
git push -u origin main
```

2. Import project to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Next.js
     - Build Command: `next build`
     - Output Directory: `.next`

3. Add environment variables in Vercel:
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Update `NEXT_PUBLIC_SITE_URL` to your Vercel domain

4. Deploy:
   - Click "Deploy"
   - Wait for deployment to complete

## Step 5: Post-Deployment Setup

1. Update Supabase redirect URLs:
   - Add `https://your-domain.vercel.app/auth/callback`

2. Update Google OAuth:
   - Add Vercel domain to authorized origins
   - Add callback URL to authorized redirect URIs

3. Test production deployment:
   - Visit your Vercel URL
   - Test authentication
   - Test script generation
   - Test video upload (use small test video)

## Step 6: Custom Domain (Optional)

1. Add custom domain in Vercel:
   - Go to Settings → Domains
   - Add your domain
   - Update DNS records as instructed

2. Update environment variables:
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain

3. Update OAuth redirect URLs:
   - Supabase: Add custom domain callback
   - Google: Add custom domain to authorized URIs

## Step 7: Monitoring & Analytics

1. **Vercel Analytics**:
   - Enable in Project Settings → Analytics
   - Monitor performance and errors

2. **Supabase Logs**:
   - Monitor database queries in Logs section
   - Set up log retention

3. **AWS CloudWatch**:
   - Monitor Lambda executions
   - Set up alarms for failures
   - Track processing times

4. **OpenAI Usage**:
   - Monitor token usage in OpenAI dashboard
   - Set usage limits to prevent overages

## Production Checklist

- [ ] All environment variables configured
- [ ] Database migration applied
- [ ] Google OAuth configured
- [ ] Supabase Realtime enabled
- [ ] AWS infrastructure deployed
- [ ] Lambda function tested
- [ ] Error handling tested
- [ ] Rate limiting considered
- [ ] Cost monitoring set up
- [ ] Backup strategy in place

## Scaling Considerations

### When to Scale

Monitor these metrics:
- API response times > 2s consistently
- Lambda timeout errors
- SQS queue backlog > 10 messages
- Database connection pool exhausted
- OpenAI rate limits hit

### Scaling Options

1. **Vercel**:
   - Upgrade to Pro for better performance
   - Enable Edge Functions for lower latency

2. **Supabase**:
   - Upgrade to Pro for more connections
   - Enable connection pooling
   - Add read replicas

3. **AWS Lambda**:
   - Increase memory allocation
   - Enable provisioned concurrency
   - Add more SQS queues for parallel processing

4. **S3**:
   - Enable S3 Transfer Acceleration
   - Use CloudFront CDN for downloads

5. **OpenAI**:
   - Upgrade tier for higher rate limits
   - Implement request queuing
   - Cache common responses

## Security Hardening

1. **Environment Variables**:
   - Never commit `.env.local`
   - Rotate keys regularly
   - Use Vercel's encrypted variables

2. **Supabase**:
   - Enable RLS on all tables
   - Review and test RLS policies
   - Use service role key only in server-side code

3. **AWS**:
   - Use IAM roles with least privilege
   - Enable S3 bucket encryption
   - Set up CloudTrail for audit logs

4. **API Security**:
   - Add rate limiting (use Vercel Pro)
   - Implement request validation (Zod)
   - Add CORS restrictions

## Troubleshooting

### Deployment fails
- Check build logs in Vercel
- Verify all env vars are set
- Check for TypeScript errors

### OAuth not working
- Verify redirect URLs match exactly
- Check Google OAuth credentials
- Ensure HTTPS in production

### Video processing fails
- Check Lambda logs in CloudWatch
- Verify S3 permissions
- Check SQS queue configuration
- Validate FFmpeg commands

### Database errors
- Check Supabase connection pool
- Verify RLS policies
- Check migration status

## Backup & Recovery

1. **Database Backups**:
   - Supabase: Automatic daily backups
   - Download manual backups regularly

2. **S3 Backups**:
   - Enable versioning on S3 bucket
   - Set up lifecycle policies
   - Consider cross-region replication

3. **Code Backups**:
   - Keep GitHub repository updated
   - Tag releases
   - Document configuration

## Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda)
- [Vercel Docs](https://vercel.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)

