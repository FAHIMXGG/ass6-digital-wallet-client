# Vercel Deployment Guide

## Prerequisites
- Vercel account
- Your project connected to a Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables Setup

Before deploying, make sure to set up the following environment variables in your Vercel project:

### Required Environment Variables:
- `VITE_BASE_URL`: Your API base URL (e.g., `https://your-api-domain.com/api`)

### How to Set Environment Variables in Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following:
   - **Name**: `VITE_BASE_URL`
   - **Value**: Your production API URL
   - **Environment**: Production (and Preview if needed)

## Deployment Steps

1. **Connect Repository**: Connect your Git repository to Vercel
2. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Deploy**: Click "Deploy" and Vercel will automatically build and deploy your app

## Post-Deployment

After deployment, your app will be available at the provided Vercel URL. Make sure to:
1. Test all functionality
2. Verify API connections work correctly
3. Check that routing works properly (SPA routing is configured)

## Troubleshooting

- If you encounter build errors, check the build logs in Vercel dashboard
- Ensure all environment variables are properly set
- Verify that your API is accessible from Vercel's servers

## Performance Optimizations

The project is configured with:
- Code splitting for better performance
- Optimized bundle sizes
- Proper caching headers
- SPA routing support
