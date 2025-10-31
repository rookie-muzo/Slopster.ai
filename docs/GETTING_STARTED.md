# Getting Started with Slopster.ai

Welcome! This guide will help you get the Slopster.ai MVP up and running locally.

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example file and fill in your credentials:
```bash
cp .env.local.example .env.local
```

You'll need:
- **Supabase**: Create a free project at [supabase.com](https://supabase.com)
- **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com)
- **AWS**: Set up S3, SQS, Lambda (see [AWS_SETUP.md](./AWS_SETUP.md))

### 3. Run Database Migration

In the Supabase SQL Editor, run the migration:
```sql
-- Copy and paste contents from supabase/migrations/001_initial_schema.sql
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

## What You Can Do Now

1. **Sign Up**: Create an account with email or Google
2. **Create Project**: Start a new video project
3. **Generate Script**: Use AI to create viral video scripts
4. **Upload Video**: Upload videos for processing (start with small test videos)
5. **Auto-Edit**: Apply trim, captions, and transitions
6. **Optimize**: Get virality scores and hashtag suggestions
7. **Export**: Download your finished video with metadata

## Architecture Overview

```
User → Next.js (Vercel) → Supabase (Auth, DB, Storage)
                       → OpenAI API (Script Generation)
                       → AWS S3 (Video Storage)
                       → AWS SQS (Job Queue)
                       → AWS Lambda (FFmpeg Processing)
```

## Key Features Implemented

✅ **Authentication**
- Email/password signup & login
- Google OAuth integration
- Protected routes with middleware

✅ **AI Script Generator**
- OpenAI GPT-4o integration
- Platform-specific scripts (TikTok, Reels, Shorts)
- Customizable duration and tone
- Token usage tracking

✅ **Video Processing**
- S3 pre-signed URL uploads
- Async processing with SQS + Lambda
- FFmpeg operations (trim, captions, transitions)
- Real-time progress updates

✅ **Virality Optimizer**
- AI-powered scoring (1-10)
- Hashtag suggestions
- Optimal posting times
- Sound recommendations

✅ **Export**
- MP4 download
- Metadata export (JSON)
- Copy-to-clipboard functionality

## Project Structure

```
slopster-ai/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Protected pages
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/            # React components
├── lib/                   # Core libraries
│   ├── supabase/         # Supabase clients & helpers
│   ├── aws/              # AWS S3 & SQS clients
│   └── openai.ts         # OpenAI API wrapper
├── aws/lambda/           # Lambda functions
├── supabase/             # Database migrations
├── docs/                 # Documentation
└── types/                # TypeScript types
```

## Development Workflow

1. **Create a Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**
- Follow existing patterns
- Keep components small and focused
- Use TypeScript strictly

3. **Test Locally**
```bash
npm run dev
# Test in browser
```

4. **Commit & Push**
```bash
git add .
git commit -m "Add feature: description"
git push origin feature/your-feature-name
```

5. **Create Pull Request**
- Describe changes clearly
- Link related issues
- Request review

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
supabase db push         # Apply migrations
supabase gen types typescript --local > types/database.types.ts

# AWS (from aws/lambda/video-processor)
npm install              # Install Lambda dependencies
zip -r function.zip .    # Package for deployment
```

## Testing Strategy

### Manual Testing Checklist

**Authentication**:
- [ ] Sign up with email
- [ ] Sign in with email
- [ ] Sign in with Google OAuth
- [ ] Sign out
- [ ] Protected route redirects work

**Project Management**:
- [ ] Create new project
- [ ] View project list
- [ ] Open project details
- [ ] Delete project (TODO: implement)

**Script Generation**:
- [ ] Generate script with prompt
- [ ] Different platforms (TikTok, Reels, Shorts)
- [ ] Different durations (15s, 30s, 60s)
- [ ] Different tones (casual, professional, etc.)
- [ ] View generated scripts

**Video Processing** (use small test videos):
- [ ] Upload video (< 100MB for testing)
- [ ] View upload progress
- [ ] Job queued in SQS
- [ ] Lambda processes video
- [ ] Real-time progress updates
- [ ] Download processed video

**Virality Optimizer**:
- [ ] Analyze script
- [ ] View virality score
- [ ] Get hashtag suggestions
- [ ] Get posting time recommendations

## Troubleshooting

### "Cannot connect to Supabase"
- Check `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
- Verify Supabase project is active
- Check network/firewall settings

### "OpenAI API error"
- Verify `OPENAI_API_KEY` is valid
- Check OpenAI account has credits
- Review rate limits

### "Video upload fails"
- Check AWS credentials in `.env.local`
- Verify S3 bucket exists and is accessible
- Check CORS configuration on S3 bucket

### "Video processing stuck"
- Check Lambda function logs in CloudWatch
- Verify SQS queue is connected to Lambda
- Check Lambda timeout settings (should be 900s)

### "Google OAuth not working"
- Verify redirect URLs in Google Console
- Check Supabase OAuth settings
- Ensure using HTTPS in production

## Next Steps

1. **Deploy to Production**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Set Up AWS**: Follow [AWS_SETUP.md](./AWS_SETUP.md)
3. **Add Features**: Check GitHub Issues for planned features
4. **Optimize**: Monitor costs and performance

## Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

## Support

- **Issues**: [GitHub Issues](https://github.com/your-username/slopster-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/slopster-ai/discussions)

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See our roadmap for feature ideas and priorities.

---

Happy building! 🚀

