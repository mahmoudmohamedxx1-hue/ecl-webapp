# ECL Webapp Deployment Guide

This guide covers deploying the ECL Webapp to various platforms with proper environment configuration.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

1. **Fork or Clone Repository**
   ```bash
   git clone https://github.com/mahmoudmohamedxx1-hue/ecl-webapp.git
   cd ecl-webapp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import the `ecl-webapp` repository
   - Vercel will auto-detect Next.js configuration

4. **Configure Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   GROK_API_KEY=your_grok_api_key
   GROK_API_URL=https://api.x.ai/v1
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

### Option 2: Netlify

1. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. **Deploy**
   - Connect repository to Netlify
   - Configure environment variables in Site Settings
   - Deploy automatically from main branch

### Option 3: Railway

1. **Connect Repository**
   - Visit [railway.app](https://railway.app)
   - Connect GitHub repository
   - Railway auto-detects Next.js

2. **Environment Setup**
   - Add environment variables in Railway dashboard
   - Deploy automatically

## 🗄️ Backend Setup Required

### 1. Supabase Database

**Setup Steps:**
1. Create new project at [supabase.com](https://supabase.com)
2. Run the migration script:
   ```sql
   -- Copy content from supabase/migrations/001_initial_schema.sql
   -- Run in Supabase SQL Editor
   ```
3. Get your project URL and API keys
4. Configure Row Level Security policies

**Database Tables Created:**
- `workspaces` - Client organizations
- `portfolios` - ECL calculation runs
- `policy_models` - ECL calculation templates
- `portfolio_staging_data` - Raw data workspace
- `segment_mapping_rules` - Auto-mapping rules
- `portfolio_parameter_overrides` - Manual adjustments
- `ecl_results_unverified` - Calculation results
- `portfolio_review_log` - Audit trail
- `generated_reports` - Final reports storage

### 2. Grok AI Integration

**Setup Steps:**
1. Get API access from [x.ai](https://x.ai)
2. Generate API key for Grok
3. Configure in environment variables

**Features:**
- Contextual ECL assistance
- Parameter suggestions
- Calculation validation
- Audit note generation

### 3. Inngest (Optional - for background jobs)

**Setup Steps:**
1. Create account at [inngest.com](https://inngest.com)
2. Get event and signing keys
3. Configure webhook endpoints

**Background Jobs:**
- Excel file processing
- ECL calculations
- Report generation
- Email notifications

## 🔧 Environment Variables Guide

### Required Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Grok AI Configuration  
GROK_API_KEY=gsk_...
GROK_API_URL=https://api.x.ai/v1

# Inngest Configuration (Optional)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### Optional Variables

```env
# Application Configuration
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME="ECL Webapp"

# Development
NODE_ENV=production
```

## ✅ Pre-Deployment Checklist

- [ ] Repository cloned/forked
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] Database migration executed
- [ ] Grok API key obtained
- [ ] Environment variables configured
- [ ] Build test successful (`npm run build`)
- [ ] Deployment platform selected

## 🧪 Testing Your Deployment

### 1. Local Testing
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual keys

# Run development server
npm run dev

# Test build
npm run build
npm start
```

### 2. Production Testing

1. **Authentication Flow**
   - User registration/login
   - Session persistence
   - Route protection

2. **Core Features**
   - Workspace creation
   - Portfolio management
   - ECL wizard workflow
   - Grok AI assistant

3. **Data Operations**
   - Excel file upload
   - Data validation
   - Parameter calculations
   - Report generation

## 🔍 Troubleshooting

### Common Issues

**Build Failures:**
- Ensure all environment variables are set
- Check TypeScript errors: `npm run type-check`
- Verify dependencies: `npm install`

**Database Connection:**
- Verify Supabase URL and keys
- Check RLS policies are enabled
- Ensure migration script executed

**API Integration:**
- Test Grok API key validity
- Check network/CORS issues
- Verify endpoint configurations

### Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 📊 Post-Deployment Setup

1. **Create Demo Data**
   - Set up sample workspaces
   - Import test portfolios
   - Configure policy models

2. **User Training**
   - ECL calculation workflow
   - Grok AI assistant usage
   - Report generation process

3. **Performance Monitoring**
   - Set up error tracking
   - Monitor API usage
   - Database performance

---

**🚨 Security Note:** Never commit real API keys to version control. Use environment variables and secure deployment practices.

**📞 Need Help?** Open an issue in the repository or consult the documentation for your chosen deployment platform.