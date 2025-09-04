# Environment Variables for Cloudflare Pages

Set these environment variables in your Cloudflare Pages dashboard under **Settings > Environment variables**:

## Database
- `DATABASE_URL` - PostgreSQL connection string (e.g., from Neon, Supabase, or other managed Postgres)

## Authentication
- `BETTER_AUTH_SECRET` - A secure random string for session encryption
- `BETTER_AUTH_URL` - `https://neutone.app`

## AWS S3 Configuration
- `AWS_ACCESS_KEY` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `AWS_REGION` - Your S3 bucket region (e.g., `us-east-1`)
- `S3_BUCKET_NAME` - Your S3 bucket name

## Modal Configuration
- `MODAL_KEY` - Your Modal API key
- `MODAL_SECRET` - Your Modal API secret

## Modal Endpoints
Update these with your deployed Modal endpoints:
- `GENERATE_FROM_DESCRIPTION_ENDPOINT`
- `GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT`
- `GENERATE_FROM_LYRICS_ENDPOINT`

## Environment
- `NODE_ENV` - `production`

## Important Notes
1. Make sure your database is accessible from Cloudflare's network
2. Consider using a managed PostgreSQL service like Neon, Supabase, or AWS RDS
3. Ensure your Modal endpoints are deployed and accessible
4. Test all environment variables in a staging environment first
