# Supabase Setup Guide

Complete guide for setting up Supabase for Slopster.ai

## Overview

Supabase provides:
- **Authentication**: User signup/login with email and OAuth
- **Database**: PostgreSQL with Row Level Security
- **Storage**: File storage for videos
- **Realtime**: Live updates for job progress

## Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose a name, database password, and region
4. Wait for project to initialize (~2 minutes)

### 2. Apply Database Schema

**Option A: Using Supabase CLI (Recommended)**

```bash
# Install Supabase CLI globally
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push the migration
supabase db push
```

**Option B: Manual SQL Execution**

1. Open your Supabase project dashboard
2. Go to **SQL Editor** (in left sidebar)
3. Click "New Query"
4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
5. Paste and click "Run"

This will create:
- All database tables (users, projects, scripts, videos, jobs)
- Row Level Security policies
- Database functions and triggers
- Indexes for performance

### 3. Configure Authentication

#### Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Email provider should be enabled by default
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize signup confirmation, password reset, etc.

#### Enable Google OAuth (Recommended)

1. Create Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project (or select existing)
   - Enable Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: Web application
   - Authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret

2. Configure in Supabase:
   - Go to **Authentication** → **Providers**
   - Find Google and click to enable
   - Paste Client ID and Client Secret
   - Add authorized redirect URLs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://your-domain.vercel.app/auth/callback` (production)
   - Save

### 4. Create Storage Buckets

1. Go to **Storage** in Supabase dashboard
2. Click "Create a new bucket"
3. Create these buckets:

   **Bucket: `videos`**
   - Name: `videos`
   - Public: No (private)
   - File size limit: 500MB (or your preference)
   - Allowed MIME types: `video/*`

   **Bucket: `processed-videos`**
   - Name: `processed-videos`
   - Public: Yes (or use signed URLs)
   - File size limit: 500MB
   - Allowed MIME types: `video/*`

   **Bucket: `thumbnails`** (optional)
   - Name: `thumbnails`
   - Public: Yes
   - File size limit: 10MB
   - Allowed MIME types: `image/*`

4. Set up Storage Policies:

   Go to **Storage** → Select bucket → **Policies**

   For `videos` bucket:
   ```sql
   -- Allow authenticated users to upload
   CREATE POLICY "Users can upload own videos"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (
     bucket_id = 'videos' 
     AND auth.uid()::text = (storage.foldername(name))[1]
   );

   -- Allow users to read own videos
   CREATE POLICY "Users can read own videos"
   ON storage.objects FOR SELECT
   TO authenticated
   USING (
     bucket_id = 'videos'
     AND auth.uid()::text = (storage.foldername(name))[1]
   );
   ```

   For `processed-videos` bucket:
   ```sql
   -- Allow public read access
   CREATE POLICY "Public can read processed videos"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'processed-videos');

   -- Service role can insert/update
   CREATE POLICY "Service role can manage processed videos"
   ON storage.objects FOR ALL
   TO service_role
   USING (bucket_id = 'processed-videos');
   ```

### 5. Enable Realtime

For live job progress updates:

1. Go to **Database** → **Replication**
2. Find the `jobs` table
3. Toggle "Enable Replication" to ON
4. Select columns to replicate (or select all)

### 6. Get API Credentials

1. Go to **Settings** → **API**
2. Copy these values:

   ```
   Project URL: https://your-project.supabase.co
   API Key (anon/public): eyJhbGc...
   API Key (service_role): eyJhbGc... (KEEP SECRET!)
   ```

3. Add to your `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```

## Understanding the Setup

### Database Schema

Your database includes:

- **`users`** - User profiles (extends auth.users)
- **`projects`** - User projects
- **`scripts`** - Generated video scripts
- **`videos`** - Uploaded and processed videos
- **`jobs`** - Video processing job tracking

### Row Level Security (RLS)

All tables have RLS enabled. This means:
- Users can only access their own data
- Queries automatically filter by user ID
- Service role key bypasses RLS (use only in server-side code)

### Helper Functions in `lib/supabase/`

Your codebase includes these helper modules:

1. **`lib/supabase/client.ts`**
   - Creates browser client for client-side operations
   - Use in: React components, client actions

2. **`lib/supabase/server.ts`**
   - Creates server client with cookie handling
   - Use in: Server components, API routes, server actions

3. **`lib/supabase/auth.ts`**
   - Authentication helpers
   - Functions: `getUser()`, `signOut()`

4. **`lib/supabase/storage.ts`**
   - Storage helpers
   - Functions: `uploadFile()`, `getPublicUrl()`, `deleteFile()`

### Database Functions (Triggers)

These are automatically created by the migration:

1. **`handle_new_user()`**
   - Triggered when user signs up
   - Auto-creates record in `users` table

2. **`update_updated_at()`**
   - Triggered on every UPDATE
   - Auto-updates `updated_at` timestamp

## Testing Your Setup

### 1. Test Database Connection

```typescript
import { createClient } from '@/lib/supabase/server'

export async function testConnection() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('count')
  
  console.log('Connection test:', { data, error })
}
```

### 2. Test Authentication

```typescript
// Sign up a test user
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'testpassword123',
})
```

### 3. Test Storage

```typescript
import { uploadFile } from '@/lib/supabase/storage'

// Upload a test file
const file = new File(['test'], 'test.txt', { type: 'text/plain' })
const { data, error } = await uploadFile('videos', 'test/test.txt', file)
```

### 4. Test Realtime

```typescript
const supabase = createClient()

const channel = supabase
  .channel('jobs')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'jobs'
  }, (payload) => {
    console.log('Job updated:', payload.new)
  })
  .subscribe()
```

## Common Issues & Solutions

### Issue: "relation does not exist"
**Solution**: Run the database migration. The tables haven't been created yet.

### Issue: "new row violates row level security policy"
**Solution**: 
- Check RLS policies in Supabase dashboard
- Ensure you're authenticated when making requests
- Use service role key for server-side operations that need to bypass RLS

### Issue: Storage upload fails with 403
**Solution**: 
- Check storage bucket exists
- Verify storage policies are set up correctly
- Ensure user is authenticated

### Issue: Realtime not working
**Solution**:
- Enable replication for the table in Database → Replication
- Check that you're subscribed to the correct channel
- Verify table name and schema in subscription

### Issue: "JWT expired" errors
**Solution**:
- Refresh the user session
- Check that cookies are being properly set/read
- Verify NEXT_PUBLIC_SITE_URL matches your domain

## Security Best Practices

1. **Never expose service role key**
   - Use only in server-side code
   - Never send to client
   - Store in environment variables

2. **Validate all inputs**
   - Check file sizes before upload
   - Validate file types
   - Sanitize user inputs

3. **Use RLS policies**
   - Never disable RLS in production
   - Test policies thoroughly
   - Review policies regularly

4. **Rotate credentials**
   - Change database password periodically
   - Regenerate API keys if compromised
   - Update OAuth credentials as needed

5. **Monitor usage**
   - Check Supabase dashboard for unusual activity
   - Set up billing alerts
   - Monitor API request logs

## Next Steps

After Supabase is configured:

1. ✅ Complete AWS setup (see `AWS_SETUP.md`)
2. ✅ Configure environment variables
3. ✅ Test local development
4. ✅ Deploy to Vercel (see `DEPLOYMENT.md`)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Realtime](https://supabase.com/docs/guides/realtime)


