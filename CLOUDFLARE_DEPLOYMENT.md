# Deploying Neutone to Cloudflare Pages

This guide will help you deploy your Neutone application to Cloudflare Pages using your domain `neutone.app`.

## Prerequisites

1. **Cloudflare Account**: Make sure you have a Cloudflare account
2. **Domain Setup**: Your domain `neutone.app` should be added to Cloudflare
3. **Dependencies**: Ensure all your external services are ready:
   - PostgreSQL database (Neon, Supabase, or AWS RDS recommended)
   - AWS S3 bucket configured
   - Modal backend deployed

## Step 1: Install Wrangler CLI

```bash
cd frontend
npm install  # This will install wrangler as a dev dependency
```

Or install globally:
```bash
npm install -g wrangler
```

## Step 2: Authenticate with Cloudflare

```bash
npx wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

## Step 3: Create Cloudflare Pages Project

### Option A: Using Wrangler CLI
```bash
cd frontend
npx wrangler pages project create neutone
```

### Option B: Using Cloudflare Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Create a project**
4. Choose **Direct Upload**
5. Name your project `neutone`

## Step 4: Set Environment Variables

Go to your Cloudflare Pages dashboard:
1. Navigate to **Pages** > **neutone** > **Settings** > **Environment variables**
2. Add the following environment variables:

### Production Environment Variables
```
DATABASE_URL=postgresql://username:password@your-postgres-host:5432/neutone
BETTER_AUTH_SECRET=your-secure-random-string-here
BETTER_AUTH_URL=https://neutone.app
AWS_ACCESS_KEY=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-s3-bucket-name
MODAL_KEY=your-modal-key
MODAL_SECRET=your-modal-secret
GENERATE_FROM_DESCRIPTION_ENDPOINT=https://your-modal-app--generate-from-description.modal.run
GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT=https://your-modal-app--generate-from-described-lyrics.modal.run
GENERATE_FROM_LYRICS_ENDPOINT=https://your-modal-app--generate-from-lyrics.modal.run
POLAR_ACCESS_TOKEN=your-polar-access-token
POLAR_WEBHOOK_SECRET=your-polar-webhook-secret
NODE_ENV=production
```

**Important**: All these environment variables are required for the build to succeed. Make sure to set them all in the Cloudflare Pages dashboard before deploying.

## Step 5: Deploy Your Application

### Build and Deploy
```bash
cd frontend
bun run deploy:pages
```

### Or deploy step by step
```bash
cd frontend
# Build the application
bun run build:pages

# Deploy to Cloudflare Pages
wrangler pages deploy .vercel/output/static --project-name=neutone
```

## Step 6: Configure Custom Domain

1. In your Cloudflare Pages dashboard, go to **neutone** > **Custom domains**
2. Click **Set up a custom domain**
3. Enter `neutone.app`
4. Cloudflare will automatically configure the DNS records since your domain is already on Cloudflare

## Step 7: Database Migration

After deployment, you'll need to run database migrations:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-database-url"
bun run db:migrate
```

Or if you're using a service like Neon or Supabase, you can run this from their dashboard or CLI.

## Step 8: Verify Deployment

1. Visit `https://neutone.app` to see your deployed application
2. Test the authentication flow
3. Verify that music generation works with your Modal backend
4. Check that images load correctly from your S3 bucket

## Development

### Local Development
```bash
cd frontend
bun run dev:pages
```

This will start the development server with Cloudflare Pages environment.

### Preview Build
```bash
cd frontend
bun run preview:pages
```

This will build and preview your application locally.

## Deployment Scripts

The following npm scripts have been added to your `package.json`:

- `bun run build:pages` - Build for Cloudflare Pages
- `bun run dev:pages` - Run locally with Cloudflare Pages environment
- `bun run preview:pages` - Preview the build locally
- `bun run deploy:pages` - Deploy to production

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure all variables are set in the Cloudflare Pages dashboard
   - Check that variable names match exactly (case-sensitive)
   - All environment variables listed above are required for the build to succeed

2. **Build Failures**
   - The build will fail if any required environment variables are missing
   - Check the build logs in Cloudflare Pages dashboard for specific error messages
   - Make sure all Modal endpoints are accessible and working

3. **Database Connection Issues**
   - Verify your DATABASE_URL is correct
   - Ensure your database accepts connections from Cloudflare's network
   - Consider using connection pooling (PgBouncer) for better performance

4. **S3 Images Not Loading**
   - Check your S3 bucket CORS configuration
   - Verify the bucket name and region in environment variables
   - Ensure your AWS credentials have the necessary permissions

5. **Modal Endpoints Not Working**
   - Verify your Modal endpoints are deployed and accessible
   - Check that MODAL_KEY and MODAL_SECRET are correct
   - Test the endpoints directly to ensure they're working

### Performance Optimization

1. **Enable Cloudflare Features**:
   - Go to your domain settings in Cloudflare
   - Enable **Auto Minify** for CSS, JS, and HTML
   - Enable **Brotli** compression
   - Set up **Caching Rules** for static assets

2. **Database Optimization**:
   - Use connection pooling
   - Consider read replicas for better performance
   - Monitor query performance

## Monitoring and Maintenance

1. **Logs**: Check Cloudflare Pages logs in the dashboard
2. **Analytics**: Enable Cloudflare Web Analytics
3. **Uptime Monitoring**: Set up monitoring for your application
4. **Security**: Review Cloudflare security settings

## Next Steps

After successful deployment:

1. Set up monitoring and alerting
2. Configure backup strategies for your database
3. Set up CI/CD pipeline for automated deployments
4. Consider implementing staging environment
5. Monitor performance and optimize as needed

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [@cloudflare/next-on-pages Documentation](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
