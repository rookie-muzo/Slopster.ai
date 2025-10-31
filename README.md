# Slopster.ai 🎬

> **An AI-powered web app that turns raw ideas into optimized, ready-to-post social videos**

Transform your video content for TikTok, YouTube Shorts, and Instagram Reels with AI-powered script generation, automated editing, and virality optimization.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-green)](https://supabase.com/)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda%20%2B%20FFmpeg-orange)](https://aws.amazon.com/lambda/)

---

## ✨ Features

### 🤖 AI Script Generator
- Generate viral video scripts using OpenAI GPT-4o
- Platform-specific optimization (TikTok, YouTube Shorts, Instagram Reels)
- Customizable duration (15s - 180s) and tone (casual, professional, humorous, inspirational)
- Structured output with hooks, body, CTAs, and timing

### 🎥 Video Processing
- Drag-and-drop upload with progress tracking
- Support for 1-2 hour videos
- AWS Lambda + FFmpeg for powerful server-side processing
- Async job queue (SQS) with real-time status updates
- Automatic trim, captions, transitions, and format conversion

### 📊 Virality Optimizer
- AI-powered scoring (1-10) with detailed breakdown
- Platform-specific hashtag suggestions
- Optimal posting time recommendations
- Trending sound suggestions

### 📦 Export & Metadata
- Download processed MP4 videos
- Export metadata (title, description, hashtags, posting times)
- One-click copy-to-clipboard

### 🔐 Authentication
- Email/password signup and login
- Google OAuth integration
- Secure session management

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), React, TypeScript, Tailwind CSS |
| **Backend** | Supabase (PostgreSQL, Auth, Storage, Realtime) |
| **Video Processing** | AWS Lambda + FFmpeg, S3, SQS |
| **AI** | OpenAI API (GPT-4o, GPT-4o-mini) |
| **Hosting** | Vercel (frontend + serverless), AWS (video processing) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- Supabase account ([free tier](https://supabase.com))
- OpenAI API key ([get one here](https://platform.openai.com))
- AWS account (for S3, SQS, Lambda)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/slopster-ai.git
cd slopster-ai
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `OPENAI_API_KEY` - OpenAI API key
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `AWS_S3_BUCKET`, `AWS_SQS_QUEUE_URL` - AWS resources

### 3. Set Up Database
Run the migration in Supabase SQL Editor:
```bash
# Copy contents from supabase/migrations/001_initial_schema.sql
# Or use Supabase CLI:
supabase db push
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📖 Documentation

- **[Getting Started](docs/GETTING_STARTED.md)** - Complete setup guide
- **[AWS Setup](docs/AWS_SETUP.md)** - Configure S3, SQS, and Lambda
- **[Deployment](docs/DEPLOYMENT.md)** - Deploy to production (Vercel)
- **[Project Summary](PROJECT_SUMMARY.md)** - Complete feature list and architecture

---

## 📁 Project Structure

```
slopster-ai/
├── app/                        # Next.js App Router
│   ├── (auth)/                # Authentication pages
│   ├── (dashboard)/           # Protected dashboard pages
│   ├── api/                   # API routes (serverless)
│   └── page.tsx               # Landing page
├── components/                 # React components
│   ├── ScriptGenerator.tsx    # AI script generation UI
│   ├── VideoUploader.tsx      # Video upload component
│   ├── JobProgress.tsx        # Real-time progress tracking
│   └── ExportModal.tsx        # Download & metadata export
├── lib/                        # Core libraries
│   ├── supabase/              # Supabase client & helpers
│   ├── aws/                   # AWS S3 & SQS clients
│   └── openai.ts              # OpenAI API wrapper
├── aws/lambda/                 # AWS Lambda functions
│   └── video-processor/       # FFmpeg video processing
├── supabase/                   # Database migrations
├── docs/                       # Documentation
└── types/                      # TypeScript type definitions
```

---

## 💰 Cost Estimate

**~$5-10/month for MVP** (under free tier limits for most services)

| Service | Monthly Cost |
|---------|--------------|
| OpenAI API | $2-3 (100 scripts + analyses) |
| AWS (S3, Lambda, SQS) | $1-2 (mostly covered by free tier) |
| Supabase | $0 (free tier) |
| Vercel | $0 (hobby plan) |

**Total**: Well within $200/month budget with room for 20x growth.

---

## 🎯 MVP Roadmap Status

| Phase | Status | Features |
|-------|--------|----------|
| **Phase 1: Foundation** | ✅ Complete | Auth, Dashboard, Projects |
| **Phase 2: AI Scripts** | ✅ Complete | OpenAI integration, Script generation |
| **Phase 3: Video Upload** | ✅ Complete | S3 upload, SQS queue, Lambda processing |
| **Phase 4: Auto-Edit** | ✅ Complete | Trim, captions, transitions, export |
| **Phase 5: Optimizer** | ✅ Complete | Virality scoring, hashtags, posting times |
| **Phase 6: Polish** | ✅ Complete | Error handling, responsive design |

---

## 🔒 Security Features

- ✅ Row-Level Security (RLS) on all database tables
- ✅ Server-side API validation with Zod
- ✅ Protected routes with Next.js middleware
- ✅ Pre-signed URLs for secure S3 access
- ✅ OAuth with secure callback flow
- ✅ Service role keys only in server-side code

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🚢 Deployment

Deploy to Vercel in 3 steps:

1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables and deploy

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [OpenAI](https://openai.com/) - AI models
- [AWS Lambda](https://aws.amazon.com/lambda/) - Serverless compute
- [FFmpeg](https://ffmpeg.org/) - Video processing
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

## 📞 Support

- 📧 Email: support@slopster.ai (update with your email)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/slopster-ai/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/slopster-ai/discussions)

---

**Built with ❤️ for content creators**

